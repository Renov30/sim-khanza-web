import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { rawatJalanAccess } from "@/lib/rawat-jalan/access";

type KategoriBilling =
  | "Registrasi"
  | "Ralan Dokter"
  | "Ralan Paramedis"
  | "Ralan Dokter Paramedis"
  | "Laborat"
  | "Radiologi"
  | "Obat"
  | "Operasi"
  | "Tambahan"
  | "Potongan";

interface BillingItem {
  kategori: KategoriBilling;
  nama: string;
  jumlah: number;
  total: number;
}

interface RegistrasiBilling {
  no_rawat: string;
  no_reg: string;
  tgl_registrasi: string;
  jam_reg: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  kd_poli: string;
  nm_poli: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_pj: string;
  png_jawab: string | null;
  biaya_reg: number | string;
  stts: string;
  status_bayar: string;
}

interface ItemRow {
  nama: string;
  jumlah: number | string;
  total: number | string;
  detail?: number | string;
  tarif?: number | string;
  sarana?: number | string;
  bhp?: number | string;
  paramedis?: number | string;
}

const OPERASI_BIAYA = [
  "biayaoperator1", "biayaoperator2", "biayaoperator3",
  "biayaasisten_operator1", "biayaasisten_operator2", "biayaasisten_operator3",
  "biayainstrumen", "biayadokter_anak", "biayaperawaat_resusitas", "biayadokter_anestesi",
  "biayaasisten_anestesi", "biayaasisten_anestesi2", "biayabidan", "biayabidan2", "biayabidan3",
  "biayaperawat_luar", "biayaalat", "biayasewaok", "akomodasi", "bagian_rs",
  "biaya_omloop", "biaya_omloop2", "biaya_omloop3", "biaya_omloop4", "biaya_omloop5",
  "biayasarpras", "biaya_dokter_pjanak", "biaya_dokter_umum",
].map((kolom) => `o.${kolom}`).join(" + ");

const LABEL_KATEGORI: Record<KategoriBilling, string> = {
  Registrasi: "Registrasi",
  "Ralan Dokter": "Tindakan Dokter",
  "Ralan Paramedis": "Tindakan Paramedis",
  "Ralan Dokter Paramedis": "Tindakan Dokter + Paramedis",
  Laborat: "Laboratorium",
  Radiologi: "Radiologi",
  Obat: "Obat & BHP",
  Operasi: "Operasi",
  Tambahan: "Tambahan Biaya",
  Potongan: "Potongan Biaya",
};

const angka = (value: number | string | undefined | null) => {
  const hasil = Number(value);
  return Number.isFinite(hasil) ? hasil : 0;
};

const baris = (kategori: KategoriBilling, rows: ItemRow[]): BillingItem[] => rows.map((row) => ({
  kategori,
  nama: row.nama,
  jumlah: angka(row.jumlah),
  total: angka(row.total) + angka(row.detail),
}));

/** Saat rincian dokter aktif, tarif tindakan dipisah dari jasa sarana dan BHP. */
const barisTindakan = (kategori: KategoriBilling, rows: ItemRow[], rincian: boolean): BillingItem[] => rows.map((row) => ({
  kategori,
  nama: row.nama,
  jumlah: angka(row.jumlah),
  total: rincian ? angka(row.tarif) : angka(row.total),
}));

const jumlahKolom = (rows: ItemRow[], kolom: "sarana" | "bhp" | "paramedis") => rows.reduce((jumlah, row) => jumlah + angka(row[kolom]), 0);

export async function GET(req: NextRequest) {
  try {
    const denied = await rawatJalanAccess();
    if (denied) return denied;

    const noRawat = new URL(req.url).searchParams.get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 30) {
      return NextResponse.json({ success: false, error: "No. Rawat tidak valid." }, { status: 400 });
    }

    const registrasi = await executeQuery<RegistrasiBilling>(`
      SELECT r.no_rawat, r.no_reg, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
             r.jam_reg, r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur,
             r.kd_poli, pol.nm_poli, r.kd_dokter, d.nm_dokter,
             r.kd_pj, pj.png_jawab, r.biaya_reg, r.stts, r.status_bayar
      FROM reg_periksa r
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter
      INNER JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
      LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
      WHERE r.no_rawat = ? AND r.status_lanjut = 'Ralan'
      LIMIT 1
    `, [noRawat]);

    if (registrasi.length === 0) {
      return NextResponse.json({ success: false, error: "Registrasi rawat jalan tidak ditemukan." }, { status: 404 });
    }

    const [dokter, paramedis, dokterParamedis, lab, radiologi, obat, operasi, tambahan, potongan, obatLangsung, pengaturan] = await Promise.all([
      executeQuery<ItemRow>(`
        SELECT j.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(rjd.biaya_rawat) AS total,
               SUM(rjd.tarif_tindakandr) AS tarif,
               SUM(rjd.material + rjd.menejemen + rjd.kso) AS sarana,
               SUM(rjd.bhp) AS bhp
        FROM rawat_jl_dr rjd
        INNER JOIN jns_perawatan j ON j.kd_jenis_prw = rjd.kd_jenis_prw
        WHERE rjd.no_rawat = ?
        GROUP BY j.nm_perawatan
        ORDER BY j.nm_perawatan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT j.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(rjp.biaya_rawat) AS total
        FROM rawat_jl_pr rjp
        INNER JOIN jns_perawatan j ON j.kd_jenis_prw = rjp.kd_jenis_prw
        WHERE rjp.no_rawat = ?
        GROUP BY j.nm_perawatan
        ORDER BY j.nm_perawatan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT j.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(rjdp.biaya_rawat) AS total,
               SUM(rjdp.tarif_tindakandr) AS tarif,
               SUM(rjdp.material + rjdp.menejemen + rjdp.kso) AS sarana,
               SUM(rjdp.bhp) AS bhp,
               SUM(rjdp.tarif_tindakanpr) AS paramedis
        FROM rawat_jl_drpr rjdp
        INNER JOIN jns_perawatan j ON j.kd_jenis_prw = rjdp.kd_jenis_prw
        WHERE rjdp.no_rawat = ?
        GROUP BY j.nm_perawatan
        ORDER BY j.nm_perawatan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT j.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(pl.biaya) AS total,
               (SELECT COALESCE(SUM(dpl.biaya_item), 0) FROM detail_periksa_lab dpl
                WHERE dpl.no_rawat = ? AND dpl.kd_jenis_prw = pl.kd_jenis_prw) AS detail
        FROM periksa_lab pl
        INNER JOIN jns_perawatan_lab j ON j.kd_jenis_prw = pl.kd_jenis_prw
        WHERE pl.no_rawat = ?
        GROUP BY pl.kd_jenis_prw, j.nm_perawatan
        ORDER BY j.nm_perawatan
      `, [noRawat, noRawat]),
      executeQuery<ItemRow>(`
        SELECT j.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(pr.biaya) AS total
        FROM periksa_radiologi pr
        INNER JOIN jns_perawatan_radiologi j ON j.kd_jenis_prw = pr.kd_jenis_prw
        WHERE pr.no_rawat = ?
        GROUP BY j.nm_perawatan
        ORDER BY j.nm_perawatan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT d.nama_brng AS nama, SUM(dpo.jml) AS jumlah, SUM(dpo.total) AS total
        FROM detail_pemberian_obat dpo
        INNER JOIN databarang d ON d.kode_brng = dpo.kode_brng
        WHERE dpo.no_rawat = ?
        GROUP BY d.kode_brng, d.nama_brng
        ORDER BY d.nama_brng
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT p.nm_perawatan AS nama, COUNT(*) AS jumlah, SUM(${OPERASI_BIAYA}) AS total
        FROM operasi o
        INNER JOIN paket_operasi p ON p.kode_paket = o.kode_paket
        WHERE o.no_rawat = ?
        GROUP BY p.nm_perawatan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT nama_biaya AS nama, 1 AS jumlah, besar_biaya AS total
        FROM tambahan_biaya WHERE no_rawat = ? ORDER BY nama_biaya
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT nama_pengurangan AS nama, 1 AS jumlah, -besar_pengurangan AS total
        FROM pengurangan_biaya WHERE no_rawat = ? ORDER BY nama_pengurangan
      `, [noRawat]),
      executeQuery<ItemRow>(`
        SELECT 'Obat & BHP Langsung' AS nama, 1 AS jumlah, besar_tagihan AS total
        FROM tagihan_obat_langsung WHERE no_rawat = ?
      `, [noRawat]),
      executeQuery<{ tampilkan_ppnobat_ralan: string; rinciandokterralan: string }>(
        "SELECT tampilkan_ppnobat_ralan, rinciandokterralan FROM set_nota LIMIT 1",
      ),
    ]);

    const rincianDokter = pengaturan[0]?.rinciandokterralan === "Yes";
    const sarana = jumlahKolom(dokter, "sarana") + jumlahKolom(dokterParamedis, "sarana") + jumlahKolom(dokterParamedis, "paramedis");
    const bhp = jumlahKolom(dokter, "bhp") + jumlahKolom(dokterParamedis, "bhp");

    const items: BillingItem[] = [
      { kategori: "Registrasi", nama: "Biaya Registrasi", jumlah: 1, total: angka(registrasi[0].biaya_reg) },
      ...barisTindakan("Ralan Dokter", dokter, rincianDokter),
      ...baris("Ralan Paramedis", paramedis),
      ...barisTindakan("Ralan Dokter Paramedis", dokterParamedis, rincianDokter),
      ...(rincianDokter && sarana > 0
        ? [{ kategori: "Ralan Dokter" as const, nama: "Jasa Sarana dan Prasarana", jumlah: 1, total: sarana }]
        : []),
      ...(rincianDokter && bhp > 0
        ? [{ kategori: "Ralan Dokter" as const, nama: "Paket Obat/BHP", jumlah: 1, total: bhp }]
        : []),
      ...baris("Laborat", lab),
      ...baris("Radiologi", radiologi),
      ...baris("Obat", obat),
      ...baris("Operasi", operasi),
      ...baris("Tambahan", tambahan),
      ...baris("Potongan", potongan),
      ...baris("Obat", obatLangsung),
    ];

    const subtotalObat = obat.reduce((jumlah, item) => jumlah + angka(item.total) + angka(item.detail), 0);
    if (pengaturan[0]?.tampilkan_ppnobat_ralan === "Yes" && subtotalObat > 0) {
      items.push({ kategori: "Obat", nama: "PPN Obat 11%", jumlah: 1, total: Math.round(subtotalObat * 0.11) });
    }

    const ringkasan = {
      registrasi: 0,
      ralanDokter: 0,
      ralanParamedis: 0,
      ralanDokterParamedis: 0,
      laborat: 0,
      radiologi: 0,
      obat: 0,
      operasi: 0,
      tambahan: 0,
      potongan: 0,
      total: 0,
    };
    for (const item of items) {
      if (item.kategori === "Ralan Dokter") ringkasan.ralanDokter += item.total;
      else if (item.kategori === "Ralan Paramedis") ringkasan.ralanParamedis += item.total;
      else if (item.kategori === "Ralan Dokter Paramedis") ringkasan.ralanDokterParamedis += item.total;
      else if (item.kategori === "Laborat") ringkasan.laborat += item.total;
      else if (item.kategori === "Radiologi") ringkasan.radiologi += item.total;
      else if (item.kategori === "Obat") ringkasan.obat += item.total;
      else if (item.kategori === "Operasi") ringkasan.operasi += item.total;
      else if (item.kategori === "Tambahan") ringkasan.tambahan += item.total;
      else if (item.kategori === "Potongan") ringkasan.potongan += item.total;
      else ringkasan.registrasi += item.total;
      ringkasan.total += item.total;
    }

    return NextResponse.json({
      success: true,
      data: {
        registrasi: registrasi[0],
        items,
        ringkasan,
        labelKategori: LABEL_KATEGORI,
      },
    });
  } catch (error: unknown) {
    console.error("Error in api/rawat-jalan/billing:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat rincian billing rawat jalan" }, { status: 500 });
  }
}

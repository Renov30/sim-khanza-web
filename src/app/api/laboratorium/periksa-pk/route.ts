import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";

const STATUS_RAWAT = new Set(["Ralan", "Ranap"]);
const MODE_TAMPIL = new Set(["data", "item", "detail"]);
const BATAS_KATA_KUNCI = 100;
const BATAS_NO_RAWAT = 17;
const BATAS_KODE = 20;

type ModeTampil = "data" | "item" | "detail";

type ItemPeriksa = {
  id_template: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
  pemeriksaan: string;
  method: string;
  nilai: string;
  satuan: string;
  nilai_rujukan: string;
  keterangan: string;
  biaya: string;
  biaya_item: string;
};

type KunjunganPeriksa = {
  kunci: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  status: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  jenis_ruang: string;
  ruang: string;
  nip: string;
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  noorder: string;
  biaya: string;
  biaya_kunjungan: number;
  saran: string;
  kesan: string;
  item: ItemPeriksa[];
};

type DetailPasien = {
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  kunjungan: KunjunganPeriksa[];
};

function teks(nilai: unknown): string {
  return nilai === null || nilai === undefined ? "" : String(nilai);
}

function kunciKunjungan(baris: Record<string, unknown>) {
  return `${teks(baris.no_rawat)}|${teks(baris.tgl_periksa)}|${teks(baris.jam)}`;
}

function angka(nilai: unknown): number {
  const hasil = Number(nilai);
  return Number.isFinite(hasil) ? hasil : 0;
}

function hitungBiayaKunjungan(kunjungan: KunjunganPeriksa): number {
  const biayaPaket = new Map<string, number>();
  for (const item of kunjungan.item) {
    if (!biayaPaket.has(item.kd_jenis_prw)) biayaPaket.set(item.kd_jenis_prw, angka(item.biaya));
  }
  return [...biayaPaket.values()].reduce((total, nilai) => total + nilai, 0)
    + kunjungan.item.reduce((total, item) => total + angka(item.biaya_item), 0);
}

function jadikanItem(baris: Record<string, unknown>): ItemPeriksa {
  return {
    id_template: teks(baris.id_template),
    kd_jenis_prw: teks(baris.kd_jenis_prw),
    nm_perawatan: teks(baris.nm_perawatan),
    pemeriksaan: teks(baris.pemeriksaan),
    method: teks(baris.method),
    nilai: teks(baris.nilai),
    satuan: teks(baris.satuan),
    nilai_rujukan: teks(baris.nilai_rujukan),
    keterangan: teks(baris.keterangan),
    biaya: teks(baris.biaya),
    biaya_item: teks(baris.biaya_item),
  };
}

function jadikanKunjungan(baris: Record<string, unknown>): KunjunganPeriksa {
  return {
    kunci: kunciKunjungan(baris),
    no_rawat: teks(baris.no_rawat),
    tgl_periksa: teks(baris.tgl_periksa),
    jam: teks(baris.jam),
    status: teks(baris.status),
    no_rkm_medis: teks(baris.no_rkm_medis),
    nm_pasien: teks(baris.nm_pasien),
    jk: teks(baris.jk),
    umur: teks(baris.umur),
    sttsumur: teks(baris.sttsumur),
    png_jawab: teks(baris.png_jawab),
    jenis_ruang: teks(baris.jenis_ruang),
    ruang: teks(baris.ruang),
    nip: teks(baris.nip),
    nm_petugas: teks(baris.nm_petugas),
    dokter_perujuk: teks(baris.dokter_perujuk),
    penanggung_jawab: teks(baris.penanggung_jawab),
    noorder: teks(baris.noorder),
    biaya: teks(baris.biaya),
    biaya_kunjungan: 0,
    saran: teks(baris.saran),
    kesan: teks(baris.kesan),
    item: [jadikanItem(baris)],
  };
}

function kelompokkanKunjungan(barisData: Record<string, unknown>[]) {
  const peta = new Map<string, KunjunganPeriksa>();
  for (const baris of barisData) {
    const kunci = kunciKunjungan(baris);
    const kunjungan = peta.get(kunci);
    if (kunjungan) kunjungan.item.push(jadikanItem(baris));
    else peta.set(kunci, jadikanKunjungan(baris));
  }
  const hasil = [...peta.values()];
  for (const kunjungan of hasil) kunjungan.biaya_kunjungan = hitungBiayaKunjungan(kunjungan);
  return hasil;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Sesi tidak valid.", code: "UNAUTHORIZED" }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.periksa_lab) {
    return NextResponse.json({ success: false, error: "Tidak memiliki izin Periksa Lab PK.", code: "FORBIDDEN" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
  const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
  const kataKunci = searchParams.get("cari")?.trim() || "";
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const noRm = searchParams.get("no_rm")?.trim() || "";
  const nip = searchParams.get("nip")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const modeParam = searchParams.get("mode")?.trim() || "data";
  const parsedLimit = Number(searchParams.get("limit"));
  const limit = Number.isInteger(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 200;

  if (!MODE_TAMPIL.has(modeParam)) {
    return NextResponse.json({ success: false, error: "Mode tampilan tidak valid.", code: "MODE_TIDAK_VALID" }, { status: 400 });
  }
  const mode = modeParam as ModeTampil;
  if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))) {
    return NextResponse.json({ success: false, error: "Format periode tidak valid.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai) {
    return NextResponse.json({ success: false, error: "Tanggal mulai tidak boleh melebihi tanggal selesai.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (
    kataKunci.length > BATAS_KATA_KUNCI ||
    noRawat.length > BATAS_NO_RAWAT ||
    noRm.length > BATAS_KODE ||
    nip.length > BATAS_KODE ||
    (status && !STATUS_RAWAT.has(status))
  ) {
    return NextResponse.json({ success: false, error: "Parameter filter tidak valid.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }

  try {
    const kolomMethod = await executeQuery<Record<string, unknown>>(
      "SELECT COUNT(*) AS ada FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'template_laboratorium' AND COLUMN_NAME = 'method'",
    );
    const adaMethod = Number(kolomMethod[0]?.ada) > 0;
    const kolomMethodSql = adaMethod ? "CAST(t.method AS CHAR) AS method" : "'' AS method";

    let sql = `
      SELECT pl.no_rawat,
             DATE_FORMAT(pl.tgl_periksa, '%Y-%m-%d') AS tgl_periksa,
             pl.jam, pl.status,
              r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur, pj.png_jawab,
              j.kd_jenis_prw, j.nm_perawatan,
             pl.biaya,
             t.id_template, t.Pemeriksaan AS pemeriksaan,
             ${kolomMethodSql},
             d.nilai, t.satuan, d.nilai_rujukan, d.keterangan, d.biaya_item,
             COALESCE(petugas.nip, '') AS nip,
             COALESCE(petugas.nama, '') AS nm_petugas,
             COALESCE(dokter_rujuk.nm_dokter, '') AS dokter_perujuk,
             COALESCE(dokter_pj.nm_dokter, '') AS penanggung_jawab,
             COALESCE(sk.saran, '') AS saran,
             COALESCE(sk.kesan, '') AS kesan,
              COALESCE(plm.noorder, '') AS noorder,
              CASE WHEN EXISTS (SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = pl.no_rawat) THEN 'Kamar' ELSE 'Poli' END AS jenis_ruang,
              COALESCE(
                (SELECT bangsal.nm_bangsal
                FROM kamar_inap ki
                INNER JOIN kamar ON kamar.kd_kamar = ki.kd_kamar
                INNER JOIN bangsal ON bangsal.kd_bangsal = kamar.kd_bangsal
                WHERE ki.no_rawat = pl.no_rawat
                ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC
                LIMIT 1),
               poli.nm_poli, ''
             ) AS ruang
      FROM periksa_lab pl
      INNER JOIN reg_periksa r ON r.no_rawat = pl.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN jns_perawatan_lab j ON j.kd_jenis_prw = pl.kd_jenis_prw
      INNER JOIN detail_periksa_lab d ON d.no_rawat = pl.no_rawat
        AND d.kd_jenis_prw = pl.kd_jenis_prw
        AND d.tgl_periksa = pl.tgl_periksa AND d.jam = pl.jam
      INNER JOIN template_laboratorium t ON t.id_template = d.id_template
      LEFT JOIN petugas ON petugas.nip = pl.nip
      LEFT JOIN dokter dokter_pj ON dokter_pj.kd_dokter = pl.kd_dokter
      LEFT JOIN dokter dokter_rujuk ON dokter_rujuk.kd_dokter = pl.dokter_perujuk
      LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
      LEFT JOIN poliklinik poli ON poli.kd_poli = r.kd_poli
      LEFT JOIN saran_kesan_lab sk ON sk.no_rawat = pl.no_rawat
        AND sk.tgl_periksa = pl.tgl_periksa AND sk.jam = pl.jam
      LEFT JOIN (
        SELECT no_rawat, tgl_permintaan, jam_permintaan, MIN(noorder) AS noorder
        FROM permintaan_lab
        GROUP BY no_rawat, tgl_permintaan, jam_permintaan
      ) plm ON plm.no_rawat = pl.no_rawat
        AND plm.tgl_permintaan = pl.tgl_periksa
        AND plm.jam_permintaan = pl.jam
      WHERE pl.kategori = 'PK'
    `;
    const params: (string | number)[] = [];

    if (tanggalMulai) { sql += " AND pl.tgl_periksa >= ?"; params.push(tanggalMulai); }
    if (tanggalSelesai) { sql += " AND pl.tgl_periksa <= ?"; params.push(tanggalSelesai); }
    if (noRawat) { sql += " AND pl.no_rawat = ?"; params.push(noRawat); }
    if (noRm) { sql += " AND r.no_rkm_medis = ?"; params.push(noRm); }
    if (nip) { sql += " AND petugas.nip = ?"; params.push(nip); }
    if (status) { sql += " AND pl.status = ?"; params.push(status); }
    if (kataKunci) {
      const pencarian = `%${kataKunci}%`;
      sql += ` AND (pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR petugas.nama LIKE ? OR dokter_rujuk.nm_dokter LIKE ? OR dokter_pj.nm_dokter LIKE ? OR j.nm_perawatan LIKE ? OR t.Pemeriksaan LIKE ? OR d.nilai LIKE ? OR d.keterangan LIKE ? OR pj.png_jawab LIKE ?)`;
      params.push(pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian);
    }

    sql += " ORDER BY pl.tgl_periksa DESC, pl.jam DESC, pl.no_rawat DESC, j.kd_jenis_prw, t.urut LIMIT ?";
    params.push(limit);
    const barisData = await executeQuery<Record<string, unknown>>(sql, params);

    if (mode === "item") {
      return NextResponse.json({ success: true, data: barisData.map(jadikanItem).map((item, indeks) => ({ ...barisData[indeks], ...item })) });
    }

    const kunjungan = kelompokkanKunjungan(barisData);
    if (mode === "data") {
      return NextResponse.json({ success: true, data: kunjungan });
    }

    const petaPasien = new Map<string, DetailPasien>();
    for (const item of kunjungan) {
      const kunci = item.no_rkm_medis;
      const pasien = petaPasien.get(kunci);
      if (pasien) pasien.kunjungan.push(item);
      else petaPasien.set(kunci, {
        no_rkm_medis: item.no_rkm_medis,
        nm_pasien: item.nm_pasien,
        jk: item.jk,
        umur: item.umur,
        sttsumur: item.sttsumur,
        png_jawab: item.png_jawab,
        kunjungan: [item],
      });
    }
    const detail = [...petaPasien.values()];
    const ringkasan = {
      jumlah_pasien: detail.length,
      jumlah_kunjungan: kunjungan.length,
      jumlah_pemeriksaan: kunjungan.reduce((jumlah, item) => jumlah + new Set(item.item.map((sub) => sub.kd_jenis_prw)).size, 0),
      jumlah_sub_pemeriksaan: kunjungan.reduce((jumlah, item) => jumlah + item.item.length, 0),
    };
    return NextResponse.json({ success: true, data: { pasien: detail, ringkasan } });
  } catch (error: unknown) {
    console.error("Error in api/laboratorium/periksa-pk:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat hasil periksa laboratorium." }, { status: 500 });
  }
}

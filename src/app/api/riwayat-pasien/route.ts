import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";
import {
  MODE_RIWAYAT,
  TAB_RIWAYAT,
  type BarisRiwayat,
  type ModeRiwayat,
  type PasienRiwayat,
  type ResponsRiwayat,
  type TabRiwayat,
} from "@/lib/riwayat-pasien/types";

interface KonfigurasiInduk {
  dari: string;
  join: string;
  filter: string;
  tanggal: string;
  nomor: string;
  urutan: string;
  pilihan: string;
}

interface IdentitasBaris extends BarisRiwayat {
  no_rm: string;
  nama: string;
  jenis_kelamin?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  alamat?: string | null;
  agama?: string | null;
  pendidikan?: string | null;
  status_nikah?: string | null;
  golongan_darah?: string | null;
  nama_ibu?: string | null;
  bahasa?: string | null;
  cacat_fisik?: string | null;
}

class RiwayatError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

const KUNJUNGAN_PILIHAN = `r.no_rawat, r.no_reg AS no_registrasi,
  DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tanggal, r.jam_reg AS jam,
  r.status_lanjut, r.stts, r.kd_dokter, d.nm_dokter AS nama_dokter,
  r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli AS nama_poli,
  COALESCE(pj.png_jawab, r.kd_pj) AS jenis_bayar, r.biaya_reg AS biaya_registrasi,
  r.p_jawab AS penanggung_jawab, r.almt_pj AS alamat_penanggung, r.hubunganpj AS hubungan,
  (SELECT GROUP_CONCAT(CONCAT(rd.nm_dokter, ' (', ri.kd_poli, ')') SEPARATOR '; ')
   FROM rujukan_internal_poli ri INNER JOIN dokter rd ON rd.kd_dokter = ri.kd_dokter
   WHERE ri.no_rawat = r.no_rawat) AS rujukan_internal,
  (SELECT GROUP_CONCAT(dd.nm_dokter SEPARATOR '; ')
   FROM dpjp_ranap dr INNER JOIN dokter dd ON dd.kd_dokter = dr.kd_dokter
   WHERE dr.no_rawat = r.no_rawat) AS dpjp_ranap,
  (SELECT GROUP_CONCAT(CONCAT(k.kd_kamar, ' ', b.nm_bangsal) SEPARATOR '; ')
   FROM kamar_inap ki INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
   INNER JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
   WHERE ki.no_rawat = r.no_rawat) AS kamar`;

const KUNJUNGAN_DARI = "reg_periksa r";
const KUNJUNGAN_JOIN = `INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter
  INNER JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
  LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj`;
const KUNJUNGAN_FILTER = "r.stts <> 'Batal' AND r.no_rkm_medis = ?";

const KONFIGURASI: Record<TabRiwayat, KonfigurasiInduk> = {
  kunjungan: {
    dari: KUNJUNGAN_DARI,
    join: KUNJUNGAN_JOIN,
    filter: KUNJUNGAN_FILTER,
    tanggal: "r.tgl_registrasi",
    nomor: "r.no_rawat",
    urutan: "r.jam_reg DESC",
    pilihan: KUNJUNGAN_PILIHAN,
  },
  soapi: {
    dari: KUNJUNGAN_DARI,
    join: KUNJUNGAN_JOIN,
    filter: KUNJUNGAN_FILTER,
    tanggal: "r.tgl_registrasi",
    nomor: "r.no_rawat",
    urutan: "r.jam_reg DESC",
    pilihan: `r.no_rawat, r.no_reg AS no_registrasi,
      DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tanggal, r.jam_reg AS jam,
      r.status_lanjut, r.stts, d.nm_dokter AS nama_dokter, pol.nm_poli AS nama_poli`,
  },
  perawatan: {
    dari: KUNJUNGAN_DARI,
    join: KUNJUNGAN_JOIN,
    filter: KUNJUNGAN_FILTER,
    tanggal: "r.tgl_registrasi",
    nomor: "r.no_rawat",
    urutan: "r.jam_reg DESC",
    pilihan: KUNJUNGAN_PILIHAN,
  },
  pembelian: {
    dari: "penjualan j",
    join: `LEFT JOIN petugas pt ON pt.nip = j.nip
      LEFT JOIN bangsal b ON b.kd_bangsal = j.kd_bangsal`,
    filter: "j.status = 'Sudah Dibayar' AND j.no_rkm_medis = ?",
    tanggal: "j.tgl_jual",
    nomor: "j.nota_jual",
    urutan: "j.nota_jual DESC",
    pilihan: `j.nota_jual AS nomor, DATE_FORMAT(j.tgl_jual, '%Y-%m-%d') AS tanggal,
      COALESCE(pt.nama, j.nip) AS petugas, COALESCE(j.jns_jual, '-') AS jenis,
      COALESCE(j.keterangan, '-') AS keterangan, COALESCE(b.nm_bangsal, '-') AS asal_barang,
      COALESCE(j.nama_bayar, '-') AS cara_bayar, j.ppn`,
  },
  piutang: {
    dari: "piutang p",
    join: `LEFT JOIN petugas pt ON pt.nip = p.nip
      LEFT JOIN bangsal b ON b.kd_bangsal = p.kd_bangsal`,
    filter: "p.no_rkm_medis = ?",
    tanggal: "p.tgl_piutang",
    nomor: "p.nota_piutang",
    urutan: "p.nota_piutang DESC",
    pilihan: `p.nota_piutang AS nomor, DATE_FORMAT(p.tgl_piutang, '%Y-%m-%d') AS tanggal,
      DATE_FORMAT(p.tgltempo, '%Y-%m-%d') AS jatuh_tempo, COALESCE(pt.nama, p.nip) AS petugas,
      COALESCE(p.jns_jual, '-') AS jenis, COALESCE(p.catatan, '-') AS catatan,
      COALESCE(b.nm_bangsal, '-') AS asal_barang, p.sisapiutang, p.ppn`,
  },
  retensi: {
    dari: "retensi_pasien rp",
    join: "",
    filter: "rp.no_rkm_medis = ?",
    tanggal: "rp.tgl_retensi",
    nomor: "",
    urutan: "rp.tgl_retensi DESC",
    pilihan: `DATE_FORMAT(rp.tgl_retensi, '%Y-%m-%d') AS tanggal,
      DATE_FORMAT(rp.terakhir_daftar, '%Y-%m-%d') AS terakhir_daftar,
      CASE WHEN rp.lokasi_pdf IS NOT NULL AND rp.lokasi_pdf <> '' THEN 'Tersedia' ELSE 'Tidak ada' END AS berkas`,
  },
};

function tabDari(nilai: unknown): TabRiwayat {
  if (typeof nilai === "string" && (TAB_RIWAYAT as readonly string[]).includes(nilai)) return nilai as TabRiwayat;
  throw new RiwayatError("Jenis riwayat tidak valid.");
}

function modeDari(nilai: unknown): ModeRiwayat {
  if (typeof nilai === "string" && (MODE_RIWAYAT as readonly string[]).includes(nilai)) return nilai as ModeRiwayat;
  throw new RiwayatError("Mode pencarian tidak valid.");
}

function batas(nilai: string | null, nilaiAwal: number, minimum: number, maksimum: number) {
  const angka = Math.trunc(Number(nilai));
  return Number.isFinite(angka) ? Math.max(minimum, Math.min(angka, maksimum)) : nilaiAwal;
}

function holder(nilai: number) {
  return Array.from({ length: nilai }, () => "?").join(", ");
}

function kegagalan(error: unknown, pesan: string) {
  if (error instanceof RiwayatError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  return NextResponse.json({ success: false, error: pesan }, { status: 500 });
}

async function cariPasien(params: URLSearchParams) {
  const cari = (params.get("cari") || "").trim().slice(0, 70);
  if (cari.length < 2) return NextResponse.json({ success: true, data: { items: [] } });
  const pola = `%${cari}%`;
  const items = await executeQuery<{ no_rm: string; nama: string }>(`
    SELECT p.no_rkm_medis AS no_rm, p.nm_pasien AS nama
    FROM pasien p
    WHERE p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?
    ORDER BY (p.no_rkm_medis = ?) DESC, p.nm_pasien
    LIMIT 50
  `, [pola, pola, cari]);
  return NextResponse.json({ success: true, data: { items } });
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess();
    if (denied) return denied;

    const params = req.nextUrl.searchParams;
    if (params.get("resource") === "pasien") return cariPasien(params);
    const tab = tabDari(params.get("tab") || "kunjungan");
    const mode = modeDari(params.get("mode") || "terakhir");
    const noRm = (params.get("no_rm") || "").trim();
    if (!noRm || noRm.length > 20 || !/^[A-Za-z0-9./-]+$/.test(noRm)) {
      throw new RiwayatError("Nomor RM tidak valid.");
    }
    const tanggalAwal = params.get("tanggal_awal") || "";
    const tanggalAkhir = params.get("tanggal_akhir") || "";
    if (mode === "tanggal" && (!isRegistrationDate(tanggalAwal) || !isRegistrationDate(tanggalAkhir) || tanggalAwal > tanggalAkhir)) {
      throw new RiwayatError("Periode riwayat tidak valid.");
    }
    const nomor = (params.get("nomor") || "").trim();
    if (mode === "nomor" && tab !== "retensi" && (!nomor || nomor.length > 25)) {
      throw new RiwayatError("Nomor kunjungan atau nota tidak valid.");
    }

    const identitas = await ambilIdentitas(noRm);
    const konfigurasi = KONFIGURASI[tab];
    const where = [konfigurasi.filter];
    const nilaiWhere: (string | number)[] = [noRm];
    if (mode === "tanggal") {
      where.push(`${konfigurasi.tanggal} BETWEEN ? AND ?`);
      nilaiWhere.push(tanggalAwal, tanggalAkhir);
    } else if (mode === "nomor" && konfigurasi.nomor) {
      where.push(`${konfigurasi.nomor} = ?`);
      nilaiWhere.push(nomor);
    }
    const whereSql = `WHERE ${where.join(" AND ")}`;
    const batasSql = konfigurasi.join ? ` ${konfigurasi.join}` : "";
    const urutan = mode === "nomor"
      ? `ORDER BY ${konfigurasi.tanggal} DESC, ${konfigurasi.urutan}`
      : mode === "terakhir"
        ? `ORDER BY ${konfigurasi.tanggal} DESC, ${konfigurasi.urutan}`
        : `ORDER BY ${konfigurasi.tanggal} ASC, ${konfigurasi.urutan}`;
    const limit = mode === "terakhir" ? 5 : batas(params.get("limit"), 50, 1, 100);
    const offset = mode === "terakhir" ? 0 : batas(params.get("offset"), 0, 0, 100000);

    const [jumlah, items] = await Promise.all([
      executeQuery<{ total: number }>(`SELECT COUNT(*) AS total FROM ${konfigurasi.dari}${batasSql} ${whereSql}`, nilaiWhere),
      executeQuery<BarisRiwayat>(`SELECT ${konfigurasi.pilihan} FROM ${konfigurasi.dari}${batasSql} ${whereSql} ${urutan} LIMIT ? OFFSET ?`, [...nilaiWhere, limit, offset]),
    ]);

    if (tab === "soapi") await tambahSoapi(items);
    if (tab === "perawatan") await tambahPerawatan(items);
    if (tab === "pembelian") await tambahObat(items, "penjualan");
    if (tab === "piutang") await tambahObat(items, "piutang");

    const data: ResponsRiwayat = {
      pasien: identitas,
      items,
      total: Number(jumlah[0]?.total || 0),
      limit,
      offset,
      tab,
      mode,
    };
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return kegagalan(error, "Gagal memuat riwayat pasien.");
  }
}

async function ambilIdentitas(noRm: string): Promise<PasienRiwayat> {
  const rows = await executeQuery<IdentitasBaris>(`
    SELECT p.no_rkm_medis AS no_rm, p.nm_pasien AS nama, p.jk AS jenis_kelamin,
           p.tmp_lahir AS tempat_lahir, DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') AS tanggal_lahir,
           p.alamat, p.agama, p.pnd AS pendidikan, p.stts_nikah AS status_nikah,
           p.gol_darah, p.nm_ibu AS nama_ibu, b.nama_bahasa AS bahasa, c.nama_cacat AS cacat_fisik
    FROM pasien p
    LEFT JOIN bahasa_pasien b ON b.id = p.bahasa_pasien
    LEFT JOIN cacat_fisik c ON c.id = p.cacat_fisik
    WHERE p.no_rkm_medis = ? LIMIT 1
  `, [noRm]);
  const pasien = rows[0];
  if (!pasien) throw new RiwayatError("Pasien tidak ditemukan.", 404);
  return {
    no_rm: pasien.no_rm,
    nama: pasien.nama,
    jenis_kelamin: pasien.jenis_kelamin ?? null,
    tempat_lahir: pasien.tempat_lahir ?? null,
    tanggal_lahir: pasien.tanggal_lahir ?? null,
    alamat: pasien.alamat ?? null,
    agama: pasien.agama ?? null,
    pendidikan: pasien.pendidikan ?? null,
    status_nikah: pasien.status_nikah ?? null,
    golongan_darah: pasien.golongan_darah ?? null,
    nama_ibu: pasien.nama_ibu ?? null,
    bahasa: pasien.bahasa ?? null,
    cacat_fisik: pasien.cacat_fisik ?? null,
  };
}

async function tambahSoapi(items: BarisRiwayat[]) {
  if (items.length === 0) return;
  const nomor = items.map((item) => String(item.no_rawat));
  const rows = await executeQuery<BarisRiwayat>(`
    SELECT 'Ralan' AS sumber, pr.no_rawat, DATE_FORMAT(pr.tgl_perawatan, '%Y-%m-%d') AS tanggal,
           pr.jam_rawat AS jam, pr.nip, pg.nama AS petugas, pg.jbtn,
           pr.keluhan AS subjek, pr.pemeriksaan AS objek, pr.penilaian AS asesmen,
           pr.rtl AS plan, pr.instruksi, pr.evaluasi,
           CONCAT_WS(' | ',
             CONCAT('Suhu ', NULLIF(pr.suhu_tubuh, '')), CONCAT('TD ', NULLIF(pr.tensi, '')),
             CONCAT('Nadi ', NULLIF(pr.nadi, '')), CONCAT('RR ', NULLIF(pr.respirasi, '')),
             CONCAT('TB ', NULLIF(pr.tinggi, '')), CONCAT('BB ', NULLIF(pr.berat, '')),
             CONCAT('SpO2 ', NULLIF(pr.spo2, '')), CONCAT('GCS ', NULLIF(pr.gcs, '')),
             NULLIF(pr.kesadaran, ''), CONCAT('Alergi ', NULLIF(pr.alergi, '')),
             CONCAT('Lingkar perut ', NULLIF(pr.lingkar_perut, ''))) AS vital
    FROM pemeriksaan_ralan pr LEFT JOIN pegawai pg ON pg.nik = pr.nip
    WHERE pr.no_rawat IN (${holder(nomor.length)})
    UNION ALL
    SELECT 'Ranap' AS sumber, pr.no_rawat, DATE_FORMAT(pr.tgl_perawatan, '%Y-%m-%d') AS tanggal,
           pr.jam_rawat AS jam, pr.nip, pg.nama AS petugas, pg.jbtn,
           pr.keluhan AS subjek, pr.pemeriksaan AS objek, pr.penilaian AS asesmen,
           pr.rtl AS plan, pr.instruksi, pr.evaluasi,
           CONCAT_WS(' | ',
             CONCAT('Suhu ', NULLIF(pr.suhu_tubuh, '')), CONCAT('TD ', NULLIF(pr.tensi, '')),
             CONCAT('Nadi ', NULLIF(pr.nadi, '')), CONCAT('RR ', NULLIF(pr.respirasi, '')),
             CONCAT('TB ', NULLIF(pr.tinggi, '')), CONCAT('BB ', NULLIF(pr.berat, '')),
             CONCAT('SpO2 ', NULLIF(pr.spo2, '')), CONCAT('GCS ', NULLIF(pr.gcs, '')),
             NULLIF(pr.kesadaran, ''), CONCAT('Alergi ', NULLIF(pr.alergi, ''))) AS vital
    FROM pemeriksaan_ranap pr LEFT JOIN pegawai pg ON pg.nik = pr.nip
    WHERE pr.no_rawat IN (${holder(nomor.length)})
    ORDER BY no_rawat, tanggal, jam
  `, [...nomor, ...nomor]);
  const dikelompokkan = new Map<string, BarisRiwayat[]>();
  for (const baris of rows) {
    const kunci = String(baris.no_rawat);
    const daftar = dikelompokkan.get(kunci) || [];
    daftar.push(baris);
    dikelompokkan.set(kunci, daftar);
  }
  for (const item of items) item.detail = dikelompokkan.get(String(item.no_rawat)) || [];
}

async function tambahPerawatan(items: BarisRiwayat[]) {
  if (items.length === 0) return;
  const nomor = items.map((item) => String(item.no_rawat));
  const placeholder = holder(nomor.length);
  const [tindakan, kamar, diagnosa, prosedur, resume, sep] = await Promise.all([
    executeQuery<BarisRiwayat>(`
      SELECT 'Ralan' AS sumber, 'Dokter' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, r.kd_dokter,
             dd.nm_dokter AS nama_dokter, NULL AS nip, NULL AS petugas, r.biaya_rawat AS biaya
      FROM rawat_jl_dr r INNER JOIN jns_perawatan jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN dokter dd ON dd.kd_dokter = r.kd_dokter
      WHERE r.no_rawat IN (${placeholder})
      UNION ALL
      SELECT 'Ralan' AS sumber, 'Petugas' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, NULL AS kd_dokter,
             NULL AS nama_dokter, r.nip, pt.nama AS petugas, r.biaya_rawat AS biaya
      FROM rawat_jl_pr r INNER JOIN jns_perawatan jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN petugas pt ON pt.nip = r.nip
      WHERE r.no_rawat IN (${placeholder})
      UNION ALL
      SELECT 'Ralan' AS sumber, 'Dokter & Petugas' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, r.kd_dokter,
             dd.nm_dokter AS nama_dokter, r.nip, pt.nama AS petugas, r.biaya_rawat AS biaya
      FROM rawat_jl_drpr r INNER JOIN jns_perawatan jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN dokter dd ON dd.kd_dokter = r.kd_dokter
      LEFT JOIN petugas pt ON pt.nip = r.nip
      WHERE r.no_rawat IN (${placeholder})
      UNION ALL
      SELECT 'Ranap' AS sumber, 'Dokter' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, r.kd_dokter,
             dd.nm_dokter AS nama_dokter, NULL AS nip, NULL AS petugas, r.biaya_rawat AS biaya
      FROM rawat_inap_dr r INNER JOIN jns_perawatan_inap jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN dokter dd ON dd.kd_dokter = r.kd_dokter
      WHERE r.no_rawat IN (${placeholder})
      UNION ALL
      SELECT 'Ranap' AS sumber, 'Petugas' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, NULL AS kd_dokter,
             NULL AS nama_dokter, r.nip, pt.nama AS petugas, r.biaya_rawat AS biaya
      FROM rawat_inap_pr r INNER JOIN jns_perawatan_inap jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN petugas pt ON pt.nip = r.nip
      WHERE r.no_rawat IN (${placeholder})
      UNION ALL
      SELECT 'Ranap' AS sumber, 'Dokter & Petugas' AS jenis, r.no_rawat,
             DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tanggal, r.jam_rawat AS jam,
             r.kd_jenis_prw AS kode, jp.nm_perawatan AS nama, r.kd_dokter,
             dd.nm_dokter AS nama_dokter, r.nip, pt.nama AS petugas, r.biaya_rawat AS biaya
      FROM rawat_inap_drpr r INNER JOIN jns_perawatan_inap jp ON jp.kd_jenis_prw = r.kd_jenis_prw
      LEFT JOIN dokter dd ON dd.kd_dokter = r.kd_dokter
      LEFT JOIN petugas pt ON pt.nip = r.nip
      WHERE r.no_rawat IN (${placeholder})
      ORDER BY no_rawat, tanggal, jam
    `, [...nomor, ...nomor, ...nomor, ...nomor, ...nomor, ...nomor]),
    executeQuery<BarisRiwayat>(`
      SELECT ki.no_rawat, k.kd_kamar AS kode, b.nm_bangsal AS nama,
             DATE_FORMAT(ki.tgl_masuk, '%Y-%m-%d') AS tanggal_masuk, ki.jam_masuk,
             DATE_FORMAT(ki.tgl_keluar, '%Y-%m-%d') AS tanggal_keluar, ki.jam_keluar,
             ki.lama, ki.stts_pulang AS status, ki.ttl_biaya AS biaya
      FROM kamar_inap ki INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
      LEFT JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
      WHERE ki.no_rawat IN (${placeholder})
      ORDER BY ki.tgl_masuk, ki.jam_masuk
    `, nomor),
    executeQuery<BarisRiwayat>(`
      SELECT dp.no_rawat, dp.kd_penyakit AS kode, py.nm_penyakit AS nama,
             dp.status, dp.prioritas, dp.status_penyakit AS status_penyakit
      FROM diagnosa_pasien dp INNER JOIN penyakit py ON py.kd_penyakit = dp.kd_penyakit
      WHERE dp.no_rawat IN (${placeholder})
      ORDER BY dp.prioritas, dp.kd_penyakit
    `, nomor),
    executeQuery<BarisRiwayat>(`
      SELECT pp.no_rawat, pp.kode, COALESCE(ic.deskripsi_panjang, ic.deskripsi_pendek) AS nama,
             pp.status, pp.prioritas, NULL AS jumlah
      FROM prosedur_pasien pp LEFT JOIN icd9 ic ON ic.kode = pp.kode
      WHERE pp.no_rawat IN (${placeholder})
      ORDER BY pp.prioritas, pp.kode
    `, nomor),
    executeQuery<BarisRiwayat>(`
      SELECT rp.no_rawat, COALESCE(d.nm_dokter, rp.kd_dokter) AS dokter, rp.kondisi_pulang,
             rp.keluhan_utama, rp.jalannya_penyakit, rp.pemeriksaan_penunjang,
             rp.hasil_laborat, rp.diagnosa_utama, rp.prosedur_utama, rp.obat_pulang
      FROM resume_pasien rp LEFT JOIN dokter d ON d.kd_dokter = rp.kd_dokter
      WHERE rp.no_rawat IN (${placeholder})
    `, nomor),
    executeQuery<BarisRiwayat>(`
      SELECT no_rawat, no_sep AS nomor, DATE_FORMAT(tglsep, '%Y-%m-%d') AS tanggal,
             COALESCE(nmdiagnosaawal, diagawal) AS diagnosa,
             COALESCE(nmpolitujuan, kdpolitujuan) AS poli,
             COALESCE(nmdpdjp, kddpjp) AS dpjp
      FROM bridging_sep
      WHERE no_rawat IN (${placeholder})
      ORDER BY tglsep DESC
    `, nomor),
  ]);
  const [tindakanMap, kamarMap, diagnosaMap, prosedurMap, resumeMap, sepMap] = [
    dikelompokkan(tindakan, "no_rawat"),
    dikelompokkan(kamar, "no_rawat"),
    dikelompokkan(diagnosa, "no_rawat"),
    dikelompokkan(prosedur, "no_rawat"),
    dikelompokkan(resume, "no_rawat"),
    dikelompokkan(sep, "no_rawat"),
  ];
  for (const item of items) {
    const kunci = String(item.no_rawat);
    const daftarTindakan = tindakanMap.get(kunci) || [];
    const daftarKamar = kamarMap.get(kunci) || [];
    item.sections = {
      tindakan: daftarTindakan,
      kamar: daftarKamar,
      diagnosa: diagnosaMap.get(kunci) || [],
      prosedur: prosedurMap.get(kunci) || [],
      resume: resumeMap.get(kunci) || [],
      sep: sepMap.get(kunci) || [],
    };
    item.total_tindakan = jumlahBiaya(daftarTindakan);
    item.total_kamar = jumlahBiaya(daftarKamar);
    item.total_biaya = Number(item.biaya_registrasi || 0) + Number(item.total_tindakan) + Number(item.total_kamar);
  }
}

async function tambahObat(items: BarisRiwayat[], sumber: "penjualan" | "piutang") {
  if (items.length === 0) return;
  const nomor = items.map((item) => String(item.nomor));
  const placeholder = holder(nomor.length);
  const tabelDetail = sumber === "penjualan" ? "detailjual" : "detailpiutang";
  const kolomTanggal = sumber === "penjualan" ? "tgl_jual" : "tgl_piutang";
  const rows = await executeQuery<BarisRiwayat>(`
    SELECT d.nota_${sumber === "penjualan" ? "jual" : "piutang"} AS nomor,
           d.kode_brng AS kode, db.nama_brng AS nama, d.jumlah,
           COALESCE(ks.satuan, d.kode_sat) AS satuan, d.h_jual AS harga,
           d.subtotal, d.dis AS diskon, d.bsr_dis AS potongan, d.total,
           COALESCE(d.aturan_pakai, '-') AS aturan_pakai, COALESCE(d.no_batch, '-') AS no_batch
    FROM ${tabelDetail} d
    INNER JOIN ${sumber} j ON j.nota_${sumber === "penjualan" ? "jual" : "piutang"} = d.nota_${sumber === "penjualan" ? "jual" : "piutang"}
    LEFT JOIN databarang db ON db.kode_brng = d.kode_brng
    LEFT JOIN kodesatuan ks ON ks.kode_sat = d.kode_sat
    WHERE j.${kolomTanggal} IS NOT NULL AND d.nota_${sumber === "penjualan" ? "jual" : "piutang"} IN (${placeholder})
    ORDER BY nomor, d.kode_brng
  `, nomor);
  const dikelompokkanDetail = dikelompokkan(rows, "nomor");
  for (const item of items) item.detail = dikelompokkanDetail.get(String(item.nomor)) || [];
}

function dikelompokkan(rows: BarisRiwayat[], kunci: string) {
  const hasil = new Map<string, BarisRiwayat[]>();
  for (const baris of rows) {
    const nilai = String(baris[kunci]);
    const daftar = hasil.get(nilai) || [];
    daftar.push(baris);
    hasil.set(nilai, daftar);
  }
  return hasil;
}

function jumlahBiaya(rows: BarisRiwayat[]) {
  return rows.reduce((jumlah, baris) => jumlah + Number(baris.biaya || 0), 0);
}

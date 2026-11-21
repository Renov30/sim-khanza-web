import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";

const STATUS_RAWAT = new Set(["Ralan", "Ranap"]);
const BATAS_KATA_KUNCI = 100;
const BATAS_NO_RAWAT = 17;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
  const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
  const kataKunci = searchParams.get("cari")?.trim() || "";
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const parsedLimit = Number(searchParams.get("limit"));
  const limit = Number.isInteger(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 200;

  if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))) {
    return NextResponse.json({ success: false, error: "Format periode tidak valid.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai) {
    return NextResponse.json({ success: false, error: "Tanggal mulai tidak boleh melebihi tanggal selesai.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (kataKunci.length > BATAS_KATA_KUNCI || noRawat.length > BATAS_NO_RAWAT || (status && !STATUS_RAWAT.has(status))) {
    return NextResponse.json({ success: false, error: "Parameter filter tidak valid.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }

  try {
    let sql = `
      SELECT pl.no_rawat,
             DATE_FORMAT(pl.tgl_periksa, '%Y-%m-%d') AS tgl_periksa,
             pl.jam, pl.status,
             r.no_rkm_medis, p.nm_pasien, pj.png_jawab,
             j.kd_jenis_prw, j.nm_perawatan,
             t.Pemeriksaan AS pemeriksaan, d.nilai, t.satuan,
             d.nilai_rujukan, d.keterangan,
             COALESCE(petugas.nama, '') AS nm_petugas,
             COALESCE(dokter_rujuk.nm_dokter, '') AS dokter_perujuk,
             COALESCE(dokter_pj.nm_dokter, '') AS penanggung_jawab,
             CASE WHEN pl.status = 'Ranap' THEN COALESCE(bangsal.nm_bangsal, '') ELSE poli.nm_poli END AS ruang
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
      LEFT JOIN kamar_inap ki ON ki.no_rawat = pl.no_rawat AND ki.stts_pulang = 'Belum Pulang'
      LEFT JOIN kamar ON kamar.kd_kamar = ki.kd_kamar
      LEFT JOIN bangsal ON bangsal.kd_bangsal = kamar.kd_bangsal
      WHERE pl.kategori = 'PK'
    `;
    const params: (string | number)[] = [];

    if (tanggalMulai) { sql += " AND pl.tgl_periksa >= ?"; params.push(tanggalMulai); }
    if (tanggalSelesai) { sql += " AND pl.tgl_periksa <= ?"; params.push(tanggalSelesai); }
    if (noRawat) { sql += " AND pl.no_rawat = ?"; params.push(noRawat); }
    if (status) { sql += " AND pl.status = ?"; params.push(status); }
    if (kataKunci) {
      const pencarian = `%${kataKunci}%`;
      sql += ` AND (pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR petugas.nama LIKE ? OR dokter_rujuk.nm_dokter LIKE ? OR dokter_pj.nm_dokter LIKE ? OR j.nm_perawatan LIKE ? OR t.Pemeriksaan LIKE ? OR d.nilai LIKE ? OR d.keterangan LIKE ?)`;
      params.push(pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian);
    }

    sql += " ORDER BY pl.tgl_periksa DESC, pl.jam DESC, pl.no_rawat DESC, j.kd_jenis_prw, t.urut LIMIT ?";
    params.push(limit);
    const rows = await executeQuery<Record<string, unknown>>(sql, params);
    return NextResponse.json({ success: true, data: rows, total: rows.length });
  } catch (error: unknown) {
    console.error("Error in api/laboratorium/periksa-pk:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat hasil periksa laboratorium." }, { status: 500 });
  }
}

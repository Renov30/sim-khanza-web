import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { rawatJalanAccess } from "@/lib/rawat-jalan/access";

const STATUS_PERIKSA = ["Belum", "Sudah", "Batal", "Berkas Diterima", "Dirujuk", "Meninggal", "Dirawat", "Pulang Paksa"];
const STATUS_BAYAR = ["Sudah Bayar", "Belum Bayar"];

interface RawatJalanRow {
  no_reg: string;
  no_rawat: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  kd_poli: string;
  nm_poli: string;
  kd_pj: string;
  png_jawab: string | null;
  p_jawab: string;
  almt_pj: string;
  hubunganpj: string;
  biaya_reg: number | string;
  stts: string;
  status_bayar: string;
  status_poli: string;
  no_tlp: string;
}

export async function GET(req: NextRequest) {
  try {
    const denied = await rawatJalanAccess();
    if (denied) return denied;

    const { searchParams } = new URL(req.url);
    const tampilan = searchParams.get("tampilan") || "awal";
    const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
    const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
    const kdPj = searchParams.get("kd_pj")?.trim() || "";
    const kdPoli = searchParams.get("kd_poli")?.trim() || "";
    const kdDokter = searchParams.get("kd_dokter")?.trim() || "";
    const stts = searchParams.get("stts") || "Semua";
    const statusBayar = searchParams.get("status_bayar") || "Semua";
    const cari = searchParams.get("cari")?.trim() || "";
    const limit = Math.max(1, Math.min(Math.trunc(Number(searchParams.get("limit"))) || 100, 200));
    const page = Math.max(1, Math.trunc(Number(searchParams.get("page"))) || 1);

    const tanggalValid = (!tanggalMulai || isRegistrationDate(tanggalMulai))
      && (!tanggalSelesai || isRegistrationDate(tanggalSelesai));
    const rentangValid = !tanggalMulai || !tanggalSelesai || tanggalMulai <= tanggalSelesai;
    const statusValid = stts === "Semua" || STATUS_PERIKSA.includes(stts);
    const bayarValid = statusBayar === "Semua" || STATUS_BAYAR.includes(statusBayar);
    if (!tanggalValid || !rentangValid || !statusValid || !bayarValid || !["awal", "rujukan_internal"].includes(tampilan)) {
      return NextResponse.json({ success: false, error: "Filter rawat jalan tidak valid." }, { status: 400 });
    }

    const rujukan = tampilan === "rujukan_internal";
    const kolomDokter = rujukan ? "rip.kd_dokter" : "r.kd_dokter";
    const kolomPoli = rujukan ? "rip.kd_poli" : "r.kd_poli";
    const joinRujukan = rujukan ? "INNER JOIN rujukan_internal_poli rip ON rip.no_rawat = r.no_rawat" : "";

    const where: string[] = ["r.status_lanjut = 'Ralan'"];
    const params: (string | number)[] = [];

    if (tanggalMulai) { where.push("r.tgl_registrasi >= ?"); params.push(tanggalMulai); }
    if (tanggalSelesai) { where.push("r.tgl_registrasi <= ?"); params.push(tanggalSelesai); }
    if (kdPj) { where.push("r.kd_pj = ?"); params.push(kdPj); }
    if (kdPoli) { where.push(`${kolomPoli} = ?`); params.push(kdPoli); }
    if (kdDokter) { where.push(`${kolomDokter} = ?`); params.push(kdDokter); }
    if (stts !== "Semua") { where.push("r.stts = ?"); params.push(stts); }
    if (statusBayar !== "Semua") { where.push("r.status_bayar = ?"); params.push(statusBayar); }

    if (cari) {
      where.push(`(r.no_reg LIKE ? OR r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?
        OR d.nm_dokter LIKE ? OR pol.nm_poli LIKE ? OR r.p_jawab LIKE ? OR pj.png_jawab LIKE ?
        OR r.almt_pj LIKE ? OR r.hubunganpj LIKE ?)`);
      params.push(...Array<string>(10).fill(`%${cari}%`));
    }
    const whereSql = `WHERE ${where.join(" AND ")}`;

    const sql = `
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
             r.jam_reg, ${kolomDokter}, d.nm_dokter,
             r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur,
             ${kolomPoli}, pol.nm_poli,
             r.kd_pj, pj.png_jawab, r.p_jawab, r.almt_pj, r.hubunganpj, r.biaya_reg,
             r.stts, r.status_bayar, r.status_poli, p.no_tlp
      FROM reg_periksa r
      ${joinRujukan}
      INNER JOIN dokter d ON d.kd_dokter = ${kolomDokter}
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN poliklinik pol ON pol.kd_poli = ${kolomPoli}
      LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
      ${whereSql}
      ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC, r.no_rawat DESC
      LIMIT ? OFFSET ?
    `;

    // COUNT cukup memakai join yang dibutuhkan filter pencarian.
    const countJoins = cari
      ? `${joinRujukan}
         INNER JOIN dokter d ON d.kd_dokter = ${kolomDokter}
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         INNER JOIN poliklinik pol ON pol.kd_poli = ${kolomPoli}
         LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj`
      : joinRujukan;
    const countSql = `SELECT COUNT(*) AS total FROM reg_periksa r ${countJoins} ${whereSql}`;

    const offset = (page - 1) * limit;
    const [counts, rows] = await Promise.all([
      executeQuery<{ total: number }>(countSql, params),
      executeQuery<RawatJalanRow>(sql, [...params, limit, offset]),
    ]);
    const total = Number(counts[0]?.total || 0);
    const currentPage = Math.min(page, Math.max(1, Math.ceil(total / limit)));

    if (currentPage !== page) {
      const rowsUlang = await executeQuery<RawatJalanRow>(sql, [...params, limit, (currentPage - 1) * limit]);
      return NextResponse.json({ success: true, data: rowsUlang, total, page: currentPage, limit });
    }

    return NextResponse.json({ success: true, data: rows, total, page: currentPage, limit });
  } catch (error: unknown) {
    console.error("Error in api/rawat-jalan:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat data rawat jalan" }, { status: 500 });
  }
}

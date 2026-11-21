import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate, registrationDate } from "@/lib/registrasi/date";

const FILTER_SEP = ["Semua", "Belum", "Sudah"] as const;
const STATUS_PERIKSA = ["Semua", "Belum", "Sudah", "Batal"] as const;

type FilterSep = (typeof FILTER_SEP)[number];
type StatusPeriksa = (typeof STATUS_PERIKSA)[number];

function responsTidakValid(pesan: string) {
  return NextResponse.json({ success: false, error: pesan, code: "INVALID_FILTER" }, { status: 400 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sekarang = registrationDate();
    const tanggalMulai = searchParams.get("tanggal_mulai") || sekarang;
    const tanggalSelesai = searchParams.get("tanggal_selesai") || sekarang;
    const cari = (searchParams.get("cari") || "").trim();
    const sep = (searchParams.get("sep") || "Semua") as FilterSep;
    const stts = (searchParams.get("stts") || "Semua") as StatusPeriksa;
    const limitMentah = searchParams.get("limit");
    const limit = limitMentah === null ? 50 : Number(limitMentah);

    if (!isRegistrationDate(tanggalMulai) || !isRegistrationDate(tanggalSelesai)) {
      return responsTidakValid("Tanggal filter tidak valid");
    }
    if (tanggalMulai > tanggalSelesai) return responsTidakValid("Rentang tanggal tidak valid");
    if (!FILTER_SEP.includes(sep)) return responsTidakValid("Filter SEP tidak dikenal");
    if (!STATUS_PERIKSA.includes(stts)) return responsTidakValid("Status periksa tidak dikenal");
    if (cari.length > 100) return responsTidakValid("Pencarian terlalu panjang");
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) return responsTidakValid("Batas data tidak valid");

    const where = [
      "r.kd_poli = 'IGDK'",
      "r.tgl_registrasi >= ?",
      "r.tgl_registrasi < DATE_ADD(?, INTERVAL 1 DAY)",
    ];
    const params: (string | number)[] = [tanggalMulai, tanggalSelesai];

    if (cari) {
      where.push(`(
        r.no_reg LIKE ? OR r.no_rawat LIKE ? OR r.tgl_registrasi LIKE ? OR r.kd_dokter LIKE ?
        OR d.nm_dokter LIKE ? OR r.no_rkm_medis LIKE ? OR r.stts_daftar LIKE ?
        OR p.nm_pasien LIKE ? OR pol.nm_poli LIKE ? OR r.p_jawab LIKE ?
        OR r.almt_pj LIKE ? OR r.hubunganpj LIKE ? OR penj.png_jawab LIKE ?
      )`);
      const kata = `%${cari}%`;
      params.push(kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata);
    }
    if (stts !== "Semua") {
      where.push("r.stts = ?");
      params.push(stts);
    }
    if (sep === "Belum") {
      where.push("r.kd_pj IN (SELECT password_asuransi.kd_pj FROM password_asuransi)");
      where.push("r.no_rawat NOT IN (SELECT bridging_sep.no_rawat FROM bridging_sep)");
    }
    if (sep === "Sudah") {
      where.push("r.kd_pj IN (SELECT password_asuransi.kd_pj FROM password_asuransi)");
      where.push("r.no_rawat IN (SELECT bridging_sep.no_rawat FROM bridging_sep)");
    }

    const sumber = `
      FROM reg_periksa r
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON r.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      LEFT JOIN penjab penj ON r.kd_pj = penj.kd_pj
    `;
    const klausa = ` WHERE ${where.join(" AND ")}`;

    const hitung = await executeQuery<{ total: number }>(`SELECT COUNT(*) AS total ${sumber}${klausa}`, params);
    const total = Number(hitung[0]?.total || 0);

    const sql = `
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
             r.jam_reg, r.kd_dokter, d.nm_dokter, r.no_rkm_medis, p.nm_pasien,
             p.jk, r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli,
             r.stts_daftar, penj.png_jawab, r.p_jawab, r.almt_pj, r.hubunganpj,
             r.biaya_reg, r.stts, r.status_lanjut, r.kd_pj, r.status_bayar
      ${sumber}${klausa}
      ORDER BY r.no_rawat
      LIMIT ?
    `;
    const rows = await executeQuery<Record<string, unknown>>(sql, [...params, limit]);

    return NextResponse.json({ success: true, data: rows, total });
  } catch (error: unknown) {
    console.error("Error in api/igd:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data IGD", code: "IGD_ERROR" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT dp.no_rawat, DATE_FORMAT(dp.tgl_periksa, '%Y-%m-%d') as tgl_periksa, dp.jam,
             dp.kd_jenis_prw, j.nm_perawatan,
             r.no_rkm_medis, p.nm_pasien, p.jk,
             dp.diagnosa_klinik, dp.makroskopik, dp.mikroskopik, dp.kesimpulan, dp.kesan
      FROM detail_periksa_labpa dp
      INNER JOIN reg_periksa r ON dp.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan_lab j ON dp.kd_jenis_prw = j.kd_jenis_prw
      WHERE 1=1
    `;
    const params: any[] = [];

    if (cari.trim()) {
      sql += ` AND (dp.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY dp.tgl_periksa DESC, dp.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/laboratorium/periksa-pa:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data periksa lab PA" },
      { status: 500 }
    );
  }
}


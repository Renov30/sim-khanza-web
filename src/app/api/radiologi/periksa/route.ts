import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT pr.no_rawat, DATE_FORMAT(pr.tgl_periksa, '%Y-%m-%d') as tgl_periksa, pr.jam,
             pr.kd_jenis_prw, j.nm_perawatan, pr.biaya, pr.dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk, d.nm_dokter,
             pr.proyeksi, pr.kV, pr.mAS, pr.status
      FROM periksa_radiologi pr
      INNER JOIN reg_periksa r ON pr.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan_radiologi j ON pr.kd_jenis_prw = j.kd_jenis_prw
      LEFT JOIN dokter d ON pr.kd_dokter = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status !== "Semua") {
      sql += ` AND pr.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pr.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY pr.tgl_periksa DESC, pr.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/radiologi/periksa:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data periksa radiologi" },
      { status: 500 }
    );
  }
}


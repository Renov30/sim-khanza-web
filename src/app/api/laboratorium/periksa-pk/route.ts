import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT pl.no_rawat, DATE_FORMAT(pl.tgl_periksa, '%Y-%m-%d') as tgl_periksa, pl.jam,
             pl.kd_jenis_prw, j.nm_perawatan, pl.biaya, pl.dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk, d.nm_dokter,
             pl.status, pl.kategori
      FROM periksa_lab pl
      INNER JOIN reg_periksa r ON pl.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan_lab j ON pl.kd_jenis_prw = j.kd_jenis_prw
      LEFT JOIN dokter d ON pl.kd_dokter = d.kd_dokter
      WHERE (pl.kategori = 'PK' OR pl.kategori IS NULL OR pl.kategori = '')
    `;
    const params: any[] = [];

    if (status !== "Semua") {
      sql += ` AND pl.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY pl.tgl_periksa DESC, pl.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/laboratorium/periksa-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data periksa lab PK" },
      { status: 500 }
    );
  }
}


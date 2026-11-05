import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT pl.noorder, pl.no_rawat, DATE_FORMAT(pl.tgl_permintaan, '%Y-%m-%d') as tgl_permintaan, pl.jam_permintaan,
             DATE_FORMAT(pl.tgl_sampel, '%Y-%m-%d') as tgl_sampel, pl.jam_sampel,
             DATE_FORMAT(pl.tgl_hasil, '%Y-%m-%d') as tgl_hasil, pl.jam_hasil,
             pl.dokter_perujuk, d.nm_dokter as nm_dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk,
             pl.status, pl.informasi_tambahan, pl.diagnosa_klinis
      FROM permintaan_lab pl
      INNER JOIN reg_periksa r ON pl.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN dokter d ON pl.dokter_perujuk = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status !== "Semua") {
      sql += ` AND pl.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pl.noorder LIKE ? OR pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY pl.tgl_permintaan DESC, pl.jam_permintaan DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/laboratorium/permintaan-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data permintaan lab PK" },
      { status: 500 }
    );
  }
}


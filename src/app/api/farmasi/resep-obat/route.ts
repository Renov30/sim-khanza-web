import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT ro.no_resep, DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') as tgl_peresepan, ro.jam_peresepan,
             DATE_FORMAT(ro.tgl_penyerahan, '%Y-%m-%d') as tgl_penyerahan, ro.jam_penyerahan,
             ro.no_rawat, ro.kd_dokter, d.nm_dokter,
             r.no_rkm_medis, p.nm_pasien, p.jk,
             ro.status, pol.nm_poli
      FROM resep_obat ro
      INNER JOIN reg_periksa r ON ro.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN dokter d ON ro.kd_dokter = d.kd_dokter
      LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status !== "Semua") {
      sql += ` AND ro.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (ro.no_resep LIKE ? OR ro.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY ro.tgl_peresepan DESC, ro.jam_peresepan DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/farmasi/resep-obat:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data nomor resep obat" },
      { status: 500 }
    );
  }
}


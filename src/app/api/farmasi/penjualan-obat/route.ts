import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT p.nota_jual, DATE_FORMAT(p.tgl_jual, '%Y-%m-%d') as tgl_jual,
             p.no_rkm_medis, p.nm_pasien, p.keterangan, p.jns_jual,
             p.ongkir, p.ppn, p.status, p.kd_bangsal, p.nama_bayar,
             COALESCE(SUM(dj.total), 0) as total_biaya,
             COALESCE(COUNT(dj.kode_brng), 0) as total_item
      FROM penjualan p
      LEFT JOIN detailjual dj ON p.nota_jual = dj.nota_jual
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status !== "Semua") {
      sql += ` AND p.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (p.nota_jual LIKE ? OR p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR p.keterangan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` GROUP BY p.nota_jual ORDER BY p.tgl_jual DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/farmasi/penjualan-obat:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data penjualan obat" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT upd.no_penyerahan, DATE_FORMAT(upd.tanggal, '%Y-%m-%d') as tanggal,
             upd.dinas, upd.keterangan, upd.status,
             upd.pengambil_darah, upd.alamat_pengambil_darah, upd.besarppn
      FROM utd_penyerahan_darah upd
      WHERE 1=1
    `;
    const params: any[] = [];

    if (cari.trim()) {
      sql += ` AND (upd.no_penyerahan LIKE ? OR upd.pengambil_darah LIKE ? OR upd.keterangan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw);
    }

    sql += ` ORDER BY upd.tanggal DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/farmasi/penyerahan-darah:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data penyerahan darah" },
      { status: 500 }
    );
  }
}


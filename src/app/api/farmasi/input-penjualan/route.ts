import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";

    let sql = `
      SELECT b.kode_brng, b.nama_brng, b.kode_sat, s.satuan, b.ralan as harga_jual, b.stok
      FROM databarang b
      LEFT JOIN kodesatuan s ON b.kode_sat = s.kode_sat
      WHERE b.status = '1'
    `;
    const params: any[] = [];

    if (cari.trim()) {
      sql += ` AND (b.kode_brng LIKE ? OR b.nama_brng LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw);
    }

    sql += ` ORDER BY b.nama_brng ASC LIMIT 50`;

    const barang = await executeQuery<any[]>(sql, params);
    const gudang = await executeQuery<any[]>("SELECT kd_bangsal, nm_bangsal FROM bangsal ORDER BY nm_bangsal ASC", []);

    return NextResponse.json({
      success: true,
      data: {
        barang,
        gudang,
      },
    });
  } catch (error: any) {
    console.error("Error in api/farmasi/input-penjualan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data form input penjualan" },
      { status: 500 }
    );
  }
}


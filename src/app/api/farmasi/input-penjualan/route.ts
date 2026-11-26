import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = (searchParams.get("cari") || "").trim().slice(0, 80);
    const kdBangsal = (searchParams.get("kd_bangsal") || "").trim();
    if (kdBangsal && !/^[A-Za-z0-9]{1,5}$/.test(kdBangsal)) {
      return NextResponse.json(
        { success: false, error: "Lokasi gudang tidak valid", code: "GUDANG_TIDAK_VALID" },
        { status: 400 },
      );
    }

    let sql = `
      SELECT b.kode_brng, b.nama_brng, b.kode_sat, s.satuan,
             COALESCE(j.nama, '-') AS kategori, b.ralan AS harga_jual,
             COALESCE(SUM(gb.stok), 0) AS stok
      FROM databarang b
      LEFT JOIN kodesatuan s ON b.kode_sat = s.kode_sat
      LEFT JOIN jenis j ON b.kdjns = j.kdjns
      LEFT JOIN gudangbarang gb ON gb.kode_brng = b.kode_brng${kdBangsal ? " AND gb.kd_bangsal = ?" : ""}
      WHERE b.status = '1'
    `;
    const params: string[] = kdBangsal ? [kdBangsal] : [];

    if (cari) {
      sql += ` AND (b.kode_brng LIKE ? OR b.nama_brng LIKE ?)`;
      const kw = `%${cari}%`;
      params.push(kw, kw);
    }

    sql += `
      GROUP BY b.kode_brng, b.nama_brng, b.kode_sat, s.satuan, j.nama, b.ralan
      ORDER BY b.nama_brng ASC
      LIMIT 50
    `;

    const barang = await executeQuery<Record<string, unknown>>(sql, params);
    const gudang = await executeQuery<Record<string, unknown>>("SELECT kd_bangsal, nm_bangsal FROM bangsal ORDER BY nm_bangsal ASC", []);

    return NextResponse.json({
      success: true,
      data: {
        barang,
        gudang,
      },
    });
  } catch (error: unknown) {
    console.error("Error in api/farmasi/input-penjualan:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data form input penjualan" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT rd.no_resep, ro.no_rawat,
             DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') as tgl_peresepan, ro.jam_peresepan,
             r.no_rkm_medis, p.nm_pasien, d.nm_dokter,
             rd.kode_brng, b.nama_brng, rd.jml, rd.aturan_pakai,
             ro.status
      FROM resep_dokter rd
      INNER JOIN resep_obat ro ON rd.no_resep = ro.no_resep
      INNER JOIN reg_periksa r ON ro.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN databarang b ON rd.kode_brng = b.kode_brng
      LEFT JOIN dokter d ON ro.kd_dokter = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (cari.trim()) {
      sql += ` AND (rd.no_resep LIKE ? OR ro.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR b.nama_brng LIKE ?)`;
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
    console.error("Error in api/farmasi/daftar-resep-dokter:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data daftar resep dokter" },
      { status: 500 }
    );
  }
}


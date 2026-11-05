import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT dpo.no_rawat, DATE_FORMAT(dpo.tgl_perawatan, '%Y-%m-%d') as tgl_perawatan, dpo.jam,
             dpo.kode_brng, b.nama_brng, dpo.jml, dpo.biaya_obat, dpo.embalase, dpo.tuslah, dpo.total,
             dpo.status, dpo.no_batch, dpo.no_faktur,
             r.no_rkm_medis, p.nm_pasien, p.jk
      FROM detail_pemberian_obat dpo
      INNER JOIN reg_periksa r ON dpo.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN databarang b ON dpo.kode_brng = b.kode_brng
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND dpo.tgl_perawatan BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (cari.trim()) {
      sql += ` AND (dpo.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR b.nama_brng LIKE ? OR dpo.kode_brng LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY dpo.tgl_perawatan DESC, dpo.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/farmasi:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data farmasi" },
      { status: 500 }
    );
  }
}


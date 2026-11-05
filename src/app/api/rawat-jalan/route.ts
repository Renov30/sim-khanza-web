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
      SELECT rjd.no_rawat, DATE_FORMAT(rjd.tgl_perawatan, '%Y-%m-%d') as tgl_perawatan, rjd.jam_rawat,
             rjd.kd_jenis_prw, j.nm_perawatan, rjd.biaya_rawat,
             r.no_rkm_medis, p.nm_pasien, p.jk, d.nm_dokter, pol.nm_poli,
             rjd.stts_bayar
      FROM rawat_jl_dr rjd
      INNER JOIN reg_periksa r ON rjd.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan j ON rjd.kd_jenis_prw = j.kd_jenis_prw
      LEFT JOIN dokter d ON rjd.kd_dokter = d.kd_dokter
      LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND rjd.tgl_perawatan BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (cari.trim()) {
      sql += ` AND (rjd.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY rjd.tgl_perawatan DESC, rjd.jam_rawat DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/rawat-jalan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data rawat jalan" },
      { status: 500 }
    );
  }
}


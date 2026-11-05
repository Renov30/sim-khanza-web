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
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') as tgl_registrasi, 
             r.jam_reg, r.kd_dokter, d.nm_dokter, r.no_rkm_medis, p.nm_pasien, 
             p.jk, r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli, 
             r.p_jawab, r.almt_pj, r.hubunganpj, r.biaya_reg, r.stts, 
             r.status_lanjut, r.status_bayar
      FROM reg_periksa r
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON r.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      WHERE (r.kd_poli = 'IGD' OR pol.nm_poli LIKE '%IGD%' OR pol.nm_poli LIKE '%DARURAT%')
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND r.tgl_registrasi BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (cari.trim()) {
      sql += ` AND (r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/igd:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data IGD" },
      { status: 500 }
    );
  }
}


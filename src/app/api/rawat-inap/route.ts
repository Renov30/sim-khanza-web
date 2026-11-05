import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const statusPulang = searchParams.get("status_pulang") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

    let sql = `
      SELECT ki.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, p.alamat,
             r.p_jawab, r.hubunganpj,
             ki.kd_kamar, b.nm_bangsal, ki.trf_kamar,
             ki.diagnosa_awal, ki.diagnosa_akhir,
             DATE_FORMAT(ki.tgl_masuk, '%Y-%m-%d') as tgl_masuk, ki.jam_masuk,
             DATE_FORMAT(ki.tgl_keluar, '%Y-%m-%d') as tgl_keluar, ki.jam_keluar,
             ki.ttl_biaya, ki.stts_pulang, ki.lama
      FROM kamar_inap ki
      INNER JOIN reg_periksa r ON ki.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN kamar k ON ki.kd_kamar = k.kd_kamar
      LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
      WHERE 1=1
    `;
    const params: any[] = [];

    if (statusPulang !== "Semua") {
      sql += ` AND ki.stts_pulang = ?`;
      params.push(statusPulang);
    }

    if (cari.trim()) {
      sql += ` AND (ki.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR ki.kd_kamar LIKE ? OR b.nm_bangsal LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/rawat-inap:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data rawat inap" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 200);

    let sql = `
      SELECT rjd.no_rawat, DATE_FORMAT(rjd.tgl_perawatan, '%Y-%m-%d') as tgl_perawatan, rjd.jam_rawat,
             rjd.kd_jenis_prw, j.nm_perawatan, rjd.biaya_rawat,
             r.no_rkm_medis, p.nm_pasien, p.jk, rjd.kd_dokter, d.nm_dokter, pol.nm_poli,
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
      { success: false, error: error.message || "Gagal memuat data tindakan rawat jalan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      no_rawat,
      kd_jenis_prw,
      kd_dokter,
      tgl_perawatan,
      jam_rawat,
      material = 0,
      bhp = 0,
      tarif_tindakandr = 0,
      kso = 0,
      menejemen = 0,
      biaya_rawat = 0,
      stts_bayar = "Belum Bayar",
    } = body;

    if (!no_rawat || !kd_jenis_prw || !kd_dokter) {
      return NextResponse.json(
        { success: false, error: "Data wajib (no_rawat, kd_jenis_prw, kd_dokter) harus diisi!" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO rawat_jl_dr (
        no_rawat, kd_jenis_prw, kd_dokter, tgl_perawatan, jam_rawat,
        material, bhp, tarif_tindakandr, kso, menejemen, biaya_rawat, stts_bayar
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        biaya_rawat = VALUES(biaya_rawat),
        tarif_tindakandr = VALUES(tarif_tindakandr),
        stts_bayar = VALUES(stts_bayar)
    `;

    await executeQuery(sql, [
      no_rawat,
      kd_jenis_prw,
      kd_dokter,
      tgl_perawatan || new Date().toISOString().slice(0, 10),
      jam_rawat || new Date().toTimeString().slice(0, 8),
      material,
      bhp,
      tarif_tindakandr,
      kso,
      menejemen,
      biaya_rawat || tarif_tindakandr,
      stts_bayar,
    ]);

    return NextResponse.json({
      success: true,
      message: "Tindakan rawat jalan dokter berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/rawat-jalan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan tindakan rawat jalan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const no_rawat = searchParams.get("no_rawat");
    const kd_jenis_prw = searchParams.get("kd_jenis_prw");
    const tgl_perawatan = searchParams.get("tgl_perawatan");
    const jam_rawat = searchParams.get("jam_rawat");

    if (!no_rawat || !kd_jenis_prw) {
      return NextResponse.json(
        { success: false, error: "Parameter no_rawat dan kd_jenis_prw diperlukan" },
        { status: 400 }
      );
    }

    let sql = `DELETE FROM rawat_jl_dr WHERE no_rawat = ? AND kd_jenis_prw = ?`;
    const params = [no_rawat, kd_jenis_prw];

    if (tgl_perawatan && jam_rawat) {
      sql += ` AND tgl_perawatan = ? AND jam_rawat = ?`;
      params.push(tgl_perawatan, jam_rawat);
    }

    await executeQuery(sql, params);

    return NextResponse.json({
      success: true,
      message: `Tindakan ${kd_jenis_prw} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/rawat-jalan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus tindakan rawat jalan" },
      { status: 500 }
    );
  }
}

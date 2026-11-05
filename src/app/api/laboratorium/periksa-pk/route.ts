import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const status = searchParams.get("status") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 200);

    let sql = `
      SELECT pl.no_rawat, DATE_FORMAT(pl.tgl_periksa, '%Y-%m-%d') as tgl_periksa, pl.jam,
             pl.kd_jenis_prw, j.nm_perawatan, pl.biaya, pl.dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk, pl.kd_dokter, d.nm_dokter,
             pl.status, pl.kategori
      FROM periksa_lab pl
      INNER JOIN reg_periksa r ON pl.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan_lab j ON pl.kd_jenis_prw = j.kd_jenis_prw
      LEFT JOIN dokter d ON pl.kd_dokter = d.kd_dokter
      WHERE (pl.kategori = 'PK' OR pl.kategori IS NULL OR pl.kategori = '')
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND pl.tgl_periksa BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (status !== "Semua") {
      sql += ` AND pl.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY pl.tgl_periksa DESC, pl.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/laboratorium/periksa-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data periksa lab PK" },
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
      tgl_periksa,
      jam,
      kd_dokter = "D0000001",
      dokter_perujuk = "D0000001",
      biaya = 0,
      status = "ralan",
      kategori = "PK",
    } = body;

    if (!no_rawat || !kd_jenis_prw) {
      return NextResponse.json(
        { success: false, error: "No. Rawat dan Kode Pemeriksaan Lab harus diisi!" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO periksa_lab (
        no_rawat, kd_jenis_prw, tgl_periksa, jam, dokter_perujuk,
        kd_dokter, biaya, status, kategori
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        biaya = VALUES(biaya),
        kd_dokter = VALUES(kd_dokter),
        dokter_perujuk = VALUES(dokter_perujuk),
        status = VALUES(status)
    `;

    await executeQuery(sql, [
      no_rawat,
      kd_jenis_prw,
      tgl_periksa || new Date().toISOString().slice(0, 10),
      jam || new Date().toTimeString().slice(0, 8),
      dokter_perujuk,
      kd_dokter,
      biaya,
      status,
      kategori,
    ]);

    return NextResponse.json({
      success: true,
      message: "Hasil periksa Lab PK berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/laboratorium/periksa-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan hasil periksa lab" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const no_rawat = searchParams.get("no_rawat");
    const kd_jenis_prw = searchParams.get("kd_jenis_prw");
    const tgl_periksa = searchParams.get("tgl_periksa");
    const jam = searchParams.get("jam");

    if (!no_rawat || !kd_jenis_prw) {
      return NextResponse.json(
        { success: false, error: "Parameter no_rawat dan kd_jenis_prw diperlukan" },
        { status: 400 }
      );
    }

    let sql = `DELETE FROM periksa_lab WHERE no_rawat = ? AND kd_jenis_prw = ?`;
    const params = [no_rawat, kd_jenis_prw];
    if (tgl_periksa && jam) {
      sql += ` AND tgl_periksa = ? AND jam = ?`;
      params.push(tgl_periksa, jam);
    }

    await executeQuery(sql, params);

    return NextResponse.json({
      success: true,
      message: `Pemeriksaan lab ${kd_jenis_prw} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/laboratorium/periksa-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus pemeriksaan lab" },
      { status: 500 }
    );
  }
}

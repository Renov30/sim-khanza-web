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
      SELECT pr.no_rawat, DATE_FORMAT(pr.tgl_periksa, '%Y-%m-%d') as tgl_periksa, pr.jam,
             pr.kd_jenis_prw, j.nm_perawatan, pr.biaya, pr.dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk, pr.kd_dokter, d.nm_dokter,
             pr.proyeksi, pr.kV, pr.mAS, pr.status
      FROM periksa_radiologi pr
      INNER JOIN reg_periksa r ON pr.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN jns_perawatan_radiologi j ON pr.kd_jenis_prw = j.kd_jenis_prw
      LEFT JOIN dokter d ON pr.kd_dokter = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND pr.tgl_periksa BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (status !== "Semua") {
      sql += ` AND pr.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pr.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR j.nm_perawatan LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    sql += ` ORDER BY pr.tgl_periksa DESC, pr.jam DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/radiologi/periksa:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data periksa radiologi" },
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
      petugas = "-",
      biaya = 0,
      proyeksi = "-",
      kV = 0,
      mAS = 0,
      status = "ralan",
    } = body;

    if (!no_rawat || !kd_jenis_prw) {
      return NextResponse.json(
        { success: false, error: "No. Rawat dan Kode Pemeriksaan Radiologi harus diisi!" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO periksa_radiologi (
        no_rawat, kd_jenis_prw, tgl_periksa, jam, dokter_perujuk,
        kd_dokter, nip, bagian_rs, bhp, tarif_perujuk, tarif_tindakan_dokter,
        tarif_tindakan_petugas, kso, menejemen, biaya, status, proyeksi, kV, mAS, radiasi
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, 0, ?, ?, ?, ?, ?, 0)
      ON DUPLICATE KEY UPDATE
        biaya = VALUES(biaya),
        kd_dokter = VALUES(kd_dokter),
        dokter_perujuk = VALUES(dokter_perujuk),
        proyeksi = VALUES(proyeksi),
        status = VALUES(status)
    `;

    await executeQuery(sql, [
      no_rawat,
      kd_jenis_prw,
      tgl_periksa || new Date().toISOString().slice(0, 10),
      jam || new Date().toTimeString().slice(0, 8),
      dokter_perujuk,
      kd_dokter,
      petugas,
      biaya,
      status,
      proyeksi,
      kV,
      mAS,
    ]);

    return NextResponse.json({
      success: true,
      message: "Hasil periksa Radiologi berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/radiologi/periksa:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan hasil periksa radiologi" },
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

    let sql = `DELETE FROM periksa_radiologi WHERE no_rawat = ? AND kd_jenis_prw = ?`;
    const params = [no_rawat, kd_jenis_prw];
    if (tgl_periksa && jam) {
      sql += ` AND tgl_periksa = ? AND jam = ?`;
      params.push(tgl_periksa, jam);
    }

    await executeQuery(sql, params);

    return NextResponse.json({
      success: true,
      message: `Pemeriksaan radiologi ${kd_jenis_prw} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/radiologi/periksa:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus pemeriksaan radiologi" },
      { status: 500 }
    );
  }
}

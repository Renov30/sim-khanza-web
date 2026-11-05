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
      SELECT pl.noorder, pl.no_rawat, DATE_FORMAT(pl.tgl_permintaan, '%Y-%m-%d') as tgl_permintaan, pl.jam_permintaan,
             DATE_FORMAT(pl.tgl_sampel, '%Y-%m-%d') as tgl_sampel, pl.jam_sampel,
             DATE_FORMAT(pl.tgl_hasil, '%Y-%m-%d') as tgl_hasil, pl.jam_hasil,
             pl.dokter_perujuk, d.nm_dokter as nm_dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk,
             pl.status, pl.informasi_tambahan, pl.diagnosa_klinis
      FROM permintaan_lab pl
      INNER JOIN reg_periksa r ON pl.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN dokter d ON pl.dokter_perujuk = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND pl.tgl_permintaan BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (status !== "Semua") {
      sql += ` AND pl.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pl.noorder LIKE ? OR pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY pl.tgl_permintaan DESC, pl.jam_permintaan DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/laboratorium/permintaan-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data permintaan lab PK" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      noorder,
      no_rawat,
      tgl_permintaan,
      jam_permintaan,
      tgl_sampel = "0000-00-00",
      jam_sampel = "00:00:00",
      tgl_hasil = "0000-00-00",
      jam_hasil = "00:00:00",
      dokter_perujuk,
      status = "ralan",
      informasi_tambahan = "-",
      diagnosa_klinis = "-",
    } = body;

    if (!noorder || !no_rawat || !dokter_perujuk) {
      return NextResponse.json(
        { success: false, error: "No. Order, No. Rawat, dan Dokter Perujuk harus diisi!" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO permintaan_lab (
        noorder, no_rawat, tgl_permintaan, jam_permintaan, tgl_sampel, jam_sampel,
        tgl_hasil, jam_hasil, dokter_perujuk, status, informasi_tambahan, diagnosa_klinis
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        dokter_perujuk = VALUES(dokter_perujuk),
        status = VALUES(status),
        informasi_tambahan = VALUES(informasi_tambahan),
        diagnosa_klinis = VALUES(diagnosa_klinis)
    `;

    await executeQuery(sql, [
      noorder,
      no_rawat,
      tgl_permintaan || new Date().toISOString().slice(0, 10),
      jam_permintaan || new Date().toTimeString().slice(0, 8),
      tgl_sampel,
      jam_sampel,
      tgl_hasil,
      jam_hasil,
      dokter_perujuk,
      status,
      informasi_tambahan,
      diagnosa_klinis,
    ]);

    return NextResponse.json({
      success: true,
      message: "Permintaan Lab PK berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/laboratorium/permintaan-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan permintaan Lab PK" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const noorder = searchParams.get("noorder");

    if (!noorder) {
      return NextResponse.json(
        { success: false, error: "Parameter noorder diperlukan" },
        { status: 400 }
      );
    }

    await executeQuery("DELETE FROM permintaan_lab WHERE noorder = ?", [noorder]);

    return NextResponse.json({
      success: true,
      message: `Permintaan lab ${noorder} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/laboratorium/permintaan-pk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus permintaan lab" },
      { status: 500 }
    );
  }
}

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
      SELECT pr.noorder, pr.no_rawat, DATE_FORMAT(pr.tgl_permintaan, '%Y-%m-%d') as tgl_permintaan, pr.jam_permintaan,
             DATE_FORMAT(pr.tgl_sampel, '%Y-%m-%d') as tgl_sampel, pr.jam_sampel,
             DATE_FORMAT(pr.tgl_hasil, '%Y-%m-%d') as tgl_hasil, pr.jam_hasil,
             pr.dokter_perujuk, d.nm_dokter as nm_dokter_perujuk,
             r.no_rkm_medis, p.nm_pasien, p.jk,
             pr.status, pr.informasi_tambahan, pr.diagnosa_klinis
      FROM permintaan_radiologi pr
      INNER JOIN reg_periksa r ON pr.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN dokter d ON pr.dokter_perujuk = d.kd_dokter
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND pr.tgl_permintaan BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (status !== "Semua") {
      sql += ` AND pr.status = ?`;
      params.push(status);
    }

    if (cari.trim()) {
      sql += ` AND (pr.noorder LIKE ? OR pr.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY pr.tgl_permintaan DESC, pr.jam_permintaan DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in api/radiologi/permintaan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data permintaan radiologi" },
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
      INSERT INTO permintaan_radiologi (
        noorder, no_rawat, tgl_permintaan, jam_permintaan, tgl_sampel, jam_sampel,
        tgl_hasil, jam_hasil, dokter_perujuk, status, informasi_tambahan, diagnosa_klinis
      ) VALUES (?, ?, ?, ?, '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', ?, ?, ?, ?)
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
      dokter_perujuk,
      status,
      informasi_tambahan,
      diagnosa_klinis,
    ]);

    return NextResponse.json({
      success: true,
      message: "Permintaan Radiologi berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/radiologi/permintaan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan permintaan radiologi" },
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

    await executeQuery("DELETE FROM permintaan_radiologi WHERE noorder = ?", [noorder]);

    return NextResponse.json({
      success: true,
      message: `Permintaan radiologi ${noorder} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/radiologi/permintaan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus permintaan radiologi" },
      { status: 500 }
    );
  }
}

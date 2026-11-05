import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const statusPulang = searchParams.get("status_pulang") || "Semua";
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 200);

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

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND ki.tgl_masuk BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      no_rawat,
      kd_kamar,
      trf_kamar = 0,
      diagnosa_awal = "-",
      diagnosa_akhir = "-",
      tgl_masuk,
      jam_masuk,
      tgl_keluar = "0000-00-00",
      jam_keluar = "00:00:00",
      ttl_biaya = 0,
      stts_pulang = "-",
      lama = 1,
    } = body;

    if (!no_rawat || !kd_kamar) {
      return NextResponse.json(
        { success: false, error: "No. Rawat dan Kamar harus diisi!" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO kamar_inap (
        no_rawat, kd_kamar, trf_kamar, diagnosa_awal, diagnosa_akhir,
        tgl_masuk, jam_masuk, tgl_keluar, jam_keluar, ttl_biaya, stts_pulang, lama
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        kd_kamar = VALUES(kd_kamar),
        trf_kamar = VALUES(trf_kamar),
        diagnosa_awal = VALUES(diagnosa_awal),
        diagnosa_akhir = VALUES(diagnosa_akhir),
        tgl_keluar = VALUES(tgl_keluar),
        jam_keluar = VALUES(jam_keluar),
        stts_pulang = VALUES(stts_pulang),
        lama = VALUES(lama)
    `;

    await executeQuery(sql, [
      no_rawat,
      kd_kamar,
      trf_kamar,
      diagnosa_awal,
      diagnosa_akhir,
      tgl_masuk || new Date().toISOString().slice(0, 10),
      jam_masuk || new Date().toTimeString().slice(0, 8),
      tgl_keluar,
      jam_keluar,
      ttl_biaya,
      stts_pulang,
      lama,
    ]);

    return NextResponse.json({
      success: true,
      message: "Data Kamar Inap pasien berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/rawat-inap:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan data rawat inap" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const no_rawat = searchParams.get("no_rawat");
    const kd_kamar = searchParams.get("kd_kamar");
    const tgl_masuk = searchParams.get("tgl_masuk");
    const jam_masuk = searchParams.get("jam_masuk");

    if (!no_rawat || !kd_kamar) {
      return NextResponse.json(
        { success: false, error: "Parameter no_rawat dan kd_kamar diperlukan" },
        { status: 400 }
      );
    }

    let sql = `DELETE FROM kamar_inap WHERE no_rawat = ? AND kd_kamar = ?`;
    const params = [no_rawat, kd_kamar];
    if (tgl_masuk && jam_masuk) {
      sql += ` AND tgl_masuk = ? AND jam_masuk = ?`;
      params.push(tgl_masuk, jam_masuk);
    }

    await executeQuery(sql, params);

    return NextResponse.json({
      success: true,
      message: `Data kamar inap ${no_rawat} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/rawat-inap:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus data rawat inap" },
      { status: 500 }
    );
  }
}

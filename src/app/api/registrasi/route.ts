import { NextRequest, NextResponse } from "next/server";
import { executeQuery, pool } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { saveWithRegistrationNumbers, type RegistrationNumbers } from "@/lib/registrasi/numbering";
import { isRegistrationDate } from "@/lib/registrasi/date";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const kdDokter = searchParams.get("kd_dokter") || "";
    const kdPoli = searchParams.get("kd_poli") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 200);

    let sql = `
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') as tgl_registrasi, 
             r.jam_reg, r.kd_dokter, d.nm_dokter, r.no_rkm_medis, p.nm_pasien, 
             p.jk, r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli, 
             r.kd_pj, pj.png_jawab,
             r.p_jawab, r.almt_pj, r.hubunganpj, r.biaya_reg, r.stts, 
             r.status_lanjut, r.status_bayar
      FROM reg_periksa r
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON r.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
      WHERE 1=1
    `;
    const params: any[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += ` AND r.tgl_registrasi BETWEEN ? AND ?`;
      params.push(tanggalMulai, tanggalSelesai);
    }

    if (kdDokter.trim()) {
      sql += ` AND r.kd_dokter = ?`;
      params.push(kdDokter.trim());
    }

    if (kdPoli.trim()) {
      sql += ` AND r.kd_poli = ?`;
      params.push(kdPoli.trim());
    }

    if (cari.trim()) {
      sql += ` AND (r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ? OR pol.nm_poli LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
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
    console.error("Error in api/registrasi:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data registrasi" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return saveRegistration(req, false);
}

export async function PUT(req: NextRequest) {
  return saveRegistration(req, true);
}

async function saveRegistration(req: NextRequest, editing: boolean) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
    if (!session.isAdmin && !session.permissions.registrasi) {
      return NextResponse.json({ success: false, error: "Akses registrasi tidak diizinkan." }, { status: 403 });
    }
    const body = await req.json();
    const {
      no_rawat,
      tgl_registrasi,
      jam_reg,
      kd_dokter,
      no_rkm_medis,
      kd_poli,
      p_jawab,
      almt_pj,
      hubunganpj,
      biaya_reg = 0,
      stts = "Belum",
      stts_daftar = "Baru",
      status_lanjut = "Ralan",
      kd_pj = "A09",
      umurdaftar = 0,
      sttsumur = "Th",
      status_bayar = "Belum Bayar",
    } = body;

    if (typeof no_rkm_medis !== "string" || !no_rkm_medis.trim()
      || typeof kd_dokter !== "string" || !kd_dokter.trim()
      || typeof kd_poli !== "string" || !kd_poli.trim()
      || typeof tgl_registrasi !== "string" || !isRegistrationDate(tgl_registrasi)
      || (editing && (typeof no_rawat !== "string" || !no_rawat))) {
      return NextResponse.json(
        { success: false, error: "Tanggal registrasi, No. RM, dokter, dan poli harus valid." },
        { status: 400 }
      );
    }

    if (editing) {
      // Edit eksplisit: tabrakan nomor pada INSERT tidak boleh mengubah pasien lain.
      await executeQuery(
        `UPDATE reg_periksa SET kd_dokter = ?, kd_poli = ?, p_jawab = ?,
         almt_pj = ?, hubunganpj = ?, biaya_reg = ?, stts = ?, status_bayar = ?
         WHERE no_rawat = ?`,
        [kd_dokter, kd_poli, p_jawab || "-", almt_pj || "-", hubunganpj || "-",
          biaya_reg, stts, status_bayar, no_rawat],
      );
      return NextResponse.json({ success: true, message: "Data registrasi berhasil diperbarui" });
    }

    const sql = `
      INSERT INTO reg_periksa (
        no_reg, no_rawat, tgl_registrasi, jam_reg, kd_dokter, no_rkm_medis,
        kd_poli, p_jawab, almt_pj, hubunganpj, biaya_reg, stts,
        stts_daftar, status_lanjut, kd_pj, umurdaftar, sttsumur, status_bayar
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const connection = await pool.getConnection();
    let numbers: RegistrationNumbers;
    try {
      numbers = await saveWithRegistrationNumbers(connection, {
        tanggal: tgl_registrasi, dokter: kd_dokter, poli: kd_poli,
      }, async (assigned) => {
        await connection.execute(sql, [
          assigned.no_reg,
          assigned.no_rawat,
          tgl_registrasi,
          jam_reg || new Date().toTimeString().slice(0, 8),
          kd_dokter,
          no_rkm_medis,
          kd_poli,
          p_jawab || "-",
          almt_pj || "-",
          hubunganpj || "-",
          biaya_reg,
          stts,
          stts_daftar,
          status_lanjut,
          kd_pj,
          umurdaftar,
          sttsumur,
          status_bayar,
        ]);
      });
    } finally {
      connection.release();
    }

    return NextResponse.json({
      success: true,
      data: numbers,
      message: "Data registrasi berhasil disimpan",
    });
  } catch (error: unknown) {
    console.error("Error saving api/registrasi:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data registrasi. Silakan coba kembali." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const no_rawat = searchParams.get("no_rawat");

    if (!no_rawat) {
      return NextResponse.json(
        { success: false, error: "Parameter no_rawat diperlukan" },
        { status: 400 }
      );
    }

    await executeQuery("DELETE FROM reg_periksa WHERE no_rawat = ?", [no_rawat]);

    return NextResponse.json({
      success: true,
      message: `Registrasi ${no_rawat} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/registrasi:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus data registrasi" },
      { status: 500 }
    );
  }
}

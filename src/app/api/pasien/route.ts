import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = searchParams.get("cari") || "";
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);

    let sql = `
      SELECT 
        p.no_rkm_medis, p.nm_pasien, p.no_ktp, p.jk, 
        p.tmp_lahir, DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') as tgl_lahir,
        p.nm_ibu, p.alamat, p.gol_darah, p.pekerjaan, p.stts_nikah, 
        p.agama, DATE_FORMAT(p.tgl_daftar, '%Y-%m-%d') as tgl_daftar, 
        p.no_tlp, p.umur, p.pnd, p.keluarga, p.namakeluarga,
        p.kd_pj, pj.png_jawab, p.no_peserta, p.pekerjaanpj, p.alamatpj,
        p.kelurahanpj, p.kecamatanpj, p.kabupatenpj, p.propinsipj,
        p.email, p.nip
      FROM pasien p
      LEFT JOIN penjab pj ON p.kd_pj = pj.kd_pj
      WHERE 1=1
    `;
    const params: any[] = [];

    if (cari.trim()) {
      sql += ` AND (p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR p.no_ktp LIKE ? OR p.no_peserta LIKE ? OR p.alamat LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY p.no_rkm_medis DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: any) {
    console.error("Error in GET api/pasien:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat data pasien" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      no_rkm_medis,
      nm_pasien,
      no_ktp = "",
      jk = "L",
      tmp_lahir = "",
      tgl_lahir,
      nm_ibu = "-",
      alamat = "",
      gol_darah = "-",
      pekerjaan = "-",
      stts_nikah = "BELUM MENIKAH",
      agama = "ISLAM",
      tgl_daftar,
      no_tlp = "",
      umur = "0 Th",
      pnd = "-",
      keluarga = "DIRI SENDIRI",
      namakeluarga = "",
      kd_pj = "UMU",
      no_peserta = "-",
      pekerjaanpj = "-",
      alamatpj = "",
    } = body;

    if (!no_rkm_medis || !nm_pasien) {
      return NextResponse.json(
        { success: false, error: "No. Rekam Medis dan Nama Pasien wajib diisi!" },
        { status: 400 }
      );
    }

    const tglSekarang = new Date().toISOString().slice(0, 10);

    const sql = `
      INSERT INTO pasien (
        no_rkm_medis, nm_pasien, no_ktp, jk, tmp_lahir, tgl_lahir,
        nm_ibu, alamat, gol_darah, pekerjaan, stts_nikah, agama,
        tgl_daftar, no_tlp, umur, pnd, keluarga, namakeluarga,
        kd_pj, no_peserta, pekerjaanpj, alamatpj,
        kelurahanpj, kecamatanpj, kabupatenpj, propinsipj,
        perusahaan_pasien, suku_bangsa, bahasa_pasien, cacat_fisik,
        email, nip, kd_kel, kd_kec, kd_kab, kd_prop
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        '-', '-', '-', '-',
        '-', 1, 1, 1,
        '', '', 1, 1, 1, 1
      )
      ON DUPLICATE KEY UPDATE
        nm_pasien = VALUES(nm_pasien),
        no_ktp = VALUES(no_ktp),
        jk = VALUES(jk),
        tmp_lahir = VALUES(tmp_lahir),
        tgl_lahir = VALUES(tgl_lahir),
        nm_ibu = VALUES(nm_ibu),
        alamat = VALUES(alamat),
        gol_darah = VALUES(gol_darah),
        pekerjaan = VALUES(pekerjaan),
        stts_nikah = VALUES(stts_nikah),
        agama = VALUES(agama),
        no_tlp = VALUES(no_tlp),
        umur = VALUES(umur),
        pnd = VALUES(pnd),
        keluarga = VALUES(keluarga),
        namakeluarga = VALUES(namakeluarga),
        kd_pj = VALUES(kd_pj),
        no_peserta = VALUES(no_peserta),
        pekerjaanpj = VALUES(pekerjaanpj),
        alamatpj = VALUES(alamatpj)
    `;

    await executeQuery(sql, [
      no_rkm_medis,
      nm_pasien,
      no_ktp,
      jk,
      tmp_lahir,
      tgl_lahir || "2000-01-01",
      nm_ibu,
      alamat,
      gol_darah,
      pekerjaan,
      stts_nikah,
      agama,
      tgl_daftar || tglSekarang,
      no_tlp,
      umur,
      pnd,
      keluarga,
      namakeluarga,
      kd_pj,
      no_peserta,
      pekerjaanpj,
      alamatpj,
    ]);

    return NextResponse.json({
      success: true,
      message: "Data pasien berhasil disimpan",
    });
  } catch (error: any) {
    console.error("Error in POST api/pasien:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan data pasien" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const no_rkm_medis = searchParams.get("no_rkm_medis");

    if (!no_rkm_medis) {
      return NextResponse.json(
        { success: false, error: "Parameter no_rkm_medis diperlukan" },
        { status: 400 }
      );
    }

    await executeQuery("DELETE FROM pasien WHERE no_rkm_medis = ?", [no_rkm_medis]);

    return NextResponse.json({
      success: true,
      message: `Pasien ${no_rkm_medis} berhasil dihapus`,
    });
  } catch (error: any) {
    console.error("Error in DELETE api/pasien:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menghapus data pasien" },
      { status: 500 }
    );
  }
}


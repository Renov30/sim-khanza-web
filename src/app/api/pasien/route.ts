import { patientAccess } from '@/lib/pasien/access';
import { savePatient } from '@/lib/pasien/save';
import { RegistrationError } from '@/lib/registrasi/validation';
import { NextRequest, NextResponse } from "next/server";
import { pool, executeQuery } from "@/lib/db";
import { getNextPatientNumber, updateLastPatientNumber } from '@/lib/pasien/numbering';
import type { RowDataPacket } from 'mysql2/promise';

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function GET(req: NextRequest) {
  try {
    const denied = await patientAccess(); if (denied) return denied;
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
        kl.nm_kel, kc.nm_kec, kb.nm_kab, pr.nm_prop, p.email, p.nip, p.kd_kel, p.kd_kec, p.kd_kab, p.kd_prop,
        p.perusahaan_pasien, p.suku_bangsa, p.bahasa_pasien, p.cacat_fisik,
        (pt.no_rkm_medis IS NOT NULL) AS anggota_tni, pt.golongan_tni, pt.pangkat_tni, pt.satuan_tni, pt.jabatan_tni,
        (pp.no_rkm_medis IS NOT NULL) AS anggota_polri, pp.golongan_polri, pp.pangkat_polri, pp.satuan_polri, pp.jabatan_polri
      FROM pasien p
      LEFT JOIN penjab pj ON p.kd_pj = pj.kd_pj
      LEFT JOIN kelurahan kl ON kl.kd_kel=p.kd_kel
      LEFT JOIN kecamatan kc ON kc.kd_kec=p.kd_kec
      LEFT JOIN kabupaten kb ON kb.kd_kab=p.kd_kab
      LEFT JOIN propinsi pr ON pr.kd_prop=p.kd_prop
      LEFT JOIN pasien_tni pt ON pt.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN pasien_polri pp ON pp.no_rkm_medis = p.no_rkm_medis
      WHERE 1=1
    `;
    const params: (string | number)[] = [];

    if (cari.trim()) {
      sql += ` AND (p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR p.no_ktp LIKE ? OR p.no_peserta LIKE ? OR p.alamat LIKE ?)`;
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }

    sql += ` ORDER BY p.no_rkm_medis DESC LIMIT ?`;
    params.push(limit);

    const rows = await executeQuery<Record<string, unknown>>(sql, params);

    return NextResponse.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (error: unknown) {
    console.error("Error in GET api/pasien:", error);
    return NextResponse.json(
      { success: false, error: errorMessage(error, "Gagal memuat data pasien") },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) { return writePatient(req,false); }
export async function PUT(req: NextRequest) { return writePatient(req,true); }
async function writePatient(req: NextRequest, editing: boolean) {
  const denied=await patientAccess(); if(denied) return denied;
  const connection=await pool.getConnection();
  let lockAcquired = false;
  let transactionStarted = false;
  try {
    const body: unknown=await req.json();
    let payload = body;
    let generatedNumber: string | undefined;
    if (!editing) {
      const [locks] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired", ["khanza-web:pasien:no-rm"],
      );
      lockAcquired = locks[0].acquired === 1;
      if (!lockAcquired) throw new RegistrationError('Penomoran pasien sedang digunakan. Silakan simpan kembali.',409);
      const tanggal = body && typeof body === 'object' && !Array.isArray(body)
        ? String((body as Record<string, unknown>).tgl_daftar || '') : '';
      generatedNumber = await getNextPatientNumber(connection, tanggal);
      payload = { ...(body as Record<string, unknown>), no_rkm_medis: generatedNumber };
    }
    await connection.beginTransaction();
    transactionStarted = true;
    await savePatient(connection,payload,editing);
    if (generatedNumber) await updateLastPatientNumber(connection, generatedNumber);
    await connection.commit();
    return NextResponse.json({success:true,data: generatedNumber ? { no_rkm_medis: generatedNumber } : undefined,message:'Data pasien berhasil disimpan'});
  } catch(error) {
    if (transactionStarted) await connection.rollback();
    if(error instanceof RegistrationError) return NextResponse.json({success:false,error:error.message},{status:error.status});
    console.error('Gagal menyimpan pasien:',error);
    return NextResponse.json({success:false,error:'Gagal menyimpan data pasien. Periksa isian dan coba kembali.'},{status:500});
  } finally {
    let connectionDestroyed = false;
    if (lockAcquired) {
      try { await connection.execute("SELECT RELEASE_LOCK(?)", ["khanza-web:pasien:no-rm"]); }
      catch (error) {
        connection.destroy();
        connectionDestroyed = true;
        console.error('Gagal melepas lock No. RM:',error);
      }
    }
    if (!connectionDestroyed) connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const denied = await patientAccess(); if (denied) return denied;
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
  } catch (error: unknown) {
    console.error("Error in DELETE api/pasien:", error);
    return NextResponse.json(
      { success: false, error: errorMessage(error, "Gagal menghapus data pasien") },
      { status: 500 }
    );
  }
}


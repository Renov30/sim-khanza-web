import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { rujukKeluarAccess } from "@/lib/rawat-inap/access";
import {
  AMBULANCE,
  KATEGORI_RUJUK,
  MutasiError,
  jam,
  obyekBody,
  pilihan,
  responsGagalan,
  tanggal,
  teks,
} from "@/lib/rawat-inap/mutasi";

function kodeDariError(error: unknown) {
  return typeof error === "object" && error && "code" in error ? String(error.code) : "";
}

export async function GET(req: NextRequest) {
  const denied = await rujukKeluarAccess();
  if (denied) return denied;
  try {
    const noRawat = teks(req.nextUrl.searchParams.get("no_rawat"), "No. rawat", 17, false);
    const dokter = await executeQuery<{ kd_dokter: string; nm_dokter: string }>(
      "SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter LIMIT 200",
    );
    let registrasi: { kd_dokter: string; nm_dokter: string | null } | null = null;
    if (noRawat) {
      const rows = await executeQuery<{ kd_dokter: string; nm_dokter: string | null }>(`
        SELECT r.kd_dokter, d.nm_dokter
        FROM reg_periksa r LEFT JOIN dokter d ON d.kd_dokter = r.kd_dokter
        WHERE r.no_rawat = ? LIMIT 1
      `, [noRawat]);
      registrasi = rows[0] ?? null;
    }
    return NextResponse.json({ success: true, data: { dokter, registrasi } });
  } catch (error) {
    return responsGagalan(error, "Gagal memuat data rujuk.");
  }
}

export async function POST(req: NextRequest) {
  const denied = await rujukKeluarAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  let kunciDidapat = false;
  let koneksiRusak = false;
  let namaKunci = "";
  try {
    const input = obyekBody(await req.json());
    const noRawat = teks(input.no_rawat, "No. rawat", 17);
    const rujukKe = teks(input.rujuk_ke, "Tempat rujuk", 150);
    const tglRujuk = tanggal(input.tgl_rujuk, "Tanggal rujuk");
    const jamRujuk = jam(input.jam, "Jam rujuk");
    const kdDokter = teks(input.kd_dokter, "Dokter penanggung jawab", 20);
    const kategori = pilihan(input.kat_rujuk, "Kategori rujuk", KATEGORI_RUJUK);
    const ambulance = pilihan(input.ambulance, "Ambulance", AMBULANCE);
    const keteranganDiagnosa = teks(input.keterangan_diagnosa, "Keterangan diagnosa", 500, false);
    const keterangan = teks(input.keterangan, "Keterangan", 500, false);

    connection = await pool.getConnection();
    await connection.beginTransaction();
    namaKunci = `khanza-web:rujuk:${tglRujuk}`;
    const [kunciRows] = await connection.execute<RowDataPacket[]>("SELECT GET_LOCK(?, 10) AS didapat", [namaKunci]);
    if (kunciRows[0]?.didapat !== 1) throw new MutasiError("Penomoran rujuk sedang digunakan. Coba lagi.", 409);
    kunciDidapat = true;

    const [registrasi] = await connection.execute<RowDataPacket[]>(
      "SELECT no_rawat FROM reg_periksa WHERE no_rawat = ? LIMIT 1",
      [noRawat],
    );
    if (!registrasi) throw new MutasiError("Data kunjungan tidak ditemukan.", 404);
    const [dokter] = await connection.execute<RowDataPacket[]>(
      "SELECT kd_dokter FROM dokter WHERE kd_dokter = ? LIMIT 1",
      [kdDokter],
    );
    if (!dokter) throw new MutasiError("Dokter tidak ditemukan.", 404);

    let noRujuk = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      const [nomor] = await connection.execute<RowDataPacket[]>(`
        SELECT CONCAT('R', LPAD(IFNULL(MAX(CAST(SUBSTRING(no_rujuk, 2) AS UNSIGNED)), 0) + 1, 9, '0')) AS nomor
        FROM rujuk WHERE no_rujuk LIKE 'R%'
      `);
      noRujuk = String(nomor[0]?.nomor ?? "");
      try {
        const [hasil] = await connection.execute<ResultSetHeader>(`INSERT INTO rujuk
          (no_rujuk, no_rawat, rujuk_ke, tgl_rujuk, keterangan_diagnosa, kd_dokter,
           kat_rujuk, ambulance, keterangan, jam)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
          noRujuk,
          noRawat,
          rujukKe,
          tglRujuk,
          keteranganDiagnosa,
          kdDokter,
          kategori,
          ambulance,
          keterangan,
          jamRujuk,
        ]);
        if (hasil.affectedRows !== 1) throw new MutasiError("Data rujuk gagal disimpan.", 409);
        break;
      } catch (error: unknown) {
        if (attempt === 2 || kodeDariError(error) !== "ER_DUP_ENTRY") throw error;
      }
    }
    await connection.commit();
    return NextResponse.json({
      success: true,
      data: { no_rujuk: noRujuk, no_rawat: noRawat, tgl_rujuk: tglRujuk },
      message: "Data rujuk keluar berhasil disimpan.",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    return responsGagalan(error, "Data rujuk keluar gagal disimpan.");
  } finally {
    if (kunciDidapat && connection && !koneksiRusak) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [namaKunci]);
      } catch {
        connection.destroy();
        koneksiRusak = true;
      }
    }
    if (connection && !koneksiRusak) connection.release();
  }
}

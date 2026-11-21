import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { jadwalDokterAccess } from "@/lib/jadwal-dokter/access";
import {
  JadwalDokterError,
  bacaDaftarHapus,
  bacaFilterJadwal,
  bacaKunciEdit,
  hapusJadwal,
  jadwalInput,
  kondisiFilterJadwal,
  simpanJadwal,
  ubahJadwal,
} from "@/lib/jadwal-dokter/jadwal";

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new JadwalDokterError("Data jadwal dokter tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new JadwalDokterError("Isi permintaan tidak valid.");
  }
}

export async function GET(req: NextRequest) {
  const denied = await jadwalDokterAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = bacaFilterJadwal(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = kondisiFilterJadwal(filter);
    const fromSql = `FROM jadwal j
      INNER JOIN dokter d ON j.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik p ON j.kd_poli = p.kd_poli`;
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total ${fromSql} WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT j.kd_dokter, d.nm_dokter, j.hari_kerja,
              TIME_FORMAT(j.jam_mulai, '%H:%i:%s') AS jam_mulai,
              TIME_FORMAT(j.jam_selesai, '%H:%i:%s') AS jam_selesai,
              j.kd_poli, p.nm_poli, j.kuota
       ${fromSql}
       WHERE ${syarat.sql}
       ORDER BY j.kd_dokter ASC,
                FIELD(j.hari_kerja, 'SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU','AKHAD') ASC,
                j.jam_mulai ASC
       LIMIT ? OFFSET ?`,
      [...syarat.params, batas, (halaman - 1) * batas],
    );
    return NextResponse.json({
      success: true,
      data,
      total,
      halaman,
      batas,
      totalHalaman: Math.max(1, Math.ceil(total / batas)),
      filter,
    });
  } catch (error) {
    console.error("Gagal memuat data jadwal dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data jadwal dokter. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await jadwalDokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const input = jadwalInput(await bacaBody(req));
    await connection.beginTransaction();
    transaksi = true;
    await simpanJadwal(connection, input);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_dokter: input.kd_dokter, hari_kerja: input.hari_kerja, jam_mulai: input.jam_mulai },
      message: `Jadwal ${input.hari_kerja} dokter ${input.kd_dokter} berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof JadwalDokterError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan jadwal dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan jadwal dokter. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await jadwalDokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const input = jadwalInput(body);
    const kunci = bacaKunciEdit(body);
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahJadwal(connection, input, kunci);
    if (!terpengaruh) throw new JadwalDokterError("Jadwal yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_dokter: input.kd_dokter, hari_kerja: input.hari_kerja, jam_mulai: input.jam_mulai },
      message: `Jadwal ${input.hari_kerja} dokter ${input.kd_dokter} berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof JadwalDokterError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal memperbarui jadwal dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui jadwal dokter. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await jadwalDokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const daftar = bacaDaftarHapus(await bacaBody(req));
    await connection.beginTransaction();
    transaksi = true;
    let terpengaruh = 0;
    for (const kunci of daftar) {
      terpengaruh += await hapusJadwal(connection, kunci);
    }
    if (!terpengaruh) throw new JadwalDokterError("Jadwal yang dihapus tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { dihapus: terpengaruh },
      message: `${terpengaruh} jadwal dokter berhasil dihapus.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof JadwalDokterError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menghapus jadwal dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus jadwal dokter. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

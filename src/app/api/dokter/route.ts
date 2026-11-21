import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { dokterAccess } from "@/lib/kepegawaian/access";
import { KepegawaianError, STATUS_MASTER } from "@/lib/kepegawaian/master";
import {
  bacaFilterDokter,
  bacaKodeDokter,
  dokterInput,
  kondisiFilterDokter,
  nextKodeDokter,
  simpanDokter,
  ubahStatusDokter,
  type FilterDokter,
} from "@/lib/kepegawaian/dokter";

const LOCK_NAME = "simrs-khanza-kode-dokter";

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new KepegawaianError("Data dokter tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new KepegawaianError("Isi permintaan tidak valid.");
  }
}

function filterQuery(filter: FilterDokter) {
  return {
    cari: filter.cari,
    jk: filter.jk,
    gol_drh: filter.gol_drh,
    stts_nikah: filter.stts_nikah,
    status: filter.status,
  };
}

export async function GET(req: NextRequest) {
  const denied = await dokterAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = bacaFilterDokter(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = kondisiFilterDokter(filter);
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total
       FROM dokter d
       LEFT JOIN spesialis s ON d.kd_sps = s.kd_sps
       WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT
        d.kd_dokter, d.nm_dokter, d.jk, d.tmp_lahir,
        DATE_FORMAT(d.tgl_lahir, '%Y-%m-%d') AS tgl_lahir, d.gol_drh, d.agama,
        d.almt_tgl, d.no_telp, d.email, d.stts_nikah, d.kd_sps, s.nm_sps,
        d.alumni, d.no_ijn_praktek, d.status
       FROM dokter d
       LEFT JOIN spesialis s ON d.kd_sps = s.kd_sps
       WHERE ${syarat.sql}
       ORDER BY d.kd_dokter ASC
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
      filter: filterQuery(filter),
    });
  } catch (error) {
    console.error("Gagal memuat data dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data dokter. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await dokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let kunci = false;
  let transaksi = false;
  let rusak = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
      "SELECT GET_LOCK(?, 10) AS acquired",
      [LOCK_NAME],
    );
    kunci = kunciRows[0]?.acquired === 1;
    if (!kunci) throw new KepegawaianError("Penomoran kode dokter sedang digunakan. Silakan simpan kembali.", 409);
    const kode = await nextKodeDokter(connection);
    const input = dokterInput({ ...body, kd_dokter: kode });
    await connection.beginTransaction();
    transaksi = true;
    await simpanDokter(connection, input, false);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_dokter: kode },
      message: `Dokter ${input.nm_dokter} (${kode}) berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan data dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data dokter. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    if (kunci) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [LOCK_NAME]);
      } catch (error) {
        connection.destroy();
        rusak = true;
        console.error("Gagal melepas lock kode dokter:", error);
      }
    }
    if (!rusak) connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await dokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const kdLama = bacaKodeDokter(body.kd_lama ?? body.kd_dokter);
    const input = dokterInput(body, true);
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await simpanDokter(connection, input, true, kdLama);
    if (!terpengaruh) throw new KepegawaianError("Dokter yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_dokter: input.kd_dokter },
      message: `Dokter ${input.nm_dokter} (${input.kd_dokter}) berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah data dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data dokter. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await dokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const kdDokter = bacaKodeDokter(new URL(req.url).searchParams.get("kd_dokter"));
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusDokter(connection, kdDokter, "0");
    if (!terpengaruh) throw new KepegawaianError("Dokter yang dinonaktifkan tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Dokter ${kdDokter} dinonaktifkan.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menonaktifkan dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menonaktifkan dokter. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await dokterAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const kdDokter = bacaKodeDokter(body.kd_dokter);
    const status = typeof body.status === "string" ? body.status : "";
    if (!STATUS_MASTER.some((item) => item === status)) throw new KepegawaianError("Status dokter tidak dikenal.");
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusDokter(connection, kdDokter, status as "0" | "1");
    if (!terpengaruh) throw new KepegawaianError("Dokter yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Status dokter ${kdDokter} menjadi ${status}.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah status dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status dokter. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

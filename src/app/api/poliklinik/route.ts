import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { poliklinikAccess } from "@/lib/poliklinik/access";
import {
  PoliklinikError,
  STATUS_POLIKLINIK,
  bacaFilterPoliklinik,
  bacaKodePoliklinik,
  kondisiFilterPoliklinik,
  nextKodePoliklinik,
  poliklinikInput,
  simpanPoliklinik,
  ubahStatusPoliklinik,
} from "@/lib/poliklinik/poliklinik";

const LOCK_NAME = "simrs-khanza-kode-poli";

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PoliklinikError("Data poliklinik tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new PoliklinikError("Isi permintaan tidak valid.");
  }
}

export async function GET(req: NextRequest) {
  const denied = await poliklinikAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = bacaFilterPoliklinik(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = kondisiFilterPoliklinik(filter);
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total FROM poliklinik WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT kd_poli, nm_poli, registrasi, registrasilama, status
       FROM poliklinik
       WHERE ${syarat.sql}
       ORDER BY kd_poli ASC
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
    console.error("Gagal memuat data poliklinik:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data poliklinik. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await poliklinikAccess();
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
    if (!kunci) throw new PoliklinikError("Penomoran kode unit sedang digunakan. Silakan simpan kembali.", 409);
    const kode = await nextKodePoliklinik(connection);
    const input = poliklinikInput({ ...body, kd_poli: kode });
    await connection.beginTransaction();
    transaksi = true;
    await simpanPoliklinik(connection, input, false);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_poli: kode },
      message: `Poliklinik ${input.nm_poli} (${kode}) berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PoliklinikError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan data poliklinik:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data poliklinik. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    if (kunci) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [LOCK_NAME]);
      } catch (error) {
        connection.destroy();
        rusak = true;
        console.error("Gagal melepas lock kode poliklinik:", error);
      }
    }
    if (!rusak) connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await poliklinikAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const kdLama = bacaKodePoliklinik(body.kd_lama ?? body.kd_poli);
    const input = poliklinikInput(body, true);
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await simpanPoliklinik(connection, input, true, kdLama);
    if (!terpengaruh) throw new PoliklinikError("Poliklinik yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kd_poli: input.kd_poli },
      message: `Poliklinik ${input.nm_poli} (${input.kd_poli}) berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PoliklinikError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah data poliklinik:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data poliklinik. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await poliklinikAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const kdPoli = bacaKodePoliklinik(new URL(req.url).searchParams.get("kd_poli"));
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusPoliklinik(connection, kdPoli, "0");
    if (!terpengaruh) throw new PoliklinikError("Poliklinik yang dinonaktifkan tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Poliklinik ${kdPoli} dinonaktifkan.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PoliklinikError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menonaktifkan poliklinik:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menonaktifkan poliklinik. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await poliklinikAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const kdPoli = bacaKodePoliklinik(body.kd_poli);
    const status = typeof body.status === "string" ? body.status : "";
    if (!STATUS_POLIKLINIK.some((item) => item === status)) {
      throw new PoliklinikError("Status poliklinik tidak dikenal.");
    }
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusPoliklinik(connection, kdPoli, status as "0" | "1");
    if (!terpengaruh) throw new PoliklinikError("Poliklinik yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Status poliklinik ${kdPoli} menjadi ${status}.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PoliklinikError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah status poliklinik:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status poliklinik. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

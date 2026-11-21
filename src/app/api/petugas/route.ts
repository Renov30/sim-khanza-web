import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { petugasAccess } from "@/lib/kepegawaian/access";
import { KepegawaianError, STATUS_MASTER } from "@/lib/kepegawaian/master";
import {
  bacaFilterPetugas,
  bacaNipPetugas,
  kondisiFilterPetugas,
  petugasInput,
  simpanPetugas,
  ubahStatusPetugas,
  type FilterPetugas,
} from "@/lib/kepegawaian/petugas";

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new KepegawaianError("Data petugas tidak valid.");
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

function filterQuery(filter: FilterPetugas) {
  return {
    cari: filter.cari,
    jk: filter.jk,
    gol_darah: filter.gol_darah,
    stts_nikah: filter.stts_nikah,
    status: filter.status,
  };
}

export async function GET(req: NextRequest) {
  const denied = await petugasAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = bacaFilterPetugas(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = kondisiFilterPetugas(filter);
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total
       FROM petugas p
       LEFT JOIN jabatan j ON p.kd_jbtn = j.kd_jbtn
       WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT
        p.nip, p.nama, p.jk, p.tmp_lahir,
        DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') AS tgl_lahir, p.gol_darah, p.agama,
        p.stts_nikah, p.alamat, p.kd_jbtn, j.nm_jbtn, p.no_telp, p.email, p.status
       FROM petugas p
       LEFT JOIN jabatan j ON p.kd_jbtn = j.kd_jbtn
       WHERE ${syarat.sql}
       ORDER BY p.nip ASC
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
    console.error("Gagal memuat data petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data petugas. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await petugasAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const input = petugasInput(await bacaBody(req));
    await connection.beginTransaction();
    transaksi = true;
    await simpanPetugas(connection, input, false);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { nip: input.nip },
      message: `Petugas ${input.nama} (${input.nip}) berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan data petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data petugas. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await petugasAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const nipLama = bacaNipPetugas(body.nip_lama ?? body.nip);
    const input = petugasInput(body);
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await simpanPetugas(connection, input, true, nipLama);
    if (!terpengaruh) throw new KepegawaianError("Petugas yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { nip: input.nip },
      message: `Petugas ${input.nama} (${input.nip}) berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah data petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data petugas. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await petugasAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const nip = bacaNipPetugas(new URL(req.url).searchParams.get("nip"));
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusPetugas(connection, nip, "0");
    if (!terpengaruh) throw new KepegawaianError("Petugas yang dinonaktifkan tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Petugas ${nip} dinonaktifkan.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menonaktifkan petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menonaktifkan petugas. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await petugasAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const nip = bacaNipPetugas(body.nip);
    const status = typeof body.status === "string" ? body.status : "";
    if (!STATUS_MASTER.some((item) => item === status)) throw new KepegawaianError("Status petugas tidak dikenal.");
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await ubahStatusPetugas(connection, nip, status as "0" | "1");
    if (!terpengaruh) throw new KepegawaianError("Petugas yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Status petugas ${nip} menjadi ${status}.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof KepegawaianError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah status petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status petugas. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

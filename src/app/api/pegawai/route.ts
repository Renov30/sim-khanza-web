import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { pegawaiAccess } from "@/lib/kepegawaian/access";
import {
  STATUS_PEGAWAI,
  PegawaiError,
  bacaFilterPegawai,
  bacaIdPegawai,
  kondisiFilterPegawai,
  pegawaiInput,
  savePegawai,
  updateStatusPegawai,
  type StatusPegawai,
} from "@/lib/kepegawaian/pegawai";

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PegawaiError("Data pegawai tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new PegawaiError("Isi permintaan tidak valid.");
  }
}

export async function GET(req: NextRequest) {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = bacaFilterPegawai(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = kondisiFilterPegawai(filter);
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total
       FROM pegawai p
       LEFT JOIN jnj_jabatan jj ON p.jnj_jabatan = jj.kode
       LEFT JOIN departemen d ON p.departemen = d.dep_id
       WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT
        p.id, p.nik, p.nama, p.jk, p.jbtn, p.jnj_jabatan, jj.nama AS nama_jnj_jabatan,
        p.kode_kelompok, kj.nama_kelompok, p.kode_resiko, rk.nama_resiko,
        p.kode_emergency, ei.nama_emergency, p.departemen, d.nama AS nama_departemen,
        p.bidang, p.stts_wp, sw.ktg AS nama_stts_wp, p.stts_kerja, sk.ktg AS nama_stts_kerja,
        p.npwp, p.pendidikan, p.gapok, p.tmp_lahir,
        DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') AS tgl_lahir, p.alamat, p.kota,
        DATE_FORMAT(p.mulai_kerja, '%Y-%m-%d') AS mulai_kerja, p.ms_kerja, p.indexins,
        p.bpd, b.namabank AS nama_bpd, p.rekening, p.stts_aktif, p.wajibmasuk,
        DATE_FORMAT(p.mulai_kontrak, '%Y-%m-%d') AS mulai_kontrak
       FROM pegawai p
       LEFT JOIN jnj_jabatan jj ON p.jnj_jabatan = jj.kode
       LEFT JOIN kelompok_jabatan kj ON p.kode_kelompok = kj.kode_kelompok
       LEFT JOIN resiko_kerja rk ON p.kode_resiko = rk.kode_resiko
       LEFT JOIN emergency_index ei ON p.kode_emergency = ei.kode_emergency
       LEFT JOIN departemen d ON p.departemen = d.dep_id
       LEFT JOIN stts_wp sw ON p.stts_wp = sw.stts
       LEFT JOIN stts_kerja sk ON p.stts_kerja = sk.stts
       LEFT JOIN bank b ON p.bpd = b.namabank
       WHERE ${syarat.sql}
       ORDER BY p.nama ASC, p.id ASC
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
    });
  } catch (error) {
    console.error("Gagal memuat data pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data pegawai. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const input = pegawaiInput(await bacaBody(req));
    await connection.beginTransaction();
    transaksi = true;
    const result = await savePegawai(connection, 0, input, false);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
      message: `Pegawai ${input.nama} (${input.nik}) berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PegawaiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan data pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data pegawai. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const id = bacaIdPegawai(body.id);
    const input = pegawaiInput(body);
    await connection.beginTransaction();
    transaksi = true;
    const result = await savePegawai(connection, id, input, true);
    if (!result.affectedRows) throw new PegawaiError("Pegawai yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { id },
      message: `Pegawai ${input.nama} (${input.nik}) berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PegawaiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah data pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data pegawai. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const id = bacaIdPegawai(new URL(req.url).searchParams.get("id"));
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await updateStatusPegawai(connection, id, "KELUAR");
    if (!terpengaruh) throw new PegawaiError("Pegawai yang dinonaktifkan tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Pegawai ${id} ditandai KELUAR.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PegawaiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menonaktifkan data pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menonaktifkan data pegawai. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const id = bacaIdPegawai(body.id);
    const status = typeof body.status === "string" ? body.status : "";
    if (!STATUS_PEGAWAI.some((item) => item === status)) {
      throw new PegawaiError("Status pegawai tidak dikenal.");
    }
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await updateStatusPegawai(connection, id, status as StatusPegawai);
    if (!terpengaruh) throw new PegawaiError("Pegawai yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Status pegawai ${id} menjadi ${status}.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof PegawaiError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah status pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status pegawai. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

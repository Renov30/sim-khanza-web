import { masterObatAccess } from "@/lib/farmasi/access";
import {
  MasterObatError,
  masterObatInput,
  nextMasterObatCode,
  saveMasterObat,
  updateMasterObatStatus,
} from "@/lib/farmasi/master-obat";
import { NextRequest, NextResponse } from "next/server";
import { executeQuery, pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2/promise";

const LOCK_NAME = "khanza-web:master-obat:kode";

interface FilterMasterObat {
  cari: string;
  jenis: string;
  kategori: string;
  golongan: string;
  status: string;
}

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new MasterObatError("Data barang tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new MasterObatError("Isi permintaan tidak valid.");
  }
}

function filterMasterObat(searchParams: URLSearchParams): FilterMasterObat {
  const status = searchParams.get("status") || "1";
  return {
    cari: (searchParams.get("cari") || "").trim().slice(0, 100),
    jenis: (searchParams.get("jenis") || "").trim().slice(0, 4),
    kategori: (searchParams.get("kategori") || "").trim().slice(0, 4),
    golongan: (searchParams.get("golongan") || "").trim().slice(0, 4),
    status: ["0", "1", "semua"].includes(status) ? status : "1",
  };
}

function syaratFilter(filter: FilterMasterObat) {
  const clauses = ["1=1"];
  const params: (string | number)[] = [];
  if (filter.cari) {
    clauses.push("(d.kode_brng LIKE ? OR d.nama_brng LIKE ? OR d.letak_barang LIKE ?)");
    const kata = `%${filter.cari}%`;
    params.push(kata, kata, kata);
  }
  if (filter.jenis) {
    clauses.push("d.kdjns = ?");
    params.push(filter.jenis);
  }
  if (filter.kategori) {
    clauses.push("d.kode_kategori = ?");
    params.push(filter.kategori);
  }
  if (filter.golongan) {
    clauses.push("d.kode_golongan = ?");
    params.push(filter.golongan);
  }
  if (filter.status !== "semua") {
    clauses.push("d.status = ?");
    params.push(filter.status);
  }
  return { sql: clauses.join(" AND "), params };
}

export async function GET(req: NextRequest) {
  const denied = await masterObatAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const filter = filterMasterObat(searchParams);
    const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
    const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
    const syarat = syaratFilter(filter);
    const jumlah = await executeQuery<RowDataPacket & { total: number }>(
      `SELECT COUNT(*) AS total FROM databarang d WHERE ${syarat.sql}`,
      syarat.params,
    );
    const total = Number(jumlah[0]?.total ?? 0);
    const data = await executeQuery<Record<string, unknown>>(
      `SELECT
        d.kode_brng, d.nama_brng, d.kode_satbesar, ksb.satuan AS satuan_besar,
        d.kode_sat, ks.satuan AS satuan_kecil, d.isi, d.kapasitas, d.letak_barang,
        d.dasar, d.h_beli, d.ralan, d.kelas1, d.kelas2, d.kelas3, d.utama, d.vip, d.vvip,
        d.beliluar, d.jualbebas, d.karyawan, d.stokminimal, d.kdjns, j.nama AS nama_jenis,
        DATE_FORMAT(d.expire, '%Y-%m-%d') AS expire, d.status,
        d.kode_industri, i.nama_industri, d.kode_kategori, k.nama AS nama_kategori,
        d.kode_golongan, g.nama AS nama_golongan
      FROM databarang d
      LEFT JOIN kodesatuan ksb ON d.kode_satbesar = ksb.kode_sat
      LEFT JOIN kodesatuan ks ON d.kode_sat = ks.kode_sat
      LEFT JOIN jenis j ON d.kdjns = j.kdjns
      LEFT JOIN industrifarmasi i ON d.kode_industri = i.kode_industri
      LEFT JOIN kategori_barang k ON d.kode_kategori = k.kode
      LEFT JOIN golongan_barang g ON d.kode_golongan = g.kode
      WHERE ${syarat.sql}
      ORDER BY d.nama_brng ASC
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
    console.error("Gagal memuat data obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data obat. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await masterObatAccess();
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
    if (!kunci) throw new MasterObatError("Penomoran kode barang sedang digunakan. Silakan simpan kembali.", 409);
    const kode = await nextMasterObatCode(connection);
    const input = masterObatInput({ ...body, kode_brng: kode });
    await connection.beginTransaction();
    transaksi = true;
    await saveMasterObat(connection, input, false);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kode_brng: kode },
      message: `Barang ${input.nama_brng} (${kode}) berhasil disimpan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof MasterObatError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menyimpan data obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data barang. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    if (kunci) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [LOCK_NAME]);
      } catch (error) {
        connection.destroy();
        rusak = true;
        console.error("Gagal melepas lock kode barang:", error);
      }
    }
    if (!rusak) connection.release();
  }
}

export async function PUT(req: NextRequest) {
  const denied = await masterObatAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const input = masterObatInput(await bacaBody(req));
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await saveMasterObat(connection, input, true);
    if (!terpengaruh) throw new MasterObatError("Barang yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { kode_brng: input.kode_brng },
      message: `Barang ${input.nama_brng} (${input.kode_brng}) berhasil diperbarui.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof MasterObatError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah data obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data barang. Periksa isian dan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await masterObatAccess();
  if (denied) return denied;
  const kode = (new URL(req.url).searchParams.get("kode_brng") || "").trim();
  if (!kode) {
    return NextResponse.json({ success: false, error: "Kode barang diperlukan." }, { status: 400 });
  }
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await updateMasterObatStatus(connection, kode, "0");
    if (!terpengaruh) throw new MasterObatError("Barang yang dihapus tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({ success: true, message: `Barang ${kode} dinonaktifkan.` });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof MasterObatError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal menonaktifkan data obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menonaktifkan data barang. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await masterObatAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    const body = bodyRecord(await bacaBody(req));
    const kode = typeof body.kode_brng === "string" ? body.kode_brng.trim() : "";
    const status = typeof body.status === "string" ? body.status : "";
    if (!kode || !["0", "1"].includes(status)) {
      throw new MasterObatError("Kode barang dan status tidak valid.");
    }
    await connection.beginTransaction();
    transaksi = true;
    const terpengaruh = await updateMasterObatStatus(connection, kode, status as "0" | "1");
    if (!terpengaruh) throw new MasterObatError("Barang yang diubah tidak ditemukan.", 404);
    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      message: status === "1" ? `Barang ${kode} diaktifkan kembali.` : `Barang ${kode} dinonaktifkan.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof MasterObatError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status });
    }
    console.error("Gagal mengubah status obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengubah status barang. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

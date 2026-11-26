import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";
import type { UserSession } from "@/lib/types/auth";

export class PelayananError extends Error {
  readonly status: number;

  constructor(pesan: string, status = 400) {
    super(pesan);
    this.name = "PelayananError";
    this.status = status;
  }
}

export async function cekAksesModul(
  permissionKey: string,
  labelModul: string,
): Promise<{ session: UserSession; denied: null } | { session: null; denied: NextResponse }> {
  const session = await getSession();
  if (!session) {
    return {
      session: null,
      denied: NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 }),
    };
  }
  if (!session.isAdmin && !session.permissions[permissionKey]) {
    return {
      session: null,
      denied: NextResponse.json(
        { success: false, error: `Akses ${labelModul} tidak diizinkan.` },
        { status: 403 },
      ),
    };
  }
  return { session, denied: null };
}

export async function bacaBodyJson(req: NextRequest): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new PelayananError("Isi permintaan JSON tidak valid.");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PelayananError("Format data permintaan tidak valid.");
  }
  return body as Record<string, unknown>;
}

export function bacaTeks(
  body: Record<string, unknown>,
  kunci: string,
  label: string,
  maks: number,
  wajib = true,
): string {
  const nilai = body[kunci];
  const teks = typeof nilai === "string" ? nilai.trim() : typeof nilai === "number" ? String(nilai) : "";
  if (!teks) {
    if (wajib) throw new PelayananError(`${label} wajib diisi.`);
    return "";
  }
  if (teks.length > maks) {
    throw new PelayananError(`${label} tidak boleh lebih dari ${maks} karakter.`);
  }
  return teks;
}

export function bacaTanggal(
  body: Record<string, unknown>,
  kunci: string,
  label: string,
  wajib = true,
): string {
  const teks = bacaTeks(body, kunci, label, 10, wajib);
  if (!teks) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(teks)) {
    throw new PelayananError(`${label} harus berformat YYYY-MM-DD.`);
  }
  const [y, m, d] = teks.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() + 1 !== m || dt.getUTCDate() !== d) {
    throw new PelayananError(`${label} bukan tanggal kalender yang valid.`);
  }
  return teks;
}

export function bacaTanggalQuery(nilai: string | null, label: string): string {
  const teks = (nilai || "").trim();
  if (!teks) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(teks)) {
    throw new PelayananError(`${label} harus berformat YYYY-MM-DD.`);
  }
  return teks;
}

export function bacaJam(
  body: Record<string, unknown>,
  kunci: string,
  label: string,
  wajib = true,
): string {
  const mentah = bacaTeks(body, kunci, label, 8, wajib);
  if (!mentah) return "";
  const normal = /^\d{2}:\d{2}$/.test(mentah) ? `${mentah}:00` : mentah;
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(normal)) {
    throw new PelayananError(`${label} harus berformat HH:MM atau HH:MM:SS.`);
  }
  return normal;
}

export function bacaAngka(
  body: Record<string, unknown>,
  kunci: string,
  label: string,
  min = 0,
  max = 999999999999,
  wajib = false,
): number {
  const nilai = body[kunci];
  const teks = typeof nilai === "number" ? String(nilai) : typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new PelayananError(`${label} wajib diisi.`);
    return 0;
  }
  const angka = Number(teks);
  if (!Number.isFinite(angka) || angka < min || angka > max) {
    throw new PelayananError(`${label} harus berupa angka antara ${min} dan ${max}.`);
  }
  return angka;
}

export function bacaEnum<T extends string>(
  body: Record<string, unknown>,
  kunci: string,
  label: string,
  allowlist: readonly T[],
  defaultVal?: T,
): T {
  const mentah = typeof body[kunci] === "string" ? (body[kunci] as string).trim() : "";
  if (!mentah && defaultVal !== undefined) return defaultVal;
  const cocok = allowlist.find((item) => item === mentah);
  if (!cocok) {
    throw new PelayananError(`${label} tidak valid.`);
  }
  return cocok;
}

export function bacaPagination(searchParams: URLSearchParams, defaultLimit = 50, maxLimit = 200) {
  const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
  const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || defaultLimit, maxLimit));
  const cari = (searchParams.get("cari") || "").trim().slice(0, 100);
  return { halaman, batas, offset: (halaman - 1) * batas, cari };
}

export function waktuLokalJayapura(): { tanggal: string; jam: string; datetime: string } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jayapura",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const ambil = (tipe: string) => parts.find((p) => p.type === tipe)?.value || "00";
  const tanggal = `${ambil("year")}-${ambil("month")}-${ambil("day")}`;
  const jam = `${ambil("hour")}:${ambil("minute")}:${ambil("second")}`;
  return { tanggal, jam, datetime: `${tanggal} ${jam}` };
}

const CACHE_TABEL = new Map<string, { ada: boolean; kadaluarsa: number }>();

export async function cekTabelAda(namaTabel: string): Promise<boolean> {
  const sekarang = Date.now();
  const tersimpan = CACHE_TABEL.get(namaTabel);
  if (tersimpan && tersimpan.kadaluarsa > sekarang) {
    return tersimpan.ada;
  }
  const rows = await executeQuery<RowDataPacket & { ada: number }>(
    "SELECT 1 AS ada FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? LIMIT 1",
    [namaTabel],
  );
  const ada = rows.length > 0;
  CACHE_TABEL.set(namaTabel, { ada, kadaluarsa: sekarang + (ada ? 300_000 : 30_000) });
  return ada;
}

export async function denganTransaksi<T>(
  fn: (conn: PoolConnection) => Promise<T>,
  lockName?: string,
): Promise<T> {
  const conn = await pool.getConnection();
  let terkunci = false;
  let transaksi = false;
  let rusak = false;
  try {
    if (lockName) {
      const [rows] = await conn.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired",
        [lockName],
      );
      terkunci = rows[0]?.acquired === 1;
      if (!terkunci) {
        throw new PelayananError("Proses sedang digunakan pengguna lain. Silakan coba kembali.", 409);
      }
    }
    await conn.beginTransaction();
    transaksi = true;
    const hasil = await fn(conn);
    await conn.commit();
    transaksi = false;
    return hasil;
  } catch (error) {
    if (transaksi) {
      try {
        await conn.rollback();
      } catch {
        // abaikan error rollback sekunder
      }
    }
    throw error;
  } finally {
    if (terkunci && lockName) {
      try {
        await conn.execute("SELECT RELEASE_LOCK(?)", [lockName]);
      } catch (err) {
        conn.destroy();
        rusak = true;
        console.error(`Gagal melepas lock ${lockName}:`, err);
      }
    }
    if (!rusak) conn.release();
  }
}

export function tanganiErrorPelayanan(error: unknown, pesanDefault: string): NextResponse {
  if (error instanceof PelayananError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  const errObj = error as { code?: string; message?: string } | null;
  const code = errObj?.code || "";
  const msg = errObj?.message || "";
  if (code === "ER_DUP_ENTRY" || msg.includes("Duplicate entry")) {
    return NextResponse.json({ success: false, error: "Data dengan kunci yang sama sudah terdaftar." }, { status: 409 });
  }
  if (code === "ER_NO_REFERENCED_ROW_2" || msg.includes("foreign key constraint fails")) {
    return NextResponse.json({ success: false, error: "Referensi data terkait tidak ditemukan atau masih digunakan transaksi lain." }, { status: 400 });
  }
  if (code === "ER_ROW_IS_REFERENCED_2") {
    return NextResponse.json({ success: false, error: "Data tidak dapat dihapus karena masih digunakan oleh transaksi lain." }, { status: 409 });
  }
  console.error(pesanDefault, error);
  return NextResponse.json({ success: false, error: pesanDefault }, { status: 500 });
}

export function responsDaftar(
  data: unknown[],
  total: number,
  halaman: number,
  batas: number,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json({
    success: true,
    data,
    total,
    halaman,
    batas,
    totalHalaman: Math.max(1, Math.ceil(total / batas)),
    ...(extra || {}),
  });
}

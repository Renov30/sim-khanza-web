import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import {
  KATEGORI_TARIF_LAB,
  KELAS_TARIF_LAB,
  KODE_TARIF_LAB,
  STATUS_TARIF_LAB,
  TABEL_TARIF_LAB,
} from "@/lib/tarif-lab/konfigurasi";

type DbConnection = Pick<PoolConnection, "execute">;
type StatusFilterTarifLab = "0" | "1" | "semua";

const POLA_KODE = /^[\w.\-]+$/;
const POLA_ANGKA = /^\d+(?:\.\d{1,2})?$/;
const BATAS_ANGKA = 9999999999999;

export class TarifLabError extends Error {
  readonly status: number;

  constructor(pesan: string, status = 400) {
    super(pesan);
    this.name = "TarifLabError";
    this.status = status;
  }
}

export interface TarifLabInput {
  kd_jenis_prw: string;
  nm_perawatan: string;
  bagian_rs: number;
  bhp: number;
  tarif_perujuk: number;
  tarif_tindakan_dokter: number;
  tarif_tindakan_petugas: number;
  kso: number;
  menejemen: number;
  total_byr: number;
  kd_pj: string;
  kelas: string;
  kategori: string;
}

export interface FilterTarifLab {
  cari: string;
  status: StatusFilterTarifLab;
  kelas: string;
  kategori: string;
}

export interface BarisTarifLab {
  kd_jenis_prw: string;
  nm_perawatan: string;
  bagian_rs: number | string;
  bhp: number | string;
  tarif_perujuk: number | string;
  tarif_tindakan_dokter: number | string;
  tarif_tindakan_petugas: number | string;
  kso: number | string;
  menejemen: number | string;
  total_byr: number | string;
  kd_pj: string;
  png_jawab: string;
  kelas: string;
  kategori: string;
  status: string;
}

function bacaObject(body: unknown, pesan: string) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new TarifLabError(pesan);
  }
  return body as Record<string, unknown>;
}

function bacaTeks(nilai: unknown, label: string, maks: number, wajib = true) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new TarifLabError(`${label} wajib diisi.`);
    return "";
  }
  if (teks.length > maks || !POLA_KODE.test(teks)) {
    throw new TarifLabError(`${label} tidak valid.`);
  }
  return teks;
}

function bacaNama(nilai: unknown, label: string, maks: number) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) throw new TarifLabError(`${label} wajib diisi.`);
  if (teks.length > maks) throw new TarifLabError(`${label} tidak boleh lebih dari ${maks} karakter.`);
  return teks;
}

function bacaAngka(nilai: unknown, label: string) {
  const teks = typeof nilai === "number" ? String(nilai) : typeof nilai === "string" ? nilai.trim() : "";
  if (!teks || !POLA_ANGKA.test(teks) || teks.length > 13) {
    throw new TarifLabError(`${label} harus berupa angka tidak negatif.`);
  }
  const angka = Number(teks);
  if (!Number.isFinite(angka) || angka < 0 || angka > BATAS_ANGKA) {
    throw new TarifLabError(`${label} tidak valid.`);
  }
  return angka;
}

function bacaEnum<T extends string>(
  nilai: unknown,
  label: string,
  daftar: readonly T[],
  nilaiAwal: T,
) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) return nilaiAwal;
  const cocok = daftar.find((item) => item === teks);
  if (!cocok) throw new TarifLabError(`${label} tidak valid.`);
  return cocok;
}

export function hitungTotalTarifLab(input: Pick<TarifLabInput,
  "bagian_rs" | "bhp" | "tarif_perujuk" | "tarif_tindakan_dokter" | "tarif_tindakan_petugas" | "kso" | "menejemen">) {
  return Math.round(
    input.bagian_rs
    + input.bhp
    + input.tarif_perujuk
    + input.tarif_tindakan_dokter
    + input.tarif_tindakan_petugas
    + input.kso
    + input.menejemen,
  );
}

export function bacaFilterTarifLab(searchParams: URLSearchParams): FilterTarifLab {
  const statusMentah = (searchParams.get("status") || "1").trim();
  const status = STATUS_TARIF_LAB.find((item) => item === statusMentah)
    ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "1");
  const kelasMentah = (searchParams.get("kelas") || "").trim();
  const kategoriMentah = (searchParams.get("kategori") || "").trim();
  return {
    cari: (searchParams.get("cari") || "").trim().slice(0, 100),
    status,
    kelas: KELAS_TARIF_LAB.find((item) => item === kelasMentah) ?? "",
    kategori: KATEGORI_TARIF_LAB.find((item) => item === kategoriMentah) ?? "",
  };
}

export function kondisiFilterTarifLab(filter: FilterTarifLab) {
  const syarat = ["1=1"];
  const params: string[] = [];
  if (filter.cari) {
    syarat.push("(t.kd_jenis_prw LIKE ? OR t.nm_perawatan LIKE ? OR p.png_jawab LIKE ? OR t.kelas LIKE ? OR t.kategori LIKE ?)");
    params.push(...Array(5).fill(`%${filter.cari}%`));
  }
  if (filter.status !== "semua") {
    syarat.push("t.status = ?");
    params.push(filter.status);
  }
  if (filter.kelas) {
    syarat.push("t.kelas = ?");
    params.push(filter.kelas);
  }
  if (filter.kategori) {
    syarat.push("t.kategori = ?");
    params.push(filter.kategori);
  }
  return { sql: syarat.join(" AND "), params };
}

export function bacaInputTarifLab(body: unknown): TarifLabInput {
  const nilai = bacaObject(body, "Data tarif laboratorium tidak valid.");
  const dasar = {
    kd_jenis_prw: bacaTeks(nilai.kd_jenis_prw, "Kode tarif", 15, false),
    nm_perawatan: bacaNama(nilai.nm_perawatan, "Nama pemeriksaan", 80),
    kd_pj: bacaTeks(nilai.kd_pj, "Jenis bayar", 3),
    bagian_rs: bacaAngka(nilai.bagian_rs, "Jasa rumah sakit"),
    bhp: bacaAngka(nilai.bhp, "Paket BHP"),
    tarif_perujuk: bacaAngka(nilai.tarif_perujuk, "Jasa medis perujuk"),
    tarif_tindakan_dokter: bacaAngka(nilai.tarif_tindakan_dokter, "Jasa medis dokter"),
    tarif_tindakan_petugas: bacaAngka(nilai.tarif_tindakan_petugas, "Jasa medis petugas"),
    kso: bacaAngka(nilai.kso, "KSO"),
    menejemen: bacaAngka(nilai.menejemen, "Menejemen"),
    kelas: bacaEnum(nilai.kelas, "Kelas", KELAS_TARIF_LAB, "-"),
    kategori: bacaEnum(nilai.kategori, "Kategori", KATEGORI_TARIF_LAB, "PK"),
  };
  return { ...dasar, total_byr: hitungTotalTarifLab(dasar) };
}

export function bacaKunciTarifLab(body: unknown, kunciLama = false) {
  const nilai = bacaObject(body, "Kunci tarif laboratorium tidak valid.");
  const mentah = kunciLama ? nilai.kd_jenis_prw_lama ?? nilai.kd_lama : nilai.kd_jenis_prw;
  return bacaTeks(mentah, "Kode tarif", 15);
}

export function bacaDaftarKunciTarifLab(body: unknown) {
  const nilai = bacaObject(body, "Data penghapusan tidak valid.");
  if (!Array.isArray(nilai.items) || nilai.items.length === 0 || nilai.items.length > 100) {
    throw new TarifLabError("Pilih 1 sampai 100 tarif untuk diubah.");
  }
  return nilai.items.map((item) => bacaKunciTarifLab(item));
}

export async function nextKodeTarifLab(connection: DbConnection) {
  const batas = 10 ** KODE_TARIF_LAB.panjang - 1;
  const [rows] = await connection.execute<(RowDataPacket & { terakhir: number })[]>(
    `SELECT IFNULL(MAX(CAST(RIGHT(kd_jenis_prw, ?) AS UNSIGNED)), 0) AS terakhir
       FROM ${TABEL_TARIF_LAB}
      WHERE kd_jenis_prw REGEXP ?`,
    [KODE_TARIF_LAB.panjang, `^${KODE_TARIF_LAB.prefiks}[0-9]{${KODE_TARIF_LAB.panjang}}$`],
  );
  const terakhir = Number(rows[0]?.terakhir ?? 0);
  if (!Number.isFinite(terakhir) || terakhir >= batas) {
    throw new TarifLabError("Urutan kode tarif laboratorium sudah mencapai batas.", 409);
  }
  return `${KODE_TARIF_LAB.prefiks}${String(terakhir + 1).padStart(KODE_TARIF_LAB.panjang, "0")}`;
}

function terjemahkanError(error: unknown): never {
  if (error instanceof Error && error.message.includes("Duplicate entry")) {
    throw new TarifLabError("Kode tarif sudah digunakan. Gunakan kode lain.", 409);
  }
  if (
    error instanceof Error
    && /foreign key constraint fails|cannot add or update a child row/i.test(error.message)
  ) {
    throw new TarifLabError("Jenis bayar yang dipilih tidak ditemukan.");
  }
  throw error;
}

export async function simpanTarifLab(connection: DbConnection, input: TarifLabInput) {
  const kolom = [
    "kd_jenis_prw", "nm_perawatan", "bagian_rs", "bhp", "tarif_perujuk",
    "tarif_tindakan_dokter", "tarif_tindakan_petugas", "kso", "menejemen",
    "total_byr", "kd_pj", "status", "kelas", "kategori",
  ];
  const nilai: (string | number)[] = [
    input.kd_jenis_prw, input.nm_perawatan, input.bagian_rs, input.bhp, input.tarif_perujuk,
    input.tarif_tindakan_dokter, input.tarif_tindakan_petugas, input.kso, input.menejemen,
    input.total_byr, input.kd_pj, "1", input.kelas, input.kategori,
  ];
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ${TABEL_TARIF_LAB} (${kolom.join(", ")}) VALUES (${kolom.map(() => "?").join(", ")})`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function ubahTarifLab(connection: DbConnection, input: TarifLabInput, kodeLama: string) {
  const nilai: (string | number)[] = [
    input.kd_jenis_prw, input.nm_perawatan, input.bagian_rs, input.bhp, input.tarif_perujuk,
    input.tarif_tindakan_dokter, input.tarif_tindakan_petugas, input.kso, input.menejemen,
    input.total_byr, input.kd_pj, input.kelas, input.kategori, kodeLama,
  ];
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE ${TABEL_TARIF_LAB} SET kd_jenis_prw = ?, nm_perawatan = ?, bagian_rs = ?, bhp = ?, tarif_perujuk = ?, tarif_tindakan_dokter = ?, tarif_tindakan_petugas = ?, kso = ?, menejemen = ?, total_byr = ?, kd_pj = ?, kelas = ?, kategori = ? WHERE kd_jenis_prw = ?`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function ubahStatusTarifLab(
  connection: DbConnection,
  kode: string[],
  status: "0" | "1",
) {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE ${TABEL_TARIF_LAB} SET status = ? WHERE kd_jenis_prw IN (${kode.map(() => "?").join(", ")})`,
    [status, ...kode],
  );
  return result.affectedRows;
}

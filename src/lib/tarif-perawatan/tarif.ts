import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import {
  KELAS_TARIF,
  STATUS_TARIF,
  konfigurasiTarif,
  type JenisTarif,
} from "@/lib/tarif-perawatan/konfigurasi";

type DbConnection = Pick<PoolConnection, "execute">;

const POLA_KODE = /^[\w.\-]+$/;
const POLA_ANGKA = /^\d+(?:\.\d{1,2})?$/;

export class TarifPerawatanError extends Error {
  readonly status: number;

  constructor(pesan: string, status = 400) {
    super(pesan);
    this.name = "TarifPerawatanError";
    this.status = status;
  }
}

export interface TarifInput {
  kd_jenis_prw: string;
  nm_perawatan: string;
  kd_kategori: string;
  material: number;
  bhp: number;
  tarif_tindakandr: number;
  tarif_tindakanpr: number;
  kso: number;
  menejemen: number;
  total_byrdr: number;
  total_byrpr: number;
  total_byrdrpr: number;
  kd_pj: string;
  unit: string;
  kelas: string;
}

export interface FilterTarif {
  cari: string;
  status: string;
  kd_kategori: string;
  unit: string;
  kelas: string;
}

export function hitungTotalTarif(input: Pick<TarifInput,
  "material" | "bhp" | "tarif_tindakandr" | "tarif_tindakanpr" | "kso" | "menejemen">) {
  const bulat = (nilai: number) => Math.round(nilai);
  return {
    total_byrdr: bulat(input.material + input.tarif_tindakandr + input.bhp + input.kso + input.menejemen),
    total_byrpr: bulat(input.material + input.tarif_tindakanpr + input.bhp + input.kso + input.menejemen),
    total_byrdrpr: bulat(
      input.material
      + input.tarif_tindakandr
      + input.tarif_tindakanpr
      + input.bhp
      + input.kso
      + input.menejemen,
    ),
  };
}

function bacaObject(body: unknown, pesan: string) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new TarifPerawatanError(pesan);
  }
  return body as Record<string, unknown>;
}

function bacaTeks(nilai: unknown, label: string, maks: number, wajib = true) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new TarifPerawatanError(`${label} wajib diisi.`);
    return "";
  }
  if (teks.length > maks || !POLA_KODE.test(teks)) {
    throw new TarifPerawatanError(`${label} tidak valid.`);
  }
  return teks;
}

function bacaNama(nilai: unknown, label: string, maks: number) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) throw new TarifPerawatanError(`${label} wajib diisi.`);
  if (teks.length > maks) throw new TarifPerawatanError(`${label} tidak boleh lebih dari ${maks} karakter.`);
  return teks;
}

function bacaAngka(nilai: unknown, label: string, wajib = true) {
  const teks = typeof nilai === "number" ? String(nilai) : typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new TarifPerawatanError(`${label} wajib diisi.`);
    return 0;
  }
  if (!POLA_ANGKA.test(teks) || teks.length > 13) {
    throw new TarifPerawatanError(`${label} harus berupa angka tidak negatif.`);
  }
  const angka = Number(teks);
  if (!Number.isFinite(angka) || angka < 0 || angka > 9999999999999) {
    throw new TarifPerawatanError(`${label} tidak valid.`);
  }
  return angka;
}

export function bacaFilterTarif(jenis: JenisTarif, searchParams: URLSearchParams): FilterTarif {
  const statusMentah = (searchParams.get("status") || "1").trim();
  const kelasMentah = (searchParams.get("kelas") || "").trim();
  const konfigurasi = konfigurasiTarif(jenis);
  return {
    cari: (searchParams.get("cari") || "").trim().slice(0, 100),
    status: STATUS_TARIF.find((item) => item === statusMentah)
      ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "1"),
    kd_kategori: bacaTeks(searchParams.get("kd_kategori"), "Kategori", 5, false),
    unit: bacaTeks(searchParams.get("unit"), konfigurasi.unitLabel, 5, false),
    kelas: konfigurasi.punyaKelas
      ? KELAS_TARIF.find((item) => item === kelasMentah) ?? ""
      : "",
  };
}

export function kondisiFilterTarif(jenis: JenisTarif, filter: FilterTarif) {
  const konfigurasi = konfigurasiTarif(jenis);
  const namaUnit = konfigurasi.unitOpsi === "poliklinik" ? "nm_poli" : "nm_bangsal";
  const syarat = ["1=1"];
  const params: string[] = [];

  if (filter.cari) {
    const kolom = [
      "t.kd_jenis_prw LIKE ?",
      "t.nm_perawatan LIKE ?",
      "k.nm_kategori LIKE ?",
      "p.png_jawab LIKE ?",
      `u.${namaUnit} LIKE ?`,
    ];
    if (konfigurasi.punyaKelas) kolom.push("t.kelas LIKE ?");
    syarat.push(`(${kolom.join(" OR ")})`);
    params.push(...Array(kolom.length).fill(`%${filter.cari}%`));
  }
  if (filter.kd_kategori) {
    syarat.push("t.kd_kategori = ?");
    params.push(filter.kd_kategori);
  }
  if (filter.unit) {
    syarat.push(`t.${konfigurasi.unitField} = ?`);
    params.push(filter.unit);
  }
  if (filter.kelas) {
    syarat.push("t.kelas = ?");
    params.push(filter.kelas);
  }
  if (filter.status !== "semua") {
    syarat.push("t.status = ?");
    params.push(filter.status);
  }
  return { sql: syarat.join(" AND "), params };
}

export function bacaInputTarif(jenis: JenisTarif, body: unknown): TarifInput {
  const konfigurasi = konfigurasiTarif(jenis);
  const nilai = bacaObject(body, "Data tarif tidak valid.");
  const dasar = {
    kd_jenis_prw: bacaTeks(nilai.kd_jenis_prw, "Kode tarif", 15, false),
    nm_perawatan: bacaNama(nilai.nm_perawatan, "Nama tarif", 80),
    kd_kategori: bacaTeks(nilai.kd_kategori, "Kategori", 5),
    kd_pj: bacaTeks(nilai.kd_pj, "Jenis bayar", 3),
    unit: bacaTeks(nilai.unit, konfigurasi.unitLabel, 5),
    material: bacaAngka(nilai.material, "Jasa rumah sakit"),
    bhp: bacaAngka(nilai.bhp, "BHP/paket obat"),
    tarif_tindakandr: bacaAngka(nilai.tarif_tindakandr, "Jasa medis dokter"),
    tarif_tindakanpr: bacaAngka(nilai.tarif_tindakanpr, "Jasa medis perawat"),
    kso: bacaAngka(nilai.kso, "KSO"),
    menejemen: bacaAngka(nilai.menejemen, "Menejemen"),
  };
  const kelas = konfigurasi.punyaKelas
    ? KELAS_TARIF.find((item) => item === (typeof nilai.kelas === "string" ? nilai.kelas.trim() : ""))
      ?? "-"
    : "-";
  return { ...dasar, ...hitungTotalTarif(dasar), kelas };
}

export function bacaKunciTarif(body: unknown, kunciLama = false) {
  const nilai = bacaObject(body, "Kunci tarif tidak valid.");
  const mentah = kunciLama ? nilai.kd_jenis_prw_lama ?? nilai.kd_lama : nilai.kd_jenis_prw;
  return bacaTeks(mentah, "Kode tarif", 15);
}

export function bacaDaftarKunciTarif(body: unknown) {
  const nilai = bacaObject(body, "Data penghapusan tidak valid.");
  if (!Array.isArray(nilai.items) || nilai.items.length === 0 || nilai.items.length > 100) {
    throw new TarifPerawatanError("Pilih 1 sampai 100 tarif untuk diubah.");
  }
  return nilai.items.map((item) => bacaKunciTarif(item));
}

export async function nextKodeTarif(connection: DbConnection, jenis: JenisTarif) {
  const konfigurasi = konfigurasiTarif(jenis);
  const [rows] = await connection.execute<(RowDataPacket & { terakhir: number })[]>(
    `SELECT IFNULL(MAX(CAST(RIGHT(kd_jenis_prw, 5) AS UNSIGNED)), 0) AS terakhir
       FROM ${konfigurasi.tabel}
      WHERE kd_jenis_prw REGEXP ?`,
    [`^${konfigurasi.prefiksKode}[0-9]{5}$`],
  );
  const terakhir = Number(rows[0]?.terakhir ?? 0);
  if (!Number.isFinite(terakhir) || terakhir >= 99999) {
    throw new TarifPerawatanError("Urutan kode tarif sudah mencapai batas.", 409);
  }
  return `${konfigurasi.prefiksKode}${String(terakhir + 1).padStart(5, "0")}`;
}

function terjemahkanError(jenis: JenisTarif, error: unknown): never {
  if (error instanceof Error && error.message.includes("Duplicate entry")) {
    throw new TarifPerawatanError("Kode tarif sudah digunakan. Gunakan kode lain.", 409);
  }
  if (
    error instanceof Error
    && /foreign key constraint fails|cannot add or update a child row/i.test(error.message)
  ) {
    const relasi = jenis === "ralan"
      ? "Kategori, jenis bayar, atau poliklinik yang dipilih tidak ditemukan."
      : "Kategori, jenis bayar, atau bangsal yang dipilih tidak ditemukan.";
    throw new TarifPerawatanError(relasi);
  }
  throw error;
}

export async function simpanTarif(connection: DbConnection, jenis: JenisTarif, input: TarifInput) {
  const konfigurasi = konfigurasiTarif(jenis);
  const kolom = [
    "kd_jenis_prw", "nm_perawatan", "kd_kategori", "material", "bhp", "tarif_tindakandr",
    "tarif_tindakanpr", "kso", "menejemen", "total_byrdr", "total_byrpr", "total_byrdrpr",
    "kd_pj", konfigurasi.unitField, "status",
  ];
  const nilai: (string | number)[] = [
    input.kd_jenis_prw, input.nm_perawatan, input.kd_kategori, input.material, input.bhp,
    input.tarif_tindakandr, input.tarif_tindakanpr, input.kso, input.menejemen,
    input.total_byrdr, input.total_byrpr, input.total_byrdrpr, input.kd_pj, input.unit, "1",
  ];
  if (konfigurasi.punyaKelas) {
    kolom.push("kelas");
    nilai.push(input.kelas);
  }
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ${konfigurasi.tabel} (${kolom.join(", ")}) VALUES (${kolom.map(() => "?").join(", ")})`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(jenis, error);
  }
}

export async function ubahTarif(
  connection: DbConnection,
  jenis: JenisTarif,
  input: TarifInput,
  kodeLama: string,
) {
  const konfigurasi = konfigurasiTarif(jenis);
  const nilai: (string | number)[] = [
    input.kd_jenis_prw, input.nm_perawatan, input.kd_kategori, input.material, input.bhp,
    input.tarif_tindakandr, input.tarif_tindakanpr, input.kso, input.menejemen,
    input.total_byrdr, input.total_byrpr, input.total_byrdrpr, input.kd_pj, input.unit,
  ];
  const set = [
    "kd_jenis_prw = ?", "nm_perawatan = ?", "kd_kategori = ?", "material = ?", "bhp = ?",
    "tarif_tindakandr = ?", "tarif_tindakanpr = ?", "kso = ?", "menejemen = ?",
    "total_byrdr = ?", "total_byrpr = ?", "total_byrdrpr = ?", "kd_pj = ?",
    `${konfigurasi.unitField} = ?`,
  ];
  if (konfigurasi.punyaKelas) {
    set.push("kelas = ?");
    nilai.push(input.kelas);
  }
  nilai.push(kodeLama);
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE ${konfigurasi.tabel} SET ${set.join(", ")} WHERE kd_jenis_prw = ?`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(jenis, error);
  }
}

export async function ubahStatusTarif(
  connection: DbConnection,
  jenis: JenisTarif,
  kode: string[],
  status: "0" | "1",
) {
  const konfigurasi = konfigurasiTarif(jenis);
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE ${konfigurasi.tabel} SET status = ? WHERE kd_jenis_prw IN (${kode.map(() => "?").join(", ")})`,
    [status, ...kode],
  );
  return result.affectedRows;
}

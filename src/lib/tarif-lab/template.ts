import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { TarifLabError } from "@/lib/tarif-lab/tarif";
import { TABEL_TARIF_LAB } from "@/lib/tarif-lab/konfigurasi";

type DbConnection = Pick<PoolConnection, "execute">;

export const TABEL_TEMPLATE_LAB = "template_laboratorium";
const POLA_KODE = /^[\w.\-]+$/;

export const KOLOM_TEMPLATE_LAB = [
  "id_template", "kd_jenis_prw", "Pemeriksaan AS pemeriksaan",
  "nilai_rujukan_ld", "nilai_rujukan_la", "nilai_rujukan_pd", "nilai_rujukan_pa",
  "urut",
];

export interface BarisTemplateLab {
  id_template: number;
  kd_jenis_prw: string;
  pemeriksaan: string;
  nilai_rujukan_ld: string;
  nilai_rujukan_la: string;
  nilai_rujukan_pd: string;
  nilai_rujukan_pa: string;
  urut: number | string;
}

export interface TemplateLabInput {
  kd_jenis_prw: string;
  pemeriksaan: string;
  nilai_rujukan_ld: string;
  nilai_rujukan_la: string;
  nilai_rujukan_pd: string;
  nilai_rujukan_pa: string;
}

function bacaObject(body: unknown, pesan: string) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new TarifLabError(pesan);
  }
  return body as Record<string, unknown>;
}

export function bacaKodeTemplate(nilai: unknown, label = "Kode tarif", maks = 15) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) throw new TarifLabError(`${label} wajib diisi.`);
  if (teks.length > maks || !POLA_KODE.test(teks)) {
    throw new TarifLabError(`${label} tidak valid.`);
  }
  return teks;
}

function bacaTeks(nilai: unknown, label: string, maks: number, wajib = true) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new TarifLabError(`${label} wajib diisi.`);
    return "";
  }
  if (teks.length > maks) throw new TarifLabError(`${label} tidak boleh lebih dari ${maks} karakter.`);
  return teks;
}

export function bacaInputTemplate(body: unknown): TemplateLabInput {
  const nilai = bacaObject(body, "Data item pemeriksaan tidak valid.");
  return {
    kd_jenis_prw: bacaKodeTemplate(nilai.kd_jenis_prw, "Kode tarif", 15),
    pemeriksaan: bacaTeks(nilai.pemeriksaan, "Nama item pemeriksaan", 200),
    nilai_rujukan_ld: bacaTeks(nilai.nilai_rujukan_ld, "Nilai rujukan LD", 30, false),
    nilai_rujukan_la: bacaTeks(nilai.nilai_rujukan_la, "Nilai rujukan LA", 30, false),
    nilai_rujukan_pd: bacaTeks(nilai.nilai_rujukan_pd, "Nilai rujukan PD", 30, false),
    nilai_rujukan_pa: bacaTeks(nilai.nilai_rujukan_pa, "Nilai rujukan PA", 30, false),
  };
}

export function bacaKunciTemplate(body: unknown) {
  const nilai = bacaObject(body, "Kunci item pemeriksaan tidak valid.");
  const kode = bacaKodeTemplate(nilai.kd_jenis_prw, "Kode tarif", 15);
  const mentah = typeof nilai.id_template === "number"
    ? String(nilai.id_template)
    : typeof nilai.id_template === "string"
      ? nilai.id_template.trim()
      : "";
  if (!/^\d+$/.test(mentah) || mentah.length > 10) {
    throw new TarifLabError("ID template tidak valid.");
  }
  const id = Number(mentah);
  if (!Number.isSafeInteger(id) || id < 1 || id > 2147483647) {
    throw new TarifLabError("ID template tidak valid.");
  }
  return { kode, id };
}

export function pastikanIndukTemplate(rows: (RowDataPacket & { kategori?: string })[]) {
  if (rows.length === 0) throw new TarifLabError("Tarif laboratorium tidak ditemukan.", 404);
  const kategori = rows[0].kategori ?? "";
  if (kategori !== "PK" && kategori !== "MB") {
    throw new TarifLabError("Template Laboratorium hanya untuk kategori PK dan MB.");
  }
}

function terjemahkanError(error: unknown): never {
  if (error instanceof Error && error.message.includes("Duplicate entry")) {
    throw new TarifLabError("ID template sudah digunakan. Muat ulang daftar item.", 409);
  }
  if (
    error instanceof Error
    && /foreign key constraint|cannot delete or update a parent row/i.test(error.message)
  ) {
    throw new TarifLabError("Item template masih dipakai data lain dan tidak dapat dihapus.", 409);
  }
  throw error;
}

export async function simpanTemplateLab(connection: DbConnection, input: TemplateLabInput) {
  const kolom = [
    "kd_jenis_prw", "Pemeriksaan", "satuan", "nilai_rujukan_ld", "nilai_rujukan_la",
    "nilai_rujukan_pd", "nilai_rujukan_pa", "biaya_item", "urut",
  ];
  const nilai: (string | number)[] = [
    input.kd_jenis_prw, input.pemeriksaan, "", input.nilai_rujukan_ld,
    input.nilai_rujukan_la, input.nilai_rujukan_pd, input.nilai_rujukan_pa, 0, 0,
  ];
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ${TABEL_TEMPLATE_LAB} (${kolom.join(", ")}) VALUES (${kolom.map(() => "?").join(", ")})`,
      nilai,
    );
    return Number(result.insertId ?? 0);
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function ubahTemplateLab(connection: DbConnection, input: TemplateLabInput, id: number) {
  const nilai: (string | number)[] = [
    input.pemeriksaan, input.nilai_rujukan_ld, input.nilai_rujukan_la,
    input.nilai_rujukan_pd, input.nilai_rujukan_pa, id, input.kd_jenis_prw,
  ];
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE ${TABEL_TEMPLATE_LAB} SET Pemeriksaan = ?, satuan = '', nilai_rujukan_ld = ?, nilai_rujukan_la = ?, nilai_rujukan_pd = ?, nilai_rujukan_pa = ?, biaya_item = 0 WHERE id_template = ? AND kd_jenis_prw = ?`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function hapusTemplateLab(connection: DbConnection, id: number, kode: string) {
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `DELETE FROM ${TABEL_TEMPLATE_LAB} WHERE id_template = ? AND kd_jenis_prw = ?`,
      [id, kode],
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function renomorTemplateLab(connection: DbConnection, kode: string) {
  const [rows] = await connection.execute<(RowDataPacket & { id_template: number })[]>(
    `SELECT id_template FROM ${TABEL_TEMPLATE_LAB} WHERE kd_jenis_prw = ? ORDER BY urut, id_template`,
    [kode],
  );
  for (let indeks = 0; indeks < rows.length; indeks += 1) {
    await connection.execute(
      `UPDATE ${TABEL_TEMPLATE_LAB} SET urut = ? WHERE id_template = ?`,
      [indeks, rows[indeks].id_template],
    );
  }
}

export function namaLockTemplateLab(kode: string) {
  return `simrs-khanza-template-lab-${kode}`;
}

export function sqlIndukTemplateLab() {
  return `SELECT kategori FROM ${TABEL_TARIF_LAB} WHERE kd_jenis_prw = ? FOR UPDATE`;
}

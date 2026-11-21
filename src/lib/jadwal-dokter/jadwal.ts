import type { PoolConnection, ResultSetHeader } from "mysql2/promise";

type DbConnection = Pick<PoolConnection, "execute">;

export const HARI_KERJA = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "AKHAD"] as const;
export const JAM = Array.from({ length: 24 }, (_, indeks) => String(indeks).padStart(2, "0"));
export const MENIT_DETIK = Array.from({ length: 60 }, (_, indeks) => String(indeks).padStart(2, "0"));

const POLA_KODE = /^[\w.\-]+$/;
const POLA_JAM = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

export class JadwalDokterError extends Error {
  readonly status: number;

  constructor(pesan: string, status = 400) {
    super(pesan);
    this.name = "JadwalDokterError";
    this.status = status;
  }
}

export interface JadwalInput {
  kd_dokter: string;
  hari_kerja: string;
  jam_mulai: string;
  jam_selesai: string;
  kd_poli: string;
  kuota: number;
}

export interface KunciJadwal {
  kd_dokter: string;
  hari_kerja: string;
  jam_mulai: string;
}

export interface KunciJadwalEdit extends KunciJadwal {
  jam_selesai: string;
}

export interface FilterJadwal {
  cari: string;
  kd_dokter: string;
  kd_poli: string;
  hari_kerja: string;
}

function bacaObject(body: unknown, pesan: string) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new JadwalDokterError(pesan);
  }
  return body as Record<string, unknown>;
}

function bacaTeks(nilai: unknown, label: string, maks: number) {
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) throw new JadwalDokterError(`${label} wajib diisi.`);
  if (teks.length > maks) throw new JadwalDokterError(`${label} tidak boleh lebih dari ${maks} karakter.`);
  return teks;
}

function bacaKodeFilter(nilai: string | null, maks: number) {
  const teks = (nilai || "").trim();
  return teks.length <= maks && POLA_KODE.test(teks) ? teks : "";
}

export function bacaFilterJadwal(searchParams: URLSearchParams): FilterJadwal {
  const hariMentah = (searchParams.get("hari_kerja") || "").trim();
  return {
    cari: (searchParams.get("cari") || "").trim().slice(0, 100),
    kd_dokter: bacaKodeFilter(searchParams.get("kd_dokter"), 20),
    kd_poli: bacaKodeFilter(searchParams.get("kd_poli"), 5),
    hari_kerja: HARI_KERJA.find((hari) => hari === hariMentah) ?? "",
  };
}

export function kondisiFilterJadwal(filter: FilterJadwal) {
  const syarat = ["1=1"];
  const params: string[] = [];
  if (filter.cari) {
    syarat.push("(j.kd_dokter LIKE ? OR d.nm_dokter LIKE ? OR j.hari_kerja LIKE ? OR p.nm_poli LIKE ?)");
    params.push(...Array(4).fill(`%${filter.cari}%`));
  }
  if (filter.kd_dokter) {
    syarat.push("j.kd_dokter = ?");
    params.push(filter.kd_dokter);
  }
  if (filter.kd_poli) {
    syarat.push("j.kd_poli = ?");
    params.push(filter.kd_poli);
  }
  if (filter.hari_kerja) {
    syarat.push("j.hari_kerja = ?");
    params.push(filter.hari_kerja);
  }
  return { sql: syarat.join(" AND "), params };
}

export function bacaKodeDokter(nilai: unknown, label = "Dokter") {
  const kode = bacaTeks(nilai, label, 20);
  if (!POLA_KODE.test(kode)) throw new JadwalDokterError(`${label} tidak valid.`);
  return kode;
}

export function bacaKodePoli(nilai: unknown, label = "Poliklinik") {
  const kode = bacaTeks(nilai, label, 5);
  if (!POLA_KODE.test(kode)) throw new JadwalDokterError(`${label} tidak valid.`);
  return kode;
}

export function bacaHariKerja(nilai: unknown, label = "Hari kerja") {
  const teks = bacaTeks(nilai, label, 10);
  const hari = HARI_KERJA.find((item) => item === teks);
  if (!hari) throw new JadwalDokterError(`${label} tidak dikenal.`);
  return hari;
}

export function bacaJam(nilai: unknown, label: string) {
  const teks = bacaTeks(nilai, label, 8);
  if (!POLA_JAM.test(teks)) throw new JadwalDokterError(`${label} harus berformat HH:MM:SS.`);
  return teks;
}

export function bacaKuota(nilai: unknown) {
  const teks = typeof nilai === "number" ? String(nilai) : typeof nilai === "string" ? nilai.trim() : "";
  if (!/^\d{1,4}$/.test(teks)) {
    throw new JadwalDokterError("Kuota harus berupa angka 0 sampai 9999.");
  }
  return Number(teks);
}

export function jadwalInput(body: unknown): JadwalInput {
  const nilai = bacaObject(body, "Data jadwal dokter tidak valid.");
  return {
    kd_dokter: bacaKodeDokter(nilai.kd_dokter),
    hari_kerja: bacaHariKerja(nilai.hari_kerja),
    jam_mulai: bacaJam(nilai.jam_mulai, "Jam mulai"),
    jam_selesai: bacaJam(nilai.jam_selesai, "Jam selesai"),
    kd_poli: bacaKodePoli(nilai.kd_poli),
    kuota: bacaKuota(nilai.kuota),
  };
}

export function bacaKunciEdit(body: unknown): KunciJadwalEdit {
  const nilai = bacaObject(body, "Kunci jadwal dokter tidak valid.");
  return {
    kd_dokter: bacaKodeDokter(nilai.kd_dokter_lama, "Dokter lama"),
    hari_kerja: bacaHariKerja(nilai.hari_kerja_lama, "Hari kerja lama"),
    jam_mulai: bacaJam(nilai.jam_mulai_lama, "Jam mulai lama"),
    jam_selesai: bacaJam(nilai.jam_selesai_lama, "Jam selesai lama"),
  };
}

function bacaKunciHapus(nilai: unknown): KunciJadwal {
  const item = bacaObject(nilai, "Data jadwal yang dihapus tidak valid.");
  return {
    kd_dokter: bacaKodeDokter(item.kd_dokter),
    hari_kerja: bacaHariKerja(item.hari_kerja),
    jam_mulai: bacaJam(item.jam_mulai, "Jam mulai"),
  };
}

export function bacaDaftarHapus(body: unknown): KunciJadwal[] {
  const nilai = bacaObject(body, "Data penghapusan tidak valid.");
  if (!Array.isArray(nilai.items) || nilai.items.length === 0 || nilai.items.length > 100) {
    throw new JadwalDokterError("Pilih 1 sampai 100 jadwal untuk dihapus.");
  }
  return nilai.items.map(bacaKunciHapus);
}

function adalahDuplikat(error: unknown) {
  return error instanceof Error && error.message.includes("Duplicate entry");
}

function adalahErrorRelasi(error: unknown) {
  return error instanceof Error
    && /foreign key constraint fails|cannot add or update a child row/i.test(error.message);
}

function terjemahkanError(error: unknown): never {
  if (adalahDuplikat(error)) {
    throw new JadwalDokterError("Jadwal dengan dokter, hari, dan jam mulai tersebut sudah ada.", 409);
  }
  if (adalahErrorRelasi(error)) {
    throw new JadwalDokterError("Dokter atau poliklinik yang dipilih tidak ditemukan.");
  }
  throw error;
}

export async function simpanJadwal(connection: DbConnection, input: JadwalInput) {
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO jadwal (kd_dokter, hari_kerja, jam_mulai, jam_selesai, kd_poli, kuota)
       VALUES (?,?,?,?,?,?)`,
      [input.kd_dokter, input.hari_kerja, input.jam_mulai, input.jam_selesai, input.kd_poli, input.kuota],
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function ubahJadwal(connection: DbConnection, input: JadwalInput, kunci: KunciJadwalEdit) {
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE jadwal SET
         jam_mulai = ?, jam_selesai = ?, kd_poli = ?, kd_dokter = ?, hari_kerja = ?, kuota = ?
       WHERE kd_dokter = ? AND hari_kerja = ? AND jam_mulai = ? AND jam_selesai = ?`,
      [
        input.jam_mulai,
        input.jam_selesai,
        input.kd_poli,
        input.kd_dokter,
        input.hari_kerja,
        input.kuota,
        kunci.kd_dokter,
        kunci.hari_kerja,
        kunci.jam_mulai,
        kunci.jam_selesai,
      ],
    );
    return result.affectedRows;
  } catch (error) {
    terjemahkanError(error);
  }
}

export async function hapusJadwal(connection: DbConnection, kunci: KunciJadwal) {
  const [result] = await connection.execute<ResultSetHeader>(
    "DELETE FROM jadwal WHERE kd_dokter = ? AND hari_kerja = ? AND jam_mulai = ?",
    [kunci.kd_dokter, kunci.hari_kerja, kunci.jam_mulai],
  );
  return result.affectedRows;
}

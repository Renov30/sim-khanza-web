import type { PoolConnection, ResultSetHeader } from "mysql2/promise";

type DbConnection = Pick<PoolConnection, "execute">;

export const GOLONGAN_DARAH = ["A", "B", "O", "AB", "-"] as const;
export const AGAMA = ["ISLAM", "KRISTEN", "KATOLIK", "HINDU", "BUDHA", "KONG HU CHU", "-"] as const;
export const STATUS_NIKAH = ["BELUM MENIKAH", "MENIKAH", "JANDA", "DUDHA", "JOMBLO"] as const;
export const JK_MASTER = ["L", "P"] as const;
export const STATUS_MASTER = ["0", "1"] as const;

export class KepegawaianError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export function bacaTeks(body: Record<string, unknown>, kunci: string, maks: number, wajib = true) {
  const field = body[kunci] ?? "";
  if (typeof field !== "string" || field.trim().length > maks || (wajib && !field.trim())) {
    throw new KepegawaianError(`Isian ${kunci} tidak valid.`);
  }
  return field.trim();
}

export function bacaEnum<T extends string>(
  body: Record<string, unknown>,
  kunci: string,
  daftar: readonly T[],
  wajib = true,
) {
  const field = bacaTeks(body, kunci, 30, wajib);
  if (!field) return null;
  const cocok = daftar.find((item) => item === field);
  if (!cocok) throw new KepegawaianError(`Isian ${kunci} tidak dikenal.`);
  return cocok;
}

export function bacaTanggal(body: Record<string, unknown>, kunci: string, wajib = false) {
  const field = bacaTeks(body, kunci, 10, false);
  if (!field) {
    if (wajib) throw new KepegawaianError(`Isian ${kunci} wajib diisi.`);
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(field)) throw new KepegawaianError(`Isian ${kunci} bukan tanggal yang valid.`);
  const tanggal = new Date(`${field}T00:00:00Z`);
  if (Number.isNaN(tanggal.getTime()) || tanggal.toISOString().slice(0, 10) !== field) {
    throw new KepegawaianError(`Isian ${kunci} bukan tanggal yang valid.`);
  }
  return field;
}

export function jkPegawai(jk: string) {
  return jk === "P" ? "Wanita" : "Pria";
}

export function adalahDuplikat(error: unknown) {
  return error instanceof Error && /ER_DUP_ENTRY|Duplicate entry/i.test(error.message);
}

export async function seedMasterPegawai(connection: DbConnection) {
  await connection.execute(
    "INSERT IGNORE INTO jnj_jabatan (kode, nama, tnj, indek) VALUES (?, ?, ?, ?)",
    ["-", "-", 0, 0],
  );
  await connection.execute("INSERT IGNORE INTO departemen (dep_id, nama) VALUES (?, ?)", ["-", "-"]);
  await connection.execute("INSERT IGNORE INTO bidang (nama) VALUES (?)", ["-"]);
  await connection.execute("INSERT IGNORE INTO bank (namabank) VALUES (?)", ["T"]);
  await connection.execute("INSERT IGNORE INTO stts_wp (stts, ktg) VALUES (?, ?)", ["-", "-"]);
  await connection.execute("INSERT IGNORE INTO stts_kerja (stts, ktg, indek) VALUES (?, ?, ?)", ["-", "-", 0]);
  await connection.execute(
    "INSERT IGNORE INTO kelompok_jabatan (kode_kelompok, nama_kelompok, indek) VALUES (?, ?, ?)",
    ["-", "-", 0],
  );
  await connection.execute(
    "INSERT IGNORE INTO resiko_kerja (kode_resiko, nama_resiko, indek) VALUES (?, ?, ?)",
    ["-", "-", 0],
  );
  await connection.execute(
    "INSERT IGNORE INTO emergency_index (kode_emergency, nama_emergency, indek) VALUES (?, ?, ?)",
    ["-", "-", 0],
  );
  await connection.execute(
    "INSERT IGNORE INTO pendidikan (tingkat, indek, gapok1, kenaikan, maksimal) VALUES (?, ?, ?, ?, ?)",
    ["-", 0, 0, 0, 0],
  );
}

export interface PegawaiPokok {
  nik: string;
  nama: string;
  jk: string;
  tmp_lahir: string;
  tgl_lahir: string | null;
  alamat: string;
}

export async function pastikanPegawaiPokok(connection: DbConnection, data: PegawaiPokok) {
  const nilai: (string | number)[] = [
    data.nik,
    data.nama,
    jkPegawai(data.jk),
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", 0,
    data.tmp_lahir || "-",
    data.tgl_lahir || "1900-01-01",
    data.alamat || "-",
    "-", "1900-01-01", "<1", "-", "T", "-", "AKTIF", 0, 0, 0,
    "1900-01-01", 0, 0, "pages/pegawai/photo/", "-",
  ];
  await connection.execute<ResultSetHeader>(
    `INSERT IGNORE INTO pegawai (
      nik, nama, jk, jbtn, jnj_jabatan, kode_kelompok, kode_resiko, kode_emergency,
      departemen, bidang, stts_wp, stts_kerja, npwp, pendidikan, gapok, tmp_lahir,
      tgl_lahir, alamat, kota, mulai_kerja, ms_kerja, indexins, bpd, rekening,
      stts_aktif, wajibmasuk, pengurang, indek, mulai_kontrak, cuti_diambil, dankes,
      photo, no_ktp
    ) VALUES (${nilai.map(() => "?").join(",")})`,
    nilai,
  );
}

export async function perbaruiPegawaiPokok(connection: DbConnection, nikLama: string, data: PegawaiPokok) {
  await connection.execute<ResultSetHeader>(
    `UPDATE pegawai SET nik = ?, nama = ?, jk = ?, tmp_lahir = ?, tgl_lahir = ?, alamat = ?
     WHERE nik = ?`,
    [
      data.nik,
      data.nama,
      jkPegawai(data.jk),
      data.tmp_lahir || "-",
      data.tgl_lahir || "1900-01-01",
      data.alamat || "-",
      nikLama,
    ],
  );
}

export async function ubahStatusPegawaiPokok(connection: DbConnection, nik: string, status: "AKTIF" | "KELUAR") {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE pegawai SET stts_aktif = ? WHERE nik = ?",
    [status, nik],
  );
  return result.affectedRows;
}

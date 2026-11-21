import type { PoolConnection, ResultSetHeader } from "mysql2/promise";

type DbConnection = Pick<PoolConnection, "execute">;

export const STATUS_PEGAWAI = ["AKTIF", "CUTI", "KELUAR", "TENAGA LUAR", "NON AKTIF"] as const;
export const JENIS_KELAMIN = ["Pria", "Wanita"] as const;
export const MASA_KERJA = ["<1", "PT", "FT>1"] as const;

export type StatusPegawai = (typeof STATUS_PEGAWAI)[number];
export type JenisKelamin = (typeof JENIS_KELAMIN)[number];
export type MasaKerja = (typeof MASA_KERJA)[number];

export class PegawaiError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export interface PegawaiInput {
  nik: string;
  nama: string;
  jk: JenisKelamin;
  jbtn: string;
  jnj_jabatan: string;
  kode_kelompok: string;
  kode_resiko: string;
  kode_emergency: string;
  departemen: string;
  bidang: string;
  stts_wp: string;
  stts_kerja: string;
  npwp: string;
  pendidikan: string;
  gapok: number;
  tmp_lahir: string;
  tgl_lahir: string;
  alamat: string;
  kota: string;
  mulai_kerja: string;
  ms_kerja: MasaKerja;
  indexins: string;
  bpd: string;
  rekening: string;
  stts_aktif: StatusPegawai;
  wajibmasuk: number;
  mulai_kontrak: string | null;
  no_ktp: string;
}

export interface FilterPegawai {
  cari: string;
  departemen: string;
  bidang: string;
  jnjJabatan: string;
  sttsKerja: string;
  kodeKelompok: string;
  status: StatusPegawai | "semua";
}

function potong(searchParams: URLSearchParams, kunci: string, maks: number) {
  return (searchParams.get(kunci) || "").trim().slice(0, maks);
}

export function bacaFilterPegawai(searchParams: URLSearchParams): FilterPegawai {
  const statusMentah = (searchParams.get("status") || "AKTIF").trim();
  const status = STATUS_PEGAWAI.find((item) => item === statusMentah)
    ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "AKTIF");
  return {
    cari: potong(searchParams, "cari", 100),
    departemen: potong(searchParams, "departemen", 4),
    bidang: potong(searchParams, "bidang", 15),
    jnjJabatan: potong(searchParams, "jnj_jabatan", 5),
    sttsKerja: potong(searchParams, "stts_kerja", 3),
    kodeKelompok: potong(searchParams, "kode_kelompok", 3),
    status,
  };
}

export function kondisiFilterPegawai(filter: FilterPegawai) {
  const clauses = ["1=1"];
  const params: (string | number)[] = [];
  if (filter.cari) {
    clauses.push("(p.nik LIKE ? OR p.nama LIKE ? OR p.jbtn LIKE ? OR jj.nama LIKE ? OR d.nama LIKE ? OR p.bidang LIKE ? OR p.no_ktp LIKE ?)");
    const kata = `%${filter.cari}%`;
    params.push(kata, kata, kata, kata, kata, kata, kata);
  }
  if (filter.departemen) {
    clauses.push("p.departemen = ?");
    params.push(filter.departemen);
  }
  if (filter.bidang) {
    clauses.push("p.bidang = ?");
    params.push(filter.bidang);
  }
  if (filter.jnjJabatan) {
    clauses.push("p.jnj_jabatan = ?");
    params.push(filter.jnjJabatan);
  }
  if (filter.sttsKerja) {
    clauses.push("p.stts_kerja = ?");
    params.push(filter.sttsKerja);
  }
  if (filter.kodeKelompok) {
    clauses.push("p.kode_kelompok = ?");
    params.push(filter.kodeKelompok);
  }
  if (filter.status !== "semua") {
    clauses.push("p.stts_aktif = ?");
    params.push(filter.status);
  }
  return { sql: clauses.join(" AND "), params };
}

export function bacaIdPegawai(nilai: unknown) {
  const id = typeof nilai === "number"
    ? nilai
    : typeof nilai === "string" && /^\d+$/.test(nilai.trim())
      ? Number(nilai.trim())
      : Number.NaN;
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new PegawaiError("ID pegawai tidak valid.");
  }
  return id;
}

function tanggalValid(nilai: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nilai)) return false;
  const tanggal = new Date(`${nilai}T00:00:00Z`);
  return !Number.isNaN(tanggal.getTime()) && tanggal.toISOString().slice(0, 10) === nilai;
}

export function pegawaiInput(body: unknown): PegawaiInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PegawaiError("Data pegawai tidak valid.");
  }
  const value = body as Record<string, unknown>;
  const teks = (kunci: string, maks: number, wajib = true) => {
    const field = value[kunci] ?? "";
    if (typeof field !== "string" || field.trim().length > maks || (wajib && !field.trim())) {
      throw new PegawaiError(`Isian ${kunci} tidak valid.`);
    }
    return field.trim();
  };
  const pilihan = <T extends string>(kunci: string, daftar: readonly T[]) => {
    const field = teks(kunci, 20);
    const cocok = daftar.find((item) => item === field);
    if (!cocok) throw new PegawaiError(`Isian ${kunci} tidak dikenal.`);
    return cocok;
  };
  const tanggal = (kunci: string, wajib: boolean) => {
    const field = teks(kunci, 10, false);
    if (!field) {
      if (wajib) throw new PegawaiError(`Isian ${kunci} wajib diisi.`);
      return null;
    }
    if (!tanggalValid(field)) throw new PegawaiError(`Isian ${kunci} bukan tanggal yang valid.`);
    return field;
  };
  const angka = (kunci: string, minimum: number) => {
    const field = value[kunci];
    const parsed = typeof field === "number"
      ? field
      : typeof field === "string" && field.trim()
        ? Number(field)
        : Number.NaN;
    if (!Number.isFinite(parsed) || parsed < minimum) {
      throw new PegawaiError(`Isian ${kunci} harus berupa angka.`);
    }
    return parsed;
  };
  const bilanganBulat = (kunci: string, minimum: number, maksimum: number) => {
    const parsed = angka(kunci, minimum);
    if (!Number.isInteger(parsed) || parsed > maksimum) {
      throw new PegawaiError(`Isian ${kunci} harus berupa bilangan bulat.`);
    }
    return parsed;
  };
  const tglLahir = tanggal("tgl_lahir", true);
  const mulaiKerja = tanggal("mulai_kerja", true);
  if (!tglLahir || !mulaiKerja) {
    throw new PegawaiError("Tanggal lahir dan mulai kerja wajib diisi.");
  }
  return {
    nik: teks("nik", 20),
    nama: teks("nama", 50),
    jk: pilihan("jk", JENIS_KELAMIN),
    jbtn: teks("jbtn", 25, false),
    jnj_jabatan: teks("jnj_jabatan", 5),
    kode_kelompok: teks("kode_kelompok", 3),
    kode_resiko: teks("kode_resiko", 3),
    kode_emergency: teks("kode_emergency", 3),
    departemen: teks("departemen", 4),
    bidang: teks("bidang", 15),
    stts_wp: teks("stts_wp", 5),
    stts_kerja: teks("stts_kerja", 3),
    npwp: teks("npwp", 15, false),
    pendidikan: teks("pendidikan", 80),
    gapok: angka("gapok", 0),
    tmp_lahir: teks("tmp_lahir", 20, false),
    tgl_lahir: tglLahir,
    alamat: teks("alamat", 60, false),
    kota: teks("kota", 20, false),
    mulai_kerja: mulaiKerja,
    ms_kerja: pilihan("ms_kerja", MASA_KERJA),
    indexins: teks("indexins", 4),
    bpd: teks("bpd", 50),
    rekening: teks("rekening", 25, false),
    stts_aktif: pilihan("stts_aktif", STATUS_PEGAWAI),
    wajibmasuk: bilanganBulat("wajibmasuk", -128, 127),
    mulai_kontrak: tanggal("mulai_kontrak", false),
    no_ktp: teks("no_ktp", 20, false),
  };
}

export async function savePegawai(
  connection: DbConnection,
  id: number,
  input: PegawaiInput,
  editing: boolean,
): Promise<ResultSetHeader> {
  const values: (string | number | null)[] = [
    input.nik,
    input.nama,
    input.jk,
    input.jbtn,
    input.jnj_jabatan,
    input.kode_kelompok,
    input.kode_resiko,
    input.kode_emergency,
    input.departemen,
    input.bidang,
    input.stts_wp,
    input.stts_kerja,
    input.npwp,
    input.pendidikan,
    input.gapok,
    input.tmp_lahir,
    input.tgl_lahir,
    input.alamat,
    input.kota,
    input.mulai_kerja,
    input.ms_kerja,
    input.indexins,
    input.bpd,
    input.rekening,
    input.stts_aktif,
    input.wajibmasuk,
    0,
    0,
    input.mulai_kontrak,
    0,
    0,
    input.no_ktp,
  ];
  if (editing) {
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE pegawai SET
        nik = ?, nama = ?, jk = ?, jbtn = ?, jnj_jabatan = ?, kode_kelompok = ?,
        kode_resiko = ?, kode_emergency = ?, departemen = ?, bidang = ?, stts_wp = ?,
        stts_kerja = ?, npwp = ?, pendidikan = ?, gapok = ?, tmp_lahir = ?, tgl_lahir = ?,
        alamat = ?, kota = ?, mulai_kerja = ?, ms_kerja = ?, indexins = ?, bpd = ?,
        rekening = ?, stts_aktif = ?, wajibmasuk = ?, pengurang = ?, indek = ?,
        mulai_kontrak = ?, cuti_diambil = ?, dankes = ?, no_ktp = ?
       WHERE id = ?`,
      [...values, id],
    );
    return result;
  }
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO pegawai (
      nik, nama, jk, jbtn, jnj_jabatan, kode_kelompok, kode_resiko, kode_emergency,
      departemen, bidang, stts_wp, stts_kerja, npwp, pendidikan, gapok, tmp_lahir,
      tgl_lahir, alamat, kota, mulai_kerja, ms_kerja, indexins, bpd, rekening,
      stts_aktif, wajibmasuk, pengurang, indek, mulai_kontrak, cuti_diambil, dankes, no_ktp
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    values,
  );
  return result;
}

export async function updateStatusPegawai(connection: DbConnection, id: number, status: StatusPegawai) {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE pegawai SET stts_aktif = ? WHERE id = ?",
    [status, id],
  );
  return result.affectedRows;
}

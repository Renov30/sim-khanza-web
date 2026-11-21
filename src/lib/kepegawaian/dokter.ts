import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import {
  AGAMA,
  GOLONGAN_DARAH,
  JK_MASTER,
  KepegawaianError,
  STATUS_MASTER,
  STATUS_NIKAH,
  adalahDuplikat,
  bacaEnum,
  bacaTeks,
  bacaTanggal,
  pastikanPegawaiPokok,
  perbaruiPegawaiPokok,
  seedMasterPegawai,
  ubahStatusPegawaiPokok,
} from "@/lib/kepegawaian/master";

type DbConnection = Pick<PoolConnection, "execute">;

export interface DokterInput {
  kd_dokter: string;
  nm_dokter: string;
  jk: string;
  gol_drh: string | null;
  tmp_lahir: string;
  tgl_lahir: string | null;
  agama: string | null;
  almt_tgl: string;
  no_telp: string;
  email: string;
  stts_nikah: string | null;
  kd_sps: string;
  alumni: string;
  no_ijn_praktek: string;
}

export interface FilterDokter {
  cari: string;
  jk: string;
  gol_drh: string;
  stts_nikah: string;
  status: string;
}

function potong(searchParams: URLSearchParams, kunci: string, maks: number) {
  return (searchParams.get(kunci) || "").trim().slice(0, maks);
}

export function bacaFilterDokter(searchParams: URLSearchParams): FilterDokter {
  const statusMentah = (searchParams.get("status") || "1").trim();
  return {
    cari: potong(searchParams, "cari", 100),
    jk: JK_MASTER.find((item) => item === potong(searchParams, "jk", 2)) || "",
    gol_drh: GOLONGAN_DARAH.find((item) => item === potong(searchParams, "gol_drh", 3).toUpperCase()) || "",
    stts_nikah: STATUS_NIKAH.find((item) => item === potong(searchParams, "stts_nikah", 20)) || "",
    status: STATUS_MASTER.find((item) => item === statusMentah)
      ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "1"),
  };
}

export function kondisiFilterDokter(filter: FilterDokter) {
  const clauses = ["1=1"];
  const params: string[] = [];
  if (filter.cari) {
    clauses.push("(d.kd_dokter LIKE ? OR d.nm_dokter LIKE ? OR d.tmp_lahir LIKE ? OR DATE_FORMAT(d.tgl_lahir, '%Y-%m-%d') LIKE ? OR d.agama LIKE ? OR d.almt_tgl LIKE ? OR d.no_telp LIKE ? OR d.stts_nikah LIKE ? OR s.nm_sps LIKE ? OR d.alumni LIKE ? OR d.no_ijn_praktek LIKE ?)");
    params.push(...Array(11).fill(`%${filter.cari}%`));
  }
  if (filter.jk) {
    clauses.push("d.jk = ?");
    params.push(filter.jk);
  }
  if (filter.gol_drh) {
    clauses.push("d.gol_drh = ?");
    params.push(filter.gol_drh);
  }
  if (filter.stts_nikah) {
    clauses.push("d.stts_nikah = ?");
    params.push(filter.stts_nikah);
  }
  if (filter.status !== "semua") {
    clauses.push("d.status = ?");
    params.push(filter.status);
  }
  return { sql: clauses.join(" AND "), params };
}

export function bacaKodeDokter(nilai: unknown, wajib = true) {
  const kode = typeof nilai === "string" ? nilai.trim() : "";
  if (!kode) {
    if (wajib) throw new KepegawaianError("Kode dokter wajib diisi.");
    return "";
  }
  if (kode.length > 20 || !/^[\w.\-]+$/.test(kode)) {
    throw new KepegawaianError("Kode dokter tidak valid.");
  }
  return kode;
}

export function dokterInput(body: unknown, punyaKode = false): DokterInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new KepegawaianError("Data dokter tidak valid.");
  }
  const value = body as Record<string, unknown>;
  return {
    kd_dokter: bacaKodeDokter(value.kd_dokter, punyaKode),
    nm_dokter: bacaTeks(value, "nm_dokter", 50),
    jk: bacaEnum(value, "jk", JK_MASTER) || "L",
    gol_drh: bacaEnum(value, "gol_drh", GOLONGAN_DARAH, false),
    tmp_lahir: bacaTeks(value, "tmp_lahir", 20, false),
    tgl_lahir: bacaTanggal(value, "tgl_lahir"),
    agama: bacaEnum(value, "agama", AGAMA, false),
    almt_tgl: bacaTeks(value, "almt_tgl", 60, false),
    no_telp: bacaTeks(value, "no_telp", 13, false),
    email: bacaTeks(value, "email", 70),
    stts_nikah: bacaEnum(value, "stts_nikah", STATUS_NIKAH, false),
    kd_sps: bacaTeks(value, "kd_sps", 5),
    alumni: bacaTeks(value, "alumni", 60, false),
    no_ijn_praktek: bacaTeks(value, "no_ijn_praktek", 120, false),
  };
}

export async function nextKodeDokter(connection: DbConnection) {
  const [rows] = await connection.execute<(RowDataPacket & { terakhir: number })[]>(
    "SELECT IFNULL(MAX(CAST(RIGHT(kd_dokter, 7) AS UNSIGNED)), 0) AS terakhir FROM dokter",
  );
  const terakhir = Number(rows[0]?.terakhir ?? 0);
  if (!Number.isFinite(terakhir) || terakhir >= 9999999) {
    throw new KepegawaianError("Urutan kode dokter sudah mencapai batas.", 409);
  }
  return `D${String(terakhir + 1).padStart(7, "0")}`;
}

export async function simpanDokter(
  connection: DbConnection,
  input: DokterInput,
  editing: boolean,
  kdLama?: string,
) {
  await seedMasterPegawai(connection);
  const pokok = {
    nik: input.kd_dokter,
    nama: input.nm_dokter,
    jk: input.jk,
    tmp_lahir: input.tmp_lahir,
    tgl_lahir: input.tgl_lahir,
    alamat: input.almt_tgl,
  };
  const nilai: (string | null)[] = [
    input.kd_dokter,
    input.nm_dokter,
    input.jk,
    input.tmp_lahir || null,
    input.tgl_lahir,
    input.gol_drh,
    input.agama,
    input.almt_tgl || null,
    input.no_telp || null,
    input.email,
    input.stts_nikah,
    input.kd_sps,
    input.alumni || null,
    input.no_ijn_praktek || null,
  ];
  try {
    if (editing) {
      if (!kdLama) throw new KepegawaianError("Kode dokter lama tidak ditemukan.");
      await perbaruiPegawaiPokok(connection, kdLama, pokok);
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE dokter SET
          kd_dokter = ?, nm_dokter = ?, jk = ?, tmp_lahir = ?, tgl_lahir = ?, gol_drh = ?,
          agama = ?, almt_tgl = ?, no_telp = ?, email = ?, stts_nikah = ?, kd_sps = ?,
          alumni = ?, no_ijn_praktek = ?
         WHERE kd_dokter = ?`,
        [...nilai, kdLama],
      );
      return result.affectedRows;
    }
    await pastikanPegawaiPokok(connection, pokok);
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO dokter (
        kd_dokter, nm_dokter, jk, tmp_lahir, tgl_lahir, gol_drh, agama, almt_tgl,
        no_telp, email, stts_nikah, kd_sps, alumni, no_ijn_praktek, status
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,'1')`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    if (adalahDuplikat(error)) {
      throw new KepegawaianError("Kode dokter sudah digunakan. Gunakan kode lain.", 409);
    }
    throw error;
  }
}

export async function ubahStatusDokter(connection: DbConnection, kdDokter: string, status: "0" | "1") {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE dokter SET status = ? WHERE kd_dokter = ?",
    [status, kdDokter],
  );
  if (result.affectedRows) {
    await ubahStatusPegawaiPokok(connection, kdDokter, status === "1" ? "AKTIF" : "KELUAR");
  }
  return result.affectedRows;
}

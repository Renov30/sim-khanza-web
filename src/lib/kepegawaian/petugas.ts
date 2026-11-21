import type { ResultSetHeader } from "mysql2/promise";
import type { PoolConnection } from "mysql2/promise";
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

export interface PetugasInput {
  nip: string;
  nama: string;
  jk: string;
  gol_darah: string | null;
  agama: string | null;
  stts_nikah: string | null;
  tmp_lahir: string;
  tgl_lahir: string | null;
  alamat: string;
  kd_jbtn: string;
  no_telp: string;
  email: string;
}

export interface FilterPetugas {
  cari: string;
  jk: string;
  gol_darah: string;
  stts_nikah: string;
  status: string;
}

function potong(searchParams: URLSearchParams, kunci: string, maks: number) {
  return (searchParams.get(kunci) || "").trim().slice(0, maks);
}

function statusValid(nilai: string) {
  return STATUS_MASTER.find((item) => item === nilai);
}

export function bacaFilterPetugas(searchParams: URLSearchParams): FilterPetugas {
  const statusMentah = (searchParams.get("status") || "1").trim();
  return {
    cari: potong(searchParams, "cari", 100),
    jk: JK_MASTER.find((item) => item === potong(searchParams, "jk", 2)) || "",
    gol_darah: GOLONGAN_DARAH.find((item) => item === potong(searchParams, "gol_darah", 3).toUpperCase()) || "",
    stts_nikah: STATUS_NIKAH.find((item) => item === potong(searchParams, "stts_nikah", 20)) || "",
    status: statusValid(statusMentah) ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "1"),
  };
}

export function kondisiFilterPetugas(filter: FilterPetugas) {
  const clauses = ["1=1"];
  const params: string[] = [];
  if (filter.cari) {
    clauses.push("(p.nip LIKE ? OR p.nama LIKE ? OR p.tmp_lahir LIKE ? OR DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') LIKE ? OR p.gol_darah LIKE ? OR p.agama LIKE ? OR p.alamat LIKE ? OR j.nm_jbtn LIKE ?)");
    const kata = `%${filter.cari}%`;
    params.push(...Array(8).fill(kata));
  }
  if (filter.jk) {
    clauses.push("p.jk = ?");
    params.push(filter.jk);
  }
  if (filter.gol_darah) {
    clauses.push("p.gol_darah = ?");
    params.push(filter.gol_darah);
  }
  if (filter.stts_nikah) {
    clauses.push("p.stts_nikah = ?");
    params.push(filter.stts_nikah);
  }
  if (filter.status !== "semua") {
    clauses.push("p.status = ?");
    params.push(filter.status);
  }
  return { sql: clauses.join(" AND "), params };
}

export function bacaNipPetugas(nilai: unknown) {
  const nip = typeof nilai === "string" ? nilai.trim() : "";
  if (!nip || nip.length > 20 || !/^[\w.\-]+$/.test(nip)) {
    throw new KepegawaianError("NIP petugas tidak valid.");
  }
  return nip;
}

export function petugasInput(body: unknown): PetugasInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new KepegawaianError("Data petugas tidak valid.");
  }
  const value = body as Record<string, unknown>;
  return {
    nip: bacaNipPetugas(value.nip),
    nama: bacaTeks(value, "nama", 50),
    jk: bacaEnum(value, "jk", JK_MASTER) || "L",
    gol_darah: bacaEnum(value, "gol_darah", GOLONGAN_DARAH, false),
    agama: bacaEnum(value, "agama", AGAMA, false),
    stts_nikah: bacaEnum(value, "stts_nikah", STATUS_NIKAH, false),
    tmp_lahir: bacaTeks(value, "tmp_lahir", 20, false),
    tgl_lahir: bacaTanggal(value, "tgl_lahir"),
    alamat: bacaTeks(value, "alamat", 60, false),
    kd_jbtn: bacaTeks(value, "kd_jbtn", 4),
    no_telp: bacaTeks(value, "no_telp", 13, false),
    email: bacaTeks(value, "email", 70),
  };
}

export async function simpanPetugas(
  connection: DbConnection,
  input: PetugasInput,
  editing: boolean,
  nipLama?: string,
) {
  await seedMasterPegawai(connection);
  const pokok = {
    nik: input.nip,
    nama: input.nama,
    jk: input.jk,
    tmp_lahir: input.tmp_lahir,
    tgl_lahir: input.tgl_lahir,
    alamat: input.alamat,
  };
  const nilai: (string | null)[] = [
    input.nip,
    input.nama,
    input.jk,
    input.tmp_lahir || null,
    input.tgl_lahir,
    input.gol_darah,
    input.agama,
    input.stts_nikah,
    input.alamat || null,
    input.kd_jbtn,
    input.no_telp || null,
    input.email,
  ];
  try {
    if (editing) {
      if (!nipLama) throw new KepegawaianError("NIP petugas lama tidak ditemukan.");
      await perbaruiPegawaiPokok(connection, nipLama, pokok);
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE petugas SET
          nip = ?, nama = ?, jk = ?, tmp_lahir = ?, tgl_lahir = ?, gol_darah = ?, agama = ?,
          stts_nikah = ?, alamat = ?, kd_jbtn = ?, no_telp = ?, email = ?
         WHERE nip = ?`,
        [...nilai, nipLama],
      );
      return result.affectedRows;
    }
    await pastikanPegawaiPokok(connection, pokok);
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO petugas (
        nip, nama, jk, tmp_lahir, tgl_lahir, gol_darah, agama, stts_nikah,
        alamat, kd_jbtn, no_telp, email, status
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'1')`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    if (adalahDuplikat(error)) {
      throw new KepegawaianError("NIP petugas sudah digunakan. Gunakan NIP lain.", 409);
    }
    throw error;
  }
}

export async function ubahStatusPetugas(connection: DbConnection, nip: string, status: "0" | "1") {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE petugas SET status = ? WHERE nip = ?",
    [status, nip],
  );
  if (status === "1") await ubahStatusPegawaiPokok(connection, nip, "AKTIF");
  return result.affectedRows;
}

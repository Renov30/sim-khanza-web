import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DbConnection = Pick<PoolConnection, "execute">;

export const STATUS_POLIKLINIK = ["0", "1"] as const;

export class PoliklinikError extends Error {
  readonly status: number;

  constructor(pesan: string, status = 400) {
    super(pesan);
    this.name = "PoliklinikError";
    this.status = status;
  }
}

export interface PoliklinikInput {
  kd_poli: string;
  nm_poli: string;
  registrasi: number;
  registrasilama: number;
}

export interface FilterPoliklinik {
  cari: string;
  status: string;
}

function bacaTeks(body: Record<string, unknown>, kunci: string, maks: number, wajib = true) {
  const nilai = body[kunci];
  const teks = typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) {
    if (wajib) throw new PoliklinikError(`${kunci} wajib diisi.`);
    return "";
  }
  if (teks.length > maks) throw new PoliklinikError(`${kunci} tidak boleh lebih dari ${maks} karakter.`);
  return teks;
}

function bacaTarif(body: Record<string, unknown>, kunci: string) {
  const nilai = body[kunci];
  const teks = typeof nilai === "number" ? String(nilai) : typeof nilai === "string" ? nilai.trim() : "";
  if (!teks) return 0;
  if (teks.length > 13 || !/^\d+(?:\.\d{1,2})?$/.test(teks)) {
    throw new PoliklinikError(`${kunci} harus berupa angka maksimal 13 karakter.`);
  }
  const angka = Number(teks);
  if (!Number.isFinite(angka) || angka < 0 || angka > 9999999999999) {
    throw new PoliklinikError(`${kunci} tidak valid.`);
  }
  return angka;
}

function adalahDuplikat(error: unknown) {
  return error instanceof Error && error.message.includes("Duplicate entry");
}

export function bacaFilterPoliklinik(searchParams: URLSearchParams): FilterPoliklinik {
  const statusMentah = (searchParams.get("status") || "1").trim();
  return {
    cari: (searchParams.get("cari") || "").trim().slice(0, 100),
    status: STATUS_POLIKLINIK.find((item) => item === statusMentah)
      ?? (statusMentah.toLowerCase() === "semua" ? "semua" : "1"),
  };
}

export function kondisiFilterPoliklinik(filter: FilterPoliklinik) {
  const syarat = ["1=1"];
  const params: string[] = [];
  if (filter.cari) {
    syarat.push("(kd_poli LIKE ? OR nm_poli LIKE ?)");
    params.push(`%${filter.cari}%`, `%${filter.cari}%`);
  }
  if (filter.status !== "semua") {
    syarat.push("status = ?");
    params.push(filter.status);
  }
  return { sql: syarat.join(" AND "), params };
}

export function bacaKodePoliklinik(nilai: unknown, wajib = true) {
  const kode = typeof nilai === "string" ? nilai.trim() : "";
  if (!kode) {
    if (wajib) throw new PoliklinikError("Kode unit wajib diisi.");
    return "";
  }
  if (kode.length > 5 || !/^[\w.\-]+$/.test(kode)) {
    throw new PoliklinikError("Kode unit tidak valid.");
  }
  return kode;
}

export function poliklinikInput(body: unknown, punyaKode = false): PoliklinikInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PoliklinikError("Data poliklinik tidak valid.");
  }
  const nilai = body as Record<string, unknown>;
  return {
    kd_poli: bacaKodePoliklinik(nilai.kd_poli, punyaKode),
    nm_poli: bacaTeks(nilai, "nm_poli", 50),
    registrasi: bacaTarif(nilai, "registrasi"),
    registrasilama: bacaTarif(nilai, "registrasilama"),
  };
}

export async function nextKodePoliklinik(connection: DbConnection) {
  const [rows] = await connection.execute<(RowDataPacket & { terakhir: number })[]>(
    "SELECT IFNULL(MAX(CAST(RIGHT(kd_poli, 4) AS UNSIGNED)), 0) AS terakhir FROM poliklinik WHERE kd_poli REGEXP ?",
    ["^U[0-9]{4}$"],
  );
  const terakhir = Number(rows[0]?.terakhir ?? 0);
  if (!Number.isFinite(terakhir) || terakhir >= 9999) {
    throw new PoliklinikError("Urutan kode unit sudah mencapai batas.", 409);
  }
  return `U${String(terakhir + 1).padStart(4, "0")}`;
}

export async function simpanPoliklinik(
  connection: DbConnection,
  input: PoliklinikInput,
  editing: boolean,
  kdLama?: string,
) {
  const nilai = [input.kd_poli, input.nm_poli, input.registrasi, input.registrasilama];
  try {
    if (editing) {
      if (!kdLama) throw new PoliklinikError("Kode unit lama tidak ditemukan.");
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE poliklinik SET
          kd_poli = ?, nm_poli = ?, registrasi = ?, registrasilama = ?
         WHERE kd_poli = ?`,
        [...nilai, kdLama],
      );
      return result.affectedRows;
    }
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO poliklinik (kd_poli, nm_poli, registrasi, registrasilama, status)
       VALUES (?,?,?,?,'1')`,
      nilai,
    );
    return result.affectedRows;
  } catch (error) {
    if (adalahDuplikat(error)) {
      throw new PoliklinikError("Kode unit sudah digunakan. Gunakan kode lain.", 409);
    }
    throw error;
  }
}

export async function ubahStatusPoliklinik(
  connection: DbConnection,
  kdPoli: string,
  status: "0" | "1",
) {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE poliklinik SET status = ? WHERE kd_poli = ?",
    [status, kdPoli],
  );
  return result.affectedRows;
}

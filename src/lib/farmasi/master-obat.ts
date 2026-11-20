import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DbConnection = Pick<PoolConnection, "execute">;

export class MasterObatError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export interface MasterObatInput {
  kode_brng: string;
  nama_brng: string;
  kode_satbesar: string;
  kode_sat: string;
  letak_barang: string;
  dasar: number;
  h_beli: number;
  ralan: number;
  kelas1: number;
  kelas2: number;
  kelas3: number;
  utama: number;
  vip: number;
  vvip: number;
  beliluar: number;
  jualbebas: number;
  karyawan: number;
  stokminimal: number;
  kdjns: string;
  isi: number;
  kapasitas: number;
  expire: string;
  kode_industri: string;
  kode_kategori: string;
  kode_golongan: string;
}

export interface AturanHarga {
  ralan: number;
  kelas1: number;
  kelas2: number;
  kelas3: number;
  utama: number;
  vip: number;
  vvip: number;
  beliluar: number;
  jualbebas: number;
  karyawan: number;
}

export interface HargaSetting {
  mode: "Umum" | "Per Jenis" | "Per Barang";
  umum: AturanHarga | null;
  jenis: (AturanHarga & { kdjns: string })[];
  barang: (AturanHarga & { kode_brng: string })[];
  pembulatan: number;
}

export function masterObatInput(body: unknown): MasterObatInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new MasterObatError("Data barang tidak valid.");
  }
  const value = body as Record<string, unknown>;
  const string = (key: string, max: number, required = true) => {
    const field = value[key] ?? "";
    if (typeof field !== "string" || field.trim().length > max || (required && !field.trim())) {
      throw new MasterObatError(`Isian ${key} tidak valid.`);
    }
    return field.trim();
  };
  const number = (key: string, minimum = 0) => {
    const field = value[key];
    const parsed = typeof field === "number" ? field : typeof field === "string" && field.trim() ? Number(field) : Number.NaN;
    if (!Number.isFinite(parsed) || parsed < minimum) {
      throw new MasterObatError(`Isian ${key} harus berupa angka.`);
    }
    return parsed;
  };
  const expire = string("expire", 10, false) || "0000-00-00";
  if (expire !== "0000-00-00") {
    const tanggal = /^\d{4}-\d{2}-\d{2}$/.test(expire) ? new Date(`${expire}T00:00:00Z`) : null;
    if (!tanggal || Number.isNaN(tanggal.getTime()) || tanggal.toISOString().slice(0, 10) !== expire) {
      throw new MasterObatError("Tanggal kadaluwarsa tidak valid.");
    }
  }
  const kapasitas = number("kapasitas", 0.000001);
  const isi = number("isi", 0.000001);
  return {
    kode_brng: string("kode_brng", 15),
    nama_brng: string("nama_brng", 80),
    kode_satbesar: string("kode_satbesar", 4),
    kode_sat: string("kode_sat", 4),
    letak_barang: string("letak_barang", 100),
    dasar: number("dasar"),
    h_beli: number("h_beli"),
    ralan: number("ralan"),
    kelas1: number("kelas1"),
    kelas2: number("kelas2"),
    kelas3: number("kelas3"),
    utama: number("utama"),
    vip: number("vip"),
    vvip: number("vvip"),
    beliluar: number("beliluar"),
    jualbebas: number("jualbebas"),
    karyawan: number("karyawan"),
    stokminimal: number("stokminimal"),
    kdjns: string("kdjns", 4),
    isi,
    kapasitas,
    expire,
    kode_industri: string("kode_industri", 5),
    kode_kategori: string("kode_kategori", 4),
    kode_golongan: string("kode_golongan", 4),
  };
}

export async function nextMasterObatCode(connection: DbConnection) {
  const [rows] = await connection.execute<(RowDataPacket & { terakhir: number })[]>(
    "SELECT IFNULL(MAX(CONVERT(RIGHT(kode_brng, 4), SIGNED)), 0) AS terakhir FROM databarang",
  );
  const terakhir = Number(rows[0]?.terakhir ?? 0);
  if (!Number.isFinite(terakhir) || terakhir >= 9999) {
    throw new MasterObatError("Urutan kode barang sudah mencapai batas.", 409);
  }
  return `B${String(terakhir + 1).padStart(9, "0")}`;
}

export async function saveMasterObat(connection: DbConnection, input: MasterObatInput, editing: boolean) {
  const expire = input.expire === "0000-00-00" ? null : input.expire;
  const fields = [
    input.nama_brng, input.kode_satbesar, input.kode_sat, input.letak_barang,
    input.dasar, input.h_beli, input.ralan, input.kelas1, input.kelas2, input.kelas3,
    input.utama, input.vip, input.vvip, input.beliluar, input.jualbebas, input.karyawan,
    input.stokminimal, input.kdjns, input.isi, input.kapasitas, expire,
    input.kode_industri, input.kode_kategori, input.kode_golongan,
  ];
  let sql: string;
  let values: (string | number | null)[];
  if (editing) {
    sql = `UPDATE databarang SET
      nama_brng = ?, kode_satbesar = ?, kode_sat = ?, letak_barang = ?, dasar = ?, h_beli = ?,
      ralan = ?, kelas1 = ?, kelas2 = ?, kelas3 = ?, utama = ?, vip = ?, vvip = ?,
      beliluar = ?, jualbebas = ?, karyawan = ?, stokminimal = ?, kdjns = ?, isi = ?,
      kapasitas = ?, expire = ?, kode_industri = ?, kode_kategori = ?, kode_golongan = ?
      WHERE kode_brng = ?`;
    values = [...fields, input.kode_brng];
  } else {
    sql = `INSERT INTO databarang (
      kode_brng, nama_brng, kode_satbesar, kode_sat, letak_barang, dasar, h_beli, ralan,
      kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan, stokminimal,
      kdjns, isi, kapasitas, expire, status, kode_industri, kode_kategori, kode_golongan
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    values = [input.kode_brng, ...fields.slice(0, 21), "1", ...fields.slice(21)];
  }
  const [result] = await connection.execute<ResultSetHeader>(sql, values);
  return result.affectedRows;
}

export async function updateMasterObatStatus(connection: DbConnection, kode_brng: string, status: "0" | "1") {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE databarang SET status = ? WHERE kode_brng = ?",
    [status, kode_brng],
  );
  return result.affectedRows;
}

export async function loadHargaSetting(connection: DbConnection): Promise<HargaSetting> {
  const [modeRows] = await connection.execute<(RowDataPacket & { setharga: HargaSetting["mode"] })[]>(
    "SELECT setharga FROM set_harga_obat LIMIT 1",
  );
  const [umumRows] = await connection.execute<(RowDataPacket & AturanHarga)[]>(
    "SELECT ralan, kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan FROM setpenjualanumum LIMIT 1",
  );
  const [jenisRows] = await connection.execute<(RowDataPacket & AturanHarga & { kdjns: string })[]>(
    "SELECT kdjns, ralan, kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan FROM setpenjualan ORDER BY kdjns",
  );
  const [barangRows] = await connection.execute<(RowDataPacket & AturanHarga & { kode_brng: string })[]>(
    "SELECT kode_brng, ralan, kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan FROM setpenjualanperbarang ORDER BY kode_brng",
  );
  return {
    mode: modeRows[0]?.setharga ?? "Umum",
    umum: umumRows[0] ? { ...umumRows[0] } : null,
    jenis: jenisRows.map((row) => ({ ...row })),
    barang: barangRows.map((row) => ({ ...row })),
    pembulatan: 100,
  };
}

import { NextResponse } from "next/server";
import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { biayaInap } from "@/lib/rawat-inap/hitung";
import type { KonfigurasiInap, OpsiPindah } from "@/lib/rawat-inap/types";

export { biayaInap };
export {
  AMBULANCE,
  KATEGORI_RUJUK,
  STATUS_PULANG,
  TEMPAT_MENINGGAL,
} from "@/lib/rawat-inap/constants";

export class MutasiError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

export interface DataInapTerkunci extends RowDataPacket {
  no_rawat: string;
  kd_kamar: string;
  trf_kamar: number | string | null;
  diagnosa_awal: string | null;
  diagnosa_akhir: string | null;
  tgl_masuk: string;
  jam_masuk: string;
  tgl_keluar: string | null;
  jam_keluar: string | null;
  lama: number | string | null;
  ttl_biaya: number | string | null;
  stts_pulang: string;
  kd_pj: string;
  no_rkm_medis: string;
  nm_pasien: string;
  nm_dokter: string | null;
}

export function obyekBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new MutasiError("Data yang dikirim tidak valid.");
  }
  return body as Record<string, unknown>;
}

export function teks(input: unknown, nama: string, maksimum: number, wajib = true) {
  const nilai = typeof input === "string" ? input.trim() : "";
  if (!nilai && wajib) throw new MutasiError(`${nama} wajib diisi.`);
  if (nilai.length > maksimum) throw new MutasiError(`${nama} terlalu panjang.`);
  return nilai;
}

export function tanggalValid(nilai: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nilai)) return false;
  const tanggal = new Date(`${nilai}T00:00:00Z`);
  return !Number.isNaN(tanggal.getTime()) && tanggal.toISOString().slice(0, 10) === nilai;
}

export function tanggal(input: unknown, nama: string) {
  const nilai = teks(input, nama, 10);
  if (!tanggalValid(nilai)) throw new MutasiError(`${nama} tidak valid.`);
  return nilai;
}

export function jam(input: unknown, nama: string) {
  const nilai = teks(input, nama, 8);
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(nilai)) throw new MutasiError(`${nama} tidak valid.`);
  const [jamValue, menit, detik = "00"] = nilai.split(":");
  if (Number(jamValue) > 23 || Number(menit) > 59 || Number(detik) > 59) {
    throw new MutasiError(`${nama} tidak valid.`);
  }
  return `${jamValue}:${menit}:${detik}`;
}

export function angka(
  input: unknown,
  nama: string,
  nilaiAwal: number | null = null,
  minimum = 0,
  maksimum = 1000000000,
) {
  if ((input === undefined || input === null || input === "") && nilaiAwal !== null) return nilaiAwal;
  const nilai = typeof input === "number" || typeof input === "string" ? Number(input) : Number.NaN;
  if (!Number.isFinite(nilai) || nilai < minimum || nilai > maksimum) {
    throw new MutasiError(`${nama} tidak valid.`);
  }
  return nilai;
}

export function pilihan<T extends readonly string[]>(input: unknown, nama: string, daftar: T): T[number] {
  const nilai = typeof input === "string" ? input.trim() : "";
  if (!daftar.includes(nilai as T[number])) throw new MutasiError(`${nama} tidak dikenal.`);
  return nilai as T[number];
}

export async function konfigurasiInap(connection: PoolConnection): Promise<KonfigurasiInap> {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT lamajam, hariawal, diagnosaakhir FROM set_jam_minimal LIMIT 1",
  );
  const baris = rows[0];
  if (!baris) return { lamajam: 12, hariawal: "No", diagnosaakhir: "No" };
  return {
    lamajam: angka(baris.lamajam, "Batas jam minimal", 12, 1, 744),
    hariawal: baris.hariawal === "Yes" ? "Yes" : "No",
    diagnosaakhir: baris.diagnosaakhir === "Yes" ? "Yes" : "No",
  };
}

export async function dataInapTerkunci(
  connection: PoolConnection,
  noRawat: string,
  kdKamar: string,
  tglMasuk: string,
  jamMasuk: string,
): Promise<DataInapTerkunci> {
  const [rows] = await connection.execute<DataInapTerkunci[]>(`
    SELECT ki.no_rawat, ki.kd_kamar, ki.trf_kamar, ki.diagnosa_awal, ki.diagnosa_akhir,
           DATE_FORMAT(ki.tgl_masuk, '%Y-%m-%d') AS tgl_masuk, ki.jam_masuk,
           DATE_FORMAT(ki.tgl_keluar, '%Y-%m-%d') AS tgl_keluar, ki.jam_keluar,
           ki.lama, ki.ttl_biaya, ki.stts_pulang, r.kd_pj, r.no_rkm_medis,
           p.nm_pasien, d.nm_dokter
    FROM kamar_inap ki
    INNER JOIN reg_periksa r ON r.no_rawat = ki.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    LEFT JOIN dokter d ON d.kd_dokter = r.kd_dokter
    WHERE ki.no_rawat = ? AND ki.kd_kamar = ? AND ki.tgl_masuk = ? AND ki.jam_masuk = ?
    FOR UPDATE
  `, [noRawat, kdKamar, tglMasuk, jamMasuk]);
  const baris = rows[0];
  if (!baris) throw new MutasiError("Data kamar inap terpilih tidak ditemukan.", 404);
  return baris;
}

export async function kunciKamar(connection: PoolConnection, kdKamar: string, wajibKosong: boolean) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_kamar, status, trf_kamar FROM kamar WHERE kd_kamar = ? FOR UPDATE",
    [kdKamar],
  );
  const kamar = rows[0];
  if (!kamar) throw new MutasiError(`Kamar ${kdKamar} tidak ditemukan.`, 404);
  if (wajibKosong && String(kamar.status).trim() !== "KOSONG") {
    throw new MutasiError(`Kamar ${kdKamar} sudah terisi. Pilih kamar lain.`, 409);
  }
  return kamar;
}

export async function tarifKamar(connection: PoolConnection, kdKamar: string, kdPj: string) {
  const [rows] = await connection.execute<RowDataPacket[]>(`
    SELECT COALESCE((
      SELECT shk.tarif FROM set_harga_kamar shk
      WHERE shk.kd_kamar = ? AND shk.kd_pj = ? LIMIT 1
    ), k.trf_kamar) AS tarif
    FROM kamar k WHERE k.kd_kamar = ? LIMIT 1
  `, [kdKamar, kdPj, kdKamar]);
  return angka(rows[0]?.tarif, "Tarif kamar", 0, 0, 1000000000);
}

export async function hitungLama(
  connection: PoolConnection,
  tglMasuk: string,
  jamMasuk: string,
  tglAkhir: string,
  jamAkhir: string,
  config: KonfigurasiInap,
) {
  const [rows] = await connection.execute<RowDataPacket[]>(`
    SELECT COALESCE((
      IF(TO_DAYS(?) - TO_DAYS(?) = 0,
        IF(TIME_TO_SEC(?) - TIME_TO_SEC(?) > (3600 * ?), 1, 0),
        TO_DAYS(?) - TO_DAYS(?))
      + ?
    ), 0) AS lama
  `, [tglAkhir, tglMasuk, jamAkhir, jamMasuk, config.lamajam, tglAkhir, tglMasuk, config.hariawal === "Yes" ? 1 : 0]);
  return Math.round(angka(rows[0]?.lama, "Lama inap", 0, 0, 36500));
}

export async function jalankanUpdate(
  connection: PoolConnection,
  sql: string,
  params: (string | number)[],
  pesan: string,
) {
  const [hasil] = await connection.execute<ResultSetHeader>(sql, params);
  if (hasil.affectedRows !== 1) throw new MutasiError(pesan, 409);
}

export async function statusKamar(
  connection: PoolConnection,
  kdKamar: string,
  status: "ISI" | "KOSONG",
) {
  await jalankanUpdate(
    connection,
    "UPDATE kamar SET status = ? WHERE kd_kamar = ?",
    [status, kdKamar],
    `Status kamar ${kdKamar} gagal diperbarui.`,
  );
}

export async function tambahInapBaru(
  connection: PoolConnection,
  input: {
    noRawat: string;
    kdKamar: string;
    tarif: number;
    diagnosaAwal: string;
    diagnosaAkhir: string;
    tglMasuk: string;
    jamMasuk: string;
    lama: number;
    biaya: number;
  },
) {
  await connection.execute(`INSERT INTO kamar_inap
    (no_rawat, kd_kamar, trf_kamar, diagnosa_awal, diagnosa_akhir, tgl_masuk, jam_masuk,
     tgl_keluar, jam_keluar, lama, ttl_biaya, stts_pulang)
    VALUES (?, ?, ?, ?, ?, ?, ?, '0000-00-00', '00:00:00', ?, ?, '-')`, [
    input.noRawat,
    input.kdKamar,
    input.tarif,
    input.diagnosaAwal,
    input.diagnosaAkhir,
    input.tglMasuk,
    input.jamMasuk,
    input.lama,
    input.biaya,
  ]);
}

export function opsiPindah(input: unknown): OpsiPindah {
  const nilai = typeof input === "number" ? input : Number(input);
  if (nilai !== 1 && nilai !== 2 && nilai !== 3 && nilai !== 4) {
    throw new MutasiError("Pilihan pindah kamar tidak dikenal.");
  }
  return nilai;
}

export function tindakLanjutPulang(status: string) {
  if (status === "Meninggal") return "meninggal" as const;
  if (status === "Rujuk") return "rujuk" as const;
  return null;
}

export function responsGagalan(error: unknown, fallback: string) {
  if (error instanceof MutasiError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  }
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") {
    return NextResponse.json({ success: false, error: "Data kamar inap pada waktu tersebut sudah ada." }, { status: 409 });
  }
  if (code.startsWith("ER_NO_REFERENCED_ROW") || code === "ER_ROW_IS_REFERENCED_2") {
    return NextResponse.json({ success: false, error: "Data pasien, kamar, atau dokter tidak ditemukan." }, { status: 409 });
  }
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

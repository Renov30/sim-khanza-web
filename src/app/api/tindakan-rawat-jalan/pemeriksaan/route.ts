import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";

const KESADARAN = ["Compos Mentis", "Somnolence", "Sopor", "Coma", "Alert", "Confusion", "Voice", "Pain", "Unresponsive", "Apatis", "Delirium"] as const;
const PANJANG: Record<string, number> = {
  suhu_tubuh: 5, tensi: 8, nadi: 3, respirasi: 3, tinggi: 5, berat: 5,
  spo2: 3, gcs: 10, keluhan: 2000, pemeriksaan: 2000, alergi: 80,
  lingkar_perut: 5, rtl: 2000, penilaian: 2000, instruksi: 2000, evaluasi: 2000,
};
const KOLOM = Object.keys(PANJANG);

interface RegistrasiRow extends RowDataPacket {
  tgl_registrasi: string;
  jam_reg: string;
  status_bayar: string;
}

interface PemeriksaanInput {
  no_rawat: string;
  tgl_perawatan: string;
  jam_rawat: string;
  nip: string;
  kesadaran: typeof KESADARAN[number];
  nilai: Record<string, string>;
  asli_tanggal?: string;
  asli_jam?: string;
}

class PemeriksaanError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess();
    if (denied) return denied;
    const session = await getSession();
    if (!session) throw new PemeriksaanError("Silakan login kembali.", 401);
    if (req.nextUrl.searchParams.get("resource") === "pegawai") {
      const where = session.isAdmin ? "p.stts_aktif IN ('AKTIF', 'CUTI')" : "p.nik = ?";
      const params = session.isAdmin ? [] : [session.username];
      const rows = await executeQuery(`SELECT p.nik AS kode, p.nama, p.jbtn FROM pegawai p WHERE ${where} ORDER BY p.nama LIMIT 150`, params);
      return NextResponse.json({ success: true, data: rows }, { headers: { "Cache-Control": "private, max-age=300" } });
    }
    const noRawat = req.nextUrl.searchParams.get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 17) throw new PemeriksaanError("No. Rawat tidak valid.");
    const rows = await executeQuery(`
      SELECT pr.no_rawat, DATE_FORMAT(pr.tgl_perawatan, '%Y-%m-%d') AS tgl_perawatan,
             TIME_FORMAT(pr.jam_rawat, '%H:%i:%s') AS jam_rawat, pr.suhu_tubuh, pr.tensi,
             pr.nadi, pr.respirasi, pr.tinggi, pr.berat, pr.spo2, pr.gcs, pr.kesadaran,
             pr.keluhan, pr.pemeriksaan, pr.alergi, pr.lingkar_perut, pr.rtl,
             pr.penilaian, pr.instruksi, pr.evaluasi, pr.nip, p.nama, p.jbtn
      FROM pemeriksaan_ralan pr
      INNER JOIN pegawai p ON p.nik = pr.nip
      WHERE pr.no_rawat = ?
      ORDER BY pr.tgl_perawatan DESC, pr.jam_rawat DESC
      LIMIT 100
    `, [noRawat]);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) { return gagal(error, "Gagal memuat pemeriksaan rawat jalan."); }
}

export async function POST(req: NextRequest) { return simpan(req, false); }
export async function PUT(req: NextRequest) { return simpan(req, true); }

async function simpan(req: NextRequest, mengubah: boolean) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new PemeriksaanError("Silakan login kembali.", 401);
    const input = bacaInput(await req.json(), mengubah);
    if (!session.isAdmin && input.nip !== session.username) {
      throw new PemeriksaanError("Pemeriksaan hanya dapat disimpan oleh pegawai yang bersangkutan.", 403);
    }
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const registrasi = await kunciRegistrasi(connection, input.no_rawat);
    validasiWaktu(input, registrasi);
    await pastikanPegawai(connection, input.nip);
    if (mengubah) {
      await pastikanPemilik(connection, session.isAdmin, session.username, input.no_rawat, input.asli_tanggal!, input.asli_jam!);
      const values = nilaiKolom(input);
      const [hasil] = await connection.execute(`UPDATE pemeriksaan_ralan SET
        tgl_perawatan=?, jam_rawat=?, suhu_tubuh=?, tensi=?, nadi=?, respirasi=?, tinggi=?, berat=?,
        spo2=?, gcs=?, kesadaran=?, keluhan=?, pemeriksaan=?, alergi=?, lingkar_perut=?, rtl=?,
        penilaian=?, instruksi=?, evaluasi=?, nip=?
        WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=?`,
      [input.tgl_perawatan, input.jam_rawat, ...values, input.no_rawat, input.asli_tanggal!, input.asli_jam!]);
      if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new PemeriksaanError("Data pemeriksaan tidak ditemukan atau sudah berubah.", 409);
    } else {
      await connection.execute(`INSERT INTO pemeriksaan_ralan
        (no_rawat, tgl_perawatan, jam_rawat, suhu_tubuh, tensi, nadi, respirasi, tinggi, berat,
         spo2, gcs, kesadaran, keluhan, pemeriksaan, alergi, lingkar_perut, rtl, penilaian, instruksi, evaluasi, nip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [input.no_rawat, input.tgl_perawatan, input.jam_rawat, ...nilaiKolom(input)]);
    }
    await connection.commit();
    return NextResponse.json({ success: true, message: mengubah ? "Pemeriksaan berhasil diperbarui." : "Pemeriksaan berhasil disimpan." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Pemeriksaan rawat jalan gagal disimpan.");
  } finally { connection?.release(); }
}

export async function DELETE(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new PemeriksaanError("Silakan login kembali.", 401);
    const noRawat = req.nextUrl.searchParams.get("no_rawat")?.trim() || "";
    const tanggal = req.nextUrl.searchParams.get("tanggal") || "";
    const jam = req.nextUrl.searchParams.get("jam") || "";
    if (!noRawat || noRawat.length > 17 || !isRegistrationDate(tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(jam)) throw new PemeriksaanError("Identitas pemeriksaan tidak valid.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    await pastikanPemilik(connection, session.isAdmin, session.username, noRawat, tanggal, jam);
    const [hasil] = await connection.execute("DELETE FROM pemeriksaan_ralan WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=?", [noRawat, tanggal, jam]);
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new PemeriksaanError("Data pemeriksaan tidak ditemukan.", 404);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Pemeriksaan berhasil dihapus." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Pemeriksaan rawat jalan gagal dihapus.");
  } finally { connection?.release(); }
}

function bacaInput(body: unknown, mengubah: boolean): PemeriksaanInput {
  if (!body || typeof body !== "object") throw new PemeriksaanError("Data pemeriksaan tidak valid.");
  const data = body as Record<string, unknown>;
  const teks = (nama: string) => typeof data[nama] === "string" ? data[nama].trim() : "";
  const no_rawat = teks("no_rawat");
  const tgl_perawatan = teks("tgl_perawatan");
  const jam_rawat = teks("jam_rawat");
  const nip = teks("nip");
  const kesadaran = teks("kesadaran");
  if (!no_rawat || no_rawat.length > 17 || !isRegistrationDate(tgl_perawatan) || !/^\d{2}:\d{2}:\d{2}$/.test(jam_rawat) || !nip || nip.length > 20 || !KESADARAN.includes(kesadaran as typeof KESADARAN[number])) throw new PemeriksaanError("Kunjungan, waktu, pegawai, atau kesadaran tidak valid.");
  const nilai: Record<string, string> = {};
  for (const [nama, panjang] of Object.entries(PANJANG)) {
    nilai[nama] = teks(nama);
    if (nilai[nama].length > panjang) throw new PemeriksaanError(`${nama.replaceAll("_", " ")} terlalu panjang.`);
  }
  if (!KOLOM.some((nama) => nilai[nama])) throw new PemeriksaanError("Isi minimal satu hasil pemeriksaan.");
  const asli_tanggal = teks("asli_tanggal");
  const asli_jam = teks("asli_jam");
  if (mengubah && (!isRegistrationDate(asli_tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(asli_jam))) throw new PemeriksaanError("Identitas pemeriksaan awal tidak valid.");
  return { no_rawat, tgl_perawatan, jam_rawat, nip, kesadaran: kesadaran as typeof KESADARAN[number], nilai, asli_tanggal, asli_jam };
}

function nilaiKolom(input: PemeriksaanInput) {
  return [input.nilai.suhu_tubuh, input.nilai.tensi, input.nilai.nadi, input.nilai.respirasi,
    input.nilai.tinggi, input.nilai.berat, input.nilai.spo2, input.nilai.gcs, input.kesadaran,
    input.nilai.keluhan, input.nilai.pemeriksaan, input.nilai.alergi, input.nilai.lingkar_perut,
    input.nilai.rtl, input.nilai.penilaian, input.nilai.instruksi, input.nilai.evaluasi, input.nip];
}

async function kunciRegistrasi(connection: PoolConnection, noRawat: string) {
  const [rows] = await connection.execute<RegistrasiRow[]>(`SELECT DATE_FORMAT(tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, jam_reg, status_bayar FROM reg_periksa WHERE no_rawat=? AND status_lanjut='Ralan' FOR UPDATE`, [noRawat]);
  const row = rows[0];
  if (!row) throw new PemeriksaanError("Kunjungan rawat jalan tidak ditemukan.", 404);
  if (row.status_bayar === "Sudah Bayar") throw new PemeriksaanError("Billing sudah diverifikasi; pemeriksaan tidak dapat diubah.", 409);
  return row;
}

function validasiWaktu(input: PemeriksaanInput, registrasi: RegistrasiRow) {
  if (`${input.tgl_perawatan} ${input.jam_rawat}` < `${registrasi.tgl_registrasi} ${registrasi.jam_reg}`) throw new PemeriksaanError("Waktu pemeriksaan tidak boleh mendahului registrasi.");
}

async function pastikanPegawai(connection: PoolConnection, nip: string) {
  const [rows] = await connection.execute<RowDataPacket[]>("SELECT nik FROM pegawai WHERE nik=? AND stts_aktif IN ('AKTIF','CUTI') LIMIT 1", [nip]);
  if (!rows[0]) throw new PemeriksaanError("Pegawai tidak aktif atau tidak ditemukan.", 409);
}

async function pastikanPemilik(connection: PoolConnection, admin: boolean, username: string, noRawat: string, tanggal: string, jam: string) {
  const [rows] = await connection.execute<RowDataPacket[]>("SELECT nip, TIMESTAMPDIFF(HOUR, CONCAT(tgl_perawatan, ' ', jam_rawat), NOW()) AS umur_jam FROM pemeriksaan_ralan WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=? FOR UPDATE", [noRawat, tanggal, jam]);
  const row = rows[0];
  if (!row) throw new PemeriksaanError("Data pemeriksaan tidak ditemukan.", 404);
  if (!admin && row.nip !== username) throw new PemeriksaanError("Data hanya dapat diubah oleh pegawai yang mencatatnya.", 403);
  if (!admin && Number(row.umur_jam) > 48) throw new PemeriksaanError("Batas perubahan pemeriksaan 48 jam sudah terlewati.", 409);
}

function gagal(error: unknown, fallback: string) {
  if (error instanceof PemeriksaanError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") return NextResponse.json({ success: false, error: "Pemeriksaan pada waktu tersebut sudah tercatat." }, { status: 409 });
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

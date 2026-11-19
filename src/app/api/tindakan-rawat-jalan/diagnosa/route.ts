import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";

type JenisData = "diagnosa" | "prosedur";

interface RegistrasiRow extends RowDataPacket { status_bayar: string }
interface KodeRow extends RowDataPacket { kode: string; nama: string }

class DiagnosaError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess("diagnosa_pasien");
    if (denied) return denied;
    const resource = req.nextUrl.searchParams.get("resource") || "riwayat";
    const cari = (req.nextUrl.searchParams.get("cari") || "").trim().slice(0, 100);
    if (resource === "master-diagnosa" || resource === "master-prosedur") {
      const offset = offsetDari(req.nextUrl.searchParams.get("offset"));
      const seperti = `%${cari}%`;
      const rows = resource === "master-diagnosa"
        ? await executeQuery(`SELECT kd_penyakit AS kode, nm_penyakit AS nama FROM penyakit
            ${cari ? "WHERE kd_penyakit LIKE ? OR nm_penyakit LIKE ?" : ""}
            ORDER BY kd_penyakit LIMIT ? OFFSET ?`, [...(cari ? [`${cari}%`, seperti] : []), 21, offset])
        : await executeQuery(`SELECT kode, COALESCE(deskripsi_panjang, deskripsi_pendek, '') AS nama FROM icd9
            ${cari ? "WHERE kode LIKE ? OR deskripsi_panjang LIKE ? OR deskripsi_pendek LIKE ?" : ""}
            ORDER BY kode LIMIT ? OFFSET ?`, [...(cari ? [`${cari}%`, seperti, seperti] : []), 21, offset]);
      const hasMore = rows.length > 20;
      return NextResponse.json({
        success: true,
        data: rows.slice(0, 20),
        meta: { hasMore, offset, limit: 20 },
      });
    }
    if (resource !== "riwayat") throw new DiagnosaError("Sumber data diagnosa tidak valid.");
    const noRawat = nomorRawat(req.nextUrl.searchParams.get("no_rawat"));
    const tanggalMulai = req.nextUrl.searchParams.get("tanggal_mulai") || "";
    const tanggalSelesai = req.nextUrl.searchParams.get("tanggal_selesai") || "";
    validasiPeriode(tanggalMulai, tanggalSelesai);
    const whereTanggal = `${tanggalMulai ? " AND r.tgl_registrasi>=?" : ""}${tanggalSelesai ? " AND r.tgl_registrasi<=?" : ""}`;
    const paramsDasar = [noRawat, ...(tanggalMulai ? [tanggalMulai] : []), ...(tanggalSelesai ? [tanggalSelesai] : [])];
    const seperti = `%${cari}%`;
    const diagnosa = await executeQuery(`
      SELECT d.kd_penyakit AS kode, p.nm_penyakit AS nama, d.status_penyakit, d.prioritas
      FROM diagnosa_pasien d JOIN penyakit p ON p.kd_penyakit=d.kd_penyakit
      JOIN reg_periksa r ON r.no_rawat=d.no_rawat
      WHERE d.no_rawat=? AND d.status='Ralan'${whereTanggal}
        ${cari ? "AND (d.kd_penyakit LIKE ? OR p.nm_penyakit LIKE ?)" : ""}
      ORDER BY d.prioritas, d.kd_penyakit`, [...paramsDasar, ...(cari ? [seperti, seperti] : [])]);
    const prosedur = await executeQuery(`
      SELECT pp.kode, COALESCE(i.deskripsi_panjang, i.deskripsi_pendek, '') AS nama, pp.prioritas
      FROM prosedur_pasien pp JOIN icd9 i ON i.kode=pp.kode
      JOIN reg_periksa r ON r.no_rawat=pp.no_rawat
      WHERE pp.no_rawat=? AND pp.status='Ralan'${whereTanggal}
        ${cari ? "AND (pp.kode LIKE ? OR i.deskripsi_panjang LIKE ? OR i.deskripsi_pendek LIKE ?)" : ""}
      ORDER BY pp.prioritas, pp.kode`, [...paramsDasar, ...(cari ? [seperti, seperti, seperti] : [])]);
    return NextResponse.json({ success: true, data: { diagnosa, prosedur } });
  } catch (error) {
    return gagal(error, "Gagal memuat diagnosa dan prosedur pasien.");
  }
}

export async function POST(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess("diagnosa_pasien");
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body = objek(await req.json());
    const noRawat = nomorRawat(body.no_rawat);
    const diagnosa = daftarKode(body.diagnosa, 15);
    const prosedur = daftarKode(body.prosedur, 8);
    if (!diagnosa.length && !prosedur.length) throw new DiagnosaError("Pilih minimal satu diagnosa atau prosedur.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    await validasiMaster(connection, "diagnosa", diagnosa);
    await validasiMaster(connection, "prosedur", prosedur);
    const lama = await kodeDiagnosaLama(connection, noRawat, diagnosa);
    const prioritasDiagnosa = await prioritasBerikutnya(connection, "diagnosa_pasien", noRawat);
    for (const [index, kode] of diagnosa.entries()) {
      await connection.execute(
        "INSERT INTO diagnosa_pasien (no_rawat,kd_penyakit,status,prioritas,status_penyakit) VALUES (?,?,'Ralan',?,?)",
        [noRawat, kode, prioritasDiagnosa + index, lama.has(kode) ? "Lama" : "Baru"],
      );
    }
    const prioritasProsedur = await prioritasBerikutnya(connection, "prosedur_pasien", noRawat);
    for (const [index, kode] of prosedur.entries()) {
      await connection.execute(
        "INSERT INTO prosedur_pasien (no_rawat,kode,status,prioritas) VALUES (?,?,'Ralan',?)",
        [noRawat, kode, prioritasProsedur + index],
      );
    }
    await sinkronkanResume(connection, noRawat);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Diagnosa dan prosedur berhasil disimpan." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Diagnosa dan prosedur gagal disimpan.");
  } finally { connection?.release(); }
}

export async function PATCH(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess("diagnosa_pasien");
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body = objek(await req.json());
    const noRawat = nomorRawat(body.no_rawat);
    const kode = kodeTunggal(body.kode, 15);
    const statusPenyakit = body.status_penyakit;
    if (statusPenyakit !== "Baru" && statusPenyakit !== "Lama") throw new DiagnosaError("Status penyakit tidak valid.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    const [hasil] = await connection.execute(
      "UPDATE diagnosa_pasien SET status_penyakit=? WHERE no_rawat=? AND kd_penyakit=? AND status='Ralan'",
      [statusPenyakit, noRawat, kode],
    );
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new DiagnosaError("Diagnosa tidak ditemukan.", 404);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Status diagnosa berhasil diperbarui." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Status diagnosa gagal diperbarui.");
  } finally { connection?.release(); }
}

export async function DELETE(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess("diagnosa_pasien");
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const jenis = jenisData(req.nextUrl.searchParams.get("jenis"));
    const noRawat = nomorRawat(req.nextUrl.searchParams.get("no_rawat"));
    const kode = kodeTunggal(req.nextUrl.searchParams.get("kode"), jenis === "diagnosa" ? 15 : 8);
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    const tabel = jenis === "diagnosa" ? "diagnosa_pasien" : "prosedur_pasien";
    const kolom = jenis === "diagnosa" ? "kd_penyakit" : "kode";
    const [hasil] = await connection.execute(`DELETE FROM ${tabel} WHERE no_rawat=? AND ${kolom}=? AND status='Ralan'`, [noRawat, kode]);
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new DiagnosaError("Data tidak ditemukan.", 404);
    await sinkronkanResume(connection, noRawat);
    await connection.commit();
    return NextResponse.json({ success: true, message: `${jenis === "diagnosa" ? "Diagnosa" : "Prosedur"} berhasil dihapus.` });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Data diagnosa gagal dihapus.");
  } finally { connection?.release(); }
}

function objek(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new DiagnosaError("Data tidak valid.");
  return value as Record<string, unknown>;
}

function nomorRawat(value: unknown) {
  const hasil = typeof value === "string" ? value.trim() : "";
  if (!hasil || hasil.length > 17) throw new DiagnosaError("No. Rawat tidak valid.");
  return hasil;
}

function kodeTunggal(value: unknown, maksimum: number) {
  const hasil = typeof value === "string" ? value.trim() : "";
  if (!hasil || hasil.length > maksimum) throw new DiagnosaError("Kode tidak valid.");
  return hasil;
}

function daftarKode(value: unknown, maksimum: number) {
  if (!Array.isArray(value) || value.length > 20) throw new DiagnosaError("Daftar kode tidak valid.");
  return [...new Set(value.map((item) => kodeTunggal(item, maksimum)))];
}

function jenisData(value: unknown): JenisData {
  if (value === "diagnosa" || value === "prosedur") return value;
  throw new DiagnosaError("Jenis data tidak valid.");
}

function validasiPeriode(mulai: string, selesai: string) {
  if ((mulai && !isRegistrationDate(mulai)) || (selesai && !isRegistrationDate(selesai)) || (mulai && selesai && mulai > selesai)) {
    throw new DiagnosaError("Periode tidak valid.");
  }
}

function offsetDari(value: string | null) {
  if (!value) return 0;
  if (!/^\d+$/.test(value)) throw new DiagnosaError("Offset daftar diagnosa tidak valid.");
  return Math.min(Number(value), 100000);
}

async function kunciRegistrasi(connection: PoolConnection, noRawat: string) {
  const [rows] = await connection.execute<RegistrasiRow[]>(
    "SELECT status_bayar FROM reg_periksa WHERE no_rawat=? AND status_lanjut='Ralan' FOR UPDATE", [noRawat],
  );
  if (!rows[0]) throw new DiagnosaError("Kunjungan rawat jalan tidak ditemukan.", 404);
  if (rows[0].status_bayar === "Sudah Bayar") throw new DiagnosaError("Billing sudah diverifikasi; diagnosa tidak dapat diubah.", 409);
}

async function validasiMaster(connection: PoolConnection, jenis: JenisData, kode: string[]) {
  if (!kode.length) return;
  const tabel = jenis === "diagnosa" ? "penyakit" : "icd9";
  const kolom = jenis === "diagnosa" ? "kd_penyakit" : "kode";
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT ${kolom} FROM ${tabel} WHERE ${kolom} IN (${kode.map(() => "?").join(",")})`, kode,
  );
  if (rows.length !== kode.length) throw new DiagnosaError(`Kode ${jenis} tidak ditemukan.`);
}

async function kodeDiagnosaLama(connection: PoolConnection, noRawat: string, kode: string[]) {
  if (!kode.length) return new Set<string>();
  const [rows] = await connection.execute<RowDataPacket[]>(`
    SELECT DISTINCT d.kd_penyakit AS kode FROM diagnosa_pasien d
    JOIN reg_periksa r ON r.no_rawat=d.no_rawat
    WHERE r.no_rkm_medis=(SELECT no_rkm_medis FROM reg_periksa WHERE no_rawat=?)
      AND d.no_rawat<>? AND d.kd_penyakit IN (${kode.map(() => "?").join(",")})`, [noRawat, noRawat, ...kode]);
  return new Set(rows.map((row) => String(row.kode)));
}

async function prioritasBerikutnya(connection: PoolConnection, tabel: "diagnosa_pasien" | "prosedur_pasien", noRawat: string) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT COALESCE(MAX(prioritas),0)+1 AS berikutnya FROM ${tabel} WHERE no_rawat=? AND status='Ralan'`, [noRawat],
  );
  return Number(rows[0]?.berikutnya || 1);
}

async function sinkronkanResume(connection: PoolConnection, noRawat: string) {
  const [diagnosa] = await connection.execute<KodeRow[]>(`
    SELECT d.kd_penyakit AS kode, LEFT(p.nm_penyakit,80) AS nama FROM diagnosa_pasien d
    JOIN penyakit p ON p.kd_penyakit=d.kd_penyakit
    WHERE d.no_rawat=? AND d.status='Ralan' ORDER BY d.prioritas LIMIT 5`, [noRawat]);
  const [prosedur] = await connection.execute<KodeRow[]>(`
    SELECT pp.kode, LEFT(COALESCE(i.deskripsi_panjang,i.deskripsi_pendek,''),80) AS nama FROM prosedur_pasien pp
    JOIN icd9 i ON i.kode=pp.kode
    WHERE pp.no_rawat=? AND pp.status='Ralan' ORDER BY pp.prioritas LIMIT 4`, [noRawat]);
  const d = Array.from({ length: 5 }, (_, index) => diagnosa[index] || { kode: "", nama: "" });
  const p = Array.from({ length: 4 }, (_, index) => prosedur[index] || { kode: "", nama: "" });
  await connection.execute(`UPDATE resume_pasien SET
    diagnosa_utama=?,kd_diagnosa_utama=?,diagnosa_sekunder=?,kd_diagnosa_sekunder=?,
    diagnosa_sekunder2=?,kd_diagnosa_sekunder2=?,diagnosa_sekunder3=?,kd_diagnosa_sekunder3=?,
    diagnosa_sekunder4=?,kd_diagnosa_sekunder4=?,prosedur_utama=?,kd_prosedur_utama=?,
    prosedur_sekunder=?,kd_prosedur_sekunder=?,prosedur_sekunder2=?,kd_prosedur_sekunder2=?,
    prosedur_sekunder3=?,kd_prosedur_sekunder3=? WHERE no_rawat=?`,
  [d[0].nama,d[0].kode,d[1].nama,d[1].kode,d[2].nama,d[2].kode,d[3].nama,d[3].kode,d[4].nama,d[4].kode,
    p[0].nama,p[0].kode,p[1].nama,p[1].kode,p[2].nama,p[2].kode,p[3].nama,p[3].kode,noRawat]);
}

function gagal(error: unknown, fallback: string) {
  if (error instanceof DiagnosaError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") return NextResponse.json({ success: false, error: "Diagnosa atau prosedur tersebut sudah tercatat." }, { status: 409 });
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

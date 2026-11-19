import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";

interface RegistrasiRow extends RowDataPacket { tgl_registrasi: string; jam_reg: string; status_bayar: string }
interface CatatanInput {
  noRawat: string; tanggal: string; jam: string; dokter: string; catatan: string;
  tanggalAsli?: string; jamAsli?: string; dokterAsli?: string; catatanAsli?: string;
}

class CatatanError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess("catatan_perawatan");
    if (denied) return denied;
    if (req.nextUrl.searchParams.get("resource") === "dokter") {
      const data = await executeQuery("SELECT kd_dokter AS kode, nm_dokter AS nama FROM dokter WHERE status='1' ORDER BY nm_dokter");
      return NextResponse.json({ success: true, data });
    }
    const noRawat = nomorRawat(req.nextUrl.searchParams.get("no_rawat"));
    const mulai = req.nextUrl.searchParams.get("tanggal_mulai") || "";
    const selesai = req.nextUrl.searchParams.get("tanggal_selesai") || "";
    const cari = (req.nextUrl.searchParams.get("cari") || "").trim().slice(0, 100);
    if ((mulai && !isRegistrationDate(mulai)) || (selesai && !isRegistrationDate(selesai)) || (mulai && selesai && mulai > selesai)) {
      throw new CatatanError("Periode catatan tidak valid.");
    }
    const where = ["c.no_rawat=?"];
    const params: string[] = [noRawat];
    if (mulai) { where.push("c.tanggal>=?"); params.push(mulai); }
    if (selesai) { where.push("c.tanggal<=?"); params.push(selesai); }
    if (cari) {
      where.push("(c.kd_dokter LIKE ? OR d.nm_dokter LIKE ? OR c.catatan LIKE ?)");
      params.push(`%${cari}%`, `%${cari}%`, `%${cari}%`);
    }
    const data = await executeQuery(`SELECT DATE_FORMAT(c.tanggal,'%Y-%m-%d') AS tanggal,
      TIME_FORMAT(c.jam,'%H:%i:%s') AS jam, c.no_rawat, c.kd_dokter, d.nm_dokter, c.catatan
      FROM catatan_perawatan c LEFT JOIN dokter d ON d.kd_dokter=c.kd_dokter
      WHERE ${where.join(" AND ")} ORDER BY c.tanggal DESC, c.jam DESC LIMIT 100`, params);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return gagal(error, "Gagal memuat catatan dokter.");
  }
}

export async function POST(req: NextRequest) { return simpan(req, false); }
export async function PUT(req: NextRequest) { return simpan(req, true); }

async function simpan(req: NextRequest, mengubah: boolean) {
  const denied = await tindakanRawatJalanAccess("catatan_perawatan");
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new CatatanError("Silakan login kembali.", 401);
    const input = bacaInput(await req.json(), mengubah);
    if (!session.isAdmin && input.dokter !== session.username) {
      throw new CatatanError("Catatan hanya dapat disimpan atas nama dokter yang sedang login.", 403);
    }
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const registrasi = await kunciRegistrasi(connection, input.noRawat);
    validasiWaktu(input, registrasi);
    await pastikanDokterAktif(connection, input.dokter);
    if (mengubah) {
      await pastikanDapatDiubah(connection, input, session.username, session.isAdmin);
      const [hasil] = await connection.execute(`UPDATE catatan_perawatan
        SET tanggal=?,jam=?,kd_dokter=?,catatan=?
        WHERE no_rawat=? AND tanggal=? AND jam=? AND kd_dokter=? AND catatan=? LIMIT 1`,
      [input.tanggal,input.jam,input.dokter,input.catatan,input.noRawat,input.tanggalAsli!,input.jamAsli!,input.dokterAsli!,input.catatanAsli!]);
      if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new CatatanError("Catatan tidak ditemukan atau sudah berubah.", 409);
    } else {
      const [duplikat] = await connection.execute<RowDataPacket[]>(
        "SELECT 1 FROM catatan_perawatan WHERE no_rawat=? AND tanggal=? AND jam=? AND kd_dokter=? LIMIT 1 FOR UPDATE",
        [input.noRawat,input.tanggal,input.jam,input.dokter],
      );
      if (duplikat.length) throw new CatatanError("Catatan dokter pada waktu tersebut sudah tercatat.", 409);
      await connection.execute("INSERT INTO catatan_perawatan (tanggal,jam,no_rawat,kd_dokter,catatan) VALUES (?,?,?,?,?)",
        [input.tanggal,input.jam,input.noRawat,input.dokter,input.catatan]);
    }
    await connection.commit();
    return NextResponse.json({ success: true, message: mengubah ? "Catatan dokter berhasil diperbarui." : "Catatan dokter berhasil disimpan." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Catatan dokter gagal disimpan.");
  } finally { connection?.release(); }
}

export async function DELETE(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess("catatan_perawatan");
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new CatatanError("Silakan login kembali.", 401);
    const input = bacaIdentitas(await req.json());
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, input.noRawat);
    await pastikanDapatDiubah(connection, input, session.username, session.isAdmin);
    const [hasil] = await connection.execute(`DELETE FROM catatan_perawatan
      WHERE no_rawat=? AND tanggal=? AND jam=? AND kd_dokter=? AND catatan=? LIMIT 1`,
    [input.noRawat,input.tanggalAsli!,input.jamAsli!,input.dokterAsli!,input.catatanAsli!]);
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) throw new CatatanError("Catatan tidak ditemukan.", 404);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Catatan dokter berhasil dihapus." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Catatan dokter gagal dihapus.");
  } finally { connection?.release(); }
}

function bacaInput(value: unknown, denganAsli: boolean): CatatanInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new CatatanError("Data catatan tidak valid.");
  const body = value as Record<string, unknown>;
  const teks = (nama: string) => typeof body[nama] === "string" ? body[nama].trim() : "";
  const input: CatatanInput = {
    noRawat: nomorRawat(body.no_rawat), tanggal: teks("tanggal"), jam: teks("jam"),
    dokter: teks("kd_dokter"), catatan: teks("catatan"),
  };
  if (!isRegistrationDate(input.tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(input.jam)) throw new CatatanError("Tanggal atau jam catatan tidak valid.");
  if (!input.dokter || input.dokter.length > 20) throw new CatatanError("Dokter wajib dipilih.");
  if (!input.catatan || input.catatan.length > 700) throw new CatatanError("Catatan wajib diisi dan maksimal 700 karakter.");
  if (denganAsli) {
    input.tanggalAsli = teks("asli_tanggal"); input.jamAsli = teks("asli_jam");
    input.dokterAsli = teks("asli_dokter"); input.catatanAsli = teks("asli_catatan");
    if (!isRegistrationDate(input.tanggalAsli) || !/^\d{2}:\d{2}:\d{2}$/.test(input.jamAsli)
      || !input.dokterAsli || !input.catatanAsli) throw new CatatanError("Identitas catatan awal tidak valid.");
  }
  return input;
}

function bacaIdentitas(value: unknown): CatatanInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new CatatanError("Data catatan tidak valid.");
  const body = value as Record<string, unknown>;
  const teks = (nama: string) => typeof body[nama] === "string" ? body[nama].trim() : "";
  const tanggal = teks("asli_tanggal");
  const jam = teks("asli_jam");
  const dokter = teks("asli_dokter");
  const catatan = teks("asli_catatan");
  if (!isRegistrationDate(tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(jam) || !dokter || !catatan) {
    throw new CatatanError("Identitas catatan awal tidak valid.");
  }
  return {
    noRawat: nomorRawat(body.no_rawat), tanggal, jam, dokter, catatan,
    tanggalAsli: tanggal, jamAsli: jam, dokterAsli: dokter, catatanAsli: catatan,
  };
}

function nomorRawat(value: unknown) {
  const hasil = typeof value === "string" ? value.trim() : "";
  if (!hasil || hasil.length > 17) throw new CatatanError("No. Rawat tidak valid.");
  return hasil;
}

async function kunciRegistrasi(connection: PoolConnection, noRawat: string) {
  const [rows] = await connection.execute<RegistrasiRow[]>(`SELECT DATE_FORMAT(tgl_registrasi,'%Y-%m-%d') AS tgl_registrasi,
    TIME_FORMAT(jam_reg,'%H:%i:%s') AS jam_reg,status_bayar FROM reg_periksa
    WHERE no_rawat=? AND status_lanjut='Ralan' FOR UPDATE`, [noRawat]);
  if (!rows[0]) throw new CatatanError("Kunjungan rawat jalan tidak ditemukan.", 404);
  if (rows[0].status_bayar === "Sudah Bayar") throw new CatatanError("Billing sudah diverifikasi; catatan tidak dapat diubah.", 409);
  return rows[0];
}

function validasiWaktu(input: CatatanInput, registrasi: RegistrasiRow) {
  if (`${input.tanggal} ${input.jam}` < `${registrasi.tgl_registrasi} ${registrasi.jam_reg}`) {
    throw new CatatanError("Waktu catatan tidak boleh mendahului registrasi.");
  }
}

async function pastikanDokterAktif(connection: PoolConnection, kode: string) {
  const [rows] = await connection.execute<RowDataPacket[]>("SELECT 1 FROM dokter WHERE kd_dokter=? AND status='1' LIMIT 1", [kode]);
  if (!rows.length) throw new CatatanError("Dokter tidak aktif atau tidak ditemukan.");
}

async function pastikanDapatDiubah(connection: PoolConnection, input: CatatanInput, pengguna: string, admin: boolean) {
  const [rows] = await connection.execute<RowDataPacket[]>(`SELECT kd_dokter,
    TIMESTAMPDIFF(HOUR,CONCAT(tanggal,' ',jam),NOW()) AS umur_jam FROM catatan_perawatan
    WHERE no_rawat=? AND tanggal=? AND jam=? AND kd_dokter=? AND catatan=? LIMIT 1 FOR UPDATE`,
  [input.noRawat,input.tanggalAsli!,input.jamAsli!,input.dokterAsli!,input.catatanAsli!]);
  if (!rows[0]) throw new CatatanError("Catatan tidak ditemukan.", 404);
  if (!admin && rows[0].kd_dokter !== pengguna) throw new CatatanError("Catatan dokter lain tidak dapat diubah.", 403);
  if (!admin && Number(rows[0].umur_jam) > 48) throw new CatatanError("Batas perubahan catatan 48 jam sudah terlewati.", 409);
}

function gagal(error: unknown, fallback: string) {
  if (error instanceof CatatanError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

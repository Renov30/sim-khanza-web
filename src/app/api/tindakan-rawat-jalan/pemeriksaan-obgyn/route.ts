import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";

type JenisPemeriksaan = "obstetri" | "ginekologi";

interface KonfigurasiPemeriksaan {
  tabel: "pemeriksaan_obstetri_ralan" | "pemeriksaan_ginekologi_ralan";
  kolom: readonly string[];
  kolomCari: readonly string[];
  panjang: Readonly<Record<string, number>>;
  pilihan: Readonly<Record<string, readonly string[]>>;
  kolomIsi: readonly string[];
  label: string;
}

interface RegistrasiRow extends RowDataPacket {
  tgl_registrasi: string;
  jam_reg: string;
  status_bayar: string;
}

interface PemeriksaanInput {
  jenis: JenisPemeriksaan;
  noRawat: string;
  tanggal: string;
  jam: string;
  nilai: Record<string, string>;
  tanggalAsli?: string;
  jamAsli?: string;
}

const KONFIGURASI: Record<JenisPemeriksaan, KonfigurasiPemeriksaan> = {
  obstetri: {
    tabel: "pemeriksaan_obstetri_ralan",
    kolom: [
      "tinggi_uteri", "janin", "letak", "panggul", "denyut", "kontraksi", "kualitas_mnt",
      "kualitas_dtk", "fluksus", "albus", "vulva", "portio", "dalam", "tebal", "arah",
      "pembukaan", "penurunan", "denominator", "ketuban", "feto",
    ],
    kolomCari: ["tinggi_uteri", "janin", "letak", "pembukaan", "denominator"],
    panjang: {
      tinggi_uteri: 5, janin: 7, letak: 50, panggul: 3, denyut: 5, kontraksi: 1,
      kualitas_mnt: 5, kualitas_dtk: 5, fluksus: 1, albus: 1, vulva: 50, portio: 50,
      dalam: 6, tebal: 5, arah: 8, pembukaan: 50, penurunan: 50, denominator: 50,
      ketuban: 1, feto: 12,
    },
    pilihan: {
      janin: ["-", "Tunggal", "Gemelli"], panggul: ["-", "5/5", "4/5", "3/5", "2/5", "1/5"],
      kontraksi: ["+", "-"], fluksus: ["+", "-"], albus: ["+", "-"],
      dalam: ["Kenyal", "Lunak"], arah: ["depan", "axial", "belakang"], ketuban: ["-", "+"],
      feto: ["Normal", "Susp.CPD-FPD", "CPD-FPD"],
    },
    kolomIsi: ["tinggi_uteri", "letak", "denyut", "kualitas_mnt", "kualitas_dtk", "vulva", "portio", "tebal", "pembukaan", "penurunan", "denominator"],
    label: "obstetri",
  },
  ginekologi: {
    tabel: "pemeriksaan_ginekologi_ralan",
    kolom: [
      "inspeksi", "inspeksi_vulva", "inspekulo_gine", "fluxus_gine", "fluor_gine",
      "vulva_inspekulo", "portio_inspekulo", "sondage", "portio_dalam", "bentuk", "cavum_uteri",
      "mobilitas", "ukuran", "nyeri_tekan", "adnexa_kanan", "adnexa_kiri", "cavum_douglas",
    ],
    kolomCari: ["inspeksi", "inspeksi_vulva", "inspekulo_gine", "vulva_inspekulo", "portio_dalam"],
    panjang: {
      inspeksi: 50, inspeksi_vulva: 50, inspekulo_gine: 50, fluxus_gine: 1, fluor_gine: 1,
      vulva_inspekulo: 50, portio_inspekulo: 50, sondage: 50, portio_dalam: 50, bentuk: 50,
      cavum_uteri: 50, mobilitas: 1, ukuran: 50, nyeri_tekan: 1, adnexa_kanan: 50,
      adnexa_kiri: 50, cavum_douglas: 50,
    },
    pilihan: {
      fluxus_gine: ["+", "-"], fluor_gine: ["+", "-"], mobilitas: ["+", "-"], nyeri_tekan: ["+", "-"],
    },
    kolomIsi: [
      "inspeksi", "inspeksi_vulva", "inspekulo_gine", "vulva_inspekulo", "portio_inspekulo",
      "sondage", "portio_dalam", "bentuk", "cavum_uteri", "ukuran", "adnexa_kanan",
      "adnexa_kiri", "cavum_douglas",
    ],
    label: "ginekologi",
  },
};

class PemeriksaanObgynError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

function jenisDari(value: unknown): JenisPemeriksaan {
  if (value === "obstetri" || value === "ginekologi") return value;
  throw new PemeriksaanObgynError("Jenis pemeriksaan tidak valid.");
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess();
    if (denied) return denied;
    const jenis = jenisDari(req.nextUrl.searchParams.get("jenis"));
    const konfigurasi = KONFIGURASI[jenis];
    const noRawat = req.nextUrl.searchParams.get("no_rawat")?.trim() || "";
    const tanggalMulai = req.nextUrl.searchParams.get("tanggal_mulai")?.trim() || "";
    const tanggalSelesai = req.nextUrl.searchParams.get("tanggal_selesai")?.trim() || "";
    const cari = req.nextUrl.searchParams.get("cari")?.trim().slice(0, 100) || "";
    if (!noRawat || noRawat.length > 17) throw new PemeriksaanObgynError("No. Rawat tidak valid.");
    if ((tanggalMulai && !isRegistrationDate(tanggalMulai))
      || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))
      || (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai)) {
      throw new PemeriksaanObgynError("Periode pemeriksaan tidak valid.");
    }
    const where = ["p.no_rawat = ?"];
    const params: string[] = [noRawat];
    if (tanggalMulai) { where.push("p.tgl_perawatan >= ?"); params.push(tanggalMulai); }
    if (tanggalSelesai) { where.push("p.tgl_perawatan <= ?"); params.push(tanggalSelesai); }
    if (cari) {
      where.push(`(${konfigurasi.kolomCari.map((kolom) => `p.${kolom} LIKE ?`).join(" OR ")})`);
      params.push(...Array<string>(konfigurasi.kolomCari.length).fill(`%${cari}%`));
    }
    const rows = await executeQuery(`
      SELECT p.no_rawat, DATE_FORMAT(p.tgl_perawatan, '%Y-%m-%d') AS tgl_perawatan,
             TIME_FORMAT(p.jam_rawat, '%H:%i:%s') AS jam_rawat,
             ${konfigurasi.kolom.map((kolom) => `p.${kolom}`).join(", ")}
      FROM ${konfigurasi.tabel} p
      WHERE ${where.join(" AND ")}
      ORDER BY p.tgl_perawatan DESC, p.jam_rawat DESC
      LIMIT 100
    `, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return gagal(error, "Gagal memuat pemeriksaan obstetri/ginekologi.");
  }
}

export async function POST(req: NextRequest) { return simpan(req, false); }
export async function PUT(req: NextRequest) { return simpan(req, true); }

async function simpan(req: NextRequest, mengubah: boolean) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new PemeriksaanObgynError("Silakan login kembali.", 401);
    const input = bacaInput(await req.json(), mengubah);
    const konfigurasi = KONFIGURASI[input.jenis];
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const registrasi = await kunciRegistrasi(connection, input.noRawat);
    validasiWaktu(input, registrasi);
    if (mengubah) {
      await pastikanDapatDiubah(connection, konfigurasi, session.isAdmin, input.noRawat, input.tanggalAsli!, input.jamAsli!);
      const [hasil] = await connection.execute(`
        UPDATE ${konfigurasi.tabel}
        SET tgl_perawatan=?, jam_rawat=?, ${konfigurasi.kolom.map((kolom) => `${kolom}=?`).join(", ")}
        WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=?
      `, [input.tanggal, input.jam, ...nilaiKolom(input, konfigurasi), input.noRawat, input.tanggalAsli!, input.jamAsli!]);
      if ((hasil as { affectedRows?: number }).affectedRows !== 1) {
        throw new PemeriksaanObgynError("Data pemeriksaan tidak ditemukan atau sudah berubah.", 409);
      }
    } else {
      await connection.execute(`
        INSERT INTO ${konfigurasi.tabel}
          (no_rawat, tgl_perawatan, jam_rawat, ${konfigurasi.kolom.join(", ")})
        VALUES (${Array(jumlahKolomSimpan(konfigurasi)).fill("?").join(", ")})
      `, [input.noRawat, input.tanggal, input.jam, ...nilaiKolom(input, konfigurasi)]);
    }
    await connection.commit();
    return NextResponse.json({
      success: true,
      message: mengubah
        ? `Pemeriksaan ${konfigurasi.label} berhasil diperbarui.`
        : `Pemeriksaan ${konfigurasi.label} berhasil disimpan.`,
    });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Pemeriksaan obstetri/ginekologi gagal disimpan.");
  } finally {
    connection?.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new PemeriksaanObgynError("Silakan login kembali.", 401);
    const jenis = jenisDari(req.nextUrl.searchParams.get("jenis"));
    const konfigurasi = KONFIGURASI[jenis];
    const noRawat = req.nextUrl.searchParams.get("no_rawat")?.trim() || "";
    const tanggal = req.nextUrl.searchParams.get("tanggal") || "";
    const jam = req.nextUrl.searchParams.get("jam") || "";
    if (!noRawat || noRawat.length > 17 || !isRegistrationDate(tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(jam)) {
      throw new PemeriksaanObgynError("Identitas pemeriksaan tidak valid.");
    }
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    await pastikanDapatDiubah(connection, konfigurasi, session.isAdmin, noRawat, tanggal, jam);
    const [hasil] = await connection.execute(
      `DELETE FROM ${konfigurasi.tabel} WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=?`,
      [noRawat, tanggal, jam],
    );
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) {
      throw new PemeriksaanObgynError("Data pemeriksaan tidak ditemukan.", 404);
    }
    await connection.commit();
    return NextResponse.json({ success: true, message: `Pemeriksaan ${konfigurasi.label} berhasil dihapus.` });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Pemeriksaan obstetri/ginekologi gagal dihapus.");
  } finally {
    connection?.release();
  }
}

function bacaInput(body: unknown, mengubah: boolean): PemeriksaanInput {
  if (!body || typeof body !== "object") throw new PemeriksaanObgynError("Data pemeriksaan tidak valid.");
  const data = body as Record<string, unknown>;
  const teks = (nama: string) => typeof data[nama] === "string" ? data[nama].trim() : "";
  const jenis = jenisDari(data.jenis);
  const konfigurasi = KONFIGURASI[jenis];
  const noRawat = teks("no_rawat");
  const tanggal = teks("tgl_perawatan");
  const jam = teks("jam_rawat");
  if (!noRawat || noRawat.length > 17 || !isRegistrationDate(tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(jam)) {
    throw new PemeriksaanObgynError("Kunjungan, tanggal, atau jam pemeriksaan tidak valid.");
  }
  const nilai: Record<string, string> = {};
  for (const kolom of konfigurasi.kolom) {
    nilai[kolom] = teks(kolom);
    if (nilai[kolom].length > konfigurasi.panjang[kolom]) {
      throw new PemeriksaanObgynError(`${kolom.replaceAll("_", " ")} terlalu panjang.`);
    }
    const pilihan = konfigurasi.pilihan[kolom];
    if (pilihan && !pilihan.includes(nilai[kolom])) {
      throw new PemeriksaanObgynError(`Pilihan ${kolom.replaceAll("_", " ")} tidak valid.`);
    }
  }
  if (!konfigurasi.kolomIsi.some((kolom) => nilai[kolom])) {
    throw new PemeriksaanObgynError(`Isi minimal satu hasil pemeriksaan ${konfigurasi.label}.`);
  }
  const tanggalAsli = teks("asli_tanggal");
  const jamAsli = teks("asli_jam");
  if (mengubah && (!isRegistrationDate(tanggalAsli) || !/^\d{2}:\d{2}:\d{2}$/.test(jamAsli))) {
    throw new PemeriksaanObgynError("Identitas pemeriksaan awal tidak valid.");
  }
  return { jenis, noRawat, tanggal, jam, nilai, tanggalAsli, jamAsli };
}

function nilaiKolom(input: PemeriksaanInput, konfigurasi: KonfigurasiPemeriksaan) {
  return konfigurasi.kolom.map((kolom) => input.nilai[kolom]);
}

function jumlahKolomSimpan(konfigurasi: KonfigurasiPemeriksaan) {
  return 3 + konfigurasi.kolom.length;
}

async function kunciRegistrasi(connection: PoolConnection, noRawat: string) {
  const [rows] = await connection.execute<RegistrasiRow[]>(`
    SELECT DATE_FORMAT(tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, jam_reg, status_bayar
    FROM reg_periksa
    WHERE no_rawat=? AND status_lanjut='Ralan'
    FOR UPDATE
  `, [noRawat]);
  const row = rows[0];
  if (!row) throw new PemeriksaanObgynError("Kunjungan rawat jalan tidak ditemukan.", 404);
  if (row.status_bayar === "Sudah Bayar") {
    throw new PemeriksaanObgynError("Billing sudah diverifikasi; pemeriksaan tidak dapat diubah.", 409);
  }
  return row;
}

function validasiWaktu(input: PemeriksaanInput, registrasi: RegistrasiRow) {
  if (`${input.tanggal} ${input.jam}` < `${registrasi.tgl_registrasi} ${registrasi.jam_reg}`) {
    throw new PemeriksaanObgynError("Waktu pemeriksaan tidak boleh mendahului registrasi.");
  }
}

async function pastikanDapatDiubah(
  connection: PoolConnection,
  konfigurasi: KonfigurasiPemeriksaan,
  admin: boolean,
  noRawat: string,
  tanggal: string,
  jam: string,
) {
  const [rows] = await connection.execute<RowDataPacket[]>(`
    SELECT TIMESTAMPDIFF(HOUR, CONCAT(tgl_perawatan, ' ', jam_rawat), NOW()) AS umur_jam
    FROM ${konfigurasi.tabel}
    WHERE no_rawat=? AND tgl_perawatan=? AND jam_rawat=?
    FOR UPDATE
  `, [noRawat, tanggal, jam]);
  const row = rows[0];
  if (!row) throw new PemeriksaanObgynError("Data pemeriksaan tidak ditemukan.", 404);
  if (!admin && Number(row.umur_jam) > 48) {
    throw new PemeriksaanObgynError("Batas perubahan pemeriksaan 48 jam sudah terlewati.", 409);
  }
}

function gagal(error: unknown, fallback: string) {
  if (error instanceof PemeriksaanObgynError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  }
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") {
    return NextResponse.json({ success: false, error: "Pemeriksaan pada waktu tersebut sudah tercatat." }, { status: 409 });
  }
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

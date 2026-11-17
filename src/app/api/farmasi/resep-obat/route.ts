import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool, executeQuery } from "@/lib/db";
import { resepObatAccess } from "@/lib/farmasi/access";
import { isRegistrationDate } from "@/lib/registrasi/date";

interface KunjunganTerkunci extends RowDataPacket {
  no_rawat: string;
  kd_dokter: string;
  kd_poli: string;
  kd_pj: string;
  status_bayar: string;
  tgl_registrasi: string;
  jam_reg: string;
  pasien_ranap: number;
}

interface ObatInput {
  kode_brng: string;
  jumlah: number;
  aturan_pakai: string;
}

interface DetailRacikanInput {
  kode_brng: string;
  p1: number;
  p2: number;
  kandungan: string;
  jumlah: number;
}

interface RacikanInput {
  no_racik: string;
  nama_racik: string;
  kd_racik: string;
  jumlah: number;
  aturan_pakai: string;
  keterangan: string;
  detail: DetailRacikanInput[];
}

class ResepError extends Error {
  constructor(message: string, readonly status = 400, readonly code?: string) {
    super(message);
  }
}

function teks(value: unknown, maksimum: number) {
  return typeof value === "string" ? value.trim().slice(0, maksimum) : "";
}

function angkaPositif(value: unknown) {
  const hasil = Number(value);
  return Number.isFinite(hasil) && hasil > 0 ? hasil : 0;
}

function bacaObat(value: unknown): ObatInput[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const data = item && typeof item === "object" ? item as Record<string, unknown> : {};
    return {
      kode_brng: teks(data.kode_brng, 15),
      jumlah: angkaPositif(data.jumlah),
      aturan_pakai: teks(data.aturan_pakai, 150),
    };
  });
}

function bacaRacikan(value: unknown): RacikanInput[] {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    const data = item && typeof item === "object" ? item as Record<string, unknown> : {};
    const detail = Array.isArray(data.detail) ? data.detail.map((baris) => {
      const isi = baris && typeof baris === "object" ? baris as Record<string, unknown> : {};
      return {
        kode_brng: teks(isi.kode_brng, 15),
        p1: angkaPositif(isi.p1),
        p2: angkaPositif(isi.p2),
        kandungan: teks(isi.kandungan, 10),
        jumlah: angkaPositif(isi.jumlah),
      };
    }) : [];
    return {
      no_racik: String(index + 1),
      nama_racik: teks(data.nama_racik, 100),
      kd_racik: teks(data.kd_racik, 3),
      jumlah: angkaPositif(data.jumlah),
      aturan_pakai: teks(data.aturan_pakai, 150),
      keterangan: teks(data.keterangan, 50),
      detail,
    };
  });
}

function kegagalan(error: unknown, fallback: string) {
  const status = error instanceof ResepError ? error.status : 500;
  if (!(error instanceof ResepError)) console.error("API resep obat gagal:", error);
  return NextResponse.json({
    success: false,
    error: error instanceof ResepError ? error.message : fallback,
    ...(error instanceof ResepError && error.code ? { code: error.code } : {}),
  }, { status });
}

export async function GET(req: NextRequest) {
  try {
    const denied = await resepObatAccess();
    if (denied) return denied;
    const params = req.nextUrl.searchParams;
    const resource = params.get("resource") || "kunjungan";
    if (resource === "kunjungan") return daftarKunjungan(params);
    if (resource === "obat") return daftarObat(params);
    if (resource === "metode") return daftarMetode();
    if (resource === "aturan-pakai") return daftarAturanPakai(params);
    if (resource === "riwayat") return daftarRiwayat(params);
    throw new ResepError("Jenis data resep tidak valid.");
  } catch (error) {
    return kegagalan(error, "Gagal memuat data resep.");
  }
}

async function daftarKunjungan(params: URLSearchParams) {
  const noRawat = params.get("no_rawat")?.trim() || "";
  const cari = params.get("cari")?.trim().slice(0, 80) || "";
  if (noRawat && noRawat.length > 17) throw new ResepError("Nomor rawat tidak valid.");
  if (!noRawat && cari.length < 2) return NextResponse.json({ success: true, data: [] });
  const where = noRawat
    ? "r.no_rawat = ?"
    : "(r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?)";
  const nilai = `%${cari}%`;
  const queryParams = noRawat ? [noRawat] : [nilai, nilai, nilai];
  const rows = await executeQuery(`
    SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur,
           DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, r.jam_reg,
           r.kd_dokter, d.nm_dokter, r.kd_poli, pol.nm_poli, r.kd_pj,
           COALESCE(pj.png_jawab, r.kd_pj) AS png_jawab, r.status_bayar,
           EXISTS(SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = r.no_rawat) AS pasien_ranap
    FROM reg_periksa r
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter
    INNER JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
    LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
    WHERE r.status_lanjut = 'Ralan' AND ${where}
    ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC
    LIMIT 20
  `, queryParams);
  return NextResponse.json({ success: true, data: rows });
}

async function daftarObat(params: URLSearchParams) {
  const noRawat = params.get("no_rawat")?.trim() || "";
  const cari = params.get("cari")?.trim().slice(0, 80) || "";
  const offsetNilai = Number.parseInt(params.get("offset") || "0", 10);
  const offset = Number.isFinite(offsetNilai) ? Math.min(Math.max(offsetNilai, 0), 100000) : 0;
  if (!noRawat || noRawat.length > 17) throw new ResepError("Pilih kunjungan terlebih dahulu.");
  const kunjungan = await executeQuery<{ kd_poli: string }>(
    "SELECT kd_poli FROM reg_periksa WHERE no_rawat = ? AND status_lanjut = 'Ralan' LIMIT 1",
    [noRawat],
  );
  if (!kunjungan[0]) throw new ResepError("Kunjungan rawat jalan tidak ditemukan.", 404);
  const depot = await executeQuery<{ kd_bangsal: string; nm_bangsal: string }>(`
    SELECT b.kd_bangsal, b.nm_bangsal
    FROM bangsal b
    WHERE b.kd_bangsal = COALESCE(
      (SELECT sdr.kd_bangsal FROM set_depo_ralan sdr WHERE sdr.kd_poli = ? LIMIT 1),
      (SELECT sl.kd_bangsal FROM set_lokasi sl LIMIT 1)
    ) LIMIT 1
  `, [kunjungan[0].kd_poli]);
  if (!depot[0]) throw new ResepError("Depo obat rawat jalan belum dikonfigurasi.", 409, "DEPO_BELUM_DIATUR");
  const seperti = `%${cari}%`;
  const queryParams = [depot[0].kd_bangsal, seperti, seperti, seperti, seperti, 101, offset];
  const rows = await executeQuery(`
    SELECT db.kode_brng, db.nama_brng, db.kode_sat, COALESCE(js.nama, '-') AS jenis,
           db.letak_barang AS komposisi, db.ralan AS harga_ralan,
           COALESCE(ind.nama_industri, '-') AS industri, db.kapasitas, SUM(gb.stok) AS stok
    FROM databarang db
    INNER JOIN gudangbarang gb ON gb.kode_brng = db.kode_brng AND gb.kd_bangsal = ?
    LEFT JOIN jenis js ON js.kdjns = db.kdjns
    LEFT JOIN industrifarmasi ind ON ind.kode_industri = db.kode_industri
    WHERE db.status = '1'
      AND (db.kode_brng LIKE ? OR db.nama_brng LIKE ? OR js.nama LIKE ? OR db.letak_barang LIKE ?)
    GROUP BY db.kode_brng, db.nama_brng, db.kode_sat, js.nama, db.letak_barang,
             db.ralan, ind.nama_industri, db.kapasitas
    HAVING SUM(gb.stok) > 0
    ORDER BY db.nama_brng
    LIMIT ? OFFSET ?
  `, queryParams);
  const hasMore = rows.length > 100;
  let total: number | undefined;
  if (offset === 0) {
    const totalRows = await executeQuery<{ total: number | string }>(`
      SELECT COUNT(*) AS total
      FROM (
        SELECT db.kode_brng
        FROM databarang db
        INNER JOIN gudangbarang gb ON gb.kode_brng = db.kode_brng AND gb.kd_bangsal = ?
        LEFT JOIN jenis js ON js.kdjns = db.kdjns
        WHERE db.status = '1'
          AND (db.kode_brng LIKE ? OR db.nama_brng LIKE ? OR js.nama LIKE ? OR db.letak_barang LIKE ?)
        GROUP BY db.kode_brng
        HAVING SUM(gb.stok) > 0
      ) AS katalog
    `, [depot[0].kd_bangsal, seperti, seperti, seperti, seperti]);
    total = Number(totalRows[0]?.total || 0);
  }
  return NextResponse.json({ success: true, data: rows.slice(0, 100), meta: { depot: depot[0], hasMore, offset, limit: 100, ...(total === undefined ? {} : { total }) } });
}

async function daftarMetode() {
  const rows = await executeQuery("SELECT kd_racik, nm_racik FROM metode_racik ORDER BY nm_racik");
  return NextResponse.json({ success: true, data: rows }, { headers: { "Cache-Control": "private, max-age=300" } });
}

async function daftarAturanPakai(params: URLSearchParams) {
  const cari = params.get("cari")?.trim().slice(0, 100) || "";
  const seperti = `%${cari}%`;
  const rows = await executeQuery<{ aturan: string }>(
    "SELECT aturan FROM master_aturan_pakai WHERE aturan LIKE ? ORDER BY aturan LIMIT 100",
    [seperti],
  );
  return NextResponse.json({ success: true, data: rows });
}

async function daftarRiwayat(params: URLSearchParams) {
  const noRawat = params.get("no_rawat")?.trim() || "";
  if (!noRawat || noRawat.length > 17) return NextResponse.json({ success: true, data: [] });
  const rows = await executeQuery(`
    SELECT ro.no_resep, DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
           ro.jam_peresepan, ro.kd_dokter, d.nm_dokter,
           (SELECT COUNT(*) FROM resep_dokter rd WHERE rd.no_resep = ro.no_resep) AS jumlah_obat,
           (SELECT COUNT(*) FROM resep_dokter_racikan rr WHERE rr.no_resep = ro.no_resep) AS jumlah_racikan
    FROM resep_obat ro
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    WHERE ro.no_rawat = ? AND ro.status = 'ralan'
    ORDER BY ro.tgl_peresepan DESC, ro.jam_peresepan DESC, ro.no_resep DESC
    LIMIT 50
  `, [noRawat]);
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const denied = await resepObatAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  let namaLock = "";
  let lockDidapat = false;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object") throw new ResepError("Data resep tidak valid.");
    const input = body as Record<string, unknown>;
    const noRawat = teks(input.no_rawat, 17);
    const tanggal = teks(input.tanggal, 10);
    const jam = teks(input.jam, 8);
    const obat = bacaObat(input.obat);
    const racikan = bacaRacikan(input.racikan);
    if (!noRawat || !isRegistrationDate(tanggal) || !/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(jam)) {
      throw new ResepError("Kunjungan, tanggal, atau jam peresepan tidak valid.");
    }
    if (obat.length + racikan.length === 0) throw new ResepError("Masukkan minimal satu obat atau racikan.");
    if (obat.length > 100 || racikan.length > 20) throw new ResepError("Jumlah item resep melebihi batas yang diizinkan.");
    if (obat.some((item) => !item.kode_brng || !item.jumlah)) throw new ResepError("Jumlah obat nonracikan harus lebih dari nol.");
    if (new Set(obat.map((item) => item.kode_brng)).size !== obat.length) throw new ResepError("Obat nonracikan tidak boleh duplikat.");
    for (const item of racikan) {
      if (!item.nama_racik || !item.kd_racik || !item.jumlah || !item.aturan_pakai || item.detail.length === 0) {
        throw new ResepError("Nama, metode, jumlah, aturan pakai, dan bahan racikan wajib diisi.");
      }
      if (item.detail.length > 30 || item.detail.some((detail) => !detail.kode_brng || !detail.jumlah)) {
        throw new ResepError("Bahan dan jumlah racikan tidak valid.");
      }
      if (new Set(item.detail.map((detail) => detail.kode_brng)).size !== item.detail.length) {
        throw new ResepError(`Bahan pada racikan ${item.nama_racik} tidak boleh duplikat.`);
      }
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [kunjunganRows] = await connection.execute<KunjunganTerkunci[]>(`
      SELECT r.no_rawat, r.kd_dokter, r.kd_poli, r.kd_pj, r.status_bayar,
             DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, r.jam_reg,
             EXISTS(SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = r.no_rawat) AS pasien_ranap
      FROM reg_periksa r
      WHERE r.no_rawat = ? AND r.status_lanjut = 'Ralan'
      FOR UPDATE
    `, [noRawat]);
    const kunjungan = kunjunganRows[0];
    if (!kunjungan) throw new ResepError("Kunjungan rawat jalan tidak ditemukan.", 404);
    if (Number(kunjungan.pasien_ranap)) throw new ResepError("Pasien sudah masuk kamar inap; gunakan resep rawat inap.", 409);
    if (`${tanggal} ${jam}` < `${kunjungan.tgl_registrasi} ${kunjungan.jam_reg}`) {
      throw new ResepError("Waktu peresepan tidak boleh mendahului waktu registrasi.");
    }
    if (kunjungan.status_bayar === "Sudah Bayar") {
      const [parsial] = await connection.execute<RowDataPacket[]>("SELECT kd_pj FROM set_input_parsial WHERE kd_pj = ? LIMIT 1", [kunjungan.kd_pj]);
      if (!parsial[0]) throw new ResepError("Billing kunjungan sudah diverifikasi; resep tidak dapat ditambahkan.", 409);
    }

    const semuaKode = [...new Set([...obat.map((item) => item.kode_brng), ...racikan.flatMap((item) => item.detail.map((detail) => detail.kode_brng))])];
    const placeholderObat = semuaKode.map(() => "?").join(", ");
    const [obatAktif] = await connection.execute<RowDataPacket[]>(
      `SELECT kode_brng FROM databarang WHERE status = '1' AND kode_brng IN (${placeholderObat})`,
      semuaKode,
    );
    if (obatAktif.length !== semuaKode.length) throw new ResepError("Sebagian obat tidak ditemukan atau sudah tidak aktif.", 409);
    if (racikan.length > 0) {
      const kodeMetode = [...new Set(racikan.map((item) => item.kd_racik))];
      const placeholderMetode = kodeMetode.map(() => "?").join(", ");
      const [metodeAktif] = await connection.execute<RowDataPacket[]>(
        `SELECT kd_racik FROM metode_racik WHERE kd_racik IN (${placeholderMetode})`, kodeMetode,
      );
      if (metodeAktif.length !== kodeMetode.length) throw new ResepError("Metode racikan tidak ditemukan.", 409);
    }

    namaLock = `resep_obat:${tanggal.replaceAll("-", "")}`;
    const [lockRows] = await connection.execute<RowDataPacket[]>("SELECT GET_LOCK(?, 5) AS didapat", [namaLock]);
    lockDidapat = Number(lockRows[0]?.didapat) === 1;
    if (!lockDidapat) throw new ResepError("Nomor resep sedang dipakai proses lain. Silakan ulangi.", 409, "NOMOR_RESEP_SIBUK");
    const [nomorRows] = await connection.execute<RowDataPacket[]>(`
      SELECT COALESCE(MAX(CONVERT(RIGHT(no_resep, 4), UNSIGNED)), 0) + 1 AS urut
      FROM resep_obat WHERE tgl_peresepan = ? OR tgl_perawatan = ?
    `, [tanggal, tanggal]);
    const urut = Number(nomorRows[0]?.urut || 1);
    if (urut > 9999) throw new ResepError("Nomor resep harian sudah mencapai batas.", 409);
    const noResep = `${tanggal.replaceAll("-", "")}${String(urut).padStart(4, "0")}`;

    await connection.execute(`INSERT INTO resep_obat
      (no_resep, tgl_perawatan, jam, no_rawat, kd_dokter, tgl_peresepan, jam_peresepan, status, tgl_penyerahan, jam_penyerahan)
      VALUES (?, '0000-00-00', '00:00:00', ?, ?, ?, ?, 'ralan', '0000-00-00', '00:00:00')`,
    [noResep, noRawat, kunjungan.kd_dokter, tanggal, jam]);
    for (const item of obat) {
      await connection.execute(
        "INSERT INTO resep_dokter (no_resep, kode_brng, jml, aturan_pakai) VALUES (?, ?, ?, ?)",
        [noResep, item.kode_brng, item.jumlah, item.aturan_pakai],
      );
    }
    for (const item of racikan) {
      await connection.execute(`INSERT INTO resep_dokter_racikan
        (no_resep, no_racik, nama_racik, kd_racik, jml_dr, aturan_pakai, keterangan)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [noResep, item.no_racik, item.nama_racik, item.kd_racik, item.jumlah, item.aturan_pakai, item.keterangan]);
      for (const detail of item.detail) {
        await connection.execute(`INSERT INTO resep_dokter_racikan_detail
          (no_resep, no_racik, kode_brng, p1, p2, kandungan, jml)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [noResep, item.no_racik, detail.kode_brng, detail.p1 || null, detail.p2 || null, detail.kandungan, detail.jumlah]);
      }
    }
    await connection.commit();
    return NextResponse.json({ success: true, data: { no_resep: noResep }, message: `Resep ${noResep} berhasil disimpan.` });
  } catch (error) {
    if (connection) await connection.rollback().catch(() => undefined);
    return kegagalan(error, "Resep gagal disimpan.");
  } finally {
    if (connection) {
      let amanDikembalikan = true;
      if (lockDidapat) {
        try {
          const [rows] = await connection.execute<RowDataPacket[]>("SELECT RELEASE_LOCK(?) AS dilepas", [namaLock]);
          amanDikembalikan = Number(rows[0]?.dilepas) === 1;
        } catch {
          amanDikembalikan = false;
        }
      }
      if (amanDikembalikan) connection.release();
      else connection.destroy();
    }
  }
}

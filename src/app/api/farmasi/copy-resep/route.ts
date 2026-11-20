import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { resepObatAccess } from "@/lib/farmasi/access";
import { isRegistrationDate } from "@/lib/registrasi/date";

type StatusPerawatan = "ralan" | "ranap";

interface ResepHeaderRow {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  status: StatusPerawatan;
}

interface DetailRow {
  no_resep: string;
  jenis_item: "obat" | "racikan" | "bahan";
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
  no_racik: string;
  kd_racik: string;
  p1: number | string;
  p2: number | string;
  kandungan: string;
  jenis: string;
  komposisi: string;
  harga_ralan: number | string;
  industri: string;
  kapasitas: number | string;
  stok: number | string;
}

interface ObatSalinan {
  kode_brng: string;
  nama_brng: string;
  kode_sat: string;
  jenis: string;
  komposisi: string;
  harga_ralan: number | string;
  industri: string;
  kapasitas: number | string;
  stok: number | string;
  jumlah: string;
  aturan_pakai: string;
}

interface BahanSalinan extends Omit<ObatSalinan, "aturan_pakai"> {
  p1: string;
  p2: string;
  kandungan: string;
}

const BATAS_TANGGAL = 10;
const BATAS_NO_RM = 20;
const BATAS_RESEP = 14;
const BATAS_CARI = 80;

class CopyResepError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

function teks(nilai: unknown, batas: number) {
  return typeof nilai === "string" ? nilai.trim().slice(0, batas) : "";
}

function angkaTeks(nilai: unknown) {
  return nilai === null || nilai === undefined || nilai === "" ? "" : String(nilai);
}

function detailDariBaris(baris: DetailRow) {
  return {
    jenis_item: baris.jenis_item,
    kode_item: baris.kode_item,
    nama_item: baris.nama_item,
    jumlah: angkaTeks(baris.jumlah),
    satuan: baris.satuan,
    aturan_pakai: baris.aturan_pakai,
    keterangan: baris.keterangan,
    no_racik: baris.no_racik,
  };
}

function obatDariBaris(baris: DetailRow): ObatSalinan {
  return {
    kode_brng: baris.kode_item,
    nama_brng: baris.nama_item,
    kode_sat: baris.satuan,
    jenis: baris.jenis,
    komposisi: baris.komposisi,
    harga_ralan: baris.harga_ralan,
    industri: baris.industri,
    kapasitas: baris.kapasitas,
    stok: baris.stok,
    jumlah: angkaTeks(baris.jumlah),
    aturan_pakai: baris.aturan_pakai,
  };
}

function bahanDariBaris(baris: DetailRow): BahanSalinan {
  return {
    kode_brng: baris.kode_item,
    nama_brng: baris.nama_item,
    kode_sat: baris.satuan,
    jenis: baris.jenis,
    komposisi: baris.komposisi,
    harga_ralan: baris.harga_ralan,
    industri: baris.industri,
    kapasitas: baris.kapasitas,
    stok: baris.stok,
    p1: angkaTeks(baris.p1),
    p2: angkaTeks(baris.p2),
    kandungan: baris.kandungan,
    jumlah: angkaTeks(baris.jumlah),
  };
}

function susunIsiResep(noResep: string[], detail: DetailRow[]) {
  const dari = (jenis: DetailRow["jenis_item"]) => detail.filter((baris) => noResep.includes(baris.no_resep) && baris.jenis_item === jenis);
  const obat = dari("obat").map(obatDariBaris);
  const racikan = dari("racikan").map((baris) => ({
    kd_racik: baris.kd_racik,
    nama_racik: baris.nama_item,
    jumlah: angkaTeks(baris.jumlah),
    aturan_pakai: baris.aturan_pakai,
    keterangan: baris.keterangan,
    detail: detail
      .filter((bahan) => bahan.jenis_item === "bahan" && bahan.no_resep === baris.no_resep && bahan.no_racik === baris.no_racik)
      .map(bahanDariBaris),
  }));
  return { obat, racikan, detail: detail.map(detailDariBaris) };
}

async function muatDetail(noResep: string[]) {
  if (noResep.length === 0) return [] as DetailRow[];
  const tanda = noResep.map(() => "?").join(", ");
  return executeQuery<DetailRow>(`
    SELECT rd.no_resep, 'obat' AS jenis_item, rd.kode_brng AS kode_item,
           db.nama_brng AS nama_item, rd.jml AS jumlah, db.kode_sat AS satuan,
           rd.aturan_pakai, '' AS keterangan, '' AS no_racik, '' AS kd_racik,
           0 AS p1, 0 AS p2, '' AS kandungan,
           COALESCE(js.nama, '-') AS jenis, db.letak_barang AS komposisi,
           db.ralan AS harga_ralan, COALESCE(ind.nama_industri, '-') AS industri,
           db.kapasitas, COALESCE(gb.stok, 0) AS stok
    FROM resep_dokter rd
    INNER JOIN databarang db ON db.kode_brng = rd.kode_brng
    LEFT JOIN jenis js ON js.kdjns = db.kdjns
    LEFT JOIN industrifarmasi ind ON ind.kode_industri = db.kode_industri
    LEFT JOIN (SELECT kode_brng, SUM(stok) AS stok FROM gudangbarang GROUP BY kode_brng) gb ON gb.kode_brng = db.kode_brng
    WHERE rd.no_resep IN (${tanda})
    UNION ALL
    SELECT rr.no_resep, 'racikan' AS jenis_item, CONCAT('R', rr.no_racik) AS kode_item,
           rr.nama_racik AS nama_item, rr.jml_dr AS jumlah, mr.nm_racik AS satuan,
           rr.aturan_pakai, rr.keterangan, CAST(rr.no_racik AS CHAR) AS no_racik, rr.kd_racik,
           0 AS p1, 0 AS p2, '' AS kandungan,
           'Racikan' AS jenis, '' AS komposisi, 0 AS harga_ralan, '' AS industri,
           0 AS kapasitas, 0 AS stok
    FROM resep_dokter_racikan rr
    INNER JOIN metode_racik mr ON mr.kd_racik = rr.kd_racik
    WHERE rr.no_resep IN (${tanda})
    UNION ALL
    SELECT rrd.no_resep, 'bahan' AS jenis_item, rrd.kode_brng AS kode_item,
           db.nama_brng AS nama_item, rrd.jml AS jumlah, db.kode_sat AS satuan,
           '' AS aturan_pakai, '' AS keterangan, CAST(rrd.no_racik AS CHAR) AS no_racik, '' AS kd_racik,
           rrd.p1, rrd.p2, rrd.kandungan,
           COALESCE(js.nama, '-') AS jenis, db.letak_barang AS komposisi,
           db.ralan AS harga_ralan, COALESCE(ind.nama_industri, '-') AS industri,
           db.kapasitas, COALESCE(gb.stok, 0) AS stok
    FROM resep_dokter_racikan_detail rrd
    INNER JOIN databarang db ON db.kode_brng = rrd.kode_brng
    LEFT JOIN jenis js ON js.kdjns = db.kdjns
    LEFT JOIN industrifarmasi ind ON ind.kode_industri = db.kode_industri
    LEFT JOIN (SELECT kode_brng, SUM(stok) AS stok FROM gudangbarang GROUP BY kode_brng) gb ON gb.kode_brng = db.kode_brng
    WHERE rrd.no_resep IN (${tanda})
    ORDER BY no_resep, no_racik, jenis_item, kode_item
  `, [...noResep, ...noResep, ...noResep]);
}

function headerDariResep(baris: ResepHeaderRow) {
  return {
    ...baris,
    status_asal: baris.status === "ralan" ? "Rawat Jalan" : "Rawat Inap",
  };
}

async function daftarCopy(params: URLSearchParams) {
  const noRm = teks(params.get("no_rm"), BATAS_NO_RM);
  if (!noRm) return NextResponse.json({ success: false, error: "Nomor RM wajib diisi." }, { status: 400 });

  const status = teks(params.get("status"), 10) as StatusPerawatan;
  const tanggalMulai = teks(params.get("tanggal_mulai"), BATAS_TANGGAL);
  const tanggalSelesai = teks(params.get("tanggal_selesai"), BATAS_TANGGAL);
  const kdDokter = teks(params.get("kd_dokter"), 20);
  const cariObat = teks(params.get("cari_obat"), BATAS_CARI);
  const batasMentah = Number.parseInt(params.get("limit") || "50", 10);
  const limit = Number.isFinite(batasMentah) ? Math.min(Math.max(batasMentah, 1), 100) : 50;

  const valid = ["ralan", "ranap"].includes(status)
    && (!tanggalMulai || isRegistrationDate(tanggalMulai))
    && (!tanggalSelesai || isRegistrationDate(tanggalSelesai))
    && (!tanggalMulai || !tanggalSelesai || tanggalMulai <= tanggalSelesai);
  if (!valid) return NextResponse.json({ success: false, error: "Filter copy resep tidak valid." }, { status: 400 });

  const where = [
    "p.no_rkm_medis = ?",
    "ro.status = ?",
    "CAST(ro.tgl_peresepan AS CHAR) <> '0000-00-00'",
  ];
  const nilai: (string | number)[] = [noRm, status];
  if (tanggalMulai) { where.push("ro.tgl_peresepan >= ?"); nilai.push(tanggalMulai); }
  if (tanggalSelesai) { where.push("ro.tgl_peresepan <= ?"); nilai.push(tanggalSelesai); }
  if (kdDokter) { where.push("ro.kd_dokter = ?"); nilai.push(kdDokter); }

  const header = await executeQuery<ResepHeaderRow>(`
    SELECT ro.no_resep,
           DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
           TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
           ro.no_rawat, r.no_rkm_medis, p.nm_pasien, ro.kd_dokter, d.nm_dokter,
           CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
           ro.status
    FROM resep_obat ro
    INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    WHERE ${where.join(" AND ")}
    ORDER BY ro.tgl_peresepan DESC, ro.jam_peresepan DESC, ro.no_resep DESC
    LIMIT ?
  `, [...nilai, limit]);

  const nomorResep = header.map((baris) => baris.no_resep);
  const detail = await muatDetail(nomorResep);
  const kunci = cariObat.toLocaleLowerCase("id-ID");
  const item = header
    .map((baris) => {
      const isi = susunIsiResep([baris.no_resep], detail.filter((barisDetail) => barisDetail.no_resep === baris.no_resep));
      return { ...headerDariResep(baris), ...isi };
    })
    .filter((baris) => !kunci || baris.detail.some((isi) =>
      isi.nama_item.toLocaleLowerCase("id-ID").includes(kunci)
      || isi.kode_item.toLocaleLowerCase("id-ID").includes(kunci)));

  return NextResponse.json({ success: true, data: { items: item, total: item.length } });
}

async function detailResep(params: URLSearchParams) {
  const noResep = teks(params.get("no_resep"), BATAS_RESEP);
  if (!noResep) return NextResponse.json({ success: false, error: "Nomor resep wajib diisi." }, { status: 400 });

  const header = await executeQuery<ResepHeaderRow>(`
    SELECT ro.no_resep,
           DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
           TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
           ro.no_rawat, r.no_rkm_medis, p.nm_pasien, ro.kd_dokter, d.nm_dokter,
           CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
           ro.status
    FROM resep_obat ro
    INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    WHERE ro.no_resep = ?
    LIMIT 1
  `, [noResep]);
  const sumber = header[0];
  if (!sumber) return NextResponse.json({ success: false, error: "Resep tidak ditemukan." }, { status: 404 });

  const detail = await muatDetail([noResep]);
  const isi = susunIsiResep([noResep], detail);
  return NextResponse.json({ success: true, data: { header: headerDariResep(sumber), ...isi } });
}

export async function GET(req: NextRequest) {
  try {
    const denied = await resepObatAccess();
    if (denied) return denied;
    const params = req.nextUrl.searchParams;
    if (params.get("no_resep")) return detailResep(params);
    return daftarCopy(params);
  } catch (error) {
    console.error("API copy resep gagal:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat copy resep." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await resepObatAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body: unknown = await req.json();
    const input = body && typeof body === "object" ? body as Record<string, unknown> : {};
    const noResep = teks(input.no_resep, BATAS_RESEP);
    const noRawatTujuan = teks(input.no_rawat_tujuan, 17);
    if (!noResep || !noRawatTujuan) throw new CopyResepError("Nomor resep dan kunjungan tujuan wajib diisi.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute<(RowDataPacket & { status_bayar: string; kd_pj: string; tervalidasi: number })[]>(`
      SELECT rs.status_bayar, rs.kd_pj,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00' THEN 0 ELSE 1 END AS tervalidasi
      FROM resep_obat ro
      INNER JOIN reg_periksa rs ON rs.no_rawat = ro.no_rawat
      INNER JOIN reg_periksa rt ON rt.no_rawat = ? AND rt.status_lanjut = 'Ralan'
      WHERE ro.no_resep = ? AND rs.no_rkm_medis = rt.no_rkm_medis AND ro.kd_dokter = rt.kd_dokter
      FOR UPDATE
    `, [noRawatTujuan, noResep]);
    const resep = rows[0];
    if (!resep) throw new CopyResepError("Resep tidak ditemukan untuk pasien dan dokter tersebut.", 404);
    if (Number(resep.tervalidasi)) throw new CopyResepError("Resep sudah tervalidasi dan tidak dapat dihapus.", 409);
    if (resep.status_bayar === "Sudah Bayar") {
      const [parsial] = await connection.execute<RowDataPacket[]>("SELECT kd_pj FROM set_input_parsial WHERE kd_pj = ? LIMIT 1", [resep.kd_pj]);
      if (!parsial[0]) throw new CopyResepError("Billing kunjungan sudah diverifikasi; resep tidak dapat dihapus.", 409);
    }
    const [hasil] = await connection.execute("DELETE FROM resep_obat WHERE no_resep = ?", [noResep]);
    if (!(hasil as { affectedRows?: number }).affectedRows) throw new CopyResepError("Resep tidak ditemukan.", 404);
    await connection.commit();
    return NextResponse.json({ success: true, message: `Resep ${noResep} berhasil dihapus.` });
  } catch (error) {
    if (connection) await connection.rollback().catch(() => undefined);
    const status = error instanceof CopyResepError ? error.status : 500;
    if (!(error instanceof CopyResepError)) console.error("API copy resep hapus gagal:", error);
    return NextResponse.json({ success: false, error: error instanceof CopyResepError ? error.message : "Resep gagal dihapus." }, { status });
  } finally {
    connection?.release();
  }
}

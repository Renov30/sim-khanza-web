import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { resepObatAccess } from "@/lib/farmasi/access";
import { isRegistrationDate } from "@/lib/registrasi/date";

interface TargetResep {
  no_rawat: string;
  no_rkm_medis: string;
  kd_dokter: string;
  kd_poli: string;
}

interface HeaderResep {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  status_asal: "ralan" | "ranap";
}

interface ItemResep {
  no_resep: string;
  jenis: "Obat" | "Racikan" | "Bahan Racikan";
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  kode_item: string;
  nama_item: string;
  no_racik: string;
}

class CopyResepError extends Error {
  constructor(message: string, readonly status = 400, readonly code?: string) {
    super(message);
  }
}

function teks(value: unknown, maksimum: number) {
  return typeof value === "string" ? value.trim().slice(0, maksimum) : "";
}

function gagal(error: unknown, fallback: string) {
  const status = error instanceof CopyResepError ? error.status : 500;
  if (!(error instanceof CopyResepError)) console.error("API copy resep gagal:", error);
  return NextResponse.json({
    success: false,
    error: error instanceof CopyResepError ? error.message : fallback,
    ...(error instanceof CopyResepError && error.code ? { code: error.code } : {}),
  }, { status });
}

async function targetResep(noRawat: string) {
  const rows = await executeQuery<TargetResep>(`
    SELECT r.no_rawat, r.no_rkm_medis, r.kd_dokter, r.kd_poli
    FROM reg_periksa r
    WHERE r.no_rawat = ? AND r.status_lanjut = 'Ralan'
    LIMIT 1
  `, [noRawat]);
  if (!rows[0]) throw new CopyResepError("Kunjungan rawat jalan tidak ditemukan.", 404);
  return rows[0];
}

async function daftarRiwayat(params: URLSearchParams) {
  const noRawat = teks(params.get("no_rawat"), 17);
  const cari = teks(params.get("cari"), 80);
  const pakaiTanggal = params.get("pakai_tanggal") === "1";
  const tanggalMulai = teks(params.get("tanggal_mulai"), 10);
  const tanggalSelesai = teks(params.get("tanggal_selesai"), 10);
  if (!noRawat) throw new CopyResepError("Pilih kunjungan tujuan terlebih dahulu.");
  if (pakaiTanggal && (!isRegistrationDate(tanggalMulai) || !isRegistrationDate(tanggalSelesai) || tanggalMulai > tanggalSelesai)) {
    throw new CopyResepError("Periode resep tidak valid.");
  }

  const target = await targetResep(noRawat);
  const where = [
    "r.no_rkm_medis = ?",
    "ro.kd_dokter = ?",
    "CAST(ro.tgl_peresepan AS CHAR) <> '0000-00-00'",
  ];
  const nilai: (string | number)[] = [target.no_rkm_medis, target.kd_dokter];
  if (pakaiTanggal) {
    where.push("ro.tgl_peresepan BETWEEN ? AND ?");
    nilai.push(tanggalMulai, tanggalSelesai);
  }
  if (cari) {
    where.push("(ro.no_resep LIKE ? OR ro.no_rawat LIKE ? OR p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)");
    nilai.push(...Array<string>(5).fill(`%${cari}%`));
  }

  const header = await executeQuery<HeaderResep>(`
    SELECT ro.no_resep, DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
           TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
           ro.no_rawat, p.no_rkm_medis, p.nm_pasien, ro.kd_dokter, d.nm_dokter,
           CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
           ro.status AS status_asal
    FROM resep_obat ro
    INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    WHERE ${where.join(" AND ")}
    ORDER BY ro.tgl_peresepan DESC, ro.jam_peresepan DESC, ro.no_resep DESC
    LIMIT 100
  `, nilai);

  if (header.length === 0) return NextResponse.json({ success: true, data: [], total: 0 });
  const nomorResep = header.map((item) => item.no_resep);
  const placeholders = nomorResep.map(() => "?").join(", ");
  const [obat, racikan, bahan] = await Promise.all([
    executeQuery<ItemResep>(`
      SELECT rd.no_resep, 'Obat' AS jenis, rd.jml AS jumlah, db.kode_sat AS satuan,
             rd.aturan_pakai, rd.kode_brng AS kode_item, db.nama_brng AS nama_item, '' AS no_racik
      FROM resep_dokter rd
      INNER JOIN databarang db ON db.kode_brng = rd.kode_brng
      WHERE rd.no_resep IN (${placeholders})
      ORDER BY rd.no_resep, db.kode_brng
    `, nomorResep),
    executeQuery<ItemResep>(`
      SELECT rr.no_resep, 'Racikan' AS jenis, rr.jml_dr AS jumlah, mr.nm_racik AS satuan,
             rr.aturan_pakai, CONCAT('No. Racik ', rr.no_racik) AS kode_item,
             rr.nama_racik AS nama_item, rr.no_racik
      FROM resep_dokter_racikan rr
      INNER JOIN metode_racik mr ON mr.kd_racik = rr.kd_racik
      WHERE rr.no_resep IN (${placeholders})
      ORDER BY rr.no_resep, rr.no_racik
    `, nomorResep),
    executeQuery<ItemResep>(`
      SELECT rrd.no_resep, 'Bahan Racikan' AS jenis, rrd.jml AS jumlah, db.kode_sat AS satuan,
             '' AS aturan_pakai, rrd.kode_brng AS kode_item, db.nama_brng AS nama_item, rrd.no_racik
      FROM resep_dokter_racikan_detail rrd
      INNER JOIN databarang db ON db.kode_brng = rrd.kode_brng
      WHERE rrd.no_resep IN (${placeholders})
      ORDER BY rrd.no_resep, rrd.no_racik, db.kode_brng
    `, nomorResep),
  ]);

  const items = [
    ...obat,
    ...racikan.flatMap((racik) => [
      racik,
      ...bahan.filter((detail) => detail.no_resep === racik.no_resep && detail.no_racik === racik.no_racik),
    ]),
  ];
  const data = header.map((item) => ({
    ...item,
    items: items.filter((detail) => detail.no_resep === item.no_resep),
  }));
  return NextResponse.json({ success: true, data, total: data.length });
}

async function draftResep(params: URLSearchParams) {
  const noRawat = teks(params.get("no_rawat"), 17);
  const noResep = teks(params.get("no_resep"), 14);
  if (!noRawat || !noResep) throw new CopyResepError("Kunjungan tujuan dan nomor resep wajib diisi.");
  const target = await targetResep(noRawat);
  const sumber = await executeQuery<HeaderResep>(`
    SELECT ro.no_resep, DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
           TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
           ro.no_rawat, rs.no_rkm_medis, p.nm_pasien, ro.kd_dokter, d.nm_dokter,
           CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
           ro.status AS status_asal
    FROM resep_obat ro
    INNER JOIN reg_periksa rs ON rs.no_rawat = ro.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = rs.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    WHERE ro.no_resep = ? AND rs.no_rkm_medis = ? AND ro.kd_dokter = ?
    LIMIT 1
  `, [noResep, target.no_rkm_medis, target.kd_dokter]);
  if (!sumber[0]) throw new CopyResepError("Resep sumber tidak ditemukan untuk pasien dan dokter tersebut.", 404);

  const depot = await executeQuery<{ kd_bangsal: string }>(`
    SELECT COALESCE(
      (SELECT sdr.kd_bangsal FROM set_depo_ralan sdr WHERE sdr.kd_poli = ? LIMIT 1),
      (SELECT sl.kd_bangsal FROM set_lokasi sl LIMIT 1)
    ) AS kd_bangsal
  `, [target.kd_poli]);
  const kdBangsal = depot[0]?.kd_bangsal;
  if (!kdBangsal) throw new CopyResepError("Depo obat rawat jalan belum dikonfigurasi.", 409, "DEPO_BELUM_DIATUR");

  const obat = await executeQuery(`
    SELECT db.kode_brng, db.nama_brng, db.kode_sat, COALESCE(j.nama, '-') AS jenis,
           db.letak_barang AS komposisi, db.ralan AS harga_ralan,
           COALESCE(i.nama_industri, '-') AS industri, db.kapasitas,
           COALESCE(stok.jumlah, 0) AS stok, rd.jml AS jumlah, rd.aturan_pakai,
           db.status AS status_barang
    FROM resep_dokter rd
    INNER JOIN databarang db ON db.kode_brng = rd.kode_brng
    LEFT JOIN jenis j ON j.kdjns = db.kdjns
    LEFT JOIN industrifarmasi i ON i.kode_industri = db.kode_industri
    LEFT JOIN (
      SELECT kode_brng, SUM(stok) AS jumlah FROM gudangbarang
      WHERE kd_bangsal = ? GROUP BY kode_brng
    ) stok ON stok.kode_brng = db.kode_brng
    WHERE rd.no_resep = ?
    ORDER BY db.nama_brng
  `, [kdBangsal, noResep]);
  const racikan = await executeQuery<{
    no_racik: string; nama_racik: string; kd_racik: string; jumlah: number | string;
    aturan_pakai: string; keterangan: string;
  }>(`
    SELECT rr.no_racik, rr.nama_racik, rr.kd_racik, rr.jml_dr AS jumlah,
           rr.aturan_pakai, rr.keterangan
    FROM resep_dokter_racikan rr
    WHERE rr.no_resep = ? ORDER BY rr.no_racik
  `, [noResep]);
  const detail = await executeQuery(`
    SELECT rrd.no_racik, db.kode_brng, db.nama_brng, db.kode_sat,
           COALESCE(j.nama, '-') AS jenis, db.letak_barang AS komposisi,
           db.ralan AS harga_ralan, COALESCE(i.nama_industri, '-') AS industri,
           db.kapasitas, COALESCE(stok.jumlah, 0) AS stok, rrd.p1, rrd.p2,
           rrd.kandungan, rrd.jml AS jumlah, db.status AS status_barang
    FROM resep_dokter_racikan_detail rrd
    INNER JOIN databarang db ON db.kode_brng = rrd.kode_brng
    LEFT JOIN jenis j ON j.kdjns = db.kdjns
    LEFT JOIN industrifarmasi i ON i.kode_industri = db.kode_industri
    LEFT JOIN (
      SELECT kode_brng, SUM(stok) AS jumlah FROM gudangbarang
      WHERE kd_bangsal = ? GROUP BY kode_brng
    ) stok ON stok.kode_brng = db.kode_brng
    WHERE rrd.no_resep = ?
    ORDER BY rrd.no_racik, db.nama_brng
  `, [kdBangsal, noResep]);

  return NextResponse.json({
    success: true,
    data: {
      sumber: sumber[0],
      obat,
      racikan: racikan.map((item) => ({
        ...item,
        detail: detail.filter((baris) => (baris as { no_racik: string }).no_racik === item.no_racik),
      })),
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const denied = await resepObatAccess();
    if (denied) return denied;
    const resource = req.nextUrl.searchParams.get("resource") || "riwayat";
    if (resource === "riwayat") return await daftarRiwayat(req.nextUrl.searchParams);
    if (resource === "draft") return await draftResep(req.nextUrl.searchParams);
    throw new CopyResepError("Jenis data copy resep tidak valid.");
  } catch (error) {
    return gagal(error, "Gagal memuat data copy resep.");
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await resepObatAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body: unknown = await req.json();
    const input = body && typeof body === "object" ? body as Record<string, unknown> : {};
    const noResep = teks(input.no_resep, 14);
    const noRawatTujuan = teks(input.no_rawat_tujuan, 17);
    if (!noResep || !noRawatTujuan) throw new CopyResepError("Nomor resep dan kunjungan tujuan wajib diisi.");

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute<(RowDataPacket & {
      no_resep: string; status_bayar: string; kd_pj: string; tervalidasi: number;
    })[]>(`
      SELECT ro.no_resep, rs.status_bayar, rs.kd_pj,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00' THEN 0 ELSE 1 END AS tervalidasi
      FROM resep_obat ro
      INNER JOIN reg_periksa rs ON rs.no_rawat = ro.no_rawat
      INNER JOIN reg_periksa rt ON rt.no_rawat = ? AND rt.status_lanjut = 'Ralan'
      WHERE ro.no_resep = ? AND rs.no_rkm_medis = rt.no_rkm_medis AND ro.kd_dokter = rt.kd_dokter
      FOR UPDATE
    `, [noRawatTujuan, noResep]);
    const resep = rows[0];
    if (!resep) throw new CopyResepError("Resep tidak ditemukan untuk pasien dan dokter tersebut.", 404);
    if (Number(resep.tervalidasi)) throw new CopyResepError("Resep sudah tervalidasi dan tidak dapat dihapus.", 409, "RESEP_SUDAH_VALIDASI");
    if (resep.status_bayar === "Sudah Bayar") {
      const [parsial] = await connection.execute<RowDataPacket[]>(
        "SELECT kd_pj FROM set_input_parsial WHERE kd_pj = ? LIMIT 1",
        [resep.kd_pj],
      );
      if (!parsial[0]) throw new CopyResepError("Billing kunjungan sudah diverifikasi; resep tidak dapat dihapus.", 409);
    }
    const [hasil] = await connection.execute("DELETE FROM resep_obat WHERE no_resep = ?", [noResep]);
    if (!(hasil as { affectedRows?: number }).affectedRows) throw new CopyResepError("Resep tidak ditemukan.", 404);
    await connection.commit();
    return NextResponse.json({ success: true, data: { no_resep: noResep }, message: `Resep ${noResep} berhasil dihapus.` });
  } catch (error) {
    if (connection) await connection.rollback().catch(() => undefined);
    return gagal(error, "Resep gagal dihapus.");
  } finally {
    connection?.release();
  }
}

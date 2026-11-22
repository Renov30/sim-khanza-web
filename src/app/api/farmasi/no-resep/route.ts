import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { validasiObatAccess } from "@/lib/farmasi/access";
import { isRegistrationDate } from "@/lib/registrasi/date";

interface HeaderNoResep {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: "ralan" | "ranap";
  jenis_bayar: string;
  tgl_resep: string;
  jam_resep: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
}

interface ObatNoResep {
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  harga: number | string;
  embalase: number | string;
  tuslah: number | string;
  total: number | string;
  aturan_pakai: string;
}

interface RacikanNoResep {
  no_racik: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
}

interface BahanRacikanNoResep extends ObatNoResep {
  no_racik: string;
}

interface ObatDaftarNoResep extends ObatNoResep {
  no_resep: string;
}

interface RacikanDaftarNoResep extends RacikanNoResep {
  no_resep: string;
}

interface BahanDaftarNoResep extends BahanRacikanNoResep {
  no_resep: string;
}

interface JumlahRow {
  total: number | string;
}

function gabungkanDetail(
  obat: ObatNoResep[],
  racikan: RacikanNoResep[],
  bahan: BahanRacikanNoResep[],
) {
  return [
    ...obat.map((item) => ({ ...item, jenis_item: "Obat" as const, no_racik: "", keterangan: "" })),
    ...racikan.flatMap((item) => [
      {
        ...item,
        jenis_item: "Racikan" as const,
        kode_item: `Racikan ${item.no_racik}`,
        harga: 0,
        embalase: 0,
        tuslah: 0,
        total: bahan.filter((baris) => baris.no_racik === item.no_racik)
          .reduce((jumlah, baris) => jumlah + Number(baris.total || 0), 0),
      },
      ...bahan.filter((baris) => baris.no_racik === item.no_racik)
        .map((baris) => ({ ...baris, jenis_item: "Bahan Racikan" as const, keterangan: "" })),
    ]),
  ];
}

function tabelHeaderTerpilih(headers: HeaderNoResep[]) {
  const sql = headers.map((_, indeks) => `${indeks === 0 ? "SELECT" : "UNION ALL SELECT"}
    CAST(? AS CHAR(14)) AS no_resep,
    CAST(? AS CHAR(17)) AS no_rawat,
    CAST(? AS DATE) AS tgl_resep,
    CAST(? AS TIME) AS jam_resep`).join("\n");
  const params = headers.flatMap((header) => [
    header.no_resep,
    header.no_rawat,
    header.tgl_resep,
    header.jam_resep,
  ]);
  return { sql, params };
}

async function daftarNoResep(searchParams: URLSearchParams) {
  const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
  const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
  const cari = searchParams.get("cari")?.trim() || "";
  const limit = Math.max(1, Math.min(Math.trunc(Number(searchParams.get("limit"))) || 50, 100));
  const page = Math.max(1, Math.trunc(Number(searchParams.get("page"))) || 1);

  if (!isRegistrationDate(tanggalMulai)
    || !isRegistrationDate(tanggalSelesai)
    || tanggalMulai > tanggalSelesai
    || cari.length > 100) {
    return NextResponse.json({ success: false, error: "Filter nomor resep tidak valid." }, { status: 400 });
  }

  const where = [
    "ro.tgl_perawatan IS NOT NULL",
    "CAST(ro.tgl_perawatan AS CHAR) <> '0000-00-00'",
    "ro.tgl_perawatan BETWEEN ? AND ?",
  ];
  const params: (string | number)[] = [tanggalMulai, tanggalSelesai];
  if (cari) {
    where.push(`(ro.no_resep LIKE ? OR ro.no_rawat LIKE ? OR r.no_rkm_medis LIKE ?
      OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?)`);
    params.push(...Array<string>(5).fill(`%${cari}%`));
  }

  const fromSql = `
    FROM resep_obat ro
    INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
    INNER JOIN penjab pj ON pj.kd_pj = r.kd_pj
  `;
  const whereSql = `WHERE ${where.join(" AND ")}`;
  const selectSql = `
    SELECT ro.no_resep, ro.no_rawat, r.no_rkm_medis, p.nm_pasien,
           ro.kd_dokter, d.nm_dokter, ro.status AS jenis, pj.png_jawab AS jenis_bayar,
           DATE_FORMAT(ro.tgl_perawatan, '%Y-%m-%d') AS tgl_resep,
           TIME_FORMAT(ro.jam, '%H:%i:%s') AS jam_resep,
           'Sudah Terlayani' AS status_pelayanan
    ${fromSql}
    ${whereSql}
    ORDER BY ro.tgl_perawatan, ro.jam, ro.no_resep
    LIMIT ? OFFSET ?
  `;
  const countSql = `SELECT COUNT(*) AS total ${fromSql} ${whereSql}`;
  const [jumlahRows, rowsAwal] = await Promise.all([
    executeQuery<JumlahRow>(countSql, params),
    executeQuery<HeaderNoResep>(selectSql, [...params, limit, (page - 1) * limit]),
  ]);
  const total = Number(jumlahRows[0]?.total || 0);
  const halamanTerakhir = Math.max(1, Math.ceil(total / limit));
  const halamanAktif = Math.min(page, halamanTerakhir);
  const headers = halamanAktif === page
    ? rowsAwal
    : await executeQuery<HeaderNoResep>(selectSql, [...params, limit, (halamanAktif - 1) * limit]);

  if (headers.length === 0) {
    return NextResponse.json({
      success: true,
      data: { items: [], total, page: halamanAktif, limit },
    });
  }

  const headerTerpilih = tabelHeaderTerpilih(headers);
  const [obat, racikan, bahan] = await Promise.all([
    executeQuery<ObatDaftarNoResep>(`
      SELECT h.no_resep, dpo.kode_brng AS kode_item, db.nama_brng AS nama_item,
             SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
             MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
             SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total,
             COALESCE(MAX(ap.aturan), '') AS aturan_pakai
      FROM (${headerTerpilih.sql}) h
      INNER JOIN detail_pemberian_obat dpo ON dpo.no_rawat = h.no_rawat
        AND dpo.tgl_perawatan = h.tgl_resep AND dpo.jam = h.jam_resep
      INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
      LEFT JOIN detail_obat_racikan dor ON dor.tgl_perawatan = dpo.tgl_perawatan
        AND dor.jam = dpo.jam AND dor.no_rawat = dpo.no_rawat AND dor.kode_brng = dpo.kode_brng
      LEFT JOIN aturan_pakai ap ON ap.tgl_perawatan = dpo.tgl_perawatan
        AND ap.jam = dpo.jam AND ap.no_rawat = dpo.no_rawat AND ap.kode_brng = dpo.kode_brng
      WHERE dor.kode_brng IS NULL
      GROUP BY h.no_resep, dpo.kode_brng, db.nama_brng, db.kode_sat
      ORDER BY h.no_resep, db.nama_brng
    `, headerTerpilih.params),
    executeQuery<RacikanDaftarNoResep>(`
      SELECT h.no_resep, CAST(ob.no_racik AS CHAR) AS no_racik, ob.nama_racik AS nama_item,
             ob.jml_dr AS jumlah, mr.nm_racik AS satuan,
             ob.aturan_pakai, ob.keterangan
      FROM (${headerTerpilih.sql}) h
      INNER JOIN obat_racikan ob ON ob.no_rawat = h.no_rawat
        AND ob.tgl_perawatan = h.tgl_resep AND ob.jam = h.jam_resep
      INNER JOIN metode_racik mr ON mr.kd_racik = ob.kd_racik
      ORDER BY h.no_resep, ob.no_racik
    `, headerTerpilih.params),
    executeQuery<BahanDaftarNoResep>(`
      SELECT h.no_resep, CAST(dor.no_racik AS CHAR) AS no_racik,
             dpo.kode_brng AS kode_item, db.nama_brng AS nama_item,
             SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
             MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
             SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total,
             '' AS aturan_pakai
      FROM (${headerTerpilih.sql}) h
      INNER JOIN detail_obat_racikan dor ON dor.no_rawat = h.no_rawat
        AND dor.tgl_perawatan = h.tgl_resep AND dor.jam = h.jam_resep
      INNER JOIN detail_pemberian_obat dpo ON dpo.tgl_perawatan = dor.tgl_perawatan
        AND dpo.jam = dor.jam AND dpo.no_rawat = dor.no_rawat AND dpo.kode_brng = dor.kode_brng
      INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
      GROUP BY h.no_resep, dor.no_racik, dpo.kode_brng, db.nama_brng, db.kode_sat
      ORDER BY h.no_resep, dor.no_racik, db.nama_brng
    `, headerTerpilih.params),
  ]);

  const items = headers.map((header) => ({
    header,
    detail: gabungkanDetail(
      obat.filter((item) => item.no_resep === header.no_resep),
      racikan.filter((item) => item.no_resep === header.no_resep),
      bahan.filter((item) => item.no_resep === header.no_resep),
    ),
  }));

  return NextResponse.json({
    success: true,
    data: { items, total, page: halamanAktif, limit },
  });
}

export async function GET(req: NextRequest) {
  const denied = await validasiObatAccess();
  if (denied) return denied;

  const searchParams = new URL(req.url).searchParams;
  const noResep = (searchParams.get("no_resep") || "").trim();
  if (!noResep) {
    try {
      return await daftarNoResep(searchParams);
    } catch (error) {
      console.error("Error in api/farmasi/no-resep list:", error);
      return NextResponse.json({ success: false, error: "Gagal memuat daftar nomor resep." }, { status: 500 });
    }
  }
  if (!/^[A-Za-z0-9_-]{1,14}$/.test(noResep)) {
    return NextResponse.json({ success: false, error: "Nomor resep tidak valid." }, { status: 400 });
  }

  try {
    const headers = await executeQuery<HeaderNoResep>(`
      SELECT ro.no_resep, ro.no_rawat, r.no_rkm_medis, p.nm_pasien,
             ro.kd_dokter, d.nm_dokter, ro.status AS jenis, pj.png_jawab AS jenis_bayar,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d')
                  ELSE DATE_FORMAT(ro.tgl_perawatan, '%Y-%m-%d') END AS tgl_resep,
             CASE WHEN ro.jam IS NULL OR CAST(ro.jam AS CHAR) = '00:00:00'
                  THEN TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s')
                  ELSE TIME_FORMAT(ro.jam, '%H:%i:%s') END AS jam_resep,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan
      FROM resep_obat ro
      INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
      INNER JOIN penjab pj ON pj.kd_pj = r.kd_pj
      WHERE ro.no_resep = ?
      LIMIT 1
    `, [noResep]);
    const header = headers[0];
    if (!header) {
      return NextResponse.json({ success: false, error: "Nomor resep tidak ditemukan." }, { status: 404 });
    }

    const [obat, racikan, bahan] = await Promise.all([
      executeQuery<ObatNoResep>(`
        SELECT dpo.kode_brng AS kode_item, db.nama_brng AS nama_item,
               SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
               MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
               SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total,
               COALESCE(MAX(ap.aturan), '') AS aturan_pakai
        FROM detail_pemberian_obat dpo
        INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
        LEFT JOIN detail_obat_racikan dor ON dor.tgl_perawatan = dpo.tgl_perawatan
          AND dor.jam = dpo.jam AND dor.no_rawat = dpo.no_rawat AND dor.kode_brng = dpo.kode_brng
        LEFT JOIN aturan_pakai ap ON ap.tgl_perawatan = dpo.tgl_perawatan
          AND ap.jam = dpo.jam AND ap.no_rawat = dpo.no_rawat AND ap.kode_brng = dpo.kode_brng
        WHERE dpo.no_rawat = ? AND dpo.tgl_perawatan = ? AND dpo.jam = ? AND dor.kode_brng IS NULL
        GROUP BY dpo.kode_brng, db.nama_brng, db.kode_sat
        ORDER BY db.nama_brng
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
      executeQuery<RacikanNoResep>(`
        SELECT CAST(ob.no_racik AS CHAR) AS no_racik, ob.nama_racik AS nama_item,
               ob.jml_dr AS jumlah, mr.nm_racik AS satuan,
               ob.aturan_pakai, ob.keterangan
        FROM obat_racikan ob
        INNER JOIN metode_racik mr ON mr.kd_racik = ob.kd_racik
        WHERE ob.no_rawat = ? AND ob.tgl_perawatan = ? AND ob.jam = ?
        ORDER BY ob.no_racik
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
      executeQuery<BahanRacikanNoResep>(`
        SELECT CAST(dor.no_racik AS CHAR) AS no_racik, dpo.kode_brng AS kode_item,
               db.nama_brng AS nama_item, SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
               MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
               SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total, '' AS aturan_pakai
        FROM detail_obat_racikan dor
        INNER JOIN detail_pemberian_obat dpo ON dpo.tgl_perawatan = dor.tgl_perawatan
          AND dpo.jam = dor.jam AND dpo.no_rawat = dor.no_rawat AND dpo.kode_brng = dor.kode_brng
        INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
        WHERE dor.no_rawat = ? AND dor.tgl_perawatan = ? AND dor.jam = ?
        GROUP BY dor.no_racik, dpo.kode_brng, db.nama_brng, db.kode_sat
        ORDER BY dor.no_racik, db.nama_brng
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
    ]);

    const detail = gabungkanDetail(obat, racikan, bahan);

    return NextResponse.json({ success: true, data: { header, detail } });
  } catch (error) {
    console.error("Error in api/farmasi/no-resep:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat data nomor resep." }, { status: 500 });
  }
}

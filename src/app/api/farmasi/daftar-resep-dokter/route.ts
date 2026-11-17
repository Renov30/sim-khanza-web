import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { resepObatAccess } from "@/lib/farmasi/access";
import { isRegistrationDate } from "@/lib/registrasi/date";

type JenisPerawatan = "ralan" | "ranap";
type TampilanData = "ringkasan" | "detail";
type StatusPelayanan = "Belum Terlayani" | "Sudah Terlayani";

interface ResepRingkasanRow {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: StatusPelayanan;
  kd_unit: string;
  nm_unit: string;
  jenis_bayar: string;
  tgl_validasi: string;
  jam_validasi: string;
  tgl_penyerahan: string;
  jam_penyerahan: string;
}

interface ObatNonracikanRow {
  no_resep: string;
  kode_brng: string;
  nama_brng: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
}

interface ObatRacikanRow {
  no_resep: string;
  no_racik: string;
  nama_racik: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
}

interface BahanRacikanRow {
  no_resep: string;
  no_racik: string;
  kode_brng: string;
  nama_brng: string;
  jumlah: number | string;
  satuan: string;
}

interface ResepDetailRow extends ResepRingkasanRow {
  jenis_item: "Nonracikan" | "Racikan" | "Bahan Racikan" | "Tanpa Item";
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
  no_racik: string;
}

const STATUS_DIIJINKAN = ["Semua", "Belum Terlayani", "Sudah Terlayani"] as const;

const RUANG_AKTIF_SQL = `
  INNER JOIN (
    SELECT lokasi.no_rawat, MAX(lokasi.kd_bangsal) AS kd_unit, MAX(lokasi.nm_bangsal) AS nm_unit
    FROM (
      SELECT ki.no_rawat, k.kd_bangsal, b.nm_bangsal
      FROM kamar_inap ki
      INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
      INNER JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
      WHERE ki.stts_pulang = '-'
      UNION ALL
      SELECT rg.no_rawat2 AS no_rawat, k.kd_bangsal, b.nm_bangsal
      FROM ranap_gabung rg
      INNER JOIN kamar_inap ki ON ki.no_rawat = rg.no_rawat
      INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
      INNER JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
      WHERE ki.stts_pulang = '-'
    ) lokasi
    GROUP BY lokasi.no_rawat
  ) unit_perawatan ON unit_perawatan.no_rawat = ro.no_rawat
`;

function unitPerawatan(jenis: JenisPerawatan) {
  if (jenis === "ralan") {
    return {
      join: "INNER JOIN poliklinik unit_perawatan ON unit_perawatan.kd_poli = r.kd_poli",
      kode: "unit_perawatan.kd_poli",
      nama: "unit_perawatan.nm_poli",
    };
  }
  return {
    join: RUANG_AKTIF_SQL,
    kode: "unit_perawatan.kd_unit",
    nama: "unit_perawatan.nm_unit",
  };
}

function gabungkanDetail(
  resep: ResepRingkasanRow[],
  nonracikan: ObatNonracikanRow[],
  racikan: ObatRacikanRow[],
  bahanRacikan: BahanRacikanRow[],
): ResepDetailRow[] {
  return resep.flatMap((header) => {
    const item: ResepDetailRow[] = [];

    for (const obat of nonracikan) {
      if (obat.no_resep !== header.no_resep) continue;
      item.push({
        ...header,
        jenis_item: "Nonracikan",
        kode_item: obat.kode_brng,
        nama_item: obat.nama_brng,
        jumlah: obat.jumlah,
        satuan: obat.satuan,
        aturan_pakai: obat.aturan_pakai,
        keterangan: "",
        no_racik: "",
      });
    }

    for (const racik of racikan) {
      if (racik.no_resep !== header.no_resep) continue;
      item.push({
        ...header,
        jenis_item: "Racikan",
        kode_item: `Racikan ${racik.no_racik}`,
        nama_item: racik.nama_racik,
        jumlah: racik.jumlah,
        satuan: racik.satuan,
        aturan_pakai: racik.aturan_pakai,
        keterangan: racik.keterangan,
        no_racik: racik.no_racik,
      });

      for (const bahan of bahanRacikan) {
        if (bahan.no_resep !== header.no_resep || bahan.no_racik !== racik.no_racik) continue;
        item.push({
          ...header,
          jenis_item: "Bahan Racikan",
          kode_item: bahan.kode_brng,
          nama_item: bahan.nama_brng,
          jumlah: bahan.jumlah,
          satuan: bahan.satuan,
          aturan_pakai: "",
          keterangan: "",
          no_racik: bahan.no_racik,
        });
      }
    }

    if (item.length > 0) return item;
    return [{
      ...header,
      jenis_item: "Tanpa Item",
      kode_item: "",
      nama_item: "Belum ada rincian obat",
      jumlah: "",
      satuan: "",
      aturan_pakai: "",
      keterangan: "",
      no_racik: "",
    }];
  });
}

export async function GET(req: NextRequest) {
  try {
    const denied = await resepObatAccess();
    if (denied) return denied;

    const { searchParams } = new URL(req.url);
    const jenis = (searchParams.get("jenis") || "ralan") as JenisPerawatan;
    const tampilan = (searchParams.get("tampilan") || "ringkasan") as TampilanData;
    const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
    const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
    const status = searchParams.get("status") || "Semua";
    const dokter = searchParams.get("dokter")?.trim() || "";
    const unit = searchParams.get("unit")?.trim() || "";
    const cari = searchParams.get("cari")?.trim() || "";
    const limit = Math.max(1, Math.min(Math.trunc(Number(searchParams.get("limit"))) || 100, 100));
    const page = Math.max(1, Math.trunc(Number(searchParams.get("page"))) || 1);

    const filterValid = ["ralan", "ranap"].includes(jenis)
      && ["ringkasan", "detail"].includes(tampilan)
      && STATUS_DIIJINKAN.includes(status as (typeof STATUS_DIIJINKAN)[number])
      && (!tanggalMulai || isRegistrationDate(tanggalMulai))
      && (!tanggalSelesai || isRegistrationDate(tanggalSelesai))
      && (!tanggalMulai || !tanggalSelesai || tanggalMulai <= tanggalSelesai);

    if (!filterValid) {
      return NextResponse.json({ success: false, error: "Filter daftar resep dokter tidak valid." }, { status: 400 });
    }

    const unitSql = unitPerawatan(jenis);
    const where = [
      "ro.status = ?",
      "CAST(ro.tgl_peresepan AS CHAR) <> '0000-00-00'",
    ];
    const params: (string | number)[] = [jenis];

    if (tanggalMulai) { where.push("ro.tgl_peresepan >= ?"); params.push(tanggalMulai); }
    if (tanggalSelesai) { where.push("ro.tgl_peresepan <= ?"); params.push(tanggalSelesai); }
    if (dokter) { where.push("d.nm_dokter LIKE ?"); params.push(`%${dokter}%`); }
    if (unit) { where.push(`${unitSql.nama} LIKE ?`); params.push(`%${unit}%`); }
    if (status === "Belum Terlayani") {
      where.push("(ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00')");
    } else if (status === "Sudah Terlayani") {
      where.push("ro.tgl_perawatan IS NOT NULL AND CAST(ro.tgl_perawatan AS CHAR) <> '0000-00-00'");
    }
    if (cari) {
      where.push(`(ro.no_resep LIKE ? OR ro.no_rawat LIKE ? OR r.no_rkm_medis LIKE ?
        OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ? OR ${unitSql.nama} LIKE ? OR pj.png_jawab LIKE ?)`);
      params.push(...Array<string>(7).fill(`%${cari}%`));
    }

    const fromSql = `
      FROM resep_obat ro
      INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
      INNER JOIN penjab pj ON pj.kd_pj = r.kd_pj
      ${unitSql.join}
    `;
    const whereSql = `WHERE ${where.join(" AND ")}`;
    const selectSql = `
      SELECT ro.no_resep,
             DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
             TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
             ro.no_rawat, r.no_rkm_medis, p.nm_pasien, ro.kd_dokter, d.nm_dokter,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
             ${unitSql.kode} AS kd_unit, ${unitSql.nama} AS nm_unit, pj.png_jawab AS jenis_bayar,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN '' ELSE DATE_FORMAT(ro.tgl_perawatan, '%Y-%m-%d') END AS tgl_validasi,
             CASE WHEN ro.jam IS NULL OR CAST(ro.jam AS CHAR) = '00:00:00'
                  THEN '' ELSE TIME_FORMAT(ro.jam, '%H:%i:%s') END AS jam_validasi,
             ${jenis === "ralan" ? `CASE WHEN ro.tgl_penyerahan IS NULL OR CAST(ro.tgl_penyerahan AS CHAR) = '0000-00-00'
                  THEN '' ELSE DATE_FORMAT(ro.tgl_penyerahan, '%Y-%m-%d') END` : "''"} AS tgl_penyerahan,
             ${jenis === "ralan" ? `CASE WHEN ro.jam_penyerahan IS NULL OR CAST(ro.jam_penyerahan AS CHAR) = '00:00:00'
                  THEN '' ELSE TIME_FORMAT(ro.jam_penyerahan, '%H:%i:%s') END` : "''"} AS jam_penyerahan
      ${fromSql}
      ${whereSql}
      ORDER BY ro.tgl_peresepan DESC, ro.jam_peresepan DESC, ro.no_resep DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = `SELECT COUNT(*) AS total ${fromSql} ${whereSql}`;
    const offset = (page - 1) * limit;

    const [counts, rowsAwal] = await Promise.all([
      executeQuery<{ total: number | string }>(countSql, params),
      executeQuery<ResepRingkasanRow>(selectSql, [...params, limit, offset]),
    ]);
    const total = Number(counts[0]?.total || 0);
    const halamanTerakhir = Math.max(1, Math.ceil(total / limit));
    const halamanAktif = Math.min(page, halamanTerakhir);
    const rows = halamanAktif === page
      ? rowsAwal
      : await executeQuery<ResepRingkasanRow>(selectSql, [...params, limit, (halamanAktif - 1) * limit]);

    if (tampilan === "ringkasan" || rows.length === 0) {
      return NextResponse.json({ success: true, data: rows, total, page: halamanAktif, limit });
    }

    const nomorResep = rows.map((row) => row.no_resep);
    const placeholders = nomorResep.map(() => "?").join(", ");
    const [nonracikan, racikan, bahanRacikan] = await Promise.all([
      executeQuery<ObatNonracikanRow>(`
        SELECT rd.no_resep, rd.kode_brng, b.nama_brng, rd.jml AS jumlah,
               b.kode_sat AS satuan, rd.aturan_pakai
        FROM resep_dokter rd
        INNER JOIN databarang b ON b.kode_brng = rd.kode_brng
        WHERE rd.no_resep IN (${placeholders})
        ORDER BY rd.no_resep, rd.kode_brng
      `, nomorResep),
      executeQuery<ObatRacikanRow>(`
        SELECT rr.no_resep, CAST(rr.no_racik AS CHAR) AS no_racik, rr.nama_racik,
               rr.jml_dr AS jumlah, mr.nm_racik AS satuan, rr.aturan_pakai, rr.keterangan
        FROM resep_dokter_racikan rr
        INNER JOIN metode_racik mr ON mr.kd_racik = rr.kd_racik
        WHERE rr.no_resep IN (${placeholders})
        ORDER BY rr.no_resep, rr.no_racik
      `, nomorResep),
      executeQuery<BahanRacikanRow>(`
        SELECT rrd.no_resep, CAST(rrd.no_racik AS CHAR) AS no_racik, rrd.kode_brng,
               b.nama_brng, rrd.jml AS jumlah, b.kode_sat AS satuan
        FROM resep_dokter_racikan_detail rrd
        INNER JOIN databarang b ON b.kode_brng = rrd.kode_brng
        WHERE rrd.no_resep IN (${placeholders})
        ORDER BY rrd.no_resep, rrd.no_racik, rrd.kode_brng
      `, nomorResep),
    ]);

    return NextResponse.json({
      success: true,
      data: gabungkanDetail(rows, nonracikan, racikan, bahanRacikan),
      total,
      page: halamanAktif,
      limit,
    });
  } catch (error: unknown) {
    console.error("Error in api/farmasi/daftar-resep-dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data daftar resep dokter." },
      { status: 500 },
    );
  }
}

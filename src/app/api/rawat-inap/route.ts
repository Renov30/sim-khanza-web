import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

const MODE_FILTER = ["semua", "belum", "masuk", "pulang"] as const;
const STATUS_PULANG = [
  "-", "Sehat", "Rujuk", "APS", "+", "Meninggal", "Sembuh", "Membaik",
  "Pulang Paksa", "Status Belum Lengkap", "Atas Persetujuan Dokter",
  "Atas Permintaan Sendiri", "Isoman", "Lain-lain",
] as const;
const STATUS_BAYAR = ["Semua", "Sudah Bayar", "Belum Bayar"] as const;

type ModeFilter = (typeof MODE_FILTER)[number];

function tanggalValid(nilai: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nilai)) return false;
  const tanggal = new Date(`${nilai}T00:00:00Z`);
  return !Number.isNaN(tanggal.getTime()) && tanggal.toISOString().slice(0, 10) === nilai;
}

function responsTidakValid(pesan: string) {
  return NextResponse.json({ success: false, error: pesan, code: "INVALID_FILTER" }, { status: 400 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cari = (searchParams.get("cari") || "").trim();
    const bangsal = (searchParams.get("bangsal") || "").trim();
    const mode = (searchParams.get("mode") || "belum") as ModeFilter;
    const statusPulang = searchParams.get("status_pulang") || "Semua";
    const statusBayar = (searchParams.get("status_bayar") || "Semua") as (typeof STATUS_BAYAR)[number];
    const filterSep = searchParams.get("sep") || "Semua";
    const tanggalMulai = searchParams.get("tanggal_mulai") || "";
    const tanggalSelesai = searchParams.get("tanggal_selesai") || "";
    const pageParameter = searchParams.get("page");
    const limitParameter = searchParams.get("limit");
    const page = pageParameter === null ? 1 : Number(pageParameter);
    const limit = limitParameter === null ? 100 : Number(limitParameter);

    if (!MODE_FILTER.includes(mode)) return responsTidakValid("Mode filter tidak dikenal");
    if (!STATUS_BAYAR.includes(statusBayar)) return responsTidakValid("Status bayar tidak dikenal");
    if (statusPulang !== "Semua" && !STATUS_PULANG.includes(statusPulang as (typeof STATUS_PULANG)[number])) {
      return responsTidakValid("Status pulang tidak dikenal");
    }
    if (cari.length > 100 || bangsal.length > 100) return responsTidakValid("Pencarian terlalu panjang");
    if (!Number.isInteger(page) || page < 1 || page > 1_000_000) return responsTidakValid("Halaman data tidak valid");
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) return responsTidakValid("Batas data tidak valid");

    if (mode === "masuk" || mode === "pulang") {
      if (!tanggalValid(tanggalMulai) || !tanggalValid(tanggalSelesai)) {
        return responsTidakValid("Tanggal filter tidak valid");
      }
      if (tanggalMulai > tanggalSelesai) return responsTidakValid("Rentang tanggal tidak valid");
    }

    const where: string[] = [];
    const params: (string | number)[] = [];

    if (mode === "belum") where.push("ki.stts_pulang = '-'");
    if (mode === "masuk") {
      where.push("ki.tgl_masuk BETWEEN ? AND ?");
      params.push(tanggalMulai, tanggalSelesai);
    }
    if (mode === "pulang") {
      where.push("ki.tgl_keluar BETWEEN ? AND ?");
      params.push(tanggalMulai, tanggalSelesai);
    }
    if (statusPulang !== "Semua") {
      where.push("ki.stts_pulang = ?");
      params.push(statusPulang);
    }
    if (statusBayar !== "Semua") {
      where.push("r.status_bayar LIKE ?");
      params.push(`%${statusBayar}%`);
    }
    if (filterSep === "Sudah") {
      where.push("EXISTS (SELECT 1 FROM bridging_sep bs WHERE bs.no_rawat = ki.no_rawat)");
    } else if (filterSep === "Belum") {
      where.push("NOT EXISTS (SELECT 1 FROM bridging_sep bs WHERE bs.no_rawat = ki.no_rawat)");
    }
    if (bangsal) {
      where.push("b.nm_bangsal LIKE ?");
      params.push(`%${bangsal}%`);
    }
    if (cari) {
      where.push(`(
        ki.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR p.alamat LIKE ?
        OR ki.kd_kamar LIKE ? OR b.nm_bangsal LIKE ? OR ki.diagnosa_awal LIKE ?
        OR ki.diagnosa_akhir LIKE ? OR ki.tgl_masuk LIKE ? OR d.nm_dokter LIKE ?
        OR ki.stts_pulang LIKE ? OR ki.tgl_keluar LIKE ? OR r.png_jawab LIKE ?
      )`);
      const kata = `%${cari}%`;
      params.push(kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata);
    }

    const sumber = `
      FROM kamar_inap ki
      INNER JOIN reg_periksa r ON ki.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN kamar k ON ki.kd_kamar = k.kd_kamar
      LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
      LEFT JOIN dokter d ON r.kd_dokter = d.kd_dokter
    `;
    const klausa = where.length ? ` WHERE ${where.join(" AND ")}` : "";

    const hitung = await executeQuery<{ total: number }>(`SELECT COUNT(*) AS total ${sumber}${klausa}`, params);
    const total = Number(hitung[0]?.total || 0);

    const sql = `
      SELECT ki.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, p.alamat,
             r.p_jawab, r.hubunganpj, r.status_bayar,
             ki.kd_kamar, b.nm_bangsal, ki.trf_kamar,
             ki.diagnosa_awal, ki.diagnosa_akhir,
             DATE_FORMAT(ki.tgl_masuk, '%Y-%m-%d') as tgl_masuk, ki.jam_masuk,
             DATE_FORMAT(ki.tgl_keluar, '%Y-%m-%d') as tgl_keluar, ki.jam_keluar,
             ki.ttl_biaya, ki.stts_pulang, ki.lama,
             d.nm_dokter
      ${sumber}${klausa}
      ORDER BY b.nm_bangsal, ki.tgl_masuk, ki.jam_masuk, ki.no_rawat, ki.kd_kamar
      LIMIT ? OFFSET ?
    `;
    const offset = (page - 1) * limit;
    const rows = await executeQuery<Record<string, unknown>>(sql, [...params, limit, offset]);
    const currentPage = Math.min(page, Math.max(1, Math.ceil(total / limit)));

    if (currentPage !== page) {
      const rowsUlang = await executeQuery<Record<string, unknown>>(sql, [...params, limit, (currentPage - 1) * limit]);
      return NextResponse.json({ success: true, data: rowsUlang, total, page: currentPage, limit });
    }

    return NextResponse.json({ success: true, data: rows, total, page: currentPage, limit });
  } catch (error: unknown) {
    console.error("Error in api/rawat-inap:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data rawat inap", code: "RAWAT_INAP_ERROR" },
      { status: 500 }
    );
  }
}

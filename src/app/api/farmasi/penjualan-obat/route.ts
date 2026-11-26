import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

const STATUS_DIIJINKAN = new Set(["Semua", "Belum Bayar", "Sudah Bayar"]);

function nilaiPencarian(nilai: string | null) {
  return nilai?.trim() ?? "";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = nilaiPencarian(searchParams.get("status")) || "Semua";
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 50, 1), 100);
    const filter = Object.fromEntries(["dari", "sampai", "nota", "pasien", "petugas", "jenis", "barang", "cari"].map((key) => [key, nilaiPencarian(searchParams.get(key))])) as Record<string, string>;
    if (!STATUS_DIIJINKAN.has(status)) return NextResponse.json({ success: false, error: "Status pembayaran tidak valid." }, { status: 400 });

    const where = ["1 = 1"];
    const params: (string | number)[] = [];
    const tambah = (sql: string, ...nilai: string[]) => { where.push(sql); params.push(...nilai); };
    if (filter.dari) tambah("p.tgl_jual >= ?", filter.dari);
    if (filter.sampai) tambah("p.tgl_jual <= ?", filter.sampai);
    if (filter.nota) tambah("p.nota_jual LIKE ?", `%${filter.nota}%`);
    if (filter.pasien) tambah("(p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?)", `%${filter.pasien}%`, `%${filter.pasien}%`);
    if (filter.petugas) tambah("(p.nip LIKE ? OR COALESCE(pt.nama, '') LIKE ?)", `%${filter.petugas}%`, `%${filter.petugas}%`);
    if (filter.jenis) tambah("COALESCE(j.nama, '') LIKE ?", `%${filter.jenis}%`);
    if (filter.barang) tambah("(dj.kode_brng LIKE ? OR COALESCE(db.nama_brng, '') LIKE ?)", `%${filter.barang}%`, `%${filter.barang}%`);
    if (status !== "Semua") tambah("p.status = ?", status);
    if (filter.cari) {
      const like = `%${filter.cari}%`;
      tambah("(p.nota_jual LIKE ? OR p.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR p.nip LIKE ? OR COALESCE(pt.nama, '') LIKE ? OR p.keterangan LIKE ? OR p.jns_jual LIKE ? OR dj.kode_brng LIKE ? OR COALESCE(db.nama_brng, '') LIKE ? OR COALESCE(b.nm_bangsal, '') LIKE ? OR COALESCE(dj.kode_sat, '') LIKE ? OR COALESCE(j.nama, '') LIKE ?)", like, like, like, like, like, like, like, like, like, like, like, like);
    }
    const transaksi = await executeQuery<Record<string, unknown>>(`
      SELECT p.nota_jual, DATE_FORMAT(p.tgl_jual, '%Y-%m-%d') AS tgl_jual, p.nip,
             COALESCE(pt.nama, '') AS nama_petugas, p.no_rkm_medis, p.nm_pasien, p.keterangan,
             p.jns_jual, p.ongkir, p.ppn, p.status, COALESCE(b.nm_bangsal, '') AS asal_stok,
             p.nama_bayar, COALESCE(SUM(dj.total), 0) AS total_biaya, COUNT(dj.kode_brng) AS total_item
      FROM penjualan p INNER JOIN detailjual dj ON p.nota_jual = dj.nota_jual
      LEFT JOIN petugas pt ON p.nip = pt.nip LEFT JOIN bangsal b ON p.kd_bangsal = b.kd_bangsal
      LEFT JOIN databarang db ON dj.kode_brng = db.kode_brng LEFT JOIN jenis j ON db.kdjns = j.kdjns
      WHERE ${where.join(" AND ")}
      GROUP BY p.nota_jual, p.tgl_jual, p.nip, pt.nama, p.no_rkm_medis, p.nm_pasien, p.keterangan, p.jns_jual, p.ongkir, p.ppn, p.status, b.nm_bangsal, p.nama_bayar
      ORDER BY p.tgl_jual DESC, p.nota_jual DESC LIMIT ?`, [...params, limit]);
    const notaJual = transaksi.map((baris) => String(baris.nota_jual));
    const detail = notaJual.length === 0 ? [] : await executeQuery<Record<string, unknown>>(
      `SELECT dj.nota_jual, dj.kode_brng, COALESCE(db.nama_brng, '') AS nama_brng, COALESCE(ks.satuan, dj.kode_sat) AS satuan, dj.h_jual, dj.jumlah, dj.subtotal, dj.dis, dj.bsr_dis, dj.tambahan, dj.embalase, dj.tuslah, dj.aturan_pakai, dj.total, dj.no_batch, dj.no_faktur FROM detailjual dj LEFT JOIN databarang db ON dj.kode_brng = db.kode_brng LEFT JOIN kodesatuan ks ON dj.kode_sat = ks.kode_sat WHERE dj.nota_jual IN (${notaJual.map(() => "?").join(", ")}) ORDER BY dj.nota_jual DESC, dj.kode_brng`, notaJual);
    const detailPerNota = new Map<string, Record<string, unknown>[]>();
    detail.forEach((baris) => { const key = String(baris.nota_jual); detailPerNota.set(key, [...(detailPerNota.get(key) ?? []), baris]); });
    return NextResponse.json({ success: true, data: transaksi.map((baris) => ({ ...baris, detail: detailPerNota.get(String(baris.nota_jual)) ?? [] })), total: transaksi.length });
  } catch (error: unknown) {
    console.error("Error in api/farmasi/penjualan-obat:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat data penjualan obat." }, { status: 500 });
  }
}

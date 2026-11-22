import { NextRequest, NextResponse } from "next/server";
import { executeQuery, pool } from "@/lib/db";
import { validasiObatAccess } from "@/lib/farmasi/access";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

type JenisPerawatan = "ralan" | "ranap";

interface HeaderResep {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: JenisPerawatan;
  kd_unit: string;
  nm_unit: string;
  kelas: string;
  jenis_bayar: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  tgl_validasi: string;
  jam_validasi: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  billing_terkunci: number | string;
  status_kunjungan: string;
}

interface Depot extends RowDataPacket {
  kd_bangsal: string;
  nm_bangsal: string;
}

interface BarangResep {
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  kapasitas: number | string;
  stok: number | string;
  h_beli: number | string;
  ralan: number | string;
  kelas1: number | string;
  kelas2: number | string;
  kelas3: number | string;
  utama: number | string;
  vip: number | string;
  vvip: number | string;
}

interface RacikanResep {
  no_racik: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
}

interface BahanRacikan extends BarangResep {
  no_racik: string;
}

interface HeaderValidasi extends RowDataPacket {
  no_resep: string;
  no_rawat: string;
  jenis: JenisPerawatan;
  kd_dokter: string;
  status_pelayanan: string;
  billing_terkunci: number | string;
  status_kunjungan: string;
  kd_unit: string;
  kelas: string;
}

interface ItemValidasi extends RowDataPacket {
  kode_item: string;
  jumlah: number | string;
  aturan_pakai: string;
  no_racik: string;
  jenis_item: "Obat" | "Bahan Racikan";
  nama_racik: string;
  keterangan: string;
}

interface ItemOverride {
  jenis_item: "Obat" | "Racikan" | "Bahan Racikan";
  no_racik: string;
  kode_item: string;
  jumlah: number;
  aturan_pakai: string;
}

interface StokBaris extends RowDataPacket {
  kode_brng: string;
  no_batch: string;
  no_faktur: string;
  stok: number | string;
}

class ValidasiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 400, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function hargaPelayanan(barang: BarangResep, header: Pick<HeaderResep, "jenis" | "kelas">) {
  if (header.jenis === "ralan") return Number(barang.ralan) || 0;
  const kelas = header.kelas.toLowerCase();
  if (kelas.includes("vvip")) return Number(barang.vvip) || 0;
  if (kelas.includes("vip")) return Number(barang.vip) || 0;
  if (kelas.includes("kelas 1")) return Number(barang.kelas1) || 0;
  if (kelas.includes("kelas 2")) return Number(barang.kelas2) || 0;
  if (kelas.includes("kelas 3")) return Number(barang.kelas3) || 0;
  return Number(barang.utama) || 0;
}

function detailBarang(
  barang: BarangResep,
  header: HeaderResep,
  jenisItem: "Obat" | "Bahan Racikan",
  noRacik = "",
) {
  const kapasitas = Math.max(Number(barang.kapasitas) || 1, 1);
  const kebutuhanStok = jenisItem === "Obat" ? Number(barang.jumlah) / kapasitas : Number(barang.jumlah);
  const stok = Number(barang.stok) || 0;
  return {
    jenis_item: jenisItem,
    no_racik: noRacik,
    kode_item: barang.kode_item,
    nama_item: barang.nama_item,
    jumlah: Number(barang.jumlah) || 0,
    satuan: barang.satuan,
    aturan_pakai: barang.aturan_pakai,
    kapasitas,
    kebutuhan_stok: kebutuhanStok,
    stok,
    stok_cukup: stok >= kebutuhanStok,
    harga_beli: Number(barang.h_beli) || 0,
    harga: hargaPelayanan(barang, header),
    keterangan: "",
  };
}

async function cariDepot(header: HeaderResep) {
  if (header.jenis === "ralan") {
    const rows = await executeQuery<Depot>(`
      SELECT b.kd_bangsal, b.nm_bangsal
      FROM bangsal b
      WHERE b.kd_bangsal = COALESCE(
        (SELECT sdr.kd_bangsal FROM set_depo_ralan sdr WHERE sdr.kd_poli = ? LIMIT 1),
        (SELECT sl.kd_bangsal FROM set_lokasi sl LIMIT 1)
      )
      LIMIT 1
    `, [header.kd_unit]);
    return rows[0] || null;
  }

  const rows = await executeQuery<Depot>(`
    SELECT b.kd_bangsal, b.nm_bangsal
    FROM bangsal b
    WHERE b.kd_bangsal = COALESCE(
      (SELECT sdr.kd_depo FROM set_depo_ranap sdr WHERE sdr.kd_bangsal = ? LIMIT 1),
      (SELECT CASE WHEN sl.asal_stok = 'Gunakan Stok Bangsal' THEN ? ELSE sl.kd_bangsal END
       FROM set_lokasi sl LIMIT 1)
    )
    LIMIT 1
  `, [header.kd_unit, header.kd_unit]);
  return rows[0] || null;
}

async function ambilHeaderValidasi(connection: Awaited<ReturnType<typeof pool.getConnection>>, noResep: string) {
  const [rows] = await connection.execute<HeaderValidasi[]>(`
    SELECT ro.no_resep, ro.no_rawat, ro.status AS jenis, ro.kd_dokter,
           CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
           (SELECT COUNT(*) FROM billing bl WHERE bl.no_rawat = ro.no_rawat) AS billing_terkunci,
           r.stts AS status_kunjungan,
           CASE WHEN ro.status = 'ranap' THEN COALESCE((
             SELECT k.kelas FROM kamar_inap ki
             INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
             WHERE ki.no_rawat = ro.no_rawat ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT 1
           ), '') ELSE '' END AS kelas,
           CASE WHEN ro.status = 'ralan' THEN r.kd_poli ELSE COALESCE((
             SELECT k.kd_bangsal FROM kamar_inap ki
             INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
             WHERE ki.no_rawat = ro.no_rawat ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT 1
           ), '') END AS kd_unit
    FROM resep_obat ro
    INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
    WHERE ro.no_resep = ?
    FOR UPDATE
  `, [noResep]);
  return rows[0] || null;
}

async function ambilDepotValidasi(connection: Awaited<ReturnType<typeof pool.getConnection>>, header: HeaderValidasi) {
  if (header.jenis === "ralan") {
    const [rows] = await connection.execute<Depot[]>(`
      SELECT b.kd_bangsal, b.nm_bangsal
      FROM bangsal b
      WHERE b.kd_bangsal = COALESCE(
        (SELECT sdr.kd_bangsal FROM set_depo_ralan sdr WHERE sdr.kd_poli = ? LIMIT 1),
        (SELECT sl.kd_bangsal FROM set_lokasi sl LIMIT 1)
      ) LIMIT 1
    `, [header.kd_unit]);
    return rows[0] || null;
  }
  const [rows] = await connection.execute<Depot[]>(`
    SELECT b.kd_bangsal, b.nm_bangsal
    FROM bangsal b
    WHERE b.kd_bangsal = COALESCE(
      (SELECT sdr.kd_depo FROM set_depo_ranap sdr WHERE sdr.kd_bangsal = ? LIMIT 1),
      (SELECT CASE WHEN sl.asal_stok = 'Gunakan Stok Bangsal' THEN ? ELSE sl.kd_bangsal END FROM set_lokasi sl LIMIT 1)
    ) LIMIT 1
  `, [header.kd_unit, header.kd_unit]);
  return rows[0] || null;
}

async function ambilItemValidasi(connection: Awaited<ReturnType<typeof pool.getConnection>>, noResep: string) {
  const [obat] = await connection.execute<ItemValidasi[]>(`
    SELECT rd.kode_brng AS kode_item, rd.jml AS jumlah, rd.aturan_pakai,
           '' AS no_racik, 'Obat' AS jenis_item, '' AS nama_racik, '' AS keterangan
    FROM resep_dokter rd WHERE rd.no_resep = ? ORDER BY rd.kode_brng
  `, [noResep]);
  const [bahan] = await connection.execute<ItemValidasi[]>(`
    SELECT rrd.kode_brng AS kode_item, rrd.jml AS jumlah, '' AS aturan_pakai,
           CAST(rrd.no_racik AS CHAR) AS no_racik, 'Bahan Racikan' AS jenis_item,
           '' AS nama_racik, '' AS keterangan
    FROM resep_dokter_racikan_detail rrd WHERE rrd.no_resep = ? ORDER BY rrd.no_racik, rrd.kode_brng
  `, [noResep]);
  return [...obat, ...bahan];
}

async function ambilStokTerkunci(
  connection: Awaited<ReturnType<typeof pool.getConnection>>,
  kode: string,
  depo: string,
) {
  const [rows] = await connection.execute<StokBaris[]>(`
    SELECT kode_brng, no_batch, no_faktur, stok
    FROM gudangbarang
    WHERE kode_brng = ? AND kd_bangsal = ? AND stok > 0
    ORDER BY CASE WHEN no_batch = '' THEN 1 ELSE 0 END, no_batch, no_faktur
    FOR UPDATE
  `, [kode, depo]);
  return rows;
}

async function simpanPemberian(
  connection: Awaited<ReturnType<typeof pool.getConnection>>,
  header: HeaderValidasi,
  depot: string,
  tanggal: string,
  jam: string,
  item: ItemValidasi,
  kapasitas: number,
  hBeli: number,
  harga: number,
) {
  const kebutuhan = (Number(item.jumlah) || 0) / Math.max(kapasitas, 1);
  if (kebutuhan <= 0) return;
  const stokRows = await ambilStokTerkunci(connection, item.kode_item, depot);
  const totalStok = stokRows.reduce((total, row) => total + Number(row.stok || 0), 0);
  if (totalStok + 1e-9 < kebutuhan) {
    throw new ValidasiError(`Stok ${item.kode_item} tidak mencukupi untuk validasi resep.`, 409, "STOK_TIDAK_CUKUP");
  }

  let sisa = kebutuhan;
  for (const stok of stokRows) {
    if (sisa <= 0) break;
    const jumlah = Math.min(sisa, Number(stok.stok));
    const total = harga * jumlah;
    await connection.execute<ResultSetHeader>(`
      INSERT INTO detail_pemberian_obat
        (tgl_perawatan, jam, no_rawat, kode_brng, h_beli, biaya_obat, jml, embalase, tuslah, total, status, kd_bangsal, no_batch, no_faktur)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?)
    `, [tanggal, jam, header.no_rawat, item.kode_item, hBeli, harga, jumlah, total, header.jenis === "ralan" ? "Ralan" : "Ranap", depot, stok.no_batch, stok.no_faktur]);
    await connection.execute<ResultSetHeader>(
      "UPDATE gudangbarang SET stok = stok - ? WHERE kode_brng = ? AND kd_bangsal = ? AND no_batch = ? AND no_faktur = ?",
      [jumlah, item.kode_item, depot, stok.no_batch, stok.no_faktur],
    );
    if (stok.no_batch || stok.no_faktur) {
      await connection.execute<ResultSetHeader>(
        "UPDATE data_batch SET sisa = sisa - ? WHERE kode_brng = ? AND no_batch = ? AND no_faktur = ? AND sisa >= ?",
        [jumlah, item.kode_item, stok.no_batch, stok.no_faktur, jumlah],
      );
    }
    if (item.aturan_pakai) {
      await connection.execute<ResultSetHeader>(`
        INSERT INTO aturan_pakai (tgl_perawatan, jam, no_rawat, kode_brng, aturan)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE aturan = VALUES(aturan)
      `, [tanggal, jam, header.no_rawat, item.kode_item, item.aturan_pakai]);
    }
    sisa -= jumlah;
  }
}

async function bacaBarangValidasi(
  connection: Awaited<ReturnType<typeof pool.getConnection>>,
  kode: string,
  header: HeaderValidasi,
) {
  const [rows] = await connection.execute<(BarangResep & RowDataPacket)[]>(`
    SELECT db.kode_brng AS kode_item, db.kapasitas, db.h_beli, db.ralan,
           db.kelas1, db.kelas2, db.kelas3, db.utama, db.vip, db.vvip
    FROM databarang db WHERE db.kode_brng = ? AND db.status = '1' LIMIT 1
  `, [kode]);
  const barang = rows[0];
  if (!barang) throw new ValidasiError(`Barang ${kode} tidak ditemukan atau tidak aktif.`, 409, "BARANG_TIDAK_AKTIF");
  return { kapasitas: Math.max(Number(barang.kapasitas) || 1, 1), hBeli: Number(barang.h_beli) || 0, harga: hargaPelayanan(barang, header) };
}

export async function GET(req: NextRequest) {
  const denied = await validasiObatAccess();
  if (denied) return denied;

  try {
    const noResep = (new URL(req.url).searchParams.get("no_resep") || "").trim();
    if (!/^[A-Za-z0-9_-]{1,14}$/.test(noResep)) {
      return NextResponse.json({ success: false, error: "Nomor resep tidak valid." }, { status: 400 });
    }

    const headerRows = await executeQuery<HeaderResep>(`
      SELECT ro.no_resep, ro.no_rawat, r.no_rkm_medis, p.nm_pasien,
             ro.kd_dokter, d.nm_dokter, ro.status AS jenis,
             CASE WHEN ro.status = 'ralan' THEN r.kd_poli ELSE COALESCE((
               SELECT k.kd_bangsal FROM kamar_inap ki
               INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
               WHERE ki.no_rawat = ro.no_rawat ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT 1
             ), '') END AS kd_unit,
             CASE WHEN ro.status = 'ralan' THEN poli.nm_poli ELSE COALESCE((
               SELECT b.nm_bangsal FROM kamar_inap ki
               INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
               INNER JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
               WHERE ki.no_rawat = ro.no_rawat ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT 1
             ), '') END AS nm_unit,
             CASE WHEN ro.status = 'ranap' THEN COALESCE((
               SELECT k.kelas FROM kamar_inap ki
               INNER JOIN kamar k ON k.kd_kamar = ki.kd_kamar
               WHERE ki.no_rawat = ro.no_rawat ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC LIMIT 1
             ), '') ELSE '' END AS kelas,
             pj.png_jawab AS jenis_bayar,
             DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d') AS tgl_peresepan,
             TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s') AS jam_peresepan,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN '' ELSE DATE_FORMAT(ro.tgl_perawatan, '%Y-%m-%d') END AS tgl_validasi,
             CASE WHEN ro.jam IS NULL OR CAST(ro.jam AS CHAR) = '00:00:00'
                  THEN '' ELSE TIME_FORMAT(ro.jam, '%H:%i:%s') END AS jam_validasi,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan,
             (SELECT COUNT(*) FROM billing bl WHERE bl.no_rawat = ro.no_rawat) AS billing_terkunci,
             r.stts AS status_kunjungan
      FROM resep_obat ro
      INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
      INNER JOIN penjab pj ON pj.kd_pj = r.kd_pj
      LEFT JOIN poliklinik poli ON poli.kd_poli = r.kd_poli
      WHERE ro.no_resep = ?
      LIMIT 1
    `, [noResep]);
    const header = headerRows[0];
    if (!header) {
      return NextResponse.json({ success: false, error: "Resep dokter tidak ditemukan." }, { status: 404 });
    }

    const depot = await cariDepot(header);
    if (!depot) {
      return NextResponse.json({
        success: false,
        error: `Depo obat ${header.jenis === "ralan" ? "rawat jalan" : "rawat inap"} belum dikonfigurasi.`,
        code: "DEPO_BELUM_DIATUR",
      }, { status: 409 });
    }

    const kolomBarang = `db.h_beli, db.ralan, db.kelas1, db.kelas2, db.kelas3,
      db.utama, db.vip, db.vvip, COALESCE(db.kapasitas, 1) AS kapasitas,
      COALESCE(SUM(gb.stok), 0) AS stok`;
    const groupHarga = `db.h_beli, db.ralan, db.kelas1, db.kelas2, db.kelas3,
      db.utama, db.vip, db.vvip, db.kapasitas`;
    const [obat, racikan, bahan] = await Promise.all([
      executeQuery<BarangResep>(`
        SELECT rd.kode_brng AS kode_item, db.nama_brng AS nama_item, rd.jml AS jumlah,
               db.kode_sat AS satuan, rd.aturan_pakai, ${kolomBarang}
        FROM resep_dokter rd
        INNER JOIN databarang db ON db.kode_brng = rd.kode_brng
        LEFT JOIN gudangbarang gb ON gb.kode_brng = db.kode_brng AND gb.kd_bangsal = ?
        WHERE rd.no_resep = ?
        GROUP BY rd.kode_brng, db.nama_brng, rd.jml, db.kode_sat, rd.aturan_pakai, ${groupHarga}
        ORDER BY db.nama_brng
      `, [depot.kd_bangsal, noResep]),
      executeQuery<RacikanResep>(`
        SELECT CAST(rr.no_racik AS CHAR) AS no_racik, rr.nama_racik AS nama_item,
               rr.jml_dr AS jumlah, mr.nm_racik AS satuan, rr.aturan_pakai, rr.keterangan
        FROM resep_dokter_racikan rr
        INNER JOIN metode_racik mr ON mr.kd_racik = rr.kd_racik
        WHERE rr.no_resep = ?
        ORDER BY rr.no_racik
      `, [noResep]),
      executeQuery<BahanRacikan>(`
        SELECT CAST(rrd.no_racik AS CHAR) AS no_racik, rrd.kode_brng AS kode_item,
               db.nama_brng AS nama_item, rrd.jml AS jumlah, db.kode_sat AS satuan,
               '' AS aturan_pakai, ${kolomBarang}
        FROM resep_dokter_racikan_detail rrd
        INNER JOIN databarang db ON db.kode_brng = rrd.kode_brng
        LEFT JOIN gudangbarang gb ON gb.kode_brng = db.kode_brng AND gb.kd_bangsal = ?
        WHERE rrd.no_resep = ?
        GROUP BY rrd.no_racik, rrd.kode_brng, db.nama_brng, rrd.jml, db.kode_sat, ${groupHarga}
        ORDER BY rrd.no_racik, db.nama_brng
      `, [depot.kd_bangsal, noResep]),
    ]);

    const detail = [
      ...obat.map((item) => detailBarang(item, header, "Obat")),
      ...racikan.flatMap((racik) => [
        {
          jenis_item: "Racikan" as const,
          no_racik: racik.no_racik,
          kode_item: `Racikan ${racik.no_racik}`,
          nama_item: racik.nama_item,
          jumlah: Number(racik.jumlah) || 0,
          satuan: racik.satuan,
          aturan_pakai: racik.aturan_pakai,
          kapasitas: 1,
          kebutuhan_stok: 0,
          stok: 0,
          stok_cukup: bahan.filter((item) => item.no_racik === racik.no_racik)
            .every((item) => Number(item.stok) >= Number(item.jumlah)),
          harga_beli: 0,
          harga: 0,
          keterangan: racik.keterangan,
        },
        ...bahan
          .filter((item) => item.no_racik === racik.no_racik)
          .map((item) => detailBarang(item, header, "Bahan Racikan", racik.no_racik)),
      ]),
    ];

    return NextResponse.json({
      success: true,
      data: {
        resep: { ...header, billing_terkunci: Number(header.billing_terkunci) > 0 },
        depot,
        detail,
      },
    });
  } catch (error) {
    console.error("Error in api/farmasi/validasi-obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data validasi obat." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await validasiObatAccess();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Isi permintaan tidak valid." }, { status: 400 });
  }
  const noResep = body && typeof body === "object" && !Array.isArray(body)
    ? String((body as Record<string, unknown>).no_resep || "").trim()
    : "";
  if (!/^[A-Za-z0-9_-]{1,14}$/.test(noResep)) {
    return NextResponse.json({ success: false, error: "Nomor resep tidak valid." }, { status: 400 });
  }
  const inputItems = body && typeof body === "object" && !Array.isArray(body)
    ? (body as Record<string, unknown>).items
    : undefined;
  const overrides: ItemOverride[] = [];
  if (inputItems !== undefined) {
    if (!Array.isArray(inputItems) || inputItems.length > 500) {
      return NextResponse.json({ success: false, error: "Rincian obat tidak valid." }, { status: 400 });
    }
    for (const value of inputItems) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return NextResponse.json({ success: false, error: "Rincian obat tidak valid." }, { status: 400 });
      }
      const item = value as Record<string, unknown>;
      const jenis = item.jenis_item;
      const jumlah = Number(item.jumlah);
      const kode = String(item.kode_item || "").trim();
      if ((jenis !== "Obat" && jenis !== "Racikan" && jenis !== "Bahan Racikan") || !kode || !Number.isFinite(jumlah) || jumlah < 0 || jumlah > 100000) {
        return NextResponse.json({ success: false, error: "Jumlah atau rincian obat tidak valid." }, { status: 400 });
      }
      overrides.push({ jenis_item: jenis, no_racik: String(item.no_racik || ""), kode_item: kode, jumlah, aturan_pakai: String(item.aturan_pakai || "").slice(0, 150) });
    }
  }

  const connection = await pool.getConnection();
  let transaksi = false;
  try {
    await connection.beginTransaction();
    transaksi = true;
    const header = await ambilHeaderValidasi(connection, noResep);
    if (!header) throw new ValidasiError("Resep dokter tidak ditemukan.", 404);
    if (header.status_pelayanan === "Sudah Terlayani") {
      throw new ValidasiError("Resep sudah tervalidasi dan tidak dapat divalidasi ulang.", 409, "SUDAH_TERVALIDASI");
    }
    if (header.status_kunjungan === "Batal") {
      throw new ValidasiError("Kunjungan pasien sudah dibatalkan.", 409, "KUNJUNGAN_BATAL");
    }
    if (Number(header.billing_terkunci) > 0) {
      throw new ValidasiError("Data billing sudah terverifikasi; resep tidak dapat divalidasi.", 409, "BILLING_TERKUNCI");
    }

    const depot = await ambilDepotValidasi(connection, header);
    if (!depot) throw new ValidasiError("Depo obat belum dikonfigurasi.", 409, "DEPO_BELUM_DIATUR");
    const items = await ambilItemValidasi(connection, noResep);
    if (items.length === 0) throw new ValidasiError("Resep belum memiliki rincian obat.", 400, "RESEP_KOSONG");
    const itemMap = new Map(items.map((item) => [`${item.jenis_item}|${item.no_racik}|${item.kode_item}`, item]));
    const overrideKeys = new Set<string>();
    for (const override of overrides) {
      if (override.jenis_item === "Racikan") continue;
      const key = `${override.jenis_item}|${override.no_racik}|${override.kode_item}`;
      if (overrideKeys.has(key) || !itemMap.has(key)) throw new ValidasiError("Rincian obat berubah; silakan muat ulang resep.", 409, "RESEP_BERUBAH");
      overrideKeys.add(key);
      const target = itemMap.get(key);
      if (target) {
        target.jumlah = override.jumlah;
        target.aturan_pakai = override.aturan_pakai;
      }
    }

    const [racikan] = await connection.execute<(RowDataPacket & {
      no_racik: string; nama_racik: string; kd_racik: string; jumlah: number | string;
      aturan_pakai: string; keterangan: string;
    })[]>(`
      SELECT CAST(rr.no_racik AS CHAR) AS no_racik, rr.nama_racik, rr.kd_racik,
             rr.jml_dr AS jumlah, rr.aturan_pakai, rr.keterangan
      FROM resep_dokter_racikan rr WHERE rr.no_resep = ? ORDER BY rr.no_racik
    `, [noResep]);
    const racikanMap = new Map(racikan.map((item) => [item.no_racik, item]));
    for (const override of overrides.filter((item) => item.jenis_item === "Racikan")) {
      if (overrideKeys.has(`Racikan|${override.no_racik}|${override.kode_item}`) || !racikanMap.has(override.no_racik)) {
        throw new ValidasiError("Rincian racikan berubah; silakan muat ulang resep.", 409, "RESEP_BERUBAH");
      }
      overrideKeys.add(`Racikan|${override.no_racik}|${override.kode_item}`);
    }
    const waktuRows = await connection.execute<(RowDataPacket & { tanggal: string; jam: string })[]>(
      "SELECT DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d') AS tanggal, TIME_FORMAT(CURRENT_TIME, '%H:%i:%s') AS jam",
    );
    const waktu = waktuRows[0][0];
    if (!waktu) throw new ValidasiError("Waktu validasi tidak tersedia.", 500);

    for (const item of items) {
      const racik = item.no_racik ? racikanMap.get(item.no_racik) : undefined;
      const aturan = item.aturan_pakai || racik?.aturan_pakai || "";
      const itemDenganAturan = { ...item, aturan_pakai: aturan };
      const barang = await bacaBarangValidasi(connection, item.kode_item, header);
      await simpanPemberian(connection, header, depot.kd_bangsal, waktu.tanggal, waktu.jam, itemDenganAturan, barang.kapasitas, barang.hBeli, barang.harga);
      if (item.no_racik) {
        await connection.execute<ResultSetHeader>(`
          INSERT INTO detail_obat_racikan (tgl_perawatan, jam, no_rawat, no_racik, kode_brng)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE kode_brng = VALUES(kode_brng)
        `, [waktu.tanggal, waktu.jam, header.no_rawat, item.no_racik, item.kode_item]);
      }
    }

    for (const racik of racikan) {
      const racikOverride = overrides.find((item) => item.jenis_item === "Racikan" && item.no_racik === racik.no_racik);
      await connection.execute<ResultSetHeader>(`
        INSERT INTO obat_racikan (tgl_perawatan, jam, no_rawat, no_racik, nama_racik, kd_racik, jml_dr, aturan_pakai, keterangan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE nama_racik = VALUES(nama_racik), kd_racik = VALUES(kd_racik),
          jml_dr = VALUES(jml_dr), aturan_pakai = VALUES(aturan_pakai), keterangan = VALUES(keterangan)
      `, [waktu.tanggal, waktu.jam, header.no_rawat, racik.no_racik, racik.nama_racik, racik.kd_racik, racikOverride?.jumlah ?? racik.jumlah, racikOverride?.aturan_pakai ?? racik.aturan_pakai, racik.keterangan]);
    }

    const [updated] = await connection.execute<ResultSetHeader>(`
      UPDATE resep_obat
      SET tgl_perawatan = ?, jam = ?
      WHERE no_resep = ? AND (tgl_perawatan IS NULL OR CAST(tgl_perawatan AS CHAR) = '0000-00-00')
    `, [waktu.tanggal, waktu.jam, noResep]);
    if (updated.affectedRows !== 1) throw new ValidasiError("Status resep berubah sebelum validasi selesai.", 409, "RESEP_BERUBAH");

    await connection.commit();
    transaksi = false;
    return NextResponse.json({
      success: true,
      data: { no_resep: noResep, tgl_validasi: waktu.tanggal, jam_validasi: waktu.jam },
      message: `Resep ${noResep} berhasil divalidasi.`,
    });
  } catch (error) {
    if (transaksi) await connection.rollback();
    if (error instanceof ValidasiError) {
      return NextResponse.json({ success: false, error: error.message, ...(error.code ? { code: error.code } : {}) }, { status: error.status });
    }
    console.error("Error in api/farmasi/validasi-obat POST:", error);
    return NextResponse.json({ success: false, error: "Validasi obat gagal diproses." }, { status: 500 });
  } finally {
    connection.release();
  }
}

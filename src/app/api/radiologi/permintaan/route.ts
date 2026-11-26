import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import {
  ambilKunjungan,
  bacaTarif,
  jamValid,
  MODE_TAMPIL,
  normalisasiStatus,
  STATUS_RANAP,
  STATUS_RAWAT,
  syaratPemeriksaan,
  teks,
} from "@/lib/radiologi/permintaan";

class PermintaanError extends Error {
  constructor(message: string, readonly status = 400, readonly code?: string) {
    super(message);
  }
}

interface BarisPermintaan extends Record<string, unknown> {
  noorder: string;
  no_rawat: string;
  tgl_permintaan: string;
  jam_permintaan: string;
  tgl_sampel: string;
  jam_sampel: string;
  tgl_hasil: string;
  jam_hasil: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  status: string;
  dokter_perujuk: string;
  nm_dokter_perujuk: string;
  png_jawab: string;
  ruang: string;
  informasi_tambahan: string;
  diagnosa_klinis: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
}

interface ItemPermintaan {
  kd_jenis_prw: string;
  nm_perawatan: string;
}

interface PermintaanRadiologi {
  noorder: string;
  no_rawat: string;
  tgl_permintaan: string;
  jam_permintaan: string;
  tgl_sampel: string;
  jam_sampel: string;
  tgl_hasil: string;
  jam_hasil: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  status: string;
  dokter_perujuk: string;
  nm_dokter_perujuk: string;
  png_jawab: string;
  ruang: string;
  informasi_tambahan: string;
  diagnosa_klinis: string;
  item: ItemPermintaan[];
}

async function izinAkses() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Sesi berakhir. Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.semua_akses && !session.permissions.permintaan_radiologi) {
    return NextResponse.json({ success: false, error: "Anda tidak memiliki izin permintaan radiologi." }, { status: 403 });
  }
  return null;
}

function gagal(error: unknown, pesan: string) {
  if (error instanceof PermintaanError) {
    return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: error.status });
  }
  console.error(pesan, error);
  return NextResponse.json({ success: false, error: pesan }, { status: 500 });
}

function isi(value: unknown) {
  return value == null ? "" : String(value);
}

function tanggalKolom(value: unknown) {
  const teksTanggal = isi(value);
  return teksTanggal === "0000-00-00" || teksTanggal.startsWith("0000-00-00") ? "" : teksTanggal.slice(0, 10);
}

function jamKolom(value: unknown) {
  const teksJam = isi(value);
  return teksJam === "00:00:00" ? "" : teksJam.slice(0, 5);
}

function buatRuangSql(statusRanap: string) {
  const syarat = statusRanap === "Belum Pulang" ? "AND ki.stts_pulang = '-'" : "";
  const kamar = `(SELECT CONCAT(k.kd_kamar, ' ', b.nm_bangsal)
    FROM kamar_inap ki
    INNER JOIN kamar k ON ki.kd_kamar = k.kd_kamar
    LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
    WHERE ki.no_rawat = pr.no_rawat ${syarat}
    ORDER BY STR_TO_DATE(CONCAT(ki.tgl_masuk, ' ', ki.jam_masuk), '%Y-%m-%d %H:%i:%s') DESC LIMIT 1)`;
  return `CASE WHEN pr.status = 'ranap' THEN COALESCE(${kamar}, 'Ranap Gabung') ELSE COALESCE(pol.nm_poli, '') END`;
}

function groupHasil(rows: BarisPermintaan[]): PermintaanRadiologi[] {
  const hasil = new Map<string, PermintaanRadiologi>();
  for (const baris of rows) {
    const noorder = isi(baris.noorder);
    if (!noorder) continue;
    let induk = hasil.get(noorder);
    if (!induk) {
      induk = {
        noorder,
        no_rawat: isi(baris.no_rawat),
        tgl_permintaan: tanggalKolom(baris.tgl_permintaan),
        jam_permintaan: jamKolom(baris.jam_permintaan),
        tgl_sampel: tanggalKolom(baris.tgl_sampel),
        jam_sampel: jamKolom(baris.jam_sampel),
        tgl_hasil: tanggalKolom(baris.tgl_hasil),
        jam_hasil: jamKolom(baris.jam_hasil),
        no_rkm_medis: isi(baris.no_rkm_medis),
        nm_pasien: isi(baris.nm_pasien),
        jk: isi(baris.jk),
        status: isi(baris.status),
        dokter_perujuk: isi(baris.dokter_perujuk),
        nm_dokter_perujuk: isi(baris.nm_dokter_perujuk),
        png_jawab: isi(baris.png_jawab),
        ruang: isi(baris.ruang),
        informasi_tambahan: isi(baris.informasi_tambahan),
        diagnosa_klinis: isi(baris.diagnosa_klinis),
        item: [],
      };
      hasil.set(noorder, induk);
    }
    const kdJenisPrw = isi(baris.kd_jenis_prw);
    if (kdJenisPrw && !induk.item.some((item) => item.kd_jenis_prw === kdJenisPrw)) {
      induk.item.push({ kd_jenis_prw: kdJenisPrw, nm_perawatan: isi(baris.nm_perawatan) });
    }
  }
  return [...hasil.values()];
}

async function buatNomor(connection: PoolConnection, tanggal: string, panjang: number) {
  const awalan = `PR${tanggal.replaceAll("-", "")}`;
  const [baris] = await connection.execute<RowDataPacket[]>(`
    SELECT COALESCE(MAX(CONVERT(RIGHT(noorder, ?), UNSIGNED)), 0) AS urut
    FROM permintaan_radiologi
    WHERE tgl_permintaan = ? AND noorder LIKE ?
  `, [panjang, tanggal, `${awalan}%`]);
  const urut = Number(baris[0]?.urut ?? 0) + 1;
  const batas = 10 ** panjang - 1;
  if (urut > batas) throw new PermintaanError("Nomor permintaan radiologi harian sudah mencapai batas.", 409);
  return `${awalan}${String(urut).padStart(panjang, "0")}`;
}

function duplikat(error: unknown) {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY");
}

export async function GET(req: NextRequest) {
  const ditolak = await izinAkses();
  if (ditolak) return ditolak;
  try {
    const { searchParams } = new URL(req.url);
    const modeMentah = searchParams.get("mode") || "data";
    if (!MODE_TAMPIL.has(modeMentah)) throw new PermintaanError("Mode tampilan tidak dikenal.");
    const mode = modeMentah || "data";
    const status = searchParams.get("status") || "Semua";
    const statusRanap = searchParams.get("status_ranap") || "Semua";
    if (!STATUS_RAWAT.has(status) || !STATUS_RANAP.has(statusRanap)) {
      throw new PermintaanError("Filter status tidak dikenal.");
    }
    const tanggalMulai = teks(searchParams.get("tanggal_mulai"), 10);
    const tanggalSelesai = teks(searchParams.get("tanggal_selesai"), 10);
    if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))) {
      throw new PermintaanError("Format tanggal tidak valid.");
    }
    if (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai) {
      throw new PermintaanError("Tanggal mulai tidak boleh setelah tanggal selesai.");
    }
    const cari = teks(searchParams.get("cari"), 120);
    const dokter = teks(searchParams.get("dokter"), 100);
    const poli = teks(searchParams.get("poli"), 100);
    const ruang = teks(searchParams.get("ruang"), 100);
    const angkaLimit = Number(searchParams.get("limit") ?? 50);
    const limit = Number.isFinite(angkaLimit) ? Math.min(Math.max(Math.trunc(angkaLimit), 1), 500) : 50;

    const ruangSql = buatRuangSql(statusRanap);
    let sql = `
      SELECT pr.noorder, pr.no_rawat,
             DATE_FORMAT(pr.tgl_permintaan, '%Y-%m-%d') AS tgl_permintaan,
             IF(pr.jam_permintaan = '00:00:00', '', DATE_FORMAT(pr.jam_permintaan, '%H:%i')) AS jam_permintaan,
             IF(CAST(pr.tgl_sampel AS CHAR) = '0000-00-00', '', DATE_FORMAT(pr.tgl_sampel, '%Y-%m-%d')) AS tgl_sampel,
             IF(pr.jam_sampel = '00:00:00', '', DATE_FORMAT(pr.jam_sampel, '%H:%i')) AS jam_sampel,
             IF(CAST(pr.tgl_hasil AS CHAR) = '0000-00-00', '', DATE_FORMAT(pr.tgl_hasil, '%Y-%m-%d')) AS tgl_hasil,
             IF(pr.jam_hasil = '00:00:00', '', DATE_FORMAT(pr.jam_hasil, '%H:%i')) AS jam_hasil,
             r.no_rkm_medis, p.nm_pasien, p.jk, pr.status, pr.dokter_perujuk,
             d.nm_dokter AS nm_dokter_perujuk, pj.png_jawab,
             ${ruangSql} AS ruang,
             pr.informasi_tambahan, pr.diagnosa_klinis,
             prr.kd_jenis_prw, j.nm_perawatan
      FROM permintaan_radiologi pr
      INNER JOIN reg_periksa r ON pr.no_rawat = r.no_rawat
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      LEFT JOIN dokter d ON pr.dokter_perujuk = d.kd_dokter
      LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
      INNER JOIN permintaan_pemeriksaan_radiologi prr ON pr.noorder = prr.noorder
      INNER JOIN jns_perawatan_radiologi j ON prr.kd_jenis_prw = j.kd_jenis_prw
      WHERE 1=1
    `;
    const params: (string | number)[] = [];

    if (tanggalMulai && tanggalSelesai) {
      sql += " AND pr.tgl_permintaan BETWEEN ? AND ?";
      params.push(tanggalMulai, tanggalSelesai);
    }
    if (status !== "Semua") {
      sql += " AND pr.status = ?";
      params.push(status);
    }
    if (cari) {
      const kata = `%${cari}%`;
      sql += ` AND (pr.noorder LIKE ? OR pr.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?
        OR pr.diagnosa_klinis LIKE ? OR pr.informasi_tambahan LIKE ? OR d.nm_dokter LIKE ? OR j.nm_perawatan LIKE ?)`;
      params.push(kata, kata, kata, kata, kata, kata, kata, kata);
    }
    if (dokter) {
      const kata = `%${dokter}%`;
      sql += " AND (pr.dokter_perujuk LIKE ? OR d.nm_dokter LIKE ?)";
      params.push(kata, kata);
    }
    if (poli) {
      const kata = `%${poli}%`;
      sql += " AND (r.kd_poli LIKE ? OR pol.nm_poli LIKE ?)";
      params.push(kata, kata);
    }
    if (ruang) {
      sql += ` AND ${ruangSql} LIKE ?`;
      params.push(`%${ruang}%`);
    }

    sql += " ORDER BY pr.tgl_permintaan DESC, pr.jam_permintaan DESC, pr.noorder DESC, prr.kd_jenis_prw ASC LIMIT ?";
    params.push(limit);

    const rows = await executeQuery<BarisPermintaan>(sql, params);
    const data = mode === "item" ? rows : groupHasil(rows);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return gagal(error, "Gagal memuat data permintaan radiologi.");
  }
}

export async function POST(req: NextRequest) {
  const ditolak = await izinAkses();
  if (ditolak) return ditolak;
  let connection: PoolConnection | undefined;
  let namaKunci = "";
  let kunciDidapat = false;
  let transaksiDimulai = false;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new PermintaanError("Data permintaan tidak valid.");
    }
    const input = body as Record<string, unknown>;
    const noRawat = teks(input.no_rawat, 30);
    const tanggal = teks(input.tanggal, 10);
    const jam = teks(input.jam, 8);
    const dokterPerujuk = teks(input.dokter_perujuk, 10);
    const informasiTambahan = teks(input.informasi_tambahan, 60);
    const diagnosaKlinis = teks(input.diagnosa_klinis, 80);
    const statusInput = normalisasiStatus(input.status);
    const items = [...new Set(
      Array.isArray(input.item) ? input.item.map((nilai) => teks(nilai, 20)).filter(Boolean) : [],
    )];

    if (!noRawat || !isRegistrationDate(tanggal) || !jamValid(jam)) {
      throw new PermintaanError("No. rawat, tanggal, atau jam tidak valid.");
    }
    if (!informasiTambahan || !diagnosaKlinis) {
      throw new PermintaanError("Informasi tambahan dan diagnosa klinis wajib diisi.");
    }
    if (!dokterPerujuk) {
      throw new PermintaanError("Dokter perujuk wajib diisi.");
    }
    if (items.length > 100) {
      throw new PermintaanError("Maksimal 100 pemeriksaan radiologi per permintaan.");
    }
    if (statusInput && statusInput !== "ralan" && statusInput !== "ranap") {
      throw new PermintaanError("Status rawat tidak dikenal.");
    }

    connection = await pool.getConnection();
    const kunjungan = await ambilKunjungan(connection, noRawat);
    if (!kunjungan) throw new PermintaanError("Data kunjungan tidak ditemukan.", 404);
    if (statusInput && statusInput !== kunjungan.status) {
      throw new PermintaanError("Status rawat tidak sesuai dengan data kunjungan.", 409);
    }

    const [dokterRows] = await connection.execute<RowDataPacket[]>(
      "SELECT kd_dokter FROM dokter WHERE kd_dokter = ? LIMIT 1",
      [dokterPerujuk],
    );
    if (!dokterRows.length) throw new PermintaanError("Dokter perujuk tidak ditemukan.", 409);

    const [billingRows] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) AS jumlah FROM billing WHERE no_rawat = ?",
      [noRawat],
    );
    const [batalRows] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) AS jumlah FROM reg_periksa WHERE no_rawat = ? AND stts = 'Batal'",
      [noRawat],
    );
    if (Number(billingRows[0]?.jumlah ?? 0) > 0 || Number(batalRows[0]?.jumlah ?? 0) > 0) {
      throw new PermintaanError(
        "Data billing sudah terverifikasi atau kunjungan dibatalkan. Hubungi bagian kasir/keuangan.",
        409,
        "BILLING_TERVERIFIKASI",
      );
    }

    if (items.length > 0) {
      const [tarifRows] = await connection.execute<RowDataPacket[]>(
        "SELECT cara_bayar_radiologi, kelas_radiologi FROM set_tarif LIMIT 1",
      );
      const syarat = syaratPemeriksaan(bacaTarif(tarifRows), kunjungan.kd_pj, kunjungan.kelas);
      const daftarTanda = items.map(() => "?").join(", ");
      const [itemRows] = await connection.execute<RowDataPacket[]>(`
        SELECT kd_jenis_prw FROM jns_perawatan_radiologi
        WHERE ${syarat.sql} AND kd_jenis_prw IN (${daftarTanda})
      `, [...syarat.params, ...items]);
      if (itemRows.length !== items.length) {
        throw new PermintaanError("Sebagian pemeriksaan radiologi tidak tersedia untuk kunjungan ini.", 409);
      }
    }

    namaKunci = `khanza-web:permintaan-radiologi:${tanggal.replaceAll("-", "")}`;
    const [kunciRows] = await connection.execute<RowDataPacket[]>("SELECT GET_LOCK(?, 10) AS didapat", [namaKunci]);
    kunciDidapat = Number(kunciRows[0]?.didapat) === 1;
    if (!kunciDidapat) {
      throw new PermintaanError("Penomoran permintaan radiologi sedang digunakan. Silakan ulangi.", 409, "NOMOR_SIBUK");
    }

    const sqlInduk = `INSERT INTO permintaan_radiologi
      (noorder, no_rawat, tgl_permintaan, jam_permintaan, tgl_sampel, jam_sampel, tgl_hasil, jam_hasil,
       dokter_perujuk, status, informasi_tambahan, diagnosa_klinis)
      VALUES (?, ?, ?, ?, '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', ?, ?, ?, ?)`;
    let noorder = await buatNomor(connection, tanggal, 3);
    await connection.beginTransaction();
    transaksiDimulai = true;
    try {
      await connection.execute(sqlInduk, [
        noorder, noRawat, tanggal, jam, dokterPerujuk, kunjungan.status, informasiTambahan, diagnosaKlinis,
      ]);
    } catch (error: unknown) {
      if (!duplikat(error)) throw error;
      noorder = await buatNomor(connection, tanggal, 4);
      await connection.execute(sqlInduk, [
        noorder, noRawat, tanggal, jam, dokterPerujuk, kunjungan.status, informasiTambahan, diagnosaKlinis,
      ]);
    }
    for (const kdJenisPrw of items) {
      await connection.execute(
        "INSERT INTO permintaan_pemeriksaan_radiologi (noorder, kd_jenis_prw) VALUES (?, ?)",
        [noorder, kdJenisPrw],
      );
    }
    await connection.commit();
    transaksiDimulai = false;
    return NextResponse.json({
      success: true,
      data: { noorder, status: kunjungan.status },
      message: `Permintaan radiologi ${noorder} berhasil disimpan.`,
    });
  } catch (error: unknown) {
    if (transaksiDimulai && connection) await connection.rollback().catch(() => undefined);
    return gagal(error, "Permintaan radiologi gagal disimpan.");
  } finally {
    if (connection) {
      let amanDikembalikan = true;
      if (kunciDidapat) {
        try {
          const [lepas] = await connection.execute<RowDataPacket[]>("SELECT RELEASE_LOCK(?) AS dilepas", [namaKunci]);
          amanDikembalikan = Number(lepas[0]?.dilepas) === 1;
        } catch {
          amanDikembalikan = false;
        }
      }
      if (amanDikembalikan) connection.release();
      else connection.destroy();
    }
  }
}

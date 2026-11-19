import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { tindakanRawatJalanAccess } from "@/lib/tindakan-rawat-jalan/access";

type ModeTindakan = "dokter" | "petugas" | "gabungan";

interface KonfigurasiMode {
  tabel: "rawat_jl_dr" | "rawat_jl_pr" | "rawat_jl_drpr";
  kolomTotal: "total_byrdr" | "total_byrpr" | "total_byrdrpr";
}

interface RegistrasiTerkunci extends RowDataPacket {
  no_rawat: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_pj: string;
  kd_poli: string;
  kd_dokter: string;
  status_bayar: string;
}

interface TarifTindakan extends RowDataPacket {
  kd_jenis_prw: string;
  material: number | string | null;
  bhp: number | string | null;
  tarif_tindakandr: number | string | null;
  tarif_tindakanpr: number | string | null;
  kso: number | string | null;
  menejemen: number | string | null;
  total_byrdr: number | string | null;
  total_byrpr: number | string | null;
  total_byrdrpr: number | string | null;
}

const KONFIGURASI_MODE: Record<ModeTindakan, KonfigurasiMode> = {
  dokter: { tabel: "rawat_jl_dr", kolomTotal: "total_byrdr" },
  petugas: { tabel: "rawat_jl_pr", kolomTotal: "total_byrpr" },
  gabungan: { tabel: "rawat_jl_drpr", kolomTotal: "total_byrdrpr" },
};

class TindakanError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

function modeDari(value: unknown): ModeTindakan {
  if (value === "dokter" || value === "petugas" || value === "gabungan") return value;
  throw new TindakanError("Jenis penanganan tidak valid.");
}

function angka(value: number | string | null | undefined) {
  return Number(value || 0);
}

function batas(value: string | null, nilaiAwal: number, maksimum: number) {
  return Math.max(1, Math.min(Math.trunc(Number(value)) || nilaiAwal, maksimum));
}

export async function GET(req: NextRequest) {
  try {
    const denied = await tindakanRawatJalanAccess();
    if (denied) return denied;

    const params = req.nextUrl.searchParams;
    const resource = params.get("resource") || "riwayat";
    const mode = modeDari(params.get("mode") || "dokter");
    const cari = params.get("cari")?.trim().slice(0, 80) || "";

    if (resource === "registrasi") return await daftarRegistrasi(cari);
    if (resource === "pelaksana") return await daftarPelaksana(mode, cari);
    if (resource === "tarif") return await daftarTarif(mode, params.get("no_rawat")?.trim() || "", cari);
    if (resource === "riwayat") return await daftarRiwayat(mode, params);
    throw new TindakanError("Jenis data tindakan tidak valid.");
  } catch (error) {
    return kegagalan(error, "Gagal memuat data tindakan rawat jalan.");
  }
}

async function daftarRegistrasi(cari: string) {
  if (cari.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }
  const seperti = `%${cari}%`;
  const rows = await executeQuery(`
    SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur,
           DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, r.jam_reg,
           r.kd_dokter, d.nm_dokter, r.kd_poli, pol.nm_poli, r.kd_pj,
           COALESCE(pj.png_jawab, r.kd_pj) AS png_jawab, r.stts, r.status_bayar
    FROM reg_periksa r
    INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
    INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter
    INNER JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
    LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
    WHERE r.status_lanjut = 'Ralan'
      AND (r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?)
    ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC
    LIMIT 20
  `, [seperti, seperti, seperti]);
  return NextResponse.json({ success: true, data: rows });
}

async function daftarPelaksana(mode: ModeTindakan, cari: string) {
  const seperti = `%${cari}%`;
  const dokter = mode === "petugas" ? [] : await executeQuery(`
    SELECT kd_dokter AS kode, nm_dokter AS nama
    FROM dokter
    WHERE status = '1' AND (kd_dokter LIKE ? OR nm_dokter LIKE ?)
    ORDER BY nm_dokter LIMIT 100
  `, [seperti, seperti]);
  const petugas = mode === "dokter" ? [] : await executeQuery(`
    SELECT nip AS kode, nama
    FROM petugas
    WHERE status = '1' AND (nip LIKE ? OR nama LIKE ?)
    ORDER BY nama LIMIT 100
  `, [seperti, seperti]);
  return NextResponse.json(
    { success: true, data: { dokter, petugas } },
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}

async function daftarTarif(mode: ModeTindakan, noRawat: string, cari: string) {
  if (!noRawat || noRawat.length > 17) throw new TindakanError("Pilih kunjungan terlebih dahulu.");
  const registrasi = await executeQuery<{ kd_pj: string; kd_poli: string }>(
    "SELECT kd_pj, kd_poli FROM reg_periksa WHERE no_rawat = ? AND status_lanjut = 'Ralan' LIMIT 1",
    [noRawat],
  );
  if (!registrasi[0]) throw new TindakanError("Kunjungan rawat jalan tidak ditemukan.", 404);
  const konfigurasi = KONFIGURASI_MODE[mode];
  const seperti = `%${cari}%`;
  const rows = await executeQuery(`
    SELECT jp.kd_jenis_prw, jp.nm_perawatan, COALESCE(kp.nm_kategori, '-') AS nm_kategori,
           jp.${konfigurasi.kolomTotal} AS total
    FROM jns_perawatan jp
    LEFT JOIN kategori_perawatan kp ON kp.kd_kategori = jp.kd_kategori
    WHERE jp.status = '1' AND jp.${konfigurasi.kolomTotal} > 0
      AND (jp.kd_pj = ? OR jp.kd_pj = '-')
      AND (jp.kd_poli = ? OR jp.kd_poli = '-')
      AND (jp.kd_jenis_prw LIKE ? OR jp.nm_perawatan LIKE ? OR kp.nm_kategori LIKE ?)
    ORDER BY jp.nm_perawatan
    LIMIT 100
  `, [registrasi[0].kd_pj, registrasi[0].kd_poli, seperti, seperti, seperti]);
  return NextResponse.json({ success: true, data: rows });
}

async function daftarRiwayat(mode: ModeTindakan, params: URLSearchParams) {
  const tanggalMulai = params.get("tanggal_mulai") || "";
  const tanggalSelesai = params.get("tanggal_selesai") || "";
  if (!isRegistrationDate(tanggalMulai) || !isRegistrationDate(tanggalSelesai) || tanggalMulai > tanggalSelesai) {
    throw new TindakanError("Periode tindakan tidak valid.");
  }
  const cari = params.get("cari")?.trim().slice(0, 80) || "";
  const page = batas(params.get("page"), 1, 100000);
  const limit = batas(params.get("limit"), 50, 100);
  const konfigurasi = KONFIGURASI_MODE[mode];
  const pelaksana = mode === "dokter"
    ? "r.kd_dokter, d.nm_dokter, NULL AS nip, NULL AS nm_petugas"
    : mode === "petugas"
      ? "NULL AS kd_dokter, NULL AS nm_dokter, r.nip, pt.nama AS nm_petugas"
      : "r.kd_dokter, d.nm_dokter, r.nip, pt.nama AS nm_petugas";
  const joinPelaksana = mode === "dokter"
    ? "INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter"
    : mode === "petugas"
      ? "INNER JOIN petugas pt ON pt.nip = r.nip"
      : "INNER JOIN dokter d ON d.kd_dokter = r.kd_dokter INNER JOIN petugas pt ON pt.nip = r.nip";
  const where = ["r.tgl_perawatan BETWEEN ? AND ?"];
  const queryParams: (string | number)[] = [tanggalMulai, tanggalSelesai];
  if (cari) {
    const kolomCariPelaksana = mode === "dokter"
      ? "OR d.nm_dokter LIKE ?"
      : mode === "petugas" ? "OR pt.nama LIKE ?" : "OR d.nm_dokter LIKE ? OR pt.nama LIKE ?";
    where.push(`(r.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR jp.nm_perawatan LIKE ? ${kolomCariPelaksana})`);
    const jumlah = mode === "gabungan" ? 6 : 5;
    queryParams.push(...Array<string>(jumlah).fill(`%${cari}%`));
  }
  const whereSql = `WHERE ${where.join(" AND ")}`;
  const joins = `INNER JOIN reg_periksa rp ON rp.no_rawat = r.no_rawat
    INNER JOIN pasien p ON p.no_rkm_medis = rp.no_rkm_medis
    INNER JOIN jns_perawatan jp ON jp.kd_jenis_prw = r.kd_jenis_prw
    ${joinPelaksana}`;
  const sql = `SELECT r.no_rawat, rp.no_rkm_medis, p.nm_pasien, r.kd_jenis_prw, jp.nm_perawatan,
      ${pelaksana}, DATE_FORMAT(r.tgl_perawatan, '%Y-%m-%d') AS tgl_perawatan,
      r.jam_rawat, r.biaya_rawat, r.stts_bayar
    FROM ${konfigurasi.tabel} r ${joins} ${whereSql}
    ORDER BY r.tgl_perawatan DESC, r.jam_rawat DESC, r.no_rawat DESC
    LIMIT ? OFFSET ?`;
  const [counts, rows] = await Promise.all([
    executeQuery<{ total: number }>(`SELECT COUNT(*) AS total FROM ${konfigurasi.tabel} r ${joins} ${whereSql}`, queryParams),
    executeQuery(sql, [...queryParams, limit, (page - 1) * limit]),
  ]);
  return NextResponse.json({ success: true, data: rows, total: Number(counts[0]?.total || 0), page, limit });
}

export async function POST(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object") throw new TindakanError("Data tindakan tidak valid.");
    const input = body as Record<string, unknown>;
    const mode = modeDari(input.mode);
    const noRawat = typeof input.no_rawat === "string" ? input.no_rawat.trim() : "";
    const tanggal = typeof input.tanggal === "string" ? input.tanggal : "";
    const jam = typeof input.jam === "string" ? input.jam : "";
    const dokter = typeof input.kd_dokter === "string" ? input.kd_dokter.trim() : "";
    const petugas = typeof input.nip === "string" ? input.nip.trim() : "";
    const tindakan = Array.isArray(input.tindakan)
      ? [...new Set(input.tindakan.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean))]
      : [];
    if (!noRawat || noRawat.length > 17 || !isRegistrationDate(tanggal) || !/^\d{2}:\d{2}:\d{2}$/.test(jam)) {
      throw new TindakanError("Kunjungan, tanggal, atau jam tindakan tidak valid.");
    }
    if (tindakan.length === 0 || tindakan.length > 50 || tindakan.some((kode) => kode.length > 15)) {
      throw new TindakanError("Pilih minimal satu dan maksimal 50 tindakan.");
    }
    if (mode !== "petugas" && !dokter) throw new TindakanError("Dokter wajib dipilih.");
    if (mode !== "dokter" && !petugas) throw new TindakanError("Petugas wajib dipilih.");

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [registrasiRows] = await connection.execute<RegistrasiTerkunci[]>(`
      SELECT no_rawat, DATE_FORMAT(tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, jam_reg,
             kd_pj, kd_poli, kd_dokter, status_bayar
      FROM reg_periksa WHERE no_rawat = ? AND status_lanjut = 'Ralan' FOR UPDATE
    `, [noRawat]);
    const registrasi = registrasiRows[0];
    if (!registrasi) throw new TindakanError("Kunjungan rawat jalan tidak ditemukan.", 404);
    if (registrasi.status_bayar === "Sudah Bayar") throw new TindakanError("Billing kunjungan sudah diverifikasi; tindakan tidak dapat ditambahkan.", 409);
    if (`${tanggal} ${jam}` < `${registrasi.tgl_registrasi} ${registrasi.jam_reg}`) {
      throw new TindakanError("Waktu tindakan tidak boleh mendahului waktu registrasi.");
    }
    if (mode !== "petugas") await pastikanPelaksana(connection, "dokter", dokter);
    if (mode !== "dokter") await pastikanPelaksana(connection, "petugas", petugas);

    const placeholder = tindakan.map(() => "?").join(", ");
    const [tarifRows] = await connection.execute<TarifTindakan[]>(`
      SELECT kd_jenis_prw, material, bhp, tarif_tindakandr, tarif_tindakanpr, kso, menejemen,
             total_byrdr, total_byrpr, total_byrdrpr
      FROM jns_perawatan
      WHERE kd_jenis_prw IN (${placeholder}) AND status = '1'
        AND (kd_pj = ? OR kd_pj = '-') AND (kd_poli = ? OR kd_poli = '-')
    `, [...tindakan, registrasi.kd_pj, registrasi.kd_poli]);
    const konfigurasi = KONFIGURASI_MODE[mode];
    const tarifValid = tarifRows.filter((tarif) => angka(tarif[konfigurasi.kolomTotal]) > 0);
    if (tarifValid.length !== tindakan.length) throw new TindakanError("Sebagian tarif tindakan tidak aktif atau tidak sesuai penjamin/poliklinik.", 409);

    for (const tarif of tarifValid) {
      const komponen = [angka(tarif.material), angka(tarif.bhp)];
      if (mode === "dokter") {
        await connection.execute(`INSERT INTO rawat_jl_dr
          (no_rawat, kd_jenis_prw, kd_dokter, tgl_perawatan, jam_rawat, material, bhp, tarif_tindakandr, kso, menejemen, biaya_rawat, stts_bayar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Belum')`,
        [noRawat, tarif.kd_jenis_prw, dokter, tanggal, jam, ...komponen, angka(tarif.tarif_tindakandr), angka(tarif.kso), angka(tarif.menejemen), angka(tarif.total_byrdr)]);
      } else if (mode === "petugas") {
        await connection.execute(`INSERT INTO rawat_jl_pr
          (no_rawat, kd_jenis_prw, nip, tgl_perawatan, jam_rawat, material, bhp, tarif_tindakanpr, kso, menejemen, biaya_rawat, stts_bayar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Belum')`,
        [noRawat, tarif.kd_jenis_prw, petugas, tanggal, jam, ...komponen, angka(tarif.tarif_tindakanpr), angka(tarif.kso), angka(tarif.menejemen), angka(tarif.total_byrpr)]);
      } else {
        await connection.execute(`INSERT INTO rawat_jl_drpr
          (no_rawat, kd_jenis_prw, kd_dokter, nip, tgl_perawatan, jam_rawat, material, bhp, tarif_tindakandr, tarif_tindakanpr, kso, menejemen, biaya_rawat, stts_bayar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Belum')`,
        [noRawat, tarif.kd_jenis_prw, dokter, petugas, tanggal, jam, ...komponen, angka(tarif.tarif_tindakandr), angka(tarif.tarif_tindakanpr), angka(tarif.kso), angka(tarif.menejemen), angka(tarif.total_byrdrpr)]);
      }
    }
    await connection.commit();
    return NextResponse.json({ success: true, data: { jumlah: tarifValid.length }, message: `${tarifValid.length} tindakan berhasil disimpan.` });
  } catch (error) {
    if (connection) await connection.rollback();
    return kegagalan(error, "Tindakan rawat jalan gagal disimpan.");
  } finally {
    connection?.release();
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await tindakanRawatJalanAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const body: unknown = await req.json();
    const input = body && typeof body === "object" ? body as Record<string, unknown> : null;
    const noRawat = typeof input?.no_rawat === "string" ? input.no_rawat.trim() : "";
    if (!noRawat || noRawat.length > 17) throw new TindakanError("No. Rawat tidak valid.");

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [registrasi] = await connection.execute<RowDataPacket[]>(`
      SELECT no_rawat, stts FROM reg_periksa
      WHERE no_rawat = ? AND status_lanjut = 'Ralan' FOR UPDATE
    `, [noRawat]);
    if (!registrasi[0]) throw new TindakanError("Kunjungan rawat jalan tidak ditemukan.", 404);
    if (registrasi[0].stts === "Sudah") {
      await connection.commit();
      return NextResponse.json({ success: true, message: "Status pasien sudah diperiksa." });
    }

    await connection.execute("UPDATE reg_periksa SET stts = 'Sudah' WHERE no_rawat = ?", [noRawat]);
    await connection.execute(`
      INSERT INTO mutasi_berkas (no_rawat, status, dikirim, diterima, kembali, tidakada, ranap)
      VALUES (?, 'Sudah Kembali', NOW(), '0000-00-00 00:00:00', NOW(), '0000-00-00 00:00:00', '0000-00-00 00:00:00')
      ON DUPLICATE KEY UPDATE status = VALUES(status), kembali = VALUES(kembali)
    `, [noRawat]);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Status pasien diperbarui menjadi sudah diperiksa." });
  } catch (error) {
    if (connection) await connection.rollback();
    return kegagalan(error, "Gagal memperbarui status pasien.");
  } finally {
    connection?.release();
  }
}

async function pastikanPelaksana(connection: PoolConnection, jenis: "dokter" | "petugas", kode: string) {
  const tabel = jenis === "dokter" ? "dokter" : "petugas";
  const kolom = jenis === "dokter" ? "kd_dokter" : "nip";
  const [rows] = await connection.execute<RowDataPacket[]>(`SELECT ${kolom} FROM ${tabel} WHERE ${kolom} = ? AND status = '1' LIMIT 1`, [kode]);
  if (!rows[0]) throw new TindakanError(`${jenis === "dokter" ? "Dokter" : "Petugas"} tidak aktif atau tidak ditemukan.`, 409);
}

function kegagalan(error: unknown, fallback: string) {
  if (error instanceof TindakanError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  }
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") {
    return NextResponse.json({ success: false, error: "Tindakan yang sama sudah tercatat pada waktu tersebut." }, { status: 409 });
  }
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

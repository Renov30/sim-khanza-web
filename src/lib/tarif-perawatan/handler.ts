import { NextResponse, type NextRequest } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { pool, executeQuery } from "@/lib/db";
import { KELAS_TARIF, konfigurasiTarif, type JenisTarif } from "@/lib/tarif-perawatan/konfigurasi";
import {
  TarifPerawatanError,
  bacaDaftarKunciTarif,
  bacaFilterTarif,
  bacaInputTarif,
  bacaKunciTarif,
  kondisiFilterTarif,
  nextKodeTarif,
  simpanTarif,
  ubahStatusTarif,
  ubahTarif,
} from "@/lib/tarif-perawatan/tarif";

type AksesTarif = () => Promise<NextResponse | null>;

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new TarifPerawatanError("Data tarif tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new TarifPerawatanError("Isi permintaan tidak valid.");
  }
}

function responsGagal(error: unknown, label: string) {
  if (error instanceof TarifPerawatanError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  console.error(`Gagal ${label}:`, error);
  return NextResponse.json(
    { success: false, error: `Gagal ${label}. Silakan coba kembali.` },
    { status: 500 },
  );
}

export function buatHandlerTarif(jenis: JenisTarif, akses: AksesTarif) {
  const konfigurasi = konfigurasiTarif(jenis);
  const namaUnit = konfigurasi.unitOpsi === "poliklinik" ? "nm_poli" : "nm_bangsal";
  const tabelUnit = konfigurasi.unitOpsi === "poliklinik" ? "poliklinik" : "bangsal";
  const lockName = `simrs-khanza-kode-tarif-${jenis}`;

  const GET = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    try {
      const { searchParams } = new URL(req.url);
      const filter = bacaFilterTarif(jenis, searchParams);
      const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
      const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
      const syarat = kondisiFilterTarif(jenis, filter);
      const jumlah = await executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
           FROM ${konfigurasi.tabel} t
           INNER JOIN kategori_perawatan k ON t.kd_kategori = k.kd_kategori
           INNER JOIN penjab p ON t.kd_pj = p.kd_pj
           INNER JOIN ${tabelUnit} u ON t.${konfigurasi.unitField} = u.${konfigurasi.unitField}
          WHERE ${syarat.sql}`,
        syarat.params,
      );
      const total = Number(jumlah[0]?.total ?? 0);
      const kolom = [
        "t.kd_jenis_prw", "t.nm_perawatan", "t.kd_kategori", "k.nm_kategori",
        "t.material", "t.bhp", "t.tarif_tindakandr", "t.tarif_tindakanpr",
        "t.kso", "t.menejemen", "t.total_byrdr", "t.total_byrpr", "t.total_byrdrpr",
        "t.kd_pj", "p.png_jawab", `t.${konfigurasi.unitField} AS unit`,
        `u.${namaUnit} AS nm_unit`, "t.status",
      ];
      if (konfigurasi.punyaKelas) kolom.push("t.kelas");
      const data = await executeQuery<Record<string, unknown>>(
        `SELECT ${kolom.join(", ")}
           FROM ${konfigurasi.tabel} t
           INNER JOIN kategori_perawatan k ON t.kd_kategori = k.kd_kategori
           INNER JOIN penjab p ON t.kd_pj = p.kd_pj
           INNER JOIN ${tabelUnit} u ON t.${konfigurasi.unitField} = u.${konfigurasi.unitField}
          WHERE ${syarat.sql}
          ORDER BY t.kd_jenis_prw
          LIMIT ? OFFSET ?`,
        [...syarat.params, batas, (halaman - 1) * batas],
      );
      return NextResponse.json({
        success: true,
        data,
        total,
        halaman,
        batas,
        totalHalaman: Math.max(1, Math.ceil(total / batas)),
        filter,
      });
    } catch (error) {
      return responsGagal(error, "memuat data tarif");
    }
  };

  const POST = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    let isi: ReturnType<typeof bacaInputTarif>;
    try {
      isi = bacaInputTarif(jenis, bodyRecord(await bacaBody(req)));
    } catch (error) {
      return responsGagal(error, "menyimpan data tarif");
    }
    const connection = await pool.getConnection();
    let kunci = false;
    let transaksi = false;
    let rusak = false;
    try {
      const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired",
        [lockName],
      );
      kunci = kunciRows[0]?.acquired === 1;
      if (!kunci) {
        throw new TarifPerawatanError("Penomoran kode tarif sedang digunakan. Silakan simpan kembali.", 409);
      }
      const kode = isi.kd_jenis_prw || await nextKodeTarif(connection, jenis);
      const input = { ...isi, kd_jenis_prw: kode };
      await connection.beginTransaction();
      transaksi = true;
      await simpanTarif(connection, jenis, input);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        data: { kd_jenis_prw: kode },
        message: `Tarif ${input.nm_perawatan} (${kode}) berhasil disimpan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "menyimpan data tarif");
    } finally {
      if (kunci) {
        try {
          await connection.execute("SELECT RELEASE_LOCK(?)", [lockName]);
        } catch (error) {
          connection.destroy();
          rusak = true;
          console.error("Gagal melepas lock kode tarif:", error);
        }
      }
      if (!rusak) connection.release();
    }
  };

  const PUT = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    const connection = await pool.getConnection();
    let transaksi = false;
    try {
      const body = bodyRecord(await bacaBody(req));
      const kodeLama = bacaKunciTarif(body, true);
      const isi = bacaInputTarif(jenis, body);
      const input = { ...isi, kd_jenis_prw: isi.kd_jenis_prw || kodeLama };
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahTarif(connection, jenis, input, kodeLama);
      if (!terpengaruh) throw new TarifPerawatanError("Tarif yang diubah tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        data: { kd_jenis_prw: input.kd_jenis_prw },
        message: `Tarif ${input.nm_perawatan} (${input.kd_jenis_prw}) berhasil diperbarui.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "mengubah data tarif");
    } finally {
      connection.release();
    }
  };

  const DELETE = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    const connection = await pool.getConnection();
    let transaksi = false;
    try {
      const kode = bacaDaftarKunciTarif(bodyRecord(await bacaBody(req)));
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahStatusTarif(connection, jenis, kode, "0");
      if (!terpengaruh) throw new TarifPerawatanError("Tarif yang dinonaktifkan tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        message: `${kode.length} tarif berhasil dinonaktifkan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "menonaktifkan tarif");
    } finally {
      connection.release();
    }
  };

  const PATCH = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    const connection = await pool.getConnection();
    let transaksi = false;
    try {
      const body = bodyRecord(await bacaBody(req));
      if (body.status !== "1") {
        throw new TarifPerawatanError("Hanya status pulihkan yang didukung.");
      }
      const kode = bacaDaftarKunciTarif(body);
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahStatusTarif(connection, jenis, kode, "1");
      if (!terpengaruh) throw new TarifPerawatanError("Tarif yang dipulihkan tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        message: `${kode.length} tarif berhasil dipulihkan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "memulihkan tarif");
    } finally {
      connection.release();
    }
  };

  return { GET, POST, PUT, DELETE, PATCH };
}

export function buatHandlerOpsiTarif(jenis: JenisTarif, akses: AksesTarif) {
  const konfigurasi = konfigurasiTarif(jenis);
  const tabelUnit = konfigurasi.unitOpsi === "poliklinik" ? "poliklinik" : "bangsal";
  const namaUnit = konfigurasi.unitOpsi === "poliklinik" ? "nm_poli" : "nm_bangsal";

  return async function GET() {
    const denied = await akses();
    if (denied) return denied;
    try {
      const [kategori, penjab, unit] = await Promise.all([
        executeQuery<RowDataPacket>(
          "SELECT kd_kategori, nm_kategori FROM kategori_perawatan ORDER BY nm_kategori, kd_kategori",
        ),
        executeQuery<RowDataPacket>(
          "SELECT kd_pj, png_jawab FROM penjab ORDER BY png_jawab, kd_pj",
        ),
        executeQuery<RowDataPacket>(
          `SELECT ${konfigurasi.unitField}, ${namaUnit} FROM ${tabelUnit} ORDER BY ${namaUnit}, ${konfigurasi.unitField}`,
        ),
      ]);
      const opsi = (nilai: readonly string[]) => nilai.map((id) => ({ id, label: id }));
      return NextResponse.json({
        success: true,
        data: {
          kategori: kategori.map((row) => ({
            id: String(row.kd_kategori ?? ""),
            label: `${row.kd_kategori ?? ""} ${row.nm_kategori ?? ""}`.trim(),
          })),
          penjab: penjab.map((row) => ({
            id: String(row.kd_pj ?? ""),
            label: `${row.kd_pj ?? ""} ${row.png_jawab ?? ""}`.trim(),
          })),
          unit: unit.map((row) => ({
            id: String(row[konfigurasi.unitField] ?? ""),
            label: `${row[konfigurasi.unitField] ?? ""} ${row[namaUnit] ?? ""}`.trim(),
          })),
          kelas: konfigurasi.punyaKelas ? opsi(KELAS_TARIF) : [],
          status: opsi(["1", "0"]),
        },
      });
    } catch (error) {
      return responsGagal(error, "memuat pilihan tarif");
    }
  };
}

export function buatHandlerKodeTarif(jenis: JenisTarif, akses: AksesTarif) {
  const lockName = `simrs-khanza-kode-tarif-${jenis}`;

  return async function GET() {
    const denied = await akses();
    if (denied) return denied;
    const connection = await pool.getConnection();
    let kunci = false;
    let rusak = false;
    try {
      const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired",
        [lockName],
      );
      kunci = kunciRows[0]?.acquired === 1;
      if (!kunci) throw new TarifPerawatanError("Penomoran kode tarif sedang digunakan.", 409);
      const kode = await nextKodeTarif(connection, jenis);
      return NextResponse.json({ success: true, data: { kd_jenis_prw: kode } });
    } catch (error) {
      return responsGagal(error, "membuat kode tarif");
    } finally {
      if (kunci) {
        try {
          await connection.execute("SELECT RELEASE_LOCK(?)", [lockName]);
        } catch (error) {
          connection.destroy();
          rusak = true;
          console.error("Gagal melepas lock kode tarif:", error);
        }
      }
      if (!rusak) connection.release();
    }
  };
}

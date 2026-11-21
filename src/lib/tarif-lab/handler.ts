import { NextResponse, type NextRequest } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool, executeQuery } from "@/lib/db";
import { KATEGORI_TARIF_LAB, KELAS_TARIF_LAB, TABEL_TARIF_LAB } from "@/lib/tarif-lab/konfigurasi";
import {
  TarifLabError,
  bacaDaftarKunciTarifLab,
  bacaFilterTarifLab,
  bacaInputTarifLab,
  bacaKunciTarifLab,
  kondisiFilterTarifLab,
  nextKodeTarifLab,
  simpanTarifLab,
  ubahStatusTarifLab,
  ubahTarifLab,
} from "@/lib/tarif-lab/tarif";
import {
  KOLOM_TEMPLATE_LAB,
  TABEL_TEMPLATE_LAB,
  bacaInputTemplate,
  bacaKodeTemplate,
  bacaKunciTemplate,
  hapusTemplateLab,
  namaLockTemplateLab,
  pastikanIndukTemplate,
  renomorTemplateLab,
  simpanTemplateLab,
  sqlIndukTemplateLab,
  ubahTemplateLab,
} from "@/lib/tarif-lab/template";

type AksesTarifLab = () => Promise<NextResponse | null>;

const NAMA_LOCK = "simrs-khanza-kode-tarif-lab";
const KOLOM_DAFTAR = [
  "t.kd_jenis_prw", "t.nm_perawatan", "t.bagian_rs", "t.bhp", "t.tarif_perujuk",
  "t.tarif_tindakan_dokter", "t.tarif_tindakan_petugas", "t.kso", "t.menejemen",
  "t.total_byr", "t.kd_pj", "p.png_jawab", "t.kelas", "t.kategori", "t.status",
];

function bodyRecord(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new TarifLabError("Data tarif laboratorium tidak valid.");
  }
  return body as Record<string, unknown>;
}

async function bacaBody(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new TarifLabError("Isi permintaan tidak valid.");
  }
}

function responsGagal(error: unknown, label: string) {
  if (error instanceof TarifLabError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  console.error(`Gagal ${label}:`, error);
  return NextResponse.json(
    { success: false, error: `Gagal ${label}. Silakan coba kembali.` },
    { status: 500 },
  );
}

export function buatHandlerTarifLab(akses: AksesTarifLab) {
  const GET = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    try {
      const { searchParams } = new URL(req.url);
      const filter = bacaFilterTarifLab(searchParams);
      const halaman = Math.max(1, Math.min(Number(searchParams.get("page")) || 1, 10000));
      const batas = Math.max(1, Math.min(Number(searchParams.get("limit")) || 50, 200));
      const syarat = kondisiFilterTarifLab(filter);
      const jumlah = await executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
           FROM ${TABEL_TARIF_LAB} t
          INNER JOIN penjab p ON t.kd_pj = p.kd_pj
          WHERE ${syarat.sql}`,
        syarat.params,
      );
      const total = Number(jumlah[0]?.total ?? 0);
      const data = await executeQuery<Record<string, unknown>>(
        `SELECT ${KOLOM_DAFTAR.join(", ")}
           FROM ${TABEL_TARIF_LAB} t
          INNER JOIN penjab p ON t.kd_pj = p.kd_pj
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
      return responsGagal(error, "memuat tarif laboratorium");
    }
  };

  const POST = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    let isi: ReturnType<typeof bacaInputTarifLab>;
    try {
      isi = bacaInputTarifLab(bodyRecord(await bacaBody(req)));
    } catch (error) {
      return responsGagal(error, "menyimpan tarif laboratorium");
    }
    const connection = await pool.getConnection();
    let kunci = false;
    let transaksi = false;
    let rusak = false;
    try {
      const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired",
        [NAMA_LOCK],
      );
      kunci = kunciRows[0]?.acquired === 1;
      if (!kunci) {
        throw new TarifLabError("Penomoran kode tarif sedang digunakan. Silakan simpan kembali.", 409);
      }
      const kode = isi.kd_jenis_prw || await nextKodeTarifLab(connection);
      const input = { ...isi, kd_jenis_prw: kode };
      await connection.beginTransaction();
      transaksi = true;
      await simpanTarifLab(connection, input);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        data: { kd_jenis_prw: kode },
        message: `Tarif ${input.nm_perawatan} (${kode}) berhasil disimpan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "menyimpan tarif laboratorium");
    } finally {
      if (kunci) {
        try {
          await connection.execute("SELECT RELEASE_LOCK(?)", [NAMA_LOCK]);
        } catch (error) {
          connection.destroy();
          rusak = true;
          console.error("Gagal melepas lock kode tarif laboratorium:", error);
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
      const kodeLama = bacaKunciTarifLab(body, true);
      const isi = bacaInputTarifLab(body);
      const input = { ...isi, kd_jenis_prw: isi.kd_jenis_prw || kodeLama };
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahTarifLab(connection, input, kodeLama);
      if (!terpengaruh) throw new TarifLabError("Tarif yang diubah tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        data: { kd_jenis_prw: input.kd_jenis_prw },
        message: `Tarif ${input.nm_perawatan} (${input.kd_jenis_prw}) berhasil diperbarui.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "mengubah tarif laboratorium");
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
      const kode = bacaDaftarKunciTarifLab(bodyRecord(await bacaBody(req)));
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahStatusTarifLab(connection, kode, "0");
      if (!terpengaruh) throw new TarifLabError("Tarif yang dinonaktifkan tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        message: `${kode.length} tarif berhasil dinonaktifkan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "menonaktifkan tarif laboratorium");
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
        throw new TarifLabError("Hanya status pulihkan yang didukung.");
      }
      const kode = bacaDaftarKunciTarifLab(body);
      await connection.beginTransaction();
      transaksi = true;
      const terpengaruh = await ubahStatusTarifLab(connection, kode, "1");
      if (!terpengaruh) throw new TarifLabError("Tarif yang dipulihkan tidak ditemukan.", 404);
      await connection.commit();
      transaksi = false;
      return NextResponse.json({
        success: true,
        message: `${kode.length} tarif berhasil dipulihkan.`,
      });
    } catch (error) {
      if (transaksi) await connection.rollback();
      return responsGagal(error, "memulihkan tarif laboratorium");
    } finally {
      connection.release();
    }
  };

  return { GET, POST, PUT, DELETE, PATCH };
}

export function buatHandlerOpsiTarifLab(akses: AksesTarifLab) {
  return async function GET() {
    const denied = await akses();
    if (denied) return denied;
    try {
      const penjab = await executeQuery<RowDataPacket>(
        "SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab, kd_pj",
      );
      const opsi = (nilai: readonly string[]) => nilai.map((id) => ({ id, label: id }));
      return NextResponse.json({
        success: true,
        data: {
          kategori: opsi(KATEGORI_TARIF_LAB),
          penjab: penjab.map((row) => ({
            id: String(row.kd_pj ?? ""),
            label: `${row.kd_pj ?? ""} ${row.png_jawab ?? ""}`.trim(),
          })),
          kelas: opsi(KELAS_TARIF_LAB),
          status: [
            { id: "1", label: "Aktif" },
            { id: "0", label: "Nonaktif" },
          ],
        },
      });
    } catch (error) {
      return responsGagal(error, "memuat pilihan tarif laboratorium");
    }
  };
}

export function buatHandlerKodeTarifLab(akses: AksesTarifLab) {
  return async function GET() {
    const denied = await akses();
    if (denied) return denied;
    const connection = await pool.getConnection();
    let kunci = false;
    let rusak = false;
    try {
      const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
        "SELECT GET_LOCK(?, 10) AS acquired",
        [NAMA_LOCK],
      );
      kunci = kunciRows[0]?.acquired === 1;
      if (!kunci) throw new TarifLabError("Penomoran kode tarif sedang digunakan.", 409);
      const kode = await nextKodeTarifLab(connection);
      return NextResponse.json({ success: true, data: { kd_jenis_prw: kode } });
    } catch (error) {
      return responsGagal(error, "membuat kode tarif laboratorium");
    } finally {
      if (kunci) {
        try {
          await connection.execute("SELECT RELEASE_LOCK(?)", [NAMA_LOCK]);
        } catch (error) {
          connection.destroy();
          rusak = true;
          console.error("Gagal melepas lock kode tarif laboratorium:", error);
        }
      }
      if (!rusak) connection.release();
    }
  };
}

type HasilMutasiTemplate = { data?: unknown; message: string };

async function jalankanMutasiTemplate(
  kode: string,
  aksi: (connection: PoolConnection) => Promise<HasilMutasiTemplate>,
) {
  const connection = await pool.getConnection();
  const namaKunci = namaLockTemplateLab(kode);
  let kunci = false;
  let transaksi = false;
  let rusak = false;
  try {
    const [kunciRows] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
      "SELECT GET_LOCK(?, 10) AS acquired",
      [namaKunci],
    );
    kunci = kunciRows[0]?.acquired === 1;
    if (!kunci) {
      throw new TarifLabError("Item pemeriksaan sedang diubah petugas lain. Silakan coba kembali.", 409);
    }
    await connection.beginTransaction();
    transaksi = true;
    const [induk] = await connection.execute<(RowDataPacket & { kategori?: string })[]>(
      sqlIndukTemplateLab(),
      [kode],
    );
    pastikanIndukTemplate(induk);
    const hasil = await aksi(connection);
    await renomorTemplateLab(connection, kode);
    await connection.commit();
    transaksi = false;
    return hasil;
  } catch (error) {
    if (transaksi) await connection.rollback();
    throw error;
  } finally {
    if (kunci) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [namaKunci]);
      } catch (error) {
        connection.destroy();
        rusak = true;
        console.error("Gagal melepas lock item pemeriksaan laboratorium:", error);
      }
    }
    if (!rusak) connection.release();
  }
}

export function buatHandlerTemplateLab(akses: AksesTarifLab) {
  const GET = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    try {
      const { searchParams } = new URL(req.url);
      const kode = bacaKodeTemplate(searchParams.get("kd_jenis_prw"), "Kode tarif", 15);
      const induk = await executeQuery<RowDataPacket & { kategori?: string }>(
        `SELECT kategori FROM ${TABEL_TARIF_LAB} WHERE kd_jenis_prw = ?`,
        [kode],
      );
      pastikanIndukTemplate(induk);
      const data = await executeQuery<Record<string, unknown>>(
        `SELECT ${KOLOM_TEMPLATE_LAB.join(", ")}
           FROM ${TABEL_TEMPLATE_LAB}
          WHERE kd_jenis_prw = ?
          ORDER BY urut, id_template`,
        [kode],
      );
      return NextResponse.json({ success: true, data, total: data.length, kd_jenis_prw: kode });
    } catch (error) {
      return responsGagal(error, "memuat item pemeriksaan");
    }
  };

  const POST = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    let isi: ReturnType<typeof bacaInputTemplate>;
    try {
      isi = bacaInputTemplate(bodyRecord(await bacaBody(req)));
    } catch (error) {
      return responsGagal(error, "menyimpan item pemeriksaan");
    }
    try {
      const hasil = await jalankanMutasiTemplate(isi.kd_jenis_prw, async (connection) => {
        const id = await simpanTemplateLab(connection, isi);
        return {
          data: { id_template: id, kd_jenis_prw: isi.kd_jenis_prw },
          message: `Item ${isi.pemeriksaan} berhasil ditambahkan dengan ID ${id}.`,
        };
      });
      return NextResponse.json({ success: true, ...hasil });
    } catch (error) {
      return responsGagal(error, "menyimpan item pemeriksaan");
    }
  };

  const PUT = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    let kunci: ReturnType<typeof bacaKunciTemplate>;
    let isi: ReturnType<typeof bacaInputTemplate>;
    try {
      const body = bodyRecord(await bacaBody(req));
      kunci = bacaKunciTemplate(body);
      isi = bacaInputTemplate(body);
      if (isi.kd_jenis_prw !== kunci.kode) {
        throw new TarifLabError("Kode tarif item tidak cocok.");
      }
    } catch (error) {
      return responsGagal(error, "mengubah item pemeriksaan");
    }
    try {
      const hasil = await jalankanMutasiTemplate(kunci.kode, async (connection) => {
        const terpengaruh = await ubahTemplateLab(connection, isi, kunci.id);
        if (!terpengaruh) throw new TarifLabError("Item pemeriksaan tidak ditemukan.", 404);
        return {
          data: { id_template: kunci.id, kd_jenis_prw: kunci.kode },
          message: `Item ${isi.pemeriksaan} (ID ${kunci.id}) berhasil diperbarui.`,
        };
      });
      return NextResponse.json({ success: true, ...hasil });
    } catch (error) {
      return responsGagal(error, "mengubah item pemeriksaan");
    }
  };

  const DELETE = async (req: NextRequest) => {
    const denied = await akses();
    if (denied) return denied;
    let kunci: ReturnType<typeof bacaKunciTemplate>;
    try {
      kunci = bacaKunciTemplate(bodyRecord(await bacaBody(req)));
    } catch (error) {
      return responsGagal(error, "menghapus item pemeriksaan");
    }
    try {
      const hasil = await jalankanMutasiTemplate(kunci.kode, async (connection) => {
        const terpengaruh = await hapusTemplateLab(connection, kunci.id, kunci.kode);
        if (!terpengaruh) throw new TarifLabError("Item pemeriksaan tidak ditemukan.", 404);
        return { message: `Item dengan ID ${kunci.id} berhasil dihapus.` };
      });
      return NextResponse.json({ success: true, ...hasil });
    } catch (error) {
      return responsGagal(error, "menghapus item pemeriksaan");
    }
  };

  return { GET, POST, PUT, DELETE };
}

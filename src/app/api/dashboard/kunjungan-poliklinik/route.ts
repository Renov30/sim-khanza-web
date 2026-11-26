import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

function tanggalValid(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}

function hariIni(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export async function GET(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tgl = hariIni();
    const mulai = (searchParams.get("tanggal_mulai") || tgl).trim();
    const selesai = (searchParams.get("tanggal_selesai") || tgl).trim();

    if (!tanggalValid(mulai) || !tanggalValid(selesai) || mulai > selesai) {
      return NextResponse.json({ success: false, error: "Rentang tanggal tidak valid." }, { status: 400 });
    }

    const [ringkasanRows, perPoliRows, perPenjabRows] = await Promise.all([
      executeQuery<{
        total: number;
        baru: number;
        lama: number;
        sudah: number;
        belum: number;
        batal: number;
      }>(
        `SELECT COUNT(*) AS total,
                SUM(CASE WHEN stts_daftar = 'Baru' THEN 1 ELSE 0 END) AS baru,
                SUM(CASE WHEN stts_daftar = 'Lama' THEN 1 ELSE 0 END) AS lama,
                SUM(CASE WHEN stts = 'Sudah' THEN 1 ELSE 0 END) AS sudah,
                SUM(CASE WHEN stts = 'Belum' THEN 1 ELSE 0 END) AS belum,
                SUM(CASE WHEN stts = 'Batal' THEN 1 ELSE 0 END) AS batal
         FROM reg_periksa
         WHERE tgl_registrasi BETWEEN ? AND ?`,
        [mulai, selesai],
      ),
      executeQuery<{
        kd_poli: string;
        nm_poli: string;
        total: number;
        baru: number;
        lama: number;
        sudah: number;
        belum: number;
        batal: number;
      }>(
        `SELECT r.kd_poli, COALESCE(p.nm_poli, r.kd_poli) AS nm_poli,
                COUNT(*) AS total,
                SUM(CASE WHEN r.stts_daftar = 'Baru' THEN 1 ELSE 0 END) AS baru,
                SUM(CASE WHEN r.stts_daftar = 'Lama' THEN 1 ELSE 0 END) AS lama,
                SUM(CASE WHEN r.stts = 'Sudah' THEN 1 ELSE 0 END) AS sudah,
                SUM(CASE WHEN r.stts = 'Belum' THEN 1 ELSE 0 END) AS belum,
                SUM(CASE WHEN r.stts = 'Batal' THEN 1 ELSE 0 END) AS batal
         FROM reg_periksa r
         LEFT JOIN poliklinik p ON p.kd_poli = r.kd_poli
         WHERE r.tgl_registrasi BETWEEN ? AND ?
         GROUP BY r.kd_poli, p.nm_poli
         ORDER BY total DESC, nm_poli ASC`,
        [mulai, selesai],
      ),
      executeQuery<{ kd_pj: string; png_jawab: string; total: number }>(
        `SELECT r.kd_pj, COALESCE(pj.png_jawab, r.kd_pj) AS png_jawab, COUNT(*) AS total
         FROM reg_periksa r
         LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
         WHERE r.tgl_registrasi BETWEEN ? AND ?
         GROUP BY r.kd_pj, pj.png_jawab
         ORDER BY total DESC
         LIMIT 15`,
        [mulai, selesai],
      ),
    ]);

    const r = ringkasanRows[0];
    return NextResponse.json({
      success: true,
      data: {
        periode: { mulai, selesai },
        ringkasan: {
          total: Number(r?.total || 0),
          baru: Number(r?.baru || 0),
          lama: Number(r?.lama || 0),
          sudah: Number(r?.sudah || 0),
          belum: Number(r?.belum || 0),
          batal: Number(r?.batal || 0),
        },
        poliklinik: perPoliRows.map((x) => ({
          kd_poli: x.kd_poli,
          nm_poli: x.nm_poli,
          total: Number(x.total || 0),
          baru: Number(x.baru || 0),
          lama: Number(x.lama || 0),
          sudah: Number(x.sudah || 0),
          belum: Number(x.belum || 0),
          batal: Number(x.batal || 0),
        })),
        penjab: perPenjabRows.map((x) => ({
          kd_pj: x.kd_pj,
          png_jawab: x.png_jawab,
          total: Number(x.total || 0),
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memuat dashboard kunjungan poliklinik." },
      { status: 500 },
    );
  }
}

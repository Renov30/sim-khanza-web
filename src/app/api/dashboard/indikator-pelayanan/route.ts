import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

function tanggalValid(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}

function defaultRentangBulan(): { mulai: string; selesai: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return { mulai: `${y}-${m}-01`, selesai: `${y}-${m}-${d}` };
}

export async function GET(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const def = defaultRentangBulan();
    const mulai = (searchParams.get("tanggal_mulai") || def.mulai).trim();
    const selesai = (searchParams.get("tanggal_selesai") || def.selesai).trim();

    if (!tanggalValid(mulai) || !tanggalValid(selesai) || mulai > selesai) {
      return NextResponse.json({ success: false, error: "Rentang tanggal tidak valid." }, { status: 400 });
    }

    const t1 = new Date(`${mulai}T00:00:00Z`).getTime();
    const t2 = new Date(`${selesai}T00:00:00Z`).getTime();
    const jumlahHari = Math.max(1, Math.round((t2 - t1) / 86_400_000) + 1);

    const [kamarRows, keluarRows, perBangsalRows] = await Promise.all([
      executeQuery<{ total_tt: number; tt_isi: number; tt_kosong: number }>(
        `SELECT COUNT(*) AS total_tt,
                SUM(CASE WHEN status = 'ISI' THEN 1 ELSE 0 END) AS tt_isi,
                SUM(CASE WHEN status = 'KOSONG' THEN 1 ELSE 0 END) AS tt_kosong
         FROM kamar
         WHERE statusdata = '1'`,
      ),
      executeQuery<{
        pasien_keluar: number;
        total_lama: number;
        meninggal_total: number;
        meninggal_48: number;
      }>(
        `SELECT COUNT(*) AS pasien_keluar,
                COALESCE(SUM(GREATEST(1, lama)), 0) AS total_lama,
                SUM(CASE WHEN stts_pulang = 'Meninggal' THEN 1 ELSE 0 END) AS meninggal_total,
                SUM(CASE WHEN stts_pulang = 'Meninggal' AND lama >= 2 THEN 1 ELSE 0 END) AS meninggal_48
         FROM kamar_inap
         WHERE stts_pulang <> '-' AND stts_pulang <> 'Pindah Kamar'
           AND tgl_keluar BETWEEN ? AND ?`,
        [mulai, selesai],
      ),
      executeQuery<{
        kd_bangsal: string;
        nm_bangsal: string;
        total_tt: number;
        tt_isi: number;
        tt_kosong: number;
        pasien_keluar: number;
        hari_perawatan: number;
      }>(
        `SELECT b.kd_bangsal, b.nm_bangsal,
                COUNT(k.kd_kamar) AS total_tt,
                SUM(CASE WHEN k.status = 'ISI' THEN 1 ELSE 0 END) AS tt_isi,
                SUM(CASE WHEN k.status = 'KOSONG' THEN 1 ELSE 0 END) AS tt_kosong,
                COALESCE(stat.pasien_keluar, 0) AS pasien_keluar,
                COALESCE(stat.hari_perawatan, 0) AS hari_perawatan
         FROM bangsal b
         INNER JOIN kamar k ON k.kd_bangsal = b.kd_bangsal AND k.statusdata = '1'
         LEFT JOIN (
           SELECT k2.kd_bangsal,
                  COUNT(*) AS pasien_keluar,
                  COALESCE(SUM(GREATEST(1, ki.lama)), 0) AS hari_perawatan
           FROM kamar_inap ki
           INNER JOIN kamar k2 ON k2.kd_kamar = ki.kd_kamar
           WHERE ki.stts_pulang <> '-' AND ki.stts_pulang <> 'Pindah Kamar'
             AND ki.tgl_keluar BETWEEN ? AND ?
           GROUP BY k2.kd_bangsal
         ) stat ON stat.kd_bangsal = b.kd_bangsal
         WHERE b.status = '1'
         GROUP BY b.kd_bangsal, b.nm_bangsal, stat.pasien_keluar, stat.hari_perawatan
         ORDER BY b.nm_bangsal ASC`,
        [mulai, selesai],
      ),
    ]);

    const totalTt = Number(kamarRows[0]?.total_tt || 0);
    const ttIsi = Number(kamarRows[0]?.tt_isi || 0);
    const ttKosong = Number(kamarRows[0]?.tt_kosong || 0);
    const pasienKeluar = Number(keluarRows[0]?.pasien_keluar || 0);
    const totalLama = Number(keluarRows[0]?.total_lama || 0);
    const meninggalTotal = Number(keluarRows[0]?.meninggal_total || 0);
    const meninggal48 = Number(keluarRows[0]?.meninggal_48 || 0);

    const ttHari = totalTt * jumlahHari;
    const bor = ttHari > 0 ? Number(((totalLama / ttHari) * 100).toFixed(2)) : 0;
    const alos = pasienKeluar > 0 ? Number((totalLama / pasienKeluar).toFixed(2)) : 0;
    const toi = pasienKeluar > 0 ? Number((Math.max(0, ttHari - totalLama) / pasienKeluar).toFixed(2)) : 0;
    const bto = totalTt > 0 ? Number((pasienKeluar / totalTt).toFixed(2)) : 0;
    const gdr = pasienKeluar > 0 ? Number(((meninggalTotal / pasienKeluar) * 1000).toFixed(2)) : 0;
    const ndr = pasienKeluar > 0 ? Number(((meninggal48 / pasienKeluar) * 1000).toFixed(2)) : 0;

    const bangsal = perBangsalRows.map((r) => {
      const bTt = Number(r.total_tt || 0);
      const bHari = Number(r.hari_perawatan || 0);
      const bKeluar = Number(r.pasien_keluar || 0);
      const bBor = bTt * jumlahHari > 0 ? Number(((bHari / (bTt * jumlahHari)) * 100).toFixed(2)) : 0;
      const bAlos = bKeluar > 0 ? Number((bHari / bKeluar).toFixed(2)) : 0;
      return {
        kd_bangsal: r.kd_bangsal,
        nm_bangsal: r.nm_bangsal,
        total_tt: bTt,
        tt_isi: Number(r.tt_isi || 0),
        tt_kosong: Number(r.tt_kosong || 0),
        pasien_keluar: bKeluar,
        hari_perawatan: bHari,
        bor: bBor,
        alos: bAlos,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        periode: { mulai, selesai, jumlahHari },
        indikator: {
          totalTt,
          ttIsi,
          ttKosong,
          pasienKeluar,
          totalLama,
          meninggalTotal,
          meninggal48,
          bor,
          alos,
          toi,
          bto,
          gdr,
          ndr,
        },
        bangsal,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memuat indikator pelayanan." },
      { status: 500 },
    );
  }
}

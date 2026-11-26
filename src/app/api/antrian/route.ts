import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

type JenisAntrian = "loket" | "poli" | "apotek" | "laborat";
const JENIS_VALID: readonly JenisAntrian[] = ["loket", "poli", "apotek", "laborat"];

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
    const jenisRaw = (searchParams.get("jenis") || "loket").trim() as JenisAntrian;
    const jenis: JenisAntrian = JENIS_VALID.includes(jenisRaw) ? jenisRaw : "loket";
    const tanggal = /^\d{4}-\d{2}-\d{2}$/.test(searchParams.get("tanggal") || "")
      ? (searchParams.get("tanggal") as string)
      : hariIni();

    const tabelTeks = jenis === "apotek" ? "runtextapotek" : "runtext";
    const [instansiRows, teksRows] = await Promise.all([
      executeQuery<{ nama_instansi: string }>(`SELECT nama_instansi FROM setting LIMIT 1`),
      executeQuery<{ teks: string }>(`SELECT teks FROM \`${tabelTeks}\` WHERE aktifkan = 'Yes' LIMIT 1`).catch(() => []),
    ]);

    let daftar: Record<string, unknown>[] = [];
    if (jenis === "loket" || jenis === "poli") {
      daftar = await executeQuery<Record<string, unknown>>(
        `SELECT r.no_reg AS nomor, r.no_rawat, r.jam_reg AS jam, p.nm_pasien,
                COALESCE(pol.nm_poli, r.kd_poli) AS unit,
                COALESCE(d.nm_dokter, r.kd_dokter) AS dokter,
                r.stts AS status
         FROM reg_periksa r
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
         LEFT JOIN dokter d ON d.kd_dokter = r.kd_dokter
         WHERE r.tgl_registrasi = ? AND r.status_lanjut = 'Ralan'
         ORDER BY r.jam_reg DESC, r.no_reg DESC
         LIMIT 50`,
        [tanggal],
      );
    } else if (jenis === "apotek") {
      daftar = await executeQuery<Record<string, unknown>>(
        `SELECT ro.no_resep AS nomor, ro.no_rawat, ro.jam_peresepan AS jam, p.nm_pasien,
                COALESCE(pol.nm_poli, ro.status) AS unit,
                COALESCE(d.nm_dokter, ro.kd_dokter) AS dokter,
                CASE
                  WHEN ro.tgl_penyerahan IS NOT NULL AND ro.tgl_penyerahan <> '0000-00-00' THEN 'Diserahkan'
                  WHEN ro.tgl_perawatan IS NOT NULL AND ro.tgl_perawatan <> '0000-00-00' THEN 'Tervalidasi'
                  ELSE 'Menunggu'
                END AS status
         FROM resep_obat ro
         INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
         LEFT JOIN dokter d ON d.kd_dokter = ro.kd_dokter
         WHERE ro.tgl_peresepan = ?
         ORDER BY ro.jam_peresepan DESC, ro.no_resep DESC
         LIMIT 50`,
        [tanggal],
      );
    } else {
      daftar = await executeQuery<Record<string, unknown>>(
        `SELECT pl.noorder AS nomor, pl.no_rawat, pl.jam_permintaan AS jam, p.nm_pasien,
                COALESCE(pol.nm_poli, pl.status) AS unit,
                COALESCE(d.nm_dokter, pl.dokter_perujuk) AS dokter,
                CASE
                  WHEN pl.tgl_hasil IS NOT NULL AND pl.tgl_hasil <> '0000-00-00' THEN 'Hasil Selesai'
                  WHEN pl.tgl_sampel IS NOT NULL AND pl.tgl_sampel <> '0000-00-00' THEN 'Proses Sampel'
                  ELSE 'Menunggu Sampel'
                END AS status
         FROM permintaan_lab pl
         INNER JOIN reg_periksa r ON r.no_rawat = pl.no_rawat
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
         LEFT JOIN dokter d ON d.kd_dokter = pl.dokter_perujuk
         WHERE pl.tgl_permintaan = ?
         ORDER BY pl.jam_permintaan DESC, pl.noorder DESC
         LIMIT 50`,
        [tanggal],
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        jenis,
        tanggal,
        instansi: instansiRows[0]?.nama_instansi || "Rumah Sakit",
        runningText: teksRows[0]?.teks || "",
        aktif: daftar[0] || null,
        daftar,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memuat display antrian." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const noRawat = (searchParams.get("no_rawat") || "").trim();
    if (!noRawat || noRawat.length > 30) {
      return NextResponse.json({ success: false, error: "Parameter no_rawat tidak valid." }, { status: 400 });
    }

    const [kunjunganRows, kamarRows, sepRows, instansiRows, diagnosaRows] = await Promise.all([
      executeQuery<Record<string, unknown>>(
        `SELECT r.no_rawat, r.no_reg, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi, r.jam_reg,
                r.no_rkm_medis, r.kd_dokter, d.nm_dokter, r.kd_poli, pol.nm_poli,
                r.kd_pj, pj.png_jawab, r.p_jawab, r.almt_pj, r.hubunganpj, r.stts, r.status_lanjut, r.status_bayar,
                r.umurdaftar, r.sttsumur,
                p.nm_pasien, p.jk, p.tmp_lahir, DATE_FORMAT(p.tgl_lahir, '%Y-%m-%d') AS tgl_lahir,
                p.alamat, p.no_tlp, p.no_ktp, p.no_peserta, p.gol_darah, p.agama, p.stts_nikah, p.pekerjaan
         FROM reg_periksa r
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN dokter d ON d.kd_dokter = r.kd_dokter
         LEFT JOIN poliklinik pol ON pol.kd_poli = r.kd_poli
         LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
         WHERE r.no_rawat = ?
         LIMIT 1`,
        [noRawat],
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT ki.kd_kamar, b.nm_bangsal, k.kelas, ki.diagnosa_awal, ki.diagnosa_akhir,
                DATE_FORMAT(ki.tgl_masuk, '%Y-%m-%d') AS tgl_masuk, ki.jam_masuk,
                DATE_FORMAT(ki.tgl_keluar, '%Y-%m-%d') AS tgl_keluar, ki.jam_keluar,
                ki.lama, ki.ttl_biaya, ki.stts_pulang
         FROM kamar_inap ki
         LEFT JOIN kamar k ON k.kd_kamar = ki.kd_kamar
         LEFT JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
         WHERE ki.no_rawat = ?
         ORDER BY ki.tgl_masuk DESC, ki.jam_masuk DESC
         LIMIT 1`,
        [noRawat],
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT no_sep, DATE_FORMAT(tglsep, '%Y-%m-%d') AS tglsep, no_kartu, nomr, diagawal, nmdiagnosaawal,
                nmpolitujuan, nmdpdjp, peserta, klsrawat
         FROM bridging_sep
         WHERE no_rawat = ?
         ORDER BY tglsep DESC
         LIMIT 1`,
        [noRawat],
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT nama_instansi, alamat_instansi, kabupaten, propinsi, kontak, email FROM setting LIMIT 1`,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT dp.kd_penyakit, py.nm_penyakit, dp.prioritas, dp.status
         FROM diagnosa_pasien dp
         LEFT JOIN penyakit py ON py.kd_penyakit = dp.kd_penyakit
         WHERE dp.no_rawat = ?
         ORDER BY dp.prioritas ASC
         LIMIT 5`,
        [noRawat],
      ),
    ]);

    if (kunjunganRows.length === 0) {
      return NextResponse.json({ success: false, error: `Data kunjungan ${noRawat} tidak ditemukan.` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        kunjungan: kunjunganRows[0],
        kamar: kamarRows[0] || null,
        sep: sepRows[0] || null,
        instansi: instansiRows[0] || null,
        diagnosa: diagnosaRows,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memuat dokumen cetak." },
      { status: 500 },
    );
  }
}

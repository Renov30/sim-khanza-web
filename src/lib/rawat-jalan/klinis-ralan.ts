import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import {
  PelayananError,
  bacaBodyJson,
  bacaEnum,
  bacaJam,
  bacaPagination,
  bacaTanggal,
  bacaTanggalQuery,
  bacaTeks,
  cekAksesModul,
  denganTransaksi,
  responsDaftar,
  tanganiErrorPelayanan,
} from "@/lib/modul/pelayanan";

/* -------------------------------------------------------------------------- */
/* 15. PERMINTAAN LAYANAN PROGRAM KFR (DlgCariPermintaanLayananProgramKFR)    */
/* -------------------------------------------------------------------------- */
const STATUS_KFR = ["Belum Selesai", "Sudah Selesai"] as const;
const PENDAMPING_KFR = ["Tidak", "Suami", "Istri", "Anak", "Keluarga", "Lainnya"] as const;
const YA_TIDAK = ["Tidak", "Ya"] as const;

export async function getPermintaanKfr(req: NextRequest) {
  const { denied } = await cekAksesModul("layanan_kedokteran_fisik_rehabilitasi", "Permintaan Layanan Program KFR");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("DATE(kfr.tanggal) >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("DATE(kfr.tanggal) <= ?"); params.push(tglSelesai); }
    if (STATUS_KFR.some((s) => s === status)) { where.push("kfr.status_program = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(kfr.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR kfr.diagnosa_medis LIKE ? OR COALESCE(d.nm_dokter,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, dokterRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM layanan_kedokteran_fisik_rehabilitasi kfr
         INNER JOIN reg_periksa rp ON kfr.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN dokter d ON kfr.kd_dokter = d.kd_dokter
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT kfr.no_rawat, DATE_FORMAT(kfr.tanggal, '%Y-%m-%d %H:%i:%s') AS tanggal,
                rp.no_rkm_medis, ps.nm_pasien, ps.jk,
                COALESCE(pj.png_jawab, '') AS png_jawab,
                kfr.kd_dokter, COALESCE(d.nm_dokter, '') AS nm_dokter,
                kfr.pendamping, kfr.keterangan_pendamping, kfr.anamnesa,
                kfr.pemeriksaan_fisik, kfr.diagnosa_medis, kfr.diagnosa_fungsi,
                kfr.tatalaksana, kfr.anjuran, kfr.evaluasi,
                kfr.suspek_penyakit_kerja, kfr.keterangan_suspek_penyakit_kerja,
                kfr.status_program
         FROM layanan_kedokteran_fisik_rehabilitasi kfr
         INNER JOIN reg_periksa rp ON kfr.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
         LEFT JOIN dokter d ON kfr.kd_dokter = d.kd_dokter
         WHERE ${whereSql}
         ORDER BY kfr.tanggal DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_dokter: string; nm_dokter: string }>(
        "SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC",
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        dokter: dokterRows.map((d) => ({ value: d.kd_dokter, label: `${d.kd_dokter} - ${d.nm_dokter}` })),
        pendamping: PENDAMPING_KFR.map((p) => ({ value: p, label: p })),
        status: STATUS_KFR.map((s) => ({ value: s, label: s })),
        yaTidak: YA_TIDAK.map((y) => ({ value: y, label: y })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat permintaan layanan program KFR.");
  }
}

export async function postPermintaanKfr(req: NextRequest) {
  const { denied } = await cekAksesModul("layanan_kedokteran_fisik_rehabilitasi", "Permintaan Layanan Program KFR");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tanggal = bacaTanggal(body, "tgl_only", "Tanggal");
    const jam = bacaJam(body, "jam_only", "Jam", false) || "08:00:00";
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter", 20);
    const pendamping = bacaEnum(body, "pendamping", "Pendamping", PENDAMPING_KFR, "Tidak");
    const ketPendamping = bacaTeks(body, "keterangan_pendamping", "Keterangan Pendamping", 30, false);
    const anamnesa = bacaTeks(body, "anamnesa", "Anamnesa", 500, false);
    const pemeriksaanFisik = bacaTeks(body, "pemeriksaan_fisik", "Pemeriksaan Fisik", 1500, false);
    const diagnosaMedis = bacaTeks(body, "diagnosa_medis", "Diagnosa Medis", 200);
    const diagnosaFungsi = bacaTeks(body, "diagnosa_fungsi", "Diagnosa Fungsi", 200, false);
    const tatalaksana = bacaTeks(body, "tatalaksana", "Tata Laksana KFR", 2000);
    const anjuran = bacaTeks(body, "anjuran", "Anjuran", 500, false);
    const evaluasi = bacaTeks(body, "evaluasi", "Evaluasi", 500, false);
    const suspek = bacaEnum(body, "suspek_penyakit_kerja", "Suspek Penyakit Kerja", YA_TIDAK, "Tidak");
    const ketSuspek = bacaTeks(body, "keterangan_suspek_penyakit_kerja", "Keterangan Suspek", 70, false);
    const statusProgram = bacaEnum(body, "status_program", "Status Program", STATUS_KFR, "Belum Selesai");

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO layanan_kedokteran_fisik_rehabilitasi
         (no_rawat, tanggal, kd_dokter, pendamping, keterangan_pendamping, anamnesa, pemeriksaan_fisik,
          diagnosa_medis, diagnosa_fungsi, tatalaksana, anjuran, evaluasi, suspek_penyakit_kerja,
          keterangan_suspek_penyakit_kerja, status_program)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          noRawat, `${tanggal} ${jam}`, kdDokter, pendamping, ketPendamping, anamnesa, pemeriksaanFisik,
          diagnosaMedis, diagnosaFungsi, tatalaksana, anjuran, evaluasi, suspek, ketSuspek, statusProgram,
        ],
      );
    });
    return NextResponse.json({ success: true, message: `Permintaan layanan KFR ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan permintaan layanan KFR.");
  }
}

export async function putPermintaanKfr(req: NextRequest) {
  const { denied } = await cekAksesModul("layanan_kedokteran_fisik_rehabilitasi", "Permintaan Layanan Program KFR");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter", 20);
    const pendamping = bacaEnum(body, "pendamping", "Pendamping", PENDAMPING_KFR, "Tidak");
    const ketPendamping = bacaTeks(body, "keterangan_pendamping", "Keterangan Pendamping", 30, false);
    const anamnesa = bacaTeks(body, "anamnesa", "Anamnesa", 500, false);
    const pemeriksaanFisik = bacaTeks(body, "pemeriksaan_fisik", "Pemeriksaan Fisik", 1500, false);
    const diagnosaMedis = bacaTeks(body, "diagnosa_medis", "Diagnosa Medis", 200);
    const diagnosaFungsi = bacaTeks(body, "diagnosa_fungsi", "Diagnosa Fungsi", 200, false);
    const tatalaksana = bacaTeks(body, "tatalaksana", "Tata Laksana KFR", 2000);
    const anjuran = bacaTeks(body, "anjuran", "Anjuran", 500, false);
    const evaluasi = bacaTeks(body, "evaluasi", "Evaluasi", 500, false);
    const suspek = bacaEnum(body, "suspek_penyakit_kerja", "Suspek Penyakit Kerja", YA_TIDAK, "Tidak");
    const ketSuspek = bacaTeks(body, "keterangan_suspek_penyakit_kerja", "Keterangan Suspek", 70, false);
    const statusProgram = bacaEnum(body, "status_program", "Status Program", STATUS_KFR, "Belum Selesai");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE layanan_kedokteran_fisik_rehabilitasi
         SET kd_dokter=?, pendamping=?, keterangan_pendamping=?, anamnesa=?, pemeriksaan_fisik=?,
             diagnosa_medis=?, diagnosa_fungsi=?, tatalaksana=?, anjuran=?, evaluasi=?,
             suspek_penyakit_kerja=?, keterangan_suspek_penyakit_kerja=?, status_program=?
         WHERE no_rawat=?`,
        [
          kdDokter, pendamping, ketPendamping, anamnesa, pemeriksaanFisik,
          diagnosaMedis, diagnosaFungsi, tatalaksana, anjuran, evaluasi,
          suspek, ketSuspek, statusProgram, noRawat,
        ],
      );
      if (!res.affectedRows) throw new PelayananError("Permintaan layanan KFR tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Permintaan layanan KFR ${noRawat} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui permintaan layanan KFR.");
  }
}

export async function deletePermintaanKfr(req: NextRequest) {
  const { denied } = await cekAksesModul("layanan_kedokteran_fisik_rehabilitasi", "Permintaan Layanan Program KFR");
  if (denied) return denied;
  try {
    const noRawat = (new URL(req.url).searchParams.get("no_rawat") || "").trim();
    if (!noRawat) throw new PelayananError("No. Rawat wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM layanan_kedokteran_fisik_rehabilitasi WHERE no_rawat = ?",
        [noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Permintaan layanan KFR tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Permintaan layanan KFR ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus permintaan layanan KFR.");
  }
}

/* -------------------------------------------------------------------------- */
/* 16. SKRINING RAWAT JALAN (rekammedis/RMSKriningRawatJalan.java)            */
/* -------------------------------------------------------------------------- */
const KESADARAN_SKRINING = [
  "Sadar penuh",
  "Tampak mengantuk/gelisah bicara tidak jelas",
  "Tidak sadar",
  "Batuk > 2 minggu",
] as const;
const PERNAPASAN_SKRINING = ["Nafas normal", "Tampak sesak", "Tidak bernafas"] as const;
const NYERI_DADA_SKRINING = ["Tidak ada", "Ada (Tingkat sedang)", "Nyeri dada kiri tembus punggung"] as const;
const SKALA_NYERI_SKRINING = [
  "Tidak sakit",
  "Sedikit sakit",
  "Agak mengganggu",
  "Mengganggu aktivitas",
  "Sangat mengganggu",
  "Tak tertahankan",
] as const;
const KEPUTUSAN_SKRINING = ["Sesuai antrian", "IGD"] as const;

export async function getSkriningRalan(req: NextRequest) {
  const { denied } = await cekAksesModul("sekrining_rawat_jalan", "Skrining Rawat Jalan");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const keputusan = (searchParams.get("keputusan") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("s.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("s.tanggal <= ?"); params.push(tglSelesai); }
    if (KEPUTUSAN_SKRINING.some((k) => k === keputusan)) { where.push("s.keputusan = ?"); params.push(keputusan); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(s.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR s.nip LIKE ? OR COALESCE(pt.nama,'') LIKE ?)");
      params.push(like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, petugasRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM skrining_rawat_jalan s
         INNER JOIN pasien ps ON s.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN petugas pt ON s.nip = pt.nip
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT DATE_FORMAT(s.tanggal, '%Y-%m-%d') AS tanggal,
                TIME_FORMAT(s.jam, '%H:%i:%s') AS jam,
                s.no_rkm_medis, ps.nm_pasien, ps.jk,
                s.geriatri, s.kesadaran, s.pernapasan, s.nyeri_dada, s.skala_nyeri,
                s.keputusan, s.nip, COALESCE(pt.nama, '') AS nama_petugas
         FROM skrining_rawat_jalan s
         INNER JOIN pasien ps ON s.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN petugas pt ON s.nip = pt.nip
         WHERE ${whereSql}
         ORDER BY s.tanggal DESC, s.jam DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { nip: string; nama: string }>("SELECT nip, nama FROM petugas WHERE status = '1' ORDER BY nama ASC"),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        petugas: petugasRows.map((p) => ({ value: p.nip, label: `${p.nip} - ${p.nama}` })),
        yaTidak: YA_TIDAK.map((y) => ({ value: y, label: y })),
        kesadaran: KESADARAN_SKRINING.map((v) => ({ value: v, label: v })),
        pernapasan: PERNAPASAN_SKRINING.map((v) => ({ value: v, label: v })),
        nyeriDada: NYERI_DADA_SKRINING.map((v) => ({ value: v, label: v })),
        skalaNyeri: SKALA_NYERI_SKRINING.map((v) => ({ value: v, label: v })),
        keputusan: KEPUTUSAN_SKRINING.map((v) => ({ value: v, label: v })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data skrining rawat jalan.");
  }
}

export async function postSkriningRalan(req: NextRequest) {
  const { session, denied } = await cekAksesModul("sekrining_rawat_jalan", "Skrining Rawat Jalan");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Skrining");
    const jam = bacaJam(body, "jam", "Jam Skrining");
    const noRm = bacaTeks(body, "no_rkm_medis", "No. RM", 15);
    const geriatri = bacaEnum(body, "geriatri", "Geriatri", YA_TIDAK, "Tidak");
    const kesadaran = bacaEnum(body, "kesadaran", "Kesadaran", KESADARAN_SKRINING, "Sadar penuh");
    const pernapasan = bacaEnum(body, "pernapasan", "Pernapasan", PERNAPASAN_SKRINING, "Nafas normal");
    const nyeriDada = bacaEnum(body, "nyeri_dada", "Nyeri Dada", NYERI_DADA_SKRINING, "Tidak ada");
    const skalaNyeri = bacaEnum(body, "skala_nyeri", "Skala Nyeri", SKALA_NYERI_SKRINING, "Tidak sakit");
    const keputusan = bacaEnum(body, "keputusan", "Keputusan", KEPUTUSAN_SKRINING, "Sesuai antrian");
    const nip = bacaTeks(body, "nip", "NIP Petugas", 20, false) || session.username;

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO skrining_rawat_jalan
         (tanggal, jam, no_rkm_medis, geriatri, kesadaran, pernapasan, nyeri_dada, skala_nyeri, keputusan, nip)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tanggal, jam, noRm, geriatri, kesadaran, pernapasan, nyeriDada, skalaNyeri, keputusan, nip],
      );
    });
    return NextResponse.json({ success: true, message: `Skrining rawat jalan pasien ${noRm} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan skrining rawat jalan.");
  }
}

export async function putSkriningRalan(req: NextRequest) {
  const { denied } = await cekAksesModul("sekrining_rawat_jalan", "Skrining Rawat Jalan");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Skrining");
    const jam = bacaJam(body, "jam", "Jam Skrining");
    const noRm = bacaTeks(body, "no_rkm_medis", "No. RM", 15);
    const geriatri = bacaEnum(body, "geriatri", "Geriatri", YA_TIDAK, "Tidak");
    const kesadaran = bacaEnum(body, "kesadaran", "Kesadaran", KESADARAN_SKRINING, "Sadar penuh");
    const pernapasan = bacaEnum(body, "pernapasan", "Pernapasan", PERNAPASAN_SKRINING, "Nafas normal");
    const nyeriDada = bacaEnum(body, "nyeri_dada", "Nyeri Dada", NYERI_DADA_SKRINING, "Tidak ada");
    const skalaNyeri = bacaEnum(body, "skala_nyeri", "Skala Nyeri", SKALA_NYERI_SKRINING, "Tidak sakit");
    const keputusan = bacaEnum(body, "keputusan", "Keputusan", KEPUTUSAN_SKRINING, "Sesuai antrian");
    const nip = bacaTeks(body, "nip", "NIP Petugas", 20);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE skrining_rawat_jalan
         SET geriatri=?, kesadaran=?, pernapasan=?, nyeri_dada=?, skala_nyeri=?, keputusan=?, nip=?
         WHERE tanggal=? AND jam=? AND no_rkm_medis=?`,
        [geriatri, kesadaran, pernapasan, nyeriDada, skalaNyeri, keputusan, nip, tanggal, jam, noRm],
      );
      if (!res.affectedRows) throw new PelayananError("Data skrining rawat jalan tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Skrining rawat jalan pasien ${noRm} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui skrining rawat jalan.");
  }
}

export async function deleteSkriningRalan(req: NextRequest) {
  const { denied } = await cekAksesModul("sekrining_rawat_jalan", "Skrining Rawat Jalan");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const tanggal = bacaTanggalQuery(sp.get("tanggal"), "Tanggal");
    const jam = (sp.get("jam") || "").trim();
    const noRm = (sp.get("no_rkm_medis") || "").trim();
    if (!tanggal || !jam || !noRm) throw new PelayananError("Kunci skrining rawat jalan tidak lengkap.");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM skrining_rawat_jalan WHERE tanggal = ? AND jam = ? AND no_rkm_medis = ?",
        [tanggal, jam, noRm],
      );
      if (!res.affectedRows) throw new PelayananError("Data skrining rawat jalan tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Skrining rawat jalan pasien ${noRm} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus skrining rawat jalan.");
  }
}

/* -------------------------------------------------------------------------- */
/* 17. DETEKSI DINI CORONA (rekammedis/RMDeteksiDiniCorona.java)              */
/* -------------------------------------------------------------------------- */
const KESIMPULAN_CORONA = ["ODP", "PDP", "OTG", "Bukan ketiganya"] as const;
const TINDAK_LANJUT_CORONA = ["Rujuk", "Rawat Inap", "Rawat Jalan"] as const;

export async function getDeteksiCorona(req: NextRequest) {
  const { denied } = await cekAksesModul("deteksi_corona", "Deteksi Dini Corona");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const kesimpulan = (searchParams.get("kesimpulan") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("dc.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("dc.tanggal <= ?"); params.push(tglSelesai); }
    if (KESIMPULAN_CORONA.some((k) => k === kesimpulan)) { where.push("dc.kesimpulan = ?"); params.push(kesimpulan); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(dc.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR dc.nip LIKE ? OR COALESCE(pt.nama,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, petugasRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM deteksi_dini_corona dc
         INNER JOIN reg_periksa rp ON dc.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN petugas pt ON dc.nip = pt.nip
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT dc.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                DATE_FORMAT(dc.tanggal, '%Y-%m-%d') AS tanggal,
                dc.nip, COALESCE(pt.nama, '') AS nama_petugas,
                dc.gejala_demam, dc.gejala_batuk, dc.gejala_sesak,
                CAST(dc.gejala_tanggal_pertama AS CHAR) AS gejala_tanggal_pertama,
                dc.gejala_riwayat_sakit, dc.gejala_riwayat_periksa,
                dc.faktor_riwayat_perjalanan, dc.faktor_asal_daerah,
                CAST(dc.faktor_tanggal_kedatangan AS CHAR) AS faktor_tanggal_kedatangan,
                dc.faktor_paparan_kontakpositif, dc.faktor_paparan_kontakpdp,
                dc.faktor_paparan_faskespositif, dc.faktor_paparan_perjalananln,
                dc.faktor_paparan_pasarhewan, dc.kesimpulan, dc.tindak_lanjut
         FROM deteksi_dini_corona dc
         INNER JOIN reg_periksa rp ON dc.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN petugas pt ON dc.nip = pt.nip
         WHERE ${whereSql}
         ORDER BY dc.tanggal DESC, dc.no_rawat DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { nip: string; nama: string }>("SELECT nip, nama FROM petugas WHERE status = '1' ORDER BY nama ASC"),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        petugas: petugasRows.map((p) => ({ value: p.nip, label: `${p.nip} - ${p.nama}` })),
        yaTidak: YA_TIDAK.map((y) => ({ value: y, label: y })),
        kesimpulan: KESIMPULAN_CORONA.map((k) => ({ value: k, label: k })),
        tindakLanjut: TINDAK_LANJUT_CORONA.map((t) => ({ value: t, label: t })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data deteksi dini corona.");
  }
}

export async function postDeteksiCorona(req: NextRequest) {
  const { session, denied } = await cekAksesModul("deteksi_corona", "Deteksi Dini Corona");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Skrining");
    const nip = bacaTeks(body, "nip", "NIP Petugas", 20, false) || session.username;
    const demam = bacaEnum(body, "gejala_demam", "Demam", YA_TIDAK, "Tidak");
    const batuk = bacaEnum(body, "gejala_batuk", "Batuk", YA_TIDAK, "Tidak");
    const sesak = bacaEnum(body, "gejala_sesak", "Sesak Napas", YA_TIDAK, "Tidak");
    const tglGejala = bacaTanggal(body, "gejala_tanggal_pertama", "Tanggal Pertama Gejala", false) || null;
    const riwayatSakit = bacaTeks(body, "gejala_riwayat_sakit", "Riwayat Sakit", 50, false);
    const riwayatPeriksa = bacaTeks(body, "gejala_riwayat_periksa", "Riwayat Periksa", 50, false);
    const perjalanan = bacaEnum(body, "faktor_riwayat_perjalanan", "Riwayat Perjalanan", YA_TIDAK, "Tidak");
    const asalDaerah = bacaTeks(body, "faktor_asal_daerah", "Asal Daerah", 50, false);
    const tglDatang = bacaTanggal(body, "faktor_tanggal_kedatangan", "Tanggal Kedatangan", false) || null;
    const kontakPos = bacaEnum(body, "faktor_paparan_kontakpositif", "Kontak Positif", YA_TIDAK, "Tidak");
    const kontakPdp = bacaEnum(body, "faktor_paparan_kontakpdp", "Kontak PDP", YA_TIDAK, "Tidak");
    const faskesPos = bacaEnum(body, "faktor_paparan_faskespositif", "Faskes Positif", YA_TIDAK, "Tidak");
    const perjalananLn = bacaEnum(body, "faktor_paparan_perjalananln", "Perjalanan LN", YA_TIDAK, "Tidak");
    const pasarHewan = bacaEnum(body, "faktor_paparan_pasarhewan", "Pasar Hewan", YA_TIDAK, "Tidak");
    const kesimpulan = bacaEnum(body, "kesimpulan", "Kesimpulan", KESIMPULAN_CORONA, "Bukan ketiganya");
    const tindakLanjut = bacaEnum(body, "tindak_lanjut", "Tindak Lanjut", TINDAK_LANJUT_CORONA, "Rawat Jalan");

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO deteksi_dini_corona
         (no_rawat, tanggal, nip, gejala_demam, gejala_batuk, gejala_sesak, gejala_tanggal_pertama,
          gejala_riwayat_sakit, gejala_riwayat_periksa, faktor_riwayat_perjalanan, faktor_asal_daerah,
          faktor_tanggal_kedatangan, faktor_paparan_kontakpositif, faktor_paparan_kontakpdp,
          faktor_paparan_faskespositif, faktor_paparan_perjalananln, faktor_paparan_pasarhewan,
          kesimpulan, tindak_lanjut)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          noRawat, tanggal, nip, demam, batuk, sesak, tglGejala,
          riwayatSakit, riwayatPeriksa, perjalanan, asalDaerah,
          tglDatang, kontakPos, kontakPdp, faskesPos, perjalananLn, pasarHewan,
          kesimpulan, tindakLanjut,
        ],
      );
    });
    return NextResponse.json({ success: true, message: `Deteksi dini corona ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan deteksi dini corona.");
  }
}

export async function putDeteksiCorona(req: NextRequest) {
  const { denied } = await cekAksesModul("deteksi_corona", "Deteksi Dini Corona");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Skrining");
    const nip = bacaTeks(body, "nip", "NIP Petugas", 20);
    const demam = bacaEnum(body, "gejala_demam", "Demam", YA_TIDAK, "Tidak");
    const batuk = bacaEnum(body, "gejala_batuk", "Batuk", YA_TIDAK, "Tidak");
    const sesak = bacaEnum(body, "gejala_sesak", "Sesak Napas", YA_TIDAK, "Tidak");
    const tglGejala = bacaTanggal(body, "gejala_tanggal_pertama", "Tanggal Pertama Gejala", false) || null;
    const riwayatSakit = bacaTeks(body, "gejala_riwayat_sakit", "Riwayat Sakit", 50, false);
    const riwayatPeriksa = bacaTeks(body, "gejala_riwayat_periksa", "Riwayat Periksa", 50, false);
    const perjalanan = bacaEnum(body, "faktor_riwayat_perjalanan", "Riwayat Perjalanan", YA_TIDAK, "Tidak");
    const asalDaerah = bacaTeks(body, "faktor_asal_daerah", "Asal Daerah", 50, false);
    const tglDatang = bacaTanggal(body, "faktor_tanggal_kedatangan", "Tanggal Kedatangan", false) || null;
    const kontakPos = bacaEnum(body, "faktor_paparan_kontakpositif", "Kontak Positif", YA_TIDAK, "Tidak");
    const kontakPdp = bacaEnum(body, "faktor_paparan_kontakpdp", "Kontak PDP", YA_TIDAK, "Tidak");
    const faskesPos = bacaEnum(body, "faktor_paparan_faskespositif", "Faskes Positif", YA_TIDAK, "Tidak");
    const perjalananLn = bacaEnum(body, "faktor_paparan_perjalananln", "Perjalanan LN", YA_TIDAK, "Tidak");
    const pasarHewan = bacaEnum(body, "faktor_paparan_pasarhewan", "Pasar Hewan", YA_TIDAK, "Tidak");
    const kesimpulan = bacaEnum(body, "kesimpulan", "Kesimpulan", KESIMPULAN_CORONA, "Bukan ketiganya");
    const tindakLanjut = bacaEnum(body, "tindak_lanjut", "Tindak Lanjut", TINDAK_LANJUT_CORONA, "Rawat Jalan");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE deteksi_dini_corona
         SET tanggal=?, nip=?, gejala_demam=?, gejala_batuk=?, gejala_sesak=?, gejala_tanggal_pertama=?,
             gejala_riwayat_sakit=?, gejala_riwayat_periksa=?, faktor_riwayat_perjalanan=?, faktor_asal_daerah=?,
             faktor_tanggal_kedatangan=?, faktor_paparan_kontakpositif=?, faktor_paparan_kontakpdp=?,
             faktor_paparan_faskespositif=?, faktor_paparan_perjalananln=?, faktor_paparan_pasarhewan=?,
             kesimpulan=?, tindak_lanjut=?
         WHERE no_rawat=?`,
        [
          tanggal, nip, demam, batuk, sesak, tglGejala,
          riwayatSakit, riwayatPeriksa, perjalanan, asalDaerah,
          tglDatang, kontakPos, kontakPdp, faskesPos, perjalananLn, pasarHewan,
          kesimpulan, tindakLanjut, noRawat,
        ],
      );
      if (!res.affectedRows) throw new PelayananError("Data deteksi dini corona tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Deteksi dini corona ${noRawat} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui deteksi dini corona.");
  }
}

export async function deleteDeteksiCorona(req: NextRequest) {
  const { denied } = await cekAksesModul("deteksi_corona", "Deteksi Dini Corona");
  if (denied) return denied;
  try {
    const noRawat = (new URL(req.url).searchParams.get("no_rawat") || "").trim();
    if (!noRawat) throw new PelayananError("No. Rawat wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM deteksi_dini_corona WHERE no_rawat = ?",
        [noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Data deteksi dini corona tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Deteksi dini corona ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus deteksi dini corona.");
  }
}

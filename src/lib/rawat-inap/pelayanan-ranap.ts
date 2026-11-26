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
/* 1. INFORMASI KAMAR / KETERSEDIAAN BED (InformasiAnalisaKamin.java)         */
/* -------------------------------------------------------------------------- */
const STATUS_KAMAR = ["ISI", "KOSONG", "DIBERSIHKAN", "DIBOOKING"] as const;
const KELAS_KAMAR = ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas Utama", "Kelas VIP", "Kelas VVIP"] as const;

export async function getInformasiKamar(req: NextRequest) {
  const { denied } = await cekAksesModul("informasi_kamar", "Informasi Kamar");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams, 100, 200);
    const status = (searchParams.get("status") || "").trim();
    const kelas = (searchParams.get("kelas") || "").trim();
    const bangsal = (searchParams.get("bangsal") || "").trim();

    const where = ["k.statusdata = '1'", "b.status = '1'"];
    const params: (string | number)[] = [];
    if (STATUS_KAMAR.some((s) => s === status)) {
      where.push("k.status = ?");
      params.push(status);
    }
    if (KELAS_KAMAR.some((k) => k === kelas)) {
      where.push("k.kelas = ?");
      params.push(kelas);
    }
    if (bangsal) {
      where.push("k.kd_bangsal = ?");
      params.push(bangsal);
    }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(k.kd_kamar LIKE ? OR b.nm_bangsal LIKE ? OR k.kelas LIKE ? OR k.status LIKE ?)");
      params.push(like, like, like, like);
    }

    const whereSql = where.join(" AND ");
    const [countRows, data, ringkasanRows, bangsalRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total FROM kamar k INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT k.kd_kamar, k.kd_bangsal, b.nm_bangsal, k.kelas, k.trf_kamar, k.status
         FROM kamar k
         INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}
         ORDER BY b.nm_bangsal ASC, k.kd_kamar ASC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { status: string; jumlah: number }>(
        `SELECT k.status, COUNT(*) AS jumlah
         FROM kamar k INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE k.statusdata = '1' AND b.status = '1'
         GROUP BY k.status`,
      ),
      executeQuery<RowDataPacket & { kd_bangsal: string; nm_bangsal: string }>(
        `SELECT kd_bangsal, nm_bangsal FROM bangsal WHERE status = '1' ORDER BY nm_bangsal ASC`,
      ),
    ]);

    const ringkasan: Record<string, number> = { TOTAL: 0, ISI: 0, KOSONG: 0, DIBERSIHKAN: 0, DIBOOKING: 0 };
    for (const r of ringkasanRows) {
      ringkasan[r.status] = Number(r.jumlah || 0);
      ringkasan.TOTAL += Number(r.jumlah || 0);
    }

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      ringkasan,
      opsi: {
        bangsal: bangsalRows.map((b) => ({ value: b.kd_bangsal, label: `${b.kd_bangsal} - ${b.nm_bangsal}` })),
        kelas: KELAS_KAMAR.map((k) => ({ value: k, label: k })),
        status: STATUS_KAMAR.map((s) => ({ value: s, label: s })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat informasi ketersediaan kamar.");
  }
}

/* -------------------------------------------------------------------------- */
/* 5. PERMINTAAN RAWAT INAP (DlgPermintaanRanap.java)                         */
/* -------------------------------------------------------------------------- */
export async function getPermintaanRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("permintaan_ranap", "Permintaan Rawat Inap");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim(); // belum | sudah | ""

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("pr.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("pr.tanggal <= ?"); params.push(tglSelesai); }
    if (status === "belum") where.push("NOT EXISTS (SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = pr.no_rawat)");
    if (status === "sudah") where.push("EXISTS (SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = pr.no_rawat)");
    if (cari) {
      const like = `%${cari}%`;
      where.push("(pr.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR COALESCE(ps.nm_pasien,'') LIKE ? OR pr.kd_kamar LIKE ? OR pr.diagnosa LIKE ? OR COALESCE(b.nm_bangsal,'') LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, kamarRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM permintaan_ranap pr
         INNER JOIN reg_periksa rp ON pr.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN kamar k ON pr.kd_kamar = k.kd_kamar
         LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT pr.no_rawat, rp.no_rkm_medis, ps.nm_pasien, ps.jk,
                CONCAT(rp.umurdaftar, ' ', rp.sttsumur) AS umur,
                COALESCE(pj.png_jawab, '') AS png_jawab,
                COALESCE(p.nm_poli, '') AS nm_poli,
                COALESCE(d.nm_dokter, '') AS nm_dokter,
                DATE_FORMAT(pr.tanggal, '%Y-%m-%d') AS tanggal,
                pr.kd_kamar, COALESCE(b.nm_bangsal, '') AS nm_bangsal,
                COALESCE(k.trf_kamar, 0) AS trf_kamar,
                pr.diagnosa, pr.catatan,
                CASE WHEN EXISTS (SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = pr.no_rawat) THEN 'Sudah Masuk Kamar' ELSE 'Menunggu Kamar' END AS status_masuk
         FROM permintaan_ranap pr
         INNER JOIN reg_periksa rp ON pr.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
         LEFT JOIN poliklinik p ON rp.kd_poli = p.kd_poli
         LEFT JOIN dokter d ON rp.kd_dokter = d.kd_dokter
         LEFT JOIN kamar k ON pr.kd_kamar = k.kd_kamar
         LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}
         ORDER BY pr.tanggal DESC, pr.no_rawat DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_kamar: string; nm_bangsal: string; kelas: string; status: string }>(
        `SELECT k.kd_kamar, b.nm_bangsal, k.kelas, k.status
         FROM kamar k INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE k.statusdata = '1' AND b.status = '1'
         ORDER BY b.nm_bangsal ASC, k.kd_kamar ASC`,
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        kamar: kamarRows.map((k) => ({ value: k.kd_kamar, label: `${k.kd_kamar} - ${k.nm_bangsal} (${k.kelas} / ${k.status})` })),
        status: [
          { value: "belum", label: "Menunggu Kamar" },
          { value: "sudah", label: "Sudah Masuk Kamar" },
        ],
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat permintaan rawat inap.");
  }
}

export async function postPermintaanRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("permintaan_ranap", "Permintaan Rawat Inap");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal permintaan");
    const kdKamar = bacaTeks(body, "kd_kamar", "Kode Kamar", 15);
    const diagnosa = bacaTeks(body, "diagnosa", "Diagnosa awal", 50);
    const catatan = bacaTeks(body, "catatan", "Catatan", 50, false);

    await denganTransaksi(async (conn) => {
      const [reg] = await conn.execute<(RowDataPacket & { stts: string })[]>(
        "SELECT stts FROM reg_periksa WHERE no_rawat = ? FOR UPDATE",
        [noRawat],
      );
      if (!reg.length) throw new PelayananError("No. Rawat tidak ditemukan.", 404);
      if (reg[0].stts === "Batal") throw new PelayananError("Kunjungan berstatus Batal tidak dapat diajukan rawat inap.", 400);

      await conn.execute(
        `INSERT INTO permintaan_ranap (no_rawat, tanggal, kd_kamar, diagnosa, catatan) VALUES (?, ?, ?, ?, ?)`,
        [noRawat, tanggal, kdKamar, diagnosa, catatan],
      );
    });

    return NextResponse.json({ success: true, data: { no_rawat: noRawat }, message: `Permintaan rawat inap ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan permintaan rawat inap.");
  }
}

export async function putPermintaanRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("permintaan_ranap", "Permintaan Rawat Inap");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal permintaan");
    const kdKamar = bacaTeks(body, "kd_kamar", "Kode Kamar", 15);
    const diagnosa = bacaTeks(body, "diagnosa", "Diagnosa awal", 50);
    const catatan = bacaTeks(body, "catatan", "Catatan", 50, false);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE permintaan_ranap SET tanggal = ?, kd_kamar = ?, diagnosa = ?, catatan = ? WHERE no_rawat = ?`,
        [tanggal, kdKamar, diagnosa, catatan, noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Permintaan rawat inap tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Permintaan rawat inap ${noRawat} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui permintaan rawat inap.");
  }
}

export async function deletePermintaanRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("permintaan_ranap", "Permintaan Rawat Inap");
  if (denied) return denied;
  try {
    const noRawat = (new URL(req.url).searchParams.get("no_rawat") || "").trim();
    if (!noRawat) throw new PelayananError("No. Rawat wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM permintaan_ranap WHERE no_rawat = ?", [noRawat]);
      if (!res.affectedRows) throw new PelayananError("Permintaan rawat inap tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Permintaan rawat inap ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus permintaan rawat inap.");
  }
}

/* -------------------------------------------------------------------------- */
/* 6. JADWAL OPERASI (DlgBookingOperasi.java)                                 */
/* -------------------------------------------------------------------------- */
const STATUS_BOOKING_OP = ["Menunggu", "Proses Operasi", "Selesai"] as const;

export async function getJadwalOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_operasi", "Jadwal Operasi");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("bo.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("bo.tanggal <= ?"); params.push(tglSelesai); }
    if (STATUS_BOOKING_OP.some((s) => s === status)) { where.push("bo.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(bo.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR COALESCE(po.nm_perawatan,'') LIKE ? OR COALESCE(d.nm_dokter,'') LIKE ? OR COALESCE(ro.nm_ruang_ok,'') LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, paketRows, dokterRows, ruangOkRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM booking_operasi bo
         INNER JOIN reg_periksa rp ON bo.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN paket_operasi po ON bo.kode_paket = po.kode_paket
         LEFT JOIN dokter d ON bo.kd_dokter = d.kd_dokter
         LEFT JOIN ruang_ok ro ON bo.kd_ruang_ok = ro.kd_ruang_ok
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT bo.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                CONCAT(rp.umurdaftar, ' ', rp.sttsumur) AS umur, ps.jk,
                DATE_FORMAT(bo.tanggal, '%Y-%m-%d') AS tanggal,
                TIME_FORMAT(bo.jam_mulai, '%H:%i:%s') AS jam_mulai,
                TIME_FORMAT(bo.jam_selesai, '%H:%i:%s') AS jam_selesai,
                bo.status, bo.kode_paket, COALESCE(po.nm_perawatan, '') AS nm_perawatan,
                bo.kd_dokter, COALESCE(d.nm_dokter, '') AS nm_dokter,
                bo.kd_ruang_ok, COALESCE(ro.nm_ruang_ok, '') AS nm_ruang_ok
         FROM booking_operasi bo
         INNER JOIN reg_periksa rp ON bo.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN paket_operasi po ON bo.kode_paket = po.kode_paket
         LEFT JOIN dokter d ON bo.kd_dokter = d.kd_dokter
         LEFT JOIN ruang_ok ro ON bo.kd_ruang_ok = ro.kd_ruang_ok
         WHERE ${whereSql}
         ORDER BY bo.tanggal DESC, bo.jam_mulai ASC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kode_paket: string; nm_perawatan: string }>(
        "SELECT kode_paket, nm_perawatan FROM paket_operasi WHERE status = '1' ORDER BY nm_perawatan ASC LIMIT 500",
      ),
      executeQuery<RowDataPacket & { kd_dokter: string; nm_dokter: string }>(
        "SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC",
      ),
      executeQuery<RowDataPacket & { kd_ruang_ok: string; nm_ruang_ok: string }>(
        "SELECT kd_ruang_ok, nm_ruang_ok FROM ruang_ok ORDER BY nm_ruang_ok ASC",
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        paket: paketRows.map((p) => ({ value: p.kode_paket, label: `${p.kode_paket} - ${p.nm_perawatan}` })),
        dokter: dokterRows.map((d) => ({ value: d.kd_dokter, label: `${d.kd_dokter} - ${d.nm_dokter}` })),
        ruangOk: ruangOkRows.map((r) => ({ value: r.kd_ruang_ok, label: `${r.kd_ruang_ok} - ${r.nm_ruang_ok}` })),
        status: STATUS_BOOKING_OP.map((s) => ({ value: s, label: s })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat jadwal operasi.");
  }
}

export async function postJadwalOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_operasi", "Jadwal Operasi");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kodePaket = bacaTeks(body, "kode_paket", "Paket Operasi", 15);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Operasi");
    const jamMulai = bacaJam(body, "jam_mulai", "Jam Mulai");
    const jamSelesai = bacaJam(body, "jam_selesai", "Jam Selesai");
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_OP, "Menunggu");
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter Operator", 20);
    const kdRuangOk = bacaTeks(body, "kd_ruang_ok", "Ruang OK", 3);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO booking_operasi (no_rawat, kode_paket, tanggal, jam_mulai, jam_selesai, status, kd_dokter, kd_ruang_ok)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [noRawat, kodePaket, tanggal, jamMulai, jamSelesai, status, kdDokter, kdRuangOk],
      );
    });

    return NextResponse.json({ success: true, message: `Jadwal operasi ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan jadwal operasi.");
  }
}

export async function putJadwalOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_operasi", "Jadwal Operasi");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kodePaket = bacaTeks(body, "kode_paket", "Paket Operasi", 15);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Operasi");
    const jamMulai = bacaJam(body, "jam_mulai", "Jam Mulai");
    const jamSelesai = bacaJam(body, "jam_selesai", "Jam Selesai");
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_OP, "Menunggu");
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter Operator", 20);
    const kdRuangOk = bacaTeks(body, "kd_ruang_ok", "Ruang OK", 3);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE booking_operasi
         SET jam_selesai = ?, status = ?, kd_dokter = ?, kd_ruang_ok = ?
         WHERE no_rawat = ? AND kode_paket = ? AND tanggal = ? AND jam_mulai = ?`,
        [jamSelesai, status, kdDokter, kdRuangOk, noRawat, kodePaket, tanggal, jamMulai],
      );
      if (!res.affectedRows) throw new PelayananError("Jadwal operasi tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Jadwal operasi ${noRawat} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui jadwal operasi.");
  }
}

export async function deleteJadwalOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_operasi", "Jadwal Operasi");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRawat = (sp.get("no_rawat") || "").trim();
    const kodePaket = (sp.get("kode_paket") || "").trim();
    const tanggal = bacaTanggalQuery(sp.get("tanggal"), "Tanggal");
    const jamMulai = (sp.get("jam_mulai") || "").trim();
    if (!noRawat || !kodePaket || !tanggal || !jamMulai) {
      throw new PelayananError("Kunci jadwal operasi tidak lengkap.");
    }
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `DELETE FROM booking_operasi WHERE no_rawat = ? AND kode_paket = ? AND tanggal = ? AND jam_mulai = ?`,
        [noRawat, kodePaket, tanggal, jamMulai],
      );
      if (!res.affectedRows) throw new PelayananError("Jadwal operasi tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Jadwal operasi ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus jadwal operasi.");
  }
}

/* -------------------------------------------------------------------------- */
/* 7. DPJP RANAP (DlgDpjp.java)                                               */
/* -------------------------------------------------------------------------- */
export async function getDpjpRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("dpjp_ranap", "DPJP Ranap");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("rp.tgl_registrasi >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("rp.tgl_registrasi <= ?"); params.push(tglSelesai); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(dp.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR dp.kd_dokter LIKE ? OR d.nm_dokter LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, dokterRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM dpjp_ranap dp
         INNER JOIN reg_periksa rp ON dp.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         INNER JOIN dokter d ON dp.kd_dokter = d.kd_dokter
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT DATE_FORMAT(rp.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
                dp.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                dp.kd_dokter, d.nm_dokter
         FROM dpjp_ranap dp
         INNER JOIN reg_periksa rp ON dp.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         INNER JOIN dokter d ON dp.kd_dokter = d.kd_dokter
         WHERE ${whereSql}
         ORDER BY rp.tgl_registrasi DESC, dp.no_rawat DESC
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
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data DPJP Rawat Inap.");
  }
}

export async function postDpjpRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("dpjp_ranap", "DPJP Ranap");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter DPJP", 20);

    await denganTransaksi(async (conn) => {
      await conn.execute("INSERT INTO dpjp_ranap (no_rawat, kd_dokter) VALUES (?, ?)", [noRawat, kdDokter]);
    });

    return NextResponse.json({ success: true, message: `DPJP ${kdDokter} untuk ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan DPJP Rawat Inap.");
  }
}

export async function deleteDpjpRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("dpjp_ranap", "DPJP Ranap");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRawat = (sp.get("no_rawat") || "").trim();
    const kdDokter = (sp.get("kd_dokter") || "").trim();
    if (!noRawat || !kdDokter) throw new PelayananError("No. Rawat dan Kode Dokter wajib disertakan.");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM dpjp_ranap WHERE no_rawat = ? AND kd_dokter = ?",
        [noRawat, kdDokter],
      );
      if (!res.affectedRows) throw new PelayananError("Data DPJP tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `DPJP ${kdDokter} pada ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus DPJP Rawat Inap.");
  }
}

/* -------------------------------------------------------------------------- */
/* 8. OPERASI / VK (DlgCariTagihanOperasi.java)                               */
/* -------------------------------------------------------------------------- */
const STATUS_OPERASI = ["Ranap", "Ralan"] as const;

export async function getOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("operasi", "Operasi / VK");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("DATE(o.tgl_operasi) >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("DATE(o.tgl_operasi) <= ?"); params.push(tglSelesai); }
    if (STATUS_OPERASI.some((s) => s === status)) { where.push("o.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(o.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR COALESCE(po.nm_perawatan,'') LIKE ? OR COALESCE(d.nm_dokter,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const totalExpr = `(o.biayaoperator1+o.biayaoperator2+o.biayaoperator3+o.biayaasisten_operator1+o.biayaasisten_operator2+o.biayaasisten_operator3+o.biayainstrumen+o.biayadokter_anak+o.biayaperawaat_resusitas+o.biayadokter_anestesi+o.biayaasisten_anestesi+o.biayaasisten_anestesi2+o.biayabidan+o.biayabidan2+o.biayabidan3+o.biayaperawat_luar+o.biayaalat+o.biayasewaok+o.akomodasi+o.bagian_rs+o.biaya_omloop+o.biaya_omloop2+o.biaya_omloop3+o.biaya_omloop4+o.biaya_omloop5+o.biayasarpras+o.biaya_dokter_pjanak+o.biaya_dokter_umum)`;

    const [countRows, data] = await Promise.all([
      executeQuery<RowDataPacket & { total: number; grand_total: number }>(
        `SELECT COUNT(*) AS total, COALESCE(SUM(${totalExpr}), 0) AS grand_total
         FROM operasi o
         INNER JOIN reg_periksa rp ON o.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN paket_operasi po ON o.kode_paket = po.kode_paket
         LEFT JOIN dokter d ON o.operator1 = d.kd_dokter
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT DATE_FORMAT(o.tgl_operasi, '%Y-%m-%d %H:%i:%s') AS tgl_operasi,
                o.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                o.kode_paket, COALESCE(po.nm_perawatan, '') AS nm_perawatan,
                o.kategori, o.jenis_anasthesi, o.status,
                o.operator1, COALESCE(d.nm_dokter, '') AS nm_operator,
                ${totalExpr} AS total_biaya,
                COALESCE(lo.diagnosa_preop, '') AS diagnosa_preop,
                COALESCE(lo.diagnosa_postop, '') AS diagnosa_postop,
                COALESCE(lo.jaringan_dieksekusi, '') AS jaringan_dieksekusi,
                COALESCE(lo.permintaan_pa, 'Tidak') AS permintaan_pa,
                COALESCE(lo.laporan_operasi, '') AS laporan_operasi
         FROM operasi o
         INNER JOIN reg_periksa rp ON o.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN paket_operasi po ON o.kode_paket = po.kode_paket
         LEFT JOIN dokter d ON o.operator1 = d.kd_dokter
         LEFT JOIN laporan_operasi lo ON o.no_rawat = lo.no_rawat AND o.tgl_operasi = lo.tanggal
         WHERE ${whereSql}
         ORDER BY o.tgl_operasi DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      ringkasan: { totalBiaya: Number(countRows[0]?.grand_total ?? 0) },
      opsi: { status: STATUS_OPERASI.map((s) => ({ value: s, label: s })) },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data tagihan operasi / VK.");
  }
}

export async function putLaporanOperasi(req: NextRequest) {
  const { denied } = await cekAksesModul("operasi", "Operasi / VK");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tglOperasi = bacaTeks(body, "tgl_operasi", "Tanggal Operasi", 19);
    const preOp = bacaTeks(body, "diagnosa_preop", "Diagnosa Pre-Op", 100);
    const postOp = bacaTeks(body, "diagnosa_postop", "Diagnosa Post-Op", 100);
    const jaringan = bacaTeks(body, "jaringan_dieksekusi", "Jaringan Dieksisi", 100, false);
    const permintaanPa = bacaEnum(body, "permintaan_pa", "Permintaan PA", ["Ya", "Tidak"] as const, "Tidak");
    const laporan = bacaTeks(body, "laporan_operasi", "Laporan Operasi", 10000);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO laporan_operasi (no_rawat, tanggal, diagnosa_preop, diagnosa_postop, jaringan_dieksekusi, selesaioperasi, permintaan_pa, laporan_operasi)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           diagnosa_preop = VALUES(diagnosa_preop),
           diagnosa_postop = VALUES(diagnosa_postop),
           jaringan_dieksekusi = VALUES(jaringan_dieksekusi),
           permintaan_pa = VALUES(permintaan_pa),
           laporan_operasi = VALUES(laporan_operasi)`,
        [noRawat, tglOperasi, preOp, postOp, jaringan, tglOperasi, permintaanPa, laporan],
      );
    });

    return NextResponse.json({ success: true, message: `Laporan operasi ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan laporan operasi.");
  }
}

/* -------------------------------------------------------------------------- */
/* 14. DIET PASIEN (simrskhanza/DlgPemberianDiet.java)                        */
/* -------------------------------------------------------------------------- */
const WAKTU_DIET = [
  "Pagi", "Pagi2", "Pagi3",
  "Siang", "Siang2", "Siang3",
  "Sore", "Sore2", "Sore3",
  "Malam", "Malam2", "Malam3",
] as const;

export async function getDietPasien(req: NextRequest) {
  const { denied } = await cekAksesModul("diet_pasien", "Diet Pasien");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const waktu = (searchParams.get("waktu") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("dbd.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("dbd.tanggal <= ?"); params.push(tglSelesai); }
    if (WAKTU_DIET.some((w) => w === waktu)) { where.push("dbd.waktu = ?"); params.push(waktu); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(dbd.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR dbd.kd_kamar LIKE ? OR COALESCE(b.nm_bangsal,'') LIKE ? OR COALESCE(dt.nama_diet,'') LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, dietRows, kamarRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM detail_beri_diet dbd
         INNER JOIN reg_periksa rp ON dbd.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN kamar k ON dbd.kd_kamar = k.kd_kamar
         LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         LEFT JOIN diet dt ON dbd.kd_diet = dt.kd_diet
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT dbd.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                dbd.kd_kamar, COALESCE(b.nm_bangsal, '') AS nm_bangsal,
                DATE_FORMAT(dbd.tanggal, '%Y-%m-%d') AS tanggal,
                dbd.waktu, COALESCE(jdp.jam, '') AS jam,
                dbd.kd_diet, COALESCE(dt.nama_diet, '') AS nama_diet
         FROM detail_beri_diet dbd
         INNER JOIN reg_periksa rp ON dbd.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN kamar k ON dbd.kd_kamar = k.kd_kamar
         LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         LEFT JOIN diet dt ON dbd.kd_diet = dt.kd_diet
         LEFT JOIN jam_diet_pasien jdp ON dbd.waktu = jdp.waktu
         WHERE ${whereSql}
         ORDER BY dbd.tanggal DESC, dbd.waktu ASC, dbd.no_rawat DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_diet: string; nama_diet: string }>("SELECT kd_diet, nama_diet FROM diet ORDER BY nama_diet ASC"),
      executeQuery<RowDataPacket & { kd_kamar: string; nm_bangsal: string }>(
        "SELECT k.kd_kamar, b.nm_bangsal FROM kamar k INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal WHERE k.statusdata = '1' ORDER BY b.nm_bangsal ASC, k.kd_kamar ASC",
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        diet: dietRows.map((d) => ({ value: d.kd_diet, label: `${d.kd_diet} - ${d.nama_diet}` })),
        kamar: kamarRows.map((k) => ({ value: k.kd_kamar, label: `${k.kd_kamar} - ${k.nm_bangsal}` })),
        waktu: WAKTU_DIET.map((w) => ({ value: w, label: w })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data pemberian diet pasien.");
  }
}

export async function postDietPasien(req: NextRequest) {
  const { denied } = await cekAksesModul("diet_pasien", "Diet Pasien");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kdKamar = bacaTeks(body, "kd_kamar", "Kamar", 15);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Diet");
    const waktu = bacaEnum(body, "waktu", "Waktu Diet", WAKTU_DIET);
    const kdDiet = bacaTeks(body, "kd_diet", "Diet", 3);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO detail_beri_diet (no_rawat, kd_kamar, tanggal, waktu, kd_diet) VALUES (?, ?, ?, ?, ?)`,
        [noRawat, kdKamar, tanggal, waktu, kdDiet],
      );
    });
    return NextResponse.json({ success: true, message: `Diet pasien ${noRawat} (${waktu}) berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan pemberian diet pasien.");
  }
}

export async function deleteDietPasien(req: NextRequest) {
  const { denied } = await cekAksesModul("diet_pasien", "Diet Pasien");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRawat = (sp.get("no_rawat") || "").trim();
    const kdKamar = (sp.get("kd_kamar") || "").trim();
    const tanggal = bacaTanggalQuery(sp.get("tanggal"), "Tanggal");
    const waktu = (sp.get("waktu") || "").trim();
    const kdDiet = (sp.get("kd_diet") || "").trim();
    if (!noRawat || !kdKamar || !tanggal || !waktu || !kdDiet) {
      throw new PelayananError("Kunci data diet pasien tidak lengkap.");
    }
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `DELETE FROM detail_beri_diet WHERE no_rawat = ? AND kd_kamar = ? AND tanggal = ? AND waktu = ? AND kd_diet = ?`,
        [noRawat, kdKamar, tanggal, waktu, kdDiet],
      );
      if (!res.affectedRows) throw new PelayananError("Data diet pasien tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Diet pasien ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus data diet pasien.");
  }
}


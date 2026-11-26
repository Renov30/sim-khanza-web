import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import {
  PelayananError,
  bacaAngka,
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
  waktuLokalJayapura,
} from "@/lib/modul/pelayanan";

/* -------------------------------------------------------------------------- */
/* 2. BOOKING PERIKSA (DlgBookingPeriksa.java)                                */
/* -------------------------------------------------------------------------- */
const STATUS_BOOKING_PERIKSA = ["Belum Dibalas", "Diterima", "Ditolak"] as const;

export async function getBookingPeriksa(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_periksa", "Booking Periksa");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("bp.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("bp.tanggal <= ?"); params.push(tglSelesai); }
    if (STATUS_BOOKING_PERIKSA.some((s) => s === status)) { where.push("bp.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(bp.no_booking LIKE ? OR bp.nama LIKE ? OR bp.alamat LIKE ? OR bp.no_telp LIKE ? OR COALESCE(p.nm_poli,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }

    const whereSql = where.join(" AND ");
    const [countRows, data, poliRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total FROM booking_periksa bp LEFT JOIN poliklinik p ON bp.kd_poli = p.kd_poli WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT bp.no_booking, DATE_FORMAT(bp.tanggal_booking, '%Y-%m-%d %H:%i:%s') AS tanggal_booking,
                DATE_FORMAT(bp.tanggal, '%Y-%m-%d') AS tanggal, bp.nama, bp.alamat, bp.no_telp, bp.email,
                bp.kd_poli, COALESCE(p.nm_poli, '') AS nm_poli, bp.tambahan_pesan, bp.status,
                COALESCE(bpb.balasan, '') AS balasan
         FROM booking_periksa bp
         LEFT JOIN poliklinik p ON bp.kd_poli = p.kd_poli
         LEFT JOIN booking_periksa_balasan bpb ON bp.no_booking = bpb.no_booking
         WHERE ${whereSql}
         ORDER BY bp.tanggal DESC, bp.no_booking DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_poli: string; nm_poli: string }>(
        `SELECT kd_poli, nm_poli FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC`,
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        poli: poliRows.map((p) => ({ value: p.kd_poli, label: `${p.kd_poli} - ${p.nm_poli}` })),
        status: STATUS_BOOKING_PERIKSA.map((s) => ({ value: s, label: s })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data booking periksa.");
  }
}

export async function postBookingPeriksa(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_periksa", "Booking Periksa");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal periksa");
    const nama = bacaTeks(body, "nama", "Nama pasien", 40);
    const alamat = bacaTeks(body, "alamat", "Alamat", 200, false);
    const noTelp = bacaTeks(body, "no_telp", "No. Telp", 40, false);
    const email = bacaTeks(body, "email", "Email", 50, false);
    const kdPoli = bacaTeks(body, "kd_poli", "Poliklinik", 5);
    const pesan = bacaTeks(body, "tambahan_pesan", "Tambahan pesan", 400, false);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_PERIKSA, "Belum Dibalas");
    const balasan = bacaTeks(body, "balasan", "Balasan", 200, false);
    const now = waktuLokalJayapura();
    const prefix = `BP${tanggal.replaceAll("-", "")}`;

    const noBooking = await denganTransaksi(async (conn) => {
      const [rows] = await conn.execute<(RowDataPacket & { terakhir: number })[]>(
        "SELECT IFNULL(MAX(CAST(RIGHT(no_booking, 4) AS UNSIGNED)), 0) AS terakhir FROM booking_periksa WHERE no_booking LIKE ?",
        [`${prefix}%`],
      );
      const urut = Number(rows[0]?.terakhir ?? 0) + 1;
      const nomor = `${prefix}${String(urut).padStart(4, "0")}`;
      await conn.execute(
        `INSERT INTO booking_periksa (no_booking, tanggal, nama, alamat, no_telp, email, kd_poli, tambahan_pesan, status, tanggal_booking)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nomor, tanggal, nama, alamat, noTelp, email, kdPoli, pesan, status, now.datetime],
      );
      if (balasan) {
        await conn.execute(
          `INSERT INTO booking_periksa_balasan (no_booking, balasan) VALUES (?, ?) ON DUPLICATE KEY UPDATE balasan = VALUES(balasan)`,
          [nomor, balasan],
        );
      }
      return nomor;
    }, `khanza-web:booking-periksa:${prefix}`);

    return NextResponse.json({ success: true, data: { no_booking: noBooking }, message: `Booking periksa ${noBooking} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan booking periksa.");
  }
}

export async function putBookingPeriksa(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_periksa", "Booking Periksa");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noBooking = bacaTeks(body, "no_booking", "No. Booking", 17);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal periksa");
    const nama = bacaTeks(body, "nama", "Nama pasien", 40);
    const alamat = bacaTeks(body, "alamat", "Alamat", 200, false);
    const noTelp = bacaTeks(body, "no_telp", "No. Telp", 40, false);
    const email = bacaTeks(body, "email", "Email", 50, false);
    const kdPoli = bacaTeks(body, "kd_poli", "Poliklinik", 5);
    const pesan = bacaTeks(body, "tambahan_pesan", "Tambahan pesan", 400, false);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_PERIKSA, "Belum Dibalas");
    const balasan = bacaTeks(body, "balasan", "Balasan", 200, false);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE booking_periksa
         SET tanggal = ?, nama = ?, alamat = ?, no_telp = ?, email = ?, kd_poli = ?, tambahan_pesan = ?, status = ?
         WHERE no_booking = ?`,
        [tanggal, nama, alamat, noTelp, email, kdPoli, pesan, status, noBooking],
      );
      if (!res.affectedRows) throw new PelayananError("Data booking periksa tidak ditemukan.", 404);
      if (balasan) {
        await conn.execute(
          `INSERT INTO booking_periksa_balasan (no_booking, balasan) VALUES (?, ?) ON DUPLICATE KEY UPDATE balasan = VALUES(balasan)`,
          [noBooking, balasan],
        );
      }
    });

    return NextResponse.json({ success: true, data: { no_booking: noBooking }, message: `Booking periksa ${noBooking} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui booking periksa.");
  }
}

export async function deleteBookingPeriksa(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_periksa", "Booking Periksa");
  if (denied) return denied;
  try {
    const noBooking = (new URL(req.url).searchParams.get("no_booking") || "").trim();
    if (!noBooking) throw new PelayananError("No. Booking wajib disertakan.");
    await denganTransaksi(async (conn) => {
      await conn.execute("DELETE FROM booking_periksa_balasan WHERE no_booking = ?", [noBooking]);
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM booking_periksa WHERE no_booking = ?", [noBooking]);
      if (!res.affectedRows) throw new PelayananError("Data booking periksa tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Booking periksa ${noBooking} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus booking periksa.");
  }
}

/* -------------------------------------------------------------------------- */
/* 3. BOOKING REGISTRASI (DlgBookingRegistrasi.java)                          */
/* -------------------------------------------------------------------------- */
const STATUS_BOOKING_REG = ["Belum", "Terdaftar", "Batal", "Dokter Berhalangan"] as const;

export async function getBookingRegistrasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_registrasi", "Booking Registrasi");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("br.tanggal_periksa >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("br.tanggal_periksa <= ?"); params.push(tglSelesai); }
    if (STATUS_BOOKING_REG.some((s) => s === status)) { where.push("br.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(br.no_rkm_medis LIKE ? OR COALESCE(ps.nm_pasien,'') LIKE ? OR COALESCE(d.nm_dokter,'') LIKE ? OR COALESCE(p.nm_poli,'') LIKE ? OR br.no_reg LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, poliRows, dokterRows, penjabRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM booking_registrasi br
         LEFT JOIN pasien ps ON br.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN dokter d ON br.kd_dokter = d.kd_dokter
         LEFT JOIN poliklinik p ON br.kd_poli = p.kd_poli
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT DATE_FORMAT(br.tanggal_booking, '%Y-%m-%d') AS tanggal_booking,
                TIME_FORMAT(br.jam_booking, '%H:%i:%s') AS jam_booking,
                br.no_rkm_medis, COALESCE(ps.nm_pasien, '') AS nm_pasien,
                DATE_FORMAT(br.tanggal_periksa, '%Y-%m-%d') AS tanggal_periksa,
                br.kd_dokter, COALESCE(d.nm_dokter, '') AS nm_dokter,
                br.kd_poli, COALESCE(p.nm_poli, '') AS nm_poli,
                br.no_reg, br.kd_pj, COALESCE(pj.png_jawab, '') AS png_jawab,
                br.status, DATE_FORMAT(br.waktu_kunjungan, '%Y-%m-%d %H:%i:%s') AS waktu_kunjungan
         FROM booking_registrasi br
         LEFT JOIN pasien ps ON br.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN dokter d ON br.kd_dokter = d.kd_dokter
         LEFT JOIN poliklinik p ON br.kd_poli = p.kd_poli
         LEFT JOIN penjab pj ON br.kd_pj = pj.kd_pj
         WHERE ${whereSql}
         ORDER BY br.tanggal_periksa DESC, br.no_reg ASC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_poli: string; nm_poli: string }>("SELECT kd_poli, nm_poli FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC"),
      executeQuery<RowDataPacket & { kd_dokter: string; nm_dokter: string }>("SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC"),
      executeQuery<RowDataPacket & { kd_pj: string; png_jawab: string }>("SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC"),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        poli: poliRows.map((p) => ({ value: p.kd_poli, label: `${p.kd_poli} - ${p.nm_poli}` })),
        dokter: dokterRows.map((d) => ({ value: d.kd_dokter, label: `${d.kd_dokter} - ${d.nm_dokter}` })),
        penjab: penjabRows.map((pj) => ({ value: pj.kd_pj, label: `${pj.kd_pj} - ${pj.png_jawab}` })),
        status: STATUS_BOOKING_REG.map((s) => ({ value: s, label: s })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data booking registrasi.");
  }
}

export async function postBookingRegistrasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_registrasi", "Booking Registrasi");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRm = bacaTeks(body, "no_rkm_medis", "No. RM", 15);
    const tglPeriksa = bacaTanggal(body, "tanggal_periksa", "Tanggal periksa");
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter", 20);
    const kdPoli = bacaTeks(body, "kd_poli", "Poliklinik", 5);
    const kdPj = bacaTeks(body, "kd_pj", "Cara Bayar", 3);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_REG, "Belum");
    const now = waktuLokalJayapura();

    const noReg = await denganTransaksi(async (conn) => {
      const [maxRows] = await conn.execute<(RowDataPacket & { terakhir: number })[]>(
        `SELECT IFNULL(MAX(CAST(no_reg AS UNSIGNED)), 0) AS terakhir
         FROM booking_registrasi WHERE tanggal_periksa = ? AND kd_poli = ? AND kd_dokter = ?`,
        [tglPeriksa, kdPoli, kdDokter],
      );
      const nomor = String(Number(maxRows[0]?.terakhir ?? 0) + 1).padStart(3, "0");
      await conn.execute(
        `INSERT INTO booking_registrasi
          (tanggal_booking, jam_booking, no_rkm_medis, tanggal_periksa, kd_dokter, kd_poli, no_reg, kd_pj, limit_reg, waktu_kunjungan, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
        [now.tanggal, now.jam, noRm, tglPeriksa, kdDokter, kdPoli, nomor, kdPj, `${tglPeriksa} 00:00:00`, status],
      );
      return nomor;
    }, `khanza-web:booking-reg:${tglPeriksa}:${kdPoli}:${kdDokter}`);

    return NextResponse.json({
      success: true,
      data: { no_rkm_medis: noRm, tanggal_periksa: tglPeriksa, no_reg: noReg },
      message: `Booking registrasi pasien ${noRm} (No. Reg ${noReg}) berhasil disimpan.`,
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan booking registrasi.");
  }
}

export async function putBookingRegistrasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_registrasi", "Booking Registrasi");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRm = bacaTeks(body, "no_rkm_medis", "No. RM", 15);
    const tglPeriksa = bacaTanggal(body, "tanggal_periksa", "Tanggal periksa");
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter", 20);
    const kdPoli = bacaTeks(body, "kd_poli", "Poliklinik", 5);
    const kdPj = bacaTeks(body, "kd_pj", "Cara Bayar", 3);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_REG, "Belum");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE booking_registrasi
         SET kd_dokter = ?, kd_poli = ?, kd_pj = ?, status = ?
         WHERE no_rkm_medis = ? AND tanggal_periksa = ?`,
        [kdDokter, kdPoli, kdPj, status, noRm, tglPeriksa],
      );
      if (!res.affectedRows) throw new PelayananError("Data booking registrasi tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Booking registrasi pasien ${noRm} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui booking registrasi.");
  }
}

export async function deleteBookingRegistrasi(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_registrasi", "Booking Registrasi");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRm = (sp.get("no_rkm_medis") || "").trim();
    const tglPeriksa = bacaTanggalQuery(sp.get("tanggal_periksa"), "Tanggal periksa");
    if (!noRm || !tglPeriksa) throw new PelayananError("No. RM dan Tanggal Periksa wajib disertakan.");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM booking_registrasi WHERE no_rkm_medis = ? AND tanggal_periksa = ?",
        [noRm, tglPeriksa],
      );
      if (!res.affectedRows) throw new PelayananError("Data booking registrasi tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Booking registrasi pasien ${noRm} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus booking registrasi.");
  }
}

/* -------------------------------------------------------------------------- */
/* 4. BOOKING MCU PERUSAHAAN (DlgBookingMCUPerusahaan.java)                   */
/* -------------------------------------------------------------------------- */
const STATUS_BOOKING_MCU = ["Terdaftar", "Menunggu Hasil", "Selesai"] as const;

export async function getBookingMcu(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_mcu_perusahaan", "Booking MCU Perusahaan");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("m.tanggal_mcu >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("m.tanggal_mcu <= ?"); params.push(tglSelesai); }
    if (STATUS_BOOKING_MCU.some((s) => s === status)) { where.push("m.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(m.no_mcu LIKE ? OR m.no_rkm_medis LIKE ? OR COALESCE(ps.nm_pasien,'') LIKE ? OR COALESCE(pr.nama_perusahaan,'') LIKE ?)");
      params.push(like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, perusahaanRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM booking_mcu_perusahaan m
         LEFT JOIN pasien ps ON m.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN perusahaan_pasien pr ON m.kode_perusahaan = pr.kode_perusahaan
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT m.no_mcu, DATE_FORMAT(m.tanggal_booking, '%Y-%m-%d') AS tanggal_booking,
                TIME_FORMAT(m.jam_booking, '%H:%i:%s') AS jam_booking,
                DATE_FORMAT(m.tanggal_mcu, '%Y-%m-%d') AS tanggal_mcu,
                m.no_rkm_medis, COALESCE(ps.nm_pasien, '') AS nm_pasien,
                COALESCE(ps.jk, '') AS jk, COALESCE(ps.nip, '') AS nip,
                m.kode_perusahaan, COALESCE(pr.nama_perusahaan, '') AS nama_perusahaan,
                m.status
         FROM booking_mcu_perusahaan m
         LEFT JOIN pasien ps ON m.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN perusahaan_pasien pr ON m.kode_perusahaan = pr.kode_perusahaan
         WHERE ${whereSql}
         ORDER BY m.tanggal_mcu DESC, m.no_mcu DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kode_perusahaan: string; nama_perusahaan: string }>(
        "SELECT kode_perusahaan, nama_perusahaan FROM perusahaan_pasien ORDER BY nama_perusahaan ASC",
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        perusahaan: perusahaanRows.map((p) => ({ value: p.kode_perusahaan, label: `${p.kode_perusahaan} - ${p.nama_perusahaan}` })),
        status: STATUS_BOOKING_MCU.map((s) => ({ value: s, label: s })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data booking MCU perusahaan.");
  }
}

export async function postBookingMcu(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_mcu_perusahaan", "Booking MCU Perusahaan");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRm = bacaTeks(body, "no_rkm_medis", "No. RM", 15);
    const tglMcu = bacaTanggal(body, "tanggal_mcu", "Tanggal MCU");
    const kodePerusahaan = bacaTeks(body, "kode_perusahaan", "Perusahaan", 8);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_MCU, "Terdaftar");
    const now = waktuLokalJayapura();
    const prefix = `MCU${tglMcu.replaceAll("-", "")}`;

    const noMcu = await denganTransaksi(async (conn) => {
      const [maxRows] = await conn.execute<(RowDataPacket & { terakhir: number })[]>(
        "SELECT IFNULL(MAX(CAST(RIGHT(no_mcu, 4) AS UNSIGNED)), 0) AS terakhir FROM booking_mcu_perusahaan WHERE no_mcu LIKE ?",
        [`${prefix}%`],
      );
      const nomor = `${prefix}${String(Number(maxRows[0]?.terakhir ?? 0) + 1).padStart(4, "0")}`;
      await conn.execute(
        `INSERT INTO booking_mcu_perusahaan
          (tanggal_booking, jam_booking, no_rkm_medis, tanggal_mcu, no_mcu, status, kode_perusahaan)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [now.tanggal, now.jam, noRm, tglMcu, nomor, status, kodePerusahaan],
      );
      return nomor;
    }, `khanza-web:booking-mcu:${prefix}`);

    return NextResponse.json({ success: true, data: { no_mcu: noMcu }, message: `Booking MCU ${noMcu} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan booking MCU perusahaan.");
  }
}

export async function putBookingMcu(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_mcu_perusahaan", "Booking MCU Perusahaan");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noMcu = bacaTeks(body, "no_mcu", "No. MCU", 15);
    const tglMcu = bacaTanggal(body, "tanggal_mcu", "Tanggal MCU");
    const kodePerusahaan = bacaTeks(body, "kode_perusahaan", "Perusahaan", 8);
    const status = bacaEnum(body, "status", "Status", STATUS_BOOKING_MCU, "Terdaftar");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE booking_mcu_perusahaan SET tanggal_mcu = ?, kode_perusahaan = ?, status = ? WHERE no_mcu = ?`,
        [tglMcu, kodePerusahaan, status, noMcu],
      );
      if (!res.affectedRows) throw new PelayananError("Data booking MCU tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Booking MCU ${noMcu} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui booking MCU perusahaan.");
  }
}

export async function deleteBookingMcu(req: NextRequest) {
  const { denied } = await cekAksesModul("booking_mcu_perusahaan", "Booking MCU Perusahaan");
  if (denied) return denied;
  try {
    const noMcu = (new URL(req.url).searchParams.get("no_mcu") || "").trim();
    if (!noMcu) throw new PelayananError("No. MCU wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM booking_mcu_perusahaan WHERE no_mcu = ?", [noMcu]);
      if (!res.affectedRows) throw new PelayananError("Data booking MCU tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Booking MCU ${noMcu} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus booking MCU perusahaan.");
  }
}

/* -------------------------------------------------------------------------- */
/* 9. RUJUKAN KELUAR (DlgRujuk.java)                                          */
/* -------------------------------------------------------------------------- */
const KAT_RUJUK_KELUAR = ["-", "Bedah", "Non Bedah", "Kebidanan", "Anak"] as const;
const AMBULANCE_OPT = ["-", "AGD", "SENDIRI", "SWASTA"] as const;

export async function getRujukanKeluar(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_keluar", "Rujukan Keluar");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("r.tgl_rujuk >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("r.tgl_rujuk <= ?"); params.push(tglSelesai); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(r.no_rujuk LIKE ? OR r.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR r.rujuk_ke LIKE ? OR r.keterangan_diagnosa LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, dokterRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM rujuk r
         INNER JOIN reg_periksa rp ON r.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT r.no_rujuk, r.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                r.rujuk_ke, DATE_FORMAT(r.tgl_rujuk, '%Y-%m-%d') AS tgl_rujuk,
                TIME_FORMAT(r.jam, '%H:%i:%s') AS jam,
                r.keterangan_diagnosa, r.kd_dokter, COALESCE(d.nm_dokter, '') AS nm_dokter,
                r.kat_rujuk, r.ambulance, r.keterangan
         FROM rujuk r
         INNER JOIN reg_periksa rp ON r.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN dokter d ON r.kd_dokter = d.kd_dokter
         WHERE ${whereSql}
         ORDER BY r.tgl_rujuk DESC, r.jam DESC
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
        kategori: KAT_RUJUK_KELUAR.map((k) => ({ value: k, label: k })),
        ambulance: AMBULANCE_OPT.map((a) => ({ value: a, label: a })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data rujukan keluar.");
  }
}

export async function postRujukanKeluar(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_keluar", "Rujukan Keluar");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRujuk = bacaTeks(body, "no_rujuk", "No. Rujuk", 40);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const rujukKe = bacaTeks(body, "rujuk_ke", "Tujuan Rujukan", 150);
    const tglRujuk = bacaTanggal(body, "tgl_rujuk", "Tanggal Rujuk");
    const jam = bacaJam(body, "jam", "Jam Rujuk");
    const diagnosa = bacaTeks(body, "keterangan_diagnosa", "Diagnosa", 500);
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter Perujuk", 20);
    const katRujuk = bacaEnum(body, "kat_rujuk", "Kategori Rujuk", KAT_RUJUK_KELUAR, "-");
    const ambulance = bacaEnum(body, "ambulance", "Ambulance", AMBULANCE_OPT, "-");
    const keterangan = bacaTeks(body, "keterangan", "Keterangan", 500, false);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO rujuk (no_rujuk, no_rawat, rujuk_ke, tgl_rujuk, keterangan_diagnosa, kd_dokter, kat_rujuk, ambulance, keterangan, jam)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [noRujuk, noRawat, rujukKe, tglRujuk, diagnosa, kdDokter, katRujuk, ambulance, keterangan, jam],
      );
    });

    return NextResponse.json({ success: true, message: `Rujukan keluar ${noRujuk} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan rujukan keluar.");
  }
}

export async function putRujukanKeluar(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_keluar", "Rujukan Keluar");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRujuk = bacaTeks(body, "no_rujuk", "No. Rujuk", 40);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const rujukKe = bacaTeks(body, "rujuk_ke", "Tujuan Rujukan", 150);
    const tglRujuk = bacaTanggal(body, "tgl_rujuk", "Tanggal Rujuk");
    const jam = bacaJam(body, "jam", "Jam Rujuk");
    const diagnosa = bacaTeks(body, "keterangan_diagnosa", "Diagnosa", 500);
    const kdDokter = bacaTeks(body, "kd_dokter", "Dokter Perujuk", 20);
    const katRujuk = bacaEnum(body, "kat_rujuk", "Kategori Rujuk", KAT_RUJUK_KELUAR, "-");
    const ambulance = bacaEnum(body, "ambulance", "Ambulance", AMBULANCE_OPT, "-");
    const keterangan = bacaTeks(body, "keterangan", "Keterangan", 500, false);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE rujuk
         SET rujuk_ke = ?, tgl_rujuk = ?, jam = ?, keterangan_diagnosa = ?, kd_dokter = ?, kat_rujuk = ?, ambulance = ?, keterangan = ?
         WHERE no_rujuk = ? AND no_rawat = ?`,
        [rujukKe, tglRujuk, jam, diagnosa, kdDokter, katRujuk, ambulance, keterangan, noRujuk, noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Data rujukan keluar tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Rujukan keluar ${noRujuk} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui rujukan keluar.");
  }
}

export async function deleteRujukanKeluar(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_keluar", "Rujukan Keluar");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRujuk = (sp.get("no_rujuk") || "").trim();
    const noRawat = (sp.get("no_rawat") || "").trim();
    if (!noRujuk || !noRawat) throw new PelayananError("No. Rujuk dan No. Rawat wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        "DELETE FROM rujuk WHERE no_rujuk = ? AND no_rawat = ?",
        [noRujuk, noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Data rujukan keluar tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Rujukan keluar ${noRujuk} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus rujukan keluar.");
  }
}

/* -------------------------------------------------------------------------- */
/* 10. RUJUKAN MASUK (DlgRujukMasuk.java)                                     */
/* -------------------------------------------------------------------------- */
const KAT_RUJUK_MASUK = ["-", "Bedah", "Non-Bedah", "Kebidanan", "Anak"] as const;

export async function getRujukanMasuk(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_masuk", "Rujukan Masuk");
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
      where.push("(rm.no_rawat LIKE ? OR rm.perujuk LIKE ? OR rm.no_rujuk LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR rm.dokter_perujuk LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM rujuk_masuk rm
         INNER JOIN reg_periksa rp ON rm.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT rm.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                DATE_FORMAT(rp.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
                rm.perujuk, rm.alamat, rm.no_rujuk, rm.jm_perujuk,
                rm.dokter_perujuk, rm.kd_penyakit,
                COALESCE(py.nm_penyakit, '') AS nm_penyakit,
                rm.kategori_rujuk, rm.keterangan, rm.no_balasan
         FROM rujuk_masuk rm
         INNER JOIN reg_periksa rp ON rm.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN penyakit py ON rm.kd_penyakit = py.kd_penyakit
         WHERE ${whereSql}
         ORDER BY rp.tgl_registrasi DESC, rm.no_rawat DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: { kategori: KAT_RUJUK_MASUK.map((k) => ({ value: k, label: k })) },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data rujukan masuk.");
  }
}

export async function postRujukanMasuk(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_masuk", "Rujukan Masuk");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const perujuk = bacaTeks(body, "perujuk", "Perujuk", 60);
    const alamat = bacaTeks(body, "alamat", "Alamat Perujuk", 70, false);
    const noRujuk = bacaTeks(body, "no_rujuk", "No. Rujuk", 40, false);
    const jmPerujuk = bacaAngka(body, "jm_perujuk", "JM Perujuk", 0, 999999999);
    const dokterPerujuk = bacaTeks(body, "dokter_perujuk", "Dokter Perujuk", 50, false);
    const kdPenyakit = bacaTeks(body, "kd_penyakit", "Kode ICD-10", 15, false);
    const kategori = bacaEnum(body, "kategori_rujuk", "Kategori Rujuk", KAT_RUJUK_MASUK, "-");
    const keterangan = bacaTeks(body, "keterangan", "Keterangan", 200, false);
    const noBalasan = bacaTeks(body, "no_balasan", "No. Balasan", 20, false);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO rujuk_masuk (no_rawat, perujuk, alamat, no_rujuk, jm_perujuk, dokter_perujuk, kd_penyakit, kategori_rujuk, keterangan, no_balasan)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [noRawat, perujuk, alamat, noRujuk, jmPerujuk, dokterPerujuk, kdPenyakit, kategori, keterangan, noBalasan],
      );
    });

    return NextResponse.json({ success: true, message: `Rujukan masuk ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan rujukan masuk.");
  }
}

export async function putRujukanMasuk(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_masuk", "Rujukan Masuk");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const perujuk = bacaTeks(body, "perujuk", "Perujuk", 60);
    const alamat = bacaTeks(body, "alamat", "Alamat Perujuk", 70, false);
    const noRujuk = bacaTeks(body, "no_rujuk", "No. Rujuk", 40, false);
    const jmPerujuk = bacaAngka(body, "jm_perujuk", "JM Perujuk", 0, 999999999);
    const dokterPerujuk = bacaTeks(body, "dokter_perujuk", "Dokter Perujuk", 50, false);
    const kdPenyakit = bacaTeks(body, "kd_penyakit", "Kode ICD-10", 15, false);
    const kategori = bacaEnum(body, "kategori_rujuk", "Kategori Rujuk", KAT_RUJUK_MASUK, "-");
    const keterangan = bacaTeks(body, "keterangan", "Keterangan", 200, false);
    const noBalasan = bacaTeks(body, "no_balasan", "No. Balasan", 20, false);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE rujuk_masuk
         SET perujuk = ?, alamat = ?, no_rujuk = ?, jm_perujuk = ?, dokter_perujuk = ?, kd_penyakit = ?, kategori_rujuk = ?, keterangan = ?, no_balasan = ?
         WHERE no_rawat = ?`,
        [perujuk, alamat, noRujuk, jmPerujuk, dokterPerujuk, kdPenyakit, kategori, keterangan, noBalasan, noRawat],
      );
      if (!res.affectedRows) throw new PelayananError("Data rujukan masuk tidak ditemukan.", 404);
    });

    return NextResponse.json({ success: true, message: `Rujukan masuk ${noRawat} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui rujukan masuk.");
  }
}

export async function deleteRujukanMasuk(req: NextRequest) {
  const { denied } = await cekAksesModul("rujukan_masuk", "Rujukan Masuk");
  if (denied) return denied;
  try {
    const noRawat = (new URL(req.url).searchParams.get("no_rawat") || "").trim();
    if (!noRawat) throw new PelayananError("No. Rawat wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM rujuk_masuk WHERE no_rawat = ?", [noRawat]);
      if (!res.affectedRows) throw new PelayananError("Data rujukan masuk tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Rujukan masuk ${noRawat} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus rujukan masuk.");
  }
}

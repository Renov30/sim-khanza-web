import { NextRequest, NextResponse } from "next/server";
import { executeQuery, pool } from "@/lib/db";
import { registrationAccess } from "@/lib/registrasi/access";
import { RegistrationError, registrationInput } from "@/lib/registrasi/validation";
import { lockRegistration, ensureNoCareRecords, registrationValues, saveReferral } from "@/lib/registrasi/records";
import { saveWithRegistrationNumbers, type RegistrationNumbers } from "@/lib/registrasi/numbering";
import { isRegistrationDate } from "@/lib/registrasi/date";

export async function GET(req: NextRequest) {
  try {
    const denied = await registrationAccess();
    if (denied) return denied;
    const { searchParams } = new URL(req.url);
    const tanggalMulai = searchParams.get("tanggal_mulai");
    const tanggalSelesai = searchParams.get("tanggal_selesai");
    const cari = searchParams.get("cari") || "";
    const kdDokter = searchParams.get("kd_dokter") || "";
    const kdPoli = searchParams.get("kd_poli") || "";
    const tampilan = searchParams.get("tampilan") || "awal";
    const limit = Math.max(1, Math.min(Math.trunc(Number(searchParams.get("limit"))) || 100, 200));
    const page = Math.max(1, Math.trunc(Number(searchParams.get("page"))) || 1);
    const statusBayar = searchParams.get("status_bayar") || "Semua";
    if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))
      || (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai)
      || !["Semua", "Belum Bayar", "Sudah Bayar"].includes(statusBayar)
      || !["awal", "rujukan_internal"].includes(tampilan)) {
      return NextResponse.json({ success: false, error: "Filter registrasi tidak valid." }, { status: 400 });
    }

    const rujukan = tampilan === "rujukan_internal";
    const kolomDokter = rujukan ? "rip.kd_dokter" : "r.kd_dokter";
    const kolomPoli = rujukan ? "rip.kd_poli" : "r.kd_poli";
    const joinRujukan = rujukan ? "INNER JOIN rujukan_internal_poli rip ON rip.no_rawat = r.no_rawat" : "";

    const where: string[] = ["1=1"];
    const params: (string | number)[] = [];

    if (tanggalMulai) { where.push("r.tgl_registrasi >= ?"); params.push(tanggalMulai); }
    if (tanggalSelesai) { where.push("r.tgl_registrasi <= ?"); params.push(tanggalSelesai); }
    if (statusBayar !== "Semua") { where.push("r.status_bayar = ?"); params.push(statusBayar); }

    if (kdDokter.trim()) {
      where.push(`${kolomDokter} = ?`);
      params.push(kdDokter.trim());
    }

    if (kdPoli.trim()) {
      where.push(`${kolomPoli} = ?`);
      params.push(kdPoli.trim());
    }

    if (cari.trim()) {
      where.push(`(r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ? OR pol.nm_poli LIKE ?)`);
      const kw = `%${cari.trim()}%`;
      params.push(kw, kw, kw, kw, kw);
    }
    const whereSql = `WHERE ${where.join(" AND ")}`;

    const sql = rujukan ? `
      SELECT r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
             r.jam_reg, ${kolomDokter}, d.nm_dokter, r.no_rkm_medis, p.nm_pasien,
             p.jk, r.umurdaftar, r.sttsumur, ${kolomPoli}, pol.nm_poli,
             r.kd_pj, pj.png_jawab, r.p_jawab, r.almt_pj, r.hubunganpj,
             r.stts_daftar, p.no_tlp, r.stts, r.status_bayar
      FROM reg_periksa r
      ${joinRujukan}
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON ${kolomDokter} = d.kd_dokter
      INNER JOIN poliklinik pol ON ${kolomPoli} = pol.kd_poli
      LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
      ${whereSql}
    ` : `
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') as tgl_registrasi, 
             r.jam_reg, r.kd_dokter, d.nm_dokter, r.no_rkm_medis, p.nm_pasien, 
             p.jk, p.no_peserta, DATE_FORMAT(p.tgl_daftar, '%Y-%m-%d') AS tgl_daftar_pasien, r.stts_daftar, r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli,
             r.kd_pj, pj.png_jawab,
             r.p_jawab, r.almt_pj, r.hubunganpj, r.biaya_reg, r.stts, 
             r.status_lanjut, r.status_bayar, COALESCE(rm.perujuk, '') AS asal_rujukan
      FROM reg_periksa r
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON r.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
      LEFT JOIN rujuk_masuk rm ON r.no_rawat = rm.no_rawat
      ${whereSql}
    `;

    // COUNT hanya memakai join yang dibutuhkan filter, bukan seluruh join tampilan.
    const countJoins = cari.trim()
      ? `${joinRujukan}
         INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
         INNER JOIN dokter d ON ${kolomDokter} = d.kd_dokter
         INNER JOIN poliklinik pol ON ${kolomPoli} = pol.kd_poli`
      : joinRujukan;
    const countSql = `SELECT COUNT(*) AS total FROM reg_periksa r ${countJoins} ${whereSql}`;

    const offset = (page - 1) * limit;
    const [counts, rows] = await Promise.all([
      executeQuery<{ total: number }>(countSql, params),
      executeQuery<Record<string, unknown>>(`${sql} ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC, r.no_rawat DESC LIMIT ? OFFSET ?`, [...params, limit, offset]),
    ]);
    const total = Number(counts[0].total);
    const currentPage = Math.min(page, Math.max(1, Math.ceil(total / limit)));

    if (currentPage !== page) {
      const rowsUlang = await executeQuery<Record<string, unknown>>(
        `${sql} ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC, r.no_rawat DESC LIMIT ? OFFSET ?`,
        [...params, limit, (currentPage - 1) * limit],
      );
      return NextResponse.json({ success: true, data: rowsUlang, total, page: currentPage, limit });
    }

    return NextResponse.json({
      success: true,
      data: rows,
      total, page: currentPage, limit,
    });
  } catch (error) { return registrationFailure(error); }
}

export async function POST(req: NextRequest) {
  return saveRegistration(req, false);
}

export async function PUT(req: NextRequest) {
  return saveRegistration(req, true);
}

async function saveRegistration(req: NextRequest, editing: boolean) {
  const denied = await registrationAccess();
  if (denied) return denied;
  let connection;
  try {
    const input = registrationInput(await req.json());
    if (editing && !input.no_rawat) throw new RegistrationError("No. Rawat wajib diisi.");
    connection = await pool.getConnection();
    let numbers: RegistrationNumbers;
    if (editing) {
      const conn = connection;
      let saved: RegistrationNumbers | undefined;
      await saveWithRegistrationNumbers(conn, { tanggal: input.tanggal, dokter: input.dokter, poli: input.poli }, async (assigned) => {
        await conn.beginTransaction();
        try {
          const old = await lockRegistration(conn, input.no_rawat);
          if (old.status_bayar === "Sudah Bayar") throw new RegistrationError("Registrasi sudah dibayar; perubahan harus melalui koreksi billing.", 409);
          if (old.no_rkm_medis !== input.pasien) await ensureNoCareRecords(conn, input.no_rawat);
          const changedQueue = old.kd_dokter !== input.dokter || old.kd_poli !== input.poli || old.tgl_registrasi !== input.tanggal;
          const noReg = changedQueue ? assigned.no_reg : old.no_reg;
          const values = await registrationValues(conn, input, old);
          await conn.execute(
            `UPDATE reg_periksa SET tgl_registrasi=?, jam_reg=?, kd_dokter=?, no_rkm_medis=?, kd_poli=?,
             p_jawab=?, almt_pj=?, hubunganpj=?, biaya_reg=?, stts=?, stts_daftar=?, kd_pj=?,
             umurdaftar=?, sttsumur=?, status_bayar=?, status_poli=?, no_reg=? WHERE no_rawat=?`,
            [...values, noReg, input.no_rawat],
          );
          await saveReferral(conn, input.no_rawat, input.rujukan, input.tanggal);
          await conn.commit();
          saved = { no_reg: noReg, no_rawat: input.no_rawat };
        } catch (error) { await conn.rollback(); throw error; }
      });
      numbers = saved!;
    } else {
      const conn = connection;
      numbers = await saveWithRegistrationNumbers(conn, {
        tanggal: input.tanggal, dokter: input.dokter, poli: input.poli,
      }, async (assigned) => {
        await conn.beginTransaction();
        try {
          const values = await registrationValues(conn, { ...input, no_rawat: "" });
          await conn.execute(
            `INSERT INTO reg_periksa (no_reg, no_rawat, tgl_registrasi, jam_reg, kd_dokter, no_rkm_medis,
             kd_poli, p_jawab, almt_pj, hubunganpj, biaya_reg, stts, stts_daftar, kd_pj,
             umurdaftar, sttsumur, status_bayar, status_poli, status_lanjut)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Ralan')`,
            [assigned.no_reg, assigned.no_rawat, ...values],
          );
          await saveReferral(conn, assigned.no_rawat, input.rujukan, input.tanggal);
          await conn.commit();
        } catch (error) { await conn.rollback(); throw error; }
      });
    }
    return NextResponse.json({ success: true, data: numbers, message: "Data registrasi berhasil disimpan" });
  } catch (error) {
    if (connection) await connection.rollback();
    return registrationFailure(error);
  } finally { connection?.release(); }
}

export async function DELETE(req: NextRequest) {
  const denied = await registrationAccess();
  if (denied) return denied;
  let connection;
  try {
    const rawat = req.nextUrl.searchParams.get("no_rawat");
    if (!rawat || rawat.length > 17) throw new RegistrationError("No. Rawat tidak valid.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const old = await lockRegistration(connection, rawat);
    if (old.status_bayar === "Sudah Bayar") throw new RegistrationError("Registrasi sudah dibayar dan tidak dapat dihapus.", 409);
    await ensureNoCareRecords(connection, rawat);
    await connection.execute("DELETE FROM rujuk_masuk WHERE no_rawat = ?", [rawat]);
    await connection.execute("DELETE FROM reg_periksa WHERE no_rawat = ?", [rawat]);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Registrasi berhasil dihapus" });
  } catch (error) {
    if (connection) await connection.rollback();
    return registrationFailure(error);
  } finally { connection?.release(); }
}

function registrationFailure(error: unknown) {
  if (error instanceof RegistrationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  console.error("Operasi registrasi gagal:", error);
  return NextResponse.json({ success: false, error: "Operasi registrasi gagal. Muat ulang data dan coba kembali." }, { status: 500 });
}

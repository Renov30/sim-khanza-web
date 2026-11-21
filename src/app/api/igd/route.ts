import { NextRequest, NextResponse } from "next/server";
import { executeQuery, pool } from "@/lib/db";
import { igdAccess } from "@/lib/igd/access";
import { POLI_IGD } from "@/lib/igd/constants";
import { assertIgdRegistration, ensureIgdUnit, ensureNoActiveInpatient, igdTariffReference, type IgdRegistration } from "@/lib/igd/records";
import { isRegistrationDate, registrationDate } from "@/lib/registrasi/date";
import { saveWithRegistrationNumbers, type RegistrationNumbers } from "@/lib/registrasi/numbering";
import { ensureNoCareRecords, lockRegistration, registrationValues, saveReferral } from "@/lib/registrasi/records";
import { RegistrationError, registrationInput } from "@/lib/registrasi/validation";

const FILTER_SEP = ["Semua", "Belum", "Sudah"] as const;
const STATUS_PERIKSA = ["Semua", "Belum", "Sudah", "Batal"] as const;

type FilterSep = (typeof FILTER_SEP)[number];
type StatusPeriksa = (typeof STATUS_PERIKSA)[number];

function responsTidakValid(pesan: string) {
  return NextResponse.json({ success: false, error: pesan, code: "INVALID_FILTER" }, { status: 400 });
}

function igdInput(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new RegistrationError("Data IGD tidak valid.");
  const value = body as Record<string, unknown>;
  if (typeof value.kd_poli === "string" && value.kd_poli.trim() && value.kd_poli.trim() !== POLI_IGD) {
    throw new RegistrationError("Unit IGD tidak dapat diubah.");
  }
  return registrationInput({ ...value, kd_poli: POLI_IGD });
}

export async function GET(req: NextRequest) {
  const denied = await igdAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const sekarang = registrationDate();
    const tanggalMulai = searchParams.get("tanggal_mulai") || sekarang;
    const tanggalSelesai = searchParams.get("tanggal_selesai") || sekarang;
    const cari = (searchParams.get("cari") || "").trim();
    const sep = (searchParams.get("sep") || "Semua") as FilterSep;
    const stts = (searchParams.get("stts") || "Semua") as StatusPeriksa;
    const limitMentah = searchParams.get("limit");
    const limit = limitMentah === null ? 50 : Number(limitMentah);

    if (!isRegistrationDate(tanggalMulai) || !isRegistrationDate(tanggalSelesai)) {
      return responsTidakValid("Tanggal filter tidak valid");
    }
    if (tanggalMulai > tanggalSelesai) return responsTidakValid("Rentang tanggal tidak valid");
    if (!FILTER_SEP.includes(sep)) return responsTidakValid("Filter SEP tidak dikenal");
    if (!STATUS_PERIKSA.includes(stts)) return responsTidakValid("Status periksa tidak dikenal");
    if (cari.length > 100) return responsTidakValid("Pencarian terlalu panjang");
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) return responsTidakValid("Batas data tidak valid");

    const where = [
      "r.kd_poli = 'IGDK'",
      "r.tgl_registrasi >= ?",
      "r.tgl_registrasi < DATE_ADD(?, INTERVAL 1 DAY)",
    ];
    const params: (string | number)[] = [tanggalMulai, tanggalSelesai];

    if (cari) {
      where.push(`(
        r.no_reg LIKE ? OR r.no_rawat LIKE ? OR r.tgl_registrasi LIKE ? OR r.kd_dokter LIKE ?
        OR d.nm_dokter LIKE ? OR r.no_rkm_medis LIKE ? OR r.stts_daftar LIKE ?
        OR p.nm_pasien LIKE ? OR pol.nm_poli LIKE ? OR r.p_jawab LIKE ?
        OR r.almt_pj LIKE ? OR r.hubunganpj LIKE ? OR penj.png_jawab LIKE ?
      )`);
      const kata = `%${cari}%`;
      params.push(kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata, kata);
    }
    if (stts !== "Semua") {
      where.push("r.stts = ?");
      params.push(stts);
    }
    if (sep === "Belum") {
      where.push("r.kd_pj IN (SELECT password_asuransi.kd_pj FROM password_asuransi)");
      where.push("r.no_rawat NOT IN (SELECT bridging_sep.no_rawat FROM bridging_sep)");
    }
    if (sep === "Sudah") {
      where.push("r.kd_pj IN (SELECT password_asuransi.kd_pj FROM password_asuransi)");
      where.push("r.no_rawat IN (SELECT bridging_sep.no_rawat FROM bridging_sep)");
    }

    const sumber = `
      FROM reg_periksa r
      INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
      INNER JOIN dokter d ON r.kd_dokter = d.kd_dokter
      INNER JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
      LEFT JOIN penjab penj ON r.kd_pj = penj.kd_pj
    `;
    const sumberTampil = `${sumber}
      LEFT JOIN rujuk_masuk rm ON rm.no_rawat = r.no_rawat
    `;
    const klausa = ` WHERE ${where.join(" AND ")}`;

    const hitung = await executeQuery<{ total: number }>(`SELECT COUNT(*) AS total ${sumber}${klausa}`, params);
    const total = Number(hitung[0]?.total || 0);

    const sql = `
      SELECT r.no_reg, r.no_rawat, DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
             r.jam_reg, r.kd_dokter, d.nm_dokter, r.no_rkm_medis, p.nm_pasien,
             p.jk, r.umurdaftar, r.sttsumur, r.kd_poli, pol.nm_poli,
             r.stts_daftar, penj.png_jawab, r.p_jawab, r.almt_pj, r.hubunganpj,
             r.biaya_reg, r.stts, r.status_lanjut, r.kd_pj, r.status_bayar,
             p.no_peserta, DATE_FORMAT(p.tgl_daftar, '%Y-%m-%d') AS tgl_daftar_pasien,
             COALESCE(rm.perujuk, '') AS asal_rujukan
      ${sumberTampil}${klausa}
      ORDER BY r.no_rawat
      LIMIT ?
    `;
    const rows = await executeQuery<Record<string, unknown>>(sql, [...params, limit]);

    return NextResponse.json({ success: true, data: rows, total });
  } catch (error: unknown) {
    console.error("Error in api/igd:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data IGD", code: "IGD_ERROR" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return simpanIgd(req, false);
}

export async function PUT(req: NextRequest) {
  return simpanIgd(req, true);
}

async function simpanIgd(req: NextRequest, editing: boolean) {
  const denied = await igdAccess();
  if (denied) return denied;
  let connection;
  try {
    const input = igdInput(await req.json());
    if (editing && !input.no_rawat) throw new RegistrationError("No. Rawat wajib diisi.");
    connection = await pool.getConnection();
    let numbers: RegistrationNumbers;
    if (editing) {
      const conn = connection;
      let saved: RegistrationNumbers | undefined;
      await saveWithRegistrationNumbers(conn, { tanggal: input.tanggal, dokter: input.dokter, poli: POLI_IGD }, async (assigned) => {
        await conn.beginTransaction();
        try {
          const old = await lockRegistration(conn, input.no_rawat) as IgdRegistration;
          assertIgdRegistration(old);
          if (old.status_bayar === "Sudah Bayar") throw new RegistrationError("Registrasi IGD sudah dibayar; perubahan harus melalui koreksi billing.", 409);
          if (old.no_rkm_medis !== input.pasien) {
            await ensureNoCareRecords(conn, input.no_rawat);
            await ensureNoActiveInpatient(conn, input.pasien);
          }
          input.stts = old.stts || "Belum";
          input.bayar = old.status_bayar;
          const changedQueue = old.kd_dokter !== input.dokter || old.tgl_registrasi !== input.tanggal;
          const noReg = changedQueue ? assigned.no_reg : old.no_reg;
          await ensureIgdUnit(conn);
          const values = await registrationValues(conn, input, old);
          await conn.execute(
            `UPDATE reg_periksa SET tgl_registrasi=?, jam_reg=?, kd_dokter=?, no_rkm_medis=?, kd_poli=?,
             p_jawab=?, almt_pj=?, hubunganpj=?, biaya_reg=?, stts=?, stts_daftar=?, kd_pj=?,
             umurdaftar=?, sttsumur=?, status_bayar=?, status_poli=?, no_reg=? WHERE no_rawat=? AND kd_poli=?`,
            [...values, noReg, input.no_rawat, POLI_IGD],
          );
          await saveReferral(conn, input.no_rawat, input.rujukan, input.tanggal);
          await conn.commit();
          saved = { no_reg: noReg, no_rawat: input.no_rawat };
        } catch (error) { await conn.rollback(); throw error; }
      });
      numbers = saved!;
    } else {
      const conn = connection;
      input.stts = "Belum";
      input.bayar = "Belum Bayar";
      numbers = await saveWithRegistrationNumbers(conn, { tanggal: input.tanggal, dokter: input.dokter, poli: POLI_IGD }, async (assigned) => {
        await conn.beginTransaction();
        try {
          await ensureIgdUnit(conn);
          await ensureNoActiveInpatient(conn, input.pasien);
          const values = await registrationValues(conn, { ...input, no_rawat: "" }, igdTariffReference());
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
    return NextResponse.json({ success: true, data: numbers, message: "Registrasi IGD berhasil disimpan" });
  } catch (error) {
    if (connection) await connection.rollback();
    return igdFailure(error);
  } finally { connection?.release(); }
}

export async function DELETE(req: NextRequest) {
  const denied = await igdAccess();
  if (denied) return denied;
  let connection;
  try {
    const rawat = req.nextUrl.searchParams.get("no_rawat");
    if (!rawat || rawat.length > 17) throw new RegistrationError("No. Rawat tidak valid.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const old = await lockRegistration(connection, rawat) as IgdRegistration;
    assertIgdRegistration(old);
    if (old.status_bayar === "Sudah Bayar") throw new RegistrationError("Registrasi IGD sudah dibayar dan tidak dapat dihapus.", 409);
    await ensureNoCareRecords(connection, rawat);
    await connection.execute("DELETE FROM rujuk_masuk WHERE no_rawat = ?", [rawat]);
    await connection.execute("DELETE FROM reg_periksa WHERE no_rawat = ? AND kd_poli = ?", [rawat, POLI_IGD]);
    await connection.commit();
    return NextResponse.json({ success: true, message: "Registrasi IGD berhasil dihapus" });
  } catch (error) {
    if (connection) await connection.rollback();
    return igdFailure(error);
  } finally { connection?.release(); }
}

function igdFailure(error: unknown) {
  if (error instanceof RegistrationError) return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  console.error("Operasi IGD gagal:", error);
  return NextResponse.json({ success: false, error: "Operasi IGD gagal. Muat ulang data dan coba kembali." }, { status: 500 });
}

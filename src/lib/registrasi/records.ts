import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { RegistrationError, registrationAge, registrationInput } from "./validation";

type Input = ReturnType<typeof registrationInput>;
export interface ExistingRegistration extends RowDataPacket {
  no_reg: string; no_rkm_medis: string; kd_poli: string; kd_dokter: string;
  tgl_registrasi: string; biaya_reg: number; status_bayar: string;
}

export async function lockRegistration(connection: PoolConnection, rawat: string) {
  const [rows] = await connection.execute<ExistingRegistration[]>(
    `SELECT *, DATE_FORMAT(tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi
     FROM reg_periksa WHERE no_rawat = ? FOR UPDATE`, [rawat],
  );
  if (!rows[0]) throw new RegistrationError("Registrasi tidak ditemukan. Muat ulang tabel.", 404);
  return rows[0];
}

export async function ensureNoCareRecords(connection: PoolConnection, rawat: string) {
  const [referrals] = await connection.execute<(RowDataPacket & { jm_perujuk: number })[]>(
    "SELECT jm_perujuk FROM rujuk_masuk WHERE no_rawat = ? FOR UPDATE", [rawat],
  );
  if (referrals.some((row) => Number(row.jm_perujuk) !== 0)) {
    throw new RegistrationError("Registrasi memiliki biaya perujuk dan tidak dapat dihapus atau diganti pasiennya.", 409);
  }
  // Periksa seluruh relasi FK, termasuk tabel modul yang belum tersedia di web.
  const [references] = await connection.execute<(RowDataPacket & { table_name: string; column_name: string })[]>(
    `SELECT DISTINCT TABLE_NAME AS table_name, COLUMN_NAME AS column_name FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME = 'reg_periksa'
       AND REFERENCED_COLUMN_NAME = 'no_rawat' AND TABLE_NAME <> 'rujuk_masuk'`,
  );
  for (const reference of references) {
    // Identifier berasal dari metadata database, bukan input pengguna.
    const quote = (name: string) => `\`${name.replaceAll("`", "``")}\``;
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT 1 FROM ${quote(reference.table_name)} WHERE ${quote(reference.column_name)} = ? LIMIT 1 FOR UPDATE`, [rawat],
    );
    if (rows.length) throw new RegistrationError("Registrasi sudah memiliki data pelayanan/transaksi terkait dan tidak dapat dihapus atau diganti pasiennya.", 409);
  }
}

export async function registrationValues(connection: PoolConnection, input: Input, old?: ExistingRegistration) {
  const [patients] = await connection.execute<(RowDataPacket & { birth: string; registered: string })[]>(
    `SELECT DATE_FORMAT(tgl_lahir, '%Y-%m-%d') AS birth, DATE_FORMAT(tgl_daftar, '%Y-%m-%d') AS registered
     FROM pasien WHERE no_rkm_medis = ?`, [input.pasien],
  );
  if (!patients[0]) throw new RegistrationError("Pasien tidak ditemukan.");
  const [policies] = await connection.execute<(RowDataPacket & { registrasi: number; registrasilama: number })[]>(
    "SELECT registrasi, registrasilama FROM poliklinik WHERE kd_poli = ? AND (status = '1' OR kd_poli = ?)",
    [input.poli, old?.kd_poli ?? ""],
  );
  const [doctors] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_dokter FROM dokter WHERE kd_dokter = ? AND (status = '1' OR kd_dokter = ?)", [input.dokter, old?.kd_dokter ?? ""],
  );
  const [payers] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_pj FROM penjab WHERE kd_pj = ?", [input.penjamin],
  );
  if (!policies.length || !doctors.length || !payers.length) throw new RegistrationError("Dokter, poli, atau penjamin tidak valid.");
  // DlgReg.isCekPasien(): Baru jika tanggal daftar pasien sama dengan tanggal registrasi.
  const status = patients[0].registered === input.tanggal ? "Baru" : "Lama";
  const age = registrationAge(patients[0].birth, input.tanggal);
  const [history] = await connection.execute<(RowDataPacket & { total: number })[]>(
    "SELECT COUNT(*) AS total FROM reg_periksa WHERE no_rkm_medis = ? AND kd_poli = ? AND no_rawat <> ? AND tgl_registrasi <= ?",
    [input.pasien, input.poli, input.no_rawat, input.tanggal],
  );
  const unchangedTariff = old && old.no_rkm_medis === input.pasien && old.kd_poli === input.poli && old.tgl_registrasi === input.tanggal;
  const biaya = unchangedTariff ? Number(old.biaya_reg) : Number(status === "Baru" ? policies[0].registrasi : policies[0].registrasilama);
  if (!Number.isFinite(biaya) || biaya < 0) throw new RegistrationError("Tarif poli tidak valid.");
  return [input.tanggal, input.jam, input.dokter, input.pasien, input.poli, input.jawab,
    input.alamat, input.hubungan, biaya, input.stts, status, input.penjamin, age.umur, age.satuan,
    input.bayar, Number(history[0].total) > 0 ? "Lama" : "Baru"];
}

export async function saveReferral(connection: PoolConnection, rawat: string, referral: string, date: string) {
  // Jangan menimpa nomor rujukan/bridging dan detail rujukan desktop yang sudah ada.
  const [rows] = await connection.execute<RowDataPacket[]>("SELECT no_rawat FROM rujuk_masuk WHERE no_rawat = ? FOR UPDATE", [rawat]);
  const name = referral === "-" ? "" : referral;
  if (rows.length) {
    await connection.execute("UPDATE rujuk_masuk SET perujuk = ? WHERE no_rawat = ?", [name, rawat]);
  } else if (name) {
    const [numbers] = await connection.execute<(RowDataPacket & { maximum: number })[]>(
      `SELECT COALESCE(MAX(CAST(RIGHT(rm.no_balasan, 4) AS UNSIGNED)), 0) AS maximum
       FROM rujuk_masuk rm JOIN reg_periksa r ON r.no_rawat = rm.no_rawat WHERE r.tgl_registrasi = ?`, [date],
    );
    const next = Number(numbers[0].maximum) + 1;
    if (next > 9999) throw new RegistrationError("Nomor balasan rujukan harian sudah mencapai batas.", 409);
    const reply = `BR/${date.replaceAll("-", "/")}/${String(next).padStart(4, "0")}`;
    await connection.execute(
      `INSERT INTO rujuk_masuk (no_rawat, perujuk, alamat, no_rujuk, jm_perujuk, dokter_perujuk, kd_penyakit, kategori_rujuk, keterangan, no_balasan)
       VALUES (?, ?, '-', '-', 0, ?, '-', '-', '-', ?)`, [rawat, name, name, reply],
    );
  }
}

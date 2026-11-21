import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { type ExistingRegistration } from "../registrasi/records";
import { RegistrationError } from "../registrasi/validation";
import { POLI_IGD } from "./constants";

export interface IgdRegistration extends ExistingRegistration {
  status_lanjut?: string;
  stts?: string;
}

export function igdTariffReference(): ExistingRegistration {
  return { kd_poli: POLI_IGD } as ExistingRegistration;
}

export function assertIgdRegistration(old: IgdRegistration) {
  if (old.kd_poli !== POLI_IGD || (old.status_lanjut && old.status_lanjut !== "Ralan")) {
    throw new RegistrationError("Data ini bukan kunjungan IGD.", 404);
  }
}

export async function ensureIgdUnit(connection: Pick<PoolConnection, "execute">) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_poli FROM poliklinik WHERE kd_poli = ? FOR UPDATE", [POLI_IGD],
  );
  if (!rows.length) {
    await connection.execute(
      "INSERT INTO poliklinik (kd_poli, nm_poli, registrasi, registrasilama, status) VALUES (?, ?, 0, 0, '1')",
      [POLI_IGD, "Unit IGD"],
    );
  }
}

export async function ensureNoActiveInpatient(connection: Pick<PoolConnection, "execute">, rm: string) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `SELECT 1 FROM kamar_inap ki
     INNER JOIN reg_periksa r ON r.no_rawat = ki.no_rawat
     WHERE r.no_rkm_medis = ? AND ki.stts_pulang = '-' LIMIT 1`, [rm],
  );
  if (rows[0]) throw new RegistrationError("Pasien masih dirawat di kamar inap; registrasi IGD dibatalkan.", 409);
}

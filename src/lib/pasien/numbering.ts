import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { isRegistrationDate } from "../registrasi/date";

type PatientNumberOrder = "Straight" | "Terminal" | "Middle";
type DatePosition = "Depan" | "Belakang";

interface PatientNumberSettings extends RowDataPacket {
  urutan: string;
  tahun: string;
  bulan: string;
  posisi_tahun_bulan: string;
}

interface LastPatientNumber extends RowDataPacket {
  no_rkm_medis: string;
}

function encodeSequence(sequence: number, order: PatientNumberOrder) {
  const value = String(sequence).padStart(6, "0");
  if (order === "Terminal") return `${value.slice(4)}${value.slice(2, 4)}${value.slice(0, 2)}`;
  if (order === "Middle") return `${value.slice(2, 4)}${value.slice(0, 2)}${value.slice(4)}`;
  return value;
}

function decodeSequence(value: string, order: PatientNumberOrder) {
  if (!/^\d{6}$/.test(value)) return 0;
  const canonical = order === "Terminal"
    ? `${value.slice(4)}${value.slice(2, 4)}${value.slice(0, 2)}`
    : order === "Middle"
      ? `${value.slice(2, 4)}${value.slice(0, 2)}${value.slice(4)}`
      : value;
  return Number(canonical);
}

async function readSettings(connection: Pick<PoolConnection, "execute">) {
  const [rows] = await connection.execute<PatientNumberSettings[]>(
    "SELECT urutan, tahun, bulan, posisi_tahun_bulan FROM set_urut_no_rkm_medis LIMIT 1",
  );
  const row = rows[0];
  if (!row || !["Straight", "Terminal", "Middle"].includes(row.urutan)
    || !["Yes", "No"].includes(row.tahun) || !["Yes", "No"].includes(row.bulan)
    || !["Depan", "Belakang"].includes(row.posisi_tahun_bulan)) {
    throw new Error("Konfigurasi urutan No. Rekam Medis belum valid.");
  }
  return {
    order: row.urutan as PatientNumberOrder,
    year: row.tahun === "Yes",
    month: row.bulan === "Yes",
    position: row.posisi_tahun_bulan as DatePosition,
  };
}

export async function getNextPatientNumber(
  connection: Pick<PoolConnection, "execute">,
  registrationDate: string,
) {
  if (!isRegistrationDate(registrationDate)) throw new Error("Tanggal daftar pasien tidak valid.");
  const settings = await readSettings(connection);
  const [rows] = await connection.execute<LastPatientNumber[]>(
    "SELECT no_rkm_medis FROM set_no_rkm_medis LIMIT 1",
  );
  const stored = rows[0]?.no_rkm_medis || "";
  const displayedSequence = settings.position === "Depan" ? stored.slice(-6) : stored.slice(0, 6);
  let sequence = decodeSequence(displayedSequence, settings.order) + 1;

  for (; sequence <= 999999; sequence++) {
    const numberPart = encodeSequence(sequence, settings.order);
    const year = settings.year ? registrationDate.slice(2, 4) : "";
    const month = settings.month ? registrationDate.slice(5, 7) : "";
    const datePart = `${month}${year}`;
    const number = settings.position === "Depan"
      ? `${year}${month}${numberPart}`
      : `${numberPart}${datePart ? `-${datePart}` : ""}`;
    const [existing] = await connection.execute<RowDataPacket[]>(
      "SELECT no_rkm_medis FROM pasien WHERE no_rkm_medis = ? LIMIT 1",
      [number],
    );
    if (!existing.length) return number;
  }
  throw new Error("Urutan No. Rekam Medis sudah mencapai batas 6 digit.");
}

export async function updateLastPatientNumber(
  connection: Pick<PoolConnection, "execute">,
  number: string,
) {
  await connection.execute("DELETE FROM set_no_rkm_medis");
  await connection.execute("INSERT INTO set_no_rkm_medis (no_rkm_medis) VALUES (?)", [number]);
}

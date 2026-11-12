import { isRegistrationDate } from "./date";

export class RegistrationError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function registrationInput(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new RegistrationError("Data registrasi tidak valid.");
  const value = body as Record<string, unknown>;
  const string = (key: string, max: number, required = true) => {
    const field = value[key] ?? "";
    if (typeof field !== "string" || field.trim().length > max || (required && !field.trim())) {
      throw new RegistrationError(`Isian ${key} tidak valid.`);
    }
    return field.trim();
  };
  const date = string("tgl_registrasi", 10);
  const time = string("jam_reg", 8);
  if (!isRegistrationDate(date) || !/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(time)) {
    throw new RegistrationError("Tanggal atau jam registrasi tidak valid.");
  }
  const stts = string("stts", 20);
  const bayar = string("status_bayar", 20);
  if (!["Belum", "Sudah", "Batal", "Berkas Diterima", "Dirujuk", "Meninggal", "Dirawat", "Pulang Paksa"].includes(stts)
    || !["Belum Bayar", "Sudah Bayar"].includes(bayar)) throw new RegistrationError("Status registrasi tidak valid.");
  return {
    no_rawat: string("no_rawat", 17, false), tanggal: date, jam: time,
    pasien: string("no_rkm_medis", 15), dokter: string("kd_dokter", 20), poli: string("kd_poli", 5),
    penjamin: string("kd_pj", 3), jawab: string("p_jawab", 100, false) || "-",
    alamat: string("almt_pj", 200, false) || "-", hubungan: string("hubunganpj", 20, false) || "-",
    rujukan: string("asal_rujukan", 60, false), stts, bayar,
  };
}

export function registrationAge(birth: string, date: string) {
  if (!isRegistrationDate(birth) || !isRegistrationDate(date) || birth > date) {
    throw new RegistrationError("Tanggal lahir pasien tidak valid untuk tanggal registrasi.");
  }
  const start = new Date(`${birth}T00:00:00Z`);
  const end = new Date(`${date}T00:00:00Z`);
  let months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
  if (end.getUTCDate() < start.getUTCDate()) months--;
  if (months >= 12) return { umur: Math.floor(months / 12), satuan: "Th" };
  if (months > 0) return { umur: months, satuan: "Bl" };
  return { umur: Math.floor((end.getTime() - start.getTime()) / 86400000), satuan: "Hr" };
}

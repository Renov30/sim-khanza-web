import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { isRegistrationDate } from "./date";

export interface RegistrationNumberInput {
  tanggal: string;
  dokter: string;
  poli: string;
}

export interface RegistrationNumbers {
  no_reg: string;
  no_rawat: string;
}

interface MaximumRow extends RowDataPacket {
  maximum: number | string;
}

// DlgReg.isNumber(): No. Rawat harian, No. Reg sesuai URUTNOREG/BASENOREG.
export async function getRegistrationNumbers(
  connection: Pick<PoolConnection, "execute">,
  input: RegistrationNumberInput,
): Promise<RegistrationNumbers> {
  if (!isRegistrationDate(input.tanggal) || !input.dokter || !input.poli) {
    throw new Error("Tanggal, dokter, dan poli wajib valid untuk penomoran registrasi.");
  }

  const urutan = process.env.KHANZA_URUTNOREG || "dokter + poli";
  const basis = process.env.KHANZA_BASENOREG || "booking";
  if (!["poli", "dokter", "dokter + poli"].includes(urutan)
    || !["registrasi", "booking"].includes(basis)) {
    throw new Error("Konfigurasi penomoran registrasi tidak valid.");
  }

  const [rawat] = await connection.execute<MaximumRow[]>(
    `SELECT COALESCE(MAX(CAST(RIGHT(no_rawat, 6) AS UNSIGNED)), 0) AS maximum
     FROM reg_periksa WHERE tgl_registrasi = ?`,
    [input.tanggal],
  );
  const params = [input.tanggal, urutan, input.dokter, urutan, input.poli];
  const [registrasi] = await connection.execute<MaximumRow[]>(
    `SELECT COALESCE(MAX(CAST(no_reg AS UNSIGNED)), 0) AS maximum
     FROM reg_periksa WHERE tgl_registrasi = ?
       AND (? = 'poli' OR kd_dokter = ?)
       AND (? = 'dokter' OR kd_poli = ?)`,
    params,
  );
  let maximumReg = Number(registrasi[0].maximum);
  if (basis === "booking") {
    const [booking] = await connection.execute<MaximumRow[]>(
      `SELECT COALESCE(MAX(CAST(no_reg AS UNSIGNED)), 0) AS maximum
       FROM booking_registrasi WHERE tanggal_periksa = ?
         AND (? = 'poli' OR kd_dokter = ?)
         AND (? = 'dokter' OR kd_poli = ?)`,
      params,
    );
    maximumReg = Math.max(maximumReg, Number(booking[0].maximum));
  }

  const nextRawat = Number(rawat[0].maximum) + 1;
  const nextReg = maximumReg + 1;
  if (!Number.isSafeInteger(nextRawat) || nextRawat > 999999
    || !Number.isSafeInteger(nextReg) || nextReg > 99999999) {
    throw new Error("Urutan registrasi sudah mencapai batas format nomor Khanza.");
  }
  return {
    no_rawat: `${input.tanggal.replaceAll("-", "/")}/${String(nextRawat).padStart(6, "0")}`,
    no_reg: String(nextReg).padStart(3, "0"),
  };
}

export async function saveWithRegistrationNumbers(
  connection: PoolConnection,
  input: RegistrationNumberInput,
  save: (numbers: RegistrationNumbers) => Promise<void>,
): Promise<RegistrationNumbers> {
  const lockName = `khanza-web:registrasi:${input.tanggal}`;
  const [locks] = await connection.execute<(RowDataPacket & { acquired: number | null })[]>(
    "SELECT GET_LOCK(?, 10) AS acquired", [lockName],
  );
  if (locks[0].acquired !== 1) {
    throw new Error("Penomoran sedang digunakan. Silakan simpan kembali.");
  }
  try {
    // Semua penyimpanan web memakai koneksi dan lock yang sama. Jika desktop
    // mengambil No. Rawat lebih dahulu, ulangi INSERT dengan urutan terbaru.
    for (let attempt = 0; attempt < 3; attempt++) {
      const numbers = await getRegistrationNumbers(connection, input);
      try {
        await save(numbers);
        return numbers;
      } catch (error: unknown) {
        if (attempt === 2 || !(error instanceof Error)
          || !("code" in error) || error.code !== "ER_DUP_ENTRY") throw error;
      }
    }
    throw new Error("Gagal menentukan nomor registrasi.");
  } finally {
    try {
      await connection.execute("SELECT RELEASE_LOCK(?)", [lockName]);
    } catch (error) {
      // Koneksi yang mungkin masih memegang lock tidak boleh kembali ke pool.
      connection.destroy();
      console.error("Gagal melepas lock registrasi; koneksi ditutup:", error);
    }
  }
}

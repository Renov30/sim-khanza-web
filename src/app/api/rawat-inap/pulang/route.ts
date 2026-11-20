import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { kamarInapAccess } from "@/lib/rawat-inap/access";
import {
  STATUS_PULANG,
  MutasiError,
  angka,
  biayaInap,
  dataInapTerkunci,
  hitungLama,
  jam,
  jalankanUpdate,
  konfigurasiInap,
  obyekBody,
  responsGagalan,
  statusKamar,
  tindakLanjutPulang,
  tanggal,
  teks,
  kunciKamar,
  tarifKamar,
  pilihan,
} from "@/lib/rawat-inap/mutasi";

export async function GET() {
  const denied = await kamarInapAccess();
  if (denied) return denied;
  let connection: Awaited<ReturnType<typeof pool.getConnection>> | undefined;
  try {
    connection = await pool.getConnection();
    const konfigurasi = await konfigurasiInap(connection);
    return NextResponse.json({ success: true, data: { konfigurasi, status_pulang: STATUS_PULANG } });
  } catch (error) {
    return responsGagalan(error, "Gagal memuat konfigurasi pulang rawat inap.");
  } finally {
    connection?.release();
  }
}

export async function POST(req: NextRequest) {
  const denied = await kamarInapAccess();
  if (denied) return denied;
  let connection: Awaited<ReturnType<typeof pool.getConnection>> | undefined;
  try {
    const input = obyekBody(await req.json());
    const noRawat = teks(input.no_rawat, "No. rawat", 17);
    const kdKamar = teks(input.kd_kamar, "Kamar", 15);
    const tglMasuk = tanggal(input.tgl_masuk, "Tanggal masuk");
    const jamMasuk = jam(input.jam_masuk, "Jam masuk");
    const tglKeluar = tanggal(input.tgl_keluar, "Tanggal keluar");
    const jamKeluar = jam(input.jam_keluar, "Jam keluar");
    const statusPulang = pilihan(input.status_pulang, "Status pulang", STATUS_PULANG);
    const diagnosaAkhir = typeof input.diagnosa_akhir === "string" ? input.diagnosa_akhir.trim() : "";

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const config = await konfigurasiInap(connection);
    if (config.diagnosaakhir === "Yes" && !diagnosaAkhir) {
      throw new MutasiError("Diagnosa akhir keluar wajib diisi.");
    }
    if (diagnosaAkhir.length > 100) throw new MutasiError("Diagnosa akhir terlalu panjang.");

    const baris = await dataInapTerkunci(connection, noRawat, kdKamar, tglMasuk, jamMasuk);
    if (baris.stts_pulang !== "-") {
      throw new MutasiError("Pasien pada kamar ini sudah dipulangkan.", 409);
    }

    const lamaHitung = await hitungLama(connection, tglMasuk, jamMasuk, tglKeluar, jamKeluar, config);
    const tarif = angka(input.tarif, "Tarif kamar", await tarifKamar(connection, kdKamar, baris.kd_pj), 0);
    const lama = angka(input.lama, "Lama inap", lamaHitung, 0, 36500);
    const biaya = angka(input.ttl_biaya, "Total biaya", biayaInap(lama, tarif), 0, 100000000000);

    await kunciKamar(connection, kdKamar, false);
    await jalankanUpdate(connection, `UPDATE kamar_inap SET
      tgl_keluar = ?, trf_kamar = ?, jam_keluar = ?, ttl_biaya = ?,
      stts_pulang = ?, diagnosa_akhir = ?, lama = ?
      WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`, [
      tglKeluar,
      tarif,
      jamKeluar,
      biaya,
      statusPulang,
      diagnosaAkhir,
      lama,
      noRawat,
      kdKamar,
      tglMasuk,
      jamMasuk,
    ], "Data kamar inap gagal diperbarui.");
    await statusKamar(connection, kdKamar, "KOSONG");
    await connection.commit();

    return NextResponse.json({
      success: true,
      data: {
        no_rawat: noRawat,
        no_rkm_medis: baris.no_rkm_medis,
        nm_pasien: baris.nm_pasien,
        status_pulang: statusPulang,
        tindak_lanjut: tindakLanjutPulang(statusPulang),
      },
      message: "Proses pulang pasien berhasil disimpan.",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    return responsGagalan(error, "Proses pulang pasien gagal disimpan.");
  } finally {
    connection?.release();
  }
}

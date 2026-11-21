import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { pasienMatiAccess } from "@/lib/rawat-inap/access";
import {
  TEMPAT_MENINGGAL,
  MutasiError,
  jam,
  obyekBody,
  pilihan,
  responsGagalan,
  tanggal,
  teks,
} from "@/lib/rawat-inap/mutasi";

export async function GET() {
  const denied = await pasienMatiAccess();
  if (denied) return denied;
  try {
    const dokter = await executeQuery<{ kd_dokter: string; nm_dokter: string }>(
      "SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter LIMIT 200",
    );
    return NextResponse.json({ success: true, data: { dokter } });
  } catch (error) {
    return responsGagalan(error, "Gagal memuat daftar dokter.");
  }
}

export async function POST(req: NextRequest) {
  const denied = await pasienMatiAccess();
  if (denied) return denied;
  try {
    const input = obyekBody(await req.json());
    const noRkmMedis = teks(input.no_rkm_medis, "No. RM", 15);
    const tglMeninggal = tanggal(input.tanggal, "Tanggal meninggal");
    const jamMeninggal = jam(input.jam, "Jam meninggal");
    const keterangan = teks(input.keterangan, "Keterangan", 100);
    const tempatMeninggal = pilihan(input.tempat_meninggal, "Tempat meninggal", TEMPAT_MENINGGAL);
    const kdDokter = teks(input.kd_dokter, "Dokter penanggung jawab", 20);
    const icd = [1, 2, 3, 4].map((n) => teks(input[`icd${n}`], `ICD ${n}`, 20, false));

    const [pasien] = await executeQuery("SELECT no_rkm_medis FROM pasien WHERE no_rkm_medis = ? LIMIT 1", [noRkmMedis]);
    if (!pasien) throw new MutasiError("Pasien tidak ditemukan.", 404);
    const [dokter] = await executeQuery("SELECT kd_dokter FROM dokter WHERE kd_dokter = ? LIMIT 1", [kdDokter]);
    if (!dokter) throw new MutasiError("Dokter tidak ditemukan.", 404);

    await executeQuery(`INSERT INTO pasien_mati
      (tanggal, jam, no_rkm_medis, keterangan, temp_meninggal, icd1, icd2, icd3, icd4, kd_dokter)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      tglMeninggal,
      jamMeninggal,
      noRkmMedis,
      keterangan,
      tempatMeninggal,
      ...icd,
      kdDokter,
    ]);

    return NextResponse.json({
      success: true,
      data: { no_rkm_medis: noRkmMedis, tanggal: tglMeninggal, jam: jamMeninggal },
      message: "Data pasien meninggal berhasil disimpan.",
    });
  } catch (error) {
    return responsGagalan(error, "Data pasien meninggal gagal disimpan.");
  }
}

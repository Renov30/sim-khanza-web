import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import { jadwalDokterAccess } from "@/lib/jadwal-dokter/access";
import { HARI_KERJA, JAM, MENIT_DETIK } from "@/lib/jadwal-dokter/jadwal";

export async function GET() {
  const denied = await jadwalDokterAccess();
  if (denied) return denied;
  try {
    const [dokter, poliklinik] = await Promise.all([
      executeQuery<RowDataPacket>(
        "SELECT kd_dokter, nm_dokter FROM dokter ORDER BY nm_dokter, kd_dokter",
      ),
      executeQuery<RowDataPacket>(
        "SELECT kd_poli, nm_poli FROM poliklinik ORDER BY nm_poli, kd_poli",
      ),
    ]);
    const opsi = (nilai: readonly string[]) => nilai.map((id) => ({ id, label: id }));
    return NextResponse.json({
      success: true,
      data: {
        dokter: dokter.map((row) => ({
          id: String(row.kd_dokter ?? ""),
          label: `${row.kd_dokter ?? ""} ${row.nm_dokter ?? ""}`.trim(),
        })),
        poliklinik: poliklinik.map((row) => ({
          id: String(row.kd_poli ?? ""),
          label: `${row.kd_poli ?? ""} ${row.nm_poli ?? ""}`.trim(),
        })),
        hariKerja: opsi(HARI_KERJA),
        jam: opsi(JAM),
        menit: opsi(MENIT_DETIK),
        detik: opsi(MENIT_DETIK),
      },
    });
  } catch (error) {
    console.error("Gagal memuat pilihan jadwal dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan jadwal dokter. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

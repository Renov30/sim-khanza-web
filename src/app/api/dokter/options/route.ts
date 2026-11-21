import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import { dokterAccess } from "@/lib/kepegawaian/access";
import {
  AGAMA,
  GOLONGAN_DARAH,
  JK_MASTER,
  STATUS_MASTER,
  STATUS_NIKAH,
} from "@/lib/kepegawaian/master";

export async function GET() {
  const denied = await dokterAccess();
  if (denied) return denied;
  try {
    const spesialis = await executeQuery<RowDataPacket>(
      "SELECT kd_sps, nm_sps FROM spesialis ORDER BY nm_sps, kd_sps",
    );
    const opsi = (nilai: readonly string[]) => nilai.map((item) => ({ id: item, label: item }));
    return NextResponse.json({
      success: true,
      data: {
        spesialis: spesialis.map((row) => ({
          id: String(row.kd_sps ?? ""),
          label: `${row.kd_sps ?? ""} ${row.nm_sps ?? ""}`.trim(),
        })),
        jenisKelamin: opsi(JK_MASTER),
        golonganDarah: opsi(GOLONGAN_DARAH),
        agama: opsi(AGAMA),
        statusNikah: opsi(STATUS_NIKAH),
        status: opsi(STATUS_MASTER),
      },
    });
  } catch (error) {
    console.error("Gagal memuat pilihan data dokter:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan data dokter. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

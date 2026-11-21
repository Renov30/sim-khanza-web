import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import { petugasAccess } from "@/lib/kepegawaian/access";
import {
  AGAMA,
  GOLONGAN_DARAH,
  JK_MASTER,
  STATUS_MASTER,
  STATUS_NIKAH,
} from "@/lib/kepegawaian/master";

export async function GET() {
  const denied = await petugasAccess();
  if (denied) return denied;
  try {
    const jabatan = await executeQuery<RowDataPacket>(
      "SELECT kd_jbtn, nm_jbtn FROM jabatan ORDER BY nm_jbtn, kd_jbtn",
    );
    const opsi = (nilai: readonly string[]) => nilai.map((item) => ({ id: item, label: item }));
    return NextResponse.json({
      success: true,
      data: {
        jabatan: jabatan.map((row) => ({
          id: String(row.kd_jbtn ?? ""),
          label: `${row.kd_jbtn ?? ""} ${row.nm_jbtn ?? ""}`.trim(),
        })),
        jenisKelamin: opsi(JK_MASTER),
        golonganDarah: opsi(GOLONGAN_DARAH),
        agama: opsi(AGAMA),
        statusNikah: opsi(STATUS_NIKAH),
        status: opsi(STATUS_MASTER),
      },
    });
  } catch (error) {
    console.error("Gagal memuat pilihan data petugas:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan data petugas. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { patientAccess } from "@/lib/pasien/access";
import { getNextPatientNumber } from "@/lib/pasien/numbering";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const denied = await patientAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  try {
    const tanggal = new URL(req.url).searchParams.get("tanggal") || "";
    const number = await getNextPatientNumber(connection, tanggal);
    return NextResponse.json({ success: true, data: { no_rkm_medis: number } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal membuat No. Rekam Medis.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  } finally {
    connection.release();
  }
}

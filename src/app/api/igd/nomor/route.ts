import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { igdAccess } from "@/lib/igd/access";
import { POLI_IGD } from "@/lib/igd/constants";
import { getRegistrationNumbers } from "@/lib/registrasi/numbering";
import { isRegistrationDate } from "@/lib/registrasi/date";

export async function GET(req: NextRequest) {
  const denied = await igdAccess();
  if (denied) return denied;
  const tanggal = req.nextUrl.searchParams.get("tanggal") || "";
  const dokter = req.nextUrl.searchParams.get("dokter")?.trim() || "";
  if (!isRegistrationDate(tanggal) || !dokter) {
    return NextResponse.json({ success: false, error: "Tanggal dan dokter wajib valid." }, { status: 400 });
  }
  try {
    const data = await getRegistrationNumbers(pool, { tanggal, dokter, poli: POLI_IGD });
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "no-store" } });
  } catch (error: unknown) {
    console.error("Gagal memuat nomor IGD:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat nomor IGD. Silakan coba kembali." }, { status: 500 });
  }
}

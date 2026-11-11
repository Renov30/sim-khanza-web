import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { pool } from "@/lib/db";
import { getRegistrationNumbers } from "@/lib/registrasi/numbering";
import { isRegistrationDate } from "@/lib/registrasi/date";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  if (!session.isAdmin && !session.permissions.registrasi) {
    return NextResponse.json({ success: false, error: "Akses registrasi tidak diizinkan." }, { status: 403 });
  }
  const input = {
    tanggal: req.nextUrl.searchParams.get("tanggal") || "",
    dokter: req.nextUrl.searchParams.get("dokter")?.trim() || "",
    poli: req.nextUrl.searchParams.get("poli")?.trim() || "",
  };
  if (!isRegistrationDate(input.tanggal) || !input.dokter || !input.poli) {
    return NextResponse.json({ success: false, error: "Tanggal, dokter, dan poli wajib valid." }, { status: 400 });
  }
  try {
    const data = await getRegistrationNumbers(pool, input);
    // Membuka formulir hanya melihat nomor berikutnya, tidak memesan nomor.
    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Gagal memuat nomor registrasi:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat nomor registrasi. Silakan coba kembali." }, { status: 500 });
  }
}

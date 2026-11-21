import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function jadwalDokterAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.jadwal_praktek) {
    return NextResponse.json(
      { success: false, error: "Akses jadwal praktek dokter tidak diizinkan." },
      { status: 403 },
    );
  }
  return null;
}

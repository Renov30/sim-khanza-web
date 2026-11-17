import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function resepObatAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.resep_obat) {
    return NextResponse.json({ success: false, error: "Akses input resep tidak diizinkan." }, { status: 403 });
  }
  return null;
}

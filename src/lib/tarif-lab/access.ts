import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function tarifLabAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.tarif_lab) {
    return NextResponse.json(
      { success: false, error: "Akses tarif laboratorium tidak diizinkan." },
      { status: 403 },
    );
  }
  return null;
}

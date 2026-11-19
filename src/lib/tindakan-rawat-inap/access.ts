import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function tindakanRawatInapAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.tindakan_ranap) {
    return NextResponse.json({ success: false, error: "Akses tindakan rawat inap tidak diizinkan." }, { status: 403 });
  }
  return null;
}

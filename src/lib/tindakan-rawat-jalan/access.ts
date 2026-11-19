import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function tindakanRawatJalanAccess(permission = "tindakan_ralan") {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions[permission]) {
    return NextResponse.json({ success: false, error: "Akses tindakan rawat jalan tidak diizinkan." }, { status: 403 });
  }
  return null;
}

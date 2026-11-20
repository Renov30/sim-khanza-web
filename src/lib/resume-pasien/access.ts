import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function resumePasienAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.data_resume_pasien) {
    return NextResponse.json({ success: false, error: "Akses data resume pasien tidak diizinkan." }, { status: 403 });
  }
  return null;
}

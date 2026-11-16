import { NextResponse } from "next/server";
import { getSession } from "../auth";

/** Kasir ralan dipakai bersama registrasi dan tindakan; cukup salah satu izin modul. */
export async function rawatJalanAccess() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  const allowed = session.isAdmin
    || session.permissions.kasir_ralan
    || session.permissions.registrasi
    || session.permissions.tindakan_ralan;
  if (!allowed) {
    return NextResponse.json({ success: false, error: "Akses rawat jalan tidak diizinkan." }, { status: 403 });
  }
  return null;
}

import { NextResponse } from "next/server";
import { getSession } from "../auth";

export async function igdAccess() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  if (!session.isAdmin && !session.permissions.igd) {
    return NextResponse.json({ success: false, error: "Akses IGD tidak diizinkan." }, { status: 403 });
  }
  return null;
}

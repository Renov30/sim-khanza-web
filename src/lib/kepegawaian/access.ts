import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

async function masterAccess(izin: "petugas" | "dokter" | "pegawai_admin", pesan: string) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions[izin]) {
    return NextResponse.json({ success: false, error: pesan }, { status: 403 });
  }
  return null;
}

export function pegawaiAccess() {
  return masterAccess("pegawai_admin", "Akses data pegawai tidak diizinkan.");
}

export function petugasAccess() {
  return masterAccess("petugas", "Akses data petugas tidak diizinkan.");
}

export function dokterAccess() {
  return masterAccess("dokter", "Akses data dokter tidak diizinkan.");
}

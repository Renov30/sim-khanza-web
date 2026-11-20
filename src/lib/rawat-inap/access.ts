import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

type KunciIzin = "kamar_inap" | "pasien_meninggal" | "rujukan_keluar";

const PESAN: Record<KunciIzin, string> = {
  kamar_inap: "Akses data kamar inap tidak diizinkan.",
  pasien_meninggal: "Akses data pasien meninggal tidak diizinkan.",
  rujukan_keluar: "Akses rujukan keluar tidak diizinkan.",
};

export async function izinRawatInap(kunci: KunciIzin) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions[kunci]) {
    return NextResponse.json({ success: false, error: PESAN[kunci] }, { status: 403 });
  }
  return null;
}

export function kamarInapAccess() {
  return izinRawatInap("kamar_inap");
}

export function pasienMatiAccess() {
  return izinRawatInap("pasien_meninggal");
}

export function rujukKeluarAccess() {
  return izinRawatInap("rujukan_keluar");
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import type { JenisTarif } from "@/lib/tarif-perawatan/konfigurasi";

function buatAkses(izin: "tarif_ralan" | "tarif_ranap", label: string) {
  return async function aksesTarif() {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Silakan login kembali." }, { status: 401 });
    }
    if (!session.isAdmin && !session.permissions[izin]) {
      return NextResponse.json(
        { success: false, error: `Akses ${label} tidak diizinkan.` },
        { status: 403 },
      );
    }
    return null;
  };
}

export const tarifRalanAccess = buatAkses("tarif_ralan", "tarif rawat jalan");
export const tarifRanapAccess = buatAkses("tarif_ranap", "tarif rawat inap");

export function aksesTarif(jenis: JenisTarif) {
  return jenis === "ralan" ? tarifRalanAccess : tarifRanapAccess;
}

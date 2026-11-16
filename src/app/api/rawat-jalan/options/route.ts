import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { rawatJalanAccess } from "@/lib/rawat-jalan/access";

/** Opsi filter kasir ralan; dipisah agar pengguna kasir tidak bergantung izin registrasi. */
export async function GET() {
  try {
    const denied = await rawatJalanAccess();
    if (denied) return denied;

    const [dokter, poli, penjab] = await Promise.all([
      executeQuery<Record<string, unknown>>("SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC"),
      executeQuery<Record<string, unknown>>("SELECT kd_poli, nm_poli FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC"),
      executeQuery<Record<string, unknown>>("SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC"),
    ]);

    return NextResponse.json({ success: true, data: { dokter, poli, penjab } }, {
      headers: { "Cache-Control": "private, max-age=300" },
    });
  } catch (error: unknown) {
    console.error("Error in api/rawat-jalan/options:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat opsi rawat jalan" }, { status: 500 });
  }
}

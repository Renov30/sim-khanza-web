import { NextResponse } from "next/server";
import { checkDatabaseConnection, executeQuery } from "@/lib/db";
import { HospitalSetting } from "@/lib/types/auth";

export async function GET() {
  try {
    const dbStatus = await checkDatabaseConnection();

    let setting: HospitalSetting = {
      nama_instansi: "SIMRS KHANZA",
      alamat_instansi: "Alamat belum dikonfigurasi",
      kabupaten: "-",
      propinsi: "-",
      kontak: "-",
      email: "-",
    };

    if (dbStatus.connected) {
      try {
        const rows = await executeQuery<HospitalSetting>(
          "SELECT nama_instansi, alamat_instansi, kabupaten, propinsi, kontak, email FROM setting LIMIT 1"
        );
        if (rows.length > 0) {
          setting = rows[0];
        }
      } catch (e) {
        console.warn("Could not query setting table:", e);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        setting,
        database: dbStatus,
        serverTime: new Date().toISOString(),
        version: "v1.0.0-web",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengambil data sistem";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jenis = searchParams.get("jenis"); // "dokter", "poli", "penjab", "pasien"
    const cari = searchParams.get("cari") || "";

    if (jenis === "dokter") {
      const sql = `
        SELECT kd_dokter, nm_dokter 
        FROM dokter 
        WHERE status = '1' 
        ${cari ? "AND (kd_dokter LIKE ? OR nm_dokter LIKE ?)" : ""}
        ORDER BY nm_dokter ASC LIMIT 50
      `;
      const params = cari ? [`%${cari}%`, `%${cari}%`] : [];
      const data = await executeQuery(sql, params);
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "poli") {
      const sql = `
        SELECT kd_poli, nm_poli, registrasi, registrasilama 
        FROM poliklinik 
        WHERE status = '1'
        ${cari ? "AND (kd_poli LIKE ? OR nm_poli LIKE ?)" : ""}
        ORDER BY nm_poli ASC LIMIT 50
      `;
      const params = cari ? [`%${cari}%`, `%${cari}%`] : [];
      const data = await executeQuery(sql, params);
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "penjab") {
      const sql = `
        SELECT kd_pj, png_jawab 
        FROM penjab 
        WHERE status = '1'
        ${cari ? "AND (kd_pj LIKE ? OR png_jawab LIKE ?)" : ""}
        ORDER BY png_jawab ASC LIMIT 50
      `;
      const params = cari ? [`%${cari}%`, `%${cari}%`] : [];
      const data = await executeQuery(sql, params);
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "pasien") {
      const sql = `
        SELECT no_rkm_medis, nm_pasien, jk, alamat, namakeluarga, keluarga, kd_pj, no_peserta, no_tlp
        FROM pasien 
        ${cari ? "WHERE no_rkm_medis LIKE ? OR nm_pasien LIKE ?" : ""}
        ORDER BY no_rkm_medis DESC LIMIT 50
      `;
      const params = cari ? [`%${cari}%`, `%${cari}%`] : [];
      const data = await executeQuery(sql, params);
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "next-rm" || jenis === "next_rm") {
      const rows = await executeQuery<any>(
        "SELECT IFNULL(MAX(CAST(no_rkm_medis AS UNSIGNED)), 0) + 1 AS next_rm FROM pasien"
      );
      const nextNum = (rows as any[])[0]?.next_rm || 1;
      const nextRm = String(nextNum).padStart(6, "0");
      return NextResponse.json({ success: true, data: { next_rm: nextRm } });
    }

    // Default: kembalikan opsi ringkas dokter & poli & penjab untuk dropdown langsung
    const [dokter, poli, penjab] = await Promise.all([
      executeQuery<any[]>("SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC"),
      executeQuery<any[]>("SELECT kd_poli, nm_poli, registrasi, registrasilama FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC"),
      executeQuery<any[]>("SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC"),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        dokter,
        poli,
        penjab,
      },
    });
  } catch (error: any) {
    console.error("Error in api/registrasi/options:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memuat opsi registrasi" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { registrationAccess } from "@/lib/registrasi/access";
import { executeQuery } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const denied = await registrationAccess();
    if (denied) return denied;
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
      const rm = searchParams.get("rm")?.trim();
      const sql = `
        SELECT pasien.no_rkm_medis, pasien.nm_pasien, pasien.jk, pasien.alamat, pasien.namakeluarga, pasien.keluarga,
          pasien.kd_pj, penjab.png_jawab, pasien.no_peserta, pasien.no_tlp, DATE_FORMAT(pasien.tgl_daftar, '%Y-%m-%d') AS tgl_daftar
        FROM pasien
        LEFT JOIN penjab ON penjab.kd_pj = pasien.kd_pj
        ${rm ? "WHERE pasien.no_rkm_medis = ?" : cari ? "WHERE pasien.no_rkm_medis LIKE ? OR pasien.nm_pasien LIKE ? OR pasien.no_ktp LIKE ? OR pasien.alamat LIKE ?" : ""}
        ORDER BY pasien.no_rkm_medis DESC LIMIT 50
      `;
      const params = rm ? [rm] : cari ? Array(4).fill(`%${cari}%`) : [];
      const data = await executeQuery(sql, params);
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "next-rm" || jenis === "next_rm") {
      const rows = await executeQuery<{ next_rm: number }>(
        "SELECT IFNULL(MAX(CAST(no_rkm_medis AS UNSIGNED)), 0) + 1 AS next_rm FROM pasien"
      );
      const nextNum = rows[0]?.next_rm || 1;
      const nextRm = String(nextNum).padStart(6, "0");
      return NextResponse.json({ success: true, data: { next_rm: nextRm } });
    }

    // Default: kembalikan opsi ringkas dokter & poli & penjab untuk dropdown langsung
    const [dokter, poli, penjab] = await Promise.all([
      executeQuery<Record<string, unknown>>("SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC"),
      executeQuery<Record<string, unknown>>("SELECT kd_poli, nm_poli, registrasi, registrasilama FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC"),
      executeQuery<Record<string, unknown>>("SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC"),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        dokter,
        poli,
        penjab,
      },
    });
  } catch (error: unknown) {
    console.error("Error in api/registrasi/options:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat opsi registrasi" },
      { status: 500 }
    );
  }
}


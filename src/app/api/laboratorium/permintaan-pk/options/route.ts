import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

interface OpsiRow {
  kode: string;
  label: string | null;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Sesi tidak valid.", code: "UNAUTHORIZED" }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.permintaan_lab) {
    return NextResponse.json({ success: false, error: "Tidak memiliki izin Permintaan Lab PK.", code: "FORBIDDEN" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const cari = searchParams.get("cari")?.trim() || "";
  if (cari.length > 100) {
    return NextResponse.json({ success: false, error: "Pencarian terlalu panjang.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }

  const like = `%${cari}%`;
  const batas = 500;

  try {
    const [dokter, poli, ruang] = await Promise.all([
      executeQuery<OpsiRow>(`
        SELECT kd_dokter AS kode, nm_dokter AS label FROM dokter
        WHERE ? = '' OR kd_dokter LIKE ? OR nm_dokter LIKE ?
        ORDER BY nm_dokter, kd_dokter LIMIT ${batas}`, [cari, like, like]),
      executeQuery<OpsiRow>(`
        SELECT kd_poli AS kode, nm_poli AS label FROM poliklinik
        WHERE ? = '' OR kd_poli LIKE ? OR nm_poli LIKE ?
        ORDER BY nm_poli, kd_poli LIMIT ${batas}`, [cari, like, like]),
      executeQuery<OpsiRow>(`
        SELECT kd_bangsal AS kode, nm_bangsal AS label FROM bangsal
        WHERE ? = '' OR kd_bangsal LIKE ? OR nm_bangsal LIKE ?
        ORDER BY nm_bangsal, kd_bangsal LIMIT ${batas}`, [cari, like, like]),
    ]);

    const bentuk = (rows: OpsiRow[]) => rows.map((row) => ({
      value: String(row.kode ?? ""),
      label: `${row.kode ?? ""} ${row.label ?? ""}`.trim(),
    }));

    return NextResponse.json({
      success: true,
      data: { dokter: bentuk(dokter), poli: bentuk(poli), ruang: bentuk(ruang) },
    });
  } catch (error: unknown) {
    console.error("Error in api/laboratorium/permintaan-pk/options:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan filter permintaan lab PK." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { igdAccess } from "@/lib/igd/access";
import { POLI_IGD } from "@/lib/igd/constants";

const JENIS = ["semua", "dokter", "poli", "penjab", "pasien"] as const;

type Jenis = (typeof JENIS)[number];

export async function GET(req: NextRequest) {
  const denied = await igdAccess();
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const jenis = (searchParams.get("jenis") || "semua") as Jenis;
    const cari = (searchParams.get("cari") || "").trim();
    const rm = (searchParams.get("rm") || "").trim();
    const offsetParameter = searchParams.get("offset");
    const offset = offsetParameter === null ? 0 : Number(offsetParameter);
    if (!JENIS.includes(jenis) || cari.length > 100 || rm.length > 15 || !Number.isInteger(offset) || offset < 0 || offset > 1_000_000) {
      return NextResponse.json({ success: false, error: "Filter opsi IGD tidak valid." }, { status: 400 });
    }

    if (jenis === "dokter") {
      const data = await executeQuery(
        `SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1'
         ${cari ? "AND (kd_dokter LIKE ? OR nm_dokter LIKE ?)" : ""}
         ORDER BY nm_dokter ASC LIMIT 50`,
        cari ? [`%${cari}%`, `%${cari}%`] : [],
      );
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "penjab") {
      const data = await executeQuery(
        `SELECT kd_pj, png_jawab FROM penjab WHERE status = '1'
         ${cari ? "AND (kd_pj LIKE ? OR png_jawab LIKE ?)" : ""}
         ORDER BY png_jawab ASC LIMIT 50`,
        cari ? [`%${cari}%`, `%${cari}%`] : [],
      );
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "poli") {
      const data = await executeQuery(
        "SELECT kd_poli, nm_poli, registrasi, registrasilama FROM poliklinik WHERE kd_poli = ? LIMIT 1",
        [POLI_IGD],
      );
      return NextResponse.json({ success: true, data: data.length ? data : [{ kd_poli: POLI_IGD, nm_poli: "IGD", registrasi: 0, registrasilama: 0 }] });
    }

    const limitPasien = 50;
    const pasienSql = `SELECT pasien.no_rkm_medis, pasien.nm_pasien, pasien.jk, pasien.alamat, pasien.namakeluarga, pasien.keluarga,
             pasien.kd_pj, penjab.png_jawab, pasien.no_peserta, pasien.no_tlp,
             DATE_FORMAT(pasien.tgl_daftar, '%Y-%m-%d') AS tgl_daftar
      FROM pasien
      LEFT JOIN penjab ON penjab.kd_pj = pasien.kd_pj
      ${rm ? "WHERE pasien.no_rkm_medis = ?" : cari ? "WHERE pasien.no_rkm_medis LIKE ? OR pasien.nm_pasien LIKE ? OR pasien.no_ktp LIKE ? OR pasien.alamat LIKE ?" : ""}
      ORDER BY pasien.no_rkm_medis DESC LIMIT ? OFFSET ?`;
    const pasienParams = rm ? [rm] : cari ? Array(4).fill(`%${cari}%`) : [];

    if (jenis === "pasien") {
      const jumlahAmbil = rm ? 1 : limitPasien + 1;
      const data = await executeQuery<Record<string, unknown>>(pasienSql, [...pasienParams, jumlahAmbil, rm ? 0 : offset]);
      const hasMore = !rm && data.length > limitPasien;
      return NextResponse.json({
        success: true,
        data: data.slice(0, limitPasien),
        meta: { hasMore, offset: rm ? 0 : offset, limit: limitPasien },
      }, { headers: { "Cache-Control": "private, max-age=300" } });
    }

    const [dokter, poli, penjab, pasien] = await Promise.all([
      executeQuery("SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC LIMIT 50"),
      executeQuery("SELECT kd_poli, nm_poli, registrasi, registrasilama FROM poliklinik WHERE kd_poli = ? LIMIT 1", [POLI_IGD]),
      executeQuery("SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC LIMIT 50"),
      executeQuery(pasienSql, [...pasienParams, limitPasien, 0]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        dokter,
        poli: poli.length ? poli : [{ kd_poli: POLI_IGD, nm_poli: "IGD", registrasi: 0, registrasilama: 0 }],
        penjab,
        pasien,
      },
    }, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (error: unknown) {
    console.error("Gagal memuat opsi IGD:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat opsi IGD." }, { status: 500 });
  }
}

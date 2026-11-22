import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { validasiObatAccess } from "@/lib/farmasi/access";

interface HeaderNoResep {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: "ralan" | "ranap";
  jenis_bayar: string;
  tgl_resep: string;
  jam_resep: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
}

interface ObatNoResep {
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  harga: number | string;
  embalase: number | string;
  tuslah: number | string;
  total: number | string;
  aturan_pakai: string;
}

interface RacikanNoResep {
  no_racik: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
}

interface BahanRacikanNoResep extends ObatNoResep {
  no_racik: string;
}

export async function GET(req: NextRequest) {
  const denied = await validasiObatAccess();
  if (denied) return denied;

  const noResep = (new URL(req.url).searchParams.get("no_resep") || "").trim();
  if (!/^[A-Za-z0-9_-]{1,14}$/.test(noResep)) {
    return NextResponse.json({ success: false, error: "Nomor resep tidak valid." }, { status: 400 });
  }

  try {
    const headers = await executeQuery<HeaderNoResep>(`
      SELECT ro.no_resep, ro.no_rawat, r.no_rkm_medis, p.nm_pasien,
             ro.kd_dokter, d.nm_dokter, ro.status AS jenis, pj.png_jawab AS jenis_bayar,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN DATE_FORMAT(ro.tgl_peresepan, '%Y-%m-%d')
                  ELSE DATE_FORMAT(ro.tgl_perawatan, '%Y-%m-%d') END AS tgl_resep,
             CASE WHEN ro.jam IS NULL OR CAST(ro.jam AS CHAR) = '00:00:00'
                  THEN TIME_FORMAT(ro.jam_peresepan, '%H:%i:%s')
                  ELSE TIME_FORMAT(ro.jam, '%H:%i:%s') END AS jam_resep,
             CASE WHEN ro.tgl_perawatan IS NULL OR CAST(ro.tgl_perawatan AS CHAR) = '0000-00-00'
                  THEN 'Belum Terlayani' ELSE 'Sudah Terlayani' END AS status_pelayanan
      FROM resep_obat ro
      INNER JOIN reg_periksa r ON r.no_rawat = ro.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN dokter d ON d.kd_dokter = ro.kd_dokter
      INNER JOIN penjab pj ON pj.kd_pj = r.kd_pj
      WHERE ro.no_resep = ?
      LIMIT 1
    `, [noResep]);
    const header = headers[0];
    if (!header) {
      return NextResponse.json({ success: false, error: "Nomor resep tidak ditemukan." }, { status: 404 });
    }

    const [obat, racikan, bahan] = await Promise.all([
      executeQuery<ObatNoResep>(`
        SELECT dpo.kode_brng AS kode_item, db.nama_brng AS nama_item,
               SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
               MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
               SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total,
               COALESCE(MAX(ap.aturan), '') AS aturan_pakai
        FROM detail_pemberian_obat dpo
        INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
        LEFT JOIN detail_obat_racikan dor ON dor.tgl_perawatan = dpo.tgl_perawatan
          AND dor.jam = dpo.jam AND dor.no_rawat = dpo.no_rawat AND dor.kode_brng = dpo.kode_brng
        LEFT JOIN aturan_pakai ap ON ap.tgl_perawatan = dpo.tgl_perawatan
          AND ap.jam = dpo.jam AND ap.no_rawat = dpo.no_rawat AND ap.kode_brng = dpo.kode_brng
        WHERE dpo.no_rawat = ? AND dpo.tgl_perawatan = ? AND dpo.jam = ? AND dor.kode_brng IS NULL
        GROUP BY dpo.kode_brng, db.nama_brng, db.kode_sat
        ORDER BY db.nama_brng
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
      executeQuery<RacikanNoResep>(`
        SELECT CAST(ob.no_racik AS CHAR) AS no_racik, ob.nama_racik AS nama_item,
               ob.jml_dr AS jumlah, mr.nm_racik AS satuan,
               ob.aturan_pakai, ob.keterangan
        FROM obat_racikan ob
        INNER JOIN metode_racik mr ON mr.kd_racik = ob.kd_racik
        WHERE ob.no_rawat = ? AND ob.tgl_perawatan = ? AND ob.jam = ?
        ORDER BY ob.no_racik
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
      executeQuery<BahanRacikanNoResep>(`
        SELECT CAST(dor.no_racik AS CHAR) AS no_racik, dpo.kode_brng AS kode_item,
               db.nama_brng AS nama_item, SUM(dpo.jml) AS jumlah, db.kode_sat AS satuan,
               MAX(dpo.biaya_obat) AS harga, SUM(dpo.embalase) AS embalase,
               SUM(dpo.tuslah) AS tuslah, SUM(dpo.total) AS total, '' AS aturan_pakai
        FROM detail_obat_racikan dor
        INNER JOIN detail_pemberian_obat dpo ON dpo.tgl_perawatan = dor.tgl_perawatan
          AND dpo.jam = dor.jam AND dpo.no_rawat = dor.no_rawat AND dpo.kode_brng = dor.kode_brng
        INNER JOIN databarang db ON db.kode_brng = dpo.kode_brng
        WHERE dor.no_rawat = ? AND dor.tgl_perawatan = ? AND dor.jam = ?
        GROUP BY dor.no_racik, dpo.kode_brng, db.nama_brng, db.kode_sat
        ORDER BY dor.no_racik, db.nama_brng
      `, [header.no_rawat, header.tgl_resep, header.jam_resep]),
    ]);

    const detail = [
      ...obat.map((item) => ({ ...item, jenis_item: "Obat" as const, no_racik: "", keterangan: "" })),
      ...racikan.flatMap((item) => [
        {
          ...item,
          jenis_item: "Racikan" as const,
          kode_item: `Racikan ${item.no_racik}`,
          harga: 0,
          embalase: 0,
          tuslah: 0,
          total: bahan.filter((baris) => baris.no_racik === item.no_racik)
            .reduce((jumlah, baris) => jumlah + Number(baris.total || 0), 0),
        },
        ...bahan.filter((baris) => baris.no_racik === item.no_racik)
          .map((baris) => ({ ...baris, jenis_item: "Bahan Racikan" as const, keterangan: "" })),
      ]),
    ];

    return NextResponse.json({ success: true, data: { header, detail } });
  } catch (error) {
    console.error("Error in api/farmasi/no-resep:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat data nomor resep." }, { status: 500 });
  }
}

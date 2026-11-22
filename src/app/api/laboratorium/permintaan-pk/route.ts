import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";

const STATUS = new Set(["Semua", "ralan", "ranap"]);
const MODE = new Set(["data", "item"]);
const STATUS_RANAP = new Set(["", "Semua", "Belum Pulang"]);

interface PermintaanRow extends Record<string, unknown> {
  noorder: string;
}

const DASAR = `
  FROM permintaan_lab pl
  INNER JOIN reg_periksa r ON r.no_rawat = pl.no_rawat
  INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
  INNER JOIN dokter d ON pl.dokter_perujuk = d.kd_dokter
  LEFT JOIN poliklinik poli ON poli.kd_poli = r.kd_poli
  LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
  LEFT JOIN (
    SELECT ki.no_rawat, ki.kd_kamar
    FROM kamar_inap ki
    INNER JOIN (
      SELECT no_rawat, MAX(CONCAT(tgl_masuk, ' ', jam_masuk)) AS max_masuk
      FROM kamar_inap
      GROUP BY no_rawat
    ) latest ON latest.no_rawat = ki.no_rawat
      AND CONCAT(ki.tgl_masuk, ' ', ki.jam_masuk) = latest.max_masuk
  ) ki_last ON ki_last.no_rawat = pl.no_rawat
  LEFT JOIN kamar kamar ON kamar.kd_kamar = ki_last.kd_kamar
  LEFT JOIN bangsal bangsal ON bangsal.kd_bangsal = kamar.kd_bangsal
`;

const KOLOM_UTAMA = `
  pl.noorder, pl.no_rawat, pl.status,
  DATE_FORMAT(pl.tgl_permintaan, '%Y-%m-%d') AS tgl_permintaan,
  IF(pl.jam_permintaan = '00:00:00', '', pl.jam_permintaan) AS jam_permintaan,
  IFNULL(DATE_FORMAT(CASE WHEN CAST(pl.tgl_sampel AS CHAR) = '0000-00-00' THEN NULL ELSE pl.tgl_sampel END, '%Y-%m-%d'), '') AS tgl_sampel,
  IF(pl.jam_sampel = '00:00:00', '', pl.jam_sampel) AS jam_sampel,
  IFNULL(DATE_FORMAT(CASE WHEN CAST(pl.tgl_hasil AS CHAR) = '0000-00-00' THEN NULL ELSE pl.tgl_hasil END, '%Y-%m-%d'), '') AS tgl_hasil,
  IF(pl.jam_hasil = '00:00:00', '', pl.jam_hasil) AS jam_hasil,
  r.no_rkm_medis, p.nm_pasien, pl.dokter_perujuk, d.nm_dokter,
  CASE WHEN pl.status = 'ralan' THEN COALESCE(poli.nm_poli, '')
       ELSE COALESCE(bangsal.nm_bangsal, 'Ranap Gabung') END AS ruang,
  pl.informasi_tambahan, pl.diagnosa_klinis,
  COALESCE(pj.png_jawab, '') AS png_jawab
`;

const KOLOM_ITEM = `
  ppl.kd_jenis_prw, j.nm_perawatan, t.id_template, t.\`Pemeriksaan\` AS pemeriksaan,
  t.satuan, t.nilai_rujukan_ld, t.nilai_rujukan_la,
  t.nilai_rujukan_pd, t.nilai_rujukan_pa
`;

const GABUNG_ITEM = `
  INNER JOIN permintaan_pemeriksaan_lab ppl ON ppl.noorder = pl.noorder
  INNER JOIN jns_perawatan_lab j ON j.kd_jenis_prw = ppl.kd_jenis_prw
  INNER JOIN permintaan_detail_permintaan_lab pdpl ON pdpl.noorder = pl.noorder
    AND pdpl.kd_jenis_prw = ppl.kd_jenis_prw
  INNER JOIN template_laboratorium t ON t.id_template = pdpl.id_template
`;

function filterSql(
  params: (string | number)[],
  opsi: {
    tanggalMulai: string;
    tanggalSelesai: string;
    cari: string;
    statusRawat: string;
    dokter: string;
    poli: string;
    ruang: string;
    statusRanap: string;
  },
) {
  let sql = "";
  if (opsi.tanggalMulai) { sql += " AND pl.tgl_permintaan >= ?"; params.push(opsi.tanggalMulai); }
  if (opsi.tanggalSelesai) { sql += " AND pl.tgl_permintaan <= ?"; params.push(opsi.tanggalSelesai); }
  if (opsi.statusRawat !== "Semua") { sql += " AND pl.status = ?"; params.push(opsi.statusRawat); }
  if (opsi.dokter) { sql += " AND pl.dokter_perujuk = ?"; params.push(opsi.dokter); }
  if (opsi.poli) { sql += " AND r.kd_poli = ?"; params.push(opsi.poli); }
  if (opsi.ruang) { sql += " AND kamar.kd_bangsal = ?"; params.push(opsi.ruang); }
  if (opsi.statusRanap === "Belum Pulang") {
    sql += " AND EXISTS (SELECT 1 FROM kamar_inap ki WHERE ki.no_rawat = pl.no_rawat AND ki.stts_pulang = '-')";
  }
  if (opsi.cari) {
    sql += ` AND (pl.noorder LIKE ? OR pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ?
      OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ? OR pl.diagnosa_klinis LIKE ? OR pj.png_jawab LIKE ?)`;
    const kata = `%${opsi.cari}%`;
    params.push(kata, kata, kata, kata, kata, kata, kata);
  }
  return sql;
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
  const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
  const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
  const cari = searchParams.get("cari")?.trim() || "";
  const statusRawat = searchParams.get("status")?.trim() || "Semua";
  const mode = searchParams.get("mode")?.trim() || "data";
  const dokter = searchParams.get("dokter")?.trim() || "";
  const poli = searchParams.get("poli")?.trim() || "";
  const ruang = searchParams.get("ruang")?.trim() || "";
  const statusRanap = searchParams.get("status_ranap")?.trim() || "";
  const parsedLimit = Number(searchParams.get("limit"));
  const limit = Number.isInteger(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 200;

  if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))) {
    return NextResponse.json({ success: false, error: "Format periode tidak valid.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai) {
    return NextResponse.json({ success: false, error: "Tanggal mulai tidak boleh melebihi tanggal selesai.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (!STATUS.has(statusRawat) || !MODE.has(mode) || !STATUS_RANAP.has(statusRanap)) {
    return NextResponse.json({ success: false, error: "Filter tidak dikenal.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }
  if (cari.length > 100 || dokter.length > 20 || poli.length > 10 || ruang.length > 20) {
    return NextResponse.json({ success: false, error: "Filter terlalu panjang.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }

  const opsi = { tanggalMulai, tanggalSelesai, cari, statusRawat, dokter, poli, ruang, statusRanap };
  const params: (string | number)[] = [];
  const sql = `SELECT ${KOLOM_UTAMA}${mode === "item" ? `, ${KOLOM_ITEM}` : ""}
    ${DASAR}${mode === "item" ? GABUNG_ITEM : ""}
    WHERE 1 = 1${filterSql(params, opsi)}
    ORDER BY pl.tgl_permintaan DESC, pl.jam_permintaan DESC, pl.noorder DESC${mode === "item" ? ", t.urut" : ""}
    LIMIT ?`;
  params.push(limit);

  try {
    const rows = await executeQuery<PermintaanRow>(sql, params);

    if (mode === "item" || rows.length === 0) {
      return NextResponse.json({ success: true, data: rows, total: rows.length });
    }

    const daftarOrder = rows.map((row) => row.noorder);
    const tempat = daftarOrder.map(() => "?").join(", ");
    const itemRows = await executeQuery<Record<string, unknown>>(
      `SELECT pdpl.noorder, pdpl.kd_jenis_prw, j.nm_perawatan, t.id_template,
         t.\`Pemeriksaan\` AS pemeriksaan, t.satuan,
         t.nilai_rujukan_ld, t.nilai_rujukan_la, t.nilai_rujukan_pd, t.nilai_rujukan_pa
       FROM permintaan_detail_permintaan_lab pdpl
       INNER JOIN jns_perawatan_lab j ON j.kd_jenis_prw = pdpl.kd_jenis_prw
       INNER JOIN template_laboratorium t ON t.id_template = pdpl.id_template
       WHERE pdpl.noorder IN (${tempat})
       ORDER BY pdpl.noorder, j.kd_jenis_prw, t.urut`,
      daftarOrder,
    );

    const dikelompokkan = new Map<string, Record<string, unknown>[]>();
    for (const item of itemRows) {
      const noorder = String(item.noorder ?? "");
      const daftar = dikelompokkan.get(noorder) || [];
      daftar.push(item);
      dikelompokkan.set(noorder, daftar);
    }

    const data = rows.map((row) => ({ ...row, item: dikelompokkan.get(row.noorder) || [] }));
    return NextResponse.json({ success: true, data, total: data.length });
  } catch (error: unknown) {
    console.error("Error in api/laboratorium/permintaan-pk:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data permintaan lab PK." },
      { status: 500 },
    );
  }
}

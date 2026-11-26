import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { executeQuery } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";

const STATUS_RAWAT = new Set(["Ralan", "Ranap"]);
const MODE_TAMPIL = new Set(["data", "detail"]);
const BATAS_KATA_KUNCI = 100;
const BATAS_NO_RAWAT = 17;
const BATAS_KODE = 20;

type ModeTampil = "data" | "detail";

type HasilPA = {
  kunci: string;
  kunciKunjungan: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  status: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  ruang: string;
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  nm_perawatan: string;
  kd_jenis_prw: string;
  biaya: string;
  diagnosa_klinik: string;
  makroskopik: string;
  mikroskopik: string;
  kesimpulan: string;
  kesan: string;
};

type DetailPasien = {
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  kunjungan: {
    kunci: string;
    no_rawat: string;
    tgl_periksa: string;
    jam: string;
    ruang: string;
    nm_petugas: string;
    dokter_perujuk: string;
    penanggung_jawab: string;
    item: HasilPA[];
  }[];
};

function teks(nilai: unknown): string {
  return nilai === null || nilai === undefined ? "" : String(nilai);
}

function kunciKunjungan(baris: Record<string, unknown>) {
  return `${teks(baris.no_rawat)}|${teks(baris.tgl_periksa)}|${teks(baris.jam)}`;
}

function jadikanHasil(baris: Record<string, unknown>): HasilPA {
  return {
    kunci: `${kunciKunjungan(baris)}|${teks(baris.kd_jenis_prw)}`,
    kunciKunjungan: kunciKunjungan(baris),
    no_rawat: teks(baris.no_rawat),
    tgl_periksa: teks(baris.tgl_periksa),
    jam: teks(baris.jam),
    status: teks(baris.status),
    no_rkm_medis: teks(baris.no_rkm_medis),
    nm_pasien: teks(baris.nm_pasien),
    jk: teks(baris.jk),
    umur: teks(baris.umur),
    sttsumur: teks(baris.sttsumur),
    png_jawab: teks(baris.png_jawab),
    ruang: teks(baris.ruang),
    nm_petugas: teks(baris.nm_petugas),
    dokter_perujuk: teks(baris.dokter_perujuk),
    penanggung_jawab: teks(baris.penanggung_jawab),
    nm_perawatan: teks(baris.nm_perawatan),
    kd_jenis_prw: teks(baris.kd_jenis_prw),
    biaya: teks(baris.biaya),
    diagnosa_klinik: teks(baris.diagnosa_klinik),
    makroskopik: teks(baris.makroskopik),
    mikroskopik: teks(baris.mikroskopik),
    kesimpulan: teks(baris.kesimpulan),
    kesan: teks(baris.kesan),
  };
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Sesi tidak valid.", code: "UNAUTHORIZED" }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.pemeriksaan_lab_pa) {
    return NextResponse.json({ success: false, error: "Tidak memiliki izin Periksa Lab PA.", code: "FORBIDDEN" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const tanggalMulai = searchParams.get("tanggal_mulai")?.trim() || "";
  const tanggalSelesai = searchParams.get("tanggal_selesai")?.trim() || "";
  const kataKunci = searchParams.get("cari")?.trim() || "";
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const noRm = searchParams.get("no_rm")?.trim() || "";
  const nip = searchParams.get("nip")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const modeParam = searchParams.get("mode")?.trim() || "data";
  const parsedLimit = Number(searchParams.get("limit"));
  const limit = Number.isInteger(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 200;

  if (!MODE_TAMPIL.has(modeParam)) {
    return NextResponse.json({ success: false, error: "Mode tampilan tidak valid.", code: "MODE_TIDAK_VALID" }, { status: 400 });
  }
  const mode = modeParam as ModeTampil;
  if ((tanggalMulai && !isRegistrationDate(tanggalMulai)) || (tanggalSelesai && !isRegistrationDate(tanggalSelesai))) {
    return NextResponse.json({ success: false, error: "Format periode tidak valid.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (tanggalMulai && tanggalSelesai && tanggalMulai > tanggalSelesai) {
    return NextResponse.json({ success: false, error: "Tanggal mulai tidak boleh melebihi tanggal selesai.", code: "PERIODE_TIDAK_VALID" }, { status: 400 });
  }
  if (
    kataKunci.length > BATAS_KATA_KUNCI ||
    noRawat.length > BATAS_NO_RAWAT ||
    noRm.length > BATAS_KODE ||
    nip.length > BATAS_KODE ||
    (status && !STATUS_RAWAT.has(status))
  ) {
    return NextResponse.json({ success: false, error: "Parameter filter tidak valid.", code: "FILTER_TIDAK_VALID" }, { status: 400 });
  }

  try {
    let sql = `
      SELECT pl.no_rawat,
             DATE_FORMAT(pl.tgl_periksa, '%Y-%m-%d') AS tgl_periksa,
             pl.jam, pl.status,
             r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur, pj.png_jawab,
             COALESCE(poli.nm_poli, '') AS ruang,
             COALESCE(petugas.nip, '') AS nip,
             COALESCE(petugas.nama, '') AS nm_petugas,
             COALESCE(dokter_rujuk.nm_dokter, '') AS dokter_perujuk,
             COALESCE(dokter_pj.nm_dokter, '') AS penanggung_jawab,
             j.kd_jenis_prw, j.nm_perawatan, pl.biaya,
             dpa.diagnosa_klinik, dpa.makroskopik, dpa.mikroskopik, dpa.kesimpulan, dpa.kesan
      FROM periksa_lab pl
      INNER JOIN reg_periksa r ON r.no_rawat = pl.no_rawat
      INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
      INNER JOIN jns_perawatan_lab j ON j.kd_jenis_prw = pl.kd_jenis_prw
      INNER JOIN detail_periksa_labpa dpa ON dpa.no_rawat = pl.no_rawat
        AND dpa.kd_jenis_prw = pl.kd_jenis_prw
        AND dpa.tgl_periksa = pl.tgl_periksa AND dpa.jam = pl.jam
      LEFT JOIN petugas ON petugas.nip = pl.nip
      LEFT JOIN dokter dokter_pj ON dokter_pj.kd_dokter = pl.kd_dokter
      LEFT JOIN dokter dokter_rujuk ON dokter_rujuk.kd_dokter = pl.dokter_perujuk
      LEFT JOIN penjab pj ON pj.kd_pj = r.kd_pj
      LEFT JOIN poliklinik poli ON poli.kd_poli = r.kd_poli
      WHERE pl.kategori = 'PA'
    `;
    const params: (string | number)[] = [];

    if (tanggalMulai) { sql += " AND pl.tgl_periksa >= ?"; params.push(tanggalMulai); }
    if (tanggalSelesai) { sql += " AND pl.tgl_periksa <= ?"; params.push(tanggalSelesai); }
    if (noRawat) { sql += " AND pl.no_rawat = ?"; params.push(noRawat); }
    if (noRm) { sql += " AND r.no_rkm_medis = ?"; params.push(noRm); }
    if (nip) { sql += " AND petugas.nip = ?"; params.push(nip); }
    if (status) { sql += " AND pl.status = ?"; params.push(status); }
    if (kataKunci) {
      const pencarian = `%${kataKunci}%`;
      sql += ` AND (pl.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ? OR petugas.nama LIKE ? OR j.nm_perawatan LIKE ? OR dpa.diagnosa_klinik LIKE ? OR dpa.kesimpulan LIKE ? OR pj.png_jawab LIKE ?)`;
      params.push(pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian, pencarian);
    }

    sql += " ORDER BY pl.tgl_periksa DESC, pl.jam DESC, pl.no_rawat DESC, j.kd_jenis_prw LIMIT ?";
    params.push(limit);
    const barisData = await executeQuery<Record<string, unknown>>(sql, params);
    const hasil = barisData.map(jadikanHasil);

    if (mode === "data") {
      return NextResponse.json({ success: true, data: hasil });
    }

    const petaPasien = new Map<string, DetailPasien>();
    for (const item of hasil) {
      let pasien = petaPasien.get(item.no_rkm_medis);
      if (!pasien) {
        pasien = {
          no_rkm_medis: item.no_rkm_medis,
          nm_pasien: item.nm_pasien,
          jk: item.jk,
          umur: item.umur,
          sttsumur: item.sttsumur,
          png_jawab: item.png_jawab,
          kunjungan: [],
        };
        petaPasien.set(item.no_rkm_medis, pasien);
      }
      let kunjungan = pasien.kunjungan.find((entry) => entry.kunci === item.kunciKunjungan);
      if (!kunjungan) {
        kunjungan = {
          kunci: item.kunciKunjungan,
          no_rawat: item.no_rawat,
          tgl_periksa: item.tgl_periksa,
          jam: item.jam,
          ruang: item.ruang,
          nm_petugas: item.nm_petugas,
          dokter_perujuk: item.dokter_perujuk,
          penanggung_jawab: item.penanggung_jawab,
          item: [],
        };
        pasien.kunjungan.push(kunjungan);
      }
      kunjungan.item.push(item);
    }

    const detail = [...petaPasien.values()];
    const kunjunganSemua = detail.flatMap((pasien) => pasien.kunjungan);
    const ringkasan = {
      jumlah_pasien: detail.length,
      jumlah_kunjungan: kunjunganSemua.length,
      jumlah_pemeriksaan: hasil.length,
      jumlah_sub_pemeriksaan: hasil.length,
    };
    return NextResponse.json({ success: true, data: { pasien: detail, ringkasan } });
  } catch (error: unknown) {
    console.error("Error in api/laboratorium/periksa-pa:", error);
    return NextResponse.json({ success: false, error: "Gagal memuat hasil periksa laboratorium PA." }, { status: 500 });
  }
}

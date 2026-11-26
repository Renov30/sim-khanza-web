import type { PoolConnection, RowDataPacket } from "mysql2/promise";

export const STATUS_RAWAT = new Set(["", "Semua", "ralan", "ranap"]);
export const STATUS_RANAP = new Set(["", "Semua", "Belum Pulang"]);
export const MODE_TAMPIL = new Set(["", "data", "item"]);
export const JENIS_OPSI = new Set(["dokter", "poli", "ruang", "pemeriksaan", "kunjungan"]);

export interface TarifRadiologi {
  cara_bayar: string;
  kelas: string;
}

export interface KunjunganRadiologi {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  kd_pj: string;
  png_jawab: string;
  kd_poli: string;
  nm_poli: string;
  kd_dokter: string;
  nm_dokter: string;
  status: "ralan" | "ranap";
  kelas: string;
  ruang: string;
}

export function teks(value: unknown, maksimum: number) {
  return typeof value === "string" ? value.trim().slice(0, maksimum) : "";
}

export function normalisasiStatus(value: unknown): "ralan" | "ranap" | "" {
  const status = teks(value, 10).toLowerCase();
  if (status === "ralan" || status === "rawat jalan") return "ralan";
  if (status === "ranap" || status === "rawat inap") return "ranap";
  return "";
}

export function jamValid(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value);
}

export function bacaTarif(rows: RowDataPacket[]): TarifRadiologi {
  const baris = rows[0] as { cara_bayar_radiologi?: string; kelas_radiologi?: string } | undefined;
  return {
    cara_bayar: String(baris?.cara_bayar_radiologi ?? "No"),
    kelas: String(baris?.kelas_radiologi ?? "No"),
  };
}

export function syaratPemeriksaan(tarif: TarifRadiologi, kdPj: string, kelas: string) {
  const syarat = ["status = '1'"];
  const params: string[] = [];
  if (tarif.cara_bayar.trim().toUpperCase() === "YES") {
    syarat.push("(kd_pj = ? OR kd_pj = '-')");
    params.push(kdPj);
  }
  if (tarif.kelas.trim().toUpperCase() === "YES") {
    syarat.push("(kelas = ? OR kelas = '-')");
    params.push(kelas);
  }
  return { sql: syarat.join(" AND "), params };
}

export async function ambilKunjungan(connection: PoolConnection, noRawat: string): Promise<KunjunganRadiologi | null> {
  const [baris] = await connection.execute<RowDataPacket[]>(`
    SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar AS umur,
           r.kd_pj, pj.png_jawab, r.kd_poli, pol.nm_poli, r.kd_dokter, d.nm_dokter,
           r.status_lanjut
    FROM reg_periksa r
    INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
    LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
    LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
    LEFT JOIN dokter d ON r.kd_dokter = d.kd_dokter
    WHERE r.no_rawat = ? LIMIT 1
  `, [noRawat]);
  const kunjungan = baris[0] as Record<string, unknown> | undefined;
  if (!kunjungan) return null;

  const status = normalisasiStatus(kunjungan.status_lanjut);
  if (status !== "ranap") {
    return {
      no_rawat: String(kunjungan.no_rawat ?? noRawat),
      no_rkm_medis: String(kunjungan.no_rkm_medis ?? ""),
      nm_pasien: String(kunjungan.nm_pasien ?? ""),
      jk: String(kunjungan.jk ?? ""),
      umur: String(kunjungan.umur ?? ""),
      kd_pj: String(kunjungan.kd_pj ?? ""),
      png_jawab: String(kunjungan.png_jawab ?? ""),
      kd_poli: String(kunjungan.kd_poli ?? ""),
      nm_poli: String(kunjungan.nm_poli ?? ""),
      kd_dokter: String(kunjungan.kd_dokter ?? ""),
      nm_dokter: String(kunjungan.nm_dokter ?? ""),
      status: "ralan",
      kelas: "Rawat Jalan",
      ruang: String(kunjungan.nm_poli ?? ""),
    };
  }

  let noRawatUtama = noRawat;
  const [gabung] = await connection.execute<RowDataPacket[]>(
    "SELECT no_rawat FROM ranap_gabung WHERE no_rawat2 = ? LIMIT 1",
    [noRawat],
  );
  const induk = gabung[0] as { no_rawat?: string } | undefined;
  if (induk?.no_rawat) noRawatUtama = String(induk.no_rawat);

  const urutKamar = "ORDER BY STR_TO_DATE(CONCAT(ki.tgl_masuk, ' ', ki.jam_masuk), '%Y-%m-%d %H:%i:%s') DESC LIMIT 1";
  const [kamarRows] = await connection.execute<RowDataPacket[]>(`
    SELECT k.kd_kamar, b.nm_bangsal, k.kelas
    FROM kamar_inap ki
    INNER JOIN kamar k ON ki.kd_kamar = k.kd_kamar
    LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
    WHERE ki.no_rawat = ?
    ${urutKamar}
  `, [noRawatUtama]);
  const kamar = kamarRows[0] as { kd_kamar?: string; nm_bangsal?: string; kelas?: string } | undefined;

  let kelas = String(kamar?.kelas ?? "-");
  const [kelasRows] = await connection.execute<RowDataPacket[]>(`
    SELECT k.kelas
    FROM kamar_inap ki
    INNER JOIN kamar k ON ki.kd_kamar = k.kd_kamar
    WHERE ki.no_rawat = ? AND ki.stts_pulang = '-'
    ${urutKamar}
  `, [noRawatUtama]);
  const kelasAktif = kelasRows[0] as { kelas?: string } | undefined;
  if (kelasAktif?.kelas) kelas = String(kelasAktif.kelas);

  const ruang = [kamar?.kd_kamar, kamar?.nm_bangsal].filter(Boolean).join(" ") || "Ranap Gabung";
  return {
    no_rawat: String(kunjungan.no_rawat ?? noRawat),
    no_rkm_medis: String(kunjungan.no_rkm_medis ?? ""),
    nm_pasien: String(kunjungan.nm_pasien ?? ""),
    jk: String(kunjungan.jk ?? ""),
    umur: String(kunjungan.umur ?? ""),
    kd_pj: String(kunjungan.kd_pj ?? ""),
    png_jawab: String(kunjungan.png_jawab ?? ""),
    kd_poli: String(kunjungan.kd_poli ?? ""),
    nm_poli: String(kunjungan.nm_poli ?? ""),
    kd_dokter: String(kunjungan.kd_dokter ?? ""),
    nm_dokter: String(kunjungan.nm_dokter ?? ""),
    status: "ranap",
    kelas,
    ruang,
  };
}

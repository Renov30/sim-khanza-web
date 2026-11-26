import type { MenuItem } from "../types/menu";

export const ALL_MODUL_APLIKASI = [
  "registrasi",
  "pasien",
  "rawat-jalan",
  "rawat-inap",
  "igd",
  "laboratorium",
  "radiologi",
  "farmasi",
  "sdm",
  "referensi",
] as const;

export type ModulAplikasi = (typeof ALL_MODUL_APLIKASI)[number];

export interface KonfigurasiModul {
  penyaringanAktif: boolean;
  modulAktif: readonly ModulAplikasi[];
}

const PETA_PREFIX_RUTE: ReadonlyArray<readonly [string, ModulAplikasi]> = [
  ["/registrasi", "registrasi"],
  ["/pasien", "pasien"],
  ["/resume-pasien", "pasien"],
  ["/riwayat-pasien", "pasien"],
  ["/rawat-jalan", "rawat-jalan"],
  ["/tindakan-rawat-jalan", "rawat-jalan"],
  ["/tarif-ralan", "rawat-jalan"],
  ["/rawat-inap", "rawat-inap"],
  ["/tindakan-rawat-inap", "rawat-inap"],
  ["/tarif-ranap", "rawat-inap"],
  ["/igd", "igd"],
  ["/laboratorium", "laboratorium"],
  ["/tarif-lab", "laboratorium"],
  ["/radiologi", "radiologi"],
  ["/farmasi", "farmasi"],
  ["/tarif-farmasi", "farmasi"],
  ["/dokter", "sdm"],
  ["/petugas", "sdm"],
  ["/pegawai", "sdm"],
  ["/kepegawaian", "sdm"],
  ["/poliklinik", "referensi"],
  ["/jadwal-dokter", "referensi"],
];

function cocokPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Mengembalikan modul untuk URL halaman maupun API yang ekuivalen. */
export function tentukanModulDariPath(pathname: string): ModulAplikasi | null {
  const pathHalaman = pathname.startsWith("/api/")
    ? pathname.slice(4)
    : pathname;

  for (const [prefix, modul] of PETA_PREFIX_RUTE) {
    if (cocokPrefix(pathHalaman, prefix)) return modul;
  }
  return null;
}

/**
 * Mengelompokkan menu legacy Khanza ke modul web. Item yang belum memiliki
 * padanan modul web dikembalikan null agar tidak muncul pada instalasi allowlist.
 */
export function tentukanModulDariMenu(item: MenuItem): ModulAplikasi | null {
  if (item.href) return tentukanModulDariPath(item.href);

  const teks = `${item.id} ${item.title} ${item.permissionKey ?? ""}`.toLowerCase();
  if (/ranap|rawat inap|kamar/.test(teks)) return "rawat-inap";
  if (/ralan|rawat jalan/.test(teks)) return "rawat-jalan";
  if (/radiologi/.test(teks)) return "radiologi";
  if (/laborat|\blab\b/.test(teks)) return "laboratorium";
  if (/\bigd\b|ugd/.test(teks)) return "igd";
  if (/farmasi|obat|resep|\bbhp\b/.test(teks)) return "farmasi";

  switch (item.categoryCode) {
    case "A":
      return "registrasi";
    case "B":
      return "rawat-jalan";
    case "C":
      return "sdm";
    case "D":
      return "farmasi";
    case "E":
      return "laboratorium";
    case "M":
      return "pasien";
    default:
      return null;
  }
}

export function modulDiaktifkan(
  konfigurasi: KonfigurasiModul,
  modul: ModulAplikasi | null,
) {
  if (!konfigurasi.penyaringanAktif) return true;
  return modul !== null && konfigurasi.modulAktif.includes(modul);
}

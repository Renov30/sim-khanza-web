import {
  ALL_MODUL_APLIKASI,
  type KonfigurasiModul,
  type ModulAplikasi,
} from "./peta";

function adalahModulAplikasi(nilai: string): nilai is ModulAplikasi {
  return (ALL_MODUL_APLIKASI as readonly string[]).includes(nilai);
}

/**
 * Konfigurasi ini sengaja dibaca dari environment, bukan database. Bila variabel
 * tidak diisi, perilaku instalasi lama tetap dipertahankan: semua modul aktif.
 */
export function uraikanKonfigurasiModul(nilaiEnvironment: string | undefined): KonfigurasiModul {
  const nilai = nilaiEnvironment?.trim();
  if (!nilai) {
    return {
      penyaringanAktif: false,
      modulAktif: [...ALL_MODUL_APLIKASI],
    };
  }

  const modulAktif = [...new Set(
    nilai
      .split(",")
      .map((modul) => modul.trim().toLowerCase())
      .filter(adalahModulAplikasi),
  )];

  return {
    penyaringanAktif: true,
    modulAktif,
  };
}

export function dapatkanKonfigurasiModul(): KonfigurasiModul {
  return uraikanKonfigurasiModul(process.env.KHANZA_ENABLED_MODULES);
}

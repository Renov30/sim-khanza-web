import type { KonfigurasiInap } from "@/lib/rawat-inap/types";

function hariKe(tanggal: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return 0;
  const [tahun, bulan, hari] = tanggal.split("-").map(Number);
  return Math.floor(Date.UTC(tahun, bulan - 1, hari) / 86400000);
}

function detikKe(jam: string) {
  const [jamValue = "0", menit = "0", detik = "0"] = jam.split(":");
  return Number(jamValue) * 3600 + Number(menit) * 60 + Number(detik);
}

export function hitungLamaPratinjau(
  tglMasuk: string,
  jamMasuk: string,
  tglAkhir: string,
  jamAkhir: string,
  konfigurasi: KonfigurasiInap,
) {
  const hariMulai = hariKe(tglMasuk);
  const hariAkhir = hariKe(tglAkhir);
  if (!hariMulai || !hariAkhir) return 0;
  const selisihHari = hariAkhir - hariMulai;
  const lama = selisihHari === 0
    ? (detikKe(jamAkhir) - detikKe(jamMasuk) > konfigurasi.lamajam * 3600 ? 1 : 0)
    : selisihHari;
  return Math.max(0, lama + (konfigurasi.hariawal === "Yes" ? 1 : 0));
}

export function biayaInap(lama: number, tarif: number) {
  return Math.round(lama * tarif);
}

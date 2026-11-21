export type JenisTarif = "ralan" | "ranap";

export interface KonfigurasiTarif {
  api: string;
  judul: string;
  judulInput: string;
  idPenyimpanan: string;
  prefiksKode: string;
  tabel: string;
  unitField: "kd_poli" | "kd_bangsal";
  unitLabel: string;
  unitOpsi: "poliklinik" | "bangsal";
  punyaKelas: boolean;
  caption: string;
  placeholderCari: string;
  pesanHapus: string;
  pesanPulihkan: string;
}

export const STATUS_TARIF = ["0", "1"] as const;
export const KELAS_TARIF = [
  "-",
  "Kelas 1",
  "Kelas 2",
  "Kelas 3",
  "Kelas Utama",
  "Kelas VIP",
  "Kelas VVIP",
] as const;

export const KONFIG_TARIF: Record<JenisTarif, KonfigurasiTarif> = {
  ralan: {
    api: "tarif-ralan",
    judul: "Tarif Rawat Jalan",
    judulInput: ".: Input Tarif Rawat Jalan",
    idPenyimpanan: "tarif-ralan-form",
    prefiksKode: "RJ",
    tabel: "jns_perawatan",
    unitField: "kd_poli",
    unitLabel: "Unit/Poli",
    unitOpsi: "poliklinik",
    punyaKelas: false,
    caption: "Daftar tarif tindakan, perawatan, dan tagihan rawat jalan",
    placeholderCari: "Cari kode, nama tarif, kategori, jenis bayar, atau unit...",
    pesanHapus: "Tarif rawat jalan dinonaktifkan.",
    pesanPulihkan: "Tarif rawat jalan dipulihkan.",
  },
  ranap: {
    api: "tarif-ranap",
    judul: "Tarif Rawat Inap",
    judulInput: ".: Input Tarif Rawat Inap",
    idPenyimpanan: "tarif-ranap-form",
    prefiksKode: "RI",
    tabel: "jns_perawatan_inap",
    unitField: "kd_bangsal",
    unitLabel: "Kamar/Bangsal",
    unitOpsi: "bangsal",
    punyaKelas: true,
    caption: "Daftar tarif tindakan, perawatan, dan tagihan rawat inap",
    placeholderCari: "Cari kode, nama tarif, kategori, jenis bayar, kamar, atau kelas...",
    pesanHapus: "Tarif rawat inap dinonaktifkan.",
    pesanPulihkan: "Tarif rawat inap dipulihkan.",
  },
};

export function konfigurasiTarif(jenis: JenisTarif): KonfigurasiTarif {
  return KONFIG_TARIF[jenis];
}

export const TABEL_TARIF_LAB = "jns_perawatan_lab";

export const KODE_TARIF_LAB = {
  prefiks: "J",
  panjang: 6,
} as const;

export const STATUS_TARIF_LAB = ["0", "1"] as const;

export const KELAS_TARIF_LAB = [
  "-",
  "Rawat Jalan",
  "Kelas 1",
  "Kelas 2",
  "Kelas 3",
  "Kelas Utama",
  "Kelas VIP",
  "Kelas VVIP",
] as const;

export const KATEGORI_TARIF_LAB = ["PK", "PA", "MB"] as const;

export const STATUS_PULANG = [
  "Sehat", "Rujuk", "APS", "+", "Meninggal", "Sembuh", "Membaik",
  "Pulang Paksa", "Pindah Kamar", "Status Belum Lengkap",
  "Atas Persetujuan Dokter", "Atas Permintaan Sendiri", "Isoman", "Lain-lain",
] as const;

export const TEMPAT_MENINGGAL = [
  "-", "Rumah Sakit", "Puskesmas", "Rumah Bersalin", "Rumah Tempat Tinggal",
  "Lain-lain (Termasuk Doa)", "Tidak tahu",
] as const;

export const KATEGORI_RUJUK = ["-", "Bedah", "Non Bedah", "Kebidanan", "Anak"] as const;
export const AMBULANCE = ["-", "AGD", "SENDIRI", "SWASTA"] as const;

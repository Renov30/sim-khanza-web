export const TAB_RIWAYAT = ["kunjungan", "soapi", "perawatan", "pembelian", "piutang", "retensi"] as const;
export type TabRiwayat = (typeof TAB_RIWAYAT)[number];

export const MODE_RIWAYAT = ["terakhir", "semua", "tanggal", "nomor"] as const;
export type ModeRiwayat = (typeof MODE_RIWAYAT)[number];

export interface PasienRiwayat {
  no_rm: string;
  nama: string;
  jenis_kelamin: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  agama: string | null;
  pendidikan: string | null;
  status_nikah: string | null;
  golongan_darah: string | null;
  nama_ibu: string | null;
  bahasa: string | null;
  cacat_fisik: string | null;
}

export interface BarisRiwayat {
  [kunci: string]: unknown;
}

export interface ResponsRiwayat {
  pasien: PasienRiwayat;
  items: BarisRiwayat[];
  total: number;
  limit: number;
  offset: number;
  tab: TabRiwayat;
  mode: ModeRiwayat;
}

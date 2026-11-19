export interface StatusPanelPemeriksaan {
  disabledSimpan: boolean;
  disabledGanti: boolean;
  disabledHapus: boolean;
  disabledCetak: boolean;
  tanggalMulai: string;
  tanggalSelesai: string;
  kataKunci: string;
  jumlahRecord: number;
  memuat: boolean;
}

export interface AksiPanelPemeriksaan {
  simpan: () => void;
  baru: () => void;
  ganti: () => void;
  hapus: () => void;
  cetak: () => void;
  gantiTanggalMulai: (nilai: string) => void;
  gantiTanggalSelesai: (nilai: string) => void;
  gantiKataKunci: (nilai: string) => void;
  cari: () => void;
  semua: () => void;
}

export const STATUS_PANEL_PEMERIKSAAN_AWAL: StatusPanelPemeriksaan = {
  disabledSimpan: true,
  disabledGanti: true,
  disabledHapus: true,
  disabledCetak: true,
  tanggalMulai: "",
  tanggalSelesai: "",
  kataKunci: "",
  jumlahRecord: 0,
  memuat: true,
};

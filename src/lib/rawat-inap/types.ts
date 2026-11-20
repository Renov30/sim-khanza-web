export interface BarisRawatInapMutasi {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_kamar: string;
  nm_bangsal?: string | null;
  trf_kamar: number | string | null;
  diagnosa_awal?: string | null;
  diagnosa_akhir?: string | null;
  tgl_masuk: string;
  jam_masuk: string;
  tgl_keluar?: string | null;
  jam_keluar?: string | null;
  lama?: number | string | null;
  ttl_biaya?: number | string | null;
  stts_pulang?: string | null;
}

export interface KamarTersedia {
  kd_kamar: string;
  nm_bangsal: string;
  trf_kamar: number;
  tarif: number;
  status: string;
}

export interface KonfigurasiInap {
  lamajam: number;
  hariawal: "Yes" | "No";
  diagnosaakhir: "Yes" | "No";
}

export type OpsiPindah = 1 | 2 | 3 | 4;

export interface HasilPulang {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  status_pulang: string;
  tindak_lanjut: "meninggal" | "rujuk" | null;
}

export interface DokterPilihan {
  kd_dokter: string;
  nm_dokter: string;
}

export const KONDISI_PULANG = ["Hidup", "Meninggal"] as const;

export type KondisiPulang = (typeof KONDISI_PULANG)[number];

export const PANJANG_RESUME = {
  kd_dokter: 20,
  keluhan_utama: 2000,
  jalannya_penyakit: 2000,
  pemeriksaan_penunjang: 2000,
  hasil_laborat: 2000,
  diagnosa_utama: 80,
  kd_diagnosa_utama: 10,
  diagnosa_sekunder: 80,
  kd_diagnosa_sekunder: 10,
  diagnosa_sekunder2: 80,
  kd_diagnosa_sekunder2: 10,
  diagnosa_sekunder3: 80,
  kd_diagnosa_sekunder3: 10,
  diagnosa_sekunder4: 80,
  kd_diagnosa_sekunder4: 10,
  prosedur_utama: 80,
  kd_prosedur_utama: 8,
  prosedur_sekunder: 80,
  kd_prosedur_sekunder: 8,
  prosedur_sekunder2: 80,
  kd_prosedur_sekunder2: 8,
  prosedur_sekunder3: 80,
  kd_prosedur_sekunder3: 8,
  obat_pulang: 2000,
} as const;

export type KolomTeksResume = keyof typeof PANJANG_RESUME;

export interface ResumePasienForm {
  no_rawat: string;
  kd_dokter: string;
  keluhan_utama: string;
  jalannya_penyakit: string;
  pemeriksaan_penunjang: string;
  hasil_laborat: string;
  diagnosa_utama: string;
  kd_diagnosa_utama: string;
  diagnosa_sekunder: string;
  kd_diagnosa_sekunder: string;
  diagnosa_sekunder2: string;
  kd_diagnosa_sekunder2: string;
  diagnosa_sekunder3: string;
  kd_diagnosa_sekunder3: string;
  diagnosa_sekunder4: string;
  kd_diagnosa_sekunder4: string;
  prosedur_utama: string;
  kd_prosedur_utama: string;
  prosedur_sekunder: string;
  kd_prosedur_sekunder: string;
  prosedur_sekunder2: string;
  kd_prosedur_sekunder2: string;
  prosedur_sekunder3: string;
  kd_prosedur_sekunder3: string;
  kondisi_pulang: KondisiPulang;
  obat_pulang: string;
}

export interface KunjunganResume {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_poli: string;
  nm_poli: string;
  status_bayar: string;
}

export interface BarisResume extends ResumePasienForm {
  no_rkm_medis: string;
  nm_pasien: string;
  tgl_registrasi: string;
  nm_dokter: string;
}

export interface PilihanKode {
  kode: string;
  nama: string;
}

export interface ResumePasienData {
  ada: boolean;
  bisa_ubah: boolean;
  kunjungan: KunjunganResume;
  resume: ResumePasienForm;
  daftar: BarisResume[];
  total: number;
  dokter: PilihanKode[];
  unggulan: {
    diagnosa: PilihanKode[];
    prosedur: PilihanKode[];
  };
}

export interface ResumePasienRespons {
  success: boolean;
  data: ResumePasienData;
  message?: string;
}

export function resumeKosong(noRawat = "", kdDokter = ""): ResumePasienForm {
  return {
    no_rawat: noRawat,
    kd_dokter: kdDokter,
    keluhan_utama: "",
    jalannya_penyakit: "",
    pemeriksaan_penunjang: "",
    hasil_laborat: "",
    diagnosa_utama: "",
    kd_diagnosa_utama: "",
    diagnosa_sekunder: "",
    kd_diagnosa_sekunder: "",
    diagnosa_sekunder2: "",
    kd_diagnosa_sekunder2: "",
    diagnosa_sekunder3: "",
    kd_diagnosa_sekunder3: "",
    diagnosa_sekunder4: "",
    kd_diagnosa_sekunder4: "",
    prosedur_utama: "",
    kd_prosedur_utama: "",
    prosedur_sekunder: "",
    kd_prosedur_sekunder: "",
    prosedur_sekunder2: "",
    kd_prosedur_sekunder2: "",
    prosedur_sekunder3: "",
    kd_prosedur_sekunder3: "",
    kondisi_pulang: "Hidup",
    obat_pulang: "",
  };
}

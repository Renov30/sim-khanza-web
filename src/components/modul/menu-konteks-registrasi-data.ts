import { selesaikanAksiKonteksUmum, type AksiKonteksUmum } from "./peta-rute-konteks";

export type ItemMenuKonteks = {
  id: string;
  label: string;
  children?: readonly ItemMenuKonteks[];
};

export interface BarisMenuKonteks {
  no_rawat: string;
  nm_pasien: string;
}

export type KunciSortRegistrasi = "no_rawat" | "tanggal" | "dokter" | "poli" | "penjab" | "status" | "no_reg" | "no_rm";

export type AksiMenuKonteks =
  | AksiKonteksUmum
  | { jenis: "filter"; label: string; kunci: "sep"; nilai: "Belum" | "Sudah" }
  | { jenis: "urut"; label: string; kunci: KunciSortRegistrasi; arah: "asc" | "desc" }
  | { jenis: "belum"; label: string };
export const MENU_KONTEKS_REGISTRASI: readonly ItemMenuKonteks[] = [
  {
    "id": "MnDataRM",
    "label": "Data Rekam Medis",
    "children": [
      {
        "id": "MnRMSkrining",
        "label": "Skrining",
        "children": [
          {
            "id": "MnSkriningMerokokUsiaSekolahRemaja",
            "label": "Skrining Merokok Usia Sekolah & Remaja"
          },
          {
            "id": "MnSkriningKekerasanPadaWanita",
            "label": "Skrining Kekerasan Pada Perempuan"
          },
          {
            "id": "MnSkriningObesitas",
            "label": "Skrining Obesitas"
          },
          {
            "id": "MnRMSkriningRisikoKanker",
            "label": "Skrining Kanker",
            "children": [
              {
                "id": "MnSkriningRisikoKankerPayudara",
                "label": "Skrining Risiko Kanker Payudara"
              },
              {
                "id": "MnSkriningRisikoKankerParu",
                "label": "Skrining Risiko Kanker Paru"
              },
              {
                "id": "MnSkriningRisikoKankerServiks",
                "label": "Skrining Risiko Kanker Serviks"
              },
              {
                "id": "MnSkriningKankerKolorektal",
                "label": "Skrining Kanker Kolorektal"
              }
            ]
          },
          {
            "id": "MnRMSkriningKesehatanGigiMulut",
            "label": "Skrining Kesehatan Gigi & Mulut",
            "children": [
              {
                "id": "MnSkriningKesehatanGigiMulutRemaja",
                "label": "Usia Remaja"
              },
              {
                "id": "MnSkriningKesehatanGigiMulutBalita",
                "label": "Usia Balita"
              },
              {
                "id": "MnSkriningKesehatanGigiMulutDewasa",
                "label": "Usia Dewasa"
              },
              {
                "id": "MnSkriningKesehatanGigiMulutLansia",
                "label": "Usia Lansia"
              }
            ]
          },
          {
            "id": "MnSkriningTBC",
            "label": "Skrining TBC"
          },
          {
            "id": "MnSkriningPUMA",
            "label": "Skrining PUMA"
          },
          {
            "id": "MnSkriningAdiksiNikotin",
            "label": "Skrining Adiksi Nikotin"
          },
          {
            "id": "MnSkriningThalassemia",
            "label": "Skrining Thalassemia"
          },
          {
            "id": "MnSkriningInstrumen",
            "label": "Skrining Istrumen",
            "children": [
              {
                "id": "MnSkriningInstrumenSDQ",
                "label": "SDQ"
              },
              {
                "id": "MnSkriningInstrumenSRQ",
                "label": "SRQ"
              },
              {
                "id": "MnSkriningInstrumenACRS",
                "label": "ACRS"
              },
              {
                "id": "MnSkriningInstrumenMentalEmosional",
                "label": "Mental Emosional"
              }
            ]
          },
          {
            "id": "MnSkriningDiabetesMelitus",
            "label": "Skrining Diabetes Melitus"
          },
          {
            "id": "MnSkriningAnemia",
            "label": "Skrining Anemia"
          },
          {
            "id": "MnSkriningHipertensi",
            "label": "Skrining Hipertensi"
          },
          {
            "id": "MnSkriningKesehatanPenglihatan",
            "label": "Skrining Kesehatan Penglihatan"
          },
          {
            "id": "MnSkriningIndraPendengaran",
            "label": "Skrining Indra Pendengaran"
          },
          {
            "id": "MnSkriningFrailtySyndrome",
            "label": "Skrining Frailty Syndrome"
          }
        ]
      },
      {
        "id": "MnRMRawatJalan",
        "label": "RM Rawat Jalan",
        "children": [
          {
            "id": "MnAwalKeperawatan",
            "label": "Awal Keperawatan",
            "children": [
              {
                "id": "MnPenilaianAwalKeperawatanRalan",
                "label": "Pengkajian Awal Keperawatan Umum"
              },
              {
                "id": "MnPenilaianAwalKeperawatanGigi",
                "label": "Pengkajian Awal Keperawatan Gigi & Mulut"
              },
              {
                "id": "MnPenilaianAwalKeperawatanKebidanan",
                "label": "Pengkajian Awal Keperawatan Kebidanan & Kandungan"
              },
              {
                "id": "MnPenilaianAwalKeperawatanBayiAnak",
                "label": "Pengkajian Awal Keperawatan Bayi/Anak"
              },
              {
                "id": "MnPenilaianAwalKeperawatanPsikiatri",
                "label": "Pengkajian Awal Keperawatan Psikiatri"
              },
              {
                "id": "MnPenilaianAwalKeperawatanRalanGeriatri",
                "label": "Pengkajian Awal Keperawatan Geriatri"
              }
            ]
          },
          {
            "id": "MnAwalMedis",
            "label": "Awal Medis",
            "children": [
              {
                "id": "MnPenilaianAwalMedisRalan",
                "label": "Pengkajian Awal Medis Umum"
              },
              {
                "id": "MnPenilaianAwalMedisRalanKebidanan",
                "label": "Pengkajian Awal Medis Kebidanan & Kandungan"
              },
              {
                "id": "MnPenilaianAwalMedisRalanBayi",
                "label": "Pengkajian Awal Medis Bayi/Anak"
              },
              {
                "id": "MnPenilaianAwalMedisRalanTHT",
                "label": "Pengkajian Awal Medis THT"
              },
              {
                "id": "MnPenilaianAwalMedisRalanPsikiatri",
                "label": "Pengkajian Awal Medis Psikiatri"
              },
              {
                "id": "MnPenilaianAwalMedisRalanPenyakitDalam",
                "label": "Pengkajian Awal Medis Penyakit Dalam"
              },
              {
                "id": "MnPenilaianAwalMedisRalanMata",
                "label": "Pengkajian Awal Medis Mata"
              },
              {
                "id": "MnPenilaianAwalMedisRalanNeurologi",
                "label": "Pengkajian Awal Medis Neurologi"
              },
              {
                "id": "MnPenilaianAwalMedisRalanOrthopedi",
                "label": "Pengkajian Awal Medis Orthopedi"
              },
              {
                "id": "MnPenilaianAwalMedisRalanBedah",
                "label": "Pengkajian Awal Medis Bedah"
              },
              {
                "id": "MnPenilaianAwalMedisRalanBedahMulut",
                "label": "Pengkajian Awal Medis Bedah Mulut"
              },
              {
                "id": "MnPenilaianAwalMedisRalanGeriatri",
                "label": "Pengkajian Awal Medis Geriatri"
              },
              {
                "id": "MnPenilaianAwalMedisRalanKulitKelamin",
                "label": "Pengkajian Awal Medis Kulit & Kelamin"
              },
              {
                "id": "MnPenilaianAwalMedisRalanParu",
                "label": "Pengkajian Awal Medis Paru"
              },
              {
                "id": "MnPenilaianAwalMedisRalanFisikRehabilitasi",
                "label": "Pengkajian Awal Medis Fisik & Rehabilitasi"
              },
              {
                "id": "MnPenilaianAwalMedisHemodialisa",
                "label": "Pengkajian Awal Medis Hemodialisa"
              }
            ]
          },
          {
            "id": "MnHasilUSG",
            "label": "Hasil USG",
            "children": [
              {
                "id": "MnHasilPemeriksaanUSG",
                "label": "Hasil USG Kandungan"
              },
              {
                "id": "MnHasilPemeriksaanUSGUrologi",
                "label": "Hasil USG Urologi"
              },
              {
                "id": "MnHasilPemeriksaanUSGGynecologi",
                "label": "Hasil USG Gynecologi"
              },
              {
                "id": "MnHasilPemeriksaanUSGNeonatus",
                "label": "Hasil USG Neonatus"
              }
            ]
          },
          {
            "id": "MnHasilPemeriksaanEKG",
            "label": "Hasil Pemeriksaan EKG"
          },
          {
            "id": "MnHasilPemeriksaanECHO",
            "label": "Hasil Pemeriksaan ECHO"
          },
          {
            "id": "MnHasilPemeriksaanSlitLamp",
            "label": "Hasil Pemeriksaan Slit Lamp"
          },
          {
            "id": "MnHasilPemeriksaanOCT",
            "label": "Hasil Pemeriksaan OCT"
          },
          {
            "id": "MnHasilEndoskopi",
            "label": "Hasil Endoskopi",
            "children": [
              {
                "id": "MnHasilEndoskopiFaringLaring",
                "label": "Hasil Endoskopi Faring/Laring"
              },
              {
                "id": "MnHasilEndoskopiHidung",
                "label": "Hasil Endoskopi Hidung"
              },
              {
                "id": "MnHasilEndoskopiTelinga",
                "label": "Hasil Endoskopi Telinga"
              }
            ]
          },
          {
            "id": "MnDokumentasiTindakanESWL",
            "label": "Dokumentasi Tindakan ESWL"
          },
          {
            "id": "MnPenilaianPsikolog",
            "label": "Pengkajian Psikologi"
          },
          {
            "id": "MnPenilaianPsikologKlinis",
            "label": "Pengkajian Psikologi Klinis"
          }
        ]
      },
      {
        "id": "MnRMIGD",
        "label": "RM Gawat Darurat",
        "children": [
          {
            "id": "MnDataTriaseIGD",
            "label": "Triase Gawat Darurat"
          },
          {
            "id": "MnPenilaianAwalKeperawatanIGD",
            "label": "Pengkajian Awal Keperawatan IGD"
          },
          {
            "id": "MnPenilaianAwalMedisIGD",
            "label": "Pengkajian Awal Medis IGD"
          },
          {
            "id": "MnPenilaianAwalMedisIGDPsikiatri",
            "label": "Pengkajian Awal Medis IGD Psikiatri"
          },
          {
            "id": "MnPenilaianPasienKeracunan",
            "label": "Pengkajian Pasien Keracunan"
          },
          {
            "id": "MnPengkajianRestrain",
            "label": "Pengkajian Restrain"
          },
          {
            "id": "MnPemantauanPEWSAnak",
            "label": "Pemantauan PEWS Anak"
          },
          {
            "id": "MnPemantauanPEWSDewasa",
            "label": "Pemantauan EWS Dewasa"
          },
          {
            "id": "MnPemantauanMEOWSObstetri",
            "label": "Pemantauan MEOWS Obstetri"
          },
          {
            "id": "MnPemantauanEWSNeonatus",
            "label": "Pemantauan EWS Neonatus"
          }
        ]
      },
      {
        "id": "MnRMOperasi",
        "label": "RM Operasi",
        "children": [
          {
            "id": "MnPenilaianPreInduksi",
            "label": "Pengkajian Pre Induksi"
          },
          {
            "id": "MnChecklistPreOperasi",
            "label": "Check List Pre Operasi"
          },
          {
            "id": "MnSignInSebelumAnestesi",
            "label": "Sign-In Sebelum Anestesi"
          },
          {
            "id": "MnTimeOutSebelumInsisi",
            "label": "Time-Out Sebelum Insisi"
          },
          {
            "id": "MnSignOutSebelumMenutupLuka",
            "label": "Sign-Out Sebelum Menutup Luka"
          },
          {
            "id": "MnChecklistPostOperasi",
            "label": "Check List Post Operasi"
          },
          {
            "id": "MnPenilaianPreOp",
            "label": "Pengkajian Pre Operasi"
          },
          {
            "id": "MnCatatanAnastesiSedasi",
            "label": "Catatan Anestesi-Sedasi"
          },
          {
            "id": "MnPenilaianPreAnastesi",
            "label": "Pengkajian Pre Anestesi"
          },
          {
            "id": "MnCheckListKesiapanAnestesi",
            "label": "Check List Kesiapan Anestesi"
          },
          {
            "id": "MnSkorAldrettePascaAnestesi",
            "label": "Skor Aldrette Pasca Anestesi"
          },
          {
            "id": "MnSkorStewardPascaAnestesi",
            "label": "Skor Steward Pasca Anestesi"
          },
          {
            "id": "MnSkorBromagePascaAnestesi",
            "label": "Skor Bromage Pasca Anestesi"
          },
          {
            "id": "MnCatatanPengkajianPaskaOperasi",
            "label": "Catatan Pengkajian Paska Operasi"
          }
        ]
      },
      {
        "id": "MnRMHCU",
        "label": "RM HCU & ICU",
        "children": [
          {
            "id": "MnCheckListKriteriaMasukHCU",
            "label": "Check List Kriteria Masuk HCU"
          },
          {
            "id": "MnCheckListKriteriaMasukICU",
            "label": "Check List Kriteria Masuk ICU"
          }
        ]
      },
      {
        "id": "MnRehabMedik",
        "label": "RM Rehab Medik",
        "children": [
          {
            "id": "MnPenilaianFisioterapi",
            "label": "Pengkajian Awal Fisioterapi"
          },
          {
            "id": "MnPenilaianTerapiWicara",
            "label": "Pengkajian Terapi Wicara"
          },
          {
            "id": "MnPenatalaksanaanTerapiOkupasi",
            "label": "Penatalaksanaan Terapi Okupasi"
          },
          {
            "id": "MnLayananKedokteranFisikRehabilitasi",
            "label": "Layanan Kedokteran Fisik & Rehabilitasi"
          },
          {
            "id": "MnUjiFungsiKFR",
            "label": "Uji Fungsi/Prosedur KFR"
          }
        ]
      },
      {
        "id": "MnRMRisikoJatuh",
        "label": "Risiko Jatuh & Fungsional",
        "children": [
          {
            "id": "MnPenilaianRisikoJatuhDewasa",
            "label": "Pengkajian Lanjutan Risiko Jatuh Dewasa"
          },
          {
            "id": "MnPenilaianRisikoJatuhAnak",
            "label": "Pengkajian Lanjutan Risiko Jatuh Anak"
          },
          {
            "id": "MnPenilaianRisikoJatuhLansia",
            "label": "Pengkajian Lanjutan Risiko Jatuh Lansia"
          },
          {
            "id": "MnPenilaianRisikoJatuhNeonatus",
            "label": "Pengkajian Lanjutan Risiko Jatuh Neonatus"
          },
          {
            "id": "MnPenilaianRisikoJatuhGeriatri",
            "label": "Pengkajian Lanjutan Risiko Jatuh Geriatri"
          },
          {
            "id": "MnPenilaianRisikoJatuhPsikiatri",
            "label": "Pengkajian Lanjutan Risiko Jatuh Psikiatri"
          },
          {
            "id": "MnPenilaianLanjutanSkriningFungsional",
            "label": "Pengkajian Lanjutan Skrining Fungsional"
          }
        ]
      },
      {
        "id": "MnPenilaianLain",
        "label": "Pengkajian Lain-lain",
        "children": [
          {
            "id": "MnPenilaianTambahanGeriatri",
            "label": "Pengkajian Tambahan Pasien Geriatri"
          },
          {
            "id": "MnPenilaianTambahanBunuhDiri",
            "label": "Pengkajian Tambahan Bunuh Diri"
          },
          {
            "id": "MnPenilaianTambahanPerilakuKekerasan",
            "label": "Pengkajian Tambahan Perilaku Kekerasan"
          },
          {
            "id": "MnPenilaianTambahanMelarikanDiri",
            "label": "Pengkajian Tambahan Melarikan Diri"
          },
          {
            "id": "MnPenilaianPasienTerminal",
            "label": "Pengkajian Pasien Terminal"
          },
          {
            "id": "MnPenilaianKorbanKekerasan",
            "label": "Pengkajian Korban Kekerasan"
          },
          {
            "id": "MnPenilaianPasienPenyakitMenular",
            "label": "Pengkajian Pasien Penyakit Menular"
          },
          {
            "id": "MnPenilaianPasienImunitasRendah",
            "label": "Pengkajian Pasien Imunitas Rendah"
          },
          {
            "id": "MnPenilaianDerajatDehidrasi",
            "label": "Pengkajian Derajat Dehidrasi"
          },
          {
            "id": "MnPenilaianMCU",
            "label": "Pengkajian Medical Check Up"
          },
          {
            "id": "MnHemodialisa",
            "label": "Hemodialisa"
          },
          {
            "id": "MnPenilaianBayiBaruLahir",
            "label": "Pengkajian Bayi Baru Lahir"
          }
        ]
      },
      {
        "id": "MnRMFarmasi",
        "label": "RM Farmasi",
        "children": [
          {
            "id": "MnKonselingFarmasi",
            "label": "Konseling Farmasi"
          },
          {
            "id": "MnRekonsiliasiObat",
            "label": "Rekonsiliasi Obat"
          }
        ]
      },
      {
        "id": "MnRMCatatanMonitoring",
        "label": "Catatan & Monitoring",
        "children": [
          {
            "id": "MnCatatanCekGDS",
            "label": "Catatan Cek GDS"
          },
          {
            "id": "MnMonitoringReaksiTranfusi",
            "label": "Monitoring Reaksi Tranfusi"
          },
          {
            "id": "MnPenilaianUlangNyeri",
            "label": "Pengkajian Ulang Nyeri"
          },
          {
            "id": "MnCatatanKeperawatan",
            "label": "Catatan Keperawatan"
          },
          {
            "id": "MnCatatanPersalinan",
            "label": "Catatan Persalinan"
          },
          {
            "id": "MnCatatanKeseimbanganCairan",
            "label": "Keseimbangan Cairan"
          },
          {
            "id": "MnCatatanObservasiIGD",
            "label": "Observasi IGD"
          },
          {
            "id": "MnCatatanObservasiCHBP",
            "label": "Observasi CHBP"
          },
          {
            "id": "MnCatatanObservasiInduksiPersalinan",
            "label": "Observasi Induksi Persalinan"
          },
          {
            "id": "MnCatatanObservasiBayi",
            "label": "Observasi Bayi"
          },
          {
            "id": "MnCatatanObservasiHemodialisa",
            "label": "Observasi Hemodialisa"
          },
          {
            "id": "MnCatatanCairanHemodialisa",
            "label": "Catatan Cairan Hemodialisa"
          },
          {
            "id": "MnChecklistPemberianFibrinolitik",
            "label": "Check List Pemberian Fibrinolistik"
          },
          {
            "id": "MnLaporanTindakan",
            "label": "Laporan Tindakan"
          }
        ]
      },
      {
        "id": "MnDiagnosa",
        "label": "Diagnosa Pasien"
      },
      {
        "id": "MnGizi",
        "label": "RM Gizi",
        "children": [
          {
            "id": "ppSkriningNutrisiDewasa",
            "label": "Skrining Nutrisi Pasien Dewasa"
          },
          {
            "id": "ppSkriningNutrisiLansia",
            "label": "Skrining Nutrisi Pasien Lansia"
          },
          {
            "id": "ppSkriningNutrisiAnak",
            "label": "Skrining Nutrisi Pasien Anak"
          },
          {
            "id": "ppSkriningGizi",
            "label": "Skrining Gizi Lanjut"
          },
          {
            "id": "ppAsuhanGizi",
            "label": "Asuhan Gizi"
          },
          {
            "id": "ppMonitoringAsuhanGizi",
            "label": "Monitoring Gizi"
          },
          {
            "id": "ppCatatanAdimeGizi",
            "label": "Catatan ADIME Gizi"
          }
        ]
      },
      {
        "id": "MnTransferAntarRuang",
        "label": "Transfer Antar Ruang"
      },
      {
        "id": "MnEdukasi",
        "label": "Edukasi",
        "children": [
          {
            "id": "MnEdukasiPasienKeluarga",
            "label": "Asesmen Edukasi Pasien & Keluarga"
          },
          {
            "id": "MnPelaksanaanInformasiEdukasi",
            "label": "Pelaksanaan Informasi & Edukasi"
          }
        ]
      },
      {
        "id": "ppResume",
        "label": "Resume Pasien"
      },
      {
        "id": "ppRiwayat",
        "label": "Riwayat Perawatan"
      },
      {
        "id": "ppDeteksiDIniCorona",
        "label": "Deteksi Dini Corona"
      }
    ]
  },
  {
    "id": "MnPermintaan",
    "label": "Permintaan",
    "children": [
      {
        "id": "MnJadwalOperasi",
        "label": "Jadwal Operasi"
      },
      {
        "id": "MnPermintaanLab",
        "label": "Pemeriksaan Lab"
      },
      {
        "id": "MnPermintaanRadiologi",
        "label": "Pemeriksaan Radiologi"
      },
      {
        "id": "MnPermintaanRanap",
        "label": "Rawat Inap"
      },
      {
        "id": "MnPermintaanInformasiObat",
        "label": "Informasi Obat"
      },
      {
        "id": "MnPermintaanKonsultasiMedik",
        "label": "Konsultasi Medik"
      }
    ]
  },
  {
    "id": "MnKamarInap",
    "label": "Kamar Inap"
  },
  {
    "id": "MnTindakan",
    "label": "Tindakan & Pemeriksaan",
    "children": [
      {
        "id": "MnRawatJalan",
        "label": "Tagihan/Tindakan Rawat Jalan"
      },
      {
        "id": "MnPeriksaLab",
        "label": "Periksa Laborat PK"
      },
      {
        "id": "MnPeriksaLabPA",
        "label": "Periksa Laborat PA"
      },
      {
        "id": "MnPeriksaLabMB",
        "label": "Periksa Laborat MB"
      },
      {
        "id": "MnPeriksaRadiologi",
        "label": "Periksa Radiologi"
      },
      {
        "id": "MnOperasi",
        "label": "Tagihan Operasi/VK"
      },
      {
        "id": "MnDataOperasi",
        "label": "Data Operasi"
      }
    ]
  },
  {
    "id": "MnObat",
    "label": "Obat",
    "children": [
      {
        "id": "MnPemberianObat",
        "label": "Pemberian Obat/BHP"
      },
      {
        "id": "MnNoResep",
        "label": "Input No.Resep"
      },
      {
        "id": "MnResepDOkter",
        "label": "Input Resep Dokter"
      },
      {
        "id": "MnCopyResep",
        "label": "Copy Resep Dokter"
      }
    ]
  },
  {
    "id": "MnPilihBilling",
    "label": "Billing/Pembayaran Pasien",
    "children": [
      {
        "id": "MnBillingParsial",
        "label": "Billing Parsial"
      },
      {
        "id": "MnBilling",
        "label": "Billing Total"
      }
    ]
  },
  {
    "id": "jMenu1",
    "label": "Laporan",
    "children": [
      {
        "id": "MnLaporanRekapKunjunganPoli",
        "label": "Laporan Rekap Kunjungan Per Poli"
      },
      {
        "id": "MnLaporanRekapKunjunganDokter",
        "label": "Laporan Rekap Kunjungan Per Dokter"
      },
      {
        "id": "MnLaporanRekapJenisBayar",
        "label": "Laporan RL 315 Cara bayar"
      },
      {
        "id": "MnLaporanRekapRawatDarurat",
        "label": "Laporan RL 32 Rawat Darurat"
      },
      {
        "id": "MnLaporanRekapKunjunganBulanan",
        "label": "Laporan RL 51"
      },
      {
        "id": "MnLaporanRekapKunjunganBulananPoli",
        "label": "Laporan RL 52"
      },
      {
        "id": "MnLaporanRekapPenyakitRalan",
        "label": "Laporan Frekuensi Penyakit Ralan"
      },
      {
        "id": "MnLaporanRekapPerujuk",
        "label": "Laporan Rekap Perperujuk"
      }
    ]
  },
  {
    "id": "jMenu2",
    "label": "Grafik Analisa",
    "children": [
      {
        "id": "ppGrafikPerpoli",
        "label": "Grafik Plot Kunjungan Per Poli"
      },
      {
        "id": "ppGrafikPerpoli1",
        "label": "Grafik Pie Kunjungan Per Poli"
      },
      {
        "id": "ppGrafikPerpoli2",
        "label": "Grafik Batang Kunjungan Per Poli"
      },
      {
        "id": "ppGrafikPerdokter",
        "label": "Grafik Plot Kunjungan Per Dokter"
      },
      {
        "id": "ppGrafikPerdokter1",
        "label": "Grafik Pie Kunjungan Per Dokter"
      },
      {
        "id": "ppGrafikPerdokter2",
        "label": "Grafik Batang Kunjungan Per Dokter"
      },
      {
        "id": "ppGrafikPerJK",
        "label": "Grafik Plot Kunjungan Per Jenis Kelamin"
      },
      {
        "id": "ppGrafikPerPekerjaan",
        "label": "Grafik Plot Kunjungan Per Pekerjaan"
      },
      {
        "id": "ppGrafikPerAgama",
        "label": "Grafik Plot Kunjungan Per Agama"
      },
      {
        "id": "ppGrafikPerTahun",
        "label": "Grafik Plot Kunjungan Per Tahun"
      },
      {
        "id": "ppGrafikPerBulan",
        "label": "Grafik Plot Kunjungan Per Bulan"
      },
      {
        "id": "ppGrafikPerTanggal",
        "label": "Grafik Kunjungan Per Tanggal"
      },
      {
        "id": "ppGrafikDemografi",
        "label": "Demografi Pendaftar"
      }
    ]
  },
  {
    "id": "MnSuratSurat",
    "label": "Surat-Surat",
    "children": [
      {
        "id": "MnSuratKontrol",
        "label": "Surat Kontrol"
      },
      {
        "id": "MnSuratButaWarna",
        "label": "Surat Buta Warna"
      },
      {
        "id": "MnSuratBebasTato",
        "label": "Surat Bebas Tato"
      },
      {
        "id": "MnSuratKewaspadaanKesehatan",
        "label": "Surat Kewaspadaan Kesehatan"
      },
      {
        "id": "MnCetakSuratBebasTBC",
        "label": "Surat Keterangan Bebas TBC"
      },
      {
        "id": "MnCetakSuratSehat",
        "label": "Surat Keterangan Sehat 1"
      },
      {
        "id": "MnCetakSuratSehat1",
        "label": "Surat Keterangan Sehat 2"
      },
      {
        "id": "MnCetakSuratSehat2",
        "label": "Surat Keterangan Sehat 3"
      },
      {
        "id": "MnCetakBebasNarkoba",
        "label": "Surat Keterangan Bebas Narkoba"
      },
      {
        "id": "MnCetakSuratSakit",
        "label": "Surat Cuti Sakit"
      },
      {
        "id": "MnCetakSuratSakitPihak2",
        "label": "Surat Cuti Sakit Pihak Ke 2"
      },
      {
        "id": "MnCetakSuratKeteranganRanap",
        "label": "Surat Keterangan Rawat Inap"
      },
      {
        "id": "MnCetakSuratHamil",
        "label": "Surat Keterangan Hamil/Tidak Hamil"
      },
      {
        "id": "MnCetakSuratCutiHamil",
        "label": "Surat Cuti Hamil"
      },
      {
        "id": "MnCetakSuratCovid",
        "label": "Surat Keterangan Covid"
      },
      {
        "id": "MnCetakSuratKeteranganLayakTerbang",
        "label": "Surat Keterangan Layak Terbang"
      },
      {
        "id": "jMenu8",
        "label": "Administrasi",
        "children": [
          {
            "id": "MnCetakRegister",
            "label": "Bukti Register 1"
          },
          {
            "id": "MnCetakRegister1",
            "label": "Bukti Register 2"
          },
          {
            "id": "MnCetakRegister2",
            "label": "Bukti Register 3"
          },
          {
            "id": "MnBuktiPelayananRalan",
            "label": "Surat Jaminan & Bukti Pelayanan Ralan"
          },
          {
            "id": "MnLembarCasemix",
            "label": "Lembar Casemix 1"
          },
          {
            "id": "MnLembarCasemix1",
            "label": "Lembar Casemix 2"
          },
          {
            "id": "MnLembarCasemix2",
            "label": "Lembar Casemix 3"
          },
          {
            "id": "MnSPBK",
            "label": "Surat Bukti Pelayanan Kesehatan (SBPK) 1"
          },
          {
            "id": "MnSPBK1",
            "label": "Surat Bukti Pelayanan Kesehatan (SBPK) 2"
          },
          {
            "id": "MnSBT",
            "label": "Surat Bukti Tindakan"
          },
          {
            "id": "MnJKRA",
            "label": "Surat Jaminan Kesehatan Nasional (JKRA) Rawat Jalan"
          },
          {
            "id": "MnLembarRalan",
            "label": "Lembar Rawat Jalan"
          },
          {
            "id": "MnBlangkoResep",
            "label": "Blanko Resep"
          },
          {
            "id": "MnSuratJaminanPelayanan",
            "label": "Surat Jaminan Pelayanan BPJS"
          },
          {
            "id": "MnLembarKeluarMasuk2",
            "label": "Lembar Masuk Keluar"
          }
        ]
      },
      {
        "id": "MnSuratPersetujuan",
        "label": "Persetujuan, Pernyataan & Penolakan",
        "children": [
          {
            "id": "MnPersetujuanUmum",
            "label": "Persetujuan Umum"
          },
          {
            "id": "MnPersetujuanPenolakanTindakan",
            "label": "Persetujuan/Penolakan Tindakan"
          },
          {
            "id": "MnPulangAtasPermintaanSendiri",
            "label": "Pulang Atas Permintaan Sendiri"
          },
          {
            "id": "MnPernyataanPasienUmum",
            "label": "Pernyataan Pasien Umum"
          },
          {
            "id": "MnPersetujuanRawatInap",
            "label": "Persetujuan Rawat Inap"
          },
          {
            "id": "MnPersetujuanPenundaanPelayanan",
            "label": "Persetujuan Penundaan Pelayanan"
          },
          {
            "id": "MnPenolakanAnjuranMedis",
            "label": "Penolakan Anjuran Medis"
          },
          {
            "id": "MnPersetujuanPemeriksaanHIV",
            "label": "Persetujuan Pemeriksaan HIV"
          },
          {
            "id": "MnPernyataanMemilihDPJP",
            "label": "Pernyataan Memilih DPJP"
          }
        ]
      }
    ]
  },
  {
    "id": "jMenu3",
    "label": "Check List Kelengkapan Pendaftaran",
    "children": [
      {
        "id": "MnCheckList",
        "label": "Check List Kelengkapan Pendaftaran Kanan"
      },
      {
        "id": "MnCheckList1",
        "label": "Check List Kelengkapan Pendaftaran Kiri"
      },
      {
        "id": "MnCheckList2",
        "label": "Check List Kelengkapan Pendaftaran Kanan+Tracker"
      },
      {
        "id": "MnCheckList3",
        "label": "Check List Kelengkapan Pendaftaran Kiri+Tracker"
      }
    ]
  },
  {
    "id": "jMenu5",
    "label": "Lembar Periksa Pasien",
    "children": [
      {
        "id": "MnCheckList4",
        "label": "Lembar Periksa Pasien Kanan"
      },
      {
        "id": "MnCheckList5",
        "label": "Lembar Periksa Pasien Kiri"
      },
      {
        "id": "MnCheckList6",
        "label": "Lembar Periksa Pasien Kanan 2"
      },
      {
        "id": "MnCheckList7",
        "label": "Lembar Periksa Pasien Kiri 2"
      },
      {
        "id": "MnCheckList8",
        "label": "Lembar Periksa Pasien Kanan 3"
      },
      {
        "id": "MnCheckList9",
        "label": "Lembar Periksa Pasien Kiri 3"
      }
    ]
  },
  {
    "id": "MnLabel",
    "label": "Label & Barcode",
    "children": [
      {
        "id": "MnLabelTracker",
        "label": "Label Tracker 1"
      },
      {
        "id": "MnLabelTracker1",
        "label": "Label Tracker 2"
      },
      {
        "id": "MnLabelTracker2",
        "label": "Label Tracker 3"
      },
      {
        "id": "MnLabelTracker3",
        "label": "Label Tracker 4"
      },
      {
        "id": "MnBarcode",
        "label": "Barcode Perawatan 1"
      },
      {
        "id": "MnBarcode1",
        "label": "Barcode Perawatan 2"
      },
      {
        "id": "MnBarcode2",
        "label": "Barcode RM"
      },
      {
        "id": "MnBarcodeRM9",
        "label": "Label Rekam Medis 10"
      },
      {
        "id": "MnGelang1",
        "label": "Gelang Pasien 1"
      },
      {
        "id": "MnGelang2",
        "label": "Gelang Pasien 2"
      },
      {
        "id": "MnGelang3",
        "label": "Gelang Pasien 3"
      },
      {
        "id": "MnGelang4",
        "label": "Gelang Pasien 4"
      },
      {
        "id": "MnGelang5",
        "label": "Gelang Pasien 5"
      },
      {
        "id": "MnGelang6",
        "label": "Gelang Pasien 6"
      },
      {
        "id": "MnGelang7",
        "label": "Gelang Pasien 7"
      }
    ]
  },
  {
    "id": "MnRujukan",
    "label": "Rujukan",
    "children": [
      {
        "id": "MnRujukMasuk",
        "label": "Masuk"
      },
      {
        "id": "MnRujuk",
        "label": "Keluar"
      },
      {
        "id": "MnPoliInternal",
        "label": "Poli Internal"
      }
    ]
  },
  {
    "id": "MnBridging",
    "label": "Bridging",
    "children": [
      {
        "id": "MnSEP",
        "label": "SEP BPJS"
      },
      {
        "id": "ppSuratKontrol",
        "label": "Rencana Kontrol BPJS"
      },
      {
        "id": "ppSuratPRI",
        "label": "Perintah Rawat Inap BPJS"
      },
      {
        "id": "ppProgramPRB",
        "label": "Program PRB BPJS"
      },
      {
        "id": "ppSuplesiJasaRaharja",
        "label": "Suplesi Jasa Raharja BPJS"
      },
      {
        "id": "ppDataIndukKecelakaan",
        "label": "Data Induk Kecelakaan BPJS"
      },
      {
        "id": "MnBelumTerbitSEP",
        "label": "Belum Terbit SEP BPJS"
      },
      {
        "id": "MnSudahTerbitSEP",
        "label": "Sudah Terbit SEP BPJS"
      },
      {
        "id": "MnSJP",
        "label": "SJP Inhealth"
      },
      {
        "id": "MnPCare",
        "label": "Data PCare"
      },
      {
        "id": "MnRujukSisrute",
        "label": "Rujuk Keluar Via Sisrute"
      },
      {
        "id": "ppPasienCorona",
        "label": "Pasien Corona Kemenkes"
      },
      {
        "id": "ppPerawatanCorona",
        "label": "Perawatan Pasien Corona INACBG"
      },
      {
        "id": "MnTeridentifikasiTB",
        "label": "Teridentifikasi TB Kemenkes"
      },
      {
        "id": "MnRiwayatPerawatanICareNIK",
        "label": "Cek Riwayat Perawatan ICare BPJS Via NIK FKTL"
      },
      {
        "id": "MnRiwayatPerawatanICareNoKartu",
        "label": "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTL"
      },
      {
        "id": "MnRiwayatPerawatanICareNIK1",
        "label": "Cek Riwayat Perawatan ICare BPJS Via NIK FKTP"
      },
      {
        "id": "MnRiwayatPerawatanICareNoKartu1",
        "label": "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTP"
      }
    ]
  },
  {
    "id": "MenuInputData",
    "label": "Input Data",
    "children": [
      {
        "id": "ppCatatanPasien",
        "label": "Catatan Untuk Pasien"
      },
      {
        "id": "ppBerkasDigital",
        "label": "Berkas Digital Perawatan"
      },
      {
        "id": "ppIKP",
        "label": "Insiden Keselamatan Pasien"
      }
    ]
  },
  {
    "id": "MnUrut",
    "label": "Urutkan Data Berdasar",
    "children": [
      {
        "id": "MnUrutNoRawatDesc",
        "label": "No.Rawat Descending"
      },
      {
        "id": "MnUrutNoRawatAsc",
        "label": "No.Rawat Ascending"
      },
      {
        "id": "MnUrutTanggalDesc",
        "label": "Tanggal Descending"
      },
      {
        "id": "MnUrutTanggalAsc",
        "label": "Tanggal Ascending"
      },
      {
        "id": "MnUrutDokterDesc",
        "label": "Dokter Descending"
      },
      {
        "id": "MnUrutDokterAsc",
        "label": "Dokter Ascending"
      },
      {
        "id": "MnUrutPoliklinikDesc",
        "label": "Poli/Unit Descending"
      },
      {
        "id": "MnUrutPoliklinikAsc",
        "label": "Poli/Unit Ascending"
      },
      {
        "id": "MnUrutPenjabDesc",
        "label": "Cara Bayar Descending"
      },
      {
        "id": "MnUrutPenjabAsc",
        "label": "Cara Bayar Ascending"
      },
      {
        "id": "MnUrutStatusDesc",
        "label": "Status Descending"
      },
      {
        "id": "MnUrutStatusAsc",
        "label": "Status Ascending"
      },
      {
        "id": "MnUrutRegDesc1",
        "label": "No. Reg. Descending"
      },
      {
        "id": "MnUrutRegAsc1",
        "label": "No. Reg. Ascending"
      },
      {
        "id": "MnUrutRMDesc",
        "label": "No. RM. Descending"
      },
      {
        "id": "MnUrutRMAsc",
        "label": "No. RM. Ascending"
      }
    ]
  },
  {
    "id": "MnHapusData",
    "label": "Hapus & Ubah Data",
    "children": [
      {
        "id": "MnHapusTagihanOperasi",
        "label": "Hapus Tagihan Operasi"
      },
      {
        "id": "MnHapusObatOperasi",
        "label": "Hapus Obat Operasi"
      },
      {
        "id": "MnGabungNoRawat",
        "label": "Gabung Nomor Rawat"
      },
      {
        "id": "MnStatus",
        "label": "Set Status",
        "children": [
          {
            "id": "ppBerkas",
            "label": "Berkas R.M. Diterima"
          },
          {
            "id": "MnSudah",
            "label": "Sudah Periksa"
          },
          {
            "id": "MnBelum",
            "label": "Belum Periksa"
          },
          {
            "id": "MnBatal",
            "label": "Batal Periksa"
          },
          {
            "id": "MnDirujuk",
            "label": "Dirujuk"
          },
          {
            "id": "MnDIrawat",
            "label": "Dirawat"
          },
          {
            "id": "MnMeninggal",
            "label": "Meninggal"
          },
          {
            "id": "MnPulangPaksa",
            "label": "Pulang Paksa"
          },
          {
            "id": "jMenu7",
            "label": "Status Poli",
            "children": [
              {
                "id": "MnStatusBaru",
                "label": "Status Poli Baru"
              },
              {
                "id": "MnStatusLama",
                "label": "Status Poli Lama"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const MENU_KONTEKS_RUJUKAN_INTERNAL: readonly ItemMenuKonteks[] = [
  {
    "id": "MnPermintaan1",
    "label": "Permintaan",
    "children": [
      {
        "id": "MnJadwalOperasi1",
        "label": "Jadwal Operasi"
      },
      {
        "id": "MnPermintaanLab1",
        "label": "Pemeriksaan Lab"
      },
      {
        "id": "MnPermintaanRadiologi1",
        "label": "Pemeriksaan Radiologi"
      },
      {
        "id": "MnPermintaanRanap1",
        "label": "Rawat Inap"
      },
      {
        "id": "MnPermintaanInformasiObat1",
        "label": "Informasi Obat"
      }
    ]
  },
  {
    "id": "MnKamarInap1",
    "label": "Kamar Inap"
  },
  {
    "id": "MnTindakan1",
    "label": "Tindakan & Pemeriksaan",
    "children": [
      {
        "id": "MnRawatJalan1",
        "label": "Tagihan/Tindakan Rawat Jalan"
      },
      {
        "id": "MnPeriksaLab1",
        "label": "Periksa Laborat PK"
      },
      {
        "id": "MnPeriksaLabPA2",
        "label": "Periksa Laborat PA"
      },
      {
        "id": "MnPeriksaLabMB2",
        "label": "Periksa Laborat MB"
      },
      {
        "id": "MnPeriksaRadiologi1",
        "label": "Periksa Radiologi"
      },
      {
        "id": "MnOperasi1",
        "label": "Tagihan Operasi/VK"
      }
    ]
  },
  {
    "id": "MnObat1",
    "label": "Obat",
    "children": [
      {
        "id": "MnPemberianObat1",
        "label": "Pemberian Obat/BHP"
      },
      {
        "id": "MnNoResep1",
        "label": "Input No.Resep"
      },
      {
        "id": "MnResepDOkter1",
        "label": "Input Resep Dokter"
      }
    ]
  },
  {
    "id": "MnBilling1",
    "label": "Billing/Pembayaran Pasien"
  },
  {
    "id": "MenuInputData1",
    "label": "Input Data",
    "children": [
      {
        "id": "ppBerkasDigital1",
        "label": "Berkas Digital Perawatan"
      },
      {
        "id": "ppIKP1",
        "label": "Insiden Keselamatan Pasien"
      },
      {
        "id": "MnDiagnosa1",
        "label": "Diagnosa Pasien"
      }
    ]
  },
  {
    "id": "MnUrut1",
    "label": "Urutkan Data Berdasar",
    "children": [
      {
        "id": "MnUrutNoRawatDesc1",
        "label": "No.Rawat Descending"
      },
      {
        "id": "MnUrutNoRawatAsc1",
        "label": "No.Rawat Ascending"
      },
      {
        "id": "MnUrutTanggalDesc1",
        "label": "Tanggal Descending"
      },
      {
        "id": "MnUrutTanggalAsc1",
        "label": "Tanggal Ascending"
      },
      {
        "id": "MnUrutDokterDesc1",
        "label": "Dokter Descending"
      },
      {
        "id": "MnUrutDokterAsc1",
        "label": "Dokter Ascending"
      },
      {
        "id": "MnUrutPoliklinikDesc1",
        "label": "Poli/Unit Descending"
      },
      {
        "id": "MnUrutPoliklinikAsc1",
        "label": "Poli/Unit Ascending"
      },
      {
        "id": "MnUrutPenjabDesc1",
        "label": "Cara Bayar Descending"
      },
      {
        "id": "MnUrutPenjabAsc1",
        "label": "Cara Bayar Ascending"
      },
      {
        "id": "MnUrutStatusDesc1",
        "label": "Status Descending"
      },
      {
        "id": "MnUrutStatusAsc1",
        "label": "Status Ascending"
      }
    ]
  },
  {
    "id": "ppRiwayat1",
    "label": "Riwayat Perawatan"
  },
  {
    "id": "MnHapusRujukan",
    "label": "Hapus Rujukan Poli Internal"
  },
  {
    "id": "MnDataKonsultasiMedik",
    "label": "Data Konsultasi Medik"
  }
];

const RUTE_DENGAN_NOMOR: Readonly<Record<string, string>> = {
  ppResume: "/resume-pasien",
  ppRiwayat: "/riwayat-pasien",
  ppRiwayat1: "/riwayat-pasien",
  MnDiagnosa: "/tindakan-rawat-jalan",
  MnDiagnosa1: "/tindakan-rawat-jalan",
  MnRawatJalan: "/tindakan-rawat-jalan",
  MnRawatJalan1: "/tindakan-rawat-jalan",
  MnNoResep: "/farmasi/resep-obat",
  MnNoResep1: "/farmasi/resep-obat",
  MnResepDOkter: "/farmasi/resep-obat",
  MnResepDOkter1: "/farmasi/resep-obat",
  MnCopyResep: "/farmasi/copy-resep",
};

const RUTE_TANPA_NOMOR: Readonly<Record<string, string>> = {
  MnPermintaanLab: "/laboratorium/permintaan-pk",
  MnPermintaanLab1: "/laboratorium/permintaan-pk",
  MnPermintaanRadiologi: "/radiologi/permintaan",
  MnPermintaanRadiologi1: "/radiologi/permintaan",
  MnPermintaanRanap: "/rawat-inap",
  MnPermintaanRanap1: "/rawat-inap",
  MnKamarInap: "/rawat-inap",
  MnKamarInap1: "/rawat-inap",
  MnPeriksaLab: "/laboratorium/periksa-pk",
  MnPeriksaLab1: "/laboratorium/periksa-pk",
  MnPeriksaLabPA: "/laboratorium/periksa-pa",
  MnPeriksaLabPA2: "/laboratorium/periksa-pa",
  MnPeriksaLabMB: "/laboratorium/periksa-mb",
  MnPeriksaLabMB2: "/laboratorium/periksa-mb",
  MnPeriksaRadiologi: "/radiologi/periksa",
  MnPeriksaRadiologi1: "/radiologi/periksa",
};

const URUTAN: Readonly<Record<string, { kunci: KunciSortRegistrasi; arah: "asc" | "desc" }>> = {
  MnUrutNoRawatDesc: { kunci: "no_rawat", arah: "desc" },
  MnUrutNoRawatAsc: { kunci: "no_rawat", arah: "asc" },
  MnUrutNoRawatDesc1: { kunci: "no_rawat", arah: "desc" },
  MnUrutNoRawatAsc1: { kunci: "no_rawat", arah: "asc" },
  MnUrutTanggalDesc: { kunci: "tanggal", arah: "desc" },
  MnUrutTanggalAsc: { kunci: "tanggal", arah: "asc" },
  MnUrutTanggalDesc1: { kunci: "tanggal", arah: "desc" },
  MnUrutTanggalAsc1: { kunci: "tanggal", arah: "asc" },
  MnUrutDokterDesc: { kunci: "dokter", arah: "desc" },
  MnUrutDokterAsc: { kunci: "dokter", arah: "asc" },
  MnUrutDokterDesc1: { kunci: "dokter", arah: "desc" },
  MnUrutDokterAsc1: { kunci: "dokter", arah: "asc" },
  MnUrutPoliklinikDesc: { kunci: "poli", arah: "desc" },
  MnUrutPoliklinikAsc: { kunci: "poli", arah: "asc" },
  MnUrutPoliklinikDesc1: { kunci: "poli", arah: "desc" },
  MnUrutPoliklinikAsc1: { kunci: "poli", arah: "asc" },
  MnUrutPenjabDesc: { kunci: "penjab", arah: "desc" },
  MnUrutPenjabAsc: { kunci: "penjab", arah: "asc" },
  MnUrutPenjabDesc1: { kunci: "penjab", arah: "desc" },
  MnUrutPenjabAsc1: { kunci: "penjab", arah: "asc" },
  MnUrutStatusDesc: { kunci: "status", arah: "desc" },
  MnUrutStatusAsc: { kunci: "status", arah: "asc" },
  MnUrutStatusDesc1: { kunci: "status", arah: "desc" },
  MnUrutStatusAsc1: { kunci: "status", arah: "asc" },
  MnUrutRegDesc1: { kunci: "no_reg", arah: "desc" },
  MnUrutRegAsc1: { kunci: "no_reg", arah: "asc" },
  MnUrutRMDesc: { kunci: "no_rm", arah: "desc" },
  MnUrutRMAsc: { kunci: "no_rm", arah: "asc" },
};

export function tentukanAksiMenu(item: ItemMenuKonteks, baris: BarisMenuKonteks): AksiMenuKonteks {
  if (item.id === "MnBelumTerbitSEP") return { jenis: "filter", label: item.label, kunci: "sep", nilai: "Belum" };
  if (item.id === "MnSudahTerbitSEP") return { jenis: "filter", label: item.label, kunci: "sep", nilai: "Sudah" };
  const ruteDenganNomor = RUTE_DENGAN_NOMOR[item.id];
  if (ruteDenganNomor) {
    return { jenis: "rute", label: item.label, rute: `${ruteDenganNomor}?no_rawat=${encodeURIComponent(baris.no_rawat)}` };
  }
  const ruteTanpaNomor = RUTE_TANPA_NOMOR[item.id];
  if (ruteTanpaNomor) return { jenis: "rute", label: item.label, rute: ruteTanpaNomor };
  const urutan = URUTAN[item.id];
  if (urutan) return { jenis: "urut", label: item.label, ...urutan };
  const umum = selesaikanAksiKonteksUmum(item, baris.no_rawat, { konteksHalaman: "registrasi" });
  if (umum) return umum;
  return { jenis: "belum", label: item.label };
}

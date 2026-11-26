import { selesaikanAksiKonteksUmum, type AksiKonteksUmum } from "./peta-rute-konteks";

export type KunciSortRawatJalan =
  | "no_rawat"
  | "tanggal"
  | "dokter"
  | "poli"
  | "penjab"
  | "status"
  | "no_reg"
  | "no_rm";

export interface BarisMenuKonteks {
  no_rawat: string;
  no_reg: string;
  no_rkm_medis: string;
  nm_pasien: string;
  nm_dokter: string;
  nm_poli: string;
  kd_pj: string;
  png_jawab: string | null;
  stts: string;
  tgl_registrasi: string;
  jam_reg: string;
}

export interface ItemMenuKonteks {
  id: string;
  label: string;
  children?: ItemMenuKonteks[];
}

export type AksiMenuKonteks =
  | AksiKonteksUmum
  | { jenis: "filter"; label: string; kunci: "sep" | "penjab" | "belum_diagnosa"; nilai: string }
  | { jenis: "urut"; label: string; kunci: KunciSortRawatJalan; arah: "asc" | "desc" }
  | { jenis: "belum"; label: string };

export const MENU_KONTEKS_RAWAT_JALAN: ItemMenuKonteks[] = [
  {
    id: "MnDataRM", label: "Data Rekam Medis", children: [
      { id: "MnSuratKPS", label: "Form KPS" },
      { id: "MnPerintahLisan", label: "Perintah Lisan dan Pelaporan Nilai Kritis" },
      { id: "MnStatusHd", label: "Status Harian Hd" },
      {
        id: "MnRMSkrining", label: "Skrining", children: [
          { id: "MnSkriningMerokokUsiaSekolahRemaja", label: "Skrining Merokok Usia Sekolah & Remaja" },
          { id: "MnSkriningKekerasanPadaWanita", label: "Skrining Kekerasan Pada Perempuan" },
          { id: "MnSkriningObesitas", label: "Skrining Obesitas" },
          {
            id: "MnRMSkriningRisikoKanker", label: "Skrining Kanker", children: [
              { id: "MnSkriningRisikoKankerPayudara", label: "Skrining Risiko Kanker Payudara" },
              { id: "MnSkriningRisikoKankerParu", label: "Skrining Risiko Kanker Paru" },
              { id: "MnSkriningRisikoKankerServiks", label: "Skrining Risiko Kanker Serviks" },
              { id: "MnSkriningKankerKolorektal", label: "Skrining Kanker Kolorektal" },
            ]
          },
          {
            id: "MnRMSkriningKesehatanGigiMulut", label: "Skrining Kesehatan Gigi & Mulut", children: [
              { id: "MnSkriningKesehatanGigiMulutRemaja", label: "Usia Remaja" },
              { id: "MnSkriningKesehatanGigiMulutBalita", label: "Usia Balita" },
              { id: "MnSkriningKesehatanGigiMulutDewasa", label: "Usia Dewasa" },
              { id: "MnSkriningKesehatanGigiMulutLansia", label: "Usia Lansia" },
            ]
          },
          { id: "MnSkriningTBC", label: "Skrining TBC" },
          { id: "MnSkriningPUMA", label: "Skrining PUMA" },
          { id: "MnSkriningAdiksiNikotin", label: "Skrining Adiksi Nikotin" },
          { id: "MnSkriningThalassemia", label: "Skrining Thalassemia" },
          {
            id: "MnSkriningInstrumen", label: "Skrining Istrumen", children: [
              { id: "MnSkriningInstrumenSDQ", label: "SDQ" },
              { id: "MnSkriningInstrumenSRQ", label: "SRQ" },
              { id: "MnSkriningInstrumenACRS", label: "ACRS" },
              { id: "MnSkriningInstrumenMentalEmosional", label: "Mental Emosional" },
            ]
          },
          { id: "MnSkriningDiabetesMelitus", label: "Skrining Diabetes Melitus" },
          { id: "MnSkriningAnemia", label: "Skrining Anemia" },
          { id: "MnSkriningHipertensi", label: "Skrining Hipertensi" },
          { id: "MnSkriningKesehatanPenglihatan", label: "Skrining Kesehatan Penglihatan" },
          { id: "MnSkriningIndraPendengaran", label: "Skrining Indra Pendengaran" },
          { id: "MnSkriningFrailtySyndrome", label: "Skrining Frailty Syndrome" },
        ]
      },
      {
        id: "MnRMIGD", label: "RM Gawat Darurat", children: [
          { id: "MnDataTriaseIGD", label: "Triase Gawat Darurat" },
          { id: "MnPenilaianAwalKeperawatanIGD", label: "Pengkajian Awal Keperawatan IGD" },
          { id: "MnPenilaianAwalMedisIGD", label: "Pengkajian Awal Medis IGD" },
          { id: "MnPenilaianAwalMedisIGDPsikiatri", label: "Pengkajian Awal Medis IGD Psikiatri" },
          { id: "MnPenilaianPasienKeracunan", label: "Pengkajian Pasien Keracunan" },
          { id: "MnPengkajianRestrain", label: "Pengkajian Restrain" },
          { id: "MnPemantauanPEWSAnak", label: "Pemantauan PEWS Anak" },
          { id: "MnPemantauanPEWSDewasa", label: "Pemantauan EWS Dewasa" },
          { id: "MnPemantauanMEOWS", label: "Pemantauan MEOWS Obstetri" },
          { id: "MnPemantauanEWSNeonatus", label: "Pemantauan EWS Neonatus" },
        ]
      },
      {
        id: "MnRMRawatJalan", label: "RM Rawat Jalan", children: [
          {
            id: "MnAwalKeperawatan", label: "Awal Keperawatan", children: [
              { id: "MnPenilaianAwalKeperawatanRalan", label: "Pengkajian Awal Keperawatan Umum" },
              { id: "MnPenilaianAwalKeperawatanGigi", label: "Pengkajian Awal Keperawatan Gigi & Mulut" },
              { id: "MnPenilaianAwalKeperawatanKebidanan", label: "Pengkajian Awal Keperawatan Kebidanan & Kandungan" },
              { id: "MnPenilaianAwalKeperawatanBayiAnak", label: "Pengkajian Awal Keperawatan Bayi/Anak" },
              { id: "MnPenilaianAwalKeperawatanPsikiatri", label: "Pengkajian Awal Keperawatan Psikiatri" },
              { id: "MnPenilaianAwalKeperawatanRalanGeriatri", label: "Pengkajian Awal Keperawatan Geriatri" },
            ]
          },
          {
            id: "MnAwalMedis", label: "Awal Medis", children: [
              { id: "MnPenilaianAwalMedisRalan", label: "Pengkajian Awal Medis Umum" },
              { id: "MnPenilaianAwalMedisRalanKebidanan", label: "Pengkajian Awal Medis Kebidanan & Kandungan" },
              { id: "MnPenilaianAwalMedisRalanBayi", label: "Pengkajian Awal Medis Bayi/Anak" },
              { id: "MnPenilaianAwalMedisRalanTHT", label: "Pengkajian Awal Medis THT" },
              { id: "MnPenilaianAwalMedisRalanPsikiatri", label: "Pengkajian Awal Medis Psikiatri" },
              { id: "MnPenilaianAwalMedisRalanPenyakitDalam", label: "Pengkajian Awal Medis Penyakit Dalam" },
              { id: "MnPenilaianAwalMedisRalanMata", label: "Pengkajian Awal Medis Mata" },
              { id: "MnPenilaianAwalMedisRalanNeurologi", label: "Pengkajian Awal Medis Neurologi" },
              { id: "MnPenilaianAwalMedisRalanOrthopedi", label: "Pengkajian Awal Medis Orthopedi" },
              { id: "MnPenilaianAwalMedisRalanBedah", label: "Pengkajian Awal Medis Bedah" },
              { id: "MnPenilaianAwalMedisRalanBedahMulut", label: "Pengkajian Awal Medis Bedah Mulut" },
              { id: "MnPenilaianAwalMedisRalanGeriatri", label: "Pengkajian Awal Medis Geriatri" },
              { id: "MnPenilaianAwalMedisRalanKulitKelamin", label: "Pengkajian Awal Medis Kulit & Kelamin" },
              { id: "MnPenilaianAwalMedisRalanParu", label: "Pengkajian Awal Medis Paru" },
              { id: "MnPenilaianAwalMedisRalanHemodialisa", label: "Pengkajian Awal Medis Hemodialisa" },
              { id: "MnPenilaianAwalMedisRalanFisikRehabilitasi", label: "Pengkajian Awal Medis Fisik & Rehabilitasi" },
            ]
          },
          {
            id: "MnHasilUSG", label: "Hasil USG", children: [
              { id: "MnHasilPemeriksaanUSG", label: "Hasil USG Kandungan" },
              { id: "MnHasilPemeriksaanUSGUrologi", label: "Hasil USG Urologi" },
              { id: "MnHasilPemeriksaanUSGGynecologi", label: "Hasil USG Gynecologi" },
              { id: "MnHasilPemeriksaanUSGNeonatus", label: "Hasil USG Neonatus" },
            ]
          },
          {
            id: "MnHasilEndoskopi", label: "Hasil Endoskopi", children: [
              { id: "MnHasilEndoskopiFaringLaring", label: "Hasil Endoskopi Faring/Laring" },
              { id: "MnHasilEndoskopiHidung", label: "Hasil Endoskopi Hidung" },
              { id: "MnHasilEndoskopiTelinga", label: "Hasil Endoskopi Telinga" },
            ]
          },
          { id: "MnHasilPemeriksaanEKG", label: "Hasil Pemeriksaan EKG" },
          { id: "MnHasilPemeriksaanECHO", label: "Hasil Pemeriksaan ECHO" },
          { id: "MnHasilPemeriksaanSlitLamp", label: "Hasil Pemeriksaan Slit Lamp" },
          { id: "MnHasilPemeriksaanOCT", label: "Hasil Pemeriksaan OCT" },
          { id: "MnDokumentasiTindakanESWL", label: "Dokumentasi Tindakan ESWL" },
          { id: "MnPenilaianPsikolog", label: "Pengkajian Psikologi" },
          { id: "MnPenilaianPsikologKlinis", label: "Pengkajian Psikologi Klinis" },
        ]
      },
      {
        id: "MnRMOperasi", label: "RM Operasi", children: [
          { id: "MnPenilaianPreInduksi", label: "Pengkajian Pre Induksi" },
          { id: "MnChecklistPreOperasi", label: "Check List Pre Operasi" },
          { id: "MnSignInSebelumAnestesi", label: "Sign-In Sebelum Anestesi" },
          { id: "MnTimeOutSebelumInsisi", label: "Time-Out Sebelum Insisi" },
          { id: "MnSignOutSebelumMenutupLuka", label: "Sign-Out Sebelum Menutup Luka" },
          { id: "MnPenilaianPreOp", label: "Pengkajian Pre Operasi" },
          { id: "MnCatatanAnastesiSedasi", label: "Catatan Anestesi-Sedasi" },
          { id: "MnPenilaianPreAnestesi", label: "Pengkajian Pre Anestesi" },
          { id: "MnCheckListKesiapanAnestesi", label: "Check List Kesiapan Anestesi" },
          { id: "MnSkorAldrettePascaAnestesi", label: "Skor Aldrette Pasca Anestesi" },
          { id: "MnSkorStewardPascaAnestesi", label: "Skor Steward Pasca Anestesi" },
          { id: "MnSkorBromagePascaAnestesi", label: "Skor Bromage Pasca Anestesi" },
          { id: "MnCatatanPengkajianPaskaOperasi", label: "Catatan Pengkajian Paska Operasi" },
          { id: "MnPenandaanOperasiMata", label: "Penandaan Operasi Mata" },
        ]
      },
      {
        id: "MnRMHCU", label: "RM HCU & ICU", children: [
          { id: "MnCheckListKriteriaMasukHCU", label: "Check List Kriteria Masuk HCU" },
          { id: "MnCheckListKriteriaMasukICU", label: "Check List Kriteria Masuk ICU" },
        ]
      },
      {
        id: "MnRehabMedik", label: "RM Rehab Medik", children: [
          { id: "MnPenilaianFisioterapi", label: "Pengkajian Awal Fisioterapi" },
          { id: "MnPenilaianTerapiWicara", label: "Pengkajian Terapi Wicara" },
          { id: "MnPenatalaksanaanTerapiOkupasi", label: "Penatalaksanaan Terapi Okupasi" },
          { id: "MnLayananKedokteranFisikRehabilitasi", label: "Layanan Kedokteran Fisik & Rehabilitasi" },
          { id: "MnUjiFungsiKFR", label: "Uji Fungsi/Prosedur KFR" },
        ]
      },
      {
        id: "MnRMRisikoJatuh", label: "Risiko Jatuh & Fungsional", children: [
          { id: "MnPenilaianRisikoJatuhDewasa", label: "Pengkajian Lanjutan Risiko Jatuh Dewasa" },
          { id: "MnPenilaianRisikoJatuhAnak", label: "Pengkajian Lanjutan Risiko Jatuh Anak" },
          { id: "MnPenilaianRisikoJatuhLansia", label: "Pengkajian Lanjutan Risiko Jatuh Lansia" },
          { id: "MnPenilaianRisikoJatuhNeonatus", label: "Pengkajian Lanjutan Risiko Jatuh Neonatus" },
          { id: "MnPenilaianRisikoJatuhGeriatri", label: "Pengkajian Lanjutan Risiko Jatuh Geriatri" },
          { id: "MnPenilaianRisikoJatuhPsikiatri", label: "Pengkajian Lanjutan Risiko Jatuh Psikiatri" },
          { id: "MnPenilaianLanjutanSkriningFungsional", label: "Pengkajian Lanjutan Skrining Fungsional" },
        ]
      },
      {
        id: "MnPenilaianLain", label: "Pengkajian Lain-lain", children: [
          { id: "MnPenilaianTambahanGeriatri", label: "Pengkajian Tambahan Pasien Geriatri" },
          { id: "MnPenilaianTambahanBunuhDiri", label: "Pengkajian Tambahan Bunuh Diri" },
          { id: "MnPenilaianTambahanPerilakuKekerasan", label: "Pengkajian Tambahan Perilaku Kekerasan" },
          { id: "MnPenilaianTambahanMelarikanDiri", label: "Pengkajian Tambahan Melarikan Diri" },
          { id: "MnPenilaianPasienTerminal", label: "Pengkajian Pasien Terminal" },
          { id: "MnPenilaianKorbanKekerasan", label: "Pengkajian Korban Kekerasan" },
          { id: "MnPenilaianPasienPenyakitMenular", label: "Pengkajian Pasien Penyakit Menular" },
          { id: "MnPenilaianPasienImunitasRendah", label: "Pengkajian Pasien Imunitas Rendah" },
          { id: "MnPenilaianDerajatDehidrasi", label: "Pengkajian Derajat Dehidrasi" },
          { id: "MnPenilaianMCU", label: "Pengkajian Medical Check Up" },
          { id: "MnHemodialisa", label: "Hemodialisa" },
          { id: "MnPenilaianBayiBaruLahir", label: "Pengkajian Bayi Baru Lahir" },
        ]
      },
      {
        id: "MnRMFarmasi", label: "RM Farmasi", children: [
          { id: "MnKonselingFarmasi", label: "Konseling Farmasi" },
          { id: "MnRekonsiliasiObat", label: "Rekonsiliasi Obat" },
        ]
      },
      {
        id: "MnRMCatatanMonitoring", label: "Catatan & Monitoring", children: [
          { id: "MnCatatanCekGDS", label: "Catatan Cek GDS" },
          { id: "MnMonitoringReaksiTranfusi", label: "Monitoring Reaksi Tranfusi" },
          { id: "MnPenilaianUlangNyeri", label: "Pengkajian Ulang Nyeri" },
          { id: "MnCatatanKeperawatan", label: "Catatan Keperawatan" },
          { id: "MnCatatanPersalinan", label: "Catatan Persalinan" },
          { id: "MnCatatanKeseimbanganCairan", label: "Keseimbangan Cairan" },
          { id: "MnCatatanObservasiIGD", label: "Observasi IGD" },
          { id: "MnCatatanObservasiCHBP", label: "Observasi CHBP" },
          { id: "MnCatatanObservasiInduksiPersalinan", label: "Observasi Induksi Persalinan" },
          { id: "MnCatatanObservasiBayi", label: "Observasi Bayi" },
          { id: "MnCatatanObservasiHemodialisa", label: "Observasi Hemodialisa" },
          { id: "MnCatatanCairanHemodialisa", label: "Catatan Cairan Hemodialisa" },
          { id: "MnChecklistPemberianFibrinolitik", label: "Check List Pemberian Fibrinolistik" },
          { id: "MnLaporanTindakan", label: "Laporan Tindakan" },
        ]
      },
      { id: "MnDiagnosa", label: "Diagnosa" },
      {
        id: "MnGizi", label: "RM Gizi", children: [
          { id: "ppSkriningNutrisiDewasa", label: "Skrining Nutrisi Pasien Dewasa" },
          { id: "ppSkriningNutrisiLansia", label: "Skrining Nutrisi Pasien Lansia" },
          { id: "ppSkriningNutrisiAnak", label: "Skrining Nutrisi Pasien Anak" },
          { id: "ppSkriningGizi", label: "Skrining Gizi Lanjut" },
          { id: "ppAsuhanGizi", label: "Asuhan Gizi" },
          { id: "ppMonitoringAsuhanGizi", label: "Monitoring Gizi" },
          { id: "ppCatatanADIMEGizi", label: "Catatan ADIME Gizi" },
        ]
      },
      { id: "MnTransferAntarRuang", label: "Transfer Antar Ruang" },
      {
        id: "MnEdukasi", label: "Edukasi", children: [
          { id: "MnEdukasiPasienKeluarga", label: "Asesmen Edukasi Pasien & Keluarga" },
          { id: "MnPelaksanaanInformasiEdukasi", label: "Pelaksanaan Informasi & Edukasi" },
          { id: "MnEdukasiBatalRujuk", label: "Edukasi Batal Rujuk" },
        ]
      },
      { id: "ppResume", label: "Resume" },
      { id: "ppRiwayat", label: "Riwayat Perawatan" },
      { id: "ppDeteksiDIniCorona", label: "Deteksi Dini Corona" },
    ]
  },
  {
    id: "MnPermintaan", label: "Permintaan", children: [
      { id: "MnJadwalOperasi", label: "Jadwal Operasi" },
      { id: "MnPermintaanLab", label: "Pemeriksaan Lab" },
      { id: "MnPermintaanRadiologi", label: "Pemeriksaan Radiologi" },
      { id: "MnPermintaanRanap", label: "Rawat Inap" },
      { id: "MnPermintaanInformasiObat", label: "Informasi Obat" },
      { id: "MnPermintaanKonsultasiMedik", label: "Konsultasi Medik" },
    ]
  },
  { id: "ppMasukPoli", label: "Antrian Masuk Poli" },
  { id: "MnKamarInap", label: "Kamar Inap" },
  {
    id: "MnTindakanRalan", label: "Tindakan & Pemeriksaan", children: [
      { id: "MnDataRalan", label: "Data Tindakan Rawat Jalan" },
      { id: "MnPeriksaLab", label: "Periksa Lab PK" },
      { id: "MnPeriksaLabPA", label: "Periksa Lab PA" },
      { id: "MnPeriksaLabMB", label: "Periksa Lab MB" },
      { id: "MnPeriksaRadiologi", label: "Periksa Radiologi" },
      { id: "MnOperasi", label: "Tagihan Operasi/VK" },
      { id: "MnDataOperasi", label: "Data Operasi" },
    ]
  },
  {
    id: "MnObatRalan", label: "Obat", children: [
      { id: "MnPemberianObat", label: "Pemberian Obat" },
      { id: "MnNoResep", label: "Input No.Resep" },
      { id: "MnResepDOkter", label: "Input Resep Dokter" },
      { id: "MnObatLangsung", label: "Total Tagihan Obat" },
      { id: "MnDataPemberianObat", label: "Data Pemberian Obat" },
      { id: "MnPenjualan", label: "Penjualan Obat/Alkes/Barang" },
      { id: "MnPiutangObat", label: "Piutang Obat/Alkes/Barang" },
      { id: "MnCopyResep", label: "Copy Resep Dokter" },
    ]
  },
  {
    id: "MnPilihBilling", label: "Billing/Pembayaran Pasien", children: [
      { id: "MnBillingParsial", label: "Billing Parsial" },
      { id: "MnBilling", label: "Billing Total" },
    ]
  },
  {
    id: "MnRekap", label: "Rekap Data", children: [
      { id: "MnRekapHarianDokter", label: "Rekap Harian Dokter" },
      { id: "MnRekapHarianParamedis", label: "Rekap Harian Paramedis" },
      { id: "MnRekapBulananDokter", label: "Rekap Bulanan Dokter" },
      { id: "MnRekapBulananParamedis", label: "Rekap Bulanan Paramedis" },
      { id: "MnRekapHarianPoli", label: "Rekap Harian Poli" },
      { id: "MnRekapHarianObat", label: "Rekap Harian Obat" },
    ]
  },
  {
    id: "jMenu6", label: "Label & Barcode", children: [
      { id: "MnLabelTracker", label: "Label Tracker 1" },
      { id: "MnLabelTracker1", label: "Label Tracker 2" },
      { id: "MnLabelTracker2", label: "Label Tracker 3" },
      { id: "MnLabelTracker3", label: "Label Tracker 4" },
      { id: "MnBarcode", label: "Barcode Perawatan 1" },
      { id: "MnBarcode1", label: "Barcode Perawatan 2" },
      { id: "MnBarcode2", label: "Barcode RM" },
      { id: "MnBarcodeRM9", label: "Label Rekam Medis 10" },
      { id: "MnGelang1", label: "Gelang Pasien 1" },
      { id: "MnGelang2", label: "Gelang Pasien 2" },
      { id: "MnGelang3", label: "Gelang Pasien 3" },
      { id: "MnGelang4", label: "Gelang Pasien 4" },
      { id: "MnGelang5", label: "Gelang Pasien 5" },
      { id: "MnGelang6", label: "Gelang Pasien 6" },
      { id: "MnGelang7", label: "Gelang Pasien 7" },
    ]
  },
  {
    id: "MnSuratSurat", label: "Surat-Surat", children: [
      { id: "MnSuratKontrol", label: "Surat Kontrol" },
      { id: "MnSuratButaWarna", label: "Surat Buta Warna" },
      { id: "MnSuratBebasTato", label: "Surat Bebas Tato" },
      { id: "MnSuratKewaspadaanKesehatan", label: "Surat Kewaspadaan Kesehatan" },
      { id: "MnCetakSuratBebasTBC", label: "Surat Keterangan Bebas TBC" },
      { id: "MnCetakSuratSehat", label: "Surat Keterangan Sehat 1" },
      { id: "MnCetakSuratSehat1", label: "Surat Keterangan Sehat 2" },
      { id: "MnCetakSuratSehat2", label: "Surat Keterangan Sehat 3" },
      { id: "MnCetakSuratSehatJiwa", label: "Surat Keterangan Kesehatan Jiwa" },
      { id: "MnCetakBebasNarkoba", label: "Surat Keterangan Bebas Narkoba" },
      { id: "MnCetakSuratSakit", label: "Surat Cuti Sakit" },
      { id: "MnCetakSuratSakitPihak2", label: "Surat Cuti Sakit Pihak Ke 2" },
      { id: "MnCetakSuratSakit1", label: "Surat Keterangan Rawat Inap" },
      { id: "MnCetakSuratHamil", label: "Surat Keterangan Hamil/Tidak Hamil" },
      { id: "MnCetakSuratCutiHamil", label: "Surat Cuti Hamil" },
      { id: "MnCetakSuratCovid", label: "Surat Keterangan Covid" },
      { id: "MnCetakSuratKeteranganLayakTerbang", label: "Surat Keterangan Layak Terbang" },
      {
        id: "MnSuratPersetujuan", label: "Persetujuan, Pernyataan & Penolakan", children: [
          { id: "MnPersetujuanUmum", label: "Persetujuan Umum" },
          { id: "MnPersetujuanPenolakanTindakan", label: "Persetujuan/Penolakan Tindakan" },
          { id: "MnPulangAtasPermintaanSendiri", label: "Pulang Atas Permintaan Sendiri" },
          { id: "MnPernyataanPasienUmum", label: "Pernyataan Pasien Umum" },
          { id: "MnPersetujuanRawatInap", label: "Persetujuan Rawat Inap" },
          { id: "MnPersetujuanPenundaanPelayanan", label: "Persetujuan Penundaan Pelayanan" },
          { id: "MnPenolakanAnjuranMedis", label: "Penolakan Anjuran Medis" },
          { id: "MnPersetujuanPemeriksaanHIV", label: "Persetujuan Pemeriksaan HIV" },
          { id: "MnPernyataanMemilihDPJP", label: "Pernyataan Memilih DPJP" },
          { id: "MnPenerimaanRanap", label: "Penerimaan Pasien Rawat Inap" },
        ]
      },
    ]
  },
  {
    id: "MnRujukan", label: "Rujukan", children: [
      { id: "MnRujuk", label: "Rujukan Keluar" },
      { id: "MnPoliInternal", label: "Poli Internal" },
    ]
  },
  {
    id: "MnBridging", label: "Bridging", children: [
      { id: "MnSEP", label: "SEP BPJS" },
      { id: "MnDataSEP", label: "Data SEP BPJS" },
      { id: "ppSuratKontrol", label: "Rencana Kontrol BPJS" },
      { id: "ppSuratPRI", label: "Perintah Rawat Inap BPJS" },
      { id: "ppProgramPRB", label: "Program PRB BPJS" },
      { id: "ppSuplesiJasaRaharja", label: "Suplesi Jasa Raharja BPJS" },
      { id: "ppDataIndukKecelakaan", label: "Data Induk Kecelakaan BPJS" },
      { id: "MnBelumTerbitSEP", label: "Belum Terbit SEP BPJS" },
      { id: "MnSudahTerbitSEP", label: "Sudah Terbit SEP BPJS" },
      { id: "MnSJP", label: "SJP Inhealth" },
      { id: "MnPCare", label: "Data PCare" },
      { id: "MnRujukSisrute", label: "Rujuk Keluar Via Sisrute" },
      { id: "ppPasienCorona", label: "Pasien Corona Kemenkes" },
      { id: "ppPerawatanCorona", label: "Perawatan Pasien Corona INACBG" },
      { id: "MnTeridentifikasiTB", label: "Teridentifikasi TB Kemenkes" },
      { id: "MnRiwayatPerawatanICareNIK", label: "Cek Riwayat Perawatan ICare BPJS Via NIK FKTL" },
      { id: "MnRiwayatPerawatanICareNoKartu", label: "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTL" },
      { id: "MnRiwayatPerawatanICareNIK1", label: "Cek Riwayat Perawatan ICare BPJS Via NIK FKTP" },
      { id: "MnRiwayatPerawatanICareNoKartu1", label: "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTP" },
    ]
  },
  {
    id: "MenuInputData", label: "Input Data", children: [
      { id: "ppCatatanPasien", label: "Catatan Untuk Pasien" },
      { id: "ppBerkasDigital", label: "Berkas Digital Perawatan" },
      { id: "ppIKP", label: "Insiden Keselamatan Pasien" },
    ]
  },
  {
    id: "MnStatus", label: "Set Status", children: [
      { id: "ppBerkasRanap", label: "Berkas R.M. Di Ranap" },
      { id: "ppBerkasDIterima", label: "Berkas R.M. Diterima" },
      { id: "MnSudah", label: "Sudah Periksa" },
      { id: "MnBelum", label: "Belum Periksa" },
      { id: "MnBatal", label: "Batal Periksa" },
      { id: "MnDirujuk", label: "Dirujuk" },
      { id: "MnDIrawat", label: "Dirawat" },
      { id: "MnMeninggal", label: "Meninggal" },
      { id: "MnPulangPaksa", label: "Pulang Paksa" },
      {
        id: "jMenu7", label: "Status Poli", children: [
          { id: "MnStatusBaru", label: "Status Poli Baru" },
          { id: "MnStatusLama", label: "Status Poli Lama" },
        ]
      },
    ]
  },
  {
    id: "MnUrut", label: "Urutkan Data Berdasar", children: [
      { id: "MnUrutNoRawatDesc", label: "No.Rawat Descending" },
      { id: "MnUrutNoRawatAsc", label: "No.Rawat Ascending" },
      { id: "MnUrutTanggalDesc", label: "Tanggal Descending" },
      { id: "MnUrutTanggalAsc", label: "Tanggal Ascending" },
      { id: "MnUrutDokterDesc", label: "Dokter Descending" },
      { id: "MnUrutDokterAsc", label: "Dokter Ascending" },
      { id: "MnUrutPoliklinikDesc", label: "Poli/Unit Descending" },
      { id: "MnUrutPoliklinikAsc", label: "Poli/Unit Ascending" },
      { id: "MnUrutPenjabDesc", label: "Cara Bayar Descending" },
      { id: "MnUrutPenjabAsc", label: "Cara Bayar Ascending" },
      { id: "MnUrutStatusDesc", label: "Status Descending" },
      { id: "MnUrutStatusAsc", label: "Status Ascending" },
      { id: "MnUrutRegDesc1", label: "No. Reg. Descending" },
      { id: "MnUrutRegAsc1", label: "No. Reg. Ascending" },
      { id: "MnUrutRMDesc", label: "No. RM. Descending" },
      { id: "MnUrutRMAsc", label: "No. RM. Ascending" },
    ]
  },
  { id: "ppTampilkanSeleksi", label: "Tampilkan Per Jenis Bayar" },
  { id: "ppTampilkanBelumDiagnosa", label: "Tampilkan Belum Masuk Diagnosa" },
  {
    id: "MnGanti", label: "Ganti", children: [
      { id: "MnPoli", label: "Poliklinik" },
      { id: "MnDokter", label: "Dokter Poli" },
      { id: "MnPenjab", label: "Jenis Bayar" },
      { id: "MnGabungNoRawat", label: "Gabung Nomor Rawat" },
    ]
  },
  {
    id: "MnHapusData", label: "Hapus Data", children: [
      { id: "MnHapusTagihanOperasi", label: "Tagihan Operasi" },
      { id: "MnHapusObatOperasi", label: "Obat Operasi" },
      { id: "MnHapusDeposit", label: "Deposit" },
      { id: "MnHapusDiet", label: "Pemberian Diet" },
      { id: "MnHapusDiagnosa", label: "Diagnosa/Penyakit" },
      { id: "MnHapusDpjp", label: "DPJP Ranap" },
      { id: "MnHapusHemodialisa", label: "Hemodialisa" },
      { id: "MnHapusKamarInap", label: "Kamar Inap" },
      { id: "MnHapusPotongan", label: "Potongan Biaya" },
      { id: "MnHapusPiutang", label: "Piutang Pasien" },
      { id: "MnHapusProsedur", label: "Prosedur Tindakan" },
      { id: "MnHapusRanapGabung", label: "Ranap Gabung" },
      { id: "MnHapusRujukKeluar", label: "Rujuk Keluar" },
      { id: "MnHapusRujukMasuk", label: "Rujuk Masuk" },
      { id: "MnHapusTambahan", label: "Tambahan Biaya" },
      { id: "MnHapusBookingOperasi", label: "Booking Operasi" },
      {
        id: "MnTindakan", label: "Tindakan", children: [
          { id: "MnHapusTindakanRanapDokter", label: "Ranap Dokter" },
          { id: "MnHapusTindakanRanapDokterParamedis", label: "Ranap Dokter & Paramedis" },
          { id: "MnHapusTindakanRanapParamedis", label: "Ranap Paramedis" },
          { id: "MnHapusTindakanRalanDokter", label: "Ralan Dokter" },
          { id: "MnHapusTindakanRalanDokterParamedis", label: "Ralan Dokter & Paramedis" },
          { id: "MnHapusTindakanRalanParamedis", label: "Ralan Paramedis" },
        ]
      },
      {
        id: "MnPemeriksaan", label: "Pemeriksaan", children: [
          { id: "MnHapusPemeriksaanRalan", label: "Ralan" },
          { id: "MnHapusPemeriksaanRanap", label: "Ranap" },
          { id: "MnHapusLab", label: "Laborat" },
          { id: "MnHapusRadiologi", label: "Radiologi" },
        ]
      },
      {
        id: "MnObat", label: "Obat", children: [
          { id: "MnHapusAturanPkaiObat", label: "Aturan Pakai Obat" },
          { id: "MnHapusObat", label: "Pemberian Obat" },
          { id: "MnHapusResepObat", label: "Resep Obat" },
          { id: "MnHapusResepPulang", label: "Resep Pulang" },
          { id: "MnHapusReturObat", label: "Retur Obat Pasien" },
          { id: "MnHapusStokObatRanap", label: "Stok Obat Ranap" },
        ]
      },
      { id: "MnHapusSemua", label: "Semua Transaksi & Registrasi" },
    ]
  },
];

const RUTE_DENGAN_NOMOR: Readonly<Record<string, string>> = {
  ppResume: "/resume-pasien",
  ppRiwayat: "/riwayat-pasien",
  MnDataRalan: "/tindakan-rawat-jalan",
  MnCopyResep: "/farmasi/copy-resep",
  MnResepDOkter: "/farmasi/resep-obat",
};

const RUTE_TANPA_NOMOR: Readonly<Record<string, string>> = {
  MnPermintaanLab: "/laboratorium/permintaan-pk",
  MnPermintaanRadiologi: "/radiologi/permintaan",
  MnPermintaanRanap: "/rawat-inap",
  MnKamarInap: "/rawat-inap",
  MnPeriksaLab: "/laboratorium/periksa-pk",
  MnPeriksaLabPA: "/laboratorium/periksa-pa",
  MnPeriksaLabMB: "/laboratorium/periksa-mb",
  MnPeriksaRadiologi: "/radiologi/periksa",
  MnPenjualan: "/farmasi/input-penjualan",
};

const URUTAN: Readonly<Record<string, { kunci: KunciSortRawatJalan; arah: "asc" | "desc" }>> = {
  MnUrutNoRawatDesc: { kunci: "no_rawat", arah: "desc" },
  MnUrutNoRawatAsc: { kunci: "no_rawat", arah: "asc" },
  MnUrutTanggalDesc: { kunci: "tanggal", arah: "desc" },
  MnUrutTanggalAsc: { kunci: "tanggal", arah: "asc" },
  MnUrutDokterDesc: { kunci: "dokter", arah: "desc" },
  MnUrutDokterAsc: { kunci: "dokter", arah: "asc" },
  MnUrutPoliklinikDesc: { kunci: "poli", arah: "desc" },
  MnUrutPoliklinikAsc: { kunci: "poli", arah: "asc" },
  MnUrutPenjabDesc: { kunci: "penjab", arah: "desc" },
  MnUrutPenjabAsc: { kunci: "penjab", arah: "asc" },
  MnUrutStatusDesc: { kunci: "status", arah: "desc" },
  MnUrutStatusAsc: { kunci: "status", arah: "asc" },
  MnUrutRegDesc1: { kunci: "no_reg", arah: "desc" },
  MnUrutRegAsc1: { kunci: "no_reg", arah: "asc" },
  MnUrutRMDesc: { kunci: "no_rm", arah: "desc" },
  MnUrutRMAsc: { kunci: "no_rm", arah: "asc" },
};

export function tentukanAksiMenu(item: ItemMenuKonteks, baris: BarisMenuKonteks): AksiMenuKonteks {
  if (item.id === "MnBelumTerbitSEP") return { jenis: "filter", label: item.label, kunci: "sep", nilai: "Belum" };
  if (item.id === "MnSudahTerbitSEP") return { jenis: "filter", label: item.label, kunci: "sep", nilai: "Sudah" };
  if (item.id === "ppTampilkanSeleksi") return { jenis: "filter", label: item.label, kunci: "penjab", nilai: baris.kd_pj };
  if (item.id === "ppTampilkanBelumDiagnosa") return { jenis: "filter", label: item.label, kunci: "belum_diagnosa", nilai: "1" };

  const ruteDenganNomor = RUTE_DENGAN_NOMOR[item.id];
  if (ruteDenganNomor) {
    return { jenis: "rute", label: item.label, rute: `${ruteDenganNomor}?no_rawat=${encodeURIComponent(baris.no_rawat)}` };
  }
  const ruteTanpaNomor = RUTE_TANPA_NOMOR[item.id];
  if (ruteTanpaNomor) return { jenis: "rute", label: item.label, rute: ruteTanpaNomor };
  const urutan = URUTAN[item.id];
  if (urutan) return { jenis: "urut", label: item.label, ...urutan };
  const umum = selesaikanAksiKonteksUmum(item, baris.no_rawat, { konteksHalaman: "ralan" });
  if (umum) return umum;
  return { jenis: "belum", label: item.label };
}

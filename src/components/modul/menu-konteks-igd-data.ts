export type FilterSepIgd = "Semua" | "Belum" | "Sudah";

export interface BarisMenuKonteks {
  no_rawat: string;
  no_reg: string;
  no_rkm_medis: string;
  nm_pasien: string;
  nm_dokter: string;
  kd_poli: string;
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
  | { jenis: "rute"; label: string; rute: string }
  | { jenis: "filter"; label: string; kunci: "sep"; nilai: Exclude<FilterSepIgd, "Semua"> }
  | { jenis: "belum"; label: string };

export const MENU_KONTEKS_IGD: ItemMenuKonteks[] = [
  {
    "id": "MnDataRM",
    "label": "Data Rekam Medis",
    "children": [
      {
        "id": "MnRMSkrining",
        "label": "Skrining",
        "children": [
          { "id": "MnSkriningMerokokUsiaSekolahRemaja", "label": "Skrining Merokok Usia Sekolah & Remaja" },
          { "id": "MnSkriningKekerasanPadaWanita", "label": "Skrining Kekerasan Pada Perempuan" },
          { "id": "MnSkriningObesitas", "label": "Skrining Obesitas" },
          {
            "id": "MnRMSkriningRisikoKanker",
            "label": "Skrining Kanker",
            "children": [
              { "id": "MnSkriningRisikoKankerPayudara", "label": "Skrining Risiko Kanker Payudara" },
              { "id": "MnSkriningRisikoKankerParu", "label": "Skrining Risiko Kanker Paru" },
              { "id": "MnSkriningRisikoKankerServiks", "label": "Skrining Risiko Kanker Serviks" },
              { "id": "MnSkriningKankerKolorektal", "label": "Skrining Kanker Kolorektal" }
            ]
          },
          {
            "id": "MnRMSkriningKesehatanGigiMulut",
            "label": "Skrining Kesehatan Gigi & Mulut",
            "children": [
              { "id": "MnSkriningKesehatanGigiMulutRemaja", "label": "Usia Remaja" },
              { "id": "MnSkriningKesehatanGigiMulutBalita", "label": "Usia Balita" },
              { "id": "MnSkriningKesehatanGigiMulutDewasa", "label": "Usia Dewasa" },
              { "id": "MnSkriningKesehatanGigiMulutLansia", "label": "Usia Lansia" }
            ]
          },
          { "id": "MnSkriningTBC", "label": "Skrining TBC" },
          { "id": "MnSkriningPUMA", "label": "Skrining PUMA" },
          { "id": "MnSkriningAdiksiNikotin", "label": "Skrining Adiksi Nikotin" },
          { "id": "MnSkriningThalassemia", "label": "Skrining Thalassemia" },
          {
            "id": "MnSkriningInstrumen",
            "label": "Skrining Istrumen",
            "children": [
              { "id": "MnSkriningInstrumenSDQ", "label": "SDQ" },
              { "id": "MnSkriningInstrumenSRQ", "label": "SRQ" },
              { "id": "MnSkriningInstrumenACRS", "label": "ACRS" },
              { "id": "MnSkriningInstrumenMentalEmosional", "label": "Mental Emosional" }
            ]
          },
          { "id": "MnSkriningDiabetesMelitus", "label": "Skrining Diabetes Melitus" },
          { "id": "MnSkriningAnemia", "label": "Skrining Anemia" },
          { "id": "MnSkriningHipertensi", "label": "Skrining Hipertensi" },
          { "id": "MnSkriningKesehatanPenglihatan", "label": "Skrining Kesehatan Penglihatan" },
          { "id": "MnSkriningIndraPendengaran", "label": "Skrining Indra Pendengaran" },
          { "id": "MnSkriningFrailtySyndrome", "label": "Skrining Frailty Syndrome" }
        ]
      },
      {
        "id": "MnRMIGD",
        "label": "RM Gawat Darurat",
        "children": [
          { "id": "MnDataTriaseIGD", "label": "Data Triase Gawat Darurat" },
          { "id": "MnPenilaianAwalKeperawatanIGD", "label": "Pengkajian Awal Keperawatan IGD" },
          { "id": "MnPeniliaianAwalMedisIGD", "label": "Pengkajian Awal Medis IGD" },
          { "id": "MnPeniliaianAwalMedisIGDPsikiatri", "label": "Pengkajian Awal Medis IGD Psikiatri" },
          { "id": "MnPenilaianPasienKeracunan", "label": "Pengkajian Pasien Keracunan" },
          { "id": "MnPengkajianRestrain", "label": "Pengkajian Restrain" },
          { "id": "MnPemantauanPEWSAnak", "label": "Pemantauan PEWS Anak" },
          { "id": "MnPemantauanPEWSDewasa", "label": "Pemantauan EWS Dewasa" },
          { "id": "MnPemantauanMEOWS", "label": "Pemantauan MEOWS Obstetri" },
          { "id": "MnPemantauanEWSNeonatus", "label": "Pemantauan EWS Neonatus" },
          { "id": "MnPeniliaianAwalMedisHemodialisa", "label": "Pengkajian Awal Medis Hemodialisa" },
          { "id": "MnHasilPemeriksaanEKG", "label": "Hasil Pemeriksaan EKG" },
          { "id": "MnHasilPemeriksaanECHO", "label": "Hasil Pemeriksaan ECHO" },
          { "id": "MnHasilPemeriksaanSlitLamp", "label": "Hasil Pemeriksaan Slit Lamp" },
          { "id": "MnHasilPemeriksaanOCT", "label": "Hasil Pemeriksaan OCT" }
        ]
      },
      {
        "id": "MnRMOperasi",
        "label": "RM Operasi",
        "children": [
          { "id": "MnPenilaianPreInduksi", "label": "Pengkajian Pre Induksi" },
          { "id": "MnChecklistPreOperasi", "label": "Check List Pre Operasi" },
          { "id": "MnSignInSebelumAnestesi", "label": "Sign-In Sebelum Anestesi" },
          { "id": "MnTimeOutSebelumInsisi", "label": "Time-Out Sebelum Insisi" },
          { "id": "MnSignOutSebelumMenutupLuka", "label": "Sign-Out Sebelum Menutup Luka" },
          { "id": "MnChecklistPostOperasi", "label": "Check List Post Operasi" },
          { "id": "MnPenilaianPreOp", "label": "Pengkajian Pre Operasi" },
          { "id": "MnCatatanAnastesiSedasi", "label": "Catatan Anestesi-Sedasi" },
          { "id": "MnPenilaianPreAnestesi", "label": "Pengkajian Pre Anestesi" },
          { "id": "MnCheckListKesiapanAnestesi", "label": "Check List Kesiapan Anestesi" },
          { "id": "MnSkorAldrettePascaAnestesi", "label": "Skor Aldrette Pasca Anestesi" },
          { "id": "MnSkorStewardPascaAnestesi", "label": "Skor Steward Pasca Anestesi" },
          { "id": "MnSkorBromagePascaAnestesi", "label": "Skor Bromage Pasca Anestesi" },
          { "id": "MnCatatanPengkajianPaskaOperasi", "label": "Catatan Pengkajian Paska Operasi" }
        ]
      },
      {
        "id": "MnRMHCU",
        "label": "RM HCU & ICU",
        "children": [
          { "id": "MnCheckListKriteriaMasukHCU", "label": "Check List Kriteria Masuk HCU" },
          { "id": "MnCheckListKriteriaMasukICU", "label": "Check List Kriteria Masuk ICU" }
        ]
      },
      {
        "id": "MnRMRisikoJatuh",
        "label": "Risiko Jatuh & Fungsional",
        "children": [
          { "id": "MnPenilaianRisikoJatuhDewasa", "label": "Pengkajian Lanjutan Risiko Jatuh Dewasa" },
          { "id": "MnPenilaianRisikoJatuhAnak", "label": "Pengkajian Lanjutan Risiko Jatuh Anak" },
          { "id": "MnPenilaianRisikoJatuhLansia", "label": "Pengkajian Lanjutan Risiko Jatuh Lansia" },
          { "id": "MnPenilaianRisikoJatuhNeonatus", "label": "Pengkajian Lanjutan Risiko Jatuh Neonatus" },
          { "id": "MnPenilaianRisikoJatuhGeriatri", "label": "Pengkajian Lanjutan Risiko Jatuh Geriatri" },
          { "id": "MnPenilaianRisikoJatuhPsikiatri", "label": "Pengkajian Lanjutan Risiko Jatuh Psikiatri" },
          { "id": "MnPenilaianLanjutanSkriningFungsional", "label": "Pengkajian Lanjutan Skrining Fungsional" }
        ]
      },
      {
        "id": "MnPenilaianLain",
        "label": "Pengkajian Lain-lain",
        "children": [
          { "id": "MnPenilaianTambahanGeriatri", "label": "Pengkajian Tambahan Pasien Geriatri" },
          { "id": "MnPenilaianTambahanBunuhDiri", "label": "Pengkajian Tambahan Bunuh Diri" },
          { "id": "MnPenilaianTambahanPerilakuKekerasan", "label": "Pengkajian Tambahan Perilaku Kekerasan" },
          { "id": "MnPenilaianTambahanMelarikanDiri", "label": "Pengkajian Tambahan Melarikan Diri" },
          { "id": "MnPenilaianPasienTerminal", "label": "Pengkajian Pasien Terminal" },
          { "id": "MnPenilaianKorbanKekerasan", "label": "Pengkajian Korban Kekerasan" },
          { "id": "MnPenilaianPasienPenyakitMenular", "label": "Pengkajian Pasien Penyakit Menular" },
          { "id": "MnPenilaianPasienImunitasRendah", "label": "Pengkajian Pasien Imunitas Rendah" },
          { "id": "MnPenilaianDerajatDehidrasi", "label": "Pengkajian Derajat Dehidrasi" },
          { "id": "MnPenilaianFisioterapi", "label": "Pengkajian Awal Fisioterapi" },
          { "id": "MnPenilaianPsikolog", "label": "Pengkajian Psikologi" },
          { "id": "MnPenilaianPsikologKlinis", "label": "Pengkajian Psikologi Klinis" },
          { "id": "MnHemodialisa", "label": "Hemodialisa" },
          { "id": "MnPenilaianBayiBaruLahir", "label": "Pengkajian Bayi Baru Lahir" }
        ]
      },
      {
        "id": "MnRMFarmasi",
        "label": "RM Farmasi",
        "children": [
          { "id": "MnKonselingFarmasi", "label": "Konseling Farmasi" },
          { "id": "MnRekonsiliasiObat", "label": "Rekonsiliasi Obat" }
        ]
      },
      {
        "id": "MnRMCatatanMonitoring",
        "label": "Catatan & Monitoring",
        "children": [
          { "id": "MnCatatanCekGDS", "label": "Catatan Cek GDS" },
          { "id": "MnMonitoringReaksiTranfusi", "label": "Monitoring Reaksi Tranfusi" },
          { "id": "MnPenilaianUlangNyeri", "label": "Pengkajian Ulang Nyeri" },
          { "id": "MnCatatanKeperawatan", "label": "Catatan Keperawatan" },
          { "id": "MnCatatanPersalinan", "label": "Catatan Persalinan" },
          { "id": "MnCatatanKeseimbanganCairan", "label": "Keseimbangan Cairan" },
          { "id": "MnCatatanObservasiIGD", "label": "Observasi IGD" },
          { "id": "MnCatatanObservasiCHBP", "label": "Observasi CHBP" },
          { "id": "MnCatatanObservasiInduksiPersalinan", "label": "Observasi Induksi Persalinan" },
          { "id": "MnCatatanObservasiBayi", "label": "Observasi Bayi" },
          { "id": "MnCatatanObservasiHemodialisa", "label": "Observasi Hemodialisa" },
          { "id": "MnCatatanCairanHemodialisa", "label": "Catatan Cairan Hemodialisa" },
          { "id": "MnChecklistPemberianFibrinolitik", "label": "Check List Pemberian Fibrinolistik" },
          { "id": "MnLaporanTindakan", "label": "Laporan Tindakan" }
        ]
      },
      {
        "id": "MnGizi",
        "label": "RM Gizi",
        "children": [
          { "id": "ppSkriningNutrisiDewasa", "label": "Skrining Nutrisi Pasien Dewasa" },
          { "id": "ppSkriningNutrisiLansia", "label": "Skrining Nutrisi Pasien Lansia" },
          { "id": "ppSkriningNutrisiAnak", "label": "Skrining Nutrisi Pasien Anak" },
          { "id": "ppSkriningGizi", "label": "Skrining Gizi Lanjut" },
          { "id": "ppAsuhanGizi", "label": "Asuhan Gizi" },
          { "id": "ppMonitoringAsuhanGizi", "label": "Monitoring Gizi" },
          { "id": "ppCatatanADIMEGizi", "label": "Catatan ADIME Gizi" }
        ]
      },
      { "id": "MnTransferAntarRuang", "label": "Transfer Antar Ruang" },
      {
        "id": "MnEdukasi",
        "label": "Edukasi",
        "children": [
          { "id": "MnEdukasiPasienKeluarga", "label": "Asesmen Edukasi Pasien & Keluarga" },
          { "id": "MnPelaksanaanInformasiEdukasi", "label": "Pelaksanaan Informasi & Edukasi" }
        ]
      },
      { "id": "ppResume", "label": "Data Resume Pasien" },
      { "id": "MnPerintahLisan", "label": "Perintah Lisan dan Pelaporan Nilai Kritis" },
      { "id": "ppRiwayat", "label": "Riwayat Perawatan" },
      { "id": "ppDeteksiDIniCorona", "label": "Deteksi Dini Corona" }
    ]
  },
  {
    "id": "MnPermintaan",
    "label": "Permintaan",
    "children": [
      { "id": "MnJadwalOperasi", "label": "Jadwal Operasi" },
      { "id": "MnPermintaanLab", "label": "Pemeriksaan Lab" },
      { "id": "MnPermintaanRadiologi", "label": "Pemeriksaan Radiologi" },
      { "id": "MnPermintaanRanap", "label": "Rawat Inap" },
      { "id": "MnPermintaanInformasiObat", "label": "Informasi Obat" }
    ]
  },
  { "id": "MnKamarInap", "label": "Kamar Inap" },
  {
    "id": "MnTindakan",
    "label": "Tindakan & Pemeriksaan",
    "children": [
      { "id": "MnRawatJalan", "label": "Tagihan/Tindakan Rawat Jalan" },
      { "id": "MnPeriksaLab", "label": "Periksa Laborat" },
      { "id": "MnPeriksaLabPA", "label": "Periksa Laborat PA" },
      { "id": "MnPeriksaLabMB", "label": "Periksa Laborat MB" },
      { "id": "MnPeriksaRadiologi", "label": "Periksa Radiologi" },
      { "id": "MnOperasi", "label": "Tagihan Operasi/VK" },
      { "id": "MnDataOperasi", "label": "Data Operasi" }
    ]
  },
  {
    "id": "MnObat",
    "label": "Obat",
    "children": [
      { "id": "MnResepDOkter", "label": "Input Resep Dokter" },
      { "id": "MnNoResep", "label": "Input No.Resep" },
      { "id": "MnPemberianObat", "label": "Pemberian Obat/BHP" },
      { "id": "MnCopyResep", "label": "Copy Resep Dokter" }
    ]
  },
  {
    "id": "MnPilihBilling",
    "label": "Billing/Pembayaran Pasien",
    "children": [
      { "id": "MnBillingParsial", "label": "Billing Parsial" },
      { "id": "MnBilling", "label": "Billing Total" }
    ]
  },
  {
    "id": "jMenu1",
    "label": "Laporan",
    "children": [
      { "id": "MnLaporanRekapKunjunganPoli", "label": "Laporan Rekap Kunjungan Per Poli" },
      { "id": "MnLaporanRekapKunjunganDokter", "label": "Laporan Rekap Kunjungan Per Dokter" },
      { "id": "MnLaporanRekapJenisBayar", "label": "Laporan RL 315 Cara bayar" },
      { "id": "MnLaporanRekapRawatDarurat", "label": "Laporan RL 32 Rawat Darurat" },
      { "id": "MnLaporanRekapKunjunganBulanan", "label": "Laporan RL 51" },
      { "id": "MnLaporanRekapKunjunganBulananPoli", "label": "Laporan RL 52" },
      { "id": "MnLaporanRekapPenyakitRalan", "label": "Laporan RL 53 Penyakit Ralan" }
    ]
  },
  {
    "id": "jMenu2",
    "label": "Grafik Analisa",
    "children": [
      { "id": "ppGrafikPerpoli", "label": "Grafik Kunjungan Per Poli" },
      { "id": "ppGrafikPerdokter", "label": "Grafik Kunjungan Per Dokter" },
      { "id": "ppGrafikPerJK", "label": "Grafik Kunjungan Per Jenis Kelamin" },
      { "id": "ppGrafikPerPekerjaan", "label": "Grafik Kunjungan Per Pekerjaan" },
      { "id": "ppGrafikPerAgama", "label": "Grafik Kunjungan Per Agama" },
      { "id": "ppGrafikPerTahun", "label": "Grafik Kunjungan Per Tahun" },
      { "id": "ppGrafikPerBulan", "label": "Grafik Kunjungan Per Bulan" },
      { "id": "ppGrafikPerTanggal", "label": "Grafik Kunjungan Per Tanggal" },
      { "id": "ppGrafikDemografi", "label": "Demografi Pendaftar" }
    ]
  },
  {
    "id": "MnSuratSurat",
    "label": "Surat-Surat",
    "children": [
      { "id": "SuratKontrol", "label": "Surat Kontrol" },
      { "id": "MnSuratButaWarna", "label": "Surat Buta Warna" },
      { "id": "MnSuratBebasTato", "label": "Surat Bebas Tato" },
      { "id": "MnSuratKewaspadaanKesehatan", "label": "Surat Kewaspadaan Kesehatan" },
      { "id": "MnCetakSuratBebasTBC", "label": "Surat Keterangan Bebas TBC" },
      { "id": "MnCetakSuratSakit", "label": "Surat Cuti Sakit" },
      { "id": "MnCetakSuratSakit2", "label": "Surat Keterangan Rawat Inap" },
      { "id": "MnCetakSuratSakitPihak2", "label": "Surat Cuti Sakit Pihak Ke 2" },
      { "id": "MnCetakSuratHamil", "label": "Surat Keterangan Hamil/Tidak Hamil" },
      { "id": "MnCetakSuratCutiHamil", "label": "Surat Cuti Hamil" },
      { "id": "MnCetakSuratCovid", "label": "Surat Keterangan Covid" },
      { "id": "MnCetakBebasNarkoba", "label": "Surat Keterangan Bebas Narkoba" },
      { "id": "MnCetakSuratKeteranganLayakTerbang", "label": "Surat Keterangan Layak Terbang" },
      {
        "id": "jMenu8",
        "label": "Administrasi",
        "children": [
          { "id": "MnCetakRegister", "label": "Bukti Register 1" },
          { "id": "MnCetakRegister2", "label": "Bukti Register 2" },
          { "id": "MnCetakRegister1", "label": "Bukti Register 3" },
          { "id": "MnLembarCasemix", "label": "Lembar Casemix" },
          { "id": "MnLembarCasemix1", "label": "Lembar Casemix 2" },
          { "id": "MnSPBK", "label": "Surat Bukti Pelayanan Kesehatan (SBPK)" },
          { "id": "MnSPBK1", "label": "Surat Bukti Pelayanan Kesehatan (SBPK) 2" },
          { "id": "MnJKRA", "label": "Surat Jaminan Kesehatan Nasional (JKRA) Rawat Jalan" },
          { "id": "MnLembarRalan", "label": "Lembar Rawat Jalan" },
          { "id": "MnBlangkoResep", "label": "Blanko Resep" },
          { "id": "MnSuratJaminanPelayananIGD", "label": "Surat Jaminan Pelayanan BPJS" },
          { "id": "MnLembarKeluarMasuk2", "label": "Lembar Masuk Keluar" }
        ]
      },
      {
        "id": "MnSuratPersetujuan",
        "label": "Persetujuan, Pernyataan & Penolakan",
        "children": [
          { "id": "MnPersetujuanUmum", "label": "Persetujuan Umum" },
          { "id": "MnPersetujuanPenolakanTindakan", "label": "Persetujuan/Penolakan Tindakan" },
          { "id": "MnPulangAtasPermintaanSendiri", "label": "Pulang Atas Permintaan Sendiri" },
          { "id": "MnPernyataanPasienUmum", "label": "Pernyataan Pasien Umum" },
          { "id": "MnPersetujuanRawatInap", "label": "Persetujuan Rawat Inap" },
          { "id": "MnPersetujuanPenundaanPelayanan", "label": "Persetujuan Penundaan Pelayanan" },
          { "id": "MnPenolakanAnjuranMedis", "label": "Penolakan Anjuran Medis" },
          { "id": "MnPersetujuanPemeriksaanHIV", "label": "Persetujuan Pemeriksaan HIV" },
          { "id": "MnPernyataanMemilihDPJP", "label": "Pernyataan Memilih DPJP" },
          { "id": "MnPenerimaanRanap", "label": "Penerimaan Pasien Rawat Inap" }
        ]
      }
    ]
  },
  {
    "id": "MnGelang",
    "label": "Label & Barcode",
    "children": [
      { "id": "MnGelang1", "label": "Gelang Pasien 1" },
      { "id": "MnGelang2", "label": "Gelang Pasien 2" },
      { "id": "MnGelang3", "label": "Gelang Pasien 3" },
      { "id": "MnGelang4", "label": "Gelang Pasien 4" },
      { "id": "MnGelang5", "label": "Gelang Pasien 5" },
      { "id": "MnGelang6", "label": "Gelang Pasien 6" },
      { "id": "MnLabelTracker", "label": "Label Tracker 1" },
      { "id": "MnLabelTracker1", "label": "Label Tracker 2" },
      { "id": "MnLabelTracker2", "label": "Label Tracker 3" },
      { "id": "MnLabelTracker3", "label": "Label Tracker 4" },
      { "id": "MnBarcode1", "label": "Barcode Perawatan 1" },
      { "id": "MnBarcode2", "label": "Barcode Perawatan 2" },
      { "id": "MnBarcode3", "label": "Barcode RM" },
      { "id": "MnBarcode", "label": "Barcode Perawatan" },
      { "id": "MnBarcodeRM9", "label": "Label Rekam Medis 10" }
    ]
  },
  {
    "id": "jMenu5",
    "label": "Lembar Periksa Pasien",
    "children": [
      { "id": "MnCheckList4", "label": "Lembar Periksa Pasien Kanan" },
      { "id": "MnCheckList5", "label": "Lembar Periksa Pasien Kiri" },
      { "id": "MnCheckList6", "label": "Lembar Periksa Pasien Kanan 2" },
      { "id": "MnCheckList7", "label": "Lembar Periksa Pasien Kiri 2" },
      { "id": "MnCheckList8", "label": "Lembar Periksa Pasien Kanan 3" },
      { "id": "MnCheckList9", "label": "Lembar Periksa Pasien Kiri 3" }
    ]
  },
  {
    "id": "jMenu3",
    "label": "Check List Kelengkapan Pendaftaran",
    "children": [
      { "id": "MnCheckList", "label": "Check List Kelengkapan Pendaftaran Kanan" },
      { "id": "MnCheckList1", "label": "Check List Kelengkapan Pendaftaran Kiri" },
      { "id": "MnCheckList2", "label": "Check List Kelengkapan Pendaftaran Kanan+Tracker" },
      { "id": "MnCheckList3", "label": "Check List Kelengkapan Pendaftaran Kiri+Tracker" }
    ]
  },
  {
    "id": "MnRujukan",
    "label": "Rujukan",
    "children": [
      { "id": "MnRujuk", "label": "Rujukan Keluar" },
      { "id": "MnRujukMasuk", "label": "Rujukan Masuk" },
      { "id": "MnPoliInternal", "label": "Poli Internal" }
    ]
  },
  {
    "id": "MnBridging",
    "label": "Bridging",
    "children": [
      { "id": "MnSEP", "label": "SEP BPJS" },
      { "id": "ppSuratKontrol", "label": "Rencana Kontrol BPJS" },
      { "id": "ppSuratPRI", "label": "Perintah Rawat Inap BPJS" },
      { "id": "ppProgramPRB", "label": "Program PRB BPJS" },
      { "id": "ppSuplesiJasaRaharja", "label": "Suplesi Jasa Raharja BPJS" },
      { "id": "ppDataIndukKecelakaan", "label": "Data Induk Kecelakaan BPJS" },
      { "id": "MnBelumTerbitSEP", "label": "Belum Terbit SEP BPJS" },
      { "id": "MnSudahTerbitSEP", "label": "Sudah Terbit SEP BPJS" },
      { "id": "MnSJP", "label": "SJP Inhealth" },
      { "id": "MnPCare", "label": "Data PCare" },
      { "id": "MnRujukSisrute", "label": "Rujuk Keluar Via Sisrute" },
      { "id": "ppPerawatanCorona", "label": "Perawatan Pasien Corona INACBG" },
      { "id": "ppPasienCorona", "label": "Pasien Corona Kemenkes" },
      { "id": "MnTeridentifikasiTB", "label": "Teridentifikasi TB Kemenkes" },
      { "id": "MnRiwayatPerawatanICareNIK", "label": "Cek Riwayat Perawatan ICare BPJS Via NIK FKTL" },
      { "id": "MnRiwayatPerawatanICareNoKartu", "label": "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTL" },
      { "id": "MnRiwayatPerawatanICareNIK1", "label": "Cek Riwayat Perawatan ICare BPJS Via NIK FKTP" },
      { "id": "MnRiwayatPerawatanICareNoKartu1", "label": "Cek Riwayat Perawatan ICare BPJS Via No.Kartu FKTP" }
    ]
  },
  {
    "id": "MenuInputData",
    "label": "Input Data",
    "children": [
      { "id": "MnDiagnosa", "label": "Diagnosa Pasien" },
      { "id": "ppCatatanPasien", "label": "Catatan Untuk Pasien" },
      { "id": "ppBerkasDigital", "label": "Berkas Digital Perawatan" },
      { "id": "ppIKP", "label": "Insiden Keselamatan Pasien" }
    ]
  },
  {
    "id": "MnHapusData",
    "label": "Hapus & Ubah Data",
    "children": [
      { "id": "MnHapusTagihanOperasi", "label": "Hapus Tagihan Operasi" },
      { "id": "MnHapusObatOperasi", "label": "Hapus Obat Operasi" },
      { "id": "MnGabungNoRawat", "label": "Gabung Nomor Rawat" },
      {
        "id": "MnStatus",
        "label": "Set Status",
        "children": [
          { "id": "ppBerkas", "label": "Berkas R.M. Diterima" },
          { "id": "MnSudah", "label": "Sudah Periksa" },
          { "id": "MnBelum", "label": "Belum Periksa" },
          { "id": "MnBatal", "label": "Batal Periksa" },
          { "id": "MnDirujuk", "label": "Dirujuk" },
          { "id": "MnDIrawat", "label": "Dirawat" },
          { "id": "MnMeninggal", "label": "Meninggal" },
          { "id": "MnPulangPaksa", "label": "Pulang Paksa" },
          {
            "id": "jMenu7",
            "label": "Status Poli",
            "children": [
              { "id": "MnStatusBaru", "label": "Status Poli Baru" },
              { "id": "MnStatusLama", "label": "Status Poli Lama" }
            ]
          }
        ]
      }
    ]
  }
];

const RUTE_DENGAN_NOMOR: Readonly<Record<string, string>> = {
  ppResume: "/resume-pasien",
  ppRiwayat: "/riwayat-pasien",
  MnDiagnosa: "/tindakan-rawat-jalan",
  MnRawatJalan: "/tindakan-rawat-jalan",
  MnResepDOkter: "/farmasi/resep-obat",
  MnCopyResep: "/farmasi/copy-resep",
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
  return { jenis: "belum", label: item.label };
}

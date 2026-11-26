import { selesaikanAksiKonteksUmum, type AksiKonteksUmum } from "./peta-rute-konteks";

export type KunciSortRawatInap =
  | "no_rawat"
  | "penjab"
  | "no_rm"
  | "nama"
  | "kamar"
  | "tanggal_masuk";

export interface BarisMenuKonteks {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  p_jawab: string | null;
  kd_kamar: string;
  nm_bangsal: string | null;
  tgl_masuk: string;
  jam_masuk: string;
}

export interface ItemMenuKonteks {
  id: string;
  label: string;
  children?: ItemMenuKonteks[];
}

export type AksiMenuKonteks =
  | AksiKonteksUmum
  | { jenis: "filter"; label: string; kunci: "sep"; nilai: "Belum" | "Sudah" }
  | { jenis: "urut"; label: string; kunci: KunciSortRawatInap; arah: "asc" | "desc" }
  | { jenis: "belum"; label: string };

export function kunciBarisRawatInap(item: {
  no_rawat?: unknown;
  tgl_masuk?: unknown;
  jam_masuk?: unknown;
  kd_kamar?: unknown;
}) {
  return [item.no_rawat, item.tgl_masuk, item.jam_masuk, item.kd_kamar]
    .map((nilai) => String(nilai ?? ""))
    .join("|");
}

export const MENU_KONTEKS_RAWAT_INAP: ItemMenuKonteks[] = [
  {
    "id": "MnDataRM", "label": "Data Rekam Medis", "children": [
      {
        "id": "MnPenilaianAwal", "label": "Pengkajian Awal", "children": [
          { "id": "MnPenilaianAwalKeperawatanRanap", "label": "Keperawatan Umum" },
          { "id": "MnPenilaianAwalKeperawatanKebidanan", "label": "Keperawatan Kebidanan & Kandungan" },
          { "id": "MnPenilaianAwalKeperawatanRanapNeonatus", "label": "Keperawatan Neonatus" },
          { "id": "MnPenilaianAwalKeperawatanRanapBayiAnak", "label": "Keperawatan Bayi/Anak" },
          { "id": "MnPenilaianAwalMedisRanap", "label": "Medis Umum" },
          { "id": "MnPenilaianBayiBaruLahir", "label": "Pengkajian Bayi Baru Lahir" },
          { "id": "MnPenilaianAwalMedisNeonatus", "label": "Medis Neonatus" },
          { "id": "MnPenilaianAwalMedisKandungan", "label": "Medis Kebidanan & Kandungan" },
          { "id": "MnPenilaianAwalMedisHemodialisa", "label": "Medis Hemodialisa" },
          { "id": "MnPenilaianFisioterapi", "label": "Fisioterapi" },
        ]
      },
      {
        "id": "MnRMOperasi", "label": "RM Operasi", "children": [
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
          { "id": "MnCatatanPengkajianPaskaOperasi", "label": "Catatan Pengkajian Paska Operasi" },
          { "id": "MnAssesmenPreOperasi", "label": "Assesment Keperawatan Pra-Operasi" },
          { "id": "MnPenandaanOperasiMata", "label": "Penandaan Operasi Mata" },
        ]
      },
      {
        "id": "MnRMHCU", "label": "RM HCU  & ICU", "children": [
          { "id": "MnCheckListKriteriaMasukHCU", "label": "Check List Kriteria Masuk HCU" },
          { "id": "MnCheckListKriteriaKeluarHCU", "label": "Check List Kriteria Keluar HCU" },
          { "id": "MnCheckListKriteriaMasukICU", "label": "Check List Kriteria Masuk ICU" },
          { "id": "MnCheckListKriteriaKeluarICU", "label": "Check List Kriteria Keluar ICU" },
        ]
      },
      { "id": "MnUjiFungsiKFR", "label": "Uji Fungsi/Prosedur KFR" },
      {
        "id": "MnRMRisikoJatuh", "label": "Risiko Jatuh, Fungsional & Dekubitas", "children": [
          { "id": "MnPenilaianRisikoJatuhDewasa", "label": "Pengkajian Lanjutan Risiko Jatuh Dewasa" },
          { "id": "MnPenilaianRisikoJatuhAnak", "label": "Pengkajian Lanjutan Risiko Jatuh Anak" },
          { "id": "MnPenilaianRisikoJatuhLansia", "label": "Pengkajian Lanjutan Risiko Jatuh Lansia" },
          { "id": "MnPenilaianRisikoJatuhNeonatus", "label": "Pengkajian Lanjutan Risiko Jatuh Neonatus" },
          { "id": "MnPenilaianRisikoJatuhGeriatri", "label": "Pengkajian Lanjutan Risiko Jatuh Geriatri" },
          { "id": "MnPenilaianRisikoJatuhPsikiatri", "label": "Pengkajian Lanjutan Risiko Jatuh Psikiatri" },
          { "id": "MnPenilaianLanjutanSkriningFungsional", "label": "Pengkajian Lanjutan Skrining Fungsional" },
          { "id": "MnPenilaianRisikoDikubitus", "label": "Pengkajian Risiko Dekubitus" },
        ]
      },
      {
        "id": "MnPenilaianLain", "label": "Pengkajian Lain-lain", "children": [
          { "id": "MnPenilaianTambahanGeriatri", "label": "Pengkajian Tambahan Pasien Geriatri" },
          { "id": "MnPenilaianTambahanBunuhDiri", "label": "Pengkajian Tambahan Bunuh Diri" },
          { "id": "MnPenilaianTambahanPerilakuKekerasan", "label": "Pengkajian Tambahan Perilaku kekerasan" },
          { "id": "MnPenilaianTambahanMalarikanDiri", "label": "Pengkajian Tambahan Melarikan Diri" },
          { "id": "MnPenilaianPasienTerminal", "label": "Pengkajian Pasien Terminal" },
          { "id": "MnPenilaianKorbanKekerasan", "label": "Pengkajian Korban Kekerasan" },
          { "id": "MnPenilaianKecemasanAnak", "label": "Pengkajian Kecemasan Pasien Anak" },
          { "id": "MnPenilaianPasienPenyakitMenular", "label": "Pengkajian Pasien Penyakit Menular" },
          { "id": "MnPenilaianPasienImunitasRendah", "label": "Pengkajian Pasien Imunitas Rendah" },
          { "id": "MnPenilaianDerajatDehidrasi", "label": "Pengkajian Derajat Dehidrasi" },
          { "id": "MnPenilaianPsikolog", "label": "Pengkajian Psikologi" },
          { "id": "MnPenilaianPsikologKlinis", "label": "Pengkajian Psikologi Klinis" },
          { "id": "MnHemodialisa", "label": "Hemodialisa" },
          { "id": "MnPengkajianRestrain", "label": "Pengkajian Restrain" },
        ]
      },
      {
        "id": "MnPemantauanPEWS", "label": "Pemantauan EWS", "children": [
          { "id": "MnPemantauanPEWSAnak", "label": "Anak" },
          { "id": "MnPemantauanPEWSDewasa", "label": "Dewasa" },
          { "id": "MnPemantauanMEOWS", "label": "Obstetri" },
          { "id": "MnPemantauanEWSNeonatus", "label": "Neonatus" },
        ]
      },
      {
        "id": "MnRMFarmasi", "label": "RM Farmasi", "children": [
          { "id": "MnKonselingFarmasi", "label": "Konseling Farmasi" },
          { "id": "MnRekonsiliasiObat", "label": "Rekonsiliasi Obat" },
        ]
      },
      {
        "id": "MnObservasi", "label": "Catatan & Dokumentasi", "children": [
          {
            "id": "MnCatatanObservasi", "label": "Observasi", "children": [
              { "id": "MnCatatanObservasiRanap", "label": "Observasi Rawat Inap" },
              { "id": "MnCatatanObservasiRanapKebidanan", "label": "Observasi Rawat Inap Kebidanan" },
              { "id": "MnCatatanObservasiRanapPostPartum", "label": "Observasi Rawat Inap Post Partum" },
              { "id": "MnCatatanObservasiCHBP", "label": "Observasi CHBP" },
              { "id": "MnCatatanObservasiInduksiPersalinan", "label": "Observasi Induksi Persalinan" },
              { "id": "MnCatatanObservasiBayi", "label": "Observasi Bayi" },
              { "id": "MnCatatanObservasiRestrainNonFarmakologi", "label": "Observasi Restrain Nonfarmakologi" },
              { "id": "MnCatatanObservasiVentilator", "label": "Observasi Ventilatori" },
              { "id": "MnCatatanObservasiHemodialisa", "label": "Observasi Hemodialisa" },
            ]
          },
          { "id": "MnFollowUpDBD", "label": "Follow Up DBD" },
          { "id": "MnCatatanKeperawatan", "label": "Catatan Keperawatan" },
          { "id": "MnCatatanCekGDS", "label": "Cek GDS" },
          { "id": "MnMonitoringReaksiTranfusi", "label": "Monitoring Reaksi Tranfusi" },
          {
            "id": "MnHasilUSG", "label": "Hasil USG", "children": [
              { "id": "MnHasilPemeriksaanUSG", "label": "Hasil USG Kandungan" },
              { "id": "MnHasilPemeriksaanUSGUrologi", "label": "Hasil USG Urologi" },
              { "id": "MnHasilPemeriksaanUSGNeonatus", "label": "Hasil USG Neonatus" },
              { "id": "MnHasilPemeriksaanUSGGynecologi", "label": "Hasil USG Gynecologi" },
            ]
          },
          { "id": "MnHasilPemeriksaanEKG", "label": "Hasil Pemeriksaan EKG" },
          { "id": "MnHasilPemeriksaanECHO", "label": "Hasil Pemeriksaan ECHO" },
          { "id": "MnHasilPemeriksaanSlitLamp", "label": "Hasil Pemeriksaan Slit Lamp" },
          { "id": "MnHasilPemeriksaanOCT", "label": "Hasil Pemeriksaan OCT" },
          {
            "id": "MnHasilEndoskopi", "label": "Hasil Endoskopi", "children": [
              { "id": "MnHasilEndoskopiFaringLaring", "label": "Hasil Endoskopi Faring/Laring" },
              { "id": "MnHasilEndoskopiHidung", "label": "Hasil Endoskopi Hidung" },
              { "id": "MnHasilEndoskopiTelinga", "label": "Hasil Endoskopi Telinga" },
            ]
          },
          { "id": "MnDokumentasiTindakanESWL", "label": "Dokumentasi Tindakan ESWL" },
          { "id": "MnPenilaianUlangNyeri", "label": "Pengkajian Ulang Nyeri" },
          { "id": "MnCatatanPersalinan", "label": "Catatan Persalinan" },
          { "id": "MnCatatanKeseimbanganCairan", "label": "Keseimbangan Cairan" },
          { "id": "MnCatatanCairanHemodialisa", "label": "Catatan Cairan Hemodialisa" },
          { "id": "MnChecklistPemberianFibrinolitik", "label": "Check List Pemberian Fibrinolistik" },
          { "id": "MnLaporanTindakan", "label": "Laporan Tindakan" },
        ]
      },
      { "id": "MnDiagnosa", "label": "Diagnosa" },
      {
        "id": "MnGizi", "label": "RM Gizi", "children": [
          { "id": "ppSkriningNutrisiDewasa", "label": "Skrining Nutrisi Pasien Dewasa" },
          { "id": "ppSkriningNutrisiLansia", "label": "Skrining Nutrisi Pasien Lansia" },
          { "id": "ppSkriningNutrisiAnak", "label": "Skrining Nutrisi Pasien Anak" },
          { "id": "ppSkriningGizi", "label": "Skrining Gizi Lanjut" },
          { "id": "ppAsuhanGizi", "label": "Asuhan Gizi" },
          { "id": "ppMonitoringAsuhanGizi", "label": "Monitoring Gizi" },
          { "id": "ppCatatanADIMEGizi", "label": "Catatan ADIME Gizi" },
        ]
      },
      { "id": "MnTransferAntarRuang", "label": "Transfer Antar Ruang" },
      { "id": "MnPerencanaanPemulangan", "label": "Perencanaan Pemulangan" },
      {
        "id": "MnEdukasi", "label": "Edukasi", "children": [
          { "id": "MnPelaksanaanInformasiEdukasi", "label": "Pelaksanaan Informasi & Edukasi" },
          { "id": "MnAssesmentEdukasi", "label": "Assesmen Edukasi Pasien  & Keluarga" },
          { "id": "MnEdukasiDarah", "label": "Edukasi Pemberian Darah dan Produk Darah" },
        ]
      },
      { "id": "ppResume", "label": "Resume" },
      { "id": "MnPerintahLisan", "label": "Perintah Lisan dan Pelaporan Nilai Kritis" },
      { "id": "ppRiwayat", "label": "Riwayat Perawatan" },
    ]
  },
  {
    "id": "MnPermintaan", "label": "Permintaan", "children": [
      { "id": "MnJadwalOperasi", "label": "Jadwal Operasi" },
      { "id": "MnPermintaanLab", "label": "Pemeriksaan Lab" },
      { "id": "MnPermintaanRadiologi", "label": "Pemeriksaan Radiologi" },
      { "id": "MnPermintaanInformasiObat", "label": "Informasi Obat" },
      { "id": "MnPermintaanKonsultasiMedik", "label": "Konsultasi Medik" },
    ]
  },
  {
    "id": "MnTindakan", "label": "Tindakan & Pemeriksaan", "children": [
      { "id": "MnRawatJalan", "label": "Data Tagihan/Tindakan Rawat Jalan" },
      { "id": "MnRawatInap", "label": "Data Tagihan/Tindakan Rawat Inap" },
      { "id": "MnPeriksaLab", "label": "Periksa Lab PK" },
      { "id": "MnPeriksaLabPA", "label": "Periksa Lab PA" },
      { "id": "MnPeriksaLabMB", "label": "Periksa Lab MB" },
      { "id": "MnPeriksaRadiologi", "label": "Periksa Radiologi" },
      { "id": "MnOperasi", "label": "Tagihan Operasi/VK" },
      { "id": "MnDiet", "label": "Diet Pasien" },
      { "id": "MnDataOperasi", "label": "Data Operasi" },
    ]
  },
  {
    "id": "MnObat", "label": "Obat", "children": [
      { "id": "MnPemberianObat", "label": "Data Pemberian Obat/BHP" },
      { "id": "MnInputResep", "label": "Input Resep Pulang" },
      { "id": "MnNoResep", "label": "Input No.Resep" },
      { "id": "MnResepDOkter", "label": "Input Resep Dokter" },
      { "id": "MnPermintaanStokObatPasien", "label": "Permintaan Stok Obat Pasien" },
      { "id": "MnPermintaanResepPulang", "label": "Permintaan Resep Pulang" },
      { "id": "MnStokObatPasien", "label": "Data Stok Obat Pasien" },
      { "id": "MnResepPulang", "label": "Data Resep Pulang" },
      { "id": "MnReturJual", "label": "Retur Obat/Barang/Alkes" },
      { "id": "MnPenjualan1", "label": "Penjualan Obat/Alkes/Barang" },
    ]
  },
  { "id": "MnDeposit", "label": "Deposit/Titipan Pasien" },
  { "id": "MnBilling", "label": "Billing/Pembayaran Pasien" },
  {
    "id": "MnLaporan", "label": "Laporan & Surat", "children": [
      { "id": "MnSuratKontrol", "label": "Surat Kontrol" },
      { "id": "MnKerohanian", "label": "Pelayanan Kerohanian" },
      { "id": "MnRincianObat", "label": "Rincian Penggunaan Obat" },
      { "id": "MnSensusRanap", "label": "Sensus Harian Ranap" },
      { "id": "MnPenggunaanKamar", "label": "Penggunaan Kamar" },
      { "id": "MnPengantarPulang", "label": "Surat Pengantar Pulang" },
      { "id": "MnFormulirPenerimaan", "label": "Formulir Penerimaan Pasien 1" },
      { "id": "MnFormulirPenerimaan1", "label": "Formulir Penerimaan Pasien 2" },
      { "id": "MnCetakSuratSakit1", "label": "Surat Keterangan Rawat Inap" },
      { "id": "MnSuratKeteranganRawatInap", "label": "Surat Keterangan Rawat Inap 2" },
      { "id": "MnSuratJaminanPelayanan", "label": "Surat Jaminan Pelayanan" },
      { "id": "MnCetakSuratSakit", "label": "Surat Cuti Sakit" },
      { "id": "MnCetakSuratSakitPihak2", "label": "Surat Cuti Sakit Pihak Ke 2" },
      { "id": "MnRingkasanMasukKeluar", "label": "Ringkasan Masuk Keluar" },
      { "id": "MnPindahRSUD", "label": "Pindah dari & ke RSUD" },
      {
        "id": "MnSuratPersetujuan", "label": "Persetujuan, Pernyataan & Penolakan", "children": [
          { "id": "MnPenolakanAnjuranMedis", "label": "Penolakan Anjuran Medis" },
          { "id": "MnPersetujuanPenundaanPelayanan", "label": "Persetujuan Penundaan Pelayanan" },
          { "id": "MnPernyataanPasienUmum", "label": "Pernyataan Pasien Umum" },
          { "id": "MnPulangAtasPermintaanSendiri", "label": "Pulang Atas Permintaan Sendiri" },
          { "id": "MnPersetujuanPenolakanTindakan", "label": "Persetujuan/Penolakan Tindakan" },
          { "id": "MnPersetujuanUmum", "label": "Persetujuan Umum" },
          { "id": "MnPersetujuanPemeriksaanHIV", "label": "Persetujuan Pemeriksaan HIV" },
          { "id": "MnSuratPernyataanMemilihDPJP", "label": "Pernyataan Memilih DPJP" },
        ]
      },
    ]
  },
  {
    "id": "MnGelang", "label": "Label & Gelang Pasien", "children": [
      { "id": "MnLabelTracker", "label": "Label Tracker 1" },
      { "id": "MnLabelTracker1", "label": "Label Tracker 2" },
      { "id": "MnLabelTracker2", "label": "Label Tracker 3" },
      { "id": "MnLabelTracker3", "label": "Label Tracker 4" },
      { "id": "MnBarcode", "label": "Barcode Perawatan 1" },
      { "id": "MnBarcode1", "label": "Barcode Perawatan 2" },
      { "id": "MnBarcode2", "label": "Barcode RM" },
      { "id": "MnBarcodeRM9", "label": "Label Rekam Medis 10" },
      { "id": "MnGelang5", "label": "Gelang Pasien 1" },
      { "id": "MnGelang6", "label": "Gelang Pasien 2" },
      { "id": "MnGelang7", "label": "Gelang Pasien 3" },
      { "id": "MnGelang8", "label": "Gelang Pasien 4" },
      { "id": "MnGelang9", "label": "Gelang Pasien 5" },
      { "id": "MnGelang10", "label": "Gelang Pasien 6" },
      { "id": "MnGelang11", "label": "Gelang Pasien 7" },
      { "id": "MnGelang1", "label": "Gelang Pasien 8" },
      { "id": "MnGelang2", "label": "Gelang Pasien 9" },
      { "id": "MnGelang3", "label": "Gelang Pasien Anak" },
      { "id": "MnGelang4", "label": "Gelang Pasien Dewasa" },
    ]
  },
  { "id": "MnRanapGabung", "label": "Ranap Gabung Ibu & Bayi" },
  { "id": "MnGabungkanRanap", "label": "Gabungkan Ke Kamar Ibu" },
  {
    "id": "MnUtamaDPJP", "label": "Dokter DPJP", "children": [
      { "id": "MnDPJP", "label": "Input Dokter" },
      { "id": "MnDPJPRanap", "label": "Tampilkan Dokter" },
      { "id": "MnFilterDPJP", "label": "Filter Dokter" },
    ]
  },
  {
    "id": "MnRujukan", "label": "Rujukan", "children": [
      { "id": "MnRujuk", "label": "Rujukan Keluar" },
      { "id": "MnRujukMasuk", "label": "Rujukan Masuk" },
    ]
  },
  {
    "id": "MenuBPJS", "label": "Bridging", "children": [
      { "id": "MnCekKepesertaan", "label": "Pencarian Peserta BPJS Berdasarkan Nomor Kepesertaan" },
      { "id": "MnCekNIK", "label": "Pencarian Peserta BPJS Berdasarkan NIK/No.KTP" },
      { "id": "MnSEP", "label": "Bridging SEP VClaim" },
      { "id": "MnDataSEP", "label": "Data SEP BPJS" },
      { "id": "ppSuratKontrol", "label": "Rencana Kontrol BPJS" },
      { "id": "ppSuratPRI", "label": "Perintah Rawat Inap BPJS" },
      { "id": "ppSuplesiJasaRaharja", "label": "Suplesi Jasa Raharja BPJS" },
      { "id": "ppDataIndukKecelakaan", "label": "Data Induk Kecelakaan BPJS" },
      { "id": "MnBelumTerbitSEP", "label": "Belum Terbit SEP BPJS" },
      { "id": "MnSudahTerbitSEP", "label": "Sudah Terbit SEP BPJS" },
      { "id": "MnRujukSisrute", "label": "Rujuk Keluar Via Sisrute" },
      { "id": "ppPasienCorona", "label": "Pasien Corona Kemenkes" },
      { "id": "ppPerawatanCorona", "label": "Perawatan Pasien Corona INACBG" },
      { "id": "MnTeridentifikasiTB", "label": "Teridentifikasi TB Kemenkes" },
      { "id": "MnPCare", "label": "Data PCare" },
    ]
  },
  {
    "id": "MenuInputData", "label": "Input Data", "children": [
      { "id": "ppCatatanPasien", "label": "Catatan Untuk Pasien" },
      { "id": "ppDataHAIs", "label": "Data HAIs" },
      { "id": "ppBerkasDigital", "label": "Berkas Digital Perawatan" },
      { "id": "ppIKP", "label": "Insiden Keselamatan Pasien" },
      { "id": "ppKlasifikasiPasien", "label": "Klasifikasi Pasien" },
      { "id": "ppSkriningManagerPelayananPasien", "label": "Skrining Manager Pelayanan Pasien" },
    ]
  },
  {
    "id": "SetStatus", "label": "Set Status Pulang", "children": [
      { "id": "MnSehat", "label": "Sehat" },
      { "id": "MnStatusRujuk", "label": "Rujuk" },
      { "id": "MnStatusAPS", "label": "APS" },
      { "id": "MnStatusPlus", "label": "+" },
      { "id": "MnStatusMeninggal", "label": "Meninggal" },
      { "id": "MnStatusSembuh", "label": "Sembuh" },
      { "id": "MnStatusMembaik", "label": "Membaik" },
      { "id": "MnStatusPulangPaksa", "label": "Pulang Paksa" },
      { "id": "MnStatusMin", "label": "-" },
      { "id": "MnStatusBelumLengkap", "label": "Status Belum Lengkap" },
      { "id": "MnStatusBelumPulang", "label": "Belum Pulang" },
    ]
  },
  {
    "id": "MnGanti", "label": "Ganti", "children": [
      { "id": "MnPenjab", "label": "Jenis Bayar" },
      { "id": "MnDiagnosaMasuk", "label": "Diagnosa Awal Sementara" },
      { "id": "MnDiagnosaAkhir", "label": "Diagnosa Akhir Sementara" },
    ]
  },
  {
    "id": "MnHapusData", "label": "Hapus Data", "children": [
      { "id": "MnHapusTagihanOperasi", "label": "Hapus Tagihan Operasi" },
      { "id": "MnHapusObatOperasi", "label": "Hapus Obat Operasi" },
      { "id": "MnHapusDataSalah", "label": "Hapus Data Salah" },
    ]
  },
  { "id": "MnUpdateHari", "label": "Update Hari Perawatan" },
  { "id": "MnPerkiraanBiaya", "label": "Perkiraan Biaya Ranap" },
  {
    "id": "MnUrut", "label": "Urutkan Data Berdasar", "children": [
      { "id": "MnUrutNoRawatDesc", "label": "No.Rawat Descending" },
      { "id": "MnUrutNoRawatAsc", "label": "No.Rawat Ascending" },
      { "id": "MnUrutPenjabDesc", "label": "Cara Bayar Descending" },
      { "id": "MnUrutPenjabAsc", "label": "Cara Bayar Ascending" },
      { "id": "MnUrutRMDesc", "label": "No. RM. Descending" },
      { "id": "MnUrutRMAsc", "label": "No. RM. Ascending" },
      { "id": "MnUrutNamaDesc", "label": "Nama Descending" },
      { "id": "MnUrutNamaAsc", "label": "Nama Ascending" },
      { "id": "MnUrutKamarDesc", "label": "Kamar Descending" },
      { "id": "MnUrutKamarAsc", "label": "Kamar Ascending" },
      { "id": "MnUrutTanggalMasukAsc", "label": "Tanggal Masuk Ascending" },
      { "id": "MnUrutTanggalMasukDesc", "label": "Tanggal Masuk Descending" },
    ]
  },
];

const RUTE_DENGAN_NOMOR: Readonly<Record<string, string>> = {
  ppResume: "/resume-pasien",
  ppRiwayat: "/riwayat-pasien",
  MnDiagnosa: "/tindakan-rawat-inap",
  MnRawatJalan: "/tindakan-rawat-jalan",
  MnRawatInap: "/tindakan-rawat-inap",
  MnInputResep: "/farmasi/resep-obat",
  MnResepDOkter: "/farmasi/resep-obat",
};

const RUTE_TANPA_NOMOR: Readonly<Record<string, string>> = {
  MnPermintaanLab: "/laboratorium/permintaan-pk",
  MnPermintaanRadiologi: "/radiologi/permintaan",
  MnPeriksaLab: "/laboratorium/periksa-pk",
  MnPeriksaLabPA: "/laboratorium/periksa-pa",
  MnPeriksaLabMB: "/laboratorium/periksa-mb",
  MnPeriksaRadiologi: "/radiologi/periksa",
  MnPenjualan1: "/farmasi/input-penjualan",
};

const URUTAN: Readonly<Record<string, { kunci: KunciSortRawatInap; arah: "asc" | "desc" }>> = {
  MnUrutNoRawatDesc: { kunci: "no_rawat", arah: "desc" },
  MnUrutNoRawatAsc: { kunci: "no_rawat", arah: "asc" },
  MnUrutPenjabDesc: { kunci: "penjab", arah: "desc" },
  MnUrutPenjabAsc: { kunci: "penjab", arah: "asc" },
  MnUrutRMDesc: { kunci: "no_rm", arah: "desc" },
  MnUrutRMAsc: { kunci: "no_rm", arah: "asc" },
  MnUrutNamaDesc: { kunci: "nama", arah: "desc" },
  MnUrutNamaAsc: { kunci: "nama", arah: "asc" },
  MnUrutKamarDesc: { kunci: "kamar", arah: "desc" },
  MnUrutKamarAsc: { kunci: "kamar", arah: "asc" },
  MnUrutTanggalMasukAsc: { kunci: "tanggal_masuk", arah: "asc" },
  MnUrutTanggalMasukDesc: { kunci: "tanggal_masuk", arah: "desc" },
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
  const umum = selesaikanAksiKonteksUmum(item, baris.no_rawat, { konteksHalaman: "ranap" });
  if (umum) return umum;
  return { jenis: "belum", label: item.label };
}

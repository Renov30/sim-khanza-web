/**
 * Peta rute & aksi ringan (client-safe) untuk seluruh menu klik kanan
 * pada /rawat-jalan, /rawat-inap, /igd, dan /registrasi.
 * Tanpa impor katalog SQL agar ukuran client bundle tetap minimal.
 */

export type JenisAksiGantiKonteks =
  | "ganti_poli"
  | "ganti_dokter"
  | "ganti_penjab"
  | "gabung_no_rawat"
  | "ganti_diagnosa_awal"
  | "ganti_diagnosa_akhir";

export type AksiKonteksUmum =
  | { jenis: "rute"; label: string; rute: string }
  | { jenis: "status_reg"; label: string; nilai: string }
  | { jenis: "status_poli"; label: string; nilai: "Baru" | "Lama" }
  | { jenis: "berkas"; label: string; nilai: "diterima" | "ranap" }
  | { jenis: "antrian_poli"; label: string }
  | { jenis: "status_pulang"; label: string; nilai: string }
  | { jenis: "update_hari"; label: string }
  | { jenis: "ganti"; label: string; aksiApi: JenisAksiGantiKonteks }
  | { jenis: "hapus"; label: string; target: string };

const RUTE_DENGAN_NO_RAWAT: Readonly<Record<string, string>> = {
  "MnAssesmenPreOperasi": "/rekam-medis/penilaian-pre-operasi",
  "MnAssesmentEdukasi": "/rekam-medis/edukasi-pasien-keluarga-rj",
  "MnBilling": "/rawat-inap/billing",
  "MnBilling1": "/rawat-inap/billing",
  "MnBillingParsial": "/rawat-inap/billing",
  "MnCatatanAnastesiSedasi": "/rekam-medis/catatan-anastesi-sedasi",
  "MnCatatanCairanHemodialisa": "/rekam-medis/catatan-cairan-hemodialisa",
  "MnCatatanCekGDS": "/rekam-medis/catatan-cek-gds",
  "MnCatatanKeperawatan": "/rekam-medis/catatan-keperawatan-ralan",
  "MnCatatanKeseimbanganCairan": "/rekam-medis/catatan-keseimbangan-cairan",
  "MnCatatanObservasiBayi": "/rekam-medis/catatan-observasi-bayi",
  "MnCatatanObservasiCHBP": "/rekam-medis/catatan-observasi-chbp",
  "MnCatatanObservasiHemodialisa": "/rekam-medis/catatan-observasi-hemodialisa",
  "MnCatatanObservasiIGD": "/rekam-medis/catatan-observasi-igd",
  "MnCatatanObservasiInduksiPersalinan": "/rekam-medis/catatan-observasi-induksi-persalinan",
  "MnCatatanObservasiRanap": "/rekam-medis/catatan-observasi-ranap",
  "MnCatatanObservasiRanapKebidanan": "/rekam-medis/catatan-observasi-ranap-kebidanan",
  "MnCatatanObservasiRanapPostPartum": "/rekam-medis/catatan-observasi-ranap-post-partum",
  "MnCatatanObservasiRestrainNonFarmakologi": "/rekam-medis/catatan-observasi-restrain-non-framakologi",
  "MnCatatanObservasiVentilator": "/rekam-medis/catatan-observasi-ventilator",
  "MnCatatanPengkajianPaskaOperasi": "/rekam-medis/catatan-pengkajian-paska-operasi",
  "MnCatatanPersalinan": "/rekam-medis/catatan-persalinan",
  "MnCekKepesertaan": "/bridging/cek-bpjs-kartu",
  "MnCekNIK": "/bridging/cek-bpjs-nik",
  "MnCetakBebasNarkoba": "/surat/surat-bebas-narkoba",
  "MnCetakSuratBebasTBC": "/surat/surat-bebas-tbc",
  "MnCetakSuratCovid": "/surat/surat-keterangan-covid",
  "MnCetakSuratCutiHamil": "/surat/surat-cuti-hamil",
  "MnCetakSuratHamil": "/surat/surat-hamil",
  "MnCetakSuratKeteranganLayakTerbang": "/surat/surat-keterangan-layak-terbang",
  "MnCetakSuratKeteranganRanap": "/surat/surat-keterangan-rawat-inap",
  "MnCetakSuratSakit": "/surat/surat-sakit",
  "MnCetakSuratSakit1": "/surat/surat-keterangan-rawat-inap",
  "MnCetakSuratSakit2": "/surat/surat-keterangan-rawat-inap",
  "MnCetakSuratSakitPihak2": "/surat/surat-sakit-pihak2",
  "MnCetakSuratSehat": "/surat/surat-keterangan-sehat",
  "MnCetakSuratSehat1": "/surat/surat-keterangan-sehat",
  "MnCetakSuratSehat2": "/surat/surat-keterangan-sehat",
  "MnCetakSuratSehatJiwa": "/surat/surat-keterangan-sehat",
  "MnCheckListKesiapanAnestesi": "/rekam-medis/checklist-kesiapan-anestesi",
  "MnCheckListKriteriaKeluarHCU": "/rekam-medis/checklist-kriteria-keluar-hcu",
  "MnCheckListKriteriaKeluarICU": "/rekam-medis/checklist-kriteria-keluar-icu",
  "MnCheckListKriteriaMasukHCU": "/rekam-medis/checklist-kriteria-masuk-hcu",
  "MnCheckListKriteriaMasukICU": "/rekam-medis/checklist-kriteria-masuk-icu",
  "MnChecklistPemberianFibrinolitik": "/rekam-medis/checklist-pemberian-fibrinolitik",
  "MnChecklistPostOperasi": "/rekam-medis/checklist-post-operasi",
  "MnChecklistPreOperasi": "/rekam-medis/checklist-pre-operasi",
  "MnCopyResep": "/farmasi/copy-resep",
  "MnDPJP": "/rawat-inap/dpjp",
  "MnDPJPRanap": "/rawat-inap/dpjp",
  "MnDataKonsultasiMedik": "/rekam-medis/konsultasi-medik",
  "MnDataOperasi": "/rawat-inap/operasi",
  "MnDataPemberianObat": "/farmasi/beri-obat",
  "MnDataRalan": "/tindakan-rawat-jalan",
  "MnDataSEP": "/bridging/bpjssep",
  "MnDataTriaseIGD": "/rekam-medis/data-triase-igd",
  "MnDeposit": "/rawat-inap/deposit",
  "MnDiagnosa": "/tindakan-rawat-jalan",
  "MnDiagnosa1": "/tindakan-rawat-jalan",
  "MnDiet": "/rawat-inap/diet",
  "MnDokumentasiTindakanESWL": "/rekam-medis/dokumentasi-tindakan-eswl",
  "MnEdukasiBatalRujuk": "/rekam-medis/pelaksanaan-informasi-edukasi",
  "MnEdukasiDarah": "/rekam-medis/pelaksanaan-informasi-edukasi",
  "MnEdukasiPasienKeluarga": "/rekam-medis/edukasi-pasien-keluarga-rj",
  "MnFilterDPJP": "/rawat-inap/dpjp",
  "MnFollowUpDBD": "/rekam-medis/data-follow-up-dbd",
  "MnGabungkanRanap": "/rekam-medis/ranap-gabung",
  "MnHasilEndoskopiFaringLaring": "/rekam-medis/hasil-endoskopi-faring-laring",
  "MnHasilEndoskopiHidung": "/rekam-medis/hasil-endoskopi-hidung",
  "MnHasilEndoskopiTelinga": "/rekam-medis/hasil-endoskopi-telinga",
  "MnHasilPemeriksaanECHO": "/rekam-medis/hasil-pemeriksaan-echo",
  "MnHasilPemeriksaanEKG": "/rekam-medis/hasil-pemeriksaan-ekg",
  "MnHasilPemeriksaanOCT": "/rekam-medis/hasil-pemeriksaan-oct",
  "MnHasilPemeriksaanSlitLamp": "/rekam-medis/hasil-pemeriksaan-slit-lamp",
  "MnHasilPemeriksaanUSG": "/rekam-medis/hasil-pemeriksaan-usg",
  "MnHasilPemeriksaanUSGGynecologi": "/rekam-medis/hasil-usg-gynecologi",
  "MnHasilPemeriksaanUSGNeonatus": "/rekam-medis/hasil-usg-neonatus",
  "MnHasilPemeriksaanUSGUrologi": "/rekam-medis/hasil-usg-urologi",
  "MnHemodialisa": "/rekam-medis/hemodialisa",
  "MnInputResep": "/farmasi/resep-obat",
  "MnJadwalOperasi": "/rawat-inap/jadwal-operasi",
  "MnJadwalOperasi1": "/rawat-inap/jadwal-operasi",
  "MnKerohanian": "/rekam-medis/catatan-pasien",
  "MnKonselingFarmasi": "/rekam-medis/konseling-farmasi",
  "MnLaporanTindakan": "/rekam-medis/laporan-tindakan",
  "MnLayananKedokteranFisikRehabilitasi": "/rekam-medis/layanan-kedokteran-fisik-rehabilitasi",
  "MnMonitoringReaksiTranfusi": "/rekam-medis/monitoring-reaksi-tranfusi",
  "MnNoResep": "/farmasi/resep-obat",
  "MnNoResep1": "/farmasi/resep-obat",
  "MnObatLangsung": "/farmasi/beri-obat",
  "MnOperasi": "/rawat-inap/operasi",
  "MnOperasi1": "/rawat-inap/operasi",
  "MnPCare": "/bridging/p-care-pendaftaran",
  "MnPelaksanaanInformasiEdukasi": "/rekam-medis/pelaksanaan-informasi-edukasi",
  "MnPemantauanEWSNeonatus": "/rekam-medis/pemantauan-ews-neonatus",
  "MnPemantauanMEOWS": "/rekam-medis/pemantauan-meows",
  "MnPemantauanMEOWSObstetri": "/rekam-medis/pemantauan-meows",
  "MnPemantauanPEWSAnak": "/rekam-medis/pemantauan-pews-anak",
  "MnPemantauanPEWSDewasa": "/rekam-medis/pemantauan-pews-dewasa",
  "MnPemberianObat": "/farmasi/beri-obat",
  "MnPemberianObat1": "/farmasi/beri-obat",
  "MnPenandaanOperasiMata": "/rekam-medis/checklist-pre-operasi",
  "MnPenatalaksanaanTerapiOkupasi": "/rekam-medis/penatalaksanaan-terapi-okupasi",
  "MnPenerimaanRanap": "/surat/persetujuan-rawat-inap",
  "MnPengkajianRestrain": "/rekam-medis/pengkajian-restrain",
  "MnPenilaianAwalKeperawatanBayiAnak": "/rekam-medis/penilaian-awal-ralan-bayi",
  "MnPenilaianAwalKeperawatanGigi": "/rekam-medis/penilaian-awal-keperawatan-gigi",
  "MnPenilaianAwalKeperawatanIGD": "/rekam-medis/penilaian-awal-keperawatan-igd",
  "MnPenilaianAwalKeperawatanKebidanan": "/rekam-medis/penilaian-awal-keperawatan-kebidanan",
  "MnPenilaianAwalKeperawatanPsikiatri": "/rekam-medis/penilaian-awal-keperawatan-ralan-psikiatri",
  "MnPenilaianAwalKeperawatanRalan": "/rekam-medis/penilaian-awal-keperawatan-ralan",
  "MnPenilaianAwalKeperawatanRalanGeriatri": "/rekam-medis/penilaian-awal-keperawatan-ralan-geriatri",
  "MnPenilaianAwalKeperawatanRanap": "/rekam-medis/penilaian-awal-keperawatan-ranap",
  "MnPenilaianAwalKeperawatanRanapBayiAnak": "/rekam-medis/penilaian-awal-keperawatan-ranap-bayi-anak",
  "MnPenilaianAwalKeperawatanRanapNeonatus": "/rekam-medis/penilaian-awal-keperawatan-ranap-neonatus",
  "MnPenilaianAwalMedisHemodialisa": "/rekam-medis/penilaian-awal-medis-hemodialisa",
  "MnPenilaianAwalMedisIGD": "/rekam-medis/penilaian-awal-medis-igd",
  "MnPenilaianAwalMedisIGDPsikiatri": "/rekam-medis/penilaian-awal-medis-ralan-igd-psikiatri",
  "MnPenilaianAwalMedisKandungan": "/rekam-medis/penilaian-awal-medis-ranap-kandungan",
  "MnPenilaianAwalMedisNeonatus": "/rekam-medis/penilaian-awal-medis-ranap-neonatus",
  "MnPenilaianAwalMedisRalan": "/rekam-medis/penilaian-awal-medis-ralan",
  "MnPenilaianAwalMedisRalanBayi": "/rekam-medis/penilaian-awal-medis-ralan-bayi",
  "MnPenilaianAwalMedisRalanBedah": "/rekam-medis/penilaian-awal-medis-ralan-bedah",
  "MnPenilaianAwalMedisRalanBedahMulut": "/rekam-medis/penilaian-awal-medis-ralan-bedah-mulut",
  "MnPenilaianAwalMedisRalanFisikRehabilitasi": "/rekam-medis/penilaian-awal-medis-ralan-rehab-medik",
  "MnPenilaianAwalMedisRalanGeriatri": "/rekam-medis/penilaian-awal-medis-ralan-geriatri",
  "MnPenilaianAwalMedisRalanHemodialisa": "/rekam-medis/penilaian-awal-medis-hemodialisa",
  "MnPenilaianAwalMedisRalanKebidanan": "/rekam-medis/penilaian-awal-medis-ralan-kandungan",
  "MnPenilaianAwalMedisRalanKulitKelamin": "/rekam-medis/penilaian-awal-medis-ralan-kulit-kelamin",
  "MnPenilaianAwalMedisRalanMata": "/rekam-medis/penilaian-awal-medis-ralan-mata",
  "MnPenilaianAwalMedisRalanNeurologi": "/rekam-medis/penilaian-awal-medis-ralan-neurologi",
  "MnPenilaianAwalMedisRalanOrthopedi": "/rekam-medis/penilaian-awal-medis-ralan-orthopedi",
  "MnPenilaianAwalMedisRalanParu": "/rekam-medis/penilaian-awal-medis-ralan-paru",
  "MnPenilaianAwalMedisRalanPenyakitDalam": "/rekam-medis/penilaian-awal-medis-ralan-penyakit-dalam",
  "MnPenilaianAwalMedisRalanPsikiatri": "/rekam-medis/penilaian-awal-medis-ralan-psikiatri",
  "MnPenilaianAwalMedisRalanTHT": "/rekam-medis/penilaian-awal-medis-ralan-tht",
  "MnPenilaianAwalMedisRanap": "/rekam-medis/penilaian-awal-medis-ranap",
  "MnPenilaianBayiBaruLahir": "/rekam-medis/penilaian-bayi-baru-lahir",
  "MnPenilaianDerajatDehidrasi": "/rekam-medis/penilaian-derajat-dehidrasi",
  "MnPenilaianFisioterapi": "/rekam-medis/fisioterapi",
  "MnPenilaianKecemasanAnak": "/rekam-medis/penilaian-level-kecemasan-ranap-anak",
  "MnPenilaianKorbanKekerasan": "/rekam-medis/penilaian-korban-kekerasan",
  "MnPenilaianLanjutanSkriningFungsional": "/rekam-medis/penilaian-lanjutan-skrining-fungsional",
  "MnPenilaianMCU": "/rekam-medis/penilaian-mcu",
  "MnPenilaianPasienImunitasRendah": "/rekam-medis/penilaian-pasien-imunitas-rendah",
  "MnPenilaianPasienKeracunan": "/rekam-medis/penilaian-pasien-keracunan",
  "MnPenilaianPasienPenyakitMenular": "/rekam-medis/penilaian-pasien-penyakit-menular",
  "MnPenilaianPasienTerminal": "/rekam-medis/penilaian-pasien-terminal",
  "MnPenilaianPreAnastesi": "/rekam-medis/penilaian-pre-anastesi",
  "MnPenilaianPreAnestesi": "/rekam-medis/penilaian-pre-anastesi",
  "MnPenilaianPreInduksi": "/rekam-medis/penilaian-pre-induksi",
  "MnPenilaianPreOp": "/rekam-medis/penilaian-pre-operasi",
  "MnPenilaianPsikolog": "/rekam-medis/penilaian-psikologi",
  "MnPenilaianPsikologKlinis": "/rekam-medis/penilaian-psikologi-klinis",
  "MnPenilaianRisikoDikubitus": "/rekam-medis/penilaian-risiko-dekubitus",
  "MnPenilaianRisikoJatuhAnak": "/rekam-medis/penilaian-risiko-jatuh-anak",
  "MnPenilaianRisikoJatuhDewasa": "/rekam-medis/penilaian-risiko-jatuh-dewasa",
  "MnPenilaianRisikoJatuhGeriatri": "/rekam-medis/penilaian-risiko-jatuh-geriatri",
  "MnPenilaianRisikoJatuhLansia": "/rekam-medis/penilaian-risiko-jatuh-lansia",
  "MnPenilaianRisikoJatuhNeonatus": "/rekam-medis/penilaian-risiko-jatuh-neonatus",
  "MnPenilaianRisikoJatuhPsikiatri": "/rekam-medis/penilaian-risiko-jatuh-psikiatri",
  "MnPenilaianTambahanBunuhDiri": "/rekam-medis/penilaian-tambahan-bunuh-diri",
  "MnPenilaianTambahanGeriatri": "/rekam-medis/penilaian-tambahan-geriatri",
  "MnPenilaianTambahanMalarikanDiri": "/rekam-medis/penilaian-tambahan-melarikan-diri",
  "MnPenilaianTambahanMelarikanDiri": "/rekam-medis/penilaian-tambahan-melarikan-diri",
  "MnPenilaianTambahanPerilakuKekerasan": "/rekam-medis/penilaian-tambahan-perilaku-kekerasan",
  "MnPenilaianTerapiWicara": "/rekam-medis/penilaian-terapi-wicara",
  "MnPenilaianUlangNyeri": "/rekam-medis/penilaian-ulang-nyeri",
  "MnPeniliaianAwalMedisHemodialisa": "/rekam-medis/penilaian-awal-medis-hemodialisa",
  "MnPeniliaianAwalMedisIGD": "/rekam-medis/penilaian-awal-medis-igd",
  "MnPeniliaianAwalMedisIGDPsikiatri": "/rekam-medis/penilaian-awal-medis-ralan-igd-psikiatri",
  "MnPenolakanAnjuranMedis": "/surat/penolakan-anjuran-medis",
  "MnPerencanaanPemulangan": "/rekam-medis/perencanaan-pemulangan",
  "MnPerintahLisan": "/rekam-medis/perintah-lisan",
  "MnPerkiraanBiaya": "/rawat-inap/perkiraan-biaya",
  "MnPermintaanInformasiObat": "/rekam-medis/pelayanan-informasi-obat",
  "MnPermintaanInformasiObat1": "/rekam-medis/pelayanan-informasi-obat",
  "MnPermintaanKonsultasiMedik": "/rekam-medis/konsultasi-medik",
  "MnPermintaanResepPulang": "/farmasi/modul/permintaan-resep-pulang",
  "MnPermintaanStokObatPasien": "/farmasi/modul/permintaan-stok-obat-pasien",
  "MnPernyataanMemilihDPJP": "/surat/surat-pernyataan-memilih-dpjp",
  "MnPernyataanPasienUmum": "/surat/pernyataan-pasien-umum",
  "MnPersetujuanPemeriksaanHIV": "/surat/persetujuan-pemeriksaan-hiv",
  "MnPersetujuanPenolakanTindakan": "/surat/persetujuan-penolakan-tindakan",
  "MnPersetujuanPenundaanPelayanan": "/surat/persetujuan-penundaan-pelayanan",
  "MnPersetujuanRawatInap": "/surat/persetujuan-rawat-inap",
  "MnPersetujuanUmum": "/surat/persetujuan-umum",
  "MnPiutangObat": "/farmasi/modul/piutang",
  "MnPoliInternal": "/rekam-medis/rujukan-internal-poli",
  "MnPulangAtasPermintaanSendiri": "/surat/persetujuan-pulang-atas-permintan-sendiri",
  "MnRanapGabung": "/rekam-medis/ranap-gabung",
  "MnRawatInap": "/tindakan-rawat-inap",
  "MnRawatJalan": "/tindakan-rawat-jalan",
  "MnRawatJalan1": "/tindakan-rawat-jalan",
  "MnRekonsiliasiObat": "/rekam-medis/rekonsiliasi-obat",
  "MnResepDOkter": "/farmasi/resep-obat",
  "MnResepDOkter1": "/farmasi/resep-obat",
  "MnResepPulang": "/farmasi/resep-pulang",
  "MnReturJual": "/farmasi/modul/retur-pasien",
  "MnRiwayatPerawatanICareNIK": "/bridging/riwayat-perawatan-i-care",
  "MnRiwayatPerawatanICareNIK1": "/bridging/riwayat-perawatan-i-care",
  "MnRiwayatPerawatanICareNoKartu": "/bridging/riwayat-perawatan-i-care",
  "MnRiwayatPerawatanICareNoKartu1": "/bridging/riwayat-perawatan-i-care",
  "MnRujuk": "/registrasi/rujukan-keluar",
  "MnRujukMasuk": "/registrasi/rujukan-masuk",
  "MnRujukSisrute": "/bridging/rujukan-keluar-sisrute",
  "MnSEP": "/bridging/bpjssep",
  "MnSJP": "/bridging/inhealth-sjp",
  "MnSignInSebelumAnestesi": "/rekam-medis/sign-in-sebelum-anestesi",
  "MnSignOutSebelumMenutupLuka": "/rekam-medis/sign-out-sebelum-menutup-luka",
  "MnSkorAldrettePascaAnestesi": "/rekam-medis/skor-aldrette-pasca-anestesi",
  "MnSkorBromagePascaAnestesi": "/rekam-medis/skor-bromage-pasca-anestesi",
  "MnSkorStewardPascaAnestesi": "/rekam-medis/skor-steward-pasca-anestesi",
  "MnSkriningAdiksiNikotin": "/rekam-medis/skrining-adiksi-nikotin",
  "MnSkriningAnemia": "/rekam-medis/skrining-anemia",
  "MnSkriningDiabetesMelitus": "/rekam-medis/skrining-diabetes-melitus",
  "MnSkriningFrailtySyndrome": "/rekam-medis/skrining-frailty-syndrome",
  "MnSkriningHipertensi": "/rekam-medis/skrining-hipertensi",
  "MnSkriningIndraPendengaran": "/rekam-medis/skrining-indra-pendengaran",
  "MnSkriningInstrumenACRS": "/rekam-medis/skrining-instrumen-acrs",
  "MnSkriningInstrumenMentalEmosional": "/rekam-medis/skrining-instrumen-mental-emosional",
  "MnSkriningInstrumenSDQ": "/rekam-medis/skrining-instrumen-sdq",
  "MnSkriningInstrumenSRQ": "/rekam-medis/skrining-instrumen-srq",
  "MnSkriningKankerKolorektal": "/rekam-medis/skrining-kanker-kolorektal",
  "MnSkriningKekerasanPadaWanita": "/rekam-medis/skrining-kekerasan-pada-perempuan",
  "MnSkriningKesehatanGigiMulutBalita": "/rekam-medis/skrining-kesehatan-gigi-mulut-balita",
  "MnSkriningKesehatanGigiMulutDewasa": "/rekam-medis/skrining-kesehatan-gigi-mulut-dewasa",
  "MnSkriningKesehatanGigiMulutLansia": "/rekam-medis/skrining-kesehatan-gigi-mulut-lansia",
  "MnSkriningKesehatanGigiMulutRemaja": "/rekam-medis/skrining-kesehatan-gigi-mulut-remaja",
  "MnSkriningKesehatanPenglihatan": "/rekam-medis/skrining-kesehatan-penglihatan",
  "MnSkriningMerokokUsiaSekolahRemaja": "/rekam-medis/skrining-merokok-usia-sekolah",
  "MnSkriningObesitas": "/rekam-medis/skrining-obesitas",
  "MnSkriningPUMA": "/rekam-medis/skrining-puma",
  "MnSkriningRisikoKankerParu": "/rekam-medis/skrining-risiko-kanker-paru",
  "MnSkriningRisikoKankerPayudara": "/rekam-medis/skrining-risiko-kanker-payudara",
  "MnSkriningRisikoKankerServiks": "/rekam-medis/skrining-risiko-kanker-serviks",
  "MnSkriningTBC": "/rekam-medis/skrining-tbc",
  "MnSkriningThalassemia": "/rekam-medis/skrining-thalassemia",
  "MnStatusHd": "/rekam-medis/hemodialisa",
  "MnStokObatPasien": "/farmasi/modul/stok-obat-pasien",
  "MnSuratBebasTato": "/surat/surat-bebas-tato",
  "MnSuratButaWarna": "/surat/surat-buta-warna",
  "MnSuratKPS": "/rekam-medis/catatan-pasien",
  "MnSuratKeteranganRawatInap": "/surat/surat-keterangan-rawat-inap",
  "MnSuratKewaspadaanKesehatan": "/surat/surat-kewaspadaan-kesehatan",
  "MnSuratKontrol": "/surat/skdpbpjs",
  "MnSuratPernyataanMemilihDPJP": "/surat/surat-pernyataan-memilih-dpjp",
  "MnTeridentifikasiTB": "/laporan/data-sitt",
  "MnTimeOutSebelumInsisi": "/rekam-medis/time-out-sebelum-insisi",
  "MnTransferAntarRuang": "/rekam-medis/transfer-pasien-antar-ruang",
  "MnUjiFungsiKFR": "/rekam-medis/uji-fungsi-kfr",
  "SuratKontrol": "/surat/skdpbpjs",
  "ppAsuhanGizi": "/rekam-medis/asuhan-gizi",
  "ppBerkasDigital": "/rekam-medis/berkas-digital-perawatan",
  "ppBerkasDigital1": "/rekam-medis/berkas-digital-perawatan",
  "ppCatatanADIMEGizi": "/rekam-medis/catatan-adime-gizi",
  "ppCatatanAdimeGizi": "/rekam-medis/catatan-adime-gizi",
  "ppCatatanPasien": "/rekam-medis/catatan-pasien",
  "ppDataHAIs": "/rekam-medis/data-ha-is",
  "ppDataIndukKecelakaan": "/bridging/bpjs-data-induk-kecelakaan",
  "ppDeteksiDIniCorona": "/rawat-jalan/deteksi-corona",
  "ppIKP": "/rekam-medis/insiden-keselamatan-pasien",
  "ppIKP1": "/rekam-medis/insiden-keselamatan-pasien",
  "ppKlasifikasiPasien": "/rekam-medis/klasifikasi-pasien-ranap",
  "ppMonitoringAsuhanGizi": "/rekam-medis/monitoring-asuhan-gizi",
  "ppPasienCorona": "/bridging/pasien-corona",
  "ppPerawatanCorona": "/bridging/perawatan-pasien-corona",
  "ppProgramPRB": "/bridging/bpjs-program-prb",
  "ppResume": "/resume-pasien",
  "ppRiwayat": "/riwayat-pasien",
  "ppRiwayat1": "/riwayat-pasien",
  "ppSkriningGizi": "/rekam-medis/skrining-gizi-lanjut",
  "ppSkriningManagerPelayananPasien": "/rekam-medis/skrining-manager-pelayanan-pasien",
  "ppSkriningNutrisiAnak": "/rekam-medis/skrining-nutrisi-anak",
  "ppSkriningNutrisiDewasa": "/rekam-medis/skrining-nutrisi-dewasa",
  "ppSkriningNutrisiLansia": "/rekam-medis/skrining-nutrisi-lansia",
  "ppSuplesiJasaRaharja": "/bridging/bpjs-suplesi-jasa-raharja",
  "ppSuratKontrol": "/bridging/bpjs-surat-kontrol",
  "ppSuratPRI": "/bridging/bpjs-surat-pri"
};

const RUTE_TANPA_NO_RAWAT: Readonly<Record<string, string>> = {
  "MnKamarInap": "/rawat-inap",
  "MnKamarInap1": "/rawat-inap",
  "MnLaporanRekapJenisBayar": "/laporan/rekap-kunjungan",
  "MnLaporanRekapKunjunganBulanan": "/laporan/kunjungan-ralan",
  "MnLaporanRekapKunjunganBulananPoli": "/laporan/sensus-harian-poli",
  "MnLaporanRekapKunjunganDokter": "/laporan/kunjungan-ralan",
  "MnLaporanRekapKunjunganPoli": "/laporan/sensus-harian-poli",
  "MnLaporanRekapPenyakitRalan": "/laporan/frekuensi-ralan",
  "MnLaporanRekapPerujuk": "/laporan/rekap-kunjungan",
  "MnLaporanRekapRawatDarurat": "/laporan/rl32",
  "MnPenggunaanKamar": "/tagihan/harian-kamar",
  "MnPenjualan": "/farmasi/input-penjualan",
  "MnPenjualan1": "/farmasi/input-penjualan",
  "MnPeriksaLab": "/laboratorium/periksa-pk",
  "MnPeriksaLab1": "/laboratorium/periksa-pk",
  "MnPeriksaLabMB": "/laboratorium/periksa-mb",
  "MnPeriksaLabMB2": "/laboratorium/periksa-mb",
  "MnPeriksaLabPA": "/laboratorium/periksa-pa",
  "MnPeriksaLabPA2": "/laboratorium/periksa-pa",
  "MnPeriksaRadiologi": "/radiologi/periksa",
  "MnPeriksaRadiologi1": "/radiologi/periksa",
  "MnPermintaanLab": "/laboratorium/permintaan-pk",
  "MnPermintaanLab1": "/laboratorium/permintaan-pk",
  "MnPermintaanRadiologi": "/radiologi/permintaan",
  "MnPermintaanRadiologi1": "/radiologi/permintaan",
  "MnPermintaanRanap": "/rawat-inap/permintaan",
  "MnPermintaanRanap1": "/rawat-inap/permintaan",
  "MnRekapBulananDokter": "/tagihan/rb-dokter",
  "MnRekapBulananParamedis": "/tagihan/rb-paramedis",
  "MnRekapHarianDokter": "/tagihan/rhd-okter",
  "MnRekapHarianObat": "/tagihan/tagihan-obat-poli",
  "MnRekapHarianParamedis": "/tagihan/rh-paramedis",
  "MnRekapHarianPoli": "/tagihan/tagihan-poli",
  "MnRincianObat": "/farmasi/modul/rekap-obat-ranap",
  "MnSensusRanap": "/laporan/daftar-pasien-ranap",
  "ppGrafikDemografi": "/grafik-analisa/grafik-demografi-registrasi",
  "ppGrafikPerAgama": "/grafik-analisa/grafik-demografi-registrasi",
  "ppGrafikPerBulan": "/grafik-analisa/grafik-kunjungan-per-bulan",
  "ppGrafikPerJK": "/grafik-analisa/grafik-demografi-registrasi",
  "ppGrafikPerPekerjaan": "/grafik-analisa/grafik-kunjungan-per-pekerjaan",
  "ppGrafikPerTahun": "/grafik-analisa/grafik-kunjungan-per-tahun",
  "ppGrafikPerTanggal": "/grafik-analisa/grafik-kunjungan-per-tanggal",
  "ppGrafikPerdokter": "/grafik-analisa/grafik-kunjungan-per-dokter",
  "ppGrafikPerdokter1": "/grafik-analisa/grafik-kunjungan-per-dokter",
  "ppGrafikPerdokter2": "/grafik-analisa/grafik-kunjungan-per-dokter",
  "ppGrafikPerpoli": "/grafik-analisa/grafik-kunjungan-poli",
  "ppGrafikPerpoli1": "/grafik-analisa/grafik-kunjungan-poli",
  "ppGrafikPerpoli2": "/grafik-analisa/grafik-kunjungan-poli"
};

const MENU_CETAK_DOKUMEN: ReadonlySet<string> = new Set([
  "MnBarcode",
  "MnBarcode1",
  "MnBarcode2",
  "MnBarcode3",
  "MnBarcodeRM9",
  "MnBlangkoResep",
  "MnBuktiPelayananRalan",
  "MnCetakRegister",
  "MnCetakRegister1",
  "MnCetakRegister2",
  "MnCheckList",
  "MnCheckList1",
  "MnCheckList2",
  "MnCheckList3",
  "MnCheckList4",
  "MnCheckList5",
  "MnCheckList6",
  "MnCheckList7",
  "MnCheckList8",
  "MnCheckList9",
  "MnFormulirPenerimaan",
  "MnFormulirPenerimaan1",
  "MnGelang1",
  "MnGelang10",
  "MnGelang11",
  "MnGelang2",
  "MnGelang3",
  "MnGelang4",
  "MnGelang5",
  "MnGelang6",
  "MnGelang7",
  "MnGelang8",
  "MnGelang9",
  "MnJKRA",
  "MnLabelTracker",
  "MnLabelTracker1",
  "MnLabelTracker2",
  "MnLabelTracker3",
  "MnLembarCasemix",
  "MnLembarCasemix1",
  "MnLembarCasemix2",
  "MnLembarKeluarMasuk2",
  "MnLembarRalan",
  "MnPengantarPulang",
  "MnPindahRSUD",
  "MnRingkasanMasukKeluar",
  "MnSBT",
  "MnSPBK",
  "MnSPBK1",
  "MnSuratJaminanPelayanan",
  "MnSuratJaminanPelayananIGD"
]);

const PETA_STATUS_REG: Readonly<Record<string, string>> = {
  "MnSudah": "Sudah",
  "MnBelum": "Belum",
  "MnBatal": "Batal",
  "MnDirujuk": "Dirujuk",
  "MnDIrawat": "Dirawat",
  "MnMeninggal": "Meninggal",
  "MnPulangPaksa": "Pulang Paksa"
};

const PETA_STATUS_POLI: Readonly<Record<string, "Baru" | "Lama">> = {
  "MnStatusBaru": "Baru",
  "MnStatusLama": "Lama"
};

const PETA_BERKAS: Readonly<Record<string, "diterima" | "ranap">> = {
  "ppBerkas": "diterima",
  "ppBerkasDIterima": "diterima",
  "ppBerkasRanap": "ranap"
};

const PETA_STATUS_PULANG: Readonly<Record<string, string>> = {
  "MnSehat": "Sehat",
  "MnStatusRujuk": "Rujuk",
  "MnStatusAPS": "APS",
  "MnStatusPlus": "+",
  "MnStatusMeninggal": "Meninggal",
  "MnStatusSembuh": "Sembuh",
  "MnStatusMembaik": "Membaik",
  "MnStatusPulangPaksa": "Pulang Paksa",
  "MnStatusMin": "-",
  "MnStatusBelumLengkap": "Status Belum Lengkap",
  "MnStatusBelumPulang": "Belum Pulang"
};

const PETA_GANTI: Readonly<Record<string, JenisAksiGantiKonteks>> = {
  "MnPoli": "ganti_poli",
  "MnDokter": "ganti_dokter",
  "MnPenjab": "ganti_penjab",
  "MnGabungNoRawat": "gabung_no_rawat",
  "MnDiagnosaMasuk": "ganti_diagnosa_awal",
  "MnDiagnosaAkhir": "ganti_diagnosa_akhir"
};

export interface OpsiResolusiKonteks {
  konteksHalaman?: "ralan" | "ranap" | "igd" | "registrasi";
}

export function selesaikanAksiKonteksUmum(
  item: { id: string; label: string },
  noRawat: string,
  opsi?: OpsiResolusiKonteks,
): AksiKonteksUmum | null {
  // Override khusus konteks Rawat Inap
  if (opsi?.konteksHalaman === "ranap") {
    if (item.id === "MnDiagnosa") {
      return { jenis: "rute", label: item.label, rute: `/tindakan-rawat-inap?no_rawat=${encodeURIComponent(noRawat)}` };
    }
    if (item.id === "MnCatatanKeperawatan") {
      return { jenis: "rute", label: item.label, rute: `/rekam-medis/catatan-keperawatan-ranap?no_rawat=${encodeURIComponent(noRawat)}` };
    }
    if (item.id === "MnPenilaianAwalKeperawatanKebidanan") {
      return { jenis: "rute", label: item.label, rute: `/rekam-medis/penilaian-awal-keperawatan-kebidanan-ranap?no_rawat=${encodeURIComponent(noRawat)}` };
    }
  }

  const statusReg = PETA_STATUS_REG[item.id];
  if (statusReg) return { jenis: "status_reg", label: item.label, nilai: statusReg };

  const statusPoli = PETA_STATUS_POLI[item.id];
  if (statusPoli) return { jenis: "status_poli", label: item.label, nilai: statusPoli };

  const berkas = PETA_BERKAS[item.id];
  if (berkas) return { jenis: "berkas", label: item.label, nilai: berkas };

  if (item.id === "ppMasukPoli") return { jenis: "antrian_poli", label: item.label };

  const statusPulang = PETA_STATUS_PULANG[item.id];
  if (statusPulang) return { jenis: "status_pulang", label: item.label, nilai: statusPulang };

  if (item.id === "MnUpdateHari") return { jenis: "update_hari", label: item.label };

  const ganti = PETA_GANTI[item.id];
  if (ganti) return { jenis: "ganti", label: item.label, aksiApi: ganti };

  if (item.id.startsWith("MnHapus")) {
    return { jenis: "hapus", label: item.label, target: item.id };
  }

  if (MENU_CETAK_DOKUMEN.has(item.id)) {
    const qs = new URLSearchParams({ jenis: item.id, no_rawat: noRawat, judul: item.label });
    return { jenis: "rute", label: item.label, rute: `/cetak/dokumen?${qs.toString()}` };
  }

  const ruteNomor = RUTE_DENGAN_NO_RAWAT[item.id];
  if (ruteNomor) {
    return { jenis: "rute", label: item.label, rute: `${ruteNomor}?no_rawat=${encodeURIComponent(noRawat)}` };
  }

  const ruteTanpa = RUTE_TANPA_NO_RAWAT[item.id];
  if (ruteTanpa) {
    return { jenis: "rute", label: item.label, rute: ruteTanpa };
  }

  return null;
}

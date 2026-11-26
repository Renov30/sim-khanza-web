import { dapatkanJudulKatalog } from "@/lib/modul/rute-katalog";

const JUDUL_HALAMAN: Readonly<Record<string, string>> = {
  "/": "Home",
  "/registrasi": "Registrasi",
  "/poliklinik": "Data Poliklinik",
  "/pegawai": "Data Pegawai",
  "/petugas": "Data Petugas",
  "/dokter": "Data Dokter",
  "/pasien": "Data Pasien",
  "/jadwal-dokter": "Jadwal Praktek Dokter",
  "/tarif-ralan": "Tarif Rawat Jalan",
  "/tarif-ranap": "Tarif Rawat Inap",
  "/tarif-lab": "Tarif Lab",
  "/igd": "IGD / UGD",
  "/rawat-jalan": "Rawat Jalan",
  "/tindakan-rawat-jalan": "Tindakan Ralan",
  "/rawat-jalan/input-resep": "Input Resep",
  "/rawat-jalan/copy-resep": "Copy Resep",
  "/rawat-inap": "Rawat Inap",
  "/tindakan-rawat-inap": "Tindakan Ranap",
  "/laboratorium/periksa-pk": "Hasil Periksa Lab",
  "/laboratorium/periksa-pa": "Periksa Lab PA",
  "/laboratorium/periksa-mb": "Periksa Lab MB",
  "/laboratorium/permintaan-pk": "Permintaan Lab PK",
  "/laboratorium/permintaan-pa": "Permintaan Lab PA",
  "/laboratorium/permintaan-mb": "Permintaan Lab MB",
  "/radiologi/periksa": "Periksa Radiologi",
  "/radiologi/permintaan": "Permintaan Radiologi",
  "/farmasi": "Farmasi",
  "/farmasi/master-obat": "Data Obat & BHP",
  "/farmasi/input-penjualan": "Input Penjualan",
  "/farmasi/penjualan-obat": "Data Penjualan",
  "/farmasi/penyerahan-darah": "Penyerahan Darah",
  "/farmasi/daftar-resep-dokter": "Daftar Resep Dokter",
  "/farmasi/validasi-obat": "Validasi Obat",
  "/farmasi/no-resep": "No. Resep",
  "/farmasi/daftar-obat-telah-tervalidasi": "Daftar Obat Telah Tervalidasi",
  "/farmasi/resep-obat": "Input Resep",
  "/resume-pasien": "Resume Pasien",
  "/riwayat-pasien": "Riwayat Pasien",
  "/farmasi/copy-resep": "Copy Resep",
  "/registrasi/booking-periksa": "Booking Periksa",
  "/registrasi/booking-registrasi": "Booking Registrasi",
  "/registrasi/booking-mcu-perusahaan": "Booking MCU Perusahaan",
  "/registrasi/rujukan-keluar": "Rujukan Keluar",
  "/registrasi/rujukan-masuk": "Rujukan Masuk",
  "/rawat-inap/informasi-kamar": "Informasi Kamar",
  "/rawat-inap/permintaan": "Permintaan Rawat Inap",
  "/rawat-inap/jadwal-operasi": "Jadwal Operasi",
  "/rawat-inap/dpjp": "DPJP Ranap",
  "/rawat-inap/operasi": "Operasi / VK",
  "/rawat-inap/diet": "Diet Pasien",
  "/rawat-inap/deposit": "Deposit Pasien",
  "/rawat-inap/perkiraan-biaya": "Perkiraan Biaya Ranap",
  "/rawat-inap/billing": "Billing Rawat Inap",
  "/rawat-inap/barcode": "Barcode Tindakan Ranap",
  "/rawat-jalan/permintaan-kfr": "Permintaan Layanan KFR",
  "/rawat-jalan/skrining": "Skrining Rawat Jalan",
  "/rawat-jalan/deteksi-corona": "Deteksi Dini Corona",
  "/rawat-jalan/barcode": "Barcode Tindakan Ralan",
  "/farmasi/beri-obat": "Beri Obat / BHP",
  "/farmasi/resep-pulang": "Resep Pulang",
  "/tarif-farmasi": "Tarif Farmasi",
  "/cetak/dokumen": "Cetak Dokumen Pasien",
  "/cetak/laporan": "Cetak Laporan Jasper",
  "/dashboard/indikator-pelayanan": "Indikator Pelayanan (BOR/LOS)",
  "/dashboard/kunjungan-poliklinik": "Dashboard Kunjungan Poliklinik",
  "/antrian": "Display Antrian Pelayanan",
};

function formatSegmenPath(segmen: string) {
  return decodeURIComponent(segmen)
    .replaceAll("-", " ")
    .replace(/\b\p{L}/gu, (huruf) => huruf.toUpperCase());
}

export function dapatkanJudulHalaman(pathname: string) {
  const pathNormal = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const judulTerdaftar = JUDUL_HALAMAN[pathNormal];

  if (judulTerdaftar) return judulTerdaftar;

  const judulKatalog = dapatkanJudulKatalog(pathNormal);
  if (judulKatalog) return judulKatalog;

  const segmenTerakhir = pathNormal.split("/").filter(Boolean).at(-1);
  return segmenTerakhir ? formatSegmenPath(segmenTerakhir) : "Home";
}

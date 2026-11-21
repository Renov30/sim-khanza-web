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
  "/rawat-inap": "Rawat Inap",
  "/tindakan-rawat-inap": "Tindakan Ranap",
  "/laboratorium/periksa-pk": "Periksa Lab PK",
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
  "/farmasi/daftar-resep-dokter": "Resep Dokter",
  "/farmasi/resep-obat": "Input Resep",
  "/resume-pasien": "Resume Pasien",
  "/riwayat-pasien": "Riwayat Pasien",
  "/farmasi/copy-resep": "Copy Resep",
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

  const segmenTerakhir = pathNormal.split("/").filter(Boolean).at(-1);
  return segmenTerakhir ? formatSegmenPath(segmenTerakhir) : "Home";
}

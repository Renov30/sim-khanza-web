"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "rujukan-masuk",
  caption: "Daftar rujukan pasien masuk rumah sakit",
  endpoint: "/api/registrasi/rujukan-masuk",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, perujuk, No. Rujuk, pasien, dokter perujuk...",
  minWidthTabel: "80rem",
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "tgl_registrasi", label: "Tgl. Reg", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "perujuk", label: "Asal Perujuk" },
    { kunci: "alamat", label: "Alamat Perujuk" },
    { kunci: "no_rujuk", label: "No. Rujuk", tipe: "mono" },
    { kunci: "dokter_perujuk", label: "Dokter Perujuk" },
    { kunci: "kd_penyakit", label: "ICD-10", tipe: "mono", align: "center" },
    { kunci: "kategori_rujuk", label: "Kategori", align: "center" },
    { kunci: "jm_perujuk", label: "JM Perujuk", tipe: "uang", align: "right" },
    { kunci: "no_balasan", label: "No. Balasan", tipe: "mono" },
    { kunci: "keterangan", label: "Keterangan" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Rujukan Masuk",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_rawat: String(b.no_rawat ?? "") }),
    labelHapus: (b) => `Rujukan Masuk ${String(b.no_rawat ?? "")}`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "perujuk", label: "Asal Perujuk", tipe: "text", wajib: true, maxLength: 60 },
      { nama: "alamat", label: "Alamat Perujuk", tipe: "text", maxLength: 70 },
      { nama: "no_rujuk", label: "No. Rujuk", tipe: "text", maxLength: 40 },
      { nama: "dokter_perujuk", label: "Dokter Perujuk", tipe: "text", maxLength: 50 },
      { nama: "kd_penyakit", label: "Kode ICD-10", tipe: "text", maxLength: 15 },
      { nama: "kategori_rujuk", label: "Kategori", tipe: "select", opsiKey: "kategori", defaultValue: "-" },
      { nama: "jm_perujuk", label: "JM Perujuk (Rp)", tipe: "number", defaultValue: "0" },
      { nama: "no_balasan", label: "No. Balasan", tipe: "text", maxLength: 20 },
      { nama: "keterangan", label: "Keterangan", tipe: "text", maxLength: 200 },
    ],
  },
};

export default function HalamanRujukanMasuk() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

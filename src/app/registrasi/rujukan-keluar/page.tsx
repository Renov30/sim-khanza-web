"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "rujukan-keluar",
  caption: "Daftar rujukan pasien keluar rumah sakit",
  endpoint: "/api/registrasi/rujukan-keluar",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rujuk, No. Rawat, pasien, tujuan rujukan, diagnosa...",
  minWidthTabel: "80rem",
  kolom: [
    { kunci: "no_rujuk", label: "No. Rujuk", tipe: "mono" },
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "rujuk_ke", label: "Tujuan Rujukan" },
    { kunci: "tgl_rujuk", label: "Tgl. Rujuk", tipe: "mono", align: "center" },
    { kunci: "jam", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "keterangan_diagnosa", label: "Diagnosa" },
    { kunci: "nm_dokter", label: "Dokter Perujuk" },
    { kunci: "kat_rujuk", label: "Kategori", align: "center" },
    { kunci: "ambulance", label: "Ambulance", align: "center" },
    { kunci: "keterangan", label: "Keterangan" },
  ],
  kunciBaris: (b) => `${String(b.no_rujuk ?? "")}__${String(b.no_rawat ?? "")}`,
  form: {
    judulPanel: ".: Input / Kelola Rujukan Keluar",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      no_rujuk: String(b.no_rujuk ?? ""),
      no_rawat: String(b.no_rawat ?? ""),
    }),
    labelHapus: (b) => `Rujukan Keluar ${String(b.no_rujuk ?? "")}`,
    fields: [
      { nama: "no_rujuk", label: "No. Rujuk", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 40 },
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "rujuk_ke", label: "Tujuan Rujukan", tipe: "text", wajib: true, maxLength: 150 },
      { nama: "tgl_rujuk", label: "Tgl. Rujuk", tipe: "date", wajib: true },
      { nama: "jam", label: "Jam Rujuk", tipe: "time", wajib: true },
      { nama: "kd_dokter", label: "Dokter Perujuk", tipe: "select", wajib: true, opsiKey: "dokter" },
      { nama: "kat_rujuk", label: "Kategori Rujuk", tipe: "select", opsiKey: "kategori", defaultValue: "-" },
      { nama: "ambulance", label: "Ambulance", tipe: "select", opsiKey: "ambulance", defaultValue: "-" },
      { nama: "keterangan_diagnosa", label: "Diagnosa", tipe: "textarea", wajib: true, maxLength: 500 },
      { nama: "keterangan", label: "Keterangan", tipe: "textarea", maxLength: 500 },
    ],
  },
};

export default function HalamanRujukanKeluar() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

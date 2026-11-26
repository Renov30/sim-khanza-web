"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "permintaan-rawat-inap",
  caption: "Daftar permintaan rawat inap pasien",
  endpoint: "/api/rawat-inap/permintaan",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, kamar, bangsal, diagnosa...",
  minWidthTabel: "84rem",
  filterSelect: [{ param: "status", label: "Status Masuk", opsiKey: "status", lebar: "w-44" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "jk", label: "J.K.", align: "center" },
    { kunci: "umur", label: "Umur", align: "center" },
    { kunci: "png_jawab", label: "Cara Bayar" },
    { kunci: "nm_poli", label: "Asal Poli" },
    { kunci: "nm_dokter", label: "Dokter Perujuk" },
    { kunci: "tanggal", label: "Tgl. Permintaan", tipe: "mono", align: "center" },
    { kunci: "kd_kamar", label: "Kamar Diminta", tipe: "mono" },
    { kunci: "nm_bangsal", label: "Bangsal" },
    { kunci: "trf_kamar", label: "Tarif", tipe: "uang", align: "right" },
    { kunci: "diagnosa", label: "Diagnosa Awal" },
    { kunci: "catatan", label: "Catatan" },
    { kunci: "status_masuk", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Permintaan Rawat Inap",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_rawat: String(b.no_rawat ?? "") }),
    labelHapus: (b) => `Permintaan Ranap ${String(b.no_rawat ?? "")}`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17, placeholder: "YYYY/MM/DD/000001" },
      { nama: "tanggal", label: "Tanggal", tipe: "date", wajib: true },
      { nama: "kd_kamar", label: "Kamar Diminta", tipe: "select", wajib: true, opsiKey: "kamar" },
      { nama: "diagnosa", label: "Diagnosa Awal", tipe: "text", wajib: true, maxLength: 50 },
      { nama: "catatan", label: "Catatan", tipe: "text", maxLength: 50 },
    ],
  },
};

export default function HalamanPermintaanRawatInap() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

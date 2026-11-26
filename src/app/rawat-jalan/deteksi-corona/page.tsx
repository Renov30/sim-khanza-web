"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "deteksi-dini-corona",
  caption: "Daftar skrining deteksi dini penyakit menular / corona",
  endpoint: "/api/rawat-jalan/deteksi-corona",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, atau petugas...",
  minWidthTabel: "86rem",
  filterSelect: [{ param: "kesimpulan", label: "Kesimpulan", opsiKey: "kesimpulan", lebar: "w-44" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "tanggal", label: "Tgl. Skrining", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "gejala_demam", label: "Demam", align: "center" },
    { kunci: "gejala_batuk", label: "Batuk", align: "center" },
    { kunci: "gejala_sesak", label: "Sesak", align: "center" },
    { kunci: "faktor_riwayat_perjalanan", label: "Perjalanan", align: "center" },
    { kunci: "faktor_paparan_kontakpositif", label: "Kontak (+)", align: "center" },
    { kunci: "kesimpulan", label: "Kesimpulan", tipe: "status", align: "center" },
    { kunci: "tindak_lanjut", label: "Tindak Lanjut", align: "center" },
    { kunci: "nama_petugas", label: "Petugas" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Deteksi Dini Corona",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_rawat: String(b.no_rawat ?? "") }),
    labelHapus: (b) => `Deteksi Dini Corona ${String(b.no_rawat ?? "")}`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "tanggal", label: "Tgl. Skrining", tipe: "date", wajib: true },
      { nama: "nip", label: "Petugas", tipe: "select", opsiKey: "petugas" },
      { nama: "gejala_demam", label: "Demam", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "gejala_batuk", label: "Batuk", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "gejala_sesak", label: "Sesak Napas", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "gejala_riwayat_sakit", label: "Riwayat Sakit", tipe: "text", maxLength: 50 },
      { nama: "gejala_riwayat_periksa", label: "Riwayat Periksa", tipe: "text", maxLength: 50 },
      { nama: "faktor_riwayat_perjalanan", label: "Perjalanan", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "faktor_asal_daerah", label: "Asal Daerah", tipe: "text", maxLength: 50 },
      { nama: "faktor_paparan_kontakpositif", label: "Kontak Positif", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "faktor_paparan_kontakpdp", label: "Kontak PDP", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "kesimpulan", label: "Kesimpulan", tipe: "select", opsiKey: "kesimpulan", defaultValue: "Bukan ketiganya" },
      { nama: "tindak_lanjut", label: "Tindak Lanjut", tipe: "select", opsiKey: "tindakLanjut", defaultValue: "Rawat Jalan" },
    ],
  },
};

export default function HalamanDeteksiDiniCorona() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

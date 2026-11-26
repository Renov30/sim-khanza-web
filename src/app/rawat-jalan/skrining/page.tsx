"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "skrining-rawat-jalan",
  caption: "Daftar skrining pasien rawat jalan",
  endpoint: "/api/rawat-jalan/skrining",
  pakaiPeriode: true,
  placeholderCari: "Cari No. RM, nama pasien, NIP atau nama petugas...",
  minWidthTabel: "80rem",
  filterSelect: [{ param: "keputusan", label: "Keputusan", opsiKey: "keputusan", lebar: "w-44" }],
  kolom: [
    { kunci: "tanggal", label: "Tgl. Skrining", tipe: "mono", align: "center" },
    { kunci: "jam", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "jk", label: "J.K.", align: "center" },
    { kunci: "geriatri", label: "Geriatri", align: "center" },
    { kunci: "kesadaran", label: "Kesadaran" },
    { kunci: "pernapasan", label: "Pernapasan" },
    { kunci: "nyeri_dada", label: "Nyeri Dada" },
    { kunci: "skala_nyeri", label: "Skala Nyeri" },
    { kunci: "keputusan", label: "Keputusan", tipe: "status", align: "center" },
    { kunci: "nama_petugas", label: "Petugas" },
  ],
  kunciBaris: (b) => `${String(b.tanggal ?? "")}__${String(b.jam ?? "")}__${String(b.no_rkm_medis ?? "")}`,
  form: {
    judulPanel: ".: Input / Kelola Skrining Rawat Jalan",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      tanggal: String(b.tanggal ?? ""),
      jam: String(b.jam ?? ""),
      no_rkm_medis: String(b.no_rkm_medis ?? ""),
    }),
    labelHapus: (b) => `Skrining RM ${String(b.no_rkm_medis ?? "")} (${String(b.tanggal ?? "")})`,
    fields: [
      { nama: "tanggal", label: "Tanggal", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "jam", label: "Jam", tipe: "time", wajib: true, readOnlySaatEdit: true },
      { nama: "no_rkm_medis", label: "No. RM", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 15 },
      { nama: "geriatri", label: "Geriatri", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "kesadaran", label: "Kesadaran", tipe: "select", opsiKey: "kesadaran", defaultValue: "Sadar penuh" },
      { nama: "pernapasan", label: "Pernapasan", tipe: "select", opsiKey: "pernapasan", defaultValue: "Nafas normal" },
      { nama: "nyeri_dada", label: "Nyeri Dada", tipe: "select", opsiKey: "nyeriDada", defaultValue: "Tidak ada" },
      { nama: "skala_nyeri", label: "Skala Nyeri", tipe: "select", opsiKey: "skalaNyeri", defaultValue: "Tidak sakit" },
      { nama: "keputusan", label: "Keputusan", tipe: "select", opsiKey: "keputusan", defaultValue: "Sesuai antrian" },
      { nama: "nip", label: "Petugas", tipe: "select", opsiKey: "petugas" },
    ],
  },
};

export default function HalamanSkriningRawatJalan() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

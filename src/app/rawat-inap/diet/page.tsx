"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "diet-pasien",
  caption: "Daftar pemberian diet pasien rawat inap",
  endpoint: "/api/rawat-inap/diet",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, kamar, bangsal, jenis diet...",
  minWidthTabel: "68rem",
  filterSelect: [{ param: "waktu", label: "Waktu Diet", opsiKey: "waktu", lebar: "w-36" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "kd_kamar", label: "Kamar", tipe: "mono" },
    { kunci: "nm_bangsal", label: "Bangsal" },
    { kunci: "tanggal", label: "Tanggal", tipe: "mono", align: "center" },
    { kunci: "waktu", label: "Waktu", align: "center" },
    { kunci: "jam", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "nama_diet", label: "Jenis Diet" },
  ],
  kunciBaris: (b) =>
    `${String(b.no_rawat ?? "")}__${String(b.kd_kamar ?? "")}__${String(b.tanggal ?? "")}__${String(b.waktu ?? "")}__${String(b.kd_diet ?? "")}`,
  form: {
    judulPanel: ".: Input Pemberian Diet Pasien",
    bisaTambah: true,
    bisaUbah: false,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      no_rawat: String(b.no_rawat ?? ""),
      kd_kamar: String(b.kd_kamar ?? ""),
      tanggal: String(b.tanggal ?? ""),
      waktu: String(b.waktu ?? ""),
      kd_diet: String(b.kd_diet ?? ""),
    }),
    labelHapus: (b) => `Diet ${String(b.nama_diet ?? "")} (${String(b.no_rawat ?? "")})`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, maxLength: 17 },
      { nama: "kd_kamar", label: "Kamar", tipe: "select", wajib: true, opsiKey: "kamar" },
      { nama: "tanggal", label: "Tanggal", tipe: "date", wajib: true },
      { nama: "waktu", label: "Waktu Diet", tipe: "select", wajib: true, opsiKey: "waktu", defaultValue: "Pagi" },
      { nama: "kd_diet", label: "Jenis Diet", tipe: "select", wajib: true, opsiKey: "diet" },
    ],
  },
};

export default function HalamanDietPasien() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

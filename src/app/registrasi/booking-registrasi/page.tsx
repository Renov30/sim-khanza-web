"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "booking-registrasi",
  caption: "Daftar booking registrasi pasien",
  endpoint: "/api/registrasi/booking-registrasi",
  pakaiPeriode: true,
  placeholderCari: "Cari No. RM, nama pasien, dokter, poliklinik, No. Reg...",
  minWidthTabel: "76rem",
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-44" }],
  kolom: [
    { kunci: "tanggal_booking", label: "Tgl. Booking", tipe: "mono", align: "center" },
    { kunci: "jam_booking", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "tanggal_periksa", label: "Tgl. Periksa", tipe: "mono", align: "center" },
    { kunci: "no_reg", label: "No. Reg", tipe: "mono", align: "center" },
    { kunci: "nm_dokter", label: "Dokter" },
    { kunci: "nm_poli", label: "Poliklinik" },
    { kunci: "png_jawab", label: "Cara Bayar" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => `${String(b.no_rkm_medis ?? "")}__${String(b.tanggal_periksa ?? "")}`,
  form: {
    judulPanel: ".: Input / Kelola Booking Registrasi",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      no_rkm_medis: String(b.no_rkm_medis ?? ""),
      tanggal_periksa: String(b.tanggal_periksa ?? ""),
    }),
    labelHapus: (b) => `Booking RM ${String(b.no_rkm_medis ?? "")} tgl ${String(b.tanggal_periksa ?? "")}`,
    fields: [
      { nama: "no_rkm_medis", label: "No. RM", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 15, placeholder: "Contoh: 000123" },
      { nama: "tanggal_periksa", label: "Tgl. Periksa", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "kd_poli", label: "Poliklinik", tipe: "select", wajib: true, opsiKey: "poli" },
      { nama: "kd_dokter", label: "Dokter", tipe: "select", wajib: true, opsiKey: "dokter" },
      { nama: "kd_pj", label: "Cara Bayar", tipe: "select", wajib: true, opsiKey: "penjab" },
      { nama: "status", label: "Status", tipe: "select", opsiKey: "status", defaultValue: "Belum" },
    ],
  },
};

export default function HalamanBookingRegistrasi() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

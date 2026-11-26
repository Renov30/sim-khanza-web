"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "booking-periksa",
  caption: "Daftar booking periksa pasien",
  endpoint: "/api/registrasi/booking-periksa",
  pakaiPeriode: true,
  placeholderCari: "Cari no. booking, nama pasien, alamat, no. telp, poli...",
  minWidthTabel: "76rem",
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-40" }],
  kolom: [
    { kunci: "no_booking", label: "No. Booking", tipe: "mono" },
    { kunci: "tanggal_booking", label: "Waktu Booking", tipe: "mono" },
    { kunci: "tanggal", label: "Tgl. Periksa", tipe: "mono", align: "center" },
    { kunci: "nama", label: "Nama Pasien" },
    { kunci: "alamat", label: "Alamat" },
    { kunci: "no_telp", label: "No. Telp", tipe: "mono" },
    { kunci: "nm_poli", label: "Poliklinik" },
    { kunci: "tambahan_pesan", label: "Pesan" },
    { kunci: "balasan", label: "Balasan" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.no_booking ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Booking Periksa",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_booking: String(b.no_booking ?? "") }),
    labelHapus: (b) => `${String(b.no_booking ?? "")} (${String(b.nama ?? "")})`,
    fields: [
      { nama: "no_booking", label: "No. Booking", tipe: "text", readOnlySaatEdit: true, placeholder: "Otomatis saat simpan baru" },
      { nama: "tanggal", label: "Tgl. Periksa", tipe: "date", wajib: true },
      { nama: "nama", label: "Nama Pasien", tipe: "text", wajib: true, maxLength: 40 },
      { nama: "alamat", label: "Alamat", tipe: "text", maxLength: 200 },
      { nama: "no_telp", label: "No. Telp", tipe: "text", maxLength: 40 },
      { nama: "email", label: "Email", tipe: "text", maxLength: 50 },
      { nama: "kd_poli", label: "Poliklinik", tipe: "select", wajib: true, opsiKey: "poli" },
      { nama: "status", label: "Status", tipe: "select", opsiKey: "status", defaultValue: "Belum Dibalas" },
      { nama: "tambahan_pesan", label: "Tambahan Pesan", tipe: "textarea", maxLength: 400 },
      { nama: "balasan", label: "Balasan Petugas", tipe: "textarea", maxLength: 200 },
    ],
  },
};

export default function HalamanBookingPeriksa() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

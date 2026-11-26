"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "booking-mcu-perusahaan",
  caption: "Daftar booking MCU perusahaan",
  endpoint: "/api/registrasi/booking-mcu-perusahaan",
  pakaiPeriode: true,
  placeholderCari: "Cari No. MCU, No. RM, nama pasien, perusahaan...",
  minWidthTabel: "70rem",
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-44" }],
  kolom: [
    { kunci: "no_mcu", label: "No. MCU", tipe: "mono" },
    { kunci: "tanggal_booking", label: "Tgl. Booking", tipe: "mono", align: "center" },
    { kunci: "jam_booking", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "tanggal_mcu", label: "Tgl. MCU", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "jk", label: "J.K.", align: "center" },
    { kunci: "nama_perusahaan", label: "Perusahaan" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.no_mcu ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Booking MCU Perusahaan",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_mcu: String(b.no_mcu ?? "") }),
    labelHapus: (b) => `Booking MCU ${String(b.no_mcu ?? "")}`,
    fields: [
      { nama: "no_mcu", label: "No. MCU", tipe: "text", readOnlySaatEdit: true, placeholder: "Otomatis saat simpan baru" },
      { nama: "no_rkm_medis", label: "No. RM", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 15 },
      { nama: "tanggal_mcu", label: "Tgl. MCU", tipe: "date", wajib: true },
      { nama: "kode_perusahaan", label: "Perusahaan", tipe: "select", wajib: true, opsiKey: "perusahaan" },
      { nama: "status", label: "Status", tipe: "select", opsiKey: "status", defaultValue: "Terdaftar" },
    ],
  },
};

export default function HalamanBookingMcuPerusahaan() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

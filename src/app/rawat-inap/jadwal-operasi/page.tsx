"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "jadwal-operasi",
  caption: "Daftar jadwal dan booking operasi",
  endpoint: "/api/rawat-inap/jadwal-operasi",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, pasien, tindakan operasi, dokter, ruang OK...",
  minWidthTabel: "76rem",
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-44" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "umur", label: "Umur", align: "center" },
    { kunci: "jk", label: "J.K.", align: "center" },
    { kunci: "tanggal", label: "Tanggal", tipe: "mono", align: "center" },
    { kunci: "jam_mulai", label: "Mulai", tipe: "mono", align: "center" },
    { kunci: "jam_selesai", label: "Selesai", tipe: "mono", align: "center" },
    { kunci: "nm_perawatan", label: "Tindakan Operasi" },
    { kunci: "nm_dokter", label: "Operator" },
    { kunci: "nm_ruang_ok", label: "Ruang OK" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => `${String(b.no_rawat ?? "")}__${String(b.kode_paket ?? "")}__${String(b.tanggal ?? "")}__${String(b.jam_mulai ?? "")}`,
  form: {
    judulPanel: ".: Input / Kelola Jadwal Operasi",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      no_rawat: String(b.no_rawat ?? ""),
      kode_paket: String(b.kode_paket ?? ""),
      tanggal: String(b.tanggal ?? ""),
      jam_mulai: String(b.jam_mulai ?? ""),
    }),
    labelHapus: (b) => `Jadwal Operasi ${String(b.no_rawat ?? "")} (${String(b.tanggal ?? "")})`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "kode_paket", label: "Paket Operasi", tipe: "select", wajib: true, readOnlySaatEdit: true, opsiKey: "paket" },
      { nama: "tanggal", label: "Tgl. Operasi", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "jam_mulai", label: "Jam Mulai", tipe: "time", wajib: true, readOnlySaatEdit: true },
      { nama: "jam_selesai", label: "Jam Selesai", tipe: "time", wajib: true, defaultValue: "09:00:00" },
      { nama: "kd_dokter", label: "Dokter Operator", tipe: "select", wajib: true, opsiKey: "dokter" },
      { nama: "kd_ruang_ok", label: "Ruang OK", tipe: "select", wajib: true, opsiKey: "ruangOk" },
      { nama: "status", label: "Status", tipe: "select", opsiKey: "status", defaultValue: "Menunggu" },
    ],
  },
};

export default function HalamanJadwalOperasi() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

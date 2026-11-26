"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "deposit-pasien",
  caption: "Daftar deposit / uang muka pasien",
  endpoint: "/api/rawat-inap/deposit",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Deposit, No. Rawat, No. RM, pasien, akun bayar...",
  minWidthTabel: "76rem",
  ringkasanKartu: [{ kunci: "totalDeposit", label: "Total Deposit (Filter Aktif)", tipe: "uang" }],
  kolom: [
    { kunci: "no_deposit", label: "No. Deposit", tipe: "mono" },
    { kunci: "tgl_deposit", label: "Waktu Deposit", tipe: "mono" },
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "nama_bayar", label: "Akun Bayar" },
    { kunci: "besar_deposit", label: "Deposit (Rp)", tipe: "uang", align: "right" },
    { kunci: "besarppn", label: "PPN (Rp)", tipe: "uang", align: "right" },
    { kunci: "total_bayar", label: "Total (Rp)", tipe: "uang", align: "right" },
    { kunci: "nama_petugas", label: "Petugas" },
    { kunci: "keterangan", label: "Keterangan" },
  ],
  kunciBaris: (b) => String(b.no_deposit ?? ""),
  form: {
    judulPanel: ".: Input Deposit / Uang Muka Pasien",
    bisaTambah: true,
    bisaUbah: false,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_deposit: String(b.no_deposit ?? "") }),
    labelHapus: (b) => `Deposit ${String(b.no_deposit ?? "")}`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, maxLength: 17, placeholder: "YYYY/MM/DD/000001" },
      { nama: "tgl_only", label: "Tanggal", tipe: "date", wajib: true },
      { nama: "jam_only", label: "Jam", tipe: "time", wajib: true },
      { nama: "nama_bayar", label: "Akun Bayar", tipe: "select", wajib: true, opsiKey: "akunBayar" },
      { nama: "besar_deposit", label: "Besar Deposit (Rp)", tipe: "number", wajib: true, placeholder: "Contoh: 500000" },
      { nama: "nip", label: "Petugas", tipe: "select", opsiKey: "petugas" },
      { nama: "keterangan", label: "Keterangan", tipe: "text", maxLength: 70 },
    ],
  },
};

export default function HalamanDepositPasien() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

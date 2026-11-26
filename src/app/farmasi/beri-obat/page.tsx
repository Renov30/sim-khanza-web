"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "beri-obat",
  caption: "Daftar pemberian obat dan BHP pasien",
  endpoint: "/api/farmasi/beri-obat",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, kode/nama obat, depo...",
  minWidthTabel: "82rem",
  ringkasanKartu: [{ kunci: "totalBiaya", label: "Total Biaya Pemberian Obat (Filter Aktif)", tipe: "uang" }],
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-36" }],
  kolom: [
    { kunci: "tgl_perawatan", label: "Tanggal", tipe: "mono", align: "center" },
    { kunci: "jam", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "kode_brng", label: "Kode Obat", tipe: "mono" },
    { kunci: "nama_brng", label: "Nama Obat / BHP" },
    { kunci: "jml", label: "Jml", tipe: "mono", align: "right" },
    { kunci: "biaya_obat", label: "Harga (Rp)", tipe: "uang", align: "right" },
    { kunci: "embalase", label: "Embalase", tipe: "uang", align: "right" },
    { kunci: "tuslah", label: "Tuslah", tipe: "uang", align: "right" },
    { kunci: "total", label: "Total (Rp)", tipe: "uang", align: "right" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
    { kunci: "nm_bangsal", label: "Depo / Asal Stok" },
  ],
  kunciBaris: (b) =>
    `${String(b.tgl_perawatan ?? "")}__${String(b.jam ?? "")}__${String(b.no_rawat ?? "")}__${String(b.kode_brng ?? "")}__${String(b.no_batch ?? "")}__${String(b.no_faktur ?? "")}`,
  form: {
    judulPanel: ".: Input Pemberian Obat / BHP Pasien",
    bisaTambah: true,
    bisaUbah: false,
    bisaHapus: true,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "tgl_perawatan", label: "Tanggal", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "jam", label: "Jam", tipe: "time", wajib: true, readOnlySaatEdit: true },
      { nama: "kode_brng", label: "Kode Obat/BHP", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 15, placeholder: "Contoh: B000000001" },
      { nama: "jml", label: "Jumlah", tipe: "number", wajib: true, defaultValue: "1" },
      { nama: "biaya_obat", label: "Harga (0=Auto)", tipe: "number", defaultValue: "0" },
      { nama: "embalase", label: "Embalase", tipe: "number", defaultValue: "0" },
      { nama: "tuslah", label: "Tuslah", tipe: "number", defaultValue: "0" },
      { nama: "status", label: "Status", tipe: "select", wajib: true, opsiKey: "status", defaultValue: "Ralan" },
      { nama: "kd_bangsal", label: "Depo / Bangsal", tipe: "select", wajib: true, opsiKey: "bangsal" },
      { nama: "no_batch", label: "No. Batch", tipe: "text", maxLength: 20 },
      { nama: "no_faktur", label: "No. Faktur", tipe: "text", maxLength: 20 },
    ],
    kunciHapusParams: (b) => ({
      tgl_perawatan: String(b.tgl_perawatan ?? ""),
      jam: String(b.jam ?? ""),
      no_rawat: String(b.no_rawat ?? ""),
      kode_brng: String(b.kode_brng ?? ""),
      no_batch: String(b.no_batch ?? ""),
      no_faktur: String(b.no_faktur ?? ""),
    }),
    labelHapus: (b) => `${String(b.kode_brng ?? "")} (${String(b.no_rawat ?? "")})`,
  },
};

export default function HalamanBeriObat() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "resep-pulang",
  caption: "Daftar resep pulang pasien rawat inap",
  endpoint: "/api/farmasi/resep-pulang",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, kode/nama obat...",
  minWidthTabel: "78rem",
  ringkasanKartu: [{ kunci: "totalBiaya", label: "Total Biaya Resep Pulang (Filter Aktif)", tipe: "uang" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "tanggal", label: "Tgl. Resep", tipe: "mono", align: "center" },
    { kunci: "jam", label: "Jam", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "kode_brng", label: "Kode Obat", tipe: "mono" },
    { kunci: "nama_brng", label: "Nama Obat" },
    { kunci: "jml_barang", label: "Jml", tipe: "mono", align: "right" },
    { kunci: "harga", label: "Harga (Rp)", tipe: "uang", align: "right" },
    { kunci: "total", label: "Total (Rp)", tipe: "uang", align: "right" },
    { kunci: "dosis", label: "Aturan Pakai / Dosis" },
    { kunci: "nm_bangsal", label: "Depo" },
    { kunci: "no_batch", label: "No. Batch", tipe: "mono" },
  ],
  kunciBaris: (b) =>
    `${String(b.no_rawat ?? "")}__${String(b.tanggal ?? "")}__${String(b.jam ?? "")}__${String(b.kode_brng ?? "")}__${String(b.no_batch ?? "")}__${String(b.no_faktur ?? "")}`,
  form: {
    judulPanel: ".: Input Resep Pulang Pasien",
    bisaTambah: true,
    bisaUbah: false,
    bisaHapus: true,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "tanggal", label: "Tgl. Resep", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "jam", label: "Jam", tipe: "time", wajib: true, readOnlySaatEdit: true },
      { nama: "kode_brng", label: "Kode Obat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 15, placeholder: "Contoh: B000000001" },
      { nama: "jml_barang", label: "Jumlah", tipe: "number", wajib: true, defaultValue: "1" },
      { nama: "harga", label: "Harga (0=Auto)", tipe: "number", defaultValue: "0" },
      { nama: "dosis", label: "Aturan Pakai", tipe: "text", wajib: true, maxLength: 150, placeholder: "Contoh: 3 x 1 sesudah makan" },
      { nama: "kd_bangsal", label: "Depo / Bangsal", tipe: "select", wajib: true, opsiKey: "bangsal" },
      { nama: "no_batch", label: "No. Batch", tipe: "text", maxLength: 20 },
      { nama: "no_faktur", label: "No. Faktur", tipe: "text", maxLength: 20 },
    ],
    kunciHapusParams: (b) => ({
      no_rawat: String(b.no_rawat ?? ""),
      tanggal: String(b.tanggal ?? ""),
      jam: String(b.jam ?? ""),
      kode_brng: String(b.kode_brng ?? ""),
      no_batch: String(b.no_batch ?? ""),
      no_faktur: String(b.no_faktur ?? ""),
    }),
    labelHapus: (b) => `${String(b.kode_brng ?? "")} (${String(b.no_rawat ?? "")})`,
  },
};

export default function HalamanResepPulang() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

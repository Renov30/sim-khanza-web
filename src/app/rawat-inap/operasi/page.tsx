"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "operasi",
  caption: "Daftar tagihan dan laporan operasi / VK",
  endpoint: "/api/rawat-inap/operasi",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, paket operasi, operator...",
  minWidthTabel: "86rem",
  ringkasanKartu: [{ kunci: "totalBiaya", label: "Total Tagihan Operasi (Filter Aktif)", tipe: "uang" }],
  filterSelect: [{ param: "status", label: "Status", opsiKey: "status", lebar: "w-36" }],
  kolom: [
    { kunci: "tgl_operasi", label: "Tgl. Operasi", tipe: "mono" },
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "nm_perawatan", label: "Tindakan Operasi / VK" },
    { kunci: "kategori", label: "Kategori", align: "center" },
    { kunci: "jenis_anasthesi", label: "Anestesi", align: "center" },
    { kunci: "nm_operator", label: "Operator 1" },
    { kunci: "status", label: "Status", tipe: "status", align: "center" },
    { kunci: "total_biaya", label: "Total Biaya (Rp)", tipe: "uang", align: "right" },
    { kunci: "diagnosa_preop", label: "Diagnosa Pre-Op" },
    { kunci: "diagnosa_postop", label: "Diagnosa Post-Op" },
  ],
  kunciBaris: (b) => `${String(b.no_rawat ?? "")}__${String(b.tgl_operasi ?? "")}__${String(b.kode_paket ?? "")}`,
  form: {
    judulPanel: ".: Lengkapi / Ubah Laporan Operasi (Pilih Baris Operasi)",
    bisaTambah: false,
    bisaUbah: true,
    bisaHapus: false,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "tgl_operasi", label: "Waktu Operasi", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 19 },
      { nama: "diagnosa_preop", label: "Diagnosa Pre-Op", tipe: "text", wajib: true, maxLength: 100 },
      { nama: "diagnosa_postop", label: "Diagnosa Post-Op", tipe: "text", wajib: true, maxLength: 100 },
      { nama: "jaringan_dieksekusi", label: "Jaringan Dieksisi", tipe: "text", maxLength: 100 },
      {
        nama: "permintaan_pa",
        label: "Kirim PA",
        tipe: "select",
        opsiStatis: [
          { value: "Tidak", label: "Tidak" },
          { value: "Ya", label: "Ya" },
        ],
        defaultValue: "Tidak",
      },
      { nama: "laporan_operasi", label: "Laporan Operasi", tipe: "textarea", wajib: true, maxLength: 10000 },
    ],
  },
};

export default function HalamanOperasi() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

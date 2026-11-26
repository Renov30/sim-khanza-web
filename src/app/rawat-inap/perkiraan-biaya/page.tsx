"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "perkiraan-biaya-ranap",
  caption: "Daftar perkiraan biaya pasien rawat inap aktif",
  endpoint: "/api/rawat-inap/perkiraan-biaya",
  placeholderCari: "Cari No. Rawat, No. RM, pasien, kamar, atau bangsal...",
  minWidthTabel: "92rem",
  filterSelect: [{ param: "bangsal", label: "Bangsal", opsiKey: "bangsal", lebar: "w-48" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "kamar_bangsal", label: "Kamar / Bangsal" },
    { kunci: "png_jawab", label: "Cara Bayar" },
    { kunci: "registrasi", label: "Reg.", tipe: "uang", align: "right" },
    { kunci: "biaya_kamar", label: "Kamar", tipe: "uang", align: "right" },
    { kunci: "tindakan", label: "Tindakan", tipe: "uang", align: "right" },
    { kunci: "obat", label: "Obat", tipe: "uang", align: "right" },
    { kunci: "laborat", label: "Lab", tipe: "uang", align: "right" },
    { kunci: "radiologi", label: "Rad", tipe: "uang", align: "right" },
    { kunci: "total_biaya", label: "Total Sementara", tipe: "uang", align: "right" },
    { kunci: "deposit", label: "Deposit", tipe: "uang", align: "right" },
    { kunci: "kekurangan", label: "Kekurangan", tipe: "uang", align: "right" },
    { kunci: "kd_penyakit", label: "ICD-10", tipe: "mono", align: "center" },
    { kunci: "perkiraan_tarif", label: "Perkiraan Tarif", tipe: "uang", align: "right" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
  form: {
    judulPanel: ".: Tetapkan Perkiraan Tarif / ICD-10 Pasien Terpilih",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: false,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "kd_penyakit", label: "Kode ICD-10", tipe: "text", wajib: true, maxLength: 15 },
      { nama: "perkiraan_tarif", label: "Perkiraan Tarif (Rp)", tipe: "number", wajib: true, defaultValue: "0" },
    ],
  },
};

export default function HalamanPerkiraanBiayaRanap() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

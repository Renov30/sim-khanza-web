"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "informasi-kamar",
  caption: "Daftar ketersediaan kamar dan tempat tidur rawat inap",
  endpoint: "/api/rawat-inap/informasi-kamar",
  placeholderCari: "Cari kode kamar, bangsal, kelas, atau status...",
  minWidthTabel: "56rem",
  ringkasanKartu: [
    { kunci: "TOTAL", label: "Total Bed Aktif" },
    { kunci: "KOSONG", label: "Bed Kosong" },
    { kunci: "ISI", label: "Bed Terisi" },
    { kunci: "DIBERSIHKAN", label: "Dibersihkan" },
    { kunci: "DIBOOKING", label: "Dibooking" },
  ],
  filterSelect: [
    { param: "bangsal", label: "Bangsal", opsiKey: "bangsal", lebar: "w-48" },
    { param: "kelas", label: "Kelas", opsiKey: "kelas", lebar: "w-36" },
    { param: "status", label: "Status", opsiKey: "status", lebar: "w-36" },
  ],
  kolom: [
    { kunci: "kd_kamar", label: "Kode Kamar", tipe: "mono" },
    { kunci: "kd_bangsal", label: "Kode Bangsal", tipe: "mono", align: "center" },
    { kunci: "nm_bangsal", label: "Nama Bangsal / Ruang" },
    { kunci: "kelas", label: "Kelas", align: "center" },
    { kunci: "trf_kamar", label: "Tarif Kamar (Rp)", tipe: "uang", align: "right" },
    { kunci: "status", label: "Status Bed", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.kd_kamar ?? ""),
};

export default function HalamanInformasiKamar() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

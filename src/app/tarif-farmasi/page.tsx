"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "tarif-farmasi",
  caption: "Daftar master tarif layanan farmasi RSUD Merauke",
  endpoint: "/api/tarif-farmasi",
  placeholderCari: "Cari jenis resep...",
  minWidthTabel: "50rem",
  kolom: [
    { kunci: "id", label: "ID", tipe: "mono", align: "center" },
    { kunci: "jenis_resep", label: "Jenis Resep / Pelayanan Farmasi" },
    { kunci: "total_apoteker", label: "Tarif Apoteker (Rp)", tipe: "uang", align: "right" },
    { kunci: "total_non_apoteker", label: "Tarif Non-Apoteker (Rp)", tipe: "uang", align: "right" },
    { kunci: "total_tarif", label: "Total Tarif (Rp)", tipe: "uang", align: "right" },
  ],
  kunciBaris: (b) => String(b.id ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Tarif Farmasi",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ id: String(b.id ?? "") }),
    labelHapus: (b) => `Tarif Farmasi ${String(b.jenis_resep ?? "")}`,
    fields: [
      { nama: "id", label: "ID Tarif", tipe: "text", readOnlySaatEdit: true, placeholder: "Otomatis saat simpan baru" },
      { nama: "jenis_resep", label: "Jenis Resep", tipe: "text", wajib: true, maxLength: 100 },
      { nama: "total_apoteker", label: "Tarif Apoteker", tipe: "number", defaultValue: "0" },
      { nama: "total_non_apoteker", label: "Tarif Non-Apoteker", tipe: "number", defaultValue: "0" },
    ],
  },
};

export default function HalamanTarifFarmasi() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

"use client";

import { LembarPermintaanLabSederhana, type KolomPermintaanLab } from "@/components/modul/LembarPermintaanLabSederhana";

const teks = (nilai: string | number | null | undefined) =>
  nilai === null || nilai === undefined || nilai === "" ? "-" : String(nilai);

const KOLOM: KolomPermintaanLab[] = [
  { label: "No. Order", kunci: "noorder", kelas: "font-semibold text-slate-800" },
  { label: "No. Rawat", kunci: "no_rawat", kelas: "font-medium text-slate-800" },
  {
    label: "Tgl Permintaan",
    tampil: (baris) => (
      <>
        {teks(baris.tgl_permintaan)} <span className="text-slate-400">{teks(baris.jam_permintaan)}</span>
      </>
    ),
  },
  { label: "No. RM", kunci: "no_rkm_medis", kelas: "font-semibold text-slate-800" },
  { label: "Nama Pasien", kunci: "nm_pasien", kelas: "font-medium text-slate-800" },
  { label: "Dokter Perujuk", tampil: (baris) => teks(baris.nm_dokter_perujuk || baris.dokter_perujuk), kelas: "text-slate-700" },
  { label: "Lokasi Jaringan", kunci: "lokasi_jaringan", kelas: "text-slate-700" },
  { label: "Diawetkan Dengan", kunci: "diawetkan_dengan", kelas: "text-[10px] text-slate-600" },
  { label: "Diagnosa Klinis", kunci: "diagnosa_klinis", kelas: "text-[10px] text-slate-600" },
  {
    label: "Status",
    kelas: "text-center",
    tampil: (baris) => (
      <span className="inline-block rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
        {teks(baris.status || "ralan")}
      </span>
    ),
  },
];

export default function HalamanPermintaanLabPA() {
  return (
    <LembarPermintaanLabSederhana
      endpoint="/api/laboratorium/permintaan-pa"
      nama="PA"
      placeholderPencarian="Cari No. Order, No. Rawat, Pasien, Jaringan..."
      kolom={KOLOM}
    />
  );
}

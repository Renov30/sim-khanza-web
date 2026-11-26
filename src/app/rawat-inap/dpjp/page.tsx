"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "dpjp-ranap",
  caption: "Daftar Dokter Penanggung Jawab Pasien (DPJP) Rawat Inap",
  endpoint: "/api/rawat-inap/dpjp",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, nama pasien, atau dokter DPJP...",
  minWidthTabel: "56rem",
  kolom: [
    { kunci: "tgl_registrasi", label: "Tgl. Registrasi", tipe: "mono", align: "center" },
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "kd_dokter", label: "Kode Dokter", tipe: "mono" },
    { kunci: "nm_dokter", label: "Nama Dokter DPJP" },
  ],
  kunciBaris: (b) => `${String(b.no_rawat ?? "")}__${String(b.kd_dokter ?? "")}`,
  form: {
    judulPanel: ".: Tambah DPJP Rawat Inap",
    bisaTambah: true,
    bisaUbah: false,
    bisaHapus: true,
    kunciHapusParams: (b) => ({
      no_rawat: String(b.no_rawat ?? ""),
      kd_dokter: String(b.kd_dokter ?? ""),
    }),
    labelHapus: (b) => `DPJP ${String(b.nm_dokter ?? "")} pada ${String(b.no_rawat ?? "")}`,
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, maxLength: 17, placeholder: "YYYY/MM/DD/000001" },
      { nama: "kd_dokter", label: "Dokter DPJP", tipe: "select", wajib: true, opsiKey: "dokter" },
    ],
  },
};

export default function HalamanDpjpRanap() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

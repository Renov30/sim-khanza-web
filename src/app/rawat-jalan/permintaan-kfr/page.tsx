"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "permintaan-kfr",
  caption: "Daftar permintaan layanan program Kedokteran Fisik dan Rehabilitasi (KFR)",
  endpoint: "/api/rawat-jalan/permintaan-kfr",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, diagnosa medis, dokter...",
  minWidthTabel: "86rem",
  filterSelect: [{ param: "status", label: "Status Program", opsiKey: "status", lebar: "w-44" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "tanggal", label: "Tgl. Permintaan", tipe: "mono" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "jk", label: "J.K.", align: "center" },
    { kunci: "png_jawab", label: "Cara Bayar" },
    { kunci: "nm_dokter", label: "Dokter Sp.KFR" },
    { kunci: "diagnosa_medis", label: "Diagnosa Medis" },
    { kunci: "diagnosa_fungsi", label: "Diagnosa Fungsi" },
    { kunci: "tatalaksana", label: "Tata Laksana KFR" },
    { kunci: "status_program", label: "Status", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
  form: {
    judulPanel: ".: Input / Kelola Permintaan Layanan Program KFR",
    bisaTambah: true,
    bisaUbah: true,
    bisaHapus: true,
    kunciHapusParams: (b) => ({ no_rawat: String(b.no_rawat ?? "") }),
    labelHapus: (b) => `Layanan KFR ${String(b.no_rawat ?? "")}`,
    mapBarisKeForm: (b) => {
      const dt = String(b.tanggal ?? "");
      const [tgl = "", jam = "08:00:00"] = dt.split(" ");
      return {
        no_rawat: String(b.no_rawat ?? ""),
        tgl_only: tgl,
        jam_only: jam,
        kd_dokter: String(b.kd_dokter ?? ""),
        pendamping: String(b.pendamping ?? "Tidak"),
        keterangan_pendamping: String(b.keterangan_pendamping ?? ""),
        anamnesa: String(b.anamnesa ?? ""),
        pemeriksaan_fisik: String(b.pemeriksaan_fisik ?? ""),
        diagnosa_medis: String(b.diagnosa_medis ?? ""),
        diagnosa_fungsi: String(b.diagnosa_fungsi ?? ""),
        tatalaksana: String(b.tatalaksana ?? ""),
        anjuran: String(b.anjuran ?? ""),
        evaluasi: String(b.evaluasi ?? ""),
        suspek_penyakit_kerja: String(b.suspek_penyakit_kerja ?? "Tidak"),
        keterangan_suspek_penyakit_kerja: String(b.keterangan_suspek_penyakit_kerja ?? ""),
        status_program: String(b.status_program ?? "Belum Selesai"),
      };
    },
    fields: [
      { nama: "no_rawat", label: "No. Rawat", tipe: "text", wajib: true, readOnlySaatEdit: true, maxLength: 17 },
      { nama: "tgl_only", label: "Tanggal", tipe: "date", wajib: true, readOnlySaatEdit: true },
      { nama: "jam_only", label: "Jam", tipe: "time", readOnlySaatEdit: true },
      { nama: "kd_dokter", label: "Dokter", tipe: "select", wajib: true, opsiKey: "dokter" },
      { nama: "pendamping", label: "Pendamping", tipe: "select", opsiKey: "pendamping", defaultValue: "Tidak" },
      { nama: "keterangan_pendamping", label: "Ket. Pendamping", tipe: "text", maxLength: 30 },
      { nama: "diagnosa_medis", label: "Diagnosa Medis", tipe: "text", wajib: true, maxLength: 200 },
      { nama: "diagnosa_fungsi", label: "Diagnosa Fungsi", tipe: "text", maxLength: 200 },
      { nama: "anamnesa", label: "Anamnesa", tipe: "textarea", maxLength: 500 },
      { nama: "pemeriksaan_fisik", label: "Pemeriksaan Fisik", tipe: "textarea", maxLength: 1500 },
      { nama: "tatalaksana", label: "Tata Laksana KFR", tipe: "textarea", wajib: true, maxLength: 2000 },
      { nama: "anjuran", label: "Anjuran", tipe: "textarea", maxLength: 500 },
      { nama: "evaluasi", label: "Evaluasi", tipe: "textarea", maxLength: 500 },
      { nama: "suspek_penyakit_kerja", label: "Suspek PAK", tipe: "select", opsiKey: "yaTidak", defaultValue: "Tidak" },
      { nama: "keterangan_suspek_penyakit_kerja", label: "Ket. Suspek", tipe: "text", maxLength: 70 },
      { nama: "status_program", label: "Status Program", tipe: "select", opsiKey: "status", defaultValue: "Belum Selesai" },
    ],
  },
};

export default function HalamanPermintaanKfr() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

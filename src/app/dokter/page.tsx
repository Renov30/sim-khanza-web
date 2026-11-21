"use client";

import React from "react";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import HalamanMasterKepegawaian, {
  type KonfigurasiMasterKepegawaian,
} from "@/components/modul/HalamanMasterKepegawaian";

const KONFIGURASI: KonfigurasiMasterKepegawaian = {
  id: "dokter",
  nama: "Dokter",
  jamak: "dokter",
  kode: "Kode Dokter",
  endpoint: "/api/dokter",
  kunciUtama: "kd_dokter",
  kunciLama: "kd_lama",
  kodeOtomatis: true,
  ikon: faStethoscope,
  placeholderCari: "Cari kode, nama, spesialis, atau nomor praktek...",
  fields: [
    { kunci: "kd_dokter", label: "Kode Dokter", maks: 20, placeholder: "Kode dokter" },
    { kunci: "nm_dokter", label: "Nama Dokter", maks: 50, placeholder: "Nama dokter" },
    { kunci: "jk", label: "Jenis Kelamin", opsi: "jenisKelamin" },
    { kunci: "gol_drh", label: "Golongan Darah", opsi: "golonganDarah" },
    { kunci: "tmp_lahir", label: "Tempat Lahir", maks: 20 },
    { kunci: "tgl_lahir", label: "Tanggal Lahir", jenis: "tanggal" },
    { kunci: "agama", label: "Agama", opsi: "agama" },
    { kunci: "stts_nikah", label: "Status Nikah", opsi: "statusNikah" },
    { kunci: "almt_tgl", label: "Alamat", maks: 60 },
    { kunci: "kd_sps", label: "Spesialis", opsi: "spesialis" },
    { kunci: "no_telp", label: "No. Telepon", maks: 13 },
    { kunci: "email", label: "Email", maks: 70 },
    { kunci: "alumni", label: "Alumni", maks: 60 },
    { kunci: "no_ijn_praktek", label: "No. Ijin Praktek", maks: 120 },
  ],
  kolom: [
    { kunci: "kd_dokter", label: "Kode", jenis: "kode" },
    { kunci: "nm_dokter", label: "Nama Dokter" },
    { kunci: "jk", label: "L/P" },
    { kunci: "nm_sps", label: "Spesialis" },
    { kunci: "tmp_lahir", label: "Tempat Lahir" },
    { kunci: "tgl_lahir", label: "Tgl. Lahir", jenis: "tanggal" },
    { kunci: "gol_drh", label: "Gol. Darah" },
    { kunci: "agama", label: "Agama" },
    { kunci: "almt_tgl", label: "Alamat" },
    { kunci: "no_telp", label: "No. Telepon" },
    { kunci: "alumni", label: "Alumni" },
    { kunci: "no_ijn_praktek", label: "No. Ijin Praktek" },
    { kunci: "status", label: "Status", jenis: "status" },
  ],
  filter: [
    { kunci: "jk", label: "Jenis Kelamin", opsi: "jenisKelamin", semuanya: "-- Semua jenis kelamin --" },
    { kunci: "gol_drh", label: "Gol. Darah", opsi: "golonganDarah", semuanya: "-- Semua golongan darah --" },
    { kunci: "stts_nikah", label: "Status Nikah", opsi: "statusNikah", semuanya: "-- Semua status nikah --" },
    { kunci: "kd_sps", label: "Spesialis", opsi: "spesialis", semuanya: "-- Semua spesialis --" },
  ],
};

export default function HalamanDokter() {
  return <HalamanMasterKepegawaian konfigurasi={KONFIGURASI} />;
}

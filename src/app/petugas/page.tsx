"use client";

import React from "react";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import HalamanMasterKepegawaian, {
  type KonfigurasiMasterKepegawaian,
} from "@/components/modul/HalamanMasterKepegawaian";

const KONFIGURASI: KonfigurasiMasterKepegawaian = {
  id: "petugas",
  nama: "Petugas",
  jamak: "petugas",
  kode: "NIP",
  endpoint: "/api/petugas",
  kunciUtama: "nip",
  kunciLama: "nip_lama",
  ikon: faUsers,
  placeholderCari: "Cari NIP, nama, jabatan, atau alamat...",
  fields: [
    { kunci: "nip", label: "NIP", maks: 20, placeholder: "NIP petugas" },
    { kunci: "nama", label: "Nama", maks: 50, placeholder: "Nama petugas" },
    { kunci: "jk", label: "Jenis Kelamin", opsi: "jenisKelamin" },
    { kunci: "gol_darah", label: "Golongan Darah", opsi: "golonganDarah" },
    { kunci: "tmp_lahir", label: "Tempat Lahir", maks: 20 },
    { kunci: "tgl_lahir", label: "Tanggal Lahir", jenis: "tanggal" },
    { kunci: "agama", label: "Agama", opsi: "agama" },
    { kunci: "stts_nikah", label: "Status Nikah", opsi: "statusNikah" },
    { kunci: "alamat", label: "Alamat", maks: 60 },
    { kunci: "kd_jbtn", label: "Jabatan", opsi: "jabatan" },
    { kunci: "no_telp", label: "No. Telepon", maks: 13 },
    { kunci: "email", label: "Email", maks: 70 },
  ],
  kolom: [
    { kunci: "nip", label: "NIP", jenis: "kode" },
    { kunci: "nama", label: "Nama" },
    { kunci: "jk", label: "L/P" },
    { kunci: "nm_jbtn", label: "Jabatan" },
    { kunci: "tmp_lahir", label: "Tempat Lahir" },
    { kunci: "tgl_lahir", label: "Tgl. Lahir", jenis: "tanggal" },
    { kunci: "gol_darah", label: "Gol. Darah" },
    { kunci: "agama", label: "Agama" },
    { kunci: "stts_nikah", label: "Status Nikah" },
    { kunci: "alamat", label: "Alamat" },
    { kunci: "no_telp", label: "No. Telepon" },
    { kunci: "status", label: "Status", jenis: "status" },
  ],
  filter: [
    { kunci: "jk", label: "Jenis Kelamin", opsi: "jenisKelamin", semuanya: "-- Semua jenis kelamin --" },
    { kunci: "gol_darah", label: "Gol. Darah", opsi: "golonganDarah", semuanya: "-- Semua golongan darah --" },
    { kunci: "stts_nikah", label: "Status Nikah", opsi: "statusNikah", semuanya: "-- Semua status nikah --" },
    { kunci: "kd_jbtn", label: "Jabatan", opsi: "jabatan", semuanya: "-- Semua jabatan --" },
  ],
};

export default function HalamanPetugas() {
  return <HalamanMasterKepegawaian konfigurasi={KONFIGURASI} />;
}

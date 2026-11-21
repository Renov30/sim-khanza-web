"use client";

import React from "react";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import HalamanMasterKepegawaian, {
  type KonfigurasiMasterKepegawaian,
} from "@/components/modul/HalamanMasterKepegawaian";

const KONFIGURASI: KonfigurasiMasterKepegawaian = {
  id: "poliklinik",
  nama: "Poliklinik",
  jamak: "poliklinik",
  kode: "Unit",
  endpoint: "/api/poliklinik",
  kunciUtama: "kd_poli",
  kunciLama: "kd_lama",
  kodeOtomatis: true,
  ikon: faHospital,
  placeholderCari: "Cari kode atau nama unit poliklinik...",
  fields: [
    { kunci: "kd_poli", label: "Kode Unit", maks: 5 },
    { kunci: "nm_poli", label: "Nama Unit", maks: 50, placeholder: "Nama poliklinik" },
    { kunci: "registrasi", label: "Registrasi Baru", maks: 13, placeholder: "0" },
    { kunci: "registrasilama", label: "Registrasi Lama", maks: 13, placeholder: "0" },
  ],
  kolom: [
    { kunci: "kd_poli", label: "Kode Unit", jenis: "kode" },
    { kunci: "nm_poli", label: "Nama Unit" },
    { kunci: "registrasi", label: "Reg. Baru" },
    { kunci: "registrasilama", label: "Reg. Lama" },
    { kunci: "status", label: "Status", jenis: "status" },
  ],
  filter: [],
};

export default function HalamanPoliklinik() {
  return <HalamanMasterKepegawaian konfigurasi={KONFIGURASI} />;
}

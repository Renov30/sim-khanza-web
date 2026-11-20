"use client";

import { SidebarMenuPasien } from "@/components/modul/SidebarMenuPasien";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface MenuSidebar {
  label: string;
  href?: string;
}

const MENU_SIDEBAR: MenuSidebar[] = [
  { label: "Riwayat Pasien" },
  { label: "Input Resep", href: "/farmasi/resep-obat" },
  { label: "Copy Resep", href: "/farmasi/copy-resep" },
  { label: "Resep Luar" },
  { label: "Input Obat & BHP", href: "/farmasi/input-penjualan" },
  { label: "Data Obat & BHP", href: "/farmasi" },
  { label: "Berkas Digital" },
  { label: "Permintaan Lab", href: "/laboratorium/permintaan-pk" },
  { label: "Permintaan Rad", href: "/radiologi/permintaan" },
  { label: "Konsultasi Medik" },
  { label: "Jadwal Operasi" },
  { label: "Surat Kontrol" },
  { label: "Kamar Inap", href: "/rawat-inap" },
  { label: "Triase IGD", href: "/igd" },
  { label: "Rujuk Internal" },
  { label: "Resume Pasien" },
  { label: "Awal Keperawatan IGD" },
  { label: "Awal Keperawatan Umum" },
  { label: "Awal Keperawatan Gigi" },
  { label: "Odontogram (Lama)" },
  { label: "Odontogram Baru" },
  { label: "Awal Keperawatan Kandungan" },
  { label: "Awal Keperawatan Bayi/Anak" },
  { label: "Awal Keperawatan Psikiatri" },
  { label: "Awal Keperawatan Geriatri" },
  { label: "Awal Fisioterapi" },
  { label: "Terapi Wicara" },
  { label: "Penatalaksanaan Terapi Okupasi" },
  { label: "Awal Medis IGD" },
  { label: "Awal Medis IGD Psikiatri" },
  { label: "Awal Medis Umum" },
  { label: "Awal Medis Kandungan" },
  { label: "Awal Medis Bayi/Anak" },
  { label: "Awal Medis THT" },
  { label: "Awal Medis Psikiatri" },
  { label: "Awal Medis Penyakit Dalam" },
  { label: "Awal Medis Mata" },
  { label: "Awal Medis Neurologi" },
  { label: "Awal Medis Orthopedi" },
  { label: "Awal Medis Bedah" },
  { label: "Awal Medis Bedah Mulut" },
  { label: "Awal Medis Geriatri" },
  { label: "Awal Medis Kulit & Kelamin" },
  { label: "Awal Medis Paru" },
  { label: "Awal Medis Fisik & Rehabilitasi" },
  { label: "Awal Medis Hemodialisa" },
  { label: "Rujuk Keluar" },
  { label: "Catatan Pasien" },
  { label: "Observasi IGD" },
  { label: "Catatan Cek GDS" },
  { label: "Catatan Keperawatan" },
  { label: "Keseimbangan Cairan" },
  { label: "Penilaian Ulang Nyeri" },
  { label: "Pemantauan PEWS Anak" },
  { label: "Pemantauan EWS Dewasa" },
  { label: "Pemantauan MEOWS Obstetri" },
  { label: "Pemantauan EWS Neonatus" },
  { label: "Monitoring Reaksi Transfusi" },
  { label: "Uji Fungsi/Prosedur KFR" },
  { label: "Check List Masuk HCU" },
  { label: "Check List Masuk ICU" },
  { label: "Penilaian Pre Operasi" },
  { label: "Penilaian Pre Anestesi" },
  { label: "Medical Check Up" },
  { label: "Penilaian Psikolog" },
  { label: "Hasil Pemeriksaan USG" },
  { label: "Hasil Pemeriksaan EKG" },
  { label: "Catatan Persalinan" },
  { label: "Skrining TBC" },
  { label: "Skrining Nutrisi Dewasa" },
  { label: "Skrining Nutrisi Lansia" },
  { label: "Skrining Nutrisi Anak" },
  { label: "Asuhan Gizi" },
  { label: "Konseling Farmasi" },
  { label: "Informasi Obat" },
  { label: "Rekonsiliasi Obat" },
  { label: "Edukasi Pasien/Keluarga" },
];

interface SidebarTindakanRalanProps {
  noRawat?: string;
  onBelumTersedia: (label: string) => void;
  onRiwayatPasien: () => void;
  onCopyResep: () => void;
  onResumePasien: () => void;
}

export function SidebarTindakanRalan({ noRawat, onBelumTersedia, onRiwayatPasien, onCopyResep, onResumePasien }: SidebarTindakanRalanProps) {
  return (
    <SidebarMenuPasien
      noRawat={noRawat}
      onBelumTersedia={onBelumTersedia}
      onRiwayatPasien={onRiwayatPasien}
      onCopyResep={onCopyResep}
      onResumePasien={onResumePasien}
      ariaLabel="Menu tindakan rawat jalan"
    />
  );
}

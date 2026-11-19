"use client";

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
}

export function SidebarTindakanRalan({ noRawat, onBelumTersedia }: SidebarTindakanRalanProps) {
  const hrefDenganPasien = (href: string) => noRawat ? `${href}?no_rawat=${encodeURIComponent(noRawat)}` : href;

  return (
    <aside aria-label="Menu tindakan rawat jalan" className="hidden min-h-0 w-48 shrink-0 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm md:flex md:flex-col">
      <div className="flex h-8 shrink-0 items-center border-b border-slate-200 bg-slate-100/90 px-2">
        <span className="truncate text-[11px] font-semibold text-slate-700">Menu Pasien</span>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto p-1" aria-label="Pintasan data pasien">
        {MENU_SIDEBAR.map((item) => item.href ? (
          <Link key={item.label} href={hrefDenganPasien(item.href)} className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5 shrink-0 text-primary-600" />
            <span>{item.label}</span>
          </Link>
        ) : (
          <button key={item.label} type="button" onClick={() => onBelumTersedia(item.label)} className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5 shrink-0 text-slate-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

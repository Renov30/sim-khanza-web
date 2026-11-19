"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

interface MenuSidebar {
  label: string;
  href?: string;
  aksi?: "riwayat" | "copy-resep" | "resume-pasien";
}

const MENU_SIDEBAR: MenuSidebar[] = [
  { label: "Riwayat Pasien", aksi: "riwayat" },
  { label: "Input Resep", href: "/farmasi/resep-obat" },
  { label: "Copy Resep", aksi: "copy-resep" },
  { label: "Resep Luar" },
  { label: "Input Obat & BHP", href: "/farmasi/input-penjualan" },
  { label: "Data Obat & BHP", href: "/farmasi/master-obat" },
  { label: "Berkas Digital" },
  { label: "Permintaan Lab", href: "/laboratorium/permintaan-pk" },
  { label: "Permintaan Rad", href: "/radiologi/permintaan" },
  { label: "Konsultasi Medik" },
  { label: "Jadwal Operasi" },
  { label: "Surat Kontrol" },
  { label: "Kamar Inap", href: "/rawat-inap" },
  { label: "Triase IGD", href: "/igd" },
  { label: "Rujuk Internal" },
  { label: "Resume Pasien", aksi: "resume-pasien" },
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

interface SidebarMenuPasienProps {
  noRawat?: string;
  onBelumTersedia: (label: string) => void;
  onRiwayatPasien?: () => void;
  onCopyResep?: () => void;
  onResumePasien?: () => void;
  judul?: string;
  ariaLabel?: string;
  navLabel?: string;
}

export function SidebarMenuPasien({
  noRawat,
  onBelumTersedia,
  onRiwayatPasien,
  onCopyResep,
  onResumePasien,
  judul = "Menu Pasien",
  ariaLabel = "Menu pintasan pasien",
  navLabel = "Pintasan data pasien",
}: SidebarMenuPasienProps) {
  const [pencarian, setPencarian] = useState("");
  const menuTersaring = useMemo(() => {
    const kataKunci = pencarian.trim().toLocaleLowerCase("id-ID");
    if (!kataKunci) return MENU_SIDEBAR;
    return MENU_SIDEBAR.filter((item) => item.label.toLocaleLowerCase("id-ID").includes(kataKunci));
  }, [pencarian]);
  const hrefDenganPasien = (href: string) => noRawat ? `${href}?no_rawat=${encodeURIComponent(noRawat)}` : href;

  return (
    <aside aria-label={ariaLabel} className="hidden min-h-0 w-48 shrink-0 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm md:flex md:flex-col">
      <div className="flex h-8 shrink-0 items-center border-b border-slate-200 bg-slate-100/90 px-2">
        <span className="truncate text-[11px] font-semibold text-slate-700">{judul}</span>
      </div>
      <div className="relative shrink-0 border-b border-slate-200 p-1">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          placeholder="Cari menu..."
          aria-label="Cari menu pasien"
          className="h-7 w-full rounded border border-slate-200 bg-slate-50 pl-7 pr-7 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {pencarian && (
          <button
            type="button"
            onClick={() => setPencarian("")}
            aria-label="Hapus pencarian menu"
            title="Hapus pencarian"
            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </button>
        )}
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto p-1" aria-label={navLabel}>
        {menuTersaring.length === 0 && (
          <p className="px-1.5 py-2 text-[11px] text-slate-500">Menu tidak ditemukan.</p>
        )}
        {menuTersaring.map((item) => item.aksi === "riwayat" && onRiwayatPasien ? (
          <button key={item.label} type="button" onClick={onRiwayatPasien} className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5 shrink-0 text-primary-600" />
            <span>{item.label}</span>
          </button>
        ) : item.aksi === "copy-resep" && onCopyResep ? (
          <button key={item.label} type="button" onClick={onCopyResep} className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5 shrink-0 text-primary-600" />
            <span>{item.label}</span>
          </button>
        ) : item.aksi === "resume-pasien" && onResumePasien ? (
          <button key={item.label} type="button" onClick={onResumePasien} className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <FontAwesomeIcon icon={faCircle} className="h-1.5 w-1.5 shrink-0 text-primary-600" />
            <span>{item.label}</span>
          </button>
        ) : item.href ? (
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

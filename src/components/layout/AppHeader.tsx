"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { HospitalSetting } from "@/lib/types/auth";
import { UserAccountMenu } from "./UserAccountMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserPlus,
  faHeartPulse,
  faVial,
  faXRay,
  faPills,
  faBed,
  faStethoscope,
  faRightToBracket,
  faChevronDown,
  faMicroscope,
  faBacteria,
  faFileMedical,
  faReceipt,
  faPrescription,
  faFilePrescription,
  faDroplet,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";

interface AppHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onModuleClick: (title: string) => void;
  onAboutClick: () => void;
}

export function AppHeader({
  isMenuOpen,
  onToggleMenu,
  onModuleClick,
  onAboutClick,
}: AppHeaderProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, hasPermission, setIsLoginModalOpen } = useAuth();
  const [setting, setSetting] = useState<HospitalSetting | null>(null);
  const [menuLabTerbuka, setMenuLabTerbuka] = useState(false);
  const [menuRadTerbuka, setMenuRadTerbuka] = useState(false);
  const [menuFarmasiTerbuka, setMenuFarmasiTerbuka] = useState(false);

  const labRef = useRef<HTMLDivElement>(null);
  const radRef = useRef<HTMLDivElement>(null);
  const farmasiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (labRef.current && !labRef.current.contains(event.target as Node)) {
        setMenuLabTerbuka(false);
      }
      if (radRef.current && !radRef.current.contains(event.target as Node)) {
        setMenuRadTerbuka(false);
      }
      if (farmasiRef.current && !farmasiRef.current.contains(event.target as Node)) {
        setMenuFarmasiTerbuka(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch("/api/system/info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.setting) {
          setSetting(data.data.setting);
        }
      })
      .catch((err) => console.error("Error loading system info:", err));
  }, []);

  const handleToolAction = (permKey: string, title: string) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!hasPermission(permKey)) {
      alert(`Akses Ditolak: Anda tidak memiliki hak akses untuk modul ${title}`);
      return;
    }
    onModuleClick(title);
  };

  const isRegistrasiActive = pathname.startsWith("/registrasi");
  const isIgdActive = pathname.startsWith("/igd");
  const isLaboratActive = pathname.startsWith("/laboratorium") || menuLabTerbuka;
  const isRadiologiActive = pathname.startsWith("/radiologi") || menuRadTerbuka;
  const isFarmasiActive = pathname.startsWith("/farmasi") || menuFarmasiTerbuka;
  const isRawatInapActive = pathname.startsWith("/rawat-inap");
  const isRawatJalanActive = pathname.startsWith("/rawat-jalan");

  return (
    <header className="bg-emerald-800 text-white border-b border-emerald-900 px-4 py-2 shrink-0 select-none shadow-sm">
      <div className="grid grid-cols-[240px_1fr_240px] xl:grid-cols-[280px_1fr_280px] items-center gap-2">
        {/* Sisi Kiri: Nama Instansi & Alamat Lengkap */}
        <div className="flex flex-col min-w-0 pr-2">
          <h1 className="text-xs lg:text-sm font-bold tracking-tight text-white uppercase truncate leading-tight">
            {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
          </h1>
          <p className="text-[11px] text-emerald-100/80 truncate leading-tight mt-0.5">
            {setting?.alamat_instansi || "JL. Irian Seringgu Kelurahan Samkai"}
            {setting?.kabupaten ? `, ${setting.kabupaten}` : ""}
          </p>
        </div>

        {/* Sisi Tengah: Toolbar Modul Cepat (Registrasi, IGD, dll) */}
        <div className="flex items-center justify-center space-x-1 px-1">
          {/* 1. Menu Utama */}
          <button
            onClick={onToggleMenu}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isMenuOpen
                ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
            }`}
            title="Buka / Tutup Menu Utama (Alt+M)"
          >
            <FontAwesomeIcon icon={faBars} className="w-3.5 h-3.5 text-emerald-300" />
            <span>Menu Utama</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-emerald-700/60 mx-1 shrink-0" />

          {/* 2. Registrasi */}
          <button
            onClick={() => handleToolAction("registrasi", "Registrasi Pasien")}
            disabled={isAuthenticated && !hasPermission("registrasi")}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRegistrasiActive
                ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Pendaftaran Pasien (Alt+R)"
          >
            <FontAwesomeIcon icon={faUserPlus} className="w-3.5 h-3.5 text-emerald-300" />
            <span>Registrasi</span>
          </button>

          {/* 3. IGD/UGD */}
          <button
            onClick={() => handleToolAction("igd", "Instalasi Gawat Darurat")}
            disabled={isAuthenticated && !hasPermission("igd")}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isIgdActive
                ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Pelayanan IGD (Alt+D)"
          >
            <FontAwesomeIcon icon={faHeartPulse} className="w-3.5 h-3.5 text-red-300" />
            <span>IGD/UGD</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-emerald-700/60 mx-1 shrink-0" />

          {/* 4. Laborat Dropdown */}
          <div className="relative shrink-0" ref={labRef}>
            <button
              onClick={() => {
                setMenuRadTerbuka(false);
                setMenuFarmasiTerbuka(false);
                setMenuLabTerbuka(!menuLabTerbuka);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isLaboratActive
                  ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
              }`}
              title="Pilihan Modul Laboratorium (Alt+O)"
            >
              <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-amber-300" />
              <span>Laborat</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-emerald-300 ml-0.5" />
            </button>

            {menuLabTerbuka && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-[9999] text-slate-800">
                <div className="px-3 py-1 border-b border-slate-100 bg-slate-50/70 rounded-t-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Permintaan Laborat
                  </p>
                </div>
                <Link
                  href="/laboratorium/permintaan-pk"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/permintaan-pk"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileMedical} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Permintaan Lab PK</span>
                </Link>
                <Link
                  href="/laboratorium/permintaan-pa"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/permintaan-pa"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faMicroscope} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Permintaan Lab PA</span>
                </Link>
                <Link
                  href="/laboratorium/permintaan-mb"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/permintaan-mb"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBacteria} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Permintaan Lab MB</span>
                </Link>

                <div className="px-3 py-1 border-t border-b border-slate-100 bg-slate-50/70 mt-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pemeriksaan & Hasil
                  </p>
                </div>
                <Link
                  href="/laboratorium/periksa-pk"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/periksa-pk"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Periksa Lab PK</span>
                </Link>
                <Link
                  href="/laboratorium/periksa-pa"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/periksa-pa"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faMicroscope} className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Periksa Lab PA</span>
                </Link>
                <Link
                  href="/laboratorium/periksa-mb"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/periksa-mb"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBacteria} className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Periksa Lab MB</span>
                </Link>
              </div>
            )}
          </div>

          {/* 5. Radiologi Dropdown */}
          <div className="relative shrink-0" ref={radRef}>
            <button
              onClick={() => {
                setMenuLabTerbuka(false);
                setMenuFarmasiTerbuka(false);
                setMenuRadTerbuka(!menuRadTerbuka);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isRadiologiActive
                  ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
              }`}
              title="Pilihan Modul Radiologi (Alt+A)"
            >
              <FontAwesomeIcon icon={faXRay} className="w-3.5 h-3.5 text-blue-300" />
              <span>Radiologi</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-emerald-300 ml-0.5" />
            </button>

            {menuRadTerbuka && (
              <div className="absolute left-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-[9999] text-slate-800">
                <div className="px-3 py-1 border-b border-slate-100 bg-slate-50/70 rounded-t-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pelayanan Radiologi
                  </p>
                </div>
                <Link
                  href="/radiologi/permintaan"
                  onClick={() => setMenuRadTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/radiologi/permintaan"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileMedical} className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Permintaan Radiologi</span>
                </Link>
                <Link
                  href="/radiologi/periksa"
                  onClick={() => setMenuRadTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/radiologi/periksa"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faXRay} className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Periksa Radiologi</span>
                </Link>
              </div>
            )}
          </div>

          {/* 6. Farmasi Dropdown */}
          <div className="relative shrink-0" ref={farmasiRef}>
            <button
              onClick={() => {
                setMenuLabTerbuka(false);
                setMenuRadTerbuka(false);
                setMenuFarmasiTerbuka(!menuFarmasiTerbuka);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isFarmasiActive
                  ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
              }`}
              title="Pilihan Modul Farmasi (Alt+J)"
            >
              <FontAwesomeIcon icon={faPills} className="w-3.5 h-3.5 text-emerald-300" />
              <span>Farmasi</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-emerald-300 ml-0.5" />
            </button>

            {menuFarmasiTerbuka && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-[9999] text-slate-800">
                <div className="px-3 py-1 border-b border-slate-100 bg-slate-50/70 rounded-t-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pelayanan Farmasi & Obat
                  </p>
                </div>
                <Link
                  href="/farmasi/input-penjualan"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/input-penjualan"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faReceipt} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Input Penjualan Obat & BHP</span>
                </Link>
                <Link
                  href="/farmasi/penjualan-obat"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/penjualan-obat"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBoxesStacked} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Data Penjualan Obat & BHP</span>
                </Link>
                <Link
                  href="/farmasi/penyerahan-darah"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/penyerahan-darah"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faDroplet} className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Data Penyerahan Darah</span>
                </Link>
                <Link
                  href="/farmasi/daftar-resep-dokter"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/daftar-resep-dokter"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFilePrescription} className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Daftar Resep Dokter</span>
                </Link>
                <Link
                  href="/farmasi/resep-obat"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/resep-obat"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faPrescription} className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>No. Resep</span>
                </Link>

                <div className="px-3 py-1 border-t border-b border-slate-100 bg-slate-50/70 mt-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Lainnya
                  </p>
                </div>
                <Link
                  href="/farmasi"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi"
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-emerald-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faPills} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pemberian Obat (Dispensasi)</span>
                </Link>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-emerald-700/60 mx-1 shrink-0" />

          {/* 7. Rawat Inap */}
          <button
            onClick={() => handleToolAction("kamar_inap", "Rawat Inap & Kamar")}
            disabled={isAuthenticated && !hasPermission("kamar_inap")}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRawatInapActive
                ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Rawat Inap (Alt+K)"
          >
            <FontAwesomeIcon icon={faBed} className="w-3.5 h-3.5 text-teal-300" />
            <span>Rawat Inap</span>
          </button>

          {/* 8. Rawat Jalan */}
          <button
            onClick={() => handleToolAction("tindakan_ralan", "Rawat Jalan / Poliklinik")}
            disabled={isAuthenticated && !hasPermission("tindakan_ralan")}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRawatJalanActive
                ? "bg-emerald-950 text-white border-emerald-700 shadow-xs font-semibold"
                : "text-emerald-100 hover:text-white hover:bg-emerald-700/70 border-transparent hover:border-emerald-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Rawat Jalan (Alt+S)"
          >
            <FontAwesomeIcon icon={faStethoscope} className="w-3.5 h-3.5 text-indigo-300" />
            <span>Rawat Jalan</span>
          </button>
        </div>

        {/* Sisi Kanan: Informasi Akun / Tombol Log In */}
        <div className="flex items-center justify-end min-w-0">
          {isAuthenticated && user ? (
            <UserAccountMenu
              onModuleClick={onModuleClick}
              onAboutClick={onAboutClick}
            />
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

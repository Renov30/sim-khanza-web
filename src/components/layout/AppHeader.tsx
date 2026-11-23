"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { UserAccountMenu } from "./UserAccountMenu";
import { dapatkanJudulHalaman } from "@/lib/navigasi/judul-halaman";
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

const tanpaLangganan = () => () => {};
const snapshotKlien = () => true;
const snapshotServer = () => false;

export function AppHeader({
  isMenuOpen,
  onToggleMenu,
  onModuleClick,
  onAboutClick,
}: AppHeaderProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, hasPermission, setIsLoginModalOpen } = useAuth();
  const sudahHydrasi = useSyncExternalStore(tanpaLangganan, snapshotKlien, snapshotServer);
  const autentikasiAktif = sudahHydrasi && isAuthenticated;
  const penggunaAktif = sudahHydrasi ? user : null;
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

  const handleToolAction = (permKey: string, title: string) => {
    if (!autentikasiAktif) {
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
  const isRawatInapActive = pathname.startsWith("/rawat-inap") || pathname.startsWith("/tindakan-rawat-inap");
  const isRawatJalanActive = pathname.startsWith("/rawat-jalan") || pathname.startsWith("/tindakan-rawat-jalan");
  const judulHalaman = isMenuOpen && pathname === "/" ? "Daftar Menu" : dapatkanJudulHalaman(pathname);
  const ukuranJudul =
    judulHalaman.length > 46
      ? "text-[9px]"
      : judulHalaman.length > 34
        ? "text-[10px]"
        : judulHalaman.length > 24
          ? "text-[11px]"
          : "text-sm";

  return (
    <header className="app-header shrink-0 select-none border-b border-primary-600 bg-tertiary-900 px-4 py-2 text-white">
      <div className="flex items-center gap-2">
        <div
          className="app-header-title flex h-8 w-52 shrink-0 items-center border-r border-primary-600/70 pr-3"
          title={judulHalaman}
        >
          <h1 className={`line-clamp-2 w-full font-bold leading-[1.05] tracking-tight text-white ${ukuranJudul}`}>
            {judulHalaman}
          </h1>
        </div>

        {/* Toolbar modul cepat diratakan ke kiri. */}
        <div className="relative z-20 flex min-w-0 flex-1 items-center justify-start space-x-1 overflow-visible px-1 scrollbar-none">
          {/* 1. Menu */}
          <button
            onClick={onToggleMenu}
            className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isMenuOpen
                ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
            }`}
            title="Buka / Tutup Daftar Menu (Alt+M)"
          >
            <FontAwesomeIcon icon={faBars} className="w-3.5 h-3.5 text-primary-300" />
            <span>Menu</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-primary-600/70 mx-1 shrink-0" />

          {/* 2. Registrasi */}
          <button
            onClick={() => handleToolAction("registrasi", "Registrasi Pasien")}
            disabled={autentikasiAktif && !hasPermission("registrasi")}
            className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRegistrasiActive
                ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Pendaftaran Pasien (Alt+R)"
          >
            <FontAwesomeIcon icon={faUserPlus} className="w-3.5 h-3.5 text-primary-300" />
            <span>Registrasi</span>
          </button>

          {/* 3. IGD/UGD */}
          <button
            onClick={() => handleToolAction("igd", "Instalasi Gawat Darurat")}
            disabled={autentikasiAktif && !hasPermission("igd")}
            className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isIgdActive
                ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Pelayanan IGD (Alt+D)"
          >
            <FontAwesomeIcon icon={faHeartPulse} className="w-3.5 h-3.5 text-red-300" />
            <span>IGD/UGD</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-primary-600/70 mx-1 shrink-0" />

          {/* 4. Laborat Dropdown */}
          <div className="relative shrink-0" ref={labRef}>
            <button
              onClick={() => {
                setMenuRadTerbuka(false);
                setMenuFarmasiTerbuka(false);
                setMenuLabTerbuka(!menuLabTerbuka);
              }}
              className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isLaboratActive
                  ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                  : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
              }`}
              title="Pilihan Modul Laboratorium (Alt+O)"
            >
              <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-tertiary-300" />
              <span>Laborat</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-primary-300 ml-0.5" />
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
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileMedical} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Permintaan Lab PK</span>
                </Link>
                <Link
                  href="/laboratorium/permintaan-pa"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/permintaan-pa"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faMicroscope} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Permintaan Lab PA</span>
                </Link>
                <Link
                  href="/laboratorium/permintaan-mb"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/permintaan-mb"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBacteria} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
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
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-tertiary-500 shrink-0" />
                  <span>Periksa Lab PK</span>
                </Link>
                <Link
                  href="/laboratorium/periksa-pa"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/periksa-pa"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faMicroscope} className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                  <span>Periksa Lab PA</span>
                </Link>
                <Link
                  href="/laboratorium/periksa-mb"
                  onClick={() => setMenuLabTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/laboratorium/periksa-mb"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBacteria} className="w-3.5 h-3.5 text-tertiary-500 shrink-0" />
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
              className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isRadiologiActive
                  ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                  : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
              }`}
              title="Pilihan Modul Radiologi (Alt+A)"
            >
              <FontAwesomeIcon icon={faXRay} className="w-3.5 h-3.5 text-primary-300" />
              <span>Radiologi</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-primary-300 ml-0.5" />
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
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileMedical} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Permintaan Radiologi</span>
                </Link>
                <Link
                  href="/radiologi/periksa"
                  onClick={() => setMenuRadTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/radiologi/periksa"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faXRay} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
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
              className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border ${
                isFarmasiActive
                  ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                  : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
              }`}
              title="Pilihan Modul Farmasi (Alt+J)"
            >
              <FontAwesomeIcon icon={faPills} className="w-3.5 h-3.5 text-primary-300" />
              <span>Farmasi</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-primary-300 ml-0.5" />
            </button>

            {menuFarmasiTerbuka && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-[9999] text-slate-800">
                <div className="px-3 py-1 border-b border-slate-100 bg-slate-50/70 rounded-t-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pelayanan Farmasi & Obat
                  </p>
                </div>
                <Link
                  href="/farmasi/master-obat"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/master-obat"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBoxesStacked} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Data Obat, Alkes &amp; BHP</span>
                </Link>
                <Link
                  href="/farmasi/input-penjualan"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/input-penjualan"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faReceipt} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Input Penjualan Obat & BHP</span>
                </Link>
                <Link
                  href="/farmasi/penjualan-obat"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/penjualan-obat"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faBoxesStacked} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Data Penjualan Obat & BHP</span>
                </Link>
                <Link
                  href="/farmasi/penyerahan-darah"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/penyerahan-darah"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
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
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faFilePrescription} className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                  <span>Daftar Resep Dokter</span>
                </Link>
                <Link
                  href="/farmasi/no-resep"
                  onClick={() => setMenuFarmasiTerbuka(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs ${
                    pathname === "/farmasi/no-resep"
                      ? "bg-primary-50 text-primary-800 font-bold"
                      : "hover:bg-slate-50 text-slate-700 hover:text-primary-900 font-medium"
                  }`}
                >
                  <FontAwesomeIcon icon={faPrescription} className="w-3.5 h-3.5 text-secondary-600 shrink-0" />
                  <span>No. Resep</span>
                </Link>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-primary-600/70 mx-1 shrink-0" />

          {/* 7. Rawat Inap */}
          <button
            onClick={() => handleToolAction("kamar_inap", "Rawat Inap & Kamar")}
            disabled={autentikasiAktif && !hasPermission("kamar_inap")}
            className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRawatInapActive
                ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Rawat Inap (Alt+K)"
          >
            <FontAwesomeIcon icon={faBed} className="w-3.5 h-3.5 text-secondary-300" />
            <span>Rawat Inap</span>
          </button>

          {/* 8. Rawat Jalan */}
          <button
            onClick={() => handleToolAction("tindakan_ralan", "Rawat Jalan / Poliklinik")}
            disabled={autentikasiAktif && !hasPermission("tindakan_ralan")}
            className={`app-header-module px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border shrink-0 ${
              isRawatJalanActive
                ? "app-header-module-active bg-tertiary-950 text-white border-primary-600 shadow-xs font-semibold"
                : "app-header-module-inactive text-slate-200 hover:text-white hover:bg-tertiary-800 border-transparent hover:border-primary-600/50 font-medium"
            } disabled:opacity-40 disabled:hover:bg-transparent`}
            title="Rawat Jalan (Alt+S)"
          >
            <FontAwesomeIcon icon={faStethoscope} className="w-3.5 h-3.5 text-secondary-300" />
            <span>Rawat Jalan</span>
          </button>
        </div>

        {/* Sisi Kanan: Informasi Akun / Tombol Log In */}
        <div className="ml-auto flex shrink-0 items-center justify-end min-w-0">
          {autentikasiAktif && penggunaAktif ? (
            <UserAccountMenu
              onModuleClick={onModuleClick}
              onAboutClick={onAboutClick}
            />
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-xs"
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

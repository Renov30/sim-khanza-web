"use client";

import React, { useEffect, useState } from "react";
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
  const { user, isAuthenticated, hasPermission, setIsLoginModalOpen } = useAuth();
  const [setting, setSetting] = useState<HospitalSetting | null>(null);

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
        <div className="flex items-center justify-center space-x-1 overflow-x-auto px-1 scrollbar-none">
          {/* 1. Menu Utama */}
          <button
            onClick={onToggleMenu}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border transition-all shrink-0 ${
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
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Pendaftaran Pasien (Alt+R)"
          >
            <FontAwesomeIcon icon={faUserPlus} className="w-3.5 h-3.5 text-emerald-300" />
            <span>Registrasi</span>
          </button>

          {/* 3. IGD/UGD */}
          <button
            onClick={() => handleToolAction("igd", "Instalasi Gawat Darurat")}
            disabled={isAuthenticated && !hasPermission("igd")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Pelayanan IGD (Alt+D)"
          >
            <FontAwesomeIcon icon={faHeartPulse} className="w-3.5 h-3.5 text-red-300" />
            <span>IGD/UGD</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-emerald-700/60 mx-1 shrink-0" />

          {/* 4. Laborat */}
          <button
            onClick={() => handleToolAction("periksa_lab", "Laboratorium")}
            disabled={isAuthenticated && !hasPermission("periksa_lab")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Pemeriksaan Laboratorium (Alt+O)"
          >
            <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-amber-300" />
            <span>Laborat</span>
          </button>

          {/* 5. Radiologi */}
          <button
            onClick={() => handleToolAction("periksa_radiologi", "Radiologi")}
            disabled={isAuthenticated && !hasPermission("periksa_radiologi")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Pemeriksaan Radiologi (Alt+A)"
          >
            <FontAwesomeIcon icon={faXRay} className="w-3.5 h-3.5 text-blue-300" />
            <span>Radiologi</span>
          </button>

          {/* 6. Farmasi */}
          <button
            onClick={() => handleToolAction("penjualan_obat", "Farmasi & Obat")}
            disabled={isAuthenticated && !hasPermission("penjualan_obat")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Farmasi & Penjualan Obat (Alt+J)"
          >
            <FontAwesomeIcon icon={faPills} className="w-3.5 h-3.5 text-emerald-300" />
            <span>Farmasi</span>
          </button>

          {/* Separator */}
          <div className="h-5 w-px bg-emerald-700/60 mx-1 shrink-0" />

          {/* 7. Rawat Inap */}
          <button
            onClick={() => handleToolAction("kamar_inap", "Rawat Inap & Kamar")}
            disabled={isAuthenticated && !hasPermission("kamar_inap")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
            title="Rawat Inap (Alt+K)"
          >
            <FontAwesomeIcon icon={faBed} className="w-3.5 h-3.5 text-teal-300" />
            <span>Rawat Inap</span>
          </button>

          {/* 8. Rawat Jalan */}
          <button
            onClick={() => handleToolAction("tindakan_ralan", "Rawat Jalan / Poliklinik")}
            disabled={isAuthenticated && !hasPermission("tindakan_ralan")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-700/70 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-emerald-600/50 transition-colors shrink-0"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
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

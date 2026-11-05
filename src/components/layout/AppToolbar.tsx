"use client";

import React from "react";
import { useAuth } from "../auth/AuthContext";
import {
  Menu,
  UserPlus,
  Activity,
  TestTubes,
  Bone,
  Pill,
  BedDouble,
  Stethoscope,
  LogIn,
  LogOut,
  Power,
} from "lucide-react";

interface AppToolbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onModuleClick: (title: string) => void;
}

export function AppToolbar({
  isMenuOpen,
  onToggleMenu,
  onModuleClick,
}: AppToolbarProps) {
  const { isAuthenticated, hasPermission, setIsLoginModalOpen, logout } = useAuth();

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
    <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center space-x-1.5 overflow-x-auto shadow-2xs select-none">
      {/* 1. Main Menu Toggle Button (BtnMenu) */}
      <button
        onClick={onToggleMenu}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 border transition-all ${
          isMenuOpen
            ? "bg-emerald-700 text-white border-emerald-800 shadow-xs"
            : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
        }`}
        title="Buka / Tutup Menu Utama (Alt+M)"
      >
        <Menu className="w-4 h-4" />
        <span>Menu Utama</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 2. Registrasi (BtnToolReg) */}
      <button
        onClick={() => handleToolAction("registrasi", "Registrasi Pasien")}
        disabled={isAuthenticated && !hasPermission("registrasi")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pendaftaran Pasien Baru & Lama (Alt+R)"
      >
        <UserPlus className="w-4 h-4 text-emerald-700" />
        <span>Registrasi</span>
      </button>

      {/* 3. IGD/UGD (btnToolIGD) */}
      <button
        onClick={() => handleToolAction("igd", "Instalasi Gawat Darurat")}
        disabled={isAuthenticated && !hasPermission("igd")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pelayanan IGD / Tindakan Darurat (Alt+D)"
      >
        <Activity className="w-4 h-4 text-red-600" />
        <span>IGD/UGD</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 4. Laborat (btnToolLab) */}
      <button
        onClick={() => handleToolAction("periksa_lab", "Laboratorium")}
        disabled={isAuthenticated && !hasPermission("periksa_lab")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pemeriksaan Laboratorium (Alt+O)"
      >
        <TestTubes className="w-4 h-4 text-amber-600" />
        <span>Laborat</span>
      </button>

      {/* 5. Radiologi (btnToolRad) */}
      <button
        onClick={() => handleToolAction("periksa_radiologi", "Radiologi")}
        disabled={isAuthenticated && !hasPermission("periksa_radiologi")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pemeriksaan Radiologi / Rontgen (Alt+A)"
      >
        <Bone className="w-4 h-4 text-blue-600" />
        <span>Radiologi</span>
      </button>

      {/* 6. Farmasi (BtnToolJualObat) */}
      <button
        onClick={() => handleToolAction("penjualan_obat", "Farmasi & Obat")}
        disabled={isAuthenticated && !hasPermission("penjualan_obat")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Apotek, Resep & Penjualan Obat (Alt+J)"
      >
        <Pill className="w-4 h-4 text-emerald-600" />
        <span>Farmasi</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 7. Rawat Inap (BtnToolKamnap) */}
      <button
        onClick={() => handleToolAction("kamar_inap", "Rawat Inap & Kamar")}
        disabled={isAuthenticated && !hasPermission("kamar_inap")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Manajemen Bangsal & Rawat Inap (Alt+K)"
      >
        <BedDouble className="w-4 h-4 text-teal-600" />
        <span>Rawat Inap</span>
      </button>

      {/* 8. Rawat Jalan (BtnToolKasir) */}
      <button
        onClick={() => handleToolAction("tindakan_ralan", "Rawat Jalan / Poliklinik")}
        disabled={isAuthenticated && !hasPermission("tindakan_ralan")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Poliklinik & Tindakan Rawat Jalan (Alt+S)"
      >
        <Stethoscope className="w-4 h-4 text-indigo-600" />
        <span>Rawat Jalan</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 9. Log In / Log Out (BtnLog) */}
      {isAuthenticated ? (
        <button
          onClick={() => logout()}
          className="px-2.5 py-1.5 rounded-md text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1.5 border border-transparent hover:border-red-200 transition-colors"
          title="Keluar dari Akun (Alt+L)"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      ) : (
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-2.5 py-1.5 rounded-md text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 flex items-center gap-1.5 border border-transparent hover:border-emerald-200 transition-colors"
          title="Masuk ke Akun (Alt+L)"
        >
          <LogIn className="w-4 h-4" />
          <span>Log In</span>
        </button>
      )}

      {/* 10. Keluar (BtnClose) */}
      <button
        onClick={() => onModuleClick("Keluar Aplikasi")}
        className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Tutup SIMRS Khanza Web (Alt+U)"
      >
        <Power className="w-4 h-4 text-slate-400" />
        <span>Keluar</span>
      </button>
    </div>
  );
}

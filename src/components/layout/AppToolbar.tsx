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
  const { isAuthenticated, hasPermission, setIsLoginModalOpen } = useAuth();

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
    <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-center space-x-2 overflow-x-auto shadow-2xs select-none">
      {/* 1. Tombol Menu Utama */}
      <button
        onClick={onToggleMenu}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
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

      {/* 2. Registrasi */}
      <button
        onClick={() => handleToolAction("registrasi", "Registrasi Pasien")}
        disabled={isAuthenticated && !hasPermission("registrasi")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pendaftaran Pasien Baru & Lama (Alt+R)"
      >
        <UserPlus className="w-4 h-4 text-emerald-700" />
        <span>Registrasi</span>
      </button>

      {/* 3. IGD/UGD */}
      <button
        onClick={() => handleToolAction("igd", "Instalasi Gawat Darurat")}
        disabled={isAuthenticated && !hasPermission("igd")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pelayanan IGD / Tindakan Darurat (Alt+D)"
      >
        <Activity className="w-4 h-4 text-red-600" />
        <span>IGD/UGD</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 4. Laborat */}
      <button
        onClick={() => handleToolAction("periksa_lab", "Laboratorium")}
        disabled={isAuthenticated && !hasPermission("periksa_lab")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pemeriksaan Laboratorium (Alt+O)"
      >
        <TestTubes className="w-4 h-4 text-amber-600" />
        <span>Laborat</span>
      </button>

      {/* 5. Radiologi */}
      <button
        onClick={() => handleToolAction("periksa_radiologi", "Radiologi")}
        disabled={isAuthenticated && !hasPermission("periksa_radiologi")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Pemeriksaan Radiologi / Rontgen (Alt+A)"
      >
        <Bone className="w-4 h-4 text-blue-600" />
        <span>Radiologi</span>
      </button>

      {/* 6. Farmasi */}
      <button
        onClick={() => handleToolAction("penjualan_obat", "Farmasi & Obat")}
        disabled={isAuthenticated && !hasPermission("penjualan_obat")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Apotek, Resep & Penjualan Obat (Alt+J)"
      >
        <Pill className="w-4 h-4 text-emerald-600" />
        <span>Farmasi</span>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

      {/* 7. Rawat Inap */}
      <button
        onClick={() => handleToolAction("kamar_inap", "Rawat Inap & Kamar")}
        disabled={isAuthenticated && !hasPermission("kamar_inap")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Manajemen Bangsal & Rawat Inap (Alt+K)"
      >
        <BedDouble className="w-4 h-4 text-teal-600" />
        <span>Rawat Inap</span>
      </button>

      {/* 8. Rawat Jalan */}
      <button
        onClick={() => handleToolAction("tindakan_ralan", "Rawat Jalan / Poliklinik")}
        disabled={isAuthenticated && !hasPermission("tindakan_ralan")}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1.5 border border-transparent hover:border-slate-200 transition-colors"
        title="Poliklinik & Tindakan Rawat Jalan (Alt+S)"
      >
        <Stethoscope className="w-4 h-4 text-indigo-600" />
        <span>Rawat Jalan</span>
      </button>
    </div>
  );
}

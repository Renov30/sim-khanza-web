"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  ChevronDown,
  LogIn,
  LogOut,
  KeyRound,
  XCircle,
  Clock,
  CalendarDays,
  FileCheck2,
  Bed,
  CalendarCheck,
  BookOpen,
  Receipt,
  Activity,
  Layers,
  MonitorCheck,
  Pill,
  TestTube2,
  Info,
} from "lucide-react";

interface MenuBarProps {
  onModuleClick: (title: string) => void;
  onAboutClick: () => void;
}

export function AppMenuBar({ onModuleClick, onAboutClick }: MenuBarProps) {
  const { isAuthenticated, setIsLoginModalOpen, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (name: string) => {
    setActiveMenu((prev) => (prev === name ? null : name));
  };

  const handleAction = (title: string) => {
    setActiveMenu(null);
    onModuleClick(title);
  };

  return (
    <div
      ref={containerRef}
      className="bg-slate-100 border-b border-slate-200 text-xs text-slate-700 flex items-center px-2 py-0.5 space-x-1 select-none overflow-x-auto"
    >
      {/* 1. Program */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("program")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "program" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Program</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "program" && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setActiveMenu(null);
                  logout();
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveMenu(null);
                  setIsLoginModalOpen(true);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-700 font-medium"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}
            <button
              onClick={() => handleAction("Ganti Password Akun")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Ganti Password</span>
            </button>
            <div className="my-1 border-t border-slate-100" />
            <button
              onClick={() => handleAction("Keluar Aplikasi")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Keluar</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Presensi Pegawai */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("presensi")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "presensi" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Presensi Pegawai</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "presensi" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Rekap Kehadiran Harian")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Rekap Kehadiran Harian</span>
            </button>
            <button
              onClick={() => handleAction("Rekap Kehadiran Bulanan")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
              <span>Rekap Kehadiran Bulanan</span>
            </button>
            <button
              onClick={() => handleAction("Pengajuan Cuti Pegawai")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Pengajuan Cuti Pegawai</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Informasi */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("informasi")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "informasi" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Informasi</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "informasi" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Informasi Ketersediaan Kamar / Bed")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>Ketersediaan Kamar / Bed</span>
            </button>
            <button
              onClick={() => handleAction("Jadwal Praktek Dokter Spesialis")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Jadwal Praktek Dokter</span>
            </button>
            <button
              onClick={() => handleAction("Pencarian E-Book Kedokteran")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Pencarian E-Book / Jurnal</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Tarif */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("tarif")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "tarif" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Tarif</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "tarif" && (
          <div className="absolute left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Tarif Pelayanan Rawat Jalan")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Tarif Rawat Jalan</span>
            </button>
            <button
              onClick={() => handleAction("Tarif Pelayanan Rawat Inap")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Tarif Rawat Inap</span>
            </button>
            <button
              onClick={() => handleAction("Tarif Pemeriksaan Laboratorium")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Tarif Laboratorium</span>
            </button>
            <button
              onClick={() => handleAction("Tarif Radiologi")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Tarif Radiologi</span>
            </button>
            <button
              onClick={() => handleAction("Tarif Operasi & Bedah")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Tarif Operasi</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Dashboard */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("dashboard")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "dashboard" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Dashboard</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "dashboard" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Dashboard Indikator Pelayanan (BOR/LOS)")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Indikator Pelayanan (BOR)</span>
            </button>
            <button
              onClick={() => handleAction("Dashboard Kunjungan Poliklinik")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Kunjungan Poliklinik</span>
            </button>
          </div>
        )}
      </div>

      {/* 6. Anjungan & Antrian */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("anjungan")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "anjungan" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Anjungan & Antrian</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "anjungan" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Display Antrian Loket Pendaftaran")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <MonitorCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Display Antrian Loket</span>
            </button>
            <button
              onClick={() => handleAction("Display Antrian Poliklinik")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <MonitorCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Display Antrian Poli</span>
            </button>
          </div>
        )}
      </div>

      {/* 7. Antrian Apotek */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("apotek")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "apotek" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Antrian Apotek</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "apotek" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Display Antrian Farmasi / Apotek")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <Pill className="w-3.5 h-3.5 text-slate-400" />
              <span>Display Antrian Apotek</span>
            </button>
          </div>
        )}
      </div>

      {/* 8. Antrian Laborat */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("laborat")}
          className={`px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors ${
            activeMenu === "laborat" ? "bg-slate-200 font-semibold text-emerald-800" : ""
          }`}
        >
          <span>Antrian Laborat</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        {activeMenu === "laborat" && (
          <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
            <button
              onClick={() => handleAction("Display Antrian Laboratorium")}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
            >
              <TestTube2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Display Antrian Laborat</span>
            </button>
          </div>
        )}
      </div>

      {/* 9. Tentang Program */}
      <div className="relative">
        <button
          onClick={() => {
            setActiveMenu(null);
            onAboutClick();
          }}
          className="px-2.5 py-1 rounded hover:bg-slate-200 flex items-center gap-1 transition-colors text-slate-600"
        >
          <Info className="w-3 h-3 text-slate-500" />
          <span>Tentang Program</span>
        </button>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faRightFromBracket,
  faKey,
  faClock,
  faCalendarDays,
  faFileCircleCheck,
  faBed,
  faCalendarCheck,
  faBookMedical,
  faFileInvoiceDollar,
  faChartLine,
  faTv,
  faPills,
  faVial,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

interface UserAccountMenuProps {
  onModuleClick: (title: string) => void;
  onAboutClick: () => void;
}

export function UserAccountMenu({
  onModuleClick,
  onAboutClick,
}: UserAccountMenuProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"presensi" | "info" | "tarif" | "dashboard" | "antrian">("presensi");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleAction = (title: string) => {
    setIsOpen(false);
    onModuleClick(title);
  };

  const handleAbout = () => {
    setIsOpen(false);
    onAboutClick();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Tombol Akun di Header (Kompak, hanya nama & avatar) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-900 text-white pl-2.5 pr-2 py-1.5 rounded-lg border border-emerald-700/70 text-xs font-semibold shadow-xs transition-colors"
        title="Klik untuk membuka menu akun & modul sistem"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-emerald-100 font-bold text-[11px]">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <span className="max-w-[120px] md:max-w-[160px] truncate leading-tight">
          {user.fullName}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-3 h-3 text-emerald-300 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 text-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* 1. Header Informasi Pegawai & Jenis Akun */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-800 leading-snug truncate">
                  {user.fullName}
                </h3>
                <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                  {user.isAdmin
                    ? "Administrator Utama"
                    : "Petugas / Dokter"}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Navigasi Tab Layanan Sistem */}
          <div className="flex border-b border-slate-200 bg-slate-100/70 text-[11px] font-semibold overflow-x-auto scrollbar-none px-2 pt-1 gap-1">
            <button
              onClick={() => setActiveTab("presensi")}
              className={`px-2.5 py-1.5 rounded-t-lg transition-colors shrink-0 ${
                activeTab === "presensi"
                  ? "bg-white text-emerald-800 border-t-2 border-emerald-600 font-bold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Presensi
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-2.5 py-1.5 rounded-t-lg transition-colors shrink-0 ${
                activeTab === "info"
                  ? "bg-white text-emerald-800 border-t-2 border-emerald-600 font-bold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Informasi
            </button>
            <button
              onClick={() => setActiveTab("tarif")}
              className={`px-2.5 py-1.5 rounded-t-lg transition-colors shrink-0 ${
                activeTab === "tarif"
                  ? "bg-white text-emerald-800 border-t-2 border-emerald-600 font-bold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Tarif
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-2.5 py-1.5 rounded-t-lg transition-colors shrink-0 ${
                activeTab === "dashboard"
                  ? "bg-white text-emerald-800 border-t-2 border-emerald-600 font-bold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("antrian")}
              className={`px-2.5 py-1.5 rounded-t-lg transition-colors shrink-0 ${
                activeTab === "antrian"
                  ? "bg-white text-emerald-800 border-t-2 border-emerald-600 font-bold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Antrian
            </button>
          </div>

          {/* 3. Isi Submenu Berdasarkan Tab */}
          <div className="p-2 max-h-56 overflow-y-auto space-y-1 text-xs">
            {activeTab === "presensi" && (
              <>
                <button
                  onClick={() => handleAction("Rekap Kehadiran Harian")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Rekap Kehadiran Harian</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Rekap Kehadiran Bulanan")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Rekap Kehadiran Bulanan</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Pengajuan Cuti Pegawai")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faFileCircleCheck} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pengajuan Cuti Pegawai</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
              </>
            )}

            {activeTab === "info" && (
              <>
                <button
                  onClick={() => handleAction("Ketersediaan Kamar / Info Bed")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faBed} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Ketersediaan Kamar / Bed</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Jadwal Praktek Dokter Spesialis")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faCalendarCheck} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Jadwal Praktek Dokter</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Pencarian E-Book Kedokteran")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faBookMedical} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pencarian E-Book / Jurnal</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
              </>
            )}

            {activeTab === "tarif" && (
              <>
                <button
                  onClick={() => handleAction("Tarif Pelayanan Rawat Jalan")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tarif Rawat Jalan</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Tarif Pelayanan Rawat Inap")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tarif Rawat Inap</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Tarif Pemeriksaan Laboratorium")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tarif Laboratorium</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Tarif Radiologi")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tarif Radiologi</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
              </>
            )}

            {activeTab === "dashboard" && (
              <>
                <button
                  onClick={() => handleAction("Dashboard Indikator Pelayanan (BOR/LOS)")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Indikator Pelayanan (BOR)</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Dashboard Kunjungan Poliklinik")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Kunjungan Poliklinik</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
              </>
            )}

            {activeTab === "antrian" && (
              <>
                <button
                  onClick={() => handleAction("Display Antrian Loket Pendaftaran")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faTv} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Display Antrian Loket</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Display Antrian Poliklinik")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faTv} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Display Antrian Poli</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Display Antrian Farmasi / Apotek")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faPills} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Display Antrian Apotek</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleAction("Display Antrian Laboratorium")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faVial} className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Display Antrian Laborat</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5 text-slate-400" />
                </button>
              </>
            )}
          </div>

          {/* 4. Pengaturan Akun & Tombol Log Out */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs px-2 py-1 text-slate-600">
              <button
                onClick={() => handleAction("Ganti Password Akun")}
                className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
              >
                <FontAwesomeIcon icon={faKey} className="w-3 h-3" />
                <span>Ganti Password</span>
              </button>
              <button
                onClick={handleAbout}
                className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
              >
                <FontAwesomeIcon icon={faCircleInfo} className="w-3 h-3" />
                <span>Tentang Aplikasi</span>
              </button>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full py-2 px-3 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-200 hover:border-red-600"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5" />
              <span>Keluar dari Akun (Log Out)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import { HospitalSetting } from "@/lib/types/auth";
import {
  Hospital,
  UserPlus,
  Stethoscope,
  BedDouble,
  Pill,
  Menu,
  LogIn,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function FrmUtamaPage() {
  const { isAuthenticated, user, setIsLoginModalOpen } = useAuth();
  // Default isMenuOpen = false agar web membuka Halaman Utama terlebih dahulu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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

  const handleModuleClick = (title: string) => {
    if (title === "Keluar Aplikasi") {
      setToastMessage("Untuk menutup aplikasi, Anda dapat menutup tab peramban (browser).");
      return;
    }
    if (title === "Ganti Password Akun") {
      if (!isAuthenticated) {
        setIsLoginModalOpen(true);
      } else {
        setToastMessage("Fitur Ganti Password sedang dalam antrian pengembangan.");
      }
      return;
    }

    setToastMessage(`Modul "${title}" sedang dalam antrian pengembangan tahap berikutnya.`);
  };

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
      {/* 1. Header Terpadu: Nama Instansi (Kiri), Toolbar Modul (Tengah), Akun (Kanan) */}
      <AppHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onModuleClick={handleModuleClick}
        onAboutClick={() => setIsAboutOpen(true)}
      />

      {/* 2. Main Workspace Area (PanelUtama & DlgHome in frmUtama) */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {isMenuOpen ? (
          <MainMenuGrid onModuleClick={handleModuleClick} />
        ) : (
          /* Halaman Utama Dashboard Saat Web Dibuka */
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center bg-slate-50">
            <div className="w-full max-w-4xl space-y-6">
              {/* Kartu Selamat Datang Instansi */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-2xs">
                  <Hospital className="w-7 h-7" />
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800 uppercase tracking-tight">
                    {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
                    {setting?.alamat_instansi || "JL. Irian Seringgu Kelurahan Samkai"}
                    {setting?.kabupaten ? `, ${setting.kabupaten}` : ""}
                    {setting?.propinsi ? ` - ${setting.propinsi}` : ""}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{currentDate}</span>
                  <span>•</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-emerald-700">Sistem Siap Digunakan</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Menu className="w-4 h-4" />
                    <span>Jelajahi Menu Utama</span>
                  </button>

                  {!isAuthenticated && (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Log In Petugas</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Pintasan Layanan Utama */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <button
                  onClick={() => handleModuleClick("Registrasi Pasien")}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 shadow-xs hover:shadow-md text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                    Registrasi Pasien
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Pendaftaran pasien baru & lama, cetak berkas, dan antrian loket.
                  </p>
                </button>

                <button
                  onClick={() => handleModuleClick("Rawat Jalan / Poliklinik")}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 shadow-xs hover:shadow-md text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                    Rawat Jalan
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Pemeriksaan poliklinik spesialis, tindakan ralan, dan resep dokter.
                  </p>
                </button>

                <button
                  onClick={() => handleModuleClick("Rawat Inap & Kamar")}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 shadow-xs hover:shadow-md text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                    Rawat Inap
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Manajemen bangsal kamar, observasi rawat inap, dan billing ranap.
                  </p>
                </button>

                <button
                  onClick={() => handleModuleClick("Farmasi & Obat")}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 shadow-xs hover:shadow-md text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                    <Pill className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                    Farmasi & Apotek
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    Validasi resep obat, penyerahan obat, dan pemantauan stok farmasi.
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Modals & Notifications */}
      <LoginModal />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

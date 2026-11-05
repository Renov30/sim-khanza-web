"use client";

import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import { HospitalSetting } from "@/lib/types/auth";
import { Hospital, CheckCircle2, Calendar } from "lucide-react";

export default function FrmUtamaPage() {
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();
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
          /* Halaman Utama Bersih Saat Web Dibuka */
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center bg-slate-50">
            <div className="w-full max-w-xl">
              {/* Kartu Informasi Instansi */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-2xs">
                  <Hospital className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-tight">
                    {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-md mx-auto">
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

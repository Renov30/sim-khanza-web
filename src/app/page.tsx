"use client";

import React, { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";

export default function FrmUtamaPage() {
  const { isAuthenticated, user, setIsLoginModalOpen } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
      {/* 1. Header Terpadu: Nama Instansi (Kiri), Toolbar Modul (Tengah), Akun (Kanan) */}
      <AppHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onModuleClick={handleModuleClick}
        onAboutClick={() => setIsAboutOpen(true)}
      />

      {/* 3. Main Workspace Area (PanelUtama & DlgHome in frmUtama) */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {isMenuOpen ? (
          <MainMenuGrid onModuleClick={handleModuleClick} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                HMS
              </div>
              <h2 className="text-base font-bold text-slate-800">
                Layar Utama SIMRS Khanza Web
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isAuthenticated && user
                  ? `Sesi aktif: ${user.fullName} (${user.role === "admin" ? "Administrator" : "Petugas"}). Klik tombol "Menu Utama" pada toolbar di atas untuk menjelajahi seluruh modul.`
                  : "Anda belum login. Silakan klik tombol 'Log In' pada toolbar di atas untuk mengakses seluruh fitur dengan hak akses petugas."}
              </p>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
              >
                Buka Menu Utama
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Modals & Notifications */}
      <LoginModal />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

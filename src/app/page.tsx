"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";

export default function FrmUtamaPage() {
  const router = useRouter();
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();
  // Default isMenuOpen = false agar web membuka Halaman Utama (polos) terlebih dahulu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Routing ke halaman modul yang telah dibangun
    if (title === "Registrasi Pasien" || title === "Pendaftaran Pasien") {
      router.push("/registrasi");
      return;
    }
    if (title === "Instalasi Gawat Darurat" || title === "Pelayanan IGD") {
      router.push("/igd");
      return;
    }
    if (title === "Laboratorium" || title === "Pemeriksaan Laboratorium") {
      router.push("/laboratorium");
      return;
    }
    if (title === "Radiologi" || title === "Pemeriksaan Radiologi") {
      router.push("/radiologi");
      return;
    }
    if (title === "Farmasi & Obat" || title === "Farmasi & Penjualan Obat" || title === "Pemberian Obat Farmasi") {
      router.push("/farmasi");
      return;
    }
    if (title === "Rawat Inap & Kamar" || title === "Rawat Inap" || title === "Kamar Inap") {
      router.push("/rawat-inap");
      return;
    }
    if (title === "Rawat Jalan / Poliklinik" || title === "Rawat Jalan" || title === "Tindakan Ralan") {
      router.push("/rawat-jalan");
      return;
    }

    setToastMessage(`Modul "${title}" sedang dalam antrian pengembangan tahap berikutnya.`);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white">
      {/* 1. Header Terpadu: Nama Instansi (Kiri), Toolbar Modul (Tengah), Akun (Kanan) */}
      <AppHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onModuleClick={handleModuleClick}
        onAboutClick={() => setIsAboutOpen(true)}
      />

      {/* 2. Main Workspace Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col bg-white">
        {isMenuOpen ? (
          <MainMenuGrid onModuleClick={handleModuleClick} />
        ) : (
          /* Halaman Utama Polos Putih */
          <div className="flex-1 bg-white" />
        )}
      </main>

      {/* 3. Modals & Notifications */}
      <LoginModal />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

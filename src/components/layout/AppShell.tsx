"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import type { HospitalSetting } from "@/lib/types/auth";

interface NavigationContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsLoginModalOpen, isLocked } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [setting, setSetting] = useState<HospitalSetting | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function muatIdentitasInstansi() {
      try {
        const response = await fetch("/api/system/info", { signal: controller.signal });
        const result = await response.json();
        if (response.ok && result.success && result.data?.setting) {
          setSetting(result.data.setting);
        }
      } catch (error) {
        if (!controller.signal.aborted) console.error("Gagal memuat identitas instansi:", error);
      }
    }
    void muatIdentitasInstansi();
    return () => controller.abort();
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

    setIsMenuOpen(false);

    if (title === "Registrasi Pasien" || title === "Pendaftaran Pasien") {
      router.push("/registrasi");
      return;
    }
    if (title === "Instalasi Gawat Darurat" || title === "Pelayanan IGD") {
      router.push("/igd");
      return;
    }
    if (title === "Laboratorium" || title === "Pemeriksaan Laboratorium") {
      router.push("/laboratorium/periksa-pk");
      return;
    }
    if (title === "Radiologi" || title === "Pemeriksaan Radiologi") {
      router.push("/radiologi/periksa");
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

  const handleToggleMenu = () => {
    if (pathname !== "/") {
      router.push("/");
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu: handleToggleMenu,
      }}
    >
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 relative">
        {/* Konten Halaman & Header: Mengalami efek blur dan non-interaktif saat logout/terkunci */}
        <div
          className={`flex flex-col flex-1 h-full w-full overflow-hidden ${
            isLocked ? "filter blur-sm select-none pointer-events-none" : ""
          }`}
        >
          {/* Header Global Selalu Tampil di Semua Halaman */}
          <AppHeader
            isMenuOpen={isMenuOpen && pathname === "/"}
            onToggleMenu={handleToggleMenu}
            onModuleClick={handleModuleClick}
            onAboutClick={() => setIsAboutOpen(true)}
          />

          {/* Konten Halaman */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {isMenuOpen && pathname === "/" ? (
              <main className="flex-1 overflow-hidden relative flex flex-col bg-white">
                <MainMenuGrid onModuleClick={handleModuleClick} />
              </main>
            ) : (
              <main className="flex-1 overflow-hidden relative flex flex-col">
                {children}
                {pathname === "/" && (
                  <section className="absolute bottom-5 left-6 max-w-md text-left" aria-label="Identitas instansi">
                    <h1 className="text-sm font-bold uppercase tracking-tight text-slate-800">
                      {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
                    </h1>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {setting?.alamat_instansi || "JL. Irian Seringgu Kelurahan Samkai"}
                      {setting?.kabupaten ? `, ${setting.kabupaten}` : ""}
                    </p>
                  </section>
                )}
              </main>
            )}
          </div>
        </div>

        {/* Modals & Toast Notifikasi Global */}
        <LoginModal />
        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    </NavigationContext.Provider>
  );
}


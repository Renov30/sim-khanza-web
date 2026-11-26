"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { MainMenuGrid } from "@/components/menu/MainMenuGrid";
import { LoginModal } from "@/components/auth/LoginModal";
import { GantiPasswordModal } from "@/components/auth/GantiPasswordModal";
import { GlobalTableContextMenu } from "@/components/modul/GlobalTableContextMenu";
import { AboutModal } from "@/components/common/AboutModal";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import type { HospitalSetting } from "@/lib/types/auth";
import type { MenuItem } from "@/lib/types/menu";
import type { KonfigurasiModul } from "@/lib/modul/peta";
import { dapatkanRuteKatalog } from "@/lib/modul/rute-katalog";

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

export function AppShell({
  children,
  konfigurasiModul,
}: {
  children: ReactNode;
  konfigurasiModul: KonfigurasiModul;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, setIsLoginModalOpen, isLocked } = useAuth();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGantiPasswordOpen, setIsGantiPasswordOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [setting, setSetting] = useState<HospitalSetting | null>(null);
  const isMenuOpen = pathname === "/" && searchParams.get("menu") === "1";

  const setIsMenuOpen = useCallback((open: boolean) => {
    if (open) {
      router.replace("/?menu=1");
      return;
    }
    router.replace("/");
  }, [router]);

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

  const handleModuleClick = useCallback((module: string | MenuItem) => {
    const title = typeof module === "string" ? module : module.title;
    if (title === "Keluar Aplikasi") {
      setToastMessage("Untuk menutup aplikasi, Anda dapat menutup tab peramban (browser).");
      return;
    }
    if (title === "Ganti Password Akun") {
      if (!isAuthenticated) {
        setIsLoginModalOpen(true);
      } else {
        setIsGantiPasswordOpen(true);
      }
      return;
    }

    if (typeof module !== "string" && module.href) {
      router.push(module.href);
      return;
    }

    if (typeof module !== "string") {
      if (module.id === "btn-barcode-ralan" || module.id === "barcode-ralan") {
        router.push("/rawat-jalan/barcode");
        return;
      }
      if (module.id === "btn-barcode-ranap" || module.id === "barcode-ranap") {
        router.push("/rawat-inap/barcode");
        return;
      }
    }

    if (
      title === "Jadwal Praktek"
      || title === "Jadwal Praktek Dokter"
      || title === "Jadwal Praktek Dokter Spesialis"
    ) {
      router.push("/jadwal-dokter");
      return;
    }
    if (
      title === "Tarif Ralan"
      || title === "Master Tarif Ralan"
      || title === "Tarif Rawat Jalan"
      || title === "Tarif Pelayanan Rawat Jalan"
    ) {
      router.push("/tarif-ralan");
      return;
    }
    if (
      title === "Tarif Ranap"
      || title === "Master Tarif Ranap"
      || title === "Tarif Rawat Inap"
      || title === "Tarif Pelayanan Rawat Inap"
    ) {
      router.push("/tarif-ranap");
      return;
    }
    if (
      title === "Tarif Lab"
      || title === "Master Tarif Lab"
      || title === "Master Tarif Laboratorium"
      || title === "Tarif Laboratorium"
      || title === "Tarif Pemeriksaan Laboratorium"
    ) {
      router.push("/tarif-lab");
      return;
    }
    if (
      title === "Data Pasien"
      || title === "Cari Data Pasien"
      || title === "Cari Data Pasien (Rekam Medis)"
      || title === "Pasien"
    ) {
      router.push("/pasien");
      return;
    }
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
    if (title === "Data Petugas" || title === "Petugas") {
      router.push("/petugas");
      return;
    }
    if (title === "Data Dokter" || title === "Dokter") {
      router.push("/dokter");
      return;
    }
    if (title === "Kepegawaian & Gaji" || title === "Penggajian (Payroll)" || title === "Data Pegawai") {
      router.push("/pegawai");
      return;
    }
    if (title === "Data Obat, Alkes & BHP" || title === "Data Obat, Alkes & BHP Medis") {
      router.push("/farmasi/master-obat");
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
    if (title === "Data Poliklinik" || title === "Poliklinik") {
      router.push("/poliklinik");
      return;
    }
    if (
      title === "Rawat Jalan / Poliklinik"
      || title === "Rawat Jalan"
      || title === "Tindakan Ralan"
      || title === "Tindakan Rawat Jalan"
    ) {
      router.push("/rawat-jalan");
      return;
    }
    if (title === "Kasir & Billing Ralan") {
      router.push("/rawat-jalan");
      return;
    }

    // --- Jalur menu kategori [A] ---
    const RUTE_KATEGORI_A: Readonly<Record<string, string>> = {
      "Registrasi": "/registrasi",
      "IGD/UGD": "/igd",
      "Tindakan Ranap": "/tindakan-rawat-inap",
      "Permintaan Lab PK": "/laboratorium/permintaan-pk",
      "Permintaan Lab PA": "/laboratorium/permintaan-pa",
      "Permintaan Lab MB": "/laboratorium/permintaan-mb",
      "Periksa Lab PK": "/laboratorium/periksa-pk",
      "Periksa Lab PA": "/laboratorium/periksa-pa",
      "Periksa Lab MB": "/laboratorium/periksa-mb",
      "Permintaan Radiologi": "/radiologi/permintaan",
      "Periksa Radiologi": "/radiologi/periksa",
      "No. Resep": "/farmasi/no-resep",
      "Informasi Kamar": "/rawat-inap/informasi-kamar",
      "Ketersediaan Bed / Kamar": "/rawat-inap/informasi-kamar",
      "Booking Periksa": "/registrasi/booking-periksa",
      "Booking Registrasi": "/registrasi/booking-registrasi",
      "Booking Registrasi Online": "/registrasi/booking-registrasi",
      "Booking MCU Perusahaan": "/registrasi/booking-mcu-perusahaan",
      "Permintaan Rawat Inap": "/rawat-inap/permintaan",
      "Jadwal Operasi": "/rawat-inap/jadwal-operasi",
      "Permintaan Layanan Program KFR": "/rawat-jalan/permintaan-kfr",
      "DPJP Ranap": "/rawat-inap/dpjp",
      "Operasi/VK": "/rawat-inap/operasi",
      "Rujukan Keluar": "/registrasi/rujukan-keluar",
      "Rujukan Masuk": "/registrasi/rujukan-masuk",
      "Beri Obat/BHP": "/farmasi/beri-obat",
      "Tarif Farmasi": "/tarif-farmasi",
      "Resep Pulang": "/farmasi/resep-pulang",
      "Diet Pasien": "/rawat-inap/diet",
      "Skrining Rawat Jalan": "/rawat-jalan/skrining",
      "Deteksi Dini Corona": "/rawat-jalan/deteksi-corona",
      "Deposit Pasien": "/rawat-inap/deposit",
      "Perkiraan Biaya Ranap": "/rawat-inap/perkiraan-biaya",
      "Billing Rawat Inap": "/rawat-inap/billing",
      "Barcode Tindakan Ralan": "/rawat-jalan/barcode",
      "Barcode Tindakan Ranap": "/rawat-inap/barcode",
      // Menu Akun & Layanan Sistem (UserAccountMenu)
      "Rekap Kehadiran Harian": "/kepegawaian/rekap-harian",
      "Rekap Kehadiran Bulanan": "/kepegawaian/rekap-bulanan",
      "Pengajuan Cuti Pegawai": "/kepegawaian/pengajuan-cuti",
      "Ketersediaan Kamar / Info Bed": "/rawat-inap/informasi-kamar",
      "Pencarian E-Book Kedokteran": "/perpustakaan/cari-ebook",
      "Dashboard Indikator Pelayanan (BOR/LOS)": "/dashboard/indikator-pelayanan",
      "Dashboard Kunjungan Poliklinik": "/dashboard/kunjungan-poliklinik",
      "Display Antrian Loket Pendaftaran": "/antrian?jenis=loket",
      "Display Antrian Poliklinik": "/antrian?jenis=poli",
      "Display Antrian Farmasi / Apotek": "/antrian?jenis=apotek",
      "Display Antrian Laboratorium": "/antrian?jenis=laborat",
    };

    const ruteKategoriA = RUTE_KATEGORI_A[title];
    if (ruteKategoriA) {
      router.push(ruteKategoriA);
      return;
    }

    const idMenu = typeof module === "string" ? "" : module.id;
    const ruteKatalog = dapatkanRuteKatalog(idMenu, title);
    if (ruteKatalog) {
      router.push(ruteKatalog);
      return;
    }

    setToastMessage(`Modul "${title}" sedang dalam antrian pengembangan tahap berikutnya.`);
  }, [isAuthenticated, router, setIsLoginModalOpen]);

  const handleToggleMenu = useCallback(() => {
    if (pathname !== "/") {
      router.push("/?menu=1");
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  }, [isMenuOpen, pathname, router, setIsMenuOpen]);

  const navValue = useMemo(
    () => ({ isMenuOpen, setIsMenuOpen, toggleMenu: handleToggleMenu }),
    [handleToggleMenu, isMenuOpen, setIsMenuOpen],
  );

  // Halaman cetak (/cetak/*) tampil bersih layaknya JasperViewer tanpa header aplikasi.
  if (pathname.startsWith("/cetak/")) {
    return (
      <NavigationContext.Provider value={navValue}>
        <div className="min-h-screen w-full overflow-auto bg-slate-200 print:min-h-0 print:overflow-visible print:bg-white">
          {children}
          <LoginModal />
        </div>
      </NavigationContext.Provider>
    );
  }

  return (
    <NavigationContext.Provider value={navValue}>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 relative">
        {/* Konten Halaman & Header: Mengalami efek blur dan non-interaktif saat logout/terkunci */}
        <div
          className={`flex flex-col flex-1 h-full w-full overflow-hidden ${
            isLocked ? "filter blur-sm select-none pointer-events-none" : ""
          }`}
        >
          {/* Header Global Selalu Tampil di Semua Halaman */}
          <AppHeader
            konfigurasiModul={konfigurasiModul}
            isMenuOpen={isMenuOpen && pathname === "/"}
            onToggleMenu={handleToggleMenu}
            onModuleClick={handleModuleClick}
            onAboutClick={() => setIsAboutOpen(true)}
          />

          {/* Konten Halaman */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {isMenuOpen && pathname === "/" ? (
              <main className="flex-1 overflow-hidden relative flex flex-col bg-white">
                <MainMenuGrid konfigurasiModul={konfigurasiModul} onModuleClick={handleModuleClick} />
              </main>
            ) : (
              <main className="flex-1 overflow-hidden relative flex flex-col">
                {children}
                {pathname === "/" && (
                  <section className="absolute bottom-5 left-6 max-w-md text-left" aria-label="Identitas instansi">
                    <h2 className="text-sm font-bold uppercase tracking-tight text-slate-800">
                      {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
                    </h2>
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
        <GlobalTableContextMenu onNotifikasi={(pesan) => setToastMessage(pesan)} />
        <LoginModal />
        <GantiPasswordModal
          terbuka={isGantiPasswordOpen}
          onTutup={() => setIsGantiPasswordOpen(false)}
          onSukses={(pesan) => setToastMessage(pesan)}
        />
        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    </NavigationContext.Provider>
  );
}


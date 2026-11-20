"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CopyResepDialog } from "@/components/farmasi/CopyResepDialog";
import { PemeriksaanRalanTab } from "@/components/tindakan-rawat-jalan/PemeriksaanRalanTab";
import { RiwayatPasienDialog } from "@/components/tindakan-rawat-jalan/RiwayatPasienDialog";
import { PatientMasterSelect } from "@/components/pasien/PatientMasterSelect";
import { PemeriksaanObgynTab } from "@/components/tindakan-rawat-jalan/PemeriksaanObgynTab";
import { DiagnosaRalanTab } from "@/components/tindakan-rawat-jalan/DiagnosaRalanTab";
import { CatatanDokterTab } from "@/components/tindakan-rawat-jalan/CatatanDokterTab";
import {
  STATUS_PANEL_PEMERIKSAAN_AWAL,
  type AksiPanelPemeriksaan,
  type StatusPanelPemeriksaan,
} from "@/components/tindakan-rawat-jalan/kontrak-panel-pemeriksaan";
import { SidebarTindakanRalan } from "@/components/tindakan-rawat-jalan/SidebarTindakanRalan";
import { registrationDate } from "@/lib/registrasi/date";
import { pindahFieldDenganEnter } from "@/lib/formulir/pindah-field";

type ModeTindakan = "dokter" | "petugas" | "gabungan";
type TabRawatJalan = ModeTindakan | "pemeriksaan" | "obstetri" | "ginekologi" | "diagnosa" | "catatan";

interface RegistrasiPilihan {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_poli: string;
  nm_poli: string;
  kd_pj: string;
  png_jawab: string;
  stts: string;
  status_bayar: string;
}

interface Pelaksana { kode: string; nama: string }
interface Tarif { kd_jenis_prw: string; nm_perawatan: string; nm_kategori: string; total: number | string }
interface Riwayat {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
  kd_dokter: string | null;
  nm_dokter: string | null;
  nip: string | null;
  nm_petugas: string | null;
  tgl_perawatan: string;
  jam_rawat: string;
  biaya_rawat: number | string;
  stts_bayar: string;
}

const TAB_RAWAT: { id: TabRawatJalan; label: string }[] = [
  { id: "dokter", label: "Penanganan Dokter" },
  { id: "petugas", label: "Penanganan Petugas" },
  { id: "gabungan", label: "Dokter & Petugas" },
  { id: "pemeriksaan", label: "Pemeriksaan" },
  { id: "obstetri", label: "Pemeriksaan Obstetri" },
  { id: "ginekologi", label: "Pemeriksaan Ginekologi" },
  { id: "diagnosa", label: "Diagnosa" },
  { id: "catatan", label: "Catatan Dokter" },
];

const adalahModeTindakan = (tab: TabRawatJalan): tab is ModeTindakan =>
  tab === "dokter" || tab === "petugas" || tab === "gabungan";

const adalahTabKlinis = (tab: TabRawatJalan) =>
  tab === "pemeriksaan" || tab === "obstetri" || tab === "ginekologi" || tab === "diagnosa" || tab === "catatan";

const rupiah = (nilai: number | string) => `Rp ${Number(nilai || 0).toLocaleString("id-ID")}`;

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).format(new Date());
}

export default function HalamanTindakanRawatJalan() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();
  const [mode, setMode] = useState<ModeTindakan>("dokter");
  const [tabAktif, setTabAktif] = useState<TabRawatJalan>("pemeriksaan");
  const [tanggal, setTanggal] = useState(hariIni);
  const [jam, setJam] = useState(jamJayapura);
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [pasien, setPasien] = useState<RegistrasiPilihan | null>(null);
  const [cariPasien, setCariPasien] = useState("");
  const [hasilPasien, setHasilPasien] = useState<RegistrasiPilihan[]>([]);
  const [memuatPasien, setMemuatPasien] = useState(false);
  const [dokter, setDokter] = useState("");
  const [petugas, setPetugas] = useState("");
  const [daftarDokter, setDaftarDokter] = useState<Pelaksana[]>([]);
  const [daftarPetugas, setDaftarPetugas] = useState<Pelaksana[]>([]);
  const [cariTarif, setCariTarif] = useState("");
  const [tarif, setTarif] = useState<Tarif[]>([]);
  const [kodeTerpilih, setKodeTerpilih] = useState<Set<string>>(new Set());
  const [memuatTarif, setMemuatTarif] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasiKeluar, setKonfirmasiKeluar] = useState(false);
  const [memperbaruiStatus, setMemperbaruiStatus] = useState(false);

  const [riwayat, setRiwayat] = useState<Riwayat[]>([]);
  const [memuatRiwayat, setMemuatRiwayat] = useState(true);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [total, setTotal] = useState(0);
  const [versiData, setVersiData] = useState(0);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error" } | null>(null);
  const [riwayatPasienTerbuka, setRiwayatPasienTerbuka] = useState(false);
  const [copyResepTerbuka, setCopyResepTerbuka] = useState(false);
  const permintaanRiwayat = useRef<AbortController | null>(null);
  const aksiPanelPemeriksaan = useRef<AksiPanelPemeriksaan | null>(null);
  const [statusPanelPemeriksaan, setStatusPanelPemeriksaan] = useState<StatusPanelPemeriksaan>(STATUS_PANEL_PEMERIKSAAN_AWAL);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe });
  }, []);

  const bukaRiwayatPasien = useCallback(() => {
    if (!pasien) {
      tampilkanToast("Pilih kunjungan pasien terlebih dahulu.", "info");
      return;
    }
    setRiwayatPasienTerbuka(true);
  }, [pasien, tampilkanToast]);

  const bukaCopyResep = useCallback(() => {
    if (!pasien) {
      tampilkanToast("Pilih kunjungan pasien terlebih dahulu.", "info");
      return;
    }
    setCopyResepTerbuka(true);
  }, [pasien, tampilkanToast]);

  const bukaResumePasien = useCallback(() => {
    if (!pasien) {
      tampilkanToast("Pilih kunjungan pasien terlebih dahulu.", "info");
      return;
    }
    router.push(`/resume-pasien?no_rawat=${encodeURIComponent(pasien.no_rawat)}`);
  }, [pasien, router, tampilkanToast]);

  useEffect(() => {
    if (!waktuOtomatis) return;
    const perbaruiWaktu = () => {
      const sekarang = new Date();
      setTanggal(registrationDate(sekarang));
      setJam(jamJayapura());
    };
    perbaruiWaktu();
    const timer = setInterval(perbaruiWaktu, 1000);
    return () => clearInterval(timer);
  }, [waktuOtomatis]);

  const muatRiwayat = useCallback(async () => {
    if (!isAuthenticated) return;
    permintaanRiwayat.current?.abort();
    const controller = new AbortController();
    permintaanRiwayat.current = controller;
    setMemuatRiwayat(true);
    try {
      const url = new URL("/api/tindakan-rawat-jalan", window.location.origin);
      url.searchParams.set("resource", "riwayat");
      url.searchParams.set("mode", mode);
      url.searchParams.set("tanggal_mulai", tanggalMulai);
      url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", "50");
      if (kataKunciFilter) url.searchParams.set("cari", kataKunciFilter);
      const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat tindakan");
      setRiwayat(json.data || []);
      setTotal(Number(json.total) || 0);
    } catch (error) {
      if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat tindakan", "error");
    } finally {
      if (!controller.signal.aborted) setMemuatRiwayat(false);
    }
  }, [halaman, isAuthenticated, kataKunciFilter, mode, tanggalMulai, tanggalSelesai, tampilkanToast]);

  useEffect(() => {
    const timer = setTimeout(() => { void muatRiwayat(); }, 0);
    return () => { clearTimeout(timer); permintaanRiwayat.current?.abort(); };
  }, [muatRiwayat, versiData]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    async function muatPelaksana() {
      try {
        const response = await fetch(`/api/tindakan-rawat-jalan?resource=pelaksana&mode=${mode}`, { signal: controller.signal });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat pelaksana");
        setDaftarDokter(json.data?.dokter || []);
        setDaftarPetugas(json.data?.petugas || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat pelaksana", "error");
      }
    }
    void muatPelaksana();
    return () => controller.abort();
  }, [isAuthenticated, mode, tampilkanToast]);

  useEffect(() => {
    const noRawat = new URLSearchParams(window.location.search).get("no_rawat")?.trim() || "";
    if (!isAuthenticated || !noRawat || noRawat.length > 17) return;
    const controller = new AbortController();
    async function muatKunjunganDariDaftar() {
      setMemuatPasien(true);
      try {
        const url = `/api/tindakan-rawat-jalan?resource=registrasi&mode=${mode}&cari=${encodeURIComponent(noRawat)}`;
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat kunjungan");
        const kunjungan = (json.data || []).find((item: RegistrasiPilihan) => item.no_rawat === noRawat);
        if (!kunjungan) throw new Error("Kunjungan rawat jalan tidak ditemukan.");
        if (!controller.signal.aborted) {
          setPasien(kunjungan);
          setCariPasien(`${kunjungan.no_rawat} · ${kunjungan.nm_pasien}`);
          setHasilPasien([]);
          setDokter(kunjungan.kd_dokter);
          setKodeTerpilih(new Set());
        }
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat kunjungan", "error");
      } finally {
        if (!controller.signal.aborted) setMemuatPasien(false);
      }
    }
    void muatKunjunganDariDaftar();
    return () => controller.abort();
  // Parameter URL hanya dibaca saat halaman dibuka dari daftar; ganti mode tidak mengganti pasien.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, tampilkanToast]);

  useEffect(() => {
    if (pasien || cariPasien.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatPasien(true);
      try {
        const url = `/api/tindakan-rawat-jalan?resource=registrasi&mode=${mode}&cari=${encodeURIComponent(cariPasien.trim())}`;
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal mencari kunjungan");
        setHasilPasien(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal mencari kunjungan", "error");
      } finally {
        if (!controller.signal.aborted) setMemuatPasien(false);
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariPasien, mode, pasien, tampilkanToast]);

  useEffect(() => {
    if (!pasien) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatTarif(true);
      try {
        const url = `/api/tindakan-rawat-jalan?resource=tarif&mode=${mode}&no_rawat=${encodeURIComponent(pasien.no_rawat)}&cari=${encodeURIComponent(cariTarif.trim())}`;
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat tarif tindakan");
        setTarif(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat tarif tindakan", "error");
      } finally {
        if (!controller.signal.aborted) setMemuatTarif(false);
      }
    }, cariTarif ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariTarif, mode, pasien, tampilkanToast]);

  const totalDipilih = useMemo(() => tarif
    .filter((item) => kodeTerpilih.has(item.kd_jenis_prw))
    .reduce((jumlah, item) => jumlah + Number(item.total || 0), 0), [kodeTerpilih, tarif]);
  const pilihanDokter = pasien && !daftarDokter.some((item) => item.kode === pasien.kd_dokter)
    ? [{ kode: pasien.kd_dokter, nama: pasien.nm_dokter }, ...daftarDokter]
    : daftarDokter;

  const ubahPilihanTindakan = (kode: string) => {
    setKodeTerpilih((lama) => {
      const baru = new Set(lama);
      if (baru.has(kode)) baru.delete(kode);
      else baru.add(kode);
      return baru;
    });
  };

  const pilihPasien = (item: RegistrasiPilihan) => {
    setPasien(item);
    setCariPasien(`${item.no_rawat} · ${item.nm_pasien}`);
    setHasilPasien([]);
    setDokter(mode !== "petugas" ? item.kd_dokter : "");
    setKodeTerpilih(new Set());
  };

  const gantiTab = (berikutnya: TabRawatJalan) => {
    setTabAktif(berikutnya);
    if (adalahTabKlinis(berikutnya)) {
      setStatusPanelPemeriksaan(STATUS_PANEL_PEMERIKSAAN_AWAL);
    }
    if (!adalahModeTindakan(berikutnya)) return;
    setMode(berikutnya);
    setHalaman(1);
    setDokter(berikutnya !== "petugas" ? pasien?.kd_dokter || "" : "");
    setPetugas("");
    setCariTarif("");
    setKodeTerpilih(new Set());
  };

  const resetForm = () => {
    setPasien(null);
    setCariPasien("");
    setHasilPasien([]);
    setTanggal(hariIni);
    setJam(jamJayapura());
    setWaktuOtomatis(true);
    setDokter("");
    setPetugas("");
    setCariTarif("");
    setTarif([]);
    setKodeTerpilih(new Set());
  };

  const simpan = async () => {
    if (!pasien) return tampilkanToast("Pilih kunjungan rawat jalan terlebih dahulu.", "error");
    if (kodeTerpilih.size === 0) return tampilkanToast("Pilih minimal satu tindakan.", "error");
    if (mode !== "petugas" && !dokter) return tampilkanToast("Dokter wajib dipilih.", "error");
    if (mode !== "dokter" && !petugas) return tampilkanToast("Petugas wajib dipilih.", "error");
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, no_rawat: pasien.no_rawat, tanggal, jam, kd_dokter: dokter, nip: petugas, tindakan: [...kodeTerpilih] }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Tindakan gagal disimpan");
      tampilkanToast(json.message || "Tindakan berhasil disimpan.", "sukses");
      setKodeTerpilih(new Set());
      setVersiData((versi) => versi + 1);
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Tindakan gagal disimpan", "error");
    } finally {
      setMenyimpan(false);
    }
  };

  const resetFilter = () => {
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setKataKunci("");
    setKataKunciFilter("");
    setHalaman(1);
    setVersiData((versi) => versi + 1);
  };

  const cariRiwayat = () => {
    setKataKunciFilter(kataKunci.trim());
    setHalaman(1);
    setVersiData((versi) => versi + 1);
  };

  const cetakTindakan = () => {
    if (riwayat.length === 0) {
      tampilkanToast("Belum ada data tindakan untuk dicetak.", "info");
      return;
    }
    window.print();
  };

  const mintaPilihTindakan = () => tampilkanToast("Pilih baris tindakan yang akan diubah atau dihapus.", "info");

  const kembali = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }, [router]);

  const mintaKeluar = () => {
    if (!pasien) {
      kembali();
      return;
    }
    if (pasien.stts === "Sudah") {
      kembali();
      return;
    }
    setKonfirmasiKeluar(true);
  };

  const keluarTanpaUbahStatus = () => {
    setKonfirmasiKeluar(false);
    kembali();
  };

  const tandaiSudahDiperiksa = async () => {
    if (!pasien) return keluarTanpaUbahStatus();
    setMemperbaruiStatus(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memperbarui status pasien.");
      setKonfirmasiKeluar(false);
      kembali();
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal memperbarui status pasien.", "error");
    } finally {
      setMemperbaruiStatus(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
      <SidebarTindakanRalan noRawat={pasien?.no_rawat} onRiwayatPasien={bukaRiwayatPasien} onCopyResep={bukaCopyResep} onResumePasien={bukaResumePasien} onBelumTersedia={(label) => tampilkanToast(`${label} belum tersedia di Khanza Web.`, "info")} />
      <main
        onKeyDown={pindahFieldDenganEnter}
        className="flex min-w-0 flex-1 flex-col space-y-2.5 overflow-hidden"
      >
      <div role="tablist" aria-label="Jenis penanganan rawat jalan" className="flex shrink-0 overflow-x-auto border-b border-slate-200">
        {TAB_RAWAT.map((item) => (
          <button
            key={item.id}
            id={`tab-tindakan-${item.id}`}
            type="button"
            role="tab"
            aria-selected={tabAktif === item.id}
            aria-controls="panel-tindakan-ralan"
            tabIndex={tabAktif === item.id ? 0 : -1}
            onClick={() => gantiTab(item.id)}
            onKeyDown={(event) => {
              const index = TAB_RAWAT.findIndex((pilihan) => pilihan.id === item.id);
              let tujuan = index;
              if (event.key === "ArrowRight") tujuan = (index + 1) % TAB_RAWAT.length;
              else if (event.key === "ArrowLeft") tujuan = (index - 1 + TAB_RAWAT.length) % TAB_RAWAT.length;
              else if (event.key === "Home") tujuan = 0;
              else if (event.key === "End") tujuan = TAB_RAWAT.length - 1;
              else return;
              event.preventDefault();
              gantiTab(TAB_RAWAT[tujuan].id);
              document.getElementById(`tab-tindakan-${TAB_RAWAT[tujuan].id}`)?.focus();
            }}
            className={`whitespace-nowrap border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabAktif === item.id ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {adalahModeTindakan(tabAktif) ? <>
      <section aria-label="Input tindakan rawat jalan" className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
        {pasien && (
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5 rounded-md border border-primary-200 bg-primary-50/50 px-2.5 py-1.5 text-[11px] text-slate-700">
            <div><span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span><span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span><span className="ml-2">{pasien.nm_poli}</span></div>
            <div className="flex items-center gap-1.5">
              <label className="flex items-center gap-1">Tanggal<input type="date" value={tanggal} onChange={(event) => { setWaktuOtomatis(false); setTanggal(event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
              <label className="flex items-center gap-1">Jam<input type="time" step="1" value={jam} onChange={(event) => { setWaktuOtomatis(false); setJam(event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
              <label className="flex items-center gap-1 whitespace-nowrap" title="Perbarui tanggal dan jam secara otomatis"><input aria-label="Waktu otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" /></label>
            </div>
          </div>
        )}
        <GridFormulirModul tampilkanKolomCadangan={false} className="items-start gap-y-2 lg:gap-x-2">
          <div className="space-y-1.5 rounded-md border border-slate-200/80 bg-slate-50/60 p-2">
            {!pasien && <label className="block text-xs text-slate-700">
              <span className="mb-1 block">No. Rawat / RM / Pasien</span>
              <input
                value={cariPasien}
                onChange={(event) => {
                  const nilai = event.target.value;
                  setCariPasien(nilai);
                  setPasien(null);
                  setTarif([]);
                  setKodeTerpilih(new Set());
                  if (nilai.trim().length < 2) setHasilPasien([]);
                }}
                placeholder="Cari data di sini"
                className="h-7 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            </label>}
            {!pasien && (memuatPasien || hasilPasien.length > 0) && (
              <div className="max-h-40 overflow-auto rounded-md border border-slate-200 bg-white">
                {memuatPasien ? <p className="p-2 text-xs text-slate-500">Mencari kunjungan...</p> : hasilPasien.map((item) => (
                  <button key={item.no_rawat} type="button" onClick={() => pilihPasien(item)} className="block w-full border-b border-slate-100 px-2.5 py-2 text-left text-xs hover:bg-slate-50">
                    <span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span>
                    <span className="block text-slate-700">{item.nm_pasien} · {item.nm_poli}</span>
                  </button>
                ))}
              </div>
            )}
            {!pasien && <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-700">Tanggal
                <input type="date" value={tanggal} onChange={(event) => { setWaktuOtomatis(false); setTanggal(event.target.value); }} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-white px-2 text-xs focus:border-primary-600 focus:outline-none" />
              </label>
              <label className="text-xs text-slate-700">Jam
                <input type="time" step="1" value={jam} onChange={(event) => { setWaktuOtomatis(false); setJam(event.target.value); }} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-white px-2 text-xs focus:border-primary-600 focus:outline-none" />
                <label className="mt-1 flex items-center gap-1 text-[11px] text-slate-600" title="Perbarui tanggal dan jam secara otomatis"><input aria-label="Waktu otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" /></label>
              </label>
            </div>}
            {mode !== "petugas" && <div className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
              <span className="whitespace-nowrap text-right font-medium">Dokter :</span>
              <PatientMasterSelect jenis="Dokter pelaksana tindakan" label="Dokter pelaksana" value={dokter} items={pilihanDokter.map((item) => ({ id: item.kode, label: item.nama }))} onChange={(kode) => setDokter(kode)} />
            </div>}
            {mode !== "dokter" && <div className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
              <span className="whitespace-nowrap text-right font-medium">Petugas :</span>
              <PatientMasterSelect jenis="Petugas pelaksana tindakan" label="Petugas pelaksana" value={petugas} items={daftarPetugas.map((item) => ({ id: item.kode, label: item.nama }))} onChange={(kode) => setPetugas(kode)} />
            </div>}
          </div>

          <div className="space-y-1.5 rounded-md border border-slate-200/80 bg-slate-50/60 p-2 lg:col-span-2">
            <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700"><span className="whitespace-nowrap text-right font-medium">Cari tindakan :</span>
              <input value={cariTarif} onChange={(event) => setCariTarif(event.target.value)} disabled={!pasien} placeholder="Cari data di sini" className="h-7 w-full rounded-md border border-slate-300 bg-white px-2.5 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none disabled:bg-slate-100" />
            </label>
            <div className="max-h-60 overflow-auto rounded-md border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left text-[11px]">
                <caption className="sr-only">Daftar tarif tindakan yang dapat dipilih</caption>
                <thead className="sticky top-0 bg-slate-100 text-slate-700">
                  <tr><th scope="col" className="w-9 px-2 py-1.5">P</th><th scope="col" className="px-2 py-1.5">Tindakan</th><th scope="col" className="min-w-36 px-2 py-1.5">Kategori Perawatan</th><th scope="col" className="w-40 px-2 py-1.5 text-left">Tarif</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {!pasien ? <tr><td colSpan={4} className="p-6 text-center text-slate-400">Pilih kunjungan untuk memuat tarif.</td></tr>
                    : memuatTarif ? <tr><td colSpan={4} className="p-6 text-center text-slate-500">Memuat tarif...</td></tr>
                      : tarif.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-slate-400">Tarif tindakan tidak ditemukan.</td></tr>
                        : tarif.map((item) => <tr key={item.kd_jenis_prw} onClick={() => ubahPilihanTindakan(item.kd_jenis_prw)} className={`cursor-pointer text-slate-700 hover:bg-slate-50 ${kodeTerpilih.has(item.kd_jenis_prw) ? "bg-primary-50/90" : ""}`}>
                          <td className="px-2 py-1.5"><input type="checkbox" checked={kodeTerpilih.has(item.kd_jenis_prw)} onClick={(event) => event.stopPropagation()} onChange={() => ubahPilihanTindakan(item.kd_jenis_prw)} aria-label={`Pilih ${item.nm_perawatan}`} /></td>
                          <td className="px-2 py-1.5">{item.nm_perawatan}</td>
                          <td className="px-2 py-1.5 text-slate-600">{item.nm_kategori || "-"}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 text-left font-mono">{rupiah(item.total)}</td>
                        </tr>)}
                </tbody>
                <tfoot><tr className="border-t border-slate-200 bg-slate-50"><th scope="row" colSpan={3} className="px-2 py-1.5 text-slate-700">{kodeTerpilih.size} dipilih</th><td className="px-2 py-1.5 text-left font-mono font-semibold">{rupiah(totalDipilih)}</td></tr></tfoot>
              </table>
            </div>
          </div>
        </GridFormulirModul>
      </section>

      <section id="panel-tindakan-ralan" role="tabpanel" aria-labelledby={`tab-tindakan-${tabAktif}`} tabIndex={0} className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-xs">
          <caption className="sr-only">Tindakan rawat jalan yang sudah dilakukan</caption>
          <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className="whitespace-nowrap px-2.5 py-2">No. Rawat</th><th scope="col" className="px-2.5 py-2">Pasien</th>
              <th scope="col" className="min-w-56 px-2.5 py-2">Perawatan / Tindakan</th><th scope="col" className="min-w-40 px-2.5 py-2">Pelaksana</th>
              <th scope="col" className="whitespace-nowrap px-2.5 py-2">Tgl. &amp; Jam</th><th scope="col" className="whitespace-nowrap px-2.5 py-2 text-right">Biaya</th><th scope="col" className="px-2.5 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
            {memuatRiwayat ? <tr><td colSpan={7} className="py-10 text-center text-slate-500">Memuat tindakan...</td></tr>
              : riwayat.length === 0 ? <tr><td colSpan={7} className="py-10 text-center text-slate-400"><FontAwesomeIcon icon={faStethoscope} className="mb-2 h-7 w-7 text-slate-300" /><p>Belum ada tindakan pada periode ini.</p></td></tr>
                : riwayat.map((item) => <tr key={`${item.no_rawat}-${item.kd_jenis_prw}-${item.tgl_perawatan}-${item.jam_rawat}-${item.kd_dokter || ""}-${item.nip || ""}`} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-2.5 py-2 font-mono">{item.no_rawat}</td>
                  <td className="px-2.5 py-2"><span className="font-mono text-slate-600">{item.no_rkm_medis}</span><span className="block text-slate-800">{item.nm_pasien}</span></td>
                  <td className="px-2.5 py-2"><span className="font-mono text-slate-600">{item.kd_jenis_prw}</span> · {item.nm_perawatan}</td>
                  <td className="px-2.5 py-2">{[item.nm_dokter, item.nm_petugas].filter(Boolean).join(" · ") || "-"}</td>
                  <td className="whitespace-nowrap px-2.5 py-2 font-mono">{item.tgl_perawatan} {item.jam_rawat}</td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-right font-mono">{rupiah(item.biaya_rawat)}</td>
                  <td className="px-2.5 py-2 text-center"><span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px]">{item.stts_bayar || "Belum"}</span></td>
                </tr>)}
          </tbody>
        </table>
      </section>

      </> : tabAktif === "pemeriksaan" && pasien ? (
        <PemeriksaanRalanTab
          ref={aksiPanelPemeriksaan}
          key={pasien.no_rawat}
          pasien={{
            no_rawat: pasien.no_rawat,
            no_rkm_medis: pasien.no_rkm_medis,
            nm_pasien: pasien.nm_pasien,
            nm_poli: pasien.nm_poli,
            kd_dokter: pasien.kd_dokter,
            nm_dokter: pasien.nm_dokter,
          }}
          onStatusPanelChange={setStatusPanelPemeriksaan}
        />
      ) : (tabAktif === "obstetri" || tabAktif === "ginekologi") && pasien ? (
        <PemeriksaanObgynTab
          ref={aksiPanelPemeriksaan}
          key={`${tabAktif}-${pasien.no_rawat}`}
          jenis={tabAktif}
          pasien={{
            no_rawat: pasien.no_rawat,
            no_rkm_medis: pasien.no_rkm_medis,
            nm_pasien: pasien.nm_pasien,
            nm_poli: pasien.nm_poli,
          }}
          onStatusPanelChange={setStatusPanelPemeriksaan}
        />
      ) : tabAktif === "diagnosa" && pasien ? (
        <DiagnosaRalanTab
          ref={aksiPanelPemeriksaan}
          key={`diagnosa-${pasien.no_rawat}`}
          pasien={{
            no_rawat: pasien.no_rawat,
            no_rkm_medis: pasien.no_rkm_medis,
            nm_pasien: pasien.nm_pasien,
            nm_poli: pasien.nm_poli,
            tgl_registrasi: pasien.tgl_registrasi,
            jam_reg: pasien.jam_reg,
          }}
          onStatusPanelChange={setStatusPanelPemeriksaan}
        />
      ) : tabAktif === "catatan" && pasien ? (
        <CatatanDokterTab
          ref={aksiPanelPemeriksaan}
          key={`catatan-${pasien.no_rawat}`}
          pasien={{
            no_rawat: pasien.no_rawat,
            no_rkm_medis: pasien.no_rkm_medis,
            nm_pasien: pasien.nm_pasien,
            nm_poli: pasien.nm_poli,
            tgl_registrasi: pasien.tgl_registrasi,
            kd_dokter: pasien.kd_dokter,
            nm_dokter: pasien.nm_dokter,
          }}
          onStatusPanelChange={setStatusPanelPemeriksaan}
        />
      ) : (
        <section id="panel-tindakan-ralan" role="tabpanel" aria-labelledby={`tab-tindakan-${tabAktif}`} tabIndex={0} className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-100/90 px-3 py-2 text-xs font-semibold text-slate-800">{TAB_RAWAT.find((item) => item.id === tabAktif)?.label}</div>
          <div className="flex flex-1 items-center justify-center p-6 text-center text-xs text-slate-500">Pilih kunjungan dari halaman Rawat Jalan terlebih dahulu.</div>
        </section>
      )}

      {adalahModeTindakan(tabAktif) ? (
        <PanelBawah tampilan="web" onSimpan={simpan} onBaru={resetForm} onGanti={mintaPilihTindakan} onHapus={mintaPilihTindakan} onCetak={cetakTindakan} onKembali={mintaKeluar} disabledSimpan={menyimpan || !pasien || kodeTerpilih.size === 0} disabledGanti disabledHapus disabledCetak={riwayat.length === 0} tanggalMulai={tanggalMulai} tanggalSelesai={tanggalSelesai} onGantiTanggalMulai={(nilai) => { setTanggalMulai(nilai); setHalaman(1); }} onGantiTanggalSelesai={(nilai) => { setTanggalSelesai(nilai); setHalaman(1); }} kataKunci={kataKunci} onGantiKataKunci={setKataKunci} onCari={cariRiwayat} placeholderCari="Cari data di sini" onSemua={resetFilter} memuat={memuatRiwayat || menyimpan} tampilkanRecord={false} pagination={<><span>{riwayat.length} dari {total} tindakan · Halaman {halaman} / {Math.max(1, Math.ceil(total / 50))}</span><button type="button" disabled={halaman <= 1 || memuatRiwayat} onClick={() => setHalaman((nilai) => nilai - 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-40" aria-label="Halaman sebelumnya"><FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" /></button><button type="button" disabled={halaman * 50 >= total || memuatRiwayat} onClick={() => setHalaman((nilai) => nilai + 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-40" aria-label="Halaman berikutnya"><FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" /></button></>} />
      ) : adalahTabKlinis(tabAktif) && pasien ? (
        <PanelBawah
          tampilan="web"
          onSimpan={() => aksiPanelPemeriksaan.current?.simpan()}
          onBaru={() => aksiPanelPemeriksaan.current?.baru()}
          onGanti={() => aksiPanelPemeriksaan.current?.ganti()}
          onHapus={() => aksiPanelPemeriksaan.current?.hapus()}
          onCetak={() => aksiPanelPemeriksaan.current?.cetak()}
          onKembali={mintaKeluar}
          disabledSimpan={statusPanelPemeriksaan.disabledSimpan}
          disabledGanti={statusPanelPemeriksaan.disabledGanti}
          disabledHapus={statusPanelPemeriksaan.disabledHapus}
          disabledCetak={statusPanelPemeriksaan.disabledCetak}
          tanggalMulai={statusPanelPemeriksaan.tanggalMulai}
          tanggalSelesai={statusPanelPemeriksaan.tanggalSelesai}
          onGantiTanggalMulai={(nilai) => aksiPanelPemeriksaan.current?.gantiTanggalMulai(nilai)}
          onGantiTanggalSelesai={(nilai) => aksiPanelPemeriksaan.current?.gantiTanggalSelesai(nilai)}
          kataKunci={statusPanelPemeriksaan.kataKunci}
          onGantiKataKunci={(nilai) => aksiPanelPemeriksaan.current?.gantiKataKunci(nilai)}
          onCari={() => aksiPanelPemeriksaan.current?.cari()}
          placeholderCari="Cari data di sini"
          onSemua={() => aksiPanelPemeriksaan.current?.semua()}
          jumlahRecord={statusPanelPemeriksaan.jumlahRecord}
          memuat={statusPanelPemeriksaan.memuat}
        />
      ) : (
        <PanelBawah tampilan="web" onKembali={mintaKeluar} tampilkanRecord={false} />
      )}
      </main>
      </div>
      <RiwayatPasienDialog
        key={`riwayat-${riwayatPasienTerbuka ? "buka" : "tutup"}-${pasien?.no_rkm_medis || "-"}-${pasien?.no_rawat || "-"}`}
        terbuka={riwayatPasienTerbuka}
        noRm={pasien?.no_rkm_medis || ""}
        namaPasien={pasien?.nm_pasien || ""}
        noRawat={pasien?.no_rawat}
        onTutup={() => setRiwayatPasienTerbuka(false)}
        onToast={tampilkanToast}
      />
      <CopyResepDialog
        key={`copy-resep-${copyResepTerbuka ? "buka" : "tutup"}-${pasien?.no_rkm_medis || "-"}`}
        terbuka={copyResepTerbuka}
        noRawat={pasien?.no_rawat || ""}
        noRm={pasien?.no_rkm_medis || ""}
        namaPasien={pasien?.nm_pasien || ""}
        status="ralan"
        onTutup={() => setCopyResepTerbuka(false)}
        onToast={tampilkanToast}
      />
      <KonfirmasiDialog terbuka={konfirmasiKeluar} judul="Selesaikan Pemeriksaan" pesan={`Tandai ${pasien?.nm_pasien || "pasien"} sudah diperiksa?`} subPesan="Status kunjungan akan diperbarui menjadi Sudah dan berkas menjadi Sudah Kembali." teksBatal="Tidak, Kembali" teksKonfirmasi="Ya, Tandai Sudah" bahaya={false} sedangMemproses={memperbaruiStatus} onBatal={keluarTanpaUbahStatus} onKonfirmasi={() => void tandaiSudahDiperiksa()} />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { Toast } from "@/components/common/Toast";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { PemeriksaanRalanTab } from "@/components/tindakan-rawat-jalan/PemeriksaanRalanTab";
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

const rupiah = (nilai: number | string) => `Rp ${Number(nilai || 0).toLocaleString("id-ID")}`;

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).format(new Date());
}

function Field({ label, placeholder = "" }: { label: string; placeholder?: string }) {
  return <label className="block text-xs text-slate-700"><span className="mb-1 block">{label}</span><input placeholder={placeholder} className="h-8 w-full rounded-lg border border-slate-300 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" /></label>;
}

function Pilihan({ label, pilihan }: { label: string; pilihan: string[] }) {
  return <label className="block text-xs text-slate-700"><span className="mb-1 block">{label}</span><CustomSelect className="h-8 py-1"><option value="">-</option>{pilihan.map((item) => <option key={item}>{item}</option>)}</CustomSelect></label>;
}

function CatatanPanjang({ label }: { label: string }) {
  return <label className="block text-xs text-slate-700"><span className="mb-1 block">{label}</span><textarea rows={2} className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" /></label>;
}

export default function HalamanTindakanRawatJalan() {
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();
  const [mode, setMode] = useState<ModeTindakan>("dokter");
  const [tabAktif, setTabAktif] = useState<TabRawatJalan>("pemeriksaan");
  const [tanggal, setTanggal] = useState(hariIni);
  const [jam, setJam] = useState(jamJayapura);
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
  const permintaanRiwayat = useRef<AbortController | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe });
  }, []);

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

  const pilihPasien = (item: RegistrasiPilihan) => {
    setPasien(item);
    setCariPasien(`${item.no_rawat} · ${item.nm_pasien}`);
    setHasilPasien([]);
    setDokter(mode !== "petugas" ? item.kd_dokter : "");
    setKodeTerpilih(new Set());
  };

  const gantiTab = (berikutnya: TabRawatJalan) => {
    setTabAktif(berikutnya);
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

  const cetakTindakan = () => {
    if (riwayat.length === 0) {
      tampilkanToast("Belum ada data tindakan untuk dicetak.", "info");
      return;
    }
    window.print();
  };

  const mintaPilihTindakan = () => tampilkanToast("Pilih baris tindakan yang akan diubah atau dihapus.", "info");

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
      <SidebarTindakanRalan noRawat={pasien?.no_rawat} onBelumTersedia={(label) => tampilkanToast(`${label} belum tersedia di Khanza Web.`, "info")} />
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
      <PanelInputData judul="Input Tindakan Rawat Jalan" idPenyimpanan="tindakan-rawat-jalan" onSimpan={simpan} onBaru={resetForm} teksBaru="Baru" sedangMenyimpan={menyimpan}>
        <GridFormulirModul className="items-start">
          <div className="space-y-2">
            <label className="block text-xs text-slate-700">
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
                placeholder="Ketik minimal 2 karakter..."
                className="h-8 w-full rounded-lg border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            </label>
            {!pasien && (memuatPasien || hasilPasien.length > 0) && (
              <div className="max-h-40 overflow-auto rounded-lg border border-slate-200 bg-white">
                {memuatPasien ? <p className="p-2 text-xs text-slate-500">Mencari kunjungan...</p> : hasilPasien.map((item) => (
                  <button key={item.no_rawat} type="button" onClick={() => pilihPasien(item)} className="block w-full border-b border-slate-100 px-2.5 py-2 text-left text-xs hover:bg-slate-50">
                    <span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span>
                    <span className="block text-slate-700">{item.nm_pasien} · {item.nm_poli}</span>
                  </button>
                ))}
              </div>
            )}
            {pasien && (
              <div className="rounded-lg border border-primary-200 bg-primary-50/50 p-2 text-xs text-slate-700">
                <p className="font-semibold text-slate-800">{pasien.nm_pasien} <span className="font-normal">({pasien.jk}, {pasien.umurdaftar} {pasien.sttsumur})</span></p>
                <p>{pasien.no_rkm_medis} · {pasien.nm_poli} · {pasien.png_jawab}</p>
                <p>{pasien.tgl_registrasi} {pasien.jam_reg} · {pasien.status_bayar}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-700">Tanggal
                <input type="date" value={tanggal} onChange={(event) => setTanggal(event.target.value)} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
              </label>
              <label className="text-xs text-slate-700">Jam
                <input type="time" step="1" value={jam} onChange={(event) => setJam(event.target.value)} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
              </label>
            </div>
            {mode !== "petugas" && <label className="block text-xs text-slate-700">Dokter
              <CustomSelect value={dokter} onChange={(event) => setDokter(event.target.value)} className="mt-1 h-8 py-1">
                <option value="">Pilih dokter</option>
                {pasien && !daftarDokter.some((item) => item.kode === pasien.kd_dokter) && <option value={pasien.kd_dokter}>{pasien.nm_dokter}</option>}
                {daftarDokter.map((item) => <option key={item.kode} value={item.kode}>{item.nama}</option>)}
              </CustomSelect>
            </label>}
            {mode !== "dokter" && <label className="block text-xs text-slate-700">Petugas
              <CustomSelect value={petugas} onChange={(event) => setPetugas(event.target.value)} className="mt-1 h-8 py-1">
                <option value="">Pilih petugas</option>
                {daftarPetugas.map((item) => <option key={item.kode} value={item.kode}>{item.nama}</option>)}
              </CustomSelect>
            </label>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-slate-700">Cari Tindakan / Tagihan
              <input value={cariTarif} onChange={(event) => setCariTarif(event.target.value)} disabled={!pasien} placeholder="Kode, nama, atau kategori tindakan..." className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2.5 text-xs focus:border-primary-600 focus:outline-none disabled:bg-slate-100" />
            </label>
            <div className="max-h-64 overflow-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-[11px]">
                <caption className="sr-only">Daftar tarif tindakan yang dapat dipilih</caption>
                <thead className="sticky top-0 bg-slate-100 text-slate-700">
                  <tr><th scope="col" className="w-9 px-2 py-1.5">P</th><th scope="col" className="px-2 py-1.5">Tindakan</th><th scope="col" className="w-24 px-2 py-1.5 text-right">Tarif</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {!pasien ? <tr><td colSpan={3} className="p-6 text-center text-slate-400">Pilih kunjungan untuk memuat tarif.</td></tr>
                    : memuatTarif ? <tr><td colSpan={3} className="p-6 text-center text-slate-500">Memuat tarif...</td></tr>
                      : tarif.length === 0 ? <tr><td colSpan={3} className="p-6 text-center text-slate-400">Tarif tindakan tidak ditemukan.</td></tr>
                        : tarif.map((item) => <tr key={item.kd_jenis_prw} className="text-slate-700 hover:bg-slate-50">
                          <td className="px-2 py-1.5"><input type="checkbox" checked={kodeTerpilih.has(item.kd_jenis_prw)} onChange={() => setKodeTerpilih((lama) => { const baru = new Set(lama); if (baru.has(item.kd_jenis_prw)) baru.delete(item.kd_jenis_prw); else baru.add(item.kd_jenis_prw); return baru; })} aria-label={`Pilih ${item.nm_perawatan}`} /></td>
                          <td className="px-2 py-1.5"><span className="font-mono text-slate-600">{item.kd_jenis_prw}</span> · {item.nm_perawatan}<span className="block text-[10px] text-slate-500">{item.nm_kategori}</span></td>
                          <td className="whitespace-nowrap px-2 py-1.5 text-right font-mono">{rupiah(item.total)}</td>
                        </tr>)}
                </tbody>
                <tfoot><tr className="border-t border-slate-200 bg-slate-50"><th scope="row" colSpan={2} className="px-2 py-1.5 text-slate-700">{kodeTerpilih.size} dipilih</th><td className="px-2 py-1.5 text-right font-mono font-semibold">{rupiah(totalDipilih)}</td></tr></tfoot>
              </table>
            </div>
          </div>
        </GridFormulirModul>
      </PanelInputData>

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
        <PemeriksaanRalanTab pasien={pasien} />
      ) : (
        <section id="panel-tindakan-ralan" role="tabpanel" aria-labelledby={`tab-tindakan-${tabAktif}`} tabIndex={0} className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-100/90 px-3 py-2 text-xs font-semibold text-slate-800">{TAB_RAWAT.find((item) => item.id === tabAktif)?.label}</div>
          {!pasien ? <div className="flex flex-1 items-center justify-center p-6 text-center text-xs text-slate-500">Pilih kunjungan dari halaman Rawat Jalan terlebih dahulu.</div> : (
            <div className="min-h-0 flex-1 overflow-auto p-3">
              <div className="mb-3 rounded-lg border border-primary-200 bg-primary-50/50 px-3 py-2 text-xs text-slate-700"><span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span><span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span><span className="ml-2">{pasien.nm_poli}</span></div>
              {tabAktif === "obstetri" && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Tinggi Fundus" /><Pilihan label="Janin" pilihan={["Tunggal", "Gemelli", "-"]} /><Field label="Letak" /><Pilihan label="Panggul" pilihan={["-", "5/5", "4/5", "3/5", "2/5", "1/5"]} /><Field label="Denyut" /><Pilihan label="Kontraksi" pilihan={["+", "-"]} /><Field label="Kualitas Menit" /><Field label="Kualitas Detik" /><Pilihan label="Fluksus" pilihan={["+", "-"]} /><Pilihan label="Albus" pilihan={["+", "-"]} /><Field label="Vulva" /><Field label="Portio" /><Pilihan label="Dalam" pilihan={["Kenyal", "Lunak"]} /><Field label="Tebal" /><Pilihan label="Arah" pilihan={["depan", "axial", "belakang"]} /><Field label="Pembukaan" /><Field label="Penurunan" /><Field label="Denominator" /><Pilihan label="Ketuban" pilihan={["-", "+"]} /><Pilihan label="Feto" pilihan={["Normal", "Susp.CPD-FPD", "CPD-FPD"]} />
              </div>}
              {tabAktif === "ginekologi" && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Inspeksi" /><Field label="Inspeksi Vulva/Uretra/Vagina" /><Field label="Inspekulo" /><Pilihan label="Fluxus" pilihan={["+", "-"]} /><Pilihan label="Fluor Albus" pilihan={["+", "-"]} /><Field label="Inspekulo Vulva/Vagina" /><Field label="Inspekulo Portio" /><Field label="Inspekulo Sondage" /><Field label="Dalam Portio" /><Field label="Dalam Bentuk" /><Field label="Dalam Cavum Uteri" /><Pilihan label="Mobilitas" pilihan={["+", "-"]} /><Field label="Ukuran Cavum Uteri" /><Pilihan label="Nyeri Tekan" pilihan={["+", "-"]} /><Field label="Dalam Adnexa Kanan" /><Field label="Dalam Adnexa Kiri" /><Field label="Dalam Cavum Douglas" />
              </div>}
              {tabAktif === "diagnosa" && <div className="space-y-3"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><Field label="Kode Penyakit (ICD-10)" /><Field label="Nama Diagnosa" /><Pilihan label="Status Penyakit" pilihan={["Baru", "Lama"]} /><Field label="Prioritas" placeholder="1" /></div><div className="rounded-lg border border-slate-200"><table className="w-full text-left text-xs"><caption className="sr-only">Daftar diagnosa pasien</caption><thead className="bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2 py-2">Kode</th><th scope="col" className="px-2 py-2">Diagnosa</th><th scope="col" className="px-2 py-2">Status</th><th scope="col" className="px-2 py-2">Prioritas</th></tr></thead><tbody><tr><td colSpan={4} className="px-2 py-8 text-center text-slate-400">Belum ada diagnosa yang ditampilkan.</td></tr></tbody></table></div><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><Field label="Kode Prosedur (ICD-9-CM)" /><Field label="Nama Tindakan/Prosedur" /><Pilihan label="Status Prosedur" pilihan={["Baru", "Lama"]} /><Field label="Prioritas Prosedur" placeholder="1" /></div></div>}
              {tabAktif === "catatan" && <div className="max-w-3xl space-y-3"><div className="grid gap-2 sm:grid-cols-2"><Pilihan label="Dokter" pilihan={daftarDokter.map((item) => item.nama)} /><Field label="Tanggal & Jam" placeholder={`${tanggal} ${jam}`} /></div><CatatanPanjang label="Catatan Dokter" /><div className="rounded-lg border border-slate-200"><table className="w-full text-left text-xs"><caption className="sr-only">Daftar catatan dokter</caption><thead className="bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2 py-2">Tanggal</th><th scope="col" className="px-2 py-2">Dokter</th><th scope="col" className="px-2 py-2">Catatan</th></tr></thead><tbody><tr><td colSpan={3} className="px-2 py-8 text-center text-slate-400">Belum ada catatan dokter yang ditampilkan.</td></tr></tbody></table></div></div>}
            </div>
          )}
        </section>
      )}

      {adalahModeTindakan(tabAktif) && <PanelBawah tampilan="web" onSimpan={simpan} onBaru={resetForm} onGanti={mintaPilihTindakan} onHapus={mintaPilihTindakan} onCetak={cetakTindakan} disabledSimpan={menyimpan || !pasien || kodeTerpilih.size === 0} disabledGanti disabledHapus disabledCetak={riwayat.length === 0} tanggalMulai={tanggalMulai} tanggalSelesai={tanggalSelesai} onGantiTanggalMulai={(nilai) => { setTanggalMulai(nilai); setHalaman(1); }} onGantiTanggalSelesai={(nilai) => { setTanggalSelesai(nilai); setHalaman(1); }} kataKunci={kataKunci} onGantiKataKunci={setKataKunci} onCari={() => { setKataKunciFilter(kataKunci.trim()); setHalaman(1); }} placeholderCari="No. Rawat, RM, pasien, tindakan, pelaksana..." onSemua={resetFilter} memuat={memuatRiwayat || menyimpan} tampilkanRecord={false} pagination={<><span>{riwayat.length} dari {total} tindakan · Halaman {halaman} / {Math.max(1, Math.ceil(total / 50))}</span><button type="button" disabled={halaman <= 1 || memuatRiwayat} onClick={() => setHalaman((nilai) => nilai - 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-40" aria-label="Halaman sebelumnya"><FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" /></button><button type="button" disabled={halaman * 50 >= total || memuatRiwayat} onClick={() => setHalaman((nilai) => nilai + 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-40" aria-label="Halaman berikutnya"><FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" /></button></>} />}
      </main>
      </div>
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import { registrationDate } from "@/lib/registrasi/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

interface DokterOption { kd_dokter: string; nm_dokter: string }
interface PoliOption { kd_poli: string; nm_poli: string }
interface PenjaminOption { kd_pj: string; png_jawab: string }

interface RawatJalanRow {
  no_reg: string;
  no_rawat: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  kd_poli: string;
  nm_poli: string;
  kd_pj: string;
  png_jawab: string | null;
  p_jawab: string;
  almt_pj: string;
  hubunganpj: string;
  biaya_reg: number | string;
  stts: string;
  status_bayar: string;
  status_poli: string;
  no_tlp: string;
}

type KategoriBilling = "Registrasi" | "Ralan Dokter" | "Ralan Paramedis" | "Ralan Dokter Paramedis"
  | "Laborat" | "Radiologi" | "Obat" | "Operasi" | "Tambahan" | "Potongan";

interface BillingItem {
  kategori: KategoriBilling;
  nama: string;
  jumlah: number;
  total: number;
}

interface BillingData {
  registrasi: {
    no_rawat: string;
    no_reg: string;
    tgl_registrasi: string;
    jam_reg: string;
    no_rkm_medis: string;
    nm_pasien: string;
    jk: string;
    umurdaftar: number | string;
    sttsumur: string;
    kd_poli: string;
    nm_poli: string;
    kd_dokter: string;
    nm_dokter: string;
    kd_pj: string;
    png_jawab: string | null;
    biaya_reg: number | string;
    stts: string;
    status_bayar: string;
  };
  items: BillingItem[];
  ringkasan: {
    registrasi: number;
    ralanDokter: number;
    ralanParamedis: number;
    ralanDokterParamedis: number;
    laborat: number;
    radiologi: number;
    obat: number;
    operasi: number;
    tambahan: number;
    potongan: number;
    total: number;
  };
  labelKategori: Record<string, string>;
}

const URUTAN_KATEGORI: KategoriBilling[] = [
  "Registrasi", "Ralan Dokter", "Ralan Paramedis", "Ralan Dokter Paramedis",
  "Laborat", "Radiologi", "Obat", "Operasi", "Tambahan", "Potongan",
];

const rupiah = (value: number | string) => `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export default function HalamanRawatJalan() {
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();

  const [tabTabel, setTabTabel] = useState<"awal" | "rujukan_internal">("awal");
  const [data, setData] = useState<RawatJalanRow[]>([]);
  const [terpilih, setTerpilih] = useState<RawatJalanRow | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);

  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [filterPj, setFilterPj] = useState("");
  const [filterPoli, setFilterPoli] = useState("");
  const [filterDokter, setFilterDokter] = useState("");
  const [statusPeriksa, setStatusPeriksa] = useState("Semua");
  const [statusBayar, setStatusBayar] = useState("Semua");
  const [halaman, setHalaman] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [versiTabel, setVersiTabel] = useState(0);
  const permintaanTabel = useRef<AbortController | null>(null);

  const [daftarDokter, setDaftarDokter] = useState<DokterOption[]>([]);
  const [daftarPoli, setDaftarPoli] = useState<PoliOption[]>([]);
  const [daftarPenjab, setDaftarPenjab] = useState<PenjaminOption[]>([]);

  const [billing, setBilling] = useState<BillingData | null>(null);
  const [memuatBilling, setMemuatBilling] = useState(false);
  const [errorBilling, setErrorBilling] = useState<string | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  useEffect(() => () => { permintaanTabel.current?.abort(); }, []);

  // Opsi filter
  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    async function muatOpsi() {
      try {
        const res = await fetch("/api/rawat-jalan/options", { signal: controller.signal });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat opsi");
        setDaftarDokter(json.data?.dokter || []);
        setDaftarPoli(json.data?.poli || []);
        setDaftarPenjab(json.data?.penjab || []);
      } catch (error) {
        if (!controller.signal.aborted) {
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat opsi rawat jalan", "error");
        }
      }
    }
    void muatOpsi();
    return () => controller.abort();
  }, [isAuthenticated, tampilkanToast]);

  // Daftar registrasi
  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    permintaanTabel.current?.abort();
    const controller = new AbortController();
    permintaanTabel.current = controller;
    setMemuat(true);
    try {
      const url = new URL("/api/rawat-jalan", window.location.origin);
      url.searchParams.set("tampilan", tabTabel);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", "100");
      if (tanggalMulai) url.searchParams.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) url.searchParams.set("tanggal_selesai", tanggalSelesai);
      if (filterPj) url.searchParams.set("kd_pj", filterPj);
      if (filterPoli) url.searchParams.set("kd_poli", filterPoli);
      if (filterDokter) url.searchParams.set("kd_dokter", filterDokter);
      if (statusPeriksa !== "Semua") url.searchParams.set("stts", statusPeriksa);
      if (statusBayar !== "Semua") url.searchParams.set("status_bayar", statusBayar);
      if (kataKunciFilter) url.searchParams.set("cari", kataKunciFilter);

      const res = await fetch(url.toString(), { signal: controller.signal, cache: "no-store" });
      const json = await res.json();
      if (controller.signal.aborted) return;
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat data rawat jalan");
      setData(json.data || []);
      setTotalData(Number(json.total) || 0);
      setHalaman(Number(json.page) || 1);
    } catch (error) {
      if (!controller.signal.aborted) {
        tampilkanToast(error instanceof Error ? error.message : "Gagal memuat data rawat jalan", "error");
      }
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [isAuthenticated, tabTabel, tanggalMulai, tanggalSelesai, filterPj, filterPoli, filterDokter, statusPeriksa, statusBayar, kataKunciFilter, halaman, tampilkanToast]);

  // Hanya kata kunci yang ditunda; filter lain langsung memuat data.
  useEffect(() => {
    const berikutnya = kataKunci.trim();
    if (berikutnya === kataKunciFilter) return;
    const timer = setTimeout(() => {
      setKataKunciFilter(berikutnya);
      setHalaman(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [kataKunci, kataKunciFilter]);

  useEffect(() => {
    // Dijadwalkan satu tick agar efek tidak memicu setState saat render; tanpa jeda buatan.
    const timer = setTimeout(() => { void muatData(); }, 0);
    return () => { clearTimeout(timer); permintaanTabel.current?.abort(); };
  }, [muatData, versiTabel]);

  // Rincian billing kunjungan terpilih; status muat diatur saat baris dipilih.
  useEffect(() => {
    if (!terpilih) return;
    const controller = new AbortController();

    async function muatBilling() {
      try {
        const res = await fetch(`/api/rawat-jalan/billing?no_rawat=${encodeURIComponent(terpilih!.no_rawat)}`, { signal: controller.signal, cache: "no-store" });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat rincian billing");
        if (!controller.signal.aborted) setBilling(json.data);
      } catch (error: unknown) {
        if (!controller.signal.aborted) {
          setErrorBilling(error instanceof Error ? error.message : "Gagal memuat rincian billing");
        }
      } finally {
        if (!controller.signal.aborted) setMemuatBilling(false);
      }
    }

    void muatBilling();
    return () => controller.abort();
  }, [terpilih]);

  const kelompokBilling = useMemo(() => {
    if (!billing) return [];
    return URUTAN_KATEGORI
      .map((kategori) => {
        const items = billing.items.filter((item) => item.kategori === kategori);
        return {
          kategori,
          label: billing.labelKategori[kategori] || kategori,
          items,
          subtotal: items.reduce((jumlah, item) => jumlah + item.total, 0),
        };
      })
      .filter((kelompok) => kelompok.items.length > 0);
  }, [billing]);

  const pilihBaris = (item: RawatJalanRow) => {
    if (memuat || terpilih?.no_rawat === item.no_rawat) return;
    setTerpilih(item);
    setBilling(null);
    setErrorBilling(null);
    setMemuatBilling(true);
  };

  const gantiTab = (tab: "awal" | "rujukan_internal") => {
    setTabTabel(tab);
    setHalaman(1);
    setTerpilih(null);
    setBilling(null);
    setErrorBilling(null);
    setMemuatBilling(false);
  };

  const resetFilter = () => {
    setKataKunci("");
    setKataKunciFilter("");
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setFilterPj("");
    setFilterPoli("");
    setFilterDokter("");
    setStatusPeriksa("Semua");
    setStatusBayar("Semua");
    setHalaman(1);
    setTerpilih(null);
    setBilling(null);
    setErrorBilling(null);
    setMemuatBilling(false);
    setVersiTabel((versi) => versi + 1);
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div role="tablist" aria-label="Jenis data rawat jalan" className="flex shrink-0 border-b border-slate-200">
        {(["awal", "rujukan_internal"] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-rawat-jalan-${tab}`}
            type="button"
            role="tab"
            aria-selected={tabTabel === tab}
            aria-controls={`panel-rawat-jalan-${tab}`}
            tabIndex={tabTabel === tab ? 0 : -1}
            onClick={() => gantiTab(tab)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === "Home" ? "awal" : event.key === "End" ? "rujukan_internal" : tab === "awal" ? "rujukan_internal" : "awal";
              gantiTab(next);
              document.getElementById(`tab-rawat-jalan-${next}`)?.focus();
            }}
            className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabTabel === tab ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {tab === "awal" ? "Registrasi Awal" : "Rujukan Internal Poli"}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto lg:flex-row lg:overflow-hidden">
        {/* Daftar registrasi */}
        <section className="flex h-[26rem] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs lg:h-auto lg:min-h-0 lg:flex-1">
          <div
            id={`panel-rawat-jalan-${tabTabel}`}
            role="tabpanel"
            aria-labelledby={`tab-rawat-jalan-${tabTabel}`}
            tabIndex={0}
            className="flex-1 overflow-auto"
          >
            <table className="w-full border-collapse text-left text-xs">
              <caption className="sr-only">
                Daftar registrasi rawat jalan. Pilih baris untuk melihat rincian billing kunjungan.
              </caption>
              <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/90 text-slate-700 shadow-2xs">
                <tr>
                  <th scope="col" className="w-16 px-2.5 py-2 text-center">No. Reg</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">No. Rawat</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">Tgl &amp; Jam</th>
                  <th scope="col" className="px-2.5 py-2">No. RM</th>
                  <th scope="col" className="min-w-[11rem] px-2.5 py-2">Pasien</th>
                  <th scope="col" className="min-w-[8rem] px-2.5 py-2">Poliklinik</th>
                  <th scope="col" className="min-w-[11rem] px-2.5 py-2">Dokter Dituju</th>
                  <th scope="col" className="min-w-[10rem] px-2.5 py-2">Penanggung Jawab</th>
                  <th scope="col" className="min-w-[8rem] px-2.5 py-2">Jenis Bayar</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2 text-right">Biaya Reg</th>
                  <th scope="col" className="px-2.5 py-2 text-center">Status</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2 text-center">Status Bayar</th>
                  <th scope="col" className="px-2.5 py-2 text-center">Stts Poli</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">No. Telp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {memuat ? (
                  <tr><td colSpan={14} className="py-10 text-center font-sans text-slate-500">Memuat data rawat jalan...</td></tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-10 text-center font-sans text-slate-400">
                      <FontAwesomeIcon icon={faReceipt} className="mb-2 h-7 w-7 text-slate-300" aria-hidden="true" />
                      <p>Tidak ada registrasi rawat jalan yang sesuai</p>
                    </td>
                  </tr>
                ) : data.map((item) => (
                  <tr
                    key={`${item.no_rawat}-${item.kd_dokter}-${item.kd_poli}`}
                    onClick={() => pilihBaris(item)}
                    className={`cursor-pointer ${terpilih?.no_rawat === item.no_rawat ? "bg-primary-50/90" : "hover:bg-slate-50/80"} text-slate-700`}
                  >
                    <td className="px-2.5 py-2 text-center font-bold">
                      <button
                        type="button"
                        aria-label={`Tampilkan billing registrasi ${item.no_rawat} untuk ${item.nm_pasien}`}
                        aria-pressed={terpilih?.no_rawat === item.no_rawat}
                        onClick={(event) => { event.stopPropagation(); pilihBaris(item); }}
                        className="rounded px-1 py-0.5 font-normal hover:underline"
                      >
                        {item.no_reg}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2 font-medium text-slate-800">{item.no_rawat}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-slate-600">
                      {item.tgl_registrasi} <span className="text-slate-400">{item.jam_reg}</span>
                    </td>
                    <td className="px-2.5 py-2 font-bold text-slate-800">{item.no_rkm_medis}</td>
                    <td className="px-2.5 py-2 font-sans font-medium text-slate-800">
                      {item.nm_pasien} <span className="font-mono text-[10px] font-normal text-slate-500">({item.umurdaftar} {item.sttsumur})</span>
                    </td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.nm_poli}</td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.nm_dokter}</td>
                    <td className="px-2.5 py-2 font-sans text-[10px] text-slate-600" title={item.almt_pj || undefined}>
                      {item.p_jawab || "-"} <span className="text-slate-400">({item.hubunganpj || "-"})</span>
                      {item.almt_pj && <span className="block truncate text-[9px] text-slate-400">{item.almt_pj}</span>}
                    </td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.png_jawab || item.kd_pj || "-"}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-right text-slate-700">{rupiah(item.biaya_reg)}</td>
                    <td className="px-2.5 py-2 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.stts === "Batal" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                        {item.stts || "-"}
                      </span>
                    </td>
                    <td className="px-2.5 py-2 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.status_bayar === "Sudah Bayar" ? "border border-secondary-200 bg-secondary-50 text-secondary-700" : "border border-slate-200 bg-slate-100 text-slate-600"}`}>
                        {item.status_bayar || "Belum Bayar"}
                      </span>
                    </td>
                    <td className="px-2.5 py-2 text-center font-sans text-[10px] text-slate-600">{item.status_poli || "-"}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 font-sans text-[10px] text-slate-600">{item.no_tlp || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rincian billing */}
        <aside className="flex max-h-[26rem] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs lg:max-h-none lg:w-[23rem] lg:shrink-0 xl:w-[27rem]">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-100/90 px-3 py-2">
            <FontAwesomeIcon icon={faReceipt} className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
            <h2 className="text-xs font-semibold text-slate-800">Rincian Billing</h2>
            {terpilih && <span className="ml-auto font-mono text-[10px] text-slate-600">{terpilih.no_rawat}</span>}
          </div>

          <div className="flex-1 overflow-auto p-3 text-xs">
            {!terpilih ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center text-slate-400">
                <FontAwesomeIcon icon={faReceipt} className="mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
                <p>Pilih salah satu registrasi untuk menampilkan rincian biaya.</p>
              </div>
            ) : memuatBilling ? (
              <p className="py-8 text-center text-slate-500">Memuat rincian billing...</p>
            ) : errorBilling ? (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-700">
                <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errorBilling}</span>
              </div>
            ) : billing ? (
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <p className="font-sans text-sm font-semibold text-slate-800">{billing.registrasi.nm_pasien}</p>
                  <p className="font-mono text-[10px] text-slate-600">
                    {billing.registrasi.no_rkm_medis} · {billing.registrasi.jk} · {billing.registrasi.umurdaftar} {billing.registrasi.sttsumur}
                  </p>
                  <p className="font-sans text-[11px] text-slate-600">
                    {billing.registrasi.nm_poli} · {billing.registrasi.nm_dokter}
                  </p>
                  <p className="font-sans text-[11px] text-slate-600">
                    {billing.registrasi.png_jawab || billing.registrasi.kd_pj || "-"} · {billing.registrasi.status_bayar}
                  </p>
                </div>

                {kelompokBilling.length === 0 ? (
                  <p className="py-6 text-center text-slate-400">Belum ada rincian biaya pada kunjungan ini.</p>
                ) : (
                  <table className="w-full border-collapse text-left text-[11px]">
                    <caption className="sr-only">Rincian biaya kunjungan {billing.registrasi.no_rawat}</caption>
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-600">
                        <th scope="col" className="py-1.5 pr-2 font-semibold">Uraian</th>
                        <th scope="col" className="w-10 py-1.5 text-right font-semibold">Qty</th>
                        <th scope="col" className="w-24 py-1.5 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kelompokBilling.map((kelompok) => (
                        <React.Fragment key={kelompok.kategori}>
                          <tr className="bg-slate-100/90">
                            <th scope="colgroup" colSpan={2} className="px-1.5 py-1 text-left font-semibold text-slate-700">{kelompok.label}</th>
                            <th scope="col" className="px-1.5 py-1 text-right font-semibold text-slate-700">{rupiah(kelompok.subtotal)}</th>
                          </tr>
                          {kelompok.items.map((item, index) => (
                            <tr key={`${kelompok.kategori}-${item.nama}-${index}`} className="border-b border-slate-100 align-top">
                              <td className="py-1 pr-2 font-sans text-slate-700">{item.nama}</td>
                              <td className="py-1 text-right font-mono text-slate-600">{item.jumlah || "-"}</td>
                              <td className="py-1 text-right font-mono text-slate-800">{rupiah(item.total)}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-slate-300 bg-primary-50/60">
                        <th scope="row" colSpan={2} className="px-1.5 py-2 text-left text-xs font-bold text-slate-800">Total Tagihan</th>
                        <td className="px-1.5 py-2 text-right font-mono text-sm font-bold text-slate-900">{rupiah(billing.ringkasan.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <PanelBawah
        tampilan="web"
        filterUtama={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <label className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Penjamin :</span>
              <CustomSelect aria-label="Filter penjamin" value={filterPj} onChange={(event) => { setFilterPj(event.target.value); setHalaman(1); }} className="h-7 w-40 rounded-md py-0.5 font-normal">
                <option value="">Semua Penjamin</option>
                {daftarPenjab.map((item) => <option key={item.kd_pj} value={item.kd_pj}>{item.png_jawab}</option>)}
              </CustomSelect>
            </label>
            <label className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Poliklinik :</span>
              <CustomSelect aria-label="Filter poliklinik" value={filterPoli} onChange={(event) => { setFilterPoli(event.target.value); setHalaman(1); }} className="h-7 w-40 rounded-md py-0.5 font-normal">
                <option value="">Semua Poli</option>
                {daftarPoli.map((item) => <option key={item.kd_poli} value={item.kd_poli}>{item.nm_poli}</option>)}
              </CustomSelect>
            </label>
            <label className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Dokter :</span>
              <CustomSelect aria-label="Filter dokter" value={filterDokter} onChange={(event) => { setFilterDokter(event.target.value); setHalaman(1); }} className="h-7 w-48 rounded-md py-0.5 font-normal">
                <option value="">Semua Dokter</option>
                {daftarDokter.map((item) => <option key={item.kd_dokter} value={item.kd_dokter}>{item.nm_dokter}</option>)}
              </CustomSelect>
            </label>
            <label className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Status :</span>
              <CustomSelect aria-label="Filter status periksa" value={statusPeriksa} onChange={(event) => { setStatusPeriksa(event.target.value); setHalaman(1); }} className="h-7 w-32 rounded-md py-0.5 font-normal">
                <option value="Semua">Semua</option>
                {["Belum", "Sudah", "Batal", "Berkas Diterima", "Dirujuk", "Meninggal", "Dirawat", "Pulang Paksa"].map((status) => <option key={status} value={status}>{status}</option>)}
              </CustomSelect>
            </label>
            <label className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Status bayar :</span>
              <CustomSelect aria-label="Filter status bayar" value={statusBayar} onChange={(event) => { setStatusBayar(event.target.value); setHalaman(1); }} className="h-7 w-32 rounded-md py-0.5 font-normal">
                <option value="Semua">Semua</option>
                <option value="Sudah Bayar">Sudah Bayar</option>
                <option value="Belum Bayar">Belum Bayar</option>
              </CustomSelect>
            </label>
          </div>
        }
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={(value) => { setTanggalMulai(value); setHalaman(1); }}
        onGantiTanggalSelesai={(value) => { setTanggalSelesai(value); setHalaman(1); }}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={() => { setKataKunciFilter(kataKunci.trim()); setHalaman(1); setVersiTabel((versi) => versi + 1); }}
        placeholderCari="Cari No. Rawat, RM, pasien, dokter, poli..."
        onSemua={resetFilter}
        pagination={
          <>
            <span>{data.length} dari {totalData} registrasi · Halaman {halaman} / {Math.max(1, Math.ceil(totalData / 100))}</span>
            <button type="button" disabled={memuat || halaman <= 1} onClick={() => setHalaman((page) => page - 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman sebelumnya" title="Halaman sebelumnya">
              <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" aria-hidden="true" />
            </button>
            <button type="button" disabled={memuat || halaman * 100 >= totalData} onClick={() => setHalaman((page) => page + 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman berikutnya" title="Halaman berikutnya">
              <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" aria-hidden="true" />
            </button>
          </>
        }
        tampilkanRecord={false}
        memuat={memuat}
      />

      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

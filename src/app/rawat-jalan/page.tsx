"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { MenuKonteksRawatJalan } from "@/components/modul/MenuKonteksRawatJalan";
import { DialogAksiKonteks, jalankanAksiKonteksApi, type JenisAksiDialogKonteks } from "@/components/modul/DialogAksiKonteks";
import { tentukanAksiMenu, type AksiMenuKonteks, type ItemMenuKonteks, type KunciSortRawatJalan } from "@/components/modul/menu-konteks-rawat-jalan-data";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { registrationDate } from "@/lib/registrasi/date";
import { bukaTabCetakUrl } from "@/lib/cetak/jasper-web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
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

function warnaStatusPeriksa(status: string) {
  if (status === "Sudah") return "border border-secondary-300 bg-secondary-100 text-secondary-800";
  if (["Batal", "Meninggal", "Pulang Paksa"].includes(status)) return "border border-red-200 bg-red-50 text-red-700";
  if (["Berkas Diterima", "Dirujuk", "Dirawat"].includes(status)) return "border border-primary-200 bg-primary-50 text-primary-700";
  return "border border-slate-200 bg-slate-100 text-slate-700";
}

interface UrutanTabel {
  kunci: KunciSortRawatJalan;
  arah: "asc" | "desc";
}

const kunciBaris = (item: RawatJalanRow) => `${item.no_rawat}-${item.kd_dokter}-${item.kd_poli}`;

function nilaiSort(item: RawatJalanRow, kunci: KunciSortRawatJalan) {
  switch (kunci) {
    case "tanggal": return `${item.tgl_registrasi} ${item.jam_reg}`;
    case "dokter": return item.nm_dokter;
    case "poli": return item.nm_poli;
    case "penjab": return item.png_jawab || item.kd_pj;
    case "status": return item.stts;
    case "no_reg": return item.no_reg;
    case "no_rm": return item.no_rkm_medis;
    default: return item.no_rawat;
  }
}

export default function HalamanRawatJalan() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();

  const [tabTabel, setTabTabel] = useState<"awal" | "rujukan_internal">("awal");
  const [data, setData] = useState<RawatJalanRow[]>([]);
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
  const [filterSep, setFilterSep] = useState<"Semua" | "Belum" | "Sudah">("Semua");
  const [belumDiagnosa, setBelumDiagnosa] = useState(false);
  const [aksiDialog, setAksiDialog] = useState<JenisAksiDialogKonteks | null>(null);
  const [halaman, setHalaman] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [versiTabel, setVersiTabel] = useState(0);
  const [menuKonteks, setMenuKonteks] = useState<{ x: number; y: number; baris: RawatJalanRow } | null>(null);
  const [barisTerpilih, setBarisTerpilih] = useState("");
  const [urutanTabel, setUrutanTabel] = useState<UrutanTabel | null>(null);
  const permintaanTabel = useRef<AbortController | null>(null);

  const [daftarDokter, setDaftarDokter] = useState<DokterOption[]>([]);
  const [daftarPoli, setDaftarPoli] = useState<PoliOption[]>([]);
  const [daftarPenjab, setDaftarPenjab] = useState<PenjaminOption[]>([]);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const dataTampil = useMemo(() => {
    if (!urutanTabel) return data;
    return [...data].sort((a, b) => {
      const hasil = nilaiSort(a, urutanTabel.kunci).localeCompare(nilaiSort(b, urutanTabel.kunci), "id", { numeric: true, sensitivity: "base" });
      return urutanTabel.arah === "asc" ? hasil : -hasil;
    });
  }, [data, urutanTabel]);

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
      if (filterSep !== "Semua") url.searchParams.set("sep", filterSep);
      if (belumDiagnosa) url.searchParams.set("belum_diagnosa", "1");
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
  }, [isAuthenticated, tabTabel, tanggalMulai, tanggalSelesai, filterPj, filterPoli, filterDokter, statusPeriksa, statusBayar, filterSep, belumDiagnosa, kataKunciFilter, halaman, tampilkanToast]);

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

  const gantiTab = (tab: "awal" | "rujukan_internal") => {
    setTabTabel(tab);
    setHalaman(1);
    setBarisTerpilih("");
  };

  const handlePilihData = (item: RawatJalanRow) => {
    if (barisTerpilih === kunciBaris(item)) {
      setBarisTerpilih("");
      return;
    }
    setBarisTerpilih(kunciBaris(item));
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
    setFilterSep("Semua");
    setBelumDiagnosa(false);
    setHalaman(1);
    setBarisTerpilih("");
    setVersiTabel((versi) => versi + 1);
  };

  const bukaMenuKonteks = useCallback((event: ReactMouseEvent<HTMLTableRowElement>, item: RawatJalanRow) => {
    event.preventDefault();
    setBarisTerpilih(kunciBaris(item));
    setMenuKonteks({ x: event.clientX, y: event.clientY, baris: item });
  }, []);

  const bukaMenuKonteksDariKeyboard = useCallback((event: ReactKeyboardEvent<HTMLTableRowElement>, item: RawatJalanRow) => {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    const batas = event.currentTarget.getBoundingClientRect();
    setBarisTerpilih(kunciBaris(item));
    setMenuKonteks({ x: batas.left + 16, y: batas.top + 16, baris: item });
  }, []);

  const pilihMenuKonteks = useCallback((item: ItemMenuKonteks) => {
    const konteks = menuKonteks;
    setMenuKonteks(null);
    if (!konteks) return;
    const aksi: AksiMenuKonteks = tentukanAksiMenu(item, konteks.baris);
    if (aksi.jenis === "rute") {
      if (aksi.rute.startsWith("/cetak/")) {
        if (!bukaTabCetakUrl(aksi.rute)) {
          tampilkanToast("Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", "error");
        }
      } else {
        router.push(aksi.rute);
      }
    } else if (aksi.jenis === "urut") {
      setUrutanTabel({ kunci: aksi.kunci, arah: aksi.arah });
    } else if (aksi.jenis === "filter") {
      if (aksi.kunci === "sep") {
        setFilterSep(aksi.nilai === "Sudah" ? "Sudah" : "Belum");
        setHalaman(1);
        tampilkanToast(`Filter SEP diubah menjadi ${aksi.nilai}.`, "info");
      } else if (aksi.kunci === "penjab") {
        setFilterPj(aksi.nilai);
        setHalaman(1);
        tampilkanToast(`Filter jenis bayar: ${konteks.baris.png_jawab || aksi.nilai}.`, "info");
      } else if (aksi.kunci === "belum_diagnosa") {
        setBelumDiagnosa((prev) => !prev);
        setHalaman(1);
        tampilkanToast("Filter pasien belum masuk diagnosa diperbarui.", "info");
      }
    } else if (aksi.jenis === "status_reg" || aksi.jenis === "status_poli" || aksi.jenis === "berkas" || aksi.jenis === "antrian_poli") {
      const aksiApi =
        aksi.jenis === "status_reg"
          ? "set_status_reg"
          : aksi.jenis === "status_poli"
            ? "set_status_poli"
            : aksi.jenis === "berkas"
              ? "set_berkas"
              : "antrian_poli";
      void jalankanAksiKonteksApi({
        aksi: aksiApi,
        no_rawat: konteks.baris.no_rawat,
        nilai: "nilai" in aksi ? aksi.nilai : undefined,
      }).then((res) => {
        tampilkanToast(res.pesan, res.ok ? "sukses" : "error");
        if (res.ok) setVersiTabel((v) => v + 1);
      });
    } else if (aksi.jenis === "ganti") {
      setAksiDialog({
        tipe: "ganti",
        aksiApi: aksi.aksiApi,
        label: aksi.label,
        no_rawat: konteks.baris.no_rawat,
        nm_pasien: konteks.baris.nm_pasien,
      });
    } else if (aksi.jenis === "hapus") {
      setAksiDialog({
        tipe: "hapus",
        target: aksi.target,
        label: aksi.label,
        no_rawat: konteks.baris.no_rawat,
        nm_pasien: konteks.baris.nm_pasien,
      });
    }
  }, [menuKonteks, router, tampilkanToast]);

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

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:overflow-hidden">
        {/* Daftar registrasi */}
        <section className="flex h-[26rem] shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs lg:h-auto lg:min-h-0 lg:flex-1">
          <div
            id={`panel-rawat-jalan-${tabTabel}`}
            role="tabpanel"
            aria-labelledby={`tab-rawat-jalan-${tabTabel}`}
            tabIndex={0}
            className="min-h-0 flex-1 overflow-auto"
            aria-busy={memuat}
          >
            <table className="min-w-[96rem] w-full border-collapse text-left text-[11px] [&_tbody_td]:whitespace-nowrap">
              <caption className="sr-only">
                Daftar registrasi rawat jalan. Pilih baris untuk menandai data.
              </caption>
              <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-16 px-2.5 py-2 text-center">No. Reg</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">No. Rawat</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">Tgl &amp; Jam</th>
                  <th scope="col" className="px-2.5 py-2">No. RM</th>
                  <th scope="col" className="min-w-[11rem] px-2.5 py-2">Pasien</th>
                  <th scope="col" className="min-w-[8rem] px-2.5 py-2">Poliklinik</th>
                  <th scope="col" className="min-w-[11rem] px-2.5 py-2">Dokter Dituju</th>
                  <th scope="col" className="min-w-[10rem] px-2.5 py-2">Penanggung Jawab / Alamat</th>
                  <th scope="col" className="min-w-[8rem] px-2.5 py-2">Jenis Bayar</th>
                  <th scope="col" className="px-2.5 py-2 text-center">Status</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2 text-center">Status Bayar</th>
                  <th scope="col" className="px-2.5 py-2 text-center">Stts Poli</th>
                  <th scope="col" className="whitespace-nowrap px-2.5 py-2">No. Telp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono text-[11px]">
                {memuat ? (
                  <tr><td colSpan={13} className="h-36 !border-0 text-center font-sans text-slate-500">Memuat data rawat jalan...</td></tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="h-44 !border-0 text-center font-sans text-slate-400">
                      <FontAwesomeIcon icon={faReceipt} className="mb-2 h-7 w-7 text-slate-300" aria-hidden="true" />
                      <p>Tidak ada registrasi rawat jalan yang sesuai</p>
                    </td>
                  </tr>
                ) : dataTampil.map((item) => (
                  <tr
                    key={kunciBaris(item)}
                    tabIndex={0}
                    onClick={() => handlePilihData(item)}
                    onContextMenu={(event) => bukaMenuKonteks(event, item)}
                    onKeyDown={(event) => {
                      bukaMenuKonteksDariKeyboard(event, item);
                      if (event.target !== event.currentTarget) return;
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      handlePilihData(item);
                    }}
                    aria-current={barisTerpilih === kunciBaris(item) ? "true" : undefined}
                    className={`cursor-pointer text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-700 ${
                      barisTerpilih === kunciBaris(item)
                        ? "bg-primary-100"
                        : "bg-white hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-2.5 py-2 text-center">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(`/tindakan-rawat-jalan?no_rawat=${encodeURIComponent(item.no_rawat)}`);
                        }}
                        className="font-mono text-slate-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700"
                        aria-label={`Input tindakan untuk registrasi ${item.no_rawat}, pasien ${item.nm_pasien}`}
                      >
                        {item.no_reg}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2 font-medium text-slate-800">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(`/tindakan-rawat-jalan?no_rawat=${encodeURIComponent(item.no_rawat)}`);
                        }}
                        className="font-mono text-slate-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700"
                        aria-label={`Input tindakan untuk nomor rawat ${item.no_rawat}, pasien ${item.nm_pasien}`}
                      >
                        {item.no_rawat}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-slate-600">
                      {item.tgl_registrasi} <span className="text-slate-400">{item.jam_reg}</span>
                    </td>
                    <td className="px-2.5 py-2 font-bold text-slate-800">{item.no_rkm_medis}</td>
                    <td className="px-2.5 py-2 font-sans font-medium text-slate-800">
                      {item.nm_pasien} <span className="font-mono text-[11px] font-normal text-slate-500">({item.umurdaftar} {item.sttsumur})</span>
                    </td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.nm_poli}</td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.nm_dokter}</td>
                    <td className="max-w-[14rem] truncate px-2.5 py-2 font-sans text-[11px] text-slate-600" title={[item.p_jawab, item.hubunganpj && `(${item.hubunganpj})`, item.almt_pj].filter(Boolean).join(" · ") || undefined}>
                      {item.p_jawab || "-"} <span className="text-slate-400">({item.hubunganpj || "-"})</span>{item.almt_pj && <span className="text-slate-400"> · {item.almt_pj}</span>}
                    </td>
                    <td className="px-2.5 py-2 font-sans text-slate-700">{item.png_jawab || item.kd_pj || "-"}</td>
                    <td className="px-2.5 py-2 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${warnaStatusPeriksa(item.stts)}`}>
                        {item.stts || "-"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${item.status_bayar === "Sudah Bayar" ? "border border-secondary-200 bg-secondary-50 text-secondary-700" : "border border-slate-200 bg-slate-100 text-slate-600"}`}>
                        {item.status_bayar || "Belum Bayar"}
                      </span>
                    </td>
                    <td className="px-2.5 py-2 text-center font-sans text-[11px] text-slate-600">{item.status_poli || "-"}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 font-sans text-[11px] text-slate-600">{item.no_tlp || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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

      <MenuKonteksRawatJalan
        terbuka={menuKonteks !== null}
        x={menuKonteks?.x || 0}
        y={menuKonteks?.y || 0}
        baris={menuKonteks?.baris || null}
        onPilih={pilihMenuKonteks}
        onTutup={() => setMenuKonteks(null)}
      />
      <DialogAksiKonteks
        aksi={aksiDialog}
        onTutup={() => setAksiDialog(null)}
        onSelesai={(pesan, tipe) => {
          tampilkanToast(pesan, tipe);
          if (tipe === "sukses") setVersiTabel((v) => v + 1);
        }}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faFileMedical,
} from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { registrationDate } from "@/lib/registrasi/date";

interface Opsi {
  id: string;
  nama: string;
  kd_pj?: string;
  kelas?: string;
}

interface Kunjungan {
  no_rawat: string;
  no_rm: string;
  nm_pasien: string;
  status: string;
  ruang: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_pj: string;
  png_jawab: string;
  kelas?: string;
}

interface PermintaanItem {
  kd_jenis_prw: string;
  nm_perawatan: string;
}

interface PermintaanData {
  noorder: string;
  no_rawat: string;
  tgl_permintaan: string;
  jam_permintaan: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  status: string;
  ruang: string;
  dokter_perujuk: string;
  nm_dokter_perujuk: string;
  png_jawab: string;
  informasi_tambahan: string;
  diagnosa_klinis: string;
  item: PermintaanItem[];
}

type PermintaanItemBaris = Omit<PermintaanData, "item"> & {
  kd_jenis_prw: string;
  nm_perawatan: string;
};

type TabData = "data" | "item";

const TAB_DATA: TabData[] = ["data", "item"];
const LABEL_TAB_DATA: Record<TabData, string> = {
  data: "Data Permintaan",
  item: "Item Pemeriksaan",
};

function jamSekarang(now = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

function pesanError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function statusRawat(status: string) {
  const nilai = status.toLowerCase();
  if (nilai === "ranap" || nilai === "rawat inap") return "ranap";
  if (nilai === "ralan" || nilai === "rawat jalan") return "ralan";
  return "";
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="grid min-w-0 grid-cols-1 items-center gap-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)]" role="group" aria-label={label}>
      <label htmlFor={htmlFor} className="whitespace-nowrap text-xs font-normal text-slate-700 sm:text-right">{label} :</label>
      <div className="flex min-w-0 items-center gap-1.5">{children}</div>
    </div>
  );
}

const inputKelas = "h-7 w-full rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600";
const selectKelas = "h-7 py-0";

export default function HalamanPermintaanRadiologi() {
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [tanggal, setTanggal] = useState(registrationDate());
  const [jam, setJam] = useState(jamSekarang());
  const [noorderTersimpan, setNoorderTersimpan] = useState("");

  const [noRawat, setNoRawat] = useState("");
  const [kunjungan, setKunjungan] = useState<Kunjungan | null>(null);
  const [dokterPerujuk, setDokterPerujuk] = useState("");
  const [informasiTambahan, setInformasiTambahan] = useState("");
  const [diagnosaKlinis, setDiagnosaKlinis] = useState("");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);
  const [dialogSimpan, setDialogSimpan] = useState(false);

  const [daftarDokter, setDaftarDokter] = useState<Opsi[]>([]);
  const [daftarPoli, setDaftarPoli] = useState<Opsi[]>([]);
  const [dialogKunjungan, setDialogKunjungan] = useState(false);
  const [cariKunjungan, setCariKunjungan] = useState("");
  const [hasilKunjungan, setHasilKunjungan] = useState<Kunjungan[]>([]);
  const [memuatKunjungan, setMemuatKunjungan] = useState(false);
  const dialogKunjunganRef = useRef<HTMLDialogElement>(null);

  const [tabData, setTabData] = useState<TabData>("data");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [data, setData] = useState<PermintaanData[]>([]);
  const [dataItem, setDataItem] = useState<PermintaanItemBaris[]>([]);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [memuatData, setMemuatData] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(registrationDate());
  const [tanggalSelesai, setTanggalSelesai] = useState(registrationDate());
  const [cariData, setCariData] = useState("");
  const [dokterFilter, setDokterFilter] = useState("");
  const [poliFilter, setPoliFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [statusRanapFilter, setStatusRanapFilter] = useState("Semua");
  const [versiData, setVersiData] = useState(0);

  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe; kunci: number } | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe, kunci: Date.now() });
  }, []);

  useEffect(() => {
    if (!waktuOtomatis) return;
    const sinkron = () => {
      setTanggal(registrationDate());
      setJam(jamSekarang());
    };
    sinkron();
    const penghitung = window.setInterval(sinkron, 1000);
    return () => window.clearInterval(penghitung);
  }, [waktuOtomatis]);

  useEffect(() => {
    const nilai = new URLSearchParams(window.location.search).get("no_rawat");
    if (!nilai) return;
    const timer = window.setTimeout(() => setNoRawat(nilai.slice(0, 30)), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const muatOpsi = useCallback(async (jenis: string) => {
    try {
      const res = await fetch(`/api/radiologi/permintaan/options?jenis=${jenis}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Pilihan gagal dimuat.");
      return (json.data || []) as Opsi[];
    } catch (error) {
      tampilkanToast(pesanError(error, "Pilihan gagal dimuat."), "error");
      return [];
    }
  }, [tampilkanToast]);

  const muatSemuaOpsi = useCallback(async () => {
    const [dokter, poli] = await Promise.all([muatOpsi("dokter"), muatOpsi("poli")]);
    setDaftarDokter(dokter);
    setDaftarPoli(poli);
  }, [muatOpsi]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatSemuaOpsi(), 0);
    return () => window.clearTimeout(timer);
  }, [muatSemuaOpsi]);

  const muatKunjungan = useCallback(async (nilai: string) => {
    try {
      const url = new URL("/api/radiologi/permintaan/options", window.location.origin);
      url.searchParams.set("jenis", "kunjungan");
      url.searchParams.set("no_rawat", nilai);
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Kunjungan tidak ditemukan.");
      const baris = (json.data?.[0] || null) as Kunjungan | null;
      setKunjungan(baris);
      if (baris?.kd_dokter) setDokterPerujuk(baris.kd_dokter);
    } catch (error) {
      setKunjungan(null);
      tampilkanToast(pesanError(error, "Kunjungan tidak ditemukan."), "error");
    }
  }, [tampilkanToast]);

  useEffect(() => {
    const nilai = noRawat.trim();
    if (!nilai) {
      const timer = window.setTimeout(() => setKunjungan(null), 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => void muatKunjungan(nilai), 250);
    return () => window.clearTimeout(timer);
  }, [noRawat, muatKunjungan]);

  useEffect(() => {
    if (!dialogKunjungan) return;
    if (!cariKunjungan.trim()) {
      const timer = window.setTimeout(() => setHasilKunjungan([]), 0);
      return () => window.clearTimeout(timer);
    }
    let dibatalkan = false;
    const timer = window.setTimeout(async () => {
      setMemuatKunjungan(true);
      try {
        const url = new URL("/api/radiologi/permintaan/options", window.location.origin);
        url.searchParams.set("jenis", "kunjungan");
        url.searchParams.set("cari", cariKunjungan.trim());
        url.searchParams.set("limit", "30");
        const res = await fetch(url.toString(), { cache: "no-store" });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Pencarian gagal.");
        if (!dibatalkan) setHasilKunjungan((json.data || []) as Kunjungan[]);
      } catch (error) {
        if (!dibatalkan) {
          setHasilKunjungan([]);
          tampilkanToast(pesanError(error, "Pencarian gagal."), "error");
        }
      } finally {
        if (!dibatalkan) setMemuatKunjungan(false);
      }
    }, 250);
    return () => { dibatalkan = true; window.clearTimeout(timer); };
  }, [dialogKunjungan, cariKunjungan, tampilkanToast]);

  const muatData = useCallback(async () => {
    setMemuatData(true);
    try {
      const url = new URL("/api/radiologi/permintaan", window.location.origin);
      url.searchParams.set("mode", tabData);
      if (tanggalMulai) url.searchParams.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) url.searchParams.set("tanggal_selesai", tanggalSelesai);
      if (cariData.trim()) url.searchParams.set("cari", cariData.trim());
      if (dokterFilter) url.searchParams.set("dokter", dokterFilter);
      if (poliFilter) url.searchParams.set("poli", poliFilter);
      if (statusFilter !== "Semua") url.searchParams.set("status", statusFilter);
      if (statusRanapFilter !== "Semua") url.searchParams.set("status_ranap", statusRanapFilter);
      url.searchParams.set("limit", "500");
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat permintaan radiologi.");
      if (tabData === "data") setData((json.data || []) as PermintaanData[]);
      else setDataItem((json.data || []) as PermintaanItemBaris[]);
      setTerpilih(null);
    } catch (error) {
      if (tabData === "data") setData([]);
      else setDataItem([]);
      tampilkanToast(pesanError(error, "Gagal memuat permintaan radiologi."), "error");
    } finally {
      setMemuatData(false);
    }
  }, [tabData, tanggalMulai, tanggalSelesai, cariData, dokterFilter, poliFilter, statusFilter, statusRanapFilter, tampilkanToast]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatData(), 0);
    return () => window.clearTimeout(timer);
  }, [versiData, muatData]);

  function resetForm() {
    setWaktuOtomatis(true);
    setTanggal(registrationDate());
    setJam(jamSekarang());
    setNoorderTersimpan("");
    setNoRawat("");
    setKunjungan(null);
    setDokterPerujuk("");
    setInformasiTambahan("");
    setDiagnosaKlinis("");
    setTerpilih(null);
  }

  function resetFilterData() {
    setTanggalMulai(registrationDate());
    setTanggalSelesai(registrationDate());
    setCariData("");
    setDokterFilter("");
    setPoliFilter("");
    setStatusFilter("Semua");
    setStatusRanapFilter("Semua");
    setVersiData((nilai) => nilai + 1);
  }

  function kunciTabData(event: React.KeyboardEvent<HTMLButtonElement>, nilai: TabData) {
    const indeks = TAB_DATA.indexOf(nilai);
    let berikut: number | null = null;
    if (event.key === "ArrowRight") berikut = (indeks + 1) % TAB_DATA.length;
    if (event.key === "ArrowLeft") berikut = (indeks - 1 + TAB_DATA.length) % TAB_DATA.length;
    if (event.key === "Home") berikut = 0;
    if (event.key === "End") berikut = TAB_DATA.length - 1;
    if (berikut === null) return;
    event.preventDefault();
    const tabBerikut = TAB_DATA[berikut];
    setTabData(tabBerikut);
    tabRefs.current[berikut]?.focus();
  }

  async function simpanPermintaan() {
    setDialogSimpan(false);
    setSedangMenyimpan(true);
    try {
      const res = await fetch("/api/radiologi/permintaan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat.trim(),
          tanggal,
          jam,
          dokter_perujuk: dokterPerujuk,
          status: kunjungan?.status || "",
          informasi_tambahan: informasiTambahan,
          diagnosa_klinis: diagnosaKlinis,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Permintaan radiologi gagal disimpan.");
      const noorder = String(json.data?.noorder || "");
      resetForm();
      setNoorderTersimpan(noorder);
      tampilkanToast(json.message || `Permintaan ${noorder} berhasil disimpan.`, "sukses");
    } catch (error) {
      tampilkanToast(pesanError(error, "Permintaan radiologi gagal disimpan."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  }

  const daftarDokterSelect = [{ id: "", nama: "-" }, ...daftarDokter];
  const daftarPoliSelect = [{ id: "", nama: "Semua Poli" }, ...daftarPoli];

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <PanelInputData judul=".: Input Data" idPenyimpanan="permintaan-radiologi">
        <fieldset disabled={sedangMenyimpan} className="max-h-[46vh] space-y-3 overflow-y-auto font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul kolomAktifSama>
            <section aria-label="Identitas dan perujuk" className="min-w-0 space-y-1.5">
              <Field label="No.Permintaan" htmlFor="no-permintaan">
                <input id="no-permintaan" value={noorderTersimpan || "Otomatis saat disimpan"} readOnly className={`${inputKelas} bg-slate-50 font-mono text-slate-600`} />
              </Field>
              <Field label="No.Rawat" htmlFor="no-rawat">
                <input
                  id="no-rawat"
                  value={noRawat}
                  onChange={(event) => setNoRawat(event.target.value.slice(0, 30))}
                  className={`${inputKelas} font-mono`}
                  placeholder="No. rawat"
                />
                <button
                  type="button"
                  onClick={() => { setCariKunjungan(noRawat); setDialogKunjungan(true); dialogKunjunganRef.current?.showModal(); }}
                  aria-label="Cari kunjungan"
                  aria-haspopup="dialog"
                  title="Cari kunjungan"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
                </button>
              </Field>
              <Field label="No.RM" htmlFor="no-rm">
                <input id="no-rm" value={kunjungan?.no_rm || ""} readOnly className={`${inputKelas} bg-slate-50 font-mono`} />
              </Field>
              <Field label="Nama Pasien" htmlFor="nm-pasien">
                <input id="nm-pasien" value={kunjungan?.nm_pasien || ""} readOnly className={`${inputKelas} bg-slate-50`} />
              </Field>
              <Field label="Dokter Perujuk" htmlFor="dokter-perujuk">
                <CustomSelect
                  id="dokter-perujuk"
                  className={selectKelas}
                  value={dokterPerujuk}
                  onChange={(event) => setDokterPerujuk(event.target.value)}
                  options={daftarDokterSelect.map((item) => ({ value: item.id, label: item.nama }))}
                />
              </Field>
            </section>

            <section aria-label="Kunjungan dan catatan" className="min-w-0 space-y-1.5">
              <Field label="Tanggal" htmlFor="tanggal-permintaan">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <input
                    id="tanggal-permintaan"
                    type="date"
                    value={tanggal}
                    onChange={(event) => { setWaktuOtomatis(false); setTanggal(event.target.value); }}
                    className={`${inputKelas} w-32 font-mono`}
                  />
                  <span className="text-slate-600">Jam :</span>
                  <input
                    type="time"
                    step={1}
                    value={jam}
                    onChange={(event) => { setWaktuOtomatis(false); setJam(event.target.value); }}
                    aria-label="Jam permintaan"
                    className={`${inputKelas} w-20 font-mono`}
                  />
                  <input
                    type="checkbox"
                    checked={waktuOtomatis}
                    onChange={(event) => setWaktuOtomatis(event.target.checked)}
                    aria-label="Gunakan tanggal dan jam saat ini"
                    title="Gunakan tanggal dan jam saat ini"
                    className="h-4 w-4 shrink-0 accent-primary-600"
                  />
                </div>
              </Field>
              <Field label="Jenis Rawat" htmlFor="jenis-rawat">
                <input id="jenis-rawat" value={kunjungan ? (statusRawat(kunjungan.status) === "ranap" ? "Ranap" : "Ralan") : ""} readOnly className={`${inputKelas} bg-slate-50`} />
              </Field>
              <Field label="Ruang/Unit" htmlFor="ruang-permintaan">
                <input id="ruang-permintaan" value={kunjungan?.ruang || ""} readOnly className={`${inputKelas} bg-slate-50`} />
              </Field>
              <Field label="Cara Bayar" htmlFor="cara-bayar">
                <input id="cara-bayar" value={kunjungan?.png_jawab || ""} readOnly className={`${inputKelas} bg-slate-50`} />
              </Field>
              <Field label="Informasi Tambahan" htmlFor="informasi-tambahan">
                <input id="informasi-tambahan" value={informasiTambahan} maxLength={60} onChange={(event) => setInformasiTambahan(event.target.value)} className={inputKelas} />
              </Field>
              <Field label="Diagnosa Klinis" htmlFor="diagnosa-klinis">
                <input id="diagnosa-klinis" value={diagnosaKlinis} maxLength={80} onChange={(event) => setDiagnosaKlinis(event.target.value)} className={inputKelas} />
              </Field>
            </section>
          </GridFormulirModul>
        </fieldset>
      </PanelInputData>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Tampilan data permintaan radiologi" className="flex shrink-0 border-b border-slate-200">
          {TAB_DATA.map((nilai, indeks) => (
            <button
              key={nilai}
              ref={(node) => { tabRefs.current[indeks] = node; }}
              type="button"
              role="tab"
              id={`tab-radiologi-${nilai}`}
              aria-controls={`panel-radiologi-${nilai}`}
              aria-selected={tabData === nilai}
              tabIndex={tabData === nilai ? 0 : -1}
              onClick={() => setTabData(nilai)}
              onKeyDown={(event) => kunciTabData(event, nilai)}
              className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabData === nilai ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"
                }`}
            >
              {LABEL_TAB_DATA[nilai]}
            </button>
          ))}
          </div>
        <div
          key={tabData}
          id={`panel-radiologi-${tabData}`}
          role="tabpanel"
          aria-labelledby={`tab-radiologi-${tabData}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto focus:outline-none"
          aria-busy={memuatData}
        >
          {tabData === "data" ? (
            <table className="w-full min-w-[1180px] border-collapse text-left text-[11px]">
              <caption className="sr-only">Daftar permintaan radiologi</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.Order", "Tgl", "Jam", "No.Rawat", "No.RM", "Nama Pasien", "Jk", "Status", "Ruang", "Dokter Perujuk", "Penjab", "Informasi Tambahan", "Diagnosa Klinis", "Pemeriksaan"].map((judul) => (
                    <th key={judul} scope="col" className="border-b border-slate-200 px-2 py-2">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {memuatData ? (
                  <tr><td colSpan={14} className="h-36 border-0 text-center text-slate-500">Memuat permintaan radiologi...</td></tr>
                ) : data.length === 0 ? (
                  <tr>
                      <td colSpan={14} className="h-44 border-0 text-center text-slate-500">
                        <FontAwesomeIcon icon={faFileMedical} className="mb-2 h-7 w-7 text-slate-300" />
                        <p>Tidak ada permintaan radiologi pada periode ini.</p>
                      </td>
                    </tr>
                  ) : data.map((baris) => {
                    const dipilih = terpilih === baris.noorder;
                    const warna = dipilih ? "bg-primary-100 hover:bg-primary-100" : "hover:bg-slate-50/80";
                    return (
                      <React.Fragment key={baris.noorder}>
                        <tr
                          className={`${warna} cursor-pointer`}
                          tabIndex={0}
                          onClick={() => setTerpilih(dipilih ? null : baris.noorder)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setTerpilih(dipilih ? null : baris.noorder);
                            }
                          }}
                          aria-selected={dipilih}
                        >
                          <td className="px-2 py-1.5 font-mono text-slate-800">{baris.noorder}</td>
                          <td className="px-2 py-1.5 font-mono text-slate-600">{baris.tgl_permintaan}</td>
                          <td className="px-2 py-1.5 font-mono text-slate-600">{baris.jam_permintaan}</td>
                          <td className="px-2 py-1.5 font-mono text-slate-800">{baris.no_rawat}</td>
                          <td className="px-2 py-1.5 font-mono text-slate-800">{baris.no_rkm_medis}</td>
                          <td className="px-2 py-1.5">{baris.nm_pasien}</td>
                          <td className="px-2 py-1.5 text-center">{baris.jk || "-"}</td>
                          <td className="px-2 py-1.5">{baris.status || "-"}</td>
                          <td className="px-2 py-1.5">{baris.ruang || "-"}</td>
                          <td className="px-2 py-1.5">{baris.nm_dokter_perujuk || baris.dokter_perujuk || "-"}</td>
                          <td className="px-2 py-1.5">{baris.png_jawab || "-"}</td>
                          <td className="px-2 py-1.5 text-slate-600">{baris.informasi_tambahan || "-"}</td>
                          <td className="px-2 py-1.5 text-slate-600">{baris.diagnosa_klinis || "-"}</td>
                          <td className="px-2 py-1.5 text-slate-600">{baris.item.length} pemeriksaan</td>
                        </tr>
                        {baris.item.map((item) => (
                          <tr key={`${baris.noorder}-${item.kd_jenis_prw}`} className={warna}>
                            <td className="px-2 py-1 text-slate-400">&gt;&gt;</td>
                            <td colSpan={3} className="px-2 py-1 font-mono text-slate-600">{item.kd_jenis_prw}</td>
                            <td colSpan={10} className="px-2 py-1 text-slate-600">{item.nm_perawatan}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[1080px] border-collapse text-left text-[11px]">
              <caption className="sr-only">Daftar item pemeriksaan permintaan radiologi</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.Order", "Tgl", "Jam", "No.Rawat", "No.RM", "Nama Pasien", "Kode", "Pemeriksaan", "Status", "Ruang", "Dokter Perujuk", "Penjab"].map((judul) => (
                    <th key={judul} scope="col" className="border-b border-slate-200 px-2 py-2">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {memuatData ? (
                  <tr><td colSpan={12} className="h-36 border-0 text-center text-slate-500">Memuat item pemeriksaan radiologi...</td></tr>
                ) : dataItem.length === 0 ? (
                  <tr><td colSpan={12} className="h-44 border-0 text-center text-slate-500">Tidak ada item pemeriksaan pada periode ini.</td></tr>
                ) : dataItem.map((baris) => (
                  <tr key={`${baris.noorder}-${baris.kd_jenis_prw}`} className="hover:bg-slate-50/80">
                    <td className="px-2 py-1.5 font-mono text-slate-800">{baris.noorder}</td>
                    <td className="px-2 py-1.5 font-mono text-slate-600">{baris.tgl_permintaan}</td>
                    <td className="px-2 py-1.5 font-mono text-slate-600">{baris.jam_permintaan}</td>
                    <td className="px-2 py-1.5 font-mono text-slate-800">{baris.no_rawat}</td>
                    <td className="px-2 py-1.5 font-mono text-slate-800">{baris.no_rkm_medis}</td>
                    <td className="px-2 py-1.5">{baris.nm_pasien}</td>
                    <td className="px-2 py-1.5 font-mono text-slate-600">{baris.kd_jenis_prw}</td>
                    <td className="px-2 py-1.5">{baris.nm_perawatan}</td>
                    <td className="px-2 py-1.5">{baris.status || "-"}</td>
                    <td className="px-2 py-1.5">{baris.ruang || "-"}</td>
                    <td className="px-2 py-1.5">{baris.nm_dokter_perujuk || baris.dokter_perujuk || "-"}</td>
                    <td className="px-2 py-1.5">{baris.png_jawab || "-"}</td>
                  </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </div>

      <PanelBawah
        tampilan="web"
        memuat={memuatData || sedangMenyimpan}
        tampilkanRecord
        jumlahRecord={tabData === "data" ? data.length : dataItem.length}
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={setTanggalMulai}
        onGantiTanggalSelesai={setTanggalSelesai}
        kataKunci={cariData}
        onGantiKataKunci={setCariData}
        onCari={() => setVersiData((nilai) => nilai + 1)}
        placeholderCari="Cari No.Order, No.Rawat, Pasien, Diagnosa..."
        filterTambahan={
          <div className="flex flex-wrap items-center gap-1.5">
            <CustomSelect value={dokterFilter} onChange={(event) => setDokterFilter(event.target.value)} className={selectKelas} containerClassName="w-40" options={daftarDokterSelect.map((item) => ({ value: item.id, label: item.id ? item.nama : "Semua Dokter" }))} />
            <CustomSelect value={poliFilter} onChange={(event) => setPoliFilter(event.target.value)} className={selectKelas} containerClassName="w-40" options={daftarPoliSelect.map((item) => ({ value: item.id, label: item.nama }))} />
            <CustomSelect value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={selectKelas} containerClassName="w-36" options={[{ value: "Semua", label: "Semua Status" }, { value: "ralan", label: "Rawat Jalan" }, { value: "ranap", label: "Rawat Inap" }]} />
            <CustomSelect value={statusRanapFilter} onChange={(event) => setStatusRanapFilter(event.target.value)} className={selectKelas} containerClassName="w-36" options={[{ value: "Semua", label: "Semua Ranap" }, { value: "Belum Pulang", label: "Belum Pulang" }]} />
          </div>
          }
        onSimpan={() => setDialogSimpan(true)}
        disabledSimpan={!noRawat || !dokterPerujuk || !informasiTambahan.trim() || !diagnosaKlinis.trim()}
        onBaru={resetForm}
        onCetak={() => window.print()}
        onSemua={resetFilterData}
        labelKembali="Keluar"
      />

      <dialog
        ref={dialogKunjunganRef}
        onClose={() => setDialogKunjungan(false)}
        aria-label="Cari kunjungan"
        className="fixed top-1/2 left-1/2 m-0 max-h-[75vh] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-0 text-slate-800 shadow-xl backdrop:bg-tertiary-950/40"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold">Cari Kunjungan</h2>
          <button type="button" onClick={() => dialogKunjunganRef.current?.close()} aria-label="Tutup pencarian kunjungan" className="p-1 text-slate-600">
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </button>
        </div>
        <div className="p-3">
          <input
            autoFocus
            value={cariKunjungan}
            onChange={(event) => setCariKunjungan(event.target.value)}
            aria-label="Cari No.Rawat, No.RM, atau nama pasien"
            placeholder="Cari No.Rawat, No.RM, atau nama pasien..."
            className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs focus:outline-none focus:border-primary-600"
          />
        </div>
        <div className="max-h-[45vh] overflow-auto pb-2">
          {memuatKunjungan ? (
            <p className="px-4 py-3 text-xs text-slate-500" role="status">Memuat kunjungan...</p>
          ) : hasilKunjungan.length === 0 ? (
            <p className="px-4 py-3 text-xs text-slate-500">Tidak ada kunjungan yang sesuai.</p>
          ) : hasilKunjungan.map((baris) => (
            <button
              key={baris.no_rawat}
              type="button"
              onClick={() => {
                setNoRawat(baris.no_rawat);
                setKunjungan(baris);
                if (baris.kd_dokter) setDokterPerujuk(baris.kd_dokter);
                dialogKunjunganRef.current?.close();
              }}
              className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
            >
              <span className="font-mono text-slate-800">{baris.no_rawat}</span>
              <span className="mx-2 text-slate-400">|</span>
              <span className="font-mono">{baris.no_rm}</span>
              <span className="mx-2 text-slate-400">|</span>
              <span>{baris.nm_pasien}</span>
              <span className="mx-2 text-slate-400">|</span>
              <span>{baris.status || "-"}</span>
            </button>
          ))}
        </div>
      </dialog>

      <KonfirmasiDialog
        terbuka={dialogSimpan}
        judul="Konfirmasi Permintaan Radiologi"
        pesan={`Simpan permintaan radiologi untuk ${noRawat}?`}
        subPesan="Nomor permintaan dibuat otomatis. Setelah disimpan, form kembali kosong."
        teksBatal="Batal"
        teksKonfirmasi="Simpan"
        bahaya={false}
        sedangMemproses={sedangMenyimpan}
        onBatal={() => setDialogSimpan(false)}
        onKonfirmasi={() => void simpanPermintaan()}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

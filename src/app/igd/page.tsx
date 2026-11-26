"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { MenuKonteksIgd } from "@/components/modul/MenuKonteksIgd";
import { DialogAksiKonteks, jalankanAksiKonteksApi, type JenisAksiDialogKonteks } from "@/components/modul/DialogAksiKonteks";
import {
  tentukanAksiMenu,
  type BarisMenuKonteks,
  type FilterSepIgd,
  type ItemMenuKonteks,
} from "@/components/modul/menu-konteks-igd-data";
import { PatientMasterSelect } from "@/components/pasien/PatientMasterSelect";
import { PilihPasienDialog, type PasienOption } from "@/components/pasien/PilihPasienDialog";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { useAuth } from "@/components/auth/AuthContext";
import { registrationDate } from "@/lib/registrasi/date";
import { pindahFieldDenganEnter } from "@/lib/formulir/pindah-field";
import { bukaTabCetakUrl } from "@/lib/cetak/jasper-web";
import { POLI_IGD } from "@/lib/igd/constants";
import type { RegistrationNumbers } from "@/lib/registrasi/numbering";

interface DokterOption { kd_dokter: string; nm_dokter: string }
interface PenjaminOption { kd_pj: string; png_jawab: string }
interface IgdRow extends BarisMenuKonteks {
  kd_dokter: string;
  p_jawab: string;
  almt_pj: string;
  hubunganpj: string;
  jk: string;
  umurdaftar: string | number;
  sttsumur: string;
  biaya_reg: string | number;
  stts_daftar: string;
  status_bayar: string;
  status_lanjut: string;
  asal_rujukan: string;
  no_peserta: string;
  tgl_daftar_pasien: string;
}

function IgdField({ label, children, labelWidth = "lg:grid-cols-[4.5rem_minmax(0,1fr)]" }: { label: string; children: ReactNode; labelWidth?: string }) {
  return (
    <div className={`grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] ${labelWidth} min-w-0`} role="group" aria-label={label}>
      <span className="whitespace-nowrap text-xs font-normal text-slate-700 sm:text-right">{label} :</span>
      <div className="flex min-w-0 items-center gap-2">{children}</div>
    </div>
  );
}

const kunciBaris = (item: IgdRow) => `${item.no_rawat}-${item.tgl_registrasi}-${item.jam_reg}`;

function warnaStatus(status: string) {
  if (status === "Sudah") return "border border-secondary-300 bg-secondary-100 text-secondary-800";
  if (["Batal", "Meninggal", "Pulang Paksa"].includes(status)) return "border border-red-200 bg-red-50 text-red-700";
  if (["Dirujuk", "Dirawat"].includes(status)) return "border border-primary-200 bg-primary-50 text-primary-700";
  return "border border-slate-200 bg-slate-100 text-slate-700";
}

export default function HalamanIGD() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const hariIni = useMemo(() => registrationDate(), []);

  const [data, setData] = useState<IgdRow[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [memuat, setMemuat] = useState(true);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [statusPeriksa, setStatusPeriksa] = useState("Semua");
  const [filterSep, setFilterSep] = useState<FilterSepIgd>("Semua");
  const [versiTabel, setVersiTabel] = useState(0);
  const [menuKonteks, setMenuKonteks] = useState<{ x: number; y: number; baris: IgdRow } | null>(null);
  const [aksiDialog, setAksiDialog] = useState<JenisAksiDialogKonteks | null>(null);
  const [barisTerpilih, setBarisTerpilih] = useState("");
  const [terpilih, setTerpilih] = useState<IgdRow | null>(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const [dialogHapusBuka, setDialogHapusBuka] = useState(false);
  const [modalPasienBuka, setModalPasienBuka] = useState(false);
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);
  const [sedangMenghapus, setSedangMenghapus] = useState(false);
  const permintaanTabel = useRef<AbortController | null>(null);

  const [daftarDokter, setDaftarDokter] = useState<DokterOption[]>([]);
  const [daftarPenjab, setDaftarPenjab] = useState<PenjaminOption[]>([]);

  const [nomorBerikutnya, setNomorBerikutnya] = useState<(RegistrationNumbers & { tanggal: string; versi: number }) | null>(null);
  const [versiNomor, setVersiNomor] = useState(0);
  const [tglReg, setTglReg] = useState(hariIni);
  const [jamReg, setJamReg] = useState("");
  const [jamOtomatis, setJamOtomatis] = useState(true);
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [noKartu, setNoKartu] = useState("");
  const [tanggalDaftarPasien, setTanggalDaftarPasien] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [kdPj, setKdPj] = useState("");
  const [namaPenjab, setNamaPenjab] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState("-");
  const [almtPj, setAlmtPj] = useState("-");
  const [hubunganPj, setHubunganPj] = useState("DIRI SENDIRI");
  const [statusRawat, setStatusRawat] = useState("Belum");
  const [statusBayar, setStatusBayar] = useState("Belum Bayar");
  const [asalRujukan, setAsalRujukan] = useState("-");

  const nomorSiap = nomorBerikutnya?.tanggal === tglReg && nomorBerikutnya.versi === versiNomor;
  const noRawat = terpilih?.no_rawat || (nomorSiap ? nomorBerikutnya.no_rawat : "");
  const noReg = terpilih?.no_reg || (nomorSiap ? nomorBerikutnya.no_reg : "");
  const statusPasien = !noRm || !nmPasien ? ""
    : terpilih && terpilih.no_rkm_medis === noRm && terpilih.tgl_registrasi === tglReg
      ? terpilih.stts_daftar
      : tanggalDaftarPasien ? (tanggalDaftarPasien === tglReg ? "Baru" : "Lama") : "";

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    permintaanTabel.current?.abort();
    const controller = new AbortController();
    permintaanTabel.current = controller;
    setMemuat(true);
    try {
      const url = new URL("/api/igd", window.location.origin);
      url.searchParams.set("tanggal_mulai", tanggalMulai);
      url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("limit", "100");
      if (kataKunciFilter) url.searchParams.set("cari", kataKunciFilter);
      if (statusPeriksa !== "Semua") url.searchParams.set("stts", statusPeriksa);
      if (filterSep !== "Semua") url.searchParams.set("sep", filterSep);

      const res = await fetch(url.toString(), { signal: controller.signal, cache: "no-store" });
      const json = await res.json();
      if (controller.signal.aborted) return;
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat data IGD");
      setData(json.data || []);
      setTotalData(Number(json.total) || 0);
    } catch (error) {
      if (!controller.signal.aborted) {
        tampilkanToast(error instanceof Error ? error.message : "Gagal memuat data IGD", "error");
      }
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [filterSep, isAuthenticated, kataKunciFilter, statusPeriksa, tanggalMulai, tanggalSelesai, tampilkanToast]);

  useEffect(() => {
    const berikutnya = kataKunci.trim();
    if (berikutnya === kataKunciFilter) return;
    if (berikutnya.length > 0 && berikutnya.length <= 2) return;
    const timer = window.setTimeout(() => setKataKunciFilter(berikutnya), 300);
    return () => window.clearTimeout(timer);
  }, [kataKunci, kataKunciFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void muatData(); }, 0);
    return () => {
      window.clearTimeout(timer);
      permintaanTabel.current?.abort();
    };
  }, [muatData, versiTabel]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    async function muatOpsi() {
      try {
        const res = await fetch("/api/igd/options", { signal: controller.signal, cache: "no-store" });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat opsi IGD");
        if (controller.signal.aborted) return;
        const opsi = json.data || {};
        setDaftarDokter(opsi.dokter || []);
        setDaftarPenjab(opsi.penjab || []);
        setKdDokter((sekarang) => sekarang || opsi.dokter?.[0]?.kd_dokter || "");
        setKdPj((sekarang) => sekarang || opsi.penjab?.[0]?.kd_pj || "");
      } catch (error) {
        if (!controller.signal.aborted) {
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat opsi IGD", "error");
        }
      }
    }
    void muatOpsi();
    return () => controller.abort();
  }, [isAuthenticated, tampilkanToast]);

  useEffect(() => {
    if (terpilih || !isAuthenticated || !tglReg || !kdDokter) return;
    const controller = new AbortController();
    async function muatNomor() {
      try {
        const params = new URLSearchParams({ tanggal: tglReg, dokter: kdDokter });
        const res = await fetch(`/api/igd/nomor?${params}`, { signal: controller.signal, cache: "no-store" });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat nomor IGD");
        if (!controller.signal.aborted) {
          setNomorBerikutnya({ ...json.data, tanggal: tglReg, versi: versiNomor });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat nomor IGD", "error");
        }
      }
    }
    void muatNomor();
    return () => controller.abort();
  }, [isAuthenticated, kdDokter, tglReg, terpilih, versiNomor, tampilkanToast]);

  useEffect(() => {
    if (terpilih || !jamOtomatis) return;
    const perbaruiJam = () => setJamReg(new Date().toTimeString().slice(0, 8));
    perbaruiJam();
    const timer = window.setInterval(perbaruiJam, 1000);
    return () => window.clearInterval(timer);
  }, [jamOtomatis, terpilih]);

  const isiPasien = useCallback((p: PasienOption) => {
    setNoRm(p.no_rkm_medis);
    setNmPasien(p.nm_pasien);
    setNoKartu(p.no_peserta || "");
    setTanggalDaftarPasien(p.tgl_daftar || "");
    setPenanggungJawab(p.namakeluarga || "-");
    setAlmtPj(p.alamat || "-");
    setHubunganPj(p.keluarga || "DIRI SENDIRI");
    if (p.kd_pj) {
      setKdPj(p.kd_pj);
      setNamaPenjab(p.png_jawab || "");
    }
    setModalPasienBuka(false);
  }, []);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    const tgl = registrationDate(sekarang);
    setTerpilih(null);
    setBarisTerpilih("");
    setMenuKonteks(null);
    setDialogHapusBuka(false);
    setVersiNomor((versi) => versi + 1);
    setTglReg(tgl);
    setJamReg(sekarang.toTimeString().slice(0, 8));
    setJamOtomatis(true);
    setNoRm("");
    setNmPasien("");
    setNoKartu("");
    setTanggalDaftarPasien("");
    setPenanggungJawab("-");
    setAlmtPj("-");
    setHubunganPj("DIRI SENDIRI");
    setAsalRujukan("-");
    setStatusRawat("Belum");
    setStatusBayar("Belum Bayar");
    setKdDokter(daftarDokter[0]?.kd_dokter || "");
    setKdPj(daftarPenjab[0]?.kd_pj || "");
    setNamaPenjab("");
  }, [daftarDokter, daftarPenjab]);

  const handlePilihData = useCallback((item: IgdRow) => {
    if (sedangMenyimpan || sedangMenghapus) return;
    setTerpilih(item);
    setBarisTerpilih(kunciBaris(item));
    setTglReg(item.tgl_registrasi);
    setJamReg(item.jam_reg);
    setJamOtomatis(false);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setNoKartu(item.no_peserta || "");
    setTanggalDaftarPasien(item.tgl_daftar_pasien || "");
    setKdDokter(item.kd_dokter);
    setKdPj(item.kd_pj || "");
    setNamaPenjab(item.png_jawab || "");
    setPenanggungJawab(item.p_jawab || "-");
    setAlmtPj(item.almt_pj || "-");
    setHubunganPj(item.hubunganpj || "Keluarga");
    setStatusRawat(item.stts || "Belum");
    setStatusBayar(item.status_bayar || "Belum Bayar");
    setAsalRujukan(item.asal_rujukan || "-");
  }, [sedangMenghapus, sedangMenyimpan]);

  const cariSekarang = useCallback(() => {
    setKataKunciFilter(kataKunci.trim());
    setTerpilih(null);
    setBarisTerpilih("");
    setVersiTabel((versi) => versi + 1);
  }, [kataKunci]);

  const resetFilter = useCallback(() => {
    setKataKunci("");
    setKataKunciFilter("");
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setStatusPeriksa("Semua");
    setFilterSep("Semua");
    setTerpilih(null);
    setBarisTerpilih("");
    setMenuKonteks(null);
    setVersiTabel((versi) => versi + 1);
  }, [hariIni]);

  const bukaMenuKonteks = useCallback((event: ReactMouseEvent<HTMLTableRowElement>, baris: IgdRow) => {
    event.preventDefault();
    handlePilihData(baris);
    setMenuKonteks({ x: event.clientX, y: event.clientY, baris });
  }, [handlePilihData]);

  const bukaMenuKonteksDariKeyboard = useCallback((event: ReactKeyboardEvent<HTMLTableRowElement>, baris: IgdRow) => {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    const batas = event.currentTarget.getBoundingClientRect();
    handlePilihData(baris);
    setMenuKonteks({ x: batas.left + 16, y: batas.top + 16, baris });
  }, [handlePilihData]);

  const pilihMenuKonteks = useCallback((item: ItemMenuKonteks) => {
    const konteks = menuKonteks;
    setMenuKonteks(null);
    if (!konteks) return;
    const aksi = tentukanAksiMenu(item, konteks.baris);
    if (aksi.jenis === "rute") {
      if (aksi.rute.startsWith("/cetak/")) {
        if (!bukaTabCetakUrl(aksi.rute)) {
          tampilkanToast("Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", "error");
        }
      } else {
        router.push(aksi.rute);
      }
      return;
    }
    if (aksi.jenis === "filter") {
      setFilterSep(aksi.nilai);
      setTerpilih(null);
      setBarisTerpilih("");
      tampilkanToast(`Filter SEP diubah menjadi ${aksi.nilai}.`, "info");
      return;
    }
    if (aksi.jenis === "status_reg" || aksi.jenis === "status_poli" || aksi.jenis === "berkas") {
      const aksiApi =
        aksi.jenis === "status_reg"
          ? "set_status_reg"
          : aksi.jenis === "status_poli"
            ? "set_status_poli"
            : "set_berkas";
      void jalankanAksiKonteksApi({
        aksi: aksiApi,
        no_rawat: konteks.baris.no_rawat,
        nilai: aksi.nilai,
      }).then((res) => {
        tampilkanToast(res.pesan, res.ok ? "sukses" : "error");
        if (res.ok) setVersiTabel((v) => v + 1);
      });
      return;
    }
    if (aksi.jenis === "ganti") {
      setAksiDialog({
        tipe: "ganti",
        aksiApi: aksi.aksiApi,
        label: aksi.label,
        no_rawat: konteks.baris.no_rawat,
        nm_pasien: konteks.baris.nm_pasien,
      });
      return;
    }
    if (aksi.jenis === "hapus") {
      setAksiDialog({
        tipe: "hapus",
        target: aksi.target,
        label: aksi.label,
        no_rawat: konteks.baris.no_rawat,
        nm_pasien: konteks.baris.nm_pasien,
      });
    }
  }, [menuKonteks, router, tampilkanToast]);

  const payloadForm = useCallback(() => ({
    no_reg: noReg,
    no_rawat: noRawat,
    tgl_registrasi: tglReg,
    jam_reg: jamReg,
    kd_dokter: kdDokter,
    no_rkm_medis: noRm,
    kd_poli: POLI_IGD,
    kd_pj: kdPj,
    p_jawab: penanggungJawab,
    almt_pj: almtPj,
    hubunganpj: hubunganPj,
    asal_rujukan: asalRujukan,
    stts: statusRawat,
    status_bayar: statusBayar,
  }), [almtPj, asalRujukan, hubunganPj, jamReg, kdDokter, kdPj, noRawat, noReg, noRm, penanggungJawab, statusBayar, statusRawat, tglReg]);

  const handleSimpan = useCallback(async () => {
    if (terpilih || !nomorSiap || sedangMenyimpan) return;
    if (!noRm.trim() || !nmPasien.trim() || !kdDokter.trim() || !kdPj.trim()) {
      tampilkanToast("Pilih pasien, dokter, dan jenis bayar terlebih dahulu!", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const res = await fetch("/api/igd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadForm()),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal menyimpan registrasi IGD");
      tampilkanToast(`Registrasi IGD ${json.data.no_rawat} (No. Reg. ${json.data.no_reg}) berhasil disimpan.`, "sukses");
      resetForm();
      setVersiTabel((versi) => versi + 1);
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal menyimpan registrasi IGD", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  }, [kdDokter, kdPj, nmPasien, noRm, nomorSiap, payloadForm, resetForm, sedangMenyimpan, tampilkanToast, terpilih]);

  const handleGanti = useCallback(async () => {
    if (!terpilih || sedangMenyimpan) return;
    if (!noRm.trim() || !nmPasien.trim() || !kdDokter.trim() || !kdPj.trim()) {
      tampilkanToast("Pilih pasien, dokter, dan jenis bayar terlebih dahulu!", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const res = await fetch("/api/igd", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadForm()),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memperbarui registrasi IGD");
      tampilkanToast(`Registrasi IGD ${terpilih.no_rawat} berhasil diperbarui.`, "sukses");
      resetForm();
      setVersiTabel((versi) => versi + 1);
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal memperbarui registrasi IGD", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  }, [kdDokter, kdPj, nmPasien, noRm, payloadForm, resetForm, sedangMenyimpan, tampilkanToast, terpilih]);

  const handleBukaDialogHapus = useCallback(() => {
    if (!terpilih) {
      tampilkanToast("Pilih data registrasi IGD pada tabel terlebih dahulu!", "error");
      return;
    }
    setDialogHapusBuka(true);
  }, [tampilkanToast, terpilih]);

  const handleKonfirmasiHapus = useCallback(async () => {
    if (!terpilih || sedangMenghapus || sedangMenyimpan) return;
    setSedangMenghapus(true);
    try {
      const res = await fetch(`/api/igd?no_rawat=${encodeURIComponent(terpilih.no_rawat)}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal menghapus registrasi IGD");
      tampilkanToast(`Registrasi IGD ${terpilih.no_rawat} (${terpilih.nm_pasien}) berhasil dihapus.`, "sukses");
      setDialogHapusBuka(false);
      resetForm();
      setVersiTabel((versi) => versi + 1);
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal menghapus registrasi IGD", "error");
    } finally {
      setSedangMenghapus(false);
    }
  }, [resetForm, sedangMenghapus, sedangMenyimpan, tampilkanToast, terpilih]);

  const inputClass = "h-7 min-w-0 rounded-full border border-slate-300 bg-white px-2 text-xs font-normal text-slate-800 focus:outline-none focus:border-primary-600";
  const input = (label: string, value: string, change?: (value: string) => void, readOnly = false, placeholder = "") => (
    <input
      aria-label={label}
      type="text"
      value={value}
      onChange={change ? (event) => change(event.target.value) : undefined}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`${inputClass} w-full`}
    />
  );
  const select = (label: string, value: string, change: (value: string) => void, options: [string, string][]) => (
    <CustomSelect aria-label={label} value={value} onChange={(event) => change(event.target.value)} className="h-7 py-0.5 rounded-md font-normal">
      {value && !options.some(([id]) => id === value) && <option value={value}>{value}</option>}
      {options.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
    </CustomSelect>
  );
  const lookup = (label: string, value: string, change: (value: string) => void, options: [string, string][], fallback?: string) => {
    const items = options.map(([id, name]) => ({ id, label: name }));
    if (value && !items.some((item) => item.id === value)) items.unshift({ id: value, label: fallback || value });
    return <PatientMasterSelect jenis={label} label={label} value={value} items={items} onChange={(id) => change(id)} />;
  };
  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-2">
      <label className="flex items-center gap-1.5 whitespace-nowrap text-slate-700" htmlFor="filter-status-periksa-igd">
        <span>Status :</span>
        <CustomSelect
          id="filter-status-periksa-igd"
          value={statusPeriksa}
          onChange={(event) => setStatusPeriksa(event.target.value)}
          className="h-7 w-32"
          containerClassName="w-32"
        >
          <option value="Semua">Semua</option>
          <option value="Belum">Belum</option>
          <option value="Sudah">Sudah</option>
          <option value="Batal">Batal</option>
        </CustomSelect>
      </label>
      <label className="flex items-center gap-1.5 whitespace-nowrap text-slate-700" htmlFor="filter-sep-igd">
        <span>SEP :</span>
        <CustomSelect
          id="filter-sep-igd"
          value={filterSep}
          onChange={(event) => setFilterSep(event.target.value as FilterSepIgd)}
          className="h-7 w-36"
          containerClassName="w-36"
        >
          <option value="Semua">Semua</option>
          <option value="Belum">Belum Terbit</option>
          <option value="Sudah">Sudah Terbit</option>
        </CustomSelect>
      </label>
    </div>
  );

  return (
    <div className="module-page flex h-full w-full flex-col overflow-y-auto bg-slate-50 p-2 sm:p-3 lg:overflow-hidden">
      <PanelInputData judul=".: Input Data">
        <fieldset
          disabled={sedangMenyimpan || sedangMenghapus}
          onKeyDown={pindahFieldDenganEnter}
          className="max-h-[46vh] overflow-y-auto font-sans text-xs font-normal text-slate-700"
        >
          <GridFormulirModul>
            <section className="space-y-1.5" aria-label="Informasi kunjungan IGD">
              <IgdField label="No. Reg."><div className="w-full max-w-60">{input("No. Registrasi", noReg, undefined, true, "Otomatis")}</div></IgdField>
              <IgdField label="No. Rawat"><div className="w-full max-w-[28rem]">{input("No. Rawat", noRawat, undefined, true, "YYYY/MM/DD/000001")}</div></IgdField>
              <IgdField label="Tgl. Reg.">
                <div className="flex w-full flex-wrap items-center gap-2 xl:flex-nowrap">
                  <input
                    aria-label="Tanggal registrasi IGD"
                    type="date"
                    value={tglReg}
                    onChange={(event) => setTglReg(event.target.value)}
                    className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                  />
                  <span className="text-slate-600">Jam :</span>
                  <input
                    aria-label="Jam registrasi IGD"
                    type="time"
                    step="1"
                    value={jamReg}
                    onChange={(event) => {
                      setJamOtomatis(false);
                      const value = event.target.value;
                      setJamReg(value.length === 5 ? `${value}:00` : value);
                    }}
                    className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 focus:outline-none focus:border-primary-600"
                  />
                  <input
                    aria-label="Jam otomatis"
                    title="Perbarui jam secara otomatis"
                    type="checkbox"
                    checked={jamOtomatis}
                    disabled={!!terpilih}
                    onChange={(event) => setJamOtomatis(event.target.checked)}
                    className="shrink-0 accent-primary-700"
                  />
                </div>
              </IgdField>
              <IgdField label="Dr Dituju">
                {lookup("Dokter dituju", kdDokter, setKdDokter, daftarDokter.map((item) => [item.kd_dokter, item.nm_dokter]), terpilih?.nm_dokter)}
              </IgdField>
              <IgdField label="Unit">
                <div className="w-20 shrink-0">{input("Kode unit IGD", POLI_IGD, undefined, true)}</div>
                <span className="text-slate-700">IGD</span>
              </IgdField>
            </section>
            <section className="space-y-1.5" aria-label="Pasien dan penjamin IGD">
              <IgdField label="No. Rekam Medik" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <input aria-label="No. Rekam Medis pasien" type="text" value={noRm} readOnly placeholder="No. RM" className={`${inputClass} w-28 shrink-0 bg-slate-50`} />
                {input("Nama pasien", nmPasien, undefined, true, "Nama pasien")}
                <button type="button" onClick={() => setModalPasienBuka(true)} aria-label="Cari data pasien" title="Cari Data Pasien" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"><FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" /></button>
              </IgdField>
              <IgdField label="Penanggung Jawab" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)]">
                  {input("Penanggung jawab", penanggungJawab, setPenanggungJawab)}
                  <span className="text-slate-600">Hubungan :</span>
                  {select("Hubungan penanggung jawab", hubunganPj, setHubunganPj, ["DIRI SENDIRI", "AYAH", "IBU", "ISTRI", "SUAMI", "SAUDARA", "ANAK", "LAIN-LAIN", "KELUARGA"].map((value) => [value, value]))}
                </div>
              </IgdField>
              <IgdField label="Alamat P.J." labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)]">
                  {input("Alamat penanggung jawab", almtPj, setAlmtPj)}
                  <span className="text-slate-600">Status :</span>
                  {input("Status pasien", statusPasien, undefined, true)}
                </div>
              </IgdField>
              <IgdField label="Jenis Bayar" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)]">
                  {lookup("Jenis bayar", kdPj, setKdPj, daftarPenjab.map((item) => [item.kd_pj, item.png_jawab]), terpilih?.png_jawab || namaPenjab || undefined)}
                  <span className="whitespace-nowrap text-slate-600">No. Ka :</span>
                  {input("Nomor kartu peserta", noKartu, undefined, true)}
                </div>
              </IgdField>
              <IgdField label="Asal Rujukan" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                {input("Asal rujukan", asalRujukan, setAsalRujukan)}
              </IgdField>
            </section>
          </GridFormulirModul>
        </fieldset>
      </PanelInputData>

      <section className="flex h-[32rem] flex-none flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm lg:h-auto lg:min-h-0 lg:flex-1">
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[1180px] border-collapse text-[11px]">
            <caption className="sr-only">Daftar kunjungan IGD periode {tanggalMulai} sampai {tanggalSelesai}</caption>
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">No. Reg</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">No. Rawat</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Waktu Masuk</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">No. RM</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 min-w-[160px]">Nama Pasien</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">JK</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Umur</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 min-w-[160px]">Dokter Jaga</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Penanggung Jawab</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">Status Lanjut</th>
                <th scope="col" className="border-b border-slate-200 px-2 py-2 text-center">Status Periksa</th>
              </tr>
            </thead>
            <tbody>
              {memuat ? (
                <tr>
                  <td colSpan={11} className="px-2 py-12 text-center text-slate-400">Memuat data pasien IGD...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-2 py-12 text-center text-slate-500">
                    <FontAwesomeIcon icon={faTruckMedical} className="mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
                    <p>Tidak ada kunjungan IGD pada periode ini</p>
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const kunci = kunciBaris(item);
                  return (
                    <tr
                      key={kunci}
                      tabIndex={0}
                      aria-selected={barisTerpilih === kunci}
                      onClick={() => handlePilihData(item)}
                      onContextMenu={(event) => bukaMenuKonteks(event, item)}
                      onKeyDown={(event) => bukaMenuKonteksDariKeyboard(event, item)}
                      className={`border-b border-slate-100 text-slate-700 outline-none focus-visible:bg-primary-50/60 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-600 ${barisTerpilih === kunci ? "bg-primary-50/60" : "even:bg-slate-50/70 hover:bg-slate-50"}`}
                    >
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center font-mono text-slate-800">{item.no_reg}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rawat}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-600">
                        {item.tgl_registrasi} <span className="text-slate-500">{item.jam_reg}</span>
                      </td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rkm_medis}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-slate-800">{item.nm_pasien}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center text-slate-600">{item.jk}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-slate-600">{item.umurdaftar} {item.sttsumur}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-slate-700">{item.nm_dokter}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-[11px] text-slate-600">{item.p_jawab || "-"}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center text-slate-700">{item.status_lanjut || "-"}</td>
                      <td className="px-2 py-1.5 text-center">
                        <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold ${warnaStatus(item.stts)}`}>{item.stts}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        aksiUtama={terpilih ? "ganti" : "simpan"}
        onSimpan={handleSimpan}
        disabledSimpan={!!terpilih || !isAuthenticated || !nomorSiap || !noRm.trim() || !kdDokter || !kdPj || sedangMenyimpan || sedangMenghapus}
        onBaru={resetForm}
        onGanti={handleGanti}
        disabledGanti={!terpilih || terpilih.status_bayar === "Sudah Bayar" || sedangMenyimpan || sedangMenghapus}
        onHapus={handleBukaDialogHapus}
        disabledHapus={!terpilih || terpilih.status_bayar === "Sudah Bayar" || sedangMenyimpan || sedangMenghapus}
        memuat={memuat || sedangMenyimpan || sedangMenghapus}
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={setTanggalMulai}
        onGantiTanggalSelesai={setTanggalSelesai}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={cariSekarang}
        onSemua={resetFilter}
        placeholderCari="No. Rawat, No. RM, Pasien, Dokter..."
        filterTambahan={filterTambahan}
        jumlahRecord={totalData}
      />

      <MenuKonteksIgd
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
      <PilihPasienDialog
        terbuka={modalPasienBuka}
        endpoint="/api/igd/options"
        pencarianAwal={noRm}
        onTutup={() => setModalPasienBuka(false)}
        onPilih={isiPasien}
        onError={(pesan) => tampilkanToast(pesan, "error")}
      />
      <KonfirmasiDialog
        terbuka={dialogHapusBuka}
        judul="Hapus registrasi IGD"
        pesan={`Hapus registrasi IGD No. Rawat ${terpilih?.no_rawat || "-"} untuk ${terpilih?.nm_pasien || "-"}?`}
        subPesan="Data pelayanan atau transaksi yang sudah terhubung tidak dapat dihapus."
        sedangMemproses={sedangMenghapus}
        onBatal={() => setDialogHapusBuka(false)}
        onKonfirmasi={() => { void handleKonfirmasiHapus(); }}
      />
      <Toast
        message={toast?.pesan || null}
        tipe={toast?.tipe}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

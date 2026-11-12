"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PatientMasterSelect } from '@/components/pasien/PatientMasterSelect';
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { useAuth } from "@/components/auth/AuthContext";
import { registrationDate } from "@/lib/registrasi/date";
import type { RegistrationNumbers } from "@/lib/registrasi/numbering";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faMagnifyingGlass,
  faPlus,
  faXmark,
  faSpinner,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface DokterOption { kd_dokter: string; nm_dokter: string }
interface PoliOption { kd_poli: string; nm_poli: string; registrasi: number; registrasilama: number }
interface PenjaminOption { kd_pj: string; png_jawab: string }
interface PasienOption { no_rkm_medis: string; nm_pasien: string; alamat: string; namakeluarga: string; keluarga: string; kd_pj: string; jk: string; no_tlp: string; no_peserta: string; tgl_daftar: string }

interface PasienReg {
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
  kd_pj?: string;
  png_jawab?: string;
  p_jawab: string;
  almt_pj: string;
  hubunganpj: string;
  biaya_reg: number;
  stts: string;
  status_bayar: string;
  asal_rujukan: string;
  stts_daftar: string;
  no_peserta: string;
  tgl_daftar_pasien: string;
}

function RegistrationField({label,children,labelWidth="lg:grid-cols-[4.5rem_minmax(0,1fr)]"}:{label:string;children:React.ReactNode;labelWidth?:string}) {
  return <div className={`grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] ${labelWidth} min-w-0`} role="group" aria-label={label}>
    <span className="font-sans text-xs font-normal text-slate-700 sm:text-right whitespace-nowrap">{label} :</span>
    <div className="flex min-w-0 items-center gap-2">{children}</div>
  </div>;
}

export default function HalamanRegistrasi() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<PasienReg[]>([]);
  const [terpilih, setTerpilih] = useState<PasienReg | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const [dialogHapusBuka, setDialogHapusBuka] = useState(false);
  const [sedangMenghapus, setSedangMenghapus] = useState(false);

  // Helper menampilkan Toast Feedback
  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  // Filter States
  const hariIni = registrationDate();
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [filterDokter, setFilterDokter] = useState("");
  const [filterPoli, setFilterPoli] = useState("");
  const [statusBayar, setStatusBayar] = useState("Semua");
  const [halaman, setHalaman] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [versiTabel, setVersiTabel] = useState(0);
  const permintaanTabel = useRef<AbortController | null>(null);
  const permintaanPasien = useRef<AbortController | null>(null);
  const permintaanIdentitas = useRef<AbortController | null>(null);
  const timerPasien = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    permintaanTabel.current?.abort();
    permintaanPasien.current?.abort();
    permintaanIdentitas.current?.abort();
    if (timerPasien.current) clearTimeout(timerPasien.current);
  }, []);

  // Options dari database
  const [daftarDokter, setDaftarDokter] = useState<DokterOption[]>([]);
  const [daftarPoli, setDaftarPoli] = useState<PoliOption[]>([]);
  const [daftarPenjab, setDaftarPenjab] = useState<PenjaminOption[]>([]);

  // Form Input Data States (sesuai DlgReg.java)
  const [nomorBerikutnya, setNomorBerikutnya] = useState<(RegistrationNumbers & { tanggal: string; versi: number }) | null>(null);
  const [versiNomor, setVersiNomor] = useState(0);
  const [tglReg, setTglReg] = useState(hariIni);
  const [jamReg, setJamReg] = useState("");
  const [jamOtomatis, setJamOtomatis] = useState(true);
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [tanggalDaftarPasien, setTanggalDaftarPasien] = useState("");
  const [noKartu, setNoKartu] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [kdPoli, setKdPoli] = useState("");
  const [kdPj, setKdPj] = useState("A09");
  const [penanggungJawab, setPenanggungJawab] = useState("-");
  const [almtPj, setAlmtPj] = useState("-");
  const [hubunganPj, setHubunganPj] = useState("DIRI SENDIRI");
  const [statusRawat, setStatusRawat] = useState("Belum");
  const [sttsBayar, setSttsBayar] = useState("Belum Bayar");
  const [asalRujukan, setAsalRujukan] = useState("-");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  // Mode pencarian live pasien
  const [daftarPasienCari, setDaftarPasienCari] = useState<PasienOption[]>([]);
  const [modalPasienBuka, setModalPasienBuka] = useState(false);
  const [kataCariPasien, setKataCariPasien] = useState("");
  const [sedangMemuatPasien, setSedangMemuatPasien] = useState(false);

  // Pertahankan pratinjau saat dokter/poli berubah agar input dan tombol tidak
  // berkedip. Server tetap menentukan nomor final saat registrasi disimpan.
  const nomorSiap = nomorBerikutnya?.tanggal === tglReg && nomorBerikutnya.versi === versiNomor;
  const noRawat = terpilih?.no_rawat || (nomorSiap ? nomorBerikutnya.no_rawat : "");
  const noReg = terpilih?.no_reg || (nomorSiap ? nomorBerikutnya.no_reg : "");
  const statusPasien = !noRm || !nmPasien ? ""
    : terpilih && terpilih.no_rkm_medis === noRm && terpilih.tgl_registrasi === tglReg
      ? terpilih.stts_daftar
      : tanggalDaftarPasien ? (tanggalDaftarPasien === tglReg ? "Baru" : "Lama") : "";

  useEffect(() => {
    if (terpilih || !isAuthenticated || !tglReg || !kdDokter || !kdPoli) return;
    const controller = new AbortController();
    async function muatNomor() {
      try {
        const params = new URLSearchParams({ tanggal: tglReg, dokter: kdDokter, poli: kdPoli });
        const res = await fetch(`/api/registrasi/nomor?${params}`, {
          signal: controller.signal, cache: "no-store",
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat nomor registrasi");
        if (!controller.signal.aborted) {
          setNomorBerikutnya({ ...json.data, tanggal: tglReg, versi: versiNomor });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat nomor registrasi", "error");
        }
      }
    }
    void muatNomor();
    return () => controller.abort();
  }, [terpilih, isAuthenticated, tglReg, kdDokter, kdPoli, versiNomor, tampilkanToast]);

  // Muat opsi dokter, poli, penjab sekali di awal
  useEffect(() => {
    if (!isAuthenticated) return;
    async function muatOpsi() {
      try {
        const res = await fetch("/api/registrasi/options");
        const json = await res.json();
        if (json.success && json.data) {
          setDaftarDokter(json.data.dokter || []);
          setDaftarPoli(json.data.poli || []);
          setDaftarPenjab(json.data.penjab || []);
          if (json.data.dokter?.length > 0) {
            setKdDokter(json.data.dokter[0].kd_dokter);
          }
          if (json.data.poli?.length > 0) {
            setKdPoli(json.data.poli[0].kd_poli);

          }
          if (json.data.penjab?.length > 0) {
            setKdPj(json.data.penjab[0].kd_pj);
          }
        }
      } catch (e) {
        console.error("Gagal muat opsi:", e);
      }
    }
    muatOpsi();
  }, [isAuthenticated]);

  // Update jam otomatis jika form baru
  useEffect(() => {
    if (terpilih || !jamOtomatis) return;

    const perbaruiJam = () => setJamReg(new Date().toTimeString().slice(0, 8));
    // Sinkronkan dengan jam browser saat mount, tanpa menunggu tick pertama.
    perbaruiJam();
    const timer = setInterval(perbaruiJam, 1000);
    return () => clearInterval(timer);
  }, [terpilih, jamOtomatis]);

  // Fungsi Reset / Baru (emptTeks() di DlgReg.java - mereset text & combobox)
  const resetForm = useCallback(() => {
    const sekarang = new Date();
    const tgl = registrationDate(sekarang);
    const jam = sekarang.toTimeString().slice(0, 8);

    permintaanIdentitas.current?.abort();
    setTerpilih(null);
    setVersiNomor((versi) => versi + 1);
    setTglReg(tgl);
    setJamReg(jam);
    setJamOtomatis(true);
    setNoRm("");
    setNmPasien("");
    setNoKartu("");
    setTanggalDaftarPasien("");
    setPenanggungJawab("-");
    setAlmtPj("-");
    setAsalRujukan("-");
    setStatusRawat("Belum");

    // Reset seluruh pilihan dropdown / combobox ke nilai default awal
    setHubunganPj("DIRI SENDIRI");
    setSttsBayar("Belum Bayar");
    if (daftarDokter.length > 0) {
      setKdDokter(daftarDokter[0].kd_dokter);
    }
    if (daftarPoli.length > 0) {
      setKdPoli(daftarPoli[0].kd_poli);

    }
    if (daftarPenjab.length > 0) {
      setKdPj(daftarPenjab[0].kd_pj);
    }
  }, [daftarDokter, daftarPoli, daftarPenjab]);

  // Fetch Data Tabel
  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    permintaanTabel.current?.abort();
    const controller = new AbortController();
    permintaanTabel.current = controller;
    setMemuat(true);
    try {
      const url = new URL("/api/registrasi", window.location.origin);
      if (tanggalMulai) url.searchParams.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("status_bayar", statusBayar);
      url.searchParams.set("page", String(halaman));
      if (filterDokter.trim()) url.searchParams.set("kd_dokter", filterDokter.trim());
      if (filterPoli.trim()) url.searchParams.set("kd_poli", filterPoli.trim());
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString(), { signal: controller.signal });
      const json = await res.json();
      if (controller.signal.aborted) return;
      if (json.success) {
        setData(json.data || []);
        setTotalData(json.total);
        setHalaman(json.page);
      } else {
        tampilkanToast(json.error || "Gagal memuat data registrasi", "error");
      }
    } catch (err: unknown) {
      if (!controller.signal.aborted) tampilkanToast(err instanceof Error ? err.message : "Terjadi kesalahan jaringan", "error");
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [isAuthenticated, tanggalMulai, tanggalSelesai, filterDokter, filterPoli, kataKunci, statusBayar, halaman, tampilkanToast]);

  useEffect(() => {
    permintaanTabel.current?.abort();
    const timer = setTimeout(() => { void muatData(); }, 150);
    return () => { clearTimeout(timer); permintaanTabel.current?.abort(); };
  }, [muatData, versiTabel]);

  // Handle Klik Baris Tabel (getData() di DlgReg.java)
  const handlePilihData = (item: PasienReg) => {
    if (sedangMenyimpan || sedangMenghapus) return;
    permintaanIdentitas.current?.abort();
    setTerpilih(item);
    setTglReg(item.tgl_registrasi);
    setJamReg(item.jam_reg);
    setJamOtomatis(false);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setNoKartu(item.no_peserta || "");
    setTanggalDaftarPasien(item.tgl_daftar_pasien || "");
    setKdDokter(item.kd_dokter);
    setKdPoli(item.kd_poli);
    setKdPj(item.kd_pj || "A09");
    setPenanggungJawab(item.p_jawab || "-");
    setAlmtPj(item.almt_pj || "-");
    setHubunganPj(item.hubunganpj || "Keluarga");

    setStatusRawat(item.stts || "Belum");
    setSttsBayar(item.status_bayar || "Belum Bayar");
    setAsalRujukan(item.asal_rujukan || "-");
  };

  // Simpan Data Baru (BtnSimpanActionPerformed di DlgReg.java)
  const handleSimpan = async () => {
    if (terpilih || !nomorSiap || sedangMenyimpan) return;
    if (!noRm.trim() || !nmPasien.trim() || !kdDokter.trim() || !kdPoli.trim()) {
      tampilkanToast("Pilih pasien yang valid, dokter, dan unit poli terlebih dahulu!", "error");
      return;
    }

    setSedangMenyimpan(true);

    try {
      const res = await fetch("/api/registrasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          no_reg: noReg,
          tgl_registrasi: tglReg,
          jam_reg: jamReg,
          kd_dokter: kdDokter,
          no_rkm_medis: noRm,
          kd_poli: kdPoli,
          kd_pj: kdPj,
          p_jawab: penanggungJawab,
          almt_pj: almtPj,
          hubunganpj: hubunganPj,
          asal_rujukan: asalRujukan,
          stts: statusRawat,
          status_bayar: sttsBayar,
        }),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(`Registrasi ${json.data.no_rawat} (No. Reg. ${json.data.no_reg}) berhasil disimpan!`, "sukses");
        muatData();
        resetForm();
      } else {
        tampilkanToast(json.error || "Gagal menyimpan data registrasi", "error");
      }
    } catch (err: unknown) {
      tampilkanToast(err instanceof Error ? err.message : "Gagal menyimpan ke server", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Ganti / Edit Data Registrasi (BtnEditActionPerformed di DlgReg.java)
  const handleGanti = async () => {
    if (sedangMenyimpan) return;
    if (!terpilih) {
      tampilkanToast("Pilih data registrasi pada tabel yang ingin diubah terlebih dahulu!", "error");
      return;
    }
    if (!noRm.trim() || !nmPasien.trim() || !kdDokter.trim() || !kdPoli.trim()) {
      tampilkanToast("Pilih pasien yang valid, dokter, dan unit poli terlebih dahulu!", "error");
      return;
    }

    setSedangMenyimpan(true);

    try {
      const res = await fetch("/api/registrasi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          no_reg: noReg,
          tgl_registrasi: tglReg,
          jam_reg: jamReg,
          kd_dokter: kdDokter,
          no_rkm_medis: noRm,
          kd_poli: kdPoli,
          kd_pj: kdPj,
          p_jawab: penanggungJawab,
          almt_pj: almtPj,
          hubunganpj: hubunganPj,
          asal_rujukan: asalRujukan,
          stts: statusRawat,
          status_bayar: sttsBayar,
        }),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(
          `Data registrasi No. Rawat ${noRawat} (${nmPasien || terpilih.nm_pasien}) berhasil diperbarui!`,
          "sukses"
        );
        resetForm();
        muatData();
      } else {
        tampilkanToast(json.error || "Gagal memperbarui data registrasi", "error");
      }
    } catch (err: unknown) {
      tampilkanToast(err instanceof Error ? err.message : "Gagal menghubungi server", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Buka Dialog Konfirmasi Hapus
  const handleBukaDialogHapus = () => {
    if (!terpilih) {
      tampilkanToast("Pilih data registrasi pada tabel yang ingin dihapus terlebih dahulu!", "error");
      return;
    }
    setDialogHapusBuka(true);
  };

  // Eksekusi Hapus Data (BtnHapusActionPerformed di DlgReg.java)
  const handleKonfirmasiHapus = async () => {
    if (!terpilih || sedangMenghapus || sedangMenyimpan) return;
    setSedangMenghapus(true);

    try {
      const res = await fetch(`/api/registrasi?no_rawat=${encodeURIComponent(terpilih.no_rawat)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        tampilkanToast(
          `Data registrasi No. Rawat ${terpilih.no_rawat} (${terpilih.nm_pasien}) berhasil dihapus.`,
          "sukses"
        );
        resetForm();
        muatData();
        setDialogHapusBuka(false);
      } else {
        tampilkanToast(json.error || "Gagal menghapus data", "error");
      }
    } catch (err: unknown) {
      tampilkanToast(err instanceof Error ? err.message : "Gagal menghapus data", "error");
    } finally {
      setSedangMenghapus(false);
    }
  };

  // Cetak Data Registrasi
  const handleCetak = () => {
    if (data.length === 0) {
      tampilkanToast("Tidak ada data registrasi untuk dicetak!", "info");
      return;
    }
    window.print();
  };

  // Cari Pasien untuk tombol BtnPasien (langsung memuat saat kosong)
  const handleCariPasien = (query: string = "") => {
    setKataCariPasien(query);
    permintaanPasien.current?.abort();
    if (timerPasien.current) clearTimeout(timerPasien.current);
    const controller = new AbortController();
    permintaanPasien.current = controller;
    setSedangMemuatPasien(true);
    setDaftarPasienCari([]);
    timerPasien.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/registrasi/options?jenis=pasien&cari=${encodeURIComponent(query)}`, { signal: controller.signal });
        const json = await res.json();
        if (controller.signal.aborted) return;
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal mencari pasien");
        setDaftarPasienCari(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal mencari pasien", "error");
      } finally {
        if (!controller.signal.aborted) setSedangMemuatPasien(false);
      }
    }, query ? 200 : 0);
  };

  const handleBukaModalPasien = () => {
    setModalPasienBuka(true);
    handleCariPasien(noRm || "");
  };

  const isiPasien = (p: PasienOption) => {
    setNoRm(p.no_rkm_medis);
    setNmPasien(p.nm_pasien);
    setNoKartu(p.no_peserta || "");
    setTanggalDaftarPasien(p.tgl_daftar || "");
    setPenanggungJawab(p.namakeluarga || p.nm_pasien || "-");
    setAlmtPj(p.alamat || "-");
    setHubunganPj(p.keluarga || "DIRI SENDIRI");
    if (p.kd_pj) {
      setKdPj(p.kd_pj);
    }
  };

  const handlePilihPasienCari = (p: PasienOption) => {
    permintaanIdentitas.current?.abort();
    isiPasien(p);
    setModalPasienBuka(false);
  };

  const cariIdentitas = async () => {
    permintaanIdentitas.current?.abort();
    if (!noRm.trim() || nmPasien) return;
    const controller = new AbortController();
    permintaanIdentitas.current = controller;
    try {
      const res = await fetch(`/api/registrasi/options?jenis=pasien&rm=${encodeURIComponent(noRm.trim())}`, { signal: controller.signal });
      const json = await res.json();
      if (controller.signal.aborted) return;
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat identitas pasien");
      if (!json.data?.[0]) throw new Error("No. Rekam Medis tidak ditemukan.");
      isiPasien(json.data[0]);
    } catch (error) {
      if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat pasien", "error");
    }
  };

  const dataTersaring = data;

  const inputClass = "h-7 min-w-0 rounded-full border border-slate-300 bg-white px-2 text-xs font-normal text-slate-800 focus:outline-none focus:border-emerald-600";
  const input = (label:string,value:string,change?: (value:string)=>void,readOnly=false,placeholder='') => (
    <input aria-label={label} type="text" value={value} onChange={change ? (event)=>change(event.target.value) : undefined} readOnly={readOnly} placeholder={placeholder} className={`${inputClass} w-full`} />
  );
  const select = (label:string,value:string,change:(value:string)=>void,options:[string,string][],fallback?:string) => (
    <CustomSelect aria-label={label} value={value} onChange={(event)=>change(event.target.value)} className="h-7 py-0.5 rounded-md font-normal">
      {value && !options.some(([id])=>id===value) && <option value={value}>{fallback || value}</option>}
      {options.map(([id,name])=><option key={id} value={id}>{name}</option>)}
    </CustomSelect>
  );
  const lookup = (label:string,value:string,change:(value:string)=>void,options:[string,string][],fallback?:string) => {
    const items=options.map(([id,name])=>({id,label:name}));
    if(value && !items.some((item)=>item.id===value)) items.unshift({id:value,label:fallback || value});
    return <PatientMasterSelect jenis={label} label={label} value={value} items={items} onChange={(id)=>change(id)} />;
  };
  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-y-auto bg-slate-50 p-2 sm:p-3 lg:overflow-hidden">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Registrasi & Pendaftaran Pasien"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* Dua kolom aktif dan satu kolom cadangan untuk pengembangan berikutnya. */}
      <PanelInputData
        judul=".: Input Data"
      >
        <fieldset disabled={sedangMenyimpan || sedangMenghapus} className="max-h-[46vh] overflow-y-auto font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul>
            <section className="space-y-1.5" aria-label="Informasi kunjungan">
              <RegistrationField label="No. Reg."><div className="w-full max-w-60">{input('No. Registrasi',noReg,undefined,true,'Otomatis')}</div></RegistrationField>
              <RegistrationField label="No. Rawat"><div className="w-full max-w-[28rem]">{input('No. Rawat',noRawat,undefined,true,'YYYY/MM/DD/000001')}</div></RegistrationField>
              <RegistrationField label="Tgl. Reg.">
                <div className="flex flex-wrap xl:flex-nowrap items-center gap-2 w-full">
                  <input aria-label="Tanggal registrasi" type="date" value={tglReg} onChange={(event)=>setTglReg(event.target.value)} className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600" />
                  <span className="text-slate-600">Jam :</span>
                  <input
                    aria-label="Jam registrasi"
                    type="time"
                    step="1"
                    value={jamReg}
                    onChange={(event) => {
                      setJamOtomatis(false);
                      const value = event.target.value;
                      setJamReg(value.length === 5 ? `${value}:00` : value);
                    }}
                    className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                  <input aria-label="Jam otomatis" title="Perbarui jam secara otomatis" type="checkbox" checked={jamOtomatis} disabled={!!terpilih} onChange={(event)=>setJamOtomatis(event.target.checked)} className="shrink-0 accent-emerald-700" />
                </div>
              </RegistrationField>
              <RegistrationField label="Dr Dituju">
                {lookup('Dokter dituju',kdDokter,setKdDokter,daftarDokter.map((item)=>[item.kd_dokter,item.nm_dokter]),terpilih?.nm_dokter)}
              </RegistrationField>
              <RegistrationField label="Unit">
                <div className="w-20 shrink-0">{input('Kode unit',kdPoli,undefined,true)}</div>
                {lookup('Unit poliklinik',kdPoli,setKdPoli,daftarPoli.map((item)=>[item.kd_poli,item.nm_poli]),terpilih?.nm_poli)}
              </RegistrationField>
            </section>
            <section className="space-y-1.5" aria-label="Pasien dan penjamin">
              <RegistrationField label="No. Rekam Medik" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <input aria-label="No. Rekam Medis pasien" type="text" value={noRm} onChange={(event)=>{
                  permintaanIdentitas.current?.abort();
                  setNoRm(event.target.value); setNmPasien(''); setNoKartu(''); setTanggalDaftarPasien('');
                  setPenanggungJawab('-'); setAlmtPj('-'); setHubunganPj('DIRI SENDIRI');
                }} onBlur={()=>{void cariIdentitas();}} placeholder="No. RM" className={`${inputClass} w-28 shrink-0`} />
                {input('Nama pasien',nmPasien,undefined,true,'Nama pasien')}
                <button type="button" onClick={handleBukaModalPasien} aria-label="Cari data pasien" title="Cari Data Pasien" className="h-7 w-7 shrink-0 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"><FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" /></button>
              </RegistrationField>
              <RegistrationField label="Penanggung Jawab" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)] gap-2 items-center w-full">
                  {input('Penanggung jawab',penanggungJawab,setPenanggungJawab)}
                  <span className="text-slate-600">Hubungan :</span>
                  {select('Hubungan penanggung jawab',hubunganPj,setHubunganPj,['DIRI SENDIRI','AYAH','IBU','ISTRI','SUAMI','SAUDARA','ANAK','LAIN-LAIN','KELUARGA'].map((value)=>[value,value]))}
                </div>
              </RegistrationField>
              <RegistrationField label="Alamat P.J." labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)] gap-2 items-center w-full">
                  {input('Alamat penanggung jawab',almtPj,setAlmtPj)}
                  <span className="text-slate-600">Status :</span>
                  {input('Status pasien',statusPasien,undefined,true)}
                </div>
              </RegistrationField>
              <RegistrationField label="Jenis Bayar" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.8fr)] gap-2 items-center w-full">
                  {lookup('Jenis bayar',kdPj,setKdPj,daftarPenjab.map((item)=>[item.kd_pj,item.png_jawab]),terpilih?.png_jawab)}
                  <span className="text-slate-600 whitespace-nowrap">No. Ka :</span>
                  {input('Nomor kartu peserta',noKartu,undefined,true)}
                </div>
              </RegistrationField>
              <RegistrationField label="Asal Rujukan" labelWidth="lg:grid-cols-[7.5rem_minmax(0,1fr)]">{input('Asal rujukan',asalRujukan,setAsalRujukan)}</RegistrationField>
            </section>
          </GridFormulirModul>
        </fieldset>
      </PanelInputData>

      {/* 3. Tabel Data Registrasi (tbPetugas di DlgReg.java) */}
      <div className="flex-none h-[32rem] lg:h-auto lg:flex-1 lg:min-h-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <caption className="sr-only">Daftar registrasi pasien. Pilih nomor registrasi untuk memuat data ke formulir.</caption>
            <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200 shadow-2xs">
              <tr>
                <th scope="col" className="py-2 px-2.5 text-center w-14">No.Reg</th>
                <th scope="col" className="py-2 px-2.5">No. Rawat</th>
                <th scope="col" className="py-2 px-2.5">Tgl & Jam Reg</th>
                <th scope="col" className="py-2 px-2.5">No. RM</th>
                <th scope="col" className="py-2 px-2.5">Nama Pasien</th>
                <th scope="col" className="py-2 px-2.5 text-center w-10">JK</th>
                <th scope="col" className="py-2 px-2.5">Umur</th>
                <th scope="col" className="py-2 px-2.5">Poliklinik / Unit</th>
                <th scope="col" className="py-2 px-2.5">Dokter Dituju</th>
                <th scope="col" className="py-2 px-2.5">Penanggung Jawab</th>
                <th scope="col" className="py-2 px-2.5 text-center">Status Rawat</th>
                <th scope="col" className="py-2 px-2.5 text-center">Status Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-500 font-sans">
                    Memuat data registrasi...
                  </td>
                </tr>
              ) : dataTersaring.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faHospitalUser} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data registrasi yang sesuai</p>
                  </td>
                </tr>
              ) : (
                dataTersaring.map((item) => (
                  <tr
                    key={item.no_rawat}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer ${
                      terpilih?.no_rawat === item.no_rawat
                        ? "bg-emerald-50/90 text-slate-700"
                        : "hover:bg-slate-50/80 text-slate-700"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center font-bold text-slate-700">
                      <button type="button" aria-label={`Pilih registrasi ${item.no_rawat} untuk ${item.nm_pasien}`} aria-pressed={terpilih?.no_rawat === item.no_rawat} onClick={(event)=>{event.stopPropagation();handlePilihData(item);}} className="rounded px-1 py-0.5 font-normal hover:underline">{item.no_reg}</button>
                    </td>
                    <td className="py-2 px-2.5 font-medium text-slate-800">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_registrasi} <span className="text-slate-400">{item.jam_reg}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${item.jk === "L" ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"}`}>{item.jk}</span>
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.umurdaftar} {item.sttsumur}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700 font-medium">
                      {item.nm_poli}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.p_jawab || "-"} ({item.hubunganpj || "-"})
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {item.stts}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status_bayar === "Sudah Bayar"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.status_bayar}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Panel Bawah (panelGlass6, 7, 8 di DlgReg.java) */}
      <PanelBawah
          tampilan="web"
          aksiUtama={terpilih ? "ganti" : "simpan"}
          onKeluar={() => router.push('/')}
          filterUtama={
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex w-full max-w-80 min-w-0 items-center gap-1.5 sm:w-80">
                <span className="shrink-0 whitespace-nowrap text-left font-normal text-slate-700">Dokter :</span>
                {lookup('Filter dokter',filterDokter,(id)=>{setFilterDokter(id);setHalaman(1);},[['','Semua Dokter'],...daftarDokter.map((item)=>[item.kd_dokter,item.nm_dokter] as [string,string])])}
              </div>
              <div className="flex w-full max-w-80 min-w-0 items-center gap-1.5 sm:w-80">
                <span className="shrink-0 whitespace-nowrap text-left font-normal text-slate-700">Unit :</span>
                {lookup('Filter unit',filterPoli,(id)=>{setFilterPoli(id);setHalaman(1);},[['','Semua Unit'],...daftarPoli.map((item)=>[item.kd_poli,item.nm_poli] as [string,string])])}
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="whitespace-nowrap font-normal text-slate-700">Status bayar :</span>
                <div className="w-28">
                  <CustomSelect aria-label="Filter status bayar" value={statusBayar} onChange={(event)=>{setStatusBayar(event.target.value);setHalaman(1);}} className="h-7 py-0.5 font-normal rounded-md">
                    <option value="Semua">Semua</option><option value="Sudah Bayar">Sudah Bayar</option><option value="Belum Bayar">Belum Bayar</option>
                  </CustomSelect>
                </div>
              </div>
            </div>
          }
          onSimpan={handleSimpan}
          disabledSimpan={!!terpilih || !isAuthenticated || !nomorSiap || !nmPasien.trim() || !kdDokter || !kdPoli || sedangMenyimpan || sedangMenghapus}
          onBaru={resetForm}
          onHapus={handleBukaDialogHapus}
          onGanti={handleGanti}
          onCetak={handleCetak}
          onSemua={() => {
            setKataKunci("");
            setTanggalMulai("");
            setTanggalSelesai("");
            setFilterDokter("");
            setFilterPoli("");
            setStatusBayar("Semua");
            setHalaman(1);
            setVersiTabel((versi) => versi + 1);
          }}
          disabledHapus={!terpilih || terpilih.status_bayar === "Sudah Bayar" || sedangMenyimpan || sedangMenghapus}
          disabledGanti={!terpilih || terpilih.status_bayar === "Sudah Bayar" || sedangMenyimpan || sedangMenghapus}
          tanggalMulai={tanggalMulai}
          tanggalSelesai={tanggalSelesai}
          onGantiTanggalMulai={(value) => { setTanggalMulai(value); setHalaman(1); }}
          onGantiTanggalSelesai={(value) => { setTanggalSelesai(value); setHalaman(1); }}
          kataKunci={kataKunci}
          onGantiKataKunci={(value) => { setKataKunci(value); setHalaman(1); }}
          onCari={muatData}
          placeholderCari="Cari No.Rawat, RM, Pasien..."
          pagination={
            <>
              <span>{data.length} dari {totalData} registrasi · Halaman {halaman} / {Math.max(1, Math.ceil(totalData / 100))}</span>
              <button type="button" disabled={memuat || sedangMenyimpan || sedangMenghapus || halaman <= 1} onClick={() => setHalaman((page) => page - 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman sebelumnya" title="Halaman sebelumnya"><FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" aria-hidden="true" /></button>
              <button type="button" disabled={memuat || sedangMenyimpan || sedangMenghapus || halaman * 100 >= totalData} onClick={() => setHalaman((page) => page + 1)} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman berikutnya" title="Halaman berikutnya"><FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" aria-hidden="true" /></button>
            </>
          }
          tampilkanRecord={false}
          memuat={memuat || sedangMenyimpan || sedangMenghapus}
      />

      {/* Modal Dialog Pencarian Pasien (BtnPasien di DlgReg.java) */}
      {modalPasienBuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-emerald-800 text-white font-bold text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHospitalUser} className="w-3.5 h-3.5 text-emerald-200" />
                <span className="text-sm font-semibold tracking-wide">Cari Data Pasien (Rekam Medis)</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/pasien"
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/60 text-white rounded text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs no-underline"
                  title="Buka Data Pasien & Rekam Medis di halaman ini"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" />
                  <span>Pasien Baru</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setModalPasienBuka(false)}
                  className="text-white hover:text-emerald-200 p-1 font-bold text-sm leading-none ml-1 cursor-pointer"
                  title="Tutup"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input Pencarian Pasien */}
            <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={kataCariPasien}
                  onChange={(e) => handleCariPasien(e.target.value)}
                  placeholder="Ketik No. RM, Nama Pasien, NIK, atau Alamat..."
                  autoFocus
                  className="w-full pl-8 pr-8 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                />
                {kataCariPasien && (
                  <button
                    type="button"
                    onClick={() => handleCariPasien("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    title="Bersihkan Pencarian"
                  >
                    ✕
                  </button>
                )}
              </div>
              {sedangMemuatPasien && (
                <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 text-emerald-600 animate-spin" />
              )}
            </div>

            {/* Tabel Pasien Langsung Tampil */}
            <div className="flex-1 overflow-auto p-2">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b sticky top-0 z-10 shadow-2xs">
                  <tr>
                    <th scope="col" className="p-2 w-24">No. RM</th>
                    <th scope="col" className="p-2">Nama Pasien</th>
                    <th scope="col" className="p-2 w-10 text-center">JK</th>
                    <th scope="col" className="p-2">Alamat</th>
                    <th scope="col" className="p-2 w-28">No. Telp</th>
                    <th scope="col" className="p-2 w-16 text-center">Pilih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {daftarPasienCari.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        {sedangMemuatPasien
                          ? "Sedang memuat data pasien..."
                          : kataCariPasien
                          ? `Pasien dengan kata kunci "${kataCariPasien}" tidak ditemukan.`
                          : "Belum ada data pasien terdaftar."}
                      </td>
                    </tr>
                  ) : (
                    daftarPasienCari.map((p) => (
                      <tr
                        key={p.no_rkm_medis}
                        onClick={() => handlePilihPasienCari(p)}
                        className="hover:bg-emerald-50/70 cursor-pointer"
                      >
                        <td className="p-2 font-mono font-normal text-slate-700">{p.no_rkm_medis}</td>
                        <td className="p-2 font-semibold text-slate-800">{p.nm_pasien}</td>
                        <td className="p-2 text-center text-slate-600">{p.jk}</td>
                        <td className="p-2 text-slate-500 truncate max-w-xs">{p.alamat || "-"}</td>
                        <td className="p-2 text-slate-600 font-mono text-[10px]">{p.no_tlp || "-"}</td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePilihPasienCari(p);
                            }}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow-2xs cursor-pointer"
                          >
                            Pilih
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Modal */}
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
              <span>Menampilkan {daftarPasienCari.length} pasien</span>
              <span>Klik baris untuk langsung memilih pasien</span>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Konfirmasi Hapus Data */}
      <KonfirmasiDialog
        terbuka={dialogHapusBuka}
        judul="Hapus Registrasi Pasien"
        pesan={`Yakin ingin menghapus data registrasi pasien No. Rawat ${terpilih?.no_rawat} (${terpilih?.nm_pasien})?`}
        subPesan="Data pemeriksaan registrasi terkait yang sudah dihapus tidak dapat dipulihkan."
        teksBatal="Batal"
        teksKonfirmasi="Ya, Hapus"
        onBatal={() => setDialogHapusBuka(false)}
        onKonfirmasi={handleKonfirmasiHapus}
        sedangMemproses={sedangMenghapus}
      />

      {/* Toast Notifikasi (Simpan, Edit, Hapus, Error, Info) */}
      <Toast
        key={toast?.key}
        message={toast?.pesan || null}
        tipe={toast?.tipe || "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

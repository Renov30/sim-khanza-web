"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { useAuth } from "@/components/auth/AuthContext";
import { registrationDate } from "@/lib/registrasi/date";
import type { RegistrationNumbers } from "@/lib/registrasi/numbering";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faCircleExclamation,
  faCheckCircle,
  faMagnifyingGlass,
  faUserTie,
  faBuilding,
  faPlus,
  faXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

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
}

export default function HalamanRegistrasi() {
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

  // Options dari database
  const [daftarDokter, setDaftarDokter] = useState<any[]>([]);
  const [daftarPoli, setDaftarPoli] = useState<any[]>([]);
  const [daftarPenjab, setDaftarPenjab] = useState<any[]>([]);

  // Form Input Data States (sesuai DlgReg.java)
  const [nomorBerikutnya, setNomorBerikutnya] = useState<(RegistrationNumbers & { kunci: string }) | null>(null);
  const [versiNomor, setVersiNomor] = useState(0);
  const [tglReg, setTglReg] = useState(hariIni);
  const [jamReg, setJamReg] = useState("");
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [nmDokter, setNmDokter] = useState("");
  const [kdPoli, setKdPoli] = useState("");
  const [nmPoli, setNmPoli] = useState("");
  const [kdPj, setKdPj] = useState("A09");
  const [nmPj, setNmPj] = useState("Umum / Personal");
  const [penanggungJawab, setPenanggungJawab] = useState("-");
  const [almtPj, setAlmtPj] = useState("-");
  const [hubunganPj, setHubunganPj] = useState("DIRI SENDIRI");
  const [biayaReg, setBiayaReg] = useState("0");
  const [statusPoli, setStatusPoli] = useState("Belum");
  const [sttsBayar, setSttsBayar] = useState("Belum Bayar");
  const [asalRujukan, setAsalRujukan] = useState("-");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  // Mode pencarian live pasien
  const [daftarPasienCari, setDaftarPasienCari] = useState<any[]>([]);
  const [modalPasienBuka, setModalPasienBuka] = useState(false);
  const [kataCariPasien, setKataCariPasien] = useState("");
  const [sedangMemuatPasien, setSedangMemuatPasien] = useState(false);

  const kunciNomor = JSON.stringify([tglReg, kdDokter, kdPoli, versiNomor]);
  const nomorSiap = nomorBerikutnya?.kunci === kunciNomor;
  const noRawat = terpilih?.no_rawat || (nomorSiap ? nomorBerikutnya.no_rawat : "");
  const noReg = terpilih?.no_reg || (nomorSiap ? nomorBerikutnya.no_reg : "");

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
        if (!controller.signal.aborted) setNomorBerikutnya({ ...json.data, kunci: kunciNomor });
      } catch (error) {
        if (!controller.signal.aborted) {
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat nomor registrasi", "error");
        }
      }
    }
    void muatNomor();
    return () => controller.abort();
  }, [terpilih, isAuthenticated, tglReg, kdDokter, kdPoli, kunciNomor, tampilkanToast]);

  // Muat opsi dokter, poli, penjab sekali di awal
  useEffect(() => {
    async function muatOpsi() {
      try {
        const res = await fetch("/api/registrasi/options");
        const json = await res.json();
        if (json.success && json.data) {
          setDaftarDokter(json.data.dokter || []);
          setDaftarPoli(json.data.poli || []);
          setDaftarPenjab(json.data.penjab || []);
          if (json.data.dokter?.length > 0 && !kdDokter) {
            setKdDokter(json.data.dokter[0].kd_dokter);
            setNmDokter(json.data.dokter[0].nm_dokter);
          }
          if (json.data.poli?.length > 0 && !kdPoli) {
            setKdPoli(json.data.poli[0].kd_poli);
            setNmPoli(json.data.poli[0].nm_poli);
            setBiayaReg(String(json.data.poli[0].registrasi || 0));
          }
          if (json.data.penjab?.length > 0) {
            setKdPj(json.data.penjab[0].kd_pj);
            setNmPj(json.data.penjab[0].png_jawab);
          }
        }
      } catch (e) {
        console.error("Gagal muat opsi:", e);
      }
    }
    muatOpsi();
  }, []);

  // Update jam otomatis jika form baru
  useEffect(() => {
    if (terpilih) return;

    const perbaruiJam = () => setJamReg(new Date().toTimeString().slice(0, 8));
    // Sinkronkan dengan jam browser saat mount, tanpa menunggu tick pertama.
    perbaruiJam();
    const timer = setInterval(perbaruiJam, 1000);
    return () => clearInterval(timer);
  }, [terpilih]);

  // Fungsi Reset / Baru (emptTeks() di DlgReg.java - mereset text & combobox)
  const resetForm = useCallback(() => {
    const sekarang = new Date();
    const tgl = registrationDate(sekarang);
    const jam = sekarang.toTimeString().slice(0, 8);

    setTerpilih(null);
    setVersiNomor((versi) => versi + 1);
    setTglReg(tgl);
    setJamReg(jam);
    setNoRm("");
    setNmPasien("");
    setPenanggungJawab("-");
    setAlmtPj("-");
    setAsalRujukan("-");
    setStatusPoli("Belum");

    // Reset seluruh pilihan dropdown / combobox ke nilai default awal
    setHubunganPj("DIRI SENDIRI");
    setSttsBayar("Belum Bayar");
    if (daftarDokter.length > 0) {
      setKdDokter(daftarDokter[0].kd_dokter);
      setNmDokter(daftarDokter[0].nm_dokter);
    }
    if (daftarPoli.length > 0) {
      setKdPoli(daftarPoli[0].kd_poli);
      setNmPoli(daftarPoli[0].nm_poli);
      setBiayaReg(String(daftarPoli[0].registrasi || 0));
    }
    if (daftarPenjab.length > 0) {
      setKdPj(daftarPenjab[0].kd_pj);
      setNmPj(daftarPenjab[0].png_jawab);
    }
  }, [daftarDokter, daftarPoli, daftarPenjab]);

  // Fetch Data Tabel
  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const url = new URL("/api/registrasi", window.location.origin);
      if (tanggalMulai && tanggalSelesai) {
        url.searchParams.set("tanggal_mulai", tanggalMulai);
        url.searchParams.set("tanggal_selesai", tanggalSelesai);
      }
      if (filterDokter.trim()) url.searchParams.set("kd_dokter", filterDokter.trim());
      if (filterPoli.trim()) url.searchParams.set("kd_poli", filterPoli.trim());
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        tampilkanToast(json.error || "Gagal memuat data registrasi", "error");
      }
    } catch (err: any) {
      tampilkanToast(err.message || "Terjadi kesalahan jaringan", "error");
    } finally {
      setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai, filterDokter, filterPoli, kataKunci, tampilkanToast]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  // Handle Klik Baris Tabel (getData() di DlgReg.java)
  const handlePilihData = (item: PasienReg) => {
    setTerpilih(item);
    setTglReg(item.tgl_registrasi);
    setJamReg(item.jam_reg);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdDokter(item.kd_dokter);
    setNmDokter(item.nm_dokter);
    setKdPoli(item.kd_poli);
    setNmPoli(item.nm_poli);
    setKdPj(item.kd_pj || "A09");
    setNmPj(item.png_jawab || "Umum");
    setPenanggungJawab(item.p_jawab || "-");
    setAlmtPj(item.almt_pj || "-");
    setHubunganPj(item.hubunganpj || "Keluarga");
    setBiayaReg(String(item.biaya_reg || 0));
    setStatusPoli(item.stts || "Belum");
    setSttsBayar(item.status_bayar || "Belum Bayar");
  };

  // Simpan Data Baru (BtnSimpanActionPerformed di DlgReg.java)
  const handleSimpan = async () => {
    if (terpilih || !nomorSiap || sedangMenyimpan) return;
    if (!noRm.trim() || !kdDokter.trim() || !kdPoli.trim()) {
      tampilkanToast("No. RM, Dokter, dan Unit Poli harus terisi lengkap!", "error");
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
          biaya_reg: Number(biayaReg) || 0,
          stts: statusPoli,
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
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menyimpan ke server", "error");
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
    if (!noRm.trim() || !kdDokter.trim() || !kdPoli.trim()) {
      tampilkanToast("No. RM, Dokter, dan Unit Poli harus terisi lengkap!", "error");
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
          biaya_reg: Number(biayaReg) || 0,
          stts: statusPoli,
          status_bayar: sttsBayar,
        }),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(
          `Data registrasi No. Rawat ${noRawat} (${nmPasien || terpilih.nm_pasien}) berhasil diperbarui!`,
          "sukses"
        );
        muatData();
      } else {
        tampilkanToast(json.error || "Gagal memperbarui data registrasi", "error");
      }
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menghubungi server", "error");
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
    if (!terpilih) return;
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
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menghapus data", "error");
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
  const handleCariPasien = async (query: string = "") => {
    setKataCariPasien(query);
    setSedangMemuatPasien(true);
    try {
      const res = await fetch(`/api/registrasi/options?jenis=pasien&cari=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.success) {
        setDaftarPasienCari(json.data || []);
      }
    } catch (e) {
      console.error("Gagal mencari pasien:", e);
    } finally {
      setSedangMemuatPasien(false);
    }
  };

  const handleBukaModalPasien = () => {
    setModalPasienBuka(true);
    handleCariPasien(noRm || "");
  };

  const handlePilihPasienCari = (p: any) => {
    setNoRm(p.no_rkm_medis);
    setNmPasien(p.nm_pasien);
    setPenanggungJawab(p.namakeluarga || p.nm_pasien || "-");
    setAlmtPj(p.alamat || "-");
    setHubunganPj(p.keluarga || "DIRI SENDIRI");
    if (p.kd_pj) {
      setKdPj(p.kd_pj);
      const pjMatch = daftarPenjab.find((item) => item.kd_pj === p.kd_pj);
      if (pjMatch) setNmPj(pjMatch.png_jawab);
    }
    setModalPasienBuka(false);
  };

  const dataTersaring = data.filter((item) => {
    if (statusBayar === "Semua") return true;
    return item.status_bayar === statusBayar;
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Registrasi & Pendaftaran Pasien"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* 2. Panel Input Data (3 Kolom: Kolom 1 & 2 berisi inputan sesuai DlgReg, Kolom 3 kosong untuk fitur/ekspansi) */}
      <PanelInputData
        judul=".: Input Data"
      >
        <div className="space-y-2.5 text-xs text-slate-700">
          {/* Baris 1: No. Reg | No. Rekam Medik + Pasien | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.75fr] gap-3 lg:gap-4 items-center">
            {/* Kolom 1: No. Reg */}
            <div className="flex items-center gap-2">
              <label className="w-20 font-semibold text-slate-600 shrink-0">No. Reg. :</label>
              <input
                type="text"
                value={noReg}
                readOnly
                className="w-28 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                placeholder="Otomatis"
              />
            </div>

            {/* Kolom 2: No. Rekam Medik & Nama Pasien */}
            <div className="flex items-center gap-2">
              <label className="w-28 font-semibold text-slate-600 shrink-0">No. Rekam Medik :</label>
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <input
                  type="text"
                  value={noRm}
                  onChange={(e) => setNoRm(e.target.value)}
                  placeholder="No. RM..."
                  className="w-24 px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-600 shrink-0"
                />
                <input
                  type="text"
                  value={nmPasien}
                  onChange={(e) => setNmPasien(e.target.value)}
                  placeholder="Nama Pasien..."
                  className="flex-1 min-w-0 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-medium text-slate-800 focus:outline-none focus:border-emerald-600 truncate"
                />
                <button
                  type="button"
                  onClick={handleBukaModalPasien}
                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-2xs font-medium cursor-pointer shrink-0"
                  title="Cari Data Pasien (BtnPasien Alt+1)"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Kolom 3: Kosong untuk ekspansi fitur mendatang */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 2: No. Rawat | Penanggung Jawab & Hubungan | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.75fr] gap-3 lg:gap-4 items-center">
            {/* Kolom 1: No. Rawat */}
            <div className="flex items-center gap-2">
              <label className="w-20 font-semibold text-slate-600 shrink-0">No. Rawat :</label>
              <input
                type="text"
                value={noRawat}
                readOnly
                className="w-56 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                placeholder="YYYY/MM/DD/000001"
              />
            </div>

            {/* Kolom 2: Penanggung Jawab & Hubungan */}
            <div className="flex items-center gap-2">
              <label className="w-28 font-semibold text-slate-600 shrink-0">P. Jawab :</label>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <input
                  type="text"
                  value={penanggungJawab}
                  onChange={(e) => setPenanggungJawab(e.target.value)}
                  placeholder="Nama Penanggung Jawab"
                  className="flex-1 min-w-0 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600"
                />
                <label className="w-20 font-semibold text-slate-600 shrink-0 text-right pr-1.5">Hubungan :</label>
                <div className="w-32 shrink-0">
                  <CustomSelect
                    value={hubunganPj}
                    onChange={(e) => setHubunganPj(e.target.value)}
                  >
                    <option value="DIRI SENDIRI">Diri Sendiri</option>
                    <option value="KELUARGA">Keluarga</option>
                    <option value="AYAH">Ayah</option>
                    <option value="IBU">Ibu</option>
                    <option value="ISTRI">Istri</option>
                    <option value="SUAMI">Suami</option>
                    <option value="ANAK">Anak</option>
                    <option value="SAUDARA">Saudara</option>
                  </CustomSelect>
                </div>
              </div>
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 3: Tgl. Reg & Jam | Alamat P.J. & Status | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.75fr] gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Tgl. Reg & Jam */}
            <div className="flex items-center gap-2">
              <label className="w-20 font-semibold text-slate-600 shrink-0">Tgl. Reg. :</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={tglReg}
                  onChange={(e) => setTglReg(e.target.value)}
                  className="px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600"
                />
                <label className="font-semibold text-slate-600 shrink-0">Jam :</label>
                <input
                  type="text"
                  value={jamReg}
                  onChange={(e) => setJamReg(e.target.value)}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-300 rounded text-center font-mono text-slate-700 focus:outline-none focus:border-emerald-600"
                  title="Jam:Menit:Detik"
                />
              </div>
            </div>

            {/* Kolom 2: Alamat P.J. & Status */}
            <div className="flex items-center gap-2">
              <label className="w-28 font-semibold text-slate-600 shrink-0">Alamat P.J. :</label>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <input
                  type="text"
                  value={almtPj}
                  onChange={(e) => setAlmtPj(e.target.value)}
                  placeholder="Alamat Penanggung Jawab"
                  className="flex-1 min-w-0 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600"
                />
                <label className="w-20 font-semibold text-slate-600 shrink-0 text-right pr-1.5">Status :</label>
                <div className="w-32 shrink-0">
                  <CustomSelect
                    value={statusPoli}
                    onChange={(e) => setStatusPoli(e.target.value)}
                  >
                    <option value="Belum">Belum</option>
                    <option value="Sudah">Sudah</option>
                    <option value="Batal">Batal</option>
                  </CustomSelect>
                </div>
              </div>
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 4: Dr Dituju | Jenis Bayar & Status Bayar | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.75fr] gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Dr Dituju */}
            <div className="flex items-center gap-2">
              <label className="w-20 font-semibold text-slate-600 shrink-0">Dr Dituju :</label>
              <div className="flex-1 max-w-sm">
                <CustomSelect
                  value={kdDokter}
                  onChange={(e) => {
                    setKdDokter(e.target.value);
                    const sel = daftarDokter.find((d) => d.kd_dokter === e.target.value);
                    if (sel) setNmDokter(sel.nm_dokter);
                  }}
                >
                  {daftarDokter.map((d) => (
                    <option key={d.kd_dokter} value={d.kd_dokter}>
                      {d.nm_dokter} ({d.kd_dokter})
                    </option>
                  ))}
                </CustomSelect>
              </div>
            </div>

            {/* Kolom 2: Jenis Bayar & Status Bayar */}
            <div className="flex items-center gap-2">
              <label className="w-28 font-semibold text-slate-600 shrink-0">Jenis Bayar :</label>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <CustomSelect
                    value={kdPj}
                    onChange={(e) => {
                      setKdPj(e.target.value);
                      const sel = daftarPenjab.find((pj) => pj.kd_pj === e.target.value);
                      if (sel) setNmPj(sel.png_jawab);
                    }}
                  >
                    {daftarPenjab.map((pj) => (
                      <option key={pj.kd_pj} value={pj.kd_pj}>
                        {pj.png_jawab} ({pj.kd_pj})
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <label className="w-20 font-semibold text-slate-600 shrink-0 text-right pr-1.5">Bayar :</label>
                <div className="w-32 shrink-0">
                  <CustomSelect
                    value={sttsBayar}
                    onChange={(e) => setSttsBayar(e.target.value)}
                  >
                    <option value="Belum Bayar">Belum Bayar</option>
                    <option value="Sudah Bayar">Sudah Bayar</option>
                  </CustomSelect>
                </div>
              </div>
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 5: Unit Poli + Biaya Reg | Asal Rujukan | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.75fr] gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Unit & Biaya Reg */}
            <div className="flex items-center gap-2">
              <label className="w-20 font-semibold text-slate-600 shrink-0">Unit :</label>
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <div className="flex-1">
                  <CustomSelect
                    value={kdPoli}
                    onChange={(e) => {
                      setKdPoli(e.target.value);
                      const sel = daftarPoli.find((p) => p.kd_poli === e.target.value);
                      if (sel) {
                        setNmPoli(sel.nm_poli);
                        setBiayaReg(String(sel.registrasi || 0));
                      }
                    }}
                  >
                    {daftarPoli.map((p) => (
                      <option key={p.kd_poli} value={p.kd_poli}>
                        {p.nm_poli}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <label className="font-semibold text-slate-600 shrink-0">Biaya :</label>
                <input
                  type="number"
                  value={biayaReg}
                  onChange={(e) => setBiayaReg(e.target.value)}
                  className="w-24 px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono font-bold text-slate-800 text-right focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Kolom 2: Asal Rujukan */}
            <div className="flex items-center gap-2">
              <label className="w-28 font-semibold text-slate-600 shrink-0">Asal Rujukan :</label>
              <input
                type="text"
                value={asalRujukan}
                onChange={(e) => setAsalRujukan(e.target.value)}
                placeholder="Asal rujukan (jika ada)..."
                className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Registrasi (tbPetugas di DlgReg.java) */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200 shadow-2xs">
              <tr>
                <th className="py-2 px-2.5 text-center w-14">No.Reg</th>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl & Jam Reg</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5">Nama Pasien</th>
                <th className="py-2 px-2.5 text-center w-10">JK</th>
                <th className="py-2 px-2.5">Umur</th>
                <th className="py-2 px-2.5">Poliklinik / Unit</th>
                <th className="py-2 px-2.5">Dokter Dituju</th>
                <th className="py-2 px-2.5">Penanggung Jawab</th>
                <th className="py-2 px-2.5 text-center">Status</th>
                <th className="py-2 px-2.5 text-center">Status Bayar</th>
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
                        ? "bg-emerald-50/90 font-semibold text-emerald-950"
                        : "hover:bg-slate-50/80 text-slate-700"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center font-bold text-slate-700">
                      {item.no_reg}
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
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          item.jk === "L"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-pink-50 text-pink-700"
                        }`}
                      >
                        {item.jk}
                      </span>
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

        {/* 4. Panel Bawah (panelGlass6, 7, 8 di DlgReg.java) */}
        <PanelBawah
          onSimpan={handleSimpan}
          disabledSimpan={!!terpilih || !nomorSiap || sedangMenyimpan}
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
            muatData();
          }}
          disabledHapus={!terpilih}
          disabledGanti={!terpilih || sedangMenyimpan}
          tanggalMulai={tanggalMulai}
          tanggalSelesai={tanggalSelesai}
          onGantiTanggalMulai={setTanggalMulai}
          onGantiTanggalSelesai={setTanggalSelesai}
          kataKunci={kataKunci}
          onGantiKataKunci={setKataKunci}
          onCari={muatData}
          placeholderCari="Cari No.Rawat, RM, Pasien..."
          filterTambahan={
            <div className="flex items-center gap-2">
              {/* Filter Dokter (panelGlass8 di DlgReg.java) */}
              <div className="w-40">
                <CustomSelect
                  value={filterDokter}
                  onChange={(e) => setFilterDokter(e.target.value)}
                >
                  <option value="">Semua Dokter</option>
                  {daftarDokter.map((d) => (
                    <option key={d.kd_dokter} value={d.kd_dokter}>
                      {d.nm_dokter}
                    </option>
                  ))}
                </CustomSelect>
              </div>

              {/* Filter Poli (panelGlass8 di DlgReg.java) */}
              <div className="w-36">
                <CustomSelect
                  value={filterPoli}
                  onChange={(e) => setFilterPoli(e.target.value)}
                >
                  <option value="">Semua Unit Poli</option>
                  {daftarPoli.map((p) => (
                    <option key={p.kd_poli} value={p.kd_poli}>
                      {p.nm_poli}
                    </option>
                  ))}
                </CustomSelect>
              </div>

              {/* Filter Status Bayar */}
              <div className="w-32">
                <CustomSelect
                  value={statusBayar}
                  onChange={(e) => setStatusBayar(e.target.value)}
                >
                  <option value="Semua">Semua Bayar</option>
                  <option value="Sudah Bayar">Sudah Bayar</option>
                  <option value="Belum Bayar">Belum Bayar</option>
                </CustomSelect>
              </div>
            </div>
          }
          jumlahRecord={dataTersaring.length}
          memuat={memuat}
        />
      </div>

      {/* Modal Dialog Pencarian Pasien (BtnPasien di DlgReg.java) */}
      {modalPasienBuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-emerald-800 text-white font-bold text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHospitalUser} className="w-3.5 h-3.5 text-emerald-200" />
                <span className="text-sm font-semibold tracking-wide">Cari Data Pasien (Rekam Medis)</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/pasien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/60 text-white rounded text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs no-underline"
                  title="Buka Halaman Data Pasien & Rekam Medis untuk Input Pasien Baru"
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
                    <th className="p-2 w-24">No. RM</th>
                    <th className="p-2">Nama Pasien</th>
                    <th className="p-2 w-10 text-center">JK</th>
                    <th className="p-2">Alamat</th>
                    <th className="p-2 w-28">No. Telp</th>
                    <th className="p-2 w-16 text-center">Pilih</th>
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
                        <td className="p-2 font-mono font-bold text-slate-700">{p.no_rkm_medis}</td>
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

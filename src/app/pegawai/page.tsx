"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const DAFTAR_TAB_PEGAWAI = ["input", "data"] as const;
type TabPegawai = (typeof DAFTAR_TAB_PEGAWAI)[number];

const LABEL_TAB_PEGAWAI: Record<TabPegawai, string> = {
  input: "Input Pegawai",
  data: "Data Pegawai",
};

interface Opsi {
  id: string;
  label: string;
}

interface OpsiPegawai {
  jnjJabatan: Opsi[];
  kelompokJabatan: Opsi[];
  resikoKerja: Opsi[];
  emergency: Opsi[];
  departemen: Opsi[];
  bidang: Opsi[];
  sttsWp: Opsi[];
  sttsKerja: Opsi[];
  pendidikan: Opsi[];
  indexins: Opsi[];
  bank: Opsi[];
  jenisKelamin: Opsi[];
  masaKerja: Opsi[];
  status: Opsi[];
}

interface Pegawai {
  id: number;
  nik: string;
  nama: string;
  jk: string;
  jbtn: string;
  jnj_jabatan: string;
  nama_jnj_jabatan?: string;
  kode_kelompok: string;
  nama_kelompok?: string;
  kode_resiko: string;
  nama_resiko?: string;
  kode_emergency: string;
  nama_emergency?: string;
  departemen: string;
  nama_departemen?: string;
  bidang: string;
  stts_wp: string;
  nama_stts_wp?: string;
  stts_kerja: string;
  nama_stts_kerja?: string;
  npwp: string;
  pendidikan: string;
  gapok: number;
  tmp_lahir: string;
  tgl_lahir: string;
  alamat: string;
  kota: string;
  mulai_kerja: string;
  ms_kerja: string;
  indexins: string;
  bpd: string;
  nama_bpd?: string;
  rekening: string;
  stts_aktif: string;
  wajibmasuk: number;
  mulai_kontrak: string | null;
  no_ktp: string;
}

interface FormPegawai {
  id: number | null;
  nik: string;
  nama: string;
  jk: string;
  jbtn: string;
  jnj_jabatan: string;
  kode_kelompok: string;
  kode_resiko: string;
  kode_emergency: string;
  departemen: string;
  bidang: string;
  stts_wp: string;
  stts_kerja: string;
  npwp: string;
  pendidikan: string;
  gapok: string;
  tmp_lahir: string;
  tgl_lahir: string;
  alamat: string;
  kota: string;
  mulai_kerja: string;
  ms_kerja: string;
  indexins: string;
  bpd: string;
  rekening: string;
  stts_aktif: string;
  wajibmasuk: string;
  mulai_kontrak: string;
  no_ktp: string;
}

function tanggalHariIni() {
  const sekarang = new Date();
  return new Date(sekarang.getTime() - sekarang.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formulirKosong(opsi: OpsiPegawai | null): FormPegawai {
  return {
    id: null,
    nik: "",
    nama: "",
    jk: opsi?.jenisKelamin[0]?.id || "Pria",
    jbtn: "",
    jnj_jabatan: opsi?.jnjJabatan[0]?.id || "",
    kode_kelompok: opsi?.kelompokJabatan[0]?.id || "",
    kode_resiko: opsi?.resikoKerja[0]?.id || "",
    kode_emergency: opsi?.emergency[0]?.id || "",
    departemen: opsi?.departemen[0]?.id || "",
    bidang: opsi?.bidang[0]?.id || "",
    stts_wp: opsi?.sttsWp[0]?.id || "",
    stts_kerja: opsi?.sttsKerja[0]?.id || "",
    npwp: "",
    pendidikan: opsi?.pendidikan[0]?.id || "",
    gapok: "0",
    tmp_lahir: "",
    tgl_lahir: "",
    alamat: "",
    kota: "",
    mulai_kerja: tanggalHariIni(),
    ms_kerja: opsi?.masaKerja[0]?.id || "<1",
    indexins: opsi?.indexins[0]?.id || "",
    bpd: opsi?.bank[0]?.id || "",
    rekening: "",
    stts_aktif: "AKTIF",
    wajibmasuk: "0",
    mulai_kontrak: "",
    no_ktp: "",
  };
}

function pesanError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function FieldBaris({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-7 items-center gap-1.5 font-sans text-xs font-normal">
      <span className="w-32 shrink-0 text-right font-normal text-slate-700">{label} :</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
    </div>
  );
}

interface TabelPegawaiProps {
  data: Pegawai[];
  memuat: boolean;
  terpilih: Pegawai | null;
  onPilih: (pegawai: Pegawai) => void;
  onBukaForm: () => void;
}

function TabelPegawai({ data, memuat, terpilih, onPilih, onBukaForm }: TabelPegawaiProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full min-w-[64rem] border-collapse text-left text-xs">
        <caption className="sr-only">Daftar pegawai dan petugas. Pilih baris untuk memuat data ke formulir.</caption>
        <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 font-bold text-slate-700">
          <tr>
            <th scope="col" className="px-2 py-2">NIP</th>
            <th scope="col" className="px-2 py-2">Nama</th>
            <th scope="col" className="px-2 py-2">L/P</th>
            <th scope="col" className="px-2 py-2">Jabatan</th>
            <th scope="col" className="px-2 py-2">Jenjang</th>
            <th scope="col" className="px-2 py-2">Departemen</th>
            <th scope="col" className="px-2 py-2">Bagian</th>
            <th scope="col" className="px-2 py-2">Status WP</th>
            <th scope="col" className="px-2 py-2">Status Kerja</th>
            <th scope="col" className="px-2 py-2">Mulai Kerja</th>
            <th scope="col" className="px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-150 font-sans text-[11px] text-slate-700">
          {memuat ? (
            <tr><td colSpan={11} className="py-8 text-center text-slate-500">Memuat data pegawai...</td></tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={11} className="py-8 text-center text-slate-400">
                <FontAwesomeIcon icon={faUsers} className="mb-2 h-8 w-8 text-slate-300" />
                <p>Tidak ada pegawai yang sesuai</p>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onPilih(item)}
                onDoubleClick={() => { onPilih(item); onBukaForm(); }}
                className={`cursor-pointer ${terpilih?.id === item.id ? "bg-primary-50/90" : "hover:bg-slate-50/80"}`}
              >
                <td className="whitespace-nowrap px-2 py-1.5 font-mono text-slate-800">{item.nik}</td>
                <td className="whitespace-nowrap px-2 py-1.5 text-slate-800">{item.nama}</td>
                <td className="px-2 py-1.5">{item.jk === "Pria" ? "L" : "P"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.jbtn || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.nama_jnj_jabatan || item.jnj_jabatan || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.nama_departemen || item.departemen || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.bidang || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.nama_stts_wp || item.stts_wp || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">{item.nama_stts_kerja || item.stts_kerja || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5 tabular-nums">{item.mulai_kerja || "-"}</td>
                <td className="whitespace-nowrap px-2 py-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[11px] ${item.stts_aktif === "AKTIF" ? "bg-secondary-50 text-secondary-800" : "bg-slate-100 text-slate-600"}`}>
                    {item.stts_aktif}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function HalamanPegawai() {
  const { isAuthenticated } = useAuth();
  const [tabAktif, setTabAktif] = useState<TabPegawai>("input");
  const [form, setForm] = useState<FormPegawai>(() => formulirKosong(null));
  const [mulaiKerjaOtomatis, setMulaiKerjaOtomatis] = useState(true);
  const [opsi, setOpsi] = useState<OpsiPegawai | null>(null);
  const [data, setData] = useState<Pegawai[]>([]);
  const [total, setTotal] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [terpilih, setTerpilih] = useState<Pegawai | null>(null);
  const [kataKunci, setKataKunci] = useState("");
  const [filterStatus, setFilterStatus] = useState("AKTIF");
  const [filterDepartemen, setFilterDepartemen] = useState("");
  const [filterJnjJabatan, setFilterJnjJabatan] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<null | "hapus" | "aktif">(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const batas = 50;
  const padaTabData = tabAktif === "data";

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const ubah = useCallback((kunci: keyof FormPegawai, nilai: string) => {
    if (kunci === "mulai_kerja") setMulaiKerjaOtomatis(false);
    setForm((lama) => ({ ...lama, [kunci]: nilai }));
  }, []);

  const muatOpsi = useCallback(async () => {
    if (!isAuthenticated) return null;
    try {
      const respons = await fetch("/api/pegawai/options", { cache: "no-store" });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memuat pilihan data pegawai.");
      const dataOpsi = hasil.data as OpsiPegawai;
      setOpsi(dataOpsi);
      setForm((lama) => ({
        ...lama,
        jk: lama.jk || dataOpsi.jenisKelamin[0]?.id || "Pria",
        jnj_jabatan: lama.jnj_jabatan || dataOpsi.jnjJabatan[0]?.id || "",
        kode_kelompok: lama.kode_kelompok || dataOpsi.kelompokJabatan[0]?.id || "",
        kode_resiko: lama.kode_resiko || dataOpsi.resikoKerja[0]?.id || "",
        kode_emergency: lama.kode_emergency || dataOpsi.emergency[0]?.id || "",
        departemen: lama.departemen || dataOpsi.departemen[0]?.id || "",
        bidang: lama.bidang || dataOpsi.bidang[0]?.id || "",
        stts_wp: lama.stts_wp || dataOpsi.sttsWp[0]?.id || "",
        stts_kerja: lama.stts_kerja || dataOpsi.sttsKerja[0]?.id || "",
        pendidikan: lama.pendidikan || dataOpsi.pendidikan[0]?.id || "",
        indexins: lama.indexins || dataOpsi.indexins[0]?.id || "",
        bpd: lama.bpd || dataOpsi.bank[0]?.id || "",
        ms_kerja: lama.ms_kerja || dataOpsi.masaKerja[0]?.id || "<1",
      }));
      return dataOpsi;
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memuat pilihan data pegawai."), "error");
      return null;
    }
  }, [isAuthenticated, tampilkanToast]);

  const resetForm = useCallback((sumber: OpsiPegawai | null = opsi) => {
    setForm(formulirKosong(sumber));
    setMulaiKerjaOtomatis(true);
    setTerpilih(null);
  }, [opsi]);

  const pindahTab = (tab: TabPegawai) => {
    setTabAktif(tab);
    if (tab === "data") setTerpilih(null);
  };

  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    setMemuat(true);
    try {
      const url = new URL("/api/pegawai", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("status", filterStatus);
      if (filterDepartemen) url.searchParams.set("departemen", filterDepartemen);
      if (filterJnjJabatan) url.searchParams.set("jnj_jabatan", filterJnjJabatan);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", String(batas));
      const respons = await fetch(url.toString(), { cache: "no-store" });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memuat data pegawai.");
      setData((hasil.data || []) as Pegawai[]);
      setTotal(Number(hasil.total || 0));
      setTotalHalaman(Number(hasil.totalHalaman || 1));
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memuat data pegawai."), "error");
    } finally {
      setMemuat(false);
    }
  }, [isAuthenticated, kataKunci, filterStatus, filterDepartemen, filterJnjJabatan, halaman, tampilkanToast]);

  useEffect(() => {
    void muatOpsi();
  }, [muatOpsi]);

  useEffect(() => {
    setHalaman(1);
  }, [kataKunci, filterStatus, filterDepartemen, filterJnjJabatan]);

  useEffect(() => {
    void muatData();
  }, [muatData]);

  useEffect(() => {
    if (!mulaiKerjaOtomatis || tabAktif !== "input") return;
    setForm((lama) => ({ ...lama, mulai_kerja: tanggalHariIni() }));
    const pengaturWaktu = window.setInterval(() => {
      setForm((lama) => ({ ...lama, mulai_kerja: tanggalHariIni() }));
    }, 1000);
    return () => window.clearInterval(pengaturWaktu);
  }, [mulaiKerjaOtomatis, tabAktif]);

  const pilihBaris = (pegawai: Pegawai) => {
    setMulaiKerjaOtomatis(false);
    setTerpilih(pegawai);
    setForm({
      id: Number(pegawai.id),
      nik: pegawai.nik || "",
      nama: pegawai.nama || "",
      jk: pegawai.jk || "",
      jbtn: pegawai.jbtn || "",
      jnj_jabatan: pegawai.jnj_jabatan || "",
      kode_kelompok: pegawai.kode_kelompok || "",
      kode_resiko: pegawai.kode_resiko || "",
      kode_emergency: pegawai.kode_emergency || "",
      departemen: pegawai.departemen || "",
      bidang: pegawai.bidang || "",
      stts_wp: pegawai.stts_wp || "",
      stts_kerja: pegawai.stts_kerja || "",
      npwp: pegawai.npwp || "",
      pendidikan: pegawai.pendidikan || "",
      gapok: String(pegawai.gapok ?? 0),
      tmp_lahir: pegawai.tmp_lahir || "",
      tgl_lahir: pegawai.tgl_lahir || "",
      alamat: pegawai.alamat || "",
      kota: pegawai.kota || "",
      mulai_kerja: pegawai.mulai_kerja || "",
      ms_kerja: pegawai.ms_kerja || "",
      indexins: pegawai.indexins || "",
      bpd: pegawai.bpd || "",
      rekening: pegawai.rekening || "",
      stts_aktif: pegawai.stts_aktif || "AKTIF",
      wajibmasuk: String(pegawai.wajibmasuk ?? 0),
      mulai_kontrak: pegawai.mulai_kontrak || "",
      no_ktp: pegawai.no_ktp || "",
    });
  };

  const payloadForm = () => ({ ...form, id: form.id ?? terpilih?.id ?? null });

  const handleSimpan = async () => {
    if (!form.nik.trim() || !form.nama.trim() || !form.tgl_lahir || !form.mulai_kerja) {
      tampilkanToast("NIP, nama, tanggal lahir, dan mulai kerja wajib diisi.", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const respons = await fetch("/api/pegawai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadForm()),
      });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal menyimpan data pegawai.");
      tampilkanToast(hasil.message || "Data pegawai berhasil disimpan.", "sukses");
      resetForm();
      setTabAktif("data");
      void muatData();
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal menyimpan data pegawai."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleGanti = async () => {
    if (!terpilih) {
      tampilkanToast("Pilih pegawai pada tabel terlebih dahulu.", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const respons = await fetch("/api/pegawai", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadForm()),
      });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memperbarui data pegawai.");
      tampilkanToast(hasil.message || "Data pegawai berhasil diperbarui.", "sukses");
      resetForm();
      void muatData();
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memperbarui data pegawai."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleStatus = async () => {
    if (!terpilih || !dialogStatus) return;
    const menghapus = dialogStatus === "hapus";
    setSedangMenyimpan(true);
    try {
      const respons = await fetch(
        menghapus
          ? `/api/pegawai?id=${encodeURIComponent(String(terpilih.id))}`
          : "/api/pegawai",
        menghapus
          ? { method: "DELETE" }
          : {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: terpilih.id, status: "AKTIF" }),
          },
      );
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal mengubah status pegawai.");
      tampilkanToast(hasil.message || "Status pegawai berhasil diubah.", "sukses");
      setDialogStatus(null);
      resetForm();
      void muatData();
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal mengubah status pegawai."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const input = (label: string, kunci: keyof FormPegawai, jenis = "text") => (
    <input
      aria-label={label}
      type={jenis}
      value={String(form[kunci] ?? "")}
      onChange={(event) => ubah(kunci, event.target.value)}
      className="h-7 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 focus:outline-none focus:border-primary-600"
    />
  );

  const pilih = (label: string, kunci: keyof FormPegawai, daftar: Opsi[], placeholder = "-- Pilih --") => (
    <CustomSelect
      aria-label={label}
      value={String(form[kunci] ?? "")}
      onChange={(event) => ubah(kunci, event.target.value)}
      className="h-7 py-0.5 rounded-md font-normal"
    >
      <option value="">{placeholder}</option>
      {daftar.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
    </CustomSelect>
  );

  const filterSelect = (label: string, nilai: string, ganti: (nilai: string) => void, daftar: Opsi[], semua: string) => (
    <div className="flex items-center gap-1.5">
      <span className="whitespace-nowrap text-slate-700">{label}</span>
      <CustomSelect
        aria-label={label}
        value={nilai}
        onChange={(event) => ganti(event.target.value)}
        className="h-7 w-40 py-0.5 rounded-md font-normal"
      >
        <option value="">{semua}</option>
        {daftar.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </CustomSelect>
    </div>
  );

  const pagination = (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setHalaman((lama) => Math.max(1, lama - 1))}
        disabled={halaman <= 1}
        className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span className="text-xs tabular-nums">{halaman} / {totalHalaman}</span>
      <button
        type="button"
        onClick={() => setHalaman((lama) => Math.min(totalHalaman, lama + 1))}
        disabled={halaman >= totalHalaman}
        className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 disabled:opacity-40"
      >
        Berikutnya
      </button>
    </div>
  );

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-y-auto bg-slate-50 p-2 sm:p-3 lg:overflow-hidden">
      <div role="tablist" aria-label="Pengelolaan data pegawai" className="flex shrink-0 border-b border-slate-200">
        {DAFTAR_TAB_PEGAWAI.map((tab) => (
          <button
            key={tab}
            id={`tab-pegawai-${tab}`}
            type="button"
            role="tab"
            aria-selected={tabAktif === tab}
            aria-controls={`panel-pegawai-${tab}`}
            tabIndex={tabAktif === tab ? 0 : -1}
            onClick={() => pindahTab(tab)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const indeks = DAFTAR_TAB_PEGAWAI.indexOf(tab);
              const berikut = event.key === "Home"
                ? DAFTAR_TAB_PEGAWAI[0]
                : event.key === "End"
                  ? DAFTAR_TAB_PEGAWAI[DAFTAR_TAB_PEGAWAI.length - 1]
                  : DAFTAR_TAB_PEGAWAI[(indeks + (event.key === "ArrowRight" ? 1 : -1) + DAFTAR_TAB_PEGAWAI.length) % DAFTAR_TAB_PEGAWAI.length];
              pindahTab(berikut);
              document.getElementById(`tab-pegawai-${berikut}`)?.focus();
            }}
            className={`px-4 py-2 text-xs font-semibold border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabAktif === tab ? "bg-white border-primary-700 text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {LABEL_TAB_PEGAWAI[tab]}
          </button>
        ))}
      </div>

      <section
        id="panel-pegawai-input"
        role="tabpanel"
        aria-labelledby="tab-pegawai-input"
        tabIndex={0}
        className={tabAktif === "input" ? "flex-1 min-h-0 overflow-auto rounded-lg border border-slate-200 bg-white p-3" : "hidden"}
      >
        <fieldset disabled={sedangMenyimpan} className="font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul>
            <div className="space-y-1.5">
              <FieldBaris label="NIP">{input("NIP pegawai", "nik")}</FieldBaris>
              <FieldBaris label="Nama">{input("Nama pegawai", "nama")}</FieldBaris>
              <FieldBaris label="Jenis Kelamin">{pilih("Jenis kelamin", "jk", opsi?.jenisKelamin || [])}</FieldBaris>
              <FieldBaris label="Jabatan">{input("Jabatan", "jbtn")}</FieldBaris>
              <FieldBaris label="Jenjang Jabatan">{pilih("Jenjang jabatan", "jnj_jabatan", opsi?.jnjJabatan || [])}</FieldBaris>
              <FieldBaris label="Kelompok Jabatan">{pilih("Kelompok jabatan", "kode_kelompok", opsi?.kelompokJabatan || [])}</FieldBaris>
              <FieldBaris label="Departemen">{pilih("Departemen", "departemen", opsi?.departemen || [])}</FieldBaris>
              <FieldBaris label="Bagian">{pilih("Bagian", "bidang", opsi?.bidang || [])}</FieldBaris>
              <FieldBaris label="Resiko Kerja">{pilih("Resiko kerja", "kode_resiko", opsi?.resikoKerja || [])}</FieldBaris>
              <FieldBaris label="Tingkat Emergency">{pilih("Tingkat emergency", "kode_emergency", opsi?.emergency || [])}</FieldBaris>
              <FieldBaris label="Status WP">{pilih("Status WP", "stts_wp", opsi?.sttsWp || [])}</FieldBaris>
              <FieldBaris label="Status Karyawan">{pilih("Status karyawan", "stts_kerja", opsi?.sttsKerja || [])}</FieldBaris>
              <FieldBaris label="NPWP">{input("NPWP", "npwp")}</FieldBaris>
              <FieldBaris label="Pendidikan">{pilih("Pendidikan", "pendidikan", opsi?.pendidikan || [])}</FieldBaris>
              <FieldBaris label="Gapok">{input("Gapok", "gapok", "number")}</FieldBaris>
            </div>
            <div className="space-y-1.5">
              <FieldBaris label="Tempat Lahir">{input("Tempat lahir", "tmp_lahir")}</FieldBaris>
              <FieldBaris label="Tanggal Lahir">{input("Tanggal lahir", "tgl_lahir", "date")}</FieldBaris>
              <FieldBaris label="Alamat">{input("Alamat", "alamat")}</FieldBaris>
              <FieldBaris label="Kota">{input("Kota", "kota")}</FieldBaris>
              <FieldBaris label="Mulai Kerja">
                <input
                  aria-label="Perbarui tanggal mulai kerja otomatis"
                  type="checkbox"
                  checked={mulaiKerjaOtomatis}
                  onChange={(event) => setMulaiKerjaOtomatis(event.target.checked)}
                  title="Centang untuk memperbarui tanggal mulai kerja mengikuti waktu lokal"
                  className="h-4 w-4 shrink-0"
                />
                <div className="max-w-52">{input("Tanggal mulai kerja", "mulai_kerja", "date")}</div>
              </FieldBaris>
              <FieldBaris label="Masa Kerja">{pilih("Masa kerja", "ms_kerja", opsi?.masaKerja || [])}</FieldBaris>
              <FieldBaris label="Kode Index">{pilih("Kode index", "indexins", opsi?.indexins || [])}</FieldBaris>
              <FieldBaris label="Bank">{pilih("Bank", "bpd", opsi?.bank || [])}</FieldBaris>
              <FieldBaris label="Rekening">{input("Rekening", "rekening")}</FieldBaris>
              <FieldBaris label="Status Aktif">{pilih("Status aktif", "stts_aktif", opsi?.status || [])}</FieldBaris>
              <FieldBaris label="Wajib Masuk">{input("Wajib masuk", "wajibmasuk", "number")}</FieldBaris>
              <FieldBaris label="Mulai Kontrak">{input("Mulai kontrak", "mulai_kontrak", "date")}</FieldBaris>
              <FieldBaris label="Nomor KTP">{input("Nomor KTP", "no_ktp")}</FieldBaris>
            </div>
          </GridFormulirModul>
        </fieldset>
      </section>

      <section
        id="panel-pegawai-data"
        role="tabpanel"
        aria-labelledby="tab-pegawai-data"
        tabIndex={0}
        className={tabAktif === "data" ? "flex h-[32rem] flex-none flex-col overflow-hidden rounded-lg border border-slate-200 bg-white lg:h-auto lg:min-h-0 lg:flex-1" : "hidden"}
      >
        <TabelPegawai
          data={data}
          memuat={memuat}
          terpilih={terpilih}
          onPilih={pilihBaris}
          onBukaForm={() => setTabAktif("input")}
        />
      </section>

      <PanelBawah
        tampilan="web"
        onSimpan={!padaTabData ? handleSimpan : undefined}
        disabledSimpan={Boolean(terpilih) || sedangMenyimpan}
        onBaru={() => { resetForm(); setTabAktif("input"); }}
        onHapus={padaTabData ? () => setDialogStatus("hapus") : undefined}
        disabledHapus={!terpilih || sedangMenyimpan}
        onGanti={padaTabData ? () => { if (!terpilih) setTabAktif("input"); else void handleGanti(); } : undefined}
        disabledGanti={!terpilih || sedangMenyimpan}
        onCetak={padaTabData ? () => {
          if (!cetakTabelDomJasper("Laporan Data Pegawai")) {
            tampilkanToast("Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", "error");
          }
        } : undefined}
        onSemua={padaTabData ? () => {
          setKataKunci("");
          setFilterStatus("AKTIF");
          setFilterDepartemen("");
          setFilterJnjJabatan("");
          setHalaman(1);
        } : undefined}
        kataKunci={padaTabData ? kataKunci : undefined}
        onGantiKataKunci={padaTabData ? setKataKunci : undefined}
        onCari={padaTabData ? () => { setHalaman(1); void muatData(); } : undefined}
        placeholderCari="Cari NIP, nama, jabatan, atau departemen..."
        filterTambahan={padaTabData ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Status</span>
              <CustomSelect
                aria-label="Status pegawai"
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="h-7 w-36 py-0.5 rounded-md font-normal"
              >
                <option value="semua">-- Semua status --</option>
                {(opsi?.status || []).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </CustomSelect>
            </div>
            {filterSelect("Departemen", filterDepartemen, setFilterDepartemen, opsi?.departemen || [], "-- Semua departemen --")}
            {filterSelect("Jenjang", filterJnjJabatan, setFilterJnjJabatan, opsi?.jnjJabatan || [], "-- Semua jenjang --")}
          </div>
        ) : undefined}
        jumlahRecord={padaTabData ? total : 0}
        tampilkanRecord={padaTabData}
        pagination={padaTabData ? pagination : undefined}
        memuat={sedangMenyimpan}
        tombolTambahan={padaTabData && terpilih && ["KELUAR", "NON AKTIF"].includes(String(terpilih.stts_aktif))
          ? [{
            label: "Aktifkan",
            onClick: () => setDialogStatus("aktif"),
            disabled: sedangMenyimpan,
            tooltip: "Aktifkan kembali pegawai yang tidak aktif",
          }]
          : undefined}
      />

      <KonfirmasiDialog
        terbuka={dialogStatus !== null}
        judul={dialogStatus === "aktif" ? "Aktifkan Pegawai" : "Tandai Pegawai Keluar"}
        pesan={dialogStatus === "aktif"
          ? `Aktifkan kembali ${terpilih?.nama} (${terpilih?.nik})?`
          : `Tandai ${terpilih?.nama} (${terpilih?.nik}) sebagai KELUAR?`}
        subPesan={dialogStatus === "aktif"
          ? "Pegawai akan kembali muncul dalam daftar status AKTIF."
          : "Pegawai tidak muncul lagi pada daftar aktif, tetapi riwayat transaksi dan hak akses tetap tersimpan."}
        teksBatal="Batal"
        teksKonfirmasi={dialogStatus === "aktif" ? "Ya, Aktifkan" : "Ya, Tandai Keluar"}
        onBatal={() => setDialogStatus(null)}
        onKonfirmasi={handleStatus}
        sedangMemproses={sedangMenyimpan}
      />

      <Toast
        key={toast?.key}
        message={toast?.pesan || null}
        tipe={toast?.tipe || "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

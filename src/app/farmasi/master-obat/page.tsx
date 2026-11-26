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
import {
  faBoxesStacked,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

const DAFTAR_TAB_MASTER_OBAT = ["input", "data", "sampah"] as const;
type TabMasterObat = (typeof DAFTAR_TAB_MASTER_OBAT)[number];

const LABEL_TAB_MASTER_OBAT: Record<TabMasterObat, string> = {
  input: "Input Barang",
  data: "Data Barang",
  sampah: "Data Sampah",
};

interface Opsi {
  id: string;
  label: string;
}

interface AturanHarga {
  ralan: number;
  kelas1: number;
  kelas2: number;
  kelas3: number;
  utama: number;
  vip: number;
  vvip: number;
  beliluar: number;
  jualbebas: number;
  karyawan: number;
}

interface HargaSetting {
  mode: "Umum" | "Per Jenis" | "Per Barang";
  umum: AturanHarga | null;
  jenis: (AturanHarga & { kdjns: string })[];
  barang: (AturanHarga & { kode_brng: string })[];
  pembulatan: number;
}

interface OpsiData {
  satuan: Opsi[];
  jenis: Opsi[];
  kategori: Opsi[];
  golongan: Opsi[];
  industri: Opsi[];
  harga: HargaSetting;
  nomor: string;
}

interface Barang {
  kode_brng: string;
  nama_brng: string;
  kode_satbesar: string;
  satuan_besar?: string;
  kode_sat: string;
  satuan_kecil?: string;
  isi: number;
  kapasitas: number;
  letak_barang: string;
  dasar: number;
  h_beli: number;
  ralan: number;
  kelas1: number;
  kelas2: number;
  kelas3: number;
  utama: number;
  vip: number;
  vvip: number;
  beliluar: number;
  jualbebas: number;
  karyawan: number;
  stokminimal: number;
  kdjns: string;
  nama_jenis?: string;
  expire: string;
  status: string;
  kode_industri: string;
  nama_industri?: string;
  kode_kategori: string;
  nama_kategori?: string;
  kode_golongan: string;
  nama_golongan?: string;
}

interface FormObat {
  kode_brng: string;
  nama_brng: string;
  kode_satbesar: string;
  kode_sat: string;
  letak_barang: string;
  dasar: string;
  h_beli: string;
  ralan: string;
  kelas1: string;
  kelas2: string;
  kelas3: string;
  utama: string;
  vip: string;
  vvip: string;
  beliluar: string;
  jualbebas: string;
  karyawan: string;
  stokminimal: string;
  kdjns: string;
  isi: string;
  kapasitas: string;
  expire: string;
  kode_industri: string;
  kode_kategori: string;
  kode_golongan: string;
}

const PASANGAN_HARGA = [
  ["ralan", "ralan"],
  ["kelas1", "kelas1"],
  ["kelas2", "kelas2"],
  ["kelas3", "kelas3"],
  ["utama", "utama"],
  ["vip", "vip"],
  ["vvip", "vvip"],
  ["beliluar", "beliluar"],
  ["jualbebas", "jualbebas"],
  ["karyawan", "karyawan"],
] as const satisfies readonly (readonly [keyof FormObat, keyof AturanHarga])[];

function tanggalHariIni() {
  const sekarang = new Date();
  return new Date(sekarang.getTime() - sekarang.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formulirKosong(opsi: OpsiData | null): FormObat {
  return {
    kode_brng: opsi?.nomor || "",
    nama_brng: "",
    kode_satbesar: opsi?.satuan[0]?.id || "",
    kode_sat: opsi?.satuan[0]?.id || "",
    letak_barang: "",
    dasar: "0",
    h_beli: "0",
    ralan: "0",
    kelas1: "0",
    kelas2: "0",
    kelas3: "0",
    utama: "0",
    vip: "0",
    vvip: "0",
    beliluar: "0",
    jualbebas: "0",
    karyawan: "0",
    stokminimal: "0",
    kdjns: opsi?.jenis[0]?.id || "",
    isi: "1",
    kapasitas: "1",
    expire: tanggalHariIni(),
    kode_industri: opsi?.industri[0]?.id || "",
    kode_kategori: opsi?.kategori[0]?.id || "",
    kode_golongan: opsi?.golongan[0]?.id || "",
  };
}

function pesanError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function rupiah(nilai: unknown) {
  const angka = Number(nilai ?? 0);
  return Number.isFinite(angka) ? angka.toLocaleString("id-ID") : "0";
}

function FieldBaris({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-7 items-center gap-1.5 font-sans text-xs font-normal">
      <span className="w-32 shrink-0 text-right font-normal text-slate-700">{label} :</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
    </div>
  );
}

interface TabelMasterObatProps {
  data: Barang[];
  memuat: boolean;
  sedangMenyimpan: boolean;
  terpilih: Barang | null;
  onPilih: (barang: Barang) => void;
  onBukaForm: () => void;
}

function TabelMasterObat({ data, memuat, sedangMenyimpan, terpilih, onPilih, onBukaForm }: TabelMasterObatProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse text-left text-xs">
        <caption className="sr-only">Daftar obat, alkes, dan BHP. Pilih baris untuk memuat data ke formulir.</caption>
        <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 font-bold text-slate-700">
          <tr>
            <th scope="col" className="px-2 py-2">Kode Barang</th>
            <th scope="col" className="px-2 py-2">Nama Barang</th>
            <th scope="col" className="px-2 py-2">Satuan</th>
            <th scope="col" className="px-2 py-2 text-right">Isi</th>
            <th scope="col" className="px-2 py-2">Kandungan</th>
            <th scope="col" className="px-2 py-2 text-right">Hrg Beli</th>
            <th scope="col" className="px-2 py-2 text-right">Ralan</th>
            <th scope="col" className="px-2 py-2 text-right">Ranap K1</th>
            <th scope="col" className="px-2 py-2 text-right">Utama</th>
            <th scope="col" className="px-2 py-2 text-right">Stok Min</th>
            <th scope="col" className="px-2 py-2">Jenis</th>
            <th scope="col" className="px-2 py-2">Kategori</th>
            <th scope="col" className="px-2 py-2">Golongan</th>
            <th scope="col" className="px-2 py-2">Expire</th>
            <th scope="col" className="px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-150 font-sans text-[11px] text-slate-700">
          {memuat ? (
            <tr><td colSpan={15} className="py-8 text-center text-slate-500">Memuat data master barang...</td></tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={15} className="py-8 text-center text-slate-400">
                <FontAwesomeIcon icon={faBoxesStacked} className="mb-2 h-8 w-8 text-slate-300" />
                <p>Tidak ada data barang yang sesuai</p>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.kode_brng}
                onClick={() => { if (!sedangMenyimpan) onPilih(item); }}
                onDoubleClick={() => {
                  if (sedangMenyimpan) return;
                  onPilih(item);
                  onBukaForm();
                }}
                className={`cursor-pointer ${terpilih?.kode_brng === item.kode_brng ? "bg-primary-50/90" : "hover:bg-slate-50/80"}`}
              >
                <td className="whitespace-nowrap px-2 py-2 font-mono text-slate-800">{item.kode_brng}</td>
                <td className="whitespace-nowrap px-2 py-2 text-slate-800">{item.nama_brng}</td>
                <td className="whitespace-nowrap px-2 py-2">{item.satuan_kecil || item.kode_sat}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.isi)}</td>
                <td className="whitespace-nowrap px-2 py-2">{item.letak_barang || "-"}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.h_beli)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.ralan)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.kelas1)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.utama)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{rupiah(item.stokminimal)}</td>
                <td className="whitespace-nowrap px-2 py-2">{item.nama_jenis || item.kdjns}</td>
                <td className="whitespace-nowrap px-2 py-2">{item.nama_kategori || item.kode_kategori}</td>
                <td className="whitespace-nowrap px-2 py-2">{item.nama_golongan || item.kode_golongan}</td>
                <td className="whitespace-nowrap px-2 py-2 tabular-nums">{item.expire && item.expire !== "0000-00-00" ? item.expire : "-"}</td>
                <td className="whitespace-nowrap px-2 py-2">
                  <span className={`rounded px-1.5 py-0.5 text-[11px] ${item.status === "1" ? "bg-secondary-50 text-secondary-800" : "bg-slate-100 text-slate-600"}`}>
                    {item.status === "1" ? "Aktif" : "Nonaktif"}
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

export default function HalamanMasterObat() {
  const { isAuthenticated } = useAuth();
  const [tabAktif, setTabAktif] = useState<TabMasterObat>("input");
  const [form, setForm] = useState<FormObat>(() => formulirKosong(null));
  const [pakaiExpire, setPakaiExpire] = useState(true);
  const [opsi, setOpsi] = useState<OpsiData | null>(null);
  const [data, setData] = useState<Barang[]>([]);
  const [total, setTotal] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [terpilih, setTerpilih] = useState<Barang | null>(null);
  const [kataKunci, setKataKunci] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterGolongan, setFilterGolongan] = useState("");
  const [filterStatus, setFilterStatus] = useState("1");
  const [memuat, setMemuat] = useState(true);
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);
  const [sedangMenghitungHarga, setSedangMenghitungHarga] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<null | "hapus" | "pulihkan">(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const batas = 50;
  const padaTabData = tabAktif === "data";
  const padaTabSampah = tabAktif === "sampah";
  const padaTabTabel = padaTabData || padaTabSampah;

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const ubah = useCallback((kunci: keyof FormObat, nilai: string) => {
    setForm((lama) => ({ ...lama, [kunci]: nilai }));
  }, []);

  const muatOpsi = useCallback(async () => {
    if (!isAuthenticated) return null;
    try {
      const respons = await fetch("/api/farmasi/master-obat/options", { cache: "no-store" });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memuat pilihan data obat.");
      const dataOpsi = hasil.data as OpsiData;
      setOpsi(dataOpsi);
      setForm((lama) => ({
        ...lama,
        kode_brng: lama.kode_brng || dataOpsi.nomor,
        kode_sat: lama.kode_sat || dataOpsi.satuan[0]?.id || "",
        kode_satbesar: lama.kode_satbesar || dataOpsi.satuan[0]?.id || "",
        kdjns: lama.kdjns || dataOpsi.jenis[0]?.id || "",
        kode_kategori: lama.kode_kategori || dataOpsi.kategori[0]?.id || "",
        kode_golongan: lama.kode_golongan || dataOpsi.golongan[0]?.id || "",
        kode_industri: lama.kode_industri || dataOpsi.industri[0]?.id || "",
      }));
      return dataOpsi;
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memuat pilihan data obat."), "error");
      return null;
    }
  }, [isAuthenticated, tampilkanToast]);

  const resetForm = useCallback((sumber: OpsiData | null = opsi) => {
    setForm(formulirKosong(sumber));
    setPakaiExpire(true);
    setTerpilih(null);
  }, [opsi]);

  const pindahTab = (tab: TabMasterObat) => {
    setTabAktif(tab);
    if (tab !== "input") {
      setTerpilih(null);
      setFilterStatus(tab === "sampah" ? "0" : "1");
      setHalaman(1);
    }
  };

  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    setMemuat(true);
    try {
      const url = new URL("/api/farmasi/master-obat", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      if (filterJenis) url.searchParams.set("jenis", filterJenis);
      if (filterKategori) url.searchParams.set("kategori", filterKategori);
      if (filterGolongan) url.searchParams.set("golongan", filterGolongan);
      url.searchParams.set("status", filterStatus);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", String(batas));
      const respons = await fetch(url.toString(), { cache: "no-store" });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memuat data obat.");
      setData((hasil.data || []) as Barang[]);
      setTotal(Number(hasil.total || 0));
      setTotalHalaman(Number(hasil.totalHalaman || 1));
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memuat data obat."), "error");
    } finally {
      setMemuat(false);
    }
  }, [isAuthenticated, kataKunci, filterJenis, filterKategori, filterGolongan, filterStatus, halaman, tampilkanToast]);

  useEffect(() => {
    void muatOpsi();
  }, [muatOpsi]);

  useEffect(() => {
    setHalaman(1);
  }, [kataKunci, filterJenis, filterKategori, filterGolongan, filterStatus]);

  useEffect(() => {
    void muatData();
  }, [muatData]);

  const pilihBaris = (barang: Barang) => {
    const adaExpire = Boolean(barang.expire) && barang.expire !== "0000-00-00";
    setPakaiExpire(adaExpire);
    setTerpilih(barang);
    setForm({
      kode_brng: barang.kode_brng,
      nama_brng: barang.nama_brng || "",
      kode_satbesar: barang.kode_satbesar || "",
      kode_sat: barang.kode_sat || "",
      letak_barang: barang.letak_barang || "",
      dasar: String(barang.dasar ?? 0),
      h_beli: String(barang.h_beli ?? 0),
      ralan: String(barang.ralan ?? 0),
      kelas1: String(barang.kelas1 ?? 0),
      kelas2: String(barang.kelas2 ?? 0),
      kelas3: String(barang.kelas3 ?? 0),
      utama: String(barang.utama ?? 0),
      vip: String(barang.vip ?? 0),
      vvip: String(barang.vvip ?? 0),
      beliluar: String(barang.beliluar ?? 0),
      jualbebas: String(barang.jualbebas ?? 0),
      karyawan: String(barang.karyawan ?? 0),
      stokminimal: String(barang.stokminimal ?? 0),
      kdjns: barang.kdjns || "",
      isi: String(barang.isi ?? 0),
      kapasitas: String(barang.kapasitas ?? 0),
      expire: adaExpire ? barang.expire : tanggalHariIni(),
      kode_industri: barang.kode_industri || "",
      kode_kategori: barang.kode_kategori || "",
      kode_golongan: barang.kode_golongan || "",
    });
  };

  const hitungHarga = async () => {
    if (!opsi) return;
    const beli = Number(form.h_beli);
    if (!Number.isFinite(beli) || beli <= 0) {
      tampilkanToast("Harga beli harus lebih dari 0 sebelum mengharga jual.", "error");
      return;
    }
    let aturan: AturanHarga | null = null;
    if (opsi.harga.mode === "Per Jenis") {
      aturan = opsi.harga.jenis.find((item) => item.kdjns === form.kdjns) || null;
    } else if (opsi.harga.mode === "Per Barang") {
      aturan = opsi.harga.barang.find((item) => item.kode_brng === form.kode_brng) || null;
      if (!aturan) {
        if (!form.kode_brng.trim() || form.kode_brng.length > 15) {
          tampilkanToast("Kode barang tidak valid.", "error");
          return;
        }
        setSedangMenghitungHarga(true);
        try {
          const response = await fetch(`/api/farmasi/master-obat/options?resource=harga&kode_brng=${encodeURIComponent(form.kode_brng)}`, {
            cache: "no-store",
          });
          const json: { success?: boolean; data?: { harga?: HargaSetting }; error?: string } = await response.json();
          if (!response.ok || !json.success || !json.data?.harga) {
            throw new Error(json.error || "Gagal memuat pengaturan harga barang.");
          }
          const hargaBarang = json.data.harga.barang.find((item) => item.kode_brng === form.kode_brng) || null;
          setOpsi((lama) => lama ? { ...lama, harga: { ...lama.harga, barang: hargaBarang ? [hargaBarang] : [] } } : lama);
          aturan = hargaBarang;
        } catch (error) {
          tampilkanToast(pesanError(error, "Gagal memuat pengaturan harga barang."), "error");
          return;
        } finally {
          setSedangMenghitungHarga(false);
        }
      }
    } else {
      aturan = opsi.harga.umum;
    }
    if (!aturan) {
      tampilkanToast("Pengaturan harga untuk barang atau jenis ini belum tersedia.", "error");
      return;
    }
    const aturanHarga = aturan;
    const pembulatan = opsi.harga.pembulatan > 0 ? opsi.harga.pembulatan : 1;
    const hasilHarga = (persen: number) => Math.ceil((beli + (beli * persen) / 100) / pembulatan) * pembulatan;
    setForm((lama) => {
      const berikut = { ...lama };
      for (const [target, sumber] of PASANGAN_HARGA) {
        berikut[target] = String(hasilHarga(aturanHarga[sumber]));
      }
      return berikut;
    });
    tampilkanToast("Harga jual dihitung dari pengaturan harga aktif.", "sukses");
  };

  const buatPayload = () => ({ ...form, expire: pakaiExpire ? form.expire : "0000-00-00" });

  const handleSimpan = async () => {
    if (!form.nama_brng.trim()) {
      tampilkanToast("Nama Barang wajib diisi.", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const respons = await fetch("/api/farmasi/master-obat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buatPayload()),
      });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal menyimpan data barang.");
      const opsiBaru = await muatOpsi();
      tampilkanToast(hasil.message || "Data barang berhasil disimpan.", "sukses");
      resetForm(opsiBaru);
      void muatData();
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal menyimpan data barang."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleGanti = async () => {
    if (!terpilih) {
      tampilkanToast("Pilih barang pada tabel terlebih dahulu.", "error");
      return;
    }
    setSedangMenyimpan(true);
    try {
      const respons = await fetch("/api/farmasi/master-obat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buatPayload()),
      });
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal memperbarui data barang.");
      tampilkanToast(hasil.message || "Data barang berhasil diperbarui.", "sukses");
      resetForm(opsi);
      void muatData();
      setTabAktif("data");
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal memperbarui data barang."), "error");
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
          ? `/api/farmasi/master-obat?kode_brng=${encodeURIComponent(terpilih.kode_brng)}`
          : "/api/farmasi/master-obat",
        menghapus
          ? { method: "DELETE" }
          : {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kode_brng: terpilih.kode_brng, status: "1" }),
          },
      );
      const hasil = await respons.json();
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal mengubah status barang.");
      tampilkanToast(hasil.message || "Status barang berhasil diubah.", "sukses");
      setDialogStatus(null);
      resetForm(opsi);
      void muatData();
    } catch (error) {
      tampilkanToast(pesanError(error, "Gagal mengubah status barang."), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const input = (label: string, kunci: keyof FormObat, jenis = "text", readOnly = false) => (
    <input
      aria-label={label}
      type={jenis}
      value={form[kunci]}
      readOnly={readOnly}
      onChange={(event) => ubah(kunci, event.target.value)}
      className="h-7 w-full min-w-0 rounded-full border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 focus:outline-none focus:border-primary-600 read-only:bg-slate-50"
    />
  );

  const pilih = (label: string, kunci: keyof FormObat, daftar: Opsi[], placeholder = "-- Pilih --") => (
    <CustomSelect
      aria-label={label}
      value={form[kunci]}
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
        className="h-7 py-0.5 rounded-md font-normal"
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
      <div role="tablist" aria-label="Pengelolaan data obat" className="flex shrink-0 border-b border-slate-200">
        {DAFTAR_TAB_MASTER_OBAT.map((tab) => (
          <button
            key={tab}
            id={`tab-master-obat-${tab}`}
            type="button"
            role="tab"
            aria-selected={tabAktif === tab}
            aria-controls={`panel-master-obat-${tab}`}
            tabIndex={tabAktif === tab ? 0 : -1}
            onClick={() => pindahTab(tab)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const indeks = DAFTAR_TAB_MASTER_OBAT.indexOf(tab);
              const berikut = event.key === "Home"
                ? DAFTAR_TAB_MASTER_OBAT[0]
                : event.key === "End"
                  ? DAFTAR_TAB_MASTER_OBAT[DAFTAR_TAB_MASTER_OBAT.length - 1]
                  : DAFTAR_TAB_MASTER_OBAT[(indeks + (event.key === "ArrowRight" ? 1 : -1) + DAFTAR_TAB_MASTER_OBAT.length) % DAFTAR_TAB_MASTER_OBAT.length];
              pindahTab(berikut);
              document.getElementById(`tab-master-obat-${berikut}`)?.focus();
            }}
            className={`px-4 py-2 text-xs font-semibold border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabAktif === tab ? "bg-white border-primary-700 text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {LABEL_TAB_MASTER_OBAT[tab]}
          </button>
        ))}
      </div>

      <section
        id="panel-master-obat-input"
        role="tabpanel"
        aria-labelledby="tab-master-obat-input"
        tabIndex={0}
        className={tabAktif === "input" ? "flex-1 min-h-0 overflow-auto rounded-lg border border-slate-200 bg-white p-3" : "hidden"}
      >
        <fieldset disabled={sedangMenyimpan} className="font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul>
            <div className="space-y-1.5">
              <FieldBaris label="Kode Barang">
                <div className="max-w-56">{input("Kode barang", "kode_brng", "text", Boolean(terpilih))}</div>
              </FieldBaris>
              <FieldBaris label="Nama Barang">{input("Nama barang", "nama_brng")}</FieldBaris>
              <FieldBaris label="Kandungan">{input("Kandungan", "letak_barang")}</FieldBaris>
              <FieldBaris label="Satuan Kecil">{pilih("Satuan kecil", "kode_sat", opsi?.satuan || [])}</FieldBaris>
              <FieldBaris label="Satuan Besar">{pilih("Satuan besar", "kode_satbesar", opsi?.satuan || [])}</FieldBaris>
              <FieldBaris label="Kapasitas">{input("Kapasitas", "kapasitas", "number")}</FieldBaris>
              <FieldBaris label="Isi">{input("Isi", "isi", "number")}</FieldBaris>
              <FieldBaris label="Jenis">{pilih("Jenis", "kdjns", opsi?.jenis || [])}</FieldBaris>
              <FieldBaris label="Kategori">{pilih("Kategori", "kode_kategori", opsi?.kategori || [])}</FieldBaris>
              <FieldBaris label="Golongan">{pilih("Golongan", "kode_golongan", opsi?.golongan || [])}</FieldBaris>
              <FieldBaris label="I.F.">{pilih("Industri farmasi", "kode_industri", opsi?.industri || [])}</FieldBaris>
              <FieldBaris label="Stok Minimal">{input("Stok minimal", "stokminimal", "number")}</FieldBaris>
              <FieldBaris label="Kadaluwarsa">
                <input
                  aria-label="Gunakan tanggal kadaluwarsa"
                  type="checkbox"
                  checked={pakaiExpire}
                  onChange={(event) => setPakaiExpire(event.target.checked)}
                  title="Centang untuk menyimpan tanggal kadaluwarsa"
                  className="h-4 w-4 shrink-0"
                />
                <div className="max-w-52">{input("Tanggal kadaluwarsa", "expire", "date")}</div>
              </FieldBaris>
            </div>
            <div className="space-y-1.5">
              <FieldBaris label="Harga Dasar">{input("Harga dasar", "dasar", "number")}</FieldBaris>
              <FieldBaris label="Harga Beli">
                <div className="max-w-40">{input("Harga beli", "h_beli", "number")}</div>
                <button
                  type="button"
                  onClick={hitungHarga}
                  disabled={sedangMenghitungHarga || sedangMenyimpan}
                  title="Hitung harga jual dari pengaturan harga aktif"
                  className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-700"
                >
                  <FontAwesomeIcon icon={faCalculator} className="h-3 w-3 text-primary-600" />
                  Hitung Harga
                </button>
              </FieldBaris>
              <FieldBaris label="Hrg Ralan">{input("Harga ralan", "ralan", "number")}</FieldBaris>
              <FieldBaris label="Ranap K1">{input("Harga ranap kelas 1", "kelas1", "number")}</FieldBaris>
              <FieldBaris label="Ranap K2">{input("Harga ranap kelas 2", "kelas2", "number")}</FieldBaris>
              <FieldBaris label="Ranap K3">{input("Harga ranap kelas 3", "kelas3", "number")}</FieldBaris>
              <FieldBaris label="Utama/BPJS">{input("Harga utama BPJS", "utama", "number")}</FieldBaris>
              <FieldBaris label="Ranap VIP">{input("Harga ranap VIP", "vip", "number")}</FieldBaris>
              <FieldBaris label="Ranap VVIP">{input("Harga ranap VVIP", "vvip", "number")}</FieldBaris>
              <FieldBaris label="Apotek Luar">{input("Harga apotek luar", "beliluar", "number")}</FieldBaris>
              <FieldBaris label="Jual Bebas">{input("Harga jual bebas", "jualbebas", "number")}</FieldBaris>
              <FieldBaris label="Karyawan">{input("Harga karyawan", "karyawan", "number")}</FieldBaris>
            </div>
          </GridFormulirModul>
        </fieldset>
      </section>

      {(["data", "sampah"] as const).map((tab) => (
        <section
          key={tab}
          id={`panel-master-obat-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-master-obat-${tab}`}
          tabIndex={0}
          className={tabAktif === tab ? "flex h-[32rem] flex-none flex-col overflow-hidden rounded-lg border border-slate-200 bg-white lg:h-auto lg:min-h-0 lg:flex-1" : "hidden"}
        >
          <TabelMasterObat
            data={data}
            memuat={memuat}
            sedangMenyimpan={sedangMenyimpan}
            terpilih={terpilih}
            onPilih={pilihBaris}
            onBukaForm={() => setTabAktif("input")}
          />
        </section>
      ))}

      <PanelBawah
        tampilan="web"
        onSimpan={!padaTabTabel ? handleSimpan : undefined}
        disabledSimpan={Boolean(terpilih) || sedangMenyimpan}
        onBaru={() => { resetForm(opsi); setTabAktif("input"); }}
        onHapus={padaTabData ? () => setDialogStatus("hapus") : undefined}
        onGanti={padaTabTabel ? () => { if (!terpilih) setTabAktif("input"); else void handleGanti(); } : undefined}
        onCetak={padaTabTabel ? () => {
          cetakTabelDomJasper("Laporan Data Master Obat & Alkes");
        } : undefined}
        onSemua={padaTabTabel ? () => {
          setKataKunci("");
          setFilterJenis("");
          setFilterKategori("");
          setFilterGolongan("");
          setFilterStatus(padaTabSampah ? "0" : "1");
          setHalaman(1);
        } : undefined}
        disabledHapus={!terpilih || sedangMenyimpan || terpilih.status !== "1"}
        disabledGanti={!terpilih || sedangMenyimpan}
        kataKunci={padaTabTabel ? kataKunci : undefined}
        onGantiKataKunci={padaTabTabel ? setKataKunci : undefined}
        onCari={padaTabTabel ? () => { setHalaman(1); void muatData(); } : undefined}
        placeholderCari="Cari kode, nama, atau kandungan barang..."
        filterTambahan={padaTabTabel ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {filterSelect("Jenis", filterJenis, setFilterJenis, opsi?.jenis || [], "-- Semua jenis --")}
            {filterSelect("Kategori", filterKategori, setFilterKategori, opsi?.kategori || [], "-- Semua kategori --")}
            {filterSelect("Golongan", filterGolongan, setFilterGolongan, opsi?.golongan || [], "-- Semua golongan --")}
          </div>
        ) : undefined}
        jumlahRecord={padaTabTabel ? total : 0}
        tampilkanRecord={padaTabTabel}
        pagination={padaTabTabel ? pagination : undefined}
        memuat={sedangMenyimpan}
        tombolTambahan={padaTabSampah ? [{
          label: "Pulihkan",
          onClick: () => setDialogStatus("pulihkan"),
          disabled: !terpilih || sedangMenyimpan || terpilih.status !== "0",
          tooltip: "Aktifkan kembali barang yang dinonaktifkan",
        }] : undefined}
      />

      <KonfirmasiDialog
        terbuka={dialogStatus !== null}
        judul={dialogStatus === "pulihkan" ? "Pulihkan Data Barang" : "Nonaktifkan Data Barang"}
        pesan={dialogStatus === "pulihkan"
          ? `Aktifkan kembali barang ${terpilih?.nama_brng} (${terpilih?.kode_brng})?`
          : `Nonaktifkan barang ${terpilih?.nama_brng} (${terpilih?.kode_brng})?`}
        subPesan={dialogStatus === "pulihkan"
          ? "Barang akan kembali tersedia dalam daftar dan transaksi."
          : "Barang tidak akan muncul dalam daftar aktif, tetapi riwayat transaksi tetap tersimpan."}
        teksBatal="Batal"
        teksKonfirmasi={dialogStatus === "pulihkan" ? "Ya, Pulihkan" : "Ya, Nonaktifkan"}
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

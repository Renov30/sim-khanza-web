"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPrescription, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { registrationDate } from "@/lib/registrasi/date";

interface Kunjungan {
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
  png_jawab: string;
  status_bayar: string;
  pasien_ranap: number | string;
}

interface ObatKatalog {
  kode_brng: string;
  nama_brng: string;
  kode_sat: string;
  jenis: string;
  letak_barang: string;
  kapasitas: number | string;
  stok: number | string;
}

interface ObatResep extends ObatKatalog {
  jumlah: string;
  aturan_pakai: string;
}

interface BahanRacikan extends ObatKatalog {
  p1: string;
  p2: string;
  kandungan: string;
  jumlah: string;
}

interface Racikan {
  id: string;
  nama_racik: string;
  kd_racik: string;
  jumlah: string;
  aturan_pakai: string;
  keterangan: string;
  detail: BahanRacikan[];
}

interface MetodeRacik { kd_racik: string; nm_racik: string }
interface RiwayatResep {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  kd_dokter: string;
  nm_dokter: string;
  jumlah_obat: number | string;
  jumlah_racikan: number | string;
}

const racikanKosong = () => ({
  nama_racik: "",
  kd_racik: "",
  jumlah: "",
  aturan_pakai: "",
  keterangan: "",
});

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function pesanDari(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function HalamanInputResep() {
  const { isAuthenticated } = useAuth();
  const [kunjungan, setKunjungan] = useState<Kunjungan | null>(null);
  const [cariKunjungan, setCariKunjungan] = useState("");
  const [hasilKunjungan, setHasilKunjungan] = useState<Kunjungan[]>([]);
  const [memuatKunjungan, setMemuatKunjungan] = useState(false);
  const [tanggal, setTanggal] = useState(registrationDate());
  const [jam, setJam] = useState(jamJayapura);
  const [modeInput, setModeInput] = useState<"nonracikan" | "racikan">("nonracikan");
  const [cariObat, setCariObat] = useState("");
  const [katalog, setKatalog] = useState<ObatKatalog[]>([]);
  const [memuatObat, setMemuatObat] = useState(false);
  const [depo, setDepo] = useState("");
  const [obat, setObat] = useState<ObatResep[]>([]);
  const [bahan, setBahan] = useState<BahanRacikan[]>([]);
  const [racikan, setRacikan] = useState<Racikan[]>([]);
  const [draftRacikan, setDraftRacikan] = useState(racikanKosong);
  const [metode, setMetode] = useState<MetodeRacik[]>([]);
  const [riwayat, setRiwayat] = useState<RiwayatResep[]>([]);
  const [memuatRiwayat, setMemuatRiwayat] = useState(false);
  const [versiData, setVersiData] = useState(0);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  const pilihKunjungan = useCallback((item: Kunjungan) => {
    setKunjungan(item);
    setCariKunjungan(`${item.no_rawat} · ${item.nm_pasien}`);
    setHasilKunjungan([]);
    setCariObat("");
    setKatalog([]);
    setObat([]);
    setBahan([]);
    setRacikan([]);
    setDraftRacikan(racikanKosong());
    setRiwayat([]);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const noRawat = new URLSearchParams(window.location.search).get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 17) return;
    const controller = new AbortController();
    async function muatPilihanAwal() {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&no_rawat=${encodeURIComponent(noRawat)}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat kunjungan");
        const item = json.data?.[0];
        if (!item) throw new Error("Kunjungan rawat jalan tidak ditemukan.");
        pilihKunjungan(item);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }
    void muatPilihanAwal();
    return () => controller.abort();
  }, [isAuthenticated, pilihKunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated || kunjungan || cariKunjungan.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&cari=${encodeURIComponent(cariKunjungan.trim())}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal mencari kunjungan");
        setHasilKunjungan(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal mencari kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariKunjungan, isAuthenticated, kunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    async function muatMetode() {
      try {
        const response = await fetch("/api/farmasi/resep-obat?resource=metode", { signal: controller.signal });
        const json: { success?: boolean; data?: MetodeRacik[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat metode racikan");
        setMetode(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat metode racikan"), "error");
      }
    }
    void muatMetode();
    return () => controller.abort();
  }, [isAuthenticated, tampilkanToast]);

  useEffect(() => {
    if (!kunjungan) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatObat(true);
      try {
        const url = `/api/farmasi/resep-obat?resource=obat&no_rawat=${encodeURIComponent(kunjungan.no_rawat)}&cari=${encodeURIComponent(cariObat.trim())}`;
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: ObatKatalog[]; error?: string; meta?: { depot?: { kd_bangsal: string; nm_bangsal: string } } } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat obat");
        setKatalog(json.data || []);
        const infoDepo = json.meta?.depot;
        setDepo(infoDepo ? `${infoDepo.kd_bangsal} · ${infoDepo.nm_bangsal}` : "");
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat obat"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatObat(false);
      }
    }, cariObat ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariObat, kunjungan, tampilkanToast]);

  useEffect(() => {
    if (!kunjungan) return;
    const controller = new AbortController();
    async function muatRiwayat() {
      setMemuatRiwayat(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=riwayat&no_rawat=${encodeURIComponent(kunjungan!.no_rawat)}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: RiwayatResep[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat riwayat resep");
        setRiwayat(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat riwayat resep"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatRiwayat(false);
      }
    }
    void muatRiwayat();
    return () => controller.abort();
  }, [kunjungan, tampilkanToast, versiData]);

  const jumlahItem = obat.length + racikan.length;
  const jumlahBahan = useMemo(() => racikan.reduce((total, item) => total + item.detail.length, 0), [racikan]);

  const tambahDariKatalog = (item: ObatKatalog) => {
    if (modeInput === "nonracikan") {
      if (obat.some((baris) => baris.kode_brng === item.kode_brng)) return tampilkanToast("Obat sudah ada dalam resep nonracikan.", "info");
      setObat((lama) => [...lama, { ...item, jumlah: "", aturan_pakai: "" }]);
      return;
    }
    if (bahan.some((baris) => baris.kode_brng === item.kode_brng)) return tampilkanToast("Obat sudah ada dalam racikan aktif.", "info");
    setBahan((lama) => [...lama, { ...item, p1: "", p2: "", kandungan: "", jumlah: "" }]);
  };

  const tambahRacikan = () => {
    if (!draftRacikan.nama_racik.trim() || !draftRacikan.kd_racik || Number(draftRacikan.jumlah) <= 0 || !draftRacikan.aturan_pakai.trim()) {
      return tampilkanToast("Lengkapi nama, metode, jumlah, dan aturan pakai racikan.", "error");
    }
    if (bahan.length === 0 || bahan.some((item) => Number(item.jumlah) <= 0)) {
      return tampilkanToast("Tambahkan bahan racikan dan isi jumlah setiap bahan.", "error");
    }
    setRacikan((lama) => [...lama, { id: crypto.randomUUID(), ...draftRacikan, detail: bahan }]);
    setDraftRacikan(racikanKosong());
    setBahan([]);
  };

  const resetForm = () => {
    setKunjungan(null);
    setCariKunjungan("");
    setHasilKunjungan([]);
    setTanggal(registrationDate());
    setJam(jamJayapura());
    setModeInput("nonracikan");
    setCariObat("");
    setKatalog([]);
    setDepo("");
    setObat([]);
    setBahan([]);
    setRacikan([]);
    setDraftRacikan(racikanKosong());
    setRiwayat([]);
  };

  const mintaSimpan = () => {
    if (!kunjungan) return tampilkanToast("Pilih kunjungan rawat jalan terlebih dahulu.", "error");
    if (Number(kunjungan.pasien_ranap)) return tampilkanToast("Pasien sudah masuk kamar inap; gunakan resep rawat inap.", "error");
    if (jumlahItem === 0) return tampilkanToast("Masukkan minimal satu obat atau racikan.", "error");
    if (obat.some((item) => Number(item.jumlah) <= 0)) return tampilkanToast("Jumlah obat nonracikan harus lebih dari nol.", "error");
    if (bahan.length > 0) return tampilkanToast("Selesaikan atau kosongkan racikan yang sedang disusun.", "error");
    setKonfirmasi(true);
  };

  const simpan = async () => {
    if (!kunjungan) return;
    setMenyimpan(true);
    try {
      const response = await fetch("/api/farmasi/resep-obat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: kunjungan.no_rawat, tanggal, jam, obat, racikan }),
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Resep gagal disimpan");
      setKonfirmasi(false);
      setObat([]);
      setRacikan([]);
      setBahan([]);
      setDraftRacikan(racikanKosong());
      setVersiData((nilai) => nilai + 1);
      tampilkanToast(json.message || "Resep berhasil disimpan.", "sukses");
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resep gagal disimpan"), "error");
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <PanelInputData judul="Input Resep Rawat Jalan" idPenyimpanan="input-resep-rawat-jalan" onSimpan={mintaSimpan} onBaru={resetForm} teksBaru="Baru" sedangMenyimpan={menyimpan}>
        <GridFormulirModul className="items-start">
          <div className="space-y-2">
            <label className="block text-xs text-slate-700">
              <span className="mb-1 block">No. Rawat / RM / Pasien</span>
              <input value={cariKunjungan} onChange={(event) => { setCariKunjungan(event.target.value); setKunjungan(null); setHasilKunjungan([]); setObat([]); setRacikan([]); setRiwayat([]); }} placeholder="Ketik minimal 2 karakter..." className="h-8 w-full rounded-lg border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" />
            </label>
            {!kunjungan && (memuatKunjungan || hasilKunjungan.length > 0) && <div className="max-h-36 overflow-auto rounded-lg border border-slate-200 bg-white">
              {memuatKunjungan ? <p className="p-2 text-xs text-slate-500">Mencari kunjungan...</p> : hasilKunjungan.map((item) => <button key={item.no_rawat} type="button" onClick={() => pilihKunjungan(item)} className="block w-full border-b border-slate-100 px-2.5 py-2 text-left text-xs hover:bg-slate-50"><span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span><span className="block text-slate-700">{item.nm_pasien} · {item.nm_poli}</span></button>)}
            </div>}
            {kunjungan && <div className="rounded-lg border border-primary-200 bg-primary-50/50 p-2 text-xs text-slate-700">
              <p className="font-semibold text-slate-800">{kunjungan.nm_pasien} <span className="font-normal">({kunjungan.jk}, {kunjungan.umurdaftar} {kunjungan.sttsumur})</span></p>
              <p className="font-mono">{kunjungan.no_rawat} · {kunjungan.no_rkm_medis}</p>
              <p>{kunjungan.nm_poli} · {kunjungan.png_jawab} · {kunjungan.status_bayar}</p>
              {Number(kunjungan.pasien_ranap) > 0 && <p className="mt-1 font-semibold text-red-700">Pasien sudah masuk kamar inap.</p>}
            </div>}
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-700">Tanggal<input type="date" value={tanggal} onChange={(event) => setTanggal(event.target.value)} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
              <label className="text-xs text-slate-700">Jam<input type="time" step="1" value={jam} onChange={(event) => setJam(event.target.value)} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
            </div>
            <label className="block text-xs text-slate-700">Dokter<input readOnly value={kunjungan ? `${kunjungan.kd_dokter} · ${kunjungan.nm_dokter}` : ""} className="mt-1 h-8 w-full rounded-lg border border-slate-300 bg-slate-100 px-2.5 text-xs text-slate-700" /></label>
          </div>

          <div className="space-y-2">
            <div role="tablist" aria-label="Jenis resep" className="flex border-b border-slate-200">
              {([['nonracikan', 'Nonracikan'], ['racikan', 'Racikan']] as const).map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={modeInput === id} onClick={() => setModeInput(id)} className={`border-b-2 px-3 py-1.5 text-xs font-semibold ${modeInput === id ? "border-primary-700 text-slate-900" : "border-transparent text-slate-500"}`}>{label}</button>)}
            </div>
            {modeInput === "racikan" && <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-700">Nama Racikan<input value={draftRacikan.nama_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, nama_racik: event.target.value }))} placeholder={`Racikan ${racikan.length + 1}`} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
              <label className="text-xs text-slate-700">Metode<CustomSelect value={draftRacikan.kd_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, kd_racik: event.target.value }))} className="mt-1 h-8 py-1"><option value="">Pilih metode</option>{metode.map((item) => <option key={item.kd_racik} value={item.kd_racik}>{item.nm_racik}</option>)}</CustomSelect></label>
              <label className="text-xs text-slate-700">Jumlah Jadi<input type="number" min="0" step="any" value={draftRacikan.jumlah} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, jumlah: event.target.value }))} className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
              <label className="text-xs text-slate-700">Aturan Pakai<input value={draftRacikan.aturan_pakai} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, aturan_pakai: event.target.value }))} placeholder="Contoh: 3 x 1" className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
              <label className="col-span-2 text-xs text-slate-700">Keterangan<input value={draftRacikan.keterangan} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, keterangan: event.target.value }))} placeholder="Contoh: Habiskan" className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" /></label>
            </div>}
            <label className="block text-xs text-slate-700">Cari Obat / BHP<input value={cariObat} onChange={(event) => setCariObat(event.target.value)} disabled={!kunjungan} placeholder="Kode, nama, jenis, atau letak obat..." className="mt-1 h-8 w-full rounded-lg border border-slate-300 px-2.5 text-xs focus:border-primary-600 focus:outline-none disabled:bg-slate-100" /></label>
            <p className="text-[10px] text-slate-500">Depo: {depo || "-"}</p>
            <div className="max-h-44 overflow-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-[11px]"><caption className="sr-only">Daftar obat yang tersedia di depo</caption><thead className="sticky top-0 bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2 py-1.5">Obat</th><th scope="col" className="px-2 py-1.5">Satuan</th><th scope="col" className="px-2 py-1.5 text-right">Stok</th><th scope="col" className="w-16 px-2 py-1.5 text-center">Aksi</th></tr></thead>
                <tbody className="divide-y divide-slate-100">{!kunjungan ? <tr><td colSpan={4} className="p-6 text-center text-slate-400">Pilih kunjungan untuk memuat obat.</td></tr> : memuatObat ? <tr><td colSpan={4} className="p-6 text-center text-slate-500">Memuat obat...</td></tr> : katalog.length === 0 ? <tr><td colSpan={4} className="p-6 text-center text-slate-400">Obat tidak ditemukan.</td></tr> : katalog.map((item) => <tr key={item.kode_brng}><td className="px-2 py-1.5"><span className="font-mono text-slate-600">{item.kode_brng}</span><span className="block text-slate-800">{item.nama_brng}</span></td><td className="px-2 py-1.5 text-slate-600">{item.kode_sat}</td><td className="px-2 py-1.5 text-right font-mono">{Number(item.stok).toLocaleString("id-ID")}</td><td className="px-2 py-1.5 text-center"><button type="button" onClick={() => tambahDariKatalog(item)} aria-label={`Tambah ${item.nama_brng}`} className="inline-flex h-6 w-6 items-center justify-center rounded border border-primary-200 text-primary-700"><FontAwesomeIcon icon={faPlus} className="h-3 w-3" /></button></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </GridFormulirModul>

        {modeInput === "nonracikan" ? <div className="mt-3 overflow-auto rounded-lg border border-slate-200"><table className="w-full min-w-[620px] border-collapse text-left text-[11px]"><caption className="sr-only">Obat nonracikan dalam resep</caption><thead className="bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2 py-1.5">Obat</th><th scope="col" className="w-28 px-2 py-1.5">Jumlah</th><th scope="col" className="w-64 px-2 py-1.5">Aturan Pakai</th><th scope="col" className="w-16 px-2 py-1.5 text-center">Hapus</th></tr></thead><tbody className="divide-y divide-slate-100">{obat.length === 0 ? <tr><td colSpan={4} className="p-5 text-center text-slate-400">Belum ada obat nonracikan.</td></tr> : obat.map((item) => <tr key={item.kode_brng}><td className="px-2 py-1.5"><span className="font-mono text-slate-600">{item.kode_brng}</span> · {item.nama_brng}</td><td className="px-2 py-1.5"><input aria-label={`Jumlah ${item.nama_brng}`} type="number" min="0" step="any" value={item.jumlah} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, jumlah: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2" /></td><td className="px-2 py-1.5"><input aria-label={`Aturan pakai ${item.nama_brng}`} value={item.aturan_pakai} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, aturan_pakai: event.target.value } : baris))} placeholder="Contoh: 3 x 1 sesudah makan" className="h-7 w-full rounded border border-slate-300 px-2" /></td><td className="px-2 py-1.5 text-center"><button type="button" onClick={() => setObat((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng))} aria-label={`Hapus ${item.nama_brng}`} className="text-red-600"><FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" /></button></td></tr>)}</tbody></table></div>
        : <div className="mt-3 space-y-2"><div className="overflow-auto rounded-lg border border-slate-200"><table className="w-full min-w-[760px] border-collapse text-left text-[11px]"><caption className="sr-only">Bahan racikan aktif</caption><thead className="bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2 py-1.5">Bahan</th><th scope="col" className="w-20 px-2 py-1.5">P1</th><th scope="col" className="w-20 px-2 py-1.5">P2</th><th scope="col" className="w-24 px-2 py-1.5">Kandungan</th><th scope="col" className="w-24 px-2 py-1.5">Jumlah</th><th scope="col" className="w-14 px-2 py-1.5">Hapus</th></tr></thead><tbody className="divide-y divide-slate-100">{bahan.length === 0 ? <tr><td colSpan={6} className="p-5 text-center text-slate-400">Belum ada bahan pada racikan aktif.</td></tr> : bahan.map((item) => <tr key={item.kode_brng}><td className="px-2 py-1.5"><span className="font-mono text-slate-600">{item.kode_brng}</span> · {item.nama_brng}</td>{(['p1', 'p2', 'kandungan', 'jumlah'] as const).map((kolom) => <td key={kolom} className="px-2 py-1.5"><input aria-label={`${kolom} ${item.nama_brng}`} type={kolom === 'kandungan' ? 'text' : 'number'} min={kolom === 'kandungan' ? undefined : '0'} step="any" value={item[kolom]} onChange={(event) => setBahan((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, [kolom]: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2" /></td>)}<td className="px-2 py-1.5 text-center"><button type="button" onClick={() => setBahan((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng))} aria-label={`Hapus ${item.nama_brng}`} className="text-red-600"><FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" /></button></td></tr>)}</tbody></table></div><div className="flex justify-end"><button type="button" onClick={tambahRacikan} className="h-7 rounded-lg bg-primary-700 px-3 text-xs font-semibold text-white">Tambahkan Racikan</button></div>
          {racikan.map((item, index) => <div key={item.id} className="flex items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700"><div><p className="font-semibold text-slate-800">{index + 1}. {item.nama_racik} · {metode.find((pilihan) => pilihan.kd_racik === item.kd_racik)?.nm_racik || item.kd_racik}</p><p>{item.jumlah} · {item.aturan_pakai} · {item.keterangan || "-"}</p><p className="text-[10px] text-slate-500">{item.detail.map((detail) => `${detail.nama_brng} (${detail.jumlah})`).join("; ")}</p></div><button type="button" onClick={() => setRacikan((lama) => lama.filter((baris) => baris.id !== item.id))} aria-label={`Hapus racikan ${item.nama_racik}`} className="p-1 text-red-600"><FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" /></button></div>)}</div>}
      </PanelInputData>

      <section className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-xs"><caption className="sr-only">Riwayat resep pada kunjungan terpilih</caption><thead className="sticky top-0 bg-slate-100 text-slate-700"><tr><th scope="col" className="px-2.5 py-2">No. Resep</th><th scope="col" className="px-2.5 py-2">Tanggal &amp; Jam</th><th scope="col" className="px-2.5 py-2">Dokter</th><th scope="col" className="px-2.5 py-2 text-right">Obat</th><th scope="col" className="px-2.5 py-2 text-right">Racikan</th></tr></thead><tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">{!kunjungan ? <tr><td colSpan={5} className="py-10 text-center text-slate-400"><FontAwesomeIcon icon={faPrescription} className="mb-2 h-7 w-7 text-slate-300" /><p>Pilih kunjungan untuk melihat riwayat resep.</p></td></tr> : memuatRiwayat ? <tr><td colSpan={5} className="py-10 text-center text-slate-500">Memuat riwayat resep...</td></tr> : riwayat.length === 0 ? <tr><td colSpan={5} className="py-10 text-center text-slate-400">Belum ada resep pada kunjungan ini.</td></tr> : riwayat.map((item) => <tr key={item.no_resep}><td className="px-2.5 py-2 font-mono">{item.no_resep}</td><td className="px-2.5 py-2 font-mono">{item.tgl_peresepan} {item.jam_peresepan}</td><td className="px-2.5 py-2">{item.nm_dokter}</td><td className="px-2.5 py-2 text-right font-mono">{item.jumlah_obat}</td><td className="px-2.5 py-2 text-right font-mono">{item.jumlah_racikan}</td></tr>)}</tbody></table>
      </section>

      <PanelBawah tampilan="web" onSimpan={mintaSimpan} onBaru={resetForm} disabledSimpan={menyimpan || !kunjungan || jumlahItem === 0} memuat={menyimpan} jumlahRecord={riwayat.length} totalLabel="Item resep" nilaiTotal={`${obat.length} obat · ${racikan.length} racikan · ${jumlahBahan} bahan`} />
      <KonfirmasiDialog terbuka={konfirmasi} judul="Simpan Resep" pesan={`Simpan ${jumlahItem} item resep untuk ${kunjungan?.nm_pasien || "pasien"}?`} subPesan="Resep akan mendapat nomor baru dan masuk ke antrean pelayanan farmasi." teksKonfirmasi="Simpan Resep" bahaya={false} sedangMemproses={menyimpan} onBatal={() => setKonfirmasi(false)} onKonfirmasi={() => void simpan()} />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

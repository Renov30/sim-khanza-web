"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";
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
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  const pilihKunjungan = useCallback((item: Kunjungan) => {
    setKunjungan(item);
    setCariKunjungan(item.no_rawat);
    setHasilKunjungan([]);
    setCariObat("");
    setKatalog([]);
    setObat([]);
    setBahan([]);
    setRacikan([]);
    setDraftRacikan(racikanKosong());
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
  };

  const mintaSimpan = () => {
    if (!kunjungan) return tampilkanToast("Pilih kunjungan rawat jalan terlebih dahulu.", "error");
    if (Number(kunjungan.pasien_ranap)) return tampilkanToast("Pasien sudah masuk kamar inap; gunakan resep rawat inap.", "error");
    if (obat.length + racikan.length === 0) return tampilkanToast("Masukkan minimal satu obat atau racikan.", "error");
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
      tampilkanToast(json.message || "Resep berhasil disimpan.", "sukses");
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resep gagal disimpan"), "error");
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="space-y-2 text-xs text-slate-700">
          <div className="relative flex flex-wrap items-center gap-2">
            <label htmlFor="no-rawat-resep" className="w-24 shrink-0 text-right">No. Rawat :</label>
            <input
              id="no-rawat-resep"
              value={cariKunjungan}
              onChange={(event) => {
                setCariKunjungan(event.target.value);
                setKunjungan(null);
                setHasilKunjungan([]);
                setObat([]);
                setBahan([]);
                setRacikan([]);
              }}
              placeholder="No. rawat, RM, atau nama pasien"
              className="h-8 w-64 rounded-full border border-slate-300 px-3 font-mono text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
            />
            <input
              readOnly
              aria-label="Identitas pasien"
              value={kunjungan ? `${kunjungan.no_rkm_medis}  ${kunjungan.nm_pasien} (${kunjungan.jk}, ${kunjungan.umurdaftar} ${kunjungan.sttsumur})` : ""}
              placeholder="Identitas pasien"
              className="h-8 min-w-64 flex-1 rounded-full border border-slate-300 bg-slate-50 px-3 text-xs text-slate-700"
            />
            {!kunjungan && (memuatKunjungan || hasilKunjungan.length > 0) && (
              <div className="absolute left-[6.5rem] top-9 z-20 max-h-48 w-[min(42rem,calc(100%-6.5rem))] overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                {memuatKunjungan ? (
                  <p className="p-2.5 text-slate-500">Mencari kunjungan...</p>
                ) : hasilKunjungan.map((item) => (
                  <button key={item.no_rawat} type="button" onClick={() => pilihKunjungan(item)} className="block w-full border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50">
                    <span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span>
                    <span className="block text-slate-600">{item.nm_pasien} · {item.nm_poli}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tanggal-resep" className="w-24 shrink-0 text-right">Tgl. Resep :</label>
            <input id="tanggal-resep" type="date" value={tanggal} onChange={(event) => setTanggal(event.target.value)} className="h-8 w-36 rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            <input aria-label="Jam resep" type="time" step="1" value={jam} onChange={(event) => setJam(event.target.value)} className="h-8 w-32 rounded-lg border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            {Number(kunjungan?.pasien_ranap) > 0 && <span className="font-semibold text-red-700">Pasien sudah masuk kamar inap.</span>}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="dokter-resep" className="w-24 shrink-0 text-right">Peresep :</label>
            <input id="dokter-resep" readOnly value={kunjungan?.kd_dokter || ""} className="h-8 w-64 rounded-full border border-slate-300 bg-slate-50 px-3 font-mono text-xs text-slate-700" />
            <input readOnly aria-label="Nama dokter peresep" value={kunjungan?.nm_dokter || ""} className="h-8 min-w-64 flex-1 rounded-full border border-slate-300 bg-slate-50 px-3 text-xs text-slate-700" />
          </div>

          {kunjungan && (
            <p className="pl-[6.5rem] text-[11px] text-slate-500">
              {kunjungan.nm_poli} · {kunjungan.png_jawab} · {kunjungan.status_bayar}
            </p>
          )}
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Jenis resep" className="flex shrink-0 border-b border-slate-200 px-2">
          {([['nonracikan', 'Umum'], ['racikan', 'Racikan']] as const).map(([id, label], index, daftar) => (
            <button
              key={id}
              id={`tab-resep-${id}`}
              type="button"
              role="tab"
              aria-selected={modeInput === id}
              aria-controls={`panel-resep-${id}`}
              tabIndex={modeInput === id ? 0 : -1}
              onClick={() => setModeInput(id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const arah = event.key === "ArrowRight" ? 1 : -1;
                const berikutnya = daftar[(index + arah + daftar.length) % daftar.length][0];
                setModeInput(berikutnya);
                requestAnimationFrame(() => document.getElementById(`tab-resep-${berikutnya}`)?.focus());
              }}
              className={`border-b-2 px-4 py-2 text-xs font-semibold ${modeInput === id ? "border-primary-600 text-primary-700" : "border-transparent text-slate-600"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {modeInput === "racikan" && (
          <div className="grid shrink-0 grid-cols-1 gap-2 border-b border-slate-200 bg-slate-50 p-2 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_8rem_1.2fr_1.2fr_auto]">
            <label className="text-[11px] text-slate-700">Nama Racikan
              <input value={draftRacikan.nama_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, nama_racik: event.target.value }))} placeholder={`Racikan ${racikan.length + 1}`} className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="text-[11px] text-slate-700">Metode
              <CustomSelect value={draftRacikan.kd_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, kd_racik: event.target.value }))} className="mt-1 h-7 py-0.5 text-xs"><option value="">Pilih metode</option>{metode.map((item) => <option key={item.kd_racik} value={item.kd_racik}>{item.nm_racik}</option>)}</CustomSelect>
            </label>
            <label className="text-[11px] text-slate-700">Jumlah Jadi
              <input type="number" min="0" step="any" value={draftRacikan.jumlah} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, jumlah: event.target.value }))} className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="text-[11px] text-slate-700">Aturan Pakai
              <input value={draftRacikan.aturan_pakai} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, aturan_pakai: event.target.value }))} placeholder="Contoh: 3 x 1" className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="text-[11px] text-slate-700">Keterangan
              <input value={draftRacikan.keterangan} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, keterangan: event.target.value }))} placeholder="Contoh: Habiskan" className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <button type="button" onClick={tambahRacikan} className="self-end rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-semibold text-white">Tambahkan Racikan</button>
          </div>
        )}

        {modeInput === "racikan" && racikan.length > 0 && (
          <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-slate-200 p-2">
            {racikan.map((item, index) => (
              <div key={item.id} className="flex min-w-72 items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
                <div>
                  <p className="font-semibold text-slate-800">{index + 1}. {item.nama_racik}</p>
                  <p>{item.jumlah} · {item.aturan_pakai} · {item.detail.length} bahan</p>
                </div>
                <button type="button" onClick={() => setRacikan((lama) => lama.filter((baris) => baris.id !== item.id))} aria-label={`Hapus racikan ${item.nama_racik}`} className="p-1 text-red-600"><FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        )}

        <div id={`panel-resep-${modeInput}`} role="tabpanel" aria-labelledby={`tab-resep-${modeInput}`} className="min-h-0 flex-1 overflow-auto">
          {modeInput === "nonracikan" ? (
            <table className="w-full min-w-[1050px] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Daftar obat umum yang tersedia di depo</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-10 border-b border-r border-slate-200 px-2 py-2 text-center">Pilih</th>
                  <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2">Jumlah</th>
                  <th scope="col" className="w-64 border-b border-r border-slate-200 px-2 py-2">Aturan Pakai</th>
                  <th scope="col" className="w-32 border-b border-r border-slate-200 px-2 py-2">Kode Barang</th>
                  <th scope="col" className="min-w-64 border-b border-r border-slate-200 px-2 py-2">Nama Barang</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">Satuan</th>
                  <th scope="col" className="w-44 border-b border-r border-slate-200 px-2 py-2">Jenis Obat</th>
                  <th scope="col" className="w-44 border-b border-r border-slate-200 px-2 py-2">Letak</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2 text-right">Stok</th>
                </tr>
              </thead>
              <tbody>
                {!kunjungan ? (
                  <tr><td colSpan={9} className="p-10 text-center text-slate-400">Pilih kunjungan untuk memuat daftar obat.</td></tr>
                ) : memuatObat ? (
                  <tr><td colSpan={9} className="p-10 text-center text-slate-500">Memuat daftar obat...</td></tr>
                ) : katalog.length === 0 ? (
                  <tr><td colSpan={9} className="p-10 text-center text-slate-400">Obat tidak ditemukan.</td></tr>
                ) : katalog.map((item) => {
                  const terpilih = obat.find((baris) => baris.kode_brng === item.kode_brng);
                  return (
                    <tr key={item.kode_brng} className={terpilih ? "bg-primary-50/60" : "even:bg-slate-50/70"}>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center"><input type="checkbox" checked={Boolean(terpilih)} onChange={() => terpilih ? setObat((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng)) : tambahDariKatalog(item)} aria-label={`${terpilih ? "Hapus" : "Pilih"} ${item.nama_brng}`} className="h-4 w-4 accent-primary-600" /></td>
                      <td className="border-b border-r border-slate-100 px-1.5 py-1"><input disabled={!terpilih} aria-label={`Jumlah ${item.nama_brng}`} type="number" min="0" step="any" value={terpilih?.jumlah || ""} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, jumlah: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2 text-xs disabled:border-transparent disabled:bg-transparent" /></td>
                      <td className="border-b border-r border-slate-100 px-1.5 py-1"><input disabled={!terpilih} aria-label={`Aturan pakai ${item.nama_brng}`} value={terpilih?.aturan_pakai || ""} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, aturan_pakai: event.target.value } : baris))} placeholder={terpilih ? "Contoh: 3 x 1 sesudah makan" : ""} className="h-7 w-full rounded border border-slate-300 px-2 text-xs disabled:border-transparent disabled:bg-transparent" /></td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.kode_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{item.nama_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.kode_sat}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.jenis || "-"}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.letak_barang || "-"}</td>
                      <td className="border-b border-slate-100 px-2 py-1.5 text-right font-mono tabular-nums">{Number(item.stok).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[1120px] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Daftar bahan obat untuk racikan aktif</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-10 border-b border-r border-slate-200 px-2 py-2 text-center">Pilih</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">P1</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">P2</th>
                  <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2">Kandungan</th>
                  <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2">Jumlah</th>
                  <th scope="col" className="w-32 border-b border-r border-slate-200 px-2 py-2">Kode Barang</th>
                  <th scope="col" className="min-w-64 border-b border-r border-slate-200 px-2 py-2">Nama Barang</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">Satuan</th>
                  <th scope="col" className="w-40 border-b border-r border-slate-200 px-2 py-2">Jenis Obat</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2 text-right">Stok</th>
                </tr>
              </thead>
              <tbody>
                {!kunjungan ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-400">Pilih kunjungan untuk memuat bahan racikan.</td></tr>
                ) : memuatObat ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-500">Memuat daftar obat...</td></tr>
                ) : katalog.length === 0 ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-400">Obat tidak ditemukan.</td></tr>
                ) : katalog.map((item) => {
                  const terpilih = bahan.find((baris) => baris.kode_brng === item.kode_brng);
                  return (
                    <tr key={item.kode_brng} className={terpilih ? "bg-primary-50/60" : "even:bg-slate-50/70"}>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center"><input type="checkbox" checked={Boolean(terpilih)} onChange={() => terpilih ? setBahan((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng)) : tambahDariKatalog(item)} aria-label={`${terpilih ? "Hapus" : "Pilih"} ${item.nama_brng}`} className="h-4 w-4 accent-primary-600" /></td>
                      {(['p1', 'p2', 'kandungan', 'jumlah'] as const).map((kolom) => (
                        <td key={kolom} className="border-b border-r border-slate-100 px-1.5 py-1"><input disabled={!terpilih} aria-label={`${kolom} ${item.nama_brng}`} type={kolom === "kandungan" ? "text" : "number"} min={kolom === "kandungan" ? undefined : "0"} step="any" value={terpilih?.[kolom] || ""} onChange={(event) => setBahan((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, [kolom]: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2 text-xs disabled:border-transparent disabled:bg-transparent" /></td>
                      ))}
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.kode_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{item.nama_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.kode_sat}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.jenis || "-"}</td>
                      <td className="border-b border-slate-100 px-2 py-1.5 text-right font-mono tabular-nums">{Number(item.stok).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        kataKunci={cariObat}
        onGantiKataKunci={setCariObat}
        placeholderCari="Kode, nama, jenis, atau letak obat..."
        filterTambahan={(
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Tarif :</span>
            <CustomSelect value="ralan" disabled aria-label="Tarif resep" className="h-7 w-32 py-0.5 text-xs"><option value="ralan">Rawat Jalan</option></CustomSelect>
            <span className="max-w-80 truncate text-[11px] text-slate-500" title={depo || undefined}>Depo : {depo || "-"}</span>
          </div>
        )}
        onSimpan={mintaSimpan}
        onBaru={resetForm}
        disabledSimpan={menyimpan || !kunjungan || obat.length + racikan.length === 0}
        memuat={menyimpan}
        jumlahRecord={katalog.length}
      />
      <KonfirmasiDialog terbuka={konfirmasi} judul="Simpan Resep" pesan={`Simpan resep untuk ${kunjungan?.nm_pasien || "pasien"}?`} subPesan="Resep akan mendapat nomor baru dan masuk ke antrean pelayanan farmasi." teksKonfirmasi="Simpan Resep" bahaya={false} sedangMemproses={menyimpan} onBatal={() => setKonfirmasi(false)} onKonfirmasi={() => void simpan()} />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

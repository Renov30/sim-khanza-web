"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faFileCirclePlus, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { BarisApi } from "@/lib/types/api";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { registrationDate } from "@/lib/registrasi/date";

type Tab = "umum" | "racikan";
type Item = { kode: string; nama: string; kategori: string; satuan: string; harga: number; jumlah: number; potongan: number; tambahan: number; embalase: number; tuslah: number; aturan: string; stok: number };
const jenisJual = ["Jual Bebas", "Karyawan", "Beli Luar", "Rawat Jalan", "Kelas 1", "Kelas 2", "Kelas 3", "Utama/BPJS", "VIP", "VVIP"];
const number = (value: unknown) => Number(value) || 0;
const money = (value: number) => value.toLocaleString("id-ID");
const nota = (date: string) => `PJ${date.replaceAll("-", "").slice(2)}`;
const totalItem = (item: Item) => {
  const subtotal = item.harga * item.jumlah;
  const diskon = subtotal * item.potongan / 100;
  return { subtotal, diskon, total: subtotal - diskon + item.tambahan + item.embalase + item.tuslah };
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid grid-cols-[5.25rem_minmax(0,1fr)] items-center gap-2 text-xs text-slate-700"><span className="text-right">{label}</span>{children}</label>;
}

export default function HalamanInputPenjualan() {
  const [barang, setBarang] = useState<BarisApi[]>([]);
  const [gudang, setGudang] = useState<BarisApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("umum");
  const [tanggal, setTanggal] = useState(registrationDate());
  const [noNota, setNoNota] = useState(() => nota(registrationDate()));
  const [catatan, setCatatan] = useState("");
  const [jenis, setJenis] = useState(jenisJual[0]);
  const [pasien, setPasien] = useState("");
  const [petugas, setPetugas] = useState("");
  const [lokasi, setLokasi] = useState("AP");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [ppn, setPpn] = useState("11");
  const [ongkir, setOngkir] = useState("0");
  const [akun, setAkun] = useState("Tunai");
  const [bayar, setBayar] = useState("0");
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/farmasi/input-penjualan?kd_bangsal=${encodeURIComponent(lokasi)}`, { cache: "no-store" });
      const json: { success?: boolean; data?: { barang?: BarisApi[]; gudang?: BarisApi[] }; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat katalog barang farmasi");
      setBarang(json.data?.barang ?? []); setGudang(json.data?.gudang ?? []);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Terjadi kesalahan jaringan"); }
    finally { setLoading(false); }
  }, [lokasi]);
  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const grandTotal = useMemo(() => items.reduce((total, item) => total + totalItem(item).total, 0), [items]);
  const nilaiPpn = grandTotal * number(ppn) / 100;
  const tagihan = grandTotal + nilaiPpn + number(ongkir);
  const kembali = number(bayar) - tagihan;
  const lokasiAktif = gudang.find((data) => String(data.kd_bangsal) === lokasi);

  const baru = useCallback(() => {
    const date = registrationDate();
    setTanggal(date); setNoNota(nota(date)); setCatatan(""); setJenis(jenisJual[0]); setPasien(""); setPetugas(""); setKeyword(""); setItems([]); setPpn("11"); setOngkir("0"); setAkun("Tunai"); setBayar("0"); setTab("umum");
  }, []);
  const tambahItem = useCallback(() => {
    const query = keyword.trim().toLowerCase();
    const data = barang.find((row) => String(row.kode_brng).toLowerCase() === query || String(row.nama_brng).toLowerCase() === query) ?? barang.find((row) => String(row.kode_brng).toLowerCase().includes(query) || String(row.nama_brng).toLowerCase().includes(query));
    if (!data) { setToast({ pesan: "Pilih obat atau BHP dari daftar kata kunci yang tersedia.", tipe: "info" }); return; }
    const kode = String(data.kode_brng ?? "");
    setItems((previous) => {
      const exists = previous.some((item) => item.kode === kode);
      return exists ? previous.map((item) => item.kode === kode ? { ...item, jumlah: item.jumlah + 1 } : item) : [...previous, { kode, nama: String(data.nama_brng ?? "-"), kategori: String(data.kategori ?? "-"), satuan: String(data.satuan ?? data.kode_sat ?? "-"), harga: number(data.harga_jual), jumlah: 1, potongan: 0, tambahan: 0, embalase: 0, tuslah: 0, aturan: "", stok: number(data.stok) }];
    });
    setKeyword(""); setToast({ pesan: `${String(data.nama_brng)} ditambahkan ke transaksi.`, tipe: "sukses" });
  }, [barang, keyword]);
  const changeItem = (kode: string, field: keyof Item, value: string) => setItems((previous) => previous.map((item) => item.kode === kode ? { ...item, [field]: ["jumlah", "potongan", "tambahan", "embalase", "tuslah"].includes(field) ? number(value) : value } : item));
  const tabKey = (event: React.KeyboardEvent<HTMLButtonElement>, current: Tab) => { if (["ArrowRight", "ArrowLeft"].includes(event.key)) setTab(current === "umum" ? "racikan" : "umum"); if (event.key === "Home") setTab("umum"); if (event.key === "End") setTab("racikan"); };

  const columns = ["Jml", "Kode Barang", "Nama Barang", "Kategori", "Satuan", "Harga (Rp)", "Subtotal (Rp)", "Ptg (%)", "Ptg (Rp)", "Tmb (Rp)", "Emb (Rp)", "Tsl (Rp)", "Aturan Pakai", "Total (Rp)", "Stok", "No. Batch", "No. Faktur", "Kadaluarsa"];
  const input = "h-7 rounded-md border border-slate-300 px-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none";

  return <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
    <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
      <GridFormulirModul className="gap-y-2.5" tampilkanKolomCadangan={false} kolomAktifSama>
        <div className="space-y-2.5"><Field label="No. Nota"><input value={noNota} onChange={(event) => setNoNota(event.target.value)} className={`${input} font-mono tabular-nums`} /></Field><Field label="Catatan"><input value={catatan} onChange={(event) => setCatatan(event.target.value)} className={input} /></Field><Field label="Tanggal"><div className="grid grid-cols-1 gap-2 sm:grid-cols-2"><input type="date" value={tanggal} onChange={(event) => { setTanggal(event.target.value); setNoNota(nota(event.target.value)); }} className={`${input} tabular-nums`} /><CustomSelect aria-label="Jenis jual" value={jenis} onChange={(event) => setJenis(event.target.value)} className="h-7 py-0">{jenisJual.map((value) => <option key={value}>{value}</option>)}</CustomSelect></div></Field></div>
        <div className="space-y-2.5"><Field label="Pasien"><input value={pasien} onChange={(event) => setPasien(event.target.value)} placeholder="Kode atau nama pasien" className={input} /></Field><Field label="Petugas"><input value={petugas} onChange={(event) => setPetugas(event.target.value)} placeholder="Kode atau nama petugas" className={input} /></Field><Field label="Lokasi"><CustomSelect value={lokasi} onChange={(event) => setLokasi(event.target.value)} className="h-7 py-0">{gudang.map((data) => <option key={String(data.kd_bangsal)} value={String(data.kd_bangsal)}>{String(data.kd_bangsal)} — {String(data.nm_bangsal)}</option>)}</CustomSelect></Field></div>
      </GridFormulirModul>
      {lokasiAktif && <p className="mt-2 text-right text-[11px] text-slate-500">Stok transaksi dari: <span className="font-medium text-slate-700">{String(lokasiAktif.nm_bangsal)}</span></p>}
    </section>
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div role="tablist" aria-label="Detail penjualan" className="flex shrink-0 border-b border-slate-200">{(["umum", "racikan"] as const).map((value) => <button key={value} id={`tab-${value}`} type="button" role="tab" aria-selected={tab === value} aria-controls={`panel-${value}`} tabIndex={tab === value ? 0 : -1} onClick={() => setTab(value)} onKeyDown={(event) => tabKey(event, value)} className={`border-b-2 px-4 py-2 text-xs font-semibold ${tab === value ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}>{value === "umum" ? "Umum" : "Racikan"}</button>)}</div>
      {error && <div className="m-3 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"><FontAwesomeIcon icon={faCircleExclamation} className="h-3.5 w-3.5" />{error}</div>}
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} aria-busy={loading} className="min-h-0 flex-1 overflow-auto">
        {tab === "umum" ? <table className="w-full min-w-[1380px] border-collapse text-[11px] text-slate-700"><caption className="sr-only">Rincian obat, alkes, dan BHP dalam transaksi penjualan</caption><thead className="sticky top-0 z-10 bg-slate-100"><tr>{columns.map((column) => <th key={column} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{column}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{items.length === 0 ? <tr><td colSpan={18} className="h-44 border-0 text-center text-slate-400">{loading ? "Memuat katalog obat & BHP…" : "Belum ada item penjualan. Masukkan kata kunci lalu tekan Tambah Item."}</td></tr> : items.map((item) => { const calc = totalItem(item); return <tr key={item.kode} className="bg-white hover:bg-slate-50/80"><td className="px-2 py-1.5"><input aria-label={`Jumlah ${item.nama}`} value={item.jumlah} onChange={(event) => changeItem(item.kode, "jumlah", event.target.value)} className="h-6 w-11 rounded border border-slate-300 px-1 text-right tabular-nums focus:border-primary-600 focus:outline-none" /></td><td className="px-2 py-1.5 font-mono">{item.kode}</td><td className="min-w-48 px-2 py-1.5">{item.nama}</td><td className="px-2 py-1.5">{item.kategori}</td><td className="px-2 py-1.5">{item.satuan}</td><td className="px-2 py-1.5 text-right tabular-nums">{money(item.harga)}</td><td className="px-2 py-1.5 text-right tabular-nums">{money(calc.subtotal)}</td><td className="px-2 py-1.5"><input aria-label={`Potongan ${item.nama}`} value={item.potongan} onChange={(event) => changeItem(item.kode, "potongan", event.target.value)} className="h-6 w-10 rounded border border-slate-300 px-1 text-right tabular-nums focus:border-primary-600 focus:outline-none" /></td><td className="px-2 py-1.5 text-right tabular-nums">{money(calc.diskon)}</td>{(["tambahan", "embalase", "tuslah"] as const).map((field) => <td key={field} className="px-2 py-1.5"><input aria-label={`${field} ${item.nama}`} value={item[field]} onChange={(event) => changeItem(item.kode, field, event.target.value)} className="h-6 w-14 rounded border border-slate-300 px-1 text-right tabular-nums focus:border-primary-600 focus:outline-none" /></td>)}<td className="px-2 py-1.5"><input aria-label={`Aturan pakai ${item.nama}`} value={item.aturan} onChange={(event) => changeItem(item.kode, "aturan", event.target.value)} className="h-6 w-32 rounded border border-slate-300 px-1 focus:border-primary-600 focus:outline-none" /></td><td className="px-2 py-1.5 text-right font-medium tabular-nums">{money(calc.total)}</td><td className="px-2 py-1.5 text-right tabular-nums">{money(item.stok)}</td><td className="px-2 py-1.5">-</td><td className="px-2 py-1.5">-</td><td className="px-2 py-1.5">-</td></tr>; })}</tbody></table> : <table className="w-full min-w-[760px] border-collapse text-[11px] text-slate-700"><caption className="sr-only">Rincian obat racikan dalam transaksi penjualan</caption><thead className="sticky top-0 z-10 bg-slate-100"><tr>{["No.", "Nama Racikan", "Kode Racik", "Metode Racik", "Jml. Racik", "Aturan Pakai", "Keterangan"].map((column) => <th key={column} scope="col" className="border-b border-slate-200 px-2 py-2 text-center">{column}</th>)}</tr></thead><tbody><tr><td colSpan={7} className="h-44 border-0 text-center text-slate-400">Belum ada racikan pada transaksi ini.</td></tr></tbody></table>}
      </div>
    </section>
    <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm"><div className="grid grid-cols-1 gap-x-6 gap-y-2 text-xs text-slate-700 sm:grid-cols-2 xl:grid-cols-4"><p>Grand Total: <b className="ml-1 font-mono tabular-nums text-slate-900">{money(grandTotal)}</b></p><label className="flex items-center gap-1.5">PPN Obat (%): <input value={ppn} onChange={(event) => setPpn(event.target.value)} className="h-7 w-12 rounded-md border border-slate-300 px-2 text-right font-mono tabular-nums focus:border-primary-600 focus:outline-none" /><span className="font-mono tabular-nums text-slate-600">{money(nilaiPpn)}</span></label><label className="flex items-center gap-1.5">Akun Bayar: <CustomSelect aria-label="Akun bayar" value={akun} onChange={(event) => setAkun(event.target.value)} containerClassName="relative w-36"><option>Tunai</option><option>Bank BCA</option><option>Bank Mandiri</option><option>Piutang</option></CustomSelect></label><label className="flex items-center gap-1.5">Jumlah Bayar: <input value={bayar} onChange={(event) => setBayar(event.target.value)} className="h-7 min-w-0 flex-1 rounded-md border border-slate-300 px-2 text-right font-mono tabular-nums focus:border-primary-600 focus:outline-none" /></label><p>Tagihan + PPN: <b className="ml-1 font-mono tabular-nums text-slate-900">{money(tagihan)}</b></p><label className="flex items-center gap-1.5">Ongkos Kirim: <input value={ongkir} onChange={(event) => setOngkir(event.target.value)} className="h-7 min-w-0 flex-1 rounded-md border border-slate-300 px-2 text-right font-mono tabular-nums focus:border-primary-600 focus:outline-none" /></label><p className="xl:col-span-2">Kembali: <b className="ml-1 font-mono tabular-nums text-slate-900">{money(kembali)}</b></p></div></section>
    <PanelBawah tampilan="web" onBaru={baru} onSimpan={() => undefined} disabledSimpan tampilkanRecord={false} filterUtama={<div className="flex flex-wrap items-center gap-2"><label htmlFor="keyword-barang" className="whitespace-nowrap text-xs text-slate-700">Kata kunci barang:</label><input id="keyword-barang" list="katalog-barang" value={keyword} onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") tambahItem(); }} placeholder="Kode atau nama obat / BHP" className="h-7 min-w-52 flex-1 rounded-md border border-slate-300 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" /><datalist id="katalog-barang">{barang.map((data) => <option key={String(data.kode_brng)} value={String(data.kode_brng)}>{String(data.nama_brng)}</option>)}</datalist><button type="button" onClick={tambahItem} disabled={loading} className="inline-flex h-7 items-center gap-1.5 rounded-full bg-slate-50 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"><FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5 text-secondary-700" />Tambah Item</button></div>} tombolTambahan={[{ label: "Cari Barang", ikon: faMagnifyingGlass, onClick: () => setToast({ pesan: "Masukkan kode atau nama barang di kolom kata kunci.", tipe: "info" }) }, { label: "Nota Baru", ikon: faFileCirclePlus, onClick: baru, varian: "sekunder" }]} />
    <Toast message={toast?.pesan ?? null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
}

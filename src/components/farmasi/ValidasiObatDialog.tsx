"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";

interface ItemValidasi {
  jenis_item: "Obat" | "Racikan" | "Bahan Racikan";
  no_racik: string; kode_item: string; nama_item: string; jumlah: number; satuan: string;
  aturan_pakai: string; kapasitas: number; kebutuhan_stok: number; stok: number; stok_cukup: boolean;
  harga: number; keterangan: string;
}
interface DataValidasi {
  resep: { no_resep: string; no_rawat: string; no_rkm_medis: string; nm_pasien: string; nm_dokter: string; jenis: "ralan" | "ranap"; nm_unit: string; tgl_peresepan: string; jam_peresepan: string; status_pelayanan: string };
  depot: { kd_bangsal: string; nm_bangsal: string }; detail: ItemValidasi[];
}
function rupiah(nilai: number) { return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(nilai); }

export function ValidasiObatDialog({ noResep, onClose, onValidated }: { noResep: string; onClose: () => void; onValidated: () => void }) {
  const [data, setData] = useState<DataValidasi | null>(null); const [items, setItems] = useState<ItemValidasi[]>([]);
  const [tab, setTab] = useState<"umum" | "racikan">("umum"); const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false); const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function muat() {
      try {
        const response = await fetch(`/api/farmasi/validasi-obat?no_resep=${encodeURIComponent(noResep)}`, { cache: "no-store", signal: controller.signal });
        const json: { success?: boolean; data?: DataValidasi; error?: string } = await response.json();
        if (!response.ok || !json.success || !json.data) throw new Error(json.error || "Gagal memuat data validasi obat.");
        setData(json.data); setItems(json.data.detail);
      } catch (error) { if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat data validasi obat.", tipe: "error" }); }
      finally { if (!controller.signal.aborted) setMemuat(false); }
    }
    void muat(); return () => controller.abort();
  }, [noResep]);

  const tampil = items.filter((item) => tab === "umum" ? item.jenis_item !== "Racikan" : item.jenis_item === "Racikan");
  const stokTidakCukup = items.some((item) => item.jenis_item !== "Racikan" && item.stok < item.jumlah / Math.max(item.kapasitas, 1));
  const total = items.reduce((hasil, item) => item.jenis_item === "Racikan" ? hasil : hasil + item.harga * (item.jumlah / Math.max(item.kapasitas, 1)), 0);
  const ubahItem = (item: ItemValidasi, perubahan: Partial<ItemValidasi>) => setItems((lama) => lama.map((baris) => baris === item ? { ...baris, ...perubahan } : baris));
  const validasi = async () => {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/farmasi/validasi-obat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ no_resep: noResep, items: items.map(({ jenis_item, no_racik, kode_item, jumlah, aturan_pakai }) => ({ jenis_item, no_racik, kode_item, jumlah, aturan_pakai })) }) });
      const json: { success?: boolean; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Validasi obat gagal diproses.");
      setKonfirmasi(false); onValidated();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Validasi obat gagal diproses.", tipe: "error" }); }
    finally { setMenyimpan(false); }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-2 sm:p-4" role="dialog" aria-modal="true" aria-label="Validasi obat">
    <div className="flex h-[min(92vh,52rem)] w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-slate-50 shadow-xl">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2"><div className="text-xs font-semibold text-slate-900">Data Obat, Alkes &amp; BHP Medis · Resep {noResep}</div><button type="button" onClick={onClose} aria-label="Tutup validasi obat" title="Tutup validasi obat" className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"><FontAwesomeIcon icon={faXmark} className="h-4 w-4" /></button></div>
      <div className="shrink-0 border-b border-slate-200 bg-white p-3 text-xs text-slate-700"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><label>No. Rawat<input readOnly value={data?.resep.no_rawat || "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label>No. RM<input readOnly value={data?.resep.no_rkm_medis || "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label className="lg:col-span-2">Nama Pasien<input readOnly value={data?.resep.nm_pasien || "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label>Tanggal Resep<input readOnly value={data?.resep.tgl_peresepan || "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label>Jam Resep<input readOnly value={data?.resep.jam_peresepan || "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label>Tarif<input readOnly value={data?.resep.jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label><label>Depo<input readOnly value={data ? `${data.depot.kd_bangsal} · ${data.depot.nm_bangsal}` : "-"} className="mt-1 h-8 w-full rounded-full border border-slate-300 bg-slate-50 px-3" /></label></div></div>
      <div className="flex shrink-0 border-b border-slate-200 bg-white px-3" role="tablist" aria-label="Jenis resep"><button type="button" role="tab" aria-selected={tab === "umum"} onClick={() => setTab("umum")} className={`border-b-2 px-4 py-2 text-xs font-semibold ${tab === "umum" ? "border-primary-600 text-primary-700" : "border-transparent text-slate-600"}`}>Umum</button><button type="button" role="tab" aria-selected={tab === "racikan"} onClick={() => setTab("racikan")} className={`border-b-2 px-4 py-2 text-xs font-semibold ${tab === "racikan" ? "border-primary-600 text-primary-700" : "border-transparent text-slate-600"}`}>Racikan</button></div>
      <section className="min-h-0 flex-1 overflow-auto bg-white" aria-busy={memuat}><table className="w-full min-w-[74rem] border-collapse text-left text-[11px] text-slate-700"><caption className="sr-only">Rincian obat yang akan divalidasi</caption><thead className="sticky top-0 z-10 bg-slate-100"><tr>{["K", "Jumlah", "Kode Barang", "Nama Barang", "Satuan", "Harga (Rp)", "Jenis Obat", "Stok", "Aturan Pakai", "Kesiapan"].map((label) => <th key={label} scope="col" className="border-b border-slate-200 px-2 py-2 text-center">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{memuat ? <tr><td colSpan={10} className="h-36 text-center">Memuat data obat resep...</td></tr> : !data ? <tr><td colSpan={10} className="h-44 text-center text-slate-400">Data validasi belum tersedia.</td></tr> : tampil.length === 0 ? <tr><td colSpan={10} className="h-36 text-center text-slate-400">Tidak ada item pada tab ini.</td></tr> : tampil.map((item, indeks) => { const cukup = item.jenis_item === "Racikan" || item.stok >= item.jumlah / Math.max(item.kapasitas, 1); return <tr key={`${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`} className={item.jenis_item === "Racikan" ? "bg-slate-100/70 font-semibold" : ""}><td className="px-2 py-1.5 text-center"><input type="checkbox" checked readOnly aria-label={`Pilih ${item.nama_item}`} /></td><td className="px-2 py-1.5"><input type="number" min="0" step="any" value={item.jumlah} onChange={(event) => ubahItem(item, { jumlah: Number(event.target.value) || 0 })} className="h-7 w-20 rounded border border-slate-300 px-2 text-center font-mono" aria-label={`Jumlah ${item.nama_item}`} /></td><td className="px-2 py-1.5 font-mono text-center">{item.kode_item}</td><td className="px-2 py-1.5 text-slate-800">{item.nama_item}{item.keterangan && <span className="block font-normal text-slate-500">{item.keterangan}</span>}</td><td className="px-2 py-1.5 text-center">{item.satuan || "-"}</td><td className="px-2 py-1.5 text-right font-mono">{item.jenis_item === "Racikan" ? "-" : rupiah(item.harga)}</td><td className="px-2 py-1.5 text-center">{item.jenis_item}</td><td className="px-2 py-1.5 text-center font-mono">{item.jenis_item === "Racikan" ? "-" : item.stok}</td><td className="px-2 py-1.5"><input type="text" value={item.aturan_pakai} onChange={(event) => ubahItem(item, { aturan_pakai: event.target.value })} className="h-7 min-w-44 rounded border border-slate-300 px-2" aria-label={`Aturan pakai ${item.nama_item}`} /></td><td className={`px-2 py-1.5 text-center ${cukup ? "text-emerald-700" : "text-red-700"}`}>{cukup ? "Siap" : "Stok kurang"}</td></tr>; })}</tbody></table></section>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"><span>{data?.resep.jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap"} · {data?.resep.nm_unit || "-"} · Perkiraan Rp {rupiah(total)}</span>{stokTidakCukup && <span className="inline-flex items-center gap-1 text-red-700"><FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5" />Stok tidak cukup</span>}<button type="button" onClick={() => setKonfirmasi(true)} disabled={memuat || menyimpan || !data || items.length === 0 || stokTidakCukup || data.resep.status_pelayanan === "Sudah Terlayani"} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary-600 px-4 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"><FontAwesomeIcon icon={faClipboardCheck} className="h-3.5 w-3.5" />Validasi Obat</button></div>
    </div><KonfirmasiDialog terbuka={konfirmasi} judul="Validasi Obat" pesan={`Validasi resep ${noResep} untuk ${data?.resep.nm_pasien || "pasien"}?`} subPesan="Stok depo akan dikurangi dan resep ditandai sudah terlayani." teksKonfirmasi="Validasi Obat" sedangMemproses={menyimpan} onBatal={() => setKonfirmasi(false)} onKonfirmasi={() => void validasi()} /><Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
}

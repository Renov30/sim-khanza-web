"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { Toast, type ToastTipe } from "@/components/common/Toast";

interface HeaderNoResep {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: "ralan" | "ranap";
  jenis_bayar: string;
  tgl_resep: string;
  jam_resep: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
}

interface DetailNoResep {
  jenis_item: "Obat" | "Racikan" | "Bahan Racikan";
  no_racik: string;
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  harga: number | string;
  embalase: number | string;
  tuslah: number | string;
  total: number | string;
  aturan_pakai: string;
  keterangan: string;
}

interface DataNoResep {
  header: HeaderNoResep;
  detail: DetailNoResep[];
}

function rupiah(nilai: number | string) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(Number(nilai) || 0);
}

function tanggalIndonesia(tanggal: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return tanggal || "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  return `${hari}-${bulan}-${tahun}`;
}

export default function HalamanNoResep() {
  const searchParams = useSearchParams();
  const noResep = searchParams.get("no_resep")?.trim() || "";
  const [data, setData] = useState<DataNoResep | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    await Promise.resolve();
    if (!noResep) {
      setData(null);
      setMemuat(false);
      setToast({ pesan: "Nomor resep belum dipilih.", tipe: "info" });
      return;
    }
    setMemuat(true);
    try {
      const response = await fetch(`/api/farmasi/no-resep?no_resep=${encodeURIComponent(noResep)}`, { cache: "no-store", signal });
      const json: { success?: boolean; data?: DataNoResep; error?: string } = await response.json();
      if (!response.ok || !json.success || !json.data) throw new Error(json.error || "Gagal memuat data nomor resep.");
      setData(json.data);
    } catch (error) {
      if (signal?.aborted) return;
      setData(null);
      setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat data nomor resep.", tipe: "error" });
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [noResep]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => void muatData(controller.signal), 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData]);

  const total = useMemo(() => data?.detail
    .filter((item) => item.jenis_item !== "Racikan")
    .reduce((jumlah, item) => jumlah + Number(item.total || 0), 0) || 0, [data]);

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="grid gap-2 text-xs text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          <label>No. Rawat<input readOnly value={data?.header.no_rawat || "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800" /></label>
          <label>No. RM<input readOnly value={data?.header.no_rkm_medis || "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-slate-800" /></label>
          <label className="lg:col-span-2">Nama Pasien<input readOnly value={data?.header.nm_pasien || "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800" /></label>
          <label>Tgl. Resep<input readOnly value={data ? tanggalIndonesia(data.header.tgl_resep) : "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-slate-800" /></label>
          <label>Jam Resep<input readOnly value={data?.header.jam_resep || "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-slate-800" /></label>
          <label>No. Resep<input readOnly value={data?.header.no_resep || noResep || "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-slate-800" /></label>
          <label>Tarif<input readOnly value={data ? `${data.header.jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap"} · ${data.header.jenis_bayar}` : "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800" /></label>
          <label className="sm:col-span-2 lg:col-span-4">Dokter Peresep<input readOnly value={data ? `${data.header.kd_dokter} · ${data.header.nm_dokter}` : "-"} className="mt-1 h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800" /></label>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
          <table className="w-full min-w-[70rem] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Rincian pemberian obat untuk nomor resep {noResep}</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>{["No.", "Jenis", "Kode Barang", "Nama Obat / Racikan", "Jumlah", "Satuan", "Harga", "Embalase", "Tuslah", "Total", "Aturan Pakai"].map((label) => <th key={label} scope="col" className="border-b border-slate-200 px-2 py-2 text-center">{label}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memuat ? <tr><td colSpan={11} className="h-36 border-0 text-center text-slate-500">Memuat data nomor resep...</td></tr>
                : !data || data.detail.length === 0 ? <tr><td colSpan={11} className="h-44 border-0 text-center text-slate-400">Rincian pemberian obat belum tersedia.</td></tr>
                  : data.detail.map((item, indeks) => <tr key={`${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`} className={item.jenis_item === "Racikan" ? "bg-slate-100/70" : "bg-white hover:bg-slate-50/80"}>
                    <td className="px-2 py-1.5 text-center font-mono">{indeks + 1}</td>
                    <td className="px-2 py-1.5 text-center">{item.jenis_item}</td>
                    <td className="px-2 py-1.5 text-center font-mono">{item.kode_item}</td>
                    <td className={`px-2 py-1.5 text-slate-800 ${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""}`}>{item.nama_item}{item.keterangan && <span className="block text-slate-500">{item.keterangan}</span>}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{item.jumlah}</td>
                    <td className="px-2 py-1.5 text-center">{item.satuan || "-"}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{item.jenis_item === "Racikan" ? "-" : rupiah(item.harga)}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{item.jenis_item === "Racikan" ? "-" : rupiah(item.embalase)}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{item.jenis_item === "Racikan" ? "-" : rupiah(item.tuslah)}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{rupiah(item.total)}</td>
                    <td className="px-2 py-1.5">{item.aturan_pakai || "-"}</td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah tampilan="web" onCetak={() => window.print()} disabledCetak={!data || data.detail.length === 0} jumlahRecord={data?.detail.length || 0} totalLabel="Total Biaya Resep" nilaiTotal={`Rp ${rupiah(total)}`} memuat={memuat} />
      <span className="sr-only" aria-live="polite">{memuat ? "Memuat data nomor resep" : data ? `Nomor resep ${data.header.no_resep} berhasil dimuat` : "Data nomor resep tidak tersedia"}</span>
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

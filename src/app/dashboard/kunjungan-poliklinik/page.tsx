"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { bukaTabCetakJasper } from "@/lib/cetak/jasper-web";

interface KunjunganData {
  periode: { mulai: string; selesai: string };
  ringkasan: { total: number; baru: number; lama: number; sudah: number; belum: number; batal: number };
  poliklinik: {
    kd_poli: string;
    nm_poli: string;
    total: number;
    baru: number;
    lama: number;
    sudah: number;
    belum: number;
    batal: number;
  }[];
  penjab: { kd_pj: string; png_jawab: string; total: number }[];
}

function hariIni(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function HalamanDashboardKunjunganPoliklinik() {
  const tgl = hariIni();
  const [tanggalMulai, setTanggalMulai] = useState(tgl);
  const [tanggalSelesai, setTanggalSelesai] = useState(tgl);
  const [data, setData] = useState<KunjunganData | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const qs = new URLSearchParams({ tanggal_mulai: tanggalMulai, tanggal_selesai: tanggalSelesai });
      const res = await fetch(`/api/dashboard/kunjungan-poliklinik?${qs.toString()}`, { signal, cache: "no-store" });
      const json = (await res.json()) as { success?: boolean; data?: KunjunganData; error?: string };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal memuat kunjungan poliklinik.");
      }
      setData(json.data);
    } catch (error) {
      if (!signal?.aborted) {
        setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat data.", tipe: "error" });
      }
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void muatData(controller.signal); }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData]);

  const r = data?.ringkasan;
  const maxPoli = Math.max(1, ...(data?.poliklinik.map((p) => p.total) || [1]));

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="flex shrink-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">Periode Kunjungan:</span>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            aria-label="Tanggal mulai"
            className="h-7 rounded-md border border-slate-300 bg-white px-2 text-xs font-mono text-slate-800"
          />
          <span className="text-slate-500">s/d</span>
          <input
            type="date"
            value={tanggalSelesai}
            onChange={(e) => setTanggalSelesai(e.target.value)}
            aria-label="Tanggal selesai"
            className="h-7 rounded-md border border-slate-300 bg-white px-2 text-xs font-mono text-slate-800"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={memuat}
            onClick={() => { void muatData(); }}
            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faRotateRight} className="h-3 w-3" aria-hidden="true" />
            Muat Ulang
          </button>
          <button
            type="button"
            disabled={memuat || !data}
            onClick={() => {
              if (!data) return;
              const ok = bukaTabCetakJasper({
                mode: "tabel",
                judul: "Laporan Kunjungan Poliklinik / Unit",
                subJudul: `Periode ${tanggalMulai} s/d ${tanggalSelesai} · Total ${data.ringkasan.total} (Baru: ${data.ringkasan.baru}, Lama: ${data.ringkasan.lama}, Sudah: ${data.ringkasan.sudah}, Belum: ${data.ringkasan.belum}, Batal: ${data.ringkasan.batal})`,
                kolom: ["Kode", "Poliklinik / Unit", "Total", "Baru", "Lama", "Sudah", "Belum", "Batal"],
                baris: data.poliklinik.map((p) => [
                  p.kd_poli,
                  p.nm_poli,
                  String(p.total),
                  String(p.baru),
                  String(p.lama),
                  String(p.sudah),
                  String(p.belum),
                  String(p.batal),
                ]),
              });
              if (!ok) setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
            }}
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-primary-600 px-2.5 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPrint} className="h-3 w-3" aria-hidden="true" />
            Cetak
          </button>
        </div>
      </section>

      <section className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Kunjungan", val: r?.total ?? 0, cls: "text-slate-900" },
          { label: "Pasien Baru", val: r?.baru ?? 0, cls: "text-primary-800" },
          { label: "Pasien Lama", val: r?.lama ?? 0, cls: "text-slate-700" },
          { label: "Sudah Periksa", val: r?.sudah ?? 0, cls: "text-secondary-800" },
          { label: "Belum Periksa", val: r?.belum ?? 0, cls: "text-amber-700" },
          { label: "Batal Periksa", val: r?.batal ?? 0, cls: "text-red-700" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500">{k.label}</div>
            <div className={`mt-0.5 font-mono text-lg font-bold tabular-nums ${k.cls}`}>{memuat ? "..." : k.val}</div>
          </div>
        ))}
      </section>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
            Kunjungan Per Poliklinik / Unit
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[11px] text-slate-700">
              <thead className="sticky top-0 z-10 bg-slate-100">
                <tr>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Poliklinik / Unit</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Total</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Baru</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Lama</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Sudah</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Belum</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Batal</th>
                  <th className="w-32 border-b border-slate-200 px-2.5 py-2 font-semibold">Proporsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={8} className="h-32 text-center text-slate-500">Memuat data kunjungan...</td></tr>
                ) : !data || data.poliklinik.length === 0 ? (
                  <tr><td colSpan={8} className="h-32 text-center text-slate-400">Belum ada kunjungan pada periode ini.</td></tr>
                ) : (
                  data.poliklinik.map((p) => (
                    <tr key={p.kd_poli} className="bg-white hover:bg-slate-50">
                      <td className="px-2.5 py-1.5 font-medium text-slate-800">
                        <span className="mr-1.5 font-mono text-[10px] text-slate-500">{p.kd_poli}</span>
                        {p.nm_poli}
                      </td>
                      <td className="px-2.5 py-1.5 text-right font-mono font-bold tabular-nums">{p.total}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{p.baru}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{p.lama}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono tabular-nums text-secondary-800">{p.sudah}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono tabular-nums text-amber-700">{p.belum}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono tabular-nums text-red-700">{p.batal}</td>
                      <td className="px-2.5 py-1.5">
                        <div className="h-2 w-full rounded bg-slate-100">
                          <div className="h-2 rounded bg-primary-600" style={{ width: `${Math.round((p.total / maxPoli) * 100)}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
            Kunjungan Per Cara Bayar / Penjamin
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full border-collapse text-left text-[11px] text-slate-700">
              <thead className="sticky top-0 z-10 bg-slate-100">
                <tr>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Penjamin / Asuransi</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={2} className="h-32 text-center text-slate-500">Memuat...</td></tr>
                ) : !data || data.penjab.length === 0 ? (
                  <tr><td colSpan={2} className="h-32 text-center text-slate-400">Tidak ada data.</td></tr>
                ) : (
                  data.penjab.map((pj) => (
                    <tr key={pj.kd_pj} className="bg-white hover:bg-slate-50">
                      <td className="px-2.5 py-1.5 text-slate-800">{pj.png_jawab}</td>
                      <td className="px-2.5 py-1.5 text-right font-mono font-semibold tabular-nums">{pj.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Toast message={toast?.pesan ?? null} tipe={toast?.tipe ?? "info"} onClose={() => setToast(null)} />
    </div>
  );
}

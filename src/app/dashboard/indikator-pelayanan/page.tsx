"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { bukaTabCetakJasper } from "@/lib/cetak/jasper-web";

interface IndikatorData {
  periode: { mulai: string; selesai: string; jumlahHari: number };
  indikator: {
    totalTt: number;
    ttIsi: number;
    ttKosong: number;
    pasienKeluar: number;
    totalLama: number;
    meninggalTotal: number;
    meninggal48: number;
    bor: number;
    alos: number;
    toi: number;
    bto: number;
    gdr: number;
    ndr: number;
  };
  bangsal: {
    kd_bangsal: string;
    nm_bangsal: string;
    total_tt: number;
    tt_isi: number;
    tt_kosong: number;
    pasien_keluar: number;
    hari_perawatan: number;
    bor: number;
    alos: number;
  }[];
}

function defaultBulanIni(): { mulai: string; selesai: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return { mulai: `${y}-${m}-01`, selesai: `${y}-${m}-${d}` };
}

export default function HalamanDashboardIndikatorPelayanan() {
  const def = defaultBulanIni();
  const [tanggalMulai, setTanggalMulai] = useState(def.mulai);
  const [tanggalSelesai, setTanggalSelesai] = useState(def.selesai);
  const [data, setData] = useState<IndikatorData | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const qs = new URLSearchParams({ tanggal_mulai: tanggalMulai, tanggal_selesai: tanggalSelesai });
      const res = await fetch(`/api/dashboard/indikator-pelayanan?${qs.toString()}`, { signal, cache: "no-store" });
      const json = (await res.json()) as { success?: boolean; data?: IndikatorData; error?: string };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal memuat indikator pelayanan.");
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

  const ind = data?.indikator;

  const kartuIndikator = [
    { label: "BOR (Bed Occupancy Rate)", nilai: `${ind?.bor ?? 0}%`, ket: "Ideal Kemenkes: 60% – 85%" },
    { label: "ALOS (Avg Length of Stay)", nilai: `${ind?.alos ?? 0} hari`, ket: "Ideal Kemenkes: 6 – 9 hari" },
    { label: "TOI (Turn Over Interval)", nilai: `${ind?.toi ?? 0} hari`, ket: "Ideal Kemenkes: 1 – 3 hari" },
    { label: "BTO (Bed Turn Over)", nilai: `${ind?.bto ?? 0} kali`, ket: "Frekuensi pemakaian TT" },
    { label: "GDR (Gross Death Rate)", nilai: `${ind?.gdr ?? 0}‰`, ket: `Meninggal total: ${ind?.meninggalTotal ?? 0}` },
    { label: "NDR (Net Death Rate)", nilai: `${ind?.ndr ?? 0}‰`, ket: `Meninggal ≥48 jam: ${ind?.meninggal48 ?? 0}` },
  ];

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="flex shrink-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm print:hidden">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">Periode:</span>
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
          {data && (
            <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700">
              {data.periode.jumlahHari} hari · TT Aktif: {ind?.totalTt} (Isi: {ind?.ttIsi} · Kosong: {ind?.ttKosong}) · Keluar: {ind?.pasienKeluar}
            </span>
          )}
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
                judul: "Laporan Indikator Pelayanan RS (BOR / ALOS / TOI / BTO / GDR / NDR)",
                subJudul: `Periode ${tanggalMulai} s/d ${tanggalSelesai} · BOR ${data.indikator.bor}% · ALOS ${data.indikator.alos} hr · TOI ${data.indikator.toi} hr · BTO ${data.indikator.bto}x · GDR ${data.indikator.gdr}‰ · NDR ${data.indikator.ndr}‰`,
                kolom: ["Kode", "Nama Bangsal", "Total TT", "Terisi", "Kosong", "Pasien Keluar", "Hari Perawatan", "BOR (%)", "ALOS (Hari)"],
                baris: data.bangsal.map((b) => [
                  b.kd_bangsal,
                  b.nm_bangsal,
                  String(b.total_tt),
                  String(b.tt_isi),
                  String(b.tt_kosong),
                  String(b.pasien_keluar),
                  String(b.hari_perawatan),
                  `${b.bor}%`,
                  String(b.alos),
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
        {kartuIndikator.map((k) => (
          <div key={k.label} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500">{k.label}</div>
            <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900">{memuat ? "..." : k.nilai}</div>
            <div className="mt-0.5 text-[10px] text-slate-500">{k.ket}</div>
          </div>
        ))}
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
          Rincian Indikator Tempat Tidur Per Bangsal
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left text-[11px] text-slate-700">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Kode</th>
                <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Nama Bangsal</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Total TT</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Terisi</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Kosong</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Pasien Keluar</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">Hari Perawatan</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">BOR (%)</th>
                <th className="border-b border-slate-200 px-2.5 py-2 text-right font-semibold">ALOS (Hari)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memuat ? (
                <tr>
                  <td colSpan={9} className="h-32 text-center text-slate-500">Menghitung indikator pelayanan...</td>
                </tr>
              ) : !data || data.bangsal.length === 0 ? (
                <tr>
                  <td colSpan={9} className="h-32 text-center text-slate-400">Tidak ada data bangsal aktif.</td>
                </tr>
              ) : (
                data.bangsal.map((b) => (
                  <tr key={b.kd_bangsal} className="bg-white hover:bg-slate-50">
                    <td className="px-2.5 py-1.5 font-mono text-slate-600">{b.kd_bangsal}</td>
                    <td className="px-2.5 py-1.5 font-medium text-slate-800">{b.nm_bangsal}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{b.total_tt}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums text-red-700">{b.tt_isi}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums text-secondary-800">{b.tt_kosong}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{b.pasien_keluar}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{b.hari_perawatan}</td>
                    <td className="px-2.5 py-1.5 text-right font-mono font-semibold tabular-nums">{b.bor}%</td>
                    <td className="px-2.5 py-1.5 text-right font-mono tabular-nums">{b.alos}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Toast message={toast?.pesan ?? null} tipe={toast?.tipe ?? "info"} onClose={() => setToast(null)} />
    </div>
  );
}

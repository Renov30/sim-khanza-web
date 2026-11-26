"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Toast, type ToastTipe } from "@/components/common/Toast";

type JenisAntrian = "loket" | "poli" | "apotek" | "laborat";

interface ItemAntrian {
  nomor: string;
  no_rawat: string;
  jam: string;
  nm_pasien: string;
  unit: string;
  dokter: string;
  status: string;
}

interface DataAntrian {
  jenis: JenisAntrian;
  tanggal: string;
  instansi: string;
  runningText: string;
  aktif: ItemAntrian | null;
  daftar: ItemAntrian[];
}

const TAB_ANTRIAN: readonly { id: JenisAntrian; label: string }[] = [
  { id: "loket", label: "Antrian Loket" },
  { id: "poli", label: "Antrian Poliklinik" },
  { id: "apotek", label: "Antrian Apotek" },
  { id: "laborat", label: "Antrian Laboratorium" },
];

export default function HalamanDisplayAntrian() {
  const [jenis, setJenis] = useState<JenisAntrian>("loket");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [data, setData] = useState<DataAntrian | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const j = sp.get("jenis") as JenisAntrian | null;
    if (j && TAB_ANTRIAN.some((t) => t.id === j)) {
      const timer = window.setTimeout(() => setJenis(j), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const res = await fetch(`/api/antrian?jenis=${jenis}`, { signal, cache: "no-store" });
      const json = (await res.json()) as { success?: boolean; data?: DataAntrian; error?: string };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal memuat display antrian.");
      }
      setData(json.data);
    } catch (error) {
      if (!signal?.aborted) {
        setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat antrian.", tipe: "error" });
      }
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [jenis]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void muatData(controller.signal); }, 0);
    const interval = autoRefresh ? window.setInterval(() => { void muatData(); }, 15000) : null;
    return () => {
      window.clearTimeout(timer);
      if (interval) window.clearInterval(interval);
      controller.abort();
    };
  }, [autoRefresh, muatData]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="flex shrink-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {TAB_ANTRIAN.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setJenis(t.id)}
              className={`h-7 rounded-md px-2.5 text-xs font-semibold ${
                jenis === t.id
                  ? "bg-primary-700 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1.5 text-slate-700">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span>Auto Refresh (15 dtk)</span>
          </label>
          <button
            type="button"
            disabled={memuat}
            onClick={() => { void muatData(); }}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faRotateRight} className="h-3 w-3" aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex h-7 items-center gap-1 rounded-md bg-tertiary-900 px-2.5 text-xs font-semibold text-white hover:bg-tertiary-800"
          >
            <FontAwesomeIcon icon={faExpand} className="h-3 w-3" aria-hidden="true" />
            Layar Penuh
          </button>
        </div>
      </section>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section className="flex flex-col justify-between rounded-lg border-2 border-primary-700 bg-tertiary-950 p-5 text-white shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-300">
              {data?.instansi || "Rumah Sakit"} · {data?.tanggal || ""}
            </div>
            <div className="mt-1 text-sm font-bold text-white">
              {TAB_ANTRIAN.find((t) => t.id === jenis)?.label} — Sedang Dipanggil / Terbaru
            </div>
          </div>

          <div className="my-6 rounded-lg border border-primary-600/70 bg-tertiary-900 px-4 py-8 text-center">
            <div className="text-xs uppercase tracking-widest text-primary-200">Nomor Antrian</div>
            <div className="mt-2 font-mono text-5xl font-bold tracking-wider tabular-nums text-white">
              {data?.aktif?.nomor || "---"}
            </div>
            <div className="mt-3 text-base font-semibold text-primary-100">
              {data?.aktif?.nm_pasien || "Belum ada antrian hari ini"}
            </div>
            <div className="mt-1 text-xs text-slate-300">
              {data?.aktif ? `${data.aktif.unit} · ${data.aktif.dokter}` : "Menunggu pendaftaran / permintaan baru"}
            </div>
          </div>

          <div className="rounded-md border border-primary-600/40 bg-tertiary-900/70 px-3 py-2 text-xs text-primary-100">
            {data?.runningText || "Harap menunggu panggilan sesuai nomor antrian Anda. Terima kasih."}
          </div>
        </section>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
            <span>Daftar Antrian Hari Ini ({data?.daftar.length ?? 0} data)</span>
            <span className="font-mono text-[11px] text-slate-500">{data?.tanggal || "-"}</span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[11px] text-slate-700">
              <thead className="sticky top-0 z-10 bg-slate-100">
                <tr>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">No. Antrian</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Jam</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Nama Pasien</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Unit / Poli</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 font-semibold">Dokter</th>
                  <th className="border-b border-slate-200 px-2.5 py-2 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat && !data ? (
                  <tr><td colSpan={6} className="h-32 text-center text-slate-500">Memuat antrian...</td></tr>
                ) : !data || data.daftar.length === 0 ? (
                  <tr><td colSpan={6} className="h-32 text-center text-slate-400">Belum ada antrian tercatat pada tanggal ini.</td></tr>
                ) : (
                  data.daftar.map((item, idx) => (
                    <tr key={`${item.nomor}-${item.no_rawat}-${idx}`} className={idx === 0 ? "bg-primary-50/70 font-semibold" : "bg-white hover:bg-slate-50"}>
                      <td className="px-2.5 py-1.5 font-mono text-slate-900">{item.nomor}</td>
                      <td className="px-2.5 py-1.5 font-mono tabular-nums text-slate-600">{item.jam}</td>
                      <td className="px-2.5 py-1.5 text-slate-800">{item.nm_pasien}</td>
                      <td className="px-2.5 py-1.5 text-slate-700">{item.unit}</td>
                      <td className="px-2.5 py-1.5 text-slate-600">{item.dokter}</td>
                      <td className="px-2.5 py-1.5 text-center">
                        <span className="inline-block rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                          {item.status}
                        </span>
                      </td>
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

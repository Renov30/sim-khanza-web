"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { bacaPayloadCetakJasper, type PayloadCetakJasper } from "@/lib/cetak/jasper-web";

interface InfoInstansi {
  nama_instansi: string;
  alamat_instansi: string;
  kabupaten: string;
  propinsi: string;
  kontak: string;
  email?: string;
}

export default function HalamanCetakLaporanJasper() {
  const [payload, setPayload] = useState<PayloadCetakJasper | null>(null);
  const [instansi, setInstansi] = useState<InfoInstansi | null>(null);
  const [orientasi, setOrientasi] = useState<"portrait" | "landscape">("portrait");
  const [logoGagal, setLogoGagal] = useState(false);
  const [siap, setSiap] = useState(false);
  const [autoprint, setAutoprint] = useState(false);
  const sudahAutoPrintRef = useRef(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get("id") || "";
    const auto = sp.get("autoprint") === "1";
    const data = bacaPayloadCetakJasper(id);

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      if (data) {
        setPayload(data);
        setOrientasi(
          data.orientasi || (data.mode === "tabel" && data.kolom.length > 7 ? "landscape" : "portrait"),
        );
      }
      setAutoprint(auto);
      try {
        const res = await fetch("/api/system/info", { signal: controller.signal });
        const json = (await res.json()) as { success?: boolean; data?: { setting?: InfoInstansi } };
        if (res.ok && json.success && json.data?.setting) {
          setInstansi(json.data.setting);
        }
      } catch {
        // abaikan
      } finally {
        if (!controller.signal.aborted) setSiap(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!siap || !payload || !autoprint || sudahAutoPrintRef.current) return;
    sudahAutoPrintRef.current = true;
    const timer = window.setTimeout(() => {
      window.print();
    }, 350);
    return () => window.clearTimeout(timer);
  }, [autoprint, payload, siap]);

  const waktuCetak = new Date().toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen w-full bg-slate-200 pb-8 print:min-h-0 print:bg-white print:pb-0">
      <style>{`@media print { @page { size: A4 ${orientasi}; margin: 10mm; } }`}</style>

      {/* Toolbar JasperViewer (hilang saat dicetak) */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-tertiary-900 px-4 py-2 text-white shadow-sm print:hidden">
        <div className="min-w-0">
          <div className="truncate text-xs font-bold">
            Jasper Print Preview — {payload?.judul || "Dokumen Cetak"}
          </div>
          {payload?.subJudul && (
            <div className="truncate text-[10px] text-primary-200">{payload.subJudul}</div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setOrientasi((prev) => (prev === "portrait" ? "landscape" : "portrait"))}
            className="inline-flex h-7 items-center gap-1.5 rounded border border-primary-600/70 bg-tertiary-950 px-2.5 text-xs font-semibold text-white hover:bg-tertiary-800"
          >
            <FontAwesomeIcon icon={faRotate} className="h-3 w-3" aria-hidden="true" />
            {orientasi === "portrait" ? "Portrait (A4)" : "Landscape (A4)"}
          </button>
          <button
            type="button"
            disabled={!payload}
            onClick={() => window.print()}
            className="inline-flex h-7 items-center gap-1.5 rounded bg-primary-600 px-3 text-xs font-semibold text-white hover:bg-primary-500 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPrint} className="h-3 w-3" aria-hidden="true" />
            Cetak / Simpan PDF
          </button>
          <button
            type="button"
            onClick={() => window.close()}
            className="inline-flex h-7 items-center gap-1 rounded border border-slate-500 bg-slate-800 px-2.5 text-xs font-semibold text-slate-100 hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" aria-hidden="true" />
            Tutup
          </button>
        </div>
      </div>

      {!siap ? (
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-slate-300 bg-white p-6 text-center text-xs text-slate-600">
          Menyiapkan dokumen cetak...
        </div>
      ) : !payload ? (
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-red-200 bg-white p-6 text-center text-xs text-red-700">
          Data cetakan tidak ditemukan atau sesi pratinjau telah berakhir. Silakan ulangi perintah Cetak dari halaman modul.
        </div>
      ) : (
        <article
          className={`mx-auto mt-4 bg-white p-6 text-slate-900 shadow-lg print:mt-0 print:max-w-none print:p-0 print:shadow-none ${
            orientasi === "landscape" ? "max-w-[297mm]" : "max-w-[210mm]"
          }`}
        >
          {/* Kop Resmi RS gaya JasperReport */}
          <header className="flex items-center gap-4 border-b-2 border-slate-900 pb-3">
            {!logoGagal && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/api/system/logo"
                alt="Logo Instansi"
                onError={() => setLogoGagal(true)}
                className="h-14 w-14 shrink-0 object-contain"
              />
            )}
            <div className="min-w-0 flex-1 text-center">
              <div className="text-base font-bold uppercase tracking-wide text-slate-900">
                {instansi?.nama_instansi || "RUMAH SAKIT"}
              </div>
              <div className="text-[11px] text-slate-700">
                {instansi?.alamat_instansi || ""}
                {instansi?.kabupaten ? `, ${instansi.kabupaten}` : ""}
                {instansi?.propinsi ? `, ${instansi.propinsi}` : ""}
              </div>
              <div className="text-[10px] text-slate-600">
                {instansi?.kontak ? `Telp: ${instansi.kontak}` : ""}
                {instansi?.email ? ` · Email: ${instansi.email}` : ""}
              </div>
            </div>
            {!logoGagal && <div className="h-14 w-14 shrink-0" aria-hidden="true" />}
          </header>

          <div className="mt-3 text-center">
            <h1 className="text-sm font-bold uppercase tracking-wide text-slate-900">{payload.judul}</h1>
            {payload.subJudul && <p className="mt-0.5 text-[11px] text-slate-600">{payload.subJudul}</p>}
          </div>

          {payload.mode === "formulir" ? (
            <div className="mt-4 space-y-4">
              {payload.gambar && payload.gambar.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {payload.gambar.map((img) => (
                    <figure key={img.src} className="rounded border border-slate-300 p-2 text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.judul} className="mx-auto max-h-48 w-auto object-contain" />
                      <figcaption className="mt-1 text-[10px] font-semibold text-slate-600">{img.judul}</figcaption>
                    </figure>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                {payload.entri.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="flex justify-between gap-3 border-b border-slate-200 py-1">
                    <span className="shrink-0 font-semibold text-slate-600">{item.label}</span>
                    <span className="break-words text-right text-slate-900">{item.nilai || "-"}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <table className="w-full border-collapse border border-slate-400 text-left text-[10px] text-slate-900">
                <thead className="bg-slate-100 [display:table-header-group]">
                  <tr>
                    <th className="w-8 border border-slate-400 px-1.5 py-1 text-center font-bold">No</th>
                    {payload.kolom.map((k, idx) => (
                      <th key={`${k}-${idx}`} className="border border-slate-400 px-1.5 py-1 font-bold">
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payload.baris.length === 0 ? (
                    <tr>
                      <td colSpan={payload.kolom.length + 1} className="border border-slate-400 px-2 py-4 text-center text-slate-500">
                        Tidak ada data pada tabel.
                      </td>
                    </tr>
                  ) : (
                    payload.baris.map((row, rIdx) => (
                      <tr key={rIdx} className="[break-inside:avoid]">
                        <td className="border border-slate-400 px-1.5 py-1 text-center font-mono">{rIdx + 1}</td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="border border-slate-400 px-1.5 py-1 align-top">
                            {cell || "-"}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="mt-2 text-[10px] text-slate-600">
                Total Baris: <span className="font-mono font-semibold">{payload.baris.length}</span> · Dicetak: {waktuCetak}
              </div>
            </div>
          )}

          {/* Area Tanda Tangan */}
          <footer className="mt-8 grid grid-cols-2 gap-8 pt-4 text-center text-xs [break-inside:avoid]">
            <div>
              <div>Mengetahui,</div>
              <div className="mt-14 font-semibold">(........................................)</div>
            </div>
            <div>
              <div>{instansi?.kabupaten ? `${instansi.kabupaten}, ` : ""}{new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</div>
              <div>Petugas / Dokter Pemeriksa</div>
              <div className="mt-12 font-semibold">(........................................)</div>
            </div>
          </footer>
        </article>
      )}
    </div>
  );
}

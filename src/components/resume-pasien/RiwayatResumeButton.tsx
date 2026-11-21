"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export const JENIS_RIWAYAT_RESUME = ["keluhan", "pemeriksaan", "radiologi", "laborat", "obat"] as const;
export type JenisRiwayatResume = (typeof JENIS_RIWAYAT_RESUME)[number];

interface ItemRiwayatResume {
  tanggal: string;
  jam: string;
  nilai: string;
}

const JUDUL: Record<JenisRiwayatResume, string> = {
  keluhan: "Riwayat Keluhan",
  pemeriksaan: "Riwayat Pemeriksaan",
  radiologi: "Hasil Radiologi",
  laborat: "Hasil Laboratorium",
  obat: "Riwayat Pemberian Obat",
};

export function RiwayatResumeButton({
  jenis,
  noRawat,
  disabled,
  onPilih,
}: {
  jenis: JenisRiwayatResume;
  noRawat: string;
  disabled: boolean;
  onPilih: (nilai: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const nomorPermintaan = useRef(0);
  const titleId = useId();
  const [terbuka, setTerbuka] = useState(false);
  const [kataKunci, setKataKunci] = useState("");
  const [items, setItems] = useState<ItemRiwayatResume[]>([]);
  const [memuat, setMemuat] = useState(false);
  const [error, setError] = useState("");
  const judul = JUDUL[jenis];

  useEffect(() => {
    if (!terbuka || !noRawat) return;
    const permintaanSaatIni = ++nomorPermintaan.current;
    const timer = setTimeout(async () => {
      setMemuat(true);
      setError("");
      try {
        const parameter = new URLSearchParams({ resource: "riwayat", jenis, no_rawat: noRawat, cari: kataKunci.trim() });
        const response = await fetch(`/api/resume-pasien?${parameter.toString()}`, { cache: "no-store" });
        const json: { success?: boolean; data?: { items?: ItemRiwayatResume[] }; error?: string } = await response.json();
        if (permintaanSaatIni !== nomorPermintaan.current) return;
        if (!response.ok || !json.success) throw new Error(json.error || `Gagal memuat ${judul.toLowerCase()}.`);
        setItems(json.data?.items || []);
      } catch (nilaiError) {
        if (permintaanSaatIni === nomorPermintaan.current) setError(nilaiError instanceof Error ? nilaiError.message : `Gagal memuat ${judul.toLowerCase()}.`);
      } finally {
        if (permintaanSaatIni === nomorPermintaan.current) setMemuat(false);
      }
    }, kataKunci ? 250 : 0);
    return () => {
      clearTimeout(timer);
      nomorPermintaan.current += 1;
    };
  }, [jenis, judul, kataKunci, noRawat, terbuka]);

  useEffect(() => {
    const elemenDialog = dialog.current;
    if (!elemenDialog) return;
    if (terbuka && !elemenDialog.open) {
      elemenDialog.showModal();
    } else if (!terbuka && elemenDialog.open) {
      elemenDialog.close();
    }
  }, [terbuka]);

  const buka = () => {
    setKataKunci("");
    setTerbuka(true);
  };

  const pilih = (nilai: string) => {
    onPilih(nilai);
    setTerbuka(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled || !noRawat}
        onClick={buka}
        aria-label={`Pilih ${judul.toLowerCase()}`}
        aria-haspopup="dialog"
        aria-expanded={terbuka}
        aria-controls={`${titleId}-dialog`}
        title={`Pilih ${judul.toLowerCase()}`}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-400"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
      </button>
      <dialog
        id={`${titleId}-dialog`}
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => setTerbuka(false)}
        className="fixed left-1/2 top-1/2 m-0 max-h-[75vh] w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-0 text-slate-800 shadow-xl backdrop:bg-tertiary-950/40"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 id={titleId} className="text-sm font-semibold">{judul}</h2>
          <button type="button" aria-label="Tutup riwayat" onClick={() => setTerbuka(false)} className="p-1 text-slate-600">
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </button>
        </div>
        <div className="border-b border-slate-100 p-3">
          <input
            aria-label={`Cari ${judul.toLowerCase()}`}
            placeholder={`Cari ${judul.toLowerCase()}...`}
            value={kataKunci}
            onChange={(event) => setKataKunci(event.target.value)}
            className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
          />
        </div>
        <div className="max-h-[45vh] overflow-auto">
          {memuat ? <p className="px-4 py-3 text-xs text-slate-500" role="status">Memuat riwayat...</p>
            : error ? <p className="px-4 py-3 text-xs text-slate-600" role="alert">{error}</p>
              : !items.length ? <p className="px-4 py-3 text-xs text-slate-500">Tidak ada data yang sesuai.</p>
                : <table className="w-full border-collapse text-left text-xs text-slate-700">
                  <caption className="sr-only">Daftar {judul.toLowerCase()}</caption>
                  <thead className="sticky top-0 bg-slate-100"><tr><th scope="col" className="w-24 px-3 py-2">Tanggal</th><th scope="col" className="w-16 px-3 py-2">Jam</th><th scope="col" className="px-3 py-2">Data</th></tr></thead>
                  <tbody>{items.map((item, indeks) => <tr key={`${item.tanggal}-${item.jam}-${indeks}`} className="border-t border-slate-100 hover:bg-slate-100 focus-within:bg-slate-100">
                    <td className="whitespace-nowrap px-3 py-2 font-mono tabular-nums">{item.tanggal}</td>
                    <td className="whitespace-nowrap px-3 py-2 font-mono tabular-nums">{item.jam}</td>
                    <td className="px-3 py-2"><button type="button" onClick={() => pilih(item.nilai)} className="w-full text-left text-slate-700 focus:outline-none">{item.nilai}</button></td>
                  </tr>)}</tbody>
                </table>}
        </div>
      </dialog>
    </>
  );
}

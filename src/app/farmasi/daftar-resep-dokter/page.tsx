"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCircleExclamation,
  faFilePrescription,
} from "@fortawesome/free-solid-svg-icons";

export default function HalamanDaftarResepDokter() {
  const [data, setData] = useState<any[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [pesanError, setPesanError] = useState<string | null>(null);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/farmasi/daftar-resep-dokter", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setPesanError(json.error || "Gagal memuat daftar resep dokter");
      }
    } catch (err: any) {
      setPesanError(err.message || "Terjadi kesalahan jaringan");
    } finally {
      setMemuat(false);
    }
  }, [kataKunci]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-3 sm:p-4 space-y-3">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Daftar Rincian Resep Dokter (E-Resep)"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* 2. Filter & Pencarian Cepat */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Cari No. Resep, Pasien, Nama Obat..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
            />
            {kataKunci && (
              <button
                onClick={() => setKataKunci("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total: <span className="font-bold text-slate-800">{data.length}</span> resep
        </div>
      </div>

      {/* 3. Konten Utama: Tabel Data */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        {pesanError && (
          <div className="m-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
            <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0" />
            <span>{pesanError}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Resep</th>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl & Jam Resep</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[140px]">Dokter</th>
                <th className="py-2 px-2.5 min-w-[180px]">Nama Obat / Alkes</th>
                <th className="py-2 px-2.5 text-center">Jumlah</th>
                <th className="py-2 px-2.5">Aturan Pakai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    Memuat rincian resep dokter...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faFilePrescription} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada rincian resep obat dokter yang sesuai</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_resep}
                    </td>
                    <td className="py-2 px-2.5 text-emerald-800 font-medium">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_peresepan} <span className="text-slate-400">{item.jam_peresepan}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700 font-medium">
                      {item.nama_brng || item.kode_brng}
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-slate-800">
                      {item.jml}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.aturan_pakai || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Footer Modul */}
        <div className="py-2 px-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan daftar permintaan peresepan elektronik dokter (DlgDaftarPermintaanResep).</span>
          <span className="font-semibold text-slate-700">SIMRS Khanza Web</span>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { BarisApi } from "@/lib/types/api";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCircleExclamation,
  faRadiation,
} from "@fortawesome/free-solid-svg-icons";

export default function HalamanPeriksaRadiologi() {
  const [data, setData] = useState<BarisApi[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [status, setStatus] = useState("Semua");
  const [pesanError, setPesanError] = useState<string | null>(null);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/radiologi/periksa", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      if (status !== "Semua") url.searchParams.set("status", status);
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setPesanError(json.error || "Gagal memuat data periksa radiologi");
      }
    } catch (err: unknown) {
      setPesanError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
    } finally {
      setMemuat(false);
    }
  }, [kataKunci, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatData(), 0);
    return () => window.clearTimeout(timer);
  }, [muatData]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-3 sm:p-4 space-y-3">
      {/* 1. Filter & Pencarian Cepat */}
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
              placeholder="Cari No. Rawat, No. RM, Pasien, Jenis Foto Rontgen..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
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

          <div className="w-44">
            <CustomSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Semua">Semua Status Rawat</option>
              <option value="Ralan">Rawat Jalan (Ralan)</option>
              <option value="Ranap">Rawat Inap (Ranap)</option>
            </CustomSelect>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total: <span className="font-bold text-slate-800">{data.length}</span> pemeriksaan
        </div>
      </div>

      {/* 2. Konten Utama: Tabel Data */}
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
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl & Jam Foto</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[170px]">Nama Tindakan Radiologi</th>
                <th className="py-2 px-2.5">Proyeksi</th>
                <th className="py-2 px-2.5">kV / mAS</th>
                <th className="py-2 px-2.5 min-w-[140px]">Dokter Radiologi</th>
                <th className="py-2 px-2.5 text-right">Biaya (Rp)</th>
                <th className="py-2 px-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data pemeriksaan radiologi...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faRadiation} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada pemeriksaan radiologi yang sesuai</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80"
                  >
                    <td className="py-2 px-2.5 font-medium text-slate-800">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_periksa} <span className="text-slate-400">{item.jam}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_perawatan || item.kd_jenis_prw}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.proyeksi || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.kV || "-"}/{item.mAS || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.nm_dokter || item.dokter_perujuk || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-slate-700">
                      {Number(item.biaya || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-50 text-primary-700 border border-primary-200">
                        {item.status || "Ralan"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <PanelBawah tampilan="web" tampilkanRecord={false} />
    </div>
  );
}


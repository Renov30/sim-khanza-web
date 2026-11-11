"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCircleExclamation,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function HalamanInputPenjualan() {
  const [barangList, setBarangList] = useState<any[]>([]);
  const [gudangList, setGudangList] = useState<any[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [gudangDipilih, setGudangDipilih] = useState("AP");
  const [pesanError, setPesanError] = useState<string | null>(null);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/farmasi/input-penjualan", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setBarangList(json.data?.barang || []);
        setGudangList(json.data?.gudang || []);
      } else {
        setPesanError(json.error || "Gagal memuat katalog barang farmasi");
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
        judul="Input Penjualan Obat, Alkes & BHP Langsung"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* 2. Filter & Form Input Singkat */}
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
              placeholder="Cari Kode atau Nama Obat / Alkes..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
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

          <div className="w-48">
            <CustomSelect
              value={gudangDipilih}
              onChange={(e) => setGudangDipilih(e.target.value)}
            >
              {gudangList.map((g) => (
                <option key={g.kd_bangsal} value={g.kd_bangsal}>
                  Gudang: {g.nm_bangsal}
                </option>
              ))}
            </CustomSelect>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Ditemukan: <span className="font-bold text-slate-800">{barangList.length}</span> item obat
        </div>
      </div>

      {/* 3. Konten Utama: Tabel Data Barang */}
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
                <th className="py-2 px-2.5">Kode Barang</th>
                <th className="py-2 px-2.5 min-w-[200px]">Nama Obat & BHP</th>
                <th className="py-2 px-2.5">Satuan</th>
                <th className="py-2 px-2.5 text-right">Harga Jual (Rp)</th>
                <th className="py-2 px-2.5 text-center">Sisa Stok</th>
                <th className="py-2 px-2.5 text-center">Aksi Transaksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-sans">
                    Memuat daftar obat & BHP...
                  </td>
                </tr>
              ) : barangList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faCartPlus} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada obat atau alkes yang sesuai kata kunci</p>
                  </td>
                </tr>
              ) : (
                barangList.map((item, idx) => (
                  <tr
                    key={item.kode_brng || idx}
                    className="hover:bg-slate-50/80"
                  >
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.kode_brng}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nama_brng}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.satuan || item.kode_sat || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-emerald-700">
                      {Number(item.harga_jual || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-slate-700">
                      {item.stok ?? 0}
                    </td>
                    <td className="py-2 px-2.5 text-center font-sans">
                      <button
                        onClick={() => alert(`Pilih item: ${item.nama_brng} (Fitur form entri transaksi siap digunakan)`)}
                        className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-[10px] font-bold border border-emerald-200"
                      >
                        Pilih Obat
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Footer Modul */}
        <div className="py-2 px-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Form entri transaksi penjualan obat bebas & BHP apotek (DlgPenjualan).</span>
          <span className="font-semibold text-slate-700">SIMRS Khanza Web</span>
        </div>
      </div>
    </div>
  );
}


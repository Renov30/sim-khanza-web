"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPenClip,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export interface PanelInputDataProps {
  judul?: string;
  idPenyimpanan?: string; // ID unik untuk menyimpan state di sessionStorage/localStorage
  terbukaAwal?: boolean; // Default false (tertutup secara default)
  children: React.ReactNode;
  onSimpan?: () => void;
  onBaru?: () => void;
  teksSimpan?: string;
  teksBaru?: string;
  sedangMenyimpan?: boolean;
}

/**
 * Komponen Panel Input Data SIMRS Khanza
 * Mengadopsi mekanisme `ChkInput` (.: Input Data) yang bisa di-toggle buka/tutup.
 * 
 * Rule Perilaku:
 * - Secara default dalam keadaan TERTUTUP (false).
 * - Jika pengguna membukanya dan berpindah ke halaman lain lalu kembali, panel TETAP dalam kondisi TERBUKA.
 * - State persistensi disimpan per-halaman/per-id di sessionStorage / localStorage.
 */
export function PanelInputData({
  judul = ".: Input Data",
  idPenyimpanan,
  terbukaAwal = false,
  children,
  onSimpan,
  onBaru,
  teksSimpan = "Simpan",
  teksBaru = "Kosongkan",
  sedangMenyimpan = false,
}: PanelInputDataProps) {
  const pathname = usePathname();
  const kunciStorage = `panel_input_${idPenyimpanan || pathname}`;

  // Menginisialisasi state dengan false (tertutup default), lalu mengecek persistence
  const [terbuka, setTerbuka] = useState(terbukaAwal);

  useEffect(() => {
    try {
      const nilaiTersimpan = localStorage.getItem(kunciStorage);
      if (nilaiTersimpan !== null) {
        setTerbuka(nilaiTersimpan === "true");
      }
    } catch (e) {
      // Abaikan jika storage dinonaktifkan di browser
    }
  }, [kunciStorage]);

  const handleToggle = () => {
    setTerbuka((prev) => {
      const stateBaru = !prev;
      try {
        localStorage.setItem(kunciStorage, String(stateBaru));
      } catch (e) {
        // Abaikan
      }
      return stateBaru;
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 select-none">
      {/* Header Panel Input Toggle (ChkInput di Khanza) */}
      <div
        onClick={handleToggle}
        className="px-3 py-2 bg-slate-100/90 hover:bg-slate-200/70 border-b border-slate-200 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faPenClip}
            className="w-3.5 h-3.5 text-emerald-700"
          />
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            {judul}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {terbuka ? "(Klik untuk sembunyikan)" : "(Klik untuk tampilkan formulir)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={terbuka ? faChevronUp : faChevronDown}
            className="w-3 h-3 text-slate-500"
          />
        </div>
      </div>

      {/* Konten Formulir Input Data */}
      {terbuka && (
        <div className="p-3 bg-white">
          {children}

          {(onSimpan || onBaru) && (
            <div className="mt-3 pt-2.5 border-t border-slate-150 flex items-center justify-end gap-2">
              {onBaru && (
                <button
                  type="button"
                  onClick={onBaru}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 cursor-pointer"
                >
                  {teksBaru}
                </button>
              )}
              {onSimpan && (
                <button
                  type="button"
                  onClick={onSimpan}
                  disabled={sedangMenyimpan}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5" />
                  <span>{sedangMenyimpan ? "Menyimpan..." : teksSimpan}</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

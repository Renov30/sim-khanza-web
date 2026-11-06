"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export interface KonfirmasiDialogProps {
  terbuka: boolean;
  judul?: string;
  pesan: string;
  subPesan?: string;
  teksBatal?: string;
  teksKonfirmasi?: string;
  onBatal: () => void;
  onKonfirmasi: () => void;
  bahaya?: boolean;
  sedangMemproses?: boolean;
}

/**
 * Komponen Modal Dialog Konfirmasi Custom SIMRS Khanza Web
 * Menggantikan dialog bawaan browser (`window.confirm`) agar tampilan
 * konsisten, modern, dan elegan di seluruh modul.
 */
export function KonfirmasiDialog({
  terbuka,
  judul = "Konfirmasi Tindakan",
  pesan,
  subPesan,
  teksBatal = "Batal",
  teksKonfirmasi = "Hapus",
  onBatal,
  onKonfirmasi,
  bahaya = true,
  sedangMemproses = false,
}: KonfirmasiDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && terbuka && !sedangMemproses) {
        onBatal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terbuka, sedangMemproses, onBatal]);

  if (!mounted || !terbuka) return null;

  const dialogContent = (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header Dialog */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              bahaya ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
            }`}>
              <FontAwesomeIcon icon={faTriangleExclamation} className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 tracking-tight">
              {judul}
            </h3>
          </div>
          <button
            type="button"
            onClick={onBatal}
            disabled={sedangMemproses}
            className="text-slate-400 hover:text-slate-600 rounded p-1 cursor-pointer disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Isi Dialog */}
        <div className="p-4 text-xs">
          <p className="text-slate-800 font-medium leading-relaxed">
            {pesan}
          </p>
          {subPesan && (
            <p className="mt-1 text-[11px] text-slate-500 leading-normal">
              {subPesan}
            </p>
          )}
        </div>

        {/* Tombol Aksi Batal / Konfirmasi */}
        <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-150 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onBatal}
            disabled={sedangMemproses}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {teksBatal}
          </button>
          <button
            type="button"
            onClick={onKonfirmasi}
            disabled={sedangMemproses}
            className={`px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
              bahaya
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}
          >
            {bahaya && <FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5" />}
            <span>{sedangMemproses ? "Memproses..." : teksKonfirmasi}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}


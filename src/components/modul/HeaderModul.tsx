"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faRotate } from "@fortawesome/free-solid-svg-icons";

interface HeaderModulProps {
  judul: string;
  deskripsi?: string;
  ikon?: IconDefinition;
  onMuatUlang?: () => void;
  memuat?: boolean;
  ringkas?: boolean;
}

export function HeaderModul({
  judul,
  onMuatUlang,
  memuat = false,
  ringkas = false,
}: HeaderModulProps) {
  const router = useRouter();

  const handleKembali = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleKembali}
          className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-2xs"
          aria-label="Kembali ke halaman sebelumnya"
          title="Kembali ke halaman sebelumnya"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
        </button>
        <h1 className={`${ringkas ? "text-xs sm:text-sm" : "text-sm sm:text-base"} font-bold leading-tight text-slate-800`}>
          {judul}
        </h1>
      </div>

      {onMuatUlang && (
        <div className="flex items-center gap-2">
          <button
            onClick={onMuatUlang}
            disabled={memuat}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs disabled:opacity-50"
          >
            <FontAwesomeIcon
              icon={faRotate}
              className={`w-3.5 h-3.5 text-emerald-700 ${memuat ? "animate-spin" : ""}`}
            />
            <span>Segarkan</span>
          </button>
        </div>
      )}
    </div>
  );
}



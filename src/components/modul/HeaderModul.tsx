"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faRotate } from "@fortawesome/free-solid-svg-icons";

interface HeaderModulProps {
  judul: string;
  deskripsi: string;
  ikon: IconDefinition;
  onMuatUlang?: () => void;
  memuat?: boolean;
}

export function HeaderModul({
  judul,
  deskripsi,
  ikon,
  onMuatUlang,
  memuat = false,
}: HeaderModulProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors shadow-2xs"
          title="Kembali ke Beranda"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
        </Link>
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
          <FontAwesomeIcon icon={ikon} className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800 leading-tight">
            {judul}
          </h1>
          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
            {deskripsi}
          </p>
        </div>
      </div>

      {onMuatUlang && (
        <div className="flex items-center gap-2">
          <button
            onClick={onMuatUlang}
            disabled={memuat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs disabled:opacity-50"
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


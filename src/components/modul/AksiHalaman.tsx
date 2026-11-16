"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

interface AksiHalamanProps {
  onMuatUlang?: () => void;
  memuat?: boolean;
}

export function AksiHalaman({ onMuatUlang, memuat = false }: AksiHalamanProps) {
  if (!onMuatUlang) return null;

  return (
    <div className="flex shrink-0 items-center justify-end">
      <button
        type="button"
        onClick={onMuatUlang}
        disabled={memuat}
        className="flex h-7 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50"
      >
        <FontAwesomeIcon
          icon={faRotate}
          className={`h-3.5 w-3.5 text-primary-700 ${memuat ? "animate-spin" : ""}`}
        />
        <span>Segarkan</span>
      </button>
    </div>
  );
}

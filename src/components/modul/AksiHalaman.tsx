"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRotate } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface AksiHalamanProps {
  onMuatUlang?: () => void;
  memuat?: boolean;
}

export function AksiHalaman({ onMuatUlang, memuat = false }: AksiHalamanProps) {
  const router = useRouter();

  const handleKembali = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex shrink-0 items-center justify-between gap-2">
      <button
        type="button"
        onClick={handleKembali}
        className="flex h-7 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 shadow-2xs hover:bg-slate-100"
        aria-label="Kembali ke halaman sebelumnya"
        title="Kembali ke halaman sebelumnya"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
        <span>Kembali</span>
      </button>

      {onMuatUlang && (
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
      )}
    </div>
  );
}

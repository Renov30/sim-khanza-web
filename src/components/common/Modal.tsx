"use client";

import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useKlien } from "@/lib/klien";

interface ModalProps {
  terbuka: boolean;
  judul: string;
  padaTutup: () => void;
  children: ReactNode;
  lebar?: string;
}

export function Modal({ terbuka, judul, padaTutup, children, lebar = "max-w-3xl" }: ModalProps) {
  const diKlien = useKlien();
  const judulId = useId();

  useEffect(() => {
    if (!terbuka) return;
    const dengar = (event: KeyboardEvent) => {
      if (event.key === "Escape") padaTutup();
    };
    window.addEventListener("keydown", dengar);
    return () => window.removeEventListener("keydown", dengar);
  }, [terbuka, padaTutup]);

  if (!diKlien || !terbuka) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center bg-tertiary-950/50 p-3"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) padaTutup();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={judulId}
        className={`flex max-h-[calc(100vh-1.5rem)] w-full ${lebar} flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
          <h2 id={judulId} className="text-sm font-semibold text-slate-800">{judul}</h2>
          <button
            type="button"
            onClick={padaTutup}
            aria-label="Tutup dialog"
            title="Tutup dialog"
            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

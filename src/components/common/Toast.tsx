"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useKlien } from "@/lib/klien";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleCheck,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export type ToastTipe = "info" | "sukses" | "error";

interface ToastProps {
  message: string | null;
  tipe?: ToastTipe;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, tipe = "info", onClose, duration = 4000 }: ToastProps) {
  const mounted = useKlien();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!mounted || !message) return null;

  const ikon =
    tipe === "sukses"
      ? faCircleCheck
      : tipe === "error"
      ? faCircleExclamation
      : faCircleInfo;

  const warnaIkon =
    tipe === "sukses"
      ? "text-secondary-400"
      : tipe === "error"
      ? "text-rose-400"
      : "text-secondary-400";

  const toastContent = (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-[99999] pointer-events-auto"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-tertiary-950 text-white rounded-xl shadow-2xl border border-tertiary-700 text-xs sm:text-sm font-medium max-w-md">
        <FontAwesomeIcon icon={ikon} className={`w-4 h-4 sm:w-5 sm:h-5 ${warnaIkon} shrink-0`} />
        <span className="flex-1 text-white">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white rounded p-1 cursor-pointer"
          title="Tutup notifikasi"
        >
          <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
}

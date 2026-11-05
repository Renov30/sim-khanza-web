"use client";

import React from "react";
import { Hospital, X, Shield, Code, HeartHandshake } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Hospital className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Tentang SIMRS Khanza Web
              </h3>
              <p className="text-xs text-slate-500">
                Hospital Management Information System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
            <p className="font-semibold text-emerald-800">
              SIMRS Khanza Versi Web (Clean Architecture)
            </p>
            <p className="mt-1 leading-relaxed text-[11px] text-emerald-700">
              Aplikasi Manajemen Rumah Sakit & Klinik berbasis Web menggunakan Next.js, TypeScript, dan Tailwind CSS dengan arsitektur terstruktur, modular, dan seragam.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Konektivitas Database API</p>
                <p className="text-slate-500 text-[11px]">
                  Terhubung aman ke database SIMRS Khanza asli (MariaDB/MySQL sik_mitra) dengan enkripsi AES bawaan Khanza.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Code className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Standar Keseragaman Kode</p>
                <p className="text-slate-500 text-[11px]">
                  Seluruh halaman mematuhi pedoman baku pada <code className="text-emerald-800 bg-slate-100 px-1 py-0.5 rounded">rules/agent.md</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Lisensi & Dedikasi</p>
                <p className="text-slate-500 text-[11px]">
                  Berdasarkan filosofi keterbukaan SIMRS Khanza (Aladdin Free Public License).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


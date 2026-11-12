"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFloppyDisk,
  faFileCirclePlus,
  faTrashCan,
  faPenToSquare,
  faPrint,
  faReceipt,
  faRotateRight,
  faRightFromBracket,
  faMagnifyingGlass,
  faXmark,
  faCalendarDays,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export interface TombolAksiCustom {
  label: string;
  ikon?: IconProp;
  onClick: () => void;
  disabled?: boolean;
  varian?: "primer" | "sekunder" | "bahaya" | "peringatan";
  tooltip?: string;
}

export interface PanelBawahProps {
  tampilan?: "standar" | "khanza" | "web";
  aksiUtama?: "simpan" | "ganti";
  filterUtama?: React.ReactNode;
  // Action Handlers
  onSimpan?: () => void;
  onBaru?: () => void;
  onHapus?: () => void;
  onGanti?: () => void;
  onCetak?: () => void;
  onNota?: () => void;
  onSemua?: () => void;
  onKeluar?: () => void;
  tombolTambahan?: TombolAksiCustom[];

  // Disabled states
  disabledSimpan?: boolean;
  disabledHapus?: boolean;
  disabledGanti?: boolean;
  disabledCetak?: boolean;
  disabledNota?: boolean;

  // Filter States
  tanggalMulai?: string;
  tanggalSelesai?: string;
  onGantiTanggalMulai?: (tgl: string) => void;
  onGantiTanggalSelesai?: (tgl: string) => void;
  kataKunci?: string;
  onGantiKataKunci?: (kata: string) => void;
  onCari?: () => void;
  placeholderCari?: string;

  // Additional Filter Slots (e.g. Dokter, Poli, Status, etc.)
  filterTambahan?: React.ReactNode;
  pagination?: React.ReactNode;

  // Record Count
  jumlahRecord?: number;
  tampilkanRecord?: boolean;
  totalLabel?: string;
  nilaiTotal?: string | number;

  // Loading state
  memuat?: boolean;
}

/**
 * Komponen Panel Bawah SIMRS Khanza
 * Mengadopsi struktur panelGlass / panelisi di SIMRS Khanza Java:
 * - Baris 1: Filter Periode (Tanggal 1 s.d Tanggal 2) + Keyword Pencarian + Filter Tambahan
 * - Baris 2: Tombol Aksi (Simpan, Baru, Hapus, Ganti, Cetak, Nota, Semua, Record Count, Keluar)
 */
export function PanelBawah({
  tampilan = "standar",
  filterUtama,
  onSimpan,
  onBaru,
  onHapus,
  onGanti,
  onCetak,
  onNota,
  onSemua,
  onKeluar,
  tombolTambahan,
  disabledSimpan = false,
  disabledHapus = false,
  disabledGanti = false,
  disabledCetak = false,
  disabledNota = false,
  tanggalMulai,
  tanggalSelesai,
  onGantiTanggalMulai,
  onGantiTanggalSelesai,
  kataKunci = "",
  onGantiKataKunci,
  onCari,
  placeholderCari = "Key Word pencarian...",
  filterTambahan,
  pagination,
  jumlahRecord = 0,
  tampilkanRecord = true,
  totalLabel,
  nilaiTotal,
  memuat = false,
}: PanelBawahProps) {

  const handleKeyDownKataKunci = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onCari) {
      onCari();
    }
  };

  if (tampilan === "khanza" || tampilan === "web") {
    const hasPeriod = Boolean(onGantiTanggalMulai || onGantiTanggalSelesai);
    const hasFilters = Boolean(hasPeriod || onGantiKataKunci || filterTambahan);
    const actions = [
      { label: 'Simpan', icon: faFloppyDisk, click: onSimpan, disabled: disabledSimpan, color: 'text-blue-600' },
      { label: 'Baru', icon: faFileCirclePlus, click: onBaru, color: 'text-sky-600' },
      { label: 'Ganti', icon: faPenToSquare, click: onGanti, disabled: disabledGanti, color: 'text-amber-600' },
      { label: 'Hapus', icon: faTrashCan, click: onHapus, disabled: disabledHapus, color: 'text-red-600' },
      { label: 'Cetak', icon: faPrint, click: onCetak, disabled: disabledCetak, color: 'text-slate-600' },
      { label: 'Nota', icon: faReceipt, click: onNota, disabled: disabledNota, color: 'text-slate-600' },
      { label: 'Semua', icon: faMagnifyingGlass, click: onSemua, color: 'text-sky-600' },
    ];
    return (
      <footer className="shrink-0 rounded-b-xl border-t border-slate-200 bg-white font-sans text-xs font-normal text-slate-700">
        {filterUtama && <div className={tampilan === 'web' ? 'px-2.5 py-2 border-b border-slate-200' : 'px-3 py-3 border-b border-slate-200'}>{filterUtama}</div>}
        {hasFilters && <div className={`flex flex-wrap items-center border-b border-slate-200 ${tampilan === 'web' ? 'gap-2 px-2.5 py-2' : 'gap-3 px-3 py-3'}`}>
          {(onGantiTanggalMulai || onGantiTanggalSelesai) && <div className="flex flex-wrap items-center gap-1.5">
            <span className="shrink-0 whitespace-nowrap text-left font-normal text-slate-700">Periode :</span>
            <div className="flex flex-wrap items-center gap-1.5">
            <input aria-label="Tanggal mulai" type="date" value={tanggalMulai || ''} onChange={(event)=>onGantiTanggalMulai?.(event.target.value)} className="h-7 w-[7.5rem] rounded-md border border-slate-300 bg-white px-2 text-slate-800 focus:outline-none focus:border-emerald-600" />
            <span className="text-slate-600">s.d.</span>
            <input aria-label="Tanggal selesai" type="date" value={tanggalSelesai || ''} onChange={(event)=>onGantiTanggalSelesai?.(event.target.value)} className="h-7 w-[7.5rem] rounded-md border border-slate-300 bg-white px-2 text-slate-800 focus:outline-none focus:border-emerald-600" />
            </div>
          </div>}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {onGantiKataKunci && <div className="flex w-full max-w-[28rem] min-w-48 items-center gap-1.5">
              <span className="shrink-0 whitespace-nowrap text-left font-normal text-slate-700">Kata kunci :</span>
              <div className="flex min-w-0 flex-1 items-center gap-1">
              <input aria-label="Kata kunci pencarian" value={kataKunci} onChange={(event)=>onGantiKataKunci(event.target.value)} onKeyDown={handleKeyDownKataKunci} placeholder={placeholderCari} className="h-7 w-full min-w-0 rounded-full border border-slate-300 px-2.5 text-slate-800 focus:outline-none focus:border-emerald-600" />
              {onCari && <button type="button" onClick={onCari} disabled={memuat} aria-label="Cari data" title="Cari data (Enter)" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-emerald-600 hover:bg-slate-100 disabled:opacity-40"><FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" /></button>}
              </div>
            </div>}
            {filterTambahan}
          </div>
        </div>}
        <div className={`flex flex-wrap items-center ${tampilan === 'web' ? 'gap-2 px-2.5 py-2' : 'gap-3 px-3 py-3'}`}>
          <div className={tampilan === 'web' ? 'flex flex-wrap items-center gap-1.5' : 'flex flex-wrap items-center gap-2'} role="group" aria-label="Aksi registrasi">
            {actions.filter((action)=>action.click).map((action)=><button key={action.label} type="button" onClick={action.click} disabled={memuat || action.disabled} className={`${tampilan === 'web' ? 'h-7 min-w-20 gap-1.5 px-3' : 'h-9 min-w-24 gap-2 px-4'} inline-flex items-center justify-center rounded-full bg-slate-50 font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed`}><FontAwesomeIcon icon={action.icon} className={`${tampilan === 'web' ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${action.color}`} />{action.label}</button>)}
            {tombolTambahan?.map((action)=><button key={action.label} type="button" onClick={action.onClick} disabled={memuat || action.disabled} className={`${tampilan === 'web' ? 'h-7 px-3' : 'h-9 px-4'} rounded-full bg-slate-50 text-slate-800 disabled:opacity-40`}>{action.label}</button>)}
            {onKeluar && <button type="button" onClick={onKeluar} disabled={memuat} className={`${tampilan === 'web' ? 'h-7 min-w-20 gap-1.5 px-3' : 'h-9 gap-2 px-4'} inline-flex items-center justify-center rounded-full bg-slate-50 font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-40`}><FontAwesomeIcon icon={faXmark} className={`${tampilan === 'web' ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-red-600`} />Keluar</button>}
          </div>
          {tampilkanRecord && <span className="ml-auto text-slate-600">Record : {jumlahRecord}</span>}
          {pagination && <nav aria-label="Pagination data" className="ml-auto flex flex-wrap items-center justify-end gap-2 text-slate-600">{pagination}</nav>}
        </div>
      </footer>
    );
  }

  return (
    <footer className="shrink-0 bg-white border-t border-slate-200/90 shadow-xs rounded-b-xl select-none flex flex-col text-xs z-10">
      {/* 1. Baris Filter & Pencarian (panelGlass7 / panelGlass9) */}
      <div className="px-3 py-2 border-b border-slate-150 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          {/* Filter Periode Tanggal jika disediakan */}
          {(onGantiTanggalMulai || onGantiTanggalSelesai) && (
            <div className="flex items-center gap-1.5 text-slate-600 bg-white px-2 py-1 rounded-lg border border-slate-250 shadow-2xs">
              <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">Periode:</span>
              <input
                type="date"
                value={tanggalMulai || ""}
                onChange={(e) => onGantiTanggalMulai?.(e.target.value)}
                className="text-xs bg-transparent border-0 text-slate-800 font-medium focus:ring-0 p-0 cursor-pointer"
              />
              <span className="text-slate-400 text-[10px]">s.d.</span>
              <input
                type="date"
                value={tanggalSelesai || ""}
                onChange={(e) => onGantiTanggalSelesai?.(e.target.value)}
                className="text-xs bg-transparent border-0 text-slate-800 font-medium focus:ring-0 p-0 cursor-pointer"
              />
            </div>
          )}

          {/* Key Word Pencarian */}
          {onGantiKataKunci && (
            <div className="relative flex-1 min-w-[180px] max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => onGantiKataKunci(e.target.value)}
                onKeyDown={handleKeyDownKataKunci}
                placeholder={placeholderCari}
                className="w-full pl-8 pr-7 py-1 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
              {kataKunci && (
                <button
                  type="button"
                  onClick={() => onGantiKataKunci("")}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Tombol Cari (Alt+7 / BtnCari di Khanza) */}
          {onCari && (
            <button
              type="button"
              onClick={onCari}
              disabled={memuat}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-xs shadow-2xs flex items-center gap-1 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
              title="Cari Data (Enter)"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3" />
              <span>Cari</span>
            </button>
          )}

          {/* Slot Filter Tambahan jika ada */}
          {filterTambahan}
        </div>

        {/* Info Record & Total Nilai */}
        <div className="flex items-center gap-3 shrink-0">
          {totalLabel && (
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <span className="text-[11px] font-bold text-emerald-800">{totalLabel}:</span>
              <span className="text-xs font-mono font-bold text-emerald-950">
                {nilaiTotal ?? 0}
              </span>
            </div>
          )}

          {tampilkanRecord && <div className="flex items-center gap-1.5 text-slate-600 bg-white px-2 py-1 rounded-lg border border-slate-200">
            <span className="text-[11px] font-medium text-slate-500">Record:</span>
            <span className="font-mono font-bold text-emerald-700">{jumlahRecord}</span>
          </div>}
        </div>
      </div>

      {/* 2. Baris Tombol Aksi Utama (panelGlass6 / panelisi di SIMRS Khanza Java) */}
      <div className="px-3 py-2 flex flex-wrap items-center justify-between gap-2 bg-white">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Simpan */}
          {onSimpan && (
            <button
              type="button"
              onClick={onSimpan}
              disabled={disabledSimpan || memuat}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              title="Simpan Data Registrasi (Alt+S)"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          )}

          {/* Baru / Kosongkan Formulir */}
          {onBaru && (
            <button
              type="button"
              onClick={onBaru}
              disabled={memuat}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Baru / Kosongkan Formulir (Alt+B)"
            >
              <FontAwesomeIcon icon={faFileCirclePlus} className="w-3.5 h-3.5 text-blue-600" />
              <span>Baru</span>
            </button>
          )}

          {/* Hapus */}
          {onHapus && (
            <button
              type="button"
              onClick={onHapus}
              disabled={disabledHapus || memuat}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold text-xs border border-red-200 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Hapus Data Terpilih (Alt+H)"
            >
              <FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5 text-red-600" />
              <span>Hapus</span>
            </button>
          )}

          {/* Ganti / Edit */}
          {onGanti && (
            <button
              type="button"
              onClick={onGanti}
              disabled={disabledGanti || memuat}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg font-semibold text-xs border border-amber-200 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Ganti / Edit Data (Alt+G)"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="w-3.5 h-3.5 text-amber-600" />
              <span>Ganti</span>
            </button>
          )}

          {/* Cetak */}
          {onCetak && (
            <button
              type="button"
              onClick={onCetak}
              disabled={disabledCetak || memuat}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Cetak Data (Alt+T)"
            >
              <FontAwesomeIcon icon={faPrint} className="w-3.5 h-3.5 text-slate-600" />
              <span>Cetak</span>
            </button>
          )}

          {/* Nota */}
          {onNota && (
            <button
              type="button"
              onClick={onNota}
              disabled={disabledNota || memuat}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg font-semibold text-xs border border-indigo-200 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Cetak Nota (Alt+N)"
            >
              <FontAwesomeIcon icon={faReceipt} className="w-3.5 h-3.5 text-indigo-600" />
              <span>Nota</span>
            </button>
          )}

          {/* Semua */}
          {onSemua && (
            <button
              type="button"
              onClick={onSemua}
              disabled={memuat}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Tampilkan Semua Data (Alt+M)"
            >
              <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5 text-teal-600" />
              <span>Semua</span>
            </button>
          )}

          {/* Tombol Tambahan Spesifik Modul */}
          {tombolTambahan &&
            tombolTambahan.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={btn.onClick}
                disabled={btn.disabled || memuat}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs border border-slate-300 shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={btn.tooltip}
              >
                {btn.ikon && <FontAwesomeIcon icon={btn.ikon} className="w-3.5 h-3.5" />}
                <span>{btn.label}</span>
              </button>
            ))}
        </div>

        {pagination && (
          <div className="flex flex-wrap items-center justify-end gap-2 text-slate-600 ml-auto" role="navigation" aria-label="Pagination data">
            {pagination}
          </div>
        )}

        {/* Tombol Keluar (Sisi Kanan) */}
        {onKeluar && (
          <button
            type="button"
            onClick={onKeluar}
            className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg font-semibold text-xs border border-slate-200 hover:border-red-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            title="Keluar ke Menu Utama (Alt+K)"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5 text-slate-500 hover:text-red-600" />
            <span>Keluar</span>
          </button>
        )}
      </div>
    </footer>
  );
}

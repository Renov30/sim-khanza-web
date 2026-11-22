"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faFileArrowDown,
  faFileArrowUp,
  faMagnifyingGlass,
  faPrint,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type JenisAksiLis = "cetak" | "barcode" | "kirim" | "ambil";
type GrupAksiLis = "Umum" | "Kirim Permintaan" | "Ambil Hasil";

export interface AksiLis {
  id: string;
  grup: GrupAksiLis;
  label: string;
  jenis: JenisAksiLis;
  vendor?: string;
}

const GRUP_AKSI: GrupAksiLis[] = ["Umum", "Kirim Permintaan", "Ambil Hasil"];

export const MENU_AKSI_UMUM: AksiLis[] = [
  { id: "cetak-permintaan", grup: "Umum", label: "Cetak Permintaan Lab", jenis: "cetak" },
  { id: "barcode-permintaan", grup: "Umum", label: "Barcode No. Permintaan", jenis: "barcode" },
  { id: "barcode-permintaan-2", grup: "Umum", label: "Barcode No. Permintaan 2", jenis: "barcode" },
];

export const MENU_AKSI_PK: AksiLis[] = [
  ...MENU_AKSI_UMUM,
  { id: "kirim-lica", grup: "Kirim Permintaan", label: "Kirim Permintaan ke LICA", jenis: "kirim", vendor: "LICA" },
  { id: "kirim-sysmex", grup: "Kirim Permintaan", label: "Kirim Permintaan ke Sysmex", jenis: "kirim", vendor: "Sysmex" },
  { id: "kirim-elims", grup: "Kirim Permintaan", label: "Kirim Permintaan ke ELIMS", jenis: "kirim", vendor: "ELIMS" },
  { id: "kirim-teras", grup: "Kirim Permintaan", label: "Kirim Permintaan ke TERAS", jenis: "kirim", vendor: "TERAS" },
  { id: "kirim-medqlab", grup: "Kirim Permintaan", label: "Kirim Permintaan ke MEDQLAB", jenis: "kirim", vendor: "MEDQLAB" },
  { id: "kirim-smartlab", grup: "Kirim Permintaan", label: "Kirim Permintaan ke SMARTLAB", jenis: "kirim", vendor: "SMARTLAB" },
  { id: "kirim-softmedix", grup: "Kirim Permintaan", label: "Kirim Permintaan ke SOFTMEDIX", jenis: "kirim", vendor: "SOFTMEDIX" },
  { id: "kirim-vanslab", grup: "Kirim Permintaan", label: "Kirim Permintaan ke VANSLAB", jenis: "kirim", vendor: "VANSLAB" },
  { id: "kirim-slims", grup: "Kirim Permintaan", label: "Kirim Permintaan ke SLIMS", jenis: "kirim", vendor: "SLIMS" },
  { id: "ambil-lica", grup: "Ambil Hasil", label: "Ambil Hasil dari LICA", jenis: "ambil", vendor: "LICA" },
  { id: "ambil-sysmex", grup: "Ambil Hasil", label: "Ambil Hasil dari Sysmex", jenis: "ambil", vendor: "Sysmex" },
  { id: "ambil-elims", grup: "Ambil Hasil", label: "Ambil Hasil dari ELIMS", jenis: "ambil", vendor: "ELIMS" },
  { id: "ambil-teras", grup: "Ambil Hasil", label: "Ambil Hasil dari TERAS", jenis: "ambil", vendor: "TERAS" },
  { id: "ambil-medqlab", grup: "Ambil Hasil", label: "Ambil Hasil dari MEDQLAB", jenis: "ambil", vendor: "MEDQLAB" },
  { id: "ambil-smartlab", grup: "Ambil Hasil", label: "Ambil Hasil dari SMARTLAB", jenis: "ambil", vendor: "SMARTLAB" },
  { id: "ambil-softmedix", grup: "Ambil Hasil", label: "Ambil Hasil dari SOFTMEDIX", jenis: "ambil", vendor: "SOFTMEDIX" },
  { id: "ambil-vanslab", grup: "Ambil Hasil", label: "Ambil Hasil dari VANSLAB", jenis: "ambil", vendor: "VANSLAB" },
  { id: "ambil-slims", grup: "Ambil Hasil", label: "Ambil Hasil dari SLIMS", jenis: "ambil", vendor: "SLIMS" },
];

const IKON_AKSI = {
  cetak: faPrint,
  barcode: faBarcode,
  kirim: faFileArrowUp,
  ambil: faFileArrowDown,
};

interface SidebarAksiLisProps {
  onAksi: (aksi: AksiLis) => void;
  judul?: string;
  menu?: readonly AksiLis[];
}

export function SidebarAksiLis({ onAksi, judul = "Aksi LIS", menu = MENU_AKSI_PK }: SidebarAksiLisProps) {
  const [pencarian, setPencarian] = useState("");
  const menuTersaring = useMemo(() => {
    const kataKunci = pencarian.trim().toLocaleLowerCase("id-ID");
    if (!kataKunci) return menu;
    return menu.filter((item) => item.label.toLocaleLowerCase("id-ID").includes(kataKunci));
  }, [menu, pencarian]);

  return (
    <aside aria-label="Aksi kirim dan ambil hasil laboratorium" className="hidden min-h-0 w-52 shrink-0 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm md:flex md:flex-col">
      <div className="flex h-8 shrink-0 items-center border-b border-slate-200 bg-slate-100/90 px-2">
        <span className="truncate text-[11px] font-semibold text-slate-700">{judul}</span>
      </div>
      <div className="relative shrink-0 border-b border-slate-200 p-1">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={pencarian}
          onChange={(event) => setPencarian(event.target.value)}
          placeholder="Cari aksi LIS..."
          aria-label="Cari aksi LIS"
          className="h-7 w-full rounded border border-slate-200 bg-slate-50 pl-7 pr-7 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {pencarian && (
          <button
            type="button"
            onClick={() => setPencarian("")}
            aria-label="Hapus pencarian aksi LIS"
            title="Hapus pencarian"
            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </button>
        )}
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto p-1" aria-label="Daftar aksi kirim dan ambil hasil">
        {menuTersaring.length === 0 && (
          <p className="px-1.5 py-2 text-[11px] text-slate-500">Aksi tidak ditemukan.</p>
        )}
        {GRUP_AKSI.map((grup) => {
          const daftar = menuTersaring.filter((item) => item.grup === grup);
          if (daftar.length === 0) return null;
          return (
            <div key={grup}>
              <p className={`px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 ${grup === GRUP_AKSI[0] ? "pt-0" : "pt-2"}`}>
                {grup}
              </p>
              {daftar.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onAksi(item)}
                  title={item.label}
                  className="flex min-h-7 w-full items-center gap-1.5 border-b border-slate-100 px-1.5 py-1 text-left text-[11px] leading-4 text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                >
                  <FontAwesomeIcon
                    icon={IKON_AKSI[item.jenis]}
                    className={`h-3 w-3 shrink-0 ${item.jenis === "kirim" || item.jenis === "ambil" ? "text-primary-600" : "text-slate-400"}`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

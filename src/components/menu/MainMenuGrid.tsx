"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/constants/menus";
import type { MenuItem } from "@/lib/types/menu";
import { MenuCard } from "./MenuCard";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faXmark,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

interface MainMenuGridProps {
  onModuleClick: (item: MenuItem) => void;
}

type KelompokMenu = "registrasi" | "igd" | "laboratorium" | "radiologi" | "farmasi" | "rawat-inap" | "rawat-jalan" | "sdm" | "keuangan" | "manajemen";

const KELOMPOK_MENU: ReadonlyArray<{ id: KelompokMenu; label: string }> = [
  { id: "registrasi", label: "Registrasi" },
  { id: "igd", label: "IGD" },
  { id: "laboratorium", label: "Laboratorium" },
  { id: "radiologi", label: "Radiologi" },
  { id: "farmasi", label: "Farmasi" },
  { id: "rawat-inap", label: "Rawat Inap" },
  { id: "rawat-jalan", label: "Rawat Jalan" },
  { id: "sdm", label: "SDM" },
  { id: "keuangan", label: "Keuangan" },
  { id: "manajemen", label: "Manajemen" },
];

function termasukKelompok(item: MenuItem, kelompok: KelompokMenu) {
  const href = item.href ?? "";

  switch (kelompok) {
    case "registrasi":
      return item.id === "data-pasien" || item.id === "reg-pasien" || item.id === "booking-registrasi";
    case "igd":
      return item.id === "igd";
    case "laboratorium":
      return href.startsWith("/laboratorium") || item.id === "periksa-lab";
    case "radiologi":
      return href.startsWith("/radiologi") || item.id === "periksa-radiologi";
    case "farmasi":
      return href.startsWith("/farmasi") || item.categoryCode === "D" || item.id === "pemberian-obat";
    case "rawat-inap":
      return href.includes("rawat-inap") || item.id.includes("ranap") || item.title.includes("Rawat Inap");
    case "rawat-jalan":
      return href.includes("rawat-jalan") || item.id.includes("ralan") || item.title.includes("Rawat Jalan");
    case "sdm":
      return item.categoryCode === "C";
    case "keuangan":
      return item.categoryCode === "I" || item.categoryCode === "K";
    case "manajemen":
      return item.categoryCode === "T";
  }
}

function adalahKelompokMenu(nilai: string | null): nilai is KelompokMenu {
  return KELOMPOK_MENU.some((kelompok) => kelompok.id === nilai);
}

function buatUrlDaftarMenu(kategori: string, kelompok: KelompokMenu | "ALL", cari: string) {
  const params = new URLSearchParams({ menu: "1" });
  if (kategori !== "ALL") params.set("kategori", kategori);
  if (kelompok !== "ALL") params.set("kelompok", kelompok);
  if (cari.trim()) params.set("cari", cari.trim());
  return `/?${params.toString()}`;
}

export function MainMenuGrid({ onModuleClick }: MainMenuGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("kategori") ?? "ALL";
  const kelompokDariUrl = searchParams.get("kelompok");
  const selectedGroup = adalahKelompokMenu(kelompokDariUrl)
    ? kelompokDariUrl
    : "ALL";
  const queryFromUrl = searchParams.get("cari") ?? "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);

  useEffect(() => {
    if (searchQuery === queryFromUrl) return;

    const timer = window.setTimeout(() => {
      router.replace(buatUrlDaftarMenu(selectedCategory, selectedGroup, searchQuery));
    }, 250);

    return () => window.clearTimeout(timer);
  }, [queryFromUrl, router, searchQuery, selectedCategory, selectedGroup]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" || item.categoryCode === selectedCategory;
      const matchGroup =
        selectedGroup === "ALL" || termasukKelompok(item, selectedGroup);
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query));
      return matchCategory && matchGroup && matchSearch;
    });
  }, [selectedCategory, selectedGroup, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Search and Category Control Bar (Equivalent to panelisi2 in frmUtama) */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shrink-0 space-y-3 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Dropdown (cmbMenu in Khanza) */}
          <div className="flex-1 max-w-xl flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 shrink-0 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5 text-primary-700" />
              <span>Kategori Menu:</span>
            </label>
            <CustomSelect
              value={selectedCategory}
              onChange={(e) => {
                router.replace(buatUrlDaftarMenu(e.target.value, "ALL", searchQuery));
              }}
              containerClassName="relative flex-1"
            >
              <option value="ALL">
                [Semua] Seluruh Modul & Menu SIMRS Khanza
              </option>
              {MENU_CATEGORIES.map((cat) => (
                <option key={cat.code} value={cat.code}>
                  {cat.title}
                </option>
              ))}
            </CustomSelect>
          </div>

          {/* Search Box (TCari in Khanza) */}
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul atau menu..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Pengelompokan berdasarkan area penggunaan modul */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <button
            onClick={() => {
              router.replace(buatUrlDaftarMenu("ALL", "ALL", searchQuery));
            }}
            className={`px-2.5 py-1 rounded-md font-medium shrink-0 ${
              selectedGroup === "ALL"
                ? "bg-primary-700 text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua Modul
          </button>
          {KELOMPOK_MENU.map((kelompok) => (
            <button
              key={kelompok.id}
              onClick={() => {
                router.replace(buatUrlDaftarMenu("ALL", kelompok.id, searchQuery));
              }}
              className={`px-2.5 py-1 rounded-md font-medium shrink-0 ${
                selectedGroup === kelompok.id
                  ? "bg-primary-700 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {kelompok.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Module Cards Grid: 5 item per baris pada layar desktop/tablet */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={onModuleClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-slate-200">
            <FontAwesomeIcon icon={faLayerGroup} className="w-10 h-10 text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">
              Modul Tidak Ditemukan
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Tidak ada modul yang cocok dengan kriteria pencarian &quot;{searchQuery}&quot;. Silakan periksa kembali kata kunci atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                router.replace(buatUrlDaftarMenu("ALL", "ALL", ""));
              }}
              className="mt-3 text-xs font-semibold text-primary-700 hover:text-primary-800 underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

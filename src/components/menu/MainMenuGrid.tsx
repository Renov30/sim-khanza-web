"use client";

import React, { useState, useMemo } from "react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/constants/menus";
import { MenuCard } from "./MenuCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faXmark,
  faLayerGroup,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface MainMenuGridProps {
  onModuleClick: (title: string) => void;
}

export function MainMenuGrid({ onModuleClick }: MainMenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" || item.categoryCode === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === "ALL") return null;
    return MENU_CATEGORIES.find((cat) => cat.code === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Search and Category Control Bar (Equivalent to panelisi2 in frmUtama) */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shrink-0 space-y-3 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Dropdown (cmbMenu in Khanza) */}
          <div className="flex-1 max-w-xl flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 shrink-0 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5 text-emerald-700" />
              <span>Kategori Menu:</span>
            </label>
            <div className="relative flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-9 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="ALL">
                  [Semua] Seluruh Modul & Menu SIMRS Khanza
                </option>
                {MENU_CATEGORIES.map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
              </div>
            </div>
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
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
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

        {/* Quick Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
              selectedCategory === "ALL"
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua Modul
          </button>
          {MENU_CATEGORIES.slice(0, 10).map((cat) => (
            <button
              key={cat.code}
              onClick={() => setSelectedCategory(cat.code)}
              className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                selectedCategory === cat.code
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              [{cat.code}] {cat.title.split(" ")[1]?.replace(",", "") || cat.code}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Category Description Banner */}
        {activeCategoryObj && (
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start justify-between">
            <div>
              <p className="font-bold text-emerald-800">
                {activeCategoryObj.title}
              </p>
              <p className="text-emerald-700 mt-0.5">
                {activeCategoryObj.description}
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {filteredItems.length} Modul
            </span>
          </div>
        )}

        {/* Module Cards Grid: 5 item per baris pada layar desktop/tablet */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={(clicked) => onModuleClick(clicked.title)}
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
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

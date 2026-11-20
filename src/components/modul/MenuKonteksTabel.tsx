"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export interface BarisMenuKonteksTabel {
  no_rawat: string;
  nm_pasien: string;
}

export interface ItemMenuKonteksTabel {
  id: string;
  label: string;
  children?: readonly ItemMenuKonteksTabel[];
}

interface MenuKonteksTabelProps {
  terbuka: boolean;
  x: number;
  y: number;
  baris: BarisMenuKonteksTabel | null;
  menu: readonly ItemMenuKonteksTabel[];
  onPilih: (item: ItemMenuKonteksTabel) => void;
  onTutup: () => void;
}

interface HasilCari {
  item: ItemMenuKonteksTabel;
  jalur: string[];
}

function kumpulkanDaun(items: readonly ItemMenuKonteksTabel[], jalur: string[], hasil: HasilCari[]) {
  for (const item of items) {
    const jalurItem = [...jalur, item.label];
    if (item.children?.length) kumpulkanDaun(item.children, jalurItem, hasil);
    else hasil.push({ item, jalur: jalurItem });
  }
}

export function MenuKonteksTabel({ terbuka, x, y, baris, menu, onPilih, onTutup }: MenuKonteksTabelProps) {
  const [kataKunci, setKataKunci] = useState("");
  const [grupTerbuka, setGrupTerbuka] = useState<ReadonlySet<string>>(() => new Set<string>());
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cariRef = useRef<HTMLInputElement | null>(null);
  const daftarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terbuka) cariRef.current?.focus();
  }, [terbuka]);

  const daftarCari = useMemo(() => {
    const hasil: HasilCari[] = [];
    kumpulkanDaun(menu, [], hasil);
    return hasil;
  }, [menu]);

  const hasilCari = useMemo(() => {
    const kunci = kataKunci.trim().toLowerCase();
    if (!kunci) return [];
    return daftarCari.filter(({ item, jalur }) => `${jalur.join(" / ")} ${item.label}`.toLowerCase().includes(kunci));
  }, [daftarCari, kataKunci]);

  const hasilDikelompokkan = useMemo(() => {
    const peta = new Map<string, HasilCari[]>();
    for (const hasil of hasilCari) {
      const nama = hasil.jalur[0] || "Lainnya";
      const daftar = peta.get(nama) || [];
      daftar.push(hasil);
      peta.set(nama, daftar);
    }
    return Array.from(peta, ([nama, hasil]) => ({ nama, hasil }));
  }, [hasilCari]);

  const posisi = useMemo(() => {
    if (typeof window === "undefined") return { left: x, top: y, width: 384 };
    const lebar = Math.min(384, window.innerWidth - 16);
    return {
      left: Math.max(8, Math.min(x, window.innerWidth - lebar - 8)),
      top: Math.max(8, Math.min(y, window.innerHeight - 432)),
      width: lebar,
    };
  }, [x, y]);

  if (!terbuka || !baris) return null;

  const putarGrup = (id: string, buka?: boolean) => {
    setGrupTerbuka((sebelum) => {
      const berikutnya = new Set(sebelum);
      const harusBuka = buka ?? !berikutnya.has(id);
      if (harusBuka) berikutnya.add(id);
      else berikutnya.delete(id);
      return berikutnya;
    });
  };

  const gerakFokus = (selisih: number) => {
    const tombol = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>("[data-item-menu='true']") || []);
    if (tombol.length === 0) return;
    const aktif = tombol.indexOf(document.activeElement as HTMLButtonElement);
    const berikutnya = aktif < 0 ? 0 : (aktif + selisih + tombol.length) % tombol.length;
    tombol[berikutnya]?.focus();
  };

  const tanganiKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onTutup();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      gerakFokus(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    const grup = (document.activeElement as HTMLButtonElement | null)?.dataset.grup;
    if (!grup) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      putarGrup(grup, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      putarGrup(grup, false);
    }
  };

  const renderItem = (item: ItemMenuKonteksTabel, level: number): ReactNode => {
    const anak = item.children || [];
    const terbukaGrup = grupTerbuka.has(item.id);
    return (
      <li key={item.id} role="none">
        <button
          type="button"
          role="menuitem"
          data-item-menu="true"
          data-grup={anak.length ? item.id : undefined}
          aria-haspopup={anak.length ? "menu" : undefined}
          aria-expanded={anak.length ? terbukaGrup : undefined}
          title={item.label}
          onClick={() => (anak.length ? putarGrup(item.id) : onPilih(item))}
          className="flex w-full items-center justify-between gap-2 py-1.5 pr-2 text-left text-[11px] text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-600"
          style={{ paddingLeft: 8 + level * 12 }}
        >
          <span className="min-w-0 truncate">{item.label}</span>
          {anak.length > 0 && <FontAwesomeIcon icon={faChevronRight} className={`h-2.5 w-2.5 shrink-0 text-slate-500 ${terbukaGrup ? "rotate-90" : ""}`} aria-hidden="true" />}
        </button>
        {anak.length > 0 && terbukaGrup && (
          <ul role="group" className="border-l border-slate-100">
            {anak.map((anakItem) => renderItem(anakItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  const tutupKlikLuar = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.target !== event.currentTarget) return;
    onTutup();
  };

  const panel = (
    <div className="fixed inset-0 z-50" onMouseDown={tutupKlikLuar}>
      <div
        ref={panelRef}
        role="dialog"
        aria-label={`Menu tindakan untuk no. rawat ${baris.no_rawat}`}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={tanganiKeyboard}
        style={posisi}
        className="absolute flex max-h-[27rem] flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-2 py-1.5 text-[10px] text-slate-600">
          <span className="min-w-0 flex-1 truncate">
            <span className="font-mono text-slate-800">{baris.no_rawat}</span> · {baris.nm_pasien}
          </span>
          <button type="button" onClick={onTutup} aria-label="Tutup menu klik kanan" className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-600">
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
        <div className="shrink-0 border-b border-slate-100 px-2 py-1.5">
          <div className="flex h-7 items-center gap-1.5 rounded-md border border-slate-300 px-2 focus-within:border-primary-600">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3 shrink-0 text-slate-500" aria-hidden="true" />
            <input
              ref={cariRef}
              value={kataKunci}
              onChange={(event) => {
                setKataKunci(event.target.value);
                if (daftarRef.current) daftarRef.current.scrollTop = 0;
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  gerakFokus(1);
                }
              }}
              placeholder="Cari menu..."
              aria-label="Cari menu klik kanan"
              className="h-full min-w-0 flex-1 bg-transparent text-[11px] text-slate-800 outline-none placeholder:text-slate-400"
            />
            {kataKunci && (
              <button
                type="button"
                onClick={() => {
                  setKataKunci("");
                  cariRef.current?.focus();
                }}
                aria-label="Hapus pencarian"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-600"
              >
                <FontAwesomeIcon icon={faXmark} className="h-2.5 w-2.5" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="mt-1 flex items-center justify-between gap-2 px-0.5 text-[10px] text-slate-500">
            <span>{kataKunci.trim() ? `${hasilCari.length} hasil ditemukan` : "Semua grup klik kanan"}</span>
            <span className="shrink-0">↑↓ pilih · Esc tutup</span>
          </div>
        </div>
        <div ref={daftarRef} className="min-h-0 flex-1 overflow-y-auto py-1">
          {kataKunci.trim() ? (
            hasilCari.length > 0 ? (
              <ul role="menu">
                {hasilDikelompokkan.map((grup) => (
                  <li key={grup.nama} role="none">
                    <div role="presentation" className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {grup.nama}
                    </div>
                    <ul role="group">
                      {grup.hasil.map(({ item, jalur }) => {
                        const subjalur = jalur.slice(1, -1).join(" / ");
                        return (
                          <li key={`${jalur.join("/")}-${item.id}`} role="none">
                            <button
                              type="button"
                              role="menuitem"
                              data-item-menu="true"
                              onClick={() => onPilih(item)}
                              className="flex w-full items-baseline justify-between gap-2 px-2 py-1.5 text-left text-[11px] text-slate-700 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-600"
                            >
                              <span className="min-w-0 truncate">{item.label}</span>
                              {subjalur && <span className="max-w-[45%] shrink-0 truncate text-[10px] text-slate-500">{subjalur}</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-2 py-4 text-center text-[11px] text-slate-500">Menu tidak ditemukan.</p>
            )
          ) : (
            <ul role="menu">
              {menu.map((item) => renderItem(item, 0))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

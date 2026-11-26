"use client";

import type { BarisMenuKonteks, ItemMenuKonteks } from "./menu-konteks-rawat-jalan-data";
import { MENU_KONTEKS_RAWAT_JALAN } from "./menu-konteks-rawat-jalan-data";
import { MenuKonteksTabel, type ItemMenuKonteksTabel } from "./MenuKonteksTabel";

interface MenuKonteksRawatJalanProps {
  terbuka: boolean;
  x: number;
  y: number;
  baris: BarisMenuKonteks | null;
  onPilih: (item: ItemMenuKonteks) => void;
  onTutup: () => void;
}

export function MenuKonteksRawatJalan({ onPilih, ...props }: MenuKonteksRawatJalanProps) {
  if (!props.terbuka || !props.baris) return null;
  return <MenuKonteksTabel {...props} menu={MENU_KONTEKS_RAWAT_JALAN} onPilih={(item: ItemMenuKonteksTabel) => onPilih(item as ItemMenuKonteks)} />;
}

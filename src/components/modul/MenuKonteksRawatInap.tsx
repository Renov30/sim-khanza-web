"use client";

import type { BarisMenuKonteks, ItemMenuKonteks } from "./menu-konteks-rawat-inap-data";
import { MENU_KONTEKS_RAWAT_INAP } from "./menu-konteks-rawat-inap-data";
import { MenuKonteksTabel, type ItemMenuKonteksTabel } from "./MenuKonteksTabel";

interface MenuKonteksRawatInapProps {
  terbuka: boolean;
  x: number;
  y: number;
  baris: BarisMenuKonteks | null;
  onPilih: (item: ItemMenuKonteks) => void;
  onTutup: () => void;
}

export function MenuKonteksRawatInap({ onPilih, ...props }: MenuKonteksRawatInapProps) {
  return <MenuKonteksTabel {...props} menu={MENU_KONTEKS_RAWAT_INAP} onPilih={(item: ItemMenuKonteksTabel) => onPilih(item as ItemMenuKonteks)} />;
}

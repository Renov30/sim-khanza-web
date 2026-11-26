"use client";

import type { BarisMenuKonteks, ItemMenuKonteks } from "./menu-konteks-igd-data";
import { MENU_KONTEKS_IGD } from "./menu-konteks-igd-data";
import { MenuKonteksTabel, type ItemMenuKonteksTabel } from "./MenuKonteksTabel";

interface MenuKonteksIgdProps {
  terbuka: boolean;
  x: number;
  y: number;
  baris: BarisMenuKonteks | null;
  onPilih: (item: ItemMenuKonteks) => void;
  onTutup: () => void;
}

export function MenuKonteksIgd({ onPilih, ...props }: MenuKonteksIgdProps) {
  if (!props.terbuka || !props.baris) return null;
  return <MenuKonteksTabel {...props} menu={MENU_KONTEKS_IGD} onPilih={(item: ItemMenuKonteksTabel) => onPilih(item as ItemMenuKonteks)} />;
}

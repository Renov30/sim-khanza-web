"use client";

import type { ItemMenuKonteksTabel } from "./MenuKonteksTabel";
import type { BarisMenuKonteks, ItemMenuKonteks } from "./menu-konteks-registrasi-data";
import { MenuKonteksTabel } from "./MenuKonteksTabel";

interface MenuKonteksRegistrasiProps {
  terbuka: boolean;
  x: number;
  y: number;
  baris: BarisMenuKonteks | null;
  menu: readonly ItemMenuKonteksTabel[];
  onPilih: (item: ItemMenuKonteks) => void;
  onTutup: () => void;
}

export function MenuKonteksRegistrasi({ onPilih, ...props }: MenuKonteksRegistrasiProps) {
  if (!props.terbuka || !props.baris) return null;
  return <MenuKonteksTabel {...props} onPilih={(item: ItemMenuKonteksTabel) => onPilih(item as ItemMenuKonteks)} />;
}

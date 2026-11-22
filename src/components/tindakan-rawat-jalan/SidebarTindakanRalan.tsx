"use client";

import { SidebarMenuPasien } from "@/components/modul/SidebarMenuPasien";

interface SidebarTindakanRalanProps {
  noRawat?: string;
  onBelumTersedia: (label: string) => void;
  onRiwayatPasien: () => void;
  onCopyResep: () => void;
  onResumePasien: () => void;
}

export function SidebarTindakanRalan({ noRawat, onBelumTersedia, onRiwayatPasien, onCopyResep, onResumePasien }: SidebarTindakanRalanProps) {
  return (
    <SidebarMenuPasien
      noRawat={noRawat}
      onBelumTersedia={onBelumTersedia}
      onRiwayatPasien={onRiwayatPasien}
      onCopyResep={onCopyResep}
      onResumePasien={onResumePasien}
      hrefInputResep="/rawat-jalan/input-resep"
      ariaLabel="Menu tindakan rawat jalan"
    />
  );
}

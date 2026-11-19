"use client";

import { SidebarMenuPasien } from "@/components/modul/SidebarMenuPasien";

interface SidebarTindakanRalanProps {
  noRawat?: string;
  onBelumTersedia: (label: string) => void;
  onRiwayatPasien: () => void;
  onCopyResep: () => void;
}

export function SidebarTindakanRalan({ noRawat, onBelumTersedia, onRiwayatPasien, onCopyResep }: SidebarTindakanRalanProps) {
  return (
    <SidebarMenuPasien
      noRawat={noRawat}
      onBelumTersedia={onBelumTersedia}
      onRiwayatPasien={onRiwayatPasien}
      onCopyResep={onCopyResep}
      ariaLabel="Menu tindakan rawat jalan"
    />
  );
}

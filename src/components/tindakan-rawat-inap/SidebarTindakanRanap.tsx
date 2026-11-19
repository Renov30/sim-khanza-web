"use client";

import { SidebarMenuPasien } from "@/components/modul/SidebarMenuPasien";

interface SidebarTindakanRanapProps {
  noRawat?: string;
  onBelumTersedia: (label: string) => void;
  onCopyResep: () => void;
}

export function SidebarTindakanRanap({ noRawat, onBelumTersedia, onCopyResep }: SidebarTindakanRanapProps) {
  return (
    <SidebarMenuPasien
      noRawat={noRawat}
      onBelumTersedia={onBelumTersedia}
      onCopyResep={onCopyResep}
      ariaLabel="Menu tindakan rawat inap"
    />
  );
}

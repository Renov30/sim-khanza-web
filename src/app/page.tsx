"use client";

import React, { useEffect, useState } from "react";
import CalendarWidget from "@/components/widgets/CalendarWidget";
import LocationWidget from "@/components/widgets/LocationWidget";
import type { HospitalSetting } from "@/lib/types/auth";

export default function FrmUtamaPage() {
  const [setting, setSetting] = useState<HospitalSetting | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function muatIdentitasInstansi() {
      try {
        const response = await fetch("/api/system/info", { signal: controller.signal });
        const result = await response.json();
        if (response.ok && result.success && result.data?.setting) {
          setSetting(result.data.setting);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Gagal memuat identitas instansi:", error);
        }
      }
    }
    void muatIdentitasInstansi();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex-1 bg-white p-6 relative overflow-auto">
      {/* Container Widget di kiri atas */}
      <div className="flex flex-wrap items-start gap-4">
        <CalendarWidget />
        <LocationWidget />
      </div>

      <section className="absolute bottom-5 left-6 max-w-md text-left" aria-label="Identitas instansi">
        <h1 className="text-sm font-bold uppercase tracking-tight text-slate-800">
          {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {setting?.alamat_instansi || "JL. Irian Seringgu Kelurahan Samkai"}
          {setting?.kabupaten ? `, ${setting.kabupaten}` : ""}
        </p>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import CalendarWidget from "@/components/widgets/CalendarWidget";
import LocationWidget from "@/components/widgets/LocationWidget";

export default function FrmUtamaPage() {
  return (
    <div className="relative flex-1 overflow-auto bg-slate-50 p-6">
      <Image src="/images/default_wallpaper.webp" alt="" fill priority unoptimized sizes="100vw" className="object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 bg-white/20" />
      <div className="relative z-10 flex flex-wrap items-start gap-4">
        <CalendarWidget />
        <LocationWidget />
      </div>
    </div>
  );
}

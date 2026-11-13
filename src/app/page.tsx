"use client";

import React from "react";
import CalendarWidget from "@/components/widgets/CalendarWidget";
import LocationWidget from "@/components/widgets/LocationWidget";

export default function FrmUtamaPage() {
  return (
    <div className="flex-1 bg-white p-6 relative overflow-auto">
      {/* Container Widget di kiri atas */}
      <div className="flex flex-wrap items-start gap-4">
        <CalendarWidget />
        <LocationWidget />
      </div>

    </div>
  );
}

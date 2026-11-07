"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CalendarWidget from "@/components/widgets/CalendarWidget";
import LocationWidget from "@/components/widgets/LocationWidget";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Jika user mengakses URL yang tidak ada atau tersasar saat pertama kali buka,
    // langsung kembalikan ke halaman utama ("/") yang ada widget dan modal loginnya
    router.replace("/");
  }, [router]);

  return (
    <div className="flex-1 bg-white p-6 relative overflow-auto flex flex-col">
      {/* Tampilkan widget beranda agar jika 404 ter-render sejenak tidak pernah tampil layar 404 bawaan */}
      <div className="flex flex-wrap items-start gap-4">
        <CalendarWidget />
        <LocationWidget />
      </div>
    </div>
  );
}


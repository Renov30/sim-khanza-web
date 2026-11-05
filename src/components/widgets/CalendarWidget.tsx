"use client";

import React, { useState, useEffect } from "react";

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const now = currentDate || new Date();

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayName = dayNames[now.getDay()];
  const dayNumber = now.getDate();
  const monthName = monthNames[now.getMonth()];
  const year = now.getFullYear();

  // Grid kalender bulan berjalan
  const firstDayIndex = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const miniDays = ["M", "S", "S", "R", "K", "J", "S"];

  return (
    <div className="relative group overflow-hidden w-[184px] h-[184px] rounded-[30px] p-4 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between select-none">
      {/* Background glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent pointer-events-none rounded-[30px]" />

      {/* Header Widget */}
      <div className="relative z-10 flex items-baseline justify-between">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-red-500 font-sans block">
            {dayName}
          </span>
          <span className="text-[26px] leading-tight font-semibold text-gray-800 -mt-0.5 tracking-tight inline-block">
            {dayNumber}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-gray-600 block">
            {monthName}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            {year}
          </span>
        </div>
      </div>

      {/* Days Grid: Full month calendar */}
      <div className="relative z-10 -mt-1">
        <div className="grid grid-cols-7 text-center text-[9px] text-gray-400 mb-1 font-semibold">
          {miniDays.map((d, i) => (
            <span key={i} className={i === 0 ? "text-red-400" : ""}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5 text-center text-[10px] font-medium text-gray-600">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <span key={`empty-${i}`} className="h-4 w-4" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dateNum = i + 1;
            const isToday = dateNum === dayNumber;
            return (
              <span
                key={dateNum}
                className={`h-4 w-4 mx-auto flex items-center justify-center rounded-full transition-all ${
                  isToday
                    ? "bg-red-500 text-white font-bold shadow-sm"
                    : "hover:bg-black/5"
                }`}
              >
                {dateNum}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

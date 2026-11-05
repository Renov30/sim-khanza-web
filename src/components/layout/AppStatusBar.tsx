"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { ShieldCheck, User, Calendar, Server, MapPin } from "lucide-react";

export function AppStatusBar() {
  const { user, isAuthenticated } = useAuth();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-emerald-800 text-emerald-100 text-[11px] px-3 py-1 flex flex-wrap items-center justify-between border-t border-emerald-900 select-none shrink-0">
      {/* Left: User Status and Name */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Status:</span>
          <span className="text-white font-semibold">
            {isAuthenticated && user
              ? user.isAdmin
                ? "Administrator Utama"
                : "Petugas / Medis"
              : "Belum Login (Tamu)"}
          </span>
        </div>

        <div className="h-3 w-px bg-emerald-700/60" />

        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-emerald-300" />
          <span>User:</span>
          <span className="text-white font-semibold">
            {isAuthenticated && user ? user.fullName : "Log Out"}
          </span>
        </div>
      </div>

      {/* Right: Date/Clock, Host & Location */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-300" />
          <span>{currentTime || "Memuat waktu..."}</span>
        </div>

        <div className="hidden sm:block h-3 w-px bg-emerald-700/60" />

        <div className="hidden sm:flex items-center gap-1.5 text-emerald-200">
          <Server className="w-3.5 h-3.5 text-emerald-300" />
          <span>127.0.0.1:3306 [sik_mitra]</span>
        </div>

        <div className="hidden md:block h-3 w-px bg-emerald-700/60" />

        <div className="hidden md:flex items-center gap-1.5 text-emerald-200">
          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
          <span>Merauke, Papua Selatan</span>
        </div>
      </div>
    </footer>
  );
}

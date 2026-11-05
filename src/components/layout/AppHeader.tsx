"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { HospitalSetting } from "@/lib/types/auth";
import { UserCheck, LogIn, LogOut } from "lucide-react";

export function AppHeader() {
  const { user, isAuthenticated, setIsLoginModalOpen, logout } = useAuth();
  const [setting, setSetting] = useState<HospitalSetting | null>(null);

  useEffect(() => {
    fetch("/api/system/info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.setting) {
          setSetting(data.data.setting);
        }
      })
      .catch((err) => console.error("Error loading system info:", err));
  }, []);

  return (
    <header className="bg-emerald-800 text-white border-b border-emerald-900 shrink-0">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Kiri: Nama Instansi & Alamat */}
        <div className="flex flex-col">
          <h1 className="text-sm md:text-base font-bold tracking-tight text-white uppercase leading-snug">
            {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
          </h1>
          <p className="text-xs text-emerald-100/90 leading-tight">
            {setting?.alamat_instansi || "JL. Irian Seringgu Kelurahan Samkai"}
            {setting?.kabupaten ? `, ${setting.kabupaten}` : ""}
            {setting?.propinsi ? ` - ${setting.propinsi}` : ""}
          </p>
        </div>

        {/* Kanan: Tombol Login / Info Akun Login */}
        <div className="flex items-center">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5 bg-emerald-900/80 pl-3 pr-2 py-1.5 rounded-lg border border-emerald-700/60 text-xs">
              <UserCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-white leading-tight">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-emerald-200/80">
                  {user.role === "admin" ? "Administrator" : `@${user.username}`}
                </p>
              </div>
              <button
                onClick={() => logout()}
                className="ml-2 px-2 py-1 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded flex items-center gap-1 transition-colors"
                title="Keluar (Log Out)"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

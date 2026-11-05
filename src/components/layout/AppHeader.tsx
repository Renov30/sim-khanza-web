"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { AppMenuBar } from "./AppMenuBar";
import { HospitalSetting } from "@/lib/types/auth";
import {
  Hospital,
  Database,
  UserCheck,
  UserX,
  LogIn,
  LogOut,
  Building,
} from "lucide-react";

interface AppHeaderProps {
  onModuleClick: (title: string) => void;
  onAboutClick: () => void;
}

export function AppHeader({ onModuleClick, onAboutClick }: AppHeaderProps) {
  const { user, isAuthenticated, setIsLoginModalOpen, logout } = useAuth();
  const [setting, setSetting] = useState<HospitalSetting | null>(null);
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    database: string;
    host: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/system/info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSetting(data.data.setting);
          setDbStatus(data.data.database);
        }
      })
      .catch((err) => console.error("Error loading system info:", err));
  }, []);

  return (
    <header className="flex flex-col bg-white border-b border-slate-200 shrink-0">
      {/* Upper Header: Brand & Identity */}
      <div className="flex items-center justify-between px-4 py-2 bg-emerald-800 text-white">
        {/* Left: Hospital Name & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Hospital className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white uppercase">
                {setting?.nama_instansi || "KLINIK MITRA KELUARGA PAPUA"}
              </h1>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-700/50">
                Web Edition
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80 flex items-center gap-1.5">
              <span>{setting?.alamat_instansi || "JL. Irian Seringgu, Merauke"}</span>
              <span>•</span>
              <span>SIMRS Khanza HMS</span>
            </p>
          </div>
        </div>

        {/* Right: DB Status & Active User Profile */}
        <div className="flex items-center gap-3">
          {/* DB Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-700/40 text-[11px] text-emerald-200">
            <Database className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              DB: {dbStatus?.database || "sik_mitra"}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus?.connected ? "bg-emerald-400" : "bg-red-400 animate-pulse"
              }`}
              title={dbStatus?.connected ? "Database Connected" : "Database Disconnected"}
            />
          </div>

          {/* User Status Badge */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-emerald-900/80 pl-2.5 pr-1.5 py-1 rounded-lg border border-emerald-700/50 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
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
                className="ml-2 p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded transition-colors"
                title="Keluar (Log Out)"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In Petugas</span>
            </button>
          )}
        </div>
      </div>

      {/* Lower Header: Traditional Desktop Menu Bar */}
      <AppMenuBar onModuleClick={onModuleClick} onAboutClick={onAboutClick} />
    </header>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLocationDot, 
  faCloudSun, 
  faHospital, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";

export default function LocationWidget() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [secondsStr, setSecondsStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setSecondsStr(
        now.toLocaleTimeString("id-ID", {
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group overflow-hidden w-[184px] h-[184px] rounded-[30px] p-4 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between select-none">
      {/* Background glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent pointer-events-none rounded-[30px]" />

      {/* Header Widget */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-7 h-7 rounded-xl bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 shadow-sm">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div>
            <div className="text-[12px] font-semibold text-gray-800 leading-tight">
              Klinik / RS
            </div>
            <div className="text-[9.5px] text-gray-400">
              Lokasi Aktif
            </div>
          </div>
        </div>

        <FontAwesomeIcon 
          icon={faCloudSun} 
          className="text-amber-500 text-sm mt-1 animate-pulse" 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-1 my-auto">
        <div className="flex items-center gap-1.5 text-gray-700">
          <FontAwesomeIcon icon={faHospital} className="text-[11px] text-gray-400" />
          <span className="text-[13px] font-semibold truncate text-gray-800">
            SIMKES Khanza
          </span>
        </div>
        <div className="text-[10.5px] text-gray-500 leading-relaxed">
          Wilayah Kerja Utama
          <span className="block text-[9.5px] text-gray-400">Indonesia (WIB)</span>
        </div>
      </div>

      {/* Bottom info: Jam & Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-500 font-medium pt-2 border-t border-gray-100/80">
        <div className="flex items-center gap-1.5 text-gray-700">
          <FontAwesomeIcon icon={faClock} className="text-[10px] text-gray-400" />
          <span className="font-bold tracking-tight text-gray-800 text-[13px]">
            {timeStr || "--:--"}
          </span>
          <span className="text-[9px] text-gray-400 -ml-0.5">
            :{secondsStr || "00"}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Online
        </span>
      </div>
    </div>
  );
}

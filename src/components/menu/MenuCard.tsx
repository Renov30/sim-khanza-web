"use client";

import React from "react";
import { MenuItem } from "@/lib/types/menu";
import {
  UserPlus,
  Stethoscope,
  BedDouble,
  Activity,
  Receipt,
  CreditCard,
  CalendarClock,
  LayoutGrid,
  Smartphone,
  ScanLine,
  QrCode,
  Pill,
  Users,
  Clock,
  Wallet,
  Package,
  ShoppingCart,
  FileSpreadsheet,
  Boxes,
  TestTubes,
  Bone,
  Tags,
  BookOpenCheck,
  ShieldCheck,
  HeartPulse,
  Building2,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Stethoscope,
  BedDouble,
  ActivitySquare: Activity,
  Activity,
  Receipt,
  CreditCard,
  CalendarClock,
  LayoutGrid,
  Smartphone,
  ScanLine,
  QrCode,
  Pill,
  Users,
  Clock,
  Wallet,
  Package,
  ShoppingCart,
  FileSpreadsheet,
  Boxes,
  TestTubes,
  Bone,
  Tags,
  BookOpenCheck,
  ShieldCheck,
  HeartPulse,
  Building2,
  ShieldAlert,
};

export function MenuCard({ item, onClick }: MenuCardProps) {
  const IconComponent = iconMap[item.iconName] || HelpCircle;

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative flex flex-col items-start p-3.5 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200/90 hover:border-emerald-600/60 shadow-xs hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
          <IconComponent className="w-5 h-5 transition-transform group-hover:scale-105" />
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
          [{item.categoryCode}]
        </span>
      </div>

      <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 line-clamp-1 transition-colors">
        {item.title}
      </h3>

      {item.description && (
        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
          {item.description}
        </p>
      )}
    </button>
  );
}

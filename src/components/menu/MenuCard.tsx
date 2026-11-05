"use client";

import React from "react";
import { MenuItem } from "@/lib/types/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faUserPlus,
  faStethoscope,
  faBed,
  faHeartPulse,
  faReceipt,
  faCreditCard,
  faCalendarCheck,
  faTableCellsLarge,
  faMobileScreen,
  faBarcode,
  faQrcode,
  faPills,
  faUsers,
  faClock,
  faWallet,
  faBox,
  faCartShopping,
  faFileLines,
  faBoxesStacked,
  faVial,
  faXRay,
  faTags,
  faBookMedical,
  faShieldHalved,
  faHospital,
  faShield,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const iconMap: Record<string, IconDefinition> = {
  UserPlus: faUserPlus,
  Stethoscope: faStethoscope,
  BedDouble: faBed,
  ActivitySquare: faHeartPulse,
  Activity: faHeartPulse,
  Receipt: faReceipt,
  CreditCard: faCreditCard,
  CalendarClock: faCalendarCheck,
  LayoutGrid: faTableCellsLarge,
  Smartphone: faMobileScreen,
  ScanLine: faBarcode,
  QrCode: faQrcode,
  Pill: faPills,
  Users: faUsers,
  Clock: faClock,
  Wallet: faWallet,
  Package: faBox,
  ShoppingCart: faCartShopping,
  FileSpreadsheet: faFileLines,
  Boxes: faBoxesStacked,
  TestTubes: faVial,
  Bone: faXRay,
  Tags: faTags,
  BookOpenCheck: faBookMedical,
  ShieldCheck: faShieldHalved,
  HeartPulse: faHeartPulse,
  Building2: faHospital,
  ShieldAlert: faShield,
};

export function MenuCard({ item, onClick }: MenuCardProps) {
  const icon = iconMap[item.iconName] || faCircleQuestion;

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative flex flex-col items-center justify-center p-3 bg-white hover:bg-emerald-50/20 rounded-2xl border border-slate-200/90 hover:border-emerald-600/50 shadow-2xs hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[110px] w-full"
    >
      {/* Category Code Badge di Pojok Kanan Atas */}
      <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
        [{item.categoryCode}]
      </span>

      {/* App Icon Centered (Vibes App Launcher HP) */}
      <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-2xs mb-2">
        <FontAwesomeIcon icon={icon} className="w-5 h-5 transition-transform" />
      </div>

      {/* Title Centered */}
      <h3 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-800 line-clamp-2 transition-colors leading-snug px-1">
        {item.title}
      </h3>
    </button>
  );
}

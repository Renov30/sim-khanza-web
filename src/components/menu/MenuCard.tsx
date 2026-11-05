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
      className="group relative flex flex-col items-center justify-center p-4 sm:p-5 bg-white hover:bg-emerald-50/20 rounded-2xl border border-slate-200/90 hover:border-emerald-600/50 shadow-2xs hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[140px] sm:min-h-[155px] w-full"
    >
      {/* Category Code Badge di Pojok Kanan Atas */}
      <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
        [{item.categoryCode}]
      </span>

      {/* App Icon Centered (Vibes App Launcher HP yang Proporsional & Lebih Besar) */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-2xs mb-3">
        <FontAwesomeIcon icon={icon} className="w-6 h-6 sm:w-7 sm:h-7 transition-transform" />
      </div>

      {/* Title Centered */}
      <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-800 line-clamp-2 transition-colors leading-snug px-1">
        {item.title}
      </h3>
    </button>
  );
}

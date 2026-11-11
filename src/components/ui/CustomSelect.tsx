"use client";

import React, { SelectHTMLAttributes, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options?: SelectOption[];
  icon?: any;
  containerClassName?: string;
}

/**
 * Standard CustomSelect Component
 * Sesuai aturan: appearance-none dengan ikon faChevronDown yang memiliki jarak tepi proporsional (pr-3, pr-9 pada select).
 */
export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      options,
      children,
      className = "",
      containerClassName = "relative w-full",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`min-w-0 ${containerClassName}`}>
        <select
          ref={ref}
          className={`w-full appearance-none text-xs font-medium bg-white border border-slate-300 rounded-lg pl-3 pr-9 py-1.5 text-slate-800 truncate focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
        </div>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";


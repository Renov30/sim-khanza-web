import type { ReactNode } from "react";

interface GridFormulirModulProps {
  children: ReactNode;
  className?: string;
}

/**
 * Grid baku formulir modul: dua kolom aktif dan satu kolom cadangan.
 * Pada layar kecil seluruh konten kembali menjadi satu kolom.
 */
export function GridFormulirModul({
  children,
  className = "",
}: GridFormulirModulProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-7 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] ${className}`}
    >
      {children}
      <div aria-hidden="true" className="hidden lg:block" />
    </div>
  );
}

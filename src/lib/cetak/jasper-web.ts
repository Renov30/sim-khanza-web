import type { AsetLokalis } from "@/lib/modul/aset-lokalis";

export interface EntriJasperFormulir {
  label: string;
  nilai: string;
}

export type PayloadCetakJasper =
  | {
      mode: "formulir";
      judul: string;
      subJudul?: string;
      entri: readonly EntriJasperFormulir[];
      gambar?: readonly AsetLokalis[];
      orientasi?: "portrait" | "landscape";
    }
  | {
      mode: "tabel";
      judul: string;
      subJudul?: string;
      kolom: readonly string[];
      baris: readonly (readonly string[])[];
      orientasi?: "portrait" | "landscape";
    };

const PREFIX_STORAGE = "khanza_jasper_print_";

function bersihkanPayloadLama() {
  try {
    const kunciLama: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX_STORAGE)) kunciLama.push(k);
    }
    // Simpan maksimal 8 payload terakhir agar localStorage tidak penuh
    if (kunciLama.length > 8) {
      kunciLama.sort();
      for (const k of kunciLama.slice(0, kunciLama.length - 8)) {
        window.localStorage.removeItem(k);
      }
    }
  } catch {
    // abaikan jika storage tidak tersedia
  }
}

/**
 * Membuka URL halaman cetak (mis. /cetak/dokumen?...) pada tab baru
 * dengan parameter autoprint=1 menyerupai JasperViewer di Khanza Java.
 */
export function bukaTabCetakUrl(rute: string, autoprint = true): boolean {
  const pemisah = rute.includes("?") ? "&" : "?";
  const urlFinal = autoprint && !rute.includes("autoprint=") ? `${rute}${pemisah}autoprint=1` : rute;
  const win = window.open(urlFinal, "_blank", "noopener,noreferrer");
  return win !== null;
}

/**
 * Menyimpan payload cetak laporan/formulir ke localStorage lalu membuka
 * /cetak/laporan di tab baru dengan auto-print gaya JasperReport.
 */
export function bukaTabCetakJasper(payload: PayloadCetakJasper, autoprint = true): boolean {
  bersihkanPayloadLama();
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  try {
    window.localStorage.setItem(`${PREFIX_STORAGE}${id}`, JSON.stringify(payload));
  } catch {
    return false;
  }
  const qs = new URLSearchParams({ id });
  if (autoprint) qs.set("autoprint", "1");
  const win = window.open(`/cetak/laporan?${qs.toString()}`, "_blank", "noopener,noreferrer");
  return win !== null;
}

export function bacaPayloadCetakJasper(id: string): PayloadCetakJasper | null {
  if (!id) return null;
  try {
    const raw = window.localStorage.getItem(`${PREFIX_STORAGE}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as PayloadCetakJasper;
  } catch {
    return null;
  }
}

export function ekstrakTabelDom(table: HTMLTableElement): { kolom: string[]; baris: string[][] } {
  const ths = Array.from(table.querySelectorAll("thead th"));
  const indeksAktif: number[] = [];
  const kolom: string[] = [];

  ths.forEach((th, idx) => {
    const teks = (th.textContent || "").replace(/\s+/g, " ").trim();
    const hanyaCheckbox = !teks && th.querySelector('input[type="checkbox"]') !== null;
    if (hanyaCheckbox) return;
    indeksAktif.push(idx);
    kolom.push(teks || `Kolom ${kolom.length + 1}`);
  });

  const baris: string[][] = [];
  table.querySelectorAll("tbody tr").forEach((tr) => {
    const cells = Array.from(tr.querySelectorAll("td"));
    if (cells.length === 0) return;
    if (cells.length <= 1 && (cells[0]?.colSpan ?? 1) > 1) return;
    if (indeksAktif.length > 0 && indeksAktif.length <= cells.length) {
      baris.push(
        indeksAktif.map((i) => (cells[i]?.textContent || "").replace(/\s+/g, " ").trim() || "-"),
      );
    } else {
      baris.push(cells.map((td) => (td.textContent || "").replace(/\s+/g, " ").trim() || "-"));
    }
  });

  return { kolom, baris };
}

/**
 * Mencari tabel data aktif pada halaman saat ini lalu membukanya di tab baru
 * /cetak/laporan dengan auto-print gaya JasperViewer.
 */
export function cetakTabelDomJasper(
  judul: string,
  subJudul?: string,
  opsi?: { tabel?: HTMLTableElement | null; orientasi?: "portrait" | "landscape" },
): boolean {
  let target = opsi?.tabel || null;
  if (!target) {
    const root = document.querySelector("main") || document.body;
    const semuaTabel = Array.from(root.querySelectorAll("table"));
    let skorTerbaik = 0;
    for (const tbl of semuaTabel) {
      const rect = tbl.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      const { baris } = ekstrakTabelDom(tbl);
      if (baris.length > skorTerbaik) {
        skorTerbaik = baris.length;
        target = tbl;
      }
    }
  }

  if (target) {
    const { kolom, baris } = ekstrakTabelDom(target);
    if (baris.length > 0) {
      return bukaTabCetakJasper({
        mode: "tabel",
        judul,
        subJudul,
        kolom,
        baris,
        orientasi: opsi?.orientasi,
      });
    }
  }

  window.print();
  return true;
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuKonteksTabel, type ItemMenuKonteksTabel } from "@/components/modul/MenuKonteksTabel";
import { bukaTabCetakJasper, bukaTabCetakUrl, ekstrakTabelDom, type EntriJasperFormulir } from "@/lib/cetak/jasper-web";
import { dapatkanJudulHalaman } from "@/lib/navigasi/judul-halaman";

interface KonteksGlobalState {
  x: number;
  y: number;
  ringkas: string;
  noRawat: string | null;
  entri: EntriJasperFormulir[];
  tabelEl: HTMLTableElement | null;
}

const NO_RAWAT_RE = /\b\d{4}\/\d{2}\/\d{2}\/\d{4,6}\b/;

function eksporTabelKeCsv(table: HTMLTableElement, namaFile: string) {
  const rows: string[] = [];
  const trs = table.querySelectorAll("tr");
  trs.forEach((tr) => {
    const cells = Array.from(tr.querySelectorAll("th, td"));
    if (cells.length === 0) return;
    const cols = cells.map((c) => {
      const txt = (c.textContent || "").replace(/\s+/g, " ").trim().replace(/"/g, '""');
      return `"${txt}"`;
    });
    rows.push(cols.join(","));
  });
  if (rows.length === 0) return;
  const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${namaFile.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Menu klik kanan global (delegated, zero-overhead saat tertutup) untuk semua tabel halaman
 * yang belum memiliki handler onContextMenu khusus. Tidak menimpa halaman yang sudah
 * memanggil event.preventDefault() seperti /registrasi, /igd, /rawat-jalan, /rawat-inap,
 * dan HalamanModulPelayanan.
 */
export function GlobalTableContextMenu({ onNotifikasi }: { onNotifikasi: (pesan: string) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [konteks, setKonteks] = useState<KonteksGlobalState | null>(null);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const tr = target?.closest("tbody tr") as HTMLTableRowElement | null;
      if (!tr) return;
      const table = tr.closest("table") as HTMLTableElement | null;
      if (!table) return;
      const cells = Array.from(tr.querySelectorAll("td"));
      // Lewati baris kosong / loading dengan colSpan penuh
      if (cells.length <= 1 && cells[0]?.colSpan > 1) return;

      const headers = Array.from(table.querySelectorAll("thead th")).map((th, idx) =>
        (th.textContent || "").replace(/\s+/g, " ").trim() || `Kolom ${idx + 1}`,
      );
      const entri: EntriJasperFormulir[] = cells.map((td, idx) => ({
        label: headers[idx] || `Kolom ${idx + 1}`,
        nilai: (td.textContent || "").replace(/\s+/g, " ").trim() || "-",
      }));

      const teksGabung = entri.map((e) => e.nilai).join(" ");
      const matchRawat = teksGabung.match(NO_RAWAT_RE);
      const noRawat = matchRawat ? matchRawat[0] : null;
      const ringkas = entri
        .slice(0, 2)
        .map((e) => e.nilai)
        .filter((v) => v && v !== "-")
        .join(" · ") || "Baris Data";

      event.preventDefault();
      setKonteks({
        x: event.clientX,
        y: event.clientY,
        ringkas,
        noRawat,
        entri,
        tabelEl: table,
      });
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const judulHalaman = dapatkanJudulHalaman(pathname);

  const pilihItem = useCallback(
    (item: ItemMenuKonteksTabel) => {
      const k = konteks;
      setKonteks(null);
      if (!k) return;

      if (item.id === "ctx-cetak-baris") {
        const ok = bukaTabCetakJasper({ mode: "formulir", judul: judulHalaman, subJudul: k.ringkas, entri: k.entri });
        if (!ok) onNotifikasi("Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.");
        return;
      }
      if (item.id === "ctx-cetak-halaman") {
        if (k.tabelEl) {
          const { kolom, baris } = ekstrakTabelDom(k.tabelEl);
          const ok = bukaTabCetakJasper({ mode: "tabel", judul: `Laporan ${judulHalaman}`, kolom, baris });
          if (!ok) onNotifikasi("Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.");
        } else {
          window.print();
        }
        return;
      }
      if (item.id === "ctx-ekspor-csv") {
        if (k.tabelEl) eksporTabelKeCsv(k.tabelEl, judulHalaman);
        onNotifikasi(`Data tabel ${judulHalaman} berhasil diekspor ke CSV.`);
        return;
      }
      if (item.id === "ctx-salin-baris") {
        const teks = k.entri.map((e) => `${e.label}: ${e.nilai}`).join("\n");
        void navigator.clipboard?.writeText(teks);
        onNotifikasi("Detail baris disalin ke clipboard.");
        return;
      }
      if (k.noRawat) {
        const enc = encodeURIComponent(k.noRawat);
        if (item.id === "ctx-salin-norawat") {
          void navigator.clipboard?.writeText(k.noRawat);
          onNotifikasi(`No. Rawat ${k.noRawat} disalin.`);
          return;
        }
        if (item.id === "ctx-riwayat") { router.push(`/riwayat-pasien?no_rawat=${enc}`); return; }
        if (item.id === "ctx-resume") { router.push(`/resume-pasien?no_rawat=${enc}`); return; }
        if (item.id === "ctx-berkas") { router.push(`/rekam-medis/berkas-digital-perawatan?no_rawat=${enc}`); return; }
        if (item.id === "ctx-billing") { router.push(`/rawat-inap/billing?no_rawat=${enc}`); return; }
        if (item.id === "ctx-ralan") { router.push(`/tindakan-rawat-jalan?no_rawat=${enc}`); return; }
        if (item.id === "ctx-ranap") { router.push(`/tindakan-rawat-inap?no_rawat=${enc}`); return; }
        if (item.id === "ctx-dokumen") {
          const qs = new URLSearchParams({ jenis: "MnCetakRegister", no_rawat: k.noRawat, judul: judulHalaman });
          bukaTabCetakUrl(`/cetak/dokumen?${qs.toString()}`);
          return;
        }
      }
    },
    [judulHalaman, konteks, onNotifikasi, router],
  );

  if (!konteks) return null;

  const menuItems: ItemMenuKonteksTabel[] = [
    {
      id: "grp-cetak",
      label: "Cetak & Ekspor",
      children: [
        { id: "ctx-cetak-baris", label: "Cetak Formulir / Detail Baris" },
        { id: "ctx-cetak-halaman", label: "Cetak Halaman / Tabel" },
        { id: "ctx-ekspor-csv", label: "Ekspor Tabel ke CSV (Excel)" },
      ],
    },
    ...(konteks?.noRawat
      ? [
          {
            id: "grp-klinis",
            label: "Navigasi Rekam Medis & Billing",
            children: [
              { id: "ctx-riwayat", label: "Riwayat Perawatan Pasien" },
              { id: "ctx-resume", label: "Resume Medis Pasien" },
              { id: "ctx-berkas", label: "Berkas Digital Perawatan" },
              { id: "ctx-billing", label: "Billing / Pembayaran Pasien" },
              { id: "ctx-ralan", label: "Tindakan Rawat Jalan" },
              { id: "ctx-ranap", label: "Tindakan Rawat Inap" },
              { id: "ctx-dokumen", label: "Cetak Bukti / Dokumen Kunjungan" },
            ],
          },
          { id: "ctx-salin-norawat", label: `Salin No. Rawat (${konteks.noRawat})` },
        ]
      : []),
    { id: "ctx-salin-baris", label: "Salin Detail Baris" },
  ];

  return (
    <MenuKonteksTabel
      terbuka
      x={konteks.x}
      y={konteks.y}
      baris={{ no_rawat: konteks.noRawat || judulHalaman, nm_pasien: konteks.ringkas }}
      menu={menuItems}
      onPilih={pilihItem}
      onTutup={() => setKonteks(null)}
    />
  );
}

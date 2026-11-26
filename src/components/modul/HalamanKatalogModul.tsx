"use client";

import { useMemo } from "react";
import {
  HalamanModulPelayanan,
  type FieldFormPelayanan,
  type KolomTabelPelayanan,
  type KonfigurasiHalamanPelayanan,
} from "@/components/modul/HalamanModulPelayanan";
import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";
import { dapatkanAsetLokalis } from "@/lib/modul/aset-lokalis";

function keTipeKolomTabel(tipe: DefinisiModulKatalog["kolom"][number]["tipe"]): KolomTabelPelayanan["tipe"] {
  if (tipe === "uang") return "uang";
  if (tipe === "enum") return "status";
  if (tipe === "date" || tipe === "datetime" || tipe === "time" || tipe === "number") return "mono";
  return "teks";
}

function keFieldForm(k: DefinisiModulKatalog["kolom"][number]): FieldFormPelayanan {
  if (k.tipe === "enum" && k.opsi && k.opsi.length > 0) {
    return {
      nama: k.nama,
      label: k.label,
      tipe: "select",
      wajib: k.wajib,
      readOnlySaatEdit: k.pk,
      defaultValue: k.opsi[0],
      opsiStatis: k.opsi.map((v) => ({ value: v, label: v })),
    };
  }
  if (k.tipe === "number" || k.tipe === "uang") {
    return {
      nama: k.nama,
      label: k.label,
      tipe: "number",
      wajib: k.wajib,
      readOnlySaatEdit: k.pk || k.autoInc,
      defaultValue: "0",
    };
  }
  if (k.tipe === "date") {
    return {
      nama: k.nama,
      label: k.label,
      tipe: "date",
      wajib: k.wajib,
      readOnlySaatEdit: k.pk,
    };
  }
  if (k.tipe === "time") {
    return {
      nama: k.nama,
      label: k.label,
      tipe: "time",
      wajib: k.wajib,
      readOnlySaatEdit: k.pk,
    };
  }
  return {
    nama: k.nama,
    label: k.label,
    tipe: (k.maks ?? 0) > 150 ? "textarea" : "text",
    wajib: k.wajib,
    readOnlySaatEdit: k.pk || k.autoInc,
    maxLength: k.maks,
    defaultValue: k.tipe === "datetime" ? "__NOW__" : undefined,
    placeholder: k.autoInc ? "Otomatis" : k.tipe === "datetime" ? "YYYY-MM-DD HH:MM:SS" : undefined,
  };
}

export function HalamanKatalogModul({
  definisi,
  apiPath,
}: {
  definisi: DefinisiModulKatalog;
  apiPath: string;
}) {
  const config = useMemo<KonfigurasiHalamanPelayanan>(() => {
    const pkCols = definisi.kolom.filter((k) => k.pk);
    const keyCols = pkCols.length > 0 ? pkCols : definisi.kolom.slice(0, 4);

    // Tampilkan maksimal 14 kolom utama di tabel agar tidak terlalu lebar,
    // sementara seluruh kolom tetap tersedia pada formulir input data.
    const kolomTabelSumber = definisi.kolom.length > 14 ? definisi.kolom.slice(0, 14) : definisi.kolom;
    const kolom: KolomTabelPelayanan[] = kolomTabelSumber.map((k) => ({
      kunci: k.nama,
      label: k.label,
      tipe: k.pk && k.tipe === "text" ? "mono" : keTipeKolomTabel(k.tipe),
      align: k.tipe === "uang" || k.tipe === "number" ? "right" : k.tipe === "date" || k.tipe === "time" || k.tipe === "enum" ? "center" : "left",
    }));

    const bisaMutasi = definisi.bisaTambah || definisi.bisaUbah || definisi.bisaHapus;
    const gambarReferensi = dapatkanAsetLokalis(definisi.slug);

    return {
      id: `${definisi.kategori.toLowerCase()}-${definisi.slug}`,
      caption: `Data ${definisi.judul} (${definisi.tabel})`,
      endpoint: apiPath,
      pakaiPeriode: Boolean(definisi.kolomTanggal),
      placeholderCari: `Cari ${definisi.judul}...`,
      minWidthTabel: `${Math.max(52, Math.min(100, kolom.length * 9))}rem`,
      kolom,
      gambarReferensi,
      kunciBaris: (baris) => keyCols.map((k) => String(baris[k.nama] ?? "")).join("__"),
      ringkasanKartu: definisi.kolomRingkasan
        ? [{ kunci: definisi.kolomRingkasan.nama, label: definisi.kolomRingkasan.label, tipe: "uang" }]
        : undefined,
      form: bisaMutasi
        ? {
            judulPanel: `.: Input / Kelola ${definisi.judul}`,
            bisaTambah: definisi.bisaTambah,
            bisaUbah: definisi.bisaUbah,
            bisaHapus: definisi.bisaHapus,
            fields: definisi.kolom.map(keFieldForm),
            kunciHapusParams: (baris) => {
              const out: Record<string, string> = {};
              for (const k of pkCols) out[k.nama] = String(baris[k.nama] ?? "");
              return out;
            },
            labelHapus: (baris) =>
              pkCols.map((k) => `${k.label}: ${String(baris[k.nama] ?? "")}`).join(", ") || definisi.judul,
          }
        : undefined,
    };
  }, [apiPath, definisi]);

  return <HalamanModulPelayanan config={config} />;
}

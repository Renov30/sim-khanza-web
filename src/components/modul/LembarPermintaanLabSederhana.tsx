"use client";

import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { BarisApi } from "@/lib/types/api";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { MENU_AKSI_UMUM, SidebarAksiLis, type AksiLis } from "@/components/modul/SidebarAksiLis";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast, type ToastTipe } from "@/components/common/Toast";

export type KolomPermintaanLab = {
  label: string;
  kunci?: string;
  kelas?: string;
  tampil?: (baris: BarisApi) => ReactNode;
};

type Notifikasi = {
  pesan: string;
  tipe: ToastTipe;
};

interface LembarPermintaanLabSederhanaProps {
  endpoint: string;
  nama: string;
  placeholderPencarian: string;
  kolom: KolomPermintaanLab[];
}

function teks(nilai: string | number | null | undefined) {
  return nilai === null || nilai === undefined || nilai === "" ? "-" : String(nilai);
}

export function LembarPermintaanLabSederhana({
  endpoint,
  nama,
  placeholderPencarian,
  kolom,
}: LembarPermintaanLabSederhanaProps) {
  const [data, setData] = useState<BarisApi[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [status, setStatus] = useState("Semua");
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [notifikasi, setNotifikasi] = useState<Notifikasi | null>(null);

  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const url = new URL(endpoint, window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      if (status !== "Semua") url.searchParams.set("status", status);
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setNotifikasi({ pesan: json.error || `Gagal memuat data permintaan lab ${nama}`, tipe: "error" });
      }
    } catch (err: unknown) {
      setNotifikasi({ pesan: err instanceof Error ? err.message : "Terjadi kesalahan jaringan.", tipe: "error" });
    } finally {
      setMemuat(false);
    }
  }, [endpoint, kataKunci, nama, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatData(), 0);
    return () => window.clearTimeout(timer);
  }, [muatData]);

  const jalankanAksi = (aksi: AksiLis) => {
    if (!terpilih) {
      setNotifikasi({ pesan: "Pilih permintaan laboratorium terlebih dahulu.", tipe: "error" });
      return;
    }
    if (aksi.jenis === "cetak") {
      window.print();
      return;
    }
    setNotifikasi({ pesan: `${aksi.label} untuk ${terpilih} belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const pilihBaris = (kode: string) => {
    if (!kode) return;
    setTerpilih((sekarang) => (sekarang === kode ? null : kode));
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
        <SidebarAksiLis onAksi={jalankanAksi} menu={MENU_AKSI_UMUM} judul="Aksi Permintaan Lab" />
        <div className="flex min-w-0 flex-1 flex-col space-y-2.5 overflow-hidden">
          <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor={`permintaan-${nama.toLowerCase()}-cari`} className="whitespace-nowrap text-xs font-semibold text-slate-700">
                Pencarian :
              </label>
              <div className="relative min-w-[12rem] flex-1 sm:max-w-md">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
                <input
                  id={`permintaan-${nama.toLowerCase()}-cari`}
                  type="text"
                  value={kataKunci}
                  onChange={(event) => { setKataKunci(event.target.value); setTerpilih(null); }}
                  placeholder={placeholderPencarian}
                  className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 pl-7 pr-7 text-xs text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {kataKunci && (
                  <button
                    type="button"
                    onClick={() => { setKataKunci(""); setTerpilih(null); }}
                    aria-label="Hapus pencarian"
                    title="Hapus pencarian"
                    className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                  </button>
                )}
              </div>
              <label htmlFor={`permintaan-${nama.toLowerCase()}-status`} className="whitespace-nowrap text-xs font-semibold text-slate-700">
                Status :
              </label>
              <CustomSelect
                id={`permintaan-${nama.toLowerCase()}-status`}
                value={status}
                onChange={(event) => { setStatus(event.target.value); setTerpilih(null); }}
                containerClassName="relative w-52"
                className="h-7 py-0.5 text-xs"
              >
                <option value="Semua">Semua Status Rawat</option>
                <option value="ralan">Rawat Jalan (Ralan)</option>
                <option value="ranap">Rawat Inap (Ranap)</option>
              </CustomSelect>
              <span className="ml-auto whitespace-nowrap text-xs text-slate-500">
                Total: <span className="font-semibold tabular-nums text-slate-800">{data.length}</span> permintaan
              </span>
            </div>
          </section>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full border-collapse text-left text-[11px]">
                <caption className="sr-only">Daftar permintaan laboratorium {nama}</caption>
                <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/80 font-semibold text-slate-700">
                  <tr>
                    {kolom.map((item) => (
                      <th key={item.label} scope="col" className="whitespace-nowrap px-2.5 py-2">
                        {item.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  {memuat ? (
                    <tr>
                      <td colSpan={kolom.length} className="py-12 text-center text-slate-400">
                        Memuat data permintaan lab {nama}...
                      </td>
                    </tr>
                  ) : data.length === 0 ? (
                    <tr>
                      <td colSpan={kolom.length} className="py-12 text-center text-slate-400">
                        Tidak ada data permintaan lab {nama} yang sesuai
                      </td>
                    </tr>
                  ) : (
                    data.map((baris, indeks) => {
                      const kode = teks(baris.noorder);
                      const dipilih = kode !== "-" && terpilih === kode;
                      return (
                        <tr
                          key={`${kode}-${indeks}`}
                          tabIndex={kode === "-" ? -1 : 0}
                          title="Klik untuk memilih permintaan"
                          onClick={() => pilihBaris(kode === "-" ? "" : kode)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              pilihBaris(kode === "-" ? "" : kode);
                            }
                          }}
                          className={`cursor-pointer outline-none focus:ring-1 focus:ring-inset focus:ring-primary-500 ${dipilih ? "bg-primary-100" : "hover:bg-slate-50/80"}`}
                        >
                          {kolom.map((item) => (
                            <td key={item.label} className={`px-2.5 py-2 ${item.kelas || "text-slate-600"}`}>
                              {item.tampil
                                ? item.tampil(baris)
                                : teks(item.kunci ? baris[item.kunci] : "-")}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <PanelBawah tampilan="web" tampilkanRecord={false} />
      <Toast message={notifikasi?.pesan || null} tipe={notifikasi?.tipe} onClose={() => setNotifikasi(null)} />
    </div>
  );
}

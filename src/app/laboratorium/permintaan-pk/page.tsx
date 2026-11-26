"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";
import {
  faCheck,
  faFileCircleCheck,
  faFlaskVial,
  faMagnifyingGlass,
  faVial,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { PanelBawah, type TombolAksiCustom } from "@/components/modul/PanelBawah";
import { SidebarAksiLis, type AksiLis } from "@/components/modul/SidebarAksiLis";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";

type JenisRawat = "ralan" | "ranap";
type JenisTabel = "permintaan" | "item";

interface OpsiFilter {
  value: string;
  label: string;
}

interface ItemPermintaan {
  kd_jenis_prw?: string;
  nm_perawatan?: string;
  pemeriksaan?: string;
  satuan?: string;
  nilai_rujukan_ld?: string;
  nilai_rujukan_la?: string;
  nilai_rujukan_pd?: string;
  nilai_rujukan_pa?: string;
}

interface PermintaanBaris {
  [kolom: string]: string | number | null | ItemPermintaan[] | undefined;
  item?: ItemPermintaan[];
}

interface ResponsApi {
  success: boolean;
  data?: PermintaanBaris[];
  error?: string;
}

interface ResponsOpsi {
  success: boolean;
  data?: { dokter?: OpsiFilter[]; poli?: OpsiFilter[]; ruang?: OpsiFilter[] };
}

const CABANG: readonly JenisRawat[] = ["ralan", "ranap"];
const TABEL: readonly JenisTabel[] = ["permintaan", "item"];

function teks(nilai: unknown): string {
  return nilai === null || nilai === undefined ? "" : String(nilai);
}

function kunciTab(
  event: React.KeyboardEvent<HTMLButtonElement>,
  daftar: readonly string[],
  aktif: string,
  atur: (nilai: string) => void,
  awalanId: string,
) {
  const indeks = daftar.indexOf(aktif);
  let berikut = indeks;
  if (event.key === "ArrowRight") berikut = (indeks + 1) % daftar.length;
  else if (event.key === "ArrowLeft") berikut = (indeks - 1 + daftar.length) % daftar.length;
  else if (event.key === "Home") berikut = 0;
  else if (event.key === "End") berikut = daftar.length - 1;
  else return;
  event.preventDefault();
  atur(daftar[berikut]);
  window.requestAnimationFrame(() => {
    document.getElementById(`${awalanId}${daftar[berikut]}`)?.focus();
  });
}

export default function HalamanPermintaanLabPK() {
  const [data, setData] = useState<PermintaanBaris[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [tanggalMulai, setTanggalMulai] = useState(() => registrationDate());
  const [tanggalSelesai, setTanggalSelesai] = useState(() => registrationDate());
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [rawat, setRawat] = useState<JenisRawat>("ralan");
  const [tabel, setTabel] = useState<JenisTabel>("permintaan");
  const [dokter, setDokter] = useState("");
  const [poli, setPoli] = useState("");
  const [ruang, setRuang] = useState("");
  const [statusRanap, setStatusRanap] = useState("");
  const [opsi, setOpsi] = useState<{ dokter: OpsiFilter[]; poli: OpsiFilter[]; ruang: OpsiFilter[] }>({
    dokter: [],
    poli: [],
    ruang: [],
  });
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [versiPencarian, setVersiPencarian] = useState(0);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "error" } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({
        mode: tabel === "item" ? "item" : "data",
        status: rawat,
        limit: "500",
      });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (kataKunciFilter) params.set("cari", kataKunciFilter);
      if (dokter) params.set("dokter", dokter);
      if (poli) params.set("poli", poli);
      if (ruang) params.set("ruang", ruang);
      if (rawat === "ranap" && statusRanap) params.set("status_ranap", statusRanap);

      const respons = await fetch(`/api/laboratorium/permintaan-pk?${params.toString()}`, {
        signal,
        cache: "no-store",
      });
      const json = (await respons.json()) as ResponsApi;
      if (!respons.ok || !json.success) {
        throw new Error(json.error || "Gagal memuat data permintaan lab PK.");
      }
      const baris = json.data || [];
      setData(baris);
      setTerpilih((kode) => (kode && baris.some((item) => teks(item.noorder) === kode) ? kode : null));
    } catch (error) {
      if (!signal?.aborted) {
        setToast({
          pesan: error instanceof Error ? error.message : "Gagal memuat data permintaan lab PK.",
          tipe: "error",
        });
      }
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [dokter, kataKunciFilter, poli, rawat, ruang, statusRanap, tabel, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void muatData(controller.signal); }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, versiPencarian]);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const respons = await fetch("/api/laboratorium/permintaan-pk/options", {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = (await respons.json()) as ResponsOpsi;
        if (respons.ok && json.success && json.data) {
          setOpsi({
            dokter: json.data.dokter || [],
            poli: json.data.poli || [],
            ruang: json.data.ruang || [],
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setToast({ pesan: "Pilihan filter dokter, poli, dan ruang tidak dapat dimuat.", tipe: "error" });
        }
      }
    })();
    return () => controller.abort();
  }, []);

  const cari = () => {
    setKataKunciFilter(kataKunci.trim());
    setVersiPencarian((versi) => versi + 1);
    setTerpilih(null);
  };

  const semua = () => {
    setKataKunci("");
    setKataKunciFilter("");
    setDokter("");
    setPoli("");
    setRuang("");
    setStatusRanap("");
    setTerpilih(null);
    setVersiPencarian((versi) => versi + 1);
  };

  const pilih = (baris: PermintaanBaris) => {
    const kode = teks(baris.noorder);
    setTerpilih((sekarang) => (sekarang === kode ? null : kode));
  };

  const infoBelumTersedia = (aksi: string) => {
    setToast({ pesan: `${aksi} permintaan laboratorium belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const jalankanAksiLis = (aksi: AksiLis) => {
    if (!terpilih) {
      setToast({ pesan: "Pilih permintaan laboratorium terlebih dahulu.", tipe: "error" });
      return;
    }
    if (aksi.jenis === "cetak") {
      if (!cetakTabelDomJasper("Laporan Permintaan Laboratorium PK", `No. Order: ${terpilih}`)) {
        setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
      }
      return;
    }
    if (aksi.jenis === "ambil" && tabel === "item") {
      setTabel("permintaan");
      setToast({ pesan: "Ambil hasil hanya tersedia pada Data Permintaan. Tampilan sudah dialihkan.", tipe: "info" });
      return;
    }
    const kata = aksi.jenis === "kirim"
      ? `Pengiriman permintaan ke ${aksi.vendor || "LIS"}`
      : aksi.jenis === "ambil"
        ? `Pengambilan hasil dari ${aksi.vendor || "LIS"}`
        : `Aksi ${aksi.label}`;
    setToast({ pesan: `${kata} untuk ${terpilih} belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const kolom = tabel === "permintaan"
    ? ["No. Permintaan", "No. Rawat", "Pasien", "Permintaan", "Jam", "Sampel", "Jam", "Hasil", "Jam", "Dokter Perujuk", rawat === "ralan" ? "Poli Registrasi" : "Kamar Terakhir", "Informasi Tambahan", "Diagnosa Klinis", "Jenis Bayar"]
    : ["No. Permintaan", "No. Rawat", "Pasien", "Pemeriksaan", "Detail Pemeriksaan", "Satuan", "Nilai Rujukan", "Permintaan", "Jam", "Sampel", "Jam", "Hasil", "Jam", "Dokter Perujuk", rawat === "ralan" ? "Poli Registrasi" : "Kamar Terakhir", "Informasi Tambahan", "Diagnosa Klinis", "Jenis Bayar"];

  const tombolTambahan: TombolAksiCustom[] = [
    { label: "Sampel", ikon: faVial, onClick: () => infoBelumTersedia("Pencatatan sampel"), tooltip: "Catat waktu pengambilan sampel" },
    { label: "Hasil", ikon: faFileCircleCheck, onClick: () => infoBelumTersedia("Pencatatan hasil"), tooltip: "Catat waktu hasil pemeriksaan" },
  ];

  const kelasBaris = (kode: string) => terpilih === kode ? "cursor-pointer bg-primary-100" : "cursor-pointer hover:bg-slate-50/80";

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
        <SidebarAksiLis onAksi={jalankanAksiLis} />
        <div className="flex min-w-0 flex-1 flex-col space-y-2.5 overflow-hidden">
          <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="permintaan-tgl-mulai" className="whitespace-nowrap text-xs font-semibold text-slate-700">Tanggal :</label>
          <input
            id="permintaan-tgl-mulai"
            aria-label="Tanggal mulai permintaan"
            type="date"
            value={tanggalMulai}
            onChange={(event) => setTanggalMulai(event.target.value)}
            className="h-7 w-[8.5rem] rounded-md border border-slate-300 px-2 text-xs tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <span className="text-xs text-slate-600">s.d.</span>
          <input
            id="permintaan-tgl-selesai"
            aria-label="Tanggal selesai permintaan"
            type="date"
            value={tanggalSelesai}
            onChange={(event) => setTanggalSelesai(event.target.value)}
            className="h-7 w-[8.5rem] rounded-md border border-slate-300 px-2 text-xs tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="permintaan-kata-kunci" className="ml-2 whitespace-nowrap text-xs font-semibold text-slate-700">Key Word :</label>
          <div className="relative min-w-[12rem] flex-1 sm:max-w-xl">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              id="permintaan-kata-kunci"
              type="text"
              value={kataKunci}
              maxLength={100}
              onChange={(event) => setKataKunci(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") cari(); }}
              placeholder="No. Permintaan, No. Rawat, No. RM, pasien, dokter, diagnosa, jenis bayar..."
              className="h-7 w-full rounded-md border border-slate-300 pl-8 pr-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
            />
            {kataKunci && (
              <button
                type="button"
                onClick={() => setKataKunci("")}
                aria-label="Kosongkan kata kunci"
                title="Kosongkan kata kunci"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={cari}
            aria-label="Cari permintaan laboratorium"
            title="Cari permintaan laboratorium (Enter)"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-50 text-primary-700 hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Jenis rawat permintaan" className="flex shrink-0 border-b border-slate-200">
          {CABANG.map((nilai) => (
            <button
              key={nilai}
              id={`tab-rawat-${nilai}`}
              type="button"
              role="tab"
              aria-selected={rawat === nilai}
              aria-controls="panel-rawat"
              tabIndex={rawat === nilai ? 0 : -1}
              onClick={() => { setRawat(nilai); setTerpilih(null); }}
              onKeyDown={(event) => kunciTab(event, CABANG, rawat, (baru) => setRawat(baru as JenisRawat), "tab-rawat-")}
              className={`border-b-2 px-4 py-2 text-xs font-semibold ${rawat === nilai ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {nilai === "ralan" ? "Rawat Jalan" : "Rawat Inap"}
            </button>
          ))}
        </div>

        <div id="panel-rawat" role="tabpanel" aria-labelledby={`tab-rawat-${rawat}`} className="flex min-h-0 flex-1 flex-col">
          <div role="tablist" aria-label="Jenis tabel permintaan" className="flex shrink-0 border-b border-slate-200">
            {TABEL.map((nilai) => (
              <button
                key={nilai}
                id={`tab-tabel-${nilai}`}
                type="button"
                role="tab"
                aria-selected={tabel === nilai}
                aria-controls="panel-tabel"
                tabIndex={tabel === nilai ? 0 : -1}
                onClick={() => { setTabel(nilai); setTerpilih(null); }}
                onKeyDown={(event) => kunciTab(event, TABEL, tabel, (baru) => setTabel(baru as JenisTabel), "tab-tabel-")}
                className={`border-b-2 px-4 py-2 text-xs font-semibold ${tabel === nilai ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
              >
                {nilai === "permintaan" ? "Data Permintaan" : "Item Permintaan"}
              </button>
            ))}
          </div>

          <div id="panel-tabel" role="tabpanel" aria-labelledby={`tab-tabel-${tabel}`} className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
            <table className="w-full min-w-[100rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">
                {tabel === "permintaan" ? "Data permintaan laboratorium patologi klinis" : "Item permintaan laboratorium patologi klinis"} {rawat === "ralan" ? "rawat jalan" : "rawat inap"}
              </caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {kolom.map((judul, indeks) => (
                    <th key={`${judul}-${indeks}`} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={kolom.length} className="h-36 border-0 text-center text-slate-500">Memuat data permintaan laboratorium...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={kolom.length} className="h-44 border-0 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada permintaan laboratorium pada filter ini.</p></td></tr>
                ) : tabel === "item" ? (
                  data.map((baris) => (
                    <tr key={`item-${teks(baris.noorder)}`} className={kelasBaris(teks(baris.noorder))} onClick={() => pilih(baris)}>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono text-slate-800">{teks(baris.noorder)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.no_rawat)}</td>
                      <td className="px-2 py-1.5"><span className="font-mono text-slate-600">{teks(baris.no_rkm_medis)}</span><span className="ml-1 text-slate-800">{teks(baris.nm_pasien)}</span></td>
                      <td className="whitespace-nowrap px-2 py-1.5"><span className="font-mono text-slate-600">{teks(baris.kd_jenis_prw)}</span><span className="ml-1">{teks(baris.nm_perawatan)}</span></td>
                      <td className="px-2 py-1.5">{teks(baris.pemeriksaan)}</td>
                      <td className="px-2 py-1.5">{teks(baris.satuan)}</td>
                      <td className="px-2 py-1.5">{teks(baris.nilai_rujukan) || "-"}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_permintaan)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_permintaan)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_sampel)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_sampel)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_hasil)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_hasil)}</td>
                      <td className="whitespace-nowrap px-2 py-1.5">{teks(baris.nm_dokter)}</td>
                      <td className="px-2 py-1.5">{teks(baris.ruang)}</td>
                      <td className="px-2 py-1.5">{teks(baris.informasi_tambahan) || "-"}</td>
                      <td className="px-2 py-1.5">{teks(baris.diagnosa_klinis) || "-"}</td>
                      <td className="px-2 py-1.5">{teks(baris.png_jawab)}</td>
                    </tr>
                  ))
                ) : (
                  data.map((baris) => {
                    const kode = teks(baris.noorder);
                    const daftarItem = baris.item || [];
                    const kelompok = new Map<string, ItemPermintaan[]>();
                    for (const item of daftarItem) {
                      const kodeItem = teks(item.kd_jenis_prw);
                      const kumpulanItem = kelompok.get(kodeItem) || [];
                      kumpulanItem.push(item);
                      kelompok.set(kodeItem, kumpulanItem);
                    }
                    return (
                      <React.Fragment key={`permintaan-${kode}`}>
                        <tr className={kelasBaris(kode)} onClick={() => pilih(baris)}>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono text-slate-800">{kode}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.no_rawat)}</td>
                          <td className="px-2 py-1.5"><span className="font-mono text-slate-600">{teks(baris.no_rkm_medis)}</span><span className="ml-1 text-slate-800">{teks(baris.nm_pasien)}</span></td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_permintaan)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_permintaan)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_sampel)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_sampel)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.tgl_hasil)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5 font-mono">{teks(baris.jam_hasil)}</td>
                          <td className="whitespace-nowrap px-2 py-1.5">{teks(baris.nm_dokter)}</td>
                          <td className="px-2 py-1.5">{teks(baris.ruang)}</td>
                          <td className="px-2 py-1.5">{teks(baris.informasi_tambahan) || "-"}</td>
                          <td className="px-2 py-1.5">{teks(baris.diagnosa_klinis) || "-"}</td>
                          <td className="px-2 py-1.5">{teks(baris.png_jawab)}</td>
                        </tr>
                        {[...kelompok.entries()].map(([kodeItem, daftar]) => (
                          <React.Fragment key={`${kode}-${kodeItem}`}>
                            <tr className={kelasBaris(kode)} onClick={() => pilih(baris)}>
                              <td colSpan={2} />
                              <td className="px-2 py-1 pl-6 font-semibold text-slate-700">{teks(daftar[0]?.nm_perawatan)} <span className="font-mono text-[10px] text-slate-500">{kodeItem}</span></td>
                              <td colSpan={6} />
                              <td className="px-2 py-1 text-slate-500">Nilai Rujukan L.D.</td>
                              <td className="px-2 py-1 text-slate-500">Nilai Rujukan L.A.</td>
                              <td className="px-2 py-1 text-slate-500">Nilai Rujukan P.D.</td>
                              <td className="px-2 py-1 text-slate-500">Nilai Rujukan P.A.</td>
                              <td />
                            </tr>
                            {daftar.map((item, indeks) => (
                              <tr key={`${kode}-${kodeItem}-${teks(item.pemeriksaan)}-${indeks}`} className={kelasBaris(kode)} onClick={() => pilih(baris)}>
                                <td colSpan={2} />
                                <td className="px-2 py-1 pl-10">{teks(item.pemeriksaan)}</td>
                                <td className="px-2 py-1">{teks(item.satuan)}</td>
                                <td />
                                <td />
                                <td colSpan={3} />
                                <td className="px-2 py-1">{teks(item.nilai_rujukan_ld)}</td>
                                <td className="px-2 py-1">{teks(item.nilai_rujukan_la)}</td>
                                <td className="px-2 py-1">{teks(item.nilai_rujukan_pd)}</td>
                                <td className="px-2 py-1">{teks(item.nilai_rujukan_pa)}</td>
                                <td />
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-slate-200 bg-white px-2 py-1.5">
            <label htmlFor="permintaan-dokter" className="whitespace-nowrap text-xs font-semibold text-slate-700">Dokter :</label>
            <CustomSelect id="permintaan-dokter" value={dokter} onChange={(event) => { setDokter(event.target.value); setTerpilih(null); }} containerClassName="relative w-48" className="h-7 py-0.5 pr-8 text-[11px]">
              <option value="">Semua</option>
              {opsi.dokter.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </CustomSelect>

            {rawat === "ralan" ? (
              <>
                <label htmlFor="permintaan-poli" className="whitespace-nowrap text-xs font-semibold text-slate-700">Unit/Poli :</label>
                <CustomSelect id="permintaan-poli" value={poli} onChange={(event) => { setPoli(event.target.value); setTerpilih(null); }} containerClassName="relative w-48" className="h-7 py-0.5 pr-8 text-[11px]">
                  <option value="">Semua</option>
                  {opsi.poli.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </CustomSelect>
              </>
            ) : (
              <>
                <label htmlFor="permintaan-ruang" className="whitespace-nowrap text-xs font-semibold text-slate-700">Ruang :</label>
                <CustomSelect id="permintaan-ruang" value={ruang} onChange={(event) => { setRuang(event.target.value); setTerpilih(null); }} containerClassName="relative w-48" className="h-7 py-0.5 pr-8 text-[11px]">
                  <option value="">Semua</option>
                  {opsi.ruang.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </CustomSelect>
                <label htmlFor="permintaan-status-ranap" className="whitespace-nowrap text-xs font-semibold text-slate-700">Status :</label>
                <CustomSelect id="permintaan-status-ranap" value={statusRanap} onChange={(event) => { setStatusRanap(event.target.value); setTerpilih(null); }} containerClassName="relative w-32" className="h-7 py-0.5 pr-8 text-[11px]">
                  <option value="">Semua</option>
                  <option value="Belum Pulang">Belum Pulang</option>
                </CustomSelect>
              </>
            )}
          </div>
        </div>
      </section>
        </div>
      </div>

      <PanelBawah
        tampilan="web"
        onHapus={() => infoBelumTersedia("Penghapusan")}
        onCetak={() => {
          if (!cetakTabelDomJasper("Laporan Permintaan Laboratorium PK")) {
            setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
          }
        }}
        onSemua={semua}
        tombolTambahan={tombolTambahan}
        jumlahRecord={data.length}
        memuat={memuat}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

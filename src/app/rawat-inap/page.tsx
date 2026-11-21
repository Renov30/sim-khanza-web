"use client";

import { useState, useEffect, useCallback, useMemo, useRef, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import type { BarisApi } from "@/lib/types/api";
import { useRouter } from "next/navigation";
import { MenuKonteksRawatInap } from "@/components/modul/MenuKonteksRawatInap";
import { kunciBarisRawatInap, tentukanAksiMenu, type AksiMenuKonteks, type BarisMenuKonteks, type ItemMenuKonteks, type KunciSortRawatInap } from "@/components/modul/menu-konteks-rawat-inap-data";
import { Toast } from "@/components/common/Toast";
import { PanelBawah, type TombolAksiCustom } from "@/components/modul/PanelBawah";
import { DialogPulangRawatInap, type HasilPulang } from "@/components/modul/DialogPulangRawatInap";
import { DialogPindahKamarRawatInap } from "@/components/modul/DialogPindahKamarRawatInap";
import { DialogPasienMati } from "@/components/modul/DialogPasienMati";
import { DialogRujuk } from "@/components/modul/DialogRujuk";
import { CustomSelect } from "@/components/ui/CustomSelect";
import type { BarisRawatInapMutasi } from "@/lib/rawat-inap/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBedPulse,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faFileCirclePlus,
  faMagnifyingGlass,
  faReceipt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type ModeFilter = "semua" | "belum" | "masuk" | "pulang";

interface UrutanTabel {
  kunci: KunciSortRawatInap;
  arah: "asc" | "desc";
}

const kunciBaris = kunciBarisRawatInap;

function tanggalHariIni() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const hari = String(sekarang.getDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
}

function nilaiSort(item: BarisApi, kunci: KunciSortRawatInap) {
  switch (kunci) {
    case "penjab": return String(item.p_jawab ?? "");
    case "no_rm": return String(item.no_rkm_medis ?? "");
    case "nama": return String(item.nm_pasien ?? "");
    case "kamar": return String(item.nm_bangsal ?? item.kd_kamar ?? "");
    case "tanggal_masuk": return `${String(item.tgl_masuk ?? "")} ${String(item.jam_masuk ?? "")}`;
    default: return String(item.no_rawat ?? "");
  }
}

function jadikanBarisMenu(item: BarisApi): BarisMenuKonteks {
  return {
    no_rawat: String(item.no_rawat ?? ""),
    no_rkm_medis: String(item.no_rkm_medis ?? ""),
    nm_pasien: String(item.nm_pasien ?? ""),
    p_jawab: item.p_jawab == null ? null : String(item.p_jawab),
    kd_kamar: String(item.kd_kamar ?? ""),
    nm_bangsal: item.nm_bangsal == null ? null : String(item.nm_bangsal),
    tgl_masuk: String(item.tgl_masuk ?? ""),
    jam_masuk: String(item.jam_masuk ?? ""),
  };
}

function jadikanBarisMutasi(item: BarisApi): BarisRawatInapMutasi {
  return {
    no_rawat: String(item.no_rawat ?? ""),
    no_rkm_medis: String(item.no_rkm_medis ?? ""),
    nm_pasien: String(item.nm_pasien ?? ""),
    kd_kamar: String(item.kd_kamar ?? ""),
    nm_bangsal: item.nm_bangsal == null ? null : String(item.nm_bangsal),
    trf_kamar: item.trf_kamar ?? 0,
    diagnosa_awal: item.diagnosa_awal == null ? null : String(item.diagnosa_awal),
    diagnosa_akhir: item.diagnosa_akhir == null ? null : String(item.diagnosa_akhir),
    tgl_masuk: String(item.tgl_masuk ?? ""),
    jam_masuk: String(item.jam_masuk ?? ""),
    tgl_keluar: item.tgl_keluar == null ? null : String(item.tgl_keluar),
    jam_keluar: item.jam_keluar == null ? null : String(item.jam_keluar),
    lama: item.lama ?? 1,
    ttl_biaya: item.ttl_biaya ?? 0,
    stts_pulang: item.stts_pulang == null ? null : String(item.stts_pulang),
  };
}

export default function HalamanRawatInap() {
  const router = useRouter();
  const [data, setData] = useState<BarisApi[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [memuat, setMemuat] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [modeFilter, setModeFilter] = useState<ModeFilter>("belum");
  const [tanggalMulai, setTanggalMulai] = useState(tanggalHariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(tanggalHariIni);
  const [statusBayar, setStatusBayar] = useState("Semua");
  const [bangsal, setBangsal] = useState("");
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const [menuKonteks, setMenuKonteks] = useState<{ x: number; y: number; baris: BarisMenuKonteks } | null>(null);
  const [barisTerpilih, setBarisTerpilih] = useState("");
  const [dataTerpilih, setDataTerpilih] = useState<BarisApi | null>(null);
  const [urutanTabel, setUrutanTabel] = useState<UrutanTabel | null>(null);
  const [dialogPulang, setDialogPulang] = useState<BarisRawatInapMutasi | null>(null);
  const [dialogPindah, setDialogPindah] = useState<BarisRawatInapMutasi | null>(null);
  const [hasilPulang, setHasilPulang] = useState<HasilPulang | null>(null);
  const [dialogLanjutan, setDialogLanjutan] = useState<"mati" | "rujuk" | null>(null);
  const permintaanTabel = useRef<AbortController | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const pilihBaris = useCallback((item: BarisApi) => {
    if (barisTerpilih === kunciBaris(item)) {
      setBarisTerpilih("");
      setDataTerpilih(null);
      return;
    }
    setBarisTerpilih(kunciBaris(item));
    setDataTerpilih(item);
  }, [barisTerpilih]);

  const dataTampil = useMemo(() => {
    if (!urutanTabel) return data;
    return [...data].sort((a, b) => {
      const hasil = nilaiSort(a, urutanTabel.kunci).localeCompare(nilaiSort(b, urutanTabel.kunci), "id", { numeric: true, sensitivity: "base" });
      return urutanTabel.arah === "asc" ? hasil : -hasil;
    });
  }, [data, urutanTabel]);

  const bukaMenuKonteks = useCallback((event: ReactMouseEvent<HTMLTableRowElement>, item: BarisApi) => {
    event.preventDefault();
    pilihBaris(item);
    setMenuKonteks({ x: event.clientX, y: event.clientY, baris: jadikanBarisMenu(item) });
  }, [pilihBaris]);

  const bukaMenuKonteksDariKeyboard = useCallback((event: ReactKeyboardEvent<HTMLTableRowElement>, item: BarisApi) => {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    pilihBaris(item);
    const batas = event.currentTarget.getBoundingClientRect();
    setMenuKonteks({ x: batas.left + 16, y: batas.top + 16, baris: jadikanBarisMenu(item) });
  }, [pilihBaris]);

  const pilihMenuKonteks = useCallback((item: ItemMenuKonteks) => {
    const konteks = menuKonteks;
    setMenuKonteks(null);
    if (!konteks) return;
    const aksi: AksiMenuKonteks = tentukanAksiMenu(item, konteks.baris);
    if (aksi.jenis === "rute") router.push(aksi.rute);
    else if (aksi.jenis === "urut") setUrutanTabel({ kunci: aksi.kunci, arah: aksi.arah });
    else tampilkanToast(`${aksi.label} untuk ${konteks.baris.no_rawat} belum tersedia di Khanza Web.`, "info");
  }, [menuKonteks, router, tampilkanToast]);

  const muatData = useCallback(async () => {
    permintaanTabel.current?.abort();
    const controller = new AbortController();
    permintaanTabel.current = controller;
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/rawat-inap", window.location.origin);
      url.searchParams.set("mode", modeFilter);
      if (modeFilter === "masuk" || modeFilter === "pulang") {
        url.searchParams.set("tanggal_mulai", tanggalMulai);
        url.searchParams.set("tanggal_selesai", tanggalSelesai);
      }
      if (statusBayar !== "Semua") url.searchParams.set("status_bayar", statusBayar);
      if (bangsal.trim()) url.searchParams.set("bangsal", bangsal.trim());
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString(), { signal: controller.signal, cache: "no-store" });
      const json = await res.json() as { success?: boolean; data?: BarisApi[]; total?: number; page?: number; error?: string };
      if (controller.signal.aborted) return;
      if (json.success) {
        setData(Array.isArray(json.data) ? json.data : []);
        setTotalData(Number(json.total) || 0);
        setHalaman(Number(json.page) || 1);
      } else {
        setData([]);
        setTotalData(0);
        setPesanError(json.error || "Gagal memuat data rawat inap");
      }
    } catch (err: unknown) {
      if (!controller.signal.aborted) {
        setData([]);
        setTotalData(0);
        setPesanError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
      }
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [bangsal, halaman, kataKunci, modeFilter, statusBayar, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatData(), 0);
    return () => {
      window.clearTimeout(timer);
      permintaanTabel.current?.abort();
    };
  }, [muatData]);

  const resetFilter = useCallback(() => {
    setKataKunci("");
    setModeFilter("belum");
    setTanggalMulai(tanggalHariIni());
    setTanggalSelesai(tanggalHariIni());
    setStatusBayar("Semua");
    setBangsal("");
    setHalaman(1);
    setBarisTerpilih("");
    setDataTerpilih(null);
    setUrutanTabel(null);
    setMenuKonteks(null);
    setDialogPulang(null);
    setDialogPindah(null);
    setDialogLanjutan(null);
  }, []);

  const tanganiSuksesPulang = useCallback((hasil: HasilPulang) => {
    setDialogPulang(null);
    setDataTerpilih(null);
    setBarisTerpilih("");
    setHasilPulang(hasil);
    void muatData();
    tampilkanToast(`Pasien ${hasil.nm_pasien} berhasil dipulangkan dengan status ${hasil.status_pulang}.`, "sukses");
    if (hasil.tindak_lanjut === "meninggal") setDialogLanjutan("mati");
    if (hasil.tindak_lanjut === "rujuk") setDialogLanjutan("rujuk");
  }, [muatData, tampilkanToast]);

  const tanganiSuksesLanjutan = useCallback((pesan: string) => {
    setDialogLanjutan(null);
    setHasilPulang(null);
    setDataTerpilih(null);
    setBarisTerpilih("");
    void muatData();
    tampilkanToast(pesan, "sukses");
  }, [muatData, tampilkanToast]);

  const tanganiSuksesPindah = useCallback((pesan: string) => {
    setDialogPindah(null);
    setDataTerpilih(null);
    setBarisTerpilih("");
    void muatData();
    tampilkanToast(pesan, "sukses");
  }, [muatData, tampilkanToast]);

  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="shrink-0 whitespace-nowrap text-slate-600">Mode :</span>
      <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Mode filter rawat inap">
        {([
          ["semua", "Semua"],
          ["belum", "Belum Pulang"],
          ["masuk", "Tgl. Masuk"],
          ["pulang", "Pulang"],
        ] as const).map(([nilai, label]) => (
          <label key={nilai} className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700">
            <input
              type="radio"
              name="mode-filter-rawat-inap"
              value={nilai}
              checked={modeFilter === nilai}
              onChange={() => { setModeFilter(nilai); setHalaman(1); }}
              className="h-3 w-3 accent-primary-600"
            />
            {label}
          </label>
        ))}
      </div>
      {modeFilter !== "semua" && (
        <span className="text-[10px] text-slate-500">
          Periode: {modeFilter === "masuk" ? "Tgl. Masuk" : "Tgl. Pulang"}
        </span>
      )}
      <CustomSelect
        containerClassName="w-36"
        value={statusBayar}
        onChange={(event) => { setStatusBayar(event.target.value); setHalaman(1); }}
        aria-label="Status bayar"
      >
        <option value="Semua">Stts. Bayar: Semua</option>
        <option value="Sudah Bayar">Sudah Bayar</option>
        <option value="Belum Bayar">Belum Bayar</option>
      </CustomSelect>
      <div className="flex min-w-[12rem] flex-1 items-center gap-1.5">
        <label htmlFor="filter-bangsal-rawat-inap" className="shrink-0 whitespace-nowrap text-slate-600">Bangsal :</label>
        <div className="relative min-w-0 flex-1">
          <input
            id="filter-bangsal-rawat-inap"
            type="text"
            value={bangsal}
            onChange={(event) => { setBangsal(event.target.value); setHalaman(1); }}
            placeholder="Nama bangsal"
            className="h-7 w-full rounded-md border border-slate-300 px-2 pr-7 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-600"
          />
          {bangsal && (
            <button
              type="button"
              onClick={() => { setBangsal(""); setHalaman(1); }}
              aria-label="Hapus filter bangsal"
              className="absolute inset-y-0 right-0 flex w-7 items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const tombolTambahan: TombolAksiCustom[] = [
    {
      label: "Masuk",
      ikon: faFileCirclePlus,
      onClick: () => tampilkanToast("Input masuk kamar belum tersedia di Khanza Web.", "info"),
      tooltip: "Masukkan pasien ke kamar",
    },
    {
      label: "Pulang",
      ikon: faCheck,
      disabled: !barisTerpilih || !dataTerpilih,
      onClick: () => {
        if (dataTerpilih) setDialogPulang(jadikanBarisMutasi(dataTerpilih));
      },
      tooltip: "Proses kepulangan pasien terpilih",
    },
    {
      label: "Pindah",
      ikon: faArrowRight,
      disabled: !barisTerpilih || !dataTerpilih,
      onClick: () => {
        if (dataTerpilih) setDialogPindah(jadikanBarisMutasi(dataTerpilih));
      },
      tooltip: "Pindahkan pasien terpilih ke kamar lain",
    },
    {
      label: "Excel",
      ikon: faReceipt,
      onClick: () => tampilkanToast("Ekspor Excel belum tersedia di Khanza Web.", "info"),
      tooltip: "Ekspor data ke Excel",
    },
  ];

  return (
    <div className="module-page flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2 sm:p-3 space-y-2.5">
      <div className="flex-1 bg-white rounded-lg border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
        {pesanError && (
          <div className="m-2.5 p-2.5 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-xs text-red-700">
            <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{pesanError}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <caption className="sr-only">Data pasien rawat inap</caption>
            <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th scope="col" className="py-2 px-2.5">No. Rawat</th>
                <th scope="col" className="py-2 px-2.5">No. RM</th>
                <th scope="col" className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th scope="col" className="py-2 px-2.5">Kamar / Bangsal</th>
                <th scope="col" className="py-2 px-2.5 text-right">Tarif Kamar</th>
                <th scope="col" className="py-2 px-2.5">Tgl Masuk</th>
                <th scope="col" className="py-2 px-2.5">Tgl Keluar</th>
                <th scope="col" className="py-2 px-2.5 text-center">Lama (Hari)</th>
                <th scope="col" className="py-2 px-2.5 min-w-[140px]">Diagnosa Awal</th>
                <th scope="col" className="py-2 px-2.5 min-w-[140px]">Diagnosa Akhir</th>
                <th scope="col" className="py-2 px-2.5 text-center">Status Pulang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="w-6 h-6 text-slate-300 mb-2" aria-hidden="true" />
                    <p>Memuat data pasien rawat inap...</p>
                  </td>
                </tr>
              ) : dataTampil.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faBedPulse} className="w-8 h-8 text-slate-300 mb-2" aria-hidden="true" />
                    <p>Tidak ada catatan rawat inap yang sesuai</p>
                  </td>
                </tr>
              ) : (
                dataTampil.map((item) => (
                  <tr
                    key={kunciBaris(item)}
                    tabIndex={0}
                    onClick={() => pilihBaris(item)}
                    onContextMenu={(event) => bukaMenuKonteks(event, item)}
                    onKeyDown={(event) => {
                      bukaMenuKonteksDariKeyboard(event, item);
                      if ((event.key === "Enter" || event.key === " ") && !event.shiftKey) {
                        event.preventDefault();
                        pilihBaris(item);
                      }
                    }}
                    aria-current={barisTerpilih === kunciBaris(item) ? "true" : undefined}
                    className={`hover:bg-slate-50/80 ${barisTerpilih === kunciBaris(item) ? "bg-primary-100" : ""}`}
                  >
                    <td className="whitespace-nowrap py-2 px-2.5 font-medium text-slate-800">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          pilihBaris(item);
                          router.push(`/tindakan-rawat-inap?no_rawat=${encodeURIComponent(String(item.no_rawat ?? ""))}`);
                        }}
                        className="font-mono text-slate-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700"
                        aria-label={`Input tindakan untuk nomor rawat ${item.no_rawat}, pasien ${item.nm_pasien}`}
                      >
                        {item.no_rawat}
                      </button>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_bangsal ? `${item.nm_bangsal} (${item.kd_kamar})` : item.kd_kamar}
                    </td>
                    <td className="py-2 px-2.5 text-right text-slate-600">
                      {Number(item.trf_kamar || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_masuk} <span className="text-slate-400">{item.jam_masuk}</span>
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_keluar || "-"} <span className="text-slate-400">{item.jam_keluar}</span>
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-slate-800">
                      {item.lama || "1"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.diagnosa_awal || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.diagnosa_akhir || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.stts_pulang === "-" || !item.stts_pulang
                            ? "bg-slate-100 text-slate-600 border border-slate-200"
                            : "bg-secondary-50 text-secondary-700 border border-secondary-200"
                        }`}
                      >
                        {item.stts_pulang === "-" || !item.stts_pulang ? "Masih Rawat" : item.stts_pulang}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PanelBawah
        tampilan="web"
        memuat={memuat}
        jumlahRecord={totalData}
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={(nilai) => { setTanggalMulai(nilai); setHalaman(1); }}
        onGantiTanggalSelesai={(nilai) => { setTanggalSelesai(nilai); setHalaman(1); }}
        kataKunci={kataKunci}
        onGantiKataKunci={(nilai) => { setKataKunci(nilai); setHalaman(1); }}
        onCari={() => void muatData()}
        placeholderCari="No. Rawat, No. RM, Pasien, Kamar, Bangsal..."
        filterTambahan={filterTambahan}
        onSemua={resetFilter}
        onCetak={() => tampilkanToast("Cetak laporan rawat inap belum tersedia di Khanza Web.", "info")}
        tombolTambahan={tombolTambahan}
        labelKembali="Keluar"
        pagination={
          <>
            <span>{data.length} dari {totalData} rawat inap · Halaman {halaman} / {Math.max(1, Math.ceil(totalData / 100))}</span>
            <button type="button" disabled={memuat || halaman <= 1} onClick={() => { setBarisTerpilih(""); setDataTerpilih(null); setHalaman((page) => page - 1); }} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman sebelumnya" title="Halaman sebelumnya"><FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" aria-hidden="true" /></button>
            <button type="button" disabled={memuat || halaman * 100 >= totalData} onClick={() => { setBarisTerpilih(""); setDataTerpilih(null); setHalaman((page) => page + 1); }} className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 disabled:opacity-50" aria-label="Halaman berikutnya" title="Halaman berikutnya"><FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" aria-hidden="true" /></button>
          </>
        }
        tampilkanRecord={false}
      />

      <MenuKonteksRawatInap
        terbuka={menuKonteks !== null}
        x={menuKonteks?.x || 0}
        y={menuKonteks?.y || 0}
        baris={menuKonteks?.baris || null}
        onPilih={pilihMenuKonteks}
        onTutup={() => setMenuKonteks(null)}
      />

      {dialogPulang && (
        <DialogPulangRawatInap
          key={`pulang-${dialogPulang.no_rawat}-${dialogPulang.tgl_masuk}-${dialogPulang.jam_masuk}`}
          baris={dialogPulang}
          padaTutup={() => setDialogPulang(null)}
          padaSukses={tanganiSuksesPulang}
        />
      )}
      {dialogPindah && (
        <DialogPindahKamarRawatInap
          key={`pindah-${dialogPindah.no_rawat}-${dialogPindah.tgl_masuk}-${dialogPindah.jam_masuk}`}
          baris={dialogPindah}
          padaTutup={() => setDialogPindah(null)}
          padaSukses={tanganiSuksesPindah}
        />
      )}
      {dialogLanjutan === "mati" && hasilPulang && (
        <DialogPasienMati
          hasil={hasilPulang}
          padaTutup={() => setDialogLanjutan(null)}
          padaSukses={tanganiSuksesLanjutan}
        />
      )}
      {dialogLanjutan === "rujuk" && hasilPulang && (
        <DialogRujuk
          hasil={hasilPulang}
          padaTutup={() => setDialogLanjutan(null)}
          padaSukses={tanganiSuksesLanjutan}
        />
      )}

      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

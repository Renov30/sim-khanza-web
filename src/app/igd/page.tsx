"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { MenuKonteksIgd } from "@/components/modul/MenuKonteksIgd";
import {
  tentukanAksiMenu,
  type BarisMenuKonteks,
  type FilterSepIgd,
  type ItemMenuKonteks,
} from "@/components/modul/menu-konteks-igd-data";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";

interface IgdRow extends BarisMenuKonteks {
  p_jawab: string;
  jk: string;
  umurdaftar: string | number;
  sttsumur: string;
  biaya_reg: string | number;
  stts_daftar: string;
  status_bayar: string;
  status_lanjut: string;
}

const kunciBaris = (item: IgdRow) => `${item.no_rawat}-${item.tgl_registrasi}-${item.jam_reg}`;

function warnaStatus(status: string) {
  if (status === "Sudah") return "border border-secondary-300 bg-secondary-100 text-secondary-800";
  if (["Batal", "Meninggal", "Pulang Paksa"].includes(status)) return "border border-red-200 bg-red-50 text-red-700";
  if (["Dirujuk", "Dirawat"].includes(status)) return "border border-primary-200 bg-primary-50 text-primary-700";
  return "border border-slate-200 bg-slate-100 text-slate-700";
}

export default function HalamanIGD() {
  const router = useRouter();
  const hariIni = useMemo(() => registrationDate(), []);

  const [data, setData] = useState<IgdRow[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [memuat, setMemuat] = useState(true);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [statusPeriksa, setStatusPeriksa] = useState("Semua");
  const [filterSep, setFilterSep] = useState<FilterSepIgd>("Semua");
  const [versiTabel, setVersiTabel] = useState(0);
  const [menuKonteks, setMenuKonteks] = useState<{ x: number; y: number; baris: IgdRow } | null>(null);
  const [barisTerpilih, setBarisTerpilih] = useState("");
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const permintaanTabel = useRef<AbortController | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const muatData = useCallback(async () => {
    permintaanTabel.current?.abort();
    const controller = new AbortController();
    permintaanTabel.current = controller;
    setMemuat(true);
    try {
      const url = new URL("/api/igd", window.location.origin);
      url.searchParams.set("tanggal_mulai", tanggalMulai);
      url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("limit", "100");
      if (kataKunciFilter) url.searchParams.set("cari", kataKunciFilter);
      if (statusPeriksa !== "Semua") url.searchParams.set("stts", statusPeriksa);
      if (filterSep !== "Semua") url.searchParams.set("sep", filterSep);

      const res = await fetch(url.toString(), { signal: controller.signal, cache: "no-store" });
      const json = await res.json();
      if (controller.signal.aborted) return;
      if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat data IGD");
      setData(json.data || []);
      setTotalData(Number(json.total) || 0);
    } catch (error) {
      if (!controller.signal.aborted) {
        tampilkanToast(error instanceof Error ? error.message : "Gagal memuat data IGD", "error");
      }
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai, kataKunciFilter, statusPeriksa, filterSep, tampilkanToast]);

  useEffect(() => {
    const berikutnya = kataKunci.trim();
    if (berikutnya === kataKunciFilter) return;
    if (berikutnya.length > 0 && berikutnya.length <= 2) return;
    const timer = window.setTimeout(() => setKataKunciFilter(berikutnya), 300);
    return () => window.clearTimeout(timer);
  }, [kataKunci, kataKunciFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void muatData(); }, 0);
    return () => {
      window.clearTimeout(timer);
      permintaanTabel.current?.abort();
    };
  }, [muatData, versiTabel]);

  const cariSekarang = useCallback(() => {
    setKataKunciFilter(kataKunci.trim());
    setBarisTerpilih("");
    setVersiTabel((versi) => versi + 1);
  }, [kataKunci]);

  const resetFilter = useCallback(() => {
    setKataKunci("");
    setKataKunciFilter("");
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setStatusPeriksa("Semua");
    setFilterSep("Semua");
    setBarisTerpilih("");
    setMenuKonteks(null);
    setVersiTabel((versi) => versi + 1);
  }, [hariIni]);

  const bukaMenuKonteks = useCallback((event: ReactMouseEvent<HTMLTableRowElement>, baris: IgdRow) => {
    event.preventDefault();
    setBarisTerpilih(kunciBaris(baris));
    setMenuKonteks({ x: event.clientX, y: event.clientY, baris });
  }, []);

  const bukaMenuKonteksDariKeyboard = useCallback((event: ReactKeyboardEvent<HTMLTableRowElement>, baris: IgdRow) => {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    const batas = event.currentTarget.getBoundingClientRect();
    setBarisTerpilih(kunciBaris(baris));
    setMenuKonteks({ x: batas.left + 16, y: batas.top + 16, baris });
  }, []);

  const pilihMenuKonteks = useCallback((item: ItemMenuKonteks) => {
    const konteks = menuKonteks;
    setMenuKonteks(null);
    if (!konteks) return;
    const aksi = tentukanAksiMenu(item, konteks.baris);
    if (aksi.jenis === "rute") {
      router.push(aksi.rute);
      return;
    }
    if (aksi.jenis === "filter") {
      setFilterSep(aksi.nilai);
      setBarisTerpilih("");
      return;
    }
    tampilkanToast(`${aksi.label} untuk ${konteks.baris.no_rawat} belum tersedia di Khanza Web.`, "info");
  }, [menuKonteks, router, tampilkanToast]);

  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-2">
      <label className="flex items-center gap-1.5 whitespace-nowrap text-slate-700" htmlFor="filter-status-periksa-igd">
        <span>Status :</span>
        <CustomSelect
          id="filter-status-periksa-igd"
          value={statusPeriksa}
          onChange={(event) => setStatusPeriksa(event.target.value)}
          className="h-7 w-32"
          containerClassName="w-32"
        >
          <option value="Semua">Semua</option>
          <option value="Belum">Belum</option>
          <option value="Sudah">Sudah</option>
          <option value="Batal">Batal</option>
        </CustomSelect>
      </label>
      <label className="flex items-center gap-1.5 whitespace-nowrap text-slate-700" htmlFor="filter-sep-igd">
        <span>SEP :</span>
        <CustomSelect
          id="filter-sep-igd"
          value={filterSep}
          onChange={(event) => setFilterSep(event.target.value as FilterSepIgd)}
          className="h-7 w-36"
          containerClassName="w-36"
        >
          <option value="Semua">Semua</option>
          <option value="Belum">Belum Terbit</option>
          <option value="Sudah">Sudah Terbit</option>
        </CustomSelect>
      </label>
    </div>
  );

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[1180px] border-collapse text-[11px]">
            <caption className="sr-only">Daftar kunjungan IGD periode {tanggalMulai} sampai {tanggalSelesai}</caption>
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">No. Reg</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">No. Rawat</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Waktu Masuk</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">No. RM</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 min-w-[160px]">Nama Pasien</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">JK</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Umur</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 min-w-[160px]">Dokter Jaga</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2">Penanggung Jawab</th>
                <th scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-center">Status Lanjut</th>
                <th scope="col" className="border-b border-slate-200 px-2 py-2 text-center">Status Periksa</th>
              </tr>
            </thead>
            <tbody>
              {memuat ? (
                <tr>
                  <td colSpan={11} className="px-2 py-12 text-center text-slate-400">Memuat data pasien IGD...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-2 py-12 text-center text-slate-500">
                    <FontAwesomeIcon icon={faTruckMedical} className="mb-2 h-8 w-8 text-slate-300" aria-hidden="true" />
                    <p>Tidak ada kunjungan IGD pada periode ini</p>
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const kunci = kunciBaris(item);
                  return (
                    <tr
                      key={kunci}
                      tabIndex={0}
                      aria-selected={barisTerpilih === kunci}
                      onClick={() => setBarisTerpilih(kunci)}
                      onContextMenu={(event) => bukaMenuKonteks(event, item)}
                      onKeyDown={(event) => bukaMenuKonteksDariKeyboard(event, item)}
                      className={`border-b border-slate-100 text-slate-700 outline-none focus-visible:bg-primary-50/60 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-600 ${barisTerpilih === kunci ? "bg-primary-50/60" : "even:bg-slate-50/70 hover:bg-slate-50"}`}
                    >
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center font-mono text-slate-800">{item.no_reg}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rawat}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-600">
                        {item.tgl_registrasi} <span className="text-slate-500">{item.jam_reg}</span>
                      </td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rkm_medis}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-slate-800">{item.nm_pasien}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center text-slate-600">{item.jk}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-slate-600">{item.umurdaftar} {item.sttsumur}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-slate-700">{item.nm_dokter}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 font-sans text-[10px] text-slate-600">{item.p_jawab || "-"}</td>
                      <td className="border-r border-slate-100 px-2 py-1.5 text-center text-slate-700">{item.status_lanjut || "-"}</td>
                      <td className="px-2 py-1.5 text-center">
                        <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${warnaStatus(item.stts)}`}>{item.stts}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        memuat={memuat}
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={setTanggalMulai}
        onGantiTanggalSelesai={setTanggalSelesai}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={cariSekarang}
        onSemua={resetFilter}
        placeholderCari="No. Rawat, No. RM, Pasien, Dokter..."
        filterTambahan={filterTambahan}
        jumlahRecord={totalData}
      />

      <MenuKonteksIgd
        terbuka={menuKonteks !== null}
        x={menuKonteks?.x || 0}
        y={menuKonteks?.y || 0}
        baris={menuKonteks?.baris || null}
        onPilih={pilihMenuKonteks}
        onTutup={() => setMenuKonteks(null)}
      />
      <Toast
        message={toast?.pesan || null}
        tipe={toast?.tipe}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faFilePrescription,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { registrationDate } from "@/lib/registrasi/date";

interface HeaderNoResep {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: "ralan" | "ranap";
  jenis_bayar: string;
  tgl_resep: string;
  jam_resep: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
}

interface DetailNoResep {
  jenis_item: "Obat" | "Racikan" | "Bahan Racikan";
  no_racik: string;
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  harga: number | string;
  embalase: number | string;
  tuslah: number | string;
  total: number | string;
  aturan_pakai: string;
  keterangan: string;
}

interface DataNoResep {
  header: HeaderNoResep;
  detail: DetailNoResep[];
}

interface DaftarNoResep {
  items: DataNoResep[];
  total: number;
  page: number;
  limit: number;
}

const BATAS_DATA = 50;

function rupiah(nilai: number | string) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(Number(nilai) || 0);
}

function tanggalIndonesia(tanggal: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return tanggal || "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  return `${hari}-${bulan}-${tahun}`;
}

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function totalResep(resep: DataNoResep) {
  return resep.detail
    .filter((item) => item.jenis_item !== "Racikan")
    .reduce((jumlah, item) => jumlah + Number(item.total || 0), 0);
}

export default function HalamanNoResep() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();
  const nomorResepAwal = searchParams.get("no_resep")?.trim() || "";
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState(nomorResepAwal);
  const [filterKataKunci, setFilterKataKunci] = useState(nomorResepAwal);
  const [data, setData] = useState<DataNoResep[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [noResepTerpilih, setNoResepTerpilih] = useState<string | null>(null);
  const [noRawat, setNoRawat] = useState("");
  const [noRm, setNoRm] = useState("");
  const [namaPasien, setNamaPasien] = useState("");
  const [tanggalResep, setTanggalResep] = useState(hariIni);
  const [jamResep, setJamResep] = useState("00:00:00");
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [noResepForm, setNoResepForm] = useState("");
  const [kodeDokter, setKodeDokter] = useState("");
  const [namaDokter, setNamaDokter] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [versiData, setVersiData] = useState(0);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const jumlahHalaman = Math.max(1, Math.ceil(totalData / BATAS_DATA));
  const biayaDitampilkan = useMemo(
    () => data.reduce((jumlah, resep) => jumlah + totalResep(resep), 0),
    [data],
  );

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  useEffect(() => {
    if (!waktuOtomatis) return;
    const perbaruiWaktu = () => {
      setTanggalResep(registrationDate());
      setJamResep(jamJayapura());
    };
    perbaruiWaktu();
    const timer = window.setInterval(perbaruiWaktu, 1000);
    return () => window.clearInterval(timer);
  }, [waktuOtomatis]);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    if (!isAuthenticated) return;
    setMemuat(true);
    try {
      const url = new URL("/api/farmasi/no-resep", window.location.origin);
      url.searchParams.set("tanggal_mulai", tanggalMulai);
      url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", String(BATAS_DATA));
      if (filterKataKunci) url.searchParams.set("cari", filterKataKunci);
      const response = await fetch(url, { cache: "no-store", signal });
      const json: { success?: boolean; data?: DaftarNoResep; error?: string } = await response.json();
      if (!response.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal memuat daftar nomor resep.");
      }
      const daftar = json.data.items || [];
      setData(daftar);
      setTotalData(Number(json.data.total) || 0);
      setHalaman(Number(json.data.page) || 1);
      setNoResepTerpilih((aktif) => (
        aktif && daftar.some((resep) => resep.header.no_resep === aktif) ? aktif : null
      ));
    } catch (error) {
      if (signal?.aborted) return;
      setData([]);
      setTotalData(0);
      tampilkanToast(error instanceof Error ? error.message : "Gagal memuat daftar nomor resep.", "error");
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [filterKataKunci, halaman, isAuthenticated, tanggalMulai, tanggalSelesai, tampilkanToast]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => void muatData(controller.signal), 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, versiData]);

  const kosongkanForm = useCallback(() => {
    setNoResepTerpilih(null);
    setNoRawat("");
    setNoRm("");
    setNamaPasien("");
    setNoResepForm("");
    setKodeDokter("");
    setNamaDokter("");
    setTanggalResep(registrationDate());
    setJamResep(jamJayapura());
    setWaktuOtomatis(true);
  }, []);

  const pilihResep = (resep: DataNoResep) => {
    if (noResepTerpilih === resep.header.no_resep) {
      kosongkanForm();
      return;
    }
    setNoResepTerpilih(resep.header.no_resep);
    setNoRawat(resep.header.no_rawat);
    setNoRm(resep.header.no_rkm_medis);
    setNamaPasien(resep.header.nm_pasien);
    setTanggalResep(resep.header.tgl_resep);
    setJamResep(resep.header.jam_resep);
    setWaktuOtomatis(false);
    setNoResepForm(resep.header.no_resep);
    setKodeDokter(resep.header.kd_dokter);
    setNamaDokter(resep.header.nm_dokter);
  };

  const tanganiKeyboardBaris = (event: React.KeyboardEvent<HTMLTableRowElement>, resep: DataNoResep) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    pilihResep(resep);
  };

  const terapkanPencarian = () => {
    setFilterKataKunci(kataKunci.trim());
    setHalaman(1);
    kosongkanForm();
  };

  const tampilkanSemua = () => {
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setKataKunci("");
    setFilterKataKunci("");
    setHalaman(1);
    kosongkanForm();
    setVersiData((versi) => versi + 1);
  };

  const pagination = (
    <>
      <span>{data.length} dari {totalData} resep · Halaman {halaman} / {jumlahHalaman}</span>
      <button
        type="button"
        onClick={() => { setHalaman((nilai) => Math.max(1, nilai - 1)); kosongkanForm(); }}
        disabled={memuat || halaman <= 1}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman sebelumnya"
        title="Halaman sebelumnya"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => { setHalaman((nilai) => Math.min(jumlahHalaman, nilai + 1)); kosongkanForm(); }}
        disabled={memuat || halaman >= jumlahHalaman}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman berikutnya"
        title="Halaman berikutnya"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
      </button>
    </>
  );

  const kelasInput = "h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none";

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <PanelInputData judul="Input Data" idPenyimpanan="farmasi-no-resep">
        <GridFormulirModul className="gap-y-2" kolomAktifSama>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              <label htmlFor="no-rawat-no-resep" className="sm:text-right">No. Rawat :</label>
              <div className="flex min-w-0 flex-wrap gap-1.5">
                <input id="no-rawat-no-resep" readOnly value={noRawat} placeholder="No. rawat" className={`${kelasInput} w-40 font-mono`} />
                <input readOnly aria-label="Nomor rekam medis" value={noRm} placeholder="No. RM" className={`${kelasInput} w-24 font-mono`} />
                <input readOnly aria-label="Nama pasien" value={namaPasien} placeholder="Nama pasien" className={`${kelasInput} min-w-44 flex-1`} />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              <label htmlFor="tanggal-resep" className="sm:text-right">Tgl. Resep :</label>
              <div className="flex flex-wrap items-center gap-1.5">
                <input
                  id="tanggal-resep"
                  type="date"
                  value={tanggalResep}
                  onChange={(event) => { setTanggalResep(event.target.value); setWaktuOtomatis(false); }}
                  className={`${kelasInput} w-[8.5rem] bg-white tabular-nums`}
                />
                <input
                  aria-label="Jam resep"
                  type="time"
                  step="1"
                  value={jamResep}
                  onChange={(event) => { setJamResep(event.target.value); setWaktuOtomatis(false); }}
                  className={`${kelasInput} w-[7.5rem] bg-white font-mono tabular-nums`}
                />
                <label className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white text-primary-700 hover:bg-slate-100" title="Perbarui tanggal dan jam secara otomatis">
                  <input
                    type="checkbox"
                    checked={waktuOtomatis}
                    onChange={(event) => setWaktuOtomatis(event.target.checked)}
                    className="sr-only"
                    aria-label="Perbarui tanggal dan jam resep secara otomatis"
                  />
                  <FontAwesomeIcon icon={faClock} className="h-3.5 w-3.5" />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <label htmlFor="nomor-resep" className="sm:text-right">No. Resep :</label>
              <input id="nomor-resep" readOnly value={noResepForm} placeholder="Nomor resep" className={`${kelasInput} w-full max-w-52 font-mono`} />
            </div>
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <label htmlFor="dokter-peresep" className="sm:text-right">Dokter Peresep :</label>
              <div className="flex min-w-0 gap-1.5">
                <input readOnly aria-label="Kode dokter peresep" value={kodeDokter} placeholder="Kode" className={`${kelasInput} w-24 font-mono`} />
                <input id="dokter-peresep" readOnly value={namaDokter} placeholder="Nama dokter peresep" className={`${kelasInput} min-w-40 flex-1`} />
              </div>
            </div>
          </div>
        </GridFormulirModul>
      </PanelInputData>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
          <table className="w-full min-w-[64rem] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Daftar nomor resep dan rincian obat yang telah diberikan</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="w-32 border-b border-slate-200 px-2 py-2 text-center">No. Resep</th>
                <th scope="col" className="w-48 border-b border-slate-200 px-2 py-2 text-center">Tgl. Resep</th>
                <th scope="col" className="min-w-96 border-b border-slate-200 px-2 py-2 text-center">Pasien</th>
                <th scope="col" className="min-w-60 border-b border-slate-200 px-2 py-2 text-center">Dokter Peresep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memuat ? (
                <tr><td colSpan={4} className="h-36 border-0 text-center text-slate-500">Memuat daftar nomor resep...</td></tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="h-44 border-0 text-center text-slate-400">
                    <FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" />
                    <p>Tidak ada nomor resep pada filter yang dipilih.</p>
                  </td>
                </tr>
              ) : data.map((resep) => {
                const dipilih = noResepTerpilih === resep.header.no_resep;
                const kelasPilihan = dipilih ? "bg-primary-100" : "bg-white";
                const kelasBarisData = dipilih ? "bg-primary-100" : "bg-white hover:bg-slate-50/80";
                return (
                  <Fragment key={resep.header.no_resep}>
                    <tr
                      tabIndex={0}
                      aria-selected={dipilih}
                      onClick={() => pilihResep(resep)}
                      onKeyDown={(event) => tanganiKeyboardBaris(event, resep)}
                      className={`${kelasBarisData} cursor-pointer focus:outline focus:outline-2 focus:outline-inset focus:outline-primary-700`}
                    >
                      <td className="px-2 py-2 font-mono tabular-nums text-slate-800">{resep.header.no_resep}</td>
                      <td className="px-2 py-2 font-mono tabular-nums">{tanggalIndonesia(resep.header.tgl_resep)} {resep.header.jam_resep}</td>
                      <td className="px-2 py-2 text-slate-800">
                        <span className="font-mono tabular-nums">{resep.header.no_rawat} · {resep.header.no_rkm_medis}</span>
                        <span className="ml-1.5">{resep.header.nm_pasien}</span>
                      </td>
                      <td className="px-2 py-2">{resep.header.nm_dokter}</td>
                    </tr>
                    <tr onClick={() => pilihResep(resep)} className={`${dipilih ? "bg-primary-100" : "bg-slate-50"} cursor-pointer text-slate-600`}>
                      <td className="px-2 py-1.5" />
                      <th scope="row" className="px-2 py-1.5 text-left font-medium">Nama Obat</th>
                      <th scope="row" className="px-2 py-1.5 text-left font-medium">Jumlah × Harga + Embalase + Tuslah = Total</th>
                      <th scope="row" className="px-2 py-1.5 text-left font-medium">Aturan Pakai</th>
                    </tr>
                    {resep.detail.length === 0 ? (
                      <tr onClick={() => pilihResep(resep)} className={`${kelasPilihan} cursor-pointer`}>
                        <td className="px-2 py-1.5" />
                        <td colSpan={3} className="px-2 py-3 text-center text-slate-400">Rincian obat belum tersedia.</td>
                      </tr>
                    ) : resep.detail.map((item, indeks) => (
                      <tr
                        key={`${resep.header.no_resep}-${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`}
                        onClick={() => pilihResep(resep)}
                        className={`${kelasBarisData} cursor-pointer`}
                      >
                        <td className="px-2 py-1.5" />
                        <td className={`px-2 py-1.5 text-slate-800 ${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""}`}>
                          {item.jenis_item === "Bahan Racikan" ? "↳ " : ""}{item.nama_item}
                          {item.keterangan && <span className="block text-slate-500">{item.keterangan}</span>}
                        </td>
                        <td className="px-2 py-1.5 font-mono tabular-nums">
                          {item.jenis_item === "Racikan"
                            ? `${item.jumlah} ${item.satuan}`
                            : `${item.jumlah} × ${rupiah(item.harga)} + ${rupiah(item.embalase)} + ${rupiah(item.tuslah)} = ${rupiah(item.total)}`}
                        </td>
                        <td className="px-2 py-1.5">{item.aturan_pakai || "-"}</td>
                      </tr>
                    ))}
                    <tr onClick={() => pilihResep(resep)} className={`${dipilih ? "bg-primary-100" : "bg-slate-50"} cursor-pointer`}>
                      <td className="px-2 py-1.5" />
                      <td className="px-2 py-1.5 font-medium text-slate-700">Total Biaya Resep</td>
                      <td className="px-2 py-1.5 font-mono font-medium tabular-nums text-slate-800">Rp {rupiah(totalResep(resep))}</td>
                      <td className="px-2 py-1.5" />
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
            {data.length > 0 && !memuat && (
              <tfoot className="bg-slate-100 text-slate-800">
                <tr>
                  <td className="border-t border-slate-200 px-2 py-2 text-center font-medium">&gt;&gt;</td>
                  <th scope="row" className="border-t border-slate-200 px-2 py-2 text-left font-semibold">Jumlah Total Biaya Resep</th>
                  <td className="border-t border-slate-200 px-2 py-2 font-mono font-semibold tabular-nums">Rp {rupiah(biayaDitampilkan)}</td>
                  <td className="border-t border-slate-200 px-2 py-2" />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={(nilai) => { setTanggalMulai(nilai); setHalaman(1); kosongkanForm(); }}
        onGantiTanggalSelesai={(nilai) => { setTanggalSelesai(nilai); setHalaman(1); kosongkanForm(); }}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={terapkanPencarian}
        placeholderCari="No. resep, no. rawat, RM, pasien, dokter..."
        onBaru={kosongkanForm}
        onCetak={() => window.print()}
        disabledCetak={data.length === 0}
        onSemua={tampilkanSemua}
        jumlahRecord={totalData}
        pagination={pagination}
        memuat={memuat}
      />

      <span className="sr-only" aria-live="polite">
        {memuat ? "Memuat daftar nomor resep" : `${data.length} nomor resep ditampilkan`}
      </span>
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

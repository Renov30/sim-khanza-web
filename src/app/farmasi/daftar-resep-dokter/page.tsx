"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { ValidasiObatDialog } from "@/components/farmasi/ValidasiObatDialog";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { registrationDate } from "@/lib/registrasi/date";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClipboardCheck,
  faFilePrescription,
} from "@fortawesome/free-solid-svg-icons";

type JenisPerawatan = "ralan" | "ranap";
type TampilanData = "ringkasan" | "detail";
type StatusPelayanan = "Belum Terlayani" | "Sudah Terlayani";

interface ResepRingkasan {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: StatusPelayanan;
  kd_unit: string;
  nm_unit: string;
  jenis_bayar: string;
  tgl_validasi: string;
  jam_validasi: string;
  tgl_penyerahan: string;
  jam_penyerahan: string;
}

interface ResepDetail extends ResepRingkasan {
  jenis_item: "Nonracikan" | "Racikan" | "Bahan Racikan" | "Tanpa Item";
  kode_item: string;
  nama_item: string;
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
  no_racik: string;
}

type BarisResep = ResepRingkasan | ResepDetail;

interface ResepDenganDetail {
  ringkasan: ResepDetail;
  items: ResepDetail[];
}

const BATAS_DATA = 100;
const JENIS_PERAWATAN: JenisPerawatan[] = ["ralan", "ranap"];
const TAMPILAN_DATA: TampilanData[] = ["ringkasan", "detail"];

function adalahDetail(item: BarisResep): item is ResepDetail {
  return "jenis_item" in item;
}

function labelJenis(jenis: JenisPerawatan) {
  return jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap";
}

function labelTampilan(tampilan: TampilanData, jenis: JenisPerawatan) {
  return `${tampilan === "ringkasan" ? "Resep" : "Detail"} ${labelJenis(jenis)}`;
}

function kelompokkanDetail(data: BarisResep[]): ResepDenganDetail[] {
  const kelompok = new Map<string, ResepDenganDetail>();

  for (const item of data) {
    if (!adalahDetail(item)) continue;
    const resep = kelompok.get(item.no_resep);
    if (resep) {
      resep.items.push(item);
    } else {
      kelompok.set(item.no_resep, { ringkasan: item, items: [item] });
    }
  }

  return Array.from(kelompok.values());
}

export default function HalamanDaftarResepDokter() {
  const router = useRouter();
  const { hasPermission, isAuthenticated } = useAuth();
  const hariIni = registrationDate();
  const permintaanAktif = useRef<AbortController | null>(null);

  const [jenis, setJenis] = useState<JenisPerawatan>("ralan");
  const [tampilan, setTampilan] = useState<TampilanData>("ringkasan");
  const [data, setData] = useState<BarisResep[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [versiData, setVersiData] = useState(0);
  const [noResepTerpilih, setNoResepTerpilih] = useState<string | null>(null);
  const [noResepValidasi, setNoResepValidasi] = useState<string | null>(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [status, setStatus] = useState("Semua");
  const [dokter, setDokter] = useState("");
  const [unit, setUnit] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [filterTeks, setFilterTeks] = useState({ dokter: "", unit: "", kataKunci: "" });

  const jumlahHalaman = Math.max(1, Math.ceil(totalData / BATAS_DATA));
  const detailDikelompokkan = kelompokkanDetail(data);
  const resepTerpilih = noResepTerpilih
    ? data.find((item) => item.no_resep === noResepTerpilih) || null
    : null;

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    permintaanAktif.current?.abort();
    const controller = new AbortController();
    permintaanAktif.current = controller;
    setMemuat(true);

    try {
      const url = new URL("/api/farmasi/daftar-resep-dokter", window.location.origin);
      url.searchParams.set("jenis", jenis);
      url.searchParams.set("tampilan", tampilan);
      url.searchParams.set("tanggal_mulai", tanggalMulai);
      url.searchParams.set("tanggal_selesai", tanggalSelesai);
      url.searchParams.set("status", status);
      url.searchParams.set("page", String(halaman));
      url.searchParams.set("limit", String(BATAS_DATA));
      if (filterTeks.dokter) url.searchParams.set("dokter", filterTeks.dokter);
      if (filterTeks.unit) url.searchParams.set("unit", filterTeks.unit);
      if (filterTeks.kataKunci) url.searchParams.set("cari", filterTeks.kataKunci);

      const response = await fetch(url.toString(), {
        cache: "no-store",
        signal: controller.signal,
      });
      const json: {
        success: boolean;
        data?: BarisResep[];
        total?: number;
        page?: number;
        error?: string;
      } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat daftar resep dokter");
      if (controller.signal.aborted) return;

      const dataBerikutnya = json.data || [];
      setData(dataBerikutnya);
      setTotalData(Number(json.total) || 0);
      setHalaman(Number(json.page) || 1);
      setNoResepTerpilih((aktif) => (
        aktif && dataBerikutnya.some((item) => item.no_resep === aktif) ? aktif : null
      ));
    } catch (error) {
      if (!controller.signal.aborted) {
        setData([]);
        setTotalData(0);
        tampilkanToast(error instanceof Error ? error.message : "Gagal memuat daftar resep dokter", "error");
      }
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [filterTeks, halaman, isAuthenticated, jenis, status, tanggalMulai, tanggalSelesai, tampilan, tampilkanToast]);

  useEffect(() => {
    const timer = setTimeout(() => { void muatData(); }, 0);
    return () => {
      clearTimeout(timer);
      permintaanAktif.current?.abort();
    };
  }, [muatData, versiData]);

  const terapkanPencarian = () => {
    setFilterTeks({
      dokter: dokter.trim(),
      unit: unit.trim(),
      kataKunci: kataKunci.trim(),
    });
    setHalaman(1);
    setNoResepTerpilih(null);
  };

  const resetFilter = () => {
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setStatus("Semua");
    setDokter("");
    setUnit("");
    setKataKunci("");
    setFilterTeks({ dokter: "", unit: "", kataKunci: "" });
    setHalaman(1);
    setNoResepTerpilih(null);
    setVersiData((nilai) => nilai + 1);
  };

  const gantiJenis = (nilai: JenisPerawatan) => {
    setJenis(nilai);
    setHalaman(1);
    setNoResepTerpilih(null);
  };

  const gantiTampilan = (nilai: TampilanData) => {
    setTampilan(nilai);
    setHalaman(1);
    setNoResepTerpilih(null);
  };

  const pilihResep = (noResep: string) => {
    setNoResepTerpilih((aktif) => aktif === noResep ? null : noResep);
  };

  const bukaValidasi = () => {
    if (!hasPermission("beri_obat")) {
      tampilkanToast("Akses validasi obat tidak diizinkan.", "error");
      return;
    }
    if (tampilan !== "ringkasan") {
      tampilkanToast("Buka tab daftar resep untuk melakukan validasi.", "info");
      return;
    }
    if (!resepTerpilih) {
      tampilkanToast("Pilih resep dokter yang akan divalidasi.", "info");
      return;
    }
    if (resepTerpilih.status_pelayanan === "Sudah Terlayani") {
      tampilkanToast(`Resep ${resepTerpilih.no_resep} sudah tervalidasi.`, "info");
      return;
    }
    setNoResepValidasi(resepTerpilih.no_resep);
  };

  const selesaikanValidasi = () => {
    if (!noResepValidasi) return;
    const resepSelesai = noResepValidasi;
    setNoResepValidasi(null);
    setNoResepTerpilih(null);
    setVersiData((nilai) => nilai + 1);
    router.push(`/farmasi/daftar-obat-telah-tervalidasi?no_resep=${encodeURIComponent(resepSelesai)}`);
  };

  const navigasiTab = <T extends string>(
    event: React.KeyboardEvent<HTMLButtonElement>,
    daftar: T[],
    aktif: T,
    prefixId: string,
    ubah: (nilai: T) => void,
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const indeks = daftar.indexOf(aktif);
    const tujuan = event.key === "Home"
      ? daftar[0]
      : event.key === "End"
        ? daftar[daftar.length - 1]
        : daftar[(indeks + (event.key === "ArrowRight" ? 1 : -1) + daftar.length) % daftar.length];
    ubah(tujuan);
    document.getElementById(`${prefixId}-${tujuan}`)?.focus();
  };

  const kelasBaris = (item: BarisResep) => {
    if (noResepTerpilih === item.no_resep) return "bg-primary-100";
    if (adalahDetail(item) && item.jenis_item === "Bahan Racikan") return "bg-white text-slate-600";
    return "bg-white";
  };

  const pagination = (
    <>
      <span>
        {tampilan === "detail" ? detailDikelompokkan.length : data.length} dari {totalData} resep · Halaman {halaman} / {jumlahHalaman}
      </span>
      <button
        type="button"
        onClick={() => setHalaman((nilai) => Math.max(1, nilai - 1))}
        disabled={memuat || halaman <= 1}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman sebelumnya"
        title="Halaman sebelumnya"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => setHalaman((nilai) => Math.min(jumlahHalaman, nilai + 1))}
        disabled={memuat || halaman >= jumlahHalaman}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman berikutnya"
        title="Halaman berikutnya"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
      </button>
    </>
  );

  if (noResepValidasi) {
    return (
      <ValidasiObatDialog
        noResep={noResepValidasi}
        tampilan="halaman"
        onValidated={selesaikanValidasi}
        onClose={() => setNoResepValidasi(null)}
      />
    );
  }

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div role="tablist" aria-label="Jenis perawatan resep" className="flex shrink-0 border-b border-slate-200">
        {JENIS_PERAWATAN.map((item) => (
          <button
            key={item}
            id={`tab-perawatan-${item}`}
            type="button"
            role="tab"
            aria-selected={jenis === item}
            aria-controls={`panel-perawatan-${item}`}
            tabIndex={jenis === item ? 0 : -1}
            onClick={() => gantiJenis(item)}
            onKeyDown={(event) => navigasiTab(event, JENIS_PERAWATAN, jenis, "tab-perawatan", gantiJenis)}
            className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${jenis === item ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {labelJenis(item)}
          </button>
        ))}
      </div>

      <section
        id={`panel-perawatan-${jenis}`}
        role="tabpanel"
        aria-labelledby={`tab-perawatan-${jenis}`}
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm"
      >
        <div role="tablist" aria-label={`Tampilan resep ${labelJenis(jenis).toLowerCase()}`} className="flex shrink-0 border-b border-slate-200 px-2">
          {TAMPILAN_DATA.map((item) => (
            <button
              key={item}
              id={`tab-tampilan-${item}`}
              type="button"
              role="tab"
              aria-selected={tampilan === item}
              aria-controls={`panel-tampilan-${item}`}
              tabIndex={tampilan === item ? 0 : -1}
              onClick={() => gantiTampilan(item)}
              onKeyDown={(event) => navigasiTab(event, TAMPILAN_DATA, tampilan, "tab-tampilan", gantiTampilan)}
              className={`border-b-2 px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tampilan === item ? "border-primary-700 text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {labelTampilan(item, jenis)}
            </button>
          ))}
        </div>

        <div
          id={`panel-tampilan-${tampilan}`}
          role="tabpanel"
          aria-labelledby={`tab-tampilan-${tampilan}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto"
          aria-busy={memuat}
        >
          {tampilan === "ringkasan" ? (
            <table className="min-w-[118rem] w-full border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Daftar resep dokter {labelJenis(jenis).toLowerCase()}.</caption>
              <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/95 text-slate-700 shadow-2xs">
                <tr>
                  <th scope="col" className="w-28 whitespace-nowrap px-2.5 py-2 text-center">No. Resep</th>
                  <th scope="col" className="w-28 whitespace-nowrap px-2.5 py-2 text-center">Tgl. Peresepan</th>
                  <th scope="col" className="w-24 whitespace-nowrap px-2.5 py-2 text-center">Jam Peresepan</th>
                  <th scope="col" className="w-32 whitespace-nowrap px-2.5 py-2 text-center">No. Rawat</th>
                  <th scope="col" className="w-24 whitespace-nowrap px-2.5 py-2 text-center">No. RM</th>
                  <th scope="col" className="min-w-52 px-2.5 py-2">Pasien</th>
                  <th scope="col" className="min-w-52 px-2.5 py-2">Dokter Peresep</th>
                  <th scope="col" className="w-32 whitespace-nowrap px-2.5 py-2 text-center">Status</th>
                  <th scope="col" className="min-w-40 px-2.5 py-2">{jenis === "ralan" ? "Poli/Unit" : "Ruang/Kamar"}</th>
                  <th scope="col" className="min-w-36 px-2.5 py-2">Jenis Bayar</th>
                  <th scope="col" className="w-28 whitespace-nowrap px-2.5 py-2 text-center">Tgl. Validasi</th>
                  <th scope="col" className="w-24 whitespace-nowrap px-2.5 py-2 text-center">Jam Validasi</th>
                  {jenis === "ralan" && <th scope="col" className="w-28 whitespace-nowrap px-2.5 py-2 text-center">Tgl. Penyerahan</th>}
                  {jenis === "ralan" && <th scope="col" className="w-28 whitespace-nowrap px-2.5 py-2 text-center">Jam Penyerahan</th>}
                </tr>
              </thead>
              <tbody>
                {memuat ? (
                  <tr><td colSpan={jenis === "ralan" ? 14 : 12} className="h-36 px-3 text-center text-slate-500">Memuat daftar resep dokter...</td></tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={jenis === "ralan" ? 14 : 12} className="h-44 px-3 text-center text-slate-500">
                      <FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" />
                      <p>Tidak ada resep pada filter yang dipilih.</p>
                    </td>
                  </tr>
                ) : data.map((item, indeks) => (
                  <tr
                    key={`${item.no_resep}-${item.no_rawat}-${item.kd_dokter}-${indeks}`}
                    onClick={() => pilihResep(item.no_resep)}
                    aria-selected={noResepTerpilih === item.no_resep}
                    className={`${kelasBaris(item)} cursor-pointer border-b border-slate-100 ${noResepTerpilih === item.no_resep ? "" : "hover:bg-slate-100"}`}
                  >
                    <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums text-slate-800">{item.no_resep}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center tabular-nums">{item.tgl_peresepan}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums">{item.jam_peresepan}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums">{item.no_rawat}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums">{item.no_rkm_medis}</td>
                    <td className="max-w-64 truncate px-2.5 py-2 text-slate-800" title={item.nm_pasien}>{item.nm_pasien}</td>
                    <td className="max-w-64 truncate px-2.5 py-2" title={item.nm_dokter}>{item.nm_dokter}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${item.status_pelayanan === "Sudah Terlayani" ? "bg-secondary-100 text-secondary-800" : "bg-slate-100 text-slate-700"}`}>
                        {item.status_pelayanan}
                      </span>
                    </td>
                    <td className="max-w-52 truncate px-2.5 py-2" title={item.nm_unit}>{item.nm_unit}</td>
                    <td className="max-w-48 truncate px-2.5 py-2" title={item.jenis_bayar}>{item.jenis_bayar}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center tabular-nums">{item.tgl_validasi || "-"}</td>
                    <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums">{item.jam_validasi || "-"}</td>
                    {jenis === "ralan" && <td className="whitespace-nowrap px-2.5 py-2 text-center tabular-nums">{item.tgl_penyerahan || "-"}</td>}
                    {jenis === "ralan" && <td className="whitespace-nowrap px-2.5 py-2 text-center font-mono tabular-nums">{item.jam_penyerahan || "-"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[78rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Rincian obat resep dokter {labelJenis(jenis).toLowerCase()}.</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-28 border-b border-slate-200 px-2 py-2 text-center">No. Resep</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2 text-center">Tgl. Resep</th>
                  <th scope="col" className="w-20 border-b border-slate-200 px-2 py-2 text-center">Jam Resep</th>
                  <th scope="col" className="w-36 border-b border-slate-200 px-2 py-2 text-center">No. Rawat</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2 text-center">No. RM</th>
                  <th scope="col" className="min-w-56 border-b border-slate-200 px-2 py-2 text-center">Pasien</th>
                  <th scope="col" className="min-w-52 border-b border-slate-200 px-2 py-2 text-center">Dokter Peresep</th>
                  <th scope="col" className="min-w-40 border-b border-slate-200 px-2 py-2 text-center">{jenis === "ralan" ? "Poli/Unit" : "Ruang/Kamar"}</th>
                  <th scope="col" className="w-32 border-b border-slate-200 px-2 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {memuat ? (
                  <tr><td colSpan={9} className="h-36 border-0 px-3 text-center text-slate-500">Memuat rincian resep dokter...</td></tr>
                ) : detailDikelompokkan.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="h-44 border-0 px-3 text-center text-slate-500">
                      <FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" />
                      <p>Tidak ada rincian resep pada filter yang dipilih.</p>
                    </td>
                  </tr>
                ) : detailDikelompokkan.map((resep) => (
                  <FragmentDetailResep
                    key={resep.ringkasan.no_resep}
                    resep={resep}
                    dipilih={noResepTerpilih === resep.ringkasan.no_resep}
                    onPilih={() => pilihResep(resep.ringkasan.no_resep)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        filterUtama={(
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="flex min-w-0 items-center gap-2">
              <span className="w-24 shrink-0 text-right text-xs text-slate-700">Dokter :</span>
              <input
                type="search"
                value={dokter}
                onChange={(event) => setDokter(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") terapkanPencarian(); }}
                placeholder="Nama dokter peresep"
                className="h-7 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
              />
            </label>
            <label className="flex min-w-0 items-center gap-2">
              <span className="w-24 shrink-0 text-right text-xs text-slate-700">{jenis === "ralan" ? "Poli/Unit :" : "Ruang/Kamar :"}</span>
              <input
                type="search"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") terapkanPencarian(); }}
                placeholder={jenis === "ralan" ? "Nama poliklinik atau unit" : "Nama ruang atau kamar"}
                className="h-7 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
              />
            </label>
          </div>
        )}
        tanggalMulai={tanggalMulai}
        tanggalSelesai={tanggalSelesai}
        onGantiTanggalMulai={(nilai) => { setTanggalMulai(nilai); setHalaman(1); }}
        onGantiTanggalSelesai={(nilai) => { setTanggalSelesai(nilai); setHalaman(1); }}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={terapkanPencarian}
        placeholderCari="No. resep, no. rawat, RM, pasien, dokter..."
        filterTambahan={(
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap text-xs text-slate-700">Status :</span>
            <CustomSelect
              value={status}
              onChange={(event) => { setStatus(event.target.value); setHalaman(1); }}
              containerClassName="relative w-40"
              className="h-7 rounded-md py-0"
              aria-label="Status pelayanan resep"
              options={[
                { value: "Semua", label: "Semua" },
                { value: "Belum Terlayani", label: "Belum Terlayani" },
                { value: "Sudah Terlayani", label: "Sudah Terlayani" },
              ]}
            />
          </div>
        )}
        onCetak={() => { cetakTabelDomJasper("Laporan Daftar Resep Dokter"); }}
        tombolTambahan={[
          {
            label: "Validasi",
            ikon: faClipboardCheck,
            onClick: bukaValidasi,
            disabled: !hasPermission("beri_obat") || tampilan !== "ringkasan" || !resepTerpilih || resepTerpilih.status_pelayanan === "Sudah Terlayani",
            varian: "primer",
            tooltip: "Buka halaman validasi obat",
          },
        ]}
        onSemua={resetFilter}
        jumlahRecord={totalData}
        tampilkanRecord={false}
        pagination={pagination}
        memuat={memuat}
      />

      <span className="sr-only" aria-live="polite">
        {memuat ? "Memuat data resep" : `${totalData} resep ditemukan`}
      </span>
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

function FragmentDetailResep({ resep, dipilih, onPilih }: {
  resep: ResepDenganDetail;
  dipilih: boolean;
  onPilih: () => void;
}) {
  const ringkasan = resep.ringkasan;
  const kelasPilihan = dipilih ? "bg-primary-100" : "bg-white";

  return (
    <>
      <tr
        onClick={onPilih}
        aria-selected={dipilih}
        className={`cursor-pointer ${dipilih ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}`}
      >
        <td className="border-b border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums text-slate-800">{ringkasan.no_resep}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center tabular-nums">{ringkasan.tgl_peresepan}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{ringkasan.jam_peresepan}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{ringkasan.no_rawat}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{ringkasan.no_rkm_medis}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-slate-800">{ringkasan.nm_pasien}</td>
        <td className="border-b border-slate-100 px-2 py-1.5">{ringkasan.nm_dokter}</td>
        <td className="border-b border-slate-100 px-2 py-1.5">{ringkasan.nm_unit}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center">
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${ringkasan.status_pelayanan === "Sudah Terlayani" ? "bg-secondary-100 text-secondary-800" : "bg-slate-100 text-slate-700"}`}>
            {ringkasan.status_pelayanan}
          </span>
        </td>
      </tr>
      <tr className={dipilih ? "bg-primary-100" : "bg-slate-100/70"}>
        <td className="border-b border-slate-100" />
        <td className="border-b border-slate-100" />
        <th scope="col" className="border-b border-slate-100 px-2 py-1 text-center font-semibold">Jumlah</th>
        <th scope="col" className="border-b border-slate-100 px-2 py-1 text-center font-semibold">Satuan</th>
        <th scope="col" className="border-b border-slate-100 px-2 py-1 text-left font-semibold">Aturan Pakai</th>
        <th scope="col" className="border-b border-slate-100 px-2 py-1 text-center font-semibold">Kode / No.</th>
        <th scope="col" colSpan={2} className="border-b border-slate-100 px-2 py-1 text-left font-semibold">Nama Obat / Racikan</th>
        <th scope="col" className="border-b border-slate-100 px-2 py-1 text-center font-semibold">Jenis</th>
      </tr>
      {resep.items.map((item, indeks) => (
        <tr
          key={`${item.no_resep}-${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`}
          onClick={onPilih}
          aria-selected={dipilih}
          className={`cursor-pointer ${kelasPilihan} ${dipilih ? "" : "hover:bg-slate-50/80"}`}
        >
          <td className="border-b border-slate-100" />
          <td className="border-b border-slate-100" />
          <td className={`${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""} border-b border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums`}>{item.jumlah || "-"}</td>
          <td className="border-b border-slate-100 px-2 py-1.5 text-center">{item.satuan || "-"}</td>
          <td className="border-b border-slate-100 px-2 py-1.5">{item.aturan_pakai || "-"}</td>
          <td className={`${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""} border-b border-slate-100 px-2 py-1.5 text-center font-mono`}>{item.kode_item || "-"}</td>
          <td colSpan={2} className="border-b border-slate-100 px-2 py-1.5 text-slate-800">
            {item.nama_item}
            {item.keterangan && <span className="block text-slate-500">{item.keterangan}</span>}
          </td>
          <td className="border-b border-slate-100 px-2 py-1.5 text-center text-slate-500">{item.jenis_item}</td>
        </tr>
      ))}
    </>
  );
}

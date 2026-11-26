"use client";

import { Fragment, useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCircleCheck,
  faFlaskVial,
  faList,
  faPenToSquare,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { PanelBawah, type TombolAksiCustom } from "@/components/modul/PanelBawah";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";

type TabPeriksa = "data" | "item" | "detail";
type TipeToast = "info" | "sukses" | "error";

type ItemPeriksa = {
  id_template: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
  pemeriksaan: string;
  method: string;
  nilai: string;
  satuan: string;
  nilai_rujukan: string;
  keterangan: string;
  biaya: string;
  biaya_item: string;
};

type KunjunganPeriksa = {
  kunci: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  status: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  jenis_ruang: string;
  ruang: string;
  nip: string;
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  noorder: string;
  biaya: string;
  biaya_kunjungan: number;
  saran: string;
  kesan: string;
  item: ItemPeriksa[];
};

type DetailPasien = {
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  kunjungan: KunjunganPeriksa[];
};

type RingkasanDetail = {
  jumlah_pasien: number;
  jumlah_kunjungan: number;
  jumlah_pemeriksaan: number;
  jumlah_sub_pemeriksaan: number;
};

type PilihanPeriksa = {
  kunci: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
};

type BarisItem = Record<string, unknown>;

const TAB: readonly TabPeriksa[] = ["data", "item", "detail"];
const LABEL_TAB: Record<TabPeriksa, string> = {
  data: "Data Pemeriksaan",
  item: "Item Pemeriksaan",
  detail: "Detail Kunjungan",
};

const KOLOM_ITEM: { label: string; isi: (baris: BarisItem) => ReactNode; kelas?: string }[] = [
  { label: "No.Rawat", isi: (baris) => teks(baris.no_rawat), kelas: "font-mono text-slate-800" },
  { label: "Pasien", isi: (baris) => <><span className="font-mono text-slate-500">{teks(baris.no_rkm_medis)}</span> {teks(baris.nm_pasien)} <span className="text-slate-500">({teks(baris.png_jawab) || "-"})</span></>, kelas: "min-w-[12rem]" },
  { label: "Tgl.Periksa", isi: (baris) => teks(baris.tgl_periksa), kelas: "font-mono" },
  { label: "Jam", isi: (baris) => teks(baris.jam), kelas: "font-mono" },
  { label: "Pemeriksaan", isi: (baris) => teks(baris.nm_perawatan) },
  { label: "Item Pemeriksaan", isi: (baris) => teks(baris.pemeriksaan) },
  { label: "Hasil", isi: (baris) => teks(baris.nilai) || "-", kelas: "font-mono text-slate-800" },
  { label: "Satuan", isi: (baris) => teks(baris.satuan) || "-" },
  { label: "Nilai Rujukan", isi: (baris) => teks(baris.nilai_rujukan) || "-" },
  { label: "Keterangan", isi: (baris) => teks(baris.keterangan) || "-" },
  { label: "Ruang", isi: (baris) => teks(baris.ruang) || "-" },
  { label: "Petugas", isi: (baris) => teks(baris.nm_petugas) || "-" },
  { label: "Dokter Perujuk", isi: (baris) => teks(baris.dokter_perujuk) || "-" },
  { label: "Penanggung Jawab", isi: (baris) => teks(baris.penanggung_jawab) || "-" },
  { label: "Metode", isi: (baris) => teks(baris.method) || "-" },
];

function teks(nilai: unknown): string {
  return nilai === null || nilai === undefined ? "" : String(nilai);
}

function formatAngka(nilai: unknown): string {
  const angka = Number(nilai);
  return Number.isFinite(angka) ? angka.toLocaleString("id-ID") : "0";
}

function kunciTab(
  event: KeyboardEvent<HTMLButtonElement>,
  aktif: TabPeriksa,
  atur: (nilai: TabPeriksa) => void,
) {
  const indeks = TAB.indexOf(aktif);
  let berikut = indeks;
  if (event.key === "ArrowRight") berikut = (indeks + 1) % TAB.length;
  else if (event.key === "ArrowLeft") berikut = (indeks - 1 + TAB.length) % TAB.length;
  else if (event.key === "Home") berikut = 0;
  else if (event.key === "End") berikut = TAB.length - 1;
  else return;
  event.preventDefault();
  atur(TAB[berikut]);
  window.requestAnimationFrame(() => {
    document.getElementById(`tab-periksa-${TAB[berikut]}`)?.focus();
  });
}

export default function HalamanPeriksaLabPK() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noRawatAwal = searchParams.get("no_rawat")?.trim() || "";
  const [tab, setTab] = useState<TabPeriksa>("data");
  const [dataKunjungan, setDataKunjungan] = useState<KunjunganPeriksa[]>([]);
  const [dataItem, setDataItem] = useState<BarisItem[]>([]);
  const [dataDetail, setDataDetail] = useState<{ pasien: DetailPasien[]; ringkasan: RingkasanDetail }>({
    pasien: [],
    ringkasan: { jumlah_pasien: 0, jumlah_kunjungan: 0, jumlah_pemeriksaan: 0, jumlah_sub_pemeriksaan: 0 },
  });
  const [memuat, setMemuat] = useState(true);
  const [noRawat, setNoRawat] = useState(noRawatAwal);
  const [tanggalMulai, setTanggalMulai] = useState(noRawatAwal ? "" : registrationDate());
  const [tanggalSelesai, setTanggalSelesai] = useState(noRawatAwal ? "" : registrationDate());
  const [noRm, setNoRm] = useState("");
  const [nip, setNip] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [versiPencarian, setVersiPencarian] = useState(0);
  const [pilihan, setPilihan] = useState<PilihanPeriksa | null>(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: TipeToast } | null>(null);
  const [dialogHapus, setDialogHapus] = useState(false);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({ mode: tab, limit: "500" });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (noRawat) params.set("no_rawat", noRawat);
      if (noRm) params.set("no_rm", noRm);
      if (nip) params.set("nip", nip);
      if (kataKunci.trim()) params.set("cari", kataKunci.trim());

      const response = await fetch(`/api/laboratorium/periksa-pk?${params}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat hasil periksa laboratorium.");
      if (tab === "data") setDataKunjungan(json.data || []);
      else if (tab === "item") setDataItem(json.data || []);
      else setDataDetail(json.data || {
        pasien: [],
        ringkasan: { jumlah_pasien: 0, jumlah_kunjungan: 0, jumlah_pemeriksaan: 0, jumlah_sub_pemeriksaan: 0 },
      });
    } catch (error) {
      if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat hasil periksa laboratorium.", tipe: "error" });
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [kataKunci, nip, noRawat, noRm, tab, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void muatData(controller.signal); }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, versiPencarian]);

  const tampilkanSemua = () => {
    setKataKunci("");
    setNoRawat("");
    setNoRm("");
    setNip("");
    setPilihan(null);
    setVersiPencarian((versi) => versi + 1);
  };

  return <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
        <table className="min-w-[105rem] border-collapse text-left text-[11px] text-slate-700">
          <caption className="sr-only">Hasil pemeriksaan laboratorium patologi klinik</caption>
          <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700"><tr>{["No. Rawat", "Pasien", "Tgl. Periksa", "Jam", "Pemeriksaan", "Item Pemeriksaan", "Hasil", "Satuan", "Nilai Rujukan", "Keterangan", "Ruang", "Petugas", "Dokter Perujuk", "Penanggung Jawab"].map((judul) => <th key={judul} scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-left font-semibold">{judul}</th>)}</tr></thead>
          <tbody>
            {memuat ? <tr><td colSpan={14} className="h-36 text-center text-slate-500">Memuat hasil periksa laboratorium...</td></tr>
              : data.length === 0 ? <tr><td colSpan={14} className="h-44 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada hasil laboratorium pada filter ini.</p></td></tr>
                : data.map((item, index) => <tr key={`${item.no_rawat}-${item.tgl_periksa}-${item.jam}-${item.kd_jenis_prw}-${item.pemeriksaan}-${index}`} className="even:bg-slate-50/70 hover:bg-slate-50">
                  <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rawat}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5"><span className="font-mono text-slate-600">{item.no_rkm_medis}</span><span className="ml-1 text-slate-800">{item.nm_pasien}</span><span className="block text-[11px] text-slate-500">{item.png_jawab || "-"}</span></td>
                  <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.tgl_periksa}</td><td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.jam}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5"><span className="font-mono text-slate-600">{item.kd_jenis_prw}</span><span className="ml-1">{item.nm_perawatan}</span></td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.pemeriksaan}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.nilai || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.satuan || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.nilai_rujukan || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.keterangan || "-"}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.ruang || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.nm_petugas || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.dokter_perujuk || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.penanggung_jawab || "-"}</td>
                </tr>)}
          </tbody>
        </table>
      </div>
    </section>
    <PanelBawah tampilan="web" tanggalMulai={tanggalMulai} tanggalSelesai={tanggalSelesai} onGantiTanggalMulai={setTanggalMulai} onGantiTanggalSelesai={setTanggalSelesai} kataKunci={kataKunci} onGantiKataKunci={setKataKunci} onCari={() => setVersiPencarian((versi) => versi + 1)} onSemua={tampilkanSemua} placeholderCari="No. Rawat, No. RM, pasien, pemeriksaan..." filterTambahan={<div className="flex items-center gap-1.5"><label htmlFor="status-rawat-lab" className="whitespace-nowrap text-slate-700">Status :</label><CustomSelect id="status-rawat-lab" value={status} onChange={(event) => setStatus(event.target.value)} containerClassName="relative w-28" className="h-7 rounded-md py-0.5 pr-5 text-[11px]"><option value="">Semua</option><option value="Ralan">Ralan</option><option value="Ranap">Ranap</option></CustomSelect></div>} jumlahRecord={data.length} memuat={memuat} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
}

"use client";

import { Fragment, useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";
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

  const pilihKunjungan = (item: KunjunganPeriksa) => {
    setPilihan((sekarang) => sekarang?.kunci === item.kunci ? null : {
      kunci: item.kunci,
      no_rawat: item.no_rawat,
      tgl_periksa: item.tgl_periksa,
      jam: item.jam,
    });
  };

  const aksiBelumTersedia = (nama: string) => {
    if (!pilihan || tab !== "data") {
      setToast({ pesan: "Pilih kunjungan pada tab Data Pemeriksaan terlebih dahulu.", tipe: "error" });
      return;
    }
    setToast({ pesan: `${nama} untuk ${pilihan.no_rawat} ${pilihan.tgl_periksa} ${pilihan.jam} belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const mintaHapus = () => {
    if (!pilihan || tab !== "data") {
      setToast({ pesan: "Pilih kunjungan pada tab Data Pemeriksaan terlebih dahulu.", tipe: "error" });
      return;
    }
    setDialogHapus(true);
  };

  const konfirmasiHapus = () => {
    setDialogHapus(false);
    aksiBelumTersedia("Penghapusan hasil periksa");
  };

  const kembali = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const tombolTambahan: TombolAksiCustom[] = [
    { label: "Ubah Nilai", ikon: faPenToSquare, onClick: () => aksiBelumTersedia("Ubah Nilai Hasil"), disabled: !pilihan || tab !== "data", tooltip: "Ubah nilai hasil pemeriksaan" },
    { label: "Kesan & Saran", ikon: faList, onClick: () => aksiBelumTersedia("Kesan & Saran"), disabled: !pilihan || tab !== "data", tooltip: "Isi kesan dan saran laboratorium" },
    { label: "Nota", ikon: faReceipt, onClick: () => aksiBelumTersedia("Cetak Nota Lab"), disabled: !pilihan || tab !== "data", tooltip: "Cetak nota laboratorium" },
    { label: "PDF", ikon: faFileCircleCheck, onClick: () => aksiBelumTersedia("PDF Hasil Lab"), disabled: !pilihan || tab !== "data", tooltip: "Ekspor hasil laboratorium ke PDF" },
  ];

  const kelasBaris = (kunci: string) => pilihan?.kunci === kunci
    ? "cursor-pointer bg-primary-100"
    : "cursor-pointer hover:bg-slate-50/80";

  const totalBiayaPemeriksaan = dataKunjungan.reduce((jumlah, item) => jumlah + Number(item.biaya_kunjungan || 0), 0);
  const jumlahRecord = tab === "data" ? dataKunjungan.length : tab === "item" ? dataItem.length : dataDetail.ringkasan.jumlah_sub_pemeriksaan;

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section aria-label="Filter data pemeriksaan laboratorium" className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="periksa-no-rawat" className="whitespace-nowrap text-xs font-semibold text-slate-700">No. Rawat :</label>
          <input
            id="periksa-no-rawat"
            type="text"
            value={noRawat}
            onChange={(event) => { setNoRawat(event.target.value); setPilihan(null); }}
            onKeyDown={(event) => { if (event.key === "Enter") setVersiPencarian((versi) => versi + 1); }}
            className="h-7 w-44 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="periksa-tgl-mulai" className="whitespace-nowrap text-xs font-semibold text-slate-700">Tanggal :</label>
          <input
            id="periksa-tgl-mulai"
            aria-label="Tanggal mulai pemeriksaan"
            type="date"
            value={tanggalMulai}
            onChange={(event) => setTanggalMulai(event.target.value)}
            className="h-7 w-[8.5rem] rounded-md border border-slate-300 px-2 text-[11px] tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <span className="text-xs text-slate-600">s.d.</span>
          <input
            id="periksa-tgl-selesai"
            aria-label="Tanggal selesai pemeriksaan"
            type="date"
            value={tanggalSelesai}
            onChange={(event) => setTanggalSelesai(event.target.value)}
            className="h-7 w-[8.5rem] rounded-md border border-slate-300 px-2 text-[11px] tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="periksa-no-rm" className="whitespace-nowrap text-xs font-semibold text-slate-700">Pasien :</label>
          <input
            id="periksa-no-rm"
            type="text"
            value={noRm}
            onChange={(event) => { setNoRm(event.target.value); setPilihan(null); }}
            placeholder="No. RM"
            className="h-7 w-28 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="periksa-nip" className="whitespace-nowrap text-xs font-semibold text-slate-700">Petugas :</label>
          <input
            id="periksa-nip"
            type="text"
            value={nip}
            onChange={(event) => { setNip(event.target.value); setPilihan(null); }}
            placeholder="NIP"
            className="h-7 w-28 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none"
          />
          <span className="ml-auto whitespace-nowrap text-[11px] text-slate-500">Record: <span className="font-semibold tabular-nums text-slate-800">{jumlahRecord}</span></span>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Tampilan hasil pemeriksaan laboratorium" className="flex shrink-0 border-b border-slate-200">
          {TAB.map((nilai) => (
            <button
              key={nilai}
              id={`tab-periksa-${nilai}`}
              type="button"
              role="tab"
              aria-selected={tab === nilai}
              aria-controls={`panel-periksa-${nilai}`}
              tabIndex={tab === nilai ? 0 : -1}
              onClick={() => setTab(nilai)}
              onKeyDown={(event) => kunciTab(event, tab, setTab)}
              className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tab === nilai ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {LABEL_TAB[nilai]}
            </button>
          ))}
        </div>

        <div
          key={tab}
          id={`panel-periksa-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-periksa-${tab}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto focus:outline-none"
          aria-busy={memuat}
        >
          {tab === "data" && (
            <table className="w-full min-w-[72rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Data pemeriksaan laboratorium patologi klinik per kunjungan</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.Rawat", "Pasien", "Petugas", "Tgl.Periksa", "Jam Periksa", "Dokter Perujuk", "Penanggung Jawab"].map((judul) => (
                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={7} className="h-36 text-center text-slate-500">Memuat data pemeriksaan laboratorium...</td></tr>
                ) : dataKunjungan.length === 0 ? (
                  <tr><td colSpan={7} className="h-44 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada data pemeriksaan pada filter ini.</p></td></tr>
                ) : dataKunjungan.map((item) => {
                  const kelompok = new Map<string, ItemPeriksa[]>();
                  for (const sub of item.item) {
                    const daftar = kelompok.get(sub.kd_jenis_prw) || [];
                    daftar.push(sub);
                    kelompok.set(sub.kd_jenis_prw, daftar);
                  }
                  return (
                    <Fragment key={item.kunci}>
                      <tr
                        tabIndex={0}
                        title="Klik untuk memilih kunjungan"
                        onClick={() => pilihKunjungan(item)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            pilihKunjungan(item);
                          }
                        }}
                        className={`${kelasBaris(item.kunci)} outline-none focus:ring-1 focus:ring-inset focus:ring-primary-500`}
                      >
                        <td className="whitespace-nowrap px-2 py-1.5 font-mono text-slate-800">{item.no_rawat}</td>
                        <td className="px-2 py-1.5"><span className="font-mono text-slate-600">{item.no_rkm_medis}</span> <span className="text-slate-800">{item.nm_pasien}</span> <span className="text-slate-500">({item.jenis_ruang || (item.status === "Ranap" ? "Kamar" : "Poli")} : {item.ruang || "-"})</span></td>
                        <td className="px-2 py-1.5">{item.nm_petugas || "-"}</td>
                        <td className="whitespace-nowrap px-2 py-1.5 font-mono">{item.tgl_periksa}</td>
                        <td className="whitespace-nowrap px-2 py-1.5 font-mono">{item.jam}</td>
                        <td className="px-2 py-1.5">{item.dokter_perujuk || "-"}</td>
                        <td className="px-2 py-1.5">{item.penanggung_jawab || "-"}</td>
                      </tr>
                      <tr className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                        <td className="whitespace-nowrap px-2 py-1 text-[10px] font-semibold text-slate-500">Cara Bayar : {item.png_jawab || "-"}</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Pemeriksaan</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Hasil</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Metode</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Satuan</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Nilai Rujukan</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Keterangan</td>
                      </tr>
                      {[...kelompok.entries()].map(([kodeItem, daftar]) => (
                        <Fragment key={`${item.kunci}-${kodeItem}`}>
                          <tr className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                            <td />
                            <td className="px-2 py-1 font-semibold text-slate-700"><span className="font-mono text-[10px] text-slate-500">{kodeItem}</span> {daftar[0]?.nm_perawatan} <span className="font-mono text-[10px] text-slate-500">{formatAngka(daftar[0]?.biaya)}</span></td>
                            <td /><td /><td /><td /><td />
                          </tr>
                          {daftar.map((sub, indeks) => (
                            <tr key={`${item.kunci}-${kodeItem}-${sub.id_template}-${indeks}`} className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                              <td />
                              <td className="px-2 py-1 pl-6"><span className="text-slate-700">{sub.pemeriksaan}</span> <span className="font-mono text-[10px] text-slate-500">{formatAngka(sub.biaya_item)}</span></td>
                              <td className="whitespace-nowrap px-2 py-1 font-mono text-slate-800">{sub.nilai || "-"}</td>
                              <td className="px-2 py-1">{sub.method || "-"}</td>
                              <td className="px-2 py-1">{sub.satuan || "-"}</td>
                              <td className="px-2 py-1">{sub.nilai_rujukan || "-"}</td>
                              <td className="px-2 py-1">{sub.keterangan || "-"}</td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                      <tr className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                        <td /><td />
                        <td className="px-2 py-1">Biaya Periksa : {formatAngka(item.biaya_kunjungan)}</td>
                        <td /><td />
                        <td className="px-2 py-1">Kesan : {item.kesan || "-"}</td>
                        <td className="px-2 py-1">Saran : {item.saran || "-"}</td>
                      </tr>
                    </Fragment>
                  );
                })}
                {dataKunjungan.length > 0 && (
                  <tr className="bg-slate-50 font-semibold text-slate-700">
                    <td className="whitespace-nowrap px-2 py-1">&gt;&gt;</td>
                    <td className="px-2 py-1" colSpan={6}>Total : {formatAngka(totalBiayaPemeriksaan)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {tab === "item" && (
            <table className="w-full min-w-[110rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Item pemeriksaan laboratorium patologi klinik</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {KOLOM_ITEM.map((kolom) => (
                    <th key={kolom.label} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{kolom.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={KOLOM_ITEM.length} className="h-36 text-center text-slate-500">Memuat item pemeriksaan laboratorium...</td></tr>
                ) : dataItem.length === 0 ? (
                  <tr><td colSpan={KOLOM_ITEM.length} className="h-44 text-center text-slate-400">Tidak ada item pemeriksaan pada filter ini.</td></tr>
                ) : dataItem.map((baris, indeks) => (
                  <tr key={`${teks(baris.no_rawat)}-${teks(baris.id_template)}-${indeks}`} className="hover:bg-slate-50/80">
                    {KOLOM_ITEM.map((kolom) => (
                      <td key={kolom.label} className={`whitespace-nowrap px-2 py-1.5 ${kolom.kelas || ""}`}>{kolom.isi(baris)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "detail" && (
            <table className="w-full min-w-[80rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Detail kunjungan laboratorium patologi klinik</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.", "No.RM", "Nama Pasien", "Umur", "J.K.", "Kunjungan"].map((judul) => (
                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={6} className="h-36 text-center text-slate-500">Memuat detail kunjungan laboratorium...</td></tr>
                ) : dataDetail.pasien.length === 0 ? (
                  <tr><td colSpan={6} className="h-44 text-center text-slate-400">Tidak ada detail kunjungan pada filter ini.</td></tr>
                ) : dataDetail.pasien.map((pasien, indeksPasien) => (
                  <Fragment key={pasien.no_rkm_medis}>
                    {pasien.kunjungan.map((kunjungan, indeksKunjungan) => (
                      <tr key={kunjungan.kunci}>
                        {indeksKunjungan === 0 && (
                          <>
                            <td rowSpan={pasien.kunjungan.length} className="px-2 py-1.5 text-center tabular-nums">{indeksPasien + 1}</td>
                            <td rowSpan={pasien.kunjungan.length} className="whitespace-nowrap px-2 py-1.5 font-mono">{pasien.no_rkm_medis}</td>
                            <td rowSpan={pasien.kunjungan.length} className="px-2 py-1.5 align-top">{pasien.nm_pasien} <span className="text-slate-500">({pasien.png_jawab || "-"})</span></td>
                            <td rowSpan={pasien.kunjungan.length} className="whitespace-nowrap px-2 py-1.5">{pasien.umur} {pasien.sttsumur}</td>
                            <td rowSpan={pasien.kunjungan.length} className="px-2 py-1.5 text-center">{pasien.jk || "-"}</td>
                          </>
                        )}
                        <td className="px-2 py-1.5 align-top">
                          <div className="space-y-1.5">
                            <div className="grid grid-cols-[6rem_6rem_6rem_1fr] text-[10px]">
                              <span className="bg-slate-50 px-2 py-1 font-semibold text-slate-600">P.J.Lab</span>
                              <span className="bg-slate-50 px-2 py-1 font-semibold text-slate-600">Perujuk</span>
                              <span className="bg-slate-50 px-2 py-1 font-semibold text-slate-600">Petugas Lab</span>
                              <span className="bg-slate-50 px-2 py-1 font-semibold text-slate-600">Detail Pemeriksaan</span>
                              <span className="px-2 py-1">{kunjungan.penanggung_jawab || "-"}</span>
                              <span className="px-2 py-1">{kunjungan.dokter_perujuk || "-"}</span>
                              <span className="px-2 py-1">{kunjungan.nm_petugas || "-"}</span>
                              <span className="px-2 py-1 font-mono">{kunjungan.no_rawat} • {kunjungan.tgl_periksa} {kunjungan.jam} • {kunjungan.ruang || "-"}</span>
                            </div>
                            <table className="w-full border-collapse text-[10px]">
                              <caption className="sr-only">Detail pemeriksaan {kunjungan.no_rawat}</caption>
                              <thead className="bg-slate-50/80 text-slate-600">
                                <tr>
                                  {["Pemeriksaan", "Hasil", "Satuan", "Metode", "Nilai Rujukan", "Keterangan"].map((judul) => (
                                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-1.5 text-center font-semibold">{judul}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {kunjungan.item.map((sub) => (
                                  <tr key={`${sub.kd_jenis_prw}-${sub.id_template}`}>
                                    <td className="px-2 py-1">{sub.nm_perawatan}<span className="block text-slate-500">{sub.pemeriksaan}</span></td>
                                    <td className="px-2 py-1 text-center font-mono text-slate-800">{sub.nilai || "-"}</td>
                                    <td className="px-2 py-1 text-center">{sub.satuan || "-"}</td>
                                    <td className="px-2 py-1 text-center">{sub.method || "-"}</td>
                                    <td className="px-2 py-1 text-center">{sub.nilai_rujukan || "-"}</td>
                                    <td className="px-2 py-1">{sub.keterangan || "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {dataDetail.pasien.length > 0 && (
                  <tr className="bg-slate-50 text-center font-semibold text-slate-700">
                    <td colSpan={6} className="px-2 py-2">
                      Jumlah Pasien: {dataDetail.ringkasan.jumlah_pasien} • Jumlah Kunjungan: {dataDetail.ringkasan.jumlah_kunjungan} • Jumlah Pemeriksaan: {dataDetail.ringkasan.jumlah_pemeriksaan} • Jumlah Sub Pemeriksaan: {dataDetail.ringkasan.jumlah_sub_pemeriksaan}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        kataKunci={kataKunci}
        onGantiKataKunci={(nilai) => { setKataKunci(nilai); setPilihan(null); }}
        onCari={() => setVersiPencarian((versi) => versi + 1)}
        onSemua={tampilkanSemua}
        onHapus={mintaHapus}
        onCetak={() => {
          if (!pilihan || tab !== "data") {
            setToast({ pesan: "Pilih kunjungan pada tab Data Pemeriksaan terlebih dahulu.", tipe: "error" });
            return;
          }
          if (!cetakTabelDomJasper("Hasil Pemeriksaan Laboratorium PK", `${pilihan.no_rawat} — ${pilihan.tgl_periksa} ${pilihan.jam}`)) {
            setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
          }
        }}
        onKembali={kembali}
        labelKembali="Keluar"
        tombolTambahan={tombolTambahan}
        jumlahRecord={jumlahRecord}
        memuat={memuat}
      />
      <KonfirmasiDialog
        terbuka={dialogHapus}
        judul="Hapus hasil periksa laboratorium"
        pesan={`Hapus hasil periksa ${pilihan?.no_rawat || ""} pada ${pilihan?.tgl_periksa || ""} ${pilihan?.jam || ""}?`}
        subPesan="Pembatalan harus memeriksa tagihan terverifikasi dan membuat jurnal pembalik. Implementasi transaksi belum tersedia di Khanza Web."
        teksKonfirmasi="Lanjutkan"
        onBatal={() => setDialogHapus(false)}
        onKonfirmasi={konfirmasiHapus}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

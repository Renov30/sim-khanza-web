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

type JenisHasilLab = "MB" | "PA";
type TabHasil = "data" | "item" | "detail";
type TipeToast = "info" | "sukses" | "error";
type BarisItem = Record<string, unknown>;

type ItemMB = {
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

type KunjunganMB = {
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
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  biaya: string;
  biaya_kunjungan: number;
  saran: string;
  kesan: string;
  item: ItemMB[];
};

type HasilPA = {
  kunci: string;
  kunciKunjungan: string;
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
  ruang: string;
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  nm_perawatan: string;
  kd_jenis_prw: string;
  biaya: string;
  diagnosa_klinik: string;
  makroskopik: string;
  mikroskopik: string;
  kesimpulan: string;
  kesan: string;
};

type Ringkasan = {
  jumlah_pasien: number;
  jumlah_kunjungan: number;
  jumlah_pemeriksaan: number;
  jumlah_sub_pemeriksaan: number;
};

type PasienMB = {
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  kunjungan: KunjunganMB[];
};

type KunjunganDetailPA = {
  kunci: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  ruang: string;
  nm_petugas: string;
  dokter_perujuk: string;
  penanggung_jawab: string;
  item: HasilPA[];
};

type PasienPA = {
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umur: string;
  sttsumur: string;
  png_jawab: string;
  kunjungan: KunjunganDetailPA[];
};

type Pilihan = {
  kunci: string;
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  keterangan: string;
};

const TAB: Record<JenisHasilLab, readonly TabHasil[]> = {
  MB: ["data", "item", "detail"],
  PA: ["data", "detail"],
};

const LABEL_TAB: Record<TabHasil, string> = {
  data: "Data Pemeriksaan",
  item: "Item Pemeriksaan",
  detail: "Detail Kunjungan",
};

const KOLOM_ITEM_MB: { label: string; isi: (baris: BarisItem) => ReactNode; kelas?: string }[] = [
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

const KOLOM_PA: { label: string; isi: (baris: HasilPA) => ReactNode; kelas?: string }[] = [
  { label: "No.Rawat", isi: (baris) => baris.no_rawat, kelas: "font-mono text-slate-800" },
  { label: "Pasien", isi: (baris) => <><span className="font-mono text-slate-500">{baris.no_rkm_medis}</span> {baris.nm_pasien} <span className="text-slate-500">({baris.png_jawab || "-"})</span></>, kelas: "min-w-[12rem]" },
  { label: "Petugas", isi: (baris) => baris.nm_petugas || "-" },
  { label: "Tgl.Periksa", isi: (baris) => baris.tgl_periksa, kelas: "font-mono" },
  { label: "Jam Periksa", isi: (baris) => baris.jam, kelas: "font-mono" },
  { label: "Dokter Perujuk", isi: (baris) => baris.dokter_perujuk || "-" },
  { label: "Penanggung Jawab", isi: (baris) => baris.penanggung_jawab || "-" },
  { label: "Pemeriksaan", isi: (baris) => baris.nm_perawatan },
  { label: "Biaya", isi: (baris) => formatAngka(baris.biaya), kelas: "font-mono text-slate-800" },
  { label: "Diagnosa Klinis", isi: (baris) => baris.diagnosa_klinik || "-", kelas: "min-w-[10rem]" },
  { label: "Makroskopik", isi: (baris) => baris.makroskopik || "-", kelas: "min-w-[12rem]" },
  { label: "Mikroskopik", isi: (baris) => baris.mikroskopik || "-", kelas: "min-w-[12rem]" },
  { label: "Kesimpulan", isi: (baris) => baris.kesimpulan || "-", kelas: "min-w-[10rem]" },
  { label: "Kesan", isi: (baris) => baris.kesan || "-", kelas: "min-w-[10rem]" },
  { label: "Cara Bayar", isi: (baris) => baris.png_jawab || "-" },
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
  daftar: readonly TabHasil[],
  aktif: TabHasil,
  atur: (nilai: TabHasil) => void,
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
    document.getElementById(`tab-hasil-${daftar[berikut]}`)?.focus();
  });
}

export default function LembarHasilLab({ jenis }: { jenis: JenisHasilLab }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const daftarTab = TAB[jenis];
  const [tab, setTab] = useState<TabHasil>("data");
  const [noRawat, setNoRawat] = useState(searchParams.get("no_rawat")?.trim() || "");
  const [tanggalMulai, setTanggalMulai] = useState(registrationDate(new Date()));
  const [tanggalSelesai, setTanggalSelesai] = useState(registrationDate(new Date()));
  const [noRm, setNoRm] = useState("");
  const [nip, setNip] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [versiPencarian, setVersiPencarian] = useState(0);
  const [memuat, setMemuat] = useState(true);
  const [dataMB, setDataMB] = useState<KunjunganMB[]>([]);
  const [dataItemMB, setDataItemMB] = useState<BarisItem[]>([]);
  const [dataDetailMB, setDataDetailMB] = useState<{ pasien: PasienMB[]; ringkasan: Ringkasan }>({ pasien: [], ringkasan: { jumlah_pasien: 0, jumlah_kunjungan: 0, jumlah_pemeriksaan: 0, jumlah_sub_pemeriksaan: 0 } });
  const [dataPA, setDataPA] = useState<HasilPA[]>([]);
  const [dataDetailPA, setDataDetailPA] = useState<{ pasien: PasienPA[]; ringkasan: Ringkasan }>({ pasien: [], ringkasan: { jumlah_pasien: 0, jumlah_kunjungan: 0, jumlah_pemeriksaan: 0, jumlah_sub_pemeriksaan: 0 } });
  const [pilihan, setPilihan] = useState<Pilihan | null>(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: TipeToast } | null>(null);
  const [dialogHapus, setDialogHapus] = useState(false);

  const muatData = useCallback(async () => {
    setMemuat(true);
    const url = new URL(`/api/laboratorium/periksa-${jenis.toLowerCase()}`, window.location.origin);
    url.searchParams.set("mode", tab);
    if (noRawat) url.searchParams.set("no_rawat", noRawat);
    if (tanggalMulai) url.searchParams.set("tanggal_mulai", tanggalMulai);
    if (tanggalSelesai) url.searchParams.set("tanggal_selesai", tanggalSelesai);
    if (noRm) url.searchParams.set("no_rm", noRm);
    if (nip) url.searchParams.set("nip", nip);
    if (kataKunci) url.searchParams.set("cari", kataKunci);
    url.searchParams.set("limit", "500");
    try {
      const respons = await fetch(url.toString());
      const json = await respons.json();
      if (!respons.ok || !json.success) {
        setToast({ pesan: json.error || `Gagal memuat hasil periksa lab ${jenis}.`, tipe: "error" });
        return;
      }
      if (tab === "detail") {
        if (jenis === "MB") setDataDetailMB(json.data);
        else setDataDetailPA(json.data);
      } else if (jenis === "MB") {
        if (tab === "item") setDataItemMB(json.data);
        else setDataMB(json.data);
      } else {
        setDataPA(json.data);
      }
    } catch {
      setToast({ pesan: `Gagal memuat hasil periksa lab ${jenis}.`, tipe: "error" });
    } finally {
      setMemuat(false);
    }
  }, [jenis, tab, noRawat, tanggalMulai, tanggalSelesai, noRm, nip, kataKunci]);

  useEffect(() => {
    const timer = window.setTimeout(() => void muatData(), 0);
    return () => window.clearTimeout(timer);
  }, [muatData, versiPencarian]);

  const pilih = (data: Pilihan) => {
    setPilihan((sebelumnya) => sebelumnya?.kunci === data.kunci ? null : data);
  };

  const pilihKunjungan = (item: KunjunganMB) => pilih({
    kunci: item.kunci,
    no_rawat: item.no_rawat,
    tgl_periksa: item.tgl_periksa,
    jam: item.jam,
    keterangan: item.nm_pasien,
  });

  const pilihItem = (baris: BarisItem) => {
    const no_rawat = teks(baris.no_rawat);
    const tgl_periksa = teks(baris.tgl_periksa);
    const jam = teks(baris.jam);
    pilih({ kunci: `${no_rawat}|${tgl_periksa}|${jam}`, no_rawat, tgl_periksa, jam, keterangan: teks(baris.pemeriksaan) });
  };

  const pilihHasilPA = (baris: HasilPA) => pilih({
    kunci: baris.kunci,
    no_rawat: baris.no_rawat,
    tgl_periksa: baris.tgl_periksa,
    jam: baris.jam,
    keterangan: baris.nm_perawatan,
  });

  const kelasBaris = (kunci: string) => pilihan?.kunci === kunci
    ? "cursor-pointer bg-primary-100"
    : "cursor-pointer hover:bg-slate-50/80";

  const aksiBelumTersedia = (nama: string) => {
    if (!pilihan) {
      setToast({ pesan: `Pilih pemeriksaan ${jenis} terlebih dahulu.`, tipe: "error" });
      return;
    }
    setToast({ pesan: `${nama} belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const tampilkanSemua = () => {
    setNoRawat("");
    setNoRm("");
    setNip("");
    setKataKunci("");
    setPilihan(null);
    setVersiPencarian((versi) => versi + 1);
  };

  const konfirmasiHapus = () => {
    setDialogHapus(false);
    if (pilihan) setToast({ pesan: `Penghapusan hasil ${jenis} belum tersedia di Khanza Web.`, tipe: "info" });
  };

  const kembali = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const tombolTambahan: TombolAksiCustom[] = [
    { label: "Ubah Hasil", ikon: faPenToSquare, onClick: () => aksiBelumTersedia(jenis === "MB" ? "Ubah Nilai Hasil" : "Ubah Hasil PA"), disabled: !pilihan || tab !== "data", tooltip: "Ubah hasil pemeriksaan" },
    ...(jenis === "MB" ? [{ label: "Kesan & Saran", ikon: faList, onClick: () => aksiBelumTersedia("Kesan & Saran"), disabled: !pilihan || tab !== "data", tooltip: "Isi kesan dan saran laboratorium" }] : []),
    { label: "Nota", ikon: faReceipt, onClick: () => aksiBelumTersedia("Cetak Nota Lab"), disabled: !pilihan || tab !== "data", tooltip: "Cetak nota laboratorium" },
    { label: "PDF", ikon: faFileCircleCheck, onClick: () => aksiBelumTersedia("PDF Hasil Lab"), disabled: !pilihan || tab !== "data", tooltip: "Ekspor hasil laboratorium ke PDF" },
  ];

  const totalBiayaMB = dataMB.reduce((jumlah, item) => jumlah + Number(item.biaya_kunjungan || 0), 0);
  const totalBiayaPA = dataPA.reduce((jumlah, item) => jumlah + Number(item.biaya || 0), 0);
  const ringkasan = jenis === "MB" ? dataDetailMB.ringkasan : dataDetailPA.ringkasan;
  const jumlahRecord = tab === "detail"
    ? ringkasan.jumlah_sub_pemeriksaan
    : jenis === "MB" ? (tab === "item" ? dataItemMB.length : dataMB.length) : dataPA.length;

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="hasil-no-rawat" className="whitespace-nowrap text-xs font-semibold text-slate-700">No.Rawat :</label>
          <input
            id="hasil-no-rawat"
            type="text"
            value={noRawat}
            onChange={(event) => { setNoRawat(event.target.value); setPilihan(null); }}
            placeholder="No. Rawat"
            className="h-7 w-44 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="hasil-tanggal-mulai" className="whitespace-nowrap text-xs font-semibold text-slate-700">Tanggal :</label>
          <input
            id="hasil-tanggal-mulai"
            type="date"
            value={tanggalMulai}
            onChange={(event) => { setTanggalMulai(event.target.value); setPilihan(null); }}
            className="h-7 w-36 rounded-md border border-slate-300 px-2 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <span className="text-[11px] text-slate-500">s.d.</span>
          <input
            id="hasil-tanggal-selesai"
            type="date"
            value={tanggalSelesai}
            onChange={(event) => { setTanggalSelesai(event.target.value); setPilihan(null); }}
            className="h-7 w-36 rounded-md border border-slate-300 px-2 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="hasil-no-rm" className="whitespace-nowrap text-xs font-semibold text-slate-700">Pasien :</label>
          <input
            id="hasil-no-rm"
            type="text"
            value={noRm}
            onChange={(event) => { setNoRm(event.target.value); setPilihan(null); }}
            placeholder="No. RM"
            className="h-7 w-28 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none"
          />
          <label htmlFor="hasil-nip" className="whitespace-nowrap text-xs font-semibold text-slate-700">Petugas :</label>
          <input
            id="hasil-nip"
            type="text"
            value={nip}
            onChange={(event) => { setNip(event.target.value); setPilihan(null); }}
            placeholder="NIP"
            className="h-7 w-28 rounded-md border border-slate-300 px-2 font-mono text-[11px] text-slate-800 placeholder-slate-400 focus:border-primary-600 focus:outline-none"
          />
          <span className="ml-auto whitespace-nowrap text-[11px] text-slate-500">
            Record: <span className="font-semibold tabular-nums text-slate-800">{jumlahRecord}</span>
            {tab !== "detail" && <> • Total: <span className="font-semibold tabular-nums text-slate-800">{formatAngka(jenis === "MB" ? totalBiayaMB : totalBiayaPA)}</span></>}
          </span>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label={`Tampilan hasil pemeriksaan laboratorium ${jenis}`} className="flex shrink-0 border-b border-slate-200">
          {daftarTab.map((nilai) => (
            <button
              key={nilai}
              id={`tab-hasil-${nilai}`}
              type="button"
              role="tab"
              aria-selected={tab === nilai}
              aria-controls={`panel-hasil-${nilai}`}
              tabIndex={tab === nilai ? 0 : -1}
              onClick={() => { setTab(nilai); setPilihan(null); }}
              onKeyDown={(event) => kunciTab(event, daftarTab, nilai, setTab)}
              className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tab === nilai ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {LABEL_TAB[nilai]}
            </button>
          ))}
        </div>

        <div id={`panel-hasil-${tab}`} role="tabpanel" aria-labelledby={`tab-hasil-${tab}`} tabIndex={0} className="min-h-0 flex-1 overflow-auto focus:outline-none" aria-busy={memuat}>
          {jenis === "MB" && tab === "data" && (
            <table className="w-full min-w-[72rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Data pemeriksaan laboratorium mikrobiologi dan bio molekuler per kunjungan</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.Rawat", "Pasien", "Petugas", "Tanggal Periksa", "Jam", "Dokter Perujuk", "Penanggung Jawab"].map((judul) => (
                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={7} className="h-36 border-0 text-center text-slate-500">Memuat data pemeriksaan laboratorium MB...</td></tr>
                ) : dataMB.length === 0 ? (
                  <tr><td colSpan={7} className="h-44 border-0 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada data pemeriksaan pada filter ini.</p></td></tr>
                ) : dataMB.map((item) => {
                  const kelompok = new Map<string, ItemMB[]>();
                  for (const sub of item.item) {
                    const daftar = kelompok.get(sub.kd_jenis_prw) || [];
                    daftar.push(sub);
                    kelompok.set(sub.kd_jenis_prw, daftar);
                  }
                  return (
                    <Fragment key={item.kunci}>
                      <tr
                        tabIndex={0}
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
                        <td />
                        <td className="whitespace-nowrap px-2 py-1 text-[10px] font-semibold text-slate-500">Cara Bayar : {item.png_jawab || "-"}</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Pemeriksaan</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Hasil</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Metode</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Nilai Rujukan</td>
                        <td className="whitespace-nowrap px-2 py-1 text-center text-[10px] font-semibold text-slate-500">Keterangan</td>
                      </tr>
                      {[...kelompok.entries()].map(([kodeItem, daftar]) => (
                        <Fragment key={`${item.kunci}-${kodeItem}`}>
                          <tr className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                            <td /><td />
                            <td className="px-2 py-1 font-semibold text-slate-700"><span className="font-mono text-[10px] text-slate-500">{kodeItem}</span> {daftar[0]?.nm_perawatan} <span className="font-mono text-[10px] text-slate-500">{formatAngka(daftar[0]?.biaya)}</span></td>
                            <td /><td /><td /><td />
                          </tr>
                          {daftar.map((sub, indeks) => (
                            <tr key={`${item.kunci}-${kodeItem}-${sub.id_template}-${indeks}`} className={kelasBaris(item.kunci)} onClick={() => pilihKunjungan(item)}>
                              <td /><td />
                              <td className="px-2 py-1 pl-6"><span className="text-slate-700">{sub.pemeriksaan}</span> <span className="font-mono text-[10px] text-slate-500">{formatAngka(sub.biaya_item)}</span></td>
                              <td className="whitespace-nowrap px-2 py-1 font-mono text-slate-800">{sub.nilai || "-"}</td>
                              <td className="px-2 py-1">{sub.method || "-"}</td>
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
                {dataMB.length > 0 && (
                  <tr className="bg-slate-50 font-semibold text-slate-700">
                    <td className="whitespace-nowrap px-2 py-1">&gt;&gt;</td>
                    <td className="px-2 py-1">Total : {formatAngka(totalBiayaMB)}</td>
                    <td /><td /><td /><td /><td />
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {jenis === "MB" && tab === "item" && (
            <table className="w-full min-w-[110rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Item pemeriksaan laboratorium mikrobiologi dan bio molekuler</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {KOLOM_ITEM_MB.map((kolom) => (
                    <th key={kolom.label} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{kolom.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={KOLOM_ITEM_MB.length} className="h-36 border-0 text-center text-slate-500">Memuat item pemeriksaan laboratorium...</td></tr>
                ) : dataItemMB.length === 0 ? (
                  <tr><td colSpan={KOLOM_ITEM_MB.length} className="h-44 border-0 text-center text-slate-400">Tidak ada item pemeriksaan pada filter ini.</td></tr>
                ) : dataItemMB.map((baris, indeks) => {
                  const no_rawat = teks(baris.no_rawat);
                  const kunci = `${no_rawat}|${teks(baris.tgl_periksa)}|${teks(baris.jam)}`;
                  return (
                    <tr key={`${kunci}-${teks(baris.id_template)}-${indeks}`} className={kelasBaris(kunci)} onClick={() => pilihItem(baris)}>
                      {KOLOM_ITEM_MB.map((kolom) => (
                        <td key={kolom.label} className={`whitespace-nowrap px-2 py-1.5 ${kolom.kelas || ""}`}>{kolom.isi(baris)}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {jenis === "PA" && tab === "data" && (
            <table className="w-full min-w-[150rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Data pemeriksaan laboratorium patologi anatomi</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {KOLOM_PA.map((kolom) => (
                    <th key={kolom.label} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{kolom.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={KOLOM_PA.length} className="h-36 border-0 text-center text-slate-500">Memuat data pemeriksaan laboratorium PA...</td></tr>
                ) : dataPA.length === 0 ? (
                  <tr><td colSpan={KOLOM_PA.length} className="h-44 border-0 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada data pemeriksaan pada filter ini.</p></td></tr>
                ) : dataPA.map((baris) => (
                  <tr
                    key={baris.kunci}
                    tabIndex={0}
                    onClick={() => pilihHasilPA(baris)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        pilihHasilPA(baris);
                      }
                    }}
                    className={`${kelasBaris(baris.kunci)} outline-none focus:ring-1 focus:ring-inset focus:ring-primary-500`}
                  >
                    {KOLOM_PA.map((kolom) => (
                      <td key={kolom.label} className={`whitespace-nowrap px-2 py-1.5 ${kolom.kelas || ""}`}>{kolom.isi(baris)}</td>
                    ))}
                  </tr>
                ))}
                {dataPA.length > 0 && (
                  <tr className="bg-slate-50 font-semibold text-slate-700">
                    <td className="whitespace-nowrap px-2 py-1">&gt;&gt;</td>
                    <td className="px-2 py-1">Total : {formatAngka(totalBiayaPA)}</td>
                    <td colSpan={KOLOM_PA.length - 2} />
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {tab === "detail" && (
            <table className="w-full min-w-[80rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Detail kunjungan laboratorium {jenis}</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  {["No.", "No.RM", "Nama Pasien", "Umur", "J.K.", "Kunjungan"].map((judul) => (
                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center font-semibold">{judul}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memuat ? (
                  <tr><td colSpan={6} className="h-36 border-0 text-center text-slate-500">Memuat detail kunjungan laboratorium...</td></tr>
                ) : (jenis === "MB" ? dataDetailMB.pasien.length : dataDetailPA.pasien.length) === 0 ? (
                  <tr><td colSpan={6} className="h-44 border-0 text-center text-slate-400">Tidak ada detail kunjungan pada filter ini.</td></tr>
                ) : jenis === "MB" ? dataDetailMB.pasien.map((pasien, indeksPasien) => (
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
                                  {["Pemeriksaan", "Hasil", "Nilai Rujukan", "Metode", "Keterangan"].map((judul) => (
                                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-1.5 text-center font-semibold">{judul}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {kunjungan.item.map((sub) => (
                                  <tr key={`${sub.kd_jenis_prw}-${sub.id_template}`}>
                                    <td className="px-2 py-1">{sub.pemeriksaan}</td>
                                    <td className="px-2 py-1 text-center font-mono text-slate-800">{sub.nilai || "-"}</td>
                                    <td className="px-2 py-1 text-center">{sub.nilai_rujukan || "-"}</td>
                                    <td className="px-2 py-1 text-center">{sub.method || "-"}</td>
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
                )) : dataDetailPA.pasien.map((pasien, indeksPasien) => (
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
                                  {["Diagnosa", "Makroskopik", "Mikroskopik", "Kesimpulan", "Kesan"].map((judul) => (
                                    <th key={judul} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-1.5 text-center font-semibold">{judul}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {kunjungan.item.map((sub) => (
                                  <tr key={sub.kunci}>
                                    <td className="px-2 py-1">{sub.diagnosa_klinik || "-"}</td>
                                    <td className="px-2 py-1">{sub.makroskopik || "-"}</td>
                                    <td className="px-2 py-1">{sub.mikroskopik || "-"}</td>
                                    <td className="px-2 py-1">{sub.kesimpulan || "-"}</td>
                                    <td className="px-2 py-1">{sub.kesan || "-"}</td>
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
                {ringkasan.jumlah_pasien > 0 && (
                  <tr className="bg-slate-50 text-center font-semibold text-slate-700">
                    <td colSpan={6} className="px-2 py-2">
                      Jumlah Pasien: {ringkasan.jumlah_pasien} • Jumlah Kunjungan: {ringkasan.jumlah_kunjungan} • Jumlah Pemeriksaan: {ringkasan.jumlah_pemeriksaan} • Jumlah Sub Pemeriksaan: {ringkasan.jumlah_sub_pemeriksaan}
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
        onHapus={() => {
          if (!pilihan) {
            setToast({ pesan: `Pilih pemeriksaan ${jenis} terlebih dahulu.`, tipe: "error" });
            return;
          }
          setDialogHapus(true);
        }}
        onCetak={() => {
          if (!pilihan || tab !== "data") {
            setToast({ pesan: `Pilih pemeriksaan pada tab Data Pemeriksaan terlebih dahulu.`, tipe: "error" });
            return;
          }
          window.print();
        }}
        onKembali={kembali}
        labelKembali="Keluar"
        tombolTambahan={tombolTambahan}
        jumlahRecord={jumlahRecord}
        memuat={memuat}
      />
      <KonfirmasiDialog
        terbuka={dialogHapus}
        judul={`Hapus hasil periksa laboratorium ${jenis}`}
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

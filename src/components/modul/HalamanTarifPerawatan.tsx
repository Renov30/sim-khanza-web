"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import {
  konfigurasiTarif,
  type JenisTarif,
} from "@/lib/tarif-perawatan/konfigurasi";
import { hitungTotalTarif } from "@/lib/tarif-perawatan/tarif";

interface OpsiApi {
  id: string;
  label: string;
}

interface OpsiTarif {
  kategori: OpsiApi[];
  penjab: OpsiApi[];
  unit: OpsiApi[];
  kelas: OpsiApi[];
  status: OpsiApi[];
}

interface BarisTarif {
  kd_jenis_prw: string;
  nm_perawatan: string;
  kd_kategori: string;
  nm_kategori: string;
  material: number | string;
  bhp: number | string;
  tarif_tindakandr: number | string;
  tarif_tindakanpr: number | string;
  kso: number | string;
  menejemen: number | string;
  total_byrdr: number | string;
  total_byrpr: number | string;
  total_byrdrpr: number | string;
  kd_pj: string;
  png_jawab: string;
  unit: string;
  nm_unit: string;
  status: string;
  kelas?: string;
}

interface FormTarif {
  kd_jenis_prw: string;
  nm_perawatan: string;
  kd_kategori: string;
  kd_pj: string;
  unit: string;
  kelas: string;
  material: string;
  bhp: string;
  tarif_tindakandr: string;
  tarif_tindakanpr: string;
  kso: string;
  menejemen: string;
}

interface ResponsApi<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
  totalHalaman?: number;
}

type TabTarif = "data" | "sampah";

const TAB_TARIF: { id: TabTarif; label: string }[] = [
  { id: "data", label: "Data Tarif" },
  { id: "sampah", label: "Data Sampah" },
];

const OPSI_KOSONG: OpsiTarif = {
  kategori: [],
  penjab: [],
  unit: [],
  kelas: [],
  status: [],
};

const KELAS_HEADER = "border-b border-r border-slate-200 px-2 py-2 text-left font-semibold";
const KELAS_SEL = "border-b border-r border-slate-100 px-2 py-1.5 text-slate-800";
const KELAS_INPUT = "h-7 w-full rounded-md border border-slate-300 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none";

function formAwal(): FormTarif {
  return {
    kd_jenis_prw: "",
    nm_perawatan: "",
    kd_kategori: "",
    kd_pj: "",
    unit: "",
    kelas: "-",
    material: "0",
    bhp: "0",
    tarif_tindakandr: "0",
    tarif_tindakanpr: "0",
    kso: "0",
    menejemen: "0",
  };
}

function keOpsiSelect(daftar: OpsiApi[], placeholder?: string): SelectOption[] {
  const awal = placeholder ? [{ value: "", label: placeholder }] : [];
  return [...awal, ...daftar.map((item) => ({ value: item.id, label: item.label }))];
}

function isiFormDariBaris(row: BarisTarif): FormTarif {
  return {
    kd_jenis_prw: row.kd_jenis_prw,
    nm_perawatan: row.nm_perawatan,
    kd_kategori: row.kd_kategori,
    kd_pj: row.kd_pj,
    unit: row.unit,
    kelas: row.kelas || "-",
    material: String(row.material ?? 0),
    bhp: String(row.bhp ?? 0),
    tarif_tindakandr: String(row.tarif_tindakandr ?? 0),
    tarif_tindakanpr: String(row.tarif_tindakanpr ?? 0),
    kso: String(row.kso ?? 0),
    menejemen: String(row.menejemen ?? 0),
  };
}

function badanFormulir(form: FormTarif) {
  return {
    kd_jenis_prw: form.kd_jenis_prw,
    nm_perawatan: form.nm_perawatan,
    kd_kategori: form.kd_kategori,
    kd_pj: form.kd_pj,
    unit: form.unit,
    kelas: form.kelas,
    material: Number(form.material),
    bhp: Number(form.bhp),
    tarif_tindakandr: Number(form.tarif_tindakandr),
    tarif_tindakanpr: Number(form.tarif_tindakanpr),
    kso: Number(form.kso),
    menejemen: Number(form.menejemen),
  };
}

function totalFormulir(form: FormTarif) {
  return hitungTotalTarif({
    material: Number(form.material) || 0,
    bhp: Number(form.bhp) || 0,
    tarif_tindakandr: Number(form.tarif_tindakandr) || 0,
    tarif_tindakanpr: Number(form.tarif_tindakanpr) || 0,
    kso: Number(form.kso) || 0,
    menejemen: Number(form.menejemen) || 0,
  });
}

function rupiah(nilai: number | string) {
  return new Intl.NumberFormat("id-ID").format(Math.round(Number(nilai) || 0));
}

async function bacaRespons<T>(response: Response): Promise<ResponsApi<T>> {
  const teks = await response.text();
  if (!teks) throw new Error("Server mengirim respons kosong.");
  try {
    return JSON.parse(teks) as ResponsApi<T>;
  } catch {
    throw new Error("Respons server tidak dapat dibaca.");
  }
}

function pesanError(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.";
}

export function HalamanTarifPerawatan({ jenis }: { jenis: JenisTarif }) {
  const konfigurasi = konfigurasiTarif(jenis);
  const [tab, setTab] = useState<TabTarif>("data");
  const [opsi, setOpsi] = useState<OpsiTarif>(OPSI_KOSONG);
  const [form, setForm] = useState<FormTarif>(formAwal);
  const [kodeLama, setKodeLama] = useState<string | null>(null);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [centang, setCentang] = useState<Set<string>>(new Set());
  const [data, setData] = useState<BarisTarif[]>([]);
  const [kataKunci, setKataKunci] = useState("");
  const [pencarian, setPencarian] = useState("");
  const [filterStatus, setFilterStatus] = useState("1");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [memuat, setMemuat] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const [dialogHapus, setDialogHapus] = useState(false);
  const [dialogPulihkan, setDialogPulihkan] = useState(false);

  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({
        cari: pencarian,
        status: tab === "sampah" ? "0" : filterStatus,
        kd_kategori: filterKategori,
        unit: filterUnit,
        kelas: filterKelas,
        page: String(halaman),
        limit: "50",
      });
      const response = await fetch(`/api/${konfigurasi.api}?${params.toString()}`, { cache: "no-store" });
      const hasil = await bacaRespons<BarisTarif[]>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || `Gagal memuat data ${konfigurasi.judul.toLowerCase()}.`);
      }
      setData(hasil.data ?? []);
      setTotal(hasil.total ?? 0);
      setTotalHalaman(hasil.totalHalaman ?? 1);
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    } finally {
      setMemuat(false);
    }
  }, [konfigurasi.api, konfigurasi.judul, tab, pencarian, filterStatus, filterKategori, filterUnit, filterKelas, halaman]);

  const muatKodeBaru = useCallback(async () => {
    try {
      const response = await fetch(`/api/${konfigurasi.api}/kode`, { cache: "no-store" });
      const hasil = await bacaRespons<{ kd_jenis_prw: string }>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Gagal membuat kode tarif.");
      }
      const kode = hasil.data?.kd_jenis_prw ?? "";
      setForm((sebelumnya) => ({ ...sebelumnya, kd_jenis_prw: kode }));
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    }
  }, [konfigurasi.api]);

  useEffect(() => {
    const controller = new AbortController();
    async function muatOpsi() {
      try {
        const response = await fetch(`/api/${konfigurasi.api}/options`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const hasil = await bacaRespons<OpsiTarif>(response);
        if (!response.ok || !hasil.success) {
          throw new Error(hasil.error || "Gagal memuat pilihan tarif.");
        }
        setOpsi(hasil.data ?? OPSI_KOSONG);
      } catch (error) {
        if (!controller.signal.aborted) {
          setToast({ pesan: pesanError(error), tipe: "error" });
        }
      }
    }
    void muatOpsi();
    queueMicrotask(() => {
      void muatKodeBaru();
    });
    return () => controller.abort();
  }, [konfigurasi.api, muatKodeBaru]);

  useEffect(() => {
    let aktif = true;
    queueMicrotask(() => {
      if (aktif) void muatData();
    });
    return () => {
      aktif = false;
    };
  }, [muatData]);

  const opsiKategori = useMemo(() => keOpsiSelect(opsi.kategori, "Pilih kategori..."), [opsi.kategori]);
  const opsiPenjab = useMemo(() => keOpsiSelect(opsi.penjab, "Pilih jenis bayar..."), [opsi.penjab]);
  const opsiUnit = useMemo(() => keOpsiSelect(opsi.unit, `Pilih ${konfigurasi.unitLabel.toLowerCase()}...`), [opsi.unit, konfigurasi.unitLabel]);
  const opsiKelas = useMemo(() => keOpsiSelect(opsi.kelas), [opsi.kelas]);
  const opsiKategoriFilter = useMemo(() => keOpsiSelect(opsi.kategori, "Semua kategori"), [opsi.kategori]);
  const opsiUnitFilter = useMemo(() => keOpsiSelect(opsi.unit, "Semua unit"), [opsi.unit]);
  const opsiKelasFilter = useMemo(() => keOpsiSelect(opsi.kelas, "Semua kelas"), [opsi.kelas]);
  const opsiStatusFilter = useMemo(
    () => [
      { value: "semua", label: "Semua status" },
      ...opsi.status.map((item) => ({ value: item.id, label: item.label })),
    ],
    [opsi.status],
  );
  const totals = totalFormulir(form);

  function aturForm(perubahan: Partial<FormTarif>) {
    setForm((sebelumnya) => ({ ...sebelumnya, ...perubahan }));
  }

  function pilihTab(tujuan: TabTarif) {
    if (tujuan === tab) return;
    setTab(tujuan);
    setTerpilih(null);
    setCentang(new Set());
    setDialogHapus(false);
    setDialogPulihkan(false);
    setKataKunci("");
    setPencarian("");
    setFilterStatus("1");
    setFilterKategori("");
    setFilterUnit("");
    setFilterKelas("");
    setHalaman(1);
  }

  function pindahTabDenganKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, indeks: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const indeksTujuan = event.key === "Home"
      ? 0
      : event.key === "End"
        ? TAB_TARIF.length - 1
        : event.key === "ArrowRight"
          ? (indeks + 1) % TAB_TARIF.length
          : (indeks - 1 + TAB_TARIF.length) % TAB_TARIF.length;
    const tujuan = TAB_TARIF[indeksTujuan].id;
    pilihTab(tujuan);
    document.getElementById(`${konfigurasi.api}-tab-${tujuan}`)?.focus();
  }

  function resetFormulir() {
    setForm(formAwal());
    setKodeLama(null);
    setTerpilih(null);
    setCentang(new Set());
  }

  function resetSemua() {
    resetFormulir();
    setTab("data");
    setKataKunci("");
    setPencarian("");
    setFilterStatus("1");
    setFilterKategori("");
    setFilterUnit("");
    setFilterKelas("");
    setHalaman(1);
    setDialogHapus(false);
    setDialogPulihkan(false);
    void muatKodeBaru();
  }

  function pilihBaris(row: BarisTarif) {
    if (tab === "sampah") {
      ubahCentang(row.kd_jenis_prw);
      return;
    }
    setTerpilih(row.kd_jenis_prw);
    setForm(isiFormDariBaris(row));
    setKodeLama(row.kd_jenis_prw);
    setCentang(new Set([row.kd_jenis_prw]));
  }

  function ubahCentang(kode: string) {
    setCentang((sebelumnya) => {
      const baru = new Set(sebelumnya);
      if (baru.has(kode)) baru.delete(kode);
      else baru.add(kode);
      return baru;
    });
  }

  function centangSemua() {
    setCentang((sebelumnya) => {
      const semuaTercecentang = data.length > 0 && data.every((row) => sebelumnya.has(row.kd_jenis_prw));
      if (semuaTercecentang) return new Set();
      return new Set(data.map((row) => row.kd_jenis_prw));
    });
  }

  async function kirim(method: string, isi: unknown, pesanSukses: (hasil: ResponsApi<unknown>) => string) {
    setMenyimpan(true);
    try {
      const response = await fetch(`/api/${konfigurasi.api}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isi),
      });
      const hasil = await bacaRespons<unknown>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Permintaan gagal diproses.");
      }
      setToast({ pesan: pesanSukses(hasil), tipe: "sukses" });
      return true;
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
      return false;
    } finally {
      setMenyimpan(false);
    }
  }

  async function sesudahMutasi() {
    resetFormulir();
    await muatKodeBaru();
    await muatData();
  }

  async function simpanBaru() {
    const berhasil = await kirim(
      "POST",
      badanFormulir(form),
      (hasil) => hasil.message || `${konfigurasi.judul} berhasil disimpan.`,
    );
    if (berhasil) await sesudahMutasi();
  }

  async function simpanGanti() {
    if (!kodeLama) {
      setToast({ pesan: "Pilih baris tarif yang akan diganti terlebih dahulu.", tipe: "info" });
      return;
    }
    const berhasil = await kirim(
      "PUT",
      { ...badanFormulir(form), kd_jenis_prw_lama: kodeLama },
      (hasil) => hasil.message || `${konfigurasi.judul} berhasil diperbarui.`,
    );
    if (berhasil) await sesudahMutasi();
  }

  async function ubahStatusTerpilih(status: "0" | "1") {
    const items = data
      .filter((row) => centang.has(row.kd_jenis_prw))
      .filter((row) => (status === "0" ? row.status === "1" : row.status === "0"))
      .map((row) => ({ kd_jenis_prw: row.kd_jenis_prw }));
    if (items.length === 0) {
      setToast({ pesan: `Pilih tarif yang berstatus ${status === "0" ? "aktif" : "nonaktif"} terlebih dahulu.`, tipe: "info" });
      return;
    }
    const berhasil = await kirim(
      status === "0" ? "DELETE" : "PATCH",
      { items, status: "1" },
      (hasil) => hasil.message || `${items.length} tarif berhasil diubah.`,
    );
    if (berhasil) {
      setDialogHapus(false);
      setDialogPulihkan(false);
      await sesudahMutasi();
    }
  }

  const dipilih = data.filter((row) => centang.has(row.kd_jenis_prw));
  const bisaNonaktifkan = dipilih.length > 0 && dipilih.every((row) => row.status === "1");
  const bisaPulihkan = dipilih.length > 0 && dipilih.every((row) => row.status === "0");
  const semuaTercecentang = data.length > 0 && data.every((row) => centang.has(row.kd_jenis_prw));
  const captionTabel = tab === "sampah"
    ? `Tarif nonaktif ${konfigurasi.judul.toLowerCase()} yang dapat dipulihkan`
    : konfigurasi.caption;
  const pesanKosong = tab === "sampah"
    ? "Tidak ada tarif di tempat sampah."
    : "Tidak ada tarif yang ditampilkan.";
  const header = [
    "Kode Tindakan",
    "Nama Tnd/Prw/Tagihan",
    "Kategori",
    "J.S. Rumah Sakit",
    "BHP/Paket Obat",
    "J.Medis Dr",
    "J.Medis Pr",
    "KSO",
    "Menejemen",
    "Ttl Biaya Dr",
    "Ttl Biaya Pr",
    "Ttl Biaya Dr & Pr",
    "Jenis Bayar",
    konfigurasi.unitLabel,
    ...(konfigurasi.punyaKelas ? ["Kelas"] : []),
    "Status",
  ];

  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-1.5">
      {tab === "data" && (
        <CustomSelect
          aria-label="Filter status tarif"
          containerClassName="w-32"
          options={opsiStatusFilter}
          value={filterStatus}
          onChange={(event) => {
            setFilterStatus(event.target.value);
            setHalaman(1);
          }}
        />
      )}
      <CustomSelect
        aria-label="Filter kategori tarif"
        containerClassName="w-44"
        options={opsiKategoriFilter}
        value={filterKategori}
        onChange={(event) => {
          setFilterKategori(event.target.value);
          setHalaman(1);
        }}
      />
      <CustomSelect
        aria-label={`Filter ${konfigurasi.unitLabel}`}
        containerClassName="w-44"
        options={opsiUnitFilter}
        value={filterUnit}
        onChange={(event) => {
          setFilterUnit(event.target.value);
          setHalaman(1);
        }}
      />
      {konfigurasi.punyaKelas && (
        <CustomSelect
          aria-label="Filter kelas"
          containerClassName="w-36"
          options={opsiKelasFilter}
          value={filterKelas}
          onChange={(event) => {
            setFilterKelas(event.target.value);
            setHalaman(1);
          }}
        />
      )}
    </div>
  );

  const pagination = (
    <div className="flex items-center gap-2 text-xs">
      <button
        type="button"
        onClick={() => setHalaman((nilai) => Math.max(1, nilai - 1))}
        disabled={halaman <= 1 || memuat}
        className="rounded-md border border-slate-300 px-2 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span className="font-mono text-slate-600">{halaman} / {totalHalaman}</span>
      <button
        type="button"
        onClick={() => setHalaman((nilai) => Math.min(totalHalaman, nilai + 1))}
        disabled={halaman >= totalHalaman || memuat}
        className="rounded-md border border-slate-300 px-2 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Berikutnya
      </button>
    </div>
  );

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <PanelInputData
        judul={konfigurasi.judulInput}
        idPenyimpanan={konfigurasi.idPenyimpanan}
        onSimpan={simpanBaru}
        onBaru={resetSemua}
        sedangMenyimpan={menyimpan}
      >
        <GridFormulirModul tampilkanKolomCadangan={false}>
          <div className="space-y-1">
            <label htmlFor={`${konfigurasi.api}-kode`} className="block text-xs font-semibold text-slate-700">Kode Tindakan</label>
            <input
              id={`${konfigurasi.api}-kode`}
              value={form.kd_jenis_prw}
              maxLength={15}
              onChange={(event) => aturForm({ kd_jenis_prw: event.target.value })}
              className={`${KELAS_INPUT} font-mono uppercase`}
              aria-label="Kode tindakan"
            />
          </div>
          <div className="space-y-1 lg:col-span-2">
            <label htmlFor={`${konfigurasi.api}-nama`} className="block text-xs font-semibold text-slate-700">Nama Tindakan/Perawatan/Tagihan</label>
            <input
              id={`${konfigurasi.api}-nama`}
              value={form.nm_perawatan}
              maxLength={80}
              onChange={(event) => aturForm({ nm_perawatan: event.target.value })}
              className={KELAS_INPUT}
              aria-label="Nama tindakan perawatan tagihan"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`${konfigurasi.api}-kategori`} className="block text-xs font-semibold text-slate-700">Kategori</label>
            <CustomSelect
              id={`${konfigurasi.api}-kategori`}
              options={opsiKategori}
              value={form.kd_kategori}
              onChange={(event) => aturForm({ kd_kategori: event.target.value })}
              aria-label="Kategori tarif"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`${konfigurasi.api}-unit`} className="block text-xs font-semibold text-slate-700">{konfigurasi.unitLabel}</label>
            <CustomSelect
              id={`${konfigurasi.api}-unit`}
              options={opsiUnit}
              value={form.unit}
              onChange={(event) => aturForm({ unit: event.target.value })}
              aria-label={konfigurasi.unitLabel}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`${konfigurasi.api}-bayar`} className="block text-xs font-semibold text-slate-700">Jenis Bayar</label>
            <CustomSelect
              id={`${konfigurasi.api}-bayar`}
              options={opsiPenjab}
              value={form.kd_pj}
              onChange={(event) => aturForm({ kd_pj: event.target.value })}
              aria-label="Jenis bayar"
            />
          </div>
          {konfigurasi.punyaKelas && (
            <div className="space-y-1">
              <label htmlFor={`${konfigurasi.api}-kelas`} className="block text-xs font-semibold text-slate-700">Kelas</label>
              <CustomSelect
                id={`${konfigurasi.api}-kelas`}
                options={opsiKelas}
                value={form.kelas}
                onChange={(event) => aturForm({ kelas: event.target.value })}
                aria-label="Kelas rawat inap"
              />
            </div>
          )}
          {([
            ["material", "Jasa Rumah Sakit"],
            ["bhp", "BHP/Paket Obat"],
            ["tarif_tindakandr", "Jasa Medis Dokter"],
            ["tarif_tindakanpr", "Jasa Medis Perawat"],
            ["kso", "KSO"],
            ["menejemen", "Menejemen"],
          ] as const).map(([kunci, label]) => (
            <div className="space-y-1" key={kunci}>
              <label htmlFor={`${konfigurasi.api}-${kunci}`} className="block text-xs font-semibold text-slate-700">{label}</label>
              <input
                id={`${konfigurasi.api}-${kunci}`}
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={form[kunci]}
                onChange={(event) => aturForm({ [kunci]: event.target.value })}
                className={`${KELAS_INPUT} text-right font-mono`}
                aria-label={label}
              />
            </div>
          ))}
          <div className="space-y-1 lg:col-span-3">
            <span className="block text-xs font-semibold text-slate-700">Perhitungan Otomatis</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <output className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-right font-mono text-slate-800">Dr: {rupiah(totals.total_byrdr)}</output>
              <output className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-right font-mono text-slate-800">Pr: {rupiah(totals.total_byrpr)}</output>
              <output className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-right font-mono text-slate-800">Dr+Pr: {rupiah(totals.total_byrdrpr)}</output>
            </div>
          </div>
        </GridFormulirModul>
      </PanelInputData>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label={`Jenis data ${konfigurasi.judul}`} className="flex shrink-0 border-b border-slate-200 bg-slate-50">
          {TAB_TARIF.map((item, indeks) => (
            <button
              key={item.id}
              id={`${konfigurasi.api}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`${konfigurasi.api}-panel-${item.id}`}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => pilihTab(item.id)}
              onKeyDown={(event) => pindahTabDenganKeyboard(event, indeks)}
              className={`border-b-2 px-3 py-2 text-[11px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tab === item.id ? "border-primary-700 bg-white text-slate-800" : "border-transparent text-slate-500"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id={`${konfigurasi.api}-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`${konfigurasi.api}-tab-${tab}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto"
        >
          <table className="w-full min-w-[1900px] border-collapse text-[11px]">
            <caption className="sr-only">{captionTabel}</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className={`${KELAS_HEADER} w-10 text-center`}>
                  <input
                    type="checkbox"
                    aria-label="Pilih semua tarif pada halaman ini"
                    checked={semuaTercecentang}
                    onChange={centangSemua}
                    className="cursor-pointer"
                  />
                </th>
                {header.map((judul) => (
                  <th scope="col" className={KELAS_HEADER} key={judul}>{judul}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {memuat && data.length === 0 && (
                <tr>
                  <td colSpan={header.length + 1} className={`${KELAS_SEL} text-center text-slate-600`}>Memuat data tarif...</td>
                </tr>
              )}
              {!memuat && data.length === 0 && (
                <tr>
                  <td colSpan={header.length + 1} className={`${KELAS_SEL} text-center text-slate-600`}>{pesanKosong}</td>
                </tr>
              )}
              {data.map((row) => (
                <tr
                  key={row.kd_jenis_prw}
                  onClick={() => pilihBaris(row)}
                  className={`cursor-pointer ${(tab === "sampah" ? centang.has(row.kd_jenis_prw) : terpilih === row.kd_jenis_prw) ? "bg-primary-50/60" : "even:bg-slate-50/70"}`}
                >
                  <td className={`${KELAS_SEL} text-center`} onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Pilih tarif ${row.kd_jenis_prw}`}
                      checked={centang.has(row.kd_jenis_prw)}
                      onChange={() => ubahCentang(row.kd_jenis_prw)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className={`${KELAS_SEL} font-mono`}>{row.kd_jenis_prw}</td>
                  <td className={KELAS_SEL}>{row.nm_perawatan}</td>
                  <td className={KELAS_SEL}>{row.nm_kategori}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.material)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.bhp)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.tarif_tindakandr)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.tarif_tindakanpr)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.kso)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.menejemen)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.total_byrdr)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.total_byrpr)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.total_byrdrpr)}</td>
                  <td className={KELAS_SEL}>{row.png_jawab}</td>
                  <td className={KELAS_SEL}>{row.nm_unit}</td>
                  {konfigurasi.punyaKelas && <td className={KELAS_SEL}>{row.kelas || "-"}</td>}
                  <td className={KELAS_SEL}>
                    <span className={row.status === "1" ? "text-secondary-700" : "text-slate-600"}>
                      {row.status === "1" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={() => {
          setPencarian(kataKunci);
          setHalaman(1);
        }}
        onSemua={() => {
          setKataKunci("");
          setPencarian("");
          setFilterStatus(tab === "sampah" ? "0" : "1");
          setFilterKategori("");
          setFilterUnit("");
          setFilterKelas("");
          setHalaman(1);
        }}
        placeholderCari={konfigurasi.placeholderCari}
        filterTambahan={filterTambahan}
        onSimpan={tab === "data" ? simpanBaru : undefined}
        onBaru={tab === "data" ? resetSemua : undefined}
        onGanti={tab === "data" ? simpanGanti : undefined}
        onHapus={tab === "data" ? () => setDialogHapus(true) : undefined}
        tombolTambahan={tab === "sampah" ? [{
          label: "Pulihkan",
          ikon: faRotateLeft,
          varian: "sekunder",
          onClick: () => setDialogPulihkan(true),
          disabled: !bisaPulihkan || menyimpan,
          tooltip: "Pulihkan tarif nonaktif terpilih",
        }] : []}
        disabledSimpan={menyimpan || !form.kd_jenis_prw || !form.nm_perawatan || !form.kd_kategori || !form.unit || !form.kd_pj}
        disabledGanti={!kodeLama || menyimpan}
        disabledHapus={!bisaNonaktifkan || menyimpan}
        jumlahRecord={total}
        pagination={pagination}
        memuat={memuat}
      />

      <KonfirmasiDialog
        terbuka={dialogHapus}
        judul={`Nonaktifkan ${konfigurasi.judul}`}
        pesan={`Nonaktifkan ${centang.size} tarif terpilih?`}
        subPesan="Tarif tidak dihapus permanen. Data dapat dipulihkan dari tab Data Sampah."
        onBatal={() => setDialogHapus(false)}
        onKonfirmasi={() => void ubahStatusTerpilih("0")}
        sedangMemproses={menyimpan}
      />
      <KonfirmasiDialog
        terbuka={dialogPulihkan}
        judul={`Pulihkan ${konfigurasi.judul}`}
        pesan={`Pulihkan ${centang.size} tarif nonaktif terpilih?`}
        subPesan="Tarif akan kembali aktif dan dapat dipakai transaksi setelah konfirmasi."
        onBatal={() => setDialogPulihkan(false)}
        onKonfirmasi={() => void ubahStatusTerpilih("1")}
        sedangMemproses={menyimpan}
      />
      <Toast message={toast?.pesan ?? null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

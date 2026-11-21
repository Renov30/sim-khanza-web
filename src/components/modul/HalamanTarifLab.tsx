"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faList, faRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { hitungTotalTarifLab } from "@/lib/tarif-lab/tarif";

interface OpsiApi {
  id: string;
  label: string;
}

interface OpsiTarifLab {
  kategori: OpsiApi[];
  penjab: OpsiApi[];
  kelas: OpsiApi[];
  status: OpsiApi[];
}

interface BarisTarifLab {
  kd_jenis_prw: string;
  nm_perawatan: string;
  bagian_rs: number | string;
  bhp: number | string;
  tarif_perujuk: number | string;
  tarif_tindakan_dokter: number | string;
  tarif_tindakan_petugas: number | string;
  kso: number | string;
  menejemen: number | string;
  total_byr: number | string;
  kd_pj: string;
  png_jawab: string;
  kelas: string;
  kategori: string;
  status: string;
}

interface FormTarifLab {
  kd_jenis_prw: string;
  nm_perawatan: string;
  bagian_rs: string;
  bhp: string;
  tarif_perujuk: string;
  tarif_tindakan_dokter: string;
  tarif_tindakan_petugas: string;
  kso: string;
  menejemen: string;
  kd_pj: string;
  kelas: string;
  kategori: string;
}

interface BarisTemplateLab {
  id_template: number;
  kd_jenis_prw: string;
  pemeriksaan: string;
  nilai_rujukan_ld: string;
  nilai_rujukan_la: string;
  nilai_rujukan_pd: string;
  nilai_rujukan_pa: string;
  urut: number | string;
}

interface FormTemplateLab {
  id_template: string;
  pemeriksaan: string;
  nilai_rujukan_ld: string;
  nilai_rujukan_la: string;
  nilai_rujukan_pd: string;
  nilai_rujukan_pa: string;
}

interface ResponsApi<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
  totalHalaman?: number;
}

type TabTarifLab = "data" | "sampah";

const TAB_TARIF_LAB: { id: TabTarifLab; label: string }[] = [
  { id: "data", label: "Data Tarif" },
  { id: "sampah", label: "Data Sampah" },
];

const OPSI_KOSONG: OpsiTarifLab = {
  kategori: [],
  penjab: [],
  kelas: [],
  status: [],
};

const KELAS_HEADER = "border-b border-r border-slate-200 px-2 py-2 text-left font-semibold";
const KELAS_SEL = "border-b border-r border-slate-100 px-2 py-1.5 text-slate-800";
const KELAS_INPUT = "h-7 w-full rounded-md border border-slate-300 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none";

const KOMPONEN_FORM: { kunci: keyof Pick<FormTarifLab,
  "bagian_rs" | "bhp" | "tarif_tindakan_dokter" | "tarif_tindakan_petugas" | "tarif_perujuk" | "kso" | "menejemen">; label: string }[] = [
  { kunci: "bagian_rs", label: "Jasa Rumah Sakit" },
  { kunci: "bhp", label: "Paket BHP" },
  { kunci: "tarif_tindakan_dokter", label: "Jasa Medis Dokter" },
  { kunci: "tarif_tindakan_petugas", label: "Jasa Medis Petugas" },
  { kunci: "tarif_perujuk", label: "Jasa Medis Perujuk" },
  { kunci: "kso", label: "KSO" },
  { kunci: "menejemen", label: "Menejemen" },
];

const RUJUKAN_TEMPLATE: { kunci: keyof Pick<FormTemplateLab,
  "nilai_rujukan_ld" | "nilai_rujukan_la" | "nilai_rujukan_pd" | "nilai_rujukan_pa">; label: string }[] = [
  { kunci: "nilai_rujukan_ld", label: "N.R. LD" },
  { kunci: "nilai_rujukan_la", label: "N.R. LA" },
  { kunci: "nilai_rujukan_pd", label: "N.R. PD" },
  { kunci: "nilai_rujukan_pa", label: "N.R. PA" },
];

function formTemplateAwal(): FormTemplateLab {
  return {
    id_template: "",
    pemeriksaan: "",
    nilai_rujukan_ld: "",
    nilai_rujukan_la: "",
    nilai_rujukan_pd: "",
    nilai_rujukan_pa: "",
  };
}

function formAwal(): FormTarifLab {
  return {
    kd_jenis_prw: "",
    nm_perawatan: "",
    bagian_rs: "0",
    bhp: "0",
    tarif_perujuk: "0",
    tarif_tindakan_dokter: "0",
    tarif_tindakan_petugas: "0",
    kso: "0",
    menejemen: "0",
    kd_pj: "",
    kelas: "-",
    kategori: "PK",
  };
}

function keOpsiSelect(daftar: OpsiApi[], placeholder?: string): SelectOption[] {
  const awal = placeholder ? [{ value: "", label: placeholder }] : [];
  return [...awal, ...daftar.map((item) => ({ value: item.id, label: item.label }))];
}

function isiFormDariBaris(row: BarisTarifLab): FormTarifLab {
  return {
    kd_jenis_prw: row.kd_jenis_prw,
    nm_perawatan: row.nm_perawatan,
    bagian_rs: String(row.bagian_rs ?? 0),
    bhp: String(row.bhp ?? 0),
    tarif_perujuk: String(row.tarif_perujuk ?? 0),
    tarif_tindakan_dokter: String(row.tarif_tindakan_dokter ?? 0),
    tarif_tindakan_petugas: String(row.tarif_tindakan_petugas ?? 0),
    kso: String(row.kso ?? 0),
    menejemen: String(row.menejemen ?? 0),
    kd_pj: row.kd_pj,
    kelas: row.kelas || "-",
    kategori: row.kategori || "PK",
  };
}

function badanFormulir(form: FormTarifLab) {
  return {
    kd_jenis_prw: form.kd_jenis_prw,
    nm_perawatan: form.nm_perawatan,
    bagian_rs: Number(form.bagian_rs),
    bhp: Number(form.bhp),
    tarif_perujuk: Number(form.tarif_perujuk),
    tarif_tindakan_dokter: Number(form.tarif_tindakan_dokter),
    tarif_tindakan_petugas: Number(form.tarif_tindakan_petugas),
    kso: Number(form.kso),
    menejemen: Number(form.menejemen),
    kd_pj: form.kd_pj,
    kelas: form.kelas,
    kategori: form.kategori,
  };
}

function totalFormulir(form: FormTarifLab) {
  return hitungTotalTarifLab({
    bagian_rs: Number(form.bagian_rs) || 0,
    bhp: Number(form.bhp) || 0,
    tarif_perujuk: Number(form.tarif_perujuk) || 0,
    tarif_tindakan_dokter: Number(form.tarif_tindakan_dokter) || 0,
    tarif_tindakan_petugas: Number(form.tarif_tindakan_petugas) || 0,
    kso: Number(form.kso) || 0,
    menejemen: Number(form.menejemen) || 0,
  });
}

function isiFormTemplate(row: BarisTemplateLab): FormTemplateLab {
  return {
    id_template: String(row.id_template ?? ""),
    pemeriksaan: row.pemeriksaan ?? "",
    nilai_rujukan_ld: row.nilai_rujukan_ld ?? "",
    nilai_rujukan_la: row.nilai_rujukan_la ?? "",
    nilai_rujukan_pd: row.nilai_rujukan_pd ?? "",
    nilai_rujukan_pa: row.nilai_rujukan_pa ?? "",
  };
}

function badanTemplate(form: FormTemplateLab, kode: string) {
  return {
    id_template: form.id_template,
    kd_jenis_prw: kode,
    pemeriksaan: form.pemeriksaan,
    nilai_rujukan_ld: form.nilai_rujukan_ld,
    nilai_rujukan_la: form.nilai_rujukan_la,
    nilai_rujukan_pd: form.nilai_rujukan_pd,
    nilai_rujukan_pa: form.nilai_rujukan_pa,
  };
}

function ringkasRujukanTemplate(row: BarisTemplateLab) {
  return [
    `LD ${row.nilai_rujukan_ld || "-"}`,
    `LA ${row.nilai_rujukan_la || "-"}`,
    `PD ${row.nilai_rujukan_pd || "-"}`,
    `PA ${row.nilai_rujukan_pa || "-"}`,
  ].join(" · ");
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

export function HalamanTarifLab() {
  const [tab, setTab] = useState<TabTarifLab>("data");
  const [opsi, setOpsi] = useState<OpsiTarifLab>(OPSI_KOSONG);
  const [form, setForm] = useState<FormTarifLab>(formAwal);
  const [kodeLama, setKodeLama] = useState<string | null>(null);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [centang, setCentang] = useState<Set<string>>(new Set());
  const [data, setData] = useState<BarisTarifLab[]>([]);
  const [kataKunci, setKataKunci] = useState("");
  const [pencarian, setPencarian] = useState("");
  const [filterStatus, setFilterStatus] = useState("1");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [memuat, setMemuat] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const [dialogHapus, setDialogHapus] = useState(false);
  const [dialogPulihkan, setDialogPulihkan] = useState(false);
  const [tampilTemplate, setTampilTemplate] = useState(false);
  const [dataTemplate, setDataTemplate] = useState<BarisTemplateLab[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplateLab>(formTemplateAwal);
  const [memuatTemplate, setMemuatTemplate] = useState(false);
  const [menyimpanTemplate, setMenyimpanTemplate] = useState(false);
  const [dialogHapusTemplate, setDialogHapusTemplate] = useState(false);

  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({
        cari: pencarian,
        status: tab === "sampah" ? "0" : filterStatus,
        kelas: filterKelas,
        kategori: filterKategori,
        page: String(halaman),
        limit: "50",
      });
      const response = await fetch(`/api/tarif-lab?${params.toString()}`, { cache: "no-store" });
      const hasil = await bacaRespons<BarisTarifLab[]>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Gagal memuat data tarif laboratorium.");
      }
      setData(hasil.data ?? []);
      setTotal(hasil.total ?? 0);
      setTotalHalaman(hasil.totalHalaman ?? 1);
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    } finally {
      setMemuat(false);
    }
  }, [tab, pencarian, filterStatus, filterKelas, filterKategori, halaman]);

  const muatKodeBaru = useCallback(async () => {
    try {
      const response = await fetch("/api/tarif-lab/kode", { cache: "no-store" });
      const hasil = await bacaRespons<{ kd_jenis_prw: string }>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Gagal membuat kode tarif laboratorium.");
      }
      const kode = hasil.data?.kd_jenis_prw ?? "";
      setForm((sebelumnya) => ({ ...sebelumnya, kd_jenis_prw: kode }));
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    }
  }, []);

  const muatTemplate = useCallback(async () => {
    if (!kodeLama) return;
    setMemuatTemplate(true);
    try {
      const params = new URLSearchParams({ kd_jenis_prw: kodeLama });
      const response = await fetch(`/api/tarif-lab/template?${params.toString()}`, { cache: "no-store" });
      const hasil = await bacaRespons<BarisTemplateLab[]>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Gagal memuat item pemeriksaan.");
      }
      setDataTemplate(hasil.data ?? []);
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    } finally {
      setMemuatTemplate(false);
    }
  }, [kodeLama]);

  useEffect(() => {
    const controller = new AbortController();
    async function muatOpsi() {
      try {
        const response = await fetch("/api/tarif-lab/options", {
          signal: controller.signal,
          cache: "no-store",
        });
        const hasil = await bacaRespons<OpsiTarifLab>(response);
        if (!response.ok || !hasil.success) {
          throw new Error(hasil.error || "Gagal memuat pilihan tarif laboratorium.");
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
  }, [muatKodeBaru]);

  useEffect(() => {
    let aktif = true;
    queueMicrotask(() => {
      if (aktif) void muatData();
    });
    return () => {
      aktif = false;
    };
  }, [muatData]);

  useEffect(() => {
    if (!tampilTemplate || !kodeLama) return;
    let aktif = true;
    queueMicrotask(() => {
      if (aktif) void muatTemplate();
    });
    return () => {
      aktif = false;
    };
  }, [tampilTemplate, kodeLama, muatTemplate]);

  const opsiKategori = useMemo(() => keOpsiSelect(opsi.kategori), [opsi.kategori]);
  const opsiPenjab = useMemo(() => keOpsiSelect(opsi.penjab, "Pilih jenis bayar..."), [opsi.penjab]);
  const opsiKelas = useMemo(() => keOpsiSelect(opsi.kelas), [opsi.kelas]);
  const opsiKategoriFilter = useMemo(() => keOpsiSelect(opsi.kategori, "Semua kategori"), [opsi.kategori]);
  const opsiKelasFilter = useMemo(() => keOpsiSelect(opsi.kelas, "Semua kelas"), [opsi.kelas]);
  const opsiStatusFilter = useMemo(
    () => [
      { value: "semua", label: "Semua status" },
      ...opsi.status.map((item) => ({ value: item.id, label: item.label })),
    ],
    [opsi.status],
  );

  function aturForm(perubahan: Partial<FormTarifLab>) {
    setForm((sebelumnya) => ({ ...sebelumnya, ...perubahan }));
  }

  function tutupTemplate() {
    setTampilTemplate(false);
    setDataTemplate([]);
    setFormTemplate(formTemplateAwal());
    setDialogHapusTemplate(false);
  }

  function bukaTemplate() {
    if (!bisaTemplate) {
      setToast({ pesan: "Pilih tarif kategori PK atau MB terlebih dahulu.", tipe: "info" });
      return;
    }
    setFormTemplate(formTemplateAwal());
    setTampilTemplate(true);
  }

  function aturFormTemplate(perubahan: Partial<FormTemplateLab>) {
    setFormTemplate((sebelumnya) => ({ ...sebelumnya, ...perubahan }));
  }

  function pilihTab(tujuan: TabTarifLab) {
    if (tujuan === tab) return;
    setTab(tujuan);
    setTerpilih(null);
    setCentang(new Set());
    setDialogHapus(false);
    setDialogPulihkan(false);
    tutupTemplate();
    setKataKunci("");
    setPencarian("");
    setFilterStatus("1");
    setFilterKelas("");
    setFilterKategori("");
    setHalaman(1);
  }

  function pindahTabDenganKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, indeks: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const indeksTujuan = event.key === "Home"
      ? 0
      : event.key === "End"
        ? TAB_TARIF_LAB.length - 1
        : event.key === "ArrowRight"
          ? (indeks + 1) % TAB_TARIF_LAB.length
          : (indeks - 1 + TAB_TARIF_LAB.length) % TAB_TARIF_LAB.length;
    const tujuan = TAB_TARIF_LAB[indeksTujuan].id;
    pilihTab(tujuan);
    document.getElementById(`tarif-lab-tab-${tujuan}`)?.focus();
  }

  function resetFormulir() {
    setForm(formAwal());
    setKodeLama(null);
    setTerpilih(null);
    setCentang(new Set());
    tutupTemplate();
  }

  function resetSemua() {
    resetFormulir();
    setTab("data");
    setKataKunci("");
    setPencarian("");
    setFilterStatus("1");
    setFilterKelas("");
    setFilterKategori("");
    setHalaman(1);
    setDialogHapus(false);
    setDialogPulihkan(false);
    void muatKodeBaru();
  }

  function pilihBaris(row: BarisTarifLab) {
    if (tab === "sampah") {
      ubahCentang(row.kd_jenis_prw);
      return;
    }
    setTerpilih(row.kd_jenis_prw);
    setForm(isiFormDariBaris(row));
    setKodeLama(row.kd_jenis_prw);
    setCentang(new Set([row.kd_jenis_prw]));
    setFormTemplate(formTemplateAwal());
    if (row.kategori !== "PK" && row.kategori !== "MB" && tampilTemplate) {
      tutupTemplate();
      setToast({ pesan: "Template Laboratorium hanya untuk kategori PK dan MB.", tipe: "info" });
    }
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
      const response = await fetch("/api/tarif-lab", {
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
      (hasil) => hasil.message || "Tarif laboratorium berhasil disimpan.",
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
      (hasil) => hasil.message || "Tarif laboratorium berhasil diperbarui.",
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

  async function kirimTemplate(method: string, isi: unknown, pesanSukses: (hasil: ResponsApi<unknown>) => string) {
    setMenyimpanTemplate(true);
    try {
      const response = await fetch("/api/tarif-lab/template", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isi),
      });
      const hasil = await bacaRespons<unknown>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Permintaan item pemeriksaan gagal diproses.");
      }
      setToast({ pesan: pesanSukses(hasil), tipe: "sukses" });
      return true;
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
      return false;
    } finally {
      setMenyimpanTemplate(false);
    }
  }

  async function simpanTemplate() {
    if (!kodeLama) {
      setToast({ pesan: "Pilih tarif laboratorium terlebih dahulu.", tipe: "info" });
      return;
    }
    if (!formTemplate.pemeriksaan.trim()) {
      setToast({ pesan: "Nama item pemeriksaan wajib diisi.", tipe: "info" });
      return;
    }
    const berhasil = await kirimTemplate(
      formTemplate.id_template ? "PUT" : "POST",
      badanTemplate(formTemplate, kodeLama),
      (hasil) => hasil.message || "Item pemeriksaan berhasil disimpan.",
    );
    if (berhasil) {
      setFormTemplate(formTemplateAwal());
      await muatTemplate();
    }
  }

  async function hapusTemplate() {
    if (!kodeLama || !formTemplate.id_template) {
      setToast({ pesan: "Pilih item pemeriksaan yang akan dihapus.", tipe: "info" });
      return;
    }
    const berhasil = await kirimTemplate(
      "DELETE",
      { kd_jenis_prw: kodeLama, id_template: Number(formTemplate.id_template) },
      (hasil) => hasil.message || "Item pemeriksaan berhasil dihapus.",
    );
    if (berhasil) {
      setDialogHapusTemplate(false);
      setFormTemplate(formTemplateAwal());
      await muatTemplate();
    }
  }

  const dipilih = data.filter((row) => centang.has(row.kd_jenis_prw));
  const bisaNonaktifkan = dipilih.length > 0 && dipilih.every((row) => row.status === "1");
  const bisaPulihkan = dipilih.length > 0 && dipilih.every((row) => row.status === "0");
  const bisaTemplate = tab === "data" && Boolean(kodeLama) && (form.kategori === "PK" || form.kategori === "MB");
  const semuaTercecentang = data.length > 0 && data.every((row) => centang.has(row.kd_jenis_prw));
  const captionTabel = tab === "sampah"
    ? "Tarif laboratorium nonaktif yang dapat dipulihkan"
    : "Daftar tarif pemeriksaan laboratorium";
  const pesanKosong = tab === "sampah"
    ? "Tidak ada tarif di tempat sampah."
    : "Tidak ada tarif yang ditampilkan.";
  const header = [
    "Kode Periksa",
    "Nama Pemeriksaan",
    "J.S. RS",
    "Paket BHP",
    "J.M. Perujuk",
    "J.M. Dokter",
    "J.M. Petugas",
    "KSO",
    "Menejemen",
    "Total Tarif",
    "Jenis Bayar",
    "Kelas",
    "Kategori",
    "Status",
  ];

  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-1.5">
      {tab === "data" && (
        <CustomSelect
          aria-label="Filter status tarif laboratorium"
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
        aria-label="Filter kategori tarif laboratorium"
        containerClassName="w-36"
        options={opsiKategoriFilter}
        value={filterKategori}
        onChange={(event) => {
          setFilterKategori(event.target.value);
          setHalaman(1);
        }}
      />
      <CustomSelect
        aria-label="Filter kelas tarif laboratorium"
        containerClassName="w-40"
        options={opsiKelasFilter}
        value={filterKelas}
        onChange={(event) => {
          setFilterKelas(event.target.value);
          setHalaman(1);
        }}
      />
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
        judul=".: Input Tarif Laboratorium"
        idPenyimpanan="tarif-lab-form"
        onSimpan={simpanBaru}
        onBaru={resetSemua}
        sedangMenyimpan={menyimpan}
      >
        <GridFormulirModul tampilkanKolomCadangan={false}>
          <div className="space-y-1">
            <label htmlFor="tarif-lab-kode" className="block text-xs font-semibold text-slate-700">Kode Periksa</label>
            <input
              id="tarif-lab-kode"
              value={form.kd_jenis_prw}
              maxLength={15}
              onChange={(event) => aturForm({ kd_jenis_prw: event.target.value })}
              className={`${KELAS_INPUT} font-mono uppercase`}
              aria-label="Kode periksa laboratorium"
            />
          </div>
          <div className="space-y-1 lg:col-span-2">
            <label htmlFor="tarif-lab-nama" className="block text-xs font-semibold text-slate-700">Nama Pemeriksaan</label>
            <input
              id="tarif-lab-nama"
              value={form.nm_perawatan}
              maxLength={80}
              onChange={(event) => aturForm({ nm_perawatan: event.target.value })}
              className={KELAS_INPUT}
              aria-label="Nama pemeriksaan laboratorium"
            />
          </div>
          {KOMPONEN_FORM.map(({ kunci, label }) => (
            <div className="space-y-1" key={kunci}>
              <label htmlFor={`tarif-lab-${kunci}`} className="block text-xs font-semibold text-slate-700">{label}</label>
              <input
                id={`tarif-lab-${kunci}`}
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
            <span className="block text-xs font-semibold text-slate-700">Total Biaya Laborat</span>
            <output className="block rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-right font-mono text-xs text-slate-800">
              {rupiah(totalFormulir(form))}
            </output>
          </div>
          <div className="space-y-1">
            <label htmlFor="tarif-lab-penjab" className="block text-xs font-semibold text-slate-700">Jenis Bayar</label>
            <CustomSelect
              id="tarif-lab-penjab"
              options={opsiPenjab}
              value={form.kd_pj}
              onChange={(event) => aturForm({ kd_pj: event.target.value })}
              aria-label="Jenis bayar"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="tarif-lab-kelas" className="block text-xs font-semibold text-slate-700">Kelas</label>
            <CustomSelect
              id="tarif-lab-kelas"
              options={opsiKelas}
              value={form.kelas}
              onChange={(event) => aturForm({ kelas: event.target.value })}
              aria-label="Kelas tarif laboratorium"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="tarif-lab-kategori" className="block text-xs font-semibold text-slate-700">Kategori</label>
            <CustomSelect
              id="tarif-lab-kategori"
              options={opsiKategori}
              value={form.kategori}
              onChange={(event) => aturForm({ kategori: event.target.value })}
              aria-label="Kategori tarif laboratorium"
            />
          </div>
        </GridFormulirModul>
      </PanelInputData>

      <div className="flex min-h-0 flex-1 gap-2.5 overflow-hidden">
      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Jenis data tarif laboratorium" className="flex shrink-0 border-b border-slate-200 bg-slate-50">
          {TAB_TARIF_LAB.map((item, indeks) => (
            <button
              key={item.id}
              id={`tarif-lab-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`tarif-lab-panel-${item.id}`}
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
          id={`tarif-lab-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tarif-lab-tab-${tab}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto"
        >
          <table className="w-full min-w-[1650px] border-collapse text-[11px]">
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
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.bagian_rs)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.bhp)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.tarif_perujuk)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.tarif_tindakan_dokter)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.tarif_tindakan_petugas)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.kso)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.menejemen)}</td>
                  <td className={`${KELAS_SEL} text-right font-mono`}>{rupiah(row.total_byr)}</td>
                  <td className={KELAS_SEL}>{row.png_jawab}</td>
                  <td className={KELAS_SEL}>{row.kelas}</td>
                  <td className={KELAS_SEL}>{row.kategori}</td>
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

      {tampilTemplate && (
        <aside aria-label="Item pemeriksaan laboratorium" className="flex w-80 shrink-0 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm sm:w-[22rem]">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-2 py-2">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800">Item Pemeriksaan</div>
              <div className="truncate font-mono text-[10px] text-slate-600">{kodeLama} {form.nm_perawatan}</div>
            </div>
            <button
              type="button"
              onClick={tutupTemplate}
              aria-label="Tutup item pemeriksaan"
              title="Tutup item pemeriksaan"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-2">
            <div className="space-y-2">
              <div className="space-y-1">
                <label htmlFor="tarif-lab-template-id" className="block text-[10px] font-semibold text-slate-600">ID Template</label>
                <input
                  id="tarif-lab-template-id"
                  value={formTemplate.id_template || "Otomatis setelah disimpan"}
                  readOnly
                  className={`${KELAS_INPUT} cursor-default bg-slate-50 font-mono text-[11px]`}
                  aria-label="ID template laboratorium"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="tarif-lab-template-pemeriksaan" className="block text-[10px] font-semibold text-slate-600">Pemeriksaan</label>
                <input
                  id="tarif-lab-template-pemeriksaan"
                  value={formTemplate.pemeriksaan}
                  maxLength={200}
                  onChange={(event) => aturFormTemplate({ pemeriksaan: event.target.value })}
                  className={KELAS_INPUT}
                  aria-label="Nama item pemeriksaan"
                />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {RUJUKAN_TEMPLATE.map(({ kunci, label }) => (
                  <div className="space-y-1" key={kunci}>
                    <label htmlFor={`tarif-lab-template-${kunci}`} className="block text-[10px] font-semibold text-slate-600">{label}</label>
                    <input
                      id={`tarif-lab-template-${kunci}`}
                      value={formTemplate[kunci]}
                      maxLength={30}
                      onChange={(event) => aturFormTemplate({ [kunci]: event.target.value })}
                      className={KELAS_INPUT}
                      aria-label={label}
                    />
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-md border border-slate-200">
                <table className="w-full border-collapse text-[10px]">
                  <caption className="sr-only">Daftar item template pemeriksaan laboratorium</caption>
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th scope="col" className={`${KELAS_HEADER} w-12 text-right`}>ID</th>
                      <th scope="col" className={KELAS_HEADER}>Pemeriksaan</th>
                      <th scope="col" className={KELAS_HEADER}>Nilai Rujukan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memuatTemplate && dataTemplate.length === 0 && (
                      <tr><td colSpan={3} className={`${KELAS_SEL} text-center`}>Memuat item...</td></tr>
                    )}
                    {!memuatTemplate && dataTemplate.length === 0 && (
                      <tr><td colSpan={3} className={`${KELAS_SEL} text-center`}>Belum ada item template.</td></tr>
                    )}
                    {dataTemplate.map((row) => (
                      <tr
                        key={row.id_template}
                        onClick={() => setFormTemplate(isiFormTemplate(row))}
                        className={`cursor-pointer ${formTemplate.id_template === String(row.id_template) ? "bg-primary-50/60" : "even:bg-slate-50/70"}`}
                      >
                        <td className={`${KELAS_SEL} text-right font-mono`}>{row.id_template}</td>
                        <td className={KELAS_SEL}>{row.pemeriksaan}</td>
                        <td className={`${KELAS_SEL} font-mono`}>{ringkasRujukanTemplate(row)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 border-t border-slate-200 bg-slate-50 p-2">
            <button
              type="button"
              onClick={() => void simpanTemplate()}
              disabled={menyimpanTemplate || !formTemplate.pemeriksaan.trim()}
              className="h-7 rounded-md bg-primary-700 px-2.5 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setFormTemplate(formTemplateAwal())}
              disabled={menyimpanTemplate}
              className="h-7 rounded-md border border-slate-300 bg-white px-2.5 text-[11px] font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Baru
            </button>
            <button
              type="button"
              onClick={() => setDialogHapusTemplate(true)}
              disabled={menyimpanTemplate || !formTemplate.id_template}
              className="ml-auto h-7 rounded-md border border-red-200 bg-red-50 px-2.5 text-[11px] font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Hapus
            </button>
          </div>
        </aside>
      )}
      </div>

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
          setFilterKelas("");
          setFilterKategori("");
          setHalaman(1);
        }}
        placeholderCari="Cari kode, nama pemeriksaan, jenis bayar, kelas, atau kategori..."
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
          tooltip: "Pulihkan tarif laboratorium nonaktif terpilih",
        }] : [{
          label: "Item Pemeriksaan",
          ikon: faList,
          varian: "primer",
          onClick: bukaTemplate,
          disabled: !bisaTemplate || menyimpan,
          tooltip: bisaTemplate
            ? "Buka item template pemeriksaan tarif terpilih"
            : "Pilih tarif kategori PK atau MB terlebih dahulu",
        }]}
        disabledSimpan={menyimpan || !form.kd_jenis_prw || !form.nm_perawatan || !form.kd_pj}
        disabledGanti={!kodeLama || menyimpan}
        disabledHapus={!bisaNonaktifkan || menyimpan}
        jumlahRecord={total}
        pagination={pagination}
        memuat={memuat}
      />

      <KonfirmasiDialog
        terbuka={dialogHapus}
        judul="Nonaktifkan tarif laboratorium"
        pesan={`Nonaktifkan ${centang.size} tarif terpilih?`}
        subPesan="Tarif tidak dihapus permanen. Data dapat dipulihkan dari tab Data Sampah."
        onBatal={() => setDialogHapus(false)}
        onKonfirmasi={() => void ubahStatusTerpilih("0")}
        sedangMemproses={menyimpan}
      />
      <KonfirmasiDialog
        terbuka={dialogPulihkan}
        judul="Pulihkan tarif laboratorium"
        pesan={`Pulihkan ${centang.size} tarif nonaktif terpilih?`}
        subPesan="Tarif akan kembali aktif dan dapat dipakai transaksi setelah konfirmasi."
        onBatal={() => setDialogPulihkan(false)}
        onKonfirmasi={() => void ubahStatusTerpilih("1")}
        sedangMemproses={menyimpan}
      />
      <KonfirmasiDialog
        terbuka={dialogHapusTemplate}
        judul="Hapus item template"
        pesan={`Hapus item pemeriksaan ID ${formTemplate.id_template || "-"} (${formTemplate.pemeriksaan || "tanpa nama"})?`}
        subPesan="Item yang sudah dipakai transaksi dapat gagal dihapus atau menghapus data turunan terkait. Periksa kembali sebelum melanjutkan."
        onBatal={() => setDialogHapusTemplate(false)}
        onKonfirmasi={() => void hapusTemplate()}
        sedangMemproses={menyimpanTemplate}
      />
      <Toast message={toast?.pesan ?? null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

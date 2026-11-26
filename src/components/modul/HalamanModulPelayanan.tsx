"use client";

import React, { useCallback, useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faMagnifyingGlassPlus, faReceipt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah, type TombolAksiCustom } from "@/components/modul/PanelBawah";
import { MenuKonteksTabel, type ItemMenuKonteksTabel } from "@/components/modul/MenuKonteksTabel";
import { bukaTabCetakJasper, bukaTabCetakUrl } from "@/lib/cetak/jasper-web";
import type { AsetLokalis } from "@/lib/modul/aset-lokalis";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { pindahFieldDenganEnter } from "@/lib/formulir/pindah-field";
import { registrationDate } from "@/lib/registrasi/date";

export interface OpsiSelect {
  value: string;
  label: string;
}

export interface KolomTabelPelayanan {
  kunci: string;
  label: string;
  tipe?: "teks" | "mono" | "uang" | "status";
  align?: "left" | "center" | "right";
  lebarMin?: string;
}

export interface FieldFormPelayanan {
  nama: string;
  label: string;
  tipe: "text" | "number" | "date" | "time" | "textarea" | "select";
  wajib?: boolean;
  readOnlySaatEdit?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
  opsiKey?: string;
  opsiStatis?: readonly OpsiSelect[];
  kolom?: 1 | 2;
}

export interface FilterSelectPelayanan {
  param: string;
  label: string;
  opsiKey: string;
  opsiStatis?: readonly OpsiSelect[];
  lebar?: string;
}

export interface KonfigurasiHalamanPelayanan {
  id: string;
  caption: string;
  endpoint: string;
  pakaiPeriode?: boolean;
  placeholderCari?: string;
  minWidthTabel?: string;
  kolom: readonly KolomTabelPelayanan[];
  kunciBaris: (baris: Record<string, unknown>) => string;
  filterSelect?: readonly FilterSelectPelayanan[];
  form?: {
    judulPanel?: string;
    fields: readonly FieldFormPelayanan[];
    bisaTambah?: boolean;
    bisaUbah?: boolean;
    bisaHapus?: boolean;
    kunciHapusParams?: (baris: Record<string, unknown>) => Record<string, string>;
    labelHapus?: (baris: Record<string, unknown>) => string;
    mapBarisKeForm?: (baris: Record<string, unknown>) => Record<string, string>;
  };
  ringkasanKartu?: readonly {
    kunci: string;
    label: string;
    tipe?: "angka" | "uang";
  }[];
  gambarReferensi?: readonly AsetLokalis[];
  detailBilling?: boolean;
}

type ResponsDaftarApi = {
  success: boolean;
  data?: Record<string, unknown>[];
  total?: number;
  totalHalaman?: number;
  ringkasan?: Record<string, number>;
  opsi?: Record<string, OpsiSelect[]>;
  peringatan?: string;
  error?: string;
};

type DetailBillingData = {
  no_rawat: string;
  nota: Record<string, unknown> | null;
  pembayaran: Record<string, unknown>[];
  items: Record<string, unknown>[];
};

function formatUang(nilai: unknown): string {
  const num = Number(nilai || 0);
  if (!Number.isFinite(num)) return "0";
  return new Intl.NumberFormat("id-ID").format(Math.round(num));
}

function kelasStatusBadge(nilai: string): string {
  const lower = nilai.toLowerCase();
  if (
    lower.includes("kosong") ||
    lower.includes("selesai") ||
    lower.includes("diterima") ||
    lower.includes("sudah bayar") ||
    lower.includes("sudah masuk") ||
    lower.includes("terdaftar") ||
    lower.includes("sesuai antrian") ||
    lower.includes("bukan ketiganya")
  ) {
    return "border-secondary-300 bg-secondary-50 text-tertiary-900";
  }
  if (
    lower.includes("batal") ||
    lower.includes("ditolak") ||
    lower.includes("berhalangan") ||
    lower === "igd" ||
    lower === "pdp" ||
    lower === "odp" ||
    lower === "isi"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }
  if (lower.includes("proses") || lower.includes("dibooking") || lower.includes("rujuk")) {
    return "border-primary-200 bg-primary-50 text-primary-800";
  }
  return "border-slate-200 bg-slate-100 text-slate-700";
}

function bacaKonteksUrl(): { cari: string; noRawat: string; noRm: string } {
  if (typeof window === "undefined") return { cari: "", noRawat: "", noRm: "" };
  const sp = new URLSearchParams(window.location.search);
  const noRawat = (sp.get("no_rawat") || "").trim();
  const noRm = (sp.get("no_rkm_medis") || "").trim();
  const cari = (sp.get("cari") || noRawat || noRm || "").trim();
  return { cari, noRawat, noRm };
}

function buatNilaiAwalForm(
  fields: readonly FieldFormPelayanan[] | undefined,
  konteks?: { noRawat: string; noRm: string },
): Record<string, string> {
  const hasil: Record<string, string> = {};
  if (!fields) return hasil;
  const hariIni = registrationDate();
  for (const f of fields) {
    if (konteks?.noRawat && f.nama === "no_rawat") {
      hasil[f.nama] = konteks.noRawat;
    } else if (konteks?.noRm && f.nama === "no_rkm_medis") {
      hasil[f.nama] = konteks.noRm;
    } else if (f.defaultValue !== undefined) {
      hasil[f.nama] =
        f.defaultValue === "__TODAY__"
          ? hariIni
          : f.defaultValue === "__NOW__"
            ? `${hariIni} 08:00:00`
            : f.defaultValue;
    } else if (f.tipe === "date") {
      hasil[f.nama] = hariIni;
    } else if (f.tipe === "time") {
      hasil[f.nama] = "08:00:00";
    } else {
      hasil[f.nama] = "";
    }
  }
  return hasil;
}

const FieldFormItem = React.memo(function FieldFormItem({
  configId,
  field,
  value,
  disabled,
  opsi,
  onChangeField,
}: {
  configId: string;
  field: FieldFormPelayanan;
  value: string;
  disabled: boolean;
  opsi: readonly OpsiSelect[];
  onChangeField: (nama: string, val: string) => void;
}) {
  const id = `${configId}-${field.nama}`;
  return (
    <div className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-slate-700">
        {field.label}
        {field.wajib ? <span className="ml-0.5 text-red-600">*</span> : null}
      </label>
      {field.tipe === "select" ? (
        <CustomSelect
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChangeField(field.nama, e.target.value)}
          containerClassName="relative w-full"
          className="h-7 py-0.5 pr-8 text-xs"
        >
          <option value="">-- Pilih {field.label} --</option>
          {opsi.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </CustomSelect>
      ) : field.tipe === "textarea" ? (
        <textarea
          id={id}
          value={value}
          disabled={disabled}
          maxLength={field.maxLength}
          rows={2}
          placeholder={field.placeholder}
          onChange={(e) => onChangeField(field.nama, e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:border-primary-600 focus:outline-none disabled:bg-slate-100"
        />
      ) : (
        <input
          id={id}
          type={field.tipe}
          value={value}
          disabled={disabled}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          onChange={(e) => onChangeField(field.nama, e.target.value)}
          className="h-7 w-full rounded-md border border-slate-300 bg-white px-2 text-xs tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none disabled:bg-slate-100"
        />
      )}
    </div>
  );
});

const TabelDataPelayanan = React.memo(function TabelDataPelayanan({
  caption,
  minWidthTabel,
  kolom,
  memuat,
  data,
  kunciTerpilih,
  kunciBaris,
  onPilihBaris,
  onKonteksBaris,
}: {
  caption: string;
  minWidthTabel?: string;
  kolom: readonly KolomTabelPelayanan[];
  memuat: boolean;
  data: readonly Record<string, unknown>[];
  kunciTerpilih: string | null;
  kunciBaris: (baris: Record<string, unknown>) => string;
  onPilihBaris: (baris: Record<string, unknown>) => void;
  onKonteksBaris: (e: ReactMouseEvent<HTMLTableRowElement>, baris: Record<string, unknown>) => void;
}) {
  return (
    <table
      className="w-full border-collapse text-left text-[11px] text-slate-700"
      style={{ minWidth: minWidthTabel || "64rem" }}
    >
      <caption className="sr-only">{caption}</caption>
      <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
        <tr>
          {kolom.map((k) => (
            <th
              key={k.kunci}
              scope="col"
              className={`whitespace-nowrap border-b border-slate-200 px-2 py-2 font-semibold ${
                k.align === "right" ? "text-right" : k.align === "left" ? "text-left" : "text-center"
              }`}
            >
              {k.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {memuat ? (
          <tr>
            <td colSpan={kolom.length} className="h-36 border-0 text-center text-slate-500">
              Memuat data...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={kolom.length} className="h-44 border-0 text-center text-slate-400">
              <FontAwesomeIcon icon={faFolderOpen} className="mb-2 h-7 w-7 text-slate-300" />
              <p>Tidak ada data yang sesuai dengan filter.</p>
            </td>
          </tr>
        ) : (
          data.map((baris, idx) => {
            const kb = kunciBaris(baris);
            const kunci = `${kb}__${idx}`;
            const aktif = kunciTerpilih !== null && kunciTerpilih === kb;
            return (
              <tr
                key={kunci}
                onClick={() => onPilihBaris(baris)}
                onContextMenu={(e) => onKonteksBaris(e, baris)}
                className={`cursor-pointer ${aktif ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}`}
              >
                {kolom.map((k) => {
                  const mentah = baris[k.kunci];
                  const str = mentah === null || mentah === undefined || mentah === "" ? "-" : String(mentah);
                  const alignCls =
                    k.align === "right" ? "text-right" : k.align === "center" ? "text-center" : "text-left";
                  if (k.tipe === "uang") {
                    return (
                      <td key={k.kunci} className={`whitespace-nowrap px-2 py-1.5 font-mono tabular-nums ${alignCls}`}>
                        {formatUang(mentah)}
                      </td>
                    );
                  }
                  if (k.tipe === "mono") {
                    return (
                      <td key={k.kunci} className={`whitespace-nowrap px-2 py-1.5 font-mono tabular-nums ${alignCls}`}>
                        {str}
                      </td>
                    );
                  }
                  if (k.tipe === "status") {
                    return (
                      <td key={k.kunci} className={`whitespace-nowrap px-2 py-1.5 ${alignCls}`}>
                        <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold ${kelasStatusBadge(str)}`}>
                          {str}
                        </span>
                      </td>
                    );
                  }
                  return (
                    <td key={k.kunci} className={`px-2 py-1.5 text-slate-800 ${alignCls}`}>
                      {str}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
});

const OPSI_KOSONG: readonly OpsiSelect[] = [];

export function HalamanModulPelayanan({ config }: { config: KonfigurasiHalamanPelayanan }) {
  const router = useRouter();
  const [siapMuat, setSiapMuat] = useState(false);
  const [menuKonteks, setMenuKonteks] = useState<{ x: number; y: number; baris: Record<string, unknown> } | null>(null);
  const [gambarZoom, setGambarZoom] = useState<AsetLokalis | null>(null);
  const [konteksUrl, setKonteksUrl] = useState<{ cari: string; noRawat: string; noRm: string }>({
    cari: "",
    noRawat: "",
    noRm: "",
  });
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);

  const [tanggalMulai, setTanggalMulai] = useState(() => (config.pakaiPeriode ? registrationDate() : ""));
  const [tanggalSelesai, setTanggalSelesai] = useState(() => (config.pakaiPeriode ? registrationDate() : ""));
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciAktif, setKataKunciAktif] = useState("");
  const [filterEkstra, setFilterEkstra] = useState<Record<string, string>>({});
  const [opsiServer, setOpsiServer] = useState<Record<string, OpsiSelect[]>>({});
  const [ringkasan, setRingkasan] = useState<Record<string, number>>({});
  const [versiMuat, setVersiMuat] = useState(0);

  const [terpilih, setTerpilih] = useState<Record<string, unknown> | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>(() =>
    buatNilaiAwalForm(config.form?.fields),
  );
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const [detailBilling, setDetailBilling] = useState<DetailBillingData | null>(null);
  const [memuatDetail, setMemuatDetail] = useState(false);

  useEffect(() => {
    const awal = bacaKonteksUrl();
    const timer = window.setTimeout(() => {
      if (awal.cari || awal.noRawat || awal.noRm) {
        setKonteksUrl(awal);
        if (awal.cari) {
          setKataKunci(awal.cari);
          setKataKunciAktif(awal.cari);
          if (config.pakaiPeriode) {
            setTanggalMulai("");
            setTanggalSelesai("");
          }
        }
        if (config.form?.fields && (awal.noRawat || awal.noRm)) {
          setFormValues(buatNilaiAwalForm(config.form.fields, awal));
        }
      }
      setSiapMuat(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [config.form?.fields, config.pakaiPeriode]);

  const kunciTerpilih = terpilih ? config.kunciBaris(terpilih) : null;

  useEffect(() => {
    const berikutnya = kataKunci.trim();
    if (berikutnya === kataKunciAktif) return;
    const timer = window.setTimeout(() => {
      setKataKunciAktif(berikutnya);
      setHalaman(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [kataKunci, kataKunciAktif]);

  const muatData = useCallback(
    async (signal?: AbortSignal) => {
      setMemuat(true);
      try {
        const params = new URLSearchParams({ page: String(halaman), limit: "50" });
        if (config.pakaiPeriode && tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
        if (config.pakaiPeriode && tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
        if (kataKunciAktif) params.set("cari", kataKunciAktif);
        for (const [k, v] of Object.entries(filterEkstra)) {
          if (v) params.set(k, v);
        }

        const res = await fetch(`${config.endpoint}?${params.toString()}`, {
          signal,
          cache: "no-store",
        });
        const json = (await res.json()) as ResponsDaftarApi;
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Gagal memuat data modul.");
        }
        setData(json.data || []);
        setTotal(Number(json.total ?? 0));
        setTotalHalaman(Number(json.totalHalaman ?? 1));
        if (json.ringkasan) setRingkasan(json.ringkasan);
        if (json.opsi) setOpsiServer(json.opsi);
        if (json.peringatan) setToast({ pesan: json.peringatan, tipe: "info" });
      } catch (error) {
        if (!signal?.aborted) {
          setToast({
            pesan: error instanceof Error ? error.message : "Gagal memuat data modul.",
            tipe: "error",
          });
        }
      } finally {
        if (!signal?.aborted) setMemuat(false);
      }
    },
    [config.endpoint, config.pakaiPeriode, filterEkstra, halaman, kataKunciAktif, tanggalMulai, tanggalSelesai],
  );

  useEffect(() => {
    if (!siapMuat) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void muatData(controller.signal);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, siapMuat, versiMuat]);

  const resetForm = useCallback(() => {
    setTerpilih(null);
    setFormValues(buatNilaiAwalForm(config.form?.fields, konteksUrl));
    setDetailBilling(null);
  }, [config.form?.fields, konteksUrl]);

  const pilihBaris = useCallback((baris: Record<string, unknown>) => {
    const kunci = config.kunciBaris(baris);
    if (kunciTerpilih === kunci) {
      resetForm();
      return;
    }
    setTerpilih(baris);
    if (config.form) {
      if (config.form.mapBarisKeForm) {
        setFormValues(config.form.mapBarisKeForm(baris));
      } else {
        const nilaiBaru: Record<string, string> = {};
        for (const f of config.form.fields) {
          const val = baris[f.nama];
          nilaiBaru[f.nama] = val === null || val === undefined ? "" : String(val);
        }
        setFormValues(nilaiBaru);
      }
    }
  }, [config, kunciTerpilih, resetForm]);

  const ubahField = useCallback((nama: string, val: string) => {
    setFormValues((prev) => (prev[nama] === val ? prev : { ...prev, [nama]: val }));
  }, []);

  const bukaMenuKonteks = useCallback((e: ReactMouseEvent<HTMLTableRowElement>, baris: Record<string, unknown>) => {
    e.preventDefault();
    setMenuKonteks({ x: e.clientX, y: e.clientY, baris });
  }, []);

  const eksporCsv = useCallback(() => {
    if (data.length === 0) {
      setToast({ pesan: "Tidak ada data untuk diekspor.", tipe: "info" });
      return;
    }
    const header = config.kolom.map((k) => `"${k.label.replace(/"/g, '""')}"`).join(",");
    const rows = data.map((baris) =>
      config.kolom
        .map((k) => {
          const val = baris[k.kunci];
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(","),
    );
    const blob = new Blob(["\uFEFF" + [header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.id}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast({ pesan: `Data ${config.caption} berhasil diekspor ke CSV.`, tipe: "sukses" });
  }, [config.caption, config.id, config.kolom, data]);

  const cetakTabelJasper = useCallback(() => {
    const subPeriode =
      config.pakaiPeriode && (tanggalMulai || tanggalSelesai)
        ? `Periode: ${tanggalMulai || "..."} s/d ${tanggalSelesai || "..."}`
        : undefined;
    const dibuka = bukaTabCetakJasper({
      mode: "tabel",
      judul: config.caption,
      subJudul: subPeriode,
      kolom: config.kolom.map((k) => k.label),
      baris: data.map((baris) =>
        config.kolom.map((k) => {
          const v = baris[k.kunci];
          if (k.tipe === "uang") return formatUang(v);
          return v === null || v === undefined || v === "" ? "-" : String(v);
        }),
      ),
    });
    if (!dibuka) {
      setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
    }
  }, [config.caption, config.kolom, config.pakaiPeriode, data, tanggalMulai, tanggalSelesai]);

  const pilihAksiKonteks = useCallback(
    (item: ItemMenuKonteksTabel) => {
      const k = menuKonteks;
      setMenuKonteks(null);
      if (!k) return;
      const baris = k.baris;
      const noRawat = typeof baris.no_rawat === "string" ? baris.no_rawat.trim() : "";
      const noRm = typeof baris.no_rkm_medis === "string" ? baris.no_rkm_medis.trim() : "";

      if (item.id === "ctx-cetak-baris") {
        const sumberKolom = config.form?.fields?.length
          ? config.form.fields.map((f) => ({ kunci: f.nama, label: f.label }))
          : config.kolom.map((col) => ({ kunci: col.kunci, label: col.label }));
        const dibuka = bukaTabCetakJasper({
          mode: "formulir",
          judul: config.caption,
          subJudul: noRawat ? `No. Rawat: ${noRawat}` : config.kunciBaris(baris),
          entri: sumberKolom.map((col) => {
            const v = baris[col.kunci];
            return { label: col.label, nilai: v === null || v === undefined || v === "" ? "-" : String(v) };
          }),
          gambar: config.gambarReferensi,
        });
        if (!dibuka) {
          setToast({ pesan: "Pop-up tab cetak diblokir browser. Izinkan pop-up untuk mencetak.", tipe: "error" });
        }
        return;
      }
      if (item.id === "ctx-cetak-tabel") { cetakTabelJasper(); return; }
      if (item.id === "ctx-ekspor-csv") { eksporCsv(); return; }
      if (item.id === "ctx-edit-form") {
        pilihBaris(baris);
        setToast({ pesan: "Baris dipilih ke formulir.", tipe: "info" });
        return;
      }
      if (item.id === "ctx-hapus-baris") {
        setTerpilih(baris);
        setKonfirmasiHapus(true);
        return;
      }
      if (item.id === "ctx-salin-norawat" && noRawat) {
        void navigator.clipboard?.writeText(noRawat);
        setToast({ pesan: `No. Rawat ${noRawat} disalin.`, tipe: "info" });
        return;
      }
      if (item.id === "ctx-salin-norm" && noRm) {
        void navigator.clipboard?.writeText(noRm);
        setToast({ pesan: `No. RM ${noRm} disalin.`, tipe: "info" });
        return;
      }
      if (noRawat) {
        const enc = encodeURIComponent(noRawat);
        if (item.id === "ctx-riwayat") { router.push(`/riwayat-pasien?no_rawat=${enc}`); return; }
        if (item.id === "ctx-resume") { router.push(`/resume-pasien?no_rawat=${enc}`); return; }
        if (item.id === "ctx-berkas") { router.push(`/rekam-medis/berkas-digital-perawatan?no_rawat=${enc}`); return; }
        if (item.id === "ctx-billing") { router.push(`/rawat-inap/billing?no_rawat=${enc}`); return; }
        if (item.id === "ctx-ralan") { router.push(`/tindakan-rawat-jalan?no_rawat=${enc}`); return; }
        if (item.id === "ctx-ranap") { router.push(`/tindakan-rawat-inap?no_rawat=${enc}`); return; }
        if (item.id === "ctx-dokumen") {
          const qs = new URLSearchParams({ jenis: "MnCetakRegister", no_rawat: noRawat, judul: config.caption });
          bukaTabCetakUrl(`/cetak/dokumen?${qs.toString()}`);
          return;
        }
      }
    },
    [cetakTabelJasper, config, eksporCsv, menuKonteks, pilihBaris, router],
  );

  const muatRincianBilling = async () => {
    if (!terpilih) {
      setToast({ pesan: "Pilih kunjungan rawat inap terlebih dahulu.", tipe: "error" });
      return;
    }
    const noRawat = String(terpilih.no_rawat || "");
    if (!noRawat) return;
    setMemuatDetail(true);
    try {
      const res = await fetch(`${config.endpoint}?no_rawat=${encodeURIComponent(noRawat)}`, { cache: "no-store" });
      const json = (await res.json()) as { success: boolean; data?: DetailBillingData; error?: string };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal memuat rincian billing.");
      }
      setDetailBilling(json.data);
    } catch (error) {
      setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat rincian billing.", tipe: "error" });
    } finally {
      setMemuatDetail(false);
    }
  };

  const simpanData = async (mode: "POST" | "PUT") => {
    if (!config.form) return;
    setMenyimpan(true);
    try {
      const res = await fetch(config.endpoint, {
        method: mode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const json = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menyimpan data.");
      }
      setToast({ pesan: json.message || "Data berhasil disimpan.", tipe: "sukses" });
      resetForm();
      setVersiMuat((v) => v + 1);
    } catch (error) {
      setToast({ pesan: error instanceof Error ? error.message : "Gagal menyimpan data.", tipe: "error" });
    } finally {
      setMenyimpan(false);
    }
  };

  const jalankanHapus = async () => {
    if (!terpilih || !config.form?.kunciHapusParams) return;
    setMenyimpan(true);
    try {
      const qs = new URLSearchParams(config.form.kunciHapusParams(terpilih));
      const res = await fetch(`${config.endpoint}?${qs.toString()}`, { method: "DELETE" });
      const json = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menghapus data.");
      }
      setToast({ pesan: json.message || "Data berhasil dihapus.", tipe: "sukses" });
      setKonfirmasiHapus(false);
      resetForm();
      setVersiMuat((v) => v + 1);
    } catch (error) {
      setToast({ pesan: error instanceof Error ? error.message : "Gagal menghapus data.", tipe: "error" });
    } finally {
      setMenyimpan(false);
    }
  };

  const semuaData = () => {
    setKataKunci("");
    setKataKunciAktif("");
    setFilterEkstra({});
    setHalaman(1);
    setVersiMuat((v) => v + 1);
  };

  const kolomKiri = useMemo(
    () => (config.form?.fields || []).filter((f, i, arr) => (f.kolom ? f.kolom === 1 : i < Math.ceil(arr.length / 2))),
    [config.form?.fields],
  );
  const kolomKanan = useMemo(
    () => (config.form?.fields || []).filter((f, i, arr) => (f.kolom ? f.kolom === 2 : i >= Math.ceil(arr.length / 2))),
    [config.form?.fields],
  );

  const renderField = (field: FieldFormPelayanan) => (
    <FieldFormItem
      key={field.nama}
      configId={config.id}
      field={field}
      value={formValues[field.nama] ?? ""}
      disabled={Boolean(terpilih && field.readOnlySaatEdit)}
      opsi={field.opsiStatis || (field.opsiKey ? opsiServer[field.opsiKey] || OPSI_KOSONG : OPSI_KOSONG)}
      onChangeField={ubahField}
    />
  );

  const tombolTambahan: TombolAksiCustom[] = config.detailBilling
    ? [
        {
          label: memuatDetail ? "Memuat..." : "Rincian Billing",
          ikon: faReceipt,
          onClick: () => { void muatRincianBilling(); },
          disabled: !terpilih || memuatDetail,
          varian: "primer",
          tooltip: "Lihat rincian item billing dan pembayaran rawat inap",
        },
      ]
    : [];

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      {config.ringkasanKartu && config.ringkasanKartu.length > 0 && (
        <section className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {config.ringkasanKartu.map((item) => (
            <div
              key={item.kunci}
              className="rounded-lg border border-slate-200/80 bg-white px-3 py-2 shadow-sm"
            >
              <div className="text-[11px] font-medium text-slate-500">{item.label}</div>
              <div className="mt-0.5 font-mono text-sm font-bold tabular-nums text-slate-800">
                {item.tipe === "uang"
                  ? `Rp ${formatUang(ringkasan[item.kunci])}`
                  : formatUang(ringkasan[item.kunci])}
              </div>
            </div>
          ))}
        </section>
      )}

      {config.form && (
        <PanelInputData
          idPenyimpanan={`modul_pelayanan_${config.id}`}
          judul={config.form.judulPanel || ".: Input Data"}
          sedangMenyimpan={menyimpan}
        >
          <div
            onKeyDown={pindahFieldDenganEnter}
            className={config.form.fields.length > 12 ? "max-h-[40vh] overflow-y-auto pr-1" : undefined}
          >
            {config.gambarReferensi && config.gambarReferensi.length > 0 && (
              <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <div className="mb-1.5 text-[11px] font-semibold text-slate-700">
                  Referensi Gambar Lokalis / Klinis (Klik untuk memperbesar)
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.gambarReferensi.map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setGambarZoom(img)}
                      className="group relative flex flex-col items-center rounded-md border border-slate-200 bg-white p-1.5 text-left hover:border-primary-600"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.judul}
                        loading="lazy"
                        className="h-24 w-auto max-w-[180px] object-contain"
                      />
                      <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-600 group-hover:text-primary-800">
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="h-2.5 w-2.5" aria-hidden="true" />
                        {img.judul}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <GridFormulirModul>
              <div className="space-y-2">{kolomKiri.map(renderField)}</div>
              <div className="space-y-2">{kolomKanan.map(renderField)}</div>
            </GridFormulirModul>
          </div>
        </PanelInputData>
      )}

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div
          className="min-h-0 flex-1 overflow-auto"
          aria-busy={memuat}
          onClick={(e) => {
            if (e.target === e.currentTarget && terpilih) resetForm();
          }}
        >
          <TabelDataPelayanan
            caption={config.caption}
            minWidthTabel={config.minWidthTabel}
            kolom={config.kolom}
            memuat={memuat}
            data={data}
            kunciTerpilih={kunciTerpilih}
            kunciBaris={config.kunciBaris}
            onPilihBaris={pilihBaris}
            onKonteksBaris={bukaMenuKonteks}
          />
        </div>

        {detailBilling && (
          <div className="max-h-56 shrink-0 overflow-auto border-t border-slate-200 bg-slate-50 p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-800">
                Rincian Billing No. Rawat: <span className="font-mono">{detailBilling.no_rawat}</span>
                {detailBilling.nota ? (
                  <span className="ml-2 font-mono text-slate-600">
                    (Nota: {String(detailBilling.nota.no_nota || "-")})
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setDetailBilling(null)}
                className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
              >
                Tutup Rincian
              </button>
            </div>
            <table className="w-full border-collapse text-left text-[11px] text-slate-700">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1">Kategori</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1">Uraian Perawatan / Item</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1 text-right">Biaya</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1 text-right">Jml</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1 text-right">Tambahan</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {detailBilling.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-16 border-0 text-center text-slate-500">
                      Belum ada baris billing tersimpan untuk kunjungan ini.
                    </td>
                  </tr>
                ) : (
                  detailBilling.items.map((it, idx) => (
                    <tr key={`${String(it.noindex ?? idx)}`}>
                      <td className="px-2 py-1 text-slate-600">{String(it.status || "-")}</td>
                      <td className="px-2 py-1 text-slate-800">{String(it.nm_perawatan || it.no || "-")}</td>
                      <td className="px-2 py-1 text-right font-mono tabular-nums">{formatUang(it.biaya)}</td>
                      <td className="px-2 py-1 text-right font-mono tabular-nums">{formatUang(it.jumlah)}</td>
                      <td className="px-2 py-1 text-right font-mono tabular-nums">{formatUang(it.tambahan)}</td>
                      <td className="px-2 py-1 text-right font-mono tabular-nums">{formatUang(it.totalbiaya)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <PanelBawah
        tampilan="web"
        memuat={memuat || menyimpan}
        jumlahRecord={total}
        tanggalMulai={config.pakaiPeriode ? tanggalMulai : undefined}
        tanggalSelesai={config.pakaiPeriode ? tanggalSelesai : undefined}
        onGantiTanggalMulai={config.pakaiPeriode ? (v) => { setTanggalMulai(v); setHalaman(1); } : undefined}
        onGantiTanggalSelesai={config.pakaiPeriode ? (v) => { setTanggalSelesai(v); setHalaman(1); } : undefined}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={() => { setKataKunciAktif(kataKunci.trim()); setHalaman(1); setVersiMuat((v) => v + 1); }}
        onSemua={semuaData}
        placeholderCari={config.placeholderCari || "Cari data..."}
        filterTambahan={
          config.filterSelect && config.filterSelect.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {config.filterSelect.map((fs) => {
                const opsi = fs.opsiStatis || opsiServer[fs.opsiKey] || [];
                return (
                  <CustomSelect
                    key={fs.param}
                    aria-label={fs.label}
                    value={filterEkstra[fs.param] || ""}
                    onChange={(e) => {
                      setFilterEkstra((prev) => ({ ...prev, [fs.param]: e.target.value }));
                      setHalaman(1);
                    }}
                    containerClassName={`relative ${fs.lebar || "w-40"}`}
                    className="h-7 py-0.5 pr-8 text-[11px]"
                  >
                    <option value="">Semua {fs.label}</option>
                    {opsi.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </CustomSelect>
                );
              })}
            </div>
          ) : undefined
        }
        pagination={
          totalHalaman > 1 ? (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <button
                type="button"
                disabled={halaman <= 1 || memuat}
                onClick={() => setHalaman((p) => Math.max(1, p - 1))}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 font-semibold hover:bg-slate-100 disabled:opacity-40"
              >
                Prev
              </button>
              <span className="font-mono tabular-nums">
                {halaman}/{totalHalaman}
              </span>
              <button
                type="button"
                disabled={halaman >= totalHalaman || memuat}
                onClick={() => setHalaman((p) => Math.min(totalHalaman, p + 1))}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 font-semibold hover:bg-slate-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : undefined
        }
        onSimpan={config.form?.bisaTambah ? () => { void simpanData("POST"); } : undefined}
        disabledSimpan={menyimpan || Boolean(terpilih && config.form?.bisaUbah)}
        onBaru={config.form ? resetForm : undefined}
        onGanti={config.form?.bisaUbah ? () => { void simpanData("PUT"); } : undefined}
        disabledGanti={menyimpan || !terpilih}
        onHapus={config.form?.bisaHapus ? () => setKonfirmasiHapus(true) : undefined}
        disabledHapus={menyimpan || !terpilih}
        onCetak={cetakTabelJasper}
        tombolTambahan={tombolTambahan.length > 0 ? tombolTambahan : undefined}
      />

      {config.form?.bisaHapus && (
        <KonfirmasiDialog
          terbuka={konfirmasiHapus}
          judul="Konfirmasi Hapus Data"
          pesan={`Apakah Anda yakin ingin menghapus data ${
            terpilih && config.form.labelHapus ? config.form.labelHapus(terpilih) : "terpilih"
          }?`}
          subPesan="Penghapusan bersifat permanen pada database Khanza dan tidak dapat dibatalkan."
          teksKonfirmasi="Hapus"
          onBatal={() => setKonfirmasiHapus(false)}
          onKonfirmasi={() => { void jalankanHapus(); }}
          sedangMemproses={menyimpan}
        />
      )}

      {menuKonteks && (() => {
        const b = menuKonteks.baris;
        const noRawat = typeof b.no_rawat === "string" ? b.no_rawat.trim() : "";
        const noRm = typeof b.no_rkm_medis === "string" ? b.no_rkm_medis.trim() : "";
        const nmPasien = typeof b.nm_pasien === "string" ? b.nm_pasien.trim() : "";
        const menuItems: ItemMenuKonteksTabel[] = [
          {
            id: "grp-cetak",
            label: "Cetak & Ekspor",
            children: [
              { id: "ctx-cetak-baris", label: "Cetak Formulir / Laporan Baris" },
              { id: "ctx-cetak-tabel", label: "Cetak Daftar Tabel" },
              { id: "ctx-ekspor-csv", label: "Ekspor Tabel ke CSV (Excel)" },
            ],
          },
          ...(config.form ? [{ id: "ctx-edit-form", label: "Pilih / Ubah di Formulir" }] : []),
          ...(config.form?.bisaHapus ? [{ id: "ctx-hapus-baris", label: "Hapus Baris Terpilih" }] : []),
          ...(noRawat
            ? [
                {
                  id: "grp-klinis",
                  label: "Rekam Medis & Billing Pasien",
                  children: [
                    { id: "ctx-riwayat", label: "Riwayat Perawatan" },
                    { id: "ctx-resume", label: "Resume Pasien" },
                    { id: "ctx-berkas", label: "Berkas Digital Perawatan" },
                    { id: "ctx-billing", label: "Billing / Pembayaran Pasien" },
                    { id: "ctx-ralan", label: "Tindakan Rawat Jalan" },
                    { id: "ctx-ranap", label: "Tindakan Rawat Inap" },
                    { id: "ctx-dokumen", label: "Cetak Dokumen Kunjungan" },
                  ],
                },
                { id: "ctx-salin-norawat", label: `Salin No. Rawat (${noRawat})` },
              ]
            : []),
          ...(noRm ? [{ id: "ctx-salin-norm", label: `Salin No. RM (${noRm})` }] : []),
        ];
        return (
          <MenuKonteksTabel
            terbuka
            x={menuKonteks.x}
            y={menuKonteks.y}
            baris={{ no_rawat: noRawat || config.kunciBaris(b), nm_pasien: nmPasien || config.caption }}
            menu={menuItems}
            onPilih={pilihAksiKonteks}
            onTutup={() => setMenuKonteks(null)}
          />
        );
      })()}

      {gambarZoom && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setGambarZoom(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={gambarZoom.judul}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-4xl overflow-auto rounded-lg border border-slate-200 bg-white p-3 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-800">{gambarZoom.judul}</span>
              <button
                type="button"
                onClick={() => setGambarZoom(null)}
                aria-label="Tutup gambar"
                className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
              >
                <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gambarZoom.src} alt={gambarZoom.judul} className="mx-auto max-h-[76vh] w-auto object-contain" />
          </div>
        </div>
      )}

      <Toast
        message={toast?.pesan ?? null}
        tipe={toast?.tipe ?? "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

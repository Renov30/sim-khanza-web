"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useAuth } from "@/components/auth/AuthContext";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";

export interface OpsiMaster {
  id: string;
  label: string;
}

type JenisField = "teks" | "tanggal" | "pilih";

interface FieldMaster {
  kunci: string;
  label: string;
  jenis?: JenisField;
  maks?: number;
  opsi?: string;
  placeholder?: string;
}

interface KolomMaster {
  kunci: string;
  label: string;
  jenis?: "kode" | "tanggal" | "status";
}

interface FilterMaster {
  kunci: string;
  label: string;
  opsi: string;
  semuanya: string;
}

export interface KonfigurasiMasterKepegawaian {
  id: string;
  nama: string;
  jamak: string;
  kode: string;
  endpoint: string;
  kunciUtama: string;
  kunciLama: "nip_lama" | "kd_lama";
  kodeOtomatis?: boolean;
  ikon: IconDefinition;
  placeholderCari: string;
  fields: FieldMaster[];
  kolom: KolomMaster[];
  filter: FilterMaster[];
}

interface ResponsMaster {
  success: boolean;
  data?: Record<string, unknown>[];
  total?: number;
  totalHalaman?: number;
  error?: string;
  message?: string;
}

type DataBaris = Record<string, unknown>;

function nilaiTeks(nilai: unknown) {
  if (nilai === null || nilai === undefined) return "";
  return String(nilai);
}

function formulirKosong(
  konfigurasi: KonfigurasiMasterKepegawaian,
  opsi: Record<string, OpsiMaster[]>,
) {
  const awal: Record<string, string> = {};
  for (const field of konfigurasi.fields) {
    awal[field.kunci] = field.opsi ? (opsi[field.opsi]?.[0]?.id || "") : "";
  }
  return awal;
}

async function bacaResponsMaster(respons: Response, konteks: string) {
  const teks = await respons.text();
  try {
    return JSON.parse(teks) as ResponsMaster;
  } catch {
    throw new Error(`${konteks} gagal: server mengembalikan respons bukan JSON (HTTP ${respons.status}).`);
  }
}

function FieldBaris({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-7 items-center gap-1.5 font-sans text-xs font-normal">
      <span className="w-32 shrink-0 text-right font-normal text-slate-700">{label} :</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
    </div>
  );
}

export default function HalamanMasterKepegawaian({ konfigurasi }: { konfigurasi: KonfigurasiMasterKepegawaian }) {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState<Record<string, string>>(() => formulirKosong(konfigurasi, {}));
  const [opsi, setOpsi] = useState<Record<string, OpsiMaster[]>>({});
  const [data, setData] = useState<DataBaris[]>([]);
  const [filter, setFilter] = useState<Record<string, string>>({ status: "1" });
  const [total, setTotal] = useState(0);
  const [halaman, setHalaman] = useState(1);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [terpilih, setTerpilih] = useState<DataBaris | null>(null);
  const [kodeLama, setKodeLama] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<null | "hapus" | "aktif">(null);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const batas = 50;

  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  const muatOpsi = useCallback(async () => {
    try {
      const respons = await fetch(`${konfigurasi.endpoint}/options`);
      const hasil = await bacaResponsMaster(respons, "Memuat pilihan");
      if (!respons.ok || !hasil.success || !hasil.data) throw new Error(hasil.error || "Gagal memuat pilihan.");
      const pilihan = hasil.data as unknown as Record<string, OpsiMaster[]>;
      setOpsi(pilihan);
      setForm((lama) => {
        const awal = formulirKosong(konfigurasi, pilihan);
        const berikut = { ...lama };
        for (const field of konfigurasi.fields) {
          if (!berikut[field.kunci]) berikut[field.kunci] = awal[field.kunci];
        }
        return berikut;
      });
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal memuat pilihan.", "error");
    }
  }, [konfigurasi, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated) return;
    queueMicrotask(() => { void muatOpsi(); });
  }, [isAuthenticated, muatOpsi]);

  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const parameter = new URLSearchParams({ page: String(halaman), limit: String(batas), ...filter });
      const respons = await fetch(`${konfigurasi.endpoint}?${parameter.toString()}`);
      const hasil = await bacaResponsMaster(respons, "Memuat data");
      if (!respons.ok || !hasil.success || !hasil.data) throw new Error(hasil.error || "Gagal memuat data.");
      setData(hasil.data);
      setTotal(Number(hasil.total ?? 0));
      setTotalHalaman(Number(hasil.totalHalaman ?? 1));
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal memuat data.", "error");
      setData([]);
    } finally {
      setMemuat(false);
    }
  }, [filter, halaman, konfigurasi.endpoint, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated) return;
    queueMicrotask(() => { void muatData(); });
  }, [isAuthenticated, muatData]);

  const aturNilai = (kunci: string, nilai: string) => setForm((lama) => ({ ...lama, [kunci]: nilai }));

  const aturFilter = (kunci: string, nilai: string) => {
    setFilter((lama) => ({ ...lama, [kunci]: nilai }));
    setHalaman(1);
  };

  const resetForm = () => {
    setForm(formulirKosong(konfigurasi, opsi));
    setTerpilih(null);
    setKodeLama("");
    setFilter({ status: "1" });
    setHalaman(1);
  };

  const pilihBaris = (baris: DataBaris) => {
    setTerpilih(baris);
    setKodeLama(nilaiTeks(baris[konfigurasi.kunciUtama]));
    const nilai: Record<string, string> = {};
    for (const field of konfigurasi.fields) nilai[field.kunci] = nilaiTeks(baris[field.kunci]);
    setForm(nilai);
  };

  const handleSimpan = async () => {
    setSedangMenyimpan(true);
    try {
      const body: Record<string, string> = { ...form };
      if (terpilih) body[konfigurasi.kunciLama] = kodeLama;
      const respons = await fetch(konfigurasi.endpoint, {
        method: terpilih ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const hasil = await bacaResponsMaster(respons, "Menyimpan data");
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal menyimpan data.");
      tampilkanToast(hasil.message || `${konfigurasi.nama} berhasil disimpan.`, "sukses");
      resetForm();
      await muatData();
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal menyimpan data.", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleHapus = async () => {
    if (!terpilih) return;
    setSedangMenyimpan(true);
    try {
      const kode = nilaiTeks(terpilih[konfigurasi.kunciUtama]);
      const parameter = new URLSearchParams({ [konfigurasi.kunciUtama]: kode });
      const respons = await fetch(`${konfigurasi.endpoint}?${parameter.toString()}`, { method: "DELETE" });
      const hasil = await bacaResponsMaster(respons, "Menonaktifkan data");
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal menonaktifkan data.");
      tampilkanToast(hasil.message || `${konfigurasi.nama} dinonaktifkan.`, "sukses");
      setDialogStatus(null);
      resetForm();
      await muatData();
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal menonaktifkan data.", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleAktifkan = async () => {
    if (!terpilih) return;
    setSedangMenyimpan(true);
    try {
      const respons = await fetch(konfigurasi.endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [konfigurasi.kunciUtama]: kodeLama, status: "1" }),
      });
      const hasil = await bacaResponsMaster(respons, "Mengaktifkan data");
      if (!respons.ok || !hasil.success) throw new Error(hasil.error || "Gagal mengaktifkan data.");
      tampilkanToast(hasil.message || `${konfigurasi.nama} diaktifkan.`, "sukses");
      setDialogStatus(null);
      resetForm();
      await muatData();
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Gagal mengaktifkan data.", "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const renderField = (field: FieldMaster) => {
    const kodeOtomatis = Boolean(konfigurasi.kodeOtomatis && !terpilih && field.kunci === konfigurasi.kunciUtama);
    if (field.opsi) {
      return (
        <FieldBaris key={field.kunci} label={field.label}>
          <CustomSelect
            aria-label={field.label}
            value={form[field.kunci] || ""}
            onChange={(event) => aturNilai(field.kunci, event.target.value)}
            className="h-7 w-full py-0.5 font-normal"
          >
            <option value="">-- Pilih {field.label} --</option>
            {(opsi[field.opsi] || []).map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </CustomSelect>
        </FieldBaris>
      );
    }
    return (
      <FieldBaris key={field.kunci} label={field.label}>
        <input
          aria-label={field.label}
          type={field.jenis === "tanggal" ? "date" : "text"}
          value={form[field.kunci] || ""}
          maxLength={field.maks}
          readOnly={kodeOtomatis}
          placeholder={kodeOtomatis ? "Akan terisi otomatis" : field.placeholder || field.label}
          onChange={(event) => aturNilai(field.kunci, event.target.value)}
          className="h-7 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-800 read-only:bg-slate-50"
        />
      </FieldBaris>
    );
  };

  const filterSelect = (item: FilterMaster) => (
    <div className="flex items-center gap-1.5" key={item.kunci}>
      <span className="whitespace-nowrap text-slate-700">{item.label}</span>
      <CustomSelect
        aria-label={item.label}
        value={filter[item.kunci] || ""}
        onChange={(event) => aturFilter(item.kunci, event.target.value)}
        className="h-7 w-40 py-0.5 font-normal"
      >
        <option value="">{item.semuanya}</option>
        {(opsi[item.opsi] || []).map((pilihan) => (
          <option key={pilihan.id} value={pilihan.id}>{pilihan.label}</option>
        ))}
      </CustomSelect>
    </div>
  );

  const pagination = (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setHalaman((lama) => Math.max(1, lama - 1))}
        disabled={halaman <= 1}
        className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span className="text-xs tabular-nums text-slate-600">{halaman} / {totalHalaman}</span>
      <button
        type="button"
        onClick={() => setHalaman((lama) => Math.min(totalHalaman, lama + 1))}
        disabled={halaman >= totalHalaman}
        className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 disabled:opacity-40"
      >
        Berikutnya
      </button>
    </div>
  );

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-y-auto bg-slate-50 p-2 sm:p-3 lg:overflow-hidden">
      <PanelInputData judul=".: Input Data" idPenyimpanan={konfigurasi.id}>
        <fieldset disabled={sedangMenyimpan} className="max-h-[46vh] overflow-y-auto font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul>
            {[0, 1].map((kolom) => (
              <div className="space-y-1.5" key={kolom}>
                {konfigurasi.fields.filter((_, indeks) => indeks % 2 === kolom).map(renderField)}
              </div>
            ))}
          </GridFormulirModul>
        </fieldset>
      </PanelInputData>

      <section className="flex h-[32rem] min-h-0 flex-none flex-col overflow-hidden rounded-lg border border-slate-200 bg-white lg:h-auto lg:flex-1">
        <div className="flex-1 overflow-auto">
          <table className="w-full min-w-[56rem] border-collapse text-left text-xs">
            <caption className="sr-only">
              {`Daftar ${konfigurasi.jamak}. Pilih baris untuk memuat data ke formulir.`}
            </caption>
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100 font-bold text-slate-700">
              <tr>
                {konfigurasi.kolom.map((kolom) => (
                  <th key={kolom.kunci} scope="col" className="px-2 py-2">{kolom.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-sans text-[11px] text-slate-700">
              {memuat ? (
                <tr>
                  <td colSpan={konfigurasi.kolom.length} className="py-8 text-center text-slate-500">
                    {`Memuat data ${konfigurasi.jamak}...`}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={konfigurasi.kolom.length} className="py-8 text-center text-slate-400">
                    <FontAwesomeIcon icon={konfigurasi.ikon} className="mb-2 h-8 w-8 text-slate-300" />
                    <p>{`Tidak ada ${konfigurasi.jamak} yang sesuai`}</p>
                  </td>
                </tr>
              ) : (
                data.map((baris) => (
                  <tr
                    key={nilaiTeks(baris[konfigurasi.kunciUtama])}
                    onClick={() => pilihBaris(baris)}
                    className={`cursor-pointer ${terpilih?.[konfigurasi.kunciUtama] === baris[konfigurasi.kunciUtama] ? "bg-primary-50/90" : "hover:bg-slate-50/80"}`}
                  >
                    {konfigurasi.kolom.map((kolom) => {
                      const nilai = nilaiTeks(baris[kolom.kunci]);
                      if (kolom.jenis === "status") {
                        return (
                          <td key={kolom.kunci} className="whitespace-nowrap px-2 py-1.5">
                            <span className={`rounded px-1.5 py-0.5 text-[10px] ${nilai === "1" ? "bg-secondary-50 text-secondary-800" : "bg-slate-100 text-slate-600"}`}>
                              {nilai === "1" ? "Aktif" : "Nonaktif"}
                            </span>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={kolom.kunci}
                          className={`whitespace-nowrap px-2 py-1.5 ${kolom.jenis === "kode" ? "font-mono text-slate-800" : kolom.jenis === "tanggal" ? "tabular-nums" : ""}`}
                        >
                          {nilai || "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        aksiUtama={terpilih ? "ganti" : "simpan"}
        onSimpan={() => void handleSimpan()}
        disabledSimpan={Boolean(terpilih) || sedangMenyimpan}
        onBaru={resetForm}
        onHapus={() => setDialogStatus("hapus")}
        disabledHapus={!terpilih || sedangMenyimpan}
        onGanti={() => void handleSimpan()}
        disabledGanti={!terpilih || sedangMenyimpan}
        onCetak={() => { cetakTabelDomJasper("Laporan Master Kepegawaian"); }}
        onSemua={resetForm}
        kataKunci={filter.cari || ""}
        onGantiKataKunci={(nilai) => aturFilter("cari", nilai)}
        onCari={() => { setHalaman(1); void muatData(); }}
        placeholderCari={konfigurasi.placeholderCari}
        filterTambahan={
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-slate-700">Status</span>
              <CustomSelect
                aria-label="Status data"
                value={filter.status || "1"}
                onChange={(event) => aturFilter("status", event.target.value)}
                className="h-7 w-36 py-0.5 font-normal"
              >
                <option value="semua">-- Semua status --</option>
                {(opsi.status || []).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </CustomSelect>
            </div>
            {konfigurasi.filter.map(filterSelect)}
          </div>
        }
        jumlahRecord={total}
        tampilkanRecord
        pagination={pagination}
        memuat={sedangMenyimpan}
        tombolTambahan={terpilih && nilaiTeks(terpilih.status) === "0"
          ? [{
            label: "Aktifkan",
            onClick: () => setDialogStatus("aktif"),
            disabled: sedangMenyimpan,
            tooltip: `Aktifkan kembali ${konfigurasi.nama} yang tidak aktif`,
          }]
          : undefined}
      />

      <KonfirmasiDialog
        terbuka={dialogStatus !== null}
        judul={dialogStatus === "aktif" ? `Aktifkan ${konfigurasi.nama}` : `Nonaktifkan ${konfigurasi.nama}`}
        pesan={dialogStatus === "aktif"
          ? `Aktifkan kembali ${konfigurasi.nama} ${kodeLama}?`
          : `Nonaktifkan ${konfigurasi.nama} ${kodeLama}?`}
        subPesan={dialogStatus === "aktif"
          ? `${konfigurasi.nama} akan kembali muncul pada daftar aktif.`
          : `${konfigurasi.nama} tidak muncul lagi pada daftar aktif, tetapi data terkait tetap tersimpan.`}
        teksBatal="Batal"
        teksKonfirmasi={dialogStatus === "aktif" ? "Ya, Aktifkan" : "Ya, Nonaktifkan"}
        onBatal={() => setDialogStatus(null)}
        onKonfirmasi={dialogStatus === "aktif" ? handleAktifkan : handleHapus}
        sedangMemproses={sedangMenyimpan}
      />

      <Toast
        key={toast?.key}
        message={toast?.pesan || null}
        tipe={toast?.tipe || "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

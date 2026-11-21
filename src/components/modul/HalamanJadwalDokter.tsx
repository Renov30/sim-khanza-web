"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";

interface OpsiApi {
  id: string;
  label: string;
}

interface OpsiJadwal {
  dokter: OpsiApi[];
  poliklinik: OpsiApi[];
  hariKerja: OpsiApi[];
  jam: OpsiApi[];
  menit: OpsiApi[];
  detik: OpsiApi[];
}

interface BarisJadwal {
  kd_dokter: string;
  nm_dokter: string;
  hari_kerja: string;
  jam_mulai: string;
  jam_selesai: string | null;
  kd_poli: string;
  nm_poli: string;
  kuota: number | string;
}

interface FormJadwal {
  kd_dokter: string;
  hari_kerja: string;
  jam1: string;
  mnt1: string;
  dtk1: string;
  jam2: string;
  mnt2: string;
  dtk2: string;
  kd_poli: string;
  kuota: string;
}

interface KunciEdit {
  kd_dokter_lama: string;
  hari_kerja_lama: string;
  jam_mulai_lama: string;
  jam_selesai_lama: string;
}

interface KunciHapus {
  kd_dokter: string;
  hari_kerja: string;
  jam_mulai: string;
}

interface ResponsApi<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
  totalHalaman?: number;
}

const OPSI_KOSONG: OpsiJadwal = {
  dokter: [],
  poliklinik: [],
  hariKerja: [],
  jam: [],
  menit: [],
  detik: [],
};

const FORM_AWAL: FormJadwal = {
  kd_dokter: "",
  hari_kerja: "SENIN",
  jam1: "00",
  mnt1: "00",
  dtk1: "00",
  jam2: "00",
  mnt2: "00",
  dtk2: "00",
  kd_poli: "",
  kuota: "0",
};

const KELAS_HEADER = "border-b border-r border-slate-200 px-2 py-2 text-left font-semibold";
const KELAS_SEL = "border-b border-r border-slate-100 px-2 py-1.5 text-slate-800";

function keOpsiSelect(daftar: OpsiApi[], placeholder?: string): SelectOption[] {
  const awal = placeholder ? [{ value: "", label: placeholder }] : [];
  return [...awal, ...daftar.map((item) => ({ value: item.id, label: item.label }))];
}

function kunciBaris(row: BarisJadwal) {
  return `${row.kd_dokter}|${row.hari_kerja}|${row.jam_mulai}`;
}

function potongWaktu(waktu: string | null | undefined) {
  const bagian = (waktu || "00:00:00").split(":");
  return {
    jam: bagian[0] || "00",
    menit: bagian[1] || "00",
    detik: bagian[2] || "00",
  };
}

function isiFormDariBaris(row: BarisJadwal): FormJadwal {
  const mulai = potongWaktu(row.jam_mulai);
  const selesai = potongWaktu(row.jam_selesai);
  return {
    kd_dokter: row.kd_dokter,
    hari_kerja: row.hari_kerja,
    jam1: mulai.jam,
    mnt1: mulai.menit,
    dtk1: mulai.detik,
    jam2: selesai.jam,
    mnt2: selesai.menit,
    dtk2: selesai.detik,
    kd_poli: row.kd_poli,
    kuota: String(row.kuota ?? 0),
  };
}

function kunciEditDariBaris(row: BarisJadwal): KunciEdit {
  return {
    kd_dokter_lama: row.kd_dokter,
    hari_kerja_lama: row.hari_kerja,
    jam_mulai_lama: row.jam_mulai,
    jam_selesai_lama: row.jam_selesai || "00:00:00",
  };
}

function kunciHapusDariBaris(row: BarisJadwal): KunciHapus {
  return {
    kd_dokter: row.kd_dokter,
    hari_kerja: row.hari_kerja,
    jam_mulai: row.jam_mulai,
  };
}

function jamLengkap(jam: string, menit: string, detik: string) {
  return `${jam}:${menit}:${detik}`;
}

function badanFormulir(form: FormJadwal) {
  return {
    kd_dokter: form.kd_dokter,
    hari_kerja: form.hari_kerja,
    jam_mulai: jamLengkap(form.jam1, form.mnt1, form.dtk1),
    jam_selesai: jamLengkap(form.jam2, form.mnt2, form.dtk2),
    kd_poli: form.kd_poli,
    kuota: Number(form.kuota),
  };
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

export default function HalamanJadwalDokter() {
  const [opsi, setOpsi] = useState<OpsiJadwal>(OPSI_KOSONG);
  const [form, setForm] = useState<FormJadwal>(FORM_AWAL);
  const [kunciEdit, setKunciEdit] = useState<KunciEdit | null>(null);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [centang, setCentang] = useState<Set<string>>(new Set());
  const [data, setData] = useState<BarisJadwal[]>([]);
  const [kataKunci, setKataKunci] = useState("");
  const [pencarian, setPencarian] = useState("");
  const [filterDokter, setFilterDokter] = useState("");
  const [filterPoli, setFilterPoli] = useState("");
  const [filterHari, setFilterHari] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(1);
  const [memuat, setMemuat] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const [dialogHapus, setDialogHapus] = useState(false);

  const muatData = useCallback(async () => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({
        cari: pencarian,
        kd_dokter: filterDokter,
        kd_poli: filterPoli,
        hari_kerja: filterHari,
        page: String(halaman),
        limit: "50",
      });
      const response = await fetch(`/api/jadwal-dokter?${params.toString()}`, { cache: "no-store" });
      const hasil = await bacaRespons<BarisJadwal[]>(response);
      if (!response.ok || !hasil.success) {
        throw new Error(hasil.error || "Gagal memuat data jadwal dokter.");
      }
      setData(hasil.data ?? []);
      setTotal(hasil.total ?? 0);
      setTotalHalaman(hasil.totalHalaman ?? 1);
    } catch (error) {
      setToast({ pesan: pesanError(error), tipe: "error" });
    } finally {
      setMemuat(false);
    }
  }, [pencarian, filterDokter, filterPoli, filterHari, halaman]);

  useEffect(() => {
    const controller = new AbortController();
    async function muatOpsi() {
      try {
        const response = await fetch("/api/jadwal-dokter/options", {
          signal: controller.signal,
          cache: "no-store",
        });
        const hasil = await bacaRespons<OpsiJadwal>(response);
        if (!response.ok || !hasil.success) {
          throw new Error(hasil.error || "Gagal memuat pilihan jadwal dokter.");
        }
        setOpsi(hasil.data ?? OPSI_KOSONG);
      } catch (error) {
        if (!controller.signal.aborted) {
          setToast({ pesan: pesanError(error), tipe: "error" });
        }
      }
    }
    void muatOpsi();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let aktif = true;
    queueMicrotask(() => {
      if (aktif) void muatData();
    });
    return () => {
      aktif = false;
    };
  }, [muatData]);

  const opsiDokter = useMemo(() => keOpsiSelect(opsi.dokter, "Pilih dokter..."), [opsi.dokter]);
  const opsiPoli = useMemo(() => keOpsiSelect(opsi.poliklinik, "Pilih poliklinik..."), [opsi.poliklinik]);
  const opsiHari = useMemo(() => keOpsiSelect(opsi.hariKerja), [opsi.hariKerja]);
  const opsiJam = useMemo(() => keOpsiSelect(opsi.jam), [opsi.jam]);
  const opsiMenit = useMemo(() => keOpsiSelect(opsi.menit), [opsi.menit]);
  const opsiDetik = useMemo(() => keOpsiSelect(opsi.detik), [opsi.detik]);
  const opsiDokterFilter = useMemo(() => keOpsiSelect(opsi.dokter, "Semua dokter"), [opsi.dokter]);
  const opsiPoliFilter = useMemo(() => keOpsiSelect(opsi.poliklinik, "Semua poliklinik"), [opsi.poliklinik]);
  const opsiHariFilter = useMemo(() => keOpsiSelect(opsi.hariKerja, "Semua hari"), [opsi.hariKerja]);

  function aturForm(perubahan: Partial<FormJadwal>) {
    setForm((sebelumnya) => ({ ...sebelumnya, ...perubahan }));
  }

  function resetFormulir() {
    setForm(FORM_AWAL);
    setKunciEdit(null);
    setTerpilih(null);
    setCentang(new Set());
  }

  function resetSemua() {
    resetFormulir();
    setKataKunci("");
    setPencarian("");
    setFilterDokter("");
    setFilterPoli("");
    setFilterHari("");
    setHalaman(1);
    setDialogHapus(false);
  }

  function pilihBaris(row: BarisJadwal) {
    const kunci = kunciBaris(row);
    setTerpilih(kunci);
    setForm(isiFormDariBaris(row));
    setKunciEdit(kunciEditDariBaris(row));
    setCentang(new Set([kunci]));
  }

  function ubahCentang(kunci: string) {
    setCentang((sebelumnya) => {
      const baru = new Set(sebelumnya);
      if (baru.has(kunci)) baru.delete(kunci);
      else baru.add(kunci);
      return baru;
    });
  }

  function centangSemua() {
    setCentang((sebelumnya) => {
      const semuaTercecentang = data.length > 0 && data.every((row) => sebelumnya.has(kunciBaris(row)));
      if (semuaTercecentang) return new Set();
      return new Set(data.map(kunciBaris));
    });
  }

  async function kirim(
    method: "POST" | "PUT" | "DELETE",
    isi: unknown,
    pesanSukses: (hasil: ResponsApi<unknown>) => string,
  ) {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/jadwal-dokter", {
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

  async function simpanBaru() {
    const berhasil = await kirim(
      "POST",
      badanFormulir(form),
      (hasil) => hasil.message || "Jadwal praktek dokter berhasil disimpan.",
    );
    if (berhasil) {
      resetFormulir();
      await muatData();
    }
  }

  async function simpanGanti() {
    if (!kunciEdit) {
      setToast({ pesan: "Pilih baris jadwal yang akan diganti terlebih dahulu.", tipe: "info" });
      return;
    }
    const berhasil = await kirim(
      "PUT",
      { ...badanFormulir(form), ...kunciEdit },
      (hasil) => hasil.message || "Jadwal praktek dokter berhasil diperbarui.",
    );
    if (berhasil) {
      resetFormulir();
      await muatData();
    }
  }

  async function hapusTerpilih() {
    const items = data
      .filter((row) => centang.has(kunciBaris(row)))
      .map(kunciHapusDariBaris);
    if (items.length === 0) {
      setToast({ pesan: "Pilih minimal satu jadwal untuk dihapus.", tipe: "info" });
      return;
    }
    const berhasil = await kirim(
      "DELETE",
      { items },
      (hasil) => hasil.message || `${items.length} jadwal praktek dokter berhasil dihapus.`,
    );
    if (berhasil) {
      setDialogHapus(false);
      resetFormulir();
      await muatData();
    }
  }

  const semuaTercecentang = data.length > 0 && data.every((row) => centang.has(kunciBaris(row)));

  const filterTambahan = (
    <div className="flex flex-wrap items-center gap-1.5">
      <CustomSelect
        aria-label="Filter dokter"
        containerClassName="w-44"
        options={opsiDokterFilter}
        value={filterDokter}
        onChange={(event) => {
          setFilterDokter(event.target.value);
          setHalaman(1);
        }}
      />
      <CustomSelect
        aria-label="Filter poliklinik"
        containerClassName="w-44"
        options={opsiPoliFilter}
        value={filterPoli}
        onChange={(event) => {
          setFilterPoli(event.target.value);
          setHalaman(1);
        }}
      />
      <CustomSelect
        aria-label="Filter hari kerja"
        containerClassName="w-32"
        options={opsiHariFilter}
        value={filterHari}
        onChange={(event) => {
          setFilterHari(event.target.value);
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
        judul=".: Input Jadwal Praktek"
        idPenyimpanan="jadwal-dokter-form"
        onSimpan={simpanBaru}
        onBaru={resetSemua}
        sedangMenyimpan={menyimpan}
      >
        <GridFormulirModul tampilkanKolomCadangan={false}>
          <div className="space-y-1">
            <label htmlFor="jadwal-dokter" className="block text-xs font-semibold text-slate-700">Dokter</label>
            <CustomSelect
              id="jadwal-dokter"
              options={opsiDokter}
              value={form.kd_dokter}
              onChange={(event) => aturForm({ kd_dokter: event.target.value })}
              aria-label="Dokter"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="jadwal-poli" className="block text-xs font-semibold text-slate-700">Poliklinik</label>
            <CustomSelect
              id="jadwal-poli"
              options={opsiPoli}
              value={form.kd_poli}
              onChange={(event) => aturForm({ kd_poli: event.target.value })}
              aria-label="Poliklinik"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="jadwal-kuota" className="block text-xs font-semibold text-slate-700">Kuota</label>
            <input
              id="jadwal-kuota"
              type="number"
              min={0}
              max={9999}
              value={form.kuota}
              onChange={(event) => aturForm({ kuota: event.target.value })}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="jadwal-hari" className="block text-xs font-semibold text-slate-700">Hari Kerja</label>
            <CustomSelect
              id="jadwal-hari"
              options={opsiHari}
              value={form.hari_kerja}
              onChange={(event) => aturForm({ hari_kerja: event.target.value })}
              aria-label="Hari kerja"
            />
          </div>
          <div className="space-y-1 lg:col-span-2">
            <span className="block text-xs font-semibold text-slate-700">Jam Mulai</span>
            <div className="flex items-center gap-1.5">
              <CustomSelect aria-label="Jam mulai" options={opsiJam} value={form.jam1} onChange={(event) => aturForm({ jam1: event.target.value })} containerClassName="w-20" />
              <span className="text-xs text-slate-600">:</span>
              <CustomSelect aria-label="Menit mulai" options={opsiMenit} value={form.mnt1} onChange={(event) => aturForm({ mnt1: event.target.value })} containerClassName="w-20" />
              <span className="text-xs text-slate-600">:</span>
              <CustomSelect aria-label="Detik mulai" options={opsiDetik} value={form.dtk1} onChange={(event) => aturForm({ dtk1: event.target.value })} containerClassName="w-20" />
            </div>
          </div>
          <div className="space-y-1 lg:col-span-3">
            <span className="block text-xs font-semibold text-slate-700">Jam Selesai</span>
            <div className="flex items-center gap-1.5">
              <CustomSelect aria-label="Jam selesai" options={opsiJam} value={form.jam2} onChange={(event) => aturForm({ jam2: event.target.value })} containerClassName="w-20" />
              <span className="text-xs text-slate-600">:</span>
              <CustomSelect aria-label="Menit selesai" options={opsiMenit} value={form.mnt2} onChange={(event) => aturForm({ mnt2: event.target.value })} containerClassName="w-20" />
              <span className="text-xs text-slate-600">:</span>
              <CustomSelect aria-label="Detik selesai" options={opsiDetik} value={form.dtk2} onChange={(event) => aturForm({ dtk2: event.target.value })} containerClassName="w-20" />
            </div>
          </div>
        </GridFormulirModul>
      </PanelInputData>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[860px] border-collapse text-[11px]">
            <caption className="sr-only">Daftar jadwal praktek dokter</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className={`${KELAS_HEADER} w-10 text-center`}>
                  <input
                    type="checkbox"
                    aria-label="Pilih semua jadwal pada halaman ini"
                    checked={semuaTercecentang}
                    onChange={centangSemua}
                    className="cursor-pointer"
                  />
                </th>
                <th scope="col" className={KELAS_HEADER}>Kode Dokter</th>
                <th scope="col" className={KELAS_HEADER}>Nama Dokter</th>
                <th scope="col" className={KELAS_HEADER}>Hari Kerja</th>
                <th scope="col" className={KELAS_HEADER}>Jam Mulai</th>
                <th scope="col" className={KELAS_HEADER}>Jam Selesai</th>
                <th scope="col" className={KELAS_HEADER}>Poliklinik</th>
                <th scope="col" className={KELAS_HEADER}>Kuota</th>
              </tr>
            </thead>
            <tbody>
              {memuat && data.length === 0 && (
                <tr>
                  <td colSpan={8} className={`${KELAS_SEL} text-center text-slate-600`}>Memuat data jadwal...</td>
                </tr>
              )}
              {!memuat && data.length === 0 && (
                <tr>
                  <td colSpan={8} className={`${KELAS_SEL} text-center text-slate-600`}>Tidak ada jadwal praktek dokter.</td>
                </tr>
              )}
              {data.map((row) => {
                const kunci = kunciBaris(row);
                return (
                  <tr
                    key={kunci}
                    onClick={() => pilihBaris(row)}
                    className={`cursor-pointer ${terpilih === kunci ? "bg-primary-50/60" : "even:bg-slate-50/70"}`}
                  >
                    <td className={`${KELAS_SEL} text-center`} onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={`Pilih jadwal ${row.kd_dokter} ${row.hari_kerja} ${row.jam_mulai}`}
                        checked={centang.has(kunci)}
                        onChange={() => ubahCentang(kunci)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className={`${KELAS_SEL} font-mono`}>{row.kd_dokter}</td>
                    <td className={KELAS_SEL}>{row.nm_dokter}</td>
                    <td className={KELAS_SEL}>{row.hari_kerja}</td>
                    <td className={`${KELAS_SEL} font-mono`}>{row.jam_mulai}</td>
                    <td className={`${KELAS_SEL} font-mono`}>{row.jam_selesai || "-"}</td>
                    <td className={KELAS_SEL}>{row.nm_poli}</td>
                    <td className={`${KELAS_SEL} text-right font-mono`}>{String(row.kuota ?? 0)}</td>
                  </tr>
                );
              })}
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
          setFilterDokter("");
          setFilterPoli("");
          setFilterHari("");
          setHalaman(1);
        }}
        placeholderCari="Cari kode/nama dokter, hari, atau poliklinik..."
        filterTambahan={filterTambahan}
        onSimpan={simpanBaru}
        onBaru={resetSemua}
        onGanti={simpanGanti}
        onHapus={() => setDialogHapus(true)}
        disabledSimpan={menyimpan || !form.kd_dokter || !form.kd_poli || !form.kuota}
        disabledGanti={!kunciEdit || menyimpan}
        disabledHapus={centang.size === 0 || menyimpan}
        jumlahRecord={total}
        pagination={pagination}
        memuat={memuat}
      />

      <KonfirmasiDialog
        terbuka={dialogHapus}
        judul="Hapus Jadwal Praktek"
        pesan={`Hapus ${centang.size} jadwal dokter terpilih?`}
        subPesan="Baris akan dihapus permanen dari tabel jadwal dan tidak dapat dibatalkan."
        onBatal={() => setDialogHapus(false)}
        onKonfirmasi={hapusTerpilih}
        sedangMemproses={menyimpan}
      />
      <Toast message={toast?.pesan ?? null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  KONDISI_PULANG,
  PANJANG_RESUME,
  resumeKosong,
  type BarisResume,
  type ResumePasienData,
  type ResumePasienForm,
} from "@/lib/resume-pasien/types";

interface PasanganKode {
  judul: string;
  nama: keyof ResumePasienForm;
  kode: keyof ResumePasienForm;
}

const DIAGNOSA: PasanganKode[] = [
  { judul: "Diagnosa Utama", nama: "diagnosa_utama", kode: "kd_diagnosa_utama" },
  { judul: "Diagnosa Sekunder 1", nama: "diagnosa_sekunder", kode: "kd_diagnosa_sekunder" },
  { judul: "Diagnosa Sekunder 2", nama: "diagnosa_sekunder2", kode: "kd_diagnosa_sekunder2" },
  { judul: "Diagnosa Sekunder 3", nama: "diagnosa_sekunder3", kode: "kd_diagnosa_sekunder3" },
  { judul: "Diagnosa Sekunder 4", nama: "diagnosa_sekunder4", kode: "kd_diagnosa_sekunder4" },
];

const PROSEDUR: PasanganKode[] = [
  { judul: "Prosedur Utama", nama: "prosedur_utama", kode: "kd_prosedur_utama" },
  { judul: "Prosedur Sekunder 1", nama: "prosedur_sekunder", kode: "kd_prosedur_sekunder" },
  { judul: "Prosedur Sekunder 2", nama: "prosedur_sekunder2", kode: "kd_prosedur_sekunder2" },
  { judul: "Prosedur Sekunder 3", nama: "prosedur_sekunder3", kode: "kd_prosedur_sekunder3" },
];

const KOLOM_TABEL: { label: string; kunci: keyof BarisResume }[] = [
  { label: "Tgl. Rawat", kunci: "tgl_registrasi" },
  { label: "No. Rawat", kunci: "no_rawat" },
  { label: "No. RM", kunci: "no_rkm_medis" },
  { label: "Nama Pasien", kunci: "nm_pasien" },
  { label: "Kode Dokter", kunci: "kd_dokter" },
  { label: "Dokter Penanggung Jawab", kunci: "nm_dokter" },
  { label: "Pulang", kunci: "kondisi_pulang" },
  { label: "Keluhan utama riwayat penyakit yang positif", kunci: "keluhan_utama" },
  { label: "Jalannya penyakit selama perawatan", kunci: "jalannya_penyakit" },
  { label: "Pemeriksaan penunjang yang positif", kunci: "pemeriksaan_penunjang" },
  { label: "Hasil laboratorium yang positif", kunci: "hasil_laborat" },
  { label: "Diagnosa Utama", kunci: "diagnosa_utama" },
  { label: "ICD10 Utama", kunci: "kd_diagnosa_utama" },
  { label: "Diagnosa Sekunder 1", kunci: "diagnosa_sekunder" },
  { label: "ICD10 Sek 1", kunci: "kd_diagnosa_sekunder" },
  { label: "Diagnosa Sekunder 2", kunci: "diagnosa_sekunder2" },
  { label: "ICD10 Sek 2", kunci: "kd_diagnosa_sekunder2" },
  { label: "Diagnosa Sekunder 3", kunci: "diagnosa_sekunder3" },
  { label: "ICD10 Sek 3", kunci: "kd_diagnosa_sekunder3" },
  { label: "Diagnosa Sekunder 4", kunci: "diagnosa_sekunder4" },
  { label: "ICD10 Sek 4", kunci: "kd_diagnosa_sekunder4" },
  { label: "Prosedur Utama", kunci: "prosedur_utama" },
  { label: "ICD9 Utama", kunci: "kd_prosedur_utama" },
  { label: "Prosedur Sekunder 1", kunci: "prosedur_sekunder" },
  { label: "ICD9 Sek 1", kunci: "kd_prosedur_sekunder" },
  { label: "Prosedur Sekunder 2", kunci: "prosedur_sekunder2" },
  { label: "ICD9 Sek 2", kunci: "kd_prosedur_sekunder2" },
  { label: "Prosedur Sekunder 3", kunci: "prosedur_sekunder3" },
  { label: "ICD9 Sek 3", kunci: "kd_prosedur_sekunder3" },
  { label: "Obat-obatan waktu pulang/nasihat", kunci: "obat_pulang" },
];

function pesanDari(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function KolomBaca({ label, nilai, mono = false }: { label: string; nilai: string; mono?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-xs">
      <span className="shrink-0 text-slate-600">{label}</span>
      <span className={`min-w-0 truncate text-slate-800 ${mono ? "font-mono tabular-nums" : ""}`}>{nilai || "-"}</span>
    </div>
  );
}

function AreaInput({
  label,
  nilai,
  onUbah,
  batas,
  dinonaktifkan,
}: {
  label: string;
  nilai: string;
  onUbah: (nilai: string) => void;
  batas: number;
  dinonaktifkan: boolean;
}) {
  return (
    <label className="block text-[11px] font-medium text-slate-700">
      {label}
      <textarea
        value={nilai}
        maxLength={batas}
        disabled={dinonaktifkan}
        onChange={(event) => onUbah(event.target.value)}
        rows={2}
        className="mt-1 w-full resize-y rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs leading-relaxed text-slate-800 disabled:bg-slate-50 disabled:text-slate-600"
      />
    </label>
  );
}

function KontenResumePasien() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const noRawatDimuat = useRef("");
  const [data, setData] = useState<ResumePasienData | null>(null);
  const [form, setForm] = useState<ResumePasienForm>(resumeKosong());
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [barisTerpilih, setBarisTerpilih] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  const muatData = useCallback(async (controller: AbortController, perbaruiForm: boolean) => {
    if (!noRawat) {
      setData(null);
      setForm(resumeKosong());
      setBarisTerpilih("");
      noRawatDimuat.current = "";
      return;
    }
    setMemuat(true);
    try {
      const parameter = new URLSearchParams({ no_rawat: noRawat });
      if (tanggalAwal) parameter.set("tanggal_awal", tanggalAwal);
      if (tanggalAkhir) parameter.set("tanggal_akhir", tanggalAkhir);
      if (kataKunci.trim()) parameter.set("kata_kunci", kataKunci.trim());
      const response = await fetch(`/api/resume-pasien?${parameter.toString()}`, {
        signal: controller.signal,
        cache: "no-store",
      });
      const json: { success?: boolean; data?: ResumePasienData; error?: string } = await response.json();
      if (!response.ok || !json.success || !json.data) throw new Error(json.error || "Gagal memuat resume pasien.");
      setData(json.data);
      if (perbaruiForm) {
        setForm(json.data.resume);
        setBarisTerpilih(noRawat);
        noRawatDimuat.current = noRawat;
        if (!tanggalAwal && !tanggalAkhir) {
          setTanggalAwal(json.data.kunjungan.tgl_registrasi);
          setTanggalAkhir(json.data.kunjungan.tgl_registrasi);
        }
      }
    } catch (error) {
      if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat resume pasien."), "error");
    } finally {
      if (!controller.signal.aborted) setMemuat(false);
    }
  }, [noRawat, tanggalAwal, tanggalAkhir, kataKunci, tampilkanToast]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void muatData(controller, noRawat !== noRawatDimuat.current);
    }, kataKunci.trim() ? 250 : 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, noRawat, kataKunci]);

  const ubah = <K extends keyof ResumePasienForm>(kunci: K, nilai: ResumePasienForm[K]) => {
    setForm((lama) => ({ ...lama, [kunci]: nilai }));
  };

  const resetForm = () => {
    setForm(resumeKosong(noRawat, data?.resume.kd_dokter || ""));
    setBarisTerpilih("");
  };

  const ambilUnggulan = () => {
    const diagnosa = data?.unggulan.diagnosa || [];
    const prosedur = data?.unggulan.prosedur || [];
    setForm((lama) => ({
      ...lama,
      diagnosa_utama: diagnosa[0]?.nama || "",
      kd_diagnosa_utama: diagnosa[0]?.kode || "",
      diagnosa_sekunder: diagnosa[1]?.nama || "",
      kd_diagnosa_sekunder: diagnosa[1]?.kode || "",
      diagnosa_sekunder2: diagnosa[2]?.nama || "",
      kd_diagnosa_sekunder2: diagnosa[2]?.kode || "",
      diagnosa_sekunder3: diagnosa[3]?.nama || "",
      kd_diagnosa_sekunder3: diagnosa[3]?.kode || "",
      diagnosa_sekunder4: diagnosa[4]?.nama || "",
      kd_diagnosa_sekunder4: diagnosa[4]?.kode || "",
      prosedur_utama: prosedur[0]?.nama || "",
      kd_prosedur_utama: prosedur[0]?.kode || "",
      prosedur_sekunder: prosedur[1]?.nama || "",
      kd_prosedur_sekunder: prosedur[1]?.kode || "",
      prosedur_sekunder2: prosedur[2]?.nama || "",
      kd_prosedur_sekunder2: prosedur[2]?.kode || "",
      prosedur_sekunder3: prosedur[3]?.nama || "",
      kd_prosedur_sekunder3: prosedur[3]?.kode || "",
    }));
  };

  const simpan = async () => {
    if (!data) return;
    if (!data.bisa_ubah) return tampilkanToast("Resume hanya dapat diisi oleh dokter yang bersangkutan.", "error");
    if (!form.keluhan_utama.trim() || !form.jalannya_penyakit.trim() || !form.diagnosa_utama.trim()) {
      return tampilkanToast("Keluhan utama, jalannya penyakit, dan diagnosa utama wajib diisi.", "error");
    }
    setMenyimpan(true);
    try {
      const response = await fetch("/api/resume-pasien", {
        method: data.ada ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Resume gagal disimpan.");
      tampilkanToast(json.message || "Resume pasien berhasil disimpan.", "sukses");
      noRawatDimuat.current = "";
      await muatData(new AbortController(), true);
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resume gagal disimpan."), "error");
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async () => {
    if (!data?.ada) return;
    setMenyimpan(true);
    try {
      const response = await fetch(`/api/resume-pasien?no_rawat=${encodeURIComponent(data.resume.no_rawat)}`, {
        method: "DELETE",
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Resume gagal dihapus.");
      setKonfirmasiHapus(false);
      tampilkanToast(json.message || "Resume pasien berhasil dihapus.", "sukses");
      noRawatDimuat.current = "";
      await muatData(new AbortController(), true);
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resume gagal dihapus."), "error");
    } finally {
      setMenyimpan(false);
    }
  };

  const pilihBaris = (baris: BarisResume) => {
    setBarisTerpilih(baris.no_rawat);
    if (baris.no_rawat === noRawat) {
      if (data) setForm(data.resume);
      return;
    }
    router.replace(`/resume-pasien?no_rawat=${encodeURIComponent(baris.no_rawat)}`);
  };

  const bisaUbah = Boolean(data?.bisa_ubah);
  const kunjungan = data?.kunjungan;

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const nilai = String(new FormData(event.currentTarget).get("no_rawat") || "").trim();
            if (nilai) router.replace(`/resume-pasien?no_rawat=${encodeURIComponent(nilai)}`);
          }}
          className="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2.5 text-xs"
        >
          <label htmlFor="cari-no-rawat-resume" className="whitespace-nowrap font-medium text-slate-700">No. Rawat</label>
          <input
            key={noRawat}
            id="cari-no-rawat-resume"
            name="no_rawat"
            defaultValue={noRawat}
            placeholder="Masukkan no. rawat kunjungan rawat jalan"
            className="h-7 w-64 rounded-md border border-slate-300 px-2 font-mono text-xs text-slate-800"
          />
          <button type="submit" className="h-7 rounded-md border border-primary-200 bg-primary-50 px-3 text-xs font-semibold text-primary-700">Buka</button>
        </form>
        {kunjungan ? (
          <GridFormulirModul>
            <KolomBaca label="No. Rawat :" nilai={kunjungan.no_rawat} mono />
            <KolomBaca label="No. RM :" nilai={kunjungan.no_rkm_medis} mono />
            <KolomBaca label="Pasien :" nilai={`${kunjungan.nm_pasien} (${kunjungan.jk}, ${kunjungan.umurdaftar} ${kunjungan.sttsumur})`} />
            <KolomBaca label="Tgl. Rawat :" nilai={`${kunjungan.tgl_registrasi} ${kunjungan.jam_reg}`} mono />
            <KolomBaca label="Poli :" nilai={kunjungan.nm_poli || kunjungan.kd_poli} />
            <KolomBaca label="Dokter P.J. :" nilai={kunjungan.nm_dokter || kunjungan.kd_dokter} />
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="dokter-resume" className="shrink-0 text-slate-600">Kode Dokter :</label>
              <CustomSelect
                id="dokter-resume"
                value={form.kd_dokter}
                disabled={!bisaUbah}
                onChange={(event) => ubah("kd_dokter", event.target.value)}
                className="h-7 w-56 py-0.5 text-xs"
              >
                <option value="">Pilih dokter</option>
                {(data?.dokter || []).map((dokter) => (
                  <option key={dokter.kode} value={dokter.kode}>{dokter.kode} - {dokter.nama}</option>
                ))}
              </CustomSelect>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="kondisi-resume" className="shrink-0 text-slate-600">Kondisi Pulang :</label>
              <CustomSelect
                id="kondisi-resume"
                value={form.kondisi_pulang}
                disabled={!bisaUbah}
                onChange={(event) => ubah("kondisi_pulang", event.target.value as ResumePasienForm["kondisi_pulang"])}
                className="h-7 w-32 py-0.5 text-xs"
              >
                {KONDISI_PULANG.map((kondisi) => <option key={kondisi} value={kondisi}>{kondisi}</option>)}
              </CustomSelect>
            </div>
          </GridFormulirModul>
        ) : (
          <p className="py-3 text-xs text-slate-500">Pilih pasien rawat jalan dari menu Resume Pasien atau masukkan no. rawat di atas.</p>
        )}
      </section>

      <PanelInputData
        judul=".: Input Data"
        idPenyimpanan="resume-pasien"
        onSimpan={() => void simpan()}
        onBaru={resetForm}
        sedangMenyimpan={menyimpan}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AreaInput label="Keluhan utama riwayat penyakit yang positif" nilai={form.keluhan_utama} batas={PANJANG_RESUME.keluhan_utama} dinonaktifkan={!bisaUbah} onUbah={(nilai) => ubah("keluhan_utama", nilai)} />
            <AreaInput label="Jalannya penyakit selama perawatan" nilai={form.jalannya_penyakit} batas={PANJANG_RESUME.jalannya_penyakit} dinonaktifkan={!bisaUbah} onUbah={(nilai) => ubah("jalannya_penyakit", nilai)} />
            <AreaInput label="Pemeriksaan penunjang yang positif" nilai={form.pemeriksaan_penunjang} batas={PANJANG_RESUME.pemeriksaan_penunjang} dinonaktifkan={!bisaUbah} onUbah={(nilai) => ubah("pemeriksaan_penunjang", nilai)} />
            <AreaInput label="Hasil laboratorium yang positif" nilai={form.hasil_laborat} batas={PANJANG_RESUME.hasil_laborat} dinonaktifkan={!bisaUbah} onUbah={(nilai) => ubah("hasil_laborat", nilai)} />
            <AreaInput label="Obat-obatan waktu pulang/nasihat" nilai={form.obat_pulang} batas={PANJANG_RESUME.obat_pulang} dinonaktifkan={!bisaUbah} onUbah={(nilai) => ubah("obat_pulang", nilai)} />
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-2.5">
            <h3 className="text-xs font-semibold text-slate-800">Diagnosa dan Prosedur</h3>
            <button
              type="button"
              disabled={!bisaUbah || ((data?.unggulan.diagnosa.length || 0) === 0 && (data?.unggulan.prosedur.length || 0) === 0)}
              onClick={ambilUnggulan}
              className="h-7 rounded-md border border-primary-200 bg-primary-50 px-3 text-xs font-semibold text-primary-700 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
            >
              Ambil Diagnosa/Prosedur Kunjungan
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {DIAGNOSA.map((pasangan) => (
              <div key={pasangan.nama} className="grid grid-cols-[minmax(0,1fr)_8rem] gap-1.5">
                <label className="block text-[11px] font-medium text-slate-700">
                  {pasangan.judul}
                  <input
                    value={String(form[pasangan.nama])}
                    maxLength={PANJANG_RESUME[pasangan.nama as keyof typeof PANJANG_RESUME]}
                    disabled={!bisaUbah}
                    onChange={(event) => ubah(pasangan.nama, event.target.value)}
                    className="mt-1 h-7 w-full rounded-md border border-slate-300 px-2 text-xs text-slate-800 disabled:bg-slate-50"
                  />
                </label>
                <label className="block text-[11px] font-medium text-slate-700">
                  Kode ICD-10
                  <input
                    value={String(form[pasangan.kode])}
                    maxLength={PANJANG_RESUME[pasangan.kode as keyof typeof PANJANG_RESUME]}
                    disabled={!bisaUbah}
                    onChange={(event) => ubah(pasangan.kode, event.target.value)}
                    className="mt-1 h-7 w-full rounded-md border border-slate-300 px-2 font-mono text-xs text-slate-800 disabled:bg-slate-50"
                  />
                </label>
              </div>
            ))}
            {PROSEDUR.map((pasangan) => (
              <div key={pasangan.nama} className="grid grid-cols-[minmax(0,1fr)_7rem] gap-1.5">
                <label className="block text-[11px] font-medium text-slate-700">
                  {pasangan.judul}
                  <input
                    value={String(form[pasangan.nama])}
                    maxLength={PANJANG_RESUME[pasangan.nama as keyof typeof PANJANG_RESUME]}
                    disabled={!bisaUbah}
                    onChange={(event) => ubah(pasangan.nama, event.target.value)}
                    className="mt-1 h-7 w-full rounded-md border border-slate-300 px-2 text-xs text-slate-800 disabled:bg-slate-50"
                  />
                </label>
                <label className="block text-[11px] font-medium text-slate-700">
                  Kode ICD-9
                  <input
                    value={String(form[pasangan.kode])}
                    maxLength={PANJANG_RESUME[pasangan.kode as keyof typeof PANJANG_RESUME]}
                    disabled={!bisaUbah}
                    onChange={(event) => ubah(pasangan.kode, event.target.value)}
                    className="mt-1 h-7 w-full rounded-md border border-slate-300 px-2 font-mono text-xs text-slate-800 disabled:bg-slate-50"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </PanelInputData>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[4600px] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Daftar resume pasien rawat jalan</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                {KOLOM_TABEL.map((kolom) => (
                  <th key={kolom.kunci} scope="col" className="whitespace-nowrap border-b border-r border-slate-200 px-2 py-2 font-semibold">
                    {kolom.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!data || memuat ? (
                <tr><td colSpan={KOLOM_TABEL.length} className="p-8 text-center text-slate-500">Memuat resume pasien...</td></tr>
              ) : data.daftar.length === 0 ? (
                <tr><td colSpan={KOLOM_TABEL.length} className="p-8 text-center text-slate-400">Belum ada resume pasien.</td></tr>
              ) : data.daftar.map((baris) => (
                <tr
                  key={baris.no_rawat}
                  aria-current={barisTerpilih === baris.no_rawat ? "true" : undefined}
                  onClick={() => pilihBaris(baris)}
                  className={`cursor-pointer border-b border-slate-100 ${barisTerpilih === baris.no_rawat ? "bg-primary-50" : "even:bg-slate-50/60"}`}
                >
                  {KOLOM_TABEL.map((kolom) => (
                    <td key={kolom.kunci} className="max-w-[22rem] truncate whitespace-nowrap border-r border-slate-100 px-2 py-1.5">
                      {String(baris[kolom.kunci] ?? "") || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        tanggalMulai={tanggalAwal}
        tanggalSelesai={tanggalAkhir}
        onGantiTanggalMulai={setTanggalAwal}
        onGantiTanggalSelesai={setTanggalAkhir}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={() => {
          noRawatDimuat.current = "";
          void muatData(new AbortController(), false);
        }}
        placeholderCari="No. rawat, nama pasien, dokter, diagnosa, atau prosedur..."
        onSimpan={() => void simpan()}
        onBaru={resetForm}
        onHapus={() => setKonfirmasiHapus(true)}
        onCetak={() => tampilkanToast("Cetak resume belum tersedia di Khanza Web.", "info")}
        disabledSimpan={!data || !bisaUbah || menyimpan || !form.keluhan_utama.trim() || !form.jalannya_penyakit.trim() || !form.diagnosa_utama.trim()}
        disabledHapus={!data?.ada || !bisaUbah || menyimpan}
        memuat={memuat || menyimpan}
        jumlahRecord={data?.total || 0}
      />

      <KonfirmasiDialog
        terbuka={konfirmasiHapus}
        judul="Hapus Resume Pasien"
        pesan={`Hapus resume pasien ${data?.kunjungan.nm_pasien || ""} untuk no. rawat ${data?.resume.no_rawat || ""}?`}
        subPesan="Data resume yang dihapus tidak dapat dikembalikan."
        teksKonfirmasi="Hapus Resume"
        bahaya
        sedangMemproses={menyimpan}
        onBatal={() => setKonfirmasiHapus(false)}
        onKonfirmasi={() => void hapus()}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

export default function HalamanResumePasien() {
  return (
    <Suspense fallback={<div className="module-page flex h-full w-full items-center justify-center bg-slate-50 text-xs text-slate-600">Memuat Resume Pasien...</div>}>
      <KontenResumePasien />
    </Suspense>
  );
}

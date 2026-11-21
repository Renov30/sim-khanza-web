"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { STATUS_PULANG } from "@/lib/rawat-inap/constants";
import { biayaInap, hitungLamaPratinjau } from "@/lib/rawat-inap/hitung";
import type { BarisRawatInapMutasi, HasilPulang, KonfigurasiInap } from "@/lib/rawat-inap/types";
import { jamSekarang, tanggalSekarang } from "@/lib/rawat-inap/waktu";

export type { HasilPulang };

interface DialogPulangProps {
  baris: BarisRawatInapMutasi;
  padaTutup: () => void;
  padaSukses: (hasil: HasilPulang) => void;
}

const konfigurasiAwal: KonfigurasiInap = { lamajam: 12, hariawal: "No", diagnosaakhir: "Yes" };

export function DialogPulangRawatInap({ baris, padaTutup, padaSukses }: DialogPulangProps) {
  const [tanggalKeluar, setTanggalKeluar] = useState(tanggalSekarang);
  const [jamKeluar, setJamKeluar] = useState(jamSekarang);
  const [statusPulang, setStatusPulang] = useState<string>("Sehat");
  const [diagnosaAkhir, setDiagnosaAkhir] = useState(baris.diagnosa_akhir || "");
  const [lamaManual, setLamaManual] = useState(String(Number(baris.lama || 1)));
  const [tarif, setTarif] = useState(String(Number(baris.trf_kamar || 0)));
  const [lamaOtomatis, setLamaOtomatis] = useState(true);
  const [konfigurasi, setKonfigurasi] = useState<KonfigurasiInap>(konfigurasiAwal);
  const [daftarStatus, setDaftarStatus] = useState<string[]>([...STATUS_PULANG]);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    let aktif = true;
    async function muatKonfigurasi() {
      try {
        const res = await fetch("/api/rawat-inap/pulang");
        const json = await res.json() as {
          success?: boolean;
          data?: { konfigurasi?: KonfigurasiInap; status_pulang?: string[] };
          error?: string;
        };
        if (!aktif) return;
        if (!json.success || !json.data) throw new Error(json.error || "Gagal memuat konfigurasi pulang.");
        if (json.data.konfigurasi) setKonfigurasi(json.data.konfigurasi);
        if (Array.isArray(json.data.status_pulang) && json.data.status_pulang.length) {
          setDaftarStatus(json.data.status_pulang);
        }
      } catch (error: unknown) {
        if (aktif) setPesanError(error instanceof Error ? error.message : "Gagal memuat konfigurasi pulang.");
      } finally {
        if (aktif) setMemuat(false);
      }
    }
    void muatKonfigurasi();
    return () => { aktif = false; };
  }, []);

  const lamaHitung = hitungLamaPratinjau(baris.tgl_masuk, baris.jam_masuk, tanggalKeluar, jamKeluar, konfigurasi);
  const lama = lamaOtomatis ? String(lamaHitung) : lamaManual;
  const biaya = biayaInap(Number(lama) || 0, Number(tarif) || 0);

  async function simpan() {
    if (konfigurasi.diagnosaakhir === "Yes" && !diagnosaAkhir.trim()) {
      setPesanError("Diagnosa akhir keluar wajib diisi.");
      return;
    }
    setMenyimpan(true);
    setPesanError(null);
    try {
      const res = await fetch("/api/rawat-inap/pulang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: baris.no_rawat,
          kd_kamar: baris.kd_kamar,
          tgl_masuk: baris.tgl_masuk,
          jam_masuk: baris.jam_masuk,
          tgl_keluar: tanggalKeluar,
          jam_keluar: jamKeluar,
          status_pulang: statusPulang,
          diagnosa_akhir: diagnosaAkhir,
          lama: Number(lama),
          tarif: Number(tarif),
          ttl_biaya: Number(biaya),
        }),
      });
      const json = await res.json() as { success?: boolean; data?: HasilPulang; error?: string };
      if (!res.ok || !json.success || !json.data) throw new Error(json.error || "Proses pulang pasien gagal disimpan.");
      padaSukses(json.data);
    } catch (error: unknown) {
      setPesanError(error instanceof Error ? error.message : "Proses pulang pasien gagal disimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <Modal terbuka judul="Pulang / Check Out Pasien" padaTutup={padaTutup} lebar="max-w-3xl">
      <div className="space-y-3 p-3 text-xs text-slate-700">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>No. Rawat <span className="font-mono font-semibold text-slate-800">{baris.no_rawat}</span></span>
            <span>No. RM <span className="font-mono font-semibold text-slate-800">{baris.no_rkm_medis}</span></span>
            <span>Nama <span className="font-semibold text-slate-800">{baris.nm_pasien}</span></span>
            <span>Kamar <span className="font-semibold text-slate-800">{baris.nm_bangsal ? `${baris.nm_bangsal} (${baris.kd_kamar})` : baris.kd_kamar}</span></span>
          </div>
        </div>

        {pesanError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-red-700" role="alert">
            {pesanError}
          </div>
        )}

        <GridFormulirModul>
          <div className="space-y-1">
            <label htmlFor="pulang-tanggal" className="block text-slate-600">Tanggal Keluar</label>
            <input
              id="pulang-tanggal"
              type="date"
              value={tanggalKeluar}
              onChange={(event) => setTanggalKeluar(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-jam" className="block text-slate-600">Jam Keluar</label>
            <input
              id="pulang-jam"
              type="time"
              step={1}
              value={jamKeluar}
              onChange={(event) => setJamKeluar(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-status" className="block text-slate-600">Status Pulang/Keluar</label>
            <CustomSelect
              id="pulang-status"
              value={statusPulang}
              onChange={(event) => setStatusPulang(event.target.value)}
              aria-label="Status pulang"
            >
              {daftarStatus.map((status) => <option key={status} value={status}>{status}</option>)}
            </CustomSelect>
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-diagnosa" className="block text-slate-600">Diagnosa Akhir Keluar</label>
            <input
              id="pulang-diagnosa"
              type="text"
              maxLength={100}
              value={diagnosaAkhir}
              onChange={(event) => setDiagnosaAkhir(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-lama" className="block text-slate-600">Lama (Hari)</label>
            <div className="flex items-center gap-2">
              <input
                id="pulang-lama"
                type="number"
                min={0}
                value={lama}
                onChange={(event) => { setLamaOtomatis(false); setLamaManual(event.target.value); }}
                className="h-7 w-24 rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
              />
              <label className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  checked={lamaOtomatis}
                  onChange={(event) => setLamaOtomatis(event.target.checked)}
                  aria-label="Hitung lama secara otomatis"
                  title="Hitung lama secara otomatis"
                  className="h-3 w-3 accent-primary-600"
                />
              </label>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-tarif" className="block text-slate-600">Tarif Kamar</label>
            <input
              id="pulang-tarif"
              type="number"
              min={0}
              value={tarif}
                onChange={(event) => setTarif(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pulang-biaya" className="block text-slate-600">Total Biaya Kamar</label>
            <input
              id="pulang-biaya"
              type="number"
              min={0}
              value={biaya}
              readOnly
              className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
        </GridFormulirModul>
      </div>
      <PanelBawah
        tampilan="web"
        memuat={memuat || menyimpan}
        tampilkanRecord={false}
        onSimpan={() => void simpan()}
        onKembali={padaTutup}
        labelKembali="Tutup"
      />
    </Modal>
  );
}

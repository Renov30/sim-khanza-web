"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { TEMPAT_MENINGGAL } from "@/lib/rawat-inap/constants";
import type { DokterPilihan, HasilPulang } from "@/lib/rawat-inap/types";
import { jamSekarang, tanggalSekarang } from "@/lib/rawat-inap/waktu";

interface DialogPasienMatiProps {
  hasil: HasilPulang;
  padaTutup: () => void;
  padaSukses: (pesan: string) => void;
}

export function DialogPasienMati({ hasil, padaTutup, padaSukses }: DialogPasienMatiProps) {
  const [tanggal, setTanggal] = useState(tanggalSekarang);
  const [jam, setJam] = useState(jamSekarang);
  const [keterangan, setKeterangan] = useState("");
  const [tempatMeninggal, setTempatMeninggal] = useState<string>(TEMPAT_MENINGGAL[0]);
  const [kdDokter, setKdDokter] = useState("");
  const [icd, setIcd] = useState(["", "", "", ""]);
  const [daftarDokter, setDaftarDokter] = useState<DokterPilihan[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    let aktif = true;
    async function muatDokter() {
      try {
        const res = await fetch("/api/rawat-inap/pasien-mati");
        const json = await res.json() as { success?: boolean; data?: { dokter?: DokterPilihan[] }; error?: string };
        if (!aktif) return;
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat daftar dokter.");
        setDaftarDokter(json.data?.dokter || []);
      } catch (error: unknown) {
        if (aktif) setPesanError(error instanceof Error ? error.message : "Gagal memuat daftar dokter.");
      } finally {
        if (aktif) setMemuat(false);
      }
    }
    void muatDokter();
    return () => { aktif = false; };
  }, []);

  async function simpan() {
    if (!keterangan.trim()) {
      setPesanError("Keterangan wajib diisi.");
      return;
    }
    if (!kdDokter) {
      setPesanError("Dokter penanggung jawab wajib dipilih.");
      return;
    }
    setMenyimpan(true);
    setPesanError(null);
    try {
      const res = await fetch("/api/rawat-inap/pasien-mati", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rkm_medis: hasil.no_rkm_medis,
          tanggal,
          jam,
          keterangan,
          tempat_meninggal: tempatMeninggal,
          icd1: icd[0],
          icd2: icd[1],
          icd3: icd[2],
          icd4: icd[3],
          kd_dokter: kdDokter,
        }),
      });
      const json = await res.json() as { success?: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error || "Data pasien meninggal gagal disimpan.");
      padaSukses(json.message || "Data pasien meninggal berhasil disimpan.");
    } catch (error: unknown) {
      setPesanError(error instanceof Error ? error.message : "Data pasien meninggal gagal disimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <Modal terbuka judul="Data Pasien Meninggal" padaTutup={padaTutup} lebar="max-w-3xl">
      <div className="space-y-3 p-3 text-xs text-slate-700">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>No. RM <span className="font-mono font-semibold text-slate-800">{hasil.no_rkm_medis}</span></span>
            <span>Nama <span className="font-semibold text-slate-800">{hasil.nm_pasien}</span></span>
            <span>No. Rawat <span className="font-mono font-semibold text-slate-800">{hasil.no_rawat}</span></span>
          </div>
        </div>

        {pesanError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-red-700" role="alert">
            {pesanError}
          </div>
        )}

        <GridFormulirModul>
          <div className="space-y-1">
            <label htmlFor="mati-tanggal" className="block text-slate-600">Tanggal Meninggal</label>
            <input
              id="mati-tanggal"
              type="date"
              value={tanggal}
              onChange={(event) => setTanggal(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="mati-jam" className="block text-slate-600">Jam Meninggal</label>
            <input
              id="mati-jam"
              type="time"
              step={1}
              value={jam}
              onChange={(event) => setJam(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="mati-keterangan" className="block text-slate-600">Keterangan</label>
            <input
              id="mati-keterangan"
              type="text"
              maxLength={100}
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="mati-tempat" className="block text-slate-600">Tempat Meninggal</label>
            <CustomSelect
              id="mati-tempat"
              value={tempatMeninggal}
              onChange={(event) => setTempatMeninggal(event.target.value)}
              aria-label="Tempat meninggal"
            >
              {TEMPAT_MENINGGAL.map((tempat) => <option key={tempat} value={tempat}>{tempat}</option>)}
            </CustomSelect>
          </div>
          {icd.map((nilai, indeks) => (
            <div className="space-y-1" key={indeks}>
              <label htmlFor={`mati-icd-${indeks}`} className="block text-slate-600">ICD {indeks + 1}</label>
              <input
                id={`mati-icd-${indeks}`}
                type="text"
                maxLength={20}
                value={nilai}
                onChange={(event) => setIcd((sebelum) => sebelum.map((item, i) => i === indeks ? event.target.value : item))}
                className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            </div>
          ))}
          <div className="space-y-1">
            <label htmlFor="mati-dokter" className="block text-slate-600">Dokter Penanggung Jawab</label>
            <CustomSelect
              id="mati-dokter"
              disabled={memuat || daftarDokter.length === 0}
              value={kdDokter}
              onChange={(event) => setKdDokter(event.target.value)}
              aria-label="Dokter penanggung jawab"
            >
              <option value="">Pilih dokter</option>
              {daftarDokter.map((dokter) => (
                <option key={dokter.kd_dokter} value={dokter.kd_dokter}>{dokter.nm_dokter}</option>
              ))}
            </CustomSelect>
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

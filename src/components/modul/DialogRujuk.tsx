"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { AMBULANCE, KATEGORI_RUJUK } from "@/lib/rawat-inap/constants";
import type { DokterPilihan, HasilPulang } from "@/lib/rawat-inap/types";
import { jamSekarang, tanggalSekarang } from "@/lib/rawat-inap/waktu";

interface DialogRujukProps {
  hasil: HasilPulang;
  padaTutup: () => void;
  padaSukses: (pesan: string) => void;
}

export function DialogRujuk({ hasil, padaTutup, padaSukses }: DialogRujukProps) {
  const [tanggal, setTanggal] = useState(tanggalSekarang);
  const [jam, setJam] = useState(jamSekarang);
  const [rujukKe, setRujukKe] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [kategori, setKategori] = useState<string>(KATEGORI_RUJUK[0]);
  const [ambulance, setAmbulance] = useState<string>(AMBULANCE[0]);
  const [diagnosa, setDiagnosa] = useState(hasil.status_pulang === "Rujuk" ? "Rujuk" : "");
  const [keterangan, setKeterangan] = useState("");
  const [daftarDokter, setDaftarDokter] = useState<DokterPilihan[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    let aktif = true;
    async function muat() {
      try {
        const url = new URL("/api/rawat-inap/rujuk", window.location.origin);
        url.searchParams.set("no_rawat", hasil.no_rawat);
        const res = await fetch(url.toString());
        const json = await res.json() as {
          success?: boolean;
          data?: { dokter?: DokterPilihan[]; registrasi?: { kd_dokter: string } | null };
          error?: string;
        };
        if (!aktif) return;
        if (!res.ok || !json.success) throw new Error(json.error || "Gagal memuat data rujuk.");
        setDaftarDokter(json.data?.dokter || []);
        if (json.data?.registrasi?.kd_dokter) setKdDokter(json.data.registrasi.kd_dokter);
      } catch (error: unknown) {
        if (aktif) setPesanError(error instanceof Error ? error.message : "Gagal memuat data rujuk.");
      } finally {
        if (aktif) setMemuat(false);
      }
    }
    void muat();
    return () => { aktif = false; };
  }, [hasil.no_rawat]);

  async function simpan() {
    if (!rujukKe.trim()) {
      setPesanError("Tempat rujuk wajib diisi.");
      return;
    }
    if (!kdDokter) {
      setPesanError("Dokter penanggung jawab wajib dipilih.");
      return;
    }
    setMenyimpan(true);
    setPesanError(null);
    try {
      const res = await fetch("/api/rawat-inap/rujuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: hasil.no_rawat,
          rujuk_ke: rujukKe,
          tgl_rujuk: tanggal,
          jam,
          kd_dokter: kdDokter,
          kat_rujuk: kategori,
          ambulance,
          keterangan_diagnosa: diagnosa,
          keterangan,
        }),
      });
      const json = await res.json() as { success?: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error || "Data rujuk keluar gagal disimpan.");
      padaSukses(json.message || "Data rujuk keluar berhasil disimpan.");
    } catch (error: unknown) {
      setPesanError(error instanceof Error ? error.message : "Data rujuk keluar gagal disimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  return (
    <Modal terbuka judul="Rujuk Keluar Pasien" padaTutup={padaTutup} lebar="max-w-3xl">
      <div className="space-y-3 p-3 text-xs text-slate-700">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>No. Rawat <span className="font-mono font-semibold text-slate-800">{hasil.no_rawat}</span></span>
            <span>No. RM <span className="font-mono font-semibold text-slate-800">{hasil.no_rkm_medis}</span></span>
            <span>Nama <span className="font-semibold text-slate-800">{hasil.nm_pasien}</span></span>
          </div>
        </div>

        {pesanError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-red-700" role="alert">
            {pesanError}
          </div>
        )}

        <GridFormulirModul>
          <div className="space-y-1">
            <label htmlFor="rujuk-tanggal" className="block text-slate-600">Tanggal Rujuk</label>
            <input
              id="rujuk-tanggal"
              type="date"
              value={tanggal}
              onChange={(event) => setTanggal(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-jam" className="block text-slate-600">Jam Rujuk</label>
            <input
              id="rujuk-jam"
              type="time"
              step={1}
              value={jam}
              onChange={(event) => setJam(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-ke" className="block text-slate-600">Tempat Rujuk</label>
            <input
              id="rujuk-ke"
              type="text"
              maxLength={150}
              value={rujukKe}
              onChange={(event) => setRujukKe(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-dokter" className="block text-slate-600">Dokter Penanggung Jawab</label>
            <CustomSelect
              id="rujuk-dokter"
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
          <div className="space-y-1">
            <label htmlFor="rujuk-kategori" className="block text-slate-600">Kategori Rujuk</label>
            <CustomSelect
              id="rujuk-kategori"
              value={kategori}
              onChange={(event) => setKategori(event.target.value)}
              aria-label="Kategori rujuk"
            >
              {KATEGORI_RUJUK.map((nilai) => <option key={nilai} value={nilai}>{nilai}</option>)}
            </CustomSelect>
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-ambulance" className="block text-slate-600">Ambulance</label>
            <CustomSelect
              id="rujuk-ambulance"
              value={ambulance}
              onChange={(event) => setAmbulance(event.target.value)}
              aria-label="Ambulance"
            >
              {AMBULANCE.map((nilai) => <option key={nilai} value={nilai}>{nilai}</option>)}
            </CustomSelect>
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-diagnosa" className="block text-slate-600">Keterangan Diagnosa</label>
            <input
              id="rujuk-diagnosa"
              type="text"
              maxLength={500}
              value={diagnosa}
              onChange={(event) => setDiagnosa(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="rujuk-keterangan" className="block text-slate-600">Keterangan</label>
            <input
              id="rujuk-keterangan"
              type="text"
              maxLength={500}
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
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

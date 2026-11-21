"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { biayaInap } from "@/lib/rawat-inap/hitung";
import type { BarisRawatInapMutasi, KamarTersedia, OpsiPindah } from "@/lib/rawat-inap/types";
import { jamSekarang, tanggalSekarang } from "@/lib/rawat-inap/waktu";

interface DialogPindahProps {
  baris: BarisRawatInapMutasi;
  padaTutup: () => void;
  padaSukses: (pesan: string) => void;
}

const PILIHAN_PINDAH: { nilai: OpsiPindah; teks: string }[] = [
  {
    nilai: 1,
    teks: "1. Kamar Inap sebelumnya dihapus dan pasien dihitung menginap mulai saat ini (Kamar Inap lama dihapus dari billing)",
  },
  {
    nilai: 2,
    teks: "2. Kamar Inap sebelumnya diganti kamarnya dengan Kamar Inap terbaru dan harga kamar menyesuaikan harga baru",
  },
  {
    nilai: 3,
    teks: "3. Kamar Inap sebelumnya distatuskan pindah, lama inap dihitung dan pasien dimasukkan Ke Kamar inap yang baru",
  },
  {
    nilai: 4,
    teks: "4. Seperti nomer 3, Kamar Inap sebelumnya mengikuti harga tertinggi",
  },
];

export function DialogPindahKamarRawatInap({ baris, padaTutup, padaSukses }: DialogPindahProps) {
  const [tanggal, setTanggal] = useState(tanggalSekarang);
  const [jamPindah, setJamPindah] = useState(jamSekarang);
  const [cariKamar, setCariKamar] = useState("");
  const [daftarKamar, setDaftarKamar] = useState<KamarTersedia[]>([]);
  const [kdKamarTujuan, setKdKamarTujuan] = useState("");
  const tujuanSaatIni = useRef("");
  const [tarifLama] = useState(Number(baris.trf_kamar || 0));
  const [tarifBaru, setTarifBaru] = useState(0);
  const [lamaBaru, setLamaBaru] = useState("1");
  const [opsi, setOpsi] = useState<OpsiPindah>(3);
  const [memuatKamar, setMemuatKamar] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    tujuanSaatIni.current = kdKamarTujuan;
  }, [kdKamarTujuan]);

  useEffect(() => {
    let aktif = true;
    async function muatKamar() {
      setMemuatKamar(true);
      try {
        const url = new URL("/api/rawat-inap/pindah-kamar", window.location.origin);
        url.searchParams.set("no_rawat", baris.no_rawat);
        if (cariKamar.trim()) url.searchParams.set("cari", cariKamar.trim());
        const res = await fetch(url.toString());
        const json = await res.json() as { success?: boolean; data?: KamarTersedia[]; error?: string };
        if (!aktif) return;
        if (!res.ok || !json.success || !Array.isArray(json.data)) {
          throw new Error(json.error || "Gagal memuat daftar kamar.");
        }
        setDaftarKamar(json.data);
        const tetap = tujuanSaatIni.current && json.data.some((kamar) => kamar.kd_kamar === tujuanSaatIni.current)
          ? tujuanSaatIni.current
          : json.data[0]?.kd_kamar || "";
        const kamarTerpilih = json.data.find((kamar) => kamar.kd_kamar === tetap);
        setKdKamarTujuan(tetap);
        setTarifBaru(kamarTerpilih ? Number(kamarTerpilih.tarif) : 0);
      } catch (error: unknown) {
        if (aktif) setPesanError(error instanceof Error ? error.message : "Gagal memuat daftar kamar.");
      } finally {
        if (aktif) setMemuatKamar(false);
      }
    }
    const timer = window.setTimeout(() => void muatKamar(), 200);
    return () => { aktif = false; window.clearTimeout(timer); };
  }, [baris.no_rawat, cariKamar]);

  async function simpan() {
    if (!kdKamarTujuan) {
      setPesanError("Pilih kamar tujuan terlebih dahulu.");
      return;
    }
    setMenyimpan(true);
    setPesanError(null);
    try {
      const res = await fetch("/api/rawat-inap/pindah-kamar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: baris.no_rawat,
          kd_kamar_asal: baris.kd_kamar,
          tgl_masuk: baris.tgl_masuk,
          jam_masuk: baris.jam_masuk,
          kd_kamar_tujuan: kdKamarTujuan,
          tanggal,
          jam: jamPindah,
          lama_baru: Number(lamaBaru),
          opsi,
        }),
      });
      const json = await res.json() as { success?: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error || "Pindah kamar gagal disimpan.");
      padaSukses(json.message || "Pindah kamar berhasil disimpan.");
    } catch (error: unknown) {
      setPesanError(error instanceof Error ? error.message : "Pindah kamar gagal disimpan.");
    } finally {
      setMenyimpan(false);
    }
  }

  const biayaBaru = biayaInap(Number(lamaBaru) || 0, tarifBaru);

  return (
    <Modal terbuka judul="Pindah Kamar Inap Pasien" padaTutup={padaTutup} lebar="max-w-4xl">
      <div className="space-y-3 p-3 text-xs text-slate-700">
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>No. Rawat <span className="font-mono font-semibold text-slate-800">{baris.no_rawat}</span></span>
            <span>No. RM <span className="font-mono font-semibold text-slate-800">{baris.no_rkm_medis}</span></span>
            <span>Nama <span className="font-semibold text-slate-800">{baris.nm_pasien}</span></span>
            <span>Kamar Asal <span className="font-semibold text-slate-800">{baris.kd_kamar}</span></span>
          </div>
        </div>

        {pesanError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-red-700" role="alert">
            {pesanError}
          </div>
        )}

        <GridFormulirModul>
          <div className="space-y-1">
            <label htmlFor="pindah-tanggal" className="block text-slate-600">Tanggal Pindah</label>
            <input
              id="pindah-tanggal"
              type="date"
              value={tanggal}
              onChange={(event) => setTanggal(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pindah-jam" className="block text-slate-600">Jam Pindah</label>
            <input
              id="pindah-jam"
              type="time"
              step={1}
              value={jamPindah}
              onChange={(event) => setJamPindah(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pindah-cari" className="block text-slate-600">Cari Kamar Kosong</label>
            <input
              id="pindah-cari"
              type="text"
              value={cariKamar}
              onChange={(event) => setCariKamar(event.target.value)}
              placeholder="Kode kamar atau bangsal"
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pindah-kamar" className="block text-slate-600">Kamar Tujuan</label>
            <CustomSelect
              id="pindah-kamar"
              disabled={memuatKamar || daftarKamar.length === 0}
              value={kdKamarTujuan}
              onChange={(event) => {
                setKdKamarTujuan(event.target.value);
                const kamar = daftarKamar.find((item) => item.kd_kamar === event.target.value);
                setTarifBaru(kamar ? Number(kamar.tarif) : 0);
              }}
              aria-label="Kamar tujuan"
            >
              {daftarKamar.map((kamar) => (
                <option key={kamar.kd_kamar} value={kamar.kd_kamar}>
                  {kamar.nm_bangsal} ({kamar.kd_kamar}) - {Number(kamar.tarif).toLocaleString("id-ID")}
                </option>
              ))}
            </CustomSelect>
          </div>
          <div className="space-y-1">
            <label className="block text-slate-600">Tarif Kamar Asal</label>
            <input
              type="text"
              value={tarifLama.toLocaleString("id-ID")}
              readOnly
              aria-label="Tarif kamar asal"
              className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-600">Tarif Kamar Tujuan</label>
            <input
              type="text"
              value={tarifBaru.toLocaleString("id-ID")}
              readOnly
              aria-label="Tarif kamar tujuan"
              className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="pindah-lama" className="block text-slate-600">Lama Inap Kamar Baru</label>
            <input
              id="pindah-lama"
              type="number"
              min={0}
              value={lamaBaru}
              onChange={(event) => setLamaBaru(event.target.value)}
              className="h-7 w-full rounded-md border border-slate-300 px-2 text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-slate-600">Biaya Kamar Baru</label>
            <input
              type="text"
              value={biayaBaru.toLocaleString("id-ID")}
              readOnly
              aria-label="Biaya kamar baru"
              className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-slate-800"
            />
          </div>
        </GridFormulirModul>

        <fieldset className="space-y-1.5 rounded-md border border-slate-200 p-2.5">
          <legend className="px-1 text-[11px] font-semibold text-slate-700">Pilihan</legend>
          {PILIHAN_PINDAH.map((pilihan) => (
            <label key={pilihan.nilai} className="flex items-start gap-2 text-[11px] leading-snug text-slate-700">
              <input
                type="radio"
                name="opsi-pindah-kamar"
                value={pilihan.nilai}
                checked={opsi === pilihan.nilai}
                onChange={() => setOpsi(pilihan.nilai)}
                className="mt-0.5 h-3 w-3 shrink-0 accent-primary-600"
              />
              <span>{pilihan.teks}</span>
            </label>
          ))}
          {opsi === 4 && (
            <p className="border-t border-slate-200 pt-1.5 text-[10px] text-slate-600">
              Opsi ini mengikuti perilaku Java apa adanya, termasuk aturan tarif sama menghasilkan biaya 0 dan kunci pembaruan baris lama sesuai referensi Java.
            </p>
          )}
        </fieldset>
      </div>
      <PanelBawah
        tampilan="web"
        memuat={memuatKamar || menyimpan}
        tampilkanRecord={false}
        onSimpan={() => void simpan()}
        onKembali={padaTutup}
        labelKembali="Tutup"
      />
    </Modal>
  );
}

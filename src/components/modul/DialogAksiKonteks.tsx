"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";

export type JenisAksiDialogKonteks =
  | {
      tipe: "ganti";
      aksiApi: "ganti_poli" | "ganti_dokter" | "ganti_penjab" | "ganti_diagnosa_awal" | "ganti_diagnosa_akhir" | "gabung_no_rawat";
      label: string;
      no_rawat: string;
      nm_pasien: string;
      kd_kamar?: string;
      tgl_masuk?: string;
      jam_masuk?: string;
    }
  | {
      tipe: "hapus";
      target: string;
      label: string;
      no_rawat: string;
      nm_pasien: string;
      kd_kamar?: string;
      tgl_masuk?: string;
      jam_masuk?: string;
    };

interface OpsiItem {
  value: string;
  label: string;
}

export async function jalankanAksiKonteksApi(
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; pesan: string }> {
  try {
    const res = await fetch("/api/konteks-aksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { success?: boolean; message?: string; error?: string };
    if (!res.ok || !json.success) {
      return { ok: false, pesan: json.error || "Gagal menjalankan aksi." };
    }
    return { ok: true, pesan: json.message || "Aksi berhasil dijalankan." };
  } catch (error) {
    return { ok: false, pesan: error instanceof Error ? error.message : "Gagal menghubungi server." };
  }
}

interface DialogAksiKonteksProps {
  aksi: JenisAksiDialogKonteks | null;
  onTutup: () => void;
  onSelesai: (pesan: string, tipe: "sukses" | "error") => void;
}

export function DialogAksiKonteks({ aksi, onTutup, onSelesai }: DialogAksiKonteksProps) {
  const [nilai, setNilai] = useState("");
  const [opsi, setOpsi] = useState<OpsiItem[]>([]);
  const [memuatOpsi, setMemuatOpsi] = useState(false);
  const [memproses, setMemproses] = useState(false);

  const opsiKey =
    aksi?.tipe === "ganti"
      ? aksi.aksiApi === "ganti_poli"
        ? "poli"
        : aksi.aksiApi === "ganti_dokter"
          ? "dokter"
          : aksi.aksiApi === "ganti_penjab"
            ? "penjab"
            : null
      : null;

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setNilai("");
      setOpsi([]);
    }, 0);
    if (!opsiKey) return () => window.clearTimeout(resetTimer);

    const controller = new AbortController();
    const fetchTimer = window.setTimeout(async () => {
      setMemuatOpsi(true);
      try {
        const res = await fetch(`/api/konteks-aksi?opsi=${opsiKey}`, { signal: controller.signal, cache: "no-store" });
        const json = (await res.json()) as { success?: boolean; data?: OpsiItem[] };
        if (res.ok && json.success && json.data) {
          setOpsi(json.data);
        }
      } catch {
        // diabaikan jika dibatalkan
      } finally {
        if (!controller.signal.aborted) setMemuatOpsi(false);
      }
    }, 0);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(fetchTimer);
      controller.abort();
    };
  }, [aksi, opsiKey]);

  if (!aksi) return null;

  if (aksi.tipe === "hapus") {
    const konfirmasiHapus = async () => {
      setMemproses(true);
      const hasil = await jalankanAksiKonteksApi({
        aksi: "hapus_data",
        target: aksi.target,
        no_rawat: aksi.no_rawat,
        kd_kamar: aksi.kd_kamar,
        tgl_masuk: aksi.tgl_masuk,
        jam_masuk: aksi.jam_masuk,
      });
      setMemproses(false);
      onTutup();
      onSelesai(hasil.pesan, hasil.ok ? "sukses" : "error");
    };

    return (
      <KonfirmasiDialog
        terbuka
        judul={`Konfirmasi Hapus — ${aksi.label}`}
        pesan={`Hapus data ${aksi.label} untuk No. Rawat ${aksi.no_rawat} (${aksi.nm_pasien})?`}
        subPesan="Tindakan ini menghapus data secara permanen pada database jika billing belum berstatus Sudah Bayar."
        teksKonfirmasi="Ya, Hapus"
        sedangMemproses={memproses}
        onBatal={onTutup}
        onKonfirmasi={() => { void konfirmasiHapus(); }}
      />
    );
  }

  const simpanGanti = async () => {
    const bersih = nilai.trim();
    if (!bersih) {
      onSelesai("Nilai baru wajib diisi terlebih dahulu.", "error");
      return;
    }
    setMemproses(true);
    const hasil = await jalankanAksiKonteksApi({
      aksi: aksi.aksiApi,
      no_rawat: aksi.no_rawat,
      nilai: bersih,
      kd_kamar: aksi.kd_kamar,
      tgl_masuk: aksi.tgl_masuk,
      jam_masuk: aksi.jam_masuk,
    });
    setMemproses(false);
    if (hasil.ok) onTutup();
    onSelesai(hasil.pesan, hasil.ok ? "sukses" : "error");
  };

  const labelField =
    aksi.aksiApi === "ganti_poli"
      ? "Poliklinik Baru"
      : aksi.aksiApi === "ganti_dokter"
        ? "Dokter Baru"
        : aksi.aksiApi === "ganti_penjab"
          ? "Jenis Bayar Baru"
          : aksi.aksiApi === "ganti_diagnosa_awal"
            ? "Diagnosa Awal Sementara"
            : aksi.aksiApi === "ganti_diagnosa_akhir"
              ? "Diagnosa Akhir Sementara"
              : "No. Rawat Tujuan Gabung";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={aksi.label}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <div>
            <h2 className="text-xs font-bold text-slate-800">{aksi.label}</h2>
            <p className="text-[11px] text-slate-500">
              <span className="font-mono text-slate-700">{aksi.no_rawat}</span> · {aksi.nm_pasien}
            </p>
          </div>
          <button
            type="button"
            onClick={onTutup}
            aria-label="Tutup dialog"
            className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <div className="space-y-1">
            <label htmlFor="dialog-aksi-konteks-nilai" className="block text-xs font-semibold text-slate-700">
              {labelField}
            </label>
            {opsiKey ? (
              <CustomSelect
                id="dialog-aksi-konteks-nilai"
                value={nilai}
                disabled={memuatOpsi || memproses}
                onChange={(e) => setNilai(e.target.value)}
                containerClassName="relative w-full"
                className="h-8 py-1 pr-8 text-xs"
              >
                <option value="">{memuatOpsi ? "Memuat pilihan..." : `-- Pilih ${labelField} --`}</option>
                {opsi.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </CustomSelect>
            ) : (
              <input
                id="dialog-aksi-konteks-nilai"
                type="text"
                value={nilai}
                disabled={memproses}
                onChange={(e) => setNilai(e.target.value)}
                placeholder={
                  aksi.aksiApi === "gabung_no_rawat"
                    ? "Contoh: 2026/11/26/000001"
                    : "Masukkan keterangan diagnosa..."
                }
                className="h-8 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-2.5">
          <button
            type="button"
            disabled={memproses}
            onClick={onTutup}
            className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={memproses || !nilai.trim()}
            onClick={() => { void simpanGanti(); }}
            className="h-8 rounded-md bg-primary-600 px-3 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {memproses ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}

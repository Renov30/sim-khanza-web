"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RiwayatPasienDialog } from "@/components/tindakan-rawat-jalan/RiwayatPasienDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";

interface Kunjungan {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
}

function KontenRiwayatPasien() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const noRawatValid = noRawat.length > 0 && noRawat.length <= 17;
  const [kunjungan, setKunjungan] = useState<Kunjungan | null>(null);
  const [memuat, setMemuat] = useState(noRawatValid);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => setToast({ pesan, tipe }), []);

  useEffect(() => {
    if (!noRawatValid) return;
    const controller = new AbortController();
    async function muatKunjungan() {
      setMemuat(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&no_rawat=${encodeURIComponent(noRawat)}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success || !json.data?.[0]) throw new Error(json.error || "Kunjungan pasien tidak ditemukan.");
        setKunjungan(json.data[0]);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat kunjungan pasien.", "error");
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muatKunjungan();
    return () => controller.abort();
  }, [noRawat, noRawatValid, tampilkanToast]);

  if (!noRawatValid) return (
    <main className="module-page flex h-full flex-col items-center justify-center gap-3 bg-slate-50 p-3 text-sm text-slate-600">
      <p>Pilih kunjungan pasien terlebih dahulu untuk melihat riwayat.</p>
      <button type="button" onClick={() => router.back()} className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700">Kembali</button>
    </main>
  );

  if (memuat) return <main className="module-page flex h-full items-center justify-center bg-slate-50 p-3 text-sm text-slate-500">Memuat data pasien...</main>;

  if (!kunjungan) return (
    <main className="module-page flex h-full flex-col items-center justify-center gap-3 bg-slate-50 p-3 text-sm text-slate-600">
      <p>Pilih kunjungan pasien terlebih dahulu untuk melihat riwayat.</p>
      <button type="button" onClick={() => router.back()} className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700">Kembali</button>
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </main>
  );

  return <RiwayatPasienDialog terbuka tampilan="halaman" noRm={kunjungan.no_rkm_medis} namaPasien={kunjungan.nm_pasien} onTutup={() => router.back()} onToast={tampilkanToast} />;
}

export default function HalamanRiwayatPasien() {
  return (
    <Suspense fallback={<main className="module-page flex h-full items-center justify-center bg-slate-50 p-3 text-sm text-slate-500">Memuat halaman riwayat pasien...</main>}>
      <KontenRiwayatPasien />
    </Suspense>
  );
}

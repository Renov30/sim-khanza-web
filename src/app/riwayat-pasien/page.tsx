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

interface PasienTerpilih {
  no_rkm_medis: string;
  nm_pasien: string;
}

function KontenRiwayatPasien() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const noRawatValid = noRawat.length > 0 && noRawat.length <= 17;
  const noRmParam = searchParams.get("no_rm")?.trim() || "";
  const [pasienTerpilih, setPasienTerpilih] = useState<PasienTerpilih | null>(() => noRmParam ? { no_rkm_medis: noRmParam, nm_pasien: "" } : null);
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
        setPasienTerpilih(json.data[0]);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(error instanceof Error ? error.message : "Gagal memuat kunjungan pasien.", "error");
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muatKunjungan();
    return () => controller.abort();
  }, [noRawat, noRawatValid, tampilkanToast]);

  if (memuat) return <main className="module-page flex h-full items-center justify-center bg-slate-50 p-3 text-sm text-slate-500">Memuat data pasien...</main>;

  return (
    <>
      <RiwayatPasienDialog
        key={pasienTerpilih?.no_rkm_medis || "belum-pilih"}
        terbuka
        tampilan="halaman"
        noRm={pasienTerpilih?.no_rkm_medis || ""}
        namaPasien={pasienTerpilih?.nm_pasien || ""}
        onPilihPasien={(noRm, nama) => {
          setPasienTerpilih({ no_rkm_medis: noRm, nm_pasien: nama });
          router.replace(`/riwayat-pasien?no_rm=${encodeURIComponent(noRm)}`);
        }}
        onTutup={() => router.back()}
        onToast={tampilkanToast}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </>
  );
}

export default function HalamanRiwayatPasien() {
  return (
    <Suspense fallback={<main className="module-page flex h-full items-center justify-center bg-slate-50 p-3 text-sm text-slate-500">Memuat halaman riwayat pasien...</main>}>
      <KontenRiwayatPasien />
    </Suspense>
  );
}

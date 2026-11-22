"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { PanelBawah } from "@/components/modul/PanelBawah";

interface ResepValidasi {
  no_resep: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  jenis: "ralan" | "ranap";
  kd_unit: string;
  nm_unit: string;
  kelas: string;
  jenis_bayar: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  tgl_validasi: string;
  jam_validasi: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  billing_terkunci: boolean;
  status_kunjungan: string;
}

interface DepotValidasi {
  kd_bangsal: string;
  nm_bangsal: string;
}

interface ItemValidasi {
  jenis_item: "Obat" | "Racikan" | "Bahan Racikan";
  no_racik: string;
  kode_item: string;
  nama_item: string;
  jumlah: number;
  satuan: string;
  aturan_pakai: string;
  kapasitas: number;
  kebutuhan_stok: number;
  stok: number;
  stok_cukup: boolean;
  harga_beli: number;
  harga: number;
  keterangan: string;
}

interface DataValidasi {
  resep: ResepValidasi;
  depot: DepotValidasi;
  detail: ItemValidasi[];
}

function rupiah(nilai: number) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(nilai);
}

function waktuLokal() {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date()).replaceAll(".", ":");
}

export default function HalamanValidasiObat() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<DataValidasi | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [jamValidasi, setJamValidasi] = useState(waktuLokal);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setJamValidasi(waktuLokal()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const noResep = new URLSearchParams(window.location.search).get("no_resep")?.trim() || "";
    if (!noResep) {
      const timer = window.setTimeout(() => {
        setMemuat(false);
        tampilkanToast("Nomor resep tidak ditemukan. Kembali dan pilih resep yang akan divalidasi.", "error");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const controller = new AbortController();
    async function muatData() {
      setMemuat(true);
      try {
        const response = await fetch(`/api/farmasi/validasi-obat?no_resep=${encodeURIComponent(noResep)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const json: { success?: boolean; data?: DataValidasi; error?: string } = await response.json();
        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.error || "Gagal memuat data validasi obat.");
        }
        setData(json.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setData(null);
          tampilkanToast(error instanceof Error ? error.message : "Gagal memuat data validasi obat.", "error");
        }
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muatData();
    return () => controller.abort();
  }, [isAuthenticated, tampilkanToast]);

  const totalPerkiraan = data?.detail.reduce((total, item) => (
    item.jenis_item === "Racikan" ? total : total + (item.harga * item.kebutuhan_stok)
  ), 0) || 0;
  const stokTidakCukup = data?.detail.filter((item) => item.jenis_item !== "Racikan" && !item.stok_cukup).length || 0;

  const validasi = async () => {
    if (!data || stokTidakCukup > 0 || data.resep.status_pelayanan === "Sudah Terlayani") return;
    setMenyimpan(true);
    try {
      const response = await fetch("/api/farmasi/validasi-obat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_resep: data.resep.no_resep }),
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Validasi obat gagal diproses.");
      setKonfirmasi(false);
      router.push(`/farmasi/no-resep?no_resep=${encodeURIComponent(data.resep.no_resep)}`);
    } catch (error) {
      tampilkanToast(error instanceof Error ? error.message : "Validasi obat gagal diproses.", "error");
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-xs text-slate-700 lg:grid-cols-3">
          <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-1.5">
            <span className="text-right">No. Resep :</span>
            <input readOnly aria-label="Nomor resep" value={data?.resep.no_resep || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
            <span className="text-right">No. Rawat :</span>
            <input readOnly aria-label="Nomor rawat" value={data?.resep.no_rawat || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
          </div>
          <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-1.5">
            <span className="text-right">Pasien :</span>
            <input readOnly aria-label="Identitas pasien" value={data ? `${data.resep.no_rkm_medis}  ${data.resep.nm_pasien}` : ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
            <span className="text-right">Peresep :</span>
            <input readOnly aria-label="Dokter peresep" value={data?.resep.nm_dokter || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
          </div>
          <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-1.5">
            <span className="text-right">Depo :</span>
            <input readOnly aria-label="Depo validasi" value={data ? `${data.depot.kd_bangsal}  ${data.depot.nm_bangsal}` : ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
            <span className="text-right">Waktu :</span>
            <input readOnly aria-label="Waktu validasi" value={jamValidasi} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs tabular-nums text-slate-800" />
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
          <table className="w-full min-w-[88rem] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Data obat, alat kesehatan, dan bahan medis habis pakai untuk validasi resep.</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="w-12 border-b border-slate-200 px-2 py-2 text-center">No.</th>
                <th scope="col" className="w-28 border-b border-slate-200 px-2 py-2 text-center">Jenis</th>
                <th scope="col" className="w-32 border-b border-slate-200 px-2 py-2 text-center">Kode Barang</th>
                <th scope="col" className="min-w-64 border-b border-slate-200 px-2 py-2">Nama Obat / Racikan</th>
                <th scope="col" className="w-20 border-b border-slate-200 px-2 py-2 text-center">Jumlah</th>
                <th scope="col" className="w-20 border-b border-slate-200 px-2 py-2 text-center">Satuan</th>
                <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2 text-center">Stok Depo</th>
                <th scope="col" className="w-28 border-b border-slate-200 px-2 py-2 text-right">Harga</th>
                <th scope="col" className="min-w-48 border-b border-slate-200 px-2 py-2">Aturan Pakai</th>
                <th scope="col" className="w-32 border-b border-slate-200 px-2 py-2 text-center">Kesiapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memuat ? (
                <tr><td colSpan={10} className="h-36 border-0 text-center text-slate-500">Memuat data obat resep...</td></tr>
              ) : !data ? (
                <tr><td colSpan={10} className="h-44 border-0 text-center text-slate-400"><FontAwesomeIcon icon={faClipboardCheck} className="mb-2 h-7 w-7 text-slate-300" /><p>Data validasi belum tersedia.</p></td></tr>
              ) : data.detail.length === 0 ? (
                <tr><td colSpan={10} className="h-44 border-0 text-center text-slate-400">Resep belum memiliki rincian obat.</td></tr>
              ) : data.detail.map((item, indeks) => (
                <tr key={`${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`} className={item.jenis_item === "Racikan" ? "bg-slate-100/70 font-semibold" : "bg-white hover:bg-slate-50/80"}>
                  <td className="px-2 py-1.5 text-center font-mono tabular-nums">{indeks + 1}</td>
                  <td className="px-2 py-1.5 text-center">{item.jenis_item}</td>
                  <td className={`${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""} px-2 py-1.5 text-center font-mono`}>{item.kode_item}</td>
                  <td className={`${item.jenis_item === "Bahan Racikan" ? "pl-6" : ""} px-2 py-1.5 text-slate-800`}>
                    {item.nama_item}
                    {item.keterangan && <span className="block font-normal text-slate-500">{item.keterangan}</span>}
                  </td>
                  <td className="px-2 py-1.5 text-center font-mono tabular-nums">{item.jumlah}</td>
                  <td className="px-2 py-1.5 text-center">{item.satuan || "-"}</td>
                  <td className="px-2 py-1.5 text-center font-mono tabular-nums">{item.jenis_item === "Racikan" ? "-" : item.stok}</td>
                  <td className="px-2 py-1.5 text-right font-mono tabular-nums">{item.jenis_item === "Racikan" ? "-" : rupiah(item.harga)}</td>
                  <td className="px-2 py-1.5">{item.aturan_pakai || "-"}</td>
                  <td className="px-2 py-1.5 text-center">
                    {item.jenis_item === "Racikan" || item.stok_cukup ? "Siap" : "Stok kurang"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PanelBawah
          tampilan="web"
          tampilkanRecord={false}
          filterTambahan={data ? (
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span>{data.resep.jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap"} · {data.resep.nm_unit}</span>
              <span>Status: {data.resep.status_pelayanan}</span>
              <span>Perkiraan: Rp {rupiah(totalPerkiraan)}</span>
              {stokTidakCukup > 0 && (
                <span className="inline-flex items-center gap-1 text-red-700">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5" />
                  {stokTidakCukup} item stok tidak cukup
                </span>
              )}
            </div>
          ) : undefined}
          tombolTambahan={[
            {
              label: "Validasi Obat",
              ikon: faClipboardCheck,
              onClick: () => setKonfirmasi(true),
              disabled: !data || memuat || menyimpan || stokTidakCukup > 0 || data.resep.status_pelayanan === "Sudah Terlayani",
              varian: "primer",
              tooltip: "Simpan validasi dan kurangi stok depo",
            },
          ]}
          memuat={memuat}
        />
      </section>

      <KonfirmasiDialog
        terbuka={konfirmasi}
        judul="Validasi Obat"
        pesan={`Validasi resep ${data?.resep.no_resep || "terpilih"} untuk ${data?.resep.nm_pasien || "pasien"}?`}
        subPesan="Stok depo akan dikurangi dan resep ditandai sudah terlayani. Pastikan rincian obat serta stok sudah benar."
        teksKonfirmasi="Validasi Obat"
        sedangMemproses={menyimpan}
        onBatal={() => setKonfirmasi(false)}
        onKonfirmasi={() => void validasi()}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

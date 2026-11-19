"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMagnifyingGlass, faPen, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { ToastTipe } from "@/components/common/Toast";
import { useKlien } from "@/lib/klien";
import { registrationDate } from "@/lib/registrasi/date";

interface DetailResep {
  jenis_item: "obat" | "racikan" | "bahan";
  kode_item: string;
  nama_item: string;
  jumlah: string;
  satuan: string;
  aturan_pakai: string;
  keterangan: string;
  no_racik: string;
}

interface ResepCopy {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: string;
  status_asal: string;
  detail: DetailResep[];
}

interface CopyResepDialogProps {
  terbuka: boolean;
  noRawat: string;
  noRm: string;
  namaPasien: string;
  status: "ralan" | "ranap";
  onTutup: () => void;
  onToast: (pesan: string, tipe?: ToastTipe) => void;
}

const teks = (nilai: unknown) => (nilai === null || nilai === undefined || nilai === "" ? "-" : String(nilai));

export function CopyResepDialog({ terbuka, noRawat, noRm, namaPasien, status, onTutup, onToast }: CopyResepDialogProps) {
  const router = useRouter();
  const terpasang = useKlien();
  const tombolTutup = useRef<HTMLButtonElement>(null);
  const hariIni = registrationDate();
  const [items, setItems] = useState<ResepCopy[]>([]);
  const [memuat, setMemuat] = useState(false);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [pakaiTanggal, setPakaiTanggal] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [cariObat, setCariObat] = useState("");
  const [cariObatAktif, setCariObatAktif] = useState("");
  const [versiCari, setVersiCari] = useState(0);

  useEffect(() => {
    if (!terbuka) return;
    const pengatur = window.setTimeout(() => tombolTutup.current?.focus(), 0);
    return () => window.clearTimeout(pengatur);
  }, [terbuka]);

  useEffect(() => {
    if (!terbuka) return;
    const keluarkan = (event: KeyboardEvent) => {
      if (event.key === "Escape") onTutup();
    };
    window.addEventListener("keydown", keluarkan);
    return () => window.removeEventListener("keydown", keluarkan);
  }, [terbuka, onTutup]);

  useEffect(() => {
    if (!terbuka || !noRm) return;
    const controller = new AbortController();
    async function muat() {
      setMemuat(true);
      try {
        const url = new URL("/api/farmasi/copy-resep", window.location.origin);
        url.searchParams.set("no_rm", noRm);
        url.searchParams.set("status", status);
        if (pakaiTanggal) {
          url.searchParams.set("tanggal_mulai", tanggalMulai);
          url.searchParams.set("tanggal_selesai", tanggalSelesai);
        }
        if (cariObatAktif) url.searchParams.set("cari_obat", cariObatAktif);
        url.searchParams.set("limit", "50");
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: { items: ResepCopy[] }; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat daftar resep");
        if (!controller.signal.aborted) {
          setItems(json.data?.items || []);
          setTerpilih(null);
        }
      } catch (error) {
        if (!controller.signal.aborted) onToast(error instanceof Error ? error.message : "Gagal memuat daftar resep", "error");
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muat();
    return () => controller.abort();
  }, [terbuka, noRm, status, pakaiTanggal, tanggalMulai, tanggalSelesai, cariObatAktif, versiCari, onToast]);

  const cari = useCallback(() => {
    setCariObatAktif(cariObat.trim());
    setVersiCari((nilai) => nilai + 1);
  }, [cariObat]);

  const semua = () => {
    setCariObat("");
    setCariObatAktif("");
    setPakaiTanggal(false);
    setVersiCari((nilai) => nilai + 1);
  };

  const salin = () => {
    if (!terpilih) return onToast("Pilih data resep dokter terlebih dahulu.", "info");
    if (status !== "ralan") return onToast("Copy resep rawat inap belum tersedia di Khanza Web.", "info");
    if (!noRawat) return onToast("Pilih kunjungan rawat jalan terlebih dahulu.", "info");
    const resep = items.find((item) => item.no_resep === terpilih);
    if (!resep) return onToast("Resep terpilih tidak ditemukan.", "error");
    const url = `/farmasi/resep-obat?no_rawat=${encodeURIComponent(noRawat)}&dari_no_resep=${encodeURIComponent(resep.no_resep)}`;
    onTutup();
    router.push(url);
  };

  if (!terpasang || !terbuka) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99998] flex items-stretch justify-center bg-black/50 p-2 sm:p-4" role="presentation">
      <div role="dialog" aria-modal="true" aria-labelledby="judul-copy-resep" className="flex w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-xl">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-2">
          <div>
            <h2 id="judul-copy-resep" className="text-xs font-semibold text-slate-900">Copy Resep</h2>
            <p className="text-[11px] text-slate-600"><span className="font-mono">{noRm || "-"}</span> · {namaPasien || "-"}</p>
          </div>
          <button ref={tombolTutup} type="button" onClick={onTutup} aria-label="Tutup copy resep" title="Tutup" className="rounded-full p-1 text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-600"><FontAwesomeIcon icon={faXmark} className="h-4 w-4" /></button>
        </div>

        <section className="m-2 rounded border border-[#f0f5eb] p-2" aria-label="Daftar resep dokter di kunjungan sebelumnya">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1 text-[11px] text-slate-700"><input type="checkbox" checked={pakaiTanggal} onChange={(event) => setPakaiTanggal(event.target.checked)} className="accent-primary-700" />Tanggal</label>
              <input type="date" value={tanggalMulai} disabled={!pakaiTanggal} onChange={(event) => setTanggalMulai(event.target.value)} aria-label="Tanggal mulai resep" className="h-7 rounded border border-slate-300 px-1.5 text-[11px] text-slate-800 disabled:bg-slate-100 disabled:text-slate-400" />
              <span className="text-[11px] text-slate-600">s.d</span>
              <input type="date" value={tanggalSelesai} disabled={!pakaiTanggal} onChange={(event) => setTanggalSelesai(event.target.value)} aria-label="Tanggal akhir resep" className="h-7 rounded border border-slate-300 px-1.5 text-[11px] text-slate-800 disabled:bg-slate-100 disabled:text-slate-400" />
              <button type="button" onClick={cari} aria-label="Cari resep" title="Cari (Alt+1)" className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-600"><FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" /></button>
              <button type="button" disabled title="Hapus resep belum tersedia di Khanza Web" aria-label="Hapus resep" className="flex h-7 items-center gap-1 rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-500 disabled:opacity-50"><FontAwesomeIcon icon={faTrashCan} className="h-3 w-3" />Hapus</button>
              <button type="button" onClick={salin} title="Salin resep terpilih ke Input Resep" aria-label="Copy resep" className="flex h-7 items-center gap-1 rounded border border-primary-300 bg-primary-50 px-2 text-[11px] font-semibold text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600"><FontAwesomeIcon icon={faCopy} className="h-3 w-3" />Copy</button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-[11px] text-slate-700">Cari Per Obat :</span>
              <input value={cariObat} onChange={(event) => setCariObat(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") cari(); }} placeholder="Nama atau kode obat" aria-label="Cari per obat" className="h-7 w-72 rounded border border-slate-300 px-2 text-[11px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-600" />
              <button type="button" onClick={semua} aria-label="Tampilkan semua resep" title="Semua (Alt+M)" className="flex h-7 w-7 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-600"><FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" /></button>
              <button type="button" disabled title="Ubah resep belum tersedia di Khanza Web" aria-label="Ubah resep" className="flex h-7 items-center gap-1 rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-500 disabled:opacity-50"><FontAwesomeIcon icon={faPen} className="h-3 w-3" />Ubah</button>
              <button type="button" onClick={onTutup} title="Keluar (Alt+K)" aria-label="Keluar" className="flex h-7 items-center gap-1 rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-600"><FontAwesomeIcon icon={faXmark} className="h-3 w-3" />Keluar</button>
            </div>
          </div>
        </section>

        <div className="min-h-0 flex-1 overflow-auto border-y border-slate-200 bg-white">
          <table className="w-full min-w-[900px] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Daftar resep dokter pada kunjungan sebelumnya</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                {["No.Resep", "Tgl.Resep", "Jam Resep", "No.Rawat", "No.RM", "Pasien", "Status"].map((judul) => <th key={judul} scope="col" className="whitespace-nowrap border-b border-r border-slate-200 px-2 py-1.5">{judul}</th>)}
              </tr>
            </thead>
            <tbody>
              {memuat ? (
                <tr><td colSpan={7} className="px-2 py-10 text-center text-slate-500">Memuat resep...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={7} className="px-2 py-10 text-center text-slate-400">Tidak ada resep pada kunjungan sebelumnya.</td></tr>
              ) : items.map((resep) => (
                <Fragment key={resep.no_resep}>
                  <tr className={terpilih === resep.no_resep ? "bg-primary-50" : ""} onDoubleClick={() => setTerpilih(resep.no_resep)}>
                    <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5"><button type="button" onClick={() => setTerpilih(resep.no_resep)} className="font-mono text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600">{resep.no_resep}</button></td>
                    <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5">{teks(resep.tgl_peresepan)}</td>
                    <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5">{teks(resep.jam_peresepan)}</td>
                    <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{teks(resep.no_rawat)}</td>
                    <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{teks(resep.no_rkm_medis)}</td>
                    <td className="border-b border-r border-slate-100 px-2 py-1.5">{teks(resep.nm_pasien)}<span className="block text-slate-500">{teks(resep.nm_dokter)}</span></td>
                    <td className="whitespace-nowrap border-b border-slate-100 px-2 py-1.5">{teks(resep.status_pelayanan)}</td>
                  </tr>
                  <tr className={terpilih === resep.no_resep ? "bg-primary-50/60" : ""}>
                    <td colSpan={7} className="border-b border-slate-100 p-0">
                      <table className="w-full border-collapse text-[10px] text-slate-600">
                        <caption className="sr-only">Rincian resep {resep.no_resep}</caption>
                        <thead className="bg-slate-50 text-slate-500">
                          <tr>
                            {["Jumlah", "Satuan", "Aturan Pakai", "Kode/No", "Nama Obat/Racikan", "Jenis"].map((judul) => <th key={judul} scope="col" className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1 text-left font-normal">{judul}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {resep.detail.length === 0 ? (
                            <tr><td colSpan={6} className="px-2 py-2 text-slate-400">Belum ada rincian obat.</td></tr>
                          ) : resep.detail.map((isi, indeks) => (
                            <tr key={`${resep.no_resep}-${isi.jenis_item}-${isi.no_racik}-${isi.kode_item}-${indeks}`} className="even:bg-slate-50/60">
                              <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1 text-right font-mono">{teks(isi.jumlah)}</td>
                              <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1">{teks(isi.satuan)}</td>
                              <td className="border-b border-r border-slate-100 px-2 py-1">{teks(isi.aturan_pakai)}</td>
                              <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1 font-mono">{teks(isi.kode_item)}</td>
                              <td className={`border-b border-r border-slate-100 px-2 py-1 ${isi.jenis_item === "bahan" ? "pl-6 text-slate-500" : "text-slate-800"}`}>{teks(isi.nama_item)}</td>
                              <td className="whitespace-nowrap border-b border-slate-100 px-2 py-1">{teks(isi.keterangan || resep.status_asal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-100 px-3 py-1.5 text-[11px] text-slate-600">
          <span>{items.length} resep ditemukan · {resepTerpilihLabel(items, terpilih)}</span>
          <span>Tekan Escape untuk keluar.</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function resepTerpilihLabel(items: ResepCopy[], terpilih: string | null) {
  if (!terpilih) return "belum ada resep dipilih";
  const resep = items.find((item) => item.no_resep === terpilih);
  return resep ? `terpilih ${resep.no_resep}` : "resep terpilih tidak ditemukan";
}

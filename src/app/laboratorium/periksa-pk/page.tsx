"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlaskVial } from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";

interface HasilLab {
  no_rawat: string; tgl_periksa: string; jam: string; status: string;
  no_rkm_medis: string; nm_pasien: string; png_jawab: string | null;
  kd_jenis_prw: string; nm_perawatan: string; pemeriksaan: string;
  nilai: string | null; satuan: string | null; nilai_rujukan: string | null; keterangan: string | null;
  ruang: string | null; nm_petugas: string | null; dokter_perujuk: string | null; penanggung_jawab: string | null;
}

export default function HalamanPeriksaLabPK() {
  const searchParams = useSearchParams();
  const noRawat = searchParams.get("no_rawat")?.trim() || "";
  const [data, setData] = useState<HasilLab[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [tanggalMulai, setTanggalMulai] = useState(() => noRawat ? "" : registrationDate());
  const [tanggalSelesai, setTanggalSelesai] = useState(() => noRawat ? "" : registrationDate());
  const [kataKunci, setKataKunci] = useState("");
  const [status, setStatus] = useState("");
  const [versiPencarian, setVersiPencarian] = useState(0);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error" } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({ limit: "500" });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (kataKunci.trim()) params.set("cari", kataKunci.trim());
      if (status) params.set("status", status);
      if (noRawat) params.set("no_rawat", noRawat);
      const response = await fetch(`/api/laboratorium/periksa-pk?${params}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat hasil periksa laboratorium.");
      setData(json.data || []);
    } catch (error) {
      if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat hasil periksa laboratorium.", tipe: "error" });
    } finally {
      if (!signal?.aborted) setMemuat(false);
    }
  }, [kataKunci, noRawat, status, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void muatData(controller.signal); }, 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, versiPencarian]);

  const tampilkanSemua = () => {
    setTanggalMulai(noRawat ? "" : registrationDate());
    setTanggalSelesai(noRawat ? "" : registrationDate());
    setKataKunci("");
    setStatus("");
    setVersiPencarian((versi) => versi + 1);
  };

  return <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
        <table className="min-w-[105rem] border-collapse text-left text-[11px] text-slate-700">
          <caption className="sr-only">Hasil pemeriksaan laboratorium patologi klinik</caption>
          <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700"><tr>{["No. Rawat", "Pasien", "Tgl. Periksa", "Jam", "Pemeriksaan", "Item Pemeriksaan", "Hasil", "Satuan", "Nilai Rujukan", "Keterangan", "Ruang", "Petugas", "Dokter Perujuk", "Penanggung Jawab"].map((judul) => <th key={judul} scope="col" className="border-b border-r border-slate-200 px-2 py-2 text-left font-semibold">{judul}</th>)}</tr></thead>
          <tbody>
            {memuat ? <tr><td colSpan={14} className="h-36 text-center text-slate-500">Memuat hasil periksa laboratorium...</td></tr>
              : data.length === 0 ? <tr><td colSpan={14} className="h-44 text-center text-slate-400"><FontAwesomeIcon icon={faFlaskVial} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada hasil laboratorium pada filter ini.</p></td></tr>
                : data.map((item, index) => <tr key={`${item.no_rawat}-${item.tgl_periksa}-${item.jam}-${item.kd_jenis_prw}-${item.pemeriksaan}-${index}`} className="even:bg-slate-50/70 hover:bg-slate-50">
                  <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.no_rawat}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5"><span className="font-mono text-slate-600">{item.no_rkm_medis}</span><span className="ml-1 text-slate-800">{item.nm_pasien}</span><span className="block text-[10px] text-slate-500">{item.png_jawab || "-"}</span></td>
                  <td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.tgl_periksa}</td><td className="whitespace-nowrap border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.jam}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5"><span className="font-mono text-slate-600">{item.kd_jenis_prw}</span><span className="ml-1">{item.nm_perawatan}</span></td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.pemeriksaan}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono text-slate-800">{item.nilai || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.satuan || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.nilai_rujukan || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.keterangan || "-"}</td>
                  <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.ruang || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.nm_petugas || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.dokter_perujuk || "-"}</td><td className="border-b border-r border-slate-100 px-2 py-1.5">{item.penanggung_jawab || "-"}</td>
                </tr>)}
          </tbody>
        </table>
      </div>
    </section>
    <PanelBawah tampilan="web" tanggalMulai={tanggalMulai} tanggalSelesai={tanggalSelesai} onGantiTanggalMulai={setTanggalMulai} onGantiTanggalSelesai={setTanggalSelesai} kataKunci={kataKunci} onGantiKataKunci={setKataKunci} onCari={() => setVersiPencarian((versi) => versi + 1)} onSemua={tampilkanSemua} placeholderCari="No. Rawat, No. RM, pasien, pemeriksaan..." filterTambahan={<div className="flex items-center gap-1.5"><label htmlFor="status-rawat-lab" className="whitespace-nowrap text-slate-700">Status :</label><CustomSelect id="status-rawat-lab" value={status} onChange={(event) => setStatus(event.target.value)} containerClassName="relative w-28" className="h-7 rounded-md py-0.5 pr-5 text-[11px]"><option value="">Semua</option><option value="Ralan">Ralan</option><option value="Ranap">Ranap</option></CustomSelect></div>} jumlahRecord={data.length} memuat={memuat} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
}

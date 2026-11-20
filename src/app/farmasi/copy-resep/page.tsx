"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFilePrescription, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { registrationDate } from "@/lib/registrasi/date";

interface Kunjungan {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  kd_dokter: string;
  nm_dokter: string;
  nm_poli: string;
  png_jawab: string;
  pasien_ranap: number | string;
}

interface ItemResep {
  jenis: "Obat" | "Racikan" | "Bahan Racikan";
  jumlah: number | string;
  satuan: string;
  aturan_pakai: string;
  kode_item: string;
  nama_item: string;
  no_racik: string;
}

interface ResepRiwayat {
  no_resep: string;
  tgl_peresepan: string;
  jam_peresepan: string;
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  kd_dokter: string;
  nm_dokter: string;
  status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  status: "ralan" | "ranap";
  status_asal: "Rawat Jalan" | "Rawat Inap";
  detail: ItemResep[];
  items: ItemResep[];
}

function pesanDari(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function HalamanCopyResep() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const hariIni = registrationDate();
  const [kunjungan, setKunjungan] = useState<Kunjungan | null>(null);
  const [cariKunjungan, setCariKunjungan] = useState("");
  const [hasilKunjungan, setHasilKunjungan] = useState<Kunjungan[]>([]);
  const [memuatKunjungan, setMemuatKunjungan] = useState(false);
  const [pakaiTanggal, setPakaiTanggal] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [filterKataKunci, setFilterKataKunci] = useState("");
  const [data, setData] = useState<ResepRiwayat[]>([]);
  const [noResepTerpilih, setNoResepTerpilih] = useState<string | null>(null);
  const [memuat, setMemuat] = useState(false);
  const [versiData, setVersiData] = useState(0);
  const [menghapus, setMenghapus] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const terpilih = data.find((item) => item.no_resep === noResepTerpilih) || null;
  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => setToast({ pesan, tipe }), []);

  const pilihKunjungan = useCallback((item: Kunjungan) => {
    setKunjungan(item);
    setCariKunjungan(item.no_rawat);
    setHasilKunjungan([]);
    setNoResepTerpilih(null);
    setVersiData((versi) => versi + 1);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const noRawat = new URLSearchParams(window.location.search).get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 17) return;
    const controller = new AbortController();
    async function muatAwal() {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&no_rawat=${encodeURIComponent(noRawat)}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat kunjungan");
        const item = json.data?.[0];
        if (!item) throw new Error("Kunjungan rawat jalan tidak ditemukan.");
        pilihKunjungan(item);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }
    void muatAwal();
    return () => controller.abort();
  }, [isAuthenticated, pilihKunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated || kunjungan || cariKunjungan.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&cari=${encodeURIComponent(cariKunjungan.trim())}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal mencari kunjungan");
        setHasilKunjungan(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal mencari kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariKunjungan, isAuthenticated, kunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated || !kunjungan) return;
    const controller = new AbortController();
    async function muatRiwayat() {
      setMemuat(true);
      try {
        const url = new URL("/api/farmasi/copy-resep", window.location.origin);
        url.searchParams.set("no_rm", kunjungan!.no_rkm_medis);
        url.searchParams.set("status", "ralan");
        url.searchParams.set("kd_dokter", kunjungan!.kd_dokter);
        url.searchParams.set("limit", "100");
        if (pakaiTanggal) {
          url.searchParams.set("tanggal_mulai", tanggalMulai);
          url.searchParams.set("tanggal_selesai", tanggalSelesai);
        }
        if (filterKataKunci) url.searchParams.set("cari_obat", filterKataKunci);
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: { items?: ResepRiwayat[] }; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat resep sebelumnya");
        const items = (json.data?.items || []).map((item) => ({ ...item, items: item.detail || [] }));
        setData(items);
        setNoResepTerpilih((lama) => items.some((item) => item.no_resep === lama) ? lama : null);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat resep sebelumnya"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muatRiwayat();
    return () => controller.abort();
  }, [filterKataKunci, isAuthenticated, kunjungan, pakaiTanggal, tanggalMulai, tanggalSelesai, tampilkanToast, versiData]);

  const bukaCopy = useCallback((resep: ResepRiwayat | null = terpilih) => {
    if (!kunjungan) return tampilkanToast("Pilih kunjungan tujuan terlebih dahulu.", "error");
    if (!resep) return tampilkanToast("Pilih nomor resep yang akan disalin.", "error");
    if (Number(kunjungan.pasien_ranap)) return tampilkanToast("Pasien sudah masuk kamar inap; gunakan resep rawat inap.", "error");
    router.push(`/farmasi/resep-obat?no_rawat=${encodeURIComponent(kunjungan.no_rawat)}&dari_no_resep=${encodeURIComponent(resep.no_resep)}`);
  }, [kunjungan, router, tampilkanToast, terpilih]);

  const bukaUbah = () => {
    if (!terpilih) return tampilkanToast("Pilih nomor resep yang akan diubah.", "error");
    if (terpilih.status !== "ralan") return tampilkanToast("Resep rawat inap harus diubah dari modul rawat inap.", "error");
    if (terpilih.status_pelayanan === "Sudah Terlayani") return tampilkanToast("Resep sudah tervalidasi dan tidak dapat diubah.", "error");
    router.push(`/farmasi/resep-obat?no_rawat=${encodeURIComponent(terpilih.no_rawat)}&edit_resep=${encodeURIComponent(terpilih.no_resep)}`);
  };

  const mintaHapus = () => {
    if (!terpilih) return tampilkanToast("Pilih nomor resep yang akan dihapus.", "error");
    if (terpilih.status_pelayanan === "Sudah Terlayani") return tampilkanToast("Resep sudah tervalidasi dan tidak dapat dihapus.", "error");
    setKonfirmasiHapus(true);
  };

  const hapus = async () => {
    if (!terpilih || !kunjungan) return;
    setMenghapus(true);
    try {
      const response = await fetch("/api/farmasi/copy-resep", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_resep: terpilih.no_resep, no_rawat_tujuan: kunjungan.no_rawat }),
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Resep gagal dihapus");
      setKonfirmasiHapus(false);
      setNoResepTerpilih(null);
      setVersiData((versi) => versi + 1);
      tampilkanToast(json.message || "Resep berhasil dihapus.", "sukses");
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resep gagal dihapus"), "error");
    } finally {
      setMenghapus(false);
    }
  };

  const cari = () => {
    setFilterKataKunci(kataKunci.trim());
    setVersiData((versi) => versi + 1);
  };

  const semua = () => {
    setPakaiTanggal(false);
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setKataKunci("");
    setFilterKataKunci("");
    setNoResepTerpilih(null);
    setVersiData((versi) => versi + 1);
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-3 text-xs text-slate-700 lg:grid-cols-2">
          <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]" role="group" aria-label="Kunjungan pasien tujuan">
            <label htmlFor="no-rawat-copy-resep" className="whitespace-nowrap sm:text-right">No. Rawat :</label>
            <div className="relative flex min-w-0 flex-wrap items-center gap-2">
              <input
                id="no-rawat-copy-resep"
                value={cariKunjungan}
                onChange={(event) => {
                  setCariKunjungan(event.target.value);
                  setKunjungan(null);
                  setHasilKunjungan([]);
                  setData([]);
                  setNoResepTerpilih(null);
                }}
                placeholder="No. rawat, RM, atau nama pasien"
                className="h-7 w-56 shrink-0 rounded-md border border-slate-300 bg-white px-2 font-mono text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
              <input readOnly aria-label="Identitas pasien tujuan" value={kunjungan ? `${kunjungan.no_rkm_medis}  ${kunjungan.nm_pasien} (${kunjungan.jk}, ${kunjungan.umurdaftar} ${kunjungan.sttsumur})` : ""} placeholder="Identitas pasien tujuan" className="h-7 min-w-56 flex-1 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-700" />
              {!kunjungan && (memuatKunjungan || hasilKunjungan.length > 0) && (
                <div className="absolute left-0 top-8 z-20 max-h-48 w-full max-w-2xl overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                  {memuatKunjungan ? <p className="p-2.5 text-slate-500">Mencari kunjungan...</p> : hasilKunjungan.map((item) => (
                    <button key={item.no_rawat} type="button" onClick={() => pilihKunjungan(item)} className="block w-full border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50">
                      <span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span>
                      <span className="block text-slate-600">{item.nm_pasien} · {item.nm_poli}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]" role="group" aria-label="Dokter peresep">
            <span className="whitespace-nowrap sm:text-right">Peresep :</span>
            <input readOnly aria-label="Dokter peresep" value={kunjungan?.nm_dokter || ""} className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-700" />
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
          <table className="w-full min-w-[78rem] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Daftar resep dokter pada kunjungan pasien sebelumnya</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2 text-center">No. Resep</th>
                <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2 text-center">Tgl. Resep</th>
                <th scope="col" className="w-20 border-b border-r border-slate-200 px-2 py-2 text-center">Jam Resep</th>
                <th scope="col" className="w-36 border-b border-r border-slate-200 px-2 py-2 text-center">No. Rawat</th>
                <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2 text-center">No. RM</th>
                <th scope="col" className="min-w-56 border-b border-r border-slate-200 px-2 py-2 text-center">Pasien</th>
                <th scope="col" className="min-w-52 border-b border-r border-slate-200 px-2 py-2 text-center">Dokter Peresep</th>
                <th scope="col" className="w-32 border-b border-slate-200 px-2 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {!kunjungan ? (
                <tr><td colSpan={8} className="h-44 text-center text-slate-400"><FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" /><p>Pilih kunjungan tujuan untuk melihat resep sebelumnya.</p></td></tr>
              ) : memuat ? (
                <tr><td colSpan={8} className="h-36 text-center text-slate-500">Memuat resep sebelumnya...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={8} className="h-44 text-center text-slate-400"><FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" /><p>Tidak ada resep pasien dari dokter yang sama.</p></td></tr>
              ) : data.map((resep) => {
                const dipilih = resep.no_resep === noResepTerpilih;
                return (
                  <FragmentResep key={resep.no_resep} resep={resep} dipilih={dipilih} onPilih={() => setNoResepTerpilih(resep.no_resep)} onCopy={() => bukaCopy(resep)} />
                );
              })}
            </tbody>
          </table>
        </div>

        <PanelBawah
          tampilan="web"
          filterUtama={(
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              <label className="flex items-center gap-1.5" title="Batasi resep berdasarkan tanggal">
                <input type="checkbox" checked={pakaiTanggal} onChange={(event) => setPakaiTanggal(event.target.checked)} className="accent-primary-700" />
                <span>Filter tanggal</span>
              </label>
              <input aria-label="Tanggal resep mulai" type="date" value={tanggalMulai} disabled={!pakaiTanggal} onChange={(event) => setTanggalMulai(event.target.value)} className="h-7 w-32 rounded-md border border-slate-300 px-2 disabled:bg-slate-100 disabled:text-slate-400" />
              <span>s.d.</span>
              <input aria-label="Tanggal resep selesai" type="date" value={tanggalSelesai} disabled={!pakaiTanggal} onChange={(event) => setTanggalSelesai(event.target.value)} className="h-7 w-32 rounded-md border border-slate-300 px-2 disabled:bg-slate-100 disabled:text-slate-400" />
            </div>
          )}
          kataKunci={kataKunci}
          onGantiKataKunci={setKataKunci}
          onCari={cari}
          placeholderCari="No. resep, no. rawat, RM, atau pasien..."
          onHapus={mintaHapus}
          disabledHapus={!terpilih || terpilih.status_pelayanan === "Sudah Terlayani"}
          tombolTambahan={[
            { label: "Copy", ikon: faCopy, onClick: () => bukaCopy(), disabled: !terpilih, varian: "primer", tooltip: "Salin resep ke kunjungan aktif" },
            { label: "Ubah", ikon: faPenToSquare, onClick: bukaUbah, disabled: !terpilih || terpilih.status_pelayanan === "Sudah Terlayani" || terpilih.status !== "ralan", tooltip: "Ubah resep sumber" },
            { label: "Keluar", ikon: faXmark, onClick: () => router.back(), varian: "sekunder", tooltip: "Kembali ke halaman sebelumnya" },
          ]}
          onSemua={semua}
          jumlahRecord={data.length}
          memuat={memuat || menghapus}
        />
      </section>

      <KonfirmasiDialog
        terbuka={konfirmasiHapus}
        judul="Hapus Resep"
        pesan={`Hapus resep ${terpilih?.no_resep || "terpilih"} milik ${terpilih?.nm_pasien || "pasien"}?`}
        subPesan="Resep yang belum tervalidasi beserta obat dan racikannya akan dihapus permanen."
        teksKonfirmasi="Hapus Resep"
        bahaya
        sedangMemproses={menghapus}
        onBatal={() => setKonfirmasiHapus(false)}
        onKonfirmasi={() => void hapus()}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

function FragmentResep({ resep, dipilih, onPilih, onCopy }: {
  resep: ResepRiwayat;
  dipilih: boolean;
  onPilih: () => void;
  onCopy: () => void;
}) {
  return (
    <>
      <tr onClick={onPilih} onDoubleClick={onCopy} aria-selected={dipilih} className={`cursor-pointer ${dipilih ? "bg-primary-50/60" : "even:bg-slate-50/70 hover:bg-slate-50"}`}>
        <td className="truncate border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums text-slate-800">{resep.no_resep}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center tabular-nums">{resep.tgl_peresepan}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{resep.jam_peresepan}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{resep.no_rawat}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums">{resep.no_rkm_medis}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{resep.nm_pasien}</td>
        <td className="border-b border-r border-slate-100 px-2 py-1.5">{resep.nm_dokter}</td>
        <td className="border-b border-slate-100 px-2 py-1.5 text-center">{resep.status_pelayanan}</td>
      </tr>
      <tr className={dipilih ? "bg-primary-50/40" : "bg-slate-100/70"}>
        <td className="border-b border-r border-slate-100" />
        <th scope="col" className="border-b border-r border-slate-100 px-2 py-1 text-center font-semibold">Jumlah</th>
        <th scope="col" className="border-b border-r border-slate-100 px-2 py-1 text-center font-semibold">Satuan</th>
        <th scope="col" className="border-b border-r border-slate-100 px-2 py-1 text-left font-semibold">Aturan Pakai</th>
        <th scope="col" className="border-b border-r border-slate-100 px-2 py-1 text-center font-semibold">Kode / No.</th>
        <th scope="col" colSpan={2} className="border-b border-r border-slate-100 px-2 py-1 text-left font-semibold">Nama Obat / Racikan</th>
        <td className="border-b border-slate-100 px-2 py-1 text-center text-slate-500">{resep.status_asal}</td>
      </tr>
      {resep.items.length === 0 ? (
        <tr className={dipilih ? "bg-primary-50/30" : "bg-white"}><td className="border-b border-r border-slate-100" /><td colSpan={7} className="border-b border-slate-100 px-2 py-1.5 text-slate-400">Belum ada rincian obat.</td></tr>
      ) : resep.items.map((item, index) => (
        <tr key={`${resep.no_resep}-${item.jenis}-${item.no_racik}-${item.kode_item}-${index}`} className={dipilih ? "bg-primary-50/30" : "bg-white"}>
          <td className="border-b border-r border-slate-100" />
          <td className={`${item.jenis === "Bahan Racikan" ? "pl-6" : ""} border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono tabular-nums`}>{item.jumlah}</td>
          <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center">{item.satuan}</td>
          <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.aturan_pakai || "-"}</td>
          <td className={`${item.jenis === "Bahan Racikan" ? "pl-6" : ""} border-b border-r border-slate-100 px-2 py-1.5 text-center font-mono`}>{item.kode_item}</td>
          <td colSpan={2} className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{item.nama_item}</td>
          <td className="border-b border-slate-100 px-2 py-1.5 text-center text-slate-500">{item.jenis}</td>
        </tr>
      ))}
    </>
  );
}

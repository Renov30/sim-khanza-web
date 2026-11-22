"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePrescription, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";

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
  harga: number;
  jenis_obat: string;
  industri: string;
  kategori: string;
  golongan: string;
  no_batch: string;
  no_faktur: string;
  kedaluwarsa: string;
  keterangan: string;
}

interface DataValidasi {
  resep: {
    no_resep: string;
    no_rawat: string;
    no_rkm_medis: string;
    nm_pasien: string;
    nm_dokter: string;
    jenis: "ralan" | "ranap";
    jenis_bayar: string;
    nm_unit: string;
    tgl_peresepan: string;
    jam_peresepan: string;
    status_pelayanan: string;
    billing_terkunci: boolean;
    status_kunjungan: string;
  };
  depot: { kd_bangsal: string; nm_bangsal: string };
  detail: ItemValidasi[];
}

interface ValidasiObatDialogProps {
  noResep: string;
  onClose: () => void;
  onValidated: () => void;
  tampilan?: "dialog" | "halaman";
}

type TabObat = "umum" | "racikan";

function rupiah(nilai: number) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(nilai);
}

function tanggalIndonesia(tanggal: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return tanggal || "-";
  const [tahun, bulan, hari] = tanggal.split("-");
  return `${hari}-${bulan}-${tahun}`;
}

function kunciItem(item: ItemValidasi, indeks: number) {
  return `${item.jenis_item}-${item.no_racik}-${item.kode_item}-${indeks}`;
}

export function ValidasiObatDialog({
  noResep,
  onClose,
  onValidated,
  tampilan = "dialog",
}: ValidasiObatDialogProps) {
  const [data, setData] = useState<DataValidasi | null>(null);
  const [items, setItems] = useState<ItemValidasi[]>([]);
  const [tab, setTab] = useState<TabObat>("umum");
  const [kataKunci, setKataKunci] = useState("");
  const [filterKataKunci, setFilterKataKunci] = useState("");
  const [barisTerpilih, setBarisTerpilih] = useState<string | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function muat() {
      setMemuat(true);
      try {
        const response = await fetch(`/api/farmasi/validasi-obat?no_resep=${encodeURIComponent(noResep)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const json: { success?: boolean; data?: DataValidasi; error?: string } = await response.json();
        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.error || "Gagal memuat data pelayanan obat.");
        }
        setData(json.data);
        setItems(json.data.detail);
      } catch (error) {
        if (!controller.signal.aborted) {
          setData(null);
          setItems([]);
          setToast({
            pesan: error instanceof Error ? error.message : "Gagal memuat data pelayanan obat.",
            tipe: "error",
          });
        }
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }
    void muat();
    return () => controller.abort();
  }, [noResep]);

  const itemsTab = useMemo(() => items.filter((item) => (
    tab === "umum" ? item.jenis_item === "Obat" : item.jenis_item !== "Obat"
  )), [items, tab]);

  const itemsTampil = useMemo(() => {
    const cari = filterKataKunci.toLowerCase();
    if (!cari) return itemsTab;
    return itemsTab.filter((item) => [
      item.kode_item,
      item.nama_item,
      item.aturan_pakai,
      item.jenis_obat,
      item.industri,
      item.kategori,
      item.golongan,
      item.no_batch,
      item.no_faktur,
    ].some((nilai) => String(nilai || "").toLowerCase().includes(cari)));
  }, [filterKataKunci, itemsTab]);

  const total = items.reduce((hasil, item) => (
    item.jenis_item === "Racikan"
      ? hasil
      : hasil + item.harga * (item.jumlah / Math.max(item.kapasitas, 1))
  ), 0);
  const stokTidakCukup = items.some((item) => (
    item.jenis_item !== "Racikan" && item.stok < item.jumlah / Math.max(item.kapasitas, 1)
  ));
  const tidakDapatDivalidasi = !data
    || items.length === 0
    || stokTidakCukup
    || data.resep.status_pelayanan === "Sudah Terlayani"
    || data.resep.billing_terkunci
    || data.resep.status_kunjungan === "Batal";

  const ubahItem = (item: ItemValidasi, perubahan: Partial<ItemValidasi>) => {
    setItems((lama) => lama.map((baris) => (baris === item ? { ...baris, ...perubahan } : baris)));
  };

  const pilihBaris = (kunci: string) => {
    setBarisTerpilih((aktif) => (aktif === kunci ? null : kunci));
  };

  const gantiTab = (nilai: TabObat) => {
    setTab(nilai);
    setBarisTerpilih(null);
  };

  const navigasiTab = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tujuan = event.key === "Home" || event.key === "ArrowLeft" ? "umum" : "racikan";
    gantiTab(tujuan);
    document.getElementById(`tab-obat-${tujuan}`)?.focus();
  };

  const validasi = async () => {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/farmasi/validasi-obat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_resep: noResep,
          items: items.map(({ jenis_item, no_racik, kode_item, jumlah, aturan_pakai }) => ({
            jenis_item,
            no_racik,
            kode_item,
            jumlah,
            aturan_pakai,
          })),
        }),
      });
      const json: { success?: boolean; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Validasi obat gagal diproses.");
      setKonfirmasi(false);
      onValidated();
    } catch (error) {
      setToast({
        pesan: error instanceof Error ? error.message : "Validasi obat gagal diproses.",
        tipe: "error",
      });
    } finally {
      setMenyimpan(false);
    }
  };

  const konten = (
    <div className="module-page relative flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="space-y-2 text-xs text-slate-700">
          <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)_minmax(0,1.35fr)]">
            <label className="grid items-center gap-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              <span className="sm:text-right">No. Rawat :</span>
              <input readOnly value={data?.resep.no_rawat || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
            </label>
            <label className="grid items-center gap-1.5 sm:grid-cols-[4rem_minmax(0,1fr)]">
              <span className="sm:text-right">No. RM :</span>
              <input readOnly value={data?.resep.no_rkm_medis || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
            </label>
            <label className="grid items-center gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <span className="sm:text-right">Nama Pasien :</span>
              <input readOnly value={data?.resep.nm_pasien || ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
            </label>
          </div>

          <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,0.75fr)]">
            <div className="grid items-center gap-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              <span className="sm:text-right">Tgl. Resep :</span>
              <div className="flex gap-1.5">
                <input readOnly aria-label="Tanggal resep" value={tanggalIndonesia(data?.resep.tgl_peresepan || "")} className="h-7 w-28 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs tabular-nums text-slate-800" />
                <input readOnly aria-label="Jam resep" value={data?.resep.jam_peresepan || ""} className="h-7 w-24 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs tabular-nums text-slate-800" />
              </div>
            </div>
            <label className="grid items-center gap-1.5 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
              <span className="sm:text-right">Tarif :</span>
              <input readOnly value={data ? `${data.resep.jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap"} · ${data.resep.jenis_bayar}` : ""} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
            </label>
            <label className="grid items-center gap-1.5 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
              <span className="sm:text-right">No. Resep :</span>
              <input readOnly value={data?.resep.no_resep || noResep} className="h-7 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-2">
            <span>Total : <strong className="font-mono font-semibold tabular-nums text-slate-900">Rp {rupiah(total)}</strong></span>
            <span>Dokter : <strong className="font-medium text-slate-800">{data?.resep.nm_dokter || "-"}</strong></span>
            <span>Depo : <strong className="font-mono font-medium text-slate-800">{data?.depot.kd_bangsal || "-"}</strong> · {data?.depot.nm_bangsal || "-"}</span>
            <span className={`ml-auto inline-flex rounded-full px-2 py-0.5 text-[11px] ${data?.resep.status_pelayanan === "Sudah Terlayani" ? "bg-secondary-100 text-secondary-800" : "bg-slate-100 text-slate-700"}`}>
              {data?.resep.status_pelayanan || "Memuat"}
            </span>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div className="flex shrink-0 border-b border-slate-200" role="tablist" aria-label="Jenis obat resep">
          {(["umum", "racikan"] as const).map((item) => (
            <button
              key={item}
              id={`tab-obat-${item}`}
              type="button"
              role="tab"
              aria-selected={tab === item}
              aria-controls={`panel-obat-${item}`}
              tabIndex={tab === item ? 0 : -1}
              onClick={() => gantiTab(item)}
              onKeyDown={navigasiTab}
              className={`border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tab === item ? "border-primary-700 bg-white text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
            >
              {item === "umum" ? "Umum" : "Racikan"}
            </button>
          ))}
        </div>

        <div
          id={`panel-obat-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-obat-${tab}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-auto"
          aria-busy={memuat}
        >
          <table className="w-full min-w-[112rem] border-collapse text-left text-[11px] text-slate-700">
            <caption className="sr-only">Rincian obat resep {noResep} pada tab {tab}</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>
                {[
                  "K", "Jumlah", "Kode Barang", "Nama Barang", "Satuan", "Harga (Rp)",
                  "Jenis Obat", "Emb", "Tsl", "Stok", "Aturan Pakai", "I.F.",
                  "Kategori", "Golongan", "No. Batch", "No. Faktur", "Kedaluwarsa", "Kesiapan",
                ].map((label) => (
                  <th key={label} scope="col" className="whitespace-nowrap border-b border-slate-200 px-2 py-2 text-center">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memuat ? (
                <tr><td colSpan={18} className="h-36 border-0 text-center text-slate-500">Memuat data obat resep...</td></tr>
              ) : !data ? (
                <tr><td colSpan={18} className="h-44 border-0 text-center text-slate-400">Data pelayanan obat belum tersedia.</td></tr>
              ) : itemsTampil.length === 0 ? (
                <tr>
                  <td colSpan={18} className="h-44 border-0 text-center text-slate-400">
                    <FontAwesomeIcon icon={faFilePrescription} className="mb-2 h-7 w-7 text-slate-300" />
                    <p>Tidak ada item pada tab atau pencarian ini.</p>
                  </td>
                </tr>
              ) : itemsTampil.map((item, indeks) => {
                const kunci = kunciItem(item, indeks);
                const dipilih = barisTerpilih === kunci;
                const cukup = item.jenis_item === "Racikan" || item.stok >= item.jumlah / Math.max(item.kapasitas, 1);
                return (
                  <tr
                    key={kunci}
                    onClick={() => pilihBaris(kunci)}
                    aria-selected={dipilih}
                    className={`${dipilih ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"} cursor-pointer`}
                  >
                    <td className="px-2 py-1.5 text-center"><input type="checkbox" checked readOnly aria-label={`Pilih ${item.nama_item}`} /></td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.jumlah}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => ubahItem(item, { jumlah: Number(event.target.value) || 0 })}
                        className="h-7 w-20 rounded-md border border-slate-300 bg-white px-2 text-center font-mono text-xs tabular-nums focus:border-primary-600 focus:outline-none"
                        aria-label={`Jumlah ${item.nama_item}`}
                      />
                    </td>
                    <td className="whitespace-nowrap px-2 py-1.5 text-center font-mono">{item.kode_item}</td>
                    <td className="min-w-52 px-2 py-1.5 text-slate-800">{item.nama_item}{item.keterangan && <span className="block text-slate-500">{item.keterangan}</span>}</td>
                    <td className="px-2 py-1.5 text-center">{item.satuan || "-"}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums">{item.jenis_item === "Racikan" ? "-" : rupiah(item.harga)}</td>
                    <td className="whitespace-nowrap px-2 py-1.5">{item.jenis_obat || "-"}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums">0</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums">0</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums">{item.jenis_item === "Racikan" ? "-" : rupiah(item.stok)}</td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={item.aturan_pakai}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => ubahItem(item, { aturan_pakai: event.target.value })}
                        className="h-7 min-w-40 rounded-md border border-slate-300 bg-white px-2 text-xs focus:border-primary-600 focus:outline-none"
                        aria-label={`Aturan pakai ${item.nama_item}`}
                      />
                    </td>
                    <td className="max-w-40 truncate px-2 py-1.5" title={item.industri}>{item.industri || "-"}</td>
                    <td className="max-w-36 truncate px-2 py-1.5" title={item.kategori}>{item.kategori || "-"}</td>
                    <td className="max-w-36 truncate px-2 py-1.5" title={item.golongan}>{item.golongan || "-"}</td>
                    <td className="whitespace-nowrap px-2 py-1.5 font-mono">{item.no_batch || "-"}</td>
                    <td className="whitespace-nowrap px-2 py-1.5 font-mono">{item.no_faktur || "-"}</td>
                    <td className="whitespace-nowrap px-2 py-1.5 text-center font-mono tabular-nums">{tanggalIndonesia(item.kedaluwarsa)}</td>
                    <td className="px-2 py-1.5 text-center">
                      <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] ${cukup ? "bg-secondary-100 text-secondary-800" : "bg-red-100 text-red-700"}`}>
                        {cukup ? "Siap" : "Stok kurang"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        onSimpan={() => setKonfirmasi(true)}
        disabledSimpan={memuat || menyimpan || tidakDapatDivalidasi}
        kataKunci={kataKunci}
        onGantiKataKunci={setKataKunci}
        onCari={() => { setFilterKataKunci(kataKunci.trim()); setBarisTerpilih(null); }}
        placeholderCari="Kode, nama obat, aturan pakai, kategori..."
        onSemua={() => { setKataKunci(""); setFilterKataKunci(""); setBarisTerpilih(null); }}
        onKembali={onClose}
        labelKembali={tampilan === "halaman" ? "Daftar Resep" : "Tutup"}
        jumlahRecord={itemsTampil.length}
        totalLabel="Total"
        nilaiTotal={`Rp ${rupiah(total)}`}
        memuat={memuat || menyimpan}
      />

      {stokTidakCukup && (
        <div className="pointer-events-none absolute bottom-16 right-5 inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs text-red-700 shadow-sm">
          <FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5" />
          Stok resep belum mencukupi
        </div>
      )}

      <KonfirmasiDialog
        terbuka={konfirmasi}
        judul="Validasi Obat"
        pesan={`Validasi resep ${noResep} untuk ${data?.resep.nm_pasien || "pasien"}?`}
        subPesan="Stok depo akan dikurangi dan resep ditandai sudah terlayani."
        teksKonfirmasi="Validasi Obat"
        sedangMemproses={menyimpan}
        onBatal={() => setKonfirmasi(false)}
        onKonfirmasi={() => void validasi()}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );

  if (tampilan === "halaman") return konten;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 p-2 sm:p-4" role="dialog" aria-modal="true" aria-label="Validasi obat">
      <div className="mx-auto h-full w-full max-w-[96rem] overflow-hidden rounded-lg border border-slate-300 bg-slate-50 shadow-xl">
        {konten}
      </div>
    </div>
  );
}

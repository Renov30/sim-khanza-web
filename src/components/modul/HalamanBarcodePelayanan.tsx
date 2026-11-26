"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faMagnifyingGlass, faPills, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";

interface KunjunganInfo {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_poli: string;
  nm_poli: string;
  png_jawab: string;
  status_bayar: string;
  kd_kamar: string;
  nm_bangsal_kamar: string;
  kelas_kamar: string;
  billing_terverifikasi: boolean;
}

interface ItemTindakan {
  kd_jenis_prw: string;
  nm_perawatan: string;
  nm_kategori: string;
  total_byrdr: number;
}

interface ItemObat {
  kode_brng: string;
  nama_brng: string;
  satuan: string;
  jenis: string;
  kapasitas: number;
  harga: number;
  stok: number;
  no_batch: string;
  no_faktur: string;
}

interface InputObatState {
  jumlah: string;
  pakai_kapasitas: boolean;
  embalase: string;
  tuslah: string;
}

function formatUang(nilai: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.round(nilai || 0));
}

function kunciObat(item: ItemObat): string {
  return `${item.kode_brng}__${item.no_batch}__${item.no_faktur}`;
}

export function HalamanBarcodePelayanan({ jenis }: { jenis: "ralan" | "ranap" }) {
  const endpoint = jenis === "ralan" ? "/api/rawat-jalan/barcode" : "/api/rawat-inap/barcode";
  const labelJenis = jenis === "ralan" ? "Rawat Jalan" : "Rawat Inap";
  const inputNoRawatRef = useRef<HTMLInputElement>(null);

  const [noRawatInput, setNoRawatInput] = useState("");
  const [cariTindakan, setCariTindakan] = useState("");
  const [cariObat, setCariObat] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);

  const [kunjungan, setKunjungan] = useState<KunjunganInfo | null>(null);
  const [depo, setDepo] = useState<{ kd_bangsal: string; nm_bangsal: string } | null>(null);
  const [defaultEmbalase, setDefaultEmbalase] = useState(0);
  const [defaultTuslah, setDefaultTuslah] = useState(0);
  const [daftarTindakan, setDaftarTindakan] = useState<ItemTindakan[]>([]);
  const [daftarObat, setDaftarObat] = useState<ItemObat[]>([]);

  const [tindakanDipilih, setTindakanDipilih] = useState<Set<string>>(() => new Set());
  const [obatInput, setObatInput] = useState<Record<string, InputObatState>>({});
  const [dialogSimpan, setDialogSimpan] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);
  const sudahInitUrlRef = useRef(false);

  const muatBarcode = useCallback(
    async (noRawat: string, kwTindakan = cariTindakan, kwObat = cariObat) => {
      const bersih = noRawat.trim();
      if (!bersih) {
        setToast({ pesan: "Scan atau masukkan No. Rawat terlebih dahulu.", tipe: "error" });
        return;
      }
      setMemuat(true);
      try {
        const params = new URLSearchParams({ no_rawat: bersih });
        if (kwTindakan.trim()) params.set("cari_tindakan", kwTindakan.trim());
        if (kwObat.trim()) params.set("cari_obat", kwObat.trim());
        const res = await fetch(`${endpoint}?${params.toString()}`, { cache: "no-store" });
        const json = (await res.json()) as {
          success: boolean;
          data?: {
            kunjungan: KunjunganInfo | null;
            depo: { kd_bangsal: string; nm_bangsal: string } | null;
            embalase: number;
            tuslah: number;
            tindakan: ItemTindakan[];
            obat: ItemObat[];
          };
          error?: string;
        };
        if (!res.ok || !json.success || !json.data) {
          throw new Error(json.error || "Gagal memuat data barcode.");
        }
        setKunjungan(json.data.kunjungan);
        setDepo(json.data.depo);
        setDefaultEmbalase(Number(json.data.embalase || 0));
        setDefaultTuslah(Number(json.data.tuslah || 0));
        setDaftarTindakan(json.data.tindakan || []);
        setDaftarObat(json.data.obat || []);
        if (json.data.kunjungan?.billing_terverifikasi) {
          setToast({
            pesan: "Perhatian: Billing kunjungan ini sudah terverifikasi, transaksi baru akan ditolak server.",
            tipe: "info",
          });
        }
      } catch (error) {
        setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat kunjungan.", tipe: "error" });
      } finally {
        setMemuat(false);
      }
    },
    [cariObat, cariTindakan, endpoint],
  );

  useEffect(() => {
    if (sudahInitUrlRef.current) return;
    sudahInitUrlRef.current = true;
    const sp = new URLSearchParams(window.location.search);
    const noRawatUrl = (sp.get("no_rawat") || "").trim();
    if (!noRawatUrl) return;
    const timer = window.setTimeout(() => {
      setNoRawatInput(noRawatUrl);
      void muatBarcode(noRawatUrl, "", "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [muatBarcode]);

  const resetSemua = () => {
    setNoRawatInput("");
    setCariTindakan("");
    setCariObat("");
    setKunjungan(null);
    setDepo(null);
    setDaftarTindakan([]);
    setDaftarObat([]);
    setTindakanDipilih(new Set());
    setObatInput({});
    inputNoRawatRef.current?.focus();
  };

  const toggleTindakan = (kode: string) => {
    setTindakanDipilih((prev) => {
      const next = new Set(prev);
      if (next.has(kode)) next.delete(kode);
      else next.add(kode);
      return next;
    });
  };

  const ubahObat = (item: ItemObat, patch: Partial<InputObatState>) => {
    const k = kunciObat(item);
    setObatInput((prev) => {
      const lama = prev[k] || {
        jumlah: "",
        pakai_kapasitas: false,
        embalase: String(defaultEmbalase),
        tuslah: String(defaultTuslah),
      };
      return { ...prev, [k]: { ...lama, ...patch } };
    });
  };

  const itemObatAktif = daftarObat
    .map((item) => {
      const st = obatInput[kunciObat(item)];
      const jml = Number(st?.jumlah || 0);
      if (!Number.isFinite(jml) || jml <= 0) return null;
      return {
        kode_brng: item.kode_brng,
        jumlah: jml,
        pakai_kapasitas: Boolean(st?.pakai_kapasitas),
        embalase: Number(st?.embalase || 0),
        tuslah: Number(st?.tuslah || 0),
        no_batch: item.no_batch,
        no_faktur: item.no_faktur,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  const jumlahTerpilih = tindakanDipilih.size + itemObatAktif.length;

  const jalankanSimpan = async () => {
    if (!kunjungan) return;
    setMenyimpan(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: kunjungan.no_rawat,
          tindakan: [...tindakanDipilih],
          obat: itemObatAktif,
        }),
      });
      const json = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menyimpan transaksi barcode.");
      }
      setDialogSimpan(false);
      setToast({ pesan: json.message || "Proses selesai.", tipe: "sukses" });
      resetSemua();
    } catch (error) {
      setToast({ pesan: error instanceof Error ? error.message : "Gagal menyimpan data.", tipe: "error" });
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      {/* Bar Scan Barcode No. Rawat & Identitas Kunjungan */}
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={`barcode-norawat-${jenis}`} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <FontAwesomeIcon icon={faBarcode} className="h-3.5 w-3.5 text-primary-700" />
            <span>No. Rawat :</span>
          </label>
          <input
            ref={inputNoRawatRef}
            id={`barcode-norawat-${jenis}`}
            type="text"
            value={noRawatInput}
            maxLength={17}
            autoFocus
            onChange={(e) => setNoRawatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void muatBarcode(noRawatInput);
              }
            }}
            placeholder="Scan barcode atau ketik No. Rawat lalu Enter (YYYY/MM/DD/000001)"
            className="h-7 w-72 rounded-md border border-slate-300 bg-white px-2 font-mono text-xs tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
          />
          <button
            type="button"
            disabled={memuat}
            onClick={() => { void muatBarcode(noRawatInput); }}
            className="h-7 rounded-md bg-primary-700 px-3 text-xs font-semibold text-white hover:bg-primary-800 disabled:bg-slate-300"
          >
            {memuat ? "Memuat..." : "Muat Kunjungan"}
          </button>

          {kunjungan && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-l border-slate-200 pl-3 text-xs text-slate-700">
              <span>
                Pasien: <strong className="font-mono">{kunjungan.no_rkm_medis}</strong> {kunjungan.nm_pasien} ({kunjungan.jk})
              </span>
              <span>
                Dokter: <strong>{kunjungan.nm_dokter || kunjungan.kd_dokter}</strong>
              </span>
              <span>
                {jenis === "ralan" ? `Poli: ${kunjungan.nm_poli}` : `Kamar: ${kunjungan.kd_kamar} - ${kunjungan.nm_bangsal_kamar} (${kunjungan.kelas_kamar})`}
              </span>
              <span>Cara Bayar: {kunjungan.png_jawab}</span>
              {depo?.nm_bangsal && <span>Depo: {depo.nm_bangsal}</span>}
              {kunjungan.billing_terverifikasi && (
                <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                  Billing Terverifikasi
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Area 2 Panel: Tindakan Dokter & Obat/BHP */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 overflow-hidden lg:grid-cols-2">
        {/* Panel Tindakan */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
            <FontAwesomeIcon icon={faStethoscope} className="h-3.5 w-3.5 text-primary-700" />
            <span className="text-xs font-semibold text-slate-800">Tindakan Dokter ({tindakanDipilih.size} dipilih)</span>
            <div className="relative ml-auto w-56">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                aria-label="Cari tindakan"
                value={cariTindakan}
                onChange={(e) => setCariTindakan(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && kunjungan) void muatBarcode(kunjungan.no_rawat, e.currentTarget.value, cariObat);
                }}
                placeholder="Cari kode/nama tindakan (Enter)..."
                className="h-7 w-full rounded-md border border-slate-300 bg-white pl-7 pr-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
            <table className="w-full min-w-[34rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Daftar tindakan dokter via barcode {labelJenis}</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-9 border-b border-slate-200 px-2 py-2 text-center font-semibold">P</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-left font-semibold">Kode</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-left font-semibold">Nama Tindakan</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-left font-semibold">Kategori</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-right font-semibold">Tarif (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!kunjungan ? (
                  <tr>
                    <td colSpan={5} className="h-44 border-0 text-center text-slate-400">
                      Scan No. Rawat untuk menampilkan daftar tindakan.
                    </td>
                  </tr>
                ) : daftarTindakan.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-44 border-0 text-center text-slate-400">
                      Tidak ada tindakan yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  daftarTindakan.map((item) => {
                    const checked = tindakanDipilih.has(item.kd_jenis_prw);
                    return (
                      <tr
                        key={item.kd_jenis_prw}
                        onClick={() => toggleTindakan(item.kd_jenis_prw)}
                        className={`cursor-pointer ${checked ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}`}
                      >
                        <td className="px-2 py-1.5 text-center">
                          <input
                            type="checkbox"
                            aria-label={`Pilih ${item.nm_perawatan}`}
                            checked={checked}
                            onChange={() => toggleTindakan(item.kd_jenis_prw)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="whitespace-nowrap px-2 py-1.5 font-mono">{item.kd_jenis_prw}</td>
                        <td className="px-2 py-1.5 text-slate-800">{item.nm_perawatan}</td>
                        <td className="px-2 py-1.5 text-slate-600">{item.nm_kategori || "-"}</td>
                        <td className="whitespace-nowrap px-2 py-1.5 text-right font-mono tabular-nums">
                          {formatUang(item.total_byrdr)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Panel Obat & BHP */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50 px-2.5 py-1.5">
            <FontAwesomeIcon icon={faPills} className="h-3.5 w-3.5 text-primary-700" />
            <span className="text-xs font-semibold text-slate-800">Obat & BHP ({itemObatAktif.length} diisi)</span>
            <div className="relative ml-auto w-56">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                aria-label="Cari obat atau BHP"
                value={cariObat}
                onChange={(e) => setCariObat(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && kunjungan) void muatBarcode(kunjungan.no_rawat, cariTindakan, e.currentTarget.value);
                }}
                placeholder="Cari kode/nama obat/batch (Enter)..."
                className="h-7 w-full rounded-md border border-slate-300 bg-white pl-7 pr-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto" aria-busy={memuat}>
            <table className="w-full min-w-[46rem] border-collapse text-left text-[11px] text-slate-700">
              <caption className="sr-only">Daftar obat dan BHP via barcode {labelJenis}</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-8 border-b border-slate-200 px-1.5 py-2 text-center font-semibold" title="Bagi dengan kapasitas">K</th>
                  <th scope="col" className="w-16 border-b border-slate-200 px-2 py-2 text-center font-semibold">Jml</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-left font-semibold">Obat / BHP</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-right font-semibold">Stok</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-right font-semibold">Harga</th>
                  <th scope="col" className="w-20 border-b border-slate-200 px-1.5 py-2 text-right font-semibold">Emb.</th>
                  <th scope="col" className="w-20 border-b border-slate-200 px-1.5 py-2 text-right font-semibold">Tuslah</th>
                  <th scope="col" className="border-b border-slate-200 px-2 py-2 text-left font-semibold">Batch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!kunjungan ? (
                  <tr>
                    <td colSpan={8} className="h-44 border-0 text-center text-slate-400">
                      Scan No. Rawat untuk menampilkan stok obat/BHP depo.
                    </td>
                  </tr>
                ) : daftarObat.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="h-44 border-0 text-center text-slate-400">
                      Tidak ada obat/BHP berstok tersedia pada filter ini.
                    </td>
                  </tr>
                ) : (
                  daftarObat.map((item) => {
                    const k = kunciObat(item);
                    const st = obatInput[k];
                    const aktif = Number(st?.jumlah || 0) > 0;
                    return (
                      <tr key={k} className={aktif ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}>
                        <td className="px-1.5 py-1 text-center">
                          <input
                            type="checkbox"
                            aria-label={`Pakai kapasitas ${item.nama_brng}`}
                            checked={Boolean(st?.pakai_kapasitas)}
                            onChange={(e) => ubahObat(item, { pakai_kapasitas: e.target.checked })}
                          />
                        </td>
                        <td className="px-1.5 py-1">
                          <input
                            type="number"
                            min={0}
                            step="any"
                            aria-label={`Jumlah ${item.nama_brng}`}
                            value={st?.jumlah ?? ""}
                            onChange={(e) => ubahObat(item, { jumlah: e.target.value })}
                            className="h-6 w-14 rounded border border-slate-300 bg-white px-1.5 text-right font-mono text-[11px] tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
                          />
                        </td>
                        <td className="px-2 py-1 text-slate-800">
                          <div className="font-medium">{item.nama_brng}</div>
                          <div className="font-mono text-[10px] text-slate-500">
                            {item.kode_brng} · {item.satuan}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-2 py-1 text-right font-mono tabular-nums">{item.stok}</td>
                        <td className="whitespace-nowrap px-2 py-1 text-right font-mono tabular-nums">
                          {formatUang(item.harga)}
                        </td>
                        <td className="px-1.5 py-1">
                          <input
                            type="number"
                            min={0}
                            aria-label={`Embalase ${item.nama_brng}`}
                            value={st?.embalase ?? String(defaultEmbalase)}
                            onChange={(e) => ubahObat(item, { embalase: e.target.value })}
                            className="h-6 w-16 rounded border border-slate-300 bg-white px-1 text-right font-mono text-[11px] tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
                          />
                        </td>
                        <td className="px-1.5 py-1">
                          <input
                            type="number"
                            min={0}
                            aria-label={`Tuslah ${item.nama_brng}`}
                            value={st?.tuslah ?? String(defaultTuslah)}
                            onChange={(e) => ubahObat(item, { tuslah: e.target.value })}
                            className="h-6 w-16 rounded border border-slate-300 bg-white px-1 text-right font-mono text-[11px] tabular-nums text-slate-800 focus:border-primary-600 focus:outline-none"
                          />
                        </td>
                        <td className="whitespace-nowrap px-2 py-1 font-mono text-[10px] text-slate-600">
                          {item.no_batch || "-"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <PanelBawah
        tampilan="web"
        memuat={memuat || menyimpan}
        jumlahRecord={jumlahTerpilih}
        onSimpan={() => setDialogSimpan(true)}
        disabledSimpan={!kunjungan || kunjungan.billing_terverifikasi || jumlahTerpilih === 0 || menyimpan}
        onBaru={resetSemua}
        onCetak={() => { cetakTabelDomJasper("Laporan Pelayanan Barcode"); }}
      />

      <KonfirmasiDialog
        terbuka={dialogSimpan}
        bahaya={false}
        judul={`Konfirmasi Simpan Barcode ${labelJenis}`}
        pesan={`Simpan ${tindakanDipilih.size} tindakan dokter dan ${itemObatAktif.length} obat/BHP untuk kunjungan ${kunjungan?.no_rawat || ""}?`}
        subPesan="Stok obat pada depo akan berkurang otomatis dalam satu transaksi atomik."
        teksKonfirmasi="Simpan"
        onBatal={() => setDialogSimpan(false)}
        onKonfirmasi={() => { void jalankanSimpan(); }}
        sedangMemproses={menyimpan}
      />

      <Toast
        message={toast?.pesan ?? null}
        tipe={toast?.tipe ?? "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

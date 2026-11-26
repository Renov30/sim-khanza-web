"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faXmark } from "@fortawesome/free-solid-svg-icons";

interface DataDokumen {
  kunjungan: Record<string, unknown>;
  kamar: Record<string, unknown> | null;
  sep: Record<string, unknown> | null;
  instansi: Record<string, unknown> | null;
  diagnosa: Record<string, unknown>[];
}

function teks(val: unknown, fallback = "-"): string {
  if (val === null || val === undefined) return fallback;
  const s = String(val).trim();
  return s || fallback;
}

function kategoriDokumen(jenis: string): "gelang" | "label" | "checklist" | "administrasi" {
  if (jenis.startsWith("MnGelang")) return "gelang";
  if (jenis.startsWith("MnLabel") || jenis.startsWith("MnBarcode")) return "label";
  if (jenis.startsWith("MnCheckList")) return "checklist";
  return "administrasi";
}

export default function HalamanCetakDokumen() {
  const [params, setParams] = useState<{ jenis: string; noRawat: string; judul: string; autoprint: boolean }>({
    jenis: "",
    noRawat: "",
    judul: "Dokumen Pasien",
    autoprint: false,
  });
  const [data, setData] = useState<DataDokumen | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoGagal, setLogoGagal] = useState(false);
  const sudahAutoPrintRef = useRef(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const jenis = sp.get("jenis") || "";
    const noRawat = sp.get("no_rawat") || "";
    const judul = sp.get("judul") || "Dokumen Pasien";
    const autoprint = sp.get("autoprint") === "1";
    const timer = window.setTimeout(() => {
      setParams({ jenis, noRawat, judul, autoprint });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!params.noRawat) {
      const timer = window.setTimeout(() => {
        setMemuat(false);
        setError("Parameter no_rawat belum dipilih. Buka dokumen ini melalui klik kanan pada data pasien.");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setMemuat(true);
      setError(null);
      try {
        const res = await fetch(`/api/cetak/dokumen?no_rawat=${encodeURIComponent(params.noRawat)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = (await res.json()) as { success: boolean; data?: DataDokumen; error?: string };
        if (!res.ok || !json.success || !json.data) {
          throw new Error(json.error || "Gagal memuat dokumen cetak.");
        }
        setData(json.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Gagal memuat dokumen cetak.");
        }
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [params.noRawat]);

  useEffect(() => {
    if (memuat || !data || !params.autoprint || sudahAutoPrintRef.current) return;
    sudahAutoPrintRef.current = true;
    const timer = window.setTimeout(() => {
      window.print();
    }, 350);
    return () => window.clearTimeout(timer);
  }, [data, memuat, params.autoprint]);

  const kategori = kategoriDokumen(params.jenis);
  const k = data?.kunjungan;
  const km = data?.kamar;
  const sep = data?.sep;
  const rs = data?.instansi;

  return (
    <div className="min-h-screen w-full bg-slate-200 pb-8 print:min-h-0 print:bg-white print:pb-0">
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-slate-300 bg-tertiary-900 px-4 py-2 text-white shadow-sm print:hidden">
        <div className="min-w-0">
          <h1 className="truncate text-xs font-bold">Jasper Print Preview — {params.judul}</h1>
          <p className="text-[10px] text-primary-200">
            No. Rawat: <span className="font-mono">{params.noRawat || "-"}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={!data}
            onClick={() => window.print()}
            className="inline-flex h-7 items-center gap-1.5 rounded bg-primary-600 px-3 text-xs font-semibold text-white hover:bg-primary-500 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPrint} className="h-3 w-3" aria-hidden="true" />
            Cetak / Simpan PDF
          </button>
          <button
            type="button"
            onClick={() => window.close()}
            className="inline-flex h-7 items-center gap-1 rounded border border-slate-500 bg-slate-800 px-2.5 text-xs font-semibold text-slate-100 hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" aria-hidden="true" />
            Tutup
          </button>
        </div>
      </div>

      {memuat ? (
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
          Memuat data dokumen cetak...
        </div>
      ) : error ? (
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-700">{error}</div>
      ) : k ? (
        <article className="mx-auto mt-4 w-full max-w-[210mm] rounded-lg border border-slate-300 bg-white p-6 text-slate-800 shadow-lg print:mt-0 print:max-w-none print:border-0 print:p-0 print:shadow-none">
          <header className="flex items-center gap-4 border-b-2 border-slate-800 pb-3">
            {!logoGagal && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/api/system/logo"
                alt="Logo Instansi"
                onError={() => setLogoGagal(true)}
                className="h-14 w-14 shrink-0 object-contain"
              />
            )}
            <div className="min-w-0 flex-1 text-center">
              <div className="text-base font-bold uppercase tracking-wide text-slate-900">
                {teks(rs?.nama_instansi, "RUMAH SAKIT")}
              </div>
              <div className="text-[11px] text-slate-600">
                {teks(rs?.alamat_instansi)} · {teks(rs?.kabupaten)}, {teks(rs?.propinsi)} · Telp: {teks(rs?.kontak)}
              </div>
              <div className="mt-2 inline-block rounded border border-slate-800 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                {params.judul}
              </div>
            </div>
            {!logoGagal && <div className="h-14 w-14 shrink-0" aria-hidden="true" />}
          </header>

          {kategori === "gelang" ? (
            <div className="mt-5 rounded-md border-2 border-dashed border-slate-400 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-bold text-slate-900">{teks(k.nm_pasien)}</div>
                  <div className="mt-1 font-mono text-sm font-semibold text-slate-800">
                    RM: {teks(k.no_rkm_medis)} · {teks(k.jk)} · {teks(k.tgl_lahir)} ({teks(k.umurdaftar)} {teks(k.sttsumur)})
                  </div>
                  <div className="mt-0.5 text-xs text-slate-700">
                    No. Rawat: <span className="font-mono">{teks(k.no_rawat)}</span> · {km ? `${teks(km.nm_bangsal)} (${teks(km.kd_kamar)})` : teks(k.nm_poli)}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-600">DPJP/Dokter: {teks(k.nm_dokter)} · Penjamin: {teks(k.png_jawab)}</div>
                </div>
                <div className="shrink-0 rounded border border-slate-800 px-3 py-2 text-center font-mono">
                  <div className="text-xs font-bold tracking-widest">*{teks(k.no_rkm_medis)}*</div>
                  <div className="mt-1 text-[10px] tracking-widest">||{teks(k.no_rawat)}||</div>
                </div>
              </div>
            </div>
          ) : kategori === "label" ? (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="rounded border border-slate-400 p-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span className="font-mono font-bold text-slate-900">{teks(k.no_rkm_medis)}</span>
                    <span className="font-mono text-[10px] text-slate-600">{teks(k.tgl_registrasi)}</span>
                  </div>
                  <div className="mt-1 font-bold text-slate-900">{teks(k.nm_pasien)}</div>
                  <div className="text-[11px] text-slate-700">
                    {teks(k.jk)} · Lahir: {teks(k.tgl_lahir)} · Umur: {teks(k.umurdaftar)} {teks(k.sttsumur)}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-slate-800">No. Rawat: {teks(k.no_rawat)}</div>
                  <div className="text-[11px] text-slate-600">
                    Unit: {km ? `${teks(km.nm_bangsal)} / ${teks(km.kd_kamar)}` : teks(k.nm_poli)} · {teks(k.png_jawab)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">No. Rawat</span><span className="font-mono font-semibold">{teks(k.no_rawat)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">No. Rekam Medis</span><span className="font-mono font-semibold">{teks(k.no_rkm_medis)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Nama Pasien</span><span className="font-semibold">{teks(k.nm_pasien)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Jenis Kelamin / Umur</span><span>{teks(k.jk)} / {teks(k.umurdaftar)} {teks(k.sttsumur)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">TTL</span><span>{teks(k.tmp_lahir)}, {teks(k.tgl_lahir)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Tgl / Jam Registrasi</span><span className="font-mono">{teks(k.tgl_registrasi)} {teks(k.jam_reg)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Poliklinik / Unit</span><span>{teks(k.nm_poli)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Dokter</span><span>{teks(k.nm_dokter)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Cara Bayar / Penjamin</span><span>{teks(k.png_jawab)}</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5"><span className="text-slate-500">Penanggung Jawab</span><span>{teks(k.p_jawab)} ({teks(k.hubunganpj)})</span></div>
                <div className="flex justify-between border-b border-slate-100 py-0.5 sm:col-span-2"><span className="text-slate-500">Alamat</span><span className="text-right">{teks(k.alamat)}</span></div>
              </div>

              {km && (
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1.5 font-semibold text-slate-800">Informasi Rawat Inap</div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                    <div className="flex justify-between"><span className="text-slate-500">Kamar / Bangsal</span><span>{teks(km.kd_kamar)} · {teks(km.nm_bangsal)} ({teks(km.kelas)})</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Status Pulang</span><span className="font-semibold">{teks(km.stts_pulang)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Masuk</span><span className="font-mono">{teks(km.tgl_masuk)} {teks(km.jam_masuk)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Keluar / Lama</span><span className="font-mono">{teks(km.tgl_keluar)} ({teks(km.lama)} hari)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Diagnosa Awal</span><span>{teks(km.diagnosa_awal)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Diagnosa Akhir</span><span>{teks(km.diagnosa_akhir)}</span></div>
                  </div>
                </div>
              )}

              {sep && (
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1.5 font-semibold text-slate-800">Informasi SEP BPJS</div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                    <div className="flex justify-between"><span className="text-slate-500">No. SEP</span><span className="font-mono font-semibold">{teks(sep.no_sep)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Tanggal SEP</span><span className="font-mono">{teks(sep.tglsep)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">No. Kartu</span><span className="font-mono">{teks(sep.no_kartu)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Diagnosa Awal</span><span>{teks(sep.diagawal)} {teks(sep.nmdiagnosaawal, "")}</span></div>
                  </div>
                </div>
              )}

              {data.diagnosa.length > 0 && (
                <div>
                  <div className="mb-1 font-semibold text-slate-800">Diagnosa Tercatat</div>
                  <table className="w-full border-collapse border border-slate-300 text-[11px]">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="border border-slate-300 px-2 py-1 text-left">Prioritas</th>
                        <th className="border border-slate-300 px-2 py-1 text-left">Kode ICD-10</th>
                        <th className="border border-slate-300 px-2 py-1 text-left">Nama Penyakit</th>
                        <th className="border border-slate-300 px-2 py-1 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.diagnosa.map((d, idx) => (
                        <tr key={idx}>
                          <td className="border border-slate-300 px-2 py-1 font-mono">{teks(d.prioritas)}</td>
                          <td className="border border-slate-300 px-2 py-1 font-mono">{teks(d.kd_penyakit)}</td>
                          <td className="border border-slate-300 px-2 py-1">{teks(d.nm_penyakit)}</td>
                          <td className="border border-slate-300 px-2 py-1">{teks(d.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {kategori === "checklist" && (
                <div>
                  <div className="mb-1 font-semibold text-slate-800">Daftar Kelengkapan / Pemeriksaan</div>
                  <table className="w-full border-collapse border border-slate-300 text-[11px]">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="w-10 border border-slate-300 px-2 py-1 text-center">No</th>
                        <th className="border border-slate-300 px-2 py-1 text-left">Uraian Dokumen / Pemeriksaan</th>
                        <th className="w-24 border border-slate-300 px-2 py-1 text-center">Ada / Tidak</th>
                        <th className="w-36 border border-slate-300 px-2 py-1 text-left">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Identitas Pasien & Nomor Rekam Medis",
                        "Surat Pengantar / Rujukan / SEP BPJS",
                        "Pengkajian Awal Keperawatan & Medis",
                        "Hasil Pemeriksaan Penunjang (Lab / Radiologi)",
                        "Resep Obat / Tindakan / Resume Medis",
                      ].map((uraian, i) => (
                        <tr key={uraian}>
                          <td className="border border-slate-300 px-2 py-1.5 text-center font-mono">{i + 1}</td>
                          <td className="border border-slate-300 px-2 py-1.5">{uraian}</td>
                          <td className="border border-slate-300 px-2 py-1.5 text-center">[ ] Ya  [ ] Tidak</td>
                          <td className="border border-slate-300 px-2 py-1.5"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 grid grid-cols-2 gap-8 pt-4 text-center text-xs">
                <div>
                  <div>Pasien / Keluarga</div>
                  <div className="mt-14 font-semibold">({teks(k.p_jawab, ".........................")})</div>
                </div>
                <div>
                  <div>Dokter / Petugas</div>
                  <div className="mt-14 font-semibold">({teks(k.nm_dokter, ".........................")})</div>
                </div>
              </div>
            </div>
          )}
        </article>
      ) : null}
    </div>
  );
}

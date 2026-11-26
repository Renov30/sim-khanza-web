"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { PatientMasterSelect } from "@/components/pasien/PatientMasterSelect";
import type { AksiPanelPemeriksaan, StatusPanelPemeriksaan } from "./kontrak-panel-pemeriksaan";
import { registrationDate } from "@/lib/registrasi/date";
import { cetakTabelDomJasper } from "@/lib/cetak/jasper-web";

interface PasienCatatan {
  no_rawat: string; no_rkm_medis: string; nm_pasien: string; nm_poli: string;
  tgl_registrasi: string; kd_dokter: string; nm_dokter: string;
}
interface Dokter { kode: string; nama: string }
interface CatatanRow { tanggal: string; jam: string; no_rawat: string; kd_dokter: string; nm_dokter: string | null; catatan: string }
interface FormCatatan { tanggal: string; jam: string; kd_dokter: string; catatan: string }

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(new Date());
}
function formKosong(pasien: PasienCatatan): FormCatatan {
  return { tanggal: registrationDate(), jam: jamJayapura(), kd_dokter: pasien.kd_dokter, catatan: "" };
}

export const CatatanDokterTab = forwardRef<AksiPanelPemeriksaan, {
  pasien: PasienCatatan;
  onStatusPanelChange: (status: StatusPanelPemeriksaan) => void;
}>(function CatatanDokterTab({ pasien, onStatusPanelChange }, ref) {
  const [form, setForm] = useState<FormCatatan>(() => formKosong(pasien));
  const [dokter, setDokter] = useState<Dokter[]>([]);
  const [data, setData] = useState<CatatanRow[]>([]);
  const [terpilih, setTerpilih] = useState<CatatanRow | null>(null);
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(pasien.tgl_registrasi);
  const [tanggalSelesai, setTanggalSelesai] = useState(() => registrationDate());
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [versi, setVersi] = useState(0);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error" } | null>(null);

  useEffect(() => {
    if (terpilih || !waktuOtomatis) return;
    const perbarui = () => setForm((lama) => ({ ...lama, tanggal: registrationDate(), jam: jamJayapura() }));
    perbarui(); const timer = setInterval(perbarui, 1000); return () => clearInterval(timer);
  }, [terpilih, waktuOtomatis]);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/api/tindakan-rawat-jalan/catatan-dokter?resource=dokter", { signal: controller.signal });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat dokter");
        setDokter(json.data || []);
      } catch (error) { if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat dokter", tipe: "error" }); }
    })();
    return () => controller.abort();
  }, []);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({ no_rawat: pasien.no_rawat });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (kataKunciFilter) params.set("cari", kataKunciFilter);
      const response = await fetch(`/api/tindakan-rawat-jalan/catatan-dokter?${params}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat catatan dokter");
      setData(json.data || []);
    } catch (error) { if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat catatan dokter", tipe: "error" }); }
    finally { if (!signal?.aborted) setMemuat(false); }
  }, [kataKunciFilter, pasien.no_rawat, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController(); void muatData(controller.signal); return () => controller.abort();
  }, [muatData, versi]);

  const isi = (nama: keyof FormCatatan, nilai: string) => setForm((lama) => ({ ...lama, [nama]: nilai }));
  const baru = useCallback(() => { setTerpilih(null); setWaktuOtomatis(true); setForm(formKosong(pasien)); }, [pasien]);
  const pilih = (item: CatatanRow) => {
    setTerpilih(item); setWaktuOtomatis(false);
    setForm({ tanggal: item.tanggal, jam: item.jam, kd_dokter: item.kd_dokter, catatan: item.catatan });
  };

  const simpan = useCallback(async () => {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan/catatan-dokter", {
        method: terpilih ? "PUT" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat, ...form, asli_tanggal: terpilih?.tanggal, asli_jam: terpilih?.jam, asli_dokter: terpilih?.kd_dokter, asli_catatan: terpilih?.catatan }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Catatan dokter gagal disimpan");
      setToast({ pesan: json.message, tipe: "sukses" }); baru(); await muatData();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Catatan dokter gagal disimpan", tipe: "error" }); }
    finally { setMenyimpan(false); }
  }, [baru, form, muatData, pasien.no_rawat, terpilih]);

  const hapus = async () => {
    if (!terpilih) return;
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan/catatan-dokter", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat, ...form, asli_tanggal: terpilih.tanggal, asli_jam: terpilih.jam, asli_dokter: terpilih.kd_dokter, asli_catatan: terpilih.catatan }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Catatan dokter gagal dihapus");
      setToast({ pesan: json.message, tipe: "sukses" }); setKonfirmasi(false); baru(); await muatData();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Catatan dokter gagal dihapus", tipe: "error" }); }
    finally { setMenyimpan(false); }
  };

  const cari = () => { setKataKunciFilter(kataKunci.trim()); setVersi((nilai) => nilai + 1); };
  const semua = () => { setTanggalMulai(pasien.tgl_registrasi); setTanggalSelesai(registrationDate()); setKataKunci(""); setKataKunciFilter(""); setVersi((nilai) => nilai + 1); };
  const cetak = () => data.length ? cetakTabelDomJasper("Catatan Dokter Pasien", `${pasien.no_rawat} — ${pasien.nm_pasien}`) : setToast({ pesan: "Belum ada catatan dokter untuk dicetak.", tipe: "info" });
  useImperativeHandle(ref, () => ({ simpan: () => void simpan(), baru, ganti: () => void simpan(), hapus: () => setKonfirmasi(true), cetak,
    gantiTanggalMulai: setTanggalMulai, gantiTanggalSelesai: setTanggalSelesai, gantiKataKunci: setKataKunci, cari, semua }));

  const lengkap = Boolean(form.kd_dokter && form.catatan.trim());
  useEffect(() => onStatusPanelChange({
    disabledSimpan: menyimpan || Boolean(terpilih) || !lengkap, disabledGanti: menyimpan || !terpilih || !lengkap,
    disabledHapus: menyimpan || !terpilih, disabledCetak: data.length === 0, tanggalMulai, tanggalSelesai,
    kataKunci, jumlahRecord: data.length, memuat: memuat || menyimpan,
  }), [data.length, kataKunci, lengkap, memuat, menyimpan, onStatusPanelChange, tanggalMulai, tanggalSelesai, terpilih]);

  const daftarDokter = pasien.kd_dokter && !dokter.some((item) => item.kode === pasien.kd_dokter)
    ? [{ kode: pasien.kd_dokter, nama: pasien.nm_dokter }, ...dokter] : dokter;
  return <div id="panel-tindakan-ralan" role="tabpanel" aria-labelledby="tab-tindakan-catatan" tabIndex={0} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
    <section aria-label={terpilih ? "Ubah catatan dokter" : "Input catatan dokter"} className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-primary-200 bg-primary-50/50 px-2.5 py-1.5 text-[11px] text-slate-700">
        <div><span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span><span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span><span className="ml-2">{pasien.nm_poli}</span></div>
        <div className="flex items-center gap-1.5"><label className="flex items-center gap-1">Tanggal<input type="date" value={form.tanggal} onChange={(event) => { setWaktuOtomatis(false); isi("tanggal", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label><label className="flex items-center gap-1">Jam<input type="time" step="1" value={form.jam} onChange={(event) => { setWaktuOtomatis(false); isi("jam", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label><label title="Perbarui tanggal dan jam secara otomatis"><input aria-label="Perbarui waktu catatan secara otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" /></label></div>
      </div>
      <div className="grid gap-x-7 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="p-1 lg:col-span-3">
          <div className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
            <span className="whitespace-nowrap text-right font-medium">Dokter :</span>
            <PatientMasterSelect jenis="Dokter catatan perawatan" label="Dokter" value={form.kd_dokter} items={daftarDokter.map((item) => ({ id: item.kode, label: item.nama }))} onChange={(kode) => isi("kd_dokter", kode)} />
          </div>
        </div>
        <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-start gap-1 p-1 text-[11px] text-slate-700 lg:col-span-3"><span className="pt-1.5 text-right font-medium">Catatan :</span><textarea aria-label="Catatan dokter" value={form.catatan} onChange={(event) => isi("catatan", event.target.value)} maxLength={700} rows={5} className="w-full resize-y rounded-md border border-slate-300 bg-white px-2 py-1.5 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none" /></label>
      </div>
    </section>
    <section className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-[11px] text-slate-700"><caption className="sr-only">Catatan dokter untuk {pasien.nm_pasien}</caption><thead className="sticky top-0 bg-slate-100"><tr><th scope="col" className="w-28 px-2.5 py-2">Tanggal</th><th scope="col" className="w-24 px-2.5 py-2">Jam</th><th scope="col" className="min-w-44 px-2.5 py-2">Dokter</th><th scope="col" className="min-w-80 px-2.5 py-2">Catatan</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{memuat ? <tr><td colSpan={4} className="py-10 text-center text-slate-500">Memuat catatan dokter...</td></tr> : data.length === 0 ? <tr><td colSpan={4} className="py-10 text-center text-slate-400">Belum ada catatan dokter.</td></tr> : data.map((item, index) => <tr key={`${item.tanggal}-${item.jam}-${item.kd_dokter}-${index}`} onClick={() => pilih(item)} className={`cursor-pointer ${terpilih === item ? "bg-primary-100" : "hover:bg-slate-50"}`}><td className="whitespace-nowrap px-2.5 py-2 font-mono">{item.tanggal}</td><td className="whitespace-nowrap px-2.5 py-2 font-mono">{item.jam}</td><td className="px-2.5 py-2"><span className="font-mono text-slate-600">{item.kd_dokter}</span><span className="block">{item.nm_dokter || "-"}</span></td><td className="whitespace-pre-wrap px-2.5 py-2 align-top">{item.catatan}</td></tr>)}</tbody>
      </table>
    </section>
    <KonfirmasiDialog terbuka={konfirmasi} judul="Hapus Catatan Dokter" pesan={`Hapus catatan ${terpilih?.tanggal || ""} ${terpilih?.jam || ""} untuk ${pasien.nm_pasien}?`} subPesan="Catatan yang dihapus tidak dapat dipulihkan dari halaman ini." onBatal={() => setKonfirmasi(false)} onKonfirmasi={hapus} sedangMemproses={menyimpan} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
});

"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { CustomSelect } from "@/components/ui/CustomSelect";
import type { AksiPanelPemeriksaan, StatusPanelPemeriksaan } from "./kontrak-panel-pemeriksaan";
import { registrationDate } from "@/lib/registrasi/date";

type Jenis = "diagnosa" | "prosedur";
interface PasienDiagnosa { no_rawat: string; no_rkm_medis: string; nm_pasien: string; nm_poli: string; tgl_registrasi: string; jam_reg: string }
interface MasterKode { kode: string; nama: string }
interface DiagnosaRow extends MasterKode { prioritas: number; status_penyakit: "Baru" | "Lama" }
interface ProsedurRow extends MasterKode { prioritas: number }
type PilihanRiwayat = { jenis: Jenis; row: DiagnosaRow | ProsedurRow };

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).format(new Date());
}

async function ambilMaster(jenis: Jenis, cari: string, offset: number, signal?: AbortSignal) {
  const params = new URLSearchParams({
    resource: jenis === "diagnosa" ? "master-diagnosa" : "master-prosedur",
    cari,
    offset: String(offset),
  });
  const response = await fetch(`/api/tindakan-rawat-jalan/diagnosa?${params}`, { signal, cache: "no-store" });
  const json: { success?: boolean; data?: MasterKode[]; error?: string; meta?: { hasMore?: boolean } } = await response.json();
  if (!response.ok || !json.success) throw new Error(json.error || `Gagal memuat ${jenis}`);
  return { data: json.data || [], hasMore: Boolean(json.meta?.hasMore) };
}

export const DiagnosaRalanTab = forwardRef<AksiPanelPemeriksaan, {
  pasien: PasienDiagnosa;
  onStatusPanelChange: (status: StatusPanelPemeriksaan) => void;
}>(function DiagnosaRalanTab({ pasien, onStatusPanelChange }, ref) {
  const [tab, setTab] = useState<Jenis>("diagnosa");
  const [cariDiagnosa, setCariDiagnosa] = useState("");
  const [cariProsedur, setCariProsedur] = useState("");
  const [masterDiagnosa, setMasterDiagnosa] = useState<MasterKode[]>([]);
  const [masterProsedur, setMasterProsedur] = useState<MasterKode[]>([]);
  const [memuatMasterDiagnosa, setMemuatMasterDiagnosa] = useState(true);
  const [memuatMasterProsedur, setMemuatMasterProsedur] = useState(true);
  const [memuatDiagnosaBerikutnya, setMemuatDiagnosaBerikutnya] = useState(false);
  const [memuatProsedurBerikutnya, setMemuatProsedurBerikutnya] = useState(false);
  const [adaDiagnosaBerikutnya, setAdaDiagnosaBerikutnya] = useState(false);
  const [adaProsedurBerikutnya, setAdaProsedurBerikutnya] = useState(false);
  const [offsetDiagnosa, setOffsetDiagnosa] = useState(0);
  const [offsetProsedur, setOffsetProsedur] = useState(0);
  const permintaanMaster = useRef<Record<Jenis, number>>({ diagnosa: 0, prosedur: 0 });
  const sedangMuatBerikutnya = useRef<Record<Jenis, boolean>>({ diagnosa: false, prosedur: false });
  const [diagnosaDipilih, setDiagnosaDipilih] = useState<Set<string>>(new Set());
  const [prosedurDipilih, setProsedurDipilih] = useState<Set<string>>(new Set());
  const [diagnosa, setDiagnosa] = useState<DiagnosaRow[]>([]);
  const [prosedur, setProsedur] = useState<ProsedurRow[]>([]);
  const [terpilih, setTerpilih] = useState<PilihanRiwayat | null>(null);
  const [statusPenyakit, setStatusPenyakit] = useState<"Baru" | "Lama">("Baru");
  const [tanggal, setTanggal] = useState(() => registrationDate());
  const [jam, setJam] = useState(jamJayapura);
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(pasien.tgl_registrasi);
  const [tanggalSelesai, setTanggalSelesai] = useState(pasien.tgl_registrasi);
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [versi, setVersi] = useState(0);
  const [versiMaster, setVersiMaster] = useState(0);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error" } | null>(null);

  useEffect(() => {
    if (terpilih || !waktuOtomatis) return;
    const perbaruiWaktu = () => { setTanggal(registrationDate()); setJam(jamJayapura()); };
    perbaruiWaktu();
    const timer = setInterval(perbaruiWaktu, 1000);
    return () => clearInterval(timer);
  }, [terpilih, waktuOtomatis]);

  const muatRiwayat = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({ resource: "riwayat", no_rawat: pasien.no_rawat });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (kataKunciFilter) params.set("cari", kataKunciFilter);
      const response = await fetch(`/api/tindakan-rawat-jalan/diagnosa?${params}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat diagnosa pasien");
      setDiagnosa(json.data?.diagnosa || []);
      setProsedur(json.data?.prosedur || []);
    } catch (error) {
      if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat diagnosa pasien", tipe: "error" });
    } finally { if (!signal?.aborted) setMemuat(false); }
  }, [kataKunciFilter, pasien.no_rawat, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    void muatRiwayat(controller.signal);
    return () => controller.abort();
  }, [muatRiwayat, versi]);

  useEffect(() => {
    const controller = new AbortController();
    const nomorPermintaan = ++permintaanMaster.current.diagnosa;
    sedangMuatBerikutnya.current.diagnosa = false;
    const cari = cariDiagnosa.trim();
    const timer = setTimeout(async () => {
      setMemuatMasterDiagnosa(true);
      setMemuatDiagnosaBerikutnya(false);
      setAdaDiagnosaBerikutnya(false);
      setOffsetDiagnosa(0);
      try {
        const hasil = await ambilMaster("diagnosa", cari, 0, controller.signal);
        if (nomorPermintaan !== permintaanMaster.current.diagnosa) return;
        setMasterDiagnosa(hasil.data);
        setOffsetDiagnosa(hasil.data.length);
        setAdaDiagnosaBerikutnya(hasil.hasMore);
      } catch (error) { if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal mencari ICD-10", tipe: "error" }); }
      finally { if (!controller.signal.aborted && nomorPermintaan === permintaanMaster.current.diagnosa) setMemuatMasterDiagnosa(false); }
    }, cari ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariDiagnosa, versiMaster]);

  useEffect(() => {
    const controller = new AbortController();
    const nomorPermintaan = ++permintaanMaster.current.prosedur;
    sedangMuatBerikutnya.current.prosedur = false;
    const cari = cariProsedur.trim();
    const timer = setTimeout(async () => {
      setMemuatMasterProsedur(true);
      setMemuatProsedurBerikutnya(false);
      setAdaProsedurBerikutnya(false);
      setOffsetProsedur(0);
      try {
        const hasil = await ambilMaster("prosedur", cari, 0, controller.signal);
        if (nomorPermintaan !== permintaanMaster.current.prosedur) return;
        setMasterProsedur(hasil.data);
        setOffsetProsedur(hasil.data.length);
        setAdaProsedurBerikutnya(hasil.hasMore);
      } catch (error) { if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal mencari ICD-9-CM", tipe: "error" }); }
      finally { if (!controller.signal.aborted && nomorPermintaan === permintaanMaster.current.prosedur) setMemuatMasterProsedur(false); }
    }, cari ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariProsedur, versiMaster]);

  const muatMasterBerikutnya = async (jenis: Jenis) => {
    const diagnosaAktif = jenis === "diagnosa";
    const adaBerikutnya = diagnosaAktif ? adaDiagnosaBerikutnya : adaProsedurBerikutnya;
    const sedangMemuat = diagnosaAktif ? memuatDiagnosaBerikutnya : memuatProsedurBerikutnya;
    const memuatAwal = diagnosaAktif ? memuatMasterDiagnosa : memuatMasterProsedur;
    if (!adaBerikutnya || sedangMemuat || memuatAwal || sedangMuatBerikutnya.current[jenis]) return;
    const offset = diagnosaAktif ? offsetDiagnosa : offsetProsedur;
    const cari = diagnosaAktif ? cariDiagnosa.trim() : cariProsedur.trim();
    const nomorPermintaan = permintaanMaster.current[jenis];
    sedangMuatBerikutnya.current[jenis] = true;
    if (diagnosaAktif) setMemuatDiagnosaBerikutnya(true);
    else setMemuatProsedurBerikutnya(true);
    try {
      const hasil = await ambilMaster(jenis, cari, offset);
      if (nomorPermintaan !== permintaanMaster.current[jenis]) return;
      if (diagnosaAktif) {
        setMasterDiagnosa((lama) => [...lama, ...hasil.data]);
        setOffsetDiagnosa(offset + hasil.data.length);
        setAdaDiagnosaBerikutnya(hasil.hasMore);
      } else {
        setMasterProsedur((lama) => [...lama, ...hasil.data]);
        setOffsetProsedur(offset + hasil.data.length);
        setAdaProsedurBerikutnya(hasil.hasMore);
      }
    } catch (error) {
      if (nomorPermintaan === permintaanMaster.current[jenis]) {
        setToast({ pesan: error instanceof Error ? error.message : `Gagal memuat ${jenis} berikutnya`, tipe: "error" });
      }
    } finally {
      if (nomorPermintaan === permintaanMaster.current[jenis]) {
        sedangMuatBerikutnya.current[jenis] = false;
        if (diagnosaAktif) setMemuatDiagnosaBerikutnya(false);
        else setMemuatProsedurBerikutnya(false);
      }
    }
  };

  const baru = useCallback(() => {
    setCariDiagnosa(""); setCariProsedur(""); setMasterDiagnosa([]); setMasterProsedur([]);
    setDiagnosaDipilih(new Set()); setProsedurDipilih(new Set()); setTerpilih(null); setStatusPenyakit("Baru");
    setTanggal(registrationDate()); setJam(jamJayapura()); setWaktuOtomatis(true);
    setVersiMaster((nilai) => nilai + 1);
  }, []);

  const simpan = useCallback(async () => {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan/diagnosa", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat, diagnosa: [...diagnosaDipilih], prosedur: [...prosedurDipilih] }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Diagnosa gagal disimpan");
      setToast({ pesan: json.message, tipe: "sukses" }); baru(); await muatRiwayat();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Diagnosa gagal disimpan", tipe: "error" }); }
    finally { setMenyimpan(false); }
  }, [baru, diagnosaDipilih, muatRiwayat, pasien.no_rawat, prosedurDipilih]);

  const ganti = useCallback(async () => {
    if (!terpilih || terpilih.jenis !== "diagnosa") return;
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan/diagnosa", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat, kode: terpilih.row.kode, status_penyakit: statusPenyakit }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Status diagnosa gagal diperbarui");
      setToast({ pesan: json.message, tipe: "sukses" }); setTerpilih(null); await muatRiwayat();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Status diagnosa gagal diperbarui", tipe: "error" }); }
    finally { setMenyimpan(false); }
  }, [muatRiwayat, pasien.no_rawat, statusPenyakit, terpilih]);

  const hapus = async () => {
    if (!terpilih) return;
    setMenyimpan(true);
    try {
      const params = new URLSearchParams({ jenis: terpilih.jenis, no_rawat: pasien.no_rawat, kode: terpilih.row.kode });
      const response = await fetch(`/api/tindakan-rawat-jalan/diagnosa?${params}`, { method: "DELETE" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Data gagal dihapus");
      setToast({ pesan: json.message, tipe: "sukses" }); setKonfirmasi(false); setTerpilih(null); await muatRiwayat();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Data gagal dihapus", tipe: "error" }); }
    finally { setMenyimpan(false); }
  };

  const pilihRiwayat = (jenis: Jenis, row: DiagnosaRow | ProsedurRow) => {
    setTerpilih({ jenis, row });
    setTanggal(pasien.tgl_registrasi); setJam(pasien.jam_reg); setWaktuOtomatis(false);
    if (jenis === "diagnosa") setStatusPenyakit((row as DiagnosaRow).status_penyakit || "Baru");
  };
  const ubahKode = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, kode: string) => setter((lama) => {
    const hasil = new Set(lama); if (hasil.has(kode)) hasil.delete(kode); else hasil.add(kode); return hasil;
  });
  const cari = () => { setKataKunciFilter(kataKunci.trim()); setVersi((nilai) => nilai + 1); };
  const semua = () => { setTanggalMulai(pasien.tgl_registrasi); setTanggalSelesai(pasien.tgl_registrasi); setKataKunci(""); setKataKunciFilter(""); setVersi((nilai) => nilai + 1); };
  const cetak = () => (diagnosa.length || prosedur.length) ? window.print() : setToast({ pesan: "Belum ada diagnosa atau prosedur untuk dicetak.", tipe: "info" });

  useImperativeHandle(ref, () => ({ simpan: () => void simpan(), baru, ganti: () => void ganti(), hapus: () => setKonfirmasi(true), cetak,
    gantiTanggalMulai: setTanggalMulai, gantiTanggalSelesai: setTanggalSelesai, gantiKataKunci: setKataKunci, cari, semua }));

  const adaInput = diagnosaDipilih.size > 0 || prosedurDipilih.size > 0;
  const jumlah = tab === "diagnosa" ? diagnosa.length : prosedur.length;
  useEffect(() => onStatusPanelChange({
    disabledSimpan: menyimpan || !adaInput, disabledGanti: menyimpan || terpilih?.jenis !== "diagnosa",
    disabledHapus: menyimpan || !terpilih, disabledCetak: diagnosa.length + prosedur.length === 0,
    tanggalMulai, tanggalSelesai, kataKunci, jumlahRecord: jumlah, memuat: memuat || menyimpan,
  }), [adaInput, diagnosa.length, jumlah, kataKunci, memuat, menyimpan, onStatusPanelChange, prosedur.length, tanggalMulai, tanggalSelesai, terpilih]);

  const daftarMaster = (
    jenis: Jenis,
    judul: string,
    cariNilai: string,
    setCari: (nilai: string) => void,
    data: MasterKode[],
    pilihan: Set<string>,
    setPilihan: React.Dispatch<React.SetStateAction<Set<string>>>,
    memuatAwal: boolean,
    memuatBerikutnya: boolean,
  ) => (
    <fieldset className="min-w-0 p-1">
      <legend className="px-1 text-[11px] font-semibold text-slate-700">{judul}</legend>
      <input value={cariNilai} onChange={(event) => setCari(event.target.value)} placeholder="Cari kode atau nama" className="mb-1.5 h-7 w-full rounded-md border border-slate-300 bg-white px-2 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none" />
      <div onScroll={(event) => {
        const target = event.currentTarget;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 64) void muatMasterBerikutnya(jenis);
      }} className="h-36 overflow-auto rounded-md border border-slate-200 bg-white">
        {memuatAwal ? <p className="p-4 text-center text-[11px] text-slate-500">Memuat daftar...</p>
          : data.length === 0 ? <p className="p-4 text-center text-[11px] text-slate-400">Data tidak ditemukan.</p>
            : data.map((item) => <label key={item.kode} className="flex cursor-pointer items-start gap-2 border-b border-slate-100 px-2 py-1.5 text-[11px] text-slate-700 last:border-0 hover:bg-slate-50">
              <input type="checkbox" checked={pilihan.has(item.kode)} onChange={() => ubahKode(setPilihan, item.kode)} className="mt-0.5 accent-primary-700" />
              <span><span className="font-mono">{item.kode}</span> · {item.nama}</span>
            </label>)}
        {memuatBerikutnya && <p className="border-t border-slate-100 p-2 text-center text-[10px] text-slate-500">Memuat 20 data berikutnya...</p>}
      </div>
      <p className="mt-1 text-[10px] text-slate-500">{pilihan.size} kode dipilih</p>
    </fieldset>
  );

  const dataAktif = tab === "diagnosa" ? diagnosa : prosedur;
  return <div id="panel-tindakan-ralan" role="tabpanel" aria-labelledby="tab-tindakan-diagnosa" tabIndex={0} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
    <section aria-label="Input diagnosa dan prosedur pasien" className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 rounded-md border border-primary-200 bg-primary-50/50 px-2.5 py-1.5 text-[11px] text-slate-700">
        <div><span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span><span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span><span className="ml-2">{pasien.nm_poli}</span></div>
        <div className="flex flex-wrap items-center gap-1.5">
          <label className="flex items-center gap-1">Tanggal<input type="date" value={tanggal} onChange={(event) => { setWaktuOtomatis(false); setTanggal(event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
          <label className="flex items-center gap-1">Jam<input type="time" step="1" value={jam} onChange={(event) => { setWaktuOtomatis(false); setJam(event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
          <label className="flex items-center gap-1 whitespace-nowrap" title="Perbarui tanggal dan jam secara otomatis"><input aria-label="Waktu otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" /></label>
          {terpilih?.jenis === "diagnosa" && <label className="flex items-center gap-1.5">Status penyakit
            <CustomSelect value={statusPenyakit} onChange={(event) => setStatusPenyakit(event.target.value as "Baru" | "Lama")} className="h-7 py-0.5 pr-7 text-[11px]"><option>Baru</option><option>Lama</option></CustomSelect>
          </label>}
        </div>
      </div>
      <div className="grid gap-2 lg:grid-cols-2">
        {daftarMaster("diagnosa", "Diagnosa ICD-10", cariDiagnosa, setCariDiagnosa, masterDiagnosa, diagnosaDipilih, setDiagnosaDipilih, memuatMasterDiagnosa, memuatDiagnosaBerikutnya)}
        {daftarMaster("prosedur", "Prosedur ICD-9-CM", cariProsedur, setCariProsedur, masterProsedur, prosedurDipilih, setProsedurDipilih, memuatMasterProsedur, memuatProsedurBerikutnya)}
      </div>
    </section>
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <div role="tablist" aria-label="Riwayat diagnosa pasien" className="flex shrink-0 border-b border-slate-200 bg-slate-50">
        {(["diagnosa", "prosedur"] as const).map((item) => <button key={item} id={`tab-riwayat-${item}`} type="button" role="tab" aria-selected={tab === item} aria-controls={`panel-riwayat-${item}`} tabIndex={tab === item ? 0 : -1} onClick={() => { setTab(item); setTerpilih(null); }} onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const tujuan: Jenis = event.key === "Home" ? "diagnosa"
            : event.key === "End" ? "prosedur"
              : item === "diagnosa" ? "prosedur" : "diagnosa";
          setTab(tujuan); setTerpilih(null); document.getElementById(`tab-riwayat-${tujuan}`)?.focus();
        }} className={`border-b-2 px-3 py-2 text-[11px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tab === item ? "border-primary-700 bg-white text-slate-800" : "border-transparent text-slate-500"}`}>{item === "diagnosa" ? "Diagnosa Pasien" : "Prosedur Pasien"}</button>)}
      </div>
      <div id={`panel-riwayat-${tab}`} role="tabpanel" aria-labelledby={`tab-riwayat-${tab}`} tabIndex={0} className="min-h-0 flex-1 overflow-auto">
        <table className="w-full border-collapse text-left text-[11px] text-slate-700">
          <caption className="sr-only">{tab === "diagnosa" ? "Diagnosa" : "Prosedur"} pasien {pasien.nm_pasien}</caption>
          <thead className="sticky top-0 bg-slate-100"><tr><th scope="col" className="w-28 px-2.5 py-2">Kode</th><th scope="col" className="px-2.5 py-2">Nama</th>{tab === "diagnosa" && <th scope="col" className="w-24 px-2.5 py-2">Status</th>}<th scope="col" className="w-20 px-2.5 py-2 text-center">Prioritas</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{memuat ? <tr><td colSpan={tab === "diagnosa" ? 4 : 3} className="py-10 text-center text-slate-500">Memuat data...</td></tr>
            : dataAktif.length === 0 ? <tr><td colSpan={tab === "diagnosa" ? 4 : 3} className="py-10 text-center text-slate-400">Belum ada data.</td></tr>
              : dataAktif.map((row) => <tr key={row.kode} onClick={() => pilihRiwayat(tab, row)} className={`cursor-pointer ${terpilih?.jenis === tab && terpilih.row.kode === row.kode ? "bg-primary-100" : "hover:bg-slate-50"}`}><td className="px-2.5 py-2 font-mono">{row.kode}</td><td className="px-2.5 py-2">{row.nama}</td>{tab === "diagnosa" && <td className="px-2.5 py-2">{(row as DiagnosaRow).status_penyakit || "-"}</td>}<td className="px-2.5 py-2 text-center font-mono">{row.prioritas}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <KonfirmasiDialog terbuka={konfirmasi} judul={`Hapus ${terpilih?.jenis === "prosedur" ? "Prosedur" : "Diagnosa"}`} pesan={`Hapus ${terpilih?.row.kode || "data terpilih"} dari ${pasien.nm_pasien}?`} subPesan="Data yang dihapus juga akan disinkronkan ke resume pasien." onBatal={() => setKonfirmasi(false)} onKonfirmasi={hapus} sedangMemproses={menyimpan} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
});

"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faFileMedical, faFlask, faHeartPulse, faMagnifyingGlass, faTooth, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { PatientMasterSelect } from "@/components/pasien/PatientMasterSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";
import type {
  AksiPanelPemeriksaan,
  StatusPanelPemeriksaan,
} from "@/components/tindakan-rawat-jalan/kontrak-panel-pemeriksaan";

interface PasienPemeriksaan {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  nm_poli: string;
  kd_dokter: string;
  nm_dokter: string;
}
interface Pegawai { kode: string; nama: string; jbtn: string }
interface Pemeriksaan {
  no_rawat: string; tgl_perawatan: string; jam_rawat: string; suhu_tubuh: string; tensi: string;
  nadi: string; respirasi: string; tinggi: string; berat: string; spo2: string; gcs: string;
  kesadaran: string; keluhan: string; pemeriksaan: string; alergi: string; lingkar_perut: string;
  rtl: string; penilaian: string; instruksi: string; evaluasi: string; nip: string; nama: string; jbtn: string;
}
interface SoapieTerakhir {
  tgl_perawatan: string;
  jam_rawat: string;
  keluhan: string | null;
  pemeriksaan: string | null;
  penilaian: string | null;
  rtl: string | null;
  instruksi: string | null;
  evaluasi: string | null;
}

interface FormPemeriksaan {
  tgl_perawatan: string; jam_rawat: string; suhu_tubuh: string; tensi: string; nadi: string;
  respirasi: string; tinggi: string; berat: string; spo2: string; gcs: string; kesadaran: string;
  keluhan: string; pemeriksaan: string; alergi: string; lingkar_perut: string; rtl: string;
  penilaian: string; instruksi: string; evaluasi: string; nip: string;
}

interface PemeriksaanRalanTabProps {
  pasien: PasienPemeriksaan;
  onStatusPanelChange: (status: StatusPanelPemeriksaan) => void;
}

const KESADARAN = ["Compos Mentis", "Somnolence", "Sopor", "Coma", "Alert", "Confusion", "Voice", "Pain", "Unresponsive", "Apatis", "Delirium"];

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(new Date());
}

function formKosong(nip = ""): FormPemeriksaan {
  return { tgl_perawatan: registrationDate(), jam_rawat: jamJayapura(), suhu_tubuh: "", tensi: "", nadi: "", respirasi: "", tinggi: "", berat: "", spo2: "", gcs: "", kesadaran: "Compos Mentis", keluhan: "", pemeriksaan: "", alergi: "", lingkar_perut: "", rtl: "", penilaian: "", instruksi: "", evaluasi: "", nip };
}

export const PemeriksaanRalanTab = forwardRef<AksiPanelPemeriksaan, PemeriksaanRalanTabProps>(function PemeriksaanRalanTab({ pasien, onStatusPanelChange }, ref) {
  const [form, setForm] = useState<FormPemeriksaan>(() => formKosong(pasien.kd_dokter));
  const [data, setData] = useState<Pemeriksaan[]>([]);
  const [pegawai, setPegawai] = useState<Pegawai[]>([]);
  const [soapie, setSoapie] = useState<SoapieTerakhir[]>([]);
  const [memuatSoapie, setMemuatSoapie] = useState(false);
  const [soapieBuka, setSoapieBuka] = useState(false);
  const [terpilih, setTerpilih] = useState<Pemeriksaan | null>(null);
  const [waktuOtomatis, setWaktuOtomatis] = useState(true);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(() => registrationDate());
  const [tanggalSelesai, setTanggalSelesai] = useState(() => registrationDate());
  const [kataKunci, setKataKunci] = useState("");
  const [kataKunciFilter, setKataKunciFilter] = useState("");
  const [versiFilter, setVersiFilter] = useState(0);
  const [toast, setToast] = useState<{ pesan: string; tipe: "sukses" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (terpilih || !waktuOtomatis) return;
    const perbaruiWaktu = () => setForm((lama) => ({ ...lama, tgl_perawatan: registrationDate(), jam_rawat: jamJayapura() }));
    perbaruiWaktu();
    const timer = setInterval(perbaruiWaktu, 1000);
    return () => clearInterval(timer);
  }, [terpilih, waktuOtomatis]);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const params = new URLSearchParams({ no_rawat: pasien.no_rawat });
      if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
      if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
      if (kataKunciFilter) params.set("cari", kataKunciFilter);
      const response = await fetch(`/api/tindakan-rawat-jalan/pemeriksaan?${params}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat pemeriksaan");
      setData(json.data || []);
    } catch (error) {
      if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat pemeriksaan", tipe: "error" });
    } finally { if (!signal?.aborted) setMemuat(false); }
  }, [kataKunciFilter, pasien.no_rawat, tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    const controller = new AbortController();
    async function mulai() {
      try {
        const response = await fetch("/api/tindakan-rawat-jalan/pemeriksaan?resource=pegawai", { signal: controller.signal });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat pegawai");
        const daftar: Pegawai[] = json.data || [];
        setPegawai(daftar);
        setForm((lama) => ({ ...lama, nip: lama.nip || pasien.kd_dokter || (daftar.length === 1 ? daftar[0].kode : "") }));
      } catch (error) {
        if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat pegawai", tipe: "error" });
      }
    }
    void mulai();
    return () => controller.abort();
  }, [pasien.kd_dokter]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => { void muatData(controller.signal); }, 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [muatData, versiFilter]);

  const isi = (nama: keyof FormPemeriksaan, nilai: string) => setForm((lama) => ({ ...lama, [nama]: nilai }));

  const cariSoapieTerakhir = async () => {
    if (!form.nip) {
      setToast({ pesan: "Pelaksana pemeriksaan belum tersedia.", tipe: "info" });
      return;
    }
    setMemuatSoapie(true);
    try {
      const params = new URLSearchParams({ resource: "soapie-terakhir", no_rkm_medis: pasien.no_rkm_medis, nip: form.nip });
      const response = await fetch(`/api/tindakan-rawat-jalan/pemeriksaan?${params}`, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat riwayat SOAPIE");
      setSoapie(json.data || []);
      setSoapieBuka(Boolean(json.data?.length));
      if (!json.data?.length) setToast({ pesan: "Belum ada 5 SOAPIE terakhir untuk pelaksana ini.", tipe: "info" });
    } catch (error) {
      setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat riwayat SOAPIE", tipe: "error" });
    } finally { setMemuatSoapie(false); }
  };

  const pakaiSoapie = (item: SoapieTerakhir) => {
    setForm((lama) => ({ ...lama, keluhan: item.keluhan || "", pemeriksaan: item.pemeriksaan || "", penilaian: item.penilaian || "", rtl: item.rtl || "", instruksi: item.instruksi || "", evaluasi: item.evaluasi || "" }));
    setSoapie([]);
    setSoapieBuka(false);
  };

  const baru = () => {
    setTerpilih(null);
    setWaktuOtomatis(true);
    setForm(formKosong(pasien.kd_dokter || (pegawai.length === 1 ? pegawai[0].kode : "")));
    setSoapie([]);
    setSoapieBuka(false);
  };

  const pilih = (item: Pemeriksaan) => {
    setTerpilih(item);
    setWaktuOtomatis(false);
    setForm({ tgl_perawatan: item.tgl_perawatan, jam_rawat: item.jam_rawat, suhu_tubuh: item.suhu_tubuh || "", tensi: item.tensi || "", nadi: item.nadi || "", respirasi: item.respirasi || "", tinggi: item.tinggi || "", berat: item.berat || "", spo2: item.spo2 || "", gcs: item.gcs || "", kesadaran: item.kesadaran, keluhan: item.keluhan || "", pemeriksaan: item.pemeriksaan || "", alergi: item.alergi || "", lingkar_perut: item.lingkar_perut || "", rtl: item.rtl || "", penilaian: item.penilaian || "", instruksi: item.instruksi || "", evaluasi: item.evaluasi || "", nip: item.nip });
  };

  const simpan = async () => {
    setMenyimpan(true);
    try {
      const response = await fetch("/api/tindakan-rawat-jalan/pemeriksaan", {
        method: terpilih ? "PUT" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_rawat: pasien.no_rawat, ...form, asli_tanggal: terpilih?.tgl_perawatan, asli_jam: terpilih?.jam_rawat }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Pemeriksaan gagal disimpan");
      setToast({ pesan: json.message, tipe: "sukses" });
      baru();
      await muatData();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Pemeriksaan gagal disimpan", tipe: "error" }); }
    finally { setMenyimpan(false); }
  };

  const hapus = async () => {
    if (!terpilih) return;
    setMenyimpan(true);
    try {
      const url = `/api/tindakan-rawat-jalan/pemeriksaan?no_rawat=${encodeURIComponent(terpilih.no_rawat)}&tanggal=${terpilih.tgl_perawatan}&jam=${terpilih.jam_rawat}`;
      const response = await fetch(url, { method: "DELETE" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Pemeriksaan gagal dihapus");
      setToast({ pesan: json.message, tipe: "sukses" });
      setKonfirmasi(false);
      baru();
      await muatData();
    } catch (error) { setToast({ pesan: error instanceof Error ? error.message : "Pemeriksaan gagal dihapus", tipe: "error" }); }
    finally { setMenyimpan(false); }
  };

  const cetak = () => {
    if (data.length === 0) {
      setToast({ pesan: "Belum ada data pemeriksaan untuk dicetak.", tipe: "info" });
      return;
    }
    window.print();
  };

  const cariData = () => {
    setKataKunciFilter(kataKunci.trim());
    setVersiFilter((versi) => versi + 1);
  };

  const resetFilter = () => {
    const hariIni = registrationDate();
    setTanggalMulai(hariIni);
    setTanggalSelesai(hariIni);
    setKataKunci("");
    setKataKunciFilter("");
    setVersiFilter((versi) => versi + 1);
  };

  useImperativeHandle(ref, () => ({
    simpan: () => { void simpan(); },
    baru,
    ganti: () => { void simpan(); },
    hapus: () => setKonfirmasi(true),
    cetak,
    gantiTanggalMulai: setTanggalMulai,
    gantiTanggalSelesai: setTanggalSelesai,
    gantiKataKunci: setKataKunci,
    cari: cariData,
    semua: resetFilter,
  }));

  useEffect(() => {
    onStatusPanelChange({
      disabledSimpan: menyimpan || Boolean(terpilih),
      disabledGanti: menyimpan || !terpilih,
      disabledHapus: menyimpan || !terpilih,
      disabledCetak: data.length === 0,
      tanggalMulai,
      tanggalSelesai,
      kataKunci,
      jumlahRecord: data.length,
      memuat: memuat || menyimpan,
    });
  }, [data.length, kataKunci, memuat, menyimpan, onStatusPanelChange, tanggalMulai, tanggalSelesai, terpilih]);

  const daftarPelaksana = pegawai.some((item) => item.kode === pasien.kd_dokter)
    ? pegawai
    : [{ kode: pasien.kd_dokter, nama: pasien.nm_dokter, jbtn: "Dokter DPJP" }, ...pegawai];
  const pegawaiDipilih = daftarPelaksana.find((item) => item.kode === form.nip);
  const kelasInput = "h-7 w-full rounded-full border border-slate-300 bg-white px-2.5 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none";
  const areaKlinis = (label: string, nama: keyof FormPemeriksaan, baris = 2) => <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-start gap-1.5 text-[11px] text-slate-700"><span className="pt-1.5 text-right">{label} :</span><textarea value={form[nama]} onChange={(event) => isi(nama, event.target.value)} maxLength={2000} rows={baris} className="w-full resize-y rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] leading-4 text-slate-800 focus:border-primary-600 focus:outline-none" /></label>;
  const tandaVital = (label: string, nama: keyof FormPemeriksaan, maxLength: number, placeholder = "") => <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700"><span className="whitespace-nowrap text-right">{label} :</span><input value={form[nama]} onChange={(event) => isi(nama, event.target.value)} maxLength={maxLength} placeholder={placeholder} className={kelasInput} /></label>;

  const pintasan = [
    { label: "Data PCare", ikon: faDatabase },
    { label: "ICare FKTP", ikon: faHeartPulse },
    { label: "Odontogram", ikon: faTooth },
    { label: "Hasil Periksa Lab", ikon: faFlask },
    { label: "Permintaan Lab", ikon: faFileMedical },
  ];

  return <div id="panel-tindakan-ralan" role="tabpanel" aria-labelledby="tab-tindakan-pemeriksaan" tabIndex={0} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
    <section aria-label={terpilih ? "Ubah pemeriksaan rawat jalan" : "Input pemeriksaan rawat jalan"} className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5 rounded-md border border-primary-200 bg-primary-50/50 px-2.5 py-1.5 text-[11px] text-slate-700">
        <div><span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span><span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span><span className="ml-2">{pasien.nm_poli}</span></div>
        <div className="flex items-center gap-1.5">
          <label className="flex items-center gap-1">Tanggal<input type="date" value={form.tgl_perawatan} onChange={(event) => { setWaktuOtomatis(false); isi("tgl_perawatan", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
          <label className="flex items-center gap-1">Jam<input type="time" step="1" value={form.jam_rawat} onChange={(event) => { setWaktuOtomatis(false); isi("jam_rawat", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
          <label className="flex items-center gap-1 whitespace-nowrap" title="Perbarui tanggal dan jam secara otomatis"><input aria-label="Waktu otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" /></label>
        </div>
      </div>

      <div className="grid gap-2 rounded-md border border-slate-200/80 bg-slate-50/60 p-2 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)_10.75rem]">
        <div className="min-w-0 space-y-1.5">
          <div className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
            <span className="whitespace-nowrap text-right font-medium">Dilakukan :</span>
            <PatientMasterSelect jenis="Pelaksana pemeriksaan" label="Pelaksana pemeriksaan" value={form.nip} items={daftarPelaksana.map((item) => ({ id: item.kode, label: item.nama }))} onChange={(kode) => isi("nip", kode)} />
          </div>
          <div className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
            <span className="whitespace-nowrap text-right font-medium">Jabatan :</span>
            <div className="flex min-w-0 items-center gap-1.5">
              <input value={pegawaiDipilih?.jbtn || ""} readOnly aria-label="Profesi, jabatan, atau departemen pelaksana" className={`${kelasInput} min-w-0 flex-1`} />
              <button type="button" onClick={() => void cariSoapieTerakhir()} disabled={memuatSoapie} aria-label="Cari 5 SOAPIE terakhir" title="5 SOAPIE Terakhir" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 disabled:cursor-wait disabled:opacity-60">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
              </button>
            </div>
          </div>
          {areaKlinis("Subjek", "keluhan")}
          {areaKlinis("Objek", "pemeriksaan")}
          <div className="grid gap-x-1.5 gap-y-1.5 sm:grid-cols-3">
            {tandaVital("Suhu (°C)", "suhu_tubuh", 5)}
            {tandaVital("Tensi (mmHg)", "tensi", 8, "120/80")}
            {tandaVital("Berat (Kg)", "berat", 5)}
            {tandaVital("TB (Cm)", "tinggi", 5)}
            {tandaVital("RR (/menit)", "respirasi", 3)}
            {tandaVital("Nadi (/menit)", "nadi", 3)}
            {tandaVital("SpO₂ (%)", "spo2", 3)}
            {tandaVital("GCS (E,V,M)", "gcs", 10)}
            <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700"><span className="whitespace-nowrap text-right">Kesadaran :</span><CustomSelect value={form.kesadaran} onChange={(event) => isi("kesadaran", event.target.value)} containerClassName="relative w-full min-w-[10rem] max-w-[10rem]" className="h-7 rounded-md py-0.5 pr-5 text-[10px]">{KESADARAN.map((item) => <option key={item}>{item}</option>)}</CustomSelect></label>
          </div>
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="grid grid-cols-[4.75rem_5.5rem_3.5rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700">
            <span className="text-right">L.P. (Cm) :</span><input value={form.lingkar_perut} onChange={(event) => isi("lingkar_perut", event.target.value)} maxLength={5} className={kelasInput} />
            <span className="text-right">Alergi :</span><input value={form.alergi} onChange={(event) => isi("alergi", event.target.value)} maxLength={80} className={kelasInput} />
          </div>
          {areaKlinis("Asesmen", "penilaian")}
          {areaKlinis("Plan", "rtl")}
          {areaKlinis("Instruksi", "instruksi")}
          {areaKlinis("Evaluasi", "evaluasi")}
        </div>

        <aside aria-label="Pintasan pemeriksaan" className="grid content-start gap-1 sm:grid-cols-2 xl:grid-cols-1">
          {pintasan.map((item) => <button key={item.label} type="button" onClick={() => setToast({ pesan: `${item.label} belum terintegrasi pada halaman ini.`, tipe: "info" })} className="flex min-h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-left text-[11px] font-medium text-slate-700 hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"><FontAwesomeIcon icon={item.ikon} className="w-4 text-primary-600" /><span>{item.label}</span></button>)}
        </aside>
      </div>
    </section>

    <section className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200/80 bg-white shadow-sm">
      <table className="min-w-[180rem] border-collapse text-left text-[11px]"><caption className="sr-only">Riwayat pemeriksaan rawat jalan {pasien.nm_pasien}</caption><thead className="sticky top-0 z-10 bg-slate-100 text-slate-700"><tr>{["Tgl. Rawat", "Jam", "Suhu", "Tensi", "Nadi", "Respirasi", "Tinggi", "Berat", "SpO₂", "GCS", "Kesadaran", "Keluhan", "Pemeriksaan", "Alergi", "Lingkar Perut", "RTL", "Penilaian", "Instruksi", "Evaluasi", "NIP", "Nama Pegawai", "Jabatan"].map((judul) => <th key={judul} scope="col" className="whitespace-nowrap px-2.5 py-2">{judul}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">{memuat ? <tr><td colSpan={22} className="py-10 text-center">Memuat pemeriksaan...</td></tr> : data.length === 0 ? <tr><td colSpan={22} className="py-10 text-center text-slate-400">Belum ada pemeriksaan.</td></tr> : data.map((item) => <tr key={`${item.tgl_perawatan}-${item.jam_rawat}`} onClick={() => pilih(item)} className={`cursor-pointer ${terpilih?.tgl_perawatan === item.tgl_perawatan && terpilih?.jam_rawat === item.jam_rawat ? "bg-primary-50/90" : "hover:bg-slate-50"}`}><td className="whitespace-nowrap px-2.5 py-2">{item.tgl_perawatan}</td><td className="whitespace-nowrap px-2.5 py-2">{item.jam_rawat}</td>{[item.suhu_tubuh, item.tensi, item.nadi, item.respirasi, item.tinggi, item.berat, item.spo2, item.gcs, item.kesadaran, item.keluhan, item.pemeriksaan, item.alergi, item.lingkar_perut, item.rtl, item.penilaian, item.instruksi, item.evaluasi, item.nip, item.nama, item.jbtn].map((nilai, index) => <td key={index} className="max-w-72 whitespace-pre-wrap px-2.5 py-2 align-top">{nilai || "-"}</td>)}</tr>)}</tbody>
      </table>
    </section>
    {soapieBuka && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3" role="dialog" aria-modal="true" aria-labelledby="judul-soapie-terakhir" onClick={(event) => { if (event.target === event.currentTarget) setSoapieBuka(false); }}>
      <section className="flex max-h-[75vh] w-[min(72rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 id="judul-soapie-terakhir" className="text-sm font-semibold text-slate-800">Riwayat 5 SOAPIE Terakhir</h2>
          <button type="button" onClick={() => setSoapieBuka(false)} aria-label="Tutup riwayat SOAPIE" title="Tutup" className="p-1 text-slate-600">
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </button>
        </div>
        <div className="max-h-[45vh] overflow-auto p-3">
          <table className="w-full min-w-[60rem] table-fixed border-collapse text-left text-xs text-slate-700">
            <caption className="sr-only">Riwayat 5 SOAPIE terakhir pasien</caption>
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
              <tr>{["Tanggal", "Jam", "Subjek", "Objek", "Asesmen", "Plan", "Instruksi", "Evaluasi"].map((judul) => <th key={judul} scope="col" className="border border-slate-200 px-2 py-2 font-semibold">{judul}</th>)}</tr>
            </thead>
            <tbody>
              {soapie.map((item) => <tr key={`${item.tgl_perawatan}-${item.jam_rawat}`} onClick={() => pakaiSoapie(item)} className="cursor-pointer align-top hover:bg-primary-50">
                <td className="whitespace-nowrap border border-slate-200 px-2 py-2">{item.tgl_perawatan}</td>
                <td className="whitespace-nowrap border border-slate-200 px-2 py-2">{item.jam_rawat}</td>
                {[item.keluhan, item.pemeriksaan, item.penilaian, item.rtl, item.instruksi, item.evaluasi].map((nilai, index) => <td key={index} className="min-w-32 whitespace-pre-wrap break-words border border-slate-200 px-2 py-2">{nilai || "-"}</td>)}
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>}
    <KonfirmasiDialog terbuka={konfirmasi} judul="Hapus Pemeriksaan" pesan={`Hapus pemeriksaan ${terpilih?.tgl_perawatan || ""} ${terpilih?.jam_rawat || ""} untuk ${pasien.nm_pasien}?`} subPesan="Data klinis yang dihapus tidak dapat dipulihkan dari halaman ini." onBatal={() => setKonfirmasi(false)} onKonfirmasi={hapus} sedangMemproses={menyimpan} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
});

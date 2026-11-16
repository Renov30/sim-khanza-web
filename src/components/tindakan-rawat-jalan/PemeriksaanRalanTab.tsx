"use client";

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faFileMedical, faFlask, faHeartPulse, faTooth } from "@fortawesome/free-solid-svg-icons";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { PatientMasterSelect } from "@/components/pasien/PatientMasterSelect";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { registrationDate } from "@/lib/registrasi/date";

interface PasienPemeriksaan { no_rawat: string; no_rkm_medis: string; nm_pasien: string; nm_poli: string }
interface Pegawai { kode: string; nama: string; jbtn: string }
interface Pemeriksaan {
  no_rawat: string; tgl_perawatan: string; jam_rawat: string; suhu_tubuh: string; tensi: string;
  nadi: string; respirasi: string; tinggi: string; berat: string; spo2: string; gcs: string;
  kesadaran: string; keluhan: string; pemeriksaan: string; alergi: string; lingkar_perut: string;
  rtl: string; penilaian: string; instruksi: string; evaluasi: string; nip: string; nama: string; jbtn: string;
}

interface FormPemeriksaan {
  tgl_perawatan: string; jam_rawat: string; suhu_tubuh: string; tensi: string; nadi: string;
  respirasi: string; tinggi: string; berat: string; spo2: string; gcs: string; kesadaran: string;
  keluhan: string; pemeriksaan: string; alergi: string; lingkar_perut: string; rtl: string;
  penilaian: string; instruksi: string; evaluasi: string; nip: string;
}

const KESADARAN = ["Compos Mentis", "Somnolence", "Sopor", "Coma", "Alert", "Confusion", "Voice", "Pain", "Unresponsive", "Apatis", "Delirium"];

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jayapura", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(new Date());
}

function formKosong(nip = ""): FormPemeriksaan {
  return { tgl_perawatan: registrationDate(), jam_rawat: jamJayapura(), suhu_tubuh: "", tensi: "", nadi: "", respirasi: "", tinggi: "", berat: "", spo2: "", gcs: "", kesadaran: "Compos Mentis", keluhan: "", pemeriksaan: "", alergi: "", lingkar_perut: "", rtl: "", penilaian: "", instruksi: "", evaluasi: "", nip };
}

export function PemeriksaanRalanTab({ pasien }: { pasien: PasienPemeriksaan }) {
  const [form, setForm] = useState<FormPemeriksaan>(() => formKosong());
  const [data, setData] = useState<Pemeriksaan[]>([]);
  const [pegawai, setPegawai] = useState<Pegawai[]>([]);
  const [terpilih, setTerpilih] = useState<Pemeriksaan | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: "sukses" | "error" | "info" } | null>(null);

  const muatData = useCallback(async (signal?: AbortSignal) => {
    setMemuat(true);
    try {
      const response = await fetch(`/api/tindakan-rawat-jalan/pemeriksaan?no_rawat=${encodeURIComponent(pasien.no_rawat)}`, { signal, cache: "no-store" });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat pemeriksaan");
      setData(json.data || []);
    } catch (error) {
      if (!signal?.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat pemeriksaan", tipe: "error" });
    } finally { if (!signal?.aborted) setMemuat(false); }
  }, [pasien.no_rawat]);

  useEffect(() => {
    const controller = new AbortController();
    async function mulai() {
      try {
        const response = await fetch("/api/tindakan-rawat-jalan/pemeriksaan?resource=pegawai", { signal: controller.signal });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat pegawai");
        const daftar: Pegawai[] = json.data || [];
        setPegawai(daftar);
        setForm((lama) => ({ ...lama, nip: lama.nip || (daftar.length === 1 ? daftar[0].kode : "") }));
      } catch (error) {
        if (!controller.signal.aborted) setToast({ pesan: error instanceof Error ? error.message : "Gagal memuat pegawai", tipe: "error" });
      }
    }
    void mulai();
    void Promise.resolve().then(() => muatData(controller.signal));
    return () => controller.abort();
  }, [muatData]);

  const isi = (nama: keyof FormPemeriksaan, nilai: string) => setForm((lama) => ({ ...lama, [nama]: nilai }));

  const baru = () => {
    setTerpilih(null);
    setForm(formKosong(pegawai.length === 1 ? pegawai[0].kode : ""));
  };

  const pilih = (item: Pemeriksaan) => {
    setTerpilih(item);
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

  const pegawaiDipilih = pegawai.find((item) => item.kode === form.nip);
  const kelasInput = "h-7 w-full rounded-full border border-slate-300 bg-white px-2.5 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none";
  const areaKlinis = (label: string, nama: keyof FormPemeriksaan, baris = 2) => <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-start gap-1.5 text-[11px] text-slate-700"><span className="pt-1.5 text-right">{label} :</span><textarea value={form[nama]} onChange={(event) => isi(nama, event.target.value)} maxLength={2000} rows={baris} className="w-full resize-y rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] leading-4 text-slate-800 focus:border-primary-600 focus:outline-none" /></label>;
  const tandaVital = (label: string, nama: keyof FormPemeriksaan, maxLength: number, placeholder = "") => <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700"><span className="text-right">{label} :</span><input value={form[nama]} onChange={(event) => isi(nama, event.target.value)} maxLength={maxLength} placeholder={placeholder} className={kelasInput} /></label>;

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
          <label className="flex items-center gap-1">Tanggal<input type="date" value={form.tgl_perawatan} onChange={(event) => isi("tgl_perawatan", event.target.value)} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
          <label className="flex items-center gap-1">Jam<input type="time" step="1" value={form.jam_rawat} onChange={(event) => isi("jam_rawat", event.target.value)} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" /></label>
        </div>
      </div>

      <div className="grid gap-2 rounded-md border border-slate-200/80 bg-slate-50/60 p-2 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)_10.75rem]">
        <div className="min-w-0 space-y-1.5">
          <div className="grid grid-cols-[5.75rem_6.5rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
            <span className="text-right">Dilakukan :</span>
            <input value={form.nip} readOnly aria-label="Kode pelaksana" className={`${kelasInput} font-mono`} />
            <PatientMasterSelect jenis="Pelaksana pemeriksaan" label="Pelaksana pemeriksaan" value={form.nip} items={pegawai.map((item) => ({ id: item.kode, label: item.nama }))} onChange={(kode) => isi("nip", kode)} />
          </div>
          <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700">
            <span className="text-right">Profesi / Jabatan / Departemen :</span>
            <input value={pegawaiDipilih?.jbtn || ""} readOnly aria-label="Profesi, jabatan, atau departemen pelaksana" className={kelasInput} />
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
            <label className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1 text-[11px] text-slate-700"><span className="text-right">Kesadaran :</span><CustomSelect value={form.kesadaran} onChange={(event) => isi("kesadaran", event.target.value)} className="h-7 rounded-md py-0.5 text-[11px]">{KESADARAN.map((item) => <option key={item}>{item}</option>)}</CustomSelect></label>
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
    <PanelBawah tampilan="web" onSimpan={simpan} onBaru={baru} onGanti={simpan} onHapus={() => setKonfirmasi(true)} onCetak={cetak} disabledSimpan={menyimpan || Boolean(terpilih)} disabledGanti={menyimpan || !terpilih} disabledHapus={menyimpan || !terpilih} disabledCetak={data.length === 0} jumlahRecord={data.length} memuat={memuat || menyimpan} />
    <KonfirmasiDialog terbuka={konfirmasi} judul="Hapus Pemeriksaan" pesan={`Hapus pemeriksaan ${terpilih?.tgl_perawatan || ""} ${terpilih?.jam_rawat || ""} untuk ${pasien.nm_pasien}?`} subPesan="Data klinis yang dihapus tidak dapat dipulihkan dari halaman ini." onBatal={() => setKonfirmasi(false)} onKonfirmasi={hapus} sedangMemproses={menyimpan} />
    <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
  </div>;
}

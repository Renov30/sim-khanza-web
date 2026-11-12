"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from '@/components/auth/AuthContext';
import { PatientMasterSelect } from '@/components/pasien/PatientMasterSelect';
import { additionalPatientFields, emptyPatientDetails, fullPatientAge } from '@/lib/pasien/fields';
import { registrationDate } from '@/lib/registrasi/date';
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { GridFormulirModul } from "@/components/modul/GridFormulirModul";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export interface PasienData {
  [key: string]: unknown;
  no_rkm_medis: string;
  nm_pasien: string;
  no_ktp: string;
  jk: string;
  tmp_lahir: string;
  tgl_lahir: string;
  nm_ibu: string;
  alamat: string;
  gol_darah: string;
  pekerjaan: string;
  stts_nikah: string;
  agama: string;
  tgl_daftar: string;
  no_tlp: string;
  umur: string;
  pnd: string;
  keluarga: string;
  namakeluarga: string;
  kd_pj: string;
  png_jawab?: string;
  no_peserta: string;
  pekerjaanpj: string;
  alamatpj: string;
  email?: string;
  nip?: string;
}

interface PenjaminOption {
  kd_pj: string;
  png_jawab: string;
}

function pesanError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function PatientField({ label, children }: { label?: string; children: React.ReactNode }) {
  return <div className="flex min-h-7 items-center gap-1.5 font-sans text-xs font-normal">
    <span className="w-28 shrink-0 text-right font-normal text-slate-700">{label ? `${label} :` : ''}</span>
    <div className="flex flex-1 min-w-0 items-center gap-2">{children}</div>
  </div>;
}

export default function HalamanDataPasien() {
  const { isAuthenticated } = useAuth();
  const [detail, setDetail] = useState(() => emptyPatientDetails(registrationDate()));
  const [anggota, setAnggota] = useState({ tni: false, polri: false });
  const [namaWilayah, setNamaWilayah] = useState<Record<string,string>>({});
  const [tabAktif, setTabAktif] = useState<"input" | "data">("input");
  const [data, setData] = useState<PasienData[]>([]);
  const [terpilih, setTerpilih] = useState<PasienData | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [toast, setToast] = useState<{ pesan: string; tipe: "info" | "sukses" | "error"; key: number } | null>(null);
  const [dialogHapusBuka, setDialogHapusBuka] = useState(false);
  const [sedangMenghapus, setSedangMenghapus] = useState(false);

  // Helper menampilkan Toast Feedback
  const tampilkanToast = useCallback((pesan: string, tipe: "info" | "sukses" | "error" = "info") => {
    setToast({ pesan, tipe, key: Date.now() });
  }, []);

  // Filter States
  const [kataKunci, setKataKunci] = useState("");
  const [daftarPenjab, setDaftarPenjab] = useState<PenjaminOption[]>([]);

  // Form Input Data Pasien (sesuai DlgPasien.java)
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [jk, setJk] = useState("L");
  const [tmpLahir, setTmpLahir] = useState("");
  const [tglLahir, setTglLahir] = useState(registrationDate());
  const [golDarah, setGolDarah] = useState("-");
  const [agama, setAgama] = useState("ISLAM");
  const [sttsNikah, setSttsNikah] = useState("BELUM MENIKAH");
  const [pekerjaan, setPekerjaan] = useState("-");
  const [pendidikan, setPendidikan] = useState("-");
  const [noTlp, setNoTlp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nmIbu, setNmIbu] = useState("-");

  // Penanggung Jawab Pasien
  const [keluargaPj, setKeluargaPj] = useState("DIRI SENDIRI");
  const [namaPj, setNamaPj] = useState("");
  const [pekerjaanPj, setPekerjaanPj] = useState("-");
  const [alamatPj, setAlamatPj] = useState("");
  const [kdPj, setKdPj] = useState("UMU");
  const [noPeserta, setNoPeserta] = useState("-");

  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  // Ambil opsi penjab/asuransi
  useEffect(() => {
    if (!isAuthenticated) return;
    async function muatPenjab() {
      try {
        const res = await fetch("/api/pasien/options?jenis=kd_pj");
        const json = await res.json();
        if (json.success && json.data) {
          const options = json.data.map((item: {id: string; label: string}) => ({kd_pj:item.id,png_jawab:item.label}));
          setDaftarPenjab(options);
          if(options.length) setKdPj(options[0].kd_pj);
        }
      } catch (e) {
        console.error(e);
      }
    }
    muatPenjab();
  }, [isAuthenticated]);

  // Fetch Data Pasien
  const muatData = useCallback(async () => {
    if (!isAuthenticated) return;
    setMemuat(true);
    try {
      const url = new URL("/api/pasien", window.location.origin);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        tampilkanToast(json.error || "Gagal memuat data pasien", "error");
      }
    } catch (error: unknown) {
      tampilkanToast(pesanError(error, "Terjadi kesalahan jaringan"), "error");
    } finally {
      setMemuat(false);
    }
  }, [isAuthenticated, kataKunci, tampilkanToast]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  // Reset / Form Baru (emptTeks di DlgPasien.java - mereset text & combobox)
  const resetForm = useCallback(() => {
    setDetail(emptyPatientDetails(registrationDate()));
    setAnggota({tni:false,polri:false});
    setNamaWilayah({});
    setTerpilih(null);
    setNoRm("");
    setNmPasien("");
    setNoKtp("");
    setTmpLahir("");
    setTglLahir(registrationDate());
    setNoTlp("");
    setAlamat("");
    setNmIbu("-");
    setNamaPj("");
    setPekerjaanPj("-");
    setAlamatPj("");
    setNoPeserta("-");

    // Reset seluruh combobox / dropdown ke opsi default awal
    setJk("L");
    setGolDarah("-");
    setAgama("ISLAM");
    setSttsNikah("BELUM MENIKAH");
    setPekerjaan("-");
    setPendidikan("-");
    setKeluargaPj("DIRI SENDIRI");
    if (daftarPenjab.length > 0) {
      setKdPj(daftarPenjab[0].kd_pj);
    } else {
      setKdPj("UMU");
    }
  }, [daftarPenjab]);

  // Handle Pilih Baris (getData() di DlgPasien.java)
  const handlePilihData = (p: PasienData) => {
    const values = Object.fromEntries(additionalPatientFields.map((field) => [field.key, String(p[field.key] ?? '')]));
    for(const group of ['tni','polri']) for(const kind of ['golongan','pangkat','satuan','jabatan']) values[`${kind}_${group}`]=String(p[`${kind}_${group}`] ?? '');
    setDetail(values);
    setAnggota({tni:!!Number(p.anggota_tni),polri:!!Number(p.anggota_polri)});
    setNamaWilayah({kd_kel:String(p.nm_kel||'-'),kd_kec:String(p.nm_kec||'-'),kd_kab:String(p.nm_kab||'-'),kd_prop:String(p.nm_prop||'-')});
    setTerpilih(p);
    setNoRm(p.no_rkm_medis || "");
    setNmPasien(p.nm_pasien || "");
    setNoKtp(p.no_ktp || "");
    setJk(p.jk || "L");
    setTmpLahir(p.tmp_lahir || "");
    setTglLahir(p.tgl_lahir || "");
    setGolDarah(p.gol_darah || "-");
    setAgama(p.agama || "ISLAM");
    setSttsNikah(p.stts_nikah || "BELUM MENIKAH");
    setPekerjaan(p.pekerjaan || "-");
    setPendidikan(p.pnd || "-");
    setNoTlp(p.no_tlp || "");
    setAlamat(p.alamat || "");
    setNmIbu(p.nm_ibu || "-");
    setKeluargaPj(p.keluarga || "DIRI SENDIRI");
    setNamaPj(p.namakeluarga || "");
    setPekerjaanPj(p.pekerjaanpj || "-");
    setAlamatPj(p.alamatpj || "");
    setKdPj(p.kd_pj || "UMU");
    setNoPeserta(p.no_peserta || "-");
  };

  const buatPayloadPasien = () => ({
    ...detail,
    anggota_tni: anggota.tni,
    anggota_polri: anggota.polri,
    no_rkm_medis: noRm,
    nm_pasien: nmPasien,
    no_ktp: noKtp,
    jk,
    tmp_lahir: tmpLahir,
    tgl_lahir: tglLahir,
    nm_ibu: nmIbu,
    alamat,
    gol_darah: golDarah,
    pekerjaan,
    stts_nikah: sttsNikah,
    agama,
    no_tlp: noTlp,
    pnd: pendidikan,
    keluarga: keluargaPj,
    namakeluarga: namaPj,
    kd_pj: kdPj,
    no_peserta: noPeserta,
    pekerjaanpj: pekerjaanPj,
    alamatpj: alamatPj,
  });

  // Simpan Pasien Baru (BtnSimpan di DlgPasien.java)
  const handleSimpan = async () => {
    if (!noRm.trim() || !nmPasien.trim()) {
      tampilkanToast("No. Rekam Medis dan Nama Pasien wajib diisi!", "error");
      return;
    }

    setSedangMenyimpan(true);

    try {
      const res = await fetch("/api/pasien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buatPayloadPasien()),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(`Data pasien ${nmPasien} (${noRm}) berhasil disimpan!`, "sukses");
        void muatData();
        if (!terpilih) resetForm();
      } else {
        tampilkanToast(json.error || "Gagal menyimpan data pasien", "error");
      }
    } catch (error: unknown) {
      tampilkanToast(pesanError(error, "Gagal menghubungi server"), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Ganti / Edit Data Pasien (BtnEdit di DlgPasien.java)
  const handleGanti = async () => {
    if (!terpilih) {
      tampilkanToast("Pilih data pasien pada tabel yang ingin diubah terlebih dahulu!", "error");
      return;
    }
    if (!noRm.trim() || !nmPasien.trim()) {
      tampilkanToast("No. Rekam Medis dan Nama Pasien wajib diisi!", "error");
      return;
    }

    setSedangMenyimpan(true);

    try {
      const res = await fetch("/api/pasien", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buatPayloadPasien()),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(`Data pasien ${nmPasien} (${noRm}) berhasil diperbarui!`, "sukses");
        void muatData();
        resetForm();
        setTabAktif("data");
      } else {
        tampilkanToast(json.error || "Gagal memperbarui data pasien", "error");
      }
    } catch (error: unknown) {
      tampilkanToast(pesanError(error, "Gagal menghubungi server"), "error");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Buka Dialog Konfirmasi Hapus Data Pasien
  const handleBukaDialogHapus = () => {
    if (!terpilih) {
      tampilkanToast("Pilih data pasien pada tabel yang ingin dihapus terlebih dahulu!", "error");
      return;
    }
    setDialogHapusBuka(true);
  };

  // Eksekusi Hapus Data Pasien (BtnHapus di DlgPasien.java)
  const handleKonfirmasiHapus = async () => {
    if (!terpilih) return;
    setSedangMenghapus(true);

    try {
      const res = await fetch(`/api/pasien?no_rkm_medis=${encodeURIComponent(terpilih.no_rkm_medis)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        tampilkanToast(
          `Data pasien ${terpilih.nm_pasien} (${terpilih.no_rkm_medis}) berhasil dihapus.`,
          "sukses"
        );
        resetForm();
        void muatData();
        setDialogHapusBuka(false);
      } else {
        tampilkanToast(json.error || "Gagal menghapus data pasien", "error");
      }
    } catch (error: unknown) {
      tampilkanToast(pesanError(error, "Gagal menghapus pasien"), "error");
    } finally {
      setSedangMenghapus(false);
    }
  };

  // Cetak Data Pasien
  const handleCetak = () => {
    if (data.length === 0) {
      tampilkanToast("Tidak ada data pasien untuk dicetak!", "info");
      return;
    }
    window.print();
  };

  const inputClass = "h-7 w-full min-w-0 border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 focus:outline-none focus:border-emerald-600 read-only:bg-slate-50";
  const input = (label: string, value: string, change: (value: string) => void, type = 'text', readOnly = false) => (
    <input aria-label={label} type={type} value={value} readOnly={readOnly} onChange={(event)=>change(event.target.value)} className={`${inputClass} ${type === 'date' ? 'rounded-md' : 'rounded-full'}`} />
  );
  const select = (label: string, value: string, change: (value: string) => void, choices: readonly (string | readonly [string,string])[]) => (
    <CustomSelect aria-label={label} value={value} onChange={(event)=>change(event.target.value)} className="h-7 py-0.5 rounded-md font-normal">
      {value && !choices.some((item)=>(typeof item === 'string' ? item : item[0])===value) && <option value={value}>{value}</option>}
      {choices.map((item)=>{const [id,name]=typeof item === 'string' ? [item,item] : item;return <option key={id} value={id}>{name}</option>;})}
    </CustomSelect>
  );
  const detailInput = (key: string, label: string, type = 'text') => input(label,detail[key] || '',(value)=>setDetail((old)=>({...old,[key]:value})),type);
  const master = (key: string, label: string) => {
    const field=additionalPatientFields.find((item)=>item.key===key);
    const source=field && 'source' in field ? field.source : key;
    const byName=!!field && 'source' in field;
    return <PatientMasterSelect jenis={source} label={label} value={detail[key] || ''} valueAsLabel={byName} onChange={(id,name)=>{
      setDetail((old)=>({...old,[key]:byName ? name : id}));
      setNamaWilayah((old)=>({...old,[key]:name}));
    }} />;
  };
  const salinAlamat = () => {
    setAlamatPj(alamat);
    setDetail((old)=>({...old,kelurahanpj:namaWilayah.kd_kel||'-',kecamatanpj:namaWilayah.kd_kec||'-',kabupatenpj:namaWilayah.kd_kab||'-',propinsipj:namaWilayah.kd_prop||'-'}));
  };
  const umurParts = fullPatientAge(tglLahir,registrationDate()).match(/^(\d+) Th (\d+) Bl (\d+) Hr$/)?.slice(1) || ['','',''];

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-y-auto bg-slate-50 p-2 sm:p-3 lg:overflow-hidden">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Data Pasien & Rekam Medis"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      <div role="tablist" aria-label="Pengelolaan pasien" className="flex shrink-0 border-b border-slate-200">
        {(["input", "data"] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-pasien-${tab}`}
            type="button"
            role="tab"
            aria-selected={tabAktif === tab}
            aria-controls={`panel-pasien-${tab}`}
            tabIndex={tabAktif === tab ? 0 : -1}
            onClick={() => setTabAktif(tab)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === "Home" ? "input" : event.key === "End" ? "data" : tab === "input" ? "data" : "input";
              setTabAktif(next);
              document.getElementById(`tab-pasien-${next}`)?.focus();
            }}
            className={`px-4 py-2 text-xs font-semibold border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 ${tabAktif === tab ? "bg-white border-emerald-700 text-slate-900" : "border-transparent text-slate-500 hover:bg-slate-100"}`}
          >
            {tab === "input" ? "Input Pasien" : "Data Pasien"}
          </button>
        ))}
      </div>

      <section
        id="panel-pasien-input"
        role="tabpanel"
        aria-labelledby="tab-pasien-input"
        tabIndex={0}
        className={tabAktif === "input" ? "flex-1 min-h-0 overflow-auto bg-white rounded-lg border border-slate-200 p-3" : "hidden"}
      >
        <fieldset disabled={sedangMenyimpan || sedangMenghapus} className="font-sans text-xs font-normal text-slate-700">
          <GridFormulirModul>
            <div className="space-y-1.5">
              <PatientField label="No. Rekam Medis"><div className="w-full max-w-60">{input('No. Rekam Medis',noRm,setNoRm,'text',!!terpilih)}</div></PatientField>
              <PatientField label="Nama Pasien">{input('Nama Pasien',nmPasien,setNmPasien)}</PatientField>
              <PatientField label="J.K.">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(4rem,0.6fr)] items-center gap-2 w-full">
                  {select('Jenis kelamin',jk,setJk,[['L','LAKI-LAKI'],['P','PEREMPUAN']])}
                  <span className="whitespace-nowrap text-slate-600">Gol. Darah :</span>
                  {select('Golongan darah',golDarah,setGolDarah,['-','A','B','AB','O'])}
                </div>
              </PatientField>
              <PatientField label="Tmp/Tgl. Lahir">
                <div className="grid grid-cols-[minmax(0,1fr)_8.5rem] gap-2 w-full">
                  {input('Tempat lahir',tmpLahir,setTmpLahir)}
                  {input('Tanggal lahir',tglLahir,setTglLahir,'date')}
                </div>
              </PatientField>
              <PatientField label="Umur">
                <div className="flex flex-wrap xl:flex-nowrap gap-1.5 items-center w-full">
                  {['Th','Bl','Hr'].map((unit,index)=><div key={unit} className="flex items-center gap-1"><input aria-label={`Umur ${unit}`} readOnly value={umurParts[index]} className="h-7 w-9 rounded-full border border-slate-300 bg-slate-50 text-center text-slate-700" /><span>{unit}</span></div>)}
                  <span className="sm:ml-auto text-slate-600">Pendidikan :</span>
                  <div className="w-20 shrink-0">{select('Pendidikan',pendidikan,setPendidikan,['-','TS','TK','SD','SMP','SMA','SLTA/SEDERAJAT','D1','D2','D3','D4','S1','S2','S3'])}</div>
                </div>
              </PatientField>
              <PatientField label="Nama Ibu">{input('Nama ibu',nmIbu,setNmIbu)}</PatientField>
              <PatientField label="Png. Jawab">{select('Hubungan penanggung jawab',keluargaPj,setKeluargaPj,['DIRI SENDIRI','AYAH','IBU','ISTRI','SUAMI','SAUDARA','ANAK','LAIN-LAIN'])}</PatientField>
              <PatientField label="Nama P.J.">{input('Nama penanggung jawab',namaPj,setNamaPj)}</PatientField>
              <PatientField label="Pekerjaan P.J.">{input('Pekerjaan penanggung jawab',pekerjaanPj,setPekerjaanPj)}</PatientField>
              <PatientField label="Suku/Bangsa">{master('suku_bangsa','Suku/Bangsa')}</PatientField>
              <PatientField label="Bahasa Dipakai">{master('bahasa_pasien','Bahasa Dipakai')}</PatientField>
              <PatientField label="Cacat Fisik">{master('cacat_fisik','Cacat Fisik')}</PatientField>
            </div>
            <div className="space-y-1.5">
              <PatientField label="Agama">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 w-full">
                  {select('Agama',agama,setAgama,['ISLAM','KRISTEN','KATOLIK','HINDU','BUDHA','KONG HU CHU','-'])}
                  <span className="text-slate-600 whitespace-nowrap">Stts. Nikah :</span>
                  {select('Status nikah',sttsNikah,setSttsNikah,['BELUM MENIKAH','MENIKAH','JANDA','DUDHA','JOMBLO'])}
                </div>
              </PatientField>
              <PatientField label="Askes/Asuransi"><div className="w-16 shrink-0">{input('Kode asuransi',kdPj,()=>{},'text',true)}</div>{select('Askes/Asuransi',kdPj,setKdPj,daftarPenjab.map((item)=>[item.kd_pj,item.png_jawab] as const))}</PatientField>
              <PatientField label="No. Peserta">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 w-full">
                  {input('Nomor peserta',noPeserta,setNoPeserta)}<span className="text-slate-600">Email :</span>{detailInput('email','Email','email')}
                </div>
              </PatientField>
              <PatientField label="No. Telp">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_8.5rem] items-center gap-2 w-full">
                  {input('Nomor telepon',noTlp,setNoTlp,'tel')}<span className="text-slate-600 whitespace-nowrap">Pertama Daftar :</span>{detailInput('tgl_daftar','Pertama daftar','date')}
                </div>
              </PatientField>
              <PatientField label="Pekerjaan">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 w-full">
                  {input('Pekerjaan',pekerjaan,setPekerjaan)}<span className="text-slate-600 whitespace-nowrap">No. KTP/SIM :</span>{input('No. KTP/SIM',noKtp,setNoKtp)}
                </div>
              </PatientField>
              <PatientField label="Alamat Pasien">{input('Alamat pasien',alamat,setAlamat)}</PatientField>
              <PatientField><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">{master('kd_kel','Kelurahan')}{master('kd_kec','Kecamatan')}</div></PatientField>
              <PatientField><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">{master('kd_kab','Kabupaten')}{master('kd_prop','Provinsi')}</div></PatientField>
              <PatientField label="Alamat P.J.">
                {input('Alamat penanggung jawab',alamatPj,setAlamatPj)}
                <button type="button" onClick={salinAlamat} aria-label="Samakan alamat P.J. dengan pasien" title="Samakan alamat P.J. dengan pasien" className="h-7 w-7 shrink-0 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100"><FontAwesomeIcon icon={faCopy} className="h-3 w-3" /></button>
              </PatientField>
              <PatientField><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">{master('kelurahanpj','Kelurahan P.J.')}{master('kecamatanpj','Kecamatan P.J.')}</div></PatientField>
              <PatientField><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">{master('kabupatenpj','Kabupaten P.J.')}{master('propinsipj','Provinsi P.J.')}</div></PatientField>
              <PatientField label="Instansi Pasien">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.7fr)] gap-2 items-center w-full">
                  {master('perusahaan_pasien','Instansi Pasien')}<span className="text-slate-600 whitespace-nowrap">NIP/NRP :</span>{detailInput('nip','NIP/NRP')}
                </div>
              </PatientField>
            </div>
          </GridFormulirModul>
          <GridFormulirModul className="mt-5 border-t border-slate-100 pt-3">
            {(['tni','polri'] as const).map((group)=>(
              <div key={group}>
                <label className="inline-flex items-center gap-2 text-slate-600"><input type="checkbox" checked={anggota[group]} onChange={(event)=>setAnggota((old)=>({...old,[group]:event.target.checked}))} />Anggota {group.toUpperCase()}</label>
                {anggota[group] && <div className="mt-3 space-y-2">{['golongan','satuan','pangkat','jabatan'].map((kind)=><PatientField key={kind} label={kind === 'satuan' ? 'Kesatuan' : kind.charAt(0).toUpperCase()+kind.slice(1)}>{master(`${kind}_${group}`,`${kind} ${group.toUpperCase()}`)}</PatientField>)}</div>}
              </div>
            ))}
          </GridFormulirModul>
        </fieldset>
      </section>

      {/* 3. Tabel Data Pasien (tbPasien di DlgPasien.java) */}
      <section
        id="panel-pasien-data"
        role="tabpanel"
        aria-labelledby="tab-pasien-data"
        tabIndex={0}
        className={tabAktif === "data" ? "flex h-[32rem] flex-none flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs lg:h-auto lg:min-h-0 lg:flex-1" : "hidden"}
      >
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <caption className="sr-only">Daftar pasien. Pilih baris untuk memuat data pasien ke formulir.</caption>
            <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200 shadow-2xs">
              <tr>
                <th scope="col" className="py-2 px-2.5 text-center w-16">No. RM</th>
                <th scope="col" className="py-2 px-2.5">Nama Pasien</th>
                <th scope="col" className="py-2 px-2.5">No. KTP / NIK</th>
                <th scope="col" className="py-2 px-2.5 text-center w-10">JK</th>
                <th scope="col" className="py-2 px-2.5">Tmp / Tgl Lahir</th>
                <th scope="col" className="py-2 px-2.5">Nama Ibu</th>
                <th scope="col" className="py-2 px-2.5">Alamat Pasien</th>
                <th scope="col" className="py-2 px-2.5">Gol</th>
                <th scope="col" className="py-2 px-2.5">Agama</th>
                <th scope="col" className="py-2 px-2.5">No. Telp</th>
                <th scope="col" className="py-2 px-2.5">Penjamin / Asuransi</th>
                <th scope="col" className="py-2 px-2.5">No. Peserta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-500 font-sans">
                    Memuat data master pasien...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faHospitalUser} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data pasien yang sesuai</p>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.no_rkm_medis}
                    onClick={() => { if (!sedangMenyimpan && !sedangMenghapus) handlePilihData(item); }}
                    onDoubleClick={() => {
                      if (sedangMenyimpan || sedangMenghapus) return;
                      handlePilihData(item);
                      setTabAktif("input");
                    }}
                    className={`cursor-pointer ${
                      terpilih?.no_rkm_medis === item.no_rkm_medis
                        ? "bg-emerald-50/90 text-slate-700"
                        : "hover:bg-slate-50/80 text-slate-700"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-semibold text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.no_ktp || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          item.jk === "L"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-pink-50 text-pink-700"
                        }`}
                      >
                        {item.jk}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.tmp_lahir ? `${item.tmp_lahir}, ` : ""}{item.tgl_lahir}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.nm_ibu || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 truncate max-w-xs">
                      {item.alamat || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-slate-600">
                      {item.gol_darah || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.agama || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.no_tlp || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700 font-medium">
                      {item.png_jawab || item.kd_pj}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600 font-mono text-[10px]">
                      {item.no_peserta || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </section>

      {/* 4. Panel Bawah (panelGlass8 & 9 di DlgPasien.java) */}
      <PanelBawah
        tampilan="web"
        onSimpan={tabAktif === "input" ? handleSimpan : undefined}
        disabledSimpan={!!terpilih || sedangMenyimpan || sedangMenghapus}
        onBaru={() => { resetForm(); setTabAktif("input"); }}
        onHapus={handleBukaDialogHapus}
        onGanti={() => { if (tabAktif === "data") setTabAktif("input"); else void handleGanti(); }}
        onCetak={tabAktif === "data" ? handleCetak : undefined}
        onSemua={tabAktif === "data" ? () => {
          setKataKunci("");
          muatData();
        } : undefined}
        disabledHapus={!terpilih || sedangMenyimpan || sedangMenghapus}
        disabledGanti={!terpilih || sedangMenyimpan || sedangMenghapus}
        kataKunci={kataKunci}
        onGantiKataKunci={tabAktif === "data" ? setKataKunci : undefined}
        onCari={tabAktif === "data" ? muatData : undefined}
        placeholderCari="Cari No.RM, Nama Pasien, NIK, No.Peserta..."
        jumlahRecord={data.length}
        memuat={(tabAktif === "data" && memuat) || sedangMenyimpan || sedangMenghapus}
      />

      {/* Dialog Konfirmasi Hapus Data Pasien */}
      <KonfirmasiDialog
        terbuka={dialogHapusBuka}
        judul="Hapus Data Pasien"
        pesan={`Yakin ingin menghapus data pasien ${terpilih?.nm_pasien} (No. RM: ${terpilih?.no_rkm_medis})?`}
        subPesan="Data riwayat rekam medis dan data terkait lainnya mungkin terpengaruh."
        teksBatal="Batal"
        teksKonfirmasi="Ya, Hapus"
        onBatal={() => setDialogHapusBuka(false)}
        onKonfirmasi={handleKonfirmasiHapus}
        sedangMemproses={sedangMenghapus}
      />

      {/* Toast Notifikasi (Simpan, Edit, Hapus, Error, Info) */}
      <Toast
        key={toast?.key}
        message={toast?.pesan || null}
        tipe={toast?.tipe || "info"}
        onClose={() => setToast(null)}
      />
    </div>
  );
}


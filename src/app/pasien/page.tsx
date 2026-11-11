"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { Toast } from "@/components/common/Toast";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faCircleExclamation,
  faCheckCircle,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

export interface PasienData {
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

export default function HalamanDataPasien() {
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
  const [daftarPenjab, setDaftarPenjab] = useState<any[]>([]);

  // Form Input Data Pasien (sesuai DlgPasien.java)
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [jk, setJk] = useState("L");
  const [tmpLahir, setTmpLahir] = useState("");
  const [tglLahir, setTglLahir] = useState("2000-01-01");
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
    async function muatPenjab() {
      try {
        const res = await fetch("/api/registrasi/options?jenis=penjab");
        const json = await res.json();
        if (json.success && json.data) {
          setDaftarPenjab(json.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    muatPenjab();
  }, []);

  // Fetch Data Pasien
  const muatData = useCallback(async () => {
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
    } catch (err: any) {
      tampilkanToast(err.message || "Terjadi kesalahan jaringan", "error");
    } finally {
      setMemuat(false);
    }
  }, [kataKunci, tampilkanToast]);

  useEffect(() => {
    muatData();
  }, [muatData]);

  // Reset / Form Baru (emptTeks di DlgPasien.java - mereset text & combobox)
  const resetForm = useCallback(() => {
    setTerpilih(null);
    setNoRm("");
    setNmPasien("");
    setNoKtp("");
    setTmpLahir("");
    setTglLahir("2000-01-01");
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
    setTerpilih(p);
    setNoRm(p.no_rkm_medis || "");
    setNmPasien(p.nm_pasien || "");
    setNoKtp(p.no_ktp || "");
    setJk(p.jk || "L");
    setTmpLahir(p.tmp_lahir || "");
    setTglLahir(p.tgl_lahir || "2000-01-01");
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
        body: JSON.stringify({
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
        }),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(`Data pasien ${nmPasien} (${noRm}) berhasil disimpan!`, "sukses");
        muatData();
        if (!terpilih) resetForm();
      } else {
        tampilkanToast(json.error || "Gagal menyimpan data pasien", "error");
      }
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menghubungi server", "error");
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });

      const json = await res.json();
      if (json.success) {
        tampilkanToast(`Data pasien ${nmPasien} (${noRm}) berhasil diperbarui!`, "sukses");
        muatData();
      } else {
        tampilkanToast(json.error || "Gagal memperbarui data pasien", "error");
      }
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menghubungi server", "error");
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
        muatData();
        setDialogHapusBuka(false);
      } else {
        tampilkanToast(json.error || "Gagal menghapus data pasien", "error");
      }
    } catch (err: any) {
      tampilkanToast(err.message || "Gagal menghapus pasien", "error");
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Data Pasien & Rekam Medis"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* 2. Panel Input Data (FormInput DlgPasien: 3 Kolom) */}
      <PanelInputData
        judul=".: Input Data Pasien"
      >
        <div className="space-y-2 text-xs text-slate-700">
          {/* Baris 1: No. Rekam Medis | Agama & Stts. Nikah | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: No. RM */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">No. Rekam Medis :</label>
              <input
                type="text"
                value={noRm}
                onChange={(e) => setNoRm(e.target.value)}
                placeholder="000001"
                className="w-36 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Kolom 2: Agama & Stts Nikah */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Agama :</label>
              <div className="w-32">
                <CustomSelect
                  value={agama}
                  onChange={(e) => setAgama(e.target.value)}
                >
                  <option value="ISLAM">ISLAM</option>
                  <option value="KRISTEN">KRISTEN</option>
                  <option value="KATOLIK">KATOLIK</option>
                  <option value="HINDU">HINDU</option>
                  <option value="BUDHA">BUDHA</option>
                  <option value="KONGHUCU">KONGHUCU</option>
                </CustomSelect>
              </div>
              <label className="font-semibold text-slate-600 shrink-0 ml-1">Stts. Nikah :</label>
              <div className="flex-1 min-w-[110px]">
                <CustomSelect
                  value={sttsNikah}
                  onChange={(e) => setSttsNikah(e.target.value)}
                >
                  <option value="BELUM MENIKAH">BELUM MENIKAH</option>
                  <option value="MENIKAH">MENIKAH</option>
                  <option value="JANDA">JANDA</option>
                  <option value="DUDA">DUDA</option>
                </CustomSelect>
              </div>
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 2: Nama Pasien | Asuransi / Askes & No. Peserta | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Nama Pasien */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Nama Pasien :</label>
              <input
                type="text"
                value={nmPasien}
                onChange={(e) => setNmPasien(e.target.value)}
                placeholder="Nama lengkap pasien..."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            {/* Kolom 2: Askes / Penjab & No. Kartu */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Askes/Asuransi :</label>
              <div className="flex-1">
                <CustomSelect
                  value={kdPj}
                  onChange={(e) => setKdPj(e.target.value)}
                >
                  {daftarPenjab.map((pj) => (
                    <option key={pj.kd_pj} value={pj.kd_pj}>
                      {pj.png_jawab} ({pj.kd_pj})
                    </option>
                  ))}
                </CustomSelect>
              </div>
              <label className="font-semibold text-slate-600 shrink-0 ml-1">No. Ka :</label>
              <input
                type="text"
                value={noPeserta}
                onChange={(e) => setNoPeserta(e.target.value)}
                placeholder="No. Peserta..."
                className="w-28 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800 font-mono"
              />
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 3: J.K. & Gol. Darah | No. Telp & No. KTP | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: J.K. & Gol. Darah */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">J.K. :</label>
              <div className="w-32">
                <CustomSelect
                  value={jk}
                  onChange={(e) => setJk(e.target.value)}
                >
                  <option value="L">LAKI-LAKI</option>
                  <option value="P">PEREMPUAN</option>
                </CustomSelect>
              </div>
              <label className="font-semibold text-slate-600 shrink-0 ml-2">Gol. Darah :</label>
              <div className="w-20">
                <CustomSelect
                  value={golDarah}
                  onChange={(e) => setGolDarah(e.target.value)}
                >
                  <option value="-">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </CustomSelect>
              </div>
            </div>

            {/* Kolom 2: No. Telp & No. KTP */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">No. Telp :</label>
              <input
                type="text"
                value={noTlp}
                onChange={(e) => setNoTlp(e.target.value)}
                placeholder="08..."
                className="w-36 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600 font-mono"
              />
              <label className="font-semibold text-slate-600 shrink-0 ml-1">No. KTP :</label>
              <input
                type="text"
                value={noKtp}
                onChange={(e) => setNoKtp(e.target.value)}
                placeholder="NIK KTP..."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 4: Tmp/Tgl. Lahir | Pekerjaan & Pendidikan | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Tmp / Tgl Lahir */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Tmp/Tgl. Lahir :</label>
              <input
                type="text"
                value={tmpLahir}
                onChange={(e) => setTmpLahir(e.target.value)}
                placeholder="Tempat lahir..."
                className="flex-1 min-w-[100px] px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
              <input
                type="date"
                value={tglLahir}
                onChange={(e) => setTglLahir(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800 font-mono"
              />
            </div>

            {/* Kolom 2: Pekerjaan & Pendidikan */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Pekerjaan :</label>
              <input
                type="text"
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                placeholder="Pekerjaan..."
                className="flex-1 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
              <label className="font-semibold text-slate-600 shrink-0 ml-1">Pendidikan :</label>
              <div className="w-28">
                <CustomSelect
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e.target.value)}
                >
                  <option value="-">-</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </CustomSelect>
              </div>
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 5: Nama Ibu | Alamat Pasien | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: Nama Ibu */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Nama Ibu :</label>
              <input
                type="text"
                value={nmIbu}
                onChange={(e) => setNmIbu(e.target.value)}
                placeholder="Nama ibu kandung..."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
            </div>

            {/* Kolom 2: Alamat Pasien */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Alamat Pasien :</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat domisili lengkap pasien..."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Baris 6: P.J. Pasien & Hubungan | Alamat P.J. | Kolom 3 Kosong */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 items-center">
            {/* Kolom 1: P.J. Pasien */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Nama P.J. :</label>
              <input
                type="text"
                value={namaPj}
                onChange={(e) => setNamaPj(e.target.value)}
                placeholder="Nama penanggung jawab..."
                className="flex-1 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
              <label className="font-semibold text-slate-600 shrink-0 ml-1">Hubungan :</label>
              <div className="w-32">
                <CustomSelect
                  value={keluargaPj}
                  onChange={(e) => setKeluargaPj(e.target.value)}
                >
                  <option value="DIRI SENDIRI">Diri Sendiri</option>
                  <option value="KELUARGA">Keluarga</option>
                  <option value="AYAH">Ayah</option>
                  <option value="IBU">Ibu</option>
                  <option value="ISTRI">Istri</option>
                  <option value="SUAMI">Suami</option>
                  <option value="ANAK">Anak</option>
                  <option value="SAUDARA">Saudara</option>
                </CustomSelect>
              </div>
            </div>

            {/* Kolom 2: Alamat P.J. */}
            <div className="flex items-center gap-2">
              <label className="w-24 font-semibold text-slate-600 shrink-0">Alamat P.J. :</label>
              <input
                type="text"
                value={alamatPj}
                onChange={(e) => setAlamatPj(e.target.value)}
                placeholder="Alamat penanggung jawab..."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded text-slate-800"
              />
            </div>

            {/* Kolom 3: Kosong */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Pasien (tbPasien di DlgPasien.java) */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200 shadow-2xs">
              <tr>
                <th className="py-2 px-2.5 text-center w-16">No. RM</th>
                <th className="py-2 px-2.5">Nama Pasien</th>
                <th className="py-2 px-2.5">No. KTP / NIK</th>
                <th className="py-2 px-2.5 text-center w-10">JK</th>
                <th className="py-2 px-2.5">Tmp / Tgl Lahir</th>
                <th className="py-2 px-2.5">Nama Ibu</th>
                <th className="py-2 px-2.5">Alamat Pasien</th>
                <th className="py-2 px-2.5">Gol</th>
                <th className="py-2 px-2.5">Agama</th>
                <th className="py-2 px-2.5">No. Telp</th>
                <th className="py-2 px-2.5">Penjamin / Asuransi</th>
                <th className="py-2 px-2.5">No. Peserta</th>
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
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer ${
                      terpilih?.no_rkm_medis === item.no_rkm_medis
                        ? "bg-emerald-50/90 font-semibold text-emerald-950"
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

        {/* 4. Panel Bawah (panelGlass8 & 9 di DlgPasien.java) */}
        <PanelBawah
          onSimpan={handleSimpan}
          onBaru={resetForm}
          onHapus={handleBukaDialogHapus}
          onGanti={handleGanti}
          onCetak={handleCetak}
          onSemua={() => {
            setKataKunci("");
            muatData();
          }}
          disabledHapus={!terpilih}
          disabledGanti={!terpilih}
          kataKunci={kataKunci}
          onGantiKataKunci={setKataKunci}
          onCari={muatData}
          placeholderCari="Cari No.RM, Nama Pasien, NIK, No.Peserta..."
          jumlahRecord={data.length}
          memuat={memuat}
        />
      </div>

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


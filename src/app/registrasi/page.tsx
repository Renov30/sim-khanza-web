"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface PasienReg {
  no_reg: string;
  no_rawat: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  kd_poli: string;
  nm_poli: string;
  kd_pj?: string;
  png_jawab?: string;
  p_jawab: string;
  almt_pj: string;
  hubunganpj: string;
  biaya_reg: number;
  stts: string;
  status_bayar: string;
}

export default function HalamanRegistrasi() {
  const [data, setData] = useState<PasienReg[]>([]);
  const [terpilih, setTerpilih] = useState<PasienReg | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  // Filter States
  const hariIni = new Date().toISOString().slice(0, 10);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [statusBayar, setStatusBayar] = useState("Semua");

  // Form Input Data States (sesuai DlgReg.java)
  const [noRawat, setNoRawat] = useState("");
  const [noReg, setNoReg] = useState("");
  const [tglReg, setTglReg] = useState(hariIni);
  const [jamReg, setJamReg] = useState(new Date().toTimeString().slice(0, 8));
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdDokter, setKdDokter] = useState("");
  const [nmDokter, setNmDokter] = useState("");
  const [kdPoli, setKdPoli] = useState("");
  const [nmPoli, setNmPoli] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState("");
  const [almtPj, setAlmtPj] = useState("");
  const [hubunganPj, setHubunganPj] = useState("Keluarga");
  const [biayaReg, setBiayaReg] = useState("0");
  const [statusPoli, setStatusPoli] = useState("Belum");
  const [sttsBayar, setSttsBayar] = useState("Belum Bayar");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    const tgl = sekarang.toISOString().slice(0, 10);
    const jam = sekarang.toTimeString().slice(0, 8);
    const randomRw = `${tgl.replace(/-/g, "/")}/${String(Math.floor(Math.random() * 900000) + 100000)}`;

    setTerpilih(null);
    setNoRawat(randomRw);
    setNoReg(String(Math.floor(Math.random() * 900) + 1).padStart(3, "0"));
    setTglReg(tgl);
    setJamReg(jam);
    setNoRm("");
    setNmPasien("");
    setKdDokter("D0000001");
    setNmDokter("dr. Umum / Spesialis");
    setKdPoli("U0001");
    setNmPoli("Poli Umum");
    setPenanggungJawab("-");
    setAlmtPj("-");
    setHubunganPj("Keluarga");
    setBiayaReg("0");
    setStatusPoli("Belum");
    setSttsBayar("Belum Bayar");
  }, []);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/registrasi", window.location.origin);
      if (tanggalMulai && tanggalSelesai) {
        url.searchParams.set("tanggal_mulai", tanggalMulai);
        url.searchParams.set("tanggal_selesai", tanggalSelesai);
      }
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setPesanError(json.error || "Gagal memuat data registrasi");
      }
    } catch (err: any) {
      setPesanError(err.message || "Terjadi kesalahan jaringan");
    } finally {
      setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai, kataKunci]);

  useEffect(() => {
    muatData();
    resetForm();
  }, [muatData, resetForm]);

  // Handle pilih baris tabel (mengisi form seperti getData() di DlgReg.java)
  const handlePilihData = (item: PasienReg) => {
    setTerpilih(item);
    setNoRawat(item.no_rawat);
    setNoReg(item.no_reg);
    setTglReg(item.tgl_registrasi);
    setJamReg(item.jam_reg);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdDokter(item.kd_dokter);
    setNmDokter(item.nm_dokter);
    setKdPoli(item.kd_poli);
    setNmPoli(item.nm_poli);
    setPenanggungJawab(item.p_jawab || "-");
    setAlmtPj(item.almt_pj || "-");
    setHubunganPj(item.hubunganpj || "-");
    setBiayaReg(String(item.biaya_reg || 0));
    setStatusPoli(item.stts || "Belum");
    setSttsBayar(item.status_bayar || "Belum Bayar");
  };

  // Action Simpan
  const handleSimpan = async () => {
    if (!noRawat || !noRm) {
      setPesanError("No. Rawat dan No. Rekam Medis harus terisi!");
      return;
    }
    setSedangMenyimpan(true);
    setPesanError(null);
    setPesanSukses(null);
    try {
      const res = await fetch("/api/registrasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          no_reg: noReg,
          tgl_registrasi: tglReg,
          jam_reg: jamReg,
          kd_dokter: kdDokter,
          no_rkm_medis: noRm,
          kd_poli: kdPoli,
          p_jawab: penanggungJawab,
          almt_pj: almtPj,
          hubunganpj: hubunganPj,
          biaya_reg: Number(biayaReg) || 0,
          stts: statusPoli,
          status_bayar: sttsBayar,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Data registrasi berhasil disimpan!");
        muatData();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menyimpan data registrasi");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menyimpan data");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Action Hapus
  const handleHapus = async () => {
    if (!terpilih) {
      setPesanError("Pilih baris data registrasi yang ingin dihapus terlebih dahulu");
      return;
    }
    if (!confirm(`Yakin ingin menghapus registrasi No. Rawat ${terpilih.no_rawat}?`)) return;

    try {
      const res = await fetch(`/api/registrasi?no_rawat=${encodeURIComponent(terpilih.no_rawat)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Data berhasil dihapus");
        muatData();
        resetForm();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menghapus data");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menghapus data");
    }
  };

  // Action Cetak
  const handleCetak = () => {
    window.print();
  };

  const dataTersaring = data.filter((item) => {
    if (statusBayar === "Semua") return true;
    return item.status_bayar === statusBayar;
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2.5 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Registrasi & Pendaftaran Pasien"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* Pesan Alert */}
      {pesanError && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
          <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0" />
          <span>{pesanError}</span>
        </div>
      )}
      {pesanSukses && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-700">
          <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 shrink-0" />
          <span>{pesanSukses}</span>
        </div>
      )}

      {/* 2. Panel Input Data (ChkInput & FormInput seperti DlgReg.java) */}
      <PanelInputData
        judul=".: Input Data Registrasi Pasien"
        terbukaAwal={true}
        onSimpan={handleSimpan}
        onBaru={resetForm}
        teksSimpan={terpilih ? "Ganti / Perbarui" : "Simpan Registrasi"}
        sedangMenyimpan={sedangMenyimpan}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
          {/* Kolom 1: No Reg & No Rawat */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. Registrasi</label>
            <input
              type="text"
              value={noReg}
              onChange={(e) => setNoReg(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono focus:ring-1 focus:ring-emerald-500"
              placeholder="001"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. Rawat *</label>
            <input
              type="text"
              value={noRawat}
              onChange={(e) => setNoRawat(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono font-bold focus:ring-1 focus:ring-emerald-500"
              placeholder="YYYY/MM/DD/000001"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tanggal & Jam</label>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={tglReg}
                onChange={(e) => setTglReg(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={jamReg}
                onChange={(e) => setJamReg(e.target.value)}
                className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. RM / Pasien *</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={noRm}
                onChange={(e) => setNoRm(e.target.value)}
                placeholder="No. RM"
                className="w-24 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono font-bold"
              />
              <input
                type="text"
                value={nmPasien}
                onChange={(e) => setNmPasien(e.target.value)}
                placeholder="Nama Pasien"
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Kolom 2: Dokter & Poliklinik */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dokter Dituju</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdDokter}
                onChange={(e) => setKdDokter(e.target.value)}
                placeholder="Kode"
                className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmDokter}
                onChange={(e) => setNmDokter(e.target.value)}
                placeholder="Nama Dokter"
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Unit / Poliklinik</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdPoli}
                onChange={(e) => setKdPoli(e.target.value)}
                placeholder="Kode"
                className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmPoli}
                onChange={(e) => setNmPoli(e.target.value)}
                placeholder="Nama Poliklinik"
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Kolom 3: Penanggung Jawab */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Penanggung Jawab (P.J.)</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={penanggungJawab}
                onChange={(e) => setPenanggungJawab(e.target.value)}
                placeholder="Nama P.J."
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <input
                type="text"
                value={hubunganPj}
                onChange={(e) => setHubunganPj(e.target.value)}
                placeholder="Hubungan"
                className="w-24 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Alamat P.J. / Status Bayar</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={almtPj}
                onChange={(e) => setAlmtPj(e.target.value)}
                placeholder="Alamat P.J."
                className="flex-1 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <div className="w-32">
                <CustomSelect
                  value={sttsBayar}
                  onChange={(e) => setSttsBayar(e.target.value)}
                >
                  <option value="Belum Bayar">Belum Bayar</option>
                  <option value="Sudah Bayar">Sudah Bayar</option>
                </CustomSelect>
              </div>
            </div>
          </div>
        </div>
      </PanelInputData>

      {/* 3. Konten Utama: Tabel Data Registrasi Pasien */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5 text-center w-12">No. Reg</th>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tanggal & Jam</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[160px]">Nama Pasien</th>
                <th className="py-2 px-2.5 text-center">JK</th>
                <th className="py-2 px-2.5">Umur</th>
                <th className="py-2 px-2.5">Poliklinik Tujuan</th>
                <th className="py-2 px-2.5 min-w-[150px]">Dokter Dituju</th>
                <th className="py-2 px-2.5">Penanggung Jawab</th>
                <th className="py-2 px-2.5 text-center">Status</th>
                <th className="py-2 px-2.5 text-center">Status Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data registrasi pasien...
                  </td>
                </tr>
              ) : dataTersaring.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faHospitalUser} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data registrasi yang sesuai</p>
                  </td>
                </tr>
              ) : (
                dataTersaring.map((item) => (
                  <tr
                    key={item.no_rawat}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer transition-colors ${
                      terpilih?.no_rawat === item.no_rawat
                        ? "bg-emerald-50/80 font-semibold text-emerald-950"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center font-bold text-slate-700">
                      {item.no_reg}
                    </td>
                    <td className="py-2 px-2.5 text-emerald-800 font-medium">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_registrasi} <span className="text-slate-400">{item.jam_reg}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
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
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.umurdaftar} {item.sttsumur}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_poli}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.p_jawab || "-"} ({item.hubunganpj || "-"})
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {item.stts}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status_bayar === "Sudah Bayar"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.status_bayar}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Panel Bawah (Action & Filter seperti di SIMRS Khanza Java) */}
        <PanelBawah
          onSimpan={handleSimpan}
          onBaru={resetForm}
          onHapus={handleHapus}
          onGanti={handleSimpan}
          onCetak={handleCetak}
          onSemua={() => {
            setKataKunci("");
            setTanggalMulai("");
            setTanggalSelesai("");
            setStatusBayar("Semua");
            muatData();
          }}
          disabledHapus={!terpilih}
          disabledGanti={!terpilih}
          tanggalMulai={tanggalMulai}
          tanggalSelesai={tanggalSelesai}
          onGantiTanggalMulai={setTanggalMulai}
          onGantiTanggalSelesai={setTanggalSelesai}
          kataKunci={kataKunci}
          onGantiKataKunci={setKataKunci}
          onCari={muatData}
          filterTambahan={
            <div className="w-36">
              <CustomSelect
                value={statusBayar}
                onChange={(e) => setStatusBayar(e.target.value)}
              >
                <option value="Semua">Semua Bayar</option>
                <option value="Sudah Bayar">Sudah Bayar</option>
                <option value="Belum Bayar">Belum Bayar</option>
              </CustomSelect>
            </div>
          }
          jumlahRecord={dataTersaring.length}
          memuat={memuat}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface TindakanRalan {
  no_rawat: string;
  tgl_perawatan: string;
  jam_rawat: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
  biaya_rawat: number;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  kd_dokter: string;
  nm_dokter: string;
  nm_poli: string;
  stts_bayar: string;
}

export default function HalamanRawatJalan() {
  const [data, setData] = useState<TindakanRalan[]>([]);
  const [terpilih, setTerpilih] = useState<TindakanRalan | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  // Filter States
  const hariIni = new Date().toISOString().slice(0, 10);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [statusBayar, setStatusBayar] = useState("Semua");

  // Form Input States (DlgRawatJalan.java)
  const [noRawat, setNoRawat] = useState("");
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdDokter, setKdDokter] = useState("D0000001");
  const [nmDokter, setNmDokter] = useState("dr. Spesialis / Umum");
  const [kdTindakan, setKdTindakan] = useState("");
  const [nmTindakan, setNmTindakan] = useState("");
  const [biayaTindakan, setBiayaTindakan] = useState("0");
  const [tglPerawatan, setTglPerawatan] = useState(hariIni);
  const [jamRawat, setJamRawat] = useState(new Date().toTimeString().slice(0, 8));
  const [sttsBayar, setSttsBayar] = useState("Belum Bayar");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    setTerpilih(null);
    setNoRawat("");
    setNoRm("");
    setNmPasien("");
    setKdDokter("D0000001");
    setNmDokter("dr. Spesialis / Umum");
    setKdTindakan("");
    setNmTindakan("");
    setBiayaTindakan("0");
    setTglPerawatan(sekarang.toISOString().slice(0, 10));
    setJamRawat(sekarang.toTimeString().slice(0, 8));
    setSttsBayar("Belum Bayar");
  }, []);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/rawat-jalan", window.location.origin);
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
        setPesanError(json.error || "Gagal memuat data tindakan rawat jalan");
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

  const handlePilihData = (item: TindakanRalan) => {
    setTerpilih(item);
    setNoRawat(item.no_rawat);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdDokter(item.kd_dokter);
    setNmDokter(item.nm_dokter);
    setKdTindakan(item.kd_jenis_prw);
    setNmTindakan(item.nm_perawatan || "-");
    setBiayaTindakan(String(item.biaya_rawat || 0));
    setTglPerawatan(item.tgl_perawatan);
    setJamRawat(item.jam_rawat);
    setSttsBayar(item.stts_bayar || "Belum Bayar");
  };

  const handleSimpan = async () => {
    if (!noRawat || !kdTindakan) {
      setPesanError("No. Rawat dan Kode Tindakan harus diisi!");
      return;
    }
    setSedangMenyimpan(true);
    setPesanError(null);
    setPesanSukses(null);
    try {
      const res = await fetch("/api/rawat-jalan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          kd_jenis_prw: kdTindakan,
          kd_dokter: kdDokter,
          tgl_perawatan: tglPerawatan,
          jam_rawat: jamRawat,
          biaya_rawat: Number(biayaTindakan) || 0,
          tarif_tindakandr: Number(biayaTindakan) || 0,
          stts_bayar: sttsBayar,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Tindakan Rawat Jalan berhasil disimpan!");
        muatData();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menyimpan tindakan");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menyimpan data");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleHapus = async () => {
    if (!terpilih) {
      setPesanError("Pilih baris tindakan yang ingin dihapus terlebih dahulu");
      return;
    }
    if (!confirm(`Hapus tindakan ${terpilih.nm_perawatan} untuk No. Rawat ${terpilih.no_rawat}?`)) return;

    try {
      const url = `/api/rawat-jalan?no_rawat=${encodeURIComponent(terpilih.no_rawat)}&kd_jenis_prw=${encodeURIComponent(terpilih.kd_jenis_prw)}&tgl_perawatan=${encodeURIComponent(terpilih.tgl_perawatan)}&jam_rawat=${encodeURIComponent(terpilih.jam_rawat)}`;
      const res = await fetch(url, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Tindakan berhasil dihapus");
        muatData();
        resetForm();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menghapus tindakan");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menghapus data");
    }
  };

  const dataTersaring = data.filter((item) => {
    if (statusBayar === "Semua") return true;
    return item.stts_bayar === statusBayar;
  });

  const totalBiaya = dataTersaring.reduce((acc, curr) => acc + (Number(curr.biaya_rawat) || 0), 0);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2.5 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Rawat Jalan & Tindakan Poliklinik"
        onMuatUlang={muatData}
        memuat={memuat}
      />

      {/* Alert */}
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

      {/* 2. Panel Input Data Tindakan Rawat Jalan */}
      <PanelInputData
        judul=".: Input Tindakan Medis Dokter Rawat Jalan"
        terbukaAwal={true}
        onSimpan={handleSimpan}
        onBaru={resetForm}
        teksSimpan={terpilih ? "Ganti / Perbarui" : "Simpan Tindakan"}
        sedangMenyimpan={sedangMenyimpan}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. Rawat *</label>
            <input
              type="text"
              value={noRawat}
              onChange={(e) => setNoRawat(e.target.value)}
              placeholder="No. Rawat Pasien"
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. RM / Pasien</label>
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

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dokter Pelaksana</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdDokter}
                onChange={(e) => setKdDokter(e.target.value)}
                className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmDokter}
                onChange={(e) => setNmDokter(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tgl & Jam Rawat</label>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={tglPerawatan}
                onChange={(e) => setTglPerawatan(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <input
                type="text"
                value={jamRawat}
                onChange={(e) => setJamRawat(e.target.value)}
                className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kode Tindakan *</label>
            <input
              type="text"
              value={kdTindakan}
              onChange={(e) => setKdTindakan(e.target.value)}
              placeholder="Contoh: T0001"
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nama Tindakan / Pemeriksaan</label>
            <input
              type="text"
              value={nmTindakan}
              onChange={(e) => setNmTindakan(e.target.value)}
              placeholder="Nama Tindakan Medis..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Biaya / Tarif Tindakan (Rp)</label>
            <input
              type="number"
              value={biayaTindakan}
              onChange={(e) => setBiayaTindakan(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Tindakan Ralan */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tanggal & Jam</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[160px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[200px]">Tindakan Medis / Perawatan</th>
                <th className="py-2 px-2.5 min-w-[150px]">Dokter Pelaksana</th>
                <th className="py-2 px-2.5">Poliklinik</th>
                <th className="py-2 px-2.5 text-right">Biaya Rawat</th>
                <th className="py-2 px-2.5 text-center">Status Bayar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data tindakan rawat jalan...
                  </td>
                </tr>
              ) : dataTersaring.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faStethoscope} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data tindakan rawat jalan pada periode ini</p>
                  </td>
                </tr>
              ) : (
                dataTersaring.map((item, idx) => (
                  <tr
                    key={`${item.no_rawat}-${item.kd_jenis_prw}-${idx}`}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer transition-colors ${
                      terpilih?.no_rawat === item.no_rawat && terpilih?.kd_jenis_prw === item.kd_jenis_prw
                        ? "bg-emerald-50/80 font-semibold text-emerald-950"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-emerald-800 font-medium">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_perawatan} <span className="text-slate-400">{item.jam_rawat}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-800 font-medium">
                      {item.nm_perawatan || item.kd_jenis_prw}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600">
                      {item.nm_poli}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-slate-800">
                      Rp {Number(item.biaya_rawat || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.stts_bayar === "Sudah Bayar"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.stts_bayar}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Panel Bawah */}
        <PanelBawah
          onSimpan={handleSimpan}
          onBaru={resetForm}
          onHapus={handleHapus}
          onGanti={handleSimpan}
          onCetak={() => window.print()}
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
          totalLabel="Total Tarif"
          nilaiTotal={`Rp ${totalBiaya.toLocaleString("id-ID")}`}
          jumlahRecord={dataTersaring.length}
          memuat={memuat}
        />
      </div>
    </div>
  );
}

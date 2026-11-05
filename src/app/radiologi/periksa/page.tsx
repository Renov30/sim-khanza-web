"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXRay,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface PeriksaRadiologi {
  no_rawat: string;
  tgl_periksa: string;
  jam: string;
  kd_jenis_prw: string;
  nm_perawatan: string;
  biaya: number;
  dokter_perujuk: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  kd_dokter: string;
  nm_dokter: string;
  proyeksi: string;
  kV: number;
  mAS: number;
  status: string;
}

export default function HalamanPeriksaRadiologi() {
  const [data, setData] = useState<PeriksaRadiologi[]>([]);
  const [terpilih, setTerpilih] = useState<PeriksaRadiologi | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  // Filter States
  const hariIni = new Date().toISOString().slice(0, 10);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [status, setStatus] = useState("Semua");

  // Form Input Data States (DlgPeriksaRadiologi.java)
  const [noRawat, setNoRawat] = useState("");
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdPemeriksaan, setKdPemeriksaan] = useState("");
  const [nmPemeriksaan, setNmPemeriksaan] = useState("");
  const [biaya, setBiaya] = useState("0");
  const [kdDokterPj, setKdDokterPj] = useState("D0000001");
  const [nmDokterPj, setNmDokterPj] = useState("dr. Radiolog, Sp.Rad");
  const [proyeksi, setProyeksi] = useState("AP / Lat");
  const [tglPeriksa, setTglPeriksa] = useState(hariIni);
  const [jamPeriksa, setJamPeriksa] = useState(new Date().toTimeString().slice(0, 8));
  const [statusPasien, setStatusPasien] = useState("ralan");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    setTerpilih(null);
    setNoRawat("");
    setNoRm("");
    setNmPasien("");
    setKdPemeriksaan("");
    setNmPemeriksaan("");
    setBiaya("0");
    setKdDokterPj("D0000001");
    setNmDokterPj("dr. Radiolog, Sp.Rad");
    setProyeksi("AP / Lat");
    setTglPeriksa(sekarang.toISOString().slice(0, 10));
    setJamPeriksa(sekarang.toTimeString().slice(0, 8));
    setStatusPasien("ralan");
  }, []);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/radiologi/periksa", window.location.origin);
      if (tanggalMulai && tanggalSelesai) {
        url.searchParams.set("tanggal_mulai", tanggalMulai);
        url.searchParams.set("tanggal_selesai", tanggalSelesai);
      }
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      if (status !== "Semua") url.searchParams.set("status", status);
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setPesanError(json.error || "Gagal memuat data periksa radiologi");
      }
    } catch (err: any) {
      setPesanError(err.message || "Terjadi kesalahan jaringan");
    } finally {
      setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai, kataKunci, status]);

  useEffect(() => {
    muatData();
    resetForm();
  }, [muatData, resetForm]);

  const handlePilihData = (item: PeriksaRadiologi) => {
    setTerpilih(item);
    setNoRawat(item.no_rawat);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdPemeriksaan(item.kd_jenis_prw);
    setNmPemeriksaan(item.nm_perawatan || "-");
    setBiaya(String(item.biaya || 0));
    setKdDokterPj(item.kd_dokter);
    setNmDokterPj(item.nm_dokter || "-");
    setProyeksi(item.proyeksi || "AP / Lat");
    setTglPeriksa(item.tgl_periksa);
    setJamPeriksa(item.jam);
    setStatusPasien(item.status || "ralan");
  };

  const handleSimpan = async () => {
    if (!noRawat || !kdPemeriksaan) {
      setPesanError("No. Rawat dan Kode Pemeriksaan Radiologi harus diisi!");
      return;
    }
    setSedangMenyimpan(true);
    setPesanError(null);
    setPesanSukses(null);
    try {
      const res = await fetch("/api/radiologi/periksa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          kd_jenis_prw: kdPemeriksaan,
          tgl_periksa: tglPeriksa,
          jam: jamPeriksa,
          kd_dokter: kdDokterPj,
          dokter_perujuk: kdDokterPj,
          biaya: Number(biaya) || 0,
          proyeksi,
          status: statusPasien,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Hasil Pemeriksaan Radiologi berhasil disimpan!");
        muatData();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menyimpan pemeriksaan");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menyimpan data");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleHapus = async () => {
    if (!terpilih) {
      setPesanError("Pilih baris pemeriksaan radiologi yang ingin dihapus");
      return;
    }
    if (!confirm(`Hapus pemeriksaan ${terpilih.nm_perawatan} untuk No. Rawat ${terpilih.no_rawat}?`)) return;

    try {
      const url = `/api/radiologi/periksa?no_rawat=${encodeURIComponent(terpilih.no_rawat)}&kd_jenis_prw=${encodeURIComponent(terpilih.kd_jenis_prw)}&tgl_periksa=${encodeURIComponent(terpilih.tgl_periksa)}&jam=${encodeURIComponent(terpilih.jam)}`;
      const res = await fetch(url, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Data pemeriksaan berhasil dihapus");
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

  const totalBiaya = data.reduce((acc, curr) => acc + (Number(curr.biaya) || 0), 0);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2.5 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Pemeriksaan & Hasil Radiologi"
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

      {/* 2. Panel Input Periksa Radiologi */}
      <PanelInputData
        judul=".: Input Data Hasil Pemeriksaan Radiologi"
        terbukaAwal={true}
        onSimpan={handleSimpan}
        onBaru={resetForm}
        teksSimpan={terpilih ? "Ganti / Perbarui" : "Simpan Hasil Radiologi"}
        sedangMenyimpan={sedangMenyimpan}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. Rawat *</label>
            <input
              type="text"
              value={noRawat}
              onChange={(e) => setNoRawat(e.target.value)}
              placeholder="No. Rawat"
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
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tgl & Jam Periksa</label>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={tglPeriksa}
                onChange={(e) => setTglPeriksa(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <input
                type="text"
                value={jamPeriksa}
                onChange={(e) => setJamPeriksa(e.target.value)}
                className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dokter Spesialis Radiologi</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdDokterPj}
                onChange={(e) => setKdDokterPj(e.target.value)}
                className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmDokterPj}
                onChange={(e) => setNmDokterPj(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kode Pemeriksaan *</label>
            <input
              type="text"
              value={kdPemeriksaan}
              onChange={(e) => setKdPemeriksaan(e.target.value)}
              placeholder="Contoh: RAD001"
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nama Pemeriksaan Rontgen/USG</label>
            <input
              type="text"
              value={nmPemeriksaan}
              onChange={(e) => setNmPemeriksaan(e.target.value)}
              placeholder="Thorax, USG Abdomen..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Proyeksi / Posisi</label>
            <input
              type="text"
              value={proyeksi}
              onChange={(e) => setProyeksi(e.target.value)}
              placeholder="AP / Lat, Oblique..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Biaya / Tarif Radiologi (Rp)</label>
            <input
              type="number"
              value={biaya}
              onChange={(e) => setBiaya(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Pemeriksaan Radiologi */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl & Jam Periksa</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[200px]">Pemeriksaan Radiologi</th>
                <th className="py-2 px-2.5">Proyeksi</th>
                <th className="py-2 px-2.5 min-w-[150px]">Dokter Radiolog</th>
                <th className="py-2 px-2.5 text-right">Biaya Periksa</th>
                <th className="py-2 px-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data periksa radiologi...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faXRay} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data periksa radiologi</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={`${item.no_rawat}-${item.kd_jenis_prw}-${idx}`}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer transition-colors ${
                      terpilih?.no_rawat === item.no_rawat && terpilih?.kd_jenis_prw === item.kd_jenis_prw
                        ? "bg-blue-50/80 font-semibold text-blue-950"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-blue-800 font-medium">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_periksa} <span className="text-slate-400">{item.jam}</span>
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
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.proyeksi || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter || item.kd_dokter}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-slate-800">
                      Rp {Number(item.biaya || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {item.status}
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
          onNota={() => alert("Mencetak Nota Radiologi...")}
          onSemua={() => {
            setKataKunci("");
            setTanggalMulai("");
            setTanggalSelesai("");
            setStatus("Semua");
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
              <CustomSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Semua">Semua Status</option>
                <option value="ralan">Ralan</option>
                <option value="ranap">Ranap</option>
              </CustomSelect>
            </div>
          }
          totalLabel="Total Biaya Rad"
          nilaiTotal={`Rp ${totalBiaya.toLocaleString("id-ID")}`}
          jumlahRecord={data.length}
          memuat={memuat}
        />
      </div>
    </div>
  );
}

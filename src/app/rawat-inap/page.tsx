"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeaderModul } from "@/components/modul/HeaderModul";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { PanelInputData } from "@/components/modul/PanelInputData";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface PasienRanap {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  alamat: string;
  p_jawab: string;
  hubunganpj: string;
  kd_kamar: string;
  nm_bangsal: string;
  trf_kamar: number;
  diagnosa_awal: string;
  diagnosa_akhir: string;
  tgl_masuk: string;
  jam_masuk: string;
  tgl_keluar: string;
  jam_keluar: string;
  ttl_biaya: number;
  stts_pulang: string;
  lama: number;
}

export default function HalamanRawatInap() {
  const [data, setData] = useState<PasienRanap[]>([]);
  const [terpilih, setTerpilih] = useState<PasienRanap | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  // Filter States
  const hariIni = new Date().toISOString().slice(0, 10);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [statusPulang, setStatusPulang] = useState("Semua");

  // Form Input States (DlgKamarInap.java)
  const [noRawat, setNoRawat] = useState("");
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdKamar, setKdKamar] = useState("");
  const [nmBangsal, setNmBangsal] = useState("");
  const [trfKamar, setTrfKamar] = useState("0");
  const [diagnosaAwal, setDiagnosaAwal] = useState("-");
  const [diagnosaAkhir, setDiagnosaAkhir] = useState("-");
  const [tglMasuk, setTglMasuk] = useState(hariIni);
  const [jamMasuk, setJamMasuk] = useState(new Date().toTimeString().slice(0, 8));
  const [tglKeluar, setTglKeluar] = useState("");
  const [jamKeluar, setJamKeluar] = useState("");
  const [sttsPulangForm, setSttsPulangForm] = useState("-");
  const [lamaInap, setLamaInap] = useState("1");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    setTerpilih(null);
    setNoRawat("");
    setNoRm("");
    setNmPasien("");
    setKdKamar("");
    setNmBangsal("");
    setTrfKamar("0");
    setDiagnosaAwal("-");
    setDiagnosaAkhir("-");
    setTglMasuk(sekarang.toISOString().slice(0, 10));
    setJamMasuk(sekarang.toTimeString().slice(0, 8));
    setTglKeluar("");
    setJamKeluar("");
    setSttsPulangForm("-");
    setLamaInap("1");
  }, []);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/rawat-inap", window.location.origin);
      if (tanggalMulai && tanggalSelesai) {
        url.searchParams.set("tanggal_mulai", tanggalMulai);
        url.searchParams.set("tanggal_selesai", tanggalSelesai);
      }
      if (statusPulang !== "Semua") url.searchParams.set("status_pulang", statusPulang);
      if (kataKunci.trim()) url.searchParams.set("cari", kataKunci.trim());
      url.searchParams.set("limit", "100");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setData(json.data || []);
      } else {
        setPesanError(json.error || "Gagal memuat data rawat inap");
      }
    } catch (err: any) {
      setPesanError(err.message || "Terjadi kesalahan jaringan");
    } finally {
      setMemuat(false);
    }
  }, [tanggalMulai, tanggalSelesai, statusPulang, kataKunci]);

  useEffect(() => {
    muatData();
    resetForm();
  }, [muatData, resetForm]);

  const handlePilihData = (item: PasienRanap) => {
    setTerpilih(item);
    setNoRawat(item.no_rawat);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdKamar(item.kd_kamar);
    setNmBangsal(item.nm_bangsal || "-");
    setTrfKamar(String(item.trf_kamar || 0));
    setDiagnosaAwal(item.diagnosa_awal || "-");
    setDiagnosaAkhir(item.diagnosa_akhir || "-");
    setTglMasuk(item.tgl_masuk);
    setJamMasuk(item.jam_masuk);
    setTglKeluar(item.tgl_keluar || "");
    setJamKeluar(item.jam_keluar || "");
    setSttsPulangForm(item.stts_pulang || "-");
    setLamaInap(String(item.lama || 1));
  };

  const handleSimpan = async () => {
    if (!noRawat || !kdKamar) {
      setPesanError("No. Rawat dan Kode Kamar harus diisi!");
      return;
    }
    setSedangMenyimpan(true);
    setPesanError(null);
    setPesanSukses(null);
    try {
      const res = await fetch("/api/rawat-inap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_rawat: noRawat,
          kd_kamar: kdKamar,
          trf_kamar: Number(trfKamar) || 0,
          diagnosa_awal: diagnosaAwal,
          diagnosa_akhir: diagnosaAkhir,
          tgl_masuk: tglMasuk,
          jam_masuk: jamMasuk,
          tgl_keluar: tglKeluar || "0000-00-00",
          jam_keluar: jamKeluar || "00:00:00",
          stts_pulang: sttsPulangForm,
          lama: Number(lamaInap) || 1,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Data Kamar Inap pasien berhasil disimpan!");
        muatData();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menyimpan data kamar inap");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menyimpan data");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleHapus = async () => {
    if (!terpilih) {
      setPesanError("Pilih baris kamar inap yang ingin dihapus");
      return;
    }
    if (!confirm(`Hapus data kamar inap No. Rawat ${terpilih.no_rawat} kamar ${terpilih.kd_kamar}?`)) return;

    try {
      const url = `/api/rawat-inap?no_rawat=${encodeURIComponent(terpilih.no_rawat)}&kd_kamar=${encodeURIComponent(terpilih.kd_kamar)}&tgl_masuk=${encodeURIComponent(terpilih.tgl_masuk)}&jam_masuk=${encodeURIComponent(terpilih.jam_masuk)}`;
      const res = await fetch(url, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Data kamar inap berhasil dihapus");
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-2.5 sm:p-3 space-y-2.5">
      {/* 1. Header Modul */}
      <HeaderModul
        judul="Rawat Inap & Administrasi Kamar"
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

      {/* 2. Panel Input Data Kamar Inap */}
      <PanelInputData
        judul=".: Input Data Kamar Inap Pasien"
        terbukaAwal={true}
        onSimpan={handleSimpan}
        onBaru={resetForm}
        teksSimpan={terpilih ? "Ganti / Perbarui" : "Simpan Kamar Inap"}
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
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kamar Inap & Bangsal *</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdKamar}
                onChange={(e) => setKdKamar(e.target.value)}
                placeholder="Kd Kamar"
                className="w-24 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmBangsal}
                onChange={(e) => setNmBangsal(e.target.value)}
                placeholder="Nama Bangsal"
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tarif Kamar (Rp / Hari)</label>
            <input
              type="number"
              value={trfKamar}
              onChange={(e) => setTrfKamar(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tgl & Jam Masuk</label>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={tglMasuk}
                onChange={(e) => setTglMasuk(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <input
                type="text"
                value={jamMasuk}
                onChange={(e) => setJamMasuk(e.target.value)}
                className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Diagnosa Awal</label>
            <input
              type="text"
              value={diagnosaAwal}
              onChange={(e) => setDiagnosaAwal(e.target.value)}
              placeholder="Diagnosa Masuk Inap..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Diagnosa Akhir</label>
            <input
              type="text"
              value={diagnosaAkhir}
              onChange={(e) => setDiagnosaAkhir(e.target.value)}
              placeholder="Diagnosa Akhir / Pulang..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status Pulang Pasien</label>
            <CustomSelect
              value={sttsPulangForm}
              onChange={(e) => setSttsPulangForm(e.target.value)}
            >
              <option value="-">Masih Dirawat (-)</option>
              <option value="Sembuh">Sembuh</option>
              <option value="Membaik">Membaik</option>
              <option value="Rujuk">Rujuk</option>
              <option value="APS">Atas Permintaan Sendiri (APS)</option>
              <option value="Meninggal">Meninggal</option>
            </CustomSelect>
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Pasien Ranap */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5">Kamar Inap</th>
                <th className="py-2 px-2.5">Bangsal</th>
                <th className="py-2 px-2.5">Tarif / Hari</th>
                <th className="py-2 px-2.5">Tgl Masuk</th>
                <th className="py-2 px-2.5">Tgl Keluar</th>
                <th className="py-2 px-2.5">Lama</th>
                <th className="py-2 px-2.5 min-w-[130px]">Diagnosa Awal</th>
                <th className="py-2 px-2.5 text-center">Status Pulang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data kamar rawat inap...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faBed} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data kamar rawat inap pada periode ini</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={`${item.no_rawat}-${item.kd_kamar}-${idx}`}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer transition-colors ${
                      terpilih?.no_rawat === item.no_rawat && terpilih?.kd_kamar === item.kd_kamar
                        ? "bg-emerald-50/80 font-semibold text-emerald-950"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-emerald-800 font-medium">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-bold text-indigo-700">
                      {item.kd_kamar}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_bangsal}
                    </td>
                    <td className="py-2 px-2.5 text-slate-700">
                      Rp {Number(item.trf_kamar || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_masuk} <span className="text-slate-400">{item.jam_masuk}</span>
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_keluar !== "0000-00-00" ? item.tgl_keluar : "-"}
                    </td>
                    <td className="py-2 px-2.5 text-center font-bold text-slate-700">
                      {item.lama} Hari
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.diagnosa_awal}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.stts_pulang === "-"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.stts_pulang === "-" ? "Masih Dirawat" : item.stts_pulang}
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
            setStatusPulang("Semua");
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
            <div className="w-40">
              <CustomSelect
                value={statusPulang}
                onChange={(e) => setStatusPulang(e.target.value)}
              >
                <option value="Semua">Semua Pulang</option>
                <option value="-">Masih Dirawat</option>
                <option value="Sembuh">Sembuh</option>
                <option value="Membaik">Membaik</option>
                <option value="Rujuk">Rujuk</option>
                <option value="APS">APS</option>
                <option value="Meninggal">Meninggal</option>
              </CustomSelect>
            </div>
          }
          jumlahRecord={data.length}
          memuat={memuat}
        />
      </div>
    </div>
  );
}

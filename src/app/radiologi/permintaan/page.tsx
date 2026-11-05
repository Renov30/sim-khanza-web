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

interface PermintaanRadiologi {
  noorder: string;
  no_rawat: string;
  tgl_permintaan: string;
  jam_permintaan: string;
  tgl_sampel: string;
  jam_sampel: string;
  tgl_hasil: string;
  jam_hasil: string;
  dokter_perujuk: string;
  nm_dokter_perujuk: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  status: string;
  informasi_tambahan: string;
  diagnosa_klinis: string;
}

export default function HalamanPermintaanRadiologi() {
  const [data, setData] = useState<PermintaanRadiologi[]>([]);
  const [terpilih, setTerpilih] = useState<PermintaanRadiologi | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);

  // Filter States
  const hariIni = new Date().toISOString().slice(0, 10);
  const [tanggalMulai, setTanggalMulai] = useState(hariIni);
  const [tanggalSelesai, setTanggalSelesai] = useState(hariIni);
  const [kataKunci, setKataKunci] = useState("");
  const [status, setStatus] = useState("Semua");

  // Form Input States (DlgPermintaanRadiologi.java)
  const [noOrder, setNoOrder] = useState("");
  const [noRawat, setNoRawat] = useState("");
  const [noRm, setNoRm] = useState("");
  const [nmPasien, setNmPasien] = useState("");
  const [kdDokterPerujuk, setKdDokterPerujuk] = useState("D0000001");
  const [nmDokterPerujuk, setNmDokterPerujuk] = useState("dr. Pengirim");
  const [tglPermintaan, setTglPermintaan] = useState(hariIni);
  const [jamPermintaan, setJamPermintaan] = useState(new Date().toTimeString().slice(0, 8));
  const [diagnosaKlinis, setDiagnosaKlinis] = useState("-");
  const [infoTambahan, setInfoTambahan] = useState("-");
  const [sttsOrder, setSttsOrder] = useState("ralan");
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const resetForm = useCallback(() => {
    const sekarang = new Date();
    const tgl = sekarang.toISOString().slice(0, 10);
    const jam = sekarang.toTimeString().slice(0, 8);
    const randomOrder = `RAD${tgl.replace(/-/g, "")}${String(Math.floor(Math.random() * 9000) + 1000)}`;

    setTerpilih(null);
    setNoOrder(randomOrder);
    setNoRawat("");
    setNoRm("");
    setNmPasien("");
    setKdDokterPerujuk("D0000001");
    setNmDokterPerujuk("dr. Pengirim");
    setTglPermintaan(tgl);
    setJamPermintaan(jam);
    setDiagnosaKlinis("-");
    setInfoTambahan("-");
    setSttsOrder("ralan");
  }, []);

  const muatData = useCallback(async () => {
    setMemuat(true);
    setPesanError(null);
    try {
      const url = new URL("/api/radiologi/permintaan", window.location.origin);
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
        setPesanError(json.error || "Gagal memuat data permintaan radiologi");
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

  const handlePilihData = (item: PermintaanRadiologi) => {
    setTerpilih(item);
    setNoOrder(item.noorder);
    setNoRawat(item.no_rawat);
    setNoRm(item.no_rkm_medis);
    setNmPasien(item.nm_pasien);
    setKdDokterPerujuk(item.dokter_perujuk);
    setNmDokterPerujuk(item.nm_dokter_perujuk || "-");
    setTglPermintaan(item.tgl_permintaan);
    setJamPermintaan(item.jam_permintaan);
    setDiagnosaKlinis(item.diagnosa_klinis || "-");
    setInfoTambahan(item.informasi_tambahan || "-");
    setSttsOrder(item.status || "ralan");
  };

  const handleSimpan = async () => {
    if (!noOrder || !noRawat) {
      setPesanError("No. Order dan No. Rawat harus diisi!");
      return;
    }
    setSedangMenyimpan(true);
    setPesanError(null);
    setPesanSukses(null);
    try {
      const res = await fetch("/api/radiologi/permintaan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noorder: noOrder,
          no_rawat: noRawat,
          tgl_permintaan: tglPermintaan,
          jam_permintaan: jamPermintaan,
          dokter_perujuk: kdDokterPerujuk,
          status: sttsOrder,
          informasi_tambahan: infoTambahan,
          diagnosa_klinis: diagnosaKlinis,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Permintaan Radiologi berhasil disimpan!");
        muatData();
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanError(json.error || "Gagal menyimpan permintaan");
      }
    } catch (err: any) {
      setPesanError(err.message || "Gagal menyimpan data");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  const handleHapus = async () => {
    if (!terpilih) {
      setPesanError("Pilih baris permintaan radiologi yang ingin dihapus");
      return;
    }
    if (!confirm(`Hapus permintaan radiologi No. Order ${terpilih.noorder}?`)) return;

    try {
      const res = await fetch(`/api/radiologi/permintaan?noorder=${encodeURIComponent(terpilih.noorder)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setPesanSukses("Permintaan radiologi berhasil dihapus");
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
        judul="Permintaan Pelayanan Radiologi"
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

      {/* 2. Panel Input Permintaan Radiologi */}
      <PanelInputData
        judul=".: Input Data Permintaan Radiologi"
        terbukaAwal={true}
        onSimpan={handleSimpan}
        onBaru={resetForm}
        teksSimpan={terpilih ? "Ganti / Perbarui" : "Simpan Permintaan"}
        sedangMenyimpan={sedangMenyimpan}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">No. Order Radiologi *</label>
            <input
              type="text"
              value={noOrder}
              onChange={(e) => setNoOrder(e.target.value)}
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono font-bold"
            />
          </div>

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
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tgl & Jam Permintaan</label>
            <div className="flex gap-1.5">
              <input
                type="date"
                value={tglPermintaan}
                onChange={(e) => setTglPermintaan(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
              <input
                type="text"
                value={jamPermintaan}
                onChange={(e) => setJamPermintaan(e.target.value)}
                className="w-24 px-1.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dokter Perujuk</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={kdDokterPerujuk}
                onChange={(e) => setKdDokterPerujuk(e.target.value)}
                className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
              />
              <input
                type="text"
                value={nmDokterPerujuk}
                onChange={(e) => setNmDokterPerujuk(e.target.value)}
                className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Diagnosa Klinis</label>
            <input
              type="text"
              value={diagnosaKlinis}
              onChange={(e) => setDiagnosaKlinis(e.target.value)}
              placeholder="Indikasi / Diagnosa Klinis..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Informasi Tambahan</label>
            <input
              type="text"
              value={infoTambahan}
              onChange={(e) => setInfoTambahan(e.target.value)}
              placeholder="Informasi Pemeriksaan..."
              className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status Pasien</label>
            <CustomSelect value={sttsOrder} onChange={(e) => setSttsOrder(e.target.value)}>
              <option value="ralan">Rawat Jalan (Ralan)</option>
              <option value="ranap">Rawat Inap (Ranap)</option>
            </CustomSelect>
          </div>
        </div>
      </PanelInputData>

      {/* 3. Tabel Data Permintaan Radiologi */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/90 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Order</th>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl & Jam Order</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[150px]">Dokter Perujuk</th>
                <th className="py-2 px-2.5">Diagnosa Klinis</th>
                <th className="py-2 px-2.5">Info Tambahan</th>
                <th className="py-2 px-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data permintaan radiologi...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faXRay} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data permintaan radiologi</p>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.noorder}
                    onClick={() => handlePilihData(item)}
                    className={`cursor-pointer transition-colors ${
                      terpilih?.noorder === item.noorder
                        ? "bg-blue-50/80 font-semibold text-blue-950"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-2 px-2.5 text-blue-800 font-medium">
                      {item.noorder}
                    </td>
                    <td className="py-2 px-2.5 text-slate-700">
                      {item.no_rawat}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600">
                      {item.tgl_permintaan} <span className="text-slate-400">{item.jam_permintaan}</span>
                    </td>
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.no_rkm_medis}
                    </td>
                    <td className="py-2 px-2.5 font-sans font-medium text-slate-800">
                      {item.nm_pasien}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.nm_dokter_perujuk || item.dokter_perujuk}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.diagnosa_klinis || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[10px]">
                      {item.informasi_tambahan || "-"}
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
          jumlahRecord={data.length}
          memuat={memuat}
        />
      </div>
    </div>
  );
}

"use client";

import { LembarPermintaanLabSederhana, type KolomPermintaanLab } from "@/components/modul/LembarPermintaanLabSederhana";

const teks = (nilai: string | number | null | undefined) =>
  nilai === null || nilai === undefined || nilai === "" ? "-" : String(nilai);

const KOLOM: KolomPermintaanLab[] = [
  { label: "No. Order", kunci: "noorder", kelas: "font-semibold text-slate-800" },
  { label: "No. Rawat", kunci: "no_rawat", kelas: "font-medium text-slate-800" },
  {
    label: "Tgl Permintaan",
    tampil: (baris) => (
      <>
        {teks(baris.tgl_permintaan)} <span className="text-slate-400">{teks(baris.jam_permintaan)}</span>
      </>
    ),
  },
  { label: "No. RM", kunci: "no_rkm_medis", kelas: "font-semibold text-slate-800" },
  { label: "Nama Pasien", kunci: "nm_pasien", kelas: "font-medium text-slate-800" },
  { label: "Dokter Perujuk", tampil: (baris) => teks(baris.nm_dokter_perujuk || baris.dokter_perujuk), kelas: "text-slate-700" },
  { label: "Lokasi Jaringan", kunci: "lokasi_jaringan", kelas: "text-slate-700" },
  { label: "Diawetkan Dengan", kunci: "diawetkan_dengan", kelas: "text-[10px] text-slate-600" },
  { label: "Diagnosa Klinis", kunci: "diagnosa_klinis", kelas: "text-[10px] text-slate-600" },
  {
    label: "Status",
    kelas: "text-center",
    tampil: (baris) => (
      <span className="inline-block rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
        {teks(baris.status || "ralan")}
      </span>
    ),
  },
];

export default function HalamanPermintaanLabPA() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50 p-3 sm:p-4 space-y-3">
      {/* 1. Filter & Pencarian Cepat */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Cari No. Order, No. Rawat, Pasien, Jaringan..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
            />
            {kataKunci && (
              <button
                onClick={() => setKataKunci("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="w-44">
            <CustomSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Semua">Semua Status Rawat</option>
              <option value="ralan">Rawat Jalan (Ralan)</option>
              <option value="ranap">Rawat Inap (Ranap)</option>
            </CustomSelect>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total: <span className="font-bold text-slate-800">{data.length}</span> permintaan
        </div>
      </div>

      {/* 2. Konten Utama: Tabel Data */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
        {pesanError && (
          <div className="m-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
            <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0" />
            <span>{pesanError}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200 text-slate-700 font-semibold select-none z-10">
              <tr>
                <th className="py-2 px-2.5">No. Order</th>
                <th className="py-2 px-2.5">No. Rawat</th>
                <th className="py-2 px-2.5">Tgl Permintaan</th>
                <th className="py-2 px-2.5">No. RM</th>
                <th className="py-2 px-2.5 min-w-[150px]">Nama Pasien</th>
                <th className="py-2 px-2.5 min-w-[140px]">Dokter Perujuk</th>
                <th className="py-2 px-2.5">Lokasi Jaringan</th>
                <th className="py-2 px-2.5">Diawetkan Dengan</th>
                <th className="py-2 px-2.5">Diagnosa Klinis</th>
                <th className="py-2 px-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {memuat ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-sans">
                    Memuat data permintaan lab PA...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-sans">
                    <FontAwesomeIcon icon={faFileMedical} className="w-8 h-8 text-slate-300 mb-2" />
                    <p>Tidak ada data permintaan lab PA yang sesuai</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80"
                  >
                    <td className="py-2 px-2.5 font-bold text-slate-800">
                      {item.noorder}
                    </td>
                    <td className="py-2 px-2.5 font-medium text-slate-800">
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
                      {item.nm_dokter_perujuk || item.dokter_perujuk || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-700">
                      {item.lokasi_jaringan || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[11px]">
                      {item.diawetkan_dengan || "-"}
                    </td>
                    <td className="py-2 px-2.5 font-sans text-slate-600 text-[11px]">
                      {item.diagnosa_klinis || "-"}
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-50 text-primary-700 border border-primary-200">
                        {item.status || "ralan"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <PanelBawah tampilan="web" tampilkanRecord={false} />
    </div>
  );
}

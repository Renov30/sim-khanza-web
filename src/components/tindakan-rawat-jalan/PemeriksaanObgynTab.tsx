"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast } from "@/components/common/Toast";
import { CustomSelect } from "@/components/ui/CustomSelect";
import type {
  AksiPanelPemeriksaan,
  StatusPanelPemeriksaan,
} from "@/components/tindakan-rawat-jalan/kontrak-panel-pemeriksaan";
import { registrationDate } from "@/lib/registrasi/date";

export type JenisPemeriksaanObgyn = "obstetri" | "ginekologi";

interface PasienPemeriksaanObgyn {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  nm_poli: string;
}

interface PemeriksaanObgynTabProps {
  jenis: JenisPemeriksaanObgyn;
  pasien: PasienPemeriksaanObgyn;
  onStatusPanelChange: (status: StatusPanelPemeriksaan) => void;
}

const KOLOM_OBSTETRI = [
  "tinggi_uteri", "janin", "letak", "panggul", "denyut", "kontraksi", "kualitas_mnt",
  "kualitas_dtk", "fluksus", "albus", "vulva", "portio", "dalam", "tebal", "arah",
  "pembukaan", "penurunan", "denominator", "ketuban", "feto",
] as const;
const KOLOM_GINEKOLOGI = [
  "inspeksi", "inspeksi_vulva", "inspekulo_gine", "fluxus_gine", "fluor_gine",
  "vulva_inspekulo", "portio_inspekulo", "sondage", "portio_dalam", "bentuk", "cavum_uteri",
  "mobilitas", "ukuran", "nyeri_tekan", "adnexa_kanan", "adnexa_kiri", "cavum_douglas",
] as const;
const SEMUA_KOLOM = [...KOLOM_OBSTETRI, ...KOLOM_GINEKOLOGI] as const;

type KolomPemeriksaan = typeof SEMUA_KOLOM[number];
type FormPemeriksaan = {
  tgl_perawatan: string;
  jam_rawat: string;
} & Record<KolomPemeriksaan, string>;
type RiwayatPemeriksaan = FormPemeriksaan & { no_rawat: string };

const LABEL_KOLOM: Record<KolomPemeriksaan, string> = {
  tinggi_uteri: "Tinggi Fundus", janin: "Janin", letak: "Letak", panggul: "Panggul",
  denyut: "Denyut", kontraksi: "Kontraksi", kualitas_mnt: "Kualitas/Menit",
  kualitas_dtk: "Kualitas/Detik", fluksus: "Fluksus", albus: "Fluor Albus",
  vulva: "Vulva/Vagina", portio: "Portio", dalam: "Dalam", tebal: "Tebal",
  arah: "Arah", pembukaan: "Pembukaan", penurunan: "Penurunan",
  denominator: "Denominator", ketuban: "Ketuban", feto: "Feto-Pelvik",
  inspeksi: "Inspeksi", inspeksi_vulva: "Inspeksi Vulva/Uretra/Vagina",
  inspekulo_gine: "Inspekulo", fluxus_gine: "Fluksus", fluor_gine: "Fluor Albus",
  vulva_inspekulo: "Inspekulo Vulva/Vagina", portio_inspekulo: "Inspekulo Portio",
  sondage: "Sondage", portio_dalam: "Dalam Portio", bentuk: "Dalam Bentuk",
  cavum_uteri: "Dalam Cavum Uteri", mobilitas: "Mobilitas", ukuran: "Ukuran Cavum Uteri",
  nyeri_tekan: "Nyeri Tekan", adnexa_kanan: "Adnexa Kanan", adnexa_kiri: "Adnexa Kiri",
  cavum_douglas: "Cavum Douglas",
};

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function formKosong(jenis: JenisPemeriksaanObgyn): FormPemeriksaan {
  const nilai = Object.fromEntries(SEMUA_KOLOM.map((kolom) => [kolom, ""])) as Record<KolomPemeriksaan, string>;
  return {
    tgl_perawatan: registrationDate(),
    jam_rawat: jamJayapura(),
    ...nilai,
    janin: "-",
    panggul: "-",
    kontraksi: "+",
    fluksus: "+",
    albus: "+",
    dalam: "Kenyal",
    arah: "depan",
    ketuban: "-",
    feto: "Normal",
    fluxus_gine: "+",
    fluor_gine: "+",
    mobilitas: "+",
    nyeri_tekan: "+",
    ...(jenis === "obstetri" ? {} : { janin: "" }),
  };
}

export const PemeriksaanObgynTab = forwardRef<AksiPanelPemeriksaan, PemeriksaanObgynTabProps>(
  function PemeriksaanObgynTab({ jenis, pasien, onStatusPanelChange }, ref) {
    const [form, setForm] = useState<FormPemeriksaan>(() => formKosong(jenis));
    const [data, setData] = useState<RiwayatPemeriksaan[]>([]);
    const [terpilih, setTerpilih] = useState<RiwayatPemeriksaan | null>(null);
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

    const kolomAktif = useMemo<readonly KolomPemeriksaan[]>(
      () => jenis === "obstetri" ? KOLOM_OBSTETRI : KOLOM_GINEKOLOGI,
      [jenis],
    );
    const namaJenis = jenis === "obstetri" ? "obstetri" : "ginekologi";

    useEffect(() => {
      if (terpilih || !waktuOtomatis) return;
      const perbaruiWaktu = () => setForm((lama) => ({
        ...lama,
        tgl_perawatan: registrationDate(),
        jam_rawat: jamJayapura(),
      }));
      perbaruiWaktu();
      const timer = setInterval(perbaruiWaktu, 1000);
      return () => clearInterval(timer);
    }, [terpilih, waktuOtomatis]);

    const muatData = useCallback(async (signal?: AbortSignal) => {
      setMemuat(true);
      try {
        const params = new URLSearchParams({ jenis, no_rawat: pasien.no_rawat });
        if (tanggalMulai) params.set("tanggal_mulai", tanggalMulai);
        if (tanggalSelesai) params.set("tanggal_selesai", tanggalSelesai);
        if (kataKunciFilter) params.set("cari", kataKunciFilter);
        const response = await fetch(`/api/tindakan-rawat-jalan/pemeriksaan-obgyn?${params}`, {
          signal,
          cache: "no-store",
        });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || `Gagal memuat pemeriksaan ${namaJenis}`);
        setData(json.data || []);
      } catch (error) {
        if (!signal?.aborted) {
          setToast({
            pesan: error instanceof Error ? error.message : `Gagal memuat pemeriksaan ${namaJenis}`,
            tipe: "error",
          });
        }
      } finally {
        if (!signal?.aborted) setMemuat(false);
      }
    }, [jenis, kataKunciFilter, namaJenis, pasien.no_rawat, tanggalMulai, tanggalSelesai]);

    useEffect(() => {
      const controller = new AbortController();
      const timer = setTimeout(() => { void muatData(controller.signal); }, 0);
      return () => {
        clearTimeout(timer);
        controller.abort();
      };
    }, [muatData, versiFilter]);

    const isi = (nama: KolomPemeriksaan | "tgl_perawatan" | "jam_rawat", nilai: string) => {
      setForm((lama) => ({ ...lama, [nama]: nilai }));
    };

    const baru = useCallback(() => {
      setTerpilih(null);
      setWaktuOtomatis(true);
      setForm(formKosong(jenis));
    }, [jenis]);

    const pilih = (item: RiwayatPemeriksaan) => {
      setTerpilih(item);
      setWaktuOtomatis(false);
      setForm({ ...formKosong(jenis), ...item });
    };

    const simpan = useCallback(async () => {
      setMenyimpan(true);
      try {
        const nilai = Object.fromEntries(kolomAktif.map((kolom) => [kolom, form[kolom]]));
        const response = await fetch("/api/tindakan-rawat-jalan/pemeriksaan-obgyn", {
          method: terpilih ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jenis,
            no_rawat: pasien.no_rawat,
            tgl_perawatan: form.tgl_perawatan,
            jam_rawat: form.jam_rawat,
            ...nilai,
            asli_tanggal: terpilih?.tgl_perawatan,
            asli_jam: terpilih?.jam_rawat,
          }),
        });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || `Pemeriksaan ${namaJenis} gagal disimpan`);
        setToast({ pesan: json.message, tipe: "sukses" });
        baru();
        await muatData();
      } catch (error) {
        setToast({
          pesan: error instanceof Error ? error.message : `Pemeriksaan ${namaJenis} gagal disimpan`,
          tipe: "error",
        });
      } finally {
        setMenyimpan(false);
      }
    }, [baru, form, jenis, kolomAktif, muatData, namaJenis, pasien.no_rawat, terpilih]);

    const hapus = async () => {
      if (!terpilih) return;
      setMenyimpan(true);
      try {
        const params = new URLSearchParams({
          jenis,
          no_rawat: terpilih.no_rawat,
          tanggal: terpilih.tgl_perawatan,
          jam: terpilih.jam_rawat,
        });
        const response = await fetch(`/api/tindakan-rawat-jalan/pemeriksaan-obgyn?${params}`, { method: "DELETE" });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || `Pemeriksaan ${namaJenis} gagal dihapus`);
        setToast({ pesan: json.message, tipe: "sukses" });
        setKonfirmasi(false);
        baru();
        await muatData();
      } catch (error) {
        setToast({
          pesan: error instanceof Error ? error.message : `Pemeriksaan ${namaJenis} gagal dihapus`,
          tipe: "error",
        });
      } finally {
        setMenyimpan(false);
      }
    };

    const cetak = () => {
      if (data.length === 0) {
        setToast({ pesan: `Belum ada pemeriksaan ${namaJenis} untuk dicetak.`, tipe: "info" });
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

    const adaIsi = kolomAktif.some((kolom) => {
      const nilai = form[kolom];
      if (jenis === "obstetri" && ["janin", "panggul", "kontraksi", "fluksus", "albus", "dalam", "arah", "ketuban", "feto"].includes(kolom)) return false;
      if (jenis === "ginekologi" && ["fluxus_gine", "fluor_gine", "mobilitas", "nyeri_tekan"].includes(kolom)) return false;
      return Boolean(nilai.trim());
    });

    useEffect(() => {
      onStatusPanelChange({
        disabledSimpan: menyimpan || Boolean(terpilih) || !adaIsi,
        disabledGanti: menyimpan || !terpilih || !adaIsi,
        disabledHapus: menyimpan || !terpilih,
        disabledCetak: data.length === 0,
        tanggalMulai,
        tanggalSelesai,
        kataKunci,
        jumlahRecord: data.length,
        memuat: memuat || menyimpan,
      });
    }, [adaIsi, data.length, kataKunci, memuat, menyimpan, onStatusPanelChange, tanggalMulai, tanggalSelesai, terpilih]);

    const kelasInput = "h-7 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 text-[11px] text-slate-800 focus:border-primary-600 focus:outline-none";
    const field = (label: string, nama: KolomPemeriksaan, maxLength: number) => (
      <label className="grid min-w-0 grid-cols-[7.75rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700">
        <span className="text-right">{label} :</span>
        <input value={form[nama]} onChange={(event) => isi(nama, event.target.value)} maxLength={maxLength} className={kelasInput} />
      </label>
    );
    const pilihan = (label: string, nama: KolomPemeriksaan, items: { value: string; label: string }[]) => (
      <label className="grid min-w-0 grid-cols-[7.75rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700">
        <span className="text-right">{label} :</span>
        <CustomSelect value={form[nama]} onChange={(event) => isi(nama, event.target.value)} containerClassName="relative min-w-0" className="h-7 rounded-md py-0.5 pr-6 text-[11px]">
          {items.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </CustomSelect>
      </label>
    );
    const bagian = (judul: string, children: React.ReactNode, className = "") => (
      <fieldset className={`min-w-0 rounded-md border border-slate-200/80 bg-slate-50/60 p-2 ${className}`}>
        <legend className="px-1 text-[11px] font-semibold text-slate-700">{judul}</legend>
        <div className="space-y-1.5">{children}</div>
      </fieldset>
    );

    const opsiBiner = [{ value: "+", label: "+" }, { value: "-", label: "-" }];
    const formObstetri = (
      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-[0.9fr_0.95fr_1.55fr]">
        {bagian("Janin dan presentasi", <>
          {field("Tinggi fundus (cm)", "tinggi_uteri", 5)}
          {pilihan("Janin", "janin", ["-", "Tunggal", "Gemelli"].map((value) => ({ value, label: value })))}
          {field("Letak", "letak", 50)}
          {pilihan("Bagian bawah panggul", "panggul", ["-", "5/5", "4/5", "3/5", "2/5", "1/5"].map((value) => ({ value, label: value })))}
          {field("Denyut fetus (/mnt)", "denyut", 5)}
        </>)}
        {bagian("Kontraksi dan cairan", <>
          {pilihan("Kontraksi", "kontraksi", opsiBiner)}
          <div className="grid min-w-0 grid-cols-[7.75rem_minmax(0,1fr)] items-center gap-1.5 text-[11px] text-slate-700">
            <span className="text-right">Kualitas :</span>
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-1">
              <input aria-label="Jumlah kontraksi per 10 menit" value={form.kualitas_mnt} onChange={(event) => isi("kualitas_mnt", event.target.value)} maxLength={5} className={kelasInput} />
              <span>/10 mnt/</span>
              <input aria-label="Durasi kontraksi dalam detik" value={form.kualitas_dtk} onChange={(event) => isi("kualitas_dtk", event.target.value)} maxLength={5} className={kelasInput} />
              <span>dtk</span>
            </div>
          </div>
          {pilihan("Fluksus", "fluksus", opsiBiner)}
          {pilihan("Fluor albus", "albus", opsiBiner)}
          {pilihan("Selaput ketuban", "ketuban", [{ value: "-", label: "-" }, { value: "+", label: "+" }])}
        </>)}
        {bagian("Pemeriksaan dalam", <div className="grid gap-x-2 gap-y-1.5 sm:grid-cols-2">
          {field("Vulva/Vagina", "vulva", 50)}
          {field("Portio inspekulo", "portio", 50)}
          {pilihan("Konsistensi", "dalam", ["Kenyal", "Lunak"].map((value) => ({ value, label: value })))}
          {field("Tebal (cm)", "tebal", 5)}
          {pilihan("Arah", "arah", [
            { value: "depan", label: "Depan" },
            { value: "axial", label: "Axial" },
            { value: "belakang", label: "Belakang" },
          ])}
          {field("Pembukaan", "pembukaan", 50)}
          {field("Penurunan", "penurunan", 50)}
          {field("Denominator", "denominator", 50)}
          {pilihan("Imbang feto-pelvik", "feto", ["Normal", "Susp.CPD-FPD", "CPD-FPD"].map((value) => ({ value, label: value })))}
        </div>, "lg:col-span-2 xl:col-span-1")}
      </div>
    );

    const formGinekologi = (
      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-[0.95fr_0.95fr_1.5fr]">
        {bagian("Inspeksi", <>
          {field("Inspeksi", "inspeksi", 50)}
          {field("Vulva/Uretra/Vagina", "inspeksi_vulva", 50)}
          {field("Inspekulo", "inspekulo_gine", 50)}
          {pilihan("Fluksus", "fluxus_gine", opsiBiner)}
          {pilihan("Fluor albus", "fluor_gine", opsiBiner)}
        </>)}
        {bagian("Inspekulo", <>
          {field("Vulva/Vagina", "vulva_inspekulo", 50)}
          {field("Portio", "portio_inspekulo", 50)}
          {field("Sondage", "sondage", 50)}
        </>)}
        {bagian("Pemeriksaan dalam", <div className="grid gap-x-2 gap-y-1.5 sm:grid-cols-2">
          {field("Portio", "portio_dalam", 50)}
          {field("Bentuk", "bentuk", 50)}
          {field("Cavum uteri", "cavum_uteri", 50)}
          {pilihan("Mobilitas", "mobilitas", opsiBiner)}
          {field("Ukuran", "ukuran", 50)}
          {pilihan("Nyeri tekan", "nyeri_tekan", opsiBiner)}
          {field("Adnexa kanan", "adnexa_kanan", 50)}
          {field("Adnexa kiri", "adnexa_kiri", 50)}
          {field("Cavum Douglas", "cavum_douglas", 50)}
        </div>, "lg:col-span-2 xl:col-span-1")}
      </div>
    );

    return <div id="panel-tindakan-ralan" role="tabpanel" aria-labelledby={`tab-tindakan-${jenis}`} tabIndex={0} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
      <section aria-label={terpilih ? `Ubah pemeriksaan ${namaJenis}` : `Input pemeriksaan ${namaJenis}`} className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5 rounded-md border border-primary-200 bg-primary-50/50 px-2.5 py-1.5 text-[11px] text-slate-700">
          <div>
            <span className="font-mono">{pasien.no_rawat} · {pasien.no_rkm_medis}</span>
            <span className="ml-2 font-semibold text-slate-800">{pasien.nm_pasien}</span>
            <span className="ml-2">{pasien.nm_poli}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1">Tanggal
              <input type="date" value={form.tgl_perawatan} onChange={(event) => { setWaktuOtomatis(false); isi("tgl_perawatan", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="flex items-center gap-1">Jam
              <input type="time" step="1" value={form.jam_rawat} onChange={(event) => { setWaktuOtomatis(false); isi("jam_rawat", event.target.value); }} className="h-7 rounded-md border border-slate-300 bg-white px-1.5 text-[11px] focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="flex items-center" title="Perbarui tanggal dan jam secara otomatis">
              <input aria-label="Perbarui waktu pemeriksaan secara otomatis" type="checkbox" checked={waktuOtomatis} onChange={(event) => setWaktuOtomatis(event.target.checked)} className="accent-primary-700" />
            </label>
          </div>
        </div>
        {jenis === "obstetri" ? formObstetri : formGinekologi}
      </section>

      <section className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <table className={`border-collapse text-left text-[11px] text-slate-700 ${jenis === "obstetri" ? "min-w-[118rem]" : "min-w-[110rem]"}`}>
          <caption className="sr-only">Riwayat pemeriksaan {namaJenis} {pasien.nm_pasien}</caption>
          <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className="whitespace-nowrap px-2.5 py-2 font-semibold">Tgl. Rawat</th>
              <th scope="col" className="whitespace-nowrap px-2.5 py-2 font-semibold">Jam</th>
              {kolomAktif.map((kolom) => <th key={kolom} scope="col" className="whitespace-nowrap px-2.5 py-2 font-semibold">{LABEL_KOLOM[kolom]}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {memuat ? <tr><td colSpan={kolomAktif.length + 2} className="py-10 text-center text-slate-500">Memuat pemeriksaan {namaJenis}...</td></tr>
              : data.length === 0 ? <tr><td colSpan={kolomAktif.length + 2} className="py-10 text-center text-slate-400">Belum ada pemeriksaan {namaJenis}.</td></tr>
                : data.map((item) => <tr key={`${item.tgl_perawatan}-${item.jam_rawat}`} onClick={() => pilih(item)} className={`cursor-pointer ${terpilih?.tgl_perawatan === item.tgl_perawatan && terpilih?.jam_rawat === item.jam_rawat ? "bg-primary-100" : "hover:bg-slate-50"}`}>
                  <td className="whitespace-nowrap px-2.5 py-2">{item.tgl_perawatan}</td>
                  <td className="whitespace-nowrap px-2.5 py-2">{item.jam_rawat}</td>
                  {kolomAktif.map((kolom) => <td key={kolom} className="max-w-72 whitespace-pre-wrap px-2.5 py-2 align-top">{item[kolom] || "-"}</td>)}
                </tr>)}
          </tbody>
        </table>
      </section>

      <KonfirmasiDialog
        terbuka={konfirmasi}
        judul={`Hapus Pemeriksaan ${jenis === "obstetri" ? "Obstetri" : "Ginekologi"}`}
        pesan={`Hapus pemeriksaan ${terpilih?.tgl_perawatan || ""} ${terpilih?.jam_rawat || ""} untuk ${pasien.nm_pasien}?`}
        subPesan="Data klinis yang dihapus tidak dapat dipulihkan dari halaman ini."
        onBatal={() => setKonfirmasi(false)}
        onKonfirmasi={hapus}
        sedangMemproses={menyimpan}
      />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>;
  },
);

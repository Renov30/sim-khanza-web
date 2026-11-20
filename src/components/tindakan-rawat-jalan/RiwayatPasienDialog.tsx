"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useKlien } from "@/lib/klien";
import { registrationDate } from "@/lib/registrasi/date";
import {
  TAB_RIWAYAT,
  type BarisRiwayat,
  type ModeRiwayat,
  type ResponsRiwayat,
  type TabRiwayat,
} from "@/lib/riwayat-pasien/types";
import type { ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";

interface RiwayatPasienDialogProps {
  terbuka: boolean;
  tampilan?: "dialog" | "halaman";
  noRm: string;
  namaPasien: string;
  onPilihPasien?: (noRm: string, nama: string) => void;
  onTutup: () => void;
  onToast: (pesan: string, tipe?: ToastTipe) => void;
}

interface KolomTabel {
  judul: string;
  kunci: string;
  lebar?: string;
  render?: (baris: BarisRiwayat, indeks: number) => ReactNode;
}

interface PasienPilihan {
  no_rm: string;
  nama: string;
}

const LABEL_TAB: Record<TabRiwayat, string> = {
  kunjungan: "Riwayat Kunjungan",
  soapi: "Riwayat S.O.A.P.I.E",
  perawatan: "Riwayat Perawatan",
  pembelian: "Pembelian Obat",
  piutang: "Piutang Obat",
  retensi: "Retensi Berkas",
};

const LABEL_MODE: Record<ModeRiwayat, string> = {
  terakhir: "5 Riwayat Terakhir",
  semua: "Semua Riwayat",
  tanggal: "Tanggal",
  nomor: "Nomor",
};

const BAGIAN_PERAWATAN = Array.from(new Set([
  "Diagnosa/Penyakit (ICD 10)",
  "Prosedur/Tindakan (ICD 9)",
  "SEP BPJS",
  "Triase IGD/UGD",
  "Awal Keperawatan IGD",
  "Awal Keperawatan Ralan Umum",
  "Awal Keperawatan Ralan Gigi",
  "Awal Keperawatan Ralan Bayi/Anak",
  "Awal Keperawatan Ralan Kandungan",
  "Awal Keperawatan Ralan Psikiatri",
  "Awal Keperawatan Ralan Geriatri",
  "Awal Fisioterapi",
  "Pengkajian Terapi Wicara",
  "Tatalaksana Terapi Okupasi",
  "Pengkajian Psikologi",
  "Pengkajian Psikologi Klinis",
  "Awal Keperawatan Ranap Umum",
  "Awal Keperawatan Ranap Kandungan",
  "Awal Keperawatan Ranap Neonatus",
  "Awal Keperawatan Ranap Bayi",
  "Bayi Baru Lahir",
  "Awal Medis IGD",
  "Awal Medis IGD Psikiatri",
  "Awal Medis MCU",
  "Awal Medis Ralan Umum",
  "Awal Medis Ralan Kandungan",
  "Awal Medis Ralan Bayi/Anak",
  "Awal Medis Ralan THT",
  "Awal Medis Ralan Psikiatri",
  "Awal Medis Ralan Penyakit Dalam",
  "Awal Medis Ralan Mata",
  "Awal Medis Ralan Neurologi",
  "Awal Medis Ralan Orthopedi",
  "Awal Medis Ralan Bedah",
  "Awal Medis Ralan Bedah Mulut",
  "Awal Medis Ralan Geriatri",
  "Awal Medis Ralan Kulit & Kelamin",
  "Awal Medis Ralan Paru",
  "Awal Medis Ralan Fisik & Rehabilitasi",
  "Awal Medis Ranap Umum",
  "Awal Medis Ranap Kandungan",
  "Awal Medis Ranap Neonatus",
  "Awal Medis Hemodialisa",
  "Edukasi Pasien & Keluarga Rawat Jalan",
  "Pemeriksaan Ralan",
  "Pemeriksaan Obstetri Ralan",
  "Pemeriksaan Genekologi Ralan",
  "Pemeriksaan Ranap",
  "Pemeriksaan Obstetri Ranap",
  "Pemeriksaan Genekologi Ranap",
  "Konsultasi Medik",
  "Catatan Dokter",
  "Catatan Observasi IGD",
  "Catatan Observasi CHBP",
  "Catatan Observasi Induksi Persalinan",
  "Catatan Observasi Ranap",
  "Catatan Observasi Ranap Kebidanan",
  "Catatan Observasi Ranap Post Partum",
  "Catatan Observasi Bayi",
  "Catatan Observasi Restrain Nonfarmakologi",
  "Catatan Observasi Ventilator",
  "Catatan Observasi Hemodialisa",
  "Follow Up DBD",
  "Keseimbangan Cairan",
  "Catatan Cairan Hemodialisa",
  "Catatan Cek GDS",
  "Pengkajian Ulang Nyeri",
  "Catatan Keperawatan Ralan",
  "Catatan Keperawatan Ranap",
  "Checklist Pemberian Fibrinolitik",
  "Pemantauan PEWS Anak",
  "Pemantauan EWS Dewasa",
  "Pemantauan MEOWS Obstetri",
  "Pemantauan EWS Neonatus",
  "Monitoring Reaksi Tranfusi",
  "Pengkajian Pre Induksi",
  "Check List Pre Operasi",
  "Sign-In Sebelum Anestesi",
  "Time-Out Sebelum Insisi",
  "Sign-Out Sebelum Menutup Luka",
  "Check List Post Operasi",
  "Pengkajian Pre Operasi",
  "Catatan Anestesi-Sedasi",
  "Pengkajian Pre Anestesi",
  "Check List Kesiapan Anestesi",
  "Skor Aldrette Pasca Anestesi",
  "Skor Steward Pasca Anestesi",
  "Skor Bromage Pasca Anestesi",
  "Catatan Pengkajian Paska Operasi",
  "Check List Kriteria Masuk HCU",
  "Check List Kriteria Keluar HCU",
  "Check List Kriteria Masuk ICU",
  "Check List Kriteria Keluar ICU",
  "Lanjutan Risiko Jatuh Dewasa",
  "Lanjutan Risiko Jatuh Anak",
  "Lanjutan Risiko Jatuh Lansia",
  "Lanjutan Risiko Jatuh Geriatri",
  "Lanjutan Risiko Jatuh Neonatus",
  "Lanjutan Risiko Jatuh Psikiatri",
  "Lanjutan Skrining Fungsional",
  "Risiko Dekubitus",
  "Asuhan Gizi",
  "Hasil USG Kandungan",
  "Hasil USG Urologi",
  "Hasil USG Neonatus",
  "Hasil USG Gynecologi",
  "Hasil Pemeriksaan EKG",
  "Hasil Pemeriksaan Slit Lamp",
  "Hasil Pemeriksaan OCT",
  "Hasil Pemeriksaan ECHO",
  "Hasil Pemeriksaan Endoskopi Faring/Laring",
  "Hasil Pemeriksaan Endoskopi Hidung",
  "Hasil Pemeriksaan Endoskopi Telinga",
  "Catatan Persalinan",
  "Laporan Tindakan Medis",
  "Dokumentasi Tindakan ESWL",
  "Perencanaan Pemulangan",
  "Layanan Kedokteran Fisik & Rehabilitasi",
  "Layanan Program KFR",
  "Uji Fungsi/Prosedur KFR",
  "Hemodialisa",
  "Skrining Nutrisi Dewasa",
  "Skrining Nutrisi Lansia",
  "Skrining Nutrisi Anak",
  "Skrining Gizi Lanjut",
  "Monitoring Gizi",
  "Skrining Merokok Usia Sekolah",
  "Skrining Kekerasan Pada Perempuan",
  "Skrining Obesitas",
  "Skrining Diabetes Melitus",
  "Skrining Anemia",
  "Skrining Hipertensi",
  "Skrining Kesehatan Penglihatan",
  "Skrining Indra Pendengaran",
  "Skrining Risiko Kanker Payudara",
  "Skrining Risiko Kanker Paru",
  "Skrining Risiko Kanker Serviks",
  "Skrining Kesehatan Gigi & Mulut Usia Remaja",
  "Skrining Kesehatan Gigi & Mulut Balita",
  "Skrining Kesehatan Gigi & Mulut Dewasa",
  "Skrining Kesehatan Gigi & Mulut Lansia",
  "Skrining TBC",
  "Skrining PUMA",
  "Skrining Adiksi Nikotin",
  "Skrining Thalassemia",
  "Skrining Instrumen SDQ",
  "Skrining Instrumen SRQ",
  "Skrining Instrumen ACRS",
  "Skrining Kanker Kolorektal",
  "Skrining Frailty Syndrome",
  "Rekonsiliasi Obat",
  "Konseling Farmasi",
  "Pelayanan Informasi Obat",
  "Berkas Digital Perawatan",
  "Transfer Antar Ruang",
  "Pengkajian Restrain",
  "Tambahan Pasien Geriatri",
  "Tambahan Bunuh Diri",
  "Tambahan Perilaku Kekerasan",
  "Tambahan Melarikan Diri",
  "Pengkajian Pasien Terminal",
  "Pengkajian Korban Kekerasan",
  "Pengkajian Kecemasan Ranap Anak",
  "Pengkajian Pasien Penyakit Menular",
  "Pengkajian Pasien Imunitas Rendah",
  "Pengkajian Pasien Keracunan",
  "Resume",
  "Tindakan Ralan Dokter",
  "Tindakan Ralan Paramedis",
  "Tindakan Ralan Dokter & Paramedis",
  "Tindakan Ranap Dokter",
  "Tindakan Ranap Paramedis",
  "Tindakan Ranap Dokter & Paramedis",
  "Penggunaan Kamar",
  "Operasi/VK",
  "Pemeriksaan Radiologi",
  "Pemeriksaan Laborat",
  "Pemberian Obat/BHP/Alkes",
  "Penggunaan Obat/BHP Operasi",
  "Resep Pulang",
  "Tambahan Biaya",
  "Potongan Biaya",
]));

const TINDAKAN_BAGIAN: Record<string, (baris: BarisRiwayat) => boolean> = {
  "Tindakan Ralan Dokter": (baris) => baris.sumber === "Ralan" && baris.jenis === "Dokter",
  "Tindakan Ralan Paramedis": (baris) => baris.sumber === "Ralan" && baris.jenis === "Petugas",
  "Tindakan Ralan Dokter & Paramedis": (baris) => baris.sumber === "Ralan" && baris.jenis === "Dokter & Petugas",
  "Tindakan Ranap Dokter": (baris) => baris.sumber === "Ranap" && baris.jenis === "Dokter",
  "Tindakan Ranap Paramedis": (baris) => baris.sumber === "Ranap" && baris.jenis === "Petugas",
  "Tindakan Ranap Dokter & Paramedis": (baris) => baris.sumber === "Ranap" && baris.jenis === "Dokter & Petugas",
};

const rupiah = (nilai: unknown) => `Rp ${Number(nilai || 0).toLocaleString("id-ID")}`;
const teks = (nilai: unknown) => (nilai === null || nilai === undefined || nilai === "" ? "-" : String(nilai));

function TabelRiwayat({ caption, kolom, baris, kunciBaris }: {
  caption: string;
  kolom: KolomTabel[];
  baris: BarisRiwayat[];
  kunciBaris: (baris: BarisRiwayat, indeks: number) => string;
}) {
  return (
    <div className="overflow-auto border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left text-[11px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 bg-slate-100 text-slate-700">
          <tr>
            {kolom.map((item) => <th key={item.kunci} scope="col" className={`whitespace-nowrap border-b border-r border-slate-200 px-2 py-2 text-center ${item.lebar || ""}`}>{item.judul}</th>)}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {baris.length === 0 ? (
            <tr><td colSpan={kolom.length} className="px-2 py-6 text-center text-slate-400">Tidak ada data.</td></tr>
          ) : baris.map((item, indeks) => (
            <tr key={kunciBaris(item, indeks)} className="align-top even:bg-slate-50/70 hover:bg-slate-50">
              {kolom.map((kol) => <td key={kol.kunci} className={`border-b border-r border-slate-100 px-2 py-1.5 ${kol.lebar || ""}`}>{kol.render ? kol.render(item, indeks) : teks(item[kol.kunci])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bagian({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <section className="space-y-1">
      <h4 className="text-[11px] font-semibold text-slate-800">{judul}</h4>
      {children}
    </section>
  );
}

function SidebarBagianPerawatan({ terbuka, tcari, padaCari, terpilih, padaUbah, padaSemua, padaBuka }: {
  terbuka: boolean;
  tcari: string;
  padaCari: (nilai: string) => void;
  terpilih: Set<string>;
  padaUbah: (label: string, aktif: boolean) => void;
  padaSemua: (aktif: boolean) => void;
  padaBuka: (aktif: boolean) => void;
}) {
  const kunci = tcari.trim().toLowerCase();
  const daftar = BAGIAN_PERAWATAN.filter((label) => label.toLowerCase().includes(kunci));
  const semua = terpilih.size === BAGIAN_PERAWATAN.length;

  return (
    <aside aria-label="Bagian riwayat perawatan" className={`flex shrink-0 flex-col border-r border-slate-200 bg-slate-50 ${terbuka ? "w-60" : "w-8"}`}>
      <div className={`flex shrink-0 items-center border-b border-slate-200 p-1.5 ${terbuka ? "justify-between" : "justify-center"}`}>
        {terbuka && <span className="text-[11px] font-semibold text-slate-700">Pilih Perawatan</span>}
        <button type="button" onClick={() => padaBuka(!terbuka)} aria-label={terbuka ? "Tutup sidebar bagian" : "Buka sidebar bagian"} title={terbuka ? "Tutup sidebar" : "Buka sidebar"} className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700">
          <FontAwesomeIcon icon={terbuka ? faChevronLeft : faChevronRight} className="h-3 w-3" />
        </button>
      </div>
      {terbuka && <>
        <div className="border-b border-slate-200 p-1.5">
          <div className="flex h-7 items-center gap-1.5 rounded border border-slate-300 bg-white px-2 focus-within:outline focus-within:outline-2 focus-within:outline-primary-700">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3 shrink-0 text-slate-400" />
            <input value={tcari} onChange={(event) => padaCari(event.target.value)} placeholder="Cari bagian..." aria-label="Cari bagian riwayat perawatan" className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[11px] text-slate-800 outline-none placeholder:text-slate-400" />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-1.5">
          <label className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 text-[11px] font-semibold text-slate-800">
            <input type="checkbox" checked={semua} onChange={(event) => padaSemua(event.target.checked)} className="accent-primary-700" />
            Semua
          </label>
          <div className="mt-1 space-y-0.5">
            {daftar.map((label) => (
              <label key={label} className="flex items-start gap-1.5 rounded px-1 py-1 text-[11px] text-slate-700">
                <input type="checkbox" checked={terpilih.has(label)} onChange={(event) => padaUbah(label, event.target.checked)} className="mt-0.5 accent-primary-700" />
                <span>{label}</span>
              </label>
            ))}
            {daftar.length === 0 && <p className="px-1 py-2 text-[11px] text-slate-400">Tidak ada bagian.</p>}
          </div>
        </div>
      </>}
    </aside>
  );
}

function RingkasanKunjungan({ item }: { item: BarisRiwayat }) {
  const pasangan: [string, unknown][] = [
    ["No. Rawat", item.no_rawat],
    ["No. Registrasi", item.no_registrasi],
    ["Tanggal", item.tanggal],
    ["Jam", item.jam],
    ["Status", item.status_lanjut],
    ["Dokter", item.nama_dokter],
    ["Poli", item.nama_poli],
    ["Jenis Bayar", item.jenis_bayar],
    ["Biaya Registrasi", rupiah(item.biaya_registrasi)],
  ];
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-1 rounded border border-slate-200 bg-slate-50/60 p-2 text-[11px] sm:grid-cols-3 lg:grid-cols-5">
      {pasangan.map(([label, nilai]) => (
        <div key={label}><span className="text-slate-500">{label}: </span><span className="text-slate-800">{teks(nilai)}</span></div>
      ))}
    </div>
  );
}

export function RiwayatPasienDialog({
  terbuka,
  tampilan = "dialog",
  noRm,
  namaPasien,
  onPilihPasien,
  onTutup,
  onToast,
}: RiwayatPasienDialogProps) {
  const terpasang = useKlien();
  const tombolTutup = useRef<HTMLButtonElement>(null);
  const hariIni = registrationDate();
  const [tabAktif, setTabAktif] = useState<TabRiwayat>("kunjungan");
  const [mode, setMode] = useState<ModeRiwayat>("terakhir");
  const [nomor, setNomor] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState(hariIni);
  const [tanggalAkhir, setTanggalAkhir] = useState(hariIni);
  const [offset, setOffset] = useState(0);
  const [versiCari, setVersiCari] = useState(0);
  const [data, setData] = useState<ResponsRiwayat | null>(null);
  const [sidebarPerawatanTerbuka, setSidebarPerawatanTerbuka] = useState(true);
  const [cariBagian, setCariBagian] = useState("");
  const [bagianTerpilih, setBagianTerpilih] = useState<Set<string>>(() => new Set(BAGIAN_PERAWATAN));
  const [pemilihPasienTerbuka, setPemilihPasienTerbuka] = useState(false);
  const [cariPasien, setCariPasien] = useState("");
  const [hasilPasien, setHasilPasien] = useState<{ kunci: string; items: PasienPilihan[]; error: string } | null>(null);
  const nomorTidakAda = mode === "nomor" && !nomor.trim();

  useEffect(() => {
    const kunci = cariPasien.trim();
    if (!pemilihPasienTerbuka || kunci.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ resource: "pasien", cari: kunci });
        const response = await fetch(`/api/riwayat-pasien?${params}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: { items?: PasienPilihan[] }; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal mencari pasien.");
        if (!controller.signal.aborted) setHasilPasien({ kunci, items: json.data?.items || [], error: "" });
      } catch (error) {
        if (!controller.signal.aborted) setHasilPasien({ kunci, items: [], error: error instanceof Error ? error.message : "Gagal mencari pasien." });
      }
    }, 250);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [cariPasien, pemilihPasienTerbuka]);

  useEffect(() => {
    if (!terbuka || tampilan !== "dialog") return;
    const pengatur = window.setTimeout(() => tombolTutup.current?.focus(), 0);
    return () => window.clearTimeout(pengatur);
  }, [terbuka, tampilan]);

  useEffect(() => {
    if (!terbuka || tampilan !== "dialog") return;
    const keluarkan = (event: KeyboardEvent) => {
      if (event.key === "Escape") onTutup();
    };
    window.addEventListener("keydown", keluarkan);
    return () => window.removeEventListener("keydown", keluarkan);
  }, [terbuka, onTutup, tampilan]);

  useEffect(() => {
    if (!terbuka || !noRm || nomorTidakAda) return;
    const controller = new AbortController();
    async function muat() {
      try {
        const url = new URL("/api/riwayat-pasien", window.location.origin);
        url.searchParams.set("no_rm", noRm);
        url.searchParams.set("tab", tabAktif);
        url.searchParams.set("mode", mode);
        if (mode === "tanggal") {
          url.searchParams.set("tanggal_awal", tanggalAwal);
          url.searchParams.set("tanggal_akhir", tanggalAkhir);
        }
        if (mode === "nomor") url.searchParams.set("nomor", nomor.trim());
        url.searchParams.set("limit", "50");
        url.searchParams.set("offset", String(offset));
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat riwayat pasien");
        if (!controller.signal.aborted) setData(json.data as ResponsRiwayat);
      } catch (error) {
        if (!controller.signal.aborted) onToast(error instanceof Error ? error.message : "Gagal memuat riwayat pasien", "error");
      }
    }
    void muat();
    return () => controller.abort();
  }, [terbuka, noRm, tabAktif, mode, nomor, nomorTidakAda, tanggalAwal, tanggalAkhir, offset, versiCari, onToast]);

  const pindahTab = (berikutnya: TabRiwayat) => {
    setTabAktif(berikutnya);
    setOffset(0);
    if (mode === "nomor") {
      setMode("terakhir");
      setNomor("");
    }
  };

  const cari = () => {
    setOffset(0);
    setVersiCari((nilai) => nilai + 1);
  };

  const ubahBagian = (label: string, aktif: boolean) => {
    setBagianTerpilih((sebelum) => {
      const berikut = new Set(sebelum);
      if (aktif) berikut.add(label);
      else berikut.delete(label);
      return berikut;
    });
  };

  const ubahSemuaBagian = (aktif: boolean) => {
    setBagianTerpilih(aktif ? new Set(BAGIAN_PERAWATAN) : new Set());
  };

  const modeTersedia = useCallback((nilai: ModeRiwayat) => !(tabAktif === "retensi" && nilai === "nomor"), [tabAktif]);

  if (!terpasang || !terbuka) return null;

  const dataTampil = nomorTidakAda ? null : data;
  const memuatTampil = Boolean(noRm) && !nomorTidakAda && data === null;
  const pasien = dataTampil?.pasien;
  const kunciCariPasien = cariPasien.trim();
  const hasilPasienTampil = hasilPasien?.kunci === kunciCariPasien ? hasilPasien : null;
  const items = dataTampil?.items || [];
  const total = dataTampil?.total || 0;
  const limit = dataTampil?.limit || 50;
  const halamanSaatIni = Math.floor(offset / Math.max(limit, 1)) + 1;
  const jumlahHalaman = Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  const konten = (
    <div className={tampilan === "dialog" ? "fixed inset-0 z-[99997] flex items-stretch justify-center bg-black/50 p-2 sm:p-4" : "module-page flex h-full w-full flex-col overflow-hidden bg-slate-50 p-2 sm:p-3"} role={tampilan === "dialog" ? "presentation" : undefined}>
      <div role={tampilan === "dialog" ? "dialog" : undefined} aria-modal={tampilan === "dialog" ? true : undefined} aria-label="Riwayat pasien" className={tampilan === "dialog" ? "flex w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-xl" : "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm"}>
        {tampilan === "dialog" && <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
          <div>
            <p className="text-[11px] text-slate-600"><span className="font-mono">{noRm}</span> · {namaPasien}</p>
          </div>
          <button ref={tombolTutup} type="button" onClick={onTutup} aria-label="Tutup riwayat pasien" title="Tutup" className="rounded-full p-1 text-slate-500 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600">
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>}

        <div className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-200 bg-white p-3 text-[11px] sm:grid-cols-4 lg:grid-cols-6">
            <div className="relative col-span-2 lg:col-span-3">
              <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-1.5">
                <span className="text-right text-slate-600">Pasien :</span>
                <div className="flex min-w-0 items-center gap-1.5">
                  <input readOnly aria-label="Nomor rekam medis pasien" value={pasien?.no_rm || noRm} placeholder="No. RM" className="h-7 w-28 shrink-0 rounded-md border border-slate-300 bg-slate-50 px-2 font-mono text-xs text-slate-800" />
                  <input readOnly aria-label="Nama pasien" value={pasien?.nama || namaPasien} placeholder="Pilih pasien" className="h-7 min-w-0 flex-1 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-800" />
                  <button type="button" disabled={!onPilihPasien} onClick={() => { setCariPasien(""); setHasilPasien(null); setPemilihPasienTerbuka((nilai) => !nilai); }} aria-label="Pilih atau ganti pasien" title="Pilih atau ganti pasien" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-primary-700 hover:bg-slate-100 disabled:opacity-40">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {pemilihPasienTerbuka && (
                <div className="absolute left-[4.75rem] top-8 z-30 w-[min(38rem,calc(100vw-3rem))] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 p-2">
                    <input autoFocus value={cariPasien} onChange={(event) => setCariPasien(event.target.value)} placeholder="Cari No. RM atau nama pasien..." aria-label="Cari pasien" className="h-8 min-w-0 flex-1 rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" />
                    <button type="button" onClick={() => setPemilihPasienTerbuka(false)} aria-label="Tutup pemilih pasien" title="Tutup" className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"><FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="max-h-56 overflow-auto py-1">
                    {kunciCariPasien.length < 2 ? <p className="px-3 py-3 text-slate-500">Ketik minimal 2 karakter.</p>
                      : !hasilPasienTampil ? <p className="px-3 py-3 text-slate-500">Mencari pasien...</p>
                        : hasilPasienTampil.error ? <p className="px-3 py-3 text-red-700">{hasilPasienTampil.error}</p>
                          : hasilPasienTampil.items.length === 0 ? <p className="px-3 py-3 text-slate-500">Pasien tidak ditemukan.</p>
                            : hasilPasienTampil.items.map((item) => <button key={item.no_rm} type="button" onClick={() => { onPilihPasien?.(item.no_rm, item.nama); setPemilihPasienTerbuka(false); }} className="block w-full border-b border-slate-100 px-3 py-2 text-left hover:bg-primary-50"><span className="font-mono text-slate-800">{item.no_rm}</span><span className="ml-2 text-slate-700">{item.nama}</span></button>)}
                  </div>
                </div>
              )}
            </div>
            {pasien && <>
            <div><span className="text-slate-500">J.K.: </span><span className="text-slate-800">{teks(pasien.jenis_kelamin)}</span></div>
            <div className="col-span-2"><span className="text-slate-500">Tempat &amp; Tgl. Lahir: </span><span className="text-slate-800">{teks(pasien.tempat_lahir)}, {teks(pasien.tanggal_lahir)}</span></div>
            <div className="col-span-2 lg:col-span-3"><span className="text-slate-500">Alamat: </span><span className="text-slate-800">{teks(pasien.alamat)}</span></div>
            <div><span className="text-slate-500">G.D.: </span><span className="text-slate-800">{teks(pasien.golongan_darah)}</span></div>
            <div className="col-span-2"><span className="text-slate-500">Nama Ibu Kandung: </span><span className="text-slate-800">{teks(pasien.nama_ibu)}</span></div>
            <div><span className="text-slate-500">Agama: </span><span className="text-slate-800">{teks(pasien.agama)}</span></div>
            <div><span className="text-slate-500">Stts. Nikah: </span><span className="text-slate-800">{teks(pasien.status_nikah)}</span></div>
            <div><span className="text-slate-500">Pendidikan: </span><span className="text-slate-800">{teks(pasien.pendidikan)}</span></div>
            <div><span className="text-slate-500">Bahasa: </span><span className="text-slate-800">{teks(pasien.bahasa)}</span></div>
            <div><span className="text-slate-500">Cacat Fisik: </span><span className="text-slate-800">{teks(pasien.cacat_fisik)}</span></div>
            </>}
          </div>

        <div role="tablist" aria-label="Jenis riwayat pasien" className="flex shrink-0 overflow-x-auto border-b border-slate-200 px-2">
          {TAB_RIWAYAT.map((tab, indeks) => (
            <button
              key={tab}
              id={`tab-riwayat-${tab}`}
              type="button"
              role="tab"
              aria-selected={tabAktif === tab}
              aria-controls="panel-riwayat-pasien"
              tabIndex={tabAktif === tab ? 0 : -1}
              onClick={() => pindahTab(tab)}
              onKeyDown={(event) => {
                let tujuan = indeks;
                if (event.key === "ArrowRight") tujuan = (indeks + 1) % TAB_RIWAYAT.length;
                else if (event.key === "ArrowLeft") tujuan = (indeks - 1 + TAB_RIWAYAT.length) % TAB_RIWAYAT.length;
                else if (event.key === "Home") tujuan = 0;
                else if (event.key === "End") tujuan = TAB_RIWAYAT.length - 1;
                else return;
                event.preventDefault();
                pindahTab(TAB_RIWAYAT[tujuan]);
                document.getElementById(`tab-riwayat-${TAB_RIWAYAT[tujuan]}`)?.focus();
              }}
              className={`whitespace-nowrap border-b-2 px-4 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${tabAktif === tab ? "border-primary-600 text-primary-700" : "border-transparent text-slate-600 hover:bg-slate-50"}`}
            >
              {LABEL_TAB[tab]}
            </button>
          ))}
        </div>

        <section id="panel-riwayat-pasien" role="tabpanel" aria-labelledby={`tab-riwayat-${tabAktif}`} tabIndex={0} className={`min-h-0 flex-1 bg-white ${tabAktif === "perawatan" ? "flex overflow-hidden p-0" : "space-y-3 overflow-auto p-2"}`}>
          {tabAktif === "perawatan" && !memuatTampil && items.length > 0 && (
            <SidebarBagianPerawatan
              terbuka={sidebarPerawatanTerbuka}
              tcari={cariBagian}
              padaCari={setCariBagian}
              terpilih={bagianTerpilih}
              padaUbah={ubahBagian}
              padaSemua={ubahSemuaBagian}
              padaBuka={setSidebarPerawatanTerbuka}
            />
          )}
          <div className={tabAktif === "perawatan" ? "min-w-0 flex-1 space-y-3 overflow-auto p-2" : "contents"}>
          {memuatTampil ? (
            <div className="rounded border border-slate-200 bg-white p-6 text-center text-xs text-slate-500">Memuat riwayat pasien...</div>
          ) : items.length === 0 ? (
            <div className="rounded border border-slate-200 bg-white p-6 text-center text-xs text-slate-400">{noRm ? "Tidak ada riwayat untuk filter ini." : "Pilih pasien untuk menampilkan riwayat."}</div>
          ) : tabAktif === "kunjungan" ? (
            <TabelRiwayat
              caption="Riwayat kunjungan pasien"
              kunciBaris={(item, indeks) => `${String(item.no_rawat)}-${indeks}`}
              kolom={[
                { judul: "No.", kunci: "no", lebar: "w-9", render: (_item, indeks) => String(indeks + 1) },
                { judul: "No. Rawat", kunci: "no_rawat", lebar: "whitespace-nowrap font-mono" },
                { judul: "Tanggal", kunci: "tanggal", lebar: "whitespace-nowrap" },
                { judul: "Jam", kunci: "jam", lebar: "whitespace-nowrap" },
                { judul: "Dokter", kunci: "nama_dokter" },
                { judul: "Poli", kunci: "nama_poli" },
                { judul: "Status", kunci: "status_lanjut", lebar: "whitespace-nowrap" },
                { judul: "Jenis Bayar", kunci: "jenis_bayar" },
                { judul: "Rujukan / DPJP / Kamar", kunci: "rujukan_internal", render: (item) => <span className="block max-w-80 whitespace-normal">{[item.rujukan_internal, item.dpjp_ranap, item.kamar].filter((nilai) => nilai && nilai !== "-").join(" · ") || "-"}</span> },
              ]}
              baris={items}
            />
          ) : tabAktif === "soapi" ? items.map((item, indeks) => (
            <div key={`${String(item.no_rawat)}-${indeks}`} className="space-y-1.5 rounded border border-slate-200 bg-white p-2">
              <RingkasanKunjungan item={item} />
              <Bagian judul="Pemeriksaan S.O.A.P.I.E">
                <TabelRiwayat
                  caption={`Pemeriksaan S.O.A.P.I.E ${String(item.no_rawat)}`}
                  kunciBaris={(baris, indeksBaris) => `${String(baris.sumber)}-${String(baris.tanggal)}-${String(baris.jam)}-${indeksBaris}`}
                  kolom={[
                    { judul: "Tanggal", kunci: "tanggal", lebar: "whitespace-nowrap" },
                    { judul: "Jam", kunci: "jam", lebar: "whitespace-nowrap" },
                    { judul: "Sumber", kunci: "sumber", lebar: "whitespace-nowrap" },
                    { judul: "Petugas", kunci: "petugas" },
                    { judul: "Vital", kunci: "vital", render: (baris) => <span className="block max-w-64 truncate" title={teks(baris.vital)}>{teks(baris.vital)}</span> },
                    { judul: "S", kunci: "subjek", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.subjek)}>{teks(baris.subjek)}</span> },
                    { judul: "O", kunci: "objek", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.objek)}>{teks(baris.objek)}</span> },
                    { judul: "A", kunci: "asesmen", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.asesmen)}>{teks(baris.asesmen)}</span> },
                    { judul: "P", kunci: "plan", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.plan)}>{teks(baris.plan)}</span> },
                    { judul: "Instruksi", kunci: "instruksi", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.instruksi)}>{teks(baris.instruksi)}</span> },
                    { judul: "Evaluasi", kunci: "evaluasi", render: (baris) => <span className="block max-w-48 truncate" title={teks(baris.evaluasi)}>{teks(baris.evaluasi)}</span> },
                  ]}
                  baris={(item.detail as BarisRiwayat[]) || []}
                />
              </Bagian>
            </div>
          )) : tabAktif === "perawatan" ? items.map((item, indeks) => {
            const sections = (item.sections || {}) as Record<string, BarisRiwayat[]>;
            const tindakanDipilih = Object.keys(TINDAKAN_BAGIAN).filter((label) => bagianTerpilih.has(label));
            const tindakanBaris = sections.tindakan || [];
            const tindakanTerfilter = tindakanDipilih.length === Object.keys(TINDAKAN_BAGIAN).length
              ? tindakanBaris
              : tindakanBaris.filter((baris) => tindakanDipilih.some((label) => TINDAKAN_BAGIAN[label](baris)));
            const tampilSep = bagianTerpilih.has("SEP BPJS") && (sections.sep || []).length > 0;
            const tampilTindakan = tindakanDipilih.length > 0 && tindakanTerfilter.length > 0;
            const tampilKamar = bagianTerpilih.has("Penggunaan Kamar") && (sections.kamar || []).length > 0;
            const tampilDiagnosa = bagianTerpilih.has("Diagnosa/Penyakit (ICD 10)") && (sections.diagnosa || []).length > 0;
            const tampilProsedur = bagianTerpilih.has("Prosedur/Tindakan (ICD 9)") && (sections.prosedur || []).length > 0;
            const tampilResume = bagianTerpilih.has("Resume") && (sections.resume || []).length > 0;
            const adaBagian = tampilSep || tampilTindakan || tampilKamar || tampilDiagnosa || tampilProsedur || tampilResume;
            return (
              <div key={`${String(item.no_rawat)}-${indeks}`} className="space-y-2 rounded border border-slate-200 bg-white p-2">
                <RingkasanKunjungan item={item} />
                <div className="grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-4">
                  <div className="rounded border border-slate-200 bg-slate-50 p-2">Tindakan<br /><strong className="font-mono text-slate-800">{rupiah(item.total_tindakan)}</strong></div>
                  <div className="rounded border border-slate-200 bg-slate-50 p-2">Kamar<br /><strong className="font-mono text-slate-800">{rupiah(item.total_kamar)}</strong></div>
                  <div className="rounded border border-slate-200 bg-slate-50 p-2">Registrasi<br /><strong className="font-mono text-slate-800">{rupiah(item.biaya_registrasi)}</strong></div>
                  <div className="rounded border border-slate-200 bg-slate-50 p-2">Total<br /><strong className="font-mono text-slate-800">{rupiah(item.total_biaya)}</strong></div>
                </div>
                {!adaBagian && <div className="rounded border border-slate-200 bg-slate-50 p-3 text-center text-[11px] text-slate-400">Pilih bagian di sidebar untuk menampilkan detail.</div>}
                {tampilSep && <Bagian judul="SEP BPJS">
                  <TabelRiwayat caption="SEP BPJS" kunciBaris={(baris, indeksBaris) => `${String(baris.nomor)}-${indeksBaris}`} kolom={[
                    { judul: "No. SEP", kunci: "nomor", lebar: "whitespace-nowrap font-mono" },
                    { judul: "Tanggal", kunci: "tanggal", lebar: "whitespace-nowrap" },
                    { judul: "Diagnosa", kunci: "diagnosa" },
                    { judul: "Poli", kunci: "poli" },
                    { judul: "DPJP", kunci: "dpjp" },
                  ]} baris={sections.sep || []} />
                </Bagian>}
                {tampilTindakan && <Bagian judul="Tindakan / Perawatan">
                  <TabelRiwayat caption="Tindakan dan perawatan" kunciBaris={(baris, indeksBaris) => `${String(baris.sumber)}-${String(baris.kode)}-${String(baris.tanggal)}-${String(baris.jam)}-${indeksBaris}`} kolom={[
                    { judul: "Tanggal", kunci: "tanggal", lebar: "whitespace-nowrap" },
                    { judul: "Jam", kunci: "jam", lebar: "whitespace-nowrap" },
                    { judul: "Sumber", kunci: "sumber", lebar: "whitespace-nowrap" },
                    { judul: "Jenis", kunci: "jenis" },
                    { judul: "Kode", kunci: "kode", lebar: "font-mono" },
                    { judul: "Nama", kunci: "nama" },
                    { judul: "Pelaksana", kunci: "pelaksana", render: (baris) => [baris.nama_dokter, baris.petugas].filter((nilai) => nilai && nilai !== "-").join(" · ") || "-" },
                    { judul: "Biaya", kunci: "biaya", lebar: "whitespace-nowrap text-right font-mono", render: (baris) => rupiah(baris.biaya) },
                  ]} baris={tindakanTerfilter} />
                </Bagian>}
                {tampilKamar && <Bagian judul="Penggunaan Kamar">
                  <TabelRiwayat caption="Riwayat kamar inap" kunciBaris={(baris, indeksBaris) => `${String(baris.kode)}-${String(baris.tanggal_masuk)}-${indeksBaris}`} kolom={[
                    { judul: "Kamar", kunci: "kode", lebar: "font-mono" },
                    { judul: "Bangsal", kunci: "nama" },
                    { judul: "Masuk", kunci: "tanggal_masuk", lebar: "whitespace-nowrap" },
                    { judul: "Keluar", kunci: "tanggal_keluar", lebar: "whitespace-nowrap" },
                    { judul: "Lama", kunci: "lama", lebar: "whitespace-nowrap" },
                    { judul: "Status", kunci: "status" },
                    { judul: "Biaya", kunci: "biaya", lebar: "whitespace-nowrap text-right font-mono", render: (baris) => rupiah(baris.biaya) },
                  ]} baris={sections.kamar || []} />
                </Bagian>}
                {(tampilDiagnosa || tampilProsedur) && <div className="grid gap-2 lg:grid-cols-2">
                  {tampilDiagnosa && <Bagian judul="Diagnosa/Penyakit (ICD 10)">
                    <TabelRiwayat caption="Diagnosa pasien" kunciBaris={(baris, indeksBaris) => `${String(baris.kode)}-${indeksBaris}`} kolom={[
                      { judul: "Kode", kunci: "kode", lebar: "font-mono" },
                      { judul: "Nama Penyakit", kunci: "nama" },
                      { judul: "Status", kunci: "status", lebar: "whitespace-nowrap" },
                      { judul: "Prioritas", kunci: "prioritas", lebar: "w-16" },
                    ]} baris={sections.diagnosa || []} />
                  </Bagian>}
                  {tampilProsedur && <Bagian judul="Prosedur/Tindakan (ICD 9)">
                    <TabelRiwayat caption="Prosedur pasien" kunciBaris={(baris, indeksBaris) => `${String(baris.kode)}-${indeksBaris}`} kolom={[
                      { judul: "Kode", kunci: "kode", lebar: "font-mono" },
                      { judul: "Nama Prosedur", kunci: "nama" },
                      { judul: "Status", kunci: "status", lebar: "whitespace-nowrap" },
                      { judul: "Jumlah", kunci: "jumlah", lebar: "w-16" },
                    ]} baris={sections.prosedur || []} />
                  </Bagian>}
                </div>}
                {tampilResume && <Bagian judul="Resume">
                  <TabelRiwayat caption="Resume pasien" kunciBaris={(baris, indeksBaris) => `${String(baris.dokter)}-${indeksBaris}`} kolom={[
                    { judul: "Dokter", kunci: "dokter" },
                    { judul: "Kondisi", kunci: "kondisi_pulang", lebar: "whitespace-nowrap" },
                    { judul: "Keluhan Utama", kunci: "keluhan_utama" },
                    { judul: "Jalannya Penyakit", kunci: "jalannya_penyakit" },
                    { judul: "Diagnosa", kunci: "diagnosa_utama" },
                    { judul: "Obat Pulang", kunci: "obat_pulang" },
                  ]} baris={sections.resume || []} />
                </Bagian>}
              </div>
            );
          }) : tabAktif === "pembelian" || tabAktif === "piutang" ? items.map((item, indeks) => (
            <div key={`${String(item.nomor)}-${indeks}`} className="space-y-1.5 rounded border border-slate-200 bg-white p-2">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 rounded border border-slate-200 bg-slate-50/60 p-2 text-[11px] sm:grid-cols-4 lg:grid-cols-7">
                <div><span className="text-slate-500">Nota: </span><span className="font-mono text-slate-800">{teks(item.nomor)}</span></div>
                <div><span className="text-slate-500">Tanggal: </span><span className="text-slate-800">{teks(item.tanggal)}</span></div>
                {tabAktif === "piutang" && <div><span className="text-slate-500">Tempo: </span><span className="text-slate-800">{teks(item.jatuh_tempo)}</span></div>}
                <div><span className="text-slate-500">Petugas: </span><span className="text-slate-800">{teks(item.petugas)}</span></div>
                <div><span className="text-slate-500">Jenis: </span><span className="text-slate-800">{teks(item.jenis)}</span></div>
                <div><span className="text-slate-500">Asal: </span><span className="text-slate-800">{teks(item.asal_barang)}</span></div>
                <div><span className="text-slate-500">{tabAktif === "pembelian" ? "Cara Bayar" : "Sisa"}: </span><span className="text-slate-800">{tabAktif === "pembelian" ? teks(item.cara_bayar) : rupiah(item.sisapiutang)}</span></div>
              </div>
              <Bagian judul="Rincian Obat">
                <TabelRiwayat
                  caption={`Rincian obat ${String(item.nomor)}`}
                  kunciBaris={(baris, indeksBaris) => `${String(baris.kode)}-${indeksBaris}`}
                  kolom={[
                    { judul: "Kode", kunci: "kode", lebar: "font-mono" },
                    { judul: "Nama Barang", kunci: "nama" },
                    { judul: "Jumlah", kunci: "jumlah", lebar: "whitespace-nowrap text-right" },
                    { judul: "Satuan", kunci: "satuan", lebar: "whitespace-nowrap" },
                    { judul: "Harga", kunci: "harga", lebar: "whitespace-nowrap text-right font-mono", render: (baris) => rupiah(baris.harga) },
                    { judul: "Subtotal", kunci: "subtotal", lebar: "whitespace-nowrap text-right font-mono", render: (baris) => rupiah(baris.subtotal) },
                    { judul: "Total", kunci: "total", lebar: "whitespace-nowrap text-right font-mono", render: (baris) => rupiah(baris.total) },
                    { judul: "Aturan Pakai", kunci: "aturan_pakai" },
                    { judul: "No. Batch", kunci: "no_batch", lebar: "font-mono" },
                  ]}
                  baris={(item.detail as BarisRiwayat[]) || []}
                />
              </Bagian>
            </div>
          )) : (
            <TabelRiwayat
              caption="Riwayat retensi berkas pasien"
              kunciBaris={(item, indeks) => `${String(item.tanggal)}-${indeks}`}
              kolom={[
                { judul: "No.", kunci: "no", lebar: "w-9", render: (_item, indeks) => String(indeks + 1) },
                { judul: "Tanggal Retensi", kunci: "tanggal", lebar: "whitespace-nowrap" },
                { judul: "Terakhir Daftar", kunci: "terakhir_daftar", lebar: "whitespace-nowrap" },
                { judul: "Berkas", kunci: "berkas", lebar: "whitespace-nowrap" },
              ]}
              baris={items}
            />
          )}
          </div>
        </section>

        <PanelBawah
          tampilan="web"
          filterUtama={(
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              <fieldset className="flex flex-wrap items-center gap-2">
                <legend className="sr-only">Mode pencarian riwayat</legend>
                {(Object.keys(LABEL_MODE) as ModeRiwayat[]).filter(modeTersedia).map((nilai) => (
                  <label key={nilai} className="flex items-center gap-1 whitespace-nowrap">
                    <input type="radio" name="mode-riwayat" value={nilai} checked={mode === nilai} onChange={() => { setMode(nilai); setOffset(0); }} className="accent-primary-700" />
                    {LABEL_MODE[nilai]}
                  </label>
                ))}
              </fieldset>
              {mode === "tanggal" && <div className="flex items-center gap-1.5">
                <input aria-label="Tanggal riwayat mulai" type="date" value={tanggalAwal} onChange={(event) => setTanggalAwal(event.target.value)} className="h-7 w-32 rounded-md border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
                <span>s.d.</span>
                <input aria-label="Tanggal riwayat selesai" type="date" value={tanggalAkhir} onChange={(event) => setTanggalAkhir(event.target.value)} className="h-7 w-32 rounded-md border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
              </div>}
              {mode === "nomor" && <div className="flex min-w-64 items-center gap-1.5">
                <label htmlFor="nomor-riwayat" className="whitespace-nowrap">Nomor :</label>
                <input id="nomor-riwayat" value={nomor} onChange={(event) => setNomor(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") cari(); }} placeholder="No. rawat / nota" className="h-7 min-w-0 flex-1 rounded-full border border-slate-300 px-2.5 text-xs focus:border-primary-600 focus:outline-none" />
              </div>}
              <button type="button" onClick={cari} disabled={!noRm || nomorTidakAda || memuatTampil} aria-label="Cari riwayat" title="Cari riwayat" className="flex h-7 min-w-20 items-center justify-center gap-1.5 rounded-full bg-slate-50 px-3 font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-40">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5 text-primary-700" />Cari
              </button>
            </div>
          )}
          onCetak={() => window.print()}
          disabledCetak={!noRm || items.length === 0}
          onKembali={onTutup}
          labelKembali="Keluar"
          tampilkanRecord={false}
          memuat={memuatTampil}
          pagination={(
            <>
              <span>{items.length} dari {total} riwayat · Halaman {halamanSaatIni} / {jumlahHalaman}</span>
              <button type="button" disabled={offset <= 0 || memuatTampil} onClick={() => setOffset((nilai) => Math.max(0, nilai - limit))} aria-label="Halaman sebelumnya" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white disabled:opacity-40"><FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" /></button>
              <button type="button" disabled={mode === "terakhir" || offset + limit >= total || memuatTampil} onClick={() => setOffset((nilai) => nilai + limit)} aria-label="Halaman berikutnya" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white disabled:opacity-40"><FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" /></button>
            </>
          )}
        />
      </div>
    </div>
  );
  return tampilan === "dialog" ? createPortal(konten, document.body) : konten;
}

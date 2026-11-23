"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/components/auth/AuthContext";
import { KonfirmasiDialog } from "@/components/common/KonfirmasiDialog";
import { Toast, type ToastTipe } from "@/components/common/Toast";
import { PanelBawah } from "@/components/modul/PanelBawah";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { registrationDate } from "@/lib/registrasi/date";

interface Kunjungan {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  umurdaftar: number | string;
  sttsumur: string;
  tgl_registrasi: string;
  jam_reg: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_poli: string;
  nm_poli: string;
  png_jawab: string;
  status_bayar: string;
  pasien_ranap: number | string;
}

interface ObatKatalog {
  kode_brng: string;
  nama_brng: string;
  kode_sat: string;
  jenis: string;
  komposisi: string;
  harga_ralan: number | string;
  industri: string;
  kapasitas: number | string;
  stok: number | string;
}

interface ObatResep extends ObatKatalog {
  jumlah: string;
  aturan_pakai: string;
}

interface BahanRacikan extends ObatKatalog {
  p1: string;
  p2: string;
  kandungan: string;
  jumlah: string;
}

interface Racikan {
  id: string;
  nama_racik: string;
  kd_racik: string;
  jumlah: string;
  aturan_pakai: string;
  keterangan: string;
  detail: BahanRacikan[];
}

interface MetodeRacik { kd_racik: string; nm_racik: string }
interface AturanPakai { aturan: string }
interface ObatSumber {
  kode_brng: string;
  nama_brng: string;
  kode_sat: string;
  jenis: string;
  komposisi: string;
  harga_ralan: number | string;
  industri: string;
  kapasitas: number | string;
  stok: number | string;
  jumlah: string;
  aturan_pakai: string;
}
interface BahanSumber extends Omit<ObatSumber, "aturan_pakai"> {
  p1: string;
  p2: string;
  kandungan: string;
}
interface RacikanSumber {
  kd_racik: string;
  nama_racik: string;
  jumlah: string;
  aturan_pakai: string;
  keterangan: string;
  detail: BahanSumber[];
}
interface ResepSumber {
  header: { status: "ralan" | "ranap" };
  obat: ObatSumber[];
  racikan: RacikanSumber[];
}
type TargetAturanPakai = { jenis: "obat"; kode: string } | { jenis: "racikan" };
type SumberDraft = { jenis: "copy" | "edit"; no_resep: string };

interface DraftObat extends ObatKatalog {
  jumlah: number | string;
  aturan_pakai: string;
  status_barang: number | string;
}

interface DraftBahan extends ObatKatalog {
  no_racik: string;
  p1: number | string;
  p2: number | string;
  kandungan: string;
  jumlah: number | string;
  status_barang: number | string;
}

interface DraftRacikan {
  no_racik: string;
  nama_racik: string;
  kd_racik: string;
  jumlah: number | string;
  aturan_pakai: string;
  keterangan: string;
  detail: DraftBahan[];
}

interface DraftResep {
  sumber: {
    no_resep: string;
    tgl_peresepan: string;
    jam_peresepan: string;
    status_pelayanan: "Belum Terlayani" | "Sudah Terlayani";
  };
  obat: DraftObat[];
  racikan: DraftRacikan[];
}
const racikanKosong = () => ({
  nama_racik: "",
  kd_racik: "",
  jumlah: "",
  aturan_pakai: "",
  keterangan: "",
});

const obatDariSumber = (item: ObatSumber): ObatResep => ({
  kode_brng: item.kode_brng,
  nama_brng: item.nama_brng,
  kode_sat: item.kode_sat,
  jenis: item.jenis || "-",
  komposisi: item.komposisi || "-",
  harga_ralan: item.harga_ralan,
  industri: item.industri || "-",
  kapasitas: item.kapasitas,
  stok: item.stok,
  jumlah: item.jumlah,
  aturan_pakai: item.aturan_pakai,
});

const bahanDariSumber = (item: BahanSumber): BahanRacikan => ({
  kode_brng: item.kode_brng,
  nama_brng: item.nama_brng,
  kode_sat: item.kode_sat,
  jenis: item.jenis || "-",
  komposisi: item.komposisi || "-",
  harga_ralan: item.harga_ralan,
  industri: item.industri || "-",
  kapasitas: item.kapasitas,
  stok: item.stok,
  p1: item.p1,
  p2: item.p2,
  kandungan: item.kandungan,
  jumlah: item.jumlah,
});

function gabungkanKatalog(...daftar: ObatKatalog[][]) {
  const hasil = new Map<string, ObatKatalog>();
  for (const item of daftar.flat()) {
    if (item.kode_brng && !hasil.has(item.kode_brng)) hasil.set(item.kode_brng, item);
  }
  return [...hasil.values()];
}

function jamJayapura() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jayapura",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

function pesanDari(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function HalamanInputResep() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const jalurRawatJalan = pathname.startsWith("/rawat-jalan/");
  const jalurInputResep = jalurRawatJalan ? "/rawat-jalan/input-resep" : "/farmasi/resep-obat";
  const [kunjungan, setKunjungan] = useState<Kunjungan | null>(null);
  const [cariKunjungan, setCariKunjungan] = useState("");
  const [hasilKunjungan, setHasilKunjungan] = useState<Kunjungan[]>([]);
  const [memuatKunjungan, setMemuatKunjungan] = useState(false);
  const [tanggal, setTanggal] = useState(registrationDate());
  const [jam, setJam] = useState(jamJayapura);
  const [jamOtomatis, setJamOtomatis] = useState(true);
  const [modeInput, setModeInput] = useState<"nonracikan" | "racikan">("nonracikan");
  const [cariObat, setCariObat] = useState("");
  const [katalog, setKatalog] = useState<ObatKatalog[]>([]);
  const [katalogSumber, setKatalogSumber] = useState<ObatKatalog[]>([]);
  const katalogDraftRef = useRef<ObatKatalog[]>([]);
  const [memuatObat, setMemuatObat] = useState(false);
  const [memuatObatBerikutnya, setMemuatObatBerikutnya] = useState(false);
  const [offsetObat, setOffsetObat] = useState(0);
  const [adaObatBerikutnya, setAdaObatBerikutnya] = useState(false);
  const [totalObat, setTotalObat] = useState(0);
  const [katalogDimuat, setKatalogDimuat] = useState(false);
  const [obat, setObat] = useState<ObatResep[]>([]);
  const [bahan, setBahan] = useState<BahanRacikan[]>([]);
  const [racikan, setRacikan] = useState<Racikan[]>([]);
  const [draftRacikan, setDraftRacikan] = useState(racikanKosong);
  const [metode, setMetode] = useState<MetodeRacik[]>([]);
  const [targetAturanPakai, setTargetAturanPakai] = useState<TargetAturanPakai | null>(null);
  const [cariAturanPakai, setCariAturanPakai] = useState("");
  const [aturanPakai, setAturanPakai] = useState<AturanPakai[]>([]);
  const [memuatAturanPakai, setMemuatAturanPakai] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [sumberDraft, setSumberDraft] = useState<SumberDraft | null>(null);
  const [draftDimuat, setDraftDimuat] = useState(false);
  const [memuatDraft, setMemuatDraft] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [toast, setToast] = useState<{ pesan: string; tipe: ToastTipe } | null>(null);

  const tampilkanToast = useCallback((pesan: string, tipe: ToastTipe = "info") => {
    setToast({ pesan, tipe });
  }, []);

  useEffect(() => {
    if (!jamOtomatis) return;
    const perbaruiWaktu = () => {
      const sekarang = new Date();
      setTanggal(registrationDate(sekarang));
      setJam(jamJayapura());
    };
    perbaruiWaktu();
    const timer = setInterval(perbaruiWaktu, 1000);
    return () => clearInterval(timer);
  }, [jamOtomatis]);

  const pilihKunjungan = useCallback((item: Kunjungan) => {
    setKunjungan(item);
    setCariKunjungan(item.no_rawat);
    setHasilKunjungan([]);
    setCariObat("");
    setKatalog([]);
    setKatalogSumber([]);
    katalogDraftRef.current = [];
    setTotalObat(0);
    setObat([]);
    setBahan([]);
    setRacikan([]);
    setDraftRacikan(racikanKosong());
    setDraftDimuat(false);
    setKatalogDimuat(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const parameter = new URLSearchParams(window.location.search);
    const noRawat = parameter.get("no_rawat")?.trim() || "";
    const dariNoResep = parameter.get("dari_no_resep")?.trim() || "";
    if (!noRawat || noRawat.length > 17) return;
    const controller = new AbortController();
    async function muatPilihanAwal() {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&no_rawat=${encodeURIComponent(noRawat)}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat kunjungan");
        const item = json.data?.[0];
        if (!item) throw new Error("Kunjungan rawat jalan tidak ditemukan.");
        const params = new URLSearchParams(window.location.search);
        const edit = params.get("edit_resep")?.trim().slice(0, 14) || "";
        const copy = params.get("salin_dari")?.trim().slice(0, 14) || "";
        if (edit) setSumberDraft({ jenis: "edit", no_resep: edit });
        else if (copy) setSumberDraft({ jenis: "copy", no_resep: copy });
        pilihKunjungan(item);
        if (!dariNoResep || dariNoResep.length > 14) return;
        const sumberResponse = await fetch(`/api/farmasi/copy-resep?no_resep=${encodeURIComponent(dariNoResep)}`, { signal: controller.signal, cache: "no-store" });
        const sumberJson: { success?: boolean; data?: ResepSumber; error?: string } = await sumberResponse.json();
        if (!sumberResponse.ok || !sumberJson.success || !sumberJson.data) throw new Error(sumberJson.error || "Gagal memuat resep sumber");
        const sumber = sumberJson.data;
        if (sumber.header.status !== "ralan") throw new Error("Copy resep rawat inap belum tersedia di Khanza Web.");
        const obatSumber = sumber.obat.map(obatDariSumber);
        setObat(obatSumber);
        setKatalogSumber(obatSumber);
        setBahan([]);
        setRacikan(sumber.racikan.map((racikan) => ({
          id: crypto.randomUUID(),
          nama_racik: racikan.nama_racik,
          kd_racik: racikan.kd_racik,
          jumlah: racikan.jumlah,
          aturan_pakai: racikan.aturan_pakai,
          keterangan: racikan.keterangan,
          detail: racikan.detail.map(bahanDariSumber),
        })));
        tampilkanToast(`Resep ${dariNoResep} berhasil dimuat. Periksa kembali obat, jumlah, dan aturan pakai.`, "sukses");
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }
    void muatPilihanAwal();
    return () => controller.abort();
  }, [isAuthenticated, pilihKunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated || kunjungan || cariKunjungan.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatKunjungan(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=kunjungan&cari=${encodeURIComponent(cariKunjungan.trim())}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: Kunjungan[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal mencari kunjungan");
        setHasilKunjungan(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal mencari kunjungan"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatKunjungan(false);
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariKunjungan, isAuthenticated, kunjungan, tampilkanToast]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    async function muatMetode() {
      try {
        const response = await fetch("/api/farmasi/resep-obat?resource=metode", { signal: controller.signal });
        const json: { success?: boolean; data?: MetodeRacik[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat metode racikan");
        setMetode(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat metode racikan"), "error");
      }
    }
    void muatMetode();
    return () => controller.abort();
  }, [isAuthenticated, tampilkanToast]);

  useEffect(() => {
    if (!targetAturanPakai) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatAturanPakai(true);
      try {
        const response = await fetch(`/api/farmasi/resep-obat?resource=aturan-pakai&cari=${encodeURIComponent(cariAturanPakai.trim())}`, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: AturanPakai[]; error?: string } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat aturan pakai");
        setAturanPakai(json.data || []);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat aturan pakai"), "error");
      } finally {
        if (!controller.signal.aborted) setMemuatAturanPakai(false);
      }
    }, cariAturanPakai ? 180 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariAturanPakai, targetAturanPakai, tampilkanToast]);

  useEffect(() => {
    if (!targetAturanPakai) return;
    const tutupDenganEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTargetAturanPakai(null);
    };
    window.addEventListener("keydown", tutupDenganEscape);
    return () => window.removeEventListener("keydown", tutupDenganEscape);
  }, [targetAturanPakai]);

  useEffect(() => {
    if (!kunjungan) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setMemuatObat(true);
      setKatalogDimuat(false);
      setOffsetObat(0);
      setAdaObatBerikutnya(false);
      setTotalObat(0);
      try {
        const url = `/api/farmasi/resep-obat?resource=obat&no_rawat=${encodeURIComponent(kunjungan.no_rawat)}&cari=${encodeURIComponent(cariObat.trim())}`;
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: ObatKatalog[]; error?: string; meta?: { hasMore?: boolean; total?: number } } = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat obat");
        const data = json.data || [];
        const gabungan = gabungkanKatalog(katalogSumber, data);
        setKatalog(gabungan);
        setKatalog(() => {
          const gabungan = new Map<string, ObatKatalog>();
          for (const item of [...katalogDraftRef.current, ...data]) gabungan.set(item.kode_brng, item);
          return [...gabungan.values()];
        });
        setOffsetObat(data.length);
        setAdaObatBerikutnya(Boolean(json.meta?.hasMore));
        const tambahan = gabungan.filter((item) => !data.some((baris) => baris.kode_brng === item.kode_brng)).length;
        setTotalObat(Number(json.meta?.total || 0) + tambahan);
      } catch (error) {
        if (!controller.signal.aborted) tampilkanToast(pesanDari(error, "Gagal memuat obat"), "error");
      } finally {
        if (!controller.signal.aborted) {
          setMemuatObat(false);
          setKatalogDimuat(true);
        }
      }
    }, cariObat ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [cariObat, katalogSumber, kunjungan, tampilkanToast]);

  useEffect(() => {
    if (!kunjungan || !sumberDraft || !katalogDimuat || draftDimuat) return;
    const controller = new AbortController();
    async function muatDraft() {
      setMemuatDraft(true);
      try {
        const url = new URL("/api/farmasi/copy-resep", window.location.origin);
        url.searchParams.set("resource", "draft");
        url.searchParams.set("no_rawat", kunjungan!.no_rawat);
        url.searchParams.set("no_resep", sumberDraft!.no_resep);
        const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
        const json: { success?: boolean; data?: DraftResep; error?: string } = await response.json();
        if (!response.ok || !json.success || !json.data) throw new Error(json.error || "Gagal memuat isi resep");
        const draft = json.data;
        if (sumberDraft!.jenis === "edit" && draft.sumber.status_pelayanan === "Sudah Terlayani") {
          throw new Error("Resep sudah tervalidasi dan tidak dapat diubah.");
        }

        let itemPerluKoreksi = 0;
        const obatDraft: ObatResep[] = draft.obat.map((item) => {
          const jumlahAman = Number(item.status_barang) === 1 && Number(item.stok) >= Number(item.jumlah)
            ? String(item.jumlah)
            : "";
          if (!jumlahAman) itemPerluKoreksi += 1;
          return { ...item, jumlah: jumlahAman, aturan_pakai: item.aturan_pakai || "" };
        });
        const racikanDraft: Racikan[] = draft.racikan.map((item) => ({
          id: crypto.randomUUID(),
          nama_racik: item.nama_racik,
          kd_racik: item.kd_racik,
          jumlah: String(item.jumlah),
          aturan_pakai: item.aturan_pakai,
          keterangan: item.keterangan,
          detail: item.detail.map((baris) => {
            const jumlahAman = Number(baris.status_barang) === 1 && Number(baris.stok) >= Number(baris.jumlah)
              ? String(baris.jumlah)
              : "";
            if (!jumlahAman) itemPerluKoreksi += 1;
            return {
              ...baris,
              p1: baris.p1 == null ? "" : String(baris.p1),
              p2: baris.p2 == null ? "" : String(baris.p2),
              kandungan: baris.kandungan || "",
              jumlah: jumlahAman,
            };
          }),
        }));
        const katalogDraft = [...draft.obat, ...draft.racikan.flatMap((item) => item.detail)];
        katalogDraftRef.current = katalogDraft;
        setKatalog((lama) => {
          const gabungan = new Map<string, ObatKatalog>();
          for (const item of [...katalogDraft, ...lama]) gabungan.set(item.kode_brng, item);
          return [...gabungan.values()];
        });
        setObat(obatDraft);
        setRacikan(racikanDraft);
        setBahan([]);
        setDraftRacikan(racikanKosong());
        if (sumberDraft!.jenis === "edit") {
          setTanggal(draft.sumber.tgl_peresepan);
          setJam(draft.sumber.jam_peresepan);
          setJamOtomatis(false);
        }
        setDraftDimuat(true);
        if (itemPerluKoreksi > 0) {
          tampilkanToast(`${itemPerluKoreksi} item tidak aktif atau stoknya tidak mencukupi. Periksa dan isi ulang jumlahnya.`, "info");
        } else {
          tampilkanToast(sumberDraft!.jenis === "copy" ? `Isi resep ${draft.sumber.no_resep} siap disalin.` : `Resep ${draft.sumber.no_resep} siap diubah.`, "sukses");
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setDraftDimuat(true);
          tampilkanToast(pesanDari(error, "Gagal memuat isi resep"), "error");
        }
      } finally {
        if (!controller.signal.aborted) setMemuatDraft(false);
      }
    }
    void muatDraft();
    return () => controller.abort();
  }, [draftDimuat, katalogDimuat, kunjungan, sumberDraft, tampilkanToast]);

  const muatObatBerikutnya = async () => {
    if (!kunjungan || !adaObatBerikutnya || memuatObat || memuatObatBerikutnya) return;
    setMemuatObatBerikutnya(true);
    const offsetSaatIni = offsetObat;
    try {
      const url = `/api/farmasi/resep-obat?resource=obat&no_rawat=${encodeURIComponent(kunjungan.no_rawat)}&cari=${encodeURIComponent(cariObat.trim())}&offset=${offsetSaatIni}`;
      const response = await fetch(url, { cache: "no-store" });
      const json: { success?: boolean; data?: ObatKatalog[]; error?: string; meta?: { hasMore?: boolean } } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Gagal memuat obat berikutnya");
      const data = json.data || [];
      setKatalog((lama) => gabungkanKatalog(lama, data));
      setOffsetObat(offsetSaatIni + data.length);
      setAdaObatBerikutnya(Boolean(json.meta?.hasMore));
    } catch (error) {
      tampilkanToast(pesanDari(error, "Gagal memuat obat berikutnya"), "error");
    } finally {
      setMemuatObatBerikutnya(false);
    }
  };

  const bukaPemilihAturan = (target: TargetAturanPakai) => {
    setCariAturanPakai("");
    setAturanPakai([]);
    setTargetAturanPakai(target);
  };

  const pilihAturanPakai = (aturan: string) => {
    if (targetAturanPakai?.jenis === "obat") {
      setObat((lama) => lama.map((baris) => baris.kode_brng === targetAturanPakai.kode ? { ...baris, aturan_pakai: aturan } : baris));
    } else if (targetAturanPakai?.jenis === "racikan") {
      setDraftRacikan((lama) => ({ ...lama, aturan_pakai: aturan }));
    }
    setTargetAturanPakai(null);
  };

  const tambahDariKatalog = (item: ObatKatalog) => {
    if (modeInput === "nonracikan") {
      if (obat.some((baris) => baris.kode_brng === item.kode_brng)) return tampilkanToast("Obat sudah ada dalam resep nonracikan.", "info");
      setObat((lama) => [...lama, { ...item, jumlah: "", aturan_pakai: "" }]);
      return;
    }
    if (bahan.some((baris) => baris.kode_brng === item.kode_brng)) return tampilkanToast("Obat sudah ada dalam racikan aktif.", "info");
    setBahan((lama) => [...lama, { ...item, p1: "", p2: "", kandungan: "", jumlah: "" }]);
  };

  const tambahRacikan = () => {
    if (!draftRacikan.nama_racik.trim() || !draftRacikan.kd_racik || Number(draftRacikan.jumlah) <= 0 || !draftRacikan.aturan_pakai.trim()) {
      return tampilkanToast("Lengkapi nama, metode, jumlah, dan aturan pakai racikan.", "error");
    }
    if (bahan.length === 0 || bahan.some((item) => Number(item.jumlah) <= 0)) {
      return tampilkanToast("Tambahkan bahan racikan dan isi jumlah setiap bahan.", "error");
    }
    setRacikan((lama) => [...lama, { id: crypto.randomUUID(), ...draftRacikan, detail: bahan }]);
    setDraftRacikan(racikanKosong());
    setBahan([]);
  };

  const resetForm = () => {
    setKunjungan(null);
    setCariKunjungan("");
    setHasilKunjungan([]);
    setTanggal(registrationDate());
    setJam(jamJayapura());
    setJamOtomatis(true);
    setModeInput("nonracikan");
    setCariObat("");
    setKatalog([]);
    setKatalogSumber([]);
    katalogDraftRef.current = [];
    setMemuatObat(false);
    setMemuatObatBerikutnya(false);
    setOffsetObat(0);
    setAdaObatBerikutnya(false);
    setTotalObat(0);
    setKatalogDimuat(false);
    setObat([]);
    setBahan([]);
    setRacikan([]);
    setDraftRacikan(racikanKosong());
    setTargetAturanPakai(null);
    setCariAturanPakai("");
    setAturanPakai([]);
    setSumberDraft(null);
    setDraftDimuat(false);
    setKonfirmasi(false);
    router.replace(jalurInputResep);
  };

  const editRacikan = (item: Racikan) => {
    setModeInput("racikan");
    setDraftRacikan({
      nama_racik: item.nama_racik,
      kd_racik: item.kd_racik,
      jumlah: item.jumlah,
      aturan_pakai: item.aturan_pakai,
      keterangan: item.keterangan,
    });
    setBahan(item.detail);
    setRacikan((lama) => lama.filter((baris) => baris.id !== item.id));
  };

  const mintaSimpan = () => {
    if (memuatDraft) return tampilkanToast("Isi resep sumber masih dimuat.", "info");
    if (!kunjungan) return tampilkanToast("Pilih kunjungan rawat jalan terlebih dahulu.", "error");
    if (Number(kunjungan.pasien_ranap)) return tampilkanToast("Pasien sudah masuk kamar inap; gunakan resep rawat inap.", "error");
    if (obat.length + racikan.length === 0) return tampilkanToast("Masukkan minimal satu obat atau racikan.", "error");
    if (obat.some((item) => Number(item.jumlah) <= 0)) return tampilkanToast("Jumlah obat nonracikan harus lebih dari nol.", "error");
    if (bahan.length > 0) return tampilkanToast("Selesaikan atau kosongkan racikan yang sedang disusun.", "error");
    setKonfirmasi(true);
  };

  const simpan = async () => {
    if (!kunjungan) return;
    const sedangEdit = sumberDraft?.jenis === "edit";
    setMenyimpan(true);
    try {
      const response = await fetch("/api/farmasi/resep-obat", {
        method: sedangEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(sedangEdit ? { no_resep: sumberDraft.no_resep } : {}),
          no_rawat: kunjungan.no_rawat,
          tanggal,
          jam,
          obat,
          racikan,
        }),
      });
      const json: { success?: boolean; message?: string; error?: string } = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Resep gagal disimpan");
      setKonfirmasi(false);
      setObat([]);
      setKatalogSumber([]);
      setRacikan([]);
      setBahan([]);
      setDraftRacikan(racikanKosong());
      katalogDraftRef.current = [];
      setSumberDraft(null);
      setDraftDimuat(false);
      router.replace(`${jalurInputResep}?no_rawat=${encodeURIComponent(kunjungan.no_rawat)}`);
      tampilkanToast(json.message || "Resep berhasil disimpan.", "sukses");
    } catch (error) {
      tampilkanToast(pesanDari(error, "Resep gagal disimpan"), "error");
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
      <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
        <div className="space-y-3 font-sans text-xs font-normal text-slate-700">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 xl:flex-1">
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]" role="group" aria-label="Kunjungan pasien">
            <label htmlFor="no-rawat-resep" className="whitespace-nowrap sm:text-right">No. Rawat :</label>
            <div className="relative flex min-w-0 flex-wrap items-center gap-2">
              <input
                id="no-rawat-resep"
                value={cariKunjungan}
                onChange={(event) => {
                  setCariKunjungan(event.target.value);
                  setKunjungan(null);
                  setHasilKunjungan([]);
                  setObat([]);
                  setKatalogSumber([]);
                  setBahan([]);
                  setRacikan([]);
                }}
                placeholder="No. rawat, RM, atau nama pasien"
                className="h-7 w-56 shrink-0 rounded-md border border-slate-300 bg-white px-2 font-mono text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
              />
              <input
                readOnly
                aria-label="Identitas pasien"
                value={kunjungan ? `${kunjungan.no_rkm_medis}  ${kunjungan.nm_pasien} (${kunjungan.jk}, ${kunjungan.umurdaftar} ${kunjungan.sttsumur})` : ""}
                placeholder="Identitas pasien"
                className="h-7 min-w-56 flex-1 rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-700"
              />
              {!kunjungan && (memuatKunjungan || hasilKunjungan.length > 0) && (
                <div className="absolute left-0 top-8 z-20 max-h-48 w-full max-w-2xl overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                  {memuatKunjungan ? (
                    <p className="p-2.5 text-slate-500">Mencari kunjungan...</p>
                  ) : hasilKunjungan.map((item) => (
                    <button key={item.no_rawat} type="button" onClick={() => pilihKunjungan(item)} className="block w-full border-b border-slate-100 px-3 py-2 text-left hover:bg-slate-50">
                      <span className="font-mono text-slate-800">{item.no_rawat} · {item.no_rkm_medis}</span>
                      <span className="block text-slate-600">{item.nm_pasien} · {item.nm_poli}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>

          <div className="xl:w-[31rem]">
          <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]" role="group" aria-label="Waktu resep">
            <label htmlFor="tanggal-resep" className="whitespace-nowrap sm:text-right">Tgl. Resep :</label>
            <div className="flex flex-wrap items-center gap-2">
              <input id="tanggal-resep" type="date" value={tanggal} onChange={(event) => { setJamOtomatis(false); setTanggal(event.target.value); }} className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" />
              <span className="text-slate-600">Jam :</span>
              <input aria-label="Jam resep" type="time" step="1" value={jam} onChange={(event) => { setJamOtomatis(false); setJam(event.target.value); }} className="h-7 w-32 shrink-0 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" />
              <label className="flex items-center gap-1 whitespace-nowrap text-[11px] text-slate-600" title="Perbarui tanggal dan jam secara otomatis">
                <input aria-label="Waktu otomatis" type="checkbox" checked={jamOtomatis} onChange={(event) => setJamOtomatis(event.target.checked)} className="accent-primary-700" />
              </label>
              {Number(kunjungan?.pasien_ranap) > 0 && <span className="font-semibold text-red-700">Pasien sudah masuk kamar inap.</span>}
            </div>
          </div>
          </div>

          <div className="min-w-0 xl:w-[22rem]">
          <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]" role="group" aria-label="Dokter peresep">
            <label htmlFor="dokter-resep" className="whitespace-nowrap sm:text-right">Peresep :</label>
            <input id="dokter-resep" readOnly aria-label="Nama dokter peresep" value={kunjungan?.nm_dokter || ""} className="h-7 w-full rounded-md border border-slate-300 bg-slate-50 px-2 text-xs text-slate-700" />
          </div>
          </div>
          </div>

          {sumberDraft && (
            <div className="grid grid-cols-1 items-center gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)]">
              <span className="whitespace-nowrap sm:text-right">Sumber :</span>
              <div className="flex h-7 items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-2 text-xs text-slate-700">
                <span className="font-mono text-slate-800">{sumberDraft.no_resep}</span>
                <span>{sumberDraft.jenis === "copy" ? "Salinan resep sebelumnya" : "Mode ubah resep"}</span>
                {memuatDraft && <span className="text-slate-500">Memuat...</span>}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
        <div role="tablist" aria-label="Jenis resep" className="flex shrink-0 border-b border-slate-200 px-2">
          {([['nonracikan', 'Umum'], ['racikan', 'Racikan']] as const).map(([id, label], index, daftar) => (
            <button
              key={id}
              id={`tab-resep-${id}`}
              type="button"
              role="tab"
              aria-selected={modeInput === id}
              aria-controls={`panel-resep-${id}`}
              tabIndex={modeInput === id ? 0 : -1}
              onClick={() => setModeInput(id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const arah = event.key === "ArrowRight" ? 1 : -1;
                const berikutnya = daftar[(index + arah + daftar.length) % daftar.length][0];
                setModeInput(berikutnya);
                requestAnimationFrame(() => document.getElementById(`tab-resep-${berikutnya}`)?.focus());
              }}
              className={`border-b-2 px-4 py-2 text-xs font-semibold ${modeInput === id ? "border-primary-600 text-primary-700" : "border-transparent text-slate-600"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {modeInput === "racikan" && (
          <div className="grid shrink-0 grid-cols-1 gap-2 border-b border-slate-200 bg-slate-50 p-2 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_8rem_1.2fr_1.2fr_auto]">
            <label className="text-[11px] text-slate-700">Nama Racikan
              <input value={draftRacikan.nama_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, nama_racik: event.target.value }))} placeholder={`Racikan ${racikan.length + 1}`} className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="text-[11px] text-slate-700">Metode
              <CustomSelect value={draftRacikan.kd_racik} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, kd_racik: event.target.value }))} className="mt-1 h-7 py-0.5 text-xs"><option value="">Pilih metode</option>{metode.map((item) => <option key={item.kd_racik} value={item.kd_racik}>{item.nm_racik}</option>)}</CustomSelect>
            </label>
            <label className="text-[11px] text-slate-700">Jumlah Jadi
              <input type="number" min="0" step="any" value={draftRacikan.jumlah} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, jumlah: event.target.value }))} className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <label className="text-[11px] text-slate-700">Aturan Pakai
              <div className="mt-1 flex min-w-0 items-center gap-1">
                <input value={draftRacikan.aturan_pakai} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, aturan_pakai: event.target.value }))} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); bukaPemilihAturan({ jenis: "racikan" }); } }} placeholder="Contoh: 3 x 1" className="h-7 min-w-0 flex-1 rounded border border-slate-300 px-2 text-left text-xs focus:border-primary-600 focus:outline-none" />
                <button type="button" onClick={() => bukaPemilihAturan({ jenis: "racikan" })} aria-label="Pilih aturan pakai racikan" title="Pilih aturan pakai" className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100"><FontAwesomeIcon icon={faList} className="h-3 w-3" /></button>
              </div>
            </label>
            <label className="text-[11px] text-slate-700">Keterangan
              <input value={draftRacikan.keterangan} onChange={(event) => setDraftRacikan((lama) => ({ ...lama, keterangan: event.target.value }))} placeholder="Contoh: Habiskan" className="mt-1 h-7 w-full rounded border border-slate-300 px-2 text-xs focus:border-primary-600 focus:outline-none" />
            </label>
            <button type="button" onClick={tambahRacikan} className="self-end rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-semibold text-white">Tambahkan Racikan</button>
          </div>
        )}

        {modeInput === "racikan" && racikan.length > 0 && (
          <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-slate-200 p-2">
            {racikan.map((item, index) => (
              <div key={item.id} className="flex min-w-72 items-start justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
                <div>
                  <p className="font-semibold text-slate-800">{index + 1}. {item.nama_racik}</p>
                  <p>{item.jumlah} · {item.aturan_pakai} · {item.detail.length} bahan</p>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => editRacikan(item)} aria-label={`Ubah racikan ${item.nama_racik}`} title="Ubah racikan" className="p-1 text-primary-700"><FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" /></button>
                  <button type="button" onClick={() => setRacikan((lama) => lama.filter((baris) => baris.id !== item.id))} aria-label={`Hapus racikan ${item.nama_racik}`} title="Hapus racikan" className="p-1 text-red-600"><FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          id={`panel-resep-${modeInput}`}
          role="tabpanel"
          aria-labelledby={`tab-resep-${modeInput}`}
          className="min-h-0 flex-1 overflow-auto"
          onScroll={(event) => {
            const target = event.currentTarget;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 320) void muatObatBerikutnya();
          }}
        >
          {modeInput === "nonracikan" ? (
            <table className="w-full min-w-[1320px] border-collapse text-center text-[11px] text-slate-700 [&_td]:!border-r-0 [&_th]:!border-r-0">
              <caption className="sr-only">Daftar obat umum yang tersedia di depo</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-10 border-b border-r border-slate-200 px-2 py-2 text-center">Pilih</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">Jumlah</th>
                  <th scope="col" className="w-64 border-b border-r border-slate-200 px-2 py-2">Aturan Pakai</th>
                  <th scope="col" className="w-32 border-b border-r border-slate-200 px-2 py-2">Kode Barang</th>
                  <th scope="col" className="min-w-[28rem] border-b border-r border-slate-200 px-2 py-2">Nama Barang</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">Satuan</th>
                  <th scope="col" className="w-48 border-b border-r border-slate-200 px-2 py-2">Komposisi</th>
                  <th scope="col" className="w-32 border-b border-r border-slate-200 px-2 py-2">Harga (Rp)</th>
                  <th scope="col" className="w-44 border-b border-r border-slate-200 px-2 py-2">Jenis Obat</th>
                  <th scope="col" className="w-44 border-b border-r border-slate-200 px-2 py-2">I.F.</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2">Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {!kunjungan ? (
                  <tr><td colSpan={11} className="p-10 text-center text-slate-400">Pilih kunjungan untuk memuat daftar obat.</td></tr>
                ) : memuatObat ? (
                  <tr><td colSpan={11} className="p-10 text-center text-slate-500">Memuat daftar obat...</td></tr>
                ) : katalog.length === 0 ? (
                  <tr><td colSpan={11} className="p-10 text-center text-slate-400">Obat tidak ditemukan.</td></tr>
                ) : katalog.map((item) => {
                  const terpilih = obat.find((baris) => baris.kode_brng === item.kode_brng);
                  return (
                    <tr key={item.kode_brng} className={terpilih ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center"><input type="checkbox" checked={Boolean(terpilih)} onChange={() => terpilih ? setObat((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng)) : tambahDariKatalog(item)} aria-label={`${terpilih ? "Hapus" : "Pilih"} ${item.nama_brng}`} className="h-4 w-4 accent-primary-600" /></td>
                      <td className="border-b border-r border-slate-100 px-1.5 py-1"><input disabled={!terpilih} aria-label={`Jumlah ${item.nama_brng}`} type="number" min="0" step="any" value={terpilih?.jumlah || ""} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, jumlah: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2 text-center text-xs disabled:border-transparent disabled:bg-transparent" /></td>
                      <td className="border-b border-r border-slate-100 px-1.5 py-1"><div className="flex min-w-0 items-center gap-1"><input disabled={!terpilih} aria-label={`Aturan pakai ${item.nama_brng}`} value={terpilih?.aturan_pakai || ""} onChange={(event) => setObat((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, aturan_pakai: event.target.value } : baris))} onKeyDown={(event) => { if (event.key === "ArrowRight" && terpilih) { event.preventDefault(); bukaPemilihAturan({ jenis: "obat", kode: item.kode_brng }); } }} placeholder={terpilih ? "Contoh: 3 x 1 sesudah makan" : ""} className="h-7 min-w-0 flex-1 rounded border border-slate-300 px-2 text-left text-xs disabled:border-transparent disabled:bg-transparent" /><button type="button" disabled={!terpilih} onClick={() => bukaPemilihAturan({ jenis: "obat", kode: item.kode_brng })} aria-label={`Pilih aturan pakai ${item.nama_brng}`} title="Pilih aturan pakai" className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 disabled:border-transparent disabled:bg-transparent disabled:text-slate-300"><FontAwesomeIcon icon={faList} className="h-3 w-3" /></button></div></td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.kode_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{item.nama_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.kode_sat}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.komposisi || "-"}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono tabular-nums">{Number.isFinite(Number(item.harga_ralan)) ? Number(item.harga_ralan).toLocaleString("id-ID") : "-"}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.jenis || "-"}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.industri || "-"}</td>
                      <td className="border-b border-slate-100 px-2 py-1.5 font-mono tabular-nums">{Number(item.stok).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
                {memuatObatBerikutnya && <tr><td colSpan={11} className="p-3 text-center text-slate-500">Memuat obat berikutnya...</td></tr>}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[1120px] border-collapse text-center text-[11px] text-slate-700 [&_td]:!border-r-0 [&_th]:!border-r-0">
              <caption className="sr-only">Daftar bahan obat untuk racikan aktif</caption>
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700">
                <tr>
                  <th scope="col" className="w-10 border-b border-r border-slate-200 px-2 py-2 text-center">Pilih</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">P1</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">P2</th>
                  <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2">Kandungan</th>
                  <th scope="col" className="w-28 border-b border-r border-slate-200 px-2 py-2">Jumlah</th>
                  <th scope="col" className="w-32 border-b border-r border-slate-200 px-2 py-2">Kode Barang</th>
                  <th scope="col" className="min-w-64 border-b border-r border-slate-200 px-2 py-2">Nama Barang</th>
                  <th scope="col" className="w-24 border-b border-r border-slate-200 px-2 py-2">Satuan</th>
                  <th scope="col" className="w-40 border-b border-r border-slate-200 px-2 py-2">Jenis Obat</th>
                  <th scope="col" className="w-24 border-b border-slate-200 px-2 py-2">Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {!kunjungan ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-400">Pilih kunjungan untuk memuat bahan racikan.</td></tr>
                ) : memuatObat ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-500">Memuat daftar obat...</td></tr>
                ) : katalog.length === 0 ? (
                  <tr><td colSpan={10} className="p-10 text-center text-slate-400">Obat tidak ditemukan.</td></tr>
                ) : katalog.map((item) => {
                  const terpilih = bahan.find((baris) => baris.kode_brng === item.kode_brng);
                  return (
                    <tr key={item.kode_brng} className={terpilih ? "bg-primary-100" : "bg-white hover:bg-slate-50/80"}>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-center"><input type="checkbox" checked={Boolean(terpilih)} onChange={() => terpilih ? setBahan((lama) => lama.filter((baris) => baris.kode_brng !== item.kode_brng)) : tambahDariKatalog(item)} aria-label={`${terpilih ? "Hapus" : "Pilih"} ${item.nama_brng}`} className="h-4 w-4 accent-primary-600" /></td>
                      {(['p1', 'p2', 'kandungan', 'jumlah'] as const).map((kolom) => (
                        <td key={kolom} className="border-b border-r border-slate-100 px-1.5 py-1"><input disabled={!terpilih} aria-label={`${kolom} ${item.nama_brng}`} type={kolom === "kandungan" ? "text" : "number"} min={kolom === "kandungan" ? undefined : "0"} step="any" value={terpilih?.[kolom] || ""} onChange={(event) => setBahan((lama) => lama.map((baris) => baris.kode_brng === item.kode_brng ? { ...baris, [kolom]: event.target.value } : baris))} className="h-7 w-full rounded border border-slate-300 px-2 text-center text-xs disabled:border-transparent disabled:bg-transparent" /></td>
                      ))}
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 font-mono">{item.kode_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5 text-slate-800">{item.nama_brng}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.kode_sat}</td>
                      <td className="border-b border-r border-slate-100 px-2 py-1.5">{item.jenis || "-"}</td>
                      <td className="border-b border-slate-100 px-2 py-1.5 font-mono tabular-nums">{Number(item.stok).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
                {memuatObatBerikutnya && <tr><td colSpan={10} className="p-3 text-center text-slate-500">Memuat bahan berikutnya...</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <PanelBawah
        tampilan="web"
        onBaru={resetForm}
        kataKunci={cariObat}
        onGantiKataKunci={setCariObat}
        placeholderCari="Kode, nama, jenis, atau komposisi obat..."
        filterTambahan={(
          <div className="flex shrink-0 items-center gap-1.5">
            <label htmlFor="tarif-resep" className="whitespace-nowrap">Tarif :</label>
            <CustomSelect id="tarif-resep" value="ralan" disabled aria-label="Tarif resep" className="h-7 w-32 py-0.5 text-xs"><option value="ralan">Rawat Jalan</option></CustomSelect>
          </div>
        )}
        onSimpan={sumberDraft?.jenis === "edit" ? undefined : mintaSimpan}
        onGanti={sumberDraft?.jenis === "edit" ? mintaSimpan : undefined}
        disabledSimpan={menyimpan || memuatDraft || !kunjungan || obat.length + racikan.length === 0}
        disabledGanti={menyimpan || memuatDraft || !kunjungan || obat.length + racikan.length === 0}
        memuat={menyimpan || memuatDraft}
        jumlahRecord={totalObat}
      />
      {targetAturanPakai && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-tertiary-950/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setTargetAturanPakai(null); }}>
          <div className="flex max-h-[min(34rem,calc(100vh-2rem))] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl" role="dialog" aria-modal="true" aria-labelledby="judul-pemilih-aturan">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
              <h2 id="judul-pemilih-aturan" className="text-xs font-semibold text-slate-800">Pilih Aturan Pakai</h2>
              <button type="button" onClick={() => setTargetAturanPakai(null)} aria-label="Tutup pemilih aturan pakai" title="Tutup" className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-700"><FontAwesomeIcon icon={faXmark} className="h-4 w-4" /></button>
            </div>
            <div className="border-b border-slate-200 p-3">
              <label htmlFor="cari-aturan-pakai" className="sr-only">Cari aturan pakai</label>
              <input id="cari-aturan-pakai" autoFocus value={cariAturanPakai} onChange={(event) => setCariAturanPakai(event.target.value)} placeholder="Cari aturan pakai..." className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none" />
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-2">
              {memuatAturanPakai ? <p className="p-6 text-center text-xs text-slate-500">Memuat aturan pakai...</p> : aturanPakai.length === 0 ? <p className="p-6 text-center text-xs text-slate-500">Aturan pakai tidak ditemukan.</p> : (
                <ul className="divide-y divide-slate-100" aria-label="Daftar aturan pakai">
                  {aturanPakai.map((item) => <li key={item.aturan}><button type="button" onClick={() => pilihAturanPakai(item.aturan)} className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-700 hover:bg-primary-50 hover:text-primary-800">{item.aturan}</button></li>)}
                </ul>
              )}
            </div>
            <div className="flex shrink-0 justify-end border-t border-slate-200 bg-slate-50 px-3 py-2">
              <button type="button" onClick={() => setTargetAturanPakai(null)} className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100">Tutup</button>
            </div>
          </div>
        </div>
      )}
      <KonfirmasiDialog terbuka={konfirmasi} judul={sumberDraft?.jenis === "edit" ? "Ubah Resep" : "Simpan Resep"} pesan={`${sumberDraft?.jenis === "edit" ? "Ubah" : "Simpan"} resep untuk ${kunjungan?.nm_pasien || "pasien"}?`} subPesan={sumberDraft?.jenis === "edit" ? `Isi resep ${sumberDraft.no_resep} akan diganti dengan data pada formulir.` : "Resep akan mendapat nomor baru dan masuk ke antrean pelayanan farmasi."} teksKonfirmasi={sumberDraft?.jenis === "edit" ? "Ubah Resep" : "Simpan Resep"} bahaya={false} sedangMemproses={menyimpan} onBatal={() => setKonfirmasi(false)} onKonfirmasi={() => void simpan()} />
      <Toast message={toast?.pesan || null} tipe={toast?.tipe} onClose={() => setToast(null)} />
    </div>
  );
}

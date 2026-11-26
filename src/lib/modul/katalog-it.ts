import type { DefinisiModulKatalog } from "./katalog-crud";
import { KATALOG_TAGIHAN } from "@/lib/tagihan/katalog-tagihan";
import { KATALOG_LAPORAN } from "@/lib/laporan/katalog-laporan";
import { KATALOG_KEUANGAN } from "@/lib/keuangan/katalog-keuangan";
import { KATALOG_BRIDGING } from "@/lib/bridging/katalog-bridging";
import { KATALOG_REKAM_MEDIS } from "@/lib/rekam-medis/katalog-rekam-medis";
import { KATALOG_TRANSFUSI_DARAH } from "@/lib/transfusi-darah/katalog-transfusi-darah";
import { KATALOG_GRAFIK_ANALISA } from "@/lib/grafik-analisa/katalog-grafik-analisa";
import { KATALOG_SURAT } from "@/lib/surat/katalog-surat";
import { KATALOG_PERPUSTAKAAN } from "@/lib/perpustakaan/katalog-perpustakaan";
import { KATALOG_TOKO } from "@/lib/toko/katalog-toko";
import { KATALOG_ZISCSR } from "@/lib/ziscsr/katalog-ziscsr";
import { KATALOG_PENGATURAN } from "@/lib/pengaturan/katalog-pengaturan";

const PREFIX_KATEGORI_IT: Readonly<Record<string, string>> = {
  I: "/tagihan",
  J: "/laporan",
  K: "/keuangan",
  L: "/bridging",
  M: "/rekam-medis",
  N: "/transfusi-darah",
  O: "/grafik-analisa",
  P: "/surat",
  Q: "/perpustakaan",
  R: "/toko",
  S: "/ziscsr",
  T: "/pengaturan",
};

const SEMUA_KATALOG_IT: readonly DefinisiModulKatalog[] = [
  ...KATALOG_TAGIHAN,
  ...KATALOG_LAPORAN,
  ...KATALOG_KEUANGAN,
  ...KATALOG_BRIDGING,
  ...KATALOG_REKAM_MEDIS,
  ...KATALOG_TRANSFUSI_DARAH,
  ...KATALOG_GRAFIK_ANALISA,
  ...KATALOG_SURAT,
  ...KATALOG_PERPUSTAKAAN,
  ...KATALOG_TOKO,
  ...KATALOG_ZISCSR,
  ...KATALOG_PENGATURAN,
];

const RUTE_BY_ID = new Map<string, string>([
  ["btn-resume-pasien", "/resume-pasien"],
  ...SEMUA_KATALOG_IT.map((m): [string, string] => [m.id, `${PREFIX_KATEGORI_IT[m.kategori]}/${m.slug}`]),
]);

const RUTE_BY_TITLE = new Map<string, string>(
  SEMUA_KATALOG_IT.map((m) => [m.judul, `${PREFIX_KATEGORI_IT[m.kategori]}/${m.slug}`]),
);

const JUDUL_BY_PATH = new Map<string, string>(
  SEMUA_KATALOG_IT.map((m) => [`${PREFIX_KATEGORI_IT[m.kategori]}/${m.slug}`, m.judul]),
);

export function dapatkanRuteKatalogIT(id: string, title: string): string | null {
  return RUTE_BY_ID.get(id) ?? RUTE_BY_TITLE.get(title) ?? null;
}

export function dapatkanJudulKatalogIT(pathname: string): string | null {
  return JUDUL_BY_PATH.get(pathname) ?? null;
}

export { SEMUA_KATALOG_IT, PREFIX_KATEGORI_IT };

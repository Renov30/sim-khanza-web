import type { DefinisiModulKatalog } from "./katalog-crud";
import { KATALOG_KEPEGAWAIAN } from "@/lib/kepegawaian/katalog-kepegawaian";
import { KATALOG_FARMASI } from "@/lib/farmasi/katalog-farmasi";
import { KATALOG_IPSRS } from "@/lib/ipsrs/katalog-ipsrs";
import { KATALOG_DAPUR } from "@/lib/dapur/katalog-dapur";
import { KATALOG_INVENTARIS } from "@/lib/inventaris/katalog-inventaris";
import { KATALOG_PARKIR } from "@/lib/parkir/katalog-parkir";

const PREFIX_KATEGORI: Readonly<Record<string, string>> = {
  C: "/kepegawaian",
  D: "/farmasi/modul",
  E: "/ipsrs",
  F: "/dapur",
  G: "/inventaris",
  H: "/parkir",
};

const SEMUA_KATALOG_CH: readonly DefinisiModulKatalog[] = [
  ...KATALOG_KEPEGAWAIAN,
  ...KATALOG_FARMASI,
  ...KATALOG_IPSRS,
  ...KATALOG_DAPUR,
  ...KATALOG_INVENTARIS,
  ...KATALOG_PARKIR,
];

const RUTE_BY_ID = new Map<string, string>([
  ["btn-daftar-permintaan-resep", "/farmasi/daftar-resep-dokter"],
  ...SEMUA_KATALOG_CH.map((m): [string, string] => [m.id, `${PREFIX_KATEGORI[m.kategori]}/${m.slug}`]),
]);

const RUTE_BY_TITLE = new Map<string, string>(
  SEMUA_KATALOG_CH.map((m) => [m.judul, `${PREFIX_KATEGORI[m.kategori]}/${m.slug}`]),
);

const JUDUL_BY_PATH = new Map<string, string>(
  SEMUA_KATALOG_CH.map((m) => [`${PREFIX_KATEGORI[m.kategori]}/${m.slug}`, m.judul]),
);

export function dapatkanRuteKatalogCH(id: string, title: string): string | null {
  return RUTE_BY_ID.get(id) ?? RUTE_BY_TITLE.get(title) ?? null;
}

export function dapatkanJudulKatalogCH(pathname: string): string | null {
  return JUDUL_BY_PATH.get(pathname) ?? null;
}

export { SEMUA_KATALOG_CH, PREFIX_KATEGORI };

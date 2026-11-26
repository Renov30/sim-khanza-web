import { notFound } from "next/navigation";
import { PETA_KATALOG_TOKO } from "@/lib/toko/katalog-toko";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanTokoDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_TOKO.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/toko/${def.slug}`} />;
}

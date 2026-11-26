import { notFound } from "next/navigation";
import { PETA_KATALOG_TAGIHAN } from "@/lib/tagihan/katalog-tagihan";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanTagihanDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_TAGIHAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/tagihan/${def.slug}`} />;
}

import { notFound } from "next/navigation";
import { PETA_KATALOG_INVENTARIS } from "@/lib/inventaris/katalog-inventaris";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanInventarisDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_INVENTARIS.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/inventaris/${def.slug}`} />;
}

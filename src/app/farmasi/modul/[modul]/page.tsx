import { notFound } from "next/navigation";
import { PETA_KATALOG_FARMASI } from "@/lib/farmasi/katalog-farmasi";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanFarmasiDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_FARMASI.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/farmasi/modul/${def.slug}`} />;
}

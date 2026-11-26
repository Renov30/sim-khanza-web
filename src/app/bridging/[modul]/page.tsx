import { notFound } from "next/navigation";
import { PETA_KATALOG_BRIDGING } from "@/lib/bridging/katalog-bridging";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanBridgingDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_BRIDGING.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/bridging/${def.slug}`} />;
}

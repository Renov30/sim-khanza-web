import { notFound } from "next/navigation";
import { PETA_KATALOG_GRAFIK_ANALISA } from "@/lib/grafik-analisa/katalog-grafik-analisa";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanGrafikAnalisaDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_GRAFIK_ANALISA.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/grafik-analisa/${def.slug}`} />;
}

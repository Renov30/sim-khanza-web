import { notFound } from "next/navigation";
import { PETA_KATALOG_ZISCSR } from "@/lib/ziscsr/katalog-ziscsr";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanZisCsrDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_ZISCSR.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/ziscsr/${def.slug}`} />;
}

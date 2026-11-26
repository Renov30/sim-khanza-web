import { notFound } from "next/navigation";
import { PETA_KATALOG_PARKIR } from "@/lib/parkir/katalog-parkir";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanParkirDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_PARKIR.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/parkir/${def.slug}`} />;
}

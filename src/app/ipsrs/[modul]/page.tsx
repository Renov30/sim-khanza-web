import { notFound } from "next/navigation";
import { PETA_KATALOG_IPSRS } from "@/lib/ipsrs/katalog-ipsrs";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanIpsrsDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_IPSRS.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/ipsrs/${def.slug}`} />;
}

import { notFound } from "next/navigation";
import { PETA_KATALOG_PERPUSTAKAAN } from "@/lib/perpustakaan/katalog-perpustakaan";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanPerpustakaanDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_PERPUSTAKAAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/perpustakaan/${def.slug}`} />;
}

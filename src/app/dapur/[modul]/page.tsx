import { notFound } from "next/navigation";
import { PETA_KATALOG_DAPUR } from "@/lib/dapur/katalog-dapur";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanDapurDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_DAPUR.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/dapur/${def.slug}`} />;
}

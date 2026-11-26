import { notFound } from "next/navigation";
import { PETA_KATALOG_KEUANGAN } from "@/lib/keuangan/katalog-keuangan";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanKeuanganDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_KEUANGAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/keuangan/${def.slug}`} />;
}

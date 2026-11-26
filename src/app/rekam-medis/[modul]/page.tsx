import { notFound } from "next/navigation";
import { PETA_KATALOG_REKAM_MEDIS } from "@/lib/rekam-medis/katalog-rekam-medis";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanRekamMedisDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_REKAM_MEDIS.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/rekam-medis/${def.slug}`} />;
}

import { notFound } from "next/navigation";
import { PETA_KATALOG_TRANSFUSI_DARAH } from "@/lib/transfusi-darah/katalog-transfusi-darah";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanTransfusiDarahDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_TRANSFUSI_DARAH.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/transfusi-darah/${def.slug}`} />;
}

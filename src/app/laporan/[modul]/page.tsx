import { notFound } from "next/navigation";
import { PETA_KATALOG_LAPORAN } from "@/lib/laporan/katalog-laporan";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanLaporanDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_LAPORAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/laporan/${def.slug}`} />;
}

import { notFound } from "next/navigation";
import { PETA_KATALOG_SURAT } from "@/lib/surat/katalog-surat";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanSuratDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_SURAT.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/surat/${def.slug}`} />;
}

import { notFound } from "next/navigation";
import { PETA_KATALOG_KEPEGAWAIAN } from "@/lib/kepegawaian/katalog-kepegawaian";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanKepegawaianDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_KEPEGAWAIAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/kepegawaian/${def.slug}`} />;
}

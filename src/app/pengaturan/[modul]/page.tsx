import { notFound } from "next/navigation";
import { PETA_KATALOG_PENGATURAN } from "@/lib/pengaturan/katalog-pengaturan";
import { HalamanKatalogModul } from "@/components/modul/HalamanKatalogModul";

export default async function HalamanPengaturanDinamis({
  params,
}: {
  params: Promise<{ modul: string }>;
}) {
  const { modul } = await params;
  const def = PETA_KATALOG_PENGATURAN.get(modul);
  if (!def) notFound();
  return <HalamanKatalogModul definisi={def} apiPath={`/api/pengaturan/${def.slug}`} />;
}

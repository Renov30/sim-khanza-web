import { tarifRalanAccess } from "@/lib/tarif-perawatan/access";
import { buatHandlerKodeTarif } from "@/lib/tarif-perawatan/handler";

export const GET = buatHandlerKodeTarif("ralan", tarifRalanAccess);

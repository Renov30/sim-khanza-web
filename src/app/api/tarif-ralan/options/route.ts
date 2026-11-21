import { tarifRalanAccess } from "@/lib/tarif-perawatan/access";
import { buatHandlerOpsiTarif } from "@/lib/tarif-perawatan/handler";

export const GET = buatHandlerOpsiTarif("ralan", tarifRalanAccess);

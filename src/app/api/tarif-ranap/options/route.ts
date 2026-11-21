import { tarifRanapAccess } from "@/lib/tarif-perawatan/access";
import { buatHandlerOpsiTarif } from "@/lib/tarif-perawatan/handler";

export const GET = buatHandlerOpsiTarif("ranap", tarifRanapAccess);

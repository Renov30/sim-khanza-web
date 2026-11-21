import { tarifLabAccess } from "@/lib/tarif-lab/access";
import { buatHandlerKodeTarifLab } from "@/lib/tarif-lab/handler";

export const GET = buatHandlerKodeTarifLab(tarifLabAccess);

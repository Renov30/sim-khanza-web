import { tarifLabAccess } from "@/lib/tarif-lab/access";
import { buatHandlerOpsiTarifLab } from "@/lib/tarif-lab/handler";

export const GET = buatHandlerOpsiTarifLab(tarifLabAccess);

import { tarifLabAccess } from "@/lib/tarif-lab/access";
import { buatHandlerTarifLab } from "@/lib/tarif-lab/handler";

const handler = buatHandlerTarifLab(tarifLabAccess);

export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;
export const DELETE = handler.DELETE;
export const PATCH = handler.PATCH;

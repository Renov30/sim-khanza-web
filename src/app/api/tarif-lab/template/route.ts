import { tarifLabAccess } from "@/lib/tarif-lab/access";
import { buatHandlerTemplateLab } from "@/lib/tarif-lab/handler";

const handler = buatHandlerTemplateLab(tarifLabAccess);

export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;
export const DELETE = handler.DELETE;

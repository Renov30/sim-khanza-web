import { tarifRalanAccess } from "@/lib/tarif-perawatan/access";
import { buatHandlerTarif } from "@/lib/tarif-perawatan/handler";

const handler = buatHandlerTarif("ralan", tarifRalanAccess);

export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;
export const DELETE = handler.DELETE;
export const PATCH = handler.PATCH;

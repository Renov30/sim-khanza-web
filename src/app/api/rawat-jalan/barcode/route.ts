import type { NextRequest } from "next/server";
import { handleGetBarcode, handlePostBarcode } from "@/lib/modul/barcode-pelayanan";

export function GET(req: NextRequest) {
  return handleGetBarcode(req, "ralan");
}

export function POST(req: NextRequest) {
  return handlePostBarcode(req, "ralan");
}

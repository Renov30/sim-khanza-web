import { NextResponse } from "next/server";
import { poliklinikAccess } from "@/lib/poliklinik/access";

export async function GET() {
  const denied = await poliklinikAccess();
  if (denied) return denied;
  return NextResponse.json({
    success: true,
    data: {
      status: [
        { id: "1", label: "Aktif" },
        { id: "0", label: "Nonaktif" },
      ],
    },
  });
}

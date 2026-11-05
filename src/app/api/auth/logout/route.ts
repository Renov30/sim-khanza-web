import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({
      success: true,
      message: "Berhasil keluar dari sistem (Log Out)",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal log out";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

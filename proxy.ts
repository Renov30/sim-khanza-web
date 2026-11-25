import { NextResponse, type NextRequest } from "next/server";
import { dapatkanKonfigurasiModul } from "@/lib/modul/konfigurasi";
import { modulDiaktifkan, tentukanModulDariPath } from "@/lib/modul/peta";

export function proxy(request: NextRequest) {
  const modul = tentukanModulDariPath(request.nextUrl.pathname);
  if (modulDiaktifkan(dapatkanKonfigurasiModul(), modul)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { success: false, error: "Modul tidak diaktifkan untuk instalasi ini.", code: "MODUL_NONAKTIF" },
      { status: 404 },
    );
  }

  return new NextResponse("Not Found", { status: 404 });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

let cacheLogo: { body: Uint8Array; contentType: string; kadaluarsa: number } | null = null;

function deteksiTipeGambar(buf: Buffer): string {
  if (buf.length >= 4 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "image/png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (buf.length >= 4 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return "image/gif";
  }
  return "image/png";
}

export async function GET() {
  try {
    const sekarang = Date.now();
    if (cacheLogo && cacheLogo.kadaluarsa > sekarang) {
      return new NextResponse(new Uint8Array(cacheLogo.body), {
        status: 200,
        headers: {
          "Content-Type": cacheLogo.contentType,
          "Cache-Control": "public, max-age=600",
        },
      });
    }

    const rows = await executeQuery<{ logo: Buffer | null }>("SELECT logo FROM setting LIMIT 1");
    const raw = rows[0]?.logo;
    if (!raw || !Buffer.isBuffer(raw) || raw.length === 0) {
      return new NextResponse(null, { status: 404 });
    }

    const contentType = deteksiTipeGambar(raw);
    const bytes = new Uint8Array(raw);
    cacheLogo = {
      body: bytes,
      contentType,
      kadaluarsa: sekarang + 600_000,
    };

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}

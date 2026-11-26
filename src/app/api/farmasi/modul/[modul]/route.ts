import { NextRequest, NextResponse } from "next/server";
import { PETA_KATALOG_FARMASI } from "@/lib/farmasi/katalog-farmasi";
import {
  handleDeleteKatalog,
  handleGetKatalog,
  handlePostKatalog,
  handlePutKatalog,
} from "@/lib/modul/katalog-crud";

type Context = { params: Promise<{ modul: string }> };

async function cariDefinisi(params: Context["params"]) {
  const { modul } = await params;
  return PETA_KATALOG_FARMASI.get(modul) ?? null;
}

export async function GET(req: NextRequest, ctx: Context) {
  const def = await cariDefinisi(ctx.params);
  if (!def) return NextResponse.json({ success: false, error: "Modul farmasi tidak ditemukan." }, { status: 404 });
  return handleGetKatalog(req, def);
}

export async function POST(req: NextRequest, ctx: Context) {
  const def = await cariDefinisi(ctx.params);
  if (!def) return NextResponse.json({ success: false, error: "Modul farmasi tidak ditemukan." }, { status: 404 });
  return handlePostKatalog(req, def);
}

export async function PUT(req: NextRequest, ctx: Context) {
  const def = await cariDefinisi(ctx.params);
  if (!def) return NextResponse.json({ success: false, error: "Modul farmasi tidak ditemukan." }, { status: 404 });
  return handlePutKatalog(req, def);
}

export async function DELETE(req: NextRequest, ctx: Context) {
  const def = await cariDefinisi(ctx.params);
  if (!def) return NextResponse.json({ success: false, error: "Modul farmasi tidak ditemukan." }, { status: 404 });
  return handleDeleteKatalog(req, def);
}

import { NextRequest, NextResponse } from "next/server";
import { authenticateKhanzaUser, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idUser, password } = body;

    if (!idUser || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "ID User dan Password wajib diisi",
        },
        { status: 400 }
      );
    }

    const authResult = await authenticateKhanzaUser(idUser, password);

    if (!authResult.user) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error || "ID Pengguna atau Password salah",
        },
        { status: 401 }
      );
    }

    // Set HTTP-only cookie
    await setSessionCookie(authResult.user);

    return NextResponse.json({
      success: true,
      data: {
        user: authResult.user,
      },
      message: `Selamat datang, ${authResult.user.fullName}!`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json(
      {
        success: false,
        error: `Gagal proses login: ${message}`,
      },
      { status: 500 }
    );
  }
}


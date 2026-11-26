import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { pool } from "@/lib/db";

const USER_KEY = process.env.KHANZA_AES_USER_KEY || "nur";
const PASS_KEY = process.env.KHANZA_AES_PASS_KEY || "windi";

export async function POST(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const passwordLama = String(body.passwordLama || "").trim();
    const passwordBaru = String(body.passwordBaru || "").trim();
    const konfirmasi = String(body.konfirmasi || "").trim();

    if (!passwordLama || !passwordBaru) {
      return NextResponse.json({ success: false, error: "Password lama dan password baru wajib diisi." }, { status: 400 });
    }
    if (passwordBaru.length < 4) {
      return NextResponse.json({ success: false, error: "Password baru minimal 4 karakter." }, { status: 400 });
    }
    if (passwordBaru !== konfirmasi) {
      return NextResponse.json({ success: false, error: "Konfirmasi password baru tidak cocok." }, { status: 400 });
    }
    if (passwordBaru === passwordLama) {
      return NextResponse.json({ success: false, error: "Password baru harus berbeda dari password lama." }, { status: 400 });
    }

    if (sesi.isAdmin) {
      const [res] = await pool.execute<ResultSetHeader>(
        `UPDATE admin
         SET passworde = AES_ENCRYPT(?, ?)
         WHERE usere = AES_ENCRYPT(?, ?) AND passworde = AES_ENCRYPT(?, ?)`,
        [passwordBaru, PASS_KEY, sesi.username, USER_KEY, passwordLama, PASS_KEY],
      );
      if (!res.affectedRows) {
        return NextResponse.json({ success: false, error: "Password lama salah." }, { status: 400 });
      }
    } else {
      const [res] = await pool.execute<ResultSetHeader>(
        `UPDATE user
         SET password = AES_ENCRYPT(?, ?)
         WHERE id_user = AES_ENCRYPT(?, ?) AND password = AES_ENCRYPT(?, ?)`,
        [passwordBaru, PASS_KEY, sesi.username, USER_KEY, passwordLama, PASS_KEY],
      );
      if (!res.affectedRows) {
        return NextResponse.json({ success: false, error: "Password lama salah." }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Password akun berhasil diperbarui." });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal mengganti password." },
      { status: 500 },
    );
  }
}

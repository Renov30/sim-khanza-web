import { cookies } from "next/headers";
import { executeQuery } from "./db";
import { UserSession } from "./types/auth";

const SESSION_COOKIE_NAME = "khanza_web_session";
const USER_KEY = process.env.KHANZA_AES_USER_KEY || "nur";
const PASS_KEY = process.env.KHANZA_AES_PASS_KEY || "windi";
const SECRET_KEY =
  process.env.SESSION_SECRET || "khanza_web_secret_session_key_merauke_papua_2026_safe";

// HMAC SHA-256 using native Web Crypto API
async function signData(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(session: UserSession): Promise<string> {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = await signData(payload, SECRET_KEY);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payload, signature] = parts;
    const expectedSig = await signData(payload, SECRET_KEY);
    if (signature !== expectedSig) return null;

    const json = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(json) as UserSession;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(session: UserSession) {
  const token = await createSessionToken(session);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function authenticateKhanzaUser(
  idUser: string,
  password: string
): Promise<{ user: UserSession | null; error?: string }> {
  const cleanId = idUser.trim();
  const cleanPass = password.trim();

  if (!cleanId || !cleanPass) {
    return { user: null, error: "ID Pengguna dan Password wajib diisi" };
  }

  try {
    // 1. Cek tabel admin
    const adminQuery = `
      SELECT CAST(AES_DECRYPT(usere, ?) AS CHAR) as username 
      FROM admin 
      WHERE usere = AES_ENCRYPT(?, ?) AND passworde = AES_ENCRYPT(?, ?)
      LIMIT 1
    `;
    const adminRows = await executeQuery<{ username: string }>(adminQuery, [
      USER_KEY,
      cleanId,
      USER_KEY,
      cleanPass,
      PASS_KEY,
    ]);

    if (adminRows.length > 0) {
      const session: UserSession = {
        username: adminRows[0].username || cleanId,
        fullName: "Admin Utama",
        role: "admin",
        isAdmin: true,
        permissions: {
          admin: true,
          registrasi: true,
          igd: true,
          kamar_inap: true,
          tindakan_ralan: true,
          tindakan_ranap: true,
          periksa_lab: true,
          periksa_radiologi: true,
          resep_obat: true,
          penjualan_obat: true,
          kasir_ralan: true,
          billing_ranap: true,
          semua_akses: true,
        },
        loginTime: new Date().toISOString(),
      };
      return { user: session };
    }

    // 2. Cek tabel user biasa dengan join ke pegawai
    const userQuery = `
      SELECT 
        CAST(AES_DECRYPT(u.id_user, ?) AS CHAR) as username,
        p.nama as nama_pegawai,
        u.*
      FROM user u 
      LEFT JOIN pegawai p ON CAST(AES_DECRYPT(u.id_user, ?) AS CHAR) = p.nik
      WHERE u.id_user = AES_ENCRYPT(?, ?) AND u.password = AES_ENCRYPT(?, ?)
      LIMIT 1
    `;
    const userRows = await executeQuery<Record<string, unknown>>(userQuery, [
      USER_KEY,
      USER_KEY,
      cleanId,
      USER_KEY,
      cleanPass,
      PASS_KEY,
    ]);

    if (userRows.length > 0) {
      const row = userRows[0];
      const permissions: Record<string, boolean> = {};

      for (const [key, val] of Object.entries(row)) {
        if (key !== "id_user" && key !== "password" && key !== "username" && key !== "nama_pegawai") {
          permissions[key] = val === "true" || val === true || val === 1;
        }
      }

      const session: UserSession = {
        username: (row.username as string) || cleanId,
        fullName: (row.nama_pegawai as string) || (row.username as string) || cleanId,
        role: "user",
        isAdmin: false,
        permissions,
        loginTime: new Date().toISOString(),
      };
      return { user: session };
    }

    return { user: null, error: "ID Pengguna atau Password salah!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan koneksi database";
    return { user: null, error: `Gagal otentikasi: ${message}` };
  }
}


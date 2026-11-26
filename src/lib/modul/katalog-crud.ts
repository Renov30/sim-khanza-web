import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import {
  PelayananError,
  bacaAngka,
  bacaBodyJson,
  bacaEnum,
  bacaJam,
  bacaPagination,
  bacaTanggal,
  bacaTanggalQuery,
  bacaTeks,
  cekAksesModul,
  cekTabelAda,
  denganTransaksi,
  responsDaftar,
  tanganiErrorPelayanan,
} from "@/lib/modul/pelayanan";

export interface KolomKatalog {
  nama: string;
  label: string;
  tipe: "text" | "number" | "uang" | "date" | "datetime" | "time" | "enum";
  pk?: boolean;
  autoInc?: boolean;
  wajib?: boolean;
  maks?: number;
  opsi?: readonly string[];
}

export interface DefinisiModulKatalog {
  id: string;
  slug: string;
  judul: string;
  kategori:
    | "C" | "D" | "E" | "F" | "G" | "H"
    | "I" | "J" | "K" | "L" | "M" | "N"
    | "O" | "P" | "Q" | "R" | "S" | "T";
  permissionKey: string;
  javaRef: string;
  tabel: string;
  kolom: readonly KolomKatalog[];
  kolomTanggal?: string;
  kolomCari: readonly string[];
  kolomUrut: string;
  kolomRingkasan?: { nama: string; label: string };
  bisaTambah: boolean;
  bisaUbah: boolean;
  bisaHapus: boolean;
}

const IDENT_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function validIdent(nama: string): string {
  if (!IDENT_RE.test(nama)) {
    throw new PelayananError("Konfigurasi identifier kolom tidak valid.", 500);
  }
  return `\`${nama}\``;
}

function ekspresiSelectKolom(k: KolomKatalog): string {
  const id = validIdent(k.nama);
  if (k.tipe === "date" || k.tipe === "datetime" || k.tipe === "time") {
    return `CAST(${id} AS CHAR) AS ${id}`;
  }
  return id;
}

function bacaNilaiKolom(body: Record<string, unknown>, k: KolomKatalog): string | number | null {
  const wajib = Boolean(k.wajib);
  if (k.tipe === "number" || k.tipe === "uang") {
    const raw = body[k.nama];
    if (!wajib && (raw === undefined || raw === null || String(raw).trim() === "")) {
      return 0;
    }
    return bacaAngka(body, k.nama, k.label, -999999999999, 999999999999, wajib);
  }
  if (k.tipe === "date") {
    const tgl = bacaTanggal(body, k.nama, k.label, wajib);
    return tgl || null;
  }
  if (k.tipe === "time") {
    const jam = bacaJam(body, k.nama, k.label, wajib);
    return jam || null;
  }
  if (k.tipe === "datetime") {
    const teks = bacaTeks(body, k.nama, k.label, 19, wajib);
    if (!teks) return null;
    if (!/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(teks)) {
      throw new PelayananError(`${k.label} harus berformat YYYY-MM-DD HH:MM:SS.`);
    }
    const normal = teks.replace("T", " ");
    return normal.length === 10 ? `${normal} 00:00:00` : normal.length === 16 ? `${normal}:00` : normal;
  }
  if (k.tipe === "enum" && k.opsi && k.opsi.length > 0) {
    return bacaEnum(body, k.nama, k.label, k.opsi, wajib ? undefined : k.opsi[0]);
  }
  return bacaTeks(body, k.nama, k.label, k.maks || 1000, wajib);
}

export async function handleGetKatalog(req: NextRequest, def: DefinisiModulKatalog) {
  const { denied } = await cekAksesModul(def.permissionKey, def.judul);
  if (denied) return denied;

  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams, 50, 200);

    if (!def.tabel || !(await cekTabelAda(def.tabel))) {
      return responsDaftar([], 0, halaman, batas, {
        peringatan: `Tabel \`${def.tabel || "-"}\` (${def.javaRef}) belum tersedia pada database runtime saat ini.`,
      });
    }

    const tabelSql = validIdent(def.tabel);
    const where: string[] = ["1=1"];
    const params: (string | number)[] = [];

    if (def.kolomTanggal) {
      const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
      const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
      const colTgl = def.kolom.find((k) => k.nama === def.kolomTanggal);
      const colSql = validIdent(def.kolomTanggal);
      const isDateTime = colTgl?.tipe === "datetime";
      if (tglMulai) {
        where.push(`${colSql} >= ?`);
        params.push(isDateTime ? `${tglMulai} 00:00:00` : tglMulai);
      }
      if (tglSelesai) {
        where.push(`${colSql} <= ?`);
        params.push(isDateTime ? `${tglSelesai} 23:59:59` : tglSelesai);
      }
    }

    if (cari && def.kolomCari.length > 0) {
      const like = `%${cari}%`;
      const clauses = def.kolomCari.map((col) => `COALESCE(CAST(${validIdent(col)} AS CHAR), '') LIKE ?`);
      where.push(`(${clauses.join(" OR ")})`);
      for (let i = 0; i < def.kolomCari.length; i += 1) params.push(like);
    }

    const whereSql = where.join(" AND ");
    const selectCols = def.kolom.map(ekspresiSelectKolom).join(", ");
    const orderCol = validIdent(def.kolomUrut);
    const sumSelect = def.kolomRingkasan
      ? `, COALESCE(SUM(${validIdent(def.kolomRingkasan.nama)}), 0) AS total_ringkasan`
      : "";

    const [countRows, data] = await Promise.all([
      executeQuery<RowDataPacket & { total: number; total_ringkasan?: number }>(
        `SELECT COUNT(*) AS total${sumSelect} FROM ${tabelSql} WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT ${selectCols} FROM ${tabelSql} WHERE ${whereSql} ORDER BY ${orderCol} DESC LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
    ]);

    const extra = def.kolomRingkasan
      ? { ringkasan: { [def.kolomRingkasan.nama]: Number(countRows[0]?.total_ringkasan ?? 0) } }
      : undefined;

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, extra);
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal memuat data ${def.judul}.`);
  }
}

export async function handlePostKatalog(req: NextRequest, def: DefinisiModulKatalog) {
  const { denied } = await cekAksesModul(def.permissionKey, def.judul);
  if (denied) return denied;
  if (!def.bisaTambah) {
    return NextResponse.json({ success: false, error: `Penambahan langsung pada ${def.judul} tidak diaktifkan.` }, { status: 405 });
  }

  try {
    if (!def.tabel || !(await cekTabelAda(def.tabel))) {
      throw new PelayananError(`Tabel \`${def.tabel}\` belum tersedia pada database runtime.`, 503);
    }
    const body = await bacaBodyJson(req);
    const kolomInput = def.kolom.filter((k) => !k.autoInc);
    const values = kolomInput.map((k) => bacaNilaiKolom(body, k));
    const tabelSql = validIdent(def.tabel);
    const colsSql = kolomInput.map((k) => validIdent(k.nama)).join(", ");
    const placeholders = kolomInput.map(() => "?").join(", ");

    await denganTransaksi(async (conn) => {
      await conn.execute(`INSERT INTO ${tabelSql} (${colsSql}) VALUES (${placeholders})`, values);
    });

    return NextResponse.json({ success: true, message: `Data ${def.judul} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal menyimpan data ${def.judul}.`);
  }
}

export async function handlePutKatalog(req: NextRequest, def: DefinisiModulKatalog) {
  const { denied } = await cekAksesModul(def.permissionKey, def.judul);
  if (denied) return denied;
  if (!def.bisaUbah) {
    return NextResponse.json({ success: false, error: `Perubahan langsung pada ${def.judul} tidak diaktifkan.` }, { status: 405 });
  }

  try {
    if (!def.tabel || !(await cekTabelAda(def.tabel))) {
      throw new PelayananError(`Tabel \`${def.tabel}\` belum tersedia pada database runtime.`, 503);
    }
    const body = await bacaBodyJson(req);
    const pkCols = def.kolom.filter((k) => k.pk);
    const nonPkCols = def.kolom.filter((k) => !k.pk && !k.autoInc);
    if (pkCols.length === 0 || nonPkCols.length === 0) {
      throw new PelayananError(`Modul ${def.judul} tidak mendukung pembaruan baris.`, 400);
    }

    const setValues = nonPkCols.map((k) => bacaNilaiKolom(body, k));
    const whereValues = pkCols.map((k) => bacaNilaiKolom(body, { ...k, wajib: true }));

    const tabelSql = validIdent(def.tabel);
    const setSql = nonPkCols.map((k) => `${validIdent(k.nama)} = ?`).join(", ");
    const whereSql = pkCols.map((k) => `${validIdent(k.nama)} = ?`).join(" AND ");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE ${tabelSql} SET ${setSql} WHERE ${whereSql}`,
        [...setValues, ...whereValues],
      );
      if (!res.affectedRows) throw new PelayananError(`Data ${def.judul} tidak ditemukan.`, 404);
    });

    return NextResponse.json({ success: true, message: `Data ${def.judul} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal memperbarui data ${def.judul}.`);
  }
}

export async function handleDeleteKatalog(req: NextRequest, def: DefinisiModulKatalog) {
  const { denied } = await cekAksesModul(def.permissionKey, def.judul);
  if (denied) return denied;
  if (!def.bisaHapus) {
    return NextResponse.json({ success: false, error: `Penghapusan langsung pada ${def.judul} tidak diaktifkan.` }, { status: 405 });
  }

  try {
    if (!def.tabel || !(await cekTabelAda(def.tabel))) {
      throw new PelayananError(`Tabel \`${def.tabel}\` belum tersedia pada database runtime.`, 503);
    }
    const sp = new URL(req.url).searchParams;
    const pkCols = def.kolom.filter((k) => k.pk);
    if (pkCols.length === 0) {
      throw new PelayananError(`Modul ${def.judul} tidak memiliki kunci utama untuk penghapusan.`, 400);
    }

    const whereValues: string[] = [];
    for (const k of pkCols) {
      const v = (sp.get(k.nama) || "").trim();
      if (!v) throw new PelayananError(`Kunci ${k.label} wajib disertakan.`);
      whereValues.push(v);
    }

    const tabelSql = validIdent(def.tabel);
    const whereSql = pkCols.map((k) => `${validIdent(k.nama)} = ?`).join(" AND ");

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(`DELETE FROM ${tabelSql} WHERE ${whereSql}`, whereValues);
      if (!res.affectedRows) throw new PelayananError(`Data ${def.judul} tidak ditemukan.`, 404);
    });

    return NextResponse.json({ success: true, message: `Data ${def.judul} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal menghapus data ${def.judul}.`);
  }
}

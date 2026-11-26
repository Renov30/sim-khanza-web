import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";
import {
  ambilKunjungan,
  bacaTarif,
  JENIS_OPSI,
  syaratPemeriksaan,
  teks,
} from "@/lib/radiologi/permintaan";

interface Opsi {
  id: string;
  nama: string;
  [kunci: string]: string;
}

function gagal(error: unknown, pesan: string) {
  if (error instanceof Error && error.message === "Permintaan tidak valid.") {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  console.error(pesan, error);
  return NextResponse.json({ success: false, error: pesan }, { status: 500 });
}

async function izinAkses() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Sesi berakhir. Silakan login kembali." }, { status: 401 });
  }
  if (!session.isAdmin && !session.permissions.semua_akses && !session.permissions.permintaan_radiologi) {
    return NextResponse.json({ success: false, error: "Anda tidak memiliki izin permintaan radiologi." }, { status: 403 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const ditolak = await izinAkses();
  if (ditolak) return ditolak;
  let connection: PoolConnection | undefined;
  try {
    const { searchParams } = new URL(req.url);
    const jenis = teks(searchParams.get("jenis"), 20);
    if (!JENIS_OPSI.has(jenis)) throw new Error("Permintaan tidak valid.");
    const cari = teks(searchParams.get("cari"), 120);
    const noRawat = teks(searchParams.get("no_rawat"), 30);
    const angkaLimit = Number(searchParams.get("limit") ?? 100);
    const limit = Number.isFinite(angkaLimit) ? Math.min(Math.max(Math.trunc(angkaLimit), 1), 200) : 100;
    const kata = `%${cari}%`;

    if (jenis === "kunjungan") {
      if (noRawat) {
        const rows = await executeQuery<RowDataPacket>(`
          SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, r.tgl_registrasi, r.status_lanjut,
                 COALESCE(pol.nm_poli, '') AS nm_poli, r.kd_dokter, d.nm_dokter,
                 r.kd_pj, pj.png_jawab
          FROM reg_periksa r
          INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
          LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
          LEFT JOIN dokter d ON r.kd_dokter = d.kd_dokter
          LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
          WHERE r.no_rawat = ? LIMIT 1
        `, [noRawat]);
        const baris = rows[0] as Record<string, unknown> | undefined;
        if (!baris) return NextResponse.json({ success: true, data: [] });
        return NextResponse.json({
          success: true,
          data: [{
            id: String(baris.no_rawat ?? ""),
            nama: `${String(baris.no_rkm_medis ?? "")} ${String(baris.nm_pasien ?? "")}`.trim(),
            no_rm: String(baris.no_rkm_medis ?? ""),
            nm_pasien: String(baris.nm_pasien ?? ""),
            status: String(baris.status_lanjut ?? ""),
            ruang: String(baris.nm_poli ?? ""),
            kd_dokter: String(baris.kd_dokter ?? ""),
            nm_dokter: String(baris.nm_dokter ?? ""),
            kd_pj: String(baris.kd_pj ?? ""),
            png_jawab: String(baris.png_jawab ?? ""),
          }],
        });
      }
      if (!cari) return NextResponse.json({ success: true, data: [] });
      const rows = await executeQuery<RowDataPacket>(`
        SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, r.tgl_registrasi, r.status_lanjut,
               COALESCE(pol.nm_poli, '') AS nm_poli, r.kd_dokter, d.nm_dokter,
               r.kd_pj, pj.png_jawab
        FROM reg_periksa r
        INNER JOIN pasien p ON r.no_rkm_medis = p.no_rkm_medis
        LEFT JOIN poliklinik pol ON r.kd_poli = pol.kd_poli
        LEFT JOIN dokter d ON r.kd_dokter = d.kd_dokter
        LEFT JOIN penjab pj ON r.kd_pj = pj.kd_pj
        WHERE r.no_rawat LIKE ? OR r.no_rkm_medis LIKE ? OR p.nm_pasien LIKE ?
        ORDER BY r.tgl_registrasi DESC LIMIT ?
      `, [kata, kata, kata, limit]);
      const data: Opsi[] = rows.map((baris) => {
        const nilai = baris as Record<string, unknown>;
        return {
          id: String(nilai.no_rawat ?? ""),
          nama: `${String(nilai.no_rm ?? nilai.no_rkm_medis ?? "")} ${String(nilai.nm_pasien ?? "")}`.trim(),
          no_rm: String(nilai.no_rkm_medis ?? ""),
          nm_pasien: String(nilai.nm_pasien ?? ""),
          status: String(nilai.status_lanjut ?? ""),
          ruang: String(nilai.nm_poli ?? ""),
          kd_dokter: String(nilai.kd_dokter ?? ""),
          nm_dokter: String(nilai.nm_dokter ?? ""),
          kd_pj: String(nilai.kd_pj ?? ""),
          png_jawab: String(nilai.png_jawab ?? ""),
        };
      });
      return NextResponse.json({ success: true, data });
    }

    if (jenis === "dokter") {
      const rows = await executeQuery<RowDataPacket>(`
        SELECT kd_dokter AS id, nm_dokter AS nama FROM dokter
        WHERE status = '1' AND (kd_dokter LIKE ? OR nm_dokter LIKE ?)
        ORDER BY nm_dokter LIMIT ?
      `, [kata, kata, limit]);
      return NextResponse.json({ success: true, data: rows });
    }

    if (jenis === "poli") {
      const rows = await executeQuery<RowDataPacket>(`
        SELECT kd_poli AS id, nm_poli AS nama FROM poliklinik
        WHERE status = '1' AND (kd_poli LIKE ? OR nm_poli LIKE ?)
        ORDER BY nm_poli LIMIT ?
      `, [kata, kata, limit]);
      return NextResponse.json({ success: true, data: rows });
    }

    if (jenis === "ruang") {
      const rows = await executeQuery<RowDataPacket>(`
        SELECT kd_bangsal AS id, nm_bangsal AS nama FROM bangsal
        WHERE status = '1' AND (kd_bangsal LIKE ? OR nm_bangsal LIKE ?)
        ORDER BY nm_bangsal LIMIT ?
      `, [kata, kata, limit]);
      return NextResponse.json({ success: true, data: rows });
    }

    connection = await pool.getConnection();
    let kdPj = teks(searchParams.get("kd_pj"), 10);
    let kelas = teks(searchParams.get("kelas"), 30);
    if (noRawat) {
      const kunjungan = await ambilKunjungan(connection, noRawat);
      if (!kunjungan) return NextResponse.json({ success: false, error: "Data kunjungan tidak ditemukan." }, { status: 404 });
      kdPj = kunjungan.kd_pj;
      kelas = kunjungan.kelas;
    }
    const [tarifRows] = await connection.execute<RowDataPacket[]>(
      "SELECT cara_bayar_radiologi, kelas_radiologi FROM set_tarif LIMIT 1",
    );
    const syarat = syaratPemeriksaan(bacaTarif(tarifRows), kdPj, kelas);
    const [rows] = await connection.execute<RowDataPacket[]>(`
      SELECT kd_jenis_prw AS id, nm_perawatan AS nama, kd_pj, kelas
      FROM jns_perawatan_radiologi
      WHERE ${syarat.sql} AND (kd_jenis_prw LIKE ? OR nm_perawatan LIKE ?)
      ORDER BY nm_perawatan LIMIT ?
    `, [...syarat.params, kata, kata, limit]);
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    return gagal(error, "Pilihan permintaan radiologi gagal dimuat.");
  } finally {
    connection?.release();
  }
}

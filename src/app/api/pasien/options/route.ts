import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { patientMasters } from '@/lib/pasien/fields';
import { patientAccess } from '@/lib/pasien/access';
export async function GET(req: NextRequest) {
  const denied = await patientAccess(); if (denied) return denied;
  const name = req.nextUrl.searchParams.get('jenis') || '';
  if (!Object.hasOwn(patientMasters, name)) return NextResponse.json({ success: false, error: 'Jenis master tidak valid.' }, { status: 400 });
  const [table, key, label] = patientMasters[name];
  const query = req.nextUrl.searchParams.get('cari')?.trim().slice(0,70) || '';
  const selectedName = req.nextUrl.searchParams.get('nama')?.slice(0,70) || '';
  const selected = req.nextUrl.searchParams.get('id') || '';
  try {
    // Identifier hanya dari allowlist; nilai pencarian tetap memakai parameter.
    const data = await executeQuery<{ id: string; label: string }>(
      `SELECT CAST(${key} AS CHAR) AS id, ${label} AS label FROM ${table} WHERE ${label} LIKE ? OR ${key} = ? OR ${label} = ? ORDER BY (${key} = ? OR ${label} = ?) DESC, ${label} LIMIT ${name === 'kd_pj' ? 1000 : 50}`,
      [`%${query}%`, selected, selectedName, selected, selectedName],
    );
    return NextResponse.json({ success: true, data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Master pasien gagal:', error);
    return NextResponse.json({ success: false, error: 'Gagal memuat pilihan master.' }, { status: 500 });
  }
}

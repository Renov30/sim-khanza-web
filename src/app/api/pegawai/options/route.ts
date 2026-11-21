import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import { pegawaiAccess } from "@/lib/kepegawaian/access";
import { JENIS_KELAMIN, MASA_KERJA, STATUS_PEGAWAI } from "@/lib/kepegawaian/pegawai";

interface Opsi {
  id: string;
  label: string;
}

function opsi(rows: Record<string, unknown>[], id: string, label: string): Opsi[] {
  return rows.map((row) => ({
    id: String(row[id] ?? ""),
    label: `${row[id] ?? ""} ${row[label] ?? ""}`.trim(),
  }));
}

function opsiTunggal(rows: Record<string, unknown>[], kunci: string): Opsi[] {
  return rows.map((row) => {
    const nilai = String(row[kunci] ?? "");
    return { id: nilai, label: nilai };
  });
}

export async function GET() {
  const denied = await pegawaiAccess();
  if (denied) return denied;
  try {
    const [
      jnjJabatan,
      kelompokJabatan,
      resikoKerja,
      emergency,
      departemen,
      bidang,
      sttsWp,
      sttsKerja,
      pendidikan,
      indexins,
      bank,
    ] = await Promise.all([
      executeQuery<RowDataPacket>("SELECT kode, nama FROM jnj_jabatan ORDER BY kode"),
      executeQuery<RowDataPacket>("SELECT kode_kelompok, nama_kelompok FROM kelompok_jabatan ORDER BY nama_kelompok"),
      executeQuery<RowDataPacket>("SELECT kode_resiko, nama_resiko FROM resiko_kerja ORDER BY nama_resiko"),
      executeQuery<RowDataPacket>("SELECT kode_emergency, nama_emergency FROM emergency_index ORDER BY nama_emergency"),
      executeQuery<RowDataPacket>("SELECT dep_id, nama FROM departemen ORDER BY dep_id"),
      executeQuery<RowDataPacket>("SELECT nama FROM bidang ORDER BY nama"),
      executeQuery<RowDataPacket>("SELECT stts, ktg FROM stts_wp ORDER BY stts"),
      executeQuery<RowDataPacket>("SELECT stts, ktg FROM stts_kerja ORDER BY stts"),
      executeQuery<RowDataPacket>("SELECT tingkat FROM pendidikan ORDER BY tingkat"),
      executeQuery<RowDataPacket & { dep_id: string; persen: number }>("SELECT dep_id, persen FROM indexins ORDER BY dep_id"),
      executeQuery<RowDataPacket>("SELECT namabank FROM bank ORDER BY namabank"),
    ]);
    return NextResponse.json({
      success: true,
      data: {
        jnjJabatan: opsi(jnjJabatan, "kode", "nama"),
        kelompokJabatan: opsi(kelompokJabatan, "kode_kelompok", "nama_kelompok"),
        resikoKerja: opsi(resikoKerja, "kode_resiko", "nama_resiko"),
        emergency: opsi(emergency, "kode_emergency", "nama_emergency"),
        departemen: opsi(departemen, "dep_id", "nama"),
        bidang: opsiTunggal(bidang, "nama"),
        sttsWp: opsi(sttsWp, "stts", "ktg"),
        sttsKerja: opsi(sttsKerja, "stts", "ktg"),
        pendidikan: opsiTunggal(pendidikan, "tingkat"),
        indexins: (indexins as Record<string, unknown>[]).map((row) => ({
          id: String(row.dep_id ?? ""),
          label: `${row.dep_id ?? ""} ${Number(row.persen ?? 0)}%`,
        })),
        bank: opsiTunggal(bank, "namabank"),
        jenisKelamin: JENIS_KELAMIN.map((nilai) => ({ id: nilai, label: nilai })),
        masaKerja: MASA_KERJA.map((nilai) => ({ id: nilai, label: nilai })),
        status: STATUS_PEGAWAI.map((nilai) => ({ id: nilai, label: nilai })),
      },
    });
  } catch (error) {
    console.error("Gagal memuat pilihan data pegawai:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan data pegawai. Silakan coba kembali." },
      { status: 500 },
    );
  }
}

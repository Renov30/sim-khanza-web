import { masterObatAccess } from "@/lib/farmasi/access";
import { loadHargaSetting, nextMasterObatCode } from "@/lib/farmasi/master-obat";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2/promise";

interface OpsiMaster extends RowDataPacket {
  id: string;
  label: string;
}

export async function GET() {
  const denied = await masterObatAccess();
  if (denied) return denied;
  const connection = await pool.getConnection();
  try {
    const [satuan] = await connection.execute<OpsiMaster[]>(
      "SELECT kode_sat AS id, satuan AS label FROM kodesatuan ORDER BY satuan",
    );
    const [jenis] = await connection.execute<OpsiMaster[]>(
      "SELECT kdjns AS id, nama AS label FROM jenis ORDER BY nama",
    );
    const [kategori] = await connection.execute<OpsiMaster[]>(
      "SELECT kode AS id, nama AS label FROM kategori_barang ORDER BY nama",
    );
    const [golongan] = await connection.execute<OpsiMaster[]>(
      "SELECT kode AS id, nama AS label FROM golongan_barang ORDER BY nama",
    );
    const [industri] = await connection.execute<OpsiMaster[]>(
      "SELECT kode_industri AS id, nama_industri AS label FROM industrifarmasi ORDER BY nama_industri",
    );
    const harga = await loadHargaSetting(connection);
    const nomor = await nextMasterObatCode(connection);
    return NextResponse.json({
      success: true,
      data: { satuan, jenis, kategori, golongan, industri, harga, nomor },
    });
  } catch (error) {
    console.error("Gagal memuat opsi data obat:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat pilihan data obat. Silakan coba kembali." },
      { status: 500 },
    );
  } finally {
    connection.release();
  }
}

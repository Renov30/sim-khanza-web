import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "@/lib/db";
import { kamarInapAccess } from "@/lib/rawat-inap/access";
import {
  MutasiError,
  angka,
  biayaInap,
  dataInapTerkunci,
  hitungLama,
  jam,
  jalankanUpdate,
  konfigurasiInap,
  kunciKamar,
  obyekBody,
  opsiPindah,
  responsGagalan,
  statusKamar,
  tambahInapBaru,
  tanggal,
  tarifKamar,
  teks,
} from "@/lib/rawat-inap/mutasi";

export async function GET(req: NextRequest) {
  const denied = await kamarInapAccess();
  if (denied) return denied;
  try {
    const params = req.nextUrl.searchParams;
    const noRawat = teks(params.get("no_rawat"), "No. rawat", 17);
    const cari = teks(params.get("cari"), "Pencarian", 100, false);
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT k.kd_kamar, b.nm_bangsal, k.trf_kamar, k.status,
             COALESCE((
               SELECT shk.tarif FROM set_harga_kamar shk
               WHERE shk.kd_kamar = k.kd_kamar AND shk.kd_pj = r.kd_pj LIMIT 1
             ), k.trf_kamar) AS tarif
      FROM kamar k
      INNER JOIN bangsal b ON b.kd_bangsal = k.kd_bangsal
      CROSS JOIN reg_periksa r
      WHERE r.no_rawat = ? AND k.status = 'KOSONG'
        AND (k.kd_kamar LIKE ? OR b.nm_bangsal LIKE ?)
      ORDER BY b.nm_bangsal, k.kd_kamar
      LIMIT 50
    `, [noRawat, `%${cari}%`, `%${cari}%`]);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return responsGagalan(error, "Gagal memuat daftar kamar tujuan.");
  }
}

export async function POST(req: NextRequest) {
  const denied = await kamarInapAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  let kunciDidapat = false;
  let koneksiRusak = false;
  let namaKunci = "";
  try {
    const input = obyekBody(await req.json());
    const noRawat = teks(input.no_rawat, "No. rawat", 17);
    const kdKamarAsal = teks(input.kd_kamar_asal, "Kamar asal", 15);
    const tglMasuk = tanggal(input.tgl_masuk, "Tanggal masuk");
    const jamMasuk = jam(input.jam_masuk, "Jam masuk");
    const kdKamarTujuan = teks(input.kd_kamar_tujuan, "Kamar tujuan", 15);
    const tglPindah = tanggal(input.tanggal, "Tanggal pindah");
    const jamPindah = jam(input.jam, "Jam pindah");
    const opsi = opsiPindah(input.opsi);
    if (kdKamarAsal === kdKamarTujuan) throw new MutasiError("Kamar tujuan harus berbeda dari kamar asal.", 409);

    connection = await pool.getConnection();
    await connection.beginTransaction();
    namaKunci = `khanza-web:pindah-kamar:${noRawat}`;
    const [kunciRows] = await connection.execute<RowDataPacket[]>(
      "SELECT GET_LOCK(?, 10) AS didapat",
      [namaKunci],
    );
    if (kunciRows[0]?.didapat !== 1) throw new MutasiError("Proses pindah kamar sedang digunakan. Coba lagi.", 409);
    kunciDidapat = true;

    const config = await konfigurasiInap(connection);
    const baris = await dataInapTerkunci(connection, noRawat, kdKamarAsal, tglMasuk, jamMasuk);
    if (baris.stts_pulang !== "-") throw new MutasiError("Pasien pada kamar ini sudah tidak dirawat.", 409);

    await kunciKamar(connection, kdKamarTujuan, true);
    await kunciKamar(connection, kdKamarAsal, false);

    const tarifLama = angka(baris.trf_kamar, "Tarif kamar asal", await tarifKamar(connection, kdKamarAsal, baris.kd_pj), 0);
    const tarifBaru = await tarifKamar(connection, kdKamarTujuan, baris.kd_pj);
    const lamaBaru = angka(input.lama_baru, "Lama inap kamar baru", 1, 0, 36500);
    const biayaBaru = biayaInap(lamaBaru, tarifBaru);
    const barisBaru = {
      noRawat,
      kdKamar: kdKamarTujuan,
      tarif: tarifBaru,
      diagnosaAwal: baris.diagnosa_awal || "",
      diagnosaAkhir: baris.diagnosa_akhir || "",
      tglMasuk: tglPindah,
      jamMasuk: jamPindah,
      lama: lamaBaru,
      biaya: biayaBaru,
    };

    if (opsi === 1) {
      await tambahInapBaru(connection, barisBaru);
      await statusKamar(connection, kdKamarTujuan, "ISI");
      await jalankanUpdate(connection, `DELETE FROM kamar_inap
        WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`,
      [noRawat, kdKamarAsal, tglMasuk, jamMasuk], "Data kamar inap lama gagal dihapus.");
      await statusKamar(connection, kdKamarAsal, "KOSONG");
    } else if (opsi === 2) {
      await jalankanUpdate(connection, `UPDATE kamar_inap SET
        kd_kamar = ?, trf_kamar = ?, lama = ?, ttl_biaya = ?
        WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`, [
        kdKamarTujuan,
        tarifBaru,
        lamaBaru,
        biayaBaru,
        noRawat,
        kdKamarAsal,
        tglMasuk,
        jamMasuk,
      ], "Data kamar inap gagal diperbarui.");
      await statusKamar(connection, kdKamarTujuan, "ISI");
      await statusKamar(connection, kdKamarAsal, "KOSONG");
    } else if (opsi === 3) {
      const lamaLama = await hitungLama(connection, tglMasuk, jamMasuk, tglPindah, jamPindah, config);
      const biayaLama = biayaInap(lamaLama, tarifLama);
      await jalankanUpdate(connection, `UPDATE kamar_inap SET
        trf_kamar = ?, tgl_keluar = ?, jam_keluar = ?, lama = ?, ttl_biaya = ?, stts_pulang = 'Pindah Kamar'
        WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`, [
        tarifLama,
        tglPindah,
        jamPindah,
        lamaLama,
        biayaLama,
        noRawat,
        kdKamarAsal,
        tglMasuk,
        jamMasuk,
      ], "Data kamar inap lama gagal diperbarui.");
      await statusKamar(connection, kdKamarAsal, "KOSONG");
      await tambahInapBaru(connection, barisBaru);
      await statusKamar(connection, kdKamarTujuan, "ISI");
    } else {
      const tglAwal = config.hariawal === "Yes" ? tglMasuk : String(baris.diagnosa_akhir ?? "");
      const lamaLama = await hitungLama(connection, tglAwal, jamMasuk, tglPindah, jamPindah, config);
      const tarifPerhitungan = tarifLama === tarifBaru ? 0 : Math.max(tarifLama, tarifBaru);
      const biayaLama = biayaInap(lamaLama, tarifPerhitungan);
      await connection.execute(`UPDATE kamar_inap SET
        trf_kamar = ?, tgl_keluar = ?, jam_keluar = ?, ttl_biaya = ?, lama = ?, stts_pulang = 'Pindah Kamar'
        WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`, [
        tarifBaru,
        tglPindah,
        jamPindah,
        biayaLama,
        lamaLama,
        noRawat,
        baris.nm_dokter ?? "",
        baris.diagnosa_akhir ?? "",
        tglMasuk,
      ]);
      await statusKamar(connection, kdKamarAsal, "KOSONG");
      await tambahInapBaru(connection, barisBaru);
      await statusKamar(connection, kdKamarTujuan, "ISI");
    }

    await connection.commit();
    return NextResponse.json({
      success: true,
      data: { no_rawat: noRawat, opsi, kd_kamar_tujuan: kdKamarTujuan },
      message: "Pindah kamar berhasil disimpan.",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    return responsGagalan(error, "Pindah kamar gagal disimpan.");
  } finally {
    if (kunciDidapat && connection && !koneksiRusak) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [namaKunci]);
      } catch {
        connection.destroy();
        koneksiRusak = true;
      }
    }
    if (connection && !koneksiRusak) connection.release();
  }
}

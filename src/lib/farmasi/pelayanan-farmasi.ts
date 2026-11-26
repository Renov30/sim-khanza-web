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

/* -------------------------------------------------------------------------- */
/* 11. BERI OBAT / BHP (inventory/DlgPemberianObat.java)                      */
/* -------------------------------------------------------------------------- */
const STATUS_OBAT = ["Ralan", "Ranap"] as const;

export async function getBeriObat(req: NextRequest) {
  const { denied } = await cekAksesModul("beri_obat", "Beri Obat/BHP");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const status = (searchParams.get("status") || "").trim();

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("dpo.tgl_perawatan >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("dpo.tgl_perawatan <= ?"); params.push(tglSelesai); }
    if (STATUS_OBAT.some((s) => s === status)) { where.push("dpo.status = ?"); params.push(status); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(dpo.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR dpo.kode_brng LIKE ? OR COALESCE(db.nama_brng,'') LIKE ? OR COALESCE(b.nm_bangsal,'') LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, bangsalRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number; grand_total: number }>(
        `SELECT COUNT(*) AS total, COALESCE(SUM(dpo.total), 0) AS grand_total
         FROM detail_pemberian_obat dpo
         INNER JOIN reg_periksa rp ON dpo.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN databarang db ON dpo.kode_brng = db.kode_brng
         LEFT JOIN bangsal b ON dpo.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT DATE_FORMAT(dpo.tgl_perawatan, '%Y-%m-%d') AS tgl_perawatan,
                TIME_FORMAT(dpo.jam, '%H:%i:%s') AS jam,
                dpo.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                dpo.kode_brng, COALESCE(db.nama_brng, '') AS nama_brng,
                dpo.biaya_obat, dpo.jml, dpo.embalase, dpo.tuslah, dpo.total,
                dpo.status, dpo.kd_bangsal, COALESCE(b.nm_bangsal, '') AS nm_bangsal,
                dpo.no_batch, dpo.no_faktur
         FROM detail_pemberian_obat dpo
         INNER JOIN reg_periksa rp ON dpo.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN databarang db ON dpo.kode_brng = db.kode_brng
         LEFT JOIN bangsal b ON dpo.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}
         ORDER BY dpo.tgl_perawatan DESC, dpo.jam DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_bangsal: string; nm_bangsal: string }>(
        `SELECT kd_bangsal, nm_bangsal FROM bangsal WHERE status = '1' ORDER BY nm_bangsal ASC LIMIT 100`,
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      ringkasan: { totalBiaya: Number(countRows[0]?.grand_total ?? 0) },
      opsi: {
        status: STATUS_OBAT.map((s) => ({ value: s, label: s })),
        bangsal: bangsalRows.map((b) => ({ value: b.kd_bangsal, label: `${b.kd_bangsal} — ${b.nm_bangsal}` })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data pemberian obat & BHP.");
  }
}

export async function postBeriObat(req: NextRequest) {
  const { denied } = await cekAksesModul("beri_obat", "Beri Obat/BHP");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const tglPerawatan = bacaTanggal(body, "tgl_perawatan", "Tanggal Perawatan", true);
    const jam = bacaJam(body, "jam", "Jam", true);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17, true);
    const kodeBrng = bacaTeks(body, "kode_brng", "Kode Obat/BHP", 15, true);
    const jml = bacaAngka(body, "jml", "Jumlah", 0.01, 999999, true);
    const embalase = bacaAngka(body, "embalase", "Embalase", 0, 99999999, false);
    const tuslah = bacaAngka(body, "tuslah", "Tuslah", 0, 99999999, false);
    const status = bacaEnum(body, "status", "Status", STATUS_OBAT, "Ralan");
    const kdBangsal = bacaTeks(body, "kd_bangsal", "Depo / Bangsal", 5, true);
    const noBatch = bacaTeks(body, "no_batch", "No. Batch", 20, false);
    const noFaktur = bacaTeks(body, "no_faktur", "No. Faktur", 20, false);

    await denganTransaksi(async (conn) => {
      const [regRows] = await conn.execute<RowDataPacket[]>(
        `SELECT status_bayar FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (regRows.length === 0) throw new PelayananError(`No. Rawat ${noRawat} tidak ditemukan.`, 404);
      if (regRows[0].status_bayar === "Sudah Bayar") {
        throw new PelayananError(`Billing ${noRawat} sudah berstatus Sudah Bayar.`, 409);
      }
      const [obatRows] = await conn.execute<RowDataPacket[]>(
        `SELECT h_beli, ralan, kelas1 FROM databarang WHERE kode_brng = ? LIMIT 1`,
        [kodeBrng],
      );
      if (obatRows.length === 0) throw new PelayananError(`Kode obat ${kodeBrng} tidak ditemukan.`, 404);

      const hBeli = Number(obatRows[0].h_beli || 0);
      const hargaDefault = status === "Ranap" ? Number(obatRows[0].kelas1 || obatRows[0].ralan || 0) : Number(obatRows[0].ralan || 0);
      const biayaInput = bacaAngka(body, "biaya_obat", "Harga Obat", 0, 999999999, false);
      const biayaObat = biayaInput > 0 ? biayaInput : hargaDefault;
      const total = Math.round(biayaObat * jml + embalase + tuslah);

      await conn.execute(
        `INSERT INTO detail_pemberian_obat
         (tgl_perawatan, jam, no_rawat, kode_brng, h_beli, biaya_obat, jml, embalase, tuslah, total, status, kd_bangsal, no_batch, no_faktur)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tglPerawatan, jam, noRawat, kodeBrng, hBeli, biayaObat, jml, embalase, tuslah, total, status, kdBangsal, noBatch, noFaktur],
      );
    });

    return NextResponse.json({ success: true, message: `Pemberian obat ${kodeBrng} untuk ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan pemberian obat & BHP.");
  }
}

export async function deleteBeriObat(req: NextRequest) {
  const { denied } = await cekAksesModul("beri_obat", "Beri Obat/BHP");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const tglPerawatan = (sp.get("tgl_perawatan") || "").trim();
    const jam = (sp.get("jam") || "").trim();
    const noRawat = (sp.get("no_rawat") || "").trim();
    const kodeBrng = (sp.get("kode_brng") || "").trim();
    const noBatch = sp.get("no_batch") ?? "";
    const noFaktur = sp.get("no_faktur") ?? "";
    if (!tglPerawatan || !jam || !noRawat || !kodeBrng) {
      throw new PelayananError("Kunci baris pemberian obat tidak lengkap.");
    }
    await denganTransaksi(async (conn) => {
      const [regRows] = await conn.execute<RowDataPacket[]>(
        `SELECT status_bayar FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (regRows[0]?.status_bayar === "Sudah Bayar") {
        throw new PelayananError(`Billing ${noRawat} sudah berstatus Sudah Bayar.`, 409);
      }
      const [res] = await conn.execute<ResultSetHeader>(
        `DELETE FROM detail_pemberian_obat
         WHERE tgl_perawatan = ? AND jam = ? AND no_rawat = ? AND kode_brng = ? AND no_batch = ? AND no_faktur = ?`,
        [tglPerawatan, jam, noRawat, kodeBrng, noBatch, noFaktur],
      );
      if (!res.affectedRows) throw new PelayananError("Data pemberian obat tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Pemberian obat ${kodeBrng} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus data pemberian obat.");
  }
}

/* -------------------------------------------------------------------------- */
/* 12. TARIF FARMASI (inventory/DlgTarifFarmasi.java - Kustom RSUD Merauke)   */
/* -------------------------------------------------------------------------- */
export async function getTarifFarmasi(req: NextRequest) {
  const { denied } = await cekAksesModul("tarif_ralan", "Tarif Farmasi");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const ada = await cekTabelAda("tarif_farmasi");
    if (!ada) {
      return responsDaftar([], 0, halaman, batas, {
        peringatan: "Tabel kustom RSUD Merauke `tarif_farmasi` belum tersedia pada database runtime saat ini.",
      });
    }

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (cari) {
      where.push("jenis_resep LIKE ?");
      params.push(`%${cari}%`);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total FROM tarif_farmasi WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT id, jenis_resep, total_apoteker, total_non_apoteker, total_tarif
         FROM tarif_farmasi
         WHERE ${whereSql}
         ORDER BY id ASC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
    ]);
    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas);
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data tarif farmasi.");
  }
}

export async function postTarifFarmasi(req: NextRequest) {
  const { denied } = await cekAksesModul("tarif_ralan", "Tarif Farmasi");
  if (denied) return denied;
  try {
    if (!(await cekTabelAda("tarif_farmasi"))) {
      throw new PelayananError("Tabel `tarif_farmasi` belum tersedia pada database runtime saat ini.", 503);
    }
    const body = await bacaBodyJson(req);
    const jenisResep = bacaTeks(body, "jenis_resep", "Jenis Resep", 100);
    const apoteker = bacaAngka(body, "total_apoteker", "Tarif Apoteker", 0, 999999999);
    const nonApoteker = bacaAngka(body, "total_non_apoteker", "Tarif Non-Apoteker", 0, 999999999);
    const totalTarif = Math.round(apoteker + nonApoteker);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO tarif_farmasi (jenis_resep, total_apoteker, total_non_apoteker, total_tarif) VALUES (?, ?, ?, ?)`,
        [jenisResep, apoteker, nonApoteker, totalTarif],
      );
    });
    return NextResponse.json({ success: true, message: `Tarif farmasi ${jenisResep} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan tarif farmasi.");
  }
}

export async function putTarifFarmasi(req: NextRequest) {
  const { denied } = await cekAksesModul("tarif_ralan", "Tarif Farmasi");
  if (denied) return denied;
  try {
    if (!(await cekTabelAda("tarif_farmasi"))) {
      throw new PelayananError("Tabel `tarif_farmasi` belum tersedia pada database runtime saat ini.", 503);
    }
    const body = await bacaBodyJson(req);
    const id = bacaAngka(body, "id", "ID Tarif", 1, 999999999, true);
    const jenisResep = bacaTeks(body, "jenis_resep", "Jenis Resep", 100);
    const apoteker = bacaAngka(body, "total_apoteker", "Tarif Apoteker", 0, 999999999);
    const nonApoteker = bacaAngka(body, "total_non_apoteker", "Tarif Non-Apoteker", 0, 999999999);
    const totalTarif = Math.round(apoteker + nonApoteker);

    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>(
        `UPDATE tarif_farmasi SET jenis_resep = ?, total_apoteker = ?, total_non_apoteker = ?, total_tarif = ? WHERE id = ?`,
        [jenisResep, apoteker, nonApoteker, totalTarif, id],
      );
      if (!res.affectedRows) throw new PelayananError("Tarif farmasi tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Tarif farmasi ${jenisResep} berhasil diperbarui.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memperbarui tarif farmasi.");
  }
}

export async function deleteTarifFarmasi(req: NextRequest) {
  const { denied } = await cekAksesModul("tarif_ralan", "Tarif Farmasi");
  if (denied) return denied;
  try {
    if (!(await cekTabelAda("tarif_farmasi"))) {
      throw new PelayananError("Tabel `tarif_farmasi` belum tersedia pada database runtime saat ini.", 503);
    }
    const id = Number(new URL(req.url).searchParams.get("id"));
    if (!Number.isInteger(id) || id <= 0) throw new PelayananError("ID Tarif Farmasi tidak valid.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM tarif_farmasi WHERE id = ?", [id]);
      if (!res.affectedRows) throw new PelayananError("Tarif farmasi tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Tarif farmasi #${id} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus tarif farmasi.");
  }
}

/* -------------------------------------------------------------------------- */
/* 13. RESEP PULANG (inventory/DlgResepPulang.java)                           */
/* -------------------------------------------------------------------------- */
export async function getResepPulang(req: NextRequest) {
  const { denied } = await cekAksesModul("resep_pulang", "Resep Pulang");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("rpul.tanggal >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("rpul.tanggal <= ?"); params.push(tglSelesai); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(rpul.no_rawat LIKE ? OR reg.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR rpul.kode_brng LIKE ? OR COALESCE(db.nama_brng,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, bangsalRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number; grand_total: number }>(
        `SELECT COUNT(*) AS total, COALESCE(SUM(rpul.total), 0) AS grand_total
         FROM resep_pulang rpul
         INNER JOIN reg_periksa reg ON rpul.no_rawat = reg.no_rawat
         INNER JOIN pasien ps ON reg.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN databarang db ON rpul.kode_brng = db.kode_brng
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT rpul.no_rawat, DATE_FORMAT(rpul.tanggal, '%Y-%m-%d') AS tanggal,
                TIME_FORMAT(rpul.jam, '%H:%i:%s') AS jam,
                reg.no_rkm_medis, ps.nm_pasien,
                rpul.kode_brng, COALESCE(db.nama_brng, '') AS nama_brng,
                rpul.jml_barang, rpul.harga, rpul.total, rpul.dosis,
                rpul.kd_bangsal, COALESCE(b.nm_bangsal, '') AS nm_bangsal,
                rpul.no_batch, rpul.no_faktur
         FROM resep_pulang rpul
         INNER JOIN reg_periksa reg ON rpul.no_rawat = reg.no_rawat
         INNER JOIN pasien ps ON reg.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN databarang db ON rpul.kode_brng = db.kode_brng
         LEFT JOIN bangsal b ON rpul.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}
         ORDER BY rpul.tanggal DESC, rpul.jam DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_bangsal: string; nm_bangsal: string }>(
        `SELECT kd_bangsal, nm_bangsal FROM bangsal WHERE status = '1' ORDER BY nm_bangsal ASC LIMIT 100`,
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      ringkasan: { totalBiaya: Number(countRows[0]?.grand_total ?? 0) },
      opsi: {
        bangsal: bangsalRows.map((b) => ({ value: b.kd_bangsal, label: `${b.kd_bangsal} — ${b.nm_bangsal}` })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data resep pulang.");
  }
}

export async function postResepPulang(req: NextRequest) {
  const { denied } = await cekAksesModul("resep_pulang", "Resep Pulang");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17, true);
    const tanggal = bacaTanggal(body, "tanggal", "Tanggal Resep", true);
    const jam = bacaJam(body, "jam", "Jam", true);
    const kodeBrng = bacaTeks(body, "kode_brng", "Kode Obat", 15, true);
    const jmlBarang = bacaAngka(body, "jml_barang", "Jumlah", 0.01, 999999, true);
    const dosis = bacaTeks(body, "dosis", "Aturan Pakai / Dosis", 150, true);
    const kdBangsal = bacaTeks(body, "kd_bangsal", "Depo / Bangsal", 5, true);
    const noBatch = bacaTeks(body, "no_batch", "No. Batch", 20, false);
    const noFaktur = bacaTeks(body, "no_faktur", "No. Faktur", 20, false);

    await denganTransaksi(async (conn) => {
      const [regRows] = await conn.execute<RowDataPacket[]>(
        `SELECT status_bayar FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (regRows.length === 0) throw new PelayananError(`No. Rawat ${noRawat} tidak ditemukan.`, 404);
      if (regRows[0].status_bayar === "Sudah Bayar") {
        throw new PelayananError(`Billing ${noRawat} sudah berstatus Sudah Bayar.`, 409);
      }
      const [obatRows] = await conn.execute<RowDataPacket[]>(
        `SELECT kelas1, ralan FROM databarang WHERE kode_brng = ? LIMIT 1`,
        [kodeBrng],
      );
      if (obatRows.length === 0) throw new PelayananError(`Kode obat ${kodeBrng} tidak ditemukan.`, 404);

      const hargaInput = bacaAngka(body, "harga", "Harga Obat", 0, 999999999, false);
      const harga = hargaInput > 0 ? hargaInput : Number(obatRows[0].kelas1 || obatRows[0].ralan || 0);
      const total = Math.round(harga * jmlBarang);

      await conn.execute(
        `INSERT INTO resep_pulang
         (no_rawat, kode_brng, jml_barang, harga, total, dosis, tanggal, jam, kd_bangsal, no_batch, no_faktur)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [noRawat, kodeBrng, jmlBarang, harga, total, dosis, tanggal, jam, kdBangsal, noBatch, noFaktur],
      );
    });

    return NextResponse.json({ success: true, message: `Resep pulang ${kodeBrng} untuk ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan resep pulang.");
  }
}

export async function deleteResepPulang(req: NextRequest) {
  const { denied } = await cekAksesModul("resep_pulang", "Resep Pulang");
  if (denied) return denied;
  try {
    const sp = new URL(req.url).searchParams;
    const noRawat = (sp.get("no_rawat") || "").trim();
    const tanggal = (sp.get("tanggal") || "").trim();
    const jam = (sp.get("jam") || "").trim();
    const kodeBrng = (sp.get("kode_brng") || "").trim();
    const noBatch = sp.get("no_batch") ?? "";
    const noFaktur = sp.get("no_faktur") ?? "";
    if (!noRawat || !tanggal || !jam || !kodeBrng) {
      throw new PelayananError("Kunci baris resep pulang tidak lengkap.");
    }
    await denganTransaksi(async (conn) => {
      const [regRows] = await conn.execute<RowDataPacket[]>(
        `SELECT status_bayar FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (regRows[0]?.status_bayar === "Sudah Bayar") {
        throw new PelayananError(`Billing ${noRawat} sudah berstatus Sudah Bayar.`, 409);
      }
      const [res] = await conn.execute<ResultSetHeader>(
        `DELETE FROM resep_pulang
         WHERE no_rawat = ? AND tanggal = ? AND jam = ? AND kode_brng = ? AND no_batch = ? AND no_faktur = ?`,
        [noRawat, tanggal, jam, kodeBrng, noBatch, noFaktur],
      );
      if (!res.affectedRows) throw new PelayananError("Data resep pulang tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Resep pulang ${kodeBrng} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus data resep pulang.");
  }
}


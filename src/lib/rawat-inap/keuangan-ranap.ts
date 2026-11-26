import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import {
  PelayananError,
  cekAksesModul,
  bacaAngka,
  bacaBodyJson,
  bacaPagination,
  bacaTanggal,
  bacaTanggalQuery,
  bacaTeks,
  bacaJam,
  denganTransaksi,
  responsDaftar,
  tanganiErrorPelayanan,
  waktuLokalJayapura,
} from "@/lib/modul/pelayanan";

/* -------------------------------------------------------------------------- */
/* 18. DEPOSIT PASIEN (keuangan/DlgDeposit.java)                              */
/* -------------------------------------------------------------------------- */
export async function getDepositPasien(req: NextRequest) {
  const { denied } = await cekAksesModul("deposit_pasien", "Deposit Pasien");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");

    const where = ["1=1"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("DATE(d.tgl_deposit) >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("DATE(d.tgl_deposit) <= ?"); params.push(tglSelesai); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(d.no_deposit LIKE ? OR d.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR d.nama_bayar LIKE ? OR d.keterangan LIKE ?)");
      params.push(like, like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data, akunRows, petugasRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number; grand_total: number }>(
        `SELECT COUNT(*) AS total, COALESCE(SUM(d.besar_deposit), 0) AS grand_total
         FROM deposit d
         INNER JOIN reg_periksa rp ON d.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT d.no_deposit, d.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                DATE_FORMAT(d.tgl_deposit, '%Y-%m-%d %H:%i:%s') AS tgl_deposit,
                d.nama_bayar, d.besarppn, d.besar_deposit,
                (d.besar_deposit + d.besarppn) AS total_bayar,
                d.nip, COALESCE(pt.nama, '') AS nama_petugas, d.keterangan
         FROM deposit d
         INNER JOIN reg_periksa rp ON d.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN petugas pt ON d.nip = pt.nip
         WHERE ${whereSql}
         ORDER BY d.tgl_deposit DESC, d.no_deposit DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { nama_bayar: string; ppn: number }>(
        "SELECT nama_bayar, ppn FROM akun_bayar ORDER BY nama_bayar ASC",
      ),
      executeQuery<RowDataPacket & { nip: string; nama: string }>(
        "SELECT nip, nama FROM petugas WHERE status = '1' ORDER BY nama ASC",
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      ringkasan: { totalDeposit: Number(countRows[0]?.grand_total ?? 0) },
      opsi: {
        akunBayar: akunRows.map((a) => ({ value: a.nama_bayar, label: `${a.nama_bayar} (PPN ${a.ppn}%)` })),
        petugas: petugasRows.map((p) => ({ value: p.nip, label: `${p.nip} - ${p.nama}` })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data deposit pasien.");
  }
}

export async function postDepositPasien(req: NextRequest) {
  const { session, denied } = await cekAksesModul("deposit_pasien", "Deposit Pasien");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const now = waktuLokalJayapura();
    const tgl = bacaTanggal(body, "tgl_only", "Tanggal Deposit", false) || now.tanggal;
    const jam = bacaJam(body, "jam_only", "Jam Deposit", false) || now.jam;
    const namaBayar = bacaTeks(body, "nama_bayar", "Akun Bayar", 50);
    const besarDeposit = bacaAngka(body, "besar_deposit", "Besar Deposit", 1, 999999999999, true);
    const nip = bacaTeks(body, "nip", "NIP Petugas", 20, false) || session.username;
    const keterangan = bacaTeks(body, "keterangan", "Keterangan", 70, false);
    const prefix = `DP${tgl.replaceAll("-", "")}`;

    const noDeposit = await denganTransaksi(async (conn) => {
      const [akunRows] = await conn.execute<(RowDataPacket & { ppn: number })[]>(
        "SELECT ppn FROM akun_bayar WHERE nama_bayar = ? LIMIT 1",
        [namaBayar],
      );
      if (!akunRows.length) throw new PelayananError("Akun bayar tidak ditemukan.", 400);
      const persenPpn = Number(akunRows[0].ppn || 0);
      const besarPpn = Math.round((besarDeposit * persenPpn) / 100);

      const [maxRows] = await conn.execute<(RowDataPacket & { terakhir: number })[]>(
        "SELECT IFNULL(MAX(CAST(RIGHT(no_deposit, 4) AS UNSIGNED)), 0) AS terakhir FROM deposit WHERE no_deposit LIKE ?",
        [`${prefix}%`],
      );
      const nomor = `${prefix}${String(Number(maxRows[0]?.terakhir ?? 0) + 1).padStart(4, "0")}`;

      await conn.execute(
        `INSERT INTO deposit (no_deposit, no_rawat, tgl_deposit, nama_bayar, besarppn, besar_deposit, nip, keterangan)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nomor, noRawat, `${tgl} ${jam}`, namaBayar, besarPpn, besarDeposit, nip, keterangan],
      );
      return nomor;
    }, `khanza-web:deposit:${prefix}`);

    return NextResponse.json({ success: true, data: { no_deposit: noDeposit }, message: `Deposit ${noDeposit} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan deposit pasien.");
  }
}

export async function deleteDepositPasien(req: NextRequest) {
  const { denied } = await cekAksesModul("deposit_pasien", "Deposit Pasien");
  if (denied) return denied;
  try {
    const noDeposit = (new URL(req.url).searchParams.get("no_deposit") || "").trim();
    if (!noDeposit) throw new PelayananError("No. Deposit wajib disertakan.");
    await denganTransaksi(async (conn) => {
      const [res] = await conn.execute<ResultSetHeader>("DELETE FROM deposit WHERE no_deposit = ?", [noDeposit]);
      if (!res.affectedRows) throw new PelayananError("Data deposit tidak ditemukan.", 404);
    });
    return NextResponse.json({ success: true, message: `Deposit ${noDeposit} berhasil dihapus.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menghapus deposit pasien.");
  }
}

/* -------------------------------------------------------------------------- */
/* 19. PERKIRAAN BIAYA RANAP (keuangan/DlgPerkiraanBiayaRanap.java)           */
/* -------------------------------------------------------------------------- */
export async function getPerkiraanBiayaRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("perkiraan_biaya_ranap", "Perkiraan Biaya Ranap");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const { halaman, batas, offset, cari } = bacaPagination(searchParams, 50, 100);
    const bangsal = (searchParams.get("bangsal") || "").trim();

    const where = ["ki.stts_pulang = '-'"];
    const params: (string | number)[] = [];
    if (bangsal) { where.push("k.kd_bangsal = ?"); params.push(bangsal); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(ki.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR k.kd_kamar LIKE ? OR b.nm_bangsal LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, rows, bangsalRows] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM kamar_inap ki
         INNER JOIN reg_periksa rp ON ki.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         INNER JOIN kamar k ON ki.kd_kamar = k.kd_kamar
         INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT ki.no_rawat, rp.no_rkm_medis, ps.nm_pasien,
                CONCAT(ki.kd_kamar, ' - ', b.nm_bangsal) AS kamar_bangsal,
                COALESCE(pj.png_jawab, '') AS png_jawab,
                rp.biaya_reg AS registrasi,
                ki.ttl_biaya AS biaya_kamar,
                ki.diagnosa_awal,
                COALESCE(pbr.kd_penyakit, '') AS kd_penyakit,
                COALESCE(pbr.tarif, 0) AS perkiraan_tarif,
                COALESCE((SELECT SUM(biaya_rawat) FROM rawat_inap_dr WHERE no_rawat = ki.no_rawat), 0)
                  + COALESCE((SELECT SUM(biaya_rawat) FROM rawat_inap_pr WHERE no_rawat = ki.no_rawat), 0)
                  + COALESCE((SELECT SUM(biaya_rawat) FROM rawat_inap_drpr WHERE no_rawat = ki.no_rawat), 0)
                  + COALESCE((SELECT SUM(biaya_rawat) FROM rawat_jl_dr WHERE no_rawat = ki.no_rawat), 0)
                  + COALESCE((SELECT SUM(biaya_rawat) FROM rawat_jl_pr WHERE no_rawat = ki.no_rawat), 0)
                  + COALESCE((SELECT SUM(biaya_rawat) FROM rawat_jl_drpr WHERE no_rawat = ki.no_rawat), 0) AS tindakan,
                COALESCE((SELECT SUM(total) FROM detail_pemberian_obat WHERE no_rawat = ki.no_rawat), 0) AS obat,
                COALESCE((SELECT SUM(total) FROM resep_pulang WHERE no_rawat = ki.no_rawat), 0) AS resep_pulang,
                COALESCE((SELECT SUM(biaya) FROM periksa_lab WHERE no_rawat = ki.no_rawat), 0) AS laborat,
                COALESCE((SELECT SUM(biaya) FROM periksa_radiologi WHERE no_rawat = ki.no_rawat), 0) AS radiologi,
                COALESCE((SELECT SUM(besar_deposit) FROM deposit WHERE no_rawat = ki.no_rawat), 0) AS deposit
         FROM kamar_inap ki
         INNER JOIN reg_periksa rp ON ki.no_rawat = rp.no_rawat
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         INNER JOIN kamar k ON ki.kd_kamar = k.kd_kamar
         INNER JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
         LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
         LEFT JOIN perkiraan_biaya_ranap pbr ON ki.no_rawat = pbr.no_rawat
         WHERE ${whereSql}
         ORDER BY b.nm_bangsal ASC, ki.tgl_masuk DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
      executeQuery<RowDataPacket & { kd_bangsal: string; nm_bangsal: string }>(
        "SELECT kd_bangsal, nm_bangsal FROM bangsal WHERE status = '1' ORDER BY nm_bangsal ASC",
      ),
    ]);

    const data = rows.map((r) => {
      const total =
        Number(r.registrasi || 0) +
        Number(r.biaya_kamar || 0) +
        Number(r.tindakan || 0) +
        Number(r.obat || 0) +
        Number(r.resep_pulang || 0) +
        Number(r.laborat || 0) +
        Number(r.radiologi || 0);
      const deposit = Number(r.deposit || 0);
      const perkiraanTarif = Number(r.perkiraan_tarif || 0);
      return {
        ...r,
        total_biaya: total,
        kekurangan: Math.max(0, total - deposit),
        selisih_limit: perkiraanTarif > 0 ? perkiraanTarif - total : 0,
      };
    });

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: {
        bangsal: bangsalRows.map((b) => ({ value: b.kd_bangsal, label: `${b.kd_bangsal} - ${b.nm_bangsal}` })),
      },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat perkiraan biaya rawat inap.");
  }
}

export async function postPerkiraanBiayaRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("perkiraan_biaya_ranap", "Perkiraan Biaya Ranap");
  if (denied) return denied;
  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const kdPenyakit = bacaTeks(body, "kd_penyakit", "Kode ICD-10", 15);
    const tarif = bacaAngka(body, "perkiraan_tarif", "Perkiraan Tarif", 0, 999999999999, true);

    await denganTransaksi(async (conn) => {
      await conn.execute(
        `INSERT INTO perkiraan_biaya_ranap (no_rawat, kd_penyakit, tarif)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE kd_penyakit = VALUES(kd_penyakit), tarif = VALUES(tarif)`,
        [noRawat, kdPenyakit, tarif],
      );
    });
    return NextResponse.json({ success: true, message: `Perkiraan biaya ${noRawat} berhasil disimpan.` });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal menyimpan perkiraan biaya rawat inap.");
  }
}

/* -------------------------------------------------------------------------- */
/* 20. BILLING RAWAT INAP (keuangan/DlgBilingRanap.java)                      */
/* -------------------------------------------------------------------------- */
const STATUS_BAYAR_OPT = ["Belum Bayar", "Sudah Bayar"] as const;

export async function getBillingRanap(req: NextRequest) {
  const { denied } = await cekAksesModul("billing_ranap", "Billing Rawat Inap");
  if (denied) return denied;
  try {
    const { searchParams } = new URL(req.url);
    const detailNoRawat = (searchParams.get("no_rawat") || "").trim();

    if (detailNoRawat) {
      const [billingRows, notaRows, pembayaranRows] = await Promise.all([
        executeQuery<Record<string, unknown>>(
          `SELECT noindex, no_rawat, DATE_FORMAT(tgl_byr, '%Y-%m-%d') AS tgl_byr,
                  no, nm_perawatan, biaya, jumlah, tambahan, totalbiaya, status
           FROM billing
           WHERE no_rawat = ?
           ORDER BY noindex ASC`,
          [detailNoRawat],
        ),
        executeQuery<Record<string, unknown>>(
          `SELECT no_rawat, no_nota, DATE_FORMAT(tanggal, '%Y-%m-%d') AS tanggal,
                  TIME_FORMAT(jam, '%H:%i:%s') AS jam, Uang_Muka AS uang_muka
           FROM nota_inap WHERE no_rawat = ? LIMIT 1`,
          [detailNoRawat],
        ),
        executeQuery<Record<string, unknown>>(
          `SELECT nama_bayar, besarppn, besar_bayar FROM detail_nota_inap WHERE no_rawat = ?`,
          [detailNoRawat],
        ),
      ]);
      return NextResponse.json({
        success: true,
        data: {
          no_rawat: detailNoRawat,
          nota: notaRows[0] ?? null,
          pembayaran: pembayaranRows,
          items: billingRows,
        },
      });
    }

    const { halaman, batas, offset, cari } = bacaPagination(searchParams);
    const tglMulai = bacaTanggalQuery(searchParams.get("tanggal_mulai"), "Tanggal mulai");
    const tglSelesai = bacaTanggalQuery(searchParams.get("tanggal_selesai"), "Tanggal selesai");
    const statusBayar = (searchParams.get("status_bayar") || "").trim();

    const where = ["rp.status_lanjut = 'Ranap'"];
    const params: (string | number)[] = [];
    if (tglMulai) { where.push("rp.tgl_registrasi >= ?"); params.push(tglMulai); }
    if (tglSelesai) { where.push("rp.tgl_registrasi <= ?"); params.push(tglSelesai); }
    if (STATUS_BAYAR_OPT.some((s) => s === statusBayar)) { where.push("rp.status_bayar = ?"); params.push(statusBayar); }
    if (cari) {
      const like = `%${cari}%`;
      where.push("(rp.no_rawat LIKE ? OR rp.no_rkm_medis LIKE ? OR ps.nm_pasien LIKE ? OR COALESCE(ni.no_nota,'') LIKE ? OR COALESCE(pj.png_jawab,'') LIKE ?)");
      params.push(like, like, like, like, like);
    }
    const whereSql = where.join(" AND ");

    const [countRows, data] = await Promise.all([
      executeQuery<RowDataPacket & { total: number }>(
        `SELECT COUNT(*) AS total
         FROM reg_periksa rp
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN nota_inap ni ON rp.no_rawat = ni.no_rawat
         LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
         WHERE ${whereSql}`,
        params,
      ),
      executeQuery<Record<string, unknown>>(
        `SELECT rp.no_rawat, DATE_FORMAT(rp.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
                rp.no_rkm_medis, ps.nm_pasien,
                COALESCE(pj.png_jawab, '') AS png_jawab,
                COALESCE(ni.no_nota, '-') AS no_nota,
                COALESCE(DATE_FORMAT(ni.tanggal, '%Y-%m-%d'), '-') AS tgl_nota,
                COALESCE((SELECT SUM(totalbiaya) FROM billing WHERE no_rawat = rp.no_rawat), 0) AS total_billing,
                COALESCE((SELECT SUM(besar_deposit) FROM deposit WHERE no_rawat = rp.no_rawat), 0) AS total_deposit,
                COALESCE((SELECT SUM(besar_bayar) FROM detail_nota_inap WHERE no_rawat = rp.no_rawat), 0) AS total_dibayar,
                rp.status_bayar
         FROM reg_periksa rp
         INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
         LEFT JOIN nota_inap ni ON rp.no_rawat = ni.no_rawat
         LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
         WHERE ${whereSql}
         ORDER BY rp.tgl_registrasi DESC, rp.no_rawat DESC
         LIMIT ? OFFSET ?`,
        [...params, batas, offset],
      ),
    ]);

    return responsDaftar(data, Number(countRows[0]?.total ?? 0), halaman, batas, {
      opsi: { statusBayar: STATUS_BAYAR_OPT.map((s) => ({ value: s, label: s })) },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, "Gagal memuat data billing rawat inap.");
  }
}

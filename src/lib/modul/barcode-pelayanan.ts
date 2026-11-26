import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "@/lib/db";
import {
  PelayananError,
  bacaBodyJson,
  bacaTeks,
  cekAksesModul,
  denganTransaksi,
  tanganiErrorPelayanan,
  waktuLokalJayapura,
} from "@/lib/modul/pelayanan";

export type JenisBarcode = "ralan" | "ranap";

interface KunjunganBarcode {
  no_rawat: string;
  no_rkm_medis: string;
  nm_pasien: string;
  jk: string;
  kd_dokter: string;
  nm_dokter: string;
  kd_poli: string;
  nm_poli: string;
  kd_pj: string;
  png_jawab: string;
  status_lanjut: string;
  stts: string;
  status_bayar: string;
  kd_kamar: string;
  kd_bangsal_kamar: string;
  nm_bangsal_kamar: string;
  kelas_kamar: string;
  billing_terverifikasi: boolean;
}

interface ItemObatInput {
  kode_brng: string;
  jumlah: number;
  pakai_kapasitas: boolean;
  embalase: number;
  tuslah: number;
  no_batch: string;
  no_faktur: string;
}

function kolomHargaObat(jenis: JenisBarcode, kelas: string): string {
  if (jenis === "ralan") return "ralan";
  switch (kelas) {
    case "Kelas 1":
      return "kelas1";
    case "Kelas 2":
      return "kelas2";
    case "Kelas 3":
      return "kelas3";
    case "Kelas Utama":
      return "utama";
    case "Kelas VIP":
      return "vip";
    case "Kelas VVIP":
      return "vvip";
    default:
      return "kelas1";
  }
}

async function muatKunjungan(jenis: JenisBarcode, noRawat: string): Promise<KunjunganBarcode | null> {
  const rows = await executeQuery<RowDataPacket & Omit<KunjunganBarcode, "billing_terverifikasi">>(
    `SELECT rp.no_rawat, rp.no_rkm_medis, ps.nm_pasien, ps.jk,
            rp.kd_dokter, COALESCE(d.nm_dokter, '') AS nm_dokter,
            rp.kd_poli, COALESCE(p.nm_poli, '') AS nm_poli,
            rp.kd_pj, COALESCE(pj.png_jawab, '') AS png_jawab,
            rp.status_lanjut, rp.stts, rp.status_bayar,
            COALESCE(ki.kd_kamar, '') AS kd_kamar,
            COALESCE(k.kd_bangsal, '') AS kd_bangsal_kamar,
            COALESCE(b.nm_bangsal, '') AS nm_bangsal_kamar,
            COALESCE(k.kelas, '') AS kelas_kamar
     FROM reg_periksa rp
     INNER JOIN pasien ps ON rp.no_rkm_medis = ps.no_rkm_medis
     LEFT JOIN dokter d ON rp.kd_dokter = d.kd_dokter
     LEFT JOIN poliklinik p ON rp.kd_poli = p.kd_poli
     LEFT JOIN penjab pj ON rp.kd_pj = pj.kd_pj
     LEFT JOIN kamar_inap ki ON rp.no_rawat = ki.no_rawat AND ki.stts_pulang = '-'
     LEFT JOIN kamar k ON ki.kd_kamar = k.kd_kamar
     LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
     WHERE rp.no_rawat = ?
     LIMIT 1`,
    [noRawat],
  );
  if (!rows.length) return null;

  const billingRows = await executeQuery<RowDataPacket & { jml: number }>(
    "SELECT COUNT(*) AS jml FROM billing WHERE no_rawat = ?",
    [noRawat],
  );
  const row = rows[0];
  return {
    no_rawat: String(row.no_rawat || ""),
    no_rkm_medis: String(row.no_rkm_medis || ""),
    nm_pasien: String(row.nm_pasien || ""),
    jk: String(row.jk || ""),
    kd_dokter: String(row.kd_dokter || ""),
    nm_dokter: String(row.nm_dokter || ""),
    kd_poli: String(row.kd_poli || ""),
    nm_poli: String(row.nm_poli || ""),
    kd_pj: String(row.kd_pj || ""),
    png_jawab: String(row.png_jawab || ""),
    status_lanjut: String(row.status_lanjut || ""),
    stts: String(row.stts || ""),
    status_bayar: String(row.status_bayar || ""),
    kd_kamar: String(row.kd_kamar || ""),
    kd_bangsal_kamar: String(row.kd_bangsal_kamar || ""),
    nm_bangsal_kamar: String(row.nm_bangsal_kamar || ""),
    kelas_kamar: String(row.kelas_kamar || ""),
    billing_terverifikasi: Number(billingRows[0]?.jml ?? 0) > 0,
  };
}

async function tentukanDepo(jenis: JenisBarcode, kunjungan: KunjunganBarcode): Promise<{ kd_bangsal: string; nm_bangsal: string }> {
  let kdDepo = "";
  if (jenis === "ralan" && kunjungan.kd_poli) {
    const r = await executeQuery<RowDataPacket & { kd_bangsal: string }>(
      "SELECT kd_bangsal FROM set_depo_ralan WHERE kd_poli = ? LIMIT 1",
      [kunjungan.kd_poli],
    );
    kdDepo = String(r[0]?.kd_bangsal || "");
  } else if (jenis === "ranap" && kunjungan.kd_bangsal_kamar) {
    const r = await executeQuery<RowDataPacket & { kd_depo: string }>(
      "SELECT kd_depo FROM set_depo_ranap WHERE kd_bangsal = ? LIMIT 1",
      [kunjungan.kd_bangsal_kamar],
    );
    kdDepo = String(r[0]?.kd_depo || "");
  }

  if (!kdDepo) {
    const fallback = await executeQuery<RowDataPacket & { kd_bangsal: string }>(
      "SELECT kd_bangsal FROM set_lokasi LIMIT 1",
    );
    kdDepo = String(fallback[0]?.kd_bangsal || "");
  }

  if (!kdDepo) return { kd_bangsal: "", nm_bangsal: "" };
  const b = await executeQuery<RowDataPacket & { nm_bangsal: string }>(
    "SELECT nm_bangsal FROM bangsal WHERE kd_bangsal = ? LIMIT 1",
    [kdDepo],
  );
  return { kd_bangsal: kdDepo, nm_bangsal: String(b[0]?.nm_bangsal || kdDepo) };
}

export async function handleGetBarcode(req: NextRequest, jenis: JenisBarcode) {
  const perm = jenis === "ralan" ? "barcoderalan" : "barcoderanap";
  const label = jenis === "ralan" ? "Barcode Tindakan Ralan" : "Barcode Tindakan Ranap";
  const { denied } = await cekAksesModul(perm, label);
  if (denied) return denied;

  try {
    const { searchParams } = new URL(req.url);
    const noRawat = (searchParams.get("no_rawat") || "").trim();
    const cariTindakan = (searchParams.get("cari_tindakan") || "").trim().slice(0, 80);
    const cariObat = (searchParams.get("cari_obat") || "").trim().slice(0, 80);

    if (!noRawat) {
      return NextResponse.json({
        success: true,
        data: { kunjungan: null, depo: null, embalase: 0, tuslah: 0, tindakan: [], obat: [] },
      });
    }

    const kunjungan = await muatKunjungan(jenis, noRawat);
    if (!kunjungan) {
      throw new PelayananError(`Kunjungan dengan No. Rawat ${noRawat} tidak ditemukan.`, 404);
    }
    if (jenis === "ranap" && !kunjungan.kd_kamar) {
      throw new PelayananError(`Pasien ${noRawat} tidak memiliki kamar rawat inap aktif.`, 400);
    }

    const [depo, setEmbalaseRows, setTarifRows] = await Promise.all([
      tentukanDepo(jenis, kunjungan),
      executeQuery<RowDataPacket & { embalase_per_obat: number; tuslah_per_obat: number }>(
        "SELECT embalase_per_obat, tuslah_per_obat FROM set_embalase LIMIT 1",
      ),
      executeQuery<RowDataPacket & Record<string, string>>("SELECT * FROM set_tarif LIMIT 1"),
    ]);

    const embalase = Number(setEmbalaseRows[0]?.embalase_per_obat ?? 0);
    const tuslah = Number(setEmbalaseRows[0]?.tuslah_per_obat ?? 0);
    const st = setTarifRows[0] || {};

    // Query Tindakan Dokter
    const tindakanWhere = ["jp.status = '1'", "jp.total_byrdr > 0"];
    const tindakanParams: (string | number)[] = [];
    if (jenis === "ralan") {
      if (st.cara_bayar_ralan === "Yes") {
        tindakanWhere.push("(jp.kd_pj = ? OR jp.kd_pj = '-')");
        tindakanParams.push(kunjungan.kd_pj);
      }
      if (st.poli_ralan === "Yes") {
        tindakanWhere.push("(jp.kd_poli = ? OR jp.kd_poli = '-')");
        tindakanParams.push(kunjungan.kd_poli);
      }
    } else {
      if (st.cara_bayar_ranap === "Yes") {
        tindakanWhere.push("(jp.kd_pj = ? OR jp.kd_pj = '-')");
        tindakanParams.push(kunjungan.kd_pj);
      }
      if (st.ruang_ranap === "Yes") {
        tindakanWhere.push("(jp.kd_bangsal = ? OR jp.kd_bangsal = '-')");
        tindakanParams.push(kunjungan.kd_bangsal_kamar);
      }
      if (st.kelas_ranap === "Yes" && kunjungan.kelas_kamar) {
        tindakanWhere.push("(jp.kelas = ? OR jp.kelas = '-')");
        tindakanParams.push(kunjungan.kelas_kamar);
      }
    }
    if (cariTindakan) {
      const like = `%${cariTindakan}%`;
      tindakanWhere.push("(jp.kd_jenis_prw LIKE ? OR jp.nm_perawatan LIKE ? OR COALESCE(kp.nm_kategori,'') LIKE ?)");
      tindakanParams.push(like, like, like);
    }

    const tabelTarif = jenis === "ralan" ? "jns_perawatan" : "jns_perawatan_inap";
    const hargaCol = kolomHargaObat(jenis, kunjungan.kelas_kamar);

    const obatWhere = ["db.status = '1'", "gb.kd_bangsal = ?", "gb.stok > 0"];
    const obatParams: (string | number)[] = [depo.kd_bangsal];
    if (cariObat) {
      const like = `%${cariObat}%`;
      obatWhere.push("(db.kode_brng LIKE ? OR db.nama_brng LIKE ? OR COALESCE(j.nama,'') LIKE ? OR gb.no_batch LIKE ?)");
      obatParams.push(like, like, like, like);
    }

    const [tindakan, obat] = await Promise.all([
      executeQuery<Record<string, unknown>>(
        `SELECT jp.kd_jenis_prw, jp.nm_perawatan, COALESCE(kp.nm_kategori, '') AS nm_kategori,
                jp.total_byrdr, jp.material, jp.bhp, jp.tarif_tindakandr, jp.kso, jp.menejemen
         FROM ${tabelTarif} jp
         LEFT JOIN kategori_perawatan kp ON jp.kd_kategori = kp.kd_kategori
         WHERE ${tindakanWhere.join(" AND ")}
         ORDER BY jp.nm_perawatan ASC
         LIMIT 100`,
        tindakanParams,
      ),
      depo.kd_bangsal
        ? executeQuery<Record<string, unknown>>(
            `SELECT db.kode_brng, db.nama_brng, COALESCE(ks.satuan, db.kode_sat) AS satuan,
                    COALESCE(j.nama, '') AS jenis, db.kapasitas, db.h_beli,
                    db.${hargaCol} AS harga, gb.stok, gb.no_batch, gb.no_faktur
             FROM databarang db
             INNER JOIN gudangbarang gb ON db.kode_brng = gb.kode_brng
             LEFT JOIN kodesatuan ks ON db.kode_sat = ks.kode_sat
             LEFT JOIN jenis j ON db.kdjns = j.kdjns
             WHERE ${obatWhere.join(" AND ")}
             ORDER BY db.nama_brng ASC
             LIMIT 100`,
            obatParams,
          )
        : Promise.resolve([]),
    ]);

    return NextResponse.json({
      success: true,
      data: { kunjungan, depo, embalase, tuslah, tindakan, obat },
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal memuat data ${label}.`);
  }
}

export async function handlePostBarcode(req: NextRequest, jenis: JenisBarcode) {
  const perm = jenis === "ralan" ? "barcoderalan" : "barcoderanap";
  const label = jenis === "ralan" ? "Barcode Tindakan Ralan" : "Barcode Tindakan Ranap";
  const { session, denied } = await cekAksesModul(perm, label);
  if (denied) return denied;

  try {
    const body = await bacaBodyJson(req);
    const noRawat = bacaTeks(body, "no_rawat", "No. Rawat", 17);
    const tindakanList = Array.isArray(body.tindakan)
      ? body.tindakan.filter((v): v is string => typeof v === "string" && v.trim().length > 0).map((v) => v.trim())
      : [];
    const obatMentah = Array.isArray(body.obat) ? body.obat : [];

    const obatList: ItemObatInput[] = [];
    for (const raw of obatMentah) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
      const obj = raw as Record<string, unknown>;
      const kodeBrng = typeof obj.kode_brng === "string" ? obj.kode_brng.trim() : "";
      const jumlah = Number(obj.jumlah);
      if (!kodeBrng || !Number.isFinite(jumlah) || jumlah <= 0) continue;
      const embalase = Math.max(0, Number(obj.embalase) || 0);
      const tuslah = Math.max(0, Number(obj.tuslah) || 0);
      obatList.push({
        kode_brng: kodeBrng,
        jumlah,
        pakai_kapasitas: Boolean(obj.pakai_kapasitas),
        embalase,
        tuslah,
        no_batch: typeof obj.no_batch === "string" ? obj.no_batch.trim().slice(0, 20) : "",
        no_faktur: typeof obj.no_faktur === "string" ? obj.no_faktur.trim().slice(0, 20) : "",
      });
    }

    if (tindakanList.length === 0 && obatList.length === 0) {
      throw new PelayananError("Pilih minimal satu tindakan atau obat/BHP yang akan disimpan.");
    }
    if (tindakanList.length > 50 || obatList.length > 50) {
      throw new PelayananError("Jumlah item maksimal 50 per transaksi.");
    }

    const kunjungan = await muatKunjungan(jenis, noRawat);
    if (!kunjungan) throw new PelayananError("Kunjungan tidak ditemukan.", 404);
    if (kunjungan.stts === "Batal") throw new PelayananError("Kunjungan berstatus Batal tidak dapat diinput.", 400);
    if (kunjungan.billing_terverifikasi) {
      throw new PelayananError("Data billing sudah terverifikasi, silakan hubungi bagian kasir/keuangan.", 409);
    }
    if (!kunjungan.kd_dokter) {
      throw new PelayananError("Dokter penanggung jawab kunjungan belum terdaftar.", 400);
    }
    if (jenis === "ranap" && !kunjungan.kd_kamar) {
      throw new PelayananError("Pasien tidak memiliki kamar rawat inap aktif.", 400);
    }

    const depo = await tentukanDepo(jenis, kunjungan);
    if (obatList.length > 0 && !depo.kd_bangsal) {
      throw new PelayananError("Lokasi depo obat belum dikonfigurasi pada database.", 400);
    }

    const now = waktuLokalJayapura();
    const tabelTarif = jenis === "ralan" ? "jns_perawatan" : "jns_perawatan_inap";
    const hargaCol = kolomHargaObat(jenis, kunjungan.kelas_kamar);
    const statusObat = jenis === "ralan" ? "Ralan" : "Ranap";

    const hasil = await denganTransaksi(async (conn) => {
      // Kunci baris reg_periksa & cek ulang billing
      const [regLock] = await conn.execute<(RowDataPacket & { stts: string })[]>(
        "SELECT stts FROM reg_periksa WHERE no_rawat = ? FOR UPDATE",
        [noRawat],
      );
      if (!regLock.length || regLock[0].stts === "Batal") {
        throw new PelayananError("Kunjungan tidak valid atau sudah dibatalkan.", 400);
      }
      const [bilLock] = await conn.execute<(RowDataPacket & { jml: number })[]>(
        "SELECT COUNT(*) AS jml FROM billing WHERE no_rawat = ?",
        [noRawat],
      );
      if (Number(bilLock[0]?.jml ?? 0) > 0) {
        throw new PelayananError("Data billing sudah terverifikasi.", 409);
      }

      let jmlTindakan = 0;
      for (const kdPrw of tindakanList) {
        const [tarifRows] = await conn.execute<
          (RowDataPacket & {
            material: number;
            bhp: number;
            tarif_tindakandr: number;
            kso: number;
            menejemen: number;
            total_byrdr: number;
          })[]
        >(
          `SELECT material, bhp, tarif_tindakandr, kso, menejemen, total_byrdr
           FROM ${tabelTarif}
           WHERE kd_jenis_prw = ? AND status = '1'
           LIMIT 1`,
          [kdPrw],
        );
        if (!tarifRows.length) {
          throw new PelayananError(`Tarif tindakan ${kdPrw} tidak ditemukan atau nonaktif.`, 400);
        }
        const t = tarifRows[0];
        if (jenis === "ralan") {
          await conn.execute(
            `INSERT INTO rawat_jl_dr
             (no_rawat, kd_jenis_prw, kd_dokter, tgl_perawatan, jam_rawat, material, bhp, tarif_tindakandr, kso, menejemen, biaya_rawat, stts_bayar)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Belum')`,
            [
              noRawat, kdPrw, kunjungan.kd_dokter, now.tanggal, now.jam,
              t.material, t.bhp, t.tarif_tindakandr, t.kso, t.menejemen, t.total_byrdr,
            ],
          );
        } else {
          await conn.execute(
            `INSERT INTO rawat_inap_dr
             (no_rawat, kd_jenis_prw, kd_dokter, tgl_perawatan, jam_rawat, material, bhp, tarif_tindakandr, kso, menejemen, biaya_rawat)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              noRawat, kdPrw, kunjungan.kd_dokter, now.tanggal, now.jam,
              t.material, t.bhp, t.tarif_tindakandr, t.kso, t.menejemen, t.total_byrdr,
            ],
          );
        }
        jmlTindakan += 1;
      }

      let jmlObat = 0;
      for (const item of obatList) {
        const [brgRows] = await conn.execute<
          (RowDataPacket & { h_beli: number; harga: number; kapasitas: number; nama_brng: string })[]
        >(
          `SELECT h_beli, ${hargaCol} AS harga, IFNULL(kapasitas, 1) AS kapasitas, nama_brng
           FROM databarang
           WHERE kode_brng = ? AND status = '1'
           LIMIT 1`,
          [item.kode_brng],
        );
        if (!brgRows.length) {
          throw new PelayananError(`Barang ${item.kode_brng} tidak ditemukan atau nonaktif.`, 400);
        }
        const brg = brgRows[0];
        const kapasitas = Number(brg.kapasitas) > 0 ? Number(brg.kapasitas) : 1;
        const jmlFinal = item.pakai_kapasitas ? Number((item.jumlah / kapasitas).toFixed(4)) : item.jumlah;
        const hargaSatuan = Number(brg.harga || 0);
        const hBeli = Number(brg.h_beli || 0);
        const total = Math.round(item.embalase + item.tuslah + hargaSatuan * jmlFinal);

        const [stokRows] = await conn.execute<(RowDataPacket & { stok: number })[]>(
          `SELECT stok FROM gudangbarang
           WHERE kode_brng = ? AND kd_bangsal = ? AND no_batch = ? AND no_faktur = ?
           FOR UPDATE`,
          [item.kode_brng, depo.kd_bangsal, item.no_batch, item.no_faktur],
        );
        const stokAwal = Number(stokRows[0]?.stok ?? 0);
        if (!stokRows.length || stokAwal < jmlFinal) {
          throw new PelayananError(
            `Stok ${brg.nama_brng} di depo ${depo.nm_bangsal} tidak mencukupi (tersedia: ${stokAwal}, diminta: ${jmlFinal}).`,
            409,
          );
        }

        await conn.execute(
          `INSERT INTO detail_pemberian_obat
           (tgl_perawatan, jam, no_rawat, kode_brng, h_beli, biaya_obat, jml, embalase, tuslah, total, status, kd_bangsal, no_batch, no_faktur)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            now.tanggal, now.jam, noRawat, item.kode_brng, hBeli, hargaSatuan,
            jmlFinal, item.embalase, item.tuslah, total, statusObat, depo.kd_bangsal, item.no_batch, item.no_faktur,
          ],
        );

        await conn.execute(
          `UPDATE gudangbarang SET stok = stok - ?
           WHERE kode_brng = ? AND kd_bangsal = ? AND no_batch = ? AND no_faktur = ?`,
          [jmlFinal, item.kode_brng, depo.kd_bangsal, item.no_batch, item.no_faktur],
        );

        await conn.execute(
          `INSERT INTO riwayat_barang_medis
           (kode_brng, stok_awal, masuk, keluar, stok_akhir, posisi, tanggal, jam, petugas, kd_bangsal, status, no_batch, no_faktur, keterangan)
           VALUES (?, ?, 0, ?, ?, 'Pemberian Obat', ?, ?, ?, ?, 'Simpan', ?, ?, ?)`,
          [
            item.kode_brng, stokAwal, jmlFinal, Number((stokAwal - jmlFinal).toFixed(4)),
            now.tanggal, now.jam, session.username, depo.kd_bangsal, item.no_batch, item.no_faktur,
            `${noRawat} ${kunjungan.no_rkm_medis}`,
          ],
        );

        jmlObat += 1;
      }

      return { jmlTindakan, jmlObat };
    });

    return NextResponse.json({
      success: true,
      data: hasil,
      message: `Berhasil menyimpan ${hasil.jmlTindakan} tindakan dan ${hasil.jmlObat} obat/BHP untuk ${noRawat}.`,
    });
  } catch (error) {
    return tanganiErrorPelayanan(error, `Gagal menyimpan input ${label}.`);
  }
}

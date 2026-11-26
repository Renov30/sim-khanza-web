import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import { executeQuery, pool } from "@/lib/db";

const STATUS_REG_VALID = new Set([
  "Sudah",
  "Belum",
  "Batal",
  "Berkas Diterima",
  "Dirujuk",
  "Meninggal",
  "Dirawat",
  "Pulang Paksa",
]);

const STATUS_POLI_VALID = new Set(["Baru", "Lama"]);

const STATUS_PULANG_VALID = new Set([
  "Sehat",
  "Rujuk",
  "APS",
  "+",
  "Meninggal",
  "Sembuh",
  "Membaik",
  "Pulang Paksa",
  "-",
  "Status Belum Lengkap",
]);

const TABEL_HAPUS_BY_TARGET: Readonly<Record<string, { tabel: string; label: string }>> = {
  MnHapusTagihanOperasi: { tabel: "operasi", label: "Tagihan Operasi" },
  MnHapusObatOperasi: { tabel: "beri_obat_operasi", label: "Obat Operasi" },
  MnHapusDeposit: { tabel: "deposit", label: "Deposit" },
  MnHapusDiet: { tabel: "detail_beri_diet", label: "Pemberian Diet" },
  MnHapusDiagnosa: { tabel: "diagnosa_pasien", label: "Diagnosa/Penyakit" },
  MnHapusDpjp: { tabel: "dpjp_ranap", label: "DPJP Ranap" },
  MnHapusHemodialisa: { tabel: "hemodialisa", label: "Hemodialisa" },
  MnHapusKamarInap: { tabel: "kamar_inap", label: "Kamar Inap" },
  MnHapusPotongan: { tabel: "pengurangan_biaya", label: "Potongan Biaya" },
  MnHapusPiutang: { tabel: "piutang_pasien", label: "Piutang Pasien" },
  MnHapusProsedur: { tabel: "prosedur_pasien", label: "Prosedur Tindakan" },
  MnHapusRanapGabung: { tabel: "ranap_gabung", label: "Ranap Gabung" },
  MnHapusRujukKeluar: { tabel: "rujuk", label: "Rujuk Keluar" },
  MnHapusRujukMasuk: { tabel: "rujuk_masuk", label: "Rujuk Masuk" },
  MnHapusTambahan: { tabel: "tambahan_biaya", label: "Tambahan Biaya" },
  MnHapusBookingOperasi: { tabel: "booking_operasi", label: "Booking Operasi" },
  MnHapusTindakanRanapDokter: { tabel: "rawat_inap_dr", label: "Tindakan Ranap Dokter" },
  MnHapusTindakanRanapDokterParamedis: { tabel: "rawat_inap_drpr", label: "Tindakan Ranap Dokter & Paramedis" },
  MnHapusTindakanRanapParamedis: { tabel: "rawat_inap_pr", label: "Tindakan Ranap Paramedis" },
  MnHapusTindakanRalanDokter: { tabel: "rawat_jl_dr", label: "Tindakan Ralan Dokter" },
  MnHapusTindakanRalanDokterParamedis: { tabel: "rawat_jl_drpr", label: "Tindakan Ralan Dokter & Paramedis" },
  MnHapusTindakanRalanParamedis: { tabel: "rawat_jl_pr", label: "Tindakan Ralan Paramedis" },
  MnHapusPemeriksaanRalan: { tabel: "pemeriksaan_ralan", label: "Pemeriksaan Ralan" },
  MnHapusPemeriksaanRanap: { tabel: "pemeriksaan_ranap", label: "Pemeriksaan Ranap" },
  MnHapusLab: { tabel: "periksa_lab", label: "Pemeriksaan Laborat" },
  MnHapusRadiologi: { tabel: "periksa_radiologi", label: "Pemeriksaan Radiologi" },
  MnHapusAturanPkaiObat: { tabel: "aturan_pakai", label: "Aturan Pakai Obat" },
  MnHapusObat: { tabel: "detail_pemberian_obat", label: "Pemberian Obat" },
  MnHapusResepObat: { tabel: "resep_obat", label: "Resep Obat" },
  MnHapusResepPulang: { tabel: "resep_pulang", label: "Resep Pulang" },
  MnHapusReturObat: { tabel: "returpasien", label: "Retur Obat Pasien" },
  MnHapusStokObatRanap: { tabel: "stok_obat_pasien", label: "Stok Obat Ranap" },
  MnHapusRujukan: { tabel: "rujukan_internal_poli", label: "Rujukan Poli Internal" },
};

export async function GET(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const opsi = (searchParams.get("opsi") || "").trim();

    if (opsi === "poli") {
      const rows = await executeQuery<{ kd_poli: string; nm_poli: string }>(
        `SELECT kd_poli, nm_poli FROM poliklinik WHERE status = '1' ORDER BY nm_poli ASC LIMIT 300`,
      );
      return NextResponse.json({
        success: true,
        data: rows.map((r) => ({ value: r.kd_poli, label: `${r.kd_poli} — ${r.nm_poli}` })),
      });
    }
    if (opsi === "dokter") {
      const rows = await executeQuery<{ kd_dokter: string; nm_dokter: string }>(
        `SELECT kd_dokter, nm_dokter FROM dokter WHERE status = '1' ORDER BY nm_dokter ASC LIMIT 500`,
      );
      return NextResponse.json({
        success: true,
        data: rows.map((r) => ({ value: r.kd_dokter, label: `${r.kd_dokter} — ${r.nm_dokter}` })),
      });
    }
    if (opsi === "penjab") {
      const rows = await executeQuery<{ kd_pj: string; png_jawab: string }>(
        `SELECT kd_pj, png_jawab FROM penjab WHERE status = '1' ORDER BY png_jawab ASC LIMIT 300`,
      );
      return NextResponse.json({
        success: true,
        data: rows.map((r) => ({ value: r.kd_pj, label: `${r.kd_pj} — ${r.png_jawab}` })),
      });
    }

    return NextResponse.json({ success: false, error: "Parameter opsi tidak valid." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal memuat opsi aksi konteks." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const sesi = await getSession();
    if (!sesi) {
      return NextResponse.json({ success: false, error: "Sesi tidak valid. Silakan login terlebih dahulu." }, { status: 401 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const aksi = String(body.aksi || "").trim();
    const noRawat = String(body.no_rawat || "").trim();

    if (!aksi || !noRawat || noRawat.length > 30) {
      return NextResponse.json({ success: false, error: "Parameter aksi dan no_rawat wajib diisi." }, { status: 400 });
    }

    // 1. Set status periksa reg_periksa
    if (aksi === "set_status_reg") {
      const nilai = String(body.nilai || "").trim();
      if (!STATUS_REG_VALID.has(nilai)) {
        return NextResponse.json({ success: false, error: "Status registrasi tidak valid." }, { status: 400 });
      }
      await pool.execute(`UPDATE reg_periksa SET stts = ? WHERE no_rawat = ?`, [nilai, noRawat]);
      return NextResponse.json({ success: true, message: `Status ${noRawat} diubah menjadi "${nilai}".` });
    }

    // 2. Set status poli (Baru / Lama)
    if (aksi === "set_status_poli") {
      const nilai = String(body.nilai || "").trim();
      if (!STATUS_POLI_VALID.has(nilai)) {
        return NextResponse.json({ success: false, error: "Status poli tidak valid." }, { status: 400 });
      }
      await pool.execute(`UPDATE reg_periksa SET status_poli = ? WHERE no_rawat = ?`, [nilai, noRawat]);
      return NextResponse.json({ success: true, message: `Status poli ${noRawat} diubah menjadi "${nilai}".` });
    }

    // 3. Mutasi Berkas RM (Diterima / Di Ranap)
    if (aksi === "set_berkas") {
      const mode = String(body.nilai || "").trim();
      if (mode !== "diterima" && mode !== "ranap") {
        return NextResponse.json({ success: false, error: "Mode berkas RM tidak valid." }, { status: 400 });
      }
      const statusBerkas = mode === "ranap" ? "Masuk Ranap" : "Sudah Diterima";
      const kolomWaktu = mode === "ranap" ? "ranap" : "diterima";
      const ada = await executeQuery<{ no_rawat: string }>(
        `SELECT no_rawat FROM mutasi_berkas WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (ada.length > 0) {
        await pool.execute(
          `UPDATE mutasi_berkas SET status = ?, ${kolomWaktu} = NOW() WHERE no_rawat = ?`,
          [statusBerkas, noRawat],
        );
      } else {
        await pool.execute(
          `INSERT INTO mutasi_berkas (no_rawat, status, ${kolomWaktu}) VALUES (?, ?, NOW())`,
          [noRawat, statusBerkas],
        );
      }
      if (mode === "diterima") {
        await pool.execute(
          `UPDATE reg_periksa SET stts = 'Berkas Diterima' WHERE no_rawat = ? AND stts = 'Belum'`,
          [noRawat],
        );
      }
      return NextResponse.json({ success: true, message: `Status berkas RM ${noRawat} dicatat: ${statusBerkas}.` });
    }

    // 4. Antrian Masuk Poli
    if (aksi === "antrian_poli") {
      await pool.execute(
        `UPDATE reg_periksa SET stts = 'Berkas Diterima' WHERE no_rawat = ? AND stts = 'Belum'`,
        [noRawat],
      );
      return NextResponse.json({ success: true, message: `Pasien ${noRawat} ditandai masuk antrian poli.` });
    }

    // 5. Set status pulang kamar_inap
    if (aksi === "set_status_pulang") {
      const nilaiMentah = String(body.nilai || "").trim();
      const nilai = nilaiMentah === "Belum Pulang" ? "-" : nilaiMentah;
      const kdKamar = String(body.kd_kamar || "").trim();
      const tglMasuk = String(body.tgl_masuk || "").trim();
      const jamMasuk = String(body.jam_masuk || "").trim();
      if (!STATUS_PULANG_VALID.has(nilai) || !kdKamar || !tglMasuk || !jamMasuk) {
        return NextResponse.json({ success: false, error: "Data status pulang kamar inap tidak lengkap/valid." }, { status: 400 });
      }
      await pool.execute(
        `UPDATE kamar_inap SET stts_pulang = ? WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`,
        [nilai, noRawat, kdKamar, tglMasuk, jamMasuk],
      );
      return NextResponse.json({ success: true, message: `Status pulang ${noRawat} diubah menjadi "${nilaiMentah}".` });
    }

    // 6. Update hari perawatan kamar_inap
    if (aksi === "update_hari") {
      const kdKamar = String(body.kd_kamar || "").trim();
      const tglMasuk = String(body.tgl_masuk || "").trim();
      const jamMasuk = String(body.jam_masuk || "").trim();
      if (!kdKamar || !tglMasuk || !jamMasuk) {
        return NextResponse.json({ success: false, error: "Identitas baris kamar inap tidak lengkap." }, { status: 400 });
      }
      await pool.execute(
        `UPDATE kamar_inap
         SET lama = GREATEST(1, DATEDIFF(IF(tgl_keluar IS NULL OR tgl_keluar = '0000-00-00', CURDATE(), tgl_keluar), tgl_masuk) + 1),
             ttl_biaya = trf_kamar * GREATEST(1, DATEDIFF(IF(tgl_keluar IS NULL OR tgl_keluar = '0000-00-00', CURDATE(), tgl_keluar), tgl_masuk) + 1)
         WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`,
        [noRawat, kdKamar, tglMasuk, jamMasuk],
      );
      return NextResponse.json({ success: true, message: `Hari perawatan dan total biaya kamar ${noRawat} diperbarui.` });
    }

    // 7. Ganti Poliklinik / Dokter / Penjab
    if (aksi === "ganti_poli") {
      const nilai = String(body.nilai || "").trim();
      if (!nilai) return NextResponse.json({ success: false, error: "Poliklinik baru wajib dipilih." }, { status: 400 });
      await pool.execute(`UPDATE reg_periksa SET kd_poli = ? WHERE no_rawat = ?`, [nilai, noRawat]);
      return NextResponse.json({ success: true, message: `Poliklinik ${noRawat} diubah menjadi ${nilai}.` });
    }
    if (aksi === "ganti_dokter") {
      const nilai = String(body.nilai || "").trim();
      if (!nilai) return NextResponse.json({ success: false, error: "Dokter baru wajib dipilih." }, { status: 400 });
      await pool.execute(`UPDATE reg_periksa SET kd_dokter = ? WHERE no_rawat = ?`, [nilai, noRawat]);
      return NextResponse.json({ success: true, message: `Dokter ${noRawat} diubah menjadi ${nilai}.` });
    }
    if (aksi === "ganti_penjab") {
      const nilai = String(body.nilai || "").trim();
      if (!nilai) return NextResponse.json({ success: false, error: "Jenis bayar baru wajib dipilih." }, { status: 400 });
      await pool.execute(`UPDATE reg_periksa SET kd_pj = ? WHERE no_rawat = ?`, [nilai, noRawat]);
      return NextResponse.json({ success: true, message: `Jenis bayar ${noRawat} diubah menjadi ${nilai}.` });
    }

    // 8. Ganti Diagnosa Awal / Akhir kamar_inap
    if (aksi === "ganti_diagnosa_awal" || aksi === "ganti_diagnosa_akhir") {
      const nilai = String(body.nilai || "").trim().slice(0, 100);
      const kdKamar = String(body.kd_kamar || "").trim();
      const tglMasuk = String(body.tgl_masuk || "").trim();
      const jamMasuk = String(body.jam_masuk || "").trim();
      if (!kdKamar || !tglMasuk || !jamMasuk) {
        return NextResponse.json({ success: false, error: "Identitas baris kamar inap tidak lengkap." }, { status: 400 });
      }
      const kolom = aksi === "ganti_diagnosa_awal" ? "diagnosa_awal" : "diagnosa_akhir";
      await pool.execute(
        `UPDATE kamar_inap SET ${kolom} = ? WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`,
        [nilai, noRawat, kdKamar, tglMasuk, jamMasuk],
      );
      return NextResponse.json({
        success: true,
        message: `${aksi === "ganti_diagnosa_awal" ? "Diagnosa awal" : "Diagnosa akhir"} ${noRawat} diperbarui.`,
      });
    }

    // 9. Gabung Nomor Rawat (Ibu & Bayi / Penggabungan)
    if (aksi === "gabung_no_rawat") {
      const noRawat2 = String(body.nilai || "").trim();
      if (!noRawat2 || noRawat2 === noRawat) {
        return NextResponse.json({ success: false, error: "Nomor rawat tujuan gabung harus valid dan berbeda." }, { status: 400 });
      }
      const cek = await executeQuery<{ no_rawat: string }>(
        `SELECT no_rawat FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat2],
      );
      if (cek.length === 0) {
        return NextResponse.json({ success: false, error: `No. Rawat ${noRawat2} tidak ditemukan.` }, { status: 404 });
      }
      await pool.execute(
        `INSERT IGNORE INTO ranap_gabung (no_rawat, no_rawat2) VALUES (?, ?)`,
        [noRawat, noRawat2],
      );
      return NextResponse.json({ success: true, message: `No. Rawat ${noRawat} digabungkan dengan ${noRawat2}.` });
    }

    // 10. Hapus data transaksi / registrasi
    if (aksi === "hapus_data") {
      const target = String(body.target || "").trim();

      // Cek apakah billing sudah lunas sebelum menghapus transaksi
      const regRows = await executeQuery<{ status_bayar: string }>(
        `SELECT status_bayar FROM reg_periksa WHERE no_rawat = ? LIMIT 1`,
        [noRawat],
      );
      if (regRows[0]?.status_bayar === "Sudah Bayar") {
        return NextResponse.json(
          { success: false, error: `Billing ${noRawat} sudah berstatus Sudah Bayar, penghapusan diblokir.` },
          { status: 409 },
        );
      }

      if (target === "MnHapusDataSalah") {
        const kdKamar = String(body.kd_kamar || "").trim();
        const tglMasuk = String(body.tgl_masuk || "").trim();
        const jamMasuk = String(body.jam_masuk || "").trim();
        if (!kdKamar || !tglMasuk || !jamMasuk) {
          return NextResponse.json({ success: false, error: "Identitas baris kamar inap tidak lengkap." }, { status: 400 });
        }
        const [res] = await pool.execute<ResultSetHeader>(
          `DELETE FROM kamar_inap WHERE no_rawat = ? AND kd_kamar = ? AND tgl_masuk = ? AND jam_masuk = ?`,
          [noRawat, kdKamar, tglMasuk, jamMasuk],
        );
        return NextResponse.json({
          success: true,
          message: `Baris kamar inap ${noRawat} (${kdKamar}) dihapus (${res.affectedRows} baris).`,
        });
      }

      if (target === "MnHapusSemua") {
        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          const urutanTabel = [
            "aturan_pakai",
            "detail_pemberian_obat",
            "resep_pulang",
            "returpasien",
            "stok_obat_pasien",
            "resep_obat",
            "beri_obat_operasi",
            "operasi",
            "booking_operasi",
            "periksa_lab",
            "periksa_radiologi",
            "rawat_jl_dr",
            "rawat_jl_pr",
            "rawat_jl_drpr",
            "rawat_inap_dr",
            "rawat_inap_pr",
            "rawat_inap_drpr",
            "pemeriksaan_ralan",
            "pemeriksaan_ranap",
            "diagnosa_pasien",
            "prosedur_pasien",
            "detail_beri_diet",
            "deposit",
            "pengurangan_biaya",
            "tambahan_biaya",
            "dpjp_ranap",
            "hemodialisa",
            "rujukan_internal_poli",
            "rujuk",
            "rujuk_masuk",
            "ranap_gabung",
            "kamar_inap",
            "mutasi_berkas",
            "reg_periksa",
          ];
          for (const tbl of urutanTabel) {
            await conn.execute(`DELETE FROM \`${tbl}\` WHERE no_rawat = ?`, [noRawat]);
          }
          await conn.commit();
          return NextResponse.json({
            success: true,
            message: `Semua transaksi dan registrasi ${noRawat} berhasil dihapus.`,
          });
        } catch (err) {
          await conn.rollback();
          throw err;
        } finally {
          conn.release();
        }
      }

      const info = TABEL_HAPUS_BY_TARGET[target];
      if (!info) {
        return NextResponse.json({ success: false, error: `Target penghapusan "${target}" tidak dikenal.` }, { status: 400 });
      }
      const [res] = await pool.execute<ResultSetHeader>(
        `DELETE FROM \`${info.tabel}\` WHERE no_rawat = ?`,
        [noRawat],
      );
      return NextResponse.json({
        success: true,
        message: `${info.label} untuk ${noRawat} dihapus (${res.affectedRows} baris).`,
      });
    }

    return NextResponse.json({ success: false, error: `Aksi "${aksi}" tidak dikenal.` }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Gagal mengeksekusi aksi konteks." },
      { status: 500 },
    );
  }
}

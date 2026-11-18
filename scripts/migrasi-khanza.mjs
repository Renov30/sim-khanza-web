import mysql from "mysql2/promise";
import { konfigurasiMigrasi } from "./db/konfigurasi-migrasi.mjs";

const ukuranKelompok = Number(process.env.MIGRASI_UKURAN_KELOMPOK || 500);
if (!Number.isInteger(ukuranKelompok) || ukuranKelompok < 1 || ukuranKelompok > 5000) {
  throw new Error("MIGRASI_UKURAN_KELOMPOK harus berupa bilangan 1 sampai 5000.");
}

const { sumberConfig, tujuanConfig } = konfigurasiMigrasi();

const sumber = await mysql.createConnection(sumberConfig);
const tujuan = await mysql.createConnection(tujuanConfig);

function teks(value, maksimum) {
  if (value === null || value === undefined) return null;
  const hasil = String(value).trim();
  if (!hasil || hasil === "-") return null;
  return hasil.slice(0, maksimum);
}

function tanggal(value) {
  const hasil = String(value || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(hasil) || hasil === "0000-00-00") return null;
  const nilai = new Date(`${hasil}T00:00:00Z`);
  return Number.isNaN(nilai.getTime()) || nilai.toISOString().slice(0, 10) !== hasil ? null : hasil;
}

function kodeJenisKelamin(value) {
  if (value === "L") return "LAKI_LAKI";
  if (value === "P") return "PEREMPUAN";
  return "TIDAK_DIKETAHUI";
}

function kodeGolonganDarah(value) {
  return ["A", "B", "AB", "O"].includes(value) ? value : "TIDAK_DIKETAHUI";
}

function kodePerkawinan(value) {
  const nilai = String(value || "").toUpperCase();
  if (nilai === "MENIKAH") return "MENIKAH";
  if (nilai === "JANDA") return "JANDA";
  if (nilai === "DUDHA" || nilai === "DUDA") return "DUDA";
  if (nilai === "BELUM MENIKAH" || nilai === "JOMBLO") return "BELUM_MENIKAH";
  return "TIDAK_DIKETAHUI";
}

function kodePendidikan(value) {
  const nilai = String(value || "").toUpperCase();
  if (nilai === "TS") return "TIDAK_SEKOLAH";
  if (nilai === "SLTA/SEDERAJAT") return "SMA";
  return ["TK", "SD", "SMP", "SMA", "D1", "D2", "D3", "D4", "S1", "S2", "S3"].includes(nilai)
    ? nilai
    : "TIDAK_DIKETAHUI";
}

function kodeHubungan(value) {
  const nilai = String(value || "").toUpperCase().replaceAll(" ", "_");
  if (nilai === "LAIN-LAIN") return "LAINNYA";
  return ["DIRI_SENDIRI", "AYAH", "IBU", "SUAMI", "ISTRI", "ANAK", "SAUDARA"].includes(nilai)
    ? nilai
    : "TIDAK_DIKETAHUI";
}

function kodeStatusKunjungan(value) {
  const nilai = String(value || "").toUpperCase();
  const pemetaan = {
    BELUM: "BELUM_DILAYANI",
    SUDAH: "SELESAI",
    BATAL: "BATAL",
    "BERKAS DITERIMA": "BERKAS_DITERIMA",
    DIRUJUK: "DIRUJUK",
    MENINGGAL: "MENINGGAL",
    DIRAWAT: "DIRAWAT",
    "PULANG PAKSA": "PULANG_PAKSA",
  };
  return pemetaan[nilai] || "BELUM_DILAYANI";
}

async function barisSatu(koneksi, sql, parameter = []) {
  const [rows] = await koneksi.execute(sql, parameter);
  return rows[0];
}

async function catatMasalah(prosesId, entitas, kunci, kode, rincian) {
  await tujuan.execute(
    `INSERT INTO migrasi_masalah
       (proses_id, jenis_entitas, kunci_sumber, kode_masalah, rincian)
     VALUES (?, ?, ?, ?, ?)`,
    [prosesId, entitas, kunci, kode, rincian.slice(0, 1000)],
  );
}

async function migrasikanMasterSederhana(tabelSumber, kolomKode, kolomNama, tabelTujuan) {
  const [rows] = await sumber.query(
    `SELECT ?? AS kode, ?? AS nama FROM ?? ORDER BY ??`,
    [kolomKode, kolomNama, tabelSumber, kolomKode],
  );
  for (const row of rows) {
    const nama = teks(row.nama, 100);
    if (!nama) continue;
    await tujuan.execute(
      `INSERT INTO ${tabelTujuan} (kode, nama) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE nama = VALUES(nama)`,
      [String(row.kode), nama],
    );
  }
}

async function petakanId(tabel) {
  const [rows] = await tujuan.query(`SELECT id, kode FROM ${tabel}`);
  return new Map(rows.map((row) => [String(row.kode), Number(row.id)]));
}

async function migrasikanMaster() {
  await migrasikanMasterSederhana("suku_bangsa", "id", "nama_suku_bangsa", "suku");
  await migrasikanMasterSederhana("bahasa_pasien", "id", "nama_bahasa", "bahasa");
  await migrasikanMasterSederhana("cacat_fisik", "id", "nama_cacat", "keterbatasan_fisik");

  const wilayahSumber = [
    ["propinsi", "kd_prop", "nm_prop", "PROVINSI"],
    ["kabupaten", "kd_kab", "nm_kab", "KABUPATEN"],
    ["kecamatan", "kd_kec", "nm_kec", "KECAMATAN"],
    ["kelurahan", "kd_kel", "nm_kel", "KELURAHAN"],
  ];
  for (const [tabel, kolomKode, kolomNama, jenis] of wilayahSumber) {
    const [rows] = await sumber.query(
      "SELECT ?? AS kode, ?? AS nama FROM ?? ORDER BY ??",
      [kolomKode, kolomNama, tabel, kolomKode],
    );
    for (const row of rows) {
      const nama = teks(row.nama, 100);
      if (!nama) continue;
      await tujuan.execute(
        `INSERT INTO wilayah (jenis, kode, nama) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE nama = VALUES(nama)`,
        [jenis, String(row.kode), nama],
      );
    }
  }

  const [perusahaanRows] = await sumber.query(
    `SELECT kode_perusahaan, nama_perusahaan, alamat, kota, no_telp
     FROM perusahaan_pasien ORDER BY kode_perusahaan`,
  );
  for (const row of perusahaanRows) {
    await tujuan.execute(
      `INSERT INTO perusahaan (kode, nama, alamat, kota, nomor_telepon)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), alamat=VALUES(alamat),
         kota=VALUES(kota), nomor_telepon=VALUES(nomor_telepon)`,
      [row.kode_perusahaan, teks(row.nama_perusahaan, 150) || "Tidak diketahui",
        teks(row.alamat, 255), teks(row.kota, 100), teks(row.no_telp, 30)],
    );
  }

  const [dokterRows] = await sumber.query(
    "SELECT kd_dokter, nm_dokter, no_ijn_praktek, status FROM dokter ORDER BY kd_dokter",
  );
  for (const row of dokterRows) {
    if (!teks(row.kd_dokter, 32)) continue;
    await tujuan.execute(
      `INSERT INTO dokter (kode, nama, nomor_izin_praktik, aktif)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), nomor_izin_praktik=VALUES(nomor_izin_praktik),
         aktif=VALUES(aktif)`,
      [row.kd_dokter, teks(row.nm_dokter, 150) || "Tidak diketahui",
        teks(row.no_ijn_praktek, 150), row.status === "1"],
    );
  }

  const [unitRows] = await sumber.query(
    "SELECT kd_poli, nm_poli, registrasi, registrasilama, status FROM poliklinik ORDER BY kd_poli",
  );
  for (const row of unitRows) {
    await tujuan.execute(
      `INSERT INTO unit_pelayanan
         (kode, nama, kode_jenis_pelayanan, tarif_pasien_baru, tarif_pasien_lama, aktif)
       VALUES (?, ?, 'RAWAT_JALAN', ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), tarif_pasien_baru=VALUES(tarif_pasien_baru),
         tarif_pasien_lama=VALUES(tarif_pasien_lama), aktif=VALUES(aktif)`,
      [row.kd_poli, teks(row.nm_poli, 150) || "Tidak diketahui",
        Number(row.registrasi) || 0, Number(row.registrasilama) || 0, row.status === "1"],
    );
  }

  const [penjaminRows] = await sumber.query(
    `SELECT kd_pj, png_jawab, nama_perusahaan, alamat_asuransi, no_telp, status
     FROM penjab ORDER BY kd_pj`,
  );
  for (const row of penjaminRows) {
    await tujuan.execute(
      `INSERT INTO penjamin (kode, nama, nama_perusahaan, alamat, nomor_telepon, aktif)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), nama_perusahaan=VALUES(nama_perusahaan),
         alamat=VALUES(alamat), nomor_telepon=VALUES(nomor_telepon), aktif=VALUES(aktif)`,
      [row.kd_pj, teks(row.png_jawab, 150) || "Tidak diketahui",
        teks(row.nama_perusahaan, 150), teks(row.alamat_asuransi, 255),
        teks(row.no_telp, 30), row.status === "1"],
    );
  }
}

async function migrasikanPasien(prosesId, sistemSumberId) {
  const sukuMap = await petakanId("suku");
  const bahasaMap = await petakanId("bahasa");
  const keterbatasanMap = await petakanId("keterbatasan_fisik");
  const perusahaanMap = await petakanId("perusahaan");
  const penjaminMap = await petakanId("penjamin");
  const wilayahRows = await tujuan.query("SELECT id, jenis, kode FROM wilayah").then(([rows]) => rows);
  const wilayahMap = new Map(wilayahRows.map((row) => [`${row.jenis}:${row.kode}`, Number(row.id)]));

  let kunciTerakhir = "";
  let jumlah = 0;
  while (true) {
    const [rows] = await sumber.execute(
      `SELECT * FROM pasien WHERE no_rkm_medis > ?
       ORDER BY no_rkm_medis LIMIT ${ukuranKelompok}`,
      [kunciTerakhir],
    );
    if (!rows.length) break;
    await tujuan.beginTransaction();
    try {
      for (const row of rows) {
        const nomorRm = String(row.no_rkm_medis);
        const [hasil] = await tujuan.execute(
          `INSERT INTO pasien
             (nomor_rekam_medis, nama_lengkap, kode_jenis_kelamin, tempat_lahir,
              tanggal_lahir, nama_ibu, kode_golongan_darah, kode_status_perkawinan,
              kode_pendidikan, agama, pekerjaan, nomor_telepon, alamat_email,
              tanggal_terdaftar, suku_id, bahasa_id, keterbatasan_fisik_id, perusahaan_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), nama_lengkap=VALUES(nama_lengkap),
             kode_jenis_kelamin=VALUES(kode_jenis_kelamin), tempat_lahir=VALUES(tempat_lahir),
             tanggal_lahir=VALUES(tanggal_lahir), nama_ibu=VALUES(nama_ibu),
             kode_golongan_darah=VALUES(kode_golongan_darah),
             kode_status_perkawinan=VALUES(kode_status_perkawinan),
             kode_pendidikan=VALUES(kode_pendidikan), agama=VALUES(agama),
             pekerjaan=VALUES(pekerjaan), nomor_telepon=VALUES(nomor_telepon),
             alamat_email=VALUES(alamat_email), tanggal_terdaftar=VALUES(tanggal_terdaftar),
             suku_id=VALUES(suku_id), bahasa_id=VALUES(bahasa_id),
             keterbatasan_fisik_id=VALUES(keterbatasan_fisik_id), perusahaan_id=VALUES(perusahaan_id)`,
          [nomorRm, teks(row.nm_pasien, 150), kodeJenisKelamin(row.jk),
            teks(row.tmp_lahir, 100), tanggal(row.tgl_lahir), teks(row.nm_ibu, 150),
            kodeGolonganDarah(row.gol_darah), kodePerkawinan(row.stts_nikah),
            kodePendidikan(row.pnd), teks(row.agama, 50), teks(row.pekerjaan, 150),
            teks(row.no_tlp, 30), teks(row.email, 254), tanggal(row.tgl_daftar),
            sukuMap.get(String(row.suku_bangsa)) || null,
            bahasaMap.get(String(row.bahasa_pasien)) || null,
            keterbatasanMap.get(String(row.cacat_fisik)) || null,
            perusahaanMap.get(String(row.perusahaan_pasien)) || null],
        );
        const pasienId = Number(hasil.insertId);
        if (!teks(row.nm_pasien, 150)) {
          await catatMasalah(prosesId, "PASIEN", nomorRm, "NAMA_KOSONG",
            "Nama pasien pada sumber kosong.");
        }
        if (!tanggal(row.tgl_lahir)) {
          await catatMasalah(prosesId, "PASIEN", nomorRm, "TANGGAL_LAHIR_KOSONG",
            "Tanggal lahir pasien pada sumber kosong.");
        }
        await tujuan.execute(
          `INSERT INTO migrasi_pasien (sistem_sumber_id, kunci_sumber, pasien_id)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE pasien_id=VALUES(pasien_id), dimigrasikan_pada=CURRENT_TIMESTAMP`,
          [sistemSumberId, nomorRm, pasienId],
        );

        for (const [jenis, nilai] of [["NIK", row.no_ktp], ["NIP_NRP", row.nip]]) {
          const nomor = teks(nilai, 100);
          if (!nomor) continue;
          await tujuan.execute(
            `INSERT INTO pasien_identitas
               (pasien_id, jenis_identitas, nomor_identitas, nomor_normalisasi, terverifikasi)
             VALUES (?, ?, ?, ?, FALSE)
             ON DUPLICATE KEY UPDATE nomor_normalisasi=VALUES(nomor_normalisasi)`,
            [pasienId, jenis, nomor, nomor.replace(/[^0-9A-Za-z]/g, "").toUpperCase()],
          );
        }

        const alamat = teks(row.alamat, 255);
        const alamatLama = await barisSatu(tujuan,
          "SELECT id FROM pasien_alamat WHERE pasien_id=? AND jenis_alamat='DOMISILI' AND aktif=TRUE LIMIT 1",
          [pasienId]);
        const alamatParams = [alamat,
          wilayahMap.get(`PROVINSI:${row.kd_prop}`) || null,
          wilayahMap.get(`KABUPATEN:${row.kd_kab}`) || null,
          wilayahMap.get(`KECAMATAN:${row.kd_kec}`) || null,
          wilayahMap.get(`KELURAHAN:${row.kd_kel}`) || null];
        if (alamatLama) {
          await tujuan.execute(
            `UPDATE pasien_alamat SET alamat_lengkap=?, provinsi_id=?, kabupaten_id=?,
               kecamatan_id=?, kelurahan_id=?, alamat_utama=TRUE WHERE id=?`,
            [...alamatParams, alamatLama.id],
          );
        } else {
          await tujuan.execute(
            `INSERT INTO pasien_alamat
               (pasien_id, jenis_alamat, alamat_lengkap, provinsi_id, kabupaten_id,
                kecamatan_id, kelurahan_id, alamat_utama)
             VALUES (?, 'DOMISILI', ?, ?, ?, ?, ?, TRUE)`,
            [pasienId, ...alamatParams],
          );
        }

        const namaKontak = teks(row.namakeluarga, 150);
        if (namaKontak) {
          const kontakLama = await barisSatu(tujuan,
            "SELECT id FROM pasien_kontak WHERE pasien_id=? AND penanggung_jawab_keuangan=TRUE LIMIT 1",
            [pasienId]);
          const bagianAlamatKontak = [row.alamatpj, row.kelurahanpj, row.kecamatanpj,
            row.kabupatenpj, row.propinsipj].map((nilai) => teks(nilai, 100)).filter(Boolean);
          const kontakParams = [namaKontak, kodeHubungan(row.keluarga),
            teks(bagianAlamatKontak.join(", "), 255), teks(row.pekerjaanpj, 150)];
          if (kontakLama) {
            await tujuan.execute(
              `UPDATE pasien_kontak SET nama_lengkap=?, kode_hubungan=?, alamat_lengkap=?,
                 pekerjaan=? WHERE id=?`, [...kontakParams, kontakLama.id]);
          } else {
            await tujuan.execute(
              `INSERT INTO pasien_kontak
                 (pasien_id, nama_lengkap, kode_hubungan, alamat_lengkap, pekerjaan,
                  kontak_darurat, penanggung_jawab_keuangan)
               VALUES (?, ?, ?, ?, ?, TRUE, TRUE)`, [pasienId, ...kontakParams]);
          }
        }

        const penjaminId = penjaminMap.get(String(row.kd_pj));
        if (penjaminId) {
          const penjaminLama = await barisSatu(tujuan,
            "SELECT id FROM pasien_penjamin WHERE pasien_id=? AND penjamin_id=? LIMIT 1",
            [pasienId, penjaminId]);
          if (penjaminLama) {
            await tujuan.execute("UPDATE pasien_penjamin SET nomor_peserta=? WHERE id=?",
              [teks(row.no_peserta, 100), penjaminLama.id]);
          } else {
            await tujuan.execute(
              `INSERT INTO pasien_penjamin (pasien_id, penjamin_id, nomor_peserta)
               VALUES (?, ?, ?)`, [pasienId, penjaminId, teks(row.no_peserta, 100)]);
          }
        } else {
          await catatMasalah(prosesId, "PASIEN", nomorRm, "PENJAMIN_TIDAK_DITEMUKAN",
            `Kode penjamin ${row.kd_pj} tidak dapat dipetakan.`);
        }
        jumlah++;
      }
      await tujuan.commit();
    } catch (error) {
      await tujuan.rollback();
      throw error;
    }
    kunciTerakhir = String(rows.at(-1).no_rkm_medis);
    process.stdout.write(`\rPasien dimigrasikan: ${jumlah}`);
  }
  process.stdout.write("\n");
  return jumlah;
}

async function migrasikanAfiliasi(sistemSumberId) {
  const jenisAfiliasi = [
    {
      jenis: "TNI",
      sql: `SELECT p.no_rkm_medis, g.nama_golongan AS golongan,
                   k.nama_pangkat AS pangkat, s.nama_satuan AS satuan,
                   j.nama_jabatan AS jabatan
            FROM pasien_tni p
            JOIN golongan_tni g ON g.id=p.golongan_tni
            JOIN pangkat_tni k ON k.id=p.pangkat_tni
            JOIN satuan_tni s ON s.id=p.satuan_tni
            JOIN jabatan_tni j ON j.id=p.jabatan_tni`,
    },
    {
      jenis: "POLRI",
      sql: `SELECT p.no_rkm_medis, g.nama_golongan AS golongan,
                   k.nama_pangkat AS pangkat, s.nama_satuan AS satuan,
                   j.nama_jabatan AS jabatan
            FROM pasien_polri p
            JOIN golongan_polri g ON g.id=p.golongan_polri
            JOIN pangkat_polri k ON k.id=p.pangkat_polri
            JOIN satuan_polri s ON s.id=p.satuan_polri
            JOIN jabatan_polri j ON j.id=p.jabatan_polri`,
    },
  ];
  for (const afiliasi of jenisAfiliasi) {
    const [rows] = await sumber.query(afiliasi.sql);
    for (const row of rows) {
      const target = await barisSatu(tujuan,
        `SELECT pasien_id FROM migrasi_pasien
         WHERE sistem_sumber_id=? AND kunci_sumber=?`,
        [sistemSumberId, row.no_rkm_medis]);
      if (!target) continue;
      await tujuan.execute(
        `INSERT INTO pasien_afiliasi
           (pasien_id, jenis_afiliasi, golongan, pangkat, satuan, jabatan)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE golongan=VALUES(golongan), pangkat=VALUES(pangkat),
           satuan=VALUES(satuan), jabatan=VALUES(jabatan), aktif=TRUE`,
        [target.pasien_id, afiliasi.jenis, teks(row.golongan, 100),
          teks(row.pangkat, 100), teks(row.satuan, 150), teks(row.jabatan, 150)],
      );
    }
  }
}

async function migrasikanKunjungan(prosesId, sistemSumberId) {
  const dokterMap = await petakanId("dokter");
  const unitMap = await petakanId("unit_pelayanan");
  const penjaminMap = await petakanId("penjamin");
  let kunciTerakhir = "";
  let jumlah = 0;
  let gagal = 0;
  while (true) {
    const [rows] = await sumber.execute(
      `SELECT no_reg, no_rawat, DATE_FORMAT(tgl_registrasi, '%Y-%m-%d') AS tanggal,
              TIME_FORMAT(jam_reg, '%H:%i:%s') AS jam, kd_dokter, no_rkm_medis, kd_poli,
              p_jawab, almt_pj, hubunganpj, biaya_reg, stts, stts_daftar,
              status_lanjut, kd_pj, umurdaftar, sttsumur, status_bayar, status_poli
       FROM reg_periksa WHERE no_rawat > ? ORDER BY no_rawat LIMIT ${ukuranKelompok}`,
      [kunciTerakhir],
    );
    if (!rows.length) break;
    await tujuan.beginTransaction();
    try {
      for (const row of rows) {
        const pasienSumber = await barisSatu(tujuan,
          `SELECT pasien_id FROM migrasi_pasien
           WHERE sistem_sumber_id=? AND kunci_sumber=?`,
          [sistemSumberId, row.no_rkm_medis]);
        const unitId = unitMap.get(String(row.kd_poli));
        const penjaminId = penjaminMap.get(String(row.kd_pj));
        if (!pasienSumber || !unitId || !penjaminId || !tanggal(row.tanggal) || !row.jam) {
          await catatMasalah(prosesId, "KUNJUNGAN", row.no_rawat, "RELASI_WAJIB_TIDAK_DITEMUKAN",
            `Pasien=${row.no_rkm_medis}, unit=${row.kd_poli}, penjamin=${row.kd_pj}.`);
          gagal++;
          continue;
        }
        const status = kodeStatusKunjungan(row.stts);
        const waktu = `${row.tanggal} ${row.jam}`;
        const umur = Number(row.umurdaftar);
        const satuanUmur = row.sttsumur === "Th" ? "TAHUN"
          : row.sttsumur === "Bl" ? "BULAN"
            : row.sttsumur === "Hr" ? "HARI" : null;
        const [hasil] = await tujuan.execute(
          `INSERT INTO kunjungan
             (nomor_kunjungan, pasien_id, waktu_pendaftaran, unit_pelayanan_id,
              dokter_id, penjamin_id, kode_jenis_pelayanan, kode_status_kunjungan,
              kode_status_pembayaran, nomor_antrean, biaya_pendaftaran, pasien_baru,
              baru_di_unit, umur_saat_daftar, satuan_umur, dibatalkan_pada)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), pasien_id=VALUES(pasien_id),
             waktu_pendaftaran=VALUES(waktu_pendaftaran), unit_pelayanan_id=VALUES(unit_pelayanan_id),
             dokter_id=VALUES(dokter_id), penjamin_id=VALUES(penjamin_id),
             kode_jenis_pelayanan=VALUES(kode_jenis_pelayanan),
             kode_status_kunjungan=VALUES(kode_status_kunjungan),
             kode_status_pembayaran=VALUES(kode_status_pembayaran),
             nomor_antrean=VALUES(nomor_antrean), biaya_pendaftaran=VALUES(biaya_pendaftaran),
             pasien_baru=VALUES(pasien_baru), baru_di_unit=VALUES(baru_di_unit),
             umur_saat_daftar=VALUES(umur_saat_daftar), satuan_umur=VALUES(satuan_umur),
             dibatalkan_pada=VALUES(dibatalkan_pada)`,
          [row.no_rawat, pasienSumber.pasien_id, waktu, unitId,
            dokterMap.get(String(row.kd_dokter)) || null, penjaminId,
            row.status_lanjut === "Ranap" ? "RAWAT_INAP" : "RAWAT_JALAN", status,
            row.status_bayar === "Sudah Bayar" ? "SUDAH_BAYAR" : "BELUM_BAYAR",
            Number.parseInt(row.no_reg, 10) || null, Number(row.biaya_reg) || 0,
            row.stts_daftar === "Baru", row.status_poli === "Baru",
            Number.isInteger(umur) && umur >= 0 ? umur : null, satuanUmur,
            status === "BATAL" ? waktu : null],
        );
        const kunjunganId = Number(hasil.insertId);
        await tujuan.execute(
          `INSERT INTO migrasi_kunjungan (sistem_sumber_id, kunci_sumber, kunjungan_id)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE kunjungan_id=VALUES(kunjungan_id),
             dimigrasikan_pada=CURRENT_TIMESTAMP`,
          [sistemSumberId, row.no_rawat, kunjunganId],
        );
        await tujuan.execute(
          `INSERT INTO kunjungan_penanggung_jawab
             (kunjungan_id, nama_lengkap, kode_hubungan, alamat_lengkap)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE nama_lengkap=VALUES(nama_lengkap),
             kode_hubungan=VALUES(kode_hubungan), alamat_lengkap=VALUES(alamat_lengkap)`,
          [kunjunganId, teks(row.p_jawab, 150),
            kodeHubungan(row.hubunganpj), teks(row.almt_pj, 255)],
        );
        await tujuan.execute(
          `INSERT INTO kunjungan_riwayat_status
             (kunjungan_id, kode_status, waktu_perubahan, alasan)
           VALUES (?, ?, ?, 'Status awal hasil migrasi')
           ON DUPLICATE KEY UPDATE alasan=VALUES(alasan)`,
          [kunjunganId, status, waktu],
        );
        jumlah++;
      }
      await tujuan.commit();
    } catch (error) {
      await tujuan.rollback();
      throw error;
    }
    kunciTerakhir = String(rows.at(-1).no_rawat);
    process.stdout.write(`\rKunjungan dimigrasikan: ${jumlah}; bermasalah: ${gagal}`);
  }
  process.stdout.write("\n");
  return { jumlah, gagal };
}

async function migrasikanRujukan(sistemSumberId) {
  const [rows] = await sumber.query(
    `SELECT no_rawat, perujuk, no_rujuk, dokter_perujuk, jm_perujuk,
            kategori_rujuk, keterangan, no_balasan
     FROM rujuk_masuk ORDER BY no_rawat`,
  );
  for (const row of rows) {
    const target = await barisSatu(tujuan,
      `SELECT kunjungan_id FROM migrasi_kunjungan
       WHERE sistem_sumber_id=? AND kunci_sumber=?`,
      [sistemSumberId, row.no_rawat]);
    if (!target) continue;
    await tujuan.execute(
      `INSERT INTO kunjungan_rujukan
         (kunjungan_id, jenis_rujukan, nama_perujuk, dokter_perujuk,
          nomor_rujukan, nomor_balasan, keterangan, biaya_perujuk)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama_perujuk=VALUES(nama_perujuk),
         dokter_perujuk=VALUES(dokter_perujuk), nomor_rujukan=VALUES(nomor_rujukan),
         nomor_balasan=VALUES(nomor_balasan), keterangan=VALUES(keterangan),
         biaya_perujuk=VALUES(biaya_perujuk)`,
      [target.kunjungan_id, teks(row.kategori_rujuk, 32) || "MASUK",
        teks(row.perujuk, 150), teks(row.dokter_perujuk, 150),
        teks(row.no_rujuk, 100), teks(row.no_balasan, 100),
        teks(row.keterangan, 500), Number(row.jm_perujuk) || 0],
    );
  }
}

let prosesId;
try {
  const sistem = await barisSatu(tujuan,
    "SELECT id FROM migrasi_sistem_sumber WHERE kode='KHANZA'");
  if (!sistem) throw new Error("Jalankan migrasi 0002_referensi_awal.sql terlebih dahulu.");
  const [hasilProses] = await tujuan.execute(
    `INSERT INTO migrasi_proses (sistem_sumber_id, jenis_proses, status_proses)
     VALUES (?, 'MIGRASI_AWAL', 'BERJALAN')`, [sistem.id]);
  prosesId = Number(hasilProses.insertId);

  await migrasikanMaster();
  const jumlahPasien = await migrasikanPasien(prosesId, sistem.id);
  await migrasikanAfiliasi(sistem.id);
  const hasilKunjungan = await migrasikanKunjungan(prosesId, sistem.id);
  await migrasikanRujukan(sistem.id);
  await tujuan.execute(
    `UPDATE migrasi_proses SET status_proses='SELESAI', selesai_pada=CURRENT_TIMESTAMP,
       jumlah_dibaca=?, jumlah_berhasil=?, jumlah_gagal=? WHERE id=?`,
    [jumlahPasien + hasilKunjungan.jumlah + hasilKunjungan.gagal,
      jumlahPasien + hasilKunjungan.jumlah, hasilKunjungan.gagal, prosesId],
  );
  console.log("Migrasi awal selesai. Jalankan database/validasi/pasien_registrasi.sql.");
} catch (error) {
  if (prosesId) {
    await tujuan.execute(
      `UPDATE migrasi_proses SET status_proses='GAGAL', selesai_pada=CURRENT_TIMESTAMP,
         keterangan=? WHERE id=?`, [String(error.message || error).slice(0, 500), prosesId]);
  }
  throw error;
} finally {
  await sumber.end();
  await tujuan.end();
}

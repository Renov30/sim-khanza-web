import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import mysql from "mysql2/promise";

const run = promisify(execFile);
const file = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("impor layanan mempertahankan relasi, jumlah baris dan waktu, serta membatalkan kegagalan", {
  skip: !process.env.MIGRASI_TEST_PORT && "Memerlukan MariaDB uji lokal dengan MIGRASI_TEST_PORT",
}, async (t) => {
  const port = Number(process.env.MIGRASI_TEST_PORT);
  const db = await mysql.createConnection({ host: "127.0.0.1", user: "root", port, multipleStatements: true, dateStrings: true });
  const prefiks = "uji_layanan_" + randomUUID().replaceAll("-", "");
  const sumber = prefiks + "_asal";
  const tujuan = prefiks + "_baru";
  t.after(async () => {
    try {
      await db.query("DROP DATABASE IF EXISTS ??", [sumber]);
      await db.query("DROP DATABASE IF EXISTS ??", [tujuan]);
    } finally {
      await db.end();
    }
  });
  await db.query("CREATE DATABASE ??", [sumber]);
  await db.query("CREATE DATABASE ??", [tujuan]);
  await db.query("USE ??", [tujuan]);
  for (const nama of ["0001_pasien_dan_kunjungan", "0002_referensi_awal", "0003_pemeriksaan_dan_resep"]) {
    await db.query(await file("../database/migrations/" + nama + ".sql"));
  }
  await db.query("USE ??", [sumber]);
  // Reproduksi schema sumber tanpa memuat isi dump. Semua baris uji dibuat di bawah.
  const mapping = await file("../database/mapping/layanan.sql");
  const required = new Set([...mapping.matchAll(/(?:FROM|JOIN) (\w+)/g)].map((match) => match[1]));
  for (const table of [
    "suku_bangsa", "bahasa_pasien", "cacat_fisik", "propinsi", "kabupaten", "kecamatan", "kelurahan",
    "perusahaan_pasien", "dokter", "poliklinik", "penjab", "pasien", "reg_periksa", "rujuk_masuk",
    ...["tni", "polri"].flatMap((instansi) => ["pasien", "golongan", "pangkat", "satuan", "jabatan"].map((nama) => nama + "_" + instansi)),
  ]) required.add(table);
  const dump = await file("../../simitra-keluarga-merauke/sik.sql");
  await db.query("SET SESSION sql_mode='', foreign_key_checks=0");
  for (const match of dump.matchAll(/^CREATE TABLE `(\w+)` \([^;]*?^\) ENGINE=[^;]+;/gm)) {
    if (required.delete(match[1])) await db.query(match[0]);
  }
  assert.equal(required.size, 0, "Semua tabel sumber harus ditemukan di schema referensi");
  await db.query(`
    INSERT INTO dokter (kd_dokter,nm_dokter,status) VALUES ('D','Dokter Uji','1');
    INSERT INTO poliklinik (kd_poli,nm_poli,status) VALUES ('U','Unit Uji','1');
    INSERT INTO penjab (kd_pj,png_jawab,status) VALUES ('J','Penjamin Uji','1');
    INSERT INTO pasien (no_rkm_medis,nm_pasien,kd_pj) VALUES ('UJI','Pasien Uji','J');
    INSERT INTO reg_periksa (no_rawat,no_reg,no_rkm_medis,tgl_registrasi,jam_reg,kd_poli,kd_dokter,kd_pj)
      VALUES ('K','001','UJI','2025-01-01','00:00:00','U','D','J');
    INSERT INTO pegawai (nik,nama,jbtn,stts_aktif) VALUES ('D','Dokter Uji','Dokter','AKTIF');
    INSERT INTO pemeriksaan_ralan (no_rawat,tgl_perawatan,jam_rawat,nip,tensi,keluhan)
      VALUES ('K','2025-01-01','00:00:00','D','120/80','Catatan uji');
    INSERT INTO rujukan_internal_poli VALUES ('K','D','U');
    INSERT INTO databarang (kode_brng,nama_brng,status,ralan) VALUES ('O','Obat Uji','1',123.45);
    INSERT INTO bangsal (kd_bangsal,nm_bangsal,status) VALUES ('L','Depo Uji','1');
    INSERT INTO gudangbarang (kode_brng,kd_bangsal,no_batch,no_faktur,stok) VALUES ('O','L','','',2.5);
    INSERT INTO metode_racik (kd_racik,nm_racik) VALUES ('R','Metode Uji');
    INSERT INTO resep_obat (no_resep,no_rawat,kd_dokter,status,tgl_peresepan,tgl_perawatan,tgl_penyerahan)
      VALUES ('A','K','D','ralan','2025-01-01','0000-00-00','0000-00-00'),
             ('B','K','D','ranap','2025-01-01','2025-01-02','2025-01-03');
    INSERT INTO resep_dokter (no_resep,kode_brng,jml,aturan_pakai) VALUES ('A','O',1.5,'Uji'),('A','O',1.5,'Uji');
    INSERT INTO resep_dokter_racikan (no_resep,no_racik,nama_racik,kd_racik,jml_dr)
      VALUES ('A','1','Racikan Uji','R',2);
    INSERT INTO resep_dokter_racikan_detail (no_resep,no_racik,kode_brng,jml) VALUES ('A','2','O',0.5);
  `);
  const aturan = Array.from({ length: 205 }, (_, i) => ["Aturan Uji " + i]);
  await db.query("INSERT INTO master_aturan_pakai (aturan) VALUES ?", [aturan]);
  const env = { ...process.env };
  for (const [key, name] of [["DB_SUMBER", sumber], ["DB_TUJUAN", tujuan]]) {
    Object.assign(env, {
      [key + "_HOST"]: "127.0.0.1", [key + "_PORT"]: String(port),
      [key + "_USER"]: "root", [key + "_PASSWORD"]: "", [key + "_DATABASE"]: name,
    });
  }
  const impor = () => run(process.execPath, ["scripts/migrasi-layanan.mjs"], { env });
  await assert.rejects(impor, /Selesaikan migrasi pasien/);
  await run(process.execPath, ["scripts/migrasi-khanza.mjs"], { env });
  await assert.rejects(impor, /bahan_resep_racikan.*ER_NO_REFERENCED_ROW/);
  await db.query("USE ??", [tujuan]);
  assert.equal((await db.query("SELECT COUNT(*) AS n FROM pemeriksaan_rawat_jalan"))[0][0].n, 0);
  await db.query("UPDATE ??.resep_dokter_racikan_detail SET no_racik='1'", [sumber]);
  await impor();
  const [waktu] = await db.query("SELECT tanggal_validasi,jam_validasi,tanggal_penyerahan FROM resep ORDER BY nomor_resep");
  assert.deepEqual(waktu, [
    { tanggal_validasi: null, jam_validasi: "00:00:00", tanggal_penyerahan: null },
    { tanggal_validasi: "2025-01-02", jam_validasi: "00:00:00", tanggal_penyerahan: "2025-01-03" },
  ]);
  assert.equal((await db.query("SELECT COUNT(*) AS n FROM aturan_pakai_obat"))[0][0].n, 205);
  assert.equal((await db.query("SELECT SUM(jumlah) AS n FROM resep_obat_umum"))[0][0].n, 3);
  assert.equal((await db.query("SELECT jumlah FROM bahan_resep_racikan"))[0][0].jumlah, 0.5);
  assert.equal((await db.query("SELECT jumlah FROM stok_obat_depo"))[0][0].jumlah, 2.5);
  assert.equal((await db.query("SELECT kode_unit FROM rujukan_internal_rawat_jalan"))[0][0].kode_unit, "U");
  assert.equal((await db.query("SELECT subjek FROM pemeriksaan_rawat_jalan"))[0][0].subjek, "Catatan uji");
  await assert.rejects(impor, /sudah berisi data/);
});

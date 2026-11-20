import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";
import { konfigurasiMigrasi } from "./db/konfigurasi-migrasi.mjs";

async function impor() {
  const { sumberConfig, tujuanConfig } = konfigurasiMigrasi();
  const mapping = await readFile(new URL("../database/mapping/layanan.sql", import.meta.url), "utf8");
  const daftar = mapping.trim().split(/^-- tujuan: /m).slice(1).map((bagian) => {
    const cocok = /^(\w+)\s*\n(SELECT [^;]+);$/s.exec(bagian.trim());
    if (!cocok) throw new Error("Pemetaan tabel layanan tidak valid.");
    return cocok;
  });
  if (!daftar.length) throw new Error("Pemetaan tabel layanan kosong.");
  const sumber = await mysql.createConnection(sumberConfig);
  let tujuan;
  let tahap = "memeriksa database";
  try {
    tujuan = await mysql.createConnection(tujuanConfig);
    // Jangan menerima pemotongan nilai atau relasi yatim saat menyalin data klinis.
    await tujuan.query("SET SESSION sql_mode='STRICT_ALL_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE', foreign_key_checks=1");
    const [[lock]] = await tujuan.query("SELECT GET_LOCK(SHA2(CONCAT(DATABASE(), ':migrasi-layanan'), 256), 0) AS didapat");
    if (Number(lock.didapat) !== 1) throw new Error("Impor layanan lain sedang berjalan.");
    const [[awal]] = await tujuan.query(`
      SELECT p.status_proses, p.jumlah_gagal FROM migrasi_proses p
      JOIN migrasi_sistem_sumber s ON s.id = p.sistem_sumber_id
      WHERE s.kode = 'KHANZA' AND p.jenis_proses = 'MIGRASI_AWAL'
      ORDER BY p.id DESC LIMIT 1`);
    if (awal?.status_proses !== "SELESAI" || Number(awal.jumlah_gagal) !== 0) {
      throw new Error("Selesaikan migrasi pasien dan kunjungan beserta rekonsiliasinya terlebih dahulu.");
    }
    await sumber.query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ");
    await sumber.query("START TRANSACTION WITH CONSISTENT SNAPSHOT, READ ONLY");
    await tujuan.beginTransaction();
    for (const [, tabel] of daftar) {
      const [isi] = await tujuan.query("SELECT 1 FROM ?? LIMIT 1", [tabel]);
      if (isi.length) throw new Error("Tabel tujuan " + tabel + " sudah berisi data.");
    }
    for (const [, tabel, select] of daftar) {
      tahap = tabel;
      let jumlah = 0;
      let kelompok = [];
      let kolom;
      const stream = sumber.connection.query(select).stream();
      for await (const row of stream) {
        kolom ??= Object.keys(row);
        kelompok.push(kolom.map((nama) => row[nama]));
        jumlah++;
        if (kelompok.length === 100) {
          await tujuan.query("INSERT INTO ?? (??) VALUES ?", [tabel, kolom, kelompok]);
          kelompok = [];
        }
      }
      if (kelompok.length) await tujuan.query("INSERT INTO ?? (??) VALUES ?", [tabel, kolom, kelompok]);
      const [[cek]] = await tujuan.query("SELECT COUNT(*) AS jumlah FROM ??", [tabel]);
      if (Number(cek.jumlah) !== jumlah) throw new Error("Jumlah baris berbeda pada " + tabel);
      console.log(tabel, jumlah);
    }
    await tujuan.commit();
    console.log("Impor layanan selesai.");
  } catch (error) {
    await tujuan?.rollback();
    // Pesan driver bisa memuat nilai kolom pasien.
    throw new Error(tahap + " — " + (error.code || error.message));
  } finally {
    sumber.destroy();
    await tujuan?.end(); // Koneksi khusus ini juga memiliki named lock hingga ditutup.
  }
}

impor().catch((error) => {
  console.error("Migrasi layanan gagal.", error.code || error.message);
  process.exitCode = 1;
});

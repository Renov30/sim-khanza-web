import mysql from "mysql2/promise";

const index = {
  nama: "idx_reg_periksa_tgl_urut",
  tabel: "reg_periksa",
  kolom: "(tgl_registrasi, jam_reg, no_rawat)",
};

const koneksi = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "sik_mitra",
});

try {
  const [ada] = await koneksi.execute(
    `SELECT 1 FROM information_schema.statistics
      WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ? LIMIT 1`,
    [index.tabel, index.nama],
  );
  if (ada.length > 0) {
    console.log(`Index ${index.nama} sudah ada.`);
  } else {
    await koneksi.query(`CREATE INDEX ${index.nama} ON ${index.tabel} ${index.kolom}`);
    console.log(`Index ${index.nama} dibuat pada ${index.tabel}${index.kolom}.`);
  }
} finally {
  await koneksi.end();
}

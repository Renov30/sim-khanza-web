function konfigurasi(awalan) {
  const wajib = [`${awalan}_HOST`, `${awalan}_USER`, `${awalan}_DATABASE`];
  const kosong = wajib.filter((nama) => !process.env[nama]);
  if (kosong.length) throw new Error(`Konfigurasi wajib belum diisi: ${kosong.join(", ")}`);
  return {
    host: process.env[`${awalan}_HOST`],
    port: Number(process.env[`${awalan}_PORT`] || 3306),
    user: process.env[`${awalan}_USER`],
    password: process.env[`${awalan}_PASSWORD`] || "",
    database: process.env[`${awalan}_DATABASE`],
    charset: "utf8mb4",
    dateStrings: true,
  };
}

export function konfigurasiMigrasi() {
  const sumberConfig = konfigurasi("DB_SUMBER");
  const tujuanConfig = konfigurasi("DB_TUJUAN");

  if (
    sumberConfig.host === tujuanConfig.host
    && sumberConfig.port === tujuanConfig.port
    && sumberConfig.database === tujuanConfig.database
  ) {
    throw new Error("Database sumber dan tujuan tidak boleh sama.");
  }
  return { sumberConfig, tujuanConfig };
}

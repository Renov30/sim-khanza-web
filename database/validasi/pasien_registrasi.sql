-- Validasi skema pasien dan kunjungan setelah pembuatan atau migrasi data.
-- Setiap hasil selain nol pada bagian "masalah" perlu diperiksa.

SELECT 'jumlah_pasien' AS pemeriksaan, COUNT(*) AS jumlah
FROM pasien
UNION ALL
SELECT 'jumlah_kunjungan', COUNT(*)
FROM kunjungan
UNION ALL
SELECT 'jumlah_pasien_dengan_pemetaan', COUNT(*)
FROM migrasi_pasien
UNION ALL
SELECT 'jumlah_kunjungan_dengan_pemetaan', COUNT(*)
FROM migrasi_kunjungan;

SELECT 'nomor_rm_duplikat' AS masalah, COUNT(*) AS jumlah
FROM (
    SELECT nomor_rekam_medis
    FROM pasien
    GROUP BY nomor_rekam_medis
    HAVING COUNT(*) > 1
) AS duplikat
UNION ALL
SELECT 'nomor_kunjungan_duplikat', COUNT(*)
FROM (
    SELECT nomor_kunjungan
    FROM kunjungan
    GROUP BY nomor_kunjungan
    HAVING COUNT(*) > 1
) AS duplikat
UNION ALL
SELECT 'nik_duplikat_antar_pasien', COUNT(*)
FROM (
    SELECT nomor_normalisasi
    FROM pasien_identitas
    WHERE jenis_identitas = 'NIK'
      AND nomor_normalisasi IS NOT NULL
    GROUP BY nomor_normalisasi
    HAVING COUNT(DISTINCT pasien_id) > 1
) AS duplikat;

SELECT 'alamat_tanpa_pasien' AS masalah, COUNT(*) AS jumlah
FROM pasien_alamat a
LEFT JOIN pasien p ON p.id = a.pasien_id
WHERE p.id IS NULL
UNION ALL
SELECT 'identitas_tanpa_pasien', COUNT(*)
FROM pasien_identitas i
LEFT JOIN pasien p ON p.id = i.pasien_id
WHERE p.id IS NULL
UNION ALL
SELECT 'penjamin_tanpa_pasien', COUNT(*)
FROM pasien_penjamin pp
LEFT JOIN pasien p ON p.id = pp.pasien_id
WHERE p.id IS NULL
UNION ALL
SELECT 'kunjungan_tanpa_pasien', COUNT(*)
FROM kunjungan k
LEFT JOIN pasien p ON p.id = k.pasien_id
WHERE p.id IS NULL
UNION ALL
SELECT 'kunjungan_tanpa_unit', COUNT(*)
FROM kunjungan k
LEFT JOIN unit_pelayanan u ON u.id = k.unit_pelayanan_id
WHERE u.id IS NULL
UNION ALL
SELECT 'kunjungan_tanpa_penjamin', COUNT(*)
FROM kunjungan k
LEFT JOIN penjamin p ON p.id = k.penjamin_id
WHERE p.id IS NULL;

SELECT 'alamat_dengan_jenis_provinsi_salah' AS masalah, COUNT(*) AS jumlah
FROM pasien_alamat a
JOIN wilayah w ON w.id = a.provinsi_id
WHERE w.jenis <> 'PROVINSI'
UNION ALL
SELECT 'alamat_dengan_jenis_kabupaten_salah', COUNT(*)
FROM pasien_alamat a
JOIN wilayah w ON w.id = a.kabupaten_id
WHERE w.jenis <> 'KABUPATEN'
UNION ALL
SELECT 'alamat_dengan_jenis_kecamatan_salah', COUNT(*)
FROM pasien_alamat a
JOIN wilayah w ON w.id = a.kecamatan_id
WHERE w.jenis <> 'KECAMATAN'
UNION ALL
SELECT 'alamat_dengan_jenis_kelurahan_salah', COUNT(*)
FROM pasien_alamat a
JOIN wilayah w ON w.id = a.kelurahan_id
WHERE w.jenis <> 'KELURAHAN';

SELECT 'kunjungan_batal_tanpa_waktu_batal' AS masalah, COUNT(*) AS jumlah
FROM kunjungan
WHERE kode_status_kunjungan = 'BATAL'
  AND dibatalkan_pada IS NULL
UNION ALL
SELECT 'kunjungan_aktif_dengan_waktu_batal', COUNT(*)
FROM kunjungan
WHERE kode_status_kunjungan <> 'BATAL'
  AND dibatalkan_pada IS NOT NULL
UNION ALL
SELECT 'biaya_pendaftaran_negatif', COUNT(*)
FROM kunjungan
WHERE biaya_pendaftaran < 0
UNION ALL
SELECT 'tanggal_lahir_setelah_pendaftaran', COUNT(*)
FROM kunjungan k
JOIN pasien p ON p.id = k.pasien_id
WHERE p.tanggal_lahir IS NOT NULL
  AND p.tanggal_lahir > DATE(k.waktu_pendaftaran);

SELECT jenis_entitas, kode_masalah, COUNT(*) AS jumlah
FROM migrasi_masalah
WHERE diselesaikan = FALSE
GROUP BY jenis_entitas, kode_masalah
ORDER BY jenis_entitas, kode_masalah;

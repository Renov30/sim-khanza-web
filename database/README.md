# Database pasien dan kunjungan

Database ini dipisahkan dari database SIMRS Khanza. Khanza menjadi sumber migrasi dan referensi aturan bisnis, bukan pemilik primary key pada skema baru.

## Konvensi

- Tabel induk memakai nama entitas singkat: `pasien` dan `kunjungan`.
- Tabel anak memakai nama induk sebagai awalan: `pasien_alamat`, `kunjungan_rujukan`.
- Primary key transaksi memakai `BIGINT UNSIGNED AUTO_INCREMENT`.
- Nomor RM dan nomor kunjungan adalah nomor bisnis dengan batasan unik, bukan primary key.
- Status yang dapat berkembang disimpan pada tabel referensi, bukan `ENUM`.
- Nilai uang memakai `DECIMAL(15,2)`.
- Semua tabel memakai InnoDB dan `utf8mb4_unicode_ci` agar kompatibel dengan MariaDB 10.x dan MySQL 8.x.

## Urutan pemasangan

Pilih database tujuan yang kosong, lalu jalankan:

```sh
mysql -u <pengguna> -p <database_tujuan> < database/migrations/0001_pasien_dan_kunjungan.sql
mysql -u <pengguna> -p <database_tujuan> < database/migrations/0002_referensi_awal.sql
```

Nama database tidak ditulis di dalam migrasi agar instalasi tidak terikat pada nama tertentu. Buat database tujuan terlebih dahulu, misalnya:

```sql
CREATE DATABASE khanza_web
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

## Migrasi dari Khanza

Salin `.env.example` menjadi `.env.migrasi.local`, lalu isi konfigurasi `DB_SUMBER_*` dan `DB_TUJUAN_*`. File lokal tersebut tidak masuk Git. Keduanya sengaja dipisahkan dari `DB_*` aplikasi agar migrasi tidak salah sasaran. Setelah dua migration SQL terpasang pada database tujuan, jalankan:

```sh
npm run migrasi:khanza
```

Importir dapat dijalankan ulang. Data induk dicocokkan melalui kode/nomor bisnis, tabel anak diperbarui, dan pemetaan sumber disimpan pada `migrasi_pasien` serta `migrasi_kunjungan`.

Migrasi data harus dilakukan dengan urutan berikut:

1. Master wilayah, suku, bahasa, keterbatasan fisik, perusahaan, dokter, unit pelayanan, dan penjamin.
2. Pasien dan pemetaan `migrasi_pasien` berdasarkan `pasien.no_rkm_medis`.
3. Identitas, alamat, kontak, penjamin, dan afiliasi pasien.
4. Kunjungan dan pemetaan `migrasi_kunjungan` berdasarkan `reg_periksa.no_rawat`.
5. Penanggung jawab, rujukan, dan riwayat status kunjungan.
6. Jalankan `database/validasi/pasien_registrasi.sql` dan selesaikan semua masalah migrasi.

Data kotor seperti `-`, string kosong, NIK tidak lengkap, atau foreign key sumber yang hilang tidak boleh dibuat menjadi data palsu. Ubah penanda kosong menjadi `NULL` dan catat data yang tidak dapat dipetakan pada `migrasi_masalah`.

Selama masa transisi hanya satu database yang boleh menjadi sumber penulisan utama. Jika Khanza desktop masih menulis data pasien dan registrasi, database baru hanya disinkronkan sampai waktu cutover. Setelah cutover, integrasi ke modul Khanza lama perlu menggunakan adapter atau outbox; jangan melakukan dual-write tanpa mekanisme pemulihan.

## Validasi

Jalankan:

```sh
mysql -u <pengguna> -p <database_tujuan> < database/validasi/pasien_registrasi.sql
```

Hasil bagian `masalah` harus nol. Daftar `migrasi_masalah` yang belum diselesaikan harus diperiksa sebelum database baru dijadikan sumber utama.

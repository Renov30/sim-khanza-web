# Struktur Aplikasi dan Schema Database

## Arsitektur runtime saat ini

Aplikasi masih menggunakan database SIMRS Khanza sebagai database operasional.

```text
Browser
  ↓ JSON melalui /api/*
Next.js App Router
  ├── halaman dan Client Component
  └── Route Handler /api/*
          ↓ mysql2/promise, prepared statement, transaksi
      Database Khanza aktif
```

Browser tidak boleh terhubung langsung ke database. Seluruh operasi data harus melalui endpoint server. Tanggal operasional registrasi mengikuti zona waktu `Asia/Jayapura`.

## Struktur repository

```text
khanza-web/
├── AGENTS.md                 # Aturan wajib proyek
├── database/
│   ├── migrations/           # DDL rancangan database baru
│   └── validasi/             # Query pemeriksaan hasil migrasi
├── docs/
│   ├── README.md             # Riwayat dan arah pengembangan
│   └── schema.md             # Dokumen ini
├── src/
│   ├── app/                  # Halaman App Router dan Route Handler
│   ├── components/           # Komponen UI/layout bersama
│   └── lib/                  # Auth, database, tipe, dan aturan bisnis
├── scripts/                  # Prototipe importir Khanza
└── tests/                    # Tes pasien dan registrasi
```

Referensi desktop berada di `../simitra-keluarga-merauke/` dan hanya digunakan untuk membaca aturan bisnis, query, serta relasi tabel.

## Komponen utama aplikasi

- `src/lib/db.ts`: connection pool database Khanza aktif.
- `src/lib/auth.ts`: autentikasi admin/user Khanza, token HMAC, dan cookie sesi.
- `src/lib/pasien/`: field, master, penyimpanan, akses, dan penomoran pasien.
- `src/lib/registrasi/`: tanggal WIT, validasi, penomoran, transaksi, rujukan, dan perlindungan relasi.
- `src/components/modul/`: header, grid formulir, panel input, dan panel bawah.
- `src/components/common/`: Toast, dialog konfirmasi, dan modal informasi.
- `src/components/auth/`: login, status sesi, dan sinkronisasi antar-tab.

## API dan status modul

### Aktif

| Area | Endpoint | Akses |
|---|---|---|
| Autentikasi | `/api/auth/login`, `/logout`, `/session` | Login publik; sesi disimpan di cookie HTTP-only. |
| Pasien | `/api/pasien`, `/api/pasien/nomor`, `/api/pasien/options` | Admin, izin pasien, atau izin registrasi. |
| Registrasi | `/api/registrasi`, `/api/registrasi/nomor`, `/api/registrasi/options` | Admin atau izin registrasi. |
| Rawat jalan (baca) | `/api/rawat-jalan`, `/api/rawat-jalan/billing`, `/api/rawat-jalan/options` | Admin, izin kasir ralan, registrasi, atau tindakan ralan. |

Pasien mendukung pencarian, tambah, ubah, nomor RM server, master wilayah/penjamin, serta TNI/POLRI. Penghapusan pasien masih berisiko karena belum mempunyai pemeriksaan bisnis selengkap registrasi.

Registrasi mendukung filter, pagination, registrasi awal, rujukan internal, nomor rawat/antrean server, tarif server, umur, status baru/lama, transaksi rujukan, dan penghapusan terbatas. Registrasi terbayar atau yang sudah memiliki pelayanan tidak dapat diubah/dihapus melalui alur biasa.

Rawat jalan masih baca saja: daftar registrasi ralan dengan tab registrasi awal/rujukan internal, filter tanggal, penjamin, poli, dokter, status, dan status bayar, serta rincian billing per kunjungan yang dihitung dari tabel pelayanan. Pembayaran, cetak nota, dan perubahan status belum tersedia.

### Eksperimental

- `/api/igd`
- `/api/rawat-inap`
- `/api/laboratorium/*`
- `/api/radiologi/*`
- `/api/farmasi/*`

Endpoint tersebut baru berupa query baca awal dan belum semuanya memiliki pemeriksaan izin, tipe, validasi, pagination, serta tes yang memadai.

`/api/system/info` bersifat publik dan saat ini masih mengembalikan host/nama database selain identitas fasilitas. Detail topologi perlu dihilangkan sebelum produksi pada jaringan tidak tepercaya.

## Aturan bisnis pasien

- Tabel utama runtime saat ini adalah `pasien` Khanza.
- Nomor RM mengikuti `set_urut_no_rkm_medis` dan `set_no_rkm_medis`.
- Mode `Straight`, `Terminal`, `Middle`, tahun, bulan, dan posisi tanggal dipertahankan.
- Server memakai named lock saat membuat nomor final.
- Data pasien dan afiliasi disimpan dalam satu transaksi.
- Nama, tanggal lahir, tanggal daftar, email, penjamin, dan pilihan master divalidasi server.
- Umur teks dihitung ulang dari tanggal lahir.
- Nomor RM tidak dapat diganti melalui edit biasa.

## Aturan bisnis registrasi

- Nomor rawat memakai format `YYYY/MM/DD/000001`.
- Nomor antrean mengikuti `KHANZA_URUTNOREG` dan `KHANZA_BASENOREG`.
- Server memakai named lock per tanggal dan retry terbatas bila bentrok dengan desktop Khanza.
- Browser tidak menentukan biaya, umur, status baru/lama, atau nomor final.
- Registrasi dan `rujuk_masuk` disimpan dalam satu transaksi.
- Edit/hapus mengunci baris dengan `FOR UPDATE`.
- Registrasi `Sudah Bayar`, memiliki biaya perujuk, atau memiliki pelayanan terkait dilindungi dari perubahan tertentu.
- No. Rawat tetap saat edit; nomor antrean dapat dihitung ulang bila dokter, poli, atau tanggal berubah.

## Rancangan database baru

> **Status: rancangan; migrasi ditunda.** Schema ini belum digunakan runtime aplikasi.

Nama database yang direncanakan adalah `khanza_web`. Prinsip desain:

- Tabel/field memakai bahasa Indonesia dan `snake_case`.
- Tabel induk memakai nama singkat seperti `pasien` dan `kunjungan`.
- Tabel anak memakai awalan induk seperti `pasien_alamat`.
- Primary key transaksi memakai `BIGINT UNSIGNED AUTO_INCREMENT`.
- Nomor RM dan nomor kunjungan menjadi business key unik, bukan primary key.
- Status yang berkembang memakai tabel referensi, bukan `ENUM`.
- Nilai uang memakai `DECIMAL(15,2)`.
- InnoDB dan `utf8mb4_unicode_ci` digunakan untuk kompatibilitas MariaDB/MySQL.

### Referensi dan master

| Kelompok | Tabel |
|---|---|
| Demografi | `jenis_kelamin`, `golongan_darah`, `status_perkawinan`, `pendidikan`, `hubungan_keluarga` |
| Pelayanan | `jenis_pelayanan`, `status_kunjungan`, `status_pembayaran` |
| Master pasien | `wilayah`, `suku`, `bahasa`, `keterbatasan_fisik`, `perusahaan` |
| Master registrasi | `dokter`, `unit_pelayanan`, `penjamin` |

### Pasien

| Tabel | Fungsi |
|---|---|
| `pasien` | Induk pasien dengan ID internal dan nomor RM unik. |
| `pasien_identitas` | NIK, NIP/NRP, paspor, atau identitas lain. |
| `pasien_alamat` | Alamat KTP, domisili, korespondensi, wilayah, dan riwayat berlaku. |
| `pasien_kontak` | Keluarga, kontak darurat, dan penanggung jawab umum. |
| `pasien_penjamin` | Satu atau lebih kepesertaan penjamin. |
| `pasien_afiliasi` | Data TNI/POLRI atau afiliasi lain. |

Alamat dipisahkan karena pasien dapat mempunyai beberapa jenis alamat dan riwayat perubahan. Alamat penanggung jawab saat kunjungan disimpan sebagai snapshot agar dokumen lama tidak berubah ketika data pasien diperbarui.

### Kunjungan

| Tabel | Fungsi |
|---|---|
| `kunjungan` | Induk pendaftaran/kunjungan dengan nomor bisnis unik. |
| `kunjungan_penanggung_jawab` | Snapshot penanggung jawab saat kunjungan. |
| `kunjungan_rujukan` | Data rujukan terkait kunjungan. |
| `kunjungan_riwayat_status` | Riwayat status operasional. |
| `nomor_urut` | Counter transaksi yang aman terhadap konkurensi. |

### Pemetaan migrasi

| Tabel | Fungsi |
|---|---|
| `migrasi_sistem_sumber` | Daftar database/sistem sumber. |
| `migrasi_proses` | Catatan pelaksanaan migrasi. |
| `migrasi_masalah` | Data sumber yang perlu diperiksa. |
| `migrasi_pasien`, `migrasi_kunjungan` | Pemetaan kunci Khanza ke ID baru. |

## Kinerja query

- Daftar registrasi dan rawat jalan menghitung `COUNT(*)` hanya dengan join yang dibutuhkan filter, lalu menjalankan count dan pengambilan baris secara paralel.
- Endpoint opsi memakai `Cache-Control: private, max-age=300` agar dropdown tidak diambil ulang setiap navigasi.
- Client memuat tabel langsung saat halaman dibuka; hanya perubahan kata kunci yang ditunda 300 ms.
- Index `reg_periksa (tgl_registrasi, jam_reg, no_rawat)` mempercepat filter periode dan urutan daftar. Jalankan `npm run db:index-kinerja` sekali pada database Khanza setelah disetujui DBA. Index bersifat tambahan dan tidak mengubah data.

## Artefak database

| Berkas | Fungsi | Status |
|---|---|---|
| `database/migrations/0001_pasien_dan_kunjungan.sql` | DDL master, pasien, kunjungan, penomoran, dan pemetaan. | Rancangan |
| `database/migrations/0002_referensi_awal.sql` | Data referensi awal pengganti `ENUM`. | Rancangan |
| `database/validasi/pasien_registrasi.sql` | Validasi duplikat, relasi yatim, wilayah, dan konsistensi. | Rancangan |
| `scripts/migrasi-khanza.mjs` | Importir awal dari Khanza. | Prototipe, ditunda |
| `scripts/db/index-kinerja.mjs` | Menambahkan index periode daftar pada database Khanza. | Opsional, perlu persetujuan DBA |

## Migrasi database — ditunda

Selama status ditunda:

- Jangan menjalankan `npm run migrasi:khanza` pada database nyata.
- Jangan mengalihkan `src/lib/db.ts` ke `khanza_web`.
- Jangan membuat dual-write ke Khanza dan database baru.
- Jangan menganggap DDL saat ini sebagai schema produksi final.

Jika pekerjaan dibuka kembali, urutan yang direncanakan:

1. Review schema bersama pemilik proses, tim aplikasi, dan DBA.
2. Buat database tujuan kosong dan jalankan DDL/referensi.
3. Profilkan data sumber tanpa mengekspos data pasien.
4. Migrasikan master, pasien, identitas/alamat/kontak/penjamin, lalu kunjungan dan rujukan.
5. Catat data kotor atau relasi yang tidak dapat dipetakan di `migrasi_masalah`.
6. Jalankan `database/validasi/pasien_registrasi.sql`.
7. Rekonsiliasi jumlah data, relasi, biaya, serta sampel aturan bisnis.
8. Uji idempotensi, performa, kegagalan parsial, backup, dan rollback.
9. Tentukan satu sumber kebenaran dan jadwal freeze/cutover.

Validasi teknis bernilai nol belum cukup; hasil migrasi tetap memerlukan pemeriksaan bisnis bersama pengguna.

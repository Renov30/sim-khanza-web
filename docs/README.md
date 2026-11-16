# Riwayat dan Panduan Pengembangan

Dokumen ini menjadi catatan perkembangan proyek dan panduan menentukan pekerjaan berikutnya. Aturan teknis yang wajib diikuti berada di [`AGENTS.md`](../AGENTS.md), sedangkan struktur aplikasi dan database dijelaskan di [`schema.md`](schema.md).

## Status saat ini

| Area | Status | Catatan |
|---|---|---|
| Shell, menu, dan autentikasi | Aktif | Login Khanza, cookie sesi, penguncian UI, sinkronisasi lintas tab. |
| Data pasien | Aktif | Cari, tambah, ubah, penomoran RM, master pasien, TNI/POLRI. |
| Registrasi | Aktif | Filter, pagination, tambah, koreksi, hapus terbatas, penomoran, tarif, dan rujukan. |
| IGD, rawat jalan, rawat inap | Eksperimental | Halaman dan query baca awal; belum workflow lengkap. |
| Laboratorium, radiologi, farmasi | Eksperimental | Halaman/query awal; izin, tipe, dan tes belum seragam. |
| Database baru | Rancangan | DDL tersedia, tetapi belum digunakan aplikasi. |
| Migrasi data Khanza | Ditunda | Importir dipertahankan sebagai prototipe dan tidak dijalankan. |

## Riwayat pengembangan

### 6 November 2026 — fondasi

- Inisialisasi Next.js, TypeScript, Tailwind CSS, menu utama, dan layout aplikasi.
- Login admin/user Khanza dengan kompatibilitas enkripsi AES.
- Header global, menu kategori, dropdown standar, Toast, dan dialog konfirmasi.
- Halaman awal registrasi, pasien, IGD, laboratorium, radiologi, farmasi, rawat inap, dan rawat jalan.

### 7 November 2026 — autentikasi dan registrasi

- Penguncian antarmuka ketika sesi berakhir.
- Sinkronisasi login/logout antar-tab menggunakan `BroadcastChannel` dan `storage`.
- Pencarian pasien dari halaman registrasi dan navigasi ke input pasien baru.

### 11–13 November 2026 — modul inti

- Penomoran registrasi diperbaiki agar pratinjau tidak menghabiskan nomor.
- Named lock, retry benturan nomor, dan transaksi penyimpanan ditambahkan.
- Form pasien diperluas untuk wilayah, penjamin, perusahaan, suku, bahasa, keterbatasan fisik, serta TNI/POLRI.
- Penomoran RM dipindahkan ke server.
- Struktur halaman pasien dan registrasi diseragamkan.
- Rujukan internal poli ditambahkan.

### 14 November 2026 — rancangan database baru

- DDL awal pasien dan kunjungan dibuat dengan nama berbahasa Indonesia.
- Primary key internal dipisahkan dari nomor RM dan nomor kunjungan.
- Referensi awal, query validasi, dan prototipe importir Khanza ditambahkan.

### 16 November 2026 — dokumentasi dan keamanan repository

- Migrasi database ditetapkan berstatus ditunda.
- Dokumentasi proyek diringkas untuk kebutuhan tim kecil.
- `.env.migrasi` dikeluarkan dari tracking Git tanpa menghapus file lokal. Kredensial nyata yang pernah masuk riwayat perlu dirotasi.
- Seluruh aturan proyek digabungkan ke `AGENTS.md`.
- Warna antarmuka diseragamkan menjadi palet klinis: `primary` (biru rumah sakit), `secondary` (teal), dan `tertiary` (hijau mint). Seluruh nilai palet memiliki satu sumber di CSS variables, sedangkan merah tetap khusus untuk error atau tindakan berbahaya.

## Prioritas pengembangan berikutnya

1. Menambahkan pemeriksaan sesi dan permission pada seluruh endpoint eksperimental.
2. Memperkuat atau menonaktifkan sementara penghapusan pasien sampai pemeriksaan relasi bisnis tersedia.
3. Menambahkan tes API pasien untuk akses, rollback, relasi, dan penghapusan.
4. Mengurangi penggunaan `any` dan membersihkan lint repository.
5. Menyembunyikan host/nama database dari `/api/system/info` pada produksi.
6. Mematangkan satu modul pelayanan per iterasi: IGD/rawat jalan, rawat inap, laboratorium/radiologi, lalu farmasi.
7. Menambahkan audit perubahan, logging aman, dan pengujian end-to-end.

## Alur kerja developer

1. Baca `AGENTS.md` dan bagian schema/modul yang akan diubah.
2. Baca panduan Next.js relevan di `node_modules/next/dist/docs/`.
3. Telusuri class Java dan schema di `../simitra-keluarga-merauke/`.
4. Pisahkan aturan bisnis yang harus kompatibel dari kekurangan teknis implementasi lama.
5. Terapkan validasi dan otorisasi server sebelum mengakses database.
6. Gunakan prepared statement, transaksi, dan penguncian bila diperlukan.
7. Gunakan komponen bersama dan pola halaman yang ditentukan `AGENTS.md`.
8. Tambahkan tes untuk jalur sukses, input salah, konflik, dan rollback.
9. Perbarui dokumen ini bila status atau prioritas berubah; perbarui `schema.md` bila struktur aplikasi/database berubah.

## Verifikasi

```sh
npm run test:pasien
npm run test:registrasi
npm run lint
npm run build
```

Tes pasien mencakup field tambahan, umur, pilihan master, afiliasi, dan penomoran RM. Tes registrasi mencakup tanggal WIT, nomor, konflik, validasi, tarif, umur, rujukan, pagination, akses, transaksi, dan perlindungan hapus.

## Kriteria selesai

Perubahan dianggap selesai bila:

- Aturan bisnis dan referensinya jelas.
- Otorisasi serta validasi server tersedia.
- Transaksi, konkurensi, dan error telah dipertimbangkan.
- UI mengikuti komponen dan aksesibilitas proyek.
- Tes relevan lulus dan `git diff --check` bersih.
- Tidak ada secret atau data pasien dalam diff.
- Dokumentasi tetap sesuai perilaku kode.

Migrasi database bukan prioritas aktif. Pekerjaan tersebut hanya dibuka kembali setelah schema, sumber kebenaran, rekonsiliasi, backup, rollback, dan jadwal cutover disepakati bersama pemilik proses, tim aplikasi, dan DBA.

# SIMRS Khanza Web

Aplikasi Sistem Informasi Manajemen Rumah Sakit (SIMRS) Khanza versi web yang dibangun menggunakan Next.js, TypeScript, dan Tailwind CSS. Proyek ini memodernisasi antarmuka desktop Java (frmUtama) menjadi aplikasi web yang terstruktur, ringan, dan seragam.

## Fitur Utama

- Tampilan antarmuka utama mengacu pada struktur class frmUtama (menu bar program, toolbar akses cepat, dan status bar).
- Halaman menu utama dengan pengelompokan modul kategori A sampai T serta fitur pencarian instan.
- Autentikasi pengguna terhubung langsung ke database SIMRS Khanza melalui API dengan enkripsi AES standar Khanza.
- Pemisahan hak akses antara Administrator Utama dan Petugas atau Dokter.
- Konvensi kode dan struktur halaman seragam yang terdokumentasi pada rules/RULES.md.

## Cara Menjalankan

1. Salin konfigurasi environment:
   cp .env.example .env.local

2. Sesuaikan konfigurasi database MariaDB atau MySQL di file .env.local.

3. Jalankan server pengembangan:
   npm run dev

4. Buka http://localhost:3000 pada peramban.

## Penomoran Registrasi

Penomoran mengikuti `DlgReg.isNumber()` pada referensi `../simitra-keluarga-merauke/src/simrskhanza/DlgReg.java`. No. Rawat memakai format `YYYY/MM/DD/000001` dengan urutan harian. No. Reg memakai urutan per dokter, poli, atau kombinasi keduanya sesuai `KHANZA_URUTNOREG`. Bila `KHANZA_BASENOREG=booking`, urutan memperhitungkan maksimum nomor booking dan registrasi pada tanggal serta kelompok yang sama.

Nilai bawaan adalah `dokter + poli` dan `booking`, sesuai `setting/database.xml` pada referensi. Sesuaikan kedua variabel environment dengan konfigurasi desktop yang memakai database yang sama. Tanggal awal formulir mengikuti zona waktu Asia/Jayapura.

Membuka halaman atau menekan Baru hanya menampilkan nomor berikutnya, tanpa memesan atau menghabiskan nomor. Server menghitung ulang saat menyimpan dengan lock antar-penyimpanan web. Nomor yang akhirnya tersimpan dapat berbeda dari pratinjau bila petugas lain lebih dahulu mendaftar. Benturan primary key dengan desktop dicoba ulang tanpa menimpa data lama; lock web tidak mengunci proses antrean pada aplikasi desktop.

Jalankan `npm run test:registrasi` untuk memeriksa penomoran, tanggal, serta penanganan benturan nomor dan lock.

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

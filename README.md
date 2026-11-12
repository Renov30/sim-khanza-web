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

## Validasi dan keamanan registrasi

- Semua API registrasi, pencarian pasien, dan pratinjau nomor memerlukan sesi dengan izin registrasi.
- Server menghitung umur pada tanggal kunjungan. Status pasien Baru/Lama mengikuti tanggal daftar pasien seperti `DlgReg.isCekPasien()`, sedangkan status poli mengikuti riwayat pasien pada poli tersebut.
- Tarif dihitung server dari `registrasi` atau `registrasilama`. Edit yang tidak mengganti pasien, poli, atau tanggal mempertahankan tarif tersimpan; isian tarif dari browser tidak digunakan.
- Simpan/edit beserta asal rujukan dilakukan dalam satu transaksi. Edit menyimpan tanggal, jam, pasien, dokter, poli, penjamin, penanggung jawab, dan status. No. Rawat dipertahankan sebagai identitas relasi, sedangkan No. Reg dihitung ulang bila tanggal/dokter/poli berubah.
- Registrasi yang sudah dibayar tidak dapat diedit atau dihapus melalui halaman ini. Registrasi dengan data pelayanan terkait tidak dapat dihapus atau diganti pasiennya. Pemeriksaan relasi FK dan penghapusan dijalankan setelah mengunci baris registrasi dalam transaksi.
- Asal rujukan disimpan di `rujuk_masuk`; pengeditan nama perujuk mempertahankan nomor bridging dan detail rujukan desktop yang sudah ada.
- Filter status bayar diterapkan sebelum pagination di database. Tombol Semua menghapus filter; gunakan Sebelumnya/Berikutnya untuk menjangkau seluruh hasil, 100 registrasi per halaman. Cetak menggunakan halaman hasil yang sedang ditampilkan.
- Pencarian pasien mencakup No. RM, nama, NIK, dan alamat. Permintaan lama dibatalkan saat pencarian berubah; pencarian pasien memakai jeda 200 ms untuk mengurangi permintaan saat mengetik.

`npm run test:registrasi` juga menguji validasi data, tarif, umur, rujukan, akses API, pagination, rollback, dan pengamanan penghapusan. Pengujian HTTP menggunakan koneksi tiruan, bukan data pasien nyata.

## Input pasien

Tab Input Pasien mencakup field master `pasien` pada `DlgPasien`: identitas, tanggal pertama daftar, umur terhitung, wilayah pasien/P.J., kontak, pekerjaan P.J., instansi, suku, bahasa, cacat fisik, email, NIP/NRP, serta keanggotaan TNI/POLRI. Pilihan master dicari melalui `/api/pasien/options` dengan batas hasil agar tidak memuat seluruh data wilayah sekaligus. Wilayah pasien memakai ID master, sedangkan wilayah P.J. menyimpan nama sesuai skema Khanza.

Tambah memakai POST dan edit memakai PUT. Nomor RM pasien yang dipilih tidak diubah dari formulir edit. Penyimpanan pasien dan keanggotaan berjalan dalam satu transaksi, dan field tambahan yang tidak dikirim klien lama dipertahankan. Jalankan `npm run test:pasien` untuk memeriksa pemetaan field, umur, validasi, serta keanggotaan.

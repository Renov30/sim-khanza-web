# Riwayat dan Panduan Pengembangan

Dokumen ini menjadi catatan perkembangan proyek dan panduan menentukan pekerjaan berikutnya. Aturan teknis yang wajib diikuti berada di [`AGENTS.md`](../AGENTS.md), sedangkan struktur aplikasi dan database dijelaskan di [`schema.md`](schema.md).

## Status saat ini

| Area | Status | Catatan |
|---|---|---|
| Shell, menu, dan autentikasi | Aktif | Login Khanza, cookie sesi, penguncian UI, sinkronisasi lintas tab. |
| Data pasien | Aktif | Cari, tambah, ubah, penomoran RM, master pasien, TNI/POLRI. |
| Data obat, alkes & BHP | Aktif | Master `databarang`, kode otomatis, harga, expire, status aktif/nonaktif, dan pagination. |
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
- Warna antarmuka diseragamkan menjadi palet referensi: `primary` (biru langit), `secondary` (lime), dan `tertiary` (charcoal). Seluruh nilai palet memiliki satu sumber di CSS variables, sedangkan merah tetap khusus untuk error atau tindakan berbahaya.
- Judul halaman yang ringkas dipusatkan pada area berukuran tetap di navbar global; halaman utama menggunakan judul `Home` dan panel menu menggunakan `Daftar Menu`.
- Tombol kembali dipindahkan ke `PanelBawah`, menggantikan tombol `Keluar`, dan mengikuti riwayat navigasi browser dengan fallback ke halaman utama.
- Baris kosong bekas judul serta tombol segarkan dihapus agar filter, tab, atau konten langsung berada di bagian atas modul.

### 16 November 2026 — rawat jalan dan tindakan ralan

- Halaman `/rawat-jalan` menampilkan daftar registrasi ralan dengan tab `Registrasi Awal` dan `Rujukan Internal Poli`.
- Filter tanggal, penjamin, poliklinik, dokter, status periksa, status bayar, pencarian, dan pagination diterapkan di server.
- Endpoint rawat jalan memakai pemeriksaan sesi/izin, validasi filter, query berparameter, dan tes `npm run test:rawat-jalan`.
- Panel rincian billing dihapus dari halaman daftar agar tabel registrasi memakai lebar penuh.
- Menu/navbar Rawat Jalan membuka `/rawat-jalan`. Halaman tindakan hanya dibuka dari kolom `No. Reg` pada daftar kunjungan, dengan `no_rawat` pasien tersebut.
- Halaman tindakan mengadaptasi tiga penanganan utama `DlgRawatJalan`: dokter, petugas, serta dokter dan petugas. Pencarian kunjungan/tarif dibatasi, riwayat dipaginasi, request lama dibatalkan, dan penyimpanan beberapa tindakan dilakukan dalam satu transaksi.
- Tab `Pemeriksaan` mengadaptasi tanda vital dan SOAP `DlgRawatJalan`, menampilkan riwayat per kunjungan (maksimal 100 baris), serta mendukung tambah, ubah, dan hapus. Koreksi non-admin dibatasi untuk pencatat yang sama dalam 48 jam dan kunjungan yang belum diverifikasi billing.
- Waktu tampil daftar dipercepat: filter non-kata-kunci langsung memuat, kata kunci ditunda 300 ms, count dan baris dijalankan paralel, serta index `reg_periksa (tgl_registrasi, jam_reg, no_rawat)` tersedia lewat `npm run db:index-kinerja`.

### 16 November 2026 — input resep rawat jalan

- Pintasan `Input Resep` pada halaman Tindakan Rawat Jalan membuka `/farmasi/resep-obat` sambil meneruskan `no_rawat` kunjungan terpilih.
- Form resep mengadaptasi `DlgPeresepanDokter`: obat nonracikan, racikan, metode racik, bahan, aturan pakai, jumlah, kandungan, dan riwayat resep per kunjungan.
- Katalog obat mengikuti depo poli dari `set_depo_ralan` dengan fallback `set_lokasi`, hanya menampilkan barang aktif yang memiliki stok pada depo tersebut.
- API memeriksa izin `resep_obat`, status Ralan, pasien yang sudah masuk kamar inap, waktu registrasi, status billing, dan pengecualian `set_input_parsial`.
- Nomor resep dibuat di server dengan named lock per tanggal. Header dan seluruh detail resep disimpan dalam satu transaksi agar kompatibel dengan `resep_obat`, `resep_dokter`, `resep_dokter_racikan`, dan `resep_dokter_racikan_detail` Khanza.
- Verifikasi API tersedia melalui `npm run test:resep-obat`.

### 17 November 2026 — navigasi keyboard formulir

- Enter memindahkan fokus ke field aktif berikutnya pada login, registrasi, data pasien, dan tindakan rawat jalan; field baca-saja, nonaktif, serta kontrol pilihan biner dilewati.
- Enter pada textarea tetap membuat baris baru, sedangkan Ctrl+Enter memindahkan fokus seperti Tab.
- Pelaksana tindakan dan pemeriksaan otomatis menggunakan dokter tujuan/DPJP dari kunjungan terpilih; pilihan manual tetap tersedia dan otorisasi penyimpanan server tetap berlaku.
- Tab Pemeriksaan menyediakan pencarian 5 SOAPIE terakhir seperti `RMCari5SOAPTerakhir`; riwayat difilter berdasarkan No. RM dan NIP pelaksana, lalu dapat dipakai untuk mengisi Subjek, Objek, Asesmen, Plan, Instruksi, dan Evaluasi.

### 18 November 2026 — daftar resep dokter

- Halaman `/farmasi/daftar-resep-dokter` mengadaptasi `DlgDaftarPermintaanResep` dengan tab Rawat Jalan/Rawat Inap serta tab ringkasan/detail resep.
- Ringkasan menampilkan status pelayanan, unit atau ruang aktif, jenis bayar, waktu validasi, dan penyerahan rawat jalan. Detail memuat obat nonracikan, racikan, serta bahan racikan.
- Filter periode, status, dokter, unit, dan kata kunci dijalankan di server. Data dipaginasi maksimal 100 resep per halaman dan jumlah record dihitung terpisah agar tabel tetap ringan.
- Endpoint dilindungi izin `resep_obat`, memakai validasi filter dan query berparameter, serta menangani relasi `ranap_gabung` untuk ruang rawat inap aktif.

### 19 November 2026 — tema terang dan gelap

- Dropdown akun menyediakan pilihan `Terang` dan `Gelap`; preferensi disimpan di `localStorage` dengan kunci `khanza_theme` dan diterapkan sebelum hidrasi.
- Skrip tema berada di `<head>` dan `<html>` memakai `suppressHydrationWarning` agar perubahan kelas/style sebelum hidrasi tidak memicu peringatan mismatch.
- Tanpa preferensi tersimpan, tema awal mengikuti `prefers-color-scheme` sistem.
- Skala `slate` dan `bg-white` memakai CSS variables agar seluruh panel, tabel, dan teks mengikuti tema tanpa menambah varian `dark:` di tiap modul; warna merek tetap memakai token yang sama.

### 19 November 2026 — tindakan rawat inap

- Kolom `No. Rawat` pada `/rawat-inap` kini membuka `/tindakan-rawat-inap?no_rawat=...`, mengikuti pola pintasan dari `/rawat-jalan`.
- Halaman tindakan ranap mengadaptasi tiga penanganan Khanza (`rawat_inap_dr`, `rawat_inap_pr`, `rawat_inap_drpr`) dengan pencarian kunjungan/tarif, riwayat dipaginasi, dan penyimpanan beberapa tindakan dalam satu transaksi.
- Tarif berasal dari `jns_perawatan_inap` dan disaring berdasarkan penjamin, bangsal, dan kelas kamar inap aktif; waktu tindakan tidak boleh mendahului registrasi dan kunjungan batal/billing yang sudah dibuat ditolak.
- API memeriksa sesi dan izin `tindakan_ranap`, memakai query berparameter, `FOR UPDATE`, serta menangani duplikasi kunci utama. Verifikasi dengan `npm run test:tindakan-ranap`.
- Sidebar pasien dipindahkan ke komponen bersama `SidebarMenuPasien` agar pencarian menu dapat dipakai ulang oleh tindakan ralan dan ranap.

### 19 November 2026 — data obat, alkes & BHP

- Halaman `/farmasi/master-obat` mengadaptasi `DlgBarang` dengan tab Input/Data/Data Sampah; tab Data menampilkan `status='1'`, tab Data Sampah menampilkan `status='0'`, dan filter kata kunci/master hanya tampil pada kedua tab tabel.
- Master `databarang` mendukung tambah, ubah, nonaktifkan, dan pulihkan; kode barang `B` + 9 digit dibuat server memakai named lock.
- Pilihan satuan, jenis, kategori, golongan, dan industri farmasi diambil dari tabel master Khanza yang sesuai.
- Tombol Hitung Harga memakai `set_harga_obat`, `setpenjualan`, `setpenjualanumum`, atau `setpenjualanperbarang` dengan pembulatan ke kelipatan 100.
- Kandungan disimpan ke `letak_barang`; tanggal kadaluwarsa kosong ditulis `NULL` (penanda `0000-00-00` tetap diterima dari UI); status nonaktif memakai `status='0'`.
- API memeriksa izin `obat`, memakai query berparameter dan transaksi. Verifikasi dengan `npm run test:master-obat`.

### 19 November 2026 — riwayat pasien

- Pintasan `Riwayat Pasien` pada sidebar tindakan ralan kini membuka dialog enam tab: Kunjungan, S.O.A.P.I.E, Perawatan, Pembelian Obat, Piutang Obat, dan Retensi Berkas.
- Filter R1–R4 `RMRiwayatPerawatan.java` diadaptasi menjadi `terakhir`, `semua`, `tanggal`, dan `nomor`; kunjungan terpilih langsung membuka tab Perawatan dengan mode nomor.
- Endpoint `/api/riwayat-pasien` memakai izin tindakan ralan, allowlist parameter, query berparameter, batas pagination, dan ringkasan data JSON tanpa HTML, PDF, e-sign, atau path berkas mentah.
- Perawatan menggabungkan tindakan ralan/ranap, kamar inap, diagnosa, prosedur, SEP, dan resume; pembelian/piutang menyertakan rincian obat; SOAPI menggabungkan pemeriksaan ralan dan ranap.
- Tab Perawatan memiliki sidebar kiri sesuai `FormMenu` Java: checkbox bagian, `Semua`, pencarian teks, dan tombol lipat. Bagian yang tersedia di API dapat disembunyikan; bagian lain tetap tercantum sebagai daftar referensi.
- Verifikasi dengan `npm run test:riwayat-pasien`.

### 19 November 2026 — copy resep

- Menu `Copy Resep` pada sidebar tindakan ralan/ranap membuka dialog sesuai `DlgCopyResep.java`: filter tanggal, pencarian per obat, tabel header resep, dan rincian obat/racikan di bawah setiap baris.
- Endpoint `GET /api/farmasi/copy-resep` memakai izin `resep_obat`, query berparameter, allowlist status, batas tanggal/nomor, dan batas 100 resep.
- Tombol `Copy` pada kunjungan ralan membuka `/farmasi/resep-obat` dengan `no_rawat` kunjungan aktif, bukan `no_rawat` resep sumber, serta `dari_no_resep`; halaman tujuan memuat obat, racikan, dan bahan ke form sebagai draft yang masih harus diperiksa petugas.
- Copy resep tidak menyalin nomor resep lama atau menulis database sumber; nomor resep baru tetap dibuat server oleh alur Input Resep.
- Tombol `Hapus` dan `Ubah` sengaja dinonaktifkan karena Khanza Web belum mengadaptasi kedua aksi `DlgCopyResep.java`. Copy resep rawat inap juga belum tersedia dan memberi pesan pada tombol Copy.
- Verifikasi dengan `npm run test:copy-resep`.

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
npm run test:rawat-jalan
npm run test:tindakan-ranap
npm run test:master-obat
npm run test:resep-obat
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

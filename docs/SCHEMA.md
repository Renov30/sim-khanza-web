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
│   ├── mapping/              # Pemetaan kolom Khanza ke tabel layanan
│   └── validasi/             # Query pemeriksaan hasil migrasi
├── docs/
│   ├── README.md             # Riwayat dan arah pengembangan
│   └── SCHEMA.md             # Dokumen ini
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
- `src/lib/resume-pasien/`: tipe field, akses izin dokter, dan aturan resume ralan.
- `src/components/modul/`: header, grid formulir, panel input, panel bawah, dan `MenuKonteksTabel` beserta data menu rawat jalan/rawat inap.
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
| Tindakan rawat jalan | `/api/tindakan-rawat-jalan`, `/api/tindakan-rawat-jalan/pemeriksaan` | Admin atau izin tindakan ralan. |
| Riwayat pasien | `/api/riwayat-pasien` | Admin atau izin tindakan ralan. |
| Resume pasien | `/api/resume-pasien` | Admin atau izin `data_resume_pasien`; tulis hanya dokter/pemilik. |
| Tindakan rawat inap | `/api/tindakan-rawat-inap` | Admin atau izin tindakan ranap. |
| Mutasi rawat inap | `/api/rawat-inap/pulang`, `/api/rawat-inap/pindah-kamar` | Admin atau izin `kamar_inap`. |
| Pasien meninggal dan rujuk keluar | `/api/rawat-inap/pasien-mati`, `/api/rawat-inap/rujuk` | Admin atau izin masing-masing `pasien_meninggal` / `rujukan_keluar`. |
| Master obat | `/api/farmasi/master-obat`, `/api/farmasi/master-obat/options` | Admin atau izin obat. |
| Copy resep | `/api/farmasi/copy-resep` | Admin atau izin resep obat. |
| Input resep dan daftar resep dokter | `/api/farmasi/resep-obat`, `/api/farmasi/daftar-resep-dokter` | Admin atau izin resep obat. |

Pasien mendukung pencarian, tambah, ubah, nomor RM server, master wilayah/penjamin, serta TNI/POLRI. Penghapusan pasien masih berisiko karena belum mempunyai pemeriksaan bisnis selengkap registrasi.

Registrasi mendukung filter, pagination, registrasi awal, rujukan internal, nomor rawat/antrean server, tarif server, umur, status baru/lama, transaksi rujukan, dan penghapusan terbatas. Registrasi terbayar atau yang sudah memiliki pelayanan tidak dapat diubah/dihapus melalui alur biasa.

Rawat jalan menampilkan daftar registrasi ralan dengan tab registrasi awal/rujukan internal, filter tanggal, penjamin, poli, dokter, status, dan status bayar. Tabelnya menyediakan menu klik kanan sesuai grup `DlgKasirRalan.java`: aksi dengan halaman web tersedia langsung membuka halaman tersebut, `Urutkan Data Berdasar` mengurutkan baris yang sedang tampil, dan item belum tersedia hanya memberi toast. Modul tindakan ralan mendukung penanganan dokter, petugas, serta gabungan dengan tarif tervalidasi server dan penyimpanan transaksional. Pemeriksaan klinis umum mendukung tanda vital, SOAP, penampil data per kunjungan, dan CRUD terbatas. Obstetri, ginekologi, diagnosa, catatan dokter, pembayaran, dan cetak nota belum tersedia sepenuhnya.

Rawat inap menampilkan daftar kunjungan `kamar_inap` dengan filter di `PanelBawah`: mode `Semua`/`Belum Pulang`/`Tgl. Masuk`/`Pulang`, periode dua tanggal, status bayar, bangsal, dan kata kunci. Default mengikuti radio R1 `Belum Pulang` pada `DlgKamarInap.java`; opsi `Semua` tetap tersedia untuk melihat seluruh catatan. Tabelnya memakai `MenuKonteksTabel` yang sama dengan rawat jalan, tetapi memuat 20 grup dari `DlgKamarInap.java`. Aksi yang memiliki halaman web membuka resume, riwayat, tindakan, laboratorium, radiologi, resep, atau penjualan; `Urutkan Data Berdasar` mengurutkan baris tampil berdasarkan No. Rawat, Cara Bayar, No. RM, Nama, Kamar, atau Tanggal Masuk. Tombol `Pulang` dan `Pindah` membuka dialog mutasi. Perintah cetak, status, hapus, bridging, masuk, dan ekspor yang belum diadaptasi hanya memberi toast dan tidak melakukan mutasi.

Mutasi pulang mengikuti `BtnSimpanActionPerformed` `DlgKamarInap.java`: `kamar_inap` diperbarui dengan tanggal/jam keluar, status, diagnosa akhir, lama, tarif, dan biaya; kamar menjadi `KOSONG`. Status `Meninggal` dan `Rujuk` membuka dialog lanjutan yang menulis `pasien_mati` dan `rujuk`. Mutasi pindah menyediakan keempat opsi `Rganti1`–`Rganti4`; opsi 1 menghapus baris lama, opsi 2 mengganti kamar pada baris yang sama, opsi 3 menandai baris lama `Pindah Kamar` dan membuat baris baru, sedangkan opsi 4 memakai tarif tertinggi serta kunci pembaruan anomali sesuai Java. Seluruh penulisan memakai transaksi, `FOR UPDATE`, named lock, validasi server, dan query berparameter.

Pintasan `Riwayat Pasien` pada sidebar tindakan ralan membuka dialog enam tab sesuai `RMRiwayatPerawatan.java`: Kunjungan, S.O.A.P.I.E, Perawatan, Pembelian Obat, Piutang Obat, dan Retensi Berkas. Filter `terakhir`, `semua`, `tanggal`, dan `nomor` mengikuti radio R1–R4. Tab Perawatan memakai sidebar kiri berisi daftar bagian dari `FormMenu` Java, checkbox `Semua`, pencarian teks, dan tombol lipat. Menu ini tidak mengadaptasi PDF, e-sign, sertisign, penulisan file HTML lokal, atau tautan berkas mentah.

Pintasan `Resume Pasien` pada sidebar tindakan ralan membuka `/resume-pasien?no_rawat=...`. Halaman memakai `PanelInputData`, `GridFormulirModul`, `PanelBawah`, dan tabel 30 kolom sesuai versi `RMDataResumePasien.java` yang kompatibel dengan schema runtime. Tombol cetak tidak tersedia; data tidak diekspor ke HTML/PDF lokal.

`tindakan-rawat-inap` dibuka dari kolom No. Rawat pada `/rawat-inap` dengan `?no_rawat=...` dan memakai tiga penanganan yang sama seperti ralan. Tarif diambil dari `jns_perawatan_inap` dan disaring menurut penjamin `reg_periksa`, bangsal, serta kelas kamar inap aktif (`kamar_inap.stts_pulang = '-'`). Penyimpanan menulis `rawat_inap_dr`, `rawat_inap_pr`, atau `rawat_inap_drpr` dalam satu transaksi dengan `FOR UPDATE` pada kunjungan; kunjungan batal, billing yang sudah dibuat, kamar aktif yang hilang, dan tarif yang tidak sesuai ditolak server. Tabel ini tidak memiliki `stts_bayar`, sehingga kolom status pada riwayat mengikuti `reg_periksa.status_bayar`.

### Eksperimental

- `/api/igd`
- `/api/rawat-inap`
- `/api/laboratorium/*`
- `/api/radiologi/*`
- Endpoint farmasi lainnya

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

## Aturan bisnis master obat

- Tabel utama adalah `databarang`, bukan `barang`; harga dan status ada pada tabel yang sama.
- Kode barang berformat `B` + 9 digit dan dibuat server dengan named lock `khanza-web:master-obat:kode`.
- Satuan memakai `kodesatuan`, jenis memakai `jenis`, kategori memakai `kategori_barang`, golongan memakai `golongan_barang`, dan industri memakai `industrifarmasi`.
- Kolom `letak_barang` menyimpan nilai yang pada antarmuka Java diberi label `Kandungan`.
- Harga jual dihitung dari persentase `set_harga_obat` dan dibulatkan ke kelipatan 100 seperti `Valid.roundUp(..., 100)`.
- Tanggal kadaluwarsa tanpa checkbox ditulis `NULL` agar sesuai `sql_mode` MySQL/MariaDB saat ini; penanda `0000-00-00` dari UI tetap diterima dan dinormalisasi server. Barang dihapus lunak dengan `status='0'` dan dapat dipulihkan.
- Tab Data Barang memakai `status='1'`, tab Data Sampah memakai `status='0'`; status ditentukan tab, bukan dropdown filter.
- Edit tidak mengganti `kode_brng` agar relasi transaksi Khanza tetap utuh.
- Daftar difilter dan dipaginasi di server; kode barang tidak ditentukan browser.

## Aturan bisnis riwayat pasien

- Endpoint `GET /api/riwayat-pasien` menerima `no_rm`, `tab`, `mode`, `tanggal_awal`, `tanggal_akhir`, `nomor`, `limit`, dan `offset`; `tab` dan `mode` dibatasi allowlist.
- Mode `terakhir` memaksa lima baris; mode lain dibatasi maksimal 100 baris per halaman dan `offset` maksimal 100000.
- Kunjungan, S.O.A.P.I.E, dan Perawatan mengabaikan `reg_periksa.stts = 'Batal'` dan mengikat hasil pada `no_rkm_medis` dari parameter.
- Perawatan merangkum tindakan ralan/ranap, kamar inap, diagnosa ICD-10, prosedur ICD-9, SEP, dan resume dalam data JSON terstruktur, bukan HTML. Kolom `jumlah` prosedur tidak tersedia pada skema runtime `sik2`, sehingga ditampilkan `-`.
- Pembelian hanya mengambil `penjualan.status = 'Sudah Dibayar'`; piutang tidak memakai filter status lunas.
- Retensi hanya mengembalikan tanggal dan status keberadaan berkas; `lokasi_pdf` tidak dikirim ke client.
- Identitas pasien tidak memuat NIK, nomor peserta, atau telepon; akses tetap diperiksa di server meski menu tampil di sidebar.

## Aturan bisnis copy resep

- Endpoint `GET /api/farmasi/copy-resep` menerima `no_rm`, `status`, `tanggal_mulai`, `tanggal_selesai`, `kd_dokter`, `cari_obat`, dan `limit` untuk daftar; `no_resep` untuk detail satu resep.
- `status` dibatasi `ralan` atau `ranap`; tanggal memakai format `YYYY-MM-DD`, `limit` 1–100, dan pencarian obat hanya filters hasil di server setelah batas resep diterapkan.
- Header berasal dari `resep_obat`, `reg_periksa`, `pasien`, dan `dokter`; detail menggabungkan `resep_dokter`, `resep_dokter_racikan`, dan `resep_dokter_racikan_detail` dengan data `databarang`.
- Stok racikan dan obat tidak pernah menjadi syarat tampil; baris dengan stok habis tetap dikirim agar petugas dapat mempertimbangkan substitusi.
- Copy hanya mengisi draft form `/farmasi/resep-obat`; penyimpanan tetap memakai nomor resep baru dan seluruh validasi Input Resep.

## Aturan bisnis resume pasien

- Endpoint `GET /api/resume-pasien` menerima `no_rawat`, `tanggal_awal`, `tanggal_akhir`, `kata_kunci`, dan `batas`; `resource=dokter` mengembalikan daftar dokter. `POST`, `PUT`, dan `DELETE` memakai body `no_rawat` atau query `no_rawat` sesuai operasi.
- Tabel utama adalah `resume_pasien` dengan primary key `no_rawat`, satu resume per kunjungan. Data diambil dari `reg_periksa`, `pasien`, `dokter`, dan `poliklinik`; diagnosa/prosedur berasal dari `diagnosa_pasien`, `penyakit`, `prosedur_pasien`, dan `icd9` dengan status `Ralan`.
- Schema runtime `sik2` memiliki 26 kolom dan tidak memuat `tanggal_keluar`; UI mengikuti versi Java dengan 30 kolom tabel tanpa kolom Waktu Keluar. `kondisi_pulang` dibatasi enum `Hidup|Meninggal`, bukan pilihan laporan Java yang lebih luas.
- Akses baca memakai izin `data_resume_pasien` atau admin. Penulisan memerlukan login yang terdaftar di `dokter`; server mengisi `kd_dokter` dari sesi untuk user biasa dan menolak perubahan resume dokter lain. Admin dapat memilih `kd_dokter` dari daftar yang valid.
- `keluhan_utama`, `jalannya_penyakit`, `diagnosa_utama`, dan `kd_dokter` wajib diisi; panjang narasi 2000 karakter, nama diagnosa/prosedur 80, kode ICD-10 10, dan kode ICD-9 8 sesuai schema.
- Simpan, ubah, dan hapus memakai transaksi dengan `FOR UPDATE` pada `reg_periksa` dan baris resume. Benturan `INSERT` menghasilkan 409; `PUT`/`DELETE` pada data yang tidak ada menghasilkan 404.
- Daftar resume dibatasi pada `no_rkm_medis` yang diambil server dari `no_rawat` aktif, sehingga perpindahan pasien tidak membuka data pasien lain. Filter tanggal dan kata kunci divalidasi serta dikirim sebagai parameter query.

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
| `database/migrations/0003_pemeriksaan_dan_resep.sql` | Tabel rujukan internal, pemeriksaan dan pelaksana, katalog dan stok per depo, resep umum dan racikan, serta ruang inap. | Uji staging |
| `database/mapping/layanan.sql` | Query sumber beserta nama kolom tujuan untuk data layanan. | Dipakai oleh importir |
| `scripts/migrasi-layanan.mjs` | Impor awal data ke tabel layanan kosong, termasuk resep rawat jalan dan rawat inap. | Uji staging |
| `scripts/db/index-kinerja.mjs` | Menambahkan index periode daftar pada database Khanza. | Opsional, perlu persetujuan DBA |

## Uji migrasi layanan di staging

1. Siapkan satu salinan Khanza yang stabil untuk kedua tahap impor dan satu database tujuan kosong. Atur `DB_SUMBER_HOST`, `DB_SUMBER_USER`, `DB_SUMBER_DATABASE` dan padanannya dengan awalan `DB_TUJUAN_` di `.env.migrasi.local`. Isi `_PORT` dan `_PASSWORD` sesuai lingkungan. Gunakan akun baca untuk sumber.
2. Jalankan SQL `0001`, `0002`, lalu `0003` pada **database tujuan**. Jalankan `npm run migrasi:khanza`, periksa hasil `database/validasi/pasien_registrasi.sql` dan selesaikan masalah pemetaan kunjungan sebelum mengimpor data layanan.
3. Jalankan `npm run migrasi:layanan`. Importir membaca satu snapshot sumber, mengirim 100 baris per batch, memeriksa jumlah per tabel, lalu melakukan satu commit di tujuan. Relasi yang gagal membatalkan seluruh tahap layanan. Pengulangan setelah sukses ditolak saat tabel sudah berisi data.
4. Cocokkan jumlah pemeriksaan per kunjungan, rujukan per poli, stok per obat/depo dan jumlah obat serta bahan per nomor resep terhadap sumber. Dua baris obat umum yang identik tetap dihitung dua kali. Untuk tanggal resep, validasi, dan penyerahan, `0000-00-00` dipetakan ke `NULL` dan waktu tengah malam tetap tersimpan. Stok yang disalin adalah saldo saat snapshot.

Tes integrasi memakai DDL dari referensi Khanza dan data sintetis. Pada MariaDB uji sementara di loopback, jalankan `MIGRASI_TEST_PORT=<port> node --test tests/migrasi-layanan.test.mjs`. Tes menggunakan akun root lokal tanpa sandi pada instance uji dan membuat dua database acak yang dibersihkan setelah tes.

## Migrasi produksi — ditunda

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

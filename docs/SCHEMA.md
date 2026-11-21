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

- `src/lib/constants/menus.ts`: katalog menu A–T dari `cmbMenu`/`isCombo()` `frmUtama.java` (1.167 entri) plus entri kurasi; ID mengikuti variabel komponen Java dan `permissionKey` mengikuti `akses.getXxx()`.
- `src/lib/db.ts`: connection pool database Khanza aktif.
- `src/lib/auth.ts`: autentikasi admin/user Khanza, token HMAC, dan cookie sesi.
- `src/lib/pasien/`: field, master, penyimpanan, akses, dan penomoran pasien.
- `src/lib/registrasi/`: tanggal WIT, validasi, penomoran, transaksi, rujukan, dan perlindungan relasi.
- `src/lib/kepegawaian/`: helper seed/validasi bersama, filter dan mutasi `pegawai`, `petugas`, `dokter`, serta izin admin/`pegawai_admin`/`petugas`/`dokter`.
- `src/lib/poliklinik/`: validasi, filter, penomoran, mutasi `poliklinik`, dan izin admin/`registrasi`.
- `src/components/modul/HalamanMasterKepegawaian.tsx`: kerangka UI bersama untuk master petugas, dokter, dan poliklinik.
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
| IGD | `/api/igd`, `/api/igd/nomor`, `/api/igd/options` | Admin atau izin IGD. |
| Rawat jalan (baca) | `/api/rawat-jalan`, `/api/rawat-jalan/billing`, `/api/rawat-jalan/options` | Admin, izin kasir ralan, registrasi, atau tindakan ralan. |
| Tindakan rawat jalan | `/api/tindakan-rawat-jalan`, `/api/tindakan-rawat-jalan/pemeriksaan` | Admin atau izin tindakan ralan. |
| Riwayat pasien | `/api/riwayat-pasien` | Admin atau izin tindakan ralan. |
| Resume pasien | `/api/resume-pasien` | Admin atau izin `data_resume_pasien`; tulis hanya dokter/pemilik. |
| Tindakan rawat inap | `/api/tindakan-rawat-inap` | Admin atau izin tindakan ranap. |
| Mutasi rawat inap | `/api/rawat-inap/pulang`, `/api/rawat-inap/pindah-kamar` | Admin atau izin `kamar_inap`. |
| Pasien meninggal dan rujuk keluar | `/api/rawat-inap/pasien-mati`, `/api/rawat-inap/rujuk` | Admin atau izin masing-masing `pasien_meninggal` / `rujukan_keluar`. |
| Master obat | `/api/farmasi/master-obat`, `/api/farmasi/master-obat/options` | Admin atau izin obat. |
| Data petugas | `/api/petugas`, `/api/petugas/options` | Admin atau izin `petugas`. |
| Data dokter | `/api/dokter`, `/api/dokter/options` | Admin atau izin `dokter`. |
| Data pegawai (penggajian) | `/api/pegawai`, `/api/pegawai/options` | Admin atau izin `pegawai_admin`. |
| Data poliklinik | `/api/poliklinik`, `/api/poliklinik/options` | Admin atau izin `registrasi`. |
| Jadwal praktek dokter | `/api/jadwal-dokter`, `/api/jadwal-dokter/options` | Admin atau izin `jadwal_praktek`. |
| Tarif rawat jalan | `/api/tarif-ralan`, `/api/tarif-ralan/options`, `/api/tarif-ralan/kode` | Admin atau izin `tarif_ralan`. |
| Tarif rawat inap | `/api/tarif-ranap`, `/api/tarif-ranap/options`, `/api/tarif-ranap/kode` | Admin atau izin `tarif_ranap`. |
| Copy resep | `/api/farmasi/copy-resep` | Admin atau izin resep obat. |
| Input resep dan daftar resep dokter | `/api/farmasi/resep-obat`, `/api/farmasi/daftar-resep-dokter` | Admin atau izin resep obat. |

Pasien mendukung pencarian, tambah, ubah, nomor RM server, master wilayah/penjamin, serta TNI/POLRI. Penghapusan pasien masih berisiko karena belum mempunyai pemeriksaan bisnis selengkap registrasi.

Registrasi mendukung filter, pagination, registrasi awal, rujukan internal, nomor rawat/antrean server, tarif server, umur, status baru/lama, transaksi rujukan, dan penghapusan terbatas. Kedua tabel membuka menu kontekstual sesuai `jPopupMenu1`/`jPopupMenu2` `DlgReg.java`: aksi dengan halaman web tersedia langsung membuka halaman terkait, `Belum Terbit SEP BPJS`/`Sudah Terbit SEP BPJS` mengubah filter `sep` pada `/api/registrasi`, dan `Urutkan Data Berdasar` mengurutkan baris yang sedang tampil. Registrasi terbayar atau yang sudah memiliki pelayanan tidak dapat diubah/dihapus melalui alur biasa.

Rawat jalan menampilkan daftar registrasi ralan dengan tab registrasi awal/rujukan internal, filter tanggal, penjamin, poli, dokter, status, dan status bayar. Tabelnya menyediakan menu klik kanan sesuai grup `DlgKasirRalan.java`: aksi dengan halaman web tersedia langsung membuka halaman tersebut, `Urutkan Data Berdasar` mengurutkan baris yang sedang tampil, dan item belum tersedia hanya memberi toast. Modul tindakan ralan mendukung penanganan dokter, petugas, serta gabungan dengan tarif tervalidasi server dan penyimpanan transaksional. Pemeriksaan klinis umum mendukung tanda vital, SOAP, penampil data per kunjungan, dan CRUD terbatas. Obstetri, ginekologi, diagnosa, catatan dokter, pembayaran, dan cetak nota belum tersedia sepenuhnya.

Rawat inap menampilkan daftar kunjungan `kamar_inap` dengan filter di `PanelBawah`: mode `Semua`/`Belum Pulang`/`Tgl. Masuk`/`Pulang`, periode dua tanggal, status bayar, bangsal, dan kata kunci. Default mengikuti radio R1 `Belum Pulang` pada `DlgKamarInap.java`; opsi `Semua` tetap tersedia untuk melihat seluruh catatan. Tabelnya memakai `MenuKonteksTabel` yang sama dengan rawat jalan, tetapi memuat 20 grup dari `DlgKamarInap.java`. Aksi yang memiliki halaman web membuka resume, riwayat, tindakan, laboratorium, radiologi, resep, atau penjualan; `Urutkan Data Berdasar` mengurutkan baris tampil berdasarkan No. Rawat, Cara Bayar, No. RM, Nama, Kamar, atau Tanggal Masuk. Tombol `Pulang` dan `Pindah` membuka dialog mutasi. Perintah cetak, status, hapus, bridging, masuk, dan ekspor yang belum diadaptasi hanya memberi toast dan tidak melakukan mutasi.

Mutasi pulang mengikuti `BtnSimpanActionPerformed` `DlgKamarInap.java`: `kamar_inap` diperbarui dengan tanggal/jam keluar, status, diagnosa akhir, lama, tarif, dan biaya; kamar menjadi `KOSONG`. Status `Meninggal` dan `Rujuk` membuka dialog lanjutan yang menulis `pasien_mati` dan `rujuk`. Mutasi pindah menyediakan keempat opsi `Rganti1`–`Rganti4`; opsi 1 menghapus baris lama, opsi 2 mengganti kamar pada baris yang sama, opsi 3 menandai baris lama `Pindah Kamar` dan membuat baris baru, sedangkan opsi 4 memakai tarif tertinggi serta kunci pembaruan anomali sesuai Java. Seluruh penulisan memakai transaksi, `FOR UPDATE`, named lock, validasi server, dan query berparameter.

Pintasan `Riwayat Pasien` pada sidebar tindakan ralan membuka dialog enam tab sesuai `RMRiwayatPerawatan.java`: Kunjungan, S.O.A.P.I.E, Perawatan, Pembelian Obat, Piutang Obat, dan Retensi Berkas. Filter `terakhir`, `semua`, `tanggal`, dan `nomor` mengikuti radio R1–R4. Tab Perawatan memakai sidebar kiri berisi daftar bagian dari `FormMenu` Java, checkbox `Semua`, pencarian teks, dan tombol lipat. Menu ini tidak mengadaptasi PDF, e-sign, sertisign, penulisan file HTML lokal, atau tautan berkas mentah.

Pintasan `Resume Pasien` pada sidebar tindakan ralan membuka `/resume-pasien?no_rawat=...`. Halaman memakai `PanelInputData`, `GridFormulirModul`, `PanelBawah`, dan tabel 30 kolom sesuai versi `RMDataResumePasien.java` yang kompatibel dengan schema runtime. Tombol cetak tidak tersedia; data tidak diekspor ke HTML/PDF lokal.

`tindakan-rawat-inap` dibuka dari kolom No. Rawat pada `/rawat-inap` dengan `?no_rawat=...` dan memakai tiga penanganan yang sama seperti ralan. Tarif diambil dari `jns_perawatan_inap` dan disaring menurut penjamin `reg_periksa`, bangsal, serta kelas kamar inap aktif (`kamar_inap.stts_pulang = '-'`). Penyimpanan menulis `rawat_inap_dr`, `rawat_inap_pr`, atau `rawat_inap_drpr` dalam satu transaksi dengan `FOR UPDATE` pada kunjungan; kunjungan batal, billing yang sudah dibuat, kamar aktif yang hilang, dan tarif yang tidak sesuai ditolak server. Tabel ini tidak memiliki `stts_bayar`, sehingga kolom status pada riwayat mengikuti `reg_periksa.status_bayar`.

IGD menampilkan kunjungan `reg_periksa` untuk `kd_poli = 'IGDK'` dengan filter periode dua tanggal, kata kunci 13 kolom, status periksa, dan status SEP sesuai `DlgIgd.java`. `/api/igd` memakai allowlist, validasi tanggal, query berparameter, hitung `total`, dan batas `limit` 1–100. Tabelnya memakai `MenuKonteksTabel` dengan 16 grup dari `jPopupMenu1`; aksi yang belum memiliki halaman Khanza Web hanya menampilkan toast, sedangkan `Belum Terbit SEP BPJS` dan `Sudah Terbit SEP BPJS` mengubah filter SEP. Halaman juga memiliki panel input accordion untuk tambah dan ubah kunjungan IGD dengan nomor rawat/antrean server, tarif registrasi, rujukan transaksional, dan modal pencarian pasien yang sama dengan registrasi melalui `PilihPasienDialog`. `/api/igd/options?jenis=pasien` mengembalikan array pasien seperti `/api/registrasi/options`.

### Eksperimental

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

## Aturan bisnis IGD

- Endpoint IGD memakai izin `igd` atau admin; izin registrasi tidak otomatis memberi akses IGD.
- Unit IGD memakai `kd_poli='IGDK'` dan status lanjut `Ralan`; klien tidak dapat menggantinya.
- `POST` menetapkan `stts='Belum'` dan `status_bayar='Belum Bayar'`; `PUT` mempertahankan keduanya dari data lama.
- Nomor rawat dan nomor antrean dihasilkan server memakai aturan yang sama dengan registrasi. Nomor antrean tidak dihitung ulang jika dokter dan tanggal tidak berubah.
- Pasien dengan `kamar_inap.stts_pulang='-'` ditolak. Ubah pasien juga ditolak jika kunjungan lama sudah memiliki catatan pelayanan.
- `PUT`/`DELETE` menolak `status_bayar='Sudah Bayar'` dan data dengan `kd_poli` bukan `IGDK`.
- `DELETE` menolak jika masih ada relasi pelayanan, lalu menghapus `rujuk_masuk` dan `reg_periksa` dalam satu transaksi.

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

Halaman `/pasien` memakai entri menu `btn-data-pasien` (`Data Pasien`) sebagai pintasan registrasi dan `btn-pasien` (`Pasien`) dari katalog master; halaman `/petugas` memakai entri menu `btn-pegawai` (`Data Petugas`), halaman `/dokter` memakai `btn-dokter`, halaman `/pegawai` untuk penggajian memakai `btn-penggajian`, dan halaman `/poliklinik` memakai `btn-data-poliklinik` (`Data Poliklinik`). Daftar difilter dan dipaginasi di server; kolom `photo` tidak diambil, sedangkan `no_ktp` tidak ditampilkan pada tabel meski tetap tersedia untuk pencarian dan isian.

## Aturan bisnis pegawai

- Tabel utama adalah `pegawai` dengan primary key `id` `AUTO_INCREMENT`; nomor pegawai tidak dibuat atau dikunci manual oleh aplikasi.
- `GET /api/pegawai` menerima `cari`, `departemen`, `bidang`, `jnj_jabatan`, `stts_kerja`, `kode_kelompok`, dan `status`. Default `status=AKTIF`; `status=semua` hanya menghilangkan syarat status, sedangkan nilai di luar allowlist jatuh ke `AKTIF`.
- Pencarian memakai tujuh `LIKE` berparameter pada NIP, nama, jabatan, jenjang, departemen, bidang, dan `no_ktp`. Pagination dibatasi maksimal 200 baris per halaman.
- `POST`, `PUT`, `PATCH`, dan `DELETE` memakai transaksi serta validasi server untuk panjang field, enum `jk`/`ms_kerja`/`stts_aktif`, tanggal kalender, dan rentang `wajibmasuk`.
- `POST` mengisi `pengurang`, `indek`, `cuti_diambil`, dan `dankes` dengan `0`; `mulai_kontrak` kosong ditulis `NULL`. Kolom `photo` sengaja tidak disentuh agar kompatibel dengan data Khanza lain.
- `DELETE` menandai `stts_aktif='KELUAR'` tanpa menghapus baris, sehingga relasi transaksi tetap utuh. `PATCH` dapat mengubah status ke nilai enum lain, termasuk mengaktifkan kembali pegawai.

## Aturan bisnis petugas dan dokter

- UI `/petugas` dan `/dokter` memakai satu halaman dengan panel input accordion `PanelInputData` dan tabel di bawahnya, bukan tab Input/Data. Aksi mutasi, filter, dan pagination tetap berada di `PanelBawah`.
- `petugas` memakai `nip` sebagai kunci dan `dokter` memakai `kd_dokter`; keduanya tidak membuat user/password dan tidak mengubah tabel `user`.
- Field, panjang, dan enum mengikuti schema runtime: `jk` `L|P`, `gol_darah`/`gol_drh` `A|B|O|AB|-`, `stts_nikah` lima nilai sesuai Java, dan `status` `0|1`.
- `GET /api/petugas` dan `GET /api/dokter` menerima `cari`, `jk`, `gol_darah`/`gol_drh`, `stts_nikah`, `status`, `page`, dan `limit`. Default `status=1`; `semua` menghilangkan syarat status; pagination maksimal 200 baris.
- `POST`, `PUT`, `PATCH`, dan `DELETE` memakai transaksi, query berparameter, validasi panjang/enum/tanggal, serta validasi allowlist status. `ER_DUP_ENTRY` diterjemahkan menjadi 409.
- Master pendukung di-seed dengan `INSERT IGNORE` mengikuti `DlgPetugas.java`/`DlgDokter.java`: `jnj_jabatan`, `departemen`, `bidang`, `bank`, `stts_wp`, `stts_kerja`, `kelompok_jabatan`, `resiko_kerja`, `emergency_index`, dan `pendidikan`.
- Data dasar (nama, jenis kelamin, tempat/tanggal lahir, alamat) dicerminkan ke `pegawai` dalam transaksi yang sama. JK `L|P` ditulis `Pria|Wanita` pada `pegawai`.
- Kode dokter dibuat server berformat `D` + 7 digit dari nilai maksimum dengan named lock `simrs-khanza-kode-dokter`, bukan dari browser.
- `DELETE` menandai `status='0'` tanpa menghapus baris. `PATCH status='1'` memulihkan status dan menandai `pegawai.stts_aktif='AKTIF'`; `DELETE` dokter juga menandai `pegawai.stts_aktif='KELUAR'`.

## Aturan bisnis poliklinik

- Halaman `/poliklinik` memakai satu halaman dengan panel input accordion `PanelInputData` dan tabel di bawahnya, mengikuti kerangka petugas/dokter. Aksi, filter status, dan pagination berada di `PanelBawah`.
- Menu `btn-data-poliklinik` berjudul `Data Poliklinik`, kategori A, dan izin `registrasi`, mengikuti `akses.getRegistrasi()` pada `DlgPoli.java`.
- Tabel utama adalah `poliklinik` dengan kunci `kd_poli`. Field yang dikelola: `nm_poli`, `registrasi`, `registrasilama`, dan `status`; panjang mengikuti schema runtime 5/50/13/1 karakter.
- Tarif kosong ditulis `0`. Nilai numerik dibatasi 13 karakter dan dua angka desimal di server agar sesuai kolom `double`.
- `POST` membuat kode `U` + 4 digit di server dari nilai maksimum yang cocok dengan `^U[0-9]{4}$` dan named lock `simrs-khanza-kode-poli`. Kode yang dikirim browser diabaikan saat membuat data baru.
- Kunci unit tidak diubah oleh `PUT`; `kd_lama` dipakai hanya untuk klausul `WHERE`. Pembatasan ini menjaga relasi dengan `reg_periksa`, tarif registrasi, dan resume pasien.
- `GET /api/poliklinik` menerima `cari`, `status`, `page`, dan `limit`. Default `status=1`; `semua` menghilangkan syarat status; pagination maksimal 200 baris.
- `DELETE` menandai `status='0'` tanpa menghapus baris. `PATCH status='1'` memulihkan unit agar tetap dipakai pilihan unit pada registrasi.

## Aturan bisnis jadwal praktek dokter

- Halaman `/jadwal-dokter` memakai panel input accordion, tabel, dan `PanelBawah`. Menu `btn-jadwal` (`Jadwal Praktek`) dan entri kurasi `jadwal-dokter` (`Jadwal Praktek Dokter`) keduanya memiliki izin `jadwal_praktek` dan diarahkan ke halaman yang sama.
- Tabel utama adalah `jadwal` dengan kunci primer `(kd_dokter, hari_kerja, jam_mulai)`. Relasi `kd_dokter` ke `dokter` dan `kd_poli` ke `poliklinik` memakai `ON DELETE CASCADE`/`ON UPDATE CASCADE` sesuai dump Khanza.
- Field yang dikelola: `kd_dokter` (20), `hari_kerja` (allowlist tujuh hari), `jam_mulai`, `jam_selesai`, `kd_poli` (5), dan `kuota` (0–9999). Jam wajib berformat `HH:MM:SS`; tidak ada pembatasan urutan jam karena Java tidak memvalidasinya.
- `GET /api/jadwal-dokter` menggabungkan `dokter` dan `poliklinik`, menerima `cari`, `kd_dokter`, `kd_poli`, `hari_kerja`, `page`, dan `limit`, dengan urutan mengikuti Java dan batas 200 baris per halaman. Filter di luar allowlist diabaikan.
- `POST` menulis keenam kolom. `PUT` menerima `kd_dokter_lama`, `hari_kerja_lama`, `jam_mulai_lama`, dan `jam_selesai_lama` sebagai klausul `WHERE` sesuai Java, sehingga kunci dapat diubah. `DELETE` menerima `{ items: [...] }` berisi kunci tiga kolom dan menghapus semua baris dalam satu transaksi.
- Duplikat kunci menghasilkan 409 dan gagalnya relasi foreign key diterjemahkan menjadi 400. Seluruh mutasi memakai transaksi, rollback, query berparameter, dan otorisasi server.
- Tabel tidak memiliki kolom `status`; hapus bersifat permanen dan didahului `KonfirmasiDialog`. Ini menjaga kompatibilitas dengan Java.
- `GET /api/jadwal-dokter/options` menyediakan daftar dokter, poliklinik, hari kerja, jam (00–23), menit, dan detik (00–59) untuk dropdown.

## Aturan bisnis tarif rawat jalan dan rawat inap

- Halaman `/tarif-ralan` dan `/tarif-ranap` memakai komponen bersama `HalamanTarifPerawatan` dengan panel input accordion, tabel padat bertab `Data Tarif`/`Data Sampah`, dan `PanelBawah`. Nama menu `Tarif Ralan`, `Master Tarif Ralan`, `Tarif Pelayanan Rawat Jalan`, `Tarif Rawat Inap`, dan pintasan akun terkait di `AppShell` diarahkan ke rute yang sesuai dengan izin `tarif_ralan`/`tarif_ranap`.
- Tabel utama ralan adalah `jns_perawatan`; ranap memakai `jns_perawatan_inap`. Keduanya memiliki kunci primer `kd_jenis_prw` dan FK ke `kategori_perawatan`, `penjab`, serta `poliklinik` (ralan) atau `bangsal` (ranap).
- Kode otomatis memakai prefiks `RJ` untuk ralan dan `RI` untuk ranap dengan 5 digit urutan. Kode kosong pada `POST` diisi server di bawah named lock per modul; `GET /kode` hanya memberikan saran dan tidak menjamin kode belum dipakai.
- Field yang dikelola: `nm_perawatan` (80), `kd_kategori` (5), `kd_pj` (3), `kd_poli` atau `kd_bangsal` (5), enam komponen tarif (`material`, `bhp`, `tarif_tindakandr`, `tarif_tindakanpr`, `kso`, `menejemen`), dan `kelas` untuk ranap dengan allowlist tujuh nilai dari schema.
- `total_byrdr`, `total_byrpr`, dan `total_byrdrpr` dihitung server dari komponen tarif dengan pembulatan ke bilangan bulat, mengikuti `isjml()` dan `DecimalFormat("####")` di Java. Nilai total dari klien tidak dipercaya.
- `GET` menggabungkan kategori, penjab, dan unit; menerima `cari`, `status`, `kd_kategori`, `unit`, `kelas` (ranap), `page`, dan `limit`, dengan batas 200 baris per halaman. Status default `1`; `semua` menampilkan aktif dan nonaktif.
- `POST` menulis status `1`. `PUT` menerima `kd_jenis_prw_lama` sebagai klausul `WHERE`, sehingga kode dapat diubah. `DELETE` menerima `{ items: [{ kd_jenis_prw }] }` dan melakukan soft delete multi-baris dalam satu transaksi. `PATCH` dengan `status: "1"` memulihkan tarif nonaktif dalam satu transaksi.
- Duplikat kode menghasilkan 409 dan gagalnya relasi foreign key diterjemahkan menjadi 400. Seluruh mutasi memakai transaksi, rollback, query berparameter, dan otorisasi server.
- Tab `Data Sampah` memaksa `status=0` pada daftar dan filter status disembunyikan. Klik baris pada tab ini hanya memilih baris, tidak mengisi formulir; aksi Simpan, Baru, Ganti, dan Nonaktifkan disembunyikan. Tombol `Pulihkan` mengirim `PATCH status='1'` untuk baris tercentang, lalu daftar dimuat ulang.
- Hard delete dari dialog `Data Sampah` Java tidak dipindahkan. Perubahan ini mengurangi risiko kehilangan data tarif yang masih dipakai transaksi.

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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Standar Pengembangan SIMRS Khanza Web

Dokumen ini adalah satu-satunya pedoman wajib proyek bagi developer dan AI agent. Semua kode, tata letak, arsitektur, keamanan, dan dokumentasi harus mengikuti aturan berikut agar modul konsisten, aman, dan mudah dipelihara.

## 1. Referensi Khanza dan prinsip adaptasi

- Referensi aplikasi asli berada di `../simitra-keluarga-merauke/`, terutama direktori `src/` dan dump schema `sik.sql`.
- Gunakan Java Khanza sebagai acuan alur kerja, aturan bisnis, relasi tabel, format nomor, dan kompatibilitas; jangan menyalin pola implementasi yang tidak mengikuti praktik baik.
- Saat mengadaptasi bagian aplikasi, evaluasi keamanan, otorisasi server, validasi, transaksi, konkurensi, struktur kode, tipe data, error handling, performa, dan aksesibilitas.
- Pertahankan aturan bisnis yang valid serta kompatibilitas dengan aplikasi desktop/database bersama. Bedakan perbaikan teknis dari perubahan aturan bisnis.
- Jika maksud aturan bisnis belum jelas, telusuri referensi terkait dan klarifikasi sebelum mengubah perilakunya.
- Catat perubahan perilaku yang disengaja, alasan perbaikan, dan verifikasi yang relevan.
- Folder referensi hanya dibaca dan tidak diubah kecuali diminta pengguna.
- Gunakan solusi sederhana dan proporsional. Hindari abstraksi atau dependency tanpa manfaat konkret.

## 2. Arsitektur dan teknologi

- Framework: Next.js 16 App Router.
- Bahasa: TypeScript strict; hindari `any`.
- Styling: Tailwind CSS, responsif dan ringkas.
- Ikon: Font Awesome melalui `@fortawesome/react-fontawesome` dan `@fortawesome/free-solid-svg-icons`.
- Database: MariaDB 10.x atau MySQL 8.x.
- Driver: `mysql2/promise` dengan connection pool.
- Seluruh interaksi database wajib melalui Next.js Route Handler `/api/...`. Client Component dilarang terhubung langsung ke database.
- Runtime saat ini masih memakai database Khanza. Schema baru di `database/` masih rancangan dan migrasinya ditunda; jangan mengalihkannya tanpa keputusan baru.

## 3. Desain antarmuka

### 3.1 Palet dan tampilan

- Latar utama: `bg-slate-50` atau `bg-white`.
- Panel: `bg-white border border-slate-200/80 rounded-lg shadow-sm`.
- Gunakan tiga warna merek melalui token semantik Tailwind: biru langit `primary`, lime `secondary`, dan charcoal `tertiary`. Nilai palet hanya didefinisikan sebagai CSS variables di `src/app/globals.css`; `tailwind.config.ts` hanya menghubungkan token Tailwind ke variables tersebut.
- `primary` dipakai untuk navigasi, tombol utama, tautan, pilihan aktif, dan fokus; `secondary` untuk CTA, status positif, atau aksen kecil; `tertiary` untuk aksen gelap dan penyeimbang. Lime tidak dipakai sebagai latar luas atau teks data biasa.
- Teks data: warna netral `text-slate-800`, `text-slate-700`, atau `text-slate-600`.
- Warna status hanya untuk badge/kondisi: merah untuk bahaya/error, `primary` untuk informasi, dan `secondary` untuk kondisi positif. Kondisi tertunda memakai warna netral agar tidak terlihat sebagai kondisi sukses.
- Sistem rumah sakit membutuhkan kepadatan tinggi: gunakan padding kompak, teks `text-xs` sampai `text-sm`, dan angka/tanggal tabular.

### 3.2 Larangan tampilan

- Jangan memakai gradient mencolok atau multiwarna.
- Jangan memakai ikon 3D, dekorasi berlebihan, atau bitmap pixelated.
- Jangan memakai animasi masuk, modal, menu, transisi layout, animasi dekoratif, atau transisi warna/opacity/hover/fokus. Indikator pemrosesan hanya dipakai saat proses benar-benar berjalan.
- Jangan memberi warna pada teks data biasa seperti No. Rawat, No. RM, atau nama pasien, kecuali diminta pengguna atau berupa badge status.

### 3.3 Judul halaman

- Judul halaman hanya tampil di ujung kiri navbar global sebelum tombol Menu.
- Gunakan judul yang pendek dan langsung pada nama modul atau aktivitas, misalnya `Data Pasien`, `Periksa Lab PK`, atau `Input Penjualan`.
- Halaman `/` memakai judul `Home`; ketika panel menu dibuka, judul berubah menjadi `Daftar Menu`.
- Area judul memiliki lebar tetap; ukuran teks menyesuaikan panjang judul tanpa menggeser posisi tombol antarhalaman.
- Daftarkan judul rute di `src/lib/navigasi/judul-halaman.ts`. Rute yang belum terdaftar wajib tetap mendapat judul fallback dari segmen URL.

### 3.4 Dropdown

- Jangan gunakan panah select bawaan browser yang mepet ke tepi.
- Select memakai `appearance-none`, padding kanan proporsional, dan ikon `faChevronDown`.
- Gunakan [`CustomSelect`](src/components/ui/CustomSelect.tsx) pada formulir, filter, dan tabel modul.

### 3.5 Panel input

- [`PanelInputData`](src/components/modul/PanelInputData.tsx) tertutup secara default.
- Kondisi terbuka disimpan di `localStorage` berdasarkan rute atau `idPenyimpanan`.
- Bila modul memakai tab Input/Data, tab menggantikan perilaku buka/tutup panel.

### 3.6 Tombol Baru

- Tombol Baru/`emptTeks` mereset seluruh text input, dropdown, nilai default, dan pilihan baris (`setTerpilih(null)`).
- Jangan hanya mengosongkan field teks.

### 3.7 Notifikasi dan konfirmasi

- Jangan memakai banner statis yang menggeser layout.
- Gunakan [`Toast`](src/components/common/Toast.tsx) mengambang di kanan bawah, auto-dismiss, dapat ditutup, dan memiliki tipe `sukses`, `error`, atau `info`.
- Jangan memakai `window.confirm()` atau `alert()` untuk aksi penting.
- Gunakan [`KonfirmasiDialog`](src/components/common/KonfirmasiDialog.tsx), sebutkan data spesifik dan risikonya, serta dukung tombol Escape.

### 3.8 Penguncian sesi

- Saat logout/sesi berakhir, shell dikunci, diburamkan, dan tidak interaktif sampai login berhasil.
- Modal login berada di lapisan terdepan, tidak dapat dibatalkan, dan tidak dapat ditutup dengan Escape saat terkunci.
- Login/logout wajib disinkronkan antar-tab menggunakan `BroadcastChannel` dan event `storage`.

## 4. Struktur halaman modul

Halaman generik mengikuti urutan:

1. Filter/pencarian.
2. Konten utama.
3. `PanelBawah` untuk aksi, kembali, status, atau pagination.

Halaman master atau transaksi mengikuti urutan tingkat atas:

1. Navigasi konteks atau tab opsional.
2. Formulir `PanelInputData` atau panel tab input.
3. Panel tabel/konten utama.
4. `PanelBawah` sebagai saudara panel konten.
5. Dialog, modal, dan `Toast` di bagian akhir JSX.

Ketentuan:

- Root modul memakai pola padat: `module-page`, `flex`, tinggi penuh, `bg-slate-50`, `p-2 sm:p-3`, dan `space-y-2.5`.
- Jangan menyisakan baris header kosong di konten setelah judul dipindahkan ke navbar. Filter, tab, atau konten pertama harus langsung menempati bagian atas modul.
- Navigasi kembali menggunakan tombol `Kembali` di `PanelBawah`, bukan tombol di bagian atas. Tombol kembali memakai riwayat browser dan fallback ke `/` bila riwayat tidak tersedia.
- Form desktop memakai [`GridFormulirModul`](src/components/modul/GridFormulirModul.tsx); dua kolom pertama aktif dan kolom ketiga disiapkan untuk pengembangan. Mobile kembali satu kolom.
- Tab memakai `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, dan navigasi keyboard.
- Tabel memiliki `caption` aksesibel, header `scope="col"`, dan state terpilih tidak boleh mengubah bobot font atau ukuran kolom.
- Filter/aksi memakai varian `PanelBawah`, bukan duplikasi markup.
- Urutan isi file halaman: tipe/helper murni, state, effect/pemuatan, reset/seleksi, mutasi, helper tampilan, lalu JSX.
- Perbedaan aturan bisnis boleh dipertahankan, tetapi kerangka dan komponen dasar tetap konsisten.

## 5. Keamanan, API, dan database

### 5.1 Autentikasi Khanza

- Admin: `usere = AES_ENCRYPT(?, key user)` dan `passworde = AES_ENCRYPT(?, key password)`.
- User pegawai: `id_user = AES_ENCRYPT(?, key user)` dan `password = AES_ENCRYPT(?, key password)`.
- Kunci dibaca dari `KHANZA_AES_USER_KEY` dan `KHANZA_AES_PASS_KEY`.
- `SESSION_SECRET` produksi wajib kuat dan unik; jangan mengandalkan fallback kode.
- Pemeriksaan izin pada UI tidak menggantikan otorisasi pada endpoint server.

### 5.2 Query dan transaksi

- Selalu gunakan parameterized query seperti `conn.execute(sql, params)`.
- Dilarang menyambungkan nilai input pengguna ke SQL.
- Operasi yang harus atomik wajib memakai transaksi.
- Pertimbangkan named lock, `FOR UPDATE`, benturan nomor, retry terbatas, rollback, dan pelepasan koneksi.
- Bila named lock gagal dilepas, hancurkan koneksi agar lock tidak kembali ke pool.

### 5.3 Respons API

Sukses:

```ts
{
  success: true,
  data: unknown,
  message?: string
}
```

Gagal:

```ts
{
  success: false,
  error: string,
  code?: string
}
```

- Validasi body dan query string sebelum database.
- Batasi pagination dan gunakan allowlist untuk status/kategori.
- Pesan pengguna tidak boleh membocorkan query, stack trace, secret, atau detail sensitif.

### 5.4 Data sensitif

- Jangan commit `.env*`, dump database, cookie, password, NIK, nomor peserta, atau data pasien.
- Gunakan data sintetis untuk pengujian, dokumentasi, screenshot, dan issue.
- Akun database runtime memakai least privilege.

## 6. Struktur proyek

```text
khanza-web/
├── AGENTS.md                 # Satu-satunya pedoman wajib proyek
├── database/                 # Rancangan database baru; belum aktif
├── docs/                     # Dokumentasi ringkas untuk tim
├── src/
│   ├── app/                  # App Router dan Route Handler
│   ├── components/           # Komponen bersama
│   └── lib/                  # Database, auth, aturan bisnis, dan tipe
├── tests/                    # Tes pasien dan registrasi
└── ../simitra-keluarga-merauke/ # Referensi baca Khanza
```

## 7. Kualitas kode dan dokumentasi

- Jangan mengulang kode; gunakan komponen/helper bersama bila manfaatnya nyata.
- Komentar harus singkat dan menjelaskan alasan, bukan mengulang kode.
- Utamakan performa dan aksesibilitas untuk petugas medis.
- Jangan memperluas scope atau menambah dependency tanpa alasan kuat.
- Perubahan perilaku wajib disertai tes proporsional dan pembaruan dokumentasi terkait.
- Dokumentasi tim dijaga ringkas: gunakan `docs/README.md` untuk riwayat/arah pengembangan dan `docs/schema.md` untuk struktur aplikasi/database; jangan membuat dokumen baru kecuali topiknya benar-benar berdiri sendiri.
- Sebelum menyerahkan perubahan, jalankan tes relevan, `git diff --check`, dan pastikan tidak ada secret/data pasien dalam diff.

---
name: khanza-web-typography
description: Menyamakan ukuran teks UI modul Khanza Web berdasarkan baseline halaman registrasi, terutama PanelInputData, tabel, filter, dan PanelBawah.
---

# Skala Teks UI Khanza Web

Gunakan skill ini saat membuat, mengubah, atau mereview UI halaman modul. `AGENTS.md` tetap menjadi otoritas utama; halaman registrasi menjadi baseline ukuran teks yang harus dipertahankan.

## Baseline ukuran

Gunakan ukuran berikut sebagai default, bukan ukuran Tailwind yang dipilih bebas per halaman:

| Area | Kelas standar | Ukuran | Aturan penggunaan |
| --- | --- | --- | --- |
| Isi `PanelInputData`, label field, input, date/time, dan `CustomSelect` | `text-xs` | 12px | Ukuran utama formulir dan kontrol data. Pertahankan tinggi kontrol `h-7` bila mengikuti pola registrasi. |
| Header `PanelInputData` dan tombol formulir di dalamnya | `text-xs` | 12px | Judul tetap `font-bold`; tombol tetap `font-semibold`, tetapi ukurannya tidak berubah. |
| Helper teks pada header panel | `text-[10px]` | 10px | Hanya untuk petunjuk singkat seperti “Klik untuk tampilkan formulir”. |
| Tab Input/Data | `text-xs` | 12px | Gunakan bersama pola padding dan semantik tab yang sudah ada. |
| Header dan isi tabel | `text-[11px]` | 11px | Terapkan pada elemen `<table>` agar semua kolom konsisten. Data tanggal, nomor, dan jumlah boleh memakai monospace/tabular, bukan ukuran lebih besar. |
| Badge/status ringkas di tabel | `text-[10px]` | 10px | Khusus label status, jenis kelamin, atau nilai pendek yang berbentuk badge. Jangan mengecilkan seluruh sel tabel. |
| Filter pada `PanelBawah` | `text-xs` | 12px | Label, input pencarian, date filter, dan select mengikuti ukuran wrapper `PanelBawah`. |
| Tombol aksi dan tombol navigasi `PanelBawah` tampilan web | `text-xs` | 12px | `Simpan`, `Baru`, `Ganti`, `Hapus`, `Cetak`, `Kembali`, pagination, dan tombol tambahan tetap ringkas. Ikon tidak menggantikan ukuran teks. |
| Metadata sekunder `PanelBawah` | `text-[11px]` | 11px | Pakai hanya untuk label pendukung seperti `Record` jika pola komponen memang menetapkannya. |

Catatan: ukuran Tailwind `text-xs` adalah 12px pada konfigurasi standar proyek. Jangan memakai `text-sm`, `text-base`, atau ukuran arbitrer lain untuk data modul tanpa alasan aksesibilitas atau kebutuhan bisnis yang jelas.

## Cara menerapkan

1. Baca `src/app/registrasi/page.tsx` dan komponen bersama berikut sebelum mengubah halaman: `PanelInputData.tsx`, `PanelBawah.tsx`, `CustomSelect.tsx`, serta `GridFormulirModul.tsx`.
2. Letakkan ukuran pada wrapper terdekat bila seluruh area memang satu skala. Contoh: fieldset formulir memakai `text-xs`, tabel memakai `text-[11px]`, dan footer `PanelBawah` memakai `text-xs`.
3. Gunakan kelas eksplisit hanya untuk pengecualian yang terdefinisi: helper `text-[10px]`, badge `text-[10px]`, atau metadata sekunder `text-[11px]`.
4. Jangan menaikkan ukuran teks untuk mengatasi layout yang sempit. Perbaiki lebar kolom, wrapping, padding, atau struktur responsif terlebih dahulu.
5. Jangan mengubah ukuran font pada state terpilih, hover, loading, atau empty state. State hanya boleh mengubah warna atau latar sesuai aturan UI.
6. Pertahankan bobot teks sesuai perannya: data biasa normal/medium, label field normal, tombol dan tab semibold, judul panel bold. Bobot tidak boleh dipakai untuk mengompensasi ukuran yang tidak konsisten.

## Pemetaan cepat saat review

Cari pola berikut pada halaman yang direview:

- Formulir/panel input: `text-xs` atau diwariskan dari wrapper `text-xs`.
- Tabel: satu deklarasi `text-[11px]` pada `<table>`; jangan mencampur `text-xs` pada sel data biasa.
- Badge/status: `text-[10px]` hanya pada elemen badge.
- Filter dan tombol web: `text-xs`, biasanya diwariskan dari `PanelBawah`.
- Ukuran lain (`text-sm`, `text-base`, `text-[12px]`, atau inline style font-size): anggap sebagai penyimpangan dan evaluasi apakah benar-benar diperlukan.

Sebelum selesai, bandingkan halaman pada desktop dan mobile dengan registrasi. Pastikan teks tetap terbaca, tidak ada ukuran berbeda untuk komponen yang setara, dan `git diff --check` lulus. Jika ukuran sengaja berbeda, dokumentasikan alasan singkat di komentar atau catatan perubahan yang relevan.

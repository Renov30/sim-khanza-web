---
name: khanza-web-ui
description: Membuat atau mengubah UI modul Khanza Web agar konsisten dengan pola halaman, panel, tab, tabel, formulir, dan aksi yang sudah dipakai proyek. Gunakan untuk seluruh pekerjaan frontend atau review konsistensi UI di repository ini.
---

# Konsistensi UI Khanza Web

Gunakan `AGENTS.md` sebagai otoritas utama. Skill ini menerjemahkan aturan UI proyek menjadi keputusan implementasi yang berulang dan dapat diperiksa.

## Pilih referensi sebelum mengubah UI

Tentukan pola halaman yang paling dekat, lalu inspeksi kode aktualnya sebelum menulis markup:

- Halaman transaksi padat: `src/app/farmasi/resep-obat/page.tsx`.
- Pola tab Input/Data: `src/app/pasien/page.tsx`.
- Pola tabel daftar: `src/app/farmasi/copy-resep/page.tsx`; untuk state kosong tanpa garis sel, lihat `src/app/resume-pasien/page.tsx`.
- Halaman klinis bertab dan panel aksi bersama: `src/app/tindakan-rawat-jalan/page.tsx` beserta komponen tabnya.
- Panel aksi, filter, pagination, dan tombol kembali: `src/components/modul/PanelBawah.tsx`.
- Form desktop: `src/components/modul/GridFormulirModul.tsx`.
- Select: `src/components/ui/CustomSelect.tsx`.
- Notifikasi dan konfirmasi: `Toast.tsx` serta `KonfirmasiDialog.tsx`.

Gunakan referensi Java Khanza hanya untuk alur kerja, isi, urutan field, dan aturan bisnis. Adaptasikan tampilannya ke sistem desain web proyek; jangan menyalin warna, border hitam, ikon, atau kepadatan desktop Java secara literal.

## Kerangka halaman

Gunakan halaman penuh untuk aktivitas utama. Modal hanya untuk pemilih singkat, konfirmasi, atau interaksi sementara yang harus kembali ke konteks asal.

Pola halaman penuh:

```tsx
<div className="module-page flex h-full w-full flex-col space-y-2.5 overflow-hidden bg-slate-50 p-2 sm:p-3">
  <section className="shrink-0 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm">
    {/* identitas atau formulir ringkas */}
  </section>
  <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm">
    {/* tab dan konten/tabel */}
  </section>
  <PanelBawah tampilan="web" />
</div>
```

- Jangan menampilkan judul modul kedua di dalam konten; judul hanya berada di navbar global.
- Jangan memakai dekorasi judul seperti `::[ Judul ]::`.
- Identitas pasien atau transaksi berada di panel pertama, bukan banner atau modal.
- Jika Input dan Data sama-sama besar, gunakan dua tab. Tab Input menjadi tempat form dan aksi mutasi; tab Data menjadi tempat tabel dan filter daftar.

## Tabel

Ikuti pola tabel pada halaman Copy Resep:

- Panel tabel memakai `flex min-h-0 flex-1 flex-col overflow-hidden`; pembungkus scroll di dalamnya memakai `min-h-0 flex-1 overflow-auto` dan `aria-busy` saat memuat.
- Tabel memakai `border-collapse`, `text-[11px]`, dan lebar minimum yang mencegah kolom kritis terjepit.
- Header sticky memakai `sticky top-0 z-10 bg-slate-100 text-slate-700`.
- Header: `border-b border-slate-200 px-2 py-2 text-center` dan `scope="col"`.
- Jangan gunakan border vertikal maupun grid border pada tabel modul. Gunakan pola minimal seperti `src/app/rawat-inap/page.tsx`: header cukup memiliki `border-b border-slate-200`; pisahkan baris data dengan `divide-y divide-slate-100`, dan gunakan padding `px-2 py-1.5` pada sel.
- Baris data biasa berlatar putih dan memakai `hover:bg-slate-50/80`; jangan gunakan zebra striping. Pilihan memakai `bg-primary-100` tanpa mengubah font atau ukuran kolom. Bila satu entri terdiri dari beberapa baris atau sel turunan, terapkan `bg-primary-100` yang sama pada seluruh bagian entri; jangan beri sel tertentu warna pilihan yang lebih gelap atau lebih terang.
- Sel loading dan kosong memakai `colSpan`, `h-36` atau `h-44`, rata tengah, dan tidak memiliki border (`border-0`) agar garis tidak muncul di tengah area kosong.
- Teks data tetap netral. Gunakan monospace/tabular hanya untuk kode, nomor, tanggal, jam, jumlah, dan nilai uang.
- Sediakan `caption` yang aksesibel. Empty/loading state berada dalam tabel dengan `colSpan` yang benar, rata tengah, dan tinggi konsisten (`h-44` untuk empty, `h-36` saat memuat).
- Jangan membuat variasi warna tabel khusus per halaman kecuali menunjukkan status yang nyata.

## Tab, form, dan panel bawah

- Tab Input/Data mengikuti `src/app/pasien/page.tsx`: pembungkus `flex shrink-0 border-b border-slate-200`, tombol `px-4 py-2 text-xs font-semibold border-b-2`, tab aktif `bg-white border-primary-700 text-slate-900`, dan tab tidak aktif `border-transparent text-slate-500 hover:bg-slate-100`.
- Tab wajib memiliki semantik ARIA dan navigasi keyboard panah, Home, serta End bila memiliki lebih dari dua pilihan.
- Field standar setinggi `h-7`, teks `text-xs`, border `border-slate-300`, dan fokus `border-primary-600`.
- Gunakan `rounded-md`; jangan mencampur radius tanpa alasan.
- Label desktop disejajarkan konsisten; mobile kembali satu kolom.
- Gunakan `PanelBawah`, bukan footer aksi buatan sendiri. Filter hanya tampil pada tab yang memakainya; aksi mutasi hanya tampil pada tab Input.
- Tombol Baru mereset semua state form, default, pilihan tabel, dan parameter mode yang relevan.
- Tombol kembali berada di panel bawah dan memakai riwayat browser dengan fallback `/`.

## Pemilih dalam modal

- Daftar pilihan dalam modal mengikuti `src/components/pasien/PatientMasterSelect.tsx`, termasuk pada pemilih riwayat atau master data lain.
- Setiap pilihan harus berupa kontrol yang dapat difokuskan dan memakai `hover:bg-slate-100 focus:bg-slate-100 focus:outline-none`; untuk pilihan berbentuk baris tabel, pakai `hover:bg-slate-100 focus-within:bg-slate-100` pada `<tr>`.
- Jangan memakai transisi pada hover atau fokus. Pertahankan padding, teks `text-xs text-slate-700`, serta state kosong/memuat yang ringkas.

## Warna dan perilaku

- Gunakan token `primary`, `secondary`, dan `tertiary`; jangan menambahkan warna merek hard-coded.
- Status positif, informasi, bahaya, dan tertunda mengikuti aturan warna `AGENTS.md`.
- Jangan menambahkan animasi, transisi warna/opacity/layout, gradient, atau dekorasi yang tidak dipakai halaman referensi.
- Pertahankan API, otorisasi, validasi, dan aturan bisnis saat merapikan UI. Perubahan visual tidak boleh diam-diam mengubah query atau mutasi.

## Pemeriksaan sebelum selesai

Bandingkan hasil dengan halaman referensi pada ukuran desktop dan mobile. Pastikan:

- tidak ada judul internal ganda;
- panel dan spacing mengikuti pola modul;
- tabel, tab, loading, empty state, dan selection konsisten;
- seluruh kontrol memiliki label aksesibel;
- tidak ada overflow yang menutup panel bawah;
- `eslint`, TypeScript, tes relevan, dan `git diff --check` lulus.

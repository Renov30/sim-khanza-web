---
name: khanza-web-ui
description: Membuat atau mengubah UI modul Khanza Web agar konsisten dengan pola halaman, panel, tab, tabel, formulir, dan aksi yang sudah dipakai proyek. Gunakan untuk seluruh pekerjaan frontend atau review konsistensi UI di repository ini.
---

# Konsistensi UI Khanza Web

Gunakan `AGENTS.md` sebagai otoritas utama. Skill ini menerjemahkan aturan UI proyek menjadi keputusan implementasi yang berulang dan dapat diperiksa.

## Pilih referensi sebelum mengubah UI

Tentukan pola halaman yang paling dekat, lalu inspeksi kode aktualnya sebelum menulis markup:

- Halaman transaksi padat dan tabel obat: `src/app/farmasi/resep-obat/page.tsx`.
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

Ikuti tabel pada halaman Input Resep:

- Pembungkus konten memakai `min-h-0 flex-1 overflow-auto`.
- Tabel memakai `border-collapse`, `text-[11px]`, dan lebar minimum yang mencegah kolom kritis terjepit.
- Header sticky memakai `sticky top-0 z-10 bg-slate-100 text-slate-700`.
- Header: `border-b border-r border-slate-200 px-2 py-2` dan `scope="col"`.
- Sel: `border-b border-r border-slate-100 px-2 py-1.5`.
- Baris biasa dapat memakai `even:bg-slate-50/70`; pilihan memakai `bg-primary-50/60` tanpa mengubah font atau ukuran kolom.
- Teks data tetap netral. Gunakan monospace/tabular hanya untuk kode, nomor, tanggal, jam, jumlah, dan nilai uang.
- Sediakan `caption` yang aksesibel. Empty/loading state berada dalam tabel dengan `colSpan` yang benar.
- Jangan membuat variasi warna tabel khusus per halaman kecuali menunjukkan status yang nyata.

## Tab, form, dan panel bawah

- Tab aktif: `border-primary-600 text-primary-700`; tab tidak aktif: `border-transparent text-slate-600`.
- Tab wajib memiliki semantik ARIA dan navigasi keyboard panah, Home, serta End bila memiliki lebih dari dua pilihan.
- Field standar setinggi `h-7`, teks `text-xs`, border `border-slate-300`, dan fokus `border-primary-600`.
- Gunakan `rounded-md`; jangan mencampur radius tanpa alasan.
- Label desktop disejajarkan konsisten; mobile kembali satu kolom.
- Gunakan `PanelBawah`, bukan footer aksi buatan sendiri. Filter hanya tampil pada tab yang memakainya; aksi mutasi hanya tampil pada tab Input.
- Tombol Baru mereset semua state form, default, pilihan tabel, dan parameter mode yang relevan.
- Tombol kembali berada di panel bawah dan memakai riwayat browser dengan fallback `/`.

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

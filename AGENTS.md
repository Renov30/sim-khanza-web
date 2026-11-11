<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Pedoman proyek dan referensi Khanza

- Baca dan ikuti `rules/RULES.md` sebelum mengembangkan atau mengubah aplikasi.
- Referensi aplikasi asli berada di `../simitra-keluarga-merauke/` (relatif terhadap root `khanza-web`), terutama direktori `src/`.
- Gunakan kode Java sebagai acuan alur kerja, aturan bisnis, relasi tabel, dan kompatibilitas Khanza; **jangan menyalin pola implementasi yang tidak mengikuti praktik baik**.
- Saat mengadaptasi suatu bagian, evaluasi dan perbaiki keamanan, validasi di server, integritas transaksi, penanganan konkurensi, struktur kode, tipe data, penanganan error, performa, dan aksesibilitas sesuai kebutuhan bagian tersebut. Gunakan solusi sederhana dan proporsional; hindari abstraksi berlebihan.
- Pertahankan aturan bisnis yang valid dan kompatibilitas dengan aplikasi desktop/database bersama. Bedakan perbaikan teknis dari perubahan aturan bisnis; jika maksud aturan bisnis belum jelas, telusuri referensi terkait dan klarifikasi sebelum mengubah perilakunya.
- Catat perubahan perilaku yang disengaja, alasan perbaikan, dan verifikasi yang relevan dalam penjelasan perubahan. Folder referensi tidak diubah kecuali diminta pengguna.

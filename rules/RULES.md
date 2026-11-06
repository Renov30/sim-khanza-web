# STANDAR PENGEMBANGAN SIMRS KHANZA WEB (AGENTS GUIDELINES)

Dokumen ini adalah pedoman wajib bagi AI Agent maupun developer yang berkontribusi dalam pembuatan dan pengembangan aplikasi **SIMRS Khanza versi Web**. Semua kode, tata letak antarmuka, dan arsitektur harus mengikuti panduan ini agar seluruh modul seragam (*consistent*), bersih (*clean architecture*), aman, dan mudah dipelihara (*high readability*).

---

## 1. Arsitektur & Tech Stack

- **Framework**: Next.js 14+ / 16 (App Router)
- **Bahasa**: TypeScript (Strict mode, hindari `any`)
- **Styling**: Tailwind CSS (Utility-first, responsive, clean)
- **Icons**: Font Awesome (`@fortawesome/react-fontawesome` & `@fortawesome/free-solid-svg-icons`)
- **Database Engine**: MariaDB 10.x / MySQL 8.x (Database standar Khanza: `sik_mitra` / `sik`)
- **Database Driver**: `mysql2/promise` dengan Connection Pool
- **Komunikasi Data**: Seluruh interaksi database **WAJIB** melalui Next.js API Routes (`/api/...`). Tidak boleh melakukan koneksi database langsung dari Client Component.

---

## 2. Pedoman Desain Antarmuka (UI/UX)

Mengikuti instruksi spesifik:
> *"Jangan gunakan banyak gradient dan jangan menggunakan icon/logo yang berlebihan"*

1. **Palet Warna Healthcare Modern**:
   - Background utama: `bg-slate-50` / `bg-white` (bersih, nyaman di mata).
   - Card/Panel: `bg-white border border-slate-200/80 rounded-lg shadow-sm`.
   - Warna Utama (*Primary*): Hijau medis/emerald (`emerald-700` / `emerald-600` / `teal-700`), sebagai representasi khas Khanza namun lebih modern.
   - Warna Netral: Slate (`slate-900` teks utama, `slate-600` teks sekunder, `slate-400` border/placeholder).
   - Warna Status: Red-600 (Bahaya/Batal), Amber-600 (Peringatan/Pending), Blue-600 (Info), Emerald-600 (Sukses).
2. **Larangan**:
   - **TIDAK BOLEH** menggunakan gradient warna mencolok / multi-color rainbow gradient.
   - **TIDAK BOLEH** menggunakan icon 3D/dekoratif berlebihan atau icon bitmap pixelated lama.
   - **TIDAK BOLEH** menggunakan animasi atau transisi lambat yang menghambat kecepatan kerja petugas medis.
   - **TIDAK BOLEH MENGGUNAKAN TEKS BERWARNA**: Jangan gunakan warna teks (seperti teks hijau/emerald, biru, merah, dll.) untuk teks data biasa seperti No. Rawat, No. RM, nama pasien, dll. Seluruh teks data harus menggunakan warna teks netral (`text-slate-800` / `text-slate-700` / `text-slate-600`), **KECUALI** jika pengguna secara eksplisit meminta warna khusus atau berupa badge status (seperti status bayar/status rawat).
3. **Kepadatan Informasi (*Information Density*)**:
   - Sistem rumah sakit memerlukan efisiensi ruang: gunakan padding kompak (`py-1.5 px-3`, `text-xs` hingga `text-sm`, font tabular untuk angka dan tanggal).
4. **Standar Komponen Form & Dropdown / Combo Box**:
   - **WAJIB**: Jangan pernah menggunakan tanda panah dropdown default bawaan browser yang mepet ke tepi.
   - Semua elemen dropdown/select harus menggunakan `appearance-none` dengan ikon Font Awesome `faChevronDown` yang memiliki jarak tepi proporsional (menggunakan padding kanan `pr-9` pada select dan posisi ikon `pr-3`).
   - Gunakan komponen reusable [`CustomSelect`](src/components/ui/CustomSelect.tsx) di seluruh formulir, filter, dan tabel modul.
5. **Standar Perilaku Panel Input Data (`PanelInputData` / `ChkInput`)**:
   - **Default State**: Secara default formulir panel input berada dalam kondisi **TERTUTUP** (`terbuka = false`).
   - **Persistensi State**: Jika pengguna membuka panel input pada suatu modul kemudian berpindah halaman lalu kembali lagi ke modul tersebut, panel input **WAJIB TETAP TERBUKA** (menggunakan persistensi `localStorage` berdasarkan rute halaman / `idPenyimpanan`).
   - Gunakan komponen standar [`PanelInputData`](src/components/modul/PanelInputData.tsx) di semua modul yang memiliki inputan form di bagian atas tabel.
6. **Standar Aksi Tombol Baru / Method `emptTeks`**:
   - **WAJIB**: Tombol **Baru** (`BtnBatal` / `emptTeks`) tidak hanya mengosongkan *field text input*, tetapi **WAJIB mereset seluruh pilihan dropdown / combo box** kembali ke nilai default awal (misal: dokter pertama/default, poli pertama, jenis bayar default, status 'Belum Bayar', JK default, agama default, dll.) dan membatalkan seleksi baris tabel (`setTerpilih(null)`).
7. **Standar Notifikasi Feedback (Toast Floating)**:
   - **DILARANG KERAS** menggunakan banner alert statis di atas panel input atau atas tabel yang mendorong/menggeser tata letak (*layout shift*).
   - **WAJIB** menggunakan komponen notifikasi mengambang [`Toast`](src/components/common/Toast.tsx) di pojok kanan bawah layar (`bottom-5 right-5`) dengan auto-dismiss (3 detik), tombol tutup manual, dan ikon status yang sesuai (`tipe: "sukses" | "error" | "info"`).
8. **Standar Dialog Konfirmasi (Custom Modal Dialog)**:
   - **DILARANG KERAS** menggunakan `window.confirm()` atau `alert()` bawaan browser untuk konfirmasi hapus data atau aksi penting lainnya.
   - **WAJIB** menggunakan komponen modal dialog custom [`KonfirmasiDialog`](src/components/common/KonfirmasiDialog.tsx) yang konsisten: memiliki latar belakang semi-transparan dengan efek *backdrop-blur*, judul tegas, pesan konfirmasi yang menyebutkan data spesifik (contoh: No. Rawat / No. RM dan Nama Pasien), sub-pesan peringatan risiko, tombol aksi bahaya merah tegas (*danger*), serta penanganan tombol Escape.

---

## 3. Keseragaman Struktur Halaman (Uniform Page Pattern)

Setiap halaman modul baru (contoh: Registrasi Pasien, Rawat Jalan, Apotek, Kasir) **WAJIB** mengikuti struktur 4-bagian seragam:

```tsx
// CONTOH TEMPLATE RESMI HALAMAN MODUL
export default function ModulePage() {
  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      {/* 1. HEADER HALAMAN: Judul, Deskripsi, Tombol Aksi Utama */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <IconComponent className="w-5 h-5 text-emerald-700" />
            Nama Modul
          </h1>
          <p className="text-xs text-slate-500">Deskripsi singkat fungsi modul</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tombol aksi seperti Refresh, Tambah Baru, Export */}
        </div>
      </div>

      {/* 2. FILTER & PENCARIAN CEPAT */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center">
        {/* Input pencarian seragam, filter tanggal, combo dropdown */}
      </div>

      {/* 3. KONTEN UTAMA (Tabel Data / Form) */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Table data dengan header abu-abu slate-100 dan baris bergaris tipis */}
      </div>

      {/* 4. FOOTER / STATUS & PAGINATION */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
        {/* Info total data, pagination, status ringkasan */}
      </div>
    </div>
  );
}
```

---

## 4. Keamanan & Database Standar Khanza

1. **Enkripsi AES SIMRS Khanza**:
   - User Admin (`admin` table):
     - `usere = AES_ENCRYPT(?, 'nur')`
     - `passworde = AES_ENCRYPT(?, 'windi')`
   - User Pegawai (`user` table):
     - `id_user = AES_ENCRYPT(?, 'nur')`
     - `password = AES_ENCRYPT(?, 'windi')`
   - Kunci enkripsi default `'nur'` dan `'windi'` dibaca dari konfigurasi environment (`process.env.KHANZA_AES_USER_KEY` dan `process.env.KHANZA_AES_PASS_KEY`).
2. **Prepared Statements**:
   - Selalu gunakan parameterized queries (`conn.execute(sql, [params])`). **Dilarang keras menyambung string query SQL manual.**
3. **Standar Respons API**:
   Setiap endpoint API harus mengembalikan format JSON seragam:
   ```ts
   // Sukses
   {
     success: true,
     data: any,
     message?: string
   }

   // Gagal
   {
     success: false,
     error: string,
     code?: string
   }
   ```

---

## 5. Struktur Folder Proyek

```
khanza-web/
├── rules/
│   └── RULES.md                  <-- Pedoman wajib ini
├── src/
│   ├── app/                      <-- App Router Next.js
│   │   ├── api/                  <-- API Routes (Auth, System, Menu, dll)
│   │   ├── layout.tsx            <-- Root Layout
│   │   ├── page.tsx              <-- Halaman Utama (frmUtama)
│   │   └── globals.css           <-- Tailwind config & theme
│   ├── components/
│   │   ├── layout/               <-- AppHeader, UserAccountMenu
│   │   ├── menu/                 <-- MainMenuGrid, CategorySelector, MenuCard
│   │   ├── auth/                 <-- LoginModal, AuthProvider
│   │   └── ui/                   <-- Tombol, Input, Modal, Badge seragam
│   └── lib/
│       ├── db.ts                 <-- MySQL pool & query executor
│       ├── auth.ts               <-- Verifikasi login AES Khanza & session token
│       ├── constants/
│       │   └── menus.ts          <-- Daftar menu A s/d T dari frmUtama
│       └── types/
│           ├── auth.ts           <-- Tipe User, Session, Permissions
│           └── menu.ts           <-- Tipe Menu Item & Kategori
```

---

## 6. Prinsip Tambahan untuk AI Agent

- Saat membuat modul atau halaman baru, **selalu verifikasi referensi asli di `simitra-keluarga-merauke/src/`** untuk memahami alur data dan tabel database yang bersangkutan, namun **tulis ulang menggunakan Clean Architecture di Next.js**.
- Jangan pernah mengulang kode duplikat (*DRY Principle*).
- Utamakan performa tinggi dan aksesibilitas untuk petugas medis di rumah sakit/klinik.


import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_PERPUSTAKAAN: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-ruang-perpustakaan",
    "slug": "ruang-perpustakaan",
    "judul": "Ruang Perpustakaan",
    "kategori": "Q",
    "permissionKey": "ruang_perpustakaan",
    "javaRef": "PerpustakaanRuang",
    "tabel": "perpustakaan_ruang",
    "kolom": [
      {
        "nama": "kd_ruang",
        "label": "Kd Ruang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_ruang",
        "label": "Nm Ruang",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kd_ruang",
      "nm_ruang"
    ],
    "kolomUrut": "kd_ruang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kategori-perpustakaan",
    "slug": "kategori-perpustakaan",
    "judul": "Kategori Koleksi",
    "kategori": "Q",
    "permissionKey": "kategori_perpustakaan",
    "javaRef": "PerpustakaanKategori",
    "tabel": "perpustakaan_kategori",
    "kolom": [
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_kategori",
        "label": "Nama Kategori",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_kategori",
      "nama_kategori"
    ],
    "kolomUrut": "id_kategori",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-jenis-perpustakaan",
    "slug": "jenis-perpustakaan",
    "judul": "Jenis Koleksi",
    "kategori": "Q",
    "permissionKey": "jenis_perpustakaan",
    "javaRef": "PerpustakaanJenis",
    "tabel": "perpustakaan_jenis_buku",
    "kolom": [
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_jenis",
        "label": "Nama Jenis",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_jenis",
      "nama_jenis"
    ],
    "kolomUrut": "id_jenis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengarang-perpustakaan",
    "slug": "pengarang-perpustakaan",
    "judul": "Pengarang/Penulis",
    "kategori": "Q",
    "permissionKey": "pengarang_perpustakaan",
    "javaRef": "PerpustakaanPengarang",
    "tabel": "perpustakaan_pengarang",
    "kolom": [
      {
        "nama": "kode_pengarang",
        "label": "Kode Pengarang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "nama_pengarang",
        "label": "Nama Pengarang",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode_pengarang",
      "nama_pengarang"
    ],
    "kolomUrut": "kode_pengarang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penerbit-perpustakaan",
    "slug": "penerbit-perpustakaan",
    "judul": "Penerbit Koleksi",
    "kategori": "Q",
    "permissionKey": "penerbit_perpustakaan",
    "javaRef": "PerpustakaanPenerbit",
    "tabel": "perpustakaan_penerbit",
    "kolom": [
      {
        "nama": "kode_penerbit",
        "label": "Kode Penerbit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama_penerbit",
        "label": "Nama Penerbit",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "alamat_penerbit",
        "label": "Alamat Penerbit",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "website_penerbit",
        "label": "Website Penerbit",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kode_penerbit",
      "nama_penerbit",
      "alamat_penerbit",
      "no_telp",
      "email",
      "website_penerbit"
    ],
    "kolomUrut": "kode_penerbit",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-koleksi-perpustakaan",
    "slug": "koleksi-perpustakaan",
    "judul": "Koleksi Perpustakaan",
    "kategori": "Q",
    "permissionKey": "koleksi_perpustakaan",
    "javaRef": "PerpustakaanKoleksi",
    "tabel": "perpustakaan_buku",
    "kolom": [
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "judul_buku",
        "label": "Judul Buku",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jml_halaman",
        "label": "Jml Halaman",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_penerbit",
        "label": "Kode Penerbit",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kode_pengarang",
        "label": "Kode Pengarang",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "thn_terbit",
        "label": "Thn Terbit",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "isbn",
        "label": "Isbn",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kode_buku",
      "judul_buku",
      "jml_halaman",
      "kode_penerbit",
      "kode_pengarang",
      "thn_terbit"
    ],
    "kolomUrut": "kode_buku",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-inventaris-perpustakaan",
    "slug": "inventaris-perpustakaan",
    "judul": "Inventaris Perpustakaan",
    "kategori": "Q",
    "permissionKey": "inventaris_perpustakaan",
    "javaRef": "PerpustakaanInventaris",
    "tabel": "perpustakaan_inventaris",
    "kolom": [
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "asal_buku",
        "label": "Asal Buku",
        "tipe": "enum",
        "opsi": [
          "Beli",
          "Bantuan",
          "Hibah",
          "-"
        ]
      },
      {
        "nama": "tgl_pengadaan",
        "label": "Tgl Pengadaan",
        "tipe": "date"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "tipe": "uang"
      },
      {
        "nama": "status_buku",
        "label": "Status Buku",
        "tipe": "enum",
        "opsi": [
          "Ada",
          "Rusak",
          "Hilang",
          "Dipinjam",
          "-"
        ]
      },
      {
        "nama": "kd_ruang",
        "label": "Kd Ruang",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_rak",
        "label": "No Rak",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "no_box",
        "label": "No Box",
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomTanggal": "tgl_pengadaan",
    "kolomCari": [
      "no_inventaris",
      "kode_buku",
      "kd_ruang",
      "no_rak",
      "no_box"
    ],
    "kolomUrut": "tgl_pengadaan",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengaturan-peminjaman-perpustakaan",
    "slug": "pengaturan-peminjaman-perpustakaan",
    "judul": "Pengaturan Peminjaman",
    "kategori": "Q",
    "permissionKey": "set_peminjaman_perpustakaan",
    "javaRef": "PerpustakaanPengaturanPeminjaman",
    "tabel": "perpustakaan_set_peminjaman",
    "kolom": [
      {
        "nama": "max_pinjam",
        "label": "Max Pinjam",
        "tipe": "number"
      },
      {
        "nama": "lama_pinjam",
        "label": "Lama Pinjam",
        "tipe": "number"
      },
      {
        "nama": "denda_perhari",
        "label": "Denda Perhari",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "max_pinjam",
      "lama_pinjam",
      "denda_perhari"
    ],
    "kolomUrut": "max_pinjam",
    "kolomRingkasan": {
      "nama": "denda_perhari",
      "label": "Total Denda Perhari"
    },
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-denda-perpustakaan",
    "slug": "denda-perpustakaan",
    "judul": "Denda Perpustakaan",
    "kategori": "Q",
    "permissionKey": "denda_perpustakaan",
    "javaRef": "PerpustakaanDenda",
    "tabel": "perpustakaan_denda",
    "kolom": [
      {
        "nama": "kode_denda",
        "label": "Kode Denda",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jenis_denda",
        "label": "Jenis Denda",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "besar_denda",
        "label": "Besar Denda",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kode_denda",
      "jenis_denda"
    ],
    "kolomUrut": "kode_denda",
    "kolomRingkasan": {
      "nama": "besar_denda",
      "label": "Total Besar Denda"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-anggota-perpustakaan",
    "slug": "anggota-perpustakaan",
    "judul": "Anggota Perpustakaan",
    "kategori": "Q",
    "permissionKey": "anggota_perpustakaan",
    "javaRef": "PerpustakaanAnggota",
    "tabel": "perpustakaan_anggota",
    "kolom": [
      {
        "nama": "no_anggota",
        "label": "No Anggota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama_anggota",
        "label": "Nama Anggota",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tmp_lahir",
        "label": "Tmp Lahir",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "tipe": "date"
      },
      {
        "nama": "j_kel",
        "label": "J Kel",
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tgl_gabung",
        "label": "Tgl Gabung",
        "tipe": "date"
      },
      {
        "nama": "masa_berlaku",
        "label": "Masa Berlaku",
        "tipe": "date"
      },
      {
        "nama": "jenis_anggota",
        "label": "Jenis Anggota",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Pasien",
          "Pegawai",
          "Umum"
        ]
      },
      {
        "nama": "nomer_id",
        "label": "Nomer Id",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_anggota",
      "nama_anggota",
      "tmp_lahir",
      "alamat",
      "no_telp",
      "email"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-peminjaman-perpustakaan",
    "slug": "peminjaman-perpustakaan",
    "judul": "Peminjaman Koleksi Perpustakaan",
    "kategori": "Q",
    "permissionKey": "peminjaman_perpustakaan",
    "javaRef": "PerpustakaanSirkulasi",
    "tabel": "perpustakaan_peminjaman",
    "kolom": [
      {
        "nama": "no_anggota",
        "label": "No. Anggota",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "no_inventaris",
        "label": "No. Inventaris",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pinjam",
        "label": "Tgl. Pinjam",
        "tipe": "date"
      },
      {
        "nama": "tgl_kembali",
        "label": "Tgl. Kembali",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "status_pinjam",
        "label": "Status Pinjam",
        "tipe": "enum",
        "opsi": [
          "masih dipinjam",
          "sudah kembali"
        ]
      }
    ],
    "kolomTanggal": "tgl_pinjam",
    "kolomCari": [
      "no_anggota",
      "no_inventaris",
      "nip",
      "status_pinjam"
    ],
    "kolomUrut": "tgl_pinjam",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bayar-denda-perpustakaan",
    "slug": "bayar-denda-perpustakaan",
    "judul": "Bayar Denda Perpustakaan",
    "kategori": "Q",
    "permissionKey": "bayar_denda_perpustakaan",
    "javaRef": "PerpustakaanBayarDenda",
    "tabel": "perpustakaan_bayar_denda_harian",
    "kolom": [
      {
        "nama": "tgl_denda",
        "label": "Tgl Denda",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "no_anggota",
        "label": "No Anggota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterlambatan",
        "label": "Keterlambatan",
        "tipe": "number"
      },
      {
        "nama": "besar_denda",
        "label": "Besar Denda",
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tgl_denda",
    "kolomCari": [
      "no_anggota",
      "no_inventaris"
    ],
    "kolomUrut": "tgl_denda",
    "kolomRingkasan": {
      "nama": "besar_denda",
      "label": "Total Besar Denda"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ebook-perpustakaan",
    "slug": "ebook-perpustakaan",
    "judul": "Data Koleksi Ebook",
    "kategori": "Q",
    "permissionKey": "ebook_perpustakaan",
    "javaRef": "PerpustakaanEbook",
    "tabel": "perpustakaan_buku",
    "kolom": [
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "judul_buku",
        "label": "Judul Buku",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jml_halaman",
        "label": "Jml Halaman",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_penerbit",
        "label": "Kode Penerbit",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kode_pengarang",
        "label": "Kode Pengarang",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "thn_terbit",
        "label": "Thn Terbit",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "isbn",
        "label": "Isbn",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kode_buku",
      "judul_buku",
      "jml_halaman",
      "kode_penerbit",
      "kode_pengarang",
      "thn_terbit"
    ],
    "kolomUrut": "kode_buku",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penelitian-perpustakaan",
    "slug": "penelitian-perpustakaan",
    "judul": "Koleksi Penelitian",
    "kategori": "Q",
    "permissionKey": "admin",
    "javaRef": "PerpustakaanPenelitian",
    "tabel": "perpustakaan_buku",
    "kolom": [
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "judul_buku",
        "label": "Judul Buku",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jml_halaman",
        "label": "Jml Halaman",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_penerbit",
        "label": "Kode Penerbit",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kode_pengarang",
        "label": "Kode Pengarang",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "thn_terbit",
        "label": "Thn Terbit",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "isbn",
        "label": "Isbn",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kode_buku",
      "judul_buku",
      "jml_halaman",
      "kode_penerbit",
      "kode_pengarang",
      "thn_terbit"
    ],
    "kolomUrut": "kode_buku",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cari-ebook",
    "slug": "cari-ebook",
    "judul": "Cari Koleksi Ebook",
    "kategori": "Q",
    "permissionKey": "admin",
    "javaRef": "PerpustakaanCariEbook",
    "tabel": "perpustakaan_buku",
    "kolom": [
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "judul_buku",
        "label": "Judul Buku",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jml_halaman",
        "label": "Jml Halaman",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_penerbit",
        "label": "Kode Penerbit",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kode_pengarang",
        "label": "Kode Pengarang",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "thn_terbit",
        "label": "Thn Terbit",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "isbn",
        "label": "Isbn",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kode_buku",
      "judul_buku",
      "jml_halaman",
      "kode_penerbit",
      "kode_pengarang",
      "thn_terbit"
    ],
    "kolomUrut": "kode_buku",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cari-inventaris-perpustakaan",
    "slug": "cari-inventaris-perpustakaan",
    "judul": "Cari Inventaris Perpustakaan",
    "kategori": "Q",
    "permissionKey": "admin",
    "javaRef": "PerpustakaanCariInventaris",
    "tabel": "perpustakaan_inventaris",
    "kolom": [
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_buku",
        "label": "Kode Buku",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "asal_buku",
        "label": "Asal Buku",
        "tipe": "enum",
        "opsi": [
          "Beli",
          "Bantuan",
          "Hibah",
          "-"
        ]
      },
      {
        "nama": "tgl_pengadaan",
        "label": "Tgl Pengadaan",
        "tipe": "date"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "tipe": "uang"
      },
      {
        "nama": "status_buku",
        "label": "Status Buku",
        "tipe": "enum",
        "opsi": [
          "Ada",
          "Rusak",
          "Hilang",
          "Dipinjam",
          "-"
        ]
      },
      {
        "nama": "kd_ruang",
        "label": "Kd Ruang",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_rak",
        "label": "No Rak",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "no_box",
        "label": "No Box",
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomTanggal": "tgl_pengadaan",
    "kolomCari": [
      "no_inventaris",
      "kode_buku",
      "kd_ruang",
      "no_rak",
      "no_box"
    ],
    "kolomUrut": "tgl_pengadaan",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_PERPUSTAKAAN: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_PERPUSTAKAAN.map((item) => [item.slug, item]),
);

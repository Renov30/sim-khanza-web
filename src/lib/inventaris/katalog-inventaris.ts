import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_INVENTARIS: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-jenis-inventaris",
    "slug": "jenis-inventaris",
    "judul": "Jenis Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_jenis",
    "javaRef": "InventarisJenis",
    "tabel": "inventaris_jenis",
    "kolom": [
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
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
    "id": "btn-kategori-inventaris",
    "slug": "kategori-inventaris",
    "judul": "Kategori Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_kategori",
    "javaRef": "InventarisKategori",
    "tabel": "inventaris_kategori",
    "kolom": [
      {
        "nama": "id_kategori",
        "label": "Id Kategori",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
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
    "id": "btn-merk-inventaris",
    "slug": "merk-inventaris",
    "judul": "Merk Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_merk",
    "javaRef": "InventarisMerk",
    "tabel": "inventaris_merk",
    "kolom": [
      {
        "nama": "id_merk",
        "label": "Id Merk",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama_merk",
        "label": "Nama Merk",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_merk",
      "nama_merk"
    ],
    "kolomUrut": "id_merk",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ruang-inventaris",
    "slug": "ruang-inventaris",
    "judul": "Ruang Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_ruang",
    "javaRef": "InventarisRuang",
    "tabel": "inventaris_ruang",
    "kolom": [
      {
        "nama": "id_ruang",
        "label": "Id Ruang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_ruang",
        "label": "Nama Ruang",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_ruang",
      "nama_ruang"
    ],
    "kolomUrut": "id_ruang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-produsen-inventaris",
    "slug": "produsen-inventaris",
    "judul": "Produsen Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_produsen",
    "javaRef": "InventarisProdusen",
    "tabel": "inventaris_produsen",
    "kolom": [
      {
        "nama": "kode_produsen",
        "label": "Kode Produsen",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama_produsen",
        "label": "Nama Produsen",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "alamat_produsen",
        "label": "Alamat Produsen",
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
        "nama": "website_produsen",
        "label": "Website Produsen",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kode_produsen",
      "nama_produsen",
      "alamat_produsen",
      "no_telp",
      "email",
      "website_produsen"
    ],
    "kolomUrut": "kode_produsen",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-barang-inventaris",
    "slug": "barang-inventaris",
    "judul": "Koleksi Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_koleksi",
    "javaRef": "InventarisBarang",
    "tabel": "inventaris_barang",
    "kolom": [
      {
        "nama": "kode_barang",
        "label": "Kode Barang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nama_barang",
        "label": "Nama Barang",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "jml_barang",
        "label": "Jml Barang",
        "tipe": "number"
      },
      {
        "nama": "kode_produsen",
        "label": "Kode Produsen",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "id_merk",
        "label": "Id Merk",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "thn_produksi",
        "label": "Thn Produksi",
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
        "maks": 10
      },
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomCari": [
      "kode_barang",
      "nama_barang",
      "kode_produsen",
      "id_merk",
      "thn_produksi",
      "isbn"
    ],
    "kolomUrut": "kode_barang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-inventaris",
    "slug": "inventaris",
    "judul": "Data Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_inventaris",
    "javaRef": "InventarisKoleksi",
    "tabel": "inventaris",
    "kolom": [
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kode_barang",
        "label": "Kode Barang",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asal_barang",
        "label": "Asal Barang",
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
        "nama": "status_barang",
        "label": "Status Barang",
        "tipe": "enum",
        "opsi": [
          "Ada",
          "Rusak",
          "Hilang",
          "Perbaikan",
          "Dipinjam",
          "-"
        ]
      },
      {
        "nama": "id_ruang",
        "label": "Id Ruang",
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
      "kode_barang",
      "id_ruang",
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
    "id": "btn-sirkulasi-inventaris",
    "slug": "sirkulasi-inventaris",
    "judul": "Sirkulasi Inventaris",
    "kategori": "G",
    "permissionKey": "inventaris_sirkulasi",
    "javaRef": "InventarisSirkulasi",
    "tabel": "inventaris_peminjaman",
    "kolom": [
      {
        "nama": "peminjam",
        "label": "Peminjam",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_pinjam",
        "label": "Tgl Pinjam",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tlp",
        "label": "Tlp",
        "wajib": true,
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "tgl_kembali",
        "label": "Tgl Kembali",
        "tipe": "date"
      },
      {
        "nama": "status_pinjam",
        "label": "Status Pinjam",
        "tipe": "enum",
        "opsi": [
          "Masih Dipinjam",
          "Sudah Kembali"
        ]
      }
    ],
    "kolomTanggal": "tgl_pinjam",
    "kolomCari": [
      "peminjam",
      "no_inventaris",
      "nip",
      "tlp"
    ],
    "kolomUrut": "tgl_pinjam",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-permintaan-perbaikan-inventaris",
    "slug": "permintaan-perbaikan-inventaris",
    "judul": "Permintaan Perbaikan Inventaris",
    "kategori": "G",
    "permissionKey": "permintaan_perbaikan_inventaris",
    "javaRef": "InventarisPermintaanPerbaikan",
    "tabel": "permintaan_perbaikan_inventaris",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nik",
        "label": "Nik",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime"
      },
      {
        "nama": "deskripsi_kerusakan",
        "label": "Deskripsi Kerusakan",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "no_inventaris",
      "nik",
      "deskripsi_kerusakan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-perbaikan-inventaris",
    "slug": "perbaikan-inventaris",
    "judul": "Perbaikan Inventaris",
    "kategori": "G",
    "permissionKey": "perbaikan_inventaris",
    "javaRef": "InventarisPerbaikan",
    "tabel": "perbaikan_inventaris",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "uraian_kegiatan",
        "label": "Uraian Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pelaksana",
        "label": "Pelaksana",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Teknisi Rumah Sakit",
          "Teknisi Rujukan",
          "Pihak ke III"
        ]
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Bisa Diperbaiki",
          "Tidak Bisa Diperbaiki"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "uraian_kegiatan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemeliharaan-inventaris",
    "slug": "pemeliharaan-inventaris",
    "judul": "Pemeliharaan Inventaris",
    "kategori": "G",
    "permissionKey": "pemeliharaan_inventaris",
    "javaRef": "InventarisPemeliharaan",
    "tabel": "pemeliharaan_inventaris",
    "kolom": [
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "uraian_kegiatan",
        "label": "Uraian Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pelaksana",
        "label": "Pelaksana",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Teknisi Rumah Sakit",
          "Teknisi Rujukan",
          "Pihak ke III"
        ]
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jenis_pemeliharaan",
        "label": "Jenis Pemeliharaan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Running Maintenance",
          "Shut Down Maintenance",
          "Emergency Maintenance"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_inventaris",
      "uraian_kegiatan",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengajuan-aset-inventaris",
    "slug": "pengajuan-aset-inventaris",
    "judul": "Pengajuan Aset/Inventaris",
    "kategori": "G",
    "permissionKey": "pengajuan_asetinventaris",
    "javaRef": "PengajuanInventaris",
    "tabel": "pengajuan_inventaris",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No Pengajuan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "nik",
        "label": "Nik",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "urgensi",
        "label": "Urgensi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Cito",
          "Emergensi",
          "Biasa"
        ]
      },
      {
        "nama": "latar_belakang",
        "label": "Latar Belakang",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "nama_barang",
        "label": "Nama Barang",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "spesifikasi",
        "label": "Spesifikasi",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "nik_pj",
        "label": "Nik Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Proses Pengajuan",
          "Disetujui",
          "Ditolak"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "latar_belakang",
      "nama_barang",
      "spesifikasi",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekap-pengajuan-aset-departemen",
    "slug": "rekap-pengajuan-aset-departemen",
    "judul": "Rekap Pengajuan Aset Departemen",
    "kategori": "G",
    "permissionKey": "rekap_pengajuan_aset_departemen",
    "javaRef": "RekapPengajuanInventarisDepartemen",
    "tabel": "pengajuan_inventaris",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No Pengajuan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "nik",
        "label": "Nik",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "urgensi",
        "label": "Urgensi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Cito",
          "Emergensi",
          "Biasa"
        ]
      },
      {
        "nama": "latar_belakang",
        "label": "Latar Belakang",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "nama_barang",
        "label": "Nama Barang",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "spesifikasi",
        "label": "Spesifikasi",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "nik_pj",
        "label": "Nik Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Proses Pengajuan",
          "Disetujui",
          "Ditolak"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "latar_belakang",
      "nama_barang",
      "spesifikasi",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-suplier-inventaris",
    "slug": "suplier-inventaris",
    "judul": "Suplier Aset/Inventaris",
    "kategori": "G",
    "permissionKey": "suplier_inventaris",
    "javaRef": "InventarisSuplier",
    "tabel": "inventaris_suplier",
    "kolom": [
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_suplier",
        "label": "Nama Suplier",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kota",
        "label": "Kota",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "nama_bank",
        "label": "Nama Bank",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "rekening",
        "label": "Rekening",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kode_suplier",
      "nama_suplier",
      "alamat",
      "kota",
      "no_telp",
      "nama_bank"
    ],
    "kolomUrut": "kode_suplier",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengadaan-aset",
    "slug": "pengadaan-aset",
    "judul": "Pengadaan Aset/Inventaris",
    "kategori": "G",
    "permissionKey": "pengadaan_aset_inventaris",
    "javaRef": "InventarisPembelian",
    "tabel": "inventaris_pembelian",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tgl_beli",
        "label": "Tgl. Beli",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "subtotal",
        "label": "Subtotal",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek_aset",
        "label": "Kode Rek Aset",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_faktur",
      "kode_suplier",
      "nip",
      "kd_rek",
      "kd_rek_aset"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penerimaan-aset",
    "slug": "penerimaan-aset",
    "judul": "Penerimaan Aset/Inventaris",
    "kategori": "G",
    "permissionKey": "penerimaan_aset_inventaris",
    "javaRef": "InventarisPemesanan",
    "tabel": "inventaris_pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_order",
        "label": "No. Order",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pesan",
        "label": "Tgl. Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl. Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl. Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah dibayar",
          "belum dibayar",
          "belum lunas",
          "titip faktur"
        ]
      },
      {
        "nama": "kd_rek_aset",
        "label": "Kode Rek Aset",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "status",
      "kd_rek_aset"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hibah-aset-inventaris",
    "slug": "hibah-aset-inventaris",
    "judul": "Hibah Aset/Inventaris",
    "kategori": "G",
    "permissionKey": "hibah_aset_inventaris",
    "javaRef": "InventarisHibah",
    "tabel": "inventaris_hibah",
    "kolom": [
      {
        "nama": "no_hibah",
        "label": "No. Hibah",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_pemberi",
        "label": "Kode Pemberi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_hibah",
        "label": "Tgl. Hibah",
        "tipe": "date"
      },
      {
        "nama": "totalhibah",
        "label": "Totalhibah",
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_aset",
        "label": "Kode Rek Aset",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_hibah",
    "kolomCari": [
      "no_hibah",
      "kode_pemberi",
      "nip",
      "kd_rek_aset"
    ],
    "kolomUrut": "tgl_hibah",
    "kolomRingkasan": {
      "nama": "totalhibah",
      "label": "Total Totalhibah"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemeliharaan-gedung",
    "slug": "pemeliharaan-gedung",
    "judul": "Pemeliharaan Gedung",
    "kategori": "G",
    "permissionKey": "pemeliharaan_gedung",
    "javaRef": "InventarisPemeliharaanGedung",
    "tabel": "pemeliharaan_gedung",
    "kolom": [
      {
        "nama": "no_pemeliharaan",
        "label": "No Pemeliharaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "uraian_kegiatan",
        "label": "Uraian Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pelaksana",
        "label": "Pelaksana",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Teknisi Rumah Sakit",
          "Pihak ke III"
        ]
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jenis_pemeliharaan",
        "label": "Jenis Pemeliharaan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Running Maintenance",
          "Shut Down Maintenance",
          "Emergency Maintenance"
        ]
      },
      {
        "nama": "tindak_lanjut",
        "label": "Tindak Lanjut",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pemeliharaan",
      "uraian_kegiatan",
      "nip",
      "tindak_lanjut"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-barang-cssd",
    "slug": "barang-cssd",
    "judul": "Barang CSSD",
    "kategori": "G",
    "permissionKey": "barang_cssd",
    "javaRef": "InventarisBarangCSSD",
    "tabel": "cssd_barang",
    "kolom": [
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "jenis_barang",
        "label": "Jenis Barang",
        "tipe": "enum",
        "opsi": [
          "Heacting Set",
          "Partus Set",
          "Set Bedah",
          "Set Minor",
          "Set SC",
          "Set Kuret",
          "Set Hernia",
          "Set THT",
          "Set APP",
          "Set Histerektomi",
          "Set Tonsil",
          "Set Mata",
          "Set Pheco",
          "Set Bedah Mulut",
          "Set Othopedi Minor",
          "Set Bor Orthopedi",
          "Set Vaskuler",
          "Set Hemoroid",
          "Set Duk",
          "Set Instrumen Satuan",
          "Selang",
          "-"
        ]
      }
    ],
    "kolomCari": [
      "no_inventaris"
    ],
    "kolomUrut": "no_inventaris",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-sirkulasi-inventaris-cssd",
    "slug": "sirkulasi-inventaris-cssd",
    "judul": "Sirkulasi CSSD",
    "kategori": "G",
    "permissionKey": "sirkulasi_cssd",
    "javaRef": "InventarisSirkulasiCSSD",
    "tabel": "inventaris_ambil_cssd",
    "kolom": [
      {
        "nama": "no_sirkulasi",
        "label": "No Sirkulasi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan_ambil",
        "label": "Keterangan Ambil",
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "no_inventaris",
        "label": "No Inventaris",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_ambil",
        "label": "Tgl Ambil",
        "tipe": "datetime"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_ambil",
    "kolomCari": [
      "no_sirkulasi",
      "keterangan_ambil",
      "no_inventaris",
      "nip"
    ],
    "kolomUrut": "tgl_ambil",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pemakaian-air-pdam",
    "slug": "pemakaian-air-pdam",
    "judul": "Pemakaian Air PDAM",
    "kategori": "G",
    "permissionKey": "pemakaian_air_pdam",
    "javaRef": "KeslingPemakaiaanAirPDAM",
    "tabel": "kesling_pemakaian_air_pdam",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "meteran",
        "label": "Meteran",
        "tipe": "number"
      },
      {
        "nama": "jumlahharian",
        "label": "Jumlahharian",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "tanggal",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemakaian-air-tanah",
    "slug": "pemakaian-air-tanah",
    "judul": "Pemakaian Air Tanah",
    "kategori": "G",
    "permissionKey": "pemakaian_air_tanah",
    "javaRef": "KeslingPemakaiaanAirTanah",
    "tabel": "kesling_pemakaian_air_tanah",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "meteran",
        "label": "Meteran",
        "tipe": "number"
      },
      {
        "nama": "jumlahharian",
        "label": "Jumlahharian",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "tanggal",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-limbah-b3-medis",
    "slug": "limbah-b3-medis",
    "judul": "Limbah Padat B3 Medis",
    "kategori": "G",
    "permissionKey": "limbah_b3_medis",
    "javaRef": "KeslingLimbahB3Medis",
    "tabel": "kesling_limbah_b3medis",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "jmllimbah",
        "label": "Jmllimbah",
        "tipe": "number"
      },
      {
        "nama": "tujuan_penyerahan",
        "label": "Tujuan Penyerahan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "bukti_dokumen",
        "label": "Bukti Dokumen",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "sisa_di_tps",
        "label": "Sisa Di Tps",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "tujuan_penyerahan",
      "bukti_dokumen",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-limbah-b3-medis-cair",
    "slug": "limbah-b3-medis-cair",
    "judul": "Limbah Cair B3 Medis",
    "kategori": "G",
    "permissionKey": "kesling_limbah_b3medis_cair",
    "javaRef": "KeslingLimbahB3MedisCair",
    "tabel": "kesling_limbah_b3medis_cair",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "jmllimbah",
        "label": "Jmllimbah",
        "tipe": "number"
      },
      {
        "nama": "tujuan_penyerahan",
        "label": "Tujuan Penyerahan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "bukti_dokumen",
        "label": "Bukti Dokumen",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "sisa_di_tps",
        "label": "Sisa Di Tps",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "tujuan_penyerahan",
      "bukti_dokumen",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-limbah-domestik",
    "slug": "limbah-domestik",
    "judul": "Limbah Padat Domestik",
    "kategori": "G",
    "permissionKey": "limbah_domestik",
    "javaRef": "KeslingLimbahDomestik",
    "tabel": "kesling_limbah_domestik",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "jumlahlimbah",
        "label": "Jumlahlimbah",
        "tipe": "number"
      },
      {
        "nama": "tanggalangkut",
        "label": "Tanggalangkut",
        "tipe": "datetime"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mutu-air-limbah",
    "slug": "mutu-air-limbah",
    "judul": "Mutu Air Limbah",
    "kategori": "G",
    "permissionKey": "mutu_air_limbah",
    "javaRef": "KeslingMutuAirLimbah",
    "tabel": "kesling_mutu_air_limbah",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "meteran",
        "label": "Meteran",
        "tipe": "number"
      },
      {
        "nama": "jumlahharian",
        "label": "Jumlahharian",
        "tipe": "number"
      },
      {
        "nama": "ph",
        "label": "Ph",
        "tipe": "number"
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "number"
      },
      {
        "nama": "tds",
        "label": "Tds",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "ec",
        "label": "Ec",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "salt",
        "label": "Salt",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pest-control",
    "slug": "pest-control",
    "judul": "Pest Control",
    "kategori": "G",
    "permissionKey": "pest_control",
    "javaRef": "KeslingPestControl",
    "tabel": "kesling_pest_control",
    "kolom": [
      {
        "nama": "nip",
        "label": "Nip",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "rincian_kegiatan",
        "label": "Rincian Kegiatan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "rekomendasi",
        "label": "Rekomendasi",
        "tipe": "text",
        "maks": 2000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nip",
      "rincian_kegiatan",
      "rekomendasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_INVENTARIS: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_INVENTARIS.map((item) => [item.slug, item]),
);

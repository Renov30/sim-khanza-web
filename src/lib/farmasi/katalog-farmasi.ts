import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_FARMASI: readonly DefinisiModulKatalog[] = [
  {
    "id": "pengadaan-obat",
    "slug": "pengadaan-obat",
    "judul": "Pengadaan & Surat Pesanan",
    "kategori": "D",
    "permissionKey": "pengadaan_obat",
    "javaRef": "InventorySuratPemesanan",
    "tabel": "surat_pemesanan_medis",
    "kolom": [
      {
        "nama": "no_pemesanan",
        "label": "No. Pemesanan",
        "pk": true,
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
        "nama": "tanggal",
        "label": "Tanggal",
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
          "proses pesan",
          "sudah datang"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pemesanan",
      "kode_suplier",
      "nip",
      "status"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "stok-opname-obat",
    "slug": "stok-opname-obat",
    "judul": "Stok Opname Farmasi",
    "kategori": "D",
    "permissionKey": "stok_opname_obat",
    "javaRef": "DlgStokOpname",
    "tabel": "opname",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "real",
        "label": "Real",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "selisih",
        "label": "Selisih",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "nomihilang",
        "label": "Nomihilang",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "lebih",
        "label": "Lebih",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "nomilebih",
        "label": "Nomilebih",
        "wajib": true,
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
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-asal-hibah",
    "slug": "asal-hibah",
    "judul": "Asal Hibah",
    "kategori": "D",
    "permissionKey": "asal_hibah",
    "javaRef": "InventarisAsalHibah",
    "tabel": "pemberihibah",
    "kolom": [
      {
        "nama": "kode_pemberi",
        "label": "Kode Pemberi",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_pemberi",
        "label": "Nama Pemberi",
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
        "label": "No. Telp",
        "tipe": "text",
        "maks": 13
      }
    ],
    "kolomCari": [
      "kode_pemberi",
      "nama_pemberi",
      "alamat",
      "kota",
      "no_telp"
    ],
    "kolomUrut": "kode_pemberi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-industri-farmasi",
    "slug": "industri-farmasi",
    "judul": "Industri Farmasi",
    "kategori": "D",
    "permissionKey": "industrifarmasi",
    "javaRef": "DlgIndustriFarmasi",
    "tabel": "industrifarmasi",
    "kolom": [
      {
        "nama": "kode_industri",
        "label": "Kode Industri",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_industri",
        "label": "Nama Industri",
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
        "maks": 20
      }
    ],
    "kolomCari": [
      "kode_industri",
      "nama_industri",
      "alamat",
      "kota",
      "no_telp"
    ],
    "kolomUrut": "kode_industri",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-suplier",
    "slug": "suplier",
    "judul": "Suplier Obat/Alkes/BHP",
    "kategori": "D",
    "permissionKey": "suplier",
    "javaRef": "InventorySuplier",
    "tabel": "datasuplier",
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
    "id": "btn-satuan",
    "slug": "satuan",
    "judul": "Satuan Barang",
    "kategori": "D",
    "permissionKey": "satuan_barang",
    "javaRef": "DlgSatuan",
    "tabel": "kodesatuan",
    "kolom": [
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "satuan",
        "label": "Satuan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kode_sat",
      "satuan"
    ],
    "kolomUrut": "kode_sat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-metode-racik",
    "slug": "metode-racik",
    "judul": "Metode Racik",
    "kategori": "D",
    "permissionKey": "metode_racik",
    "javaRef": "DlgMetodeRacik",
    "tabel": "metode_racik",
    "kolom": [
      {
        "nama": "kd_racik",
        "label": "Kd Racik",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nm_racik",
        "label": "Nm Racik",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kd_racik",
      "nm_racik"
    ],
    "kolomUrut": "kd_racik",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-konversi",
    "slug": "konversi",
    "judul": "Konversi Satuan",
    "kategori": "D",
    "permissionKey": "konversi_satuan",
    "javaRef": "DlgKonversi",
    "tabel": "konver_sat",
    "kolom": [
      {
        "nama": "nilai",
        "label": "Nilai",
        "pk": true,
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "nilai_konversi",
        "label": "Nilai Konversi",
        "pk": true,
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "sat_konversi",
        "label": "Sat Konversi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      }
    ],
    "kolomCari": [
      "nilai_konversi",
      "nilai",
      "kode_sat",
      "sat_konversi"
    ],
    "kolomUrut": "nilai",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-jns-barang",
    "slug": "jns-barang",
    "judul": "Jenis Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "jenis_barang",
    "javaRef": "DlgJenis",
    "tabel": "jenis",
    "kolom": [
      {
        "nama": "kdjns",
        "label": "Kdjns",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "nama",
        "label": "Nama",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kdjns",
      "nama",
      "keterangan"
    ],
    "kolomUrut": "kdjns",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kategori-barang",
    "slug": "kategori-barang",
    "judul": "Kategori Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "kategori_barang",
    "javaRef": "DlgKategori",
    "tabel": "kategori_barang",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "nama",
        "label": "Nama",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kode",
      "nama"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-golongan-barang",
    "slug": "golongan-barang",
    "judul": "Golongan Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "golongan_barang",
    "javaRef": "DlgGolongan",
    "tabel": "golongan_barang",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "nama",
        "label": "Nama",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "kode",
      "nama"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-obat",
    "slug": "obat",
    "judul": "Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "obat",
    "javaRef": "DlgBarang",
    "tabel": "databarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_satbesar",
        "label": "Kode Satbesar",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "letak_barang",
        "label": "Letak Barang",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "tipe": "number"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "number"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "number"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "number"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      },
      {
        "nama": "vvip",
        "label": "Vvip",
        "tipe": "number"
      },
      {
        "nama": "beliluar",
        "label": "Beliluar",
        "tipe": "number"
      },
      {
        "nama": "jualbebas",
        "label": "Jualbebas",
        "tipe": "number"
      },
      {
        "nama": "karyawan",
        "label": "Karyawan",
        "tipe": "number"
      },
      {
        "nama": "stokminimal",
        "label": "Stokminimal",
        "tipe": "number"
      },
      {
        "nama": "kdjns",
        "label": "Kdjns",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "isi",
        "label": "Isi",
        "tipe": "number"
      },
      {
        "nama": "kapasitas",
        "label": "Kapasitas",
        "tipe": "number"
      },
      {
        "nama": "expire",
        "label": "Expire",
        "tipe": "date"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "kode_industri",
        "label": "Kode Industri",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "kode_golongan",
        "label": "Kode Golongan",
        "tipe": "text",
        "maks": 4
      }
    ],
    "kolomTanggal": "expire",
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_satbesar",
      "kode_sat",
      "letak_barang",
      "kdjns"
    ],
    "kolomUrut": "expire",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-opname",
    "slug": "opname",
    "judul": "Stok Opname Obat & BHP",
    "kategori": "D",
    "permissionKey": "stok_opname_obat",
    "javaRef": "DlgInputStok",
    "tabel": "opname",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "number"
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "stok",
        "label": "Stok",
        "tipe": "number"
      },
      {
        "nama": "real",
        "label": "Real",
        "tipe": "number"
      },
      {
        "nama": "selisih",
        "label": "Selisih",
        "tipe": "number"
      },
      {
        "nama": "nomihilang",
        "label": "Nomihilang",
        "tipe": "number"
      },
      {
        "nama": "lebih",
        "label": "Lebih",
        "tipe": "number"
      },
      {
        "nama": "nomilebih",
        "label": "Nomilebih",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "tanggal",
      "keterangan",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mutasi-barang",
    "slug": "mutasi-barang",
    "judul": "Mutasi Obat & BHP",
    "kategori": "D",
    "permissionKey": "mutasi_barang",
    "javaRef": "DlgMutasiBarang",
    "tabel": "mutasibarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "jml",
        "label": "Jml",
        "tipe": "number"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsaldari",
        "label": "Kode Bangsaldari",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_bangsalke",
        "label": "Kode Bangsalke",
        "pk": true,
        "tipe": "text",
        "maks": 5,
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
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "kd_bangsaldari",
      "kd_bangsalke",
      "tanggal",
      "keterangan",
      "no_batch"
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
    "id": "btn-permintaan-stok-obat-pasien",
    "slug": "permintaan-stok-obat-pasien",
    "judul": "Permintaan Stok Obat Pasien",
    "kategori": "D",
    "permissionKey": "permintaan_stok_obat_pasien",
    "javaRef": "DlgDaftarPermintaanStokPasien",
    "tabel": "permintaan_stok_obat_pasien",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 14
      },
      {
        "nama": "tgl_permintaan",
        "label": "Tgl Permintaan",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
          "Sudah",
          "Belum"
        ]
      },
      {
        "nama": "tgl_validasi",
        "label": "Tgl Validasi",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_validasi",
        "label": "Jam Validasi",
        "wajib": true,
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_permintaan",
    "kolomCari": [
      "no_permintaan",
      "no_rawat",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_permintaan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-permintaan-resep-pulang",
    "slug": "permintaan-resep-pulang",
    "judul": "Permintaan Resep Pulang",
    "kategori": "D",
    "permissionKey": "permintaan_resep_pulang",
    "javaRef": "DlgDaftarPermintaanResepPulang",
    "tabel": "permintaan_resep_pulang",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 14
      },
      {
        "nama": "tgl_permintaan",
        "label": "Tgl Permintaan",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
          "Sudah",
          "Belum"
        ]
      },
      {
        "nama": "tgl_validasi",
        "label": "Tgl Validasi",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_validasi",
        "label": "Jam Validasi",
        "wajib": true,
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_permintaan",
    "kolomCari": [
      "no_permintaan",
      "no_rawat",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_permintaan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-stok-obat-pasien",
    "slug": "stok-obat-pasien",
    "judul": "Stok Obat Pasien",
    "kategori": "D",
    "permissionKey": "stok_obat_pasien",
    "javaRef": "DlgStokPasien",
    "tabel": "stok_obat_pasien",
    "kolom": [
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_beli",
        "label": "Tgl Beli",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "tgl_kadaluarsa",
        "label": "Tgl Kadaluarsa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "asal",
        "label": "Asal",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Penerimaan",
          "Pengadaan",
          "Hibah"
        ]
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "uang"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "uang"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_batch",
      "kode_brng",
      "no_faktur"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-permintaan-medis",
    "slug": "permintaan-medis",
    "judul": "Permintaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "permintaan_medis",
    "javaRef": "DlgPermintaan",
    "tabel": "permintaan_medis",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Baru",
          "Disetujui",
          "Tidak Disetujui"
        ]
      },
      {
        "nama": "kd_bangsaltujuan",
        "label": "Kd Bangsaltujuan",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "kd_bangsal",
      "nip",
      "kd_bangsaltujuan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-permintaan-medis",
    "slug": "ringkasan-permintaan-medis",
    "judul": "Ringkasan Permintaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "rekap_permintaan_medis",
    "javaRef": "DlgRekapPermintaan",
    "tabel": "databarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_satbesar",
        "label": "Kode Satbesar",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "letak_barang",
        "label": "Letak Barang",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "uang"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "uang"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      },
      {
        "nama": "vvip",
        "label": "Vvip",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_satbesar",
      "kode_sat",
      "letak_barang"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pengajuan-barang-medis",
    "slug": "pengajuan-barang-medis",
    "judul": "Pengajuan Obat & BHP",
    "kategori": "D",
    "permissionKey": "pengajuan_barang_medis",
    "javaRef": "InventoryPengajuanBarangMedis",
    "tabel": "pengajuan_barang_medis",
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
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Proses Pengajuan",
          "Disetujui",
          "Ditolak"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-pengajuan-medis",
    "slug": "ringkasan-pengajuan-medis",
    "judul": "Ringkasan Pengajuan Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_pengajuan_obat",
    "javaRef": "InventoryRingkasanPengajuanBarangMedis",
    "tabel": "pengajuan_barang_medis",
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
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Proses Pengajuan",
          "Disetujui",
          "Ditolak"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-surat-pemesanan-medis",
    "slug": "surat-pemesanan-medis",
    "judul": "Surat Pemesanan Obat & BHP",
    "kategori": "D",
    "permissionKey": "surat_pemesanan_medis",
    "javaRef": "InventorySuratPemesanan",
    "tabel": "surat_pemesanan_medis",
    "kolom": [
      {
        "nama": "no_pemesanan",
        "label": "No. Pemesanan",
        "pk": true,
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
        "nama": "tanggal",
        "label": "Tanggal",
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
          "proses pesan",
          "sudah datang"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pemesanan",
      "kode_suplier",
      "nip",
      "status"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-pemesanan-medis",
    "slug": "ringkasan-pemesanan-medis",
    "judul": "Ringkasan Pemesanan Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_pemesanan_obat",
    "javaRef": "InventoryRingkasanPemesananBarangMedis",
    "tabel": "surat_pemesanan_medis",
    "kolom": [
      {
        "nama": "no_pemesanan",
        "label": "No Pemesanan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
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
          "Proses Pesan",
          "Sudah Datang"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pemesanan",
      "kode_suplier",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembelian",
    "slug": "pembelian",
    "judul": "Pengadaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "pengadaan_obat",
    "javaRef": "DlgPembelian",
    "tabel": "pembelian",
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
        "nama": "tgl_beli",
        "label": "Tgl. Beli",
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
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_faktur",
      "kode_suplier",
      "nip",
      "kd_bangsal",
      "kd_rek"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-pembelian-medis",
    "slug": "ringkasan-pembelian-medis",
    "judul": "Ringkasan Pengadaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_pengadaan_obat",
    "javaRef": "InventoryRingkasanPembelianBarangMedis",
    "tabel": "pembelian",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "nama": "tgl_beli",
        "label": "Tgl Beli",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_faktur",
      "kode_suplier",
      "nip",
      "kd_bangsal",
      "kd_rek"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pemesanan",
    "slug": "pemesanan",
    "judul": "Penerimaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "pemesanan_obat",
    "javaRef": "DlgPemesanan",
    "tabel": "pemesanan",
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
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
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
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "kd_bangsal",
      "status"
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
    "id": "btn-ringkasan-penerimaan-medis",
    "slug": "ringkasan-penerimaan-medis",
    "judul": "Ringkasan Penerimaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_penerimaan_obat",
    "javaRef": "InventoryRingkasanPenerimaanBarangMedis",
    "tabel": "pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_order",
        "label": "No Order",
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "label": "Tgl Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
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
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hibah-obat-bhp",
    "slug": "hibah-obat-bhp",
    "judul": "Hibah Obat & BHP",
    "kategori": "D",
    "permissionKey": "hibah_obat_bhp",
    "javaRef": "InventoryHibahObatBHP",
    "tabel": "hibah_obat_bhp",
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
        "nama": "totalnilai",
        "label": "Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_hibah",
    "kolomCari": [
      "no_hibah",
      "kode_pemberi",
      "nip",
      "kd_bangsal"
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
    "id": "btn-ringkasan-hibah-medis",
    "slug": "ringkasan-hibah-medis",
    "judul": "Ringkasan Hibah Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_hibah_obat",
    "javaRef": "InventoryRingkasanHibahBarangMedis",
    "tabel": "pemberihibah",
    "kolom": [
      {
        "nama": "kode_pemberi",
        "label": "Kode Pemberi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_pemberi",
        "label": "Nama Pemberi",
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
      }
    ],
    "kolomCari": [
      "kode_pemberi",
      "nama_pemberi",
      "alamat",
      "kota",
      "no_telp"
    ],
    "kolomUrut": "kode_pemberi",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-penjualan",
    "slug": "penjualan",
    "judul": "Penjualan Obat & BHP",
    "kategori": "D",
    "permissionKey": "penjualan_obat",
    "javaRef": "DlgPenjualan",
    "tabel": "penjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tgl_jual",
        "label": "Tgl. Jual",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "jual bebas",
          "karyawan",
          "beli luar",
          "rawat jalan",
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "utama/bpjs",
          "vip",
          "vvip"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "number"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "belum dibayar",
          "sudah dibayar"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "keterangan",
      "jns_jual"
    ],
    "kolomUrut": "tgl_jual",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-penjualan-medis",
    "slug": "ringkasan-penjualan-medis",
    "judul": "Ringkasan Penjualan Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_penjualan_obat",
    "javaRef": "InventoryRingkasanPenjualanBarangMedis",
    "tabel": "penjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_jual",
        "label": "Tgl Jual",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "Jual Bebas",
          "Karyawan",
          "Beli Luar",
          "Rawat Jalan",
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Utama/BPJS",
          "VIP",
          "VVIP"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Belum Dibayar",
          "Sudah Dibayar"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_jual",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ringkasan-beri-obat",
    "slug": "ringkasan-beri-obat",
    "judul": "Ringkasan Beri Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_beri_obat",
    "javaRef": "InventoryRingkasanBeriObat",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-piutang",
    "slug": "piutang",
    "judul": "Piutang Obat & BHP",
    "kategori": "D",
    "permissionKey": "piutang_obat",
    "javaRef": "DlgPiutang",
    "tabel": "tamppiutang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "satuan",
        "label": "Satuan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "h_jual",
        "label": "H Jual",
        "tipe": "number"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "number"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "tipe": "number"
      },
      {
        "nama": "subtotal",
        "label": "Subtotal",
        "tipe": "uang"
      },
      {
        "nama": "dis",
        "label": "Dis",
        "tipe": "number"
      },
      {
        "nama": "bsr_dis",
        "label": "Bsr Dis",
        "tipe": "number"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "aturan_pakai",
        "label": "Aturan Pakai",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "satuan",
      "no_batch",
      "petugas",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-piutang-obat",
    "slug": "ringkasan-piutang-obat",
    "judul": "Ringkasan Piutang Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_piutang_obat",
    "javaRef": "InventoryRingkasanPiutangBarangMedis",
    "tabel": "piutang",
    "kolom": [
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_piutang",
        "label": "Tgl Piutang",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "Jual Bebas",
          "Karyawan",
          "Beli Luar",
          "Rawat Jalan",
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Utama",
          "VIP",
          "VVIP"
        ]
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "uang"
      },
      {
        "nama": "uangmuka",
        "label": "Uangmuka",
        "tipe": "uang"
      },
      {
        "nama": "sisapiutang",
        "label": "Sisapiutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "UMUM",
          "PAJAK"
        ]
      },
      {
        "nama": "tgltempo",
        "label": "Tgltempo",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "nota_piutang",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "catatan",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-stok-keluar-medis",
    "slug": "stok-keluar-medis",
    "judul": "Stok Keluar Medis",
    "kategori": "D",
    "permissionKey": "pengeluaran_stok_apotek",
    "javaRef": "DlgPengeluaranApotek",
    "tabel": "pengeluaran_obat_bhp",
    "kolom": [
      {
        "nama": "no_keluar",
        "label": "No Keluar",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_keluar",
      "nip",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-stok-keluar-obat",
    "slug": "ringkasan-stok-keluar-obat",
    "judul": "Ringkasan Stok Keluar Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_stok_keluar_obat",
    "javaRef": "InventoryRingkasanStokKeluarBarangMedis",
    "tabel": "pengeluaran_obat_bhp",
    "kolom": [
      {
        "nama": "no_keluar",
        "label": "No Keluar",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_keluar",
      "nip",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-retur-beli",
    "slug": "retur-beli",
    "judul": "Retur Ke Suplier",
    "kategori": "D",
    "permissionKey": "retur_ke_suplier",
    "javaRef": "DlgReturBeli",
    "tabel": "tampreturbeli",
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
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "satuan",
        "label": "Satuan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "number"
      },
      {
        "nama": "jml_beli",
        "label": "Jml Beli",
        "tipe": "number"
      },
      {
        "nama": "h_retur",
        "label": "H Retur",
        "tipe": "number"
      },
      {
        "nama": "jml_retur",
        "label": "Jml Retur",
        "tipe": "number"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "jml_retur2",
        "label": "Jml Retur2",
        "tipe": "number"
      },
      {
        "nama": "kadaluarsa",
        "label": "Kadaluarsa",
        "tipe": "text",
        "maks": 14,
        "wajib": true
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_faktur",
      "kode_brng",
      "nama_brng",
      "satuan",
      "no_batch",
      "kadaluarsa"
    ],
    "kolomUrut": "no_faktur",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-retur-suplier-obat",
    "slug": "ringkasan-retur-suplier-obat",
    "judul": "Ringkasan Retur Suplier Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_retur_suplier_obat",
    "javaRef": "InventoryRingkasanReturSuplierBarangMedis",
    "tabel": "returbeli",
    "kolom": [
      {
        "nama": "no_retur_beli",
        "label": "No Retur Beli",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_retur",
        "label": "Tgl Retur",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_retur",
    "kolomCari": [
      "no_retur_beli",
      "nip",
      "kode_suplier",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_retur",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-retur-jual",
    "slug": "retur-jual",
    "judul": "Retur Dari Pembeli",
    "kategori": "D",
    "permissionKey": "retur_dari_pembeli",
    "javaRef": "DlgReturJual",
    "tabel": "tampreturjual",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jml_jual",
        "label": "Jml Jual",
        "tipe": "number"
      },
      {
        "nama": "h_jual",
        "label": "H Jual",
        "tipe": "number"
      },
      {
        "nama": "jml_retur",
        "label": "Jml Retur",
        "tipe": "number"
      },
      {
        "nama": "h_retur",
        "label": "H Retur",
        "tipe": "number"
      },
      {
        "nama": "satuan",
        "label": "Satuan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "subtotal",
        "label": "Subtotal",
        "tipe": "uang"
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomCari": [
      "nota_jual",
      "kode_brng",
      "nama_brng",
      "satuan",
      "no_batch",
      "petugas"
    ],
    "kolomUrut": "nota_jual",
    "kolomRingkasan": {
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-retur-jual-obat",
    "slug": "ringkasan-retur-jual-obat",
    "judul": "Ringkasan Retur Pembeli Obat & BHP",
    "kategori": "D",
    "permissionKey": "ringkasan_retur_pembeli_obat",
    "javaRef": "InventoryRingkasanReturJualBarangMedis",
    "tabel": "returjual",
    "kolom": [
      {
        "nama": "no_retur_jual",
        "label": "No Retur Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_retur",
        "label": "Tgl Retur",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_retur",
    "kolomCari": [
      "no_retur_jual",
      "nip",
      "no_rkm_medis",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_retur",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-retur-pasien",
    "slug": "retur-pasien",
    "judul": "Retur Obat Ranap",
    "kategori": "D",
    "permissionKey": "retur_obat_ranap",
    "javaRef": "DlgReturObatPasien",
    "tabel": "returpasien",
    "kolom": [
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_beli",
        "label": "Tgl Beli",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "tgl_kadaluarsa",
        "label": "Tgl Kadaluarsa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "asal",
        "label": "Asal",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Penerimaan",
          "Pengadaan",
          "Hibah"
        ]
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "uang"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "uang"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_batch",
      "kode_brng",
      "no_faktur"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-retur-piutang",
    "slug": "retur-piutang",
    "judul": "Retur Piutang Pembeli",
    "kategori": "D",
    "permissionKey": "retur_piutang_pasien",
    "javaRef": "DlgReturPiutang",
    "tabel": "tampreturpiutang",
    "kolom": [
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng",
        "label": "Nama Brng",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jml_piutang",
        "label": "Jml Piutang",
        "tipe": "number"
      },
      {
        "nama": "h_piutang",
        "label": "H Piutang",
        "tipe": "number"
      },
      {
        "nama": "jml_retur",
        "label": "Jml Retur",
        "tipe": "number"
      },
      {
        "nama": "h_retur",
        "label": "H Retur",
        "tipe": "number"
      },
      {
        "nama": "satuan",
        "label": "Satuan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "subtotal",
        "label": "Subtotal",
        "tipe": "uang"
      },
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomCari": [
      "nota_piutang",
      "kode_brng",
      "nama_brng",
      "satuan",
      "no_batch",
      "petugas"
    ],
    "kolomUrut": "nota_piutang",
    "kolomRingkasan": {
      "nama": "jml_piutang",
      "label": "Total Jml Piutang"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengambilan-utd",
    "slug": "pengambilan-utd",
    "judul": "Pengambilan BHP UTD",
    "kategori": "D",
    "permissionKey": "pengambilan_utd",
    "javaRef": "DlgPengambilanUTD",
    "tabel": "utd_pengambilan_medis",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jml",
        "label": "Jml",
        "tipe": "number"
      },
      {
        "nama": "hargabeli",
        "label": "Hargabeli",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal_dr",
        "label": "Kd Bangsal Dr",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal_dr",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "hargabeli",
      "label": "Total Hargabeli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-keuntungan",
    "slug": "keuntungan",
    "judul": "Keuntungan Penjualan",
    "kategori": "D",
    "permissionKey": "keuntungan_penjualan",
    "javaRef": "DlgProyeksiJual",
    "tabel": "penjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_jual",
        "label": "Tgl Jual",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "Jual Bebas",
          "Karyawan",
          "Beli Luar",
          "Rawat Jalan",
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Utama/BPJS",
          "VIP",
          "VVIP"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Belum Dibayar",
          "Sudah Dibayar"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_jual",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-keuntungan-obat-ranap",
    "slug": "keuntungan-obat-ranap",
    "judul": "Keuntungan Beri Obat ",
    "kategori": "D",
    "permissionKey": "keuntungan_beri_obat",
    "javaRef": "DlgProyeksiBeriObat",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-keuntungan-obat2",
    "slug": "keuntungan-obat2",
    "judul": "Keuntungan Beri Obat 2",
    "kategori": "D",
    "permissionKey": "keuntungan_beri_obat_nonpiutang",
    "javaRef": "DlgProyeksiBeriObat2",
    "tabel": "piutang_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_piutang",
        "label": "Tgl Piutang",
        "tipe": "date"
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Lunas",
          "Belum Lunas"
        ]
      },
      {
        "nama": "totalpiutang",
        "label": "Totalpiutang",
        "tipe": "uang"
      },
      {
        "nama": "uangmuka",
        "label": "Uangmuka",
        "tipe": "uang"
      },
      {
        "nama": "sisapiutang",
        "label": "Sisapiutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tgltempo",
        "label": "Tgltempo",
        "wajib": true,
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "no_rawat",
      "no_rkm_medis"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "totalpiutang",
      "label": "Total Totalpiutang"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi",
    "slug": "sirkulasi",
    "judul": "Sirkulasi Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat",
    "javaRef": "DlgSirkulasiBarang",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi2",
    "slug": "sirkulasi2",
    "judul": "Sirkulasi Obat, Alkes & BHP 2",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat2",
    "javaRef": "DlgSirkulasiBarang2",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi3",
    "slug": "sirkulasi3",
    "judul": "Sirkulasi Obat, Alkes & BHP 3",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat3",
    "javaRef": "DlgSirkulasiBarang3",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-obat4",
    "slug": "sirkulasi-obat4",
    "judul": "Sirkulasi Obat, Alkes & BHP 4",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat4",
    "javaRef": "DlgSirkulasiBarang4",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-obat5",
    "slug": "sirkulasi-obat5",
    "judul": "Sirkulasi Obat, Alkes & BHP 5",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat5",
    "javaRef": "DlgSirkulasiBarang5",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-obat6",
    "slug": "sirkulasi-obat6",
    "judul": "Sirkulasi Obat, Alkes & BHP 6",
    "kategori": "D",
    "permissionKey": "sirkulasi_obat6",
    "javaRef": "DlgSirkulasiBarang6",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-obat-per-tanggal",
    "slug": "obat-per-tanggal",
    "judul": "Obat/Alkes/BHP Per Tanggal",
    "kategori": "D",
    "permissionKey": "pemberian_obat_pertanggal",
    "javaRef": "DlgObatPerTanggal",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penjualan-per-tanggal",
    "slug": "penjualan-per-tanggal",
    "judul": "Penjualan Bebas Per Tanggal",
    "kategori": "D",
    "permissionKey": "penjualan_obat_pertanggal",
    "javaRef": "DlgPenjualanPerTanggal",
    "tabel": "penjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_jual",
        "label": "Tgl Jual",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "Jual Bebas",
          "Karyawan",
          "Beli Luar",
          "Rawat Jalan",
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Utama/BPJS",
          "VIP",
          "VVIP"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Belum Dibayar",
          "Sudah Dibayar"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_jual",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-riwayat-barang-medis",
    "slug": "riwayat-barang-medis",
    "judul": "Riwayat Obat, Alkes & BHP",
    "kategori": "D",
    "permissionKey": "riwayat_obat_alkes_bhp",
    "javaRef": "DlgRiwayatBarangMedis",
    "tabel": "riwayat_barang_medis",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "stok_awal",
        "label": "Stok Awal",
        "tipe": "number"
      },
      {
        "nama": "masuk",
        "label": "Masuk",
        "tipe": "number"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "number"
      },
      {
        "nama": "stok_akhir",
        "label": "Stok Akhir",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "posisi",
        "label": "Posisi",
        "tipe": "enum",
        "opsi": [
          "Pemberian Obat",
          "Pengadaan",
          "Penerimaan",
          "Piutang",
          "Retur Beli",
          "Retur Jual",
          "Retur Piutang",
          "Mutasi",
          "Opname",
          "Resep Pulang",
          "Retur Pasien",
          "Stok Pasien Ranap",
          "Pengambilan Medis",
          "Penjualan",
          "Stok Keluar",
          "Hibah"
        ]
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "tipe": "time"
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Simpan",
          "Hapus"
        ]
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "petugas",
      "kd_bangsal",
      "no_batch",
      "no_faktur",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-darurat-stok",
    "slug": "darurat-stok",
    "judul": "Darurat Stok",
    "kategori": "D",
    "permissionKey": "darurat_stok",
    "javaRef": "DlgDaruratStok",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pengguna-obat-resep",
    "slug": "pengguna-obat-resep",
    "judul": "Pengguna Obat/Alkes/BHP Resep",
    "kategori": "D",
    "permissionKey": "pengguna_obat_resep",
    "javaRef": "DlgPenggunaObat",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekap-penerimaan-obat",
    "slug": "rekap-penerimaan-obat",
    "judul": "Rekap Penerimaan Obat & BHP",
    "kategori": "D",
    "permissionKey": "rekap_pemesanan",
    "javaRef": "DlgRekapPenerimaan",
    "tabel": "pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_order",
        "label": "No Order",
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "label": "Tgl Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
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
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-data-batch",
    "slug": "data-batch",
    "judul": "Data Batch",
    "kategori": "D",
    "permissionKey": "data_batch",
    "javaRef": "DlgDataBatch",
    "tabel": "data_batch",
    "kolom": [
      {
        "nama": "no_batch",
        "label": "No. Batch",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tgl_beli",
        "label": "Tgl. Beli",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "tgl_kadaluarsa",
        "label": "Tgl. Kadaluarsa",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "asal",
        "label": "Asal",
        "tipe": "enum",
        "opsi": [
          "penerimaan",
          "pengadaan",
          "hibah"
        ],
        "wajib": true
      },
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "tipe": "number"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "number"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "number"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "number"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      },
      {
        "nama": "vvip",
        "label": "Vvip",
        "tipe": "number"
      },
      {
        "nama": "beliluar",
        "label": "Beliluar",
        "tipe": "number"
      },
      {
        "nama": "jualbebas",
        "label": "Jualbebas",
        "tipe": "number"
      },
      {
        "nama": "karyawan",
        "label": "Karyawan",
        "tipe": "number"
      },
      {
        "nama": "jumlahbeli",
        "label": "Jumlahbeli",
        "tipe": "number"
      },
      {
        "nama": "sisa",
        "label": "Sisa",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_batch",
      "kode_brng",
      "asal",
      "no_faktur"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-riwayat-batch",
    "slug": "riwayat-batch",
    "judul": "Riwayat Batch",
    "kategori": "D",
    "permissionKey": "riwayat_data_batch",
    "javaRef": "DlgRiwayatBatch",
    "tabel": "penjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_jual",
        "label": "Tgl Jual",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jns_jual",
        "label": "Jns Jual",
        "tipe": "enum",
        "opsi": [
          "Jual Bebas",
          "Karyawan",
          "Beli Luar",
          "Rawat Jalan",
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Utama/BPJS",
          "VIP",
          "VVIP"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Belum Dibayar",
          "Sudah Dibayar"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_rkm_medis",
      "nm_pasien",
      "keterangan",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_jual",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kegiatan-farmasi",
    "slug": "kegiatan-farmasi",
    "judul": "Kegiatan Farmasi",
    "kategori": "D",
    "permissionKey": "kegiatan_farmasi",
    "javaRef": "DlgKegiatanFarmasi",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ppn-obat",
    "slug": "ppn-obat",
    "judul": "PPN Obat",
    "kategori": "D",
    "permissionKey": "ppn_obat",
    "javaRef": "DlgCariPPNObat",
    "tabel": "pembelian",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "nama": "tgl_beli",
        "label": "Tgl Beli",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_faktur",
      "kode_suplier",
      "nip",
      "kd_bangsal",
      "kd_rek"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kadaluarsa-batch",
    "slug": "kadaluarsa-batch",
    "judul": "Kadaluarsa Batch",
    "kategori": "D",
    "permissionKey": "kadaluarsa_batch",
    "javaRef": "DlgKadaluarsaBatch",
    "tabel": "data_batch",
    "kolom": [
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_beli",
        "label": "Tgl Beli",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "tgl_kadaluarsa",
        "label": "Tgl Kadaluarsa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "asal",
        "label": "Asal",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Penerimaan",
          "Pengadaan",
          "Hibah"
        ]
      },
      {
        "nama": "dasar",
        "label": "Dasar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "ralan",
        "label": "Ralan",
        "tipe": "uang"
      },
      {
        "nama": "kelas1",
        "label": "Kelas1",
        "tipe": "uang"
      },
      {
        "nama": "kelas2",
        "label": "Kelas2",
        "tipe": "number"
      },
      {
        "nama": "kelas3",
        "label": "Kelas3",
        "tipe": "number"
      },
      {
        "nama": "utama",
        "label": "Utama",
        "tipe": "number"
      },
      {
        "nama": "vip",
        "label": "Vip",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_batch",
      "kode_brng",
      "no_faktur"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sisa-stok",
    "slug": "sisa-stok",
    "judul": "Sisa Stok",
    "kategori": "D",
    "permissionKey": "sisa_stok",
    "javaRef": "DlgSisaStok",
    "tabel": "gudangbarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "stok",
        "label": "Stok",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kd_bangsal",
      "no_batch",
      "no_faktur"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-obat-per-resep",
    "slug": "obat-per-resep",
    "judul": "Obat Per Resep",
    "kategori": "D",
    "permissionKey": "obat_per_resep",
    "javaRef": "DlgObatPeresep",
    "tabel": "resep_obat",
    "kolom": [
      {
        "nama": "no_resep",
        "label": "No Resep",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 14
      },
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_peresepan",
        "label": "Tgl Peresepan",
        "tipe": "date"
      },
      {
        "nama": "jam_peresepan",
        "label": "Jam Peresepan",
        "tipe": "time"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "ralan",
          "ranap"
        ]
      },
      {
        "nama": "tgl_penyerahan",
        "label": "Tgl Penyerahan",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_penyerahan",
        "label": "Jam Penyerahan",
        "wajib": true,
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_resep",
      "no_rawat",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn10-besar-obat-poli",
    "slug": "btn10-besar-obat-poli",
    "judul": "10 Obat Terbanyak Poli",
    "kategori": "D",
    "permissionKey": "obat10_terbanyak_poli",
    "javaRef": "Dlg10ObatTerbanyakPoli",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekap-obat-poli",
    "slug": "rekap-obat-poli",
    "judul": "Rekap Obat Per Poli",
    "kategori": "D",
    "permissionKey": "rekap_obat_poli",
    "javaRef": "DlgRekapObatPoli",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-obat-ranap",
    "slug": "rekap-obat-ranap",
    "judul": "Rekap Obat Ranap",
    "kategori": "D",
    "permissionKey": "admin",
    "javaRef": "DlgRekapObatKamar",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-obat-pasien",
    "slug": "rekap-obat-pasien",
    "judul": "Rekap Obat Per Pasien",
    "kategori": "D",
    "permissionKey": "rekap_obat_pasien",
    "javaRef": "DlgRekapObatPasien",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-verifikasi-penerimaan-farmasi",
    "slug": "verifikasi-penerimaan-farmasi",
    "judul": "Verifikasi Penerimaan Obat/Alkes/BHP",
    "kategori": "D",
    "permissionKey": "verifikasi_penerimaan_farmasi",
    "javaRef": "InventoryVerifikasiPenerimaan",
    "tabel": "surat_pemesanan_medis",
    "kolom": [
      {
        "nama": "no_pemesanan",
        "label": "No Pemesanan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
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
          "Proses Pesan",
          "Sudah Datang"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pemesanan",
      "kode_suplier",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-penggunaan-bhpok",
    "slug": "penggunaan-bhpok",
    "judul": "Penggunaan BHP OK/VK",
    "kategori": "D",
    "permissionKey": "penggunaan_bhp_ok",
    "javaRef": "InventoryPenggunaanBHPOK",
    "tabel": "beri_obat_operasi",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_obat",
        "label": "Kd Obat",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "hargasatuan",
        "label": "Hargasatuan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_obat"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "hargasatuan",
      "label": "Total Hargasatuan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-resep-luar",
    "slug": "resep-luar",
    "judul": "Resep Luar",
    "kategori": "D",
    "permissionKey": "resep_luar",
    "javaRef": "InventoryCariResepLuar",
    "tabel": "resep_luar",
    "kolom": [
      {
        "nama": "no_resep",
        "label": "No Resep",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 14
      },
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_peresepan",
        "label": "Tgl Peresepan",
        "tipe": "date"
      },
      {
        "nama": "jam_peresepan",
        "label": "Jam Peresepan",
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_resep",
      "no_rawat",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-stok-akhir-farmasi-per-tanggal",
    "slug": "stok-akhir-farmasi-per-tanggal",
    "judul": "Stok Akhir Farmasi Per Tanggal",
    "kategori": "D",
    "permissionKey": "stok_akhir_farmasi_pertanggal",
    "javaRef": "InventoryStokAkhirFarmasiPerTanggal",
    "tabel": "riwayat_barang_medis",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "stok_awal",
        "label": "Stok Awal",
        "tipe": "number"
      },
      {
        "nama": "masuk",
        "label": "Masuk",
        "tipe": "number"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "number"
      },
      {
        "nama": "stok_akhir",
        "label": "Stok Akhir",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "posisi",
        "label": "Posisi",
        "tipe": "enum",
        "opsi": [
          "Pemberian Obat",
          "Pengadaan",
          "Penerimaan",
          "Piutang",
          "Retur Beli",
          "Retur Jual",
          "Retur Piutang",
          "Mutasi",
          "Opname",
          "Resep Pulang",
          "Retur Pasien",
          "Stok Pasien Ranap",
          "Pengambilan Medis",
          "Penjualan",
          "Stok Keluar",
          "Hibah"
        ]
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "tipe": "time"
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Simpan",
          "Hapus"
        ]
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "petugas",
      "kd_bangsal",
      "no_batch",
      "no_faktur",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-telaah-resep",
    "slug": "telaah-resep",
    "judul": "Telaah Resep & Obat",
    "kategori": "D",
    "permissionKey": "telaah_resep",
    "javaRef": "InventoryTelaahResep",
    "tabel": "telaah_farmasi",
    "kolom": [
      {
        "nama": "no_resep",
        "label": "No. Resep",
        "pk": true,
        "tipe": "text",
        "maks": 14,
        "wajib": true
      },
      {
        "nama": "resep_identifikasi_pasien",
        "label": "Resep Identifikasi Pasien",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_identifikasi_pasien",
        "label": "Resep Ket Identifikasi Pasien",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_tepat_obat",
        "label": "Resep Tepat Obat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_tepat_obat",
        "label": "Resep Ket Tepat Obat",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_tepat_dosis",
        "label": "Resep Tepat Dosis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_tepat_dosis",
        "label": "Resep Ket Tepat Dosis",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_tepat_cara_pemberian",
        "label": "Resep Tepat Cara Pemberian",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_tepat_cara_pemberian",
        "label": "Resep Ket Tepat Cara Pemberian",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_tepat_waktu_pemberian",
        "label": "Resep Tepat Waktu Pemberian",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_tepat_waktu_pemberian",
        "label": "Resep Ket Tepat Waktu Pemberian",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_ada_tidak_duplikasi_obat",
        "label": "Resep Ada Tidak Duplikasi Obat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_ada_tidak_duplikasi_obat",
        "label": "Resep Ket Ada Tidak Duplikasi Obat",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_interaksi_obat",
        "label": "Resep Interaksi Obat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_interaksi_obat",
        "label": "Resep Ket Interaksi Obat",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resep_kontra_indikasi_obat",
        "label": "Resep Kontra Indikasi Obat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "resep_ket_kontra_indikasi_obat",
        "label": "Resep Ket Kontra Indikasi Obat",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "obat_tepat_pasien",
        "label": "Obat Tepat Pasien",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obat_tepat_obat",
        "label": "Obat Tepat Obat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obat_tepat_dosis",
        "label": "Obat Tepat Dosis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obat_tepat_cara_pemberian",
        "label": "Obat Tepat Cara Pemberian",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obat_tepat_waktu_pemberian",
        "label": "Obat Tepat Waktu Pemberian",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "no_resep",
      "resep_identifikasi_pasien",
      "resep_ket_identifikasi_pasien",
      "resep_tepat_obat",
      "resep_ket_tepat_obat",
      "resep_tepat_dosis"
    ],
    "kolomUrut": "no_resep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-biaya-obat-pasien-per-tanggal",
    "slug": "ringkasan-biaya-obat-pasien-per-tanggal",
    "judul": "Ringkasan Biaya Obat Pasien Per Tanggal",
    "kategori": "D",
    "permissionKey": "ringkasan_biaya_obat_pasien_pertanggal",
    "javaRef": "InventoryRingkasanBiayaObatPasienPerTanggal",
    "tabel": "detail_pemberian_obat",
    "kolom": [
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "tipe": "uang"
      },
      {
        "nama": "biaya_obat",
        "label": "Biaya Obat",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "embalase",
        "label": "Embalase",
        "tipe": "uang"
      },
      {
        "nama": "tuslah",
        "label": "Tuslah",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "h_beli",
      "label": "Total H Beli"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-nilai-penerimaan-vendor-farmasi-per-bulan",
    "slug": "nilai-penerimaan-vendor-farmasi-per-bulan",
    "judul": "Nilai Penerimaan Vendor Farmasi Per Bulan",
    "kategori": "D",
    "permissionKey": "nilai_penerimaan_vendor_farmasi_perbulan",
    "javaRef": "InventoryNilaiPenerimaanVendorFarmasiPerBulan",
    "tabel": "pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_order",
        "label": "No Order",
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
        "label": "Tgl Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "wajib": true,
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
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "kd_bangsal"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-obat-bhp-tidak-bergerak",
    "slug": "obat-bhp-tidak-bergerak",
    "judul": "Obat/Alkes/BHP Tidak Bergerak",
    "kategori": "D",
    "permissionKey": "obat_bhp_tidakbergerak",
    "javaRef": "InventoryObatBHPTidakBergerak",
    "tabel": "riwayat_barang_medis",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "stok_awal",
        "label": "Stok Awal",
        "tipe": "number"
      },
      {
        "nama": "masuk",
        "label": "Masuk",
        "tipe": "number"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "number"
      },
      {
        "nama": "stok_akhir",
        "label": "Stok Akhir",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "posisi",
        "label": "Posisi",
        "tipe": "enum",
        "opsi": [
          "Pemberian Obat",
          "Pengadaan",
          "Penerimaan",
          "Piutang",
          "Retur Beli",
          "Retur Jual",
          "Retur Piutang",
          "Mutasi",
          "Opname",
          "Resep Pulang",
          "Retur Pasien",
          "Stok Pasien Ranap",
          "Pengambilan Medis",
          "Penjualan",
          "Stok Keluar",
          "Hibah"
        ]
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "jam",
        "label": "Jam",
        "tipe": "time"
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Simpan",
          "Hapus"
        ]
      },
      {
        "nama": "no_batch",
        "label": "No Batch",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "petugas",
      "kd_bangsal",
      "no_batch",
      "no_faktur",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_FARMASI: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_FARMASI.map((item) => [item.slug, item]),
);

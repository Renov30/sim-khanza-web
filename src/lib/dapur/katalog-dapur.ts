import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_DAPUR: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-barang-dapur",
    "slug": "barang-dapur",
    "judul": "Barang Dapur",
    "kategori": "F",
    "permissionKey": "dapur_barang",
    "javaRef": "DapurBarang",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-opname-dapur",
    "slug": "opname-dapur",
    "judul": "Stok Opname Barang Dapur",
    "kategori": "F",
    "permissionKey": "dapur_opname",
    "javaRef": "DapurInputStok",
    "tabel": "dapuropname",
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "tanggal",
      "keterangan"
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
    "id": "btn-suplier-dapur",
    "slug": "suplier-dapur",
    "judul": "Suplier Dapur",
    "kategori": "F",
    "permissionKey": "dapur_suplier",
    "javaRef": "DapurSuplier",
    "tabel": "dapursuplier",
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
    "id": "btn-pengajuan-barang-dapur",
    "slug": "pengajuan-barang-dapur",
    "judul": "Pengajuan Barang Dapur",
    "kategori": "F",
    "permissionKey": "pengajuan_barang_dapur",
    "javaRef": "DapurPengajuan",
    "tabel": "pengajuan_barang_dapur",
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
    "id": "btn-ringkasan-pengajuan-dapur",
    "slug": "ringkasan-pengajuan-dapur",
    "judul": "Ringkasan Pengajuan Dapur",
    "kategori": "F",
    "permissionKey": "ringkasan_pengajuan_dapur",
    "javaRef": "DapurRingkasanPengajuanBarang",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-surat-pemesanan-dapur",
    "slug": "surat-pemesanan-dapur",
    "judul": "Surat Pemesanan Barang Dapur",
    "kategori": "F",
    "permissionKey": "surat_pemesanan_dapur",
    "javaRef": "DapurSuratPemesanan",
    "tabel": "surat_pemesanan_dapur",
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
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-pemesanan-dapur",
    "slug": "ringkasan-pemesanan-dapur",
    "judul": "Ringkasan Pemesanan Dapur",
    "kategori": "F",
    "permissionKey": "ringkasan_pemesanan_dapur",
    "javaRef": "DapurRingkasanPemesananBarang",
    "tabel": "dapursuplier",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembelian-dapur",
    "slug": "pembelian-dapur",
    "judul": "Pengadaan Barang Dapur",
    "kategori": "F",
    "permissionKey": "dapur_pembelian",
    "javaRef": "DapurPembelian",
    "tabel": "dapurpembelian",
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
      }
    ],
    "kolomTanggal": "tgl_beli",
    "kolomCari": [
      "no_faktur",
      "kode_suplier",
      "nip",
      "kd_rek"
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
    "id": "btn-ringkasan-pengadaan-dapur",
    "slug": "ringkasan-pengadaan-dapur",
    "judul": "Ringkasan Pengadaan Dapur",
    "kategori": "F",
    "permissionKey": "dapur_ringkasan_pembelian",
    "javaRef": "DapurRingkasanPengadaanBarang",
    "tabel": "dapurpembelian",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
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
        "nama": "subtotal",
        "label": "Subtotal",
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
        "nama": "total",
        "label": "Total",
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
      "kd_rek"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-penerimaan-barang-dapur",
    "slug": "penerimaan-barang-dapur",
    "judul": "Penerimaan Barang Dapur",
    "kategori": "F",
    "permissionKey": "dapur_pemesanan",
    "javaRef": "DapurPemesanan",
    "tabel": "dapurpemesanan",
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
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
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
    "id": "btn-ringkasan-penerimaan-dapur",
    "slug": "ringkasan-penerimaan-dapur",
    "judul": "Ringkasan Penerimaan Dapur",
    "kategori": "F",
    "permissionKey": "ringkasan_penerimaan_dapur",
    "javaRef": "DapurRingkasanPenerimaanBarang",
    "tabel": "dapursuplier",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hibah-dapur",
    "slug": "hibah-dapur",
    "judul": "Hibah Barang Dapur",
    "kategori": "F",
    "permissionKey": "hibah_dapur",
    "javaRef": "DapurHibah",
    "tabel": "dapur_hibah",
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
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_hibah",
    "kolomCari": [
      "no_hibah",
      "kode_pemberi",
      "nip",
      "keterangan"
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
    "id": "btn-pengeluaran-dapur",
    "slug": "pengeluaran-dapur",
    "judul": "Stok Keluar Dapur",
    "kategori": "F",
    "permissionKey": "dapur_stok_keluar",
    "javaRef": "DapurPengeluaran",
    "tabel": "dapurpengeluaran",
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
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_keluar",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-stok-keluar-dapur",
    "slug": "ringkasan-stok-keluar-dapur",
    "judul": "Ringkasan Stok Keluar Dapur",
    "kategori": "F",
    "permissionKey": "ringkasan_stokkeluar_dapur",
    "javaRef": "DapurRingkasanStokKeluarBarang",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-retur-barang-dapur",
    "slug": "retur-barang-dapur",
    "judul": "Retur Ke Suplier Dapur",
    "kategori": "F",
    "permissionKey": "dapur_returbeli",
    "javaRef": "DapurReturBeli",
    "tabel": "dapurreturbeli",
    "kolom": [
      {
        "nama": "no_retur_beli",
        "label": "No. Retur Beli",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tgl_retur",
        "label": "Tgl. Retur",
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
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tgl_retur",
    "kolomCari": [
      "no_retur_beli",
      "nip",
      "kode_suplier",
      "catatan"
    ],
    "kolomUrut": "tgl_retur",
    "kolomRingkasan": {
      "nama": "total",
      "label": "Total Total"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-retur-beli-dapur",
    "slug": "ringkasan-retur-beli-dapur",
    "judul": "Ringkasan Retur Suplier Dapur",
    "kategori": "F",
    "permissionKey": "ringkasan_returbeli_dapur",
    "javaRef": "DapurRingkasanReturBeliBarang",
    "tabel": "dapursuplier",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-riwayat-barang-dapur",
    "slug": "riwayat-barang-dapur",
    "judul": "Riwayat Barang Dapur",
    "kategori": "F",
    "permissionKey": "dapur_riwayat_barang",
    "javaRef": "DapurRiwayatBarang",
    "tabel": "dapur_riwayat_barang",
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
          "Pengadaan",
          "Penerimaan",
          "Retur Beli",
          "Opname",
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
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Simpan",
          "Hapus"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "kode_brng",
      "petugas"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-permintaan-dapur",
    "slug": "permintaan-dapur",
    "judul": "Permintaan Barang Dapur",
    "kategori": "F",
    "permissionKey": "permintaan_dapur",
    "javaRef": "DapurPermintaan",
    "tabel": "permintaan_dapur",
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
        "nama": "ruang",
        "label": "Ruang",
        "tipe": "text",
        "maks": 50
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "ruang",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-r-biaya-dapur",
    "slug": "r-biaya-dapur",
    "judul": "Biaya Pengadaan Dapur",
    "kategori": "F",
    "permissionKey": "biaya_pengadaan_dapur",
    "javaRef": "DapurRBiayaHarian",
    "tabel": "dapurpembelian",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No Faktur",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
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
        "nama": "subtotal",
        "label": "Subtotal",
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
        "nama": "total",
        "label": "Total",
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
      "kd_rek"
    ],
    "kolomUrut": "tgl_beli",
    "kolomRingkasan": {
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-pengadaan-dapur",
    "slug": "rekap-pengadaan-dapur",
    "judul": "Rekap Pengadaan Dapur",
    "kategori": "F",
    "permissionKey": "rekap_pengadaan_dapur",
    "javaRef": "DapurRHPembelian",
    "tabel": "dapursuplier",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-stok-keluar-dapur-per-tanggal",
    "slug": "stok-keluar-dapur-per-tanggal",
    "judul": "Stok Keluar Dapur Per Tanggal",
    "kategori": "F",
    "permissionKey": "dapur_stokkeluar_pertanggal",
    "javaRef": "DapurStokKeluarBarangPerTanggal",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-sirkulasi-dapur",
    "slug": "sirkulasi-dapur",
    "judul": "Sirkulasi Barang Dapur",
    "kategori": "F",
    "permissionKey": "sirkulasi_dapur",
    "javaRef": "DapurSirkulasiBarang",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-dapur2",
    "slug": "sirkulasi-dapur2",
    "judul": "Sirkulasi Barang Dapur 2",
    "kategori": "F",
    "permissionKey": "sirkulasi_dapur2",
    "javaRef": "DapurSirkulasiBarang2",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-verifikasi-penerimaan-dapur",
    "slug": "verifikasi-penerimaan-dapur",
    "judul": "Verifikasi Penerimaan Dapur",
    "kategori": "F",
    "permissionKey": "verifikasi_penerimaan_dapur",
    "javaRef": "DapurVerifikasiPenerimaan",
    "tabel": "dapursuplier",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-nilai-penerimaan-vendor-dapur-per-bulan",
    "slug": "nilai-penerimaan-vendor-dapur-per-bulan",
    "judul": "Nilai Penerimaan Vendor Dapur Per Bulan",
    "kategori": "F",
    "permissionKey": "nilai_penerimaan_vendor_dapur_perbulan",
    "javaRef": "DapurNilaiPenerimaanVendorPerBulan",
    "tabel": "dapurbarang",
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
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "Basah",
          "Kering"
        ]
      },
      {
        "nama": "stok",
        "label": "Stok",
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
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kode_brng",
      "nama_brng",
      "kode_sat"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_DAPUR: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_DAPUR.map((item) => [item.slug, item]),
);

import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_IPSRS: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-jenis-ipsrs",
    "slug": "jenis-ipsrs",
    "judul": "Jenis Barang Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_jenis_barang",
    "javaRef": "IPSRSJenis",
    "tabel": "ipsrsjenisbarang",
    "kolom": [
      {
        "nama": "kd_jenis",
        "label": "Kd Jenis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_jenis",
        "label": "Nm Jenis",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd_jenis",
      "nm_jenis"
    ],
    "kolomUrut": "kd_jenis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-barang-ipsrs",
    "slug": "barang-ipsrs",
    "judul": "Barang Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_barang",
    "javaRef": "IPSRSBarang",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-suplier-ipsrs",
    "slug": "suplier-ipsrs",
    "judul": "Suplier Non Medis",
    "kategori": "E",
    "permissionKey": "suplier_penunjang",
    "javaRef": "IPSRSSuplier",
    "tabel": "ipsrssuplier",
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
    "id": "btn-permintaan-non-medis",
    "slug": "permintaan-non-medis",
    "judul": "Permintaan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "permintaan_non_medis",
    "javaRef": "IPSRSPermintaan",
    "tabel": "permintaan_non_medis",
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
    "id": "btn-rekap-permintaan-non-medis",
    "slug": "rekap-permintaan-non-medis",
    "judul": "Ringkasan Permintaan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "rekap_permintaan_non_medis",
    "javaRef": "DlgRekapPermintaanNonMedis",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-pengajuan-barang-non-medis",
    "slug": "pengajuan-barang-non-medis",
    "judul": "Pengajuan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "pengajuan_barang_nonmedis",
    "javaRef": "IPSRSPengajuanBarangNonMedis",
    "tabel": "pengajuan_barang_nonmedis",
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
    "id": "btn-ringkasan-pengajuan-non-medis",
    "slug": "ringkasan-pengajuan-non-medis",
    "judul": "Ringkasan Pengajuan Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_pengajuan_nonmedis",
    "javaRef": "IPSRSRingkasanPengajuanBarangNonMedis",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-surat-pemesanan-non-medis",
    "slug": "surat-pemesanan-non-medis",
    "judul": "Surat Pemesanan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "surat_pemesanan_non_medis",
    "javaRef": "IPSRSSuratPemesanan",
    "tabel": "surat_pemesanan_non_medis",
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
    "id": "btn-ringkasan-pemesanan-non-medis",
    "slug": "ringkasan-pemesanan-non-medis",
    "judul": "Ringkasan Pemesanan Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_pemesanan_nonmedis",
    "javaRef": "IPSRSRingkasanPemesananBarangNonMedis",
    "tabel": "ipsrssuplier",
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
    "id": "btn-pembelian-ipsrs",
    "slug": "pembelian-ipsrs",
    "judul": "Pengadaan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_pengadaan_barang",
    "javaRef": "IPSRSPembelian",
    "tabel": "ipsrspembelian",
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
    "id": "btn-ringkasan-pengadaan-non-medis",
    "slug": "ringkasan-pengadaan-non-medis",
    "judul": "Ringkasan Pengadaan Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_pengadaan_nonmedis",
    "javaRef": "IPSRSRingkasanPengadaanBarangNonMedis",
    "tabel": "ipsrssuplier",
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
    "id": "btn-penerimaan-non-medis",
    "slug": "penerimaan-non-medis",
    "judul": "Penerimaan Barang Non Medis",
    "kategori": "E",
    "permissionKey": "penerimaan_non_medis",
    "javaRef": "IPSRSPemesanan",
    "tabel": "ipsrspemesanan",
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
    "id": "btn-ringkasan-penerimaan-non-medis",
    "slug": "ringkasan-penerimaan-non-medis",
    "judul": "Ringkasan Penerimaan Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_penerimaan_nonmedis",
    "javaRef": "IPSRSRingkasanPenerimaanBarangNonMedis",
    "tabel": "ipsrssuplier",
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
    "id": "btn-hibah-non-medis",
    "slug": "hibah-non-medis",
    "judul": "Hibah Non Medis",
    "kategori": "E",
    "permissionKey": "hibah_non_medis",
    "javaRef": "IPSRSHibah",
    "tabel": "ipsrs_hibah",
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
    "id": "btn-pengeluaran-ipsrs",
    "slug": "pengeluaran-ipsrs",
    "judul": "Stok Keluar Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_stok_keluar",
    "javaRef": "IPSRSPengeluaran",
    "tabel": "ipsrspengeluaran",
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
    "id": "btn-ringkasan-stok-keluar-non-medis",
    "slug": "ringkasan-stok-keluar-non-medis",
    "judul": "Ringkasan Stok Keluar Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_stokkeluar_nonmedis",
    "javaRef": "IPSRSRingkasanPengeluaranBarangNonMedis",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-retur-barang-non-medis",
    "slug": "retur-barang-non-medis",
    "judul": "Retur Ke Suplier Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_returbeli",
    "javaRef": "IPSRSReturBeli",
    "tabel": "ipsrsreturbeli",
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
    "id": "btn-ringkasan-retur-suplier-non-medis",
    "slug": "ringkasan-retur-suplier-non-medis",
    "judul": "Ringkasan Retur Suplier Non Medis",
    "kategori": "E",
    "permissionKey": "ringkasan_returbeli_nonmedis",
    "javaRef": "IPSRSRingkasanReturBeliBarangNonMedis",
    "tabel": "ipsrssuplier",
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
    "id": "btn-riwayat-barang-non-medis",
    "slug": "riwayat-barang-non-medis",
    "judul": "Riwayat Barang Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_riwayat_barang",
    "javaRef": "IPSRSRiwayatBarang",
    "tabel": "ipsrs_riwayat_barang",
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
          "Pengambilan UTD",
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
    "id": "btn-r-biaya-ipsrs",
    "slug": "r-biaya-ipsrs",
    "judul": "Biaya Pengadaan Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_pengeluaran_harian",
    "javaRef": "DlgRBiayaHarianIPSRS",
    "tabel": "ipsrspembelian",
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
    "id": "btn-rh-masuk-ipsrs",
    "slug": "rh-masuk-ipsrs",
    "judul": "Rekap Pengadaan Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_rekap_pengadaan",
    "javaRef": "DlgRHPembelianIPSRS",
    "tabel": "ipsrssuplier",
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
    "id": "btn-rh-keluar-ipsrs",
    "slug": "rh-keluar-ipsrs",
    "judul": "Rekap Stok Keluar Non Medis",
    "kategori": "E",
    "permissionKey": "ipsrs_rekap_stok_keluar",
    "javaRef": "DlgRHPengeluaranIPSRS",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-pengambilan-penunjang-utd",
    "slug": "pengambilan-penunjang-utd",
    "judul": "Pengambilan UTD",
    "kategori": "E",
    "permissionKey": "pengambilan_penunjang_utd",
    "javaRef": "IPSRSPengambilanPenunjangUTD",
    "tabel": "utd_pengambilan_penunjang",
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
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
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
      "nip",
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
    "id": "btn-pengadaan-ipsrs-per-tanggal",
    "slug": "pengadaan-ipsrs-per-tanggal",
    "judul": "Pengadaan Non Medis Per Tanggal",
    "kategori": "E",
    "permissionKey": "ipsrs_pengadaan_pertanggal",
    "javaRef": "DlgPengadaanIPSRSPerTanggal",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-stok-keluar-ipsrs-per-tanggal",
    "slug": "stok-keluar-ipsrs-per-tanggal",
    "judul": "Stok Keluar Non Medis Per Tanggal",
    "kategori": "E",
    "permissionKey": "ipsrs_stokkeluar_pertanggal",
    "javaRef": "DlgStokKeluarIPSRSPerTanggal",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-rekap-penerimaan-non-medis",
    "slug": "rekap-penerimaan-non-medis",
    "judul": "Rekap Penerimaan Non Medis",
    "kategori": "E",
    "permissionKey": "rekap_pemesanan_non_medis",
    "javaRef": "DlgRekapPenerimaanNonMedis",
    "tabel": "ipsrssuplier",
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
    "id": "btn-opname-ipsrs",
    "slug": "opname-ipsrs",
    "judul": "Stok Opname Non Medis",
    "kategori": "E",
    "permissionKey": "stok_opname_logistik",
    "javaRef": "IPSRSInputStok",
    "tabel": "ipsrsopname",
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
    "id": "btn-sirkulasi-non-medis",
    "slug": "sirkulasi-non-medis",
    "judul": "Sirkulasi Non Medis",
    "kategori": "E",
    "permissionKey": "sirkulasi_non_medis",
    "javaRef": "DlgSirkulasiNonMedis",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-sirkulasi-non-medis2",
    "slug": "sirkulasi-non-medis2",
    "judul": "Sirkulasi Non Medis 2",
    "kategori": "E",
    "permissionKey": "sirkulasi_non_medis2",
    "javaRef": "DlgSirkulasiNonMedis2",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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
    "id": "btn-verifikasi-penerimaan-logistik",
    "slug": "verifikasi-penerimaan-logistik",
    "judul": "Verifikasi Penerimaan Non Medis",
    "kategori": "E",
    "permissionKey": "verifikasi_penerimaan_logistik",
    "javaRef": "IPSRSVerifikasiPenerimaan",
    "tabel": "ipsrssuplier",
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
    "id": "btn-nilai-penerimaan-vendor-non-medis-per-bulan",
    "slug": "nilai-penerimaan-vendor-non-medis-per-bulan",
    "judul": "Nilai Penerimaan Vendor Non Medis Per Bulan",
    "kategori": "E",
    "permissionKey": "nilai_penerimaan_vendor_nonmedis_perbulan",
    "javaRef": "IPSRSNilaiPenerimaanVendorNonMedisPerBulan",
    "tabel": "ipsrsbarang",
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
        "tipe": "text",
        "maks": 5
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
      "kode_sat",
      "jenis"
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

export const PETA_KATALOG_IPSRS: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_IPSRS.map((item) => [item.slug, item]),
);

import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_TOKO: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-suplier-toko",
    "slug": "suplier-toko",
    "judul": "Suplier Toko",
    "kategori": "R",
    "permissionKey": "toko_suplier",
    "javaRef": "TokoSuplier",
    "tabel": "tokosuplier",
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
    "id": "btn-jenis-toko",
    "slug": "jenis-toko",
    "judul": "Jenis Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_jenis",
    "javaRef": "TokoJenis",
    "tabel": "tokojenisbarang",
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
    "id": "btn-barang-toko",
    "slug": "barang-toko",
    "judul": "Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_barang",
    "javaRef": "TokoBarang",
    "tabel": "tokobarang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 40
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
        "nama": "dasar",
        "label": "Dasar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "h_beli",
        "label": "H Beli",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "distributor",
        "label": "Distributor",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "grosir",
        "label": "Grosir",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "retail",
        "label": "Retail",
        "wajib": true,
        "tipe": "number"
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
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-stok-opname-toko",
    "slug": "stok-opname-toko",
    "judul": "Stok Opname Toko",
    "kategori": "R",
    "permissionKey": "stok_opname_toko",
    "javaRef": "TokoInputStok",
    "tabel": "tokoopname",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "dasar",
        "label": "Dasar",
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
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "dasar",
      "label": "Total Dasar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-riwayat-barang-toko",
    "slug": "riwayat-barang-toko",
    "judul": "Riwayat Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_riwayat_barang",
    "javaRef": "TokoRiwayatBarang",
    "tabel": "toko_riwayat_barang",
    "kolom": [
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "tipe": "text",
        "maks": 40
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
          "Piutang",
          "Retur Beli",
          "Retur Jual",
          "Retur Piutang",
          "Opname",
          "Penjualan",
          "Stok Keluar"
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
    "id": "btn-pengajuan-barang-toko",
    "slug": "pengajuan-barang-toko",
    "judul": "Pengajuan Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_pengajuan_barang",
    "javaRef": "TokoPengajuanBarang",
    "tabel": "toko_pengajuan_barang",
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
    "id": "btn-surat-pemesanan-toko",
    "slug": "surat-pemesanan-toko",
    "judul": "Surat Pemesanan Toko",
    "kategori": "R",
    "permissionKey": "toko_surat_pemesanan",
    "javaRef": "TokoSuratPemesanan",
    "tabel": "toko_surat_pemesanan",
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
      "nama": "subtotal",
      "label": "Total Subtotal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penerimaan-barang-toko",
    "slug": "penerimaan-barang-toko",
    "judul": "Penerimaan Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_penerimaan_barang",
    "javaRef": "TokoPemesanan",
    "tabel": "tokopemesanan",
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
          "belum lunas"
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
    "id": "btn-pengadaan-barang-toko",
    "slug": "pengadaan-barang-toko",
    "judul": "Pengadaan Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_pengadaan_barang",
    "javaRef": "TokoPembelian",
    "tabel": "toko_detail_beli",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_brng",
        "label": "Kode Brng",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kode_sat",
        "label": "Kode Sat",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "tipe": "number"
      },
      {
        "nama": "harga",
        "label": "Harga",
        "tipe": "uang"
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
        "nama": "besardis",
        "label": "Besardis",
        "tipe": "uang"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "no_faktur",
      "kode_brng",
      "kode_sat"
    ],
    "kolomUrut": "no_faktur",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-member-toko",
    "slug": "member-toko",
    "judul": "Member Toko",
    "kategori": "R",
    "permissionKey": "toko_member",
    "javaRef": "TokoMember",
    "tabel": "tokomember",
    "kolom": [
      {
        "nama": "no_member",
        "label": "No Member",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama",
        "label": "Nama",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_member",
      "nama",
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
    "id": "btn-penjualan-toko",
    "slug": "penjualan-toko",
    "judul": "Penjualan Toko",
    "kategori": "R",
    "permissionKey": "toko_penjualan",
    "javaRef": "TokoPenjualan",
    "tabel": "tokopenjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nm_member",
        "label": "Nm Member",
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
          "Distributor",
          "Grosir",
          "Retail"
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
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_member",
      "nm_member",
      "keterangan",
      "kd_rek"
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
    "id": "btn-piutang-toko",
    "slug": "piutang-toko",
    "judul": "Piutang Toko",
    "kategori": "R",
    "permissionKey": "toko_piutang",
    "javaRef": "TokoPiutang",
    "tabel": "tokopiutang",
    "kolom": [
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tgl_piutang",
        "label": "Tgl. Piutang",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_member",
        "label": "No. Member",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_member",
        "label": "Nama Member",
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
          "distributor",
          "grosir",
          "retail"
        ]
      },
      {
        "nama": "ongkir",
        "label": "Ongkir",
        "tipe": "number"
      },
      {
        "nama": "uangmuka",
        "label": "Uangmuka",
        "tipe": "uang"
      },
      {
        "nama": "sisapiutang",
        "label": "Sisapiutang",
        "tipe": "uang"
      },
      {
        "nama": "tgltempo",
        "label": "Tgltempo",
        "tipe": "date",
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "nota_piutang",
      "nip",
      "no_member",
      "nm_member",
      "catatan",
      "jns_jual"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-retur-ke-suplier-toko",
    "slug": "retur-ke-suplier-toko",
    "judul": "Retur Ke Suplier Toko",
    "kategori": "R",
    "permissionKey": "toko_retur_beli",
    "javaRef": "TokoReturBeli",
    "tabel": "tokoreturbeli",
    "kolom": [
      {
        "nama": "no_retur_beli",
        "label": "No Retur Beli",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
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
    "id": "btn-retur-jual-toko",
    "slug": "retur-jual-toko",
    "judul": "Retur Jual Toko",
    "kategori": "R",
    "permissionKey": "toko_retur_jual",
    "javaRef": "TokoReturJual",
    "tabel": "tokoreturjual",
    "kolom": [
      {
        "nama": "no_retur_jual",
        "label": "No Retur Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tgl_retur",
    "kolomCari": [
      "no_retur_jual",
      "nip",
      "no_member",
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
    "id": "btn-retur-piutang-toko",
    "slug": "retur-piutang-toko",
    "judul": "Retur Piutang Toko",
    "kategori": "R",
    "permissionKey": "toko_retur_piutang",
    "javaRef": "TokoReturPiutang",
    "tabel": "tokoreturpiutang",
    "kolom": [
      {
        "nama": "no_retur_piutang",
        "label": "No. Retur Piutang",
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
        "nama": "no_member",
        "label": "No. Member",
        "tipe": "text",
        "maks": 10,
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
      "no_retur_piutang",
      "nip",
      "no_member",
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
    "id": "btn-hutang-toko",
    "slug": "hutang-toko",
    "judul": "Hutang Toko",
    "kategori": "R",
    "permissionKey": "toko_hutang",
    "javaRef": "KeuanganHutangToko",
    "tabel": "toko_bayar_pemesanan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "tipe": "date"
      },
      {
        "nama": "no_faktur",
        "label": "No Faktur",
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
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "no_bukti",
        "label": "No Bukti",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "nip",
      "keterangan",
      "nama_bayar",
      "no_bukti"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bayar-pesan-toko",
    "slug": "bayar-pesan-toko",
    "judul": "Bayar Pesan Toko",
    "kategori": "R",
    "permissionKey": "toko_bayar_pemesanan",
    "javaRef": "KeuanganBayarPesanToko",
    "tabel": "tokopemesanan",
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
          "belum lunas"
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
    "id": "btn-pendapatan-harian-toko",
    "slug": "pendapatan-harian-toko",
    "judul": "Pendapatan Harian Toko",
    "kategori": "R",
    "permissionKey": "toko_pendapatan_harian",
    "javaRef": "TokoPendapatanHarian",
    "tabel": "tokopenjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nm_member",
        "label": "Nm Member",
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
          "Distributor",
          "Grosir",
          "Retail"
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
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_member",
      "nm_member",
      "keterangan",
      "kd_rek"
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
    "id": "btn-penjualan-harian-toko",
    "slug": "penjualan-harian-toko",
    "judul": "Penjualan Harian Toko",
    "kategori": "R",
    "permissionKey": "toko_penjualan_harian",
    "javaRef": "TokoPenjualanHarian",
    "tabel": "tokopenjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nm_member",
        "label": "Nm Member",
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
          "Distributor",
          "Grosir",
          "Retail"
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
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_member",
      "nm_member",
      "keterangan",
      "kd_rek"
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
    "id": "btn-piutang-harian-toko",
    "slug": "piutang-harian-toko",
    "judul": "Piutang Harian Toko",
    "kategori": "R",
    "permissionKey": "toko_piutang_harian",
    "javaRef": "TokoPiutangHarian",
    "tabel": "tokopiutang",
    "kolom": [
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_member",
        "label": "Nm Member",
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
          "Distributor",
          "Grosir",
          "Retail"
        ]
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
        "nama": "tgltempo",
        "label": "Tgltempo",
        "wajib": true,
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "nota_piutang",
      "nip",
      "no_member",
      "nm_member",
      "catatan"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "ongkir",
      "label": "Total Ongkir"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-keuntungan-barang-toko",
    "slug": "keuntungan-barang-toko",
    "judul": "Keuntungan Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_keuntungan_barang",
    "javaRef": "TokoKeuntunganBarang",
    "tabel": "tokopenjualan",
    "kolom": [
      {
        "nama": "nota_jual",
        "label": "Nota Jual",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "no_member",
        "label": "No Member",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nm_member",
        "label": "Nm Member",
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
          "Distributor",
          "Grosir",
          "Retail"
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
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_jual",
    "kolomCari": [
      "nota_jual",
      "nip",
      "no_member",
      "nm_member",
      "keterangan",
      "kd_rek"
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
    "id": "btn-bayar-piutang-toko",
    "slug": "bayar-piutang-toko",
    "judul": "Bayar Piutang Toko",
    "kategori": "R",
    "permissionKey": "toko_bayar_piutang",
    "javaRef": "TokoBayarPiutang",
    "tabel": "toko_bayar_piutang",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl. Bayar",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "no_member",
        "label": "No. Member",
        "pk": true,
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "tipe": "uang"
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek_kontra",
        "label": "Kode Rek Kontra",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "tgl_bayar",
      "no_member",
      "catatan",
      "nota_piutang",
      "kd_rek",
      "kd_rek_kontra"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-sirkulasi-barang-toko",
    "slug": "sirkulasi-barang-toko",
    "judul": "Sirkulasi Barang Toko",
    "kategori": "R",
    "permissionKey": "toko_sirkulasi",
    "javaRef": "TokoSirkulasi",
    "tabel": "temporary_toko",
    "kolom": [
      {
        "nama": "no",
        "label": "No",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "temp1",
        "label": "Temp1",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp2",
        "label": "Temp2",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp3",
        "label": "Temp3",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp4",
        "label": "Temp4",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp5",
        "label": "Temp5",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp6",
        "label": "Temp6",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp7",
        "label": "Temp7",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp8",
        "label": "Temp8",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp9",
        "label": "Temp9",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp10",
        "label": "Temp10",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp11",
        "label": "Temp11",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "no",
      "temp1",
      "temp2",
      "temp3",
      "temp4",
      "temp5"
    ],
    "kolomUrut": "no",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-barang-toko2",
    "slug": "sirkulasi-barang-toko2",
    "judul": "Sirkulasi Barang Toko 2",
    "kategori": "R",
    "permissionKey": "toko_sirkulasi2",
    "javaRef": "TokoSirkulasi2",
    "tabel": "temporary_toko",
    "kolom": [
      {
        "nama": "no",
        "label": "No",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "temp1",
        "label": "Temp1",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp2",
        "label": "Temp2",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp3",
        "label": "Temp3",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp4",
        "label": "Temp4",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp5",
        "label": "Temp5",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp6",
        "label": "Temp6",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp7",
        "label": "Temp7",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp8",
        "label": "Temp8",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp9",
        "label": "Temp9",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp10",
        "label": "Temp10",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "temp11",
        "label": "Temp11",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "no",
      "temp1",
      "temp2",
      "temp3",
      "temp4",
      "temp5"
    ],
    "kolomUrut": "no",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_TOKO: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_TOKO.map((item) => [item.slug, item]),
);

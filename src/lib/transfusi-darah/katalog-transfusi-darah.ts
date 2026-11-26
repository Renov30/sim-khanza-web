import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_TRANSFUSI_DARAH: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-pengambilan-utd2",
    "slug": "pengambilan-utd2",
    "judul": "Pengambilan BHP Medis",
    "kategori": "N",
    "permissionKey": "pengambilan_utd2",
    "javaRef": "DlgCariPengambilanUTD",
    "tabel": "utd_stok_medis",
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
        "nama": "stok",
        "label": "Stok",
        "tipe": "number"
      },
      {
        "nama": "hargaterakhir",
        "label": "Hargaterakhir",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kode_brng"
    ],
    "kolomUrut": "kode_brng",
    "kolomRingkasan": {
      "nama": "hargaterakhir",
      "label": "Total Hargaterakhir"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-medis-rusak",
    "slug": "utd-medis-rusak",
    "judul": "BHP Medis Rusak",
    "kategori": "N",
    "permissionKey": "utd_medis_rusak",
    "javaRef": "UTDMedisRusak",
    "tabel": "utd_medis_rusak",
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
      "nama": "hargabeli",
      "label": "Total Hargabeli"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengambilan-penunjang-utd2",
    "slug": "pengambilan-penunjang-utd2",
    "judul": "Pengambilan BHP Non Medis",
    "kategori": "N",
    "permissionKey": "pengambilan_penunjang_utd2",
    "javaRef": "IPSRSCariPengambilanPenunjangUTD",
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
    "id": "btn-utd-penunjang-rusak",
    "slug": "utd-penunjang-rusak",
    "judul": "BHP Non Medis Rusak",
    "kategori": "N",
    "permissionKey": "utd_penunjang_rusak",
    "javaRef": "UTDPenunjangRusak",
    "tabel": "utd_penunjang_rusak",
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
    "id": "btn-utd-komponen-darah",
    "slug": "utd-komponen-darah",
    "judul": "Komponen Darah",
    "kategori": "N",
    "permissionKey": "utd_komponen_darah",
    "javaRef": "UTDKomponenDarah",
    "tabel": "utd_komponen_darah",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama",
        "label": "Nama",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "jasa_sarana",
        "label": "Jasa Sarana",
        "tipe": "uang"
      },
      {
        "nama": "paket_bhp",
        "label": "Paket Bhp",
        "tipe": "number"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      },
      {
        "nama": "manajemen",
        "label": "Manajemen",
        "tipe": "number"
      },
      {
        "nama": "total",
        "label": "Total",
        "tipe": "uang"
      },
      {
        "nama": "pembatalan",
        "label": "Pembatalan",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode",
      "nama"
    ],
    "kolomUrut": "kode",
    "kolomRingkasan": {
      "nama": "jasa_sarana",
      "label": "Total Jasa Sarana"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pendonor-darah",
    "slug": "pendonor-darah",
    "judul": "Pendonor Darah",
    "kategori": "N",
    "permissionKey": "utd_pendonor",
    "javaRef": "UTDPendonor",
    "tabel": "utd_pendonor",
    "kolom": [
      {
        "nama": "no_pendonor",
        "label": "No. Pendonor",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama",
        "label": "Nama",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_ktp",
        "label": "No. KTP",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ],
        "wajib": true
      },
      {
        "nama": "tmp_lahir",
        "label": "Tmp Lahir",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl. Lahir",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kd_kel",
        "label": "Kode Kel",
        "tipe": "number"
      },
      {
        "nama": "kd_kec",
        "label": "Kode Kec",
        "tipe": "number"
      },
      {
        "nama": "kd_kab",
        "label": "Kode Kab",
        "tipe": "number"
      },
      {
        "nama": "kd_prop",
        "label": "Kode Prop",
        "tipe": "number"
      },
      {
        "nama": "golongan_darah",
        "label": "Golongan Darah",
        "tipe": "enum",
        "opsi": [
          "a",
          "ab",
          "b",
          "o"
        ],
        "wajib": true
      },
      {
        "nama": "resus",
        "label": "Resus",
        "tipe": "enum",
        "opsi": [
          "(-)",
          "(+)"
        ],
        "wajib": true
      },
      {
        "nama": "no_telp",
        "label": "No. Telp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_pendonor",
      "nama",
      "no_ktp",
      "jk",
      "tmp_lahir",
      "alamat"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-donor-darah",
    "slug": "utd-donor-darah",
    "judul": "Donor Darah",
    "kategori": "N",
    "permissionKey": "utd_donor",
    "javaRef": "UTDDonor",
    "tabel": "utd_donor",
    "kolom": [
      {
        "nama": "no_donor",
        "label": "No. Donor",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "no_pendonor",
        "label": "No. Pendonor",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "dinas",
        "label": "Dinas",
        "tipe": "enum",
        "opsi": [
          "pagi",
          "siang",
          "sore",
          "malam"
        ]
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "no_bag",
        "label": "No. Bag",
        "tipe": "number"
      },
      {
        "nama": "jenis_bag",
        "label": "Jenis Bag",
        "tipe": "enum",
        "opsi": [
          "sb",
          "db",
          "tb",
          "qb"
        ]
      },
      {
        "nama": "jenis_donor",
        "label": "Jenis Donor",
        "tipe": "enum",
        "opsi": [
          "db",
          "dp",
          "ds"
        ]
      },
      {
        "nama": "tempat_aftap",
        "label": "Tempat Aftap",
        "tipe": "enum",
        "opsi": [
          "dalam gedung",
          "luar gedung"
        ]
      },
      {
        "nama": "petugas_aftap",
        "label": "Petugas Aftap",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "hbsag",
        "label": "Hbsag",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "positif"
        ]
      },
      {
        "nama": "hcv",
        "label": "Hcv",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "positif"
        ]
      },
      {
        "nama": "hiv",
        "label": "HIV",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "positif"
        ]
      },
      {
        "nama": "spilis",
        "label": "Spilis",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "positif"
        ]
      },
      {
        "nama": "malaria",
        "label": "Malaria",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "positif"
        ]
      },
      {
        "nama": "petugas_u_saring",
        "label": "Petugas U Saring",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "aman",
          "cekal"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_donor",
      "no_pendonor",
      "dinas",
      "tensi",
      "jenis_bag",
      "jenis_donor"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-cekal-darah",
    "slug": "utd-cekal-darah",
    "judul": "Pencekalan Darah",
    "kategori": "N",
    "permissionKey": "utd_cekal_darah",
    "javaRef": "UTDCekalDarah",
    "tabel": "utd_cekal_darah",
    "kolom": [
      {
        "nama": "no_donor",
        "label": "No Donor",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "dinas",
        "label": "Dinas",
        "tipe": "enum",
        "opsi": [
          "Pagi",
          "Siang",
          "Sore",
          "Malam"
        ]
      },
      {
        "nama": "petugas_pemusnahan",
        "label": "Petugas Pemusnahan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_donor",
      "petugas_pemusnahan",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-pemisahan-darah",
    "slug": "utd-pemisahan-darah",
    "judul": "Pemisahan Darah",
    "kategori": "N",
    "permissionKey": "utd_pemisahan_darah",
    "javaRef": "UTDPemisahanDarah",
    "tabel": "utd_pemisahan_komponen",
    "kolom": [
      {
        "nama": "no_donor",
        "label": "No Donor",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "dinas",
        "label": "Dinas",
        "tipe": "enum",
        "opsi": [
          "Pagi",
          "Siang",
          "Sore",
          "Malam"
        ]
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_donor",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-stok-darah",
    "slug": "utd-stok-darah",
    "judul": "Stok Darah",
    "kategori": "N",
    "permissionKey": "utd_stok_darah",
    "javaRef": "UTDStokDarah",
    "tabel": "utd_stok_darah",
    "kolom": [
      {
        "nama": "no_kantong",
        "label": "No Kantong",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_komponen",
        "label": "Kode Komponen",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "golongan_darah",
        "label": "Golongan Darah",
        "tipe": "enum",
        "opsi": [
          "A",
          "AB",
          "B",
          "O"
        ]
      },
      {
        "nama": "resus",
        "label": "Resus",
        "tipe": "enum",
        "opsi": [
          "(-)",
          "(+)"
        ]
      },
      {
        "nama": "tanggal_aftap",
        "label": "Tanggal Aftap",
        "tipe": "date"
      },
      {
        "nama": "tanggal_kadaluarsa",
        "label": "Tanggal Kadaluarsa",
        "tipe": "date"
      },
      {
        "nama": "asal_darah",
        "label": "Asal Darah",
        "tipe": "enum",
        "opsi": [
          "Hibah",
          "Beli",
          "Produksi Sendiri"
        ]
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Ada",
          "Diambil",
          "Dimusnahkan"
        ]
      }
    ],
    "kolomTanggal": "tanggal_aftap",
    "kolomCari": [
      "no_kantong",
      "kode_komponen"
    ],
    "kolomUrut": "tanggal_aftap",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-utd-penyerahan-darah",
    "slug": "utd-penyerahan-darah",
    "judul": "Penyerahan Darah",
    "kategori": "N",
    "permissionKey": "utd_penyerahan_darah",
    "javaRef": "UTDPenyerahanDarah",
    "tabel": "utd_penyerahan_darah",
    "kolom": [
      {
        "nama": "no_penyerahan",
        "label": "No Penyerahan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "dinas",
        "label": "Dinas",
        "tipe": "enum",
        "opsi": [
          "Pagi",
          "Siang",
          "Sore",
          "Malam"
        ]
      },
      {
        "nama": "nip_cross",
        "label": "Nip Cross",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
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
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "pengambil_darah",
        "label": "Pengambil Darah",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "alamat_pengambil_darah",
        "label": "Alamat Pengambil Darah",
        "tipe": "text",
        "maks": 120
      },
      {
        "nama": "nip_pj",
        "label": "Nip Pj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besarppn",
        "label": "Besarppn",
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_penyerahan",
      "nip_cross",
      "keterangan",
      "kd_rek",
      "pengambil_darah",
      "alamat_pengambil_darah"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "besarppn",
      "label": "Total Besarppn"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_TRANSFUSI_DARAH: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_TRANSFUSI_DARAH.map((item) => [item.slug, item]),
);

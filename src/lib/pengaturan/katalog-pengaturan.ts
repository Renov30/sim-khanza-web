import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_PENGATURAN: readonly DefinisiModulKatalog[] = [
  {
    "id": "pengaturan-instansi",
    "slug": "pengaturan-instansi",
    "judul": "Identitas Instansi / RS",
    "kategori": "T",
    "permissionKey": "admin",
    "javaRef": "DlgSetAplikasi",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "email",
        "label": "Email",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "manajemen-user",
    "slug": "manajemen-user",
    "judul": "Manajemen Akun & Hak Akses",
    "kategori": "T",
    "permissionKey": "admin",
    "javaRef": "DlgUser",
    "tabel": "user",
    "kolom": [
      {
        "nama": "id_user",
        "label": "Id User",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "penyakit",
        "label": "Penyakit",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "obat_penyakit",
        "label": "Obat Penyakit",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "dokter",
        "label": "Dokter",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "jadwal_praktek",
        "label": "Jadwal Praktek",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "pasien",
        "label": "Pasien",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "registrasi",
        "label": "Registrasi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tindakan_ralan",
        "label": "Tindakan Ralan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "kamar_inap",
        "label": "Kamar Inap",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tindakan_ranap",
        "label": "Tindakan Ranap",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "operasi",
        "label": "Operasi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      }
    ],
    "kolomCari": [
      "id_user"
    ],
    "kolomUrut": "id_user",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-setup-aplikasi",
    "slug": "setup-aplikasi",
    "judul": "Set Aplikasi",
    "kategori": "T",
    "permissionKey": "aplikasi",
    "javaRef": "DlgSetAplikasi",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "email",
        "label": "Email",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-admin",
    "slug": "admin",
    "judul": "Set Admin",
    "kategori": "T",
    "permissionKey": "admin",
    "javaRef": "DlgAdmin",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-set-penjab",
    "slug": "set-penjab",
    "judul": "Set P.J. Unit Penunjang",
    "kategori": "T",
    "permissionKey": "setup_pjlab",
    "javaRef": "DlgSetPenjabLab",
    "tabel": "set_pjlab",
    "kolom": [
      {
        "nama": "kd_dokterlab",
        "label": "Kd Dokterlab",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokterrad",
        "label": "Kd Dokterrad",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokterhemodialisa",
        "label": "Kd Dokterhemodialisa",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokterutd",
        "label": "Kd Dokterutd",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokterlabpa",
        "label": "Kd Dokterlabpa",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokterlabmb",
        "label": "Kd Dokterlabmb",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_dokterlab",
      "kd_dokterrad",
      "kd_dokterhemodialisa",
      "kd_dokterutd",
      "kd_dokterlabpa",
      "kd_dokterlabmb"
    ],
    "kolomUrut": "kd_dokterlab",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-setup-oto-lokasi",
    "slug": "setup-oto-lokasi",
    "judul": "Set Oto Lokasi",
    "kategori": "T",
    "permissionKey": "setup_otolokasi",
    "javaRef": "DlgSetOtoLokasi",
    "tabel": "set_depo_ralan",
    "kolom": [
      {
        "nama": "kd_poli",
        "label": "Kd Poli",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kd_poli",
      "kd_bangsal"
    ],
    "kolomUrut": "kd_poli",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-setup-jam-inap",
    "slug": "setup-jam-inap",
    "judul": "Set Kamar Inap",
    "kategori": "T",
    "permissionKey": "setup_jam_kamin",
    "javaRef": "DlgSetKamarInap",
    "tabel": "set_jam_minimal",
    "kolom": [
      {
        "nama": "lamajam",
        "label": "Lamajam",
        "tipe": "number"
      },
      {
        "nama": "hariawal",
        "label": "Hariawal",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "feeperujuk",
        "label": "Feeperujuk",
        "tipe": "number"
      },
      {
        "nama": "diagnosaakhir",
        "label": "Diagnosaakhir",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "bayi",
        "label": "Bayi",
        "tipe": "number"
      },
      {
        "nama": "aktifkan_hapus_data_salah",
        "label": "Aktifkan Hapus Data Salah",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "kamar_inap_kasir_ralan",
        "label": "Kamar Inap Kasir Ralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "ubah_status_kamar",
        "label": "Ubah Status Kamar",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "hariawal",
      "diagnosaakhir",
      "aktifkan_hapus_data_salah",
      "kamar_inap_kasir_ralan",
      "ubah_status_kamar"
    ],
    "kolomUrut": "lamajam",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-set-harga-kamar",
    "slug": "set-harga-kamar",
    "judul": "Set Harga Kamar",
    "kategori": "T",
    "permissionKey": "set_harga_kamar",
    "javaRef": "DlgSetHargaKamar",
    "tabel": "set_harga_kamar",
    "kolom": [
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "tarif",
        "label": "Tarif",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_kamar",
      "kd_pj"
    ],
    "kolomUrut": "kd_kamar",
    "kolomRingkasan": {
      "nama": "tarif",
      "label": "Total Tarif"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-setup-embalase",
    "slug": "setup-embalase",
    "judul": "Set Embalase & Tuslah",
    "kategori": "T",
    "permissionKey": "setup_embalase",
    "javaRef": "DlgSetEmbalase",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "email",
        "label": "Email",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-user",
    "slug": "user",
    "judul": "Set User",
    "kategori": "T",
    "permissionKey": "user",
    "javaRef": "DlgUser",
    "tabel": "user",
    "kolom": [
      {
        "nama": "id_user",
        "label": "Id User",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "penyakit",
        "label": "Penyakit",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "obat_penyakit",
        "label": "Obat Penyakit",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "dokter",
        "label": "Dokter",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "jadwal_praktek",
        "label": "Jadwal Praktek",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "petugas",
        "label": "Petugas",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "pasien",
        "label": "Pasien",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "registrasi",
        "label": "Registrasi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tindakan_ralan",
        "label": "Tindakan Ralan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "kamar_inap",
        "label": "Kamar Inap",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tindakan_ranap",
        "label": "Tindakan Ranap",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "operasi",
        "label": "Operasi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      }
    ],
    "kolomCari": [
      "id_user"
    ],
    "kolomUrut": "id_user",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-tracker",
    "slug": "tracker",
    "judul": "Tracker Login",
    "kategori": "T",
    "permissionKey": "tracer_login",
    "javaRef": "DlgPenelusuranLogin",
    "tabel": "tracker",
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
        "nama": "tgl_login",
        "label": "Tgl Login",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_login",
        "label": "Jam Login",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_login",
    "kolomCari": [
      "nip"
    ],
    "kolomUrut": "tgl_login",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-vakum",
    "slug": "vakum",
    "judul": "Vakum Table",
    "kategori": "T",
    "permissionKey": "vakum",
    "javaRef": "DlgVakum",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "email",
        "label": "Email",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-display",
    "slug": "display",
    "judul": "Display Antrian Registrasi & Poli",
    "kategori": "T",
    "permissionKey": "display",
    "javaRef": "DlgRunTeks",
    "tabel": "runtext",
    "kolom": [
      {
        "nama": "teks",
        "label": "Teks",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "teks",
      "aktifkan"
    ],
    "kolomUrut": "teks",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-display-apotek",
    "slug": "display-apotek",
    "judul": "Display Antrian Apotek",
    "kategori": "T",
    "permissionKey": "display_apotek",
    "javaRef": "DlgRunTeksApotek",
    "tabel": "runtextapotek",
    "kolom": [
      {
        "nama": "teks",
        "label": "Teks",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "teks",
      "aktifkan"
    ],
    "kolomUrut": "teks",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-setup-harga",
    "slug": "setup-harga",
    "judul": "Set Harga Obat",
    "kategori": "T",
    "permissionKey": "set_harga_obat",
    "javaRef": "DlgSetHarga",
    "tabel": "setpenjualanumum",
    "kolom": [
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
      }
    ],
    "kolomCari": [
      "ralan",
      "kelas1",
      "kelas2",
      "kelas3"
    ],
    "kolomUrut": "ralan",
    "kolomRingkasan": {
      "nama": "ralan",
      "label": "Total Ralan"
    },
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-set-obat-ralan",
    "slug": "set-obat-ralan",
    "judul": "Set Obat Ralan",
    "kategori": "T",
    "permissionKey": "set_harga_obat_ralan",
    "javaRef": "DlgSetHargaObatRalan",
    "tabel": "set_harga_obat_ralan",
    "kolom": [
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "hargajual",
        "label": "Hargajual",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_pj"
    ],
    "kolomUrut": "kd_pj",
    "kolomRingkasan": {
      "nama": "hargajual",
      "label": "Total Hargajual"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-set-obat-ranap",
    "slug": "set-obat-ranap",
    "judul": "Set Obat Ranap",
    "kategori": "T",
    "permissionKey": "set_harga_obat_ranap",
    "javaRef": "DlgSetHargaObatRanap",
    "tabel": "set_harga_obat_ranap",
    "kolom": [
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kelas",
        "label": "Kelas",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Kelas Utama",
          "Kelas VIP",
          "Kelas VVIP"
        ]
      },
      {
        "nama": "hargajual",
        "label": "Hargajual",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kelas",
      "kd_pj"
    ],
    "kolomUrut": "kd_pj",
    "kolomRingkasan": {
      "nama": "hargajual",
      "label": "Total Hargajual"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-setup-tarif",
    "slug": "setup-tarif",
    "judul": "Set Penggunaan Tarif",
    "kategori": "T",
    "permissionKey": "set_penggunaan_tarif",
    "javaRef": "DlgSetTarif",
    "tabel": "setting",
    "kolom": [
      {
        "nama": "nama_instansi",
        "label": "Nama Instansi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_instansi",
        "label": "Alamat Instansi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kabupaten",
        "label": "Kabupaten",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "propinsi",
        "label": "Propinsi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontak",
        "label": "Kontak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "email",
        "label": "Email",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "aktifkan",
        "label": "Aktifkan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kode_ppk",
        "label": "Kode Ppk",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkinhealth",
        "label": "Kode Ppkinhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kode_ppkkemenkes",
        "label": "Kode Ppkkemenkes",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "nama_instansi",
      "alamat_instansi",
      "kabupaten",
      "propinsi",
      "kontak",
      "email"
    ],
    "kolomUrut": "nama_instansi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-set-oto-ralan",
    "slug": "set-oto-ralan",
    "judul": "Set Oto Ralan",
    "kategori": "T",
    "permissionKey": "set_oto_ralan",
    "javaRef": "DlgSetOtoRalan",
    "tabel": "set_otomatis_tindakan_ralan",
    "kolom": [
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomCari": [
      "kd_dokter",
      "kd_jenis_prw",
      "kd_pj"
    ],
    "kolomUrut": "kd_dokter",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-set-biaya-harian",
    "slug": "set-biaya-harian",
    "judul": "Biaya Harian",
    "kategori": "T",
    "permissionKey": "biaya_harian",
    "javaRef": "DlgBiayaHarian",
    "tabel": "biaya_harian",
    "kolom": [
      {
        "nama": "kd_kamar",
        "label": "Kode Kamar",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_biaya",
        "label": "Nama Biaya",
        "pk": true,
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "besar_biaya",
        "label": "Besar Biaya",
        "tipe": "uang"
      },
      {
        "nama": "jml",
        "label": "Jml",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kd_kamar",
      "nama_biaya"
    ],
    "kolomUrut": "kd_kamar",
    "kolomRingkasan": {
      "nama": "besar_biaya",
      "label": "Total Besar Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-set-biaya-masuk-sekali",
    "slug": "set-biaya-masuk-sekali",
    "judul": "Biaya Masuk Sekali",
    "kategori": "T",
    "permissionKey": "biaya_masuk_sekali",
    "javaRef": "DlgBiayaSekaliMasuk",
    "tabel": "biaya_sekali",
    "kolom": [
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_biaya",
        "label": "Nama Biaya",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "besar_biaya",
        "label": "Besar Biaya",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_kamar",
      "nama_biaya"
    ],
    "kolomUrut": "kd_kamar",
    "kolomRingkasan": {
      "nama": "besar_biaya",
      "label": "Total Besar Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-setup-rm",
    "slug": "setup-rm",
    "judul": "Set RM",
    "kategori": "T",
    "permissionKey": "set_no_rm",
    "javaRef": "DlgSetRM",
    "tabel": "set_no_rkm_medis",
    "kolom": [
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-setup-nota",
    "slug": "setup-nota",
    "judul": "Set Billing",
    "kategori": "T",
    "permissionKey": "set_nota",
    "javaRef": "DlgSetNota",
    "tabel": "set_nota",
    "kolom": [
      {
        "nama": "notaralan",
        "label": "Notaralan",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "kwitansiralan",
        "label": "Kwitansiralan",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "nota1ranap",
        "label": "Nota1ranap",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "nota2ranap",
        "label": "Nota2ranap",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "kwitansiranap",
        "label": "Kwitansiranap",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "notaapotek",
        "label": "Notaapotek",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "notalabrad",
        "label": "Notalabrad",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "notatoko",
        "label": "Notatoko",
        "tipe": "text",
        "maks": 11,
        "wajib": true
      },
      {
        "nama": "cetaknotasimpanralan",
        "label": "Cetaknotasimpanralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "cetaknotasimpanranap",
        "label": "Cetaknotasimpanranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "rinciandokterralan",
        "label": "Rinciandokterralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "rinciandokterranap",
        "label": "Rinciandokterranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "centangdokterralan",
        "label": "Centangdokterralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "centangdokterranap",
        "label": "Centangdokterranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "tampilkan_administrasi_di_billingranap",
        "label": "Tampilkan Administrasi Di Billingranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "rincianoperasi",
        "label": "Rincianoperasi",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "tampilkan_ppnobat_ralan",
        "label": "Tampilkan Ppnobat Ralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "tampilkan_ppnobat_ranap",
        "label": "Tampilkan Ppnobat Ranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "tampilkan_tombol_nota_ralan",
        "label": "Tampilkan Tombol Nota Ralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "tampilkan_tombol_nota_ranap",
        "label": "Tampilkan Tombol Nota Ranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "verifikasi_penjualan_di_kasir",
        "label": "Verifikasi Penjualan Di Kasir",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "verifikasi_penyerahan_darah_di_kasir",
        "label": "Verifikasi Penyerahan Darah Di Kasir",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "cetaknotasimpanpenjualan",
        "label": "Cetaknotasimpanpenjualan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "tampilkan_tombol_nota_penjualan",
        "label": "Tampilkan Tombol Nota Penjualan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "centangobatralan",
        "label": "Centangobatralan",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "centangobatranap",
        "label": "Centangobatranap",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ]
      },
      {
        "nama": "cetaknotasimpantoko",
        "label": "Cetaknotasimpantoko",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      },
      {
        "nama": "tampilkan_tombol_nota_toko",
        "label": "Tampilkan Tombol Nota Toko",
        "tipe": "enum",
        "opsi": [
          "yes",
          "no"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "notaralan",
      "kwitansiralan",
      "nota1ranap",
      "nota2ranap",
      "kwitansiranap",
      "notaapotek"
    ],
    "kolomUrut": "notaralan",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-closing-kasir",
    "slug": "closing-kasir",
    "judul": "Closing Kasir",
    "kategori": "T",
    "permissionKey": "closing_kasir",
    "javaRef": "DlgClosingKasir",
    "tabel": "closing_kasir",
    "kolom": [
      {
        "nama": "shift",
        "label": "Shift",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Pagi",
          "Siang",
          "Sore",
          "Malam"
        ]
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "jam_pulang",
        "label": "Jam Pulang",
        "wajib": true,
        "tipe": "time"
      }
    ],
    "kolomCari": [
      "shift"
    ],
    "kolomUrut": "shift",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-keterlambatan-presensi",
    "slug": "keterlambatan-presensi",
    "judul": "Set Keterlambatan Presensi",
    "kategori": "T",
    "permissionKey": "keterlambatan_presensi",
    "javaRef": "DlgSetKeterlambatan",
    "tabel": "set_keterlambatan",
    "kolom": [
      {
        "nama": "toleransi",
        "label": "Toleransi",
        "tipe": "number"
      },
      {
        "nama": "terlambat1",
        "label": "Terlambat1",
        "tipe": "number"
      },
      {
        "nama": "terlambat2",
        "label": "Terlambat2",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "toleransi",
      "terlambat1",
      "terlambat2"
    ],
    "kolomUrut": "toleransi",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-set-input-parsial",
    "slug": "set-input-parsial",
    "judul": "Set Input Parsial",
    "kategori": "T",
    "permissionKey": "set_input_parsial",
    "javaRef": "DlgSetInputParsial",
    "tabel": "set_input_parsial",
    "kolom": [
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomCari": [
      "kd_pj"
    ],
    "kolomUrut": "kd_pj",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-password-asuransi",
    "slug": "password-asuransi",
    "judul": "Password BPJS",
    "kategori": "T",
    "permissionKey": "password_asuransi",
    "javaRef": "DlgPasswordBPJS",
    "tabel": "password_asuransi",
    "kolom": [
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomCari": [
      "kd_pj"
    ],
    "kolomUrut": "kd_pj",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-set-harga-toko",
    "slug": "set-harga-toko",
    "judul": "Set Harga Toko",
    "kategori": "T",
    "permissionKey": "toko_set_harga",
    "javaRef": "DlgSetHargaToko",
    "tabel": "tokosetharga",
    "kolom": [
      {
        "nama": "distributor",
        "label": "Distributor",
        "tipe": "number"
      },
      {
        "nama": "grosir",
        "label": "Grosir",
        "tipe": "number"
      },
      {
        "nama": "retail",
        "label": "Retail",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "distributor",
      "grosir",
      "retail"
    ],
    "kolomUrut": "distributor",
    "kolomRingkasan": {
      "nama": "distributor",
      "label": "Total Distributor"
    },
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-jam-diet-pasien",
    "slug": "jam-diet-pasien",
    "judul": "Jam Diet Pasien",
    "kategori": "T",
    "permissionKey": "jam_diet_pasien",
    "javaRef": "DlgJamDietPasien",
    "tabel": "jam_diet_pasien",
    "kolom": [
      {
        "nama": "waktu",
        "label": "Waktu",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Pagi",
          "Pagi2",
          "Pagi3",
          "Siang",
          "Siang2",
          "Siang3",
          "Sore",
          "Sore2",
          "Sore3",
          "Malam",
          "Malam2",
          "Malam3"
        ]
      },
      {
        "nama": "jam",
        "label": "Jam",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "waktu",
      "jam"
    ],
    "kolomUrut": "waktu",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ruang-operasi",
    "slug": "ruang-operasi",
    "judul": "Ruang Operasi",
    "kategori": "T",
    "permissionKey": "ruang_ok",
    "javaRef": "DlgRuangOperasi",
    "tabel": "ruang_ok",
    "kolom": [
      {
        "nama": "kd_ruang_ok",
        "label": "Kd Ruang Ok",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nm_ruang_ok",
        "label": "Nm Ruang Ok",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd_ruang_ok",
      "nm_ruang_ok"
    ],
    "kolomUrut": "kd_ruang_ok",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_PENGATURAN: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_PENGATURAN.map((item) => [item.slug, item]),
);

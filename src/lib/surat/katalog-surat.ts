import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_SURAT: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-surat-indeks",
    "slug": "surat-indeks",
    "judul": "Indeks Surat",
    "kategori": "P",
    "permissionKey": "surat_indeks",
    "javaRef": "SuratIndeks",
    "tabel": "surat_indeks",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "indeks",
        "label": "Indeks",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "indeks"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-map",
    "slug": "surat-map",
    "judul": "Map Surat",
    "kategori": "P",
    "permissionKey": "surat_map",
    "javaRef": "SuratMap",
    "tabel": "surat_map",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "map",
        "label": "Map",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "map"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-almari",
    "slug": "surat-almari",
    "judul": "Almari Surat",
    "kategori": "P",
    "permissionKey": "surat_almari",
    "javaRef": "SuratAlmari",
    "tabel": "surat_lemari",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "lemari",
        "label": "Lemari",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "lemari"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-rak",
    "slug": "surat-rak",
    "judul": "Rak Surat",
    "kategori": "P",
    "permissionKey": "surat_rak",
    "javaRef": "SuratRak",
    "tabel": "surat_rak",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rak",
        "label": "Rak",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "rak"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-ruang",
    "slug": "surat-ruang",
    "judul": "Ruang Surat",
    "kategori": "P",
    "permissionKey": "surat_ruang",
    "javaRef": "SuratRuang",
    "tabel": "surat_ruang",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "ruang",
        "label": "Ruang",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "ruang"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-klasifikasi",
    "slug": "surat-klasifikasi",
    "judul": "Klasifikasi Surat",
    "kategori": "P",
    "permissionKey": "surat_klasifikasi",
    "javaRef": "SuratKlasifikasi",
    "tabel": "surat_klasifikasi",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "klasifikasi",
        "label": "Klasifikasi",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "klasifikasi"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-status",
    "slug": "surat-status",
    "judul": "Status Surat",
    "kategori": "P",
    "permissionKey": "surat_status",
    "javaRef": "SuratStatus",
    "tabel": "surat_status",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "status"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-sifat",
    "slug": "surat-sifat",
    "judul": "Sifat Surat",
    "kategori": "P",
    "permissionKey": "surat_sifat",
    "javaRef": "SuratSifat",
    "tabel": "surat_sifat",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "sifat",
        "label": "Sifat",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "sifat"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-balas",
    "slug": "surat-balas",
    "judul": "Stts Balas Surat",
    "kategori": "P",
    "permissionKey": "surat_balas",
    "javaRef": "SuratBalas",
    "tabel": "surat_balas",
    "kolom": [
      {
        "nama": "kd",
        "label": "Kd",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "balas",
        "label": "Balas",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd",
      "balas"
    ],
    "kolomUrut": "kd",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-masuk",
    "slug": "surat-masuk",
    "judul": "Surat Masuk",
    "kategori": "P",
    "permissionKey": "surat_masuk",
    "javaRef": "SuratMasuk",
    "tabel": "surat_masuk",
    "kolom": [
      {
        "nama": "no_urut",
        "label": "No. Urut",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "asal",
        "label": "Asal",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tujuan",
        "label": "Tujuan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_surat",
        "label": "Tgl. Surat",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "perihal",
        "label": "Perihal",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_terima",
        "label": "Tgl. Terima",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kd_lemari",
        "label": "Kode Lemari",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_rak",
        "label": "Kode Rak",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_map",
        "label": "Kode Map",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_ruang",
        "label": "Kode Ruang",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_sifat",
        "label": "Kode Sifat",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "lampiran",
        "label": "Lampiran",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tembusan",
        "label": "Tembusan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_deadline_balas",
        "label": "Tgl. Deadline Balas",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kd_balas",
        "label": "Kode Balas",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "kd_status",
        "label": "Kode Status",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_klasifikasi",
        "label": "Kode Klasifikasi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "file_url",
        "label": "File Url",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_surat",
    "kolomCari": [
      "no_urut",
      "no_surat",
      "asal",
      "tujuan",
      "perihal",
      "kd_lemari"
    ],
    "kolomUrut": "tgl_surat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-keluar",
    "slug": "surat-keluar",
    "judul": "Surat Keluar",
    "kategori": "P",
    "permissionKey": "surat_keluar",
    "javaRef": "SuratKeluar",
    "tabel": "surat_keluar",
    "kolom": [
      {
        "nama": "no_urut",
        "label": "No. Urut",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "tujuan",
        "label": "Tujuan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_surat",
        "label": "Tgl. Surat",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "perihal",
        "label": "Perihal",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_kirim",
        "label": "Tgl. Kirim",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kd_lemari",
        "label": "Kode Lemari",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_rak",
        "label": "Kode Rak",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_map",
        "label": "Kode Map",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_ruang",
        "label": "Kode Ruang",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_sifat",
        "label": "Kode Sifat",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "lampiran",
        "label": "Lampiran",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tembusan",
        "label": "Tembusan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tgl_deadline_balas",
        "label": "Tgl. Deadline Balas",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kd_balas",
        "label": "Kode Balas",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "kd_status",
        "label": "Kode Status",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_klasifikasi",
        "label": "Kode Klasifikasi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "file_url",
        "label": "File Url",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_surat",
    "kolomCari": [
      "no_urut",
      "no_surat",
      "tujuan",
      "perihal",
      "kd_lemari",
      "kd_rak"
    ],
    "kolomUrut": "tgl_surat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-sakit",
    "slug": "surat-sakit",
    "judul": "Surat Keterangan Sakit",
    "kategori": "P",
    "permissionKey": "surat_sakit",
    "javaRef": "SuratSakit",
    "tabel": "suratsakit",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalawal",
        "label": "Tanggalawal",
        "tipe": "date"
      },
      {
        "nama": "tanggalakhir",
        "label": "Tanggalakhir",
        "tipe": "date"
      },
      {
        "nama": "lamasakit",
        "label": "Lamasakit",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggalawal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "lamasakit"
    ],
    "kolomUrut": "tanggalawal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-sakit-pihak2",
    "slug": "surat-sakit-pihak2",
    "judul": "Surat Keterangan Sakit Pihak 2",
    "kategori": "P",
    "permissionKey": "surat_sakit_pihak_2",
    "javaRef": "SuratSakitPihak2",
    "tabel": "suratsakitpihak2",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalawal",
        "label": "Tanggalawal",
        "tipe": "date"
      },
      {
        "nama": "tanggalakhir",
        "label": "Tanggalakhir",
        "tipe": "date"
      },
      {
        "nama": "lamasakit",
        "label": "Lamasakit",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nama2",
        "label": "Nama2",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl. Lahir",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "umur",
        "label": "Umur",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ],
        "wajib": true
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "enum",
        "opsi": [
          "suami",
          "istri",
          "anak",
          "ayah",
          "saudara",
          "keponakan"
        ],
        "wajib": true
      },
      {
        "nama": "pekerjaan",
        "label": "Pekerjaan",
        "tipe": "enum",
        "opsi": [
          "karyawan swasta",
          "pns",
          "wiraswasta",
          "pelajar",
          "mahasiswa",
          "buruh",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "instansi",
        "label": "Instansi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggalawal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "lamasakit",
      "nama2",
      "umur",
      "jk"
    ],
    "kolomUrut": "tanggalawal",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-surat-hamil",
    "slug": "surat-hamil",
    "judul": "Surat Hamil",
    "kategori": "P",
    "permissionKey": "surat_hamil",
    "javaRef": "SuratTidakHamil",
    "tabel": "surat_hamil",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "hasilperiksa",
        "label": "Hasilperiksa",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "tidak ditemukan tanda-tanda kehamilan",
          "ditemukan tanda-tanda kehamilan"
        ]
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "no_surat",
      "no_rawat"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-cuti-hamil",
    "slug": "surat-cuti-hamil",
    "judul": "Surat Cuti Hamil",
    "kategori": "P",
    "permissionKey": "surat_cuti_hamil",
    "javaRef": "SuratCutiHamil",
    "tabel": "surat_cuti_hamil",
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
        "nama": "keterangan_hamil",
        "label": "Keterangan Hamil",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "terhitung_mulai",
        "label": "Terhitung Mulai",
        "tipe": "date"
      },
      {
        "nama": "perkiraan_lahir",
        "label": "Perkiraan Lahir",
        "tipe": "date"
      },
      {
        "nama": "no_surat",
        "label": "No Surat",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "terhitung_mulai",
    "kolomCari": [
      "no_rawat",
      "keterangan_hamil",
      "no_surat"
    ],
    "kolomUrut": "terhitung_mulai",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skdpbpjs",
    "slug": "skdpbpjs",
    "judul": "Surat Kontrol",
    "kategori": "P",
    "permissionKey": "skdp_bpjs",
    "javaRef": "SuratKontrol",
    "tabel": "skdp_bpjs",
    "kolom": [
      {
        "nama": "tahun",
        "label": "Tahun",
        "pk": true,
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "alasan1",
        "label": "Alasan1",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alasan2",
        "label": "Alasan2",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "rtl1",
        "label": "Rtl1",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "rtl2",
        "label": "Rtl2",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "tanggal_datang",
        "label": "Tanggal Datang",
        "tipe": "datetime"
      },
      {
        "nama": "tanggal_rujukan",
        "label": "Tanggal Rujukan",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "no_antrian",
        "label": "No. Antrian",
        "pk": true,
        "tipe": "text",
        "maks": 6,
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "menunggu",
          "sudah periksa",
          "batal periksa"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "tahun",
      "no_rkm_medis",
      "diagnosa",
      "terapi",
      "alasan1",
      "alasan2"
    ],
    "kolomUrut": "tanggal_datang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true,
    "kolomTanggal": "tanggal_datang"
  },
  {
    "id": "btn-surat-bebas-narkoba",
    "slug": "surat-bebas-narkoba",
    "judul": "Surat Bebas Narkoba",
    "kategori": "P",
    "permissionKey": "surat_bebas_narkoba",
    "javaRef": "SuratBebasNarkoba",
    "tabel": "surat_skbn",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalsurat",
        "label": "Tanggalsurat",
        "tipe": "date"
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "UMUM",
          "POLRI",
          "TNI"
        ]
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "opiat",
        "label": "Opiat",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      },
      {
        "nama": "ganja",
        "label": "Ganja",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      },
      {
        "nama": "amphetamin",
        "label": "Amphetamin",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      },
      {
        "nama": "methamphetamin",
        "label": "Methamphetamin",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      },
      {
        "nama": "benzodiazepin",
        "label": "Benzodiazepin",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      },
      {
        "nama": "cocain",
        "label": "Cocain",
        "tipe": "enum",
        "opsi": [
          "NEGATIF",
          "POSITIF"
        ]
      }
    ],
    "kolomTanggal": "tanggalsurat",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "kd_dokter",
      "keperluan"
    ],
    "kolomUrut": "tanggalsurat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-keterangan-covid",
    "slug": "surat-keterangan-covid",
    "judul": "Surat Keterangan Covid",
    "kategori": "P",
    "permissionKey": "surat_keterangan_covid",
    "javaRef": "SuratKeteranganCovid",
    "tabel": "surat_keterangan_covid",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "igm",
        "label": "Igm",
        "tipe": "enum",
        "opsi": [
          "REAKTIF",
          "NON REAKTIF"
        ]
      },
      {
        "nama": "igg",
        "label": "Igg",
        "tipe": "enum",
        "opsi": [
          "REAKTIF",
          "NON REAKTIF"
        ]
      },
      {
        "nama": "sehat",
        "label": "Sehat",
        "tipe": "enum",
        "opsi": [
          "X",
          "V"
        ]
      },
      {
        "nama": "tidaksehat",
        "label": "Tidaksehat",
        "tipe": "enum",
        "opsi": [
          "X",
          "V"
        ]
      },
      {
        "nama": "berlakumulai",
        "label": "Berlakumulai",
        "tipe": "date"
      },
      {
        "nama": "berlakuselsai",
        "label": "Berlakuselsai",
        "tipe": "date"
      }
    ],
    "kolomTanggal": "berlakumulai",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "kd_dokter",
      "nip"
    ],
    "kolomUrut": "berlakumulai",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-keterangan-rawat-inap",
    "slug": "surat-keterangan-rawat-inap",
    "judul": "Surat Keterangan Rawat Inap",
    "kategori": "P",
    "permissionKey": "surat_keterangan_rawat_inap",
    "javaRef": "SuratKeteranganRawatInap",
    "tabel": "surat_keterangan_rawat_inap",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalawal",
        "label": "Tanggalawal",
        "tipe": "date"
      },
      {
        "nama": "tanggalakhir",
        "label": "Tanggalakhir",
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tanggalawal",
    "kolomCari": [
      "no_surat",
      "no_rawat"
    ],
    "kolomUrut": "tanggalawal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-keterangan-sehat",
    "slug": "surat-keterangan-sehat",
    "judul": "Surat Keterangan Sehat",
    "kategori": "P",
    "permissionKey": "surat_keterangan_sehat",
    "javaRef": "SuratKeteranganSehat",
    "tabel": "surat_keterangan_sehat",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalsurat",
        "label": "Tanggalsurat",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "berat",
        "label": "Berat",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "tinggi",
        "label": "Tinggi",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "wajib": true,
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "butawarna",
        "label": "Butawarna",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Tidak Sehat"
        ]
      }
    ],
    "kolomTanggal": "tanggalsurat",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "berat",
      "tinggi",
      "tensi",
      "suhu"
    ],
    "kolomUrut": "tanggalsurat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-bebas-tbc",
    "slug": "surat-bebas-tbc",
    "judul": "Surat Bebas TBC",
    "kategori": "P",
    "permissionKey": "surat_bebas_tbc",
    "javaRef": "SuratKeteranganBebasTBC",
    "tabel": "surat_bebas_tbc",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalsurat",
        "label": "Tanggalsurat",
        "tipe": "date"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggalsurat",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "kd_dokter",
      "keperluan"
    ],
    "kolomUrut": "tanggalsurat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-buta-warna",
    "slug": "surat-buta-warna",
    "judul": "Surat Keterangan Buta Warna",
    "kategori": "P",
    "permissionKey": "surat_buta_warna",
    "javaRef": "SuratButaWarna",
    "tabel": "surat_buta_warna",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "hasilperiksa",
        "label": "Hasilperiksa",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Tidak Buta Warna",
          "Buta Warna"
        ]
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "no_surat",
      "no_rawat"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-bebas-tato",
    "slug": "surat-bebas-tato",
    "judul": "Surat Bebas Tato",
    "kategori": "P",
    "permissionKey": "surat_bebas_tato",
    "javaRef": "SuratBebasTato",
    "tabel": "surat_bebas_tato",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "hasilperiksa",
        "label": "Hasilperiksa",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Bebas Tato",
          "Bertato"
        ]
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "keperluan"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-keterangan-layak-terbang",
    "slug": "surat-keterangan-layak-terbang",
    "judul": "Surat Keterangan Layak Terbang",
    "kategori": "P",
    "permissionKey": "surat_keterangan_layak_terbang",
    "javaRef": "SuratKeteranganLayakTerbang",
    "tabel": "surat_keterangan_layak_terbang",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggal_periksa",
        "label": "Tanggal Periksa",
        "tipe": "date"
      },
      {
        "nama": "kehamilan",
        "label": "Kehamilan",
        "tipe": "text",
        "maks": 4
      }
    ],
    "kolomTanggal": "tanggal_periksa",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "kehamilan"
    ],
    "kolomUrut": "tanggal_periksa",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-kewaspadaan-kesehatan",
    "slug": "surat-kewaspadaan-kesehatan",
    "judul": "Surat Kewaspadaan Kesehatan",
    "kategori": "P",
    "permissionKey": "surat_kewaspadaan_kesehatan",
    "javaRef": "SuratKewaspadaanKesehatan",
    "tabel": "surat_kewaspadaan_kesehatan",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "keluhan_saat_ini",
        "label": "Keluhan Saat Ini",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "keluhan_saat_ini",
      "keperluan"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengumuman-e-pasien",
    "slug": "pengumuman-e-pasien",
    "judul": "Pengumuman E-Pasien",
    "kategori": "P",
    "permissionKey": "pengumuman_epasien",
    "javaRef": "PengumumanEPasien",
    "tabel": "pengumuman_epasien",
    "kolom": [
      {
        "nama": "nik",
        "label": "Nik",
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
        "nama": "pengumuman",
        "label": "Pengumuman",
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "nik",
      "pengumuman"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-template-persetujuan-penolakan-tindakan",
    "slug": "template-persetujuan-penolakan-tindakan",
    "judul": "Template Persetujuan Penolakan Tindakan",
    "kategori": "P",
    "permissionKey": "template_persetujuan_penolakan_tindakan",
    "javaRef": "MasterTemplatePersetujuanPenolakanTindakan",
    "tabel": "template_persetujuan_penolakan_tindakan",
    "kolom": [
      {
        "nama": "kode_template",
        "label": "Kode Template",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "indikasi_tindakan",
        "label": "Indikasi Tindakan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tata_cara",
        "label": "Tata Cara",
        "wajib": true,
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "tujuan",
        "label": "Tujuan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "risiko",
        "label": "Risiko",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "komplikasi",
        "label": "Komplikasi",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "prognosis",
        "label": "Prognosis",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "alternatif_dan_risikonya",
        "label": "Alternatif Dan Risikonya",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "lain_lain",
        "label": "Lain Lain",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kode_template",
      "diagnosa",
      "tindakan",
      "indikasi_tindakan",
      "tata_cara",
      "tujuan"
    ],
    "kolomUrut": "kode_template",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-penolakan-tindakan",
    "slug": "persetujuan-penolakan-tindakan",
    "judul": "Persetujuan/Penolakan Tindakan",
    "kategori": "P",
    "permissionKey": "persetujuan_penolakan_tindakan",
    "javaRef": "SuratPersetujuanPenolakanTindakan",
    "tabel": "persetujuan_penolakan_tindakan",
    "kolom": [
      {
        "nama": "no_pernyataan",
        "label": "No. Pernyataan",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "diagnosa_konfirmasi",
        "label": "Diagnosa Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tindakan_konfirmasi",
        "label": "Tindakan Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "indikasi_tindakan",
        "label": "Indikasi Tindakan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "indikasi_tindakan_konfirmasi",
        "label": "Indikasi Tindakan Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tata_cara",
        "label": "Tata Cara",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "tata_cara_konfirmasi",
        "label": "Tata Cara Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "tujuan",
        "label": "Tujuan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tujuan_konfirmasi",
        "label": "Tujuan Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "risiko",
        "label": "Risiko",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "risiko_konfirmasi",
        "label": "Risiko Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "komplikasi",
        "label": "Komplikasi",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "komplikasi_konfirmasi",
        "label": "Komplikasi Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "prognosis",
        "label": "Prognosis",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "prognosis_konfirmasi",
        "label": "Prognosis Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "alternatif_dan_risikonya",
        "label": "Alternatif Dan Risikonya",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "alternatif_konfirmasi",
        "label": "Alternatif Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "tipe": "uang"
      },
      {
        "nama": "biaya_konfirmasi",
        "label": "Biaya Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "lain_lain",
        "label": "Lain Lain",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "lain_lain_konfirmasi",
        "label": "Lain Lain Konfirmasi",
        "tipe": "enum",
        "opsi": [
          "true",
          "false"
        ]
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
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
        "nama": "penerima_informasi",
        "label": "Penerima Informasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "alasan_diwakilkan_penerima_informasi",
        "label": "Alasan Diwakilkan Penerima Informasi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "jk_penerima_informasi",
        "label": "Jk Penerima Informasi",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_lahir_penerima_informasi",
        "label": "Tanggal Lahir Penerima Informasi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "umur_penerima_informasi",
        "label": "Umur Penerima Informasi",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "alamat_penerima_informasi",
        "label": "Alamat Penerima Informasi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "no_hp",
        "label": "No. Hp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "hubungan_penerima_informasi",
        "label": "Hubungan Penerima Informasi",
        "tipe": "enum",
        "opsi": [
          "diri sendiri",
          "orang tua",
          "anak",
          "saudara kandung",
          "teman",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pernyataan",
        "label": "Pernyataan",
        "tipe": "enum",
        "opsi": [
          "belum dikonfirmasi",
          "persetujuan",
          "penolakan"
        ],
        "wajib": true
      },
      {
        "nama": "saksi_keluarga",
        "label": "Saksi Keluarga",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pernyataan",
      "no_rawat",
      "diagnosa",
      "diagnosa_konfirmasi",
      "tindakan",
      "tindakan_konfirmasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-pulang-atas-permintan-sendiri",
    "slug": "persetujuan-pulang-atas-permintan-sendiri",
    "judul": "Pulang Atas Permintaan Sendiri",
    "kategori": "P",
    "permissionKey": "surat_pulang_atas_permintaan_sendiri",
    "javaRef": "SuratPulangAtasPermintaanSendiri",
    "tabel": "surat_pulang_atas_permintaan_sendiri",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_pulang",
        "label": "Tgl Pulang",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "rs_pilihan",
        "label": "Rs Pilihan",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "lahir",
        "label": "Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "umur",
        "label": "Umur",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "jkpj",
        "label": "Jkpj",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Suami",
          "Istri",
          "Anak",
          "Ayah",
          "Ibu",
          "Saudara",
          "Keponakan"
        ]
      },
      {
        "nama": "saksi_keluarga",
        "label": "Saksi Keluarga",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_pulang",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "rs_pilihan",
      "nama_pj",
      "umur",
      "alamat"
    ],
    "kolomUrut": "tgl_pulang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pernyataan-pasien-umum",
    "slug": "pernyataan-pasien-umum",
    "judul": "Pernyataan Pasien Umum",
    "kategori": "P",
    "permissionKey": "surat_pernyataan_pasien_umum",
    "javaRef": "SuratPernyataanPasienUmum",
    "tabel": "surat_pernyataan_pasien_umum",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
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
        "tipe": "date"
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "no_ktppj",
        "label": "No Ktppj",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tempat_lahirpj",
        "label": "Tempat Lahirpj",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "lahirpj",
        "label": "Lahirpj",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jkpj",
        "label": "Jkpj",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
      },
      {
        "nama": "alamatpj",
        "label": "Alamatpj",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Suami",
          "Istri",
          "Anak",
          "Ayah",
          "Ibu",
          "Saudara",
          "Keponakan"
        ]
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nama_pj",
      "no_ktppj",
      "tempat_lahirpj",
      "alamatpj"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-umum",
    "slug": "persetujuan-umum",
    "judul": "Persetujuan Umum",
    "kategori": "P",
    "permissionKey": "surat_persetujuan_umum",
    "javaRef": "SuratPersetujuanUmum",
    "tabel": "surat_persetujuan_umum",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
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
        "tipe": "date"
      },
      {
        "nama": "pengobatan_kepada",
        "label": "Pengobatan Kepada",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Suami",
          "Istri",
          "Anak",
          "Ayah",
          "Ibu",
          "Saudara",
          "Keponakan",
          "Adik",
          "Kakak",
          "Orang Tua",
          "Diri Sendiri",
          "-"
        ]
      },
      {
        "nama": "nilai_kepercayaan",
        "label": "Nilai Kepercayaan",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "umur_pj",
        "label": "Umur Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "no_ktppj",
        "label": "No Ktppj",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jkpj",
        "label": "Jkpj",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
      },
      {
        "nama": "bertindak_atas",
        "label": "Bertindak Atas",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Suami",
          "Istri",
          "Anak",
          "Ayah",
          "Saudara",
          "Keponakan",
          "Cucu",
          "Kakek",
          "Nenek",
          "Kakak",
          "Adik",
          "Diri Sendiri",
          "Ibu"
        ]
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nilai_kepercayaan",
      "nama_pj",
      "umur_pj",
      "no_ktppj"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-rawat-inap",
    "slug": "persetujuan-rawat-inap",
    "judul": "Persetujuan Rawat Inap",
    "kategori": "P",
    "permissionKey": "surat_persetujuan_rawat_inap",
    "javaRef": "SuratPersetujuanRawatInap",
    "tabel": "surat_persetujuan_rawat_inap",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "no_ktppj",
        "label": "No. Ktppj",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "pendidikan_pj",
        "label": "Pendidikan Pj",
        "tipe": "enum",
        "opsi": [
          "ts",
          "tk",
          "sd",
          "smp",
          "sma",
          "slta/sederajat",
          "d1",
          "d2",
          "d3",
          "d4",
          "s1",
          "s2",
          "s3",
          "-"
        ]
      },
      {
        "nama": "alamatpj",
        "label": "Alamatpj",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "no_telppj",
        "label": "No. Telppj",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ruang",
        "label": "Ruang",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kelas",
        "label": "Kelas",
        "tipe": "enum",
        "opsi": [
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip"
        ]
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "enum",
        "opsi": [
          "suami",
          "istri",
          "anak",
          "ayah",
          "ibu",
          "saudara",
          "keponakan",
          "diri saya"
        ],
        "wajib": true
      },
      {
        "nama": "hak_kelas",
        "label": "Hak Kelas",
        "tipe": "enum",
        "opsi": [
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip",
          "-"
        ]
      },
      {
        "nama": "nama_alamat_keluarga_terdekat",
        "label": "Nama Alamat Keluarga Terdekat",
        "tipe": "text",
        "maks": 130
      },
      {
        "nama": "bayar_secara",
        "label": "Bayar Secara",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nama_pj",
      "no_ktppj",
      "pendidikan_pj",
      "alamatpj"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-penundaan-pelayanan",
    "slug": "persetujuan-penundaan-pelayanan",
    "judul": "Persetujuan Penundaan Pelayanan",
    "kategori": "P",
    "permissionKey": "persetujuan_penundaan_pelayanan",
    "javaRef": "SuratPersetujuanPenundaanPelayanan",
    "tabel": "persetujuan_penundaan_pelayanan",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "umur_pj",
        "label": "Umur Pj",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "no_ktppj",
        "label": "No. Ktppj",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "alamatpj",
        "label": "Alamatpj",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "no_telppj",
        "label": "No. Telppj",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "enum",
        "opsi": [
          "suami",
          "istri",
          "anak",
          "ayah",
          "ibu",
          "saudara",
          "keponakan",
          "diri sendiri"
        ]
      },
      {
        "nama": "ruang",
        "label": "Ruang",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "dokter_pengirim",
        "label": "Dokter Pengirim",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "pelayanan_dilakukan",
        "label": "Pelayanan Dilakukan",
        "tipe": "text",
        "maks": 120
      },
      {
        "nama": "ditunda_karena",
        "label": "Ditunda Karena",
        "tipe": "enum",
        "opsi": [
          "kerusakan alat",
          "kondisi umum pasien",
          "penundaan penjadwalan",
          "pemadaman instalasi listrik",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_ditunda",
        "label": "Keterangan Ditunda",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alternatif_diberikan",
        "label": "Alternatif Diberikan",
        "tipe": "enum",
        "opsi": [
          "dijadwalkan ulang",
          "dirujuk ke layanan kesehatan lain",
          "dikembalikan kepada dokter pengirim",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_alternatif_diberikan",
        "label": "Keterangan Alternatif Diberikan",
        "tipe": "text",
        "maks": 50,
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
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nama_pj",
      "umur_pj",
      "no_ktppj",
      "alamatpj"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-menolak-anjuran-medis",
    "slug": "master-menolak-anjuran-medis",
    "judul": "Master Menolak Anjuran Medis",
    "kategori": "P",
    "permissionKey": "master_menolak_anjuran_medis",
    "javaRef": "MasterMenolakAnjuranMedis",
    "tabel": "master_menolak_anjuran_medis",
    "kolom": [
      {
        "nama": "kode_penolakan",
        "label": "Kode Penolakan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_penolakan",
        "label": "Nama Penolakan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode_penolakan",
      "nama_penolakan"
    ],
    "kolomUrut": "kode_penolakan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penolakan-anjuran-medis",
    "slug": "penolakan-anjuran-medis",
    "judul": "Penolakan Anjuran Medis",
    "kategori": "P",
    "permissionKey": "penolakan_anjuran_medis",
    "javaRef": "SuratPenolakanAnjuranMedis",
    "tabel": "surat_penolakan_anjuran_medis",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "enum",
        "opsi": [
          "suami",
          "istri",
          "anak",
          "ayah",
          "ibu",
          "saudara",
          "keponakan",
          "adik",
          "kakak",
          "orang tua",
          "diri sendiri",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "nama_pj",
        "label": "Nama Pj",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "umur_pj",
        "label": "Umur Pj",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "no_ktppj",
        "label": "No. Ktppj",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "jkpj",
        "label": "Jkpj",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ],
        "wajib": true
      },
      {
        "nama": "no_telp",
        "label": "No. Telp",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kode_penolakan",
        "label": "Kode Penolakan",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "alasan_penolakan",
        "label": "Alasan Penolakan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "informasi_risiko_penolakan",
        "label": "Informasi Risiko Penolakan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "hubungan",
      "nama_pj",
      "umur_pj",
      "no_ktppj"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-persetujuan-pemeriksaan-hiv",
    "slug": "persetujuan-pemeriksaan-hiv",
    "judul": "Persetujuan Pemeriksaan HIV",
    "kategori": "P",
    "permissionKey": "surat_persetujuan_pemeriksaan_hiv",
    "javaRef": "SuratPersetujuanPemeriksaanHIV",
    "tabel": "surat_persetujuan_pemeriksaan_hiv",
    "kolom": [
      {
        "nama": "no_surat",
        "label": "No Surat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
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
        "tipe": "date"
      },
      {
        "nama": "nik",
        "label": "Nik",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nik"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-surat-pernyataan-memilih-dpjp",
    "slug": "surat-pernyataan-memilih-dpjp",
    "judul": "Surat Pernyataan Memilih DPJP",
    "kategori": "P",
    "permissionKey": "surat_pernyataan_memilih_dpjp",
    "javaRef": "SuratPernyataanMemilihDPJP",
    "tabel": "surat_pernyataan_memilih_dpjp",
    "kolom": [
      {
        "nama": "no_pernyataan",
        "label": "No Pernyataan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pembuat_pernyataan",
        "label": "Pembuat Pernyataan",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alamat_pembuat_pernyataan",
        "label": "Alamat Pembuat Pernyataan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_lahir_pembuat_pernyataan",
        "label": "Tgl Lahir Pembuat Pernyataan",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jk_pembuat_pernyataan",
        "label": "Jk Pembuat Pernyataan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "L",
          "P"
        ]
      },
      {
        "nama": "hubungan_pembuat_pernyataan",
        "label": "Hubungan Pembuat Pernyataan",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Diri Sendiri",
          "Istri",
          "Suami",
          "Kerabat",
          "Orang Tua",
          "Anak",
          "Saudara Kandung",
          "Teman",
          "Lain-lain"
        ]
      },
      {
        "nama": "saksi_keluarga",
        "label": "Saksi Keluarga",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pernyataan",
      "no_rawat",
      "kd_dokter",
      "nip",
      "pembuat_pernyataan",
      "alamat_pembuat_pernyataan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_SURAT: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_SURAT.map((item) => [item.slug, item]),
);

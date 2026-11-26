import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_LAPORAN: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-icd9",
    "slug": "icd9",
    "judul": "ICD 9",
    "kategori": "J",
    "permissionKey": "icd9",
    "javaRef": "DlgICD9",
    "tabel": "icd9",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "deskripsi_panjang",
        "label": "Deskripsi Panjang",
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "deskripsi_pendek",
        "label": "Deskripsi Pendek",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "deskripsi_panjang",
      "deskripsi_pendek"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-icd",
    "slug": "icd",
    "judul": "ICD 10",
    "kategori": "J",
    "permissionKey": "penyakit",
    "javaRef": "DlgPenyakit",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kode Penyakit",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nm_penyakit",
        "label": "Nama Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 5000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kode Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "menular",
          "tidak menular"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg",
      "status"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penyakit-pd3-i",
    "slug": "penyakit-pd3-i",
    "judul": "Penyakit AFP & PD3I",
    "kategori": "J",
    "permissionKey": "penyakit_pd3i",
    "javaRef": "DlgPenyakitPd3i",
    "tabel": "penyakit_pd3i",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kode Penyakit",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_penyakit"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-surveilans-pd3-i",
    "slug": "surveilans-pd3-i",
    "judul": "Surveilans AFP & PD3I",
    "kategori": "J",
    "permissionKey": "surveilans_pd3i",
    "javaRef": "DlgDkkSurveilansPD3I",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-surveilans-ralan",
    "slug": "surveilans-ralan",
    "judul": "Surveilans Ralan",
    "kategori": "J",
    "permissionKey": "surveilans_ralan",
    "javaRef": "DlgDkkSurveilansRalan",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-surveilans-ranap",
    "slug": "surveilans-ranap",
    "judul": "Surveilans Ranap",
    "kategori": "J",
    "permissionKey": "surveilans_ranap",
    "javaRef": "DlgDkkSurveilansRanap",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pny-tak-menular-ralan",
    "slug": "pny-tak-menular-ralan",
    "judul": "Pny Tdk Menular Ralan",
    "kategori": "J",
    "permissionKey": "pny_takmenular_ralan",
    "javaRef": "DlgDkkPenyakitTidakMenularRalan",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pny-tak-menular-ranap",
    "slug": "pny-tak-menular-ranap",
    "judul": "Pny Tdk Menular Ranap",
    "kategori": "J",
    "permissionKey": "pny_takmenular_ranap",
    "javaRef": "DlgDkkPenyakitTidakMenularRanap",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pny-menular-ralan",
    "slug": "pny-menular-ralan",
    "judul": "Pny Menular Ralan",
    "kategori": "J",
    "permissionKey": "penyakit_menular_ralan",
    "javaRef": "DlgDkkPenyakitMenularRalan",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pny-menular-ranap",
    "slug": "pny-menular-ranap",
    "judul": "Pny Menular Ranap",
    "kategori": "J",
    "permissionKey": "penyakit_menular_ranap",
    "javaRef": "DlgDkkPenyakitMenularRanap",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-obat-penyakit",
    "slug": "obat-penyakit",
    "judul": "Obat Penyakit",
    "kategori": "J",
    "permissionKey": "obat_penyakit",
    "javaRef": "DlgObatPenyakit",
    "tabel": "obat_penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kode Penyakit",
        "pk": true,
        "tipe": "text",
        "maks": 15,
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
        "nama": "referensi",
        "label": "Referensi",
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "kode_brng",
      "referensi"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-frekuensi-ralan",
    "slug": "frekuensi-ralan",
    "judul": "Frekuensi Penyakit Ralan",
    "kategori": "J",
    "permissionKey": "penyakit_ralan",
    "javaRef": "DlgFrekuensiPenyakitRalan",
    "tabel": "temporary_surveilens_penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_penyakit2",
        "label": "Kd Penyakit2",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "kd_penyakit2"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-frekuensi-ranap",
    "slug": "frekuensi-ranap",
    "judul": "Frekuensi Penyakit Ranap",
    "kategori": "J",
    "permissionKey": "penyakit_ranap",
    "javaRef": "DlgFrekuensiPenyakitRanap",
    "tabel": "temporary_surveilens_penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_penyakit2",
        "label": "Kd Penyakit2",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "kd_penyakit2"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-ralan",
    "slug": "kunjungan-ralan",
    "judul": "Kunjungan Ralan",
    "kategori": "J",
    "permissionKey": "kunjungan_ralan",
    "javaRef": "DlgKunjunganRalan",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-ranap",
    "slug": "kunjungan-ranap",
    "judul": "Kunjungan Ranap",
    "kategori": "J",
    "permissionKey": "kunjungan_ranap",
    "javaRef": "DlgKunjunganRanap",
    "tabel": "dpjp_ranap",
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
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "no_rawat",
      "kd_dokter"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kedatangan-pasien-per-jam",
    "slug": "kedatangan-pasien-per-jam",
    "judul": "Kedatangan Pasien Per Jam",
    "kategori": "J",
    "permissionKey": "kedatangan_pasien",
    "javaRef": "LaporanKedatanganPasienPerJam",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-kunjungan",
    "slug": "rekap-kunjungan",
    "judul": "Rekap Kunjungan",
    "kategori": "J",
    "permissionKey": "rekap_kunjungan",
    "javaRef": "DlgRekapKunjungan",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-lab-ralan",
    "slug": "kunjungan-lab-ralan",
    "judul": "Kunjungan Lab Ralan",
    "kategori": "J",
    "permissionKey": "kunjungan_permintaan_lab",
    "javaRef": "DlgKunjunganLabRalan",
    "tabel": "periksa_lab",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-lab-ranap",
    "slug": "kunjungan-lab-ranap",
    "judul": "Kunjungan Lab Ranap",
    "kategori": "J",
    "permissionKey": "kunjungan_permintaan_lab2",
    "javaRef": "DlgKunjunganLabRanap",
    "tabel": "periksa_lab",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-rad-ralan",
    "slug": "kunjungan-rad-ralan",
    "judul": "Kunjungan Radiologi Ralan",
    "kategori": "J",
    "permissionKey": "kunjungan_permintaan_radiologi",
    "javaRef": "DlgKunjunganRadRalan",
    "tabel": "periksa_radiologi",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-rad-ranap",
    "slug": "kunjungan-rad-ranap",
    "judul": "Kunjungan Radiologi Ranap",
    "kategori": "J",
    "permissionKey": "kunjungan_permintaan_radiologi2",
    "javaRef": "DlgKunjunganRadRanap",
    "tabel": "periksa_radiologi",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sensus-harian-poli",
    "slug": "sensus-harian-poli",
    "judul": "Sensus Harian Poli",
    "kategori": "J",
    "permissionKey": "sensus_harian_poli",
    "javaRef": "DlgSensusHarianPoli",
    "tabel": "rujuk",
    "kolom": [
      {
        "nama": "no_rujuk",
        "label": "No Rujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "rujuk_ke",
        "label": "Rujuk Ke",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tgl_rujuk",
        "label": "Tgl Rujuk",
        "tipe": "date"
      },
      {
        "nama": "keterangan_diagnosa",
        "label": "Keterangan Diagnosa",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kat_rujuk",
        "label": "Kat Rujuk",
        "tipe": "enum",
        "opsi": [
          "-",
          "Bedah",
          "Non Bedah",
          "Kebidanan",
          "Anak"
        ]
      },
      {
        "nama": "ambulance",
        "label": "Ambulance",
        "tipe": "enum",
        "opsi": [
          "-",
          "AGD",
          "SENDIRI",
          "SWASTA"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "jam",
        "label": "Jam",
        "tipe": "time"
      }
    ],
    "kolomTanggal": "tgl_rujuk",
    "kolomCari": [
      "no_rujuk",
      "no_rawat",
      "rujuk_ke",
      "keterangan_diagnosa",
      "kd_dokter",
      "keterangan"
    ],
    "kolomUrut": "tgl_rujuk",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sensus-harian-ralan",
    "slug": "sensus-harian-ralan",
    "judul": "Sensus Harian Ralan",
    "kategori": "J",
    "permissionKey": "sensus_harian_ralan",
    "javaRef": "DlgSensusHarianRalan",
    "tabel": "temporary_sensus_harian",
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
    "id": "btn-rl13-ketersediaan-kamar",
    "slug": "rl13-ketersediaan-kamar",
    "judul": "RL 1.3 Ketersediaan Tempat Tidur",
    "kategori": "J",
    "permissionKey": "rl1_3_ketersediaan_kamar",
    "javaRef": "DlgRL13KetersediaanTempatTidur",
    "tabel": "bangsal",
    "kolom": [
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_bangsal",
        "label": "Nm Bangsal",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kd_bangsal",
      "nm_bangsal"
    ],
    "kolomUrut": "kd_bangsal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl32",
    "slug": "rl32",
    "judul": "RL 3.2 Rawat Darurat",
    "kategori": "J",
    "permissionKey": "rl32",
    "javaRef": "DlgRl32",
    "tabel": "rujuk_masuk",
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
        "nama": "perujuk",
        "label": "Perujuk",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "no_rujuk",
        "label": "No Rujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jm_perujuk",
        "label": "Jm Perujuk",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kategori_rujuk",
        "label": "Kategori Rujuk",
        "tipe": "enum",
        "opsi": [
          "-",
          "Bedah",
          "Non-Bedah",
          "Kebidanan",
          "Anak"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "no_balasan",
        "label": "No Balasan",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "no_rawat",
      "perujuk",
      "alamat",
      "no_rujuk",
      "dokter_perujuk",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl33",
    "slug": "rl33",
    "judul": "RL 3.3 Gigi dan Mulut",
    "kategori": "J",
    "permissionKey": "rl33",
    "javaRef": "DlgRl33",
    "tabel": "rawat_jl_dr",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "material",
        "label": "Material",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_tindakandr",
        "label": "Tarif Tindakandr",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      },
      {
        "nama": "menejemen",
        "label": "Menejemen",
        "tipe": "number"
      },
      {
        "nama": "biaya_rawat",
        "label": "Biaya Rawat",
        "tipe": "uang"
      },
      {
        "nama": "stts_bayar",
        "label": "Stts Bayar",
        "tipe": "enum",
        "opsi": [
          "Sudah",
          "Belum",
          "Suspen"
        ]
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl34",
    "slug": "rl34",
    "judul": "RL 3.4 Kebidanan",
    "kategori": "J",
    "permissionKey": "rl34",
    "javaRef": "DlgRl34",
    "tabel": "paket_operasi",
    "kolom": [
      {
        "nama": "kode_paket",
        "label": "Kode Paket",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "Kebidanan",
          "Operasi"
        ]
      },
      {
        "nama": "operator1",
        "label": "Operator1",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "operator2",
        "label": "Operator2",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "operator3",
        "label": "Operator3",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "asisten_operator1",
        "label": "Asisten Operator1",
        "tipe": "number"
      },
      {
        "nama": "asisten_operator2",
        "label": "Asisten Operator2",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "asisten_operator3",
        "label": "Asisten Operator3",
        "tipe": "number"
      },
      {
        "nama": "instrumen",
        "label": "Instrumen",
        "tipe": "number"
      },
      {
        "nama": "dokter_anak",
        "label": "Dokter Anak",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "perawaat_resusitas",
        "label": "Perawaat Resusitas",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_paket",
      "nm_perawatan"
    ],
    "kolomUrut": "kode_paket",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl36",
    "slug": "rl36",
    "judul": "RL 3.6 Pembedahan",
    "kategori": "J",
    "permissionKey": "rl36",
    "javaRef": "DlgRl36",
    "tabel": "paket_operasi",
    "kolom": [
      {
        "nama": "kode_paket",
        "label": "Kode Paket",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "Kebidanan",
          "Operasi"
        ]
      },
      {
        "nama": "operator1",
        "label": "Operator1",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "operator2",
        "label": "Operator2",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "operator3",
        "label": "Operator3",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "asisten_operator1",
        "label": "Asisten Operator1",
        "tipe": "number"
      },
      {
        "nama": "asisten_operator2",
        "label": "Asisten Operator2",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "asisten_operator3",
        "label": "Asisten Operator3",
        "tipe": "number"
      },
      {
        "nama": "instrumen",
        "label": "Instrumen",
        "tipe": "number"
      },
      {
        "nama": "dokter_anak",
        "label": "Dokter Anak",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "perawaat_resusitas",
        "label": "Perawaat Resusitas",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_paket",
      "nm_perawatan"
    ],
    "kolomUrut": "kode_paket",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl37",
    "slug": "rl37",
    "judul": "RL 3.7 Radiologi",
    "kategori": "J",
    "permissionKey": "rl37",
    "javaRef": "DlgRl37",
    "tabel": "periksa_radiologi",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl38",
    "slug": "rl38",
    "judul": "RL 3.8 Laboratorium",
    "kategori": "J",
    "permissionKey": "rl38",
    "javaRef": "DlgRl38",
    "tabel": "periksa_lab",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl4a",
    "slug": "rl4a",
    "judul": "RL 4A Morbiditas Ranap",
    "kategori": "J",
    "permissionKey": "rl4a",
    "javaRef": "DlgRL4A",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl4b",
    "slug": "rl4b",
    "judul": "RL 4B Morbiditas Ralan",
    "kategori": "J",
    "permissionKey": "rl4b",
    "javaRef": "DlgRL4B",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl4asebab",
    "slug": "rl4asebab",
    "judul": "RL 4A Sebab Morbiditas Ranap",
    "kategori": "J",
    "permissionKey": "rl4asebab",
    "javaRef": "DlgRL4ASebab",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rl4bsebab",
    "slug": "rl4bsebab",
    "judul": "RL 4B Sebab Morbiditas Ralan",
    "kategori": "J",
    "permissionKey": "rl4bsebab",
    "javaRef": "DlgRL4BSebab",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-pelayanan-ralan",
    "slug": "lama-pelayanan-ralan",
    "judul": "Lama Pelayanan Ralan",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_ralan",
    "javaRef": "DlgPelayananRalan",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-pelayanan-apotek",
    "slug": "lama-pelayanan-apotek",
    "judul": "Lama Pelayanan Apotek",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_apotek",
    "javaRef": "DlgPelayananApotek",
    "tabel": "temporary_resep",
    "kolom": [
      {
        "nama": "no",
        "label": "No",
        "wajib": true,
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
      "temp1",
      "temp2",
      "temp3",
      "temp4",
      "temp5",
      "temp6"
    ],
    "kolomUrut": "no",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-pelayanan-radiologi",
    "slug": "lama-pelayanan-radiologi",
    "judul": "Lama Pelayanan Radiologi",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_radiologi",
    "javaRef": "DlgPelayananRadiologi",
    "tabel": "temporary_lama_pelayanan_radiologi",
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
    "id": "btn-lama-pelayanan-lab",
    "slug": "lama-pelayanan-lab",
    "judul": "Lama Pelayanan Lab PK",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_lab",
    "javaRef": "DlgPelayananLab",
    "tabel": "temporary_lama_pelayanan_radiologi",
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
    "id": "btn-lama-pelayanan-lab-pa",
    "slug": "lama-pelayanan-lab-pa",
    "judul": "Lama Pelayanan Lab PA",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_lab",
    "javaRef": "DlgPelayananLabPA",
    "tabel": "temporary_lama_pelayanan_radiologi",
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
    "id": "btn-lama-pelayanan-lab-mb",
    "slug": "lama-pelayanan-lab-mb",
    "judul": "Lama Pelayanan Lab MB",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_lab",
    "javaRef": "DlgPelayananLabMB",
    "tabel": "temporary_lama_pelayanan_radiologi",
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
    "id": "btn-lama-pelayanan-poli",
    "slug": "lama-pelayanan-poli",
    "judul": "Lama Pelayanan Poli",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_poli",
    "javaRef": "DlgPelayananPoli",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-penyiapan-rm",
    "slug": "lama-penyiapan-rm",
    "judul": "Lama Penyiapan RM",
    "kategori": "J",
    "permissionKey": "lama_penyiapan_rm",
    "javaRef": "DlgPenyiapanRM",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-pelayanan-pasien",
    "slug": "lama-pelayanan-pasien",
    "judul": "Lama Pelayanan Pasien",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_pasien",
    "javaRef": "DlgLamaPelayananPasien",
    "tabel": "pemeriksaan_ralan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "suhu_tubuh",
        "label": "Suhu Tubuh",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "respirasi",
        "label": "Respirasi",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "tinggi",
        "label": "Tinggi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "berat",
        "label": "Berat",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "Spo2",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "gcs",
        "label": "Gcs",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Compos Mentis",
          "Somnolence",
          "Sopor",
          "Coma",
          "Alert",
          "Confusion",
          "Voice",
          "Pain",
          "Unresponsive",
          "Apatis",
          "Delirium"
        ]
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "suhu_tubuh",
      "tensi",
      "nadi",
      "respirasi",
      "tinggi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-operasi",
    "slug": "lama-operasi",
    "judul": "Lama Operasi",
    "kategori": "J",
    "permissionKey": "lama_operasi",
    "javaRef": "DlgPelayananOperasi",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lama-pelayanan-cssd",
    "slug": "lama-pelayanan-cssd",
    "judul": "Lama Pelayanan CSSD",
    "kategori": "J",
    "permissionKey": "lama_pelayanan_cssd",
    "javaRef": "DlgPelayananCSSD",
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
    "id": "btn-dosis-radiologi",
    "slug": "dosis-radiologi",
    "judul": "Dosis Radiologi",
    "kategori": "J",
    "permissionKey": "dosis_radiologi",
    "javaRef": "DlgDosisRadiologi",
    "tabel": "periksa_radiologi",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-harian-ha-is",
    "slug": "harian-ha-is",
    "judul": "Harian HAIs",
    "kategori": "J",
    "permissionKey": "harian_HAIs",
    "javaRef": "DlgHarianHAIs",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-harian-ha-is2",
    "slug": "harian-ha-is2",
    "judul": "Harian HAIs 2",
    "kategori": "J",
    "permissionKey": "harian_HAIs2",
    "javaRef": "DlgHarianHAIs2",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bulanan-ha-is",
    "slug": "bulanan-ha-is",
    "judul": "Bulanan HAIs",
    "kategori": "J",
    "permissionKey": "bulanan_HAIs",
    "javaRef": "DlgBulananHAIs",
    "tabel": "diagnosa_pasien",
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
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ralan",
          "Ranap"
        ]
      },
      {
        "nama": "prioritas",
        "label": "Prioritas",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "status_penyakit",
        "label": "Status Penyakit",
        "tipe": "enum",
        "opsi": [
          "Lama",
          "Baru"
        ]
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ha-is-bangsal",
    "slug": "ha-is-bangsal",
    "judul": "HAIs Per Kamar/Bangsal",
    "kategori": "J",
    "permissionKey": "hais_perbangsal",
    "javaRef": "DlgHAIsPerBangsal",
    "tabel": "bangsal",
    "kolom": [
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_bangsal",
        "label": "Nm Bangsal",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kd_bangsal",
      "nm_bangsal"
    ],
    "kolomUrut": "kd_bangsal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hitung-bor",
    "slug": "hitung-bor",
    "judul": "Hitung BOR",
    "kategori": "J",
    "permissionKey": "hitung_bor",
    "javaRef": "DlgHitungBOR",
    "tabel": "kamar_inap",
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
        "nama": "tgl_masuk",
        "label": "Tgl Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_akhir",
        "label": "Diagnosa Akhir",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl Keluar",
        "tipe": "date"
      },
      {
        "nama": "jam_keluar",
        "label": "Jam Keluar",
        "tipe": "time"
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "ttl_biaya",
        "label": "Ttl Biaya",
        "tipe": "uang"
      },
      {
        "nama": "stts_pulang",
        "label": "Stts Pulang",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Rujuk",
          "APS",
          "+",
          "Meninggal",
          "Sembuh",
          "Membaik",
          "Pulang Paksa",
          "-",
          "Pindah Kamar",
          "Status Belum Lengkap",
          "Atas Persetujuan Dokter",
          "Atas Permintaan Sendiri",
          "Isoman",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hitung-alos",
    "slug": "hitung-alos",
    "judul": "Hitung ALOS",
    "kategori": "J",
    "permissionKey": "hitung_alos",
    "javaRef": "DlgHitungALOS",
    "tabel": "kamar_inap",
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
        "nama": "tgl_masuk",
        "label": "Tgl Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_akhir",
        "label": "Diagnosa Akhir",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl Keluar",
        "tipe": "date"
      },
      {
        "nama": "jam_keluar",
        "label": "Jam Keluar",
        "tipe": "time"
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "ttl_biaya",
        "label": "Ttl Biaya",
        "tipe": "uang"
      },
      {
        "nama": "stts_pulang",
        "label": "Stts Pulang",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Rujuk",
          "APS",
          "+",
          "Meninggal",
          "Sembuh",
          "Membaik",
          "Pulang Paksa",
          "-",
          "Pindah Kamar",
          "Status Belum Lengkap",
          "Atas Persetujuan Dokter",
          "Atas Permintaan Sendiri",
          "Isoman",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembatalan-periksa-dokter",
    "slug": "pembatalan-periksa-dokter",
    "judul": "Pembatalan Periksa Per Dokter",
    "kategori": "J",
    "permissionKey": "pembatalan_periksa_dokter",
    "javaRef": "DlgPembatalanPeriksaPerDokter",
    "tabel": "dokter",
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
        "nama": "nm_dokter",
        "label": "Nm Dokter",
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
        "nama": "gol_drh",
        "label": "Gol Drh",
        "tipe": "enum",
        "opsi": [
          "A",
          "B",
          "O",
          "AB",
          "-"
        ]
      },
      {
        "nama": "agama",
        "label": "Agama",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "almt_tgl",
        "label": "Almt Tgl",
        "tipe": "text",
        "maks": 60
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
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "stts_nikah",
        "label": "Stts Nikah",
        "tipe": "enum",
        "opsi": [
          "BELUM MENIKAH",
          "MENIKAH",
          "JANDA",
          "DUDHA",
          "JOMBLO"
        ]
      },
      {
        "nama": "kd_sps",
        "label": "Kd Sps",
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "kd_dokter",
      "nm_dokter",
      "tmp_lahir",
      "agama",
      "almt_tgl",
      "no_telp"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-entry-ralan",
    "slug": "cek-entry-ralan",
    "judul": "Cek Entry Ralan",
    "kategori": "J",
    "permissionKey": "cek_entry_ralan",
    "javaRef": "DlgCekEntryRalan",
    "tabel": "rawat_jl_dr",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "material",
        "label": "Material",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_tindakandr",
        "label": "Tarif Tindakandr",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      },
      {
        "nama": "menejemen",
        "label": "Menejemen",
        "tipe": "number"
      },
      {
        "nama": "biaya_rawat",
        "label": "Biaya Rawat",
        "tipe": "uang"
      },
      {
        "nama": "stts_bayar",
        "label": "Stts Bayar",
        "tipe": "enum",
        "opsi": [
          "Sudah",
          "Belum",
          "Suspen"
        ]
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "kd_dokter"
    ],
    "kolomUrut": "tgl_perawatan",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ranap-per-ruang",
    "slug": "ranap-per-ruang",
    "judul": "Ranap Per Ruang",
    "kategori": "J",
    "permissionKey": "ranap_per_ruang",
    "javaRef": "DlgRanapPerRuang",
    "tabel": "penjab",
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
        "nama": "png_jawab",
        "label": "Png Jawab",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nama_perusahaan",
        "label": "Nama Perusahaan",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "alamat_asuransi",
        "label": "Alamat Asuransi",
        "wajib": true,
        "tipe": "text",
        "maks": 130
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "attn",
        "label": "Attn",
        "wajib": true,
        "tipe": "text",
        "maks": 60
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
      "kd_pj",
      "png_jawab",
      "nama_perusahaan",
      "alamat_asuransi",
      "no_telp",
      "attn"
    ],
    "kolomUrut": "kd_pj",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-poli-asal-pasien-ranap",
    "slug": "poli-asal-pasien-ranap",
    "judul": "Poli Asal Pasien Ranap",
    "kategori": "J",
    "permissionKey": "poli_asal_pasien_ranap",
    "javaRef": "DlgPoliAsalPasienRanap",
    "tabel": "poliklinik",
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
        "nama": "nm_poli",
        "label": "Nm Poli",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "registrasi",
        "label": "Registrasi",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "registrasilama",
        "label": "Registrasilama",
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
      "kd_poli",
      "nm_poli"
    ],
    "kolomUrut": "kd_poli",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-dokter-asal-pasien-ranap",
    "slug": "dokter-asal-pasien-ranap",
    "judul": "Dokter Asal Pasien Ranap",
    "kategori": "J",
    "permissionKey": "dokter_asal_pasien_ranap",
    "javaRef": "DlgDokterAsalPasienRanap",
    "tabel": "set_jam_minimal",
    "kolom": [
      {
        "nama": "lamajam",
        "label": "Lamajam",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "hariawal",
        "label": "Hariawal",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "feeperujuk",
        "label": "Feeperujuk",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "diagnosaakhir",
        "label": "Diagnosaakhir",
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
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
          "Yes",
          "No"
        ]
      },
      {
        "nama": "kamar_inap_kasir_ralan",
        "label": "Kamar Inap Kasir Ralan",
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      },
      {
        "nama": "ubah_status_kamar",
        "label": "Ubah Status Kamar",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Yes",
          "No"
        ]
      }
    ],
    "kolomCari": [],
    "kolomUrut": "lamajam",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-penyakit-ranap-cara-bayar",
    "slug": "penyakit-ranap-cara-bayar",
    "judul": "Penyakit Ranap Per Cara Bayar",
    "kategori": "J",
    "permissionKey": "penyakit_ranap_cara_bayar",
    "javaRef": "DlgPenyakitRanapPerCaraBayar",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-lab-per-tahun",
    "slug": "rekap-lab-per-tahun",
    "judul": "Rekap Lab Per Tahun",
    "kategori": "J",
    "permissionKey": "rekap_lab_pertahun",
    "javaRef": "DlgRekapLabPerTahun",
    "tabel": "jns_perawatan_lab",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      },
      {
        "nama": "menejemen",
        "label": "Menejemen",
        "tipe": "number"
      },
      {
        "nama": "total_byr",
        "label": "Total Byr",
        "tipe": "uang"
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 3
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
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_pj"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-perujuk-lab-per-tahun",
    "slug": "perujuk-lab-per-tahun",
    "judul": "Perujuk Lab Per Tahun",
    "kategori": "J",
    "permissionKey": "perujuk_lab_pertahun",
    "javaRef": "DlgPerujukLabPerTahun",
    "tabel": "periksa_lab",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-radiologi-per-tahun",
    "slug": "rekap-radiologi-per-tahun",
    "judul": "Rekap Radiologi Per Tahun",
    "kategori": "J",
    "permissionKey": "rekap_radiologi_pertahun",
    "javaRef": "DlgRekapRadiologiPerTahun",
    "tabel": "jns_perawatan_radiologi",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      },
      {
        "nama": "menejemen",
        "label": "Menejemen",
        "tipe": "number"
      },
      {
        "nama": "total_byr",
        "label": "Total Byr",
        "tipe": "uang"
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 3
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
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_pj"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-perujuk-radiologi-per-tahun",
    "slug": "perujuk-radiologi-per-tahun",
    "judul": "Perujuk Radiologi Per Tahun",
    "kategori": "J",
    "permissionKey": "perujuk_radiologi_pertahun",
    "javaRef": "DlgPerujukRadiologiPerTahun",
    "tabel": "periksa_radiologi",
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
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tgl_periksa",
        "label": "Tgl Periksa",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "bhp",
        "label": "Bhp",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "Kso",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tgl_periksa",
    "kolomCari": [
      "no_rawat",
      "kd_jenis_prw",
      "nip",
      "dokter_perujuk"
    ],
    "kolomUrut": "tgl_periksa",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-jumlah-porsi-diet",
    "slug": "jumlah-porsi-diet",
    "judul": "Rekap Bulanan Porsi Diet",
    "kategori": "J",
    "permissionKey": "jumlah_porsi_diet",
    "javaRef": "DlgJumlahPorsiDiet",
    "tabel": "temporary_gizi",
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
    "id": "btn-jumlah-macam-diet",
    "slug": "jumlah-macam-diet",
    "judul": "Rekap Bulanan Macam Diet",
    "kategori": "J",
    "permissionKey": "jumlah_macam_diet",
    "javaRef": "DlgJumlahMacamDiet",
    "tabel": "temporary_gizi",
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
    "id": "btn-rekap-permintaan-diet",
    "slug": "rekap-permintaan-diet",
    "judul": "Rekap Permintaan Diet",
    "kategori": "J",
    "permissionKey": "rekap_permintaan_diet",
    "javaRef": "DlgRekapPermintaanDiet",
    "tabel": "detail_beri_diet",
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
        "nama": "kd_kamar",
        "label": "Kd Kamar",
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
        "nama": "kd_diet",
        "label": "Kd Diet",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "waktu",
      "no_rawat",
      "kd_kamar",
      "kd_diet"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sisa-diet-pasien",
    "slug": "sisa-diet-pasien",
    "judul": "Sisa Diet Pasien",
    "kategori": "J",
    "permissionKey": "sisa_diet_pasien",
    "javaRef": "LaporanSisaDietPasien",
    "tabel": "sisa_diet_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "pk": true,
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "kd_kamar",
        "label": "Kode Kamar",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "waktu",
        "label": "Waktu",
        "pk": true,
        "tipe": "enum",
        "opsi": [
          "pagi",
          "pagi2",
          "pagi3",
          "siang",
          "siang2",
          "siang3",
          "sore",
          "sore2",
          "sore3",
          "malam",
          "malam2",
          "malam3"
        ],
        "wajib": true
      },
      {
        "nama": "karbohidrat",
        "label": "Karbohidrat",
        "tipe": "number"
      },
      {
        "nama": "hewani",
        "label": "Hewani",
        "tipe": "number"
      },
      {
        "nama": "nabati",
        "label": "Nabati",
        "tipe": "number"
      },
      {
        "nama": "sayur",
        "label": "Sayur",
        "tipe": "number"
      },
      {
        "nama": "buah",
        "label": "Buah",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "tanggal",
      "waktu"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-data-sitt",
    "slug": "data-sitt",
    "judul": "Data TB",
    "kategori": "J",
    "permissionKey": "kemenkes_sitt",
    "javaRef": "DlgDataTB",
    "tabel": "data_tb",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "pk": true,
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "id_tb_03",
        "label": "Id TB 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=januari - maret",
          "2=april - juni",
          "3=juli - september",
          "4=oktober - desember"
        ]
      },
      {
        "nama": "tanggal_buat_laporan",
        "label": "Tanggal Buat Laporan",
        "tipe": "datetime"
      },
      {
        "nama": "tahun_buat_laporan",
        "label": "Tahun Buat Laporan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_wasor",
        "label": "Kode Wasor",
        "tipe": "number"
      },
      {
        "nama": "noregkab",
        "label": "Noregkab",
        "tipe": "number"
      },
      {
        "nama": "id_propinsi",
        "label": "Id Propinsi",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_kabupaten",
        "label": "Kode Kabupaten",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "id_kecamatan",
        "label": "Id Kecamatan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "id_kelurahan",
        "label": "Id Kelurahan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_rujukan",
        "label": "Nama Rujukan",
        "tipe": "enum",
        "opsi": [
          "inisiatif pasien/keluarga",
          "anggota masyarakat/kader",
          "faskes",
          "dokter praktek mandiri",
          "poli lain",
          "lain-lain"
        ]
      },
      {
        "nama": "sebutkan1",
        "label": "Sebutkan1",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tipe_diagnosis",
        "label": "Tipe Diagnosis",
        "tipe": "enum",
        "opsi": [
          "terkonfirmasi bakteriologis",
          "terdiagnosis klinis"
        ]
      },
      {
        "nama": "klasifikasi_lokasi_anatomi",
        "label": "Klasifikasi Lokasi Anatomi",
        "tipe": "enum",
        "opsi": [
          "paru",
          "ekstraparu"
        ]
      },
      {
        "nama": "klasifikasi_riwayat_pengobatan",
        "label": "Klasifikasi Riwayat Pengobatan",
        "tipe": "enum",
        "opsi": [
          "baru",
          "kambuh",
          "diobati setelah gagal",
          "diobati setelah putus berobat",
          "lain-lain",
          "riwayat pengobatan sebelumnya tidak diketahui",
          "pindahan"
        ]
      },
      {
        "nama": "klasifikasi_status_hiv",
        "label": "Klasifikasi Status HIV",
        "tipe": "enum",
        "opsi": [
          "positif",
          "negatif",
          "tidak diketahui"
        ]
      },
      {
        "nama": "total_skoring_anak",
        "label": "Total Skoring Anak",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "konfirmasiSkoring5",
        "label": "Konfirmasiskoring5",
        "tipe": "enum",
        "opsi": [
          "uji tuberkulin positif",
          "ada kontak tb paru",
          "uji tuberkulin negatif",
          "tidak ada kontak tb paru"
        ]
      },
      {
        "nama": "konfirmasiSkoring6",
        "label": "Konfirmasiskoring6",
        "tipe": "enum",
        "opsi": [
          "ada kontak tb paru",
          "tidak ada",
          "tidak jelas kontak tb paru"
        ]
      },
      {
        "nama": "tanggal_mulai_pengobatan",
        "label": "Tanggal Mulai Pengobatan",
        "tipe": "date"
      },
      {
        "nama": "paduan_oat",
        "label": "Paduan Oat",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "sumber_obat",
        "label": "Sumber Obat",
        "tipe": "enum",
        "opsi": [
          "program tb",
          "bayar sendiri",
          "asuransi",
          "lain-lain"
        ]
      },
      {
        "nama": "sebutkan",
        "label": "Sebutkan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "sebelum_pengobatan_hasil_mikroskopis",
        "label": "Sebelum Pengobatan Hasil Mikroskopis",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19",
          "1+",
          "2+",
          "3+",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "sebelum_pengobatan_hasil_tes_cepat",
        "label": "Sebelum Pengobatan Hasil Tes Cepat",
        "tipe": "enum",
        "opsi": [
          "rif sensitif",
          "rif resisten",
          "negatif",
          "rif indeterminated",
          "invalid",
          "error",
          "no result",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "sebelum_pengobatan_hasil_biakan",
        "label": "Sebelum Pengobatan Hasil Biakan",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19 bta",
          "1+",
          "2+",
          "3+",
          "4+",
          "ntm",
          "kontaminasi",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "noreglab_bulan_2",
        "label": "Noreglab Bulan 2",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "hasil_mikroskopis_bulan_2",
        "label": "Hasil Mikroskopis Bulan 2",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19",
          "1+",
          "2+",
          "3+",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "noreglab_bulan_3",
        "label": "Noreglab Bulan 3",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "hasil_mikroskopis_bulan_3",
        "label": "Hasil Mikroskopis Bulan 3",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19",
          "1+",
          "2+",
          "3+",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "noreglab_bulan_5",
        "label": "Noreglab Bulan 5",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "hasil_mikroskopis_bulan_5",
        "label": "Hasil Mikroskopis Bulan 5",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19",
          "1+",
          "2+",
          "3+",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "akhir_pengobatan_noreglab",
        "label": "Akhir Pengobatan Noreglab",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "akhir_pengobatan_hasil_mikroskopis",
        "label": "Akhir Pengobatan Hasil Mikroskopis",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "1-19",
          "1+",
          "2+",
          "3+",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "tanggal_hasil_akhir_pengobatan",
        "label": "Tanggal Hasil Akhir Pengobatan",
        "tipe": "date"
      },
      {
        "nama": "hasil_akhir_pengobatan",
        "label": "Hasil Akhir Pengobatan",
        "tipe": "enum",
        "opsi": [
          "belum",
          "sembuh",
          "pengobatan lengkap",
          "lost to follow up",
          "meninggal",
          "gagal",
          "pindah",
          ""
        ]
      },
      {
        "nama": "tanggal_dianjurkan_tes",
        "label": "Tanggal Dianjurkan Tes",
        "tipe": "date"
      },
      {
        "nama": "tanggal_tes_hiv",
        "label": "Tanggal Tes HIV",
        "tipe": "date"
      },
      {
        "nama": "hasil_tes_hiv",
        "label": "Hasil Tes HIV",
        "tipe": "enum",
        "opsi": [
          "reaktif",
          "non reaktif",
          "indeterminated"
        ]
      },
      {
        "nama": "ppk",
        "label": "Ppk",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "art",
        "label": "Art",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "tb_dm",
        "label": "TB Dm",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "terapi_dm",
        "label": "Terapi Dm",
        "tipe": "enum",
        "opsi": [
          "oho",
          "inj. insulin",
          ""
        ]
      },
      {
        "nama": "pindah_ro",
        "label": "Pindah Ro",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "status_pengobatan",
        "label": "Status Pengobatan",
        "tipe": "enum",
        "opsi": [
          "sesuai standar",
          "tidak sesuai standar"
        ]
      },
      {
        "nama": "foto_toraks",
        "label": "Foto Toraks",
        "tipe": "enum",
        "opsi": [
          "positif",
          "negatif",
          "tidak dilakukan"
        ]
      },
      {
        "nama": "toraks_tdk_dilakukan",
        "label": "Toraks Tdk Dilakukan",
        "tipe": "enum",
        "opsi": [
          "tidak dilakukan",
          "setelah terapi antibioka non oat: tidak ada perbaikan klinis, ada faktor resiko tb, dan atas pertimbangan dokter",
          "setelah terapi antibioka non oat: ada perbaikan klinis"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kode_icd_x",
        "label": "Kode ICD X",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "id_periode_laporan",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekap-mutasi-berkas",
    "slug": "rekap-mutasi-berkas",
    "judul": "Rekap Mutasi Berkas",
    "kategori": "J",
    "permissionKey": "rekap_mutasi_berkas",
    "javaRef": "DlgRekapMutasiBerkas",
    "tabel": "mutasi_berkas",
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
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Sudah Dikirim",
          "Sudah Diterima",
          "Sudah Kembali",
          "Tidak Ada",
          "Masuk Ranap"
        ]
      },
      {
        "nama": "dikirim",
        "label": "Dikirim",
        "tipe": "datetime"
      },
      {
        "nama": "diterima",
        "label": "Diterima",
        "tipe": "datetime"
      },
      {
        "nama": "kembali",
        "label": "Kembali",
        "tipe": "datetime"
      },
      {
        "nama": "tidakada",
        "label": "Tidakada",
        "tipe": "datetime"
      },
      {
        "nama": "ranap",
        "label": "Ranap",
        "wajib": true,
        "tipe": "datetime"
      }
    ],
    "kolomTanggal": "dikirim",
    "kolomCari": [
      "no_rawat"
    ],
    "kolomUrut": "dikirim",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-skrining-ralan-pernapasan-per-tahun",
    "slug": "skrining-ralan-pernapasan-per-tahun",
    "judul": "Skrining Pernapasan Ralan Per Tahun",
    "kategori": "J",
    "permissionKey": "skrining_ralan_pernapasan_pertahun",
    "javaRef": "LaporanRekapSkriningPernapasanRalanPerTahun",
    "tabel": "skrining_rawat_jalan",
    "kolom": [
      {
        "nama": "tanggal",
        "label": "Tanggal",
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
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "geriatri",
        "label": "Geriatri",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "Sadar penuh",
          "Tampak mengantuk/gelisah bicara tidak jelas",
          "Tidak sadar",
          "Batuk > 2 minggu"
        ]
      },
      {
        "nama": "pernapasan",
        "label": "Pernapasan",
        "tipe": "enum",
        "opsi": [
          "Nafas normal",
          "Tampak sesak",
          "Tidak bernafas"
        ]
      },
      {
        "nama": "nyeri_dada",
        "label": "Nyeri Dada",
        "tipe": "enum",
        "opsi": [
          "Tidak ada",
          "Ada (Tingkat sedang)",
          "Nyeri dada kiri tembus punggung"
        ]
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "Tidak sakit",
          "Sedikit sakit",
          "Agak mengganggu",
          "Mengganggu aktivitas",
          "Sangat mengganggu",
          "Tak tertahankan"
        ]
      },
      {
        "nama": "keputusan",
        "label": "Keputusan",
        "tipe": "enum",
        "opsi": [
          "Sesuai antrian",
          "IGD"
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
      "no_rkm_medis",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kunjungan-bangsal-tahun",
    "slug": "kunjungan-bangsal-tahun",
    "judul": "Masuk Ruang Per Tahun",
    "kategori": "J",
    "permissionKey": "kunjungan_bangsal_pertahun",
    "javaRef": "LaporanRekapKunjunganRuangPerTahun",
    "tabel": "bangsal",
    "kolom": [
      {
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_bangsal",
        "label": "Nm Bangsal",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kd_bangsal",
      "nm_bangsal"
    ],
    "kolomUrut": "kd_bangsal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kip-pasien-ranap",
    "slug": "kip-pasien-ranap",
    "judul": "KIP Pasien Ranap",
    "kategori": "J",
    "permissionKey": "kip_pasien_ranap",
    "javaRef": "DlgKIPPasienRanap",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kip-pasien-ralan",
    "slug": "kip-pasien-ralan",
    "judul": "KIP Pasien Ralan",
    "kategori": "J",
    "permissionKey": "kip_pasien_ralan",
    "javaRef": "DlgKIPPasienRalan",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-daftar-pasien-ranap",
    "slug": "daftar-pasien-ranap",
    "judul": "Daftar Pasien Ranap",
    "kategori": "J",
    "permissionKey": "daftar_pasien_ranap",
    "javaRef": "DlgDaftarPasienRanap",
    "tabel": "kamar_inap",
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
        "nama": "tgl_masuk",
        "label": "Tgl Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_akhir",
        "label": "Diagnosa Akhir",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl Keluar",
        "tipe": "date"
      },
      {
        "nama": "jam_keluar",
        "label": "Jam Keluar",
        "tipe": "time"
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "ttl_biaya",
        "label": "Ttl Biaya",
        "tipe": "uang"
      },
      {
        "nama": "stts_pulang",
        "label": "Stts Pulang",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Rujuk",
          "APS",
          "+",
          "Meninggal",
          "Sembuh",
          "Membaik",
          "Pulang Paksa",
          "-",
          "Pindah Kamar",
          "Status Belum Lengkap",
          "Atas Persetujuan Dokter",
          "Atas Permintaan Sendiri",
          "Isoman",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-anggota-militer-dirawat",
    "slug": "anggota-militer-dirawat",
    "judul": "Anggota TNI Dirawat",
    "kategori": "J",
    "permissionKey": "anggota_militer_dirawat",
    "javaRef": "DlgAnggotaMiliterDirawat",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-daftar-pasien-ranap-tni",
    "slug": "daftar-pasien-ranap-tni",
    "judul": "Daftar Pasien Ranap TNI",
    "kategori": "J",
    "permissionKey": "daftar_pasien_ranaptni",
    "javaRef": "DlgDaftarPasienRanapTNI",
    "tabel": "kamar_inap",
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
        "nama": "tgl_masuk",
        "label": "Tgl Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_akhir",
        "label": "Diagnosa Akhir",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl Keluar",
        "tipe": "date"
      },
      {
        "nama": "jam_keluar",
        "label": "Jam Keluar",
        "tipe": "time"
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "ttl_biaya",
        "label": "Ttl Biaya",
        "tipe": "uang"
      },
      {
        "nama": "stts_pulang",
        "label": "Stts Pulang",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Rujuk",
          "APS",
          "+",
          "Meninggal",
          "Sembuh",
          "Membaik",
          "Pulang Paksa",
          "-",
          "Pindah Kamar",
          "Status Belum Lengkap",
          "Atas Persetujuan Dokter",
          "Atas Permintaan Sendiri",
          "Isoman",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-anggota-polri-dirawat",
    "slug": "anggota-polri-dirawat",
    "judul": "Anggota POLRI Dirawat",
    "kategori": "J",
    "permissionKey": "anggota_polri_dirawat",
    "javaRef": "DlgAnggotaPolriDirawat",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-daftar-pasien-ranap-polri",
    "slug": "daftar-pasien-ranap-polri",
    "judul": "Daftar Pasien Ranap POLRI",
    "kategori": "J",
    "permissionKey": "daftar_pasien_ranap_polri",
    "javaRef": "DlgDaftarPasienRanapPolri",
    "tabel": "kamar_inap",
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
        "nama": "tgl_masuk",
        "label": "Tgl Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_akhir",
        "label": "Diagnosa Akhir",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl Keluar",
        "tipe": "date"
      },
      {
        "nama": "jam_keluar",
        "label": "Jam Keluar",
        "tipe": "time"
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "number"
      },
      {
        "nama": "ttl_biaya",
        "label": "Ttl Biaya",
        "tipe": "uang"
      },
      {
        "nama": "stts_pulang",
        "label": "Stts Pulang",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sehat",
          "Rujuk",
          "APS",
          "+",
          "Meninggal",
          "Sembuh",
          "Membaik",
          "Pulang Paksa",
          "-",
          "Pindah Kamar",
          "Status Belum Lengkap",
          "Atas Persetujuan Dokter",
          "Atas Permintaan Sendiri",
          "Isoman",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-penyakit-polri",
    "slug": "laporan-penyakit-polri",
    "judul": "Laporan Penyakit POLRI",
    "kategori": "J",
    "permissionKey": "laporan_penyakit_polri",
    "javaRef": "DlgLaporanPenyakitPolri",
    "tabel": "golongan_polri",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_golongan",
        "label": "Nama Golongan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_golongan"
    ],
    "kolomUrut": "id",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-penyakit-tni",
    "slug": "laporan-penyakit-tni",
    "judul": "Laporan Penyakit TNI",
    "kategori": "J",
    "permissionKey": "laporan_penyakit_tni",
    "javaRef": "DlgLaporanPenyakitTNI",
    "tabel": "golongan_tni",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_golongan",
        "label": "Nama Golongan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_golongan"
    ],
    "kolomUrut": "id",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-jumlah-pengunjung-ralan-polri",
    "slug": "jumlah-pengunjung-ralan-polri",
    "judul": "Jumlah Pengunjung Ralan POLRI",
    "kategori": "J",
    "permissionKey": "jumlah_pengunjung_ralan_polri",
    "javaRef": "DlgJumlahPengunjungRalanPolri",
    "tabel": "golongan_polri",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_golongan",
        "label": "Nama Golongan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_golongan"
    ],
    "kolomUrut": "id",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-jumlah-pengunjung-ralan-tni",
    "slug": "jumlah-pengunjung-ralan-tni",
    "judul": "Jumlah Pengunjung Ralan TNI",
    "kategori": "J",
    "permissionKey": "jumlah_pengunjung_ralan_tni",
    "javaRef": "DlgJumlahPengunjungRalanTNI",
    "tabel": "golongan_tni",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_golongan",
        "label": "Nama Golongan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_golongan"
    ],
    "kolomUrut": "id",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-registrasi-poli-per-tanggal",
    "slug": "registrasi-poli-per-tanggal",
    "judul": "Registrasi Poli Per Tanggal",
    "kategori": "J",
    "permissionKey": "registrasi_poli_per_tanggal",
    "javaRef": "LaporanRegistrasiPoliPerTanggal",
    "tabel": "poliklinik",
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
        "nama": "nm_poli",
        "label": "Nm Poli",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "registrasi",
        "label": "Registrasi",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "registrasilama",
        "label": "Registrasilama",
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
      "kd_poli",
      "nm_poli"
    ],
    "kolomUrut": "kd_poli",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-tahunan-irj",
    "slug": "laporan-tahunan-irj",
    "judul": "Laporan Tahunan IRJ",
    "kategori": "J",
    "permissionKey": "laporan_tahunan_irj",
    "javaRef": "LaporanTahunanIRJ",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-bulanan-irj",
    "slug": "laporan-bulanan-irj",
    "judul": "Laporan Bulanan IRJ",
    "kategori": "J",
    "permissionKey": "laporan_bulanan_irj",
    "javaRef": "LaporanBulananIRJ",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-tahunan-igd",
    "slug": "laporan-tahunan-igd",
    "judul": "Laporan Tahunan IGD",
    "kategori": "J",
    "permissionKey": "laporan_tahunan_igd",
    "javaRef": "LaporanTahunanIGD",
    "tabel": "reg_periksa",
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
        "nama": "no_reg",
        "label": "No Reg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "jam_reg",
        "label": "Jam Reg",
        "tipe": "time"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
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
        "nama": "kd_poli",
        "label": "Kd Poli",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "p_jawab",
        "label": "P Jawab",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "almt_pj",
        "label": "Almt Pj",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "hubunganpj",
        "label": "Hubunganpj",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "biaya_reg",
        "label": "Biaya Reg",
        "tipe": "uang"
      },
      {
        "nama": "stts",
        "label": "Stts",
        "tipe": "enum",
        "opsi": [
          "Belum",
          "Sudah",
          "Batal",
          "Berkas Diterima",
          "Dirujuk",
          "Meninggal",
          "Dirawat",
          "Pulang Paksa"
        ]
      }
    ],
    "kolomTanggal": "tgl_registrasi",
    "kolomCari": [
      "no_rawat",
      "no_reg",
      "kd_dokter",
      "no_rkm_medis",
      "kd_poli",
      "p_jawab"
    ],
    "kolomUrut": "tgl_registrasi",
    "kolomRingkasan": {
      "nama": "biaya_reg",
      "label": "Total Biaya Reg"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bulanan-klasifikasi-pasien-ranap",
    "slug": "bulanan-klasifikasi-pasien-ranap",
    "judul": "Bulanan Klasifikasi Pasien Ranap",
    "kategori": "J",
    "permissionKey": "bulanan_klasifikasi_pasien_ranap",
    "javaRef": "DlgBulananKlasifikasiPasienRanap",
    "tabel": "data_klasifikasi_pasien_ranap",
    "kolom": [
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 51
      },
      {
        "nama": "Minimal",
        "label": "Minimal",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Partial",
        "label": "Partial",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Total",
        "label": "Total",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "tipe": "text",
        "maks": 45
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_kamar"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-harian-klasifikasi-pasien-ranap",
    "slug": "harian-klasifikasi-pasien-ranap",
    "judul": "Harian Klasifikasi Pasien Ranap",
    "kategori": "J",
    "permissionKey": "harian_klasifikasi_pasien_ranap",
    "javaRef": "DlgHarianKlasifikasiPasienRanap",
    "tabel": "data_klasifikasi_pasien_ranap",
    "kolom": [
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 51
      },
      {
        "nama": "Minimal",
        "label": "Minimal",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Partial",
        "label": "Partial",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Total",
        "label": "Total",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "tipe": "text",
        "maks": 45
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_kamar"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-klasifikasi-pasien-per-ruang",
    "slug": "klasifikasi-pasien-per-ruang",
    "judul": "Klasifikasi Pasien Per Ruang",
    "kategori": "J",
    "permissionKey": "klasifikasi_pasien_perbangsal",
    "javaRef": "DlgKlasifikasiPasienPerBangsal",
    "tabel": "data_klasifikasi_pasien_ranap",
    "kolom": [
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 51
      },
      {
        "nama": "Minimal",
        "label": "Minimal",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Partial",
        "label": "Partial",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "Total",
        "label": "Total",
        "tipe": "enum",
        "opsi": [
          "TIDAK",
          "IYA"
        ]
      },
      {
        "nama": "kd_kamar",
        "label": "Kd Kamar",
        "tipe": "text",
        "maks": 45
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_kamar"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-demografi-umur-kunjungan",
    "slug": "demografi-umur-kunjungan",
    "judul": "Demografi Umur Kunjungan",
    "kategori": "J",
    "permissionKey": "demografi_umur_kunjungan",
    "javaRef": "DlgDemografiUmurKunjungan",
    "tabel": "poliklinik",
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
        "nama": "nm_poli",
        "label": "Nm Poli",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "registrasi",
        "label": "Registrasi",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "registrasilama",
        "label": "Registrasilama",
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
      "kd_poli",
      "nm_poli"
    ],
    "kolomUrut": "kd_poli",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-status-data-rm",
    "slug": "status-data-rm",
    "judul": "Status Data RM",
    "kategori": "J",
    "permissionKey": "status_data_rm",
    "javaRef": "DlgStatusDataRM",
    "tabel": "pemeriksaan_ralan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl Perawatan",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "suhu_tubuh",
        "label": "Suhu Tubuh",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "respirasi",
        "label": "Respirasi",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "tinggi",
        "label": "Tinggi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "berat",
        "label": "Berat",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "Spo2",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "gcs",
        "label": "Gcs",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Compos Mentis",
          "Somnolence",
          "Sopor",
          "Coma",
          "Alert",
          "Confusion",
          "Voice",
          "Pain",
          "Unresponsive",
          "Apatis",
          "Delirium"
        ]
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "suhu_tubuh",
      "tensi",
      "nadi",
      "respirasi",
      "tinggi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kepatuhan-kelengkapan-keselamatan-bedah",
    "slug": "kepatuhan-kelengkapan-keselamatan-bedah",
    "judul": "Kepatuhan Kelengkapan Keselamatan Bedah",
    "kategori": "J",
    "permissionKey": "kepatuhan_kelengkapan_keselamatan_bedah",
    "javaRef": "DlgKepatuhanKelengkapanKeselamatanBedah",
    "tabel": "operasi",
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
        "nama": "tgl_operasi",
        "label": "Tgl Operasi",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kode_paket",
        "label": "Kode Paket",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "jenis_anasthesi",
        "label": "Jenis Anasthesi",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "-",
          "Khusus",
          "Besar",
          "Sedang",
          "Kecil",
          "Elektive",
          "Emergency"
        ]
      },
      {
        "nama": "operator1",
        "label": "Operator1",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "operator2",
        "label": "Operator2",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "operator3",
        "label": "Operator3",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator1",
        "label": "Asisten Operator1",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator2",
        "label": "Asisten Operator2",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator3",
        "label": "Asisten Operator3",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "instrumen",
        "label": "Instrumen",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_operasi",
    "kolomCari": [
      "no_rawat",
      "kode_paket",
      "jenis_anasthesi",
      "operator1",
      "operator2",
      "operator3"
    ],
    "kolomUrut": "tgl_operasi",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-operasi-per-bulan",
    "slug": "operasi-per-bulan",
    "judul": "Operasi Per Bulan",
    "kategori": "J",
    "permissionKey": "operasi_per_bulan",
    "javaRef": "DlgOperasiPerBulan",
    "tabel": "operasi",
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
        "nama": "tgl_operasi",
        "label": "Tgl Operasi",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kode_paket",
        "label": "Kode Paket",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "jenis_anasthesi",
        "label": "Jenis Anasthesi",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "-",
          "Khusus",
          "Besar",
          "Sedang",
          "Kecil",
          "Elektive",
          "Emergency"
        ]
      },
      {
        "nama": "operator1",
        "label": "Operator1",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "operator2",
        "label": "Operator2",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "operator3",
        "label": "Operator3",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator1",
        "label": "Asisten Operator1",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator2",
        "label": "Asisten Operator2",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "asisten_operator3",
        "label": "Asisten Operator3",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "instrumen",
        "label": "Instrumen",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_operasi",
    "kolomCari": [
      "no_rawat",
      "kode_paket",
      "jenis_anasthesi",
      "operator1",
      "operator2",
      "operator3"
    ],
    "kolomUrut": "tgl_operasi",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laporan-tahunan-penolakan-anjuran-medis",
    "slug": "laporan-tahunan-penolakan-anjuran-medis",
    "judul": "Laporan Tahunan Penolakan Anjuran Medis",
    "kategori": "J",
    "permissionKey": "laporan_tahunan_penolakan_anjuran_medis",
    "javaRef": "LaporanTahunanPAM",
    "tabel": "surat_penolakan_anjuran_medis",
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
        "tipe": "datetime"
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
          "Keponakan",
          "Adik",
          "Kakak",
          "Orang Tua",
          "Diri Sendiri",
          "-"
        ]
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
        "maks": 3
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
        "nama": "no_telp",
        "label": "No Telp",
        "wajib": true,
        "tipe": "text",
        "maks": 30
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_surat",
      "no_rawat",
      "nama_pj",
      "umur_pj",
      "no_ktppj",
      "no_telp"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pemeriksaan-fisik-ralan-per-penyakit",
    "slug": "pemeriksaan-fisik-ralan-per-penyakit",
    "judul": "Pemeriksaan Fisik Ralan Per Penyakit",
    "kategori": "J",
    "permissionKey": "pemeriksaan_fisik_ralan_per_penyakit",
    "javaRef": "DlgPemeriksaanFisikRalanPerPenyakit",
    "tabel": "penyakit",
    "kolom": [
      {
        "nama": "kd_penyakit",
        "label": "Kd Penyakit",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_penyakit",
        "label": "Nm Penyakit",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ciri_ciri",
        "label": "Ciri Ciri",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kd_ktg",
        "label": "Kd Ktg",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Menular",
          "Tidak Menular"
        ]
      }
    ],
    "kolomCari": [
      "kd_penyakit",
      "nm_penyakit",
      "ciri_ciri",
      "keterangan",
      "kd_ktg"
    ],
    "kolomUrut": "kd_penyakit",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-data-sasaran-usia-produktif",
    "slug": "data-sasaran-usia-produktif",
    "judul": "Data Sasaran Usia Produktif",
    "kategori": "J",
    "permissionKey": "data_sasaran_usiaproduktif",
    "javaRef": "DlgDataSasaranUsiaProduktif",
    "tabel": "pasien",
    "kolom": [
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_ktp",
        "label": "No Ktp",
        "tipe": "text",
        "maks": 20
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
        "maks": 15
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "tipe": "date"
      },
      {
        "nama": "nm_ibu",
        "label": "Nm Ibu",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "gol_darah",
        "label": "Gol Darah",
        "tipe": "enum",
        "opsi": [
          "A",
          "B",
          "O",
          "AB",
          "-"
        ]
      },
      {
        "nama": "pekerjaan",
        "label": "Pekerjaan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "stts_nikah",
        "label": "Stts Nikah",
        "tipe": "enum",
        "opsi": [
          "BELUM MENIKAH",
          "MENIKAH",
          "JANDA",
          "DUDHA",
          "JOMBLO"
        ]
      },
      {
        "nama": "agama",
        "label": "Agama",
        "tipe": "text",
        "maks": 12
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_rkm_medis",
      "nm_pasien",
      "no_ktp",
      "tmp_lahir",
      "nm_ibu",
      "alamat"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-data-sasaran-usia-lansia",
    "slug": "data-sasaran-usia-lansia",
    "judul": "Data Sasaran Usia Lansia",
    "kategori": "J",
    "permissionKey": "data_sasaran_usialansia",
    "javaRef": "DlgDataSasaranUsiaLansia",
    "tabel": "pasien",
    "kolom": [
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_pasien",
        "label": "Nm Pasien",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_ktp",
        "label": "No Ktp",
        "tipe": "text",
        "maks": 20
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
        "maks": 15
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "tipe": "date"
      },
      {
        "nama": "nm_ibu",
        "label": "Nm Ibu",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "gol_darah",
        "label": "Gol Darah",
        "tipe": "enum",
        "opsi": [
          "A",
          "B",
          "O",
          "AB",
          "-"
        ]
      },
      {
        "nama": "pekerjaan",
        "label": "Pekerjaan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "stts_nikah",
        "label": "Stts Nikah",
        "tipe": "enum",
        "opsi": [
          "BELUM MENIKAH",
          "MENIKAH",
          "JANDA",
          "DUDHA",
          "JOMBLO"
        ]
      },
      {
        "nama": "agama",
        "label": "Agama",
        "tipe": "text",
        "maks": 12
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_rkm_medis",
      "nm_pasien",
      "no_ktp",
      "tmp_lahir",
      "nm_ibu",
      "alamat"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_LAPORAN: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_LAPORAN.map((item) => [item.slug, item]),
);

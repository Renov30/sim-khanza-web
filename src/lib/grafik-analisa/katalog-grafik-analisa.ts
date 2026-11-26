import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_GRAFIK_ANALISA: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-grafik-kunjungan-poli",
    "slug": "grafik-kunjungan-poli",
    "judul": "Registrasi Per Poli",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_poli",
    "javaRef": "GrafikRegistrasiPoli",
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
    "id": "btn-grafik-kunjungan-per-dokter",
    "slug": "grafik-kunjungan-per-dokter",
    "judul": "Registrasi Per Dokter",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_perdokter",
    "javaRef": "GrafikRegistrasiPerDokter",
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
    "id": "btn-grafik-kunjungan-per-pekerjaan",
    "slug": "grafik-kunjungan-per-pekerjaan",
    "judul": "Registrasi Per Pekerjaan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_perpekerjaan",
    "javaRef": "GrafikRegistrasiPerPekerjaan",
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
    "id": "btn-grafik-kunjungan-per-pendidikan",
    "slug": "grafik-kunjungan-per-pendidikan",
    "judul": "Registrasi Per Pendidikan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_perpendidikan",
    "javaRef": "GrafikRegistrasiPerPendidikan",
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
    "id": "btn-grafik-kunjungan-per-tahun",
    "slug": "grafik-kunjungan-per-tahun",
    "judul": "Registrasi Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_pertahun",
    "javaRef": "GrafikRegistrasiPerTahun",
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
    "id": "btn-grafik-kunjungan-per-bulan",
    "slug": "grafik-kunjungan-per-bulan",
    "judul": "Registrasi Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_perbulan",
    "javaRef": "GrafikRegistrasiPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-kunjungan-per-tanggal",
    "slug": "grafik-kunjungan-per-tanggal",
    "judul": "Registrasi Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_pertanggal",
    "javaRef": "GrafikRegistrasiPerTanggal",
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
    "id": "btn-grafik-demografi-registrasi",
    "slug": "grafik-demografi-registrasi",
    "judul": "Demografi Registrasi",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_demografi",
    "javaRef": "GrafikDemografiRegistrasi",
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
    "id": "btn-grafik-status-reg-per-tahun",
    "slug": "grafik-status-reg-per-tahun",
    "judul": "Registrasi Lama Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftartahun",
    "javaRef": "GrafikStatusRegPerTahun",
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
    "id": "btn-grafik-status-reg-per-tahun2",
    "slug": "grafik-status-reg-per-tahun2",
    "judul": "Registrasi Baru Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftartahun2",
    "javaRef": "GrafikStatusRegPerTahun2",
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
    "id": "btn-grafik-status-reg-per-bulan",
    "slug": "grafik-status-reg-per-bulan",
    "judul": "Registrasi Lama Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftarbulan",
    "javaRef": "GrafikStatusRegPerBulan",
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
    "id": "btn-grafik-status-reg-per-bulan2",
    "slug": "grafik-status-reg-per-bulan2",
    "judul": "Registrasi Baru Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftarbulan2",
    "javaRef": "GrafikStatusRegPerBulan2",
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
    "id": "btn-grafik-status-reg-per-tanggal",
    "slug": "grafik-status-reg-per-tanggal",
    "judul": "Registrasi Lama Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftartanggal",
    "javaRef": "GrafikStatusRegPerTanggal",
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
    "id": "btn-grafik-status-reg-per-tanggal2",
    "slug": "grafik-status-reg-per-tanggal2",
    "judul": "Registrasi Baru Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusdaftartanggal2",
    "javaRef": "GrafikStatusRegPerTanggal2",
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
    "id": "btn-grafik-status-reg-batal-per-tahun",
    "slug": "grafik-status-reg-batal-per-tahun",
    "judul": "Batal Periksa Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusbataltahun",
    "javaRef": "GrafikStatusBatalRegPerTahun",
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
    "id": "btn-grafik-status-reg-batal-per-bulan",
    "slug": "grafik-status-reg-batal-per-bulan",
    "judul": "Batal Periksa Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusbatalbulan",
    "javaRef": "GrafikStatusBatalRegPerBulan",
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
    "id": "btn-grafik-status-reg-batal-per-tanggal",
    "slug": "grafik-status-reg-batal-per-tanggal",
    "judul": "Batal Periksa Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_statusbataltanggal",
    "javaRef": "GrafikStatusBatalRegPerTanggal",
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
    "id": "btn-grafik-kunjungan-per-carabayar",
    "slug": "grafik-kunjungan-per-carabayar",
    "judul": "Registrasi Per Cara Bayar",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_percarabayar",
    "javaRef": "GrafikRegistrasiPerCaraBayar",
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
    "id": "btn-grafik-kunjungan-ranap-per-tahun",
    "slug": "grafik-kunjungan-ranap-per-tahun",
    "judul": "Kunjungan Ranap Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_ranaptahun",
    "javaRef": "GrafikKunjunganRanapPerTahun",
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
    "id": "btn-grafik-lab-ralan-per-tahun",
    "slug": "grafik-lab-ralan-per-tahun",
    "judul": "Kunjungan Lab Ralan Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_lab_ralantahun",
    "javaRef": "GrafikLabRalanPerTahun",
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
    "id": "btn-grafik-rad-ralan-per-tahun",
    "slug": "grafik-rad-ralan-per-tahun",
    "judul": "Kunjungan Rad Ralan Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_rad_ralantahun",
    "javaRef": "GrafikRadRalanPerTahun",
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
    "id": "btn-grafik-per-perujuk",
    "slug": "grafik-per-perujuk",
    "judul": "Registrasi Per Perujuk",
    "kategori": "O",
    "permissionKey": "grafik_per_perujuk",
    "javaRef": "GrafikRegistrasiPerPerujuk",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-lab-ralan-per-bulan",
    "slug": "grafik-lab-ralan-per-bulan",
    "judul": "Kunjungan Lab Ralan Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_lab_ralanbulan",
    "javaRef": "GrafikLabRalanPerBulan",
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
    "id": "btn-grafik-rad-ralan-per-bulan",
    "slug": "grafik-rad-ralan-per-bulan",
    "judul": "Kunjungan Rad Ralan Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_rad_ralanbulan",
    "javaRef": "GrafikRadRalanPerBulan",
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
    "id": "btn-grafik-lab-ralan-per-hari",
    "slug": "grafik-lab-ralan-per-hari",
    "judul": "Kunjungan Lab Ralan Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_lab_ralanhari",
    "javaRef": "GrafikLabRalanPerHari",
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
    "id": "btn-grafik-rad-ralan-per-hari",
    "slug": "grafik-rad-ralan-per-hari",
    "judul": "Kunjungan Rad Ralan Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_rad_ralanhari",
    "javaRef": "GrafikRadRalanPerHari",
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
    "id": "btn-grafik-kejadian-ikp-per-tahun",
    "slug": "grafik-kejadian-ikp-per-tahun",
    "judul": "Kejadian IKP Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_ikp_pertahun",
    "javaRef": "GrafikKejadianIKPPerTahun",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl Kejadian",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl Lapor",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
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
        "nama": "lokasi",
        "label": "Lokasi",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "wajib": true,
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tgl_kejadian",
    "kolomCari": [
      "no_rawat",
      "kode_insiden",
      "nip",
      "lokasi",
      "kronologis",
      "unit_terkait"
    ],
    "kolomUrut": "tgl_kejadian",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-kejadian-ikp-per-bulan",
    "slug": "grafik-kejadian-ikp-per-bulan",
    "judul": "Kejadian IKP Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_ikp_perbulan",
    "javaRef": "GrafikKejadianIKPPerBulan",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl Kejadian",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl Lapor",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
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
        "nama": "lokasi",
        "label": "Lokasi",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "wajib": true,
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tgl_kejadian",
    "kolomCari": [
      "no_rawat",
      "kode_insiden",
      "nip",
      "lokasi",
      "kronologis",
      "unit_terkait"
    ],
    "kolomUrut": "tgl_kejadian",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-kejadian-ikp-per-tanggal",
    "slug": "grafik-kejadian-ikp-per-tanggal",
    "judul": "Kejadian IKP Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_ikp_pertanggal",
    "javaRef": "GrafikKejadianIKPPerTanggal",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl Kejadian",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl Lapor",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
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
        "nama": "lokasi",
        "label": "Lokasi",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "wajib": true,
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tgl_kejadian",
    "kolomCari": [
      "no_rawat",
      "kode_insiden",
      "nip",
      "lokasi",
      "kronologis",
      "unit_terkait"
    ],
    "kolomUrut": "tgl_kejadian",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-kejadian-ikp-per-jenis",
    "slug": "grafik-kejadian-ikp-per-jenis",
    "judul": "Kejadian IKP Per Jenis",
    "kategori": "O",
    "permissionKey": "grafik_ikp_jenis",
    "javaRef": "GrafikKejadianIKPPerJenis",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl Kejadian",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl Lapor",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
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
        "nama": "lokasi",
        "label": "Lokasi",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "wajib": true,
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tgl_kejadian",
    "kolomCari": [
      "no_rawat",
      "kode_insiden",
      "nip",
      "lokasi",
      "kronologis",
      "unit_terkait"
    ],
    "kolomUrut": "tgl_kejadian",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-kejadian-ikp-per-dampak",
    "slug": "grafik-kejadian-ikp-per-dampak",
    "judul": "Kejadian IKP Per Dampak",
    "kategori": "O",
    "permissionKey": "grafik_ikp_dampak",
    "javaRef": "GrafikKejadianIKPPerDampak",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl Kejadian",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl Lapor",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
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
        "nama": "lokasi",
        "label": "Lokasi",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "wajib": true,
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomTanggal": "tgl_kejadian",
    "kolomCari": [
      "no_rawat",
      "kode_insiden",
      "nip",
      "lokasi",
      "kronologis",
      "unit_terkait"
    ],
    "kolomUrut": "tgl_kejadian",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-kunjungan-per-agama",
    "slug": "grafik-kunjungan-per-agama",
    "judul": "Registrasi Per Agama",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_per_agama",
    "javaRef": "GrafikRegistrasiPerAgama",
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
    "id": "btn-grafik-kunjungan-per-umur",
    "slug": "grafik-kunjungan-per-umur",
    "judul": "Registrasi Per Umur",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_per_umur",
    "javaRef": "GrafikRegistrasiPerUmur",
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
    "id": "btn-grafik-kunjungan-per-suku",
    "slug": "grafik-kunjungan-per-suku",
    "judul": "Registrasi Per Suku/Bangsa",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_suku",
    "javaRef": "GrafikRegistrasiPerSuku",
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
    "id": "btn-grafik-kunjungan-per-bahasa",
    "slug": "grafik-kunjungan-per-bahasa",
    "judul": "Registrasi Per Bahasa",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_bahasa",
    "javaRef": "GrafikRegistrasiPerBahasa",
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
    "id": "btn-grafik-kunjungan-per-cacat",
    "slug": "grafik-kunjungan-per-cacat",
    "judul": "Registrasi Per Cacat Fisik",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_per_cacat",
    "javaRef": "GrafikRegistrasiPerCacat",
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
    "id": "btn-grafik-tb-laporan-periode",
    "slug": "grafik-tb-laporan-periode",
    "judul": "Periode Laporan TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_periodelaporan",
    "javaRef": "GrafikTBPeriodeLaporan",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-rujukan",
    "slug": "grafik-tb-rujukan",
    "judul": "Rujukan TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_rujukan",
    "javaRef": "GrafikTBRujukan",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-riwayat",
    "slug": "grafik-tb-riwayat",
    "judul": "Riwayat TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_riwayat",
    "javaRef": "GrafikTBRiwayat",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-tipe-diagnosis",
    "slug": "grafik-tb-tipe-diagnosis",
    "judul": "Tipe Diagnosis TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_tipediagnosis",
    "javaRef": "GrafikTBTipeDiagnosis",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tbs-tatus-hiv",
    "slug": "grafik-tbs-tatus-hiv",
    "judul": "Status HIV TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_statushiv",
    "javaRef": "GrafikTBStatusHIV",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-skoring-anak",
    "slug": "grafik-tb-skoring-anak",
    "judul": "Skoring Anak TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_skoringanak",
    "javaRef": "GrafikTBSkoringAnak",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-konfirmasi-skoring5",
    "slug": "grafik-tb-konfirmasi-skoring5",
    "judul": "Konfirmasi Skoring 5 TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_konfirmasiskoring5",
    "javaRef": "GrafikTBKonfirmasiSkoring5",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-konfirmasi-skoring6",
    "slug": "grafik-tb-konfirmasi-skoring6",
    "judul": "Konfirmasi Skoring 6 TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_konfirmasiskoring6",
    "javaRef": "GrafikTBKonfirmasiSkoring6",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-sumber-obat",
    "slug": "grafik-tb-sumber-obat",
    "judul": "Sumber Obat TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_sumberobat",
    "javaRef": "GrafikTBSumberObat",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-hasil-akhir-pengobatan",
    "slug": "grafik-tb-hasil-akhir-pengobatan",
    "judul": "Hasil Akhir Pengobatan TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_hasilakhirpengobatan",
    "javaRef": "GrafikTBHasilAkhirPengobatan",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-tb-hasil-tes-hiv",
    "slug": "grafik-tb-hasil-tes-hiv",
    "judul": "Hasil Tes HIV TB",
    "kategori": "O",
    "permissionKey": "grafik_tb_hasilteshiv",
    "javaRef": "GrafikTBHasilTesHIV",
    "tabel": "data_tb",
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
        "nama": "id_tb_03",
        "label": "Id Tb 03",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "id_periode_laporan",
        "label": "Id Periode Laporan",
        "tipe": "enum",
        "opsi": [
          "1=Januari - Maret",
          "2=April - Juni",
          "3=Juli - September",
          "4=Oktober - Desember"
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
        "label": "Kd Wasor",
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
        "label": "Kd Kabupaten",
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
          "Inisiatif pasien/Keluarga",
          "Anggota Masyarakat/Kader",
          "Faskes",
          "Dokter Praktek Mandiri",
          "Poli lain",
          "Lain-lain"
        ]
      }
    ],
    "kolomTanggal": "tanggal_buat_laporan",
    "kolomCari": [
      "no_rawat",
      "id_tb_03",
      "tahun_buat_laporan",
      "id_propinsi",
      "kd_kabupaten",
      "id_kecamatan"
    ],
    "kolomUrut": "tanggal_buat_laporan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-pemakaian-air-pdam-per-tanggal",
    "slug": "grafik-pemakaian-air-pdam-per-tanggal",
    "judul": "Pemakaian Air PDAM Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_air_pdam_pertanggal",
    "javaRef": "GrafikKeslingPDAMPertanggal",
    "tabel": "kesling_pemakaian_air_pdam",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-pemakaian-air-pdam-per-bulan",
    "slug": "grafik-pemakaian-air-pdam-per-bulan",
    "judul": "Pemakaian Air PDAM Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_air_pdam_perbulan",
    "javaRef": "GrafikKeslingPDAMPerBulan",
    "tabel": "kesling_pemakaian_air_pdam",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-pemakaian-air-tanah-per-tanggal",
    "slug": "grafik-pemakaian-air-tanah-per-tanggal",
    "judul": "Pemakaian Air Tanah Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_air_tanah_pertanggal",
    "javaRef": "GrafikKeslingTanahPertanggal",
    "tabel": "kesling_pemakaian_air_tanah",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-pemakaian-air-tanah-per-bulan",
    "slug": "grafik-pemakaian-air-tanah-per-bulan",
    "judul": "Pemakaian Air Tanah Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_air_tanah_perbulan",
    "javaRef": "GrafikKeslingTanahPerBulan",
    "tabel": "kesling_pemakaian_air_tanah",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-limbah-b3-medis-per-tanggal",
    "slug": "grafik-limbah-b3-medis-per-tanggal",
    "judul": "Limbah B3 Medis Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_limbahb3_pertanggal",
    "javaRef": "GrafikKeslingLimbahB3Pertanggal",
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
        "tipe": "uang"
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
    "kolomRingkasan": {
      "nama": "sisa_di_tps",
      "label": "Total Sisa Di Tps"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-limbah-b3-medis-per-bulan",
    "slug": "grafik-limbah-b3-medis-per-bulan",
    "judul": "Limbah B3 Medis Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_limbahb3_perbulan",
    "javaRef": "GrafikKeslingLimbahB3Bulan",
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
        "tipe": "uang"
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
    "kolomRingkasan": {
      "nama": "sisa_di_tps",
      "label": "Total Sisa Di Tps"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-limbah-domestik-per-tanggal",
    "slug": "grafik-limbah-domestik-per-tanggal",
    "judul": "Limbah Padat Domestik Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_limbahdomestik_pertanggal",
    "javaRef": "GrafikKeslingLimbahDomestikPertanggal",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-limbah-domestik-per-bulan",
    "slug": "grafik-limbah-domestik-per-bulan",
    "judul": "Limbah Padat Domestik Medis Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_limbahdomestik_perbulan",
    "javaRef": "GrafikKeslingLimbahDomestikBulan",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-k3-per-tahun",
    "slug": "grafik-k3-per-tahun",
    "judul": "K3 Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_k3_pertahun",
    "javaRef": "GrafikPeristiwaK3PerTahun",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-bulan",
    "slug": "grafik-k3-per-bulan",
    "judul": "K3 Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_k3_perbulan",
    "javaRef": "GrafikPeristiwaK3PerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-tanggal",
    "slug": "grafik-k3-per-tanggal",
    "judul": "K3 Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_k3_pertanggal",
    "javaRef": "GrafikPeristiwaK3PerTanggal",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-jenis-cidera",
    "slug": "grafik-k3-per-jenis-cidera",
    "judul": "K3 Per Jenis Cidera",
    "kategori": "O",
    "permissionKey": "grafik_k3_perjeniscidera",
    "javaRef": "GrafikPeristiwaK3PerJenisCidera",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-penyebab",
    "slug": "grafik-k3-per-penyebab",
    "judul": "K3 Per Penyebab Kecelakaan",
    "kategori": "O",
    "permissionKey": "grafik_k3_perpenyebab",
    "javaRef": "GrafikPeristiwaK3PerPenyebab",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-jenis-luka",
    "slug": "grafik-k3-per-jenis-luka",
    "judul": "K3 Per Jenis Luka",
    "kategori": "O",
    "permissionKey": "grafik_k3_perjenisluka",
    "javaRef": "GrafikPeristiwaK3PerJenisLuka",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-lokasi-kejadian",
    "slug": "grafik-k3-per-lokasi-kejadian",
    "judul": "K3 Per Lokasi Kejadian",
    "kategori": "O",
    "permissionKey": "grafik_k3_lokasikejadian",
    "javaRef": "GrafikPeristiwaK3PerLokasiKejadian",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-dampak-cidera",
    "slug": "grafik-k3-per-dampak-cidera",
    "judul": "K3 Per Dampak Cidera",
    "kategori": "O",
    "permissionKey": "grafik_k3_dampakcidera",
    "javaRef": "GrafikPeristiwaK3PerDampakCidera",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-jenis-pekerjaan",
    "slug": "grafik-k3-per-jenis-pekerjaan",
    "judul": "K3 Per Jenis Pekerjaan",
    "kategori": "O",
    "permissionKey": "grafik_k3_perjenispekerjaan",
    "javaRef": "GrafikPeristiwaK3PerJenisPekerjaan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-k3-per-bagian-tubuh",
    "slug": "grafik-k3-per-bagian-tubuh",
    "judul": "K3 Per Bagian Tubuh",
    "kategori": "O",
    "permissionKey": "grafik_k3_perbagiantubuh",
    "javaRef": "GrafikPeristiwaK3PerBagianTubuh",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-kunjungan-ranap-bulan",
    "slug": "grafik-kunjungan-ranap-bulan",
    "judul": "Kunjungan Ranap Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_ranapbulan",
    "javaRef": "GrafikKunjunganRanapPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-kunjungan-ranap-tanggal",
    "slug": "grafik-kunjungan-ranap-tanggal",
    "judul": "Kunjungan Ranap Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_ranaptanggal",
    "javaRef": "GrafikKunjunganRanapPerTanggal",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-kunjungan-ranap-ruang",
    "slug": "grafik-kunjungan-ranap-ruang",
    "judul": "Kunjungan Ranap Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_kunjungan_ranap_peruang",
    "javaRef": "GrafikKunjunganRanapPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-jenjang-jabatan-pegawai",
    "slug": "grafik-jenjang-jabatan-pegawai",
    "judul": "Pegawai Per Jenjang Jabatan",
    "kategori": "O",
    "permissionKey": "grafik_jenjang_jabatanpegawai",
    "javaRef": "GrafikPegawaiPerJenjangJabatan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-bidang-pegawai",
    "slug": "grafik-bidang-pegawai",
    "judul": "Pegawai Per Bidang/Bagian",
    "kategori": "O",
    "permissionKey": "grafik_bidangpegawai",
    "javaRef": "GrafikPegawaiPerBidang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-departemen-pegawai",
    "slug": "grafik-departemen-pegawai",
    "judul": "Pegawai Per Departemen",
    "kategori": "O",
    "permissionKey": "grafik_departemenpegawai",
    "javaRef": "GrafikPegawaiPerDepartemen",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-pendidikan-pegawai",
    "slug": "grafik-pendidikan-pegawai",
    "judul": "Pegawai Per Pendidikan",
    "kategori": "O",
    "permissionKey": "grafik_pendidikanpegawai",
    "javaRef": "GrafikPegawaiPerPendidikan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-status-wp-pegawai",
    "slug": "grafik-status-wp-pegawai",
    "judul": "Pegawai Per Status WP",
    "kategori": "O",
    "permissionKey": "grafik_sttswppegawai",
    "javaRef": "GrafikPegawaiPerStatusWP",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-status-kerja-pegawai",
    "slug": "grafik-status-kerja-pegawai",
    "judul": "Pegawai Per Status Kerja",
    "kategori": "O",
    "permissionKey": "grafik_sttskerjapegawai",
    "javaRef": "GrafikPegawaiPerStatusKerja",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-status-pulang-ranap",
    "slug": "grafik-status-pulang-ranap",
    "judul": "Status Pulang Ranap",
    "kategori": "O",
    "permissionKey": "grafik_sttspulangranap",
    "javaRef": "GrafikStatusPulangRanap",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-item-apotek-per-jenis",
    "slug": "grafik-item-apotek-per-jenis",
    "judul": "Item Apotek Per Jenis",
    "kategori": "O",
    "permissionKey": "item_apotek_jenis",
    "javaRef": "GrafikItemApotekPerJenis",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-item-apotek-per-kategori",
    "slug": "grafik-item-apotek-per-kategori",
    "judul": "Item Apotek Per Kategori",
    "kategori": "O",
    "permissionKey": "item_apotek_kategori",
    "javaRef": "GrafikItemApotekPerKategori",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-item-apotek-per-golongan",
    "slug": "grafik-item-apotek-per-golongan",
    "judul": "Item Apotek Per Golongan",
    "kategori": "O",
    "permissionKey": "item_apotek_golongan",
    "javaRef": "GrafikItemApotekPerGolongan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-item-apotek-per-industri-farmasi",
    "slug": "grafik-item-apotek-per-industri-farmasi",
    "judul": "Item Apotek Per Industri Farmasi",
    "kategori": "O",
    "permissionKey": "item_apotek_industrifarmasi",
    "javaRef": "GrafikItemApotekPerIndustriFarmasi",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-pengajuan-aset-urgensi",
    "slug": "grafik-pengajuan-aset-urgensi",
    "judul": "Pengajuan Aset Per Urgensi",
    "kategori": "O",
    "permissionKey": "grafik_pengajuan_aset_urgensi",
    "javaRef": "GrafikPengajuanAsetUrgensi",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-pengajuan-aset-status",
    "slug": "grafik-pengajuan-aset-status",
    "judul": "Pengajuan Aset Per Status",
    "kategori": "O",
    "permissionKey": "grafik_pengajuan_aset_status",
    "javaRef": "GrafikPengajuanAsetStatus",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-pengajuan-aset-departemen",
    "slug": "grafik-pengajuan-aset-departemen",
    "judul": "Pengajuan Aset Per Departemen",
    "kategori": "O",
    "permissionKey": "grafik_pengajuan_aset_departemen",
    "javaRef": "GrafikPengajuanAsetDepartemen",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-kelompok-jabatan-pegawai",
    "slug": "grafik-kelompok-jabatan-pegawai",
    "judul": "Pegawai Per Kelompok Jabatan",
    "kategori": "O",
    "permissionKey": "grafik_kelompok_jabatanpegawai",
    "javaRef": "GrafikPegawaiPerKelompokJabatan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-risiko-kerja-pegawai",
    "slug": "grafik-risiko-kerja-pegawai",
    "judul": "Pegawai Per Risiko Kerja",
    "kategori": "O",
    "permissionKey": "grafik_resiko_kerjapegawai",
    "javaRef": "GrafikPegawaiPerResikoKerja",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-emergency-index-pegawai",
    "slug": "grafik-emergency-index-pegawai",
    "judul": "Pegawai Per Emergency Index",
    "kategori": "O",
    "permissionKey": "grafik_emergency_indexpegawai",
    "javaRef": "GrafikPegawaiPerEmergencyIndex",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-inventaris-ruang",
    "slug": "grafik-inventaris-ruang",
    "judul": "Jumlah Inventaris Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_inventaris_ruang",
    "javaRef": "GrafikInventarisPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-inventaris-jenis",
    "slug": "grafik-inventaris-jenis",
    "judul": "Jumlah Inventaris Per Jenis",
    "kategori": "O",
    "permissionKey": "grafik_inventaris_jenis",
    "javaRef": "GrafikInventarisPerJenis",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-pasien-ruang",
    "slug": "grafik-ha-is-pasien-ruang",
    "judul": "Pasien HAIs Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_pasienbangsal",
    "javaRef": "GrafikPasienHAIsRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-pasien-bulan",
    "slug": "grafik-ha-is-pasien-bulan",
    "judul": "Pasien HAIs Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_pasienbulan",
    "javaRef": "GrafikPasienHAIsBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-vap",
    "slug": "grafik-ha-is-laju-vap",
    "judul": "Laju HAIs VAP Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_vap",
    "javaRef": "GrafikLajuHAIsVAPPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-iad",
    "slug": "grafik-ha-is-laju-iad",
    "judul": "Laju HAIs IAD Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_iad",
    "javaRef": "GrafikLajuHAIsIADPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-pleb",
    "slug": "grafik-ha-is-laju-pleb",
    "judul": "Laju HAIs Plebitis Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_pleb",
    "javaRef": "GrafikLajuHAIsPlebPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-isk",
    "slug": "grafik-ha-is-laju-isk",
    "judul": "Laju HAIs ISK Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_isk",
    "javaRef": "GrafikLajuHAIsISKPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-ilo",
    "slug": "grafik-ha-is-laju-ilo",
    "judul": "Laju HAIs ILO Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_ilo",
    "javaRef": "GrafikLajuHAIsILOPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-ha-is-laju-hap",
    "slug": "grafik-ha-is-laju-hap",
    "judul": "Laju HAIs HAP Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_HAIs_laju_hap",
    "javaRef": "GrafikLajuHAIsHAPPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-penerimaan-obat-per-bulan",
    "slug": "grafik-penerimaan-obat-per-bulan",
    "judul": "Penerimaan Obat, Alkes & BHP Per Bulan",
    "kategori": "O",
    "permissionKey": "penerimaan_obat_perbulan",
    "javaRef": "GrafikPenerimaanObatPerbulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-hemodialisa-per-tanggal",
    "slug": "grafik-hemodialisa-per-tanggal",
    "judul": "Hemodialisa Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_harian_hemodialisa",
    "javaRef": "GrafikHemodialisaPerTanggal",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-hemodialisa-per-bulan",
    "slug": "grafik-hemodialisa-per-bulan",
    "judul": "Hemodialisa Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_bulanan_hemodialisa",
    "javaRef": "GrafikHemodialisaPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-hemodialisa-per-tahun",
    "slug": "grafik-hemodialisa-per-tahun",
    "judul": "Hemodialisa Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_tahunan_hemodialisa",
    "javaRef": "GrafikHemodialisaPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-meninggal-per-bulan",
    "slug": "grafik-meninggal-per-bulan",
    "judul": "Pasien Meninggal Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_bulanan_meninggal",
    "javaRef": "GrafikMeninggalPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-inventaris-kategori",
    "slug": "grafik-inventaris-kategori",
    "judul": "Jumlah Inventaris Per Kategori",
    "kategori": "O",
    "permissionKey": "grafik_inventaris_kategori",
    "javaRef": "GrafikInventarisPerKategori",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-inventaris-merk",
    "slug": "grafik-inventaris-merk",
    "judul": "Jumlah Inventaris Per Merk",
    "kategori": "O",
    "permissionKey": "grafik_inventaris_merk",
    "javaRef": "GrafikInventarisPerMerk",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-inventaris-produsen",
    "slug": "grafik-inventaris-produsen",
    "judul": "Jumlah Inventaris Per Produsen",
    "kategori": "O",
    "permissionKey": "grafik_inventaris_produsen",
    "javaRef": "GrafikInventarisPerProdusen",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-porsi-diet-per-tanggal",
    "slug": "grafik-porsi-diet-per-tanggal",
    "judul": "Porsi Diet Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_porsidiet_pertanggal",
    "javaRef": "GrafikPorsiDietPerTanggal",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-porsi-diet-per-bulan",
    "slug": "grafik-porsi-diet-per-bulan",
    "judul": "Porsi Diet Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_porsidiet_perbulan",
    "javaRef": "GrafikPorsiDietPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-porsi-diet-per-tahun",
    "slug": "grafik-porsi-diet-per-tahun",
    "judul": "Porsi Diet Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_porsidiet_pertahun",
    "javaRef": "GrafikPorsiDietPerTahun",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-porsi-diet-per-ruang",
    "slug": "grafik-porsi-diet-per-ruang",
    "judul": "Porsi Diet Per Ruang",
    "kategori": "O",
    "permissionKey": "grafik_porsidiet_perbangsal",
    "javaRef": "GrafikPorsiDietPerRuang",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-perbaikan-inventaris-per-tanggal",
    "slug": "grafik-perbaikan-inventaris-per-tanggal",
    "judul": "Perbaikan Inventaris Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_perbaikan_inventaris_pertanggal",
    "javaRef": "GrafikPerbaikanInventarisPerTanggal",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-perbaikan-inventaris-per-bulan",
    "slug": "grafik-perbaikan-inventaris-per-bulan",
    "judul": "Perbaikan Inventaris Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_perbaikan_inventaris_perbulan",
    "javaRef": "GrafikPerbaikanInventarisPerBulan",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-perbaikan-inventaris-per-tahun",
    "slug": "grafik-perbaikan-inventaris-per-tahun",
    "judul": "Perbaikan Inventaris Per Tahun",
    "kategori": "O",
    "permissionKey": "grafik_perbaikan_inventaris_pertahun",
    "javaRef": "GrafikPerbaikanInventarisPerTahun",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-perbaikan-inventaris-per-pelaksana-status",
    "slug": "grafik-perbaikan-inventaris-per-pelaksana-status",
    "judul": "Perbaikan Inventaris Per Pelaksana & Status",
    "kategori": "O",
    "permissionKey": "grafik_perbaikan_inventaris_perpelaksana_status",
    "javaRef": "GrafikPerbaikanInventarisPerPelaksanaStatus",
    "tabel": "temporary_grafik",
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
    "id": "btn-grafik-limbah-b3-medis-cair-per-tanggal",
    "slug": "grafik-limbah-b3-medis-cair-per-tanggal",
    "judul": "Limbah B3 Cair Per Tanggal",
    "kategori": "O",
    "permissionKey": "grafik_limbahb3cair_pertanggal",
    "javaRef": "GrafikKeslingLimbahB3CairPertanggal",
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
        "tipe": "uang"
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
    "kolomRingkasan": {
      "nama": "sisa_di_tps",
      "label": "Total Sisa Di Tps"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-grafik-limbah-b3-medis-cair-per-bulan",
    "slug": "grafik-limbah-b3-medis-cair-per-bulan",
    "judul": "Limbah B3 Cair Per Bulan",
    "kategori": "O",
    "permissionKey": "grafik_limbahb3cair_perbulan",
    "javaRef": "GrafikKeslingLimbahB3CairBulan",
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
        "tipe": "uang"
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
    "kolomRingkasan": {
      "nama": "sisa_di_tps",
      "label": "Total Sisa Di Tps"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_GRAFIK_ANALISA: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_GRAFIK_ANALISA.map((item) => [item.slug, item]),
);

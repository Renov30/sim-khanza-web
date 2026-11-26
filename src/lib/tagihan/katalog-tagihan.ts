import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_TAGIHAN: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-tagihan-poli",
    "slug": "tagihan-poli",
    "judul": "Harian Dokter Poli",
    "kategori": "I",
    "permissionKey": "harian_tindakan_poli",
    "javaRef": "DlgRBTindakanPoli",
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
    "id": "btn-harian-kamar",
    "slug": "harian-kamar",
    "judul": "Harian Kamar",
    "kategori": "I",
    "permissionKey": "harian_kamar",
    "javaRef": "DlgRBTindakanKamar",
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
    "id": "btn-tagihan-dokter",
    "slug": "tagihan-dokter",
    "judul": "Harian Dokter Ralan",
    "kategori": "I",
    "permissionKey": "harian_tindakan_dokter",
    "javaRef": "DlgRBTindakanDokter",
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
    "id": "btn-tagihan-obat-poli",
    "slug": "tagihan-obat-poli",
    "judul": "Obat Per Poli",
    "kategori": "I",
    "permissionKey": "obat_per_poli",
    "javaRef": "DlgRBObatPoli",
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
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur"
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
    "id": "btn-tagihan-obat-bangsal",
    "slug": "tagihan-obat-bangsal",
    "judul": "Obat Per Kamar",
    "kategori": "I",
    "permissionKey": "obat_per_kamar",
    "javaRef": "DlgRBObatBangsal",
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
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur"
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
    "id": "btn-rekab-item-obat-per-r",
    "slug": "rekab-item-obat-per-r",
    "judul": "Rekap Obat Per R",
    "kategori": "I",
    "permissionKey": "obat_per_kamar",
    "javaRef": "DlgRekapR",
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
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur"
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
    "id": "btn-obat-pasien-ralan",
    "slug": "obat-pasien-ralan",
    "judul": "Obat Per Dokter Ralan",
    "kategori": "I",
    "permissionKey": "obat_per_dokter_ralan",
    "javaRef": "DlgRBObatDokterRalan",
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
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur"
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
    "id": "btn-obat-pasien-ranap",
    "slug": "obat-pasien-ranap",
    "judul": "Obat Per Dokter Ranap",
    "kategori": "I",
    "permissionKey": "obat_per_dokter_ranap",
    "javaRef": "DlgRBObatDokterRanap",
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
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur"
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
    "id": "btn-obat-pasien-peresep",
    "slug": "obat-pasien-peresep",
    "judul": "Obat Per Dokter Peresep",
    "kategori": "I",
    "permissionKey": "obat_per_dokter_peresep",
    "javaRef": "DlgRBObatDokterPeresep",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-obat-per-cara-bayar",
    "slug": "obat-per-cara-bayar",
    "judul": "Obat Per Cara Bayar",
    "kategori": "I",
    "permissionKey": "obat_per_cara_bayar",
    "javaRef": "DlgRBObatPercaraBayar",
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
    "id": "btn-detail-tindakan",
    "slug": "detail-tindakan",
    "judul": "Detail Tindakan",
    "kategori": "I",
    "permissionKey": "detail_tindakan",
    "javaRef": "DlgDetailTindakan",
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
    "id": "btn-jm-detail-dokter",
    "slug": "jm-detail-dokter",
    "judul": "Detail JM Dokter",
    "kategori": "I",
    "permissionKey": "jm_ranap_dokter",
    "javaRef": "DlgDetailJMDokter",
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
    "id": "btn-jm-detail-dokter2",
    "slug": "jm-detail-dokter2",
    "judul": "Detail JM Dokter 2",
    "kategori": "I",
    "permissionKey": "detailjmdokter2",
    "javaRef": "DlgDetailJMDokter2",
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
    "id": "btn-rhd-okter",
    "slug": "rhd-okter",
    "judul": "Harian Dokter",
    "kategori": "I",
    "permissionKey": "harian_dokter",
    "javaRef": "DlgRHJmDokter",
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
    "id": "btn-rb-dokter",
    "slug": "rb-dokter",
    "judul": "Bulanan Dokter",
    "kategori": "I",
    "permissionKey": "bulanan_dokter",
    "javaRef": "DlgRBJmDokter",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-jasa-dokter",
    "slug": "rekap-jasa-dokter",
    "judul": "Rekap JM Dokter",
    "kategori": "I",
    "permissionKey": "rekap_jm_dokter",
    "javaRef": "KeuanganRekapJmDokter",
    "tabel": "rawat_inap_dr",
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
    "id": "btn-rekap-biaya-registrasi",
    "slug": "rekap-biaya-registrasi",
    "judul": "Rekap Biaya Registrasi",
    "kategori": "I",
    "permissionKey": "rekap_biaya_registrasi",
    "javaRef": "DlgRekapBiayaRegistrasi",
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
    "id": "btn-rh-paramedis",
    "slug": "rh-paramedis",
    "judul": "Harian Paramedis",
    "kategori": "I",
    "permissionKey": "harian_paramedis",
    "javaRef": "DlgRHJmParamedis",
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
    "id": "btn-rb-paramedis",
    "slug": "rb-paramedis",
    "judul": "Bulanan Paramedis",
    "kategori": "I",
    "permissionKey": "bulanan_paramedis",
    "javaRef": "DlgRBJmParamedis",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rh-jasa-sarana",
    "slug": "rh-jasa-sarana",
    "judul": "Harian Jasa Sarana",
    "kategori": "I",
    "permissionKey": "harian_js",
    "javaRef": "DlgRHJS",
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
    "id": "btn-rb-jasa-sarana",
    "slug": "rb-jasa-sarana",
    "judul": "Bulanan Jasa Sarana",
    "kategori": "I",
    "permissionKey": "bulanan_js",
    "javaRef": "DlgRBJS",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rhkso",
    "slug": "rhkso",
    "judul": "Harian KSO",
    "kategori": "I",
    "permissionKey": "harian_kso",
    "javaRef": "DlgRHKSO",
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
    "id": "btn-rbkso",
    "slug": "rbkso",
    "judul": "Bulanan KSO",
    "kategori": "I",
    "permissionKey": "bulanan_kso",
    "javaRef": "DlgRBKSO",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rh-menejemen",
    "slug": "rh-menejemen",
    "judul": "Harian Menejemen",
    "kategori": "I",
    "permissionKey": "harian_menejemen",
    "javaRef": "DlgRHMenejemen",
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
    "id": "btn-rb-menejemen",
    "slug": "rb-menejemen",
    "judul": "Bulanan Menejemen",
    "kategori": "I",
    "permissionKey": "bulanan_menejemen",
    "javaRef": "DlgRBMenejemen",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rh-paket-bhp",
    "slug": "rh-paket-bhp",
    "judul": "Harian BHP Medis/Paket Obat",
    "kategori": "I",
    "permissionKey": "harian_paket_bhp",
    "javaRef": "DlgRHPaketBHP",
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
    "id": "btn-rb-paket-bhp",
    "slug": "rb-paket-bhp",
    "judul": "Bulanan BHP Medis/Paket Obat",
    "kategori": "I",
    "permissionKey": "bulanan_paket_bhp",
    "javaRef": "DlgRBPaketBHP",
    "tabel": "jns_perawatan_inap",
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
        "nama": "kd_kategori",
        "label": "Kd Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "material",
        "label": "Material",
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
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakanpr",
        "label": "Tarif Tindakanpr",
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
        "nama": "total_byrdr",
        "label": "Total Byrdr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrpr",
        "label": "Total Byrpr",
        "tipe": "uang"
      },
      {
        "nama": "total_byrdrpr",
        "label": "Total Byrdrpr",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_kategori"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_tindakandr",
      "label": "Total Tarif Tindakandr"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ringkasan-tindakan-ralan",
    "slug": "ringkasan-tindakan-ralan",
    "judul": "Ringkasan Tindakan",
    "kategori": "I",
    "permissionKey": "ringkasan_tindakan",
    "javaRef": "KeuanganRingkasanTindakan",
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
    "id": "btnfee-visit-dokter",
    "slug": "btnfee-visit-dokter",
    "judul": "Fee Visit Dokter",
    "kategori": "I",
    "permissionKey": "fee_visit_dokter",
    "javaRef": "DlgFeeVisitDokter",
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
    "id": "btnfee-bacaan-ekg",
    "slug": "btnfee-bacaan-ekg",
    "judul": "Fee Bacaan EKG",
    "kategori": "I",
    "permissionKey": "fee_bacaan_ekg",
    "javaRef": "DlgFeeBacaanEKG",
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
    "id": "btnfee-rujukan-rontgen",
    "slug": "btnfee-rujukan-rontgen",
    "judul": "Fee Rujukan Rontgen",
    "kategori": "I",
    "permissionKey": "fee_rujukan_rontgen",
    "javaRef": "DlgFeeRujukanRontgen",
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
    "id": "btnfee-rujukan-ranap",
    "slug": "btnfee-rujukan-ranap",
    "judul": "Fee Rujukan Ranap",
    "kategori": "I",
    "permissionKey": "fee_rujukan_ranap",
    "javaRef": "btnfee-rujukan-ranap",
    "tabel": "billing",
    "kolom": [
      {
        "nama": "noindex",
        "label": "Noindex",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_byr",
        "label": "Tgl Byr",
        "tipe": "date"
      },
      {
        "nama": "no",
        "label": "No",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "pemisah",
        "label": "Pemisah",
        "wajib": true,
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tambahan",
        "label": "Tambahan",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "totalbiaya",
        "label": "Totalbiaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Laborat",
          "Radiologi",
          "Operasi",
          "Obat",
          "Ranap Dokter",
          "Ranap Dokter Paramedis",
          "Ranap Paramedis",
          "Ralan Dokter",
          "Ralan Dokter Paramedis",
          "Ralan Paramedis",
          "Tambahan",
          "Potongan",
          "Administrasi",
          "Kamar",
          "-",
          "Registrasi",
          "Harian",
          "Service",
          "TtlObat",
          "TtlRanap Dokter",
          "TtlRanap Paramedis",
          "TtlRalan Dokter",
          "TtlRalan Paramedis",
          "TtlKamar",
          "Dokter",
          "Perawat",
          "TtlTambahan",
          "Retur Obat",
          "TtlRetur Obat",
          "Resep Pulang",
          "TtlResep Pulang",
          "TtlPotongan",
          "TtlLaborat",
          "TtlOperasi",
          "TtlRadiologi",
          "Tagihan"
        ]
      }
    ],
    "kolomTanggal": "tgl_byr",
    "kolomCari": [
      "no_rawat",
      "no",
      "nm_perawatan",
      "pemisah"
    ],
    "kolomUrut": "tgl_byr",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btnfee-ralan",
    "slug": "btnfee-ralan",
    "judul": "Fee Periksa Ralan",
    "kategori": "I",
    "permissionKey": "fee_ralan",
    "javaRef": "DlgFeePeriksaRalan",
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
    "id": "btn-detail-vkok",
    "slug": "detail-vkok",
    "judul": "Detail VK & OK",
    "kategori": "I",
    "permissionKey": "detail_tindakan_okvk",
    "javaRef": "DlgDetailVKOK",
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
    "id": "btn-jasa-tindakan-pasien",
    "slug": "jasa-tindakan-pasien",
    "judul": "Jasa Tindakan Pasien",
    "kategori": "I",
    "permissionKey": "jasa_tindakan_pasien",
    "javaRef": "KeuanganJasaTindakan",
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
    "id": "btn-ringkasan-jasa-tindakan-pasien",
    "slug": "ringkasan-jasa-tindakan-pasien",
    "judul": "Ringkasan Jasa Tindakan Pasien",
    "kategori": "I",
    "permissionKey": "ringkasan_jasa_tindakan_medis",
    "javaRef": "KeuanganRingkasanJasaTindakan",
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
    "id": "btn-ralan-masuk",
    "slug": "ralan-masuk",
    "judul": "Pembayaran Ralan",
    "kategori": "I",
    "permissionKey": "pembayaran_ralan",
    "javaRef": "DlgPembayaranRalan",
    "tabel": "nota_jalan",
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
        "nama": "no_nota",
        "label": "No Nota",
        "tipe": "text",
        "maks": 17
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "no_nota"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ranap-masuk",
    "slug": "ranap-masuk",
    "judul": "Pembayaran Ranap",
    "kategori": "I",
    "permissionKey": "pembayaran_ranap",
    "javaRef": "DlgPembayaranRanap",
    "tabel": "billing",
    "kolom": [
      {
        "nama": "noindex",
        "label": "Noindex",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_byr",
        "label": "Tgl Byr",
        "tipe": "date"
      },
      {
        "nama": "no",
        "label": "No",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "pemisah",
        "label": "Pemisah",
        "wajib": true,
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tambahan",
        "label": "Tambahan",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "totalbiaya",
        "label": "Totalbiaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Laborat",
          "Radiologi",
          "Operasi",
          "Obat",
          "Ranap Dokter",
          "Ranap Dokter Paramedis",
          "Ranap Paramedis",
          "Ralan Dokter",
          "Ralan Dokter Paramedis",
          "Ralan Paramedis",
          "Tambahan",
          "Potongan",
          "Administrasi",
          "Kamar",
          "-",
          "Registrasi",
          "Harian",
          "Service",
          "TtlObat",
          "TtlRanap Dokter",
          "TtlRanap Paramedis",
          "TtlRalan Dokter",
          "TtlRalan Paramedis",
          "TtlKamar",
          "Dokter",
          "Perawat",
          "TtlTambahan",
          "Retur Obat",
          "TtlRetur Obat",
          "Resep Pulang",
          "TtlResep Pulang",
          "TtlPotongan",
          "TtlLaborat",
          "TtlOperasi",
          "TtlRadiologi",
          "Tagihan"
        ]
      }
    ],
    "kolomTanggal": "tgl_byr",
    "kolomCari": [
      "no_rawat",
      "no",
      "nm_perawatan",
      "pemisah"
    ],
    "kolomUrut": "tgl_byr",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-lihat-piutang",
    "slug": "lihat-piutang",
    "judul": "Piutang Pasien",
    "kategori": "I",
    "permissionKey": "piutang_pasien",
    "javaRef": "DlgLhtPiutang",
    "tabel": "piutang_pasien",
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
        "nama": "tgl_piutang",
        "label": "Tgl. Piutang",
        "tipe": "date"
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "lunas",
          "belum lunas"
        ],
        "wajib": true
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
      "no_rawat",
      "no_rkm_medis",
      "status"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "totalpiutang",
      "label": "Total Totalpiutang"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-piutang-ralan",
    "slug": "piutang-ralan",
    "judul": "Piutang Ralan",
    "kategori": "I",
    "permissionKey": "piutang_ralan",
    "javaRef": "DlgPiutangRalan",
    "tabel": "nota_jalan",
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
        "nama": "no_nota",
        "label": "No Nota",
        "tipe": "text",
        "maks": 17
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "no_nota"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-piutang-ranap",
    "slug": "piutang-ranap",
    "judul": "Piutang Ranap",
    "kategori": "I",
    "permissionKey": "piutang_ranap",
    "javaRef": "DlgPiutangRanap",
    "tabel": "billing",
    "kolom": [
      {
        "nama": "noindex",
        "label": "Noindex",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_byr",
        "label": "Tgl Byr",
        "tipe": "date"
      },
      {
        "nama": "no",
        "label": "No",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "pemisah",
        "label": "Pemisah",
        "wajib": true,
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tambahan",
        "label": "Tambahan",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "totalbiaya",
        "label": "Totalbiaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Laborat",
          "Radiologi",
          "Operasi",
          "Obat",
          "Ranap Dokter",
          "Ranap Dokter Paramedis",
          "Ranap Paramedis",
          "Ralan Dokter",
          "Ralan Dokter Paramedis",
          "Ralan Paramedis",
          "Tambahan",
          "Potongan",
          "Administrasi",
          "Kamar",
          "-",
          "Registrasi",
          "Harian",
          "Service",
          "TtlObat",
          "TtlRanap Dokter",
          "TtlRanap Paramedis",
          "TtlRalan Dokter",
          "TtlRalan Paramedis",
          "TtlKamar",
          "Dokter",
          "Perawat",
          "TtlTambahan",
          "Retur Obat",
          "TtlRetur Obat",
          "Resep Pulang",
          "TtlResep Pulang",
          "TtlPotongan",
          "TtlLaborat",
          "TtlOperasi",
          "TtlRadiologi",
          "Tagihan"
        ]
      }
    ],
    "kolomTanggal": "tgl_byr",
    "kolomCari": [
      "no_rawat",
      "no",
      "nm_perawatan",
      "pemisah"
    ],
    "kolomUrut": "tgl_byr",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-tagihan-ralan-perhari",
    "slug": "tagihan-ralan-perhari",
    "judul": "Rekap Pembayaran Ralan",
    "kategori": "I",
    "permissionKey": "rekap_pembayaran_ralan",
    "javaRef": "DlgPembayaranRalanPerHari",
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
    "id": "btn-tagihan-ranap-perhari",
    "slug": "tagihan-ranap-perhari",
    "judul": "Rekap Pembayaran Ranap",
    "kategori": "I",
    "permissionKey": "rekap_pembayaran_ranap",
    "javaRef": "DlgPembayaranRanapPerhari",
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
    "id": "btn-pembayaran-per-unit",
    "slug": "pembayaran-per-unit",
    "judul": "Pembayaran Per Unit",
    "kategori": "I",
    "permissionKey": "pembayaran_per_unit",
    "javaRef": "DlgPembayaranPerPoli",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-pembayaran-per-unit",
    "slug": "rekap-pembayaran-per-unit",
    "judul": "Rekap Pembayaran Per Unit",
    "kategori": "I",
    "permissionKey": "rekap_pembayaran_per_unit",
    "javaRef": "DlgRekapPembayaranPerPoli",
    "tabel": "detail_nota_jalan",
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
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "besarppn",
        "label": "Besarppn",
        "tipe": "uang"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "no_rawat",
      "nama_bayar"
    ],
    "kolomUrut": "no_rawat",
    "kolomRingkasan": {
      "nama": "besarppn",
      "label": "Total Besarppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-tagihan-masuk",
    "slug": "tagihan-masuk",
    "judul": "Tagihan Masuk",
    "kategori": "I",
    "permissionKey": "tagihan_masuk",
    "javaRef": "DlgLhtBiaya",
    "tabel": "billing",
    "kolom": [
      {
        "nama": "noindex",
        "label": "Noindex",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tgl_byr",
        "label": "Tgl Byr",
        "tipe": "date"
      },
      {
        "nama": "no",
        "label": "No",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nm_perawatan",
        "label": "Nm Perawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "pemisah",
        "label": "Pemisah",
        "wajib": true,
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "tambahan",
        "label": "Tambahan",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "totalbiaya",
        "label": "Totalbiaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Laborat",
          "Radiologi",
          "Operasi",
          "Obat",
          "Ranap Dokter",
          "Ranap Dokter Paramedis",
          "Ranap Paramedis",
          "Ralan Dokter",
          "Ralan Dokter Paramedis",
          "Ralan Paramedis",
          "Tambahan",
          "Potongan",
          "Administrasi",
          "Kamar",
          "-",
          "Registrasi",
          "Harian",
          "Service",
          "TtlObat",
          "TtlRanap Dokter",
          "TtlRanap Paramedis",
          "TtlRalan Dokter",
          "TtlRalan Paramedis",
          "TtlKamar",
          "Dokter",
          "Perawat",
          "TtlTambahan",
          "Retur Obat",
          "TtlRetur Obat",
          "Resep Pulang",
          "TtlResep Pulang",
          "TtlPotongan",
          "TtlLaborat",
          "TtlOperasi",
          "TtlRadiologi",
          "Tagihan"
        ]
      }
    ],
    "kolomTanggal": "tgl_byr",
    "kolomCari": [
      "no_rawat",
      "no",
      "nm_perawatan",
      "pemisah"
    ],
    "kolomUrut": "tgl_byr",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-tambahan-biaya",
    "slug": "tambahan-biaya",
    "judul": "Tambahan Biaya Pasien",
    "kategori": "I",
    "permissionKey": "tambahan_biaya",
    "javaRef": "DlgDetailTambahan",
    "tabel": "tambahan_biaya",
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
        "nama": "nama_biaya",
        "label": "Nama Biaya",
        "pk": true,
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "besar_biaya",
        "label": "Besar Biaya",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "no_rawat",
      "nama_biaya"
    ],
    "kolomUrut": "no_rawat",
    "kolomRingkasan": {
      "nama": "besar_biaya",
      "label": "Total Besar Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-potongan-biaya",
    "slug": "potongan-biaya",
    "judul": "Potongan Biaya Pasien",
    "kategori": "I",
    "permissionKey": "potongan_biaya",
    "javaRef": "DlgDetailPotongan",
    "tabel": "pengurangan_biaya",
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
        "nama": "nama_pengurangan",
        "label": "Nama Pengurangan",
        "pk": true,
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "besar_pengurangan",
        "label": "Besar Pengurangan",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "no_rawat",
      "nama_pengurangan"
    ],
    "kolomUrut": "no_rawat",
    "kolomRingkasan": {
      "nama": "besar_pengurangan",
      "label": "Total Besar Pengurangan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekap-poli-anak",
    "slug": "rekap-poli-anak",
    "judul": "Rekap Poli Anak",
    "kategori": "I",
    "permissionKey": "rekap_poli_anak",
    "javaRef": "KeuanganRekapPoliAnak",
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
    "id": "btn-rekap-pershift",
    "slug": "rekap-pershift",
    "judul": "Rekap Uang Pershift",
    "kategori": "I",
    "permissionKey": "rekap_per_shift",
    "javaRef": "DlgRekapPerShift",
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
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-payment-point",
    "slug": "payment-point",
    "judul": "Payment Point",
    "kategori": "I",
    "permissionKey": "payment_point",
    "javaRef": "DlgPaymentPoint",
    "tabel": "temporary_payment",
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
    "id": "btn-payment-point2",
    "slug": "payment-point2",
    "judul": "Payment Point 2",
    "kategori": "I",
    "permissionKey": "payment_point2",
    "javaRef": "DlgPaymentPoint2",
    "tabel": "temporary_payment",
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
    "id": "btn-pembayaran-akun-bayar",
    "slug": "pembayaran-akun-bayar",
    "judul": "Pembayaran Per Akun Bayar",
    "kategori": "I",
    "permissionKey": "pembayaran_akun_bayar",
    "javaRef": "DlgPembayaranPerAKunBayar",
    "tabel": "akun_bayar",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-akun-bayar2",
    "slug": "pembayaran-akun-bayar2",
    "judul": "Pembayaran Per Akun Bayar 2",
    "kategori": "I",
    "permissionKey": "pembayaran_akun_bayar2",
    "javaRef": "DlgPembayaranPerAKunBayar2",
    "tabel": "akun_bayar",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-akun-bayar3",
    "slug": "pembayaran-akun-bayar3",
    "judul": "Pembayaran Per Akun Bayar 3",
    "kategori": "I",
    "permissionKey": "pembayaran_akun_bayar3",
    "javaRef": "DlgPembayaranPerAKunBayar3",
    "tabel": "akun_bayar",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-akun-bayar4",
    "slug": "pembayaran-akun-bayar4",
    "judul": "Pembayaran Per Akun Bayar 4",
    "kategori": "I",
    "permissionKey": "pembayaran_akun_bayar4",
    "javaRef": "DlgPembayaranPerAKunBayar4",
    "tabel": "akun_bayar",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-akun-bayar5",
    "slug": "pembayaran-akun-bayar5",
    "judul": "Pembayaran Per Akun Bayar 5",
    "kategori": "I",
    "permissionKey": "pembayaran_akun_bayar5",
    "javaRef": "DlgPembayaranPerAKunBayar5",
    "tabel": "akun_bayar",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "ppn",
        "label": "Ppn",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "kolomRingkasan": {
      "nama": "ppn",
      "label": "Total Ppn"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-piutang-per-akun-piutang",
    "slug": "piutang-per-akun-piutang",
    "judul": "Piutang Per Akun Piutang",
    "kategori": "I",
    "permissionKey": "piutang_akun_piutang",
    "javaRef": "DlgPiutangPerAKunPiutang",
    "tabel": "akun_piutang",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek",
      "kd_pj"
    ],
    "kolomUrut": "nama_bayar",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pendapatan-per-akun",
    "slug": "pendapatan-per-akun",
    "judul": "Pendapatan Per Akun Rekening",
    "kategori": "I",
    "permissionKey": "pendapatan_per_akun",
    "javaRef": "DlgPendapatanPerAKun",
    "tabel": "set_akun",
    "kolom": [
      {
        "nama": "Pengadaan_Obat",
        "label": "Pengadaan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Pemesanan_Obat",
        "label": "Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Pemesanan_Obat",
        "label": "Kontra Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Bayar_Pemesanan_Obat",
        "label": "Bayar Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Penjualan_Obat",
        "label": "Penjualan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Piutang_Obat",
        "label": "Piutang Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Piutang_Obat",
        "label": "Kontra Piutang Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Ke_Suplayer",
        "label": "Retur Ke Suplayer",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Retur_Ke_Suplayer",
        "label": "Kontra Retur Ke Suplayer",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Dari_pembeli",
        "label": "Retur Dari Pembeli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Retur_Dari_Pembeli",
        "label": "Kontra Retur Dari Pembeli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Piutang_Obat",
        "label": "Retur Piutang Obat",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "Pengadaan_Obat",
      "Pemesanan_Obat",
      "Kontra_Pemesanan_Obat",
      "Bayar_Pemesanan_Obat",
      "Penjualan_Obat",
      "Piutang_Obat"
    ],
    "kolomUrut": "Pengadaan_Obat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pendapatan-per-akun-closing",
    "slug": "pendapatan-per-akun-closing",
    "judul": "Pendapatan Per Akun Closing",
    "kategori": "I",
    "permissionKey": "pendapatan_per_akun_closing",
    "javaRef": "DlgPendapatanPerAKunClosing",
    "tabel": "set_akun",
    "kolom": [
      {
        "nama": "Pengadaan_Obat",
        "label": "Pengadaan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Pemesanan_Obat",
        "label": "Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Pemesanan_Obat",
        "label": "Kontra Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Bayar_Pemesanan_Obat",
        "label": "Bayar Pemesanan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Penjualan_Obat",
        "label": "Penjualan Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Piutang_Obat",
        "label": "Piutang Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Piutang_Obat",
        "label": "Kontra Piutang Obat",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Ke_Suplayer",
        "label": "Retur Ke Suplayer",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Retur_Ke_Suplayer",
        "label": "Kontra Retur Ke Suplayer",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Dari_pembeli",
        "label": "Retur Dari Pembeli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Kontra_Retur_Dari_Pembeli",
        "label": "Kontra Retur Dari Pembeli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Retur_Piutang_Obat",
        "label": "Retur Piutang Obat",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "Pengadaan_Obat",
      "Pemesanan_Obat",
      "Kontra_Pemesanan_Obat",
      "Bayar_Pemesanan_Obat",
      "Penjualan_Obat",
      "Piutang_Obat"
    ],
    "kolomUrut": "Pengadaan_Obat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_TAGIHAN: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_TAGIHAN.map((item) => [item.slug, item]),
);

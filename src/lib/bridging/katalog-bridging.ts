import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_BRIDGING: readonly DefinisiModulKatalog[] = [
  {
    "id": "bpjs-vclaim",
    "slug": "bpjs-vclaim",
    "judul": "BPJS Kesehatan VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_sep",
    "javaRef": "BPJSDataSEP",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdiagnosaawal",
        "label": "Nmdiagnosaawal",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "kdpolitujuan",
        "label": "Kdpolitujuan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nmpolitujuan",
        "label": "Nmpolitujuan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "klsrawat",
        "label": "Klsrawat",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "klsnaik",
        "label": "Klsnaik",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "wajib": true
      },
      {
        "nama": "pembiayaan",
        "label": "Pembiayaan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pjnaikkelas",
        "label": "Pjnaikkelas",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lakalantas",
        "label": "Lakalantas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nomr",
        "label": "Nomr",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "tipe": "date"
      },
      {
        "nama": "peserta",
        "label": "Peserta",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jkel",
        "label": "Jkel",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ]
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tglpulang",
        "label": "Tglpulang",
        "tipe": "datetime"
      },
      {
        "nama": "asal_rujukan",
        "label": "Asal Rujukan",
        "tipe": "enum",
        "opsi": [
          "1. faskes 1",
          "2. faskes 2(rs)"
        ],
        "wajib": true
      },
      {
        "nama": "eksekutif",
        "label": "Eksekutif",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "cob",
        "label": "Cob",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "notelep",
        "label": "Notelep",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "katarak",
        "label": "Katarak",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "tglkkl",
        "label": "Tglkkl",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "keterangankkl",
        "label": "Keterangankkl",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "suplesi",
        "label": "Suplesi",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "no_sep_suplesi",
        "label": "No. SEP Suplesi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kdprop",
        "label": "Kdprop",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmprop",
        "label": "Nmprop",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkab",
        "label": "Kdkab",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkab",
        "label": "Nmkab",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkec",
        "label": "Kdkec",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkec",
        "label": "Nmkec",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "noskdp",
        "label": "Noskdp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kddpjp",
        "label": "Kddpjp",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpdjp",
        "label": "Nmdpdjp",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tujuankunjungan",
        "label": "Tujuankunjungan",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "flagprosedur",
        "label": "Flagprosedur",
        "tipe": "enum",
        "opsi": [
          "",
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "enum",
        "opsi": [
          "",
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
          "12"
        ],
        "wajib": true
      },
      {
        "nama": "asesmenpelayanan",
        "label": "Asesmenpelayanan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "wajib": true
      },
      {
        "nama": "kddpjplayanan",
        "label": "Kddpjplayanan",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpjplayanan",
        "label": "Nmdpjplayanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "satusehat-kemenkes",
    "slug": "satusehat-kemenkes",
    "judul": "Kemenkes SatuSehat",
    "kategori": "L",
    "permissionKey": "aplikasi",
    "javaRef": "SatuSehatKirimEncounter",
    "tabel": "satu_sehat_encounter",
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
        "nama": "id_encounter",
        "label": "Id Encounter",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rawat",
      "id_encounter"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-kartu",
    "slug": "cek-bpjs-kartu",
    "judul": "Cek No.Kartu VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_kartu",
    "javaRef": "BPJSCekKartu",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-nik",
    "slug": "cek-bpjs-nik",
    "judul": "Cek NIK VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_nik",
    "javaRef": "BPJSCekNIK2",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjsskdp",
    "slug": "cek-bpjsskdp",
    "judul": "Cek SKDP VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_skdp",
    "javaRef": "BPJSCekSKDP",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-riwayat-rujukan-p-care",
    "slug": "cek-bpjs-riwayat-rujukan-p-care",
    "judul": "Riwayat Rujukan PCare di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_riwayat",
    "javaRef": "BPJSCekRiwayatRujukanPCare",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-riwayat-rujukan-rs",
    "slug": "cek-bpjs-riwayat-rujukan-rs",
    "judul": "Riwayat Rujukan RS di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_riwayat_rujukanrs",
    "javaRef": "BPJSCekRiwayatRujukanRS",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-tanggal-rujukan",
    "slug": "cek-bpjs-tanggal-rujukan",
    "judul": "Tanggal Rujukan di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_tanggal_rujukan",
    "javaRef": "BPJSCekTanggalRujukan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-nomor-rujukan-p-care",
    "slug": "cek-bpjs-nomor-rujukan-p-care",
    "judul": "Cek No.Rujukan PCare di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_nomor_rujukan",
    "javaRef": "BPJSCekNoRujukanPCare",
    "tabel": "pasien_tni",
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
        "nama": "golongan_tni",
        "label": "Golongan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "pangkat_tni",
        "label": "Pangkat Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "satuan_tni",
        "label": "Satuan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "jabatan_tni",
        "label": "Jabatan Tni",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-nomor-rujukan-rs",
    "slug": "cek-bpjs-nomor-rujukan-rs",
    "judul": "Cek No.Rujukan RS di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_nomor_rujukan_rs",
    "javaRef": "BPJSCekNoRujukanRS",
    "tabel": "pasien_tni",
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
        "nama": "golongan_tni",
        "label": "Golongan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "pangkat_tni",
        "label": "Pangkat Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "satuan_tni",
        "label": "Satuan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "jabatan_tni",
        "label": "Jabatan Tni",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-rujukan-kartu-p-care",
    "slug": "cek-bpjs-rujukan-kartu-p-care",
    "judul": "Cek Rujukan Kartu PCare di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_rujukan_kartu_pcare",
    "javaRef": "BPJSCekRujukanKartuPCare",
    "tabel": "pasien_tni",
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
        "nama": "golongan_tni",
        "label": "Golongan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "pangkat_tni",
        "label": "Pangkat Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "satuan_tni",
        "label": "Satuan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "jabatan_tni",
        "label": "Jabatan Tni",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-rujukan-kartu-rs",
    "slug": "cek-bpjs-rujukan-kartu-rs",
    "judul": "Cek Rujukan Kartu RS di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_rujukan_kartu_rs",
    "javaRef": "BPJSCekRujukanKartuRS",
    "tabel": "pasien_tni",
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
        "nama": "golongan_tni",
        "label": "Golongan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "pangkat_tni",
        "label": "Pangkat Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "satuan_tni",
        "label": "Satuan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "jabatan_tni",
        "label": "Jabatan Tni",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-histori-pelayanan",
    "slug": "bpjs-histori-pelayanan",
    "judul": "Histori Pelayanan BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_histori_pelayanan",
    "javaRef": "BPJSHistoriPelayanan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-diagnosa",
    "slug": "cek-bpjs-diagnosa",
    "judul": "Referensi Diagnosa VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_diagnosa",
    "javaRef": "BPJSCekReferensiPenyakit",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-bpjs-poli",
    "slug": "cek-bpjs-poli",
    "judul": "Referensi Poli VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_poli",
    "javaRef": "BPJSCekReferensiPoli",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-maping-poli-bpjs",
    "slug": "maping-poli-bpjs",
    "judul": "Mapping Poli VClaim",
    "kategori": "L",
    "permissionKey": "mapping_poli_bpjs",
    "javaRef": "BPJSMapingPoli",
    "tabel": "maping_poli_bpjs",
    "kolom": [
      {
        "nama": "kd_poli_rs",
        "label": "Kode Poli Rs",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_poli_bpjs",
        "label": "Kode Poli BPJS",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nm_poli_bpjs",
        "label": "Nama Poli BPJS",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_poli_rs",
      "kd_poli_bpjs",
      "nm_poli_bpjs"
    ],
    "kolomUrut": "kd_poli_rs",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cek-bpjs-faskes",
    "slug": "cek-bpjs-faskes",
    "judul": "Referensi Faskes VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_faskes",
    "javaRef": "BPJSCekReferensiFaskes",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-prosedur-bpjs",
    "slug": "cek-referensi-prosedur-bpjs",
    "judul": "Referensi Prosedur VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_prosedur",
    "javaRef": "BPJSCekReferensiProsedur",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-kelas-rawat-bpjs",
    "slug": "cek-referensi-kelas-rawat-bpjs",
    "judul": "Referensi Kelas Rawat VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_kelas_rawat",
    "javaRef": "BPJSCekReferensiKelasRawat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-dokter-bpjs",
    "slug": "cek-referensi-dokter-bpjs",
    "judul": "Referensi Dokter VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_dokter",
    "javaRef": "BPJSCekReferensiDokter",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-spesialistik-bpjs",
    "slug": "cek-referensi-spesialistik-bpjs",
    "judul": "Referensi Spesialistik VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_spesialistik",
    "javaRef": "BPJSCekReferensiSpesialistik",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-ruang-rawat-bpjs",
    "slug": "cek-referensi-ruang-rawat-bpjs",
    "judul": "Referensi Ruang Rawat VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_ruangrawat",
    "javaRef": "BPJSCekReferensiRuangRawat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-cara-keluar-bpjs",
    "slug": "cek-referensi-cara-keluar-bpjs",
    "judul": "Referensi Cara Keluar VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_carakeluar",
    "javaRef": "BPJSCekReferensiCaraKeluar",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-pasca-pulang-bpjs",
    "slug": "cek-referensi-pasca-pulang-bpjs",
    "judul": "Referensi Pasca Pulang VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_pasca_pulang",
    "javaRef": "BPJSCekReferensiPascaPulang",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-propinsi-bpjs",
    "slug": "cek-referensi-propinsi-bpjs",
    "judul": "Referensi Propinsi VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_propinsi",
    "javaRef": "BPJSCekReferensiPropinsi",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-kabupaten-bpjs",
    "slug": "cek-referensi-kabupaten-bpjs",
    "judul": "Referensi Kabupaten VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_kabupaten",
    "javaRef": "BPJSCekReferensiKabupaten",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-kecamatan-bpjs",
    "slug": "cek-referensi-kecamatan-bpjs",
    "judul": "Referensi Kecamatan VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_kecamatan",
    "javaRef": "BPJSCekReferensiKecamatan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-referensi-dokter-dpjpbpjs",
    "slug": "cek-referensi-dokter-dpjpbpjs",
    "judul": "Referensi Dokter DPJP VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_cek_dokterdpjp",
    "javaRef": "BPJSCekReferensiDokterDPJP",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-diagnosa-prb",
    "slug": "bpjs-referensi-diagnosa-prb",
    "judul": "Referensi Diagnosa PRB VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_diagnosa_prb",
    "javaRef": "BPJSCekReferensiDiagnosaPRB",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-obat-prb",
    "slug": "bpjs-referensi-obat-prb",
    "judul": "Referensi Obat PRB VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_obat_prb",
    "javaRef": "BPJSCekReferensiObatPRB",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-program-prb",
    "slug": "bpjs-program-prb",
    "judul": "Program PRB di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_program_prb",
    "javaRef": "BPJSProgramPRB",
    "tabel": "bridging_srb_bpjs",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_srb",
        "label": "No. Srb",
        "pk": true,
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "tgl_srb",
        "label": "Tgl. Srb",
        "tipe": "date"
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kodeprogram",
        "label": "Kodeprogram",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "namaprogram",
        "label": "Namaprogram",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "kodedpjp",
        "label": "Kodedpjp",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdpjp",
        "label": "Nmdpjp",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tgl_srb",
    "kolomCari": [
      "no_sep",
      "no_srb",
      "alamat",
      "email",
      "kodeprogram",
      "namaprogram"
    ],
    "kolomUrut": "tgl_srb",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-dokter-dpjpv-claim",
    "slug": "mapping-dokter-dpjpv-claim",
    "judul": "Mapping Dokter DPJP VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_mapping_dokterdpjp",
    "javaRef": "BPJSMapingDokterDPJP",
    "tabel": "maping_dokter_dpjpvclaim",
    "kolom": [
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bpjs",
        "label": "Kode Dokter BPJS",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nm_dokter_bpjs",
        "label": "Nama Dokter BPJS",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd_dokter",
      "kd_dokter_bpjs",
      "nm_dokter_bpjs"
    ],
    "kolomUrut": "kd_dokter",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bpjssep",
    "slug": "bpjssep",
    "judul": "Data Bridging SEP VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_sep",
    "javaRef": "BPJSDataSEP",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdiagnosaawal",
        "label": "Nmdiagnosaawal",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "kdpolitujuan",
        "label": "Kdpolitujuan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nmpolitujuan",
        "label": "Nmpolitujuan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "klsrawat",
        "label": "Klsrawat",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "klsnaik",
        "label": "Klsnaik",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "wajib": true
      },
      {
        "nama": "pembiayaan",
        "label": "Pembiayaan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pjnaikkelas",
        "label": "Pjnaikkelas",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lakalantas",
        "label": "Lakalantas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nomr",
        "label": "Nomr",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "tipe": "date"
      },
      {
        "nama": "peserta",
        "label": "Peserta",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jkel",
        "label": "Jkel",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ]
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tglpulang",
        "label": "Tglpulang",
        "tipe": "datetime"
      },
      {
        "nama": "asal_rujukan",
        "label": "Asal Rujukan",
        "tipe": "enum",
        "opsi": [
          "1. faskes 1",
          "2. faskes 2(rs)"
        ],
        "wajib": true
      },
      {
        "nama": "eksekutif",
        "label": "Eksekutif",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "cob",
        "label": "Cob",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "notelep",
        "label": "Notelep",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "katarak",
        "label": "Katarak",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "tglkkl",
        "label": "Tglkkl",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "keterangankkl",
        "label": "Keterangankkl",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "suplesi",
        "label": "Suplesi",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "no_sep_suplesi",
        "label": "No. SEP Suplesi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kdprop",
        "label": "Kdprop",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmprop",
        "label": "Nmprop",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkab",
        "label": "Kdkab",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkab",
        "label": "Nmkab",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkec",
        "label": "Kdkec",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkec",
        "label": "Nmkec",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "noskdp",
        "label": "Noskdp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kddpjp",
        "label": "Kddpjp",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpdjp",
        "label": "Nmdpdjp",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tujuankunjungan",
        "label": "Tujuankunjungan",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "flagprosedur",
        "label": "Flagprosedur",
        "tipe": "enum",
        "opsi": [
          "",
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "enum",
        "opsi": [
          "",
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
          "12"
        ],
        "wajib": true
      },
      {
        "nama": "asesmenpelayanan",
        "label": "Asesmenpelayanan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "wajib": true
      },
      {
        "nama": "kddpjplayanan",
        "label": "Kddpjplayanan",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpjplayanan",
        "label": "Nmdpjplayanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cek-sep",
    "slug": "cek-sep",
    "judul": "Cek Nomor SEP",
    "kategori": "L",
    "permissionKey": "bpjs_cek_sep",
    "javaRef": "BPJSCekDetailSEP2",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rujukan-keluar-bpjs",
    "slug": "rujukan-keluar-bpjs",
    "judul": "Data Rujukan Keluar VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_rujukan_keluar",
    "javaRef": "BPJSRujukanKeluar",
    "tabel": "bridging_rujukan_bpjs",
    "kolom": [
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_sep",
        "label": "No Sep",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tglRujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "tglRencanaKunjungan",
        "label": "Tglrencanakunjungan",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "ppkDirujuk",
        "label": "Ppkdirujuk",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nm_ppkDirujuk",
        "label": "Nm Ppkdirujuk",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jnsPelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "diagRujukan",
        "label": "Diagrujukan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nama_diagRujukan",
        "label": "Nama Diagrujukan",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "tipeRujukan",
        "label": "Tiperujukan",
        "tipe": "enum",
        "opsi": [
          "0. Penuh",
          "1. Partial",
          "2. Rujuk Balik"
        ]
      },
      {
        "nama": "poliRujukan",
        "label": "Polirujukan",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tglRujukan",
    "kolomCari": [
      "no_rujukan",
      "no_sep",
      "ppkDirujuk",
      "nm_ppkDirujuk",
      "catatan",
      "diagRujukan"
    ],
    "kolomUrut": "tglRujukan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-monitoring-klaim",
    "slug": "monitoring-klaim",
    "judul": "Monitoring Verifikasi Klaim BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_monitoring_klaim",
    "javaRef": "BPJSMonitoringKlaim",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-surat-kontrol",
    "slug": "bpjs-surat-kontrol",
    "judul": "Surat Kontrol VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_surat_kontrol",
    "javaRef": "BPJSSuratKontrol",
    "tabel": "bridging_surat_kontrol_bpjs",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tgl_surat",
        "label": "Tgl. Surat",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "tgl_rencana",
        "label": "Tgl. Rencana",
        "tipe": "date"
      },
      {
        "nama": "kd_dokter_bpjs",
        "label": "Kode Dokter BPJS",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nm_dokter_bpjs",
        "label": "Nama Dokter BPJS",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_poli_bpjs",
        "label": "Kode Poli BPJS",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_poli_bpjs",
        "label": "Nama Poli BPJS",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_surat",
    "kolomCari": [
      "no_sep",
      "no_surat",
      "kd_dokter_bpjs",
      "nm_dokter_bpjs",
      "kd_poli_bpjs",
      "nm_poli_bpjs"
    ],
    "kolomUrut": "tgl_surat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bpjs-surat-pri",
    "slug": "bpjs-surat-pri",
    "judul": "Surat PRI VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_surat_pri",
    "javaRef": "BPJSSPRI",
    "tabel": "bridging_surat_pri_bpjs",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tgl_surat",
        "label": "Tgl. Surat",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "no_surat",
        "label": "No. Surat",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "tgl_rencana",
        "label": "Tgl. Rencana",
        "tipe": "date"
      },
      {
        "nama": "kd_dokter_bpjs",
        "label": "Kode Dokter BPJS",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nm_dokter_bpjs",
        "label": "Nama Dokter BPJS",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kd_poli_bpjs",
        "label": "Kode Poli BPJS",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_poli_bpjs",
        "label": "Nama Poli BPJS",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 130,
        "wajib": true
      },
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_surat",
    "kolomCari": [
      "no_rawat",
      "no_kartu",
      "no_surat",
      "kd_dokter_bpjs",
      "nm_dokter_bpjs",
      "kd_poli_bpjs"
    ],
    "kolomUrut": "tgl_surat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bpjs-suplesi-jasa-raharja",
    "slug": "bpjs-suplesi-jasa-raharja",
    "judul": "Suplesi Jasa Raharja di VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_suplesi_jasaraharja",
    "javaRef": "BPJSCekSuplesiJasaRaharja",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-data-induk-kecelakaan",
    "slug": "bpjs-data-induk-kecelakaan",
    "judul": "Data Induk Kecelakaan VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_data_induk_kecelakaan",
    "javaRef": "BPJSCekDataIndukKecelakaan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-data-sep-internal",
    "slug": "bpjs-data-sep-internal",
    "judul": "Data SEP Internal VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_sep_internal",
    "javaRef": "BPJSCekDataSEPInternal",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-klaim-jasa-raharja",
    "slug": "bpjs-klaim-jasa-raharja",
    "judul": "Klaim Jaminan Jasa Raharja VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_klaim_jasa_raharja",
    "javaRef": "BPJSCekKlaimJasaRaharja",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-pasien-finger",
    "slug": "bpjs-pasien-finger",
    "judul": "Pasien Finger Print VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_daftar_finger_print",
    "javaRef": "BPJSDataFingerPrintPasien",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-rujukan-khusus",
    "slug": "bpjs-rujukan-khusus",
    "judul": "Rujukan Khusus VClaim",
    "kategori": "L",
    "permissionKey": "bpjs_rujukan_khusus",
    "javaRef": "BPJSRujukanKhusus",
    "tabel": "bridging_rujukan_bpjs_khusus",
    "kolom": [
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "nokapst",
        "label": "Nokapst",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nmpst",
        "label": "Nmpst",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tglrujukan_awal",
        "label": "Tglrujukan Awal",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan_berakhir",
        "label": "Tglrujukan Berakhir",
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tglrujukan_awal",
    "kolomCari": [
      "no_rujukan",
      "nokapst",
      "nmpst"
    ],
    "kolomUrut": "tglrujukan_awal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bpjs-referensi-poli-hfis",
    "slug": "bpjs-referensi-poli-hfis",
    "judul": "Referensi Poli HFIS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_poli_hfis",
    "javaRef": "BPJSCekReferensiPoliHFIS",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-dokter-hfis",
    "slug": "bpjs-referensi-dokter-hfis",
    "judul": "Referensi Dokter HFIS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_dokter_hfis",
    "javaRef": "BPJSCekReferensiDokterHFIS",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-jadwal-hfis",
    "slug": "bpjs-referensi-jadwal-hfis",
    "judul": "Referensi Jadwal HFIS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_jadwal_hfis",
    "javaRef": "BPJSCekReferensiJadwalHFIS",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-task-id-mobile-jkn",
    "slug": "bpjs-task-id-mobile-jkn",
    "judul": "Task ID Mobile JKN",
    "kategori": "L",
    "permissionKey": "bpjs_task_id",
    "javaRef": "BPJSTaskIDMobileJKN",
    "tabel": "referensi_mobilejkn_bpjs",
    "kolom": [
      {
        "nama": "nobooking",
        "label": "Nobooking",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "nomorkartu",
        "label": "Nomorkartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nik",
        "label": "Nik",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nohp",
        "label": "Nohp",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kodepoli",
        "label": "Kodepoli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "pasienbaru",
        "label": "Pasienbaru",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      },
      {
        "nama": "norm",
        "label": "Norm",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "tipe": "date"
      },
      {
        "nama": "kodedokter",
        "label": "Kodedokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jampraktek",
        "label": "Jampraktek",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "jeniskunjungan",
        "label": "Jeniskunjungan",
        "tipe": "enum",
        "opsi": [
          "1 (Rujukan FKTP)",
          "2 (Rujukan Internal)",
          "3 (Kontrol)",
          "4 (Rujukan Antar RS)"
        ]
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "nobooking",
      "no_rawat",
      "nomorkartu",
      "nik",
      "nohp",
      "kodepoli"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-antrean-per-tanggal-mobile-jkn",
    "slug": "bpjs-antrean-per-tanggal-mobile-jkn",
    "judul": "Antrean Per Tanggal Mobile JKN",
    "kategori": "L",
    "permissionKey": "bpjs_antrean_pertanggal",
    "javaRef": "BPJSAntreanPerTanggal",
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
    "id": "btn-bpjs-referensi-dpho-apotek",
    "slug": "bpjs-referensi-dpho-apotek",
    "judul": "Referensi DPHO Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_dpho_apotek",
    "javaRef": "ApotekBPJSCekReferensiDPHO",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-poli-apotek",
    "slug": "bpjs-referensi-poli-apotek",
    "judul": "Referensi Poli Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_poli_apotek",
    "javaRef": "ApotekBPJSCekReferensiPoli",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-faskes-apotek",
    "slug": "bpjs-referensi-faskes-apotek",
    "judul": "Referensi Faskes Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_faskes_apotek",
    "javaRef": "ApotekBPJSCekReferensiFaskes",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-spesialistik-apotek",
    "slug": "bpjs-referensi-spesialistik-apotek",
    "judul": "Referensi Spesialistik Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_spesialistik_apotek",
    "javaRef": "ApotekBPJSCekReferensiSpesialistik",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-setting-ppk-apotek",
    "slug": "bpjs-referensi-setting-ppk-apotek",
    "judul": "Referensi Setting PPK Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_setting_apotek",
    "javaRef": "ApotekBPJSCekReferensiSettingPPK",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-referensi-obat-apotek",
    "slug": "bpjs-referensi-obat-apotek",
    "judul": "Referensi Obat Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_referensi_obat_apotek",
    "javaRef": "ApotekBPJSCekReferensiObat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-maping-obat-apotek",
    "slug": "bpjs-maping-obat-apotek",
    "judul": "Mapping Obat Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_mapping_obat_apotek",
    "javaRef": "ApotekBPJSMapingObat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No. SEP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdiagnosaawal",
        "label": "Nmdiagnosaawal",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "kdpolitujuan",
        "label": "Kdpolitujuan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nmpolitujuan",
        "label": "Nmpolitujuan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "klsrawat",
        "label": "Klsrawat",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "klsnaik",
        "label": "Klsnaik",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "wajib": true
      },
      {
        "nama": "pembiayaan",
        "label": "Pembiayaan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pjnaikkelas",
        "label": "Pjnaikkelas",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lakalantas",
        "label": "Lakalantas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nomr",
        "label": "Nomr",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "tipe": "date"
      },
      {
        "nama": "peserta",
        "label": "Peserta",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jkel",
        "label": "Jkel",
        "tipe": "enum",
        "opsi": [
          "l",
          "p"
        ]
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tglpulang",
        "label": "Tglpulang",
        "tipe": "datetime"
      },
      {
        "nama": "asal_rujukan",
        "label": "Asal Rujukan",
        "tipe": "enum",
        "opsi": [
          "1. faskes 1",
          "2. faskes 2(rs)"
        ],
        "wajib": true
      },
      {
        "nama": "eksekutif",
        "label": "Eksekutif",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "cob",
        "label": "Cob",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "notelep",
        "label": "Notelep",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "katarak",
        "label": "Katarak",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "tglkkl",
        "label": "Tglkkl",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "keterangankkl",
        "label": "Keterangankkl",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "suplesi",
        "label": "Suplesi",
        "tipe": "enum",
        "opsi": [
          "0. tidak",
          "1.ya"
        ],
        "wajib": true
      },
      {
        "nama": "no_sep_suplesi",
        "label": "No. SEP Suplesi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kdprop",
        "label": "Kdprop",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmprop",
        "label": "Nmprop",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkab",
        "label": "Kdkab",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkab",
        "label": "Nmkab",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kdkec",
        "label": "Kdkec",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmkec",
        "label": "Nmkec",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "noskdp",
        "label": "Noskdp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kddpjp",
        "label": "Kddpjp",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpdjp",
        "label": "Nmdpdjp",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tujuankunjungan",
        "label": "Tujuankunjungan",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "flagprosedur",
        "label": "Flagprosedur",
        "tipe": "enum",
        "opsi": [
          "",
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "enum",
        "opsi": [
          "",
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
          "12"
        ],
        "wajib": true
      },
      {
        "nama": "asesmenpelayanan",
        "label": "Asesmenpelayanan",
        "tipe": "enum",
        "opsi": [
          "",
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "wajib": true
      },
      {
        "nama": "kddpjplayanan",
        "label": "Kddpjplayanan",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdpjplayanan",
        "label": "Nmdpjplayanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bpjs-kunjungan-sep-apotek",
    "slug": "bpjs-kunjungan-sep-apotek",
    "judul": "Pencarian SEP Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_kunjungan_sep_apotek",
    "javaRef": "ApotekBPJSKunjunganSEP",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-monitoring-klaim-apotek",
    "slug": "bpjs-monitoring-klaim-apotek",
    "judul": "Monitoring Klaim Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_monitoring_klaim_apotek",
    "javaRef": "ApotekBPJSMonitoringKlaim",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bpjs-daftar-pelayanan-obat-apotek",
    "slug": "bpjs-daftar-pelayanan-obat-apotek",
    "judul": "Daftar Pelayanan Obat Apotek BPJS",
    "kategori": "L",
    "permissionKey": "bpjs_daftar_pelayanan_obat_apotek",
    "javaRef": "ApotekBPJSDaftarPelayananObat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-riwayat-perawatan-i-care",
    "slug": "riwayat-perawatan-i-care",
    "judul": "Riwayat Perawatan ICare BPJS",
    "kategori": "L",
    "permissionKey": "riwayat_perawatan_icare_bpjs",
    "javaRef": "ICareRiwayatPerawatan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-reklasifikasi-ralan",
    "slug": "reklasifikasi-ralan",
    "judul": "Reklasifikasi Ralan",
    "kategori": "L",
    "permissionKey": "reklasifikasi_ralan",
    "javaRef": "ReklasifikasiRalan",
    "tabel": "temporary2",
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
        "maks": 100
      },
      {
        "nama": "temp2",
        "label": "Temp2",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp3",
        "label": "Temp3",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp4",
        "label": "Temp4",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp5",
        "label": "Temp5",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp6",
        "label": "Temp6",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp7",
        "label": "Temp7",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp8",
        "label": "Temp8",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp9",
        "label": "Temp9",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp10",
        "label": "Temp10",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp11",
        "label": "Temp11",
        "wajib": true,
        "tipe": "text",
        "maks": 100
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
    "id": "btn-reklasifikasi-ranap",
    "slug": "reklasifikasi-ranap",
    "judul": "Reklasifikasi Ranap",
    "kategori": "L",
    "permissionKey": "reklasifikasi_ranap",
    "javaRef": "ReklasifikasiRanap",
    "tabel": "temporary2",
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
        "maks": 100
      },
      {
        "nama": "temp2",
        "label": "Temp2",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp3",
        "label": "Temp3",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp4",
        "label": "Temp4",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp5",
        "label": "Temp5",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp6",
        "label": "Temp6",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp7",
        "label": "Temp7",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp8",
        "label": "Temp8",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp9",
        "label": "Temp9",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp10",
        "label": "Temp10",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp11",
        "label": "Temp11",
        "wajib": true,
        "tipe": "text",
        "maks": 100
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
    "id": "btn-aplicare-referensi-kamar",
    "slug": "aplicare-referensi-kamar",
    "judul": "Referensi Kamar Aplicare",
    "kategori": "L",
    "permissionKey": "aplicare_referensi_kamar",
    "javaRef": "AplicareCekReferensiKamar",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-aplicare-ketersediaan-kamar",
    "slug": "aplicare-ketersediaan-kamar",
    "judul": "Ketersediaan Kamar Aplicare",
    "kategori": "L",
    "permissionKey": "aplicare_ketersediaan_kamar",
    "javaRef": "AplicareKetersediaanKamar",
    "tabel": "aplicare_ketersediaan_kamar",
    "kolom": [
      {
        "nama": "kode_kelas_aplicare",
        "label": "Kode Kelas Aplicare",
        "pk": true,
        "tipe": "text",
        "maks": 15,
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
        "nama": "kelas",
        "label": "Kelas",
        "pk": true,
        "tipe": "enum",
        "opsi": [
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip"
        ],
        "wajib": true
      },
      {
        "nama": "kapasitas",
        "label": "Kapasitas",
        "tipe": "number"
      },
      {
        "nama": "tersedia",
        "label": "Tersedia",
        "tipe": "number"
      },
      {
        "nama": "tersediapria",
        "label": "Tersediapria",
        "tipe": "number"
      },
      {
        "nama": "tersediawanita",
        "label": "Tersediawanita",
        "tipe": "number"
      },
      {
        "nama": "tersediapriawanita",
        "label": "Tersediapriawanita",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_kelas_aplicare",
      "kd_bangsal",
      "kelas"
    ],
    "kolomUrut": "kode_kelas_aplicare",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ina-cbg-coder-nik",
    "slug": "ina-cbg-coder-nik",
    "judul": "Coder NIK INACBG",
    "kategori": "L",
    "permissionKey": "inacbg_coder_nik",
    "javaRef": "INACBGCoderNIK",
    "tabel": "inacbg_coder_nik",
    "kolom": [
      {
        "nama": "nik",
        "label": "NIK",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_ik",
        "label": "No. Ik",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "nik",
      "no_ik"
    ],
    "kolomUrut": "nik",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ina-cbg-klaim-baru-otomatis",
    "slug": "ina-cbg-klaim-baru-otomatis",
    "judul": "Klaim Baru Otomatis INACBG",
    "kategori": "L",
    "permissionKey": "inacbg_klaim_baru_otomatis",
    "javaRef": "btn-ina-cbg-klaim-baru-otomatis",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ina-cbg-klaim-baru-manual",
    "slug": "ina-cbg-klaim-baru-manual",
    "judul": "Klaim Baru Manual INACBG",
    "kategori": "L",
    "permissionKey": "inacbg_klaim_baru_manual",
    "javaRef": "btn-ina-cbg-klaim-baru-manual",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ina-cbg-klaim-baru-manual2",
    "slug": "ina-cbg-klaim-baru-manual2",
    "judul": "Klaim Baru Manual INACBG 2",
    "kategori": "L",
    "permissionKey": "inacbg_klaim_baru_manual2",
    "javaRef": "btn-ina-cbg-klaim-baru-manual2",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-referensi-kamar-inhealth",
    "slug": "referensi-kamar-inhealth",
    "judul": "Referensi Ruang Rawat Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_referensi_jenpel_ruang_rawat",
    "javaRef": "InhealthReferensiJenpelRuang",
    "tabel": "inhealth_jenpel_ruang_rawat",
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
        "nama": "kode_jenpel_ruang_rawat",
        "label": "Kode Jenpel Ruang Rawat",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nama_jenpel_ruang_rawat",
        "label": "Nama Jenpel Ruang Rawat",
        "tipe": "text",
        "maks": 100
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
      "kode_jenpel_ruang_rawat",
      "nama_jenpel_ruang_rawat"
    ],
    "kolomUrut": "kd_kamar",
    "kolomRingkasan": {
      "nama": "tarif",
      "label": "Total Tarif"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-inhealth-poli",
    "slug": "cek-inhealth-poli",
    "judul": "Referensi Poli Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_referensi_poli",
    "javaRef": "InhealthCekReferensiPoli",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-mapping-poli-inhealth",
    "slug": "mapping-poli-inhealth",
    "judul": "Mapping Poli Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_poli",
    "javaRef": "InhealthMapingPoli",
    "tabel": "inhealth_maping_poli",
    "kolom": [
      {
        "nama": "kd_poli_rs",
        "label": "Kode Poli Rs",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_poli_inhealth",
        "label": "Kode Poli Inhealth",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_poli_inhealth",
        "label": "Nama Poli Inhealth",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kd_poli_rs",
      "kd_poli_inhealth",
      "nm_poli_inhealth"
    ],
    "kolomUrut": "kd_poli_rs",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-dokter-inhealth",
    "slug": "mapping-dokter-inhealth",
    "judul": "Mapping Dokter Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_dokter",
    "javaRef": "InhealthMapingDokter",
    "tabel": "inhealth_maping_dokter",
    "kolom": [
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_dokter",
      "kd_inhealth"
    ],
    "kolomUrut": "kd_dokter",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-tindakan-ralan-inhealth",
    "slug": "mapping-tindakan-ralan-inhealth",
    "judul": "Tarif Ralan Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_tindakan_ralan",
    "javaRef": "InhealthTindakanRalan",
    "tabel": "inhealth_tindakan_ralan",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_inhealth"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-tindakan-ranap-inhealth",
    "slug": "mapping-tindakan-ranap-inhealth",
    "judul": "Tarif Ranap Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_tindakan_ranap",
    "javaRef": "InhealthTindakanRanap",
    "tabel": "inhealth_tindakan_ranap",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_inhealth"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-tindakan-radiologi-inhealth",
    "slug": "mapping-tindakan-radiologi-inhealth",
    "judul": "Tarif Radiologi Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_tindakan_radiologi",
    "javaRef": "InhealthTindakanRadiologi",
    "tabel": "inhealth_tindakan_radiologi",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_inhealth"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-tindakan-laborat-inhealth",
    "slug": "mapping-tindakan-laborat-inhealth",
    "judul": "Tarif Laborat Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_tindakan_laborat",
    "javaRef": "InhealthTindakanLaborat",
    "tabel": "inhealth_tindakan_laborat",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_inhealth"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-tindakan-operasi-inhealth",
    "slug": "mapping-tindakan-operasi-inhealth",
    "judul": "Tarif Operasi Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_mapping_tindakan_operasi",
    "javaRef": "InhealthTindakanOperasi",
    "tabel": "inhealth_tindakan_operasi",
    "kolom": [
      {
        "nama": "kode_paket",
        "label": "Kode Paket",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_inhealth",
        "label": "Kode Inhealth",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kode_paket",
      "kd_inhealth"
    ],
    "kolomUrut": "kode_paket",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cek-inhealth-faskes",
    "slug": "cek-inhealth-faskes",
    "judul": "Referensi Faskes Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_referensi_faskes",
    "javaRef": "InhealthCekReferensiFaskes",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-eligibilitas-inhealth",
    "slug": "cek-eligibilitas-inhealth",
    "judul": "Cek Eligibilitas Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_cek_eligibilitas",
    "javaRef": "InhealthCekEligibilitas",
    "tabel": "bridging_inhealth",
    "kolom": [
      {
        "nama": "no_sjp",
        "label": "No. SJP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "datetime"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "datetime"
      },
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdiagnosaawal",
        "label": "Nmdiagnosaawal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal2",
        "label": "Diagawal2",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdiagnosaawal2",
        "label": "Nmdiagnosaawal2",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kdpolitujuan",
        "label": "Kdpolitujuan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nmpolitujuan",
        "label": "Nmpolitujuan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "klsrawat",
        "label": "Klsrawat",
        "tipe": "enum",
        "opsi": [
          "000",
          "100",
          "101",
          "102",
          "103",
          "104",
          "110",
          "200",
          "201",
          "202",
          "203",
          "204",
          "210",
          "300",
          "301",
          "302",
          "303",
          "304",
          "310",
          "311",
          "312",
          "400",
          "401",
          "402",
          "403",
          "404",
          "410",
          "411",
          "412",
          "413",
          "500",
          "510",
          "511",
          "512",
          "610",
          "611",
          "612",
          "613",
          "710",
          "711",
          "712",
          "713",
          "910",
          "911",
          "912",
          "913"
        ]
      },
      {
        "nama": "klsdesc",
        "label": "Klsdesc",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kdbu",
        "label": "Kdbu",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmbu",
        "label": "Nmbu",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "lakalantas",
        "label": "Lakalantas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ]
      },
      {
        "nama": "lokasilaka",
        "label": "Lokasilaka",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nomr",
        "label": "Nomr",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "tipe": "date"
      },
      {
        "nama": "jkel",
        "label": "Jkel",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ]
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tglpulang",
        "label": "Tglpulang",
        "tipe": "datetime"
      },
      {
        "nama": "plan",
        "label": "Plan",
        "tipe": "text",
        "maks": 35,
        "wajib": true
      },
      {
        "nama": "plandesc",
        "label": "Plandesc",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "idakomodasi",
        "label": "Idakomodasi",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tipesjp",
        "label": "Tipesjp",
        "tipe": "text",
        "maks": 35
      },
      {
        "nama": "tipecob",
        "label": "Tipecob",
        "tipe": "text",
        "maks": 35
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sjp",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-inhealth-sjp",
    "slug": "inhealth-sjp",
    "judul": "Data Bridging SJP Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_sjp",
    "javaRef": "InhealthDataSJP",
    "tabel": "bridging_inhealth",
    "kolom": [
      {
        "nama": "no_sjp",
        "label": "No. SJP",
        "pk": true,
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "datetime"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "datetime"
      },
      {
        "nama": "no_rujukan",
        "label": "No. Rujukan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nmdiagnosaawal",
        "label": "Nmdiagnosaawal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal2",
        "label": "Diagawal2",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nmdiagnosaawal2",
        "label": "Nmdiagnosaawal2",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kdpolitujuan",
        "label": "Kdpolitujuan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nmpolitujuan",
        "label": "Nmpolitujuan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "klsrawat",
        "label": "Klsrawat",
        "tipe": "enum",
        "opsi": [
          "000",
          "100",
          "101",
          "102",
          "103",
          "104",
          "110",
          "200",
          "201",
          "202",
          "203",
          "204",
          "210",
          "300",
          "301",
          "302",
          "303",
          "304",
          "310",
          "311",
          "312",
          "400",
          "401",
          "402",
          "403",
          "404",
          "410",
          "411",
          "412",
          "413",
          "500",
          "510",
          "511",
          "512",
          "610",
          "611",
          "612",
          "613",
          "710",
          "711",
          "712",
          "713",
          "910",
          "911",
          "912",
          "913"
        ]
      },
      {
        "nama": "klsdesc",
        "label": "Klsdesc",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kdbu",
        "label": "Kdbu",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmbu",
        "label": "Nmbu",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "lakalantas",
        "label": "Lakalantas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ]
      },
      {
        "nama": "lokasilaka",
        "label": "Lokasilaka",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "user",
        "label": "User",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nomr",
        "label": "Nomr",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "tipe": "date"
      },
      {
        "nama": "jkel",
        "label": "Jkel",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ]
      },
      {
        "nama": "no_kartu",
        "label": "No. Kartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "tglpulang",
        "label": "Tglpulang",
        "tipe": "datetime"
      },
      {
        "nama": "plan",
        "label": "Plan",
        "tipe": "text",
        "maks": 35,
        "wajib": true
      },
      {
        "nama": "plandesc",
        "label": "Plandesc",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "idakomodasi",
        "label": "Idakomodasi",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tipesjp",
        "label": "Tipesjp",
        "tipe": "text",
        "maks": 35
      },
      {
        "nama": "tipecob",
        "label": "Tipecob",
        "tipe": "text",
        "maks": 35
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sjp",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kirim-tagihan-inheath",
    "slug": "kirim-tagihan-inheath",
    "judul": "Tagihan Inhealth",
    "kategori": "L",
    "permissionKey": "inhealth_kirim_tagihan",
    "javaRef": "InhealthTagihan",
    "tabel": "bridging_inhealth",
    "kolom": [
      {
        "nama": "no_sjp",
        "label": "No Sjp",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "datetime"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "datetime"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sjp",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-p-care-diagnosa",
    "slug": "cek-p-care-diagnosa",
    "judul": "Referensi Diagnosa PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_penyakit",
    "javaRef": "PCareCekReferensiPenyakit",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-p-care-kesadaran",
    "slug": "cek-p-care-kesadaran",
    "judul": "Referensi Kesadaran PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_kesadaran",
    "javaRef": "PCareCekReferensiKesadaran",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-dokter",
    "slug": "p-care-referensi-dokter",
    "judul": "Referensi Dokter PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_dokter",
    "javaRef": "PCareCekReferensiDokter",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-poli",
    "slug": "p-care-referensi-poli",
    "judul": "Referensi Poli PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_poli",
    "javaRef": "PCareCekReferensiPoli",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-provider",
    "slug": "p-care-referensi-provider",
    "judul": "Referensi Provider PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_provider",
    "javaRef": "PCareCekReferensiProvider",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-status-pulang",
    "slug": "p-care-referensi-status-pulang",
    "judul": "Referensi Stts Pulang PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_statuspulang",
    "javaRef": "PCareCekReferensiStatusPulang",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-spesialis",
    "slug": "p-care-referensi-spesialis",
    "judul": "Referensi Spesialis PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_spesialis",
    "javaRef": "PCareCekReferensiSpesialis",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-subspesialis",
    "slug": "p-care-referensi-subspesialis",
    "judul": "Referensi Subspesialis PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_subspesialis",
    "javaRef": "PCareCekReferensiSubspesialis",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-sarana",
    "slug": "p-care-referensi-sarana",
    "judul": "Referensi Sarana PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_sarana",
    "javaRef": "PCareCekReferensiSarana",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-alergi",
    "slug": "p-care-referensi-alergi",
    "judul": "Referensi Alergi PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_alergi",
    "javaRef": "PCareCekReferensiAlergi",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-prognosa",
    "slug": "p-care-referensi-prognosa",
    "judul": "Referensi Prognosa PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_prognosa",
    "javaRef": "PCareCekReferensiPrognosa",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-khusus",
    "slug": "p-care-referensi-khusus",
    "judul": "Referensi Khusus PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_khusus",
    "javaRef": "PCareCekReferensiKhusus",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-obat",
    "slug": "p-care-referensi-obat",
    "judul": "Referensi Obat PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_obat",
    "javaRef": "PCareCekReferensiObat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-referensi-tindakan",
    "slug": "p-care-referensi-tindakan",
    "judul": "Referensi Tindakan PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_tindakan",
    "javaRef": "PCareCekReferensiTindakan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-p-care-tacc",
    "slug": "cek-p-care-tacc",
    "judul": "Referensi TACC PCare",
    "kategori": "L",
    "permissionKey": "pcare_alasan_tacc",
    "javaRef": "PCareCekReferensiTACC",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-faskes-subspesialis",
    "slug": "p-care-faskes-subspesialis",
    "judul": "Faskes Subspesialis PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_faskessubspesialis",
    "javaRef": "PCareCekFaskesSubspesialis",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-faskes-alih-rawat",
    "slug": "p-care-faskes-alih-rawat",
    "judul": "Faskes Alih Rawat PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_faskesalihrawat",
    "javaRef": "PCareCekFaskesAlihRawat",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-faskes-thalasemia",
    "slug": "p-care-faskes-thalasemia",
    "judul": "Faskes Thalasemia & Hemofili PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_faskesthalasemia",
    "javaRef": "PCareCekFaskesThalasemia",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-maping-obat",
    "slug": "p-care-maping-obat",
    "judul": "Mapping Obat PCare",
    "kategori": "L",
    "permissionKey": "pcare_mapping_obat",
    "javaRef": "PCareMapingObat",
    "tabel": "maping_obat_pcare",
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
        "nama": "kode_brng_pcare",
        "label": "Kode Brng Pcare",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_brng_pcare",
        "label": "Nama Brng Pcare",
        "tipe": "text",
        "maks": 80
      }
    ],
    "kolomCari": [
      "kode_brng",
      "kode_brng_pcare",
      "nama_brng_pcare"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-maping-tindakan",
    "slug": "p-care-maping-tindakan",
    "judul": "Tarif Ralan PCare",
    "kategori": "L",
    "permissionKey": "pcare_mapping_tindakan",
    "javaRef": "PCareMapingTindakanRalan",
    "tabel": "maping_tindakan_pcare",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_tindakan_pcare",
        "label": "Kode Tindakan Pcare",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_tindakan_pcare",
        "label": "Nama Tindakan Pcare",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_tindakan_pcare",
      "nm_tindakan_pcare"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-maping-tindakan-ranap",
    "slug": "p-care-maping-tindakan-ranap",
    "judul": "Tarif Ranap PCare",
    "kategori": "L",
    "permissionKey": "pcare_mapping_tindakan_ranap",
    "javaRef": "PCareMapingTindakanRanap",
    "tabel": "maping_tindakan_ranap_pcare",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_tindakan_pcare",
        "label": "Kode Tindakan Pcare",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_tindakan_pcare",
        "label": "Nama Tindakan Pcare",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "kd_tindakan_pcare",
      "nm_tindakan_pcare"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-maping-dokter",
    "slug": "p-care-maping-dokter",
    "judul": "Mapping Dokter PCare",
    "kategori": "L",
    "permissionKey": "pcare_mapping_dokter",
    "javaRef": "PCareMapingDokter",
    "tabel": "maping_dokter_pcare",
    "kolom": [
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_pcare",
        "label": "Kode Dokter Pcare",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nm_dokter_pcare",
        "label": "Nama Dokter Pcare",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd_dokter",
      "kd_dokter_pcare",
      "nm_dokter_pcare"
    ],
    "kolomUrut": "kd_dokter",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-maping-poli",
    "slug": "p-care-maping-poli",
    "judul": "Mapping Poli PCare",
    "kategori": "L",
    "permissionKey": "pcare_mapping_poli",
    "javaRef": "PCareMapingPoli",
    "tabel": "maping_poliklinik_pcare",
    "kolom": [
      {
        "nama": "kd_poli_rs",
        "label": "Kode Poli Rs",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kd_poli_pcare",
        "label": "Kode Poli Pcare",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nm_poli_pcare",
        "label": "Nama Poli Pcare",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomCari": [
      "kd_poli_rs",
      "kd_poli_pcare",
      "nm_poli_pcare"
    ],
    "kolomUrut": "kd_poli_rs",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-club-prolanis",
    "slug": "p-care-club-prolanis",
    "judul": "Club Prolanis PCare",
    "kategori": "L",
    "permissionKey": "pcare_club_prolanis",
    "javaRef": "PCareClubProlanis",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-kegiatan-kelompok",
    "slug": "p-care-kegiatan-kelompok",
    "judul": "Kegiatan Kelompok PCare",
    "kategori": "L",
    "permissionKey": "pcare_kegiatan_kelompok",
    "javaRef": "PCareKegiatanKelompok",
    "tabel": "pcare_kegiatan_kelompok",
    "kolom": [
      {
        "nama": "eduId",
        "label": "Eduid",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "clubId",
        "label": "Clubid",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "namaClub",
        "label": "Namaclub",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tglPelayanan",
        "label": "Tglpelayanan",
        "tipe": "date"
      },
      {
        "nama": "nmKegiatan",
        "label": "Nmkegiatan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nmKelompok",
        "label": "Nmkelompok",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "materi",
        "label": "Materi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pembicara",
        "label": "Pembicara",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tglPelayanan",
    "kolomCari": [
      "eduId",
      "clubId",
      "namaClub",
      "nmKegiatan",
      "nmKelompok",
      "materi"
    ],
    "kolomUrut": "tglPelayanan",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-p-care-peserta-kegiatan-kelompok",
    "slug": "p-care-peserta-kegiatan-kelompok",
    "judul": "Peserta Keg Kelompok PCare",
    "kategori": "L",
    "permissionKey": "pcare_peserta_kegiatan_kelompok",
    "javaRef": "PCarePesertaKegiatanKelompok",
    "tabel": "pcare_kegiatan_kelompok",
    "kolom": [
      {
        "nama": "eduId",
        "label": "Eduid",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "clubId",
        "label": "Clubid",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "namaClub",
        "label": "Namaclub",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tglPelayanan",
        "label": "Tglpelayanan",
        "tipe": "date"
      },
      {
        "nama": "nmKegiatan",
        "label": "Nmkegiatan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nmKelompok",
        "label": "Nmkelompok",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "materi",
        "label": "Materi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pembicara",
        "label": "Pembicara",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "tipe": "uang"
      }
    ],
    "kolomTanggal": "tglPelayanan",
    "kolomCari": [
      "eduId",
      "clubId",
      "namaClub",
      "nmKegiatan",
      "nmKelompok",
      "materi"
    ],
    "kolomUrut": "tglPelayanan",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-cek-kartu",
    "slug": "p-care-cek-kartu",
    "judul": "Cek No.Kartu PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_kartu",
    "javaRef": "PCareCekKartu",
    "tabel": "pasien_tni",
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
        "nama": "golongan_tni",
        "label": "Golongan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "pangkat_tni",
        "label": "Pangkat Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "satuan_tni",
        "label": "Satuan Tni",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "jabatan_tni",
        "label": "Jabatan Tni",
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_rkm_medis"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-pendaftaran",
    "slug": "p-care-pendaftaran",
    "judul": "Data Pendaftaran PCare",
    "kategori": "L",
    "permissionKey": "bridging_pcare_daftar",
    "javaRef": "PCareDataPendaftaran",
    "tabel": "pcare_pendaftaran",
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
        "nama": "tglDaftar",
        "label": "Tgldaftar",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nm_pasien",
        "label": "Nama Pasien",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kdProviderPeserta",
        "label": "Kdproviderpeserta",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "noKartu",
        "label": "Nokartu",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "kdPoli",
        "label": "Kdpoli",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nmPoli",
        "label": "Nmpoli",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 400,
        "wajib": true
      },
      {
        "nama": "kunjSakit",
        "label": "Kunjsakit",
        "tipe": "enum",
        "opsi": [
          "kunjungan sakit",
          "kunjungan sehat"
        ],
        "wajib": true
      },
      {
        "nama": "sistole",
        "label": "Sistole",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "diastole",
        "label": "Diastole",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "beratBadan",
        "label": "Beratbadan",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tinggiBadan",
        "label": "Tinggibadan",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "respRate",
        "label": "Resprate",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "lingkar_perut",
        "label": "Lingkar Perut",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "heartRate",
        "label": "Heartrate",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "rujukBalik",
        "label": "Rujukbalik",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "kdTkp",
        "label": "Kdtkp",
        "tipe": "enum",
        "opsi": [
          "10 rawat jalan",
          "20 rawat inap",
          "50 promotif preventif"
        ],
        "wajib": true
      },
      {
        "nama": "noUrut",
        "label": "Nourut",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "terkirim",
          "gagal"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tglDaftar",
    "kolomCari": [
      "no_rawat",
      "no_rkm_medis",
      "nm_pasien",
      "kdProviderPeserta",
      "noKartu",
      "kdPoli"
    ],
    "kolomUrut": "tglDaftar",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cek-p-care-rujukan",
    "slug": "cek-p-care-rujukan",
    "judul": "Cek Rujukan PCare",
    "kategori": "L",
    "permissionKey": "pcare_cek_rujukan",
    "javaRef": "PCareCekRujukan",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-p-care-beri-obat",
    "slug": "p-care-beri-obat",
    "judul": "Pemberian Obat PCare",
    "kategori": "L",
    "permissionKey": "pcare_pemberian_obat",
    "javaRef": "PCareDataPemberianObat",
    "tabel": "pcare_obat_diberikan",
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
    "id": "btn-p-care-beri-tindakan",
    "slug": "p-care-beri-tindakan",
    "judul": "Pemberian Tindakan PCare",
    "kategori": "L",
    "permissionKey": "pcare_pemberian_tindakan",
    "javaRef": "PCareDataPemberianTindakan",
    "tabel": "set_akun_ralan",
    "kolom": [
      {
        "nama": "Suspen_Piutang_Tindakan_Ralan",
        "label": "Suspen Piutang Tindakan Ralan",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Tindakan_Ralan",
        "label": "Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Dokter_Tindakan_Ralan",
        "label": "Beban Jasa Medik Dokter Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Medik_Dokter_Tindakan_Ralan",
        "label": "Utang Jasa Medik Dokter Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Paramedis_Tindakan_Ralan",
        "label": "Beban Jasa Medik Paramedis Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Medik_Paramedis_Tindakan_Ralan",
        "label": "Utang Jasa Medik Paramedis Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_KSO_Tindakan_Ralan",
        "label": "Beban Kso Tindakan Ralan",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_KSO_Tindakan_Ralan",
        "label": "Utang Kso Tindakan Ralan",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Sarana_Tindakan_Ralan",
        "label": "Beban Jasa Sarana Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Sarana_Tindakan_Ralan",
        "label": "Utang Jasa Sarana Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "HPP_BHP_Tindakan_Ralan",
        "label": "Hpp Bhp Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Persediaan_BHP_Tindakan_Ralan",
        "label": "Persediaan Bhp Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "Suspen_Piutang_Tindakan_Ralan",
      "Tindakan_Ralan",
      "Beban_Jasa_Medik_Dokter_Tindakan_Ralan",
      "Utang_Jasa_Medik_Dokter_Tindakan_Ralan",
      "Beban_Jasa_Medik_Paramedis_Tindakan_Ralan",
      "Utang_Jasa_Medik_Paramedis_Tindakan_Ralan"
    ],
    "kolomUrut": "Suspen_Piutang_Tindakan_Ralan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-sisrute-faskes",
    "slug": "cek-sisrute-faskes",
    "judul": "Referensi Faskes Sisrute",
    "kategori": "L",
    "permissionKey": "sisrute_referensi_faskes",
    "javaRef": "SisruteCekReferensiFaskes",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-sisrute-alasan-rujuk",
    "slug": "cek-sisrute-alasan-rujuk",
    "judul": "Referensi Alasan Rujuk Sisrute",
    "kategori": "L",
    "permissionKey": "sisrute_referensi_alasanrujuk",
    "javaRef": "SisruteCekReferensiAlasanRujuk",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cek-sisrute-diagnosa",
    "slug": "cek-sisrute-diagnosa",
    "judul": "Referensi Diagnosa Sisrute",
    "kategori": "L",
    "permissionKey": "sisrute_referensi_diagnosa",
    "javaRef": "SisruteCekReferensiDiagnosa",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rujukan-masuk-sisrute",
    "slug": "rujukan-masuk-sisrute",
    "judul": "Rujukan Masuk Sisrute",
    "kategori": "L",
    "permissionKey": "sisrute_rujukan_masuk",
    "javaRef": "SisruteRujukanMasukan",
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
    "id": "btn-rujukan-keluar-sisrute",
    "slug": "rujukan-keluar-sisrute",
    "judul": "Rujukan Keluar Sisrute",
    "kategori": "L",
    "permissionKey": "sisrute_rujukan_keluar",
    "javaRef": "SisruteRujukanKeluar",
    "tabel": "sisrute_rujukan_keluar",
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
        "nama": "no_rujuk",
        "label": "No. Rujuk",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nm_pasien",
        "label": "Nama Pasien",
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
        "nama": "no_peserta",
        "label": "No. Peserta",
        "tipe": "text",
        "maks": 25,
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
        "nama": "tgl_lahir",
        "label": "Tgl. Lahir",
        "tipe": "date",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "no_tlp",
        "label": "No. Tlp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "jns_rujukan",
        "label": "Jns Rujukan",
        "tipe": "enum",
        "opsi": [
          "1. rawat jalan",
          "2. rawat darurat/inap",
          "3. parsial"
        ],
        "wajib": true
      },
      {
        "nama": "tgl_rujuk",
        "label": "Tgl. Rujuk",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_faskes_tujuan",
        "label": "Kode Faskes Tujuan",
        "tipe": "text",
        "maks": 12,
        "wajib": true
      },
      {
        "nama": "nm_faskes_tujuan",
        "label": "Nama Faskes Tujuan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "kd_alasan",
        "label": "Kode Alasan",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "alasan_rujuk",
        "label": "Alasan Rujuk",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "alasan_lainnya",
        "label": "Alasan Lainnya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa",
        "label": "Kode Diagnosa",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_rujuk",
        "label": "Diagnosa Rujuk",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "nik_dokter",
        "label": "NIK Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "dokter_perujuk",
        "label": "Dokter Perujuk",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "nik_petugas",
        "label": "NIK Petugas",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "petugas_entry",
        "label": "Petugas Entry",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "anamnesis_pemeriksaan",
        "label": "Anamnesis Pemeriksaan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "1. sadar",
          "2. tidak sadar"
        ],
        "wajib": true
      },
      {
        "nama": "tekanan_darah",
        "label": "Tekanan Darah",
        "tipe": "text",
        "maks": 7,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "respirasi",
        "label": "Respirasi",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tingkat_nyeri",
        "label": "Tingkat Nyeri",
        "tipe": "enum",
        "opsi": [
          "0. tidak nyeri",
          "1. ringan",
          "2. sedang",
          "3. berat"
        ],
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "laboratorium",
        "label": "Laboratorium",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "radiologi",
        "label": "Radiologi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "terapitindakan",
        "label": "Terapitindakan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_rawat",
      "no_rujuk",
      "no_rkm_medis",
      "nm_pasien",
      "no_ktp",
      "no_peserta"
    ],
    "kolomUrut": "tgl_lahir",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-siranap-ketersediaan-kamar",
    "slug": "siranap-ketersediaan-kamar",
    "judul": "Ketersediaan Kamar SIRANAP",
    "kategori": "L",
    "permissionKey": "siranap_ketersediaan_kamar",
    "javaRef": "SiranapKetersediaanKamar",
    "tabel": "siranap_ketersediaan_kamar",
    "kolom": [
      {
        "nama": "kode_ruang_siranap",
        "label": "Kode Ruang Siranap",
        "pk": true,
        "tipe": "enum",
        "opsi": [
          "0000 umum",
          "0001 anak",
          "0002 anak (luka bakar)",
          "0003 penyakit dalam",
          "0004 kebidanan",
          "0005 kandungan",
          "0006 bedah",
          "0007 kanker",
          "0008 mata",
          "0009 tht",
          "0010 paru",
          "0011 jantung",
          "0012 orthopedi",
          "0013 kulit dan kelamin",
          "0014 saraf",
          "0015 jiwa",
          "0016 infeksi",
          "0017 luka bakar",
          "0018 napza",
          "0019 isolasi air borne",
          "0020 isolasi tb mdr",
          "0021 kulit dan kelamin",
          "0022 isolasi imunitas menurun",
          "0023 isolasi radioaktif",
          "0024 icu/ricu",
          "0025 nicu",
          "0026 picu",
          "0027 cvcu/iccu",
          "0029 hcu",
          "0030 kedokteran nuklir"
        ],
        "wajib": true
      },
      {
        "nama": "kelas_ruang_siranap",
        "label": "Kelas Ruang Siranap",
        "pk": true,
        "tipe": "enum",
        "opsi": [
          "0001 super vip",
          "0002 vip",
          "0003 kelas 1",
          "0004 kelas 2",
          "0005 kelas 3",
          "0006 intermediate",
          "0007 isolasi",
          "0008 rawat khusus",
          "0009 stroke care unit"
        ],
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
        "nama": "kelas",
        "label": "Kelas",
        "pk": true,
        "tipe": "enum",
        "opsi": [
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip"
        ],
        "wajib": true
      },
      {
        "nama": "kapasitas",
        "label": "Kapasitas",
        "tipe": "number"
      },
      {
        "nama": "tersedia",
        "label": "Tersedia",
        "tipe": "number"
      },
      {
        "nama": "tersediapria",
        "label": "Tersediapria",
        "tipe": "number"
      },
      {
        "nama": "tersediawanita",
        "label": "Tersediawanita",
        "tipe": "number"
      },
      {
        "nama": "menunggu",
        "label": "Menunggu",
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "kode_ruang_siranap",
      "kelas_ruang_siranap",
      "kd_bangsal",
      "kelas"
    ],
    "kolomUrut": "kode_ruang_siranap",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pasien-corona",
    "slug": "pasien-corona",
    "judul": "Pasien Corona",
    "kategori": "L",
    "permissionKey": "pasien_corona",
    "javaRef": "CoronaPasien",
    "tabel": "pasien_corona",
    "kolom": [
      {
        "nama": "no_pengenal",
        "label": "No. Pengenal",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "inisial",
        "label": "Inisial",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nama_lengkap",
        "label": "Nama Lengkap",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tgl_masuk",
        "label": "Tgl. Masuk",
        "tipe": "date"
      },
      {
        "nama": "kode_jk",
        "label": "Kode Jk",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "nama_jk",
        "label": "Nama Jk",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "tgl_lahir",
        "label": "Tgl. Lahir",
        "tipe": "date"
      },
      {
        "nama": "kode_kewarganegaraan",
        "label": "Kode Kewarganegaraan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_kewarganegaraan",
        "label": "Nama Kewarganegaraan",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "kode_penularan",
        "label": "Kode Penularan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "sumber_penularan",
        "label": "Sumber Penularan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kd_kelurahan",
        "label": "Kode Kelurahan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_kelurahan",
        "label": "Nama Kelurahan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_kecamatan",
        "label": "Kode Kecamatan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nm_kecamatan",
        "label": "Nama Kecamatan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_kabupaten",
        "label": "Kode Kabupaten",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "nm_kabupaten",
        "label": "Nama Kabupaten",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_propinsi",
        "label": "Kode Propinsi",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nm_propinsi",
        "label": "Nama Propinsi",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl. Keluar",
        "tipe": "date"
      },
      {
        "nama": "kode_statuskeluar",
        "label": "Kode Statuskeluar",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_statuskeluar",
        "label": "Nama Statuskeluar",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl. Lapor",
        "tipe": "datetime"
      },
      {
        "nama": "kode_statusrawat",
        "label": "Kode Statusrawat",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_statusrawat",
        "label": "Nama Statusrawat",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kode_statusisolasi",
        "label": "Kode Statusisolasi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_statusisolasi",
        "label": "Nama Statusisolasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "email",
        "label": "Email",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "notelp",
        "label": "Notelp",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "sebab_kematian",
        "label": "Sebab Kematian",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kode_jenis_pasien",
        "label": "Kode Jenis Pasien",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_jenis_pasien",
        "label": "Nama Jenis Pasien",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_pengenal",
      "no_rkm_medis",
      "inisial",
      "nama_lengkap",
      "kode_jk",
      "nama_jk"
    ],
    "kolomUrut": "tgl_masuk",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-diagnosa-pasien-corona",
    "slug": "diagnosa-pasien-corona",
    "judul": "Diagnosa Pasien Corona",
    "kategori": "L",
    "permissionKey": "diagnosa_pasien_corona",
    "javaRef": "CoronaDiagnosa",
    "tabel": "diagnosa_corona",
    "kolom": [
      {
        "nama": "no_rkm_medis",
        "label": "No. RKM Medis",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kode_icd",
        "label": "Kode ICD",
        "pk": true,
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nama_penyakit",
        "label": "Nama Penyakit",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "primer",
          "sekunder"
        ]
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "kode_icd",
      "nama_penyakit",
      "status"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-perawatan-pasien-corona",
    "slug": "perawatan-pasien-corona",
    "judul": "Perawatan Pasien Corona",
    "kategori": "L",
    "permissionKey": "perawatan_pasien_corona",
    "javaRef": "INACBGPerawatanCorona",
    "tabel": "perawatan_corona",
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
        "nama": "pemulasaraan_jenazah",
        "label": "Pemulasaraan Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "kantong_jenazah",
        "label": "Kantong Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "peti_jenazah",
        "label": "Peti Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "plastik_erat",
        "label": "Plastik Erat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "desinfektan_jenazah",
        "label": "Desinfektan Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "mobil_jenazah",
        "label": "Mobil Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "desinfektan_mobil_jenazah",
        "label": "Desinfektan Mobil Jenazah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "covid19_status_cd",
        "label": "Covid19 Status Cd",
        "tipe": "enum",
        "opsi": [
          "odp",
          "pdp",
          "positif"
        ]
      },
      {
        "nama": "nomor_kartu_t",
        "label": "Nomor Kartu T",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "episodes1",
        "label": "Episodes1",
        "tipe": "number"
      },
      {
        "nama": "episodes2",
        "label": "Episodes2",
        "tipe": "number"
      },
      {
        "nama": "episodes3",
        "label": "Episodes3",
        "tipe": "number"
      },
      {
        "nama": "episodes4",
        "label": "Episodes4",
        "tipe": "number"
      },
      {
        "nama": "episodes5",
        "label": "Episodes5",
        "tipe": "number"
      },
      {
        "nama": "episodes6",
        "label": "Episodes6",
        "tipe": "number"
      },
      {
        "nama": "covid19_cc_ind",
        "label": "Covid19 Cc Ind",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      }
    ],
    "kolomCari": [
      "no_rawat",
      "pemulasaraan_jenazah",
      "kantong_jenazah",
      "peti_jenazah",
      "plastik_erat",
      "desinfektan_jenazah"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-referensi-pendaftaran-mobile-jkn",
    "slug": "referensi-pendaftaran-mobile-jkn",
    "judul": "Referensi Pendaftaran Mobile JKN",
    "kategori": "L",
    "permissionKey": "referensi_mobilejkn_bpjs",
    "javaRef": "MobileJKNReferensiPendaftaran",
    "tabel": "referensi_mobilejkn_bpjs",
    "kolom": [
      {
        "nama": "nobooking",
        "label": "Nobooking",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "nomorkartu",
        "label": "Nomorkartu",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "nik",
        "label": "Nik",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nohp",
        "label": "Nohp",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kodepoli",
        "label": "Kodepoli",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "pasienbaru",
        "label": "Pasienbaru",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      },
      {
        "nama": "norm",
        "label": "Norm",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggalperiksa",
        "label": "Tanggalperiksa",
        "tipe": "date"
      },
      {
        "nama": "kodedokter",
        "label": "Kodedokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jampraktek",
        "label": "Jampraktek",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "jeniskunjungan",
        "label": "Jeniskunjungan",
        "tipe": "enum",
        "opsi": [
          "1 (Rujukan FKTP)",
          "2 (Rujukan Internal)",
          "3 (Kontrol)",
          "4 (Rujukan Antar RS)"
        ]
      }
    ],
    "kolomTanggal": "tanggalperiksa",
    "kolomCari": [
      "nobooking",
      "no_rawat",
      "nomorkartu",
      "nik",
      "nohp",
      "kodepoli"
    ],
    "kolomUrut": "tanggalperiksa",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-batal-pendaftaran-mobile-jkn",
    "slug": "batal-pendaftaran-mobile-jkn",
    "judul": "Batal Pendaftaran Mobile JKN",
    "kategori": "L",
    "permissionKey": "batal_pendaftaran_mobilejkn_bpjs",
    "javaRef": "MobileJKNPembatalanPendaftaran",
    "tabel": "referensi_mobilejkn_bpjs_batal",
    "kolom": [
      {
        "nama": "nobooking",
        "label": "Nobooking",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "no_rawat_batal",
        "label": "No Rawat Batal",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "nomorreferensi",
        "label": "Nomorreferensi",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "tanggalbatal",
        "label": "Tanggalbatal",
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "statuskirim",
        "label": "Statuskirim",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sudah",
          "Belum"
        ]
      }
    ],
    "kolomTanggal": "tanggalbatal",
    "kolomCari": [
      "nobooking",
      "no_rkm_medis",
      "no_rawat_batal",
      "nomorreferensi",
      "keterangan"
    ],
    "kolomUrut": "tanggalbatal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-akun-rekening-ht-h-bank-jateng",
    "slug": "akun-rekening-ht-h-bank-jateng",
    "judul": "Host To Host Bank Jateng",
    "kategori": "L",
    "permissionKey": "akun_host_to_host_bank_jateng",
    "javaRef": "AkunRekeningBankJateng",
    "tabel": "set_akun_bankjateng",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_rek"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-rekening-ht-h-bank-jabar",
    "slug": "akun-rekening-ht-h-bank-jabar",
    "judul": "Host To Host Bank Jabar",
    "kategori": "L",
    "permissionKey": "akun_host_to_host_bank_jabar",
    "javaRef": "AkunRekeningBankJabar",
    "tabel": "set_akun_bankjabar",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kode_bank",
        "label": "Kode Bank",
        "tipe": "text",
        "maks": 3
      }
    ],
    "kolomCari": [
      "kd_rek",
      "kode_bank"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-integrasi-bri-api",
    "slug": "integrasi-bri-api",
    "judul": "Integrasi BRI API",
    "kategori": "L",
    "permissionKey": "integrasi_briapi",
    "javaRef": "BRIApiIntegrasi",
    "tabel": "set_akun_bankbri",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "consumer_key",
        "label": "Consumer Key",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "institution_code",
        "label": "Institution Code",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "briva_no",
        "label": "Briva No.",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "urlapi",
        "label": "Urlapi",
        "tipe": "text",
        "maks": 700,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_rek",
      "consumer_key",
      "institution_code",
      "briva_no",
      "urlapi"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-rekening-ht-h-bank-papua",
    "slug": "akun-rekening-ht-h-bank-papua",
    "judul": "Host To Host Bank Papua",
    "kategori": "L",
    "permissionKey": "akun_host_to_host_bank_papua",
    "javaRef": "AkunRekeningBankPapua",
    "tabel": "set_akun_bankpapua",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_rek"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-host-to-host-bank-mandiri",
    "slug": "host-to-host-bank-mandiri",
    "judul": "Host To Host Bank Mandiri",
    "kategori": "L",
    "permissionKey": "akun_host_to_host_bank_mandiri",
    "javaRef": "AkunRekeningBankMandiri",
    "tabel": "set_akun_mandiri",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek_biaya",
        "label": "Kode Rek Biaya",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "username",
        "label": "Username",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "client_id",
        "label": "Client Id",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "kode_rs",
        "label": "Kode Rs",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kode_mcm",
        "label": "Kode Mcm",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "no_rekening",
        "label": "No. Rekening",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_rek",
      "kd_rek_biaya",
      "username",
      "client_id",
      "kode_rs",
      "kode_mcm"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mandiri-metode-pembayaran",
    "slug": "mandiri-metode-pembayaran",
    "judul": "Metode Pembayaran Bank Mandiri",
    "kategori": "L",
    "permissionKey": "metode_pembayaran_bankmandiri",
    "javaRef": "MandiriMetodePembayaran",
    "tabel": "metode_pembayaran_bankmandiri",
    "kolom": [
      {
        "nama": "kode_metode",
        "label": "Kode Metode",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_metode",
        "label": "Nama Metode",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "biaya_transaksi",
        "label": "Biaya Transaksi",
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "kode_metode",
      "nama_metode"
    ],
    "kolomUrut": "kode_metode",
    "kolomRingkasan": {
      "nama": "biaya_transaksi",
      "label": "Total Biaya Transaksi"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mandiri-bank-tujuan-t-ransfer",
    "slug": "mandiri-bank-tujuan-t-ransfer",
    "judul": "Bank Tujuan Transfer Bank Mandiri",
    "kategori": "L",
    "permissionKey": "bank_tujuan_transfer_bankmandiri",
    "javaRef": "MandiriBankTujuanTransfer",
    "tabel": "bank_tujuan_transfer_bankmandiri",
    "kolom": [
      {
        "nama": "kode_bank",
        "label": "Kode Bank",
        "pk": true,
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "nama_bank",
        "label": "Nama Bank",
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomCari": [
      "kode_bank",
      "nama_bank"
    ],
    "kolomUrut": "kode_bank",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mandiri-kode-transaksi-tujuan-t-ransfer",
    "slug": "mandiri-kode-transaksi-tujuan-t-ransfer",
    "judul": "Kode Transaksi Tujuan Transfer Bank Mandiri",
    "kategori": "L",
    "permissionKey": "kodetransaksi_tujuan_transfer_bankmandiri",
    "javaRef": "MandiriKodeTransaksiTujuanTransfer",
    "tabel": "kodetransaksi_tujuan_transfer_bankmandiri",
    "kolom": [
      {
        "nama": "kode_metode",
        "label": "Kode Metode",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kode_bank",
        "label": "Kode Bank",
        "pk": true,
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kode_transaksi",
        "label": "Kode Transaksi",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kode_metode",
      "kode_bank",
      "kode_transaksi"
    ],
    "kolomUrut": "kode_metode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-referensi-dokter-satu-sehat",
    "slug": "referensi-dokter-satu-sehat",
    "judul": "Referensi Praktisi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_referensi_dokter",
    "javaRef": "SatuSehatReferensiPraktisi",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-satu-sehat-tanda-tangan-elektronik",
    "slug": "satu-sehat-tanda-tangan-elektronik",
    "judul": "Satu Sehat TTE",
    "kategori": "L",
    "permissionKey": "satu_sehat_tanda_tangan_elektronik",
    "javaRef": "DlgTTESatuSehat",
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
    "id": "btn-referensi-pasien-satu-sehat",
    "slug": "referensi-pasien-satu-sehat",
    "judul": "Referensi Pasien Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_referensi_pasien",
    "javaRef": "SatuSehatReferensiPasien",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-mapping-organisasi-satu-sehat",
    "slug": "mapping-organisasi-satu-sehat",
    "judul": "Mapping Organisasi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_departemen",
    "javaRef": "SatuSehatMapingOrganisasi",
    "tabel": "satu_sehat_mapping_departemen",
    "kolom": [
      {
        "nama": "dep_id",
        "label": "Dep Id",
        "pk": true,
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "id_organisasi_satusehat",
        "label": "Id Organisasi Satusehat",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "dep_id",
      "id_organisasi_satusehat"
    ],
    "kolomUrut": "dep_id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-lokasi-satu-sehat",
    "slug": "mapping-lokasi-satu-sehat",
    "judul": "Mapping Lokasi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_lokasi",
    "javaRef": "SatuSehatMapingLokasi",
    "tabel": "satu_sehat_mapping_lokasi_ralan",
    "kolom": [
      {
        "nama": "kd_poli",
        "label": "Kode Poli",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "id_organisasi_satusehat",
        "label": "Id Organisasi Satusehat",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "id_lokasi_satusehat",
        "label": "Id Lokasi Satusehat",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "longitude",
        "label": "Longitude",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "latitude",
        "label": "Latitude",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "altittude",
        "label": "Altittude",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_poli",
      "id_organisasi_satusehat",
      "id_lokasi_satusehat",
      "longitude",
      "latitude",
      "altittude"
    ],
    "kolomUrut": "kd_poli",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kirim-questionaire-satu-sehat",
    "slug": "kirim-questionaire-satu-sehat",
    "judul": "Kirim Questionnaire Request Satu Sehat",
    "kategori": "L",
    "permissionKey": "admin",
    "javaRef": "SatuSehatKirimQuestionnaireRequest",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-satu-sehat-alergi",
    "slug": "satu-sehat-alergi",
    "judul": "Kiriim Alergy Intolenrance Satu Sehat",
    "kategori": "L",
    "permissionKey": "admin",
    "javaRef": "SatuSehatKirimAllergyIntolerance",
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
    "id": "btn-mapping-vaksin-satu-sehat",
    "slug": "mapping-vaksin-satu-sehat",
    "judul": "Mapping Vaksin Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_vaksin",
    "javaRef": "SatuSehatMapingVaksin",
    "tabel": "satu_sehat_mapping_vaksin",
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
        "nama": "vaksin_code",
        "label": "Vaksin Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "vaksin_system",
        "label": "Vaksin System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "vaksin_display",
        "label": "Vaksin Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "route_code",
        "label": "Route Code",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "route_system",
        "label": "Route System",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "route_display",
        "label": "Route Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "dose_quantity_code",
        "label": "Dose Quantity Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "dose_quantity_system",
        "label": "Dose Quantity System",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "dose_quantity_unit",
        "label": "Dose Quantity Unit",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kode_brng",
      "vaksin_code",
      "vaksin_system",
      "vaksin_display",
      "route_code",
      "route_system"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kirim-encounter-satu-sehat",
    "slug": "kirim-encounter-satu-sehat",
    "judul": "Kirim Encounter Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_encounter",
    "javaRef": "SatuSehatKirimEncounter",
    "tabel": "satu_sehat_episodeofcare",
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
        "nama": "id_encounter",
        "label": "Id Encounter",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rawat",
      "id_encounter"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-condition-satu-sehat",
    "slug": "kirim-condition-satu-sehat",
    "judul": "Kirim Condition Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_condition",
    "javaRef": "SatuSehatKirimCondition",
    "tabel": "satu_sehat_condition",
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
        "nama": "id_condition",
        "label": "Id Condition",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kd_penyakit",
      "id_condition"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-observation-ttv-satu-sehat",
    "slug": "kirim-observation-ttv-satu-sehat",
    "judul": "Kirim Observation-TTV Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_observationttv",
    "javaRef": "SatuSehatKirimObservationTTV",
    "tabel": "satu_sehat_observationttvsuhu",
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
        "nama": "id_observation",
        "label": "Id Observation",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "status",
      "no_rawat",
      "id_observation"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-procedure-satu-sehat",
    "slug": "kirim-procedure-satu-sehat",
    "judul": "Kirim Procedure Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_procedure",
    "javaRef": "SatuSehatKirimProcedure",
    "tabel": "satu_sehat_procedure",
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
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
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
        "nama": "id_procedure",
        "label": "Id Procedure",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "status",
      "no_rawat",
      "kode",
      "id_procedure"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-vaksin-satu-sehat",
    "slug": "kirim-vaksin-satu-sehat",
    "judul": "Kirim Imunisasi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_Immunization",
    "javaRef": "SatuSehatKirimVaksin",
    "tabel": "satu_sehat_immunization",
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
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
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
        "nama": "id_immunization",
        "label": "Id Immunization",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "id_immunization"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-clinical-impression-satu-sehat",
    "slug": "kirim-clinical-impression-satu-sehat",
    "judul": "Kirim Clinical Impression Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_clinicalimpression",
    "javaRef": "SatuSehatKirimClinicalImpression",
    "tabel": "satu_sehat_clinicalimpression",
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
        "nama": "id_clinicalimpression",
        "label": "Id Clinicalimpression",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "status",
      "no_rawat",
      "id_clinicalimpression"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-diet-satu-sehat",
    "slug": "kirim-diet-satu-sehat",
    "judul": "Kirim Diet Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diet",
    "javaRef": "SatuSehatKirimDiet",
    "tabel": "satu_sehat_diet",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "id_diet",
        "label": "Id Diet",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "id_diet"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-mapping-obat-satu-sehat",
    "slug": "mapping-obat-satu-sehat",
    "judul": "Mapping Obat/Alkes/BHP Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_obat",
    "javaRef": "SatuSehatMapingObatAlkes",
    "tabel": "satu_sehat_mapping_obat",
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
        "nama": "obat_code",
        "label": "Obat Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "obat_system",
        "label": "Obat System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "obat_display",
        "label": "Obat Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "form_code",
        "label": "Form Code",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "form_system",
        "label": "Form System",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "form_display",
        "label": "Form Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "numerator_code",
        "label": "Numerator Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "numerator_system",
        "label": "Numerator System",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "denominator_code",
        "label": "Denominator Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "denominator_system",
        "label": "Denominator System",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "route_code",
        "label": "Route Code",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "route_system",
        "label": "Route System",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "route_display",
        "label": "Route Display",
        "tipe": "text",
        "maks": 80
      }
    ],
    "kolomCari": [
      "kode_brng",
      "obat_code",
      "obat_system",
      "obat_display",
      "form_code",
      "form_system"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kirim-medication-satu-sehat",
    "slug": "kirim-medication-satu-sehat",
    "judul": "Kirim Medication Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_medication",
    "javaRef": "SatuSehatKirimMedication",
    "tabel": "satu_sehat_medication",
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
        "nama": "id_medication",
        "label": "Id Medication",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode_brng",
      "id_medication"
    ],
    "kolomUrut": "kode_brng",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-medication-request-satu-sehat",
    "slug": "kirim-medication-request-satu-sehat",
    "judul": "Kirim Medication Request Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_medicationrequest",
    "javaRef": "SatuSehatKirimMedicationRequest",
    "tabel": "satu_sehat_medicationrequest",
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
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "id_medicationrequest",
        "label": "Id Medicationrequest",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_resep",
      "kode_brng",
      "id_medicationrequest"
    ],
    "kolomUrut": "no_resep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-medication-dispense-satu-sehat",
    "slug": "kirim-medication-dispense-satu-sehat",
    "judul": "Kirim Medication Dispense Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_medicationdispense",
    "javaRef": "SatuSehatKirimMedicationDispense",
    "tabel": "satu_sehat_medicationdispense",
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
        "nama": "jam",
        "label": "Jam",
        "pk": true,
        "wajib": true,
        "tipe": "time"
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
        "nama": "id_medicationdispanse",
        "label": "Id Medicationdispanse",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "kode_brng",
      "no_batch",
      "no_faktur",
      "id_medicationdispanse"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-medication-statement-satu-sehat",
    "slug": "kirim-medication-statement-satu-sehat",
    "judul": "Kirim Medication Statement Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_medicationstatement",
    "javaRef": "SatuSehatKirimMedicationStatement",
    "tabel": "satu_sehat_medicationstatement",
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
        "nama": "kode_brng",
        "label": "Kode Brng",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "id_medicationstatement",
        "label": "Id Medicationstatement",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_resep",
      "kode_brng",
      "id_medicationstatement"
    ],
    "kolomUrut": "no_resep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-mapping-radiologi-satu-sehat",
    "slug": "mapping-radiologi-satu-sehat",
    "judul": "Mapping Tindakan Radiologi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_radiologi",
    "javaRef": "SatuSehatMapingRadiologi",
    "tabel": "satu_sehat_mapping_radiologi",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kode Jenis Prw",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "code",
        "label": "Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "system",
        "label": "System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "display",
        "label": "Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "sampel_code",
        "label": "Sampel Code",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "sampel_system",
        "label": "Sampel System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sampel_display",
        "label": "Sampel Display",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "code",
      "system",
      "display",
      "sampel_code",
      "sampel_system"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mapping-laborat-satu-sehat",
    "slug": "mapping-laborat-satu-sehat",
    "judul": "Mapping Tindakan Lab PK & MB Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_mapping_lab",
    "javaRef": "SatuSehatMapingLaborat",
    "tabel": "satu_sehat_mapping_lab",
    "kolom": [
      {
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "tipe": "number",
        "wajib": true
      },
      {
        "nama": "code",
        "label": "Code",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "system",
        "label": "System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "display",
        "label": "Display",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "sampel_code",
        "label": "Sampel Code",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "sampel_system",
        "label": "Sampel System",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sampel_display",
        "label": "Sampel Display",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      }
    ],
    "kolomCari": [
      "id_template",
      "code",
      "system",
      "display",
      "sampel_code",
      "sampel_system"
    ],
    "kolomUrut": "id_template",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kirim-service-request-radiologi-satu-sehat",
    "slug": "kirim-service-request-radiologi-satu-sehat",
    "judul": "Kirim Service Request Radiologi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_servicerequest_radiologi",
    "javaRef": "SatuSehatKirimServiceRequestRadiologi",
    "tabel": "satu_sehat_servicerequest_radiologi",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_servicerequest",
        "label": "Id Servicerequest",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "noorder",
      "kd_jenis_prw",
      "id_servicerequest"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-specimen-radiologi-satu-sehat",
    "slug": "kirim-specimen-radiologi-satu-sehat",
    "judul": "Kirim Specimen Radiologi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_specimen_radiologi",
    "javaRef": "SatuSehatKirimSpecimenRadiologi",
    "tabel": "satu_sehat_specimen_radiologi",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_specimen",
        "label": "Id Specimen",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "noorder",
      "kd_jenis_prw",
      "id_specimen"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-observation-radiologi-satu-sehat",
    "slug": "kirim-observation-radiologi-satu-sehat",
    "judul": "Kirim Observation Radiologi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_observation_radiologi",
    "javaRef": "SatuSehatKirimObservationRadiologi",
    "tabel": "satu_sehat_observation_radiologi",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_observation",
        "label": "Id Observation",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "noorder",
      "kd_jenis_prw",
      "id_observation"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-diagnostic-report-satu-sehat",
    "slug": "kirim-diagnostic-report-satu-sehat",
    "judul": "Kirim Diagnostic Report Radiologi Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diagnosticreport_radiologi",
    "javaRef": "SatuSehatKirimDiagnosticReportRadiologi",
    "tabel": "satu_sehat_diagnosticreport_radiologi",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_diagnosticreport",
        "label": "Id Diagnosticreport",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "noorder",
      "kd_jenis_prw",
      "id_diagnosticreport"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-dicom-berkas-satu-sehat",
    "slug": "kirim-dicom-berkas-satu-sehat",
    "judul": "Kirim Berkas DICOM Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diagnosticreport_radiologi",
    "javaRef": "SatuSehatKirimDicomBerkas",
    "tabel": "satu_sehat_mapping_lokasi_ruangrad",
    "kolom": [
      {
        "nama": "id_lokasi_satusehat",
        "label": "Id Lokasi Satusehat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "id_organisasi_satusehat",
        "label": "Id Organisasi Satusehat",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "longitude",
        "label": "Longitude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "latitude",
        "label": "Latitude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "altittude",
        "label": "Altittude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id_lokasi_satusehat",
      "id_organisasi_satusehat",
      "longitude",
      "latitude",
      "altittude"
    ],
    "kolomUrut": "id_lokasi_satusehat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-dicom-router-satu-sehat",
    "slug": "kirim-dicom-router-satu-sehat",
    "judul": "Kirim DICOM Router Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diagnosticreport_radiologi",
    "javaRef": "SatuSehatKirimDicomRouter",
    "tabel": "satu_sehat_mapping_lokasi_ruangrad",
    "kolom": [
      {
        "nama": "id_lokasi_satusehat",
        "label": "Id Lokasi Satusehat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "id_organisasi_satusehat",
        "label": "Id Organisasi Satusehat",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "longitude",
        "label": "Longitude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "latitude",
        "label": "Latitude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "altittude",
        "label": "Altittude",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id_lokasi_satusehat",
      "id_organisasi_satusehat",
      "longitude",
      "latitude",
      "altittude"
    ],
    "kolomUrut": "id_lokasi_satusehat",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-service-request-lab-pk-satu-sehat",
    "slug": "kirim-service-request-lab-pk-satu-sehat",
    "judul": "Kirim Service Request Lab PK Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_servicerequest_lab",
    "javaRef": "SatuSehatKirimServiceRequestLabPK",
    "tabel": "satu_sehat_servicerequest_lab",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_servicerequest",
        "label": "Id Servicerequest",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_servicerequest"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-specimen-lab-pk-satu-sehat",
    "slug": "kirim-specimen-lab-pk-satu-sehat",
    "judul": "Kirim Specimen Lab PK Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_specimen_lab",
    "javaRef": "SatuSehatKirimSpecimenLabPK",
    "tabel": "satu_sehat_specimen_lab",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_specimen",
        "label": "Id Specimen",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_specimen"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-observation-lab-pk-satu-sehat",
    "slug": "kirim-observation-lab-pk-satu-sehat",
    "judul": "Kirim Observation Lab PK Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_observation_lab",
    "javaRef": "SatuSehatKirimObservationLabPK",
    "tabel": "satu_sehat_observation_lab",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_observation",
        "label": "Id Observation",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_observation"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-diagnostic-report-lab-pk-satu-sehat",
    "slug": "kirim-diagnostic-report-lab-pk-satu-sehat",
    "judul": "Kirim Diagnostic Report Lab PK Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diagnosticreport_lab",
    "javaRef": "SatuSehatKirimDiagnosticReportLabPK",
    "tabel": "satu_sehat_diagnosticreport_lab",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_diagnosticreport",
        "label": "Id Diagnosticreport",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_diagnosticreport"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-service-request-lab-mb-satu-sehat",
    "slug": "kirim-service-request-lab-mb-satu-sehat",
    "judul": "Kirim Service Request Lab MB Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_servicerequest_labmb",
    "javaRef": "SatuSehatKirimServiceRequestLabMB",
    "tabel": "satu_sehat_servicerequest_lab_mb",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_servicerequest",
        "label": "Id Servicerequest",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_servicerequest"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-specimen-lab-mb-satu-sehat",
    "slug": "kirim-specimen-lab-mb-satu-sehat",
    "judul": "Kirim Specimen Lab MB Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_specimen_labmb",
    "javaRef": "SatuSehatKirimSpecimenLabMB",
    "tabel": "satu_sehat_specimen_lab_mb",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_specimen",
        "label": "Id Specimen",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_specimen"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-observation-lab-mb-satu-sehat",
    "slug": "kirim-observation-lab-mb-satu-sehat",
    "judul": "Kirim Observation Lab MB Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_observation_labmb",
    "javaRef": "SatuSehatKirimObservationLabMB",
    "tabel": "satu_sehat_observation_lab_mb",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_observation",
        "label": "Id Observation",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_observation"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-diagnostic-report-lab-mb-satu-sehat",
    "slug": "kirim-diagnostic-report-lab-mb-satu-sehat",
    "judul": "Kirim Diagnostic Report Lab MB Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_diagnosticreport_labmb",
    "javaRef": "SatuSehatKirimDiagnosticReportLabMB",
    "tabel": "satu_sehat_diagnosticreport_lab_mb",
    "kolom": [
      {
        "nama": "noorder",
        "label": "Noorder",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "id_template",
        "label": "Id Template",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "id_diagnosticreport",
        "label": "Id Diagnosticreport",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "id_template",
      "noorder",
      "kd_jenis_prw",
      "id_diagnosticreport"
    ],
    "kolomUrut": "noorder",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kirim-care-plan-satu-sehat",
    "slug": "kirim-care-plan-satu-sehat",
    "judul": "Kirim Care Plan Satu Sehat",
    "kategori": "L",
    "permissionKey": "satu_sehat_kirim_careplan",
    "javaRef": "SatuSehatKirimCarePlan",
    "tabel": "satu_sehat_careplan",
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
        "nama": "id_careplan",
        "label": "Id Careplan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "status",
      "no_rawat",
      "id_careplan"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-referensi-poli-mobile-jknfktp",
    "slug": "referensi-poli-mobile-jknfktp",
    "judul": "Referensi Poli Mobile JKN FKTP",
    "kategori": "L",
    "permissionKey": "referensi_poli_mobilejknfktp",
    "javaRef": "MobileJKNFKTPReferensiPoli",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-referensi-dokter-mobile-jknfktp",
    "slug": "referensi-dokter-mobile-jknfktp",
    "judul": "Referensi Dokter Mobile JKN FKTP",
    "kategori": "L",
    "permissionKey": "referensi_dokter_mobilejknfktp",
    "javaRef": "MobileJKNFKTPReferensiDokter",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-keluar-duta-parking",
    "slug": "rekap-keluar-duta-parking",
    "judul": "Rekap Keluar Duta Parking",
    "kategori": "L",
    "permissionKey": "duta_parkir_rekap_keluar",
    "javaRef": "DutaParkingRekapKeluar",
    "tabel": "bridging_sep",
    "kolom": [
      {
        "nama": "no_sep",
        "label": "No Sep",
        "pk": true,
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
        "nama": "tglsep",
        "label": "Tglsep",
        "tipe": "date"
      },
      {
        "nama": "tglrujukan",
        "label": "Tglrujukan",
        "tipe": "date"
      },
      {
        "nama": "no_rujukan",
        "label": "No Rujukan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kdppkrujukan",
        "label": "Kdppkrujukan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkrujukan",
        "label": "Nmppkrujukan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kdppkpelayanan",
        "label": "Kdppkpelayanan",
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "nmppkpelayanan",
        "label": "Nmppkpelayanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "jnspelayanan",
        "label": "Jnspelayanan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2"
        ]
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagawal",
        "label": "Diagawal",
        "tipe": "text",
        "maks": 10
      }
    ],
    "kolomTanggal": "tglsep",
    "kolomCari": [
      "no_sep",
      "no_rawat",
      "no_rujukan",
      "kdppkrujukan",
      "nmppkrujukan",
      "kdppkpelayanan"
    ],
    "kolomUrut": "tglsep",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  }
];

export const PETA_KATALOG_BRIDGING: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_BRIDGING.map((item) => [item.slug, item]),
);

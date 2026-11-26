import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_PARKIR: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-jenis-parkir",
    "slug": "jenis-parkir",
    "judul": "Jenis Parkir",
    "kategori": "H",
    "permissionKey": "parkir_jenis",
    "javaRef": "DlgParkirJenis",
    "tabel": "parkir_jenis",
    "kolom": [
      {
        "nama": "kd_parkir",
        "label": "Kd Parkir",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jns_parkir",
        "label": "Jns Parkir",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Harian",
          "Jam"
        ]
      }
    ],
    "kolomCari": [
      "kd_parkir",
      "jns_parkir"
    ],
    "kolomUrut": "kd_parkir",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-barcode-parkir",
    "slug": "barcode-parkir",
    "judul": "Barcode Parkir",
    "kategori": "H",
    "permissionKey": "parkir_barcode",
    "javaRef": "DlgParkirBarcode",
    "tabel": "parkir_barcode",
    "kolom": [
      {
        "nama": "kode_barcode",
        "label": "Kode Barcode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nomer_kartu",
        "label": "Nomer Kartu",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "kode_barcode",
      "nomer_kartu"
    ],
    "kolomUrut": "kode_barcode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-parkir-masuk",
    "slug": "parkir-masuk",
    "judul": "Parkir Masuk",
    "kategori": "H",
    "permissionKey": "parkir_in",
    "javaRef": "DlgParkirMasuk",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_PARKIR: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_PARKIR.map((item) => [item.slug, item]),
);

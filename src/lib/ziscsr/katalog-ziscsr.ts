import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_ZISCSR: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-zis-pengeluaran-penerima-dankes",
    "slug": "zis-pengeluaran-penerima-dankes",
    "judul": "Ket Pengeluaran Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_pengeluaran_penerima_dankes",
    "javaRef": "ZISPengeluaranPenerimaDankes",
    "tabel": "zis_keterangan_pengeluaran_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-penghasilan-penerima-dankes",
    "slug": "zis-penghasilan-penerima-dankes",
    "judul": "Ket Penghasilan Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_penghasilan_penerima_dankes",
    "javaRef": "ZISPenghasilanPenerimaDankes",
    "tabel": "zis_keterangan_penghasilan_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-ukuran-rumah-penerima-dankes",
    "slug": "zis-ukuran-rumah-penerima-dankes",
    "judul": "Ukuran Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_ukuran_rumah_penerima_dankes",
    "javaRef": "ZISUkuranRumahPenerimaDankes",
    "tabel": "zis_keterangan_ukuran_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-dinding-rumah-penerima-dankes",
    "slug": "zis-dinding-rumah-penerima-dankes",
    "judul": "Dinding Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_dinding_rumah_penerima_dankes",
    "javaRef": "ZISDindingRumahPenerimaDankes",
    "tabel": "zis_keterangan_dinding_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-lantai-rumah-penerima-dankes",
    "slug": "zis-lantai-rumah-penerima-dankes",
    "judul": "Lantai Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_lantai_rumah_penerima_dankes",
    "javaRef": "ZISLantaiRumahPenerimaDankes",
    "tabel": "zis_keterangan_lantai_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-atap-rumah-penerima-dankes",
    "slug": "zis-atap-rumah-penerima-dankes",
    "judul": "Atap Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_atap_rumah_penerima_dankes",
    "javaRef": "ZISAtapRumahPenerimaDankes",
    "tabel": "zis_keterangan_atap_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-kepemilikan-rumah-penerima-dankes",
    "slug": "zis-kepemilikan-rumah-penerima-dankes",
    "judul": "Kepemilikan Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_kepemilikan_rumah_penerima_dankes",
    "javaRef": "ZISAtapRumahPenerimaDankes",
    "tabel": "zis_keterangan_atap_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-kamar-mandi-penerima-dankes",
    "slug": "zis-kamar-mandi-penerima-dankes",
    "judul": "Kamar Mandi Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_kamar_mandi_penerima_dankes",
    "javaRef": "ZISKamarMandiPenerimaDankes",
    "tabel": "zis_keterangan_kamar_mandi_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-dapur-rumah-penerima-dankes",
    "slug": "zis-dapur-rumah-penerima-dankes",
    "judul": "Dapur Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_dapur_rumah_penerima_dankes",
    "javaRef": "ZISDapurRumahPenerimaDankes",
    "tabel": "zis_keterangan_dapur_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-kursi-rumah-penerima-dankes",
    "slug": "zis-kursi-rumah-penerima-dankes",
    "judul": "Kursi Rumah Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_kursi_rumah_penerima_dankes",
    "javaRef": "ZISKursiRumahPenerimaDankes",
    "tabel": "zis_keterangan_kursi_rumah_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-kategori-phbs-penerima-dankes",
    "slug": "zis-kategori-phbs-penerima-dankes",
    "judul": "Kategori PHBS Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_kategori_phbs_penerima_dankes",
    "javaRef": "ZISKategoriPHBSPenerimaDankes",
    "tabel": "zis_keterangan_kategori_phbs_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-elektronik-penerima-dankes",
    "slug": "zis-elektronik-penerima-dankes",
    "judul": "Elektronik Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_elektronik_penerima_dankes",
    "javaRef": "ZISElektronikPenerimaDankes",
    "tabel": "zis_keterangan_elektronik_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-ternak-penerima-dankes",
    "slug": "zis-ternak-penerima-dankes",
    "judul": "Ternak Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_ternak_penerima_dankes",
    "javaRef": "ZISTernakPenerimaDankes",
    "tabel": "zis_keterangan_ternak_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-jenis-simpanan-penerima-dankes",
    "slug": "zis-jenis-simpanan-penerima-dankes",
    "judul": "Jenis Simpanan Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_jenis_simpanan_penerima_dankes",
    "javaRef": "ZISJenisSimpananPenerimaDankes",
    "tabel": "zis_keterangan_jenis_simpanan_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-kategori-asnaf-penerima-dankes",
    "slug": "zis-kategori-asnaf-penerima-dankes",
    "judul": "Kategori Asnaf Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_kategori_asnaf_penerima_dankes",
    "javaRef": "ZISKategoriAsnafPenerimaDankes",
    "tabel": "zis_keterangan_kategori_asnaf_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-zis-patologis-penerima-dankes",
    "slug": "zis-patologis-penerima-dankes",
    "judul": "Patologis Penerima Dankes",
    "kategori": "S",
    "permissionKey": "zis_patologis_penerima_dankes",
    "javaRef": "ZISPatologisPenerimaDankes",
    "tabel": "zis_keterangan_patologis_penerima_dankes",
    "kolom": [
      {
        "nama": "kode",
        "label": "Kode",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "kode",
      "keterangan"
    ],
    "kolomUrut": "kode",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_ZISCSR: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_ZISCSR.map((item) => [item.slug, item]),
);

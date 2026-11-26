import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_REKAM_MEDIS: readonly DefinisiModulKatalog[] = [
  {
    "id": "btn-perusahaan",
    "slug": "perusahaan",
    "judul": "Instansi/Perusahaan Pasien",
    "kategori": "M",
    "permissionKey": "perusahaan_pasien",
    "javaRef": "DlgPerusahaan",
    "tabel": "perusahaan_pasien",
    "kolom": [
      {
        "nama": "kode_perusahaan",
        "label": "Kode Perusahaan",
        "pk": true,
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nama_perusahaan",
        "label": "Nama Perusahaan",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kota",
        "label": "Kota",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_telp",
        "label": "No. Telp",
        "tipe": "text",
        "maks": 27
      }
    ],
    "kolomCari": [
      "kode_perusahaan",
      "nama_perusahaan",
      "alamat",
      "kota",
      "no_telp"
    ],
    "kolomUrut": "kode_perusahaan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-suku",
    "slug": "suku",
    "judul": "Suku/Bangsa Pasien",
    "kategori": "M",
    "permissionKey": "suku_bangsa",
    "javaRef": "DlgSuku",
    "tabel": "suku_bangsa",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_suku_bangsa",
        "label": "Nama Suku Bangsa",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_suku_bangsa"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bahasa",
    "slug": "bahasa",
    "judul": "Bahasa Pasien",
    "kategori": "M",
    "permissionKey": "bahasa_pasien",
    "javaRef": "DlgBahasa",
    "tabel": "bahasa_pasien",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_bahasa",
        "label": "Nama Bahasa",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_bahasa"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-golongan-tni",
    "slug": "golongan-tni",
    "judul": "Golongan TNI",
    "kategori": "M",
    "permissionKey": "golongan_tni",
    "javaRef": "DlgGolonganTNI",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-satuan-tni",
    "slug": "satuan-tni",
    "judul": "Satuan TNI",
    "kategori": "M",
    "permissionKey": "satuan_tni",
    "javaRef": "DlgSatuanTNI",
    "tabel": "satuan_tni",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_satuan",
        "label": "Nama Satuan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_satuan"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-jabatan-tni",
    "slug": "jabatan-tni",
    "judul": "Jabatan TNI",
    "kategori": "M",
    "permissionKey": "jabatan_tni",
    "javaRef": "DlgJabatanTNI",
    "tabel": "jabatan_tni",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_jabatan",
        "label": "Nama Jabatan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_jabatan"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pangkat-tni",
    "slug": "pangkat-tni",
    "judul": "Pangkat TNI",
    "kategori": "M",
    "permissionKey": "pangkat_tni",
    "javaRef": "DlgPangkatTNI",
    "tabel": "pangkat_tni",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_pangkat",
        "label": "Nama Pangkat",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_pangkat"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-golongan-polri",
    "slug": "golongan-polri",
    "judul": "Golongan POLRI",
    "kategori": "M",
    "permissionKey": "golongan_polri",
    "javaRef": "DlgGolonganPolri",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-satuan-polri",
    "slug": "satuan-polri",
    "judul": "Satuan POLRI",
    "kategori": "M",
    "permissionKey": "satuan_polri",
    "javaRef": "DlgSatuanPolri",
    "tabel": "satuan_polri",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_satuan",
        "label": "Nama Satuan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_satuan"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-jabatan-polri",
    "slug": "jabatan-polri",
    "judul": "Jabatan POLRI",
    "kategori": "M",
    "permissionKey": "jabatan_polri",
    "javaRef": "DlgJabatanPolri",
    "tabel": "jabatan_polri",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_jabatan",
        "label": "Nama Jabatan",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_jabatan"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pangkat-polri",
    "slug": "pangkat-polri",
    "judul": "Pangkat POLRI",
    "kategori": "M",
    "permissionKey": "pangkat_polri",
    "javaRef": "DlgPangkatPolri",
    "tabel": "pangkat_polri",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_pangkat",
        "label": "Nama Pangkat",
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_pangkat"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-cacat-fisik",
    "slug": "cacat-fisik",
    "judul": "Cacat Fisik",
    "kategori": "M",
    "permissionKey": "cacat_fisik",
    "javaRef": "DlgCacatFisik",
    "tabel": "cacat_fisik",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "autoInc": true,
        "tipe": "number"
      },
      {
        "nama": "nama_cacat",
        "label": "Nama Cacat",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomCari": [
      "id",
      "nama_cacat"
    ],
    "kolomUrut": "id",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-lahir",
    "slug": "lahir",
    "judul": "Kelahiran Bayi",
    "kategori": "M",
    "permissionKey": "kelahiran_bayi",
    "javaRef": "DlgIKBBayi",
    "tabel": "pasien_bayi",
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
        "nama": "umur_ibu",
        "label": "Umur Ibu",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nama_ayah",
        "label": "Nama Ayah",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "umur_ayah",
        "label": "Umur Ayah",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "berat_badan",
        "label": "Berat Badan",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "panjang_badan",
        "label": "Panjang Badan",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "lingkar_kepala",
        "label": "Lingkar Kepala",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "proses_lahir",
        "label": "Proses Lahir",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "anakke",
        "label": "Anakke",
        "tipe": "text",
        "maks": 2,
        "wajib": true
      },
      {
        "nama": "jam_lahir",
        "label": "Jam Lahir",
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "penyulit_kehamilan",
        "label": "Penyulit Kehamilan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "ketuban",
        "label": "Ketuban",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "lingkar_perut",
        "label": "Lingkar Perut",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "lingkar_dada",
        "label": "Lingkar Dada",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "penolong",
        "label": "Penolong",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_skl",
        "label": "No. Skl",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "g",
        "label": "G",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "p",
        "label": "P",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "a",
        "label": "A",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "f1",
        "label": "F1",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "u1",
        "label": "U1",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "t1",
        "label": "T1",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "r1",
        "label": "R1",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "w1",
        "label": "W1",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "n1",
        "label": "N1",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "f5",
        "label": "F5",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "u5",
        "label": "U5",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "t5",
        "label": "T5",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "r5",
        "label": "R5",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "w5",
        "label": "W5",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "n5",
        "label": "N5",
        "tipe": "text",
        "maks": 2,
        "wajib": true
      },
      {
        "nama": "f10",
        "label": "F10",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "u10",
        "label": "U10",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "t10",
        "label": "T10",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "r10",
        "label": "R10",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "w10",
        "label": "W10",
        "tipe": "text",
        "maks": 1,
        "wajib": true
      },
      {
        "nama": "n10",
        "label": "N10",
        "tipe": "text",
        "maks": 2,
        "wajib": true
      },
      {
        "nama": "resusitas",
        "label": "Resusitas",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "obat_diberikan",
        "label": "Obat Diberikan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "mikasi",
        "label": "Mikasi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "mikonium",
        "label": "Mikonium",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "umur_ibu",
      "nama_ayah",
      "umur_ayah",
      "berat_badan",
      "panjang_badan"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-pasien",
    "slug": "catatan-pasien",
    "judul": "Catatan Pasien",
    "kategori": "M",
    "permissionKey": "catatan_pasien",
    "javaRef": "DlgLhtCatatanPasien",
    "tabel": "catatan_pasien",
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
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 2000
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "catatan"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pasien-mati",
    "slug": "pasien-mati",
    "judul": "Pasien Meninggal",
    "kategori": "M",
    "permissionKey": "pasien_meninggal",
    "javaRef": "DlgPasienMati",
    "tabel": "pasien_mati",
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
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "temp_meninggal",
        "label": "Temp Meninggal",
        "tipe": "enum",
        "opsi": [
          "-",
          "Rumah Sakit",
          "Puskesmas",
          "Rumah Bersalin",
          "Rumah Tempat Tinggal",
          "Lain-lain (Termasuk Doa)",
          "Tidak tahu"
        ]
      },
      {
        "nama": "icd1",
        "label": "Icd1",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "icd2",
        "label": "Icd2",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "icd3",
        "label": "Icd3",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "icd4",
        "label": "Icd4",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rkm_medis",
      "keterangan",
      "icd1",
      "icd2",
      "icd3",
      "icd4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-diagnosa",
    "slug": "diagnosa",
    "judul": "Diagnosa Pasien",
    "kategori": "M",
    "permissionKey": "diagnosa_pasien",
    "javaRef": "btn-diagnosa",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-insiden-keselamatan",
    "slug": "insiden-keselamatan",
    "judul": "Insiden Keselamatan",
    "kategori": "M",
    "permissionKey": "insiden_keselamatan",
    "javaRef": "DlgInsidenKeselamatan",
    "tabel": "insiden_keselamatan",
    "kolom": [
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_insiden",
        "label": "Nama Insiden",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jenis_insiden",
        "label": "Jenis Insiden",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "KTC",
          "KNC",
          "KTD",
          "Sentinel"
        ]
      },
      {
        "nama": "dampak",
        "label": "Dampak",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "1. Tidak Signifikan",
          "2. Minor",
          "3. Moderat",
          "4. Mayor",
          "5. Katastropik"
        ]
      }
    ],
    "kolomCari": [
      "kode_insiden",
      "nama_insiden"
    ],
    "kolomUrut": "kode_insiden",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-data-ha-is",
    "slug": "data-ha-is",
    "judul": "Data HAIs",
    "kategori": "M",
    "permissionKey": "data_HAIs",
    "javaRef": "DlgDataHAIs",
    "tabel": "ranap_gabung",
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
        "nama": "no_rawat2",
        "label": "No Rawat2",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      }
    ],
    "kolomCari": [
      "no_rawat",
      "no_rawat2"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-klasifikasi-pasien-ranap",
    "slug": "klasifikasi-pasien-ranap",
    "judul": "Klasifikasi Pasien Ranap",
    "kategori": "M",
    "permissionKey": "klasifikasi_pasien_ranap",
    "javaRef": "DlgDataKlasifikasiPasienRanap",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-soap-perawatan",
    "slug": "soap-perawatan",
    "judul": "SOAP Perawatan",
    "kategori": "M",
    "permissionKey": "soap_perawatan",
    "javaRef": "DlgSOAPPerawatan",
    "tabel": "pemeriksaan_ralan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
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
        "tipe": "text",
        "maks": 8,
        "wajib": true
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
        "label": "SPO2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "somnolence",
          "sopor",
          "coma",
          "alert",
          "confusion",
          "voice",
          "pain",
          "unresponsive",
          "apatis",
          "delirium"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "lingkar_perut",
        "label": "Lingkar Perut",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rtl",
        "label": "Rtl",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "penilaian",
        "label": "Penilaian",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "suhu_tubuh",
      "tensi",
      "nadi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-soap-ralan-anggota-polri",
    "slug": "soap-ralan-anggota-polri",
    "judul": "SOAP Ralan Anggota POLRI",
    "kategori": "M",
    "permissionKey": "soap_ralan_polri",
    "javaRef": "DlgSOAPRalanAggotaPolri",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-soap-ranap-anggota-polri",
    "slug": "soap-ranap-anggota-polri",
    "judul": "SOAP Ranap Anggota POLRI",
    "kategori": "M",
    "permissionKey": "soap_ranap_polri",
    "javaRef": "DlgSOAPRanapAggotaPolri",
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
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-soap-ralan-anggota-tni",
    "slug": "soap-ralan-anggota-tni",
    "judul": "SOAP Ralan Anggota TNI",
    "kategori": "M",
    "permissionKey": "soap_ralan_tni",
    "javaRef": "DlgSOAPRalanAggotaTNI",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-soap-ranap-anggota-tni",
    "slug": "soap-ranap-anggota-tni",
    "judul": "SOAP Ranap Anggota TNI",
    "kategori": "M",
    "permissionKey": "soap_ranap_tni",
    "javaRef": "DlgSOAPRanapAggotaTNI",
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
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-riwayat-kamar-pasien",
    "slug": "riwayat-kamar-pasien",
    "judul": "Riwayat Kamar Pasien",
    "kategori": "M",
    "permissionKey": "riwayat_kamar_pasien",
    "javaRef": "RMRiwayatKamarPasien",
    "tabel": "kamar_inap",
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
        "tipe": "text",
        "maks": 15,
        "wajib": true
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
        "nama": "tgl_masuk",
        "label": "Tgl. Masuk",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_masuk",
        "label": "Jam Masuk",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "tgl_keluar",
        "label": "Tgl. Keluar",
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
        "label": "Status Pulang",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "rujuk",
          "aps",
          "+",
          "meninggal",
          "sembuh",
          "membaik",
          "pulang paksa",
          "-",
          "pindah kamar",
          "status belum lengkap",
          "atas persetujuan dokter",
          "atas permintaan sendiri",
          "isoman",
          "lain-lain"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_masuk",
    "kolomCari": [
      "no_rawat",
      "kd_kamar",
      "diagnosa_awal",
      "diagnosa_akhir",
      "tgl_masuk",
      "jam_masuk"
    ],
    "kolomUrut": "tgl_masuk",
    "kolomRingkasan": {
      "nama": "ttl_biaya",
      "label": "Total Ttl Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-insiden-keselamatan-pasien",
    "slug": "insiden-keselamatan-pasien",
    "judul": "Data Insiden Keselamatan",
    "kategori": "M",
    "permissionKey": "insiden_keselamatan_pasien",
    "javaRef": "DlgDataInsidenKeselamatan",
    "tabel": "insiden_keselamatan_pasien",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "tgl_kejadian",
        "label": "Tgl. Kejadian",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_kejadian",
        "label": "Jam Kejadian",
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "tgl_lapor",
        "label": "Tgl. Lapor",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_lapor",
        "label": "Jam Lapor",
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "kode_insiden",
        "label": "Kode Insiden",
        "tipe": "text",
        "maks": 5,
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
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "kronologis",
        "label": "Kronologis",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "unit_terkait",
        "label": "Unit Terkait",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "akibat",
        "label": "Akibat",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "tindakan_insiden",
        "label": "Tindakan Insiden",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "identifikasi_masalah",
        "label": "Identifikasi Masalah",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "rtl",
        "label": "Rtl",
        "tipe": "text",
        "maks": 150,
        "wajib": true
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
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-sirkulasi-berkas",
    "slug": "sirkulasi-berkas",
    "judul": "Peminjaman Berkas RM",
    "kategori": "M",
    "permissionKey": "peminjaman_berkas",
    "javaRef": "DlgSirkulasiBerkas",
    "tabel": "peminjaman_berkas",
    "kolom": [
      {
        "nama": "peminjam",
        "label": "Peminjam",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "id_ruang",
        "label": "Id Ruang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
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
        "nama": "tgl_pinjam",
        "label": "Tgl Pinjam",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "tgl_kembali",
        "label": "Tgl Kembali",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "status_pinjam",
        "label": "Status Pinjam",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Masih Dipinjam",
          "Sudah Kembali"
        ]
      }
    ],
    "kolomTanggal": "tgl_pinjam",
    "kolomCari": [
      "peminjam",
      "id_ruang",
      "no_rkm_medis",
      "nip"
    ],
    "kolomUrut": "tgl_pinjam",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-resume",
    "slug": "resume",
    "judul": "Riwayat Perawatan",
    "kategori": "M",
    "permissionKey": "resume_pasien",
    "javaRef": "RMRiwayatPerawatan",
    "tabel": "resume_pasien",
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
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "jalannya_penyakit",
        "label": "Jalannya Penyakit",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_penunjang",
        "label": "Pemeriksaan Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "hasil_laborat",
        "label": "Hasil Laborat",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosa_utama",
        "label": "Diagnosa Utama",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_utama",
        "label": "Kode Diagnosa Utama",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder",
        "label": "Diagnosa Sekunder",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder",
        "label": "Kode Diagnosa Sekunder",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder2",
        "label": "Diagnosa Sekunder2",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder2",
        "label": "Kode Diagnosa Sekunder2",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder3",
        "label": "Diagnosa Sekunder3",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder3",
        "label": "Kode Diagnosa Sekunder3",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder4",
        "label": "Diagnosa Sekunder4",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder4",
        "label": "Kode Diagnosa Sekunder4",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "prosedur_utama",
        "label": "Prosedur Utama",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_utama",
        "label": "Kode Prosedur Utama",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder",
        "label": "Prosedur Sekunder",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder",
        "label": "Kode Prosedur Sekunder",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder2",
        "label": "Prosedur Sekunder2",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder2",
        "label": "Kode Prosedur Sekunder2",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder3",
        "label": "Prosedur Sekunder3",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder3",
        "label": "Kode Prosedur Sekunder3",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "kondisi_pulang",
        "label": "Kondisi Pulang",
        "tipe": "enum",
        "opsi": [
          "hidup",
          "meninggal"
        ],
        "wajib": true
      },
      {
        "nama": "obat_pulang",
        "label": "Obat Pulang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "keluhan_utama",
      "jalannya_penyakit",
      "pemeriksaan_penunjang",
      "hasil_laborat"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-retensi-rm",
    "slug": "retensi-rm",
    "judul": "Retensi Berkas R.M.",
    "kategori": "M",
    "permissionKey": "retensi_rm",
    "javaRef": "DlgRetensi",
    "tabel": "pemeriksaan_ralan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
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
        "tipe": "text",
        "maks": 8,
        "wajib": true
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
        "label": "SPO2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "somnolence",
          "sopor",
          "coma",
          "alert",
          "confusion",
          "voice",
          "pain",
          "unresponsive",
          "apatis",
          "delirium"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "lingkar_perut",
        "label": "Lingkar Perut",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rtl",
        "label": "Rtl",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "penilaian",
        "label": "Penilaian",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "suhu_tubuh",
      "tensi",
      "nadi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-mutasi-berkas",
    "slug": "mutasi-berkas",
    "judul": "Mutasi Berkas RM",
    "kategori": "M",
    "permissionKey": "mutasi_berkas",
    "javaRef": "DlgMutasiBerkas",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-berkas-digital-perawatan",
    "slug": "berkas-digital-perawatan",
    "judul": "Berkas Digital Perawatan",
    "kategori": "M",
    "permissionKey": "berkas_digital_perawatan",
    "javaRef": "DlgBerkasRawat",
    "tabel": "temppanggilnorawat",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "tipe": "text",
        "maks": 17,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_rawat"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pengaduan",
    "slug": "pengaduan",
    "judul": "Pengaduan/Chat",
    "kategori": "M",
    "permissionKey": "pengaduan_pasien",
    "javaRef": "btn-pengaduan",
    "tabel": "pengaduan",
    "kolom": [
      {
        "nama": "id",
        "label": "Id",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "pesan",
        "label": "Pesan",
        "wajib": true,
        "tipe": "text",
        "maks": 255
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "id",
      "no_rkm_medis",
      "pesan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-pemeriksaan",
    "slug": "master-triase-pemeriksaan",
    "judul": "Master Triase Pemeriksaan",
    "kategori": "M",
    "permissionKey": "master_triase_pemeriksaan",
    "javaRef": "MasterTriasePemeriksaan",
    "tabel": "master_triase_pemeriksaan",
    "kolom": [
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_pemeriksaan",
        "label": "Nama Pemeriksaan",
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_pemeriksaan",
      "nama_pemeriksaan"
    ],
    "kolomUrut": "kode_pemeriksaan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-macam-kasus",
    "slug": "master-triase-macam-kasus",
    "judul": "Master Triase Macam Kasus",
    "kategori": "M",
    "permissionKey": "master_triase_macamkasus",
    "javaRef": "MasterTriaseMacamKasus",
    "tabel": "master_triase_macam_kasus",
    "kolom": [
      {
        "nama": "kode_kasus",
        "label": "Kode Kasus",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "macam_kasus",
        "label": "Macam Kasus",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_kasus",
      "macam_kasus"
    ],
    "kolomUrut": "kode_kasus",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-skala1",
    "slug": "master-triase-skala1",
    "judul": "Master Triase Skala 1",
    "kategori": "M",
    "permissionKey": "master_triase_skala1",
    "javaRef": "MasterTriaseSkala1",
    "tabel": "master_triase_skala1",
    "kolom": [
      {
        "nama": "kode_skala1",
        "label": "Kode Skala1",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "pengkajian_skala1",
        "label": "Pengkajian Skala1",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_skala1",
      "kode_pemeriksaan",
      "pengkajian_skala1"
    ],
    "kolomUrut": "kode_skala1",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-skala2",
    "slug": "master-triase-skala2",
    "judul": "Master Triase Skala 2",
    "kategori": "M",
    "permissionKey": "master_triase_skala2",
    "javaRef": "MasterTriaseSkala2",
    "tabel": "master_triase_skala2",
    "kolom": [
      {
        "nama": "kode_skala2",
        "label": "Kode Skala2",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "pengkajian_skala2",
        "label": "Pengkajian Skala2",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_skala2",
      "kode_pemeriksaan",
      "pengkajian_skala2"
    ],
    "kolomUrut": "kode_skala2",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-skala3",
    "slug": "master-triase-skala3",
    "judul": "Master Triase Skala 3",
    "kategori": "M",
    "permissionKey": "master_triase_skala3",
    "javaRef": "MasterTriaseSkala3",
    "tabel": "master_triase_skala3",
    "kolom": [
      {
        "nama": "kode_skala3",
        "label": "Kode Skala3",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "pengkajian_skala3",
        "label": "Pengkajian Skala3",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_skala3",
      "kode_pemeriksaan",
      "pengkajian_skala3"
    ],
    "kolomUrut": "kode_skala3",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-skala4",
    "slug": "master-triase-skala4",
    "judul": "Master Triase Skala 4",
    "kategori": "M",
    "permissionKey": "master_triase_skala4",
    "javaRef": "MasterTriaseSkala4",
    "tabel": "master_triase_skala4",
    "kolom": [
      {
        "nama": "kode_skala4",
        "label": "Kode Skala4",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "pengkajian_skala4",
        "label": "Pengkajian Skala4",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_skala4",
      "kode_pemeriksaan",
      "pengkajian_skala4"
    ],
    "kolomUrut": "kode_skala4",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-triase-skala5",
    "slug": "master-triase-skala5",
    "judul": "Master Triase Skala 5",
    "kategori": "M",
    "permissionKey": "master_triase_skala5",
    "javaRef": "MasterTriaseSkala5",
    "tabel": "master_triase_skala5",
    "kolom": [
      {
        "nama": "kode_skala5",
        "label": "Kode Skala5",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_pemeriksaan",
        "label": "Kode Pemeriksaan",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "pengkajian_skala5",
        "label": "Pengkajian Skala5",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kode_skala5",
      "kode_pemeriksaan",
      "pengkajian_skala5"
    ],
    "kolomUrut": "kode_skala5",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-data-triase-igd",
    "slug": "data-triase-igd",
    "judul": "Data Triase IGD",
    "kategori": "M",
    "permissionKey": "data_triase_igd",
    "javaRef": "RMTriaseIGD",
    "tabel": "data_triase_igd",
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
        "nama": "tgl_kunjungan",
        "label": "Tgl. Kunjungan",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "cara_masuk",
        "label": "Cara Masuk",
        "tipe": "enum",
        "opsi": [
          "jalan",
          "brankar",
          "kursi roda",
          "digendong"
        ],
        "wajib": true
      },
      {
        "nama": "alat_transportasi",
        "label": "Alat Transportasi",
        "tipe": "enum",
        "opsi": [
          "-",
          "agd",
          "sendiri",
          "swasta"
        ],
        "wajib": true
      },
      {
        "nama": "alasan_kedatangan",
        "label": "Alasan Kedatangan",
        "tipe": "enum",
        "opsi": [
          "datang sendiri",
          "polisi",
          "rujukan",
          "bidan",
          "puskesmas",
          "rumah sakit",
          "poliklinik",
          "faskes lain",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kedatangan",
        "label": "Keterangan Kedatangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kode_kasus",
        "label": "Kode Kasus",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "tekanan_darah",
        "label": "Tekanan Darah",
        "tipe": "text",
        "maks": 8,
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
        "nama": "pernapasan",
        "label": "Pernapasan",
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
        "nama": "saturasi_o2",
        "label": "Saturasi O2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_kunjungan",
    "kolomCari": [
      "no_rawat",
      "cara_masuk",
      "alat_transportasi",
      "alasan_kedatangan",
      "keterangan_kedatangan",
      "kode_kasus"
    ],
    "kolomUrut": "tgl_kunjungan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-resume-pasien-ranap",
    "slug": "resume-pasien-ranap",
    "judul": "Resume Pasien Ranap",
    "kategori": "M",
    "permissionKey": "data_resume_pasien",
    "javaRef": "RMDataResumePasienRanap",
    "tabel": "resume_pasien_ranap",
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
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_awal",
        "label": "Diagnosa Awal",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "alasan",
        "label": "Alasan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_fisik",
        "label": "Pemeriksaan Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "jalannya_penyakit",
        "label": "Jalannya Penyakit",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_penunjang",
        "label": "Pemeriksaan Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "hasil_laborat",
        "label": "Hasil Laborat",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tindakan_dan_operasi",
        "label": "Tindakan Dan Operasi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "obat_di_rs",
        "label": "Obat Di Rs",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosa_utama",
        "label": "Diagnosa Utama",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_utama",
        "label": "Kode Diagnosa Utama",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder",
        "label": "Diagnosa Sekunder",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder",
        "label": "Kode Diagnosa Sekunder",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder2",
        "label": "Diagnosa Sekunder2",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder2",
        "label": "Kode Diagnosa Sekunder2",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder3",
        "label": "Diagnosa Sekunder3",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder3",
        "label": "Kode Diagnosa Sekunder3",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "diagnosa_sekunder4",
        "label": "Diagnosa Sekunder4",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_diagnosa_sekunder4",
        "label": "Kode Diagnosa Sekunder4",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "prosedur_utama",
        "label": "Prosedur Utama",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_utama",
        "label": "Kode Prosedur Utama",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder",
        "label": "Prosedur Sekunder",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder",
        "label": "Kode Prosedur Sekunder",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder2",
        "label": "Prosedur Sekunder2",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder2",
        "label": "Kode Prosedur Sekunder2",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "prosedur_sekunder3",
        "label": "Prosedur Sekunder3",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kd_prosedur_sekunder3",
        "label": "Kode Prosedur Sekunder3",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "diet",
        "label": "Diet",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab_belum",
        "label": "Lab Belum",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "cara_keluar",
        "label": "Cara Keluar",
        "tipe": "enum",
        "opsi": [
          "atas izin dokter",
          "pindah rs",
          "pulang atas permintaan sendiri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_keluar",
        "label": "Ket Keluar",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "membaik",
          "sembuh",
          "keadaan khusus",
          "meninggal"
        ],
        "wajib": true
      },
      {
        "nama": "ket_keadaan",
        "label": "Ket Keadaan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "dilanjutkan",
        "label": "Dilanjutkan",
        "tipe": "enum",
        "opsi": [
          "kembali ke rs",
          "rs lain",
          "dokter luar",
          "puskesmes",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dilanjutkan",
        "label": "Ket Dilanjutkan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kontrol",
        "label": "Kontrol",
        "tipe": "datetime"
      },
      {
        "nama": "obat_pulang",
        "label": "Obat Pulang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_awal",
      "alasan",
      "keluhan_utama",
      "pemeriksaan_fisik"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true,
    "kolomTanggal": "kontrol"
  },
  {
    "id": "btn-skrining-gizi-lanjut",
    "slug": "skrining-gizi-lanjut",
    "judul": "Skrining Gizi Lanjut",
    "kategori": "M",
    "permissionKey": "skrining_gizi",
    "javaRef": "RMDataSkriningGiziLanjut",
    "tabel": "skrining_gizi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "skrining_bb",
        "label": "Skrining BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "skrining_tb",
        "label": "Skrining TB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "parameter_imt",
        "label": "Parameter IMT",
        "tipe": "enum",
        "opsi": [
          "imt > 20/z score > 2",
          "imt 18,5-20/-2 =< z score =< 2",
          "imt < 18,5/z score < -2"
        ]
      },
      {
        "nama": "skor_imt",
        "label": "Skor IMT",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "parameter_bb",
        "label": "Parameter BB",
        "tipe": "enum",
        "opsi": [
          "bb hilang < 5%",
          "bb hilang 5 - 10 %",
          "bb hilang > 10 %"
        ]
      },
      {
        "nama": "skor_bb",
        "label": "Skor BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "parameter_penyakit",
        "label": "Parameter Penyakit",
        "tipe": "enum",
        "opsi": [
          "ada asupan nutrisi > 5 hari",
          "tidak ada asupan nutrisi > 5 hari"
        ]
      },
      {
        "nama": "skor_penyakit",
        "label": "Skor Penyakit",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "skor_total",
        "label": "Skor Total",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "parameter_total",
        "label": "Parameter Total",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "skrining_bb",
      "skrining_tb",
      "alergi",
      "parameter_imt"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-asuhan-gizi",
    "slug": "asuhan-gizi",
    "judul": "Asuhan Gizi",
    "kategori": "M",
    "permissionKey": "asuhan_gizi",
    "javaRef": "RMDataAsuhanGizi",
    "tabel": "asuhan_gizi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "antropometri_bb",
        "label": "Antropometri BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "antropometri_tb",
        "label": "Antropometri TB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "antropometri_imt",
        "label": "Antropometri IMT",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "antropometri_lla",
        "label": "Antropometri Lla",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "antropometri_tl",
        "label": "Antropometri Tl",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "antropometri_ulna",
        "label": "Antropometri Ulna",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "antropometri_bbideal",
        "label": "Antropometri Bbideal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "antropometri_bbperu",
        "label": "Antropometri Bbperu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "antropometri_tbperu",
        "label": "Antropometri Tbperu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "antropometri_bbpertb",
        "label": "Antropometri Bbpertb",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "antropometri_llaperu",
        "label": "Antropometri Llaperu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "biokimia",
        "label": "Biokimia",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "fisik_klinis",
        "label": "Fisik Klinis",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "alergi_telur",
        "label": "Alergi Telur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_susu_sapi",
        "label": "Alergi Susu Sapi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_kacang",
        "label": "Alergi Kacang",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_gluten",
        "label": "Alergi Gluten",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_udang",
        "label": "Alergi Udang",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_ikan",
        "label": "Alergi Ikan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "alergi_hazelnut",
        "label": "Alergi Hazelnut",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "pola_makan",
        "label": "Pola Makan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "riwayat_personal",
        "label": "Riwayat Personal",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "intervensi_gizi",
        "label": "Intervensi Gizi",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "monitoring_evaluasi",
        "label": "Monitoring Evaluasi",
        "tipe": "text",
        "maks": 1000
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
      "no_rawat",
      "tanggal",
      "antropometri_bb",
      "antropometri_tb",
      "antropometri_imt",
      "antropometri_lla"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-monitoring-asuhan-gizi",
    "slug": "monitoring-asuhan-gizi",
    "judul": "Monitoring Asuhan Gizi",
    "kategori": "M",
    "permissionKey": "monitoring_asuhan_gizi",
    "javaRef": "RMDataMonitoringAsuhanGizi",
    "tabel": "monitoring_asuhan_gizi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "monitoring",
        "label": "Monitoring",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 500
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
      "no_rawat",
      "tanggal",
      "monitoring",
      "evaluasi",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-adime-gizi",
    "slug": "catatan-adime-gizi",
    "judul": "Catatan ADIME Gizi",
    "kategori": "M",
    "permissionKey": "catatan_adime_gizi",
    "javaRef": "RMCatatanADIMEGizi",
    "tabel": "catatan_adime_gizi",
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
        "nama": "asesmen",
        "label": "Asesmen",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "intervensi",
        "label": "Intervensi",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "monitoring",
        "label": "Monitoring",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 1000
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
      "no_rawat",
      "asesmen",
      "diagnosis",
      "intervensi",
      "monitoring",
      "evaluasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-nutrisi-dewasa",
    "slug": "skrining-nutrisi-dewasa",
    "judul": "Skrining Nutrisi Pasien Dewasa",
    "kategori": "M",
    "permissionKey": "skrining_nutrisi_dewasa",
    "javaRef": "RMSkriningNutrisiDewasa",
    "tabel": "skrining_nutrisi_dewasa",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tbpb",
        "label": "Tbpb",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "tidak yakin",
          "ya, 1-5 kg",
          "ya, 6-10 kg",
          "ya, 11-15 kg",
          "ya, >15 kg"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
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
      "no_rawat",
      "td",
      "hr",
      "rr",
      "suhu",
      "bb"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-nutrisi-lansia",
    "slug": "skrining-nutrisi-lansia",
    "judul": "Skrining Nutrisi Pasien Lansia",
    "kategori": "M",
    "permissionKey": "skrining_nutrisi_lansia",
    "javaRef": "RMSkriningNutrisiLansia",
    "tabel": "skrining_nutrisi_lansia",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tbpb",
        "label": "Tbpb",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "asupan makan sangat berkurang",
          "asupan makan agak berkurang",
          "asupan makan tidak berkurang"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "penurunan berat badan lebih dari 3 kg",
          "tidak tahu",
          "penurunan berat badan antara 1 hingga 3 kg",
          "tidak ada penurunan berat badan"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "sg3",
        "label": "Sg3",
        "tipe": "enum",
        "opsi": [
          "terbatas dari tempat tidur atau kursi",
          "mampu bangun dari tempat tidur/kursi tetapi tidak bepergian keluar rumah",
          "dapat bepergian keluar rumah"
        ],
        "wajib": true
      },
      {
        "nama": "nilai3",
        "label": "Nilai3",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "sg4",
        "label": "Sg4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nilai4",
        "label": "Nilai4",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "sg5",
        "label": "Sg5",
        "tipe": "enum",
        "opsi": [
          "depresi berat atau kepikunan berat",
          "kepikunan ringan",
          "tidak ada gangguan psikologis"
        ],
        "wajib": true
      },
      {
        "nama": "nilai5",
        "label": "Nilai5",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "sg6",
        "label": "Sg6",
        "tipe": "enum",
        "opsi": [
          "imt < 19",
          "19 hingga < 21",
          "21 hingga < 23",
          "imt >= 23",
          "lingkar betis < 31",
          "lingkar betis >= 31"
        ],
        "wajib": true
      },
      {
        "nama": "nilai6",
        "label": "Nilai6",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
      },
      {
        "nama": "skor_nutrisi",
        "label": "Skor Nutrisi",
        "tipe": "enum",
        "opsi": [
          "status gizi normal",
          "beresiko malnutrisi",
          "malnutrisi"
        ]
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
      "no_rawat",
      "td",
      "hr",
      "rr",
      "suhu",
      "bb"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-nutrisi-anak",
    "slug": "skrining-nutrisi-anak",
    "judul": "Skrining Nutrisi Pasien Anak",
    "kategori": "M",
    "permissionKey": "skrining_nutrisi_anak",
    "javaRef": "RMSkriningNutrisiAnak",
    "tabel": "skrining_nutrisi_anak",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tbpb",
        "label": "Tbpb",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "sg3",
        "label": "Sg3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai3",
        "label": "Nilai3",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "sg4",
        "label": "Sg4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai4",
        "label": "Nilai4",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
      },
      {
        "nama": "skor_nutrisi",
        "label": "Skor Nutrisi",
        "tipe": "enum",
        "opsi": [
          "risikio berat",
          "risiko sedang",
          "risiko rendah"
        ]
      },
      {
        "nama": "diketahui_dietisien",
        "label": "Diketahui Dietisien",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_diketahui_dietisien",
        "label": "Keterangan Diketahui Dietisien",
        "tipe": "text",
        "maks": 10,
        "wajib": true
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
      "no_rawat",
      "td",
      "hr",
      "rr",
      "suhu",
      "bb"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-template-hasil-radiologi",
    "slug": "master-template-hasil-radiologi",
    "judul": "Master Template Hasil Radiologi",
    "kategori": "M",
    "permissionKey": "template_hasil_radiologi",
    "javaRef": "MasterTemplateHasilRadiologi",
    "tabel": "template_hasil_radiologi",
    "kolom": [
      {
        "nama": "no_template",
        "label": "No Template",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_pemeriksaan",
        "label": "Nama Pemeriksaan",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "template_hasil_radiologi",
        "label": "Template Hasil Radiologi",
        "tipe": "text",
        "maks": 2000
      }
    ],
    "kolomCari": [
      "no_template",
      "nama_pemeriksaan",
      "template_hasil_radiologi"
    ],
    "kolomUrut": "no_template",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-template-laporan-operasi",
    "slug": "master-template-laporan-operasi",
    "judul": "Master Template Laporan Operasi",
    "kategori": "M",
    "permissionKey": "template_laporan_operasi",
    "javaRef": "MasterTemplateLaporanOperasi",
    "tabel": "template_laporan_operasi",
    "kolom": [
      {
        "nama": "no_template",
        "label": "No. Template",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_operasi",
        "label": "Nama Operasi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "diagnosa_preop",
        "label": "Diagnosa Preop",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "diagnosa_postop",
        "label": "Diagnosa Postop",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "jaringan_dieksisi",
        "label": "Jaringan Dieksisi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "permintaan_pa",
        "label": "Permintaan Pa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "laporan_operasi",
        "label": "Laporan Operasi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomCari": [
      "no_template",
      "nama_operasi",
      "diagnosa_preop",
      "diagnosa_postop",
      "jaringan_dieksisi",
      "permintaan_pa"
    ],
    "kolomUrut": "no_template",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-template-pemeriksaan-dokter",
    "slug": "master-template-pemeriksaan-dokter",
    "judul": "Master Template Pemeriksaan",
    "kategori": "M",
    "permissionKey": "template_pemeriksaan",
    "javaRef": "MasterTemplatePemeriksaanDokter",
    "tabel": "template_pemeriksaan_dokter",
    "kolom": [
      {
        "nama": "no_template",
        "label": "No Template",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "penilaian",
        "label": "Penilaian",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "wajib": true,
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "wajib": true,
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 2000
      }
    ],
    "kolomCari": [
      "no_template",
      "kd_dokter",
      "keluhan",
      "pemeriksaan",
      "penilaian",
      "rencana"
    ],
    "kolomUrut": "no_template",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan",
    "slug": "master-masalah-keperawatan",
    "judul": "Master Masalah Keperawatan",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan",
    "javaRef": "MasterMasalahKeperawatan",
    "tabel": "master_masalah_keperawatan",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan",
    "slug": "master-rencana-keperawatan",
    "judul": "Master Rencana Keperawatan",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan",
    "javaRef": "MasterRencanaKeperawatan",
    "tabel": "master_rencana_keperawatan",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-gigi",
    "slug": "master-masalah-keperawatan-gigi",
    "judul": "Master Masalah Keperawatan Gigi",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_gigi",
    "javaRef": "MasterMasalahKeperawatanGigi",
    "tabel": "master_masalah_keperawatan_gigi",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-gigi",
    "slug": "master-rencana-keperawatan-gigi",
    "judul": "Master Rencana Keperawatan Gigi",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_gigi",
    "javaRef": "MasterRencanaKeperawatanGigi",
    "tabel": "master_rencana_keperawatan_gigi",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-anak",
    "slug": "master-masalah-keperawatan-anak",
    "judul": "Master Masalah Keperawatan Bayi/Anak",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_anak",
    "javaRef": "MasterMasalahKeperawatanAnak",
    "tabel": "master_masalah_keperawatan_anak",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-anak",
    "slug": "master-rencana-keperawatan-anak",
    "judul": "Master Rencana Keperawatan Bayi/Anak",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_anak",
    "javaRef": "MasterRencanaKeperawatanAnak",
    "tabel": "master_rencana_keperawatan_anak",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-mata",
    "slug": "master-masalah-keperawatan-mata",
    "judul": "Master Masalah Keperawatan Mata",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_mata",
    "javaRef": "MasterMasalahKeperawatanMata",
    "tabel": "master_masalah_keperawatan_mata",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-mata",
    "slug": "master-rencana-keperawatan-mata",
    "judul": "Master Rencana Keperawatan Mata",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_mata",
    "javaRef": "MasterRencanaKeperawatanMata",
    "tabel": "master_rencana_keperawatan_mata",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-igd",
    "slug": "master-masalah-keperawatan-igd",
    "judul": "Master Masalah Keperawatan IGD",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_igd",
    "javaRef": "MasterMasalahKeperawatanIGD",
    "tabel": "master_masalah_keperawatan_igd",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-igd",
    "slug": "master-rencana-keperawatan-igd",
    "judul": "Master Rencana Keperawatan IGD",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_igd",
    "javaRef": "MasterRencanaKeperawatanIGD",
    "tabel": "master_rencana_keperawatan_igd",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-psikiatri",
    "slug": "master-masalah-keperawatan-psikiatri",
    "judul": "Master Masalah Keperawatan Psikiatri",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_psikiatri",
    "javaRef": "MasterMasalahKeperawatanPsikiatri",
    "tabel": "master_masalah_keperawatan_psikiatri",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-psikiatri",
    "slug": "master-rencana-keperawatan-psikiatri",
    "judul": "Master Rencana Keperawatan Psikiatri",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_psikiatri",
    "javaRef": "MasterRencanaKeperawatanPsikiatri",
    "tabel": "master_rencana_keperawatan_psikiatri",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-geriatri",
    "slug": "master-masalah-keperawatan-geriatri",
    "judul": "Master Masalah Keperawatan Geriatri",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_geriatri",
    "javaRef": "MasterMasalahKeperawatanGeriatri",
    "tabel": "master_masalah_keperawatan_geriatri",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-geriatri",
    "slug": "master-rencana-keperawatan-geriatri",
    "judul": "Master Rencana Keperawatan Geriatri",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_geriatri",
    "javaRef": "MasterRencanaKeperawatanGeriatri",
    "tabel": "master_rencana_keperawatan_geriatri",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-masalah-keperawatan-neonatus",
    "slug": "master-masalah-keperawatan-neonatus",
    "judul": "Master Masalah Keperawatan Neonatus",
    "kategori": "M",
    "permissionKey": "master_masalah_keperawatan_neonatus",
    "javaRef": "MasterMasalahKeperawatanNeonatus",
    "tabel": "master_masalah_keperawatan_neonatus",
    "kolom": [
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_masalah",
        "label": "Nama Masalah",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_masalah",
      "nama_masalah"
    ],
    "kolomUrut": "kode_masalah",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-rencana-keperawatan-neonatus",
    "slug": "master-rencana-keperawatan-neonatus",
    "judul": "Master Rencana Keperawatan Neonatus",
    "kategori": "M",
    "permissionKey": "master_rencana_keperawatan_neonatus",
    "javaRef": "MasterRencanaKeperawatanNeonatus",
    "tabel": "master_rencana_keperawatan_neonatus",
    "kolom": [
      {
        "nama": "kode_rencana",
        "label": "Kode Rencana",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "kode_masalah",
        "label": "Kode Masalah",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "rencana_keperawatan",
        "label": "Rencana Keperawatan",
        "wajib": true,
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomCari": [
      "kode_rencana",
      "kode_masalah",
      "rencana_keperawatan"
    ],
    "kolomUrut": "kode_rencana",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-imunisasi",
    "slug": "master-imunisasi",
    "judul": "Master Imunisasi",
    "kategori": "M",
    "permissionKey": "master_imunisasi",
    "javaRef": "MasterImunisasi",
    "tabel": "master_imunisasi",
    "kolom": [
      {
        "nama": "kode_imunisasi",
        "label": "Kode Imunisasi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nama_imunisasi",
        "label": "Nama Imunisasi",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomCari": [
      "kode_imunisasi",
      "nama_imunisasi"
    ],
    "kolomUrut": "kode_imunisasi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ralan",
    "slug": "penilaian-awal-keperawatan-ralan",
    "judul": "Awal Keperawatan Ralan Umum",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ralan",
    "javaRef": "RMPenilaianAwalKeperawatanRalan",
    "tabel": "penilaian_awal_keperawatan_ralan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bmi",
        "label": "Bmi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "alat_bantu",
        "label": "Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_bantu",
        "label": "Ket Bantu",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "prothesa",
        "label": "Prothesa",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_pro",
        "label": "Ket Pro",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "adl",
        "label": "Adl",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "dibantu"
        ],
        "wajib": true
      },
      {
        "nama": "status_psiko",
        "label": "Status Psiko",
        "tipe": "enum",
        "opsi": [
          "tenang",
          "takut",
          "cemas",
          "depresi",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_psiko",
        "label": "Ket Psiko",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "hub_keluarga",
        "label": "Hub Keluarga",
        "tipe": "enum",
        "opsi": [
          "baik",
          "tidak baik"
        ],
        "wajib": true
      },
      {
        "nama": "tinggal_dengan",
        "label": "Tinggal Dengan",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "orang tua",
          "suami / istri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_tinggal",
        "label": "Ket Tinggal",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "ekonomi",
        "label": "Ekonomi",
        "tipe": "enum",
        "opsi": [
          "baik",
          "cukup",
          "kurang"
        ],
        "wajib": true
      },
      {
        "nama": "budaya",
        "label": "Budaya",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "ket_budaya",
        "label": "Ket Budaya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "enum",
        "opsi": [
          "pasien",
          "keluarga"
        ],
        "wajib": true
      },
      {
        "nama": "ket_edukasi",
        "label": "Ket Edukasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "berjalan_a",
        "label": "Berjalan A",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_b",
        "label": "Berjalan B",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_c",
        "label": "Berjalan C",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "enum",
        "opsi": [
          "tidak beresiko (tidak ditemukan a dan b)",
          "resiko rendah (ditemukan a/b)",
          "resiko tinggi (ditemukan a dan b)"
        ],
        "wajib": true
      },
      {
        "nama": "lapor",
        "label": "Lapor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor",
        "label": "Ket Lapor",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "tidak yakin",
          "ya, 1-5 kg",
          "ya, 6-10 kg",
          "ya, 11-15 kg",
          "ya, >15 kg"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "provokes",
        "label": "Provokes",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_provokes",
        "label": "Ket Provokes",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "quality",
        "label": "Quality",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_quality",
        "label": "Ket Quality",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "menyebar",
        "label": "Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pada_dokter",
        "label": "Pada Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dokter",
        "label": "Ket Dokter",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "td",
      "nadi",
      "rr",
      "suhu"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ranap",
    "slug": "penilaian-awal-keperawatan-ranap",
    "judul": "Awal Keperawatan Ranap Umum",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ranap",
    "javaRef": "RMPenilaianAwalKeperawatanRanap",
    "tabel": "penilaian_awal_keperawatan_ranap",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "ket_informasi",
        "label": "Ket Informasi",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tiba_diruang_rawat",
        "label": "Tiba Diruang Rawat",
        "tipe": "enum",
        "opsi": [
          "jalan tanpa bantuan",
          "kursi roda",
          "brankar"
        ],
        "wajib": true
      },
      {
        "nama": "kasus_trauma",
        "label": "Kasus Trauma",
        "tipe": "enum",
        "opsi": [
          "trauma",
          "non trauma"
        ]
      },
      {
        "nama": "cara_masuk",
        "label": "Cara Masuk",
        "tipe": "enum",
        "opsi": [
          "poli",
          "igd",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "riwayat_pembedahan",
        "label": "Riwayat Pembedahan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_dirawat_dirs",
        "label": "Riwayat Dirawat Dirs",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alat_bantu_dipakai",
        "label": "Alat Bantu Dipakai",
        "tipe": "enum",
        "opsi": [
          "kacamata",
          "prothesa",
          "alat bantu dengar",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_kehamilan",
        "label": "Riwayat Kehamilan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_kehamilan_perkiraan",
        "label": "Riwayat Kehamilan Perkiraan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "riwayat_tranfusi",
        "label": "Riwayat Tranfusi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_alergi",
        "label": "Riwayat Alergi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_merokok",
        "label": "Riwayat Merokok",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_merokok_jumlah",
        "label": "Riwayat Merokok Jumlah",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "riwayat_alkohol",
        "label": "Riwayat Alkohol",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_alkohol_jumlah",
        "label": "Riwayat Alkohol Jumlah",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "riwayat_narkoba",
        "label": "Riwayat Narkoba",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_olahraga",
        "label": "Riwayat Olahraga",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_mental",
        "label": "Pemeriksaan Mental",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_keadaan_umum",
        "label": "Pemeriksaan Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "buruk"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gcs",
        "label": "Pemeriksaan GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_td",
        "label": "Pemeriksaan TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_nadi",
        "label": "Pemeriksaan Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_rr",
        "label": "Pemeriksaan RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_suhu",
        "label": "Pemeriksaan Suhu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_spo2",
        "label": "Pemeriksaan SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_bb",
        "label": "Pemeriksaan BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_tb",
        "label": "Pemeriksaan TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_kepala",
        "label": "Pemeriksaan Susunan Kepala",
        "tipe": "enum",
        "opsi": [
          "tak",
          "hydrocephalus",
          "hematoma",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_kepala_keterangan",
        "label": "Pemeriksaan Susunan Kepala Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_wajah",
        "label": "Pemeriksaan Susunan Wajah",
        "tipe": "enum",
        "opsi": [
          "tak",
          "asimetris",
          "kelainan kongenital"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_wajah_keterangan",
        "label": "Pemeriksaan Susunan Wajah Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_leher",
        "label": "Pemeriksaan Susunan Leher",
        "tipe": "enum",
        "opsi": [
          "tak",
          "kaku kuduk",
          "pembesaran thyroid",
          "pembesaran kgb"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_kejang",
        "label": "Pemeriksaan Susunan Kejang",
        "tipe": "enum",
        "opsi": [
          "tak",
          "kuat",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_kejang_keterangan",
        "label": "Pemeriksaan Susunan Kejang Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_susunan_sensorik",
        "label": "Pemeriksaan Susunan Sensorik",
        "tipe": "enum",
        "opsi": [
          "tak",
          "sakit nyeri",
          "rasa kebas"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_kardiovaskuler_denyut_nadi",
        "label": "Pemeriksaan Kardiovaskuler Denyut Nadi",
        "tipe": "enum",
        "opsi": [
          "teratur",
          "tidak teratur"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_kardiovaskuler_sirkulasi",
        "label": "Pemeriksaan Kardiovaskuler Sirkulasi",
        "tipe": "enum",
        "opsi": [
          "akral hangat",
          "akral dingin",
          "edema"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_kardiovaskuler_sirkulasi_keterangan",
        "label": "Pemeriksaan Kardiovaskuler Sirkulasi Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_kardiovaskuler_pulsasi",
        "label": "Pemeriksaan Kardiovaskuler Pulsasi",
        "tipe": "enum",
        "opsi": [
          "kuat",
          "lemah",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_pola_nafas",
        "label": "Pemeriksaan Respirasi Pola Nafas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "bradipnea",
          "tachipnea"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_retraksi",
        "label": "Pemeriksaan Respirasi Retraksi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ringan",
          "berat"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_suara_nafas",
        "label": "Pemeriksaan Respirasi Suara Nafas",
        "tipe": "enum",
        "opsi": [
          "vesikuler",
          "wheezing",
          "rhonki"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_volume_pernafasan",
        "label": "Pemeriksaan Respirasi Volume Pernafasan",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hiperventilasi",
          "hipoventilasi"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_jenis_pernafasan",
        "label": "Pemeriksaan Respirasi Jenis Pernafasan",
        "tipe": "enum",
        "opsi": [
          "pernafasan dada",
          "alat bantu pernafasaan"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_jenis_pernafasan_keterangan",
        "label": "Pemeriksaan Respirasi Jenis Pernafasan Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_irama_nafas",
        "label": "Pemeriksaan Respirasi Irama Nafas",
        "tipe": "enum",
        "opsi": [
          "teratur",
          "tidak teratur"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_respirasi_batuk",
        "label": "Pemeriksaan Respirasi Batuk",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya : produktif",
          "ya : non produktif"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_mulut",
        "label": "Pemeriksaan Gastrointestinal Mulut",
        "tipe": "enum",
        "opsi": [
          "tak",
          "stomatitis",
          "mukosa kering",
          "bibir pucat",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_mulut_keterangan",
        "label": "Pemeriksaan Gastrointestinal Mulut Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_gigi",
        "label": "Pemeriksaan Gastrointestinal Gigi",
        "tipe": "enum",
        "opsi": [
          "tak",
          "karies",
          "goyang",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_gigi_keterangan",
        "label": "Pemeriksaan Gastrointestinal Gigi Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_lidah",
        "label": "Pemeriksaan Gastrointestinal Lidah",
        "tipe": "enum",
        "opsi": [
          "tak",
          "kotor",
          "gerak asimetris",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_lidah_keterangan",
        "label": "Pemeriksaan Gastrointestinal Lidah Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_tenggorokan",
        "label": "Pemeriksaan Gastrointestinal Tenggorokan",
        "tipe": "enum",
        "opsi": [
          "tak",
          "gangguan menelan",
          "sakit menelan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_tenggorokan_keterangan",
        "label": "Pemeriksaan Gastrointestinal Tenggorokan Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_abdomen",
        "label": "Pemeriksaan Gastrointestinal Abdomen",
        "tipe": "enum",
        "opsi": [
          "supel",
          "asictes",
          " tegang",
          "nyeri tekan/lepas",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_abdomen_keterangan",
        "label": "Pemeriksaan Gastrointestinal Abdomen Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_peistatik_usus",
        "label": "Pemeriksaan Gastrointestinal Peistatik Usus",
        "tipe": "enum",
        "opsi": [
          "tak",
          "tidak ada bising usus",
          "hiperistaltik"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_gastrointestinal_anus",
        "label": "Pemeriksaan Gastrointestinal Anus",
        "tipe": "enum",
        "opsi": [
          "tak",
          "atresia ani"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_pengelihatan",
        "label": "Pemeriksaan Neurologi Pengelihatan",
        "tipe": "enum",
        "opsi": [
          "tak",
          "ada kelainan"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_pengelihatan_keterangan",
        "label": "Pemeriksaan Neurologi Pengelihatan Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_alat_bantu_penglihatan",
        "label": "Pemeriksaan Neurologi Alat Bantu Penglihatan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "kacamata",
          "lensa kontak"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_pendengaran",
        "label": "Pemeriksaan Neurologi Pendengaran",
        "tipe": "enum",
        "opsi": [
          "tak",
          "berdengung",
          "nyeri",
          "tuli",
          "keluar cairan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_bicara",
        "label": "Pemeriksaan Neurologi Bicara",
        "tipe": "enum",
        "opsi": [
          "jelas",
          "tidak jelas"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_bicara_keterangan",
        "label": "Pemeriksaan Neurologi Bicara Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_sensorik",
        "label": "Pemeriksaan Neurologi Sensorik",
        "tipe": "enum",
        "opsi": [
          "tak",
          "sakit nyeri",
          "rasa kebas",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_motorik",
        "label": "Pemeriksaan Neurologi Motorik",
        "tipe": "enum",
        "opsi": [
          "tak",
          "hemiparese",
          "tetraparese",
          "tremor",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neurologi_kekuatan_otot",
        "label": "Pemeriksaan Neurologi Kekuatan Otot",
        "tipe": "enum",
        "opsi": [
          "kuat",
          "lemah"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_integument_warnakulit",
        "label": "Pemeriksaan Integument Warnakulit",
        "tipe": "enum",
        "opsi": [
          "pucat",
          "sianosis",
          "normal",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_integument_turgor",
        "label": "Pemeriksaan Integument Turgor",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "buruk"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_integument_kulit",
        "label": "Pemeriksaan Integument Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "rash/kemerahan",
          "luka",
          "memar",
          "ptekie",
          "bula"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_integument_dekubitas",
        "label": "Pemeriksaan Integument Dekubitas",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "usia > 65 tahun",
          "obesitas",
          "imobilisasi",
          "paraplegi/vegetative state",
          "dirawat di hcu",
          "penyakit kronis (dm, chf, ckd)",
          "inkontinentia uri/alvi"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_pergerakan_sendi",
        "label": "Pemeriksaan Muskuloskletal Pergerakan Sendi",
        "tipe": "enum",
        "opsi": [
          "bebas",
          "terbatas"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_kekauatan_otot",
        "label": "Pemeriksaan Muskuloskletal Kekauatan Otot",
        "tipe": "enum",
        "opsi": [
          "baik",
          "lemah",
          "tremor"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_nyeri_sendi",
        "label": "Pemeriksaan Muskuloskletal Nyeri Sendi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_nyeri_sendi_keterangan",
        "label": "Pemeriksaan Muskuloskletal Nyeri Sendi Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_oedema",
        "label": "Pemeriksaan Muskuloskletal Oedema",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_oedema_keterangan",
        "label": "Pemeriksaan Muskuloskletal Oedema Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_fraktur",
        "label": "Pemeriksaan Muskuloskletal Fraktur",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_muskuloskletal_fraktur_keterangan",
        "label": "Pemeriksaan Muskuloskletal Fraktur Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bab_frekuensi_jumlah",
        "label": "Pemeriksaan Eliminasi Bab Frekuensi Jumlah",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bab_frekuensi_durasi",
        "label": "Pemeriksaan Eliminasi Bab Frekuensi Durasi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bab_konsistensi",
        "label": "Pemeriksaan Eliminasi Bab Konsistensi",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bab_warna",
        "label": "Pemeriksaan Eliminasi Bab Warna",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bak_frekuensi_jumlah",
        "label": "Pemeriksaan Eliminasi Bak Frekuensi Jumlah",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bak_frekuensi_durasi",
        "label": "Pemeriksaan Eliminasi Bak Frekuensi Durasi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bak_warna",
        "label": "Pemeriksaan Eliminasi Bak Warna",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_eliminasi_bak_lainlain",
        "label": "Pemeriksaan Eliminasi Bak Lainlain",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pola_aktifitas_makanminum",
        "label": "Pola Aktifitas Makanminum",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan orang lain"
        ],
        "wajib": true
      },
      {
        "nama": "pola_aktifitas_mandi",
        "label": "Pola Aktifitas Mandi",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan orang lain"
        ],
        "wajib": true
      },
      {
        "nama": "pola_aktifitas_eliminasi",
        "label": "Pola Aktifitas Eliminasi",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan orang lain"
        ],
        "wajib": true
      },
      {
        "nama": "pola_aktifitas_berpakaian",
        "label": "Pola Aktifitas Berpakaian",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan orang lain"
        ],
        "wajib": true
      },
      {
        "nama": "pola_aktifitas_berpindah",
        "label": "Pola Aktifitas Berpindah",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan orang lain"
        ],
        "wajib": true
      },
      {
        "nama": "pola_nutrisi_frekuesi_makan",
        "label": "Pola Nutrisi Frekuesi Makan",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "pola_nutrisi_jenis_makanan",
        "label": "Pola Nutrisi Jenis Makanan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "pola_nutrisi_porsi_makan",
        "label": "Pola Nutrisi Porsi Makan",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "pola_tidur_lama_tidur",
        "label": "Pola Tidur Lama Tidur",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "pola_tidur_gangguan",
        "label": "Pola Tidur Gangguan",
        "tipe": "enum",
        "opsi": [
          "tidak ada gangguan",
          "insomnia"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_kemampuan_sehari",
        "label": "Pengkajian Fungsi Kemampuan Sehari",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan sebagian",
          "ketergantungan total"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_aktifitas",
        "label": "Pengkajian Fungsi Aktifitas",
        "tipe": "enum",
        "opsi": [
          "tirah baring",
          "duduk",
          "berjalan"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_berjalan",
        "label": "Pengkajian Fungsi Berjalan",
        "tipe": "enum",
        "opsi": [
          "tak",
          "penurunan kekuatan/rom",
          "paralisis",
          "sering jatuh",
          "deformitas",
          "hilang keseimbangan",
          "riwayat patah tulang",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_berjalan_keterangan",
        "label": "Pengkajian Fungsi Berjalan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_ambulasi",
        "label": "Pengkajian Fungsi Ambulasi",
        "tipe": "enum",
        "opsi": [
          "walker",
          "tongkat",
          "kursi roda",
          "tidak menggunakan"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_ekstrimitas_atas",
        "label": "Pengkajian Fungsi Ekstrimitas Atas",
        "tipe": "enum",
        "opsi": [
          "tak",
          "lemah",
          "oedema",
          "tidak simetris",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_ekstrimitas_atas_keterangan",
        "label": "Pengkajian Fungsi Ekstrimitas Atas Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_ekstrimitas_bawah",
        "label": "Pengkajian Fungsi Ekstrimitas Bawah",
        "tipe": "enum",
        "opsi": [
          "tak",
          "varises",
          "oedema",
          "tidak simetris",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_ekstrimitas_bawah_keterangan",
        "label": "Pengkajian Fungsi Ekstrimitas Bawah Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_menggenggam",
        "label": "Pengkajian Fungsi Menggenggam",
        "tipe": "enum",
        "opsi": [
          "tidak ada kesulitan",
          "terakhir",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_menggenggam_keterangan",
        "label": "Pengkajian Fungsi Menggenggam Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_koordinasi",
        "label": "Pengkajian Fungsi Koordinasi",
        "tipe": "enum",
        "opsi": [
          "tidak ada kesulitan",
          "ada masalah"
        ],
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_koordinasi_keterangan",
        "label": "Pengkajian Fungsi Koordinasi Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pengkajian_fungsi_kesimpulan",
        "label": "Pengkajian Fungsi Kesimpulan",
        "tipe": "enum",
        "opsi": [
          "ya (co dpjp)",
          "tidak (tidak perlu co dpjp)"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_kondisi_psiko",
        "label": "Riwayat Psiko Kondisi Psiko",
        "tipe": "enum",
        "opsi": [
          "tidak ada masalah",
          "marah",
          "takut",
          "depresi",
          "cepat lelah",
          "cemas",
          "gelisah",
          "sulit tidur",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_gangguan_jiwa",
        "label": "Riwayat Psiko Gangguan Jiwa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_perilaku",
        "label": "Riwayat Psiko Perilaku",
        "tipe": "enum",
        "opsi": [
          "tidak ada masalah",
          "perilaku kekerasan",
          "gangguan efek",
          "gangguan memori",
          "halusinasi",
          "kecenderungan percobaan bunuh diri",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_perilaku_keterangan",
        "label": "Riwayat Psiko Perilaku Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_hubungan_keluarga",
        "label": "Riwayat Psiko Hubungan Keluarga",
        "tipe": "enum",
        "opsi": [
          "harmonis",
          "kurang harmonis",
          "tidak harmonis",
          "konflik besar"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_tinggal",
        "label": "Riwayat Psiko Tinggal",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "orang tua",
          "suami/istri",
          "keluarga",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_tinggal_keterangan",
        "label": "Riwayat Psiko Tinggal Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_nilai_kepercayaan",
        "label": "Riwayat Psiko Nilai Kepercayaan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_nilai_kepercayaan_keterangan",
        "label": "Riwayat Psiko Nilai Kepercayaan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_pendidikan_pj",
        "label": "Riwayat Psiko Pendidikan Pj",
        "tipe": "enum",
        "opsi": [
          "-",
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
          "s3"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_edukasi_diberikan",
        "label": "Riwayat Psiko Edukasi Diberikan",
        "tipe": "enum",
        "opsi": [
          "pasien",
          "keluarga"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_psiko_edukasi_diberikan_keterangan",
        "label": "Riwayat Psiko Edukasi Diberikan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri",
        "label": "Penilaian Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_penyebab",
        "label": "Penilaian Nyeri Penyebab",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_ket_penyebab",
        "label": "Penilaian Nyeri Ket Penyebab",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_kualitas",
        "label": "Penilaian Nyeri Kualitas",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_ket_kualitas",
        "label": "Penilaian Nyeri Ket Kualitas",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_lokasi",
        "label": "Penilaian Nyeri Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_menyebar",
        "label": "Penilaian Nyeri Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_skala",
        "label": "Penilaian Nyeri Skala",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_waktu",
        "label": "Penilaian Nyeri Waktu",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_hilang",
        "label": "Penilaian Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_ket_hilang",
        "label": "Penilaian Nyeri Ket Hilang",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_diberitahukan_dokter",
        "label": "Penilaian Nyeri Diberitahukan Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_nyeri_jam_diberitahukan_dokter",
        "label": "Penilaian Nyeri Jam Diberitahukan Dokter",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "penilaian_jatuhmorse_skala1",
        "label": "Penilaian Jatuhmorse Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai1",
        "label": "Penilaian Jatuhmorse Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala2",
        "label": "Penilaian Jatuhmorse Skala2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai2",
        "label": "Penilaian Jatuhmorse Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala3",
        "label": "Penilaian Jatuhmorse Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak ada/kursi roda/perawat/tirah baring",
          "tongkat/alat penopang",
          "berpegangan pada perabot"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai3",
        "label": "Penilaian Jatuhmorse Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala4",
        "label": "Penilaian Jatuhmorse Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai4",
        "label": "Penilaian Jatuhmorse Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala5",
        "label": "Penilaian Jatuhmorse Skala5",
        "tipe": "enum",
        "opsi": [
          "normal/tirah baring/imobilisasi",
          "lemah",
          "terganggu"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai5",
        "label": "Penilaian Jatuhmorse Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala6",
        "label": "Penilaian Jatuhmorse Skala6",
        "tipe": "enum",
        "opsi": [
          "sadar akan kemampuan diri sendiri",
          "sering lupa akan keterbatasan yang dimiliki"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai6",
        "label": "Penilaian Jatuhmorse Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_totalnilai",
        "label": "Penilaian Jatuhmorse Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "penilaian_jatuhsydney_skala1",
        "label": "Penilaian Jatuhsydney Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai1",
        "label": "Penilaian Jatuhsydney Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala2",
        "label": "Penilaian Jatuhsydney Skala2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai2",
        "label": "Penilaian Jatuhsydney Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala3",
        "label": "Penilaian Jatuhsydney Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai3",
        "label": "Penilaian Jatuhsydney Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala4",
        "label": "Penilaian Jatuhsydney Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai4",
        "label": "Penilaian Jatuhsydney Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala5",
        "label": "Penilaian Jatuhsydney Skala5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai5",
        "label": "Penilaian Jatuhsydney Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala6",
        "label": "Penilaian Jatuhsydney Skala6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai6",
        "label": "Penilaian Jatuhsydney Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala7",
        "label": "Penilaian Jatuhsydney Skala7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai7",
        "label": "Penilaian Jatuhsydney Nilai7",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala8",
        "label": "Penilaian Jatuhsydney Skala8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai8",
        "label": "Penilaian Jatuhsydney Nilai8",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala9",
        "label": "Penilaian Jatuhsydney Skala9",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai9",
        "label": "Penilaian Jatuhsydney Nilai9",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala10",
        "label": "Penilaian Jatuhsydney Skala10",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai10",
        "label": "Penilaian Jatuhsydney Nilai10",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_skala11",
        "label": "Penilaian Jatuhsydney Skala11",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhsydney_nilai11",
        "label": "Penilaian Jatuhsydney Nilai11",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhsydney_totalnilai",
        "label": "Penilaian Jatuhsydney Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "skrining_gizi1",
        "label": "Skrining Gizi1",
        "tipe": "enum",
        "opsi": [
          "tidak ada penurunan berat badan",
          "tidak yakin/ tidak tahu/ terasa baju lebih longgar",
          "ya 1-5 kg",
          "ya 6-10 kg",
          "ya 11-15 kg",
          "ya > 15 kg"
        ]
      },
      {
        "nama": "nilai_gizi1",
        "label": "Nilai Gizi1",
        "tipe": "number"
      },
      {
        "nama": "skrining_gizi2",
        "label": "Skrining Gizi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_gizi2",
        "label": "Nilai Gizi2",
        "tipe": "number"
      },
      {
        "nama": "nilai_total_gizi",
        "label": "Nilai Total Gizi",
        "tipe": "uang"
      },
      {
        "nama": "skrining_gizi_diagnosa_khusus",
        "label": "Skrining Gizi Diagnosa Khusus",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "skrining_gizi_ket_diagnosa_khusus",
        "label": "Skrining Gizi Ket Diagnosa Khusus",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "skrining_gizi_diketahui_dietisen",
        "label": "Skrining Gizi Diketahui Dietisen",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "skrining_gizi_jam_diketahui_dietisen",
        "label": "Skrining Gizi Jam Diketahui Dietisen",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "nip1",
        "label": "Nip1",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "nip2",
        "label": "Nip2",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "informasi",
      "ket_informasi",
      "tiba_diruang_rawat",
      "kasus_trauma",
      "cara_masuk"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-igd",
    "slug": "penilaian-awal-keperawatan-igd",
    "judul": "Awal Keperawatan IGD",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_igd",
    "javaRef": "RMPenilaianAwalKeperawatanIGD",
    "tabel": "penilaian_awal_keperawatan_igd",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "status_kehamilan",
        "label": "Status Kehamilan",
        "tipe": "enum",
        "opsi": [
          "tidak hamil",
          "hamil"
        ],
        "wajib": true
      },
      {
        "nama": "gravida",
        "label": "Gravida",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "para",
        "label": "Para",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "abortus",
        "label": "Abortus",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "hpht",
        "label": "Hpht",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tekanan",
        "label": "Tekanan",
        "tipe": "enum",
        "opsi": [
          "tak",
          "sakit kepala",
          "muntah",
          "pusing",
          "bingung"
        ],
        "wajib": true
      },
      {
        "nama": "pupil",
        "label": "Pupil",
        "tipe": "enum",
        "opsi": [
          "normal",
          "miosis",
          "isokor",
          "anisokor"
        ],
        "wajib": true
      },
      {
        "nama": "neurosensorik",
        "label": "Neurosensorik",
        "tipe": "enum",
        "opsi": [
          "tak",
          "spasme otot",
          "perubahan sensorik",
          "perubahan motorik",
          "perubahan bentuk ekstremitas",
          "penurunan tingkat kesadaran",
          "fraktur/dislokasi",
          "luksasio",
          "kerusakan jaringan/luka"
        ],
        "wajib": true
      },
      {
        "nama": "integumen",
        "label": "Integumen",
        "tipe": "enum",
        "opsi": [
          "tak",
          "luka bakar",
          "luka robek",
          "lecet",
          "luka decubitus",
          "luka gangren"
        ],
        "wajib": true
      },
      {
        "nama": "turgor",
        "label": "Turgor",
        "tipe": "enum",
        "opsi": [
          "baik",
          "menurun"
        ],
        "wajib": true
      },
      {
        "nama": "edema",
        "label": "Edema",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ekstremitas",
          "seluruh tubuh",
          "asites",
          "palpebrae"
        ],
        "wajib": true
      },
      {
        "nama": "mukosa",
        "label": "Mukosa",
        "tipe": "enum",
        "opsi": [
          "lembab",
          "kering"
        ],
        "wajib": true
      },
      {
        "nama": "perdarahan",
        "label": "Perdarahan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "jumlah_perdarahan",
        "label": "Jumlah Perdarahan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "warna_perdarahan",
        "label": "Warna Perdarahan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "intoksikasi",
        "label": "Intoksikasi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "gigitan binatang",
          "zat kimia",
          "gas",
          "obat"
        ],
        "wajib": true
      },
      {
        "nama": "bab",
        "label": "Bab",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "xbab",
        "label": "Xbab",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kbab",
        "label": "Kbab",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "wbab",
        "label": "Wbab",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "bak",
        "label": "Bak",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "xbak",
        "label": "Xbak",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "wbak",
        "label": "Wbak",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "lbak",
        "label": "Lbak",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "psikologis",
        "label": "Psikologis",
        "tipe": "enum",
        "opsi": [
          "tidak ada masalah",
          "marah",
          "takut",
          "depresi",
          "cepat lelah",
          "cemas",
          "gelisah",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "jiwa",
        "label": "Jiwa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "perilaku",
        "label": "Perilaku",
        "tipe": "enum",
        "opsi": [
          "perilaku kekerasan",
          "gangguan efek",
          "gangguan memori",
          "halusinasi",
          "kecenderungan percobaan bunuh diri",
          "lainnya",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "dilaporkan",
        "label": "Dilaporkan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "sebutkan",
        "label": "Sebutkan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "enum",
        "opsi": [
          "harmonis",
          "kurang harmonis",
          "tidak harmonis",
          "konflik besar"
        ],
        "wajib": true
      },
      {
        "nama": "tinggal_dengan",
        "label": "Tinggal Dengan",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "orang tua",
          "suami / istri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_tinggal",
        "label": "Ket Tinggal",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "budaya",
        "label": "Budaya",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "ket_budaya",
        "label": "Ket Budaya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pendidikan_pj",
        "label": "Pendidikan Pj",
        "tipe": "enum",
        "opsi": [
          "-",
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
          "s3"
        ],
        "wajib": true
      },
      {
        "nama": "ket_pendidikan_pj",
        "label": "Ket Pendidikan Pj",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "enum",
        "opsi": [
          "pasien",
          "keluarga"
        ],
        "wajib": true
      },
      {
        "nama": "ket_edukasi",
        "label": "Ket Edukasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kemampuan",
        "label": "Kemampuan",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan sebagian",
          "ketergantungan total"
        ],
        "wajib": true
      },
      {
        "nama": "aktifitas",
        "label": "Aktifitas",
        "tipe": "enum",
        "opsi": [
          "tirah baring",
          "duduk",
          "berjalan"
        ],
        "wajib": true
      },
      {
        "nama": "alat_bantu",
        "label": "Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_bantu",
        "label": "Ket Bantu",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "provokes",
        "label": "Provokes",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_provokes",
        "label": "Ket Provokes",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "quality",
        "label": "Quality",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_quality",
        "label": "Ket Quality",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "menyebar",
        "label": "Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "pada_dokter",
        "label": "Pada Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dokter",
        "label": "Ket Dokter",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "berjalan_a",
        "label": "Berjalan A",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_b",
        "label": "Berjalan B",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_c",
        "label": "Berjalan C",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "enum",
        "opsi": [
          "tidak beresiko (tidak ditemukan a dan b)",
          "resiko rendah (ditemukan a/b)",
          "resiko tinggi (ditemukan a dan b)"
        ],
        "wajib": true
      },
      {
        "nama": "lapor",
        "label": "Lapor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor",
        "label": "Ket Lapor",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "keluhan_utama",
      "rpd",
      "rpo",
      "status_kehamilan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-gigi",
    "slug": "penilaian-awal-keperawatan-gigi",
    "judul": "Awal Keperawatan Gigi",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_gigi",
    "javaRef": "RMPenilaianAwalKeperawatanGigi",
    "tabel": "penilaian_awal_keperawatan_gigi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bmi",
        "label": "Bmi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "riwayat_penyakit",
        "label": "Riwayat Penyakit",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "diabetes melitus",
          "hipertensi",
          "penyakit jantung",
          "hiv",
          "hepatitis",
          "haemophilia",
          "lain-lain"
        ]
      },
      {
        "nama": "ket_riwayat_penyakit",
        "label": "Ket Riwayat Penyakit",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "riwayat_perawatan_gigi",
        "label": "Riwayat Perawatan Gigi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya, kapan"
        ],
        "wajib": true
      },
      {
        "nama": "ket_riwayat_perawatan_gigi",
        "label": "Ket Riwayat Perawatan Gigi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kebiasaan_sikat_gigi",
        "label": "Kebiasaan Sikat Gigi",
        "tipe": "enum",
        "opsi": [
          "1x",
          "2x",
          "3x",
          "mandi",
          "setelah makan",
          "sebelum tidur"
        ],
        "wajib": true
      },
      {
        "nama": "kebiasaan_lain",
        "label": "Kebiasaan Lain",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "minum kopi/teh",
          "minum alkohol",
          "bruxism",
          "menggigit pensil",
          "mengunyah 1 sisi rahang",
          "merokok",
          "lain-lain"
        ]
      },
      {
        "nama": "ket_kebiasaan_lain",
        "label": "Ket Kebiasaan Lain",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "obat_yang_diminum_saatini",
        "label": "Obat Yang Diminum Saatini",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "alat_bantu",
        "label": "Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_alat_bantu",
        "label": "Ket Alat Bantu",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "prothesa",
        "label": "Prothesa",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_pro",
        "label": "Ket Pro",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "status_psiko",
        "label": "Status Psiko",
        "tipe": "enum",
        "opsi": [
          "tenang",
          "takut",
          "cemas",
          "depresi",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_psiko",
        "label": "Ket Psiko",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "hub_keluarga",
        "label": "Hub Keluarga",
        "tipe": "enum",
        "opsi": [
          "baik",
          "tidak baik"
        ],
        "wajib": true
      },
      {
        "nama": "tinggal_dengan",
        "label": "Tinggal Dengan",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "orang tua",
          "suami / istri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_tinggal",
        "label": "Ket Tinggal",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "ekonomi",
        "label": "Ekonomi",
        "tipe": "enum",
        "opsi": [
          "baik",
          "cukup",
          "kurang"
        ],
        "wajib": true
      },
      {
        "nama": "budaya",
        "label": "Budaya",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "ket_budaya",
        "label": "Ket Budaya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "enum",
        "opsi": [
          "pasien",
          "keluarga"
        ],
        "wajib": true
      },
      {
        "nama": "ket_edukasi",
        "label": "Ket Edukasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "berjalan_a",
        "label": "Berjalan A",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_b",
        "label": "Berjalan B",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_c",
        "label": "Berjalan C",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "enum",
        "opsi": [
          "tidak beresiko (tidak ditemukan a dan b)",
          "resiko rendah (ditemukan a/b)",
          "resiko tinggi (ditemukan a dan b)"
        ],
        "wajib": true
      },
      {
        "nama": "lapor",
        "label": "Lapor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor",
        "label": "Ket Lapor",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "frekuensi",
        "label": "Frekuensi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat",
          "tidak ada nyeri",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pada_dokter",
        "label": "Pada Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dokter",
        "label": "Ket Dokter",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kebersihan_mulut",
        "label": "Kebersihan Mulut",
        "tipe": "enum",
        "opsi": [
          "baik",
          "cukup",
          "kurang"
        ],
        "wajib": true
      },
      {
        "nama": "mukosa_mulut",
        "label": "Mukosa Mulut",
        "tipe": "enum",
        "opsi": [
          "normal",
          "pigmentasi",
          "radang"
        ],
        "wajib": true
      },
      {
        "nama": "karies",
        "label": "Karies",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "karang_gigi",
        "label": "Karang Gigi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "gingiva",
        "label": "Gingiva",
        "tipe": "enum",
        "opsi": [
          "normal",
          "radang"
        ],
        "wajib": true
      },
      {
        "nama": "palatum",
        "label": "Palatum",
        "tipe": "enum",
        "opsi": [
          "normal",
          "radang"
        ],
        "wajib": true
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "td",
      "nadi",
      "rr",
      "suhu"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-kebidanan",
    "slug": "penilaian-awal-keperawatan-kebidanan",
    "judul": "Awal Keperawatan Ralan Kebidanan",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_kebidanan",
    "javaRef": "RMPenilaianAwalKeperawatanKebidanan",
    "tabel": "riwayat_persalinan_pasien",
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
        "nama": "tgl_thn",
        "label": "Tgl Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "tempat_persalinan",
        "label": "Tempat Persalinan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "usia_hamil",
        "label": "Usia Hamil",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jenis_persalinan",
        "label": "Jenis Persalinan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "penolong",
        "label": "Penolong",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyulit",
        "label": "Penyulit",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "L",
          "P",
          "-"
        ]
      },
      {
        "nama": "bbpb",
        "label": "Bbpb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "tgl_thn",
      "tempat_persalinan",
      "usia_hamil",
      "jenis_persalinan",
      "penolong"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-kebidanan-ranap",
    "slug": "penilaian-awal-keperawatan-kebidanan-ranap",
    "judul": "Awal Keperawatan Ranap Kebidanan",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ranapkebidanan",
    "javaRef": "RMPenilaianAwalKeperawatanKebidananRanap",
    "tabel": "riwayat_persalinan_pasien",
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
        "nama": "tgl_thn",
        "label": "Tgl Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "tempat_persalinan",
        "label": "Tempat Persalinan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "usia_hamil",
        "label": "Usia Hamil",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jenis_persalinan",
        "label": "Jenis Persalinan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "penolong",
        "label": "Penolong",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyulit",
        "label": "Penyulit",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "L",
          "P",
          "-"
        ]
      },
      {
        "nama": "bbpb",
        "label": "Bbpb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "tgl_thn",
      "tempat_persalinan",
      "usia_hamil",
      "jenis_persalinan",
      "penolong"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-ralan-bayi",
    "slug": "penilaian-awal-ralan-bayi",
    "judul": "Awal Keperawatan Ralan Bayi/Anak",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_anak",
    "javaRef": "RMPenilaianAwalKeperawatanBayiAnak",
    "tabel": "riwayat_imunisasi",
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
        "nama": "kode_imunisasi",
        "label": "Kode Imunisasi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "no_imunisasi",
        "label": "No Imunisasi",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_imunisasi",
      "no_rkm_medis",
      "kode_imunisasi"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ranap-bayi-anak",
    "slug": "penilaian-awal-keperawatan-ranap-bayi-anak",
    "judul": "Awal Keperawatan Ranap Bayi/Anak",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ranap_bayi",
    "javaRef": "RMPenilaianAwalKeperawatanRanapBayiAnak",
    "tabel": "riwayat_imunisasi",
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
        "nama": "kode_imunisasi",
        "label": "Kode Imunisasi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "no_imunisasi",
        "label": "No Imunisasi",
        "pk": true,
        "wajib": true,
        "tipe": "number"
      }
    ],
    "kolomCari": [
      "no_imunisasi",
      "no_rkm_medis",
      "kode_imunisasi"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ralan-psikiatri",
    "slug": "penilaian-awal-keperawatan-ralan-psikiatri",
    "judul": "Awal Keperawatan Ralan Psikiatri",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_psikiatri",
    "javaRef": "RMPenilaianAwalKeperawatanRalanPsikiatri",
    "tabel": "penilaian_awal_keperawatan_ralan_psikiatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rkd_sakit_sejak",
        "label": "Rkd Sakit Sejak",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "rkd_keluhan",
        "label": "Rkd Keluhan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rkd_berobat",
        "label": "Rkd Berobat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya, alternatif",
          "ya, rs",
          "ya, puskesmas"
        ],
        "wajib": true
      },
      {
        "nama": "rkd_hasil_pengobatan",
        "label": "Rkd Hasil Pengobatan",
        "tipe": "enum",
        "opsi": [
          "berhasil",
          "tidak berhasil"
        ],
        "wajib": true
      },
      {
        "nama": "fp_putus_obat",
        "label": "Fp Putus Obat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_putus_obat",
        "label": "Ket Putus Obat",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "fp_ekonomi",
        "label": "Fp Ekonomi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_masalah_ekonomi",
        "label": "Ket Masalah Ekonomi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "fp_masalah_fisik",
        "label": "Fp Masalah Fisik",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_masalah_fisik",
        "label": "Ket Masalah Fisik",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "fp_masalah_psikososial",
        "label": "Fp Masalah Psikososial",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_masalah_psikososial",
        "label": "Ket Masalah Psikososial",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "rh_keluarga",
        "label": "Rh Keluarga",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rh_keluarga",
        "label": "Ket Rh Keluarga",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "resiko_bunuh_diri",
        "label": "Resiko Bunuh Diri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "rbd_ide",
        "label": "Rbd Ide",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rbd_ide",
        "label": "Ket Rbd Ide",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "rbd_rencana",
        "label": "Rbd Rencana",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rbd_rencana",
        "label": "Ket Rbd Rencana",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "rbd_alat",
        "label": "Rbd Alat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rbd_alat",
        "label": "Ket Rbd Alat",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "rbd_percobaan",
        "label": "Rbd Percobaan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rbd_percobaan",
        "label": "Ket Rbd Percobaan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "rbd_keinginan",
        "label": "Rbd Keinginan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rbd_keinginan",
        "label": "Ket Rbd Keinginan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpo_penggunaan",
        "label": "Rpo Penggunaan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rpo_penggunaan",
        "label": "Ket Rpo Penggunaan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "rpo_efek_samping",
        "label": "Rpo Efek Samping",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rpo_efek_samping",
        "label": "Ket Rpo Efek Samping",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "rpo_napza",
        "label": "Rpo Napza",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_rpo_napza",
        "label": "Ket Rpo Napza",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "ket_lama_pemakaian",
        "label": "Ket Lama Pemakaian",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "ket_cara_pemakaian",
        "label": "Ket Cara Pemakaian",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "ket_latar_belakang_pemakaian",
        "label": "Ket Latar Belakang Pemakaian",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "rpo_penggunaan_obat_lainnya",
        "label": "Rpo Penggunaan Obat Lainnya",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_penggunaan_obat_lainnya",
        "label": "Ket Penggunaan Obat Lainnya",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "ket_alasan_penggunaan",
        "label": "Ket Alasan Penggunaan",
        "tipe": "text",
        "maks": 65,
        "wajib": true
      },
      {
        "nama": "rpo_alergi_obat",
        "label": "Rpo Alergi Obat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_alergi_obat",
        "label": "Ket Alergi Obat",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "rpo_merokok",
        "label": "Rpo Merokok",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_merokok",
        "label": "Ket Merokok",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "rpo_minum_kopi",
        "label": "Rpo Minum Kopi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_minum_kopi",
        "label": "Ket Minum Kopi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "pf_keluhan_fisik",
        "label": "Pf Keluhan Fisik",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_keluhan_fisik",
        "label": "Ket Keluhan Fisik",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "provokes",
        "label": "Provokes",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_provokes",
        "label": "Ket Provokes",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "quality",
        "label": "Quality",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_quality",
        "label": "Ket Quality",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "menyebar",
        "label": "Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "pada_dokter",
        "label": "Pada Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dokter",
        "label": "Ket Dokter",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bmi",
        "label": "Bmi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "lapor_status_nutrisi",
        "label": "Lapor Status Nutrisi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor_status_nutrisi",
        "label": "Ket Lapor Status Nutrisi",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "tidak yakin",
          "ya, 1-5 kg",
          "ya, 6-10 kg",
          "ya, 11-15 kg",
          "ya, >15 kg"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
      },
      {
        "nama": "resikojatuh",
        "label": "Resikojatuh",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "bjm",
        "label": "Bjm",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "msa",
        "label": "Msa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "enum",
        "opsi": [
          "tidak beresiko (tidak ditemukan a dan b)",
          "resiko rendah (ditemukan a/b)",
          "resiko tinggi (ditemukan a dan b)"
        ],
        "wajib": true
      },
      {
        "nama": "lapor",
        "label": "Lapor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor",
        "label": "Ket Lapor",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "adl_mandi",
        "label": "Adl Mandi",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan total"
        ],
        "wajib": true
      },
      {
        "nama": "adl_berpakaian",
        "label": "Adl Berpakaian",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan total"
        ],
        "wajib": true
      },
      {
        "nama": "adl_makan",
        "label": "Adl Makan",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan total"
        ],
        "wajib": true
      },
      {
        "nama": "adl_bak",
        "label": "Adl Bak",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan total"
        ],
        "wajib": true
      },
      {
        "nama": "adl_bab",
        "label": "Adl Bab",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "bantuan minimal",
          "bantuan total"
        ],
        "wajib": true
      },
      {
        "nama": "adl_hobi",
        "label": "Adl Hobi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_adl_hobi",
        "label": "Ket Adl Hobi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "adl_sosialisasi",
        "label": "Adl Sosialisasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_adl_sosialisasi",
        "label": "Ket Adl Sosialisasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "adl_kegiatan",
        "label": "Adl Kegiatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_adl_kegiatan",
        "label": "Ket Adl Kegiatan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "sk_penampilan",
        "label": "Sk Penampilan",
        "tipe": "enum",
        "opsi": [
          "bersih",
          "rapi",
          "tidak rapi",
          "kotor",
          "tidak seperti biasanya",
          "pakaian tidak sesuai"
        ],
        "wajib": true
      },
      {
        "nama": "sk_alam_perasaan",
        "label": "Sk Alam Perasaan",
        "tipe": "enum",
        "opsi": [
          "sesuai",
          "marah",
          "putus asa",
          "tertekan",
          "sedih",
          "labil",
          "malu",
          "khawatir",
          "gembira berlebihan",
          "merasa tidak mampu",
          "ketakutan",
          "tidak berguna"
        ],
        "wajib": true
      },
      {
        "nama": "sk_pembicaraan",
        "label": "Sk Pembicaraan",
        "tipe": "enum",
        "opsi": [
          "sesuai",
          "cepat",
          "lambat",
          "membisu",
          "mendominasi",
          "mengancam",
          "inkoheren",
          "apatis",
          "keras",
          "gagap",
          "tidak mampu memulai pembicaraan"
        ],
        "wajib": true
      },
      {
        "nama": "sk_afek",
        "label": "Sk Afek",
        "tipe": "enum",
        "opsi": [
          "sesuai",
          "datar",
          "tumpul",
          "labil",
          "tidak sesuai"
        ],
        "wajib": true
      },
      {
        "nama": "sk_aktifitas_motorik",
        "label": "Sk Aktifitas Motorik",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tegang",
          "gelisah",
          "lesuh",
          "grimasem",
          "tik",
          "tremor",
          "agitasi",
          "konfulsif",
          "melamun",
          "sulit diarahkan"
        ],
        "wajib": true
      },
      {
        "nama": "sk_gangguan_ringan",
        "label": "Sk Gangguan Ringan",
        "tipe": "enum",
        "opsi": [
          "gangguan ringan",
          "gangguan bermakna"
        ],
        "wajib": true
      },
      {
        "nama": "sk_proses_pikir",
        "label": "Sk Proses Pikir",
        "tipe": "enum",
        "opsi": [
          "sesuai",
          "sirkumsial",
          "kehilangan asosiasi",
          "flight of ideas",
          "bloking",
          "pengulangan pembicaraan",
          "tangensial"
        ],
        "wajib": true
      },
      {
        "nama": "sk_orientasi",
        "label": "Sk Orientasi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "sk_tingkat_kesadaran_orientasi",
        "label": "Sk Tingkat Kesadaran Orientasi",
        "tipe": "enum",
        "opsi": [
          "-",
          "bingung",
          "sedasi",
          "waktu",
          "stupor",
          "tempat",
          "orang"
        ],
        "wajib": true
      },
      {
        "nama": "sk_memori",
        "label": "Sk Memori",
        "tipe": "enum",
        "opsi": [
          "ganguan daya ingat jangka pendek",
          "ganguan daya ingat jangka panjang",
          "ganguan daya ingat saat ini",
          "konfabulasi"
        ],
        "wajib": true
      },
      {
        "nama": "sk_interaksi",
        "label": "Sk Interaksi",
        "tipe": "enum",
        "opsi": [
          "kooperatif",
          "tidak kooperatif",
          "bermusuhan",
          "mudah tersinggung",
          "curiga",
          "defensif",
          "kontak mata kurang"
        ],
        "wajib": true
      },
      {
        "nama": "sk_konsentrasi",
        "label": "Sk Konsentrasi",
        "tipe": "enum",
        "opsi": [
          "konsentrasi baik",
          "mudah beralih",
          "tidak mampu berkonsentrasi",
          "tidak mampu berhitung sederhana"
        ],
        "wajib": true
      },
      {
        "nama": "sk_persepsi",
        "label": "Sk Persepsi",
        "tipe": "enum",
        "opsi": [
          "halusinasi",
          "pendengaran",
          "penghidung",
          "penglihatan",
          "pengecapan",
          "perabaan"
        ],
        "wajib": true
      },
      {
        "nama": "ket_sk_persepsi",
        "label": "Ket Sk Persepsi",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "sk_isi_pikir",
        "label": "Sk Isi Pikir",
        "tipe": "enum",
        "opsi": [
          "sesuai",
          "obsesi",
          "fobia",
          "hipokondria",
          "depersonalisasi",
          "pikiran magis",
          "ide yang terkait",
          "waham"
        ],
        "wajib": true
      },
      {
        "nama": "sk_waham",
        "label": "Sk Waham",
        "tipe": "enum",
        "opsi": [
          "kebesaran",
          "curiga",
          "agama",
          "nihilistik"
        ],
        "wajib": true
      },
      {
        "nama": "ket_sk_waham",
        "label": "Ket Sk Waham",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "sk_daya_tilik_diri",
        "label": "Sk Daya Tilik Diri",
        "tipe": "enum",
        "opsi": [
          "mengingkari penyakit yang diderita",
          "menyalahkan hal-hal diluar dirinya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_sk_daya_tilik_diri",
        "label": "Ket Sk Daya Tilik Diri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kk_pembelajaran",
        "label": "Kk Pembelajaran",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_kk_pembelajaran",
        "label": "Ket Kk Pembelajaran",
        "tipe": "enum",
        "opsi": [
          "-",
          "pendengaran",
          "penglihatan",
          "kognitif",
          "fisik",
          "budaya",
          "emosi",
          "bahasa",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_kk_pembelajaran_lainnya",
        "label": "Ket Kk Pembelajaran Lainnya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kk_Penerjamah",
        "label": "Kk Penerjamah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_kk_penerjamah_Lainnya",
        "label": "Ket Kk Penerjamah Lainnya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kk_bahasa_isyarat",
        "label": "Kk Bahasa Isyarat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "kk_kebutuhan_edukasi",
        "label": "Kk Kebutuhan Edukasi",
        "tipe": "enum",
        "opsi": [
          "diagnosa dan manajemen penyakit",
          "obat-obatan/terapi",
          "diet dan nutrisi",
          "tindakan keperawatan",
          "rehabilitasi",
          "manajemen nyeri",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_kk_kebutuhan_edukasi",
        "label": "Ket Kk Kebutuhan Edukasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "keluhan_utama",
      "rkd_sakit_sejak",
      "rkd_keluhan",
      "rkd_berobat"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ralan-geriatri",
    "slug": "penilaian-awal-keperawatan-ralan-geriatri",
    "judul": "Awal Keperawatan Ralan Geriatri",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ralan_geriatri",
    "javaRef": "RMPenilaianAwalKeperawatanRalanGeriatri",
    "tabel": "penilaian_awal_keperawatan_ralan_geriatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bmi",
        "label": "Bmi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "alat_bantu",
        "label": "Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_bantu",
        "label": "Ket Bantu",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "prothesa",
        "label": "Prothesa",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_pro",
        "label": "Ket Pro",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "adl",
        "label": "Adl",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "dibantu"
        ],
        "wajib": true
      },
      {
        "nama": "status_psiko",
        "label": "Status Psiko",
        "tipe": "enum",
        "opsi": [
          "tenang",
          "takut",
          "cemas",
          "depresi",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_psiko",
        "label": "Ket Psiko",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "hub_keluarga",
        "label": "Hub Keluarga",
        "tipe": "enum",
        "opsi": [
          "baik",
          "tidak baik"
        ],
        "wajib": true
      },
      {
        "nama": "tinggal_dengan",
        "label": "Tinggal Dengan",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "orang tua",
          "suami / istri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_tinggal",
        "label": "Ket Tinggal",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "ekonomi",
        "label": "Ekonomi",
        "tipe": "enum",
        "opsi": [
          "baik",
          "cukup",
          "kurang"
        ],
        "wajib": true
      },
      {
        "nama": "budaya",
        "label": "Budaya",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "ket_budaya",
        "label": "Ket Budaya",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "enum",
        "opsi": [
          "pasien",
          "keluarga"
        ],
        "wajib": true
      },
      {
        "nama": "ket_edukasi",
        "label": "Ket Edukasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "berjalan_a",
        "label": "Berjalan A",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_b",
        "label": "Berjalan B",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "berjalan_c",
        "label": "Berjalan C",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "enum",
        "opsi": [
          "tidak beresiko (tidak ditemukan a dan b)",
          "resiko rendah (ditemukan a/b)",
          "resiko tinggi (ditemukan a dan b)"
        ],
        "wajib": true
      },
      {
        "nama": "lapor",
        "label": "Lapor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "ket_lapor",
        "label": "Ket Lapor",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "sg1",
        "label": "Sg1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "tidak yakin",
          "ya, 1-5 kg",
          "ya, 6-10 kg",
          "ya, 11-15 kg",
          "ya, >15 kg"
        ],
        "wajib": true
      },
      {
        "nama": "nilai1",
        "label": "Nilai1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "wajib": true
      },
      {
        "nama": "sg2",
        "label": "Sg2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nilai2",
        "label": "Nilai2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "total_hasil",
        "label": "Total Hasil",
        "tipe": "uang"
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "provokes",
        "label": "Provokes",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_provokes",
        "label": "Ket Provokes",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "quality",
        "label": "Quality",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "ket_quality",
        "label": "Ket Quality",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "menyebar",
        "label": "Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pada_dokter",
        "label": "Pada Dokter",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_dokter",
        "label": "Ket Dokter",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "edukasi_kemampuan_bacatulis",
        "label": "Edukasi Kemampuan Bacatulis",
        "tipe": "enum",
        "opsi": [
          "baik",
          "kurang",
          "tidak bisa"
        ]
      },
      {
        "nama": "edukasi_kebutuhan_penerjemah",
        "label": "Edukasi Kebutuhan Penerjemah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "edukasi_keterangan_kebutuhan_penerjemah",
        "label": "Edukasi Keterangan Kebutuhan Penerjemah",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "edukasi_hambatan",
        "label": "Edukasi Hambatan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi_hambatan_kategori",
        "label": "Edukasi Hambatan Kategori",
        "tipe": "enum",
        "opsi": [
          "-",
          "pendengaran",
          "penglihatan",
          "kognitif",
          "fisik",
          "budaya",
          "emosi",
          "bahasa",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "edukasi_keterangan_hambatan",
        "label": "Edukasi Keterangan Hambatan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "edukasi_cara_bicara",
        "label": "Edukasi Cara Bicara",
        "tipe": "enum",
        "opsi": [
          "normal",
          "gangguan bicara"
        ]
      },
      {
        "nama": "edukasi_bahasa_isyarat",
        "label": "Edukasi Bahasa Isyarat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi_menerima_informasi",
        "label": "Edukasi Menerima Informasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "edukasi_keterangan_menerima_informasi",
        "label": "Edukasi Keterangan Menerima Informasi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "edukasi_metode_belajar",
        "label": "Edukasi Metode Belajar",
        "tipe": "enum",
        "opsi": [
          "audio",
          "lisan",
          "visual",
          "demonstrasi",
          "tulisan"
        ]
      },
      {
        "nama": "fraily_phenotype_berat_badan",
        "label": "Fraily Phenotype Berat Badan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "fraily_phenotype_berat_badan_nilai",
        "label": "Fraily Phenotype Berat Badan Nilai",
        "tipe": "number"
      },
      {
        "nama": "fraily_phenotype_aktifitas_fisik",
        "label": "Fraily Phenotype Aktifitas Fisik",
        "tipe": "enum",
        "opsi": [
          "tidak terbatas/sedikit terbatas",
          "sangat terbatas"
        ]
      },
      {
        "nama": "fraily_phenotype_aktifitas_fisik_nilai",
        "label": "Fraily Phenotype Aktifitas Fisik Nilai",
        "tipe": "number"
      },
      {
        "nama": "fraily_phenotype_kelelahan",
        "label": "Fraily Phenotype Kelelahan",
        "tipe": "enum",
        "opsi": [
          "0 - 2 hari",
          "3 - 7 hari"
        ]
      },
      {
        "nama": "fraily_phenotype_kelelahan_nilai",
        "label": "Fraily Phenotype Kelelahan Nilai",
        "tipe": "number"
      },
      {
        "nama": "fraily_phenotype_kekuatan",
        "label": "Fraily Phenotype Kekuatan",
        "tipe": "enum",
        "opsi": [
          "melemah < 20 %",
          "melemah > 20 %"
        ]
      },
      {
        "nama": "fraily_phenotype_kekuatan_nilai",
        "label": "Fraily Phenotype Kekuatan Nilai",
        "tipe": "number"
      },
      {
        "nama": "fraily_phenotype_waktu_berjalan",
        "label": "Fraily Phenotype Waktu Berjalan",
        "tipe": "enum",
        "opsi": [
          "tidak melambat",
          "melambat"
        ]
      },
      {
        "nama": "fraily_phenotype_waktu_berjalan_nilai",
        "label": "Fraily Phenotype Waktu Berjalan Nilai",
        "tipe": "number"
      },
      {
        "nama": "fraily_phenotype_nilai_total",
        "label": "Fraily Phenotype Nilai Total",
        "tipe": "uang"
      },
      {
        "nama": "fraily_phenotype_status",
        "label": "Fraily Phenotype Status",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sedikit lemah",
          "lemah",
          "sangat lemah"
        ]
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "td",
      "nadi",
      "rr",
      "suhu"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-keperawatan-ranap-neonatus",
    "slug": "penilaian-awal-keperawatan-ranap-neonatus",
    "judul": "Awal Keperawatan Ranap Neonatus",
    "kategori": "M",
    "permissionKey": "penilaian_awal_keperawatan_ranap_neonatus",
    "javaRef": "RMPenilaianAwalKeperawatanRanapNeonatus",
    "tabel": "penilaian_awal_keperawatan_ranap_neonatus",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "asal_pasien",
        "label": "Asal Pasien",
        "tipe": "enum",
        "opsi": [
          "igd",
          "poliklinik",
          "kamar bersalin",
          "kamar operasi"
        ]
      },
      {
        "nama": "cara_masuk",
        "label": "Cara Masuk",
        "tipe": "enum",
        "opsi": [
          "baby box",
          "inkubator",
          "kursi roda"
        ]
      },
      {
        "nama": "diperoleh_dari",
        "label": "Diperoleh Dari",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "hubungan_dengan_pasien",
        "label": "Hubungan Dengan Pasien",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "prenatal_g",
        "label": "Prenatal G",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "prenatal_p",
        "label": "Prenatal P",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "prenatal_a",
        "label": "Prenatal A",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "prenatal_uk",
        "label": "Prenatal Uk",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "prenatal_riwayat_penyakit_ibu",
        "label": "Prenatal Riwayat Penyakit Ibu",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "dm",
          "hipertensi",
          "jantung",
          "tbc",
          "hep b",
          "asma",
          "pms",
          "lainnya"
        ]
      },
      {
        "nama": "prenatal_riwayat_penyakit_ibu_keterangan",
        "label": "Prenatal Riwayat Penyakit Ibu Keterangan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "prenatal_riwayat_pengobatan_ibu_selama_hamil",
        "label": "Prenatal Riwayat Pengobatan Ibu Selama Hamil",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "prenatal_pernah_dirawat",
        "label": "Prenatal Pernah Dirawat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "prenatal_pernah_dirawat_keterangan",
        "label": "Prenatal Pernah Dirawat Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "prenatal_status_gizi_ibu",
        "label": "Prenatal Status Gizi Ibu",
        "tipe": "enum",
        "opsi": [
          "baik",
          "buruk"
        ]
      },
      {
        "nama": "intranatal_g",
        "label": "Intranatal G",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "intranatal_p",
        "label": "Intranatal P",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "intranatal_a",
        "label": "Intranatal A",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "intranatal_kondisi_lahir",
        "label": "Intranatal Kondisi Lahir",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "intranatal_cara_persalinan",
        "label": "Intranatal Cara Persalinan",
        "tipe": "enum",
        "opsi": [
          "spontan",
          "vacum ekstraksi",
          "forcep ekstraksi",
          "sectio caesarea",
          "lainnya"
        ]
      },
      {
        "nama": "intranatal_cara_persalinan_keterangan",
        "label": "Intranatal Cara Persalinan Keterangan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "intranatal_apgar",
        "label": "Intranatal Apgar",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "intranatal_letak",
        "label": "Intranatal Letak",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "intranatal_tali_pusat",
        "label": "Intranatal Tali Pusat",
        "tipe": "enum",
        "opsi": [
          "segar",
          "layu",
          "simpul"
        ]
      },
      {
        "nama": "intranatal_ketuban",
        "label": "Intranatal Ketuban",
        "tipe": "enum",
        "opsi": [
          "jernih",
          "darah",
          "putih keruh",
          "hijau",
          "meconium"
        ],
        "wajib": true
      },
      {
        "nama": "intranatal_bb",
        "label": "Intranatal BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "intranatal_pb",
        "label": "Intranatal Pb",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "intranatal_lk",
        "label": "Intranatal Lk",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "intranatal_ld",
        "label": "Intranatal Ld",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "intranatal_lp",
        "label": "Intranatal Lp",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "risiko_infeksi_mayor",
        "label": "Risiko Infeksi Mayor",
        "tipe": "enum",
        "opsi": [
          "-",
          "ibu demam >= 38° c",
          "kpd > 24 jam",
          "ketuban hijau",
          "korioamniotis",
          "fetal distress"
        ],
        "wajib": true
      },
      {
        "nama": "risiko_infeksi_mayor_keterangan",
        "label": "Risiko Infeksi Mayor Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "risiko_infeksi_minor",
        "label": "Risiko Infeksi Minor",
        "tipe": "enum",
        "opsi": [
          "-",
          "kpd > 12 jam",
          "asfiksia",
          "bblr",
          "isk",
          "uk < 37 minggu",
          "gemeli",
          "keputihan",
          "ibu temperatur > 37° c"
        ],
        "wajib": true
      },
      {
        "nama": "risiko_infeksi_minor_keterangan",
        "label": "Risiko Infeksi Minor Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_nutrisi",
        "label": "Kebutuhan Biologis Nutrisi",
        "tipe": "enum",
        "opsi": [
          "air susu ibu",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_nutrisi_keterangan",
        "label": "Kebutuhan Biologis Nutrisi Keterangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_nutrisi_frekuensi",
        "label": "Kebutuhan Biologis Nutrisi Frekuensi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_nutrisi_kali",
        "label": "Kebutuhan Biologis Nutrisi Kali",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_bak",
        "label": "Kebutuhan Biologis Bak",
        "tipe": "enum",
        "opsi": [
          "ada keluhan",
          "tidak ada keluhan"
        ],
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_bak_keterangan",
        "label": "Kebutuhan Biologis Bak Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_bab",
        "label": "Kebutuhan Biologis Bab",
        "tipe": "enum",
        "opsi": [
          "ada keluhan",
          "tidak ada keluhan"
        ],
        "wajib": true
      },
      {
        "nama": "kebutuhan_biologis_bab_keterangan",
        "label": "Kebutuhan Biologis Bab Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "alergi_obat",
        "label": "Alergi Obat",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "tidak diketahui",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "alergi_obat_keterangan",
        "label": "Alergi Obat Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alergi_obat_reaksi",
        "label": "Alergi Obat Reaksi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alergi_makanan",
        "label": "Alergi Makanan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "tidak diketahui",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "alergi_makanan_keterangan",
        "label": "Alergi Makanan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alergi_makanan_reaksi",
        "label": "Alergi Makanan Reaksi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alergi_lainnya",
        "label": "Alergi Lainnya",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "tidak diketahui",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "alergi_lainnya_keterangan",
        "label": "Alergi Lainnya Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "alergi_lainnya_reaksi",
        "label": "Alergi Lainnya Reaksi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "riwayat_penyakit_keluarga",
        "label": "Riwayat Penyakit Keluarga",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "diabetes",
          "kanker",
          "asma",
          "hipertensi",
          "jantung",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_penyakit_keluarga_keterangan",
        "label": "Riwayat Penyakit Keluarga Keterangan",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "riwayat_imunisasi",
        "label": "Riwayat Imunisasi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_imunisasi_keterangan",
        "label": "Riwayat Imunisasi Keterangan",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "riwayat_tranfusi_darah",
        "label": "Riwayat Tranfusi Darah",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_tranfusi_darah_keterangan",
        "label": "Riwayat Tranfusi Darah Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "riwayat_tranfusi_darah_reaksi",
        "label": "Riwayat Tranfusi Darah Reaksi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_tranfusi_darah_reaksi_keterangan",
        "label": "Riwayat Tranfusi Darah Reaksi Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_obat_diminum",
        "label": "Kebiasan Ibu Obat Diminum",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "vitamin",
          "jamu-jamuan",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_obat_diminum_keterangan",
        "label": "Kebiasan Ibu Obat Diminum Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_narkoba",
        "label": "Kebiasan Ibu Narkoba",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_narkoba_keterangan",
        "label": "Kebiasan Ibu Narkoba Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_merokok",
        "label": "Kebiasan Ibu Merokok",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_merokok_keterangan",
        "label": "Kebiasan Ibu Merokok Keterangan",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_alkohol",
        "label": "Kebiasan Ibu Alkohol",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "kebiasan_ibu_alkohol_keterangan",
        "label": "Kebiasan Ibu Alkohol Keterangan",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "soporcoma",
          "coma"
        ],
        "wajib": true
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "tampak tidak sakit",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
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
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "down_score",
        "label": "Down Score",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "lk",
        "label": "Lk",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "ld",
        "label": "Ld",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "lp",
        "label": "Lp",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "gd_bayi",
        "label": "Gd Bayi",
        "tipe": "enum",
        "opsi": [
          "a +",
          "a -",
          "b +",
          "b -",
          "ab +",
          "ab -",
          "o +",
          "o -",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "gd_ibu",
        "label": "Gd Ibu",
        "tipe": "enum",
        "opsi": [
          "a +",
          "a -",
          "b +",
          "b -",
          "ab +",
          "ab -",
          "o +",
          "o -",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "gd_ayah",
        "label": "Gd Ayah",
        "tipe": "enum",
        "opsi": [
          "a +",
          "a -",
          "b +",
          "b -",
          "ab +",
          "ab -",
          "o +",
          "o -",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_gerak_bayi",
        "label": "Saraf Pusat Gerak Bayi",
        "tipe": "enum",
        "opsi": [
          "aktif",
          "tidak aktif"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_kepala",
        "label": "Saraf Pusat Kepala",
        "tipe": "enum",
        "opsi": [
          "tak",
          "hydrocephalus",
          "hematoma",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_kepala_keterangan",
        "label": "Saraf Pusat Kepala Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "saraf_pusat_ubunubun",
        "label": "Saraf Pusat Ubunubun",
        "tipe": "enum",
        "opsi": [
          "datar",
          "cekung",
          "menonjol",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_ubunubun_keterangan",
        "label": "Saraf Pusat Ubunubun Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "saraf_pusat_wajah",
        "label": "Saraf Pusat Wajah",
        "tipe": "enum",
        "opsi": [
          "tak",
          "asimetris",
          "kelainan kongenital",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_wajah_keterangan",
        "label": "Saraf Pusat Wajah Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "saraf_pusat_kejang",
        "label": "Saraf Pusat Kejang",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_kejang_keterangan",
        "label": "Saraf Pusat Kejang Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "saraf_pusat_refleks",
        "label": "Saraf Pusat Refleks",
        "tipe": "enum",
        "opsi": [
          "moro",
          "menelan",
          "hisap",
          "babinski",
          "rooting",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_refleks_keterangan",
        "label": "Saraf Pusat Refleks Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "saraf_pusat_tangisbayi",
        "label": "Saraf Pusat Tangisbayi",
        "tipe": "enum",
        "opsi": [
          "kuat",
          "melengking",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "saraf_pusat_tangisbayi_keterangan",
        "label": "Saraf Pusat Tangisbayi Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kardiovaskular_denyutnadi",
        "label": "Kardiovaskular Denyutnadi",
        "tipe": "enum",
        "opsi": [
          "teratur",
          "tidak teratur"
        ],
        "wajib": true
      },
      {
        "nama": "kardiovaskular_sirkulasi",
        "label": "Kardiovaskular Sirkulasi",
        "tipe": "enum",
        "opsi": [
          "akral hangat",
          "akral dingin",
          "crt",
          "edema"
        ],
        "wajib": true
      },
      {
        "nama": "kardiovaskular_sirkulasi_keterangan",
        "label": "Kardiovaskular Sirkulasi Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kardiovaskular_pulsasi",
        "label": "Kardiovaskular Pulsasi",
        "tipe": "enum",
        "opsi": [
          "kuat",
          "lemah",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "kardiovaskular_pulsasi_keterangan",
        "label": "Kardiovaskular Pulsasi Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "respirasi_polanafas",
        "label": "Respirasi Polanafas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "bradipnea",
          "tachipnea",
          "hiperventilasi",
          "othopneu",
          "kusmaul",
          "apneu"
        ],
        "wajib": true
      },
      {
        "nama": "respirasi_jenispernapasan",
        "label": "Respirasi Jenispernapasan",
        "tipe": "enum",
        "opsi": [
          "pernapasan dada",
          "pernapasan perut",
          "bahu diangkat",
          "cuping hidung",
          "alat bantu napas"
        ],
        "wajib": true
      },
      {
        "nama": "respirasi_jenispernapasan_keterangan",
        "label": "Respirasi Jenispernapasan Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "respirasi_retraksi",
        "label": "Respirasi Retraksi",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ringan",
          "berat"
        ],
        "wajib": true
      },
      {
        "nama": "respirasi_airentry",
        "label": "Respirasi Airentry",
        "tipe": "enum",
        "opsi": [
          "udara masuk",
          "penurunan udara masuk",
          "tidak ada udara masuk"
        ],
        "wajib": true
      },
      {
        "nama": "respirasi_merintih",
        "label": "Respirasi Merintih",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "terdengar dengan stetoskop",
          "terdengar tanpa stetoskop"
        ],
        "wajib": true
      },
      {
        "nama": "respirasi_suara_napas",
        "label": "Respirasi Suara Napas",
        "tipe": "enum",
        "opsi": [
          "vesikuler",
          "wheezing",
          "ronkhi",
          "stridor"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_mulut",
        "label": "Gastrointestinal Mulut",
        "tipe": "enum",
        "opsi": [
          "tak",
          "simetris",
          "asimetri",
          "bibir pucat",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_mulut_keterangan",
        "label": "Gastrointestinal Mulut Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_lidah",
        "label": "Gastrointestinal Lidah",
        "tipe": "enum",
        "opsi": [
          "tak",
          "kotor",
          "gerak asimetris",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_lidah_keterangan",
        "label": "Gastrointestinal Lidah Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_tenggorakan",
        "label": "Gastrointestinal Tenggorakan",
        "tipe": "enum",
        "opsi": [
          "tak",
          "ada kelainan"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_tenggorakan_keterangan",
        "label": "Gastrointestinal Tenggorakan Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_abdomen",
        "label": "Gastrointestinal Abdomen",
        "tipe": "enum",
        "opsi": [
          "supel",
          "asites",
          "tegang",
          "bu",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_abdomen_keterangan",
        "label": "Gastrointestinal Abdomen Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bab",
        "label": "Gastrointestinal Bab",
        "tipe": "enum",
        "opsi": [
          "normal",
          "konstipasi",
          "melena",
          "colostomy",
          "diare",
          "meco pertama"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bab_keterangan",
        "label": "Gastrointestinal Bab Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_warnabab",
        "label": "Gastrointestinal Warnabab",
        "tipe": "enum",
        "opsi": [
          "kuning",
          "dempul",
          "coklat",
          "hijau",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_warnabab_keterangan",
        "label": "Gastrointestinal Warnabab Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bak",
        "label": "Gastrointestinal Bak",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hematuri",
          "urin menetes",
          "oliguri",
          "bak pertama"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bak_keterangan",
        "label": "Gastrointestinal Bak Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bakwarna",
        "label": "Gastrointestinal Bakwarna",
        "tipe": "enum",
        "opsi": [
          "jernih",
          "kuning",
          "kuning pekat",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gastrointestinal_bakwarna_keterangan",
        "label": "Gastrointestinal Bakwarna Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "neurologi_posisi_mata",
        "label": "Neurologi Posisi Mata",
        "tipe": "enum",
        "opsi": [
          "simetris",
          "asimetris"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_kelopak_mata",
        "label": "Neurologi Kelopak Mata",
        "tipe": "enum",
        "opsi": [
          "tak",
          "edema",
          "cekung",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_kelopak_mata_keterangan",
        "label": "Neurologi Kelopak Mata Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "neurologi_besar_pupil",
        "label": "Neurologi Besar Pupil",
        "tipe": "enum",
        "opsi": [
          "isokor",
          "anisokor"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_konjugtiva",
        "label": "Neurologi Konjugtiva",
        "tipe": "enum",
        "opsi": [
          "tak",
          "anemis",
          "konjungtivitis",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_konjugtiva_keterangan",
        "label": "Neurologi Konjugtiva Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "neurologi_sklera",
        "label": "Neurologi Sklera",
        "tipe": "enum",
        "opsi": [
          "tak",
          "ikterik",
          "perdarahan",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_sklera_keterangan",
        "label": "Neurologi Sklera Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "neurologi_pendengaran",
        "label": "Neurologi Pendengaran",
        "tipe": "enum",
        "opsi": [
          "tak",
          "asimetris",
          "keluar cairan",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_pendengaran_keterangan",
        "label": "Neurologi Pendengaran Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "neurologi_penciuman",
        "label": "Neurologi Penciuman",
        "tipe": "enum",
        "opsi": [
          "tak",
          "asimetris",
          "keluar cairan",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "neurologi_penciuman_keterangan",
        "label": "Neurologi Penciuman Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "integument_warna_kulit",
        "label": "Integument Warna Kulit",
        "tipe": "enum",
        "opsi": [
          "pucat",
          "sianosis",
          "normal",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "integument_warna_kulit_keterangan",
        "label": "Integument Warna Kulit Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "integument_vernic_kaseosa",
        "label": "Integument Vernic Kaseosa",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "integument_vernic_kaseosa_keterangan",
        "label": "Integument Vernic Kaseosa Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "integument_turgor",
        "label": "Integument Turgor",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "buruk"
        ],
        "wajib": true
      },
      {
        "nama": "integument_lanugo",
        "label": "Integument Lanugo",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "banyak",
          "tipis",
          "bercak-bercak tanpa lanugo",
          "sebagian besar tanpa lanugo"
        ],
        "wajib": true
      },
      {
        "nama": "integument_kulit",
        "label": "Integument Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "rash/kemerahan",
          "luka",
          "memar",
          "ptekie",
          "bula"
        ],
        "wajib": true
      },
      {
        "nama": "integument_risiko_dekubitas",
        "label": "Integument Risiko Dekubitas",
        "tipe": "enum",
        "opsi": [
          "jaringan/elastisitas kurang",
          "imobilisasi"
        ],
        "wajib": true
      },
      {
        "nama": "reproduksi",
        "label": "Reproduksi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hipospadia",
          "epispadia",
          "fimosis",
          "hidrokel",
          "keputihan",
          "vagina skintag",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "reproduksi_keterangan",
        "label": "Reproduksi Keterangan",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_rekoil_telinga",
        "label": "Muskuloskeletal Rekoil Telinga",
        "tipe": "enum",
        "opsi": [
          "rekoil lambat",
          "rekoil cepat",
          "rekoil segera",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_rekoil_telinga_keterangan",
        "label": "Muskuloskeletal Rekoil Telinga Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_lengan",
        "label": "Muskuloskeletal Lengan",
        "tipe": "enum",
        "opsi": [
          "fleksi",
          "ekstensi",
          "pergerakan aktif",
          "pergerakan tidak aktif",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_lengan_keterangan",
        "label": "Muskuloskeletal Lengan Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_tungkai",
        "label": "Muskuloskeletal Tungkai",
        "tipe": "enum",
        "opsi": [
          "fleksi",
          "ekstensi",
          "pergerakan aktif",
          "pergerakan tidak aktif",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_tungkai_keterangan",
        "label": "Muskuloskeletal Tungkai Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "muskuloskeletal_telapak_kaki",
        "label": "Muskuloskeletal Telapak Kaki",
        "tipe": "enum",
        "opsi": [
          "tipis",
          "garis transversal anterior",
          "garis 2/3 anterior",
          "seluruh telapak kaki"
        ],
        "wajib": true
      },
      {
        "nama": "kondisi_psikologis",
        "label": "Kondisi Psikologis",
        "tipe": "enum",
        "opsi": [
          "tidak ada masalah",
          "marah",
          "takut",
          "depresi",
          "cepat lelah",
          "cemas",
          "gelisah",
          "sulit tidur",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "gangguan_jiwa",
        "label": "Gangguan Jiwa",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "menerima_kondisi_bayi",
        "label": "Menerima Kondisi Bayi",
        "tipe": "enum",
        "opsi": [
          "menerima",
          "tidak menerima"
        ],
        "wajib": true
      },
      {
        "nama": "status_menikah",
        "label": "Status Menikah",
        "tipe": "enum",
        "opsi": [
          "menikah",
          "belum menikah",
          "janda",
          "duda"
        ],
        "wajib": true
      },
      {
        "nama": "masalah_pernikahan",
        "label": "Masalah Pernikahan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "cerai/istri baru",
          "simpanan",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "masalah_pernikahan_keterangan",
        "label": "Masalah Pernikahan Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pekerjaan",
        "label": "Pekerjaan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "agama",
        "label": "Agama",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "nilai_kepercayaan",
        "label": "Nilai Kepercayaan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "nilai_kepercayaan_keterangan",
        "label": "Nilai Kepercayaan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "suku",
        "label": "Suku",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "pendidikan",
        "label": "Pendidikan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "pembayaran",
        "label": "Pembayaran",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "tinggal_bersama",
        "label": "Tinggal Bersama",
        "tipe": "enum",
        "opsi": [
          "suami",
          "orang tua",
          " teman",
          "anak",
          "sendiri",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "tinggal_bersama_keterangan",
        "label": "Tinggal Bersama Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "hubungan_keluarga",
        "label": "Hubungan Keluarga",
        "tipe": "enum",
        "opsi": [
          "harmonis",
          "kurang harmonis",
          "tidak harmonis",
          "konflik besar"
        ],
        "wajib": true
      },
      {
        "nama": "respon_emosi",
        "label": "Respon Emosi",
        "tipe": "enum",
        "opsi": [
          "takut terhadap terapi / pembedahan / lingkungan rs",
          "marah / tegang",
          "sedih",
          "menangis",
          "senang",
          "takut",
          "mampu menahan diri",
          "cemas",
          "rendah diri",
          "gelisah",
          "tenang",
          "mudah tersinggung"
        ],
        "wajib": true
      },
      {
        "nama": "bahasa_sehari_hari",
        "label": "Bahasa Sehari Hari",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kemampuan_bacatulis",
        "label": "Kemampuan Bacatulis",
        "tipe": "enum",
        "opsi": [
          "baik",
          " kurang",
          "tidak bisa"
        ],
        "wajib": true
      },
      {
        "nama": "butuh_penterjemah",
        "label": "Butuh Penterjemah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "butuh_penterjemah_keterangan",
        "label": "Butuh Penterjemah Keterangan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "terdapat_hambatan_belajar",
        "label": "Terdapat Hambatan Belajar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "hambatan_belajar",
        "label": "Hambatan Belajar",
        "tipe": "enum",
        "opsi": [
          "-",
          "gangguan pendengaran",
          "gangguan penglihatan",
          "gangguan kognitif",
          "gangguan fisik",
          "gangguan emosi",
          "keterbatasan bahasa",
          "keterbatasan budaya",
          "keterbatasan spiritual",
          "agama",
          "lainnya"
        ],
        "wajib": true
      },
      {
        "nama": "hambatan_belajar_keterangan",
        "label": "Hambatan Belajar Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "hambatan_cara_bicara",
        "label": "Hambatan Cara Bicara",
        "tipe": "enum",
        "opsi": [
          "normal",
          "gangguan bicara"
        ],
        "wajib": true
      },
      {
        "nama": "hambatan_bahasa_isyarat",
        "label": "Hambatan Bahasa Isyarat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "cara_belajar_disukai",
        "label": "Cara Belajar Disukai",
        "tipe": "enum",
        "opsi": [
          "audio",
          "lisan",
          "visual",
          "demonstrasi",
          "tulisan"
        ],
        "wajib": true
      },
      {
        "nama": "kesediaan_menerima_informasi",
        "label": "Kesediaan Menerima Informasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kesediaan_menerima_informasi_keterangan",
        "label": "Kesediaan Menerima Informasi Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "pemahaman_nutrisi",
        "label": "Pemahaman Nutrisi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pemahaman_penyakit",
        "label": "Pemahaman Penyakit",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pemahaman_pengobatan",
        "label": "Pemahaman Pengobatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pemahaman_perawatan",
        "label": "Pemahaman Perawatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "masalah_gizi1",
        "label": "Masalah Gizi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai_gizi1",
        "label": "Nilai Gizi1",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "masalah_gizi2",
        "label": "Masalah Gizi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai_gizi2",
        "label": "Nilai Gizi2",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "masalah_gizi3",
        "label": "Masalah Gizi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "nilai_gizi3",
        "label": "Nilai Gizi3",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "totalgizi",
        "label": "Totalgizi",
        "tipe": "uang"
      },
      {
        "nama": "keterangan_gizi",
        "label": "Keterangan Gizi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_skala1",
        "label": "Penilaian Humptydumpty Skala1",
        "tipe": "enum",
        "opsi": [
          "0 - 3 tahun",
          "3 - 7 tahun",
          "7 - 13 tahun",
          "> 13 tahun"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai1",
        "label": "Penilaian Humptydumpty Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala2",
        "label": "Penilaian Humptydumpty Skala2",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai2",
        "label": "Penilaian Humptydumpty Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala3",
        "label": "Penilaian Humptydumpty Skala3",
        "tipe": "enum",
        "opsi": [
          "kelainan neurologi",
          "perubahan dalam oksigen(masalah saluran nafas, dehidrasi, anemia, anoreksia / sakit kepala, dll)",
          "kelainan psikis / perilaku",
          "diagnosa lain"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai3",
        "label": "Penilaian Humptydumpty Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala4",
        "label": "Penilaian Humptydumpty Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak sadar terhadap keterbatasan",
          "lupa keterbatasan",
          "mengetahui kemampuan diri"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai4",
        "label": "Penilaian Humptydumpty Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala5",
        "label": "Penilaian Humptydumpty Skala5",
        "tipe": "enum",
        "opsi": [
          "riwayat jatuh dari tempat tidur saat bayi/anak",
          "pasien menggunakan alat bantu/box/mebel",
          "pasien berada di tempat tidur",
          "di luar ruang rawat"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai5",
        "label": "Penilaian Humptydumpty Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala6",
        "label": "Penilaian Humptydumpty Skala6",
        "tipe": "enum",
        "opsi": [
          "dalam 24 jam",
          "dalam 48 jam",
          "> 48 jam"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai6",
        "label": "Penilaian Humptydumpty Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala7",
        "label": "Penilaian Humptydumpty Skala7",
        "tipe": "enum",
        "opsi": [
          "bermacam-macam obat yang digunakan : obat sedative (kecuali pasien icu yang menggunakan sedasi dan paralisis), hipnotik, barbiturat, fenoti-azin, antidepresan, laksans/diuretika,narkotik",
          "salah satu dari pengobatan di atas",
          "pengobatan lain"
        ],
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_nilai7",
        "label": "Penilaian Humptydumpty Nilai7",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_totalnilai",
        "label": "Penilaian Humptydumpty Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "penilaian_humptydumpty_hasil",
        "label": "Penilaian Humptydumpty Hasil",
        "tipe": "enum",
        "opsi": [
          "risiko rendah 7 - 11",
          "risiko tinggi >=12"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips1",
        "label": "Skala Nips1",
        "tipe": "enum",
        "opsi": [
          "otot relaks / wajah tenang / ekspresi netral",
          "meringis / otot wajah tegang / alis berkerut (ekspresi wajah negatif)"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips1_nilai",
        "label": "Skala Nips1 Nilai",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips2",
        "label": "Skala Nips2",
        "tipe": "enum",
        "opsi": [
          "tenang / tidak menangis",
          "merengek / mengerang lemah intermiten",
          "menangis keras / melengking terus menerus / menangis tanpa suara bila bayi intubasi"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips2_nilai",
        "label": "Skala Nips2 Nilai",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips3",
        "label": "Skala Nips3",
        "tipe": "enum",
        "opsi": [
          "relaks / bernapas biasa",
          "perubahan napas / tarikan irreguler / lebih cepat dibandingkan biasa / menahan napas / tersedak"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips3_nilai",
        "label": "Skala Nips3 Nilai",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips4",
        "label": "Skala Nips4",
        "tipe": "enum",
        "opsi": [
          "relaks / tidak ada kekakuan otot / gerakan tungkai biasa",
          "fleksi / ekstensi tegang kaku"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips4_nilai",
        "label": "Skala Nips4 Nilai",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips5",
        "label": "Skala Nips5",
        "tipe": "enum",
        "opsi": [
          "tenang / tidur lelap / bangun",
          "gelisah"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips5_nilai",
        "label": "Skala Nips5 Nilai",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nips_total",
        "label": "Skala Nips Total",
        "tipe": "uang"
      },
      {
        "nama": "skala_nips_keterangan",
        "label": "Skala Nips Keterangan",
        "tipe": "enum",
        "opsi": [
          "0 : tidak nyeri",
          "1-2 : nyeri ringan",
          "3-4 : nyeri sedang",
          "> 4 : nyeri hebat"
        ],
        "wajib": true
      },
      {
        "nama": "informasi_perencanaan_pulang",
        "label": "Informasi Perencanaan Pulang",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "lama_ratarata",
        "label": "Lama Ratarata",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "perencanaan_pulang",
        "label": "Perencanaan Pulang",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kondisi_klinis_pulang",
        "label": "Kondisi Klinis Pulang",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "perawatan_lanjutan_dirumah",
        "label": "Perawatan Lanjutan Dirumah",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "cara_transportasi_pulang",
        "label": "Cara Transportasi Pulang",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "dibantu sebagian",
          "dibantu keseluruhan",
          "menggunakan rostul",
          "menggunakan brankar",
          "berjalan"
        ],
        "wajib": true
      },
      {
        "nama": "transportasi_digunakan",
        "label": "Transportasi Digunakan",
        "tipe": "enum",
        "opsi": [
          "kendaraan pribadi",
          "mobil ambulance",
          "kendaraan umum"
        ],
        "wajib": true
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "nip1",
        "label": "Nip1",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "nip2",
        "label": "Nip2",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "asal_pasien",
      "cara_masuk",
      "diperoleh_dari",
      "hubungan_dengan_pasien",
      "keluhan_utama"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-igd",
    "slug": "penilaian-awal-medis-igd",
    "judul": "Awal Medis IGD",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_igd",
    "javaRef": "RMPenilaianAwalMedisIGD",
    "tabel": "penilaian_medis_igd",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "leher",
        "label": "Leher",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ekg",
        "label": "EKG",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-igd-psikiatri",
    "slug": "penilaian-awal-medis-ralan-igd-psikiatri",
    "judul": "Awal Medis IGD Psikiatri",
    "kategori": "M",
    "permissionKey": "penilaian_medis_ralan_gawat_darurat_psikiatri",
    "javaRef": "RMPenilaianAwalMedisIGDPsikiatri",
    "tabel": "penilaian_medis_ralan_gawat_darurat_psikiatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "gejala_menyertai",
        "label": "Gejala Menyertai",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "faktor_pencetus",
        "label": "Faktor Pencetus",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_penyakit_dahulu",
        "label": "Riwayat Penyakit Dahulu",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "keterangan_riwayat_penyakit_dahulu",
        "label": "Keterangan Riwayat Penyakit Dahulu",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_kehamilan",
        "label": "Riwayat Kehamilan",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_sosial",
        "label": "Riwayat Sosial",
        "tipe": "enum",
        "opsi": [
          "bergaul",
          "tidak bergaul",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_riwayat_sosial",
        "label": "Keterangan Riwayat Sosial",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "riwayat_pekerjaan",
        "label": "Riwayat Pekerjaan",
        "tipe": "enum",
        "opsi": [
          "bekerja",
          "tidak bekerja",
          "ganti-gantian pekerjaan"
        ]
      },
      {
        "nama": "keterangan_riwayat_pekerjaan",
        "label": "Keterangan Riwayat Pekerjaan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "riwayat_obat_diminum",
        "label": "Riwayat Obat Diminum",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "faktor_kepribadian_premorbid",
        "label": "Faktor Kepribadian Premorbid",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "faktor_keturunan",
        "label": "Faktor Keturunan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "keterangan_faktor_keturunan",
        "label": "Keterangan Faktor Keturunan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "faktor_organik",
        "label": "Faktor Organik",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "keterangan_faktor_organik",
        "label": "Keterangan Faktor Organik",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "riwayat_alergi",
        "label": "Riwayat Alergi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "fisik_kesadaran",
        "label": "Fisik Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ]
      },
      {
        "nama": "fisik_td",
        "label": "Fisik TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "fisik_rr",
        "label": "Fisik RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_suhu",
        "label": "Fisik Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_nyeri",
        "label": "Fisik Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak nyeri",
          "nyeri ringan",
          "nyeri sedang",
          "nyeri berat",
          "nyeri sangat berat",
          "nyeri tak tertahankan"
        ]
      },
      {
        "nama": "fisik_nadi",
        "label": "Fisik Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_bb",
        "label": "Fisik BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_tb",
        "label": "Fisik TB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_status_nutrisi",
        "label": "Fisik Status Nutrisi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_gcs",
        "label": "Fisik GCS",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "status_kelainan_kepala",
        "label": "Status Kelainan Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_status_kelainan_kepala",
        "label": "Keterangan Status Kelainan Kepala",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_kelainan_leher",
        "label": "Status Kelainan Leher",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_status_kelainan_leher",
        "label": "Keterangan Status Kelainan Leher",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_kelainan_dada",
        "label": "Status Kelainan Dada",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_status_kelainan_dada",
        "label": "Keterangan Status Kelainan Dada",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_kelainan_perut",
        "label": "Status Kelainan Perut",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_status_kelainan_perut",
        "label": "Keterangan Status Kelainan Perut",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_kelainan_anggota_gerak",
        "label": "Status Kelainan Anggota Gerak",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_status_kelainan_anggota_gerak",
        "label": "Keterangan Status Kelainan Anggota Gerak",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_lokalisata",
        "label": "Status Lokalisata",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "psikiatrik_kesan_umum",
        "label": "Psikiatrik Kesan Umum",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_sikap_prilaku",
        "label": "Psikiatrik Sikap Prilaku",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_kesadaran",
        "label": "Psikiatrik Kesadaran",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_orientasi",
        "label": "Psikiatrik Orientasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_daya_ingat",
        "label": "Psikiatrik Daya Ingat",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_persepsi",
        "label": "Psikiatrik Persepsi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_pikiran",
        "label": "Psikiatrik Pikiran",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "psikiatrik_insight",
        "label": "Psikiatrik Insight",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laborat",
        "label": "Laborat",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "radiologi",
        "label": "Radiologi",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "ekg",
        "label": "EKG",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "instruksi_medis",
        "label": "Instruksi Medis",
        "tipe": "text",
        "maks": 600
      },
      {
        "nama": "rencana_target",
        "label": "Rencana Target",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "pulang_dipulangkan",
        "label": "Pulang Dipulangkan",
        "tipe": "enum",
        "opsi": [
          "tidak perlu kontrol",
          "kontrol/berobat jalan",
          "rawat inap",
          "-"
        ]
      },
      {
        "nama": "keterangan_pulang_dipulangkan",
        "label": "Keterangan Pulang Dipulangkan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pulang_dirawat_diruang",
        "label": "Pulang Dirawat Diruang",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "pulang_indikasi_ranap",
        "label": "Pulang Indikasi Ranap",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pulang_dirujuk_ke",
        "label": "Pulang Dirujuk Ke",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "pulang_alasan_dirujuk",
        "label": "Pulang Alasan Dirujuk",
        "tipe": "enum",
        "opsi": [
          "-",
          "tempat penuh",
          "perlu fasilitas lebih",
          "permintaan pasien/keluarga"
        ]
      },
      {
        "nama": "pulang_paksa",
        "label": "Pulang Paksa",
        "tipe": "enum",
        "opsi": [
          "-",
          "masalah biaya",
          "kondisi pasien",
          "masalah lokasi rumah",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_pulang_paksa",
        "label": "Keterangan Pulang Paksa",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pulang_meninggal_igd",
        "label": "Pulang Meninggal IGD",
        "tipe": "enum",
        "opsi": [
          "-",
          "<= 2 jam",
          "> 2 jam"
        ]
      },
      {
        "nama": "pulang_penyebab_kematian",
        "label": "Pulang Penyebab Kematian",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_pulang_kesadaran",
        "label": "Fisik Pulang Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ]
      },
      {
        "nama": "fisik_pulang_td",
        "label": "Fisik Pulang TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "fisik_pulang_nadi",
        "label": "Fisik Pulang Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_pulang_gcs",
        "label": "Fisik Pulang GCS",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "fisik_pulang_suhu",
        "label": "Fisik Pulang Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "fisik_pulang_rr",
        "label": "Fisik Pulang RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "gejala_menyertai"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan",
    "slug": "penilaian-awal-medis-ralan",
    "judul": "Awal Medis Ralan Umum",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan",
    "javaRef": "RMPenilaianAwalMedisRalanDewasa",
    "tabel": "penilaian_medis_ralan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "konsulrujuk",
        "label": "Konsulrujuk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ranap",
    "slug": "penilaian-awal-medis-ranap",
    "judul": "Awal Medis Ranap Umum",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ranap",
    "javaRef": "RMPenilaianAwalMedisRanapDewasa",
    "tabel": "penilaian_medis_ranap",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "jantung",
        "label": "Jantung",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "paru",
        "label": "Paru",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ranap-neonatus",
    "slug": "penilaian-awal-medis-ranap-neonatus",
    "judul": "Awal Medis Ranap Neonatus",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ranap_neonatus",
    "javaRef": "RMPenilaianAwalMedisRanapNeonatus",
    "tabel": "riwayat_persalinan_pasien",
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
        "nama": "tgl_thn",
        "label": "Tgl Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "tempat_persalinan",
        "label": "Tempat Persalinan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "usia_hamil",
        "label": "Usia Hamil",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jenis_persalinan",
        "label": "Jenis Persalinan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "penolong",
        "label": "Penolong",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyulit",
        "label": "Penyulit",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "L",
          "P",
          "-"
        ]
      },
      {
        "nama": "bbpb",
        "label": "Bbpb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "tgl_thn",
      "tempat_persalinan",
      "usia_hamil",
      "jenis_persalinan",
      "penolong"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-bayi-baru-lahir",
    "slug": "penilaian-bayi-baru-lahir",
    "judul": "Pengkajian Bayi Baru Lahir",
    "kategori": "M",
    "permissionKey": "penilaian_bayi_baru_lahir",
    "javaRef": "RMPenilaianBayiBaruLahir",
    "tabel": "riwayat_persalinan_pasien",
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
        "nama": "tgl_thn",
        "label": "Tgl Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 12
      },
      {
        "nama": "tempat_persalinan",
        "label": "Tempat Persalinan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "usia_hamil",
        "label": "Usia Hamil",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jenis_persalinan",
        "label": "Jenis Persalinan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "penolong",
        "label": "Penolong",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyulit",
        "label": "Penyulit",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "L",
          "P",
          "-"
        ]
      },
      {
        "nama": "bbpb",
        "label": "Bbpb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "text",
        "maks": 40
      }
    ],
    "kolomCari": [
      "no_rkm_medis",
      "tgl_thn",
      "tempat_persalinan",
      "usia_hamil",
      "jenis_persalinan",
      "penolong"
    ],
    "kolomUrut": "no_rkm_medis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-bayi",
    "slug": "penilaian-awal-medis-ralan-bayi",
    "judul": "Awal Medis Ralan Bayi/Anak",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_anak",
    "javaRef": "RMPenilaianAwalMedisRalanAnak",
    "tabel": "penilaian_medis_ralan_anak",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "konsul",
        "label": "Konsul",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-kandungan",
    "slug": "penilaian-awal-medis-ralan-kandungan",
    "judul": "Awal Medis Ralan Kandungan",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_kebidanan",
    "javaRef": "RMPenilaianAwalMedisRalanKandungan",
    "tabel": "penilaian_medis_ralan_kandungan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tfu",
        "label": "Tfu",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "tbj",
        "label": "Tbj",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "his",
        "label": "His",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kontraksi",
        "label": "Kontraksi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "djj",
        "label": "Djj",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "inspeksi",
        "label": "Inspeksi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "inspekulo",
        "label": "Inspekulo",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "vt",
        "label": "Vt",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rt",
        "label": "Rt",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ultra",
        "label": "Ultra",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "kardio",
        "label": "Kardio",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "konsul",
        "label": "Konsul",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ranap-kandungan",
    "slug": "penilaian-awal-medis-ranap-kandungan",
    "judul": "Awal Medis Ranap Kandungan",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ranap_kebidanan",
    "javaRef": "RMPenilaianAwalMedisRanapKandungan",
    "tabel": "penilaian_medis_ranap_kandungan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "jantung",
        "label": "Jantung",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "paru",
        "label": "Paru",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tfu",
        "label": "Tfu",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "tbj",
        "label": "Tbj",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "his",
        "label": "His",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kontraksi",
        "label": "Kontraksi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "djj",
        "label": "Djj",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "inspeksi",
        "label": "Inspeksi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "inspekulo",
        "label": "Inspekulo",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "vt",
        "label": "Vt",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rt",
        "label": "Rt",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ultra",
        "label": "Ultra",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "kardio",
        "label": "Kardio",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-pemeriksaan-usg",
    "slug": "hasil-pemeriksaan-usg",
    "judul": "Hasil USG Kandungan",
    "kategori": "M",
    "permissionKey": "hasil_pemeriksaan_usg",
    "javaRef": "RMHasilPemeriksaanUSG",
    "tabel": "hasil_pemeriksaan_usg",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hta",
        "label": "Hta",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kantong_gestasi",
        "label": "Kantong Gestasi",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "ukuran_bokongkepala",
        "label": "Ukuran Bokongkepala",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "jenis_prestasi",
        "label": "Jenis Prestasi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "diameter_biparietal",
        "label": "Diameter Biparietal",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "panjang_femur",
        "label": "Panjang Femur",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "lingkar_abdomen",
        "label": "Lingkar Abdomen",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "tafsiran_berat_janin",
        "label": "Tafsiran Berat Janin",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "usia_kehamilan",
        "label": "Usia Kehamilan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "plasenta_berimplatansi",
        "label": "Plasenta Berimplatansi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "derajat_maturitas",
        "label": "Derajat Maturitas",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3"
        ]
      },
      {
        "nama": "jumlah_air_ketuban",
        "label": "Jumlah Air Ketuban",
        "tipe": "enum",
        "opsi": [
          "cukup",
          "berkurang"
        ]
      },
      {
        "nama": "indek_cairan_ketuban",
        "label": "Indek Cairan Ketuban",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kelainan_kongenital",
        "label": "Kelainan Kongenital",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "peluang_sex",
        "label": "Peluang Sex",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan",
          "-"
        ]
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 200
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "hta",
      "kantong_gestasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-usg-urologi",
    "slug": "hasil-usg-urologi",
    "judul": "Hasil USG Urologi",
    "kategori": "M",
    "permissionKey": "hasil_usg_urologi",
    "javaRef": "RMHasilPemeriksaanUSGUrologi",
    "tabel": "hasil_pemeriksaan_usg_urologi",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "ginjal_kanan",
        "label": "Ginjal Kanan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "ginjal_kiri",
        "label": "Ginjal Kiri",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "vesica_urinaria",
        "label": "Vesica Urinaria",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tambahan",
        "label": "Tambahan",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "ginjal_kanan",
      "ginjal_kiri"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-usg-gynecologi",
    "slug": "hasil-usg-gynecologi",
    "judul": "Hasil USG Gynecologi",
    "kategori": "M",
    "permissionKey": "hasil_usg_gynecologi",
    "javaRef": "RMHasilPemeriksaanUSGGynecologi",
    "tabel": "hasil_pemeriksaan_usg_gynecologi",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "uterus",
        "label": "Uterus",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "parametrium",
        "label": "Parametrium",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "ovarium",
        "label": "Ovarium",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "doppler",
        "label": "Doppler",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "uterus",
      "parametrium"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-usg-neonatus",
    "slug": "hasil-usg-neonatus",
    "judul": "Hasil USG Neonatus",
    "kategori": "M",
    "permissionKey": "hasil_usg_neonatus",
    "javaRef": "RMHasilPemeriksaanUSGNeonatus",
    "tabel": "hasil_pemeriksaan_usg_neonatus",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "ventrikal_sinistra",
        "label": "Ventrikal Sinistra",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "ventrikal_dextra",
        "label": "Ventrikal Dextra",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kesan",
        "label": "Kesan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "ventrikal_sinistra",
      "ventrikal_dextra"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-tht",
    "slug": "penilaian-awal-medis-ralan-tht",
    "judul": "Awal Medis Ralan THT",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_tht",
    "javaRef": "RMPenilaianAwalMedisRalanTHT",
    "tabel": "penilaian_medis_ralan_tht",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "status_nutrisi",
        "label": "Status Nutrisi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kondisi",
        "label": "Kondisi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tes_pendengaran",
        "label": "Tes Pendengaran",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosisbanding",
        "label": "Diagnosisbanding",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tatalaksana",
        "label": "Tatalaksana",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-psikiatri",
    "slug": "penilaian-awal-medis-ralan-psikiatri",
    "judul": "Awal Medis Ralan Psikiatri",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_psikiatri",
    "javaRef": "RMPenilaianAwalMedisRalanPsikiatrik",
    "tabel": "penilaian_medis_ralan_psikiatrik",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "penampilan",
        "label": "Penampilan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pembicaraan",
        "label": "Pembicaraan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "psikomotor",
        "label": "Psikomotor",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "sikap",
        "label": "Sikap",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "mood",
        "label": "Mood",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "fungsi_kognitif",
        "label": "Fungsi Kognitif",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "gangguan_persepsi",
        "label": "Gangguan Persepsi",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "proses_pikir",
        "label": "Proses Pikir",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pengendalian_impuls",
        "label": "Pengendalian Impuls",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "tilikan",
        "label": "Tilikan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "rta",
        "label": "Rta",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "tht",
        "label": "Tht",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genital",
        "label": "Genital",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tata",
        "label": "Tata",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "konsulrujuk",
        "label": "Konsulrujuk",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-penyakit-dalam",
    "slug": "penilaian-awal-medis-ralan-penyakit-dalam",
    "judul": "Awal Medis Ralan Penyakit Dalam",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_penyakit_dalam",
    "javaRef": "RMPenilaianAwalMedisRalanPenyakitDalam",
    "tabel": "penilaian_medis_ralan_penyakit_dalam",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "kondisi",
        "label": "Kondisi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kepala",
        "label": "Keterangan Kepala",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_thorak",
        "label": "Keterangan Thorak",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_abdomen",
        "label": "Keterangan Abdomen",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_ekstremitas",
        "label": "Keterangan Ekstremitas",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "penunjanglain",
        "label": "Penunjanglain",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-mata",
    "slug": "penilaian-awal-medis-ralan-mata",
    "judul": "Awal Medis Ralan Mata",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_mata",
    "javaRef": "RMPenilaianAwalMedisRalanMata",
    "tabel": "penilaian_medis_ralan_mata",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "visuskanan",
        "label": "Visuskanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "visuskiri",
        "label": "Visuskiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "cckanan",
        "label": "Cckanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "cckiri",
        "label": "Cckiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "palkanan",
        "label": "Palkanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "palkiri",
        "label": "Palkiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "conkanan",
        "label": "Conkanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "conkiri",
        "label": "Conkiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "corneakanan",
        "label": "Corneakanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "corneakiri",
        "label": "Corneakiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "coakanan",
        "label": "Coakanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "coakiri",
        "label": "Coakiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pupilkanan",
        "label": "Pupilkanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pupilkiri",
        "label": "Pupilkiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lensakanan",
        "label": "Lensakanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lensakiri",
        "label": "Lensakiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "funduskanan",
        "label": "Funduskanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "funduskiri",
        "label": "Funduskiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "papilkanan",
        "label": "Papilkanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "papilkiri",
        "label": "Papilkiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "retinakanan",
        "label": "Retinakanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "retinakiri",
        "label": "Retinakiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "makulakanan",
        "label": "Makulakanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "makulakiri",
        "label": "Makulakiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tiokanan",
        "label": "Tiokanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tiokiri",
        "label": "Tiokiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "mbokanan",
        "label": "Mbokanan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "mbokiri",
        "label": "Mbokiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tes",
        "label": "Tes",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosisbdg",
        "label": "Diagnosisbdg",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-neurologi",
    "slug": "penilaian-awal-medis-ralan-neurologi",
    "judul": "Awal Medis Ralan Neurologi",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_neurologi",
    "javaRef": "RMPenilaianAwalMedisRalanNeurologi",
    "tabel": "penilaian_medis_ralan_neurologi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ],
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "skor < 2",
          "skor >= 2"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kepala",
        "label": "Keterangan Kepala",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_thoraks",
        "label": "Keterangan Thoraks",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_abdomen",
        "label": "Keterangan Abdomen",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_ekstremitas",
        "label": "Keterangan Ekstremitas",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "columna",
        "label": "Columna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_columna",
        "label": "Keterangan Columna",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "muskulos",
        "label": "Muskulos",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_muskulos",
        "label": "Keterangan Muskulos",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "penunjanglain",
        "label": "Penunjanglain",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-orthopedi",
    "slug": "penilaian-awal-medis-ralan-orthopedi",
    "judul": "Awal Medis Ralan Orthopedi",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_orthopedi",
    "javaRef": "RMPenilaianAwalMedisRalanOrthopedi",
    "tabel": "penilaian_medis_ralan_orthopedi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ],
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genetalia",
        "label": "Genetalia",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "columna",
        "label": "Columna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "muskulos",
        "label": "Muskulos",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-bedah",
    "slug": "penilaian-awal-medis-ralan-bedah",
    "judul": "Awal Medis Ralan Bedah",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_bedah",
    "javaRef": "RMPenilaianAwalMedisRalanBedah",
    "tabel": "penilaian_medis_ralan_bedah",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ],
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "genetalia",
        "label": "Genetalia",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "columna",
        "label": "Columna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "muskulos",
        "label": "Muskulos",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-bedah-mulut",
    "slug": "penilaian-awal-medis-ralan-bedah-mulut",
    "judul": "Awal Medis Ralan Bedah Mulut",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_bedah_mulut",
    "javaRef": "RMPenilaianAwalMedisRalanBedahMulut",
    "tabel": "penilaian_medis_ralan_bedah_mulut",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "lemah",
          "buruk"
        ],
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak nyeri",
          "nyeri ringan",
          "nyeri sedang",
          "nyeri berat",
          "nyeri sangat berat",
          "nyeri tak tertahankan"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "status_nutrisi",
        "label": "Status Nutrisi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kulit",
        "label": "Keterangan Kulit",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kepala",
        "label": "Keterangan Kepala",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "mata",
        "label": "Mata",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_mata",
        "label": "Keterangan Mata",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "leher",
        "label": "Leher",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_leher",
        "label": "Keterangan Leher",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kelenjar",
        "label": "Kelenjar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kelenjar",
        "label": "Keterangan Kelenjar",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "dada",
        "label": "Dada",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_dada",
        "label": "Keterangan Dada",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "perut",
        "label": "Perut",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_perut",
        "label": "Keterangan Perut",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_ekstremitas",
        "label": "Keterangan Ekstremitas",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "wajah",
        "label": "Wajah",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "intra",
        "label": "Intra",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "gigigeligi",
        "label": "Gigigeligi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-geriatri",
    "slug": "penilaian-awal-medis-ralan-geriatri",
    "judul": "Awal Medis Ralan Geriatri",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_geriatri",
    "javaRef": "RMPenilaianAwalMedisRalanGeriatri",
    "tabel": "penilaian_medis_ralan_geriatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "tulang_belakang",
        "label": "Tulang Belakang",
        "tipe": "enum",
        "opsi": [
          "tegap",
          "membungkuk",
          "kifosis",
          "skoliosis",
          "lordosis"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "kondisi_umum",
        "label": "Kondisi Umum",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "status_psikologis_gds",
        "label": "Status Psikologis GDS",
        "tipe": "enum",
        "opsi": [
          "skor 1-4 tidak ada depresi",
          "skor antara 5-9 menunjukkan kemungkinan besar depresi",
          "skor 10 atau lebih menunjukkan depresi"
        ],
        "wajib": true
      },
      {
        "nama": "kondisi_sosial",
        "label": "Kondisi Sosial",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "status_kognitif_mmse",
        "label": "Status Kognitif Mmse",
        "tipe": "enum",
        "opsi": [
          "24-30 : tidak ada gangguan kognitif",
          "18-23 : gangguan kognitif sedang",
          "0-17 : gangguan kognitif berat"
        ],
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_kepala",
        "label": "Keterangan Kepala",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_thoraks",
        "label": "Keterangan Thoraks",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_abdomen",
        "label": "Keterangan Abdomen",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_ekstremitas",
        "label": "Keterangan Ekstremitas",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "Integument_kebersihan",
        "label": "Integument Kebersihan",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal"
        ],
        "wajib": true
      },
      {
        "nama": "Integument_warna",
        "label": "Integument Warna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "pucat",
          "sianosis",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "Integument_kelembaban",
        "label": "Integument Kelembaban",
        "tipe": "enum",
        "opsi": [
          "kering",
          "lembab"
        ],
        "wajib": true
      },
      {
        "nama": "Integument_gangguan_kulit",
        "label": "Integument Gangguan Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "rash",
          "luka",
          "memar",
          "ptekie",
          "bula"
        ],
        "wajib": true
      },
      {
        "nama": "status_fungsional",
        "label": "Status Fungsional",
        "tipe": "enum",
        "opsi": [
          "20 : mandiri (a)",
          "12-19 : ketergantungan ringan (b)",
          "9-11 : ketergantungan sedang (b)",
          "5-8 : ketergantungan berat (c)",
          "0-4 : ketergantungan total (c)"
        ],
        "wajib": true
      },
      {
        "nama": "skrining_jatuh",
        "label": "Skrining Jatuh",
        "tipe": "enum",
        "opsi": [
          "risiko rendah skor 0-5",
          "risiko sedang skor 6-16",
          "risiko tinggi skor 17-30"
        ],
        "wajib": true
      },
      {
        "nama": "status_nutrisi",
        "label": "Status Nutrisi",
        "tipe": "enum",
        "opsi": [
          "skor 12-14 : status gizi normal",
          "skor 8-11 : berisiko malnutrisi",
          "skor 0-7 : malnutrisi"
        ],
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-kulit-kelamin",
    "slug": "penilaian-awal-medis-ralan-kulit-kelamin",
    "judul": "Awal Medis Ralan Kulit & Kelamin",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_kulit_kelamin",
    "javaRef": "RMPenilaianAwalMedisRalanKulitDanKelamin",
    "tabel": "penilaian_medis_ralan_kulitdankelamin",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ],
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "statusderma",
        "label": "Statusderma",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-paru",
    "slug": "penilaian-awal-medis-ralan-paru",
    "judul": "Awal Medis Ralan Paru",
    "kategori": "M",
    "permissionKey": "penilaian_awal_medis_ralan_paru",
    "javaRef": "RMPenilaianAwalMedisRalanParu",
    "tabel": "penilaian_medis_ralan_paru",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpo",
        "label": "Rpo",
        "tipe": "text",
        "maks": 1000,
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
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ],
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "muskulos",
        "label": "Muskulos",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ],
        "wajib": true
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "ket_lokalis",
        "label": "Ket Lokalis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lab",
        "label": "Lab",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rad",
        "label": "Rad",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis2",
        "label": "Diagnosis2",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "permasalahan",
        "label": "Permasalahan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "terapi",
        "label": "Terapi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-ralan-rehab-medik",
    "slug": "penilaian-awal-medis-ralan-rehab-medik",
    "judul": "Awal Medis Ralan Fisik & Rehabilitasi",
    "kategori": "M",
    "permissionKey": "penilaian_medis_ralan_rehab_medik",
    "javaRef": "RMPenilaianAwalMedisRalanRehabMedik",
    "tabel": "penilaian_medis_ralan_rehab_medik",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ]
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirum"
        ]
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak nyeri",
          "nyeri sedang",
          "nyeri sangat hebat"
        ]
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ]
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kepala",
        "label": "Kepala",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_kepala",
        "label": "Keterangan Kepala",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "thoraks",
        "label": "Thoraks",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_thoraks",
        "label": "Keterangan Thoraks",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "abdomen",
        "label": "Abdomen",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_abdomen",
        "label": "Keterangan Abdomen",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "ekstremitas",
        "label": "Ekstremitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_ekstremitas",
        "label": "Keterangan Ekstremitas",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "columna",
        "label": "Columna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_columna",
        "label": "Keterangan Columna",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "muskulos",
        "label": "Muskulos",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormal",
          "tidak diperiksa"
        ]
      },
      {
        "nama": "keterangan_muskulos",
        "label": "Keterangan Muskulos",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "lainnya",
        "label": "Lainnya",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "resiko_jatuh",
        "label": "Resiko Jatuh",
        "tipe": "enum",
        "opsi": [
          "tidak berisiko",
          "berisiko sedang",
          "berisiko tinggi"
        ]
      },
      {
        "nama": "resiko_nutrisional",
        "label": "Resiko Nutrisional",
        "tipe": "enum",
        "opsi": [
          "tidak berisiko malnutrisi",
          "berisiko malnutrisi",
          "malnutrisi"
        ]
      },
      {
        "nama": "kebutuhan_fungsional",
        "label": "Kebutuhan Fungsional",
        "tipe": "enum",
        "opsi": [
          "tidak perlu bantuan",
          "perlu bantuan",
          "perlu bantuan total"
        ]
      },
      {
        "nama": "diagnosa_medis",
        "label": "Diagnosa Medis",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diagnosa_fungsi",
        "label": "Diagnosa Fungsi",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "penunjang_lain",
        "label": "Penunjang Lain",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "fisio",
        "label": "Fisio",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "okupasi",
        "label": "Okupasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "wicara",
        "label": "Wicara",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "akupuntur",
        "label": "Akupuntur",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tatalain",
        "label": "Tatalain",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "frekuensi_terapi",
        "label": "Frekuensi Terapi",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "fisioterapi",
        "label": "Fisioterapi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "terapi_okupasi",
        "label": "Terapi Okupasi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "terapi_wicara",
        "label": "Terapi Wicara",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "terapi_akupuntur",
        "label": "Terapi Akupuntur",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "terapi_lainnya",
        "label": "Terapi Lainnya",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "keluhan_utama",
      "rps"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-awal-medis-hemodialisa",
    "slug": "penilaian-awal-medis-hemodialisa",
    "judul": "Awal Medis Pasien Hemodialisa",
    "kategori": "M",
    "permissionKey": "penilaian_medis_ralan_hemodialisa",
    "javaRef": "RMPenilaianAwalMedisHemodialisa",
    "tabel": "penilaian_medis_hemodialisa",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ]
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "ruangan",
        "label": "Ruangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak nyeri",
          "nyeri ringan",
          "nyeri sedang",
          "nyeri berat",
          "nyeri sangat berat",
          "nyeri tak tertahankan"
        ]
      },
      {
        "nama": "status_nutrisi",
        "label": "Status Nutrisi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "hipertensi",
        "label": "Hipertensi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_hipertensi",
        "label": "Keterangan Hipertensi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "diabetes",
        "label": "Diabetes",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_diabetes",
        "label": "Keterangan Diabetes",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "batu_saluran_kemih",
        "label": "Batu Saluran Kemih",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_batu_saluran_kemih",
        "label": "Keterangan Batu Saluran Kemih",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "operasi_saluran_kemih",
        "label": "Operasi Saluran Kemih",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_operasi_saluran_kemih",
        "label": "Keterangan Operasi Saluran Kemih",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "infeksi_saluran_kemih",
        "label": "Infeksi Saluran Kemih",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_infeksi_saluran_kemih",
        "label": "Keterangan Infeksi Saluran Kemih",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "bengkak_seluruh_tubuh",
        "label": "Bengkak Seluruh Tubuh",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_bengkak_seluruh_tubuh",
        "label": "Keterangan Bengkak Seluruh Tubuh",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "urin_berdarah",
        "label": "Urin Berdarah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_urin_berdarah",
        "label": "Keterangan Urin Berdarah",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyakit_ginjal_laom",
        "label": "Penyakit Ginjal Laom",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_penyakit_ginjal_laom",
        "label": "Keterangan Penyakit Ginjal Laom",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "penyakit_lain",
        "label": "Penyakit Lain",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_penyakit_lain",
        "label": "Keterangan Penyakit Lain",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "konsumsi_obat_nefro",
        "label": "Konsumsi Obat Nefro",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_konsumsi_obat_nefro",
        "label": "Keterangan Konsumsi Obat Nefro",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "dialisis_pertama",
        "label": "Dialisis Pertama",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "pernah_cpad",
        "label": "Pernah Cpad",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_cpad",
        "label": "Tanggal Cpad",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "pernah_transplantasi",
        "label": "Pernah Transplantasi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_transplantasi",
        "label": "Tanggal Transplantasi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "sakit ringan",
          "sakit sedang",
          "sakit berat"
        ],
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
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
        "nama": "napas",
        "label": "Napas",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "hepatomegali",
        "label": "Hepatomegali",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "splenomegali",
        "label": "Splenomegali",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ascites",
        "label": "Ascites",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "edema",
        "label": "Edema",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "whezzing",
        "label": "Whezzing",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ronchi",
        "label": "Ronchi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ikterik",
        "label": "Ikterik",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tekanan_vena",
        "label": "Tekanan Vena",
        "tipe": "enum",
        "opsi": [
          "normal",
          "meningkat"
        ],
        "wajib": true
      },
      {
        "nama": "anemia",
        "label": "Anemia",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "kardiomegali",
        "label": "Kardiomegali",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "bising",
        "label": "Bising",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "thorax",
        "label": "Thorax",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_thorax",
        "label": "Tanggal Thorax",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "ekg",
        "label": "EKG",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_ekg",
        "label": "Tanggal EKG",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "bno",
        "label": "Bno",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_bno",
        "label": "Tanggal Bno",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "usg",
        "label": "USG",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_usg",
        "label": "Tanggal USG",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "renogram",
        "label": "Renogram",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_renogram",
        "label": "Tanggal Renogram",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "biopsi",
        "label": "Biopsi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_biopsi",
        "label": "Tanggal Biopsi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "ctscan",
        "label": "Ctscan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_ctscan",
        "label": "Tanggal Ctscan",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "arteriografi",
        "label": "Arteriografi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_arteriografi",
        "label": "Tanggal Arteriografi",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kultur_urin",
        "label": "Kultur Urin",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_kultur_urin",
        "label": "Tanggal Kultur Urin",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "laborat",
        "label": "Laborat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "tanggal_laborat",
        "label": "Tanggal Laborat",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "hematokrit",
        "label": "Hematokrit",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "hemoglobin",
        "label": "Hemoglobin",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "leukosit",
        "label": "Leukosit",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "trombosit",
        "label": "Trombosit",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "hitung_jenis",
        "label": "Hitung Jenis",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ureum",
        "label": "Ureum",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "urin_lengkap",
        "label": "Urin Lengkap",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "kreatinin",
        "label": "Kreatinin",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "cct",
        "label": "Cct",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "sgot",
        "label": "Sgot",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "sgpt",
        "label": "Sgpt",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "ct",
        "label": "Ct",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "asam_urat",
        "label": "Asam Urat",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "hbsag",
        "label": "Hbsag",
        "tipe": "enum",
        "opsi": [
          "non reaktif",
          "reaktif"
        ],
        "wajib": true
      },
      {
        "nama": "anti_hcv",
        "label": "Anti Hcv",
        "tipe": "enum",
        "opsi": [
          "non reaktif",
          "reaktif"
        ],
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "ruangan",
      "alergi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-pemeriksaan-ekg",
    "slug": "hasil-pemeriksaan-ekg",
    "judul": "Hasil Pemeriksaan EKG",
    "kategori": "M",
    "permissionKey": "hasil_pemeriksaan_ekg",
    "javaRef": "RMHasilPemeriksaanEKG",
    "tabel": "hasil_pemeriksaan_ekg",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "irama",
        "label": "Irama",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "laju_jantung",
        "label": "Laju Jantung",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "gelombangp",
        "label": "Gelombangp",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "intervalpr",
        "label": "Intervalpr",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "axis",
        "label": "Axis",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kompleksqrs",
        "label": "Kompleksqrs",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "segmenst",
        "label": "Segmenst",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal"
        ]
      },
      {
        "nama": "gelombangt",
        "label": "Gelombangt",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal"
        ]
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 200
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "irama",
      "laju_jantung"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-pemeriksaan-slit-lamp",
    "slug": "hasil-pemeriksaan-slit-lamp",
    "judul": "Hasil Pemeriksaan Slit Lamp",
    "kategori": "M",
    "permissionKey": "hasil_pemeriksaan_slit_lamp",
    "javaRef": "RMHasilPemeriksaanSlitLamp",
    "tabel": "hasil_pemeriksaan_slit_lamp",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hasil_pemeriksaan",
        "label": "Hasil Pemeriksaan",
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "hasil_pemeriksaan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-pemeriksaan-oct",
    "slug": "hasil-pemeriksaan-oct",
    "judul": "Hasil Pemeriksaan OCT",
    "kategori": "M",
    "permissionKey": "hasil_pemeriksaan_oct",
    "javaRef": "RMHasilPemeriksaanOCT",
    "tabel": "hasil_pemeriksaan_oct",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hasil_pemeriksaan",
        "label": "Hasil Pemeriksaan",
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "hasil_pemeriksaan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-pemeriksaan-echo",
    "slug": "hasil-pemeriksaan-echo",
    "judul": "Hasil Pemeriksaan ECHO",
    "kategori": "M",
    "permissionKey": "hasil_pemeriksaan_echo",
    "javaRef": "RMHasilPemeriksaanEcho",
    "tabel": "hasil_pemeriksaan_echo",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "sistolik",
        "label": "Sistolik",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "diastolic",
        "label": "Diastolic",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontraktilitas",
        "label": "Kontraktilitas",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "dimensi_ruang",
        "label": "Dimensi Ruang",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "katup",
        "label": "Katup",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "analisa_segmental",
        "label": "Analisa Segmental",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "erap",
        "label": "Erap",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "lain_lain",
        "label": "Lain Lain",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 200
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "sistolik",
      "diastolic",
      "kontraktilitas",
      "dimensi_ruang"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-endoskopi-faring-laring",
    "slug": "hasil-endoskopi-faring-laring",
    "judul": "Hasil Endoskopi Faring/Laring",
    "kategori": "M",
    "permissionKey": "hasil_endoskopi_faring_laring",
    "javaRef": "RMHasilEndoskopiFaringLaring",
    "tabel": "hasil_endoskopi_faring_laring",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "faring_uvula",
        "label": "Faring Uvula",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "faring_arkus_faring",
        "label": "Faring Arkus Faring",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "faring_dinding_posterior",
        "label": "Faring Dinding Posterior",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "faring_tonsil",
        "label": "Faring Tonsil",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_tonsil_lingual",
        "label": "Laring Tonsil Lingual",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_valekula",
        "label": "Laring Valekula",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_sinus_piriformis",
        "label": "Laring Sinus Piriformis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_epiglotis",
        "label": "Laring Epiglotis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_arytenoid",
        "label": "Laring Arytenoid",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_plika_ventrikularis",
        "label": "Laring Plika Ventrikularis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_pita_suara",
        "label": "Laring Pita Suara",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_rima_vocalis",
        "label": "Laring Rima Vocalis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "laring_lainlain",
        "label": "Laring Lainlain",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesan",
        "label": "Kesan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "faring_uvula",
      "faring_arkus_faring"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-endoskopi-hidung",
    "slug": "hasil-endoskopi-hidung",
    "judul": "Hasil Endoskopi Hidung",
    "kategori": "M",
    "permissionKey": "hasil_endoskopi_hidung",
    "javaRef": "RMHasilEndoskopiHidung",
    "tabel": "hasil_endoskopi_hidung",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kondisi_hidung_kanan",
        "label": "Kondisi Hidung Kanan",
        "tipe": "enum",
        "opsi": [
          "lapang",
          "sempit",
          "mukosa edema"
        ]
      },
      {
        "nama": "kondisi_hidung_kiri",
        "label": "Kondisi Hidung Kiri",
        "tipe": "enum",
        "opsi": [
          "lapang",
          "sempit",
          "mukosa edema"
        ]
      },
      {
        "nama": "kavum_nasi_kanan",
        "label": "Kavum Nasi Kanan",
        "tipe": "enum",
        "opsi": [
          "mukosa pucat",
          "mukosa hiperemis",
          "massa",
          "polip"
        ]
      },
      {
        "nama": "kavum_nasi_kiri",
        "label": "Kavum Nasi Kiri",
        "tipe": "enum",
        "opsi": [
          "mukosa pucat",
          "mukosa hiperemis",
          "massa",
          "polip"
        ]
      },
      {
        "nama": "konka_inferior_kanan",
        "label": "Konka Inferior Kanan",
        "tipe": "enum",
        "opsi": [
          "eutrofi",
          "hipertrofi",
          "atrofi"
        ]
      },
      {
        "nama": "konka_inferior_kiri",
        "label": "Konka Inferior Kiri",
        "tipe": "enum",
        "opsi": [
          "eutrofi",
          "hipertrofi",
          "atrofi"
        ]
      },
      {
        "nama": "meatus_medius_kanan",
        "label": "Meatus Medius Kanan",
        "tipe": "enum",
        "opsi": [
          "terbuka",
          "tertutup",
          "mukosa edema",
          "polip",
          "sekret"
        ]
      },
      {
        "nama": "meatus_medius_kiri",
        "label": "Meatus Medius Kiri",
        "tipe": "enum",
        "opsi": [
          "terbuka",
          "tertutup",
          "mukosa edema",
          "polip",
          "sekret"
        ]
      },
      {
        "nama": "septum_kanan",
        "label": "Septum Kanan",
        "tipe": "enum",
        "opsi": [
          "lurus",
          "deviasi",
          "spina"
        ]
      },
      {
        "nama": "septum_kiri",
        "label": "Septum Kiri",
        "tipe": "enum",
        "opsi": [
          "lurus",
          "deviasi",
          "spina"
        ]
      },
      {
        "nama": "nasofaring_kanan",
        "label": "Nasofaring Kanan",
        "tipe": "enum",
        "opsi": [
          "normal",
          "adenoid",
          "keradangan",
          "massa"
        ]
      },
      {
        "nama": "nasofaring_kiri",
        "label": "Nasofaring Kiri",
        "tipe": "enum",
        "opsi": [
          "normal",
          "adenoid",
          "keradangan",
          "massa"
        ]
      },
      {
        "nama": "lainlain_kanan",
        "label": "Lainlain Kanan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "lainlain_kiri",
        "label": "Lainlain Kiri",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "kondisi_hidung_kanan",
      "kondisi_hidung_kiri"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hasil-endoskopi-telinga",
    "slug": "hasil-endoskopi-telinga",
    "judul": "Hasil Endoskopi Telinga",
    "kategori": "M",
    "permissionKey": "hasil_endoskopi_telinga",
    "javaRef": "RMHasilEndoskopiTelinga",
    "tabel": "hasil_endoskopi_telinga",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_klinis",
        "label": "Diagnosa Klinis",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kiriman_dari",
        "label": "Kiriman Dari",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "bentuk_liang_telinga_kanan",
        "label": "Bentuk Liang Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "lapang",
          "sempit",
          "destruksi"
        ]
      },
      {
        "nama": "bentuk_liang_telinga_kiri",
        "label": "Bentuk Liang Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "lapang",
          "sempit",
          "destruksi"
        ]
      },
      {
        "nama": "kondisi_liang_telinga_kanan",
        "label": "Kondisi Liang Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "serumen",
          "sekret",
          "jamur",
          "kolesteatoma",
          "massa/jaringan",
          "benda asing",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_kondisi_liang_telinga_kanan",
        "label": "Keterangan Kondisi Liang Telinga Kanan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kondisi_liang_telinga_kiri",
        "label": "Kondisi Liang Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "serumen",
          "sekret",
          "jamur",
          "kolesteatoma",
          "massa/jaringan",
          "benda asing",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_kondisi_liang_telinga_kiri",
        "label": "Keterangan Kondisi Liang Telinga Kiri",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "membran_timpani_intak_kanan",
        "label": "Membran Timpani Intak Kanan",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hiperemis",
          "bulging",
          "retraksi",
          "sklerotik"
        ]
      },
      {
        "nama": "membran_timpani_intak_kiri",
        "label": "Membran Timpani Intak Kiri",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hiperemis",
          "bulging",
          "retraksi",
          "sklerotik"
        ]
      },
      {
        "nama": "membran_timpani_perforasi_kanan",
        "label": "Membran Timpani Perforasi Kanan",
        "tipe": "enum",
        "opsi": [
          "sentral",
          "atik",
          "marginal",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_membran_timpani_perforasi_kanan",
        "label": "Keterangan Membran Timpani Perforasi Kanan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "membran_timpani_perforasi_kiri",
        "label": "Membran Timpani Perforasi Kiri",
        "tipe": "enum",
        "opsi": [
          "sentral",
          "atik",
          "marginal",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_membran_timpani_perforasi_kiri",
        "label": "Keterangan Membran Timpani Perforasi Kiri",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kavum_timpani_mukosa_kanan",
        "label": "Kavum Timpani Mukosa Kanan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_mukosa_kiri",
        "label": "Kavum Timpani Mukosa Kiri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_osikel_kanan",
        "label": "Kavum Timpani Osikel Kanan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_osikel_kiri",
        "label": "Kavum Timpani Osikel Kiri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_isthmus_kanan",
        "label": "Kavum Timpani Isthmus Kanan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_isthmus_kiri",
        "label": "Kavum Timpani Isthmus Kiri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_anterior_kanan",
        "label": "Kavum Timpani Anterior Kanan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_anterior_kiri",
        "label": "Kavum Timpani Anterior Kiri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_posterior_kanan",
        "label": "Kavum Timpani Posterior Kanan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kavum_timpani_posterior_kiri",
        "label": "Kavum Timpani Posterior Kiri",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "lainlain_kanan",
        "label": "Lainlain Kanan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "lainlain_kiri",
        "label": "Lainlain Kiri",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "anjuran",
        "label": "Anjuran",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "diagnosa_klinis",
      "kiriman_dari",
      "bentuk_liang_telinga_kanan",
      "bentuk_liang_telinga_kiri"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-tambahan-geriatri",
    "slug": "penilaian-tambahan-geriatri",
    "judul": "Pengkajian Tambahan Pasien Geriatri",
    "kategori": "M",
    "permissionKey": "penilaian_tambahan_pasien_geriatri",
    "javaRef": "RMPenilaianTambahanGeriatri",
    "tabel": "penilaian_tambahan_geriatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "asal_masuk",
        "label": "Asal Masuk",
        "tipe": "enum",
        "opsi": [
          "igd",
          "kamar bersalin",
          "klinik"
        ]
      },
      {
        "nama": "kondisi_masuk",
        "label": "Kondisi Masuk",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "kursi roda",
          "dipapah",
          "tempat tidur"
        ]
      },
      {
        "nama": "keterangan_kondisi_masuk",
        "label": "Keterangan Kondisi Masuk",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "diagnosa_medis",
        "label": "Diagnosa Medis",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_immuno_telinga",
        "label": "Riwayat Immuno Telinga",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_sinus",
        "label": "Riwayat Immuno Sinus",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_antibiotik",
        "label": "Riwayat Immuno Antibiotik",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_pneumonia",
        "label": "Riwayat Immuno Pneumonia",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_abses",
        "label": "Riwayat Immuno Abses",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_sariawan",
        "label": "Riwayat Immuno Sariawan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_memerlukan_antibiotik",
        "label": "Riwayat Immuno Memerlukan Antibiotik",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_infeksi_dalam",
        "label": "Riwayat Immuno Infeksi Dalam",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_immunodefisiensi_primer",
        "label": "Riwayat Immuno Immunodefisiensi Primer",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_jenis_kangker",
        "label": "Riwayat Immuno Jenis Kangker",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_immuno_infeksi_oportunistik",
        "label": "Riwayat Immuno Infeksi Oportunistik",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "pola_aktifitas_tidur",
        "label": "Pola Aktifitas Tidur",
        "tipe": "enum",
        "opsi": [
          "tak",
          "insomnia",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_pola_aktifitas_tidur",
        "label": "Keterangan Pola Aktifitas Tidur",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pola_aktifitas_obat_tidur",
        "label": "Pola Aktifitas Obat Tidur",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_pola_aktifitas_obat_tidur",
        "label": "Keterangan Pola Aktifitas Obat Tidur",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pola_aktifitas_olahraga",
        "label": "Pola Aktifitas Olahraga",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_pola_aktifitas_olahraga",
        "label": "Keterangan Pola Aktifitas Olahraga",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kualitas_hidup_mobilitas",
        "label": "Kualitas Hidup Mobilitas",
        "tipe": "enum",
        "opsi": [
          "tidak mempunyai masalah untuk berjalan",
          "ada masalah untuk berjalan",
          "hanya mampu berbaring"
        ]
      },
      {
        "nama": "kualitas_hidup_perawatan_diri",
        "label": "Kualitas Hidup Perawatan Diri",
        "tipe": "enum",
        "opsi": [
          "tidak mempunyai kesulitan dalam perawatan diri sendiri",
          "mengalami kesulitan untuk membasuh badan, mandi atau berpakaian",
          "tidak mampu membasuh badan, mandi/berpakaian sendiri"
        ]
      },
      {
        "nama": "kualitas_hidup_aktifitas_seharihari",
        "label": "Kualitas Hidup Aktifitas Seharihari",
        "tipe": "enum",
        "opsi": [
          "tak mempunyai kesulitan dalam melaksanakan kegiatan sehari-hari",
          "mempunyai keterbatasan dalam melaksanakan kegiatan sehari-hari",
          "tak mampu melaksanakan kegiatan sehari-hari"
        ]
      },
      {
        "nama": "kualitas_hidup_rasa_nyeri",
        "label": "Kualitas Hidup Rasa Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak mempunyai keluhan rasa nyeri atau rasa tak nyaman",
          "suka merasakan agak nyeri/agak kurang nyaman",
          "menderita karena keluhan rasa nyeri/tidak nyaman"
        ]
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0 - tidak nyeri",
          "2 - dapat ditoleransi(aktifitas tidak tergangu)",
          "4 - dapat ditoleransi(beberapa aktifitas sedikit terganggu)",
          "5 - tidak dapat ditoleransi(masih bisa menggunakan telp, menonton tv/membaca)",
          "6 - tidak dapat ditoleransi(tidak bisa menggunakan telp, menonton tv/membaca)",
          "8 - tidak dapat ditoleransi(masih bisa berbicara kerenya nyeri)",
          "10 - tidak dapat ditoleransi(tidak bisa berbicara kerenya nyeri)"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nik",
      "asal_masuk",
      "kondisi_masuk",
      "keterangan_kondisi_masuk",
      "anamnesis"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-tambahan-bunuh-diri",
    "slug": "penilaian-tambahan-bunuh-diri",
    "judul": "Pengkajian Tambahan Bunuh Diri",
    "kategori": "M",
    "permissionKey": "penilaian_tambahan_bunuh_diri",
    "javaRef": "RMPenilaianTambahanBunuhDiri",
    "tabel": "penilaian_tambahan_bunuh_diri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "statik_hidup_sendiri",
        "label": "Statik Hidup Sendiri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorhidup_sendiri",
        "label": "Statik Skorhidup Sendiri",
        "tipe": "number"
      },
      {
        "nama": "statik_upaya_suicide",
        "label": "Statik Upaya Suicide",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorupaya_suicide",
        "label": "Statik Skorupaya Suicide",
        "tipe": "number"
      },
      {
        "nama": "statik_keluarga_suicide",
        "label": "Statik Keluarga Suicide",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorkeluarga_suicide",
        "label": "Statik Skorkeluarga Suicide",
        "tipe": "number"
      },
      {
        "nama": "statik_diagnosa_gangguan_jiwa",
        "label": "Statik Diagnosa Gangguan Jiwa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skordiagnosa_gangguan_jiwa",
        "label": "Statik Skordiagnosa Gangguan Jiwa",
        "tipe": "number"
      },
      {
        "nama": "statik_disabilitas_berat",
        "label": "Statik Disabilitas Berat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skordisabilitas_berat",
        "label": "Statik Skordisabilitas Berat",
        "tipe": "number"
      },
      {
        "nama": "statik_berpisah",
        "label": "Statik Berpisah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorberpisah",
        "label": "Statik Skorberpisah",
        "tipe": "number"
      },
      {
        "nama": "statik_kehilangan_kerja",
        "label": "Statik Kehilangan Kerja",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorkehilangan_kerja",
        "label": "Statik Skorkehilangan Kerja",
        "tipe": "number"
      },
      {
        "nama": "statik_skortotal",
        "label": "Statik Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "dinamis_ide_bunuh_diri",
        "label": "Dinamis Ide Bunuh Diri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skoride_bunuh_diri",
        "label": "Dinamis Skoride Bunuh Diri",
        "tipe": "number"
      },
      {
        "nama": "dinamis_maksud_suicide",
        "label": "Dinamis Maksud Suicide",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skormaksud_suicide",
        "label": "Dinamis Skormaksud Suicide",
        "tipe": "number"
      },
      {
        "nama": "dinamis_stress_berat",
        "label": "Dinamis Stress Berat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorstress_berat",
        "label": "Dinamis Skorstress Berat",
        "tipe": "number"
      },
      {
        "nama": "dinamis_keputusasaan",
        "label": "Dinamis Keputusasaan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkeputusasaan",
        "label": "Dinamis Skorkeputusasaan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_kejadian_signifikan",
        "label": "Dinamis Kejadian Signifikan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkejadian_signifikan",
        "label": "Dinamis Skorkejadian Signifikan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_kehilangan_kontrol",
        "label": "Dinamis Kehilangan Kontrol",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkehilangan_kontrol",
        "label": "Dinamis Skorkehilangan Kontrol",
        "tipe": "number"
      },
      {
        "nama": "dinamis_penggunaan_napza",
        "label": "Dinamis Penggunaan Napza",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorpenggunaan_napza",
        "label": "Dinamis Skorpenggunaan Napza",
        "tipe": "number"
      },
      {
        "nama": "dinamis_skortotal",
        "label": "Dinamis Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "faktor_faktor_pencegahan",
        "label": "Faktor Faktor Pencegahan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "uang"
      },
      {
        "nama": "level_skor",
        "label": "Level Skor",
        "tipe": "enum",
        "opsi": [
          "rendah(<7)",
          "sedang(7-14)",
          "tinggi(>14)"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "statik_hidup_sendiri",
      "statik_upaya_suicide",
      "statik_keluarga_suicide",
      "statik_diagnosa_gangguan_jiwa"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-tambahan-perilaku-kekerasan",
    "slug": "penilaian-tambahan-perilaku-kekerasan",
    "judul": "Pengkajian Tambahan Perilaku Kekerasan",
    "kategori": "M",
    "permissionKey": "penilaian_tambahan_perilaku_kekerasan",
    "javaRef": "RMPenilaianTambahanPerilakuKekerasan",
    "tabel": "penilaian_tambahan_perilaku_kekerasan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "statik_insiden_kekerasan_baru_ini",
        "label": "Statik Insiden Kekerasan Baru Ini",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorinsiden_kekerasan_baru_ini",
        "label": "Statik Skorinsiden Kekerasan Baru Ini",
        "tipe": "number"
      },
      {
        "nama": "statik_riwayat_penggunaan_senjata",
        "label": "Statik Riwayat Penggunaan Senjata",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorriwayat_penggunaan_senjata",
        "label": "Statik Skorriwayat Penggunaan Senjata",
        "tipe": "number"
      },
      {
        "nama": "statik_laki_laki",
        "label": "Statik Laki Laki",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorlaki_laki",
        "label": "Statik Skorlaki Laki",
        "tipe": "number"
      },
      {
        "nama": "statik_usia_dibawah_35",
        "label": "Statik Usia Dibawah 35",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorusia_dibawah_35",
        "label": "Statik Skorusia Dibawah 35",
        "tipe": "number"
      },
      {
        "nama": "statik_riwayat_kriminal",
        "label": "Statik Riwayat Kriminal",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorriwayat_kriminal",
        "label": "Statik Skorriwayat Kriminal",
        "tipe": "number"
      },
      {
        "nama": "statik_ide_kekerasan",
        "label": "Statik Ide Kekerasan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skoride_kekerasan",
        "label": "Statik Skoride Kekerasan",
        "tipe": "number"
      },
      {
        "nama": "statik_kekerasan_anak_anak",
        "label": "Statik Kekerasan Anak Anak",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorkekerasan_anak_anak",
        "label": "Statik Skorkekerasan Anak Anak",
        "tipe": "number"
      },
      {
        "nama": "statik_peran_dalam_hidup",
        "label": "Statik Peran Dalam Hidup",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorperan_dalam_hidup",
        "label": "Statik Skorperan Dalam Hidup",
        "tipe": "number"
      },
      {
        "nama": "statik_penggunaan_napza",
        "label": "Statik Penggunaan Napza",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorpenggunaan_napza",
        "label": "Statik Skorpenggunaan Napza",
        "tipe": "number"
      },
      {
        "nama": "statik_skortotal",
        "label": "Statik Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "dinamis_ide_melukai_orang_lain",
        "label": "Dinamis Ide Melukai Orang Lain",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skoride_melukai_orang_lain",
        "label": "Dinamis Skoride Melukai Orang Lain",
        "tipe": "number"
      },
      {
        "nama": "dinamis_akses_kekerasan",
        "label": "Dinamis Akses Kekerasan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorakses_kekerasan",
        "label": "Dinamis Skorakses Kekerasan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_ide_paranoid",
        "label": "Dinamis Ide Paranoid",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skoride_paranoid",
        "label": "Dinamis Skoride Paranoid",
        "tipe": "number"
      },
      {
        "nama": "dinamis_perintah_halusinasi",
        "label": "Dinamis Perintah Halusinasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorperintah_halusinasi",
        "label": "Dinamis Skorperintah Halusinasi",
        "tipe": "number"
      },
      {
        "nama": "dinamis_frustasi_agitasi",
        "label": "Dinamis Frustasi Agitasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorfrustasi_agitasi",
        "label": "Dinamis Skorfrustasi Agitasi",
        "tipe": "number"
      },
      {
        "nama": "dinamis_kesenangan_kekerasan",
        "label": "Dinamis Kesenangan Kekerasan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkesenangan_kekerasan",
        "label": "Dinamis Skorkesenangan Kekerasan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_seksual_tidak_wajar",
        "label": "Dinamis Seksual Tidak Wajar",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorseksual_tidak_wajar",
        "label": "Dinamis Skorseksual Tidak Wajar",
        "tipe": "number"
      },
      {
        "nama": "dinamis_hilangnya_kontrol_diri",
        "label": "Dinamis Hilangnya Kontrol Diri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorhilangnya_kontrol_diri",
        "label": "Dinamis Skorhilangnya Kontrol Diri",
        "tipe": "number"
      },
      {
        "nama": "dinamis_pengguaan_napza",
        "label": "Dinamis Pengguaan Napza",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorpengguaan_napza",
        "label": "Dinamis Skorpengguaan Napza",
        "tipe": "number"
      },
      {
        "nama": "dinamis_skortotal",
        "label": "Dinamis Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "faktor_faktor_pencegahan",
        "label": "Faktor Faktor Pencegahan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "uang"
      },
      {
        "nama": "level_skor",
        "label": "Level Skor",
        "tipe": "enum",
        "opsi": [
          "rendah(<7)",
          "sedang(7-14)",
          "tinggi(>14)"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "statik_insiden_kekerasan_baru_ini",
      "statik_riwayat_penggunaan_senjata",
      "statik_laki_laki",
      "statik_usia_dibawah_35"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-tambahan-melarikan-diri",
    "slug": "penilaian-tambahan-melarikan-diri",
    "judul": "Pengkajian Tambahan Melarikan Diri",
    "kategori": "M",
    "permissionKey": "penilaian_tambahan_beresiko_melarikan_diri",
    "javaRef": "RMPenilaianTambahanMelarikanDiri",
    "tabel": "penilaian_tambahan_beresiko_melarikan_diri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "statik_riwayat_melarikan_diri",
        "label": "Statik Riwayat Melarikan Diri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorriwayat_melarikan_diri",
        "label": "Statik Skorriwayat Melarikan Diri",
        "tipe": "number"
      },
      {
        "nama": "statik_riwayat_penolakan_pengobatan",
        "label": "Statik Riwayat Penolakan Pengobatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorriwayat_penolakan_pengobatan",
        "label": "Statik Skorriwayat Penolakan Pengobatan",
        "tipe": "number"
      },
      {
        "nama": "statik_usia_dibawah_35",
        "label": "Statik Usia Dibawah 35",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorusia_dibawah_35",
        "label": "Statik Skorusia Dibawah 35",
        "tipe": "number"
      },
      {
        "nama": "statik_laki_laki",
        "label": "Statik Laki Laki",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorlaki_laki",
        "label": "Statik Skorlaki Laki",
        "tipe": "number"
      },
      {
        "nama": "statik_diagnosis_skizofrenia",
        "label": "Statik Diagnosis Skizofrenia",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skordiagnosis_skizofrenia",
        "label": "Statik Skordiagnosis Skizofrenia",
        "tipe": "number"
      },
      {
        "nama": "statik_belum_menikah",
        "label": "Statik Belum Menikah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorbelum_menikah",
        "label": "Statik Skorbelum Menikah",
        "tipe": "number"
      },
      {
        "nama": "statik_riwayat_penggunaan_napza",
        "label": "Statik Riwayat Penggunaan Napza",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skoriwayat_penggunaan_napza",
        "label": "Statik Skoriwayat Penggunaan Napza",
        "tipe": "number"
      },
      {
        "nama": "statik_diagnosis_gangguan_kepribadian",
        "label": "Statik Diagnosis Gangguan Kepribadian",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skordiagnosis_gangguan_kepribadian",
        "label": "Statik Skordiagnosis Gangguan Kepribadian",
        "tipe": "number"
      },
      {
        "nama": "statik_riwayat_kriminal",
        "label": "Statik Riwayat Kriminal",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "statik_skorriwayat_kriminal",
        "label": "Statik Skorriwayat Kriminal",
        "tipe": "number"
      },
      {
        "nama": "statik_skortotal",
        "label": "Statik Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "dinamis_anti_treatment",
        "label": "Dinamis Anti Treatment",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skoranti_treatment",
        "label": "Dinamis Skoranti Treatment",
        "tipe": "number"
      },
      {
        "nama": "dinamis_penggunaan_napza",
        "label": "Dinamis Penggunaan Napza",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorpenggunaan_napza",
        "label": "Dinamis Skorpenggunaan Napza",
        "tipe": "number"
      },
      {
        "nama": "dinamis_kebosanan",
        "label": "Dinamis Kebosanan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkebosanan",
        "label": "Dinamis Skorkebosanan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_perintah_halusinasi",
        "label": "Dinamis Perintah Halusinasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorperintah_halusinasi",
        "label": "Dinamis Skorperintah Halusinasi",
        "tipe": "number"
      },
      {
        "nama": "dinamis_hilangnya_kontrol_diri",
        "label": "Dinamis Hilangnya Kontrol Diri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorhilangnya_kontrol_diri",
        "label": "Dinamis Skorhilangnya Kontrol Diri",
        "tipe": "number"
      },
      {
        "nama": "dinamis_seksual_tidak_wajar",
        "label": "Dinamis Seksual Tidak Wajar",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorseksual_tidak_wajar",
        "label": "Dinamis Skorseksual Tidak Wajar",
        "tipe": "number"
      },
      {
        "nama": "dinamis_kemarahan_frustasi",
        "label": "Dinamis Kemarahan Frustasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorkemarahan_frustasi",
        "label": "Dinamis Skorkemarahan Frustasi",
        "tipe": "number"
      },
      {
        "nama": "dinamis_ketakutan_perawatan",
        "label": "Dinamis Ketakutan Perawatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          "tidak tahu"
        ]
      },
      {
        "nama": "dinamis_skorketakutan_perawatan",
        "label": "Dinamis Skorketakutan Perawatan",
        "tipe": "number"
      },
      {
        "nama": "dinamis_skortotal",
        "label": "Dinamis Skortotal",
        "tipe": "uang"
      },
      {
        "nama": "faktor_faktor_pencegahan",
        "label": "Faktor Faktor Pencegahan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "uang"
      },
      {
        "nama": "level_skor",
        "label": "Level Skor",
        "tipe": "enum",
        "opsi": [
          "rendah(<7)",
          "sedang(7-14)",
          "tinggi(>14)"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "statik_riwayat_melarikan_diri",
      "statik_riwayat_penolakan_pengobatan",
      "statik_usia_dibawah_35",
      "statik_laki_laki"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pasien-terminal",
    "slug": "penilaian-pasien-terminal",
    "judul": "Pengkajian Pasien Terminal",
    "kategori": "M",
    "permissionKey": "penilaian_pasien_terminal",
    "javaRef": "RMPenilaianPasienTerminal",
    "tabel": "penilaian_pasien_terminal",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "sedang",
          "jelek",
          "sangat jelek"
        ]
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "delirium",
          "samnolen",
          "sopor",
          "koma"
        ]
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "tahap_pasien_menjelang_ajal",
        "label": "Tahap Pasien Menjelang Ajal",
        "tipe": "enum",
        "opsi": [
          "menolak",
          "marah",
          "menawar",
          "depresi",
          "menerima"
        ]
      },
      {
        "nama": "tanda_klinis_menjelang_kematian",
        "label": "Tanda Klinis Menjelang Kematian",
        "tipe": "enum",
        "opsi": [
          "kurang/tidak responsif",
          "nadi cepat & melemah",
          "pernapasan tidak teratur & dangkal/ngorok",
          "kulit pucat",
          "ekstrimitas dingin",
          "defekasi/berkemih tidak sengaja",
          "mata tidak respon cahaya",
          "penurunan tonus otot"
        ]
      },
      {
        "nama": "kebutuhan_spiritual_pasien",
        "label": "Kebutuhan Spiritual Pasien",
        "tipe": "text",
        "maks": 500
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
      "no_rawat",
      "diagnosa",
      "rps",
      "rpd",
      "keadaan_umum",
      "kesadaran"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-korban-kekerasan",
    "slug": "penilaian-korban-kekerasan",
    "judul": "Pengkajian Korban Kekerasan",
    "kategori": "M",
    "permissionKey": "penilaian_korban_kekerasan",
    "javaRef": "RMPenilaianKorbanKekerasan",
    "tabel": "penilaian_korban_kekerasan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ]
      },
      {
        "nama": "hubungan_dengan_pasien",
        "label": "Hubungan Dengan Pasien",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "jumlah_saudara",
        "label": "Jumlah Saudara",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "kondisi_keluaga",
        "label": "Kondisi Keluaga",
        "tipe": "enum",
        "opsi": [
          "bahagia",
          "broken home"
        ]
      },
      {
        "nama": "hubungan_orang_terdekat",
        "label": "Hubungan Orang Terdekat",
        "tipe": "enum",
        "opsi": [
          "ada masalah",
          "tidak ada masalah"
        ]
      },
      {
        "nama": "kekerasan_yang_dialami",
        "label": "Kekerasan Yang Dialami",
        "tipe": "text",
        "maks": 350
      },
      {
        "nama": "tempat_kejadian",
        "label": "Tempat Kejadian",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "lama_kekerasan",
        "label": "Lama Kekerasan",
        "tipe": "number"
      },
      {
        "nama": "periode_kekerasan",
        "label": "Periode Kekerasan",
        "tipe": "enum",
        "opsi": [
          "hari",
          "bulan",
          "tahun"
        ]
      },
      {
        "nama": "seberapa_sering_mengalami",
        "label": "Seberapa Sering Mengalami",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "pemicu_kekerasan",
        "label": "Pemicu Kekerasan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "yang_melakukan_kekerasan",
        "label": "Yang Melakukan Kekerasan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "dampak_kekerasan",
        "label": "Dampak Kekerasan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tanda_tanda_didapatkan",
        "label": "Tanda Tanda Didapatkan",
        "tipe": "text",
        "maks": 350
      },
      {
        "nama": "memerlukan_pendampingan",
        "label": "Memerlukan Pendampingan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_kelainan",
        "label": "Riwayat Kelainan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_kepala",
        "label": "Pemeriksaan Kepala",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_thoraks",
        "label": "Pemeriksaan Thoraks",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_leher",
        "label": "Pemeriksaan Leher",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_abdomen",
        "label": "Pemeriksaan Abdomen",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_genitalia",
        "label": "Pemeriksaan Genitalia",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_ekstrimitas_atas",
        "label": "Pemeriksaan Ekstrimitas Atas",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pemeriksaan_ekstrimitas_bawah",
        "label": "Pemeriksaan Ekstrimitas Bawah",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_anus",
        "label": "Pemeriksaan Anus",
        "tipe": "text",
        "maks": 50
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
      "no_rawat",
      "informasi",
      "hubungan_dengan_pasien",
      "jumlah_saudara",
      "kondisi_keluaga",
      "hubungan_orang_terdekat"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pasien-penyakit-menular",
    "slug": "penilaian-pasien-penyakit-menular",
    "judul": "Pengkajian Pasien Penyakit Menular",
    "kategori": "M",
    "permissionKey": "penilaian_pasien_penyakit_menular",
    "javaRef": "RMPenilaianPasienPenyakitMenular",
    "tabel": "penilaian_pasien_penyakit_menular",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pasien_mengetahui_kondisi_penyakitnya",
        "label": "Pasien Mengetahui Kondisi Penyakitnya",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_sama_serumah",
        "label": "Penyakit Sama Serumah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_kontak",
        "label": "Riwayat Kontak",
        "tipe": "enum",
        "opsi": [
          "bekerja di daerah klb",
          "merawat pasien penyakit infeksi",
          "berkunjung ke daerah endemik dalam 2 minggu terakhir",
          "bekerja di laboratorium",
          "kontak langsung",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_riwayat_kontak",
        "label": "Keterangan Riwayat Kontak",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "transmisi_penularan_penyakit",
        "label": "Transmisi Penularan Penyakit",
        "tipe": "enum",
        "opsi": [
          "airborne",
          "droplet",
          "kontak langsung",
          "cairan tubuh lainnya",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_transmisi_penularan_penyakit",
        "label": "Keterangan Transmisi Penularan Penyakit",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "kebutuhan_ruang_rawat",
        "label": "Kebutuhan Ruang Rawat",
        "tipe": "enum",
        "opsi": [
          "isolasi",
          "ruang biasa",
          "icu",
          "icu isolasi"
        ]
      },
      {
        "nama": "keluhan_yang_dirasakan_saat_ini",
        "label": "Keluhan Yang Dirasakan Saat Ini",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_penyakit_keluarga",
        "label": "Riwayat Penyakit Keluarga",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_alergi",
        "label": "Riwayat Alergi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_vaksinasi",
        "label": "Riwayat Vaksinasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_pengobatan",
        "label": "Riwayat Pengobatan",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "diagnosa_utama",
        "label": "Diagnosa Utama",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diagnosa_tambahan",
        "label": "Diagnosa Tambahan",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "pasien_mengetahui_kondisi_penyakitnya",
      "penyakit_sama_serumah"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pasien-imunitas-rendah",
    "slug": "penilaian-pasien-imunitas-rendah",
    "judul": "Pengkajian Pasien Imunitas Rendah",
    "kategori": "M",
    "permissionKey": "penilaian_pasien_imunitas_rendah",
    "javaRef": "RMPenilaianPasienImunitasRendah",
    "tabel": "penilaian_pasien_imunitas_rendah",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ]
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pasien_mengetahui_kondisi_penyakitnya",
        "label": "Pasien Mengetahui Kondisi Penyakitnya",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "kebutuhan_ruang_perawatan",
        "label": "Kebutuhan Ruang Perawatan",
        "tipe": "enum",
        "opsi": [
          "isolasi",
          "ruang rawat biasa",
          "icu",
          "icu isolasi"
        ]
      },
      {
        "nama": "riwayat_penyakit_keluhan",
        "label": "Riwayat Penyakit Keluhan",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_penyakit_keluarga",
        "label": "Riwayat Penyakit Keluarga",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_alergi",
        "label": "Riwayat Alergi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_vaksinasi",
        "label": "Riwayat Vaksinasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_pengobatan",
        "label": "Riwayat Pengobatan",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "diagnosa_utama",
        "label": "Diagnosa Utama",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diagnosa_tambahan",
        "label": "Diagnosa Tambahan",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "pasien_mengetahui_kondisi_penyakitnya",
      "kebutuhan_ruang_perawatan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-derajat-dehidrasi",
    "slug": "penilaian-derajat-dehidrasi",
    "judul": "Pengkajian Derajat Dehidrasi",
    "kategori": "M",
    "permissionKey": "penilaian_derajat_dehidrasi",
    "javaRef": "RMPenilaianDerajatDehidrasi",
    "tabel": "penilaian_dehidrasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian1",
        "label": "Penilaian1",
        "tipe": "enum",
        "opsi": [
          "baik",
          "lesu/haus",
          "gelisah, haus, mengantuk, hingga syok"
        ]
      },
      {
        "nama": "penilaian_nilai1",
        "label": "Penilaian Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian2",
        "label": "Penilaian2",
        "tipe": "enum",
        "opsi": [
          "biasa",
          "cekung",
          "sangat cekung"
        ]
      },
      {
        "nama": "penilaian_nilai2",
        "label": "Penilaian Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian3",
        "label": "Penilaian3",
        "tipe": "enum",
        "opsi": [
          "biasa",
          "kering",
          "sangat kering"
        ]
      },
      {
        "nama": "penilaian_nilai3",
        "label": "Penilaian Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian4",
        "label": "Penilaian4",
        "tipe": "enum",
        "opsi": [
          "< 30 x/menit",
          "30 - 40 x/menit",
          "> 40 x/menit"
        ]
      },
      {
        "nama": "penilaian_nilai4",
        "label": "Penilaian Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian5",
        "label": "Penilaian5",
        "tipe": "enum",
        "opsi": [
          "baik",
          "kurang",
          "jelek"
        ]
      },
      {
        "nama": "penilaian_nilai5",
        "label": "Penilaian Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian6",
        "label": "Penilaian6",
        "tipe": "enum",
        "opsi": [
          "< 120 x/menit",
          "120 - 140 x/menit",
          "> 140 x/menit"
        ]
      },
      {
        "nama": "penilaian_nilai6",
        "label": "Penilaian Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_totalnilai",
        "label": "Penilaian Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_penilaian",
        "label": "Hasil Penilaian",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "penilaian1",
      "penilaian2",
      "penilaian3",
      "penilaian4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_nilai1",
      "label": "Total Penilaian Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pasien-keracunan",
    "slug": "penilaian-pasien-keracunan",
    "judul": "Pengkajian Pasien Keracunan",
    "kategori": "M",
    "permissionKey": "penilaian_pasien_keracunan",
    "javaRef": "RMPenilaianPasienKeracunan",
    "tabel": "penilaian_pasien_keracunan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "hubungan",
        "label": "Hubungan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tempat_kejadian",
        "label": "Tempat Kejadian",
        "tipe": "enum",
        "opsi": [
          "rumah",
          "kantor",
          "tempat kerja",
          "tempat hiburan",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_tempat_kejadian",
        "label": "Keterangan Tempat Kejadian",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "riwayat_penyakit_sekarang",
        "label": "Riwayat Penyakit Sekarang",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "hamil",
        "label": "Hamil",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "menyusui",
        "label": "Menyusui",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyebab",
        "label": "Penyebab",
        "tipe": "enum",
        "opsi": [
          "napza",
          "obat",
          "obat tradisional",
          "makanan/minuman",
          "suplemen makanan/vitamin",
          "kosmetik",
          "bahan kimia",
          "pestisida",
          "gigitan ular",
          "binatang selain ular",
          "tumbuhan beracun",
          "pencemar lingkungan",
          "gas",
          "tidak diketahui"
        ]
      },
      {
        "nama": "nama_bahan",
        "label": "Nama Bahan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "jumlah_bahan",
        "label": "Jumlah Bahan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tipe_pemaparan",
        "label": "Tipe Pemaparan",
        "tipe": "enum",
        "opsi": [
          "mulut",
          "mata",
          "gigitan",
          "injeksi",
          "inhalasi",
          "sengatan",
          "kulit",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_tipe_pemaparan",
        "label": "Keterangan Tipe Pemaparan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "tipe_kejadian",
        "label": "Tipe Kejadian",
        "tipe": "enum",
        "opsi": [
          "tidak disengaja",
          "disengaja",
          "tidak diketahui"
        ]
      },
      {
        "nama": "bau_bahan",
        "label": "Bau Bahan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "keterangan_bau_bahan",
        "label": "Keterangan Bau Bahan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "pupil",
        "label": "Pupil",
        "tipe": "enum",
        "opsi": [
          "normal",
          "isokor",
          "unisokor",
          "miosis",
          "midriasis",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_pupil",
        "label": "Keterangan Pupil",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "apatis",
          "somnolen",
          "sopor",
          "koma"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo",
        "label": "Spo",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "urine",
        "label": "Urine",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pengobatan_sebelum_igd",
        "label": "Pengobatan Sebelum IGD",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "pemeriksaan_penunjang",
        "label": "Pemeriksaan Penunjang",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "penatalaksanaan_diberikan",
        "label": "Penatalaksanaan Diberikan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "tindak_lanjut",
        "label": "Tindak Lanjut",
        "tipe": "enum",
        "opsi": [
          "rawat jalan",
          "rawat inap",
          "dirujuk",
          "pulang aps",
          "pulang sembuh",
          "meninggal"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "anamnesis",
      "hubungan",
      "tempat_kejadian",
      "keterangan_tempat_kejadian"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-level-kecemasan-ranap-anak",
    "slug": "penilaian-level-kecemasan-ranap-anak",
    "judul": "Pengkajian Level Kecemasan Ranap Anak",
    "kategori": "M",
    "permissionKey": "penilaian_level_kecemasan_ranap_anak",
    "javaRef": "RMPenilaianLevelKecemasanRanapAnak",
    "tabel": "penilaian_level_kecemasan_ranap_anak",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "cemas",
        "label": "Cemas",
        "tipe": "number"
      },
      {
        "nama": "firasat_buruk",
        "label": "Firasat Buruk",
        "tipe": "number"
      },
      {
        "nama": "takut_pikiran_sendiri",
        "label": "Takut Pikiran Sendiri",
        "tipe": "number"
      },
      {
        "nama": "mudah_tersinggung",
        "label": "Mudah Tersinggung",
        "tipe": "number"
      },
      {
        "nama": "merasa_tegang",
        "label": "Merasa Tegang",
        "tipe": "number"
      },
      {
        "nama": "lesu",
        "label": "Lesu",
        "tipe": "number"
      },
      {
        "nama": "tak_bisa_istirahat_tenang",
        "label": "Tak Bisa Istirahat Tenang",
        "tipe": "number"
      },
      {
        "nama": "mudah_terkejut",
        "label": "Mudah Terkejut",
        "tipe": "number"
      },
      {
        "nama": "mudah_menangis",
        "label": "Mudah Menangis",
        "tipe": "number"
      },
      {
        "nama": "gemetar",
        "label": "Gemetar",
        "tipe": "number"
      },
      {
        "nama": "gelisah",
        "label": "Gelisah",
        "tipe": "number"
      },
      {
        "nama": "takut_pada_gelap",
        "label": "Takut Pada Gelap",
        "tipe": "number"
      },
      {
        "nama": "takut_pada_orangasing",
        "label": "Takut Pada Orangasing",
        "tipe": "number"
      },
      {
        "nama": "takut_pada_kerumunan_banyak_orang",
        "label": "Takut Pada Kerumunan Banyak Orang",
        "tipe": "number"
      },
      {
        "nama": "takut_pada_binatang_besar",
        "label": "Takut Pada Binatang Besar",
        "tipe": "uang"
      },
      {
        "nama": "takut_pada_keramaian_lalu_lintas",
        "label": "Takut Pada Keramaian Lalu Lintas",
        "tipe": "number"
      },
      {
        "nama": "takut_ditinggal_sendiri",
        "label": "Takut Ditinggal Sendiri",
        "tipe": "number"
      },
      {
        "nama": "sulit_tidur",
        "label": "Sulit Tidur",
        "tipe": "number"
      },
      {
        "nama": "terbangun_malam_hari",
        "label": "Terbangun Malam Hari",
        "tipe": "number"
      },
      {
        "nama": "tidur_tidak_nyeyak",
        "label": "Tidur Tidak Nyeyak",
        "tipe": "number"
      },
      {
        "nama": "mimpi_buruk",
        "label": "Mimpi Buruk",
        "tipe": "number"
      },
      {
        "nama": "bangun_dengan_lesu",
        "label": "Bangun Dengan Lesu",
        "tipe": "number"
      },
      {
        "nama": "banyak_mengalami_mimpi",
        "label": "Banyak Mengalami Mimpi",
        "tipe": "number"
      },
      {
        "nama": "mimpi_menakutkan",
        "label": "Mimpi Menakutkan",
        "tipe": "number"
      },
      {
        "nama": "sulit_konsentrasi",
        "label": "Sulit Konsentrasi",
        "tipe": "number"
      },
      {
        "nama": "daya_ingat_buruk",
        "label": "Daya Ingat Buruk",
        "tipe": "number"
      },
      {
        "nama": "hilangnya_minat",
        "label": "Hilangnya Minat",
        "tipe": "number"
      },
      {
        "nama": "berkurangnya_kesenangan_pada_hobi",
        "label": "Berkurangnya Kesenangan Pada Hobi",
        "tipe": "number"
      },
      {
        "nama": "sedih",
        "label": "Sedih",
        "tipe": "number"
      },
      {
        "nama": "bangun_dini_hari",
        "label": "Bangun Dini Hari",
        "tipe": "number"
      },
      {
        "nama": "perasaan_berubah",
        "label": "Perasaan Berubah",
        "tipe": "number"
      },
      {
        "nama": "sakit_nyeri_di_otot",
        "label": "Sakit Nyeri Di Otot",
        "tipe": "number"
      },
      {
        "nama": "kaku",
        "label": "Kaku",
        "tipe": "number"
      },
      {
        "nama": "kedutan_otot",
        "label": "Kedutan Otot",
        "tipe": "number"
      },
      {
        "nama": "gigi_gemerutuk",
        "label": "Gigi Gemerutuk",
        "tipe": "number"
      },
      {
        "nama": "suara_tidak_stabil",
        "label": "Suara Tidak Stabil",
        "tipe": "number"
      },
      {
        "nama": "tinnitus",
        "label": "Tinnitus",
        "tipe": "number"
      },
      {
        "nama": "penglihatan_kabur",
        "label": "Penglihatan Kabur",
        "tipe": "number"
      },
      {
        "nama": "muka_merah_gejala_somatic",
        "label": "Muka Merah Gejala Somatic",
        "tipe": "number"
      },
      {
        "nama": "merasa_lemah",
        "label": "Merasa Lemah",
        "tipe": "number"
      },
      {
        "nama": "perasaan_ditusuk",
        "label": "Perasaan Ditusuk",
        "tipe": "number"
      },
      {
        "nama": "takhikardia",
        "label": "Takhikardia",
        "tipe": "number"
      },
      {
        "nama": "berdebar",
        "label": "Berdebar",
        "tipe": "number"
      },
      {
        "nama": "nyeri_di_dada",
        "label": "Nyeri Di Dada",
        "tipe": "number"
      },
      {
        "nama": "denyut_nadi_mengeras",
        "label": "Denyut Nadi Mengeras",
        "tipe": "number"
      },
      {
        "nama": "perasaan_lesu",
        "label": "Perasaan Lesu",
        "tipe": "number"
      },
      {
        "nama": "detak_jantung_menghilang",
        "label": "Detak Jantung Menghilang",
        "tipe": "number"
      },
      {
        "nama": "merasa_tertekan",
        "label": "Merasa Tertekan",
        "tipe": "number"
      },
      {
        "nama": "perasaan_tercekik",
        "label": "Perasaan Tercekik",
        "tipe": "number"
      },
      {
        "nama": "sering_menarik_napas",
        "label": "Sering Menarik Napas",
        "tipe": "number"
      },
      {
        "nama": "napas_pendek",
        "label": "Napas Pendek",
        "tipe": "number"
      },
      {
        "nama": "bulu_berdiri",
        "label": "Bulu Berdiri",
        "tipe": "number"
      },
      {
        "nama": "sulit_menelan",
        "label": "Sulit Menelan",
        "tipe": "number"
      },
      {
        "nama": "perut_melilit",
        "label": "Perut Melilit",
        "tipe": "number"
      },
      {
        "nama": "ganguan_pencernaan",
        "label": "Ganguan Pencernaan",
        "tipe": "number"
      },
      {
        "nama": "rasa_kembung",
        "label": "Rasa Kembung",
        "tipe": "number"
      },
      {
        "nama": "nyeri_makan",
        "label": "Nyeri Makan",
        "tipe": "number"
      },
      {
        "nama": "terbakar_perut",
        "label": "Terbakar Perut",
        "tipe": "number"
      },
      {
        "nama": "sukar_bab",
        "label": "Sukar Bab",
        "tipe": "number"
      },
      {
        "nama": "muntah",
        "label": "Muntah",
        "tipe": "number"
      },
      {
        "nama": "bab_lembek",
        "label": "Bab Lembek",
        "tipe": "number"
      },
      {
        "nama": "kehilangan_bb",
        "label": "Kehilangan BB",
        "tipe": "number"
      },
      {
        "nama": "mual",
        "label": "Mual",
        "tipe": "number"
      },
      {
        "nama": "sering_bak",
        "label": "Sering Bak",
        "tipe": "number"
      },
      {
        "nama": "tidak_bisa_menahan_kencing",
        "label": "Tidak Bisa Menahan Kencing",
        "tipe": "number"
      },
      {
        "nama": "menjadi_dingin",
        "label": "Menjadi Dingin",
        "tipe": "number"
      },
      {
        "nama": "manorrhagia",
        "label": "Manorrhagia",
        "tipe": "number"
      },
      {
        "nama": "amenorrhoea",
        "label": "Amenorrhoea",
        "tipe": "number"
      },
      {
        "nama": "ejakulasi_praecocks",
        "label": "Ejakulasi Praecocks",
        "tipe": "number"
      },
      {
        "nama": "ereksi_hilang",
        "label": "Ereksi Hilang",
        "tipe": "number"
      },
      {
        "nama": "impotensi",
        "label": "Impotensi",
        "tipe": "number"
      },
      {
        "nama": "mulut_kering",
        "label": "Mulut Kering",
        "tipe": "number"
      },
      {
        "nama": "muka_merah_gejala_otonom",
        "label": "Muka Merah Gejala Otonom",
        "tipe": "number"
      },
      {
        "nama": "mudah_berkeringat",
        "label": "Mudah Berkeringat",
        "tipe": "number"
      },
      {
        "nama": "bulu_berdiri_gejala_otonom",
        "label": "Bulu Berdiri Gejala Otonom",
        "tipe": "number"
      },
      {
        "nama": "sakit_kepala",
        "label": "Sakit Kepala",
        "tipe": "number"
      },
      {
        "nama": "gelisah_wawancara",
        "label": "Gelisah Wawancara",
        "tipe": "number"
      },
      {
        "nama": "napas_pendek_wawancara",
        "label": "Napas Pendek Wawancara",
        "tipe": "number"
      },
      {
        "nama": "jari_gemetar",
        "label": "Jari Gemetar",
        "tipe": "number"
      },
      {
        "nama": "kerut_kening",
        "label": "Kerut Kening",
        "tipe": "number"
      },
      {
        "nama": "muka_tegang",
        "label": "Muka Tegang",
        "tipe": "number"
      },
      {
        "nama": "tonus_meningkat",
        "label": "Tonus Meningkat",
        "tipe": "number"
      },
      {
        "nama": "tidak_tenang",
        "label": "Tidak Tenang",
        "tipe": "number"
      },
      {
        "nama": "muka_merah_wawancara",
        "label": "Muka Merah Wawancara",
        "tipe": "number"
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "uang"
      },
      {
        "nama": "keterangan_skor",
        "label": "Keterangan Skor",
        "tipe": "enum",
        "opsi": [
          "tidak mengalami kecemasan",
          "kecemasan ringan",
          "kecemasan sedang",
          "kecemasan berat",
          "kecemasan sangat berat"
        ]
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
      "no_rawat",
      "tanggal",
      "keterangan_skor",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-igd",
    "slug": "catatan-observasi-igd",
    "judul": "Catatan Observasi IGD",
    "kategori": "M",
    "permissionKey": "catatan_observasi_igd",
    "javaRef": "RMDataCatatanObservasiIGD",
    "tabel": "catatan_observasi_igd",
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
        "nama": "gcs",
        "label": "Gcs",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "td",
        "label": "Td",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "hr",
        "label": "Hr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "Rr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "gcs",
      "td",
      "hr",
      "rr",
      "suhu"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-ranap",
    "slug": "catatan-observasi-ranap",
    "judul": "Catatan Observasi Ranap",
    "kategori": "M",
    "permissionKey": "catatan_observasi_ranap",
    "javaRef": "RMDataCatatanObservasiRanap",
    "tabel": "catatan_observasi_ranap",
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
        "nama": "gcs",
        "label": "Gcs",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "td",
        "label": "Td",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "hr",
        "label": "Hr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "Rr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "gcs",
      "td",
      "hr",
      "rr",
      "suhu"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-ranap-kebidanan",
    "slug": "catatan-observasi-ranap-kebidanan",
    "judul": "Catatan Observasi Ranap Kebidanan",
    "kategori": "M",
    "permissionKey": "catatan_observasi_ranap_kebidanan",
    "javaRef": "RMDataCatatanObservasiRanapKebidanan",
    "tabel": "catatan_observasi_ranap_kebidanan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "kontraksi",
        "label": "Kontraksi",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "bjj",
        "label": "Bjj",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "ppv",
        "label": "Ppv",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "vt",
        "label": "Vt",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "gcs",
      "td",
      "hr"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-ranap-post-partum",
    "slug": "catatan-observasi-ranap-post-partum",
    "judul": "Catatan Observasi Ranap Post Partum",
    "kategori": "M",
    "permissionKey": "catatan_observasi_ranap_postpartum",
    "javaRef": "RMDataCatatanObservasiRanapPostPartum",
    "tabel": "catatan_observasi_ranap_postpartum",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "tfu",
        "label": "Tfu",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kontraksi",
        "label": "Kontraksi",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "perdarahan",
        "label": "Perdarahan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "gcs",
      "td",
      "hr"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-bayi",
    "slug": "catatan-observasi-bayi",
    "judul": "Catatan Observasi Bayi",
    "kategori": "M",
    "permissionKey": "catatan_observasi_bayi",
    "javaRef": "RMDataCatatanObservasiBayi",
    "tabel": "catatan_observasi_bayi",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "nch",
        "label": "Nch",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "ikterik_status",
        "label": "Ikterik Status",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "retraksi_dada",
        "label": "Retraksi Dada",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "ogt_residu",
        "label": "Ogt Residu",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "asi_jumlah",
        "label": "Asi Jumlah",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "pasi_jumlah",
        "label": "Pasi Jumlah",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "bak_status",
        "label": "Bak Status",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "bab_status",
        "label": "Bab Status",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "gcs",
      "td",
      "hr"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-chbp",
    "slug": "catatan-observasi-chbp",
    "judul": "Catatan Observasi CHBP",
    "kategori": "M",
    "permissionKey": "catatan_observasi_chbp",
    "javaRef": "RMDataCatatanObservasiCHBP",
    "tabel": "catatan_observasi_chbp",
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
        "nama": "td",
        "label": "Td",
        "wajib": true,
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "hr",
        "label": "Hr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "djj",
        "label": "Djj",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "his",
        "label": "His",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ppv",
        "label": "Ppv",
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
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
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "td",
      "hr",
      "suhu",
      "djj",
      "his"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-induksi-persalinan",
    "slug": "catatan-observasi-induksi-persalinan",
    "judul": "Catatan Observasi Induksi Persalinan",
    "kategori": "M",
    "permissionKey": "catatan_observasi_induksi_persalinan",
    "javaRef": "RMDataCatatanObservasiInduksiPersalinan",
    "tabel": "catatan_observasi_induksi_persalinan",
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
        "nama": "obat",
        "label": "Obat",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "cairan",
        "label": "Cairan",
        "wajib": true,
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "dosis",
        "label": "Dosis",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "his",
        "label": "His",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "djj",
        "label": "Djj",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
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
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "obat",
      "cairan",
      "dosis",
      "his",
      "djj"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-restrain-non-framakologi",
    "slug": "catatan-observasi-restrain-non-framakologi",
    "judul": "Catatan Observasi Restrain Nonfarmakologi",
    "kategori": "M",
    "permissionKey": "catatan_observasi_restrain_nonfarma",
    "javaRef": "RMDataCatatanObservasiRestrainNonFarmakologi",
    "tabel": "catatan_observasi_restrain_nonfarma",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "tangan_kiri",
        "label": "Tangan Kiri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "tangan_kanan",
        "label": "Tangan Kanan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "kaki_kiri",
        "label": "Kaki Kiri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "kaki_kanan",
        "label": "Kaki Kanan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "badan",
        "label": "Badan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "edema",
        "label": "Edema",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "iritasi",
        "label": "Iritasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "sirkulasi",
        "label": "Sirkulasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "kondisi_keterangan",
        "label": "Kondisi Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "tangan_kiri",
      "tangan_kanan",
      "kaki_kiri"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-ventilator",
    "slug": "catatan-observasi-ventilator",
    "judul": "Catatan Observasi Ventilator",
    "kategori": "M",
    "permissionKey": "catatan_observasi_ventilator",
    "javaRef": "RMDataCatatanObservasiVentilator",
    "tabel": "catatan_observasi_ventilator",
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
        "nama": "mode",
        "label": "Mode",
        "tipe": "enum",
        "opsi": [
          "CPAP",
          "Nasal IMV",
          "IMV",
          "SIMV",
          "A/C Atau SIPPV",
          "PSV",
          "Volume Guarantee",
          "HFO",
          "HFO + IMV"
        ]
      },
      {
        "nama": "vt",
        "label": "Vt",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pakar",
        "label": "Pakar",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "rr",
        "label": "Rr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "reefps",
        "label": "Reefps",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "ee",
        "label": "Ee",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "vt",
      "pakar",
      "rr",
      "reefps",
      "ee"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-observasi-hemodialisa",
    "slug": "catatan-observasi-hemodialisa",
    "judul": "Catatan Observasi Hemodialisa",
    "kategori": "M",
    "permissionKey": "catatan_observasi_hemodialisa",
    "javaRef": "RMDataCatatanObservasiHemodialisa",
    "tabel": "catatan_observasi_hemodialisa",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "qb",
        "label": "Qb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "qd",
        "label": "Qd",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "tekanan_arteri",
        "label": "Tekanan Arteri",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tekanan_vena",
        "label": "Tekanan Vena",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tmp",
        "label": "Tmp",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "ufr",
        "label": "Ufr",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "spo2",
        "label": "SPO2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ufg",
        "label": "Ufg",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "qb",
      "qd",
      "tekanan_arteri"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-keseimbangan-cairan",
    "slug": "catatan-keseimbangan-cairan",
    "judul": "Keseimbangan Cairan",
    "kategori": "M",
    "permissionKey": "balance_cairan",
    "javaRef": "RMDataCatatanKeseimbanganCairan",
    "tabel": "catatan_keseimbangan_cairan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "infus",
        "label": "Infus",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "tranfusi",
        "label": "Tranfusi",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "minum",
        "label": "Minum",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "urine",
        "label": "Urine",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "drain",
        "label": "Drain",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "ngt",
        "label": "Ngt",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "iwl",
        "label": "Iwl",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "keseimbangan",
        "label": "Keseimbangan",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "infus",
      "tranfusi",
      "minum"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-cairan-hemodialisa",
    "slug": "catatan-cairan-hemodialisa",
    "judul": "Catatan Cairan Hemodialisa",
    "kategori": "M",
    "permissionKey": "catatan_cairan_hemodialisa",
    "javaRef": "RMDataCatatanCairanHemodialisa",
    "tabel": "catatan_cairan_hemodialisa",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "minum",
        "label": "Minum",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "infus",
        "label": "Infus",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "tranfusi",
        "label": "Tranfusi",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "sisa_priming",
        "label": "Sisa Priming",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "wash_out",
        "label": "Wash Out",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "urine",
        "label": "Urine",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "pendarahan",
        "label": "Pendarahan",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "muntah",
        "label": "Muntah",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "minum",
      "infus",
      "tranfusi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-data-follow-up-dbd",
    "slug": "data-follow-up-dbd",
    "judul": "Follow Up DBD",
    "kategori": "M",
    "permissionKey": "follow_up_dbd",
    "javaRef": "RMDataFollowUpDBD",
    "tabel": "follow_up_dbd",
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
        "nama": "hemoglobin",
        "label": "Hemoglobin",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "hematokrit",
        "label": "Hematokrit",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "leokosit",
        "label": "Leokosit",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "trombosit",
        "label": "Trombosit",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "terapi_cairan",
        "label": "Terapi Cairan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "hemoglobin",
      "hematokrit",
      "leokosit",
      "trombosit",
      "terapi_cairan"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-keperawatan-ralan",
    "slug": "catatan-keperawatan-ralan",
    "judul": "Catatan Keperawatan Ralan",
    "kategori": "M",
    "permissionKey": "catatan_keperawatan_ralan",
    "javaRef": "RMDataCatatanKeperawatanRalan",
    "tabel": "catatan_keperawatan_ralan",
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
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "uraian",
        "label": "Uraian",
        "tipe": "text",
        "maks": 1000
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
      "no_rawat",
      "uraian",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-keperawatan-ranap",
    "slug": "catatan-keperawatan-ranap",
    "judul": "Catatan Keperawatan Ranap",
    "kategori": "M",
    "permissionKey": "catatan_keperawatan_ranap",
    "javaRef": "RMDataCatatanKeperawatanRanap",
    "tabel": "catatan_keperawatan_ranap",
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
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "uraian",
        "label": "Uraian",
        "tipe": "text",
        "maks": 1000
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
      "no_rawat",
      "uraian",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-persalinan",
    "slug": "catatan-persalinan",
    "judul": "Catatan Persalinan",
    "kategori": "M",
    "permissionKey": "catatan_persalinan",
    "javaRef": "RMCatatanPersalinan",
    "tabel": "catatan_persalinan",
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
        "nama": "mulai",
        "label": "Mulai",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "selesai",
        "label": "Selesai",
        "tipe": "datetime",
        "wajib": true
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
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 5000
      },
      {
        "nama": "waktu_persalinan_kala_1",
        "label": "Waktu Persalinan Kala 1",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "waktu_persalinan_kala_2",
        "label": "Waktu Persalinan Kala 2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "waktu_persalinan_kala_3",
        "label": "Waktu Persalinan Kala 3",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "waktu_persalinan_jumlah",
        "label": "Waktu Persalinan Jumlah",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "perineum",
        "label": "Perineum",
        "tipe": "enum",
        "opsi": [
          "utuh",
          "rupture",
          "episiotomi"
        ]
      },
      {
        "nama": "jahitan_luar_1",
        "label": "Jahitan Luar 1",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jahitan_luar_2",
        "label": "Jahitan Luar 2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jahitan_dalam_1",
        "label": "Jahitan Dalam 1",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jahitan_dalam_2",
        "label": "Jahitan Dalam 2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "anak",
        "label": "Anak",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ]
      },
      {
        "nama": "status_lahir",
        "label": "Status Lahir",
        "tipe": "enum",
        "opsi": [
          "hidup",
          "mati"
        ]
      },
      {
        "nama": "apgar_score",
        "label": "Apgar Score",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pb",
        "label": "Pb",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kelainan",
        "label": "Kelainan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ketuban",
        "label": "Ketuban",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "placenta",
        "label": "Placenta",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ukuran",
        "label": "Ukuran",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "tali_pusat",
        "label": "Tali Pusat",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "insertio",
        "label": "Insertio",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "darah_keluar_kala_1",
        "label": "Darah Keluar Kala 1",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "darah_keluar_kala_2",
        "label": "Darah Keluar Kala 2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "darah_keluar_kala_3",
        "label": "Darah Keluar Kala 3",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "darah_keluar_kala_4",
        "label": "Darah Keluar Kala 4",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "darah_keluar_jumlah",
        "label": "Darah Keluar Jumlah",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kondisi_umum",
        "label": "Kondisi Umum",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kontraksi_uterus",
        "label": "Kontraksi Uterus",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ppv",
        "label": "Ppv",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pengobatan",
        "label": "Pengobatan",
        "tipe": "text",
        "maks": 600
      }
    ],
    "kolomTanggal": "mulai",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "nip",
      "catatan",
      "waktu_persalinan_kala_1",
      "waktu_persalinan_kala_2"
    ],
    "kolomUrut": "mulai",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-monitoring-reaksi-tranfusi",
    "slug": "monitoring-reaksi-tranfusi",
    "judul": "Monitoring Reaksi Tranfusi",
    "kategori": "M",
    "permissionKey": "monitoring_reaksi_tranfusi",
    "javaRef": "RMDataMonitoringReaksiTranfusi",
    "tabel": "monitoring_reaksi_tranfusi",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "produk_darah",
        "label": "Produk Darah",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "no_kantong",
        "label": "No. Kantong",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "lokasi_insersi",
        "label": "Lokasi Insersi",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "jenis_reaksi_alergi",
        "label": "Jenis Reaksi Alergi",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "produk_darah",
      "no_kantong",
      "lokasi_insersi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemantauan-pews-anak",
    "slug": "pemantauan-pews-anak",
    "judul": "Pemantauan PEWS Pasien Anak",
    "kategori": "M",
    "permissionKey": "pemantauan_pews_anak",
    "javaRef": "RMPemantauanPEWS",
    "tabel": "pemantauan_pews_anak",
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
        "nama": "parameter_perilaku",
        "label": "Parameter Perilaku",
        "tipe": "enum",
        "opsi": [
          "Sadar / Bermain",
          "Tidur / Perubahan Perilaku",
          "Gelisah",
          "Tidak Merespon Terhadap Nyeri Penurunan Kesadaran"
        ]
      },
      {
        "nama": "skor_perilaku",
        "label": "Skor Perilaku",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_crt_atau_warna_kulit",
        "label": "Parameter Crt Atau Warna Kulit",
        "tipe": "enum",
        "opsi": [
          "1 - 2 dtk / Pink",
          "3 dtk / Pucat",
          "4 dtk / Sianosis",
          ">=5 dtk / Mottle"
        ]
      },
      {
        "nama": "skor_crt_atau_warna_kulit",
        "label": "Skor Crt Atau Warna Kulit",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_perespirasi",
        "label": "Parameter Perespirasi",
        "tipe": "enum",
        "opsi": [
          "Tidak Ada Retraksi",
          "Cuping Hidung / O2 1-3 Lpm",
          "Retraksi Dada / O2 4-6 Lpm",
          "Stridor / O2 7-8 Lpm"
        ]
      },
      {
        "nama": "skor_perespirasi",
        "label": "Skor Perespirasi",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "skor_total",
        "label": "Skor Total",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_total",
        "label": "Parameter Total",
        "tipe": "text",
        "maks": 250
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
      "no_rawat",
      "skor_perilaku",
      "skor_crt_atau_warna_kulit",
      "skor_perespirasi",
      "skor_total",
      "parameter_total"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemantauan-pews-dewasa",
    "slug": "pemantauan-pews-dewasa",
    "judul": "Pemantauan EWS Pasien Dewasa",
    "kategori": "M",
    "permissionKey": "pemantauan_pews_dewasa",
    "javaRef": "RMPemantauanEWSD",
    "tabel": "pemantauan_pews_dewasa",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "parameter_laju_respirasi",
        "label": "Parameter Laju Respirasi",
        "tipe": "enum",
        "opsi": [
          "<= 5",
          "6 - 8",
          "9 - 11",
          "12 - 20",
          "21 - 24",
          "25 - 34",
          ">= 35"
        ]
      },
      {
        "nama": "skor_laju_respirasi",
        "label": "Skor Laju Respirasi",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_saturasi_oksigen",
        "label": "Parameter Saturasi Oksigen",
        "tipe": "enum",
        "opsi": [
          ">= 95",
          "94 - 95",
          "92 - 93",
          "<= 92"
        ]
      },
      {
        "nama": "skor_saturasi_oksigen",
        "label": "Skor Saturasi Oksigen",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_suplemen_oksigen",
        "label": "Parameter Suplemen Oksigen",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "skor_suplemen_oksigen",
        "label": "Skor Suplemen Oksigen",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_tekanan_darah_sistolik",
        "label": "Parameter Tekanan Darah Sistolik",
        "tipe": "enum",
        "opsi": [
          ">= 220",
          "181 - 220",
          "111 - 180",
          "101 - 110",
          "91 - 100",
          "71 - 90",
          "<= 70"
        ]
      },
      {
        "nama": "skor_tekanan_darah_sistolik",
        "label": "Skor Tekanan Darah Sistolik",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_laju_jantung",
        "label": "Parameter Laju Jantung",
        "tipe": "enum",
        "opsi": [
          ">= 140",
          "131 - 140",
          "111 - 130",
          "91 - 110",
          "51 - 90",
          "41 - 50",
          "<= 40"
        ]
      },
      {
        "nama": "skor_laju_jantung",
        "label": "Skor Laju Jantung",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_kesadaran",
        "label": "Parameter Kesadaran",
        "tipe": "enum",
        "opsi": [
          "sadar",
          "nyeri/verbal",
          "unrespon"
        ]
      },
      {
        "nama": "skor_kesadaran",
        "label": "Skor Kesadaran",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_temperatur",
        "label": "Parameter Temperatur",
        "tipe": "enum",
        "opsi": [
          "<= 35",
          "35.1 - 36",
          "36.1 - 38",
          "38.1 - 39",
          ">= 39"
        ]
      },
      {
        "nama": "skor_temperatur",
        "label": "Skor Temperatur",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "skor_total",
        "label": "Skor Total",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "parameter_total",
        "label": "Parameter Total",
        "tipe": "text",
        "maks": 250
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
      "no_rawat",
      "tanggal",
      "parameter_laju_respirasi",
      "skor_laju_respirasi",
      "parameter_saturasi_oksigen",
      "skor_saturasi_oksigen"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemantauan-meows",
    "slug": "pemantauan-meows",
    "judul": "Pemantauan MEOWS Pasien Obstetri",
    "kategori": "M",
    "permissionKey": "pemantauan_meows_obstetri",
    "javaRef": "RMPemantauanMEOWS",
    "tabel": "pemantauan_meows_obstetri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "parameter_pernapasan",
        "label": "Parameter Pernapasan",
        "tipe": "enum",
        "opsi": [
          ">= 30",
          "21 - 30",
          "11 - 20",
          "< 12"
        ]
      },
      {
        "nama": "skor_pernapasan",
        "label": "Skor Pernapasan",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_saturasi",
        "label": "Parameter Saturasi",
        "tipe": "enum",
        "opsi": [
          "> 95",
          "90 - 94",
          "< 90"
        ]
      },
      {
        "nama": "skor_saturasi",
        "label": "Skor Saturasi",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_temperatur",
        "label": "Parameter Temperatur",
        "tipe": "enum",
        "opsi": [
          "> 38",
          "35 - 35.9",
          "36 - 37.9",
          "< 35"
        ]
      },
      {
        "nama": "skor_temperatur",
        "label": "Skor Temperatur",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_tekanan_darah_sistole",
        "label": "Parameter Tekanan Darah Sistole",
        "tipe": "enum",
        "opsi": [
          "> 160",
          "150 - 159",
          "100 - 140",
          "90 - 99",
          "< 90"
        ]
      },
      {
        "nama": "skor_tekanan_darah_sistole",
        "label": "Skor Tekanan Darah Sistole",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_tekanan_darah_diastole",
        "label": "Parameter Tekanan Darah Diastole",
        "tipe": "enum",
        "opsi": [
          "> 110",
          "90 - 109",
          "< 90"
        ]
      },
      {
        "nama": "skor_tekanan_darah_diastole",
        "label": "Skor Tekanan Darah Diastole",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_denyut_jantung",
        "label": "Parameter Denyut Jantung",
        "tipe": "enum",
        "opsi": [
          "> 120",
          "100 - 120",
          "51 - 99",
          "40 - 50",
          "< 40"
        ]
      },
      {
        "nama": "skor_denyut_jantung",
        "label": "Skor Denyut Jantung",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_kesadaran",
        "label": "Parameter Kesadaran",
        "tipe": "enum",
        "opsi": [
          "alert",
          "verbal",
          "pain",
          "unresponsive"
        ]
      },
      {
        "nama": "skor_kesadaran",
        "label": "Skor Kesadaran",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_ketuban",
        "label": "Parameter Ketuban",
        "tipe": "enum",
        "opsi": [
          "khas",
          "busuk"
        ]
      },
      {
        "nama": "skor_ketuban",
        "label": "Skor Ketuban",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_discharge",
        "label": "Parameter Discharge",
        "tipe": "enum",
        "opsi": [
          "normal",
          "banyak"
        ]
      },
      {
        "nama": "skor_discharge",
        "label": "Skor Discharge",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter_proteinuria",
        "label": "Parameter Proteinuria",
        "tipe": "enum",
        "opsi": [
          "negatif",
          "+",
          "++>"
        ]
      },
      {
        "nama": "skor_proteinuria",
        "label": "Skor Proteinuria",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "skor_total",
        "label": "Skor Total",
        "tipe": "text",
        "maks": 2,
        "wajib": true
      },
      {
        "nama": "parameter_total",
        "label": "Parameter Total",
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "code_blue",
        "label": "Code Blue",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
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
      "no_rawat",
      "tanggal",
      "parameter_pernapasan",
      "skor_pernapasan",
      "parameter_saturasi",
      "skor_saturasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemantauan-ews-neonatus",
    "slug": "pemantauan-ews-neonatus",
    "judul": "Pemantauan EWS Pasien Neonatus",
    "kategori": "M",
    "permissionKey": "pemantauan_ews_neonatus",
    "javaRef": "RMPemantauanEWSNeonatus",
    "tabel": "pemantauan_ews_neonatus",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "parameter1",
        "label": "Parameter1",
        "tipe": "enum",
        "opsi": [
          "<= 29",
          "30 - 39",
          "40 - 60",
          ">= 61"
        ]
      },
      {
        "nama": "skor1",
        "label": "Skor1",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter2",
        "label": "Parameter2",
        "tipe": "enum",
        "opsi": [
          "<= 90",
          "90 - 93",
          ">= 94"
        ]
      },
      {
        "nama": "skor2",
        "label": "Skor2",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter3",
        "label": "Parameter3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "skor3",
        "label": "Skor3",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter4",
        "label": "Parameter4",
        "tipe": "enum",
        "opsi": [
          "<= 80",
          "81 - 119",
          "120 - 160",
          "161 - 180",
          ">= 181"
        ]
      },
      {
        "nama": "skor4",
        "label": "Skor4",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter5",
        "label": "Parameter5",
        "tipe": "enum",
        "opsi": [
          "berat",
          "ringan",
          "tidak"
        ]
      },
      {
        "nama": "skor5",
        "label": "Skor5",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter6",
        "label": "Parameter6",
        "tipe": "enum",
        "opsi": [
          ">= 3 detik",
          "<= 3 detik"
        ]
      },
      {
        "nama": "skor6",
        "label": "Skor6",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter7",
        "label": "Parameter7",
        "tipe": "enum",
        "opsi": [
          "<= 36,5",
          "36,5 - 37,5",
          ">= 37,5"
        ]
      },
      {
        "nama": "skor7",
        "label": "Skor7",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "parameter8",
        "label": "Parameter8",
        "tipe": "enum",
        "opsi": [
          "pink",
          "pucat"
        ]
      },
      {
        "nama": "skor8",
        "label": "Skor8",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "skor_total",
        "label": "Skor Total",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "parameter_total",
        "label": "Parameter Total",
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "code_blue",
        "label": "Code Blue",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
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
      "no_rawat",
      "tanggal",
      "parameter1",
      "skor1",
      "parameter2",
      "skor2"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hemodialisa",
    "slug": "hemodialisa",
    "judul": "Hemodialisa",
    "kategori": "M",
    "permissionKey": "hemodialisa",
    "javaRef": "RMHemodialisa",
    "tabel": "hemodialisa",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "lama",
        "label": "Lama",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "akses",
        "label": "Akses",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "dialist",
        "label": "Dialist",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "transfusi",
        "label": "Transfusi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "penarikan",
        "label": "Penarikan",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "qb",
        "label": "Qb",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "qd",
        "label": "Qd",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "ureum",
        "label": "Ureum",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "hb",
        "label": "Hb",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "hbsag",
        "label": "Hbsag",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "creatinin",
        "label": "Creatinin",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "hiv",
        "label": "HIV",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "hcv",
        "label": "Hcv",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "lain",
        "label": "Lain",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_penyakit",
        "label": "Kode Penyakit",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kd_dokter",
      "lama",
      "akses",
      "dialist"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-fisioterapi",
    "slug": "fisioterapi",
    "judul": "Awal Fisioterapi",
    "kategori": "M",
    "permissionKey": "penilaian_fisioterapi",
    "javaRef": "RMPenilaianFisioterapi",
    "tabel": "penilaian_fisioterapi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "hr",
        "label": "HR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
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
        "nama": "nyeri_tekan",
        "label": "Nyeri Tekan",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri_gerak",
        "label": "Nyeri Gerak",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nyeri_diam",
        "label": "Nyeri Diam",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "palpasi",
        "label": "Palpasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "luas_gerak_sendi",
        "label": "Luas Gerak Sendi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kekuatan_otot",
        "label": "Kekuatan Otot",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "statis",
        "label": "Statis",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "dinamis",
        "label": "Dinamis",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kognitif",
        "label": "Kognitif",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "auskultasi",
        "label": "Auskultasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "alat_bantu",
        "label": "Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_bantu",
        "label": "Ket Bantu",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "prothesa",
        "label": "Prothesa",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_pro",
        "label": "Ket Pro",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "deformitas",
        "label": "Deformitas",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_deformitas",
        "label": "Ket Deformitas",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "resikojatuh",
        "label": "Resikojatuh",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "ket_resikojatuh",
        "label": "Ket Resikojatuh",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "adl",
        "label": "Adl",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "dibantu"
        ],
        "wajib": true
      },
      {
        "nama": "lainlain_fungsional",
        "label": "Lainlain Fungsional",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "ket_fisik",
        "label": "Ket Fisik",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_musculoskeletal",
        "label": "Pemeriksaan Musculoskeletal",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_neuromuscular",
        "label": "Pemeriksaan Neuromuscular",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_cardiopulmonal",
        "label": "Pemeriksaan Cardiopulmonal",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_integument",
        "label": "Pemeriksaan Integument",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pengukuran_musculoskeletal",
        "label": "Pengukuran Musculoskeletal",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pengukuran_neuromuscular",
        "label": "Pengukuran Neuromuscular",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pengukuran_cardiopulmonal",
        "label": "Pengukuran Cardiopulmonal",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "pengukuran_integument",
        "label": "Pengukuran Integument",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "penunjang",
        "label": "Penunjang",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "diagnosis_fisio",
        "label": "Diagnosis Fisio",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rencana_terapi",
        "label": "Rencana Terapi",
        "tipe": "text",
        "maks": 200,
        "wajib": true
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
      "no_rawat",
      "informasi",
      "keluhan_utama",
      "rps",
      "rpd",
      "td"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-terapi-wicara",
    "slug": "penilaian-terapi-wicara",
    "judul": "Pengkajian Terapi Wicara",
    "kategori": "M",
    "permissionKey": "penilaian_terapi_wicara",
    "javaRef": "RMPenilaianTerapiWicara",
    "tabel": "penilaian_terapi_wicara",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "diagnosa_terapi_wicara",
        "label": "Diagnosa Terapi Wicara",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_medis",
        "label": "Diagnosa Medis",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "anamnesa",
        "label": "Anamnesa",
        "tipe": "text",
        "maks": 300,
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
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "perilaku_adaptif_kontak_mata",
        "label": "Perilaku Adaptif Kontak Mata",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "perilaku_adaptif_atensi",
        "label": "Perilaku Adaptif Atensi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "perilaku_adaptif_perilaku",
        "label": "Perilaku Adaptif Perilaku",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_bahasa_bicara_spontan",
        "label": "Kemampuan Bahasa Bicara Spontan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_bahasa_pemahaman_bahasa",
        "label": "Kemampuan Bahasa Pemahaman Bahasa",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_bahasa_pengujaran",
        "label": "Kemampuan Bahasa Pengujaran",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_bahasa_membaca",
        "label": "Kemampuan Bahasa Membaca",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_bahasa_penamaan",
        "label": "Kemampuan Bahasa Penamaan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "organ_wicara_anatomis_lip",
        "label": "Organ Wicara Anatomis Lip",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_tongue",
        "label": "Organ Wicara Anatomis Tongue",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_hard_palate",
        "label": "Organ Wicara Anatomis Hard Palate",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_soft_palate",
        "label": "Organ Wicara Anatomis Soft Palate",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_uvula",
        "label": "Organ Wicara Anatomis Uvula",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_mandibula",
        "label": "Organ Wicara Anatomis Mandibula",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_maxila",
        "label": "Organ Wicara Anatomis Maxila",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_dental",
        "label": "Organ Wicara Anatomis Dental",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_anatomis_faring",
        "label": "Organ Wicara Anatomis Faring",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_lip",
        "label": "Organ Wicara Fisiologis Lip",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_tongue",
        "label": "Organ Wicara Fisiologis Tongue",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_hard_palate",
        "label": "Organ Wicara Fisiologis Hard Palate",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_soft_palate",
        "label": "Organ Wicara Fisiologis Soft Palate",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_uvula",
        "label": "Organ Wicara Fisiologis Uvula",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_mandibula",
        "label": "Organ Wicara Fisiologis Mandibula",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_maxilla",
        "label": "Organ Wicara Fisiologis Maxilla",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_dental",
        "label": "Organ Wicara Fisiologis Dental",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "organ_wicara_fisiologis_faring",
        "label": "Organ Wicara Fisiologis Faring",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "aktifitas_oral_menghisap",
        "label": "Aktifitas Oral Menghisap",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "aktifitas_oral_mengunyah",
        "label": "Aktifitas Oral Mengunyah",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "aktifitas_oral_meniup",
        "label": "Aktifitas Oral Meniup",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "kemampuan_artikulasi_subtitusi",
        "label": "Kemampuan Artikulasi Subtitusi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "kemampuan_artikulasi_omisi",
        "label": "Kemampuan Artikulasi Omisi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "kemampuan_artikulasi_distorsi",
        "label": "Kemampuan Artikulasi Distorsi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "kemampuan_artikulasi_adisi",
        "label": "Kemampuan Artikulasi Adisi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "resonasi",
        "label": "Resonasi",
        "tipe": "enum",
        "opsi": [
          "hiponasal",
          "hipernasal",
          "normal"
        ],
        "wajib": true
      },
      {
        "nama": "kemampuan_suara_nada",
        "label": "Kemampuan Suara Nada",
        "tipe": "enum",
        "opsi": [
          "nada",
          "resonansi",
          "rendah",
          "monoton",
          "normal"
        ],
        "wajib": true
      },
      {
        "nama": "kemampuan_suara_kualitas",
        "label": "Kemampuan Suara Kualitas",
        "tipe": "enum",
        "opsi": [
          "hoarssness",
          "hassness",
          "normal"
        ],
        "wajib": true
      },
      {
        "nama": "kemampuan_suara_kenyaringan",
        "label": "Kemampuan Suara Kenyaringan",
        "tipe": "enum",
        "opsi": [
          "nyaring",
          "tidak nyaring"
        ],
        "wajib": true
      },
      {
        "nama": "kemampuan_irama_kelancaran",
        "label": "Kemampuan Irama Kelancaran",
        "tipe": "enum",
        "opsi": [
          "gagap primer",
          "gagap sekunder"
        ],
        "wajib": true
      },
      {
        "nama": "kemampuan_menelan",
        "label": "Kemampuan Menelan",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "pernafasan",
        "label": "Pernafasan",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_dekoding_pendengaran",
        "label": "Tingkat Komunikasi Dekoding Pendengaran",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_dekoding_penglihatan",
        "label": "Tingkat Komunikasi Dekoding Penglihatan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_dekoding_kinesik",
        "label": "Tingkat Komunikasi Dekoding Kinesik",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_enkoding_bicara",
        "label": "Tingkat Komunikasi Enkoding Bicara",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_enkoding_tulisan",
        "label": "Tingkat Komunikasi Enkoding Tulisan",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_enkoding_mimik",
        "label": "Tingkat Komunikasi Enkoding Mimik",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tingkat_komunikasi_enkoding_gesture",
        "label": "Tingkat Komunikasi Enkoding Gesture",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "penunjang_medis",
        "label": "Penunjang Medis",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "perencanaan_terapi_tujuan",
        "label": "Perencanaan Terapi Tujuan",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "perencanaan_terapi_program",
        "label": "Perencanaan Terapi Program",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "edukasi",
        "label": "Edukasi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "tindak_lanjut",
        "label": "Tindak Lanjut",
        "tipe": "text",
        "maks": 150,
        "wajib": true
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
      "no_rawat",
      "diagnosa_terapi_wicara",
      "diagnosa_medis",
      "anamnesa",
      "suhu",
      "rr"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penatalaksanaan-terapi-okupasi",
    "slug": "penatalaksanaan-terapi-okupasi",
    "judul": "Penatalaksanaan Terapi Okupasi",
    "kategori": "M",
    "permissionKey": "penatalaksanaan_terapi_okupasi",
    "javaRef": "RMPenatalaksanaanTerapiOkupasi",
    "tabel": "penatalaksanaan_terapi_okupasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 400,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "anamnesa_general",
        "label": "Anamnesa General",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "tanda_vital",
        "label": "Tanda Vital",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_penunjang",
        "label": "Pemeriksaan Penunjang",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "spesialisasi",
        "label": "Spesialisasi",
        "tipe": "enum",
        "opsi": [
          "pediatri",
          "dewasa",
          "geriatri",
          "psikososial",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_spesialisasi",
        "label": "Keterangan Spesialisasi",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "pemeriksaan_okupasi_terapi",
        "label": "Pemeriksaan Okupasi Terapi",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "aset",
        "label": "Aset",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "limitasi",
        "label": "Limitasi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "diagnosa_terapi_okupasi",
        "label": "Diagnosa Terapi Okupasi",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "rencana_intervensi",
        "label": "Rencana Intervensi",
        "tipe": "text",
        "maks": 400,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "keluhan_utama",
      "rpd",
      "rps",
      "anamnesa_general"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-psikologi",
    "slug": "penilaian-psikologi",
    "judul": "Pengkajian Psikologi",
    "kategori": "M",
    "permissionKey": "penilaian_psikologi",
    "javaRef": "RMPenilaianPsikologi",
    "tabel": "penilaian_psikologi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "dikirim_dari",
        "label": "Dikirim Dari",
        "tipe": "enum",
        "opsi": [
          "ruang rawat",
          "poliklinik",
          "rehabilitasi",
          "after care",
          "dokter"
        ],
        "wajib": true
      },
      {
        "nama": "tujuan_pemeriksaan",
        "label": "Tujuan Pemeriksaan",
        "tipe": "enum",
        "opsi": [
          "klinik",
          "bimbingan",
          "forensik"
        ],
        "wajib": true
      },
      {
        "nama": "ket_anamnesis",
        "label": "Ket Anamnesis",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "rupa",
        "label": "Rupa",
        "tipe": "enum",
        "opsi": [
          "tampan",
          "buruk",
          "menarik",
          "memuakkan",
          "biasa"
        ],
        "wajib": true
      },
      {
        "nama": "bentuk_tubuh",
        "label": "Bentuk Tubuh",
        "tipe": "enum",
        "opsi": [
          "sangat tinggi",
          "sangat pendek",
          "sangat kurus",
          "sangat gemuk",
          "tinggi",
          "sedang",
          "atletik",
          "pendek",
          "langsing",
          "gemuk"
        ],
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "enum",
        "opsi": [
          "sopan",
          "tidak sopan",
          "kurang tahu aturan",
          "canggung",
          "bebas",
          "tegas",
          "garang",
          "percaya diri",
          "tertekan",
          "ragu-ragu",
          "pasti",
          "kaku",
          "ceroboh",
          "dingin",
          "malu-malu"
        ],
        "wajib": true
      },
      {
        "nama": "pakaian",
        "label": "Pakaian",
        "tipe": "enum",
        "opsi": [
          "rapi",
          "serampangan",
          "terpelihara",
          "tidak terpelihara",
          "teratur",
          "tidak rapi",
          "sederhana",
          "biasa",
          "bersih",
          "kotor"
        ],
        "wajib": true
      },
      {
        "nama": "ekspresi",
        "label": "Ekspresi",
        "tipe": "enum",
        "opsi": [
          "sangat mudah",
          "hati-hati dan membatasi diri",
          "sukar mencari kata-kata",
          "mudah",
          "terbuka"
        ],
        "wajib": true
      },
      {
        "nama": "berbicara",
        "label": "Berbicara",
        "tipe": "enum",
        "opsi": [
          "tenang",
          "acuh tak acuh",
          "gugup",
          "lancar",
          "ribut dengan banyak gerak dan isyarat"
        ],
        "wajib": true
      },
      {
        "nama": "penggunaan_kata",
        "label": "Penggunaan Kata",
        "tipe": "enum",
        "opsi": [
          "ramah",
          "dibuat-buat",
          "dengan tekanan suara",
          "terpengaruh bahasa daerah",
          "disertai dengan istilah bahasa asing"
        ],
        "wajib": true
      },
      {
        "nama": "ciri_menyolok",
        "label": "Ciri Menyolok",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "hasil_psikotes",
        "label": "Hasil Psikotes",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "kepribadian",
        "label": "Kepribadian",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "psikodinamika",
        "label": "Psikodinamika",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "kesimpulan_psikolog",
        "label": "Kesimpulan Psikolog",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "anamnesis",
      "dikirim_dari",
      "tujuan_pemeriksaan",
      "ket_anamnesis"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-psikologi-klinis",
    "slug": "penilaian-psikologi-klinis",
    "judul": "Pengkajian Psikologi Klinis",
    "kategori": "M",
    "permissionKey": "penilaian_psikologi_klinis",
    "javaRef": "RMPenilaianPsikologiKlinis",
    "tabel": "penilaian_psikologi_klinis",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "anamnesis",
        "label": "Anamnesis",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "dikirim_dari",
        "label": "Dikirim Dari",
        "tipe": "enum",
        "opsi": [
          "ruang rawat",
          "poliklinik",
          "rehabilitasi",
          "after care",
          "dokter"
        ],
        "wajib": true
      },
      {
        "nama": "tujuan_pemeriksaan",
        "label": "Tujuan Pemeriksaan",
        "tipe": "enum",
        "opsi": [
          "klinik",
          "bimbingan",
          "forensik"
        ],
        "wajib": true
      },
      {
        "nama": "ket_anamnesis",
        "label": "Ket Anamnesis",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "keluhan_utama",
        "label": "Keluhan Utama",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "riwayat_penyakit",
        "label": "Riwayat Penyakit",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "riwayat_keluhan",
        "label": "Riwayat Keluhan",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "permasalahan_saat_ini",
        "label": "Permasalahan Saat Ini",
        "tipe": "enum",
        "opsi": [
          "sangat serius",
          "serius",
          "cukup serius"
        ]
      },
      {
        "nama": "permasalahan_alasan",
        "label": "Permasalahan Alasan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "permasalahan_ekspektasi",
        "label": "Permasalahan Ekspektasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_hidup_singkat",
        "label": "Riwayat Hidup Singkat",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "kondisi_psikologis_penampilan",
        "label": "Kondisi Psikologis Penampilan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_ekspresi_wajah",
        "label": "Kondisi Psikologis Ekspresi Wajah",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_suasana_hati",
        "label": "Kondisi Psikologis Suasana Hati",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_tingkah_laku",
        "label": "Kondisi Psikologis Tingkah Laku",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_fungsi_umum",
        "label": "Kondisi Psikologis Fungsi Umum",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_fungsi_intelektual",
        "label": "Kondisi Psikologis Fungsi Intelektual",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_pengalaman",
        "label": "Kondisi Psikologis Pengalaman",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_psikologis_lainnya",
        "label": "Kondisi Psikologis Lainnya",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_delusi",
        "label": "Kondisi Patologis Delusi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_proses_pikiran",
        "label": "Kondisi Patologis Proses Pikiran",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_halusinasi",
        "label": "Kondisi Patologis Halusinasi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_afek",
        "label": "Kondisi Patologis Afek",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_insight",
        "label": "Kondisi Patologis Insight",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_kesadaran",
        "label": "Kondisi Patologis Kesadaran",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_orientasi",
        "label": "Kondisi Patologis Orientasi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_atensi",
        "label": "Kondisi Patologis Atensi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kondisi_patologis_kontrol_impuls",
        "label": "Kondisi Patologis Kontrol Impuls",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "psikotes_tanggal_pelaksanaan",
        "label": "Psikotes Tanggal Pelaksanaan",
        "tipe": "date"
      },
      {
        "nama": "psikotes_nama_tes",
        "label": "Psikotes Nama Tes",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "psikotes_hasil",
        "label": "Psikotes Hasil",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "dinamika_psikologis",
        "label": "Dinamika Psikologis",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "diagnosa_psikologis",
        "label": "Diagnosa Psikologis",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "manifestasi_fungsi_psikologis",
        "label": "Manifestasi Fungsi Psikologis",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "rencana_intervensi",
        "label": "Rencana Intervensi",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "tahapan_intervensi1",
        "label": "Tahapan Intervensi1",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi1",
        "label": "Target Terapi1",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi2",
        "label": "Tahapan Intervensi2",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi2",
        "label": "Target Terapi2",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi3",
        "label": "Tahapan Intervensi3",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi3",
        "label": "Target Terapi3",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi4",
        "label": "Tahapan Intervensi4",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi4",
        "label": "Target Terapi4",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi5",
        "label": "Tahapan Intervensi5",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi5",
        "label": "Target Terapi5",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi6",
        "label": "Tahapan Intervensi6",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi6",
        "label": "Target Terapi6",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tahapan_intervensi7",
        "label": "Tahapan Intervensi7",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "target_terapi7",
        "label": "Target Terapi7",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "anamnesis",
      "dikirim_dari",
      "tujuan_pemeriksaan",
      "ket_anamnesis"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pre-induksi",
    "slug": "penilaian-pre-induksi",
    "judul": "Pengkajian Pre Induksi",
    "kategori": "M",
    "permissionKey": "penilaian_pre_induksi",
    "javaRef": "RMPenilaianPreInduksi",
    "tabel": "penilaian_pre_induksi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tensi",
        "label": "Tensi",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "ekg",
        "label": "EKG",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "lain_lain",
        "label": "Lain Lain",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "asesmen",
        "label": "Asesmen",
        "tipe": "enum",
        "opsi": [
          "sesuai asesmen pre sedasi/anestesi",
          "tidak sesuai asesmen pre sedasi/anestesi"
        ]
      },
      {
        "nama": "perencanaan",
        "label": "Perencanaan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "infus_perifier",
        "label": "Infus Perifier",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "cvc",
        "label": "Cvc",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "posisi",
        "label": "Posisi",
        "tipe": "enum",
        "opsi": [
          "supine",
          "lithotomi",
          "lateral",
          "prone",
          "perlindungan mata",
          "kanan",
          "kiri",
          "lain-lain"
        ]
      },
      {
        "nama": "premedikasi",
        "label": "Premedikasi",
        "tipe": "enum",
        "opsi": [
          "oral",
          "im",
          "iv"
        ]
      },
      {
        "nama": "premedikasi_keterangan",
        "label": "Premedikasi Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "induksi",
        "label": "Induksi",
        "tipe": "enum",
        "opsi": [
          "intravena",
          "inhalasi"
        ]
      },
      {
        "nama": "induksi_keterangan",
        "label": "Induksi Keterangan",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "face_mask_no",
        "label": "Face Mask No.",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nasopharing_no",
        "label": "Nasopharing No.",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ett_no",
        "label": "Ett No.",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ett_jenis",
        "label": "Ett Jenis",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ett_viksasi",
        "label": "Ett Viksasi",
        "tipe": "text",
        "maks": 25
      },
      {
        "nama": "lma_no",
        "label": "Lma No.",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "lma_jenis",
        "label": "Lma Jenis",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tracheostomi",
        "label": "Tracheostomi",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "bronchoscopi_fiberoptik",
        "label": "Bronchoscopi Fiberoptik",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "glidescopi",
        "label": "Glidescopi",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "lain_lain_tatalaksana",
        "label": "Lain Lain Tatalaksana",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "intubasi_sesudah_tidur",
        "label": "Intubasi Sesudah Tidur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "intubasi_oral",
        "label": "Intubasi Oral",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "intubasi_tracheostomi",
        "label": "Intubasi Tracheostomi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "intubasi_keterangan",
        "label": "Intubasi Keterangan",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "sulit_ventilasi",
        "label": "Sulit Ventilasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "sulit_intubasi",
        "label": "Sulit Intubasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "ventilasi",
        "label": "Ventilasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "teknik_regional_jenis",
        "label": "Teknik Regional Jenis",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "teknik_regional_lokasi",
        "label": "Teknik Regional Lokasi",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "teknik_regional_jenis_jarum",
        "label": "Teknik Regional Jenis Jarum",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "teknik_regional_kateter",
        "label": "Teknik Regional Kateter",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_regional_kateter_viksasi",
        "label": "Teknik Regional Kateter Viksasi",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "teknik_regional_obat_obatan",
        "label": "Teknik Regional Obat Obatan",
        "tipe": "text",
        "maks": 400
      },
      {
        "nama": "teknik_regional_komplikasi",
        "label": "Teknik Regional Komplikasi",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "teknik_regional_hasil",
        "label": "Teknik Regional Hasil",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kd_dokter",
      "tensi",
      "nadi",
      "rr"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-pre-operasi",
    "slug": "checklist-pre-operasi",
    "judul": "Check List Pre Operasi",
    "kategori": "M",
    "permissionKey": "checklist_pre_operasi",
    "javaRef": "RMChecklistPreOperasi",
    "tabel": "checklist_pre_operasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "sncn",
        "label": "Sncn",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "identitas",
        "label": "Identitas",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "surat_ijin_bedah",
        "label": "Surat Ijin Bedah",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "surat_ijin_anestesi",
        "label": "Surat Ijin Anestesi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "surat_ijin_transfusi",
        "label": "Surat Ijin Transfusi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "penandaan_area_operasi",
        "label": "Penandaan Area Operasi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "lemah"
        ]
      },
      {
        "nama": "pemeriksaan_penunjang_rontgen",
        "label": "Pemeriksaan Penunjang Rontgen",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_rontgen",
        "label": "Keterangan Pemeriksaan Penunjang Rontgen",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_ekg",
        "label": "Pemeriksaan Penunjang EKG",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_ekg",
        "label": "Keterangan Pemeriksaan Penunjang EKG",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_usg",
        "label": "Pemeriksaan Penunjang USG",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_usg",
        "label": "Keterangan Pemeriksaan Penunjang USG",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_ctscan",
        "label": "Pemeriksaan Penunjang Ctscan",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_ctscan",
        "label": "Keterangan Pemeriksaan Penunjang Ctscan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_mri",
        "label": "Pemeriksaan Penunjang Mri",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_mri",
        "label": "Keterangan Pemeriksaan Penunjang Mri",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "persiapan_darah",
        "label": "Persiapan Darah",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "keterangan_persiapan_darah",
        "label": "Keterangan Persiapan Darah",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "perlengkapan_khusus",
        "label": "Perlengkapan Khusus",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "nip_petugas_ruangan",
        "label": "Nip Petugas Ruangan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "sncn",
      "tindakan",
      "kd_dokter_bedah",
      "kd_dokter_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-sign-in-sebelum-anestesi",
    "slug": "sign-in-sebelum-anestesi",
    "judul": "Sign-In Sebelum Anestesi",
    "kategori": "M",
    "permissionKey": "signin_sebelum_anestesi",
    "javaRef": "RMSignInSebelumAnastesi",
    "tabel": "signin_sebelum_anestesi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "sncn",
        "label": "Sncn",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "identitas",
        "label": "Identitas",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penandaan_area_operasi",
        "label": "Penandaan Area Operasi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resiko_aspirasi",
        "label": "Resiko Aspirasi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "resiko_aspirasi_rencana_antisipasi",
        "label": "Resiko Aspirasi Rencana Antisipasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "resiko_kehilangan_darah",
        "label": "Resiko Kehilangan Darah",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "resiko_kehilangan_darah_line",
        "label": "Resiko Kehilangan Darah Line",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "resiko_kehilangan_darah_rencana_antisipasi",
        "label": "Resiko Kehilangan Darah Rencana Antisipasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kesiapan_alat_obat_anestesi",
        "label": "Kesiapan Alat Obat Anestesi",
        "tipe": "enum",
        "opsi": [
          "lengkap",
          "pulsa oximetri",
          "tidak lengkap"
        ]
      },
      {
        "nama": "kesiapan_alat_obat_anestesi_rencana_antisipasi",
        "label": "Kesiapan Alat Obat Anestesi Rencana Antisipasi",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "sncn",
      "tindakan",
      "kd_dokter_bedah",
      "kd_dokter_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-time-out-sebelum-insisi",
    "slug": "time-out-sebelum-insisi",
    "judul": "Time-Out Sebelum Insisi",
    "kategori": "M",
    "permissionKey": "timeout_sebelum_insisi",
    "javaRef": "RMTimeOutSebelumInsisi",
    "tabel": "timeout_sebelum_insisi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "sncn",
        "label": "Sncn",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "verbal_identitas",
        "label": "Verbal Identitas",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verbal_tindakan",
        "label": "Verbal Tindakan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verbal_area_insisi",
        "label": "Verbal Area Insisi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penandaan_area_operasi",
        "label": "Penandaan Area Operasi",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "lama_operasi",
        "label": "Lama Operasi",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "penayangan_radiologi",
        "label": "Penayangan Radiologi",
        "tipe": "enum",
        "opsi": [
          "ditayangkan",
          "benar",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "penayangan_ctscan",
        "label": "Penayangan Ctscan",
        "tipe": "enum",
        "opsi": [
          "ditayangkan",
          "benar",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "penayangan_mri",
        "label": "Penayangan Mri",
        "tipe": "enum",
        "opsi": [
          "ditayangkan",
          "benar",
          "tidak diperlukan"
        ]
      },
      {
        "nama": "antibiotik_profilaks",
        "label": "Antibiotik Profilaks",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nama_antibiotik",
        "label": "Nama Antibiotik",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "jam_pemberian",
        "label": "Jam Pemberian",
        "tipe": "text",
        "maks": 10,
        "wajib": true
      },
      {
        "nama": "antisipasi_kehilangan_darah",
        "label": "Antisipasi Kehilangan Darah",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "hal_khusus",
        "label": "Hal Khusus",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "hal_khusus_diperhatikan",
        "label": "Hal Khusus Diperhatikan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "tanggal_steril",
        "label": "Tanggal Steril",
        "tipe": "date"
      },
      {
        "nama": "petujuk_sterilisasi",
        "label": "Petujuk Sterilisasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verifikasi_preoperatif",
        "label": "Verifikasi Preoperatif",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "sncn",
      "tindakan",
      "kd_dokter_bedah",
      "kd_dokter_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-sign-out-sebelum-menutup-luka",
    "slug": "sign-out-sebelum-menutup-luka",
    "judul": "Sign-Out Sebelum Menutup Luka",
    "kategori": "M",
    "permissionKey": "signout_sebelum_menutup_luka",
    "javaRef": "RMSignOutSebelumMenutupLuka",
    "tabel": "signout_sebelum_menutup_luka",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "sncn",
        "label": "Sncn",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "verbal_tindakan",
        "label": "Verbal Tindakan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verbal_kelengkapan_kasa",
        "label": "Verbal Kelengkapan Kasa",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verbal_instrumen",
        "label": "Verbal Instrumen",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "verbal_alat_tajam",
        "label": "Verbal Alat Tajam",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "kelengkapan_specimen_label",
        "label": "Kelengkapan Specimen Label",
        "tipe": "enum",
        "opsi": [
          "lengkap",
          "tidak lengkap",
          "tidak ada pemeriksaan spesimen"
        ]
      },
      {
        "nama": "kelengkapan_specimen_formulir",
        "label": "Kelengkapan Specimen Formulir",
        "tipe": "enum",
        "opsi": [
          "lengkap",
          "tidak lengkap",
          "tidak ada pemeriksaan spesimen"
        ]
      },
      {
        "nama": "peninjauan_kegiatan_dokter_bedah",
        "label": "Peninjauan Kegiatan Dokter Bedah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "peninjauan_kegiatan_dokter_anestesi",
        "label": "Peninjauan Kegiatan Dokter Anestesi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "peninjauan_kegiatan_perawat_kamar_ok",
        "label": "Peninjauan Kegiatan Perawat Kamar OK",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perhatian_utama_fase_pemulihan",
        "label": "Perhatian Utama Fase Pemulihan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "sncn",
      "tindakan",
      "kd_dokter_bedah",
      "kd_dokter_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-post-operasi",
    "slug": "checklist-post-operasi",
    "judul": "Check List Post Operasi",
    "kategori": "M",
    "permissionKey": "checklist_post_operasi",
    "javaRef": "RMChecklistPostOperasi",
    "tabel": "checklist_post_operasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "sncn",
        "label": "Sncn",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "keadaan_umum",
        "label": "Keadaan Umum",
        "tipe": "enum",
        "opsi": [
          "sadar",
          "tidur",
          "terintubasi"
        ]
      },
      {
        "nama": "pemeriksaan_penunjang_rontgen",
        "label": "Pemeriksaan Penunjang Rontgen",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_rontgen",
        "label": "Keterangan Pemeriksaan Penunjang Rontgen",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_ekg",
        "label": "Pemeriksaan Penunjang EKG",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_ekg",
        "label": "Keterangan Pemeriksaan Penunjang EKG",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_usg",
        "label": "Pemeriksaan Penunjang USG",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_usg",
        "label": "Keterangan Pemeriksaan Penunjang USG",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_ctscan",
        "label": "Pemeriksaan Penunjang Ctscan",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_ctscan",
        "label": "Keterangan Pemeriksaan Penunjang Ctscan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "pemeriksaan_penunjang_mri",
        "label": "Pemeriksaan Penunjang Mri",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_pemeriksaan_penunjang_mri",
        "label": "Keterangan Pemeriksaan Penunjang Mri",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "jenis_cairan_infus",
        "label": "Jenis Cairan Infus",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kateter_urine",
        "label": "Kateter Urine",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "tanggal_pemasangan_kateter",
        "label": "Tanggal Pemasangan Kateter",
        "tipe": "datetime"
      },
      {
        "nama": "warna_kateter",
        "label": "Warna Kateter",
        "tipe": "enum",
        "opsi": [
          "jernih",
          "keruh",
          "-"
        ]
      },
      {
        "nama": "jumlah_kateter",
        "label": "Jumlah Kateter",
        "tipe": "text",
        "maks": 4
      },
      {
        "nama": "area_luka_operasi",
        "label": "Area Luka Operasi",
        "tipe": "text",
        "maks": 120
      },
      {
        "nama": "drain",
        "label": "Drain",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "jumlah_drain",
        "label": "Jumlah Drain",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "letak_drain",
        "label": "Letak Drain",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "warna_drain",
        "label": "Warna Drain",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "jaringan_pa",
        "label": "Jaringan Pa",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak ada"
        ]
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nip_perawat_anestesi",
        "label": "Nip Perawat Anestesi",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "sncn",
      "tindakan",
      "kd_dokter_bedah",
      "kd_dokter_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pre-operasi",
    "slug": "penilaian-pre-operasi",
    "judul": "Pengkajian Pre Operasi",
    "kategori": "M",
    "permissionKey": "penilaian_pre_operasi",
    "javaRef": "RMPenilaianPreOperasi",
    "tabel": "penilaian_pre_operasi",
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
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "ringkasan_klinik",
        "label": "Ringkasan Klinik",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "pemeriksaan_fisik",
        "label": "Pemeriksaan Fisik",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "pemeriksaan_diagnostik",
        "label": "Pemeriksaan Diagnostik",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diagnosa_pre_operasi",
        "label": "Diagnosa Pre Operasi",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "rencana_tindakan_bedah",
        "label": "Rencana Tindakan Bedah",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "hal_hal_yang_perludi_persiapkan",
        "label": "Hal Hal Yang Perludi Persiapkan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "terapi_pre_operasi",
        "label": "Terapi Pre Operasi",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "ringkasan_klinik",
      "pemeriksaan_fisik",
      "pemeriksaan_diagnostik",
      "diagnosa_pre_operasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-pre-anastesi",
    "slug": "penilaian-pre-anastesi",
    "judul": "Pengkajian Pre Anestesi",
    "kategori": "M",
    "permissionKey": "penilaian_pre_anestesi",
    "javaRef": "RMPenilaianPreAnastesi",
    "tabel": "penilaian_pre_anestesi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tanggal_operasi",
        "label": "Tanggal Operasi",
        "tipe": "datetime"
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "rencana_tindakan",
        "label": "Rencana Tindakan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "io2",
        "label": "Io2",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "pernapasan",
        "label": "Pernapasan",
        "tipe": "text",
        "maks": 5,
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
        "nama": "fisik_cardiovasculer",
        "label": "Fisik Cardiovasculer",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_paru",
        "label": "Fisik Paru",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_abdomen",
        "label": "Fisik Abdomen",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_extrimitas",
        "label": "Fisik Extrimitas",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_endokrin",
        "label": "Fisik Endokrin",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_ginjal",
        "label": "Fisik Ginjal",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_obatobatan",
        "label": "Fisik Obatobatan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_laborat",
        "label": "Fisik Laborat",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "fisik_penunjang",
        "label": "Fisik Penunjang",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_penyakit_alergiobat",
        "label": "Riwayat Penyakit Alergiobat",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "riwayat_penyakit_alergilainnya",
        "label": "Riwayat Penyakit Alergilainnya",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "riwayat_penyakit_terapi",
        "label": "Riwayat Penyakit Terapi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_kebiasaan_merokok",
        "label": "Riwayat Kebiasaan Merokok",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_kebiasaan_ket_merokok",
        "label": "Riwayat Kebiasaan Ket Merokok",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "riwayat_kebiasaan_alkohol",
        "label": "Riwayat Kebiasaan Alkohol",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_kebiasaan_ket_alkohol",
        "label": "Riwayat Kebiasaan Ket Alkohol",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "riwayat_kebiasaan_obat",
        "label": "Riwayat Kebiasaan Obat",
        "tipe": "enum",
        "opsi": [
          "-",
          "obat obatan",
          "vitamin",
          "jamu jamuan"
        ],
        "wajib": true
      },
      {
        "nama": "riwayat_kebiasaan_ket_obat",
        "label": "Riwayat Kebiasaan Ket Obat",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "riwayat_medis_cardiovasculer",
        "label": "Riwayat Medis Cardiovasculer",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_medis_respiratory",
        "label": "Riwayat Medis Respiratory",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_medis_endocrine",
        "label": "Riwayat Medis Endocrine",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "riwayat_medis_lainnya",
        "label": "Riwayat Medis Lainnya",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "asa",
        "label": "Asa",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "e"
        ]
      },
      {
        "nama": "puasa",
        "label": "Puasa",
        "tipe": "datetime"
      },
      {
        "nama": "rencana_anestesi",
        "label": "Rencana Anestesi",
        "tipe": "enum",
        "opsi": [
          "ga",
          "ra spinal",
          "ra epidural",
          "ra combined",
          "blok syaraf"
        ]
      },
      {
        "nama": "rencana_perawatan",
        "label": "Rencana Perawatan",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "catatan_khusus",
        "label": "Catatan Khusus",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kd_dokter",
      "diagnosa",
      "rencana_tindakan",
      "tb"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-kesiapan-anestesi",
    "slug": "checklist-kesiapan-anestesi",
    "judul": "Check List Kesiapan Anestesi",
    "kategori": "M",
    "permissionKey": "checklist_kesiapan_anestesi",
    "javaRef": "RMChecklistKesiapanAnestesi",
    "tabel": "checklist_kesiapan_anestesi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "teknik_anestesi",
        "label": "Teknik Anestesi",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "listrik1",
        "label": "Listrik1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "listrik2",
        "label": "Listrik2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "listrik3",
        "label": "Listrik3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "listrik4",
        "label": "Listrik4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis1",
        "label": "Gasmedis1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis2",
        "label": "Gasmedis2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis3",
        "label": "Gasmedis3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis4",
        "label": "Gasmedis4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis5",
        "label": "Gasmedis5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gasmedis6",
        "label": "Gasmedis6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mesinanes1",
        "label": "Mesinanes1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mesinanes2",
        "label": "Mesinanes2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mesinanes3",
        "label": "Mesinanes3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mesinanes4",
        "label": "Mesinanes4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mesinanes5",
        "label": "Mesinanes5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas1",
        "label": "Jalannapas1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas2",
        "label": "Jalannapas2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas3",
        "label": "Jalannapas3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas4",
        "label": "Jalannapas4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas5",
        "label": "Jalannapas5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas6",
        "label": "Jalannapas6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas7",
        "label": "Jalannapas7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas8",
        "label": "Jalannapas8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jalannapas9",
        "label": "Jalannapas9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain1",
        "label": "Lainlain1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain2",
        "label": "Lainlain2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain3",
        "label": "Lainlain3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain4",
        "label": "Lainlain4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain5",
        "label": "Lainlain5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain6",
        "label": "Lainlain6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain7",
        "label": "Lainlain7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lainlain8",
        "label": "Lainlain8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat1",
        "label": "Obatobat1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat2",
        "label": "Obatobat2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat3",
        "label": "Obatobat3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat4",
        "label": "Obatobat4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat5",
        "label": "Obatobat5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "obatobat6",
        "label": "Obatobat6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "keterangan_lainnya",
        "label": "Keterangan Lainnya",
        "tipe": "text",
        "maks": 1000
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "nip",
      "kd_dokter",
      "tindakan",
      "teknik_anestesi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-anastesi-sedasi",
    "slug": "catatan-anastesi-sedasi",
    "judul": "Catatan Anestesi-Sedasi",
    "kategori": "M",
    "permissionKey": "catatan_anestesi_sedasi",
    "javaRef": "RMCatatanAnastesiSedasi",
    "tabel": "catatan_anestesi_sedasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter_bedah",
        "label": "Kode Dokter Bedah",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_dokter_anestesi",
        "label": "Kode Dokter Anestesi",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "diagnosa_pre_bedah",
        "label": "Diagnosa Pre Bedah",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "tindakan_jenis_pembedahan",
        "label": "Tindakan Jenis Pembedahan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "diagnosa_pasca_bedah",
        "label": "Diagnosa Pasca Bedah",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "pre_induksi_jam",
        "label": "Pre Induksi Jam",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "pre_induksi_kesadaran",
        "label": "Pre Induksi Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "somnolence",
          "sopor",
          "coma",
          "alert",
          "confusion",
          "voice",
          "pain",
          "unresponsive",
          "apatis",
          "delirium"
        ]
      },
      {
        "nama": "pre_induksi_td",
        "label": "Pre Induksi TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "pre_induksi_nadi",
        "label": "Pre Induksi Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_rr",
        "label": "Pre Induksi RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_suhu",
        "label": "Pre Induksi Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_o2",
        "label": "Pre Induksi O2",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_tb",
        "label": "Pre Induksi TB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_bb",
        "label": "Pre Induksi BB",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_rhesus",
        "label": "Pre Induksi Rhesus",
        "tipe": "enum",
        "opsi": [
          "+",
          "-"
        ]
      },
      {
        "nama": "pre_induksi_hb",
        "label": "Pre Induksi Hb",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_ht",
        "label": "Pre Induksi Ht",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_leko",
        "label": "Pre Induksi Leko",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_trombo",
        "label": "Pre Induksi Trombo",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_btct",
        "label": "Pre Induksi Btct",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_gds",
        "label": "Pre Induksi GDS",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "pre_induksi_lainlain",
        "label": "Pre Induksi Lainlain",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "teknik_alat_hiopotensi",
        "label": "Teknik Alat Hiopotensi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_tci",
        "label": "Teknik Alat Tci",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_cpb",
        "label": "Teknik Alat Cpb",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_ventilasi",
        "label": "Teknik Alat Ventilasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_broncoskopy",
        "label": "Teknik Alat Broncoskopy",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_glidescopi",
        "label": "Teknik Alat Glidescopi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_usg",
        "label": "Teknik Alat USG",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_stimulator_saraf",
        "label": "Teknik Alat Stimulator Saraf",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "teknik_alat_lainlain",
        "label": "Teknik Alat Lainlain",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "monitoring_ekg",
        "label": "Monitoring EKG",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_ekg_keterangan",
        "label": "Monitoring EKG Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "monitoring_arteri",
        "label": "Monitoring Arteri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_arteri_keterangan",
        "label": "Monitoring Arteri Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "monitoring_cvp",
        "label": "Monitoring Cvp",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_cvp_keterangan",
        "label": "Monitoring Cvp Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "monitoring_etco",
        "label": "Monitoring Etco",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_stetoskop",
        "label": "Monitoring Stetoskop",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_nibp",
        "label": "Monitoring Nibp",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_ngt",
        "label": "Monitoring Ngt",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_bis",
        "label": "Monitoring Bis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_cath_a_pulmo",
        "label": "Monitoring Cath A Pulmo",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_spo2",
        "label": "Monitoring SPO2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_kateter",
        "label": "Monitoring Kateter",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_temp",
        "label": "Monitoring Temp",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "monitoring_lainlain",
        "label": "Monitoring Lainlain",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "status_fisik_asa",
        "label": "Status Fisik Asa",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "e"
        ]
      },
      {
        "nama": "status_fisik_alergi",
        "label": "Status Fisik Alergi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "status_fisik_alergi_keterangan",
        "label": "Status Fisik Alergi Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "status_fisik_penyulit_sedasi",
        "label": "Status Fisik Penyulit Sedasi",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "perencanaan_lanjut",
        "label": "Perencanaan Lanjut",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_lanjut_sedasi",
        "label": "Perencanaan Lanjut Sedasi",
        "tipe": "enum",
        "opsi": [
          "sedang",
          "dalam",
          "tidak",
          "lain-lain"
        ]
      },
      {
        "nama": "perencanaan_lanjut_sedasi_keterangan",
        "label": "Perencanaan Lanjut Sedasi Keterangan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "perencanaan_lanjut_spinal",
        "label": "Perencanaan Lanjut Spinal",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_lanjut_anestesi_umum",
        "label": "Perencanaan Lanjut Anestesi Umum",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_lanjut_anestesi_umum_keterangan",
        "label": "Perencanaan Lanjut Anestesi Umum Keterangan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "perencanaan_lanjut_blok_perifer",
        "label": "Perencanaan Lanjut Blok Perifer",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_lanjut_blok_perifer_keterangan",
        "label": "Perencanaan Lanjut Blok Perifer Keterangan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "perencanaan_lanjut_epidural",
        "label": "Perencanaan Lanjut Epidural",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_batal",
        "label": "Perencanaan Batal",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "perencanaan_batal_alasan",
        "label": "Perencanaan Batal Alasan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "nip_perawat_ok",
        "label": "Nip Perawat OK",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nip_perawat_anestesi",
        "label": "Nip Perawat Anestesi",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kd_dokter_bedah",
      "kd_dokter_anestesi",
      "diagnosa_pre_bedah",
      "tindakan_jenis_pembedahan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skor-aldrette-pasca-anestesi",
    "slug": "skor-aldrette-pasca-anestesi",
    "judul": "Skor Aldrette Pasca Anestesi",
    "kategori": "M",
    "permissionKey": "skor_aldrette_pasca_anestesi",
    "javaRef": "RMMonitoringAldrettePascaAnestesi",
    "tabel": "skor_aldrette_pasca_anestesi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_skala1",
        "label": "Penilaian Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak sanggup menggerakan satupun anggota gerak",
          "sanggup gerak 2 anggota tubuh",
          "sanggup gerak 4 anggota tubuh"
        ]
      },
      {
        "nama": "penilaian_nilai1",
        "label": "Penilaian Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala2",
        "label": "Penilaian Skala2",
        "tipe": "enum",
        "opsi": [
          "apnea atau napas tidak adekuat",
          "sesak atau pernapasan sedikit terbatas",
          "sanggup bernafas dalam serta disuruh batuk"
        ]
      },
      {
        "nama": "penilaian_nilai2",
        "label": "Penilaian Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala3",
        "label": "Penilaian Skala3",
        "tipe": "enum",
        "opsi": [
          "± 50% tekanan darah pra anestesi",
          "± 20% - 50% tekanan darah pra anestesi",
          "± 20% tekanan darah pra anestesi"
        ]
      },
      {
        "nama": "penilaian_nilai3",
        "label": "Penilaian Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala4",
        "label": "Penilaian Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak ada respon",
          "respon terhadap panggilan",
          "sadar penuh"
        ]
      },
      {
        "nama": "penilaian_nilai4",
        "label": "Penilaian Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala5",
        "label": "Penilaian Skala5",
        "tipe": "enum",
        "opsi": [
          "cianosis",
          "pucat",
          "kemerahan / normal"
        ]
      },
      {
        "nama": "penilaian_nilai5",
        "label": "Penilaian Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_totalnilai",
        "label": "Penilaian Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 250
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "penilaian_skala1",
      "penilaian_skala2",
      "penilaian_skala3",
      "penilaian_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_nilai1",
      "label": "Total Penilaian Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skor-steward-pasca-anestesi",
    "slug": "skor-steward-pasca-anestesi",
    "judul": "Skor Steward Pasca Anestesi",
    "kategori": "M",
    "permissionKey": "skor_steward_pasca_anestesi",
    "javaRef": "RMMonitoringStewardPascaAnestesi",
    "tabel": "skor_steward_pasca_anestesi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_skala1",
        "label": "Penilaian Skala1",
        "tipe": "enum",
        "opsi": [
          "belum respon",
          "bangun jika dipanggil",
          "sadar penuh"
        ]
      },
      {
        "nama": "penilaian_nilai1",
        "label": "Penilaian Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala2",
        "label": "Penilaian Skala2",
        "tipe": "enum",
        "opsi": [
          "perlu bantuan bernafas",
          "berusaha bernafas",
          "batuk / menangis"
        ]
      },
      {
        "nama": "penilaian_nilai2",
        "label": "Penilaian Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skala3",
        "label": "Penilaian Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak bergerak",
          "gerakan tanpa tujuan",
          "gerakan beraturan"
        ]
      },
      {
        "nama": "penilaian_nilai3",
        "label": "Penilaian Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_totalnilai",
        "label": "Penilaian Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 200
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "penilaian_skala1",
      "penilaian_skala2",
      "penilaian_skala3",
      "keluar"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_nilai1",
      "label": "Total Penilaian Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skor-bromage-pasca-anestesi",
    "slug": "skor-bromage-pasca-anestesi",
    "judul": "Skor Bromage Pasca Anestesi",
    "kategori": "M",
    "permissionKey": "skor_bromage_pasca_anestesi",
    "javaRef": "RMMonitoringBromagePascaAnestesi",
    "tabel": "skor_bromage_pasca_anestesi",
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
        "nama": "penilaian_skala1",
        "label": "Penilaian Skala1",
        "tipe": "enum",
        "opsi": [
          "Gerakan Penuh Dari Tungkai",
          "Tidak Mampu Extensi Tungkai",
          "Tidak Mampu Flexi Lutut",
          "Tidak Mampu Flexi Pergelangan Kaki"
        ]
      },
      {
        "nama": "penilaian_nilai1",
        "label": "Penilaian Nilai1",
        "tipe": "uang"
      },
      {
        "nama": "keluar",
        "label": "Keluar",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 200
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "keluar",
      "instruksi",
      "kd_dokter",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_nilai1",
      "label": "Total Penilaian Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-pengkajian-paska-operasi",
    "slug": "catatan-pengkajian-paska-operasi",
    "judul": "Catatan Pengkajian Paska Operasi",
    "kategori": "M",
    "permissionKey": "catatan_pengkajian_paska_operasi",
    "javaRef": "RMCatatanPengkajianPaskaOperasi",
    "tabel": "catatan_pengkajian_paska_operasi",
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
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "rawat_paska_operasi",
        "label": "Rawat Paska Operasi",
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "cairan",
        "label": "Cairan",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "antibiotika",
        "label": "Antibiotika",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "analgetika",
        "label": "Analgetika",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "medikamentosa_lain",
        "label": "Medikamentosa Lain",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "diet",
        "label": "Diet",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "pemeriksaan_laborat",
        "label": "Pemeriksaan Laborat",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "tranfusi",
        "label": "Tranfusi",
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "lainlain",
        "label": "Lainlain",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "rawat_paska_operasi",
      "cairan",
      "antibiotika",
      "analgetika"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-kriteria-masuk-hcu",
    "slug": "checklist-kriteria-masuk-hcu",
    "judul": "Check List Kriteria Masuk HCU",
    "kategori": "M",
    "permissionKey": "checklist_kriteria_masuk_hcu",
    "javaRef": "RMChecklistKriteriaMasukHCU",
    "tabel": "checklist_kriteria_masuk_hcu",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kardiologi1",
        "label": "Kardiologi1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kardiologi2",
        "label": "Kardiologi2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kardiologi3",
        "label": "Kardiologi3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kardiologi4",
        "label": "Kardiologi4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kardiologi5",
        "label": "Kardiologi5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kardiologi6",
        "label": "Kardiologi6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pernapasan1",
        "label": "Pernapasan1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pernapasan2",
        "label": "Pernapasan2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pernapasan3",
        "label": "Pernapasan3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "syaraf1",
        "label": "Syaraf1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "syaraf2",
        "label": "Syaraf2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "syaraf3",
        "label": "Syaraf3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "syaraf4",
        "label": "Syaraf4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pencernaan1",
        "label": "Pencernaan1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pencernaan2",
        "label": "Pencernaan2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pencernaan3",
        "label": "Pencernaan3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pencernaan4",
        "label": "Pencernaan4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pembedahan1",
        "label": "Pembedahan1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "pembedahan2",
        "label": "Pembedahan2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hematologi1",
        "label": "Hematologi1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "hematologi2",
        "label": "Hematologi2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "infeksi",
        "label": "Infeksi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kardiologi1",
      "kardiologi2",
      "kardiologi3",
      "kardiologi4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-kriteria-keluar-hcu",
    "slug": "checklist-kriteria-keluar-hcu",
    "judul": "Check List Kriteria Keluar HCU",
    "kategori": "M",
    "permissionKey": "checklist_kriteria_keluar_hcu",
    "javaRef": "RMChecklistKriteriaKeluarHCU",
    "tabel": "checklist_kriteria_keluar_hcu",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kriteria1",
        "label": "Kriteria1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria2",
        "label": "Kriteria2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria3",
        "label": "Kriteria3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria4",
        "label": "Kriteria4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria5",
        "label": "Kriteria5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria6",
        "label": "Kriteria6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria7",
        "label": "Kriteria7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria8",
        "label": "Kriteria8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria9",
        "label": "Kriteria9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria10",
        "label": "Kriteria10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria11",
        "label": "Kriteria11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria12",
        "label": "Kriteria12",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kriteria1",
      "kriteria2",
      "kriteria3",
      "kriteria4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-kriteria-masuk-icu",
    "slug": "checklist-kriteria-masuk-icu",
    "judul": "Check List Kriteria Masuk ICU",
    "kategori": "M",
    "permissionKey": "checklist_kriteria_masuk_icu",
    "javaRef": "RMChecklistKriteriaMasukICU",
    "tabel": "checklist_kriteria_masuk_icu",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "prioritas1_1",
        "label": "Prioritas1 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas1_2",
        "label": "Prioritas1 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas1_3",
        "label": "Prioritas1 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas1_4",
        "label": "Prioritas1 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas1_5",
        "label": "Prioritas1 5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas1_6",
        "label": "Prioritas1 6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_1",
        "label": "Prioritas2 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_2",
        "label": "Prioritas2 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_3",
        "label": "Prioritas2 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_4",
        "label": "Prioritas2 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_5",
        "label": "Prioritas2 5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_6",
        "label": "Prioritas2 6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_7",
        "label": "Prioritas2 7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas2_8",
        "label": "Prioritas2 8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas3_1",
        "label": "Prioritas3 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas3_2",
        "label": "Prioritas3 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas3_3",
        "label": "Prioritas3 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "prioritas3_4",
        "label": "Prioritas3 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_tanda_vital_1",
        "label": "Kriteria Fisiologis Tanda Vital 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_tanda_vital_2",
        "label": "Kriteria Fisiologis Tanda Vital 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_tanda_vital_3",
        "label": "Kriteria Fisiologis Tanda Vital 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_tanda_vital_4",
        "label": "Kriteria Fisiologis Tanda Vital 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_tanda_vital_5",
        "label": "Kriteria Fisiologis Tanda Vital 5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_1",
        "label": "Kriteria Fisiologis Laborat 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_2",
        "label": "Kriteria Fisiologis Laborat 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_3",
        "label": "Kriteria Fisiologis Laborat 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_4",
        "label": "Kriteria Fisiologis Laborat 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_5",
        "label": "Kriteria Fisiologis Laborat 5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_laborat_6",
        "label": "Kriteria Fisiologis Laborat 6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_radiologi_1",
        "label": "Kriteria Fisiologis Radiologi 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_radiologi_2",
        "label": "Kriteria Fisiologis Radiologi 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_1",
        "label": "Kriteria Fisiologis Klinis 1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_2",
        "label": "Kriteria Fisiologis Klinis 2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_3",
        "label": "Kriteria Fisiologis Klinis 3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_4",
        "label": "Kriteria Fisiologis Klinis 4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_5",
        "label": "Kriteria Fisiologis Klinis 5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_6",
        "label": "Kriteria Fisiologis Klinis 6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_7",
        "label": "Kriteria Fisiologis Klinis 7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria_fisiologis_klinis_8",
        "label": "Kriteria Fisiologis Klinis 8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "prioritas1_1",
      "prioritas1_2",
      "prioritas1_3",
      "prioritas1_4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-kriteria-keluar-icu",
    "slug": "checklist-kriteria-keluar-icu",
    "judul": "Check List Kriteria Keluar ICU",
    "kategori": "M",
    "permissionKey": "checklist_kriteria_keluar_icu",
    "javaRef": "RMChecklistKriteriaKeluarICU",
    "tabel": "checklist_kriteria_keluar_icu",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kriteria1",
        "label": "Kriteria1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria2",
        "label": "Kriteria2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria3",
        "label": "Kriteria3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria4",
        "label": "Kriteria4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria5",
        "label": "Kriteria5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria6",
        "label": "Kriteria6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria7",
        "label": "Kriteria7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria8",
        "label": "Kriteria8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria9",
        "label": "Kriteria9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria10",
        "label": "Kriteria10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "kriteria11",
        "label": "Kriteria11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "nik",
        "label": "NIK",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kriteria1",
      "kriteria2",
      "kriteria3",
      "kriteria4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-perencanaan-pemulangan",
    "slug": "perencanaan-pemulangan",
    "judul": "Perencanaan Pemulangan",
    "kategori": "M",
    "permissionKey": "perencanaan_pemulangan",
    "javaRef": "RMPerencanaanPemulangan",
    "tabel": "perencanaan_pemulangan",
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
        "nama": "rencana_pulang",
        "label": "Rencana Pulang",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "alasan_masuk",
        "label": "Alasan Masuk",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "diagnosa_medis",
        "label": "Diagnosa Medis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "pengaruh_ri_pasien_dan_keluarga",
        "label": "Pengaruh Ri Pasien Dan Keluarga",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_pengaruh_ri_pasien_dan_keluarga",
        "label": "Keterangan Pengaruh Ri Pasien Dan Keluarga",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "pengaruh_ri_pekerjaan_sekolah",
        "label": "Pengaruh Ri Pekerjaan Sekolah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_pengaruh_ri_pekerjaan_sekolah",
        "label": "Keterangan Pengaruh Ri Pekerjaan Sekolah",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pengaruh_ri_keuangan",
        "label": "Pengaruh Ri Keuangan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_pengaruh_ri_keuangan",
        "label": "Keterangan Pengaruh Ri Keuangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "antisipasi_masalah_saat_pulang",
        "label": "Antisipasi Masalah Saat Pulang",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_antisipasi_masalah_saat_pulang",
        "label": "Keterangan Antisipasi Masalah Saat Pulang",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "bantuan_diperlukan_dalam",
        "label": "Bantuan Diperlukan Dalam",
        "tipe": "enum",
        "opsi": [
          "menyiapkan makanan",
          "edukasi kesehatan",
          "makan",
          "mandi",
          "diet",
          "berpakaian",
          "menyiapkan obat",
          "transportasi",
          "minum obat"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_bantuan_diperlukan_dalam",
        "label": "Keterangan Bantuan Diperlukan Dalam",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "adakah_yang_membantu_keperluan",
        "label": "Adakah Yang Membantu Keperluan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ada"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_adakah_yang_membantu_keperluan",
        "label": "Keterangan Adakah Yang Membantu Keperluan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pasien_tinggal_sendiri",
        "label": "Pasien Tinggal Sendiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_pasien_tinggal_sendiri",
        "label": "Keterangan Pasien Tinggal Sendiri",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pasien_menggunakan_peralatan_medis",
        "label": "Pasien Menggunakan Peralatan Medis",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_pasien_menggunakan_peralatan_medis",
        "label": "Keterangan Pasien Menggunakan Peralatan Medis",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "pasien_memerlukan_alat_bantu",
        "label": "Pasien Memerlukan Alat Bantu",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_pasien_memerlukan_alat_bantu",
        "label": "Keterangan Pasien Memerlukan Alat Bantu",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "memerlukan_perawatan_khusus",
        "label": "Memerlukan Perawatan Khusus",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_memerlukan_perawatan_khusus",
        "label": "Keterangan Memerlukan Perawatan Khusus",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "bermasalah_memenuhi_kebutuhan",
        "label": "Bermasalah Memenuhi Kebutuhan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_bermasalah_memenuhi_kebutuhan",
        "label": "Keterangan Bermasalah Memenuhi Kebutuhan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "memiliki_nyeri_kronis",
        "label": "Memiliki Nyeri Kronis",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_memiliki_nyeri_kronis",
        "label": "Keterangan Memiliki Nyeri Kronis",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "memerlukan_edukasi_kesehatan",
        "label": "Memerlukan Edukasi Kesehatan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_memerlukan_edukasi_kesehatan",
        "label": "Keterangan Memerlukan Edukasi Kesehatan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "memerlukan_keterampilkan_khusus",
        "label": "Memerlukan Keterampilkan Khusus",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_memerlukan_keterampilkan_khusus",
        "label": "Keterangan Memerlukan Keterampilkan Khusus",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "nama_pasien_keluarga",
        "label": "Nama Pasien Keluarga",
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
      }
    ],
    "kolomTanggal": "rencana_pulang",
    "kolomCari": [
      "no_rawat",
      "alasan_masuk",
      "diagnosa_medis",
      "pengaruh_ri_pasien_dan_keluarga",
      "keterangan_pengaruh_ri_pasien_dan_keluarga",
      "pengaruh_ri_pekerjaan_sekolah"
    ],
    "kolomUrut": "rencana_pulang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-dewasa",
    "slug": "penilaian-risiko-jatuh-dewasa",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Dewasa",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_resiko_jatuh_dewasa",
    "javaRef": "RMPenilaianLanjutanRisikoJatuhDewasa",
    "tabel": "penilaian_lanjutan_resiko_jatuh_dewasa",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_jatuhmorse_skala1",
        "label": "Penilaian Jatuhmorse Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai1",
        "label": "Penilaian Jatuhmorse Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala2",
        "label": "Penilaian Jatuhmorse Skala2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai2",
        "label": "Penilaian Jatuhmorse Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala3",
        "label": "Penilaian Jatuhmorse Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak ada/kursi roda/perawat/tirah baring",
          "tongkat/alat penopang",
          "berpegangan pada perabot"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai3",
        "label": "Penilaian Jatuhmorse Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala4",
        "label": "Penilaian Jatuhmorse Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai4",
        "label": "Penilaian Jatuhmorse Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala5",
        "label": "Penilaian Jatuhmorse Skala5",
        "tipe": "enum",
        "opsi": [
          "normal/tirah baring/imobilisasi",
          "lemah",
          "terganggu"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai5",
        "label": "Penilaian Jatuhmorse Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala6",
        "label": "Penilaian Jatuhmorse Skala6",
        "tipe": "enum",
        "opsi": [
          "sadar akan kemampuan diri sendiri",
          "sering lupa akan keterbatasan yang dimiliki"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai6",
        "label": "Penilaian Jatuhmorse Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_totalnilai",
        "label": "Penilaian Jatuhmorse Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "penilaian_jatuhmorse_skala1",
      "penilaian_jatuhmorse_skala2",
      "penilaian_jatuhmorse_skala3",
      "penilaian_jatuhmorse_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_jatuhmorse_nilai1",
      "label": "Total Penilaian Jatuhmorse Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-anak",
    "slug": "penilaian-risiko-jatuh-anak",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Anak",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_resiko_jatuh_anak",
    "javaRef": "RMPenilaianLanjutanRisikoJatuhAnak",
    "tabel": "penilaian_lanjutan_resiko_jatuh_anak",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_humptydumpty_skala1",
        "label": "Penilaian Humptydumpty Skala1",
        "tipe": "enum",
        "opsi": [
          "0 - 3 tahun",
          "3 - 7 tahun",
          "7 - 13 tahun",
          "> 13 tahun"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai1",
        "label": "Penilaian Humptydumpty Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala2",
        "label": "Penilaian Humptydumpty Skala2",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai2",
        "label": "Penilaian Humptydumpty Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala3",
        "label": "Penilaian Humptydumpty Skala3",
        "tipe": "enum",
        "opsi": [
          "kelainan neurologi",
          "perubahan dalam oksigen(masalah saluran nafas, dehidrasi, anemia, anoreksia / sakit kepala, dll)",
          "kelainan psikis / perilaku",
          "diagnosa lain"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai3",
        "label": "Penilaian Humptydumpty Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala4",
        "label": "Penilaian Humptydumpty Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak sadar terhadap keterbatasan",
          "lupa keterbatasan",
          "mengetahui kemampuan diri"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai4",
        "label": "Penilaian Humptydumpty Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala5",
        "label": "Penilaian Humptydumpty Skala5",
        "tipe": "enum",
        "opsi": [
          "riwayat jatuh dari tempat tidur saat bayi/anak",
          "pasien menggunakan alat bantu/box/mebel",
          "pasien berada di tempat tidur",
          "di luar ruang rawat"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai5",
        "label": "Penilaian Humptydumpty Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala6",
        "label": "Penilaian Humptydumpty Skala6",
        "tipe": "enum",
        "opsi": [
          "dalam 24 jam",
          "dalam 48 jam",
          "> 48 jam"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai6",
        "label": "Penilaian Humptydumpty Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_skala7",
        "label": "Penilaian Humptydumpty Skala7",
        "tipe": "enum",
        "opsi": [
          "bermacam-macam obat yang digunakan : obat sedative (kecuali pasien icu yang menggunakan sedasi dan paralisis), hipnotik, barbiturat, fenoti-azin, antidepresan, laksans/diuretika,narkotik",
          "salah satu dari pengobatan di atas",
          "pengobatan lain"
        ]
      },
      {
        "nama": "penilaian_humptydumpty_nilai7",
        "label": "Penilaian Humptydumpty Nilai7",
        "tipe": "number"
      },
      {
        "nama": "penilaian_humptydumpty_totalnilai",
        "label": "Penilaian Humptydumpty Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "penilaian_humptydumpty_skala1",
      "penilaian_humptydumpty_skala2",
      "penilaian_humptydumpty_skala3",
      "penilaian_humptydumpty_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_humptydumpty_nilai1",
      "label": "Total Penilaian Humptydumpty Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-lansia",
    "slug": "penilaian-risiko-jatuh-lansia",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Lansia",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_resiko_jatuh_lansia",
    "javaRef": "RMPenilaianLanjutanRisikoJatuhLansia",
    "tabel": "penilaian_lanjutan_resiko_jatuh_lansia",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_jatuhmorse_skala1",
        "label": "Penilaian Jatuhmorse Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "pasien datang karena jatuh",
          "pasien jatuh dalam 2 bulan terakhir"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai1",
        "label": "Penilaian Jatuhmorse Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala2",
        "label": "Penilaian Jatuhmorse Skala2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "pasien delirium",
          "pasien disorientasi",
          "pasien agitasi"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai2",
        "label": "Penilaian Jatuhmorse Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala3",
        "label": "Penilaian Jatuhmorse Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "memakai kaca mata",
          "penglihatan kabur",
          "memiliki glukoma/katarak/degenerasi makula"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai3",
        "label": "Penilaian Jatuhmorse Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala4",
        "label": "Penilaian Jatuhmorse Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "prilaku berkemih/frekuensi/urgensi/incontinensia/nokturia"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai4",
        "label": "Penilaian Jatuhmorse Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala5",
        "label": "Penilaian Jatuhmorse Skala5",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "memerlukan bantuan 1 orang/pengawasan",
          "memerlukan bantuan 2 orang",
          "memerlukan bantuan total"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai5",
        "label": "Penilaian Jatuhmorse Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_skala6",
        "label": "Penilaian Jatuhmorse Skala6",
        "tipe": "enum",
        "opsi": [
          "mandiri",
          "berjalan dengan bantuan 1 orang",
          "menggunakan kursi roda",
          "imobilisasi"
        ]
      },
      {
        "nama": "penilaian_jatuhmorse_nilai6",
        "label": "Penilaian Jatuhmorse Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhmorse_totalnilai",
        "label": "Penilaian Jatuhmorse Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "penilaian_jatuhmorse_skala1",
      "penilaian_jatuhmorse_skala2",
      "penilaian_jatuhmorse_skala3",
      "penilaian_jatuhmorse_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_jatuhmorse_nilai1",
      "label": "Total Penilaian Jatuhmorse Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-geriatri",
    "slug": "penilaian-risiko-jatuh-geriatri",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Geriatri",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_resiko_jatuh_geriatri",
    "javaRef": "RMPenilaianLanjutanRisikoJatuhGeriatri",
    "tabel": "penilaian_lanjutan_resiko_jatuh_geriatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_jatuh_skala1",
        "label": "Penilaian Jatuh Skala1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai1",
        "label": "Penilaian Jatuh Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala2",
        "label": "Penilaian Jatuh Skala2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai2",
        "label": "Penilaian Jatuh Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala3",
        "label": "Penilaian Jatuh Skala3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai3",
        "label": "Penilaian Jatuh Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala4",
        "label": "Penilaian Jatuh Skala4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai4",
        "label": "Penilaian Jatuh Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala5",
        "label": "Penilaian Jatuh Skala5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai5",
        "label": "Penilaian Jatuh Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala6",
        "label": "Penilaian Jatuh Skala6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai6",
        "label": "Penilaian Jatuh Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala7",
        "label": "Penilaian Jatuh Skala7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai7",
        "label": "Penilaian Jatuh Nilai7",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala8",
        "label": "Penilaian Jatuh Skala8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai8",
        "label": "Penilaian Jatuh Nilai8",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala9",
        "label": "Penilaian Jatuh Skala9",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai9",
        "label": "Penilaian Jatuh Nilai9",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala10",
        "label": "Penilaian Jatuh Skala10",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai10",
        "label": "Penilaian Jatuh Nilai10",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_skala11",
        "label": "Penilaian Jatuh Skala11",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penilaian_jatuh_nilai11",
        "label": "Penilaian Jatuh Nilai11",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuh_totalnilai",
        "label": "Penilaian Jatuh Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "penilaian_jatuh_skala1",
      "penilaian_jatuh_skala2",
      "penilaian_jatuh_skala3",
      "penilaian_jatuh_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_jatuh_nilai1",
      "label": "Total Penilaian Jatuh Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-neonatus",
    "slug": "penilaian-risiko-jatuh-neonatus",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Neonatus",
    "kategori": "M",
    "permissionKey": "penilaian_risiko_jatuh_neonatus",
    "javaRef": "RMPenilaianRisikoJatuhNeonatus",
    "tabel": "penilaian_risiko_jatuh_neonatus",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "intervensi1",
        "label": "Intervensi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi2",
        "label": "Intervensi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi3",
        "label": "Intervensi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi4",
        "label": "Intervensi4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi5",
        "label": "Intervensi5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi6",
        "label": "Intervensi6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi7",
        "label": "Intervensi7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi8",
        "label": "Intervensi8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "intervensi9",
        "label": "Intervensi9",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi1",
        "label": "Edukasi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi2",
        "label": "Edukasi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi3",
        "label": "Edukasi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi4",
        "label": "Edukasi4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "edukasi5",
        "label": "Edukasi5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sasaran1",
        "label": "Sasaran1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sasaran2",
        "label": "Sasaran2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sasaran3",
        "label": "Sasaran3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sasaran4",
        "label": "Sasaran4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "evaluasi1",
        "label": "Evaluasi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "evaluasi2",
        "label": "Evaluasi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "evaluasi3",
        "label": "Evaluasi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
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
      "no_rawat",
      "tanggal",
      "intervensi1",
      "intervensi2",
      "intervensi3",
      "intervensi4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-jatuh-psikiatri",
    "slug": "penilaian-risiko-jatuh-psikiatri",
    "judul": "Pengkajian Lanjutan Risiko Jatuh Psikiatri",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_resiko_jatuh_psikiatri",
    "javaRef": "RMPenilaianLanjutanRisikoJatuhPsikiatri",
    "tabel": "penilaian_lanjutan_resiko_jatuh_psikiatri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_jatuhedmonson_skala1",
        "label": "Penilaian Jatuhedmonson Skala1",
        "tipe": "enum",
        "opsi": [
          "-",
          "kurang dari 50 th",
          "50 - 70 th",
          "lebih dari 70 th"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai1",
        "label": "Penilaian Jatuhedmonson Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_skala2",
        "label": "Penilaian Jatuhedmonson Skala2",
        "tipe": "enum",
        "opsi": [
          "-",
          "kesadaran/orientasi baik setiap saat",
          "agitasi/ansietas",
          "kadang-kadang bingung",
          "bingung/disorientasi"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai2",
        "label": "Penilaian Jatuhedmonson Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_skala3",
        "label": "Penilaian Jatuhedmonson Skala3",
        "tipe": "enum",
        "opsi": [
          "-",
          "mandiri & mampu mengontrol bab/bak",
          "dower catheter/colostomy",
          "eliminasi dengan bantuan",
          "gangguan eliminasi (inkontinensia/nokturia/frekuensi)",
          "inkontinensia tetapi mampu untuk mobilisasi"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai3",
        "label": "Penilaian Jatuhedmonson Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_skala4",
        "label": "Penilaian Jatuhedmonson Skala4",
        "tipe": "enum",
        "opsi": [
          "-",
          "tanpa obat-obatan",
          "obat-obatan jantung",
          "obat-obatan psikotropika (termasuk benzodiazepine & antidepresan)",
          "mendapat tambahan obat-obatan & atau obat prn selama 24 jam terakhir"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai4",
        "label": "Penilaian Jatuhedmonson Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_skala5",
        "label": "Penilaian Jatuhedmonson Skala5",
        "tipe": "enum",
        "opsi": [
          "-",
          "bipolar/gangguan schizoaffective",
          "penggunaan obat-obatan terlarang, ketergantungan alkohol",
          "gangguan depresi mayor",
          "demensia/delirium"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai5",
        "label": "Penilaian Jatuhedmonson Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_skala6",
        "label": "Penilaian Jatuhedmonson Skala6",
        "tipe": "enum",
        "opsi": [
          "-",
          "mandiri/keseimbangan baik/imobilisasi",
          "dengan alat bantu (kursi roda, walker, dll)",
          "vertigo/kelemahan",
          "goyah/membutuhkan bantuan & menyadari kemampuan",
          "goyah tapi lupa keterbatasan"
        ]
      },
      {
        "nama": "penilaian_jatuhedmonson_nilai6",
        "label": "Penilaian Jatuhedmonson Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_jatuhedmonson_totalnilai",
        "label": "Penilaian Jatuhedmonson Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "saran",
        "label": "Saran",
        "tipe": "text",
        "maks": 200
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
      "no_rawat",
      "tanggal",
      "penilaian_jatuhedmonson_skala1",
      "penilaian_jatuhedmonson_skala2",
      "penilaian_jatuhedmonson_skala3",
      "penilaian_jatuhedmonson_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_jatuhedmonson_nilai1",
      "label": "Total Penilaian Jatuhedmonson Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-lanjutan-skrining-fungsional",
    "slug": "penilaian-lanjutan-skrining-fungsional",
    "judul": "Pengkajian Lanjutan Skrining Fungsional",
    "kategori": "M",
    "permissionKey": "penilaian_lanjutan_skrining_fungsional",
    "javaRef": "RMPenilaianLanjutanSkriningFungsional",
    "tabel": "penilaian_lanjutan_skrining_fungsional",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "penilaian_skrining_skala1",
        "label": "Penilaian Skrining Skala1",
        "tipe": "enum",
        "opsi": [
          "tak terkendali/tak teratur (perlu pencahar)",
          "kadang-kadang tak terkendali (1x seminggu)",
          "terkendali teratur"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai1",
        "label": "Penilaian Skrining Nilai1",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala2",
        "label": "Penilaian Skrining Skala2",
        "tipe": "enum",
        "opsi": [
          "tak terkendali/pakai kateter",
          "kadang-kadang tak terkendali (hanya 1x/24 jam )",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai2",
        "label": "Penilaian Skrining Nilai2",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala3",
        "label": "Penilaian Skrining Skala3",
        "tipe": "enum",
        "opsi": [
          "butuh pertolongan orang lain",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai3",
        "label": "Penilaian Skrining Nilai3",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala4",
        "label": "Penilaian Skrining Skala4",
        "tipe": "enum",
        "opsi": [
          "tergantung pertolongan orang lain",
          "perlu pertolongan pada beberapa kegiatan tetapi dapat mengerjakan sendiri beberapa kegiatan yang lain",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai4",
        "label": "Penilaian Skrining Nilai4",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala5",
        "label": "Penilaian Skrining Skala5",
        "tipe": "enum",
        "opsi": [
          "tidak mampu",
          "perlu ditolong memotong makanan",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai5",
        "label": "Penilaian Skrining Nilai5",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala6",
        "label": "Penilaian Skrining Skala6",
        "tipe": "enum",
        "opsi": [
          "tidak mampu",
          "perlu banyak bantuan untuk bisa duduk (2 orang)",
          "bantuan minimal 1 orang",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai6",
        "label": "Penilaian Skrining Nilai6",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala7",
        "label": "Penilaian Skrining Skala7",
        "tipe": "enum",
        "opsi": [
          "tidak mampu",
          "bisa (pindah) dengan kursi roda",
          "berjalan dengan bantuan 1 orang",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai7",
        "label": "Penilaian Skrining Nilai7",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala8",
        "label": "Penilaian Skrining Skala8",
        "tipe": "enum",
        "opsi": [
          "tergantung orang lain",
          "sebagian dibantu (misal mengancing baju)",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai8",
        "label": "Penilaian Skrining Nilai8",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala9",
        "label": "Penilaian Skrining Skala9",
        "tipe": "enum",
        "opsi": [
          "tidak mampu",
          "butuh pertolongan",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai9",
        "label": "Penilaian Skrining Nilai9",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_skala10",
        "label": "Penilaian Skrining Skala10",
        "tipe": "enum",
        "opsi": [
          "tergantung orang lain",
          "mandiri"
        ]
      },
      {
        "nama": "penilaian_skrining_nilai10",
        "label": "Penilaian Skrining Nilai10",
        "tipe": "number"
      },
      {
        "nama": "penilaian_skrining_totalnilai",
        "label": "Penilaian Skrining Totalnilai",
        "tipe": "uang"
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
      "no_rawat",
      "tanggal",
      "penilaian_skrining_skala1",
      "penilaian_skrining_skala2",
      "penilaian_skrining_skala3",
      "penilaian_skrining_skala4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "penilaian_skrining_nilai1",
      "label": "Total Penilaian Skrining Nilai1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-ulang-nyeri",
    "slug": "penilaian-ulang-nyeri",
    "judul": "Pengkajian Ulang Nyeri",
    "kategori": "M",
    "permissionKey": "penilaian_ulang_nyeri",
    "javaRef": "RMPenilaianUlangNyeri",
    "tabel": "penilaian_ulang_nyeri",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "nyeri",
        "label": "Nyeri",
        "tipe": "enum",
        "opsi": [
          "tidak ada nyeri",
          "nyeri akut",
          "nyeri kronis"
        ],
        "wajib": true
      },
      {
        "nama": "provokes",
        "label": "Provokes",
        "tipe": "enum",
        "opsi": [
          "proses penyakit",
          "benturan",
          "lain-lain",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ket_provokes",
        "label": "Ket Provokes",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "quality",
        "label": "Quality",
        "tipe": "enum",
        "opsi": [
          "seperti tertusuk",
          "berdenyut",
          "teriris",
          "tertindih",
          "tertiban",
          "lain-lain",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ket_quality",
        "label": "Ket Quality",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lokasi",
        "label": "Lokasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "menyebar",
        "label": "Menyebar",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "skala_nyeri",
        "label": "Skala Nyeri",
        "tipe": "enum",
        "opsi": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ],
        "wajib": true
      },
      {
        "nama": "durasi",
        "label": "Durasi",
        "tipe": "text",
        "maks": 25,
        "wajib": true
      },
      {
        "nama": "nyeri_hilang",
        "label": "Nyeri Hilang",
        "tipe": "enum",
        "opsi": [
          "istirahat",
          "medengar musik",
          "minum obat",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ket_nyeri",
        "label": "Ket Nyeri",
        "tipe": "text",
        "maks": 40,
        "wajib": true
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
      "no_rawat",
      "tanggal",
      "nyeri",
      "provokes",
      "ket_provokes",
      "quality"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-risiko-dekubitus",
    "slug": "penilaian-risiko-dekubitus",
    "judul": "Pengkajian Risiko Dekubitus",
    "kategori": "M",
    "permissionKey": "penilaian_risiko_dekubitus",
    "javaRef": "RMPenilaianRisikoDekubitus",
    "tabel": "penilaian_risiko_dekubitus",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kondisi_fisik",
        "label": "Kondisi Fisik",
        "tipe": "enum",
        "opsi": [
          "baik",
          "sedang",
          "buruk",
          "sangat buruk"
        ]
      },
      {
        "nama": "kondisi_fisik_nilai",
        "label": "Kondisi Fisik Nilai",
        "tipe": "number"
      },
      {
        "nama": "status_mental",
        "label": "Status Mental",
        "tipe": "enum",
        "opsi": [
          "sadar",
          "apatis",
          "bingung",
          "stupor"
        ]
      },
      {
        "nama": "status_mental_nilai",
        "label": "Status Mental Nilai",
        "tipe": "number"
      },
      {
        "nama": "aktifitas",
        "label": "Aktifitas",
        "tipe": "enum",
        "opsi": [
          "jalan sendiri",
          "jalan dengan bantuan",
          "kursi roda",
          "di tempat tidur"
        ]
      },
      {
        "nama": "aktifitas_nilai",
        "label": "Aktifitas Nilai",
        "tipe": "number"
      },
      {
        "nama": "mobilitas",
        "label": "Mobilitas",
        "tipe": "enum",
        "opsi": [
          "bebas bergerak",
          "agar terbatas",
          "sangat terbatas",
          "tidak mampu bergerak"
        ]
      },
      {
        "nama": "mobilitas_nilai",
        "label": "Mobilitas Nilai",
        "tipe": "number"
      },
      {
        "nama": "inkontinensia",
        "label": "Inkontinensia",
        "tipe": "enum",
        "opsi": [
          "kontinen",
          "kadang-kadang inkontinensia urine",
          "selalu inkontenesia urine",
          "inkontinensia alvi dan urine"
        ]
      },
      {
        "nama": "inkontinensia_nilai",
        "label": "Inkontinensia Nilai",
        "tipe": "number"
      },
      {
        "nama": "totalnilai",
        "label": "Totalnilai",
        "tipe": "uang"
      },
      {
        "nama": "kategorinilai",
        "label": "Kategorinilai",
        "tipe": "enum",
        "opsi": [
          "risiko rendah",
          "risiko sedang",
          "risiko tinggi"
        ]
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
      "no_rawat",
      "tanggal",
      "kondisi_fisik",
      "status_mental",
      "aktifitas",
      "mobilitas"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "kondisi_fisik_nilai",
      "label": "Total Kondisi Fisik Nilai"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-layanan-kedokteran-fisik-rehabilitasi",
    "slug": "layanan-kedokteran-fisik-rehabilitasi",
    "judul": "Layanan Kedokteran Fisik & Rehabilitasi",
    "kategori": "M",
    "permissionKey": "layanan_kedokteran_fisik_rehabilitasi",
    "javaRef": "RMLayananKedokteranFisikRehabilitasi",
    "tabel": "layanan_kedokteran_fisik_rehabilitasi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "pendamping",
        "label": "Pendamping",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "suami",
          "istri",
          "anak",
          "keluarga",
          "lainnya"
        ]
      },
      {
        "nama": "keterangan_pendamping",
        "label": "Keterangan Pendamping",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "anamnesa",
        "label": "Anamnesa",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "pemeriksaan_fisik",
        "label": "Pemeriksaan Fisik",
        "tipe": "text",
        "maks": 1500
      },
      {
        "nama": "diagnosa_medis",
        "label": "Diagnosa Medis",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "diagnosa_fungsi",
        "label": "Diagnosa Fungsi",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tatalaksana",
        "label": "Tatalaksana",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "anjuran",
        "label": "Anjuran",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      },
      {
        "nama": "suspek_penyakit_kerja",
        "label": "Suspek Penyakit Kerja",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_suspek_penyakit_kerja",
        "label": "Keterangan Suspek Penyakit Kerja",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "status_program",
        "label": "Status Program",
        "tipe": "enum",
        "opsi": [
          "belum selesai",
          "sudah selesai"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "pendamping",
      "keterangan_pendamping",
      "anamnesa",
      "pemeriksaan_fisik"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-layanan-program-kfr",
    "slug": "layanan-program-kfr",
    "judul": "Layanan Program KFR",
    "kategori": "M",
    "permissionKey": "layanan_program_kfr",
    "javaRef": "RMLayananProgramKFR",
    "tabel": "layanan_program_kfr",
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
        "nama": "no_rawat_layanan",
        "label": "No Rawat Layanan",
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
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "program",
        "label": "Program",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "no_rawat_layanan",
      "nip",
      "program"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-uji-fungsi-kfr",
    "slug": "uji-fungsi-kfr",
    "judul": "Uji Fungsi/Prosedur KFR",
    "kategori": "M",
    "permissionKey": "uji_fungsi_kfr",
    "javaRef": "RMUjiFungsiKFR",
    "tabel": "uji_fungsi_kfr",
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
        "tipe": "datetime"
      },
      {
        "nama": "diagnosis_fungsional",
        "label": "Diagnosis Fungsional",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "diagnosis_medis",
        "label": "Diagnosis Medis",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hasil_didapat",
        "label": "Hasil Didapat",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "rekomedasi",
        "label": "Rekomedasi",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "diagnosis_fungsional",
      "diagnosis_medis",
      "hasil_didapat",
      "kesimpulan",
      "rekomedasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-dokumentasi-tindakan-eswl",
    "slug": "dokumentasi-tindakan-eswl",
    "judul": "Dokumentasi Tindakan ESWL",
    "kategori": "M",
    "permissionKey": "hasil_tindakan_eswl",
    "javaRef": "RMHasilTindakanESWL",
    "tabel": "hasil_tindakan_eswl",
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
        "nama": "mulai",
        "label": "Mulai",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "selesai",
        "label": "Selesai",
        "tipe": "datetime",
        "wajib": true
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
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "tindakan",
        "label": "Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "obat_analgesik",
        "label": "Obat Analgesik",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "obat_lain",
        "label": "Obat Lain",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "uraian_tindakan",
        "label": "Uraian Tindakan",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "uraian_tindakan_focus",
        "label": "Uraian Tindakan Focus",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "uraian_tindakan_rate",
        "label": "Uraian Tindakan Rate",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "uraian_tindakan_power",
        "label": "Uraian Tindakan Power",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "uraian_tindakan_shock",
        "label": "Uraian Tindakan Shock",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "diintegrasi",
        "label": "Diintegrasi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kekurangan",
        "label": "Kekurangan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "anjungan",
        "label": "Anjungan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      }
    ],
    "kolomTanggal": "mulai",
    "kolomCari": [
      "no_rawat",
      "mulai",
      "kd_dokter",
      "nip",
      "diagnosa",
      "tindakan"
    ],
    "kolomUrut": "mulai",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-master-kesimpulan-anjuran-mcu",
    "slug": "master-kesimpulan-anjuran-mcu",
    "judul": "Master Kesimpulan & Anjuran MCU",
    "kategori": "M",
    "permissionKey": "master_kesimpulan_anjuran_mcu",
    "javaRef": "RMMasterKesimpulanAnjuranMCU",
    "tabel": "master_kesimpulan_anjuran_mcu",
    "kolom": [
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "anjuran",
        "label": "Anjuran",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 150
      }
    ],
    "kolomCari": [
      "kesimpulan",
      "anjuran"
    ],
    "kolomUrut": "kesimpulan",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-penilaian-mcu",
    "slug": "penilaian-mcu",
    "judul": "Pengkajian MCU",
    "kategori": "M",
    "permissionKey": "penilaian_mcu",
    "javaRef": "RMMCU",
    "tabel": "penilaian_mcu",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "informasi",
        "label": "Informasi",
        "tipe": "enum",
        "opsi": [
          "autoanamnesis",
          "alloanamnesis"
        ],
        "wajib": true
      },
      {
        "nama": "rps",
        "label": "Rps",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "rpk",
        "label": "Rpk",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "rpd",
        "label": "Rpd",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 150,
        "wajib": true
      },
      {
        "nama": "keadaan",
        "label": "Keadaan",
        "tipe": "enum",
        "opsi": [
          "baik",
          "tidak baik"
        ],
        "wajib": true
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "composmentis",
          "apatis",
          "somnolen"
        ],
        "wajib": true
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8,
        "wajib": true
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "tb",
        "label": "TB",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bb",
        "label": "BB",
        "tipe": "text",
        "maks": 5,
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
        "nama": "bmi",
        "label": "Bmi",
        "tipe": "text",
        "maks": 6,
        "wajib": true
      },
      {
        "nama": "kasifikasi_bmi",
        "label": "Kasifikasi Bmi",
        "tipe": "enum",
        "opsi": [
          "berat badan kurang",
          "berat badan normal",
          "kelebihan berat badan",
          "obesitas i",
          "obesitas ii"
        ],
        "wajib": true
      },
      {
        "nama": "lingkar_pinggang",
        "label": "Lingkar Pinggang",
        "tipe": "text",
        "maks": 6,
        "wajib": true
      },
      {
        "nama": "risiko_lingkar_pinggang",
        "label": "Risiko Lingkar Pinggang",
        "tipe": "enum",
        "opsi": [
          "rendah",
          "cukup",
          "meningkat",
          "moderat",
          "berat",
          "sangat"
        ],
        "wajib": true
      },
      {
        "nama": "submandibula",
        "label": "Submandibula",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "axilla",
        "label": "Axilla",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "supraklavikula",
        "label": "Supraklavikula",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "leher",
        "label": "Leher",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "inguinal",
        "label": "Inguinal",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "oedema",
        "label": "Oedema",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "sinus_frontalis",
        "label": "Sinus Frontalis",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "="
        ],
        "wajib": true
      },
      {
        "nama": "sinus_maxilaris",
        "label": "Sinus Maxilaris",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "rambut",
        "label": "Rambut",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "palpebra",
        "label": "Palpebra",
        "tipe": "enum",
        "opsi": [
          "normal",
          "oedem",
          "ptosis",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "sklera",
        "label": "Sklera",
        "tipe": "enum",
        "opsi": [
          "normal",
          "ikterik",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "cornea",
        "label": "Cornea",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "buta_warna",
        "label": "Buta Warna",
        "tipe": "enum",
        "opsi": [
          "normal",
          "buta warna partial",
          "buta warna total",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "konjungtiva",
        "label": "Konjungtiva",
        "tipe": "enum",
        "opsi": [
          "normal",
          "anemis",
          "hiperemis",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "lensa",
        "label": "Lensa",
        "tipe": "enum",
        "opsi": [
          "jernih",
          "keruh",
          "kacamata",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "pupil",
        "label": "Pupil",
        "tipe": "enum",
        "opsi": [
          "isokor",
          "anisokor",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "menggunakan_kacamata",
        "label": "Menggunakan Kacamata",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "visus",
        "label": "Visus",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "luas_lapang_pandang",
        "label": "Luas Lapang Pandang",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_luas_lapang_pandang",
        "label": "Keterangan Luas Lapang Pandang",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "lubang_telinga",
        "label": "Lubang Telinga",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "lapang",
          "sempit",
          "serumen prop",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "daun_telinga",
        "label": "Daun Telinga",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "selaput_pendengaran",
        "label": "Selaput Pendengaran",
        "tipe": "enum",
        "opsi": [
          "intak",
          "tidak intak",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "proc_mastoideus",
        "label": "Proc Mastoideus",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "septum_nasi",
        "label": "Septum Nasi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "deviasi",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "lubang_hidung",
        "label": "Lubang Hidung",
        "tipe": "enum",
        "opsi": [
          "lapang",
          "rhinore",
          "epistaksis",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "sinus",
        "label": "Sinus",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "bibir",
        "label": "Bibir",
        "tipe": "enum",
        "opsi": [
          "lembab",
          "kering"
        ],
        "wajib": true
      },
      {
        "nama": "gusi",
        "label": "Gusi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "gigi",
        "label": "Gigi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "caries",
        "label": "Caries",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "lidah",
        "label": "Lidah",
        "tipe": "enum",
        "opsi": [
          "bersih",
          "kotor",
          "tremor",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "faring",
        "label": "Faring",
        "tipe": "enum",
        "opsi": [
          "normal",
          "hiperemis",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "tonsil",
        "label": "Tonsil",
        "tipe": "enum",
        "opsi": [
          "t1-t1",
          "t2-t2",
          "t3-t3",
          "t4-t4",
          "t0-t0",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "kelenjar_limfe",
        "label": "Kelenjar Limfe",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "kelenjar_gondok",
        "label": "Kelenjar Gondok",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "gerakan_dada",
        "label": "Gerakan Dada",
        "tipe": "enum",
        "opsi": [
          "simetris",
          "tidak simetris",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "vocal_femitus",
        "label": "Vocal Femitus",
        "tipe": "enum",
        "opsi": [
          "sama",
          "tidak sama",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "perkusi_dada",
        "label": "Perkusi Dada",
        "tipe": "enum",
        "opsi": [
          "sonor",
          "pekak",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "bunyi_napas",
        "label": "Bunyi Napas",
        "tipe": "enum",
        "opsi": [
          "vesikuler",
          "bronkhial",
          "trakeal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "bunyi_tambahan",
        "label": "Bunyi Tambahan",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "wheezing",
          "ronchi",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ictus_cordis",
        "label": "Ictus Cordis",
        "tipe": "enum",
        "opsi": [
          "tidak terlihat",
          "terlihat",
          " teraba",
          "tidak teraba",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "bunyi_jantung",
        "label": "Bunyi Jantung",
        "tipe": "enum",
        "opsi": [
          "reguler",
          "irreguler",
          "gallop",
          "lain-lain",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "batas",
        "label": "Batas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "melebar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "mamae",
        "label": "Mamae",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_mamae",
        "label": "Keterangan Mamae",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "inspeksi",
        "label": "Inspeksi",
        "tipe": "enum",
        "opsi": [
          "datar",
          "cembung",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "palpasi",
        "label": "Palpasi",
        "tipe": "enum",
        "opsi": [
          "supel",
          "tegang (defans muscular)",
          "nyeri tekan epigastrium",
          "nyeri tekan suprapubik",
          "nyeri tekan right lower quadrant",
          "nyeri tekan left lower quadrant",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "hepar",
        "label": "Hepar",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "perkusi_abdomen",
        "label": "Perkusi Abdomen",
        "tipe": "enum",
        "opsi": [
          "timpani",
          "hipertimpani",
          "dull",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "auskultasi",
        "label": "Auskultasi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "bising usus meningkat",
          "bising usus menurun",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "limpa",
        "label": "Limpa",
        "tipe": "enum",
        "opsi": [
          "tidak membesar",
          "membesar",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "costovertebral",
        "label": "Costovertebral",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada di kiri",
          "ada di kanan",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "scoliosis",
        "label": "Scoliosis",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "kondisi_kulit",
        "label": "Kondisi Kulit",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tato",
          "penyakit kulit",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "penyakit_kulit",
        "label": "Penyakit Kulit",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "ekstrimitas_atas",
        "label": "Ekstrimitas Atas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ekstrimitas_atas_ket",
        "label": "Ekstrimitas Atas Ket",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "ekstrimitas_bawah",
        "label": "Ekstrimitas Bawah",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "ekstrimitas_bawah_ket",
        "label": "Ekstrimitas Bawah Ket",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "area_genitalia",
        "label": "Area Genitalia",
        "tipe": "enum",
        "opsi": [
          "tidak ada kelainan",
          "ada kelainan",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_area_genitalia",
        "label": "Keterangan Area Genitalia",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "anus_perianal",
        "label": "Anus Perianal",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak normal",
          "-"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_anus_perianal",
        "label": "Keterangan Anus Perianal",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "laborat",
        "label": "Laborat",
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
        "nama": "ekg",
        "label": "EKG",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "spirometri",
        "label": "Spirometri",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "audiometri",
        "label": "Audiometri",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "treadmill",
        "label": "Treadmill",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "romberg_test",
        "label": "Romberg Test",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "back_strength",
        "label": "Back Strength",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "abi_tangan_kanan",
        "label": "Abi Tangan Kanan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "abi_tangan_kiri",
        "label": "Abi Tangan Kiri",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "abi_kaki_kanan",
        "label": "Abi Kaki Kanan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "abi_kaki_kiri",
        "label": "Abi Kaki Kiri",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "lainlain",
        "label": "Lainlain",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "merokok",
        "label": "Merokok",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "alkohol",
        "label": "Alkohol",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      },
      {
        "nama": "anjuran",
        "label": "Anjuran",
        "tipe": "text",
        "maks": 5000,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "informasi",
      "rps",
      "rpk",
      "rpd"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-konseling-farmasi",
    "slug": "konseling-farmasi",
    "judul": "Konseling Farmasi",
    "kategori": "M",
    "permissionKey": "konseling_farmasi",
    "javaRef": "RMKonselingFarmasi",
    "tabel": "konseling_farmasi",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "diagnosa",
        "label": "Diagnosa",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "obat_pemakaian",
        "label": "Obat Pemakaian",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "riwayat_alergi",
        "label": "Riwayat Alergi",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "pernah_datang",
        "label": "Pernah Datang",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "tindak_lanjut",
        "label": "Tindak Lanjut",
        "tipe": "text",
        "maks": 400
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
      "no_rawat",
      "diagnosa",
      "obat_pemakaian",
      "riwayat_alergi",
      "keluhan",
      "tindak_lanjut"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pelayanan-informasi-obat",
    "slug": "pelayanan-informasi-obat",
    "judul": "Pelayanan Informasi Obat",
    "kategori": "M",
    "permissionKey": "pelayanan_informasi_obat",
    "javaRef": "DlgPermintaanPelayananInformasiObat",
    "tabel": "pelayanan_informasi_obat",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
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
        "nama": "metode",
        "label": "Metode",
        "tipe": "enum",
        "opsi": [
          "Lisan",
          "Tertulis",
          "Telepon"
        ]
      },
      {
        "nama": "penanya",
        "label": "Penanya",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "status_penanya",
        "label": "Status Penanya",
        "tipe": "enum",
        "opsi": [
          "Pasien",
          "Keluarga Pasien",
          "Petugas Kesehatan"
        ]
      },
      {
        "nama": "no_telp_penanya",
        "label": "No Telp Penanya",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "jenis_pertanyaan",
        "label": "Jenis Pertanyaan",
        "tipe": "enum",
        "opsi": [
          "Identifikasi Obat",
          "Interaksi Obat",
          "Harga Obat",
          "Kontraindikasi",
          "Cara Pemakaian",
          "Stabilitas",
          "Dosis",
          "Keracunan",
          "Efek Samping Obat",
          "Penggunaan Terapeutik",
          "Farmakokinetika",
          "Farmakodinamika",
          "Ketersediaan Obat",
          "Lain-lain"
        ]
      },
      {
        "nama": "keterangan_jenis_pertanyaan",
        "label": "Keterangan Jenis Pertanyaan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "uraian_pertanyaan",
        "label": "Uraian Pertanyaan",
        "tipe": "text",
        "maks": 500
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "no_rawat",
      "penanya",
      "no_telp_penanya",
      "keterangan_jenis_pertanyaan",
      "uraian_pertanyaan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-konsultasi-medik",
    "slug": "konsultasi-medik",
    "judul": "Konsultasi Medik",
    "kategori": "M",
    "permissionKey": "konsultasi_medik",
    "javaRef": "DlgPermintaanKonsultasiMedik",
    "tabel": "konsultasi_medik",
    "kolom": [
      {
        "nama": "no_permintaan",
        "label": "No Permintaan",
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
        "nama": "jenis_permintaan",
        "label": "Jenis Permintaan",
        "tipe": "enum",
        "opsi": [
          "Konsultasi",
          "Evaluasi",
          "Rawat Bersama",
          "Alih Rawat",
          "Pre/Post Operasi"
        ]
      },
      {
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_dokter_dikonsuli",
        "label": "Kd Dokter Dikonsuli",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosa_kerja",
        "label": "Diagnosa Kerja",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "uraian_konsultasi",
        "label": "Uraian Konsultasi",
        "tipe": "text",
        "maks": 800
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_permintaan",
      "no_rawat",
      "kd_dokter",
      "kd_dokter_dikonsuli",
      "diagnosa_kerja",
      "uraian_konsultasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-transfer-pasien-antar-ruang",
    "slug": "transfer-pasien-antar-ruang",
    "judul": "Transfer Pasien Antar Ruang",
    "kategori": "M",
    "permissionKey": "transfer_pasien_antar_ruang",
    "javaRef": "RMTransferPasienAntarRuang",
    "tabel": "transfer_pasien_antar_ruang",
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
        "nama": "tanggal_masuk",
        "label": "Tanggal Masuk",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "tanggal_pindah",
        "label": "Tanggal Pindah",
        "tipe": "datetime"
      },
      {
        "nama": "asal_ruang",
        "label": "Asal Ruang",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "ruang_selanjutnya",
        "label": "Ruang Selanjutnya",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "diagnosa_utama",
        "label": "Diagnosa Utama",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diagnosa_sekunder",
        "label": "Diagnosa Sekunder",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "indikasi_pindah_ruang",
        "label": "Indikasi Pindah Ruang",
        "tipe": "enum",
        "opsi": [
          "kondisi pasien stabil",
          "kondisi pasien tidak ada perubahan",
          "kondisi pasien memburuk",
          "fasilitas kurang memadai",
          "fasilitas butuh lebih baik",
          "tenaga membutuhkan yang lebih ahli",
          "tenaga kurang",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_indikasi_pindah_ruang",
        "label": "Keterangan Indikasi Pindah Ruang",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "prosedur_yang_sudah_dilakukan",
        "label": "Prosedur Yang Sudah Dilakukan",
        "tipe": "text",
        "maks": 800
      },
      {
        "nama": "obat_yang_telah_diberikan",
        "label": "Obat Yang Telah Diberikan",
        "tipe": "text",
        "maks": 1200
      },
      {
        "nama": "metode_pemindahan_pasien",
        "label": "Metode Pemindahan Pasien",
        "tipe": "enum",
        "opsi": [
          "kursi roda",
          "tempat tidur",
          "brankar",
          "jalan sendiri",
          "-"
        ]
      },
      {
        "nama": "peralatan_yang_menyertai",
        "label": "Peralatan Yang Menyertai",
        "tipe": "enum",
        "opsi": [
          "oksigen portable",
          "infus",
          "ngt",
          "syringe pump",
          "suction",
          "kateter urin",
          "tidak ada"
        ]
      },
      {
        "nama": "keterangan_peralatan_yang_menyertai",
        "label": "Keterangan Peralatan Yang Menyertai",
        "tipe": "text",
        "maks": 90
      },
      {
        "nama": "pemeriksaan_penunjang_yang_dilakukan",
        "label": "Pemeriksaan Penunjang Yang Dilakukan",
        "tipe": "text",
        "maks": 700
      },
      {
        "nama": "pasien_keluarga_menyetujui",
        "label": "Pasien Keluarga Menyetujui",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nama_menyetujui",
        "label": "Nama Menyetujui",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hubungan_menyetujui",
        "label": "Hubungan Menyetujui",
        "tipe": "enum",
        "opsi": [
          "kakak",
          "adik",
          "saudara",
          "keluarga",
          "kakek",
          "nenek",
          "orang tua",
          "suami",
          "istri",
          "penanggung jawab",
          "menantu",
          "ipar",
          "mertua",
          "-"
        ]
      },
      {
        "nama": "keluhan_utama_sebelum_transfer",
        "label": "Keluhan Utama Sebelum Transfer",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "keadaan_umum_sebelum_transfer",
        "label": "Keadaan Umum Sebelum Transfer",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "gelisah",
          "delirium",
          "koma"
        ]
      },
      {
        "nama": "td_sebelum_transfer",
        "label": "TD Sebelum Transfer",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "nadi_sebelum_transfer",
        "label": "Nadi Sebelum Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr_sebelum_transfer",
        "label": "RR Sebelum Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu_sebelum_transfer",
        "label": "Suhu Sebelum Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "keluhan_utama_sesudah_transfer",
        "label": "Keluhan Utama Sesudah Transfer",
        "tipe": "text",
        "maks": 300
      },
      {
        "nama": "keadaan_umum_sesudah_transfer",
        "label": "Keadaan Umum Sesudah Transfer",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "gelisah",
          "delirium",
          "koma"
        ]
      },
      {
        "nama": "td_sesudah_transfer",
        "label": "TD Sesudah Transfer",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "nadi_sesudah_transfer",
        "label": "Nadi Sesudah Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr_sesudah_transfer",
        "label": "RR Sesudah Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "suhu_sesudah_transfer",
        "label": "Suhu Sesudah Transfer",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip_menyerahkan",
        "label": "Nip Menyerahkan",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "nip_menerima",
        "label": "Nip Menerima",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal_masuk",
    "kolomCari": [
      "no_rawat",
      "tanggal_masuk",
      "asal_ruang",
      "ruang_selanjutnya",
      "diagnosa_utama",
      "diagnosa_sekunder"
    ],
    "kolomUrut": "tanggal_masuk",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengkajian-restrain",
    "slug": "pengkajian-restrain",
    "judul": "Pengkajian Restrain",
    "kategori": "M",
    "permissionKey": "pengkajian_restrain",
    "javaRef": "RMPengkajianRestrain",
    "tabel": "pengkajian_restrain",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "refleka_cahaya_ka",
        "label": "Refleka Cahaya Ka",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "refleka_cahaya_ki",
        "label": "Refleka Cahaya Ki",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "ukuran_pupil_ka",
        "label": "Ukuran Pupil Ka",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "ukuran_pupil_ki",
        "label": "Ukuran Pupil Ki",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "td",
        "label": "TD",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "suhu",
        "label": "Suhu",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rr",
        "label": "RR",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nadi",
        "label": "Nadi",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "hasil_observasi",
        "label": "Hasil Observasi",
        "tipe": "enum",
        "opsi": [
          "pasien gelisah/delirium dan berontak",
          "pasien tidak kooperatif",
          "ketidakmampuan dalam mengikuti perintah untuk tidak meninggalkan tempat tidur"
        ]
      },
      {
        "nama": "pertimbangan_klinis",
        "label": "Pertimbangan Klinis",
        "tipe": "enum",
        "opsi": [
          "membahayakan diri sendiri",
          "membahayakan orang lain"
        ]
      },
      {
        "nama": "restrain_non_farmakologi",
        "label": "Restrain Non Farmakologi",
        "tipe": "enum",
        "opsi": [
          "restrain pergelangan tangan",
          "restrain pergelangan kaki",
          "restrain badan",
          "lain-lain"
        ]
      },
      {
        "nama": "restrain_non_farmakologi_keterangan",
        "label": "Restrain Non Farmakologi Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "restrain_farmakologi",
        "label": "Restrain Farmakologi",
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "sudah_dijelaskan_keluarga",
        "label": "Sudah Dijelaskan Keluarga",
        "tipe": "enum",
        "opsi": [
          "sudah",
          "belum"
        ],
        "wajib": true
      },
      {
        "nama": "keluarga_yang_menyetujui",
        "label": "Keluarga Yang Menyetujui",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "gcs",
      "refleka_cahaya_ka",
      "refleka_cahaya_ki",
      "ukuran_pupil_ka"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-catatan-cek-gds",
    "slug": "catatan-cek-gds",
    "judul": "Catatan Cek GDS",
    "kategori": "M",
    "permissionKey": "catatan_cek_gds",
    "javaRef": "RMDataCatatanCekGDS",
    "tabel": "catatan_cek_gds",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "gdp",
        "label": "Gdp",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "insulin",
        "label": "Insulin",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "obat_gula",
        "label": "Obat Gula",
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
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "gdp",
      "insulin",
      "obat_gula"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekonsiliasi-obat",
    "slug": "rekonsiliasi-obat",
    "judul": "Rekonsiliasi Obat",
    "kategori": "M",
    "permissionKey": "rekonsiliasi_obat",
    "javaRef": "RMCariRekonsiliasiObat",
    "tabel": "rekonsiliasi_obat",
    "kolom": [
      {
        "nama": "no_rekonsiliasi",
        "label": "No Rekonsiliasi",
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
        "nama": "tanggal_wawancara",
        "label": "Tanggal Wawancara",
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "rekonsiliasi_obat_saat",
        "label": "Rekonsiliasi Obat Saat",
        "tipe": "enum",
        "opsi": [
          "Admisi",
          "Transfer Antar Ruang",
          "Pindah Faskes Lain",
          "Pulang"
        ]
      },
      {
        "nama": "alergi_obat",
        "label": "Alergi Obat",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "manifestasi_alergi",
        "label": "Manifestasi Alergi",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "dampak_alergi",
        "label": "Dampak Alergi",
        "tipe": "enum",
        "opsi": [
          "-",
          "Ringan",
          "Sedang",
          "Berat"
        ]
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tanggal_wawancara",
    "kolomCari": [
      "no_rekonsiliasi",
      "no_rawat",
      "alergi_obat",
      "manifestasi_alergi",
      "nip"
    ],
    "kolomUrut": "tanggal_wawancara",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-checklist-pemberian-fibrinolitik",
    "slug": "checklist-pemberian-fibrinolitik",
    "judul": "Check List Pemberian Fibrinolitik",
    "kategori": "M",
    "permissionKey": "checklist_pemberian_fibrinolitik",
    "javaRef": "RMChecklistPemberianFibrinolitik",
    "tabel": "checklist_pemberian_fibrinolitik",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "kontra_indikasi1",
        "label": "Kontra Indikasi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi1",
        "label": "Keterangan Kontra Indikasi1",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi2",
        "label": "Kontra Indikasi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi2",
        "label": "Keterangan Kontra Indikasi2",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi3",
        "label": "Kontra Indikasi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi3",
        "label": "Keterangan Kontra Indikasi3",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi4",
        "label": "Kontra Indikasi4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi4",
        "label": "Keterangan Kontra Indikasi4",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi5",
        "label": "Kontra Indikasi5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi5",
        "label": "Keterangan Kontra Indikasi5",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi6",
        "label": "Kontra Indikasi6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi6",
        "label": "Keterangan Kontra Indikasi6",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi7",
        "label": "Kontra Indikasi7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi7",
        "label": "Keterangan Kontra Indikasi7",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi8",
        "label": "Kontra Indikasi8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi8",
        "label": "Keterangan Kontra Indikasi8",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi9",
        "label": "Kontra Indikasi9",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi9",
        "label": "Keterangan Kontra Indikasi9",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kontra_indikasi10",
        "label": "Kontra Indikasi10",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_kontra_indikasi10",
        "label": "Keterangan Kontra Indikasi10",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "risiko_tinggi1",
        "label": "Risiko Tinggi1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_risiko_tinggi1",
        "label": "Keterangan Risiko Tinggi1",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "risiko_tinggi2",
        "label": "Risiko Tinggi2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_risiko_tinggi2",
        "label": "Keterangan Risiko Tinggi2",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "risiko_tinggi3",
        "label": "Risiko Tinggi3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_risiko_tinggi3",
        "label": "Keterangan Risiko Tinggi3",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "risiko_tinggi4",
        "label": "Risiko Tinggi4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_risiko_tinggi4",
        "label": "Keterangan Risiko Tinggi4",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "risiko_tinggi5",
        "label": "Risiko Tinggi5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keterangan_risiko_tinggi5",
        "label": "Keterangan Risiko Tinggi5",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "persyaratan_ekg_pre_streptase",
        "label": "Persyaratan EKG Pre Streptase",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "persyaratan_ekg_post_streptase",
        "label": "Persyaratan EKG Post Streptase",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "cek_troponin",
        "label": "Cek Troponin",
        "tipe": "text",
        "maks": 80
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "kontra_indikasi1",
      "keterangan_kontra_indikasi1",
      "kontra_indikasi2",
      "keterangan_kontra_indikasi2"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-manager-pelayanan-pasien",
    "slug": "skrining-manager-pelayanan-pasien",
    "judul": "Skrining Manajer Pelayanan Pasien",
    "kategori": "M",
    "permissionKey": "mpp_skrining",
    "javaRef": "RMSkriningMPP",
    "tabel": "mpp_skrining",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "param1",
        "label": "Param1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param2",
        "label": "Param2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param3",
        "label": "Param3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param4",
        "label": "Param4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param5",
        "label": "Param5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param6",
        "label": "Param6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param7",
        "label": "Param7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param8",
        "label": "Param8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param9",
        "label": "Param9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param10",
        "label": "Param10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param11",
        "label": "Param11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param12",
        "label": "Param12",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param13",
        "label": "Param13",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param14",
        "label": "Param14",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param15",
        "label": "Param15",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "param16",
        "label": "Param16",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
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
      "no_rawat",
      "tanggal",
      "param1",
      "param2",
      "param3",
      "param4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-mpp-form-a",
    "slug": "skrining-mpp-form-a",
    "judul": "Evaluasi Awal Manajer Pelayanan Pasien",
    "kategori": "M",
    "permissionKey": "mpp_skrining",
    "javaRef": "RMSkriningMPPFormA",
    "tabel": "mpp_evaluasi",
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
        "nama": "kd_dokter",
        "label": "Kd Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_konsulan",
        "label": "Kd Konsulan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "diagnosis",
        "label": "Diagnosis",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "kelompok",
        "label": "Kelompok",
        "wajib": true,
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "assesmen",
        "label": "Assesmen",
        "wajib": true,
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "identifikasi",
        "label": "Identifikasi",
        "wajib": true,
        "tipe": "text",
        "maks": 250
      },
      {
        "nama": "rencana",
        "label": "Rencana",
        "wajib": true,
        "tipe": "text",
        "maks": 2000
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
      "no_rawat",
      "kd_dokter",
      "kd_konsulan",
      "diagnosis",
      "kelompok",
      "assesmen"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-mpp-form-b",
    "slug": "skrining-mpp-form-b",
    "judul": "Catatan Implementasi Manajer Pelayanan Pasien",
    "kategori": "M",
    "permissionKey": "mpp_skrining",
    "javaRef": "RMSkriningMPPFormB",
    "tabel": "mpp_evaluasi_catatan",
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
        "nama": "tgl_implementasi",
        "label": "Tgl Implementasi",
        "pk": true,
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "masalah",
        "label": "Masalah",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "tinjut",
        "label": "Tinjut",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 500
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomTanggal": "tgl_implementasi",
    "kolomCari": [
      "no_rawat",
      "masalah",
      "tinjut",
      "evaluasi",
      "nip"
    ],
    "kolomUrut": "tgl_implementasi",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-edukasi-pasien-keluarga-rj",
    "slug": "edukasi-pasien-keluarga-rj",
    "judul": "Edukasi Pasien & Keluarga Rawat Jalan",
    "kategori": "M",
    "permissionKey": "edukasi_pasien_keluarga_rj",
    "javaRef": "RMEdukasiPasienKeluargaRawatJalan",
    "tabel": "edukasi_pasien_keluarga_rj",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "bicara",
        "label": "Bicara",
        "tipe": "enum",
        "opsi": [
          "normal",
          "gangguan bicara"
        ]
      },
      {
        "nama": "keterangan_bicara",
        "label": "Keterangan Bicara",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "bahasa_sehari",
        "label": "Bahasa Sehari",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "perlu_penerjemah",
        "label": "Perlu Penerjemah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "keterangan_penerjemah",
        "label": "Keterangan Penerjemah",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "bahasa_isyarat",
        "label": "Bahasa Isyarat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "cara_belajar",
        "label": "Cara Belajar",
        "tipe": "enum",
        "opsi": [
          "menulis",
          "audio-visual/gambar",
          "diskusi",
          "simulasi"
        ]
      },
      {
        "nama": "hambatan_belajar",
        "label": "Hambatan Belajar",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "takut/gelisah",
          "tidak tertarik",
          "nyeri tidak nyaman",
          "buta huruf",
          "gangguan kognitif",
          "lain-lain"
        ]
      },
      {
        "nama": "keterangan_hambatan_belajar",
        "label": "Keterangan Hambatan Belajar",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "kemampuan_belajar",
        "label": "Kemampuan Belajar",
        "tipe": "enum",
        "opsi": [
          "mampu menerima informasi",
          "tidak mampu menerima informasi"
        ]
      },
      {
        "nama": "keterangan_kemampuan_belajar",
        "label": "Keterangan Kemampuan Belajar",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "penyakitnya_merupakan",
        "label": "Penyakitnya Merupakan",
        "tipe": "enum",
        "opsi": [
          "ujian/cobaan",
          "kutukan",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_penyakitnya_merupakan",
        "label": "Keterangan Penyakitnya Merupakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "keputusan_memilih_layanan",
        "label": "Keputusan Memilih Layanan",
        "tipe": "enum",
        "opsi": [
          "sendiri",
          "keluarga",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_keputusan_memilih_layanan",
        "label": "Keterangan Keputusan Memilih Layanan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "keyakinan_terhadap_terapi",
        "label": "Keyakinan Terhadap Terapi",
        "tipe": "enum",
        "opsi": [
          "pasrah",
          "yakin sembuh jika kontrol teratur",
          "yakin sembuh jika minum obat teratur",
          "lain-lain"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_keyakinan_terhadap_terapi",
        "label": "Keterangan Keyakinan Terhadap Terapi",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "aspek_keyakinan_dipertimbangkan",
        "label": "Aspek Keyakinan Dipertimbangkan",
        "tipe": "enum",
        "opsi": [
          "ada",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "keterangan_aspek_keyakinan_dipertimbangkan",
        "label": "Keterangan Aspek Keyakinan Dipertimbangkan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kesediaan_menerima_informasi",
        "label": "Kesediaan Menerima Informasi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "topik_edukasi_penyakit",
        "label": "Topik Edukasi Penyakit",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "topik_edukasi_rencana_tindakan",
        "label": "Topik Edukasi Rencana Tindakan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "topik_edukasi_pengobatan",
        "label": "Topik Edukasi Pengobatan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "topik_edukasi_hasil_layanan",
        "label": "Topik Edukasi Hasil Layanan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "bicara",
      "keterangan_bicara",
      "bahasa_sehari",
      "perlu_penerjemah"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pelaksanaan-informasi-edukasi",
    "slug": "pelaksanaan-informasi-edukasi",
    "judul": "Pelaksanaan Informasi & Edukasi",
    "kategori": "M",
    "permissionKey": "pelaksanaan_informasi_edukasi",
    "javaRef": "RMPelaksanaanInformasiEdukasi",
    "tabel": "pelaksanaan_informasi_edukasi",
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
        "nama": "nik",
        "label": "Nik",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "materi_edukasi",
        "label": "Materi Edukasi",
        "tipe": "text",
        "maks": 1000
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "diberikan_pada",
        "label": "Diberikan Pada",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Pasien",
          "Keluarga",
          "Lain-lain"
        ]
      },
      {
        "nama": "keterangan_diberikan_pada",
        "label": "Keterangan Diberikan Pada",
        "wajib": true,
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "lama_edukasi",
        "label": "Lama Edukasi",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "metode_edukasi",
        "label": "Metode Edukasi",
        "tipe": "enum",
        "opsi": [
          "Ceramah",
          "Diskusi",
          "Demonstrasi"
        ]
      },
      {
        "nama": "hasil_verifikasi",
        "label": "Hasil Verifikasi",
        "tipe": "enum",
        "opsi": [
          "Sudah Mengerti",
          "Re-Edukasi",
          "Re-Demonstrasi"
        ]
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "Awal",
          "Ulang"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nik",
      "materi_edukasi",
      "keterangan",
      "keterangan_diberikan_pada",
      "lama_edukasi"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-merokok-usia-sekolah",
    "slug": "skrining-merokok-usia-sekolah",
    "judul": "Skrining Merokok Usia Sekolah & Remaja",
    "kategori": "M",
    "permissionKey": "skrining_perilaku_merokok_sekolah_remaja",
    "javaRef": "RMSkriningMerokokUsiaSekolahRemaja",
    "tabel": "skrining_perilaku_merokok_sekolah_remaja",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kd_sekolah",
        "label": "Kode Sekolah",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kelas",
        "label": "Kelas",
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
          "12"
        ]
      },
      {
        "nama": "apakah_anda_merokok",
        "label": "Apakah Anda Merokok",
        "tipe": "enum",
        "opsi": [
          "ya, setiap hari",
          "ya, kadang-kadang",
          "pernah mencoba walau hanya 1 hisapan",
          "tidak merokok/tidak pernah mencoba"
        ],
        "wajib": true
      },
      {
        "nama": "jumlah_batang_rokok",
        "label": "Jumlah Batang Rokok",
        "tipe": "text",
        "maks": 4,
        "wajib": true
      },
      {
        "nama": "jumlah_batang_rokok_hariminggu",
        "label": "Jumlah Batang Rokok Hariminggu",
        "tipe": "enum",
        "opsi": [
          "batang/hari",
          "batang/minggu",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "jenis_rokok_yang_digunakan",
        "label": "Jenis Rokok Yang Digunakan",
        "tipe": "enum",
        "opsi": [
          "rokok konvensional : rokok filter/putih, kretek, tingwe, dll",
          "rokok elektronik : vape, iqos, dll",
          "keduanya",
          "lainnya",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "jenis_rokok_yang_digunakan_keterangan",
        "label": "Jenis Rokok Yang Digunakan Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "usia_mulai_merokok",
        "label": "Usia Mulai Merokok",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "alasan_mulai_merokok",
        "label": "Alasan Mulai Merokok",
        "tipe": "enum",
        "opsi": [
          "ikut-ikutan teman",
          "pengaruh keluarga",
          "rasa ingin tahu",
          "terpaksa oleh teman/lingkungan",
          "mengisi waktu luang",
          "menghilangkan stress",
          "lainnya",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "alasan_mulai_merokok_keterangan",
        "label": "Alasan Mulai Merokok Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "sudah_berapa_lama_merokok",
        "label": "Sudah Berapa Lama Merokok",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "bagaimana_biasanya_mendapatkan_rokok",
        "label": "Bagaimana Biasanya Mendapatkan Rokok",
        "tipe": "enum",
        "opsi": [
          "beli batangan",
          "beli bungkusan",
          "dapat dari teman/saudara/keluarga",
          "lainnya",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "bagaimana_biasanya_mendapatkan_rokok_keterangan",
        "label": "Bagaimana Biasanya Mendapatkan Rokok Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "keinginan_berhenti_merokok",
        "label": "Keinginan Berhenti Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "alasan_utama_berhenti_merokok",
        "label": "Alasan Utama Berhenti Merokok",
        "tipe": "enum",
        "opsi": [
          "kondisi kesehatan",
          "motivasi diri sendiri",
          "disarankan orangtua/guru/teman",
          "tidak mampu beli/mahal",
          "lainnya",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "alasan_utama_berhenti_merokok_keterangan",
        "label": "Alasan Utama Berhenti Merokok Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "tahu_dampak_kesehatan_merokok",
        "label": "Tahu Dampak Kesehatan Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "dampak_kesehatan_dari_merokok_yang_diketahui",
        "label": "Dampak Kesehatan Dari Merokok Yang Diketahui",
        "tipe": "enum",
        "opsi": [
          "kecanduan",
          "batuk",
          "gigi kuning & mulut berbau",
          "sistem pernapasan terganggu",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "tahu_merokok_pintu_masuk_narkoba",
        "label": "Tahu Merokok Pintu Masuk Narkoba",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "melihat_orang_merokok_di_sekolah",
        "label": "Melihat Orang Merokok Di Sekolah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "orang_yang_paling_sering_merokok_disekolah",
        "label": "Orang Yang Paling Sering Merokok Disekolah",
        "tipe": "enum",
        "opsi": [
          "teman/kakak kelas",
          "guru/kepala sekolah",
          "satpam/supir/penjaga kantin",
          "lainnya",
          ""
        ],
        "wajib": true
      },
      {
        "nama": "orang_yang_paling_sering_merokok_disekolah_keterangan",
        "label": "Orang Yang Paling Sering Merokok Disekolah Keterangan",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "ada_anggota_keluarga_di_rumah_yang_merokok",
        "label": "Ada Anggota Keluarga Di Rumah Yang Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "teman_dekat_banyakyang_merokok",
        "label": "Teman Dekat Banyakyang Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ],
        "wajib": true
      },
      {
        "nama": "dilakukan_pemeriksaan_kadar_co_pernapasan",
        "label": "Dilakukan Pemeriksaan Kadar Co Pernapasan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak, alat & bmhp tidak tersedia",
          "tidak, bmhp tidak tersedia"
        ],
        "wajib": true
      },
      {
        "nama": "hasil_pemeriksaan_co_pernapasan",
        "label": "Hasil Pemeriksaan Co Pernapasan",
        "tipe": "text",
        "maks": 5,
        "wajib": true
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
      "no_rawat",
      "kd_sekolah",
      "kelas",
      "apakah_anda_merokok",
      "jumlah_batang_rokok",
      "jumlah_batang_rokok_hariminggu"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kekerasan-pada-perempuan",
    "slug": "skrining-kekerasan-pada-perempuan",
    "judul": "Skrining Kekerasan Pada Perempuan",
    "kategori": "M",
    "permissionKey": "skrining_kekerasan_pada_perempuan",
    "javaRef": "RMSkriningKekerasanPadaPerempuan",
    "tabel": "skrining_kekerasan_pada_perempuan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "menggambarkan_hubungan",
        "label": "Menggambarkan Hubungan",
        "tipe": "enum",
        "opsi": [
          "tidak ada ketegangan",
          "beberapa ketegangan",
          "banyak ketegangan"
        ]
      },
      {
        "nama": "skor_menggambarkan_hubungan",
        "label": "Skor Menggambarkan Hubungan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "berdebat_dengan_pasangan",
        "label": "Berdebat Dengan Pasangan",
        "tipe": "enum",
        "opsi": [
          "tidak ada kesulitan",
          "beberapa kesulitan",
          "kesulitan besar"
        ]
      },
      {
        "nama": "skor_berdebat_dengan_pasangan",
        "label": "Skor Berdebat Dengan Pasangan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pertengkaran_membuat_sedih",
        "label": "Pertengkaran Membuat Sedih",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pertengkaran_membuat_sedih",
        "label": "Skor Pertengkaran Membuat Sedih",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pertengkaran_menghasilkan_pukulan",
        "label": "Pertengkaran Menghasilkan Pukulan",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pertengkaran_menghasilkan_pukulan",
        "label": "Skor Pertengkaran Menghasilkan Pukulan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pernah_merasa_takut_dengan_pasangan",
        "label": "Pernah Merasa Takut Dengan Pasangan",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pernah_merasa_takut_dengan_pasangan",
        "label": "Skor Pernah Merasa Takut Dengan Pasangan",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pasangan_melecehkan_secara_fisik",
        "label": "Pasangan Melecehkan Secara Fisik",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pasangan_melecehkan_secara_fisik",
        "label": "Skor Pasangan Melecehkan Secara Fisik",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pasangan_melecehkan_secara_imosional",
        "label": "Pasangan Melecehkan Secara Imosional",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pasangan_melecehkan_secara_imosional",
        "label": "Skor Pasangan Melecehkan Secara Imosional",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "pasangan_melecehkan_secara_seksual",
        "label": "Pasangan Melecehkan Secara Seksual",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering"
        ]
      },
      {
        "nama": "skor_pasangan_melecehkan_secara_seksual",
        "label": "Skor Pasangan Melecehkan Secara Seksual",
        "tipe": "enum",
        "opsi": [
          "1",
          "2",
          "3"
        ],
        "wajib": true
      },
      {
        "nama": "totalskor",
        "label": "Totalskor",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "pasien tidak terindikasi mengalami kekerasan",
          "pasien terindikasi mengalami kekerasan"
        ],
        "wajib": true
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
      "no_rawat",
      "menggambarkan_hubungan",
      "skor_menggambarkan_hubungan",
      "berdebat_dengan_pasangan",
      "skor_berdebat_dengan_pasangan",
      "pertengkaran_membuat_sedih"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-obesitas",
    "slug": "skrining-obesitas",
    "judul": "Skrining Obesitas",
    "kategori": "M",
    "permissionKey": "skrining_obesitas",
    "javaRef": "RMSkriningObesitas",
    "tabel": "skrining_obesitas",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kebiasaan_makan_manis",
        "label": "Kebiasaan Makan Manis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "aktifitas_fisik_setiap_hari",
        "label": "Aktifitas Fisik Setiap Hari",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "istirahat_cukup",
        "label": "Istirahat Cukup",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_merokok",
        "label": "Risiko Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_minum_alkohol_merokok_keluarga",
        "label": "Riwayat Minum Alkohol Merokok Keluarga",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "riwayat_penggunaan_obat_steroid",
        "label": "Riwayat Penggunaan Obat Steroid",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "berat_badan",
        "label": "Berat Badan",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "tinggi_badan",
        "label": "Tinggi Badan",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "imt",
        "label": "IMT",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "kasifikasi_imt",
        "label": "Kasifikasi IMT",
        "tipe": "enum",
        "opsi": [
          "berat badan kurang",
          "berat badan normal",
          "kelebihan berat badan",
          "obesitas i",
          "obesitas ii"
        ]
      },
      {
        "nama": "lingkar_pinggang",
        "label": "Lingkar Pinggang",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "risiko_lingkar_pinggang",
        "label": "Risiko Lingkar Pinggang",
        "tipe": "enum",
        "opsi": [
          "rendah",
          "cukup",
          "meningkat",
          "moderat",
          "berat",
          "sangat"
        ]
      },
      {
        "nama": "status_obesitas",
        "label": "Status Obesitas",
        "tipe": "enum",
        "opsi": [
          "normal",
          "berisiko"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
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
      "no_rawat",
      "kebiasaan_makan_manis",
      "aktifitas_fisik_setiap_hari",
      "istirahat_cukup",
      "risiko_merokok",
      "riwayat_minum_alkohol_merokok_keluarga"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-risiko-kanker-payudara",
    "slug": "skrining-risiko-kanker-payudara",
    "judul": "Skrining Risiko Kanker Payudara",
    "kategori": "M",
    "permissionKey": "skrining_risiko_kanker_payudara",
    "javaRef": "RMSkriningRisikoKankerPayudara",
    "tabel": "skrining_risiko_kanker_payudara",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "faktor_risiko_awal1",
        "label": "Faktor Risiko Awal1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal1",
        "label": "Nilai Risiko Awal1",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal2",
        "label": "Faktor Risiko Awal2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal2",
        "label": "Nilai Risiko Awal2",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal3",
        "label": "Faktor Risiko Awal3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal3",
        "label": "Nilai Risiko Awal3",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal4",
        "label": "Faktor Risiko Awal4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal4",
        "label": "Nilai Risiko Awal4",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal5",
        "label": "Faktor Risiko Awal5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal5",
        "label": "Nilai Risiko Awal5",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal6",
        "label": "Faktor Risiko Awal6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal6",
        "label": "Nilai Risiko Awal6",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal7",
        "label": "Faktor Risiko Awal7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal7",
        "label": "Nilai Risiko Awal7",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal8",
        "label": "Faktor Risiko Awal8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal8",
        "label": "Nilai Risiko Awal8",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal9",
        "label": "Faktor Risiko Awal9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal9",
        "label": "Nilai Risiko Awal9",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal10",
        "label": "Faktor Risiko Awal10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal10",
        "label": "Nilai Risiko Awal10",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal11",
        "label": "Faktor Risiko Awal11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal11",
        "label": "Nilai Risiko Awal11",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal12",
        "label": "Faktor Risiko Awal12",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal12",
        "label": "Nilai Risiko Awal12",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal13",
        "label": "Faktor Risiko Awal13",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal13",
        "label": "Nilai Risiko Awal13",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_awal14",
        "label": "Faktor Risiko Awal14",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_awal14",
        "label": "Nilai Risiko Awal14",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi1",
        "label": "Faktor Risiko Tinggi1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi1",
        "label": "Nilai Risiko Tinggi1",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi2",
        "label": "Faktor Risiko Tinggi2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi2",
        "label": "Nilai Risiko Tinggi2",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi3",
        "label": "Faktor Risiko Tinggi3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi3",
        "label": "Nilai Risiko Tinggi3",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi4",
        "label": "Faktor Risiko Tinggi4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi4",
        "label": "Nilai Risiko Tinggi4",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi5",
        "label": "Faktor Risiko Tinggi5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi5",
        "label": "Nilai Risiko Tinggi5",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi6",
        "label": "Faktor Risiko Tinggi6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi6",
        "label": "Nilai Risiko Tinggi6",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi7",
        "label": "Faktor Risiko Tinggi7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi7",
        "label": "Nilai Risiko Tinggi7",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi8",
        "label": "Faktor Risiko Tinggi8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi8",
        "label": "Nilai Risiko Tinggi8",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi9",
        "label": "Faktor Risiko Tinggi9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi9",
        "label": "Nilai Risiko Tinggi9",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi10",
        "label": "Faktor Risiko Tinggi10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi10",
        "label": "Nilai Risiko Tinggi10",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi11",
        "label": "Faktor Risiko Tinggi11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi11",
        "label": "Nilai Risiko Tinggi11",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi12",
        "label": "Faktor Risiko Tinggi12",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi12",
        "label": "Nilai Risiko Tinggi12",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_risiko_tinggi13",
        "label": "Faktor Risiko Tinggi13",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_risiko_tinggi13",
        "label": "Nilai Risiko Tinggi13",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "faktor_kecurigaan_ganas1",
        "label": "Faktor Kecurigaan Ganas1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas1",
        "label": "Nilai Kecurigaan Ganas1",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas2",
        "label": "Faktor Kecurigaan Ganas2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas2",
        "label": "Nilai Kecurigaan Ganas2",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas3",
        "label": "Faktor Kecurigaan Ganas3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas3",
        "label": "Nilai Kecurigaan Ganas3",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas4",
        "label": "Faktor Kecurigaan Ganas4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas4",
        "label": "Nilai Kecurigaan Ganas4",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas5",
        "label": "Faktor Kecurigaan Ganas5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas5",
        "label": "Nilai Kecurigaan Ganas5",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas6",
        "label": "Faktor Kecurigaan Ganas6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas6",
        "label": "Nilai Kecurigaan Ganas6",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas7",
        "label": "Faktor Kecurigaan Ganas7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas7",
        "label": "Nilai Kecurigaan Ganas7",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "faktor_kecurigaan_ganas8",
        "label": "Faktor Kecurigaan Ganas8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_kecurigaan_ganas8",
        "label": "Nilai Kecurigaan Ganas8",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "hasil_sadanis",
        "label": "Hasil Sadanis",
        "tipe": "enum",
        "opsi": [
          "benjolan",
          "tidak ada benjolan",
          "curiga kanker"
        ]
      },
      {
        "nama": "tindak_lanjut_sadanis",
        "label": "Tindak Lanjut Sadanis",
        "tipe": "enum",
        "opsi": [
          "dirujuk",
          "tidak dirujuk"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "normal",
          "kemungkinan kelainan payudara jinak",
          "curiga kelainan payudara ganas"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "faktor_risiko_awal1",
      "nilai_risiko_awal1",
      "faktor_risiko_awal2",
      "nilai_risiko_awal2",
      "faktor_risiko_awal3"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-risiko-kanker-paru",
    "slug": "skrining-risiko-kanker-paru",
    "judul": "Skrining Risiko Kanker Paru",
    "kategori": "M",
    "permissionKey": "skrining_risiko_kanker_paru",
    "javaRef": "RMSkriningRisikoKankerParu",
    "tabel": "skrining_risiko_kanker_paru",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "tipe": "enum",
        "opsi": [
          "laki-laki",
          "perempuan"
        ]
      },
      {
        "nama": "nilai_jenis_kelamin",
        "label": "Nilai Jenis Kelamin",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "umur",
        "label": "Umur",
        "tipe": "enum",
        "opsi": [
          "> 65 tahun",
          "45 - 65 tahun",
          "< 45 tahun"
        ]
      },
      {
        "nama": "nilai_umur",
        "label": "Nilai Umur",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "pernah_kanker",
        "label": "Pernah Kanker",
        "tipe": "enum",
        "opsi": [
          "ya, pernah > 5 tahun yang lalu",
          "ya, pernah < 5 tahun yang lalu",
          "tidak pernah"
        ]
      },
      {
        "nama": "nilai_pernah_kanker",
        "label": "Nilai Pernah Kanker",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "ada_keluarga_kanker",
        "label": "Ada Keluarga Kanker",
        "tipe": "enum",
        "opsi": [
          "ya, kanker paru",
          "ya, kanker jenis lain",
          "tidak ada"
        ]
      },
      {
        "nama": "nilai_ada_keluarga_kanker",
        "label": "Nilai Ada Keluarga Kanker",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "riwayat_rokok",
        "label": "Riwayat Rokok",
        "tipe": "enum",
        "opsi": [
          "perokok aktif, masih merokok 1 tahun ini",
          "bekas perokok, berhenti < 15 tahun",
          "perokok pasif",
          "tidak merokok"
        ]
      },
      {
        "nama": "nilai_riwayat_rokok",
        "label": "Nilai Riwayat Rokok",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "riwayat_bekerja_mengandung_karsinogen",
        "label": "Riwayat Bekerja Mengandung Karsinogen",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak yakin/ragu-ragu",
          "tidak"
        ]
      },
      {
        "nama": "nilai_riwayat_bekerja_mengandung_karsinogen",
        "label": "Nilai Riwayat Bekerja Mengandung Karsinogen",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "lingkungan_tinggal_polusi_tinggi",
        "label": "Lingkungan Tinggal Polusi Tinggi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak yakin/ragu-ragu",
          "tidak"
        ]
      },
      {
        "nama": "nilai_lingkungan_tinggal_polusi_tinggi",
        "label": "Nilai Lingkungan Tinggal Polusi Tinggi",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "lingkungan_rumah_tidak_sehat",
        "label": "Lingkungan Rumah Tidak Sehat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak yakin/ragu-ragu",
          "tidak"
        ]
      },
      {
        "nama": "nilai_lingkungan_rumah_tidak_sehat",
        "label": "Nilai Lingkungan Rumah Tidak Sehat",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "pernah_paru_kronik",
        "label": "Pernah Paru Kronik",
        "tipe": "enum",
        "opsi": [
          "ya, pernah tuberkolosis (tbc)",
          "ya, pernah penyakit paru kronik(ppok)",
          "tidak"
        ]
      },
      {
        "nama": "nilai_pernah_paru_kronik",
        "label": "Nilai Pernah Paru Kronik",
        "tipe": "text",
        "maks": 1
      },
      {
        "nama": "total_skor",
        "label": "Total Skor",
        "tipe": "text",
        "maks": 2
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "risiko ringan",
          "risiko sedang",
          "risiko berat"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
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
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "jenis_kelamin",
      "nilai_jenis_kelamin",
      "umur",
      "nilai_umur",
      "pernah_kanker"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-risiko-kanker-serviks",
    "slug": "skrining-risiko-kanker-serviks",
    "judul": "Skrining Risiko Kanker Serviks",
    "kategori": "M",
    "permissionKey": "skrining_risiko_kanker_serviks",
    "javaRef": "RMSkriningRisikoKankerServiks",
    "tabel": "skrining_risiko_kanker_serviks",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "riwayat_penyakit_keluarga",
        "label": "Riwayat Penyakit Keluarga",
        "tipe": "enum",
        "opsi": [
          "kanker",
          "benjolan abnormal pada payudara",
          "-"
        ]
      },
      {
        "nama": "riwayat_penyakit_sendiri",
        "label": "Riwayat Penyakit Sendiri",
        "tipe": "enum",
        "opsi": [
          "kanker",
          "benjolan abnormal pada payudara",
          "-"
        ]
      },
      {
        "nama": "risiko_merokok",
        "label": "Risiko Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_kurang_fisik",
        "label": "Risiko Kurang Fisik",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_gula_berlebihan",
        "label": "Risiko Gula Berlebihan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_garam_berlebihan",
        "label": "Risiko Garam Berlebihan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_lemak_berlebihan",
        "label": "Risiko Lemak Berlebihan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_kurang_buah_sayur",
        "label": "Risiko Kurang Buah Sayur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "risiko_alkohol",
        "label": "Risiko Alkohol",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "hasil_iva",
        "label": "Hasil Iva",
        "tipe": "enum",
        "opsi": [
          "positif",
          "negatif",
          "curiga kanker"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
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
      "no_rawat",
      "riwayat_penyakit_keluarga",
      "riwayat_penyakit_sendiri",
      "risiko_merokok",
      "risiko_kurang_fisik",
      "risiko_gula_berlebihan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kesehatan-gigi-mulut-remaja",
    "slug": "skrining-kesehatan-gigi-mulut-remaja",
    "judul": "Skrining Kesehatan Gigi Mulut Remaja",
    "kategori": "M",
    "permissionKey": "skrining_kesehatan_gigi_mulut_remaja",
    "javaRef": "RMSkriningKesehatanGigiMulutRemaja",
    "tabel": "skrining_kesehatan_gigi_mulut_remaja",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "pernah_pemeriksaan_gigimulut",
        "label": "Pernah Pemeriksaan Gigimulut",
        "tipe": "enum",
        "opsi": [
          "pernah",
          "tidak pernah"
        ]
      },
      {
        "nama": "jumlah_gigi_tumbuh",
        "label": "Jumlah Gigi Tumbuh",
        "tipe": "enum",
        "opsi": [
          "<20",
          ">20"
        ]
      },
      {
        "nama": "kondisi_kebersihan_gigimulut",
        "label": "Kondisi Kebersihan Gigimulut",
        "tipe": "enum",
        "opsi": [
          "bersih",
          "kotor"
        ]
      },
      {
        "nama": "punya_gigi_berlubang",
        "label": "Punya Gigi Berlubang",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "pernah_gusi_berdarah",
        "label": "Pernah Gusi Berdarah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "punya_karang_gigi",
        "label": "Punya Karang Gigi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gigi_depan_tidak_teratur",
        "label": "Gigi Depan Tidak Teratur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "menyikat_gigi_sebelum_tidur",
        "label": "Menyikat Gigi Sebelum Tidur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "punya_sariawan",
        "label": "Punya Sariawan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "pemeriksaan_fisik",
        "label": "Pemeriksaan Fisik",
        "tipe": "text",
        "maks": 600
      },
      {
        "nama": "pemeriksaan_penunjang",
        "label": "Pemeriksaan Penunjang",
        "tipe": "text",
        "maks": 600
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
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
      "no_rawat",
      "pernah_pemeriksaan_gigimulut",
      "jumlah_gigi_tumbuh",
      "kondisi_kebersihan_gigimulut",
      "punya_gigi_berlubang",
      "pernah_gusi_berdarah"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kesehatan-gigi-mulut-balita",
    "slug": "skrining-kesehatan-gigi-mulut-balita",
    "judul": "Skrining Kesehatan Gigi Mulut Balita",
    "kategori": "M",
    "permissionKey": "skrining_kesehatan_gigi_mulut_balita",
    "javaRef": "RMSkriningKesehatanGigiMulutBalita",
    "tabel": "skrining_kesehatan_gigi_mulut_balita",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "pernah_pemeriksaan_gigimulut",
        "label": "Pernah Pemeriksaan Gigimulut",
        "tipe": "enum",
        "opsi": [
          "pernah",
          "tidak pernah"
        ]
      },
      {
        "nama": "sudah_tumbuh_gigi",
        "label": "Sudah Tumbuh Gigi",
        "tipe": "enum",
        "opsi": [
          "sudah",
          "belum"
        ]
      },
      {
        "nama": "jumlah_gigi_tumbuh",
        "label": "Jumlah Gigi Tumbuh",
        "tipe": "enum",
        "opsi": [
          "<20",
          ">20",
          "0"
        ]
      },
      {
        "nama": "kondisi_kebersihan_gigimulut",
        "label": "Kondisi Kebersihan Gigimulut",
        "tipe": "enum",
        "opsi": [
          "bersih",
          "kotor"
        ]
      },
      {
        "nama": "kebiasaan_susu_botol",
        "label": "Kebiasaan Susu Botol",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mengemil_manis",
        "label": "Mengemil Manis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "menyikat_gigi_sebelum_tidur",
        "label": "Menyikat Gigi Sebelum Tidur",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "mengemut_makanan",
        "label": "Mengemut Makanan",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "lidah_kotor",
        "label": "Lidah Kotor",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "celah_bibir",
        "label": "Celah Bibir",
        "tipe": "enum",
        "opsi": [
          "tidak ada",
          "ada"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
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
      "no_rawat",
      "pernah_pemeriksaan_gigimulut",
      "sudah_tumbuh_gigi",
      "jumlah_gigi_tumbuh",
      "kondisi_kebersihan_gigimulut",
      "kebiasaan_susu_botol"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kesehatan-gigi-mulut-lansia",
    "slug": "skrining-kesehatan-gigi-mulut-lansia",
    "judul": "Skrining Kesehatan Gigi Mulut Lansia",
    "kategori": "M",
    "permissionKey": "skrining_kesehatan_gigi_mulut_lansia",
    "javaRef": "RMSkriningKesehatanGigiMulutLansia",
    "tabel": "skrining_kesehatan_gigi_mulut_lansia",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kontrol_gigi",
        "label": "Kontrol Gigi",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "pola_makan",
        "label": "Pola Makan",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "sikat_gigi",
        "label": "Sikat Gigi",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "gigi_palsu",
        "label": "Gigi Palsu",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "gigi_berfungsi",
        "label": "Gigi Berfungsi",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "mukosa_mulut",
        "label": "Mukosa Mulut",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "hasil_skrining",
      "keterangan",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kesehatan-gigi-mulut-dewasa",
    "slug": "skrining-kesehatan-gigi-mulut-dewasa",
    "judul": "Skrining Kesehatan Gigi Mulut Dewasa",
    "kategori": "M",
    "permissionKey": "skrining_kesehatan_gigi_mulut_dewasa",
    "javaRef": "RMSkriningKesehatanGigiMulutDewasa",
    "tabel": "skrining_kesehatan_gigi_mulut_dewasa",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "kontrol_gigi",
        "label": "Kontrol Gigi",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "gigi_bungsu_tumbuh",
        "label": "Gigi Bungsu Tumbuh",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "gigi_hilang",
        "label": "Gigi Hilang",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "gigi_berlubang",
        "label": "Gigi Berlubang",
        "tipe": "enum",
        "opsi": [
          "Ya",
          "Tidak"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "hasil_skrining",
      "keterangan",
      "nip"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-anemia",
    "slug": "skrining-anemia",
    "judul": "Skrining Anemia",
    "kategori": "M",
    "permissionKey": "skrining_anemia",
    "javaRef": "RMSkriningAnemia",
    "tabel": "skrining_anemia",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "mudah_lelah",
        "label": "Mudah Lelah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "buah_sayur",
        "label": "Buah Sayur",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "protein_hewani",
        "label": "Protein Hewani",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "masalah_pubertas",
        "label": "Masalah Pubertas",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "risiko_ims",
        "label": "Risiko Ims",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "kekerasan_seksual",
        "label": "Kekerasan Seksual",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sudah_menstruasi",
        "label": "Sudah Menstruasi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "gangguan_menstruasi",
        "label": "Gangguan Menstruasi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "tambah_darah",
        "label": "Tambah Darah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "kelainan_darah",
        "label": "Kelainan Darah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "keluarga_thalasemia",
        "label": "Keluarga Thalasemia",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "rambut",
        "label": "Rambut",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "tidak sehat"
        ]
      },
      {
        "nama": "kulit",
        "label": "Kulit",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "tidak sehat"
        ]
      },
      {
        "nama": "bekas_sutikan",
        "label": "Bekas Sutikan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "kuku",
        "label": "Kuku",
        "tipe": "enum",
        "opsi": [
          "sehat",
          "tidak sehat"
        ]
      },
      {
        "nama": "tanda_klinis",
        "label": "Tanda Klinis",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ],
        "wajib": true
      },
      {
        "nama": "pemeriksaan_hb",
        "label": "Pemeriksaan Hb",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "kadar_hb",
        "label": "Kadar Hb",
        "tipe": "enum",
        "opsi": [
          ">= 12 g/dl",
          "11,9 - 11 g/dl",
          "10.9 - 8 g/dl",
          "< 8 g/dl"
        ]
      },
      {
        "nama": "jenis_anemia",
        "label": "Jenis Anemia",
        "tipe": "enum",
        "opsi": [
          "normal",
          "ringan",
          "sedang",
          "berat"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "mudah_lelah",
      "buah_sayur",
      "protein_hewani",
      "masalah_pubertas",
      "risiko_ims"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-hipertensi",
    "slug": "skrining-hipertensi",
    "judul": "Skrining Hipertensi",
    "kategori": "M",
    "permissionKey": "skrining_hipertensi",
    "javaRef": "RMSkriningHipertensi",
    "tabel": "skrining_hipertensi",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "anamnesis1",
        "label": "Anamnesis1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis2",
        "label": "Anamnesis2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis3",
        "label": "Anamnesis3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis4",
        "label": "Anamnesis4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis5",
        "label": "Anamnesis5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis6",
        "label": "Anamnesis6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis7",
        "label": "Anamnesis7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anamnesis8",
        "label": "Anamnesis8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
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
        "nama": "klasifikasi_hipertensi",
        "label": "Klasifikasi Hipertensi",
        "tipe": "enum",
        "opsi": [
          "optimal normal",
          "normal",
          "tinggi",
          "sub-group : perbatasan",
          "tingkat 1 (hipertensi ringan)",
          "tingkat 2 (hipertensi sedang)",
          "tingkat 3 (hipertensi berat)",
          "hipertensi sistol tensolasi",
          "tidak diketahui"
        ],
        "wajib": true
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "anamnesis1",
      "anamnesis2",
      "anamnesis3",
      "anamnesis4",
      "anamnesis5"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kesehatan-penglihatan",
    "slug": "skrining-kesehatan-penglihatan",
    "judul": "Skrining Kesehatan Penglihatan",
    "kategori": "M",
    "permissionKey": "skrining_kesehatan_penglihatan",
    "javaRef": "RMSkriningKesehatanPenglihatan",
    "tabel": "skrining_kesehatan_penglihatan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "mata_luar",
        "label": "Mata Luar",
        "tipe": "enum",
        "opsi": [
          "normal",
          "tidak sehat"
        ]
      },
      {
        "nama": "tajam_kiri",
        "label": "Tajam Kiri",
        "tipe": "enum",
        "opsi": [
          "normal (6/6 - 6/18)",
          "kelainan refraksi (< 6/18 - 6/60)",
          "low vision (6/60 - 3/60)",
          "kebutaan (< 3/60)"
        ]
      },
      {
        "nama": "tajam_kanan",
        "label": "Tajam Kanan",
        "tipe": "enum",
        "opsi": [
          "normal (6/6 - 6/18)",
          "kelainan refraksi (< 6/18 - 6/60)",
          "low vision (6/60 - 3/60)",
          "kebutaan (< 3/60)"
        ]
      },
      {
        "nama": "buta_warna_kiri",
        "label": "Buta Warna Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "buta_warna_kanan",
        "label": "Buta Warna Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "kacamata",
        "label": "Kacamata",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "visus_kiri",
        "label": "Visus Kiri",
        "tipe": "enum",
        "opsi": [
          "normal (6/6 - 6/18)",
          "kelainan refraksi (< 6/18 - 6/60)",
          "low vision (6/60 - 3/60)",
          "kebutaan (< 3/60)"
        ]
      },
      {
        "nama": "visus_kanan",
        "label": "Visus Kanan",
        "tipe": "enum",
        "opsi": [
          "normal (6/6 - 6/18)",
          "kelainan refraksi (< 6/18 - 6/60)",
          "low vision (6/60 - 3/60)",
          "kebutaan (< 3/60)"
        ]
      },
      {
        "nama": "refraksi_kiri",
        "label": "Refraksi Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "refraksi_kanan",
        "label": "Refraksi Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "rujuk_refraksi",
        "label": "Rujuk Refraksi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "katarak_kiri",
        "label": "Katarak Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "katarak_kanan",
        "label": "Katarak Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "rujuk_katarak",
        "label": "Rujuk Katarak",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "mata_luar",
      "tajam_kiri",
      "tajam_kanan",
      "buta_warna_kiri",
      "buta_warna_kanan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-indra-pendengaran",
    "slug": "skrining-indra-pendengaran",
    "judul": "Skrining Indra Pendengaran",
    "kategori": "M",
    "permissionKey": "skrining_indra_pendengaran",
    "javaRef": "RMSkriningIndraPendengaran",
    "tabel": "skrining_indra_pendengaran",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "curiga_tuli_telinga_kiri",
        "label": "Curiga Tuli Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "curiga_tuli_telinga_kanan",
        "label": "Curiga Tuli Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "curiga_tuli_telinga_rujuk",
        "label": "Curiga Tuli Telinga Rujuk",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penurunan_pendengaran_telinga_kiri",
        "label": "Penurunan Pendengaran Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "penurunan_pendengaran_telinga_kanan",
        "label": "Penurunan Pendengaran Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "mendengar_bisikan_telinga_kiri",
        "label": "Mendengar Bisikan Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "normal",
          "gangguan pendengaran"
        ]
      },
      {
        "nama": "mendengar_bisikan_telinga_kanan",
        "label": "Mendengar Bisikan Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "normal",
          "gangguan pendengaran"
        ]
      },
      {
        "nama": "congek_telinga_kiri",
        "label": "Congek Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "congek_telinga_kanan",
        "label": "Congek Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "congek_telinga_rujuk",
        "label": "Congek Telinga Rujuk",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sumbatan_serumen_telinga_kiri",
        "label": "Sumbatan Serumen Telinga Kiri",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sumbatan_serumen_telinga_kanan",
        "label": "Sumbatan Serumen Telinga Kanan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "sumbatan_serumen_telinga_rujuk",
        "label": "Sumbatan Serumen Telinga Rujuk",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
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
      "no_rawat",
      "curiga_tuli_telinga_kiri",
      "curiga_tuli_telinga_kanan",
      "curiga_tuli_telinga_rujuk",
      "penurunan_pendengaran_telinga_kiri",
      "penurunan_pendengaran_telinga_kanan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-tbc",
    "slug": "skrining-tbc",
    "judul": "Skrining TBC",
    "kategori": "M",
    "permissionKey": "skrining_tbc",
    "javaRef": "RMSkriningTBC",
    "tabel": "skrining_tbc",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "berat_badan",
        "label": "Berat Badan",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "tinggi_badan",
        "label": "Tinggi Badan",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "imt",
        "label": "IMT",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "kasifikasi_imt",
        "label": "Kasifikasi IMT",
        "tipe": "enum",
        "opsi": [
          "berat badan kurang",
          "berat badan normal",
          "kelebihan berat badan",
          "obesitas i",
          "obesitas ii"
        ]
      },
      {
        "nama": "lingkar_pinggang",
        "label": "Lingkar Pinggang",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "risiko_lingkar_pinggang",
        "label": "Risiko Lingkar Pinggang",
        "tipe": "enum",
        "opsi": [
          "rendah",
          "cukup",
          "meningkat",
          "moderat",
          "berat",
          "sangat"
        ]
      },
      {
        "nama": "riwayat_kontak_tbc",
        "label": "Riwayat Kontak TBC",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "jenis_kontak_tbc",
        "label": "Jenis Kontak TBC",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "tbc paru bakteriologis",
          "tbc paru klinis",
          "tbc paru ekstraparu"
        ]
      },
      {
        "nama": "faktor_resiko_pernah_terdiagnosa_tbc",
        "label": "Faktor Resiko Pernah Terdiagnosa TBC",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "keterangan_pernah_terdiagnosa",
        "label": "Keterangan Pernah Terdiagnosa",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "faktor_resiko_pernah_berobat_tbc",
        "label": "Faktor Resiko Pernah Berobat TBC",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_malnutrisi",
        "label": "Faktor Resiko Malnutrisi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_merokok",
        "label": "Faktor Resiko Merokok",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_riwayat_dm",
        "label": "Faktor Resiko Riwayat Dm",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_odhiv",
        "label": "Faktor Resiko Odhiv",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_lansia",
        "label": "Faktor Resiko Lansia",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_ibu_hamil",
        "label": "Faktor Resiko Ibu Hamil",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_wbp",
        "label": "Faktor Resiko Wbp",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "faktor_resiko_tinggal_diwilayah_padat_kumuh",
        "label": "Faktor Resiko Tinggal Diwilayah Padat Kumuh",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "abnormalitas_tbc",
        "label": "Abnormalitas TBC",
        "tipe": "enum",
        "opsi": [
          "normal",
          "abnormalitas tbc",
          "abnormalitas bukan tbc"
        ]
      },
      {
        "nama": "gejala_tbc_batuk",
        "label": "Gejala TBC Batuk",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gejala_tbc_bb_turun",
        "label": "Gejala TBC BB Turun",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gejala_tbc_demam",
        "label": "Gejala TBC Demam",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "gejala_tbc_berkeringat_malam_hari",
        "label": "Gejala TBC Berkeringat Malam Hari",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "keterangan_gejala_penyakit_lain",
        "label": "Keterangan Gejala Penyakit Lain",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kesimpulan_skrining",
        "label": "Kesimpulan Skrining",
        "tipe": "enum",
        "opsi": [
          "bukan terduga tbc",
          "kontak erat",
          "terduga tbc"
        ]
      },
      {
        "nama": "keterangan_hasil_skrining",
        "label": "Keterangan Hasil Skrining",
        "tipe": "text",
        "maks": 50
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
      "no_rawat",
      "berat_badan",
      "tinggi_badan",
      "imt",
      "kasifikasi_imt",
      "lingkar_pinggang"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-puma",
    "slug": "skrining-puma",
    "judul": "Skrining PUMA",
    "kategori": "M",
    "permissionKey": "skrining_puma",
    "javaRef": "RMSkriningPUMA",
    "tabel": "skrining_puma",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "jk",
        "label": "Jk",
        "tipe": "enum",
        "opsi": [
          "perempuan",
          "laki-laki"
        ]
      },
      {
        "nama": "nilai_jk",
        "label": "Nilai Jk",
        "tipe": "number"
      },
      {
        "nama": "usia",
        "label": "Usia",
        "tipe": "enum",
        "opsi": [
          "40-49",
          "50-59",
          ">60"
        ]
      },
      {
        "nama": "nilai_usia",
        "label": "Nilai Usia",
        "tipe": "number"
      },
      {
        "nama": "pernah_merokok",
        "label": "Pernah Merokok",
        "tipe": "enum",
        "opsi": [
          "pernah",
          "tidak"
        ]
      },
      {
        "nama": "nilai_pernah_merokok",
        "label": "Nilai Pernah Merokok",
        "tipe": "number"
      },
      {
        "nama": "jumlah_rokok_perhari",
        "label": "Jumlah Rokok Perhari",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "lama_merokok",
        "label": "Lama Merokok",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "napas_pendek",
        "label": "Napas Pendek",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_napas_pendek",
        "label": "Nilai Napas Pendek",
        "tipe": "number"
      },
      {
        "nama": "punya_dahak",
        "label": "Punya Dahak",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_punya_dahak",
        "label": "Nilai Punya Dahak",
        "tipe": "number"
      },
      {
        "nama": "biasa_batuk",
        "label": "Biasa Batuk",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_biasa_batuk",
        "label": "Nilai Biasa Batuk",
        "tipe": "number"
      },
      {
        "nama": "spirometri",
        "label": "Spirometri",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_spirometri",
        "label": "Nilai Spirometri",
        "tipe": "number"
      },
      {
        "nama": "nilai_total",
        "label": "Nilai Total",
        "tipe": "uang"
      },
      {
        "nama": "keterangan_hasil_skrining",
        "label": "Keterangan Hasil Skrining",
        "tipe": "text",
        "maks": 150
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
      "no_rawat",
      "jk",
      "usia",
      "pernah_merokok",
      "jumlah_rokok_perhari",
      "lama_merokok"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_jk",
      "label": "Total Nilai Jk"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-adiksi-nikotin",
    "slug": "skrining-adiksi-nikotin",
    "judul": "Skrining Adiksi Nikotin",
    "kategori": "M",
    "permissionKey": "skrining_adiksi_nikotin",
    "javaRef": "RMSkriningAdiksiNikotin",
    "tabel": "skrining_adiksi_nikotin",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "rokok_dihisap",
        "label": "Rokok Dihisap",
        "tipe": "enum",
        "opsi": [
          "1-10",
          "11-20",
          "21-30",
          ">=31"
        ]
      },
      {
        "nama": "nilai_rokok_dihisap",
        "label": "Nilai Rokok Dihisap",
        "tipe": "number"
      },
      {
        "nama": "menyalakan_rokok",
        "label": "Menyalakan Rokok",
        "tipe": "enum",
        "opsi": [
          "dalam 5 menit",
          "6 hingga 30 menit",
          "31 hingga 60 menit",
          "setelah 60 menit"
        ]
      },
      {
        "nama": "nilai_menyalakan_rokok",
        "label": "Nilai Menyalakan Rokok",
        "tipe": "number"
      },
      {
        "nama": "tidak_rela",
        "label": "Tidak Rela",
        "tipe": "enum",
        "opsi": [
          "lainnya",
          "rokok pertama pada pagi hari"
        ]
      },
      {
        "nama": "nilai_tidak_rela",
        "label": "Nilai Tidak Rela",
        "tipe": "number"
      },
      {
        "nama": "jam_pertama",
        "label": "Jam Pertama",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_jam_pertama",
        "label": "Nilai Jam Pertama",
        "tipe": "number"
      },
      {
        "nama": "rasa_ingin",
        "label": "Rasa Ingin",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_rasa_ingin",
        "label": "Nilai Rasa Ingin",
        "tipe": "number"
      },
      {
        "nama": "sakit_berat",
        "label": "Sakit Berat",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_sakit_berat",
        "label": "Nilai Sakit Berat",
        "tipe": "number"
      },
      {
        "nama": "nilai_total",
        "label": "Nilai Total",
        "tipe": "uang"
      },
      {
        "nama": "keterangan_hasil_skrining",
        "label": "Keterangan Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "ketergantungan berat",
          "ketergantungan sedang",
          "ketergantungan rendah"
        ]
      },
      {
        "nama": "skala_motivasi",
        "label": "Skala Motivasi",
        "tipe": "enum",
        "opsi": [
          "1. saya sudah memutuskan tidak akan berhenti merokok seumur hidup saya",
          "2. saya tidak pernah berpikir untuk berhenti merokok. saya tidak punya rencana untuk berhenti",
          "3. saya pernah berpikir untuk berhentl merokok, tetapi saya tidak punya rencana",
          "4. terkadang saya berpikir untuk berhenti merokok, tetapi saya tidak punya rencana",
          "5. saya sering berpikir untuk berhentl merokok, tetapi saya tidak punya rencana",
          "6. saya berencana untuk berhenti merokok dalam 6 bulan ke depan",
          "7. saya berencana untuk berhenti merokok dalam 30 hari ke depan",
          "8. saya masih merokok, tetapi saya mau berubah. saya siap untuk berhenti merokok",
          "9. saya sudah berhenti merokok, tetapi saya khawatir akan merokok kembali, saya butuh lingkungan tanpa asap rokok",
          "10. saya sudah berhenti merokok"
        ]
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
      "no_rawat",
      "rokok_dihisap",
      "menyalakan_rokok",
      "tidak_rela",
      "jam_pertama",
      "rasa_ingin"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_rokok_dihisap",
      "label": "Total Nilai Rokok Dihisap"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-thalassemia",
    "slug": "skrining-thalassemia",
    "judul": "Skrining Thalassemia",
    "kategori": "M",
    "permissionKey": "skrining_thalassemia",
    "javaRef": "RMSkriningTalasemia",
    "tabel": "skrining_thalassemia",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "transfusi_darah",
        "label": "Transfusi Darah",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "rutin_transfusi",
        "label": "Rutin Transfusi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "saudara_thalassemia",
        "label": "Saudara Thalassemia",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "tumbuh_kembang_terlambat",
        "label": "Tumbuh Kembang Terlambat",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "anemia",
        "label": "Anemia",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "ikterus",
        "label": "Ikterus",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "perut_buncit",
        "label": "Perut Buncit",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "gizi_kurang",
        "label": "Gizi Kurang",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "facies_cooley",
        "label": "Facies Cooley",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "perawakan_pendek",
        "label": "Perawakan Pendek",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "hiperpigmentasi_kulit",
        "label": "Hiperpigmentasi Kulit",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "hemoglobin",
        "label": "Hemoglobin",
        "tipe": "enum",
        "opsi": [
          "normal",
          "< 11 mg/dl"
        ]
      },
      {
        "nama": "mvc",
        "label": "Mvc",
        "tipe": "enum",
        "opsi": [
          "normal",
          "< 80 fl"
        ]
      },
      {
        "nama": "mchc",
        "label": "Mchc",
        "tipe": "enum",
        "opsi": [
          "normal",
          "< 27 pq"
        ]
      },
      {
        "nama": "darah_tepi",
        "label": "Darah Tepi",
        "tipe": "enum",
        "opsi": [
          "normal",
          "< 100.000 mm3"
        ]
      },
      {
        "nama": "tindak_lanjut",
        "label": "Tindak Lanjut",
        "tipe": "text",
        "maks": 300
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "transfusi_darah",
      "rutin_transfusi",
      "saudara_thalassemia",
      "tumbuh_kembang_terlambat"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-instrumen-sdq",
    "slug": "skrining-instrumen-sdq",
    "judul": "Skrining Instrumen SDQ",
    "kategori": "M",
    "permissionKey": "skrining_instrumen_sdq",
    "javaRef": "RMSkriningInstrumenSDQ",
    "tabel": "skrining_instrumen_sdq",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "pernyataansdq1",
        "label": "Pernyataansdq1",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq1",
        "label": "Nilai Sdq1",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq2",
        "label": "Pernyataansdq2",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq2",
        "label": "Nilai Sdq2",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq3",
        "label": "Pernyataansdq3",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq3",
        "label": "Nilai Sdq3",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq4",
        "label": "Pernyataansdq4",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq4",
        "label": "Nilai Sdq4",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq5",
        "label": "Pernyataansdq5",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq5",
        "label": "Nilai Sdq5",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq6",
        "label": "Pernyataansdq6",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq6",
        "label": "Nilai Sdq6",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq7",
        "label": "Pernyataansdq7",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq7",
        "label": "Nilai Sdq7",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq8",
        "label": "Pernyataansdq8",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq8",
        "label": "Nilai Sdq8",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq9",
        "label": "Pernyataansdq9",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq9",
        "label": "Nilai Sdq9",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq10",
        "label": "Pernyataansdq10",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq10",
        "label": "Nilai Sdq10",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq11",
        "label": "Pernyataansdq11",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq11",
        "label": "Nilai Sdq11",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq12",
        "label": "Pernyataansdq12",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq12",
        "label": "Nilai Sdq12",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq13",
        "label": "Pernyataansdq13",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq13",
        "label": "Nilai Sdq13",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq14",
        "label": "Pernyataansdq14",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq14",
        "label": "Nilai Sdq14",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq15",
        "label": "Pernyataansdq15",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq15",
        "label": "Nilai Sdq15",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq16",
        "label": "Pernyataansdq16",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq16",
        "label": "Nilai Sdq16",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq17",
        "label": "Pernyataansdq17",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq17",
        "label": "Nilai Sdq17",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq18",
        "label": "Pernyataansdq18",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq18",
        "label": "Nilai Sdq18",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq19",
        "label": "Pernyataansdq19",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq19",
        "label": "Nilai Sdq19",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq20",
        "label": "Pernyataansdq20",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq20",
        "label": "Nilai Sdq20",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq21",
        "label": "Pernyataansdq21",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq21",
        "label": "Nilai Sdq21",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq22",
        "label": "Pernyataansdq22",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq22",
        "label": "Nilai Sdq22",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq23",
        "label": "Pernyataansdq23",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq23",
        "label": "Nilai Sdq23",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq24",
        "label": "Pernyataansdq24",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq24",
        "label": "Nilai Sdq24",
        "tipe": "number"
      },
      {
        "nama": "pernyataansdq25",
        "label": "Pernyataansdq25",
        "tipe": "enum",
        "opsi": [
          "tidak benar",
          "agak benar",
          "selalu benar"
        ]
      },
      {
        "nama": "nilai_sdq25",
        "label": "Nilai Sdq25",
        "tipe": "number"
      },
      {
        "nama": "nilai_total_sdq",
        "label": "Nilai Total SDQ",
        "tipe": "uang"
      },
      {
        "nama": "gejala_emosional",
        "label": "Gejala Emosional",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_gejala_emosional",
        "label": "Nilai Gejala Emosional",
        "tipe": "number"
      },
      {
        "nama": "masalah_perilaku",
        "label": "Masalah Perilaku",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_masalah_perilaku",
        "label": "Nilai Masalah Perilaku",
        "tipe": "number"
      },
      {
        "nama": "hiperaktivitas",
        "label": "Hiperaktivitas",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_hiperaktivitas",
        "label": "Nilai Hiperaktivitas",
        "tipe": "number"
      },
      {
        "nama": "teman_sebaya",
        "label": "Teman Sebaya",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_teman_sebaya",
        "label": "Nilai Teman Sebaya",
        "tipe": "number"
      },
      {
        "nama": "kekuatan",
        "label": "Kekuatan",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_kekuatan",
        "label": "Nilai Kekuatan",
        "tipe": "number"
      },
      {
        "nama": "kesulitan",
        "label": "Kesulitan",
        "tipe": "enum",
        "opsi": [
          "abnormal",
          "ambang/boderline",
          "normal"
        ]
      },
      {
        "nama": "nilai_kesulitan",
        "label": "Nilai Kesulitan",
        "tipe": "number"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 200
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "pernyataansdq1",
      "pernyataansdq2",
      "pernyataansdq3",
      "pernyataansdq4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_sdq1",
      "label": "Total Nilai Sdq1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-instrumen-srq",
    "slug": "skrining-instrumen-srq",
    "judul": "Skrining Instrumen SRQ",
    "kategori": "M",
    "permissionKey": "skrining_instrumen_srq",
    "javaRef": "RMSkriningSRQ",
    "tabel": "skrining_instrumen_srq",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "pernyataansrq1",
        "label": "Pernyataansrq1",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq1",
        "label": "Nilai Srq1",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq2",
        "label": "Pernyataansrq2",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq2",
        "label": "Nilai Srq2",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq3",
        "label": "Pernyataansrq3",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq3",
        "label": "Nilai Srq3",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq4",
        "label": "Pernyataansrq4",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq4",
        "label": "Nilai Srq4",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq5",
        "label": "Pernyataansrq5",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq5",
        "label": "Nilai Srq5",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq6",
        "label": "Pernyataansrq6",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq6",
        "label": "Nilai Srq6",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq7",
        "label": "Pernyataansrq7",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq7",
        "label": "Nilai Srq7",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq8",
        "label": "Pernyataansrq8",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq8",
        "label": "Nilai Srq8",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq9",
        "label": "Pernyataansrq9",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq9",
        "label": "Nilai Srq9",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq10",
        "label": "Pernyataansrq10",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq10",
        "label": "Nilai Srq10",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq11",
        "label": "Pernyataansrq11",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq11",
        "label": "Nilai Srq11",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq12",
        "label": "Pernyataansrq12",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq12",
        "label": "Nilai Srq12",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq13",
        "label": "Pernyataansrq13",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq13",
        "label": "Nilai Srq13",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq14",
        "label": "Pernyataansrq14",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq14",
        "label": "Nilai Srq14",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq15",
        "label": "Pernyataansrq15",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq15",
        "label": "Nilai Srq15",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq16",
        "label": "Pernyataansrq16",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq16",
        "label": "Nilai Srq16",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq17",
        "label": "Pernyataansrq17",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq17",
        "label": "Nilai Srq17",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq18",
        "label": "Pernyataansrq18",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq18",
        "label": "Nilai Srq18",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq19",
        "label": "Pernyataansrq19",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq19",
        "label": "Nilai Srq19",
        "tipe": "number"
      },
      {
        "nama": "pernyataansrq20",
        "label": "Pernyataansrq20",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_srq20",
        "label": "Nilai Srq20",
        "tipe": "number"
      },
      {
        "nama": "nilai_total_srq",
        "label": "Nilai Total SRQ",
        "tipe": "uang"
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "pernyataansrq1",
      "pernyataansrq2",
      "pernyataansrq3",
      "pernyataansrq4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_srq1",
      "label": "Total Nilai Srq1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-instrumen-acrs",
    "slug": "skrining-instrumen-acrs",
    "judul": "Skrining Instrumen ACRS",
    "kategori": "M",
    "permissionKey": "skrining_instrumen_acrs",
    "javaRef": "RMSkriningInstrumenACRS",
    "tabel": "skrining_instrumen_acrs",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "pernyataanacrs1",
        "label": "Pernyataanacrs1",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs1",
        "label": "Nilai Acrs1",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs2",
        "label": "Pernyataanacrs2",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs2",
        "label": "Nilai Acrs2",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs3",
        "label": "Pernyataanacrs3",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs3",
        "label": "Nilai Acrs3",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs4",
        "label": "Pernyataanacrs4",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs4",
        "label": "Nilai Acrs4",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs5",
        "label": "Pernyataanacrs5",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs5",
        "label": "Nilai Acrs5",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs6",
        "label": "Pernyataanacrs6",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs6",
        "label": "Nilai Acrs6",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs7",
        "label": "Pernyataanacrs7",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs7",
        "label": "Nilai Acrs7",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs8",
        "label": "Pernyataanacrs8",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs8",
        "label": "Nilai Acrs8",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs9",
        "label": "Pernyataanacrs9",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs9",
        "label": "Nilai Acrs9",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs10",
        "label": "Pernyataanacrs10",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs10",
        "label": "Nilai Acrs10",
        "tipe": "number"
      },
      {
        "nama": "nilai_total_acrs",
        "label": "Nilai Total ACRS",
        "tipe": "uang"
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "pernyataanacrs1",
      "pernyataanacrs2",
      "pernyataanacrs3",
      "pernyataanacrs4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_acrs1",
      "label": "Total Nilai Acrs1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-instrumen-mental-emosional",
    "slug": "skrining-instrumen-mental-emosional",
    "judul": "Skrining Instrumen Mental Emosional Anak",
    "kategori": "M",
    "permissionKey": "skrining_instrumen_mental_emosional",
    "javaRef": "RMSkriningInstrumenMentalEmosional",
    "tabel": "skrining_instrumen_acrs",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "pernyataanacrs1",
        "label": "Pernyataanacrs1",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs1",
        "label": "Nilai Acrs1",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs2",
        "label": "Pernyataanacrs2",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs2",
        "label": "Nilai Acrs2",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs3",
        "label": "Pernyataanacrs3",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs3",
        "label": "Nilai Acrs3",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs4",
        "label": "Pernyataanacrs4",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs4",
        "label": "Nilai Acrs4",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs5",
        "label": "Pernyataanacrs5",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs5",
        "label": "Nilai Acrs5",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs6",
        "label": "Pernyataanacrs6",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs6",
        "label": "Nilai Acrs6",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs7",
        "label": "Pernyataanacrs7",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs7",
        "label": "Nilai Acrs7",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs8",
        "label": "Pernyataanacrs8",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs8",
        "label": "Nilai Acrs8",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs9",
        "label": "Pernyataanacrs9",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs9",
        "label": "Nilai Acrs9",
        "tipe": "number"
      },
      {
        "nama": "pernyataanacrs10",
        "label": "Pernyataanacrs10",
        "tipe": "enum",
        "opsi": [
          "tidak pernah",
          "kadang-kadang",
          "sering",
          "selalu"
        ]
      },
      {
        "nama": "nilai_acrs10",
        "label": "Nilai Acrs10",
        "tipe": "number"
      },
      {
        "nama": "nilai_total_acrs",
        "label": "Nilai Total ACRS",
        "tipe": "uang"
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "pernyataanacrs1",
      "pernyataanacrs2",
      "pernyataanacrs3",
      "pernyataanacrs4"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_acrs1",
      "label": "Total Nilai Acrs1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-kanker-kolorektal",
    "slug": "skrining-kanker-kolorektal",
    "judul": "Skrining Kanker Kolorektal",
    "kategori": "M",
    "permissionKey": "skrining_kanker_kolorektal",
    "javaRef": "RMSkriningKankerKolorektal",
    "tabel": "skrining_kanker_kolorektal",
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
        "wajib": true,
        "tipe": "datetime"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "riwayat_polip_adenomatosa",
        "label": "Riwayat Polip Adenomatosa",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "riwayat_bab_berdarah",
        "label": "Riwayat Bab Berdarah",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "riwayat_reseksi_kuratif",
        "label": "Riwayat Reseksi Kuratif",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "colok_dubur",
        "label": "Colok Dubur",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "riwayat_kolorektal_keluarga",
        "label": "Riwayat Kolorektal Keluarga",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "darah_samar_feses",
        "label": "Darah Samar Feses",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "rujuk_faskes_lanjut",
        "label": "Rujuk Faskes Lanjut",
        "tipe": "enum",
        "opsi": [
          "Tidak",
          "Ya"
        ]
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "enum",
        "opsi": [
          "Normal",
          "Suspek"
        ]
      },
      {
        "nama": "keterangan_kesimpulan",
        "label": "Keterangan Kesimpulan",
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "keterangan_kesimpulan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-diabetes-melitus",
    "slug": "skrining-diabetes-melitus",
    "judul": "Skrining Diabetes Melitus",
    "kategori": "M",
    "permissionKey": "skrining_diabetes_melitus",
    "javaRef": "RMSkriningDiabetesMelitus",
    "tabel": "skrining_diabetes_melitus",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
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
        "nama": "anamnesis1",
        "label": "Anamnesis1",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis2",
        "label": "Anamnesis2",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis3",
        "label": "Anamnesis3",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis4",
        "label": "Anamnesis4",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis5",
        "label": "Anamnesis5",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis6",
        "label": "Anamnesis6",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis7",
        "label": "Anamnesis7",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis8",
        "label": "Anamnesis8",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis9",
        "label": "Anamnesis9",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis10",
        "label": "Anamnesis10",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis11",
        "label": "Anamnesis11",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "anamnesis12",
        "label": "Anamnesis12",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "berat_badan",
        "label": "Berat Badan",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "tinggi_badan",
        "label": "Tinggi Badan",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "imt",
        "label": "IMT",
        "tipe": "text",
        "maks": 6
      },
      {
        "nama": "kasifikasi_imt",
        "label": "Kasifikasi IMT",
        "tipe": "enum",
        "opsi": [
          "berat badan kurang",
          "berat badan normal",
          "kelebihan berat badan",
          "obesitas i",
          "obesitas ii"
        ]
      },
      {
        "nama": "hasil_gds",
        "label": "Hasil GDS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keterangan_gds",
        "label": "Keterangan GDS",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hasil_gdp",
        "label": "Hasil Gdp",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "keterangan_gdp",
        "label": "Keterangan Gdp",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "normal",
          "suspek"
        ]
      },
      {
        "nama": "keterangan_skrining",
        "label": "Keterangan Skrining",
        "tipe": "text",
        "maks": 60
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "nip",
      "anamnesis1",
      "anamnesis2",
      "anamnesis3",
      "anamnesis4"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-skrining-frailty-syndrome",
    "slug": "skrining-frailty-syndrome",
    "judul": "Skrining Frailty Syndrome",
    "kategori": "M",
    "permissionKey": "skrining_frailty_syndrome",
    "javaRef": "RMSkriningFrailtySyndrome",
    "tabel": "skrining_frailty_syndrome",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "resistensi",
        "label": "Resistensi",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_resistensi",
        "label": "Nilai Resistensi",
        "tipe": "number"
      },
      {
        "nama": "aktivitas",
        "label": "Aktivitas",
        "tipe": "enum",
        "opsi": [
          "jarang",
          "kadang-kadang",
          "sebagian besar waktu",
          "sepanjang waktu"
        ]
      },
      {
        "nama": "nilai_aktivitas",
        "label": "Nilai Aktivitas",
        "tipe": "number"
      },
      {
        "nama": "penyakit_tidak_pernah",
        "label": "Penyakit Tidak Pernah",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_kanker",
        "label": "Penyakit Kanker",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_gagal_jantung",
        "label": "Penyakit Gagal Jantung",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_ginjal",
        "label": "Penyakit Ginjal",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_nyeri_dada",
        "label": "Penyakit Nyeri Dada",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_serangan_jantung",
        "label": "Penyakit Serangan Jantung",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_stroke",
        "label": "Penyakit Stroke",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_asma",
        "label": "Penyakit Asma",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_nyeri_sendi",
        "label": "Penyakit Nyeri Sendi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_paru_kronis",
        "label": "Penyakit Paru Kronis",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_hipertensi",
        "label": "Penyakit Hipertensi",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "penyakit_diabetes",
        "label": "Penyakit Diabetes",
        "tipe": "enum",
        "opsi": [
          "ya",
          "tidak"
        ]
      },
      {
        "nama": "nilai_penyakit",
        "label": "Nilai Penyakit",
        "tipe": "number"
      },
      {
        "nama": "usaha_berjalan",
        "label": "Usaha Berjalan",
        "tipe": "enum",
        "opsi": [
          "tidak",
          "ya"
        ]
      },
      {
        "nama": "nilai_usaha_berjalan",
        "label": "Nilai Usaha Berjalan",
        "tipe": "number"
      },
      {
        "nama": "berat_badan",
        "label": "Berat Badan",
        "tipe": "enum",
        "opsi": [
          "< 5%",
          ">= 5%"
        ]
      },
      {
        "nama": "nilai_berat_badan",
        "label": "Nilai Berat Badan",
        "tipe": "number"
      },
      {
        "nama": "nilai_total",
        "label": "Nilai Total",
        "tipe": "uang"
      },
      {
        "nama": "hasil_skrining",
        "label": "Hasil Skrining",
        "tipe": "enum",
        "opsi": [
          "rapuh/renta",
          "pra-kerapuhan",
          "segar & tidak rapuh"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 40
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
      "no_rawat",
      "resistensi",
      "aktivitas",
      "penyakit_tidak_pernah",
      "penyakit_kanker",
      "penyakit_gagal_jantung"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "nilai_resistensi",
      "label": "Total Nilai Resistensi"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-laporan-tindakan",
    "slug": "laporan-tindakan",
    "judul": "Laporan Tindakan Medis",
    "kategori": "M",
    "permissionKey": "laporan_tindakan",
    "javaRef": "RMLaporanTindakan",
    "tabel": "laporan_tindakan",
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
        "nama": "tanggal",
        "label": "Tanggal",
        "pk": true,
        "tipe": "datetime",
        "wajib": true
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
        "maks": 20
      },
      {
        "nama": "diagnosa_pra_tindakan",
        "label": "Diagnosa Pra Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "diagnosa_pasca_tindakan",
        "label": "Diagnosa Pasca Tindakan",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "tindakan_medik",
        "label": "Tindakan Medik",
        "tipe": "text",
        "maks": 300,
        "wajib": true
      },
      {
        "nama": "uraian",
        "label": "Uraian",
        "tipe": "text",
        "maks": 3000,
        "wajib": true
      },
      {
        "nama": "hasil",
        "label": "Hasil",
        "tipe": "text",
        "maks": 1000,
        "wajib": true
      },
      {
        "nama": "kesimpulan",
        "label": "Kesimpulan",
        "tipe": "text",
        "maks": 500,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_rawat",
      "tanggal",
      "kd_dokter",
      "nip",
      "diagnosa_pra_tindakan",
      "diagnosa_pasca_tindakan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-perintah-lisan",
    "slug": "perintah-lisan",
    "judul": "Form Perintah Lisan Dan Pelaporan Nilai Kritis",
    "kategori": "M",
    "permissionKey": "admin",
    "javaRef": "DlgPerintahLisan",
    "tabel": "pemeriksaan_ralan",
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
        "nama": "tgl_perawatan",
        "label": "Tgl. Perawatan",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "jam_rawat",
        "label": "Jam Rawat",
        "pk": true,
        "tipe": "time",
        "wajib": true
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
        "tipe": "text",
        "maks": 8,
        "wajib": true
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
        "label": "SPO2",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "gcs",
        "label": "GCS",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kesadaran",
        "label": "Kesadaran",
        "tipe": "enum",
        "opsi": [
          "compos mentis",
          "somnolence",
          "sopor",
          "coma",
          "alert",
          "confusion",
          "voice",
          "pain",
          "unresponsive",
          "apatis",
          "delirium"
        ],
        "wajib": true
      },
      {
        "nama": "keluhan",
        "label": "Keluhan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "pemeriksaan",
        "label": "Pemeriksaan",
        "tipe": "text",
        "maks": 2000
      },
      {
        "nama": "alergi",
        "label": "Alergi",
        "tipe": "text",
        "maks": 80
      },
      {
        "nama": "lingkar_perut",
        "label": "Lingkar Perut",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "rtl",
        "label": "Rtl",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "penilaian",
        "label": "Penilaian",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "instruksi",
        "label": "Instruksi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "evaluasi",
        "label": "Evaluasi",
        "tipe": "text",
        "maks": 2000,
        "wajib": true
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_perawatan",
    "kolomCari": [
      "no_rawat",
      "tgl_perawatan",
      "jam_rawat",
      "suhu_tubuh",
      "tensi",
      "nadi"
    ],
    "kolomUrut": "tgl_perawatan",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rujukan-internal-poli",
    "slug": "rujukan-internal-poli",
    "judul": "Rujukan Poli Internal",
    "kategori": "M",
    "permissionKey": "registrasi",
    "javaRef": "DlgRujukanPoliInternal",
    "tabel": "rujukan_internal_poli",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_poli",
        "label": "Kode Poli",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      }
    ],
    "kolomCari": [
      "no_rawat",
      "kd_dokter",
      "kd_poli"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ranap-gabung",
    "slug": "ranap-gabung",
    "judul": "Ranap Gabung Ibu & Bayi",
    "kategori": "M",
    "permissionKey": "kamar_inap",
    "javaRef": "DlgKamarInap",
    "tabel": "ranap_gabung",
    "kolom": [
      {
        "nama": "no_rawat",
        "label": "No. Rawat Ibu",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rawat2",
        "label": "No. Rawat Bayi",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      }
    ],
    "kolomCari": [
      "no_rawat",
      "no_rawat2"
    ],
    "kolomUrut": "no_rawat",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_REKAM_MEDIS: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_REKAM_MEDIS.map((item) => [item.slug, item]),
);

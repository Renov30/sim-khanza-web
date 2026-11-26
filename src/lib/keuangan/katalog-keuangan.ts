import type { DefinisiModulKatalog } from "@/lib/modul/katalog-crud";

export const KATALOG_KEUANGAN: readonly DefinisiModulKatalog[] = [
  {
    "id": "jurnal-keuangan",
    "slug": "jurnal-keuangan",
    "judul": "Jurnal & Buku Besar",
    "kategori": "K",
    "permissionKey": "posting_jurnal",
    "javaRef": "DlgJurnal",
    "tabel": "jurnal",
    "kolom": [
      {
        "nama": "no_jurnal",
        "label": "No. Jurnal",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_bukti",
        "label": "No. Bukti",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_jurnal",
        "label": "Tgl. Jurnal",
        "tipe": "date"
      },
      {
        "nama": "jam_jurnal",
        "label": "Jam Jurnal",
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "u",
          "p"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 350
      }
    ],
    "kolomTanggal": "tgl_jurnal",
    "kolomCari": [
      "no_jurnal",
      "no_bukti",
      "jenis",
      "keterangan"
    ],
    "kolomUrut": "tgl_jurnal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kamar",
    "slug": "kamar",
    "judul": "Kamar",
    "kategori": "K",
    "permissionKey": "kamar",
    "javaRef": "btn-kamar",
    "tabel": "kamar",
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
        "nama": "kd_bangsal",
        "label": "Kd Bangsal",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "trf_kamar",
        "label": "Trf Kamar",
        "tipe": "number"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "ISI",
          "KOSONG",
          "DIBERSIHKAN",
          "DIBOOKING"
        ]
      },
      {
        "nama": "kelas",
        "label": "Kelas",
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
        "nama": "statusdata",
        "label": "Statusdata",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kd_kamar",
      "kd_bangsal"
    ],
    "kolomUrut": "kd_kamar",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tarif-radiologi",
    "slug": "tarif-radiologi",
    "judul": "Tarif Radiologi",
    "kategori": "K",
    "permissionKey": "tarif_radiologi",
    "javaRef": "DlgJnsPerawatanRadiologi",
    "tabel": "jns_perawatan_radiologi",
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
        "nama": "nm_perawatan",
        "label": "Nama Perawatan",
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
        "label": "BHP",
        "tipe": "uang"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_petugas",
        "label": "Tarif Tindakan Petugas",
        "tipe": "uang"
      },
      {
        "nama": "kso",
        "label": "KSO",
        "tipe": "uang"
      },
      {
        "nama": "menejemen",
        "label": "Menejemen",
        "tipe": "uang"
      },
      {
        "nama": "total_byr",
        "label": "Total Byr",
        "tipe": "uang"
      },
      {
        "nama": "kd_pj",
        "label": "Kode Pj",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      },
      {
        "nama": "kelas",
        "label": "Kelas",
        "tipe": "enum",
        "opsi": [
          "-",
          "rawat jalan",
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_pj",
      "status",
      "kelas"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-paket-operasi",
    "slug": "paket-operasi",
    "judul": "Tarif Operasi/VK",
    "kategori": "K",
    "permissionKey": "tarif_operasi",
    "javaRef": "DlgJnsPerawatanOperasi",
    "tabel": "paket_operasi",
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
        "nama": "nm_perawatan",
        "label": "Nama Perawatan",
        "tipe": "text",
        "maks": 80,
        "wajib": true
      },
      {
        "nama": "kategori",
        "label": "Kategori",
        "tipe": "enum",
        "opsi": [
          "kebidanan",
          "operasi"
        ]
      },
      {
        "nama": "operator1",
        "label": "Operator1",
        "tipe": "number"
      },
      {
        "nama": "operator2",
        "label": "Operator2",
        "tipe": "number"
      },
      {
        "nama": "operator3",
        "label": "Operator3",
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
        "tipe": "number"
      },
      {
        "nama": "perawaat_resusitas",
        "label": "Perawaat Resusitas",
        "tipe": "number"
      },
      {
        "nama": "dokter_anestesi",
        "label": "Dokter Anestesi",
        "tipe": "number"
      },
      {
        "nama": "asisten_anestesi",
        "label": "Asisten Anestesi",
        "tipe": "number"
      },
      {
        "nama": "asisten_anestesi2",
        "label": "Asisten Anestesi2",
        "tipe": "number"
      },
      {
        "nama": "bidan",
        "label": "Bidan",
        "tipe": "number"
      },
      {
        "nama": "bidan2",
        "label": "Bidan2",
        "tipe": "number"
      },
      {
        "nama": "bidan3",
        "label": "Bidan3",
        "tipe": "number"
      },
      {
        "nama": "perawat_luar",
        "label": "Perawat Luar",
        "tipe": "number"
      },
      {
        "nama": "sewa_ok",
        "label": "Sewa OK",
        "tipe": "number"
      },
      {
        "nama": "alat",
        "label": "Alat",
        "tipe": "number"
      },
      {
        "nama": "akomodasi",
        "label": "Akomodasi",
        "tipe": "number"
      },
      {
        "nama": "bagian_rs",
        "label": "Bagian Rs",
        "tipe": "number"
      },
      {
        "nama": "omloop",
        "label": "Omloop",
        "tipe": "number"
      },
      {
        "nama": "omloop2",
        "label": "Omloop2",
        "tipe": "number"
      },
      {
        "nama": "omloop3",
        "label": "Omloop3",
        "tipe": "number"
      },
      {
        "nama": "omloop4",
        "label": "Omloop4",
        "tipe": "number"
      },
      {
        "nama": "omloop5",
        "label": "Omloop5",
        "tipe": "number"
      },
      {
        "nama": "sarpras",
        "label": "Sarpras",
        "tipe": "number"
      },
      {
        "nama": "dokter_pjanak",
        "label": "Dokter Pjanak",
        "tipe": "number"
      },
      {
        "nama": "dokter_umum",
        "label": "Dokter Umum",
        "tipe": "number"
      },
      {
        "nama": "kd_pj",
        "label": "Kode Pj",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      },
      {
        "nama": "kelas",
        "label": "Kelas",
        "tipe": "enum",
        "opsi": [
          "-",
          "rawat jalan",
          "kelas 1",
          "kelas 2",
          "kelas 3",
          "kelas utama",
          "kelas vip",
          "kelas vvip"
        ]
      }
    ],
    "kolomCari": [
      "kode_paket",
      "nm_perawatan",
      "kategori",
      "kd_pj",
      "status",
      "kelas"
    ],
    "kolomUrut": "kode_paket",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tarif-utd",
    "slug": "tarif-utd",
    "judul": "Tarif UTD",
    "kategori": "K",
    "permissionKey": "tarif_utd",
    "javaRef": "DlgJnsPerawatanUTD",
    "tabel": "jns_perawatan_utd",
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
        "tipe": "number"
      },
      {
        "nama": "tarif_perujuk",
        "label": "Tarif Perujuk",
        "tipe": "uang"
      },
      {
        "nama": "tarif_tindakan_dokter",
        "label": "Tarif Tindakan Dokter",
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
        "nama": "manajemen",
        "label": "Manajemen",
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
        "tipe": "text",
        "maks": 3
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
      "kd_jenis_prw",
      "nm_perawatan",
      "kd_pj"
    ],
    "kolomUrut": "kd_jenis_prw",
    "kolomRingkasan": {
      "nama": "tarif_perujuk",
      "label": "Total Tarif Perujuk"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-set-tarif-online",
    "slug": "set-tarif-online",
    "judul": "Set Tarif Online",
    "kategori": "K",
    "permissionKey": "set_tarif_online",
    "javaRef": "KeuanganSetTarifOnline",
    "tabel": "set_tarif_online",
    "kolom": [
      {
        "nama": "kd_jenis_prw",
        "label": "Kd Jenis Prw",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kd_jenis_prw"
    ],
    "kolomUrut": "kd_jenis_prw",
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": true
  },
  {
    "id": "btn-cara-bayar",
    "slug": "cara-bayar",
    "judul": "Asuransi/Askes/Jenis Bayar",
    "kategori": "K",
    "permissionKey": "cara_bayar",
    "javaRef": "DlgPenanggungJawab",
    "tabel": "penjab",
    "kolom": [
      {
        "nama": "kd_pj",
        "label": "Kode Pj",
        "pk": true,
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "png_jawab",
        "label": "Png Jawab",
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "nama_perusahaan",
        "label": "Nama Perusahaan",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "alamat_asuransi",
        "label": "Alamat Asuransi",
        "tipe": "text",
        "maks": 130,
        "wajib": true
      },
      {
        "nama": "no_telp",
        "label": "No. Telp",
        "tipe": "text",
        "maks": 40,
        "wajib": true
      },
      {
        "nama": "attn",
        "label": "Attn",
        "tipe": "text",
        "maks": 60,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekening",
    "slug": "rekening",
    "judul": "Akun Rekening",
    "kategori": "K",
    "permissionKey": "akun_rekening",
    "javaRef": "DlgRekening",
    "tabel": "subrekening",
    "kolom": [
      {
        "nama": "kd_rek2",
        "label": "Kd Rek2",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kd_rek2",
      "kd_rek"
    ],
    "kolomUrut": "kd_rek2",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rekening-tahun",
    "slug": "rekening-tahun",
    "judul": "Rekening Tahun",
    "kategori": "K",
    "permissionKey": "rekening_tahun",
    "javaRef": "DlgRekeningTahun",
    "tabel": "rekeningtahun",
    "kolom": [
      {
        "nama": "thn",
        "label": "Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "saldo_awal",
        "label": "Saldo Awal",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "thn",
      "kd_rek"
    ],
    "kolomUrut": "thn",
    "kolomRingkasan": {
      "nama": "saldo_awal",
      "label": "Total Saldo Awal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-saldo-akun-per-bulan",
    "slug": "saldo-akun-per-bulan",
    "judul": "Saldo Akun Per Bulan",
    "kategori": "K",
    "permissionKey": "saldo_akun_perbulan",
    "javaRef": "KeuanganSaldoAkunPerBulan",
    "tabel": "rekeningtahun",
    "kolom": [
      {
        "nama": "thn",
        "label": "Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "saldo_awal",
        "label": "Saldo Awal",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "thn",
      "kd_rek"
    ],
    "kolomUrut": "thn",
    "kolomRingkasan": {
      "nama": "saldo_awal",
      "label": "Total Saldo Awal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btnakun-bayar",
    "slug": "btnakun-bayar",
    "judul": "Akun Bayar",
    "kategori": "K",
    "permissionKey": "akun_bayar",
    "javaRef": "DlgAkunBayar",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-bayar-hutang",
    "slug": "akun-bayar-hutang",
    "judul": "Akun Bayar Hutang",
    "kategori": "K",
    "permissionKey": "akun_bayar_hutang",
    "javaRef": "DlgAkunBayarHutang",
    "tabel": "akun_bayar_hutang",
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
      }
    ],
    "kolomCari": [
      "nama_bayar",
      "kd_rek"
    ],
    "kolomUrut": "nama_bayar",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-piutang",
    "slug": "akun-piutang",
    "judul": "Akun Piutang",
    "kategori": "K",
    "permissionKey": "akun_piutang",
    "javaRef": "DlgAkunPiutang",
    "tabel": "akun_piutang",
    "kolom": [
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_pj",
        "label": "Kode Pj",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-penagihan-piutang",
    "slug": "akun-penagihan-piutang",
    "judul": "Akun Penagihan Piutang",
    "kategori": "K",
    "permissionKey": "akun_penagihan_piutang",
    "javaRef": "DlgAkunPenagihanPiutang",
    "tabel": "akun_penagihan_piutang",
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
        "nama": "nama_bank",
        "label": "Nama Bank",
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "atas_nama",
        "label": "Atas Nama",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "no_rek",
        "label": "No. Rek",
        "tipe": "text",
        "maks": 20
      }
    ],
    "kolomCari": [
      "kd_rek",
      "nama_bank",
      "atas_nama",
      "no_rek"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-akun-aset-inventaris",
    "slug": "akun-aset-inventaris",
    "judul": "Akun Jenis Aset/Inventaris",
    "kategori": "K",
    "permissionKey": "akun_aset_inventaris",
    "javaRef": "DlgAkunAsetInventaris",
    "tabel": "akun_aset_inventaris",
    "kolom": [
      {
        "nama": "id_jenis",
        "label": "Id Jenis",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "id_jenis",
      "kd_rek"
    ],
    "kolomUrut": "id_jenis",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengaturan-rekening",
    "slug": "pengaturan-rekening",
    "judul": "Pengaturan Rekening",
    "kategori": "K",
    "permissionKey": "pengaturan_rekening",
    "javaRef": "DlgPengaturanRekening",
    "tabel": "set_akun_ralan",
    "kolom": [
      {
        "nama": "Suspen_Piutang_Tindakan_Ralan",
        "label": "Suspen Piutang Tindakan Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
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
        "label": "Beban KSO Tindakan Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_KSO_Tindakan_Ralan",
        "label": "Utang KSO Tindakan Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
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
        "label": "Hpp BHP Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Persediaan_BHP_Tindakan_Ralan",
        "label": "Persediaan BHP Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Menejemen_Tindakan_Ralan",
        "label": "Beban Jasa Menejemen Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Menejemen_Tindakan_Ralan",
        "label": "Utang Jasa Menejemen Tindakan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Suspen_Piutang_Laborat_Ralan",
        "label": "Suspen Piutang Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Laborat_Ralan",
        "label": "Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Dokter_Laborat_Ralan",
        "label": "Beban Jasa Medik Dokter Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Medik_Dokter_Laborat_Ralan",
        "label": "Utang Jasa Medik Dokter Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Petugas_Laborat_Ralan",
        "label": "Beban Jasa Medik Petugas Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Jasa_Medik_Petugas_Laborat_Ralan",
        "label": "Utang Jasa Medik Petugas Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Kso_Laborat_Ralan",
        "label": "Beban KSO Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Utang_Kso_Laborat_Ralan",
        "label": "Utang KSO Laborat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "HPP_Persediaan_Laborat_Rawat_Jalan",
        "label": "Hpp Persediaan Laborat Rawat Jalan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Persediaan_BHP_Laborat_Rawat_Jalan",
        "label": "Persediaan BHP Laborat Rawat Jalan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Sarana_Laborat_Ralan",
        "label": "Beban Jasa Sarana Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Sarana_Laborat_Ralan",
        "label": "Utang Jasa Sarana Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Perujuk_Laborat_Ralan",
        "label": "Beban Jasa Perujuk Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Perujuk_Laborat_Ralan",
        "label": "Utang Jasa Perujuk Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Menejemen_Laborat_Ralan",
        "label": "Beban Jasa Menejemen Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Menejemen_Laborat_Ralan",
        "label": "Utang Jasa Menejemen Laborat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Suspen_Piutang_Radiologi_Ralan",
        "label": "Suspen Piutang Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Radiologi_Ralan",
        "label": "Radiologi Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Dokter_Radiologi_Ralan",
        "label": "Beban Jasa Medik Dokter Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Medik_Dokter_Radiologi_Ralan",
        "label": "Utang Jasa Medik Dokter Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Medik_Petugas_Radiologi_Ralan",
        "label": "Beban Jasa Medik Petugas Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Medik_Petugas_Radiologi_Ralan",
        "label": "Utang Jasa Medik Petugas Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Kso_Radiologi_Ralan",
        "label": "Beban KSO Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Kso_Radiologi_Ralan",
        "label": "Utang KSO Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "HPP_Persediaan_Radiologi_Rawat_Jalan",
        "label": "Hpp Persediaan Radiologi Rawat Jalan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Persediaan_BHP_Radiologi_Rawat_Jalan",
        "label": "Persediaan BHP Radiologi Rawat Jalan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Sarana_Radiologi_Ralan",
        "label": "Beban Jasa Sarana Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Sarana_Radiologi_Ralan",
        "label": "Utang Jasa Sarana Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Perujuk_Radiologi_Ralan",
        "label": "Beban Jasa Perujuk Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Perujuk_Radiologi_Ralan",
        "label": "Utang Jasa Perujuk Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Menejemen_Radiologi_Ralan",
        "label": "Beban Jasa Menejemen Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Menejemen_Radiologi_Ralan",
        "label": "Utang Jasa Menejemen Radiologi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Suspen_Piutang_Obat_Ralan",
        "label": "Suspen Piutang Obat Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Obat_Ralan",
        "label": "Obat Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "HPP_Obat_Rawat_Jalan",
        "label": "Hpp Obat Rawat Jalan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Persediaan_Obat_Rawat_Jalan",
        "label": "Persediaan Obat Rawat Jalan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Registrasi_Ralan",
        "label": "Registrasi Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Suspen_Piutang_Operasi_Ralan",
        "label": "Suspen Piutang Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Operasi_Ralan",
        "label": "Operasi Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Beban_Jasa_Medik_Dokter_Operasi_Ralan",
        "label": "Beban Jasa Medik Dokter Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Medik_Dokter_Operasi_Ralan",
        "label": "Utang Jasa Medik Dokter Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Beban_Jasa_Medik_Paramedis_Operasi_Ralan",
        "label": "Beban Jasa Medik Paramedis Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Utang_Jasa_Medik_Paramedis_Operasi_Ralan",
        "label": "Utang Jasa Medik Paramedis Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "HPP_Obat_Operasi_Ralan",
        "label": "Hpp Obat Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Persediaan_Obat_Kamar_Operasi_Ralan",
        "label": "Persediaan Obat Kamar Operasi Ralan",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "Tambahan_Ralan",
        "label": "Tambahan Ralan",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "Potongan_Ralan",
        "label": "Potongan Ralan",
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
    "bisaTambah": true,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-kategori-pengeluaran-harian",
    "slug": "kategori-pengeluaran-harian",
    "judul": "Kategori Pengeluaran Harian",
    "kategori": "K",
    "permissionKey": "kategori_pengeluaran_harian",
    "javaRef": "DlgKategoriPengeluaran",
    "tabel": "kategori_pengeluaran_harian",
    "kolom": [
      {
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_kategori",
        "label": "Nama Kategori",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek2",
        "label": "Kode Rek2",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kode_kategori",
      "nama_kategori",
      "kd_rek",
      "kd_rek2"
    ],
    "kolomUrut": "kode_kategori",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengeluaran",
    "slug": "pengeluaran",
    "judul": "Pengeluaran Harian",
    "kategori": "K",
    "permissionKey": "pengeluaran",
    "javaRef": "DlgPengeluaranHarian",
    "tabel": "pengeluaran_harian",
    "kolom": [
      {
        "nama": "no_keluar",
        "label": "No. Keluar",
        "pk": true,
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "datetime",
        "wajib": true
      },
      {
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "biaya",
        "label": "Biaya",
        "tipe": "uang"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_keluar",
      "kode_kategori",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "biaya",
      "label": "Total Biaya"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kategori-pemasukan-lian",
    "slug": "kategori-pemasukan-lian",
    "judul": "Kategori Pemasukan Lain-lain",
    "kategori": "K",
    "permissionKey": "kategori_pemasukan_lain",
    "javaRef": "DlgKategoriPemasukan",
    "tabel": "kategori_pemasukan_lain",
    "kolom": [
      {
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_kategori",
        "label": "Nama Kategori",
        "tipe": "text",
        "maks": 40
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek2",
        "label": "Kd Rek2",
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomCari": [
      "kode_kategori",
      "nama_kategori",
      "kd_rek",
      "kd_rek2"
    ],
    "kolomUrut": "kode_kategori",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemasukan-lain",
    "slug": "pemasukan-lain",
    "judul": "Pemasukan Lain-Lain",
    "kategori": "K",
    "permissionKey": "pemasukan_lain",
    "javaRef": "DlgPemasukanLain",
    "tabel": "pemasukan_lain",
    "kolom": [
      {
        "nama": "no_masuk",
        "label": "No Masuk",
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
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "besar",
        "label": "Besar",
        "tipe": "uang"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "keperluan",
        "label": "Keperluan",
        "tipe": "text",
        "maks": 70
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_masuk",
      "kode_kategori",
      "nip",
      "keterangan",
      "keperluan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "besar",
      "label": "Total Besar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-kategori-piutang-jasa-perusahaan",
    "slug": "kategori-piutang-jasa-perusahaan",
    "judul": "Kategori Piutang Jasa Perusahaan",
    "kategori": "K",
    "permissionKey": "kategori_piutang_jasa_perusahaan",
    "javaRef": "DlgKategoriPiutangJasaPerusahaan",
    "tabel": "kategori_piutang_jasa_perusahaan",
    "kolom": [
      {
        "nama": "kode_kategori",
        "label": "Kode Kategori",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_kategori",
        "label": "Nama Kategori",
        "tipe": "text",
        "maks": 70
      }
    ],
    "kolomCari": [
      "kode_kategori",
      "nama_kategori"
    ],
    "kolomUrut": "kode_kategori",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-piutang-jasa-perusahaan",
    "slug": "piutang-jasa-perusahaan",
    "judul": "Piutang Jasa Perusahaan",
    "kategori": "K",
    "permissionKey": "piutang_jasa_perusahaan",
    "javaRef": "KeuanganPiutangJasaPerusahaan",
    "tabel": "piutang_jasa_perusahaan",
    "kolom": [
      {
        "nama": "no_piutang",
        "label": "No. Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tgl_piutang",
        "label": "Tgl. Piutang",
        "tipe": "date"
      },
      {
        "nama": "jatuh_tempo",
        "label": "Jatuh Tempo",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_perusahaan",
        "label": "Kode Perusahaan",
        "tipe": "text",
        "maks": 8
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "grand_total",
        "label": "Grand Total",
        "tipe": "uang"
      },
      {
        "nama": "persen_jasa_menejemen",
        "label": "Persen Jasa Menejemen",
        "tipe": "uang"
      },
      {
        "nama": "jasa_menejemen",
        "label": "Jasa Menejemen",
        "tipe": "uang"
      },
      {
        "nama": "dpp_lain",
        "label": "Dpp Lain",
        "tipe": "number"
      },
      {
        "nama": "persen_ppn",
        "label": "Persen PPN",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "persen_pph",
        "label": "Persen Pph",
        "tipe": "number"
      },
      {
        "nama": "pph",
        "label": "Pph",
        "tipe": "number"
      },
      {
        "nama": "totalpiutang",
        "label": "Totalpiutang",
        "tipe": "uang"
      },
      {
        "nama": "sisapiutang",
        "label": "Sisapiutang",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah lunas",
          "belum lunas"
        ]
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "no_piutang",
      "nip",
      "kode_perusahaan",
      "keterangan",
      "status"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "grand_total",
      "label": "Total Grand Total"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-piutang-jasa-perusahaan-belum-lunas",
    "slug": "piutang-jasa-perusahaan-belum-lunas",
    "judul": "Piutang Jasa Perusahaan Belum Lunas",
    "kategori": "K",
    "permissionKey": "piutang_jasa_perusahaan_belum_lunas",
    "javaRef": "KeuanganPiutangJasaPerusahaanBelumLunas",
    "tabel": "bayar_piutang_jasa_perusahaan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "kode_perusahaan",
        "label": "Kode Perusahaan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_piutang",
        "label": "No Piutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "kode_perusahaan",
      "no_piutang",
      "kd_rek",
      "nama_bayar",
      "keterangan"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bayar-piutang-jasa-perusahaan",
    "slug": "bayar-piutang-jasa-perusahaan",
    "judul": "Bayar Piutang Jasa Perusahaan",
    "kategori": "K",
    "permissionKey": "bayar_piutang_jasa_perusahaan",
    "javaRef": "KeuanganBayarPiutangJasaPerusahaan",
    "tabel": "bayar_piutang_jasa_perusahaan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl. Bayar",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kode_perusahaan",
        "label": "Kode Perusahaan",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "no_piutang",
        "label": "No. Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "tipe": "text",
        "maks": 50,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "tgl_bayar",
      "kode_perusahaan",
      "keterangan",
      "no_piutang",
      "kd_rek",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-rincian-piutang-pasien",
    "slug": "rincian-piutang-pasien",
    "judul": "Rincian Piutang Pasien",
    "kategori": "K",
    "permissionKey": "rincian_piutang_pasien",
    "javaRef": "KeuanganRincianPiutangPasien",
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
    "id": "btn-piutang-belum-lunas",
    "slug": "piutang-belum-lunas",
    "judul": "Piutang Belum Lunas",
    "kategori": "K",
    "permissionKey": "piutang_pasien2",
    "javaRef": "KeuanganPiutangBelumLunas",
    "tabel": "bayar_piutang",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek_kontra",
        "label": "Kd Rek Kontra",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diskon_piutang",
        "label": "Diskon Piutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_diskon_piutang",
        "label": "Kd Rek Diskon Piutang",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tidak_terbayar",
        "label": "Tidak Terbayar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_tidak_terbayar",
        "label": "Kd Rek Tidak Terbayar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_rkm_medis",
      "no_rawat",
      "kd_rek",
      "kd_rek_kontra",
      "catatan",
      "kd_rek_diskon_piutang"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-piutang-obat-belum-lunas",
    "slug": "piutang-obat-belum-lunas",
    "judul": "Piutang Obat & BHP Belum Lunas",
    "kategori": "K",
    "permissionKey": "piutang_obat_belum_lunas",
    "javaRef": "KeuanganPiutangObatBelumLunas",
    "tabel": "bayar_piutang",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek_kontra",
        "label": "Kd Rek Kontra",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diskon_piutang",
        "label": "Diskon Piutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_diskon_piutang",
        "label": "Kd Rek Diskon Piutang",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tidak_terbayar",
        "label": "Tidak Terbayar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_tidak_terbayar",
        "label": "Kd Rek Tidak Terbayar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_rkm_medis",
      "no_rawat",
      "kd_rek",
      "kd_rek_kontra",
      "catatan",
      "kd_rek_diskon_piutang"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-piutang-per-cara-bayar",
    "slug": "piutang-per-cara-bayar",
    "judul": "Piutang Per Cara Bayar",
    "kategori": "K",
    "permissionKey": "detail_piutang_penjab",
    "javaRef": "DlgPiutangPercaraBayar",
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
    "id": "btn-nilai-piutang-per-jenis-bayar-per-bulan",
    "slug": "nilai-piutang-per-jenis-bayar-per-bulan",
    "judul": "Nilai Piutang Per Cara Bayar Per Bulan",
    "kategori": "K",
    "permissionKey": "nilai_piutang_perjenis_bayar_per_bulan",
    "javaRef": "KeuanganNilaiPiutangPerJenisBayarPerBulan",
    "tabel": "detail_piutang_pasien",
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
        "nama": "kd_pj",
        "label": "Kd Pj",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "totalpiutang",
        "label": "Totalpiutang",
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
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tgltempo",
    "kolomCari": [
      "no_rawat",
      "nama_bayar",
      "kd_pj"
    ],
    "kolomUrut": "tgltempo",
    "kolomRingkasan": {
      "nama": "totalpiutang",
      "label": "Total Totalpiutang"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ringkasan-piutang-per-jenis-bayar",
    "slug": "ringkasan-piutang-per-jenis-bayar",
    "judul": "Ringkasan Piutang Per Cara Bayar",
    "kategori": "K",
    "permissionKey": "ringkasan_piutang_jenis_bayar",
    "javaRef": "KeuanganRingkasanPiutangPerJensBayar",
    "tabel": "detail_piutang_pasien",
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
        "nama": "kd_pj",
        "label": "Kd Pj",
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "totalpiutang",
        "label": "Totalpiutang",
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
        "tipe": "date"
      }
    ],
    "kolomTanggal": "tgltempo",
    "kolomCari": [
      "no_rawat",
      "nama_bayar",
      "kd_pj"
    ],
    "kolomUrut": "tgltempo",
    "kolomRingkasan": {
      "nama": "totalpiutang",
      "label": "Total Totalpiutang"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-penagihan-piutang-pasien",
    "slug": "penagihan-piutang-pasien",
    "judul": "Penagihan Piutang Pasien",
    "kategori": "K",
    "permissionKey": "penagihan_piutang_pasien",
    "javaRef": "KeuanganPenagihanPiutangPasien",
    "tabel": "penagihan_piutang",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No. Tagihan",
        "pk": true,
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
        "nama": "tanggaltempo",
        "label": "Tanggaltempo",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "tempo",
        "label": "Tempo",
        "tipe": "number"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "nip_menyetujui",
        "label": "Nip Menyetujui",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kd_pj",
        "label": "Kode Pj",
        "tipe": "text",
        "maks": 3,
        "wajib": true
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "proses penagihan",
          "sudah dibayar",
          "belum lunas"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "nip_menyetujui",
      "kd_pj",
      "catatan",
      "kd_rek"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-validasi-penagihan-piutang",
    "slug": "validasi-penagihan-piutang",
    "judul": "Validasi Penagihan Piutang",
    "kategori": "K",
    "permissionKey": "validasi_penagihan_piutang",
    "javaRef": "KeuanganValidasiPenagihanPiutang",
    "tabel": "penagihan_piutang",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
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
        "nama": "tanggaltempo",
        "label": "Tanggaltempo",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "tempo",
        "label": "Tempo",
        "wajib": true,
        "tipe": "number"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nip_menyetujui",
        "label": "Nip Menyetujui",
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kd_pj",
        "label": "Kd Pj",
        "wajib": true,
        "tipe": "text",
        "maks": 3
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Proses Penagihan",
          "Sudah Dibayar",
          "Belum Lunas"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "nip_menyetujui",
      "kd_pj",
      "catatan",
      "kd_rek"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rvp-piutang-bpjs",
    "slug": "rvp-piutang-bpjs",
    "judul": "RVP Piutang BPJS",
    "kategori": "K",
    "permissionKey": "rvu_bpjs",
    "javaRef": "KeuanganRVPBPJS",
    "tabel": "bayar_piutang",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_rawat",
        "label": "No Rawat",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek_kontra",
        "label": "Kd Rek Kontra",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "diskon_piutang",
        "label": "Diskon Piutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_diskon_piutang",
        "label": "Kd Rek Diskon Piutang",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "tidak_terbayar",
        "label": "Tidak Terbayar",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_tidak_terbayar",
        "label": "Kd Rek Tidak Terbayar",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_rkm_medis",
      "no_rawat",
      "kd_rek",
      "kd_rek_kontra",
      "catatan",
      "kd_rek_diskon_piutang"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-klaim-rawat-jalan",
    "slug": "klaim-rawat-jalan",
    "judul": "Klaim Rawat Jalan",
    "kategori": "K",
    "permissionKey": "klaim_rawat_jalan",
    "javaRef": "KeuanganKlaimRalan",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-piutang",
    "slug": "bayar-piutang",
    "judul": "Bayar Piutang",
    "kategori": "K",
    "permissionKey": "bayar_piutang",
    "javaRef": "DlgBayarPiutang",
    "tabel": "bayar_piutang",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl. Bayar",
        "pk": true,
        "tipe": "date",
        "wajib": true
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
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "tipe": "uang"
      },
      {
        "nama": "catatan",
        "label": "Catatan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "no_rawat",
        "label": "No. Rawat",
        "pk": true,
        "tipe": "text",
        "maks": 17,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek_kontra",
        "label": "Kode Rek Kontra",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "diskon_piutang",
        "label": "Diskon Piutang",
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_diskon_piutang",
        "label": "Kode Rek Diskon Piutang",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "tidak_terbayar",
        "label": "Tidak Terbayar",
        "tipe": "uang"
      },
      {
        "nama": "kd_rek_tidak_terbayar",
        "label": "Kode Rek Tidak Terbayar",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "tgl_bayar",
      "no_rkm_medis",
      "catatan",
      "no_rawat",
      "kd_rek",
      "kd_rek_kontra"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-omset-penerimaan",
    "slug": "omset-penerimaan",
    "judul": "Penerimaan/Omset/Kas Masuk",
    "kategori": "K",
    "permissionKey": "omset_penerimaan",
    "javaRef": "DlgOmsetPenerimaan",
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
    "id": "btn-pengembalian-deposit-pasien",
    "slug": "pengembalian-deposit-pasien",
    "judul": "Pengembalian Deposit Pasien",
    "kategori": "K",
    "permissionKey": "pengembalian_deposit_pasien",
    "javaRef": "DlgPengembalianDepositPasien",
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
    "id": "btn-pendapatan-per-cara-bayar",
    "slug": "pendapatan-per-cara-bayar",
    "judul": "Pendapatan Per Cara Bayar",
    "kategori": "K",
    "permissionKey": "pendapatan_per_carabayar",
    "javaRef": "DlgPendapatanPerCaraBayar",
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
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pembayaran-bank-jateng",
    "slug": "pembayaran-bank-jateng",
    "judul": "Pembayaran Bank Jateng",
    "kategori": "K",
    "permissionKey": "pembayaran_bank_jateng",
    "javaRef": "DlgLhtBankJateng",
    "tabel": "tagihan_bpd_jateng",
    "kolom": [
      {
        "nama": "no_nota",
        "label": "No Nota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
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
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "umurdaftar",
        "label": "Umurdaftar",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "status_lanjut",
        "label": "Status Lanjut",
        "tipe": "enum",
        "opsi": [
          "Ranap",
          "Ralan",
          "Jual Bebas",
          "Deposit",
          "Bayar Piutang"
        ]
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_nota",
      "no_rkm_medis",
      "nm_pasien",
      "alamat",
      "umurdaftar",
      "keterangan"
    ],
    "kolomUrut": "tgl_lahir",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-briva",
    "slug": "pembayaran-briva",
    "judul": "Pembayaran BRIVA",
    "kategori": "K",
    "permissionKey": "pembayaran_briva",
    "javaRef": "DlgLhtBRIVA",
    "tabel": "tagihan_briva",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "status_tagihan",
        "label": "Status Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ranap",
          "Ralan",
          "Jual Bebas",
          "Deposit",
          "Bayar Piutang"
        ]
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
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
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "tgl_closing",
        "label": "Tgl Closing",
        "tipe": "date"
      },
      {
        "nama": "status_bayar",
        "label": "Status Bayar",
        "tipe": "enum",
        "opsi": [
          "Sudah",
          "Pending"
        ]
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "status_tagihan",
      "no_tagihan",
      "no_rkm_medis",
      "nm_pasien",
      "alamat",
      "keterangan"
    ],
    "kolomUrut": "tgl_lahir",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-bank-papua",
    "slug": "pembayaran-bank-papua",
    "judul": "Pembayaran Bank Papua",
    "kategori": "K",
    "permissionKey": "pembayaran_bank_papua",
    "javaRef": "DlgLhtBankPapua",
    "tabel": "tagihan_bpd_papua",
    "kolom": [
      {
        "nama": "no_nota",
        "label": "No Nota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
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
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "umurdaftar",
        "label": "Umurdaftar",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "status_lanjut",
        "label": "Status Lanjut",
        "tipe": "enum",
        "opsi": [
          "Ranap",
          "Ralan",
          "Jual Bebas",
          "Deposit",
          "Bayar Piutang"
        ]
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_nota",
      "no_rkm_medis",
      "nm_pasien",
      "alamat",
      "umurdaftar",
      "keterangan"
    ],
    "kolomUrut": "tgl_lahir",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-bank-jabar",
    "slug": "pembayaran-bank-jabar",
    "judul": "Pembayaran Bank Jabar",
    "kategori": "K",
    "permissionKey": "pembayaran_bank_jabar",
    "javaRef": "DlgLhtBankJabar",
    "tabel": "tagihan_bpd_jabar",
    "kolom": [
      {
        "nama": "no_nota",
        "label": "No Nota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
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
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "umurdaftar",
        "label": "Umurdaftar",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 255
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "status_lanjut",
        "label": "Status Lanjut",
        "tipe": "enum",
        "opsi": [
          "Ranap",
          "Ralan",
          "Jual Bebas",
          "Deposit",
          "Bayar Piutang"
        ]
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_nota",
      "no_rkm_medis",
      "nm_pasien",
      "alamat",
      "umurdaftar",
      "keterangan"
    ],
    "kolomUrut": "tgl_lahir",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-bank-mandiri",
    "slug": "pembayaran-bank-mandiri",
    "judul": "Pembayaran Bank Mandiri",
    "kategori": "K",
    "permissionKey": "pembayaran_bank_mandiri",
    "javaRef": "DlgLhtBankMandiri",
    "tabel": "tagihan_mandiri",
    "kolom": [
      {
        "nama": "no_nota",
        "label": "No Nota",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_rkm_medis",
        "label": "No Rkm Medis",
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
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 200
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
        "nama": "tgl_lahir",
        "label": "Tgl Lahir",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "umurdaftar",
        "label": "Umurdaftar",
        "tipe": "text",
        "maks": 7
      },
      {
        "nama": "tgl_registrasi",
        "label": "Tgl Registrasi",
        "tipe": "date"
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "no_rawat",
        "label": "No Rawat",
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "no_id",
        "label": "No Id",
        "wajib": true,
        "tipe": "text",
        "maks": 17
      },
      {
        "nama": "status_lanjut",
        "label": "Status Lanjut",
        "tipe": "enum",
        "opsi": [
          "Ranap",
          "Ralan",
          "Jual Bebas",
          "Deposit",
          "Bayar Piutang"
        ]
      }
    ],
    "kolomTanggal": "tgl_lahir",
    "kolomCari": [
      "no_nota",
      "no_rkm_medis",
      "nm_pasien",
      "alamat",
      "umurdaftar",
      "no_rawat"
    ],
    "kolomUrut": "tgl_lahir",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pembayaran-pihak-ke3-bank-mandiri",
    "slug": "pembayaran-pihak-ke3-bank-mandiri",
    "judul": "Pembayaran Pihak Ke 3 Bank Mandiri",
    "kategori": "K",
    "permissionKey": "pembayaran_pihak_ke3_bankmandiri",
    "javaRef": "DlgLhtPembayaranPihakKe3BankMandiri",
    "tabel": "pembayaran_pihak_ke3_bankmandiri",
    "kolom": [
      {
        "nama": "nomor_pembayaran",
        "label": "Nomor Pembayaran",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_pembayaran",
        "label": "Tgl Pembayaran",
        "tipe": "datetime"
      },
      {
        "nama": "no_rekening_sumber",
        "label": "No Rekening Sumber",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_rekening_tujuan",
        "label": "No Rekening Tujuan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "atas_nama_rekening_tujuan",
        "label": "Atas Nama Rekening Tujuan",
        "tipe": "text",
        "maks": 60
      },
      {
        "nama": "kota_atas_nama_rekening_tujuan",
        "label": "Kota Atas Nama Rekening Tujuan",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "nominal_pembayaran",
        "label": "Nominal Pembayaran",
        "tipe": "uang"
      },
      {
        "nama": "nomor_tagihan",
        "label": "Nomor Tagihan",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "kode_metode",
        "label": "Kode Metode",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kode_bank",
        "label": "Kode Bank",
        "tipe": "text",
        "maks": 10
      },
      {
        "nama": "kode_transaksi",
        "label": "Kode Transaksi",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "asal_transaksi",
        "label": "Asal Transaksi",
        "tipe": "enum",
        "opsi": [
          "Bayar Pesan Obat/BHP",
          "Bayar Pesan Non Medis",
          "Bayar Pesan Aset/Inventaris",
          "Bayar Pesan Toko",
          "Bayar Pesan Dapur",
          "Pengeluaran Harian",
          "Bayar JM Dokter",
          "Bayar Beban Hutang Lain"
        ]
      }
    ],
    "kolomTanggal": "tgl_pembayaran",
    "kolomCari": [
      "nomor_pembayaran",
      "no_rekening_sumber",
      "no_rekening_tujuan",
      "atas_nama_rekening_tujuan",
      "kota_atas_nama_rekening_tujuan",
      "nomor_tagihan"
    ],
    "kolomUrut": "tgl_pembayaran",
    "kolomRingkasan": {
      "nama": "nominal_pembayaran",
      "label": "Total Nominal Pembayaran"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-ringkasan-hutang-vendor-farmasi",
    "slug": "ringkasan-hutang-vendor-farmasi",
    "judul": "Ringkasan Hutang Vendor Farmasi",
    "kategori": "K",
    "permissionKey": "ringkasan_hutang_vendor_farmasi",
    "javaRef": "KeuanganRingkasanHutangVendorFarmasi",
    "tabel": "bayar_pemesanan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hutang-obat",
    "slug": "hutang-obat",
    "judul": "Hutang Obat & BHP",
    "kategori": "K",
    "permissionKey": "hutang_obat",
    "javaRef": "KeuanganHutangObatBelumLunas",
    "tabel": "bayar_pemesanan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tagihan-hutang-obat",
    "slug": "tagihan-hutang-obat",
    "judul": "Titip Faktur/Tagihan Obat & BHP",
    "kategori": "K",
    "permissionKey": "tagihan_hutang_obat",
    "javaRef": "KeuanganTagihanObatBHP",
    "tabel": "titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-validasi-tagihan-obat-bhp",
    "slug": "validasi-tagihan-obat-bhp",
    "judul": "Validasi Titip Faktur/Tagihan Obat & BHP",
    "kategori": "K",
    "permissionKey": "validasi_tagihan_hutang_obat",
    "javaRef": "KeuanganValidasiTagihanObatBHP",
    "tabel": "titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btnbayar-pemesanan",
    "slug": "btnbayar-pemesanan",
    "judul": "Bayar Pesan Obat/BHP",
    "kategori": "K",
    "permissionKey": "bayar_pemesanan_obat",
    "javaRef": "KeuanganBayarPemesananFarmasi",
    "tabel": "pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_order",
        "label": "No. Order",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pesan",
        "label": "Tgl. Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl. Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl. Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "kd_bangsal",
        "label": "Kode Bangsal",
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah dibayar",
          "belum dibayar",
          "belum lunas",
          "titip faktur"
        ]
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "kd_bangsal",
      "status"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-hutang-vendor-barang-non-medis",
    "slug": "ringkasan-hutang-vendor-barang-non-medis",
    "judul": "Ringkasan Hutang Vendor Non Medis",
    "kategori": "K",
    "permissionKey": "ringkasan_hutang_vendor_nonmedis",
    "javaRef": "KeuanganRingkasanHutangVendorNonMedis",
    "tabel": "bayar_pemesanan_non_medis",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hutang-non-medis",
    "slug": "hutang-non-medis",
    "judul": "Hutang Non Medis",
    "kategori": "K",
    "permissionKey": "hutang_barang_non_medis",
    "javaRef": "KeuanganHutangNonMedisBelumLunas",
    "tabel": "bayar_pemesanan_non_medis",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tagihan-hutang-non-medis",
    "slug": "tagihan-hutang-non-medis",
    "judul": "Titip Faktur/Tagihan Non Medis",
    "kategori": "K",
    "permissionKey": "titip_faktur_non_medis",
    "javaRef": "KeuanganTagihanNonMedis",
    "tabel": "ipsrs_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-validasi-tagihan-non-medis",
    "slug": "validasi-tagihan-non-medis",
    "judul": "Validasi Titip Faktur/Tagihan Non Medis",
    "kategori": "K",
    "permissionKey": "validasi_tagihan_non_medis",
    "javaRef": "KeuanganValidasiTagihanNonMedis",
    "tabel": "ipsrs_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-pesan-non-medis",
    "slug": "bayar-pesan-non-medis",
    "judul": "Bayar Pesan Non Medis",
    "kategori": "K",
    "permissionKey": "bayar_pesan_non_medis",
    "javaRef": "KeuanganBayarPemesananNonMedis",
    "tabel": "ipsrspemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_order",
        "label": "No. Order",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pesan",
        "label": "Tgl. Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl. Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl. Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah dibayar",
          "belum dibayar",
          "belum lunas",
          "titip faktur"
        ]
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "status"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-hutang-aset-inventaris",
    "slug": "hutang-aset-inventaris",
    "judul": "Hutang Aset/Inventaris",
    "kategori": "K",
    "permissionKey": "hutang_aset_inventaris",
    "javaRef": "KeuanganHutangAsetIventarisBelumLunas",
    "tabel": "bayar_pemesanan_inventaris",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tagihan-hutang-aset",
    "slug": "tagihan-hutang-aset",
    "judul": "Titip Faktur/Tagihan Aset/Inventaris",
    "kategori": "K",
    "permissionKey": "titip_faktur_aset",
    "javaRef": "KeuanganTagihanAset",
    "tabel": "inventaris_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-validasi-tagihan-aset",
    "slug": "validasi-tagihan-aset",
    "judul": "Validasi Titip Faktur/Tagihan Aset/Inventaris",
    "kategori": "K",
    "permissionKey": "validasi_tagihan_aset",
    "javaRef": "KeuanganValidasiTagihanAset",
    "tabel": "inventaris_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-pemesanan-inventaris",
    "slug": "bayar-pemesanan-inventaris",
    "judul": "Bayar Pesan Aset/Inventaris",
    "kategori": "K",
    "permissionKey": "bayar_pemesanan_iventaris",
    "javaRef": "KeuanganBayarPemesananAset",
    "tabel": "inventaris_pemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_order",
        "label": "No. Order",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pesan",
        "label": "Tgl. Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl. Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl. Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah dibayar",
          "belum dibayar",
          "belum lunas",
          "titip faktur"
        ]
      },
      {
        "nama": "kd_rek_aset",
        "label": "Kode Rek Aset",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "status",
      "kd_rek_aset"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-ringkasan-hutang-vendor-barang-dapur",
    "slug": "ringkasan-hutang-vendor-barang-dapur",
    "judul": "Ringkasan Hutang Vendor Dapur",
    "kategori": "K",
    "permissionKey": "ringkasan_hutang_vendor_dapur",
    "javaRef": "KeuanganRingkasanHutangVendorDapur",
    "tabel": "bayar_pemesanan_dapur",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-hutang-dapur",
    "slug": "hutang-dapur",
    "judul": "Hutang Barang Dapur",
    "kategori": "K",
    "permissionKey": "hutang_dapur",
    "javaRef": "KeuanganHutangDapurBelumLunas",
    "tabel": "bayar_pemesanan_dapur",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-tagihan-hutang-dapur",
    "slug": "tagihan-hutang-dapur",
    "judul": "Titip Faktur/Tagihan Dapur",
    "kategori": "K",
    "permissionKey": "titip_faktur_dapur",
    "javaRef": "KeuanganTagihanDapur",
    "tabel": "dapur_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-validasi-tagihan-dapur",
    "slug": "validasi-tagihan-dapur",
    "judul": "Validasi Titip Faktur/Tagihan Dapur",
    "kategori": "K",
    "permissionKey": "validasi_tagihan_dapur",
    "javaRef": "KeuanganValidasiTagihanDapur",
    "tabel": "dapur_titip_faktur",
    "kolom": [
      {
        "nama": "no_tagihan",
        "label": "No Tagihan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Ditagihkan",
          "Dibayar"
        ]
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_tagihan",
      "nip",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-pesan-dapur",
    "slug": "bayar-pesan-dapur",
    "judul": "Bayar Pesan Dapur",
    "kategori": "K",
    "permissionKey": "bayar_pesan_dapur",
    "javaRef": "KeuanganBayarPemesananDapur",
    "tabel": "dapurpemesanan",
    "kolom": [
      {
        "nama": "no_faktur",
        "label": "No. Faktur",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_order",
        "label": "No. Order",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "kode_suplier",
        "label": "Kode Suplier",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_pesan",
        "label": "Tgl. Pesan",
        "tipe": "date"
      },
      {
        "nama": "tgl_faktur",
        "label": "Tgl. Faktur",
        "tipe": "date"
      },
      {
        "nama": "tgl_tempo",
        "label": "Tgl. Tempo",
        "tipe": "date"
      },
      {
        "nama": "total1",
        "label": "Total1",
        "tipe": "uang"
      },
      {
        "nama": "potongan",
        "label": "Potongan",
        "tipe": "uang"
      },
      {
        "nama": "total2",
        "label": "Total2",
        "tipe": "uang"
      },
      {
        "nama": "ppn",
        "label": "PPN",
        "tipe": "uang"
      },
      {
        "nama": "meterai",
        "label": "Meterai",
        "tipe": "number"
      },
      {
        "nama": "tagihan",
        "label": "Tagihan",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah dibayar",
          "belum dibayar",
          "belum lunas",
          "titip faktur"
        ]
      }
    ],
    "kolomTanggal": "tgl_pesan",
    "kolomCari": [
      "no_faktur",
      "no_order",
      "kode_suplier",
      "nip",
      "status"
    ],
    "kolomUrut": "tgl_pesan",
    "kolomRingkasan": {
      "nama": "total1",
      "label": "Total Total1"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-peminjam-piutang",
    "slug": "peminjam-piutang",
    "judul": "Peminjam Piutang",
    "kategori": "K",
    "permissionKey": "peminjam_piutang",
    "javaRef": "KeuanganPeminjamPiutang",
    "tabel": "peminjampiutang",
    "kolom": [
      {
        "nama": "kode_peminjam",
        "label": "Kode Peminjam",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "nama_peminjam",
        "label": "Nama Peminjam",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "no_telp",
        "label": "No. Telp",
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ],
        "wajib": true
      }
    ],
    "kolomCari": [
      "kode_peminjam",
      "nama_peminjam",
      "alamat",
      "no_telp",
      "kd_rek",
      "status"
    ],
    "kolomUrut": "kode_peminjam",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-piutang-lain-lain",
    "slug": "piutang-lain-lain",
    "judul": "Piutang Peminjaman Uang",
    "kategori": "K",
    "permissionKey": "piutang_lainlain",
    "javaRef": "KeuanganPiutangPeminjamanUang",
    "tabel": "piutang_lainlain",
    "kolom": [
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tgl_piutang",
        "label": "Tgl. Piutang",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_peminjam",
        "label": "Kode Peminjam",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
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
        "nama": "tgltempo",
        "label": "Tgltempo",
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "nominal",
        "label": "Nominal",
        "tipe": "uang"
      },
      {
        "nama": "sisapiutang",
        "label": "Sisapiutang",
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "sudah lunas",
          "belum lunas"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_piutang",
    "kolomCari": [
      "nota_piutang",
      "nip",
      "kode_peminjam",
      "kd_rek",
      "nama_bayar",
      "keterangan"
    ],
    "kolomUrut": "tgl_piutang",
    "kolomRingkasan": {
      "nama": "nominal",
      "label": "Total Nominal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-piutang-peminjaman-uang-belum-lunas",
    "slug": "piutang-peminjaman-uang-belum-lunas",
    "judul": "Piutang Peminjaman Uang Belum Lunas",
    "kategori": "K",
    "permissionKey": "piutang_peminjaman_uang_belum_lunas",
    "javaRef": "KeuanganPiutangPeminjamanUangBelumLunas",
    "tabel": "bayar_piutang_lainlain",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "kode_peminjam",
        "label": "Kode Peminjam",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "kode_peminjam",
      "nota_piutang",
      "kd_rek",
      "nama_bayar",
      "keterangan"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bayar-piutang-lain-lain",
    "slug": "bayar-piutang-lain-lain",
    "judul": "Bayar Piutang Peminjaman Uang",
    "kategori": "K",
    "permissionKey": "bayar_piutang_lain",
    "javaRef": "KeuanganBayarPiutangPeminjamanUang",
    "tabel": "bayar_piutang_lainlain",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl. Bayar",
        "pk": true,
        "tipe": "date",
        "wajib": true
      },
      {
        "nama": "kode_peminjam",
        "label": "Kode Peminjam",
        "pk": true,
        "tipe": "text",
        "maks": 5,
        "wajib": true
      },
      {
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100,
        "wajib": true
      },
      {
        "nama": "nota_piutang",
        "label": "Nota Piutang",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "kd_rek",
        "label": "Kode Rek",
        "pk": true,
        "tipe": "text",
        "maks": 15,
        "wajib": true
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "pk": true,
        "tipe": "text",
        "maks": 50,
        "wajib": true
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "tgl_bayar",
      "kode_peminjam",
      "keterangan",
      "nota_piutang",
      "kd_rek",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pemberi-hutang-lain",
    "slug": "pemberi-hutang-lain",
    "judul": "Pemberi Hutang Lain",
    "kategori": "K",
    "permissionKey": "pemberi_hutang_lain",
    "javaRef": "KeuanganPemberiHutangLain",
    "tabel": "pemberi_hutang_lain",
    "kolom": [
      {
        "nama": "kode_pemberi_hutang",
        "label": "Kode Pemberi Hutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "nama_pemberi_hutang",
        "label": "Nama Pemberi Hutang",
        "tipe": "text",
        "maks": 50
      },
      {
        "nama": "alamat",
        "label": "Alamat",
        "tipe": "text",
        "maks": 150
      },
      {
        "nama": "no_telp",
        "label": "No Telp",
        "tipe": "text",
        "maks": 13
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "tipe": "text",
        "maks": 15
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
      "kode_pemberi_hutang",
      "nama_pemberi_hutang",
      "alamat",
      "no_telp",
      "kd_rek"
    ],
    "kolomUrut": "kode_pemberi_hutang",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-beban-hutang-lain",
    "slug": "beban-hutang-lain",
    "judul": "Beban Hutang Lain",
    "kategori": "K",
    "permissionKey": "beban_hutang_lain",
    "javaRef": "KeuanganBebanHutangLain",
    "tabel": "beban_hutang_lain",
    "kolom": [
      {
        "nama": "no_hutang",
        "label": "No Hutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "tgl_hutang",
        "label": "Tgl Hutang",
        "tipe": "date"
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "kode_pemberi_hutang",
        "label": "Kode Pemberi Hutang",
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tgltempo",
        "label": "Tgltempo",
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "nominal",
        "label": "Nominal",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "sisahutang",
        "label": "Sisahutang",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "status",
        "label": "Status",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Sudah Lunas",
          "Belum Lunas"
        ]
      }
    ],
    "kolomTanggal": "tgl_hutang",
    "kolomCari": [
      "no_hutang",
      "nip",
      "kode_pemberi_hutang",
      "kd_rek",
      "keterangan"
    ],
    "kolomUrut": "tgl_hutang",
    "kolomRingkasan": {
      "nama": "nominal",
      "label": "Total Nominal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-beban-hutang-lain",
    "slug": "bayar-beban-hutang-lain",
    "judul": "Bayar Beban Hutang Lain",
    "kategori": "K",
    "permissionKey": "bayar_beban_hutang_lain",
    "javaRef": "KeuanganBayarBebanHutangLain",
    "tabel": "bayar_beban_hutang_lain",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
      },
      {
        "nama": "kode_pemberi_hutang",
        "label": "Kode Pemberi Hutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 5
      },
      {
        "nama": "no_hutang",
        "label": "No Hutang",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
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
        "nama": "besar_cicilan",
        "label": "Besar Cicilan",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "no_bukti",
        "label": "No Bukti",
        "wajib": true,
        "tipe": "text",
        "maks": 30
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "kode_pemberi_hutang",
      "no_hutang",
      "kd_rek",
      "nama_bayar",
      "keterangan",
      "no_bukti"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_cicilan",
      "label": "Total Besar Cicilan"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-bayar-jm-dokter",
    "slug": "bayar-jm-dokter",
    "judul": "Bayar JM Dokter",
    "kategori": "K",
    "permissionKey": "bayar_jm_dokter",
    "javaRef": "KeuanganBayarJMDokter",
    "tabel": "bayar_jm_dokter",
    "kolom": [
      {
        "nama": "no_bayar",
        "label": "No. Bayar",
        "pk": true,
        "tipe": "text",
        "maks": 30,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date"
      },
      {
        "nama": "kd_dokter",
        "label": "Kode Dokter",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50,
        "wajib": true
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "rawatjalan",
        "label": "Rawatjalan",
        "tipe": "number"
      },
      {
        "nama": "rawatinap",
        "label": "Rawatinap",
        "tipe": "number"
      },
      {
        "nama": "labrawatjalan",
        "label": "Labrawatjalan",
        "tipe": "number"
      },
      {
        "nama": "labrawatinap",
        "label": "Labrawatinap",
        "tipe": "number"
      },
      {
        "nama": "radrawatjalan",
        "label": "Radrawatjalan",
        "tipe": "number"
      },
      {
        "nama": "radrawatinap",
        "label": "Radrawatinap",
        "tipe": "number"
      },
      {
        "nama": "operasiralan",
        "label": "Operasiralan",
        "tipe": "number"
      },
      {
        "nama": "operasiranap",
        "label": "Operasiranap",
        "tipe": "number"
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_bayar",
      "kd_dokter",
      "nama_bayar",
      "keterangan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-pengajuan-biaya-kuangan",
    "slug": "pengajuan-biaya-kuangan",
    "judul": "Pengajuan Biaya",
    "kategori": "K",
    "permissionKey": "pengajuan_biaya",
    "javaRef": "KeuanganPengajuanBiaya",
    "tabel": "pengajuan_biaya",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No. Pengajuan",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "tanggal",
        "label": "Tanggal",
        "tipe": "date",
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
        "nama": "urgensi",
        "label": "Urgensi",
        "tipe": "enum",
        "opsi": [
          "cito",
          "emergensi",
          "biasa"
        ],
        "wajib": true
      },
      {
        "nama": "uraian_latar_belakang",
        "label": "Uraian Latar Belakang",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "tujuan_pengajuan",
        "label": "Tujuan Pengajuan",
        "tipe": "text",
        "maks": 200,
        "wajib": true
      },
      {
        "nama": "target_sasaran",
        "label": "Target Sasaran",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "lokasi_kegiatan",
        "label": "Lokasi Kegiatan",
        "tipe": "text",
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
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
        "maks": 70,
        "wajib": true
      },
      {
        "nama": "nik_pj",
        "label": "NIK Pj",
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "status",
        "label": "Status",
        "tipe": "enum",
        "opsi": [
          "proses pengajuan",
          "disetujui",
          "ditolak",
          "divalidasi"
        ],
        "wajib": true
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "urgensi",
      "uraian_latar_belakang",
      "tujuan_pengajuan",
      "target_sasaran"
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
    "id": "btn-persetujuan-pengajuan-biaya",
    "slug": "persetujuan-pengajuan-biaya",
    "judul": "Persetujuan Pengajuan Biaya",
    "kategori": "K",
    "permissionKey": "persetujuan_pengajuan_biaya",
    "javaRef": "KeuanganPersetujuanPengajuanBiaya",
    "tabel": "pengajuan_biaya",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No Pengajuan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
      },
      {
        "nama": "urgensi",
        "label": "Urgensi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Cito",
          "Emergensi",
          "Biasa"
        ]
      },
      {
        "nama": "uraian_latar_belakang",
        "label": "Uraian Latar Belakang",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tujuan_pengajuan",
        "label": "Tujuan Pengajuan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "target_sasaran",
        "label": "Target Sasaran",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "lokasi_kegiatan",
        "label": "Lokasi Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
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
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "uraian_latar_belakang",
      "tujuan_pengajuan",
      "target_sasaran",
      "lokasi_kegiatan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-validasi-persetujuan-pengajuan-biaya",
    "slug": "validasi-persetujuan-pengajuan-biaya",
    "judul": "Validasi Persetujuan Pengajuan Biaya",
    "kategori": "K",
    "permissionKey": "validasi_persetujuan_pengajuan_biaya",
    "javaRef": "KeuanganValidasiPersetujuanPengajuanBiaya",
    "tabel": "pengajuan_biaya",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No Pengajuan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
      },
      {
        "nama": "urgensi",
        "label": "Urgensi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Cito",
          "Emergensi",
          "Biasa"
        ]
      },
      {
        "nama": "uraian_latar_belakang",
        "label": "Uraian Latar Belakang",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tujuan_pengajuan",
        "label": "Tujuan Pengajuan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "target_sasaran",
        "label": "Target Sasaran",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "lokasi_kegiatan",
        "label": "Lokasi Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
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
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "uraian_latar_belakang",
      "tujuan_pengajuan",
      "target_sasaran",
      "lokasi_kegiatan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-rekap-pengajuan-biaya",
    "slug": "rekap-pengajuan-biaya",
    "judul": "Rekap Pengajuan Biaya",
    "kategori": "K",
    "permissionKey": "rekap_pengajuan_biaya",
    "javaRef": "KeuanganRekapPengajuanBiaya",
    "tabel": "pengajuan_biaya",
    "kolom": [
      {
        "nama": "no_pengajuan",
        "label": "No Pengajuan",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
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
      },
      {
        "nama": "urgensi",
        "label": "Urgensi",
        "wajib": true,
        "tipe": "enum",
        "opsi": [
          "Cito",
          "Emergensi",
          "Biasa"
        ]
      },
      {
        "nama": "uraian_latar_belakang",
        "label": "Uraian Latar Belakang",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "tujuan_pengajuan",
        "label": "Tujuan Pengajuan",
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "target_sasaran",
        "label": "Target Sasaran",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "lokasi_kegiatan",
        "label": "Lokasi Kegiatan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      },
      {
        "nama": "jumlah",
        "label": "Jumlah",
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
        "nama": "total",
        "label": "Total",
        "wajib": true,
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "wajib": true,
        "tipe": "text",
        "maks": 70
      }
    ],
    "kolomTanggal": "tanggal",
    "kolomCari": [
      "no_pengajuan",
      "nik",
      "uraian_latar_belakang",
      "tujuan_pengajuan",
      "target_sasaran",
      "lokasi_kegiatan"
    ],
    "kolomUrut": "tanggal",
    "kolomRingkasan": {
      "nama": "harga",
      "label": "Total Harga"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-pengeluaran-pengeluaran",
    "slug": "pengeluaran-pengeluaran",
    "judul": "Pengeluaran-pengeluaran/Kas Keluar",
    "kategori": "K",
    "permissionKey": "pengeluaran_pengeluaran",
    "javaRef": "DlgPengeluaranPengeluaran",
    "tabel": "bayar_pemesanan",
    "kolom": [
      {
        "nama": "tgl_bayar",
        "label": "Tgl Bayar",
        "pk": true,
        "wajib": true,
        "tipe": "date"
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
        "nama": "no_bukti",
        "label": "No Bukti",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "nip",
        "label": "Nip",
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "besar_bayar",
        "label": "Besar Bayar",
        "tipe": "uang"
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "nama_bayar",
        "label": "Nama Bayar",
        "tipe": "text",
        "maks": 50
      }
    ],
    "kolomTanggal": "tgl_bayar",
    "kolomCari": [
      "no_faktur",
      "no_bukti",
      "nip",
      "keterangan",
      "nama_bayar"
    ],
    "kolomUrut": "tgl_bayar",
    "kolomRingkasan": {
      "nama": "besar_bayar",
      "label": "Total Besar Bayar"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-posting-jurnal",
    "slug": "posting-jurnal",
    "judul": "Posting Jurnal",
    "kategori": "K",
    "permissionKey": "posting_jurnal",
    "javaRef": "DlgJurnal",
    "tabel": "jurnal",
    "kolom": [
      {
        "nama": "no_jurnal",
        "label": "No. Jurnal",
        "pk": true,
        "tipe": "text",
        "maks": 20,
        "wajib": true
      },
      {
        "nama": "no_bukti",
        "label": "No. Bukti",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_jurnal",
        "label": "Tgl. Jurnal",
        "tipe": "date"
      },
      {
        "nama": "jam_jurnal",
        "label": "Jam Jurnal",
        "tipe": "time",
        "wajib": true
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "u",
          "p"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 350
      }
    ],
    "kolomTanggal": "tgl_jurnal",
    "kolomCari": [
      "no_jurnal",
      "no_bukti",
      "jenis",
      "keterangan"
    ],
    "kolomUrut": "tgl_jurnal",
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  },
  {
    "id": "btn-jurnal-harian",
    "slug": "jurnal-harian",
    "judul": "Jurnal Harian",
    "kategori": "K",
    "permissionKey": "jurnal_harian",
    "javaRef": "DlgJurnalHarian",
    "tabel": "rekening",
    "kolom": [
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "nm_rek",
        "label": "Nm Rek",
        "tipe": "text",
        "maks": 100
      },
      {
        "nama": "tipe",
        "label": "Tipe",
        "tipe": "enum",
        "opsi": [
          "N",
          "M",
          "R"
        ]
      },
      {
        "nama": "balance",
        "label": "Balance",
        "tipe": "enum",
        "opsi": [
          "D",
          "K"
        ]
      },
      {
        "nama": "level",
        "label": "Level",
        "tipe": "enum",
        "opsi": [
          "0",
          "1"
        ]
      }
    ],
    "kolomCari": [
      "kd_rek",
      "nm_rek"
    ],
    "kolomUrut": "kd_rek",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-bubes",
    "slug": "bubes",
    "judul": "Buku Besar",
    "kategori": "K",
    "permissionKey": "buku_besar",
    "javaRef": "KeuanganBubes",
    "tabel": "rekeningtahun",
    "kolom": [
      {
        "nama": "thn",
        "label": "Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "saldo_awal",
        "label": "Saldo Awal",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "thn",
      "kd_rek"
    ],
    "kolomUrut": "thn",
    "kolomRingkasan": {
      "nama": "saldo_awal",
      "label": "Total Saldo Awal"
    },
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-cash-flow",
    "slug": "cash-flow",
    "judul": "Cash Flow",
    "kategori": "K",
    "permissionKey": "cashflow",
    "javaRef": "DlgCashflow",
    "tabel": "jurnal",
    "kolom": [
      {
        "nama": "no_jurnal",
        "label": "No Jurnal",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 20
      },
      {
        "nama": "no_bukti",
        "label": "No Bukti",
        "tipe": "text",
        "maks": 30
      },
      {
        "nama": "tgl_jurnal",
        "label": "Tgl Jurnal",
        "tipe": "date"
      },
      {
        "nama": "jam_jurnal",
        "label": "Jam Jurnal",
        "wajib": true,
        "tipe": "time"
      },
      {
        "nama": "jenis",
        "label": "Jenis",
        "tipe": "enum",
        "opsi": [
          "U",
          "P"
        ]
      },
      {
        "nama": "keterangan",
        "label": "Keterangan",
        "tipe": "text",
        "maks": 350
      }
    ],
    "kolomTanggal": "tgl_jurnal",
    "kolomCari": [
      "no_jurnal",
      "no_bukti",
      "keterangan"
    ],
    "kolomUrut": "tgl_jurnal",
    "bisaTambah": false,
    "bisaUbah": false,
    "bisaHapus": false
  },
  {
    "id": "btn-laba-rugi",
    "slug": "laba-rugi",
    "judul": "Keuangan",
    "kategori": "K",
    "permissionKey": "keuangan",
    "javaRef": "DlgLabaRugi",
    "tabel": "rekeningtahun",
    "kolom": [
      {
        "nama": "thn",
        "label": "Thn",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 200
      },
      {
        "nama": "kd_rek",
        "label": "Kd Rek",
        "pk": true,
        "wajib": true,
        "tipe": "text",
        "maks": 15
      },
      {
        "nama": "saldo_awal",
        "label": "Saldo Awal",
        "wajib": true,
        "tipe": "uang"
      }
    ],
    "kolomCari": [
      "thn",
      "kd_rek"
    ],
    "kolomUrut": "thn",
    "kolomRingkasan": {
      "nama": "saldo_awal",
      "label": "Total Saldo Awal"
    },
    "bisaTambah": true,
    "bisaUbah": true,
    "bisaHapus": true
  }
];

export const PETA_KATALOG_KEUANGAN: ReadonlyMap<string, DefinisiModulKatalog> = new Map(
  KATALOG_KEUANGAN.map((item) => [item.slug, item]),
);

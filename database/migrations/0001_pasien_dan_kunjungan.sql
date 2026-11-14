-- Skema mandiri untuk data pasien dan pendaftaran/kunjungan.
-- Jalankan pada database tujuan yang kosong. Database sumber Khanza tidak diubah.

SET NAMES utf8mb4;

CREATE TABLE jenis_kelamin (
    kode VARCHAR(16) PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi jenis kelamin';

CREATE TABLE golongan_darah (
    kode VARCHAR(16) PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi golongan darah';

CREATE TABLE status_perkawinan (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi status perkawinan';

CREATE TABLE pendidikan (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi tingkat pendidikan';

CREATE TABLE hubungan_keluarga (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi hubungan keluarga dan penanggung jawab';

CREATE TABLE jenis_pelayanan (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi jenis pelayanan kunjungan';

CREATE TABLE status_kunjungan (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    status_akhir BOOLEAN NOT NULL DEFAULT FALSE,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi status operasional kunjungan';

CREATE TABLE status_pembayaran (
    kode VARCHAR(32) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    status_lunas BOOLEAN NOT NULL DEFAULT FALSE,
    urutan SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Referensi status pembayaran kunjungan';

CREATE TABLE wilayah (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    induk_id BIGINT UNSIGNED NULL,
    jenis VARCHAR(16) NOT NULL,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_wilayah_jenis_kode (jenis, kode),
    KEY indeks_wilayah_induk (induk_id),
    KEY indeks_wilayah_nama (nama),

    CONSTRAINT rel_wilayah_induk
        FOREIGN KEY (induk_id) REFERENCES wilayah(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master wilayah berjenjang: provinsi, kabupaten, kecamatan, dan kelurahan';

CREATE TABLE suku (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE KEY unik_suku_kode (kode),
    KEY indeks_suku_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master suku pasien';

CREATE TABLE bahasa (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE KEY unik_bahasa_kode (kode),
    KEY indeks_bahasa_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master bahasa pasien';

CREATE TABLE keterbatasan_fisik (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE KEY unik_keterbatasan_kode (kode),
    KEY indeks_keterbatasan_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master keterbatasan fisik pasien';

CREATE TABLE perusahaan (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    alamat VARCHAR(255) NULL,
    kota VARCHAR(100) NULL,
    nomor_telepon VARCHAR(30) NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE KEY unik_perusahaan_kode (kode),
    KEY indeks_perusahaan_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master perusahaan atau instansi pasien';

CREATE TABLE dokter (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    nomor_izin_praktik VARCHAR(150) NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_dokter_kode (kode),
    KEY indeks_dokter_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master dokter';

CREATE TABLE unit_pelayanan (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    kode_jenis_pelayanan VARCHAR(32) NOT NULL,
    tarif_pasien_baru DECIMAL(15,2) NOT NULL DEFAULT 0,
    tarif_pasien_lama DECIMAL(15,2) NOT NULL DEFAULT 0,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_unit_pelayanan_kode (kode),
    KEY indeks_unit_pelayanan_nama (nama),

    CONSTRAINT rel_unit_jenis_pelayanan
        FOREIGN KEY (kode_jenis_pelayanan) REFERENCES jenis_pelayanan(kode)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master unit pelayanan, termasuk poli dan IGD';

CREATE TABLE penjamin (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    nama_perusahaan VARCHAR(150) NULL,
    alamat VARCHAR(255) NULL,
    nomor_telepon VARCHAR(30) NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_penjamin_kode (kode),
    KEY indeks_penjamin_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Master penjamin pasien dan kunjungan';

CREATE TABLE pasien (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nomor_rekam_medis VARCHAR(32) NOT NULL,
    nama_lengkap VARCHAR(150) NULL,
    kode_jenis_kelamin VARCHAR(16) NULL,
    tempat_lahir VARCHAR(100) NULL,
    tanggal_lahir DATE NULL,
    nama_ibu VARCHAR(150) NULL,
    kode_golongan_darah VARCHAR(16) NULL,
    kode_status_perkawinan VARCHAR(32) NULL,
    kode_pendidikan VARCHAR(32) NULL,
    agama VARCHAR(50) NULL,
    pekerjaan VARCHAR(150) NULL,
    nomor_telepon VARCHAR(30) NULL,
    alamat_email VARCHAR(254) NULL,
    tanggal_terdaftar DATE NULL,
    suku_id BIGINT UNSIGNED NULL,
    bahasa_id BIGINT UNSIGNED NULL,
    keterbatasan_fisik_id BIGINT UNSIGNED NULL,
    perusahaan_id BIGINT UNSIGNED NULL,
    tanggal_meninggal DATETIME NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    versi_data BIGINT UNSIGNED NOT NULL DEFAULT 1,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_pasien_nomor_rm (nomor_rekam_medis),
    KEY indeks_pasien_nama (nama_lengkap),
    KEY indeks_pasien_tanggal_lahir (tanggal_lahir),
    KEY indeks_pasien_telepon (nomor_telepon),
    KEY indeks_pasien_suku (suku_id),
    KEY indeks_pasien_bahasa (bahasa_id),
    KEY indeks_pasien_keterbatasan (keterbatasan_fisik_id),
    KEY indeks_pasien_perusahaan (perusahaan_id),

    CONSTRAINT rel_pasien_jenis_kelamin
        FOREIGN KEY (kode_jenis_kelamin) REFERENCES jenis_kelamin(kode),
    CONSTRAINT rel_pasien_golongan_darah
        FOREIGN KEY (kode_golongan_darah) REFERENCES golongan_darah(kode),
    CONSTRAINT rel_pasien_status_perkawinan
        FOREIGN KEY (kode_status_perkawinan) REFERENCES status_perkawinan(kode),
    CONSTRAINT rel_pasien_pendidikan
        FOREIGN KEY (kode_pendidikan) REFERENCES pendidikan(kode),
    CONSTRAINT rel_pasien_suku
        FOREIGN KEY (suku_id) REFERENCES suku(id),
    CONSTRAINT rel_pasien_bahasa
        FOREIGN KEY (bahasa_id) REFERENCES bahasa(id),
    CONSTRAINT rel_pasien_keterbatasan
        FOREIGN KEY (keterbatasan_fisik_id) REFERENCES keterbatasan_fisik(id),
    CONSTRAINT rel_pasien_perusahaan
        FOREIGN KEY (perusahaan_id) REFERENCES perusahaan(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tabel induk pasien';

CREATE TABLE pasien_identitas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pasien_id BIGINT UNSIGNED NOT NULL,
    jenis_identitas VARCHAR(32) NOT NULL,
    nomor_identitas VARCHAR(100) NOT NULL,
    nomor_normalisasi VARCHAR(100) NULL,
    penerbit VARCHAR(100) NULL,
    terverifikasi BOOLEAN NOT NULL DEFAULT FALSE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_pasien_identitas (pasien_id, jenis_identitas, nomor_identitas),
    KEY indeks_identitas_pencarian (jenis_identitas, nomor_normalisasi),

    CONSTRAINT rel_identitas_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Nomor identitas milik pasien';

CREATE TABLE pasien_alamat (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pasien_id BIGINT UNSIGNED NOT NULL,
    jenis_alamat VARCHAR(32) NOT NULL,
    alamat_lengkap VARCHAR(255) NULL,
    rt VARCHAR(3) NULL,
    rw VARCHAR(3) NULL,
    provinsi_id BIGINT UNSIGNED NULL,
    kabupaten_id BIGINT UNSIGNED NULL,
    kecamatan_id BIGINT UNSIGNED NULL,
    kelurahan_id BIGINT UNSIGNED NULL,
    kode_pos VARCHAR(10) NULL,
    alamat_utama BOOLEAN NOT NULL DEFAULT FALSE,
    berlaku_mulai DATE NULL,
    berlaku_sampai DATE NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY indeks_alamat_pasien (pasien_id),
    KEY indeks_alamat_provinsi (provinsi_id),
    KEY indeks_alamat_kabupaten (kabupaten_id),
    KEY indeks_alamat_kecamatan (kecamatan_id),
    KEY indeks_alamat_kelurahan (kelurahan_id),

    CONSTRAINT rel_alamat_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id) ON DELETE RESTRICT,
    CONSTRAINT rel_alamat_provinsi
        FOREIGN KEY (provinsi_id) REFERENCES wilayah(id) ON DELETE RESTRICT,
    CONSTRAINT rel_alamat_kabupaten
        FOREIGN KEY (kabupaten_id) REFERENCES wilayah(id) ON DELETE RESTRICT,
    CONSTRAINT rel_alamat_kecamatan
        FOREIGN KEY (kecamatan_id) REFERENCES wilayah(id) ON DELETE RESTRICT,
    CONSTRAINT rel_alamat_kelurahan
        FOREIGN KEY (kelurahan_id) REFERENCES wilayah(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Alamat milik pasien';

CREATE TABLE pasien_kontak (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pasien_id BIGINT UNSIGNED NOT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    kode_hubungan VARCHAR(32) NULL,
    nomor_telepon VARCHAR(30) NULL,
    alamat_lengkap VARCHAR(255) NULL,
    pekerjaan VARCHAR(150) NULL,
    kontak_darurat BOOLEAN NOT NULL DEFAULT FALSE,
    penanggung_jawab_keuangan BOOLEAN NOT NULL DEFAULT FALSE,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY indeks_kontak_pasien (pasien_id),

    CONSTRAINT rel_kontak_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id) ON DELETE RESTRICT,
    CONSTRAINT rel_kontak_hubungan
        FOREIGN KEY (kode_hubungan) REFERENCES hubungan_keluarga(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Kontak keluarga dan penanggung jawab umum pasien';

CREATE TABLE pasien_penjamin (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pasien_id BIGINT UNSIGNED NOT NULL,
    penjamin_id BIGINT UNSIGNED NOT NULL,
    nomor_peserta VARCHAR(100) NULL,
    urutan_prioritas SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    berlaku_mulai DATE NULL,
    berlaku_sampai DATE NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_pasien_penjamin (pasien_id, penjamin_id, nomor_peserta),
    KEY indeks_penjamin_nomor_peserta (nomor_peserta),

    CONSTRAINT rel_pasien_penjamin_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id) ON DELETE RESTRICT,
    CONSTRAINT rel_pasien_penjamin_master
        FOREIGN KEY (penjamin_id) REFERENCES penjamin(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Kepesertaan penjamin milik pasien';

CREATE TABLE pasien_afiliasi (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pasien_id BIGINT UNSIGNED NOT NULL,
    jenis_afiliasi VARCHAR(32) NOT NULL,
    nomor_anggota VARCHAR(100) NULL,
    golongan VARCHAR(100) NULL,
    pangkat VARCHAR(100) NULL,
    satuan VARCHAR(150) NULL,
    jabatan VARCHAR(150) NULL,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_pasien_afiliasi (pasien_id, jenis_afiliasi),

    CONSTRAINT rel_afiliasi_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Afiliasi pasien seperti TNI atau POLRI';

CREATE TABLE kunjungan (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nomor_kunjungan VARCHAR(40) NOT NULL,
    pasien_id BIGINT UNSIGNED NOT NULL,
    waktu_pendaftaran DATETIME NOT NULL,
    unit_pelayanan_id BIGINT UNSIGNED NOT NULL,
    dokter_id BIGINT UNSIGNED NULL,
    penjamin_id BIGINT UNSIGNED NOT NULL,
    kode_jenis_pelayanan VARCHAR(32) NOT NULL,
    kode_status_kunjungan VARCHAR(32) NOT NULL,
    kode_status_pembayaran VARCHAR(32) NOT NULL,
    nomor_antrean INT UNSIGNED NULL,
    biaya_pendaftaran DECIMAL(15,2) NOT NULL DEFAULT 0,
    pasien_baru BOOLEAN NOT NULL DEFAULT FALSE,
    baru_di_unit BOOLEAN NOT NULL DEFAULT FALSE,
    umur_saat_daftar SMALLINT UNSIGNED NULL,
    satuan_umur VARCHAR(8) NULL,
    dibatalkan_pada DATETIME NULL,
    alasan_pembatalan VARCHAR(255) NULL,
    versi_data BIGINT UNSIGNED NOT NULL DEFAULT 1,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unik_kunjungan_nomor (nomor_kunjungan),
    KEY indeks_kunjungan_pasien (pasien_id, waktu_pendaftaran),
    KEY indeks_kunjungan_unit (unit_pelayanan_id, waktu_pendaftaran),
    KEY indeks_kunjungan_dokter (dokter_id, waktu_pendaftaran),
    KEY indeks_kunjungan_status (kode_status_kunjungan, waktu_pendaftaran),
    KEY indeks_kunjungan_pembayaran (kode_status_pembayaran, waktu_pendaftaran),

    CONSTRAINT rel_kunjungan_pasien
        FOREIGN KEY (pasien_id) REFERENCES pasien(id) ON DELETE RESTRICT,
    CONSTRAINT rel_kunjungan_unit
        FOREIGN KEY (unit_pelayanan_id) REFERENCES unit_pelayanan(id),
    CONSTRAINT rel_kunjungan_dokter
        FOREIGN KEY (dokter_id) REFERENCES dokter(id),
    CONSTRAINT rel_kunjungan_penjamin
        FOREIGN KEY (penjamin_id) REFERENCES penjamin(id),
    CONSTRAINT rel_kunjungan_jenis_pelayanan
        FOREIGN KEY (kode_jenis_pelayanan) REFERENCES jenis_pelayanan(kode),
    CONSTRAINT rel_kunjungan_status
        FOREIGN KEY (kode_status_kunjungan) REFERENCES status_kunjungan(kode),
    CONSTRAINT rel_kunjungan_pembayaran
        FOREIGN KEY (kode_status_pembayaran) REFERENCES status_pembayaran(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tabel induk pendaftaran dan kunjungan pasien';

CREATE TABLE kunjungan_penanggung_jawab (
    kunjungan_id BIGINT UNSIGNED PRIMARY KEY,
    nama_lengkap VARCHAR(150) NULL,
    kode_hubungan VARCHAR(32) NULL,
    alamat_lengkap VARCHAR(255) NULL,
    nomor_telepon VARCHAR(30) NULL,
    pekerjaan VARCHAR(150) NULL,

    CONSTRAINT rel_pj_kunjungan
        FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(id) ON DELETE RESTRICT,
    CONSTRAINT rel_pj_hubungan
        FOREIGN KEY (kode_hubungan) REFERENCES hubungan_keluarga(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Snapshot penanggung jawab pada saat kunjungan';

CREATE TABLE kunjungan_rujukan (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kunjungan_id BIGINT UNSIGNED NOT NULL,
    jenis_rujukan VARCHAR(32) NOT NULL,
    nama_perujuk VARCHAR(150) NULL,
    dokter_perujuk VARCHAR(150) NULL,
    nomor_rujukan VARCHAR(100) NULL,
    nomor_balasan VARCHAR(100) NULL,
    tanggal_rujukan DATE NULL,
    keterangan VARCHAR(500) NULL,
    biaya_perujuk DECIMAL(15,2) NOT NULL DEFAULT 0,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY indeks_rujukan_kunjungan (kunjungan_id),
    KEY indeks_rujukan_nomor (nomor_rujukan),
    UNIQUE KEY unik_rujukan_kunjungan_jenis (kunjungan_id, jenis_rujukan),

    CONSTRAINT rel_rujukan_kunjungan
        FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Rujukan yang terkait dengan kunjungan';

CREATE TABLE kunjungan_riwayat_status (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kunjungan_id BIGINT UNSIGNED NOT NULL,
    kode_status VARCHAR(32) NOT NULL,
    waktu_perubahan DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pengguna_id BIGINT UNSIGNED NULL,
    alasan VARCHAR(255) NULL,

    KEY indeks_riwayat_kunjungan (kunjungan_id, waktu_perubahan),
    UNIQUE KEY unik_riwayat_status_waktu (kunjungan_id, kode_status, waktu_perubahan),

    CONSTRAINT rel_riwayat_kunjungan
        FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(id) ON DELETE RESTRICT,
    CONSTRAINT rel_riwayat_status
        FOREIGN KEY (kode_status) REFERENCES status_kunjungan(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Riwayat perubahan status kunjungan';

CREATE TABLE nomor_urut (
    jenis_nomor VARCHAR(32) NOT NULL,
    lingkup VARCHAR(100) NOT NULL,
    tanggal DATE NOT NULL,
    nomor_terakhir BIGINT UNSIGNED NOT NULL DEFAULT 0,
    diubah_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (jenis_nomor, lingkup, tanggal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Penghasil nomor transaksi yang aman terhadap konkurensi';

CREATE TABLE migrasi_sistem_sumber (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode VARCHAR(32) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    keterangan VARCHAR(255) NULL,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unik_sistem_sumber_kode (kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Daftar sistem sumber migrasi';

CREATE TABLE migrasi_proses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sistem_sumber_id SMALLINT UNSIGNED NOT NULL,
    jenis_proses VARCHAR(32) NOT NULL,
    status_proses VARCHAR(32) NOT NULL,
    dimulai_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    selesai_pada DATETIME NULL,
    jumlah_dibaca BIGINT UNSIGNED NOT NULL DEFAULT 0,
    jumlah_berhasil BIGINT UNSIGNED NOT NULL DEFAULT 0,
    jumlah_gagal BIGINT UNSIGNED NOT NULL DEFAULT 0,
    keterangan VARCHAR(500) NULL,

    KEY indeks_proses_sumber (sistem_sumber_id, dimulai_pada),

    CONSTRAINT rel_proses_sistem_sumber
        FOREIGN KEY (sistem_sumber_id) REFERENCES migrasi_sistem_sumber(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Catatan pelaksanaan migrasi';

CREATE TABLE migrasi_masalah (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    proses_id BIGINT UNSIGNED NOT NULL,
    jenis_entitas VARCHAR(32) NOT NULL,
    kunci_sumber VARCHAR(100) NULL,
    kode_masalah VARCHAR(64) NOT NULL,
    rincian VARCHAR(1000) NOT NULL,
    diselesaikan BOOLEAN NOT NULL DEFAULT FALSE,
    dibuat_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    KEY indeks_masalah_proses (proses_id, diselesaikan),
    KEY indeks_masalah_entitas (jenis_entitas, kunci_sumber),

    CONSTRAINT rel_masalah_proses
        FOREIGN KEY (proses_id) REFERENCES migrasi_proses(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Data sumber yang memerlukan pemeriksaan saat migrasi';

CREATE TABLE migrasi_pasien (
    sistem_sumber_id SMALLINT UNSIGNED NOT NULL,
    kunci_sumber VARCHAR(100) NOT NULL,
    pasien_id BIGINT UNSIGNED NOT NULL,
    sidik_data CHAR(64) NULL,
    dimigrasikan_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (sistem_sumber_id, kunci_sumber),
    UNIQUE KEY unik_migrasi_pasien_target (sistem_sumber_id, pasien_id),

    CONSTRAINT rel_migrasi_pasien_sumber
        FOREIGN KEY (sistem_sumber_id) REFERENCES migrasi_sistem_sumber(id),
    CONSTRAINT rel_migrasi_pasien_target
        FOREIGN KEY (pasien_id) REFERENCES pasien(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pemetaan pasien sumber ke pasien baru';

CREATE TABLE migrasi_kunjungan (
    sistem_sumber_id SMALLINT UNSIGNED NOT NULL,
    kunci_sumber VARCHAR(100) NOT NULL,
    kunjungan_id BIGINT UNSIGNED NOT NULL,
    sidik_data CHAR(64) NULL,
    dimigrasikan_pada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (sistem_sumber_id, kunci_sumber),
    UNIQUE KEY unik_migrasi_kunjungan_target (sistem_sumber_id, kunjungan_id),

    CONSTRAINT rel_migrasi_kunjungan_sumber
        FOREIGN KEY (sistem_sumber_id) REFERENCES migrasi_sistem_sumber(id),
    CONSTRAINT rel_migrasi_kunjungan_target
        FOREIGN KEY (kunjungan_id) REFERENCES kunjungan(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pemetaan nomor rawat Khanza ke kunjungan baru';

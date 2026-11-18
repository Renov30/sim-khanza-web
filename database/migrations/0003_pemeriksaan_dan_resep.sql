-- Database tujuan setelah 0001 dan 0002. Semua waktu mengikuti jam lokal sumber.
SET NAMES utf8mb4;

CREATE TABLE pelaksana_pemeriksaan (
    kode VARCHAR(20) NOT NULL,
    nama VARCHAR(50) NOT NULL,
    jabatan VARCHAR(25) NOT NULL,
    status_aktif VARCHAR(20) NOT NULL,
    PRIMARY KEY (kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rujukan_internal_rawat_jalan (
    nomor_kunjungan VARCHAR(40) NOT NULL,
    kode_dokter VARCHAR(32) NOT NULL,
    kode_unit VARCHAR(32) NULL,
    PRIMARY KEY (nomor_kunjungan, kode_dokter),
    FOREIGN KEY (nomor_kunjungan) REFERENCES kunjungan(nomor_kunjungan),
    FOREIGN KEY (kode_dokter) REFERENCES dokter(kode),
    FOREIGN KEY (kode_unit) REFERENCES unit_pelayanan(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pemeriksaan_rawat_jalan (
    nomor_kunjungan VARCHAR(40) NOT NULL,
    tanggal DATE NOT NULL,
    jam TIME NOT NULL,
    kode_pelaksana VARCHAR(20) NOT NULL,
    suhu VARCHAR(5) NULL,
    tensi VARCHAR(8) NOT NULL,
    nadi VARCHAR(3) NULL,
    respirasi VARCHAR(3) NULL,
    tinggi VARCHAR(5) NULL,
    berat VARCHAR(5) NULL,
    saturasi_oksigen VARCHAR(3) NOT NULL,
    gcs VARCHAR(10) NULL,
    kesadaran VARCHAR(32) NOT NULL,
    alergi VARCHAR(80) NULL,
    lingkar_perut VARCHAR(5) NULL,
    subjek TEXT NULL,
    objek TEXT NULL,
    asesmen TEXT NOT NULL,
    rencana TEXT NOT NULL,
    instruksi TEXT NOT NULL,
    evaluasi TEXT NOT NULL,
    PRIMARY KEY (nomor_kunjungan, tanggal, jam),
    KEY (kode_pelaksana, tanggal, jam),
    FOREIGN KEY (nomor_kunjungan) REFERENCES kunjungan(nomor_kunjungan),
    FOREIGN KEY (kode_pelaksana) REFERENCES pelaksana_pemeriksaan(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lokasi_farmasi (
    kode VARCHAR(5) NOT NULL,
    nama VARCHAR(30) NULL,
    status_aktif VARCHAR(1) NULL,
    PRIMARY KEY (kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE depo_unit_rawat_jalan (
    kode_unit VARCHAR(32) NOT NULL,
    kode_lokasi VARCHAR(5) NOT NULL,
    PRIMARY KEY (kode_unit, kode_lokasi),
    FOREIGN KEY (kode_unit) REFERENCES unit_pelayanan(kode),
    FOREIGN KEY (kode_lokasi) REFERENCES lokasi_farmasi(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lokasi_stok_utama (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    kode_lokasi VARCHAR(5) NOT NULL,
    asal_stok VARCHAR(40) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (kode_lokasi) REFERENCES lokasi_farmasi(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE penjamin_input_parsial (
    kode_penjamin VARCHAR(32) NOT NULL,
    PRIMARY KEY (kode_penjamin),
    FOREIGN KEY (kode_penjamin) REFERENCES penjamin(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE penempatan_kamar (
    nomor_kunjungan VARCHAR(40) NOT NULL,
    tanggal_masuk DATE NOT NULL,
    jam_masuk TIME NOT NULL,
    kode_kamar VARCHAR(15) NOT NULL,
    kode_ruang VARCHAR(5) NULL,
    status_pulang VARCHAR(40) NOT NULL,
    PRIMARY KEY (nomor_kunjungan, tanggal_masuk, jam_masuk),
    FOREIGN KEY (nomor_kunjungan) REFERENCES kunjungan(nomor_kunjungan),
    FOREIGN KEY (kode_ruang) REFERENCES lokasi_farmasi(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE kunjungan_rawat_gabung (
    nomor_kunjungan VARCHAR(40) NOT NULL,
    nomor_kunjungan_gabung VARCHAR(40) NOT NULL,
    PRIMARY KEY (nomor_kunjungan, nomor_kunjungan_gabung),
    FOREIGN KEY (nomor_kunjungan) REFERENCES kunjungan(nomor_kunjungan),
    FOREIGN KEY (nomor_kunjungan_gabung) REFERENCES kunjungan(nomor_kunjungan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE obat (
    kode VARCHAR(15) NOT NULL,
    nama VARCHAR(80) NULL,
    satuan VARCHAR(4) NULL,
    komposisi VARCHAR(100) NULL,
    jenis VARCHAR(30) NULL,
    industri VARCHAR(50) NULL,
    kapasitas DOUBLE NOT NULL,
    harga_rawat_jalan DOUBLE NULL,
    aktif BOOLEAN NOT NULL,
    PRIMARY KEY (kode),
    KEY (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE stok_obat_depo (
    kode_obat VARCHAR(15) NOT NULL,
    kode_lokasi VARCHAR(5) NOT NULL,
    nomor_batch VARCHAR(20) NOT NULL,
    nomor_faktur VARCHAR(20) NOT NULL,
    jumlah DOUBLE NOT NULL,
    PRIMARY KEY (kode_obat, kode_lokasi, nomor_batch, nomor_faktur),
    KEY (kode_lokasi, kode_obat),
    FOREIGN KEY (kode_obat) REFERENCES obat(kode),
    FOREIGN KEY (kode_lokasi) REFERENCES lokasi_farmasi(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE aturan_pakai_obat (
    aturan VARCHAR(150) NOT NULL,
    PRIMARY KEY (aturan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE metode_racikan (
    kode VARCHAR(3) NOT NULL,
    nama VARCHAR(30) NOT NULL,
    PRIMARY KEY (kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resep (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nomor_resep VARCHAR(14) NOT NULL,
    nomor_kunjungan VARCHAR(40) NOT NULL,
    kode_dokter VARCHAR(32) NOT NULL,
    jenis_perawatan VARCHAR(8) NULL,
    tanggal_resep DATE NULL,
    jam_resep TIME NULL,
    tanggal_validasi DATE NULL,
    jam_validasi TIME NULL,
    tanggal_penyerahan DATE NULL,
    jam_penyerahan TIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (nomor_resep),
    KEY (jenis_perawatan, tanggal_resep, jam_resep),
    FOREIGN KEY (nomor_kunjungan) REFERENCES kunjungan(nomor_kunjungan),
    FOREIGN KEY (kode_dokter) REFERENCES dokter(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resep_obat_umum (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nomor_resep VARCHAR(14) NOT NULL,
    kode_obat VARCHAR(15) NOT NULL,
    jumlah DOUBLE NULL,
    aturan_pakai VARCHAR(150) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (nomor_resep) REFERENCES resep(nomor_resep),
    FOREIGN KEY (kode_obat) REFERENCES obat(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resep_racikan (
    nomor_resep VARCHAR(14) NOT NULL,
    nomor_racikan VARCHAR(2) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    kode_metode VARCHAR(3) NOT NULL,
    jumlah INT NOT NULL,
    aturan_pakai VARCHAR(150) NOT NULL,
    keterangan VARCHAR(50) NOT NULL,
    PRIMARY KEY (nomor_resep, nomor_racikan),
    FOREIGN KEY (nomor_resep) REFERENCES resep(nomor_resep),
    FOREIGN KEY (kode_metode) REFERENCES metode_racikan(kode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE bahan_resep_racikan (
    nomor_resep VARCHAR(14) NOT NULL,
    nomor_racikan VARCHAR(2) NOT NULL,
    kode_obat VARCHAR(15) NOT NULL,
    p1 DOUBLE NULL,
    p2 DOUBLE NULL,
    kandungan VARCHAR(10) NULL,
    jumlah DOUBLE NULL,
    PRIMARY KEY (nomor_resep, nomor_racikan, kode_obat),
    FOREIGN KEY (kode_obat) REFERENCES obat(kode),
    FOREIGN KEY (nomor_resep, nomor_racikan) REFERENCES resep_racikan(nomor_resep, nomor_racikan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

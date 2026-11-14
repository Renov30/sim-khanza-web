-- Nilai referensi awal. Kode disimpan stabil, sedangkan label dapat diubah.

INSERT INTO jenis_kelamin (kode, nama, urutan) VALUES
    ('LAKI_LAKI', 'Laki-laki', 10),
    ('PEREMPUAN', 'Perempuan', 20),
    ('TIDAK_DIKETAHUI', 'Tidak diketahui', 90);

INSERT INTO golongan_darah (kode, nama, urutan) VALUES
    ('A', 'A', 10),
    ('B', 'B', 20),
    ('AB', 'AB', 30),
    ('O', 'O', 40),
    ('TIDAK_DIKETAHUI', 'Tidak diketahui', 90);

INSERT INTO status_perkawinan (kode, nama, urutan) VALUES
    ('BELUM_MENIKAH', 'Belum menikah', 10),
    ('MENIKAH', 'Menikah', 20),
    ('JANDA', 'Janda', 30),
    ('DUDA', 'Duda', 40),
    ('TIDAK_DIKETAHUI', 'Tidak diketahui', 90);

INSERT INTO pendidikan (kode, nama, urutan) VALUES
    ('TIDAK_SEKOLAH', 'Tidak sekolah', 10),
    ('TK', 'Taman Kanak-kanak', 20),
    ('SD', 'Sekolah Dasar', 30),
    ('SMP', 'Sekolah Menengah Pertama', 40),
    ('SMA', 'Sekolah Menengah Atas atau sederajat', 50),
    ('D1', 'Diploma 1', 60),
    ('D2', 'Diploma 2', 70),
    ('D3', 'Diploma 3', 80),
    ('D4', 'Diploma 4', 90),
    ('S1', 'Sarjana', 100),
    ('S2', 'Magister', 110),
    ('S3', 'Doktor', 120),
    ('TIDAK_DIKETAHUI', 'Tidak diketahui', 999);

INSERT INTO hubungan_keluarga (kode, nama, urutan) VALUES
    ('DIRI_SENDIRI', 'Diri sendiri', 10),
    ('AYAH', 'Ayah', 20),
    ('IBU', 'Ibu', 30),
    ('SUAMI', 'Suami', 40),
    ('ISTRI', 'Istri', 50),
    ('ANAK', 'Anak', 60),
    ('SAUDARA', 'Saudara', 70),
    ('LAINNYA', 'Lainnya', 90),
    ('TIDAK_DIKETAHUI', 'Tidak diketahui', 99);

INSERT INTO jenis_pelayanan (kode, nama, urutan) VALUES
    ('RAWAT_JALAN', 'Rawat jalan', 10),
    ('RAWAT_INAP', 'Rawat inap', 20);

INSERT INTO status_kunjungan (kode, nama, status_akhir, urutan) VALUES
    ('BELUM_DILAYANI', 'Belum dilayani', FALSE, 10),
    ('BERKAS_DITERIMA', 'Berkas diterima', FALSE, 20),
    ('SEDANG_DILAYANI', 'Sedang dilayani', FALSE, 30),
    ('SELESAI', 'Selesai', TRUE, 40),
    ('DIRUJUK', 'Dirujuk', TRUE, 50),
    ('DIRAWAT', 'Dirawat', FALSE, 60),
    ('MENINGGAL', 'Meninggal', TRUE, 70),
    ('PULANG_PAKSA', 'Pulang paksa', TRUE, 80),
    ('BATAL', 'Batal', TRUE, 90);

INSERT INTO status_pembayaran (kode, nama, status_lunas, urutan) VALUES
    ('BELUM_BAYAR', 'Belum bayar', FALSE, 10),
    ('SUDAH_BAYAR', 'Sudah bayar', TRUE, 20);

INSERT INTO migrasi_sistem_sumber (kode, nama, keterangan) VALUES
    ('KHANZA', 'SIMRS Khanza', 'Database SIMRS Khanza sebelum pemisahan');

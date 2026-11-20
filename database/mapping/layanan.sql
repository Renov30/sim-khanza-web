-- Satu SELECT per tabel tujuan, dalam urutan dependensi. Alias merupakan kolom tujuan.

-- tujuan: pelaksana_pemeriksaan
SELECT nik AS kode,
       nama,
       jbtn AS jabatan,
       stts_aktif AS status_aktif
FROM pegawai;

-- tujuan: rujukan_internal_rawat_jalan
SELECT no_rawat AS nomor_kunjungan,
       kd_dokter AS kode_dokter,
       kd_poli AS kode_unit
FROM rujukan_internal_poli;

-- tujuan: pemeriksaan_rawat_jalan
SELECT no_rawat AS nomor_kunjungan,
       tgl_perawatan AS tanggal,
       jam_rawat AS jam,
       nip AS kode_pelaksana,
       suhu_tubuh AS suhu,
       tensi,
       nadi,
       respirasi,
       tinggi,
       berat,
       spo2 AS saturasi_oksigen,
       gcs,
       kesadaran,
       alergi,
       lingkar_perut,
       keluhan AS subjek,
       pemeriksaan AS objek,
       penilaian AS asesmen,
       rtl AS rencana,
       instruksi,
       evaluasi
FROM pemeriksaan_ralan;

-- tujuan: lokasi_farmasi
SELECT kd_bangsal AS kode,
       nm_bangsal AS nama,
       status AS status_aktif
FROM bangsal;

-- tujuan: depo_unit_rawat_jalan
SELECT kd_poli AS kode_unit,
       kd_bangsal AS kode_lokasi
FROM set_depo_ralan;

-- tujuan: lokasi_stok_utama
SELECT kd_bangsal AS kode_lokasi,
       asal_stok
FROM set_lokasi;

-- tujuan: penjamin_input_parsial
SELECT kd_pj AS kode_penjamin
FROM set_input_parsial;

-- tujuan: penempatan_kamar
SELECT ki.no_rawat AS nomor_kunjungan,
       ki.tgl_masuk AS tanggal_masuk,
       ki.jam_masuk AS jam_masuk,
       ki.kd_kamar AS kode_kamar,
       k.kd_bangsal AS kode_ruang,
       ki.stts_pulang AS status_pulang
FROM kamar_inap ki LEFT JOIN kamar k ON k.kd_kamar = ki.kd_kamar;

-- tujuan: kunjungan_rawat_gabung
SELECT no_rawat AS nomor_kunjungan,
       no_rawat2 AS nomor_kunjungan_gabung
FROM ranap_gabung;

-- tujuan: obat
SELECT b.kode_brng AS kode,
       b.nama_brng AS nama,
       b.kode_sat AS satuan,
       b.letak_barang AS komposisi,
       j.nama AS jenis,
       i.nama_industri AS industri,
       b.kapasitas AS kapasitas,
       b.ralan AS harga_rawat_jalan,
       b.status = '1' AS aktif
FROM databarang b LEFT JOIN jenis j ON j.kdjns = b.kdjns LEFT JOIN industrifarmasi i ON i.kode_industri = b.kode_industri;

-- tujuan: stok_obat_depo
SELECT kode_brng AS kode_obat,
       kd_bangsal AS kode_lokasi,
       no_batch AS nomor_batch,
       no_faktur AS nomor_faktur,
       stok AS jumlah
FROM gudangbarang;

-- tujuan: aturan_pakai_obat
SELECT aturan
FROM master_aturan_pakai;

-- tujuan: metode_racikan
SELECT kd_racik AS kode,
       nm_racik AS nama
FROM metode_racik;

-- tujuan: resep
SELECT no_resep AS nomor_resep,
       no_rawat AS nomor_kunjungan,
       kd_dokter AS kode_dokter,
       status AS jenis_perawatan,
       NULLIF(CAST(tgl_peresepan AS CHAR), '0000-00-00') AS tanggal_resep,
       jam_peresepan AS jam_resep,
       NULLIF(CAST(tgl_perawatan AS CHAR), '0000-00-00') AS tanggal_validasi,
       jam AS jam_validasi,
       NULLIF(CAST(tgl_penyerahan AS CHAR), '0000-00-00') AS tanggal_penyerahan,
       jam_penyerahan
FROM resep_obat;

-- tujuan: resep_obat_umum
SELECT no_resep AS nomor_resep,
       kode_brng AS kode_obat,
       jml AS jumlah,
       aturan_pakai
FROM resep_dokter;

-- tujuan: resep_racikan
SELECT no_resep AS nomor_resep,
       no_racik AS nomor_racikan,
       nama_racik AS nama,
       kd_racik AS kode_metode,
       jml_dr AS jumlah,
       aturan_pakai,
       keterangan
FROM resep_dokter_racikan;

-- tujuan: bahan_resep_racikan
SELECT no_resep AS nomor_resep,
       no_racik AS nomor_racikan,
       kode_brng AS kode_obat,
       p1,
       p2,
       kandungan,
       jml AS jumlah
FROM resep_dokter_racikan_detail;

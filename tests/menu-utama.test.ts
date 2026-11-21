import assert from "node:assert/strict";
import test from "node:test";
import { MENU_CATEGORIES, MENU_ITEMS } from "../src/lib/constants/menus";

test("kategori menu mengikuti cmbMenu frmUtama A sampai T", () => {
  assert.deepEqual(
    MENU_CATEGORIES.map((kategori) => kategori.code),
    "ABCDEFGHIJKLMNOPQRST".split(""),
  );
  assert.equal(new Set(MENU_CATEGORIES.map((kategori) => kategori.code)).size, 20);
});

test("semua menu memiliki ID unik, kategori valid, dan ikon dikenal", () => {
  const kategoriValid = new Set(MENU_CATEGORIES.map((kategori) => kategori.code));
  const idTerlihat = new Set<string>();

  for (const item of MENU_ITEMS) {
    assert.equal(idTerlihat.has(item.id), false, `ID menu ganda: ${item.id}`);
    idTerlihat.add(item.id);
    assert.ok(item.title.trim().length > 0, `Judul kosong pada ${item.id}`);
    assert.ok(kategoriValid.has(item.categoryCode), `Kategori tidak dikenal pada ${item.id}`);
    assert.ok(item.iconName.trim().length > 0, `Ikon kosong pada ${item.id}`);
  }

  assert.ok(MENU_ITEMS.length > 1100, "Menu frmUtama belum lengkap");
});

test("master SDM Khanza memiliki satu entri menu per modul", () => {
  const menu = new Map(MENU_ITEMS.map((item) => [item.id, item]));
  const izinGanda = MENU_ITEMS.filter((item) => item.permissionKey === "petugas" && /Petugas|Pegawai/.test(item.title));
  assert.equal(izinGanda.length, 1, `Menu petugas ganda: ${izinGanda.map((item) => item.id).join(", ")}`);
  assert.equal(menu.get("btn-pegawai")?.title, "Data Petugas");
  assert.equal(menu.get("btn-pegawai")?.permissionKey, "petugas");
  assert.equal(menu.get("btn-dokter")?.title, "Data Dokter");
  assert.equal(menu.get("btn-dokter")?.permissionKey, "dokter");
  assert.equal(menu.get("btn-penggajian")?.title, "Kepegawaian & Gaji");
  assert.equal(menu.get("btn-penggajian")?.permissionKey, "pegawai_admin");
  assert.equal(menu.has("data-pegawai"), false);
  assert.equal(menu.has("btn-petugas"), false);
});

test("menu representatif dari frmUtama tersedia dengan izinnya", () => {
  const menu = new Map(MENU_ITEMS.map((item) => [item.id, item]));

  assert.equal(menu.get("btn-registrasi")?.permissionKey, "registrasi");
  assert.equal(menu.get("btn-data-pasien")?.title, "Data Pasien");
  assert.equal(menu.get("btn-data-pasien")?.permissionKey, "pasien");
  assert.equal(menu.get("btn-data-pasien")?.categoryCode, "A");
  assert.equal(menu.get("btn-data-poliklinik")?.title, "Data Poliklinik");
  assert.equal(menu.get("btn-data-poliklinik")?.permissionKey, "registrasi");
  assert.equal(menu.get("btn-data-poliklinik")?.categoryCode, "A");
  assert.equal(menu.get("btn-jadwal")?.title, "Jadwal Praktek");
  assert.equal(menu.get("btn-jadwal")?.permissionKey, "jadwal_praktek");
  assert.equal(menu.get("jadwal-dokter")?.title, "Jadwal Praktek Dokter");
  assert.equal(menu.get("jadwal-dokter")?.permissionKey, "jadwal_praktek");
  assert.equal(menu.get("btn-tindakan-ralan")?.title, "Tarif Ralan");
  assert.equal(menu.get("btn-tindakan-ralan")?.permissionKey, "tarif_ralan");
  assert.equal(menu.get("btn-tindakan-ranap")?.title, "Tarif Ranap");
  assert.equal(menu.get("btn-tindakan-ranap")?.permissionKey, "tarif_ranap");
  assert.equal(menu.get("tarif-ralan")?.title, "Master Tarif Ralan");
  assert.equal(menu.get("tarif-ranap")?.permissionKey, "tarif_ranap");
  assert.equal(menu.get("btn-analisa-kamar")?.categoryCode, "A");
  assert.equal(menu.get("btn-barcode-ralan")?.permissionKey, "barcoderalan");
  assert.equal(menu.get("btn-jenis-parkir")?.categoryCode, "H");
  assert.equal(menu.get("btn-cek-bpjs-kartu")?.categoryCode, "L");
  assert.equal(menu.get("btn-setup-aplikasi")?.categoryCode, "T");
});

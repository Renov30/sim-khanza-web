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

test("menu representatif dari frmUtama tersedia dengan izinnya", () => {
  const menu = new Map(MENU_ITEMS.map((item) => [item.id, item]));

  assert.equal(menu.get("btn-registrasi")?.permissionKey, "registrasi");
  assert.equal(menu.get("btn-analisa-kamar")?.categoryCode, "A");
  assert.equal(menu.get("btn-barcode-ralan")?.permissionKey, "barcoderalan");
  assert.equal(menu.get("btn-jenis-parkir")?.categoryCode, "H");
  assert.equal(menu.get("btn-cek-bpjs-kartu")?.categoryCode, "L");
  assert.equal(menu.get("btn-setup-aplikasi")?.categoryCode, "T");
});

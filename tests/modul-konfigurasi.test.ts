import assert from "node:assert/strict";
import test from "node:test";
import {
  modulDiaktifkan,
  tentukanModulDariMenu,
  tentukanModulDariPath,
  type KonfigurasiModul,
} from "../src/lib/modul/peta";
import type { MenuItem } from "../src/lib/types/menu";
import { uraikanKonfigurasiModul } from "../src/lib/modul/konfigurasi";

const KLINIK: KonfigurasiModul = {
  penyaringanAktif: true,
  modulAktif: ["registrasi", "pasien", "rawat-jalan", "farmasi", "laboratorium"],
};

test("peta URL melindungi halaman dan API dalam modul yang sama", () => {
  assert.equal(tentukanModulDariPath("/rawat-inap"), "rawat-inap");
  assert.equal(tentukanModulDariPath("/api/rawat-inap/pulang"), "rawat-inap");
  assert.equal(tentukanModulDariPath("/api/tindakan-rawat-inap"), "rawat-inap");
  assert.equal(tentukanModulDariPath("/api/auth/login"), null);
});

test("allowlist menyembunyikan menu dan akses modul yang tidak dicantumkan", () => {
  const menuRanap: MenuItem = {
    id: "btn-kamar-inap",
    title: "Rawat Inap",
    categoryCode: "A",
    categoryName: "Pelayanan",
    iconName: "BedDouble",
    permissionKey: "kamar_inap",
  };
  assert.equal(tentukanModulDariMenu(menuRanap), "rawat-inap");
  assert.equal(modulDiaktifkan(KLINIK, "rawat-inap"), false);
  assert.equal(modulDiaktifkan(KLINIK, "rawat-jalan"), true);
  assert.equal(modulDiaktifkan(KLINIK, tentukanModulDariMenu(menuRanap)), false);
});

test("tanpa allowlist mempertahankan seluruh menu lama", () => {
  assert.equal(
    modulDiaktifkan({ penyaringanAktif: false, modulAktif: [] }, null),
    true,
  );
});

test("konfigurasi environment menerima ID valid dan tidak mengaktifkan ID salah", () => {
  assert.deepEqual(uraikanKonfigurasiModul(undefined), {
    penyaringanAktif: false,
    modulAktif: [
      "registrasi", "pasien", "rawat-jalan", "rawat-inap", "igd",
      "laboratorium", "radiologi", "farmasi", "sdm", "referensi",
    ],
  });
  assert.deepEqual(uraikanKonfigurasiModul(" pasien, rawat-jalan, tidak-ada, pasien "), {
    penyaringanAktif: true,
    modulAktif: ["pasien", "rawat-jalan"],
  });
});

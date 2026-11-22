import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
const { NextRequest } = load("next/server");
const isRegistrationDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function handler({ methodTersedia = false, baris = [], sesi = { isAdmin: true, permissions: {} } } = {}) {
  const calls = [];
  const mocks = {
    "@/lib/auth": { getSession: async () => sesi },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.includes("INFORMATION_SCHEMA")) return [{ ada: methodTersedia ? 1 : 0 }];
        return baris;
      },
    },
    "@/lib/registrasi/date": { isRegistrationDate },
  };
  const file = resolve("src/app/api/laboratorium/periksa-pk/route.ts");
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

test("hasil lab PK memuat mode data dengan filter berparameter", async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk?no_rawat=2026%2F11%2F20%2F000001&no_rm=0000001&nip=P001&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-20&status=Ralan&cari=hemoglobin&limit=20"));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /INFORMATION_SCHEMA\.COLUMNS/);
  assert.match(calls[1][0], /INNER JOIN detail_periksa_lab d/);
  assert.match(calls[1][0], /INNER JOIN template_laboratorium t/);
  assert.match(calls[1][0], /LEFT JOIN saran_kesan_lab sk/);
  assert.match(calls[1][0], /r\.umurdaftar, r\.sttsumur/);
  assert.match(calls[1][0], /AS jenis_ruang/);
  assert.match(calls[1][0], /'' AS method/);
  assert.match(calls[1][0], /pl\.tgl_periksa >= \?.*pl\.tgl_periksa <= \?.*pl\.no_rawat = \?.*r\.no_rkm_medis = \?.*petugas\.nip = \?.*pl\.status = \?/s);
  assert.deepEqual(calls[1][1].slice(0, 6), ["2026-11-01", "2026-11-20", "2026/11/20/000001", "0000001", "P001", "Ralan"]);
  assert.ok(calls[1][1].every((value) => value !== "hemoglobin"));
});

test("hasil lab PK mode item memakai method bila kolom tersedia", async () => {
  const baris = [{
    no_rawat: "2026/11/20/000001", tgl_periksa: "2026-11-20", jam: "08:30",
    kd_jenis_prw: "PK001", nm_perawatan: "Darah Lengkap", pemeriksaan: "Hemoglobin",
    method: "SIEMENS", nilai: "13", satuan: "g/dL", nilai_rujukan: "12-15",
  }];
  const { api, calls } = handler({ methodTersedia: true, baris });
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk?mode=item"));
  assert.equal(response.status, 200);
  assert.match(calls[1][0], /CAST\(t\.method AS CHAR\) AS method/);
  const json = await response.json();
  assert.equal(json.data[0].method, "SIEMENS");
  assert.equal(json.data[0].pemeriksaan, "Hemoglobin");
});

test("hasil lab PK mode data mengelompokkan item per kunjungan", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "PK1", pemeriksaan: "HB" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "PK1", pemeriksaan: "Ht" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", kd_jenis_prw: "PK2", pemeriksaan: "Gula" },
  ];
  const { api } = handler({ baris });
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk"));
  const json = await response.json();
  assert.equal(json.data.length, 2);
  assert.deepEqual(json.data.map((item) => item.item.length), [2, 1]);
});

test("hasil lab PK mode detail menghitung ringkasan kunjungan", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "PK1", pemeriksaan: "HB" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "PK1", pemeriksaan: "Ht" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", no_rkm_medis: "RM1", kd_jenis_prw: "PK2", pemeriksaan: "Gula" },
    { no_rawat: "B", tgl_periksa: "2026-11-20", jam: "10:00", no_rkm_medis: "RM2", kd_jenis_prw: "PK1", pemeriksaan: "HB" },
  ];
  const { api } = handler({ baris });
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk?mode=detail"));
  const json = await response.json();
  assert.equal(json.data.pasien.length, 2);
  assert.deepEqual(json.data.ringkasan, {
    jumlah_pasien: 2,
    jumlah_kunjungan: 3,
    jumlah_pemeriksaan: 3,
    jumlah_sub_pemeriksaan: 4,
  });
});

test("hasil lab PK menghitung biaya per kunjungan seperti Java", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "PK1", biaya: "100000", biaya_item: "10000", pemeriksaan: "HB" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "PK1", biaya: "100000", biaya_item: "5000", pemeriksaan: "Ht" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", kd_jenis_prw: "PK2", biaya: "75000", biaya_item: "2000", pemeriksaan: "Gula" },
  ];
  const { api } = handler({ baris });
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk"));
  const json = await response.json();
  assert.deepEqual(json.data.map((item) => item.biaya_kunjungan), [115000, 77000]);
});

test("hasil lab PK menolak sesi tanpa izin", async () => {
  const tanpaSesi = handler({ sesi: null });
  assert.equal((await tanpaSesi.api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk"))).status, 401);
  assert.equal(tanpaSesi.calls.length, 0);

  const tanpaIzin = handler({ sesi: { isAdmin: false, permissions: {} } });
  assert.equal((await tanpaIzin.api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk"))).status, 403);
  assert.equal(tanpaIzin.calls.length, 0);
});

test("hasil lab PK menolak filter tidak valid sebelum query", async () => {
  for (const query of [
    "tanggal_mulai=2026-02-30",
    "status=Lunas",
    `cari=${"a".repeat(101)}`,
    "mode=ringkas",
    `nip=${"P".repeat(21)}`,
  ]) {
    const { api, calls } = handler();
    const response = await api.GET(new NextRequest(`http://localhost/api/laboratorium/periksa-pk?${query}`));
    assert.equal(response.status, 400);
    assert.equal(calls.length, 0);
  }
});

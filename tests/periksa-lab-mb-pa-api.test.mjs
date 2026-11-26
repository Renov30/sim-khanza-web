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

function handler({ jenis, methodTersedia = false, baris = [], sesi = { isAdmin: true, permissions: {} } } = {}) {
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
  const file = resolve(`src/app/api/laboratorium/periksa-${jenis.toLowerCase()}/route.ts`);
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

const url = (jenis, query = "") => `http://localhost/api/laboratorium/periksa-${jenis.toLowerCase()}?${query}`;

test("hasil lab MB memuat mode data dengan filter berparameter", async () => {
  const { api, calls } = handler({ jenis: "MB" });
  const response = await api.GET(new NextRequest(url("MB", "no_rawat=2026%2F11%2F20%2F000001&no_rm=0000001&nip=P001&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-20&status=Ralan&cari=kultur&limit=20")));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /INFORMATION_SCHEMA\.COLUMNS/);
  assert.match(calls[1][0], /INNER JOIN detail_periksa_lab d/);
  assert.match(calls[1][0], /INNER JOIN template_laboratorium t/);
  assert.match(calls[1][0], /LEFT JOIN saran_kesan_lab sk/);
  assert.match(calls[1][0], /pl\.kategori = 'MB'/);
  assert.match(calls[1][0], /r\.umurdaftar, r\.sttsumur/);
  assert.match(calls[1][0], /AS jenis_ruang/);
  assert.match(calls[1][0], /'' AS method/);
  assert.match(calls[1][0], /d\.nilai, t\.satuan, d\.nilai_rujukan/);
  assert.match(calls[1][0], /pl\.tgl_periksa >= \?.*pl\.tgl_periksa <= \?.*pl\.no_rawat = \?.*r\.no_rkm_medis = \?.*petugas\.nip = \?.*pl\.status = \?/s);
  assert.deepEqual(calls[1][1].slice(0, 6), ["2026-11-01", "2026-11-20", "2026/11/20/000001", "0000001", "P001", "Ralan"]);
  assert.ok(calls[1][1].every((value) => value !== "kultur"));
});

test("hasil lab MB mode item memakai method dan satuan bila tersedia", async () => {
  const baris = [{
    no_rawat: "2026/11/20/000001", tgl_periksa: "2026-11-20", jam: "08:30",
    kd_jenis_prw: "MB001", nm_perawatan: "Kultur Darah", pemeriksaan: "Identifikasi",
    method: "VITEK", nilai: "Positif", satuan: "mL", nilai_rujukan: "Negatif",
  }];
  const { api, calls } = handler({ jenis: "MB", methodTersedia: true, baris });
  const response = await api.GET(new NextRequest(url("MB", "mode=item")));
  assert.equal(response.status, 200);
  assert.match(calls[1][0], /CAST\(t\.method AS CHAR\) AS method/);
  const json = await response.json();
  assert.equal(json.data[0].method, "VITEK");
  assert.equal(json.data[0].pemeriksaan, "Identifikasi");
  assert.equal(json.data[0].satuan, "mL");
});

test("hasil lab MB mengelompokkan item dan menjumlahkan biaya seperti Java", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "MB1", biaya: "100000", biaya_item: "10000", pemeriksaan: "Kultur" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", kd_jenis_prw: "MB1", biaya: "100000", biaya_item: "5000", pemeriksaan: "Identifikasi" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", kd_jenis_prw: "MB2", biaya: "75000", biaya_item: "2000", pemeriksaan: "PCR" },
  ];
  const { api } = handler({ jenis: "MB", baris });
  const response = await api.GET(new NextRequest(url("MB")));
  const json = await response.json();
  assert.equal(json.data.length, 2);
  assert.deepEqual(json.data.map((item) => item.item.length), [2, 1]);
  assert.deepEqual(json.data.map((item) => item.biaya_kunjungan), [115000, 77000]);
});

test("hasil lab MB mode detail menghitung ringkasan kunjungan", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "MB1", pemeriksaan: "Kultur" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "MB1", pemeriksaan: "Identifikasi" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", no_rkm_medis: "RM1", kd_jenis_prw: "MB2", pemeriksaan: "PCR" },
    { no_rawat: "B", tgl_periksa: "2026-11-20", jam: "10:00", no_rkm_medis: "RM2", kd_jenis_prw: "MB1", pemeriksaan: "Kultur" },
  ];
  const { api } = handler({ jenis: "MB", baris });
  const response = await api.GET(new NextRequest(url("MB", "mode=detail")));
  const json = await response.json();
  assert.equal(json.data.pasien.length, 2);
  assert.deepEqual(json.data.ringkasan, {
    jumlah_pasien: 2,
    jumlah_kunjungan: 3,
    jumlah_pemeriksaan: 3,
    jumlah_sub_pemeriksaan: 4,
  });
});

test("hasil lab PA memakai detail_periksa_labpa dan hanya ruang poliklinik", async () => {
  const { api, calls } = handler({ jenis: "PA" });
  const response = await api.GET(new NextRequest(url("PA", "no_rawat=2026%2F11%2F20%2F000001&no_rm=0000001&nip=P001&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-20&status=Ralan&cari=pa&limit=20")));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /INNER JOIN detail_periksa_labpa dpa/);
  assert.match(calls[0][0], /dpa\.tgl_periksa = pl\.tgl_periksa AND dpa\.jam = pl\.jam/);
  assert.match(calls[0][0], /COALESCE\(poli\.nm_poli, ''\) AS ruang/);
  assert.match(calls[0][0], /pl\.kategori = 'PA'/);
  assert.match(calls[0][0], /r\.umurdaftar, r\.sttsumur/);
  assert.doesNotMatch(calls[0][0], /kamar_inap/i);
  assert.doesNotMatch(calls[0][0], /template_laboratorium/i);
  assert.deepEqual(calls[0][1].slice(0, 6), ["2026-11-01", "2026-11-20", "2026/11/20/000001", "0000001", "P001", "Ralan"]);
  assert.ok(calls[0][1].every((value) => value !== "pa"));
});

test("hasil lab PA mode detail mengelompokkan kunjungan dan menghitung ringkasan", async () => {
  const baris = [
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "PA1", makroskopik: "M1", kesimpulan: "K1" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "08:00", no_rkm_medis: "RM1", kd_jenis_prw: "PA2", makroskopik: "M2", kesimpulan: "K2" },
    { no_rawat: "A", tgl_periksa: "2026-11-20", jam: "09:00", no_rkm_medis: "RM1", kd_jenis_prw: "PA3", makroskopik: "M3", kesimpulan: "K3" },
    { no_rawat: "B", tgl_periksa: "2026-11-20", jam: "10:00", no_rkm_medis: "RM2", kd_jenis_prw: "PA1", makroskopik: "M4", kesimpulan: "K4" },
  ];
  const { api } = handler({ jenis: "PA", baris });
  const response = await api.GET(new NextRequest(url("PA", "mode=detail")));
  const json = await response.json();
  assert.equal(json.data.pasien.length, 2);
  assert.deepEqual(json.data.pasien[0].kunjungan.map((item) => item.item.length), [2, 1]);
  assert.deepEqual(json.data.ringkasan, {
    jumlah_pasien: 2,
    jumlah_kunjungan: 3,
    jumlah_pemeriksaan: 4,
    jumlah_sub_pemeriksaan: 4,
  });
});

test("hasil lab MB dan PA menolak sesi tanpa izin masing-masing", async () => {
  for (const jenis of ["MB", "PA"]) {
    const tanpaSesi = handler({ jenis, sesi: null });
    assert.equal((await tanpaSesi.api.GET(new NextRequest(url(jenis)))).status, 401);
    assert.equal(tanpaSesi.calls.length, 0);

    const tanpaIzin = handler({ jenis, sesi: { isAdmin: false, permissions: {} } });
    assert.equal((await tanpaIzin.api.GET(new NextRequest(url(jenis)))).status, 403);
    assert.equal(tanpaIzin.calls.length, 0);
  }
});

test("hasil lab MB dan PA menolak parameter tidak valid sebelum query", async () => {
  const invalid = ["tanggal_mulai=2026-02-30", "status=Lunas", `cari=${"a".repeat(101)}`];
  for (const jenis of ["MB", "PA"]) {
    for (const query of [...invalid, "mode=ringkas", `nip=${"P".repeat(21)}`]) {
      if (jenis === "PA" && query === "mode=ringkas") continue;
      const { api, calls } = handler({ jenis });
      const response = await api.GET(new NextRequest(url(jenis, query)));
      assert.equal(response.status, 400, `${jenis}: ${query}`);
      assert.equal(calls.length, 0);
    }
  }
});

test("hasil lab PA menolak mode item yang hanya dipakai MB", async () => {
  const { api, calls } = handler({ jenis: "PA" });
  const response = await api.GET(new NextRequest(url("PA", "mode=item")));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

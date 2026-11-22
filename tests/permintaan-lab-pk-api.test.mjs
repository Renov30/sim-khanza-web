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
const session = { isAdmin: false, permissions: { permintaan_lab: true } };

function handler(route, { user = session, hasil = [] } = {}) {
  const calls = [];
  const mocks = {
    "@/lib/auth": { getSession: async () => user },
    "@/lib/db": { executeQuery: async (sql, params) => { calls.push([sql, params]); return hasil; } },
    "@/lib/registrasi/date": { isRegistrationDate },
  };
  const file = resolve(`src/app/api/laboratorium/permintaan-pk/${route}/route.ts`);
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

test("permintaan lab PK memuat data dan filter berparameter", async () => {
  const { api, calls } = handler("");
  const url = "http://localhost/api/laboratorium/permintaan-pk?tanggal_mulai=2026-11-01"
    + "&tanggal_selesai=2026-11-22&status=ralan&dokter=D0000001&poli=U001&cari=hemoglobin&limit=20";
  const response = await api.GET(new NextRequest(url));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /permintaan_lab pl/);
  assert.match(calls[0][0], /pl\.tgl_permintaan >= \?.*pl\.tgl_permintaan <= \?.*pl\.status = \?.*pl\.dokter_perujuk = \?.*r\.kd_poli = \?/s);
  assert.deepEqual(calls[0][1].slice(0, 5), ["2026-11-01", "2026-11-22", "ralan", "D0000001", "U001"]);
  assert.ok(calls[0][1].every((value) => value !== "hemoglobin"));
  assert.equal(calls[0][1].at(-1), 20);
});

test("permintaan lab PK menambah join detail pada mode item", async () => {
  const { api, calls } = handler("");
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/permintaan-pk?mode=item&status=ranap&ruang=K001&status_ranap=Belum%20Pulang"));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /INNER JOIN permintaan_pemeriksaan_lab ppl/);
  assert.match(calls[0][0], /INNER JOIN template_laboratorium t/);
  assert.match(calls[0][0], /kamar\.kd_bangsal = \?/);
  assert.match(calls[0][0], /ki\.stts_pulang = '\-'/);
  assert.deepEqual(calls[0][1].slice(0, 2), ["ranap", "K001"]);
});

test("permintaan lab PK menolak filter tidak valid sebelum query", async () => {
  for (const query of [
    "tanggal_mulai=2026-02-30",
    "tanggal_mulai=2026-11-22&tanggal_selesai=2026-11-01",
    "status=Lunas",
    "mode=hapus",
    "status_ranap=Unknown",
    `cari=${"a".repeat(101)}`,
  ]) {
    const { api, calls } = handler("");
    const response = await api.GET(new NextRequest(`http://localhost/api/laboratorium/permintaan-pk?${query}`));
    assert.equal(response.status, 400);
    assert.equal(calls.length, 0);
  }
});

test("permintaan lab PK menolak sesi tanpa izin", async () => {
  for (const user of [null, { isAdmin: false, permissions: {} }]) {
    const { api, calls } = handler("", { user });
    const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/permintaan-pk"));
    assert.equal(response.status, user ? 403 : 401);
    assert.equal(calls.length, 0);
  }
});

test("opsi permintaan lab PK mengembalikan dokter, poli, dan ruang", async () => {
  const { api, calls } = handler("options");
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/permintaan-pk/options"));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.deepEqual(Object.keys(json.data), ["dokter", "poli", "ruang"]);
  assert.equal(calls.length, 3);
});

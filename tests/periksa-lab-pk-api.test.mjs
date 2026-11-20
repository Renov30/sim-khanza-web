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

function handler() {
  const calls = [];
  const mocks = {
    "@/lib/db": { executeQuery: async (sql, params) => { calls.push([sql, params]); return []; } },
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

test("hasil lab PK memuat detail item dan filter berparameter", async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest("http://localhost/api/laboratorium/periksa-pk?no_rawat=2026%2F11%2F20%2F000001&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-20&status=Ralan&cari=hemoglobin&limit=20"));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /INNER JOIN detail_periksa_lab d/);
  assert.match(calls[0][0], /INNER JOIN template_laboratorium t/);
  assert.match(calls[0][0], /pl\.tgl_periksa >= \?.*pl\.tgl_periksa <= \?.*pl\.no_rawat = \?.*pl\.status = \?/s);
  assert.deepEqual(calls[0][1].slice(0, 4), ["2026-11-01", "2026-11-20", "2026/11/20/000001", "Ralan"]);
  assert.ok(calls[0][1].every((value) => value !== "hemoglobin"));
});

test("hasil lab PK menolak filter tidak valid sebelum query", async () => {
  for (const query of ["tanggal_mulai=2026-02-30", "status=Lunas", `cari=${"a".repeat(101)}`]) {
    const { api, calls } = handler();
    const response = await api.GET(new NextRequest(`http://localhost/api/laboratorium/periksa-pk?${query}`));
    assert.equal(response.status, 400);
    assert.equal(calls.length, 0);
  }
});

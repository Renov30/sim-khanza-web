import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
const load = createRequire(import.meta.url);
const { NextRequest } = load('next/server');

const hariIni = '2026-11-21';

function isRegistrationDate(nilai) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nilai)) return false;
  const tanggal = new Date(`${nilai}T00:00:00Z`);
  return !Number.isNaN(tanggal.getTime()) && tanggal.toISOString().slice(0, 10) === nilai;
}

function handler() {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total: 3 }];
        return [{ no_rawat: '2026/11/21/000001' }];
      },
    },
    '@/lib/registrasi/date': { isRegistrationDate, registrationDate: () => hariIni },
  };
  const file = resolve('src/app/api/igd/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  return { api: mod.exports, calls };
}

test('filter IGD memakai periode hari ini dan query berparameter', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/igd'));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.total, 3);
  assert.match(calls[0][0], /r\.kd_poli = 'IGDK'/);
  assert.match(calls[0][0], /r\.tgl_registrasi >= \?/);
  assert.match(calls[0][0], /r\.tgl_registrasi < DATE_ADD\(\?, INTERVAL 1 DAY\)/);
  assert.deepEqual(calls[0][1], [hariIni, hariIni]);
  assert.match(calls[1][0], /ORDER BY r\.no_rawat\s+LIMIT \?/);
  assert.deepEqual(calls[1][1], [hariIni, hariIni, 50]);
});

test('filter IGD menggabungkan kata kunci, status, dan SEP belum terbit', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/igd?tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-21&cari=ani&stts=Belum&sep=Belum&limit=25';
  const res = await api.GET(new NextRequest(url));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /penj\.png_jawab LIKE \?/);
  assert.match(calls[0][0], /r\.stts = \?/);
  assert.match(calls[0][0], /r\.no_rawat NOT IN \(SELECT bridging_sep\.no_rawat FROM bridging_sep\)/);
  assert.deepEqual(calls[0][1].slice(0, 3), ['2026-11-01', '2026-11-21', '%ani%']);
  assert.deepEqual(calls[0][1].slice(-2), ['%ani%', 'Belum']);
  assert.equal(calls[0][1].length, 16);
  assert.equal(calls[1][1].length, 17);
  assert.deepEqual(calls[1][1].slice(-1), [25]);
});

test('filter SEP sudah terbit memakai IN pada bridging_sep', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/igd?sep=Sudah'));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /r\.no_rawat IN \(SELECT bridging_sep\.no_rawat FROM bridging_sep\)/);
});

test('filter IGD tidak valid ditolak tanpa query database', async () => {
  const kasus = [
    'tanggal_mulai=2026-02-30',
    'tanggal_mulai=2026-11-22&tanggal_selesai=2026-11-21',
    'sep=Ada',
    'stts=Lain',
    `cari=${'x'.repeat(101)}`,
    'limit=101',
    'limit=0',
  ];
  for (const query of kasus) {
    const { api, calls } = handler();
    assert.equal((await api.GET(new NextRequest(`http://localhost/api/igd?${query}`))).status, 400, query);
    assert.equal(calls.length, 0, query);
  }
});

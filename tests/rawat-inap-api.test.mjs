import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
const load = createRequire(import.meta.url);
const { NextRequest } = load('next/server');

function handler() {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total: 7 }];
        return [{ no_rawat: '2026/01/14/000001' }];
      },
    },
  };
  const file = resolve('src/app/api/rawat-inap/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  return { api: mod.exports, calls };
}

test('filter rawat inap memakai query berparameter dan menghitung total', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/rawat-inap?mode=masuk&tanggal_mulai=2026-01-01&tanggal_selesai=2026-01-31&status_bayar=Belum%20Bayar&bangsal=Melati&status_pulang=-&cari=ani&limit=25';
  const res = await api.GET(new NextRequest(url));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.total, 7);
  assert.deepEqual(calls[0][0].startsWith('SELECT COUNT(*) AS total'), true);
  assert.match(calls[0][0], /ki\.tgl_masuk BETWEEN \? AND \?/);
  assert.match(calls[0][0], /ki\.stts_pulang = \?/);
  assert.match(calls[0][0], /r\.status_bayar LIKE \?/);
  assert.match(calls[0][0], /b\.nm_bangsal LIKE \?/);
  assert.deepEqual(calls[0][1].slice(0, 5), ['2026-01-01', '2026-01-31', '-', '%Belum Bayar%', '%Melati%']);
  assert.equal(calls[0][1].length, 18);
  assert.ok(calls[0][1].slice(5).every((nilai) => nilai === '%ani%'));
  assert.match(calls[1][0], /ORDER BY b\.nm_bangsal, ki\.tgl_masuk, ki\.jam_masuk\s+LIMIT \?/);
  assert.deepEqual(calls[1][1].slice(-1), [25]);
});

test('mode belum pulang tidak memakai tanggal', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/rawat-inap?mode=belum&tanggal_mulai=2020-01-01'));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /ki\.stts_pulang = '-'/);
  assert.doesNotMatch(calls[0][0], /BETWEEN/);
  assert.deepEqual(calls[0][1], []);
});

test('tanpa mode API memakai default belum pulang', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/rawat-inap'));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /ki\.stts_pulang = '-'/);
  assert.doesNotMatch(calls[0][0], /BETWEEN/);
});

test('filter rawat inap tidak valid ditolak tanpa query database', async () => {
  const kasus = [
    'mode=lain',
    'status_bayar=Lunas',
    'status_pulang=Hilang',
    'mode=masuk',
    'mode=masuk&tanggal_mulai=2026-02-30&tanggal_selesai=2026-02-28',
    'mode=pulang&tanggal_mulai=2026-02-02&tanggal_selesai=2026-02-01',
    `bangsal=${'x'.repeat(101)}`,
    'limit=101',
  ];
  for (const query of kasus) {
    const { api, calls } = handler();
    assert.equal((await api.GET(new NextRequest(`http://localhost/api/rawat-inap?${query}`))).status, 400, query);
    assert.equal(calls.length, 0, query);
  }
});

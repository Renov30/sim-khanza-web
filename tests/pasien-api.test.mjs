import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

function handler({ total = 250, denied = false } = {}) {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total }];
        return [{ no_rkm_medis: '000001', nm_pasien: 'Pasien Uji' }];
      },
      pool: { getConnection: async () => { throw new Error('Tidak dipakai oleh GET'); } },
    },
    '@/lib/pasien/access': {
      patientAccess: async () => denied
        ? NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 403 })
        : null,
    },
    '@/lib/pasien/save': { savePatient: async () => undefined },
    '@/lib/pasien/numbering': {
      getNextPatientNumber: async () => '000001',
      updateLastPatientNumber: async () => undefined,
    },
    '@/lib/registrasi/validation': { RegistrationError: class RegistrationError extends Error {} },
  };
  const file = resolve('src/app/api/pasien/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

test('data pasien menghitung total dan menerapkan pagination server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/pasien?cari=ani&page=3&limit=100';
  const res = await api.GET(new NextRequest(url));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.total, 250);
  assert.equal(result.page, 3);
  assert.equal(result.limit, 100);
  assert.match(calls[0][0], /^SELECT COUNT\(\*\) AS total FROM pasien p/);
  assert.deepEqual(calls[0][1], Array(5).fill('%ani%'));
  assert.match(calls[1][0], /ORDER BY p\.no_rkm_medis DESC\s+LIMIT \? OFFSET \?/);
  assert.deepEqual(calls[1][1].slice(-2), [100, 200]);
});

test('halaman pasien yang melewati total dikoreksi ke halaman terakhir', async () => {
  const { api, calls } = handler({ total: 150 });
  const res = await api.GET(new NextRequest('http://localhost/api/pasien?page=3&limit=100'));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.page, 2);
  assert.deepEqual(calls.at(-1)[1], [100, 100]);
});

test('filter pagination pasien tidak valid ditolak sebelum query', async () => {
  for (const query of ['page=0', 'page=1.5', 'page=1000001', 'limit=0', 'limit=201', `cari=${'x'.repeat(101)}`]) {
    const { api, calls } = handler();
    const res = await api.GET(new NextRequest(`http://localhost/api/pasien?${query}`));
    assert.equal(res.status, 400, query);
    assert.equal(calls.length, 0, query);
  }
});

test('data pasien tetap menolak akses sebelum query database', async () => {
  const { api, calls } = handler({ denied: true });
  const res = await api.GET(new NextRequest('http://localhost/api/pasien?page=1'));
  assert.equal(res.status, 403);
  assert.equal(calls.length, 0);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

function loadTs(file, mocks, cache) {
  if (cache.has(file)) return cache.get(file).exports;
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  cache.set(file, mod);
  mod.require = (id) => {
    if (mocks[id]) return mocks[id];
    if (id.startsWith('@/')) {
      const target = resolve(process.cwd(), 'src', id.slice(2));
      const candidates = [`${target}.ts`, `${target}.tsx`, resolve(target, 'index.ts')];
      const ditemukan = candidates.find((candidate) => existsSync(candidate));
      if (ditemukan) return loadTs(ditemukan, mocks, cache);
    }
    return load(id);
  };
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText, file);
  return mod.exports;
}

const poliklinik = {
  kd_poli: 'U0100',
  nm_poli: 'Poli Sintetis',
  registrasi: 20000,
  registrasilama: 10000,
  status: '1',
};

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 6 }];
        return [{
          kd_poli: poliklinik.kd_poli,
          nm_poli: poliklinik.nm_poli,
          registrasi: poliklinik.registrasi,
          registrasilama: poliklinik.registrasilama,
          status: poliklinik.status,
        }];
      },
      pool: {
        getConnection: async () => ({
          beginTransaction: async () => calls.push(['BEGIN']),
          commit: async () => calls.push(['COMMIT']),
          rollback: async () => calls.push(['ROLLBACK']),
          release: () => calls.push(['RELEASE']),
          destroy: () => calls.push(['DESTROY']),
          execute: async (sql, params) => {
            calls.push([sql, params]);
            if (/^SELECT GET_LOCK/.test(sql)) return [[{ acquired: opsi.lock === false ? 0 : 1 }], []];
            if (/^SELECT RELEASE_LOCK/.test(sql)) return [[{ released: 1 }], []];
            if (/^SELECT IFNULL\(MAX\(/.test(sql)) return [[{ terakhir: 99 }], []];
            if (opsi.duplikat && /^INSERT INTO poliklinik/.test(sql)) {
              throw new Error('Duplicate entry for key PRIMARY');
            }
            return [{ affectedRows: opsi.affected ?? 1 }, []];
          },
        }),
      },
    },
    '@/lib/poliklinik/access': {
      poliklinikAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/poliklinik/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function optionsHandler({ denied } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/poliklinik/options/route.ts'), mocksDasar(denied, calls), new Map());
  return { api, calls };
}

function request(method, isi, url = 'http://localhost/api/poliklinik') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(url, opsi);
}

for (const code of [401, 403]) {
  test(`poliklinik menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest('http://localhost/api/poliklinik'));
    assert.equal(daftar.status, code);
    const simpan = await api.POST(request('POST', poliklinik));
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar poliklinik difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/poliklinik?cari=Sintetis&status=1&page=2&limit=25';
  const respons = await api.GET(new NextRequest(url));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.total, 6);
  assert.equal(hasil.halaman, 2);
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], ['%Sintetis%', '%Sintetis%', '1']);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY kd_poli ASC/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [25, 25]);
});

test('status semua poliklinik tidak menyertakan syarat status', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/poliklinik?cari=Sintetis&status=semua'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], ['%Sintetis%', '%Sintetis%']);
});

test('simpan poliklinik memakai lock, nomor U empat digit, dan status aktif', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', { ...poliklinik, kd_poli: '' }));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.data.kd_poli, 'U0100');
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /^SELECT GET_LOCK/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /^SELECT RELEASE_LOCK/.test(sql)));
  const kode = calls.find(([sql]) => typeof sql === 'string' && /^SELECT IFNULL\(MAX\(/.test(sql));
  assert.deepEqual(kode[1], ['^U[0-9]{4}$']);
  const simpan = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO poliklinik/.test(sql));
  assert.equal(simpan[1][0], 'U0100');
  assert.equal(simpan[1][3], 10000);
  assert.match(simpan[0], /'1'\)$/);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('gagal mengunci penomoran poliklinik menghasilkan 409 tanpa transaksi', async () => {
  const { api, calls } = handler({ lock: false });
  const respons = await api.POST(request('POST', poliklinik));
  assert.equal(respons.status, 409);
  assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
});

test('simpan poliklinik menolak isian tidak valid tanpa transaksi', async () => {
  for (const perubahan of [{ nm_poli: '' }, { registrasi: 'abc' }, { registrasilama: '-1' }]) {
    const { api, calls } = handler();
    const respons = await api.POST(request('POST', { ...poliklinik, kd_poli: '', ...perubahan }));
    assert.equal(respons.status, 400);
    assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
  }
});

test('duplikat kode poliklinik menghasilkan 409 dan rollback', async () => {
  const { api, calls } = handler({ duplikat: true });
  const respons = await api.POST(request('POST', { ...poliklinik, kd_poli: '' }));
  assert.equal(respons.status, 409);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('ubah poliklinik memakai kd_lama dan rollback saat data tidak ditemukan', async () => {
  const sukses = handler();
  const responsSukses = await sukses.api.PUT(request('PUT', { ...poliklinik, kd_lama: 'U0099' }));
  assert.equal(responsSukses.status, 200);
  const update = sukses.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE poliklinik SET/.test(sql));
  assert.match(update[0], /WHERE kd_poli = \?/);
  assert.equal(update[1].at(-1), 'U0099');
  assert.ok(sukses.calls.some(([marker]) => marker === 'COMMIT'));

  const gagal = handler({ affected: 0 });
  const responsGagal = await gagal.api.PUT(request('PUT', { ...poliklinik, kd_lama: 'U0099' }));
  assert.equal(responsGagal.status, 404);
  assert.ok(gagal.calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('hapus lunak poliklinik menulis status 0 dan patch memulihkan status 1', async () => {
  const hapus = handler();
  const responsHapus = await hapus.api.DELETE(new NextRequest(`http://localhost/api/poliklinik?kd_poli=${poliklinik.kd_poli}`));
  assert.equal(responsHapus.status, 200);
  const updateHapus = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE poliklinik SET status/.test(sql));
  assert.deepEqual(updateHapus[1], ['0', poliklinik.kd_poli]);

  const pulihkan = handler();
  const responsPulihkan = await pulihkan.api.PATCH(request('PATCH', { kd_poli: poliklinik.kd_poli, status: '1' }));
  assert.equal(responsPulihkan.status, 200);
  const updateAktif = pulihkan.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE poliklinik SET status/.test(sql));
  assert.deepEqual(updateAktif[1], ['1', poliklinik.kd_poli]);
});

test('patch menolak status poliklinik di luar allowlist', async () => {
  const { api, calls } = handler();
  const respons = await api.PATCH(request('PATCH', { kd_poli: poliklinik.kd_poli, status: 'HAPUS' }));
  assert.equal(respons.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE poliklinik/.test(sql)));
});

test('opsi poliklinik menyediakan status aktif dan nonaktif', async () => {
  const { api } = optionsHandler();
  const respons = await api.GET();
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.deepEqual(hasil.data.status.map((item) => item.id), ['1', '0']);
});

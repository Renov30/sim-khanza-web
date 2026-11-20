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

const barang = {
  kode_brng: 'B000000042',
  nama_brng: 'Paracetamol 500 mg',
  kode_satbesar: 'BOX',
  kode_sat: 'TAB',
  letak_barang: 'Parasetamol',
  dasar: 1000,
  h_beli: 1200,
  ralan: 2400,
  kelas1: 2500,
  kelas2: 2500,
  kelas3: 2500,
  utama: 2300,
  vip: 2600,
  vvip: 2700,
  beliluar: 2400,
  jualbebas: 2500,
  karyawan: 2000,
  stokminimal: 10,
  kdjns: 'A01',
  isi: 100,
  kapasitas: 1,
  expire: '2027-01-01',
  kode_industri: 'IF001',
  kode_kategori: 'K001',
  kode_golongan: 'G001',
};

function handler({ denied, lock = 1, affected = 1 } = {}) {
  const calls = [];
  const cache = new Map();
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    destroy: () => calls.push(['DESTROY']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/GET_LOCK/.test(sql)) return [[{ acquired: lock }], []];
      if (/RELEASE_LOCK/.test(sql)) return [[{ released: 1 }], []];
      if (/IFNULL\(MAX\(CONVERT\(RIGHT\(kode_brng/.test(sql)) return [[{ terakhir: 41 }], []];
      return [{ affectedRows: affected }, []];
    },
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 75 }];
        return [{
          kode_brng: 'B000000042',
          nama_brng: 'Paracetamol 500 mg',
          status: '1',
        }];
      },
      pool: { getConnection: async () => connection },
    },
    '@/lib/farmasi/access': {
      masterObatAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
  const api = loadTs(resolve('src/app/api/farmasi/master-obat/route.ts'), mocks, cache);
  return { api, calls };
}

function requestBarang(method, isi = barang) {
  return new NextRequest('http://localhost/api/farmasi/master-obat', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isi),
  });
}

for (const code of [401, 403]) {
  test(`master obat menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/master-obat'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar master obat difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/master-obat?cari=Para&kategori=K001&status=1&page=2&limit=50'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.total, 75);
  assert.equal(json.halaman, 2);
  const count = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT/.test(sql));
  assert.deepEqual(count[1], ['%Para%', '%Para%', '%Para%', 'K001', '1']);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY d.nama_brng ASC/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [50, 50]);
});

test('status tidak valid jatuh ke filter aktif', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/farmasi/master-obat?status=hapus'));
  const count = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT/.test(sql));
  assert.deepEqual(count[1], ['1']);
});

test('simpan membuat kode server, memakai named lock, dan commit', async () => {
  const { api, calls } = handler();
  const payload = { ...barang };
  delete payload.kode_brng;
  const response = await api.POST(requestBarang('POST', payload));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.data.kode_brng, 'B000000042');
  assert.ok(calls.some(([sql, params]) => typeof sql === 'string' && /GET_LOCK/.test(sql) && params[0] === 'khanza-web:master-obat:kode'));
  const insert = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO databarang/.test(sql));
  assert.equal(insert[1][0], 'B000000042');
  assert.equal(insert[1][22], '1');
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /RELEASE_LOCK/.test(sql)));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('simpan menolak isian wajib yang kosong dan tetap melepas lock', async () => {
  const { api, calls } = handler();
  const response = await api.POST(requestBarang('POST', { ...barang, nama_brng: '' }));
  assert.equal(response.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^INSERT INTO databarang/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /RELEASE_LOCK/.test(sql)));
});

test('expire dinonaktifkan ditulis null', async () => {
  const { api, calls } = handler();
  const response = await api.POST(requestBarang('POST', { ...barang, expire: '0000-00-00' }));
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO databarang/.test(sql));
  assert.equal(insert[1][21], null);
});

test('expire dengan tanggal kalender tidak valid ditolak', async () => {
  const { api, calls } = handler();
  const response = await api.POST(requestBarang('POST', { ...barang, expire: '2027-02-31' }));
  assert.equal(response.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^INSERT INTO databarang/.test(sql)));
});

test('kunci lock gagal ditolak sebelum penomoran', async () => {
  const { api, calls } = handler({ lock: 0 });
  const response = await api.POST(requestBarang('POST'));
  assert.equal(response.status, 409);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO databarang/.test(sql)));
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /RELEASE_LOCK/.test(sql)));
});

test('ubah tidak mengganti kode barang dan memakai transaksi', async () => {
  const { api, calls } = handler();
  const response = await api.PUT(requestBarang('PUT'));
  assert.equal(response.status, 200);
  const update = calls.find(([sql]) => typeof sql === 'string' && /^UPDATE databarang SET/.test(sql));
  assert.match(update[0], /WHERE kode_brng = \?/);
  assert.equal(update[1].at(-1), 'B000000042');
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
});

test('ubah rollback bila barang tidak ditemukan', async () => {
  const { api, calls } = handler({ affected: 0 });
  const response = await api.PUT(requestBarang('PUT'));
  assert.equal(response.status, 404);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
  assert.ok(!calls.some(([marker]) => marker === 'COMMIT'));
});

test('hapus lunak menulis status 0 dan pulihkan menulis status 1', async () => {
  const hapus = handler();
  const responsHapus = await hapus.api.DELETE(new NextRequest('http://localhost/api/farmasi/master-obat?kode_brng=B000000042'));
  assert.equal(responsHapus.status, 200);
  const updateHapus = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE databarang SET status/.test(sql));
  assert.deepEqual(updateHapus[1], ['0', 'B000000042']);

  const pulihkan = handler();
  const responsPulihkan = await pulihkan.api.PATCH(requestBarang('PATCH', { kode_brng: 'B000000042', status: '1' }));
  assert.equal(responsPulihkan.status, 200);
  const updatePulihkan = pulihkan.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE databarang SET status/.test(sql));
  assert.deepEqual(updatePulihkan[1], ['1', 'B000000042']);
});

test('status selain 0 dan 1 ditolak', async () => {
  const { api, calls } = handler();
  const response = await api.PATCH(requestBarang('PATCH', { kode_brng: 'B000000042', status: '2' }));
  assert.equal(response.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE databarang SET status/.test(sql)));
});

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

const dokter = {
  kd_dokter: 'D0000006',
  nm_dokter: 'Dokter Sintetis',
  jk: 'P',
  gol_drh: 'O',
  agama: 'ISLAM',
  stts_nikah: 'MENIKAH',
  tmp_lahir: 'Merauke',
  tgl_lahir: '1980-05-20',
  almt_tgl: 'Jl. Dokter No. 2',
  no_telp: '081234567891',
  email: 'dokter.sintetis@example.test',
  kd_sps: 'S1',
  alumni: 'Universitas Sintetis',
  no_ijn_praktek: 'SI-123',
};

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 8 }];
        return [{
          kd_dokter: dokter.kd_dokter,
          nm_dokter: dokter.nm_dokter,
          kd_sps: dokter.kd_sps,
          nm_sps: 'Umum',
          status: '1',
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
            if (/^SELECT IFNULL\(MAX\(/.test(sql)) return [[{ terakhir: 5 }], []];
            if (opsi.duplikat && /^INSERT INTO dokter/.test(sql)) {
              throw new Error('Duplicate entry for key PRIMARY');
            }
            return [{ affectedRows: opsi.affected ?? 1 }, []];
          },
        }),
      },
    },
    '@/lib/kepegawaian/access': {
      dokterAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/dokter/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function optionsHandler({ denied } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/dokter/options/route.ts'), mocksDasar(denied, calls), new Map());
  return { api, calls };
}

function request(method, isi, url = 'http://localhost/api/dokter') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(url, opsi);
}

for (const code of [401, 403]) {
  test(`dokter menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest('http://localhost/api/dokter'));
    assert.equal(daftar.status, code);
    const simpan = await api.POST(request('POST', dokter));
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar dokter difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/dokter?cari=Sintetis&jk=P&gol_drh=O&stts_nikah=MENIKAH&kd_sps=S1&page=2&limit=25';
  const respons = await api.GET(new NextRequest(url));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.total, 8);
  assert.equal(hasil.halaman, 2);
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], [
    ...Array(11).fill('%Sintetis%'),
    'P', 'O', 'MENIKAH', '1',
  ]);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY d\.kd_dokter ASC/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [25, 25]);
});

test('status semua dokter tidak menyertakan parameter status', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/dokter?status=semua'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], []);
});

test('simpan dokter memakai lock, nomor otomatis, cermin pegawai, dan status aktif', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', { ...dokter, kd_dokter: '' }));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.data.kd_dokter, 'D0000006');
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /^SELECT GET_LOCK/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /^SELECT RELEASE_LOCK/.test(sql)));
  const pegawai = calls.find(([sql]) => typeof sql === 'string' && /^INSERT IGNORE INTO pegawai/.test(sql));
  assert.equal(pegawai[1][0], 'D0000006');
  assert.equal(pegawai[1][2], 'Wanita');
  const simpan = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO dokter/.test(sql));
  assert.equal(simpan[1][0], 'D0000006');
  assert.match(simpan[0], /'1'\)$/);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('gagal mengunci penomoran dokter menghasilkan 409 tanpa transaksi', async () => {
  const { api, calls } = handler({ lock: false });
  const respons = await api.POST(request('POST', dokter));
  assert.equal(respons.status, 409);
  assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
});

test('simpan dokter menolak isian tidak valid tanpa transaksi', async () => {
  for (const perubahan of [{ jk: 'X' }, { tgl_lahir: '1980-13-01' }, { nm_dokter: '' }, { kd_sps: '' }]) {
    const { api, calls } = handler();
    const respons = await api.POST(request('POST', { ...dokter, ...perubahan, kd_dokter: '' }));
    assert.equal(respons.status, 400);
    assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
  }
});

test('duplikat kode dokter menghasilkan 409 dan rollback', async () => {
  const { api, calls } = handler({ duplikat: true });
  const respons = await api.POST(request('POST', { ...dokter, kd_dokter: '' }));
  assert.equal(respons.status, 409);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('ubah dokter memakai kd_lama dan rollback saat data tidak ditemukan', async () => {
  const sukses = handler();
  const responsSukses = await sukses.api.PUT(request('PUT', { ...dokter, kd_lama: dokter.kd_dokter }));
  assert.equal(responsSukses.status, 200);
  const update = sukses.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE dokter SET/.test(sql));
  assert.match(update[0], /WHERE kd_dokter = \?/);
  assert.equal(update[1].at(-1), dokter.kd_dokter);
  assert.ok(sukses.calls.some(([marker]) => marker === 'COMMIT'));

  const gagal = handler({ affected: 0 });
  const responsGagal = await gagal.api.PUT(request('PUT', { ...dokter, kd_lama: dokter.kd_dokter }));
  assert.equal(responsGagal.status, 404);
  assert.ok(gagal.calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('hapus lunak dokter menulis status 0 dan pulihkan menulis status pegawai', async () => {
  const hapus = handler();
  const responsHapus = await hapus.api.DELETE(new NextRequest(`http://localhost/api/dokter?kd_dokter=${dokter.kd_dokter}`));
  assert.equal(responsHapus.status, 200);
  const updateHapus = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE dokter SET status/.test(sql));
  assert.deepEqual(updateHapus[1], ['0', dokter.kd_dokter]);
  const pegawaiKeluar = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql));
  assert.deepEqual(pegawaiKeluar[1], ['KELUAR', dokter.kd_dokter]);

  const pulihkan = handler();
  const responsPulihkan = await pulihkan.api.PATCH(request('PATCH', { kd_dokter: dokter.kd_dokter, status: '1' }));
  assert.equal(responsPulihkan.status, 200);
  const updateAktif = pulihkan.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql));
  assert.deepEqual(updateAktif[1], ['AKTIF', dokter.kd_dokter]);
});

test('patch menolak status dokter di luar allowlist', async () => {
  const { api, calls } = handler();
  const respons = await api.PATCH(request('PATCH', { kd_dokter: dokter.kd_dokter, status: 'HAPUS' }));
  assert.equal(respons.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE dokter/.test(sql)));
});

test('opsi dokter menyediakan spesialis dan enum', async () => {
  const { api } = optionsHandler();
  const respons = await api.GET();
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.deepEqual(hasil.data.jenisKelamin.map((item) => item.id), ['L', 'P']);
  assert.deepEqual(hasil.data.golonganDarah.map((item) => item.id), ['A', 'B', 'O', 'AB', '-']);
  assert.equal(hasil.data.spesialis[0].label, 'S1 Umum');
});

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

const pegawai = {
  nik: '0000000000000000',
  nama: 'Pegawai Sintetis',
  jk: 'Pria',
  jbtn: 'Staf',
  jnj_jabatan: 'J1',
  kode_kelompok: 'K1',
  kode_resiko: 'R1',
  kode_emergency: 'E1',
  departemen: 'DEP1',
  bidang: 'Umum',
  stts_wp: 'WP1',
  stts_kerja: 'SK1',
  npwp: '000000000000000',
  pendidikan: 'D3',
  gapok: 0,
  tmp_lahir: 'Merauke',
  tgl_lahir: '1987-01-01',
  alamat: 'Jl. Sintetis No. 1',
  kota: 'Merauke',
  mulai_kerja: '2020-01-01',
  ms_kerja: 'FT>1',
  indexins: 'DEP1',
  bpd: 'Bank Sintetis',
  rekening: '0000000001',
  stts_aktif: 'AKTIF',
  wajibmasuk: 0,
  no_ktp: '',
  mulai_kontrak: '',
};

function mocksDasar(denied, calls) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 12 }];
        return [{
          id: 137,
          nik: pegawai.nik,
          nama: pegawai.nama,
          stts_aktif: 'AKTIF',
        }];
      },
      pool: {
        getConnection: async () => ({
          beginTransaction: async () => calls.push(['BEGIN']),
          commit: async () => calls.push(['COMMIT']),
          rollback: async () => calls.push(['ROLLBACK']),
          release: () => calls.push(['RELEASE']),
          execute: async (sql, params) => {
            calls.push([sql, params]);
            if (/^INSERT INTO pegawai/.test(sql)) return [{ insertId: 137, affectedRows: 1 }, []];
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
    '@/lib/kepegawaian/access': {
      pegawaiAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ denied, affected = 1 } = {}) {
  const calls = [];
  const cache = new Map();
  const mocks = mocksDasar(denied, calls);
  if (affected === 0) {
    mocks['@/lib/db'].pool.getConnection = async () => ({
      beginTransaction: async () => calls.push(['BEGIN']),
      commit: async () => calls.push(['COMMIT']),
      rollback: async () => calls.push(['ROLLBACK']),
      release: () => calls.push(['RELEASE']),
      execute: async (sql, params) => {
        calls.push([sql, params]);
        return [{ affectedRows: 0 }, []];
      },
    });
  }
  const api = loadTs(resolve('src/app/api/pegawai/route.ts'), mocks, cache);
  return { api, calls };
}

function optionsHandler({ denied } = {}) {
  const calls = [];
  const cache = new Map();
  const api = loadTs(resolve('src/app/api/pegawai/options/route.ts'), mocksDasar(denied, calls), cache);
  return { api, calls };
}

function request(method, isi, url = 'http://localhost/api/pegawai') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(url, opsi);
}

for (const code of [401, 403]) {
  test(`pegawai menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest('http://localhost/api/pegawai'));
    assert.equal(daftar.status, code);
    const simpan = await api.POST(request('POST', pegawai));
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar pegawai difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/pegawai?cari=Sari&departemen=DEP1&jnj_jabatan=J1&page=2&limit=25';
  const respons = await api.GET(new NextRequest(url));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.total, 12);
  assert.equal(hasil.halaman, 2);
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], ['%Sari%', '%Sari%', '%Sari%', '%Sari%', '%Sari%', '%Sari%', '%Sari%', 'DEP1', 'J1', 'AKTIF']);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY p\.nama ASC/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [25, 25]);
  assert.match(daftar[0], /no_ktp/);
  assert.ok(!/p\.photo/.test(daftar[0]));
});

test('status semua tidak menyertakan parameter status', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/pegawai?status=semua'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], []);
});

test('status tidak valid jatuh ke filter aktif', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/pegawai?status=hapus'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], ['AKTIF']);
});

test('simpan memakai id auto increment dan mengisi nilai bawaan', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', pegawai));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.data.id, 137);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO pegawai/.test(sql));
  assert.ok(insert);
  assert.ok(!/^\(id,/.test(insert[0].slice(insert[0].indexOf('('))));
  assert.equal(insert[1][0], pegawai.nik);
  assert.equal(insert[1][24], 'AKTIF');
  assert.equal(insert[1][25], 0);
  assert.equal(insert[1][26], 0);
  assert.equal(insert[1][27], 0);
  assert.equal(insert[1][28], null);
  assert.equal(insert[1][29], 0);
  assert.equal(insert[1][30], 0);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('simpan menolak enum dan tanggal tidak valid tanpa transaksi', async () => {
  for (const perubahan of [{ jk: 'X' }, { tgl_lahir: '1987-02-31' }, { nama: '' }]) {
    const { api, calls } = handler();
    const respons = await api.POST(request('POST', { ...pegawai, ...perubahan }));
    assert.equal(respons.status, 400);
    assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^INSERT INTO pegawai/.test(sql)));
    assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
  }
});

test('ubah memperbarui berdasarkan id dan rollback saat data tidak ditemukan', async () => {
  const sukses = handler();
  const responsSukses = await sukses.api.PUT(request('PUT', { ...pegawai, id: 137 }));
  assert.equal(responsSukses.status, 200);
  const update = sukses.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET/.test(sql));
  assert.match(update[0], /WHERE id = \?/);
  assert.equal(update[1].at(-1), 137);
  assert.ok(sukses.calls.some(([marker]) => marker === 'COMMIT'));

  const gagal = handler({ affected: 0 });
  const responsGagal = await gagal.api.PUT(request('PUT', { ...pegawai, id: 999 }));
  assert.equal(responsGagal.status, 404);
  assert.ok(gagal.calls.some(([marker]) => marker === 'ROLLBACK'));
  assert.ok(!gagal.calls.some(([marker]) => marker === 'COMMIT'));
});

test('hapus lunak menulis KELUAR dan pulihkan menulis status pilihan', async () => {
  const hapus = handler();
  const responsHapus = await hapus.api.DELETE(new NextRequest('http://localhost/api/pegawai?id=137'));
  assert.equal(responsHapus.status, 200);
  const updateHapus = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql));
  assert.deepEqual(updateHapus[1], ['KELUAR', 137]);

  const pulihkan = handler();
  const responsPulihkan = await pulihkan.api.PATCH(request('PATCH', { id: 137, status: 'AKTIF' }));
  assert.equal(responsPulihkan.status, 200);
  const updatePulihkan = pulihkan.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql));
  assert.deepEqual(updatePulihkan[1], ['AKTIF', 137]);
});

test('patch menolak status di luar allowlist', async () => {
  const { api, calls } = handler();
  const respons = await api.PATCH(request('PATCH', { id: 137, status: 'HAPUS' }));
  assert.equal(respons.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE pegawai/.test(sql)));
});

test('opsi pegawai menyediakan daftar master dan enum', async () => {
  const { api } = optionsHandler();
  const respons = await api.GET();
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.deepEqual(hasil.data.status.map((item) => item.id), ['AKTIF', 'CUTI', 'KELUAR', 'TENAGA LUAR', 'NON AKTIF']);
  assert.deepEqual(hasil.data.jenisKelamin.map((item) => item.id), ['Pria', 'Wanita']);
  assert.deepEqual(hasil.data.masaKerja.map((item) => item.id), ['<1', 'PT', 'FT>1']);
});

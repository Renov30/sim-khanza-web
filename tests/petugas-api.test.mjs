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

const petugas = {
  nip: '0000000000000000',
  nama: 'Petugas Sintetis',
  jk: 'L',
  gol_darah: 'A',
  agama: 'ISLAM',
  stts_nikah: 'MENIKAH',
  tmp_lahir: 'Merauke',
  tgl_lahir: '1987-01-01',
  alamat: 'Jl. Sintetis No. 1',
  kd_jbtn: 'J1',
  no_telp: '081234567890',
  email: 'petugas.sintetis@example.test',
};

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 12 }];
        return [{
          nip: petugas.nip,
          nama: petugas.nama,
          jk: petugas.jk,
          kd_jbtn: petugas.kd_jbtn,
          nm_jbtn: 'Staf',
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
            if (opsi.duplikat && /^INSERT INTO petugas/.test(sql)) {
              throw new Error('Duplicate entry for key PRIMARY');
            }
            return [{ affectedRows: opsi.affected ?? 1 }, []];
          },
        }),
      },
    },
    '@/lib/kepegawaian/access': {
      petugasAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/petugas/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function optionsHandler({ denied } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/petugas/options/route.ts'), mocksDasar(denied, calls), new Map());
  return { api, calls };
}

function request(method, isi, url = 'http://localhost/api/petugas') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(url, opsi);
}

for (const code of [401, 403]) {
  test(`petugas menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest('http://localhost/api/petugas'));
    assert.equal(daftar.status, code);
    const simpan = await api.POST(request('POST', petugas));
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar petugas difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/petugas?cari=Merauke&jk=L&gol_darah=A&stts_nikah=MENIKAH&page=2&limit=25';
  const respons = await api.GET(new NextRequest(url));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.total, 12);
  assert.equal(hasil.halaman, 2);
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], [
    ...Array(8).fill('%Merauke%'),
    'L', 'A', 'MENIKAH', '1',
  ]);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY p\.nip ASC/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [25, 25]);
});

test('status semua petugas tidak menyertakan parameter status', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/petugas?status=semua'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], []);
});

test('simpan petugas mencerminkan data ke pegawai dan menulis status aktif', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', petugas));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.data.nip, petugas.nip);
  const pegawai = calls.find(([sql]) => typeof sql === 'string' && /^INSERT IGNORE INTO pegawai/.test(sql));
  assert.equal(pegawai[1][0], petugas.nip);
  assert.equal(pegawai[1][2], 'Pria');
  const simpan = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO petugas/.test(sql));
  assert.equal(simpan[1].length, 12);
  assert.match(simpan[0], /'1'\)$/);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('simpan petugas menolak isian tidak valid tanpa transaksi', async () => {
  for (const perubahan of [{ jk: 'X' }, { tgl_lahir: '1987-02-31' }, { nama: '' }, { email: '' }]) {
    const { api, calls } = handler();
    const respons = await api.POST(request('POST', { ...petugas, ...perubahan }));
    assert.equal(respons.status, 400);
    assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^INSERT INTO petugas/.test(sql)));
    assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
  }
});

test('duplikat NIP petugas menghasilkan 409 dan rollback', async () => {
  const { api, calls } = handler({ duplikat: true });
  const respons = await api.POST(request('POST', petugas));
  assert.equal(respons.status, 409);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('ubah petugas memakai nip_lama dan rollback saat data tidak ditemukan', async () => {
  const sukses = handler();
  const responsSukses = await sukses.api.PUT(request('PUT', { ...petugas, nip_lama: petugas.nip }));
  assert.equal(responsSukses.status, 200);
  const update = sukses.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE petugas SET/.test(sql));
  assert.match(update[0], /WHERE nip = \?/);
  assert.equal(update[1].at(-1), petugas.nip);
  assert.ok(sukses.calls.some(([marker]) => marker === 'COMMIT'));

  const gagal = handler({ affected: 0 });
  const responsGagal = await gagal.api.PUT(request('PUT', { ...petugas, nip_lama: petugas.nip }));
  assert.equal(responsGagal.status, 404);
  assert.ok(gagal.calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('hapus lunak petugas menulis status 0 dan pulihkan mengaktifkan pegawai', async () => {
  const hapus = handler();
  const responsHapus = await hapus.api.DELETE(new NextRequest(`http://localhost/api/petugas?nip=${petugas.nip}`));
  assert.equal(responsHapus.status, 200);
  const updateHapus = hapus.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE petugas SET status/.test(sql));
  assert.deepEqual(updateHapus[1], ['0', petugas.nip]);
  assert.ok(!hapus.calls.some(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql)));

  const pulihkan = handler();
  const responsPulihkan = await pulihkan.api.PATCH(request('PATCH', { nip: petugas.nip, status: '1' }));
  assert.equal(responsPulihkan.status, 200);
  const updateAktif = pulihkan.calls.find(([sql]) => typeof sql === 'string' && /^UPDATE pegawai SET stts_aktif/.test(sql));
  assert.deepEqual(updateAktif[1], ['AKTIF', petugas.nip]);
});

test('patch menolak status petugas di luar allowlist', async () => {
  const { api, calls } = handler();
  const respons = await api.PATCH(request('PATCH', { nip: petugas.nip, status: 'HAPUS' }));
  assert.equal(respons.status, 400);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE petugas/.test(sql)));
});

test('opsi petugas menyediakan master dan enum', async () => {
  const { api } = optionsHandler();
  const respons = await api.GET();
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.deepEqual(hasil.data.jenisKelamin.map((item) => item.id), ['L', 'P']);
  assert.deepEqual(hasil.data.statusNikah.map((item) => item.id), ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO']);
  assert.equal(hasil.data.jabatan[0].label, 'J1 Staf');
});

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

const jadwal = {
  kd_dokter: 'D0000001',
  nm_dokter: 'Dokter Sintetis',
  hari_kerja: 'SENIN',
  jam_mulai: '08:00:00',
  jam_selesai: '10:00:00',
  kd_poli: 'U0001',
  nm_poli: 'Poli Sintetis',
  kuota: 30,
};

const isiValid = {
  kd_dokter: jadwal.kd_dokter,
  hari_kerja: jadwal.hari_kerja,
  jam_mulai: jadwal.jam_mulai,
  jam_selesai: jadwal.jam_selesai,
  kd_poli: jadwal.kd_poli,
  kuota: jadwal.kuota,
};

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 4 }];
        if (/^SELECT kd_dokter, nm_dokter FROM dokter/.test(sql)) {
          return [{ kd_dokter: jadwal.kd_dokter, nm_dokter: jadwal.nm_dokter }];
        }
        if (/^SELECT kd_poli, nm_poli FROM poliklinik/.test(sql)) {
          return [{ kd_poli: jadwal.kd_poli, nm_poli: jadwal.nm_poli }];
        }
        return [jadwal];
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
            if (opsi.duplikat && /^INSERT INTO jadwal/.test(sql)) {
              throw new Error('Duplicate entry for key PRIMARY');
            }
            if (opsi.relasi && /^(INSERT INTO|UPDATE) jadwal/.test(sql)) {
              throw new Error('foreign key constraint fails');
            }
            if (/^UPDATE jadwal/.test(sql)) {
              return [{ affectedRows: opsi.affectedUpdate ?? 1 }, []];
            }
            if (/^DELETE FROM jadwal/.test(sql)) {
              return [{ affectedRows: opsi.affectedDelete ?? 1 }, []];
            }
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
    '@/lib/jadwal-dokter/access': {
      jadwalDokterAccess: async () => denied
        ? NextResponse.json({ success: false }, { status: denied })
        : null,
    },
  };
}

function handler({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/jadwal-dokter/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function optionsHandler({ denied } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/jadwal-dokter/options/route.ts'), mocksDasar(denied, calls), new Map());
  return { api, calls };
}

function request(method, isi, path = 'http://localhost/api/jadwal-dokter') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(path, opsi);
}

const kunciLama = {
  kd_dokter_lama: 'D0000099',
  hari_kerja_lama: 'RABU',
  jam_mulai_lama: '07:30:00',
  jam_selesai_lama: '09:30:00',
};

for (const code of [401, 403]) {
  test(`jadwal dokter menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    assert.equal((await api.GET(new NextRequest('http://localhost/api/jadwal-dokter'))).status, code);
    assert.equal((await api.POST(request('POST', isiValid))).status, code);
    assert.equal((await api.PUT(request('PUT', { ...isiValid, ...kunciLama }))).status, code);
    assert.equal((await api.DELETE(request('DELETE', { items: [isiValid] }))).status, code);
    const opsi = optionsHandler({ denied: code });
    assert.equal((await opsi.api.GET()).status, code);
    assert.equal(calls.length, 0);
    assert.equal(opsi.calls.length, 0);
  });
}

test('daftar jadwal dokter difilter dan dipaginasi di server', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/jadwal-dokter?cari=Sintetis&kd_dokter=D0000001&kd_poli=U0001&hari_kerja=SENIN&page=2&limit=25';
  const respons = await api.GET(new NextRequest(url));
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.equal(hasil.total, 4);
  assert.equal(hasil.halaman, 2);
  assert.equal(hasil.data[0].kd_dokter, jadwal.kd_dokter);
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], [
    '%Sintetis%', '%Sintetis%', '%Sintetis%', '%Sintetis%',
    'D0000001', 'U0001', 'SENIN',
  ]);
  const daftar = calls.find(([sql]) => typeof sql === 'string' && /ORDER BY j\.kd_dokter/.test(sql));
  assert.match(daftar[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1].slice(-2), [25, 25]);
});

test('filter jadwal dokter di luar allowlist diabaikan', async () => {
  const { api, calls } = handler();
  await api.GET(new NextRequest('http://localhost/api/jadwal-dokter?cari=Sintetis&hari_kerja=MINGGU&kd_dokter=D000000000000000000000000&kd_poli=U000000'));
  const hitung = calls.find(([sql]) => typeof sql === 'string' && /^SELECT COUNT\(\*\)/.test(sql));
  assert.deepEqual(hitung[1], ['%Sintetis%', '%Sintetis%', '%Sintetis%', '%Sintetis%']);
});

test('simpan jadwal dokter menolak isian tidak valid tanpa transaksi', async () => {
  const perubahan = [
    { kd_dokter: '' },
    { hari_kerja: 'MINGGU' },
    { jam_mulai: '25:00:00' },
    { jam_selesai: '08:70:00' },
    { kd_poli: '' },
    { kuota: 'abcd' },
    { kuota: '10000' },
  ];
  for (const ubahan of perubahan) {
    const { api, calls } = handler();
    const respons = await api.POST(request('POST', { ...isiValid, ...ubahan }));
    assert.equal(respons.status, 400);
    assert.ok(!calls.some(([marker]) => marker === 'BEGIN'));
  }
});

test('simpan jadwal dokter menulis keenam kolom dan melakukan commit', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', isiValid));
  assert.equal(respons.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /^INSERT INTO jadwal/.test(sql));
  assert.deepEqual(insert[1], [
    'D0000001', 'SENIN', '08:00:00', '10:00:00', 'U0001', 30,
  ]);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('duplikat dan relasi jadwal dokter menghasilkan rollback', async () => {
  const duplikat = handler({ duplikat: true });
  const responsDuplikat = await duplikat.api.POST(request('POST', isiValid));
  assert.equal(responsDuplikat.status, 409);
  assert.ok(duplikat.calls.some(([marker]) => marker === 'ROLLBACK'));

  const relasi = handler({ relasi: true });
  const responsRelasi = await relasi.api.POST(request('POST', isiValid));
  assert.equal(responsRelasi.status, 400);
  assert.ok(relasi.calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('ganti jadwal dokter memakai kunci lama empat kolom', async () => {
  const { api, calls } = handler();
  const respons = await api.PUT(request('PUT', {
    ...isiValid,
    kd_dokter: 'D0000002',
    hari_kerja: 'SELASA',
    ...kunciLama,
  }));
  assert.equal(respons.status, 200);
  const update = calls.find(([sql]) => typeof sql === 'string' && /^UPDATE jadwal SET/.test(sql));
  assert.match(update[0], /WHERE kd_dokter = \? AND hari_kerja = \? AND jam_mulai = \? AND jam_selesai = \?/);
  assert.deepEqual(update[1].slice(-4), [
    'D0000099', 'RABU', '07:30:00', '09:30:00',
  ]);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
});

test('ganti jadwal dokter yang tidak ditemukan menghasilkan 404 dan rollback', async () => {
  const { api, calls } = handler({ affectedUpdate: 0 });
  const respons = await api.PUT(request('PUT', { ...isiValid, ...kunciLama }));
  assert.equal(respons.status, 404);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('hapus jadwal dokter berjalan dalam satu transaksi untuk banyak baris', async () => {
  const { api, calls } = handler();
  const respons = await api.DELETE(request('DELETE', {
    items: [
      { kd_dokter: 'D0000001', hari_kerja: 'SENIN', jam_mulai: '08:00:00' },
      { kd_dokter: 'D0000002', hari_kerja: 'RABU', jam_mulai: '13:00:00' },
    ],
  }));
  assert.equal(respons.status, 200);
  const hapus = calls.filter(([sql]) => typeof sql === 'string' && /^DELETE FROM jadwal/.test(sql));
  assert.equal(hapus.length, 2);
  assert.deepEqual(hapus[0][1], ['D0000001', 'SENIN', '08:00:00']);
  assert.deepEqual(hapus[1][1], ['D0000002', 'RABU', '13:00:00']);
  assert.equal(calls.filter(([marker]) => marker === 'BEGIN').length, 1);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
});

test('hapus jadwal dokter menolak daftar kosong dan melakukan rollback saat tidak ada baris', async () => {
  const kosong = handler();
  const responsKosong = await kosong.api.DELETE(request('DELETE', { items: [] }));
  assert.equal(responsKosong.status, 400);
  assert.ok(!kosong.calls.some(([marker]) => marker === 'BEGIN'));

  const gagal = handler({ affectedDelete: 0 });
  const responsGagal = await gagal.api.DELETE(request('DELETE', {
    items: [{ kd_dokter: 'D0000001', hari_kerja: 'SENIN', jam_mulai: '08:00:00' }],
  }));
  assert.equal(responsGagal.status, 404);
  assert.ok(gagal.calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('opsi jadwal dokter menyediakan dokter, poliklinik, hari, jam, menit, dan detik', async () => {
  const { api } = optionsHandler();
  const respons = await api.GET();
  const hasil = await respons.json();
  assert.equal(respons.status, 200);
  assert.deepEqual(hasil.data.dokter, [{ id: 'D0000001', label: 'D0000001 Dokter Sintetis' }]);
  assert.deepEqual(hasil.data.poliklinik, [{ id: 'U0001', label: 'U0001 Poli Sintetis' }]);
  assert.deepEqual(hasil.data.hariKerja.map((item) => item.id), [
    'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'AKHAD',
  ]);
  assert.equal(hasil.data.jam.length, 24);
  assert.equal(hasil.data.menit.length, 60);
  assert.equal(hasil.data.detik.length, 60);
  assert.equal(hasil.data.jam[0].id, '00');
  assert.equal(hasil.data.jam[23].id, '23');
});

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

function rowTarif(jenis) {
  return {
    kd_jenis_prw: jenis === 'ralan' ? 'RJ00001' : 'RI00001',
    nm_perawatan: 'Perawatan Sintetis',
    kd_kategori: '-',
    nm_kategori: 'Perawatan',
    material: 10,
    bhp: 20,
    tarif_tindakandr: 30,
    tarif_tindakanpr: 40,
    kso: 50,
    menejemen: 60,
    total_byrdr: 170,
    total_byrpr: 180,
    total_byrdrpr: 210,
    kd_pj: 'UM',
    png_jawab: 'Umum',
    unit: jenis === 'ralan' ? 'U0101' : 'B0101',
    nm_unit: jenis === 'ralan' ? 'Poli Sintetis' : 'Bangsal Sintetis',
    status: '1',
    kelas: 'Kelas 1',
  };
}

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push(['QUERY', sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 7 }];
        if (/FROM kategori_perawatan/.test(sql)) return [{ kd_kategori: '-', nm_kategori: 'Perawatan' }];
        if (/FROM penjab/.test(sql)) return [{ kd_pj: 'UM', png_jawab: 'Umum' }];
        if (/FROM poliklinik/.test(sql)) return [{ kd_poli: 'U0101', nm_poli: 'Poli Sintetis' }];
        if (/FROM bangsal/.test(sql)) return [{ kd_bangsal: 'B0101', nm_bangsal: 'Bangsal Sintetis' }];
        return [rowTarif(opsi.jenis || 'ralan')];
      },
      pool: {
        getConnection: async () => ({
          beginTransaction: async () => calls.push(['BEGIN']),
          commit: async () => calls.push(['COMMIT']),
          rollback: async () => calls.push(['ROLLBACK']),
          release: () => calls.push(['RELEASE']),
          destroy: () => calls.push(['DESTROY']),
          execute: async (sql, params) => {
            calls.push(['EXEC', sql, params]);
            if (/^SELECT GET_LOCK/.test(sql)) return [[{ acquired: opsi.lock === false ? 0 : 1 }], []];
            if (/^SELECT RELEASE_LOCK/.test(sql)) return [[{ released: 1 }], []];
            if (/^SELECT IFNULL\(MAX\(/.test(sql)) return [[{ terakhir: opsi.terakhir ?? 0 }], []];
            if (/^(INSERT INTO|UPDATE) jns_perawatan/.test(sql)) {
              if (opsi.relasi) throw new Error('foreign key constraint fails');
              if (opsi.duplikat && /^INSERT INTO/.test(sql)) throw new Error('Duplicate entry for key PRIMARY');
            }
            if (/^UPDATE jns_perawatan_inap SET status/.test(sql) && opsi.statusKosong) {
              return [{ affectedRows: 0 }, []];
            }
            if (/^UPDATE jns_perawatan SET status/.test(sql) && opsi.statusKosong) {
              return [{ affectedRows: 0 }, []];
            }
            if (/^UPDATE jns_perawatan_inap SET kd_jenis_prw/.test(sql) && opsi.affected === 0) {
              return [{ affectedRows: 0 }, []];
            }
            if (/^UPDATE jns_perawatan SET kd_jenis_prw/.test(sql) && opsi.affected === 0) {
              return [{ affectedRows: 0 }, []];
            }
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
    '@/lib/tarif-perawatan/access': {
      tarifRalanAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
      tarifRanapAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ jenis = 'ralan', denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve(`src/app/api/tarif-${jenis}/route.ts`), mocksDasar(denied, calls, { ...opsi, jenis }), new Map());
  return { api, calls };
}

function handlerOpsi({ jenis = 'ralan', denied } = {}) {
  const calls = [];
  const api = loadTs(resolve(`src/app/api/tarif-${jenis}/options/route.ts`), mocksDasar(denied, calls, { jenis }), new Map());
  return { api, calls };
}

function handlerKode({ jenis = 'ralan', denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve(`src/app/api/tarif-${jenis}/kode/route.ts`), mocksDasar(denied, calls, { ...opsi, jenis }), new Map());
  return { api, calls };
}

function request(method, isi, jenis = 'ralan') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(`http://localhost/api/tarif-${jenis}`, opsi);
}

function isiValid(jenis = 'ralan') {
  return {
    nm_perawatan: 'Perawatan Sintetis',
    kd_kategori: '-',
    kd_pj: 'UM',
    unit: jenis === 'ralan' ? 'U0101' : 'B0101',
    kelas: 'Kelas 1',
    material: 10,
    bhp: 20,
    tarif_tindakandr: 30,
    tarif_tindakanpr: 40,
    kso: 50,
    menejemen: 60,
  };
}

for (const jenis of ['ralan', 'ranap']) {
  for (const code of [401, 403]) {
    test(`tarif ${jenis} menolak akses ${code} sebelum query`, async () => {
      const { api, calls } = handler({ jenis, denied: code });
      const daftar = await api.GET(new NextRequest(`http://localhost/api/tarif-${jenis}`));
      assert.equal(daftar.status, code);
      const simpan = await api.POST(request('POST', isiValid(jenis), jenis), jenis);
      assert.equal(simpan.status, code);
      assert.equal(calls.length, 0);
    });
  }
}

test('daftar tarif ralan dan ranap difilter serta dipaginasi di server', async () => {
  const ralan = handler({ jenis: 'ralan' });
  const responsRalan = await ralan.api.GET(new NextRequest(
    'http://localhost/api/tarif-ralan?cari=Sintetis&status=1&kd_kategori=-&unit=U0101&page=2&limit=25',
  ));
  assert.equal(responsRalan.status, 200);
  const isiRalan = await responsRalan.json();
  assert.equal(isiRalan.total, 7);
  assert.equal(isiRalan.data[0].kd_jenis_prw, 'RJ00001');
  assert.ok(ralan.calls.some(([, sql]) => sql.includes('INNER JOIN poliklinik u')));
  assert.ok(ralan.calls.some(([, sql, params]) => sql.includes('u.nm_poli LIKE ?') && params.includes('%Sintetis%')));
  assert.ok(ralan.calls.some(([, sql]) => sql.includes('LIMIT ? OFFSET ?')));

  const ranap = handler({ jenis: 'ranap' });
  const responsRanap = await ranap.api.GET(new NextRequest(
    'http://localhost/api/tarif-ranap?cari=Sintetis&status=semua&kelas=Kelas%201&page=1&limit=50',
  ));
  assert.equal(responsRanap.status, 200);
  assert.ok(ranap.calls.some(([, sql]) => sql.includes('INNER JOIN bangsal u')));
  assert.ok(ranap.calls.some(([, sql, params]) => sql.includes('t.kelas = ?') && params.includes('Kelas 1')));
  assert.ok(!ranap.calls.some(([, sql]) => sql.includes('t.status = ?')));
});

test('simpan tarif membuat kode otomatis, menghitung total, dan melakukan commit', async () => {
  for (const [jenis, kode] of [['ralan', 'RJ00001'], ['ranap', 'RI00001']]) {
    const { api, calls } = handler({ jenis });
    const respons = await api.POST(request('POST', isiValid(jenis), jenis));
    assert.equal(respons.status, 200);
    const isi = await respons.json();
    assert.equal(isi.data.kd_jenis_prw, kode);
    assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT GET_LOCK')));
    assert.ok(calls.some(([label]) => label === 'BEGIN'));
    assert.ok(calls.some(([label]) => label === 'COMMIT'));
    assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT RELEASE_LOCK')));
    const insert = calls.find(([, sql]) => sql?.startsWith('INSERT INTO'));
    assert.ok(insert);
    assert.ok(insert[2].includes(kode));
    assert.ok(insert[2].includes(170));
    assert.ok(insert[2].includes(180));
    assert.ok(insert[2].includes(210));
    if (jenis === 'ranap') assert.ok(insert[2].includes('Kelas 1'));
  }
});

test('simpan tarif menolak isian tidak valid tanpa transaksi', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', { ...isiValid(), bhp: 'bukan angka' }));
  assert.equal(respons.status, 400);
  assert.equal(calls.some(([label]) => label === 'BEGIN'), false);
});

test('duplikat dan relasi tarif menghasilkan rollback', async () => {
  const duplikat = handler({ duplikat: true });
  const responDuplikat = await duplikat.api.POST(request('POST', isiValid()));
  assert.equal(responDuplikat.status, 409);
  assert.ok(duplikat.calls.some(([label]) => label === 'ROLLBACK'));

  const relasi = handler({ jenis: 'ranap', relasi: true });
  const responRelasi = await relasi.api.POST(request('POST', isiValid('ranap'), 'ranap'));
  assert.equal(responRelasi.status, 400);
  assert.ok(relasi.calls.some(([label]) => label === 'ROLLBACK'));
});

test('ganti tarif memakai kode lama dan rollback saat tidak ditemukan', async () => {
  const { api, calls } = handler();
  const respons = await api.PUT(request('PUT', {
    ...isiValid(),
    kd_jenis_prw: 'RJ00002',
    kd_jenis_prw_lama: 'RJ00001',
  }));
  assert.equal(respons.status, 200);
  const ubah = calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan SET'));
  assert.ok(ubah);
  assert.equal(ubah[2].at(-1), 'RJ00001');

  const gagal = handler({ affected: 0 });
  const responGagal = await gagal.api.PUT(request('PUT', {
    ...isiValid(),
    kd_jenis_prw_lama: 'RJ00001',
  }));
  assert.equal(responGagal.status, 404);
  assert.ok(gagal.calls.some(([label]) => label === 'ROLLBACK'));
});

test('hapus dan pulihkan tarif berjalan dalam transaksi', async () => {
  const hapus = handler({ jenis: 'ranap' });
  const responHapus = await hapus.api.DELETE(request('DELETE', {
    items: [{ kd_jenis_prw: 'RI00001' }, { kd_jenis_prw: 'RI00002' }],
  }, 'ranap'));
  assert.equal(responHapus.status, 200);
  const updateHapus = hapus.calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan_inap SET status'));
  assert.ok(updateHapus);
  assert.equal(updateHapus[2][0], '0');
  assert.deepEqual(updateHapus[2].slice(1), ['RI00001', 'RI00002']);

  const pulihkan = handler();
  const responPulihkan = await pulihkan.api.PATCH(request('PATCH', {
    status: '1',
    items: [{ kd_jenis_prw: 'RJ00001' }],
  }));
  assert.equal(responPulihkan.status, 200);
  const updatePulihkan = pulihkan.calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan SET status'));
  assert.equal(updatePulihkan[2][0], '1');

  const kosong = handler({ statusKosong: true });
  const responKosong = await kosong.api.PATCH(request('PATCH', {
    status: '1',
    items: [{ kd_jenis_prw: 'RJ00001' }],
  }));
  assert.equal(responKosong.status, 404);
  assert.ok(kosong.calls.some(([label]) => label === 'ROLLBACK'));
});

test('opsi tarif menyediakan kategori, penjab, unit, kelas, dan status', async () => {
  for (const jenis of ['ralan', 'ranap']) {
    const { api } = handlerOpsi({ jenis });
    const respons = await api.GET();
    assert.equal(respons.status, 200);
    const isi = await respons.json();
    assert.equal(isi.data.kategori[0].id, '-');
    assert.equal(isi.data.penjab[0].id, 'UM');
    assert.equal(isi.data.unit[0].label.includes('Sintetis'), true);
    assert.equal(isi.data.kelas.length > 0, jenis === 'ranap');
    assert.equal(isi.data.status.length, 2);
  }
});

test('kode tarif memakai lock dan mengembalikan prefiks yang sesuai', async () => {
  for (const [jenis, kode] of [['ralan', 'RJ00042'], ['ranap', 'RI00042']]) {
    const { api, calls } = handlerKode({ jenis, terakhir: 41 });
    const respons = await api.GET();
    assert.equal(respons.status, 200);
    const isi = await respons.json();
    assert.equal(isi.data.kd_jenis_prw, kode);
    assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT GET_LOCK')));
    assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT RELEASE_LOCK')));
  }

  const gagal = handlerKode({ lock: false });
  const respons = await gagal.api.GET();
  assert.equal(respons.status, 409);
});

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

function rowTarifLab() {
  return {
    kd_jenis_prw: 'J000042',
    nm_perawatan: 'Hematologi Sintetis',
    bagian_rs: 10,
    bhp: 20,
    tarif_perujuk: 30,
    tarif_tindakan_dokter: 40,
    tarif_tindakan_petugas: 50,
    kso: 60,
    menejemen: 70,
    total_byr: 280,
    kd_pj: 'UM',
    png_jawab: 'Umum',
    kelas: 'Kelas 1',
    kategori: 'PK',
    status: '1',
  };
}

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push(['QUERY', sql, params]);
        if (/^SELECT COUNT\(\*\)/.test(sql)) return [{ total: 7 }];
        if (/FROM penjab/.test(sql)) return [{ kd_pj: 'UM', png_jawab: 'Umum' }];
        return [rowTarifLab()];
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
            if (/^UPDATE jns_perawatan_lab SET status/.test(sql) && opsi.statusKosong) {
              return [{ affectedRows: 0 }, []];
            }
            if (/^UPDATE jns_perawatan_lab SET/.test(sql) && opsi.affected === 0) {
              return [{ affectedRows: 0 }, []];
            }
            if (/^(INSERT INTO|UPDATE) jns_perawatan_lab/.test(sql)) {
              if (opsi.relasi) throw new Error('foreign key constraint fails');
              if (opsi.duplikat && /^INSERT INTO/.test(sql)) throw new Error('Duplicate entry for key PRIMARY');
            }
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
    '@/lib/tarif-lab/access': {
      tarifLabAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
}

function handler({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/tarif-lab/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function handlerOpsi({ denied } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/tarif-lab/options/route.ts'), mocksDasar(denied, calls), new Map());
  return { api, calls };
}

function handlerKode({ denied, ...opsi } = {}) {
  const calls = [];
  const api = loadTs(resolve('src/app/api/tarif-lab/kode/route.ts'), mocksDasar(denied, calls, opsi), new Map());
  return { api, calls };
}

function request(method, isi, path = '/api/tarif-lab') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(`http://localhost${path}`, opsi);
}

function isiValid() {
  return {
    nm_perawatan: 'Hematologi Sintetis',
    bagian_rs: 10,
    bhp: 20,
    tarif_perujuk: 30,
    tarif_tindakan_dokter: 40,
    tarif_tindakan_petugas: 50,
    kso: 60,
    menejemen: 70,
    kd_pj: 'UM',
    kelas: 'Kelas 1',
    kategori: 'PK',
  };
}

for (const code of [401, 403]) {
  test(`tarif laboratorium menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest('http://localhost/api/tarif-lab'));
    assert.equal(daftar.status, code);
    const simpan = await api.POST(request('POST', isiValid()));
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar tarif laboratorium difilter serta dipaginasi di server', async () => {
  const { api, calls } = handler();
  const respons = await api.GET(new NextRequest(
    'http://localhost/api/tarif-lab?cari=Hematologi&status=semua&kelas=Kelas%201&kategori=PK&page=2&limit=25',
  ));
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.equal(isi.total, 7);
  assert.equal(isi.data[0].kd_jenis_prw, 'J000042');
  assert.ok(calls.some(([, sql]) => sql.includes('INNER JOIN penjab p')));
  assert.ok(!calls.some(([, sql]) => sql.includes('kategori_perawatan')));
  assert.ok(calls.some(([, sql, params]) => sql.includes('p.png_jawab LIKE ?') && params.includes('%Hematologi%')));
  assert.ok(calls.some(([, sql, params]) => sql.includes('t.kelas = ?') && params.includes('Kelas 1')));
  assert.ok(calls.some(([, sql, params]) => sql.includes('t.kategori = ?') && params.includes('PK')));
  assert.ok(!calls.some(([, sql]) => sql.includes('t.status = ?')));
  assert.ok(calls.some(([, sql]) => sql.includes('LIMIT ? OFFSET ?')));
});

test('simpan tarif laboratorium membuat kode otomatis, menghitung total, dan commit', async () => {
  const { api, calls } = handler({ terakhir: 42 });
  const respons = await api.POST(request('POST', isiValid()));
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.equal(isi.data.kd_jenis_prw, 'J000043');
  assert.match(isi.data.kd_jenis_prw, /^J\d{6}$/);
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT GET_LOCK')));
  assert.ok(calls.some(([label]) => label === 'BEGIN'));
  assert.ok(calls.some(([label]) => label === 'COMMIT'));
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT RELEASE_LOCK')));
  const insert = calls.find(([, sql]) => sql?.startsWith('INSERT INTO'));
  assert.ok(insert);
  assert.ok(insert[2].includes('J000043'));
  assert.ok(insert[2].includes(280));
  assert.ok(insert[2].includes('Kelas 1'));
  assert.ok(insert[2].includes('PK'));
  assert.ok(insert[2].includes('1'));
});

test('simpan tarif laboratorium menolak isian tidak valid tanpa transaksi', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', { ...isiValid(), tarif_perujuk: 'bukan angka' }));
  assert.equal(respons.status, 400);
  assert.equal(calls.some(([label]) => label === 'BEGIN'), false);
});

test('kelas dan kategori di luar allowlist ditolak', async () => {
  const { api } = handler();
  const respons = await api.POST(request('POST', { ...isiValid(), kelas: 'Kelas 9', kategori: 'XX' }));
  assert.equal(respons.status, 400);
  const isi = await respons.json();
  assert.match(isi.error, /Kelas/);
});

test('duplikat dan relasi tarif laboratorium menghasilkan rollback', async () => {
  const duplikat = handler({ duplikat: true });
  const responDuplikat = await duplikat.api.POST(request('POST', isiValid()));
  assert.equal(responDuplikat.status, 409);
  assert.ok(duplikat.calls.some(([label]) => label === 'ROLLBACK'));

  const relasi = handler({ relasi: true });
  const responRelasi = await relasi.api.POST(request('POST', isiValid()));
  assert.equal(responRelasi.status, 400);
  assert.ok(relasi.calls.some(([label]) => label === 'ROLLBACK'));
});

test('ganti tarif laboratorium memakai kode lama dan rollback saat tidak ditemukan', async () => {
  const { api, calls } = handler();
  const respons = await api.PUT(request('PUT', {
    ...isiValid(),
    kd_jenis_prw: 'J000044',
    kd_jenis_prw_lama: 'J000043',
  }));
  assert.equal(respons.status, 200);
  const ubah = calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan_lab SET') && !sql.includes('status'));
  assert.ok(ubah);
  assert.equal(ubah[2].at(-1), 'J000043');
  assert.ok(ubah[2].includes(280));

  const gagal = handler({ affected: 0 });
  const responGagal = await gagal.api.PUT(request('PUT', {
    ...isiValid(),
    kd_jenis_prw_lama: 'J000043',
  }));
  assert.equal(responGagal.status, 404);
  assert.ok(gagal.calls.some(([label]) => label === 'ROLLBACK'));
});

test('hapus dan pulihkan tarif laboratorium berjalan dalam transaksi', async () => {
  const hapus = handler();
  const responHapus = await hapus.api.DELETE(request('DELETE', {
    items: [{ kd_jenis_prw: 'J000043' }, { kd_jenis_prw: 'J000044' }],
  }));
  assert.equal(responHapus.status, 200);
  const updateHapus = hapus.calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan_lab SET status'));
  assert.ok(updateHapus);
  assert.equal(updateHapus[2][0], '0');
  assert.deepEqual(updateHapus[2].slice(1), ['J000043', 'J000044']);

  const pulihkan = handler();
  const responPulihkan = await pulihkan.api.PATCH(request('PATCH', {
    status: '1',
    items: [{ kd_jenis_prw: 'J000043' }],
  }));
  assert.equal(responPulihkan.status, 200);
  const updatePulihkan = pulihkan.calls.find(([, sql]) => sql?.startsWith('UPDATE jns_perawatan_lab SET status'));
  assert.equal(updatePulihkan[2][0], '1');

  const kosong = handler({ statusKosong: true });
  const responKosong = await kosong.api.PATCH(request('PATCH', {
    status: '1',
    items: [{ kd_jenis_prw: 'J000043' }],
  }));
  assert.equal(responKosong.status, 404);
  assert.ok(kosong.calls.some(([label]) => label === 'ROLLBACK'));
});

test('opsi tarif laboratorium menyediakan penjab aktif, kelas lengkap, kategori, dan status', async () => {
  const { api, calls } = handlerOpsi();
  const respons = await api.GET();
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.deepEqual(isi.data.kategori.map((item) => item.id), ['PK', 'PA', 'MB']);
  assert.equal(isi.data.penjab[0].id, 'UM');
  assert.ok(isi.data.kelas.some((item) => item.id === 'Rawat Jalan'));
  assert.deepEqual(isi.data.status.map((item) => item.id), ['1', '0']);
  assert.ok(calls.some(([, sql]) => sql.includes("WHERE status = '1'")));
});

test('kode tarif laboratorium memakai lock dan prefiks J enam digit', async () => {
  const { api, calls } = handlerKode({ terakhir: 41 });
  const respons = await api.GET();
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.equal(isi.data.kd_jenis_prw, 'J000042');
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT GET_LOCK')));
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT RELEASE_LOCK')));

  const gagal = handlerKode({ lock: false });
  const responGagal = await gagal.api.GET();
  assert.equal(responGagal.status, 409);
});

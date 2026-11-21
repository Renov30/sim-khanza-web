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

function rowTemplate() {
  return {
    id_template: 91,
    kd_jenis_prw: 'J000042',
    pemeriksaan: 'Hemoglobin',
    nilai_rujukan_ld: '12-16',
    nilai_rujukan_la: '12-16',
    nilai_rujukan_pd: '12-16',
    nilai_rujukan_pa: '12-16',
    urut: 0,
  };
}

function mocksDasar(denied, calls, opsi = {}) {
  return {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push(['QUERY', sql, params]);
        if (/SELECT kategori FROM jns_perawatan_lab/.test(sql)) {
          return [{ kategori: opsi.kategori ?? 'PK' }];
        }
        if (/FROM template_laboratorium/.test(sql)) return [rowTemplate()];
        return [];
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
            if (/SELECT kategori FROM jns_perawatan_lab/.test(sql)) {
              return [[{ kategori: opsi.kategori ?? 'PK' }], []];
            }
            if (/SELECT id_template FROM template_laboratorium/.test(sql)) {
              return [[{ id_template: 91 }, { id_template: 92 }], []];
            }
            if (/^UPDATE template_laboratorium SET urut/.test(sql)) return [{ affectedRows: 1 }, []];
            if (/^INSERT INTO template_laboratorium/.test(sql)) {
              if (opsi.duplikat) throw new Error('Duplicate entry for key PRIMARY');
              return [{ affectedRows: 1, insertId: 91 }, []];
            }
            if (/^UPDATE template_laboratorium SET Pemeriksaan/.test(sql)) {
              if (opsi.affected === 0) return [{ affectedRows: 0 }, []];
              return [{ affectedRows: 1 }, []];
            }
            if (/^DELETE FROM template_laboratorium/.test(sql)) {
              if (opsi.fk) throw new Error('foreign key constraint fails');
              if (opsi.affected === 0) return [{ affectedRows: 0 }, []];
              return [{ affectedRows: 1 }, []];
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
  const api = loadTs(
    resolve('src/app/api/tarif-lab/template/route.ts'),
    mocksDasar(denied, calls, opsi),
    new Map(),
  );
  return { api, calls };
}

function request(method, isi, path = '/api/tarif-lab/template') {
  const opsi = { method };
  if (isi !== undefined) {
    opsi.headers = { 'Content-Type': 'application/json' };
    opsi.body = JSON.stringify(isi);
  }
  return new NextRequest(`http://localhost${path}`, opsi);
}

function isiValid() {
  return {
    kd_jenis_prw: 'J000042',
    pemeriksaan: 'Hemoglobin',
    nilai_rujukan_ld: '12-16',
    nilai_rujukan_la: '12-16',
    nilai_rujukan_pd: '12-16',
    nilai_rujukan_pa: '12-16',
  };
}

for (const code of [401, 403]) {
  test(`item template menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const daftar = await api.GET(new NextRequest(
      'http://localhost/api/tarif-lab/template?kd_jenis_prw=J000042',
    ));
    const simpan = await api.POST(request('POST', isiValid()));
    assert.equal(daftar.status, code);
    assert.equal(simpan.status, code);
    assert.equal(calls.length, 0);
  });
}

test('daftar item template mengembalikan id_template dan diurutkan di server', async () => {
  const { api, calls } = handler();
  const respons = await api.GET(new NextRequest(
    'http://localhost/api/tarif-lab/template?kd_jenis_prw=J000042',
  ));
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.equal(isi.total, 1);
  assert.equal(isi.data[0].id_template, 91);
  assert.ok(!('biaya_item' in isi.data[0]));
  assert.ok(calls.some(([, sql]) => sql.includes('ORDER BY urut, id_template')));
  assert.ok(!calls.some(([, sql]) => sql?.includes('method')));
  assert.ok(calls.some(([, sql, params]) => sql.includes('SELECT kategori') && params[0] === 'J000042'));
});

test('item template hanya tersedia untuk kategori PK dan MB', async () => {
  const { api, calls } = handler({ kategori: 'PA' });
  const respons = await api.GET(new NextRequest(
    'http://localhost/api/tarif-lab/template?kd_jenis_prw=J000042',
  ));
  assert.equal(respons.status, 400);
  const isi = await respons.json();
  assert.match(isi.error, /PK dan MB/);
  assert.ok(!calls.some(([, sql]) => sql.includes('FROM template_laboratorium')));
});

test('simpan item template membuat id otomatis tanpa input biaya', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', {
    ...isiValid(),
    bagian_rs: 999,
    biaya_item: 999,
    satuan: 'g/dL',
  }));
  assert.equal(respons.status, 200);
  const isi = await respons.json();
  assert.equal(isi.data.id_template, 91);
  assert.match(isi.message, /ID 91/);
  const insert = calls.find(([, sql]) => sql?.startsWith('INSERT INTO template_laboratorium'));
  assert.ok(insert);
  assert.ok(!insert[1].includes('id_template'));
  assert.ok(!insert[1].includes('method'));
  assert.ok(!insert[1].includes('bagian_rs'));
  assert.ok(insert[1].includes('satuan'));
  assert.ok(insert[1].includes('biaya_item'));
  assert.ok(insert[2].includes('J000042'));
  assert.ok(insert[2].includes('Hemoglobin'));
  assert.equal(insert[2].length, 9);
  assert.equal(insert[2][2], '');
  assert.equal(insert[2][7], 0);
  assert.equal(insert[2].at(-1), 0);
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT GET_LOCK')));
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT RELEASE_LOCK')));
  assert.ok(calls.some(([label]) => label === 'COMMIT'));
});

test('simpan item template menolak isian tidak valid sebelum transaksi', async () => {
  const { api, calls } = handler();
  const respons = await api.POST(request('POST', { ...isiValid(), pemeriksaan: '' }));
  assert.equal(respons.status, 400);
  assert.ok(!calls.some(([label]) => label === 'BEGIN'));
});

test('item template gagal bila lock sedang dipakai', async () => {
  const { api, calls } = handler({ lock: false });
  const respons = await api.POST(request('POST', isiValid()));
  assert.equal(respons.status, 409);
  assert.ok(!calls.some(([label]) => label === 'BEGIN'));
});

test('ubah item template memakai id_template dan kode induk yang cocok', async () => {
  const { api, calls } = handler();
  const respons = await api.PUT(request('PUT', { ...isiValid(), id_template: 91 }));
  assert.equal(respons.status, 200);
  const ubah = calls.find(([, sql]) => sql?.startsWith('UPDATE template_laboratorium SET Pemeriksaan'));
  assert.ok(ubah);
  assert.ok(ubah[1].includes('WHERE id_template = ? AND kd_jenis_prw = ?'));
  assert.ok(ubah[1].includes("satuan = ''"));
  assert.ok(ubah[1].includes('biaya_item = 0'));
  assert.ok(!ubah[1].includes('bagian_rs'));
  assert.ok(ubah[2].includes(91));
  assert.equal(ubah[2].at(-1), 'J000042');
  assert.ok(calls.some(([, sql]) => sql?.startsWith('SELECT id_template FROM template_laboratorium')));
  assert.ok(calls.some(([label]) => label === 'COMMIT'));

  const beda = handler({ affected: 0 });
  const responsBeda = await beda.api.PUT(request('PUT', {
    ...isiValid(),
    kd_jenis_prw: 'J000099',
    id_template: 91,
  }));
  assert.equal(responsBeda.status, 404);
  assert.ok(beda.calls.some(([label]) => label === 'ROLLBACK'));
});

test('hapus item template melakukan hard delete dan rollback saat dipakai transaksi', async () => {
  const { api, calls } = handler();
  const respons = await api.DELETE(request('DELETE', { kd_jenis_prw: 'J000042', id_template: 91 }));
  assert.equal(respons.status, 200);
  const hapus = calls.find(([, sql]) => sql?.startsWith('DELETE FROM template_laboratorium'));
  assert.ok(hapus);
  assert.deepEqual(hapus[2], [91, 'J000042']);
  assert.ok(calls.some(([label]) => label === 'COMMIT'));

  const dipakai = handler({ fk: true });
  const responsDipakai = await dipakai.api.DELETE(request('DELETE', {
    kd_jenis_prw: 'J000042',
    id_template: 91,
  }));
  assert.equal(responsDipakai.status, 409);
  assert.ok(dipakai.calls.some(([label]) => label === 'ROLLBACK'));

  const kosong = handler({ affected: 0 });
  const responsKosong = await kosong.api.DELETE(request('DELETE', {
    kd_jenis_prw: 'J000042',
    id_template: 91,
  }));
  assert.equal(responsKosong.status, 404);
  assert.ok(kosong.calls.some(([label]) => label === 'ROLLBACK'));
});

test('id_template dan nama item divalidasi sebelum database', async () => {
  const { api } = handler();
  const idSalah = await api.DELETE(request('DELETE', { kd_jenis_prw: 'J000042', id_template: 'abc' }));
  assert.equal(idSalah.status, 400);

  const namaKosong = await api.POST(request('POST', { ...isiValid(), pemeriksaan: '' }));
  assert.equal(namaKosong.status, 400);

  const panjang = await api.POST(request('POST', {
    ...isiValid(),
    pemeriksaan: 'x'.repeat(201),
  }));
  assert.equal(panjang.status, 400);
});

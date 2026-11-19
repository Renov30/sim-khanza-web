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

const header = {
  no_resep: '000001',
  tgl_peresepan: '2026-01-01',
  jam_peresepan: '08:00:00',
  no_rawat: '2026/01/01/000001',
  no_rkm_medis: '000006',
  nm_pasien: 'Pasien Uji',
  kd_dokter: 'D1',
  nm_dokter: 'dr. Uji',
  status_pelayanan: 'Belum Terlayani',
  status: 'ralan',
};

const detail = [
  {
    no_resep: '000001', jenis_item: 'obat', kode_item: 'OB1', nama_item: 'Parasetamol',
    jumlah: 10, satuan: 'tab', aturan_pakai: '3 x 1', keterangan: '', no_racik: '', kd_racik: '',
    p1: 0, p2: 0, kandungan: '', jenis: 'Obat', komposisi: '-', harga_ralan: 100,
    industri: 'Industri Uji', kapasitas: 1, stok: 20,
  },
  {
    no_resep: '000001', jenis_item: 'racikan', kode_item: 'R1', nama_item: 'Racikan Uji',
    jumlah: 2, satuan: 'Serbuk', aturan_pakai: '2 x 1', keterangan: 'Racikan A', no_racik: '1', kd_racik: 'R',
    p1: 0, p2: 0, kandungan: '', jenis: 'Racikan', komposisi: '', harga_ralan: 0,
    industri: '', kapasitas: 0, stok: 0,
  },
  {
    no_resep: '000001', jenis_item: 'bahan', kode_item: 'OB2', nama_item: 'Bahan Uji',
    jumlah: 5, satuan: 'tab', aturan_pakai: '', keterangan: '', no_racik: '1', kd_racik: '',
    p1: 1, p2: 2, kandungan: 'Kandungan Uji', jenis: 'Obat', komposisi: '-', harga_ralan: 200,
    industri: 'Industri Uji', kapasitas: 1, stok: 15,
  },
];

function handler({ denied, headers = [header], details = detail } = {}) {
  const calls = [];
  const cache = new Map();
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/FROM resep_obat ro/.test(sql)) return headers;
        if (/FROM resep_dokter rd/.test(sql)) return details;
        return [];
      },
    },
    '@/lib/farmasi/access': {
      resepObatAccess: async () => denied
        ? NextResponse.json({ success: false, error: 'Ditolak' }, { status: denied })
        : null,
    },
    '@/lib/registrasi/date': {
      isRegistrationDate: (nilai) => /^\d{4}-\d{2}-\d{2}$/.test(nilai) && !Number.isNaN(Date.parse(nilai)),
    },
  };
  const api = loadTs(resolve('src/app/api/farmasi/copy-resep/route.ts'), mocks, cache);
  return { api, calls };
}

function request(kueri = '') {
  return new NextRequest(`http://localhost/api/farmasi/copy-resep?${kueri}`);
}

for (const code of [401, 403]) {
  test(`copy resep menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(request('no_rm=000006&status=ralan'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('copy resep memvalidasi nomor RM, status, tanggal, dan nomor resep', async () => {
  const { api, calls } = handler();
  for (const kueri of [
    'status=ralan',
    'no_rm=000006&status=acak',
    'no_rm=000006&status=ralan&tanggal_mulai=2026-1-1',
    'no_rm=000006&status=ralan&tanggal_mulai=2026-02-01&tanggal_selesai=2026-01-01',
    'no_resep=',
  ]) {
    const response = await api.GET(request(kueri));
    assert.equal(response.status, 400, kueri);
  }
  assert.equal(calls.length, 0);
});

test('daftar copy resep memakai filter status, dokter, tanggal, dan limit', async () => {
  const { api, calls } = handler();
  const response = await api.GET(request('no_rm=000006&status=ralan&tanggal_mulai=2026-01-01&tanggal_selesai=2026-01-31&kd_dokter=D1&limit=10'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.success, true);
  assert.equal(json.data.total, 1);
  assert.equal(json.data.items[0].status_asal, 'Rawat Jalan');
  assert.equal(json.data.items[0].detail.length, 3);
  assert.equal(json.data.items[0].obat.length, 1);
  assert.equal(json.data.items[0].racikan.length, 1);
  assert.equal(json.data.items[0].racikan[0].detail.length, 1);

  const headerCall = calls.find(([sql]) => /FROM resep_obat ro/.test(sql));
  assert.match(headerCall[0], /ro\.tgl_peresepan >= \?/);
  assert.match(headerCall[0], /LIMIT \?/);
  assert.deepEqual(headerCall[1], ['000006', 'ralan', '2026-01-01', '2026-01-31', 'D1', 10]);

  const detailCall = calls.find(([sql]) => /FROM resep_dokter rd/.test(sql));
  assert.deepEqual(detailCall[1], ['000001', '000001', '000001']);
});

test('cari per obat menyaring resep berdasarkan nama atau kode', async () => {
  const cocok = handler();
  const ada = await cocok.api.GET(request('no_rm=000006&status=ralan&cari_obat=paras'));
  assert.equal((await ada.json()).data.items.length, 1);

  const tidak = handler();
  const kosong = await tidak.api.GET(request('no_rm=000006&status=ralan&cari_obat=tidakada'));
  assert.equal((await kosong.json()).data.items.length, 0);
});

test('detail copy resep mengembalikan header, obat, dan racikan', async () => {
  const { api } = handler();
  const response = await api.GET(request('no_resep=000001'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.data.header.no_resep, '000001');
  assert.equal(json.data.obat[0].kode_brng, 'OB1');
  assert.equal(json.data.racikan[0].kd_racik, 'R');
  assert.equal(json.data.racikan[0].detail[0].p1, '1');
});

test('detail copy resep mengembalikan 404 untuk resep yang tidak ada', async () => {
  const { api } = handler({ headers: [], details: [] });
  const response = await api.GET(request('no_resep=999999'));
  assert.equal(response.status, 404);
  assert.equal((await response.json()).success, false);
});

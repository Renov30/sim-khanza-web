import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');
const isRegistrationDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function handler({ denied } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    destroy: () => calls.push(['DESTROY']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa r\s+WHERE r\.no_rawat/.test(sql)) return [[{
        no_rawat: '2026/11/16/000001', kd_dokter: 'D1', kd_poli: 'U0001', kd_pj: 'UMU',
        status_bayar: 'Belum Bayar', tgl_registrasi: '2026-11-16', jam_reg: '08:00:00', pasien_ranap: 0,
      }]];
      if (/FROM resep_obat ro\s+INNER JOIN reg_periksa r/.test(sql)) return [[{
        no_resep: '202611160006', status_resep: 'ralan', tervalidasi: 0,
        no_rawat: '2026/11/16/000001', kd_dokter: 'D1', kd_poli: 'U0001', kd_pj: 'UMU',
        status_bayar: 'Belum Bayar', tgl_registrasi: '2026-11-16', jam_reg: '08:00:00', pasien_ranap: 0,
      }]];
      if (/FROM databarang WHERE/.test(sql)) return [params.map((kode_brng) => ({ kode_brng }))];
      if (/FROM metode_racik WHERE/.test(sql)) return [[{ kd_racik: 'R01' }]];
      if (/GET_LOCK/.test(sql)) return [[{ didapat: 1 }]];
      if (/MAX\(CONVERT\(RIGHT/.test(sql)) return [[{ urut: 7 }]];
      if (/RELEASE_LOCK/.test(sql)) return [[{ dilepas: 1 }]];
      return [{ affectedRows: 1 }];
    },
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => { calls.push([sql, params]); return []; },
      pool: { getConnection: async () => connection },
    },
    '@/lib/farmasi/access': {
      resepObatAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/farmasi/resep-obat/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

for (const code of [401, 403]) {
  test(`resep menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/resep-obat?resource=metode'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('kunjungan dari tindakan rawat jalan dicari dengan parameter no_rawat', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/resep-obat?resource=kunjungan&no_rawat=2026%2F11%2F16%2F000001'));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /r\.no_rawat = \?/);
  assert.deepEqual(calls[0][1], ['2026/11/16/000001']);
});

test('simpan resep membuat nomor terkunci dan menyimpan semua detail dalam transaksi', async () => {
  const { api, calls } = handler();
  const response = await api.POST(new NextRequest('http://localhost/api/farmasi/resep-obat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:00:00',
      obat: [{ kode_brng: 'OBAT1', jumlah: 10, aturan_pakai: '3 x 1' }],
      racikan: [{
        nama_racik: 'Racikan 1', kd_racik: 'R01', jumlah: 10, aturan_pakai: '2 x 1', keterangan: 'Habiskan',
        detail: [{ kode_brng: 'OBAT2', p1: 1, p2: 1, kandungan: '50%', jumlah: 5 }],
      }],
    }),
  }));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.data.no_resep, '202611160007');
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /GET_LOCK/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO resep_obat/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO resep_dokter \(/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO resep_dokter_racikan\s/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO resep_dokter_racikan_detail/.test(sql)));
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /RELEASE_LOCK/.test(sql)));
  assert.ok(calls.some(([marker]) => marker === 'RELEASE'));
});

test('resep kosong ditolak sebelum membuka transaksi', async () => {
  const { api, calls } = handler();
  const response = await api.POST(new NextRequest('http://localhost/api/farmasi/resep-obat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:00:00', obat: [], racikan: [] }),
  }));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('ubah resep belum tervalidasi mengganti detail dalam satu transaksi', async () => {
  const { api, calls } = handler();
  const response = await api.PUT(new NextRequest('http://localhost/api/farmasi/resep-obat', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      no_resep: '202611160006', no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:30:00',
      obat: [{ kode_brng: 'OBAT1', jumlah: 12, aturan_pakai: '3 x 1' }], racikan: [],
    }),
  }));
  assert.equal(response.status, 200);
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /FOR UPDATE/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /UPDATE resep_obat SET tgl_peresepan/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /DELETE FROM resep_dokter WHERE/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO resep_dokter \(/.test(sql)));
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
});

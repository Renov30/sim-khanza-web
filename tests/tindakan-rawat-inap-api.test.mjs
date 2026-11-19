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

function handler({ denied, billing = false } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa WHERE/.test(sql)) return [[{
        no_rawat: '2026/11/16/000001', tgl_registrasi: '2026-11-16', jam_reg: '08:00:00',
        kd_pj: 'UMU', stts: 'Belum', status_bayar: 'Belum Bayar',
      }]];
      if (/FROM billing/.test(sql)) return billing ? [[{ noindex: 1 }]] : [[]];
      if (/FROM kamar_inap ki/.test(sql)) return [[{ kd_bangsal: 'B1', kelas: '1' }]];
      if (/SELECT kd_dokter FROM dokter/.test(sql)) return [[{ kd_dokter: 'D1' }]];
      if (/FROM jns_perawatan_inap/.test(sql)) return [[{
        kd_jenis_prw: 'T001', material: 10000, bhp: 2000, tarif_tindakandr: 30000,
        tarif_tindakanpr: 0, kso: 0, menejemen: 0, total_byrdr: 42000,
        total_byrpr: 0, total_byrdrpr: 0,
      }]];
      return [{ affectedRows: 1 }];
    },
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total: 75 }];
        if (/SELECT kd_pj FROM reg_periksa/.test(sql)) return [{ kd_pj: 'UMU' }];
        if (/FROM kamar_inap ki/.test(sql)) return [{ kd_bangsal: 'B1', kelas: '1' }];
        return [];
      },
      pool: { getConnection: async () => connection },
    },
    '@/lib/tindakan-rawat-inap/access': {
      tindakanRawatInapAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/tindakan-rawat-inap/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls, connection };
}

for (const code of [401, 403]) {
  test(`tindakan ranap menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-inap?resource=riwayat&mode=dokter'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('pencarian kunjungan ranap dibatasi dan memakai parameter', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-inap?resource=registrasi&mode=dokter&cari=Pasien'));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /status_lanjut = 'Ranap'.*LIMIT 20/s);
  assert.deepEqual(calls[0][1], ['%Pasien%', '%Pasien%', '%Pasien%']);
});

test('tarif ranap disaring menurut penjamin, bangsal, dan kelas kamar', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-inap?resource=tarif&mode=dokter&no_rawat=2026%2F11%2F16%2F000001'));
  assert.equal(response.status, 200);
  const tarifQuery = calls.find(([sql]) => typeof sql === 'string' && /FROM jns_perawatan_inap/.test(sql));
  assert.match(tarifQuery[0], /jp\.kd_bangsal = \?/);
  assert.match(tarifQuery[0], /jp\.kelas = \?/);
  assert.deepEqual(tarifQuery[1].slice(0, 3), ['UMU', 'B1', '1']);
});

test('riwayat tindakan dipaginasi sebelum dikirim', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-inap?resource=riwayat&mode=gabungan&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-16&page=2&limit=50'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.total, 75);
  const queryData = calls.find(([sql]) => typeof sql === 'string' && /LIMIT \? OFFSET \?/.test(sql));
  assert.deepEqual(queryData[1].slice(-2), [50, 50]);
});

test('simpan mengambil komponen tarif dari server dan memakai transaksi', async () => {
  const { api, calls } = handler();
  const request = new NextRequest('http://localhost/api/tindakan-rawat-inap', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'dokter', no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:00:00',
      kd_dokter: 'D1', tindakan: ['T001'], total: 1,
    }),
  });
  const response = await api.POST(request);
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /INSERT INTO rawat_inap_dr\s/.test(sql));
  assert.equal(insert[1].at(-1), 42000);
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
  assert.ok(!calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('jam dari input time tanpa detik dinormalisasi sebelum disimpan', async () => {
  const { api, calls } = handler();
  const request = new NextRequest('http://localhost/api/tindakan-rawat-inap', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'dokter', no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:30',
      kd_dokter: 'D1', tindakan: ['T001'],
    }),
  });
  const response = await api.POST(request);
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /INSERT INTO rawat_inap_dr\s/.test(sql));
  assert.equal(insert[1][4], '09:30:00');
});

test('billing yang sudah dibuat menolak tindakan dan menggulirkan transaksi', async () => {
  const { api, calls } = handler({ billing: true });
  const request = new NextRequest('http://localhost/api/tindakan-rawat-inap', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'dokter', no_rawat: '2026/11/16/000001', tanggal: '2026-11-16', jam: '09:00:00',
      kd_dokter: 'D1', tindakan: ['T001'],
    }),
  });
  const response = await api.POST(request);
  assert.equal(response.status, 409);
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO/.test(sql)));
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
});

test('periode riwayat tidak valid ditolak tanpa query', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-inap?resource=riwayat&mode=dokter&tanggal_mulai=2026-11-31&tanggal_selesai=2026-11-16'));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

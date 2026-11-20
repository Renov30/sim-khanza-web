import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');
const isRegistrationDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

function compile(file, mocks) {
  const path = resolve(file);
  const mod = new Module(path);
  mod.filename = path;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, path);
  return mod.exports;
}

function diagnosisHandler({ denied, masterRows = [] } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']), commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']), release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/SELECT status_bayar FROM reg_periksa/.test(sql)) return [[{ status_bayar: 'Belum Bayar' }]];
      if (/SELECT kd_penyakit FROM penyakit/.test(sql)) return [[{ kd_penyakit: 'A01' }]];
      if (/SELECT kode FROM icd9/.test(sql)) return [[{ kode: '00.02' }]];
      if (/SELECT DISTINCT d\.kd_penyakit/.test(sql)) return [[]];
      if (/MAX\(prioritas\)/.test(sql)) return [[{ berikutnya: 1 }]];
      if (/SELECT d\.kd_penyakit AS kode/.test(sql)) return [[{ kode: 'A01', nama: 'Typhoid' }]];
      if (/SELECT pp\.kode/.test(sql)) return [[{ kode: '00.02', nama: 'Therapeutic ultrasound' }]];
      return [{ affectedRows: 1 }];
    },
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        return /FROM penyakit/.test(sql) ? masterRows : [];
      },
      pool: { getConnection: async () => connection },
    },
    '@/lib/registrasi/date': { isRegistrationDate },
    '@/lib/tindakan-rawat-jalan/access': { tindakanRawatJalanAccess: async (permission) => {
      calls.push(['ACCESS', permission]);
      return denied ? NextResponse.json({ success: false }, { status: denied }) : null;
    } },
  };
  return { api: compile('src/app/api/tindakan-rawat-jalan/diagnosa/route.ts', mocks), calls };
}

function noteHandler({ denied, admin = false, username = 'D1', owner = 'D1', age = 1 } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']), commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']), release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa/.test(sql)) return [[{ tgl_registrasi: '2026-11-20', jam_reg: '08:00:00', status_bayar: 'Belum Bayar' }]];
      if (/FROM dokter/.test(sql)) return [[{ ok: 1 }]];
      if (/TIMESTAMPDIFF/.test(sql)) return [[{ kd_dokter: owner, umur_jam: age }]];
      if (/SELECT 1 FROM catatan_perawatan/.test(sql)) return [[]];
      return [{ affectedRows: 1 }];
    },
  };
  const session = { username, isAdmin: admin, permissions: { catatan_perawatan: true } };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => { calls.push([sql, params]); return []; },
      pool: { getConnection: async () => connection },
    },
    '@/lib/auth': { getSession: async () => session },
    '@/lib/registrasi/date': { isRegistrationDate },
    '@/lib/tindakan-rawat-jalan/access': { tindakanRawatJalanAccess: async (permission) => {
      calls.push(['ACCESS', permission]);
      return denied ? NextResponse.json({ success: false }, { status: denied }) : null;
    } },
  };
  return { api: compile('src/app/api/tindakan-rawat-jalan/catatan-dokter/route.ts', mocks), calls };
}

const noRawat = '2026/11/20/000001';
const note = {
  no_rawat: noRawat, tanggal: '2026-11-20', jam: '09:00:00', kd_dokter: 'D1', catatan: 'Kontrol tiga hari lagi.',
  asli_tanggal: '2026-11-20', asli_jam: '09:00:00', asli_dokter: 'D1', asli_catatan: 'Catatan awal.',
};

test('endpoint diagnosa memakai izin khusus dan berhenti saat akses ditolak', async () => {
  const { api, calls } = diagnosisHandler({ denied: 403 });
  const response = await api.GET(new NextRequest(`http://localhost/api/tindakan-rawat-jalan/diagnosa?no_rawat=${noRawat}`));
  assert.equal(response.status, 403);
  assert.deepEqual(calls, [['ACCESS', 'diagnosa_pasien']]);
});

test('daftar master diagnosa langsung tampil dan dipaginasi 20 data', async () => {
  const masterRows = Array.from({ length: 21 }, (_, index) => ({ kode: `A${index}`, nama: `Diagnosa ${index}` }));
  const { api, calls } = diagnosisHandler({ masterRows });
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/diagnosa?resource=master-diagnosa&offset=20'));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.data.length, 20);
  assert.deepEqual(json.meta, { hasMore: true, offset: 20, limit: 20 });
  const query = calls.find(([sql]) => typeof sql === 'string' && /FROM penyakit/.test(sql));
  assert.match(query[0], /LIMIT \? OFFSET \?/);
  assert.deepEqual(query[1], [21, 20]);
});

test('pencarian master diagnosa tetap berparameter dan menolak offset tidak valid', async () => {
  const { api, calls } = diagnosisHandler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/diagnosa?resource=master-diagnosa&cari=demam'));
  assert.equal(response.status, 200);
  const query = calls.find(([sql]) => typeof sql === 'string' && /FROM penyakit/.test(sql));
  assert.deepEqual(query[1], ['demam%', '%demam%', 21, 0]);

  const invalid = diagnosisHandler();
  const invalidResponse = await invalid.api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/diagnosa?resource=master-diagnosa&offset=abc'));
  assert.equal(invalidResponse.status, 400);
  assert.deepEqual(invalid.calls, [['ACCESS', 'diagnosa_pasien']]);
});

test('simpan diagnosa dan prosedur bertransaksi, berprioritas, dan menyinkronkan resume', async () => {
  const { api, calls } = diagnosisHandler();
  const response = await api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/diagnosa', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no_rawat: noRawat, diagnosa: ['A01'], prosedur: ['00.02'] }),
  }));
  assert.equal(response.status, 200);
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO diagnosa_pasien/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /INSERT INTO prosedur_pasien/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /UPDATE resume_pasien/.test(sql)));
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
});

test('catatan dokter memakai izin khusus dan validasi dokter login', async () => {
  const ditolak = noteHandler({ denied: 403 });
  const deniedResponse = await ditolak.api.GET(new NextRequest(`http://localhost/api/tindakan-rawat-jalan/catatan-dokter?no_rawat=${noRawat}`));
  assert.equal(deniedResponse.status, 403);
  assert.deepEqual(ditolak.calls, [['ACCESS', 'catatan_perawatan']]);

  const salahDokter = noteHandler({ username: 'D2' });
  const response = await salahDokter.api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/catatan-dokter', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note),
  }));
  assert.equal(response.status, 403);
  assert.equal(salahDokter.calls.length, 1);
});

test('simpan catatan mengunci kunjungan dan memakai query berparameter', async () => {
  const { api, calls } = noteHandler();
  const response = await api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/catatan-dokter', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note),
  }));
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /INSERT INTO catatan_perawatan/.test(sql));
  assert.deepEqual(insert[1], ['2026-11-20', '09:00:00', noRawat, 'D1', 'Kontrol tiga hari lagi.']);
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
});

test('dokter non-admin tidak dapat mengubah catatan dokter lain atau catatan lewat 48 jam', async () => {
  for (const options of [{ owner: 'D2' }, { age: 49 }]) {
    const { api, calls } = noteHandler(options);
    const response = await api.PUT(new NextRequest('http://localhost/api/tindakan-rawat-jalan/catatan-dokter', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(note),
    }));
    assert.ok([403, 409].includes(response.status));
    assert.ok(calls.some(([value]) => value === 'ROLLBACK'));
    assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /^UPDATE catatan_perawatan/.test(sql.trim())));
  }
});

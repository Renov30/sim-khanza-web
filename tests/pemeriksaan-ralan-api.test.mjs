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

function handler({ denied, admin = true, username = 'D1' } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa/.test(sql)) return [[{ tgl_registrasi: '2026-11-16', jam_reg: '08:00:00', status_bayar: 'Belum Bayar' }]];
      if (/SELECT nik FROM pegawai/.test(sql)) return [[{ nik: 'D1' }]];
      if (/FROM pemeriksaan_ralan.*FOR UPDATE/s.test(sql)) return [[{ nip: 'D1', umur_jam: 1 }]];
      return [{ affectedRows: 1 }];
    },
  };
  const session = { username, isAdmin: admin, permissions: { tindakan_ralan: true } };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => { calls.push([sql, params]); return []; },
      pool: { getConnection: async () => connection },
    },
    '@/lib/auth': { getSession: async () => session },
    '@/lib/tindakan-rawat-jalan/access': {
      tindakanRawatJalanAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/tindakan-rawat-jalan/pemeriksaan/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

const input = {
  no_rawat: '2026/11/16/000001', tgl_perawatan: '2026-11-16', jam_rawat: '09:00:00',
  nip: 'D1', kesadaran: 'Compos Mentis', keluhan: 'Pusing', pemeriksaan: 'Keadaan umum baik',
  suhu_tubuh: '', tensi: '120/80', nadi: '', respirasi: '', tinggi: '', berat: '', spo2: '',
  gcs: '', alergi: '', lingkar_perut: '', rtl: '', penilaian: '', instruksi: '', evaluasi: '',
};

test('akses pemeriksaan ditolak sebelum query', async () => {
  const { api, calls } = handler({ denied: 403 });
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan?no_rawat=2026/11/16/000001'));
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test('penampil pemeriksaan dibatasi untuk satu no rawat', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan?no_rawat=2026/11/16/000001'));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /WHERE pr\.no_rawat = \?.*LIMIT 100/s);
  assert.deepEqual(calls[0][1], ['2026/11/16/000001']);
});

test('simpan pemeriksaan memakai transaksi dan query berparameter', async () => {
  const { api, calls } = handler();
  const response = await api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
  }));
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /INSERT INTO pemeriksaan_ralan/.test(sql));
  assert.equal(insert[1][0], input.no_rawat);
  assert.equal(insert[1].at(-1), 'D1');
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
});

test('pegawai biasa tidak dapat menyimpan pemeriksaan atas nama pegawai lain', async () => {
  const { api, calls } = handler({ admin: false, username: 'P1' });
  const response = await api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
  }));
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test('ubah dan hapus memakai identitas komposit pemeriksaan', async () => {
  const ubah = handler();
  const responseUbah = await ubah.api.PUT(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, keluhan: 'Keluhan diperbarui', asli_tanggal: input.tgl_perawatan, asli_jam: input.jam_rawat }),
  }));
  assert.equal(responseUbah.status, 200);
  const update = ubah.calls.find(([sql]) => typeof sql === 'string' && /UPDATE pemeriksaan_ralan SET/.test(sql));
  assert.deepEqual(update[1].slice(-3), [input.no_rawat, input.tgl_perawatan, input.jam_rawat]);
  assert.ok(ubah.calls.some(([value]) => value === 'COMMIT'));

  const hapus = handler();
  const responseHapus = await hapus.api.DELETE(new NextRequest(`http://localhost/api/tindakan-rawat-jalan/pemeriksaan?no_rawat=${encodeURIComponent(input.no_rawat)}&tanggal=${input.tgl_perawatan}&jam=${input.jam_rawat}`));
  assert.equal(responseHapus.status, 200);
  const deletion = hapus.calls.find(([sql]) => typeof sql === 'string' && /DELETE FROM pemeriksaan_ralan/.test(sql));
  assert.deepEqual(deletion[1], [input.no_rawat, input.tgl_perawatan, input.jam_rawat]);
  assert.ok(hapus.calls.some(([value]) => value === 'COMMIT'));
});

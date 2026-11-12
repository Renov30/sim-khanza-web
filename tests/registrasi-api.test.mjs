import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');
const compiled = load('../.next/registrasi-tests/src/lib/registrasi/validation.js');

// Isolasi handler HTTP dari koneksi nyata; aturan bisnis diuji terpisah.
function handler({ denied, paid = false, related = false, missing = false, referralFails = false } = {}, filePath = 'src/app/api/registrasi/route.ts') {
  const calls = [];
  const conn = {
    beginTransaction: async () => { calls.push(['begin']); },
    commit: async () => { calls.push(['commit']); },
    rollback: async () => { calls.push(['rollback']); },
    release: () => { calls.push(['release']); },
    execute: async (sql, params) => { calls.push([sql, params]); return [[], []]; },
  };
  const mocks = {
    '@/lib/db': { pool: { getConnection: async () => { calls.push(['connect']); return conn; } }, executeQuery: async (sql, params) => {
      calls.push([sql, params]); return sql.startsWith('SELECT COUNT') ? [{ total: 250 }] : [];
    } },
    '@/lib/registrasi/access': { registrationAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null },
    '@/lib/registrasi/date': load('../.next/registrasi-tests/src/lib/registrasi/date.js'),
    '@/lib/registrasi/validation': compiled,
    '@/lib/registrasi/numbering': { saveWithRegistrationNumbers: async (_conn, _input, save) => {
      const numbers = { no_reg: '002', no_rawat: '2026/11/11/000002' }; await save(numbers); return numbers;
    } },
    '@/lib/registrasi/records': {
      lockRegistration: async () => {
        if (missing) throw new compiled.RegistrationError('Tidak ditemukan', 404);
        return { no_reg: '001', no_rkm_medis: '000001', kd_poli: 'P01', kd_dokter: 'D001', tgl_registrasi: '2026-11-11', status_bayar: paid ? 'Sudah Bayar' : 'Belum Bayar' };
      },
      ensureNoCareRecords: async () => { calls.push(['check-related']); if (related) throw new compiled.RegistrationError('Data terkait', 409); },
      registrationValues: async (_conn, input) => [input.tanggal, input.jam, input.dokter, input.pasien, input.poli, input.jawab, input.alamat, input.hubungan, 10000, input.stts, 'Lama', input.penjamin, 26, 'Th', input.bayar, 'Lama'],
      saveReferral: async () => { calls.push(['referral']); if (referralFails) throw new compiled.RegistrationError('Rujukan gagal'); },
    },
  };
  const file = resolve(filePath);
  const mod = new Module(file);
  mod.filename = file; mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  return { api: mod.exports, calls };
}
const body = { no_rawat: '2026/11/11/000001', tgl_registrasi: '2026-11-11', jam_reg: '09:00:00', kd_dokter: 'D001', kd_poli: 'P01', kd_pj: 'A09', no_rkm_medis: '000001', stts: 'Belum', status_bayar: 'Belum Bayar', asal_rujukan: 'Klinik' };
const request = (method, data = body) => new NextRequest('http://localhost/api/registrasi?no_rawat=2026/11/11/000001', { method, ...(method === 'POST' || method === 'PUT' ? { body: JSON.stringify(data) } : {}) });
for (const code of [401, 403]) {
  test(`semua metode menolak akses ${code} sebelum menyentuh database`, async () => {
    const { api, calls } = handler({ denied: code });
    for (const method of ['GET', 'POST', 'PUT', 'DELETE']) assert.equal((await api[method](request(method))).status, code);
    assert.equal(calls.length, 0);
  });
}
test('filter bayar dan pagination diterapkan sebelum LIMIT; total bukan jumlah halaman', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/registrasi?status_bayar=Belum%20Bayar&page=3&limit=100'));
  const result = await res.json();
  assert.equal(result.total, 250); assert.equal(result.page, 3);
  assert.match(calls[1][0], /status_bayar = \?.*ORDER BY.*LIMIT \? OFFSET \?/s);
  assert.deepEqual(calls[1][1].slice(-2), [100, 200]);
});
test('rujukan internal memakai dokter dan poli tujuan dengan filter berparameter', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/registrasi?tampilan=rujukan_internal&kd_dokter=D002&kd_poli=P02&cari=ani';
  assert.equal((await api.GET(new NextRequest(url))).status, 200);
  assert.match(calls[0][0], /rujukan_internal_poli rip/);
  assert.match(calls[0][0], /rip\.kd_dokter = \?.*rip\.kd_poli = \?/s);
  assert.deepEqual(calls[0][1].slice(0, 2), ['D002', 'P02']);
});
test('edit menyimpan tanggal, jam, pasien, penjamin dan status poli dalam transaksi', async () => {
  const { api, calls } = handler();
  assert.equal((await api.PUT(request('PUT'))).status, 200);
  const update = calls.find(([sql]) => sql.startsWith('UPDATE reg_periksa'));
  for (const field of ['tgl_registrasi', 'jam_reg', 'no_rkm_medis', 'kd_pj', 'status_poli']) assert.ok(update[0].includes(field));
  assert.ok(calls.find(([name]) => name === 'commit'));
  assert.ok(calls.find(([name]) => name === 'referral'));
});
test('kegagalan rujukan membatalkan seluruh penyimpanan', async () => {
  const { api, calls } = handler({ referralFails: true });
  assert.equal((await api.POST(request('POST'))).status, 400);
  assert.ok(calls.find(([name]) => name === 'rollback'));
  assert.equal(calls.some(([name]) => name === 'commit'), false);
});
for (const scenario of [{ paid: true }, { related: true }, { missing: true }]) {
  test(`hapus ditolak tanpa DELETE: ${JSON.stringify(scenario)}`, async () => {
    const { api, calls } = handler(scenario);
    assert.equal((await api.DELETE(request('DELETE'))).status, scenario.missing ? 404 : 409);
    assert.equal(calls.some(([sql]) => sql.startsWith('DELETE')), false);
    assert.ok(calls.find(([name]) => name === 'rollback'));
  });
}
test('hapus registrasi kosong memeriksa relasi sebelum menghapus', async () => {
  const { api, calls } = handler();
  assert.equal((await api.DELETE(request('DELETE'))).status, 200);
  assert.ok(calls.findIndex(([sql]) => sql === 'check-related') < calls.findIndex(([sql]) => sql.startsWith('DELETE')));
  assert.ok(calls.find(([name]) => name === 'commit'));
});

test('pencarian pasien mendukung NIK dan alamat dengan empat parameter', async () => {
  const { api, calls } = handler({}, 'src/app/api/registrasi/options/route.ts');
  const res = await api.GET(new NextRequest('http://localhost/api/registrasi/options?jenis=pasien&cari=123'));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /no_ktp LIKE \? OR alamat LIKE \?/);
  assert.deepEqual(calls[0][1], ['%123%', '%123%', '%123%', '%123%']);
});
test('API pencarian pasien menolak pengguna tanpa sesi', async () => {
  const { api, calls } = handler({ denied: 401 }, 'src/app/api/registrasi/options/route.ts');
  assert.equal((await api.GET(new NextRequest('http://localhost/api/registrasi/options?jenis=pasien'))).status, 401);
  assert.equal(calls.length, 0);
});

test('No. RM yang diketik dicari tepat, bukan pencarian sebagian', async () => {
  const { api, calls } = handler({}, 'src/app/api/registrasi/options/route.ts');
  await api.GET(new NextRequest('http://localhost/api/registrasi/options?jenis=pasien&rm=000001'));
  assert.match(calls[0][0], /WHERE no_rkm_medis = \?/);
  assert.deepEqual(calls[0][1], ['000001']);
});

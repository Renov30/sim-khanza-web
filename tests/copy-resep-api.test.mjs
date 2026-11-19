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

function handler({ denied, tervalidasi = 0 } = {}) {
  const calls = [];
  const header = {
    no_resep: '202611180001', tgl_peresepan: '2026-11-18', jam_peresepan: '08:00:00',
    no_rawat: '2026/11/18/000001', no_rkm_medis: '000001', nm_pasien: 'Pasien Uji',
    kd_dokter: 'D1', nm_dokter: 'Dokter Uji', status_pelayanan: 'Belum Terlayani', status_asal: 'ralan',
  };
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/SELECT ro\.no_resep, rs\.status_bayar/.test(sql)) return [[{
        no_resep: header.no_resep, status_bayar: 'Belum Bayar', kd_pj: 'UMU', tervalidasi,
      }]];
      if (/DELETE FROM resep_obat/.test(sql)) return [{ affectedRows: 1 }];
      return [[]];
    },
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/FROM reg_periksa r\s+WHERE r\.no_rawat/.test(sql)) return [{
          no_rawat: '2026/11/20/000001', no_rkm_medis: '000001', kd_dokter: 'D1', kd_poli: 'U1',
        }];
        if (/SELECT ro\.no_resep/.test(sql)) return [header];
        if (/FROM resep_dokter rd/.test(sql)) return [{
          no_resep: header.no_resep, jenis: 'Obat', jumlah: 10, satuan: 'TAB', aturan_pakai: '3 x 1',
          kode_item: 'OBAT1', nama_item: 'Obat Uji', no_racik: '',
        }];
        if (/FROM resep_dokter_racikan rr/.test(sql)) return [];
        if (/FROM resep_dokter_racikan_detail rrd/.test(sql)) return [];
        return [];
      },
      pool: { getConnection: async () => connection },
    },
    '@/lib/farmasi/access': {
      resepObatAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/farmasi/copy-resep/route.ts');
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
  test(`copy resep menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/copy-resep?no_rawat=2026%2F11%2F20%2F000001'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('riwayat copy resep dibatasi pasien dan dokter tujuan serta memuat rincian', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/copy-resep?no_rawat=2026%2F11%2F20%2F000001&pakai_tanggal=1&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-20&cari=Uji'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.data[0].items[0].kode_item, 'OBAT1');
  const queryHeader = calls.find(([sql]) => typeof sql === 'string' && /SELECT ro\.no_resep/.test(sql));
  assert.match(queryHeader[0], /r\.no_rkm_medis = \?/);
  assert.match(queryHeader[0], /ro\.kd_dokter = \?/);
  assert.ok(queryHeader[1].includes('000001'));
  assert.ok(queryHeader[1].includes('D1'));
});

test('periode copy resep tidak valid ditolak sebelum query', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/copy-resep?no_rawat=2026%2F11%2F20%2F000001&pakai_tanggal=1&tanggal_mulai=2026-11-30&tanggal_selesai=2026-11-01'));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test('hapus resep belum tervalidasi dilakukan dalam transaksi', async () => {
  const { api, calls } = handler();
  const response = await api.DELETE(new NextRequest('http://localhost/api/farmasi/copy-resep', {
    method: 'DELETE', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no_resep: '202611180001', no_rawat_tujuan: '2026/11/20/000001' }),
  }));
  assert.equal(response.status, 200);
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /FOR UPDATE/.test(sql)));
  assert.ok(calls.some(([sql]) => typeof sql === 'string' && /DELETE FROM resep_obat/.test(sql)));
  assert.ok(calls.some(([marker]) => marker === 'COMMIT'));
});

test('hapus resep tervalidasi ditolak dan di-rollback', async () => {
  const { api, calls } = handler({ tervalidasi: 1 });
  const response = await api.DELETE(new NextRequest('http://localhost/api/farmasi/copy-resep', {
    method: 'DELETE', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no_resep: '202611180001', no_rawat_tujuan: '2026/11/20/000001' }),
  }));
  assert.equal(response.status, 409);
  assert.ok(calls.some(([marker]) => marker === 'ROLLBACK'));
  assert.ok(!calls.some(([sql]) => typeof sql === 'string' && /DELETE FROM resep_obat/.test(sql)));
});

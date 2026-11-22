import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

const header = {
  no_resep: '202611220001', no_rawat: '2026/11/22/000001', no_rkm_medis: '000001',
  nm_pasien: 'Pasien Uji', kd_dokter: 'D1', nm_dokter: 'Dokter Uji', jenis: 'ralan',
  kd_unit: 'POL1', nm_unit: 'Poli Uji', kelas: '', jenis_bayar: 'Umum',
  tgl_peresepan: '2026-11-22', jam_peresepan: '08:00:00', tgl_validasi: '',
  jam_validasi: '', status_pelayanan: 'Belum Terlayani', billing_terkunci: 0,
  status_kunjungan: 'Belum',
};

function handler({ denied } = {}) {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/FROM resep_obat ro/.test(sql)) return [header];
        if (/FROM bangsal b/.test(sql)) return [{ kd_bangsal: 'AP', nm_bangsal: 'Apotek' }];
        if (/FROM resep_dokter rd/.test(sql)) return [{
          kode_item: 'OBAT1', nama_item: 'Obat Uji', jumlah: 10, satuan: 'TAB',
          aturan_pakai: '3 x 1', kapasitas: 1, stok: 20, h_beli: 100, ralan: 150,
          kelas1: 160, kelas2: 155, kelas3: 150, utama: 150, vip: 170, vvip: 180,
        }];
        if (/FROM resep_dokter_racikan rr/.test(sql)) return [{
          no_racik: '1', nama_item: 'Racikan Uji', jumlah: 5, satuan: 'Puyer',
          aturan_pakai: '2 x 1', keterangan: 'Habiskan',
        }];
        if (/FROM resep_dokter_racikan_detail rrd/.test(sql)) return [{
          no_racik: '1', kode_item: 'OBAT2', nama_item: 'Bahan Uji', jumlah: 2,
          satuan: 'TAB', aturan_pakai: '', kapasitas: 1, stok: 1, h_beli: 50,
          ralan: 75, kelas1: 80, kelas2: 78, kelas3: 75, utama: 75, vip: 85, vvip: 90,
        }];
        return [];
      },
    },
    '@/lib/farmasi/access': {
      validasiObatAccess: async () => denied
        ? NextResponse.json({ success: false }, { status: denied })
        : null,
    },
  };
  const file = resolve('src/app/api/farmasi/validasi-obat/route.ts');
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
  test(`validasi obat menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/validasi-obat?no_resep=202611220001'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });

  test(`POST validasi obat menolak akses ${code} sebelum transaksi`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.POST(new NextRequest('http://localhost/api/farmasi/validasi-obat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ no_resep: '202611220001' }),
    }));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('validasi obat memuat identitas, depo, obat, dan racikan', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/validasi-obat?no_resep=202611220001'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.success, true);
  assert.equal(json.data.resep.no_resep, '202611220001');
  assert.equal(json.data.depot.kd_bangsal, 'AP');
  assert.deepEqual(json.data.detail.map((item) => item.jenis_item), ['Obat', 'Racikan', 'Bahan Racikan']);
  assert.equal(json.data.detail[0].stok_cukup, true);
  assert.equal(json.data.detail[2].stok_cukup, false);
  assert.ok(calls.every(([, params]) => Array.isArray(params)));
  assert.ok(calls.some(([sql, params]) => /FROM resep_dokter rd/.test(sql) && params.includes('202611220001')));
});

test('validasi obat menolak nomor resep tidak valid tanpa query', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/validasi-obat?no_resep=%27%20OR%201=1'));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

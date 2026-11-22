import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

function handler({ denied } = {}) {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/FROM resep_obat ro/.test(sql)) return [{
          no_resep: '202611220001', no_rawat: '2026/11/22/000001', no_rkm_medis: '000001',
          nm_pasien: 'Pasien Uji', kd_dokter: 'D1', nm_dokter: 'Dokter Uji', jenis: 'ralan',
          jenis_bayar: 'Umum', tgl_resep: '2026-11-22', jam_resep: '10:51:32', status_pelayanan: 'Sudah Terlayani',
        }];
        if (/dor\.kode_brng IS NULL/.test(sql)) return [{
          kode_item: 'OBAT1', nama_item: 'Obat Uji', jumlah: 1, satuan: 'TAB', harga: 2501,
          embalase: 0, tuslah: 0, total: 2501, aturan_pakai: '3 x 1',
        }];
        if (/FROM obat_racikan ob/.test(sql)) return [{
          no_racik: '1', nama_item: 'Racikan Uji', jumlah: 5, satuan: 'Puyer', aturan_pakai: '2 x 1', keterangan: 'Habiskan',
        }];
        if (/FROM detail_obat_racikan dor/.test(sql)) return [{
          no_racik: '1', kode_item: 'OBAT2', nama_item: 'Bahan Uji', jumlah: 2, satuan: 'TAB',
          harga: 100, embalase: 0, tuslah: 0, total: 200, aturan_pakai: '',
        }];
        return [];
      },
    },
    '@/lib/farmasi/access': {
      validasiObatAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
  };
  const file = resolve('src/app/api/farmasi/no-resep/route.ts');
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
  test(`nomor resep menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/no-resep?no_resep=202611220001'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('nomor resep memuat header, obat, racikan, dan bahan racikan', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/no-resep?no_resep=202611220001'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.success, true);
  assert.equal(json.data.header.status_pelayanan, 'Sudah Terlayani');
  assert.deepEqual(json.data.detail.map((item) => item.jenis_item), ['Obat', 'Racikan', 'Bahan Racikan']);
  assert.equal(json.data.detail[1].total, 200);
  assert.ok(calls.every(([, params]) => Array.isArray(params)));
  assert.ok(calls.every(([, params]) => params.includes('202611220001') || params.includes('2026/11/22/000001')));
});

test('nomor resep menolak parameter tidak valid tanpa query', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/no-resep?no_resep=%27%20OR%201=1'));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

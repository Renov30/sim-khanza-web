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

const ringkasan = {
  no_resep: '202611180001', tgl_peresepan: '2026-11-18', jam_peresepan: '08:00:00',
  no_rawat: '2026/11/18/000001', no_rkm_medis: '000001', nm_pasien: 'Pasien Uji',
  kd_dokter: 'D1', nm_dokter: 'Dokter Uji', status_pelayanan: 'Belum Terlayani',
  kd_unit: 'U1', nm_unit: 'Poli Uji', jenis_bayar: 'Umum',
  tgl_validasi: '', jam_validasi: '', tgl_penyerahan: '', jam_penyerahan: '',
};

function handler({ denied } = {}) {
  const calls = [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/SELECT COUNT\(\*\) AS total/.test(sql)) return [{ total: 1 }];
        if (/SELECT ro\.no_resep/.test(sql)) return [ringkasan];
        if (/FROM resep_dokter rd/.test(sql)) return [{
          no_resep: ringkasan.no_resep, kode_brng: 'OBAT1', nama_brng: 'Obat Uji',
          jumlah: 10, satuan: 'TAB', aturan_pakai: '3 x 1',
        }];
        if (/FROM resep_dokter_racikan rr/.test(sql)) return [{
          no_resep: ringkasan.no_resep, no_racik: '1', nama_racik: 'Racikan Uji',
          jumlah: 5, satuan: 'Puyer', aturan_pakai: '2 x 1', keterangan: 'Habiskan',
        }];
        if (/FROM resep_dokter_racikan_detail rrd/.test(sql)) return [{
          no_resep: ringkasan.no_resep, no_racik: '1', kode_brng: 'OBAT2',
          nama_brng: 'Bahan Uji', jumlah: 2, satuan: 'TAB',
        }];
        return [];
      },
    },
    '@/lib/farmasi/access': {
      resepObatAccess: async () => denied
        ? NextResponse.json({ success: false }, { status: denied })
        : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/farmasi/daftar-resep-dokter/route.ts');
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
  test(`daftar resep menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(new NextRequest('http://localhost/api/farmasi/daftar-resep-dokter'));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('ringkasan ralan memakai filter berparameter dan pagination', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/farmasi/daftar-resep-dokter?jenis=ralan&tampilan=ringkasan&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-18&status=Belum%20Terlayani&dokter=Uji&unit=Poli&cari=Pasien&page=2&limit=25';
  const response = await api.GET(new NextRequest(url));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.total, 1);
  assert.equal(json.page, 1);
  assert.match(calls[0][0], /ro\.status = \?/);
  assert.match(calls[0][0], /INNER JOIN poliklinik unit_perawatan/);
  assert.ok(calls[0][1].includes('ralan'));
  assert.ok(calls[0][1].includes('%Uji%'));
  assert.ok(calls[0][1].includes('%Poli%'));
  assert.match(calls[1][0], /ORDER BY.*LIMIT \? OFFSET \?/s);
});

test('detail menggabungkan nonracikan, racikan, dan bahan racikan', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/daftar-resep-dokter?jenis=ralan&tampilan=detail'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(json.data.map((item) => item.jenis_item), ['Nonracikan', 'Racikan', 'Bahan Racikan']);
  assert.ok(calls.some(([sql]) => /FROM resep_dokter_racikan_detail rrd/.test(sql)));
});

test('rawat inap memakai ruang aktif termasuk pasien gabung', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/farmasi/daftar-resep-dokter?jenis=ranap'));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /FROM ranap_gabung rg/);
  assert.match(calls[0][0], /ki\.stts_pulang = '-'/);
  assert.ok(calls[0][1].includes('ranap'));
});

test('filter daftar resep yang tidak valid ditolak tanpa query', async () => {
  for (const query of ['jenis=lain', 'tampilan=lain', 'status=Selesai', 'tanggal_mulai=2026-02-30']) {
    const { api, calls } = handler();
    const response = await api.GET(new NextRequest(`http://localhost/api/farmasi/daftar-resep-dokter?${query}`));
    assert.equal(response.status, 400);
    assert.equal(calls.length, 0);
  }
});

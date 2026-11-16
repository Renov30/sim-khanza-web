import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

const isRegistrationDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(value))
  && new Date(value).toISOString().slice(0, 10) === value;

// Handler diisolasi dari database; SQL dan parameter diperiksa lewat calls.
function handler({ denied, billing = false } = {}, filePath = 'src/app/api/rawat-jalan/route.ts') {
  const calls = [];
  const rows = billing ? [
    [/FROM reg_periksa r/, [{
      no_rawat: '2026/01/14/000001', no_reg: '0001',
      tgl_registrasi: '2026-01-14', jam_reg: '20:22:11',
      no_rkm_medis: '001126', nm_pasien: 'Pasien Uji', jk: 'L', umurdaftar: 60, sttsumur: 'Th',
      kd_poli: 'U0001', nm_poli: 'POLI UMUM', kd_dokter: 'D0000001', nm_dokter: 'Dokter Uji',
      kd_pj: 'UMU', png_jawab: 'Umum', biaya_reg: 10000, stts: 'Sudah', status_bayar: 'Belum Bayar',
    }]],
    [/FROM rawat_jl_dr rjd/, [{ nama: 'Tindakan Dokter', jumlah: 1, total: 50000, tarif: 50000, sarana: 20000, bhp: 3000 }]],
    [/FROM rawat_jl_pr rjp/, []],
    [/FROM rawat_jl_drpr rjdp/, []],
    [/FROM periksa_lab/, []],
    [/FROM periksa_radiologi/, []],
    [/FROM detail_pemberian_obat/, [{ nama: 'Obat Uji', jumlah: 10, total: 100000 }]],
    [/FROM operasi/, []],
    [/FROM tambahan_biaya/, [{ nama: 'Administrasi', jumlah: 1, total: 5000 }]],
    [/FROM pengurangan_biaya/, [{ nama: 'Diskon', jumlah: 1, total: -10000 }]],
    [/FROM tagihan_obat_langsung/, []],
    [/FROM set_nota/, [{ tampilkan_ppnobat_ralan: 'Yes', rinciandokterralan: 'Yes' }]],
  ] : [];
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total: 250 }];
        return rows.find(([pola]) => pola.test(sql))?.[1] ?? [];
      },
    },
    '@/lib/rawat-jalan/access': {
      rawatJalanAccess: async () => (denied ? NextResponse.json({ success: false }, { status: denied }) : null),
    },
    '@/lib/registrasi/date': { isRegistrationDate, registrationDate: () => '2026-01-14' },
  };
  const file = resolve(filePath);
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  return { api: mod.exports, calls };
}

for (const code of [401, 403]) {
  test(`akses ${code} ditolak sebelum menyentuh database`, async () => {
    for (const [path, query] of [
      ['src/app/api/rawat-jalan/route.ts', ''],
      ['src/app/api/rawat-jalan/billing/route.ts', '?no_rawat=2026/01/14/000001'],
      ['src/app/api/rawat-jalan/options/route.ts', ''],
    ]) {
      const { api, calls } = handler({ denied: code }, path);
      assert.equal((await api.GET(new NextRequest(`http://localhost/api/rawat-jalan${query}`))).status, code);
      assert.equal(calls.length, 0);
    }
  });
}

test('daftar hanya memuat ralan, filter berparameter, dan pagination sebelum LIMIT', async () => {
  const { api, calls } = handler();
  const url = 'http://localhost/api/rawat-jalan?tanggal_mulai=2026-01-01&tanggal_selesai=2026-01-31&kd_pj=UMU&kd_poli=U0001&kd_dokter=D0000001&stts=Sudah&status_bayar=Belum%20Bayar&cari=ani&page=3&limit=100';
  const res = await api.GET(new NextRequest(url));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.total, 250);
  assert.equal(result.page, 3);
  assert.match(calls[0][0], /status_lanjut = 'Ralan'/);
  assert.deepEqual(calls[1][1].slice(0, 7), ['2026-01-01', '2026-01-31', 'UMU', 'U0001', 'D0000001', 'Sudah', 'Belum Bayar']);
  assert.match(calls[1][0], /ORDER BY.*LIMIT \? OFFSET \?/s);
  assert.deepEqual(calls[1][1].slice(-2), [100, 200]);
});

test('rujukan internal memakai dokter dan poli tujuan rujukan', async () => {
  const { api, calls } = handler();
  const res = await api.GET(new NextRequest('http://localhost/api/rawat-jalan?tampilan=rujukan_internal&kd_dokter=D2&kd_poli=P2'));
  assert.equal(res.status, 200);
  assert.match(calls[0][0], /INNER JOIN rujukan_internal_poli rip ON rip\.no_rawat = r\.no_rawat/);
  assert.match(calls[0][0], /rip\.kd_poli = \?.*rip\.kd_dokter = \?/s);
  assert.deepEqual(calls[0][1], ['P2', 'D2']);
});

test('filter tidak valid ditolak tanpa query database', async () => {
  for (const query of ['tanggal_mulai=2026-02-30', 'status_bayar=Lunas', 'stts=Hilang', 'tampilan=lain']) {
    const { api, calls } = handler();
    assert.equal((await api.GET(new NextRequest(`http://localhost/api/rawat-jalan?${query}`))).status, 400);
    assert.equal(calls.length, 0);
  }
});

test('billing menghitung total, PPN obat, tambahan, dan potongan', async () => {
  const { api } = handler({ billing: true }, 'src/app/api/rawat-jalan/billing/route.ts');
  const res = await api.GET(new NextRequest('http://localhost/api/rawat-jalan/billing?no_rawat=2026/01/14/000001'));
  const result = await res.json();
  assert.equal(res.status, 200);
  assert.equal(result.data.ringkasan.ralanDokter, 73000);
  assert.equal(result.data.ringkasan.obat, 111000);
  assert.equal(result.data.ringkasan.potongan, -10000);
  assert.equal(result.data.ringkasan.total, 189000);
  assert.ok(result.data.items.some((item) => item.nama === 'Jasa Sarana dan Prasarana' && item.total === 20000));
  assert.ok(result.data.items.some((item) => item.nama === 'Paket Obat/BHP' && item.total === 3000));
  assert.ok(result.data.items.some((item) => item.nama === 'PPN Obat 11%' && item.total === 11000));
});

test('billing menolak no_rawat kosong dan registrasi yang tidak ditemukan', async () => {
  const { api, calls } = handler({}, 'src/app/api/rawat-jalan/billing/route.ts');
  assert.equal((await api.GET(new NextRequest('http://localhost/api/rawat-jalan/billing'))).status, 400);
  assert.equal(calls.length, 0);

  const kosong = handler({}, 'src/app/api/rawat-jalan/billing/route.ts');
  assert.equal((await kosong.api.GET(new NextRequest('http://localhost/api/rawat-jalan/billing?no_rawat=tidak-ada'))).status, 404);
});

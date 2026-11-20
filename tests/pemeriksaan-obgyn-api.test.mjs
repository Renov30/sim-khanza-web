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

function handler({ denied, admin = true, umurJam = 1 } = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa/.test(sql)) {
        return [[{ tgl_registrasi: '2026-11-19', jam_reg: '08:00:00', status_bayar: 'Belum Bayar' }]];
      }
      if (/SELECT TIMESTAMPDIFF/.test(sql)) return [[{ umur_jam: umurJam }]];
      return [{ affectedRows: 1 }];
    },
  };
  const session = { username: 'P1', isAdmin: admin, permissions: { tindakan_ralan: true } };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => { calls.push([sql, params]); return []; },
      pool: { getConnection: async () => connection },
    },
    '@/lib/auth': { getSession: async () => session },
    '@/lib/tindakan-rawat-jalan/access': {
      tindakanRawatJalanAccess: async () => denied
        ? NextResponse.json({ success: false }, { status: denied })
        : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
  };
  const file = resolve('src/app/api/tindakan-rawat-jalan/pemeriksaan-obgyn/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

const dasar = {
  no_rawat: '2026/11/19/000001',
  tgl_perawatan: '2026-11-19',
  jam_rawat: '09:00:00',
};

const obstetri = {
  ...dasar,
  jenis: 'obstetri',
  tinggi_uteri: '24', janin: 'Tunggal', letak: 'Memanjang', panggul: '3/5', denyut: '144',
  kontraksi: '+', kualitas_mnt: '3', kualitas_dtk: '40', fluksus: '-', albus: '-', vulva: 'Normal',
  portio: 'Lunak', dalam: 'Lunak', tebal: '1', arah: 'depan', pembukaan: '4 cm', penurunan: 'Hodge II',
  denominator: 'UUK', ketuban: '-', feto: 'Normal',
};

const ginekologi = {
  ...dasar,
  jenis: 'ginekologi',
  inspeksi: 'Baik', inspeksi_vulva: 'Normal', inspekulo_gine: 'Normal', fluxus_gine: '-', fluor_gine: '-',
  vulva_inspekulo: 'Normal', portio_inspekulo: 'Normal', sondage: '', portio_dalam: 'Normal', bentuk: 'Normal',
  cavum_uteri: 'Normal', mobilitas: '+', ukuran: 'Normal', nyeri_tekan: '-', adnexa_kanan: 'Normal',
  adnexa_kiri: 'Normal', cavum_douglas: 'Normal',
};

test('akses pemeriksaan obstetri/ginekologi ditolak sebelum query', async () => {
  const { api, calls } = handler({ denied: 403 });
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn?jenis=obstetri&no_rawat=2026/11/19/000001'));
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test('riwayat obstetri dibatasi per kunjungan dan memakai filter berparameter', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn?jenis=obstetri&no_rawat=2026/11/19/000001&tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-19&cari=memanjang'));
  assert.equal(response.status, 200);
  assert.match(calls[0][0], /FROM pemeriksaan_obstetri_ralan p/);
  assert.match(calls[0][0], /p\.no_rawat = \?.*p\.tgl_perawatan >= \?.*p\.tinggi_uteri LIKE \?/s);
  assert.deepEqual(calls[0][1].slice(0, 4), [dasar.no_rawat, '2026-11-01', '2026-11-19', '%memanjang%']);
});

test('jenis dan pilihan pemeriksaan tidak valid ditolak tanpa query', async () => {
  const jenis = handler();
  const responseJenis = await jenis.api.GET(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn?jenis=umum&no_rawat=2026/11/19/000001'));
  assert.equal(responseJenis.status, 400);
  assert.equal(jenis.calls.length, 0);

  const pilihan = handler();
  const responsePilihan = await pilihan.api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...obstetri, janin: 'Tidak valid' }),
  }));
  assert.equal(responsePilihan.status, 400);
  assert.equal(pilihan.calls.length, 0);
});

test('simpan obstetri dan ginekologi memakai tabel, transaksi, dan parameter masing-masing', async () => {
  for (const [input, tabel] of [[obstetri, 'pemeriksaan_obstetri_ralan'], [ginekologi, 'pemeriksaan_ginekologi_ralan']]) {
    const { api, calls } = handler();
    const response = await api.POST(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
    }));
    assert.equal(response.status, 200);
    const insert = calls.find(([sql]) => typeof sql === 'string' && new RegExp(`INSERT INTO ${tabel}`).test(sql));
    assert.equal(insert[1][0], dasar.no_rawat);
    assert.ok(calls.some(([value]) => value === 'COMMIT'));
  }
});

test('ubah non-admin mengikuti batas 48 jam', async () => {
  const { api, calls } = handler({ admin: false, umurJam: 49 });
  const response = await api.PUT(new NextRequest('http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...ginekologi, asli_tanggal: dasar.tgl_perawatan, asli_jam: dasar.jam_rawat }),
  }));
  assert.equal(response.status, 409);
  assert.ok(calls.some(([value]) => value === 'ROLLBACK'));
  assert.equal(calls.some(([sql]) => typeof sql === 'string' && /UPDATE pemeriksaan_ginekologi_ralan/.test(sql)), false);
});

test('hapus memakai identitas komposit dan tabel sesuai tab', async () => {
  const { api, calls } = handler();
  const response = await api.DELETE(new NextRequest(`http://localhost/api/tindakan-rawat-jalan/pemeriksaan-obgyn?jenis=obstetri&no_rawat=${encodeURIComponent(dasar.no_rawat)}&tanggal=${dasar.tgl_perawatan}&jam=${dasar.jam_rawat}`));
  assert.equal(response.status, 200);
  const deletion = calls.find(([sql]) => typeof sql === 'string' && /DELETE FROM pemeriksaan_obstetri_ralan/.test(sql));
  assert.deepEqual(deletion[1], [dasar.no_rawat, dasar.tgl_perawatan, dasar.jam_rawat]);
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
});

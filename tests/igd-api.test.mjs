import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

const hariIni = '2026-11-21';

function isRegistrationDate(nilai) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nilai)) return false;
  const tanggal = new Date(`${nilai}T00:00:00Z`);
  return !Number.isNaN(tanggal.getTime()) && tanggal.toISOString().slice(0, 10) === nilai;
}

class RegistrationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function registrationInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RegistrationError('Data registrasi tidak valid.');
  const string = (key, fallback = '') => typeof body[key] === 'string' ? body[key].trim() : fallback;
  return {
    no_rawat: string('no_rawat'),
    tanggal: string('tgl_registrasi', hariIni),
    jam: string('jam_reg', '07:00:00'),
    pasien: string('no_rkm_medis', '000001'),
    dokter: string('kd_dokter', 'D1'),
    poli: string('kd_poli', 'IGDK'),
    penjamin: string('kd_pj', 'P01'),
    jawab: string('p_jawab', '-') || '-',
    alamat: string('almt_pj', '-') || '-',
    hubungan: string('hubunganpj', 'DIRI SENDIRI') || '-',
    rujukan: string('asal_rujukan', '-'),
    stts: string('stts', 'Belum'),
    bayar: string('status_bayar', 'Belum Bayar'),
    stts_daftar: 'Lama',
  };
}

function koneksiPalsu() {
  const log = [];
  return {
    log,
    execute: async (sql, params) => { log.push(['execute', sql, params]); return []; },
    beginTransaction: async () => { log.push(['begin']); },
    commit: async () => { log.push(['commit']); },
    rollback: async () => { log.push(['rollback']); },
    release: () => { log.push(['release']); },
    destroy: () => { log.push(['destroy']); },
  };
}

function muatRute(relatif, opsi = {}) {
  const file = resolve(relatif);
  const calls = [];
  const nomorLog = [];
  const koneksi = koneksiPalsu();
  const old = {
    no_reg: '001', no_rawat: '2026/11/21/000001', no_rkm_medis: '000001',
    kd_poli: 'IGDK', kd_dokter: 'D1', tgl_registrasi: hariIni,
    biaya_reg: 10000, status_bayar: 'Belum Bayar', status_lanjut: 'Ralan', stts: 'Belum',
    ...(opsi.old || {}),
  };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push(['query', sql, params]);
        if (sql.startsWith('SELECT COUNT')) return [{ total: 3 }];
        if (sql.includes('FROM poliklinik')) return [{ kd_poli: 'IGDK', nm_poli: 'IGD', registrasi: 10000, registrasilama: 10000 }];
        if (sql.includes('FROM dokter')) return [{ kd_dokter: 'D1', nm_dokter: 'Dr. Satu' }];
        if (sql.includes('FROM penjab')) return [{ kd_pj: 'P01', png_jawab: 'Umum' }];
        if (sql.includes('FROM pasien')) return [{ no_rkm_medis: '000001', nm_pasien: 'Pasien Uji' }];
        return [{ no_rawat: '2026/11/21/000001' }];
      },
      pool: {
        execute: async (sql, params) => { calls.push(['pool.execute', sql, params]); return []; },
        getConnection: async () => koneksi,
      },
    },
    '@/lib/igd/access': {
      igdAccess: async () => opsi.aksesDitolak
        ? NextResponse.json({ success: false, error: 'Akses IGD tidak diizinkan.' }, { status: 403 })
        : null,
    },
    '@/lib/igd/constants': { POLI_IGD: 'IGDK' },
    '@/lib/igd/records': {
      assertIgdRegistration: (registrasi) => {
        if (registrasi.kd_poli !== 'IGDK' || (registrasi.status_lanjut && registrasi.status_lanjut !== 'Ralan')) {
          throw new RegistrationError('Data ini bukan kunjungan IGD.', 404);
        }
      },
      ensureIgdUnit: async (conn) => { conn.log.push(['unit', 'IGDK']); },
      ensureNoActiveInpatient: async (conn, rm) => { conn.log.push(['rawat-inap', rm]); },
      igdTariffReference: () => ({ kd_poli: 'IGDK' }),
    },
    '@/lib/registrasi/date': { isRegistrationDate, registrationDate: () => hariIni },
    '@/lib/registrasi/numbering': {
      getRegistrationNumbers: async (_pool, input) => {
        nomorLog.push(['get', input]);
        return { no_reg: '003', no_rawat: '2026/11/21/000003' };
      },
      saveWithRegistrationNumbers: async (_conn, input, simpan) => {
        nomorLog.push(['save', input]);
        const nomor = { no_reg: '004', no_rawat: '2026/11/21/000004' };
        await simpan(nomor);
        return nomor;
      },
    },
    '@/lib/registrasi/records': {
      ensureNoCareRecords: async (conn, rawat) => { conn.log.push(['FK', rawat]); },
      lockRegistration: async (conn, rawat) => {
        conn.log.push(['lock', rawat]);
        return { ...old, no_rawat: rawat };
      },
      registrationValues: async (_conn, input) => [
        input.tanggal, input.jam, input.dokter, input.pasien, input.poli,
        input.jawab, input.alamat, input.hubungan, 10000, input.stts, input.stts_daftar,
        input.penjamin, 30, 'Th', input.bayar, 'Lama',
      ],
      saveReferral: async (conn, rawat, rujukan) => { conn.log.push(['rujukan', rawat, rujukan]); },
    },
    '@/lib/registrasi/validation': { RegistrationError, registrationInput },
  };
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, file);
  return { api: mod.exports, calls, koneksi, nomorLog };
}

const ruteUtama = 'src/app/api/igd/route.ts';

function queryCalls(calls) {
  return calls.filter((call) => call[0] === 'query').map(([, sql, params]) => ({ sql, params }));
}

test('filter IGD memakai periode hari ini dan query berparameter', async () => {
  const { api, calls } = muatRute(ruteUtama);
  const res = await api.GET(new NextRequest('http://localhost/api/igd'));
  const result = await res.json();
  const query = queryCalls(calls);
  assert.equal(res.status, 200);
  assert.equal(result.total, 3);
  assert.match(query[0].sql, /r\.kd_poli = 'IGDK'/);
  assert.match(query[0].sql, /r\.tgl_registrasi >= \?/);
  assert.match(query[0].sql, /r\.tgl_registrasi < DATE_ADD\(\?, INTERVAL 1 DAY\)/);
  assert.deepEqual(query[0].params, [hariIni, hariIni]);
  assert.match(query[1].sql, /ORDER BY r\.no_rawat\s+LIMIT \?/);
  assert.deepEqual(query[1].params, [hariIni, hariIni, 50]);
});

test('filter IGD menggabungkan kata kunci, status, dan SEP belum terbit', async () => {
  const { api, calls } = muatRute(ruteUtama);
  const url = 'http://localhost/api/igd?tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-21&cari=ani&stts=Belum&sep=Belum&limit=25';
  const res = await api.GET(new NextRequest(url));
  const query = queryCalls(calls);
  assert.equal(res.status, 200);
  assert.match(query[0].sql, /penj\.png_jawab LIKE \?/);
  assert.match(query[0].sql, /r\.stts = \?/);
  assert.match(query[0].sql, /r\.no_rawat NOT IN \(SELECT bridging_sep\.no_rawat FROM bridging_sep\)/);
  assert.deepEqual(query[0].params.slice(0, 3), ['2026-11-01', '2026-11-21', '%ani%']);
  assert.deepEqual(query[0].params.slice(-2), ['%ani%', 'Belum']);
  assert.equal(query[0].params.length, 16);
  assert.equal(query[1].params.length, 17);
  assert.deepEqual(query[1].params.slice(-1), [25]);
});

test('filter SEP sudah terbit memakai IN pada bridging_sep', async () => {
  const { api, calls } = muatRute(ruteUtama);
  const res = await api.GET(new NextRequest('http://localhost/api/igd?sep=Sudah'));
  const query = queryCalls(calls);
  assert.equal(res.status, 200);
  assert.match(query[0].sql, /r\.no_rawat IN \(SELECT bridging_sep\.no_rawat FROM bridging_sep\)/);
});

test('filter IGD tidak valid ditolak tanpa query database', async () => {
  const kasus = [
    'tanggal_mulai=2026-02-30',
    'tanggal_mulai=2026-11-22&tanggal_selesai=2026-11-21',
    'sep=Ada',
    'stts=Lain',
    `cari=${'x'.repeat(101)}`,
    'limit=101',
    'limit=0',
  ];
  for (const query of kasus) {
    const { api, calls } = muatRute(ruteUtama);
    assert.equal((await api.GET(new NextRequest(`http://localhost/api/igd?${query}`))).status, 400, query);
    assert.equal(queryCalls(calls).length, 0, query);
  }
});

test('akses IGD ditolak untuk seluruh operasi', async () => {
  const { api, calls, koneksi, nomorLog } = muatRute(ruteUtama, { aksesDitolak: true });
  const body = JSON.stringify({ tgl_registrasi: hariIni, jam_reg: '07:00:00' });
  assert.equal((await api.GET(new NextRequest('http://localhost/api/igd'))).status, 403);
  assert.equal((await api.POST(new NextRequest('http://localhost/api/igd', { method: 'POST', body }))).status, 403);
  assert.equal((await api.PUT(new NextRequest('http://localhost/api/igd', { method: 'PUT', body }))).status, 403);
  assert.equal((await api.DELETE(new NextRequest('http://localhost/api/igd?no_rawat=2026/11/21/000001'))).status, 403);
  assert.equal(queryCalls(calls).length, 0);
  assert.equal(koneksi.log.length, 0);
  assert.equal(nomorLog.length, 0);
});

test('simpan IGD memaksa unit, status awal, dan status lanjut Ralan', async () => {
  const { api, koneksi, nomorLog } = muatRute(ruteUtama);
  const body = JSON.stringify({
    tgl_registrasi: hariIni, jam_reg: '07:30:00', kd_dokter: 'D1', no_rkm_medis: '000001',
    kd_pj: 'P01', stts: 'Sudah', status_bayar: 'Sudah Bayar', asal_rujukan: 'Puskesmas',
  });
  const res = await api.POST(new NextRequest('http://localhost/api/igd', { method: 'POST', body }));
  assert.equal(res.status, 200);
  const insert = koneksi.log.find(([jenis, sql]) => jenis === 'execute' && sql.startsWith('INSERT INTO reg_periksa'));
  assert.ok(insert);
  assert.match(insert[1], /status_lanjut\)[\s\S]*'Ralan'/);
  assert.deepEqual(insert[2].slice(0, 2), ['004', '2026/11/21/000004']);
  assert.equal(insert[2][6], 'IGDK');
  assert.equal(insert[2][11], 'Belum');
  assert.equal(insert[2][16], 'Belum Bayar');
  assert.deepEqual(nomorLog[0], ['save', { tanggal: hariIni, dokter: 'D1', poli: 'IGDK' }]);
  assert.ok(koneksi.log.some(([jenis, nilai]) => jenis === 'unit' && nilai === 'IGDK'));
  assert.ok(koneksi.log.some(([jenis, nilai]) => jenis === 'rawat-inap' && nilai === '000001'));
  assert.ok(koneksi.log.some(([jenis, , rujukan]) => jenis === 'rujukan' && rujukan === 'Puskesmas'));
  assert.ok(koneksi.log.some(([jenis]) => jenis === 'commit'));
});

test('ubah IGD mempertahankan status lama dan nomor antrean yang tidak berubah', async () => {
  const { api, koneksi } = muatRute(ruteUtama, { old: { stts: 'Sudah', status_bayar: 'Belum Bayar', no_reg: '001' } });
  const body = JSON.stringify({
    no_rawat: '2026/11/21/000001', tgl_registrasi: hariIni, jam_reg: '08:00:00',
    kd_dokter: 'D1', no_rkm_medis: '000001', kd_pj: 'P01', stts: 'Belum', status_bayar: 'Belum Bayar',
  });
  const res = await api.PUT(new NextRequest('http://localhost/api/igd', { method: 'PUT', body }));
  assert.equal(res.status, 200);
  const update = koneksi.log.find(([jenis, sql]) => jenis === 'execute' && sql.startsWith('UPDATE reg_periksa'));
  assert.ok(update);
  assert.match(update[1], /WHERE no_rawat=\? AND kd_poli=\?/);
  assert.equal(update[2][9], 'Sudah');
  assert.equal(update[2][14], 'Belum Bayar');
  assert.equal(update[2][16], '001');
  assert.equal(update[2][18], 'IGDK');
  assert.ok(koneksi.log.some(([jenis]) => jenis === 'commit'));
});

test('ubah IGD yang sudah dibayar ditolak', async () => {
  const { api, koneksi } = muatRute(ruteUtama, { old: { status_bayar: 'Sudah Bayar' } });
  const body = JSON.stringify({
    no_rawat: '2026/11/21/000001', tgl_registrasi: hariIni, jam_reg: '08:00:00',
    kd_dokter: 'D1', no_rkm_medis: '000001', kd_pj: 'P01', stts: 'Belum', status_bayar: 'Sudah Bayar',
  });
  const res = await api.PUT(new NextRequest('http://localhost/api/igd', { method: 'PUT', body }));
  assert.equal(res.status, 409);
  assert.ok(!koneksi.log.some(([jenis, sql]) => jenis === 'execute' && sql.startsWith('UPDATE reg_periksa')));
});

test('hapus IGD menolak data dari unit lain', async () => {
  const { api, koneksi } = muatRute(ruteUtama, { old: { kd_poli: 'P01' } });
  const res = await api.DELETE(new NextRequest('http://localhost/api/igd?no_rawat=2026/11/21/000001'));
  assert.equal(res.status, 404);
  assert.ok(!koneksi.log.some(([jenis, sql]) => jenis === 'execute' && sql.startsWith('DELETE FROM reg_periksa')));
});

test('opsi IGD memakai unit tetap dan menolak akses tanpa izin', async () => {
  const { api, calls } = muatRute('src/app/api/igd/options/route.ts');
  const res = await api.GET(new NextRequest('http://localhost/api/igd/options'));
  assert.equal(res.status, 200);
  const result = await res.json();
  assert.equal(result.data.poli[0].kd_poli, 'IGDK');
  assert.ok(calls.some(([, sql]) => sql.includes('WHERE kd_poli = ?')));

  const pasien = muatRute('src/app/api/igd/options/route.ts');
  const resPasien = await pasien.api.GET(new NextRequest('http://localhost/api/igd/options?jenis=pasien&cari=Uji'));
  assert.equal(resPasien.status, 200);
  const jsonPasien = await resPasien.json();
  assert.ok(Array.isArray(jsonPasien.data));
  assert.equal(jsonPasien.data[0].no_rkm_medis, '000001');
  assert.ok(queryCalls(pasien.calls).some(({ sql }) => sql.includes('FROM pasien')));

  const ditolak = muatRute('src/app/api/igd/options/route.ts', { aksesDitolak: true });
  assert.equal((await ditolak.api.GET(new NextRequest('http://localhost/api/igd/options'))).status, 403);
  assert.equal(queryCalls(ditolak.calls).length, 0);
});

test('nomor IGD selalu memakai unit IGDK', async () => {
  const { api, nomorLog } = muatRute('src/app/api/igd/nomor/route.ts');
  const res = await api.GET(new NextRequest(`http://localhost/api/igd/nomor?tanggal=${hariIni}&dokter=D1&poli=P01`));
  assert.equal(res.status, 200);
  assert.deepEqual(nomorLog[0], ['get', { tanggal: hariIni, dokter: 'D1', poli: 'IGDK' }]);

  const ditolak = muatRute('src/app/api/igd/nomor/route.ts', { aksesDitolak: true });
  assert.equal((await ditolak.api.GET(new NextRequest(`http://localhost/api/igd/nomor?tanggal=${hariIni}&dokter=D1`))).status, 403);
  assert.equal(ditolak.nomorLog.length, 0);
});

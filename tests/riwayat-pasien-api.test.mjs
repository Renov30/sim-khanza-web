import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';

const load = createRequire(import.meta.url);
const { NextRequest, NextResponse } = load('next/server');

function loadTs(file, mocks, cache) {
  if (cache.has(file)) return cache.get(file).exports;
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  cache.set(file, mod);
  mod.require = (id) => {
    if (mocks[id]) return mocks[id];
    if (id.startsWith('@/')) {
      const target = resolve(process.cwd(), 'src', id.slice(2));
      const candidates = [`${target}.ts`, `${target}.tsx`, resolve(target, 'index.ts')];
      const ditemukan = candidates.find((candidate) => existsSync(candidate));
      if (ditemukan) return loadTs(ditemukan, mocks, cache);
    }
    return load(id);
  };
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText, file);
  return mod.exports;
}

const identitas = {
  no_rm: '000006',
  nama: 'Pasien Uji',
  jenis_kelamin: 'L',
  alamat: 'Jalan Uji',
};
const induk = {
  no_rawat: '2026/01/01/000001',
  no_registrasi: '000001',
  tanggal: '2026-01-01',
  jam: '08:00:00',
  status_lanjut: 'Ralan',
  nama_dokter: 'dr. Uji',
  nama_poli: 'Poli Umum',
  biaya_registrasi: 100,
};

function handler({ denied, rows } = {}) {
  const calls = [];
  const cache = new Map();
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        return rows ? rows(sql, params) : [];
      },
    },
    '@/lib/tindakan-rawat-jalan/access': {
      tindakanRawatJalanAccess: async () => denied
        ? NextResponse.json({ success: false, error: 'Ditolak' }, { status: denied })
        : null,
    },
  };
  const api = loadTs(resolve('src/app/api/riwayat-pasien/route.ts'), mocks, cache);
  return { api, calls };
}

function rowsDefault(khusus = {}) {
  return (sql) => {
    if (/FROM pasien p/.test(sql)) return [identitas];
    if (/COUNT\(\*\) AS total/.test(sql)) return [{ total: 12 }];
    if (khusus.row && khusus.petanda && khusus.petanda.test(sql)) return khusus.row;
    return [induk];
  };
}

function request(kueri = '') {
  return new NextRequest(`http://localhost/api/riwayat-pasien?${kueri}`);
}

const DASAR = 'no_rm=000006&tab=kunjungan';

for (const code of [401, 403]) {
  test(`riwayat pasien menolak akses ${code} sebelum query`, async () => {
    const { api, calls } = handler({ denied: code });
    const response = await api.GET(request(DASAR));
    assert.equal(response.status, code);
    assert.equal(calls.length, 0);
  });
}

test('riwayat pasien memvalidasi tab, mode, nomor RM, periode, dan nomor', async () => {
  const { api, calls } = handler();
  for (const kueri of [
    'no_rm=000006&tab=asal',
    'no_rm=000006&mode=acak',
    'no_rm=&tab=kunjungan',
    'no_rm=000006&tab=kunjungan&mode=tanggal&tanggal_awal=2026-01-01',
    'no_rm=000006&tab=kunjungan&mode=tanggal&tanggal_awal=2026-02-01&tanggal_akhir=2026-01-01',
    'no_rm=000006&tab=kunjungan&mode=nomor',
  ]) {
    const response = await api.GET(request(kueri));
    assert.equal(response.status, 400, kueri);
  }
  assert.equal(calls.length, 0);
});

test('pemilih pasien mencari nomor RM dan nama dengan query berparameter', async () => {
  const { api, calls } = handler({ rows: rowsDefault() });
  const response = await api.GET(request('resource=pasien&cari=Pasien%20Uji'));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.success, true);
  assert.equal(json.data.items[0].no_rm, identitas.no_rm);
  const pencarian = calls.find(([sql]) => /p\.no_rkm_medis LIKE \? OR p\.nm_pasien LIKE \?/.test(sql));
  assert.ok(pencarian);
  assert.deepEqual(pencarian[1], ['%Pasien Uji%', '%Pasien Uji%', 'Pasien Uji']);
});

test('R1 kunjungan memakai filter batal, urutan terbaru, dan batas lima', async () => {
  const { api, calls } = handler({ rows: rowsDefault() });
  const response = await api.GET(request(DASAR));
  const json = await response.json();
  assert.equal(response.status, 200);
  assert.equal(json.success, true);
  assert.equal(json.data.mode, 'terakhir');
  assert.equal(json.data.limit, 5);
  assert.equal(json.data.total, 12);
  assert.equal(json.data.items[0].no_rawat, induk.no_rawat);
  const daftar = calls.find(([sql]) => /SELECT r\.no_rawat/.test(sql) && !/COUNT\(\*\)/.test(sql));
  assert.match(daftar[0], /r\.stts <> 'Batal' AND r\.no_rkm_medis = \?/);
  assert.match(daftar[0], /ORDER BY r\.tgl_registrasi DESC, r\.jam_reg DESC LIMIT \? OFFSET \?/);
  assert.deepEqual(daftar[1], ['000006', 5, 0]);
});

test('R3 kunjungan menambah rentang tanggal dan R4 menyaring nomor rawat', async () => {
  const { api, calls } = handler({ rows: rowsDefault() });
  await api.GET(request('no_rm=000006&tab=kunjungan&mode=tanggal&tanggal_awal=2026-01-01&tanggal_akhir=2026-01-31'));
  const antara = calls.find(([sql]) => /BETWEEN \? AND \?/.test(sql));
  assert.deepEqual(antara[1].slice(0, 3), ['000006', '2026-01-01', '2026-01-31']);

  const kedua = handler({ rows: rowsDefault() });
  await kedua.api.GET(request('no_rm=000006&tab=kunjungan&mode=nomor&nomor=2026%2F01%2F01%2F000001'));
  const nomor = kedua.calls.find(([sql]) => /r\.no_rawat = \?/.test(sql));
  assert.deepEqual(nomor[1].slice(0, 2), ['000006', '2026/01/01/000001']);
});

test('pagination mode semua dibatasi maksimal 100 baris dan offset 100000', async () => {
  const { api, calls } = handler({ rows: rowsDefault() });
  const response = await api.GET(request('no_rm=000006&tab=kunjungan&mode=semua&limit=500&offset=999999'));
  const json = await response.json();
  assert.equal(json.data.limit, 100);
  assert.equal(json.data.offset, 100000);
  const daftar = calls.find(([sql]) => /SELECT r\.no_rawat/.test(sql) && /LIMIT \? OFFSET \?/.test(sql));
  assert.deepEqual(daftar[1].slice(-2), [100, 100000]);
});

test('identitas tidak mengambil data sensitif pasien', async () => {
  const { api, calls } = handler({ rows: rowsDefault() });
  await api.GET(request(DASAR));
  const ident = calls.find(([sql]) => /FROM pasien p/.test(sql));
  assert.doesNotMatch(ident[0], /no_ktp|no_peserta|no_tlp/);
  assert.match(ident[0], /nama_bahasa AS bahasa/);
  assert.match(ident[0], /nama_cacat AS cacat_fisik/);
});

test('SOAPI menggabungkan pemeriksaan ralan dan ranap per kunjungan', async () => {
  const detail = [
    { sumber: 'Ralan', no_rawat: induk.no_rawat, tanggal: '2026-01-01', jam: '08:01:00', subjek: 'S1' },
    { sumber: 'Ranap', no_rawat: induk.no_rawat, tanggal: '2026-01-01', jam: '09:01:00', subjek: 'S2' },
    { sumber: 'Ralan', no_rawat: 'LAIN', tanggal: '2026-01-01', jam: '10:01:00', subjek: 'S3' },
  ];
  const { api, calls } = handler({ rows: rowsDefault({ petanda: /pemeriksaan_ralan pr/, row: detail }) });
  const response = await api.GET(request('no_rm=000006&tab=soapi'));
  const json = await response.json();
  assert.equal(json.data.items[0].detail.length, 2);
  const sqlDetail = calls.find(([sql]) => /pemeriksaan_ralan pr/.test(sql));
  assert.match(sqlDetail[0], /pemeriksaan_ranap pr/);
  assert.match(sqlDetail[0], /UNION ALL/);
});

test('perawatan merangkum tindakan, kamar, dan total biaya', async () => {
  const rows = rowsDefault();
  const dasar = rows;
  const khusus = (sql) => {
    if (/FROM pasien p/.test(sql)) return [identitas];
    if (/COUNT\(\*\) AS total/.test(sql)) return [{ total: 1 }];
    if (/FROM rawat_jl_dr r/.test(sql)) return [
      { no_rawat: induk.no_rawat, kode: 'T1', biaya: 200 },
      { no_rawat: induk.no_rawat, kode: 'T2', biaya: 300 },
    ];
    if (/SELECT ki\.no_rawat/.test(sql)) return [{ no_rawat: induk.no_rawat, kode: 'K1', biaya: 400 }];
    if (/FROM diagnosa_pasien dp/.test(sql)) return [{ no_rawat: induk.no_rawat, kode: 'A01' }];
    if (/FROM prosedur_pasien pp/.test(sql)) return [{ no_rawat: induk.no_rawat, kode: '00.01', jumlah: null }];
    if (/FROM resume_pasien rp/.test(sql)) return [{ no_rawat: induk.no_rawat, dokter: 'dr. Uji' }];
    if (/FROM bridging_sep/.test(sql)) return [{ no_rawat: induk.no_rawat, nomor: 'SEP1' }];
    return dasar(sql);
  };
  const { api } = handler({ rows: khusus });
  const response = await api.GET(request('no_rm=000006&tab=perawatan&mode=nomor&nomor=2026%2F01%2F01%2F000001'));
  const json = await response.json();
  const item = json.data.items[0];
  assert.equal(item.sections.tindakan.length, 2);
  assert.equal(item.sections.kamar.length, 1);
  assert.equal(item.total_tindakan, 500);
  assert.equal(item.total_kamar, 400);
  assert.equal(item.total_biaya, 1000);
  assert.equal(item.sections.prosedur[0].jumlah, null);
});

test('pembelian hanya menampilkan penjualan lunas dan merincikan obat', async () => {
  const pembelian = { nomor: 'PJ001', tanggal: '2026-01-01', petugas: 'Petugas Uji' };
  const detail = [{ nomor: 'PJ001', kode: 'B1', nama: 'Obat Uji', total: 15000 }];
  const rows = (sql) => {
    if (/FROM pasien p/.test(sql)) return [identitas];
    if (/COUNT\(\*\) AS total/.test(sql)) return [{ total: 1 }];
    if (/FROM detailjual d/.test(sql)) return detail;
    return [pembelian];
  };
  const { api, calls } = handler({ rows });
  const response = await api.GET(request('no_rm=000006&tab=pembelian'));
  const json = await response.json();
  assert.equal(json.data.items[0].detail.length, 1);
  const indukSql = calls.find(([sql]) => /SELECT j\.nota_jual AS nomor/.test(sql));
  assert.match(indukSql[0], /j\.status = 'Sudah Dibayar'/);
});

test('piutang memakai nota piutang dan tidak menyaring status lunas', async () => {
  const piutang = { nomor: 'PD001', tanggal: '2026-01-01', sisapiutang: 25000 };
  const rows = (sql) => {
    if (/FROM pasien p/.test(sql)) return [identitas];
    if (/COUNT\(\*\) AS total/.test(sql)) return [{ total: 1 }];
    if (/FROM detailpiutang d/.test(sql)) return [{ nomor: 'PD001', kode: 'B1', total: 25000 }];
    return [piutang];
  };
  const { api, calls } = handler({ rows });
  const response = await api.GET(request('no_rm=000006&tab=piutang'));
  const json = await response.json();
  assert.equal(json.data.items[0].detail.length, 1);
  const indukSql = calls.find(([sql]) => /SELECT p\.nota_piutang AS nomor/.test(sql));
  assert.doesNotMatch(indukSql[0], /Sudah Dibayar/);
});

test('retensi tidak mengembalikan path berkas mentah', async () => {
  const rows = (sql) => {
    if (/FROM pasien p/.test(sql)) return [identitas];
    if (/COUNT\(\*\) AS total/.test(sql)) return [{ total: 1 }];
    return [{ tanggal: '2026-01-01', terakhir_daftar: '2025-12-31', berkas: 'Tersedia' }];
  };
  const { api } = handler({ rows });
  const response = await api.GET(request('no_rm=000006&tab=retensi'));
  const json = await response.json();
  assert.equal(json.data.items[0].berkas, 'Tersedia');
  assert.equal('lokasi_pdf' in json.data.items[0], false);
});

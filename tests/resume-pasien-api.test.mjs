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

const PANJANG_RESUME = {
  kd_dokter: 20, keluhan_utama: 2000, jalannya_penyakit: 2000,
  pemeriksaan_penunjang: 2000, hasil_laborat: 2000,
  diagnosa_utama: 80, kd_diagnosa_utama: 10,
  diagnosa_sekunder: 80, kd_diagnosa_sekunder: 10,
  diagnosa_sekunder2: 80, kd_diagnosa_sekunder2: 10,
  diagnosa_sekunder3: 80, kd_diagnosa_sekunder3: 10,
  diagnosa_sekunder4: 80, kd_diagnosa_sekunder4: 10,
  prosedur_utama: 80, kd_prosedur_utama: 8,
  prosedur_sekunder: 80, kd_prosedur_sekunder: 8,
  prosedur_sekunder2: 80, kd_prosedur_sekunder2: 8,
  prosedur_sekunder3: 80, kd_prosedur_sekunder3: 8,
  obat_pulang: 2000,
};

const resumeKosong = (noRawat = '', kdDokter = '') => ({
  no_rawat: noRawat, kd_dokter: kdDokter, keluhan_utama: '', jalannya_penyakit: '',
  pemeriksaan_penunjang: '', hasil_laborat: '', diagnosa_utama: '', kd_diagnosa_utama: '',
  diagnosa_sekunder: '', kd_diagnosa_sekunder: '', diagnosa_sekunder2: '',
  kd_diagnosa_sekunder2: '', diagnosa_sekunder3: '', kd_diagnosa_sekunder3: '',
  diagnosa_sekunder4: '', kd_diagnosa_sekunder4: '', prosedur_utama: '',
  kd_prosedur_utama: '', prosedur_sekunder: '', kd_prosedur_sekunder: '',
  prosedur_sekunder2: '', kd_prosedur_sekunder2: '', prosedur_sekunder3: '',
  kd_prosedur_sekunder3: '', kondisi_pulang: 'Hidup', obat_pulang: '',
});

const form = {
  ...resumeKosong('2026/11/20/000001', 'D1'),
  keluhan_utama: 'Demam', jalannya_penyakit: 'Membaik', pemeriksaan_penunjang: 'Normal',
  hasil_laborat: 'Hb 12', diagnosa_utama: 'Demam', kd_diagnosa_utama: 'A00',
  prosedur_utama: 'Observasi', kd_prosedur_utama: '9.99', obat_pulang: 'Parasetamol',
};

function handler({
  denied,
  admin = true,
  username = 'D1',
  adaResume = false,
  dokterDitemukan = true,
  pemilik = 'D1',
} = {}) {
  const calls = [];
  const connection = {
    beginTransaction: async () => calls.push(['BEGIN']),
    commit: async () => calls.push(['COMMIT']),
    rollback: async () => calls.push(['ROLLBACK']),
    release: () => calls.push(['RELEASE']),
    execute: async (sql, params) => {
      calls.push([sql, params]);
      if (/FROM reg_periksa WHERE no_rawat = \? AND status_lanjut = 'Ralan' FOR UPDATE/.test(sql)) {
        return [[{ no_rawat: '2026/11/20/000001', no_rkm_medis: '0000001' }]];
      }
      if (/SELECT kd_dokter FROM dokter WHERE kd_dokter = \? LIMIT 1/.test(sql)) {
        return dokterDitemukan ? [[{ kd_dokter: username }]] : [[]];
      }
      if (/SELECT kd_dokter FROM resume_pasien WHERE no_rawat = \? FOR UPDATE/.test(sql)) {
        return [[{ kd_dokter: pemilik }]];
      }
      return [{ affectedRows: 1 }];
    },
  };
  const session = { username, isAdmin: admin, role: admin ? 'admin' : 'user', permissions: { data_resume_pasien: true } };
  const mocks = {
    '@/lib/db': {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (/SELECT r\.no_rawat, r\.no_rkm_medis, p\.nm_pasien/.test(sql)) {
          return [{
            no_rawat: '2026/11/20/000001', no_rkm_medis: '0000001', nm_pasien: 'Pasien Uji',
            jk: 'L', umurdaftar: 30, sttsumur: 'Th', tgl_registrasi: '2026-11-20',
            jam_reg: '08:00:00', kd_dokter: 'D1', nm_dokter: 'dr. Uji', kd_poli: 'POLI',
            nm_poli: 'Poli Umum', status_bayar: 'Belum Bayar',
          }];
        }
        if (/SELECT \* FROM resume_pasien WHERE no_rawat = \?/.test(sql)) return adaResume ? [form] : [];
        if (/SELECT COUNT\(\*\) AS jumlah/.test(sql)) return [{ jumlah: adaResume ? 1 : 0 }];
        if (/FROM resume_pasien rp[\s\S]*ORDER BY/.test(sql)) return adaResume ? [form] : [];
        if (/SELECT kd_dokter AS kode/.test(sql)) return [{ kode: 'D1', nama: 'dr. Uji' }];
        if (/FROM diagnosa_pasien dp/.test(sql)) return [{ kode: 'A00', nama: 'Demam' }];
        if (/FROM prosedur_pasien pp/.test(sql)) return [{ kode: '9.99', nama: 'Observasi' }];
        if (/SELECT kd_dokter FROM dokter WHERE kd_dokter = \? LIMIT 1/.test(sql)) {
          return dokterDitemukan ? [{ kd_dokter: username }] : [];
        }
        return [];
      },
      pool: { getConnection: async () => connection },
    },
    '@/lib/auth': { getSession: async () => session },
    '@/lib/resume-pasien/access': {
      resumePasienAccess: async () => denied ? NextResponse.json({ success: false }, { status: denied }) : null,
    },
    '@/lib/registrasi/date': { isRegistrationDate },
    '@/lib/resume-pasien/types': { KONDISI_PULANG: ['Hidup', 'Meninggal'], PANJANG_RESUME, resumeKosong },
  };
  const file = resolve('src/app/api/resume-pasien/route.ts');
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => mocks[id] ?? load(id);
  mod._compile(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return { api: mod.exports, calls };
}

const permintaan = (method = 'GET', body) => new NextRequest(`http://localhost/api/resume-pasien?no_rawat=${encodeURIComponent(form.no_rawat)}`, {
  method,
  headers: body ? { 'Content-Type': 'application/json' } : undefined,
  body: body ? JSON.stringify(body) : undefined,
});

test('akses resume ditolak sebelum query', async () => {
  const { api, calls } = handler({ denied: 403 });
  const response = await api.GET(permintaan());
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test('GET mengembalikan identitas, resume, daftar, dan unggulan', async () => {
  const { api, calls } = handler({ admin: false, adaResume: true });
  const response = await api.GET(permintaan());
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.success, true);
  assert.equal(json.data.ada, true);
  assert.equal(json.data.bisa_ubah, true);
  assert.equal(json.data.resume.no_rawat, form.no_rawat);
  assert.equal(json.data.daftar[0].kd_diagnosa_utama, 'A00');
  assert.equal(json.data.unggulan.diagnosa[0].kode, 'A00');
  const kunjungan = calls.find(([sql]) => typeof sql === 'string' && /SELECT r\.no_rawat, r\.no_rkm_medis/.test(sql));
  assert.deepEqual(kunjungan[1], [form.no_rawat]);
});

test('GET riwayat resume memakai sumber data dan parameter yang diizinkan', async () => {
  const { api, calls } = handler();
  const response = await api.GET(new NextRequest(`http://localhost/api/resume-pasien?resource=riwayat&jenis=laborat&no_rawat=${encodeURIComponent(form.no_rawat)}&cari=Hb`));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.success, true);
  const riwayat = calls.find(([sql]) => typeof sql === 'string' && /FROM detail_periksa_lab/.test(sql));
  assert.deepEqual(riwayat[1], [form.no_rawat, '%Hb%', '%Hb%']);
});

test('POST memakai transaksi dan identitas dokter dari sesi', async () => {
  const { api, calls } = handler({ admin: false, username: 'D1' });
  const response = await api.POST(permintaan('POST', { ...form, kd_dokter: 'D99' }));
  assert.equal(response.status, 200);
  const insert = calls.find(([sql]) => typeof sql === 'string' && /INSERT INTO resume_pasien/.test(sql));
  assert.equal(insert[1][0], form.no_rawat);
  assert.equal(insert[1][1], 'D1');
  assert.equal(insert[1].at(-1), 'Parasetamol');
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
  assert.ok(!calls.some(([value]) => value === 'ROLLBACK'));
});

test('user login bukan dokter tidak dapat menyimpan resume', async () => {
  const { api, calls } = handler({ admin: false, username: 'P1', dokterDitemukan: false });
  const response = await api.POST(permintaan('POST', form));
  assert.equal(response.status, 403);
  assert.ok(!calls.some(([value]) => value === 'COMMIT'));
});

test('dokter lain tidak dapat mengubah resume yang sudah ada', async () => {
  const { api } = handler({ admin: false, username: 'D2', pemilik: 'D1', adaResume: true });
  const response = await api.PUT(permintaan('PUT', form));
  assert.equal(response.status, 403);
});

test('DELETE menghapus resume dengan transaksi dan query berparameter', async () => {
  const { api, calls } = handler({ admin: true, adaResume: true });
  const response = await api.DELETE(permintaan('DELETE'));
  assert.equal(response.status, 200);
  const hapus = calls.find(([sql]) => typeof sql === 'string' && /DELETE FROM resume_pasien/.test(sql));
  assert.deepEqual(hapus[1], [form.no_rawat]);
  assert.ok(calls.some(([value]) => value === 'COMMIT'));
});

test('kondisi pulang di luar allowlist ditolak', async () => {
  const { api, calls } = handler();
  const response = await api.POST(permintaan('POST', { ...form, kondisi_pulang: 'Pindah RS' }));
  assert.equal(response.status, 400);
  assert.ok(!calls.some(([value]) => value === 'COMMIT'));
});

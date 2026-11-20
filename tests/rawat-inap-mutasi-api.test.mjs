import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";
const load = createRequire(import.meta.url);
const { NextRequest } = load("next/server");

function muatModul(relatif, mocks = {}) {
  const file = resolve(relatif);
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  mod.require = (id) => {
    if (Object.prototype.hasOwnProperty.call(mocks, id)) return mocks[id];
    if (id.startsWith("@/")) throw new Error(`Modul belum dimock: ${id}`);
    return load(id);
  };
  mod._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, file);
  return mod.exports;
}

const konstanta = muatModul("src/lib/rawat-inap/constants.ts");
const hitung = muatModul("src/lib/rawat-inap/hitung.ts");
const mutasi = muatModul("src/lib/rawat-inap/mutasi.ts", {
  "@/lib/rawat-inap/constants": konstanta,
  "@/lib/rawat-inap/hitung": hitung,
});
const akses = muatModul("src/lib/rawat-inap/access.ts", {
  "@/lib/auth": { getSession: async () => ({ isAdmin: true, permissions: {} }) },
});

const barisInap = {
  no_rawat: "2026/11/20/000001",
  kd_kamar: "K1",
  trf_kamar: 100,
  diagnosa_awal: "A.01",
  diagnosa_akhir: "A.02",
  tgl_masuk: "2026-11-19",
  jam_masuk: "08:00:00",
  tgl_keluar: null,
  jam_keluar: null,
  lama: 1,
  ttl_biaya: 0,
  stts_pulang: "-",
  kd_pj: "BPJ",
  no_rkm_medis: "000001",
  nm_pasien: "Pasien Uji",
  nm_dokter: "D1",
};

function koneksiPalsu() {
  const calls = [];
  const connection = {
    calls,
    async execute(sql, params = []) {
      calls.push([sql, params]);
      if (sql.includes("FROM set_jam_minimal")) return [[{ lamajam: 12, hariawal: "No", diagnosaakhir: "Yes" }], []];
      if (sql.includes("FROM kamar_inap ki")) return [[{ ...barisInap }], []];
      if (sql.includes("AS tarif")) return [[{ tarif: 125 }], []];
      if (sql.includes("AS lama")) return [[{ lama: 2 }], []];
      if (sql.includes("FROM kamar WHERE kd_kamar = ? FOR UPDATE")) return [[{ kd_kamar: "K1", status: "KOSONG", trf_kamar: 100 }], []];
      if (sql.includes("GET_LOCK")) return [[{ didapat: 1 }], []];
      if (sql.includes("RELEASE_LOCK")) return [[{ dilepas: 1 }], []];
      if (sql.includes("CONCAT('R'")) return [[{ nomor: "R000000001" }], []];
      return [{ affectedRows: 1 }, []];
    },
    async beginTransaction() { calls.push(["BEGIN", []]); },
    async commit() { calls.push(["COMMIT", []]); },
    async rollback() { calls.push(["ROLLBACK", []]); },
    async release() { calls.push(["RELEASE", []]); },
  };
  return connection;
}

function muatRoute(relatif, connection, executeQuery = async () => []) {
  return muatModul(relatif, {
    "@/lib/db": { pool: { getConnection: async () => connection }, executeQuery },
    "@/lib/rawat-inap/access": akses,
    "@/lib/rawat-inap/mutasi": mutasi,
    "@/lib/rawat-inap/constants": konstanta,
  });
}

function permintaan(url, body) {
  return new NextRequest(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("pratinjau lama inap mengikuti batas jam dan hariawal", () => {
  const config = { lamajam: 12, hariawal: "No", diagnosaakhir: "No" };
  assert.equal(hitung.hitungLamaPratinjau("2026-11-19", "08:00:00", "2026-11-19", "21:00:00", config), 1);
  assert.equal(hitung.hitungLamaPratinjau("2026-11-19", "08:00:00", "2026-11-20", "08:00:00", config), 1);
  assert.equal(hitung.hitungLamaPratinjau("2026-11-19", "08:00:00", "2026-11-20", "08:00:00", { ...config, hariawal: "Yes" }), 2);
});

test("pulang menyimpan kamar inap dan membebaskan kamar", async () => {
  const connection = koneksiPalsu();
  const route = muatRoute("src/app/api/rawat-inap/pulang/route.ts", connection);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/pulang", {
    no_rawat: barisInap.no_rawat,
    kd_kamar: barisInap.kd_kamar,
    tgl_masuk: barisInap.tgl_masuk,
    jam_masuk: barisInap.jam_masuk,
    tgl_keluar: "2026-11-20",
    jam_keluar: "10:30:00",
    status_pulang: "Sehat",
    diagnosa_akhir: "A.02",
  }));
  const hasil = await res.json();
  assert.equal(res.status, 200);
  assert.equal(hasil.success, true);
  assert.equal(hasil.data.tindak_lanjut, null);
  assert.ok(connection.calls.some(([sql]) => sql.startsWith("UPDATE kamar_inap SET") && sql.includes("stts_pulang = ?")));
  assert.ok(connection.calls.some(([sql, params]) => sql.startsWith("UPDATE kamar SET status = ?") && params[0] === "KOSONG"));
  assert.ok(connection.calls.some(([sql]) => sql === "COMMIT"));
});

test("pulang menolak status tidak dikenal tanpa transaksi", async () => {
  const connection = koneksiPalsu();
  const route = muatRoute("src/app/api/rawat-inap/pulang/route.ts", connection);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/pulang", {
    no_rawat: barisInap.no_rawat,
    kd_kamar: barisInap.kd_kamar,
    tgl_masuk: barisInap.tgl_masuk,
    jam_masuk: barisInap.jam_masuk,
    tgl_keluar: "2026-11-20",
    jam_keluar: "10:30:00",
    status_pulang: "Unknown",
    diagnosa_akhir: "A.02",
  }));
  assert.equal(res.status, 400);
  assert.equal(connection.calls.length, 0);
});

test("pindah opsi 1 menghapus riwayat lama dan menulis kamar baru", async () => {
  const connection = koneksiPalsu();
  const route = muatRoute("src/app/api/rawat-inap/pindah-kamar/route.ts", connection);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/pindah-kamar", {
    no_rawat: barisInap.no_rawat,
    kd_kamar_asal: barisInap.kd_kamar,
    tgl_masuk: barisInap.tgl_masuk,
    jam_masuk: barisInap.jam_masuk,
    kd_kamar_tujuan: "K2",
    tanggal: "2026-11-20",
    jam: "10:30:00",
    lama_baru: 1,
    opsi: 1,
  }));
  const hasil = await res.json();
  assert.equal(res.status, 200);
  assert.equal(hasil.data.opsi, 1);
  assert.ok(connection.calls.some(([sql]) => sql.startsWith("INSERT INTO kamar_inap")));
  assert.ok(connection.calls.some(([sql]) => sql.startsWith("DELETE FROM kamar_inap")));
  assert.ok(connection.calls.some(([sql]) => sql.includes("status = 'KOSONG'") || sql.startsWith("UPDATE kamar SET status = ?")));
  assert.ok(connection.calls.some(([sql]) => sql.startsWith("SELECT RELEASE_LOCK")));
});

test("pindah opsi 4 tetap memakai kunci baris referensi Java", async () => {
  const connection = koneksiPalsu();
  const route = muatRoute("src/app/api/rawat-inap/pindah-kamar/route.ts", connection);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/pindah-kamar", {
    no_rawat: barisInap.no_rawat,
    kd_kamar_asal: barisInap.kd_kamar,
    tgl_masuk: barisInap.tgl_masuk,
    jam_masuk: barisInap.jam_masuk,
    kd_kamar_tujuan: "K2",
    tanggal: "2026-11-20",
    jam: "10:30:00",
    lama_baru: 1,
    opsi: 4,
  }));
  assert.equal(res.status, 200);
  const update = connection.calls.find(([sql, params]) => sql.startsWith("UPDATE kamar_inap SET") && params[6] === "D1");
  assert.ok(update, "UPDATE opsi 4 memakai nm_dokter sebagai kunci kd_kamar");
  assert.equal(update[1][7], "A.02");
  assert.equal(update[1][8], "2026-11-19");
});

test("pasien meninggal menyimpan data dengan dokter dan keterangan", async () => {
  const connection = koneksiPalsu();
  const executeQuery = async (sql) => {
    if (sql.startsWith("SELECT no_rkm_medis")) return [{ no_rkm_medis: "000001" }];
    if (sql.startsWith("SELECT kd_dokter")) return [{ kd_dokter: "D1" }];
    return { affectedRows: 1 };
  };
  const route = muatRoute("src/app/api/rawat-inap/pasien-mati/route.ts", connection, executeQuery);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/pasien-mati", {
    no_rkm_medis: "000001",
    tanggal: "2026-11-20",
    jam: "10:30:00",
    keterangan: "Meninggal di rumah sakit",
    tempat_meninggal: "Rumah Sakit",
    icd1: "A.02",
    kd_dokter: "D1",
  }));
  const hasil = await res.json();
  assert.equal(res.status, 200);
  assert.equal(hasil.success, true);
});

test("rujuk membuat nomor otomatis di bawah lock", async () => {
  const connection = koneksiPalsu();
  const executeQuery = async (sql) => {
    if (sql.startsWith("SELECT no_rawat")) return [{ no_rawat: barisInap.no_rawat }];
    if (sql.startsWith("SELECT kd_dokter")) return [{ kd_dokter: "D1" }];
    return [];
  };
  const route = muatRoute("src/app/api/rawat-inap/rujuk/route.ts", connection, executeQuery);
  const res = await route.POST(permintaan("http://localhost/api/rawat-inap/rujuk", {
    no_rawat: barisInap.no_rawat,
    rujuk_ke: "RS Rujukan",
    tgl_rujuk: "2026-11-20",
    jam: "10:30:00",
    kd_dokter: "D1",
    kat_rujuk: "-",
    ambulance: "-",
  }));
  const hasil = await res.json();
  assert.equal(res.status, 200);
  assert.equal(hasil.data.no_rujuk, "R000000001");
  assert.ok(connection.calls.some(([sql, params]) => sql.startsWith("SELECT GET_LOCK") && String(params[0]).startsWith("khanza-web:rujuk:")));
  assert.ok(connection.calls.some(([sql]) => sql.startsWith("SELECT RELEASE_LOCK")));
});

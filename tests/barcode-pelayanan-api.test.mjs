import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
const { NextRequest } = load("next/server");

function loadTs(file, mocks, cache) {
  if (cache.has(file)) return cache.get(file).exports;
  const mod = new Module(file);
  mod.filename = file;
  mod.paths = Module._nodeModulePaths(process.cwd());
  cache.set(file, mod);
  mod.require = (id) => {
    if (mocks[id]) return mocks[id];
    if (id.startsWith("@/")) {
      const target = resolve(process.cwd(), "src", id.slice(2));
      const candidates = [`${target}.ts`, `${target}.tsx`, resolve(target, "index.ts")];
      const found = candidates.find((c) => existsSync(c));
      if (found) return loadTs(found, mocks, cache);
    }
    return load(id);
  };
  mod._compile(
    ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
  return mod.exports;
}

function createMocks({ session, calls, billingCount = 0, stok = 10, kdKamar = "K01" }) {
  return {
    "@/lib/auth": { getSession: async () => session },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.includes("FROM reg_periksa rp")) {
          return [{
            no_rawat: "2026/11/26/000001",
            no_rkm_medis: "000001",
            nm_pasien: "Pasien Sintetis",
            jk: "L",
            kd_dokter: "D0000001",
            nm_dokter: "dr. Sintetis",
            kd_poli: "U0001",
            nm_poli: "Poli Umum",
            kd_pj: "UMU",
            png_jawab: "Umum",
            status_lanjut: "Ralan",
            stts: "Belum",
            status_bayar: "Belum Bayar",
            kd_kamar: kdKamar,
            kd_bangsal_kamar: "B001",
            nm_bangsal_kamar: "Bangsal Mawar",
            kelas_kamar: "Kelas 1",
          }];
        }
        if (sql.includes("FROM billing")) return [{ jml: billingCount }];
        if (sql.includes("FROM set_depo_ralan")) return [{ kd_bangsal: "AP1" }];
        if (sql.includes("FROM set_depo_ranap")) return [{ kd_depo: "AP2" }];
        if (sql.includes("FROM bangsal")) return [{ nm_bangsal: "Apotek Utama" }];
        if (sql.includes("FROM set_embalase")) return [{ embalase_per_obat: 1000, tuslah_per_obat: 2000 }];
        if (sql.includes("FROM set_tarif")) return [{ cara_bayar_ralan: "No", poli_ralan: "No", cara_bayar_ranap: "No", ruang_ranap: "No", kelas_ranap: "No" }];
        return [];
      },
      pool: {
        getConnection: async () => ({
          beginTransaction: async () => calls.push(["BEGIN"]),
          commit: async () => calls.push(["COMMIT"]),
          rollback: async () => calls.push(["ROLLBACK"]),
          release: () => calls.push(["RELEASE"]),
          destroy: () => calls.push(["DESTROY"]),
          execute: async (sql, params) => {
            calls.push([sql, params]);
            if (sql.includes("FROM reg_periksa WHERE")) return [[{ stts: "Belum" }], []];
            if (sql.includes("FROM billing")) return [[{ jml: billingCount }], []];
            if (sql.includes("FROM jns_perawatan")) {
              return [[{ material: 10000, bhp: 5000, tarif_tindakandr: 35000, kso: 0, menejemen: 0, total_byrdr: 50000 }], []];
            }
            if (sql.includes("FROM databarang")) {
              return [[{ h_beli: 4000, harga: 6000, kapasitas: 1, nama_brng: "Obat Sintetis" }], []];
            }
            if (sql.includes("FROM gudangbarang")) return [[{ stok }], []];
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
  };
}

for (const [route, perm] of [
  ["rawat-jalan/barcode", "barcoderalan"],
  ["rawat-inap/barcode", "barcoderanap"],
]) {
  test(`/api/${route} menolak 401 dan 403 sebelum query`, async () => {
    const calls401 = [];
    const m401 = loadTs(resolve(`src/app/api/${route}/route.ts`), createMocks({ session: null, calls: calls401 }), new Map());
    const r401 = await m401.GET(new NextRequest(`http://localhost/api/${route}?no_rawat=2026/11/26/000001`));
    assert.equal(r401.status, 401);
    assert.equal(calls401.length, 0);

    const calls403 = [];
    const m403 = loadTs(
      resolve(`src/app/api/${route}/route.ts`),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: {} }, calls: calls403 }),
      new Map(),
    );
    const r403 = await m403.POST(new NextRequest(`http://localhost/api/${route}`, { method: "POST", body: "{}" }));
    assert.equal(r403.status, 403);
    assert.equal(calls403.length, 0);

    const calls200 = [];
    const m200 = loadTs(
      resolve(`src/app/api/${route}/route.ts`),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: { [perm]: true } }, calls: calls200 }),
      new Map(),
    );
    const r200 = await m200.GET(new NextRequest(`http://localhost/api/${route}?no_rawat=2026/11/26/000001`));
    assert.equal(r200.status, 200);
    const json = await r200.json();
    assert.equal(json.success, true);
    assert.equal(json.data.kunjungan.no_rawat, "2026/11/26/000001");
  });
}

test("/api/rawat-jalan/barcode POST menyimpan tindakan + obat secara atomik dan mencatat riwayat stok", async () => {
  const calls = [];
  const mod = loadTs(
    resolve("src/app/api/rawat-jalan/barcode/route.ts"),
    createMocks({ session: { username: "dokter1", isAdmin: false, permissions: { barcoderalan: true } }, calls }),
    new Map(),
  );
  const req = new NextRequest("http://localhost/api/rawat-jalan/barcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      no_rawat: "2026/11/26/000001",
      tindakan: ["RJ00001"],
      obat: [{ kode_brng: "B000000001", jumlah: 2, pakai_kapasitas: false, embalase: 1000, tuslah: 2000, no_batch: "", no_faktur: "" }],
    }),
  });
  const res = await mod.POST(req);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.jmlTindakan, 1);
  assert.equal(json.data.jmlObat, 1);
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("INSERT INTO rawat_jl_dr")));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("INSERT INTO detail_pemberian_obat")));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("UPDATE gudangbarang SET stok = stok - ?")));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("INSERT INTO riwayat_barang_medis")));
  assert.ok(calls.some((c) => c[0] === "COMMIT"));
});

test("/api/rawat-inap/barcode POST rollback ketika stok obat tidak mencukupi dan menolak billing terverifikasi", async () => {
  const callsStok = [];
  const modStok = loadTs(
    resolve("src/app/api/rawat-inap/barcode/route.ts"),
    createMocks({ session: { username: "dokter1", isAdmin: false, permissions: { barcoderanap: true } }, calls: callsStok, stok: 1 }),
    new Map(),
  );
  const rStok = await modStok.POST(
    new NextRequest("http://localhost/api/rawat-inap/barcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        no_rawat: "2026/11/26/000001",
        tindakan: ["RI00001"],
        obat: [{ kode_brng: "B000000001", jumlah: 5, pakai_kapasitas: false, embalase: 0, tuslah: 0, no_batch: "", no_faktur: "" }],
      }),
    }),
  );
  assert.equal(rStok.status, 409);
  assert.ok(callsStok.some((c) => c[0] === "ROLLBACK"));

  const callsBil = [];
  const modBil = loadTs(
    resolve("src/app/api/rawat-inap/barcode/route.ts"),
    createMocks({ session: { username: "dokter1", isAdmin: false, permissions: { barcoderanap: true } }, calls: callsBil, billingCount: 1 }),
    new Map(),
  );
  const rBil = await modBil.POST(
    new NextRequest("http://localhost/api/rawat-inap/barcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ no_rawat: "2026/11/26/000001", tindakan: ["RI00001"], obat: [] }),
    }),
  );
  assert.equal(rBil.status, 409);
});

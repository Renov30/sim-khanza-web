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
    if (id.startsWith("./") || id.startsWith("../")) {
      const base = resolve(file, "..", id);
      const candidates = [`${base}.ts`, `${base}.tsx`, resolve(base, "index.ts")];
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

function createMocks({ session, calls, tableExists = true }) {
  return {
    "@/lib/auth": {
      getSession: async () => session,
    },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.includes("INFORMATION_SCHEMA.TABLES")) {
          return [{ ada: tableExists ? 1 : 0 }];
        }
        if (/SELECT COUNT\(\*\)/i.test(sql)) {
          return [{ total: 1, grand_total: 150000 }];
        }
        if (sql.includes("GROUP BY k.status")) {
          return [
            { status: "KOSONG", jumlah: 5 },
            { status: "ISI", jumlah: 3 },
          ];
        }
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
            if (sql.includes("GET_LOCK")) return [[{ acquired: 1 }], []];
            if (sql.includes("RELEASE_LOCK")) return [[{ released: 1 }], []];
            if (sql.includes("FROM akun_bayar")) return [[{ ppn: 0 }], []];
            if (sql.includes("FROM reg_periksa")) return [[{ stts: "Belum" }], []];
            if (sql.includes("MAX(CAST(")) return [[{ terakhir: 2 }], []];
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
  };
}

const ALL_ENDPOINTS = [
  ["registrasi/booking-periksa", "booking_periksa"],
  ["registrasi/booking-registrasi", "booking_registrasi"],
  ["registrasi/booking-mcu-perusahaan", "booking_mcu_perusahaan"],
  ["registrasi/rujukan-keluar", "rujukan_keluar"],
  ["registrasi/rujukan-masuk", "rujukan_masuk"],
  ["rawat-inap/informasi-kamar", "informasi_kamar"],
  ["rawat-inap/permintaan", "permintaan_ranap"],
  ["rawat-inap/jadwal-operasi", "booking_operasi"],
  ["rawat-inap/dpjp", "dpjp_ranap"],
  ["rawat-inap/operasi", "operasi"],
  ["rawat-inap/diet", "diet_pasien"],
  ["rawat-inap/deposit", "deposit_pasien"],
  ["rawat-inap/perkiraan-biaya", "perkiraan_biaya_ranap"],
  ["rawat-inap/billing", "billing_ranap"],
  ["rawat-jalan/permintaan-kfr", "layanan_kedokteran_fisik_rehabilitasi"],
  ["rawat-jalan/skrining", "sekrining_rawat_jalan"],
  ["rawat-jalan/deteksi-corona", "deteksi_corona"],
  ["farmasi/beri-obat", "beri_obat"],
  ["farmasi/resep-pulang", "resep_pulang"],
  ["tarif-farmasi", "tarif_ralan"],
];

for (const [route, perm] of ALL_ENDPOINTS) {
  test(`/api/${route} menolak 401 dan 403 sebelum query database`, async () => {
    const calls401 = [];
    const mod401 = loadTs(
      resolve(`src/app/api/${route}/route.ts`),
      createMocks({ session: null, calls: calls401 }),
      new Map(),
    );
    const res401 = await mod401.GET(new NextRequest(`http://localhost/api/${route}`));
    assert.equal(res401.status, 401);
    assert.equal(calls401.length, 0);

    const calls403 = [];
    const mod403 = loadTs(
      resolve(`src/app/api/${route}/route.ts`),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: {} }, calls: calls403 }),
      new Map(),
    );
    const res403 = await mod403.GET(new NextRequest(`http://localhost/api/${route}`));
    assert.equal(res403.status, 403);
    assert.equal(calls403.length, 0);

    const calls200 = [];
    const mod200 = loadTs(
      resolve(`src/app/api/${route}/route.ts`),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: { [perm]: true } }, calls: calls200 }),
      new Map(),
    );
    const res200 = await mod200.GET(new NextRequest(`http://localhost/api/${route}?page=1&limit=25`));
    assert.equal(res200.status, 200);
    const json = await res200.json();
    assert.equal(json.success, true);
    assert.ok(calls200.length > 0);
  });
}

test("/api/tarif-farmasi mengembalikan daftar kosong & peringatan bila tabel belum ada", async () => {
  const calls = [];
  const mod = loadTs(
    resolve("src/app/api/tarif-farmasi/route.ts"),
    createMocks({ session: { username: "admin", isAdmin: true, permissions: {} }, calls, tableExists: false }),
    new Map(),
  );
  const res = await mod.GET(new NextRequest("http://localhost/api/tarif-farmasi"));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.deepEqual(json.data, []);
  assert.match(json.peringatan, /tarif_farmasi/);
});

test("/api/rawat-inap/deposit POST memakai named lock, transaksi, dan generate nomor DP server", async () => {
  const calls = [];
  const mod = loadTs(
    resolve("src/app/api/rawat-inap/deposit/route.ts"),
    createMocks({ session: { username: "petugas1", isAdmin: false, permissions: { deposit_pasien: true } }, calls }),
    new Map(),
  );
  const req = new NextRequest("http://localhost/api/rawat-inap/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      no_rawat: "2026/11/26/000001",
      tgl_only: "2026-11-26",
      jam_only: "09:15:00",
      nama_bayar: "Tunai",
      besar_deposit: 500000,
      keterangan: "Deposit sintetis",
    }),
  });
  const res = await mod.POST(req);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.no_deposit, "DP202611260003");
  assert.ok(calls.some((c) => c[0] === "BEGIN"));
  assert.ok(calls.some((c) => c[0] === "COMMIT"));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("GET_LOCK")));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("RELEASE_LOCK")));
});

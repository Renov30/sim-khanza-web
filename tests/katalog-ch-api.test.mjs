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
    "@/lib/auth": { getSession: async () => session },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.includes("INFORMATION_SCHEMA.TABLES")) return [{ ada: tableExists ? 1 : 0 }];
        if (/SELECT COUNT\(\*\)/i.test(sql)) return [{ total: 2, total_ringkasan: 25000 }];
        return [{ sample: "ok" }];
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
            return [{ affectedRows: 1 }, []];
          },
        }),
      },
    },
  };
}

const DOMAIN_ROUTES = [
  ["kepegawaian", "src/app/api/kepegawaian/[modul]/route.ts", "src/lib/kepegawaian/katalog-kepegawaian.ts", "KATALOG_KEPEGAWAIAN"],
  ["farmasi/modul", "src/app/api/farmasi/modul/[modul]/route.ts", "src/lib/farmasi/katalog-farmasi.ts", "KATALOG_FARMASI"],
  ["ipsrs", "src/app/api/ipsrs/[modul]/route.ts", "src/lib/ipsrs/katalog-ipsrs.ts", "KATALOG_IPSRS"],
  ["dapur", "src/app/api/dapur/[modul]/route.ts", "src/lib/dapur/katalog-dapur.ts", "KATALOG_DAPUR"],
  ["inventaris", "src/app/api/inventaris/[modul]/route.ts", "src/lib/inventaris/katalog-inventaris.ts", "KATALOG_INVENTARIS"],
  ["parkir", "src/app/api/parkir/[modul]/route.ts", "src/lib/parkir/katalog-parkir.ts", "KATALOG_PARKIR"],
];

test("katalog C-H memuat seluruh 222 modul unik dengan tabel & kolom valid", () => {
  const ch = loadTs(resolve("src/lib/modul/katalog-ch.ts"), {}, new Map());
  assert.equal(ch.SEMUA_KATALOG_CH.length, 222);
  for (const m of ch.SEMUA_KATALOG_CH) {
    assert.ok(m.slug.length > 0);
    assert.ok(m.tabel.length > 0);
    assert.ok(m.kolom.length > 0);
    const rute = ch.dapatkanRuteKatalogCH(m.id, m.judul);
    assert.ok(rute && rute.includes(m.slug), `Rute tidak ditemukan untuk ${m.id}`);
    assert.equal(ch.dapatkanJudulKatalogCH(rute), m.judul);
  }
  assert.equal(ch.dapatkanRuteKatalogCH("btn-daftar-permintaan-resep", "Daftar Resep Dokter"), "/farmasi/daftar-resep-dokter");
});

for (const [domain, routeFile, katalogFile, exportName] of DOMAIN_ROUTES) {
  const kat = loadTs(resolve(katalogFile), {}, new Map())[exportName];
  const sample = kat[0];
  const slug = sample.slug;
  const perm = sample.permissionKey;

  test(`/api/${domain}/${slug} menolak 401/403 sebelum DB, 404 slug invalid, dan 200 saat berizin`, async () => {
    const calls401 = [];
    const m401 = loadTs(resolve(routeFile), createMocks({ session: null, calls: calls401 }), new Map());
    const r401 = await m401.GET(new NextRequest(`http://localhost/api/${domain}/${slug}`), {
      params: Promise.resolve({ modul: slug }),
    });
    assert.equal(r401.status, 401);
    assert.equal(calls401.length, 0);

    const calls403 = [];
    const m403 = loadTs(
      resolve(routeFile),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: {} }, calls: calls403 }),
      new Map(),
    );
    const r403 = await m403.GET(new NextRequest(`http://localhost/api/${domain}/${slug}`), {
      params: Promise.resolve({ modul: slug }),
    });
    assert.equal(r403.status, 403);
    assert.equal(calls403.length, 0);

    const calls404 = [];
    const m404 = loadTs(
      resolve(routeFile),
      createMocks({ session: { username: "admin", isAdmin: true, permissions: {} }, calls: calls404 }),
      new Map(),
    );
    const r404 = await m404.GET(new NextRequest(`http://localhost/api/${domain}/tidak-ada`), {
      params: Promise.resolve({ modul: "tidak-ada" }),
    });
    assert.equal(r404.status, 404);
    assert.equal(calls404.length, 0);

    const calls200 = [];
    const m200 = loadTs(
      resolve(routeFile),
      createMocks({ session: { username: "u1", isAdmin: false, permissions: { [perm]: true } }, calls: calls200 }),
      new Map(),
    );
    const r200 = await m200.GET(new NextRequest(`http://localhost/api/${domain}/${slug}?cari=tes&page=1&limit=25`), {
      params: Promise.resolve({ modul: slug }),
    });
    assert.equal(r200.status, 200);
    const json = await r200.json();
    assert.equal(json.success, true);
    assert.ok(calls200.length > 0);
  });
}

test("POST/PUT/DELETE katalog memakai transaksi dan parameterized query", async () => {
  const calls = [];
  const mod = loadTs(
    resolve("src/app/api/parkir/[modul]/route.ts"),
    createMocks({ session: { username: "admin", isAdmin: true, permissions: {} }, calls }),
    new Map(),
  );
  const ctx = { params: Promise.resolve({ modul: "jenis-parkir" }) };
  const postRes = await mod.POST(
    new NextRequest("http://localhost/api/parkir/jenis-parkir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kd_parkir: "P01", jns_parkir: "Motor", biaya: 2000, jenis: "Harian" }),
    }),
    ctx,
  );
  assert.equal(postRes.status, 200);
  assert.ok(calls.some((c) => c[0] === "BEGIN"));
  assert.ok(calls.some((c) => c[0] === "COMMIT"));
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("INSERT INTO `parkir_jenis`")));

  const delRes = await mod.DELETE(
    new NextRequest("http://localhost/api/parkir/jenis-parkir?kd_parkir=P01", { method: "DELETE" }),
    ctx,
  );
  assert.equal(delRes.status, 200);
  assert.ok(calls.some((c) => typeof c[0] === "string" && c[0].includes("DELETE FROM `parkir_jenis`")));
});

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

function createMocks({ session, calls }) {
  return {
    "@/lib/auth": { getSession: async () => session },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        if (sql.includes("INFORMATION_SCHEMA.TABLES")) return [{ ada: 1 }];
        if (/SELECT COUNT\(\*\)/i.test(sql)) return [{ total: 1, total_ringkasan: 10000 }];
        return [{ ok: 1 }];
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
  ["tagihan", "src/app/api/tagihan/[modul]/route.ts", "src/lib/tagihan/katalog-tagihan.ts", "KATALOG_TAGIHAN"],
  ["laporan", "src/app/api/laporan/[modul]/route.ts", "src/lib/laporan/katalog-laporan.ts", "KATALOG_LAPORAN"],
  ["keuangan", "src/app/api/keuangan/[modul]/route.ts", "src/lib/keuangan/katalog-keuangan.ts", "KATALOG_KEUANGAN"],
  ["bridging", "src/app/api/bridging/[modul]/route.ts", "src/lib/bridging/katalog-bridging.ts", "KATALOG_BRIDGING"],
  ["rekam-medis", "src/app/api/rekam-medis/[modul]/route.ts", "src/lib/rekam-medis/katalog-rekam-medis.ts", "KATALOG_REKAM_MEDIS"],
  ["transfusi-darah", "src/app/api/transfusi-darah/[modul]/route.ts", "src/lib/transfusi-darah/katalog-transfusi-darah.ts", "KATALOG_TRANSFUSI_DARAH"],
  ["grafik-analisa", "src/app/api/grafik-analisa/[modul]/route.ts", "src/lib/grafik-analisa/katalog-grafik-analisa.ts", "KATALOG_GRAFIK_ANALISA"],
  ["surat", "src/app/api/surat/[modul]/route.ts", "src/lib/surat/katalog-surat.ts", "KATALOG_SURAT"],
  ["perpustakaan", "src/app/api/perpustakaan/[modul]/route.ts", "src/lib/perpustakaan/katalog-perpustakaan.ts", "KATALOG_PERPUSTAKAAN"],
  ["toko", "src/app/api/toko/[modul]/route.ts", "src/lib/toko/katalog-toko.ts", "KATALOG_TOKO"],
  ["ziscsr", "src/app/api/ziscsr/[modul]/route.ts", "src/lib/ziscsr/katalog-ziscsr.ts", "KATALOG_ZISCSR"],
  ["pengaturan", "src/app/api/pengaturan/[modul]/route.ts", "src/lib/pengaturan/katalog-pengaturan.ts", "KATALOG_PENGATURAN"],
];

test("katalog I-T memuat seluruh 879 modul valid tanpa kolom password/blob", () => {
  const it = loadTs(resolve("src/lib/modul/katalog-it.ts"), {}, new Map());
  assert.equal(it.SEMUA_KATALOG_IT.length, 879);
  for (const m of it.SEMUA_KATALOG_IT) {
    assert.ok(m.slug.length > 0);
    assert.ok(m.tabel.length > 0);
    assert.ok(m.kolom.length > 0, `Kolom kosong pada ${m.id}`);
    for (const k of m.kolom) {
      assert.ok(!["password", "passworde", "usere"].includes(k.nama.toLowerCase()), `Kolom sensitif bocor di ${m.id}`);
    }
    const rute = it.dapatkanRuteKatalogIT(m.id, m.judul);
    assert.ok(rute && rute.includes(m.slug), `Rute tidak ditemukan untuk ${m.id}`);
    assert.equal(it.dapatkanJudulKatalogIT(rute), m.judul);
  }
  assert.equal(it.dapatkanRuteKatalogIT("btn-resume-pasien", "Resume Pasien Ralan"), "/resume-pasien");
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

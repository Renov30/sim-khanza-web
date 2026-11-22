import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
const { NextRequest } = load("next/server");
const isRegistrationDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const teks = (value, maksimum) => typeof value === "string" ? value.trim().slice(0, maksimum) : "";
const normalisasiStatus = (value) => ["ranap", "rawat inap"].includes(teks(value, 20).toLowerCase())
  ? "ranap" : ["ralan", "rawat jalan"].includes(teks(value, 20).toLowerCase()) ? "ralan" : "";

const libPermintaan = (kunjungan = null) => ({
  STATUS_RAWAT: new Set(["", "Semua", "ralan", "ranap"]),
  STATUS_RANAP: new Set(["", "Semua", "Belum Pulang"]),
  MODE_TAMPIL: new Set(["", "data", "item"]),
  JENIS_OPSI: new Set(["dokter", "poli", "ruang", "pemeriksaan", "kunjungan"]),
  teks,
  normalisasiStatus,
  jamValid: (value) => /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value),
  bacaTarif: () => ({ cara_bayar: "No", kelas: "No" }),
  syaratPemeriksaan: () => ({ sql: "status = '1'", params: [] }),
  ambilKunjungan: async () => kunjungan,
});

function muatModul(file, mocks) {
  const modul = new Module(file);
  modul.filename = file;
  modul.paths = Module._nodeModulePaths(process.cwd());
  modul.require = (id) => mocks[id] ?? load(id);
  modul._compile(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, file);
  return modul.exports;
}

function handler({ baris = [], sesi = { isAdmin: true, permissions: {} }, kunjungan = null } = {}) {
  const calls = [];
  const mocks = {
    "@/lib/auth": { getSession: async () => sesi },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        return baris;
      },
      pool: {
        getConnection: async () => {
          throw new Error("getConnection harus ditentukan pada tes POST.");
        },
      },
    },
    "@/lib/registrasi/date": { isRegistrationDate },
    "@/lib/radiologi/permintaan": libPermintaan(kunjungan),
  };
  const file = resolve("src/app/api/radiologi/permintaan/route.ts");
  return { api: muatModul(file, mocks), calls, mocks };
}

function handlerOpsi({ baris = [], sesi = { isAdmin: true, permissions: {} } } = {}) {
  const calls = [];
  const mocks = {
    "@/lib/auth": { getSession: async () => sesi },
    "@/lib/db": {
      executeQuery: async (sql, params) => {
        calls.push([sql, params]);
        return baris;
      },
      pool: { getConnection: async () => { throw new Error("Tidak dipakai."); } },
    },
    "@/lib/radiologi/permintaan": libPermintaan(),
  };
  const file = resolve("src/app/api/radiologi/permintaan/options/route.ts");
  return { api: muatModul(file, mocks), calls };
}

function koneksiPalsu(kunjungan, { sudahDitagihi = false, urut = 41, itemAda = null, duplikatHeader = false } = {}) {
  const query = [];
  const perintah = [];
  const item = itemAda ?? ["R1", "R2"];
  let percobaanHeader = 0;
  const connection = {
    execute: async (sql, params = []) => {
      query.push([sql, params]);
      if (sql.includes("SELECT kd_dokter FROM dokter")) return [[{ kd_dokter: "D1" }]];
      if (sql.includes("COUNT(*) AS jumlah FROM billing")) return [[{ jumlah: sudahDitagihi ? 1 : 0 }]];
      if (sql.includes("COUNT(*) AS jumlah FROM reg_periksa")) return [[{ jumlah: 0 }]];
      if (sql.includes("FROM set_tarif")) return [[{ cara_bayar_radiologi: "No", kelas_radiologi: "No" }]];
      if (sql.includes("kd_jenis_prw IN")) return [item.map((kd_jenis_prw) => ({ kd_jenis_prw }))];
      if (sql.includes("GET_LOCK")) return [[{ didapat: 1 }]];
      if (sql.includes("MAX(CONVERT(RIGHT(noorder")) return [[{ urut: params[0] === 4 ? 1000 : urut }]];
      if (sql.includes("INSERT INTO permintaan_radiologi")) {
        percobaanHeader += 1;
        if (duplikatHeader && percobaanHeader === 1) {
          const error = new Error("duplicate");
          error.code = "ER_DUP_ENTRY";
          throw error;
        }
        return [[]];
      }
      if (sql.includes("RELEASE_LOCK")) return [[{ dilepas: 1 }]];
      return [[]];
    },
    beginTransaction: async () => perintah.push("begin"),
    commit: async () => perintah.push("commit"),
    rollback: async () => perintah.push("rollback"),
    release: () => perintah.push("release"),
    destroy: () => perintah.push("destroy"),
  };
  return { connection, query, perintah, kunjungan };
}

function pasangKoneksi(handlerObj, koneksi) {
  handlerObj.mocks["@/lib/db"].pool.getConnection = async () => koneksi.connection;
  handlerObj.mocks["@/lib/radiologi/permintaan"] = libPermintaan(koneksi.kunjungan);
  const file = resolve("src/app/api/radiologi/permintaan/route.ts");
  return muatModul(file, handlerObj.mocks);
}

const url = (query = "") => `http://localhost/api/radiologi/permintaan?${query}`;
const opsiUrl = (query = "") => `http://localhost/api/radiologi/permintaan/options?${query}`;

test("GET data mengelompokkan pemeriksaan per noorder tanpa field total", async () => {
  const baris = [
    { noorder: "PR202511220001", no_rawat: "2026/11/22/000001", tgl_permintaan: "2026-11-22", jam_permintaan: "08:30", kd_jenis_prw: "R1", nm_perawatan: "Rontgen Dada" },
    { noorder: "PR202511220001", no_rawat: "2026/11/22/000001", tgl_permintaan: "2026-11-22", jam_permintaan: "08:30", kd_jenis_prw: "R2", nm_perawatan: "USG Abdomen" },
    { noorder: "PR202511220002", no_rawat: "2026/11/22/000002", tgl_permintaan: "2026-11-22", jam_permintaan: "09:00", kd_jenis_prw: "R1", nm_perawatan: "Rontgen Dada" },
  ];
  const { api, calls } = handler({ baris });
  const response = await api.GET(new NextRequest(url("tanggal_mulai=2026-11-01&tanggal_selesai=2026-11-22&status=ralan&status_ranap=Belum%20Pulang&dokter=D1&poli=U001&ruang=Rawat&cari=abdomen&limit=20")));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.total, undefined);
  assert.equal(json.data.length, 2);
  assert.deepEqual(json.data[0].item.map((item) => item.kd_jenis_prw), ["R1", "R2"]);
  assert.match(calls[0][0], /INNER JOIN permintaan_pemeriksaan_radiologi prr/);
  assert.match(calls[0][0], /ki\.stts_pulang = '-'/);
  assert.match(calls[0][0], /pr\.tgl_permintaan BETWEEN \? AND \?/);
  assert.deepEqual(calls[0][1].slice(0, 2), ["2026-11-01", "2026-11-22"]);
  assert.equal(calls[0][1].at(-1), 20);
  assert.ok(calls[0][1].every((value) => value !== "abdomen"));
});

test("GET mode item mengembalikan baris rata", async () => {
  const baris = [{ noorder: "PR1", kd_jenis_prw: "R1", nm_perawatan: "Rontgen" }];
  const { api } = handler({ baris });
  const response = await api.GET(new NextRequest(url("mode=item")));
  const json = await response.json();
  assert.equal(json.data.length, 1);
  assert.equal(json.data[0].kd_jenis_prw, "R1");
});

test("GET menolak filter invalid sebelum query", async () => {
  for (const query of ["mode=ringkas", "status=Lunas", "status_ranap=Pulang", "tanggal_mulai=2026-02-30", "tanggal_mulai=2026-11-22&tanggal_selesai=2026-11-01"]) {
    const { api, calls } = handler();
    const response = await api.GET(new NextRequest(url(query)));
    assert.equal(response.status, 400, query);
    assert.equal(calls.length, 0);
  }
});

test("GET memeriksa sesi dan izin permintaan radiologi", async () => {
  const tanpaSesi = handler({ sesi: null });
  assert.equal((await tanpaSesi.api.GET(new NextRequest(url()))).status, 401);
  assert.equal(tanpaSesi.calls.length, 0);

  const tanpaIzin = handler({ sesi: { isAdmin: false, permissions: {} } });
  assert.equal((await tanpaIzin.api.GET(new NextRequest(url()))).status, 403);
  assert.equal(tanpaIzin.calls.length, 0);
});

test("POST menolak input wajib sebelum membuka koneksi", async () => {
  const { api } = handler();
  const body = {
    no_rawat: "2026/11/22/000001", tanggal: "2026-11-22", jam: "08:30:00",
    dokter_perujuk: "D1", informasi_tambahan: "", diagnosa_klinis: "Fraktur", item: ["R1"],
  };
  const response = await api.POST(new NextRequest(url(), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  }));
  assert.equal(response.status, 400);
});

test("POST menyimpan header tanpa item dan melepas lock", async () => {
  const kunjungan = {
    no_rawat: "2026/11/22/000001", no_rm: "0000001", nm_pasien: "Sintetis", status: "ralan",
    ruang: "Poli", kd_dokter: "D1", nm_dokter: "Dokter Satu", kd_pj: "UMU", png_jawab: "Umum",
  };
  const handy = handler();
  const koneksi = koneksiPalsu(kunjungan);
  const api = pasangKoneksi(handy, koneksi);
  const body = {
    no_rawat: "2026/11/22/000001", tanggal: "2026-11-22", jam: "08:30:45",
    dokter_perujuk: "D1", status: "Ralan", informasi_tambahan: "Tanpa kendala", diagnosa_klinis: "Fraktur",
  };
  const response = await api.POST(new NextRequest(url(), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  }));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.data.noorder, "PR20261122042");
  assert.equal(json.data.status, "ralan");
  assert.match(koneksi.query.map(([sql]) => sql).join("\n"), /GET_LOCK\(\?, 10\)/);
  assert.match(koneksi.query.map(([sql]) => sql).join("\n"), /INSERT INTO permintaan_radiologi/);
  assert.equal(koneksi.query.filter(([sql]) => sql.includes("INSERT INTO permintaan_pemeriksaan_radiologi")).length, 0);
  assert.match(koneksi.query.map(([sql]) => sql).join("\n"), /RELEASE_LOCK/);
  assert.deepEqual(koneksi.perintah, ["begin", "commit", "release"]);
});

test("POST memakai empat digit saat nomor tiga digit bentrok", async () => {
  const kunjungan = {
    no_rawat: "2026/11/22/000001", no_rm: "0000001", nm_pasien: "Sintetis", status: "ralan",
    ruang: "Poli", kd_dokter: "D1", nm_dokter: "Dokter Satu", kd_pj: "UMU", png_jawab: "Umum",
  };
  const handy = handler();
  const koneksi = koneksiPalsu(kunjungan, { duplikatHeader: true, itemAda: ["R1"] });
  const api = pasangKoneksi(handy, koneksi);
  const body = {
    no_rawat: "2026/11/22/000001", tanggal: "2026-11-22", jam: "08:30:45",
    dokter_perujuk: "D1", status: "Ralan", informasi_tambahan: "A", diagnosa_klinis: "B",
  };
  const response = await api.POST(new NextRequest(url(), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  }));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.data.noorder, "PR202611221001");
  assert.deepEqual(koneksi.perintah, ["begin", "commit", "release"]);
});

test("POST menolak kunjungan dengan billing terverifikasi", async () => {
  const kunjungan = {
    no_rawat: "2026/11/22/000001", no_rm: "0000001", nm_pasien: "Sintetis", status: "ralan",
    ruang: "Poli", kd_dokter: "D1", nm_dokter: "Dokter Satu", kd_pj: "UMU", png_jawab: "Umum",
  };
  const handy = handler();
  const koneksi = koneksiPalsu(kunjungan, { sudahDitagihi: true });
  const api = pasangKoneksi(handy, koneksi);
  const body = {
    no_rawat: "2026/11/22/000001", tanggal: "2026-11-22", jam: "08:30:00",
    dokter_perujuk: "D1", informasi_tambahan: "A", diagnosa_klinis: "B",
  };
  const response = await api.POST(new NextRequest(url(), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  }));
  assert.equal(response.status, 409);
  const json = await response.json();
  assert.equal(json.code, "BILLING_TERVERIFIKASI");
  assert.equal(koneksi.perintah.includes("begin"), false);
});

test("POST menolak pemeriksaan yang tidak tersedia", async () => {
  const kunjungan = {
    no_rawat: "2026/11/22/000001", no_rm: "0000001", nm_pasien: "Sintetis", status: "ralan",
    ruang: "Poli", kd_dokter: "D1", nm_dokter: "Dokter Satu", kd_pj: "UMU", png_jawab: "Umum",
  };
  const handy = handler();
  const koneksi = koneksiPalsu(kunjungan, { itemAda: ["R1"] });
  const api = pasangKoneksi(handy, koneksi);
  const body = {
    no_rawat: "2026/11/22/000001", tanggal: "2026-11-22", jam: "08:30:00",
    dokter_perujuk: "D1", informasi_tambahan: "A", diagnosa_klinis: "B", item: ["R1", "R2"],
  };
  const response = await api.POST(new NextRequest(url(), {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  }));
  assert.equal(response.status, 409);
  assert.equal(koneksi.perintah.includes("begin"), false);
});

test("options kunjungan mengembalikan dokter dan penjamin", async () => {
  const baris = [{
    no_rawat: "2026/11/22/000001", no_rkm_medis: "0000001", nm_pasien: "Sintetis",
    status_lanjut: "Ralan", nm_poli: "Poli Umum", kd_dokter: "D1", nm_dokter: "Dokter Satu",
    kd_pj: "UMU", png_jawab: "Umum",
  }];
  const { api, calls } = handlerOpsi({ baris });
  const response = await api.GET(new NextRequest(opsiUrl("jenis=kunjungan&no_rawat=2026%2F11%2F22%2F000001")));
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.data[0].kd_dokter, "D1");
  assert.equal(json.data[0].kd_pj, "UMU");
  assert.equal(json.data[0].png_jawab, "Umum");
  assert.match(calls[0][0], /LEFT JOIN penjab pj/);
});

test("options menolak jenis tidak dikenal sebelum query", async () => {
  const { api, calls } = handlerOpsi();
  const response = await api.GET(new NextRequest(opsiUrl("jenis=obat")));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

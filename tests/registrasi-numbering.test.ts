import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import type { PoolConnection } from "mysql2/promise";
import { isRegistrationDate, registrationDate } from "../src/lib/registrasi/date";
import { getRegistrationNumbers, saveWithRegistrationNumbers } from "../src/lib/registrasi/numbering";

const input = { tanggal: "2026-11-11", dokter: "D001", poli: "POL01" };
const originalUrutan = process.env.KHANZA_URUTNOREG;
const originalBasis = process.env.KHANZA_BASENOREG;
beforeEach(() => {
  process.env.KHANZA_URUTNOREG = "dokter + poli";
  process.env.KHANZA_BASENOREG = "booking";
});
afterEach(() => {
  if (originalUrutan === undefined) delete process.env.KHANZA_URUTNOREG;
  else process.env.KHANZA_URUTNOREG = originalUrutan;
  if (originalBasis === undefined) delete process.env.KHANZA_BASENOREG;
  else process.env.KHANZA_BASENOREG = originalBasis;
});

function fakeConnection(maxima: number[], acquired = 1, releaseFails = false) {
  const calls: string[] = [];
  let destroyed = false;
  const connection = {
    async execute(sql: string) {
      calls.push(sql);
      if (sql.includes("GET_LOCK")) return [[{ acquired }], []];
      if (sql.includes("RELEASE_LOCK")) {
        if (releaseFails) throw new Error("Connection lost");
        return [[{ released: 1 }], []];
      }
      assert.ok(maxima.length, "Unexpected database query");
      return [[{ maximum: maxima.shift() }], []];
    },
    destroy() { destroyed = true; },
  } as unknown as PoolConnection;
  return { connection, calls, isDestroyed: () => destroyed };
}

test("tanggal mengikuti WIT, termasuk saat UTC masih hari sebelumnya", () => {
  assert.equal(registrationDate(new Date("2026-11-10T16:00:00Z")), "2026-11-11");
  assert.equal(isRegistrationDate("2026-02-30"), false);
  assert.equal(isRegistrationDate("2026-2-01"), false);
  assert.equal(isRegistrationDate("2028-02-29"), true);
});

test("pembukaan ulang tidak menghabiskan nomor dan mempertimbangkan booking", async () => {
  process.env.KHANZA_BASENOREG = "booking";
  const { connection } = fakeConnection([12, 5, 8, 12, 5, 8]);
  const expected = { no_rawat: "2026/11/11/000013", no_reg: "009" };
  assert.deepEqual(await getRegistrationNumbers(connection, input), expected);
  assert.deepEqual(await getRegistrationNumbers(connection, input), expected);
});

test("nomor registrasi memakai maksimum yang lebih tinggi dari registrasi dan booking", async () => {
  process.env.KHANZA_BASENOREG = "booking";
  const { connection } = fakeConnection([100, 999, 12]);
  assert.deepEqual(await getRegistrationNumbers(connection, input), {
    no_rawat: "2026/11/11/000101", no_reg: "1000",
  });
});

test("basis registrasi tidak membaca booking dan hari kosong dimulai dari 001", async () => {
  process.env.KHANZA_BASENOREG = "registrasi";
  const { connection, calls } = fakeConnection([0, 0]);
  assert.deepEqual(await getRegistrationNumbers(connection, input), {
    no_rawat: "2026/11/11/000001", no_reg: "001",
  });
  assert.equal(calls.some((sql) => sql.includes("booking_registrasi")), false);
});

test("menolak tanggal tidak valid dan konfigurasi salah tanpa mengakses database", async () => {
  const { connection, calls } = fakeConnection([]);
  await assert.rejects(getRegistrationNumbers(connection, { ...input, tanggal: "2026-02-30" }));
  process.env.KHANZA_URUTNOREG = "acak";
  await assert.rejects(getRegistrationNumbers(connection, input), /Konfigurasi/);
  assert.equal(calls.length, 0);
});

test("tidak menghasilkan No. Rawat melebihi panjang kolom Khanza", async () => {
  process.env.KHANZA_BASENOREG = "registrasi";
  const { connection } = fakeConnection([999999, 1]);
  await assert.rejects(getRegistrationNumbers(connection, input), /batas format/);
});

test("tabrakan primary key dari desktop dicoba ulang dengan nomor baru", async () => {
  process.env.KHANZA_BASENOREG = "registrasi";
  const { connection, calls } = fakeConnection([10, 5, 11, 6]);
  const attempted: string[] = [];
  const numbers = await saveWithRegistrationNumbers(connection, input, async (assigned) => {
    attempted.push(assigned.no_rawat);
    if (attempted.length === 1) throw Object.assign(new Error("Duplicate entry"), { code: "ER_DUP_ENTRY" });
  });
  assert.deepEqual(attempted, ["2026/11/11/000011", "2026/11/11/000012"]);
  assert.equal(numbers.no_reg, "007");
  assert.ok(calls[0].includes("GET_LOCK"));
  assert.ok(calls.at(-1)?.includes("RELEASE_LOCK"));
});

test("error penyimpanan selain duplikat tidak diulang dan lock tetap dilepas", async () => {
  process.env.KHANZA_BASENOREG = "registrasi";
  const { connection, calls } = fakeConnection([10, 5]);
  await assert.rejects(saveWithRegistrationNumbers(connection, input, async () => {
    throw new Error("Invalid foreign key");
  }), /Invalid foreign key/);
  assert.ok(calls.at(-1)?.includes("RELEASE_LOCK"));
});

test("timeout lock tidak menjalankan penyimpanan", async () => {
  const { connection } = fakeConnection([], 0);
  await assert.rejects(saveWithRegistrationNumbers(connection, input, async () => {
    assert.fail("Tidak boleh menyimpan tanpa lock");
  }), /sedang digunakan/);
});

test("tabrakan berulang berhenti setelah tiga percobaan dan melepaskan lock", async () => {
  process.env.KHANZA_BASENOREG = "registrasi";
  const { connection, calls } = fakeConnection([10, 5, 11, 6, 12, 7]);
  let attempts = 0;
  await assert.rejects(saveWithRegistrationNumbers(connection, input, async () => {
    attempts++;
    throw Object.assign(new Error("Duplicate entry"), { code: "ER_DUP_ENTRY" });
  }), /Duplicate entry/);
  assert.equal(attempts, 3);
  assert.ok(calls.at(-1)?.includes("RELEASE_LOCK"));
});

test("kegagalan melepas lock menutup koneksi tanpa melaporkan simpan sukses sebagai gagal", async (t) => {
  process.env.KHANZA_BASENOREG = "registrasi";
  t.mock.method(console, "error", () => {});
  const { connection, isDestroyed } = fakeConnection([10, 5], 1, true);
  const saved = await saveWithRegistrationNumbers(connection, input, async () => {});
  assert.equal(saved.no_rawat, "2026/11/11/000011");
  assert.equal(isDestroyed(), true);
});

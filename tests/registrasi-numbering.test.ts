import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import type { PoolConnection } from "mysql2/promise";
import { isRegistrationDate, registrationDate } from "../src/lib/registrasi/date";
import { getRegistrationNumbers, saveWithRegistrationNumbers } from "../src/lib/registrasi/numbering";
import { registrationInput, registrationAge, RegistrationError } from "../src/lib/registrasi/validation";
import { registrationValues, saveReferral, ensureNoCareRecords, lockRegistration, type ExistingRegistration } from "../src/lib/registrasi/records";

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

// Kasus regresi penyimpanan, tarif, rujukan, dan pengamanan data terkait.
const form = {
  no_rawat: "2026/11/11/000001", tgl_registrasi: "2026-11-11", jam_reg: "09:10:11",
  no_rkm_medis: "000001", kd_dokter: "D001", kd_poli: "P01", kd_pj: "A09",
  p_jawab: "Nama", almt_pj: "Alamat", hubunganpj: "AYAH", asal_rujukan: "Klinik",
  stts: "Belum", status_bayar: "Belum Bayar",
};
function scripted(results: unknown[][]) {
  const calls: { sql: string; params: unknown[] }[] = [];
  return {
    calls,
    connection: { async execute(sql: string, params: unknown[] = []) {
      calls.push({ sql, params });
      assert.ok(results.length, "Unexpected query");
      return [results.shift(), []];
    } } as unknown as PoolConnection,
  };
}
test("validasi menolak jam/status salah serta tidak menerima tarif dan umur dari browser", () => {
  assert.throws(() => registrationInput({ ...form, jam_reg: "25:00:00" }), RegistrationError);
  assert.throws(() => registrationInput({ ...form, status_bayar: "Lunas" }), RegistrationError);
  const value = registrationInput({ ...form, biaya_reg: -1, umurdaftar: 999 });
  assert.equal("biaya_reg" in value, false);
  assert.equal("umurdaftar" in value, false);
});
test("umur dihitung pada tanggal kunjungan untuk tahun, bulan, dan hari", () => {
  assert.deepEqual(registrationAge("2000-11-12", "2026-11-11"), { umur: 25, satuan: "Th" });
  assert.deepEqual(registrationAge("2026-10-01", "2026-11-11"), { umur: 1, satuan: "Bl" });
  assert.deepEqual(registrationAge("2026-11-01", "2026-11-11"), { umur: 10, satuan: "Hr" });
  assert.throws(() => registrationAge("2026-11-12", "2026-11-11"));
});
for (const status of ["Baru", "Lama"]) {
  test(`tarif ${status}, status kunjungan poli, umur dan penjamin dihitung server`, async () => {
    const { connection } = scripted([
      [{ birth: "2000-01-01", registered: status === "Baru" ? form.tgl_registrasi : "2020-01-01" }],
      [{ registrasi: 20000, registrasilama: 10000 }], [{ kd_dokter: "D001" }], [{ kd_pj: "A09" }], [{ total: 1 }],
    ]);
    const values = await registrationValues(connection, registrationInput(form));
    assert.equal(values[8], status === "Baru" ? 20000 : 10000);
    assert.equal(values[10], status);
    assert.equal(values[11], "A09");
    assert.equal(values[12], 26);
    assert.equal(values[15], "Lama");
  });
}
test("edit biasa mempertahankan tarif tersimpan", async () => {
  const { connection } = scripted([
    [{ birth: "2000-01-01", registered: "2020-01-01" }], [{ registrasi: 20000, registrasilama: 10000 }], [{}], [{}], [{ total: 0 }],
  ]);
  const old = { no_rkm_medis: form.no_rkm_medis, kd_poli: form.kd_poli, tgl_registrasi: form.tgl_registrasi, biaya_reg: 7500 } as ExistingRegistration;
  assert.equal((await registrationValues(connection, registrationInput(form), old))[8], 7500);
});
test("pasien tidak ditemukan ditolak sebelum penyimpanan", async () => {
  const { connection } = scripted([[]]);
  await assert.rejects(registrationValues(connection, registrationInput(form)), /Pasien tidak ditemukan/);
});
test("registrasi yang sudah dihapus petugas lain memberi 404", async () => {
  const { connection } = scripted([[]]);
  await assert.rejects(lockRegistration(connection, form.no_rawat), (error: unknown) => error instanceof RegistrationError && error.status === 404);
});
test("rujukan desktop diperbarui tanpa menimpa nomor bridging dan detail lainnya", async () => {
  const { connection, calls } = scripted([[{ no_rawat: form.no_rawat }], []]);
  await saveReferral(connection, form.no_rawat, "Klinik Baru", form.tgl_registrasi);
  assert.match(calls[1].sql, /SET perujuk = \?/);
  assert.doesNotMatch(calls[1].sql, /SET.*no_rujuk/);
  assert.deepEqual(calls[1].params, ["Klinik Baru", form.no_rawat]);
});
test("rujukan baru memakai nomor balasan harian", async () => {
  const { connection, calls } = scripted([[], [{ maximum: 4 }], []]);
  await saveReferral(connection, form.no_rawat, "Klinik", form.tgl_registrasi);
  assert.equal(calls[2].params.at(-1), "BR/2026/11/11/0005");
});
test("data pelayanan terkait memblokir hapus atau penggantian pasien", async () => {
  const { connection, calls } = scripted([[], [{ table_name: "periksa_lab", column_name: "no_rawat" }], [{ found: 1 }]]);
  await assert.rejects(ensureNoCareRecords(connection, form.no_rawat), (error: unknown) => error instanceof RegistrationError && error.status === 409);
  assert.equal(calls.some((call) => call.sql.startsWith("DELETE")), false);
});

test("biaya perujuk juga memblokir hapus meskipun belum ada pelayanan lain", async () => {
  const { connection } = scripted([[{ jm_perujuk: 50000 }]]);
  await assert.rejects(ensureNoCareRecords(connection, form.no_rawat), /biaya perujuk/);
});

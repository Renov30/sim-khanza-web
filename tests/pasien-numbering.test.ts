import assert from "node:assert/strict";
import { test } from "node:test";
import type { PoolConnection } from "mysql2/promise";
import { getNextPatientNumber, updateLastPatientNumber } from "../src/lib/pasien/numbering";

function database(settings: Record<string, string>, last = "", used: string[] = []) {
  const calls: { sql: string; params: unknown[] }[] = [];
  const connection = {
    execute: async (sql: string, params: unknown[] = []) => {
      calls.push({ sql, params });
      if (sql.includes("FROM set_urut_no_rkm_medis")) return [[settings], []];
      if (sql.includes("FROM set_no_rkm_medis")) return [last ? [{ no_rkm_medis: last }] : [], []];
      if (sql.includes("FROM pasien WHERE")) return [used.includes(String(params[0])) ? [{ no_rkm_medis: params[0] }] : [], []];
      return [{ affectedRows: 1 }, []];
    },
  } as unknown as PoolConnection;
  return { connection, calls };
}

test("nomor RM Straight mengikuti nomor terakhir", async () => {
  const db = database({ urutan: "Straight", tahun: "No", bulan: "No", posisi_tahun_bulan: "Belakang" }, "000009");
  assert.equal(await getNextPatientNumber(db.connection, "2026-11-13"), "000010");
});

test("tahun dan bulan mengikuti posisi konfigurasi Khanza", async () => {
  const depan = database({ urutan: "Straight", tahun: "Yes", bulan: "Yes", posisi_tahun_bulan: "Depan" }, "2611000042");
  assert.equal(await getNextPatientNumber(depan.connection, "2026-12-01"), "2612000043");
  const belakang = database({ urutan: "Straight", tahun: "Yes", bulan: "Yes", posisi_tahun_bulan: "Belakang" }, "000042-1126");
  assert.equal(await getNextPatientNumber(belakang.connection, "2026-12-01"), "000043-1226");
});

test("urutan Terminal dan Middle kompatibel dengan DlgPasien", async () => {
  const terminal = database({ urutan: "Terminal", tahun: "No", bulan: "No", posisi_tahun_bulan: "Belakang" }, "090000");
  assert.equal(await getNextPatientNumber(terminal.connection, "2026-11-13"), "100000");
  const middle = database({ urutan: "Middle", tahun: "No", bulan: "No", posisi_tahun_bulan: "Belakang" }, "000009");
  assert.equal(await getNextPatientNumber(middle.connection, "2026-11-13"), "000010");
});

test("nomor yang sudah dipakai dilewati dan marker diperbarui atomik", async () => {
  const db = database({ urutan: "Straight", tahun: "No", bulan: "No", posisi_tahun_bulan: "Belakang" }, "000009", ["000010"]);
  assert.equal(await getNextPatientNumber(db.connection, "2026-11-13"), "000011");
  await updateLastPatientNumber(db.connection, "000011");
  assert.ok(db.calls.some(({ sql }) => sql.startsWith("DELETE FROM set_no_rkm_medis")));
  assert.ok(db.calls.some(({ sql, params }) => sql.startsWith("INSERT INTO set_no_rkm_medis") && params[0] === "000011"));
});

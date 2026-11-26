import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MENU_KONTEKS_RAWAT_JALAN,
  tentukanAksiMenu as aksiRawatJalan,
  type BarisMenuKonteks as BarisRawatJalan,
  type ItemMenuKonteks as ItemRawatJalan,
} from "../src/components/modul/menu-konteks-rawat-jalan-data";
import {
  kunciBarisRawatInap,
  MENU_KONTEKS_RAWAT_INAP,
  tentukanAksiMenu as aksiRawatInap,
  type BarisMenuKonteks as BarisRawatInap,
  type ItemMenuKonteks as ItemRawatInap,
} from "../src/components/modul/menu-konteks-rawat-inap-data";
import {
  MENU_KONTEKS_IGD,
  tentukanAksiMenu as aksiIgd,
  type BarisMenuKonteks as BarisIgd,
  type ItemMenuKonteks as ItemIgd,
} from "../src/components/modul/menu-konteks-igd-data";
import {
  MENU_KONTEKS_REGISTRASI,
  MENU_KONTEKS_RUJUKAN_INTERNAL,
  tentukanAksiMenu as aksiRegistrasi,
  type BarisMenuKonteks as BarisRegistrasi,
  type ItemMenuKonteks as ItemRegistrasi,
} from "../src/components/modul/menu-konteks-registrasi-data";

interface SimpulMenu {
  id: string;
  label: string;
  children?: readonly SimpulMenu[];
}

function kumpulkanId(items: readonly SimpulMenu[], hasil: string[] = []) {
  for (const item of items) {
    hasil.push(item.id);
    if (item.children) kumpulkanId(item.children, hasil);
  }
  return hasil;
}

function cariItem(items: readonly SimpulMenu[], id: string): SimpulMenu | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    const anak = item.children && cariItem(item.children, id);
    if (anak) return anak;
  }
  return undefined;
}

const baratJalan: BarisRawatJalan = {
  no_rawat: "2026/11/20/0001",
  no_reg: "000001",
  no_rkm_medis: "000001",
  nm_pasien: "Pasien Uji",
  nm_dokter: "Dokter Uji",
  nm_poli: "Poli Uji",
  kd_pj: "A09",
  png_jawab: "UMUM",
  stts: "Belum",
  tgl_registrasi: "2026-11-20",
  jam_reg: "08:00:00",
};

const baratInap: BarisRawatInap = {
  no_rawat: "2026/11/20/0002",
  no_rkm_medis: "000002",
  nm_pasien: "Pasien Uji",
  p_jawab: "UMUM",
  kd_kamar: "KAMAR-01",
  nm_bangsal: "Bangsal Uji",
  tgl_masuk: "2026-11-20",
  jam_masuk: "09:00:00",
};

const barisIgd: BarisIgd = {
  no_rawat: "2026/11/21/0003",
  no_reg: "000003",
  no_rkm_medis: "000003",
  nm_pasien: "Pasien Uji",
  nm_dokter: "Dokter Uji",
  kd_poli: "IGDK",
  nm_poli: "IGD",
  kd_pj: "A09",
  png_jawab: "UMUM",
  stts: "Belum",
  tgl_registrasi: "2026-11-21",
  jam_reg: "10:00:00",
};

const barisRegistrasi: BarisRegistrasi = {
  no_rawat: "2026/11/21/0004",
  nm_pasien: "Pasien Uji",
};

test("data menu klik kanan tidak memiliki ID ganda", () => {
  for (const [nama, menu] of [["rawat jalan", MENU_KONTEKS_RAWAT_JALAN], ["rawat inap", MENU_KONTEKS_RAWAT_INAP], ["IGD", MENU_KONTEKS_IGD], ["registrasi", MENU_KONTEKS_REGISTRASI], ["rujukan internal", MENU_KONTEKS_RUJUKAN_INTERNAL]] as const) {
    const ids = kumpulkanId(menu);
    assert.equal(new Set(ids).size, ids.length, `${nama} memiliki ID ganda`);
    assert.ok(ids.length > 20, `${nama} memiliki terlalu sedikit item`);
  }
});

test("kunci baris rawat inap unik untuk no. rawat yang sama", () => {
  const pertama = kunciBarisRawatInap({ no_rawat: "2025/07/08/000001", tgl_masuk: "2025-07-08", jam_masuk: "08:00:00", kd_kamar: "KAMAR-01" });
  const kedua = kunciBarisRawatInap({ no_rawat: "2025/07/08/000001", tgl_masuk: "2025-07-08", jam_masuk: "10:30:00", kd_kamar: "KAMAR-02" });
  assert.notEqual(pertama, kedua);
});

test("menu rawat jalan tetap memetakan resume dan pengurutan", () => {
  const resume = cariItem(MENU_KONTEKS_RAWAT_JALAN, "ppResume") as ItemRawatJalan | undefined;
  assert.ok(resume);
  assert.deepEqual(aksiRawatJalan(resume, baratJalan), {
    jenis: "rute",
    label: "Resume",
    rute: `/resume-pasien?no_rawat=${encodeURIComponent(baratJalan.no_rawat)}`,
  });

  const urutan = cariItem(MENU_KONTEKS_RAWAT_JALAN, "MnUrutDokterAsc") as ItemRawatJalan | undefined;
  assert.ok(urutan);
  assert.deepEqual(aksiRawatJalan(urutan, baratJalan), {
    jenis: "urut",
    label: "Dokter Ascending",
    kunci: "dokter",
    arah: "asc",
  });
});

test("menu rawat inap memetakan rute, pengurutan, dan item belum tersedia", () => {
  const resume = cariItem(MENU_KONTEKS_RAWAT_INAP, "ppResume") as ItemRawatInap | undefined;
  assert.ok(resume);
  assert.deepEqual(aksiRawatInap(resume, baratInap), {
    jenis: "rute",
    label: "Resume",
    rute: `/resume-pasien?no_rawat=${encodeURIComponent(baratInap.no_rawat)}`,
  });

  const urutan = cariItem(MENU_KONTEKS_RAWAT_INAP, "MnUrutNamaAsc") as ItemRawatInap | undefined;
  assert.ok(urutan);
  assert.deepEqual(aksiRawatInap(urutan, baratInap), {
    jenis: "urut",
    label: "Nama Ascending",
    kunci: "nama",
    arah: "asc",
  });

  const billing = cariItem(MENU_KONTEKS_RAWAT_INAP, "MnBilling") as ItemRawatInap | undefined;
  assert.ok(billing);
  assert.deepEqual(aksiRawatInap(billing, baratInap), {
    jenis: "rute",
    label: "Billing/Pembayaran Pasien",
    rute: `/rawat-inap/billing?no_rawat=${encodeURIComponent(baratInap.no_rawat)}`,
  });
});

test("menu IGD mengikuti jumlah grup dan node DlgIgd.java", () => {
  const hitung = (items: readonly ItemIgd[]): number => items.reduce((jumlah, item) => jumlah + 1 + (item.children ? hitung(item.children) : 0), 0);
  assert.equal(MENU_KONTEKS_IGD.length, 16);
  assert.equal(hitung(MENU_KONTEKS_IGD), 272);
});

test("menu IGD memetakan resume, filter SEP, dan billing", () => {
  const resume = cariItem(MENU_KONTEKS_IGD, "ppResume") as ItemIgd | undefined;
  assert.ok(resume);
  assert.deepEqual(aksiIgd(resume, barisIgd), {
    jenis: "rute",
    label: "Data Resume Pasien",
    rute: `/resume-pasien?no_rawat=${encodeURIComponent(barisIgd.no_rawat)}`,
  });

  const belumSep = cariItem(MENU_KONTEKS_IGD, "MnBelumTerbitSEP") as ItemIgd | undefined;
  assert.ok(belumSep);
  assert.deepEqual(aksiIgd(belumSep, barisIgd), {
    jenis: "filter",
    label: "Belum Terbit SEP BPJS",
    kunci: "sep",
    nilai: "Belum",
  });

  const billing = cariItem(MENU_KONTEKS_IGD, "MnBilling") as ItemIgd | undefined;
  assert.ok(billing);
  assert.deepEqual(aksiIgd(billing, barisIgd), {
    jenis: "rute",
    label: "Billing Total",
    rute: `/rawat-inap/billing?no_rawat=${encodeURIComponent(barisIgd.no_rawat)}`,
  });
});

test("menu registrasi mengikuti jumlah grup dan node DlgReg.java", () => {
  const hitung = (items: readonly ItemRegistrasi[]): number => items.reduce((jumlah, item) => jumlah + 1 + (item.children ? hitung(item.children) : 0), 0);
  assert.equal(MENU_KONTEKS_REGISTRASI.length, 17);
  assert.equal(hitung(MENU_KONTEKS_REGISTRASI), 339);
  assert.equal(MENU_KONTEKS_RUJUKAN_INTERNAL.length, 10);
  assert.equal(hitung(MENU_KONTEKS_RUJUKAN_INTERNAL), 39);
});

test("menu registrasi memetakan rute, filter SEP, pengurutan, dan aksi hapus rujukan", () => {
  const resume = cariItem(MENU_KONTEKS_REGISTRASI, "ppResume") as ItemRegistrasi | undefined;
  assert.ok(resume);
  assert.deepEqual(aksiRegistrasi(resume, barisRegistrasi), {
    jenis: "rute",
    label: "Resume Pasien",
    rute: `/resume-pasien?no_rawat=${encodeURIComponent(barisRegistrasi.no_rawat)}`,
  });

  const belumSep = cariItem(MENU_KONTEKS_REGISTRASI, "MnBelumTerbitSEP") as ItemRegistrasi | undefined;
  assert.ok(belumSep);
  assert.deepEqual(aksiRegistrasi(belumSep, barisRegistrasi), {
    jenis: "filter",
    label: "Belum Terbit SEP BPJS",
    kunci: "sep",
    nilai: "Belum",
  });

  const urutan = cariItem(MENU_KONTEKS_REGISTRASI, "MnUrutDokterAsc") as ItemRegistrasi | undefined;
  assert.ok(urutan);
  assert.deepEqual(aksiRegistrasi(urutan, barisRegistrasi), {
    jenis: "urut",
    label: "Dokter Ascending",
    kunci: "dokter",
    arah: "asc",
  });

  const lab = cariItem(MENU_KONTEKS_RUJUKAN_INTERNAL, "MnPermintaanLab1") as ItemRegistrasi | undefined;
  assert.ok(lab);
  assert.deepEqual(aksiRegistrasi(lab, barisRegistrasi), {
    jenis: "rute",
    label: "Pemeriksaan Lab",
    rute: "/laboratorium/permintaan-pk",
  });

  const hapusRujukan = cariItem(MENU_KONTEKS_RUJUKAN_INTERNAL, "MnHapusRujukan") as ItemRegistrasi | undefined;
  assert.ok(hapusRujukan);
  assert.deepEqual(aksiRegistrasi(hapusRujukan, barisRegistrasi), {
    jenis: "hapus",
    label: "Hapus Rujukan Poli Internal",
    target: "MnHapusRujukan",
  });
});

function kumpulkanDaun(items: readonly SimpulMenu[], hasil: SimpulMenu[] = []) {
  for (const item of items) {
    if (item.children?.length) kumpulkanDaun(item.children, hasil);
    else hasil.push(item);
  }
  return hasil;
}

test("seluruh leaf item pada keempat menu klik kanan aktif tanpa status belum", () => {
  const cekSemuaAktif = (
    nama: string,
    menu: readonly SimpulMenu[],
    resolver: (item: SimpulMenu) => { jenis: string },
  ) => {
    const daun = kumpulkanDaun(menu);
    const belum = daun.filter((item) => resolver(item).jenis === "belum");
    assert.deepEqual(
      belum.map((item) => item.id),
      [],
      `${nama} masih memiliki item belum aktif`,
    );
  };

  cekSemuaAktif("rawat jalan", MENU_KONTEKS_RAWAT_JALAN, (it) => aksiRawatJalan(it as ItemRawatJalan, baratJalan));
  cekSemuaAktif("rawat inap", MENU_KONTEKS_RAWAT_INAP, (it) => aksiRawatInap(it as ItemRawatInap, baratInap));
  cekSemuaAktif("IGD", MENU_KONTEKS_IGD, (it) => aksiIgd(it as ItemIgd, barisIgd));
  cekSemuaAktif("registrasi", MENU_KONTEKS_REGISTRASI, (it) => aksiRegistrasi(it as ItemRegistrasi, barisRegistrasi));
  cekSemuaAktif("rujukan internal", MENU_KONTEKS_RUJUKAN_INTERNAL, (it) => aksiRegistrasi(it as ItemRegistrasi, barisRegistrasi));
});

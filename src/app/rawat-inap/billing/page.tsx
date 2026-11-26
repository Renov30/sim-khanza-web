"use client";

import { HalamanModulPelayanan, type KonfigurasiHalamanPelayanan } from "@/components/modul/HalamanModulPelayanan";

const CONFIG: KonfigurasiHalamanPelayanan = {
  id: "billing-rawat-inap",
  caption: "Daftar billing dan nota tagihan pasien rawat inap",
  endpoint: "/api/rawat-inap/billing",
  pakaiPeriode: true,
  placeholderCari: "Cari No. Rawat, No. RM, pasien, No. Nota, cara bayar...",
  minWidthTabel: "76rem",
  detailBilling: true,
  filterSelect: [{ param: "status_bayar", label: "Status Bayar", opsiKey: "statusBayar", lebar: "w-44" }],
  kolom: [
    { kunci: "no_rawat", label: "No. Rawat", tipe: "mono" },
    { kunci: "tgl_registrasi", label: "Tgl. Reg", tipe: "mono", align: "center" },
    { kunci: "no_rkm_medis", label: "No. RM", tipe: "mono" },
    { kunci: "nm_pasien", label: "Nama Pasien" },
    { kunci: "png_jawab", label: "Cara Bayar" },
    { kunci: "no_nota", label: "No. Nota", tipe: "mono" },
    { kunci: "tgl_nota", label: "Tgl. Nota", tipe: "mono", align: "center" },
    { kunci: "total_billing", label: "Total Billing (Rp)", tipe: "uang", align: "right" },
    { kunci: "total_deposit", label: "Deposit (Rp)", tipe: "uang", align: "right" },
    { kunci: "total_dibayar", label: "Terbayar (Rp)", tipe: "uang", align: "right" },
    { kunci: "status_bayar", label: "Status Bayar", tipe: "status", align: "center" },
  ],
  kunciBaris: (b) => String(b.no_rawat ?? ""),
};

export default function HalamanBillingRawatInap() {
  return <HalamanModulPelayanan config={CONFIG} />;
}

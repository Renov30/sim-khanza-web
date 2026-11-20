import { NextRequest, NextResponse } from "next/server";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";
import { getSession } from "@/lib/auth";
import type { UserSession } from "@/lib/types/auth";
import { executeQuery, pool } from "@/lib/db";
import { isRegistrationDate } from "@/lib/registrasi/date";
import { resumePasienAccess } from "@/lib/resume-pasien/access";
import {
  KONDISI_PULANG,
  PANJANG_RESUME,
  resumeKosong,
  type KolomTeksResume,
  type KondisiPulang,
  type KunjunganResume,
  type ResumePasienData,
  type ResumePasienForm,
} from "@/lib/resume-pasien/types";

interface KunjunganRow extends RowDataPacket, KunjunganResume {}

interface ResumeRow extends RowDataPacket {
  no_rawat: string;
  kd_dokter: string;
  keluhan_utama: string;
  jalannya_penyakit: string;
  pemeriksaan_penunjang: string;
  hasil_laborat: string;
  diagnosa_utama: string;
  kd_diagnosa_utama: string;
  diagnosa_sekunder: string;
  kd_diagnosa_sekunder: string;
  diagnosa_sekunder2: string;
  kd_diagnosa_sekunder2: string;
  diagnosa_sekunder3: string;
  kd_diagnosa_sekunder3: string;
  diagnosa_sekunder4: string;
  kd_diagnosa_sekunder4: string;
  prosedur_utama: string;
  kd_prosedur_utama: string;
  prosedur_sekunder: string;
  kd_prosedur_sekunder: string;
  prosedur_sekunder2: string;
  kd_prosedur_sekunder2: string;
  prosedur_sekunder3: string;
  kd_prosedur_sekunder3: string;
  kondisi_pulang: string;
  obat_pulang: string;
}

interface DaftarRow extends ResumeRow {
  no_rkm_medis: string;
  nm_pasien: string;
  tgl_registrasi: string;
  nm_dokter: string;
}

interface RegistrasiKunci extends RowDataPacket {
  no_rawat: string;
  no_rkm_medis: string;
}

interface DokterRow extends RowDataPacket {
  kode: string;
  nama: string;
}

interface KodeRow extends RowDataPacket {
  kode: string;
  nama: string;
}

interface HitunganRow extends RowDataPacket {
  jumlah: number;
}

class ResumeError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

const KOLOM_TEKS = Object.keys(PANJANG_RESUME) as KolomTeksResume[];

export async function GET(req: NextRequest) {
  try {
    const denied = await resumePasienAccess();
    if (denied) return denied;
    const session = await getSession();
    if (!session) throw new ResumeError("Silakan login kembali.", 401);
    const query = req.nextUrl.searchParams;

    if (query.get("resource") === "dokter") {
      const rows = await executeQuery<DokterRow>(
        "SELECT kd_dokter AS kode, nm_dokter AS nama FROM dokter ORDER BY nm_dokter LIMIT 200",
      );
      return NextResponse.json(
        { success: true, data: rows.map((row) => ({ kode: String(row.kode), nama: String(row.nama) })) },
        { headers: { "Cache-Control": "private, max-age=300" } },
      );
    }

    const noRawat = query.get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 17) throw new ResumeError("No. Rawat tidak valid.");
    const tanggalAwal = query.get("tanggal_awal")?.trim() || "";
    const tanggalAkhir = query.get("tanggal_akhir")?.trim() || "";
    const kataKunci = query.get("kata_kunci")?.trim().slice(0, 100) || "";
    if (tanggalAwal && !isRegistrationDate(tanggalAwal)) throw new ResumeError("Tanggal awal tidak valid.");
    if (tanggalAkhir && !isRegistrationDate(tanggalAkhir)) throw new ResumeError("Tanggal akhir tidak valid.");
    if (tanggalAwal && tanggalAkhir && tanggalAwal > tanggalAkhir) throw new ResumeError("Rentang tanggal tidak valid.");
    const batasMentah = Number(query.get("batas") ?? 50);
    const batas = Number.isFinite(batasMentah) ? Math.min(Math.max(Math.trunc(batasMentah), 1), 100) : 50;

    const kunjunganRows = await executeQuery<KunjunganRow>(
      `SELECT r.no_rawat, r.no_rkm_medis, p.nm_pasien, p.jk, r.umurdaftar, r.sttsumur,
              DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
              TIME_FORMAT(r.jam_reg, '%H:%i:%s') AS jam_reg,
              r.kd_dokter, COALESCE(d.nm_dokter, r.kd_dokter) AS nm_dokter,
              r.kd_poli, COALESCE(pl.nm_poli, r.kd_poli) AS nm_poli, r.status_bayar
       FROM reg_periksa r
       INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
       LEFT JOIN dokter d ON d.kd_dokter = r.kd_dokter
       LEFT JOIN poliklinik pl ON pl.kd_poli = r.kd_poli
       WHERE r.no_rawat = ? AND r.status_lanjut = 'Ralan'`,
      [noRawat],
    );
    const kunjungan = kunjunganRows[0];
    if (!kunjungan) throw new ResumeError("Kunjungan rawat jalan tidak ditemukan.", 404);

    const dokterLogin = await apakahDokter(session, session.username);
    const resumeRows = await executeQuery<ResumeRow>("SELECT * FROM resume_pasien WHERE no_rawat = ?", [noRawat]);
    const resumeRow = resumeRows[0];
    const dokterAwal = !session.isAdmin && dokterLogin ? session.username : String(kunjungan.kd_dokter || "");
    const resume = resumeRow ? dariBaris(resumeRow) : resumeKosong(noRawat, dokterAwal);
    const bisaUbah = session.isAdmin || (dokterLogin && (!resumeRow || String(resumeRow.kd_dokter) === session.username));

    const syarat = ["r.no_rkm_medis = ?"];
    const parameter: string[] = [String(kunjungan.no_rkm_medis)];
    if (tanggalAwal) {
      syarat.push("r.tgl_registrasi >= ?");
      parameter.push(tanggalAwal);
    }
    if (tanggalAkhir) {
      syarat.push("r.tgl_registrasi <= ?");
      parameter.push(tanggalAkhir);
    }
    if (kataKunci) {
      const seperti = `%${kataKunci}%`;
      syarat.push(`(rp.no_rawat LIKE ? OR p.nm_pasien LIKE ? OR d.nm_dokter LIKE ?
        OR rp.diagnosa_utama LIKE ? OR rp.kd_diagnosa_utama LIKE ?
        OR rp.prosedur_utama LIKE ? OR rp.kd_prosedur_utama LIKE ? OR rp.kondisi_pulang LIKE ?)`);
      parameter.push(seperti, seperti, seperti, seperti, seperti, seperti, seperti, seperti);
    }
    const filter = syarat.join(" AND ");
    const [hitungan, daftarRows, dokterRows, diagnosaRows, prosedurRows] = await Promise.all([
      executeQuery<HitunganRow>(
        `SELECT COUNT(*) AS jumlah FROM resume_pasien rp
         INNER JOIN reg_periksa r ON r.no_rawat = rp.no_rawat
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN dokter d ON d.kd_dokter = rp.kd_dokter
         WHERE ${filter}`,
        parameter,
      ),
      executeQuery<DaftarRow & RowDataPacket>(
        `SELECT rp.no_rawat, r.no_rkm_medis, p.nm_pasien,
                DATE_FORMAT(r.tgl_registrasi, '%Y-%m-%d') AS tgl_registrasi,
                rp.kd_dokter, COALESCE(d.nm_dokter, rp.kd_dokter) AS nm_dokter,
                rp.keluhan_utama, rp.jalannya_penyakit, rp.pemeriksaan_penunjang, rp.hasil_laborat,
                rp.diagnosa_utama, rp.kd_diagnosa_utama,
                rp.diagnosa_sekunder, rp.kd_diagnosa_sekunder,
                rp.diagnosa_sekunder2, rp.kd_diagnosa_sekunder2,
                rp.diagnosa_sekunder3, rp.kd_diagnosa_sekunder3,
                rp.diagnosa_sekunder4, rp.kd_diagnosa_sekunder4,
                rp.prosedur_utama, rp.kd_prosedur_utama,
                rp.prosedur_sekunder, rp.kd_prosedur_sekunder,
                rp.prosedur_sekunder2, rp.kd_prosedur_sekunder2,
                rp.prosedur_sekunder3, rp.kd_prosedur_sekunder3,
                rp.kondisi_pulang, rp.obat_pulang
         FROM resume_pasien rp
         INNER JOIN reg_periksa r ON r.no_rawat = rp.no_rawat
         INNER JOIN pasien p ON p.no_rkm_medis = r.no_rkm_medis
         LEFT JOIN dokter d ON d.kd_dokter = rp.kd_dokter
         WHERE ${filter}
         ORDER BY r.tgl_registrasi DESC, r.jam_reg DESC
         LIMIT ${batas}`,
        parameter,
      ),
      executeQuery<DokterRow>("SELECT kd_dokter AS kode, nm_dokter AS nama FROM dokter ORDER BY nm_dokter LIMIT 200"),
      executeQuery<KodeRow>(
        `SELECT py.kd_penyakit AS kode, py.nm_penyakit AS nama
         FROM diagnosa_pasien dp INNER JOIN penyakit py ON py.kd_penyakit = dp.kd_penyakit
         WHERE dp.no_rawat = ? AND dp.status = 'Ralan'
         ORDER BY dp.prioritas, dp.kd_penyakit LIMIT 5`,
        [noRawat],
      ),
      executeQuery<KodeRow>(
        `SELECT pp.kode, COALESCE(ic.deskripsi_panjang, ic.deskripsi_pendek, pp.kode) AS nama
         FROM prosedur_pasien pp LEFT JOIN icd9 ic ON ic.kode = pp.kode
         WHERE pp.no_rawat = ? AND pp.status = 'Ralan'
         ORDER BY pp.prioritas, pp.kode LIMIT 4`,
        [noRawat],
      ),
    ]);

    const data: ResumePasienData = {
      ada: Boolean(resumeRow),
      bisa_ubah: bisaUbah,
      kunjungan,
      resume,
      daftar: daftarRows.map((row) => ({
        ...dariBaris(row),
        no_rkm_medis: String(row.no_rkm_medis),
        nm_pasien: String(row.nm_pasien),
        tgl_registrasi: String(row.tgl_registrasi),
        nm_dokter: String(row.nm_dokter),
      })),
      total: Number(hitungan[0]?.jumlah || 0),
      dokter: dokterRows.map((row) => ({ kode: String(row.kode), nama: String(row.nama) })),
      unggulan: {
        diagnosa: diagnosaRows.map((row) => ({ kode: String(row.kode), nama: String(row.nama) })),
        prosedur: prosedurRows.map((row) => ({ kode: String(row.kode), nama: String(row.nama) })),
      },
    };
    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return gagal(error, "Gagal memuat resume pasien.");
  }
}

export async function POST(req: NextRequest) {
  return simpan(req, false);
}

export async function PUT(req: NextRequest) {
  return simpan(req, true);
}

async function simpan(req: NextRequest, mengubah: boolean) {
  const denied = await resumePasienAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new ResumeError("Silakan login kembali.", 401);
    const input = bacaInput(await req.json(), session);
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, input.no_rawat);
    await pastikanDokter(connection, session, input.kd_dokter);
    if (mengubah) {
      await pastikanPemilik(connection, session, input.no_rawat);
      const [hasil] = await connection.execute(
        `UPDATE resume_pasien SET kd_dokter=?, keluhan_utama=?, jalannya_penyakit=?,
         pemeriksaan_penunjang=?, hasil_laborat=?, diagnosa_utama=?, kd_diagnosa_utama=?,
         diagnosa_sekunder=?, kd_diagnosa_sekunder=?, diagnosa_sekunder2=?, kd_diagnosa_sekunder2=?,
         diagnosa_sekunder3=?, kd_diagnosa_sekunder3=?, diagnosa_sekunder4=?, kd_diagnosa_sekunder4=?,
         prosedur_utama=?, kd_prosedur_utama=?, prosedur_sekunder=?, kd_prosedur_sekunder=?,
         prosedur_sekunder2=?, kd_prosedur_sekunder2=?, prosedur_sekunder3=?, kd_prosedur_sekunder3=?,
         kondisi_pulang=?, obat_pulang=? WHERE no_rawat=?`,
        [...nilaiResume(input), input.no_rawat],
      );
      if ((hasil as { affectedRows?: number }).affectedRows !== 1) {
        throw new ResumeError("Resume pasien tidak ditemukan atau sudah berubah.", 409);
      }
    } else {
      await connection.execute(
        `INSERT INTO resume_pasien
         (no_rawat, kd_dokter, keluhan_utama, jalannya_penyakit, pemeriksaan_penunjang, hasil_laborat,
          diagnosa_utama, kd_diagnosa_utama, diagnosa_sekunder, kd_diagnosa_sekunder,
          diagnosa_sekunder2, kd_diagnosa_sekunder2, diagnosa_sekunder3, kd_diagnosa_sekunder3,
          diagnosa_sekunder4, kd_diagnosa_sekunder4, prosedur_utama, kd_prosedur_utama,
          prosedur_sekunder, kd_prosedur_sekunder, prosedur_sekunder2, kd_prosedur_sekunder2,
          prosedur_sekunder3, kd_prosedur_sekunder3, kondisi_pulang, obat_pulang)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [input.no_rawat, ...nilaiResume(input)],
      );
    }
    await connection.commit();
    return NextResponse.json({
      success: true,
      message: mengubah ? "Resume pasien berhasil diperbarui." : "Resume pasien berhasil disimpan.",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Resume pasien gagal disimpan.");
  } finally {
    connection?.release();
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await resumePasienAccess();
  if (denied) return denied;
  let connection: PoolConnection | undefined;
  try {
    const session = await getSession();
    if (!session) throw new ResumeError("Silakan login kembali.", 401);
    const noRawat = req.nextUrl.searchParams.get("no_rawat")?.trim() || "";
    if (!noRawat || noRawat.length > 17) throw new ResumeError("No. Rawat tidak valid.");
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await kunciRegistrasi(connection, noRawat);
    await pastikanPemilik(connection, session, noRawat);
    const [hasil] = await connection.execute("DELETE FROM resume_pasien WHERE no_rawat = ?", [noRawat]);
    if ((hasil as { affectedRows?: number }).affectedRows !== 1) {
      throw new ResumeError("Resume pasien tidak ditemukan.", 404);
    }
    await connection.commit();
    return NextResponse.json({ success: true, message: "Resume pasien berhasil dihapus." });
  } catch (error) {
    if (connection) await connection.rollback();
    return gagal(error, "Resume pasien gagal dihapus.");
  } finally {
    connection?.release();
  }
}

function bacaInput(body: unknown, session: UserSession): ResumePasienForm {
  if (!body || typeof body !== "object") throw new ResumeError("Data resume tidak valid.");
  const data = body as Record<string, unknown>;
  const teks = (nama: string) => typeof data[nama] === "string" ? (data[nama] as string).trim() : "";
  const no_rawat = teks("no_rawat");
  if (!no_rawat || no_rawat.length > 17) throw new ResumeError("No. Rawat tidak valid.");
  const kd_dokter = session.isAdmin ? teks("kd_dokter") : session.username;
  if (!kd_dokter || kd_dokter.length > 20) throw new ResumeError("Dokter penanggung jawab tidak valid.");

  const nilai = {} as Record<KolomTeksResume, string>;
  for (const nama of KOLOM_TEKS) {
    nilai[nama] = teks(nama);
    if (nilai[nama].length > PANJANG_RESUME[nama]) {
      throw new ResumeError(`${nama.replaceAll("_", " ")} terlalu panjang.`);
    }
  }
  nilai.kd_dokter = kd_dokter;
  if (!nilai.keluhan_utama || !nilai.jalannya_penyakit || !nilai.diagnosa_utama) {
    throw new ResumeError("Keluhan utama, jalannya penyakit, dan diagnosa utama wajib diisi.");
  }
  const kondisi = teks("kondisi_pulang");
  if (!KONDISI_PULANG.includes(kondisi as KondisiPulang)) {
    throw new ResumeError("Kondisi pulang tidak valid.");
  }
  return { ...resumeKosong(no_rawat, kd_dokter), ...nilai, kondisi_pulang: kondisi as KondisiPulang };
}

function nilaiResume(form: ResumePasienForm): string[] {
  return [
    form.kd_dokter,
    form.keluhan_utama,
    form.jalannya_penyakit,
    form.pemeriksaan_penunjang,
    form.hasil_laborat,
    form.diagnosa_utama,
    form.kd_diagnosa_utama,
    form.diagnosa_sekunder,
    form.kd_diagnosa_sekunder,
    form.diagnosa_sekunder2,
    form.kd_diagnosa_sekunder2,
    form.diagnosa_sekunder3,
    form.kd_diagnosa_sekunder3,
    form.diagnosa_sekunder4,
    form.kd_diagnosa_sekunder4,
    form.prosedur_utama,
    form.kd_prosedur_utama,
    form.prosedur_sekunder,
    form.kd_prosedur_sekunder,
    form.prosedur_sekunder2,
    form.kd_prosedur_sekunder2,
    form.prosedur_sekunder3,
    form.kd_prosedur_sekunder3,
    form.kondisi_pulang,
    form.obat_pulang,
  ];
}

function dariBaris(row: ResumeRow): ResumePasienForm {
  const kondisi = KONDISI_PULANG.includes(row.kondisi_pulang as KondisiPulang)
    ? row.kondisi_pulang as KondisiPulang
    : "Hidup";
  return {
    no_rawat: String(row.no_rawat),
    kd_dokter: String(row.kd_dokter),
    keluhan_utama: String(row.keluhan_utama),
    jalannya_penyakit: String(row.jalannya_penyakit),
    pemeriksaan_penunjang: String(row.pemeriksaan_penunjang),
    hasil_laborat: String(row.hasil_laborat),
    diagnosa_utama: String(row.diagnosa_utama),
    kd_diagnosa_utama: String(row.kd_diagnosa_utama),
    diagnosa_sekunder: String(row.diagnosa_sekunder),
    kd_diagnosa_sekunder: String(row.kd_diagnosa_sekunder),
    diagnosa_sekunder2: String(row.diagnosa_sekunder2),
    kd_diagnosa_sekunder2: String(row.kd_diagnosa_sekunder2),
    diagnosa_sekunder3: String(row.diagnosa_sekunder3),
    kd_diagnosa_sekunder3: String(row.kd_diagnosa_sekunder3),
    diagnosa_sekunder4: String(row.diagnosa_sekunder4),
    kd_diagnosa_sekunder4: String(row.kd_diagnosa_sekunder4),
    prosedur_utama: String(row.prosedur_utama),
    kd_prosedur_utama: String(row.kd_prosedur_utama),
    prosedur_sekunder: String(row.prosedur_sekunder),
    kd_prosedur_sekunder: String(row.kd_prosedur_sekunder),
    prosedur_sekunder2: String(row.prosedur_sekunder2),
    kd_prosedur_sekunder2: String(row.kd_prosedur_sekunder2),
    prosedur_sekunder3: String(row.prosedur_sekunder3),
    kd_prosedur_sekunder3: String(row.kd_prosedur_sekunder3),
    kondisi_pulang: kondisi,
    obat_pulang: String(row.obat_pulang),
  };
}

async function apakahDokter(session: UserSession, username: string) {
  if (session.isAdmin) return true;
  const rows = await executeQuery<RowDataPacket[]>(
    "SELECT kd_dokter FROM dokter WHERE kd_dokter = ? LIMIT 1",
    [username],
  );
  return rows.length > 0;
}

async function kunciRegistrasi(connection: PoolConnection, noRawat: string) {
  const [rows] = await connection.execute<RegistrasiKunci[]>(
    "SELECT no_rawat, no_rkm_medis FROM reg_periksa WHERE no_rawat = ? AND status_lanjut = 'Ralan' FOR UPDATE",
    [noRawat],
  );
  if (!rows[0]) throw new ResumeError("Kunjungan rawat jalan tidak ditemukan.", 404);
  return rows[0];
}

async function pastikanDokter(connection: PoolConnection, session: UserSession, kdDokter: string) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_dokter FROM dokter WHERE kd_dokter = ? LIMIT 1",
    [kdDokter],
  );
  if (!rows[0]) {
    if (!session.isAdmin) throw new ResumeError("User login bukan dokter atau dokter tidak ditemukan.", 403);
    throw new ResumeError("Dokter penanggung jawab tidak ditemukan.", 409);
  }
}

async function pastikanPemilik(connection: PoolConnection, session: UserSession, noRawat: string) {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT kd_dokter FROM resume_pasien WHERE no_rawat = ? FOR UPDATE",
    [noRawat],
  );
  if (!rows[0]) throw new ResumeError("Resume pasien tidak ditemukan.", 404);
  if (!session.isAdmin && String(rows[0].kd_dokter) !== session.username) {
    throw new ResumeError("Resume hanya dapat diubah oleh dokter yang mencatatnya.", 403);
  }
}

function gagal(error: unknown, fallback: string) {
  if (error instanceof ResumeError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ success: false, error: "Format data tidak valid." }, { status: 400 });
  }
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code === "ER_DUP_ENTRY") {
    return NextResponse.json({ success: false, error: "Resume untuk kunjungan ini sudah ada." }, { status: 409 });
  }
  console.error(fallback, error);
  return NextResponse.json({ success: false, error: fallback }, { status: 500 });
}

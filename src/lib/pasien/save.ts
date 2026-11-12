import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { additionalPatientFields, fullPatientAge, patientMasters } from './fields';
import { isRegistrationDate, registrationDate } from '../registrasi/date';
import { RegistrationError } from '../registrasi/validation';
const limits: Record<string, number> = { no_rkm_medis:15,nm_pasien:40,no_ktp:20,jk:1,tmp_lahir:15,tgl_lahir:10,nm_ibu:40,alamat:200,gol_darah:2,pekerjaan:60,stts_nikah:20,agama:12,tgl_daftar:10,no_tlp:40,umur:30,pnd:20,keluarga:20,namakeluarga:50,kd_pj:3,no_peserta:25,pekerjaanpj:35,alamatpj:100 };
export async function savePatient(connection: PoolConnection, body: unknown, editing: boolean) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RegistrationError('Data pasien tidak valid.');
  const input = body as Record<string, unknown>;
  const rm = input.no_rkm_medis;
  if (typeof rm !== 'string' || !rm.trim() || rm.length>15) throw new RegistrationError('No. Rekam Medis tidak valid.');
  const [rows] = await connection.execute<RowDataPacket[]>("SELECT *, DATE_FORMAT(tgl_daftar, '%Y-%m-%d') AS tgl_daftar, DATE_FORMAT(tgl_lahir, '%Y-%m-%d') AS tgl_lahir FROM pasien WHERE no_rkm_medis = ? FOR UPDATE", [rm]);
  const old = rows[0];
  if (editing && !old) throw new RegistrationError('Pasien tidak ditemukan.',404);
  if (!editing && old) throw new RegistrationError('No. Rekam Medis sudah digunakan. Gunakan Ganti untuk mengedit.',409);
  const columns = [...new Set([...Object.keys(limits), ...additionalPatientFields.map((field) => field.key)])];
  const data: Record<string, string> = {};
  for (const column of columns) {
    const field = additionalPatientFields.find((item) => item.key === column);
    const max = limits[column] ?? (field && 'max' in field ? field.max : 30);
    const value = input[column] ?? old?.[column] ?? (column === 'tgl_daftar' ? registrationDate() : '');
    if (!['string','number'].includes(typeof value) || String(value).length > max) throw new RegistrationError(`Isian ${column} tidak valid (maksimal ${max} karakter).`);
    data[column] = String(value).trim();
  }
  if (!data.nm_pasien || !isRegistrationDate(data.tgl_lahir) || data.tgl_lahir>registrationDate() || !isRegistrationDate(data.tgl_daftar)) throw new RegistrationError('Nama pasien, tanggal lahir, dan tanggal daftar wajib valid.');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new RegistrationError('Alamat email tidak valid.');
  data.umur = fullPatientAge(data.tgl_lahir,registrationDate());
  for (const field of additionalPatientFields) {
    if (!('master' in field)) continue;
    const [table,key] = patientMasters[field.key];
    const [found] = await connection.execute<RowDataPacket[]>(`SELECT ${key} FROM ${table} WHERE ${key} = ?`,[data[field.key]]);
    if (!found.length) throw new RegistrationError(`Pilih ${field.label.toLowerCase()} dari data master.`);
  }
  const [payers]=await connection.execute<RowDataPacket[]>('SELECT kd_pj FROM penjab WHERE kd_pj=?',[data.kd_pj]);
  if(!payers.length) throw new RegistrationError('Penjamin tidak valid.');
  const values = columns.map((key) => data[key]);
  if (editing) {
    const writable=columns.filter((key) => key!=='no_rkm_medis');
    await connection.execute(`UPDATE pasien SET ${writable.map((key)=>`${key}=?`).join(',')} WHERE no_rkm_medis=?`,[...writable.map((key)=>data[key]),rm]);
  } else {
    await connection.execute(`INSERT INTO pasien (${columns.join(',')}) VALUES (${columns.map(()=>'?').join(',')})`,values);
  }
  for (const group of ['tni','polri']) {
    const flag = input[`anggota_${group}`];
    if (flag === undefined) continue; // Klien lama tidak boleh menghapus keanggotaan yang sudah tersimpan.
    if (flag !== true && flag !== false) throw new RegistrationError('Status keanggotaan tidak valid.');
    if (!flag) { await connection.execute(`DELETE FROM pasien_${group} WHERE no_rkm_medis=?`,[rm]); continue; }
    const fields=['golongan','pangkat','satuan','jabatan'].map((kind)=>`${kind}_${group}`);
    const ids=[];
    for (const field of fields) {
      const value=input[field];
      if ((typeof value!=='string' && typeof value!=='number') || !/^\d+$/.test(String(value))) throw new RegistrationError(`Pilih ${field.replaceAll('_',' ')}.`);
      const [found]=await connection.execute<RowDataPacket[]>(`SELECT id FROM ${field} WHERE id=?`,[value]);
      if (!found.length) throw new RegistrationError(`Pilihan ${field} tidak valid.`);
      ids.push(value);
    }
    await connection.execute(`INSERT INTO pasien_${group} (no_rkm_medis,${fields.join(',')}) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE ${fields.map((field)=>`${field}=VALUES(${field})`).join(',')}`,[rm,...ids]);
  }
}

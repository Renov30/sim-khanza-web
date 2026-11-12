export const patientMasters = {
  kd_pj: ["penjab", "kd_pj", "png_jawab"],
  kd_kel: ['kelurahan', 'kd_kel', 'nm_kel'], kd_kec: ['kecamatan', 'kd_kec', 'nm_kec'],
  kd_kab: ['kabupaten', 'kd_kab', 'nm_kab'], kd_prop: ['propinsi', 'kd_prop', 'nm_prop'],
  perusahaan_pasien: ['perusahaan_pasien', 'kode_perusahaan', 'nama_perusahaan'],
  suku_bangsa: ['suku_bangsa', 'id', 'nama_suku_bangsa'], bahasa_pasien: ['bahasa_pasien', 'id', 'nama_bahasa'],
  cacat_fisik: ['cacat_fisik', 'id', 'nama_cacat'],
  ...Object.fromEntries(['tni','polri'].flatMap((group) => ['golongan','pangkat','satuan','jabatan'].map((kind) => [`${kind}_${group}`, [`${kind}_${group}`, 'id', `nama_${kind}`]]))),
} as Record<string, readonly string[]>;

export const additionalPatientFields = [
  { key: 'tgl_daftar', label: 'Pertama Daftar', type: 'date' },
  { key: 'email', label: 'Email', type: 'email', max: 50 },
  { key: 'nip', label: 'NIP/NRP', max: 30 },
  { key: 'kd_kel', label: 'Kelurahan Pasien', master: true },
  { key: 'kd_kec', label: 'Kecamatan Pasien', master: true },
  { key: 'kd_kab', label: 'Kabupaten Pasien', master: true },
  { key: 'kd_prop', label: 'Provinsi Pasien', master: true },
  { key: 'kelurahanpj', source: 'kd_kel', label: 'Kelurahan P.J.', max: 60 },
  { key: 'kecamatanpj', source: 'kd_kec', label: 'Kecamatan P.J.', max: 60 },
  { key: 'kabupatenpj', source: 'kd_kab', label: 'Kabupaten P.J.', max: 60 },
  { key: 'propinsipj', source: 'kd_prop', label: 'Provinsi P.J.', max: 30 },
  { key: 'suku_bangsa', label: 'Suku/Bangsa', master: true },
  { key: 'bahasa_pasien', label: 'Bahasa Dipakai', master: true },
  { key: 'cacat_fisik', label: 'Cacat Fisik', master: true },
  { key: 'perusahaan_pasien', label: 'Instansi Pasien', master: true },
] as const;
export type AdditionalPatientValues = Record<string, string>;
export function emptyPatientDetails(date: string): AdditionalPatientValues {
  return Object.fromEntries(additionalPatientFields.map((field) => [field.key, field.key === 'tgl_daftar' ? date : 'master' in field ? '' : ['kelurahanpj','kecamatanpj','kabupatenpj','propinsipj'].includes(field.key) ? '-' : '']));
}
export function fullPatientAge(birth: string, today: string) {
  const start = new Date(`${birth}T00:00:00Z`), end = new Date(`${today}T00:00:00Z`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start > end) return '';
  let months = (end.getUTCFullYear()-start.getUTCFullYear())*12+end.getUTCMonth()-start.getUTCMonth();
  if (end.getUTCDate()<start.getUTCDate()) months--;
  const anchor = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+Math.max(months,0),1));
  const lastDay = new Date(Date.UTC(anchor.getUTCFullYear(),anchor.getUTCMonth()+1,0)).getUTCDate();
  anchor.setUTCDate(Math.min(start.getUTCDate(),lastDay));
  const days = Math.max(0, Math.floor((end.getTime()-anchor.getTime())/86400000));
  return `${Math.floor(Math.max(months,0)/12)} Th ${Math.max(months,0)%12} Bl ${days} Hr`;
}

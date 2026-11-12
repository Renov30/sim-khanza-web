import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { PoolConnection } from 'mysql2/promise';
import { additionalPatientFields, emptyPatientDetails, fullPatientAge } from '../src/lib/pasien/fields';
import { savePatient } from '../src/lib/pasien/save';
const form={...emptyPatientDetails('2026-11-12'),no_rkm_medis:'TEST01',nm_pasien:'Pasien Uji',no_ktp:'123',jk:'L',tmp_lahir:'Merauke',tgl_lahir:'2000-01-01',nm_ibu:'Ibu',alamat:'Alamat',gol_darah:'O',pekerjaan:'Swasta',stts_nikah:'MENIKAH',agama:'ISLAM',no_tlp:'08123',pnd:'S1',keluarga:'AYAH',namakeluarga:'Nama PJ',kd_pj:'A09',no_peserta:'12345',pekerjaanpj:'Swasta',alamatpj:'Alamat PJ',email:'uji@example.com',nip:'NRP01',kd_kel:'1',kd_kec:'2',kd_kab:'3',kd_prop:'4',perusahaan_pasien:'INST01',suku_bangsa:'5',bahasa_pasien:'6',cacat_fisik:'7',kelurahanpj:'Kelurahan',kecamatanpj:'Kecamatan',kabupatenpj:'Kabupaten',propinsipj:'Provinsi'};
function database(old?: Record<string,unknown>, rejectMaster=false){
 const calls:{sql:string;params:unknown[]}[]=[];
 const connection={execute:async(sql:string,params:unknown[]=[])=>{
  calls.push({sql,params});
  if(sql.includes('FROM pasien WHERE'))return [old?[old]:[],[]];
  if(sql.startsWith('SELECT'))return [rejectMaster?[]:[{id:1}],[]];
  return [{affectedRows:1},[]];
 }} as unknown as PoolConnection;
 return {connection,calls};
}
test('tanggal dan rincian umur dihitung termasuk batas akhir bulan',()=>{
 assert.equal(fullPatientAge('2026-01-31','2026-03-01'),'0 Th 1 Bl 1 Hr');
 assert.equal(fullPatientAge('2000-01-01','2026-11-12'),'26 Th 10 Bl 11 Hr');
 assert.equal(fullPatientAge('2026-11-13','2026-11-12'),'');
});
test('seluruh field tambahan dimasukkan ke penyimpanan pasien',async()=>{
 const {connection,calls}=database();await savePatient(connection,form,false);
 const insert=calls.find(({sql})=>sql.startsWith('INSERT INTO pasien '))!;
 const columns=insert.sql.match(/\((.*?)\)/)![1].split(',');
 for(const field of additionalPatientFields){assert.ok(columns.includes(field.key));assert.equal(insert.params[columns.indexOf(field.key)],form[field.key as keyof typeof form]);}
 assert.equal(insert.params[columns.indexOf('umur')],fullPatientAge(form.tgl_lahir,new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jayapura'}).format(new Date())));
});
test('edit dari klien lama mempertahankan field tambahan yang tidak dikirim',async()=>{
 const {connection,calls}=database({...form});
 const {email, nip, ...core}=form;void email;void nip;
 await savePatient(connection,core,true);
 const update=calls.find(({sql})=>sql.startsWith('UPDATE pasien'))!;
 assert.ok(update.params.includes('uji@example.com'));assert.ok(update.params.includes('NRP01'));
});
test('tambah menolak nomor RM yang sudah ada; edit menolak pasien yang tidak ada',async()=>{
 await assert.rejects(savePatient(database(form).connection,form,false),/sudah digunakan/);
 await assert.rejects(savePatient(database().connection,form,true),/tidak ditemukan/);
});
test('email dan pilihan master yang tidak valid tidak disimpan',async()=>{
 await assert.rejects(savePatient(database().connection,{...form,email:'bukan-email'},false),/email/);
 const db=database(undefined,true);await assert.rejects(savePatient(db.connection,form,false),/master/);
 assert.equal(db.calls.some(({sql})=>sql.startsWith('INSERT')),false);
});
test('data keanggotaan TNI tersimpan bersama seluruh ID master',async()=>{
 const db=database();await savePatient(db.connection,{...form,anggota_tni:true,golongan_tni:'1',pangkat_tni:'2',satuan_tni:'3',jabatan_tni:'4'},false);
 const entry=db.calls.find(({sql})=>sql.startsWith('INSERT INTO pasien_tni'))!;
 assert.deepEqual(entry.params,['TEST01','1','2','3','4']);
});
test('keanggotaan tidak dihapus bila tidak dikirim; hapus hanya jika dinonaktifkan eksplisit',async()=>{
 const db=database(form);await savePatient(db.connection,form,true);assert.equal(db.calls.some(({sql})=>sql.startsWith('DELETE')),false);
 const off=database(form);await savePatient(off.connection,{...form,anggota_tni:false},true);assert.ok(off.calls.some(({sql})=>sql.startsWith('DELETE FROM pasien_tni')));
});

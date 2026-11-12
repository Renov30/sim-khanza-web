import { getSession } from '../auth';
import { NextResponse } from 'next/server';
export async function patientAccess() {
  const user = await getSession();
  if (!user) return NextResponse.json({ success: false, error: 'Silakan login kembali.' }, { status: 401 });
  if (!user.isAdmin && !user.permissions.registrasi && !user.permissions.pasien) return NextResponse.json({ success: false, error: 'Akses data pasien tidak diizinkan.' }, { status: 403 });
  return null;
}

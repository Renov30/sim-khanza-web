'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser, faMagnifyingGlass, faPlus, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

export interface PasienOption {
  no_rkm_medis: string;
  nm_pasien: string;
  alamat: string;
  namakeluarga: string;
  keluarga: string;
  kd_pj: string;
  png_jawab: string | null;
  jk: string;
  no_tlp: string;
  no_peserta: string;
  tgl_daftar: string;
}

interface Props {
  terbuka: boolean;
  endpoint: string;
  pencarianAwal?: string;
  onTutup: () => void;
  onPilih: (pasien: PasienOption) => void;
  onError?: (pesan: string) => void;
}

export function PilihPasienDialog({ terbuka, endpoint, pencarianAwal = '', onTutup, onPilih, onError }: Props) {
  const [kataCari, setKataCari] = useState(pencarianAwal);
  const [daftar, setDaftar] = useState<PasienOption[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [sedangMemuatBerikutnya, setSedangMemuatBerikutnya] = useState(false);
  const [adaBerikutnya, setAdaBerikutnya] = useState(false);
  const [offset, setOffset] = useState(0);
  const permintaan = useRef<AbortController | null>(null);
  const permintaanBerikutnya = useRef<AbortController | null>(null);
  const kunciMemuatBerikutnya = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const cari = useCallback((query: string) => {
    setKataCari(query);
    permintaan.current?.abort();
    permintaanBerikutnya.current?.abort();
    kunciMemuatBerikutnya.current = false;
    if (timer.current) clearTimeout(timer.current);
    const controller = new AbortController();
    permintaan.current = controller;
    setSedangMemuat(true);
    setSedangMemuatBerikutnya(false);
    setAdaBerikutnya(false);
    setOffset(0);
    setDaftar([]);
    timer.current = setTimeout(async () => {
      try {
        const url = new URL(endpoint, window.location.origin);
        url.searchParams.set('jenis', 'pasien');
        url.searchParams.set('cari', query);
        url.searchParams.set('offset', '0');
        const res = await fetch(url.toString(), { signal: controller.signal, cache: 'no-store' });
        const json: { success?: boolean; data?: PasienOption[] | { pasien?: PasienOption[] }; error?: string; meta?: { hasMore?: boolean } } = await res.json();
        if (controller.signal.aborted) return;
        if (!res.ok || !json.success) throw new Error(json.error || 'Gagal mencari pasien');
        const data = Array.isArray(json.data) ? json.data : json.data?.pasien || [];
        setDaftar(data);
        setOffset(data.length);
        setAdaBerikutnya(Boolean(json.meta?.hasMore));
      } catch (error) {
        if (!controller.signal.aborted) {
          setDaftar([]);
          const pesan = error instanceof Error ? error.message : 'Gagal mencari pasien';
          onErrorRef.current?.(pesan);
        }
      } finally {
        if (!controller.signal.aborted) setSedangMemuat(false);
      }
    }, query ? 200 : 0);
  }, [endpoint]);

  const muatBerikutnya = async () => {
    if (!adaBerikutnya || sedangMemuat || kunciMemuatBerikutnya.current) return;
    kunciMemuatBerikutnya.current = true;
    setSedangMemuatBerikutnya(true);
    const controller = new AbortController();
    permintaanBerikutnya.current = controller;
    try {
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set('jenis', 'pasien');
      url.searchParams.set('cari', kataCari);
      url.searchParams.set('offset', String(offset));
      const res = await fetch(url.toString(), { signal: controller.signal, cache: 'no-store' });
      const json: { success?: boolean; data?: PasienOption[] | { pasien?: PasienOption[] }; error?: string; meta?: { hasMore?: boolean } } = await res.json();
      if (controller.signal.aborted) return;
      if (!res.ok || !json.success) throw new Error(json.error || 'Gagal memuat pasien berikutnya');
      const data = Array.isArray(json.data) ? json.data : json.data?.pasien || [];
      setDaftar((lama) => {
        const gabungan = new Map(lama.map((pasien) => [pasien.no_rkm_medis, pasien]));
        for (const pasien of data) gabungan.set(pasien.no_rkm_medis, pasien);
        return [...gabungan.values()];
      });
      setOffset((lama) => lama + data.length);
      setAdaBerikutnya(Boolean(json.meta?.hasMore));
    } catch (error) {
      if (!controller.signal.aborted) {
        const pesan = error instanceof Error ? error.message : 'Gagal memuat pasien berikutnya';
        onErrorRef.current?.(pesan);
      }
    } finally {
      if (!controller.signal.aborted) setSedangMemuatBerikutnya(false);
      if (permintaanBerikutnya.current === controller) {
        permintaanBerikutnya.current = null;
        kunciMemuatBerikutnya.current = false;
      }
    }
  };

  useEffect(() => {
    if (!terbuka) return;
    const timerBuka = setTimeout(() => cari(pencarianAwal), 0);
    return () => {
      clearTimeout(timerBuka);
      permintaan.current?.abort();
      permintaanBerikutnya.current?.abort();
      kunciMemuatBerikutnya.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [terbuka, pencarianAwal, cari]);

  useEffect(() => {
    if (!terbuka) return;
    const tutupDenganEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onTutup();
    };
    window.addEventListener('keydown', tutupDenganEscape);
    return () => window.removeEventListener('keydown', tutupDenganEscape);
  }, [terbuka, onTutup]);

  if (!terbuka) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-primary-800 px-4 py-3 text-xs font-bold text-white shadow-xs">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faHospitalUser} className="h-3.5 w-3.5 text-primary-200" />
            <span className="text-sm font-semibold tracking-wide">Cari Data Pasien (Rekam Medis)</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/pasien"
              className="flex cursor-pointer items-center gap-1.5 rounded border border-primary-400/60 bg-primary-600 px-2.5 py-1 text-[11px] font-semibold text-white no-underline shadow-2xs hover:bg-primary-500"
              title="Buka Data Pasien & Rekam Medis di halaman ini"
            >
              <FontAwesomeIcon icon={faPlus} className="h-2.5 w-2.5" />
              <span>Pasien Baru</span>
            </Link>
            <button
              type="button"
              onClick={onTutup}
              className="ml-1 cursor-pointer p-1 text-sm font-bold leading-none text-white hover:text-primary-200"
              title="Tutup"
              aria-label="Tutup pencarian pasien"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 p-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={kataCari}
              onChange={(event) => cari(event.target.value)}
              placeholder="Ketik No. RM, Nama Pasien, NIK, atau Alamat..."
              autoFocus
              aria-label="Cari data pasien"
              className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-8 pr-8 text-xs text-slate-800 shadow-2xs placeholder-slate-400 focus:border-primary-600 focus:outline-none"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            {kataCari && (
              <button
                type="button"
                onClick={() => cari('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                title="Bersihkan Pencarian"
                aria-label="Bersihkan pencarian pasien"
              >
                ✕
              </button>
            )}
          </div>
          {sedangMemuat && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin text-primary-600" />}
        </div>
        <div
          className="min-h-0 flex-1 overflow-auto px-2 pb-2"
          aria-busy={sedangMemuat || sedangMemuatBerikutnya}
          onScroll={(event) => {
            const target = event.currentTarget;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 96) void muatBerikutnya();
          }}
        >
          <table className="w-full text-left text-xs">
            <caption className="sr-only">Daftar hasil pencarian pasien</caption>
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white font-bold text-slate-600 shadow-2xs">
              <tr>
                <th scope="col" className="w-24 p-2">No. RM</th>
                <th scope="col" className="p-2">Nama Pasien</th>
                <th scope="col" className="w-10 p-2 text-center">JK</th>
                <th scope="col" className="p-2">Alamat</th>
                <th scope="col" className="w-28 p-2">No. Telp</th>
                <th scope="col" className="w-16 p-2 text-center">Pilih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {daftar.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    {sedangMemuat
                      ? 'Sedang memuat data pasien...'
                      : kataCari
                        ? `Pasien dengan kata kunci "${kataCari}" tidak ditemukan.`
                        : 'Belum ada data pasien terdaftar.'}
                  </td>
                </tr>
              ) : (
                daftar.map((pasien) => (
                  <tr
                    key={pasien.no_rkm_medis}
                    onClick={() => onPilih(pasien)}
                    className="cursor-pointer hover:bg-slate-100 focus-within:bg-slate-100"
                  >
                    <td className="p-2 font-mono font-normal text-slate-700">{pasien.no_rkm_medis}</td>
                    <td className="p-2 font-semibold text-slate-800">{pasien.nm_pasien}</td>
                    <td className="p-2 text-center text-slate-600">{pasien.jk}</td>
                    <td className="max-w-xs truncate p-2 text-slate-500">{pasien.alamat || '-'}</td>
                    <td className="p-2 font-mono text-[10px] text-slate-600">{pasien.no_tlp || '-'}</td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onPilih(pasien);
                        }}
                        className="cursor-pointer rounded bg-primary-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-2xs hover:bg-primary-700"
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {daftar.length > 0 && sedangMemuatBerikutnya && (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-slate-500">
                    <FontAwesomeIcon icon={faSpinner} className="mr-2 h-3 w-3 animate-spin text-primary-600" />
                    Memuat pasien berikutnya...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
          <span>Menampilkan {daftar.length} pasien{adaBerikutnya ? '' : ''}</span>
          <span>Klik baris untuk langsung memilih pasien</span>
        </div>
      </div>
    </div>
  );
}

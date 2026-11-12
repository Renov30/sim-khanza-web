'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../auth/AuthContext';

interface MasterOption { id: string; label: string }
export function PatientMasterSelect({ jenis, value, onChange, label, valueAsLabel = false, items }: {
  jenis: string; value: string; onChange: (id: string, name: string) => void; label: string; valueAsLabel?: boolean; items?: MasterOption[];
}) {
  const { isAuthenticated } = useAuth();
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ key: string; options: MasterOption[]; error: string } | null>(null);
  const key = JSON.stringify([jenis,value,query,valueAsLabel]);
  const localOptions = items ? (query ? items.filter((item)=>item.label.toLowerCase().includes(query.trim().toLowerCase())) : items) : undefined;
  const options = localOptions || result?.options || [];
  const hasItems = items !== undefined;
  const selected = (items || options).find((item) => (valueAsLabel ? item.label : item.id) === value);
  useEffect(() => {
    if (!isAuthenticated) { dialog.current?.close(); return; }
    if (hasItems || (!open && !value)) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ jenis, id: valueAsLabel ? '' : value, nama: valueAsLabel ? value : '', cari: query });
        const res = await fetch(`/api/pasien/options?${params}`, { signal: controller.signal });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Pilihan gagal dimuat');
        if (!controller.signal.aborted) setResult({ key, options: data.data, error: '' });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ key, options: [], error: error instanceof Error ? error.message : 'Pilihan gagal dimuat' });
      }
    }, query ? 200 : 0);
    return () => { controller.abort(); clearTimeout(timer); };
  }, [isAuthenticated, jenis, value, query, valueAsLabel, key, open, hasItems]);
  const show = () => { setQuery(''); setOpen(true); dialog.current?.showModal(); dialog.current?.querySelector('input')?.focus(); };
  return <div className="flex flex-1 min-w-0 items-center gap-1.5">
    <input data-lookup-field tabIndex={-1} aria-label={label} value={valueAsLabel ? value : selected?.label || ''} placeholder={value ? 'Memuat...' : label} readOnly onClick={show} className="h-7 w-full min-w-0 rounded-full border border-slate-300 bg-white px-2 font-sans text-xs font-normal text-slate-800 cursor-pointer focus:outline-none focus:border-emerald-600" />
    <button type="button" onClick={show} aria-label={`Pilih ${label}`} aria-haspopup="dialog" aria-expanded={open} aria-controls={`${titleId}-dialog`} title={`Pilih ${label}`} className="h-7 w-7 shrink-0 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
    </button>
    <dialog id={`${titleId}-dialog`} ref={dialog} aria-labelledby={titleId} onClose={() => setOpen(false)} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 w-[min(28rem,calc(100vw-2rem))] max-h-[75vh] rounded-lg border border-slate-200 bg-white text-slate-800 shadow-xl backdrop:bg-slate-900/40">
      <div className="flex justify-between items-center border-b border-slate-200 px-4 py-3">
        <h2 id={titleId} className="text-sm font-semibold">Pilih {label}</h2>
        <button type="button" aria-label="Tutup pilihan" onClick={() => dialog.current?.close()} className="p-1 text-slate-600"><FontAwesomeIcon icon={faXmark} className="h-3 w-3" /></button>
      </div>
      <div className="p-3"><input aria-label={`Cari ${label}`} placeholder={`Cari ${label.toLowerCase()}...`} value={query} onChange={(event) => setQuery(event.target.value)} className="h-8 w-full px-2.5 text-xs rounded-md border border-slate-300 focus:outline-none focus:border-emerald-600" /></div>
      <div className="overflow-auto max-h-[45vh] pb-2">
        {!hasItems && result?.key !== key ? <p className="px-4 py-3 text-xs text-slate-500" role="status">Memuat pilihan...</p>
          : !hasItems && result?.error ? <p className="px-4 py-3 text-xs text-slate-600" role="alert">{result.error}</p>
          : !options.length ? <p className="px-4 py-3 text-xs text-slate-500">Tidak ada pilihan yang sesuai.</p>
          : options.map((item) => <button key={item.id} type="button" onClick={() => { onChange(valueAsLabel ? item.label : item.id,item.label); dialog.current?.close(); }} className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none">{item.label}</button>)}
      </div>
    </dialog>
  </div>;
}

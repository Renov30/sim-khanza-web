"use client";

import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faXmark } from "@fortawesome/free-solid-svg-icons";

interface GantiPasswordModalProps {
  terbuka: boolean;
  onTutup: () => void;
  onSukses: (pesan: string) => void;
}

export function GantiPasswordModal({ terbuka, onTutup, onSukses }: GantiPasswordModalProps) {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [memproses, setMemproses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!terbuka) return null;

  const tutup = () => {
    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasi("");
    setError(null);
    onTutup();
  };

  const kirim = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMemproses(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passwordLama, passwordBaru, konfirmasi }),
      });
      const json = (await res.json()) as { success?: boolean; message?: string; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengganti password.");
      }
      tutup();
      onSukses(json.message || "Password akun berhasil diperbarui.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengganti password.");
    } finally {
      setMemproses(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ganti Password Akun"
        className="w-full max-w-sm rounded-lg border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <FontAwesomeIcon icon={faKey} className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
            <span>Ganti Password Akun</span>
          </div>
          <button
            type="button"
            onClick={tutup}
            aria-label="Tutup dialog ganti password"
            className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={(e) => { void kirim(e); }} className="space-y-3 p-4 text-xs">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <label htmlFor="gp-lama" className="block font-semibold text-slate-700">Password Lama</label>
            <input
              id="gp-lama"
              type="password"
              required
              value={passwordLama}
              onChange={(e) => setPasswordLama(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="gp-baru" className="block font-semibold text-slate-700">Password Baru</label>
            <input
              id="gp-baru"
              type="password"
              required
              minLength={4}
              value={passwordBaru}
              onChange={(e) => setPasswordBaru(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="gp-konfirmasi" className="block font-semibold text-slate-700">Konfirmasi Password Baru</label>
            <input
              id="gp-konfirmasi"
              type="password"
              required
              minLength={4}
              value={konfirmasi}
              onChange={(e) => setKonfirmasi(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 px-2.5 text-xs text-slate-800 focus:border-primary-600 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-3">
            <button
              type="button"
              disabled={memproses}
              onClick={tutup}
              className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={memproses}
              className="h-8 rounded-md bg-primary-600 px-3 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {memproses ? "Menyimpan..." : "Simpan Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

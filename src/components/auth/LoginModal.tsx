"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEye,
  faEyeSlash,
  faCircleExclamation,
  faXmark,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idUser.trim()) {
      setErrorMsg("ID User tidak boleh kosong");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Password tidak boleh kosong");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const result = await login(idUser, password);
      if (!result.success) {
        setErrorMsg(result.error || "Login gagal");
      } else {
        setIdUser("");
        setPassword("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillQuickAccount = (user: string, pass: string) => {
    setIdUser(user);
    setPassword(pass);
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Autentikasi Pengguna
              </h2>
              <p className="text-xs text-slate-500">SIMRS Khanza Database</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-200/60 transition-colors"
            title="Tutup (Esc)"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2">
              <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              ID User / NIP / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={idUser}
                onChange={(e) => setIdUser(e.target.value)}
                placeholder="Contoh: admin atau dr.medianto"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="w-3.5 h-3.5"
                />
              </button>
            </div>
          </div>

          {/* Quick testing accounts for developer convenience */}
          <div className="pt-1">
            <p className="text-[11px] font-medium text-slate-500 mb-1.5">
              Akun Uji Coba Cepat (Database sik_mitra):
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillQuickAccount("admin", "mit3449a")}
                className="text-[11px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors"
              >
                Admin (admin)
              </button>
              <button
                type="button"
                onClick={() => fillQuickAccount("dr.medianto", "03jk")}
                className="text-[11px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors"
              >
                Dokter (dr.medianto)
              </button>
              <button
                type="button"
                onClick={() => fillQuickAccount("iqbal", "iqbal")}
                className="text-[11px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors"
              >
                Apoteker (iqbal)
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
                  <span>Log In</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

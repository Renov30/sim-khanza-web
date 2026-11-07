"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { UserSession } from "@/lib/types/auth";

const BROADCAST_AUTH_CHANNEL = "khanza_auth_sync_channel";
const STORAGE_LOGOUT_KEY = "khanza_logout_sync_event";
const STORAGE_LOGIN_KEY = "khanza_login_sync_event";

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLocked: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  login: (idUser: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasPermission: (permKey?: string) => boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const json = await res.json();
      if (json.success && json.data?.user) {
        setUser(json.data.user);
        setIsLoginModalOpen(false);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Sinkronisasi Multi-Tab untuk Log Out & Log In
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. BroadcastChannel API: komunikasi instan antar tab di browser modern
    let channel: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      try {
        channel = new BroadcastChannel(BROADCAST_AUTH_CHANNEL);
        channel.onmessage = (event) => {
          if (!event.data) return;
          if (event.data.type === "LOGOUT") {
            // Tab lain melakukan logout: segera kunci sesi di tab ini
            setUser(null);
            setIsLoginModalOpen(true);
          } else if (event.data.type === "LOGIN") {
            // Tab lain berhasil login: sinkronkan sesi di tab ini
            if (event.data.user) {
              setUser(event.data.user);
              setIsLoginModalOpen(false);
            } else {
              refreshSession();
            }
          }
        };
      } catch (e) {
        console.error("BroadcastChannel init error:", e);
      }
    }

    // 2. Storage Event Listener: fallback sinkronisasi lintas tab
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_LOGOUT_KEY) {
        setUser(null);
        setIsLoginModalOpen(true);
      } else if (e.key === STORAGE_LOGIN_KEY) {
        refreshSession();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Tab Visibility & Focus: memastikan tab yang kembali aktif selalu tersinkronisasi
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshSession();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    return () => {
      if (channel) {
        try {
          channel.close();
        } catch {}
      }
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [refreshSession]);

  const login = async (idUser: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUser, password: pass }),
      });
      const data = await res.json();

      if (data.success && data.data?.user) {
        setUser(data.data.user);
        setIsLoginModalOpen(false);

        // Siarkan status LOGIN ke semua tab lain yang terbuka
        try {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const channel = new BroadcastChannel(BROADCAST_AUTH_CHANNEL);
            channel.postMessage({ type: "LOGIN", user: data.data.user, timestamp: Date.now() });
            channel.close();
          }
        } catch (e) {
          console.error("Broadcast login error:", e);
        }

        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_LOGIN_KEY, String(Date.now()));
          }
        } catch (e) {
          console.error("Storage login error:", e);
        }

        return { success: true };
      } else {
        return { success: false, error: data.error || "Login gagal" };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan jaringan";
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      setUser(null);
      setIsLoginModalOpen(true);

      // Siarkan status LOGOUT ke seluruh tab lain yang terbuka
      try {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const channel = new BroadcastChannel(BROADCAST_AUTH_CHANNEL);
          channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
          channel.close();
        }
      } catch (e) {
        console.error("Broadcast logout error:", e);
      }

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_LOGOUT_KEY, String(Date.now()));
        }
      } catch (e) {
        console.error("Storage logout error:", e);
      }
    }
  };

  const hasPermission = (permKey?: string): boolean => {
    if (!permKey) return true;
    if (!user) return false;
    if (user.isAdmin) return true;
    return !!user.permissions[permKey];
  };

  const isLocked = !isLoading && !user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLocked,
        isLoginModalOpen: isLocked || isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
        hasPermission,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}


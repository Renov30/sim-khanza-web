import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";

export const metadata: Metadata = {
  title: "SIMRS Khanza Web - Klinik Mitra Keluarga Papua",
  description: "Sistem Informasi Manajemen Rumah Sakit Khanza Versi Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body className="h-full flex flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";
import { AppShell } from "@/components/layout/AppShell";

config.autoAddCss = false;

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
    <html lang="id" className="h-full" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const t=localStorage.getItem('khanza_theme');const g=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',g);document.documentElement.style.colorScheme=g?'dark':'light';}catch(e){}})();`,
          }}
        />
      </head>
      <body className="h-full flex flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}

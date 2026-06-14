import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { LogoHeader } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apex - Aide à la décision sportive",
  description: "Plateforme PWA d'aide à la décision sportive avec analyses prédictives",
  manifest: "/manifest.json",
  icons: {
    icon: "/apex_logo_concept_no_dot.png",
    apple: "/apex_logo_concept_no_dot.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Apex",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/apex_logo_concept_no_dot.png" />
        <link rel="apple-touch-icon" href="/apex_logo_concept_no_dot.png" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white min-h-screen pb-20`}>
        <main className="max-w-lg mx-auto px-4">
          <LogoHeader />
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

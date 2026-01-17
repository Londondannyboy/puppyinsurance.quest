import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NeonAuthUIProvider, UserButton } from "@/lib/auth/client";
import { authClient } from "@/lib/auth/client";
import { Providers } from "@/components/providers";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pension Quest - UK Pension Advisor",
  description: "Your friendly AI guide to UK pensions. Understand, compare, and plan your retirement with Penelope.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Favicon - Q for Quest branding */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Pension Quest" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        <NeonAuthUIProvider
          authClient={authClient as any}
          redirectTo="/dashboard"
          emailOTP
          social={{ providers: ['google'] }}
        >
          <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900/95 backdrop-blur-sm z-[9999] flex items-center justify-between px-6 border-b border-slate-800">
            {/* Logo / Brand */}
            <a href="/" className="flex items-center gap-2 text-white font-semibold text-lg">
              <span className="text-2xl">💰</span>
              <span>Pension Quest</span>
            </a>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <a href="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Explore
              </a>
              <a href="/dashboard" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                My Pensions
              </a>
              <UserButton size="icon" />
            </nav>
          </header>
          <div className="pt-14">
            <Providers>
              {children}
            </Providers>
          </div>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}

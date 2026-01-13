import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";
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
  title: "Relocation Quest - AI Relocation Advisor",
  description: "Your voice-first AI guide to moving abroad. Explore destinations, visas, costs, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <Providers>
      {children}
    </Providers>
  );

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-white`}
      >
        {stackServerApp ? (
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {content}
            </StackTheme>
          </StackProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NeonAuthUIProvider } from "@/lib/auth/client";
import { authClient } from "@/lib/auth/client";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
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
  title: {
    default: "Puppy Insurance Prices UK | Cockapoo Insurance UK | Compare Pet Insurance",
    template: "%s | Puppy Insurance Prices & Cockapoo Insurance UK",
  },
  description:
    "Compare puppy insurance prices in the UK. Get instant quotes for Cockapoo insurance UK, Jack Russell, Pug & more breeds. Find the best puppy insurance prices with our AI-powered pet insurance advisor. Cockapoo insurance UK specialists.",
  keywords: [
    "puppy insurance prices",
    "cockapoo insurance uk",
    "puppy insurance",
    "pet insurance puppies",
    "dog insurance UK",
    "best pet insurance for puppies",
    "cheap puppy insurance",
    "jack russell insurance",
    "pug insurance",
    "cockapoo insurance",
    "puppy insurance cost",
    "compare pet insurance",
  ],
  authors: [{ name: "Puppy Insurance Prices & Cockapoo Insurance UK" }],
  creator: "Puppy Insurance Prices & Cockapoo Insurance UK",
  publisher: "Puppy Insurance Prices & Cockapoo Insurance UK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://puppyinsurance.quest"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Puppy Insurance Prices UK | Cockapoo Insurance UK | Compare Pet Insurance",
    description:
      "Compare puppy insurance prices in the UK. Get instant Cockapoo insurance UK quotes with our AI-powered pet insurance advisor. Best puppy insurance prices guaranteed.",
    url: "https://puppyinsurance.quest",
    siteName: "Puppy Insurance Prices & Cockapoo Insurance UK",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puppy Insurance Prices UK | Cockapoo Insurance UK",
    description: "Compare puppy insurance prices in the UK. Cockapoo insurance UK specialists with AI-powered quotes for all breeds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Puppy Insurance Prices & Cockapoo Insurance UK" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-white min-h-screen flex flex-col`}
      >
        <NeonAuthUIProvider
          authClient={authClient as Parameters<typeof NeonAuthUIProvider>[0]["authClient"]}
          redirectTo="/dashboard"
          emailOTP
          social={{ providers: ["google"] }}
        >
          <Header />
          <main className="flex-1 pt-[5.25rem]">
            <Providers>{children}</Providers>
          </main>
          <Footer />
          <CookieConsent />
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}

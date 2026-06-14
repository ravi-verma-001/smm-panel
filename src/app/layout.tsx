import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DovixSMM | Cheapest & Best SMM Panel Provider",
  description: "DovixSMM is the best SMM reseller panel offering cheap Instagram followers, YouTube views, Facebook likes, TikTok services, and automated API support.",
  keywords: ["DovixSMM", "Dovix SMM", "DovixSMM Panel", "Dovix SMM Panel", "Cheapest SMM Panel", "Best SMM Panel", "SMM Reseller Panel", "Instagram Followers Panel"],
  metadataBase: new URL("https://dovixsmm.com"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google42372001e5f64765",
  },
  openGraph: {
    title: "DovixSMM | Cheapest & Best SMM Panel Provider",
    description: "Get cheapest and fastest SMM services for Instagram, YouTube, TikTok, Facebook, and Telegram. Reseller API enabled.",
    url: "https://dovixsmm.com",
    siteName: "DovixSMM",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextTopLoader color="#2563EB" showSpinner={false} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

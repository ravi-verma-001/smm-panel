import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import MetaTrackingProvider from "@/components/MetaTracking";

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
  other: {
    "facebook-domain-verification": "5a4q2zpxr8t2v9x1b0y7cd6e3f4g8h",
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
      <head>
        {/* Google Tag Manager (GTM) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K2M9W5L3');`}
        </Script>

        {/* Google Analytics 4 (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H59JLD399S" strategy="afterInteractive" />
        <Script id="ga4-script" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H59JLD399S');`}
        </Script>

        {/* Meta Pixel (Facebook Pixel) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.push={};n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1528490384592470');`}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* GTM Noscript Fallback */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2M9W5L3"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }} 
          />
        </noscript>
        
        {/* Meta Pixel Noscript Fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1528490384592470&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <NextTopLoader color="#2563EB" showSpinner={false} />
        <Providers>
          <MetaTrackingProvider />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

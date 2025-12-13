import { CriticalCSS } from "@/components/critical-css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { ToastProvider } from "@/components/toast-provider";
import WhatsAppFloat from "@/components/whatsapp-float";
import { AuthProvider } from "@/context/auth-context";
import {
  baseMetadata,
  LocalBusinessJsonLD,
  OrganizationJsonLD,
  WebsiteJsonLD,
} from "@/lib/seo";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  ...baseMetadata,
  // Additional global metadata
  applicationName: "PrimePrint Dubai",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a3a63" },
    { media: "(prefers-color-scheme: dark)", color: "#1a3a63" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  // Enhanced Open Graph
  openGraph: {
    ...baseMetadata.openGraph,
    emails: ["alarqauae@gmail.com"],
    phoneNumbers: ["+971569324947"],
    countryName: "United Arab Emirates",
  },
  // Enhanced Twitter
  twitter: {
    ...baseMetadata.twitter,
    creator: "@stampprimeprint",
    site: "@stampprimeprint",
  },
  // Additional metadata
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    ICBM: "25.2048, 55.2708",
    language: "English",
    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
    "apple-mobile-web-app-title": "PrimePrint Dubai",
    "msapplication-TileColor": "#1a3a63",
  },
};
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AE" suppressHydrationWarning className={inter.variable}>
      <head>
        <LocalBusinessJsonLD />
        <OrganizationJsonLD />
        <WebsiteJsonLD />
        <CriticalCSS />
        <PerformanceMonitor />
        {/* Favicon */}
        <link rel="icon" href="/favicon-custom.svg" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon-custom.svg"
          type="image/svg+xml"
        />

        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-print.jpg" as="image" />
        <link rel="preload" href="/favicon-custom.svg" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1a3a63" />
        <meta name="msapplication-TileColor" content="#1a3a63" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PrimePrint Dubai" />
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main style={{ paddingTop: "var(--header-height, 7.5rem)" }}>
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

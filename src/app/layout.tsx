import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { baseMetadata, LocalBusinessJsonLD, OrganizationJsonLD, WebsiteJsonLD } from "@/lib/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";
import { ToastProvider } from "@/components/toast-provider";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { CriticalCSS } from "@/components/critical-css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = baseMetadata;
const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <LocalBusinessJsonLD />
        <OrganizationJsonLD />
        <WebsiteJsonLD />
        <CriticalCSS />
        <PerformanceMonitor />
        {/* Favicon */}
        <link rel="icon" href="/favicon-custom.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon-custom.svg" type="image/svg+xml" />
        
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
        <meta name="apple-mobile-web-app-title" content="PrintPro Dubai" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import site from "@/content/site.json";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://sehamadvertising.com"; // Update with actual domain
const BRAND = site.brand ?? "SEHAM ADVERTISING";

export const baseMetadata: Metadata = {
  metadataBase: DOMAIN ? new URL(DOMAIN) : undefined,
  title: {
    default: `${BRAND} — Premium Printing & Signage Solutions in Dubai`,
    template: `%s | ${BRAND}`,
  },
  description:
    "SEHAM ADVERTISING - Dubai's premier printing & signage company. Offset printing, screen printing, DTF, LED signs, vehicle branding, neon signs, business cards, vinyl stickers. Fast turnaround, professional installation. Get a free quote today!",
  keywords: [
    "SEHAM ADVERTISING",
    "Seham Advertising Dubai",
    "printing Dubai",
    "signage Dubai",
    "offset printing Dubai",
    "screen printing Dubai",
    "DTF printing Dubai",
    "LED signage Dubai",
    "vehicle branding Dubai",
    "neon signs Dubai",
    "business cards Dubai",
    "vinyl stickers Dubai",
    "packaging Dubai",
    "custom t-shirts Dubai",
    "acrylic letters Dubai",
    "embroidery Dubai",
    "digital printing Dubai",
    "flex printing Dubai",
    "banner printing Dubai",
    "roll up banner Dubai",
    "pop up banner Dubai",
    "brochure printing Dubai",
    "flyer printing Dubai",
    "catalog printing Dubai",
    "letterhead printing Dubai",
    "envelope printing Dubai",
    "invoice printing Dubai",
    "box printing Dubai",
    "bag printing Dubai",
    "stamp making Dubai",
    "company profile design Dubai",
    "3D design Dubai",
    "exhibition work Dubai",
    "Arabic book design Dubai",
    "gift box making Dubai",
    "custom shopping bag Dubai",
    "cloth bag Dubai",
    "plastic poly print Dubai",
    "metal laser cutting Dubai",
    "display stands Dubai",
    "kiosk counters Dubai",
    "name plates Dubai",
    "reflective stickers Dubai",
    "glass stickers Dubai",
    "die cut stickers Dubai",
    "curtain printing Dubai",
    "canvas printing Dubai",
  ],
  authors: [{ name: BRAND }],
  creator: BRAND,
  publisher: BRAND,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  classification: 'Printing Services',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: "en_AE",
    url: DOMAIN || undefined,
    title: `${BRAND} — Premium Printing & Signage in Dubai`,
    description: "SEHAM ADVERTISING - Dubai's trusted printing & signage partner. Fast turnaround, professional quality, competitive prices. Offset printing, screen printing, LED signs, vehicle branding & more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND} - Printing & Signage Dubai`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Premium Printing & Signage in Dubai`,
    description: "SEHAM ADVERTISING - Dubai's trusted printing & signage partner. Fast turnaround, professional quality.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      'en-AE': '/',
      // 'ar-AE': '/ar', // Add when Arabic version is ready
    },
  },
  verification: {
    // Add these when you set up Google Search Console & Bing Webmaster Tools
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

// Enhanced Local Business Schema
export function LocalBusinessJsonLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${DOMAIN}#business`,
    name: BRAND,
    alternateName: "Al Arqa Printing",
    description: "SEHAM ADVERTISING - Professional printing and signage services in Dubai. Offset printing, screen printing, DTF, LED signs, vehicle branding, and more.",
    url: DOMAIN,
    telephone: site.phone ?? "+971569324947",
    email: site.email ?? "alarqauae@gmail.com",
    priceRange: "$$",
    image: `${DOMAIN}/logo.svg`,
    logo: `${DOMAIN}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2048",
      longitude: "55.2708",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    ],
    sameAs: [
      site.facebook,
      site.instagram,
      site.linkedin,
    ].filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Printing & Signage Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Screen Printing",
            description: "Custom screen printing for apparel and merchandise",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "DTF Printing",
            description: "Direct-to-film printing for vibrant, detailed designs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "LED Signage",
            description: "Custom LED signs and illuminated displays",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Branding",
            description: "Vehicle wraps and decals for cars and vans",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Organization Schema
export function OrganizationJsonLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DOMAIN}#organization`,
    name: BRAND,
    url: DOMAIN,
    logo: `${DOMAIN}/logo.svg`,
    description: "SEHAM ADVERTISING - Leading printing and signage company in Dubai providing quality offset printing, screen printing, and signage services since 2014.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone ?? "+971569324947",
      contactType: "Customer Service",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      site.facebook,
      site.instagram,
      site.linkedin,
      site.twitter,
      site.youtube,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Website Schema
export function WebsiteJsonLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DOMAIN}#website`,
    url: DOMAIN,
    name: BRAND,
    description: "SEHAM ADVERTISING - Professional printing and signage services in Dubai",
    publisher: {
      "@id": `${DOMAIN}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${DOMAIN}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Breadcrumb Schema Helper
export function BreadcrumbJsonLD(items: { name: string; url: string }[]) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${DOMAIN}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

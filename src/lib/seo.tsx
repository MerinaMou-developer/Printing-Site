import type { Metadata } from "next";
import site from "@/content/site.json";

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://stamp-primeprint.com";
const BRAND = site.brand ?? "PrimePrint Dubai";

export const baseMetadata: Metadata = {
  metadataBase: DOMAIN ? new URL(DOMAIN) : undefined,
  title: {
    default: `${BRAND} — Custom Stamps, Printing & Signage in Dubai`,
    template: `%s | ${BRAND}`,
  },
  description:
    "PrimePrint Dubai - Dubai's #1 stamp maker. Custom stamps, self-inking stamps, date stamps, rubber stamps & company stamps. Also offset printing, screen printing, DTF, LED signs, vehicle branding & packaging. Same-day stamp orders, fast 1-5 day turnaround across Dubai.",
  keywords: [
    "PrimePrint Dubai",
    "Prime Print Dubai",
    "printing Dubai",
    "signage Dubai",
    "stamps Dubai",
    "stamp making Dubai",
    "stamp maker Dubai",
    "stamp shop Dubai",
    "stamps near me Dubai",
    "custom stamps Dubai",
    "rubber stamps Dubai",
    "self-ink stamps Dubai",
    "self inking stamps Dubai",
    "date stamps Dubai",
    "company stamp Dubai",
    "pocket stamps Dubai",
    "Trodat stamps Dubai",
    "Shiny stamps Dubai",
    "Colop stamps Dubai",
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
    "printing services UAE",
    "signage company Dubai",
    "best printing Dubai",
    "professional printing Dubai",
    "printing near me Dubai",
    "Deira Dubai printing",
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
    description: "PrimePrint Dubai - Dubai's trusted printing & signage partner. Fast turnaround, professional quality, competitive prices. Offset printing, screen printing, LED signs, vehicle branding & more.",
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
    description: "PrimePrint Dubai - Dubai's trusted printing & signage partner. Fast turnaround, professional quality.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-custom.svg", type: "image/svg+xml" },
      { url: "/favicon-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-custom.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon-custom.svg" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      'en-AE': '/',
      'en': '/',
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
    alternateName: "Prime Print Dubai",
    description: "PrimePrint Dubai - Dubai's leading stamp maker and printing company. Custom stamps, self-inking stamps, date stamps, rubber stamps, offset printing, screen printing, DTF, LED signs, vehicle branding, and more.",
    url: DOMAIN,
    telephone: site.phone ?? "+971569324947",
    email: site.email ?? "primeprintdubai@gmail.com",
    priceRange: "$$",
    image: `${DOMAIN}/favicon-custom.svg`,
    logo: `${DOMAIN}/favicon-custom.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "16B Naif Road, Naif",
      addressLocality: "Deira",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.2738",
      longitude: "55.3038",
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
            name: "Stamps",
            description: "Custom stamps, self-ink stamps, date stamps, and rubber stamps in Dubai",
          },
        },
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Offset Printing",
            description: "Business cards, brochures, flyers, and catalogs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vinyl Stickers",
            description: "Custom vinyl stickers, reflective stickers, and glass stickers",
          },
        },
      ],
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
    description: "PrimePrint Dubai - Leading stamp maker and printing company in Dubai providing custom stamps, self-inking stamps, date stamps, offset printing, screen printing, and signage services.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16B Naif Road, Naif",
      addressLocality: "Deira",
      addressRegion: "Dubai",
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
    description: "PrimePrint Dubai - Custom stamps, self-inking stamps, date stamps & printing services in Dubai",
    publisher: {
      "@id": `${DOMAIN}#organization`,
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
export function BreadcrumbJsonLD({ items }: { items: { name: string; url: string }[] | undefined }) {
  // Safety check: ensure items is an array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

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

// Service Schema Helper
export function ServiceJsonLD({ service }: {
  service: {
    name: string;
    description: string;
    slug: string;
    category: string;
    provider?: string;
    areaServed?: string;
    serviceType?: string;
  };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${DOMAIN}/services/${service.slug}#service`,
    name: `${service.name} Dubai`,
    description: service.description,
    provider: {
      "@id": `${DOMAIN}#organization`,
    },
    serviceType: service.serviceType || service.category,
    areaServed: {
      "@type": "City",
      name: service.areaServed || "Dubai",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${DOMAIN}/services/${service.slug}`,
      servicePhone: site.phone ?? "+971569324947",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${DOMAIN}/services/${service.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Product Schema Helper
export function ProductJsonLD({ product }: {
  product: {
    name: string;
    description: string;
    slug: string;
    image?: string;
    brand?: string;
  };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${DOMAIN}/products/${product.slug}#product`,
    name: `${product.name} Dubai`,
    description: product.description,
    image: product.image ? `${DOMAIN}${product.image}` : `${DOMAIN}/images/products/${product.slug}.jpg`,
    brand: {
      "@type": "Brand",
      name: product.brand || BRAND,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${DOMAIN}/products/${product.slug}`,
      seller: {
        "@id": `${DOMAIN}#organization`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// FAQ Schema Helper
export function FAQJsonLD({ faqs }: { faqs: { question: string; answer: string }[] | undefined }) {
  // Safety check: ensure faqs is an array
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

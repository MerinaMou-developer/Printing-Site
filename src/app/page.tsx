import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import productsData from "@/content/products.json";
import { baseMetadata } from "@/lib/seo";
import type { Product } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

const products = productsData as Product[];

export const metadata: Metadata = {
  ...baseMetadata,
  title:
    "PrimePrint Dubai - Premium Stamps, Printing & Signage Services in Dubai",
  description:
    "PrimePrint Dubai - Dubai's leading printing & signage company specializing in stamps, offset printing, screen printing, DTF, LED signs, vehicle branding, neon signs, business cards, vinyl stickers, and custom packaging. Fast 1-5 day turnaround, professional installation across Dubai. Get a free quote today!",
  keywords: [
    ...(baseMetadata.keywords as string[]),
    "stamps Dubai",
    "stamp making Dubai",
    "custom stamps Dubai",
    "rubber stamps Dubai",
    "self-ink stamps Dubai",
    "date stamps Dubai",
    "printing services Dubai",
    "signage company Dubai",
    "best printing Dubai",
    "professional printing Dubai",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "PrimePrint Dubai - Premium Stamps, Printing & Signage Services",
    description:
      "Dubai's leading printing & signage company. Stamps, offset printing, screen printing, DTF, LED signs, vehicle branding, and more. Fast turnaround, professional installation.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "PrimePrint Dubai - Premium Stamps, Printing & Signage Services",
    description:
      "Dubai's leading printing & signage company. Stamps, offset printing, screen printing, DTF, LED signs, vehicle branding, and more.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1) Hero */}
      <Hero />

      {/* 2) Stats & Trust Section */}
      {/* <StatsSection /> */}

      {/* 3) Services quick grid */}
      {/* <section className="wrapper py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
          <Link href="/services" className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--foreground)]">
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quick.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section> */}

      {/* How It Works */}
      {/* <ProcessSection /> */}

      {/* 6) Products with category filter */}
      <section className="wrapper pb-16 pt-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-brand-900)] md:text-3xl">
              Custom Stamps in Dubai
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-ink)] md:text-base">
              Self-inking, date, rubber &amp; pocket stamps — Trodat, Shiny &amp; Colop. Filter by category below.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--color-brand-700)] underline-offset-4 hover:text-[var(--color-accent-700)] hover:underline"
          >
            View all products
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ProductGrid products={products} />
      </section>

      {/* 3) Featured portfolio */}
      {/* <PortfolioTeaser /> */}

      {/* 4) Clients logos */}
      {/* <ClientsLogos /> */}

      {/* 5) Testimonials */}
      {/* <Testimonials /> */}
    </>
  );
}

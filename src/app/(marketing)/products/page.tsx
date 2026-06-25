import type { Metadata } from "next";
import productsData from "@/content/products.json";
import type { Product } from "@/types";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import site from "@/content/site.json";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { BreadcrumbJsonLD } from "@/lib/seo";

const products = productsData as Product[];

export const metadata: Metadata = {
  title: "Custom Stamps Dubai | Self-Ink, Date & Rubber Stamps | PrimePrint Dubai",
  description: "Buy custom stamps in Dubai — self-inking stamps, date stamps, rubber stamps, company stamps, pocket stamps & heavy-duty Trodat, Shiny & Colop stamps. Same-day service, free design, delivery across Dubai.",
  keywords: [
    "stamps Dubai",
    "stamp making Dubai",
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
    "stamp shop Dubai",
    "stamp maker Dubai",
    "stamps near me Dubai",
    "PrimePrint Dubai stamps",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Custom Stamps Dubai | Self-Ink, Date & Rubber Stamps | PrimePrint Dubai",
    description: "Custom stamps in Dubai — self-inking, date, rubber & company stamps. Same-day service, free design, delivery across Dubai.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");

  return (
    <>
      <BreadcrumbJsonLD items={[
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
      ]} />
      {/* Slim hero */}
      <section className="relative overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[var(--color-brand-50)] to-[var(--surface-2)]" />
        <div className="wrapper py-12 md:py-16 text-[var(--foreground)]">
          <h1 className="text-3xl font-bold text-[var(--color-brand-900)] md:text-5xl">
            Custom Stamps in Dubai
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--color-ink)]">
            Self-inking stamps, date stamps, rubber stamps, pocket stamps &amp; heavy-duty stamps — Trodat, Shiny &amp; Colop brands. Same-day orders, free design, delivery across Dubai.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get a Quote
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline border-[var(--color-brand-200)] hover:border-[var(--color-accent-500)] hover:bg-[var(--color-brand-50)]"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="wrapper py-10 md:py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

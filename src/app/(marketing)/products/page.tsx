import productsData from "@/content/products.json";
import type { Product } from "@/types";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import site from "@/content/site.json";
import { createWhatsAppLink } from "@/lib/whatsapp";

const products = productsData as Product[];

export default function ProductsPage() {
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");

  return (
    <>
      {/* Slim hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-brand-800)] via-[var(--color-brand-700)] to-[var(--color-brand-600)]" />
        <div className="wrapper py-12 md:py-16 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Products</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Branded merchandise and promo items with fast production and reliable delivery across Dubai.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="wrapper py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.slug}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

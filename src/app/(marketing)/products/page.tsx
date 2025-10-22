import productsData from "@/content/products.json";
import type { Product } from "@/types";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import site from "@/content/site.json";

const products = productsData as Product[];

export default function ProductsPage() {
  const digits = String(site.whatsapp ?? site.phone ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits}` : undefined;

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
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                WhatsApp us
              </a>
            )}
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

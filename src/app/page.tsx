import Link from "next/link";
import productsData from "@/content/products.json";
import type { Product } from "@/types";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";

const products = productsData as Product[];

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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Products</h2>
          <Link href="/products" className="text-sm font-medium text-[var(--color-ink)]/80 hover:text-[var(--foreground)]">
            View all →
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
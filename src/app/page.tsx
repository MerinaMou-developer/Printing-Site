import Link from "next/link";
import servicesData from "@/content/services.json";
import productsData from "@/content/products.json";
import type { Service, Product } from "@/types";
import ServiceCard from "@/components/service-card";
import Hero from "@/components/hero";
import PortfolioTeaser from "@/components/portfolio-teaser";
import Testimonials from "@/components/testimonials";
import StatsSection from "@/components/stats-section";
import ProcessSection from "@/components/process-section";
import ProductGrid from "@/components/product-grid";

const services = servicesData as Service[];
const products = productsData as Product[];

export default function HomePage() {
  const quick = services.slice(0, 6);

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
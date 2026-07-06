import ProductDetailForm from "@/components/product-detail-form";
import productsData from "@/content/products.json";
import site from "@/content/site.json";
import { BreadcrumbJsonLD, ProductJsonLD } from "@/lib/seo";
import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Product = {
  slug: string;
  name: string;
  desc: string;
  img: string;
  category?: string;
};

const products = productsData as Product[];

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);
  if (!product) return { title: "Product Not Found" };

  const category = product.category ?? "Stamp";
  const isStamp = category.toLowerCase().includes("stamp");

  return {
    title: isStamp
      ? `${product.name} Stamp Dubai | PrimePrint Dubai`
      : `${product.name} Dubai | PrimePrint Dubai`,
    description: `${product.desc} — Order in Dubai via WhatsApp. PrimePrint Dubai, Deira.`,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);

  if (!product) {
    return (
      <div className="wrapper py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-[var(--color-accent-600)] hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const digits = String(site.whatsapp ?? site.phone ?? "").replace(/\D/g, "");
  const wa = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(`Hi! I want to order ${product.name}`)}`
    : undefined;
  const tel = digits ? `tel:+${digits}` : undefined;

  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <main>
      <BreadcrumbJsonLD items={breadcrumbs} />
      <ProductJsonLD
        product={{
          name: product.name,
          description: product.desc,
          slug: product.slug,
          image: product.img,
        }}
      />

      {/* Simple header */}
      <section className="bg-gradient-to-br from-[var(--color-brand-900)] to-[var(--color-brand-700)] text-white">
        <div className="wrapper py-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-white/85 max-w-2xl">{product.desc}</p>
        </div>
      </section>

      {/* Product + order form */}
      <section className="wrapper py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: product image */}
          <div className="space-y-4">
            <div className="card border-2 border-[var(--border)] p-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>

            <div className="card border border-[var(--border)] p-5 space-y-3">
              <h3 className="font-bold text-[var(--color-brand-700)]">Why order from us</h3>
              {[
                "Same-day stamp service available",
                "Free design proof before printing",
                "Trodat, Shiny & Colop brands",
                "Located in Deira, Dubai",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp directly
                </a>
              )}
              {tel && (
                <a href={tel} className="btn btn-outline flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              )}
            </div>
          </div>

          {/* Right: order form */}
          <div className="card border-2 border-[var(--border)] p-6 md:p-8">
            <h2 className="text-xl font-bold mb-1 text-[var(--color-brand-700)]">
              Order This Stamp
            </h2>
            <p className="text-sm text-[var(--color-ink)]/70 mb-6">
              Fill details, upload documents, then order on WhatsApp.
            </p>
            <ProductDetailForm product={product} />
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-[var(--surface-2)] py-12 border-t border-[var(--border)]">
          <div className="wrapper">
            <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-700)]">
              More Stamps
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="card border border-[var(--border)] p-4 hover:border-[var(--color-accent-400)] transition-colors flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={related.img}
                      alt={related.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="font-medium text-sm text-[var(--color-brand-700)]">
                    {related.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

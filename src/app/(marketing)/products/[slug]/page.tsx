import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star, ShoppingCart, MessageCircle, Phone } from "lucide-react";
import productsData from "@/content/products.json";
import site from "@/content/site.json";

type Product = {
  slug: string;
  name: string;
  desc: string;
  img: string;
};

const products = productsData as Product[];

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} Dubai | SEHAM ADVERTISING - Custom ${product.name} Printing`,
    description: `${product.desc} - Professional ${product.name} printing and customization by SEHAM ADVERTISING in Dubai. Fast turnaround, competitive prices, premium quality. Get a free quote today!`,
    keywords: [
      `${product.name} Dubai`,
      `${product.name} UAE`,
      `custom ${product.name} printing Dubai`,
      `${product.name} printing Dubai`,
      `SEHAM ADVERTISING ${product.name}`,
      `professional ${product.name} Dubai`,
    ],
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);

  if (!product) {
    return (
      <div className="wrapper py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)]">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const digits = String(site.whatsapp ?? site.phone ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits}` : undefined;
  const tel = digits ? `tel:+${digits}` : undefined;

  // Related products (excluding current)
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="wrapper py-16 text-white">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold mb-4">
                <ShoppingCart className="h-4 w-4" />
                Custom Products
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Custom {product.name}
              </h1>

              <p className="text-lg text-white/90 leading-relaxed mb-8">
                {product.desc} - Professional printing and customization services by SEHAM ADVERTISING in Dubai.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary text-lg px-8 py-4 animate-pulse-glow shadow-xl">
                  Get Free Quote
                </Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn glass text-white text-lg px-8 py-4 hover:bg-white/15">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-2xl px-6 py-4 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-[var(--color-accent-400)]" />
                  <div>
                    <div className="text-2xl font-bold">Premium</div>
                    <div className="text-sm text-white/80">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="wrapper py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Features */}
            <div className="card border-2 border-[var(--border)] p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-brand-700)]">Product Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[var(--color-brand-600)]">Customization Options</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Full color printing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Logo and text customization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Various sizes available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Premium materials</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[var(--color-brand-600)]">Why Choose Us</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Fast 1-5 day turnaround</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Competitive pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Free design consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--color-ink)]/80">Quality guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="card border-2 border-[var(--border)] p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-brand-700)]">Specifications</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-brand-100)]">
                      <th className="border border-[var(--border)] p-3 text-left font-semibold text-[var(--color-brand-700)]">Specification</th>
                      <th className="border border-[var(--border)] p-3 text-left font-semibold text-[var(--color-brand-700)]">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[var(--border)] p-3 font-medium">Material</td>
                      <td className="border border-[var(--border)] p-3">Premium quality materials</td>
                    </tr>
                    <tr className="bg-[var(--surface-2)]">
                      <td className="border border-[var(--border)] p-3 font-medium">Printing Method</td>
                      <td className="border border-[var(--border)] p-3">Screen printing, DTF, or digital printing</td>
                    </tr>
                    <tr>
                      <td className="border border-[var(--border)] p-3 font-medium">Minimum Order</td>
                      <td className="border border-[var(--border)] p-3">10 pieces (varies by product)</td>
                    </tr>
                    <tr className="bg-[var(--surface-2)]">
                      <td className="border border-[var(--border)] p-3 font-medium">Turnaround Time</td>
                      <td className="border border-[var(--border)] p-3">1-5 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-[var(--border)] p-3 font-medium">Colors</td>
                      <td className="border border-[var(--border)] p-3">Full color printing available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gallery */}
            <div className="card border-2 border-[var(--border)] p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-brand-700)]">Product Gallery</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className="relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] flex items-center justify-center">
                      <span className="text-[var(--color-brand-600)] font-semibold text-sm">Sample {num}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="card border-2 border-[var(--border)] p-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-center text-[var(--color-brand-700)]">{product.name}</h3>
            </div>

            {/* Pricing Info */}
            <div className="card border-2 border-[var(--border)] p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)]">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--color-accent-50)] border border-[var(--color-accent-200)]">
                  <span className="font-medium text-[var(--color-brand-700)]">10-50 pieces</span>
                  <span className="text-[var(--color-accent-600)] font-bold">AED 25-35</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--color-accent-50)] border border-[var(--color-accent-200)]">
                  <span className="font-medium text-[var(--color-brand-700)]">50-100 pieces</span>
                  <span className="text-[var(--color-accent-600)] font-bold">AED 20-30</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-[var(--color-accent-50)] border border-[var(--color-accent-200)]">
                  <span className="font-medium text-[var(--color-brand-700)]">100+ pieces</span>
                  <span className="text-[var(--color-accent-600)] font-bold">AED 15-25</span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-ink)]/60 mt-3 text-center">
                *Prices vary based on design complexity and materials
              </p>
            </div>

            {/* Key Benefits */}
            <div className="card border-2 border-[var(--border)] p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)]">Key Benefits</h3>
              <div className="space-y-3">
                {[
                  "Premium quality materials",
                  "Fast turnaround time",
                  "Competitive pricing",
                  "Free design consultation",
                  "Professional printing",
                  "Quality guarantee"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-50)] to-[var(--color-accent-100)] border border-[var(--color-accent-200)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-600)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--color-brand-700)]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="card border-2 border-[var(--color-accent-400)] bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)] p-6">
              <h3 className="text-xl font-bold mb-3 text-[var(--color-brand-700)]">Ready to Order?</h3>
              <p className="text-sm text-[var(--color-ink)]/80 mb-4">
                Get a free quote for custom {product.name.toLowerCase()}
              </p>
              <div className="space-y-2">
                <Link href="/contact" className="btn btn-primary w-full text-center">
                  Get Free Quote
                </Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full text-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                )}
                {tel && (
                  <a href={tel} className="btn btn-outline w-full text-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-[var(--surface-2)] py-16">
          <div className="wrapper">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Products</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group block overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-400)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={related.img}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink)]/70 line-clamp-2 mb-3">
                      {related.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-500)] group-hover:gap-2.5 transition-all">
                      View product
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="wrapper pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] p-12 md:p-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Customize Your {product.name}?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Get a free quote and let us create something amazing for you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
                Get Free Quote
              </Link>
              <Link href="/products" className="btn glass text-white text-lg px-8 py-4">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Printing & Signage Tips | Dubai",
  description: "Expert guides on printing, signage, and branding in Dubai. Learn about DTF vs screen print, LED vs neon signs, vehicle branding, and more.",
  alternates: { canonical: "/blog" },
};

const blogPosts = [
  {
    slug: "dtf-vs-screen-printing-dubai",
    title: "DTF vs Screen Printing: Which is Best for Your Business in Dubai?",
    excerpt: "Confused between DTF and screen printing? Learn the pros, cons, costs, and best use cases for each method.",
    date: "2024-10-10",
    readTime: "5 min read",
    category: "Printing Guide",
    image: "/images/products/tshirt.jpg",
  },
  {
    slug: "led-vs-neon-signs-dubai",
    title: "LED vs Traditional Neon Signs: A Complete Comparison for Dubai Businesses",
    excerpt: "Discover which signage option is more cost-effective, durable, and energy-efficient for your Dubai storefront.",
    date: "2024-10-08",
    readTime: "6 min read",
    category: "Signage",
    image: "/images/services/placeholder.svg",
  },
  {
    slug: "vehicle-branding-guide-dubai",
    title: "The Ultimate Vehicle Branding Guide for Dubai Businesses",
    excerpt: "Everything you need to know about vehicle wraps, partial branding, materials, costs, and regulations in Dubai.",
    date: "2024-10-05",
    readTime: "8 min read",
    category: "Branding",
    image: "/images/services/placeholder.svg",
  },
  {
    slug: "choosing-right-printing-method",
    title: "How to Choose the Right Printing Method for Your Project",
    excerpt: "A comprehensive guide to offset, digital, and screen printing - when to use each method and why.",
    date: "2024-10-01",
    readTime: "7 min read",
    category: "Printing Guide",
    image: "/images/products/mug.jpg",
  },
  {
    slug: "custom-packaging-boxes-dubai",
    title: "Custom Packaging Boxes: Boost Your Brand with Premium Packaging",
    excerpt: "Learn how custom gift boxes and packaging can elevate your brand and increase customer loyalty in Dubai.",
    date: "2024-09-28",
    readTime: "5 min read",
    category: "Packaging",
    image: "/images/products/giftbox.jpg",
  },
  {
    slug: "business-card-design-tips",
    title: "10 Business Card Design Tips That Make You Stand Out in Dubai",
    excerpt: "Professional tips for creating memorable business cards that leave a lasting impression.",
    date: "2024-09-25",
    readTime: "6 min read",
    category: "Design Tips",
    image: "/images/services/placeholder.svg",
  },
];

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="wrapper py-16 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold">
              Blog
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
              Expert <span className="bg-gradient-to-r from-[var(--color-accent-300)] to-white bg-clip-text text-transparent">Printing & Signage</span> Insights
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed">
              Guides, comparisons, and tips to help you make the best decisions for your printing and signage needs in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="wrapper py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-400)]"
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-[var(--color-brand-600)] shadow-lg backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[var(--color-ink)]/60 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-bold text-xl mb-3 text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[var(--color-ink)]/70 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-600)] group-hover:gap-2.5 transition-all"
                >
                  Read full article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="wrapper pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] p-12 md:p-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert Advice?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our team is here to help you choose the right printing or signage solution for your business
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="btn btn-primary text-lg px-8 py-4">
                Get Free Consultation
              </a>
              <Link href="/services" className="btn glass text-white text-lg px-8 py-4">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


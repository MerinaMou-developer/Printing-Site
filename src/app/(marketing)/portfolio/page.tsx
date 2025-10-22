"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

// Note: Can't export metadata from client component, would need to split into layout + page
// export const metadata: Metadata = {
//   title: "Portfolio | Our Work in Dubai",
//   description: "Explore our latest signage, printing, and branding projects across Dubai",
// };

type PortfolioItem = {
  slug: string;
  title: string;
  image: string;
  tags: string[];
  category: string;
  description: string;
};

const items = portfolioData as PortfolioItem[];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-accent-500)]/10 blur-3xl animate-float" />
        </div>
        <div className="wrapper py-16 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold animate-fade-in-up">
              Our Work
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Portfolio of <span className="bg-gradient-to-r from-[var(--color-accent-300)] to-white bg-clip-text text-transparent">Excellence</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Explore our latest signage, vehicle branding, and printing projects delivered across Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className="wrapper py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-[var(--color-brand-700)]">{items.length}+</div>
              <div className="text-sm text-[var(--color-ink)]/70 mt-1">Featured Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--color-brand-700)]">500+</div>
              <div className="text-sm text-[var(--color-ink)]/70 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--color-brand-700)]">100%</div>
              <div className="text-sm text-[var(--color-ink)]/70 mt-1">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--color-brand-700)]">10+</div>
              <div className="text-sm text-[var(--color-ink)]/70 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Portfolio Grid */}
      <section className="wrapper py-12 md:py-16">
        {/* Filter Buttons */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-[var(--color-ink)]/60" />
            <span className="text-sm font-semibold text-[var(--color-ink)]/60 uppercase tracking-wider">
              Filter by Category
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-[var(--color-accent-500)] text-white shadow-lg scale-105"
                    : "bg-white border-2 border-[var(--border)] text-[var(--color-ink)] hover:border-[var(--color-accent-400)] hover:shadow-md"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-[var(--color-ink)]/60">
            Showing <span className="font-semibold text-[var(--color-accent-600)]">{filteredItems.length}</span> {filteredItems.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group relative block overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--color-accent-400)] stagger-item"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Tags - Always Visible */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-[var(--color-brand-600)] shadow-lg backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Title on hover */}
                  <h3 className="text-white font-bold text-sm md:text-base transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* View Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-[var(--color-brand-700)] font-semibold text-sm shadow-xl">
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="font-bold text-lg text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] transition-colors line-clamp-2">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-ink)]/70 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-500)] group-hover:gap-2.5 transition-all">
                  View details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--surface-2)] mb-4">
              <Filter className="h-8 w-8 text-[var(--color-ink)]/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-[var(--color-ink)]/70">Try selecting a different category</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="wrapper pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] p-12 md:p-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Join hundreds of satisfied clients. Get a free quote and mockup today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="btn btn-primary text-lg px-8 py-4 animate-pulse-glow">
                Get Free Quote
              </a>
              <Link href="/services" className="btn glass text-white text-lg px-8 py-4">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

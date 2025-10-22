import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

export default function PortfolioTeaser() {
  const featuredItems = portfolioData.slice(0, 3);

  return (
    <section className="wrapper py-16 md:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Work</h2>
          <p className="mt-2 text-[var(--color-ink)]/70">Showcasing our best projects in Dubai</p>
        </div>
        <Link 
          href="/portfolio" 
          className="group flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-colors"
        >
          View all work
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className="group relative block overflow-hidden rounded-2xl bg-[var(--surface-2)]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Tags */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-[var(--color-brand-600)] shadow-lg backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-4 py-2 rounded-full bg-white/90 text-sm font-medium shadow-lg backdrop-blur-sm">
                View Project →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
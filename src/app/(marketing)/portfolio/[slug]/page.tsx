import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag, ArrowRight, CheckCircle2 } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

type PortfolioItem = {
  slug: string;
  title: string;
  image: string;
  tags: string[];
  category: string;
  description: string;
};

const items = portfolioData as PortfolioItem[];

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = items.find((x) => x.slug === slug);
  if (!item) return { title: "Project Not Found" };
  
  return {
    title: `${item.title} | PrintPro Dubai Portfolio`,
    description: `${item.description} - Professional ${item.category} services by PrintPro Dubai in Dubai.`,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = items.find((x) => x.slug === slug);

  if (!item) {
    return (
      <div className="wrapper py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Link href="/portfolio" className="text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)]">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  // Related projects (same category, excluding current)
  const relatedProjects = items
    .filter((project) => project.category === item.category && project.slug !== item.slug)
    .slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-900)]/95 to-[var(--color-brand-800)]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="wrapper py-20 md:py-24 text-white">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-accent-500)] text-white text-sm font-semibold mb-4">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {item.title}
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl">
              {item.description}
            </p>

            {/* Project Tags */}
            <div className="flex flex-wrap gap-3">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="wrapper py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[var(--border)] shadow-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Additional Images Grid */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] flex items-center justify-center">
                    <span className="text-[var(--color-brand-600)] font-semibold text-sm">Image {num}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Project Info Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="card border-2 border-[var(--border)] p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)]">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <div>
                    <div className="text-sm text-[var(--color-ink)]/60">Completion Date</div>
                    <div className="font-semibold">December 2024</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <div>
                    <div className="text-sm text-[var(--color-ink)]/60">Location</div>
                    <div className="font-semibold">Dubai, UAE</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <div>
                    <div className="text-sm text-[var(--color-ink)]/60">Category</div>
                    <div className="font-semibold capitalize">{item.category}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Highlights */}
            <div className="card border-2 border-[var(--border)] p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)]">Project Highlights</h3>
              
              <ul className="space-y-3">
                {[
                  "Custom design and production",
                  "High-quality materials used",
                  "Professional installation",
                  "Client satisfaction guaranteed",
                  "Fast turnaround time",
                  "Competitive pricing"
                ].map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--color-ink)]/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="card border-2 border-[var(--color-accent-400)] bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)] p-6">
              <h3 className="text-xl font-bold mb-3 text-[var(--color-brand-700)]">Ready to Start Your Project?</h3>
              <p className="text-sm text-[var(--color-ink)]/80 mb-4">
                Get a free quote for similar work
              </p>
              <div className="space-y-2">
                <Link href="/contact" className="btn btn-primary w-full text-center">
                  Get Free Quote
                </Link>
                <Link href="/services" className="btn btn-outline w-full text-center">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="bg-[var(--surface-2)] py-16">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About This Project</h2>
            
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[var(--color-brand-700)]
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-[var(--color-ink)]/80 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-4 prose-li:text-[var(--color-ink)]/80 prose-li:mb-2
              prose-strong:text-[var(--color-brand-700)] prose-strong:font-semibold
            ">
              <p>
                This project showcases our expertise in {item.category} services, delivering exceptional quality 
                and attention to detail that our clients have come to expect from PrintPro Dubai.
              </p>
              
              <h3>What We Delivered</h3>
              <ul>
                <li>Custom design and consultation</li>
                <li>Premium materials and printing techniques</li>
                <li>Professional installation and setup</li>
                <li>Quality assurance and testing</li>
                <li>Ongoing support and maintenance</li>
              </ul>
              
              <h3>Client Results</h3>
              <p>
                Our client was extremely satisfied with the final result, praising our attention to detail, 
                professional service, and competitive pricing. The project was completed on time and exceeded expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="wrapper py-16">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-400)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-[var(--color-brand-600)] shadow-lg backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-ink)]/70 line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-500)] group-hover:gap-2.5 transition-all">
                    View project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Love What You See?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your project and create something amazing together
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
                Start Your Project
              </Link>
              <Link href="/portfolio" className="btn glass text-white text-lg px-8 py-4">
                View More Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
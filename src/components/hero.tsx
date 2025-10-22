// src/components/hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import site from "@/content/site.json";

export default function Hero() {
  
 
  const brand = site.brand ?? "Al Arqa Printing & Signage";

  return (
    <section className="relative overflow-hidden min-h-[75vh] max-h-[85vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
        <Image src="/images/hero-gradient.svg" alt="" fill priority className="object-cover opacity-50 mix-blend-overlay" />
        {/* soft light blobs + sheen */}
        <div className="absolute inset-0 hero-sheen" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-accent-500)]/10 blur-3xl animate-float" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-[var(--color-accent-400)]/5 blur-3xl" />
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="wrapper py-20 md:py-28 text-white">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold animate-fade-in-up">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-400)] animate-pulse"></span>
            Printing & Signage in Dubai
          </span>

            <h1 className="mt-6 max-w-3xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="block">{brand}</span>
              <span className="block mt-2 bg-gradient-to-r from-white via-[var(--color-accent-200)] to-white bg-clip-text text-transparent">
                {site.tagline ?? "Premium Printing & Signage Solutions in Dubai"}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Offset, Screen & DTF Printing, LED Signage, Vehicle Branding, Packaging — Professional quality with fast turnaround across Dubai.
            </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap gap-3 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Link href="/contact" className="btn btn-primary ring-focus text-base px-6 py-3 animate-pulse-glow shadow-xl hover:shadow-2xl">
              Get Free Quote
            </Link>
            <Link href="/services" className="btn glass text-white ring-focus text-base px-6 py-3 hover:bg-white/15">
              View Services
            </Link>
          </div>

          {/* Quick value props (what clients care about)
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-white/90">
            <li className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-all stagger-item">
              <CheckCircle2 className="h-6 w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium">1–5 day turnaround</span>
            </li>
            <li className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-all stagger-item">
              <CheckCircle2 className="h-6 w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium">Free design mockup</span>
            </li>
            <li className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-all stagger-item">
              <CheckCircle2 className="h-6 w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium">Installation & delivery</span>
            </li>
            <li className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/10 transition-all stagger-item">
              <CheckCircle2 className="h-6 w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium">24/7 WhatsApp support</span>
            </li>
          </ul> */}
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute left-1/2 bottom-4 hidden md:block -translate-x-1/2 text-white/70">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}

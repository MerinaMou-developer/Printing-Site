// src/components/hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Zap, Palette, Truck, Headphones } from "lucide-react";
import site from "@/content/site.json";

export default function Hero() {
  const brand = site.brand ?? "Al Arqa Printing & Signage";

  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
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

      {/* Content - Centered with optimal spacing for full viewport */}
      <div className="wrapper w-full text-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Badge - Centered */}
          <div className="flex justify-center animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-1.5 text-xs uppercase tracking-wider font-semibold backdrop-blur-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-400)] animate-pulse"></span>
              Printing & Signage in Dubai
            </span>
          </div>

          {/* Main Heading - Centered with refined sizing */}
          <h1 className="mt-4 md:mt-6 text-center text-3xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="block">{brand}</span>
            <span className="block mt-2 md:mt-3 bg-gradient-to-r from-white via-[var(--color-accent-200)] to-white bg-clip-text text-transparent">
              {site.tagline ?? "Premium Printing & Signage Solutions in Dubai"}
            </span>
          </h1>

          {/* Description - Centered with max-width for readability */}
          <p className="mt-4 md:mt-5 mx-auto max-w-2xl text-center text-sm md:text-base lg:text-lg text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Offset, Screen & DTF Printing, LED Signage, Vehicle Branding, Packaging — Professional quality with fast turnaround across Dubai.
          </p>

          {/* CTAs - Centered with better spacing */}
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Link href="/contact" className="btn btn-primary ring-focus text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 animate-pulse-glow shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              Get Free Quote
            </Link>
            <Link href="/services" className="btn glass text-white ring-focus text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 hover:bg-white/15 backdrop-blur-sm transform hover:scale-105 transition-all">
              View Services
            </Link>
          </div>

          {/* Value Props - Compact grid with icons */}
          <ul className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-white/90 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <li className="flex flex-col items-center gap-2 glass rounded-xl px-3 md:px-4 py-3 md:py-4 hover:bg-white/10 transition-all text-center backdrop-blur-sm hover:scale-105 transform">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium text-xs md:text-sm">Fast Turnaround</span>
            </li>
            <li className="flex flex-col items-center gap-2 glass rounded-xl px-3 md:px-4 py-3 md:py-4 hover:bg-white/10 transition-all text-center backdrop-blur-sm hover:scale-105 transform">
              <Palette className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium text-xs md:text-sm">Free Mockup</span>
            </li>
            <li className="flex flex-col items-center gap-2 glass rounded-xl px-3 md:px-4 py-3 md:py-4 hover:bg-white/10 transition-all text-center backdrop-blur-sm hover:scale-105 transform">
              <Truck className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium text-xs md:text-sm">Installation</span>
            </li>
            <li className="flex flex-col items-center gap-2 glass rounded-xl px-3 md:px-4 py-3 md:py-4 hover:bg-white/10 transition-all text-center backdrop-blur-sm hover:scale-105 transform">
              <Headphones className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent-400)] flex-shrink-0" />
              <span className="font-medium text-xs md:text-sm">24/7 Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute left-1/2 bottom-6 md:bottom-8 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
      </div>
    </section>
  );
}

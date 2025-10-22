import type { Metadata } from "next";
import site from "@/content/site.json";
import { Award, Zap, Users, Factory, Truck, HeadphonesIcon, Target, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: `About ${site.brand ?? "Our Company"} - Leading Printing & Signage in Dubai`,
  description:
    "We design and produce signage, printing, apparel and packaging in Dubai—fast turnaround with installation and delivery. 10+ years of excellence.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const brand = site.brand ?? "Al Arqa Printing & Signage";
  const years = 10;

  const capabilities = [
    "LED & Neon Signage",
    "3D Acrylic Letters",
    "Vehicle Branding",
    "Vinyl/Flex Banners",
    "DTF & Screen Printing",
    "Embroidery & Sublimation",
    "Stickers & Labels",
    "Business Cards & Brochures",
    "Gift Boxes & Packaging",
    "Custom Stamps",
    "Exhibition Work",
    "Metal Laser Cutting",
  ];

  const whyUs = [
    { icon: Zap, title: "Fast Turnaround", desc: "1–5 day delivery with reliable installation across Dubai" },
    { icon: Factory, title: "In-House Production", desc: "Complete quality control and predictable costs" },
    { icon: Users, title: "Design Support", desc: "Free mockups and print-ready file assistance" },
    { icon: Truck, title: "Installation & Delivery", desc: "Professional setup at your location" },
    { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always available via WhatsApp for your convenience" },
    { icon: Award, title: "Quality Guarantee", desc: "100% satisfaction with after-sales support" },
  ];

  const values = [
    { icon: Target, title: "Customer-First", desc: "Your success is our priority" },
    { icon: Shield, title: "Quality Commitment", desc: "Never compromise on excellence" },
    { icon: Heart, title: "Passion for Craft", desc: "We love what we do" },
  ];

  const stats = [
    { k: `${years}+`, v: "Years in operation" },
    { k: "500+", v: "Happy clients" },
    { k: "2000+", v: "Projects delivered" },
    { k: "24/7", v: "WhatsApp support" },
  ];

  const process = [
    { t: "1 · Discuss", d: "Share your idea, size, materials & deadline.", icon: Users },
    { t: "2 · Design", d: "We finalize artwork & specs for approval.", icon: Target },
    { t: "3 · Produce", d: "We print/finish in-house with QC checks.", icon: Factory },
    { t: "4 · Deliver", d: "Pickup, delivery or on-site installation.", icon: Truck },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-accent-500)]/10 blur-3xl animate-float" />
        </div>
        <div className="wrapper py-20 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold animate-fade-in-up">
              About Us
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {brand} — Your printing & signage partner in <span className="bg-gradient-to-r from-[var(--color-accent-300)] to-white bg-clip-text text-transparent">Dubai</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              From LED signboards and 3D letters to DTF/screen prints, brochures, stickers,
              gift boxes and more. We handle design, production, and installation under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className="wrapper py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.v} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] transition-colors">{s.k}</div>
                <div className="text-sm text-[var(--color-ink)]/70 mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="wrapper py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-100)] px-4 py-1.5 text-sm font-medium text-[var(--color-accent-700)]">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">What Sets Us Apart</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group card card-hover">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="h-7 w-7 text-[var(--color-brand-600)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/70 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities & Values */}
      <section className="bg-[var(--surface-2)] py-16">
        <div className="wrapper">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Capabilities */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Capabilities</h2>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-[var(--border)] p-4 bg-white hover:border-[var(--color-accent-400)] hover:shadow-md transition-all duration-300 stagger-item"
                  >
                    <span className="text-sm font-medium">{x}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
              <div className="space-y-4">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-[var(--border)] hover-lift">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)]">
                          <Icon className="h-6 w-6 text-[var(--color-accent-700)]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{value.title}</h3>
                          <p className="text-sm text-[var(--color-ink)]/70">{value.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="wrapper py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-100)] px-4 py-1.5 text-sm font-medium text-[var(--color-brand-700)]">
            Our Process
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">How We Work</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((x, idx) => {
            const Icon = x.icon;
            return (
              <div key={x.t} className="relative group">
                {/* Connector line */}
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--color-accent-300)] to-transparent" />
                )}
                
                <div className="relative rounded-2xl border-2 border-[var(--border)] p-6 bg-white hover:border-[var(--color-accent-400)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] mb-4">
                    <Icon className="h-7 w-7 text-[var(--color-brand-600)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{x.t}</h3>
                  <p className="text-sm text-[var(--color-ink)]/70 leading-relaxed">{x.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="wrapper pb-16">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center text-white bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] gradient-animate shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h3>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Send your requirements and we&apos;ll reply with pricing & timeline within hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="btn btn-primary text-lg px-8 py-4 animate-pulse-glow"
              >
                Get a Free Quote
              </a>
              <a
                href={`https://wa.me/${String(site.whatsapp ?? site.phone ?? "+971569324947").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn glass text-white text-lg px-8 py-4"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

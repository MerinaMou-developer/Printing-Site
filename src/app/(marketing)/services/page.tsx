import type { Metadata } from "next";
import servicesData from "@/content/services.json";
import type { Service } from "@/types";
import ServiceCard from "@/components/service-card";
import site from "@/content/site.json";
import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { BreadcrumbJsonLD } from "@/lib/seo";

const services = servicesData as Service[];

export const metadata: Metadata = {
  title: "Printing & Signage Services Dubai | PrimePrint Dubai",
  description: "Comprehensive printing and signage services in Dubai: stamps, screen printing, DTF, LED signs, vehicle branding, offset printing, vinyl stickers, banners, business cards, packaging, and more. Professional quality, fast turnaround.",
  keywords: [
    "printing services Dubai",
    "signage services Dubai",
    "stamps Dubai",
    "screen printing Dubai",
    "DTF printing Dubai",
    "LED signs Dubai",
    "vehicle branding Dubai",
    "offset printing Dubai",
    "vinyl stickers Dubai",
    "banners Dubai",
    "business cards Dubai",
    "packaging Dubai",
    "PrimePrint Dubai services",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Printing & Signage Services Dubai | PrimePrint Dubai",
    description: "Comprehensive printing and signage services in Dubai. Professional quality, fast turnaround, competitive prices.",
    url: "/services",
  },
};

export default function ServicesIndex() {
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");

  return (
    <>
      <BreadcrumbJsonLD items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]} />
      {/* Slim hero for Services */}
      <section className="relative overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[var(--color-brand-50)] to-[var(--surface-2)]" />
        <div className="wrapper py-12 md:py-16 text-[var(--foreground)]">
          <h1 className="text-3xl font-bold text-[var(--color-brand-900)] md:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl text-[var(--color-ink)]">
            End-to-end production in Dubai: signage, screen/DTF printing, stickers,
            packaging, installation &amp; delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline border-[var(--color-brand-200)] hover:border-[var(--color-accent-500)] hover:bg-[var(--color-brand-50)]">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="wrapper py-12">
        <div className="space-y-12">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-xl md:text-2xl font-semibold">{cat}</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

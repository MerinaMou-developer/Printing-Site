import servicesData from "@/content/services.json";
import type { Service } from "@/types";
import ServiceCard from "@/components/service-card";
import site from "@/content/site.json";
import Link from "next/link";

const services = servicesData as Service[];

export default function ServicesIndex() {
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const digits = String(site.whatsapp ?? site.phone ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits}` : undefined;

  return (
    <>
      {/* Slim hero for Services */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-brand-800)] via-[var(--color-brand-700)] to-[var(--color-brand-600)]" />
        <div className="wrapper py-12 md:py-16 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Services</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            End-to-end production in Dubai: signage, screen/DTF printing, stickers,
            packaging, installation &amp; delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                WhatsApp us
              </a>
            )}
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

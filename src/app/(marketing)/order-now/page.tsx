import StampOrderForm from "@/components/stamp-order-form";
import site from "@/content/site.json";
import { BreadcrumbJsonLD } from "@/lib/seo";
import { Clock, MessageCircle, Phone, Stamp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

function waUrl(message: string) {
  const digits = (site.whatsapp ?? site.phone ?? "+971569324947").replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function telUrl() {
  const num = (site.phone ?? site.whatsapp ?? "+971569324947").replace(/[^\d+]/g, "");
  return `tel:${num}`;
}

function displayPhone() {
  const raw = site.phone ?? site.whatsapp ?? "+971569324947";
  const clean = raw.replace(/[^\d+]/g, "");
  if (clean.startsWith("+971") && clean.length === 13) {
    const n = clean.slice(4);
    return `+971 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
  }
  return clean;
}

export const metadata: Metadata = {
  title: "Order Stamps Online - Quick WhatsApp Order | PrimePrint Dubai",
  description:
    "Order custom stamps in Dubai in 1 minute. Company stamps, self-inking, date stamps & rubber stamps. Send order on WhatsApp — same-day service in Deira. PrimePrint Dubai.",
  keywords: [
    "order stamps Dubai",
    "buy stamps online Dubai",
    "company stamp order Dubai",
    "custom stamp order",
    "stamp shop Deira",
    "WhatsApp stamp order Dubai",
  ],
  alternates: { canonical: "/order-now" },
  openGraph: {
    title: "Order Stamps - Quick WhatsApp Order | PrimePrint Dubai",
    description:
      "Order custom stamps in Dubai via WhatsApp. Company, self-inking, date & rubber stamps. Same-day in Deira.",
    url: "/order-now",
  },
};

export default function OrderNowPage() {
  const waLink = waUrl("Hi! I want to order a stamp. Can you help me?");
  const telLink = telUrl();
  const phone = displayPhone();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Order Now", url: "/order-now" },
  ];

  return (
    <main>
      <BreadcrumbJsonLD items={breadcrumbs} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)]" />
        <div className="wrapper py-12 md:py-16 text-white">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
              <Stamp className="h-4 w-4" />
              Order in 1 minute
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold">
              Order Your Stamp Now
            </h1>
            <p className="mt-4 text-lg text-white/90 leading-relaxed">
              Fill the form below → WhatsApp opens with your order → send the message.
              We reply with price and ready time. Same-day stamps available in Deira.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-2 glass rounded-full px-4 py-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                WhatsApp order
              </span>
              <span className="flex items-center gap-2 glass rounded-full px-4 py-2">
                <Clock className="h-4 w-4" />
                Reply in minutes
              </span>
              <span className="flex items-center gap-2 glass rounded-full px-4 py-2">
                <Phone className="h-4 w-4" />
                {phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="card border-2 border-[var(--border)] p-6 md:p-8">
            <StampOrderForm />
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 hover:border-green-500/50 transition-colors text-center"
            >
              <MessageCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="font-semibold">Skip form — WhatsApp directly</p>
              <p className="text-sm text-[var(--color-ink)]/70 mt-1">
                Tap to chat without filling the form
              </p>
            </a>
            <a href={telLink} className="card p-5 hover:border-blue-500/50 transition-colors text-center">
              <Phone className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="font-semibold">Call us</p>
              <p className="text-sm text-[var(--color-ink)]/70 mt-1">{phone}</p>
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-ink)]/70">
            Need a general quote for printing or signage?{" "}
            <Link href="/contact" className="text-[var(--color-accent-600)] hover:underline">
              Contact page
            </Link>
            {" · "}
            <Link href="/products" className="text-[var(--color-accent-600)] hover:underline">
              Browse stamp products
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

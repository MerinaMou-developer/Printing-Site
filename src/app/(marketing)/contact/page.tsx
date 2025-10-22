import type { Metadata } from "next";
import site from "@/content/site.json";
import QuoteForm from "@/components/quote-form";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { createWhatsAppLink, createPhoneLink, formatPhoneNumber } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us - Get a Free Quote | Dubai Printing & Signage",
  description: "Get a quote, ask about materials, or book installation—contact our Dubai team. Fast response guaranteed. Call, WhatsApp, or email us today.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = site.email ?? "alarqauae@gmail.com";
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const displayPhone = formatPhoneNumber(site.phone ?? phoneNumber);
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");
  const telLink = createPhoneLink(phoneNumber);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: "Fastest for quotes & artwork handoff",
      action: "Message us",
      href: waLink,
      color: "from-green-500 to-emerald-600",
      primary: true,
    },
    {
      icon: Phone,
      title: "Phone",
      desc: "9:00–21:00, Sat–Thu",
      action: displayPhone,
      href: telLink,
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Mail,
      title: "Email",
      desc: "For POs, invoices, and design files",
      action: email,
      href: `mailto:${email}`,
      color: "from-purple-500 to-pink-600",
    },
  ];

  const quickInfo = [
    { icon: MapPin, label: "Location", value: "Dubai, U.A.E." },
    { icon: Clock, label: "Working Hours", value: "Sat-Thu, 9:00 AM - 9:00 PM" },
    { icon: MessageCircle, label: "WhatsApp", value: "24/7 Available" },
  ];

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
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-accent-500)]/10 blur-3xl animate-float" />
        </div>
        <div className="wrapper py-16 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold animate-fade-in-up">
              Get in Touch
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Let&apos;s Bring Your <span className="bg-gradient-to-r from-[var(--color-accent-300)] to-white bg-clip-text text-transparent">Vision to Life</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Get a free quote and design mockup. Our team responds within hours with pricing and timeline.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="wrapper py-12 -mt-8">
        <div className="grid gap-6 md:grid-cols-3">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-2xl bg-white border-2 ${method.primary ? 'border-[var(--color-accent-400)]' : 'border-[var(--border)]'} p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/70 mb-4">{method.desc}</p>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-2 ${method.primary ? 'btn btn-primary' : 'font-semibold text-[var(--color-brand-700)] hover:text-[var(--color-accent-600)]'} transition-colors`}
                >
                  {method.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-[var(--surface-2)] border-y border-[var(--border)] py-8">
        <div className="wrapper">
          <div className="grid md:grid-cols-3 gap-6">
            {quickInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)]">
                    <Icon className="h-6 w-6 text-[var(--color-brand-600)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-ink)]/60 uppercase tracking-wider font-semibold">{info.label}</div>
                    <div className="font-semibold text-[var(--color-brand-700)]">{info.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="wrapper py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Quote Form */}
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-100)] px-4 py-1.5 text-sm font-medium text-[var(--color-accent-700)]">
                Request a Quote
              </span>
              <h2 className="mt-4 text-3xl font-bold">Get Your Free Quote</h2>
              <p className="mt-2 text-[var(--color-ink)]/70">
                Fill out the form below or attach your artwork. We&apos;ll respond with pricing and timeline within hours.
              </p>
            </div>
            
            <div className="rounded-2xl border-2 border-[var(--border)] p-6 md:p-8 bg-white shadow-lg">
              <QuoteForm defaultService="general" />
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Fast Response</span>
                </div>
                <p className="text-sm text-[var(--color-ink)]/70">We typically respond within 2-4 hours during business hours</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Free Mockup</span>
                </div>
                <p className="text-sm text-[var(--color-ink)]/70">Get a free design mockup before you commit</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-lg hover:shadow-xl transition-shadow">
              <iframe
                title="SEHAM ADVERTISING Location - Dubai"
                className="w-full h-[400px]"
                src="https://www.google.com/maps?q=25.271983,55.3135949&hl=en&z=15&output=embed"
                loading="lazy"
                style={{ border: 0 }}
              />
              <div className="p-6 bg-white border-t border-[var(--border)]">
                <h3 className="font-bold text-xl mb-2">Visit Our Location</h3>
                <div className="flex items-start gap-2 text-[var(--color-ink)]/70">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-[var(--color-accent-600)]" />
                  <p className="leading-relaxed">
                    {site.address ?? "Dubai, U.A.E."}<br />
                    <span className="text-sm">Installation & delivery available across Dubai</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Additional CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-600)] p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Need Urgent Assistance?</h3>
              <p className="text-white/90 mb-6">
                Our team is available 24/7 on WhatsApp for urgent inquiries and rush orders.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn glass text-white hover:bg-white/20"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Now
                </a>
                <a 
                  href={telLink}
                  className="btn btn-light"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[var(--surface-2)] py-16">
        <div className="wrapper max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What's your typical turnaround time?", a: "Most orders are completed within 1-5 days. We also offer same-day rush service for urgent projects." },
              { q: "Do you provide installation?", a: "Yes! We offer professional installation across all of Dubai for signage, vehicle wraps, and other projects." },
              { q: "Can I get a sample before ordering?", a: "We provide free digital mockups for all projects. Physical samples may be available depending on the product." },
              { q: "What file formats do you accept?", a: "We accept AI, PDF, EPS, PSD, and high-resolution PNG/JPG files. Our team can also help with file preparation." },
            ].map((faq, idx) => (
              <details key={idx} className="group rounded-xl border-2 border-[var(--border)] bg-white p-5 hover:border-[var(--color-accent-400)] transition-colors">
                <summary className="font-bold cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-[var(--color-ink)]/70 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

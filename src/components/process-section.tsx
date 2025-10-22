// src/components/process-section.tsx
import { MessageSquare, FileCheck, Printer, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Get in Touch",
    description: "Contact us via WhatsApp, call, or quote form with your requirements",
  },
  {
    icon: FileCheck,
    title: "2. Design & Quote",
    description: "We'll provide a free mockup and competitive pricing within hours",
  },
  {
    icon: Printer,
    title: "3. Production",
    description: "Your order goes into production with quality checks at every stage",
  },
  {
    icon: Truck,
    title: "4. Delivery",
    description: "Fast delivery across Dubai with professional installation if needed",
  },
];

export default function ProcessSection() {
  return (
    <section className="wrapper py-16">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-100)] px-4 py-1.5 text-sm font-medium text-[var(--color-accent-700)]">
          How It Works
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">Simple & Hassle-Free Process</h2>
        <p className="mt-3 text-[var(--color-ink)]/70 max-w-2xl mx-auto">
          From concept to delivery, we make it easy to bring your vision to life
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative stagger-item">
              {/* Connector line (hidden on last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--color-accent-300)] to-transparent" />
              )}
              
              <div className="relative bg-white rounded-2xl p-6 border border-[var(--border)] hover-lift">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)] mb-4">
                  <Icon className="h-7 w-7 text-[var(--color-accent-700)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/70">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a 
          href="/contact" 
          className="btn btn-primary inline-flex items-center gap-2 animate-pulse-glow"
        >
          Start Your Project
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>
  );
}


import { Star, Quote } from "lucide-react";
import testimonialsData from "@/content/testimonials.json";

type Testimonial = {
  name: string;
  quote: string;
  role: string;
  rating?: number;
  location?: string;
};

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  return (
    <section className="wrapper py-16">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-100)] px-4 py-1.5 text-sm font-medium text-[var(--color-accent-700)]">
          Testimonials
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
        <p className="mt-3 text-[var(--color-ink)]/70 max-w-2xl mx-auto">
          Don&apos;t just take our word for it — hear from businesses we&apos;ve helped succeed
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure 
            key={i} 
            className="group card card-hover border-2 border-[var(--border)] hover:border-[var(--color-accent-400)] transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)] mb-4 group-hover:scale-110 transition-transform duration-300">
              <Quote className="h-6 w-6 text-[var(--color-accent-600)]" />
            </div>

            {/* Rating Stars */}
            {t.rating && (
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]" />
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-[var(--foreground)] leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author Info */}
            <figcaption className="pt-4 border-t border-[var(--border)]">
              <div className="font-semibold text-[var(--color-brand-700)]">{t.name}</div>
              <div className="text-sm text-[var(--color-ink)]/70">{t.role}</div>
              {t.location && (
                <div className="text-xs text-[var(--color-ink)]/60 mt-1">📍 {t.location}</div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--surface-2)] border border-[var(--border)]">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-white"></div>
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[var(--foreground)]">Trusted by 500+ businesses</div>
            <div className="text-xs text-[var(--color-ink)]/70">Join our growing family of satisfied clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}

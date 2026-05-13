import type { Service } from "@/types";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

type Props = { service: Service };

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)]/10 via-[var(--color-accent-500)]/5 to-transparent p-[1px] transition-all duration-300 hover:from-[var(--color-accent-500)]/30 hover:via-[var(--color-brand-600)]/20 hover:shadow-lg"
      aria-label={`View ${service.name}`}
    >
      <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-[var(--surface-2)] p-6 shadow-md shadow-slate-900/6 ring-1 ring-slate-900/[0.03] transition-all duration-300 group-hover:border-[var(--color-accent-400)] group-hover:shadow-xl group-hover:shadow-slate-900/10">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
            <BadgeCheck className="h-6 w-6 text-[var(--color-brand-600)]" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-[var(--foreground)] group-hover:text-[var(--color-brand-700)] transition-colors">
              {service.name}
            </h3>
            <p className="mt-2 text-sm text-[var(--foreground)]/70 line-clamp-2 leading-relaxed">
              {service.desc}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-600)] group-hover:gap-2.5 transition-all">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

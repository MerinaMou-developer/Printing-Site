import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { ArrowRight, Star } from "lucide-react";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const img = product.img || "/images/products/placeholder.svg";
  const href = `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-brand-600)]/10 to-transparent p-[1px] transition-all duration-300 hover:from-[var(--color-accent-500)]/30 hover:-translate-y-1"
      aria-label={`View ${product.name}`}
    >
      {/* Premium badge */}
      <div className="absolute right-4 top-4 z-10">
        <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium shadow-lg backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 text-[var(--color-accent-500)]" />
          <span className="text-[var(--color-brand-600)]">Premium</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-white to-[var(--surface-2)] overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
        {/* Image container */}
        <div className="relative aspect-[4/3]">
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-[var(--color-brand-700)]">
                {product.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]/70 line-clamp-2">
                {product.desc}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-500)] group-hover:text-[var(--color-accent-600)]">
              View details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            
            
          </div>
        </div>
      </div>
    </Link>
  );
}
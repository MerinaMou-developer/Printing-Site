import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const img = product.img || "/images/products/placeholder.svg";
  const href = `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-[var(--surface-1)] shadow-md shadow-slate-900/6 ring-1 ring-slate-900/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent-400)] hover:shadow-xl hover:shadow-slate-900/10 hover:ring-[var(--color-accent-500)]/20"
      aria-label={`View ${product.name}`}
      suppressHydrationWarning
    >
      <div className="relative aspect-square bg-gradient-to-b from-slate-100 via-slate-50 to-white p-3 ring-1 ring-inset ring-slate-200/80 flex items-center justify-center">
        <Image
          src={img}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain w-full h-full drop-shadow-sm"
          suppressHydrationWarning
        />
      </div>

      <div className="mt-auto border-t border-slate-200/90 bg-[var(--surface-2)] px-3 py-3.5 text-center sm:px-3.5">
        <h3 className="min-h-[2.5rem] text-center text-sm font-semibold leading-snug text-slate-900 transition-colors line-clamp-2 group-hover:text-[var(--color-brand-800)] sm:text-[0.9375rem]">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}

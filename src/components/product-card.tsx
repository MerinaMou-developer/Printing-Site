import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const img = product.img || "/images/products/placeholder.svg";
  const href = `/products/${product.slug}`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-[var(--color-accent-500)] transition-all duration-300 hover:shadow-lg"
      aria-label={`View ${product.name}`}
      suppressHydrationWarning
    >
      {/* Image container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-2 flex items-center justify-center">
        <Image
          src={img}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain w-full h-full"
          suppressHydrationWarning
        />
      </div>

      {/* Content */}
      <div className="p-3 text-center border-t border-gray-100">
        <h3 className="font-medium text-sm text-gray-900 group-hover:text-[var(--color-accent-600)] transition-colors line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
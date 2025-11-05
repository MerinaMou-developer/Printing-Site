"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import ProductCard from "./product-card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  // Extract unique categories - ensure consistent ordering
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(products.map(p => p.category).filter((cat): cat is string => Boolean(cat)))
    ).sort();
    return ["All Products", ...cats];
  }, [products]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Products") {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div suppressHydrationWarning>
      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
          <Filter className="h-4 w-4" />
          <span>Filter by:</span>
        </div>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-600)] text-white shadow-lg shadow-[var(--color-accent-500)]/30"
                  : "bg-[var(--surface-2)] text-[var(--color-ink)] hover:bg-[var(--surface-3)] hover:text-[var(--color-brand-700)]"
              )}
              suppressHydrationWarning
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-[var(--color-ink)]/60">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}


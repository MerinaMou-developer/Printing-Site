"use client";

import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "./product-card";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Products");

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(
        products
          .map((p) => p.category)
          .filter((cat): cat is string => Boolean(cat))
      )
    ).sort();
    return ["All Products", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Products") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div suppressHydrationWarning className="w-full">
      <div className="mb-8 rounded-2xl border border-slate-200/90 bg-[var(--surface-1)] p-4 shadow-md shadow-slate-900/6 ring-1 ring-slate-900/[0.03] sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-900)]">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-100)] text-[var(--color-brand-700)]">
              <Filter className="h-4 w-4" aria-hidden />
            </span>
            <span>Filter by category</span>
          </div>

          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
            role="tablist"
            aria-label="Product categories"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "flex min-h-[3rem] w-full items-center justify-center rounded-xl px-2.5 py-2.5 text-center text-xs font-semibold leading-snug transition-all duration-200 sm:min-h-[2.75rem] sm:px-3 sm:text-sm",
                    isActive
                      ? "bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-600)] text-[#0f172a] shadow-md shadow-[var(--color-accent-500)]/25 ring-1 ring-[var(--color-accent-600)]/30"
                      : "border border-slate-200/90 bg-[var(--surface-2)] text-slate-800 shadow-sm hover:border-[var(--color-brand-200)] hover:bg-white hover:text-[var(--color-brand-900)] hover:shadow"
                  )}
                  suppressHydrationWarning
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-[var(--surface-2)] py-16 text-center">
          <p className="text-base font-medium text-slate-700">
            No products in this category.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try another filter or view all products.
          </p>
        </div>
      )}
    </div>
  );
}

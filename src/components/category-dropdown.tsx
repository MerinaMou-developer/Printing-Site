"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import servicesData from "@/content/services.json";
import productsData from "@/content/products.json";
import type { Service, Product } from "@/types";

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get unique categories from both services and products
  const categories = [
    { name: "All Categories", href: "/" },
  ];

  // Add service categories
  const serviceCategories = new Set(servicesData.map((s: Service) => s.category));
  serviceCategories.forEach((category) => {
    categories.push({ name: category, href: `/services?category=${encodeURIComponent(category)}` });
  });

  // Add product categories
  const productCategories = new Set(productsData.map((p: Product) => p.category).filter((cat): cat is string => Boolean(cat)));
  productCategories.forEach((category) => {
    categories.push({ name: category, href: `/products?category=${encodeURIComponent(category)}` });
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white text-[var(--color-brand-700)] rounded-l-md font-medium hover:bg-gray-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>All Categories</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50 max-h-[400px] overflow-y-auto">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[var(--color-accent-500)] hover:text-white transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


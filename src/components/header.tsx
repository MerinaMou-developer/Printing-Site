// src/components/header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import site from "@/content/site.json";
import { NAV_ITEMS, NavLink } from "@/components/nav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 text-white
      bg-[var(--color-brand-500)]/95 backdrop-blur border-b border-white/10">
      <div className="wrapper h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
          <span className="hidden sm:inline">{site.brand}</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((n) => <NavLink key={n.href} {...n} />)}
          <Link href="/contact" className="btn btn-primary ml-2">Get a Quote</Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[var(--color-brand-600)]/95 border-t border-white/10">
          <div className="wrapper py-3 space-y-1">
            {NAV_ITEMS.map((n) => (
              <NavLink key={n.href} {...n} onClick={() => setOpen(false)} />
            ))}
            <Link href="/contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

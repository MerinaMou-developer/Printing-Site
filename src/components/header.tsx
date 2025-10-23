"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import site from "@/content/site.json";
import { NAV_ITEMS, NavLink } from "@/components/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 text-white bg-[var(--color-brand-500)]/95 backdrop-blur border-b border-white/10 relative">
      <div className="wrapper h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl hover:opacity-90 transition-all duration-300">
          <span className="text-white">SEH</span>
          <span className="text-yellow-400 drop-shadow-lg">A</span>
          <span className="text-white">M</span>
          <span className="text-white"> </span>
          <span className="text-yellow-400 drop-shadow-lg">A</span>
          <span className="text-white">DVERTISING</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((n) => <NavLink key={n.href} {...n} />)}
          <Link href="/contact" className="btn btn-primary ml-2">Get a Quote</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer - Dropdown Menu */}
      {open && (
        <div className="mobile-nav open md:hidden">
          <div className="wrapper mobile-nav-links">
            {NAV_ITEMS.map((n) => (
              <NavLink key={n.href} {...n} onClick={() => setOpen(false)} className="mobile-nav-item" />
            ))}
            <Link href="/contact" className="mobile-nav-item btn btn-primary" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

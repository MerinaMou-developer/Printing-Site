"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ShoppingCart, Phone, MessageCircle } from "lucide-react";
import { NAV_ITEMS, NavLink, ProfileNavButton } from "@/components/nav";
import CategoryDropdown from "./category-dropdown";
import site from "@/content/site.json";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { useCartApi } from "@/hooks/use-cart-api";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { cartCount } = useCartApi();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services.");

  return (
    <header 
      ref={headerRef} 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      {/* Top Bar - Contact Info */}
      <div className="bg-gradient-to-r from-[var(--color-brand-700)] to-[var(--color-brand-800)] text-white py-2.5">
        <div className="wrapper flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-1.5 hover:text-[var(--color-accent-400)] transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{site.phone}</span>
            </a>
            {waLink && (
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--color-accent-400)] transition-colors">
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
          </div>
          <span className="text-gray-300 text-xs hidden md:inline">Premium Printing & Signage Solutions in Dubai</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="wrapper h-20 grid grid-cols-[auto_1fr_auto_auto] lg:grid-cols-[auto_1fr_auto_auto] items-center gap-4 lg:gap-6 min-w-0">
        {/* Brand Name - No Logo */}
        <Link href="/" className="group flex-shrink-0">
          <div className="flex flex-col">
            <span className={`text-2xl md:text-3xl font-bold leading-tight transition-all duration-300 ${
              scrolled ? 'text-[var(--color-brand-700)]' : 'text-[var(--color-brand-800)]'
            }`}>
              <span className="text-[var(--color-brand-700)]">Print</span>
              <span className="text-[var(--color-accent-500)]">Pro</span>
            </span>
            <span className="text-xs md:text-sm font-semibold text-[var(--color-accent-600)] tracking-wider">
              DUBAI
            </span>
          </div>
        </Link>

        {/* Desktop: Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.href} 
              {...item} 
              className="px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 text-gray-700 hover:text-[var(--color-brand-700)] hover:bg-gray-50 relative group"
            />
          ))}
        </nav>

        {/* Desktop: Search Bar */}
        <div className="hidden xl:flex items-center max-w-md">
          <CategoryDropdown />
          <form onSubmit={handleSearch} className="flex flex-1 ml-2 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 min-w-0 px-4 py-2.5 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-l-lg outline-none focus:ring-2 focus:ring-[var(--color-accent-500)] focus:border-[var(--color-accent-500)] transition-all text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-600)] text-white hover:from-[var(--color-accent-600)] hover:to-[var(--color-accent-700)] transition-all font-semibold rounded-r-lg shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Desktop: Auth, Cart & Actions */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* Profile Icon Button */}
          <ProfileNavButton />
          
          {/* Cart Icon Button */}
          <Link 
            href="/checkout" 
            className="relative h-10 w-10 rounded-lg bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-600)] hover:from-[var(--color-accent-600)] hover:to-[var(--color-accent-700)] flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[var(--color-accent-600)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          
          <Link 
            href="/contact" 
            className="px-5 py-2.5 bg-[var(--color-brand-700)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--color-brand-800)] transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile: Profile, Cart & Menu Icons */}
        <div className="flex items-center gap-2 lg:hidden col-start-4 col-end-5 justify-end">
          {/* Mobile Profile Icon - show in mobile header */}
          <div className="lg:hidden">
            <ProfileNavButton onClick={() => setOpen(false)} />
          </div>
          
          <Link href="/checkout" className="relative p-2 hover:bg-gray-100 rounded-lg transition-all" aria-label="Cart">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--color-accent-500)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl">
          <div className="wrapper py-4 space-y-1">
            {NAV_ITEMS.map((n) => (
              <NavLink 
                key={n.href} 
                {...n} 
                onClick={() => setOpen(false)} 
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-gray-700 hover:text-[var(--color-brand-700)] font-medium" 
              />
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <Link 
                href="/checkout" 
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-600)] text-white font-semibold hover:from-[var(--color-accent-600)] hover:to-[var(--color-accent-700)] transition-all"
                onClick={() => setOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-white text-[var(--color-accent-600)] text-xs font-bold rounded-full px-2 py-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-3 rounded-lg bg-[var(--color-brand-700)] text-white font-semibold text-center hover:bg-[var(--color-brand-800)] transition-all"
                onClick={() => setOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

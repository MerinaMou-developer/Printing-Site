"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { User, LogIn, UserPlus, LogOut, Package } from "lucide-react";
import { useAuth } from "@/context/auth-context";

// Define type for navigation items
export type NavItem = { href: string; label: string };

// Define navigation items
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
 
];

// NavLink component to create individual links
export function NavLink({ href, label, onClick, className }: NavItem & { onClick?: () => void; className?: string }) {
  const pathname = usePathname();

  // Calculate active state - this will be consistent after hydration
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  // Base classes that are consistent between server and client
  const baseClasses = "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";
  
  // Active classes - applied consistently
  const activeClasses = isActive 
    ? "text-[var(--color-brand-700)] bg-gray-50 font-semibold" 
    : "text-gray-700 hover:text-[var(--color-brand-700)] hover:bg-gray-50";

  return (
    <Link
      onClick={onClick}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${baseClasses} ${activeClasses} ${className || ""}`}
    >
      <span className="relative">
        {label}
        {isActive && (
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[var(--color-accent-500)] rounded-full"></span>
        )}
      </span>
    </Link>
  );
}

// Profile/Login Nav Button Component - Icon Only (Compact)
export function ProfileNavButton({ onClick }: { onClick?: () => void }) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const baseButtonClasses =
    "relative h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent-500)]";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  if (loading) {
    return (
      <div className="flex items-center">
        <div className="h-11 w-11 rounded-xl bg-gray-200 animate-pulse" aria-hidden />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const buttonClasses = `${baseButtonClasses} ${
      dropdownOpen
        ? 'ring-2 ring-[var(--color-accent-400)] ring-offset-2 shadow-[0_18px_40px_-15px_rgba(15,42,75,0.35)]'
        : 'shadow-[0_10px_25px_-12px_rgba(15,42,75,0.35)] hover:shadow-[0_16px_32px_-18px_rgba(15,42,75,0.45)]'
    } bg-gradient-to-br from-[var(--color-accent-500)] via-[var(--color-accent-600)] to-[var(--color-accent-700)] text-white`;

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={buttonClasses}
          title={`${user.first_name || user.username}'s Profile`}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <span className="text-sm font-semibold">
            {user.first_name?.[0] || user.username[0].toUpperCase()}
          </span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-[var(--color-brand-100)] bg-white shadow-[0_28px_60px_-30px_rgba(15,42,75,0.55)] py-3 z-50">
            <div className="px-5 pb-3 border-b border-[var(--color-brand-100)]">
              <p className="text-sm font-semibold text-[var(--color-brand-800)]">{user.full_name || user.username}</p>
              <p className="text-xs text-[var(--color-brand-500)] mt-1 break-words">{user.email}</p>
            </div>
            
            <Link
              href="/orders"
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                onClick?.();
              }}
            >
              <Package className="h-4 w-4 text-[var(--color-accent-500)]" />
              My Orders
            </Link>
            
            <Link
              href="/profile"
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                onClick?.();
              }}
            >
              <User className="h-4 w-4 text-[var(--color-accent-500)]" />
              Profile Settings
            </Link>
            
            <div className="border-t border-[var(--color-brand-100)] mt-2 pt-2">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                  onClick?.();
                }}
                className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const buttonClasses = `${baseButtonClasses} ${
    dropdownOpen
      ? 'ring-2 ring-[var(--color-brand-300)] ring-offset-2 shadow-[0_18px_40px_-18px_rgba(15,42,75,0.45)]'
      : 'shadow-[0_10px_25px_-15px_rgba(15,42,75,0.35)] hover:shadow-[0_18px_36px_-20px_rgba(15,42,75,0.5)]'
  } border border-[var(--color-brand-200)] bg-white text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)]`;

  // Not logged in - show profile icon button
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={buttonClasses}
        title="Login / Register"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <User className="h-5 w-5" />
      </button>

      {/* Dropdown Menu - Login/Register */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-[var(--color-brand-100)] bg-white shadow-[0_28px_60px_-30px_rgba(15,42,75,0.55)] py-3 z-50">
          <div className="px-5 pb-3 border-b border-[var(--color-brand-100)]">
            <p className="text-sm font-semibold text-[var(--color-brand-800)]">Welcome!</p>
            <p className="text-xs text-[var(--color-brand-500)] mt-1">Sign in to your account</p>
          </div>
          
          <Link
            href="/login"
            className="flex items-center gap-3 px-5 py-2.5 text-sm text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition-colors"
            onClick={() => {
              setDropdownOpen(false);
              onClick?.();
            }}
          >
            <LogIn className="h-4 w-4 text-[var(--color-accent-500)]" />
            <span className="font-medium">Login</span>
          </Link>
          
          <Link
            href="/register"
            className="flex items-center gap-3 px-5 py-2.5 text-sm text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] transition-colors"
            onClick={() => {
              setDropdownOpen(false);
              onClick?.();
            }}
          >
            <UserPlus className="h-4 w-4 text-[var(--color-accent-500)]" />
            <span className="font-medium">Register</span>
          </Link>
          
          <div className="border-t border-[var(--color-brand-100)] mt-2 pt-2 px-5">
            <p className="text-xs text-[var(--color-brand-500)]">
              New customer?{' '}
              <Link 
                href="/register" 
                className="text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)] font-semibold"
                onClick={() => {
                  setDropdownOpen(false);
                  onClick?.();
                }}
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

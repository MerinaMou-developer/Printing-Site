"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define type for navigation items
export type NavItem = { href: string; label: string };

// Define navigation items
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
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

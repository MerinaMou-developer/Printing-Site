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
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// NavLink component to create individual links
export function NavLink({ href, label, onClick, className }: NavItem & { onClick?: () => void; className?: string }) {
  const pathname = usePathname();

  // Calculate active state - this will be consistent after hydration
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  // Base classes that are consistent between server and client
  const baseClasses = "relative px-3 py-2 rounded-md text-sm font-medium transition hover:bg-white/10 text-white/80 hover:text-white";
  
  // Active classes - applied consistently
  const activeClasses = isActive ? "text-white" : "";

  return (
    <Link
      onClick={onClick}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${baseClasses} ${activeClasses} ${className || ""}`}
    >
      {label}
    </Link>
  );
}

// src/components/nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function NavLink({ href, label, onClick }: NavItem & { onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      onClick={onClick}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition
        ${active ? "text-white" : "text-white/80 hover:text-white"}
        hover:bg-white/10
        after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:rounded-full
        after:bg-yellow-400 after:transition
        ${active ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-60"}`}
    >
      {label}
    </Link>
  );
}

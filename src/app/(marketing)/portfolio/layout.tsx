import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Our Work in Dubai | PrimePrint Dubai",
  description: "Explore our latest stamps, signage, printing, and branding projects across Dubai. See examples of our professional work including LED signs, vehicle branding, screen printing, DTF, and more.",
  keywords: [
    "portfolio Dubai",
    "printing portfolio Dubai",
    "signage portfolio Dubai",
    "stamps portfolio Dubai",
    "PrimePrint Dubai portfolio",
    "printing work Dubai",
    "signage examples Dubai",
  ],
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Our Work in Dubai | PrimePrint Dubai",
    description: "Explore our latest stamps, signage, printing, and branding projects across Dubai.",
    url: "/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}


// src/components/footer.tsx
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import site from "@/content/site.json";
import servicesData from "@/content/services.json";
import { createWhatsAppLink, createPhoneLink, formatPhoneNumber } from "@/lib/whatsapp";

/** Lightweight type matching your services JSON */
type Svc = { slug: string; title?: string; name?: string };
const services: Svc[] = (servicesData as Svc[]).slice(0, 6);

/** Local pages list (keeps footer independent of nav module) */
const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

/** Safely pull optional socials from site.json if you add them later */
const get = (k: string) =>
  (site as unknown as Record<string, string | undefined>)[k];

const SOCIALS = [
  { name: "Facebook", href: get("facebook"), Icon: Facebook },
  { name: "Instagram", href: get("instagram"), Icon: Instagram },
  { name: "Twitter/X", href: get("twitter"), Icon: Twitter },
  { name: "YouTube", href: get("youtube"), Icon: Youtube },
  { name: "LinkedIn", href: get("linkedin"), Icon: Linkedin },
].filter((s) => !!s.href);

export default function Footer() {
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const displayPhone = formatPhoneNumber(site.phone ?? phoneNumber);
  const telLink = createPhoneLink(phoneNumber);

  return (
    <footer className="mt-16 text-white bg-[var(--color-brand-700)]">
      {/* Main columns */}
      <div className="wrapper py-12 grid gap-10 md:grid-cols-4">
        {/* Brand / short copy */}
        <div>
          <p className="text-lg font-semibold">{site.brand}</p>
          <p className="mt-3 text-white/80">
            Printing, signage, apparel &amp; packaging in Dubai—fast turnaround
            with installation and delivery.
          </p>
        </div>

        {/* Pages */}
        <div>
          <p className="font-semibold mb-3">Pages</p>
          <ul className="space-y-2 text-white/80">
            {PAGES.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular services */}
        <div>
          <p className="font-semibold mb-3">Popular services</p>
          <ul className="space-y-2 text-white/80">
            {services.map((s) => {
              const label = s.title ?? s.name ?? s.slug;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact & socials */}
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-white/80">
            {site.address && (
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {site.address}
              </li>
            )}
            {telLink && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={telLink} className="hover:text-white">
                  {displayPhone}
                </a>
              </li>
            )}
            {site.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-white break-all"
                >
                  {site.email}
                </a>
              </li>
            )}
          </ul>

          {/* Socials */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Follow us</p>
            <div className="flex items-center gap-3">
              {SOCIALS.length > 0 ? (
                SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition"
                    aria-label={name}
                    title={name}
                  >
                    <Icon className="h-4 w-4 text-white/90" />
                  </a>
                ))
              ) : (
                <p className="text-white/60 text-sm">
                  Add social links in <code>site.json</code>
                </p>
              )}
            </div>

            {/* Optional Google Maps link if you have it */}
            {site.mapEmbed && (
              <a
                href={site.mapEmbed}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-white/80 hover:text-white"
              >
                Open in Google Maps →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="wrapper py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/70">
        <p>
          © {new Date().getFullYear()} {site.brand}. All rights reserved.
        </p>
        <p>Made in Dubai • VAT invoices available on request.</p>
      </div>
    </footer>
  );
}

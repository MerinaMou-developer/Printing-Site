import raw from "./site.json";

export type SiteConfig = {
  brand: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string; // E.164 like +971569324947
  mapEmbed?: string; // Google Maps iframe src
};

// Export a typed object (no `any` needed anywhere)
const site = raw as Partial<SiteConfig>;
export default site;

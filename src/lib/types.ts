// src/lib/types.ts
export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  category: string;
  desc: string;
  faqs?: FAQ[];
};

export type Product = {
  slug: string;
  name: string;
  desc: string;
  img: string; // public path like /images/products/tshirt.jpg
  specs?: { k: string; v: string }[];
  variants?: string[];
};



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
  img?: string;
  category?: string;
};


// ...existing code...
export type Portfolio = {
  slug: string;
  title: string;
  image: string;
  tags: string[];
  description?: string;
  client?: string;
  date?: string;
};
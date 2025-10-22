export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  category: string;
  desc: string;     // matches your current JSON field
  image?: string;   // optional (we’ll use placeholder if missing)
  faqs?: FAQ[];     // optional
}

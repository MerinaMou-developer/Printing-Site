// Cart item types
export type CartItemMetadata = {
  id: string;
  productSlug: string;
  productName: string;
  productImg?: string;
  quantity: number;
  emiratesId: { name: string; size: number; key: string };
  tradeLicense: { name: string; size: number; key: string };
  specificDesign: { name: string; size: number; key: string } | null;
  addedAt: string;
};

// Old format cart item (with base64 data)
export type OldCartItem = {
  productSlug?: string;
  productName?: string;
  productImg?: string;
  quantity?: number;
  emiratesId?: { name?: string; data?: string; size?: number; key?: string };
  tradeLicense?: { name?: string; data?: string; size?: number; key?: string };
  specificDesign?: { name?: string; data?: string; size?: number; key?: string } | null;
  addedAt?: string;
};


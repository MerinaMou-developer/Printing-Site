/**
 * Products Service
 */

import { apiCall } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  category_slug: string;
  short_description?: string;
  description?: string;
  price: string;
  sale_price?: string | null;
  current_price: string;
  main_image?: string | null;
  in_stock: boolean;
  is_featured: boolean;
  stock_quantity?: number;
  sku?: string;
  images?: ProductImage[];
  specifications?: ProductSpecification[];
  variants?: ProductVariant[];
  created_at: string;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text?: string;
  order: number;
}

export interface ProductSpecification {
  id: number;
  key: string;
  value: string;
  order: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku?: string;
  price_adjustment: string;
  stock_quantity: number;
  is_active: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Get all products with optional filters
 */
export async function getProducts(params?: {
  category?: number;
  search?: string;
  in_stock?: boolean;
  is_featured?: boolean;
  page?: number;
}): Promise<PaginatedResponse<Product>> {
  const queryParams = new URLSearchParams();
  
  if (params?.category) queryParams.append('category', params.category.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.in_stock !== undefined) queryParams.append('in_stock', params.in_stock.toString());
  if (params?.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString());
  if (params?.page) queryParams.append('page', params.page.toString());

  const query = queryParams.toString();
  const endpoint = `${API_ENDPOINTS.products.list}${query ? `?${query}` : ''}`;
  
  return await apiCall<PaginatedResponse<Product>>(endpoint);
}

/**
 * Get single product by slug
 */
export async function getProduct(slug: string): Promise<Product> {
  return await apiCall<Product>(API_ENDPOINTS.products.detail(slug));
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return await apiCall<Product[]>(API_ENDPOINTS.products.featured);
}

/**
 * Search products
 */
export async function searchProducts(query: string, filters?: {
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}): Promise<PaginatedResponse<Product>> {
  const queryParams = new URLSearchParams();
  
  queryParams.append('q', query);
  if (filters?.category) queryParams.append('category', filters.category);
  if (filters?.min_price) queryParams.append('min_price', filters.min_price.toString());
  if (filters?.max_price) queryParams.append('max_price', filters.max_price.toString());
  if (filters?.in_stock) queryParams.append('in_stock', 'true');

  const queryString = queryParams.toString();
  const endpoint = `${API_ENDPOINTS.products.search}?${queryString}`;
  
  return await apiCall<PaginatedResponse<Product>>(endpoint);
}


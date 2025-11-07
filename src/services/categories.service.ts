/**
 * Categories Service
 */

import { apiCall } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';
import type { Product, PaginatedResponse } from './products.service';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  parent?: number | null;
  is_active: boolean;
  order?: number;
  products_count?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  return await apiCall<Category[]>(API_ENDPOINTS.categories.list);
}

/**
 * Get single category by slug
 */
export async function getCategory(slug: string): Promise<Category> {
  return await apiCall<Category>(API_ENDPOINTS.categories.detail(slug));
}

/**
 * Get products in a category
 */
export async function getCategoryProducts(slug: string): Promise<PaginatedResponse<Product>> {
  return await apiCall<PaginatedResponse<Product>>(API_ENDPOINTS.categories.products(slug));
}


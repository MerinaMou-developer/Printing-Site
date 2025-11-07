/**
 * Orders Service
 */

import { authenticatedApiCall, uploadFiles } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface OrderItem {
  id: number;
  product?: number | null;
  product_name: string;
  product_slug?: string;
  product_image?: string | null;
  variant?: number | null;
  variant_name?: string | null;
  quantity: number;
  price: string;
  total: string;
}

export interface OrderFile {
  id: number;
  file: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_size_mb: number;
  product_name?: string;
  description?: string;
  uploaded_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  user?: number | null;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  company_name?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  full_address: string;
  order_notes?: string;
  subtotal: string;
  shipping_cost: string;
  tax: string;
  total: string;
  status: string;
  payment_status: string;
  items: OrderItem[];
  files?: OrderFile[];
  created_at: string;
  updated_at: string;
  confirmed_at?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
}

export interface PaginatedOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}

export interface CheckoutData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  order_notes?: string;
}

/**
 * Get user's orders
 */
export async function getOrders(page?: number): Promise<PaginatedOrders> {
  const endpoint = page 
    ? `${API_ENDPOINTS.orders.list}?page=${page}`
    : API_ENDPOINTS.orders.list;
  
  return await authenticatedApiCall<PaginatedOrders>(endpoint);
}

/**
 * Get single order
 */
export async function getOrder(id: number): Promise<Order> {
  return await authenticatedApiCall<Order>(API_ENDPOINTS.orders.detail(id));
}

/**
 * Create order from cart (checkout)
 */
export async function checkout(
  data: CheckoutData,
  files?: Record<string, File>
): Promise<Order> {
  if (files && Object.keys(files).length > 0) {
    // Use multipart/form-data for file uploads
    return await uploadFiles<Order>(API_ENDPOINTS.orders.checkout, data as unknown as Record<string, unknown>, files, true);
  }
  
  // Standard JSON request
  return await authenticatedApiCall<Order>(API_ENDPOINTS.orders.checkout, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


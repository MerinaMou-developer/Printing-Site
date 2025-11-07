/**
 * Shopping Cart Service
 */

import { authenticatedApiCall } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-config';

export interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_slug: string;
  product_image?: string | null;
  variant?: number | null;
  variant_name?: string | null;
  quantity: number;
  price: string;
  total_price: string;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user?: number | null;
  items: CartItem[];
  total_items: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  message: string;
  cart: Cart;
}

/**
 * Get user's cart
 */
export async function getCart(): Promise<Cart> {
  return await authenticatedApiCall<Cart>(API_ENDPOINTS.cart.get);
}

/**
 * Add item to cart
 */
export async function addToCart(
  productId: number,
  quantity: number = 1,
  variantId?: number
): Promise<CartResponse> {
  return await authenticatedApiCall<CartResponse>(API_ENDPOINTS.cart.addItem, {
    method: 'POST',
    body: JSON.stringify({
      product_id: productId,
      quantity,
      variant_id: variantId,
    }),
  });
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(
  itemId: number,
  quantity: number
): Promise<CartResponse> {
  return await authenticatedApiCall<CartResponse>(
    API_ENDPOINTS.cart.updateItem(itemId),
    {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }
  );
}

/**
 * Remove item from cart
 */
export async function removeCartItem(itemId: number): Promise<CartResponse> {
  return await authenticatedApiCall<CartResponse>(
    API_ENDPOINTS.cart.removeItem(itemId),
    {
      method: 'DELETE',
    }
  );
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<CartResponse> {
  return await authenticatedApiCall<CartResponse>(API_ENDPOINTS.cart.clear, {
    method: 'POST',
  });
}


'use client';

/**
 * Cart Hook - Connected to Django API
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import * as CartService from '@/services/cart.service';
import type { Cart } from '@/services/cart.service';

export function useCartApi() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart from API
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await CartService.getCart();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Add item to cart
  const addItem = useCallback(async (
    productId: number,
    quantity: number = 1,
    variantId?: number
  ) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add items to cart');
    }

    try {
      const response = await CartService.addToCart(productId, quantity, variantId);
      setCart(response.cart);
      return response;
    } catch (err) {
      console.error('Failed to add item:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // Update cart item quantity
  const updateItem = useCallback(async (itemId: number, quantity: number) => {
    if (!isAuthenticated) return;

    try {
      const response = await CartService.updateCartItem(itemId, quantity);
      setCart(response.cart);
      return response;
    } catch (err) {
      console.error('Failed to update item:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // Remove item from cart
  const removeItem = useCallback(async (itemId: number) => {
    if (!isAuthenticated) return;

    try {
      const response = await CartService.removeCartItem(itemId);
      setCart(response.cart);
      return response;
    } catch (err) {
      console.error('Failed to remove item:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // Clear cart
  const clear = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await CartService.clearCart();
      setCart(response.cart);
      return response;
    } catch (err) {
      console.error('Failed to clear cart:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // Load cart on mount and when auth changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    cartCount: cart?.total_items || 0,
    subtotal: cart?.subtotal || '0',
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clear,
  };
}


"use client";

import { useState, useEffect } from 'react';

type CartItem = {
  id: string;
  productSlug: string;
  productName: string;
  productImg?: string;
  quantity: number;
  emiratesId: { name: string; size: number; key: string };
  tradeLicense: { name: string; size: number; key: string };
  specificDesign: { name: string; size: number; key: string } | null;
};

export function useCart() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to get cart count from localStorage
    const getCartCount = () => {
      if (typeof window === 'undefined') return 0;
      
      try {
        const cartData = localStorage.getItem('cart');
        if (!cartData) return 0;
        
        const parsed = JSON.parse(cartData);
        const cartArray = Array.isArray(parsed) ? parsed : [parsed];
        
        // Filter out old format items
        const validCart = cartArray.filter((item: any) => {
          return item.emiratesId?.key && item.tradeLicense?.key && !item.emiratesId?.data;
        });
        
        // Calculate total quantity
        const totalQuantity = validCart.reduce((sum: number, item: CartItem) => {
          return sum + (item.quantity || 1);
        }, 0);
        
        return totalQuantity;
      } catch (error) {
        console.error('Error reading cart:', error);
        return 0;
      }
    };

    // Set initial count
    setCartCount(getCartCount());

    // Listen for storage changes (when cart is updated in other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        setCartCount(getCartCount());
      }
    };

    // Listen for custom cart update events (same tab)
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Poll for changes (in case events don't fire)
    const interval = setInterval(() => {
      const newCount = getCartCount();
      setCartCount(prev => {
        if (prev !== newCount) {
          return newCount;
        }
        return prev;
      });
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  return cartCount;
}


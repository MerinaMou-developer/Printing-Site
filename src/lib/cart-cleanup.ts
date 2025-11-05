// Utility to clean up old cart data from localStorage
// This should be called on app initialization
// This is safe to import on server-side (checks for window first)

import type { CartItemMetadata, OldCartItem } from '@/types/cart';

export function cleanupOldCartData(): void {
  if (typeof window === 'undefined') return;

  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return;

    // Check size first - be more aggressive (500KB threshold)
    const sizeInMB = new Blob([cartData]).size / (1024 * 1024);
    if (sizeInMB > 0.5) {
      console.error(`Cart data is ${sizeInMB.toFixed(2)}MB - TOO LARGE! Clearing completely`);
      localStorage.removeItem('cart');
      return;
    }

    const parsed = JSON.parse(cartData);
    const cartArray = Array.isArray(parsed) ? parsed : [parsed];

    // Check if any item has old format (base64 data)
    const hasOldFormat = cartArray.some((item: OldCartItem) => {
      return item.emiratesId?.data || item.tradeLicense?.data;
    });

    // Also check if cart has too many items - reduced limit for safety
    const MAX_ITEMS = 5;
    const needsCleanup = hasOldFormat || cartArray.length > MAX_ITEMS;

    if (needsCleanup) {
      console.log('Cleaning up cart data...');
      
      // Filter out old format items
      let validCart = cartArray.filter((item: OldCartItem): item is CartItemMetadata => {
        return !!(item.emiratesId?.key && item.tradeLicense?.key && !item.emiratesId?.data);
      });

      // Limit to MAX_ITEMS (keep newest)
      if (validCart.length > MAX_ITEMS) {
        validCart.sort((a, b) => {
          const dateA = new Date(a.addedAt || 0).getTime();
          const dateB = new Date(b.addedAt || 0).getTime();
          return dateB - dateA; // Newest first
        });
        validCart = validCart.slice(0, MAX_ITEMS);
      }

      try {
        if (validCart.length > 0) {
          localStorage.setItem('cart', JSON.stringify(validCart));
        } else {
          localStorage.removeItem('cart');
        }
      } catch (error: unknown) {
        // If we can't save, just clear everything
        const err = error as { name?: string; code?: number };
        if (err?.name === 'QuotaExceededError' || err?.code === 22) {
          console.warn('localStorage full, clearing cart');
          localStorage.removeItem('cart');
        }
      }
    }
  } catch (error) {
    // If parsing fails, clear corrupted data
    console.error('Error cleaning cart data:', error);
    try {
      localStorage.removeItem('cart');
    } catch {
      // Ignore errors when clearing
    }
  }
}

// Function to get cart size estimate (for debugging)
export function getCartSizeEstimate(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return 0;
    return new Blob([cartData]).size;
  } catch {
    return 0;
  }
}


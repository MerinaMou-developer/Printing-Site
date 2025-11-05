// Force cleanup function - call this to completely reset cart and IndexedDB
// Use this if users are experiencing persistent quota errors

export async function forceCleanupAll(): Promise<void> {
  if (typeof window === 'undefined') return;

  console.log('🧹 Force cleaning up all cart data...');

  try {
    // 1. Clear localStorage cart
    try {
      localStorage.removeItem('cart');
      console.log('✅ Cleared localStorage cart');
    } catch (error) {
      console.error('Failed to clear localStorage cart:', error);
    }

    // 2. Clear IndexedDB
    try {
      const { clearAllFiles } = await import('./indexeddb');
      await clearAllFiles();
      console.log('✅ Cleared IndexedDB files');
    } catch (error) {
      console.error('Failed to clear IndexedDB:', error);
    }

    console.log('✅ Force cleanup complete');
  } catch (error) {
    console.error('Force cleanup error:', error);
  }
}

// Function to check if cleanup is needed and do it automatically
export function autoCleanupIfNeeded(): void {
  if (typeof window === 'undefined') return;

  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return;

    const sizeInMB = new Blob([cartData]).size / (1024 * 1024);
    
    // Be very aggressive - if cart is bigger than 500KB, it's definitely corrupted
    if (sizeInMB > 0.5) {
      console.warn(`Auto-cleaning cart: ${sizeInMB.toFixed(2)}MB detected - CLEARING`);
      localStorage.removeItem('cart');
    }
  } catch (error) {
    console.error('Auto cleanup error:', error);
    // If we can't read it, clear it
    try {
      localStorage.removeItem('cart');
    } catch {
      // Ignore
    }
  }
}


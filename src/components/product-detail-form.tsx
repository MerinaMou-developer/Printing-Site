"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

type UploadedFile = {
  name: string;
  file: File;
  preview?: string;
};

export default function ProductDetailForm({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [emiratesId, setEmiratesId] = useState<UploadedFile | null>(null);
  const [tradeLicense, setTradeLicense] = useState<UploadedFile | null>(null);
  const [specificDesign, setSpecificDesign] = useState<UploadedFile | null>(null);
  const [loading, setLoading] = useState(false);

  const emiratesIdRef = useRef<HTMLInputElement>(null);
  const tradeLicenseRef = useRef<HTMLInputElement>(null);
  const specificDesignRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'emiratesId' | 'tradeLicense' | 'specificDesign'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, JPG, PNG, and PDF files are allowed');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedFile: UploadedFile = {
          name: file.name,
          file,
          preview: reader.result as string
        };
        if (type === 'emiratesId') setEmiratesId(uploadedFile);
        else if (type === 'tradeLicense') setTradeLicense(uploadedFile);
        else if (type === 'specificDesign') setSpecificDesign(uploadedFile);
      };
      reader.readAsDataURL(file);
    } else {
      const uploadedFile: UploadedFile = {
        name: file.name,
        file
      };
      if (type === 'emiratesId') setEmiratesId(uploadedFile);
      else if (type === 'tradeLicense') setTradeLicense(uploadedFile);
      else if (type === 'specificDesign') setSpecificDesign(uploadedFile);
    }
  };

  const removeFile = (type: 'emiratesId' | 'tradeLicense' | 'specificDesign') => {
    if (type === 'emiratesId') {
      setEmiratesId(null);
      if (emiratesIdRef.current) emiratesIdRef.current.value = '';
    } else if (type === 'tradeLicense') {
      setTradeLicense(null);
      if (tradeLicenseRef.current) tradeLicenseRef.current.value = '';
    } else if (type === 'specificDesign') {
      setSpecificDesign(null);
      if (specificDesignRef.current) specificDesignRef.current.value = '';
    }
  };

  const handleAddToCart = async () => {
    // Validate required files
    if (!emiratesId || !tradeLicense) {
      alert('Please upload Emirates ID and Trade License (both required)');
      return;
    }

    setLoading(true);

    try {
      // AGGRESSIVE CLEANUP FIRST - Clear localStorage completely if there's any issue
      if (typeof window !== 'undefined') {
        try {
          const cartData = localStorage.getItem('cart');
          if (cartData) {
            const sizeInMB = new Blob([cartData]).size / (1024 * 1024);
            // If cart is bigger than 1MB, it's definitely corrupted (metadata should be tiny)
            if (sizeInMB > 1) {
              console.error(`AGGRESSIVE CLEANUP: Cart is ${sizeInMB.toFixed(2)}MB - CLEARING IMMEDIATELY!`);
              localStorage.removeItem('cart');
            }
          }
        } catch {
          // If ANY error reading cart, clear it completely
          console.error('AGGRESSIVE CLEANUP: Error reading cart, clearing completely');
          try {
            localStorage.removeItem('cart');
          } catch {
            // Ignore
          }
        }
      }

      // Import IndexedDB helper
      const { storeFile } = await import('@/lib/indexeddb');
      
      // Generate unique keys for files
      const itemId = `${product.slug}-${Date.now()}`;
      const emiratesIdKey = `${itemId}-emiratesId`;
      const tradeLicenseKey = `${itemId}-tradeLicense`;
      const specificDesignKey = specificDesign ? `${itemId}-specificDesign` : null;

      // Store files in IndexedDB (supports large files)
      await storeFile(emiratesIdKey, emiratesId.file);
      await storeFile(tradeLicenseKey, tradeLicense.file);
      if (specificDesign) {
        await storeFile(specificDesignKey!, specificDesign.file);
      }

      // Store only metadata in localStorage (small data)
      const cartItem = {
        id: itemId,
        productSlug: product.slug,
        productName: product.name,
        productImg: product.img,
        quantity,
        emiratesId: {
          name: emiratesId.name,
          size: emiratesId.file.size,
          key: emiratesIdKey
        },
        tradeLicense: {
          name: tradeLicense.name,
          size: tradeLicense.file.size,
          key: tradeLicenseKey
        },
        specificDesign: specificDesign ? {
          name: specificDesign.name,
          size: specificDesign.file.size,
          key: specificDesignKey!
        } : null,
        addedAt: new Date().toISOString()
      };

      // Get and clean existing cart from localStorage (only metadata)
      let existingCart: typeof cartItem[] = [];
      
      if (typeof window !== 'undefined') {
        try {
          const data = localStorage.getItem('cart');
          if (data) {
            // Check size FIRST - if too large, don't even try to parse
            const sizeInMB = new Blob([data]).size / (1024 * 1024);
            if (sizeInMB > 4) {
              console.error(`Cart is ${sizeInMB.toFixed(2)}MB - TOO LARGE! Clearing completely.`);
              localStorage.removeItem('cart');
              alert(`Your cart data is too large (${sizeInMB.toFixed(2)}MB) and has been cleared. Please add items to cart again.`);
              existingCart = [];
            } else {
              try {
                const parsed = JSON.parse(data);
                const cartArray = Array.isArray(parsed) ? parsed : [parsed];
                
                // Clean up old format items that might have base64 data
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                existingCart = cartArray.filter((item: any) => {
                  // Remove items with old format (have 'data' property instead of 'key')
                  if (item.emiratesId?.data || item.tradeLicense?.data) {
                    console.warn('Removing old format cart item with base64 data');
                    return false;
                  }
                  // Only keep items with valid structure
                  return item.emiratesId?.key && item.tradeLicense?.key;
                });
                
                // Limit cart to 5 items (reduced from 10 to be safer)
                const MAX_CART_ITEMS = 5;
                if (existingCart.length >= MAX_CART_ITEMS) {
                  console.warn(`Cart has ${existingCart.length} items, keeping only latest ${MAX_CART_ITEMS}`);
                  // Sort by addedAt (newest first) and keep only MAX_CART_ITEMS
                  existingCart.sort((a, b) => {
                    const dateA = new Date(a.addedAt || 0).getTime();
                    const dateB = new Date(b.addedAt || 0).getTime();
                    return dateB - dateA; // Newest first
                  });
                  existingCart = existingCart.slice(0, MAX_CART_ITEMS - 1); // Keep space for new item
                }
              } catch {
                console.warn('Failed to parse cart data, clearing it');
                localStorage.removeItem('cart');
                existingCart = [];
              }
            }
          }
        } catch (error) {
          console.error('Error reading cart:', error);
          // If we can't read cart, clear it
          try {
            localStorage.removeItem('cart');
          } catch {
            // Ignore
          }
          existingCart = [];
        }
      }

      // Add to cart (support multiple items)
      existingCart.push(cartItem);
      
      // Try to save cart with retry logic and strict size checking
      let saved = false;
      let attempts = 0;
      const maxAttempts = 3;
      
      while (!saved && attempts < maxAttempts) {
        try {
          const cartString = JSON.stringify(existingCart);
          // Check size before attempting to save (approximate)
          const sizeInMB = new Blob([cartString]).size / (1024 * 1024);
          
          if (sizeInMB > 3) {
            // If cart is getting too large (>3MB), aggressively reduce it
            console.error(`Cart is ${sizeInMB.toFixed(2)}MB - TOO LARGE! Clearing and keeping only new item.`);
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify([cartItem]));
            saved = true;
            
            // Dispatch cart update event for header
            window.dispatchEvent(new Event('cartUpdated'));
            alert('Your cart had too many items and has been cleared. Only your current item was added.');
            break;
          }
          
          localStorage.setItem('cart', JSON.stringify(existingCart));
          saved = true;
          
          // Dispatch cart update event for header
          window.dispatchEvent(new Event('cartUpdated'));
        } catch (error: unknown) {
          attempts++;
          const err = error as { name?: string; code?: number; message?: string };
          
          if (err?.name === 'QuotaExceededError' || err?.code === 22) {
            console.error(`Quota exceeded (attempt ${attempts}/${maxAttempts})`);
            
            // Clear cart and try with just the new item
            try {
              localStorage.removeItem('cart');
              const singleItemString = JSON.stringify([cartItem]);
              const singleItemSize = new Blob([singleItemString]).size / (1024 * 1024);
              
              if (singleItemSize > 1) {
                // Even the single item is too large - this shouldn't happen but handle it
                throw new Error('Cart item metadata is too large. Your browser storage may have issues.');
              }
              
              localStorage.setItem('cart', singleItemString);
              saved = true;
              
              // Dispatch cart update event for header
              window.dispatchEvent(new Event('cartUpdated'));
              break;
            } catch {
              if (attempts >= maxAttempts) {
                // Last attempt: clear all localStorage
                try {
                  localStorage.clear();
                  localStorage.setItem('cart', JSON.stringify([cartItem]));
                  saved = true;
                  
                  // Dispatch cart update event for header
                  window.dispatchEvent(new Event('cartUpdated'));
                } catch {
                  throw new Error('Unable to save cart. Your browser storage is full or corrupted. Please clear your browser data and try again.');
                }
              } else {
                // Reduce cart size and try again
                existingCart = existingCart.slice(-1); // Keep only last 1 item
              }
            }
          } else {
            // Non-quota error, throw immediately
            throw error;
          }
        }
      }
      
      if (!saved) {
        throw new Error('Failed to save cart after multiple attempts');
      }

      // Redirect to checkout
      window.location.href = '/checkout';
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to cart.';
      
      // Provide more helpful error messages
      if (errorMessage.includes('storage') || errorMessage.includes('quota') || errorMessage.includes('full')) {
        alert('Your browser storage is full. Please clear your browser data or use a different browser, then try again.');
      } else {
        alert(`Failed to add to cart: ${errorMessage}\n\nPlease try again. If the problem persists, try clearing your browser cache.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-[var(--color-brand-700)] min-w-[100px]">
          Quantity:
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center font-semibold"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center border border-gray-300 rounded-lg"
            min="1"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center font-semibold"
          >
            +
          </button>
        </div>
      </div>

      {/* File Upload Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-brand-700)] flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload Required Documents
        </h3>

        {/* Emirates ID */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[var(--color-accent-500)] transition-colors">
          <label className="block font-semibold text-[var(--color-ink)] mb-2">
            Emirates ID <span className="text-red-500">*</span>
          </label>
          <input
            ref={emiratesIdRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileUpload(e, 'emiratesId')}
            className="hidden"
            id="emiratesId"
          />
          {emiratesId ? (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{emiratesId.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile('emiratesId')}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="emiratesId"
              className="flex flex-col items-center justify-center cursor-pointer py-4"
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                Only jpeg, jpg, png, pdf allowed (Max Size: 10MB)
              </span>
            </label>
          )}
        </div>

        {/* Trade License */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[var(--color-accent-500)] transition-colors">
          <label className="block font-semibold text-[var(--color-ink)] mb-2">
            Trade License <span className="text-red-500">*</span>
          </label>
          <input
            ref={tradeLicenseRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileUpload(e, 'tradeLicense')}
            className="hidden"
            id="tradeLicense"
          />
          {tradeLicense ? (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{tradeLicense.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile('tradeLicense')}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="tradeLicense"
              className="flex flex-col items-center justify-center cursor-pointer py-4"
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                Only jpeg, jpg, png, pdf allowed (Max Size: 10MB)
              </span>
            </label>
          )}
        </div>

        {/* Specific Design */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[var(--color-accent-500)] transition-colors">
          <label className="block font-semibold text-[var(--color-ink)] mb-2">
            Specific Design (Optional)
          </label>
          <input
            ref={specificDesignRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileUpload(e, 'specificDesign')}
            className="hidden"
            id="specificDesign"
          />
          {specificDesign ? (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{specificDesign.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile('specificDesign')}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="specificDesign"
              className="flex flex-col items-center justify-center cursor-pointer py-4"
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                Only jpeg, jpg, png, pdf allowed (Max Size: 10MB)
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading || !emiratesId || !tradeLicense}
        className={`w-full btn btn-primary text-lg py-4 ${
          loading || !emiratesId || !tradeLicense
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding to Cart...
          </div>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}


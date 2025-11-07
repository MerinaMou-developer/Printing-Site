"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";

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

export default function CheckoutClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Get cart from localStorage (metadata only)
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const parsed = JSON.parse(cartData);
        const cartArray = Array.isArray(parsed) ? parsed : [parsed];
        
        // Filter out old format items (those with base64 data instead of keys)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validCart = cartArray.filter((item: any) => {
          // Check if it's new format (has 'key' property) or old format (has 'data')
          const isValid = item.emiratesId?.key && item.tradeLicense?.key && !item.emiratesId?.data;
          if (!isValid) {
            console.warn('Found old format cart item, removing it');
          }
          return isValid;
        });
        
        // Update localStorage if we removed invalid items
        if (validCart.length !== cartArray.length) {
          if (validCart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(validCart));
          } else {
            localStorage.removeItem('cart');
          }
        }
        
        setCart(validCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
        // Clear corrupted cart data
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }
  }, []);

  const removeFromCart = async (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Dispatch cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
    
    // NOTE: Old IndexedDB code removed - now using Django API
    // Files are handled by the backend
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Dispatch cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-[var(--color-brand-700)] mb-2">
          Your cart is empty
        </h2>
        <p className="text-[var(--color-ink)]/70 mb-6">
          Add some products to your cart to continue
        </p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cart Items */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-brand-700)] mb-6">
          Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h2>
        
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border-2 border-[var(--border)] rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Product Image */}
                {item.productImg && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={item.productImg}
                      alt={item.productName}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-700)] mb-2">
                    {item.productName}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-[var(--color-ink)]/70 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Emirates ID:</span>
                      <span>{item.emiratesId.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Trade License:</span>
                      <span>{item.tradeLicense.name}</span>
                    </div>
                    {item.specificDesign && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Specific Design:</span>
                        <span>{item.specificDesign.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <label className="font-medium text-sm">Quantity:</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="ml-auto text-red-500 hover:text-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proceed to Checkout */}
      <div className="flex justify-end gap-4 pt-6 border-t border-[var(--border)]">
        <Link href="/products" className="btn btn-outline">
          Continue Shopping
        </Link>
        <button
          onClick={() => router.push('/order')}
          className="btn btn-primary flex items-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

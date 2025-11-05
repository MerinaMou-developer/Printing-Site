"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

type CartItem = {
  productSlug: string;
  productName: string;
  productImg?: string;
  quantity: number;
};

export default function OrderSummaryClient() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const items = JSON.parse(cartData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCart(items.map((item: any) => ({
        productSlug: item.productSlug,
        productName: item.productName,
        productImg: item.productImg,
        quantity: item.quantity
      })));
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-700)] flex items-center gap-2">
        <ShoppingBag className="h-5 w-5" />
        Your Order
      </h2>

      <div className="space-y-4 mb-6">
        {cart.map((item, index) => (
          <div key={index} className="flex items-start gap-3 pb-4 border-b border-[var(--border)] last:border-0">
            {item.productImg && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={item.productImg}
                  alt={item.productName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-[var(--color-brand-700)] truncate">
                {item.productName}
              </h3>
              <p className="text-xs text-[var(--color-ink)]/70 mt-1">
                Qty: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-ink)]">Subtotal:</span>
          <span className="font-semibold">To be confirmed</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-[var(--color-brand-700)]">
          <span>Total:</span>
          <span>To be confirmed</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[var(--color-accent-50)] rounded-lg border border-[var(--color-accent-200)]">
        <p className="text-sm text-[var(--color-ink)]/80">
          <strong>Payment Method:</strong> Cash on Delivery
        </p>
        <p className="text-xs text-[var(--color-ink)]/60 mt-2">
          Pay with cash upon delivery. We&apos;ll contact you to confirm the total amount.
        </p>
      </div>
    </div>
  );
}


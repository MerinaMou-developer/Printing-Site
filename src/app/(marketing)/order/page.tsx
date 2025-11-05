import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import OrderFormClient from "./order-form-client";
import OrderSummaryClient from "./order-summary-client";

export const metadata: Metadata = {
  title: "Place Order - Billing Details | PrintPro Dubai",
  description: "Complete your order by providing billing details. Secure checkout for custom printing services in Dubai.",
};

export default function OrderPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-800)] via-[var(--color-brand-700)] to-[var(--color-brand-600)]" />
        </div>
        
        <div className="wrapper py-12 md:py-16 text-white">
          <Link 
            href="/checkout" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold mb-4">
              <ShoppingBag className="h-4 w-4" />
              Complete Your Order
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Billing Details
            </h1>

            <p className="text-lg text-white/90 leading-relaxed">
              Please provide your billing information to complete your order. We&apos;ll contact you shortly to confirm details and arrange payment.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-400)]" />
                <span>Secure & Safe</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-400)]" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-400)]" />
                <span>Professional Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="wrapper py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Billing Details */}
            <div className="lg:col-span-2">
              <div className="card border-2 border-[var(--border)] p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-brand-700)]">
                  Billing Details
                </h2>
                <OrderFormClient />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="card border-2 border-[var(--border)] p-6 bg-[var(--surface-2)] sticky top-4">
                <OrderSummaryClient />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import CheckoutClient from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout - Place Your Order | PrintPro Dubai",
  description: "Place your custom printing order. Upload your design files and provide order details. Fast turnaround, premium quality in Dubai.",
};

export default function CheckoutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-800)] via-[var(--color-brand-700)] to-[var(--color-brand-600)]" />
        </div>
        
        <div className="wrapper py-12 md:py-16 text-white">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold mb-4">
              <ShoppingBag className="h-4 w-4" />
              Place Your Order
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Checkout & Order
            </h1>

            <p className="text-lg text-white/90 leading-relaxed">
              Submit your order with custom design files. We&apos;ll process your request and contact you within 2-4 hours to confirm details and payment.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-400)]" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-400)]" />
                <span>Secure File Upload</span>
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
        <div className="max-w-3xl mx-auto">
          <div className="card border-2 border-[var(--border)] p-6 md:p-8">
            <CheckoutClient />
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[var(--surface-2)] rounded-xl">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-semibold mb-2">Email Confirmation</h3>
              <p className="text-sm text-[var(--color-ink)]/70">
                You&apos;ll receive an email confirmation after submitting your order
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--surface-2)] rounded-xl">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-2">Quick Response</h3>
              <p className="text-sm text-[var(--color-ink)]/70">
                We&apos;ll contact you within 2-4 hours during business hours
              </p>
            </div>
            <div className="text-center p-6 bg-[var(--surface-2)] rounded-xl">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold mb-2">Order Tracking</h3>
              <p className="text-sm text-[var(--color-ink)]/70">
                Get updates via WhatsApp or email on your order status
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

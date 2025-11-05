"use client";

import { useState, useRef } from "react";
import { useToast } from "./toast-provider";
import { createWhatsAppLink } from "@/lib/whatsapp";
import site from "@/content/site.json";
import { ShoppingCart, Upload, FileText } from "lucide-react";

type Props = {
  defaultProduct?: string;
  productSlug?: string;
};

export default function OrderForm({ defaultProduct, productSlug }: Props) {
  const [pending, setPending] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    const fd = new FormData(e.currentTarget);
    
    // Add product slug if provided
    if (productSlug) {
      fd.append("product_slug", productSlug);
    }
    
    try {
      const res = await fetch("/api/order", { method: "POST", body: fd });
      const data = await res.json();
      
      if (res.ok) {
        showSuccess(
          "Order Submitted! 🎉",
          "Thank you! We'll process your order and contact you within 2-4 hours.",
          {
            duration: 8000,
            action: {
              label: "Contact Us Now",
              onClick: () => {
                const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
                window.open(createWhatsAppLink(phoneNumber, "Hi! I just submitted an order and would like to discuss it further."), "_blank");
              }
            }
          }
        );
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
          setFilePreview(null);
        }
      } else {
        showError(
          "Failed to Submit Order ❌",
          data.error || 'Failed to submit order. Please try again.',
          { duration: 6000 }
        );
      }
    } catch (error) {
      console.error('Order submission error:', error);
      showError(
        "Network Error ❌",
        "Please check your connection and try again.",
        { duration: 6000 }
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      {/* Personal Information */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[var(--color-brand-700)] flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Personal Information
        </h3>
        
        <input 
          name="name" 
          required 
          placeholder="Full Name *" 
          className="input" 
        />
        <input 
          name="phone" 
          required 
          placeholder="Phone / WhatsApp *" 
          className="input" 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          className="input" 
        />
        <input 
          name="address" 
          placeholder="Delivery Address (Optional)" 
          className="input" 
        />
      </div>

      {/* Order Details */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[var(--color-brand-700)] flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Details
        </h3>
        
        <input 
          name="product" 
          defaultValue={defaultProduct}
          placeholder="Product Name *" 
          required
          className="input" 
        />
        <input 
          name="quantity" 
          type="number" 
          min="1"
          placeholder="Quantity *" 
          required
          className="input" 
        />
        <textarea 
          name="specifications" 
          placeholder="Specifications (size, material, colors, special instructions...)" 
          rows={4}
          className="textarea" 
        />
      </div>

      {/* File Upload */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[var(--color-brand-700)] flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Custom File
        </h3>
        
        <div className="space-y-2">
          <input 
            ref={fileInputRef}
            name="file" 
            type="file" 
            accept="image/*,.pdf,.ai,.eps,.psd,.cdr"
            onChange={handleFileChange}
            className="input" 
          />
          <p className="text-xs text-[var(--color-ink)]/60">
            Supported formats: Images (JPG, PNG), PDF, AI, EPS, PSD, CDR. Max size: 10MB
          </p>
          
          {filePreview && (
            <div className="mt-3 p-3 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium mb-2">File Preview:</p>
              <img 
                src={filePreview} 
                alt="Preview" 
                className="max-w-full h-auto max-h-48 rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={pending} 
        className={`w-full btn btn-primary ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {pending ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting Order...
          </div>
        ) : (
          'Submit Order'
        )}
      </button>
      
      <p className="text-xs text-center text-[var(--color-ink)]/60">
        By submitting, you agree to our terms. We&apos;ll contact you to confirm your order and discuss payment.
      </p>
    </form>
  );
}


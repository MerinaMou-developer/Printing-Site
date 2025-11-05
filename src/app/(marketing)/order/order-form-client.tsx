"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/toast-provider";
import { createWhatsAppLink } from "@/lib/whatsapp";
import site from "@/content/site.json";

export default function OrderFormClient() {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    try {
      // Get cart from localStorage
      const cartData = localStorage.getItem('cart');
      if (!cartData) {
        showError("Cart is empty", "Please add items to your cart first.", { duration: 6000 });
        router.push('/checkout');
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cart: any[];
      try {
        const parsed = JSON.parse(cartData);
        cart = Array.isArray(parsed) ? parsed : [parsed];
        if (cart.length === 0) {
          showError("Cart is empty", "Please add items to your cart first.", { duration: 6000 });
          router.push('/checkout');
          return;
        }
      } catch {
        showError("Cart error", "Failed to load cart. Please try again.", { duration: 6000 });
        router.push('/checkout');
        return;
      }
      
      // Import IndexedDB helper
      const { getFile, clearAllFiles } = await import('@/lib/indexeddb');
      
      // Get form data - use formRef to ensure we have a valid form element
      const formElement = formRef.current || e.currentTarget;
      if (!formElement || !(formElement instanceof HTMLFormElement)) {
        showError("Form error", "Unable to access form data. Please refresh the page and try again.", { duration: 6000 });
        setPending(false);
        return;
      }
      
      const fd = new FormData(formElement);
      
      // Fetch all files from IndexedDB in parallel (much faster!)
      // This replaces sequential await calls which were very slow
      const filePromises: Promise<{ index: number; emiratesId: File; tradeLicense: File; specificDesign?: File }>[] = [];
      
      for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        
        // Create promise to fetch all files for this item in parallel
        const itemFilePromise = Promise.all([
          getFile(item.emiratesId.key),
          getFile(item.tradeLicense.key),
          item.specificDesign ? getFile(item.specificDesign.key) : Promise.resolve(null)
        ]).then(([emiratesIdFile, tradeLicenseFile, specificDesignFile]) => {
          if (!emiratesIdFile || !tradeLicenseFile) {
            throw new Error(`Missing required files for ${item.productName}`);
          }
          
          // Validate files are actually File objects
          if (!(emiratesIdFile instanceof File) || !(tradeLicenseFile instanceof File)) {
            console.error('Invalid file objects from IndexedDB:', {
              emiratesIdFile: typeof emiratesIdFile,
              tradeLicenseFile: typeof tradeLicenseFile,
              emiratesIdType: emiratesIdFile?.constructor?.name,
              tradeLicenseType: tradeLicenseFile?.constructor?.name
            });
            throw new Error(`Invalid file format for ${item.productName}. Please add items to cart again.`);
          }
          
          // Validate file sizes
          if (emiratesIdFile.size !== item.emiratesId.size || tradeLicenseFile.size !== item.tradeLicense.size) {
            console.error('File size mismatch:', {
              emiratesId: { expected: item.emiratesId.size, actual: emiratesIdFile.size },
              tradeLicense: { expected: item.tradeLicense.size, actual: tradeLicenseFile.size }
            });
          }
          
          return { 
            index, 
            emiratesId: emiratesIdFile, 
            tradeLicense: tradeLicenseFile, 
            specificDesign: specificDesignFile || undefined 
          };
        }).catch((error) => {
          throw new Error(`Failed to load files for ${item.productName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        });
        
        filePromises.push(itemFilePromise);
      }
      
      // Wait for all files to be fetched in parallel (much faster than sequential!)
      const fileResults = await Promise.all(filePromises);
      
      // Now add products and files to FormData
      for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        const files = fileResults[index];
        
        fd.append(`products[${index}][productSlug]`, item.productSlug);
        fd.append(`products[${index}][productName]`, item.productName);
        fd.append(`products[${index}][quantity]`, item.quantity.toString());
        
        if (files.emiratesId) fd.append(`products[${index}][emiratesId]`, files.emiratesId);
        if (files.tradeLicense) fd.append(`products[${index}][tradeLicense]`, files.tradeLicense);
        if (files.specificDesign) fd.append(`products[${index}][specificDesign]`, files.specificDesign);
      }
      
      const res = await fetch("/api/order", { method: "POST", body: fd });
      const data = await res.json();
      
      if (res.ok) {
        // Clear cart and files after successful submission
        localStorage.removeItem('cart');
        
        // Clear files from IndexedDB
        try {
          await clearAllFiles();
        } catch (error) {
          console.error('Error clearing IndexedDB:', error);
        }
        
        showSuccess(
          "Order Placed Successfully! 🎉",
          "Thank you! We&apos;ll process your order and contact you within 2-4 hours.",
          {
            duration: 8000,
            action: {
              label: "Contact Us Now",
              onClick: () => {
                const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
                window.open(createWhatsAppLink(phoneNumber, "Hi! I just placed an order and would like to discuss it further."), "_blank");
              }
            }
          }
        );
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
        
        // Redirect to thank you page or home
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        showError(
          "Failed to Place Order ❌",
          data.error || 'Failed to place order. Please try again.',
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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="firstName" 
              required 
              placeholder="First Name" 
              className="input" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="lastName" 
              required 
              placeholder="Last Name" 
              className="input" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
            Company Name (Optional)
          </label>
          <input 
            name="companyName" 
            placeholder="Company Name" 
            className="input" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
            Country / Region <span className="text-red-500">*</span>
          </label>
          <select name="country" required className="input">
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Oman">Oman</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Qatar">Qatar</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input 
            name="address1" 
            required 
            placeholder="Street address" 
            className="input mb-2" 
          />
          <input 
            name="address2" 
            placeholder="Apartment, suite, unit, etc. (optional)" 
            className="input" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              Town / City <span className="text-red-500">*</span>
            </label>
            <input 
              name="city" 
              required 
              placeholder="Town / City" 
              className="input" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              State / County (Optional)
            </label>
            <input 
              name="state" 
              placeholder="State / County" 
              className="input" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input 
              name="phone" 
              type="tel"
              required 
              placeholder="Phone" 
              className="input" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input 
              name="email" 
              type="email"
              required 
              placeholder="Email Address" 
              className="input" 
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-brand-700)] mb-4">
          Additional Information
        </h3>
        <label className="block text-sm font-semibold text-[var(--color-ink)] mb-2">
          Order Notes (Optional)
        </label>
        <textarea 
          name="orderNotes" 
          placeholder="Notes about your order, e.g. special notes for delivery."
          rows={4}
          className="textarea" 
        />
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="newsletter" className="mt-1" />
          <span className="text-sm text-[var(--color-ink)]/80">
            I would like to receive exclusive emails with discounts and product information (optional)
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" name="terms" required className="mt-1" />
          <span className="text-sm text-[var(--color-ink)]/80">
            I have read and agree to the website <Link href="/terms" className="text-[var(--color-accent-600)] hover:underline">terms and conditions</Link> <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={pending} 
        className={`w-full btn btn-primary text-lg py-4 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {pending ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Placing Order...
          </div>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}


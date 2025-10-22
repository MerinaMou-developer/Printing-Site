"use client";

import { useState, useRef } from "react";
import { useToast } from "./toast-provider";
import { createWhatsAppLink } from "@/lib/whatsapp";
import site from "@/content/site.json";

type Props = { defaultService?: string };

export default function QuoteForm({ defaultService }: Props) {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showSuccess, showError } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json();
      
      if (res.ok) {
        showSuccess(
          "Quote Request Sent! 🎉",
          "Thank you! We'll contact you within 2-4 hours during business hours.",
          {
            duration: 8000, // Show for 8 seconds
            action: {
              label: "Contact Us Now",
              onClick: () => {
                const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
                window.open(createWhatsAppLink(phoneNumber, "Hi! I just submitted a quote request and would like to discuss it further."), "_blank");
              }
            }
          }
        );
        
        // Reset form using ref instead of e.currentTarget
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        showError(
          "Failed to Send ❌",
          data.error || 'Failed to send. Please try again.',
          { duration: 6000 }
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
        <input 
          name="name" 
          required 
          placeholder="Your name" 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
        <input 
          name="phone" 
          required 
          placeholder="WhatsApp / phone" 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
        <input 
          name="email" 
          type="email" 
          placeholder="Email (optional)" 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
        <input 
          name="service_slug" 
          defaultValue={defaultService} 
          placeholder="Service" 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
        <textarea 
          name="details" 
          placeholder="Details (size, material, qty...)" 
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
        />
        <input 
          name="file" 
          type="file" 
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
        <button 
          disabled={pending} 
          className={`w-full rounded-lg py-3 px-4 font-semibold text-white transition-all duration-200 ${
            pending 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {pending ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            'Get Quote'
          )}
        </button>
    </form>
  );
}

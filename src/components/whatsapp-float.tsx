"use client";

import { useState, useEffect } from "react";
import site from "@/content/site.json";
import { MessageCircle, Phone, X } from "lucide-react";
import { createWhatsAppLink, createPhoneLink, formatPhoneNumber } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // EXACT same variables as contact page - FORCE REFRESH
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const displayPhone = formatPhoneNumber(site.phone ?? phoneNumber);
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");
  const telLink = createPhoneLink(phoneNumber);

  // Debug: Log the generated links
  console.log("WhatsApp Float Debug:", {
    phoneNumber,
    displayPhone,
    waLink,
    telLink,
    sitePhone: site.phone,
    siteWhatsapp: site.whatsapp,
    timestamp: new Date().toISOString()
  });

  // Show after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {/* Phone */}
          <a
            href={telLink}
            className="group flex items-center gap-3 rounded-full bg-white text-[var(--color-brand-700)] shadow-2xl hover:shadow-xl transition-all duration-300 pr-5 pl-4 py-3 hover:scale-105"
            aria-label={`Call ${displayPhone}`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium opacity-70">Call Us</div>
              <div className="text-sm font-bold">{displayPhone}</div>
            </div>
          </a>

          {/* WhatsApp - EXACT same as contact page Message us */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-[var(--color-whatsapp)] text-white shadow-2xl hover:shadow-xl transition-all duration-300 pr-5 pl-4 py-3 hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium opacity-90">Chat on</div>
              <div className="text-sm font-bold">WhatsApp</div>
            </div>
          </a>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group flex items-center gap-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
          isExpanded 
            ? 'bg-red-500 text-white px-5 py-4' 
            : 'bg-[var(--color-whatsapp)] text-white px-5 py-4 animate-pulse-glow'
        }`}
        aria-label={isExpanded ? "Close menu" : "Open contact menu"}
      >
        {isExpanded ? (
          <>
            <X className="h-6 w-6" />
            <span className="font-semibold">Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-6 w-6 animate-pulse" />
            <span className="font-semibold">Contact Us</span>
          </>
        )}
      </button>

      {/* Pulse Ring Animation (when not expanded) */}
      {!isExpanded && (
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-[var(--color-whatsapp)] opacity-75 animate-ping"></div>
        </div>
      )}
    </div>
  );
}

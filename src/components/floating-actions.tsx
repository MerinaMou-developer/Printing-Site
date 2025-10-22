"use client";
import { Phone, MessageCircle } from "lucide-react";
import site from "@/content/site.json";
import { createWhatsAppLink, createPhoneLink } from "@/lib/whatsapp";

export default function FloatingActions() {
  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, "Hi! I'm interested in your printing services. Can you help me?");
  const telLink = createPhoneLink(phoneNumber);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-3 bg-[#25D366] text-white shadow-lg hover:opacity-90"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={telLink}
        className="rounded-full p-3 bg-[var(--color-brand-500)] text-white shadow-lg hover:opacity-90"
        aria-label="Call"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}

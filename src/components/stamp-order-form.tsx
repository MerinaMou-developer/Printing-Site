"use client";

import site from "@/content/site.json";
import { MessageCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "./toast-provider";

const STAMP_TYPES = [
  "Company Stamp",
  "Self-Inking Stamp",
  "Date Stamp",
  "Rubber Stamp",
  "Pocket Stamp",
  "Trodat / Shiny Dater Stamp",
  "Printing / Signage (other)",
] as const;

const BUSINESS_PHONE = site.whatsapp ?? site.phone ?? "+971569324947";

function openWhatsAppWithOrder(message: string) {
  const digits = BUSINESS_PHONE.replace(/[^\d]/g, "");
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function buildMessage(data: {
  name: string;
  phone: string;
  email?: string;
  stampType: string;
  companyName?: string;
  quantity: string;
  notes?: string;
  hasFile?: boolean;
}): string {
  const lines = [
    "Hello PrimePrint Dubai! I want to place an order:",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
  ];
  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push(`Stamp type: ${data.stampType}`);
  if (data.companyName) lines.push(`Company name on stamp: ${data.companyName}`);
  lines.push(`Quantity: ${data.quantity}`);
  if (data.notes) lines.push(`Notes: ${data.notes}`);
  if (data.hasFile) lines.push("(Design file attached on website — please check email)");
  lines.push("", "Please send me price and delivery time. Thank you!");
  return lines.join("\n");
}

type Props = {
  defaultStampType?: string;
};

export default function StampOrderForm({ defaultStampType }: Props) {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showSuccess, showError } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      const form = formRef.current;
      if (!form) {
        showError("Error", "Form not found. Please refresh the page.");
        return;
      }

      const fd = new FormData(form);
      const name = String(fd.get("name") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();
      const stampType = String(fd.get("stampType") ?? "").trim();
      const quantity = String(fd.get("quantity") ?? "1").trim() || "1";
      const companyName = String(fd.get("companyName") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      const notes = String(fd.get("notes") ?? "").trim();
      const file = fd.get("file");
      const hasFile = file instanceof File && file.size > 0;

      if (!name || !phone || !stampType) {
        showError("Missing details", "Please fill name, phone, and stamp type.");
        return;
      }

      const specifications = [
        companyName ? `Company on stamp: ${companyName}` : "",
        notes ? `Notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      fd.set("product", stampType);
      fd.set("quantity", quantity);
      fd.set("specifications", specifications);

      const message = buildMessage({
        name,
        phone,
        email: email || undefined,
        stampType,
        companyName: companyName || undefined,
        quantity,
        notes: notes || undefined,
        hasFile,
      });

      // Email backup (optional — does not block WhatsApp)
      fetch("/api/order", { method: "POST", body: fd }).catch(() => {});

      openWhatsAppWithOrder(message);

      showSuccess(
        "Order sent on WhatsApp!",
        "WhatsApp opened with your order. Tap Send in WhatsApp and we will reply shortly.",
        { duration: 10000 }
      );

      form.reset();
    } catch (err) {
      console.error("Order form error:", err);
      showError(
        "Something went wrong",
        "Please message us on WhatsApp directly using the button below the form."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input name="name" required placeholder="Ahmed Ali" className="input" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            WhatsApp / Phone <span className="text-red-500">*</span>
          </label>
          <input name="phone" required placeholder="05x xxx xxxx" className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Email <span className="text-[var(--color-ink)]/50 font-normal">(optional)</span>
        </label>
        <input name="email" type="email" placeholder="you@email.com" className="input" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Stamp Type <span className="text-red-500">*</span>
          </label>
          <select
            name="stampType"
            required
            defaultValue={defaultStampType || STAMP_TYPES[0]}
            className="input"
          >
            {STAMP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input name="quantity" type="number" min="1" defaultValue="1" required className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Company Name on Stamp{" "}
          <span className="text-[var(--color-ink)]/50 font-normal">(if company stamp)</span>
        </label>
        <input name="companyName" placeholder="ABC Trading LLC" className="input" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Special Instructions</label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Size, color, urgent/same-day, delivery area..."
          className="textarea"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Logo / Design{" "}
          <span className="text-[var(--color-ink)]/50 font-normal">(optional)</span>
        </label>
        <input name="file" type="file" accept="image/*,.pdf,.ai,.eps,.cdr" className="input" />
        <p className="text-xs text-[var(--color-ink)]/60 mt-1">
          Or send your file on WhatsApp after submitting.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full btn btn-primary text-lg py-4 flex items-center justify-center gap-2 ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        {pending ? "Opening WhatsApp..." : "Order Now via WhatsApp"}
      </button>

      <p className="text-xs text-center text-[var(--color-ink)]/60">
        WhatsApp opens instantly with your order. No payment online — we confirm price on WhatsApp.
      </p>
    </form>
  );
}

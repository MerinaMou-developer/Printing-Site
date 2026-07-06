"use client";

import site from "@/content/site.json";
import type { Product } from "@/types";
import { MessageCircle, Upload, X, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "./toast-provider";

const BUSINESS_PHONE = site.whatsapp ?? site.phone ?? "+971569324947";

type UploadedFile = { name: string; file: File };

type Props = {
  product: Product;
};

function openWhatsApp(message: string) {
  const digits = BUSINESS_PHONE.replace(/[^\d]/g, "");
  window.open(
    `https://wa.me/${digits}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function buildMessage(data: {
  productName: string;
  name: string;
  phone: string;
  email?: string;
  quantity: number;
  emiratesIdName: string;
  tradeLicenseName: string;
  designName?: string;
}): string {
  const lines = [
    `Hello PrimePrint Dubai! I want to order: ${data.productName}`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
  ];
  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push(`Quantity: ${data.quantity}`);
  lines.push("");
  lines.push("Documents:");
  lines.push(`- Emirates ID: ${data.emiratesIdName}`);
  lines.push(`- Trade License: ${data.tradeLicenseName}`);
  if (data.designName) lines.push(`- Design file: ${data.designName}`);
  lines.push("");
  lines.push(
    "I will attach my Emirates ID and Trade License files here in WhatsApp now (tap the paperclip icon)."
  );
  lines.push("");
  lines.push("Please send price and ready time. Thank you!");
  return lines.join("\n");
}

function FileField({
  id,
  label,
  required,
  file,
  onPick,
  onRemove,
}: {
  id: string;
  label: string;
  required?: boolean;
  file: UploadedFile | null;
  onPick: (f: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!allowed.includes(f.type)) {
      alert("Only JPEG, JPG, PNG, and PDF files are allowed");
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      alert("File must be under 4MB");
      return;
    }
    onPick(f);
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <label className="block font-semibold text-[var(--color-ink)] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleChange}
        className="hidden"
      />
      {file ? (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="h-5 w-5 text-green-600 shrink-0" />
            <span className="text-sm font-medium truncate">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onRemove();
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-red-500 hover:text-red-700 shrink-0 ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center cursor-pointer py-4 hover:bg-gray-50 rounded-lg"
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">Click to upload</span>
          <span className="text-xs text-gray-400 mt-1">JPG, PNG, PDF — max 4MB</span>
        </label>
      )}
    </div>
  );
}

export default function ProductDetailForm({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [emiratesId, setEmiratesId] = useState<UploadedFile | null>(null);
  const [tradeLicense, setTradeLicense] = useState<UploadedFile | null>(null);
  const [specificDesign, setSpecificDesign] = useState<UploadedFile | null>(null);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showSuccess, showError } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      if (!emiratesId || !tradeLicense) {
        showError("Documents required", "Please upload Emirates ID and Trade License.");
        return;
      }

      const form = formRef.current;
      if (!form) return;

      const fd = new FormData(form);
      const name = String(fd.get("name") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();

      if (!name || !phone) {
        showError("Missing details", "Please enter your name and phone.");
        return;
      }

      fd.set("product", product.name);
      fd.set("product_slug", product.slug);
      fd.set("quantity", String(quantity));
      fd.set("emiratesId", emiratesId.file, emiratesId.name);
      fd.set("tradeLicense", tradeLicense.file, tradeLicense.name);
      if (specificDesign) {
        fd.set("specificDesign", specificDesign.file, specificDesign.name);
      }
      fd.set(
        "specifications",
        [
          `Emirates ID: ${emiratesId.name}`,
          `Trade License: ${tradeLicense.name}`,
          specificDesign ? `Design: ${specificDesign.name}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );

      const message = buildMessage({
        productName: product.name,
        name,
        phone,
        email: email || undefined,
        quantity,
        emiratesIdName: emiratesId.name,
        tradeLicenseName: tradeLicense.name,
        designName: specificDesign?.name,
      });

      // Email documents to shop (background — optional if SMTP not set)
      fetch("/api/order", { method: "POST", body: fd }).catch(() => {});

      openWhatsApp(message);

      showSuccess(
        "WhatsApp opened!",
        "Send the message, then tap the paperclip in WhatsApp to attach your Emirates ID and Trade License files.",
        { duration: 12000 }
      );

      form.reset();
      setQuantity(1);
      setEmiratesId(null);
      setTradeLicense(null);
      setSpecificDesign(null);
    } catch (err) {
      console.error(err);
      showError("Error", "Something went wrong. Please WhatsApp us directly.");
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
          <input name="name" required placeholder="Your name" className="input" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            WhatsApp / Phone <span className="text-red-500">*</span>
          </label>
          <input name="phone" required placeholder="05x xxx xxxx" className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Email (optional)</label>
        <input name="email" type="email" placeholder="you@email.com" className="input" />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-semibold text-[var(--color-brand-700)] min-w-[80px]">
          Quantity:
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-semibold"
          >
            -
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 font-semibold"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-[var(--color-brand-700)]">Upload Documents</h3>
        <FileField
          id="emiratesId"
          label="Emirates ID"
          required
          file={emiratesId}
          onPick={(f) => setEmiratesId({ name: f.name, file: f })}
          onRemove={() => setEmiratesId(null)}
        />
        <FileField
          id="tradeLicense"
          label="Trade License"
          required
          file={tradeLicense}
          onPick={(f) => setTradeLicense({ name: f.name, file: f })}
          onRemove={() => setTradeLicense(null)}
        />
        <FileField
          id="specificDesign"
          label="Specific Design (optional)"
          file={specificDesign}
          onPick={(f) => setSpecificDesign({ name: f.name, file: f })}
          onRemove={() => setSpecificDesign(null)}
        />
      </div>

      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
        After WhatsApp opens, tap the <strong>paperclip</strong> icon and attach your
        Emirates ID and Trade License files. WhatsApp cannot auto-attach files from the
        website.
      </div>

      <button
        type="submit"
        disabled={pending || !emiratesId || !tradeLicense}
        className={`w-full btn btn-primary text-lg py-4 flex items-center justify-center gap-2 ${
          pending || !emiratesId || !tradeLicense ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        {pending ? "Opening WhatsApp..." : "Order via WhatsApp"}
      </button>
    </form>
  );
}

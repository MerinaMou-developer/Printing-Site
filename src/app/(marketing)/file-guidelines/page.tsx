import type { Metadata } from "next";
import { FileCheck, AlertCircle, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "File Guidelines & Specifications | Dubai Printing",
  description: "Learn how to prepare your files for printing. CMYK, vector formats, bleed requirements, and accepted file types for perfect print results.",
  alternates: { canonical: "/file-guidelines" },
};

export default function FileGuidelinesPage() {
  const fileFormats = [
    { format: "AI (Adobe Illustrator)", recommended: true, notes: "Best for logos and vector graphics" },
    { format: "PDF (Print-Ready)", recommended: true, notes: "Embed fonts, CMYK, with bleed" },
    { format: "EPS", recommended: true, notes: "Good for vector artwork" },
    { format: "PSD (Photoshop)", acceptable: true, notes: "Flatten layers, 300 DPI minimum" },
    { format: "PNG", acceptable: true, notes: "High resolution (300 DPI), transparent background" },
    { format: "JPG/JPEG", acceptable: true, notes: "300 DPI minimum, watch for compression artifacts" },
    { format: "Word/PPT", notRecommended: true, notes: "May require file conversion, quality not guaranteed" },
  ];

  const quickChecklist = [
    "CMYK color mode (not RGB)",
    "300 DPI resolution minimum for images",
    "3mm bleed on all sides",
    "All fonts converted to outlines/curves",
    "No spelling or grammatical errors",
    "Crop marks and guidelines removed",
  ];

  const colorModes = [
    {
      name: "CMYK",
      recommended: true,
      description: "For all print projects. Uses Cyan, Magenta, Yellow, and Black inks.",
      icon: "🎨",
    },
    {
      name: "RGB",
      recommended: false,
      description: "For digital/screen use only. Colors will shift when converted to CMYK.",
      icon: "🖥️",
    },
    {
      name: "Pantone",
      recommended: true,
      description: "For brand-specific spot colors. Discuss availability with us first.",
      icon: "🎯",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-900)] via-[var(--color-brand-800)] to-[var(--color-brand-700)] gradient-animate" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="wrapper py-16 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold">
              <FileCheck className="h-4 w-4" />
              File Guidelines
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
              How to Prepare <span className="bg-gradient-to-r from-[var(--color-accent-300)] to-white bg-clip-text text-transparent">Print-Ready Files</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed">
              Follow these guidelines to ensure your files print perfectly the first time
            </p>
          </div>
        </div>
      </section>

      {/* Quick Checklist */}
      <section className="wrapper py-12 -mt-8">
        <div className="rounded-2xl bg-white border-2 border-[var(--color-accent-400)] p-8 md:p-10 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)]">
              <CheckCircle2 className="h-7 w-7 text-[var(--color-accent-700)]" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-brand-700)]">Pre-Flight Checklist</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {quickChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-[var(--color-ink)]/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted File Formats */}
      <section className="wrapper py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Accepted File Formats</h2>
          <p className="text-[var(--color-ink)]/70">
            We accept various file formats, but some work better than others for print quality
          </p>
        </div>

        <div className="space-y-3">
          {fileFormats.map((format, idx) => (
            <div
              key={idx}
              className={`rounded-xl border-2 p-5 transition-all duration-300 ${
                format.recommended
                  ? 'border-green-400 bg-green-50 hover:shadow-md'
                  : format.acceptable
                  ? 'border-blue-400 bg-blue-50 hover:shadow-md'
                  : 'border-orange-400 bg-orange-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                  format.recommended
                    ? 'bg-green-100'
                    : format.acceptable
                    ? 'bg-blue-100'
                    : 'bg-orange-100'
                }`}>
                  <FileText className={`h-6 w-6 ${
                    format.recommended
                      ? 'text-green-700'
                      : format.acceptable
                      ? 'text-blue-700'
                      : 'text-orange-700'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{format.format}</h3>
                    {format.recommended && (
                      <span className="px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-semibold">
                        Recommended
                      </span>
                    )}
                    {format.acceptable && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                        Acceptable
                      </span>
                    )}
                    {format.notRecommended && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white text-xs font-semibold">
                        Not Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-ink)]/70">{format.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Color Modes */}
      <section className="bg-[var(--surface-2)] py-12">
        <div className="wrapper">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Color Modes Explained</h2>
            <p className="text-[var(--color-ink)]/70">
              Understanding color modes is crucial for accurate print colors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {colorModes.map((mode, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border-2 ${
                  mode.recommended
                    ? 'border-green-400 bg-white hover:shadow-lg'
                    : 'border-orange-400 bg-white'
                } transition-all duration-300`}
              >
                <div className="text-4xl mb-4">{mode.icon}</div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {mode.name}
                  {mode.recommended ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  )}
                </h3>
                <p className="text-sm text-[var(--color-ink)]/70 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resolution & Bleed */}
      <section className="wrapper py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Resolution */}
          <div className="card border-2 border-[var(--border)] hover:border-[var(--color-accent-400)] transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 mb-4">
              <ImageIcon className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Image Resolution</h3>
            <div className="space-y-3 text-[var(--color-ink)]/80">
              <p><strong className="text-green-600">✓ 300 DPI or higher</strong> - Perfect for print</p>
              <p><strong className="text-orange-600">⚠ 150-299 DPI</strong> - May show pixelation</p>
              <p><strong className="text-red-600">✗ Below 150 DPI</strong> - Will look blurry</p>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm"><strong>Pro Tip:</strong> Always save images at actual print size with 300 DPI. Upscaling low-res images doesn&apos;t improve quality!</p>
              </div>
            </div>
          </div>

          {/* Bleed */}
          <div className="card border-2 border-[var(--border)] hover:border-[var(--color-accent-400)] transition-colors">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 mb-4">
              <FileCheck className="h-7 w-7 text-purple-700" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Bleed & Safe Area</h3>
            <div className="space-y-3 text-[var(--color-ink)]/80">
              <p><strong>Bleed:</strong> 3mm extra on all sides</p>
              <p><strong>Safe Area:</strong> Keep text/logos 5mm from edge</p>
              <p><strong>Trim Marks:</strong> Remove before sending files</p>
              <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-200">
                <p className="text-sm"><strong>Why?</strong> Printing presses can shift slightly during cutting. Bleed ensures no white edges appear if trimming isn&apos;t perfect.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="wrapper py-12">
        <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-red-900">Common Mistakes to Avoid</h2>
              <p className="text-red-800/80">These issues cause delays and reprints. Double-check before submitting!</p>
            </div>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Using RGB instead of CMYK",
              "Low resolution images (under 300 DPI)",
              "No bleed or safe area margins",
              "Fonts not converted to outlines",
              "Spelling or grammar errors",
              "Wrong file dimensions",
              "Compressed JPG artifacts",
              "Missing linked images in AI/PSD",
            ].map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2 text-red-900/80">
                <span className="text-red-600 font-bold mt-0.5">✗</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Help CTA */}
      <section className="wrapper pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] p-12 md:p-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Your Files?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our design team can check your files for free and help you prepare them for perfect printing
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="btn btn-primary text-lg px-8 py-4">
                Send Your Files
              </a>
              <a href={createWhatsAppLink(site.whatsapp ?? site.phone ?? "+971569324947", "Hi! I need help with my print files. Can you check them for me?")} target="_blank" rel="noopener noreferrer" className="btn glass text-white text-lg px-8 py-4">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


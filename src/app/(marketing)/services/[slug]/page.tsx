import type { Metadata } from "next";
import data from "@/content/services.json";
import type { Service } from "@/types";
import Link from "next/link";
import site from "@/content/site.json";
import { CheckCircle2, Star, Clock, Shield, Truck, Palette, Zap, Award, Users, ArrowRight, Download, Phone, Mail, MessageCircle } from "lucide-react";
import { createWhatsAppLink, createPhoneLink, formatPhoneNumber } from "@/lib/whatsapp";

const services = data as Service[];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} Dubai | PrintPro Dubai - ${s.category}`,
    description: `${s.desc} - Professional ${s.name} services by PrintPro Dubai in Dubai. Fast turnaround, competitive prices, professional installation. Get a free quote today!`,
    keywords: [
      `${s.name} Dubai`,
      `${s.name} UAE`,
      `${s.category} Dubai`,
      `PrintPro Dubai ${s.name}`,
      `professional ${s.name} Dubai`,
      `best ${s.name} company Dubai`,
    ],
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) {
    return <div className="wrapper py-14">Not found</div>;
  }

  const phoneNumber = site.whatsapp ?? site.phone ?? "+971569324947";
  const waLink = createWhatsAppLink(phoneNumber, `Hi! I'm interested in your ${s.name} service. Can you help me?`);

  // Generate service-specific images and content
  const serviceImages = [
    { src: `/images/services/${s.slug}/1.jpg`, alt: `${s.name} Example 1` },
    { src: `/images/services/${s.slug}/2.jpg`, alt: `${s.name} Example 2` },
    { src: `/images/services/${s.slug}/3.jpg`, alt: `${s.name} Example 3` },
    { src: `/images/services/${s.slug}/4.jpg`, alt: `${s.name} Example 4` },
  ];

  const specifications = {
    "screen-printing": {
      materials: ["Cotton", "Polyester", "Blends", "Performance fabrics"],
      sizes: ["XS to 5XL", "Custom sizes available"],
      turnaround: "3-5 business days",
      moq: "10 pieces minimum",
      colors: "Unlimited colors",
      finishes: ["Standard", "Metallic", "Glow-in-dark", "Reflective"]
    },
    "dtf-print": {
      materials: ["Cotton", "Polyester", "Blends", "Denim"],
      sizes: ["XS to 5XL", "Custom sizes available"],
      turnaround: "2-4 business days",
      moq: "5 pieces minimum",
      colors: "Full color printing",
      finishes: ["Standard", "Metallic", "Glossy", "Matte"]
    },
    "vinyl-stickers": {
      materials: ["Vinyl", "Chrome", "Clear", "Reflective"],
      sizes: ["Any size up to 150cm wide"],
      turnaround: "1-3 business days",
      moq: "10 pieces minimum",
      colors: "Full color printing",
      finishes: ["Glossy", "Matte", "Chrome", "Reflective"]
    },
    "banners": {
      materials: ["PVC", "Mesh", "Canvas", "Vinyl"],
      sizes: ["Any size", "Standard sizes available"],
      turnaround: "2-4 business days",
      moq: "1 piece minimum",
      colors: "Full color printing",
      finishes: ["Standard", "Laminated", "Eyelets included"]
    },
    "business-cards": {
      materials: ["Premium cardstock", "Luxury paper", "Plastic"],
      sizes: ["Standard 85x55mm", "Custom sizes"],
      turnaround: "1-3 business days",
      moq: "100 pieces minimum",
      colors: "Full color printing",
      finishes: ["Matte", "Glossy", "Textured", "Spot UV", "Foil stamping"]
    },
    "led-light-box": {
      materials: ["Acrylic", "Aluminum frame", "LED strips"],
      sizes: ["Any size up to 2m x 3m"],
      turnaround: "5-10 business days",
      moq: "1 piece minimum",
      colors: "Full color printing",
      finishes: ["Standard", "Premium", "Weatherproof"]
    }
  };

  const currentSpecs = specifications[s.slug as keyof typeof specifications] || {
    materials: ["Premium materials"],
    sizes: ["Various sizes available"],
    turnaround: "2-5 business days",
    moq: "Contact for minimums",
    colors: "Full color printing",
    finishes: ["Multiple finish options"]
  };

  return (
    <>
      {/* Enhanced Service Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-brand-800)] via-[var(--color-brand-700)] to-[var(--color-brand-600)]" />
        <div className="absolute inset-0 -z-10 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="wrapper py-16 md:py-20 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 glass px-4 py-2 text-xs uppercase tracking-wider font-semibold">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-400)] animate-pulse"></span>
            {s.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional <span className="text-[var(--color-accent-400)]">{s.name}</span> in Dubai
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                {s.desc} High-quality materials, fast turnaround, and professional installation across Dubai.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary text-lg px-8 py-4 animate-pulse-glow shadow-xl hover:shadow-2xl transition-all">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            {waLink && (
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn glass text-white text-lg px-8 py-4 hover:bg-white/15 transition-all">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Us
              </a>
            )}
          </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-accent-400)]">500+</div>
                  <div className="text-sm text-white/80">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-accent-400)]">10+</div>
                  <div className="text-sm text-white/80">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-accent-400)]">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image Gallery */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-[var(--color-brand-600)]">{s.name.charAt(0)}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)] group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Palette className="h-12 w-12 text-[var(--color-accent-600)]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)] group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="h-12 w-12 text-[var(--color-accent-600)]" />
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Award className="h-12 w-12 text-[var(--color-brand-600)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Gallery */}
      <section className="wrapper py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-brand-700)]">
            Our {s.name} Work
          </h2>
          <p className="text-lg text-[var(--color-ink)]/70 max-w-2xl mx-auto">
            See examples of our professional {s.name.toLowerCase()} work for clients across Dubai
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceImages.map((image, index) => (
            <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-[var(--color-brand-600)]">
                  {s.name.charAt(0)}{index + 1}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <ArrowRight className="h-6 w-6 text-[var(--color-brand-600)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Details */}
      <section className="wrapper py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What We Offer */}
            <div className="card border-2 border-[var(--border)] p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-brand-700)] flex items-center gap-3">
                <Star className="h-8 w-8 text-[var(--color-accent-500)]" />
                What We Offer
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    Service Includes
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Professional design consultation",
                      "Material & size recommendations", 
                      "MOQ & turnaround information",
                      "Competitive pricing & quotes",
                      "Installation & delivery across Dubai",
                      "Quality assurance & testing",
                      "After-sales support & maintenance"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--color-ink)]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Award className="h-6 w-6 text-[var(--color-accent-500)]" />
                    Why Choose PrintPro Dubai
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "10+ years of industry experience",
                      "500+ satisfied clients across Dubai",
                      "State-of-the-art equipment & technology",
                      "Free design consultation & mockups",
                      "Fast turnaround times",
                      "100% satisfaction guarantee",
                      "Competitive pricing with no hidden costs"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--color-ink)]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="card border-2 border-[var(--border)] p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-brand-700)] flex items-center gap-3">
                <Palette className="h-8 w-8 text-[var(--color-accent-500)]" />
                Specifications & Options
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Materials
                  </h3>
                  <ul className="space-y-2">
                    {currentSpecs.materials.map((material, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-500)]"></div>
                        <span className="text-[var(--color-ink)]/80">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Sizes
                  </h3>
                  <ul className="space-y-2">
                    {currentSpecs.sizes.map((size, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-500)]"></div>
                        <span className="text-[var(--color-ink)]/80">{size}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Turnaround
                  </h3>
                  <div className="bg-gradient-to-r from-[var(--color-accent-50)] to-[var(--color-accent-100)] p-4 rounded-xl border border-[var(--color-accent-200)]">
                    <div className="text-lg font-bold text-[var(--color-accent-600)]">{currentSpecs.turnaround}</div>
                    <div className="text-sm text-[var(--color-ink)]/70">Standard delivery time</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Minimum Order
                  </h3>
                  <div className="bg-gradient-to-r from-[var(--color-brand-50)] to-[var(--color-brand-100)] p-4 rounded-xl border border-[var(--color-brand-200)]">
                    <div className="text-lg font-bold text-[var(--color-brand-600)]">{currentSpecs.moq}</div>
                    <div className="text-sm text-[var(--color-ink)]/70">For best pricing</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Colors
                  </h3>
                  <div className="bg-gradient-to-r from-[var(--color-accent-50)] to-[var(--color-accent-100)] p-4 rounded-xl border border-[var(--color-accent-200)]">
                    <div className="text-lg font-bold text-[var(--color-accent-600)]">{currentSpecs.colors}</div>
                    <div className="text-sm text-[var(--color-ink)]/70">High-quality printing</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--color-brand-600)] flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Finishes
                  </h3>
                  <ul className="space-y-2">
                    {currentSpecs.finishes.map((finish, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-500)]"></div>
                        <span className="text-[var(--color-ink)]/80">{finish}</span>
                      </li>
                    ))}
          </ul>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="card border-2 border-[var(--border)] p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-brand-700)] flex items-center gap-3">
                <Clock className="h-8 w-8 text-[var(--color-accent-500)]" />
                Our Process
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Consultation", desc: "Free design consultation and quote", icon: MessageCircle },
                  { step: "2", title: "Design", desc: "Custom design or artwork preparation", icon: Palette },
                  { step: "3", title: "Production", desc: "High-quality printing and manufacturing", icon: Zap },
                  { step: "4", title: "Delivery", desc: "Installation and delivery across Dubai", icon: Truck },
                ].map((process, idx) => (
                  <div key={idx} className="text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--color-accent-500)] to-[var(--color-accent-600)] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {process.step}
                      </div>
                      <process.icon className="h-6 w-6 text-[var(--color-accent-500)] absolute -top-2 -right-2 bg-white rounded-full p-1" />
                    </div>
                    <h3 className="font-bold text-lg text-[var(--color-brand-700)]">{process.title}</h3>
                    <p className="text-sm text-[var(--color-ink)]/70">{process.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced FAQs */}
            <div className="card border-2 border-[var(--border)] p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-brand-700)] flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-[var(--color-accent-500)]" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {[
                  { q: `What is the minimum order quantity for ${s.name.toLowerCase()}?`, a: `Our minimum order quantity varies by service type. For ${s.name.toLowerCase()}, we typically require ${currentSpecs.moq}. Contact us for specific requirements.` },
                  { q: `How long does ${s.name.toLowerCase()} take?`, a: `Our standard turnaround time for ${s.name.toLowerCase()} is ${currentSpecs.turnaround}. Rush orders may be available for an additional fee.` },
                  { q: `Do you provide design services?`, a: "Yes! We offer free design consultation and can create custom designs for your project. Our experienced designers will work with you to bring your vision to life." },
                  { q: "Do you deliver across Dubai?", a: "Yes, we provide delivery and installation services across Dubai, including all major areas like Downtown, Marina, JBR, and surrounding emirates." },
                  { q: "What file formats do you accept?", a: "We accept all major file formats including PDF, AI, EPS, PSD, and high-resolution images. We also provide file preparation services if needed." },
                  { q: "Do you offer bulk discounts?", a: "Yes, we offer competitive pricing for bulk orders. The larger the quantity, the better the price per unit. Contact us for a detailed quote." }
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border-2 border-[var(--border)] p-6 bg-white hover:border-[var(--color-accent-400)] transition-all duration-300">
                    <summary className="font-semibold cursor-pointer flex items-center justify-between text-[var(--color-brand-700)] group-hover:text-[var(--color-accent-600)] text-lg">
                      {faq.q}
                      <svg className="w-6 h-6 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-[var(--color-ink)]/80 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
        </div>

          {/* Enhanced Sidebar */}
        <div className="space-y-6">
            {/* Service Overview Card */}
            <div className="card border-2 border-[var(--border)] p-6 rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-[var(--color-brand-600)]">{s.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="font-bold text-xl text-center text-[var(--color-brand-700)] mb-2">{s.name}</h3>
              <p className="text-center text-[var(--color-ink)]/70 text-sm">{s.desc}</p>
          </div>

            {/* Key Benefits */}
            <div className="card border-2 border-[var(--border)] p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-[var(--color-brand-700)] flex items-center gap-2">
                <Star className="h-6 w-6 text-[var(--color-accent-500)]" />
                Key Benefits
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: "Fast turnaround times", color: "green" },
                  { icon: Palette, text: "Free design consultation", color: "blue" },
                  { icon: Shield, text: "Quality guarantee", color: "purple" },
                  { icon: Truck, text: "Delivery & installation", color: "orange" },
                  { icon: Users, text: "Expert team support", color: "pink" },
                  { icon: Award, text: "10+ years experience", color: "yellow" }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-50)] to-[var(--color-accent-100)] border border-[var(--color-accent-200)] hover:shadow-md transition-all">
                    <benefit.icon className={`h-5 w-5 text-${benefit.color}-600 flex-shrink-0`} />
                    <span className="text-sm font-medium text-[var(--color-brand-700)]">{benefit.text}</span>
              </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div className="card border-2 border-[var(--color-accent-400)] bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)] p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)] flex items-center gap-2">
                <Zap className="h-6 w-6 text-[var(--color-accent-600)]" />
                Pricing
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-ink)]/80">Starting from:</span>
                  <span className="font-bold text-[var(--color-accent-600)]">AED 50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-ink)]/80">Bulk discounts:</span>
                  <span className="font-bold text-green-600">Up to 30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-ink)]/80">Free delivery:</span>
                  <span className="font-bold text-green-600">Dubai only</span>
                </div>
              </div>
              <p className="text-sm text-[var(--color-ink)]/70 mb-4">
                Get a detailed quote for your specific requirements
              </p>
              <div className="space-y-3">
                <Link href="/contact" className="btn btn-primary w-full text-center flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Get Free Quote
                </Link>
                {waLink && (
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full text-center flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="card border-2 border-[var(--border)] p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-brand-700)]">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <span className="text-[var(--color-ink)]/80">{site.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <span className="text-[var(--color-ink)]/80">{site.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[var(--color-accent-600)]" />
                  <span className="text-[var(--color-ink)]/80">WhatsApp Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-[var(--surface-2)] py-16">
        <div className="wrapper">
          <h2 className="text-3xl font-bold mb-4 text-center text-[var(--color-brand-700)]">Related Services</h2>
          <p className="text-lg text-[var(--color-ink)]/70 text-center mb-12 max-w-2xl mx-auto">
            Explore our other professional printing and signage services
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {services
              .filter(service => service.category === s.category && service.slug !== s.slug)
              .slice(0, 3)
              .map(related => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group card card-hover border-2 border-[var(--border)] hover:border-[var(--color-accent-400)] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-[var(--color-brand-600)]">{related.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--color-accent-600)] transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-sm text-[var(--color-ink)]/70 line-clamp-2">
                    {related.desc}
                  </p>
                </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

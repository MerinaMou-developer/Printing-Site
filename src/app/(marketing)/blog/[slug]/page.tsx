import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

// This would normally come from a CMS or markdown files
const blogPosts: Record<string, {
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}> = {
  "dtf-vs-screen-printing-dubai": {
    title: "DTF vs Screen Printing: Which is Best for Your Business in Dubai?",
    excerpt: "Confused between DTF and screen printing? Learn the pros, cons, costs, and best use cases for each method.",
    content: `
      <h2>Introduction</h2>
      <p>When it comes to custom apparel printing in Dubai, two methods dominate the market: Direct-to-Film (DTF) and Screen Printing. Both have their unique advantages, and choosing the right one can significantly impact your costs, quality, and turnaround time.</p>

      <h2>What is DTF Printing?</h2>
      <p>Direct-to-Film (DTF) is a relatively new printing method that involves printing your design onto a special film, then transferring it to fabric using heat and pressure. It's quickly becoming popular for its versatility and vibrant colors.</p>

      <h3>Advantages of DTF:</h3>
      <ul>
        <li><strong>No minimum order quantity</strong> - Perfect for small batches or single items</li>
        <li><strong>Works on any fabric</strong> - Cotton, polyester, blends, dark or light colors</li>
        <li><strong>Excellent color vibrancy</strong> - Full-color designs with fine details</li>
        <li><strong>Fast turnaround</strong> - No screen preparation needed</li>
        <li><strong>Soft feel</strong> - Modern DTF produces a softer hand-feel than traditional prints</li>
      </ul>

      <h3>Disadvantages of DTF:</h3>
      <ul>
        <li>Slightly higher cost per unit for large orders (100+ pieces)</li>
        <li>Durability can vary based on film quality</li>
      </ul>

      <h2>What is Screen Printing?</h2>
      <p>Screen printing is a traditional method that has been the industry standard for decades. It involves creating screens for each color in your design and applying ink through them onto the fabric.</p>

      <h3>Advantages of Screen Printing:</h3>
      <ul>
        <li><strong>Most cost-effective for bulk orders</strong> - Price per unit drops significantly above 50 pieces</li>
        <li><strong>Extremely durable</strong> - Withstands hundreds of washes when done properly</li>
        <li><strong>Vibrant, opaque prints</strong> - Especially on dark fabrics</li>
        <li><strong>Special effects available</strong> - Metallic, glow-in-the-dark, puff prints, etc.</li>
        <li><strong>Proven track record</strong> - Decades of reliability</li>
      </ul>

      <h3>Disadvantages of Screen Printing:</h3>
      <ul>
        <li>Setup costs make small orders expensive</li>
        <li>Limited to simpler designs (typically 1-6 colors)</li>
        <li>Longer turnaround time for screen preparation</li>
        <li>Each color requires a separate screen</li>
      </ul>

      <h2>Cost Comparison in Dubai</h2>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>DTF (per piece)</th>
            <th>Screen Print (per piece)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-10 pieces</td>
            <td>AED 25-35</td>
            <td>AED 50-80</td>
          </tr>
          <tr>
            <td>11-50 pieces</td>
            <td>AED 20-30</td>
            <td>AED 25-40</td>
          </tr>
          <tr>
            <td>50+ pieces</td>
            <td>AED 18-25</td>
            <td>AED 15-25</td>
          </tr>
          <tr>
            <td>100+ pieces</td>
            <td>AED 15-22</td>
            <td>AED 10-18</td>
          </tr>
        </tbody>
      </table>

      <h2>When to Choose DTF Printing</h2>
      <ul>
        <li>Small orders (1-50 pieces)</li>
        <li>Complex, multi-color designs or photos</li>
        <li>Mixed fabric types in one order</li>
        <li>Quick turnaround needed (24-48 hours)</li>
        <li>Testing designs before large production</li>
      </ul>

      <h2>When to Choose Screen Printing</h2>
      <ul>
        <li>Large orders (50+ pieces)</li>
        <li>Simple designs (1-4 colors)</li>
        <li>Maximum durability required</li>
        <li>Consistent colors needed (Pantone matching)</li>
        <li>Special effects like metallic or glow ink</li>
        <li>Repeat orders of the same design</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Both DTF and screen printing have their place in Dubai's printing market. For small, colorful orders with quick turnaround, DTF is your best bet. For large quantities of simpler designs where durability and cost-effectiveness matter most, screen printing remains king.</p>

      <p><strong>Need help deciding?</strong> Our team can review your project and recommend the best method based on your specific needs, budget, and timeline. Contact us for a free consultation and quote!</p>
    `,
    date: "2024-10-10",
    readTime: "5 min read",
    category: "Printing Guide",
    image: "/images/products/tshirt.jpg",
    author: "Ahmad Hassan, Print Specialist",
  },
  // Add more posts as needed
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Dubai Printing Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="wrapper py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-[var(--color-accent-600)] hover:text-[var(--color-accent-700)]">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-900)]/95 to-[var(--color-brand-800)]/90" />
        </div>
        
        <div className="wrapper py-16 md:py-20 text-white">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-500)] text-white text-xs font-semibold mb-4">
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="wrapper py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Social Share */}
          <div className="mb-8 flex items-center gap-3 pb-8 border-b border-[var(--border)]">
            <Share2 className="h-5 w-5 text-[var(--color-ink)]/60" />
            <span className="text-sm font-semibold text-[var(--color-ink)]/60">Share this article</span>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[var(--color-brand-700)]
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-[var(--color-ink)]/80 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:text-[var(--color-ink)]/80 prose-li:mb-2
              prose-strong:text-[var(--color-brand-700)] prose-strong:font-semibold
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-th:bg-[var(--color-brand-100)] prose-th:p-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-[var(--border)] prose-td:p-3
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)] border-2 border-[var(--color-accent-400)]">
            <h3 className="text-2xl font-bold mb-3 text-[var(--color-brand-700)]">Ready to Get Started?</h3>
            <p className="text-[var(--color-ink)]/80 mb-6">
              Get a free quote and expert advice on your printing project today!
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/contact" className="btn btn-primary">
                Get Free Quote
              </a>
              <Link href="/services" className="btn btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-[var(--surface-2)] py-12">
        <div className="wrapper">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder for related posts */}
            <Link href="/blog" className="group card card-hover">
              <h3 className="font-semibold mb-2 group-hover:text-[var(--color-accent-600)] transition-colors">
                More articles coming soon
              </h3>
              <p className="text-sm text-[var(--color-ink)]/70">
                Check back for more expert guides on printing and signage
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://stamp-primeprint.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    "/admin/*",
    "/api/*",
    "/login",
    "/register",
    "/profile",
    "/checkout",
    "/order",
  ],

  additionalPaths: async (config) => {
    const result = [];

    const staticPages = [
      { loc: "/", priority: 1.0, changefreq: "daily" },
      { loc: "/products", priority: 0.95, changefreq: "weekly" },
      { loc: "/services", priority: 0.9, changefreq: "weekly" },
      { loc: "/about", priority: 0.8, changefreq: "monthly" },
      { loc: "/contact", priority: 0.8, changefreq: "monthly" },
      { loc: "/blog", priority: 0.7, changefreq: "weekly" },
      { loc: "/portfolio", priority: 0.6, changefreq: "monthly" },
      { loc: "/file-guidelines", priority: 0.5, changefreq: "monthly" },
    ];
    result.push(...staticPages);

    const services = [
      "screen-printing",
      "dtf-print",
      "vinyl-stickers",
      "banners",
      "vehicle-branding",
      "reflective-stickers",
      "glass-stickers",
      "rollups",
      "brochures",
      "business-cards",
      "catalogues",
      "flyers",
      "letterheads",
      "invoices",
      "shopping-bags",
      "led-light-box",
      "acrylic-letters",
      "neon-signs",
      "metal-cutting",
      "display-stands",
      "stamps",
      "3d-design",
      "company-profile",
      "arabic-book",
      "executive-work",
      "gift-boxes",
      "custom-shopping-bags",
      "cloth-bags",
      "poly-prints",
    ];

    services.forEach((service) => {
      result.push({
        loc: `/services/${service}`,
        changefreq: "weekly",
        priority: service === "stamps" ? 0.95 : 0.8,
      });
    });

    const products = [
      "shiny-r-532d",
      "shiny-r-538d-blue",
      "shiny-r-542d-black",
      "shiny-r-542d-t12-red",
      "shiny-r-552d-blue",
      "shiny-s-530d",
      "shiny-s-538d",
      "shiny-s-722",
      "shiny-s-723-green",
      "shiny-s-723-others",
      "shiny-s-724-blue",
      "shiny-s-724-others",
      "shiny-elite-42-green",
      "shiny-elite-42-pink",
      "trodat-heavy-52040",
      "trodat-heavy-54110",
      "trodat-heavy-54120",
      "colop-printer-oval-55-black",
      "colop-printer-oval-55-blue",
      "colop-printer-oval-55-red",
      "trodat-44055-red",
      "trodat-46050",
      "trodat-4642-black",
      "trodat-4642-blue",
      "trodat-4642-red",
    ];
    products.forEach((product) => {
      result.push({
        loc: `/products/${product}`,
        changefreq: "weekly",
        priority: 0.85,
      });
    });

    const portfolio = [
      "neon-restaurant-sign",
      "vehicle-branding-van",
      "corporate-tshirts",
      "promotional-mugs",
      "safety-vests-construction",
      "custom-gift-boxes",
      "event-balloons",
      "branded-bottles",
    ];
    portfolio.forEach((item) => {
      result.push({
        loc: `/portfolio/${item}`,
        changefreq: "monthly",
        priority: 0.6,
      });
    });

    const blogPosts = [
      "dtf-vs-screen-printing-dubai",
      "led-vs-neon-signs-dubai",
      "vehicle-branding-guide-dubai",
      "choosing-right-printing-method",
      "custom-packaging-boxes-dubai",
      "business-card-design-tips",
    ];
    blogPosts.forEach((post) => {
      result.push({
        loc: `/blog/${post}`,
        changefreq: "monthly",
        priority: 0.7,
      });
    });

    return result;
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/login", "/register", "/profile", "/checkout", "/order"] },
    ],
  },

  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/services/stamps" || path === "/products") {
      priority = 0.95;
      changefreq = "weekly";
    } else if (path.startsWith("/services/")) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/products/")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path.startsWith("/portfolio/")) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return { loc: path, changefreq, priority };
  },
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sehamadvertising.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
  additionalPaths: async (config) => {
    const result = []
    
    // Add service pages
    const services = [
      'screen-printing', 'dtf-print', 'vinyl-stickers', 'banners', 'vehicle-branding',
      'reflective-stickers', 'glass-stickers', 'rollups', 'brochures', 'business-cards',
      'catalogues', 'flyers', 'letterheads', 'invoices', 'shopping-bags', 'led-light-box',
      'acrylic-letters', 'neon-signs', 'metal-cutting', 'display-stands', 'stamps',
      '3d-design', 'company-profile', 'arabic-book', 'executive-work', 'gift-boxes',
      'custom-shopping-bags', 'cloth-bags', 'poly-prints'
    ]
    
    services.forEach(service => {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })
    
    // Add product pages
    const products = ['t-shirts', 'mugs', 'lanyards', 'bottles', 'safety-vests', 'balloons', 'gift-boxes']
    products.forEach(product => {
      result.push({
        loc: `/products/${product}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })
    
    // Add portfolio pages
    const portfolio = ['neon-restaurant-sign', 'vehicle-branding-van', 'corporate-tshirts', 'promotional-mugs', 'safety-vests-construction', 'custom-gift-boxes', 'event-balloons', 'branded-bottles']
    portfolio.forEach(item => {
      result.push({
        loc: `/portfolio/${item}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })
    
    // Add blog pages
    const blogPosts = ['dtf-vs-screen-printing-dubai', 'led-vs-neon-signs-dubai', 'vehicle-branding-guide-dubai', 'choosing-right-printing-method', 'custom-packaging-boxes-dubai', 'business-card-design-tips']
    blogPosts.forEach(post => {
      result.push({
        loc: `/blog/${post}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })
    
    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://sehamadvertising.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on page type
    let priority = 0.7
    let changefreq = 'weekly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/services/')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.startsWith('/products/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/blog/')) {
      priority = 0.7
      changefreq = 'monthly'
    } else if (path.startsWith('/portfolio/')) {
      priority = 0.6
      changefreq = 'monthly'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

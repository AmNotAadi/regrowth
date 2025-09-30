# Khadi Beauty - Premium Organic Skincare & Haircare Products

A beautiful, responsive e-commerce website for premium organic skincare and haircare products. Built with modern web technologies and optimized for search engines.

## Features

### 🛍️ **E-commerce Functionality**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Product Catalog**: 30+ organic skincare products across 6 categories
- **Shopping Cart**: Add products to cart with localStorage persistence
- **WhatsApp Integration**: Direct checkout via WhatsApp with pre-filled messages
- **Search & Filter**: Find products quickly with real-time search

### 🎨 **Modern UI/UX**
- **Glassy Cards**: Premium glass-morphism design elements
- **Smooth Animations**: Scroll-reveal, hover effects, and transitions
- **Interactive Elements**: Ripple effects, parallax scrolling, countdown timers
- **Mobile Optimized**: Touch-friendly interface with responsive breakpoints

### 🔍 **SEO Optimization**
- **Comprehensive Meta Tags**: Title, description, keywords, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema markup for Organization, WebSite, and Products
- **Semantic HTML**: Proper heading hierarchy, ARIA labels, and accessibility
- **Sitemap & Robots.txt**: Search engine crawling optimization
- **Performance**: Preconnect links, optimized images, and fast loading

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6 modules)
- **Styling**: Bootstrap 5.3.0 (CDN)
- **Fonts**: Google Fonts (Playfair Display, Inter, Cormorant Garamond)
- **Icons**: Bootstrap Icons
- **Hosting**: Cloudflare Pages (Static)

## File Structure

```
public/
├── index.html          # Homepage
├── shop.html          # Product catalog
├── cart.html          # Shopping cart
├── favicon.svg        # Website favicon
└── assets/
    ├── css/
    │   └── styles.css # Custom styles
    ├── js/
    │   ├── app.js     # Main application logic
    │   ├── cart.js    # Cart functionality
    │   ├── checkout.js # Checkout & WhatsApp integration
    │   └── products.js # Product data
    └── img/
        ├── products/  # Product images
        └── categories/ # Category images
```

## Setup for Cloudflare Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/AmNotAadi/khadi.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Pages
   - Connect to GitHub repository
   - Build settings:
     - Build command: (leave empty)
     - Build output directory: `public`
     - Root directory: (leave empty)

3. **Add Images**:
   - Place product images in `public/assets/img/products/`
   - Place category images in `public/assets/img/categories/`
   - See image requirements below

## Image Requirements

### Product Images (`public/assets/img/products/`)
- **Format**: PNG or JPG
- **Size**: 400x400px recommended
- **Naming**: Use exact filenames from `products.js`

### Category Images (`public/assets/img/categories/`)
- **Format**: PNG or JPG  
- **Size**: 300x200px recommended
- **Naming**: Use exact filenames from `products.js`

## Customization

- **Colors**: Edit CSS variables in `styles.css`
- **Products**: Update `products.js` for product data
- **WhatsApp**: Change phone number in `checkout.js`
- **Timer**: Update event date in `app.js` (line 136)

## Contact

WhatsApp: +91 80073 82284

---

Built with ❤️ for Khadi Beauty
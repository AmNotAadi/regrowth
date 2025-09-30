// Sample product catalog
const CATEGORIES = [
  { id: 'soaps', name: 'Soaps', img: 'assets/img/categories/soaps.png' },
  { id: 'd-tan-scrubs', name: 'D-Tan Scrubs', img: 'assets/img/categories/d-tan-scrubs.png' },
  { id: 'night-creams', name: 'Night Creams', img: 'assets/img/categories/night-creams.png' },
  { id: 'lip-love', name: 'Lip Love', img: 'assets/img/categories/lip-love.png' },
  { id: 'body-lotions', name: 'Body Lotions', img: 'assets/img/categories/body-lotions.png' },
  { id: 'face-creams', name: 'Face Creams', img: 'assets/img/categories/face-creams.png' }
];

const PRODUCTS = [
  // Soaps
  { id: 'soap-charcoal', title: 'Charcoal Soap', category: 'soaps', img: 'assets/img/products/soap-charcoal.png', desc: 'Detoxifying activated charcoal cleanse.' },
  { id: 'soap-goldpearl', title: 'Goldpearl Soap', category: 'soaps', img: 'assets/img/products/soap-goldpearl.png', desc: 'Pearl-inspired glow with gentle cleanse.' },
  { id: 'soap-goat-milk', title: 'Goat Milk Soap', category: 'soaps', img: 'assets/img/products/soap-goat-milk.png', desc: 'Creamy goat milk for soft skin.' },
  { id: 'soap-shea-butter', title: 'Shea Butter Soap', category: 'soaps', img: 'assets/img/products/soap-shea-butter.png', desc: 'Rich shea butter nourishment.' },
  { id: 'soap-ubtan', title: 'Ubtan Soap', category: 'soaps', img: 'assets/img/products/soap-ubtan.png', desc: 'Traditional ubtan herbs for glow.' },
  { id: 'soap-red-rose', title: 'Red Rose Soap', category: 'soaps', img: 'assets/img/products/soap-red-rose.png', desc: 'Romantic rose aroma.' },
  { id: 'soap-pink-rose', title: 'Pink Rose Soap', category: 'soaps', img: 'assets/img/products/soap-pink-rose.png', desc: 'Soft pink rose indulgence.' },
  { id: 'soap-blueberry', title: 'Blueberry Soap', category: 'soaps', img: 'assets/img/products/soap-blueberry.png', desc: 'Fruity blueberry freshness.' },
  { id: 'soap-orange-peel', title: 'Orange Peel Soap', category: 'soaps', img: 'assets/img/products/soap-orange-peel.png', desc: 'Vitamin C-rich citrus zest.' },
  { id: 'soap-papaya-cucumber', title: 'Papaya Cucumber Soap', category: 'soaps', img: 'assets/img/products/soap-papaya-cucumber.png', desc: 'Cooling cucumber with papaya.' },
  { id: 'soap-chandan-kesar', title: 'Chandan Kesar Soap', category: 'soaps', img: 'assets/img/products/soap-chandan-kesar.png', desc: 'Sandalwood and saffron care.' },
  { id: 'soap-lemon-fresh', title: 'Lemon Fresh Soap', category: 'soaps', img: 'assets/img/products/soap-lemon-fresh.png', desc: 'Zesty lemon refresh.' },
  { id: 'soap-multani-mitti', title: 'Multani Mitti Soap', category: 'soaps', img: 'assets/img/products/soap-multani-mitti.png', desc: 'Fuller’s earth deep cleanse.' },

  // D-Tan Scrubs
  { id: 'scrub-choc-coffee', title: 'Chocolate Coffee D-Tan Scrub', category: 'd-tan-scrubs', img: 'assets/img/products/scrub-choc-coffee.png', desc: 'Decadent cocoa and coffee polish.' },
  { id: 'scrub-vitc', title: 'Vitamin C D-Tan Scrub', category: 'd-tan-scrubs', img: 'assets/img/products/scrub-vitc.png', desc: 'Brightening citrus scrub.' },
  { id: 'scrub-bamboo-lime', title: 'Bamboo Lime D-Tan Scrub', category: 'd-tan-scrubs', img: 'assets/img/products/scrub-bamboo-lime.png', desc: 'Refreshing bamboo and lime.' },
  { id: 'scrub-multani', title: 'Multani Mitti D-Tan Scrub', category: 'd-tan-scrubs', img: 'assets/img/products/scrub-multani.png', desc: 'Detox with fuller’s earth.' },

  // Night creams
  { id: 'night-kumkumadi', title: 'Kumkumadi Night Cream', category: 'night-creams', img: 'assets/img/products/night-kumkumadi.png', desc: 'Radiance with saffron elixir.' },
  { id: 'night-renewal-lotion', title: 'Skin Renewal Night Lotion', category: 'night-creams', img: 'assets/img/products/night-renewal-lotion.png', desc: 'Overnight renewal formula.' },
  { id: 'night-retinol', title: 'Retinol Night Cream', category: 'night-creams', img: 'assets/img/products/night-retinol.png', desc: 'Smooth appearance with retinol.' },

  // Lip Love
  { id: 'lip-bubble-gum', title: 'Bubble Gum Lip Balm', category: 'lip-love', img: 'assets/img/products/lip-bubble-gum.png', desc: 'Sweet bubble gum hydration.' },
  { id: 'lip-papaya', title: 'Papaya Lip Balm', category: 'lip-love', img: 'assets/img/products/lip-papaya.png', desc: 'Fruity nourishment.' },
  { id: 'lip-beetroot', title: 'Beetroot Lip Balm', category: 'lip-love', img: 'assets/img/products/lip-beetroot.png', desc: 'Tinted beet glow.' },
  { id: 'lip-oil-serum', title: 'Lip Oil Serum', category: 'lip-love', img: 'assets/img/products/lip-oil-serum.png', desc: 'Glossy serum finish.' },
  { id: 'lip-sugar-vanilla', title: 'Sugar Vanilla Lip Scrub', category: 'lip-love', img: 'assets/img/products/lip-sugar-vanilla.png', desc: 'Gentle sugar exfoliation.' },

  // Body lotions
  { id: 'lotion-vitc', title: 'Vitamin C Body Lotion', category: 'body-lotions', img: 'assets/img/products/lotion-vitc.png', desc: 'Brightening lightweight lotion.' },
  { id: 'lotion-gentle', title: 'Gentle Body Lotion', category: 'body-lotions', img: 'assets/img/products/lotion-gentle.png', desc: 'Daily comfort for skin.' },
  { id: 'lotion-malai', title: 'Body Malai Cream', category: 'body-lotions', img: 'assets/img/products/lotion-malai.png', desc: 'Rich malai-like texture.' },

  // Face creams
  { id: 'face-avocado', title: 'Avocado Face Cream', category: 'face-creams', img: 'assets/img/products/face-avocado.png', desc: 'Avocado-rich moisture.' },
  { id: 'face-goatmilk-turmeric', title: 'Goat Milk Turmeric Face Cream', category: 'face-creams', img: 'assets/img/products/face-goatmilk-turmeric.png', desc: 'Soothing turmeric blend.' },
  { id: 'face-carrot-butter', title: 'Carrot Butter Face Cream', category: 'face-creams', img: 'assets/img/products/face-carrot-butter.png', desc: 'Nourishing carrot butter.' },
  { id: 'face-ultra-light-gel', title: 'Ultra Light Gel Face Cream', category: 'face-creams', img: 'assets/img/products/face-ultra-light-gel.png', desc: 'Featherlight hydration.' },
  { id: 'face-kesar', title: 'Kesar Face Cream', category: 'face-creams', img: 'assets/img/products/face-kesar.png', desc: 'Saffron-infused glow.' },
  { id: 'face-fairness', title: 'Fairness Face Cream', category: 'face-creams', img: 'assets/img/products/face-fairness.png', desc: 'Bright look cream.' }
];

function getFeaturedProducts(limit = 6) {
  return PRODUCTS.slice(0, limit);
}

// Make variables global for compatibility
window.CATEGORIES = CATEGORIES;
window.PRODUCTS = PRODUCTS;
window.getFeaturedProducts = getFeaturedProducts;


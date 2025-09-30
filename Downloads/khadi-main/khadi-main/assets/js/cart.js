const CART_KEY = 'khadi_cart_v1';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addToCart(product, qty = 1) {
  const cart = loadCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, title: product.title, img: product.img, qty });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = loadCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = loadCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function getTotals() {
  const cart = loadCart();
  return { subtotal: 0, shipping: 0, total: 0, count: cart.reduce((n,i)=>n+i.qty,0) };
}

// Make functions global for compatibility
window.loadCart = loadCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.getTotals = getTotals;


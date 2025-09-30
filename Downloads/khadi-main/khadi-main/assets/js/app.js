// UI helpers
function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function renderCartCount() {
  const count = loadCart().reduce((n, i) => n + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = String(count);
  });
}

// Toast notifications
let toastContainer;
function showToast(message) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'toast align-items-center text-bg-dark border-0';
  wrapper.setAttribute('role','alert');
  wrapper.setAttribute('aria-live','assertive');
  wrapper.setAttribute('aria-atomic','true');
  wrapper.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"></button></div>`;
  toastContainer.appendChild(wrapper);
  const toast = new bootstrap.Toast(wrapper, { delay: 1800 });
  toast.show();
  wrapper.addEventListener('hidden.bs.toast', () => wrapper.remove());
}

function renderProductCard(product) {
  const div = document.createElement('div');
  div.className = 'col-6 col-md-4 col-lg-3 mb-4';
  
  // Determine badge based on product
  let badge = '';
  if (product.id.includes('vitc') || product.id.includes('retinol')) {
    badge = '<span class="product-badge new">New</span>';
  } else if (product.id.includes('charcoal') || product.id.includes('goldpearl')) {
    badge = '<span class="product-badge popular">Popular</span>';
  }
  
  div.innerHTML = `
    <div class="card h-100 shadow-sm product-card">
      <div class="product-img-container position-relative">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        ${badge}
      </div>
      <div class="card-body d-flex flex-column">
        <h6 class="card-title mb-2">${product.title}${product.category==='soaps' ? ' <span class="product-size">80g | 100g</span>' : ''}</h6>
        <p class="text-muted small flex-grow-1">${product.desc}</p>
        <div class="d-flex gap-2 mt-auto">
          <button class="btn btn-sm btn-dark flex-grow-1" data-add-to-cart="${product.id}">
            <span>Add to cart</span>
          </button>
          <button class="btn btn-sm btn-outline-dark" title="Quick view" data-quick-view="${product.id}">
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>
    </div>`;
  return div;
}

let addHandlerBound = false;
function ensureAddToCartHandler() {
  if (addHandlerBound) return;
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('[data-add-to-cart]')) {
      const id = target.getAttribute('data-add-to-cart');
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        addToCart(product, 1);
        renderCartCount();
        showToast('Added to cart');
      }
    }
    if (target && target.matches('[data-quick-view]')) {
      const id = target.getAttribute('data-quick-view');
      const product = PRODUCTS.find(p => p.id === id);
      if (product) openQuickView(product);
    }
  });
  // Hover ripple for buttons
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
  addHandlerBound = true;
}

// Home page scripts
function initHome() {
  renderCartCount();
  // Sticky nav shadow
  const nav = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Back to top
  let backBtn = document.getElementById('backToTop');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToTop';
    backBtn.className = 'btn btn-dark btn-sm';
    backBtn.textContent = '↑ Top';
    document.body.appendChild(backBtn);
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backBtn.classList.add('show'); else backBtn.classList.remove('show');
  }, { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal animations
  initReveal();

  // Parallax hero image
  const parallax = document.querySelector('[data-parallax] img');
  if (parallax) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.08;
      parallax.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  // Event countdown (simple)
  const dd = document.querySelector('#countdown [data-dd]');
  const hh = document.querySelector('#countdown [data-hh]');
  const mm = document.querySelector('#countdown [data-mm]');
  const ss = document.querySelector('#countdown [data-ss]');
  if (dd && hh && mm && ss) {
    const target = new Date('2025-09-26T11:00:00');
    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000*60*60*24)); diff -= d*24*60*60*1000;
      const h = Math.floor(diff / (1000*60*60)); diff -= h*60*60*1000;
      const m = Math.floor(diff / (1000*60)); diff -= m*60*1000;
      const s = Math.floor(diff / 1000);
      dd.textContent = String(d).padStart(2,'0');
      hh.textContent = String(h).padStart(2,'0');
      mm.textContent = String(m).padStart(2,'0');
      ss.textContent = String(s).padStart(2,'0');
    };
    tick();
    setInterval(tick, 1000);
  }

  const featured = getFeaturedProducts(6);
  const container = document.querySelector('#featured-grid');
  if (container) {
    featured.forEach(p => container.appendChild(renderProductCard(p)));
    ensureAddToCartHandler();
  }
  // categories grid
  const catGrid = document.querySelector('#category-grid');
  if (catGrid) {
    CATEGORIES.forEach(cat => {
      const a = document.createElement('a');
      a.className = 'col-6 col-md-4 col-lg-2 text-decoration-none';
      a.href = `shop.html#${cat.id}`;
      a.innerHTML = `
        <div class="category-tile">
          <div class="ratio ratio-1x1 category-img bg-light">
            <img src="${cat.img}" alt="${cat.name}">
          </div>
          <div class="category-name">${cat.name}</div>
        </div>`;
      catGrid.appendChild(a);
    });
  }
}

// Shop page scripts
function initShop() {
  renderCartCount();
  // Sticky nav
  const nav = document.querySelector('.navbar');
  const onScroll = () => { if (window.scrollY > 10) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const grid = document.querySelector('#shop-grid');
  const tabs = document.querySelector('#category-tabs');
  const hash = window.location.hash.replace('#','');
  const current = hash || 'all';
  const search = document.querySelector('#shop-search');
  let searchTerm = '';

  if (tabs) {
    const allTab = document.createElement('button');
    allTab.className = `btn btn-outline-dark btn-sm me-2 mb-2 ${current==='all'?'active':''}`;
    allTab.textContent = 'All';
    allTab.dataset.filter = 'all';
    tabs.appendChild(allTab);
    CATEGORIES.forEach(cat => {
      const b = document.createElement('button');
      b.className = `btn btn-outline-dark btn-sm me-2 mb-2 ${current===cat.id?'active':''}`;
      b.textContent = cat.name;
      b.dataset.filter = cat.id;
      tabs.appendChild(b);
    });
    tabs.addEventListener('click', (e) => {
      const t = e.target;
      if (t.matches('button[data-filter]')) {
        tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        t.classList.add('active');
        renderProducts(t.dataset.filter);
      }
    });
  }

  function renderProducts(filter) {
    grid.innerHTML = '';
    let list = filter && filter !== 'all' ? PRODUCTS.filter(p => p.category === filter) : PRODUCTS;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term));
    }
    list.forEach(p => grid.appendChild(renderProductCard(p)));
    ensureAddToCartHandler();
  }

  renderProducts(current);

  if (search) {
    search.addEventListener('input', (e) => {
      searchTerm = e.target.value || '';
      const active = tabs?.querySelector('button.active');
      const filter = active ? active.dataset.filter : current;
      renderProducts(filter);
    });
  }
}

// Cart page scripts
function initCartPage() {
  renderCartCount();
  const tbody = document.querySelector('#cart-body');
  const totalsEl = document.querySelector('#cart-totals');
  const items = loadCart();

  function draw() {
    tbody.innerHTML = '';
    const itemsNow = loadCart();
    itemsNow.forEach(i => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${i.img}" alt="${i.title}" class="cart-thumb"> ${i.title}</td>
        <td>
          <input type="number" min="1" value="${i.qty}" class="form-control form-control-sm qty-input" data-qty-id="${i.id}">
        </td>
        <td><button class="btn btn-sm btn-outline-danger" data-remove-id="${i.id}">Remove</button></td>`;
      tbody.appendChild(tr);
    });
    totalsEl.innerHTML = `<div class="alert alert-light border">Prices will be confirmed on WhatsApp during checkout.</div>`;
  }

  draw();

  tbody.addEventListener('input', (e) => {
    const target = e.target;
    if (target.matches('[data-qty-id]')) {
      const id = target.getAttribute('data-qty-id');
      const val = parseInt(target.value || '1', 10);
      updateQty(id, val);
      draw();
    }
  });
  tbody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('[data-remove-id]')) {
      const id = target.getAttribute('data-remove-id');
      removeFromCart(id);
      draw();
      renderCartCount();
      showToast('Removed from cart');
    }
  });
}

// Quick View Modal
let quickViewModalEl;
function ensureQuickViewModal() {
  if (quickViewModalEl) return quickViewModalEl;
  quickViewModalEl = document.createElement('div');
  quickViewModalEl.className = 'modal fade';
  quickViewModalEl.id = 'quickViewModal';
  quickViewModalEl.tabIndex = -1;
  quickViewModalEl.innerHTML = `
  <div class=\"modal-dialog modal-dialog-centered\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\"></h5>\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n      </div>\n      <div class=\"modal-body\">\n        <img class=\"img-fluid rounded mb-3\" alt=\"\">\n        <p class=\"text-muted\"></p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-dark\" data-modal-add> Add to cart </button>\n      </div>\n    </div>\n  </div>`;
  document.body.appendChild(quickViewModalEl);
  return quickViewModalEl;
}

function openQuickView(product) {
  const el = ensureQuickViewModal();
  el.querySelector('.modal-title').textContent = product.title;
  el.querySelector('img').src = product.img;
  el.querySelector('img').alt = product.title;
  el.querySelector('.modal-body p').textContent = product.desc;
  const addBtn = el.querySelector('[data-modal-add]');
  addBtn.onclick = () => { addToCart(product, 1); renderCartCount(); showToast('Added to cart'); };
  new bootstrap.Modal(el).show();
}

// Reveal Animations
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || elements.length === 0) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}


// Make functions global for compatibility
window.formatINR = formatINR;
window.renderCartCount = renderCartCount;
window.showToast = showToast;
window.renderProductCard = renderProductCard;
window.initHome = initHome;
window.initShop = initShop;
window.initCartPage = initCartPage;


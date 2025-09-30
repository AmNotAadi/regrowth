function buildWhatsAppMessage(customer) {
  const items = loadCart();
  const lines = [];
  lines.push('*New Order / Price Inquiry - Khadi Skin Care*');
  lines.push('');
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Address: ${customer.address}`);
  lines.push('');
  lines.push('*Items:*');
  items.forEach(i => lines.push(`- ${i.title} x${i.qty}`));
  lines.push('');
  lines.push('_Please confirm current prices and total._');
  return lines.join('\n');
}

function openWhatsAppWithOrder(customer, businessNumber) {
  const message = buildWhatsAppMessage(customer);
  const encoded = encodeURIComponent(message);
  const phoneDigits = (businessNumber || '').replace(/\D/g, '');
  const url = `https://wa.me/${phoneDigits}?text=${encoded}`;
  window.open(url, '_blank');
}

async function saveOrder(customer) {
  // For static hosting, we'll just save to localStorage
  const items = loadCart();
  const totals = getTotals();
  const order = {
    id: Date.now(),
    customer,
    items,
    totals,
    timestamp: new Date().toISOString()
  };
  
  try {
    // Save to localStorage for offline persistence
    const existingOrders = JSON.parse(localStorage.getItem('khadi_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('khadi_orders', JSON.stringify(existingOrders));
    
    // Also save to sessionStorage for current session
    sessionStorage.setItem('last_order', JSON.stringify(order));
    
    return order;
  } catch (e) {
    console.error('Failed to save order locally:', e);
    return null;
  }
}

// Make functions global for compatibility
window.buildWhatsAppMessage = buildWhatsAppMessage;
window.openWhatsAppWithOrder = openWhatsAppWithOrder;
window.saveOrder = saveOrder;


const API = (url = '') => {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
  return {
    getProducts: () => fetch(`${base}/api/products`).then(r => r.json()),
    getCart: () => fetch(`${base}/api/cart`).then(r => r.json()),
    addToCart: (productId, qty = 1) =>
      fetch(`${base}/api/cart`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ productId, qty })}).then(r => r.json()),
    removeFromCart: (id) => fetch(`${base}/api/cart/${id}`, { method: 'DELETE' }).then(r => r.json()),
    updateCartItem: (id, qty) => fetch(`${base}/api/cart/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ qty })}).then(r => r.json()),
    checkout: (cartItems, customer) => fetch(`${base}/api/checkout`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ cartItems, customer })}).then(r => r.json())
  }
}

export default API();

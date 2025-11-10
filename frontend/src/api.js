const base =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.MODE === "production"
    ? "https://mock-ecom-cart-kxvj.onrender.com"
    : "http://localhost:4000");

export const API_BASE = `${base}/api`;

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function addToCart(productId) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error("Failed to load cart");
  return res.json();
}

export async function removeFromCart(productId) {
  const res = await fetch(`${API_BASE}/cart/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
}

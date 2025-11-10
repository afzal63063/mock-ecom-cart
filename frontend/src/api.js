const base =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.MODE === "production"
    ? "https://mock-ecom-cart-kxvj.onrender.com"
    : "http://localhost:4000");

export const API_BASE = `${base}/api`;

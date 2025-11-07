import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  ).toFixed(2);

  // Checkout handler
  const handleCheckout = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("please enter your name and email");

    const checkoutData = {
      name,
      email,
      cartItems: cart,
      total,
      timestamp: new Date().toLocaleString(),
    };

    // Fake API call (mock)
    setTimeout(() => {
      setReceipt(checkoutData);
      setCart([]);
      setName("");
      setEmail("");
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ fontSize: "2rem" }}>🛍️ Vibe Cart</h1>

      {/* Products Section */}
      <h2>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "15px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>{p.name || "Vibe Product"}</h3>
            <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div style={{ marginTop: "40px" }}>
        <h2>🛒 Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: "8px" }}>
                {item.name} — ₹{item.price} × {item.qty}{" "}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "3px 8px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ₹{total}</h3>
      </div>

      {/* Checkout Section */}
      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Checkout</h2>
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </form>
        </div>
      )}

      {/* Receipt Modal */}
      {receipt && (
        <div
          style={{
            marginTop: "40px",
            border: "2px solid #4caf50",
            borderRadius: "10px",
            padding: "20px",
            background: "#f8fff8",
          }}
        >
          <h2>✅ Receipt</h2>
          <p>Thank you, {receipt.name}!</p>
          <p>Email: {receipt.email}</p>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {receipt.timestamp}</p>
          <button
            onClick={() => setReceipt(null)}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

import express from "express";
const router = express.Router();

// ✅ Mock checkout endpoint
router.post("/", async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: "cartItems required" });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const receipt = {
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      message: "Mock checkout successful",
    };

    res.json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

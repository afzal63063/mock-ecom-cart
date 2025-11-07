import express from "express";
import { CartItem, Product } from "../models/index.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId) return res.status(400).json({ error: "productId required" });

    const existing = await CartItem.findOne({ where: { productId } });
    if (existing) {
      existing.qty += qty || 1;
      await existing.save();
      return res.json(existing);
    }

    const item = await CartItem.create({ productId, qty: qty || 1 });
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get all cart items + total
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.findAll({ include: Product });
    const total = items.reduce((sum, item) => sum + item.Product.price * item.qty, 0);
    res.json({ items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

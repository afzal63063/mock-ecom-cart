import express from "express";
import { Product } from "../models/index.js"; // ✅ make sure Product is exported from your models/index.js

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll(); // 🔥 Fetch from your SQLite DB
    res.json(products);
  } catch (err) {
    console.error("Error loading products:", err);
    res.status(500).json({ message: "Error loading products. Please try again." });
  }
});

export default router;

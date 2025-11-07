import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await fetch("https://fakestoreapi.com/products?limit=5");
  const products = await response.json();
  res.json(products);
});

export default router;

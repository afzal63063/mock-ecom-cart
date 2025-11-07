import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Vibe Cart Backend API is running...");
});

// ✅ Database + Server start
sequelize.sync().then(() => {
  const PORT = 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

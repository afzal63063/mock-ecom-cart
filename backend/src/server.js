import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";

const app = express();

// ✅ Allow only your Netlify frontend to connect
app.use(cors({
  origin: ["https://vibe-cart-nazi.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

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
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

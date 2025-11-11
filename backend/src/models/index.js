import { Sequelize, DataTypes } from "sequelize";
import productModel from "./product.js";
import cartItemModel from "./cartItem.js"; // <-- make sure this file exists

// ✅ Initialize SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/database.sqlite",
});

// ✅ Define models
const Product = productModel(sequelize, DataTypes);
const CartItem = cartItemModel(sequelize, DataTypes);

// ✅ Define relationships
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// ✅ Export everything for use in routes
export { sequelize, Product, CartItem };

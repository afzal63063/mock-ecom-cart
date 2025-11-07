import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Setup SQLite DB in /backend/database.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"),
});

//  Product Model
export const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
});

//  CartItem Model
export const CartItem = sequelize.define("CartItem", {
  qty: { type: DataTypes.INTEGER, defaultValue: 1 },
});

//  Associations
CartItem.belongsTo(Product);

//  Export sequelize and models
export { sequelize };

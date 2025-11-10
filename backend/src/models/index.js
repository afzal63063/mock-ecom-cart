import { Sequelize, DataTypes } from "sequelize";
import productModel from "./product.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/database.sqlite",
});

const Product = productModel(sequelize, DataTypes);

export { sequelize, Product };

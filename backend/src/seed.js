import { sequelize, Product } from "./models/index.js";

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate tables

  await Product.bulkCreate([
    { name: "Vibe T-shirt", price: 19.99, description: "Comfort fit tee" },
    { name: "Vibe Mug", price: 9.99, description: "Ceramic mug" },
    { name: "Vibe Backpack", price: 49.99, description: "Durable backpack" },
    { name: "Vibe Headphones", price: 69.99, description: "Over-ear" },
    { name: "Vibe Sticker Pack", price: 4.99, description: "6 cool stickers" },
  ]);

  console.log("Database seeded!");
  process.exit();
};

seed();

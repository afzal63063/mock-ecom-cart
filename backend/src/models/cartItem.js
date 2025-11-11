export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  return CartItem;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('CartItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, { timestamps: true });
};
